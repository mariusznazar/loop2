# Handoff 01 — spec designer

## Delegation

Mariusz requested this the-way task cycle (`/the-way-implement-task`) and delegated intermediate
choices to the orchestrator. You are the spec designer. Questions go to the orchestrator, never to
the human. The orchestrator's answers are provisional, never the human's approval.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2` (branch `task/styleguide-loop2`, base
  `00e53aee5bd21692ddd3b2f7c7541625a3114a3f`). Read code there. Write nothing but the spec and your
  report; make no commit.
- Pinned the-way: `.the-way` in that worktree, commit `f0b2130`. The project skill
  `the-way-write-spec` is your method: read `.the-way/task-cycle/spec/` (the skill and every file it
  names) whole and follow it as the designer. Where it names another the-way skill, it is this
  product's project skill with the `the-way-` prefix.
- Read the product's `AGENTS.md` and the guidelines `.the-way/product-guidelines/reading.md` selects
  for the parts the spec touches.

## Stage and boundary

Write the spec of the open design choices below, then return. No plan, no code, no foundation entry.

## Inputs

- Frozen task: `.runs/task-cycles/styleguide-loop2/task.md` in the worktree (source:
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\styleguide_loop2.md`, accepted
  2026-10-23). Its *Questions to settle* Q1–Q22, *Context*, *Decisions in play* and *Settlements to
  record* bind; never widen the task.
- Cycle record: `.runs/task-cycles/styleguide-loop2/cycle.md`, section "Reconciliation with changed
  sources" (the pin moved `34dec85` → `f0b2130` and `main` moved `00815e1` → `00e53ae` since the task
  was accepted; effect recorded there).
- Open design choices (the task's *Questions carried to cycle*):
  1. Where the file of appearance values (design tokens) and the stylesheet stand and what form they
     take — roles, names and kinds are settled (Q18); no value stands outside that file (Q15); every
     value carries its source beside it (To do 2, row 14); the invariant tests read the token file and
     search file text, without parsing code or computing the cascade (To do 8, Q22). Today all styles
     stand in a `<style>` block in `src/browser/index.html`.
  2. Where the font files come from: npm package `geist` (new dependency under D-33's audit) or files
     from https://github.com/vercel/geist-font kept in the repository (then `Dockerfile` and
     `.dockerignore` of part `deployment` must pass them into the image, as they pass `assets/icons/`
     only today). Licence: SIL OFL 1.1 (Q11, row 19).
  3. Where the kitchen-sink page's sources stand — outside what `tsconfig.browser.json` compiles — and
     how its own command builds and opens it locally, away from `dist/public/` (Q13, row 8, row 15).
- Answers of step 4 (cycle start): trust boundary — yes: `assets/icons/**` (icon recolouring), the new
  font directory (files from outside; To do 9 gives it a trust boundary at `browser-view`), and
  `package-lock.json` if the npm route is chosen. Irreversible operation — no.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x` (Mariusz's prohibition, binding on every agent of this cycle).
- Do not read or reuse the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`: an earlier cycle of this task, made before the task was refined
  again (Q20–Q22). This cycle starts fresh.
- Do not read the repository of the game loop; appearance values come only from Q9–Q11. The ignored
  reports under `C:\Storage\repos\loop2\.runs\styleguide\browser-view\` may be read for context; they
  are no source of values.
- Write in English (spec), as the product's code and foundation are.

## Output

- Spec: `.runs/task-cycles/styleguide-loop2/spec.md` in the worktree.
- Full report: `.runs/task-cycles/styleguide-loop2/reports/01-spec-report.md`.
- Return to the orchestrator: status `questions` or `done`, the paths, a one-line check result (what
  you ran with command and exit code, or that you ran nothing), and every question or concern the next
  dispatch depends on.
