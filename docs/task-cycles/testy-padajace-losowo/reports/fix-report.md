# Fix report — testy-padajace-losowo

**Status:** done

**Commit:** `f2253fc5` on `task/testy-padajace-losowo` (range starts at the reviewed head `4cf96da1`). Files: `tests/flaky-tests.md`, `guidelines/testing.md`, `tests/deploy/test_loop2_watch.py`. `foundations/decisions.md` (D-432) is unchanged, as ruled.

**Check result (one line):** nothing failed; not run: the full gate (the orchestrator's), the load series (not asked, the limit stays 5 s), Ruff and ShellCheck (no quality environment made), `npm test -- tests/deploy/test_loop2_watch.py` whole (only lines of one test function changed).

## Checks (command, exit code)

- The changed case alone: `python -B -m unittest test_loop2_watch.TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down` with `tests/deploy` and the root on the path → exit 0, `Ran 1 test in 9.895s`, `OK`.
- Mutation, the "logs *" limit raised to 200 s in a copy of the test file (the copy stood in `.runs/author-fix/` and was put first on the path; the loaded module path was asserted to be the copy) → exit 1, `AssertionError: the run did not end within 45 s; its processes were stopped`, `FAILED (failures=1)`. So the variant still fails when the hanging `docker logs` is not cut off. (A first attempt with `PYTHONPATH` gave `ModuleNotFoundError` — the path list was not read — so it proved nothing; I redid it with `sys.path` set in Python, which is the run above.)
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py` → exit 0, `0 error, 145 warn, 7 info`; no warning names `tests/flaky-tests.md` (the count is as before the fix).
- `git diff 659b1e02 -- guidelines/testing.md` shows the rule *Flaky tests* unchanged from the base, the new rule, and one added line of *Where in code*.

## Each finding

**I-1 — fixed.** `guidelines/testing.md`: the sentence now reads „Test padający losowo bez związku ze zmianą kodu i bez ustalonej przyczyny dostaje wpis w rejestrze `tests/flaky-tests.md`, a wpis znika, gdy przyczyna się wyjaśni.” — one sentence, names the register file, carries the qualification of D-432. D-432 is unchanged.

**M-6 — fixed (goes with I-1).** The rule *Flaky tests* is restored to its text at the base `659b1e02` (*Decision* `D-73` alone; the diff against the base shows no change in it). The sentence stands in a rule of its own, `### Register of flaky tests`, placed right after it, with *Decision* `D-432`, *Invariant* `none`, and one *Good* and one *Bad* line, as the format of a rule in the file asks. I read `.the-way/product-guidelines/testing/template.md` lines 218–227 (the *Flaky tests* rule and "Further rules of the product"). Nothing else was required of a new rule: no check asked for a count or a new *Where in code* line beyond `tests/flaky-tests.md`, which was already listed and is kept (the new rule points at it); `foundation_check.py` stays at 0 errors.

**I-2 — fixed.** Entry b now names its five conditions, quoted from `executor-19-report.md` (the table "Every attempt", read from `git show 28ab60c9:docs/task-cycles/luki-w-testach-z-przegladu/reports/executor-19-report.md`): per 30 runs, "sam; pod 40 wirującymi procesami node; pod 24 pętlami startującymi krótkie procesy; pod 6 pętlami całych plików; pod 6 pętlami całych plików razem z 40 wirującymi procesami". I checked the reviewer's wording against the table: it matches (`alone-before`, `spin40-before`, `fork24-before`, `files6-before`, `files6-spin40-before`, 30 each). The remaining facts of the entry (6 whole-file runs, 1000 and 400 starts) are unchanged and also match the report.
Entry c checked the same way against `executor-20-report.md` ("Every attempt"): its "90 z 90 (30 sam, 30 pod 40 wirującymi procesami, 30 pod 6 pętlami całych plików i 4 pętlami wysyłającymi sygnały)" matches the three series `alone-before`, `spin40-before`, `files6-signal4-before`, and "320 z 320" matches 20 + 300 runs of the INT case in one process. Found: no gap of the kind of entry b. One nuance only, left as it stands because the register's text is the task's *Context* and is not wrong: the report says the 4 signal loops ran with SIGINT ignored (started with `&`), so they added process starts and `kill` calls, not trapped signals. Entry a's conditions were already named.

**I-3 — fixed (option a).** The comment `# The break: …` is gone. In `tests/deploy/test_loop2_watch.py` the case keeps its `decision:` line and now holds two local values, `wait_that_cuts_inspect = "1"` and `wait_that_leaves_inspect_time_to_answer = "5"`, and a pair list `waits` of `("inspect *", …)` and `("logs *", …)` that the loop walks; the body of the loop is unchanged. No `The break:` label stands on a fault the case does not catch. Style as the file holds (continuation lines aligned under the opening bracket, under 100 columns); the function is about 20 lines against the 200 of D-425. Case and mutation re-run as above. I did not add a foundation entry for the reason of the two limits; the names of the two values carry it, as the review's option (a) says.

**M-1 — fixed.** Entry d reads „w sprawdzeniu `assert.equal(seen.length, 1)`, linia 1234 (przypadek zaczyna się w linii 1221)”. Checked in the file myself: `grep -n` gives line 1221 for the `test("reportBrowserFailure posts the three words …` line and line 1234 for `assert.equal(seen.length, 1);` in that case (line 945 holds another such assert in another case); `executor-18-report.md` line 92 gives "failed once on `2 !== 1` at line 1234".

**M-2 — fixed.** The common section ends „Żadne obciążenie nie wywołało porażki badanego testu.”

**M-3 — fixed.** Entry a reads „`HTTP deadline exceeded` po 7678 ms (czas całego przypadku) przy terminie 5000 ms”. Checked against executor 18's report ("7678 ms is the time of the whole case. The 5000 ms deadline belongs to one request of the helper").

**M-4 — fixed.** The common rule now reads: „Przy porażce testu z tego rejestru zachowaj cały zapis padniętego przebiegu (log bramki albo wyjście testu), bo przy teście okna strażnika i przy teście sygnału kopii jedyną wskazówką był ślad w zapisie jednego padniętego przebiegu.” The copy of the rule *Flaky tests* and „i dopiero potem uruchamiaj go ponownie” are removed; the intro still points to the chapter.

**M-5 — fixed.** „Pięć warunków według raportu wykonawcy kroku 18: sam; …”.

No finding was held wrong.

## Own-work check

- **Requirement most likely unmet after the fix:** that the new rule of the guidelines does not restate D-432 without its qualification (I-1) and that no comment label claims a fault the case does not catch (I-3).
- **Check:** `git diff 659b1e02 -- guidelines/testing.md` read against D-432's first sentence; `grep` of the case for `The break` (none left in the changed function); the case and its mutation re-run.
- **Result:** the sentence carries "bez związku ze zmianą kodu i bez ustalonej przyczyny"; the case passes and the mutation fails at the 45 s limit.

## Reaches beyond the handoff

- `git show 28ab60c9:…/executor-20-report.md` lines 90–200 (the table and "More attempts"): to check entry c for the gap the handoff asked about. `.the-way/task-cycle/change/fix.md`: the method of a fix.
- `tests/account-api.test.mjs` lines 945, 1215–1240 (and `git log -1` of the file): to read the line of M-1 myself.

## Unread material

- The review report `reports/review-whole-report.md`: not read (the handoff gives the findings file, which holds the findings word for word); read whole: the handoff and the findings file.
- Of `tests/deploy/test_loop2_watch.py` I read again only lines 1168–1190 (the changed case); of `tests/flaky-tests.md` I read lines 1–90.

## Searches not found or unclear

- none.

## Working copies

`.runs/author-fix/` (a copy of the test file with the mutated limit and the output of the instruction check) stood in the worktree at `.runs/author-fix` and was removed before the commit; `.runs/` holds only `task-cycles/` now. No worktree or clone was made. The earlier `reports/author-load-series/` stays beside the first report.
