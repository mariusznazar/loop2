import { AccountDatabase } from "./database.js";
import { writeEvent } from "./log-line.js";

// The owner blocks several accounts in one run. The addresses are already
// normalized. Each account is blocked as `account-block` blocks one, and each
// one that becomes blocked leaves the same `account-blocked` line. A database
// failure is not handled here: it leaves the function as it comes, and then no
// line says that the run has ended.

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
