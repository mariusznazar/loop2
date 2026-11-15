# Report — executor of slice 30 (team, death and resurrection)

**Status:** done with concerns (the concerns are judgment calls named under "Choices" and "Remarks for the human"; nothing failed).

Base commit `05343dab5e5d75bd00440b032e3396b28d164766`; branch `task/testy-wskazuja-zdania-decyzji`; pin of the-way unchanged (`ec7929d0`).

## Commits

- `af5890fa` test: :white_check_mark: mark the tests that hold the sentences of the decisions on whose the chest is, … with lines decision: (24 test files, 151 lines).
- `5459423e` docs: :memo: name the tests of D-50, … D-221, drop the pair of D-50, D-51, D-52, D-53, D-54, D-56 and D-190, … rewrite the pair of D-62 and D-221 and add one to D-217 and D-218 … (`foundations/decisions.md`).
- Author address checked: `mariusznn@gmail.com` on both (`git log -3 --format='%h %ae %s'`).

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| foundations/decisions.md | 89 | 49 |
| tests/invariants/test_character_team.py | 3 | 0 |
| tests/sim/body.test.mjs | 2 | 0 |
| tests/sim/catch-up.test.mjs | 11 | 0 |
| tests/sim/completion.test.mjs | 2 | 0 |
| tests/sim/data.test.mjs | 1 | 0 |
| tests/sim/death.test.mjs | 25 | 0 |
| tests/sim/discovery.test.mjs | 1 | 0 |
| tests/sim/flow.test.mjs | 3 | 0 |
| tests/sim/loop.test.mjs | 16 | 0 |
| tests/sim/saved-game.test.mjs | 5 | 0 |
| tests/sim/team.test.mjs | 9 | 0 |
| tests/view/account-screen.test.mjs | 11 | 0 |
| tests/view/camp-picture.test.mjs | 2 | 0 |
| tests/view/character-screen.test.mjs | 1 | 0 |
| tests/view/clock.test.mjs | 11 | 0 |
| tests/view/end-question.test.mjs | 4 | 0 |
| tests/view/end-window-game.test.mjs | 11 | 0 |
| tests/view/end-window-lines.test.mjs | 4 | 0 |
| tests/view/end-window.test.mjs | 4 | 0 |
| tests/view/headquarters-screen.test.mjs | 7 | 0 |
| tests/view/maps-screen.test.mjs | 5 | 0 |
| tests/view/run-header.test.mjs | 2 | 0 |
| tests/view/status-row.test.mjs | 1 | 0 |
| tests/view/team-lines.test.mjs | 10 | 0 |

151 lines `decision:` added in total; no test's code, name or assertion changed; no mention of a decision number removed. Each line stands as the first line of the test body, after any line `decision:` already there (the form earlier slices use); in the Python file after the line `# invariant:`.

### Test files beyond the slice's *Change* (item 5), one line each

- `tests/sim/body.test.mjs` — D-62 (time stands still after a death; „Restart” of an ended map run).
- `tests/sim/catch-up.test.mjs` — D-190 (deaths in a catch-up and the open game).
- `tests/sim/completion.test.mjs` — D-190 (a ready resurrection stays ready; a second solving renews nothing).
- `tests/sim/data.test.mjs` — D-190 (480 real minutes in the balance data).
- `tests/sim/discovery.test.mjs` — D-62 (time stands still after a death).
- `tests/sim/flow.test.mjs` — D-50, D-51, D-56 (a new game's team and chest; a send carries the character's number).
- `tests/sim/loop.test.mjs` — D-50, D-190, D-221 (chest room; deaths in an earning loop; settling and load refusal).
- `tests/sim/saved-game.test.mjs` — D-50, D-56, D-221 (load refusals: chest above capacity, numbers, unsettled death).
- `tests/view/account-screen.test.mjs` — D-53, D-217, D-218, D-219, D-221 (browser-view; styleguide read in part, see Unread material).
- `tests/view/clock.test.mjs` — D-190, D-219, D-221 (browser-view; the clock settles a death at its reading).
- `tests/view/end-question.test.mjs` — D-53 („Zakończ” and its question lead to Postać).
- `tests/view/end-window-game.test.mjs` — D-53, D-62, D-216.
- `tests/view/end-window.test.mjs` — D-216.
- `tests/view/maps-screen.test.mjs` — D-51, D-53, D-54, D-217.
- `tests/view/run-header.test.mjs` — D-62.
- `tests/view/status-row.test.mjs` — D-62.

