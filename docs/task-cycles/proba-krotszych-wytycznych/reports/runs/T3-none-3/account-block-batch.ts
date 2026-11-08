import type { AccountDatabase } from "./database.js";
import { writeEvent } from "./log-line.js";

// Blocks the accounts of a list of normalized addresses in one run, each as
// `account-block` blocks one: with `AccountDatabase.blockAccount`, in the order
// given, leaving the same `account-blocked` line for each account that becomes
// blocked. When the run is over it writes one last line, `account-block-batch-ended`;
// it holds no address, no count and no identifier, since a line names no person
// (D-252). A failure of the database is not handled here: it leaves the
// function as it comes, so a run that failed writes no closing line.

export interface BlockBatchResult {
  blocked: number;
  alreadyBlocked: number;
  unknown: number;
}

export function blockAccounts(
  database: AccountDatabase,
  addresses: readonly string[],
): BlockBatchResult {
  const result: BlockBatchResult = {
    blocked: 0,
    alreadyBlocked: 0,
    unknown: 0,
  };
  for (const address of addresses) {
    const outcome = database.blockAccount(address);
    if (outcome.outcome === "unknown") {
      result.unknown += 1;
    } else if (outcome.outcome === "already-blocked") {
      result.alreadyBlocked += 1;
    } else {
      result.blocked += 1;
      writeEvent("account-blocked", { accountId: outcome.accountId });
    }
  }
  writeEvent("account-block-batch-ended");
  return result;
}
