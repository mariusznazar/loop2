import type { AccountDatabase } from "./database.js";
import { writeEvent } from "./log-line.js";

// Blocks the accounts of a list of normalized addresses in one run, in the
// order given, each with `AccountDatabase.blockAccount`. A failure of the
// database is not handled here: it leaves the function as it comes, and the
// run then leaves no closing line.

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
    if (outcome.outcome === "blocked") {
      result.blocked += 1;
      writeEvent("account-blocked", { accountId: outcome.accountId });
    } else if (outcome.outcome === "already-blocked") {
      result.alreadyBlocked += 1;
    } else {
      result.unknown += 1;
    }
  }
  writeEvent("account-block-batch-ended");
  return result;
}
