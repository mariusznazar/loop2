FAIL 4cf96da13b44240d6f9460409068d6887b4fa783

# Review of the whole change — testy-padajace-losowo

Range `659b1e0255cd66d4768469191f408d9d266081a3..4cf96da13b44240d6f9460409068d6887b4fa783`, two
commits: `5206fd2d` (D-432, the register, the guideline sentence, the part-map row) and `4cf96da1`
(the watcher test's limit, the transport helper's message). `git rev-parse HEAD` gave the head of
the dispatch. One-author route: no plan, no slices, so every blocking finding below comes from no
slice.

Counts: 3 blocking (Important, within the task), 6 Minor (all within the task), 0 out of scope.

## What holds

- **To do 1.** `tests/deploy/test_loop2_watch.py:1174-1177`: "logs *" runs with
  `DOCKER_WAIT_SECONDS="5"`, "inspect *" keeps `"1"`, `KILL_WAIT_SECONDS` stays `"1"`,
  `deploy/loop2-watch` is not in the diff. The variant still bounds its own waiting (D-77) and
  still fails when `docker logs` is not cut. I ran the case once (pass), then the author's mutation
  with `WAIT=200`: `AssertionError: the run did not end within 45 s; its processes were stopped`.
- **Acceptance criterion.** I checked the author's kept series:
  `reports/author-load-series/after5.log` holds 30 runs, 30 passed. `after5-script-runs.txt` holds
  120 timed script runs (30 × 4), the longest 26.83 s, under the 45 s `RUN_TIMEOUT`. `before.log`
  shows the same setup with the old limit failing 6 of 10, so the series exercises the case.
  `run_case.py` exits non-zero on a failed subtest. I did not rerun the load myself (see Checks).
- **To do 2.** `tests/transport.test.mjs:134-140`: the deadline error reads
  `` `HTTP deadline exceeded: ${method} ${path}` ``. `method` and `path` are the parameters of
  `send`, in scope. No test matches on the old text (search below).
- **To do 3 and 4.** `tests/flaky-tests.md` stands in `tests/`, in Polish, with four entries a–d
  and none for the case of point 1. It has a row in `agent-workflow` *Files*
  (`foundations/part_map.md:148`), and no other part's pattern claims it.
- **To do 5.** `guidelines/testing.md:313-314` holds one sentence that names the register.
- **Settlement row 1** is recorded as D-432 (`foundations/decisions.md:1100-1113`): *Relations*
  `derives from D-73`, D-73's list of departures unchanged, as *Decisions in play* gives.
- **Out of scope** respected: the three unexplained tests are unchanged except the helper's
  message, `tests/account-api.test.mjs` is untouched, `backup_script_support.py` is untouched, and
  no retry was added anywhere.
- **Test names and error messages.** Every name in the register matches the code: `tests/transport.test.mjs:234`, `tests/deploy/test_loop2_watch.py:267/323`, `tests/invariants/test_account_save_backup_failure_notice.py:196/245`, `tests/account-api.test.mjs:1221`. The messages are copied word for word from their sources: `HTTP deadline exceeded`, `0 != 130`, `2 !== 1`.
- **The numbers of runs** in entries a–c agree with the earlier reports:
  - a: 150 runs and 105 copies in executor 18's report, conditions as named.
  - b: 5 × 30 runs, 6 in whole-file runs, 1000 and 400 starts in executor 19's report.
  - c: 30 + 30 + 30 runs and 20 + 300 repetitions in executor 20's report.
  - "0,53–0,70 s" (entry a) is in neither report. It is confirmed by the five reruns of PR #88's cycle: `git show 286edc50:docs/task-cycles/raport-z-wyplata/flaky-transport-{1..5}.log` give 530.65–702.90 ms.
- **Structure.** `change_file_sizes.py` gives +2 lines to `tests/deploy/test_loop2_watch.py` and +3 to
  `tests/transport.test.mjs`. The size rule's run (D-425, `function-and-file-size`) gives the same
  four reports on base and head (`reports/review-whole-size-base.txt`, `…-size-head.txt`): the change
  pushed nothing over a threshold.
