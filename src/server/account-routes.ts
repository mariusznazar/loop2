import express from "express";
import type { Request, Response, Router } from "express";
import { composeConfirmationMessage } from "./account-mail.js";
import type { SendOutcome } from "./account-mail.js";
import {
  AccountPolicy,
  accountMessageLimits,
  checkLogin,
  checkRegistration,
  confirmationLinkLifetime,
  createLinkToken,
  isLinkToken,
  linkTokenDigest,
} from "./account-policy.js";
import type { AccountRuntime } from "./configuration.js";
import type { Account, IssueOutcome } from "./database.js";
import {
  hashPassword,
  PasswordCapacityError,
  verifyPassword,
} from "./passwords.js";
import { mutationGuards } from "./transport.js";

export const sessionCookieName = "__Host-loop2.sid";

// One scope for issuing and clearing, so logout clears the cookie it issued.
export const sessionCookieScope = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "strict",
} as const;

const paths = {
  accounts: "/api/accounts",
  session: "/api/session",
  account: "/api/account",
  logout: "/api/logout",
  emailConfirmation: "/api/email-confirmation",
  confirmationMessage: "/api/email-confirmation-message",
  savedGame: "/api/saved-game",
};

// The body limit of the five small routes and of the save route, and the most
// the server stores of one player's game, all in bytes (D-104).
const accountBodyLimit = 16 * 1024;
const savedGameLimit = 64 * 1024;

// The outcome of one confirmation message, as both sending routes report it.
type ConfirmationMessage = "sent" | "limited" | "failed";

function refuse(
  response: Response,
  status: number,
  code: string,
  message: string,
): void {
  response.status(status).json({ code, error: message });
}

// Only the stored session names the account; nothing the request supplies does.
// Blocking deletes an account's sessions; a session read just before the block
// committed still finds the account blocked here, and authorizes nothing.
function sessionAccount(
  runtime: AccountRuntime,
  request: Request,
): Account | null {
  const accountId: unknown = request.session?.accountId;
  if (typeof accountId !== "string") return null;
  const account = runtime.database.findAccountById(accountId);
  return account && !account.blocked ? account : null;
}

function unauthenticated(response: Response): void {
  refuse(
    response,
    401,
    "unauthenticated",
    "Sesja wygasła albo nie istnieje. Zaloguj się.",
  );
}

function invalidRequest(response: Response): void {
  refuse(response, 400, "invalid-request", "Nieprawidłowe żądanie.");
}

function saveTooLarge(response: Response): void {
  refuse(response, 413, "save-too-large", "Zapis gry jest za duży.");
}

function limited(response: Response): void {
  refuse(
    response,
    429,
    "too-many-attempts",
    "Za dużo prób. Spróbuj ponownie za kilka minut.",
  );
}

function invalidCredentials(response: Response): void {
  refuse(
    response,
    401,
    "invalid-credentials",
    "Nieprawidłowy adres e-mail lub hasło.",
  );
}

// Only after the password is checked: the block is no clue for an address alone.
function accountBlocked(response: Response): void {
  refuse(response, 403, "account-blocked", "To konto jest zablokowane.");
}

// One answer for every token that confirms nothing, so it tells nothing of
// why: malformed, unknown, used, expired, of another kind or of a blocked
// account (D-156, D-160).
function invalidLink(response: Response): void {
  refuse(response, 400, "invalid-link", "Odnośnik jest nieważny albo wygasł.");
}

function accountBody(account: Account) {
  return {
    id: account.id,
    email: account.email,
    emailConfirmed: account.emailConfirmed,
  };
}

const registrationProblems = {
  "invalid-email": "Podaj adres e-mail w postaci nazwa@domena.",
  "invalid-password": "Hasło musi mieć od 12 do 128 znaków.",
  "password-mismatch": "Powtórzone hasło różni się od hasła.",
};

// The body holds exactly the named fields, each a string; nothing is coerced.
function stringFields<Name extends string>(
  body: unknown,
  names: readonly Name[],
): Record<Name, string> | null {
  const record = body as Record<string, unknown>;
  const keys = Object.keys(record);
  if (
    keys.length !== names.length ||
    !names.every(
      (name) => Object.hasOwn(record, name) && typeof record[name] === "string",
    )
  )
    return null;
  return record as Record<Name, string>;
}

