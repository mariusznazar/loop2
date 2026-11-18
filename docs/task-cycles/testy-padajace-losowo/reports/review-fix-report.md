PASS f2253fc503737e715e7cd95dca27f1a437456711

# Review of the fix — testy-padajace-losowo

Range `4cf96da13b44240d6f9460409068d6887b4fa783..f2253fc503737e715e7cd95dca27f1a437456711`, one
commit, three files (`guidelines/testing.md`, `tests/deploy/test_loop2_watch.py`,
`tests/flaky-tests.md`). `git rev-parse HEAD` gave `f2253fc5…`. The findings file
`reports/whole-review-findings.md` bounds this review (fix.md). All nine findings are fixed; the fix
brings one new Minor finding and no Critical or Important one.

Counts: 0 blocking findings remain; 1 new Minor (within the task); 0 out of scope.

## Each finding

- **I-1 — fixed.** `guidelines/testing.md:322-324` now reads „Test padający losowo bez związku ze
  zmianą kodu i bez ustalonej przyczyny dostaje wpis w rejestrze `tests/flaky-tests.md`, a wpis
  znika, gdy przyczyna się wyjaśni.” It carries D-432's qualification ("with no change of the code
  behind the failure"). D-432 is unchanged (`foundations/decisions.md` is not in the diff), as ruled.
  Task point 5 still holds: one sentence that names the register file.
- **I-2 — fixed.** `tests/flaky-tests.md:52-56` names entry b's five conditions, 30 runs each: sam;
  40 wirujących; 24 pętle startów; 6 pętli całych plików; 6 pętli razem z 40 wirującymi. Checked
  against `executor-19-report.md`, table "Every attempt" (`alone-before`, `spin40-before`,
  `fork24-before`, `files6-before`, `files6-spin40-before`, 30 each, 150 in all): they match. The
  remaining facts (6 whole-file runs, 1000 and 400 starts) are unchanged and match the report's
  "Further attempts". The common list no longer misleads: entry b now says its own conditions.
- **I-3 — fixed (option a, as ruled).** The `# The break:` comment is gone from
  `tests/deploy/test_loop2_watch.py:1170-1177`. Two named local values carry the reason:
  `wait_that_cuts_inspect = "1"` and `wait_that_leaves_inspect_time_to_answer = "5"`, walked as the
  pair list `waits`. No label claims a fault the case does not catch, and there is no comment left for
  the guidelines' rule on comments to judge. The names say why the "logs *" variant waits longer:
  so the `inspect` calls have time to answer. The case keeps its `decision:` line, its assertions
  and its named variants (D-78). I re-ran the case (pass) and the mutation that stops the hang being
  cut (fail at the 45 s limit), so the variant still protects what it did.
- **M-1 — fixed.** `tests/flaky-tests.md:77-79`: „w sprawdzeniu `assert.equal(seen.length, 1)`,
  linia 1234 (przypadek zaczyna się w linii 1221)”. `tests/account-api.test.mjs:1221` is the case's
  `test(` line and `:1234` is `assert.equal(seen.length, 1);`, read in this review's first round. The
  file is not in the range. This matches executor 18's report ("at line 1234").
- **M-2 — fixed.** `tests/flaky-tests.md:28`: „Żadne obciążenie nie wywołało porażki badanego testu.”
- **M-3 — fixed.** `tests/flaky-tests.md:32`: „po 7678 ms (czas całego przypadku) przy terminie
  5000 ms”. This matches executor 18 ("7678 ms is the time of the whole case").
- **M-4 — fixed.** `tests/flaky-tests.md:11-13`: the copy of the *Flaky tests* rule and „i dopiero
  potem uruchamiaj go ponownie” are gone. What is left is the *Context*'s sentence with its reason,
  joined by „bo”.
