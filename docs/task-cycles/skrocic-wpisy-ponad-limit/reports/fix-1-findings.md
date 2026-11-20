# Findings for the fix — Minor findings of the whole-change review within the task (cut from `reports/review-whole-report.md` in the reviewer's words)

Review: `PASS 3e5018a83f709aade1302360b992996ad2984da0`, no blocking finding. These three Minor findings are within the task and are fixed before the gate (WAY-161). Finding 2 of the review (neighbouring comments repeating the opening of a rewritten quotation) is outside the task and is NOT to be fixed.

1. **`foundations/decisions.md:619` — D-115 *Relations* lose D-112 instead of naming both
   (within the task).** The change replaces `derives from D-112` by `derives from D-435` in D-115.
   D-115's binding sentence says the Store "validates stored session identity and cookie metadata
   before library hydration"; the stored session row it validates — "identifier, account foreign
   key, serialized library data and absolute expiry" — is defined by the second paragraph of D-112,
   which stays in D-112, while the touch and expiry rules it adapts moved to D-435. Point 6 of the
   task gives two outcomes for such a reference: a general reference stays at D-112, one that rests
   on sentences of two entries names both. Replacing does neither, and is inconsistent with the
   author's own handling of D-410 (`foundations/decisions.md:2977`, D-112 kept and D-435 added).
   Consequence: a reader or agent following D-115's *Relations* (the template's readers: collision
   between decisions, the search of the foundation) no longer reaches the decision that defines the
   session row. Defensible reading on the other side: the task itself moved the invariant
   `account-session-storage` (derived from D-115) from D-112 to D-435, so the author followed that
   analogy. Fix: `derives from D-28 · derives from D-107 · derives from D-112 · derives from D-435`.
   Evidence: `git diff ede71b5f..84a819c8 -- foundations/decisions.md`, hunk `@@ -619 +619 @@`.

3. **`src/server/account-backup.ts:21` — a comment line of 85 columns (within the task).** The
   reference became `(D-112, D-436)` and the line was not rewrapped, while the comment around it
   wraps at 80. Prettier does not wrap comments and its check passes; polish only.
4. **Author's meaning sentence of D-435 (author report, "Foundation entries written") is narrower
   than the entry (within the task; not in the files).** "each write to the account database reads
   the block, version, revision, role or link state it depends on inside its own transaction, and
   expired sessions and emailed links are pruned in bounded batches" covers what the writes read,
   but the entry's question is "read *and change*": blocking and a password reset delete the
   account's sessions and mark its links in that transaction, a session write for a blocked account
   or for a replaced password hash stores nothing, the privilege and role writes report three
   outcomes and the role write ends no session, and blocking keeps the saves. If the sentence goes
   to the human in the request as the meaning of D-435, it under-describes what the human reads
   before the merge. A wording that matches: "Each write to the account database reads what it
   depends on — the block, the save's version and revision, the privilege, the role, whether a link
   still works — in the transaction that writes, and blocking, a password reset and the reset of the
   game change the account's sessions, links and saves in that same transaction; expired sessions
   and links are pruned at startup and periodically, and blocking keeps the saves." The D-436
   sentence matches the entry (it leaves out only the sentence of refusal and the two openings not
   bound, acceptable for a summary).
