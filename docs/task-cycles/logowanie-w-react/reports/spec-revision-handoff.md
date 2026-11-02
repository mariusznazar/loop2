# Handoff — the designer's revision of the spec, task `logowanie-w-react`

**Why.** The spec's review returned `PASS` with no findings, in `reports/spec-reviewer.md`. Your spec's revision is for one matter only, which that PASS leaves out: the memory finding in `reports/memory-finding.md`. Read that file whole. Everything else in the spec stands; change nothing else except what this matter forces.

**Safety rule, for you first.** Your own trial's failing comparison is the likely cause of the machine's low-memory errors at 12:52 to 13:00. Run no test on jsdom or happy-dom in which a comparison on an element can fail, and do not rerun `card.trial.mjs` with `TRIAL_FIXUP` or mutated code. Prove a watchdog on a small script that allocates memory on purpose, kept well below the limit that matters: 4 GB at the most. Change no tracked file. Trials stay under `spec-trials/`.

**The orchestrator's ruling.** Take the proposal as a requirement of this change: jsdom tests run under something that kills the process tree above a set memory limit. It protects the human's other sessions whichever assertion goes wrong, and a convention does not. The cost of that protection is small against another crash. How it is built and where its limit stands are yours to settle, with the ways weighed.

**What the revision must hold.**

1. Under `spec.md:66`, the session's sentence, in substance: „A failing comparison of this kind grew by about 2 GB/s and took down agent sessions on the machine; `--max-old-space-size` and `timeout` do not stop it. Tests on jsdom therefore run under a watchdog that kills the process tree above a set memory limit.” Word it true to the evidence. The growth is that session's measurement, and the crash link is its „most likely cause”. Correct the line's stated reason as well: Node builds the failure message itself, by `inspect` with `depth: 1000`, `customInspect: false` and `getters: true`, before anything is thrown, as `reports/memory-finding.md` gives. A `util.inspect.custom` therefore cannot shorten it. Why a rendered element explodes and a plain one does not is unestablished; say so, or read it out by inspection without running a failing comparison.
2. The watchdog as a decision of its own, with rejected ways and the cost if wrong:
   - which runs it covers: `npm test` whole, `npm test -- <file>` through `scripts/test-node-file.mjs`, and any direct `node --test` the guidelines allow;
   - how it reads the memory of the process tree on Windows, and whether the same way holds on Linux, where `README.md` gives an install path; no new runtime package without weighing `reserved_choices.md`;
   - the limit and its source. Measure the real peak of the full Node stage under the base, safely, and set the limit above it with a margin, far below the 59.8 GB commit limit. Include that the machine runs other sessions. The interval of its reading has to fit about 2 GB/s;
   - what a person reads when it fires: a failed run with a sentence naming the limit, the file where one can be named, and the likely cause. A kill must not look like a flaky test or a pass;
   - how a test proves it: a permanent test that it kills an allocating child and reports so, on the guidelines' levels;
   - that Stryker's `tap.testFiles` holds no file of `tests/view/` today, so it needs nothing now, and what a later task adding one has to do.
3. Weigh prevention in the harness beside the watchdog, which only ends the run after the fact. One way seen, not researched: the harness exports the `assert` tests on jsdom use, whose `equal` and `deepEqual` compare without building Node's message, `util.isDeepStrictEqual` being one candidate, and throw a plain error; and a guard test refuses `node:assert` imported directly in such a file. Say whether it replaces the rule of `:66`, joins it or loses, and why. It does not replace the watchdog.
4. Order of work: the watchdog stands before the first test on jsdom. Say so where the spec gives the units of the change and under *Left to the maker*.
5. Foundation entries the watchdog brings, by name: `foundations/part_map.md` claims, a decision or invariant where one binds later work, `guidelines/testing.md` on the route item 15 of the task gives. A new entry is named here and written by the foundation step or return step.

**Questions** go to the orchestrator by your report's status `questions`, not to the human.

**Report.** Revise `.runs/task-cycles/logowanie-w-react/spec.md` and write `.runs/task-cycles/logowanie-w-react/reports/spec-revision.md`, as your method gives. Return your status, a one-line check result naming what failed or did not run, and the report's path; reaches and **Searches not found or unclear** stand in the report.
