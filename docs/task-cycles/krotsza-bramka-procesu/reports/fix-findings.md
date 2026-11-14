# Findings for the fix — Minor findings of the review of the whole change

Cut word for word from `reports/review-whole-report.md` (first line `PASS 4ffd7b04759d648bf9022fb50dca79e1827a5248`), section *Minor*. All five lie within the task. There is no blocking finding.

1. **`foundations/decisions.md:9837` (D-406 *Rationale*), "on one computer of 32 GB with no other gate running".**
   - Wrong: the source of that condition is the dispatch's evidence list, which says "no other **registered** gate run"
     (`author-handoff.md`, "Evidence for the second decision"). The entry drops "registered" and states the machine was
     quiet. Nothing a reader can open shows it, and the memory samples of the three runs
     (`reports/mem-gate-pin-run1.csv` to `run3.csv`) show 8.6 to 15.6 GB free of 32.5 GB (17 to 24 GB in use), which
     is more than one gate alone takes (3 to 4 GB peak by the task's *Context*), so they neither show nor exclude another
     process.
   - Why it matters: the entry gives 18.3 to 19.6 minutes as the time of an otherwise idle machine, and a reader will
     compare it with the idle-machine figure of the earlier measurement. The binding sentences do not depend on it.
   - Evidence: `reports/author-handoff.md` (the word "registered"); the csv files; `foundations/decisions.md:9837`.
   - Fix: say what is known ("with no other gate of the day advisor's registry running") or drop the condition and say the
     runs were on the machine as it was.
2. **`foundations/decisions.md:9837` (D-406 *Rationale*), "against 23.0 to 28.0 minutes measured earlier with the directories one after another".**
   - Wrong: the frozen task gives "23-24 minutes" on a slow machine and "up to 28" with another cycle beside, and in *Context*
     "24.0-28.0" with one cycle beside; the number 23.0 is in none of them (the author's source note gives 23.2 to 24.2 for
     the quiet machine, which I read outside the repository only to check this). Also the upper end, 28.0, was measured with
     a second full gate beside, while the sentence puts it against runs described as with no other gate. The comparison
     therefore overstates the difference between like conditions.
   - Why it matters: the entry's closing "Accepted with it: the gate takes longer, by the difference of those measurements"
     takes its size from that range.
   - Evidence: `.runs/task-cycles/krotsza-bramka-procesu/task.md` lines 19, 20, 67 (*Need*, *Context*); handoff says "23.0-28.0 min
     (frozen task, *Context*)", which the task does not literally say.
   - Fix: give the earlier figures with their conditions as the task gives them (23-24 on a quiet machine, 24.0-28.0 with a
     cycle beside).
3. **`foundations/decisions.md:9822-9823` (D-405 *Rationale* and *Rejected*), premise now undone by D-406.**
   - Wrong: both say the gain is "about one minute of about 15", "an estimate made with the directories at the same time",
     and the cost is more memory where "two heavy directories that use Docker would run beside Node tests". The same change
     (D-406, `scripts/test.py:53-54`) makes the directories run one after another, so the gate as it stands takes about 23
     minutes and one heavy directory at a time; the 15 and the two directories no longer describe the gate. The parenthesis
     "(an estimate made with the directories at the same time)" is not in question 1's *Not chosen*; it is the writer's own
     derivation from *Context*, which the template says never enters *Rejected* of a decision written from a row (WAY-134).
   - Why it matters: low. The binding sentences and the human's answer ("1 a") are unaffected; a reader who reaches D-405 first
     reads figures that the next entry takes away.
   - Evidence: task question 1 (*Not chosen* has no such parenthesis); `.the-way/elements/decisions/template.md` ("The *Rejected* of a decision written from a row...").
   - Fix: cut the parenthesis from *Rejected*; one sentence in *Rationale* that the figures are for the directories at the same
     time (D-406 gives the order now), or leave the human's wording and note the premise.
4. **`README.md:76`, the description of `npm test`.**
   - Wrong: it says the gate runs the Python tests "przez `python -B .the-way/gate/run_tests.py`". The command is now that with
     `--jobs 1`; whoever repeats the command from the README gets the directories at the same time, the case D-406 forbids for the gate.
   - Why it matters: README is a file of `build-tools` and the task asked to look for what should have been updated; nothing tests it.
   - Evidence: `scripts/test.py:53-54`; `README.md:76`. `git grep "run_tests"` outside `.the-way` and `foundations/decisions.md` finds only README, `scripts/test.py`, the fixture and `guidelines/testing.md:431` (a file list that stays true).
   - Fix: add `--jobs 1` and, in a few words, that the directories run one after another.
5. **`tests/quality/test_test_gate.py:1`, module docstring.**
   - Wrong: "The file selection of D-77 runs one real test file and refuses an empty run." The new test (`:40-50`) is about the whole
     gate, not a file selection.
   - Why it matters: a name that stopped being true (WAY-362); below any size threshold, so Minor.
   - Fix: one clause naming the whole run.