// The body holds exactly `version`, `basedOn` and `game`, each of the kind the
// save route accepts; nothing is coerced and no field can name an account.
function saveFields(body: unknown): {
  version: number;
  basedOn: number;
  game: object;
} | null {
  const record = body as Record<string, unknown>;
  const { version, basedOn, game } = record;
  if (
    Object.keys(record).length !== 3 ||
    typeof version !== "number" ||
    !Number.isSafeInteger(version) ||
    version < 1 ||
    typeof basedOn !== "number" ||
    !Number.isSafeInteger(basedOn) ||
    basedOn < 0 ||
    typeof game !== "object" ||
    game === null ||
    Array.isArray(game)
  )
    return null;
  return { version, basedOn, game };
}

// Replaces this browser's session and stores it before the caller answers.
// On failure no session remains attached, so no cookie is issued. The session
// stands on the password hash named by the caller (the one a login checked the
// password against, the one a registration made), and the store keeps it
// for every write of that session object, so a password reset committed at any
// point leaves no session behind (D-112).
function establishSession(
  runtime: AccountRuntime,
  request: Request,
  accountId: string,
  passwordHash: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    const abandon = () => request.session.destroy(() => resolve(false));
    request.session.regenerate((regenerated: unknown) => {
      if (regenerated) {
        abandon();
        return;
      }
      request.session.accountId = accountId;
      runtime.store.expectPasswordHash(request.session, passwordHash);
      request.session.save((saved: unknown) => {
        if (saved) abandon();
        else resolve(true);
      });
    });
  });
}

// Answers the refusal itself when the session cannot be stored.
async function signIn(
  runtime: AccountRuntime,
  request: Request,
  response: Response,
  account: Account,
  passwordHash: string,
): Promise<boolean> {
  if (await establishSession(runtime, request, account.id, passwordHash))
    return true;
  refuse(
    response,
    503,
    "session-unavailable",
    "Nie udało się zalogować. Spróbuj zalogować się ponownie.",
  );
  return false;
}

// The mailer's answer, or "failed" once the deadline passes or if the mailer
// breaks its promise never to reject; a late answer is ignored.
function boundedSending(
  sending: Promise<SendOutcome>,
  deadline: number,
): Promise<SendOutcome> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      console.error("Account mail missed its deadline");
      resolve("failed");
    }, deadline);
    timer.unref();
    sending.then(
      (outcome) => {
        clearTimeout(timer);
        resolve(outcome === "sent" ? "sent" : "failed");
      },
      () => {
        clearTimeout(timer);
        console.error("Account mail failed: unknown");
        resolve("failed");
      },
    );
  });
}

// The send step of both sending routes. It records the link before the
// message is handed on, so the message counts against D-105 whatever its
// sending does (D-161), and recording stops the account's earlier links
// (D-155). It never throws: "blocked" is a block committed after the route
// read the account, which the route answers itself.
async function sendConfirmation(
  runtime: AccountRuntime,
  policy: AccountPolicy,
  account: Account,
): Promise<ConfirmationMessage | "blocked"> {
  const token = createLinkToken();
  let issued: IssueOutcome;
  try {
    issued = runtime.database.issueLink(
      {
        accountId: account.id,
        purpose: "email-confirmation",
        tokenDigest: linkTokenDigest(token),
        lifetimeMs: confirmationLinkLifetime,
      },
      accountMessageLimits,
    );
  } catch {
    // A message whose link has no row could never confirm, so none is sent.
    console.error("Account confirmation link could not be recorded");
    return "failed";
  }
  if (issued !== "issued") return issued;
  const link = `${runtime.configuration.publicOrigin}/#confirm-email=${token}`;
  let sending: Promise<SendOutcome>;
  try {
    sending = runtime.mailer.send(
      composeConfirmationMessage(account.email, link),
    );
  } catch {
    console.error("Account mail failed: unknown");
    return "failed";
  }
  return boundedSending(sending, policy.sendingDeadline);
}

