# Handoff — Slice 6, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 758ba84207f07e8c8ac62d1f97e1e2f83a551288. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-6.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## From Slice 5's report, carried here because it binds this slice

The harness drops focus one microtask after `disabled` is set, since it watches through a `MutationObserver`, the only thing that sees React's `setAttribute`. Measured: right after a click, with no await, `document.activeElement` is still the button; after `settle` it is the body. The hand-made model did this at once, so a case that read focus straight after a fire reads it after an await here. That change is of the harness, so it keeps the case's expectation; name each such case in your report. The harness and its cases stand in `tests/view/page-document.mjs` and `tests/view/page-document.test.mjs`, and `reports/slice-5.md` is the report.

## Your section of the plan, word for word

### Slice 6 — The 69 cases on jsdom, on today's page

- **Goal:** `tests/view/account-screen.test.mjs` loses its hand-made document model and runs every one of its 69 cases on the harness, against the DOM page as it stands: the harness imported first, `assert` from the harness, the model's own helpers rebuilt on the real document. Expected values stay. A case that compares elements in a `deepEqual` compares names or identities instead, as spec decision 10 gives, `assert.deepEqual(order, [logout, line, row])` at `tests/view/account-screen.test.mjs:2982` becoming one `equal` for each place. The case that leaned on the model's spy gets its seed. The file's opening comment and `tests/view/password-reset.test.mjs:4` lose their mention of the hand-made model. The report accounts for every case by name: moved with only its harness changed, or why not, with the source `guidelines/testing.md` *Changing an existing test* asks for. A case on focus is seen failing once, by its short error, against the code that returns focus removed for a moment. The tests of `createAccountScreen` stay until Slice 11. Other test files keep their stand-ins. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). This file runs on jsdom only with the harness imported first and with its `assert`; a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `tests/view/account-screen.test.mjs` · `tests/view/password-reset.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:44-44` To do 15 ·
  `.runs/task-cycles/logowanie-w-react/task.md:141-145` Context ·
  `.runs/task-cycles/logowanie-w-react/spec.md:42-73` Decision 1 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:175-175` Decision 7 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  tests/view/page-document.mjs, which Slice 5 writes ·
  `foundations/decisions.md:1477-1489` D-78 · `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  rows F15, F16, F21
- **Model:** same — 69 cases must keep what they protect through the loss of their model, on the path where a lapse crashes the machine.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`, reporting 69 cases; `npm test -- tests/view/password-reset.test.mjs`; `npm test -- tests/view/memory-limit.test.mjs`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 4 · Slice 5

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- tests/view/page-document.mjs, which Slice 5 writes
- `foundations/decisions.md:1476-1488` D-78
- `foundations/invariants.md:999-1008` expired-session-unsaved-progress
- `foundations/decisions.md:1606-1618` D-88
- `foundations/decisions.md:5395-5426` D-264
- `foundations/decisions.md:5517-5560` D-268

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:44-44` To do 15

15. Przypadki testów ekranu konta dalej chronią to samo zachowanie po stracie ręcznego modelu dokumentu, a `guidelines/testing.md` opisuje stan po tej zmianie przez `maintain-testing-guidelines`: wiersz `browser-view` w tabeli części, przepis `unit test` i część *Not tested on purpose*.

### `.runs/task-cycles/logowanie-w-react/task.md:141-145` Context

- Ręczny model dokumentu w `tests/view/account-screen.test.mjs` zajmuje pierwsze 420 wierszy pliku razem z pomocnikami.
- Z 67 przypadków tego pliku 37 czyta wnętrze modelu wprost, 44 wywołuje zdarzenia przez `.fire`, 41 przechodzi przez całą stronę, a 13 nie robi żadnej z tych rzeczy (liczone skryptem po blokach `test(`, wynik przybliżony, loop2 48544f0).
- Przypadki przechodzące przez całą stronę budują też ekrany gry, które zostają w DOM, więc zastępstwo modelu musi nieść także je.
- Własne zastępcze dokumenty mają też `tests/invariants/test_icon_credits.py:82` i `tests/view/icons.test.mjs:124`, które rysują stopkę (`createFooter`).
- `tests/view/password-reset.test.mjs` sprawdza tylko czyste funkcje, a ekran „Ustaw nowe hasło” sprawdza `tests/view/account-screen.test.mjs`.

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

