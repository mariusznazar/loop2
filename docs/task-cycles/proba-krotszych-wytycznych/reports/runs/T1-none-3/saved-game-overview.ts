import type { AccountDatabase } from "./database.js";

// How far one account's saved game has got, for the owner's overview. It names
// the account and the revision of its saved game and nothing of the game.
export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// Summarizes the saved games of the given accounts, in the order given. An
// account without a saved game, or one that no account has the id of, is left
// out.
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