- No reserved choice is taken. The change touches no trust boundary and holds no operation that cannot be undone. No invariant test is changed.

## Findings

### Important (blocking, within the task; from no slice)

**I-1. `guidelines/testing.md:313-314` drops a qualification that D-432 has.**

The guideline sentence reads: „Test padający losowo bez ustalonej przyczyny dostaje wpis w rejestrze
`tests/flaky-tests.md`, a wpis znika, gdy przyczyna się wyjaśni.” D-432, which the same change
writes, binds it more narrowly: "A test that fails at random, **with no change of the code behind the
failure** and with no cause found, has an entry…". The register's own opening carries that
qualification too: „bez związku ze zmianą kodu” (`tests/flaky-tests.md:4`).

Why it matters: agents read `guidelines/testing.md` before every change to a test; they rarely open
D-432. Take a change whose own code makes a test fail now and then. By the guideline sentence that
test is "padający losowo bez ustalonej przyczyny", so it goes into the register. D-432 excludes
exactly that case, because the cause there is the change, which is to be fixed, not recorded. WAY-263
grades a restatement of an entry the change writes, made without its qualification, as Important.

The task's point 5 gives this wording, so it is a defect the task mandates, named as such.

Fix: add the qualification to the sentence, e.g. „Test padający losowo bez związku ze zmianą kodu i
bez ustalonej przyczyny…”. Or, if the human prefers the shorter rule, drop the qualification from
D-432. One of the two, in this change.

**I-2. `tests/flaky-tests.md:53-55`: entry b does not name its conditions, and the register leads the reader to the wrong ones.**

Entry b says „150 z 150 osobnych uruchomień w pięciu warunkach” and does not say which five.

Requirements: task point 3 asks for „co próbowano (z liczbami uruchomień i warunkami)”. D-432's
binding sentence asks for "what was tried … with the numbers of runs and the conditions".

How the register misleads: its common section (`tests/flaky-tests.md:25-29`) lists exactly five
conditions: sam; 40 wirujących; 24 pętle startów; pętle całych plików; obciążenie dysku. A reader of
entry b matches "five conditions" to those five. But executor 19's report (table "Every attempt")
gives b's five as:

- alone;
- 40 spinning node processes;
- 24 fork loops;
- 6 whole-file loops;
- 6 whole-file loops together with 40 spinners.

So b had no disk load, and it had the combined load that the common list does not hold. The next
diagnosis would believe disk load was tried on the watcher and the combination was not.

Entries a and c name their conditions, which shows the gap is not a limit of the source. The task's
*Context* gives b only as „w pięciu warunkach”. The author named this gap in *Searches* and left it.

Fix: name b's conditions in the entry, quoted from `executor-19-report.md` as entry a quotes executor
18: „sam; pod 40 wirującymi procesami node; pod 24 pętlami startującymi krótkie procesy; pod 6
pętlami całych plików; pod 6 pętlami całych plików razem z 40 wirującymi procesami — po 30
uruchomień”.

**I-3. `tests/deploy/test_loop2_watch.py:1172-1173`: the new comment is labelled as the defect the case catches, and the case does not catch it.**

The comment reads: `# The break: a limit that cuts the quick `inspect` calls of a busy computer,
so that a healthy game is read as down; one limit covers `inspect` and `logs` alike.`

In this file, the 35 other `# The break:` comments each name the fault of the watcher script that
their case catches. Examples:

- line 119: „a notice paired with the wrong kind, or two calls for one trouble”;
- line 389: „a lost state file that reads as an outage and floods the owner”.

Read by that convention, the new comment says the case catches a watcher whose Docker limit cuts
quick `inspect` calls and so reports a healthy game as down. It does not. The case writes its own
limit into the copy, so the script's limit never reaches it. Its "inspect *" variant asserts the
opposite: an `inspect` that is cut is read as `down` (`assert_sent(result, "down")`). The comment
actually describes why the test's own setup was flaky, a fact about the test, under the label for a
fault of the product.

