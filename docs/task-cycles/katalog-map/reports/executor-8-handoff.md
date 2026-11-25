# Handoff - executor of Slice 8, task `katalog-map`

You are the executor of one slice of a planned change in a task cycle of the-way. The person who requested the cycle
has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go
to the orchestrator, never to the human.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
  The slice's base is commit `3e3c38a8` (the head when you start). Commit your work on this branch, by path
  (`git add <path>...`, never `-A`, `.` or `-a`), messages in English in the repository's style (see `git log -8`),
  at your boundary. Push nothing to the product repository.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant "a slice, or the retry of a slice". Read it
  whole; read a file it names only when the step that names it comes. Class of model chosen for you: cheaper.
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
- Your directory for working copies: `.runs/executor-8/`.
- Report path: `.runs/task-cycles/katalog-map/reports/executor-8-report.md`. The report file is the input of the cycle's
  scripts (`task-cycle/remarks_check.py` reads it), the case Claude Code's refusal of files named `report...` leaves
  open. First line: your status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`). It
  holds: each check with its command and exit code, your own-work check, the commits, **Unread material**,
  **Searches not found or unclear** (each `none` or the items). Return status, commits, a one-line check result naming
  what failed or did not run, the report path, questions, Unread material and Searches not found or unclear.
- `cycle.md` and the other files of `.runs/task-cycles/katalog-map/` (other agents' handoffs, reports, findings) are
  not yours to read unless this handoff names them.
- Screenshots that you show to the human go where D-418 and D-419 settle (see the plan's last section for the
  directory, branch and what to check before pushing); never into the repository, never into your report as files.

## Additions for Slice 8 from the orchestrator

- Slices 1-7 are done (HEAD `3e3c38a8`). The five maps are in the data (Slice 3); each map's `region` is in `maps.ts`
  (`Las`), and the region list there gives the order of the catalog's regions. Slice 3's report
  `.runs/task-cycles/katalog-map/reports/executor-3-report.md` says how.
- Two of the 14 citation errors of the foundation check are yours: `tests/view/map-lines.test.mjs:198` and `:237` quote a sentence
  of D-327 that the foundation entries changed (D-327 now says the card departs from the predecessor's in five things, not four).
  Re-quote the new sentence (the quotation must begin a binding sentence of D-327 as it stands in `foundations/decisions.md`; the
  new D-327 text is there) and run `python -B .the-way/elements/common/foundation_check.py` on its own until it lists none for
  `map-lines.test.mjs`. `tests/view/map-lines.test.mjs:31` (a test of the list of maps that now sees five ids) is yours too.
  The remaining citation errors belong to Slice 9; the flag `--skip-test-citations` does not hide them.
- The catalog's lines take the creature's icon from the data: the icon name of a creature stands in `src/browser/sim/data/creatures.ts`;
  read how `map-lines.ts` obtains it today and do the same; no map, resource or creature is named by its identifier in the view
  code (`content-identifiers`).
- The old game's files are read with `git -C the old game's repository show feat/archetypes:<path>` (never checked out), as your
  *Read* says. The old catalog's design differs from loop2's data model in places: where it differs, follow the task's To do 5
  (copied in your *Read*) and name the difference in your report.
- Read all the guidelines your *Read* names, whole, before you write code (an earlier cheap-class executor did not and its report
  said so).

## Your slice, copied word for word from the plan

### Slice 8 — The lines of the catalog, as pure functions

