# Handoff — Slice 5, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 4273f70ba20dcee6a4b3f17b07deac8ce2fc94ac. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-5.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 5 — The harness on jsdom

- **Goal:** `tests/view/page-document.mjs` (no `.test.mjs`) starts, as its first act, the limit of `tests/view/memory-limit.mjs`, and only then installs a window of jsdom, so a test file that imports it first has `window` when `react-dom` loads. It gives a fresh window per case; a control that becomes disabled loses focus, by watching `disabled` and moving focus to an element outside `body`; `settle` and any mount outside it go through `act`, with `IS_REACT_ACT_ENVIRONMENT` in the harness; typing goes through the input's native value setter and a bubbling `input` event; a report of React's development build through `console.error` fails the case, and lines the product writes itself, such as `saved-game-load …`, are told apart. It exports an `assert` with `equal`, `notEqual`, `deepEqual`, `ok`, `match`, `doesNotMatch` and `fail`, each taking a message as Node's does: none builds Node's message and none puts a value on the error; `equal` and `notEqual` are `Object.is`; `deepEqual` takes plain data alone and refuses an element anywhere in either value, by a walk of arrays and plain objects that enters nothing else. `tests/view/page-document.test.mjs` holds the harness's own cases, including a failing `assert` on a rendered element that names its case in a short error and a `deepEqual` that refuses an element, and uses that `assert`. React may be drawn there with `createElement`; no product module in React exists yet. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). A test file on jsdom imports the harness first and takes `assert` from it, so the limit runs and `node:assert` stays out. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation. The harness's own failing cases run only under the limit.
- **Change:** `tests/view/page-document.mjs` · `tests/view/page-document.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/spec.md:42-73` Decision 1 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:154-171` Decision 7, The units of the change ·
  `.runs/task-cycles/logowanie-w-react/spec.md:189-197` Decision 9 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:238-244` Decision 11 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/account-screen.test.mjs:1-420` the hand-made model and its helpers · tests/view/memory-limit.mjs, which Slice 1 writes ·
  `foundations/decisions.md:1436-1448` D-75 · `foundations/decisions.md:1462-1489` D-77, D-78 ·
  `foundations/part_map.md:3-27` browser-view · rows F15, F16, F21, F22, F23
- **Model:** same — the first code on jsdom, where a wrong step repeats the crash, and every later test takes its reading of a page from it.
- **Risk:** none
- **Checks:** `npm test -- tests/view/page-document.test.mjs`, written first and seen failing; `npm test -- tests/view/memory-limit.test.mjs`, whose guard now reads the real harness; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2 · F15 · F16 · F21 · F22 · F23

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `tests/view/account-screen.test.mjs:1-420` the hand-made model and its helpers
- tests/view/memory-limit.mjs, which Slice 1 writes
- `foundations/decisions.md:1435-1447` D-75
- `foundations/decisions.md:1461-1475` D-77
- `foundations/decisions.md:1476-1488` D-78
- `foundations/part_map.md:3-27` browser-view
- `foundations/decisions.md:1606-1618` D-88
- `foundations/decisions.md:5395-5426` D-264
- `foundations/decisions.md:5517-5560` D-268
- `foundations/invariants.md:1189-1198` document-test-memory-limit
- `foundations/environment_facts.md:466-471` node-assert-failure-inspect

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/spec.md:42-73` Decision 1

### 1. Tests of a React screen run on jsdom 30.1.3

`tests/view/account-screen.test.mjs` loses its hand-made model and runs on jsdom, a development dependency pinned exactly. React throws on the hand-made model, so that model cannot stay.

Both ready-made imitations carried the page. The 69 cases of the base, unchanged in their bodies, ran on each through a thin adapter; 6 cases of the spike ran the React card inside the page still in DOM, with Node's mocked timers:

