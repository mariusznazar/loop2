# Handoff - executor of Slice 3, task `katalog-map`

You are the executor of one slice of a planned change in a task cycle of the-way. The person who requested the cycle
has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go
to the orchestrator, never to the human.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
  The slice's base is commit `b41798ba` (the head when you start). Commit your work on this branch, by path
  (`git add <path>...`, never `-A`, `.` or `-a`), messages in English in the repository's style (see `git log -8`),
  at your boundary. Push nothing to the product repository.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant "a slice, or the retry of a slice". Read it
  whole; read a file it names only when the step that names it comes. Class of model chosen for you: same.
- Stage and boundary: make this slice only (its *Goal* below), run its *Checks* (focused checks; commands and exit codes
  go into your report), do the own-work check, commit, return. NEVER run the product's full gate (`npm test` with no
  file argument, or `python -B scripts/test.py` whole); the cycle's orchestrator runs it.
- Before reading or changing product code read `guidelines/coding.md`; before tests `guidelines/testing.md`; for
  `browser-view` files `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md` (all whole, as the *Read*
  below names them). The language of code and commit messages is English; strings the game shows stay Polish.
- Frozen task: `.runs/task-cycles/katalog-map/task.md`. Plan: `.runs/task-cycles/katalog-map/plan.md` - the section of
  your slice is copied below; its *Choices* and its last section *Orchestrator's answers and additions* bind you too
  (read them there). There is no spec. Foundation entries were written before slice 1 in commit `612476a6`; the line
  numbers of `foundations/*.md` in the *Read* below were counted at the base and have moved - find each entry by its
  heading (`### D-nnn -`, `## <invariant-id>`). New decisions are D-448 and D-449.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` is an allowed focused check;
  without that flag it lists 14 known citation errors whose owners are named in the plan (Slices 8 and 9); report any
  other error.
- Tests the plan leaves failing at this slice's base, with their owners: `tests/balance/overlay.test.mjs` (Slice 5),
  `tests/view/map-lines.test.mjs` (Slice 8), `tests/view/maps-screen.test.mjs`, `tests/view/account-screen.test.mjs`
  and any other file of `tests/view/` that fails only because the data hold five maps (Slice 9) - they begin to fail
  after Slice 3. A listed test that fails as expected is no failure of yours; name it in your report.
- Your directory for working copies: `.runs/executor-3/`.
- Report path: `.runs/task-cycles/katalog-map/reports/executor-3-report.md`. The report file is the input of the cycle's
  scripts (`task-cycle/remarks_check.py` reads it), the case Claude Code's refusal of files named `report...` leaves
  open. First line: your status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`). It
  holds: each check with its command and exit code, your own-work check, the commits, **Unread material**,
  **Searches not found or unclear** (each `none` or the items). Return status, commits, a one-line check result naming
  what failed or did not run, the report path, questions, Unread material and Searches not found or unclear.
