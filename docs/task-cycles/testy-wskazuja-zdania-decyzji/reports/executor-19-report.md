# Report — executor of slice 19 (maps screen and map numbers)

**Status:** done with concerns (the concerns are judgments of scope, listed under "Choices"; no check failed)

## Commits and files

Base `031207cd68cfce1db2330f2dca2cb68f48beefb4`, branch `task/testy-wskazuja-zdania-decyzji`:

- `2dfc86b7` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the screen Mapy, … with lines decision:
- `a237a782` docs: :memo: name the tests of D-325 … D-398, drop the pair of D-330, D-332, D-388 and D-398 … and rewrite the pair of D-325, D-326, D-327, D-328, D-329, D-331, D-333 and D-404 …

Author address checked: `git log -3 --format='%h %ae %s'` shows `mariusznn@gmail.com` on both commits.

| File | + | − |
|---|---|---|
| foundations/decisions.md | 101 | 40 |
| tests/view/maps-screen.test.mjs | 34 | 0 |
| tests/view/map-lines.test.mjs | 15 | 0 |
| tests/view/account-screen.test.mjs | 14 | 0 |
| tests/view/screen-address.test.mjs | 3 | 0 |
| tests/view/trip.test.mjs | 2 | 0 |
| tests/view/headquarters-screen.test.mjs | 1 | 0 |
| tests/sim/data.test.mjs | 14 | 0 |
| tests/sim/map-card.test.mjs | 11 | 0 |
| tests/sim/completion.test.mjs | 7 | 0 |
| tests/sim/layout.test.mjs | 4 | 0 |
| tests/sim/world.test.mjs | 2 | 0 |
| tests/invariants/test_map_run_tiles.py | 1 | 0 |
| tests/invariants/test_content_identifiers.py | 1 | 0 |

109 lines `decision:` at 64 cases; no test code, name or assertion changed; no mention of a decision number removed. In `foundations/decisions.md` only the *Verification* field of D-325, D-326, D-327, D-328, D-329, D-330, D-331, D-332, D-333, D-388, D-397, D-398 and D-404 changed.

Files reached beyond the slice's *Change* (item 5 of "Work of every slice"), one line each:
- `tests/view/trip.test.mjs` (browser-view): D-326, D-329.
- `tests/view/screen-address.test.mjs` (browser-view): D-332.
- `tests/view/account-screen.test.mjs` (browser-view): D-325, D-329, D-330, D-331, D-397.
- `tests/sim/completion.test.mjs` (simulation): D-388, D-397, D-398.
- `tests/sim/layout.test.mjs` (simulation): D-388, D-398.
- `tests/invariants/test_content_identifiers.py` (simulation): D-332.
Each ran on its own (below). For the browser-view files, the styleguide was read in its parts on the roles and on the screen Mapy (see Unread material).

## Checks (command — exit code)