export function accountRoutes(
  runtime: AccountRuntime | null,
  policy: AccountPolicy = new AccountPolicy(),
): Router {
  const router = express.Router();

  router.all(Object.values(paths), (_request, response, next) => {
    response.setHeader("Cache-Control", "no-store");
    if (!runtime) {
      response.status(503).json({ error: "Accounts unavailable" });
      return;
    }
    if (!response.locals.accountClientAddress) {
      response.status(403).json({ error: "Invalid request transport" });
      return;
    }
    next();
  });
  if (!runtime) return router;

  router.post(
    [
      paths.accounts,
      paths.session,
      paths.logout,
      paths.emailConfirmation,
      paths.confirmationMessage,
    ],
    ...mutationGuards(runtime.configuration.publicOrigin, accountBodyLimit),
  );
  router.put(
    paths.savedGame,
    ...mutationGuards(runtime.configuration.publicOrigin, savedGameLimit),
  );

  router.get(paths.account, (request, response) => {
    const account = sessionAccount(runtime, request);
    if (!account) {
      unauthenticated(response);
      return;
    }
    response.json(accountBody(account));
  });

  // The stored text is the game's text as the server keeps it, embedded as it
  // is: the server reads nothing inside it (D-07).
  router.get(paths.savedGame, (request, response) => {
    const account = sessionAccount(runtime, request);
    if (!account) {
      unauthenticated(response);
      return;
    }
    const saved = runtime.database.readSavedGame(account.id);
    response
      .type("json")
      .send(
        saved
          ? `{"save":{"version":${saved.version},"revision":${saved.revision},"game":${saved.game}}}`
          : '{"save":null}',
      );
  });

  // The checks come in this order: the guards, the fields, the session, the
  // size of the stored text, then one write that checks the block, the version
  // and the revision (spec decision 1).
  router.put(paths.savedGame, (request, response) => {
    const fields = saveFields(request.body);
    if (!fields) {
      invalidRequest(response);
      return;
    }
    const account = sessionAccount(runtime, request);
    if (!account) {
      unauthenticated(response);
      return;
    }
    // Serializing the parsed game, not the request's text, fixes what is stored
    // and measured: re-serializing can lengthen numbers (1e21 becomes 1e+21).
    let game: string;
    try {
      game = JSON.stringify(fields.game);
    } catch {
      // Nesting too deep to serialize is no game this server can keep.
      invalidRequest(response);
      return;
    }
    if (Buffer.byteLength(game, "utf8") > savedGameLimit) {
      saveTooLarge(response);
      return;
    }
    const outcome = runtime.database.writeSavedGame(account.id, {
      version: fields.version,
      basedOn: fields.basedOn,
      game,
    });
    switch (outcome.outcome) {
      case "saved":
        response.json({ revision: outcome.revision });
        return;
      case "blocked":
        unauthenticated(response);
        return;
      case "outdated":
        refuse(
          response,
          409,
          "save-outdated",
          "Zapis pochodzi ze starszej wersji gry.",
        );
        return;
      case "conflict":
        refuse(
          response,
          409,
          "save-conflict",
          "Zapis na serwerze jest nowszy niż ten, z którego wyszedł zapis.",
        );
        return;
    }
  });

  // The link alone authorizes confirming its own account (D-109): no session
  // is needed, and a session sent along neither helps nor is changed.
  router.post(paths.emailConfirmation, (request, response) => {
    const input = stringFields(request.body, ["token"] as const);
    if (!input) {
      invalidRequest(response);
      return;
    }
    if (
      !isLinkToken(input.token) ||
      runtime.database.confirmEmailAddress(linkTokenDigest(input.token)) !==
        "confirmed"
    ) {
      invalidLink(response);
      return;
    }
    response.status(204).end();
  });

  // A session asks for a message only to its own account's address; the body
  // is an empty object, so no field may name an address or an account.
  router.post(paths.confirmationMessage, async (request, response) => {
    if (Object.keys(request.body as object).length > 0) {
      invalidRequest(response);
      return;
    }
    const account = sessionAccount(runtime, request);
    if (!account) {
      unauthenticated(response);
      return;
    }
    if (account.emailConfirmed) {
      refuse(
        response,
        409,
        "email-already-confirmed",
        "Adres e-mail jest już potwierdzony.",
      );
      return;
    }
    const outcome = await sendConfirmation(runtime, policy, account);
    // A block committed after the session was read: answered as every request
    // of a blocked account's deleted session is (D-137).
    if (outcome === "blocked") {
      unauthenticated(response);
      return;
    }
    response.json({ confirmationMessage: outcome });
  });

  router.post(paths.logout, (request, response) => {
    // Logout takes an empty object: no field may name an account or session.
    if (Object.keys(request.body as object).length > 0) {
      refuse(response, 400, "invalid-request", "Nieprawidłowe żądanie.");
      return;
    }
    if (!sessionAccount(runtime, request)) {
      unauthenticated(response);
      return;
    }
    request.session.destroy((error) => {
      if (error) {
        refuse(
          response,
          500,
          "logout-failed",
          "Nie udało się wylogować. Spróbuj ponownie.",
        );
        return;
      }
      response.clearCookie(sessionCookieName, sessionCookieScope);
      response.status(204).end();
    });
  });

  router.post(paths.accounts, async (request, response) => {
    const input = stringFields(request.body, [
      "email",
      "password",
      "passwordConfirmation",
    ] as const);
    if (!input) {
      invalidRequest(response);
      return;
    }
    const checked = checkRegistration(input);
    if (!checked.ok) {
      refuse(
        response,
        400,
        checked.problem,
        registrationProblems[checked.problem],
      );
      return;
    }
    const address = response.locals.accountClientAddress as string;
    const ticket = policy.admitRegistration(address);
    if (!ticket) {
      limited(response);
      return;
    }
    let account: Account | null;
    try {
      if (runtime.database.findAccountByEmail(checked.email)) {
        account = null;
      } else {
        const hash = await hashPassword(checked.password);
        account = runtime.database.createAccount(checked.email, hash);
      }
    } catch (error) {
      ticket.release();
      if (error instanceof PasswordCapacityError) {
        limited(response);
        return;
      }
      throw error;
    }
    if (!account) {
      ticket.release();
      refuse(
        response,
        409,
        "account-exists",
        "Konto z tym adresem już istnieje.",
      );
      return;
    }
    ticket.created();
    if (
      !(await signIn(runtime, request, response, account, account.passwordHash))
    )
      return;
    // The account exists and the player is signed in whatever the sending
    // does, so every outcome is a 201; a block committed meanwhile sent
    // nothing.
    const outcome = await sendConfirmation(runtime, policy, account);
    response.status(201).json({
      ...accountBody(account),
      confirmationMessage: outcome === "blocked" ? "failed" : outcome,
    });
  });

  router.post(paths.session, async (request, response) => {
    const input = stringFields(request.body, ["email", "password"] as const);
    if (!input) {
      invalidRequest(response);
      return;
    }
    const checked = checkLogin(input);
    if (!checked) {
      invalidCredentials(response);
      return;
    }
    const address = response.locals.accountClientAddress as string;
    const ticket = policy.admitLogin(checked.email, address);
    if (!ticket) {
      limited(response);
      return;
    }
    let account: Account | null;
    let verified: boolean;
    let checkedHash: string | undefined;
    try {
      account = runtime.database.findAccountByEmail(checked.email);
      checkedHash = account?.passwordHash;
      // An unknown address is checked against the startup hash through the same gate.
      verified = await verifyPassword(
        account?.passwordHash ?? runtime.dummyHash,
        checked.password,
      );
      // A block committed while the password was checked counts as a block.
      if (account && verified)
        account = runtime.database.findAccountById(account.id);
    } catch (error) {
      ticket.release();
      if (error instanceof PasswordCapacityError) {
        limited(response);
        return;
      }
      throw error;
    }
    if (!account || !verified) {
      ticket.fail();
      invalidCredentials(response);
      return;
    }
    // The password was replaced while it was checked: the old one proves
    // nothing now and the block is none of its business. It was right when
    // checked, so no wrong guess is counted, and it is no sign-in either.
    if (account.passwordHash !== checkedHash) {
      ticket.release();
      invalidCredentials(response);
      return;
    }
    // Neither a guess of credentials nor a sign-in: it adds no failure and
    // clears none.
    if (account.blocked) {
      ticket.release();
      accountBlocked(response);
      return;
    }
    ticket.succeed();
    if (await signIn(runtime, request, response, account, checkedHash))
      response.status(200).json(accountBody(account));
  });

  return router;
}
