# Handoff — Slice 4, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base 9df8f0233eea1d5e430811999eedba9ddc661a90. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-4.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 4 — The game's sentence and the account rules without DOM

- **Goal:** `src/browser/sim/data/about.ts`, a file of kind `content-data` that imports nothing, holds the game's name „Loop” and its one sentence, „Napisz postaci program i sprawdź, jak długo przeżyje bez ciebie.”, and the header of `src/browser/view/app.ts` reads the name from it. `src/browser/view/account-rules.ts`, without React or DOM, holds `addressProblem`, `passwordProblems`, `registrationProblems`, `RegistrationField` and `RESET_REQUESTED_SENTENCE`, moved unchanged out of `src/browser/view/account-screen.ts`. `src/browser/view/account-screen.ts`, `src/browser/view/password-reset.ts`, `src/browser/kitchen-sink/kitchen-sink.ts` (one import line) and the imports of `tests/view/account-screen.test.mjs` take them from there. Nothing a player sees changes and no expected value of a test changes. The kitchen-sink page keeps building with `scripts/kitchen-sink.mjs` byte for byte as it is.
- **Change:** `src/browser/sim/data/about.ts` · `src/browser/view/account-rules.ts` · `src/browser/view/account-screen.ts` · `src/browser/view/password-reset.ts` · `src/browser/view/app.ts` · `src/browser/kitchen-sink/kitchen-sink.ts` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:18-20` To do 1 ·
  `.runs/task-cycles/logowanie-w-react/task.md:91-95` Pytanie 5 ·
  `.runs/task-cycles/logowanie-w-react/task.md:138-140` Context ·
  `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:154-171` Decision 7, The units of the change ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/data/resources.ts` ·
  `foundations/decisions.md:57-118` D-04 · `foundations/decisions.md:388-406` D-18 ·
  `foundations/decisions.md:928-942` D-45 ·
  `foundations/invariants.md:214-225` simulation-isolation · `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:498-507` application-build-kitchen-sink ·
  `foundations/part_map.md:3-59` browser-view, simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/view/password-reset.test.mjs`; `npm test -- tests/invariants/test_simulation_isolation.py`; `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm run kitchen-sink -- --build-only`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/coding-content-data.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/sim/data/resources.ts`
- `foundations/decisions.md:52-113` D-04
- `foundations/decisions.md:383-401` D-18
- `foundations/decisions.md:927-941` D-45
- `foundations/invariants.md:214-225` simulation-isolation
- `foundations/invariants.md:236-247` content-identifiers
- `foundations/invariants.md:499-508` application-build-kitchen-sink
- `foundations/part_map.md:3-27` browser-view
- `foundations/part_map.md:28-59` simulation

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:18-20` To do 1

1. Niezalogowany gość widzi jedną kartę: nazwę gry, jedno zdanie o grze, przełącznik „Zaloguj się” i „Załóż konto”, formularz wybranego stanu i zwinięte wzmianki (D-96).
   - Zdanie brzmi: „Napisz postaci program i sprawdź, jak długo przeżyje bez ciebie.” (pytanie 5).
   - Zdanie stoi w danych gry w `src/browser/sim/data/`, a widok je stamtąd czyta (D-96, D-18).

### `.runs/task-cycles/logowanie-w-react/task.md:91-95` Pytanie 5

- Pytanie 5. Jak brzmi jedno zdanie o grze?
  - Answer: „Napisz postaci program i sprawdź, jak długo przeżyje bez ciebie.”
  - Not chosen:
    - „Napisz postaci program. Niech przeżyje bez ciebie.” — dwa zdania wbrew „one sentence” w D-96
  - Source: human, 2026-11-01, „zgadzam się na komplet rekomendacji”, pozycja 11 pakietu.

### `.runs/task-cycles/logowanie-w-react/task.md:138-140` Context

- Nazwa gry to dziś „Loop” (`src/browser/view/app.ts:101`).
- Strona wszystkich stanów ładuje moduły bez składania (`scripts/kitchen-sink.mjs:21`) i bierze z `account-screen.js` jedną stałą, `RESET_REQUESTED_SENTENCE` (`src/browser/kitchen-sink/kitchen-sink.ts:22`).
- Przeniesienie tej stałej do modułu bez Reacta może zostawić `scripts/kitchen-sink.mjs` bez zmian; tego nikt nie uruchomił.

### `.runs/task-cycles/logowanie-w-react/spec.md:143-152` Decision 6

### 6. The kitchen-sink page stands up unchanged and shows what it shows today

Yes, `scripts/kitchen-sink.mjs` needs no change. Measured on the spike: with `RESET_REQUESTED_SENTENCE` in a module without React, the script byte for byte as on the base, the page builds, its compiled modules hold no bare import, and in a real Chromium it opens with all five sections and all ten form samples and no error but a missing favicon.

- `src/browser/kitchen-sink/kitchen-sink.ts` changes one import line; its form samples stay DOM. The page keeps showing every control and every form state D-44 and D-45 name; `tsconfig.kitchen-sink.json` does not change.
- The React forms do not stand on the page: decision 2's test keeps them the same element tree as the DOM samples the page shows, and the look lives in `styles.css`, which the page loads.
- The two buttons of the switch are the button selected in its group, a row the page has. The folded credits are no shared control (D-44 lists six), and the card's layout is no control, so nothing new goes on the page.
- The page's modules hold no React while the script does not bundle: a module it imports must not reach a `.tsx` file. `guidelines/coding-browser-module.md` says so. The first task that needs React on the page changes the script's build step, not its serving lines.

Rejected: bundling the page and drawing the real React forms on it — the page would show the card's real forms, at the price of a changed trust-boundary script, a second bundle and a second form of samples, for nothing the comparison test leaves open. Cost if wrong: a later task that lets a React module into the page's imports finds a blank page when it opens it.

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
