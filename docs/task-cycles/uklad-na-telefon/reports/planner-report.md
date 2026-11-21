questions

# Planner report — uklad-na-telefon

- Plan: `.runs/task-cycles/uklad-na-telefon/plan.md` — 12 foundation entries, 20 slices.
- Size report: `.runs/task-cycles/uklad-na-telefon/plan-size.md` — every slice `fits`; the largest are Slice 13 (149,026 estimated tokens, against the limit of 150,000), Slice 4 (135,373), Slice 3 (137,479), Slice 5 (133,572) and Slice 14 (133,094).
- Check result: `python -B .the-way/task-cycle/slice_size.py` exit 0, all 20 slices fit; no product check was run by the planner (no code, no test, no foundation entry written).
- Status `questions`: Slices 1 and 7 need the value of the touch-target minimum (question 1); every other part of the plan stands without it.

## Questions

1. **The value of the touch-target minimum, and whether the task settles its source.** Item 9 asks for "the smallest touch-target size, taken from a source the cycle cites at that value". The task's *Context* (task.md line 94) says Apple's and Material's guidance give different values, and question 7 rejected 24 px from WCAG 2.5.8. `src/browser/AGENTS.md` says that a value the token file does not hold yet enters "only with their source settled with the human … without a human, name the missing or changed value in your report instead of choosing one".
   - **What the player sees.** With 48 px, every button, pick cell, arrow and row of a rule in the phone layout is at least 48 px high, about twice today's height of about 25 px. The editor at 360 px gets longer, and a tap rarely lands on the wrong neighbour. With 44 px, everything is a little shorter and the margin for a mistaken tap is smaller.
   - **Proposed answer:** 48 px, from Android's accessibility guidance ("touch targets at least 48 × 48 dp"). D-396 names Chrome on a phone with Android as the one phone platform, and the phone is the author's. The alternative is 44 px, from Apple's Human Interface Guidelines (44 × 44 pt) or WCAG 2.5.5 Target Size (Enhanced) (44 × 44 CSS px).
   - **Proposed reading of `src/browser/AGENTS.md`.** The human did settle the source here: item 9 hands the choice of a cited source to the cycle. Slice 1 writes the fact of the source with its quotation, marked `the cycle's`, and the request puts it before the human. If you read it as not settled, Slice 1 returns blocked to a draft request.
   - **If we do nothing:** Slices 1 and 7 cannot start. The other slices only need the token to exist, which Slice 7 makes.

## Concerns

- **Tests quote decisions, and three rows make quoted sentences false.** The foundation check matches each `decision: D-<n> "…"` line of a test against the opening of a binding sentence of that decision (`.the-way/elements/common/foundation_check.py`, lines 75–84 and 905–917). Three rows make the quoted text false:
  - row 2 (D-288 "Rules move by a handle … with no arrows in the header of a rule group"): 27 lines, in `tests/view/rule-editor.test.mjs` and `tests/view/program-editor.test.mjs`;
  - row 3 (D-19 "…its only interaction is hovering…"): 12 lines, in `tile-list.test.mjs`, `world-area.test.mjs` and `run-screen.test.mjs`;
  - row 1 (D-349 "The scene has one size…"): 2 lines, in `world-area.test.mjs` and `scene-picture.test.mjs`.
  
  Updating them in the slices that make the code would push those slices far over the size limit. The test files are large, and every test file under `tests/view/` brings the styleguide (103 kB) and `guidelines/testing.md` (84 kB) into the reading. So Slice 2 rewrites the decisions, and Slices 3–5 come right after it to update the citations. The foundation check therefore stands red from Slice 2 to Slice 5, and Slice 2's *Checks* names the expected errors. Every other rewrite (Slices 1 and 2) has to keep each quoted opening. The foundation check of Slice 1 proves that.
- **Slice 13 sits at 149,026 of 150,000 estimated tokens.** Its agent should read no more than its *Read*.
- **Functions close to the 200-line threshold of D-425.** None of the touched functions or files is over a threshold at the base. These are close:
  - `ProgramPanelView` has 194 lines, `Scene` 184, `RuleListView` 179 and `RunHead` 137;
  - `src/browser/view/program-panel.tsx` has 724 of 800 lines.
  
  Slices 12–15 must stay under the thresholds. Each runs `tests/quality/test_function_and_file_size.py`.