| Measured | jsdom 30.1.3 | happy-dom 21.0.4 |
|---|---|---|
| The 69 cases on today's DOM page | 68 pass | 68 pass, only after the test writes `Option` itself: `window.Option` is missing, and `createSelectList` calls `new Option`, so 44 cases failed without it |
| Time of the 69 cases (hand-made model: 0.4 s) | 3.0 s | 1.9 s |
| The spike's cases: card, sign-in, game in DOM, logout, reset form | all pass | all pass |
| React's warnings about `flushSync` or about unmounting | none | none |
| Packages it brings | 37 | 9 |
| Entries in the lockfile with React and esbuild | 576 | 549 |
| New advisories under D-33 | none | none |
| `getComputedStyle` honours `hidden` | yes | no |

The one failing case on both is a spy of the model's own (its stand-in `textContent` starts undefined), a matter of seeding it.

Chosen: jsdom, because it leaves the product's own call `new Option` unreplaced, where happy-dom needs a browser constructor written by the test, against the guideline's „Nie zastępuj mechanizmu”, and on a path 44 of the 69 cases walk. Rejected: happy-dom — faster by a second and 27 lockfile entries lighter, which is what jsdom costs. Rejected: extending the hand-made model until React runs on it — a browser imitation of our own to keep, where a ready one runs the same cases. Rejected: real-browser tests — D-75 and D-88 defer them. Cost if wrong: only the test harness of one file changes, since both imitations ran the same cases.

The harness is one new module, `tests/view/page-document.mjs` (no `.test.mjs`, so `node-test-selection` is untouched). It does what the trial showed to be needed:

- **It stands before React.** The test file imports it first, so that `window` exists when `react-dom` loads. Measured: with `window` installed after `react-dom`, a controlled field's `onChange` never fires; installed before, it does. Nothing fails loudly.
- **A fresh window per case**, as `onPage` gives a fresh document now, so a game left undisposed cannot answer another case's `visibilitychange`.
- **A control that becomes disabled loses focus.** Neither imitation does this and neither lets `blur()` do it; the model did. Measured: with the code that returns focus removed, the case still passes without this rule, and fails with it. It is kept as a rule of the harness, which watches `disabled` and moves focus to an element outside `body`.
- **No comparison on an element reaches Node's failure message.** A failing `assert.equal` on two rendered elements grew by about 2 GB/s at the end of another session's measurement on this machine, and that session names this spec's own trial, which ran such a comparison, the most likely cause of the low-memory errors of 12:52 to 13:00 that took down agent sessions. `--max-old-space-size=2048` did not stop the growth, and `timeout` stops it too late: 60 s at that rate is over 100 GB against a commit limit of 59.8 GB. Tests on jsdom therefore run under a watchdog that kills their process above a set memory limit (decision 9), and they take `assert` from this harness (decision 10). Node builds the message itself, by `inspect` with `depth: 1000`, `customInspect: false` and `getters: true`, before anything is thrown, so a `util.inspect.custom` on an element cannot shorten it. Why a rendered element explodes and a plain one does not was read without running a failing comparison: a plain jsdom element has no own enumerable key, so `inspect` stops at once, and a rendered one has five, among them `__reactFiber$…`, through which a walk following what `inspect` follows met 1,000,000 paths, the walk's budget, over only 253 distinct objects. `inspect` remembers only the current path (`ctx.seen`), so it writes an object out again for each path that reaches it, and its one brake, `ctx.budget`, counts per level of indentation. One failing comparison on a rendered element was then run once, under two caps: it confirms that the thread of decision 9 stops the growth, and it does not confirm this reading of why the memory grows.
- **React's work is awaited through `act`**, so `settle` wraps it; the flag `IS_REACT_ACT_ENVIRONMENT` stands in the harness; a mount that happens outside `act` is wrapped too, the only warning the trial met.
- **Typing goes through the input's native value setter and a bubbling `input` event**, the way React sees a change.
- **A report of React's development build through `console.error` fails the case.** Tests run React's development build, which reports hooks called in another order, missing keys and a field that changes from controlled to uncontrolled. Lines the product writes itself (`saved-game-load …`) are told apart.

What jsdom does not prove stays with a person and an agent: pressing Enter in a field does not send a form, a click on a label does not move focus, and nothing computes layout. Measured for Enter and the label on both imitations.

### `.runs/task-cycles/logowanie-w-react/spec.md:154-171` Decision 7, The units of the change

