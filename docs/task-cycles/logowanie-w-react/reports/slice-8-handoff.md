# Handoff — Slice 8, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 50461c1025f8ad334b2dffc7944b9850cb6500c5. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-8.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 8 — The controls in React and the test that keeps them alike

- **Goal:** `src/browser/view/controls/react-button.tsx` holds the button with the kinds the card needs, plain and selected in its group, `submit`, a waiting text that stands for `setButtonWaiting`, and `aria-pressed` and `aria-busy` as the DOM form sets them. `src/browser/view/controls/react-text-field.tsx` holds the text field and the password field with a visible label, an error message and the attributes the DOM forms set, and the form's warning and note. Each draws the same elements with the same classes and attributes as its DOM form; `src/browser/styles.css` stays the one place of the look, and `src/browser/view/controls/button.ts` and `src/browser/view/controls/text-field.ts` do not change. No React form of the destructive button, the select list or the number field comes. `tests/view/react-controls.test.mjs`, written first, draws both forms for each kind and state the card uses and compares tag, attributes and text, ids compared by what they point at and the input's `value` attribute left out; a difference put in for a moment is seen failing. `literal_texts` of `tests/invariants/test_browser_view_token_values.py` reads the `/` of a JSX closing tag such as `</p>` as the start of a regex, since `<` is in `REGEX_AFTER`, and skips the rest of that line, so a colour later on the line goes unread: it comes to read such a line, with a control seen failing without the change, the rest of that reader unchanged. Safety rule of this cycle: a failing comparison on a rendered element can take down the human's machine (spec decisions 1, 9, 11). The test imports the harness first and takes `assert` from it, and compares strings and plain data, never elements in a `deepEqual`; a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation.
- **Change:** `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` · `tests/view/react-controls.test.mjs` · `tests/invariants/test_browser_view_token_values.py`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:157-157` Questions carried to cycle ·
  `.runs/task-cycles/logowanie-w-react/spec.md:63-73` Decision 1, the harness ·
  `.runs/task-cycles/logowanie-w-react/spec.md:75-85` Decision 2 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/text-field.ts` ·
  tests/view/page-document.mjs, which Slice 5 writes ·
  `foundations/decisions.md:883-927` D-42, D-43, D-44 · `foundations/decisions.md:958-972` D-47 ·
  `foundations/invariants.md:468-477` browser-view-focus-outline · rows F1, F17
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/react-controls.test.mjs`, written first and seen failing; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/view/memory-limit.test.mjs`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 5 · Slice 7 · F17

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/view/controls/button.ts`
- `src/browser/view/controls/text-field.ts`
- tests/view/page-document.mjs, which Slice 5 writes
- `foundations/decisions.md:882-896` D-42
- `foundations/decisions.md:897-911` D-43
- `foundations/decisions.md:912-926` D-44
- `foundations/decisions.md:957-971` D-47
- `foundations/invariants.md:469-478` browser-view-focus-outline
- `foundations/decisions.md:39-51` D-03
- `foundations/decisions.md:5427-5459` D-265

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:157-157` Questions carried to cycle

- Jak wspólne kontrolki z `src/browser/view/controls/` istnieją w ekranie React, skoro pozostałe ekrany dalej używają ich w DOM (raport technologii: „W bibliotece stają się jej komponentami albo zostają jako owinięte elementy”), i co z tego widać na stronie wszystkich stanów?

### `.runs/task-cycles/logowanie-w-react/spec.md:63-73` Decision 1, the harness

The harness is one new module, `tests/view/page-document.mjs` (no `.test.mjs`, so `node-test-selection` is untouched). It does what the trial showed to be needed:

