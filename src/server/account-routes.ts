import express from "express";
import type { Request, Response, Router } from "express";
import {
  AccountPolicy,
  checkLogin,
  checkRegistration,
} from "./account-policy.js";
import type { AccountRuntime } from "./configuration.js";
import type { Account } from "./database.js";
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
};

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

// Replaces this browser's session and stores it before the caller answers.
// On failure no session remains attached, so no cookie is issued.
function establishSession(
  request: Request,
  accountId: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    const abandon = () => request.session.destroy(() => resolve(false));
    request.session.regenerate((regenerated: unknown) => {
      if (regenerated) {
        abandon();
        return;
      }
      request.session.accountId = accountId;
      request.session.save((saved: unknown) => {
        if (saved) abandon();
        else resolve(true);
      });
    });
  });
}

async function signIn(
  request: Request,
  response: Response,
  account: Account,
  status: number,
): Promise<void> {
  if (!(await establishSession(request, account.id))) {
    refuse(
      response,
      503,
      "session-unavailable",
      "Nie udało się zalogować. Spróbuj zalogować się ponownie.",
    );
    return;
  }
  response.status(status).json({ id: account.id, email: account.email });
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
    [paths.accounts, paths.session, paths.logout],
    ...mutationGuards(runtime.configuration.publicOrigin),
  );

  router.get(paths.account, (request, response) => {
    const account = sessionAccount(runtime, request);
    if (!account) {
      unauthenticated(response);
      return;
    }
    response.json({ id: account.id, email: account.email });
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
    await signIn(request, response, account, 201);
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
    try {
      account = runtime.database.findAccountByEmail(checked.email);
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
    // Neither a guess of credentials nor a sign-in: it adds no failure and
    // clears none.
    if (account.blocked) {
      ticket.release();
      accountBlocked(response);
      return;
    }
    ticket.succeed();
    await signIn(request, response, account, 200);
  });

  return router;
}
