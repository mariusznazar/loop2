# Handoff — executor of slice 2 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `503afd92`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice 2 of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-2/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-2-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
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



## The plan's section of slice 2, word for word (`plan.md`)

### Slice 2 — The shared button of a cell of the body row

- **Goal:** `ReactButton` builds the new kind D-44 names after the *Foundation entries*, the button of
  a cell of the body row: besides what it has, it carries the content of a cell — the name at the left
  and the number at the right on one line, a bar under them, a note under the bar — and says by
  `aria-expanded` whether its explanation stands open; its form is the executor's choice, as the task
  leaves it, within D-265 and D-395 (the button knows no screen: the screen gives the name, number,
  share and role of the fill and the note). `src/browser/styles.css` holds the look of this kind with
  the other shared controls (D-265, D-421): frame in `control-border`, no background of its own and no
  `highlight` under the pointer, the name in `text-strong` under the pointer and when open, the bar
  with its track in `highlight`, twice `--bar-width` thick, and its fill as long as the share the
  screen gives, and in the block `@media (width < 1280px)` the touch target of `--touch-target-min`.
  The same file holds, beside the kind and with a comment saying why, the rule that lets the health
  cell, which is no button, stand in the same parts and hold the button's frame place with no frame
  (*Choices*). `tests/view/shared-controls.test.mjs` holds a case for this kind, written first and
  seen failing: its parts, its classes, `aria-expanded` true and false, a click reaching the screen's
  handler, and its look through the real stylesheet. Nothing else of the button changes.
- **Change:** `src/browser/view/controls/react-button.tsx` · `src/browser/styles.css` ·
  `tests/view/shared-controls.test.mjs`
- **Read:** `.runs/task-cycles/paski-parametrow/task.md:28-35` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:225-241` Settlements to record ·
  `foundations/decisions.md:5087-5103` D-44 · `foundations/decisions.md:5025-5041` D-40 ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:4386-4433` D-265 ·
  `foundations/decisions.md:4759-4773` D-395 · `foundations/decisions.md:5134-5148` D-47 ·
  `foundations/decisions.md:5531-5555` D-396 · `foundations/invariants.md:488-497` browser-view-focus-outline ·
  `src/browser/styles.css:299-651` · `tests/view/shared-controls.test.mjs:1-466` ·
  `tests/view/page-document.mjs` · `tests/view/game-stylesheets.mjs` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — it shapes the extended shared button, which the later slices and the kitchen-sink
  page build on.
- **Risk:** none
- **Checks:** `npm test -- tests/view/shared-controls.test.mjs` (the new case first failing) ·
  `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · D-44 · D-40

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
