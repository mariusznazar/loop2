import type { AccountDatabase } from "./database.js";

// How far one account's saved game has got: the account and the revision of its
// saved game state, which counts from 1.
export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

// The summaries of the saved games of the named accounts, in the order the
// ids are given. An account with no saved game, or that no account has the id
// of, is left out. The game's text is not read into the result.
export function summarizeSavedGames(
  database: AccountDatabase,
  accountIds: readonly string[],
): SavedGameSummary[] {
  const summaries: SavedGameSummary[] = [];
  for (const accountId of accountIds) {
    const savedGame = database.readSavedGame(accountId);
    if (savedGame) {
      summaries.push({ accountId, revision: savedGame.revision });
    }
  }
  return summaries;
}
