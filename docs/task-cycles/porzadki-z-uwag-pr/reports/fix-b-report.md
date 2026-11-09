# Report - the fix of a review's findings, part B

**Status:** done (eleven findings fixed, eight answered with evidence; no question for the orchestrator).

Worktree `the root of the repository`, branch `task/porzadki-z-uwag-pr`, start `9400aee`, head `60d4047`. `.the-way` not touched.

## Commits

| Commit | Files | Lines (+/-) |
|---|---|---|
| `08268c9` docs: say that a running measuring container may still be measuring for another shell, and that Docker's page of `docker volume prune` contradicts itself | `.claude/skills/loop2-deploy/references/setup_and_secrets.md`, `.agents/skills/loop2-deploy/references/setup_and_secrets.md` (byte-identical, `cmp` exit 0) | 7+/4- each |
| `9b0996f` test: give the fake page addresses `reload` | `tests/view/chronicle-game.test.mjs`, `tests/view/end-question.test.mjs`, `tests/view/email-confirmation.test.mjs` | 4+/0-, 4+/0-, 6+/1- |
| `5337efe` test: proxy one-line rule on a reset, Node's version line and code, line continuations, docstring count | `tests/invariants/test_local_start_access.py` | see `git show --stat 5337efe` |
| `60d4047` test: comment of the break-off case, one answer of the held message, restore of `ServerResponse.prototype`, no pinned message text, `save-version` tag | `tests/http.test.mjs`, `tests/account-storage.test.mjs`, `tests/sim/saved-game.test.mjs` | see `git show --stat 60d4047` |

No product file changed. `scripts/local-start.mjs` was changed temporarily for one defect run and restored with `git checkout --` before any commit (`git status --short scripts` empty).

## Findings