- **M-5 — fixed.** `tests/flaky-tests.md:37`: „Pięć warunków według raportu wykonawcy kroku 18: …”.
- **M-6 — fixed (as ruled).** `guidelines/testing.md:304-312`: the rule *Flaky tests* is back to its
  base text (*Decision* `D-73`; the diff restores line 306 and removes the two added lines). The
  register sentence stands in `### Register of flaky tests` (`:314-324`). That rule has the form the
  file and `.the-way/product-guidelines/template.md` give a rule: a `###` heading, then *Decision*
  `D-432`, *Invariant* `none`, one *Good* line and one *Bad* line in that order, then how to apply it.
  It stands right after *Flaky tests*, among the product's further rules, as
  `.the-way/product-guidelines/testing/template.md:52-53` orders them. *Where in code* keeps
  `tests/flaky-tests.md`. The *Good* and *Bad* lines agree with D-432's *Verification*. `foundation_check.py` and
  `check_instructions.py` both pass (below).

## New finding in the fix

### Minor (within the task)

- **N-1. `tests/flaky-tests.md:6-7` points to the wrong chapter.** The register's opening still reads
  „Zasadę rejestru podaje `guidelines/testing.md`, rozdział „Flaky tests”.” After the fix (M-6), the
  rule of the register stands in `### Register of flaky tests` (`guidelines/testing.md:314`), and
  *Flaky tests* no longer mentions the register. A reader who follows the pointer finds the rule on
  reruns, not the rule on the register. The right rule stands one heading below, so it is found
  quickly, which makes this Minor. Fix: „…rozdział „Register of flaky tests”.” (A search of the
  repository for `Flaky tests` outside `.runs/` finds this as the only reference to the chapter by
  name in the product's files.)

## Declined to judge

- none.

## Checks

| Command | Exit | Result |
|---|---|---|
| `git diff 4cf96da1..HEAD`, `git log --oneline 4cf96da1..HEAD` | 0 | one commit, three files |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 145 warn, 7 info`. The four warnings naming `guidelines/testing.md` are the same lines 282-286 (Mutation testing) as before. None names the new rule or `tests/flaky-tests.md` |
| `python -B .runs/task-cycles/testy-padajace-losowo/reports/author-load-series/run_case.py . tests/deploy/test_loop2_watch.py TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down` | 0 | `Ran 1 test in 9.914s`, `OK` |
| the same with `WAIT=200` (the runner swaps the value `"5"` for 200 s, so the hanging `docker logs` is not cut) | 1 | `[logs *]` fails: `AssertionError: the run did not end within 45 s; its processes were stopped` |

Manual checks:

- Entry b's five conditions against `executor-19-report.md` ("Every attempt").
- Entry d's lines against `tests/account-api.test.mjs`.
- Entry a's „czas całego przypadku” against `executor-18-report.md`.
- The new rule's form against the guidelines template.
- A search for `Flaky tests` (found N-1).

Not run:

- The load series: the handoff says not to, and the limit is unchanged at 5 s.
- Ruff on the changed Python lines: no `.runs/quality-venv` and no Ruff on PATH.
- The whole `tests/deploy/test_loop2_watch.py`: only one function changed, and I ran it.
- The full gate: the orchestrator's.

## Reaches beyond the dispatch

- The three earlier executor reports, as read whole in the first round (`git show 28ab60c9:…`):
  to check the facts the fix writes into the register.
- `.the-way/product-guidelines/template.md` and `testing/template.md:52-53, 222-227`, as read in the
  first round: the form and place of the new rule.

## Working copies

None made. The two runs of the case used the author's kept runner from `reports/` in the reviewed
worktree and wrote nothing to it. `.runs/review-fix/` was not created. `git status --short` is
empty.

## Unread material

- `reports/fix-handoff.md`: not read. This handoff gives its rulings for I-1, I-3 and M-6, and those
  are what I checked against.
- `tests/deploy/test_loop2_watch.py`: in this round only the changed function (lines 1168-1185).
- Everything else of this dispatch was read whole: the handoff, `fix.md`, the findings file, the fix
  report, the diff of the range, and `tests/flaky-tests.md`. My selection of the foundation and
  guidelines from the first round stands, since the fix changes no foundation entry.

## Searches not found or unclear

- none.
