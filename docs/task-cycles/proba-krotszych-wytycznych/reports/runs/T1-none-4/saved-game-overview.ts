import type { AccountDatabase } from "./database.js";

// How far one account's saved game has got, as the owner's overview lists it.
export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// One summary per given account that has a saved game, in the order of
// `accountIds`. An account without a saved game, or that does not exist, is
// left out. The stored game text is not read into the result.
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