- **The phone layout gets no permanent test.** jsdom applies no `@media (width < 1280px)` rule. This is my reading of jsdom; I did not test it. A later task can break the phone layout without any test failing. Only the browser checks (D-87, D-88, D-417) and the screenshots of Slice 20 see it. Slice 5 relies on the same reading: the scene's `width` and `height` attributes stay 672 × 304, and the phone size comes from the stylesheet (plan, *Choices*).
- **Slice 16 needs an account with the owner role in a local start.** loop2-play does not say how to make one (only the operator command `account-role` gives the role). The slice must find a way and report it.
- **Wiedza is both in scope and out of scope.** Item 2 lists Wiedza among the screens that must fit 360 px, while *Out of scope* leaves "the look of the screen Wiedza" to tasks 17–21. Slice 17 only fits Wiedza to the width and redesigns nothing.
- **No screenshots of loop.** D-418's rationale says a request that changes a screen shows loop's screen beside it. Item 12 does not ask for that, and Slice 20 does not add them (plan, *Choices*).
- **20 slices.** The change crosses about a dozen stylesheets, three behaviours, the foundation and two skills. Its size comes mostly from the reading the guidelines force on each slice.

## Choices taken (in the plan's *Choices*)

Fifteen rows. The main ones:

- The phone rules go in blocks `@media (width < 1280px)` in each screen's stylesheet, and the computer layout's rules stay as they are. This keeps the 1280 × 720 acceptance safe.
- The scene has two sizes only, 1× and 2×. Its second size comes from a stylesheet rule, its frame stays the size of its picture, and a clipping place in `world-area.tsx` centres it.
- A tap marks a tile only with a touch pointer.
- The handle to drag a rule or a group stays in both layouts.
- The fix of commit `8591aa82` is taken over as it stands.
- The skill loop2-play and the styleguide rules come before the screens.

## Guidelines found missing or uncertain

- `guidelines/styleguide-browser-view.md` has no rule on layouts, thresholds or touch, which item 10 fills (Slice 8). Its rules "The screen Wiedza" and "The screen Postać" name a window narrower than 720 px. Its rule "No value in place of a design token" speaks of the scene's one size (D-349). Both go stale with this change, and Slice 8 updates them.
- `guidelines/coding.md`, section "Odłożone rodzaje kodu", defers patterns for HTML and CSS. No coding guideline says how `@media` blocks are written. After Slice 8 the styleguide holds that convention.
- `guidelines/testing.md` gives no way to hold a rule of the phone layout in a test, since jsdom applies no media query. D-87 and D-88 leave layout to checks in a browser, which may be enough but is not said for layouts.
- `src/browser/AGENTS.md` says the source of a new token value is settled with the human. It is unclear whether "a source the cycle cites" (item 9) is such a settlement (question 1).
- `AGENTS.md` asks for the styleguide before any change of a `browser-view` file, `tests/view/**` included. So even a slice that changes only comment lines of tests reads the whole styleguide (103 kB). That reading set the cut of Slices 3–5 and 12–13.
- `foundations/glossary.md` has no term for the phone layout, the computer layout or the page area. D-396 defines them. The plan writes no glossary term (no row asks for one).

## Order of work against the styleguide's example

The example in "Plan of a user-interface change" orders the work as environment and library, then values in their source, then one screen, then its states. The plan follows it:

- foundation first (Slices 1–5), which the method requires;
- the environment: loop2-play's phone check (Slice 6);
- the value in its source: the touch-target token and the shared controls (Slice 7);
- the page's shell (Slice 9) and the states of the shared controls (Slices 10, 11);
- the behaviours (Slices 12–15), the screens (Slices 16–19) and the evidence (Slice 20).

It departs from the example in one place: the styleguide's rules (Slice 8) come before the screens, so that the screens follow them.

## Reaches beyond the dispatch

