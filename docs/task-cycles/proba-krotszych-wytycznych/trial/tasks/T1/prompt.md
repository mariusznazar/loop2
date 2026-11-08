# Saved-game overview for the owner

The owner's overview page, which is not written yet, lists for a number of
accounts how far each account's saved game has got. Its data comes from one
function that you write now.

Create `src/server/saved-game-overview.ts`. It exports:

```ts
export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

export function summarizeSavedGames(
  database: AccountDatabase,
  accountIds: readonly string[],
): SavedGameSummary[];
```

For each account id in `accountIds`, in the order given, the function reads the
account's saved game from the account database (`AccountDatabase.readSavedGame`)
and, when the account has one, adds `{ accountId, revision }` of it to the
result. An account that has no saved game, or that no account has the id of, is
left out of the result. The overview page, which will call the function later,
turns its result into what the owner sees.

The function stands alone: it is wired nowhere (the page that calls it is a later
task), and no file beyond the new one is touched unless the function needs it.
The project must still build with `npm run build`.
