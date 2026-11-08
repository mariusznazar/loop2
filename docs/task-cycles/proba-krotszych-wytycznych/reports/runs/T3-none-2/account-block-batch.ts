import { AccountDatabase } from "./database.js";
import { writeEvent } from "./log-line.js";

// Blocks the accounts of a list of normalized addresses in one run, in the
// order given, one `blockAccount` call per address, and counts what became of
// each. A database failure is not handled here: it leaves the function as it
// comes, and the closing line is not written for a run that did not end.

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
      // The same line `account-block` leaves for an account it blocks.
      writeEvent("account-blocked", { accountId: outcome.accountId });
      result.blocked += 1;
    } else if (outcome.outcome === "already-blocked") {
      result.alreadyBlocked += 1;
    } else {
      result.unknown += 1;
    }
  }
  writeEvent("account-block-batch-ended");
  return result;
}