It also departs from the rule "Where the expected value comes from" of `guidelines/testing.md`, a
rule with no invariant (lines 102-104). The rule says: „Komentarz, który niesie informację ważną dla
kodu, przenosi ją do fundamentu; komentarz bez takiej informacji się nie pisze — kod ma być
zrozumiały sam”. D-82's *Verification* "complies" case for such a comment requires "that
information entered into the foundation in the same change". The comment does carry needed
information: why the two variants have different limits. Without it, a reader would set both back to
1 and bring the flake back. Yet the change enters it nowhere in the foundation. D-432 keeps no entry
for a test whose cause is found, so after this change the reason lives only in this comment.

Why it matters: a maintainer who trusts the label believes a too-short limit in the script is
guarded by a test when it is not. And the guideline rule on comments is binding.

Fix, one of:

- (a) Drop the comment and let the code carry the reason, e.g. a named value for the "logs *"
  limit whose name says it leaves the `inspect` calls time to answer, beside the 1 s of the
  "inspect *" variant.
- (b) Enter the reason into the foundation (a decision of how this one case is tested has a
  precedent in D-422) and keep a comment only if it then still tells the code something the
  foundation and the code do not.

Either way, no `The break:` label on a fault the case does not catch.

### Minor (within the task)

- **M-1. `tests/flaky-tests.md:76-77` — wrong line for the check in entry d.** „w sprawdzeniu
  liczby zarejestrowanych żądań (wtedy linia 1221)”. Line 1221 is where the case begins (`test("reportBrowserFailure posts …`). The check of the count, `assert.equal(seen.length, 1)`, stands
  at line 1234. That is the line executor 18's report gives ("failed once on `2 !== 1` at line
  1234"), at the earlier cycle's base and today alike (the file is unchanged since `4bfc33cd`). The
  error comes from the task's *Context*; the register repeats it. Fix: „w sprawdzeniu
  `assert.equal(seen.length, 1)`, linia 1234 (przypadek zaczyna się w linii 1221)”.
- **M-2. `tests/flaky-tests.md:28-29` — „Żadne obciążenie nie wywołało porażki.” contradicts entry d.**
  The sentence stands in the common section, above all four entries. Entry d says that test failed
  under the combined load of executor 18's runs, and in the same round 14 cases failed (executor 18,
  "Checks"). The sentence is from the *Context*, where it was about the three investigated tests.
  Fix: „…nie wywołało porażki badanego testu”.
- **M-3. `tests/flaky-tests.md:33` — „po 7678 ms przy terminie 5000 ms” reads as the time of the
  request.** Executor 18 gives 7678 ms as the time of the whole case, and infers one request of at
  least 5 s. Someone comparing the next failure with this one could compare a request's time with a
  case's time. Fix: add „(czas całego przypadku)”.
- **M-4. `tests/flaky-tests.md:11-14` — the register repeats a guideline rule and adds an instruction
  the *Context* does not hold.** „Ponowne uruchomienie służy diagnozie, nigdy zielonej bramce.” is a
  second copy of the rule *Flaky tests* (`guidelines/testing.md:311-312`). D-73 keeps testing rules
  in `guidelines/testing.md`, and a copy drifts from its original. „i dopiero potem uruchamiaj go
  ponownie” is not in the *Context* (it gives only „zachowaj cały zapis padniętego przebiegu”), and
  its „go” could refer to the run or to the test. Fix: keep the *Context*'s sentence and its reason;
  drop the copy of the rule, or point to the chapter instead, which line 6 already does.
- **M-5. `tests/flaky-tests.md:38-39` — leftover from the author's process.** „Pięć warunków według
  raportu wykonawcy kroku 18, który przeczytano:” — „który przeczytano” tells the reader nothing and
  reads as left over from the author's work. Fix: „Pięć warunków według raportu wykonawcy kroku 18:”.
