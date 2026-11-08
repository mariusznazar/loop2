import type { AccountDatabase } from "./database.js";
import { writeEvent } from "./log-line.js";

export interface BlockBatchResult {
  blocked: number;
  alreadyBlocked: number;
  unknown: number;
}

// Blocks the accounts of normalized addresses one after another, each with
// `AccountDatabase.blockAccount`. An account that becomes blocked leaves the
// same line as when `account-block` blocks it; the run ends with one line
// carrying the three counts. A database failure is not handled here: it
// leaves at once, and the run's end line is not written.
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
  writeEvent("account-block-batch-ended", { ...result });
  return result;
}
