# Handoff — review of the trial tasks and tests (branch `trial/tasks`)

The person who requested this cycle (Mariusz) delegated intermediate choices to the cycle's
orchestrator. You review; you change nothing.

Method: `[the worktree of the trial tasks branch] .the-way\task-cycle\review\SKILL.md`
(the pinned the-way; read it whole, and a file it names when the step that names it comes).
Variant: **the whole change** (the change is one slice).

Worktree: `the worktree of the trial tasks branch`. Range to review: base
`df0f1256fe7ff85bca7c77f938900d8932168719` to head `543b6f64de85f6768fe20e409a5ff01eaaba1354`.
The author's report (read it): `docs/task-cycles/proba-krotszych-wytycznych/reports\author-2-report.md`.
The handoff the author worked from (the requirements of this change):
`docs/task-cycles/proba-krotszych-wytycznych/reports\handoff-author-2.md`.
The frozen task: `…\task.md` in the same directory as the report (questions 6 and 7).

What this change is: test material for a measurement, on a branch that is never merged. Its purpose
is that 5 agents with the old `guidelines/coding.md` and 5 with a shortened one each do a trial
task, and the test decides each result without reading code, so the counts of passes can be
compared. A test that passes or fails for a reason other than the behaviour it names spoils the
numbers silently. Judge, as findings with their grade by the method:

- whether each test decides only the behaviour it names, and whether a correct solution written
  differently from the reference or alternative could fail it (read the prompts as the agent reads
  them, and think of the ways an agent would solve each task; name concrete solutions that a test
  wrongly fails or wrongly passes);
- whether each prompt reveals what the shortened file would otherwise have to teach (it must not),
  and whether its "touch no other file" relaxation or any wording bends a task;
- whether `run-test.mjs` and `verify.mjs` do what they claim on a plain copy without `.git`
  (run `node trial-tasks/verify.mjs` once yourself and say its result with the exit code; the
  author's report says 28 variants), and whether results could differ between runs (time,
  ports, temp files shared between concurrent runs — the cycle will run several in parallel);
- source fidelity: the sentences each task probes are those of the handoff (S055, S064/S065,
  S060/S061); say if a task probes a sentence that the shortened file does not change.

Report to `docs/task-cycles/proba-krotszych-wytycznych/reports\review-tasks-report.md`
(first line `PASS <sha>` or `FAIL <sha>` by the method), with **Searches not found or unclear**.
Return its first line, the report path and the count of findings per grade.
