FAIL 85966562aadfa413888dab094544f707710bf942

# Review 3 — slice 3 (the command `account-role`), range dec8f39b..85966562

HEAD confirmed `85966562`. Read whole: the handoff, `review-change` SKILL, the executor's report, `src/server/account-role.ts`, `src/server/account-previous-save.ts`, the diff of `tests/account-owner.test.mjs` and `guidelines/coding.md`, D-410, D-411, D-252, D-253, D-354 (the current ranges), `setAccountRole` in `src/server/database.ts`.

## Findings

Blocking: 1 (Important). Minor: 2. Out of scope: 0.

### Important

**I-1. The tests of the command never check that a real change ends no session and stops no link, so a command that does so passes.**
- Place: `tests/account-owner.test.mjs:472-545` (the outcomes test) and `:546-` (the refusals test); the code is `src/server/account-role.ts:67`.
- What: D-410 says the command "ends no session and stops no link", and its Verification lists "the command giving and taking the role … ending no session and stopping no link". The report sentences of `account-role.ts:80-81` promise it ("its sessions and emailed links stay as they were"). The outcomes test runs the four outcomes on an account with no session and no link, and asserts only the role and the exit code. The refusals test does have a live session `one`, but asserts it only after refusals, where nothing was going to touch it. The slice-2 test checks this on `setAccountRole` in the database, not on the command, so a command that calls something else besides it is not caught.
- Why it matters: the property is the one an operator relies on when giving or taking the role of a signed-in account; the printed sentence states it as a fact.
- Evidence (mutations, below): M8 — `made-owner` also blocks the account through `database.blockAccount(email)`, which ends its sessions and stops its links: 13 pass, 0 fail.
- Fix: in the outcomes test, give the account a live session and an unspent link before the first call, and after each of the four outcomes assert that the session and the link are as they were and that `blocked` is false.

### Minor

**M-1. The "already" outcomes assert nothing about what stays unchanged.** `tests/account-owner.test.mjs:496-506` checks the role and the exit code only. Mutation M3 — `already-owner` blocks the account — passes (13 pass, 0 fail). It is the mutation the handoff names. Graded Minor on its own, because D-410's verification lists the refusals, not the "already" outcomes; the fix of I-1 (assert block, session and link after every outcome) closes it too.

**M-2. The usage test never tries an upper-case role word or an address with an inner space.** `tests/account-owner.test.mjs:~560` covers no arguments, no address, an extra argument, `block` as the word and an address without `@`; `Owner` and `owner` with a space in the address are not tried. The code (`account-role.ts:34-45`) is the same as the two older commands, which refuse them; nothing is wrong today. Polish.

## Judgement of the points the executor raised

1. `tests/startup.test.mjs`: nothing is missing. Its quoting lines at 580 and 630 carry the wording of D-112 (version 6, `account-role`) and D-253 as they stand now; `foundation_check.py` reports 0 errors. The new last-resort test of the command lives in `account-owner.test.mjs`, which is where D-253's verification is met for `account-role`. Dropping the file from the plan's *Change* is right.
2. The wording "its sessions and emailed links stay as they were" agrees with D-410 ("ends no session and stops no link") and D-137 (the block ends them and the unblock restores none; the role command does neither). The wording "from its next request" agrees with D-410 ("holds from the next request"). The wording is right; I-1 is that no test holds it.
3. The test of the unchanged commands (task To do 8): it does prove To do 8 for what it names. On an account with the owner role it checks block, a repeated block, unblock, grant, revoke, an unknown address and a busy database, with the wording of each report, the effect on sessions and links, and that the role stays. It cannot be seen failing because those commands are unchanged; that is its nature. It does not compare with a player's account side by side, but the expected wording is fixed in the test, which is the better anchor. No finding.
4. The glossary entry `owner` (`foundations/glossary.md:272-277`): I read it whole. It says the owner is an account with the role `owner`, given by the command `account-role`, and `Not:` the person who reaches the server — "operator". The code and the report sentences of the command use "owner" for the role and call the actor nobody, consistent with it. No finding.
5. `guidelines/coding.md` edit: two items in `### Logging scope`, in the file's Polish, in the form of the neighbouring items (`rola właściciela nadana (\`account-owner-granted\`)`). `.the-way/product-guidelines/coding/template.md:49,209-218` says the list holds the product's business events under the name each takes in the line; the two items fit, and the names are those the command writes. D-252 lets an agent add such an item alone. No finding.

## Against the task and the foundation

