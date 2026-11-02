# Handoff — review of the spec's revision, task `logowanie-w-react`

**What you review.** `.runs/task-cycles/logowanie-w-react/spec.md` as revised, once, by the designer for the memory finding alone. Your method and its variant for a revision stand as `.the-way/task-cycle/spec/SKILL.md` gives. Read `reports/memory-finding.md`, `reports/spec-revision-handoff.md` and `reports/spec-revision.md`. Your earlier `PASS` stands for what the revision did not touch; do not review that again. Check that the revision changed nothing else beyond what the matter forces.

**Answers of step 4** stand as in your first handoff, `reports/spec-reviewer-handoff.md`.

**Judge these above all.**

1. Decision 9 reads the orchestrator's ruling „kills the process tree above a set memory limit” as a thread inside each test process on jsdom, which sums no tree, covers files on jsdom alone and leaves the runner above it alive to report. Does that meet the purpose, which is that one failing comparison cannot take the machine down? Consider where else the same growth can stand: a value that reaches the parent runner's reporter, several files on jsdom adding up, a file that loads an element comparison without the harness.
2. Decision 10's harness `assert` and its guard test: does the guard catch what it says, and does `deepEqual`'s refusal of elements leave the cases of `tests/view/account-screen.test.mjs` able to say what they say now?
3. Whether the limit, its source and the reading interval hold against about 2 GB/s.
4. Whether what a person reads when it fires can be mistaken for a flaky test or a pass.
5. Whether the order of work is one a plan can follow: the watchdog stands before the first test on jsdom.

**One narrowed exception to the safety rule, for you alone, once.** The decisive claim, that the thread stops the real growth of a failing comparison and not only `Buffer` growth, has not been run, and the design rests on it. The orchestrator allows one run of a real failing `assert.equal` on a rendered element, on jsdom, only under both of these:

- the thread at a limit of 1 GiB, and
- an independent outer process that reads the run's process tree and kills it at 3 GB, which you first prove on a script that allocates on purpose.

If the outer cap cannot be proved first, do not run it and say so. Run it once on jsdom, not on happy-dom, and not repeatedly. Report the peak the outer process read, the time, and what the runner printed. Every other run of such a comparison stays forbidden, as does an uncapped one. `card.trial.mjs` stays unrun; write a small file of your own under `spec-trials/`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/spec-revision-review.md` as your method gives. Return `PASS` or `FAIL`, a one-line check result naming what failed or did not run, and the report's path; reaches and **Searches not found or unclear** stand in the report.
