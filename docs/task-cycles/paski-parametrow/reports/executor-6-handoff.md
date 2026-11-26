# Handoff — executor of slice 6 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `3107f6f7`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice 6 of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-6/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-6-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
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
- What the earlier slices left you (commits `7308e0bd` entries, `503afd92` roles, `8bc77a31` shared button, `2a0811aa` kitchen-sink, `2cfee2ed` the component, `3107f6f7` the pure functions): read their code as the source; in short —
  - `ReactButton` has the kind `value-cell` (prop `cell`: name, number, bar — a fill with a share and a fill role `positive`, `satiety-fill` or `text-strong`, or a scale the screen draws — and a note; a `marks` list adds state classes for a screen's stylesheet; `ValueCellParts` is exported for the health cell, which is no button, drawn in `div.value-cell-static` with a transparent frame). Its look, with the fills' colours, is in `src/browser/styles.css` (the slice-2 executor put the fill colours there, not in `run-screen.css`, because the kitchen-sink page links only `styles.css`; the plan's *Choices* row said `run-screen.css`; keep them where they are unless a reason appears). It chose the resting roles `text-label` for the name and `text` for the number (D-40 does not name them); there is no rule for the touch target in the `@media (width < 1280px)` block, since the `.button` rule already gives 48 px.
  - `src/browser/view/body-row.ts` has `bodyRowCells(run, map)` (four cells `{ id, name, number, alarm, meter, note, frame }`; `meter` is `{kind:"bar", share}` or for temperature `{kind:"scale", share, zone}`; `frame` is `"warming" | "cooling" | "plain"` for temperature, null for the others), `temperatureZones()` (zones with their shares 45.45 / 36.36 / 18.18 %) and `bodyExplanation(id, map)` (for slice 7). `src/browser/view/body-row-cells.tsx` (`BodyRowCells`, 41 lines) still draws from the old `bodyCells`; you bring it to the new cells.
  - `tests/view/body-row-cells.test.mjs` (310 lines, helpers at its head, lines 1–104) holds the moved cases of the body row; you bring them to the new cells and add yours, and their `decision:` quotation lines are brought to the entries as they now stand.
- Put the alarm state on the cell with a state class through the shared button's `marks` list (and the same on the health cell), so that slice 8's CSS can pulse it; you draw the red number and note, not the pulse.
- The decisions to read whole in addition to the plan's *Read* (current ranges above): D-311 (layout of the screen of a map run), D-42, D-450 (the explanation and the blow marker belong to slices 7 and 8; read it so that the markup you draw leaves them room: the explanation stands right under the four cells, above the backpack).
- Screenshots: take what you need to check the layouts, per `.the-way/task-cycle/change/ui_check.md`; the screenshots for the human are slice 9's; keep none in the repository and none in the record, and remove the working copies you make. Stop every server you start and close the browser.
- Reading rule: read every file and decision your *Read* names, whole; list as unread only what you could not read, with the reason.


## The plan's section of slice 6, word for word (`plan.md`)

### Slice 6 — The cells with their bars, the temperature scale and the outline

- **Goal:** the body row draws each of the four values as the old Loop's cell: the name at the left
  and the number at the right, the bar under them and the note under the bar; temperature, satiety and
  nature energy in the button of a cell (Slice 2), health in the same parts with no frame, holding its
  place; the backpack a line with no bar. The fills stand in their roles (health `positive`, nature
  energy `text-strong`, satiety its own role) on the track `highlight`; the temperature scale has its
  three zones as its track, on `panel`, apart by a narrow gap in the colour of the background, in their
  widths 5:4:2, and the dark marker the height of the bar at the temperature now; below its threshold
  the number stands in `danger`, as do „marznie” and „głoduje”; the frame of the temperature cell is the
  outline Slice 5 gives (the warming role, the chill zone's role, or `control-border`), and the notes and
  the outline show the stopped minute after the end of a map run. The length of a fill changes smoothly,
  at a time the executor chooses and writes with its source in a comment by the rule, and stands at
  once at the first draw and under the system's setting for reduced motion. The rules stand in
  `src/browser/run-screen.css`, in the place of the body row's rules, with their block
  `@media (width < 1280px)`: at a page area 360 px wide nothing scrolls to the side and no text crosses
  its frame, and where four cells with full names do not fit side by side the row breaks into two rows
  of two. Each behaviour has its case written first in `tests/view/body-row-cells.test.mjs`, which
  Slice 4 creates and this slice reads whole, the moved cases brought to the new cells (names and
  numbers apart, their `decision:` quotations brought to the entries as they now stand). Both layouts
  are checked in the running game as `.claude/skills/loop2-play/SKILL.md` gives in "Check the phone
  layout", and the screenshot as `.the-way/task-cycle/change/ui_check.md` gives.
- **Change:** `src/browser/run-screen.css` · `src/browser/view/body-row-cells.tsx` ·
  `tests/view/body-row-cells.test.mjs`
- **Read:** `src/browser/run-screen.css:600-672` ·
  `.runs/task-cycles/paski-parametrow/task.md:26-40` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:154-160` Context ·
  `.runs/task-cycles/paski-parametrow/task.md:172-176` Context ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:7204-7228` D-178 ·
  `foundations/decisions.md:5002-5024` D-39 · `foundations/decisions.md:5025-5041` D-40 ·
  `foundations/decisions.md:5531-5555` D-396 · `foundations/decisions.md:4853-4867` D-421 ·
  `foundations/decisions.md:5500-5514` D-279 ·
  `src/browser/view/body-row.ts` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/styles.css:299-651` · `tests/view/page-document.mjs` · `tests/view/game-stylesheets.mjs` ·
  `.claude/skills/loop2-play/SKILL.md:23-265` Start the game · Operate the game with Playwright CLI ·
  Check the phone layout · `.the-way/task-cycle/change/ui_check.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** strongest — it lays out the row the human compares with the old Loop's (the acceptance
  criterion), in two layouts.
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row-cells.test.mjs` (each new case first failing) ·
  `npm test -- tests/view/world-area.test.mjs` · `npm run typecheck` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 2 · Slice 4 · Slice 5 · D-337 · D-39 · D-40 · D-44

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