- `cycle.md` and the other files of `.runs/task-cycles/katalog-map/` (other agents' handoffs, reports, findings) are
  not yours to read unless this handoff names them.
- Screenshots that you show to the human go where D-418 and D-419 settle (see the plan's last section for the
  directory, branch and what to check before pushing); never into the repository, never into your report as files.

## Additions for Slice 3 from the orchestrator

- Slices 1, 2 and 2b are done (HEAD `b41798ba`): the bear is in `CREATURES` (`src/browser/sim/data/creatures.ts`) with a
  field `nameWith` and in `SCENE_CREATURES`; read `.runs/task-cycles/katalog-map/reports/executor-2-report.md` for how the
  creature is written. The bear's id in the data is `bear`.
- The measurement step (To do 6) is part of this slice and is no run of the product's gate: `npm run build` then
  `npm run --silent balance -- progression ...` with its flags as `.claude/skills/loop2-balance/SKILL.md` gives them
  (the mode reads the game's maps; it takes no overlay). It may take many minutes: run it in the background with output
  to a file under your `.runs/executor-3/` directory and wait for it; do not start more than one measurement at a time.
  Keep the table as the skill prints it (labels `P1`, `P2`, ...; never the programs' content, never in the repository,
  D-429) and copy the final table, and the one before it if you changed numbers, into your report file word for word:
  the cycle's request will quote it. Programs, the label key and your trials stay with you (D-429).
- The stop rule of your *Goal* is binding and ordered. If any reference program solves one seed of Las — matecznik,
  return `blocked` with the table and make no commit that changes that map's numbers (you may leave the other work
  committed); the orchestrator asks the human. The wolf pack's numbers change only as the *Goal* allows, one step at a
  time (first the number of attacks to beat, then the chance or the quiet time), remeasuring after each, and
  `solvingText` is rewritten by hand to agree with the numbers.
- `tests/view/` files that fail after your change only because the data hold five maps: list each in your report with
  the reason (owners are Slices 8 and 9; do not edit `tests/view/`). `tests/balance/overlay.test.mjs` is expected to
  fail (owner Slice 5): the overlay `balance/overlays/forest-pack.json` still adds a map that is now in the data; you
  do not edit it.

## Your slice, copied word for word from the plan

### Slice 3 — Region in the data and the two new maps, with the check of the balance instrument

- **Goal:** A map's data carry its region: `maps.ts` holds a list of regions, in the order the catalog shows them
  (`Las` alone for now), `MapDef` gets `region` of that list, and `forestEdge`, `forest` and `forestDeep` are in
  `Las`. `MapDef` also gets an optional field naming the creature whose health the record of Slice 11 shows (the
  view names no map and no creature of its own, `content-identifiers`). Two maps are added, both in `Las`: `forestPack`
  („Las — wataha”) after `forestDeep`, with the numbers of `balance/overlays/forest-pack.json` (grid 5 × 5, entrance
  drawn, 7 °C, step 5, the four resources of Las — głębiej, moss included, a wolf with chance 0.015 a minute and 90
  minutes of quiet, solved by a streak of 540 with six beaten attacks, opened by `forestDeep`), and `forestLair`
  („Las — matecznik”) after it, with the numbers of `forestLair` and `LAIR_RESOURCES` of the old game (grid 6 × 6,
  entrance drawn, 7 °C, step 5, entry cap 0, a bear with chance 0.01 and 180 minutes of quiet, solved by a streak of
  600 with one beaten attack, opened by `forestPack`), carrying the field that names the bear. The sentences
  `solvingText` and `completionText` of both are written by hand in the form of those of `forestDeep`. The tests of
  `tests/sim/` and `tests/balance/` that name the maps or walk `MAPS` are brought to the five maps. The check of the
  maps is made with the instrument (`loop2-balance`, `progression`) on the data of this branch, every reference
  program on seeds 1–500, and the table is kept for the report as the skill gives it (labels `P1`, `P2`…, no
  program's content, never written into the repository, D-429). The order of the stops is: (1) if any reference
  program solves one seed of Las — matecznik, the executor makes no change of numbers, returns `blocked` with the
  table, and the cycle asks the human (the exception of D-438 does not stand); (2) if the best program of Las —
  wataha solves no seed, or solves a share not smaller than the best program of Las — głębiej, the executor changes
  the wolf pack's numbers only as far as that needs — first the number of attacks to beat, then the chance or the
  quiet time — rewrites its `solvingText` to agree, measures again, and reports the change and the table before and
  after, for the request; (3) if `first-exploration-discovery` fails on a new map, the executor changes the fewest
  numbers of that map's resources that make it hold and says so. No other number of the new maps is tuned to a result.
  After this slice the tests `tests/balance/overlay.test.mjs` (Slice 5 owns it), `tests/view/map-lines.test.mjs`
  (Slice 8 owns it) and the places of `tests/view/maps-screen.test.mjs` and of any other file of `tests/view/` that
  fail only because the data hold five maps (Slice 9 owns them) may fail; the report lists each file of `tests/view/`
  that fails and why.
- **Change:** `src/browser/sim/data/maps.ts` · `tests/sim/data.test.mjs` · `tests/sim/map-card.test.mjs` · `tests/sim/discovery.test.mjs` · `tests/balance/progression.test.mjs` · `tests/balance/cli.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:28-29` To do 1 and 2 · `.runs/task-cycles/katalog-map/task.md:33-33` To do 6 · `.runs/task-cycles/katalog-map/task.md:76-90` Q5 and Q6 · `.runs/task-cycles/katalog-map/task.md:135-142` Context (moss, the pack's measurement, niezmienniki) · `.runs/task-cycles/katalog-map/task.md:157-160` the new decisions and D-438 in *Decisions in play* · `.runs/task-cycles/katalog-map/task.md:172-172` D-24 · `.runs/task-cycles/katalog-map/task.md:178-180` D-18, D-429, D-388 · `foundations/decisions.md:306-330` D-18 · `foundations/decisions.md:5628-5667` D-24 · `foundations/decisions.md:5939-5968` D-136 · `foundations/decisions.md:6032-6049` D-388 · `foundations/decisions.md:6113-6126` D-438 · `foundations/decisions.md:6854-6876` D-142 · `foundations/decisions.md:8734-8747` D-187 · `foundations/decisions.md:12096-12111` D-428 · `foundations/decisions.md:12113-12126` D-429 · `foundations/invariants.md:1388-1396` first-exploration-discovery · `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:1348-1366` first-map-stock and first-map-balance · `foundations/part_map.md:34-66` simulation · `foundations/part_map.md:128-139` balance-tools · `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md` · `.claude/skills/loop2-balance/SKILL.md` · `balance/overlays/forest-pack.json` · `src/browser/sim/data/maps.ts` · `tests/sim/discovery.test.mjs:330-370`. Outside the repository, read-only, not counted by the size script (about 18 KB): the file src/sim/data/maps.ts (forestLair, forestPack, LAIR_RESOURCES, FOREST_RESOURCES) of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out.
- **Model:** same — decides from a measurement whether the wolf pack's numbers stand, and holds the stop that returns to the human
- **Risk:** none
- **Checks:** `rg -l "forestDeep|Object\.(keys|values|entries)\(MAPS\)" tests/sim tests/balance`, then one `npm run --silent build` and `node --test` on the files it lists (the sim and balance tests that name the maps; the owners of the expected failures are in the Goal) · `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/map-card.test.mjs` · `npm test -- tests/balance/progression.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run --silent typecheck` · `npm run --silent balance -- progression --out .runs/<its directory>/progression.md` (the ordered stops above) · `npx eslint --max-warnings 0 src/browser/sim/data/maps.ts` · `npx prettier --check src/browser/sim/data/maps.ts`
- **Depends on:** Slice 2 · Foundation entries (D-24, D-438, the two new decisions)


## Plan section: Choices (word for word)

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The wolf pack takes the resources of Las — głębiej, moss and fiber included, as `forest-pack.json` has them and as the 46.8 % measurement of 2026-11-25 had them | no moss: the table's default, but the measurement would then not describe the map | Small: the resources are no requirement of the game (Q5); the check of Slice 3 measures what is entered |
| Region: a list of regions in `maps.ts` fixes their order, `MapDef.region` is one of its names, so a typo is a type error | the region derived from a map's name; a free text and the order of first appearance | Low: one more entry in the list when the next region comes; a free text would take a typo for a new region |
| The data of a map name the creature whose health the record shows (an optional field of `MapDef`, set on the lair alone) | the view names Las — matecznik or the bear (breaks `content-identifiers`); a flag on the creature (which then shows the number on every map that creature attacks) | Low: a second map with the bear shows nothing until its data say so |
| A judging reports the damage per seed in `Judging`, read from the map run's state after each minute of `judgeOnSeeds`; the game state, the map run and the saved game get no field | a field on the map run that counts the damage (changes the saved game's shape, the file `saved-game.ts` at a trust boundary, the invariant `save-version` and the byte for byte replay of the instrument, for a number only a judging needs) | Low: if the map run's own record were wanted later the judging's reading is a few lines to move |
| The record lives in the cache of `judging-cache.ts` as a second family of keys with its own version in the key, one value for each account, game and map, holding the creature's health and blow beside the number | the number inside `JudgingRecord` under the key of the triple (the record would go with the program and the character, against Q7 a, and raising the key's version would hide every judging stored now); a new file for the storage (a new trust boundary file and a change of the part map for a number) | Medium: a later change of the form of the record raises its own key's version and hides the stored records, as D-441 gives for judgings |
| The record is bound to the creature's health and blow alone, the two numbers the card shows | binding to the whole entry of the creature (its program too) | Low: a change of the bear's rules alone leaves an old record standing; the lasting storage is cleared with the game's other values on a new game |
| The case of a creature's name after „z” is a field of the creature's data | widening the rule in `now-lines.ts` that turns „wilk” into „wilkiem” (a second ending to guess for the next creature) | Low: one more field to fill for the next creature |
| `forest-pack.json` is deleted and its tests, the example of the skill and the control path move to `wasteland.json` | keeping the overlay (it would merge into the map in the data and the tests expect no such map); writing a new example overlay for a map not yet in the game | Low: the example of an overlay that adds a map is `wasteland.json` until a later map task adds another |
| The flag `solvable` of `balance/progression.mjs` (a best program at 20 % or more) and its constant `SOLVABLE_SHARE` are left as they are; Slice 5 changes the skill's reading, the table's own columns and sentence do not print the flag | changing the constant to "one seed or more" and the three cases of `tests/balance/progression.test.mjs` that name it (code and tests of the balance part that To do 9 does not ask for) | Medium: the field of the measurement's result and the skill's sentence disagree on a word until a later change; the concern is in the report for the orchestrator |
| The hours of a demand read whole („10 h”) and, where the streak is not a whole number of hours, in minutes | decimals of an hour | Low: all five maps are whole hours |
| The search ignores case by `toLowerCase`, trims the typed text and folds no Polish letter, as the old code does | a search that folds „ł” to „l” (the task says not to) | Low: none |
| The view, the typed text and the folded regions live in the state of the catalog component and end with the screen; the group of the picked map is unfolded in the drawing and not stored | storing them in the page's state (they would outlive the screen against To do 5) | Low: none |
| The order of the slices departs from the example of the styleguide (tokens before screens): no token, font or library is new, so the screens come straight after the data and the pure lines | the example's order with a slice of tokens | None: no value is lacking; where one is, Slice 10 names it and the human decides (`src/browser/AGENTS.md`) |
| Slice 3 and Slice 5 are two slices: the maps, the measurement and its stops first, the instrument's artefacts after; the tests of the balance part that a map added to the data breaks wait for Slice 5, with the owner named in Slice 3 | one slice for both (nine files, the measurement and the alignment under one review) | Low: for the span of one slice a balance test fails as expected |
| No slice moves code out of a file first: the code size check on the base reports 0 functions and files over a threshold, and the new catalog code stands in new files; `maps-screen.tsx` (626 code lines, `MapsView` 153) is only given a call in place of its list | a move-out slice before Slice 9 | Low: Slice 9 shrinks `MapsView`, and a review sees the growth of the file |
| The pictures, the creature's data and the case after „z” are three slices (1, 2, 2b), and the catalog is three (8 pure lines, 9 structure, 10 look) | one slice each for the bear and for the catalog (the guidelines of the browser view alone read about 100 000 tokens, and the executor of such a slice would be left too little for its files; the size check of the first draft said so) | Low: more handoffs; each slice is reviewed with the whole change, only Slices 1, 2 and 7 on their own |


## Plan section: Orchestrator's answers and additions (word for word)

## Orchestrator's answers and additions after the plan's review (provisional, not the human's approval)

- Foundation entries are written by one agent on the class `same` as the orchestrator's (reads decisions whole and
  judges wording against the task's quoted text); it needs network for the environment fact.
- Concern 1 (D-149 in *Foundation entries*): kept.
- Concern 2 (`SOLVABLE_SHARE`, `solvable` flag of `balance/progression.mjs`): left as the plan has it; the request
  says the flag and the skill's reading differ until a later change.
- Concern 3 (network): Slices 1 and the foundation entries' environment fact need it; the machine has network; an
  agent that has none returns.
- Concern 4 (screenshots): D-419 settles it — the agent that shows a screenshot pushes it itself to
  `mariusznazar/screenshots`, directory `loop2/katalog-map/`, on the branch `loop2/katalog-map` (never `main`), with
  the `gh` account of the human who owns that repository. Slices 4, 10 and 11 do it. Before pushing, the executor
  looks at each image and keeps out of it any email address, account name or other personal datum (a test account's
  display is fine); it reports the commit of the push and each file's raw link in its report.
- Concern 5 (size): the executors of Slices 1, 2 and 11 read guidelines whole as the plan says; none is split further.
- Concern 6 (which `tests/view/` files break with five maps): Slices 3 and 9 list them, as the plan says.
- Slice 4 may change no file; its mechanical check then accepts an empty range for that slice alone, and its report
  stands as its result.
- The executors run no gate (`npm test` with no file argument); focused checks only.
- After the foundation commit `612476a6` (written by the agent of *Foundation entries*): `python -B
  .the-way/elements/common/foundation_check.py` reports 14 errors, each a `decision:` line of a test that quotes a
  sentence of D-325 or D-327 that the entries changed: `tests/view/account-screen.test.mjs:4229` and `:4488` (D-325;
  owner Slice 9, whose *Change* now lists that file), `tests/view/map-lines.test.mjs:198` and `:237` (D-327; owner
  Slice 8) and `tests/view/maps-screen.test.mjs:221, 319, 321, 353, 355, 407, 409, 475, 556, 1042` (owner Slice 9). The
  new wording each must quote is in `foundations/decisions.md` (D-325 and D-327 binding sentences) and listed in
  `reports/foundation-report.md`, section on those citations. The slices of those owners bring the quotations to the
  new sentences and run the foundation check on its own until it lists none for their files.
- The line numbers of `foundations/*.md` in the slices' *Read* were counted at the base; the foundation commit moved
  them. An executor finds each entry by its heading (`### D-nnn —`, `## <invariant-id>`), which the plan names.
- New decisions D-448 and D-449 stand at the end of the section on maps in `foundations/decisions.md`.

## Working copies (the first paragraph of the cycle's rule, word for word)

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
