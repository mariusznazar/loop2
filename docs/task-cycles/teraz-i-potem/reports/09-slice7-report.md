# Report 09 — slice 7 (make-change), the clock in the header

**Status:** done

**Base:** `92f6860`. **Commit:** `0727fac` — `feat: :sparkles: put the clock alone in the header of a map run, as Minuta with the pause after it, and take the character's action and the status row out of it`.

## Files changed (added / removed lines)

| File | + / − |
|---|---|
| `src/browser/view/status-row.ts` | 14 / 69 (`statusText` and the words only it used go; `clockText` comes; `pauseLabel`, `discoveryText`, `StatusRowControls` stay) |
| `src/browser/view/run-header.tsx` | the clock element `run-header-clock`, no `positive` variant, no action |
| `src/browser/styles.css` | `.run-header-status` and `.run-header-status.positive` replaced by `.run-header-clock` (Geist Mono, tabular figures, `color: var(--text)`) |
| `tests/view/status-row.test.mjs` | rewritten for `clockText` (running, paused, discovery stop, death, completion) |
| `tests/view/run-header.test.mjs` | order with no action, clock after death and completion, mono face, role `text` |
| `tests/view/run-screen.test.mjs`, `tests/view/end-question.test.mjs`, `tests/view/account-screen.test.mjs` | the class `run-header-clock`; the expectation at account-screen line 4145 is now `"Minuta 0 (pauza)"`, the comment at 3685 follows |

Total of the commit: 216 added, 370 removed, 8 files.

## What was removed from the status row and where its requirement went

The words of the wait, of the causes of death, `creatureAfterZ`, `activityText` and the streak/defeated-attacks progress were removed from `status-row.ts`. Each old case of the status row's wording was rewritten, not dropped:

- the activity cases (exploring, wandering, walking to and gathering each resource, the actions with no target, waiting, the encounter, the streak and the defeated attacks) became one case, "the clock names no activity, resource, creature or streak, whatever the character does" (D-311: the action is not in the header; D-334: it is „Teraz”'s, covered by `tests/view/now-lines.test.mjs`);
- the death cases (cold, hunger, combat; paused; the mage left with no program) became clock cases at the minute of the death with no cause and no „ (pauza)” (D-62, D-334);
- the completion case became a clock at the minute of the completion with no completion text and no „ (pauza)” (D-132);
- the case of the positive class after a completion became the case that the clock is in the role `text` after death and completion (D-311, D-132).

## Checks (command and exit code)

Failing first (their new cases, before the code):

- `npm test -- tests/view/status-row.test.mjs` with `clockText` stubbed to return `""` — exit 1, 8 failed, each on an assertion (`actual: '' expected: 'Minuta 243'` and so on).
- `npm test -- tests/view/run-header.test.mjs` before any change of the header — exit 1, 6 failed. The order case failed on the text (`"Minuta 0 · Eksploruje · Passa 0/480"` where `"Minuta 0"` was expected). The two stylesheet cases failed on a missing element (no `run-header-clock` yet), which is not an assertion failure; after the class was put in with the stub (before the stylesheet rule) the run was exit 1, 5 failed, with the assertions `expected "Minuta 3", got ""` and `expected "var(--font-family-mono)", got "var(--font-family-text)"`.
- The case "the clock is in the role text while running, after a death and after a completion" passed as soon as the class stood, since the clock inherits `text`; it is the guard against a green clock after a completion (a `positive` class or a `positive` rule would make it fail), and it has not been seen failing on the mutation itself (see the own-work check).

Passing after the code:

| Command | Exit |
|---|---|
| `npm test -- tests/view/status-row.test.mjs` | 0 (15 passed) |
| `npm test -- tests/view/run-header.test.mjs` | 0 (14 passed) |
| `npm test -- tests/view/run-screen.test.mjs` | 0 (13 passed) |
| `npm test -- tests/view/end-question.test.mjs` | 0 (17 passed) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (128 passed) |
| `npm test -- tests/view/now-lines.test.mjs` | 0 (9 passed) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 passed) |
| `npm run typecheck` | 0 |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the changed `src` files, `src/browser/styles.css` and `tests/view/*.test.mjs` | 0 (after one `--write` of `run-header.tsx` and `account-screen.test.mjs`, exit 1 before it) |
| `npx eslint --max-warnings 0` on the changed `.ts`, `.tsx` and `.mjs` files | 0 |

