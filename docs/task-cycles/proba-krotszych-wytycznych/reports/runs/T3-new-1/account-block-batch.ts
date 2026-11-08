import type { AccountDatabase } from "./database.js";
import { writeEvent } from "./log-line.js";

// Blocks a list of accounts, named by their normalized email addresses, in one
// run. Each address is blocked as `account-block` blocks one, in its own
// transaction, so a database failure part way leaves the earlier accounts
// blocked and reaches the caller as it comes.

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
