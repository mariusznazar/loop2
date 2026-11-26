# Handoff — executor of slice 3 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `8bc77a31`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice 3 of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-3/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-3-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
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

## What slice 2 made (commit `8bc77a31`, for your reading; the code is the source)
`ReactButton` has a new kind `value-cell` (class `button value-cell`) that takes a `cell` prop instead of `text`: name and number on one line, a bar under them (a fill with a share and a fill role `positive`, `satiety-fill` or `text-strong`, or a scale the screen draws) and an optional note; a `marks` list adds state classes (alarm, frame) for a screen's stylesheet; `ValueCellParts` is exported so the health cell, which is no button, draws the same parts in `div.value-cell-static`. Its look is in `src/browser/styles.css`. Show it on the kitchen-sink page in each state or the reason a state does not apply (D-45, the styleguide's rule "The kitchen-sink page"), with made-up values; a rule only the page's samples need goes in `src/browser/kitchen-sink/kitchen-sink.css`. Add a sample for each of the five new roles of the table Roles (`satiety-fill`, `chill-zone`, `safe-zone`, `scale-marker`, `warming-frame`) in the table's order, as the page does for the others.


## The plan's section of slice 3, word for word (`plan.md`)

### Slice 3 — The new roles and the button of a cell on the kitchen-sink page

- **Goal:** the kitchen-sink page shows each new role of the table Roles in the table's order, with a
  sample of its kind (`src/browser/kitchen-sink/role-samples.tsx`, its count of roles too), and the
  button of a cell of the body row in each of the seven states or the reason a state does not apply,
  with made-up values and no game state (`src/browser/kitchen-sink/control-samples.tsx`), as D-45 and
  the styleguide's rule "The kitchen-sink page" give; a rule only the page's samples need stands in
  `src/browser/kitchen-sink/kitchen-sink.css`. The page is built and opened with
  `npm run kitchen-sink` and looked at, as `.the-way/task-cycle/change/ui_check.md` gives.
- **Change:** `src/browser/kitchen-sink/role-samples.tsx` ·
  `src/browser/kitchen-sink/control-samples.tsx` · `src/browser/kitchen-sink/kitchen-sink.css`
- **Read:** `src/browser/kitchen-sink/sample-parts.tsx` · `src/browser/kitchen-sink/kitchen-sink.tsx` ·
  `src/browser/view/controls/react-button.tsx` · `src/browser/styles.css` ·
  `foundations/decisions.md:5104-5118` D-45 · `foundations/decisions.md:5087-5103` D-44 ·
  `foundations/decisions.md:4463-4495` D-269 · `foundations/decisions.md:5002-5024` D-39 ·
  `foundations/decisions.md:5025-5041` D-40 ·
  `foundations/invariants.md:518-527` application-build-kitchen-sink ·
  `.the-way/task-cycle/change/ui_check.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npx tsc -p tsconfig.kitchen-sink.json --noEmit` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2

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
