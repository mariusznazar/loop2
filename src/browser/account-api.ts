// The browser's client of the account API: relative requests, a bounded wait, and one typed result
// for every outcome. It holds no identity, reads no cookie and touches no DOM or game state.

/** The account the server names; the client keeps nothing else of a response. */
export interface Account {
  readonly id: string;
  readonly email: string;
}

/** The codes the account routes put on a refusal of their own. */
export const refusalCodes = [
  "invalid-request",
  "invalid-email",
  "invalid-password",
  "password-mismatch",
  "invalid-credentials",
  "unauthenticated",
  "account-exists",
  "too-many-attempts",
  "session-unavailable",
  "logout-failed",
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

export interface AccountClient {
  /** POST /api/accounts: creates the account and signs this browser in. */
  register(
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<AccountResult<Account>>;
  /** POST /api/session */
  login(email: string, password: string): Promise<AccountResult<Account>>;
  /** GET /api/account */
  currentAccount(): Promise<AccountResult<Account>>;
  /** POST /api/logout */
  logout(): Promise<AccountResult<null>>;
}

export interface AccountClientOptions {
  /** The longest wait for one request, answer body included. */
  readonly timeoutMs?: number;
}

export const defaultTimeoutMs = 15_000;

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

/** The two string fields of an account, copied; any other property is dropped. */
function accountOf(text: string): Account | null {
  const body = parseJson(text);
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return null;
  }
  const { id, email } = body as Record<string, unknown>;
  if (typeof id !== "string" || id === "") return null;
  if (typeof email !== "string" || email === "") return null;
  return { id, email };
}

async function exchange(
  path: string,
  method: "GET" | "POST",
  payload: unknown,
  timeoutMs: number,
): Promise<Reply | AccountFailure> {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (method === "POST") headers["Content-Type"] = "application/json";
    const response = await fetch(path, {
      method,
      headers,
      body: method === "POST" ? JSON.stringify(payload) : undefined,
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

async function accountRequest(
  path: string,
  method: "GET" | "POST",
  payload: unknown,
  successStatus: number,
  timeoutMs: number,
): Promise<AccountResult<Account>> {
  const outcome = await exchange(path, method, payload, timeoutMs);
  if (!isReply(outcome)) return { ok: false, failure: outcome };
  if (outcome.status >= 400) return { ok: false, failure: refusal(outcome) };
  const account =
    outcome.status === successStatus ? accountOf(outcome.text) : null;
  if (account === null) return { ok: false, failure: unexpected(outcome) };
  return { ok: true, value: account };
}

export function createAccountClient(
  options: AccountClientOptions = {},
): AccountClient {
  const timeoutMs = options.timeoutMs ?? defaultTimeoutMs;
  return {
    register: (email, password, passwordConfirmation) =>
      accountRequest(
        "/api/accounts",
        "POST",
        { email, password, passwordConfirmation },
        201,
        timeoutMs,
      ),
    login: (email, password) =>
      accountRequest(
        "/api/session",
        "POST",
        { email, password },
        200,
        timeoutMs,
      ),
    currentAccount: () =>
      accountRequest("/api/account", "GET", undefined, 200, timeoutMs),
    logout: async () => {
      const outcome = await exchange("/api/logout", "POST", {}, timeoutMs);
      if (!isReply(outcome)) return { ok: false, failure: outcome };
      if (outcome.status >= 400)
        return { ok: false, failure: refusal(outcome) };
      if (outcome.status !== 204) {
        return { ok: false, failure: unexpected(outcome) };
      }
      return { ok: true, value: null };
    },
  };
}