## Table of the decisions (item 6)

Test references are `path:line` of the test case as the file stands after the slice.

### D-50 — Whose is the chest?

- Held in part by tests:
  - S1 „The chest belongs to a team and has a cap on the total count of pieces…”: `tests/sim/flow.test.mjs:48` „a new game has one empty program, a team with no character and an empty chest…”; `tests/sim/loop.test.mjs:708` „a completion deposits no more than the chest has room for”; `tests/sim/saved-game.test.mjs:2202` „a crafted document of the current version is refused whole as shape” (entry „a chest above its capacity”, 40 + 21); `tests/sim/saved-game.test.mjs:2281` „a chest holding exactly its capacity loads, and one piece beyond it is refused as shape”.
  - S2 „Each character belongs to exactly one team and uses its chest, and a character has no chest of its own”: `tests/sim/team.test.mjs:53` „a created character joins the end of the team's list…” (the exact character objects hold no chest).
- Held by invariants: character-team (each character in exactly one team); trip-transfer (a send takes from the team's chest, a completion deposits up to free chest room).
- Held by nothing: none — I judge "by the same rule of capacity as the backpack" held by the total-count tests (the backpack's rule is the count of the pieces of all items together; two tests refuse or clip by the sum across kinds).
- *Verification*: pair removed, clause `tests:` added, `invariants:` kept.

### D-51 — What team does a new game start with?

- Held in whole by tests: `tests/sim/flow.test.mjs:48` (team with no character); `tests/view/headquarters-screen.test.mjs:213` „an empty team says „Drużyna nie ma jeszcze postaci.” and still offers the creation of a character”; `tests/view/maps-screen.test.mjs:461` „a team with no character reads the sentence under the heading of „Kto idzie”” (nothing to send, sent to the creation in Siedziba).
- Invariants: none. Held by nothing: none.
- *Verification*: pair removed, clause `tests:`.

### D-52 — How is a character named?

- Held in whole by tests: `tests/sim/team.test.mjs:91` „two characters may share a name and stay two characters”; `tests/sim/team.test.mjs:104` „the name loses the white space at its start and end…”; `tests/sim/team.test.mjs:115` „a name empty once trimmed creates no character”; `tests/view/headquarters-screen.test.mjs:554` „„Załóż” hands the page the trimmed name and empties the field…”; `tests/view/headquarters-screen.test.mjs:579` „a name empty once trimmed creates nothing and says „Wpisz imię postaci.”…”; `tests/invariants/test_character_team.py:149` `test_every_character_of_every_state_belongs_to_one_team` (asserts the names `["Ala", "Ola", "Ala", "Ela"]` after „  Ola ” and a second „Ala” were typed, and no step refused).
- Invariants: none. Held by nothing: none.
- *Verification*: pair removed, clause `tests:`.

### D-53 — Where the player sends from, and where the end buttons lead

- S1 held in whole: send from the card of the map — `tests/view/maps-screen.test.mjs:680` „„Wejdź” is the main button at each map…”, `tests/view/account-screen.test.mjs:4228` „a send leads to the screen of the map run and „Zakończ” to the screen Postać of that character…”, `tests/view/account-screen.test.mjs:4290` „a player with one character… three clicks”, `tests/view/headquarters-screen.test.mjs:767` „nothing on the screen sends a character or leads to the screen Mapy”; „Zakończ” → Postać of that character — `tests/view/account-screen.test.mjs:3831`, `:4228`, `tests/view/end-question.test.mjs:395`, `:425`, `:469`, `:537`, `tests/view/end-window-game.test.mjs:813`, `:871`, `:967`.
- S2 held in whole: `tests/view/end-window-game.test.mjs:902` „„Otwarte: Las — głębiej →” with no unsaved changes… opens the screen Mapy at the card of the opened map”, `:925` „the question asked by „Otwarte: …” leads to the screen Mapy…”, `tests/view/end-window-lines.test.mjs:392` „the way-on buttons after a completion of Las name the map it opens, and none after a death or a completion of the map it opens”.
- Invariants: none. Held by nothing: none.
- *Verification*: pair removed, clause `tests:`.

### D-54 — In what order do the characters stand?

- Held in whole by tests: `tests/sim/team.test.mjs:53` (game state, Ala, Ola, Ela); `tests/view/headquarters-screen.test.mjs:181` „each character stands in the order of creation…” (Ala, Ola, Ela tells apart a sort by name); `tests/view/maps-screen.test.mjs:477` „the characters stand in the order of their creation…” (Ala, Bob: tells apart only the last-created-first order); `tests/view/camp-picture.test.mjs:47` „only the characters in Siedziba stand in the camp, in the order of creation”, `:78` „the camp draws as many characters as the widest band holds, the first in the order of creation”.
- Invariants: none. Held by nothing: none.
- *Verification*: pair removed, clause `tests:`.

### D-56 — How the game state tells characters apart

- S1 held in whole: `tests/sim/team.test.mjs:53` (ids 1, 2, 3, next 4), `tests/sim/team.test.mjs:91` (two „Ala” with ids 1 and 2), `tests/sim/saved-game.test.mjs:2202` (entries „two characters of one number”, „a character's number reaching the next one” refused).
- S2 held in whole: `tests/sim/team.test.mjs:142` „the send sends the chosen character of the team, and a restart keeps it”, `tests/sim/flow.test.mjs:69` „a send starts a map run at minute 0…” (`run.character.id`), `tests/sim/saved-game.test.mjs:2202` (entry „the map run's character not in the team”), `tests/invariants/test_character_team.py:149` and `:166` `test_a_send_of_a_character_no_team_holds_is_refused`.
- Invariants: none. Held by nothing: none.
- *Verification*: pair removed, clause `tests:`.

### D-62 — The screen after a death

- S1 held in part: the screen stays on the minute of death and time stands still — `tests/sim/body.test.mjs:276` „a map run ended in death passes no minute”, `tests/sim/discovery.test.mjs:750` „a map run ended in death passes no further minute at the level of the run”, `tests/view/run-header.test.mjs:248` „after a death the clock stands at the minute of the death…”, `tests/view/status-row.test.mjs:167` „after a death the clock stands at the minute of the death…”; the window opens of itself over the header and the areas — `tests/view/end-window-game.test.mjs:408`; „Restart” same seed, minute zero — `tests/view/end-window-game.test.mjs:768`, `tests/sim/body.test.mjs:292`; „Zakończ” of the window → Postać — `tests/view/end-window-game.test.mjs:813`; „Restart” and „Zakończ” in the header — `tests/view/run-header.test.mjs:248`.
- S2 held in whole: `tests/view/run-header.test.mjs:248`.
- Invariants: none.
- Held by nothing: "and the menu bar not" — the window leaving the menu bar uncovered. `tests/view/end-window-game.test.mjs:8` says the menu bar above the window is the browser check's.
- *Verification*: pair rewritten for that part only.

### D-190 — What a character's death takes

- S1 held in whole: `tests/sim/death.test.mjs:141`, `:156`, `:179`, `:199`, `:269`, `:305`, `:501`, `:553`, `:574`, `:605`, `:643`; `tests/sim/loop.test.mjs:738`, `:781`, `:820`, `:1070`, `:1101`, `:1286`, `:1328`, `:1349`; `tests/sim/catch-up.test.mjs:611`, `:820`, `:840`, `:858`, `:880`, `:902`; `tests/view/clock.test.mjs:319`, `:537`, `:577` (case names in `reports/executor-30-listing.txt`).
- S2 held in whole: `tests/sim/death.test.mjs:323` „the programs, the chest, the Understanding and the solved maps survive every death”, `:442` „a death that takes everything leaves the map run on the screen as it was”, `:454` „„Restart” after a death that took everything starts from the team…”, `:501` „„Restart” after a death that took everything reads the character that died”.
- S3 held in whole, with the invariant: `tests/sim/death.test.mjs:120`, `:141`, `:574`, `:605`; `tests/sim/loop.test.mjs:738`, `:781`, `:820`, `:1101`, `:1286`; `tests/sim/catch-up.test.mjs:589`, `:611`, `:820`, `:840`, `:880`; `tests/sim/completion.test.mjs:552`, `:584`; `tests/sim/data.test.mjs:396`; `tests/view/clock.test.mjs:391`, `:577`.
- Held by invariants: trip-run-end (death returns no carried item), resurrection-renewal (moment of renewal; renewal at a first completion only; no-practice death or none ready leaves the moment), death-settled-once, catch-up-death-moment. Their tagged tests got no line for what the invariant states (R1); they got one only for what it does not state (e.g. `tests/sim/death.test.mjs:141`: practice, ranks and generation stay).
- Held by nothing: none.
- *Verification*: pair removed, clause `tests:` added, `invariants:` kept.

### D-216 — Where the player reads what a death took and what a completion renewed

- The death lines (sentence from „After a character's death, in the section…”), held in whole: `tests/view/end-window-lines.test.mjs:163`, `:184`; `tests/view/end-window.test.mjs:229`, `:277` (the line of none ready in `danger`), `:329`; `tests/view/end-window-game.test.mjs:1044`, `:1119` (after a load).
- The renewal line (sentence from „After the first completion…”), held in whole: `tests/view/end-window-lines.test.mjs:199`; `tests/view/end-window.test.mjs:329`; `tests/view/end-window-game.test.mjs:1119`.
- Invariants: none. Held by nothing: none ("until „Restart” or „Zakończ”" is judged held by the after-load cases and the window's own cases, see Choices).
- *Verification*: was `none`, now clause `tests:`. (Listed held by nothing at the base; no longer.)

### D-217 — What the game shows of the resurrection

- S1 held in part: `tests/view/team-lines.test.mjs:75`, `:92`, `:109`, `:128`, `:141`, `:149`; `tests/view/headquarters-screen.test.mjs:258`; `tests/view/character-screen.test.mjs:118`; `tests/view/maps-screen.test.mjs:477`, `:529`; `tests/view/account-screen.test.mjs:3143`, `:4970`.
- S2 (minutes rounded up before the split) held in whole: `tests/view/team-lines.test.mjs:75`, `:92`, `:109`; `tests/view/account-screen.test.mjs:3143`, `:4970`.
- Invariants: none (the `resurrection-renewal` tags at `tests/view/team-lines.test.mjs:128` and `tests/view/character-screen.test.mjs:118` concern the readiness boundary; the D-217 lines stand for the wording and roles).
- Held by nothing: the ready line „Wskrzeszenie drużyny gotowe” in `text-secondary` (tests check only that it is not `danger`).
- *Verification*: was `none`, now clause `tests:` and a pair added for that part.

### D-218 — How the headquarters shows the generation number

- Held in part: `tests/view/headquarters-screen.test.mjs:181` (no label at 1, „pokolenie 2” at 2), `tests/view/team-lines.test.mjs:158` „the label of a generation is „pokolenie {n}” from 2 up and nothing at 1”, `tests/view/account-screen.test.mjs:3143` („pokolenie 2” on Siedziba).
- Invariants: none. Held by nothing: the label in `text-secondary`.
- *Verification*: was `none`, now clause `tests:` and a pair added for that part.

### D-219 — Whose clock counts the renewal

- Held in whole by tests and the invariant: `tests/sim/death.test.mjs:224` „the renewal does not depend on the pace of the map run”, `:235` „a resurrection used up is ready again at its moment after a save and a load…”, `tests/view/clock.test.mjs:272` (renewal from the browser's reading), `tests/view/account-screen.test.mjs:3143`, `:4970` (the line follows `Date.now`).
- Invariants: resurrection-renewal (the moment of renewal in real time). Held by nothing: none.
- *Verification*: had no pair; clause `tests:` added after `invariants:`.

### D-220 — Generation and resurrection of a new character

- Held in whole: `tests/sim/death.test.mjs:107` „a new game's resurrection is ready from the start… and a created character brings none of its own”, `:120` „a character created while the team's resurrection is used up does not make it ready”, `:129` „a new character is of generation 1, and a created second one too”, `tests/sim/team.test.mjs:53`.
- Invariants: none. Held by nothing: none.
- *Verification*: was `none`, now clause `tests:`.

### D-221 — When a death is settled

- S1 held in part: `tests/sim/death.test.mjs:412` „game time settles no death: a death stands unsettled after advanceMinutes and passRealTime”, `tests/sim/loop.test.mjs:615` „passing the minutes of a death leaves it unsettled…”.
- S2 held in whole: `tests/view/clock.test.mjs:272`, `:298`, `:319`, `:407`, `:537`; `tests/view/account-screen.test.mjs:3088` „a game minute that ends the map run in a death is saved at once, settled”.
- S3 held in whole: `tests/sim/loop.test.mjs:836` „a death is settled once: … and a load of it settles nothing” (its last assertion refuses the unsettled state), `tests/sim/saved-game.test.mjs:2202` (entry „a death unsettled”).
- Held by the invariant death-settled-once: one settling only (not a sentence of D-221, which states no "once").
- Held by nothing: "and take no real moment" — that the functions passing game time take no moment.
- *Verification*: pair rewritten for that part only, clause `tests:` added, `invariants:` kept.

## Pairs added or rewritten (for the human to accept at the merge)

- D-62 (rewritten): For the menu bar while the window stands —
  - complies: the end-of-run window after a death opening below the menu bar, which stays above it and works
  - violates: the end-of-run window after a death covering the menu bar too
- D-217 (added): For the role of the line of a ready resurrection —
  - complies: „Wskrzeszenie drużyny gotowe” in `text-secondary` at a character on Siedziba, on the screen Postać and in „Kto idzie”
  - violates: „Wskrzeszenie drużyny gotowe” in `text` or in `positive`
- D-218 (added): For the role of the label —
  - complies: „pokolenie 2” beside a name on Siedziba in `text-secondary`, as the archetype beside it
  - violates: „pokolenie 2” beside a name on Siedziba in `text` or in `danger`
- D-221 (rewritten): For the functions that pass game time taking no real moment —
  - complies: `advanceMinutes` and `passRealTime` taking the game state and a span alone, the moment of a death given to `settleDeath` only
  - violates: `passRealTime` taking a reading of the browser's clock and settling with it a death it meets

Pairs removed: D-50, D-51, D-52, D-53, D-54, D-56, D-190 (held in whole). Pairs never present and none needed: D-216, D-219, D-220.

## Checks run

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at the base (before any edit) | 0 — `0 errors`, listed held by nothing among mine: D-216, D-217, D-218, D-220 |
| `python -B .the-way/elements/common/foundation_check.py` after the edits | 0 — `0 errors`, nothing listed held by nothing |
| `npm test -- tests/invariants/test_character_team.py` | 0 |
| `npm test -- tests/sim/body.test.mjs` | 0 |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 |
| `npm test -- tests/sim/completion.test.mjs` | 0 |
| `npm test -- tests/sim/data.test.mjs` | 0 |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/flow.test.mjs` | 0 (first run); rerun after the second batch: see below |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/sim/team.test.mjs` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (first run); rerun below |
| `npm test -- tests/view/camp-picture.test.mjs` | 0 |
| `npm test -- tests/view/character-screen.test.mjs` | 0 |
| `npm test -- tests/view/clock.test.mjs` | 0 |
| `npm test -- tests/view/end-question.test.mjs` | 0 (first run); rerun below |
| `npm test -- tests/view/end-window-game.test.mjs` | 0 |
| `npm test -- tests/view/end-window-lines.test.mjs` | 0 |
| `npm test -- tests/view/end-window.test.mjs` | 0 (first run); rerun below |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 |
| `npm test -- tests/view/run-header.test.mjs` | 0 |
| `npm test -- tests/view/status-row.test.mjs` | 0 |
| `npm test -- tests/view/team-lines.test.mjs` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <every changed .mjs>` | 0 |
| `git diff -U0 05343dab -- foundations/decisions.md`, read | 14 hunks, each inside the *Verification* field of D-50, D-51, D-52, D-53, D-54, D-56, D-62, D-190, D-216, D-217, D-218, D-219, D-220, D-221 |

The second batch (six lines found by the own-work check) changed `tests/sim/flow.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/end-question.test.mjs` and `tests/view/end-window.test.mjs` after their first run, so they were run again:

| Rerun | Exit |
|---|---|
| `npm test -- tests/sim/flow.test.mjs` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 |
| `npm test -- tests/view/end-question.test.mjs` | 0 |
| `npm test -- tests/view/end-window.test.mjs` | 0 |

`python -B .the-way/elements/common/foundation_check.py` after both commits: exit 0, `0 errors`, nothing listed. Prettier over the changed `.mjs` files was run after the first batch (exit 0); the second batch adds only comment lines of the same form to files it had already passed, and the final run before the commits — `node node_modules/prettier/bin/prettier.cjs --check … <every changed .mjs>` — exited 0.

Not run: the full gate `npm test` with no file — it is the cycle's run before the request (method section 3). `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run; the handoff gives them as failing at the base with `FileNotFoundError`.

## Own-work check

- Requirement most likely missed: a test that holds a sentence of my decisions left without a line (the search by content, not number).
- Check: `.runs/executor-30/own_check.py` lists every `test(` case under `tests/` whose body holds a word of a sentence (the texts of D-216 and D-217, „pokolenie”, `generationLabel`, `settleDeath`, „Wpisz imię postaci”, `characterName(`, a Postać or Mapy screen reached, `nextCharacterId`, `run.character.id`) and carries no line for that decision.
- What it showed: 91 cases. I read the hits: six held the sentence as their purpose and got lines in a second batch (`tests/view/account-screen.test.mjs:3831`, `tests/view/end-question.test.mjs:425`, `:469`, `:537` for D-53; `tests/view/end-window.test.mjs:277` for D-216; `tests/sim/flow.test.mjs:69` for D-56). The rest touch the words incidentally (a `settleDeath` call in a D-190 test, a `run.character.id` precondition, the report line „pokolenie” of D-246 rather than the label of D-218, screen addresses of D-280) — see Choices.

## Reaches beyond the dispatch

- `foundations/invariants.md` read by entry: character-team, trip-transfer, trip-run-end, resurrection-renewal, death-settled-once, catch-up-death-moment (named in *Read*; found by heading).
- `src/browser/sim/types.ts:209` `RunCharacter` (to judge D-56 S2: the map run's character holds `id`, no name) and a grep of `src/browser/view` for the role of the resurrection line (to judge D-217's `text-secondary` part).
- Test files beyond *Change*, listed above, read by the cases found.
- `the author's rules on writing scripts, outside the repository` (the user's rule before writing a script).

## Working copies

- `.runs/executor-30/` in the worktree held: `quotes.json`, `marks.json`, `marks2.json`, `insert_lines.py` (the insertion script), `own_check.py`, `own_check.txt`, `listing.txt`, `plan.txt`, the foundation-check outputs `fc-base.txt`, `fc-after.txt`, `fc-final.txt`, and the test logs `log-*.txt`, `log2-*.txt`, `tests.txt`, `tests2.txt`. Kept beside this report: `reports/executor-30-listing.txt` (every new line `decision:` with its test case) and `reports/executor-30-own-check.txt` (the 91 unmarked candidates of the own-work check). The directory `.runs/executor-30/` was removed (`rm -rf`; `ls` then reports it absent). No worktree or clone was made.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–60 (When to read, Roles, Each role in its meaning) and its headings, and grepped for comments; the other rules (tokens, focus, contrast, components, screens) were not read — the slice adds comment lines only and changes nothing a screen shows.
- `foundations/part_map.md` and `foundations/glossary.md`: not read; the handoff's item 5 gives which test files are `browser-view`, and no term needed the glossary.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73`: not opened; the handoff carries it word for word.
- `.the-way/elements/decisions/template.md`: read 108–262 (covers the named ranges 111-127, 162-166, 220-260).
- `foundations/decisions.md` D-73 and D-82: read whole.
- `guidelines/testing.md` and `guidelines/coding.md`: read whole.

## Searches not found or unclear

- No test checks the role `text-secondary` of the ready resurrection line (D-217) or of the generation label (D-218); searched `tests/` for `secondary` beside resurrection or generation.
- No test checks that the end-of-run window leaves the menu bar uncovered (D-62); `tests/view/end-window-game.test.mjs:8` gives it to the browser check.
- No test checks that the functions passing game time take no real moment (D-221 S1, last clause).
- D-216's sentence "until „Restart” or „Zakończ”" has no case that presses „Restart” or „Zakończ” and checks the line is gone; it is held only through the window's own cases and the after-load cases (my judgment: held).

## Choices (with the way rejected and the cost if wrong)

1. **Incidental assertions get no line.** A case gets a line where the sentence is part of what the case checks; an assertion that touches a sentence's value only as a precondition or by the way (e.g. `run.character.id` in a trip or a rule-signs case, `settleDeath` inside a D-190 case read as D-221) gets none. Rejected: a line at every case that would fail if the sentence broke — dozens more lines, mostly noise. Cost if wrong: a reviewer applying the strict reading finds cases to add (the own-work listing `reports/executor-30-own-check.txt` names them).
2. **Untagged tests holding what an invariant states get a line** (e.g. `tests/sim/completion.test.mjs:552`, `tests/view/clock.test.mjs:391`, D-190 "a ready resurrection staying ready"). R1 exempts tests of the invariant only; these carry no `invariant:` tag. Rejected: leaving them bare. Cost: a few lines a reviewer may call redundant.
3. **D-216's long sentence.** Its quoted texts hold a full stop followed by a space, so the mechanical split makes „Następne wskrzeszenie…” and „Teraz to pokolenie {n}…” sentences of their own. I quote from the true start „After a character's death, in the section…” (running to the first inner full stop) for every death-line case, and „After the first completion…” for the renewal line, rather than adding lines for the fragments.
4. **D-50 "by the same rule of capacity as the backpack"** judged held by the total-count tests (sum across kinds), so D-50 lost its pair. Rejected: keep a pair for "same rule". Cost if wrong: one pair to put back.
5. **D-54 and the camp**: the camp of Siedziba is a picture, not the team's list; I marked `tests/view/camp-picture.test.mjs:47` and `:78` because the camp draws the list's order and would show a reordered list. `tests/view/maps-screen.test.mjs:477` uses Ala, Bob, which a sort by name would not tell apart; it holds only "not last-created first".
6. **Quotations run to the end of the sentence** even where the case holds a part, as earlier slices do; the clause `tests:` says which part is held.

## Remarks for the human (R3)

- D-218 speaks of the headquarters only, while the screen Postać also shows „pokolenie {n}” from 2 up (`tests/view/character-screen.test.mjs:99`); no line was added there, since no sentence covers it. The decision says less than the code.
- D-54 speaks of "its list"; the order also governs the camp of Siedziba and „Kto idzie”, which the decision does not name.
- D-216's binding sentence holds quoted texts with inner full stops, so the sentence-splitting rule of the-way cuts it into fragments beginning mid-quote („Następne wskrzeszenie…”, „Teraz to pokolenie {n}…”).
- D-62's old complies example spoke of „Teraz” reading „Mag zamarzł”, which is D-334's, not D-62's binding sentences; the rewritten pair drops it.
