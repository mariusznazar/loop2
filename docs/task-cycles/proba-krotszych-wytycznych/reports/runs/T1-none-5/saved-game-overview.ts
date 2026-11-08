import type { AccountDatabase } from "./database.js";

export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// For each account id, in the order given, reads the account's saved game
// state and adds its account id and revision to the result. An account without
// a saved game state, or an id no account has, adds nothing. The saved game
// state itself is not part of the result.
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
