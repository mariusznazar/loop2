done with concerns

# Executor report - Slice 11 (task katalog-map): the record of the bear's damage in the row of Las — matecznik and on its card

Branch `task/katalog-map`, base `00b772a0`. Nothing pushed to the product repository. The full gate (`npm test` with no file) was not run.

## Commit

- `8ae831a9` feat: show the record of the most health a map's creature lost in one fight, among the facts of the row of Las — matecznik and on its card in „Czyha” (10 files, +749 -34).

Files: `src/browser/view/maps-entry.ts`, `src/browser/view/maps-screen.tsx`, `src/browser/view/map-lines.ts`, `src/browser/view/catalog-lines.ts`, `src/browser/view/map-catalog.tsx`, `src/browser/maps-screen.css` (+5, not in the plan's *Change*; see Adaptations), `tests/view/catalog-lines.test.mjs`, `tests/view/map-catalog.test.mjs`, `tests/view/maps-screen.test.mjs` (+1 line, not in *Change*; see Adaptations), `tests/view/maps-record.test.mjs` (new, 10 cases).

## What was made

- `map-lines.ts`: `recordCreatureOf(map)` (the creature the data name in `recordCreature`, or null), `recordLine(map, record)` = „{name}: {n} ze {health}” from the creature's data, null where the map names no creature or no record stands; `attackerLines(map, record = null)` gives the attacker the map names for the record an optional field `record` (absent otherwise, so the old expected objects stay equal).
- `catalog-lines.ts`: `CatalogInput.recordOf(mapId)`; a row's facts get the record last, `{ text, warning: false, role: "text" }` (`CatalogFact.role?: "text"`); `recordOf` is asked only for a map whose data name a creature.
- `map-catalog.tsx`: prop `recordOf`; the fact with `role: "text"` gets the class `maps-catalog-record`.
- `maps-screen.tsx`: new prop `readMapRecord(mapId)` of `MapsScreenProps`, read at each draw for the catalog and for the card; the card draws `record` as `<p class="maps-card-attacker-record">` inside the attacker's own item, under its odds line.
- `maps-entry.ts`: `readMapRecord` (creature of the map's data → `judgingCache.readRecord`) in `props()`; in the act of `judge`, in the same `if (!store.halted())` as `remember`, `offerRecord(map, creature, max(0, ...judging.creatureDamage))` for a map whose data name a creature.
- `maps-screen.css`: `.maps-catalog-record { color: var(--text); }` (the facts' container is `text-secondary`; the role of the number is `text`, D-440). No new token or role.

## Checks (commands and exit codes)

| Check | Command | Exit | Result |
|---|---|---|---|
| Screen | `npm test -- tests/view/maps-screen.test.mjs` | 0 | 50 pass |
| Map lines | `npm test -- tests/view/map-lines.test.mjs` | 0 | 11 pass |
| Catalog lines | `npm test -- tests/view/catalog-lines.test.mjs` | 0 | 13 pass (2 new) |
| Catalog | `npm test -- tests/view/map-catalog.test.mjs` | 0 | 13 pass (1 new) |
| Cache record | `npm test -- tests/view/judging-cache-record.test.mjs` | 0 | 70 pass |
| New file | `npm test -- tests/view/maps-record.test.mjs` | 0 | 10 pass |
| Content identifiers | `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 5 tests OK |
| Size of functions and files (not in *Checks*) | `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 OK |
| Token values (not in *Checks*) | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 OK |
| Typecheck | `npm run --silent typecheck` | 0 | clean |
| ESLint, five source files | `npx eslint --max-warnings 0 src/browser/view/maps-entry.ts src/browser/view/maps-screen.tsx src/browser/view/map-lines.ts src/browser/view/catalog-lines.ts src/browser/view/map-catalog.tsx` | 0 | clean (see the failing first run below) |
| ESLint, the four test files (not in *Checks*) | `npx eslint --max-warnings 0 tests/view/maps-record.test.mjs tests/view/catalog-lines.test.mjs tests/view/map-catalog.test.mjs tests/view/maps-screen.test.mjs` | 0 | clean |
| Prettier, five source files and four test files | `npx prettier --check ...` | 0 | clean |
| Foundation check, after `git add` of the new file | `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors (the 14 known citation errors are already gone at this base) |
| Foundation check, the allowed focused form | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | 0 errors |

A failing run that passed after a fix: the first ESLint run on the five source files exited 1 with one error, `@typescript-eslint/unbound-method` at `maps-screen.tsx:692` (`recordOf={props.readMapRecord}`); I changed it to `recordOf={(forMap) => props.readMapRecord(forMap)}`, and the rerun exited 0. After that change the tests above were all rerun (the table is the rerun).

None of the tests the plan lists as failing at this base (`tests/balance/overlay.test.mjs`, the Slice 8/9 view tests) failed; the view tests pass at this base.

### The tests were written after the code, not before

The handoff's rule is test first where it fits. I wrote the code first (the shape of `readMapRecord` and of the fact decided the tests) and then the tests, and show each test failing by a break of the code instead (restored, byte-compared with the good copy, rerun green):

| Break in the code | Run | Result |
|---|---|---|
| entry offers the last seed's damage instead of the largest | `npm test -- tests/view/maps-record.test.mjs` | exit 1: the "judging on the screen offers the largest damage" case and the "change of the program and loss of the character" case fail |
| entry offers the damage before `store.halted()` is checked | same | exit 1: "a judging after the store has halted leaves no record" fails |
| entry never offers the damage | same | exit 1: the same two cases as the first break fail |
| catalog drops `role: "text"` from the fact | same | exit 1: "a record of 24 ... in the role text" fails (class and colour) |
| catalog asks `recordOf` for every map, not only the map that names a creature | `npm test -- tests/view/catalog-lines.test.mjs` | exit 1: "the record is asked for only the map whose data name a creature" fails |

## Own-work check

Requirement most likely unmet: "it stands nowhere before the first judging on that map, and nowhere where the record was made at other numbers of the creature", and the entry's join (the damage of each judging reaches the record, the largest of twelve, unless the store halted). Checks:
- `tests/view/maps-record.test.mjs`: no number and no "0" on the screen before the first judging (the whole text of the page); a record at the bear's other health or other blow shows nothing in the row and on the card; a first judging that took 0 stands as "niedźwiedź: 0 ze 120" (D-440: "from the first judging"); a real judging on the screen (the real simulation, programs `forestSettledPatrol` and `forestDeepBest`) gives the record the largest of its twelve seeds; the expected number is that of `judgeOnSeeds` called apart from the screen, asserted non-zero and different for the two programs as a precondition; a second judging that took less leaves it, one that took more raises it; a change of the program (the judging's mark goes, the number stays) and the loss of the character leave it; a halted store leaves no record and stores nothing; a screen built anew on the same storage shows it again, another game's storage shows none; the rows of the four other maps show none whatever the cache holds under their ids.
- The numbers 24, 10 and 30 of the foundation's example are literals in the cases that offer a record to the cache directly. No reference program takes exactly 24, so the cases that judge on the screen use the simulation's own number (12 for `forestDeepBest`, 3 for `forestSettledPatrol` at this base, read from a probe, not hard-coded).
- Mutation in my head, beyond the five breaks above: the "ze" word, the order of facts (record last), the separator, the class on the card's line (colour equal to the odds line's is asserted) - covered by the first case; a record read once at the mount and not at each draw - covered by the "offered lower / higher" case, which changes the cache and calls `drawResult`.

## Walkthrough (the change alters what the player sees on the screen Mapy)

Game: `npm run local` in the worktree (`https://127.0.0.1:62336`), Playwright CLI, a made-up account at `example.test`; the state composed by `compose.mjs` from `.runs/executor-10/compose.mjs` (Ala-type character „Agent” with the full Understanding, the program `forestDeepBest`, `solvedMaps` the four maps before the lair, accepted by `loadSavedGame`, sent by the save request). Layouts: 1600 x 1000 and 1280 x 720 without touch, 360 x 740 with touch through `.playwright/cli.phone.config.json` (a new session each time, so each session judged anew: the record is stored in the browser's `localStorage`).

| Case | Layout | Verdict |
|---|---|---|
| Before the first judging: row facts "10 h · 1 do pokonania · ⊘ wnosisz 0 · bez ognia 33 min", no number in the row, none on the card | 1600 x 1000 | right (read from the page) |
| After the first judging of the program (a real click): row ends "· niedźwiedź: 12 ze 120", the card's „Czyha” holds "niedźwiedź: 12 ze 120" under the odds line; the two numbers equal the 12 the simulation gives for that program (probe of the same program, 12) | 1600 x 1000 | right |
| Role: the number's computed colour is rgb(212,212,216) (`text`), the other facts rgb(159,159,169) (`text-secondary`), the warning fact rgb(254,154,0) | 1600 x 1000 | right |
| Row at the narrow column: the number is the last fact and breaks to its own line, inside the row, no scroll to the side | 1280 x 720, no touch | right |
| Phone: number in the row and on the card; measurement `scrollsToTheSide` false, `contentWiderThanItsBox` [], `outsideTheWindow` [], `controlsSmallerThan48` [] | 360 x 740, touch (judged by a tap) | right |
| Reload: the record is read again from `localStorage` (key `loop2-judging-record-1\|...\|forestLair`, value `{"damage":12,"health":120,"strikeDamage":20}`: the number and the bear's two numbers, no address or name) | 1280 x 720 | right |
| Console | all | only the two ordinary entries (401 for the account before sign-in, 404 favicon) |
| Side observation | all | In „Co daje” the lair's row (a resource row) shows no number: the foundation names "its row" in the catalog's lists of maps („Dokąd”, „Postęp”); see Concerns |

Not checked: a second judging with a worse program, a program change and a character's death in the running game (covered at the level of the screen by the jsdom cases, on the real simulation); Firefox and Edge (D-396 by hand, separate session); the record at another account on the same browser; the lair map solved (the map cannot be solved with the reference programs at this base, the plan's measurement says so).

### Screenshots

`mariusznazar/screenshots`, directory `loop2/katalog-map/`, branch `loop2/katalog-map`, commit `df96af7bb60fb81be0999e9e626460dbcb9b9958` (pushed with the owner's `gh` account; no force; not `main`). Each looked at before the push: only the made-up character „Agent", the menu „Konto" is closed, no address shown.

- Computer layout, 1600 x 1000, the state after the wolf pack is solved and a program is judged: `https://github.com/mariusznazar/screenshots/blob/df96af7bb60fb81be0999e9e626460dbcb9b9958/loop2/katalog-map/lair-record-1600.png?raw=true`
- Computer layout, page area 1280 x 720: `https://github.com/mariusznazar/screenshots/blob/df96af7bb60fb81be0999e9e626460dbcb9b9958/loop2/katalog-map/lair-record-1280.png?raw=true`
- Phone layout, 360 px (full page): `https://github.com/mariusznazar/screenshots/blob/df96af7bb60fb81be0999e9e626460dbcb9b9958/loop2/katalog-map/lair-record-360.png?raw=true`

## Choices (with the way rejected and the cost if wrong)

1. The record is the last fact of the row (after „bez ognia" and „krok"); the foundation says only "among the facts". Rejected: right after the demand (next to „1 do pokonania"); it would push the warning „⊘ wnosisz 0" and the terrain. Cost if wrong: low, one place in `rowFacts`.
2. The fact carries `role: "text"` and the class `maps-catalog-record` with one CSS rule; rejected: reusing `.maps-who-mark` (colour `text`, but another element's class) or a style attribute (forbidden by the token rule). Cost: low.
3. `attackerLines(map, record)` gets the optional field `record` only where set, so the existing deep-equal expectations of `map-lines.test.mjs` stay valid; rejected: a field `record: null` on every line (breaks four expectations in a file outside *Change*). Cost: low.
4. A record of 0 after a first judging that took nothing is shown as „niedźwiedź: 0 ze 120"; D-440 says the number stands "from the first judging on that map", and the `violates` list forbids a „0” only before the first judging. Rejected: showing nothing at 0. Cost if the human wants otherwise: one comparison in `rowFacts` and `attackerLines`.
5. The entry offers `max(0, ...creatureDamage)`; the cache itself rejects a number the game cannot give. Cost: none.

## Adaptations

- `src/browser/maps-screen.css` is not in the plan's *Change* but the role `text` of the number in the row needs a rule (the facts' container is `text-secondary`); one rule, no token. Reported rather than skipped, since the plan's text of the Goal asks for the role `text`.
- `tests/view/maps-screen.test.mjs` (+1 line): its helper `propsOf` builds `MapsScreenProps` by hand and needed the new required member `readMapRecord: () => null`; no assertion changed. Alternative rejected: making the member optional in the type just to spare a test helper.
- `catalogLines(input)` and `MapCatalog` got a required `recordOf`; the helper `input()` of `catalog-lines.test.mjs` and `mount()` of `map-catalog.test.mjs` give `() => null` by default; no existing assertion changed.

## Concerns for the orchestrator

1. **The preposition „ze".** The foundation's text form is „niedźwiedź: {n} ze {zdrowie}”, and the code writes „ze” always, which is right for the bear's 120 („ze stu dwudziestu”). A creature with another health (24 → „z 24”, 7 → „ze 7”) would need another form; the foundation does not settle it and a rule that guesses the Polish form from a number was not mine to write. Nothing shows it until a second map names a creature for the record. Answer I recommend: leave it; settle the form (a field of the creature's data, as the plan did for the case after „z”) in the later change that adds the second such map.
2. **„Co daje”.** The rows of that view are rows of a resource, not of a map; I put the number in the map rows of „Dokąd” and „Postęp” only (D-325: "shows the number of D-440 in its row" in a catalog of map rows). If the human reads "its row" as every row of the map in every view, one more fact on the resource row is needed.
3. **The styleguide section „The screen Mapy”** (`guidelines/styleguide-browser-view.md`) does not yet name the number (the task, To do 4, says the cycle writes it there); the file is not in this slice's *Change*, so I did not touch it. The role `text` I used matches D-440.
4. **A map that names a creature for the record that is no attacker of the map** shows the number in its row but not on its card (the card line sits at the creature's lines). `tests/sim/data.test.mjs:160` requires the named creature to be an attacker of the map, so this cannot happen with a valid data file.
5. The recorded hand-off wording "tests for a judging that took 24 of 120": no reference program takes exactly 24 of the bear's health on the lair (12 and 3 at this base), so the cases that judge on the screen use the simulation's own number; the foundation's 24 / 10 / 30 sequence is tested through the cache.

## Reach beyond the dispatch

- `tests/sim/reference-programs.mjs` and `tests/sim/understanding-fixture.mjs` (imported by the new test; I read the part I used: the names of the programs, `newKnowingGame`) and `tests/sim/judging.test.mjs` lines 1-80 and 540-620 (how Slice 6's tests set up a judging on a map) - to build a state with a character and a program that fights the bear.
- `src/browser/sim/judging.ts` whole, `src/browser/view/judging-cache.ts` whole, `src/browser/view/judging-result.tsx` (partly), `src/browser/sim/data/creatures.ts` and the head of `maps.ts` - to join the existing parts correctly.
- `foundations/decisions.md` D-325 (the one sentence on the row) and D-440, D-441, D-327, D-418, D-419 whole.
- `.runs/executor-10/{compose.mjs,send.sh,shot.sh,pshot.sh,phone-measure.js}` copied as the handoff allows.

## Working copies

All stood in `.runs/executor-11/` (probes, logs, the composed state, screenshots as taken, the clone of the screenshots repository, copies of the good source files used for the breaks) and in `.playwright-cli/` of the worktree; removed by their full paths before return (see the last line of this report for the result). The Playwright session was closed (`playwright-cli close`) and the local start ended with `npm run local:stop` ("Local starts stopped: 1").

## Unread material

- `guidelines/styleguide-browser-view.md` (125 KB): read lines 1-146 (roles, the token rules), 345-399 (a fault of one screen; a stylesheet for each screen), 622-648 (both layouts), 700-718 (a line at a text), 838-913 (the screen Mapy); not read: the rest (lines 147-344, 400-621, 650-699, 719-837, 914-1507: focus, contrast, states of shared controls, the kitchen-sink page, the other screens, the program editor, the scene, the end window, the list of accounts). I judged them outside a change of a number in a row and on a card.
- `guidelines/testing.md`: read whole. `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, `.the-way/task-cycle/change/{SKILL,slice,ui_check,walkthrough}.md`: read whole.
- `.runs/task-cycles/katalog-map/reports/`: `executor-6-report.md` and `executor-7-report.md` read in part (the first about 80 lines, the second about 60 lines: commits, what changed, checks, choices); `review-7-report.md` lines 1-100 (the Minor findings); `executor-8-report.md` and `executor-9-report.md` not read beyond the head of the first (I read the code they made whole instead); `executor-10-report.md` read in part (grep of the screenshot, walkthrough and files sections, lines 43-66, 88-145).
- `.runs/task-cycles/katalog-map/task.md` lines 31, 35, 91-95, 173-176 read; line 200 (the settlement row) not read separately, its content stands in the plan's Goal.
- `foundations/invariants.md` content-identifiers read whole; `foundations/part_map.md:1-33` (browser-view) not read (no new file outside the part).
- `guidelines/coding-browser-module.md` read whole.

## Searches not found or unclear

- The numbers "24 of 120" of the task: no program of those the repository holds takes exactly 24 of the bear's health on the lair at this base (not found; see Concern 5).
- The styleguide's section „The screen Mapy” holds no sentence on the number (not found; Concern 3).
- The foundation does not say where among the facts the number stands, nor the form of „ze” for another number (unclear; Choice 1 and Concern 1).
- The `decision:` quotation for the case of the halted store: no sentence of D-440 or D-441 says that a halted store keeps the record out (D-441 gives the refused storage, D-323 the halt); the case carries no `decision:` line and stands on the behaviour of `remember` that the entry already had.