Not run: `npm test` with no argument (the cycle's run before the request).

## Own-work check

- **Requirement most likely not met:** the clock after a death and after a completion is in the role `text` and without „ (pauza)” (task item 3, Pytanie 9), and the stop at a discovery shows „ (pauza)” (Pytanie 5, part 3; D-122), since the old status text was green after a completion and the status text of the game state cannot tell a discovery stop from a pause.
- **Checks:** the cases in `status-row.test.mjs` and `run-header.test.mjs` above (the discovery stop is the real first chill, minute 84, from the simulation); and the look in a running browser by `.claude/skills/loop2-play/SKILL.md` (`npm run local`, account made through the login card, Las, mage with an empty program):
  - running: header `Ala · Las · Minuta 5 · Pauza · 1× … 16× · Restart · Zakończ`, the clock in the mono face (screenshot read);
  - paused: `Minuta 14 (pauza)`, button „Wznów” (screenshot read);
  - stop at a discovery: `Minuta 84 (pauza)` with „Wznów” (read as text, no screenshot read), and `Minuta 104 (pauza)` at a second discovery;
  - after the death of cold: `Minuta 243`, buttons `Restart`, `Zakończ` only; computed style of the clock `"Geist Mono", monospace`, `tabular-nums`, colour `rgb(212, 212, 216)`, the same as the colour of the body text (screenshot read; „Teraz” read „Mag zamarzł”).
  The local start was stopped (`npm run local:stop`, "Local starts stopped: 1") and `.playwright-cli/` removed.
- **Not checked in a browser:** the completion of a map (Las „Minuta 480” in `text`) — the mage with an empty program cannot reach it, and the screenshot of the discovery stop was taken but not read. The completion is covered by the jsdom cases only; jsdom does not prove the rendered colour, but the computed colour of the clock in the browser after death shows the clock takes no `positive` rule.
- **Mutation by thought:** a clock that keeps the activity or the cause fails the `"Minuta 0"` / `"Minuta 312"` equalities; one that drops `PAUSED_SUFFIX` fails the paused cases; one that adds the suffix after the end fails the death and completion cases with `paused = true`; removing `font-family`/`font-variant-numeric` from the rule fails the mono case. A `positive` class on the completed clock is caught by the role case (class and colour). A CSS rule `.run-header-clock.positive` alone (with no class set) would not be caught, and it would do nothing.

## Reaches beyond the handoff

- Read `tests/view/page-document.mjs` only through its use in the tests (no change). Read `tests/view/run-screen.test.mjs:157-200` (`firstChill`) to reuse its precondition of the first chill at minute 84 in `status-row.test.mjs` (a file the slice changes; the same game, built there from `newGame`, `createCharacter` and `send`).
- Searched `src`, `tests`, `guidelines`, `foundations` and `.claude` for `statusText`, `run-header-status` and `status-row`: the only users were the files in the slice's *Change*, `discovery-band.tsx` (imports `discoveryText`, unchanged) and a row in `guidelines/coding-browser-module.md:59` for the module's name (the module keeps its name). No file outside the *Change* was edited.

## Searches not found or unclear

- The new name of the clock's function: the handoff gives none, so I chose `clockText` (module `status-row.ts` keeps its name as asked). If the orchestrator wants another name, it is one rename.
- `ACTIONS[kind].status` in `src/browser/sim/data/actions.ts` (the „Zbiera”, „Eksploruje” words) is no longer read by any view code after this slice (`status-row.ts` was its only reader in `src/browser`); it stands in the data of the simulation, which the slice does not name, so I left it. Also the comment of `tests/view/status-row.test.mjs` for `discoveryText` ("the line under the status row") is the old wording of a requirement of task odkrywanie, left as it stood.
- Foundation entries D-311 and D-122 describe the clock as slice 7 writes it; slice 8 will put the bar after the clock, and `.run-header-clock` keeps `margin-right: auto` so the buttons stay at the right edge as today; slice 8 may need to move that margin to the bar.

## Choices

- `clockText(run, paused)` keeps the signature of the old `statusText`; the clock after the end reads `run.death.minute` / `run.completion.minute` as the old text did. Rejected: a new signature taking the whole state (nothing needs it). Cost if wrong: one signature change.
- `color: var(--text)` is set on the clock rule, so the role is explicit and testable in jsdom. Rejected: leaving it to inheritance. Cost if wrong: one declaration.
- One commit for the code and its tests, since the slice is one change of one behaviour.

## Problems observed

none