- `python -B .the-way/elements/common/foundation_check.py` at the base — 0, `0 errors`, none of my decisions listed `held by nothing` (11 other decisions listed).
- `python -B .the-way/elements/common/foundation_check.py` after the lines — 0, `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py` after the *Verification* fields — 0, `0 errors`, 11 `listed:` lines, none of D-325, D-326, D-327, D-328, D-329, D-330, D-331, D-332, D-333, D-388, D-397, D-398, D-404.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the eleven changed `.mjs` files — 0 („All matched files use Prettier code style!”).
- `npm test -- tests/view/maps-screen.test.mjs` — 0 (21 pass, 0 fail)
- `npm test -- tests/view/map-lines.test.mjs` — 0 (11 pass)
- `npm test -- tests/view/headquarters-screen.test.mjs` — 0 (26 pass)
- `npm test -- tests/view/trip.test.mjs` — 0 (9 pass)
- `npm test -- tests/view/screen-address.test.mjs` — 0 (57 pass)
- `npm test -- tests/view/account-screen.test.mjs` — 0 (131 pass)
- `npm test -- tests/sim/map-card.test.mjs` — 0 (11 pass)
- `npm test -- tests/sim/data.test.mjs` — 0 (36 pass)
- `npm test -- tests/sim/world.test.mjs` — 0 (12 pass)
- `npm test -- tests/sim/completion.test.mjs` — 0 (27 pass)
- `npm test -- tests/sim/layout.test.mjs` — 0 (11 pass)
- `npm test -- tests/sim/first-map-balance.test.mjs` — 0 (5 pass; unchanged, in the slice's *Checks*)
- `npm test -- tests/sim/new-account-first-pass.test.mjs` — 0 (3 pass; unchanged, in the slice's *Checks*)
- `npm test -- tests/invariants/test_map_run_tiles.py` — 0 (Ran 6, OK)
- `npm test -- tests/invariants/test_content_identifiers.py` — 0 (Ran 4, OK)
- `git diff -U0 031207cd… -- foundations/decisions.md`, read: 13 hunks, each starting at the `- **Verification:**` line of one of my decisions and replacing only that field (3 lines out for a field with a pair, 1 for D-397, 6 for D-404).

Not run: the full gate `npm test` without a file (the cycle's run, not a slice's). No test was written, so no failing run is due. `test_ruff_source_rules` / `test_shellcheck_source_rules` were not run (they fail at the base with `FileNotFoundError`, as the handoff says).

## Own-work check

- Requirement most likely missed: "every test that holds one of its binding sentences carries a line `decision:`" — a holder searched by content but missed.
- Check: content searches over `tests/` for `canSendMap|sendMaps(|opensAfter|not available/`, for presses of „Wejdź: …” / „Puść w pętlę: …” (`press(buttonLabelled(…, "Wejdź|Puść w pętlę`), for `Wybierz mapę z listy|#/mapy|Drużyna nie ma jeszcze postaci|Pętla nic nie zarobi|maps-list|maps-card|usualStep|minutesWithoutFire|expectedTiles|meanAttackGap|Wejdzie:`, for every `D-3xx` of mine and for the `invariant:` lines of first-map-stock, first-map-balance, new-account-first-pass, then a table of every marked case (`.runs/executor-19/cases.py`, 109 rows).
- What it showed: every hit was read and either marked or judged a consumer (below). One press of „Wejdź” left unmarked: `tests/view/chronicle-game.test.mjs:228`, whose case is the chronicle and uses „Wejdź” only to start the next map run.

## Rows of item 6

| Decision | Held by tests (whole / part), `path:line` — case | Held by invariants | Held by nothing | *Verification* |
|---|---|---|---|---|
| D-325 | One sentence, in part: the list of the open maps alone — `tests/view/maps-screen.test.mjs:145` "with no map named the list holds the open maps alone …", `tests/view/account-screen.test.mjs:4280` "a player with one character … in three clicks"; the card of the map the address names — `account-screen.test.mjs:4021` "a reload at #/mapy/forest stays on Mapy …"; the card's parts — `maps-screen.test.mjs:239` "the card of Skraj lasu …", `:271` "the card of Las …", `:325` "the card of Las — głębiej …", `:388` "a step other than the usual one …"; „Kto idzie” with characters, „Program:”, „Wejdzie”, „Wejdź”, „Puść w pętlę” — `maps-screen.test.mjs:468` "the characters stand in the order of their creation …" | none named | the list on the left and the card on the right | pair rewritten |
| D-326 | One sentence, in part (all but the role): `maps-screen.test.mjs:688` "an empty list „Wynieś” puts …", `tests/view/trip.test.mjs:316` "the loop mark stands when the bring list is empty, and only then" | none | the sentence drawn in `warning` | pair rewritten |
| D-327 | Sentence 1, in part (contents, order, parts left out, „nie odnawia się” and the caps marked as warnings): `tests/view/map-lines.test.mjs:47` heading, `:79` terrain lines, `:100` step notes, `:126` resource lines, `:174` no renewal in warning, `:192` attacker lines, `:228` caps; `maps-screen.test.mjs:239`, `:271` (icons), `:325`, `:388`. Sentence 2, in part (one total number, no „otwarta”, creature with no icon, „Żąda” one sentence from the data, „Odbiera” with nothing but the caps): `map-lines.test.mjs:192`, `:228`; `maps-screen.test.mjs:239`, `:271`, `:325` | none | the colours the marks and words are drawn in (`positive`, `text-secondary`, `warning`) | pair rewritten |
| D-328 | One sentence, in part (all the data shown to a player who discovered none of it; the Understanding unchanged): `maps-screen.test.mjs:239`, `:271`, `:325` (explicit Understanding check), `:388` | none | what the program editor offers after the card | pair rewritten |
| D-329 | Sentence 1, in part: `maps-screen.test.mjs:468` order and name link, `:516` resurrection line, `:540` „Program:” with its list, `:569` „Wejdzie” always and „nic”, `:610` clipped-plan warning in place, `:688` loop warning beside „Puść w pętlę”, `:721` rehearsal warning under „Wejdź”, `:754` earning-loop line; `account-screen.test.mjs:2696` loop line at the looping character alone, `:3014` rehearsal under „Wejdź”, `:4021` name link opens Postać; `trip.test.mjs:265` "the enter line gives what a send takes …" („Wejdzie: nic”). Sentence 2, whole: `account-screen.test.mjs:2861` „Puść w pętlę” stays on Mapy, `:4219` and `:4280` „Wejdź” opens the run. Sentence 3, whole: `maps-screen.test.mjs:453` "a team with no character reads the sentence …" | none | „Wejdzie: …” in `text-secondary` | pair rewritten |
| D-330 | Whole: `account-screen.test.mjs:4280` (three clicks: „Mapy”, the row, „Wejdź”; no button of Siedziba to the maps); in part: `tests/view/headquarters-screen.test.mjs:759` "nothing on the screen sends a character or leads to the screen Mapy", `account-screen.test.mjs:2696` | none | nothing | pair removed |
| D-331 | Sentence 1, in part (the sentence alone on the right, no card): `maps-screen.test.mjs:145`, `account-screen.test.mjs:4021`, `:4280`. Sentence 2, in part (row a link to `#/mapy/{map}` with the name, „rozwiązana” after it, the named row marked): `maps-screen.test.mjs:185` "a row is a link to the map's address …", `account-screen.test.mjs:4021` | none | roles of the sentence and of „rozwiązana”; the look of the picked row | pair rewritten |
| D-332 | Whole: `tests/view/screen-address.test.mjs:98` "a fragment with ${name} reads as no screen" (forest-deep, las-glebiej, Forest refused), `:145` "the address of a map reads as its screen …", `:158` "every screen writes the address that reads back to it", `maps-screen.test.mjs:185`, `tests/invariants/test_content_identifiers.py:230` `test_browser_files_outside_the_data_name_no_content` (built from the data) | none | nothing | pair removed |
| D-333 | Sentence 2 whole: `tests/sim/map-card.test.mjs:18`, `:26`, `:33`, `:40` (minutes, none where the map does not cool), `:47`, `:53`, `:61` (tiles, rounding), `:70`, `:77` (mean gap, rounding); in part `map-lines.test.mjs:100`, `:126`, `:192`, `:209`. Sentence 3 whole: `map-card.test.mjs:85`, `:90` | none | sentence 1 (counted by functions of the simulation; the view only writes them out) | pair rewritten |
| D-388 | Sentence 1, whole together: `tests/sim/data.test.mjs:17`, `:59`, `:270` (25 °C), `:746` (streak 480); `tests/sim/completion.test.mjs:273` (540 with two beaten attacks, not one; Las 480), `:306`, `:320`, `:404` (Las — głębiej open once Las solved); `tests/sim/layout.test.mjs:58` (Las entrance fixed), `:70` (Las — głębiej entrance drawn); `tests/sim/world.test.mjs:52`; `map-lines.test.mjs:31`; `maps-screen.test.mjs:145`, `:222`. Sentence 2 whole: `data.test.mjs:17`, `:59`; `world.test.mjs:52` in part. Sentence 3: `data.test.mjs:17`, `:59`, `:270`, `:746` | none | nothing | pair removed |
| D-397 | Whole: `completion.test.mjs:404` "a map is sendable only after …", `:426` "completing Skraj lasu solves it alone and opens Las …"; in part: `data.test.mjs:35`, `map-lines.test.mjs:31`, `maps-screen.test.mjs:145`, `:222`, `account-screen.test.mjs:4280` | first-map-stock and first-map-balance hold none of its binding sentence (see "Remarks") | nothing | tests clause added; invariants kept |
| D-398 | Sentence 1 whole: `data.test.mjs:35`, with `completion.test.mjs:426` (solved at 480) and `layout.test.mjs:40` (16 tiles). Sentence 2 whole: `data.test.mjs:35`, `layout.test.mjs:40`, `tests/invariants/test_map_run_tiles.py:239` `test_control_the_layouts_can_show_a_break`. Sentence 3: `data.test.mjs:35` | first-map-balance holds none of the binding sentences | nothing | pair removed; invariants kept |
| D-404 | no line (R1: its one test is the test of new-account-first-pass, which states the first clause) | new-account-first-pass: the program of 21 rules in 5 groups solving Skraj lasu on at least 289 of the 300 seeds | „the figure is the measurement the human accepted … and is to be revised when the balance is worked on” | pair rewritten |

## Pairs added or rewritten (for the human's acceptance at the merge)

None added. Rewritten, with their words:

- **D-325** — For the list standing on the left and the card on the right, an agent compares a change with the part no test holds:
  - complies: the screen Mapy at `#/mapy/forest` with the list of the open maps on the left, and on the right the card of Las with the section „Kto idzie” under it
  - violates: the list of the maps standing on the right of the card or under it
- **D-326** — For the role the sentence is drawn in, an agent compares a change with the part no test holds:
  - complies: „Pętla nic nie zarobi do skrzynki” beside „Puść w pętlę” drawn in `warning`
  - violates: the sentence drawn in a role other than `warning`, such as `text-secondary` or `danger`
- **D-327** — For the colours the marks and the words of the card are drawn in, an agent compares a change with the part no test holds:
  - complies: „rozwiązana” in the heading in `positive`, „odsłania ją Las” and „— drożej niż zwykle” in `text-secondary`, and „nie odnawia się” and „wnosisz najwyżej 5” in `warning`
  - violates: „nie odnawia się” or a cap drawn in `text` or `danger`; „rozwiązana” in the heading drawn in `text-secondary`; „odsłania ją {mapa}” drawn in `text-strong`
- **D-328** — For what the program editor offers after the card, an agent compares a change with the part no test holds:
  - complies: after the card of Las — głębiej shows the wolf to a player who has not met it, the program editor offering no condition about the wolf
  - violates: the card handing the program editor, by a way other than the Understanding, an action or a condition the player has not discovered
- **D-329** — For the role „Wejdzie: …” is drawn in, an agent compares a change with the part no test holds:
  - complies: „Wejdzie: patyk 6, jagoda 4” and „Wejdzie: nic” in `text-secondary`
  - violates: „Wejdzie: …” drawn in `text`, or in `warning` where the plan enters clipped
- **D-331** — For the roles of the sentence and of „rozwiązana” and for the look of the picked row, an agent compares a change with the part no test holds:
  - complies: „Wybierz mapę z listy.” in `text-secondary`; at `#/mapy/forest` the row of Las with its text in `text-strong` and a bar in `selected` at its left; „rozwiązana” after the name of a solved map in `positive`
  - violates: the picked row marked by a background in `highlight` alone, or by a bar in `positive`; „rozwiązana” on the list drawn in `text-secondary`
- **D-333** — For where these numbers are counted, an agent compares a change with the part no test holds:
  - complies: the card of Las — głębiej writing out „bez ognia 33 min” and „średnio co ≈ 280 min” as the functions of the simulation beside the cooling of the body and the spacing of attacks return them
  - violates: the view counting the minutes without fire from the ambient temperature of a map by a formula of its own; the usual step a number written in the view or in the balance data
- **D-404** — For the revision of the figure when the balance is worked on, an agent compares a change with the part no invariant and no test holds:
  - complies: a change of the balance that moves the number of seeds the program of the test solves from a game of an account with nothing discovered, bringing the figure 289 to the new measurement the human accepts
  - violates: the figure 289 kept after the balance has been worked on and the measurement has moved

Pairs removed: D-330, D-332, D-388, D-398. D-397 had none and gets none.

## Choices, with the way rejected and its cost if wrong

1. **Holding versus using a number (D-388, D-398, D-333).** I marked a test where its assertion is about what the sentence fixes — the data of the map compared to the decision's literals, the requirements of solving, the entrance fixed or drawn, every tile of Skraj lasu, the counting rules — and left unmarked the tests that take the numbers as inputs to check another rule (body cooling in `tests/sim/body.test.mjs`, campfire, renewal at minute 30 in `world.test.mjs:191`, the completion at 479+1 in `completion.test.mjs:81`, `acceptance.test.mjs:24`), whose comments cite D-388 only as the source of their values. Rejected: marking every test that would fail on another number — dozens of simulation cases, which would tell an agent nothing about which part is held. Cost if wrong: those tests would need lines; the *Verification* text stays true either way.
   - For the same reason the view's card tests (`maps-screen.test.mjs:239/271/325`) carry D-327 but not D-333, and `map-lines.test.mjs:79` (83 and 33 written out with no counting asserted) carries D-327 alone; `map-lines.test.mjs:100/126/192/209`, whose comments name the counting break they catch, carry D-333.
2. **Foreign-invariant test holding my sentence.** `test_content_identifiers.py:230` (invariant `content-identifiers`, from D-18) holds D-332's „the address is built from the map's data”; R1 bars a line only for an invariant derived from the decision itself, so it got one. Same for `layout.test.mjs:40` (invariant first-map-stock, from D-397) and `test_map_run_tiles.py:239` (map-run-tiles), which hold D-398's numbers; no D-397 line was added there.
3. **D-327 „follows the card of the predecessor game”.** I judged it held through the sentence's own enumeration and the five departures, which the tests hold item by item, so the pair speaks only of colours. Rejected: a pair on "the predecessor's card" in general, which no agent could apply. Cost if wrong: a pair part to add.
4. **Role and class checks (R4).** `maps-screen.test.mjs:388` and `map-lines.test.mjs:174/228` check that „nie odnawia się” and the caps stand in the element or flag of a warning, and the decision names those words with `warning`, so they hold that part; the colour the class draws in (`src/browser/styles.css`) is held by nothing and stays in the pair. „rozwiązana”, „odsłania ją”, „Wejdzie” and the loop sentence are checked by their own classes only, which carry no role, so their roles are in the pairs.
5. **Quotations stop early** where the test holds only the start of a long sentence (for example D-326 "Where the bring list of the program picked is empty", D-329 "A team with no character has in the section the sentence", which avoids the full stop inside the quoted Polish sentence).
6. The lines were inserted by a script (`.runs/executor-19/add_lines.py`, removed) after any existing line `decision:` or `invariant:` at each case; the diff was read and the foundation check accepted every quotation.

## Existing mentions whose test holds no sentence (left as they are)

- `tests/view/account-screen.test.mjs:2838` — the comment "D-329" at "the name in a character's row is a link to its screen Postać, which then opens": it checks the row on Siedziba, not „Kto idzie”; it holds no sentence of D-329 (nor of D-330, which speaks of no button). No line.
- `tests/view/maps-screen.test.mjs:1`, `tests/view/headquarters-screen.test.mjs:1`, `tests/sim/map-card.test.mjs:1-3`, `tests/sim/body.test.mjs:22`, `:442`, `tests/sim/campfire.test.mjs:27`, `tests/sim/world.test.mjs:14`, `tests/sim/acceptance.test.mjs:24`, `tests/sim/new-account-first-pass.test.mjs:16`, `:26` — file headers and source mentions, not cases.

## Remarks for the human (R3)

- **D-397 and its invariants.** Its *Verification* names first-map-stock and first-map-balance, which state the stock of Skraj lasu and the balance of programs there — what its *Rationale* aims at, not its binding sentence („A new game opens the map Skraj lasu, and solving it opens Las.”). The invariants hold none of that sentence; the tests now do. Nothing changed.
- **D-398 and first-map-balance.** Likewise, the invariant derives from D-398 but holds none of its binding sentences, which are numbers; the data, layout and completion tests hold them.
- **A test comment, not a decision:** `tests/view/map-lines.test.mjs:73-75` says the terrain case "catches … a minutes-without-fire line where the map does not cool the body"; that check stands in the next case (`:91-96`). No change (no test code or comment is in scope).

## Reaches beyond the dispatch

- `foundations/invariants.md` `## content-identifiers` (read by heading) — to judge whether `test_content_identifiers.py` holds D-332's sentence.
- `src/browser/view/maps-screen.tsx` and `src/browser/styles.css` (grep for the classes `maps-card-*`, `maps-who-*`, `maps-list-solved`) — to judge whether a class check is a role check (R4).
- `src/browser/sim/understanding.ts` `newUnderstanding` and `tests/sim/understanding-fixture.mjs` `withEdgeSolved` — to confirm a new game's Understanding holds no item and no creature (D-328).
- The test files outside *Change* listed above, read by case.

## Working copies

`.runs/executor-19/` held the script that added the lines, the table script, the check outputs and the per-file test outputs. Removed before return (see the last line of this report). No worktree or clone was made.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-60 (roles) and 491-591 (menu bar, list of programs, the screen Mapy); the rest (focus, contrast, shared controls, program editor, scene, chronicle, end window) not read — my changes are comment lines only and touch none of them.
- `foundations/part_map.md`: read only the headings and the lines of `tests/view`, `tests/sim` and `tests/invariants` (by grep) to place each changed file in its part.
- `foundations/glossary.md`: not read; no term of it was needed beyond those the decisions use.
- `guidelines/testing.md` and `guidelines/coding.md`: read whole.
- `.the-way/elements/decisions/template.md`: read lines 105-264 (covering 111-127, 162-166, 220-260).
- Plan and task passages: as copied in the handoff, and `task-frozen.md` read whole.
- Test files: read by case and range — `maps-screen.test.mjs` whole, `map-lines.test.mjs` whole, `map-card.test.mjs` whole, `test_map_run_tiles.py` whole, `headquarters-screen.test.mjs:745-826`, `data.test.mjs:1-110`, `256-266`, `730-751` (+ the list of its case names), `world.test.mjs:40-74`, `185-229` (+ case names), `first-map-balance.test.mjs:1-30`, `95-126`, `new-account-first-pass.test.mjs:1-35`, `120-152`. The remaining lines of these files are cases on other subjects, judged by name.

## Searches not found or unclear

- No test checks the colours of the card's and the list's marks (`positive`, `text-secondary`, `warning` drawn by `styles.css`), nor the left/right placement of the screen Mapy: searched for `maps-` across `tests/` (hits only in `maps-screen`, `account-screen`, `end-window-game` (screen detection), `map-card`). Those parts stay in pairs.
- No test checks the program editor after the card of a map (D-328's last clause): searched the D-328 cases and the editor's case names for "card"; none.
- The handoff's *Checks* list `tests/sim/first-map-balance.test.mjs` and `tests/sim/new-account-first-pass.test.mjs` as changed files; my judgment changed neither (their cases are the tests of invariants that hold no binding sentence they could carry: R1 for D-404, none for D-397/D-398). Both were still run.

Working copies: `.runs/executor-19/` stood under the worktree's `.runs/`; removed with `rm -rf` before return.
