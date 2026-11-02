FAIL

# Report — review of the spec's revision, task `logowanie-w-react`

Reviewed: `.runs/task-cycles/logowanie-w-react/spec.md` as revised for the memory finding, against `reports/memory-finding.md`, `reports/spec-revision-handoff.md` and `reports/spec-revision.md`. No tracked file changed: `git status --short` is empty.

**Earlier findings:** my first review had none. The memory matter it left out is met for every file under `tests/`, and not beyond them (finding 1).

**The design holds.** The one allowed run shows the thread stops the real growth. Both findings below are gaps of a sentence or two; neither reopens decision 9's choice of a thread or decision 10.

## Findings

### 1. „All of them” is false for the kind of file that caused the crash

`spec.md`, decision 9: „**The runs it covers.** All of them, by one means: the limit comes with the harness, and the guard of decision 10 refuses a file that reaches jsdom any other way.” The goal above it says: „No test on jsdom can take the machine's memory down with it, whichever assertion goes wrong”.

The limit reaches only a file that imports the harness, and the guard reads only the repository's test files. The run that `reports/memory-finding.md` names as the most likely cause was neither: it was `spec-trials/react-card/tests/view/card.trial.mjs`, a throwaway file under `.runs/` with a harness of its own. An agent proving something with a scratch file on jsdom gets no limit and no refusal, and that file still stands. The constraint in *Constraints* ends once the watchdog stands, so after that nothing speaks to such a file. `guidelines/` holds no word on jsdom today, and the spec's route for `guidelines/testing.md` lists none.

No mechanism among the ways weighed reaches such a file: the supervisor and the `NODE_OPTIONS` preload would miss it too, so it takes a rule.

**The question for the designer:** what must a throwaway file on jsdom do, once the maker has `tests/view/memory-limit.mjs`, and where is that written so a maker and a later agent read it? The answer changes the build, because it adds a line to `guidelines/testing.md` on item 15's route and narrows the claim in decision 9 and the goal to what they cover. Without it, the next probe under `.runs/` can repeat the crash during this cycle.

### 2. The proof can pass without running anything on one of its two routes

Decision 9, *The proof*: it shows „that this reads as a failure through both `node --test` and `scripts/test-node-file.mjs`”. That proof runs inside `tests/view/memory-limit.test.mjs`, itself started by `node --test`, so its children inherit `NODE_TEST_CONTEXT=child-v8`. The designer's runs were not nested. Measured from inside a test, on a small passing file:

| Started from a test | Context inherited | Context cleared |
|---|---|---|
| `node --test <file>` | Exit 0, nothing run, „run() is being called recursively within a test file. skipping running files.” | Exit 0, the file runs |
| `test-node-file.mjs <file>`, the designer's copy | Exit 1, 0 tests, the same warning | Exit 0, the file runs |

So on the route of `scripts/test-node-file.mjs` a test that asserts „exit 1” passes with no child started and no kill. This is the invariant's own test, and the guarantee it stands for is the one a later change most needs to keep. The spec should say that the proof clears `NODE_TEST_CONTEXT` for its children and asserts the sentence on both routes, not only the exit code.

## The one allowed run

**The outer cap, proved first.** `review/capped/outer-cap.ps1`, a PowerShell process that reads the whole tree from outside about every 150 ms and kills it with `taskkill /T /F`, against `prove-cap.test.mjs`, which allocates at about 2 GB/s on a stuck main thread with no limit of its own and stops itself at 4.2 GB. Four runs under `node --test`: killed each time at about 1.75 s, peak tree 3.17 GB private, none reached the stop, and no large `node` process left. The test process stood in teardown for under 0.8 s after the kill (read: 1766 MB, then gone).

**A dry run** of the same file by `===`, which cannot fail: exit 0, 0.18 GB, so the file reached its comparison.

**The run, once, on jsdom, under `node --test`:** `review/capped/real-comparison.test.mjs`, the spike's card rendered, focus on the password field, `assert.equal(document.activeElement, email)` from `node:assert/strict`, the designer's thread at 1 GiB, outer cap 3 GB.

| | |
|---|---|
| Result | The thread killed the test process; the outer cap never fired |
| Peak the outer process read | Tree 1.295 GB private, 1.162 GB working set; test process 1.274 GB private, 1.111 GB working set; runner 0.021 GB |
| The thread's reading at the kill | 1345 MB, limit 1024 MB |
| Time | Comparison to kill about 2.1 s; whole run 3.67 s |
| Exit | 1; no process left; free commit 33.5 GB before and after |

What the runner printed:

```
REVIEW rendered keys 3, rss MB 175
REVIEW comparing at 1793623142594
MEMORY LIMIT: …\real-comparison.test.mjs passed 1024 MB (at 1345 MB) and is killed. Likely cause: a failed comparison of a rendered element.
✖ …\real-comparison.test.mjs (3497.334ms)
ℹ tests 1
ℹ pass 0
ℹ fail 1
…
✖ failing tests:

test at real-comparison.test.mjs:1:1
✖ …\real-comparison.test.mjs (3497.334ms)
  'test failed'
```

The line „comparison returned” never printed. What the test process read (`real.txt.samples.txt`), private MB by ms since the start: 162 at 1467; 528 at 2201; 363 at 2353; 861 at 2676; 462 at 2840; 719 at 3391; 1305 at 3519.

