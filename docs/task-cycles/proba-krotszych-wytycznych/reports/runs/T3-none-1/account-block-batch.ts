import type { AccountDatabase } from "./database.js";
import { writeEvent } from "./log-line.js";

// The owner's run that blocks a list of accounts at once: each address is
// blocked as `account-block` blocks one, with the same log line for each
// account that becomes blocked, and one last line tells the run is over.

export interface BlockBatchResult {
  blocked: number;
  alreadyBlocked: number;
  unknown: number;
}

// The addresses are already normalized. A database failure is not caught: it
// leaves the function as it comes, and the run then writes no closing line.
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