| Finding | Result | Commit and check |
|---|---|---|
| **m-2** (`setup_and_secrets.md:473`, both copies) | fixed | `08268c9`. The sentence now reads "Remove a container only when no other shell is waiting for its measurement: a running one may still be measuring for another shell, while a running one that a lost connection left behind is to be removed." `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0 (5 tests OK); `cmp` of the two copies exit 0. |
| **m-3** (`setup_and_secrets.md:312-313`, both copies) | fixed | `08268c9`. The bullet now says the page of `docker volume prune` states that without `--all` it removes anonymous volumes only, but that the example output on the same page lists a named volume among the deleted ones, so plain `docker volume prune` is not to be counted on to spare `loop2_accounts`. Source: `reports/05-docker-docs-excerpts.md` lines 23-40. Same check as m-2. |
| **m-4** (fake addresses lack `reload()`) | fixed | `9b0996f`. The three fakes gained `reloaded: 0` and `reload()` counting calls (as `tests/view/account-screen.test.mjs:355-380` already does). No case changed, no assertion added. `npm test --` on each of the three files exit 0, and on `tests/view/account-screen.test.mjs` exit 0. |
| **m-5** (no test proves `browserAddress().reload()`) | answered | The finding itself says jsdom cannot show it and that the route "Not tested on purpose" of `guidelines/testing.md` (line 374: real events, focus, drawing) allows it. It asks only to be listed in the request description; no change removes it. The only evidence stays the slice-10 executor's real-browser run. |
| **Slice 2, #1** (last assertion of the new backup case holds by construction of the stand-in) | answered | The whole-change reviewer agrees it holds by construction; the stand-in is the only way to make `rm` of the temporary directory fail on real files (`guidelines/testing.md`, integration test "Doubles": a failure is forced by a controlled stand-in). No change removes it. |
| **Slice 3, Minor 1** (comment names a fault the test cannot show) | fixed | `60d4047`. The comment of the break-off case in `tests/http.test.mjs` now names the one fault the case catches ("the break-off answered as a server failure, with its line written by the error handler"). `npm test -- tests/http.test.mjs` exit 0, 78 of 78. |
| **Slice 3, Minor 2** (can pass vacuously where the client breaks off before the body parser attaches) | answered | The slice reviewer says the stronger anchor would be a first body byte consumed and "the fixture has no such hook"; the `request` event proves only the headers. Adding a fixed pause would be a sleep as proof (`guidelines/testing.md`, integration "Time and randomness") and still not prove the parser attached. The base fails 15 of 15 runs and the head passes 10 of 10 (slice-03 review, "Minor 2"), so this is a vacuous pass on a slow machine, never a red flake; nothing in the repository gives a hook to close it. |
| **Slice 3, Minor 3** (no test checks 400 and "Invalid request body" for a break-off) | answered | A socket test cannot see the handler's answer: the slice reviewer sent a half-close after a partial body on base and head and the client got Node's own `400 Bad Request` with no body on both (slice-03 review, "Minor 3"). D-353 asks only for no line. |
| **Slice 4, #1** (storage case pins `/cannot be replaced/`) | fixed | `60d4047`. The three `assert.match(..., /cannot be replaced/)` lines in the case "a session write refused because the account is blocked says so; one refused for another cause does not" became `assert.ok(x instanceof Error, "an error refused it")`. The case keeps its real subject (the `instanceof BlockedSessionRefusal` checks and the "stores nothing" count). The earlier case at `tests/account-storage.test.mjs` "set rejects unknown accounts and replacement of an existing session identity" (`/cannot be replaced/`, not in this change) is not touched. `npm test -- tests/account-storage.test.mjs` exit 0. |
| **Slice 4, #3** (two http cases answer the held message twice) | fixed | `60d4047`. `endWaitingRegistration` and the `finally` of the block case now take the held answers with `f.mailer.held.splice(0)`, so each held message is answered once. `tests/http.test.mjs` exit 0, 78 of 78. |
| **Slice 5, #1** (guard-1 test leaves an own `destroy` on `ServerResponse.prototype`) | fixed | `60d4047`. The test records `Object.hasOwn(ServerResponse.prototype, "destroy")` and in `t.after` restores by assignment only if it was own, else deletes the property. Same run as above. |
| **Slice 5, #2** (guard-1 test is a call check, a departure) | answered | The slice reviewer and the whole-change reviewer accept the departure; the test's own comment states it. The finding asks the request description to carry it; no change removes it (the cut is not visible on this host). The departure is for the orchestrator to put in the request description. |
| **Slice 6, M1** (no built game: the broken directory is counted, not named) | answered | Contradicts a choice the plan settled: slice 6 and the rule "Recording a failure" / D-253 give a script run by hand Node's own print for the failure to load the writer; the slice reviewer calls it "what the plan and the executor's choice 2 call for", notes the base wrote no line at all there, and declined to judge a hand-made JSON line as "outside the plan's settled choice" (slice-06 review, "Declined to judge"). A hand-made line without the writer would be a second writer of failure lines in a trust-boundary script. Nothing changed. |
| **Slice 6, M2** (case counts Node's English text `Cannot find module`) | fixed | `5337efe`. The case now asserts `ERR_MODULE_NOT_FOUND` is in the output (Node's error code) and that `Node.js v` occurs once (Node's closing version line of one fatal print). Run: `python -B -m unittest ...test_stop_with_no_built_game_still_tells_every_start_and_leaves_the_missing_writer_once` exit 0 (together with the new case, 2 tests OK), and the whole file exit 0. |
| **Slice 6, M3** (nothing fails when the sort in `startDirectories` is removed on a file system that lists in name order) | answered | Cannot be removed by any change on a file system that already lists in name order: the reviewer's partial guard (two planted directories whose lines must appear in name order) "would fail on a hash-ordered listing, though not on NTFS", so on this computer it could not be seen failing once, which `make-change` section 2 requires of a test I add. The executor named it as "not caught by any deterministic test". Nothing changed. |
| **Slice 6, M4** (module state `keepsWriterLoadFailure` / `writerLoadFailure` couples `stop()` and `logLine()`) | answered | The reviewer calls it "correct as written ... Polish only" and says only one command runs per process. Removing the coupling means the deferral travels as an argument through `recordFailure`, `recordReason` and every caller, or a rewrite of the top-level rethrow, in a trust-boundary script; that is larger than the finding and "no behaviour of the product code changes beyond what a finding asks". Nothing changed; goes to the request's list. |
| **Slice 7, M1** (no test protects the `failed` flag) | fixed | `5337efe`. New case `test_an_answer_the_server_resets_after_its_headers_leaves_one_line_not_two`; the stand-in `CUT_OFF_SERVER` resets the connection of `/reset` 100 ms after its first piece (when the piece has reached the proxy, so the request and the response of the proxy both report an error), and the case ends with the cut of a second request so that the count holds anything the reset still had to write. Failing run with the defect (`if (browserLeft || failed) return;` -> `if (browserLeft) return;` in `scripts/local-start.mjs`): `cd tests/invariants && python -B -m unittest test_local_start_access.LocalStart.test_an_answer_the_server_resets_after_its_headers_leaves_one_line_not_two` exit 1, `AssertionError: 3 != 2` with three `local-proxy` lines. Defect taken out; passing runs of the same command: exit 0 three times; whole file exit 0 (21 tests). |
| **Slice 7, M2** (two `with` lines lost their `\`) | fixed | `5337efe`. Both restored as in `exchange`; `awk 'length>100'` lists only `:489` (102 characters, slice 6's case name, not in this finding). `ruff.exe check ... tests/invariants/test_local_start_access.py` exit 0. The cause was a `python` heredoc that turned `\` plus newline into a continuation; I wrote the backslash with `chr(92)`. |
| **Slice 9, #2** (chest test refusal half lacks `// invariant: save-version`) | fixed | `60d4047`. The tag stands above the comment of the test, as for the other refusal tests. `npm test -- tests/sim/saved-game.test.mjs` exit 0. |

