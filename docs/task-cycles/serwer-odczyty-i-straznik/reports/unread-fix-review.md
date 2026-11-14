PASS 51289d70cff5e72fdeef7b78120dc67cd2a358d1

# Review of the fix of finding I1 (the reading of the game's log for a busy failure), task cycle `serwer-odczyty-i-straznik`

Reviewer: the same fresh reviewer that wrote `reports/unread-reading.md` and I1; I did not make the fix. Worktree `the root of the worktree`, `git rev-parse HEAD` = `51289d70cff5e72fdeef7b78120dc67cd2a358d1`, range `6cb19fb6..51289d70` (one commit). Read-only; no commit, no `npm test`, no command on the server (the raw outputs in the fix report are taken as the author's claims; I could not repeat them).

Counts: new blocking 0; new Minor 1; I1 fixed. M1 and M2 of the earlier report were not given to this fix and remain for the request's list.

## Changed files (the range)

- `foundations/environment_facts.md`: 2 lines added, 2 removed (entry `loop2-app-log-sqlite-busy-lines`, sentence and *Source*).
- `foundations/decisions.md`: 5 lines added, 4 removed (D-205 *Rationale*, one sentence).
- Nothing else (`git diff 6cb19fb6 51289d70 --stat`: 2 files, 7 insertions, 6 deletions).

## I1: fixed

What I checked against my finding:

1. **The needle is what the game's log writes.** `src/server/log-line.ts` writes `console.error(JSON.stringify({ failure, ...errorFields(error), place, ...fields }))`, and `errorFields` returns `{ kind, code, errcode }` in that order. A failure line therefore holds `...,"code":"ERR_SQLITE_ERROR","errcode":5,"place":...`, so the fixed string `"errcode":5,` is exactly what a busy failure leaves (`database.ts:197-206` compares `errcode` with 5). The trailing comma is a sound choice: it keeps an extended number such as 517 out, and `errcode` is a number in the middle of the object, so a comma always follows it (`place` is always present, after it). The form is an allowed reading of the skill (`grep -F -m 50 -- '<fixed string>'` of the dump and `.1`).
2. **A positive control exists, with its limit named.** The fact's *Source* adds `grep -F -m 50 -- '"event":"link-issued"' /var/log/loop2-app.log`, whose output is a real dump line written in the same JSON style (no space after the colon, `Z {"event":...`), so a fixed string written the way the game writes its lines can match the dump. No control with a failure needle can exist because the dump holds no failure line; the fix report says so (the own-work check) and the fact does not claim more. This is the weak spot of the reading, and it is stated, not hidden.
3. **What the fact can and cannot show is said.** The sentence now covers: no line with `"errcode":5,` in the dump or the copy; no line with `"failure":` in the dump, so no failure line of the JSON kind; the copy holds one line, `logrotate trial`, and no game line. It makes no claim about the dump's time span (the fix report says no allowed reading gives it, and I found none in the skill's list). D-205 no longer implies that the copy was searched for what a busy failure leaves.
4. **No count the output does not carry.** The two counts in the fact are "no line" (empty outputs) and "one line" (the whole output of `tail -n 200` of the copy is the single line `logrotate trial`, which for a file of at most 200 lines shows the whole file). I found no other number. The account identifier in the control is `<account>`, as the other facts do it.
5. **D-205 and the fact agree.** Fact: no `"errcode":5,` in either file, no `"failure":` in the dump, the copy holds `logrotate trial` only. D-205: the dump "held no line with SQLite's busy number 5 in a failure line and no failure line of any kind", the copy "held no line of the game", "the log of the running containers was not read". The same three statements; the old "on 2026-11-14 neither ... held a line with `SQLITE_BUSY`" is gone.
6. **No binding sentence of D-205 changed.** The hunk is inside the *Rationale* paragraph, after the clause on looking at the choice again; the statement, *Scope*, *Based on* (still names the fact), *Relations*, *Verification* and *Origin* are unchanged (`git diff` shows no line of those fields; the hunk is `foundations/decisions.md:3986-3993`).
7. **No other place quotes the old claim.** `grep -rn "SQLITE_BUSY\|sqlite-busy"` outside `.runs`, `.the-way`, `node_modules` and `.git`: `foundations/decisions.md:3980` (D-205 *Based on*, the identifier, kept), `foundations/environment_facts.md:834` (the heading), `src/server/database.ts:197,205` (the constant's use), `dist/server/database.js` (ignored build output, `git status` is clean), and `tests/deploy/test_loop2_watch.py:44` (the crafted line, pre-existing, declined in my earlier report). The skill (`.claude/skills/loop2-deploy/SKILL.md` and its twin) holds no match. The identifier `loop2-app-log-sqlite-busy-lines` still fits ("lines" of busy failures).
8. **Consistency with other facts.** `loop2-app-log-password-reset-mail-events` says the dump holds `link-issued` and `message-sent` lines of 2026-11-13 and no `"failure":"mail"`; `loop2-app-log-file-names` says the dump and one `.1` copy exist; D-355's Rationale says the server holds the file and one rotated copy. None contradicts the new fact.

`python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors". `git status --short`: clean.

## Findings

### Critical / Important

none.

### Minor (does not block; for the request's list)

**m1. "no failure line of any kind" is wider than the needle.** Place: `foundations/environment_facts.md:836` and the D-205 sentence at `foundations/decisions.md:3989-3991`. The reading looks for the text `"failure":`, which only the JSON lines of `writeFailure` hold; an error that no code handled and that Node prints by default (D-355's *Risks taken* names it: "Node's default print with a stack at an error before the last-resort handler") is a line without that text, and an unhandled busy error would stand there as `errcode: 5` in Node's own format, not as `"errcode":5,`. The fact's wording is "no line with the text `"failure":`, so no failure line of any kind", where "failure line" is the JSON line of D-252, and D-205's own sentence scopes the busy number to "in a failure line"; so a careful reader is not misled, and the log of the running containers is stated unread. A clause "of the kind the server writes" in both places would close it. It does not block.

## Declined to judge

- Whether the server's dump really holds no failure line, and what `logrotate trial` means (the author calls the cause unverified): server state, not checkable from the repository; the reading is the author's, quoted with its raw output in the fix report.
- `tests/deploy/test_loop2_watch.py:44` (unchanged by the fix, pre-existing).
- M1 and M2 of the earlier report (not given to this fix).

## Checks I ran

- `git rev-parse HEAD`: `51289d70cff5e72fdeef7b78120dc67cd2a358d1`.
- `git log --oneline 6cb19fb6..51289d70`: one commit. `git diff 6cb19fb6 51289d70 --stat` and the whole diff: read.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- `grep -rn "SQLITE_BUSY\|sqlite-busy"` over the repository without `.runs`, `.the-way`, `node_modules`, `.git`: the places listed above.
- `git status --short`: clean.
- Not run: `npm test`; any command on the server (no `mikrus` tools used), so the raw outputs of the fix report are unverified by me.
- Not run by me: the author's `python -B -m unittest -v test_tracked_file_private_paths` (the fix report gives exit 0); the diff holds no server identity, address or account identifier that I could see (account number shown as `<account>`).

## Reaches beyond the dispatch (what, where, why)

- `src/server/log-line.ts` (read whole), `src/server/database.ts:190-215`: to confirm the key order and the number the needle must match.
- `foundations/decisions.md:3975-4000` (D-205 whole): to see that no binding field moved.
- `foundations/environment_facts.md` entries `loop2-app-log-password-reset-mail-events`, `loop2-app-log-file-names`: for consistency with the new sentence.
- D-355's Rationale (`foundations/decisions.md` D-355, "Risks taken"): for m1.
- `docs/task-cycles/serwer-odczyty-i-straznik/reports/unread-reading-findings.md` and `unread-fix-report.md`: the dispatch's inputs.

## Unread material

- Read whole: the fix report, the findings file, the whole diff of the range, D-205, `src/server/log-line.ts`.
- Read in part: `src/server/database.ts` (lines 190-215), `foundations/environment_facts.md` (the changed entry and the two neighbouring facts named above), D-355 (Rationale only).
- Not read: the-way's templates for facts and decisions (the author read them; I checked the result against `foundation_check.py`, which passed), `tests/account-storage.test.mjs` beyond what I read in the first review, the skill beyond the grep for the old claim.

## Searches not found or unclear

- A line of the game's log holding `"errcode":5,` in the repository or the tests: not found (the tests use 26 and 1811); the form of a busy line is concluded from `JSON.stringify` and the key order, as the fix report itself says.
- The dump's time span on 2026-11-14: no allowed reading gives it; the fact leaves it out, which is the honest choice, and the "no failure line" result therefore says nothing about earlier nights.
- A the-way rule on how a fact's *Source* quotes an empty output: not looked up by me; `foundation_check.py` passes and the other entries use "no output".
