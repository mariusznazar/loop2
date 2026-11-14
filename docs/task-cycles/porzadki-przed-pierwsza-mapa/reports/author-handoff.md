# Handoff — the one author, the whole change

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; there
is no human to ask before the request. Answer nothing by labelling it the human's approval.

## Where you work

- Worktree (work from its root; every path below is relative to it):
  `the task's worktree`, branch `task/porzadki-przed-pierwsza-mapa`.
- Base commit: `6ab6a32be884ac174b068b8a6a5dd1515073d2a9`. Nobody else writes in this worktree.
- `npm ci` and the quality venv `.runs/quality-venv` are installed. `dist/` is built from the base.

## Your stage and variant

You make **the whole change as the one author**, with `make-change`. Method: read
`.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or variant that
names it comes. You also do the foundation step: read `.the-way/task-cycle/skill/foundation_step.md`
whole and write the entries the task's *Settlements to record* carry (rows 1–4) and the change to
D-06 that the task names, each through the project skill of its element
(`the-way-record-decision`, `the-way-record-invariant`, `the-way-update-part-map`, and
`the-way-record-glossary-term` or `the-way-record-environment-fact` only if your search of the
foundation finds one is needed), on this branch. Return before review: do not open a request, do not
merge, do not run the product's whole gate (`npm test`); the orchestrator runs it. Run the focused
checks that belong to each item (`python -B scripts/test.py <file>` for one test file,
`npm run typecheck`, `npm run build`, the Python invariant tests you touch).

## The task

The frozen task document, read it whole: `.runs/task-cycles/porzadki-przed-pierwsza-mapa/task.md`.
It is a note in Polish; its items are eight "To do" items, two acceptance criteria and four settled
questions. It leaves no open design choice. The task document is the only authority for what the
change is; a thing not in it is out of scope, also a tidy-up you notice.

## Answers of the orchestrator (step 4 of the cycle)

- Trust boundary touched: **no**. Irreversible operation: **no**. No spec and no plan: the
  orchestrator judged the change fits one agent.
- Two choices the task carries to the cycle are yours to make and to name in your report:
  1. The new name of the module and component `right-area` / `RightArea`: it must say what the
     thing is today — the area under the drawing of the map-run screen with the tabs „Kronika” and
     „Teren” — and it must not clash with `chronicle.ts`, `chronicle-entries.ts` or the
     `ChronicleTab` family. Update every place the old name stands (code, the test file name and its
     imports, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, the
     module's own comment that explains the old name, the part map if it names the file), and
     check with a search that no mention of the old name is left, apart from history you must not
     rewrite.
  2. Where `press` and `fire` stand for the view tests, and the one form of `press` for its four
     variants. Task text: `tests/view/page-document.mjs` (D-264, D-268 call it the one harness) or a
     separate module beside it. Choose with D-264/D-268 in hand; a new module under `tests/view/`
     belongs to the part `browser-view` already (`tests/view/**`). The four variants — `program-list`
     and `rule-editor` (a `press` without `fire`), `run-screen` (the window as a parameter),
     `uncaught-failure` (`async`) — must keep their tests' meaning; where one form cannot serve a
     variant without changing what that test checks, leave that variant's own function in place and
     say so in the report.
- How the shared number field receives the rule (row 4, To do 5) is your choice within the row:
  the control must not import `program-editor.ts` or `trip-editor.ts`; the screens give it the rule.
  The DOM form `number-field.ts` and the React form must still draw the same tree (D-265), and the
  field must accept and refuse the same entries with the same message as today (D-181). Name what
  you chose.
- Item 1 of the task is the biggest by file count: the task counts 34 hits of
  `Object.(entries|keys|values)(MAPS)[0]` in 33 files of `tests/`, plus
  `tests/sim/completion.test.mjs:29`, `tests/view/scene-picture.test.mjs:874`,
  `tests/sim/conditions.test.mjs:30`, `tests/sim/traits.test.mjs:86` and
  `tests/sim/rules.test.mjs:341-342`. The counts are from an earlier commit; recount with a search on
  your own tree and find the variants the task names ("i warianty": a pick by position of `MAPS`,
  `ITEMS`, resources, archetypes, however the line is written, also in `tests/invariants/` Python
  tests that read the game data if any does) — a test that picks by identifier already needs no
  change. Make a substitution script if you like, but check each file it changes by running that
  file's test; a hand-run file list is no evidence for the files you did not run.
- The test `tests/sim/acceptance.test.mjs:103-104` asserts that the first map is the forest; per the
  task it must assert on the map picked by identifier instead.
- `actionFeasible` stays (question 1 of the task). The Python test
  `tests/invariants/test_simulation_isolation.py` stays whole (question 2): do not shorten it.
- The new compiler configuration (To do 8) must make a use of `document`, `setTimeout`, `console` or
  `structuredClone` in `src/browser/sim/` a compile error, and must pass on the present code. See the
  task's *Context* for the trial the analysis made. The check is for you to show failing once with a
  planted use and passing on the real code; remove the planted use before you commit; record both
  runs in your report as command and exit code. A new `tsconfig` file is a file the part map does not
  yet claim by name (`build-tools` lists `tsconfig.*.json` files one by one): add it through
  `the-way-update-part-map`.
- Nothing the player sees may change (acceptance criterion 1). The tests must pass whichever place of
  the game data a new map or item takes (criterion 2); to check this yourself, you may — without
  committing it — temporarily put a dummy entry first in `MAPS` and `ITEMS` and run the tests you
  changed, then remove it.

## What you read, whole

Product rules: `AGENTS.md`; `src/browser/AGENTS.md`.

Guidelines (each whole): `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-simulation-module.md`, `guidelines/testing.md`,
`guidelines/styleguide-browser-view.md`. Files you change you read whole before you change them.

Foundation entries, each whole (an entry runs from its heading to the next heading of its level):
decisions D-04, D-06, D-73, D-181, D-264, D-265, D-268, and the decisions D-73 names as departures
that bear on a test you change; invariants `simulation-isolation` and `simulation-inputs`; the part
map `foundations/part_map.md` whole; the entries of the glossary for the terms you use. The foundation
step and each element's skill tell you what else to read to write an entry; you select it.

## Passages of the task already in this handoff

Task passages bearing directly on your choices are in the frozen task; you read it whole, so none is
copied here.

## Rules you must keep (from the product and the user's global rules)

- Code, identifiers, comments and commit messages in English; the strings the game shows and the
  words tests match on stay Polish as they are.
- Commit by explicit paths (`git add <path> …`), never `git add -A`, `.` or `commit -a`. The
  repository's recent commits show the message form (`<type>: :emoji: <sentence>`); follow it.
- A script that rewrites existing files keeps their line endings and encoding (read and write with
  `newline=''`), writes Unicode with explicit UTF-8, and prints only ASCII to the console; use `/` in
  paths in Python literals. After a scripted insertion containing a backslash, search the file for
  the inserted text.
- Do not commit anything under `.runs/`. Do not touch the task's note, other worktrees or the main
  checkout.
- A secret you meet is not copied into a report.

## Report

Write your full report to
`.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/author-report.md` as the method gives it,
with **Unread material** and **Searches not found or unclear** (each `none` where it is), the checks
with command and exit code, the own-work check, the foundation entries each with one sentence of
meaning in English and one in Polish and its mark (`row <n>`, `projected`, or `the cycle's`), the two
naming choices and the number-field choice, and the reaches beyond this handoff. Return the status,
your commits, a one-line check result naming what failed or did not run, and the report path.
