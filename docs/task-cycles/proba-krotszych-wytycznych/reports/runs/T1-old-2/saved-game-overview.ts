import type { AccountDatabase } from "./database.js";

export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// Lists, in the order given, how far each account's saved game has got. An
// account without a saved game, or an id no account has, is left out. A stored
// saved game that cannot be read makes readSavedGame throw; that failure is not
// caught here, so it is never turned into a shorter list.
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
