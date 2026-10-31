# Report — reconciliation with the target branch, task `reset-hasla`

**Status:** `done`

The branch `task/reset-hasla` now contains `origin/main` at `4ed8fcd`. Nothing is pushed: the local
branch stands 16 commits ahead of `origin/task/reset-hasla` (2 of mine and the 14 of `main`).

## Commits and files

| Commit | What | Files | Lines |
|---|---|---|---|
| `d2e1c3b` | renumbering, parent `fdfbc62` | 14 | +39 −39 |
| `08ca3eb` | merge, parents `d2e1c3b` and `4ed8fcd` | 24 against the first parent, 31 against main | +2352 −158 against the first parent; +3964 −267 against main |

Files of `d2e1c3b`, each with equal added and removed lines: `foundations/decisions.md` 14,
`foundations/invariants.md` 1, `guidelines/coding-account-policy.md` 2,
`guidelines/coding-mail-sending.md` 2, `guidelines/styleguide-browser-view.md` 2,
`guidelines/testing.md` 6, `src/browser/view/app.ts` 1, `src/browser/view/controls/text-field.ts` 1,
`src/server/account-mail.ts` 1, `src/server/account-routes.ts` 4, `tests/account-mail.test.mjs` 1,
`tests/http.test.mjs` 2, `tests/view/account-screen.test.mjs` 1,
`tests/view/password-reset.test.mjs` 1.

The merge's own hand work is the two joined conflicts in `foundations/decisions.md` and
`foundations/invariants.md`. Step 3 found nothing to correct, so no further commit exists. Line
endings: every file stayed LF, the rewriting went by bytes.

## The map as applied

| Old | New | Question |
|---|---|---|
| D-214 | D-222 | What does a request for a password-reset link answer? |
| D-215 | D-223 | Does a request for a password-reset link have a limit of its own per client address? |
| D-216 | D-224 | What form does a password-reset link take? |
| D-217 | D-225 | What does the form „Ustaw nowe hasło” hold, and how does it end? |
| D-218 | D-226 | How does the route that sets a password by a link check its request and bound its password work? |
| D-219 | D-227 | Which messages does a password reset send, and what do they say? |

43 occurrences on 39 lines of 14 tracked files, found by `git grep -lE 'D-21[4-9]' HEAD -- .`, the
list the handoff gives and no other file. After the commit no tracked file named D-214 to D-219,
and `foundation_check.py` gave 0 errors (exit 0) before the merge.

Choice: one regular-expression pass with the map as a table, instead of six replacements highest
first. A single pass cannot meet its own output, so the order the handoff gives is not needed; way
rejected: six sequential replacements, same result with more steps. It was run dry first (the
same 43 counts), then applied. Cost if wrong: none left, see the check of step 4.

No foundation skill changed meaning here: the renumbering is the one the handoff orders. I read the
`record-decision` and `record-invariant` skills, `way_of_working.md`, `rules.md` and the decisions
template. Their steps of asking and showing the human were not taken: the handoff delegates the
choices and the joining settles nothing new.

## Conflicts and how each was joined

1. `foundations/decisions.md`, one region at the end of the file, empty on the base. Each side
   appended its own new entries. Joined with main's D-214 to D-221 first and this task's D-222 to
   D-227 after them, each block byte for byte as its side holds it.
2. `foundations/invariants.md`, one region before *Withdrawn identifiers*, empty on the base. Joined
   the same way: `solved-map-manual-run`, `resurrection-renewal`, `death-settled-once`, then
   `password-reset-verified-email`, `password-reset-link`, `password-reset-ends-sessions`. The
   invariants carry no number, so the order is my choice; it follows the decisions. Way rejected:
   this task's first; cost if wrong: none, the file has no order of meaning.

**No entry was changed by both sides.** I parsed every entry of both files at the base, this branch,
main and the merge. Two entries showed as changed on both sides, and neither really was: D-213 by
one trailing blank line, and `save-version` because it stood last before the *Withdrawn identifiers*
table in my parse. So no entry needed writing anew, and every entry of the merge equals its side's
wording. Counts: decisions 227 = 213 + 8 + 6; invariants 106 = 100 + 3 + 3. The one reported
mismatch, `death-settled-once`, is the same artefact of my parse: on main it is the last entry and
so took the table with it.

**Entries whose meaning the joining changed:** none, so no Polish sentence is owed.

## Step 3 — what merged cleanly and no longer fits

Nothing needed correcting.

- `src/browser/styles.css`: main adds `.trip-result.danger`, `.team-member-generation` and
  `.team-member-resurrection`; this task adds `.form-note`, `.account-form:only-child` and
  `.account-form-switch`. No selector overlaps, and none of main's reaches the account forms.
- `tests/view/account-screen.test.mjs`: both sides' tests stand and ran (52 tests; main's clock tick
  test and this task's password-reset tests appear in the log). This task's tests build their saved
  game states through `saveOf` with main's `VERSION = 2`, and name no literal version.
- Save version, D-206 and D-210: main raises `SAVED_GAME_VERSION` to 2 and neither entry names a
  number. `version: 1` in `tests/transport.test.mjs` and `tests/account-storage.test.mjs` is a number
  the server only stores and compares (D-210), never the game's shape, and this task adds no reading
  of the shape on the server.
