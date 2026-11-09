PASS 60d4047093e043ab99f6337e99022fac0a8f1e24

# Review of the fix: porzadki-z-uwag-pr

- **Range.** `c1b371d..60d4047`. `git rev-parse HEAD` is `60d4047093e043ab99f6337e99022fac0a8f1e24`. The six commits are `bc8f9ca`, `9400aee`, `08268c9`, `9b0996f`, `5337efe` and `60d4047`.
- **What I read.** `.the-way/task-cycle/review/fix.md` whole, the handoff, both findings files (`findings-fix-a.md`, `findings-fix-b.md`), both fix reports and the whole fix diff.
- **Result.**
  - The only Important finding, I-1, is fixed.
  - Every other finding in the findings files is either fixed or answered with evidence that holds.
  - The fix itself adds no Critical or Important finding. It adds 2 Minor findings, both inside the task.

## New findings in the fix diff

### n-1 (Minor, inside the task): the three new `instanceof Error` assertions cannot fail

Place: `tests/account-storage.test.mjs:1667`, `:1673` and `:1679`, in the case "a session write refused because the account is blocked says so; one refused for another cause does not". Commit `60d4047`.

- The helper `refusal` returns whatever was thrown, and `SqliteSessionStore.failure` turns every thrown value into an `Error`. So `assert.ok(x instanceof Error, …)` holds whatever went wrong.
- The old `assert.match(…, /cannot be replaced/)` also told the store's own refusal apart from an unrelated error, for example a decode error.
- Effect: the two halves that are not about the block (password replaced, identifier held by another account) now also pass when the write fails for some other reason. The case's real claim stays covered by the `instanceof BlockedSessionRefusal` checks and the "nothing is stored for the blocked" count. Older cases of the file cover that those two writes are refused.
- So the case is a little weaker than before in those two halves, and no weaker for the block.
- Better fix: for `replaced` and `held`, assert that nothing was stored under those identifiers, or drop the three lines.

### n-2 (Minor, inside the task): the new reset case relies on a 100 ms delay in the stand-in server

Place: `tests/invariants/test_local_start_access.py`, `CUT_OFF_SERVER` (`setTimeout(() => request.socket.resetAndDestroy(), 100)`) and the case `test_an_answer_the_server_resets_after_its_headers_leaves_one_line_not_two`. Commit `5337efe`.

- The delay is part of what the stand-in server does, not a wait inside the test. The test itself waits on conditions with time limits, so this is not the "sleep as proof" the testing guideline forbids.
- The risk runs one way. If the first piece of the answer has not reached the proxy within 100 ms, only one side reports an error and the case passes even without the flag it protects. It cannot turn red without a fault in the product. The executor names this cost.
- My runs: with the flag removed the case failed 3 of 3 times (`AssertionError: 3 != 2`); with the flag in place it passed 3 of 3 times.

## Each finding of the findings files

| Finding | Verdict | Evidence |
|---|---|---|
| **I-1** (Important) | **fixed** | See "I-1 in detail" below. |
| m-1 | **fixed** | The *Decision* field in `guidelines/coding.md:115` reads `D-252 · D-253` again, as the template gives. The body of the rule still cites D-354. |
| m-2 | **fixed** | `setup_and_secrets.md:475-477`, both copies: "a running one may still be measuring for another shell, while a running one that a lost connection left behind is to be removed". The contradiction is gone. |
| m-3 | **fixed** | `setup_and_secrets.md:312-315`, both copies. The bullet now says the page contradicts itself and "do not count on plain `docker volume prune` to spare `loop2_accounts`". That matches `05-docker-docs-excerpts.md` and claims nothing beyond it. |
| m-4 | **fixed** | `9b0996f`. The fake addresses in `chronicle-game.test.mjs`, `end-question.test.mjs` and `email-confirmation.test.mjs` now carry `reload()` and `reloaded`. All three files pass. |
| m-5 | answered, **holds** | jsdom cannot show a reload, and the guideline allows that route. The request description has to carry it. |
| Slice 2, #1 | answered, **holds** | The stand-in is the only way to make the removal fail on real files. |
| Slice 3, Minor 1 | **fixed** | The comment of the break-off case in `tests/http.test.mjs:4367-4369` now names only the fault the case can catch. |
| Slice 3, Minor 2 | answered, **holds** | The test fixture has no hook for "first byte of the body read", and a fixed pause would not prove that either. The risk is a vacuous pass on a slow machine, never a false red. |
| Slice 3, Minor 3 | answered, **holds** | A socket test cannot see the handler's answer, as the slice reviewer measured. D-353 asks only for no failure line. |
| Slice 4, #1 | **fixed**, with new Minor n-1 | The test no longer pins the message text. The replacement assertions cannot fail. |
| Slice 4, #3 | **fixed** | `splice(0)` is used in both places, so each held message is answered once. `startWaitingRegistration` still empties the list itself. |
| Slice 5, #1 | **fixed** | `Object.hasOwn` is recorded first, then the property is either reassigned or deleted. `destroy` is inherited, so it is deleted and the prototype is as the test found it. |
| Slice 5, #2 | answered, **holds** | The departure is accepted and stated in the test. The request description has to carry it. |
| Slice 6, M1 | answered, **holds** | D-253 and the rule "Recording a failure" give a script run by hand Node's own print of the error. A failure line written by hand would need a second line writer. |
| Slice 6, M2 | **fixed** | The case now checks `ERR_MODULE_NOT_FOUND` plus one `Node.js v`, not Node's English message. |
| Slice 6, M3 | answered, **holds** | NTFS already lists names in order, so a guard on the sort cannot be seen failing on this computer. |
| Slice 6, M4 | answered, **holds** | Polish only. Removing the coupling would mean a refactor of a script at a trust boundary, larger than the finding. |
| Slice 7, M1 | **fixed**, with new Minor n-2 | My run in a temporary checkout of `60d4047`: with the flag removed, 3 of 3 runs exit 1 (`3 != 2`); restored, 3 of 3 runs exit 0. |
| Slice 7, M2 | **fixed** | Both `with` statements carry their `\` continuation again. |
| Slice 9, #2 | **fixed** | `// invariant: save-version` stands above the chest case. |

