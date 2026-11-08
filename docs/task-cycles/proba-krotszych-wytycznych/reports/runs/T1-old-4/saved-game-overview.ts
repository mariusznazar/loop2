import type { AccountDatabase } from "./database.js";

export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// Lists how far the saved game of each given account has got, in the order of
// the ids. An account without a saved game, or that no account has the id of,
// is left out. A failed read is not hidden: its error reaches the caller.
export function summarizeSavedGames(
  database: AccountDatabase,
  accountIds: readonly string[],
): SavedGameSummary[] {
  const summaries: SavedGameSummary[] = [];
  for (const accountId of accountIds) {
    const saved = database.readSavedGame(accountId);
    if (saved !== null) summaries.push({ accountId, revision: saved.revision });
  }
  return summaries;
}