- **It stands before React.** The test file imports it first, so that `window` exists when `react-dom` loads. Measured: with `window` installed after `react-dom`, a controlled field's `onChange` never fires; installed before, it does. Nothing fails loudly.
- **A fresh window per case**, as `onPage` gives a fresh document now, so a game left undisposed cannot answer another case's `visibilitychange`.
- **A control that becomes disabled loses focus.** Neither imitation does this and neither lets `blur()` do it; the model did. Measured: with the code that returns focus removed, the case still passes without this rule, and fails with it. It is kept as a rule of the harness, which watches `disabled` and moves focus to an element outside `body`.
- **No comparison on an element reaches Node's failure message.** A failing `assert.equal` on two rendered elements grew by about 2 GB/s at the end of another session's measurement on this machine, and that session names this spec's own trial, which ran such a comparison, the most likely cause of the low-memory errors of 12:52 to 13:00 that took down agent sessions. `--max-old-space-size=2048` did not stop the growth, and `timeout` stops it too late: 60 s at that rate is over 100 GB against a commit limit of 59.8 GB. Tests on jsdom therefore run under a watchdog that kills their process above a set memory limit (decision 9), and they take `assert` from this harness (decision 10). Node builds the message itself, by `inspect` with `depth: 1000`, `customInspect: false` and `getters: true`, before anything is thrown, so a `util.inspect.custom` on an element cannot shorten it. Why a rendered element explodes and a plain one does not was read without running a failing comparison: a plain jsdom element has no own enumerable key, so `inspect` stops at once, and a rendered one has five, among them `__reactFiber$…`, through which a walk following what `inspect` follows met 1,000,000 paths, the walk's budget, over only 253 distinct objects. `inspect` remembers only the current path (`ctx.seen`), so it writes an object out again for each path that reaches it, and its one brake, `ctx.budget`, counts per level of indentation. One failing comparison on a rendered element was then run once, under two caps: it confirms that the thread of decision 9 stops the growth, and it does not confirm this reading of why the memory grows.
- **React's work is awaited through `act`**, so `settle` wraps it; the flag `IS_REACT_ACT_ENVIRONMENT` stands in the harness; a mount that happens outside `act` is wrapped too, the only warning the trial met.
- **Typing goes through the input's native value setter and a bubbling `input` event**, the way React sees a change.
- **A report of React's development build through `console.error` fails the case.** Tests run React's development build, which reports hooks called in another order, missing keys and a field that changes from controlled to uncontrolled. Lines the product writes itself (`saved-game-load …`) are told apart.

What jsdom does not prove stays with a person and an agent: pressing Enter in a field does not send a form, a click on a label does not move focus, and nothing computes layout. Measured for Enter and the label on both imitations.

### `.runs/task-cycles/logowanie-w-react/spec.md:75-85` Decision 2

### 2. A shared control exists in two forms, one element tree

The card's controls are React components in `src/browser/view/controls/`, beside the DOM functions, drawing the same elements with the same classes and attributes. `styles.css` stays the one place of the look. Other screens keep the DOM functions unchanged. D-44 holds: the screens build on the shared controls of that directory, of which a control now has a form for each kind of screen until its last DOM screen moves.

- `src/browser/view/controls/react-button.tsx`: the button, with the kinds the card needs, plain and selected in its group; `submit`; a waiting text that stands for `setButtonWaiting`; `aria-pressed` and `aria-busy` as the DOM form sets them.
- `src/browser/view/controls/react-text-field.tsx`: the text field and the password field, with a visible label, an error message and the attributes the DOM forms set; the form's warning and note.
- A `.tsx` file cannot share its stem with a `.ts` file beside it: both would compile to one `.js`. Hence the prefix.

A new test, `tests/view/react-controls.test.mjs`, keeps the two forms alike: for each kind and state the card uses, it draws both and compares tag, attributes and text, with ids compared by what they point at and the input's `value` attribute left out (React writes it, it is no part of the look). Measured: the comparison gives „same” for a submit, selected and waiting button; the field's only difference is that `value`.

Rejected: wrapping the DOM functions in a React component (the report's „owinięte elementy”) — one implementation, but fields become uncontrolled, the card's state lives in elements, `setButtonWaiting` runs in effects, and this is what D-36 would then hold up as the exemplar every later screen copies. Rejected: moving the controls to React and mounting them in DOM screens — a React root for each control in 12 modules, a render that is not synchronous under `setButtonWaiting`, and it moves screens this task leaves in DOM. Rejected: a shared function of class names under both forms — it touches the DOM controls for what the comparison test already catches. Cost: the two forms exist until tasks 4, 5, 6 and 13 finish, and a new attribute is written twice; the test fails until both agree.

### `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6

### 6. The kitchen-sink page stands up unchanged and shows what it shows today

Yes, `scripts/kitchen-sink.mjs` needs no change. Measured on the spike: with `RESET_REQUESTED_SENTENCE` in a module without React, the script byte for byte as on the base, the page builds, its compiled modules hold no bare import, and in a real Chromium it opens with all five sections and all ten form samples and no error but a missing favicon.

- `src/browser/kitchen-sink/kitchen-sink.ts` changes one import line; its form samples stay DOM. The page keeps showing every control and every form state D-44 and D-45 name; `tsconfig.kitchen-sink.json` does not change.
- The React forms do not stand on the page: decision 2's test keeps them the same element tree as the DOM samples the page shows, and the look lives in `styles.css`, which the page loads.
- The two buttons of the switch are the button selected in its group, a row the page has. The folded credits are no shared control (D-44 lists six), and the card's layout is no control, so nothing new goes on the page.
- The page's modules hold no React while the script does not bundle: a module it imports must not reach a `.tsx` file. `guidelines/coding-browser-module.md` says so. The first task that needs React on the page changes the script's build step, not its serving lines.

Rejected: bundling the page and drawing the real React forms on it — the page would show the card's real forms, at the price of a changed trust-boundary script, a second bundle and a second form of samples, for nothing the comparison test leaves open. Cost if wrong: a later task that lets a React module into the page's imports finds a blank page when it opens it.
