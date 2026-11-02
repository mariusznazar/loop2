# Handoff — Slice 14, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 5b61fd02f79f195e7b945be93d5e7fa5d4bbca93. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Read every file and range of your *Read* before you write code, one per call; a read cut short is read again, and your report says what you read. Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-14.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 14 — The coding guidelines of React

- **Goal:** Written as the cycle's author of `the-way-maintain-coding-guidelines`: `guidelines/coding-browser-module.md` describes building in React. The rule „TypeScript i DOM” and its examples stop contradicting row F1. *Files of this kind* names `src/browser/view/account-card.tsx` as the exemplar with D-36, `src/browser/view/status-row.ts` stops being it, `src/browser/view/account-screen.ts` leaves the table, and the new files of the view stand in it. The file gains the rules of hooks and of effects that review keeps (spec decision 5), the two forms of a shared control (spec decision 2), and that a module the kitchen-sink page imports must not reach a `.tsx` file (spec decision 6). `guidelines/coding-content-data.md` gains the row of `src/browser/sim/data/about.ts`. Every rule and row comes from the task, the spec and the entries the foundation step wrote; a meaning none of them settles goes into no file and stands in the report as a question for the human at the blocked draft request.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/coding-content-data.md`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:45-49` To do 16 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:75-85` Decision 2 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:135-141` Decision 5 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:281-281` Foundation entries, guidelines ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/coding/SKILL.md:40-43` ·
  `guidelines/coding.md` · `guidelines/styleguide-browser-view.md` ·
  src/browser/view/account-card.tsx, which Slice 10 writes · rows F1, F3, F17, F19
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 4 · Slice 8 · Slice 10 · F1 · F3 · F17 · F19

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `.the-way/product-guidelines/template.md`
- `.the-way/product-guidelines/coding/template.md`
- `.the-way/product-guidelines/coding/SKILL.md:40-43`
- `guidelines/coding.md`
- `guidelines/styleguide-browser-view.md`
- src/browser/view/account-card.tsx, which Slice 10 writes
- `foundations/decisions.md:39-51` D-03
- `foundations/decisions.md:792-806` D-36
- `foundations/decisions.md:5427-5459` D-265
- `foundations/decisions.md:5488-5516` D-267
- `foundations/environment_facts.md:472-477` react-hook-call-place
- `foundations/environment_facts.md:478-483` react-effect-dependencies
- `foundations/environment_facts.md:484-489` react-effect-cleanup
- `foundations/environment_facts.md:490-495` react-effect-use

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:45-49` To do 16

16. `guidelines/coding-browser-module.md` opisuje budowanie w React przez `maintain-coding-guidelines`:
   - Reguła „TypeScript i DOM” i jej przykłady przestają przeczyć D-03.
   - Tabela *Files of this kind* wskazuje ekran karty jako wzorzec z decyzją D-36, a `src/browser/view/status-row.ts` przestaje nim być.
   - Pliki tej zmiany stoją w tabeli, której dziś brakuje m.in. `account-screen.ts` i `password-reset.ts`.
   - Nowe znaczenie, którego ten dokument nie ustala, cykl proponuje człowiekowi przy zablokowanym szkicu requestu (WAY-172).

### `.runs/task-cycles/logowanie-w-react/spec.md:75-85` Decision 2

### 2. A shared control exists in two forms, one element tree

The card's controls are React components in `src/browser/view/controls/`, beside the DOM functions, drawing the same elements with the same classes and attributes. `styles.css` stays the one place of the look. Other screens keep the DOM functions unchanged. D-44 holds: the screens build on the shared controls of that directory, of which a control now has a form for each kind of screen until its last DOM screen moves.

- `src/browser/view/controls/react-button.tsx`: the button, with the kinds the card needs, plain and selected in its group; `submit`; a waiting text that stands for `setButtonWaiting`; `aria-pressed` and `aria-busy` as the DOM form sets them.
- `src/browser/view/controls/react-text-field.tsx`: the text field and the password field, with a visible label, an error message and the attributes the DOM forms set; the form's warning and note.
- A `.tsx` file cannot share its stem with a `.ts` file beside it: both would compile to one `.js`. Hence the prefix.

A new test, `tests/view/react-controls.test.mjs`, keeps the two forms alike: for each kind and state the card uses, it draws both and compares tag, attributes and text, with ids compared by what they point at and the input's `value` attribute left out (React writes it, it is no part of the look). Measured: the comparison gives „same” for a submit, selected and waiting button; the field's only difference is that `value`.

Rejected: wrapping the DOM functions in a React component (the report's „owinięte elementy”) — one implementation, but fields become uncontrolled, the card's state lives in elements, `setButtonWaiting` runs in effects, and this is what D-36 would then hold up as the exemplar every later screen copies. Rejected: moving the controls to React and mounting them in DOM screens — a React root for each control in 12 modules, a render that is not synchronous under `setButtonWaiting`, and it moves screens this task leaves in DOM. Rejected: a shared function of class names under both forms — it touches the DOM controls for what the comparison test already catches. Cost: the two forms exist until tasks 4, 5, 6 and 13 finish, and a new attribute is written twice; the test fails until both agree.

### `.runs/task-cycles/logowanie-w-react/spec.md:135-141` Decision 5

### 5. No tool guards React's rules: the guideline and review do

`eslint.config.mjs` keeps its rule set (D-29), so `eslint-plugin-react-hooks` does not enter. `guidelines/coding-browser-module.md` gains the rules of hooks and of effects, and review keeps them.

What already reaches a `.tsx` file: `tsc` in strict mode; ESLint with `recommendedTypeChecked`, whose patterns and typed programs already take `.tsx` (measured: it runs on the spike's two `.tsx` files with no change of the configuration and no report); Prettier, whose patterns take `.tsx`; and, from decision 1, a report of React's development build failing a test, which catches a changed order of hooks on any path a case walks.

Rejected: adding the plugin — a human-accepted change of D-29 that this cycle cannot make alone, and the task does not ask for it. Rejected: a check written by the product — D-29 rejects those for the same reason. Cost if wrong: a dependency array left incomplete passes everything and shows as a stale value. Return condition: a defect of React's rules that passed tests and review reopens D-29 for the human. The cycle may name this choice in the request, for the human to overturn.

### `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6