- To do 2 and D-410: arguments normalized as at login (`normalizeEmail`, same as the older commands); exit 2 with `Usage … Nothing changed.` for wrong arguments (including a third word, an extra argument); exit 3 with no database file, none created (tested for unset, empty, `:memory:` and a missing path, and `access(absent)` rejects); exit 4 for an unknown address; exit 1 with the JSON line first for a busy database and for a file that is no database (test asserts line 1 is JSON with failure `account-role`, place `account-role.change`, errcode 26, and no file name in the output). Four outcomes each in its own words (the test asserts four different sentences). The event line holds `accountId` only and is written for `made-owner` and `made-player` only; the test asserts no `example.test` in any event line and no event for the "already" outcomes or an unknown address. The last-resort handler is `installLastResort("account-role")` (D-253), tested with the stand-in `uncaught` mode.
- Trust boundary (crafted input): the command has no network input; its arguments are checked as above; `LOOP2_DATABASE_PATH` is the only setting it reads. An unknown stored role value is out of its reach (the database layer of slice 2). The command prints the normalized address, not a hash or a session identifier (tested with `encoded-hash`, `one`, "database is locked" absent from all refusals). Irreversible operation: none; the command is a file in `dist` that a human runs.
- No other file of the server changed; `account-block.ts` and `account-previous-save.ts` are untouched (`git diff --stat`: three files).
- Reserved choices: none taken.
- Screenshots in the range: none.

## Declined to judge

- The `loop2-deploy` skill text on the command (task To do 8, a later slice) — not in this slice.
- The Minor findings of the reviews of slices 1 and 2 — the handoff keeps them for the whole change.

## Checks run

All in a worktree of `85966562` at `.runs/review-3/wt` (node_modules by junction), after `node scripts/build.mjs`:

| Check | Command | Exit | Result |
|---|---|---|---|
| Build | `node scripts/build.mjs` | 0 | built |
| Typecheck | `node scripts/build.mjs --check` (what `npm run typecheck` runs) | 0 | clean |
| Focused tests | `node --test tests/account-owner.test.mjs` | 0 | 13 pass |
| Three files | `node --test tests/account-owner.test.mjs tests/account-storage.test.mjs tests/startup.test.mjs` | 0 | 115 pass, 0 fail |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, read-only) | 0 | 0 errors |

I did not run `npm test` (the cycle's run) or `npm test -- <file>` through `scripts/test.py` (needs `npm_execpath` and the Docker gate); `node --test <file>` runs the same files.

### Mutations of `src/server/account-role.ts` (each rebuilt, `node --test tests/account-owner.test.mjs`, restored after)

| # | Mutation | Result |
|---|---|---|
| M1 | an event also for `already-owner` | caught (1 fail) |
| M2 | the address added to the `account-owner-granted` event | caught (1 fail) |
| M3 | `already-owner` blocks the account | **survives** (13 pass) — M-1 |
| M4 | the extra-argument refusal removed | caught (1 fail) |
| M5 | `installLastResort` removed | caught (1 fail) |
| M6 | the `already-player` sentence loses "nothing changed" | caught (1 fail) |
| M7 | the address trimmed only, not lower-cased | caught (2 fail) |
| M8 | `made-owner` also blocks the account (ends sessions, stops links) | **survives** (13 pass) — I-1 |

## Reach beyond the handoff

- `foundations/glossary.md:272-277` (entry `owner`), whole, since the executor read it only by grep.
- `.the-way/product-guidelines/coding/template.md` lines 47-70 and 200-220 by grep and read, for the Logging scope check.
- `src/server/database.ts` `setAccountRole`, `blockForPanel` (lines 857-886), to know what the command calls.
- `tests/startup.test.mjs:560-650`, for the quoting lines the executor left.

## Working copies

`.runs/review-3/wt` (a worktree of `85966562`, with a junction `node_modules` to the worktree's own): removed with `git worktree remove --force` and `git worktree prune`; the junction was removed first by `rmdir`, so the real `node_modules` stays. Left in `.runs/review-3/` (ignored, my own): `mutate.py`, the script that made the mutations; it is a working file and can be deleted.

## Unread material

- `foundations/decisions.md` D-112 and D-137, D-400: not read whole by me; I read the passages of them that the handoff quotes and the quoting lines in the tests. D-410, D-252, D-253, D-354, D-411 read whole.
- `tests/account-storage.test.mjs` (the pattern file): read by running and by grep only, not whole.
- `guidelines/coding.md` and `guidelines/testing.md`: not read whole; I read the Logging scope section of the first (lines 215-245) and none of the second beyond the handoff's quotation of rules. The file `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` was not read.
- `.runs/task-cycles/panel-wlasciciela/task-frozen.md` and `plan.md`: only the passages copied in the handoff.

## Searches not found or unclear

- None found missing. Unclear: the handoff says the review is of `tests/startup.test.mjs` as in *Change*; it has no diff in the range (consistent with the executor's report and with A2).