Answered findings that stay Minor go to the request's list: m-5, Slice 2 #1, Slice 3 Minor 2 and 3, Slice 5 #2 (and the request description), and Slice 6 M1, M3 and M4.

## I-1 in detail

- **What D-353 now says.** The silenced write is "the session write that the library makes as a response ends, refused because the account was blocked while the request was in progress, as while a registration waits on its message". The *complies* examples add that the first store of a session, in the route that signs the player in, keeps its failure line when a block refuses it.
- **Code against the decision.** This is what the code does:
  - `app.ts` silences `BlockedSessionRefusal` only in the session callback after the headers have been sent, which is the write at the end of a response.
  - `establishSession` keeps its line.
  - Renewal (`touch`) never throws `BlockedSessionRefusal`.
- **Only the targeted words changed.** `git diff --word-diff` shows changes only in D-353's first sentence and its two *Verification* items. The sentence "A session write that fails for any other reason stays a failure." and the *Rationale*, *Rejected*, *Origin*, *Scope* and *Relations* are word for word as before.
- **Comments and code.** Both comments (`database.ts:18-23`, `app.ts:57-66`) now say the same as D-353. `git diff c1b371d..60d4047 -- src` changes comment lines only.
- **Not a finding of this review, but it must reach the human.** D-353 is now broader than settlement row 2 as the human accepted it: it silences the end-of-response write of any request, a login included. It is also narrower in one window: a registration's first store keeps its line. The orchestrator says the request description will carry both points.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` | 0 | 64/64 |
| `npm test -- tests/http.test.mjs` | 0 | 78/78 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 33/33 |
| `npm test -- tests/view/chronicle-game.test.mjs` | 0 | 4/4 |
| `npm test -- tests/view/email-confirmation.test.mjs` | 0 | 5/5 |
| `npm test -- tests/view/end-question.test.mjs` | 0 | 17/17 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 130/130 |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 OK |
| `npm test -- tests/agent_workflow/test_loop2_play_skill.py` | 0 | 8 OK |
| `npm test -- tests/invariants/test_local_start_access.py` | 0 | 21 OK, 177 s |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| Reset case with the defect `if (browserLeft) return;` (`scripts/local-start.mjs:185`) in a temporary checkout of `60d4047` at `.runs/fixrev-wt`, run `python -B -m unittest test_local_start_access.LocalStart.test_an_answer_the_server_resets_after_its_headers_leaves_one_line_not_two` three times | 1, 1, 1 | `AssertionError: 3 != 2` each time |
| The same case after `git checkout -- scripts/local-start.mjs`, three times | 0, 0, 0 | OK |
| `cmp` of the two `setup_and_secrets.md` copies | 0 | identical |
| `git diff --word-diff=plain c1b371d..60d4047 -- foundations/decisions.md` | 0 | changes in D-353's first sentence and *Verification* only |

Cleanup of the temporary checkout:
- I removed the `node_modules` link first, as a link only; the real `node_modules` stayed intact.
- Then `git worktree remove --force .runs/fixrev-wt` and `git worktree prune`.
- `git status --short` in the reviewed worktree is empty.

Not run: the product gate, which is the orchestrator's next step.

## Reaches beyond the handoff

- `tests/invariants/loop2_invariant_support.py:218-250`: how `TreeCopy` copies the working tree. I needed it to run the reset case from a temporary checkout.
- `src/server/session-store.ts` (`failure`, `complete`): to judge n-1.

## Searches not found or unclear

- How the reset case behaves on Linux or macOS: not run. The 100 ms margin (n-2) has been seen only on this Windows computer.
- I found nothing else unclear.
