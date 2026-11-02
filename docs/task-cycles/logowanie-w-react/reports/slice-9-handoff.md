# Handoff — Slice 9, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, this slice's base cc1c1e891a4e22aab257096c2421b7d0562a2d6f. Work from its root.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your variant is „a slice, or the retry of a slice”. Boundary: this slice alone; return before any other.

**Addresses.** Frozen task `.runs/task-cycles/logowanie-w-react/task.md`, spec `.runs/task-cycles/logowanie-w-react/spec.md`, plan `.runs/task-cycles/logowanie-w-react/plan.md`, all ignored files. You open neither the whole plan nor the whole task; what binds you stands below.

**Answers of step 4.** Trust boundary: yes, `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` does not change. Irreversible operation: no.

**Fixed for this cycle.** Read every file and range of your *Read* before you write code, one per call; a read cut short is read again, and your report says what you read. Docker Desktop now runs on this machine, so a test that needs a Docker daemon runs. Run no product gate: that run is the orchestrator's. A file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation; `spec.md` decisions 9 to 11 give why, and no comparison on a rendered element runs by Node's `assert`. Commit with explicit paths, in English, in the style `git log` shows; never `git add -A`.

**Report.** Write `.runs/task-cycles/logowanie-w-react/reports/slice-9.md` as your method gives, each check with its command and exit code. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.

## Your section of the plan, word for word

### Slice 9 — The folded credits

- **Goal:** `src/browser/view/credits-section.tsx` draws a native `<details>` with the `<summary>` „Autorzy grafiki”, from `footerCredits()` of `src/browser/view/footer.ts`, so its content is the footer's: the icon's title, author, page, licence and how the file differs from its source; links open in a new tab. No state and no script. `src/browser/view/footer.ts` does not change. `tests/view/icons.test.mjs` and `tests/invariants/test_icon_credits.py` keep their stand-ins for `createFooter` and read the section through `renderToStaticMarkup`, which needs no document; the script `tests/invariants/test_icon_credits.py` writes to a temporary directory reaches `react` and `react-dom/server` from the built copy, not from where the script stands. The check cites the invariant of row F7 and is seen failing once with a credit taken out. This slice stays off jsdom.
- **Change:** `src/browser/view/credits-section.tsx` · `tests/view/icons.test.mjs` · `tests/invariants/test_icon_credits.py`
- **Read:** `.runs/task-cycles/logowanie-w-react/task.md:34-35` To do 7 ·
  `.runs/task-cycles/logowanie-w-react/spec.md:173-173` Decision 7, the credits' test ·
  `.runs/task-cycles/logowanie-w-react/spec.md:183-183` Decision 8, the folded credits ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/footer.ts` · `src/browser/view/credits.ts` ·
  `tests/invariants/loop2_invariant_support.py:175-225` ·
  `foundations/decisions.md:958-972` D-47 · rows F6, F7
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/icons.test.mjs`; `npm test -- tests/invariants/test_icon_credits.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 7 · F6 · F7

## Current ranges

Where a range differs from the plan's, this one holds. The foundation step moved the log after the plan was written.

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/view/footer.ts`
- `src/browser/view/credits.ts`
- `tests/invariants/loop2_invariant_support.py:175-225`
- `foundations/decisions.md:957-971` D-47
- `foundations/decisions.md:639-675` D-27
- `foundations/invariants.md:331-343` icon-credits

## Passages of the task, the spec and the plan your *Read* names, word for word

### `.runs/task-cycles/logowanie-w-react/task.md:34-35` To do 7

7. Zwinięte wzmianki stoją w każdym stanie karty, jedno kliknięcie je otwiera, a ich treść jest ta sama co w stopce: tytuł ikony, autor, strona, licencja i sposób zmiany pliku (D-27, `icon-credits`).
   - Napis na zwiniętej sekcji: „Autorzy grafiki” (pytanie 6).

### `.runs/task-cycles/logowanie-w-react/spec.md:173-173` Decision 7, the credits' test

The credits' test: `tests/view/icons.test.mjs` and `tests/invariants/test_icon_credits.py` keep their stand-ins for `createFooter`, which stays in DOM, and read the card's section through `renderToStaticMarkup`, which needs no document. Measured: the section renders so with `document` undefined, and `createFooter` renders on jsdom, so task 24 can drop either stand-in. The script `test_icon_credits.py` writes to a temporary directory has to reach `react` and `react-dom/server` from the built copy, not from where the script stands.

### `.runs/task-cycles/logowanie-w-react/spec.md:183-183` Decision 8, the folded credits

- **The folded credits** are a native `<details>` with `<summary>` „Autorzy grafiki”: one click, the keyboard, and the one focus rule of D-47, with no state and no script. They stand last in the card in all four states, and stay open or closed across a change of state, since they are not remounted.
