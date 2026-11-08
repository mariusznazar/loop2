# Block several accounts in one run

The owner sometimes has to block a dozen accounts at once. `account-block`
blocks one account named by its address; for a list the owner needs the same
thing in one run. The run is one function that you write now.

Create `src/server/account-block-batch.ts`. It exports:

```ts
export interface BlockBatchResult {
  blocked: number;
  alreadyBlocked: number;
  unknown: number;
}

export function blockAccounts(
  database: AccountDatabase,
  addresses: readonly string[],
): BlockBatchResult;
```

The addresses are already normalized. For each address, in the order given, the
function blocks the account with `AccountDatabase.blockAccount`. It counts the
accounts that became blocked (`blocked`), the ones that already were
(`alreadyBlocked`) and the addresses no account has (`unknown`). Each account
that becomes blocked leaves the same line in the server's log as when
`account-block` blocks it. When the whole run is over, the function writes one
more line, the last one, saying that the run has ended, so that the owner can
see in the log what the run did at a glance.

A failure of the database is not handled here: the function lets it out as it
comes. The function stands alone: it is wired nowhere (the command that calls it
is a later task), and no file beyond the new one is touched unless the function
needs it. The project must still build with `npm run build`.
