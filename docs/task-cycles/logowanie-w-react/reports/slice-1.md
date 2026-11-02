# Report — Slice 1, task `logowanie-w-react`

**Status:** done

## Files and commits

| File | Added | Removed |
|---|---|---|
| `tests/view/memory-limit.mjs` | 53 | 0 |
| `tests/view/memory-limit.test.mjs` | 197 | 0 |
| `tests/view/memory-limit-child.mjs` | 22 | 0 |

Commit: `7c2faf8884a8a4331abafa0602b94118de2aa434` — `test: :white_check_mark: kill a test process above its memory limit and refuse a file that goes round the document harness`. Base e38278c.

## Checks

All from the worktree's root, Node 24.17.0 on Windows unless said otherwise. Nothing ran on jsdom or happy-dom, and neither is installed.

### Failing first

| Command | Exit | Shows |
|---|---|---|
| `npm test -- tests/view/memory-limit.test.mjs`, with `startMemoryLimit` an empty function and the guard's `refusals` returning `[]` | 1 | 37 cases, 34 failed, 3 passed. The three kill cases failed at their assertions, the child reaching its stop at 513 MiB (`child reached its own stop at 513 MiB`). All 31 crafted refusals failed at `deepEqual`. The control, the tree case and the allowed-forms case passed, as they should with nothing written. |
| `node --test tests/view/memory-limit.test.mjs`, with a temporary `tests/view/zz-temp.mjs` importing `jsdom` | 1 | The tree case failed. File removed. |
| The same, with a temporary `tests/sim/zz-temp.mjs` holding `await import("happy-dom")` | 1 | The tree case failed. File removed. |
| The same, with a temporary `tests/zz-temp.mjs` importing the harness and `node:assert` | 1 | The tree case failed. File removed. None of the three was ever executed: the guard reads text. |

The invariant `document-test-memory-limit` is cited on every case by `// invariant: document-test-memory-limit`.

### The slice's checks, on the commit

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/memory-limit.test.mjs` | 0 | 37 pass, 0 fail, 0 skipped, about 5.5 s |
| `node --test tests/view/memory-limit.test.mjs` | 0 | 37 pass, 0 fail, 0 skipped |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 test OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |

### Further checks of mine

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py`, on the commit | 0 | 0 errors. Run for the citation of the invariant and the new files' part; it is one stage of the gate, not the gate. |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --ignore-path .gitignore --write tests/view/memory-limit.test.mjs` | 0 | Run once to format; the first `--check` on the test file exited 1. |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the three files | 0 | Clean. |
| `docker run --rm -v <worktree>:/w:ro -w /w node:24-slim sh -c '... node --test tests/view/memory-limit.test.mjs ...'`, 12 runs in a row, Node 24.22.1 on Linux | 0 each | 37 pass. Before the fix below the same runs failed in about 1 of 3; see Problems. |

### Not run

- The full gate, `npm test` with no argument: the handoff keeps it for the orchestrator, and the method agrees.
- `the-way-review-change` and the mutation tool: the first is the cycle's, and the second does not cover this part.
- The UI check `ui_check.md`: no screen changes, so it was not read.

## Own-work check

**Requirement most likely not met:** that the limit behaves on Linux as on Windows. The spec's trial ran on Windows only, while `README.md` gives the Linux install and the test runs wherever the gate does.

**Check:** the proof in the repository's own image `node:24-slim` (the `Dockerfile`'s base).

**What it showed:** it found a real fault, which I fixed; see Problems. After the fix, 12 of 12 runs passed. A direct run of the child there ended with code 137 and the sentence, so the kill is a signal on Linux and exit 1 on Windows, as the first case allows.

### Breaks tried one at a time, each restored

Each run was `node --test tests/view/memory-limit.test.mjs`. Exit 1 means the break was caught.

| Break | Exit | Caught by |
|---|---|---|
| `NODE_TEST_CONTEXT` left inherited | 1 | Both route cases, in about 55 ms, so with no child run. Confirms the spec's reading and that the proof cannot pass empty. |
| `console.error` on the thread in place of `writeSync(2, …)` | 1 | The first case and both routes: the sentence is lost behind the stuck main thread |
| `process.argv[1]` read on the thread | 1 | The first case and both routes: on a thread it names the thread's own script |
| No `.unref()` on the worker | 1 | The control, by the 60 s bound of `spawnSync` |
| A literal `// import "jsdom";` left in the guard's own file | 1 | The tree case, so the crafted text does trip the guard if written whole |
| The reading printed one MiB low (`Math.floor(… - 1)`) | 0 | **Not caught.** The test only requires the printed reading above the limit, and on Windows the overshoot is larger than one MiB. Left as it is: the figure is for a person and a test of its exact value would be a test of today's output. |

### One-off checks, not kept as tests

Scripts in the session's scratchpad, with the real `tests/view/memory-limit.mjs`.

| Check | Exit | Shows |
|---|---|---|
| `startMemoryLimit()` with no arguments, `process.memoryUsage.rss` replaced by `--import data:…` to read 2147483648 | 0 | The default lets exactly 2 GiB live |
| The same, reading 2147483649 | 1 | The default kills one byte above 2 GiB, with the sentence. The replacement reaches the thread. |
| A growing process with `mock.timers.enable` on its main thread | 1 | Killed with the sentence; the mocked timers do not reach the thread |
| A growing process with file descriptor 2 closed, so the write fails | 1 | Killed and never reached its stop, so the `try`/`finally` holds |

