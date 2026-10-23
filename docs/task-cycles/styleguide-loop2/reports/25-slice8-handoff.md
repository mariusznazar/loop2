# Handoff 25 — executor of slice 8

## Delegation

Mariusz requested this the-way task cycle and delegated intermediate choices to the orchestrator.
You are the executor of slice 8. Questions go to the orchestrator, never to the human.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\styleguide-loop2`, branch `task/styleguide-loop2`. Slice
  8's base: `7d6b39f16b1febe382088bb7497857f9e57286c8`. You alone write in this worktree now.
- Method: the project skill `the-way-make-change`, as the executor of a planned slice — read
  `.the-way/task-cycle/change/` of the pinned the-way `f0b2130` whole and follow it.
- Read the product's `AGENTS.md`, follow its git and test rules, and read the guidelines
  `.the-way/product-guidelines/reading.md` selects for the files you change — the styleguide
  `guidelines/styleguide-browser-view.md` is among them for files of `browser-view`. Commit by
  explicit paths, English messages in the repository's style; do not push.

## Stage and boundary

Make slice 8 of the plan and nothing else, commit it, and return before review.

## Inputs

- Frozen task `.runs/task-cycles/styleguide-loop2/task.md`; reviewed spec
  `.runs/task-cycles/styleguide-loop2/spec.md` (Decision 8a included); plan
  `.runs/task-cycles/styleguide-loop2/plan.md` — slice 8 (test file names there are current).
- Earlier slices are made and reviewed up to `7d6b39f16b1febe382088bb7497857f9e57286c8`; foundation identifiers in
  `reports/07-foundation-report.md`.
- Cycle record `cycle.md`, questions table — its answers bind.
- Answers of step 4: trust boundary — yes: `assets/icons/**` (icon recolouring), `assets/fonts/**`
  (files from outside), `scripts/kitchen-sink.mjs` (takes in HTTP requests); a review checks crafted
  input at whichever of them the range touches. Irreversible operation — no.

## Notes from the orchestrator and earlier reviews

- Trust boundary: `scripts/kitchen-sink.mjs` takes in HTTP requests (QA-3). Bind to `127.0.0.1`
  only, at a port the system picks; serve only `dist/kitchen-sink/` through `express.static`; write
  nothing outside `dist/kitchen-sink/` and never into `dist/public/` (spec Decision 6).
- Assembly (slice 7 and its review): at the root of `dist/kitchen-sink/` the page's own
  `index.html` (from `src/browser/kitchen-sink/`, never the game's), `tokens.css`, `styles.css`,
  `kitchen-sink.css`; the entry module at `/kitchen-sink/kitchen-sink.js`, where
  `tsconfig.kitchen-sink.json` emits it; `fonts/` and `icons/`. `kitchen-sink.css` lies in
  `src/browser/kitchen-sink/`, so the `src/browser/*.css` copy misses it.
- Marker: `loop2-kitchen-sink-page` (a `<meta>` content value in the page's HTML; a string constant
  in the entry).
- The test (`tests/invariants/test_application_build_kitchen_sink.py`, invariant
  `application-build-kitchen-sink`): its positive control `npm run kitchen-sink -- --build-only`
  is the only compile of the page in `npm test`, so it asserts that command exits 0 (slice 7 review).
- `README.md`: name the command, and say the build copies the stylesheets standing directly in
  `src/browser/` („bezpośrednio”; slice 2 review Minor M1), so no reader thinks `kitchen-sink.css`
  reaches `dist/public/`.
- `package-lock.json` stays as it is (D-33).
- Run the server check of the plan (address printed, HTTP 200) and stop the process; a screenshot of
  the page served by the command at 1440 px into `reports/shots/slice8/`, or name it unchecked.
- Expected `foundation_check.py` after this slice: exit 1 with only the error for
  `src/browser/AGENTS.md`.

## Constraints

- Do not look at branches `10x/*` or directories `C:\Storage\repos\loop2-10x` and
  `C:\Storage\repos\loop-10x`; do not read the branch `styleguide-browser-view` or the worktree
  `C:\Storage\repos\loop2-styleguide`.

## Output

- Full report: `.runs/task-cycles/styleguide-loop2/reports/25-slice8-report.md`, as
  `make-change` gives it, every check with its command and exit code; for a test you write, its
  failing run and its passing run.
- Return: status, head commit, report path, a one-line check result naming what failed or did not
  run, and every question or concern the next dispatch depends on.
