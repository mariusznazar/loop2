import type { AccountDatabase } from "./database.js";

// One line of the owner's saved-game overview: how far an account's saved game
// has got, as its revision.
export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// Summarizes the saved games of the named accounts, in the order given. An
// account with no saved game, or that no account has the id of, is left out.
// Only the revision is taken; the game's text is neither read nor returned.
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
