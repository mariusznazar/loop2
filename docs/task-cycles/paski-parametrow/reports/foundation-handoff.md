# Handoff — the agent of the plan's *Foundation entries* — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`, or `blocked` where `foundation_step.md` gives that).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`. Slice 1's base, written before this dispatch, is `51667231eafb32db53eaaf662f07e728323aa2ba` (the current HEAD); your commits stand on it and slice 1's range starts at it.
- Your directory for working copies: `.runs/foundation/`.
- You make the plan's *Foundation entries* — the section copied below — and nothing else: no code of the product beyond what the section names (the `decision:` quotation lines of the tests that cite a decision you change, and nothing else of a test), no slice of the plan. The stage is the foundation step: read whole `.the-way/task-cycle/skill/foundation_step.md` and, for each element you write, the `SKILL.md` it names (`.the-way/elements/decisions/skill/SKILL.md`, `.the-way/elements/invariants/skill/SKILL.md`; a glossary, part-map or environment-fact entry only if you find one is needed). The method file for committing and reporting is `.the-way/task-cycle/change/SKILL.md` (read whole; you take none of the rows of its table of variants, your stage is the plan's *Foundation entries*; its sections on the own-work check and the report apply).
- Report path: `.runs/task-cycles/paski-parametrow/reports/foundation-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer; a missing section is not), and holds for each entry one sentence of its meaning in English and one in Polish and the mark `row <n>`, `projected` or `the cycle's`.
- Checks you run (focused only; you never run `npm test` bare, the full gate is the orchestrator's): `python -B .the-way/elements/common/foundation_check.py` (with `--skip-test-citations` only where the plain run reports a citation that the invariant's test of slice 1 will carry, as WAY-321 exempts), `python -B .the-way/instruction-files/check_instructions.py`, and the focused tests that quote the decisions you change when you update their quotation lines (for example `npm test -- tests/view/body-row.test.mjs`). `node_modules` is installed in the worktree. Each check in the report has its command and exit code.
- Frozen task, read whole: `.runs/task-cycles/paski-parametrow/task.md` (the rows of *Settlements to record* are the meanings you write; the wording is yours, WAY-134). Plan: `.runs/task-cycles/paski-parametrow/plan.md` (read the whole plan: it tells what each later slice does with your entries; do not read `cycle.md` or other agents' reports).
- Guideline files, each whole: `guidelines/coding.md`, `guidelines/styleguide-browser-view.md` (you do not change it; slices 1 and 9 do), `guidelines/testing.md` only as far as the quotation lines of tests are concerned, `src/browser/AGENTS.md`.
- Decisions by identifier, each whole (to the next heading): D-337, D-311, D-178, D-39, D-40, D-42, D-04, D-44, and, to write them consistently, D-41, D-43, D-45, D-48, D-125, D-133, D-265, D-395, D-396, D-407, D-421, D-322, D-317, D-57. Invariants: `design-token-contrast` (the one you change), `design-token-sources`, `browser-view-token-values`. The index of the selection the orchestrator wrote is `.runs/task-cycles/paski-parametrow/foundation-index.md` (it is for locating; entries you change are read whole).

## Autonomous rulings of the orchestrator that bind you (each recorded in the cycle's record)
1. `src/browser/AGENTS.md` says that without a human an agent names a missing value instead of choosing one. The task's *To do* 3 and its D-39/D-40 rows say the values of the new roles are chosen by the agent and written with their source in `src/browser/tokens.css`; the task is the human's accepted text, so that is the settlement and slice 1's executor chooses the values. You write the roles by what they mean (D-48), with no value in a decision where the styleguide's rule "Every value with its source" keeps values out of decisions; slice 1 writes the values.
2. If D-337 cannot hold its rows within the limits of `foundation_check.py` (3 sentences and 300 words a paragraph, 600 words in all), the orchestrator's answer, given in advance so that you need not return a question: keep the values of the look in D-39, D-40, D-42 and the styleguide, keep D-337 for what the body row shows and does, and where it still does not fit write a new decision derived from D-337 for the explanation under the cells and the blow marker (marked `the cycle's`, with D-337 pointing to it); name that in the report. Return a question only if that also does not fit.
3. A killing blow while game time stands: the marker appears and stands still at the place it had reached (its first frame), going on when time goes on. State it that way in D-337 (or the derived decision).
4. Keep each sentence of a decision a test quotes beginning as the quotation does (`git grep -n 'decision: D-337 "'` lists them); where a quoted sentence must be reworded, update the quotation in the same commit in each line that cites it and in no other line.

## The plan's *Foundation entries*, word for word (plan.md, section `## Foundation entries`)
## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-337 — changed: new binding sentences for the cells with bars, the temperature scale, the outline, the alarm, the explanations, the blow marker and the motion while game time stands; *Verification*, *Rationale* and *Rejected* rewritten (the rejection of cells with bars and the sentence „a value with no bar is the same number a bar only draws” stop holding) | decision | rows 1, 2, 4, 5, 6, 7, 9, 10, 11; task *Decisions in play* D-337 | Slices 5, 6, 7, 8, 9 |
| D-311 — changed: the sentence of the world: bars under the values, and the open explanation under the cells, above the backpack | decision | rows 1, 2; *Decisions in play* D-311 | Slices 7, 9 |
| D-178 — changed: the cell of nature energy with its name and number apart, a white bar and an explanation on a click | decision | rows 1, 2, 3; *Decisions in play* D-178 | Slices 5, 6, 7 |
| D-39 — changed: `positive` as the fill of the health bar; `warning` still in no bar and the orange fill of satiety in a role of its own; `danger` as the number of health below 35 and as the zone of overheating; the amber outline of the temperature cell in a role of its own (*Choices*) and the bluish outline in the role of the chill zone | decision | rows 3, 5, 7; *Decisions in play* D-39 | Slices 1, 3, 6, 9 |
| D-40 — changed: the track of the bars of satiety, health and nature energy in `highlight`; `text-strong` as the fill of the nature-energy bar; the chill zone and the safe zone in roles of their own and the marker of the scale in a role of its own (*Choices*); the button of a cell of the body row with no `highlight` under the pointer and its name in `text-strong` when open and under the pointer | decision | rows 3, 8, 10; *Decisions in play* D-40 | Slices 1, 2, 3, 6, 9 |
| D-42 — changed: the new pairs — each fill against the track `highlight` at full opacity, each zone of the scale against `panel`, the marker against each zone, the amber and the bluish outline against `panel`, no pair zone–zone; the dim phase of the alarm's pulse exempt from the threshold; the pulse and the blow marker judged by 2.3.1 | decision | rows 3, 5, 6, 8; *Decisions in play* D-42 | Slices 1, 8 |
| design-token-contrast — changed sentence holding the new pairs of D-42; its check is `tests/invariants/test_design_token_contrast.py`, whose pairs Slice 1 writes | invariant | the row of D-42 (rows 3, 5, 8) | Slice 1 |
| D-04 — changed: the browser view draws the body row also from the events the simulation returned, for the blow marker of the health cell; the open explanation is the state of the screen's own component | decision | row 9; *Decisions in play* D-04 | Slices 5, 8 |
| D-44 — changed: the new kind of the shared button, the button of a cell of the body row (*Choices*), in its list of kinds with its look | decision | task *To do* 4; *Decisions in play* D-44 | Slices 2, 3, 6, 7, 9 |

The agent of these entries follows `.the-way/task-cycle/skill/foundation_step.md` and the `SKILL.md`
of each element. Four constraints of the product bind it:

- `python -B .the-way/elements/common/foundation_check.py` holds a decision's binding sentences to at
  most 3 sentences and 300 words in a paragraph and 600 words in all (WAY-05), as an error for a
  changed decision. D-04's second paragraph stands at 299 words and D-42's one paragraph at 3
  sentences, so what these entries add stands in a new paragraph; D-337 takes much and must stay under
  600 words: the values of the look (colours, roles, thickness, times) belong to D-39, D-40 and D-42
  and to the styleguide's rule, not to D-337. Where D-337 still cannot hold its rows within the limits,
  the agent returns that as a question (*Questions* of the planner's report proposes an answer).
- Tests quote binding sentences by `decision: D-<n> "<quotation>"` lines, and the check requires each
  quotation to begin a binding sentence: D-337 is quoted 34 times (`tests/sim/body.test.mjs`,
  `tests/view/body-row.test.mjs`, `tests/view/world-area.test.mjs`), D-311 40 times, D-44 39 times,
  D-04, D-39, D-40 and D-178 a few times each (`git grep -n "decision: D-337 \""` lists them). The
  agent keeps each sentence a test quotes beginning as it does, to the length of the quotation,
  wherever it still holds, and adds the new meaning in sentences of its own; where a quoted sentence
  must be reworded, it updates in the same commit the quotation of each line that cites it and no
  other line of those tests.
- The agent names the five new roles of D-39 and D-40 by what they mean, as D-48 gives — the fill of
  satiety, the chill zone (also the bluish outline), the safe zone, the marker of the scale and the
  warming outline — and the later slices take the names from the entries.
- The invariant's test checks the new pairs only after Slice 1, so the agent runs the check with
  `--skip-test-citations` where the plain run reports a citation, as WAY-321 exempts.

## Working copies — copied word for word from the cycle's skill
An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
