import type { AccountDatabase } from "./database.js";

export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// How far each account's saved game state has got, for the accounts given and
// in the order given. An account without a saved game state, or that no account
// has the id of, is left out. A failed read is not caught here: it is a
// failure, not an account without a saved game state.
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
