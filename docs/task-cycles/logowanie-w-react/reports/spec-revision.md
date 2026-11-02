# Report — revision of the spec, task `logowanie-w-react`

Status: done.
Spec: `.runs/task-cycles/logowanie-w-react/spec.md`, revised for the memory finding alone.
No tracked file changed: `git status --short` is empty. The review's PASS in `reports/spec-reviewer.md` does not cover this revision.

## What my trial did

The comparison the finding names came from my trial. I ran the mutated `card.trial.mjs` with the guard on, on jsdom and then on happy-dom, each under `timeout 60` and with nothing reading memory. Both runs ended „Terminated”. I then wrote into the spec, as measured, that the test „did not end within 60 s … because the runner prints the whole document”. That cause was my guess, not a measurement. I never looked at memory, and the spec's line sent a real danger to the review as a matter of waiting time.

Two things in my first report need this correction. Its line „A failing `assert.equal` on two elements did not end within 60 s” is true and hides the danger. Its unexplained `dropFocusOfDisabled` guard is probably explained now: the earlier session most likely wrote it, ran the comparison at 12:51:59 and went down with the machine, which is why I have no record of it. That is my inference from the times in the finding. I left `reports/spec-designer.md` as written, since it records that stage; this report corrects it.

`spec-trials/react-card/tests/view/card.trial.mjs` still holds those `assert.equal` calls on elements. Nobody should run it with `TRIAL_FIXUP` or mutated code; I did not, under the rule.

## Safety rule, as kept

No test ran on jsdom or happy-dom in which a comparison on an element can fail: the two scripts that touched jsdom hold no `assert` (checked by search). The allocating proof stopped itself at 3.5 GB and in fact never passed 1.05 GB, under a limit of 1 GiB. The base's Node stage ran under a cap of 6 GB and holds no document imitation. `card.trial.mjs` was not rerun.

## What the revision holds, by the handoff's items

1. **`spec.md`, the bullet at decision 1** (was `:66`). The session's sentence in substance, with the growth given as that session's measurement and the link to the crash as „most likely cause”. The stated reason is corrected to Node's own `inspect` before anything is thrown.
2. **Decision 9**, the watchdog.
3. **Decision 10**, prevention in the harness. It replaces the convention of the old line, joins the watchdog and does not replace it.
4. **Order:** a sentence under the units' table in decision 7, the units marked first and second, a line of *Constraints* and the first item of *Left to the maker*.
5. **Foundation entries:** a new decision, a new invariant (working name `document-test-memory-limit`), a new environment fact (working name `node-assert-failure-inspect`), `guidelines/testing.md` on item 15's route. `foundations/part_map.md` needs no change: `tests/view/**` claims the new files.

Forced elsewhere: one goal, the units' table, and the line „No environment fact”, which stopped being true. Nothing else in the spec changed.

## One reading the orchestrator may want to look at

The ruling says something „kills the process tree above a set memory limit”, and the handoff asks how it reads the memory of the process tree and to set the limit above the full stage's peak. I settled on a thread inside each test process on jsdom, which reads and kills that one process, and sums no tree. I hold this meets the ruling's purpose: a test on jsdom is a unit test and starts no process, so its tree is one process, and the runner above it stays alive to report. The limit also stands above the stage's peak. But it is not literally a tree-wide limit: it covers files on jsdom and no others, and several such files can add up, which decision 9 bounds. The ruling leaves the build to me, so this is no question; it is named so that it is seen. The supervisor over the stage is written out as the rejected way and the way back.

## Measured

All in `.runs/task-cycles/logowanie-w-react/spec-trials/`; `watchdog/stage-peak.txt` and `watchdog/graph.txt` hold the outputs. Windows only, Node 24.17.0.

