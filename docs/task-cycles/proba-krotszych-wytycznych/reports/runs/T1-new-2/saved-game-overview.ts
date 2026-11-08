import type { AccountDatabase } from "./database.js";

export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// Lists, for each given account id in the given order, the revision of the
// account's saved game. An account with no saved game, or an id no account
// has, is left out. A stored saved game that cannot be read makes the
// database throw, and the error is not caught here.
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