### 6. The kitchen-sink page stands up unchanged and shows what it shows today

Yes, `scripts/kitchen-sink.mjs` needs no change. Measured on the spike: with `RESET_REQUESTED_SENTENCE` in a module without React, the script byte for byte as on the base, the page builds, its compiled modules hold no bare import, and in a real Chromium it opens with all five sections and all ten form samples and no error but a missing favicon.

- `src/browser/kitchen-sink/kitchen-sink.ts` changes one import line; its form samples stay DOM. The page keeps showing every control and every form state D-44 and D-45 name; `tsconfig.kitchen-sink.json` does not change.
- The React forms do not stand on the page: decision 2's test keeps them the same element tree as the DOM samples the page shows, and the look lives in `styles.css`, which the page loads.
- The two buttons of the switch are the button selected in its group, a row the page has. The folded credits are no shared control (D-44 lists six), and the card's layout is no control, so nothing new goes on the page.
- The page's modules hold no React while the script does not bundle: a module it imports must not reach a `.tsx` file. `guidelines/coding-browser-module.md` says so. The first task that needs React on the page changes the script's build step, not its serving lines.

Rejected: bundling the page and drawing the real React forms on it — the page would show the card's real forms, at the price of a changed trust-boundary script, a second bundle and a second form of samples, for nothing the comparison test leaves open. Cost if wrong: a later task that lets a React module into the page's imports finds a blank page when it opens it.

### `.runs/task-cycles/logowanie-w-react/spec.md:281-281` Foundation entries, guidelines

Guidelines, by the routes the task gives: `guidelines/testing.md` by `the-way-maintain-testing-guidelines` (items 15 and 18, and with them the memory limit: the row `browser-view`, the recipe `unit test`, the harness's `assert`, the rule of decision 11 for a throwaway file, and `tests/view/memory-limit.test.mjs` in the recipe `integration test`), `guidelines/coding-browser-module.md` by `the-way-maintain-coding-guidelines` (item 16, with decisions 2, 5 and 6), and there too the row of `about.ts` in `guidelines/coding-content-data.md`.
