# Handoff — executor of slice 1 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `7308e0bd`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice 1 of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-1/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-1-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
- Run no full gate (no bare `npm test`): the checks of the slice are focused (`npm test -- <one file>` runs exactly one Node or Python test file). The full gate is the orchestrator's.
- Frozen task: `.runs/task-cycles/paski-parametrow/task.md`; the plan: `.runs/task-cycles/paski-parametrow/plan.md` — read in them the passages the slice's *Read* names; `cycle.md` and the other agents' handoffs and reports are not yours unless named here.
- The foundation entries of the task are already written (commit `7308e0bd`): D-337, the new D-450, D-311, D-178, D-39, D-40, D-42, D-44, D-04 and the invariant `design-token-contrast`; read each entry your slice's *Read* names as it stands now, whole. Current ranges (the plan's line ranges of `foundations/decisions.md` are stale; these hold):
D-4: foundations/decisions.md:59-217
D-337: foundations/decisions.md:10966-11078
D-450: foundations/decisions.md:11299-11355
D-311: foundations/decisions.md:10678-10818
D-178: foundations/decisions.md:7224-7256
D-39: foundations/decisions.md:5012-5038
D-40: foundations/decisions.md:5039-5057
D-41: foundations/decisions.md:5058-5072
D-42: foundations/decisions.md:5073-5089
D-43: foundations/decisions.md:5090-5104
D-44: foundations/decisions.md:5105-5123
D-45: foundations/decisions.md:5124-5138
D-47: foundations/decisions.md:5154-5168
D-48: foundations/decisions.md:5169-5183
D-38: foundations/decisions.md:4997-5011
D-265: foundations/decisions.md:4396-4443
D-395: foundations/decisions.md:4769-4783
D-396: foundations/decisions.md:5551-5571
D-407: foundations/decisions.md:4784-4800
D-421: foundations/decisions.md:4863-4877
D-279: foundations/decisions.md:5520-5550
D-317: foundations/decisions.md:11915-12005
D-322: foundations/decisions.md:12148-12218

  Invariants (`foundations/invariants.md`): `browser-view-token-values` 478, `browser-view-focus-outline` 488, `design-token-contrast` 498, `design-token-sources` 508, `application-build-kitchen-sink` 518 — each to the next `##`.
- Names the entries gave the five new roles: `satiety-fill`, `chill-zone` (also the bluish frame), `safe-zone`, `scale-marker`, `warming-frame` (the amber frame; named so because `outline` is the CSS property kept for keyboard focus, D-47).
- Rulings of the orchestrator that bind you: (1) the task is the human's accepted text, so where it says the agent chooses a value of a role, you choose it and write it with its `Source:` in `src/browser/tokens.css`, naming it in the report so the request can show it for the human's veto; (2) reduced motion and the standing of game time are handled in CSS alone where possible (D-04 lets the view read the reduced-motion setting only for the scene; if your slice cannot do without reading it in TypeScript, return `questions`); (3) a killing blow while game time stands: the marker appears and stands still at its first frame, going on when time goes on; (4) the explanation on a click and the blow marker are the decisions D-450, the rest of the body row D-337.
- The tests the plan leaves failing at the base of this slice: none, save that `python -B .the-way/elements/common/foundation_check.py` prints one line about `design-token-contrast` having a changed sentence while its test is unchanged, which slice 1 resolves.



## The plan's section of slice 1, word for word (`plan.md`)

### Slice 1 — The new roles with their values and pairs

- **Goal:** `src/browser/tokens.css` holds each new role of D-39 and D-40 as written by the
  *Foundation entries* — the fill of satiety, the chill zone, the safe zone, the marker of the scale
  and the warming outline — as `--<role>`, and the opacity of the dim phase of the alarm's pulse,
  40 % (loop's `@keyframes alarm`, task *Context*), as a token named by its use (D-43 counts a
  unitless opacity as a value only a token holds); each value is the executor's choice, as the task's
  *To do* 3 leaves it, among values that keep every pair of the changed D-42 and invariant
  design-token-contrast, and each carries a `Source:` comment that names where it comes from (a
  colour of loop read from its deployed code, or the choice the task leaves to the agent with the
  threshold that bounds it). `tests/invariants/test_design_token_contrast.py` checks every pair of the
  changed invariant — its `PAIRS`, its docstring, its made-up passing values and one flagged made-up
  case for each new kind of pair — written first and seen failing on the missing roles, then passing.
  In `guidelines/styleguide-browser-view.md`, by `.the-way/product-guidelines/styleguide/template.md`
  ("Writing the file"): the table Roles has a row for each new role in the meaning of its decision, and
  the rows of `highlight`, `text-strong`, `positive` and `danger` name their new uses; the rule
  "Contrast of every pair" lists the new pairs and the exemption of the dim phase; where a value's
  source is the choice the task leaves to the agent, the rule "Every value with its source" names that
  kind of source. No value is written into the styleguide.
- **Change:** `src/browser/tokens.css` · `tests/invariants/test_design_token_contrast.py` ·
  `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/paski-parametrow/task.md:26-40` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:166-183` Context ·
  `.runs/task-cycles/paski-parametrow/task.md:225-241` Settlements to record ·
  `foundations/decisions.md:5002-5024` D-39 · `foundations/decisions.md:5025-5041` D-40 ·
  `foundations/decisions.md:5042-5056` D-41 · `foundations/decisions.md:5057-5071` D-42 ·
  `foundations/decisions.md:5072-5086` D-43 · `foundations/decisions.md:5149-5163` D-48 ·
  `foundations/decisions.md:4987-5001` D-38 · `foundations/invariants.md:498-507` design-token-contrast ·
  `foundations/invariants.md:508-517` design-token-sources ·
  `foundations/invariants.md:478-487` browser-view-token-values ·
  `.the-way/product-guidelines/styleguide/template.md:159-190` Pairs and meanings · Writing the file ·
  `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** strongest — it chooses five colours and their sources, which the human judges on the
  side-by-side screenshots, within the thresholds of D-42.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_design_token_contrast.py` (first failing on the
  roles the token file lacks) · `npm test -- tests/invariants/test_design_token_sources.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** D-39 · D-40 · D-42 · design-token-contrast

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
