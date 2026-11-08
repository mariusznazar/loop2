# End one session from the owner's support page

The owner's support page, which is not written yet, shows an account's address
and lets the owner end one browser's session of it, named by the session's
identifier. The ending is one function that you write now.

Create `src/server/session-end.ts`. It exports:

```ts
export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd;
```

The function looks the session up (`AccountDatabase.readSession`). When there is
no such session, or it has expired, it returns `{ outcome: "unknown" }` and
leaves nothing in the log. Otherwise it reads the session's account
(`AccountDatabase.findAccountById`), deletes the session
(`AccountDatabase.destroySession`), writes the `signed-out` event of the
product's log, and returns `{ outcome: "ended", accountId, email }` with the
account's id and its address as the support page shows them.

When the database fails at any step, the function does not throw. It writes the
failure to the server's log, in the form the rest of the server writes its
failures, so that the owner can tell which sign-out it was, and returns
`{ outcome: "failed" }`.

The function stands alone: it is wired nowhere (the support page that calls it is
a later task), and no file beyond the new one is touched unless the function
needs it. The project must still build with `npm run build`.
