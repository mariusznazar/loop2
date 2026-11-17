# Planner report (second dispatch) — luki-w-testach-z-przegladu

- Status: **done with concerns** (concerns, reaches and a guideline found missing below)
- Plan: `.runs/task-cycles/luki-w-testach-z-przegladu/plan.md` — *Foundation entries* (18 rows) and 22 slices
- Size report: `.runs/task-cycles/luki-w-testach-z-przegladu/plan-size.md` — `slice_size.py` exit 0, every slice `fits`
- Worktree: `the repository's root`, HEAD `0b23580bb4f643dfb52c66a7d6a27b1b8d60a5b1`; `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to its gitlink. `git status` clean; no tracked file changed.

## Open design choice or reserved choice

None found beyond the spec. Every other item is settled by the task, its settlement rows, the spec
and the foundation; what remained were choices of how, listed under the plan's *Choices*. No
language, library, store or place to run is chosen.

## The plan in short

Foundation entries (one agent, before Slice 1): the new decision of the `destroy` departure and
D-73's list (row 1), the `express-session` fact and `player-opaque-session-cookie`'s *Rests on*
(row 3), `sprite-credits` to `test` (row 2), six invariants of To do 11 to `test`, D-112's
*Verification*, and D-29 in a commit of its own (spec, Decision 6). The withdrawal of
`account-schema-lifecycle`, the rewording of `account-database-schema` and of `eslint-source-rules`
are written by the slices that move their citations (WAY-69), because withdrawing an invariant that
tests still cite is an error of `foundation_check.py` (its docstring: "`%s` is withdrawn; name its
successor").

| Slice | What | Model | Risk |
|---|---|---|---|
| 1 | start and container test cite the invariants that stay (11, 12) | same | none |
| 2 | `account-schema-lifecycle` withdrawn, `account-database-schema` reworded, nine citations (12) | same | none |
| 3 | `http.test.mjs` citations of three invariants; store case seen red (11) | same | none |
| 4 | sprite credits' completeness test; `loop2-shared-public-origin` citation (5, 11) | same | none |
| 5 | `guidelines/testing.md`: the `destroy` departure, the deploy workflow's two forms (6, 17) | cheaper | none |
| 6 | chronicle row not drawn again (1) | strongest | none |
| 7 | wolf's run in through a pause (2) | same | none |
| 8 | character numbered as `nextCharacterId` refused (3) | same | none |
| 9 | guards' completeness over the app's routes (4) | same | none |
| 10 | simulation citations (8) | same | none |
| 11 | catch-up-state and simulation-randomness with a wolf's attack (10) | same | none |
| 12 | world reference, closed lists, team through load and loop (10) | same | none |
| 13 | audit citation; fixed case of `cross-part-imports` (8, 15) | same | none |
| 14 | default address under a fully configured start (9) | same | none |
| 15 | ESLint on the hook and the play skill (16, spec) | cheaper | none |
| 16 | six bash tests run with Git's bash (13) | same | none |
| 17–22 | the six flaky tests, one each (7) | strongest | 17: `src/server/**`; 19, 20: `deploy/**`; others none |

## Concerns

1. **Three slices stand close to the limit of reading.** Slice 2 (140 671 tokens), Slice 3
   (144 312: `tests/http.test.mjs` alone is 250 KB, and a slice that changes it counts it whole) and
   Slice 7 (145 528: `tests/view/scene.test.mjs` 120 KB plus the styleguide 93 KB). They fit; there is
   no cut that makes them smaller without splitting a file between two slices. For Slice 7 I took D-264
   and D-268 out of *Read* (the rule they hold stands in `guidelines/testing.md` and in the invariant
   `document-test-memory-limit`, both read); the orchestrator may put them back only by taking
   something out.
2. **The foundation check is red on purpose between the foundation step and Slice 4.** The six
   invariants turned to `test` are cited by Slices 1, 3 and 4; until Slice 4 the run without
   `--skip-test-citations` reports them. The plan says so in the note under *Foundation entries* and in
   each of Slices 1–3's *Checks*; the orchestrator's handoff for the foundation step should carry that
   note.
3. **D-382's *Verification*** is left to the return step (`.the-way/task-cycle/skill/return_step.md`:
   "Where a decision the change writes carries a pair of examples and a test holds part of its
   sentence, it removes that part from the pair, names that test by the clause `tests:`"). It stands
   under *Foundation entries* as a note, not a row, so that the agent of the entries does not write it
   before Slice 6 knows whether the test can exist.
4. **Which tests may still need the orchestrator's 3 full gate runs under load:** every one of
   Slices 17–22 whose executor reports the cause not reproduced. Most likely, judging only from what
   the task records: the mailer case (one full run in three), the transport case (failed only in a
   full run, alone 0.53–0.70 s), and the image icons case (two full runs at once). The container case
   (137 under 512 MiB) and the two bash cases may reproduce on their own. The line on the task list for
   a test not reproduced and the request's description are the orchestrator's.
5. **Slices that may return `blocked`:** 16 (a failure caused in `deploy/`), 18 (a cause in
   `src/server/`), 21 (a cause needing the 512 MiB limit, `compose.yaml`, the `Dockerfile` or D-106,
   D-113, D-390, D-406 changed), 22 (a change of what D-390–D-392 or D-406 say). Each such cause then
   needs a slice of its own with a review, or a decision the human accepts.
6. **Slices 17–22 are heavy in time:** at least 30 runs each, and 30 more after a repair; Slice 21's
   case builds an image each run (its build limit is 1 200 s). The acceptance criterion asks it.
7. **The worktree has no `node_modules`.** The earlier agents ran ESLint and Prettier from the main
   checkout's `node_modules of the main checkout`, which Node finds by walking up the directories.
   The executors' `npm.cmd test -- <file>` will do the same; if the main checkout's dependencies
   differ from this branch's `package-lock.json`, an executor must run `npm ci` in the worktree first.
   I did not run any test, so I did not check this.

## Choices the plan takes

The plan's *Choices* table holds them with the ways rejected and their cost; the main ones: entries
that break the check written with their citations (WAY-69), every change of
`foundations/decisions.md` in *Foundation entries* (a slice changing that 1.26 MB file cannot be
measured); the departure as a decision of its own narrowing D-73; D-29 in a foundation commit of its
own; the `loop2-shared-public-origin` citation grouped with the sprite test so the styleguide is read
once; one strongest slice per flaky test; To do 13 before the flaky slices of the watcher and backup;
To do 10 in two slices; malformed markers the task does not name left alone.

## Findings outside the task

- Malformed invariant comments that `foundation_check.py` does not read as citations, not named by
  the task: `tests/sim/encounters.test.mjs:867` ("// Invariants map-run-repeatability and
  restart-seed:") and `tests/sim/body.test.mjs:401` ("// Invariant nature-energy-range:"). Left as they
  are (Slice 10's *Goal* says so); a later task or the orchestrator may add them.
- `player-express-session-sqlite-store` (method `review`) is already cited by two cases of
  `tests/transport.test.mjs` (lines 778, 830); Slice 3 only shows them red once.
- The docstring of `tests/deploy/test_account_storage.py` says `account-save-durable-storage` is
  "method review" and left out; Slice 1 brings it in line.

## Reaches beyond the handoff

- `.the-way/task-cycle/skill/foundation_step.md` whole, `.the-way/task-cycle/skill/return_step.md`
  whole, and `.the-way/task-cycle/skill/SKILL.md` around "Foundation entries" (lines 205–220, 383–460):
  who writes the plan's entries and when, and where D-382's correction goes.
- `.the-way/elements/invariants/template.md:40-109` ("Method and test"): whether an invariant may read
  `test` before a later slice writes its test (yes, WAY-61), and `.the-way/elements/common/foundation_check.py:1-110`:
  what it reports for a withdrawn identifier still cited and for an uncited `test` invariant.
- `.the-way/task-cycle/slice_size.py:1-80`: how sizes are counted (a changed file counts whole).
- `.the-way/product-guidelines/testing/SKILL.md:30-69`: who writes `guidelines/testing.md` in the cycle
  (the cycle's author, by the template).
- `foundations/decisions.md` beyond the handoff's list, read whole by heading range: D-28, D-29, D-30,
  D-31, D-32 (scope of item 16), D-81 to D-85 (testing section), D-390, D-391, D-392, D-406 (Docker in
  the gate, for Slices 21–22); the section heading list of *Testing discipline* and *The gate, test
  tools and the local start*. Named by range, not read: the further decisions in the slices' *Read*
  (D-08 … D-417 as listed) were located by heading and given as whole-entry ranges for the executors.
- `foundations/environment_facts.md:350-489, 650-659, 740-805`: the facts of `express-session`, Docker
  volumes, the packs' licences.
- `package-lock.json` (versions of `express-session` 1.19.0, `uid-safe` 2.1.5, `random-bytes` 1.0.0)
  and `src/server/**` searched for `genid` (none): what the fact of row 3 must cover.
- The code and tests read to cut slices, in part: `src/server/app.ts`, `account-routes.ts`,
  `owner-routes.ts` (route registration), `src/browser/view/tabs-area.tsx:60-120`,
  `src/browser/view/scene.tsx:845-884`, `src/browser/sim/saved-game.ts:500-525`,
  `tests/transport.test.mjs:1-300, 440-715`, `tests/account-mail.test.mjs:1-120, 340-420`,
  `tests/view/icons.test.mjs:1-52, 205-374`, `tests/view/scene.test.mjs:2548-2600, 2863-2888`,
  `tests/sim/saved-game.test.mjs:1380-1393`, `tests/invariants/test_loop2_one_serving_process_container.py`
  whole, `tests/invariants/test_account_server_default_address.py` whole,
  `tests/deploy/test_account_storage.py:1-40, 90-130`, `tests/http.test.mjs:5940-5956`,
  `eslint.config.mjs` whole, `scripts/test.py` and `package.json` whole; test names and markers found
  by search in the others.

## Guidelines found missing or uncertain

- **`guidelines/coding.md` has no rule `### Size of a function and a file`,** which the pinned
  template marks required (`.the-way/product-guidelines/coding/template.md:73`: "The required rule
  `### Size of a function and a file` follows the six"), and no decision of loop2 sets one. So the size
  bullet of the method asks nothing here and no moving slice was planned; the gap itself belongs to a
  task of the coding guidelines, not to this one.
- `guidelines/testing.md:10-11` counts "dziesięć odstępstw"; Slice 5 changes the count with the new
  departure.
- `guidelines/coding.md:37-40` ties the ESLint patterns to the five parts; Slice 15 changes it, as the
  spec says.

## Order and the styleguide's example

The styleguide's example of the order of work (`guidelines/styleguide-browser-view.md:1152-1159`,
"Plan of a user-interface change": environment and library, then values in their source, one screen,
its states) concerns a change of the interface. This change touches no screen, token or stylesheet:
Slices 4, 6 and 7 change only test files of `browser-view`, so the example does not apply, and the
plan's order follows the foundation check (citations first) and the files slices share.

Slices that need `guidelines/styleguide-browser-view.md` whole: 4, 6, 7 (they change files of
`browser-view`: `tests/view/**` and `tests/account-api.test.mjs`).

## Working copies

- `.runs\planner-2\` held three
  lists of entry ranges computed by `awk` from `foundations/decisions.md`, `invariants.md` and
  `environment_facts.md`, and one size report. Removed with the directory before returning; nothing
  remains. No git worktree or clone was made.

## Questions still open

None that block the plan. One for the orchestrator's handoffs, with my proposed answer: carry the
note under *Foundation entries* (the expected report of uncited `test` invariants until Slice 4, and
D-29 in its own commit) into the handoff of the agent of the entries word for word.

**Unread material:**
- `guidelines/styleguide-browser-view.md` — read lines 1–12, the section outline and 1142–1166
  (*Examples*); not read whole, since no slice of mine designs anything of the interface and the
  handoff asked for it only where a slice changes a file of browser-view; the slices that do carry it
  whole in their *Read*.
- `.runs/orchestrator/index.md` — not opened; I located entries by their headings in
  `foundations/decisions.md` instead.
- `foundations/invariants.md` — read lines 1–420, 500–947 and 1108–1426; not read: 420–500 (from
  `ruff-source-rules` to `application-build-kitchen-sink`) and 947–1108 (from `nature-energy-range` to
  `password-reset-ends-sessions`), none of them an invariant the task names except as found by search.
- `foundations/decisions.md` — read whole: D-28, D-29, D-30, D-31, D-32, D-73 to D-85, D-112, D-163,
  D-235 (to its *Origin*; its *Rationale* and *Rejected* not read), D-271 (to line 4890 of its
  *Verification*; its *Rationale* and *Rejected* not read), D-273 (to its *Verification*), D-382, D-390,
  D-391, D-392, D-406, and D-231's lines 2190–2222. Headings only: D-87, D-88, D-89, D-94, D-95 and
  the other decisions of *Testing discipline* and *The gate, test tools and the local start*, whose
  questions bear on no slice. Every other decision a slice's *Read* names was located by its heading
  and not read.
- `foundations/environment_facts.md` — read only the passages named under the reaches.
- Kind files `guidelines/coding-*.md` — none read; only `coding-mail-sending.md` matches a slice
  (Slice 17 may change `src/server/account-mail.ts`), and it stands in that slice's *Read*. The
  others match no file a slice changes (tests are no kind of the index).
- Code and tests — read as listed under the reaches, in part; the rest located by search.

**Searches not found or unclear:**
- A rule of size in `guidelines/coding.md` or a decision setting one — not found (searched "rule of
  size", "size of a function", "WAY-365").
- `src/browser/view/right-area.tsx`, which To do 1 names — not found; the row's `memo` is in
  `src/browser/view/tabs-area.tsx:77` (the task's lines come from an older commit). The plan names the
  file that exists.
- A `genid` option given to `express-session` in `src/server/` — not found, so the library's own
  generator makes the identifier.
- Whether an existing case already fails on `id > nextCharacterId` (the variant „a character's number
  reaching the next one” of `tests/sim/saved-game.test.mjs:1388` may already do it) — unclear without
  running it; Slice 8 runs it first.
- Whether `test_control_the_map_the_helpers_and_the_accepted_invariants_decide_what_passes` of
  `tests/invariants/test_cross_part_imports.py` already holds To do 15's case — unclear; Slice 13
  checks it first.