**What this settles:** `rss` follows the real growth, private and working set moving together, and a thread reads it while the main thread is stuck in Node's own message building. **What it does not settle:** it is one run, stopped at 1.3 GB, so it shows nothing of the growth above that, nothing at the limit of 2 GiB, and nothing on why the memory is out of the heap's reach.

## The five questions

1. **Does decision 9 meet the purpose?** For files under `tests/`, yes; beyond them, no (finding 1).
   - *The parent's reporter.* The runner stayed at 21 MB, since the child dies before anything leaves it. A failure that finishes below the limit: by Node's `internal/error_serdes`, read not run, `serializeError` hands the parent a serialized value or text from `inspect` with its default depth in the child, and the reporter's own `inspectOptions` set no depth. With decision 10 no value is on the error, so nothing of an element reaches the parent.
   - *Several files.* They add up by the sum in decision 9, and the figure there needs the correction in note 1. The conclusion stands: 33 GB holds about 13.
   - *A file without the harness.* Inside `tests/` the guard refuses it. `t.assert` from the test's context goes round the guard, and the thread then kills the file with no case named, which is the cost decision 10 gives.
2. **Decision 10.** The guard catches what it says, if „imports” is read with the forms in note 3. The cases can still say what they say:
   - The seven methods are all the file uses, as stated: 291, 148, 76, 3, 2, 2, 1.
   - `assert.equal` in `node:assert/strict` is `Object.is`, so `equal` keeps its meaning.
   - Only two shapes of `deepEqual` hold elements. `deepEqual(forms(root), {})` passes as it stands while the page shows no form, and is refused where forms stand, where it fails today anyway. `deepEqual(order, [logout, line, row])` at `tests/view/account-screen.test.mjs:2982` is the one that must be rewritten; identity can be kept by `equal` on each place, so the case loses nothing.
   - About 200 calls pass a third argument, a message, so the harness's methods have to take one. „Can stay as written” implies that.
3. **The limit, its source and the interval.** They hold. The source is checked: `watchdog/stage-peak.txt` gives 1.165, 1.680 and 0.208 GB and 1167 tests. The figure past the limit is wrong (note 1).
4. **Can it be mistaken?** Never for a pass: `✖`, fail 1, exit 1, and the Node stage's failure stops `scripts/test.py` before later stages. For a flaky test, it can at the tail. The last lines say only `'test failed'` at `:1:1`, while the sentence stands above them, in a full gate more than a thousand lines up. Decision 9 already requires the sentence to say what to look for; a rerun repeats the same bounded kill, so the cost is a reading of the log.
5. **The order** is one a plan can follow. `memory-limit.mjs` and its test need no jsdom and no harness, the guard passes with no harness yet, and the harness comes third. The order is said where the handoff asked: units, *Constraints*, *Left to the maker*.

**Nothing else changed:** read against the text of my first review, the revision touched one goal, one constraint, the bullet of decision 1, the units' table with its sentence, decisions 9 and 10, the foundation entries, the guidelines' route and *Left to the maker*. All of it is forced by the matter.

## Notes to carry with the corrections

1. **„about 2 GB/s adds at most 0.2 GB past the limit”, and with it „about 2.2 GB each”:** measured 0.32 GB past the limit, so above 3 GB/s in the last 100 ms. The outer readings show 586 MB in 128 ms, about 4.6 GB/s, and the growth moves in steps, not evenly. Say about 0.5 GB past the limit and about 2.5 GB each; „14 of them” becomes 13. No decision changes.
2. **Decision 1:** „That reading explains the growth; no failing run confirmed it.” One run now stands. It confirms that the thread stops the growth, and not the reading of why it grows.
3. **The guard's „imports”** should be read to take a dynamic `import("jsdom")`, `from "assert"` and `node:assert/strict`. Its matching is not yet settled in the text.
4. **Decision 4's stryker row** keeps the wrong reason from my first report. The revision was right not to touch it.

## Not run

Under the handoff's limits: no second failing comparison, nothing on happy-dom, `card.trial.mjs` not run. Not run for lack of what they need or by their cost: a limit of 2 GiB on real growth, Linux, the harness's `assert` and its refusal on a rendered element (no harness exists yet), `util.isDeepStrictEqual` on elements, the full gate.

## Reaches beyond the dispatch

- Node 24.17.0's `internal/error_serdes` and `internal/test_runner/reporter/utils`, read at run time: to judge what reaches the parent runner.
- `tests/view/account-screen.test.mjs`: `forms`, the `deepEqual` lines, line 2982, the import of `tests/sim/program-fixture.mjs`, which imports nothing.
- `spec-trials/watchdog/`: `memory-limit.mjs`, `grow.mjs`, `test-node-file.mjs`, `stage-peak.ps1`, `stage-peak.txt`, `out-file.txt`, `out-test.txt`, `graph.txt`.
- `guidelines/`, `README.md` and `AGENTS.md`, searched for jsdom and for scratch files.

## Left behind

`spec-trials/react-card/review/capped/`: the scripts, `prove1`–`prove4`, `dry` and `real` with their samples, `nested.out.txt`. No junction or process stands from these runs. `prove1` and `prove2` print „left: 1” from a counting slip of mine, fixed before `prove3`.

**Searches not found or unclear:**

- Which memory grows, and why a heap limit did not stop it in the session's measurement: still unknown. In this run the growth fell back twice, from 528 to 363 MB and from 861 to 462 MB, so some of it is freed and it does not rise evenly.
- Whether a real failure on Linux reports the same way: not run; the designer's report says so too.
- How the guard should treat a helper module that imports `node:assert` and receives elements: none exists today. The spec does not say.