The default's value and the 100 ms have no permanent test: the method says a test only a deliberate change can fail checks nothing worth keeping, and reaching 2 GiB for real would cost the memory this slice protects.

## Reaches beyond the dispatch

- `tests/passwords.test.mjs:1-60`, for the shape of a `spawnSync` test.
- `eslint.config.mjs`, for the globals of test files.
- `.the-way/elements/common/foundation_check.py` by a search for `invariant:`, for how a citation is read.
- `.the-way/task-cycle/change/slice.md`, which the method names for this variant.
- `Dockerfile` by `FROM`, for the Linux image.
- `git log`, for the commit style, as the handoff says.

## Searches not found or unclear

- **`guidelines/testing.md` holds no rule on a throwaway file on jsdom yet.** Spec decision 11 says it is written there. D-268 already holds it. It is outside this slice's *Change*, so I left it; the handoff repeats the rule in the meantime. The same file's *integration test* list does not name `tests/view/memory-limit.test.mjs` either. I did not see the plan's other slices, so whether a later slice takes these is the orchestrator's to confirm.
- **Spec decision 9: „its wording tells a reader to look for it”.** Unclear what a sentence can do for a reader who has not yet found it. I read it as a distinct opening a person can search a long log for: the sentence begins `Memory limit: killed the process of`. Nothing in the closing lines of a run changes, as the spec says.
- **Row F22's invariant:** the plan names it by the row; the handoff's ranges give it as `document-test-memory-limit`, which is what the cases cite.

## Choices, with the way rejected and the cost if wrong

- **The worker's body lives in `memory-limit.mjs` itself**, which loads itself as the worker and runs the watch only under `workerData.memoryLimit`. Rejected: a fourth file, which the slice's *Change* does not list; a source string with `eval: true`, which ESLint and Prettier could not read. Cost if wrong: another Worker loading this module with a `memoryLimit` key in its data would start a watch.
- **The growth is paced to about 70–100 MiB/s by `Atomics.wait`**, which keeps the main thread stuck and bounds the race with a thread still starting, so a busy machine does not turn into a flaky proof. Rejected: unpaced allocation, which can reach the stop in about 0.2 s, before the thread's first reading. Cost: about 5.5 s for the file, and about 7 s for each kill case when it fails.
- **Sizes: limit 128 MiB, stop 512 MiB; the control has limit 512 MiB, stop 200 MiB.** The control passes the other's limit, so only the limit decides, and it asserts it really reached 200 MiB, so it cannot pass with a child that did nothing.
- **The guard reads imports as text** with one pattern over `from`, `import` and `require`, on every JavaScript or TypeScript file under `tests/`, helpers included, as the invariant's „Under `tests/`” says. Rejected: the TypeScript parser's `preProcessFile`, which ties the guard to that package's version. Cost: a comment holding a whole import of jsdom is refused, which fails loud and is fixed by rewording.
- **Beyond the forms named, the guard also refuses** `require(...)`, a re-export, a subpath such as `jsdom/lib/api.js`, and `assert/strict`. Each is the same way round the rule, at no added code.
- **The harness is matched by exact path for the imitation rule and by file name for the import rule.** A file that only shares the harness's name is refused; a case shows it.
- **`limitBytes` and `intervalMs` are not validated.** A `NaN` limit would never fire. Rejected: a check for one caller with defaults and a test with literals. Cost if wrong: a caller passing a wrong type runs without the limit, silently.
- **The reading prints upward by `Math.ceil`**, for the reason under Problems.

## Adaptations

- Spec decision 7 says of `memory-limit.mjs` „Node's `worker_threads` and nothing else”. It also imports `node:fs` for `writeSync`, because a thread's `process.stderr` goes through the stuck main thread (shown by the break above). I read „nothing else” as no package, which the spec's next sentences support. Small mismatch, one line.

## Known gaps

- A dynamic import of a computed name, `await import(name)`, goes round the guard, like `t.assert` and a helper's own `node:assert`, which spec decision 10 already accepts. The thread answers these, at the cost of a killed file with no case named.
- `.ts` under `tests/` is read by the guard, though none exists today.

## Problems

- **On Linux the proof failed in about 1 run of 3 before the fix.** Evidence: 6 runs in `node:24-slim`, 2 failing, with `killed the process of /w/tests/view/memory-limit-child.mjs at 128 MiB` at `assert.ok(Number(reached[1]) > limitMiB)`; two earlier runs in that image failed as well. Verified cause: a reading just past 128 MiB, such as 128.3, rounded to 128, so the sentence said „at 128 MiB, above its limit of 128 MiB”. Fixed in the product code, by rounding the reading up, not by weakening the assertion: the sentence itself was wrong. Windows did not show it because its overshoot is larger. After the fix, 12 of 12 passed. The Linux image holds Node 24.22.1, not this machine's 24.17.0.
- **A mutation run gave a false result once:** Git Bash rewrote `// import` in an argument to `/ import`, which failed the file on a syntax error. Rerun with `MSYS_NO_PATHCONV=1`, which gave the row above.
