import type { AccountDatabase } from "./database.js";

export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// Summarizes how far the saved game of each given account has got, for the
// owner's overview. The result follows the order of accountIds and holds one
// entry per id that has a saved game; an id with no saved game, or that no
// account has, is left out. Only the revision is taken from a saved game: its
// game state is not carried into the result.
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