- **Goal:** A new module `src/browser/view/catalog-lines.ts` of pure functions, with no DOM, gives the catalog's
  content from the game's data and the solved maps, in the old game's way (its spec chapters 2–5, `MapCatalog.tsx` and
  `mapFacts.ts`), for the component of Slice 9: the regions in the order of the data's list, each with its maps and its
  counter („Las · 1 z 5”, the solved maps of the region over all its maps in the data, the not yet opened ones included);
  the open maps of a region, the solved ones apart; the row of a map with its state, its name, its facts in the old
  order — the demand (whole hours of the streak, „N do pokonania”), what the map takes („⊘ wnosisz N” in the role of a
  warning, `⊘` on the first only, „⊘ wnosisz 0” at an entry cap of 0), the terrain („bez ognia N min” where the map
  chills, the step only where it differs from the usual step of D-333) — and the icon of the creature that attacks
  there, from the data; the search, which finds the open maps whose name or whose resource's name holds the typed
  text, ignoring case, not folding Polish letters, with the text trimmed, an empty text finding all, and the sentence
  „Nic nie pasuje do „{zapytanie}”.” where nothing fits; the three views — „Dokąd” (per region the open unsolved maps,
  then the solved ones folded under one row that counts them, unfolded by a search and, for the region of the picked
  map, always), „Co daje” (groups per resource of the open maps, the resource that fewest maps give first, in the group
  the solved maps first, each row's „≈ 8 z 25 · po 15 · +1 co 60 min” or „nie wraca” in the role of a warning, from
  `expectedTiles`) and „Postęp” (per region the open maps and one empty place with no name for each map of the region
  not yet opened, none while a search is typed; a region with nothing open not at all). Where the old game's order or
  words are not clear, the executor follows its code. `tests/view/map-lines.test.mjs` is brought to the five maps. The
  module names no map, resource or creature (`content-identifiers`).
- **Change:** `src/browser/view/catalog-lines.ts` · `tests/view/catalog-lines.test.mjs` · `tests/view/map-lines.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:32-32` To do 5 · `.runs/task-cycles/katalog-map/task.md:44-55` Q1 · `.runs/task-cycles/katalog-map/task.md:65-69` Q3 · `.runs/task-cycles/katalog-map/task.md:127-127` D-325 and the catalog's counter, in Context · `.runs/task-cycles/katalog-map/task.md:168-171` D-325, D-331, D-134 and D-149 in *Decisions in play* · `.runs/task-cycles/katalog-map/task.md:185-185` D-333 · `foundations/decisions.md:5900-5918` D-134 · `foundations/decisions.md:5970-5984` D-149 · `foundations/decisions.md:5628-5667` D-24 · `foundations/decisions.md:10140-10164` D-325 · `foundations/decisions.md:10277-10297` D-331 · `foundations/decisions.md:10316-10339` D-333 · `foundations/invariants.md:236-246` content-identifiers · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/view/map-lines.ts` · `src/browser/view/counted-name.ts` · `src/browser/sim/map-card.ts` · `src/browser/sim/data/maps.ts` · `src/browser/sim/data/resources.ts` · `tests/view/map-lines.test.mjs`. Outside the repository, read-only, not counted by the size script (about 13.7 KB, 2.4 KB and 16 KB): the files src/components/probe/MapCatalog.tsx, src/components/probe/mapFacts.ts and docs/superpowers/specs/2026-09-07-mapy-katalog-i-strona-design.md (chapters 2–5) of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out.
- **Model:** cheaper — carries the old game's catalog, which is settled, into pure functions with tests
- **Risk:** none
- **Checks:** `npm test -- tests/view/catalog-lines.test.mjs` · `npm test -- tests/view/map-lines.test.mjs` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/catalog-lines.ts` · `npx prettier --check src/browser/view/catalog-lines.ts tests/view/catalog-lines.test.mjs tests/view/map-lines.test.mjs`
- **Depends on:** Slice 3 · Foundation entries (D-325, D-149, D-24)


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
- After Slice 3 (commit `e0342c5d`; measurement: no reference program solves a seed of Las — matecznik; best program of Las —
  wataha 46.8 % against 92.4 % of Las — głębiej; no number changed): the new field of `MapDef` that names the creature of the
  record is `recordCreature` (Slice 11 reads it). Owners of the tests that fail after Slice 3: `tests/sim/saved-game.test.mjs:2885`
  (a case that uses `"bear"` as an id absent from the data; the bear is in the data since Slice 2) — Slice 6, whose *Change* now lists
  that file, one-line change to an id the data lack; `tests/view/end-window-lines.test.mjs:428` and `tests/view/end-window.test.mjs:570`
  (the end window after Las — głębiej now offers "Otwarte: Las — wataha →") — Slice 9, whose *Change* now lists both.

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
