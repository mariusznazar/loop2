import type { AccountDatabase } from "./database.js";

export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// Lists how far the saved game of each given account has got, in the order of
// the given ids. An account without a saved game, or an id no account has, is
// left out. A stored saved game that cannot be read makes the call throw.
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