- The approved definition of project 2: `the approved definition of project 2 (a note in the author's folder of projects)`, lines 374–393 (the projected D-396 whole, with its *Verification*, *Rationale*, *Rejected* and *Meaning (pl)*), plus the lines its search hits gave (52, 91, 194). The key `projects` of `the author's locations file` points to it. Why: the foundation step writes a projected entry "whole as the human approved it", and the task gives only its binding text. Slice 1's *Read* names the passage outside backticks, for the orchestrator to copy into the handoff, because a path outside the repository leaves a slice `unchecked`.
- `.the-way/product-guidelines/styleguide/SKILL.md`, lines 20–69 — to check who writes the styleguide in a cycle (the cycle's author, directly).
- `.the-way/product-guidelines/reading.md`, the first 80 lines — the selection of guidelines for each slice's *Read*.
- `.the-way/task-cycle/slice_size.py`, its docstring — the form of *Read* and how it is counted.
- `.the-way/elements/common/foundation_check.py`, lines 60–100 and 905–940 — the citation rule, which shaped Slices 2–5.
- `guidelines/coding-content-data.md`, whole — Slice 15 changes a comment of `src/browser/sim/data/scene.ts`.
- From `foundations/decisions.md`, read whole beyond the list: D-43, D-45, D-40, D-425 and D-281 (D-281 was in the range of D-280's page). From the index, the binding text only: D-421, D-47, D-320, D-322, D-365 and D-372.
- From `foundations/environment_facts.md`: the entry `wcag-text-contrast` and the headings, for the form of a quoted source and for where a new fact goes.
- Repository searches and reads:
  - the `decision:` lines of `tests/` (git grep), counted by decision and file;
  - commit `8591aa82` (`git show`);
  - the head of `tests/quality/eslint-size-rules.mjs`;
  - `tests/invariants/test_browser_view_token_values.py` (grep) — at-rule preludes are not read, layout properties are exempt;
  - the head of `tests/view/game-stylesheets.mjs`;
  - a byte comparison of the skill copies in `.claude/skills/` and `.agents/skills/`;
  - `.playwright/cli.config.json`.

## Working copies

- `.runs/planner/index.md` — the decision index the dispatch named; removed.
- `.runs/planner/size.mjs` — a one-off ESLint run counting the lines of code of the touched TypeScript files; removed.
- The directory `.runs/planner/` — removed.

Nothing remains. The worktree's git status is clean.

## Unread material

- `foundations/decisions.md` D-311: read lines 10517–10604. The rest of its *Rejected* (lines 10604–10647) was not read.
- The decisions the index showed that the change touches, read by their binding text in the index and not whole: D-372, D-320, D-322, D-365, D-421, D-47, D-276, D-277, D-285, D-289, D-290, D-291, D-262, D-411, D-416, D-445, D-446 and D-447. The slices that touch them have them whole in their *Read*.
- `foundations/glossary.md`: only the headings were read. The task's terms (program rule, rule group, map run, headquarters, secondary action, owner) are named by range in the slices' *Read*; their bodies were not read.
- Stylesheets, read in part or only searched:
  - read in part: `src/browser/styles.css` (lines 1–320 and 590–640), `src/browser/run-screen.css` (lines 1–130 and 590–889), `src/browser/accounts-screen.css` (lines 1–60);
  - searched only: `account-card.css`, `waiting-screen.css`, `credits.css`, `headquarters.css`, `character-screen.css`, `maps-screen.css`, `knowledge-screen.css`, `programs-screen.css`, `program-panel.css`.
- Code, read in part: `src/browser/view/scene.tsx` (lines 505–544 and 612–721), `src/browser/view/rule-list.tsx` (lines 270–389), and `src/browser/view/world-area.tsx` (read whole).
- `tests/view/`: only searched and measured; no test file was read whole.

## Searches not found or unclear

- How Playwright CLI emulates a phone's page area and touch: not looked up. Slice 6 must find it, from the CLI's help, and try it.
- Whether jsdom applies rules inside `@media (width < 1280px)`: unclear. I believe it does not, but did not test it. Slices 5 and 15 rest on it.
- Whether a width threshold of `@container` counts under D-43: unclear. D-43 exempts only "a screen-width threshold of an `@media` rule". The plan avoids `@container`.
- How to give a local-start account the owner role: not found in loop2-play.
- Whether D-418 asks for loop's screens beside a changed screen: unclear. Only its rationale and a *complies* example say so.
- A glossary term for the phone layout, the computer layout or the page area: not found.
