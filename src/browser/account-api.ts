// The browser's client of the account API: relative requests, a bounded wait, and one typed result
// for every outcome. It holds no identity, reads no cookie and touches no DOM or game state.

/** The account the server names; the client keeps nothing else of a response. */
export interface Account {
  readonly id: string;
  readonly email: string;
  readonly emailConfirmed: boolean;
}

/** What the server reports of the confirmation message it was asked to send. */
export type ConfirmationMessage = "sent" | "limited" | "failed";

/** The account just created, with the outcome of its first confirmation message. */
export interface RegisteredAccount extends Account {
  readonly confirmationMessage: ConfirmationMessage;
}

/** The codes the account routes put on a refusal of their own. */
export const refusalCodes = [
  "invalid-request",
  "invalid-email",
  "invalid-password",
  "password-mismatch",
  "invalid-credentials",
  "account-blocked",
  "unauthenticated",
  "account-exists",
  "too-many-attempts",
  "session-unavailable",
  "logout-failed",
  "invalid-link",
  "email-already-confirmed",
  "save-conflict",
  "save-outdated",
  "save-too-large",
] as const;

export type RefusalCode = (typeof refusalCodes)[number];

export type AccountFailure =
  /** The server answered with an error status. `code` is null for a refusal without a known code. */
  | {
      readonly kind: "refused";
      readonly status: number;
      readonly code: RefusalCode | null;
      readonly message: string;
    }
  /** No answer within the time limit, or the connection failed. */
  | {
      readonly kind: "unreachable";
      readonly reason: "timeout" | "network";
      readonly message: string;
    }
  /** The server answered, but not with the status and body the request's success has. */
  | {
      readonly kind: "unexpected";
      readonly status: number;
      readonly message: string;
    };

export type AccountResult<Value> =
  | { readonly ok: true; readonly value: Value }
  | { readonly ok: false; readonly failure: AccountFailure };

/** The saved game state the server holds, as it answered: the game is handed on unread. */
export interface SavedGame {
  readonly version: number;
  readonly revision: number;
  readonly game: object;
}

/** What the browser sends to replace the saved game state. */
export interface SavedGameSubmission {
  /** The version of the shape of `game`. */
  readonly version: number;
  /** The revision of the saved game state the browser last saw; 0 when it saw none. */
  readonly basedOn: number;
  readonly game: object;
}

/** The outcome of one save; only `failed` carries the account client's failure. */
export type SaveOutcome =
  /** The server stored the save and gave it this revision. */
  | { readonly kind: "saved"; readonly revision: number }
  /** The server holds a revision other than the one the save was based on (409 `save-conflict`). */
  | { readonly kind: "conflict" }
  /** The server holds a save of a higher version (409 `save-outdated`). */
  | { readonly kind: "outdated" }
  /** The save is over the limit: refused by the server (413 `save-too-large`) or measured and never sent. */
  | { readonly kind: "too-large" }
  /** There is no valid session (401). */
  | { readonly kind: "signed-out" }
  /** Any other answer, a failed connection or no answer within the time limit. */
  | { readonly kind: "failed"; readonly failure: AccountFailure };

