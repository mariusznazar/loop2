# Handoff — executor of slice 4 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `2a0811aa`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice 4 of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-4/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-4-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
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

## A note from the orchestrator on reading
The previous executor on this cycle (slice 3) returned with decisions and guideline files named in its handoff unread, and had to be sent back. Read every file and decision your slice's *Read* names, whole, before you change anything; list in your report only what you really could not read, with the reason.
This slice moves the body row's code and its tests without changing behaviour. The earlier slices have changed `src/browser/styles.css`, `src/browser/view/controls/react-button.tsx` and the kitchen-sink page, none of which you touch.


## The plan's section of slice 4, word for word (`plan.md`)

### Slice 4 — The body row in a component of its own

- **Goal:** the body row — its cells, their notes and the line of the backpack — moves out of
  `WorldArea` into a component of its own in the new file `src/browser/view/body-row-cells.tsx`,
  which `src/browser/view/world-area.tsx` draws in the same place from what it already holds; the
  cases of `tests/view/world-area.test.mjs` that test the body row (lines 563–772 at the base: its
  values, cells, notes and backpack) move to the new `tests/view/body-row-cells.test.mjs` with the
  helpers they need and their assertions unchanged, and the case of the world area's order from the
  top stays where it is. Behaviour does not change: the moved cases pass before and after, and no
  other case changes.
- **Change:** `src/browser/view/world-area.tsx` · `src/browser/view/body-row-cells.tsx` ·
  `tests/view/world-area.test.mjs` · `tests/view/body-row-cells.test.mjs`
- **Read:** `src/browser/view/body-row.ts` · `tests/view/page-document.mjs` ·
  `tests/view/game-stylesheets.mjs` · `foundations/decisions.md:10932-10972` D-337 ·
  `foundations/decisions.md:10650-10784` D-311 · `foundations/decisions.md:4774-4790` D-407 ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/body-row-cells.test.mjs` ·
  `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** none

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
