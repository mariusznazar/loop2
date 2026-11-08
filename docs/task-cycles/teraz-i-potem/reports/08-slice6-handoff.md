# Handoff 08 — slice 6 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 6 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/08-slice6-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 6 — A click on „Teraz” or „Potem” scrolls the program to its rule

- **Goal:** A row of „Teraz” or „Potem” that names a rule — „Teraz” of a rule's action, „Potem” with
  a winner — is a control: the keyboard reaches it, and a click, Enter or Space on it scrolls the
  program once so that the row of its rule stands in the middle of the window, or, where its rule
  group is folded (D-295), the header of that group; afterwards the program does not follow the rule.
  A row that names no rule — the wait, „Walczy z wilkiem”, a death, a completion, no winner — is no
  control and scrolls nothing. Build the control as the rule list builds its rows in
  `src/browser/view/rule-list.tsx`: an element with `tabIndex={0}`, a click handler and a key handler
  for Enter and Space; not a `<button>` of its own, which D-44 rules out, and not the shared button,
  whose frame and disabled look the rows must not take. Its focus shows by the one `:focus-visible`
  rule with nothing added (D-47); under the pointer it stands on `highlight`, as a control under the
  pointer does (D-40). `src/browser/view/run-screen.tsx` hands the world area a handler that asks the
  program panel; `src/browser/view/program-panel.tsx` gains a method for it on `ProgramPanel`, added
  to `RunScreenPanel`, which scrolls the row of the rule found by its `data-rule`, else the header
  of its folded group found by its `data-group`, only while the panel shows the copy of the map run,
  and does nothing while it shows a saved program. The scroll runs from the event handler, never from
  an effect (D-267). Write the failing cases first in `tests/view/run-screen.test.mjs`, on the real
  program panel: a click and Enter on „Teraz” and on „Potem” scroll the row of their rule with the
  block in the centre; a rule of a folded group scrolls its group's header; a row that names no rule
  is not reachable by the keyboard and asks for nothing. jsdom has no `scrollIntoView`, so a case
  gives the elements one that records the element and its options — a stand-in for the browser's
  API, not for the code under test; the real scroll is checked in a running browser as
  `.claude/skills/loop2-play/SKILL.md` gives (D-88).
- **Change:** `src/browser/view/now-rows.tsx` · `src/browser/view/world-area.tsx` ·
  `src/browser/view/run-screen.tsx` · `src/browser/view/program-panel.tsx` · `src/browser/styles.css` ·
  `tests/view/run-screen.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:29-37` To do, item 1 ·
  `.runs/task-cycles/teraz-i-potem/task.md:73-77` Questions to settle, Pytanie 3 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries row 3 and rule-state-from-pick · `foundations/decisions.md:861-875` D-40 ·
  `foundations/decisions.md:891-905` D-42 · `foundations/decisions.md:921-935` D-44 ·
  `foundations/decisions.md:966-980` D-47 · `foundations/decisions.md:1615-1627` D-88 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5523-5596` D-267,
  D-268 · `foundations/decisions.md:5998-6023` D-282 · `foundations/decisions.md:6320-6336` D-295 ·
  `foundations/decisions.md:6673-6708` D-311 · `foundations/invariants.md:35-44`
  browser-view-framework · `foundations/invariants.md:459-478` browser-view-token-values,
  browser-view-focus-outline · `foundations/glossary.md:53-64` program rule, rule group ·
  `foundations/glossary.md:174-179` copy · `foundations/part_map.md:3-29` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/rule-list.tsx` · `src/browser/view/game-view.ts:255-270` the program panels ·
  `src/browser/view/game-view.ts:410-430` the run screen · `tests/view/page-document.mjs` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-screen.test.mjs` (its new cases failing first) ·
  `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` · `npm run typecheck` · the scroll
  and the focus in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 5 · row 3

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-40 | `foundations/decisions.md:861-875` |
| D-42 | `foundations/decisions.md:891-905` |
| D-44 | `foundations/decisions.md:921-935` |
| D-47 | `foundations/decisions.md:966-980` |
| D-88 | `foundations/decisions.md:1615-1627` |
| D-264 | `foundations/decisions.md:5436-5467` |
| D-265 | `foundations/decisions.md:5468-5509` |
| D-267 | `foundations/decisions.md:5538-5566` |
| D-268 | `foundations/decisions.md:5567-5611` |
| D-282 | `foundations/decisions.md:6015-6040` |
| D-295 | `foundations/decisions.md:6337-6353` |
| D-311 | `foundations/decisions.md:6690-6734` |
| D-336 | `foundations/decisions.md:7294-7319` |
| `browser-view-framework` | `foundations/invariants.md:35-44` |
| `browser-view-token-values` | `foundations/invariants.md:459-468` |
| `browser-view-focus-outline` | `foundations/invariants.md:469-478` |
| `rule-state-from-pick` | `foundations/invariants.md:1219-1228` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.

## Orchestrator's notes for this slice

- Slice 5 (commit `46e0ed9`) built `src/browser/view/now-lines.ts` and `src/browser/view/now-rows.tsx` and placed the rows in `world-area.tsx`; it draws from `nowAndNext(state)` of `src/browser/sim/game.ts`.
- Slice 5's executor reports that the rows have `overflow: hidden` so that a long text is cut; that would clip the focus outline of the control you make. Keep the cut of a long text and make the focus outline visible whole (D-42, 2.4.7; D-47), and check it in the running browser.
- The rule for building the control is settled (the plan's *Choices*, accepted by the orchestrator): as the rows of `rule-list.tsx` (`tabIndex={0}`, click and Enter/Space handlers), not a `<button>` of its own, not the shared button.
- For the look in a running browser, follow `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md` when your method names it; stop the local start you began when you are done (`npm run local:stop`).
