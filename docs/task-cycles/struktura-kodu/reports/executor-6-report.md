# Executor report — slice 6: the function of a transport test divided under the threshold

Status: done

## Commits

- `11d266bc` on `task/struktura-kodu`: `test: :white_check_mark: divide the refused-requests case of transport under the threshold of a function, its refusal table as refusedVariants and its controls as guardedControls, with the case's name, routes, variants and assertions kept`. Author checked with `git log -1 --format='%h %ae'`: `mariusznn@gmail.com` (the private address).
- No other commit. My first commit attempt was stopped by the PreToolUse git-rules hook before it ran; I read the rules file it named and committed once.

## Files changed

- `tests/transport.test.mjs`: 158 insertions, 130 deletions (one file, the test file only).
- No file under `src/` changed by this slice. `git diff --stat d7493a85 -- src` is empty.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Lint of the changed file | `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/transport.test.mjs` | 0 | clean |
| Formatting (the handoff's options) | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/transport.test.mjs` | 0 | "All matched files use Prettier code style!" |
| Size rule, after the change | `node tests/quality/eslint-size-rules.mjs` | 0 (the run decides nothing; its output is the check) | 4 items over a threshold, none in `tests/transport.test.mjs`; before the change the report had `tests/transport.test.mjs:537: Async arrow function has too many lines (238)` |
| Focused test, refactored case | `npm test -- tests/transport.test.mjs` | 0 | 13 of 13 pass (log `.runs/executor-6/executor-6-run1.log`) |
| Guard break (see below) | `npm test -- tests/transport.test.mjs` with `src/server/transport.ts` broken | 1 | the case fails (log `.runs/executor-6/executor-6-break.log`) |
| Focused test, after restoring the guard | `npm test -- tests/transport.test.mjs` | 0 | 13 of 13 pass (log `.runs/executor-6/executor-6-run2.log`) |
| No change under `src/` since the base of the slice's dispatch | `git diff --stat d7493a85 -- src` | 0 | empty |
| The literal check in the handoff | `git diff --stat a3d913dac87160f56b194ce863c60145a551765a -- src` | 0 | NOT empty: 6 files (`program-panel.tsx`, `rule-drag.ts`, `rule-list.tsx`, `rule-panel.tsx`, `scene-memory.ts`, `scene.tsx`), all from slices 1 to 5 already committed on this branch. Not this slice's commit: `git show --stat 11d266bc` lists only `tests/transport.test.mjs`. This is a mismatch of the handoff's check with the branch's state, reported, not a failure of this slice. |

Not run: the full `npm test` (agents do not run it, per the handoff) and `foundation_check.py` (not among this slice's *Checks*). Browser check: none, the slice has no browser check (it is a test).

### Guard break and its failure

- Break: in `src/server/transport.ts`, the Origin comparison of `mutationGuards` (line 67) changed from `if (singleHeader(request, "origin") !== publicOrigin) {` to `if (false && singleHeader(request, "origin") !== publicOrigin) {` for a moment. `mutationGuards` is shared by all eight guarded account routes and the save route, so the break reaches all of them; the case's first failure names the first route.
- Command: `npm test -- tests/transport.test.mjs`, exit 1.
- Failure: `AssertionError [ERR_ASSERTION]: /api/accounts missing origin`, actual `201`, expected `403`. The case then also failed on `missing origin` for the next routes (actual 200 and 204 against 403).
- Restore: `git checkout HEAD -- src/server/transport.ts`; `git diff --stat d7493a85 -- src` empty afterwards; `git status --short` shows only `tests/transport.test.mjs` before the commit.

## How I divided the function

The case was 238 lines by the rule's count. I moved two blocks out of its body into module-level functions of the same file, placed before the case:

- `refusedVariants(fields, accountId)`: the table of refused variants (the 26 rows of the case, same labels, headers, bodies and statuses) and the `json` helper it uses, now module-level. The only change inside the rows is that the "unexpected field" row takes `accountId` as a parameter instead of reading `f.account.id`.
- `guardedControls(f, {...})`: the controls (the same bodies with every guard satisfied, each with its expected status), the state checks after them, and the reset request that is admitted and hands a message on. It takes the values the case computed (`cookie`, `live`, `token`, `routes`, `logged`, `accounts`, `confirmedBefore`, `resetBefore`, `resetting`).
- `countRows`, `confirmedAccounts`, `resetAccountState`: the three SQL reads, moved module-level. The case's local closures `count`, `confirmed` and `resetState` now call them; the SQL text is unchanged.

The case keeps its name, its `// invariant: account-mutation-request-guards` line, its decision line, its routes array with the precondition, the per-route, per-variant loop with its assertions, and the account/session/link/mail checks inside it. The case's own count after the move is below 200 (the rule reports no entry for it); I did not count the exact figure.

Where the verdict's cut did not suffice: there was no verdict for this slice; the cut was enough.

## Own-work check

- Requirement most likely missed: that the move changes no assertion, message, variant or route (`guidelines/testing.md`, rule "Changing an existing test"), since a moved block is easy to alter by accident.
- Check 1: compared the assertion calls of the old file (`HEAD~1`) and the new one with whitespace removed. The only differences were the three helper renames: `count("accounts")` became `countRows(f, "accounts")`, and `confirmed()` became `confirmedAccounts(f)`, with the same SQL and the same messages. Other assertions and their message strings are identical.
- Check 2: the case passes (13 of 13) and fails on the broken guard naming the route and the variant, so the moved table is live.
- Check 3: `eslint --max-warnings 0` and the Prettier check pass; the size rule no longer names the file.

## Choices

- Module-level functions rather than a fixture or a shared closure: the table and the controls take what they need as parameters, so the case's own loop and assertions stay where they were. Rejected: moving the whole refused-variants loop into a helper; that would hide each per-variant assertion from the case's reader. Cost if wrong: small; the loop can move later.
- Keeping `count`, `confirmed` and `resetState` as case-local closures that call the new helpers, rather than deleting them: minimal diff in the case's loop. Cost if wrong: none; they are one line each.
- Changed no invariant test; no assertion weakened, dropped, skipped or reordered.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` read whole (named by my method's variant; no structural mismatch between plan and code, so no adaptation).
- `foundations/decisions.md` D-73 (line 860), D-78 (935), D-82 (980), D-84 (1010), and `foundations/invariants.md` `account-mutation-request-guards` (738), `eslint-source-rules` (408), `prettier-source-format` (438), read by heading; the handoff's line ranges had moved (decisions grew before `## Testing discipline`), so I found each by its heading.
- `src/server/transport.ts` lines 55 to 85, to find the guard for the break.
- `tests/quality/eslint-size-rules.mjs` lines 1 to 80, to understand how the rule's report is produced.
- `tests/transport.test.mjs` lines 1 to 300 and 530 to 795 (the case and its helpers), not the whole 1409-line file.
- `.runs/task-cycles/struktura-kodu/plan.md` lines 1 to 60 (foundation entries and the start of the slices), not the rest.
- The git-rules file `the author's rule file on commits, outside the repository`, read after the hook blocked my first commit.

## Unread material

- `foundations/decisions.md` D-425 and invariant `function-and-file-size` (named in the handoff's *Foundation* section, not in this slice's Read list): not read; the rule's own run was used instead, as the handoff directs.
- `.runs/task-cycles/struktura-kodu/plan.md` from line 60 on, including Slice 1's test file and the other slices: not read (not needed for this slice).
- `.runs/task-cycles/struktura-kodu/task-frozen.md`: read whole.
- `guidelines/testing.md`: read whole, both pages (the first read was truncated by the harness; I read lines 215 to 428 after the first 214).
- `guidelines/coding.md`: read whole.
- `tests/transport.test.mjs` outside lines 1 to 300 and 530 to 795: not read.
- `.claude/skills/loop2-play/SKILL.md`, `ui_check.md`: not read; no browser check applies to this slice.

## Searches not found or unclear

- `grep '^### D-73$'` style heading search found nothing, because headings carry an em-dash title; found by plain heading search instead.
- The handoff's `git diff --stat a3d913da -- src` is not empty, as reported above; its base already holds slices 1 to 5.

## Working copies

- No worktree, clone or prepared input was made for this slice.
- `.runs/executor-6/` (in the worktree, ignored) holds only the three check logs: `executor-6-run1.log`, `executor-6-run2.log`, `executor-6-break.log`. These are outputs of the focused test run, not working copies; they stay for the record.
- Two assertion-comparison text files were written by mistake into the main checkout's `the main checkout's `.runs/` ` folder; I deleted both (`executor-6-old-asserts.txt`, `executor-6-new-asserts.txt`) and confirmed none remain there.