- D-44, D-96, D-211: changed by this task. Main's new entries do not name them in *Relations*. Main's
  D-04 cites D-211 for the state kept in the page's memory, and this task's D-211 only adds a password
  reset to what ends a session, so both stand. D-225 and D-96 keep the game unbuilt while the form
  stands, so main's clock and headquarters lines do not run there.
- D-203: neither side changed it. This task's D-138 reaches it only through D-211.
- D-96 and main's D-221: a state refused for an unsettled death falls under D-96's „of a shape the
  game does not admit”. Main left D-96 so, and this task's edit of D-96 does not touch that clause.
- D-112, schema version 4: main changes no server file.
- `guidelines/`: main changes none, so the numbers in its tables are this task's and carry the map.
  The route counts in `testing.md` (seven, eight, nine) stand, main adding no route. The four cases of
  `save-version` it names by title exist in `tests/sim/saved-game.test.mjs`, and no guideline or
  foundation entry cites the test main renamed („…is saved at once, settled”).
- `foundations/glossary.md`: main adds `resurrection` and `generation number`; D-222 to D-227 use
  neither word. The *Rejected* of D-112 says „a generation column on accounts”, a counter of an account
  that was not chosen, which the term's entry does not mean; it is left as it stands.
- `package-lock.json` did not change, so `npm ci` was not run. `stryker.config.json`: main adds one
  test file to a list of `tests/sim`; this task touches neither.
- Process pin: `.the-way` at `a8dfe8a` in the gitlink and in the checkout after the merge.

## Step 4 — what the numbers mean now

- Every line of the merge naming D-214 to D-221 equals a line of `origin/main` (16 lines each, `cmp`
  equal after sorting), all in `foundations/`, so each means main's entry.
- Every line naming D-222 to D-227 equals a line of `d2e1c3b` (39 lines each, `cmp` equal), so each
  means this task's entry.
- Headings stand in number order from D-213 to D-227 with one heading each.
- I read the hits of `foundations/decisions.md` outside the two blocks, whose lines the tool had
  hidden as too long: D-44 → D-222, D-96 → D-225, D-105 → D-222 and D-223, D-160 → D-225. Each fits.

## Checks

Run on the staged merge, whose tree `08ca3eb` is; the output is in
`.runs/task-cycles/reset-hasla/reports/37-checks.log`.

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors; again 0 errors, exit 0, on the commit |
| `npm run typecheck` | 0 | |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 52 tests, 52 pass |
| `npm test -- tests/view/password-reset.test.mjs` | 0 | 2 tests, 2 pass |
| `npm test -- tests/http.test.mjs` | 0 | 66 tests, 66 pass |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, OK |

**Did not run:**

- the full gate, `npm test` with no argument: the handoff leaves it to the orchestrator. Every other
  test file, among them `tests/sim/*`, `tests/view/clock.test.mjs`,
  `tests/view/headquarters.test.mjs`, `tests/view/trip.test.mjs`, `tests/transport.test.mjs`,
  `tests/account-storage.test.mjs`, `tests/account-api.test.mjs` and `tests/account-mail.test.mjs`,
  has therefore not run on the merge;
- no look at a screen in a browser, the kitchen-sink page included; `ui_check.md` was not read: the
  merge adds nothing of its own to a screen, and the styles were compared by selector only.

## Own-work check

Requirement my work most likely misses: a mention that means the wrong side's entry, since the
renumbering and the merge both pass the foundation check whichever entry a number means. Check: the
line-by-line comparison of step 4 against each side's commit. It showed no line outside its side.

## Reaches beyond the handoff

- `foundations/decisions.md`, D-203, D-204 (partly), D-206, D-210, D-211, D-212: named or close to
  what step 3 names, read for its comparison.
- `foundations/glossary.md` diff of main: to see whether main's terms meet this task's wording.
- `.the-way/elements/common/way_of_working.md`, `.the-way/elements/common/rules.md`,
  `.the-way/elements/decisions/template.md`, both elements' skills: for the entries touched.
- `guidelines/coding-saved-game.md`, lines 85 to 104; `guidelines/testing.md`, lines 145 to 213: for
  the numbers of step 3.
- `scripts/test.py`: how a single file runs.

## Searches not found or unclear

- „The numbers in `guidelines/` tables”: unclear whether the handoff means decision numbers or counts.
  I checked both.
- The old numbers D-214 to D-219 still stand, in this task's meaning, outside the tracked files:
  in 43 files under `.runs/task-cycles/reset-hasla/` (`cycle.md` 10 times, the reports, this handoff)
  and, in history, in the archived cycle record of commit `f53c833` under
  `docs/task-cycles/reset-hasla/`. They now collide with main's entries of those numbers for a reader
  of those files. I left them: they are outside the handoff's reach, and the history stays. The
  orchestrator holds `cycle.md`, and the next archived record is where this would carry on.
- The vault's folder `Notes/Projects/(P) Loop` names none of D-214 to D-219; the same search for D-200
  to D-209 hit 41 times, so the search works.

## Problems

None observed. The handoff's facts held: head `fdfbc62`, target `4ed8fcd`, no mention at the base,
conflicts in the two files only, pin unmoved.
