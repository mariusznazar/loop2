import express from "express";
import type { Request, Response, Router } from "express";
import type { AccountRuntime } from "./configuration.js";
import type { Account } from "./database.js";
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
function sessionAccount(
  runtime: AccountRuntime,
  request: Request,
): Account | null {
  const accountId: unknown = request.session?.accountId;
  if (typeof accountId !== "string") return null;
  return runtime.database.findAccountById(accountId);
}

function unauthenticated(response: Response): void {
  refuse(
    response,
    401,
    "unauthenticated",
    "Sesja wygasła albo nie istnieje. Zaloguj się.",
  );
}

export function accountRoutes(runtime: AccountRuntime | null): Router {
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

  // Credentials and admission arrive with their policy; until then they stay unavailable.
  router.post([paths.accounts, paths.session], (_request, response) => {
    response.status(503).json({ error: "Accounts unavailable" });
  });

  return router;
}
