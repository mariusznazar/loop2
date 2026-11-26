# Handoff — executor of slice 7 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `d5dcff73`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice 7 of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-7/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-7-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
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
D-57: foundations/decisions.md:6309-6324
D-58: foundations/decisions.md:6325-6340
D-59: foundations/decisions.md:6341-6354
D-60: foundations/decisions.md:6355-6370
D-387: foundations/decisions.md:6627-6645
D-175: foundations/decisions.md:7139-7163
D-377: foundations/decisions.md:7496-7511
D-136: foundations/decisions.md:5987-6017
D-130: foundations/decisions.md:5780-5807
D-18: foundations/decisions.md:316-341
D-125: foundations/decisions.md:7846-7873
D-133: foundations/decisions.md:5911-5946
D-201: foundations/decisions.md:7463-7482
D-324: foundations/decisions.md:10819-10839
D-334: foundations/decisions.md:10840-10895
D-335: foundations/decisions.md:10896-10928
D-336: foundations/decisions.md:10929-10965
D-368: foundations/decisions.md:11171-11209
D-369: foundations/decisions.md:11210-11232
D-370: foundations/decisions.md:11233-11260
D-371: foundations/decisions.md:11261-11279
D-385: foundations/decisions.md:11280-11298
D-418: foundations/decisions.md:1678-1692
D-419: foundations/decisions.md:1693-1707

  Invariants (`foundations/invariants.md`): `browser-view-token-values` 478, `browser-view-focus-outline` 488, `design-token-contrast` 498, `design-token-sources` 508, `application-build-kitchen-sink` 518 — each to the next `##`.
- Names the entries gave the five new roles: `satiety-fill`, `chill-zone` (also the bluish frame), `safe-zone`, `scale-marker`, `warming-frame` (the amber frame; named so because `outline` is the CSS property kept for keyboard focus, D-47).
- Rulings of the orchestrator that bind you: (1) the task is the human's accepted text, so where it says the agent chooses a value of a role, you choose it and write it with its `Source:` in `src/browser/tokens.css`, naming it in the report so the request can show it for the human's veto; (2) reduced motion and the standing of game time are handled in CSS alone where possible (D-04 lets the view read the reduced-motion setting only for the scene; if your slice cannot do without reading it in TypeScript, return `questions`); (3) a killing blow while game time stands: the marker appears and stands still at its first frame, going on when time goes on; (4) the explanation on a click and the blow marker are the decisions D-450, the rest of the body row D-337.
- The tests the plan leaves failing at the base of this slice: none, save that `python -B .the-way/elements/common/foundation_check.py` prints one line about `design-token-contrast` having a changed sentence while its test is unchanged, which slice 1 resolves.

## Additions of the orchestrator to the slice
- Reading rule: read every file and decision your *Read* names, whole (a changed file whole before you change it); list as unread only what you could not read, with the reason. A report that lists as unread what the handoff names returns for repair. Read D-450 whole too (the decision for the explanation under the cells — its words and its behaviour); the plan's *Read* does not name it. Current ranges: the list above.
- What the earlier slices left you (read their code as the source): `ReactButton` kind `value-cell` (`src/browser/view/controls/react-button.tsx`; `aria-expanded` is a state the button already has); `bodyExplanation(id, map)` in `src/browser/view/body-row.ts` gives the words of the explanation of temperature, satiety and nature energy (null for health); `BodyRowCells` in `src/browser/view/body-row-cells.tsx` (132 lines) draws the four cells, standing in `div.body-cell-pair` wrappers (temperature with satiety, health with nature energy); the state classes are `alarm`, `note-danger`, `frame-warming` and `frame-cooling`; the body row's CSS stands in `src/browser/run-screen.css` at about lines 625–765 (selectors `.body-row`, `.body-cells`, `.body-cell-pair`, `.body-scale*`; find them by selector); the shared look of the cell is in `src/browser/styles.css` (selector `.button.value-cell`, from about line 460).
- The helpers of the test cases stand at the head of `tests/view/body-row-cells.test.mjs`, lines 1–162 (the first case starts at line 163); your new test file `tests/view/body-row-explanation.test.mjs` takes the helpers it needs from there (copy them; do not import from a test file).
- The open explanation is the state of the body row's own component (D-407, D-04); it stands right under the four cells (the explanation's element follows the `.body-cells` element inside `.body-row`), above the backpack, and pushes the backpack down; at most one is open.
- Do not change `body-row.ts` (its unused `bodyCells` and `bodyValues` are a matter for the review).
- Screenshots: check both layouts in the running game as the plan says (touch in the phone layout), per `.the-way/task-cycle/change/ui_check.md`; keep none in the repository or the record; remove your working copies; stop every server you start and close the browser.


## The plan's section of slice 7, word for word (`plan.md`)

### Slice 7 — The explanation of a value under the cells

- **Goal:** a click on the cell of temperature, satiety or nature energy opens its explanation from
  Slice 5, a second click closes it, a click on another cell switches to that cell's explanation, and
  at most one stands open; it stands right under the four cells, above the backpack, and moves down
  what stands under it; the open cell says `aria-expanded` true and has its name in `text-strong`, as
  the cell under the pointer does, its background unchanged. What is open is the state of the body
  row's own component (D-407, D-04). Its rules stand in `src/browser/run-screen.css` with those of the
  body row, in both layouts. Each behaviour has its case written first in the new
  `tests/view/body-row-explanation.test.mjs`, which takes its helpers from the head of
  `tests/view/body-row-cells.test.mjs` (the orchestrator gives that range). The open explanation is
  checked in both layouts in the running game, by touch in the phone layout, as
  `.claude/skills/loop2-play/SKILL.md` gives.
- **Change:** `src/browser/run-screen.css` · `src/browser/view/body-row-cells.tsx` ·
  `tests/view/body-row-explanation.test.mjs`
- **Read:** `src/browser/run-screen.css:600-672` ·
  `.runs/task-cycles/paski-parametrow/task.md:31-35` To do ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:10650-10784` D-311 ·
  `foundations/decisions.md:4774-4790` D-407 · `foundations/decisions.md:5531-5555` D-396 ·
  `foundations/decisions.md:4853-4867` D-421 ·
  `src/browser/view/body-row.ts` · `src/browser/view/controls/react-button.tsx` ·
  `tests/view/page-document.mjs` · `tests/view/game-stylesheets.mjs` ·
  `.claude/skills/loop2-play/SKILL.md:23-265` Start the game · Operate the game with Playwright CLI ·
  Check the phone layout · `.the-way/task-cycle/change/ui_check.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row-explanation.test.mjs` (each new case first failing) ·
  `npm test -- tests/view/body-row-cells.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 5 · Slice 6 · D-337 · D-311 · D-04

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
