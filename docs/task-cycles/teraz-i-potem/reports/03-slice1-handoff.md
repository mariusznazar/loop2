# Handoff 03 — slice 1 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: same (Opus): the slice writes binding guideline text against several decisions and has to tell a use of a meaning the log carries from a new meaning.
- Boundary: make slice 1 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/03-slice1-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 1 — The new uses of roles in the styleguide

- **Goal:** `guidelines/styleguide-browser-view.md` names in its table *Roles* each new use of a
  role on the screen of a map run that To do 5 lists: in the bar of a requirement of the solving
  condition in the header the fill of a met requirement, with its name and numbers, in `positive`,
  the fill of a requirement not met in `text`, though it is no text, and the track in `highlight`;
  `warning` for „żadna reguła nie pasuje — postać stanie” in „Potem”; the red of „marznie” and
  „głoduje” and the grey of the notes of the body row. To do 5 gives this step the choice of the
  roles of the red and the grey: take them from meanings the decision log already carries —
  `danger` (D-39: a character may be lost; the source of its value in `src/browser/tokens.css`
  names „marznie” and „głoduje”) and `text-secondary` (D-40: a description, explanation or note) —
  so that no new meaning is written; where a use would need a new or changed meaning, return it to
  the orchestrator as a question instead of writing it. Where a sentence of the rules "Every
  background with its text" or "Contrast of every pair" speaks of the bar over the mage's head as
  the one bar with a track and a fill and the new bar makes it false, bring it along in the same
  wording style. Work as the cycle's author the project skill `the-way-maintain-styleguide` names:
  its section "Where the skill works" and the section "Writing the file" of
  `.the-way/product-guidelines/styleguide/template.md` give what that author writes and from what;
  a step of the skill that leads a matter with the human is answered from the task (To do 5 and the
  answered questions), and a matter the task does not settle returns to the orchestrator as a
  question. Write no value and change no token (`src/browser/AGENTS.md`); the file stays in Polish.
  Nothing else of the file changes.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:27-57` To do ·
  `.runs/task-cycles/teraz-i-potem/task.md:78-92` Questions to settle, Pytanie 5 and Pytanie 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows D-39, D-40, row 5 and row 7 ·
  `foundations/decisions.md:831-845` D-38 · `foundations/decisions.md:846-860` D-39 ·
  `foundations/decisions.md:861-875` D-40 · `foundations/decisions.md:891-905` D-42 ·
  `foundations/decisions.md:906-920` D-43 · `foundations/decisions.md:2525-2546` D-133 ·
  `foundations/decisions.md:3252-3272` D-178 · `foundations/decisions.md:6938-6972` D-320 ·
  `foundations/invariants.md:479-488` design-token-contrast ·
  `foundations/invariants.md:489-498` design-token-sources ·
  `foundations/part_map.md:3-29` browser-view · `foundations/part_map.md:118-134` agent-workflow ·
  `src/browser/tokens.css` · `src/browser/AGENTS.md` ·
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` ·
  `.the-way/product-guidelines/styleguide/SKILL.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/styleguide/template.md`
- **Model:** same — it writes binding guideline text against several decisions and has to tell a
  use of a meaning the log carries from a new meaning, which it returns as a question.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** D-39 · D-40

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-39 | `foundations/decisions.md:846-860` |
| D-40 | `foundations/decisions.md:861-875` |
| D-38 | `foundations/decisions.md:831-845` |
| D-42 | `foundations/decisions.md:891-905` |
| D-43 | `foundations/decisions.md:906-920` |
| D-133 | `foundations/decisions.md:2527-2560` |
| D-178 | `foundations/decisions.md:3266-3287` |
| D-320 | `foundations/decisions.md:6964-6998` |
| D-337 | `foundations/decisions.md:7320-7353` |
| `design-token-contrast` | `foundations/invariants.md:479-488` |
| `design-token-sources` | `foundations/invariants.md:489-498` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.

## Orchestrator's rulings for this slice

- To do 5 says the change goes „przez `the-way-maintain-styleguide`”. In a cycle no human is present: work as the cycle's author that skill names (its section "Where the skill works") and write the file by the section "Writing the file" of `.the-way/product-guidelines/styleguide/template.md`; answer from the task (To do 5 and the answered questions, and D-337 for the notes of the body row); a matter the task does not settle returns to the orchestrator as a question.
- The red and the grey of the body row's notes need no new token value: `--danger` (its source in `src/browser/tokens.css` names „marznie”, „głoduje”) and `--text-secondary` stand there. Write no value and change no token.