Also changed in `5337efe` because the new stand-in case made it stale: the class docstring of `LocalStart` said "the five" stand-in cases; it now says "those the module's description lists", and the module docstring names the reset case.

## Checks (command, exit code)

- `npm test -- tests/view/chronicle-game.test.mjs` 0; `... end-question.test.mjs` 0; `... email-confirmation.test.mjs` 0; `... account-screen.test.mjs` 0
- `npm test -- tests/account-storage.test.mjs` 0; `npm test -- tests/http.test.mjs` 0 (78 of 78); `npm test -- tests/sim/saved-game.test.mjs` 0
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` 0; `... test_loop2_play_skill.py` 0
- `npm test -- tests/invariants/test_local_start_access.py` 0 (21 tests, 183 s)
- Defect run: see Slice 7, M1 (exit 1), passing runs (exit 0 three times).
- `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/invariants/test_local_start_access.py` 0; `npx prettier --check` on the six changed `.mjs` files 0; `npx eslint` on them 0; `npm run typecheck` 0.
- Not run: `npm test` without arguments and `foundation_check.py` (the cycle's job); the deploy skill reference is prose, so no prettier or eslint check applies to the two `.md` files.

## Own-work check

- The requirement I most likely failed: the new reset case passes whether or not the `failed` flag exists (the same vacuous pass the reviewer found in the cut-off case).
- The check: remove the flag in `scripts/local-start.mjs`, run the case, restore.
- What it showed: my first stand-in (reset at once, after the first piece) passed WITH the defect (exit 0, 1 test), because on this computer a reset with no delay makes only the request report an error (scratch probe `harness.mjs` in the scratchpad: "request error ECONNRESET" alone). I changed the stand-in to reset 100 ms later (probe `harness2.mjs`: both errors then arrive). With the defect the case failed (exit 1, `3 != 2`); without it it passed three times in a row (exit 0). If the delay were too short on a faster or slower machine the case would pass without the flag; it can never fail without a fault of the product.
- A second requirement: the m-4 fakes could hide a missing reload. They count calls (`reloaded`), as the fake of `account-screen.test.mjs` does, and are not asserted on in these files.

## Reaches beyond the handoff

- `.runs/task-cycles/porzadki-z-uwag-pr/plan.md` (slices 2-7, Coverage, Choices) and the slice review files `slice-03-review.md`, `slice-04-review.md`, `slice-05-review.md`, `slice-06-review.md`, `slice-07-review.md`, `slice-09-review.md`, and `05-docker-docs-excerpts.md`: the findings file holds only the one-line summaries; I needed the reviewers' places, evidence and suggested fixes.
- `guidelines/coding.md` and `guidelines/testing.md` read whole (both required by `AGENTS.md`).
- `src/browser/view/email-confirmation.ts:1-110` and `src/browser/view/game-view.ts:800-840` (the type and the listener) to see what the fakes must carry.
- `tests/view/account-screen.test.mjs:345-400` as the existing fake with `reload`.
- Files I changed but did not read whole before the change: `tests/http.test.mjs` (read lines 1930-2100, 4235-4402, 4640-4765), `tests/account-storage.test.mjs` (1630-1730, 1795-1825), `tests/sim/saved-game.test.mjs` (1755-1830), `tests/view/chronicle-game.test.mjs` (78-135), `tests/view/end-question.test.mjs` (102-135), `tests/view/email-confirmation.test.mjs` (96-120). Each change is one passage and the passage was read; the files are 2,500 to 4,800 lines. The skill file and `scripts/local-start.mjs` and `tests/invariants/test_local_start_access.py` were read whole.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Slice 4 #1: replaced the three text matches with `instanceof Error` | deleting them (the case would no longer say that a refusal is an error) | none; the type checks carry the case |
| Slice 4 #3: `splice(0)` on the held list in both places | removing the `finally` of the block case (it answers the held message when an assertion in the `try` fails, so the registration does not hang) | none |
| Slice 7 M1: one new case with its own stand-in branch (`/reset`) in the existing `CUT_OFF_SERVER` | a third stand-in constant | a reader finds two behaviours in one stand-in; commented |
| Slice 7 M1: the 100 ms delay in the stand-in | a wait on a condition: the stand-in cannot see when the proxy has the piece | a machine where 100 ms is too short passes the case without the flag (never a red) |
| Slice 6 M2: `ERR_MODULE_NOT_FOUND` plus one `Node.js v` | the reviewer's other choice, a count of the `node:internal` header line | a Node release that drops the version line would fail the case with no fault of the product |
| m-3: said the page contradicts itself, did not claim what the Engine does | stating that plain `docker volume prune` removes named volumes | the skill is a little cautious about a command no agent runs |
| Answered M1, M3, M4 of slice 6, slice 3 Minor 2 and 3, slice 2 #1, slice 5 #2, m-5 and changed nothing | a hand-made failure line (M1), a second sort test that cannot be seen failing here (M3), a larger refactor (M4) | the Minor findings stay on the request's list |

No changed invariant test was weakened. `tests/invariants/test_local_start_access.py` (invariant `local-start-access`) gained one case and a branch of a stand-in; the earlier cases are unchanged except the one assertion of Slice 6 M2, whose reason is the finding (testing guideline "Behaviour, not implementation": the wording of Node's message) and the source is the slice-06 review, M2. The three text matches of Slice 4 #1 in `tests/account-storage.test.mjs` were replaced for the same reason; that case is new in this change, not an earlier one.

## Searches not found or unclear

- The place of the suggested "steadier" count for Slice 6 M2: the reviewer named `node:internal` header or `Node.js v`; I did not look for a third. I did not run the case under a second Node version, so the claim that `Node.js v` occurs once rests on the run on Node v24.17.0 here (case passes).
- Whether the reset of Slice 7 M1 gives two errors on Linux or macOS: not run there; the reviewer's harness (Slice 7 review) and mine agree on this Windows computer only after a delay.
- `foundations/` entries: none searched or needed.
