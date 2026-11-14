# Correction 1 — the human's remarks on request #95

Status: **done**. Merge commit `1d6cce30` (`Merge remote-tracking branch 'origin/main' into task/pierwsza-mapa-bez-loterii`, author `mariusznn@gmail.com`), `git status` clean after it. Not pushed (the orchestrator does). Items 2 and 3 of the remarks not touched, no task written.

## Part A — the merge

**Conflict resolved** in `foundations/decisions.md`: main's D-396 („In which browsers and from which window size does the game have to work?”) stays, byte for byte, in its place; this branch's entries are now **D-397** „Which map does a new game open on?” and **D-398** „What numbers does the map Skraj lasu have?”, in the order of the numbers, after D-396. The file ends with one newline as main's did; no conflict marker left (`grep -n "^<<<<<<<\|^=======\|^>>>>>>>"` finds none).

**Changes to the text of our entries: only the numbers.** I read main's D-393, D-394, D-395, D-396 and the changed D-136 whole, and I compared every entry main changed in the merge with the base by sentences (D-93, D-120, D-136, D-164, D-179, D-186, D-189, D-208, D-239, D-241, D-246, D-247, D-251, D-311, D-329, D-346, D-367, D-369, D-383, D-389: they are wording changes from "loop" to "earning loop", the narrowed streak reset of D-136, the version rising again with an added or removed ordinary action in D-369, and the window rule of D-396). None says something that makes a sentence of D-397 or D-398 false or calls for a word of theirs to change. D-398 and D-397 still say "the predecessor game, loop" and "the first map of the predecessor game", which agrees with the glossary entry `loop` that main added (the predecessor game, not the earning loop).

