import type { AccountDatabase } from "./database.js";
import { writeEvent } from "./log-line.js";

// The owner blocks several accounts in one run. Each address is blocked as
// `account-block` blocks one, in the order given, and each account that becomes
// blocked leaves the same `account-blocked` line. When every address is done,
// one last line gives the counts. A database failure is not caught here: the
// run stops, no end line is written and the caller sees the original error.

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
  writeEvent("account-block-batch-ended", { ...result });
  return result;
}
