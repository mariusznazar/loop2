import express from "express";
import type { RequestHandler, Response, Router } from "express";
import { normalizeEmail } from "./account-policy.js";
import {
  accountBodyLimit,
  accountPrelude,
  invalidRequest,
  refuse,
  sessionAccount,
  stringFields,
  unauthenticated,
} from "./account-routes.js";
import type { AccountRuntime } from "./configuration.js";
import type {
  PanelBlockOutcome,
  PreviousSavePrivilegeOutcome,
  UnblockOutcome,
} from "./database.js";
import { writeEvent } from "./log-line.js";
import { mutationGuards } from "./transport.js";

// The routes of the owner panel (D-109, D-137, D-400, D-411): the list of
// accounts and the four operations on one of them. Only a session of an
// account with the owner role is answered; the address in the body names the
// target and grants no authority.
const paths = {
  list: "/api/owner/accounts",
  block: "/api/owner/block",
  unblock: "/api/owner/unblock",
  grantPreviousSave: "/api/owner/grant-previous-save",
  revokePreviousSave: "/api/owner/revoke-previous-save",
};

// The session names the account, and the role is read from the database at
// this request, never from the session (D-410). Nothing of the body is read
// here, so a session without the role learns nothing from the route.
function ownerOnly(runtime: AccountRuntime): RequestHandler {
  return (request, response, next) => {
    const account = sessionAccount(runtime, request);
    if (!account) {
      unauthenticated(response);
      return;
    }
    if (account.role !== "owner") {
      refuse(
        response,
        403,
        "owner-forbidden",
        "To konto nie jest kontem właściciela.",
      );
      return;
    }
    next();
  };
}

function unknownAccount(response: Response): void {
  refuse(response, 404, "unknown-account", "Żadne konto nie ma tego adresu.");
}

// The address of the body is read as the login reads it (D-99); one that is
// written as no address is the address of no account.
function targetAddress(body: unknown): string | null | undefined {
  const input = stringFields(body, ["email"] as const);
  return input ? normalizeEmail(input.email) : undefined;
}

type PanelResult =
  PanelBlockOutcome | UnblockOutcome | PreviousSavePrivilegeOutcome;

// The outcomes that name an account, and the event each change writes: a misspelled
// outcome or event is no key or value of these types.
type ChangeOutcome = Extract<PanelResult, { accountId: string }>["outcome"];
type PanelEvent =
  | "account-blocked"
  | "account-unblocked"
  | "account-previous-save-granted"
  | "account-previous-save-revoked";

// One shape for the four operations: the role, then the body, then the
// operation, then the answer; each writes the line of its change, and of a
// change only (D-252).
function operationRoute(
  router: Router,
  runtime: AccountRuntime,
  path: string,
  run: (address: string) => PanelResult,
  events: Readonly<Partial<Record<ChangeOutcome, PanelEvent>>>,
): void {
  router.post(path, ownerOnly(runtime), (request, response) => {
    const address = targetAddress(request.body);
    if (address === undefined) {
      invalidRequest(response);
      return;
    }
    if (address === null) {
      unknownAccount(response);
      return;
    }
    const result = run(address);
    if (result.outcome === "unknown") {
      unknownAccount(response);
      return;
    }
    if (result.outcome === "owner") {
      refuse(
        response,
        409,
        "owner-not-blockable",
        "Konta właściciela nie można zablokować.",
      );
      return;
    }
    const event = events[result.outcome];
    if (event) writeEvent(event, { accountId: result.accountId });
    response.json({ outcome: result.outcome });
  });
}

export function ownerRoutes(runtime: AccountRuntime | null): Router {
  const router = express.Router();

  router.all(Object.values(paths), accountPrelude(runtime));
  if (!runtime) return router;

  router.post(
    [
      paths.block,
      paths.unblock,
      paths.grantPreviousSave,
      paths.revokePreviousSave,
    ],
    ...mutationGuards(runtime.configuration.publicOrigin, accountBodyLimit),
  );

  router.get(paths.list, ownerOnly(runtime), (_request, response) => {
    response.json({ accounts: runtime.database.listAccounts() });
  });

  const { database } = runtime;
  operationRoute(
    router,
    runtime,
    paths.block,
    (address) => database.blockForPanel(address),
    { blocked: "account-blocked" },
  );
  operationRoute(
    router,
    runtime,
    paths.unblock,
    (address) => database.unblockAccount(address),
    { unblocked: "account-unblocked" },
  );
  operationRoute(
    router,
    runtime,
    paths.grantPreviousSave,
    (address) => database.setPreviousSavePrivilege(address, true),
    { granted: "account-previous-save-granted" },
  );
  operationRoute(
    router,
    runtime,
    paths.revokePreviousSave,
    (address) => database.setPreviousSavePrivilege(address, false),
    { revoked: "account-previous-save-revoked" },
  );

  return router;
}