**References rewritten** (our old D-397 became D-398 first, then our old D-396 became D-397; a reference to main's D-396 stays):
- `foundations/decisions.md`: the two headings, D-398's *Relations* (`derives from D-397`) and its *Rationale* ("the map a new game opens on (D-397)"). The one earlier mention of main's D-396 (a rationale at line 7465: "the smallest window of D-396") is main's, untouched.
- `foundations/invariants.md`: `first-map-stock` *Derives from* `D-397`; `first-map-balance` *Derives from* `D-397 · D-398`.
- `tests/invariants/test_map_run_tiles.py` (docstring: "density 1, D-397").
- `tests/sim/data.test.mjs` (the test name: "…map data of D-398…").
- Searched with `grep -rn "D-396\|D-397\|D-398"` over `foundations`, `tests`, `guidelines`, `src`, `README.md`, `.claude`, `.agents`: no other mention. The decisions' own commit messages are history and not changed.

**What the merge brought, against my work:**
- `SAVED_GAME_VERSION` is still 6 (`src/browser/sim/saved-game.ts:80`); main changed only its comment (an added or removed ordinary action raises the version too). The comment is true for 6: the change adds a map, not an action; our raise is the human's choice of Q4, and the guideline still says a change of the data's map identifiers raises nothing by itself, which the raise does not contradict.
- `guidelines/coding-saved-game.md`: the new sentence and `D-369` in *Decision* fit; nothing in them touches what the change did.
- `foundations/glossary.md`: new entry `loop` (the predecessor game). No word of mine is used against it.
- My corrections of D-19, D-121, D-124, D-330, D-378 and D-388 **stand**: main did not change any of the six (checked by comparing each entry of the merged file with main's: they differ from main in exactly my corrections, and the only entries that differ from main otherwise are D-397 and D-398).
- Main's D-396 (browsers, 1280 × 720 page area): my screenshots below were taken at 1280 × 720 in Chromium; nothing of mine changes a look.

**Checks (command, exit):**

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `node --test tests/sim/data.test.mjs` | 0 (35 pass) |
| `node --test tests/sim/saved-game.test.mjs` | 0 (38 pass) |
| `node --test tests/sim/first-map-balance.test.mjs` | 0 (5 pass) |
| `python -B scripts/test.py tests/invariants/test_map_run_tiles.py` | 0 |
| `git status --short` after the merge commit | empty |

Run one after another. I did **not** start the whole `tests/sim` and `tests/view` sets: the merge brought no change to a test or to code besides one comment of `saved-game.ts` (`git diff <merge-base> origin/main -- tests src` lists only that file), so nothing of the merge could change a result there; the sets last ran green at the fix review (2023 of 2023).

## Part B — item 1: the two screens in a real browser

Route: `.claude/skills/loop2-play/SKILL.md`, read whole, on the merged tree (`npm run build` first): `npm run local` (`https://127.0.0.1:57373`), my own session `playwright-cli -s=fixmapy2`, window 1280 × 720, account `agent@example.test` made through the login card, character „Ala”. To get the states I sent saved documents of version 6, composed by scripts outside the repository, through the page's save request (each answered `200`, checked with `loadSavedGame` first): a plain new game with one character (`solvedMaps: []`), and the same with everything discovered and still nothing solved. Console errors at the end: none that the game wrote (the ordinary 401 before sign-in aside). Closed with `playwright-cli close` and `npm run local:stop` ("Local starts stopped: 1"); `.playwright-cli/`, the clone and my local screenshot files deleted.

**1. The program editor with nothing solved (new game).** Screen Programy of a new game: the list holds „Program”; „Plan wyprawy: pusty”; the group „Program · Zawsze · 0 reguł” with „Pusta grupa — przepuszcza dalej.”; „+ reguła” is greyed out (disabled), as D-124 says until the first chill. Layout clean, nothing clipped.
![the program editor of a new game: the group is empty and „+ reguła” is disabled](https://github.com/mariusznazar/screenshots/blob/914c60ae33de6d550d243237dc67bd32344bb137/loop2/pierwsza-mapa-bez-loterii/editor-new-game.png?raw=true)

**1b. The resource choice with nothing solved.** In the game with everything discovered and nothing solved, „+ reguła”, condition „Tu leży mniej niż”: „Cel warunku” offers **four** choices, Patyk, Jagoda, Mech, Włókno (read from the page, and seen in the picture). That is what `offeredResources` does for every map of the data; Skraj lasu alone holds two of them.
![the rule panel with the condition „Tu leży mniej niż”: the target offers Patyk, Jagoda, Mech and Włókno](https://github.com/mariusznazar/screenshots/blob/914c60ae33de6d550d243237dc67bd32344bb137/loop2/pierwsza-mapa-bez-loterii/editor-resource-pick-nothing-solved.png?raw=true)

**2. The screen of a map run on Skraj lasu.** From the new game: „Mapy”, the one row „Skraj lasu”, its card, „Wejdź: Ala, mapa Skraj lasu”. The screen of the run: header „Ala · Skraj lasu · Minuta 1 · Passa 1/480” with a bar, the pace buttons (1× marked), „Pauza”, „Restart”, „Zakończ”; on the left the scene (a snowy forest with the mage standing near the middle), under it „Czeka — żadna reguła nie pasuje” and „Potem żadna reguła nie pasuje — postać stanie” (in the warning colour), the body row „Temperatura 36,9 °C · bez ognia 82 min”, „Sytość 99 % · bez jedzenia 115 min”, „Zdrowie 100”, „Energia natury 100”, „Plecak 0/15”, the hex map with the entrance tile marked and „(1, 1)”, the tabs „Kronika” and „Teren”; on the right the copy of the program („Kopia: Program”, one empty group, „+ reguła” disabled). The goal in numbers is the „Passa 1/480”. Nothing clipped, nothing overlapping.
![the screen of the map run on Skraj lasu at game minute 1](https://github.com/mariusznazar/screenshots/blob/914c60ae33de6d550d243237dc67bd32344bb137/loop2/pierwsza-mapa-bez-loterii/run-skraj-lasu-start.png?raw=true)

**Motion, in words.** About twelve real seconds later the header read „Minuta 15 · Passa 15/480” (the minute grows about once a second at 1×, the streak with it); temperature fell to 36,6 °C and satiety to 91 %; the mage did not move, since the program is empty; a dashed frost frame (D-372) had appeared along the edge of the scene picture, which was not there at minute 1.
![the same screen at game minute 15: the streak is 15 of 480 and frost has begun on the edge of the scene](https://github.com/mariusznazar/screenshots/blob/914c60ae33de6d550d243237dc67bd32344bb137/loop2/pierwsza-mapa-bez-loterii/run-skraj-lasu-later.png?raw=true)

All four images hold only the made-up account of this start: no address (the page shows none on these screens), no password, no token. They lie in commit `914c60ae33de6d550d243237dc67bd32344bb137` of `mariusznazar/screenshots`, directory `loop2/pierwsza-mapa-bez-loterii/`, branch `loop2/pierwsza-mapa-bez-loterii` (taken with `switch`, pushed `ef28017..914c60a`, nothing pushed to `main`). No screenshot file remains in this repository or in the cycle's directory (I also removed the five of the earlier fix review that lay under `.runs/task-cycles/pierwsza-mapa-bez-loterii/screenshots/`; four of them are already in the screenshots repository, `the screenshot of the list after Skraj lasu is solved` is not, and was a duplicate of the card of Las's list).

**Defects found.** None of this change. One observation, outside the task and not a fault of it: a new player's first minutes on Skraj lasu show „Czeka — żadna reguła nie pasuje” with „+ reguła” disabled, because the first rule is written only at the first chill in game minute 84 (D-121, D-123, D-124); the task that rewrites those entries (task 10) is the one that changes this.

## Unread material

D-357 and D-358 were not read whole: the skill's section "Show a screenshot to the human" implements them and I followed that section. The decisions main changed besides those named above were compared by sentence, not read whole.

## Searches not found or unclear

None.