### 7. The units of the change

| Unit | Does | Used by, and depends on |
|---|---|---|
| `src/browser/sim/data/about.ts` (new) | The game's name and its one sentence. | Read by the card and by `app.ts`'s header. Imports nothing. A file of kind `content-data`. |
| `src/browser/view/account-rules.ts` (new) | Pure and without React or DOM: `addressProblem`, `passwordProblems`, `registrationProblems`, `RegistrationField`, `RESET_REQUESTED_SENTENCE`. | The card, the kitchen-sink page and tests. |
| `src/browser/view/password-reset.ts` (kept) | Loses `createResetScreen`; keeps `readResetToken`, `ResetEnding`, `ResetOutcome` and `resetOutcome`. | `app.ts`, the card, `tests/view/password-reset.test.mjs`, unchanged. |
| `src/browser/view/account-screen.ts` (deleted) | Goes with `accountForm` and `createAccountScreen`. | In `src/` only `password-reset.ts` and `app.ts` use them, both changed. |
| `src/browser/view/account-card.tsx` (new) | The card and its four states, and `createAccountCard`. The exemplar of D-36. | `app.ts`. Depends on the client, the two units above, the React controls, `credits-section.tsx`. |
| `src/browser/view/credits-section.tsx` (new) | The folded credits, drawn from `footerCredits()` of `footer.ts`, so the content is the footer's. | The card, today. |
| `src/browser/view/controls/react-button.tsx`, `react-text-field.tsx` (new) | Decision 2. | The card. |
| `src/browser/view/app.ts` (changed) | Decision 3; the header reads the name from `about.ts`. | `main.ts`, unchanged, so `src/browser/*.tsx` does not enter the part map (question 10). |
| `src/browser/styles.css` (changed) | Rules of the card's screen and the card, on existing tokens; the rules of the two forms side by side go. | The card and `app.ts`. |
| `tests/view/memory-limit.mjs` (new, first) | Decision 9: `startMemoryLimit({ limitBytes, intervalMs })`, with the limit's value as its default. | `tests/view/page-document.mjs` and its test. Node's `worker_threads` and nothing else. |
| `tests/view/memory-limit.test.mjs`, `memory-limit-child.mjs` (new, second) | Decision 9's proof, and the guard of decision 10. | The gate. |
| `tests/view/page-document.mjs`, `tests/view/react-controls.test.mjs` (new, after those) | Decisions 1, 2 and 10. | `tests/view/account-screen.test.mjs` and the gate. |

The order among these is a requirement: the watchdog and its test stand and pass before the first test on jsdom runs, and the harness's `assert` before the first case is moved onto it.

### `.runs/task-cycles/logowanie-w-react/spec.md:189-197` Decision 9

### 9. A test on jsdom runs under a memory limit inside its own process

`tests/view/page-document.mjs` starts, as its first act, a limit of 2 GiB on the process of the test file. A worker thread of that process reads the process's memory every 100 ms; above the limit it writes one sentence straight to the standard error and kills the process with `SIGKILL`. The thread is the point: a failing comparison blocks the main thread in one synchronous call, so no timer there would run, and the thread's timers are out of reach of the cases' mocked timers.

**The runs it covers.** Every run of a test file under `tests/`, by one means: the limit comes with the harness, and the guard of decision 10 refuses a file that reaches jsdom any other way. A file outside `tests/` is decision 11. So `npm test`, `npm test -- <file>` through `scripts/test-node-file.mjs` and a direct `node --test` are alike, the last of which the guidelines do not name but an agent can type. `scripts/test.py` and `scripts/test-node-file.mjs` do not change.

**How it reads memory.** `process.memoryUsage.rss()`, the working set on Windows and the resident set on Linux. One call, the same on both, with no branch by system, no new package and so nothing for `reserved_choices.md`. The trial ran on Windows only; the permanent test runs wherever the gate does, and `README.md` gives the Linux install.

**The process tree of the ruling.** The tree such a file kills is one process: a test on jsdom is a unit test, which by the glossary starts no process. Above it the runner stays alive, so the other files finish and the run reports. Nothing here sums a tree, so nothing measures the whole stage.