- **M-6. `guidelines/testing.md:306` — D-432 attached to the template's own rule.** *Decision* now
  reads `D-73 · D-432`. The testing template gives the *Flaky tests* rule its adopting decision
  alone, and puts a product's own rule under "further rules of the product"
  (`.the-way/product-guidelines/testing/template.md:222-227`). D-73's complies case brings the
  wording of the guidelines to the template when the pin moves, keeping only D-73's departures. A
  product sentence inside the template's rule is neither, and could be dropped in that rewrite. The
  placement is the task's (point 5), so this is a defect the task mandates. The cost today is
  nothing; it is a risk at a later pin move. Fix, if wanted: a rule of its own, e.g.
  `### Register of flaky tests`, with *Decision* D-432.

## The gaps the author named

- **Decision index read to 60 lines.** I wrote and read the index of my own whole selection
  (`reports/review-whole-index.md`). No decision of it, nor of the 87 listed by heading, collides
  with the change beyond D-82 (I-3) and D-432 itself (I-1).
- **Test files read in part.** The changed function and the helper are local. `send` in
  `tests/transport.test.mjs` and the case in `tests/deploy/test_loop2_watch.py:1170-1183` stand whole
  in what was read. The transport file ran whole (13 of 13 pass) and the changed case ran on its own,
  in my runs and in the author's. The partial read hides nothing that bears on the change.
- **One list of conditions against conditions per test.** This is I-2 for entry b. Entry a is
  resolved, c names its conditions. The common list's new wording, „każdy test w części z nich”, is
  accurate but does not tell the reader which part applies, hence I-2.

## Declined to judge

- **The failed whole-file runs in the author's load.** One whole-file run was "not ok" in five of
  six loops, with no record of which file failed. This bears on the change only if the failing file
  was `test_loop2_watch.py` at the 5 s limit. The kept logs cannot tell, and repeating the load takes
  hours on the human's computer.
  - Not for the register: D-432 needs a named test, and none is known.
  - Not a task item: the acceptance criterion is the series of the case, and it is met.
  - If the orchestrator's gate run, or a later one, fails on "logs *", that would reopen point 1.
    Executor 19 reports that whole-file runs fail at times under this load.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/task-cycle/change_file_sizes.py 659b1e02… 4cf96da1` (reviewed worktree) | 0 | table above, +104 lines |
| `node tests/quality/eslint-size-rules.mjs .runs/review-whole/base` | 0 | 4 reports in 314 files |
| `node tests/quality/eslint-size-rules.mjs .runs/review-whole/head` | 0 | the same 4 reports |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 145 warn, 7 info`; the four warnings naming `guidelines/testing.md` are lines 282-286 (Mutation testing), untouched; none names `tests/flaky-tests.md` |
| `python -B …/author-load-series/run_case.py . tests/deploy/test_loop2_watch.py TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down` (no load) | 0 | `Ran 1 test in 9.914s`, `OK` |
| the same with `WAIT=200` (the "logs *" limit not cutting the hang) | 1 | `[logs *]` fails: `the run did not end within 45 s; its processes were stopped` |
| `npm test -- tests/transport.test.mjs` (head worktree) | 0 | 13 tests, 13 pass |
| `node node_modules/prettier/bin/prettier.cjs --check tests/transport.test.mjs` (head worktree) | 0 | formatted |
| `node node_modules/eslint/bin/eslint.js tests/transport.test.mjs` (head worktree) | 0 | no report |

On the size rule: I ran the size rule's script directly rather than the expected-failure test that
wraps it. The test's message is that script's output. The base and head runs use the reviewed
worktree's script and `eslint.config.mjs`, which the range does not change.

Manual checks:

- The register against the three earlier reports, read whole.
- The PR #88 logs for the case's times.
- `tests/account-api.test.mjs` at `4bfc33cd` and at head, for the line of the check.
- The 35 neighbouring `# The break:` comments.

Not run:

- The acceptance load: hours of load on the human's computer. I checked the author's kept series
  instead.