### `.runs/task-cycles/logowanie-w-react/spec.md:175-175` Decision 7

Every case of `tests/view/account-screen.test.mjs` is accounted for by name in the maker's report: moved with only its harness changed, or changed in its expectation with the item of *To do* or the answer that changes it, or, for `createAccountScreen`'s own cases such as „reset from outside …”, replaced by the case that protects the same behaviour through `createAccountCard` (`guidelines/testing.md`, *Changing an existing test*). `tests/view/password-reset.test.mjs:4` loses its mention of the hand-made model.

### `.runs/task-cycles/logowanie-w-react/spec.md:226-236` Decision 10

### 10. Tests on jsdom take `assert` from the harness; a guard refuses `node:assert` there

The harness exports an `assert` with the seven methods `tests/view/account-screen.test.mjs` uses: `equal`, `notEqual`, `deepEqual`, `ok`, `match`, `doesNotMatch` and `fail`, each taking a message as Node's does, since about 200 calls pass one. None builds Node's message and none puts a value on the error: each compares, then throws a plain error with a short description, an element by its tag and class. A guard in `tests/view/memory-limit.test.mjs` reads the test files and fails where a file other than `page-document.mjs` imports `jsdom` or `happy-dom`, statically or by a dynamic `import(...)`, and where a file that imports the harness imports `assert`, `node:assert` or `node:assert/strict`. `t.assert` of a test's context and a helper module that holds its own `node:assert` go round the guard: `guidelines/testing.md` says a helper on jsdom takes `assert` from the harness, and the thread answers the rest, at the cost of a killed file with no case named.

- `equal` and `notEqual` are `Object.is`, so a comparison on elements is safe and fails with its case's name. The 291 `assert.equal` of that file can stay as written where their expectation stands, which also keeps the port's diff small.
- `deepEqual` takes plain data alone, and refuses an element anywhere in either value, found by a walk of arrays and plain objects that enters nothing else. `util.isDeepStrictEqual` is safe behind that door and not without it: read in Node's source, its record of cycles is also kept along the path (`internal/util/comparisons`, `handleCycles`), so it can walk the same graph as `inspect`. Not run. A case with elements in a `deepEqual` compares names or identities instead: `assert.deepEqual(forms(root), {})` passes as it stands while no form is shown, and `assert.deepEqual(order, [logout, line, row])` at `tests/view/account-screen.test.mjs:2982` becomes one `equal` for each place, which keeps its identity.
- `assert.equal(a, b, message)` of Node was not trusted either: a message spares the building only in the loose `equal`, since `node:assert/strict` builds the diff even with a message (read in Node 24.17.0, not run), and the error still carries `actual` and `expected` to the runner, and what the runner does with them was not run.

This takes the place of the convention the trial began with, a helper remembered at each comparison, which the first lapse breaks. It joins the watchdog and replaces none of it: this keeps a failure small and names its case, and the watchdog answers everything this does not foresee. With the watchdog alone, a lapse costs a killed file with no case named out of 69, and the 19 focus comparisons alone are 19 chances of it. With this alone, something unforeseen repeats the crash.

Rejected: the watchdog with the rule as a convention — safe, but a failing focus case then reports only that its file died. Rejected: Node's `assert` with a message at each call — a rule to remember, and unproved. Cost: about forty lines of an assertion module with a worse printed diff than Node's, for plain data too, and a guard. Its own failing cases, on rendered elements, run only under the watchdog.