export interface AccountClient {
  /** POST /api/accounts: creates the account and signs this browser in. */
  register(
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<AccountResult<RegisteredAccount>>;
  /** POST /api/session */
  login(email: string, password: string): Promise<AccountResult<Account>>;
  /** GET /api/account */
  currentAccount(): Promise<AccountResult<Account>>;
  /** POST /api/logout */
  logout(): Promise<AccountResult<null>>;
  /** POST /api/email-confirmation: spends the link's token; needs no session. */
  confirmEmail(token: string): Promise<AccountResult<null>>;
  /** POST /api/email-confirmation-message: asks for a new link for the signed-in account. */
  sendConfirmationMessage(): Promise<AccountResult<ConfirmationMessage>>;
  /** POST /api/password-reset-message: asks for a link to set a new password; needs no session. */
  requestPasswordReset(email: string): Promise<AccountResult<null>>;
  /** POST /api/password-reset: spends the link's token to set a new password; needs no session. */
  setPassword(
    token: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<AccountResult<null>>;
  /** GET /api/saved-game: the account's saved game state, or null when it has none. */
  loadSavedGame(): Promise<AccountResult<SavedGame | null>>;
  /** PUT /api/saved-game: replaces the saved game state, sent with `keepalive`. */
  saveGame(submission: SavedGameSubmission): Promise<SaveOutcome>;
}

export interface AccountClientOptions {
  /** The longest wait for one request, answer body included. */
  readonly timeoutMs?: number;
}

export const defaultTimeoutMs = 15_000;

/** The most bytes of a save body: the server's limit, which is also the page's keepalive quota. */
export const maxSaveBodyBytes = 65_536;

const tooManyAttempts = "Za dużo prób. Spróbuj ponownie za kilka minut.";
const unreachableMessage = "Brak połączenia z serwerem. Spróbuj ponownie.";
const serverErrorMessage =
  "Serwer nie mógł obsłużyć żądania. Spróbuj ponownie.";

interface Reply {
  readonly status: number;
  readonly text: string;
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

function isRefusalCode(value: unknown): value is RefusalCode {
  return refusalCodes.some((code) => code === value);
}

/** The server's own message is shown only with a known code; otherwise the status chooses. */
function refusal(reply: Reply): AccountFailure {
  const body = parseJson(reply.text);
  if (typeof body === "object" && body !== null && !Array.isArray(body)) {
    const { code, error } = body as Record<string, unknown>;
    if (isRefusalCode(code) && typeof error === "string" && error !== "") {
      return { kind: "refused", status: reply.status, code, message: error };
    }
  }
  return {
    kind: "refused",
    status: reply.status,
    code: null,
    message: reply.status === 429 ? tooManyAttempts : serverErrorMessage,
  };
}

function unexpected(reply: Reply): AccountFailure {
  return {
    kind: "unexpected",
    status: reply.status,
    message: serverErrorMessage,
  };
}

function objectOf(text: string): Record<string, unknown> | null {
  const body = parseJson(text);
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return null;
  }
  return body as Record<string, unknown>;
}

function isConfirmationMessage(value: unknown): value is ConfirmationMessage {
  return value === "sent" || value === "limited" || value === "failed";
}

/** The fields of an account, copied; any other property is dropped. */
function accountOfBody(body: Record<string, unknown>): Account | null {
  const { id, email, emailConfirmed } = body;
  if (typeof id !== "string" || id === "") return null;
  if (typeof email !== "string" || email === "") return null;
  if (typeof emailConfirmed !== "boolean") return null;
  return { id, email, emailConfirmed };
}

function accountOf(text: string): Account | null {
  const body = objectOf(text);
  return body === null ? null : accountOfBody(body);
}

function registeredAccountOf(text: string): RegisteredAccount | null {
  const body = objectOf(text);
  if (body === null) return null;
  const account = accountOfBody(body);
  const { confirmationMessage } = body;
  if (account === null || !isConfirmationMessage(confirmationMessage)) {
    return null;
  }
  return { ...account, confirmationMessage };
}

function messageOf(text: string): ConfirmationMessage | null {
  const confirmationMessage = objectOf(text)?.confirmationMessage;
  return isConfirmationMessage(confirmationMessage)
    ? confirmationMessage
    : null;
}

async function exchange(
  path: string,
  method: "GET" | "POST" | "PUT",
  body: string | undefined,
  timeoutMs: number,
  keepalive = false,
): Promise<Reply | AccountFailure> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const response = await fetch(path, {
      method,
      headers,
      body,
      keepalive,
      credentials: "same-origin",
      cache: "no-store",
      redirect: "error",
      signal: controller.signal,
    });
    // The time limit covers reading the body, so a stalled answer ends here too.
    return { status: response.status, text: await response.text() };
  } catch {
    return {
      kind: "unreachable",
      reason: timedOut ? "timeout" : "network",
      message: unreachableMessage,
    };
  } finally {
    clearTimeout(timer);
  }
}

function isReply(outcome: Reply | AccountFailure): outcome is Reply {
  return "text" in outcome;
}

/** Success only for the request's own status and a body `read` accepts. */
async function request<Value>(
  path: string,
  method: "GET" | "POST",
  payload: unknown,
  successStatus: number,
  read: (text: string) => Value | null,
  timeoutMs: number,
): Promise<AccountResult<Value>> {
  const body = method === "POST" ? JSON.stringify(payload) : undefined;
  const outcome = await exchange(path, method, body, timeoutMs);
  if (!isReply(outcome)) return { ok: false, failure: outcome };
  if (outcome.status >= 400) return { ok: false, failure: refusal(outcome) };
  const value = outcome.status === successStatus ? read(outcome.text) : null;
  if (value === null) return { ok: false, failure: unexpected(outcome) };
  return { ok: true, value };
}

/** A success with no body: only the 204 status counts. */
async function noContentRequest(
  path: string,
  payload: unknown,
  timeoutMs: number,
): Promise<AccountResult<null>> {
  const outcome = await exchange(
    path,
    "POST",
    JSON.stringify(payload),
    timeoutMs,
  );
  if (!isReply(outcome)) return { ok: false, failure: outcome };
  if (outcome.status >= 400) return { ok: false, failure: refusal(outcome) };
  if (outcome.status !== 204)
    return { ok: false, failure: unexpected(outcome) };
  return { ok: true, value: null };
}

