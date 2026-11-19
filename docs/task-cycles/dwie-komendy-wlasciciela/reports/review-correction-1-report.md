PASS 7e91cbfe95e6f7054a03a3fa6e03b223600b6214

# Review of correction 1 — dwie-komendy-wlasciciela

Range: `07fb7ef0..7e91cbfe95e6f7054a03a3fa6e03b223600b6214`, commits `4b11f209` and `7e91cbfe`; `git rev-parse HEAD` = `7e91cbfe95e6f7054a03a3fa6e03b223600b6214`. `git diff --stat 5d31c645..07fb7ef0` is empty, so the base's tree is the head I passed in the review of the fix. The diff touches three files only: `src/server/database.ts`, `tests/account-storage.test.mjs`, `foundations/glossary.md`. Bounded by `reports/correction-1-remarks.md`.

## The human's remarks

- **Remark 1 (M-1, `isDatabaseBusy`) — made.** `src/server/database.ts:255-266` now requires `typeof error.errcode === "number"` and compares `(error.errcode & 0xff) === SQLITE_BUSY`, with a comment saying why. Every use takes it: `account-block`, `account-backup`, `account-role`, `account-previous-save` and `enableWriteAheadLog` (the server's retry of a busy opening), as the remark intends. The new case in `tests/account-storage.test.mjs:361-425` builds real errors from two `node:sqlite` connections on a WAL file: a snapshot left behind by another connection's commit gives 517, a held write lock gives 5, a duplicate unique value gives 2067. Each comes with a precondition assertion of its code, and each is classified correctly. The case adds a shaped `{ errcode: 261 }` (recovery cannot be held still in a test, and the comment says so), other primary and extended codes (1, 6, 19, 21, 262, 2067) as not busy, and values that are not numbers as not busy. I ran it against the old comparison in a worktree of the head: it fails at `SQLITE_BUSY_SNAPSHOT` (`actual: false`), and passes with the correction.
- **Remark 2 (glossary entry `operator`) — made.** `foundations/glossary.md:284-288`: "The operator is the person who reaches the server and runs its commands, such as the block of an account, the grant of the previous-save privilege and the giving of the owner role." *Not:* `none`. This is the meaning the `owner` entry's *Not* already gave. The `owner` entry's *Not* now names the term `operator` instead of the quoted word. The template allows "the term of another entry" as what carries the meaning (`.the-way/elements/glossary/template.md`, "Form of an entry"). The-way's glossary holds no `operator` (searched), so the product may define it. Every product use I found names the same person: `foundations/decisions.md` (91 lines), the deploy skill and its references, the part map, `D-233`/`D-234` ("the operator's computer", "the operator receives a message"). The one other use, "the exponentiation operator" in a quoted formula, is the field's own meaning, which *Not* does not list. So `none` holds.
- **Let through / accepted (remark's "Przepuścić" and *You accept by merging* 3–4):** not reopened.

## Findings in the correction

### Critical

none

### Important

none

### Minor

- **m-1 (within the correction)** — `src/server/database.ts:263-264`: the mask accepts any number whose low byte as a 32-bit integer is 5, so `-251`, `5.5` and `2**32 + 5` read as busy (probe below). SQLite's result codes are non-negative integers in which the primary code is the low byte (`primary | n << 8`). So every real code with low byte 5 is a busy code: 5, 261, 517 and 773 (`SQLITE_BUSY_TIMEOUT`, which also correctly reads as busy). `errcode` is set only by `node:sqlite` from SQLite's own code; a file named by `LOOP2_DATABASE_PATH` cannot choose it, and no product code sets it. The odd values are therefore unreachable, and the effect would be advice to run again or a retry within the bounded timeout. `Number.isSafeInteger(code) && code >= 0` would close it if wanted. A BigInt, `NaN`, `undefined`, a string and a missing field all read as not busy.
- **m-2 (the author's stated weakest point)** — no test drives `enableWriteAheadLog`'s retry with an extended busy code; the retry is held only through `isDatabaseBusy`'s own case. The retry loop itself is unchanged and calls the function the case holds, and a real extended busy code at `PRAGMA journal_mode = WAL` (recovery) cannot be produced on demand. I grade it Minor: the gap is only that a later edit of the retry that stopped calling `isDatabaseBusy` would go unnoticed, and the old retry tests still hold its behaviour for code 5.

## Foundation and guidelines against the new behaviour

- D-430: "advises to run the command again only where the database stayed busy longer than the bounded busy timeout of D-112 allowed … for any other failure … no such advice" — still true. A busy code in its extended form is still a busy database. The four commands' transactions are `BEGIN IMMEDIATE`, so the snapshot code does not arise in them.
- D-112: "a bounded busy timeout" and the retry of the opening — still true; the sentence names the timeout, not a code.
- `guidelines/testing.md`, `guidelines/coding-database-access.md`: no sentence about result codes; nothing made false.
- `foundations/environment_facts.md` `loop2-app-log-sqlite-busy-lines`: a dated reading of the log for `"errcode":5,`. It is still a true record of that reading and claims nothing about extended codes (compared by the author; I read only the author's quotation of it, see Unread material).

The new test against `guidelines/testing.md`: it is an integration test on real SQLite files (the file is listed under that level) and replaces no mechanism it checks. Its name states behaviour and condition. It cites a D-430 sentence it holds. It cleans up (connections closed in `finally`, directory by `handmadeFile`). The shaped 261 is named as such in a comment. Calling the exported function directly follows the case just above it, which already asserts `isDatabaseBusy(new Error("another"))`.

## Declined to judge

- Whether "busy longer than the bounded busy timeout" in D-430 describes a snapshot error, which SQLite returns without waiting. The code is unreachable in the four commands, and the remark set the behaviour. A rewording of D-430 would be a new decision, outside this correction.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git log --oneline 5d31c645..HEAD`; `git diff --stat 5d31c645..07fb7ef0`; `git diff 07fb7ef0..7e91cbfe` | 0 | head `7e91cbfe`; base tree equal to `5d31c645`; three files changed |
| `npm run build` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `node scripts/test-node-file.mjs tests/account-storage.test.mjs` | 0 | 95 pass, 0 fail |
| `node scripts/test-node-file.mjs tests/account-owner.test.mjs` | 0 | 15 pass, 0 fail |
| `node scripts/test-node-file.mjs tests/account-backup.test.mjs` | 0 | 12 pass, 0 fail |
| `node scripts/test-node-file.mjs tests/account-database-check.test.mjs` | 0 | 8 pass, 0 fail |
| Probe of the built `isDatabaseBusy` with crafted `errcode` values (`node probe.mjs . probe.txt`) | 0 | busy: 5, 261, 517, 773, −251, 5.5, 2³²+5; not busy: 21, 262, 2067, −5, NaN, Infinity, 5n, 517n, undefined, null, "5", true, no field. A throwing getter on `errcode` throws (internal objects only). Kept as `review-correction-1-probe.mjs` and `review-correction-1-probe.txt` in `reports/` |
| Old comparison restored (`error.errcode === SQLITE_BUSY`) in a worktree of the head, `npm run build`, `node scripts/test-node-file.mjs tests/account-storage.test.mjs` | 1 | only the new case fails, at `SQLITE_BUSY_SNAPSHOT`, `actual: false` |
| `grep "^## operator\|^## owner" .the-way/foundations/glossary.md` | 1 | the-way holds neither term |
| `git grep -i -w operator` outside `.the-way` and `.runs` | 0 | one person throughout; 91 lines in `foundations/decisions.md` |
| `npm test` (full gate) | not run | the orchestrator runs it |

## Reaches beyond the handoff

- `.the-way/elements/glossary/template.md`, `examples.md` and `skill/write.md`, read whole, and `.the-way/foundations/glossary.md` searched for the two terms — to judge the entry, as the handoff asks.
- `git grep -i -w operator` across the product — the uses of the new term.

## Working copies

`.runs\review-correction-1\` held the build, foundation-check and test logs, the probe script and its output, and a worktree `wt` of `7e91cbfe` (with a directory junction `node_modules` to the reviewed worktree's) in which the old comparison was restored. Removal order: the junction with `rmdir` (target checked present afterwards), the worktree with `git worktree remove --force` and `git worktree prune`, the directory with `rm -rf`. Nothing remains. The probe and its output are kept in `reports/` as named above. The reviewed worktree's ignored `dist/` was rebuilt at the head, the product's own build output.

## Unread material

- `.the-way/elements/glossary/skill/SKILL.md`, `read.md`, `decide_entry.md`, `projected.md` and `elements/common/rules.md` — not read; the template, examples and `write.md` cover the form judged here.
- `foundations/environment_facts.md` entry `loop2-app-log-sqlite-busy-lines` — not opened; judged from the author's quotation.
- The rest of `foundations/glossary.md` beyond the entries `previous-save privilege`, `operator`, `owner` — not read whole.

## Searches not found or unclear

- No SQLite result code with low byte 5 that is not a busy code — none exists by SQLite's construction of extended codes; unreachable odd numbers noted in m-1.
