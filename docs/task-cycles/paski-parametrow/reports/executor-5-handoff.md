# Handoff — executor of slice 5 — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; questions go back to the orchestrator in your report (status `questions`).

## Where you work and what you make
- Worktree (your working directory): `the root of the task's worktree`, branch `task/paski-parametrow`, HEAD at the start of your work `2cfee2ed`. `.the-way` is at `b502011f`, equal to the gitlink; `node_modules` is installed in the worktree.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice" — read it whole, then `.the-way/task-cycle/change/slice.md` as it gives; read other files it names only when their step comes.
- You make slice 5 of the plan below, and only it. Commit on the branch, by path (`git add <path>…`, never `-A`, `.` or `commit -a`), in English; the commit message has the form of the repository's earlier commits (`type: :emoji: text`).
- Your directory for working copies: `.runs/executor-5/`.
- Report path: `.runs/task-cycles/paski-parametrow/reports/executor-5-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with **Unread material** and **Searches not found or unclear** (`none` is an answer), holds each check with its command and exit code, your own-work check as the method gives it, and names every departure from the task's answers and from the plan with its reason.
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

## Additions of the orchestrator to the slice's *Read*
- Read whole D-450 (the explanation under the cells and the blow marker — the decision the words of the explanations and `body-blow.ts` answer to; current range in the list above) besides the decisions the slice's *Read* names; the plan's line ranges of the foundation are stale, use the list above.
- Slice 4 has made `src/browser/view/body-row-cells.tsx` (component `BodyRowCells`, 41 lines) and `tests/view/body-row-cells.test.mjs` (310 lines; the helpers stand at its head, lines 1–104); slice 5 adds pure functions only (`body-row.ts`, the new `body-blow.ts`) with their tests in `tests/view/body-row.test.mjs` and the new `tests/view/body-blow.test.mjs`; it does not change `body-row-cells.tsx`, `world-area.tsx` or any stylesheet.
- Reading rule: read every file and decision your *Read* names, whole; list as unread only what you could not read, with the reason.


## The plan's section of slice 5, word for word (`plan.md`)

### Slice 5 — What each cell of the body row says, its bar, alarm, outline, explanation and blow

- **Goal:** pure functions of the view give, for a map run on its map, each cell of the body row: its
  name and its number apart (the numbers as today, D-57, D-178), the share of its bar — satiety 0 to
  100, health 0 to the starting health and nature energy 0 to its cap, from the game's data — or, for
  temperature, the place of the marker on the scale from 30 to 41 °C (at its left end below 30 °C) and
  the zone it stands in (chill 30–35, safe 35–39, overheating 39–41 °C), whether the value is below its
  threshold (temperature below 35 °C and satiety below 30 from the game's data, health below 35, a
  number of the look alone), the note as today, and the outline of the temperature cell — warming while
  something burns on the character's tile, cooling while nothing warms it and the map is colder than
  the body, plain on a map that does not cool it; and the words of the explanation of temperature,
  satiety and nature energy — the threshold, what happens below it and how fast the value changes,
  with the numbers from the game's data (the wording is the executor's, after the old Loop's lines the
  task quotes, and true to the decisions it reads). In `src/browser/view/body-row.ts` these stand with
  the functions of today. A pure function in the new `src/browser/view/body-blow.ts` reads the blow
  marker from the events of one simulation call (D-04 as the *Foundation entries* change it): one
  marker for a combat, „−{n} · {stworzenie}” with the sum of the creature's blows and its name from
  the game's data, where that sum is at least 2, a killing blow included, and none at the paces 8× and
  16×. The numbers of the look (30, 35, 39, 41) stand in the view module (*Choices*). Each behaviour
  has its test written first in `tests/view/body-row.test.mjs` or the new `tests/view/body-blow.test.mjs`,
  its expected values written out in the case. What `world-area.tsx` and `body-row-cells.tsx` use today
  stays as it is, so every other test keeps passing.
- **Change:** `src/browser/view/body-row.ts` · `src/browser/view/body-blow.ts` ·
  `tests/view/body-row.test.mjs` · `tests/view/body-blow.test.mjs`
- **Read:** `.runs/task-cycles/paski-parametrow/task.md:26-40` To do ·
  `.runs/task-cycles/paski-parametrow/task.md:154-187` Context ·
  `.runs/task-cycles/paski-parametrow/task.md:225-241` Settlements to record ·
  `foundations/decisions.md:10932-10972` D-337 · `foundations/decisions.md:7204-7228` D-178 ·
  `foundations/decisions.md:59-207` D-04 · `foundations/decisions.md:6289-6304` D-57 ·
  `foundations/decisions.md:6305-6320` D-58 · `foundations/decisions.md:6335-6350` D-60 ·
  `foundations/decisions.md:6607-6629` D-387 · `foundations/decisions.md:7119-7143` D-175 ·
  `foundations/decisions.md:7468-7483` D-377 · `foundations/decisions.md:5967-5997` D-136 ·
  `foundations/decisions.md:5760-5787` D-130 ·
  `foundations/decisions.md:306-331` D-18 · `foundations/invariants.md:236-247` content-identifiers ·
  `src/browser/sim/body.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/data/creatures.ts` ·
  `src/browser/sim/types.ts:120-160` · `src/browser/sim/run.ts:65-104` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — it writes the Polish words of three explanations the player reads, with numbers
  from the game's data, and reads the blow from the simulation's events.
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row.test.mjs` · `npm test -- tests/view/body-blow.test.mjs`
  (each new case first failing) · `npm run typecheck` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** D-337 · D-178 · D-04

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
