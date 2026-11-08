import type { AccountDatabase } from "./database.js";

// How far one account's saved game has got: the account's number and the
// revision of its saved game state, from 1.
export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// The summaries of the saved games of the named accounts, in the order the
// accounts are named. An account with no saved game, or that no account has the
// id of, is left out. A stored saved game the database cannot read is a failure
// and passes through, never an empty entry.
export function summarizeSavedGames(
  database: AccountDatabase,
  accountIds: readonly string[],
): SavedGameSummary[] {
  const summaries: SavedGameSummary[] = [];
  for (const accountId of accountIds) {
    const savedGame = database.readSavedGame(accountId);
    if (savedGame) summaries.push({ accountId, revision: savedGame.revision });
  }
  return summaries;
}
