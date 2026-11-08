# Handoff — the one author (make-change)

Cycle for the task in `docs/task-cycles/test-granic-czesci/task.frozen.md` (frozen copy of the task
document; read it whole). The person who requested the cycle has delegated intermediate choices to
the orchestrator; nothing here is the human's approval. Do not ask the human anything.

## Where and what

- Work only in the worktree `the root of the task's worktree`, branch
  `task/test-granic-czesci`, base `72287c2bd00c411929354bdb95949537adeb6dca`. Work from its root.
  `node_modules` and `.runs/quality-venv` are junctions to the main checkout; do not delete or
  rewrite them.
- Method: `make-change`, at `.the-way/task-cycle/change/SKILL.md` of this worktree (the process
  root is `.the-way`, pinned at `294af7fde45323ac1851c014a03071a97fc38d96`; the project skill
  `the-way-make-change` points there). Read that `SKILL.md` whole, and a file it names only when
  the step or variant that names it comes.
- Your variant, in the words of its row: **"the whole change as the one author"**.
- Stage boundary: make the whole change the task requires, including the foundation step
  (`.the-way/task-cycle/skill/foundation_step.md`, read whole when you write foundation entries;
  and the skill of an element when you write an entry of that element). Commit your work on the
  task branch. Do not run the product's gate (`npm test` as a whole): that run is the
  orchestrator's. Run the focused checks you need (one test file via `python -B scripts/test.py
  <file>` as D-77 gives, `foundation_check.py`). Do not open a pull request, do not push, do not
  start the return step or any review. Do not edit anything outside the worktree.
- Report: write the full report to
  `docs/task-cycles/test-granic-czesci/reports/report-author.md` as `make-change` gives it,
  including **Searches not found or unclear** and the own-work check. Return status, commits, a
  one-line check result naming what failed or did not run, and the report path.

## Answers to the cycle's start questions

- Trust boundary: no. The change touches no file the part map names as a trust boundary.
- Irreversible operation: no.
- Open design choice: none (see below). Reserved choice: none. If you meet a design choice this
  handoff and the foundation leave open, return `returned` with no code.
- Route: one author without a plan, class `same`.

## What you read (named by the orchestrator)

- The whole frozen task (`task.frozen.md`), including its *Questions to settle* with answers and
  *Not chosen*, *Context*, *Decisions in play* and *Settlements to record*.
- Foundation entries by identifier: WAY-299 and WAY-44 (the-way's `.the-way/foundations/decisions.md`),
  the-way's invariant `cross-part-imports` (`.the-way/foundations/invariants.md`) and its test
  `.the-way/elements/part-map/test_cross_part_imports.py` (a pattern, not a template to copy);
  loop2's D-04, D-83, D-81, the invariants `simulation-isolation` and `simulation-inputs`, and the
  whole `foundations/part_map.md` and `foundations/glossary.md`. Select further loop2 decisions and
  invariants by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` for the
  parts you touch: `simulation`, `browser-view`, `build-tools`, `deployment`, `agent-workflow`,
  `product-foundation` and the new part. The decisions that cover `tests/invariants/` layout and the
  invariant tests' conventions (names `test_*.py`, `invariant: <identifier>` line) are among them.
- Guidelines, each whole: `guidelines/coding.md` and `guidelines/testing.md` (both list the parts
  the change touches in *Applies to*); the kind files of `coding.md`'s index do not match (no
  simulation module, browser module or other kind is written; the `.mjs` test edit is a test, not
  a simulation module). `src/browser/AGENTS.md` and `guidelines/styleguide-browser-view.md` do not
  apply (no file of the browser-view's `src/browser/` is changed).
- The part-map template: `.the-way/elements/part-map/template.md` whole, with
  `elements/common/rules.md`, as the skill `the-way-update-part-map` requires; and the skills
  `the-way-record-invariant`, `the-way-record-decision`, `the-way-update-part-map` for the entries
  you write. Foundation entries are written only through those project skills (see the product's
  `AGENTS.md`).
- Tests that matter: `tests/invariants/test_simulation_isolation.py`,
  `tests/invariants/test_application_package_layout.py`,
  `tests/invariants/test_browser_view_token_values.py`, `tests/sim/encounters.test.mjs`,
  `tests/view/terrain-picture.test.mjs`, `tests/invariants/loop2_invariant_support.py`,
  `tests/deploy/backup_script_support.py`.

## Choices the task leaves to you (name each in the report; none is a design choice to return on)

- The identifier and sentence of the new part of test helpers (WAY-44: "a part of their own, whose
  sentence says that it holds them; its entry takes no field of its own for it"), its *Depends on*
  (the files in it must be a part everyone's tests may import, so list what they import), its
  *Trust boundary*, and which files it holds: `tests/invariants/loop2_invariant_support.py` goes
  there (task item 2) and `file_owners` goes there as a function (task item 3). Move other files
  only if the task names them; `tests/invariants/account_container_support.py` stays in
  `build-tools` and `tests/invariants/program_fixture.py` stays in `simulation` (task *Context*).
- Which existing part owns the new boundary test file (WAY-44: tests belong to the part they
  test), and where that file lies and how it is named so it is selected by `npm test` (D-83).
  Verify its execution in the gate, as D-83 requires for a new `test_*.py`.
- The invariant's identifier, its *Rests on*, and the matching `invariant: <identifier>` line.
  The invariant's *Part* is `every`, *Method* `test`, *Violated* `no` — if after your change the
  repository still holds an import the map does not allow, say so in the report instead of
  recording a violation yourself.
- The decision (Settlements row 1) is written with `the-way-record-decision`; the invariant (row 2)
  and the changed `simulation-isolation` sentence (row 3, verbatim from the task) with
  `the-way-record-invariant`; the part with `the-way-update-part-map`.
- Test implementation: Python, in the repository's existing test style; it must use `git ls-files`
  and `git check-attr` for the files and their part (`file_owners` pattern, see
  `tests/invariants/test_application_package_layout.py:23`), read the import forms the task's
  answers 2 and 3 list, fail on an unmatched relative import with the file name and line, match an
  import of a built file (`dist/…​.js`) to its `.ts`/`.tsx` source in `src/`, and read code, not
  strings. Show the test failing on a case that violates the rule and passing on the repository
  (record both runs in the report as the invariant's failing and passing runs; a temporary
  violation must not stay in the worktree).

## Unattended edges

- Do not edit tests only to make the new test pass beyond items 3–4 of the task. If the new test
  finds an import the task does not name, report it with file, line and the part pair, and do not
  hide it with an exclusion list: stop and return `returned` or `done with concerns` as
  `make-change` directs.
- The task's *Context* records a scan at `01b26d5`; the base here is `72287c2`. Verify the three
  findings are still the whole set before you rely on them.
- Commit with `git add <path>…` by paths (never `-A`, `.` or `-a`); commit messages in English in
  the repository's style (`docs: :memo: …`, `test: …`). The user-level git rules: no here-string
  in Bash; use `git commit -F <file>` for messages with quotes.
- Base checks on `72287c2`: the orchestrator is recording them (`reports/base-npm-test.txt`,
  `reports/base-foundation-check.txt`); if you meet a failing test, say whether the base shows the
  same failure.
