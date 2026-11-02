# Handoff — Slice 15, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base f1e0923d7b958721209c859f6e3ae187247992db. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Read every file and range of your *Read* before you write code, one per call; a read cut short is read again, and your report says what you read. Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-15.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 15 — The testing guidelines of jsdom and the memory limit

- **Goal:** Written as the cycle's author of `the-way-maintain-testing-guidelines`: `guidelines/testing.md` describes the state after this change. The row `browser-view` of the table of parts, the recipe `unit test` and the part *Not tested on purpose* stop leaning on the hand-made document model, in line with rows F15 and F16. The recipe `unit test` says a test of a screen in React runs on the harness `tests/view/page-document.mjs` and takes `assert` from it, a helper on jsdom too. The file holds the rule of spec decision 11: a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation. `tests/view/memory-limit.test.mjs` stands in the recipe `integration test`. The sentence at `guidelines/testing.md:175`–`:178` says after this what D-76 says after row S5. `scripts/kitchen-sink.mjs` and `preview-server-access` stay as they are, with no refusal test. Every field comes from the task, the spec and the entries the foundation step wrote; a meaning none of them settles goes into no file and stands in the report as a question for the human at the blocked draft request.
- **Change:** `guidelines/testing.md`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:44-44` To do 15 ·
  `.runs/task-cycles/logowanie-w-react/task.md:54-57` To do 18 ·
  `.runs/task-cycles/logowanie-w-react/task.md:101-106` Pytanie 7 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:42-73` Decision 1 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:189-197` Decision 9 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:238-244` Decision 11 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:281-281` Foundation entries, guidelines ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/testing/template.md` ·
  `.the-way/product-guidelines/testing/SKILL.md:39-42` ·
  tests/view/memory-limit.mjs and tests/view/page-document.mjs, which Slices 1 and 5 write ·
  rows S5, F15, F16, F21, F22
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 6 · S5 · F15 · F16 · F21 · F22

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `.the-way/product-guidelines/template.md`
- `.the-way/product-guidelines/testing/template.md`
- `.the-way/product-guidelines/testing/SKILL.md:39-42`
- tests/view/memory-limit.mjs and tests/view/page-document.mjs, which Slices 1 and 5 write
- `foundations/decisions.md:1448-1460` D-76
- `foundations/decisions.md:1606-1618` D-88
- `foundations/decisions.md:5395-5426` D-264
- `foundations/decisions.md:5517-5560` D-268
- `foundations/invariants.md:1189-1198` document-test-memory-limit

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:44-44` To do 15

15. Przypadki testów ekranu konta dalej chronią to samo zachowanie po stracie ręcznego modelu dokumentu, a `guidelines/testing.md` opisuje stan po tej zmianie przez `maintain-testing-guidelines`: wiersz `browser-view` w tabeli części, przepis `unit test` i część *Not tested on purpose*.

### `.runs/task-cycles/logowanie-w-react/task.md:54-57` To do 18

18. Zmiana budowania strony wszystkich stanów nie jest zmianą granicy serwera podglądu, więc test odmowy tego serwera nie wchodzi w tym zadaniu, a niezmiennik `preview-server-access` zostaje przy przeglądzie (pytanie 7).
   - Jeśli cykl zmieni `scripts/kitchen-sink.mjs`, nie rusza wierszy podawania plików (`scripts/kitchen-sink.mjs:34` i dalej).
   - To czytanie wchodzi do D-76 przez wiersz S5, także gdy `scripts/kitchen-sink.mjs` się nie zmieni.
   - Zdanie `guidelines/testing.md:174`–`:177` mówi po tym zapisie to samo co D-76, przez `maintain-testing-guidelines`.

### `.runs/task-cycles/logowanie-w-react/task.md:101-106` Pytanie 7

- Pytanie 7. Czy zmiana sposobu budowania w `scripts/kitchen-sink.mjs` jest pierwszą zmianą granicy serwera podglądu, która według D-76 wymaga testu odmowy w tym zadaniu?
  - Answer: Nie. Odstępstwa z D-76 i dla `assets/sprites/**` kończy tylko zmiana zasady granicy: inny rodzaj pliku, inna droga wejścia, inny odbiorca. Zmiana budowania strony wszystkich stanów nie jest zmianą granicy serwera podglądu. Pierwsze zadanie, które na tym czytaniu się oprze, zapisuje je przy odstępstwie.
  - Not chosen:
    - każda zmiana plików granicy się liczy — test przy zadaniu 6 i ewentualnie przy zadaniu 2, zmiana odpowiedzi człowieka „pliki testów żadne”, zmiana planu
    - nowe pliki się liczą, a zmiana budowania nie — test przy zadaniu 6, te same zmiany
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 13 pakietu. Pytanie nazwało koszt tej drogi: serwer dalej bez stałego testu, czyli jak dziś. Fakt z kodu (tak jest dziś, to nie wymaganie): strona wszystkich stanów bierze z `account-screen.js` jedną stałą (`src/browser/kitchen-sink/kitchen-sink.ts:22`, loop2 48544f0).

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

### `.runs/task-cycles/logowanie-w-react/spec.md:281-281` Foundation entries, guidelines

Guidelines, by the routes the task gives: `guidelines/testing.md` by `the-way-maintain-testing-guidelines` (items 15 and 18, and with them the memory limit: the row `browser-view`, the recipe `unit test`, the harness's `assert`, the rule of decision 11 for a throwaway file, and `tests/view/memory-limit.test.mjs` in the recipe `integration test`), `guidelines/coding-browser-module.md` by `the-way-maintain-coding-guidelines` (item 16, with decisions 2, 5 and 6), and there too the row of `about.ts` in `guidelines/coding-content-data.md`.