| What | Result |
|---|---|
| Full Node stage, clean copy of the base (`node-stage/`), under a cap of 6 GB, read about 3 times a second | 1167 tests pass, 63.5 s, exit 0. Peak tree 1.17 GB private, 1.68 GB working set, 25 processes; largest process 0.21 GB |
| One process on jsdom, the page walked 80 times, no assertion | 1.7 s, peak 391 MB |
| Limit of 1 GiB, about 2 GB/s, stuck main thread, 3 direct runs | Killed at a reading of 1027, 1044 and 1027 MB, about 0.6 s, exit 1 |
| The same under `node --test` with a quiet second file, mocked timers | Sentence, `✖` on the file, the other file passes, exit 1 |
| The same through a copy of `scripts/test-node-file.mjs` | Sentence, `✖`, exit 1, then „No test executed in the selected file.” |
| Cost of the thread | About 16 MB more resident memory (64 against 48 MB) |
| One reading of all processes in a PowerShell kept open | 170 ms alone; about 0.25 s a round in the sampler |
| Own enumerable keys, plain jsdom input | None; a walk following what `inspect` follows: 1 path |
| Own enumerable keys, rendered input | `__reactFiber$…`, `__reactProps$…`, `__reactEvents$…`, `value`, `_valueTracker`; the walk hit its budget of 1,000,000 paths over 253 distinct objects, 0.19 GB, no comparison made |
| Commit | Limit 59.8 GB, 26.1 GB in use before the stage, 27.0 GB after it |

The growth of 2 GB/s and the session's other figures stand as that session's measurement; nobody reran them, and I did not.

## Ways weighed

Decisions 9 and 10 hold them with their costs. Watchdog: a thread in the process won over a supervisor of the stage (two readers by system, a slower reading, wrappers on two scripts, direct runs bare, no file named), system limits, `--max-old-space-size`, `timeout` and a preload by `NODE_OPTIONS`. Prevention: the harness's `assert` with a guard won over a remembered convention and over Node's `assert` with a message. `util.isDeepStrictEqual`, the handoff's candidate, is safe only on plain data: Node's source keeps its record of cycles along the path too, so `deepEqual` refuses elements before calling it. That is read, not run.

## The four checks

1. **Placeholders:** none, by search; the working names of two entries are marked as such for the foundation step to word.
2. **Contradictions:** the old „by identity” bullet is gone and no other line repeats its reason. Non-goals still hold: `scripts/test.py`, `scripts/test-node-file.mjs` and `stryker.config.json` do not change. D-77 stands, and the spec says why. One number corrected while writing: 19 focus comparisons, not the 34 uses of `fakeDocument`.
3. **Several independent changes:** no; the watchdog exists for the first test on jsdom. It can be its own first slice.
4. **Two readings:** „the process tree”, above, is written down in decision 9. „Files on jsdom” is defined by the guard: whatever loads the harness.

## What was not run

Linux, for the thread and for `SIGKILL`'s report through the runner. A failing comparison on an element of any kind, including the harness's `assert` on a rendered element, which the spec leaves to the maker under the watchdog. The real growth under the thread: the proof grew `Buffer`s, while the session saw growth that a heap limit does not stop, so the thread's reading of `inspect`'s growth rests on `rss` counting all of a process's memory, not on a run. The whole gate, the Python stage, Stryker and the Docker build. `util.isDeepStrictEqual` on elements. Node's `assert` with a message on an element.

## Reaches beyond the dispatch

- Node 24.17.0's `internal/util/inspect` and `internal/util/comparisons`, read at run time through `process.binding("natives")`: to establish why a rendered element explodes and to judge `isDeepStrictEqual`.
- `README.md` lines 36 to 78 and `guidelines/` searched for a direct `node --test`: to set the runs covered.
- `tests/view/account-screen.test.mjs`, counts of `assert` methods and focus comparisons.
- `reports/spec-reviewer.md`, head: to see what the PASS leaves out.
- `foundations/glossary.md` *unit test*, read earlier: the ground for one process.

## Searches not found or unclear

- The guidelines name no direct `node --test`: none in `guidelines/`, `README.md`, `AGENTS.md` or the skills. The watchdog covers it anyway.
- Whether a value on an `AssertionError` reaches the runner's own `inspect` with a deep setting: not read and not run. Decision 10 avoids the question by putting no value on the error.
- The memory in the session's growth is unknown in kind: a heap limit did not stop it. `ctx.budget` in `inspect` is the likely reason it can pass one level's 2^27 bytes, but which allocation grows was not established.
- Whether the finding's 12:51:59 run is the one that ended my first session: the times fit, and nothing else says so.