- Ruff on `tests/deploy/test_loop2_watch.py`: there is no `.runs/quality-venv` and no Ruff on PATH.
  The changed lines are a tuple loop and two comment lines.
- The whole `tests/deploy/test_loop2_watch.py`: the author's run gave 99 tests OK. One case changed
  and I ran it.
- The full gate: the orchestrator's.

## Reaches beyond the dispatch

- `git show 286edc50:docs/task-cycles/raport-z-wyplata/{gate-correction,gate-correction-rerun,gate-final,base-gate,flaky-transport-1..5}.log`,
  only the case's line: the source of „0,53–0,70 s” in entry a.
- `git show 4bfc33cd:tests/account-api.test.mjs`, lines 1221-1236: the line of the check in entry d (M-1).
- `.the-way/product-guidelines/template.md`, lines 1-127, and `.the-way/product-guidelines/testing/template.md`,
  the *Flaky tests* rule (lines 52-53, 222-227): the change writes the guidelines (section 2).
- `tests/quality/eslint-size-rules.mjs` whole, and the test's lines naming it: to run the size rule
  on base and head.
- The author's kept `run_case.py`, `series.sh`, `fileload.sh` and series logs: to verify the
  acceptance series and to reuse the runner for my two runs of the case.

## Working copies

- `.runs/review-whole/base` — a detached
  worktree of `659b1e02`, removed with `git worktree remove --force`.
- `.runs/review-whole/head` — a detached
  worktree of `4cf96da1`, with a junction `node_modules` to the reviewed worktree's `node_modules`.
  The junction was removed first with `rmdir`, so the reviewed worktree's `node_modules` was left
  intact (checked), and then the worktree with `git worktree remove --force`. `git worktree prune`
  followed.
- `.runs\review-whole\` itself: the index, the list of sections, copies of the three earlier
  reports and the size outputs. Removed after the index and the two size outputs were kept beside
  this report as `review-whole-index.md`, `review-whole-size-base.txt` and
  `review-whole-size-head.txt`.

Nothing remains. `git status --short` of the reviewed worktree is empty.

## Unread material

**Decisions read whole: 13.** My selection had 55 decisions listed in full and 87 listed by heading,
from these sections and parts:

- sections "Testing discipline", "The gate, test tools and the local start" and "The server:
  hosting, deployment, logs and failure reports";
- `--part` deployment, account-server, agent-workflow and product-foundation;
- `--decision` D-73, D-77, D-82, D-356 and D-432.

Of those 55 I read 11 whole: D-73, D-74, D-75, D-76, D-77, D-78, D-79, D-81, D-82, D-356 and D-432.
Of the 87 I opened 2 from their headings: D-362 (the register points to places outside the files)
and D-425 (size). No decision that bears on the change stayed unread.

Guidelines: `guidelines/testing.md` and `guidelines/coding.md` were read whole (no kind row of
`coding.md` matches test files). The part map and the product glossary were read whole.

Invariants:

- **Read whole:** eslint-source-rules, ruff-source-rules, shellcheck-source-rules,
  prettier-source-format, node-test-selection, focused-test-execution, account-request-transport,
  account-save-backup-failure-notice, failure-watcher-message, browser-failure-report,
  tracked-file-private-paths, tracked-file-private-names and function-and-file-size.
- **Read in part:** document-test-memory-limit, only its *Part* and *Violated* lines.
- **Not read:** the other invariants whose *Part* is `every` or names account-server or
  deployment. The change alters no assertion that holds them and no `invariant:` line.

The glossary of the-way at the pinned commit was not read: the register uses no term of the
process.

## Searches not found or unclear

- Which file failed in the author's whole-file loops: not kept (see Declined to judge).
- A test matching the old text `HTTP deadline exceeded` of the transport helper: none.
  `tests/http.test.mjs:90`, `:5902` and `tests/owner-routes.test.mjs:70` keep their own copies of the
  old text in their own helpers, outside the task.
- The source of entry a's „0,53–0,70 s” in the earlier reports: not there. It was found in PR #88's
  rerun logs, and it holds.
