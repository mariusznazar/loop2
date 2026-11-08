import type { AccountDatabase } from "./database.js";

// How far one account's saved game has got: its account number and the
// revision of its saved game state.
export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// The owner's overview reads one summary per listed account, in the order
// given. An account with no saved game, or one no account has the id of, is
// left out. A stored saved game that cannot be read is a failure of the
// database and propagates; it is not turned into a missing summary.
export function summarizeSavedGames(
  database: AccountDatabase,
  accountIds: readonly string[],
): SavedGameSummary[] {
  const summaries: SavedGameSummary[] = [];
  for (const accountId of accountIds) {
    const saved = database.readSavedGame(accountId);
    if (saved) summaries.push({ accountId, revision: saved.revision });
  }
  return summaries;
}
