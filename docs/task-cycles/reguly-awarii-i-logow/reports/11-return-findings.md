# Findings to fix — review of the return step, `reports/10-return-review-report.md`, first line `FAIL defa71f45c1de0879433ef965307eaf3626e872f`

The blocking finding, in the reviewer's words.

### I1. D-253 keeps its exception in *complies*, while its binding sentence stands unqualified

**Anchor:** `foundations/decisions.md:5136`-`:5137` (binding sentence) and `:5148`-`:5149` (the new *complies* item)

**To paste:** D-253's first sentence still says that each process touching the data of accounts has a handler writing kind, code and place, yet `scripts/restore-trial.mjs` and `deploy/loop2-backup` touch those data and write neither. The new *complies* item allows them, but an exception foreseen in advance belongs in the binding sentences, so the first sentence needs the qualification question 4 already carries.

**Why I report it:**

- **What the sentence is for.** The binding sentence is what an agent compares a change with and what the human accepts at the merge. *Verification* holds examples of keeping the decision; it does not narrow it.
- **The mechanism.** `.the-way/elements/decisions/template.md:102`-`:103`: „An exception foreseen in advance is written into the binding sentences ("X is allowed when Y"); acting on it is then not a contradiction (WAY-30).” WAY-30 repeats it (`.the-way/foundations/decisions.md:769`-`:771`). The return step saw the collision and says so itself: without the new item, `scripts/restore-trial.mjs`, „which does touch a decrypted database and writes no kind or code, read as a breach of the first sentence” (`08-return-report.md:63`). The item stops the breach from showing in one field. The first sentence reads as before.
- **Concrete values.** Both touch the data:
  - `scripts/restore-trial.mjs:1`-`:3` runs „a decrypted backup of the account database”. Its last handling is a fixed verdict, `scripts/restore-trial.mjs:578`, with no kind, code or place.
  - `deploy/loop2-backup:8`-`:9` streams the plain database through its own pipe. Its last handling is `end: failed (exit N)`, `deploy/loop2-backup:132`.
  - The other two names of the item are not exceptions: `src/server/account-database-check.ts:16`-`:17` and `src/server/measure-passwords.ts:15`-`:16` touch no database of the server, and „added” in *violates* leaves them clear.
- **A second overlap the item does not settle.** `scripts/restore-trial.mjs` is also „a script run by hand”, so the second binding sentence lets it rest on the default print, while the first demands a handler and *Rationale* limits the default print to „a script that touches no account”. The binding sentences give no way to tell which applies.
- **The grade.** WAY-263: a change that restates an entry it writes „differently, including more broadly or without a qualification” is Important. The first sentence is broader than the entry's own *complies* and than question 4. A dispatch or a report calling this a wording matter does not lower it.
- **Both ways.**
  - Left as it is: nothing breaks today, because a reader who reaches *complies* gets the right answer. But the human accepts at the merge a sentence the product does not meet, and a later agent comparing a change with the binding sentence alone finds a breach in two standing files. The cost is one more review and a false alarm for each such reader.
  - Fixed: one clause in the first sentence, then this review of the fix. It asks nothing of the human, since question 4 of the accepted task carries the meaning (`task.md:54`, and `foundation_step.md`, „beyond what the accepted task document … carries”).
- **Direction, not binding.** Say in the binding sentences that `scripts/restore-trial.mjs` and `deploy/loop2-backup`, which touch those data, keep the handling they have, or draw the first sentence so that they fall outside it. Then *complies* can shorten or stay. `guidelines/coding.md:170`-`:177` already reads correctly and needs no change.
