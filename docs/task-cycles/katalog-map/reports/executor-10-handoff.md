# Handoff - executor of Slice 10, task `katalog-map`

You are the executor of one slice of a planned change in a task cycle of the-way. The person who requested the cycle
has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go
to the orchestrator, never to the human.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
  The slice's base is commit `eed49524` (the head when you start). Commit your work on this branch, by path
  (`git add <path>...`, never `-A`, `.` or `-a`), messages in English in the repository's style (see `git log -8`),
  at your boundary. Push nothing to the product repository.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), variant "a slice, or the retry of a slice". Read it
  whole; read a file it names only when the step that names it comes. Class of model chosen for you: strongest.
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
- Your directory for working copies: `.runs/executor-10/`.
- Report path: `.runs/task-cycles/katalog-map/reports/executor-10-report.md`. The report file is the input of the cycle's
  scripts (`task-cycle/remarks_check.py` reads it), the case Claude Code's refusal of files named `report...` leaves
  open. First line: your status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`). It
  holds: each check with its command and exit code, your own-work check, the commits, **Unread material**,
  **Searches not found or unclear** (each `none` or the items). Return status, commits, a one-line check result naming
  what failed or did not run, the report path, questions, Unread material and Searches not found or unclear.
- `cycle.md` and the other files of `.runs/task-cycles/katalog-map/` (other agents' handoffs, reports, findings) are
  not yours to read unless this handoff names them.
- Screenshots that you show to the human go where D-418 and D-419 settle (see the plan's last section for the
  directory, branch and what to check before pushing); never into the repository, never into your report as files.

## Additions for Slice 10 from the orchestrator

- Slice 9 (commit `eed49524`) made `src/browser/view/map-catalog.tsx` and wired it into `maps-screen.tsx`; read its report
  `.runs/task-cycles/katalog-map/reports/executor-9-report.md` (concerns: the fold row is `disabled` while a search or a pick holds
  the group open; the rule `.maps-list-solved` in `src/browser/maps-screen.css` is unused now and goes in this slice; the region name of
  the fold row comes from the header text). The rows have no rules of their own yet: the look is yours.
- This slice is the one that serves the task's acceptance criterion: "On the set of screenshots of the screen Mapy of the old Loop and
  of loop2 the human does not name the old Loop as the more legible". The two screenshots of the old Loop are
  `the old Loop's screenshot of the Maps screen in the author's notes` and `.../loop_03_mapa_skraj.png`
  (window 1600 x 1000, 31 October). Look at them with the image reading tool first. Your loop2 screenshots are made at the same
  window size and in a state as like theirs as the game gives (a new game; and the Skraj lasu card picked), plus the other states of your
  slice's *Goal*. D-418: the old Loop's two screenshots may be put in the screenshots repository beside yours (copy them into your
  directory of that cycle, as the decision says; they are the old game's, a public product).
- Screenshots go where D-418 and D-419 settle (see the plan's last section: repository `mariusznazar/screenshots`, directory
  `loop2/katalog-map/`, branch `loop2/katalog-map`; earlier pushes of the cycle are on that branch - fetch it and add to it,
  never force-push, never `main`). Before you push, look at each image and keep out any email address, account name or other personal
  datum. Report each file's link as D-418 gives it. If `gh` fails, keep the files in your `.runs/executor-10/` directory and say so.
- Do not touch the sections of `guidelines/styleguide-browser-view.md` (Slice 12 writes the section of the screen Mapy), nor any
  token value.
- In your report: for each of the screenshots, in plain words, what the old Loop does better or equal and what loop2 does better;
  the human reads the pair; name each place the catalog does less well than the old one. Say in the report, concretely, what you left
  of the old Loop's look and why (word, proportion, spacing, arrangement).

## Your slice, copied word for word from the plan

### Slice 10 — The look of the catalog in both layouts, checked in the game and shown beside the old Loop

- **Goal:** The catalog has its own rules in `src/browser/maps-screen.css`, on the design tokens (no new token; where a
  value is lacking the executor names it in the report and does not add it, `src/browser/AGENTS.md`): the rows in two
  lines with the state circle, name, short demand, facts and the creature's icon, the facts of „⊘” in the role `warning`,
  the headers of the regions with their counters, the search field and the three tabs, the folded row of the solved maps,
  the dashed empty places of „Postęp”, the picked row with its text in `text-strong` and a bar in `selected` at its left,
  a row under the pointer on `highlight`; the rules of the phone layout in a block `@media (width < 1280px)` after those of
  the computer layout, every control at the touch minimum, nothing scrolling to the side or out of its frame at 360 px
  (D-396, D-282). The old Loop is a threshold, not a pattern (Q1, part 2): the executor may leave its look — words,
  proportions, spacing, arrangement — within what the human chose in Q1 and says in the report what it left and why, and
  does not reach for a variant the human did not choose; where the look needs a change in the markup of
  `map-catalog.tsx` it makes it with the case of `tests/view/map-catalog.test.mjs` that holds it. The change is
  checked in the running game as `loop2-play` gives ("Check the phone layout" included), in both layouts, with each of
  the three views, a search that finds and one that finds nothing, a folded and an unfolded region, and a picked map;
  the screenshots for the request are made at a window of 1600 × 1000 — the state of a new game beside the old
  `loop_02_mapy.png`, and the state with a map picked beside `loop_03_mapa_skraj.png`, in a state as like the old one as
  the game gives — and for each of the three views and for the phone layout at 360 px, kept where D-418 and D-419 settle
  and nowhere in the repository (`ui_check.md`). The report names each place the catalog does less well than the old
  Loop's, so that the human sees it with the pair.
- **Change:** `src/browser/maps-screen.css` · `src/browser/view/map-catalog.tsx` · `tests/view/map-catalog.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:32-32` To do 5 · `.runs/task-cycles/katalog-map/task.md:35-35` To do 8 · `.runs/task-cycles/katalog-map/task.md:40-40` Acceptance criterion · `.runs/task-cycles/katalog-map/task.md:44-55` Q1 · `.runs/task-cycles/katalog-map/task.md:109-117` the pair of screenshots · `.runs/task-cycles/katalog-map/task.md:124-127` Context (the old screen and its spec, D-325) · `foundations/decisions.md:1668-1696` D-418 and D-419 · `foundations/decisions.md:4645-4675` D-282 · `foundations/decisions.md:5509-5528` D-396 · `foundations/decisions.md:10140-10164` D-325 · `foundations/decisions.md:10277-10297` D-331 · `foundations/decisions.md:4853-4866` D-421 · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` · `.the-way/task-cycle/change/ui_check.md` · `src/browser/maps-screen.css`. The file src/browser/view/map-catalog.tsx that Slice 9 makes, whole (it does not exist at the plan's base). Outside the repository, read-only, not counted by the size script: the file src/components/probe/MapCatalog.tsx (about 13.7 KB, for its classes of look) of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out, and the old game's two screenshots loop_02_mapy.png and loop_03_mapa_skraj.png in the author's notes folder the author's folder of the old Loop's screenshots.
- **Model:** strongest — the look and arrangement of the catalog are designed here and judged against the old game's screenshots, the acceptance criterion
- **Risk:** none
- **Checks:** `npm test -- tests/view/map-catalog.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/invariants/test_design_token_sources.py` · `npm run --silent typecheck` · `npx prettier --check src/browser/maps-screen.css src/browser/view/map-catalog.tsx tests/view/map-catalog.test.mjs` · the browser check in both layouts with the measurements of `loop2-play` ("Check the phone layout": nothing scrolling to the side, nothing out of its frame, no control under the touch minimum)
- **Depends on:** Slice 9 · Foundation entries (D-325, D-331)


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