function hasExactKeys(
  value: Record<string, unknown>,
  keys: readonly string[],
): boolean {
  const own = Object.keys(value);
  return own.length === keys.length && keys.every((key) => key in value);
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function isGameObject(value: unknown): value is object {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** The `save` of a load answer: null, or exactly a version, a revision and a game object. */
function savedGameOf(text: string): { readonly save: SavedGame | null } | null {
  const body = objectOf(text);
  if (body === null || !hasExactKeys(body, ["save"])) return null;
  const { save } = body;
  if (save === null) return { save: null };
  if (!isGameObject(save)) return null;
  const fields = save as Record<string, unknown>;
  if (!hasExactKeys(fields, ["version", "revision", "game"])) return null;
  const { version, revision, game } = fields;
  if (!isPositiveInteger(version) || !isPositiveInteger(revision)) return null;
  if (!isGameObject(game)) return null;
  return { save: { version, revision, game } };
}

function revisionOf(text: string): number | null {
  const body = objectOf(text);
  if (body === null || !hasExactKeys(body, ["revision"])) return null;
  return isPositiveInteger(body.revision) ? body.revision : null;
}

async function loadSavedGame(
  timeoutMs: number,
): Promise<AccountResult<SavedGame | null>> {
  const outcome = await exchange(
    "/api/saved-game",
    "GET",
    undefined,
    timeoutMs,
  );
  if (!isReply(outcome)) return { ok: false, failure: outcome };
  if (outcome.status >= 400) return { ok: false, failure: refusal(outcome) };
  const loaded = outcome.status === 200 ? savedGameOf(outcome.text) : null;
  if (loaded === null) return { ok: false, failure: unexpected(outcome) };
  return { ok: true, value: loaded.save };
}

function failed(failure: AccountFailure): SaveOutcome {
  return { kind: "failed", failure };
}

async function saveGame(
  submission: SavedGameSubmission,
  timeoutMs: number,
): Promise<SaveOutcome> {
  const { version, basedOn, game } = submission;
  const body = JSON.stringify({ version, basedOn, game });
  // The browser refuses a larger keepalive body, so the limit is measured before sending.
  if (new TextEncoder().encode(body).length > maxSaveBodyBytes) {
    return { kind: "too-large" };
  }
  const outcome = await exchange(
    "/api/saved-game",
    "PUT",
    body,
    timeoutMs,
    true,
  );
  if (!isReply(outcome)) return failed(outcome);
  if (outcome.status === 200) {
    const revision = revisionOf(outcome.text);
    return revision === null
      ? failed(unexpected(outcome))
      : { kind: "saved", revision };
  }
  if (outcome.status === 401) return { kind: "signed-out" };
  if (outcome.status < 400) return failed(unexpected(outcome));
  const refused = refusal(outcome);
  if (refused.kind === "refused") {
    if (refused.status === 409 && refused.code === "save-conflict") {
      return { kind: "conflict" };
    }
    if (refused.status === 409 && refused.code === "save-outdated") {
      return { kind: "outdated" };
    }
    if (refused.status === 413 && refused.code === "save-too-large") {
      return { kind: "too-large" };
    }
  }
  return failed(refused);
}

export function createAccountClient(
  options: AccountClientOptions = {},
): AccountClient {
  const timeoutMs = options.timeoutMs ?? defaultTimeoutMs;
  return {
    register: (email, password, passwordConfirmation) =>
      request(
        "/api/accounts",
        "POST",
        { email, password, passwordConfirmation },
        201,
        registeredAccountOf,
        timeoutMs,
      ),
    login: (email, password) =>
      request(
        "/api/session",
        "POST",
        { email, password },
        200,
        accountOf,
        timeoutMs,
      ),
    currentAccount: () =>
      request("/api/account", "GET", undefined, 200, accountOf, timeoutMs),
    logout: () => noContentRequest("/api/logout", {}, timeoutMs),
    confirmEmail: (token) =>
      noContentRequest("/api/email-confirmation", { token }, timeoutMs),
    sendConfirmationMessage: () =>
      request(
        "/api/email-confirmation-message",
        "POST",
        {},
        200,
        messageOf,
        timeoutMs,
      ),
    requestPasswordReset: (email) =>
      noContentRequest("/api/password-reset-message", { email }, timeoutMs),
    setPassword: (token, password, passwordConfirmation) =>
      noContentRequest(
        "/api/password-reset",
        { token, password, passwordConfirmation },
        timeoutMs,
      ),
    loadSavedGame: () => loadSavedGame(timeoutMs),
    saveGame: (submission) => saveGame(submission, timeoutMs),
  };
}
