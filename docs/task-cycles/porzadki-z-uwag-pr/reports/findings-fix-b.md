# Findings to fix - part B (tests, scripts and skill text)

Copied word for word from `reports/whole-change-review.md` (the review of the whole change, first line `FAIL c1b371d`). Each is a Minor finding the reviewer marked inside the task, or the reviewer's grade again of a Minor finding of a slice review that it marked inside the task.

## Minor findings of this review

- **m-2 (inside the task; Slice 12, `c1b371d`).** `.claude/skills/loop2-deploy/references/setup_and_secrets.md:465` and `:473`, with the same lines in the `.agents` twin.
  - `:465` says a measuring container can be left "running or stopped".
  - `:473` then says "Remove only a container whose measurement is not in progress in another shell: a running one is still measuring". The second part reads as "never remove a running one", yet an orphaned running container is exactly one to remove.
  - Suggested wording: "a running one may still be measuring for another shell".
- **m-3 (inside the task; Slice 12, `c1b371d`).** `setup_and_secrets.md:312-313`, both copies: "`docker volume prune` without `--all` removes anonymous volumes only".
  - The cited page states this in its description. The same page's own example, in `reports/05-docker-docs-excerpts.md`, shows plain `docker volume prune` deleting `my-named-vol`.
  - The bullet on `docker system prune` carries its own "Another version of Docker may document it otherwise". This bullet relies only on the general sentence about the server's Engine version, although its own source contradicts it.
  - No agent runs any prune, and `SKILL.md` forbids it, so nobody is endangered. The statement is a little stronger than the excerpt as a whole.
- **m-4 (inside the task; Slice 10, `098a708`).** Change of the type `PageAddress`.
  - `PageAddress` in `src/browser/view/email-confirmation.ts:28` gained `reload()`. The fake addresses of `tests/view/chronicle-game.test.mjs`, `tests/view/end-question.test.mjs` and `tests/view/email-confirmation.test.mjs` do not have it. The executor named this.
  - A later case in those files that follows an emailed link's fragment would throw "address.reload is not a function" instead of failing an assertion.
  - No case there does so today, and the files are not type-checked.
- **m-5 (inside the task; Slice 10).** No test proves `browserAddress().reload()` itself, because jsdom cannot.
  - The only evidence is the executor's real-browser run (marker gone after `#confirm-email=…` and after `#reset-password=…`, kept after `#/programy`), which I did not repeat.
  - This is the route "Not tested on purpose" of `guidelines/testing.md` allows. It is listed so that the request description says it.

## The Minor findings of the slice reviews, graded again by the whole-change reviewer (inside the task)

- **Slice 2, #1:** Minor, inside the task. `tests/account-backup.test.mjs`, last assertion of the new case, "the temporary copy is left in place". It holds by construction of the stand-in; I agree.
- **Slice 3, Minor 1:** Minor, inside the task. `tests/http.test.mjs`, the comment of the new case (now around `:4365-4368`) names the fault "a server that never reads the partial body", which the `request` event cannot show. Drop that half of the comment.
- **Slice 3, Minor 2:** Minor, inside the task. The break-off case can pass vacuously on a machine where the client breaks off before the body parser attaches. The base fails 15 of 15 times, so it is not a red flake.
- **Slice 3, Minor 3:** Minor, inside the task. No test checks the status 400 and "Invalid request body" for a break-off. A socket test cannot see the answer, and D-353 asks only for no line.
- **Slice 4, #1:** Minor, inside the task. `tests/account-storage.test.mjs`, new case "a session write refused because the account is blocked says so…", pins the text `/cannot be replaced/` (guideline "Behaviour, not implementation").
- **Slice 4, #3:** Minor, inside the task. The two http cases answer the held message twice (the `finally` and `endWaitingRegistration`). It is noise only.
- **Slice 5, #1:** Minor, inside the task. In `tests/http.test.mjs`, the guard-1 test leaves an own property `destroy` on `ServerResponse.prototype` (the same function).
- **Slice 5, #2:** Minor, inside the task. The guard-1 test is a call check. It catches a plain `destroy()`, misses an unguarded `socket.destroy()`, and is a departure from the testing guideline. I accept the departure for the slice reviewer's reasons. The request description should carry it.
- **Slice 6, M1:** Minor, inside the task. `scripts/local-start.mjs:89-97`, `:455`: with no built game, the broken directory is counted but not named; only Node's print of the missing writer shows.
- **Slice 6, M2:** Minor, inside the task. `tests/invariants/test_local_start_access.py`, `test_stop_with_no_built_game_…`, counts Node's English text `Cannot find module`.
- **Slice 6, M3:** Minor, inside the task. `scripts/local-start.mjs:310-312`: no test fails when the sort in `startDirectories` is removed on a file system that already lists in name order.
- **Slice 6, M4:** Minor, inside the task. The module state `keepsWriterLoadFailure` and `writerLoadFailure` couples `stop()` and `logLine()`.
- **Slice 7, M1:** Minor, inside the task. `scripts/local-start.mjs` (`if (browserLeft || failed) return;`): no test protects the `failed` flag, the path where the server resets the connection. The executor's own-work claim about it was false.
- **Slice 7, M2:** Minor, inside the task. `tests/invariants/test_local_start_access.py:162` and `:598`: two `with` lines lost their `\` continuation and run to 169 and 183 characters.
- **Slice 9, #2:** Minor, inside the task. `tests/sim/saved-game.test.mjs`, the chest test "a chest holding exactly its capacity loads, and one piece beyond it is refused as shape", has a refusal half without `// invariant: save-version`.