### `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10

### 10. Tests on jsdom take `assert` from the harness; a guard refuses `node:assert` there

The harness exports an `assert` with the seven methods `tests/view/account-screen.test.mjs` uses: `equal`, `notEqual`, `deepEqual`, `ok`, `match`, `doesNotMatch` and `fail`, each taking a message as Node's does, since about 200 calls pass one. None builds Node's message and none puts a value on the error: each compares, then throws a plain error with a short description, an element by its tag and class. A guard in `tests/view/memory-limit.test.mjs` reads the test files and fails where a file other than `page-document.mjs` imports `jsdom` or `happy-dom`, statically or by a dynamic `import(...)`, and where a file that imports the harness imports `assert`, `node:assert` or `node:assert/strict`. `t.assert` of a test's context and a helper module that holds its own `node:assert` go round the guard: `guidelines/testing.md` says a helper on jsdom takes `assert` from the harness, and the thread answers the rest, at the cost of a killed file with no case named.

- `equal` and `notEqual` are `Object.is`, so a comparison on elements is safe and fails with its case's name. The 291 `assert.equal` of that file can stay as written where their expectation stands, which also keeps the port's diff small.
- `deepEqual` takes plain data alone, and refuses an element anywhere in either value, found by a walk of arrays and plain objects that enters nothing else. `util.isDeepStrictEqual` is safe behind that door and not without it: read in Node's source, its record of cycles is also kept along the path (`internal/util/comparisons`, `handleCycles`), so it can walk the same graph as `inspect`. Not run. A case with elements in a `deepEqual` compares names or identities instead: `assert.deepEqual(forms(root), {})` passes as it stands while no form is shown, and `assert.deepEqual(order, [logout, line, row])` at `tests/view/account-screen.test.mjs:2982` becomes one `equal` for each place, which keeps its identity.
- `assert.equal(a, b, message)` of Node was not trusted either: a message spares the building only in the loose `equal`, since `node:assert/strict` builds the diff even with a message (read in Node 24.17.0, not run), and the error still carries `actual` and `expected` to the runner, and what the runner does with them was not run.

This takes the place of the convention the trial began with, a helper remembered at each comparison, which the first lapse breaks. It joins the watchdog and replaces none of it: this keeps a failure small and names its case, and the watchdog answers everything this does not foresee. With the watchdog alone, a lapse costs a killed file with no case named out of 69, and the 19 focus comparisons alone are 19 chances of it. With this alone, something unforeseen repeats the crash.

Rejected: the watchdog with the rule as a convention — safe, but a failing focus case then reports only that its file died. Rejected: Node's `assert` with a message at each call — a rule to remember, and unproved. Cost: about forty lines of an assertion module with a worse printed diff than Node's, for plain data too, and a guard. Its own failing cases, on rendered elements, run only under the watchdog.

### `.runs/task-cycles/logowanie-w-react/spec.md:238-244` Decision 11

### 11. Settled by the orchestrator after the review of the revision

The review of the revision returned `FAIL` with two findings, in `reports/spec-revision-review.md`, and found the design sound. A revision gets one review, so these stand here as the orchestrator's settlement, unreviewed, and the review of the whole change judges them with the code.

- **A throwaway file on jsdom.** The run named as the most likely cause of the crash was a file under `.runs/` with a harness of its own, which the limit and the guard do not reach, and no way weighed reaches it. So it takes a rule, written in `guidelines/testing.md`: a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation, and before that module stands no such file runs a comparison on an element that can fail. Rejected: leaving it to memory — that is how the crash came. Rejected: a preload by `NODE_OPTIONS` — it reaches only a run that sets it. Cost if wrong: an agent that skips the rule can repeat the crash; its handoff repeats the rule throughout this cycle. The two trial files holding such a comparison on a rendered element were deleted.
- **The proof cannot pass empty.** Decision 9's proof clears `NODE_TEST_CONTEXT` for its children and asserts the sentence on both routes.
- **The review's corrections of fact** stand in place: decision 1 on what the capped run confirms, decision 4's Stryker row, decision 9's figures, decision 10's guard and its methods' message.
