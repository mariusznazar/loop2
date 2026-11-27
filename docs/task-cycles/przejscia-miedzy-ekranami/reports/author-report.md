**Status:** done

# Author report — task `przejscia-miedzy-ekranami` (the whole change as the one author)

Worktree `the worktree's root`, branch `task/przejscia-miedzy-ekranami`, base `ef53bb134f393df39cccb4368f8e8d30dc81f1ac`, `.the-way` at the pinned `6ed3cb36`. Nothing pushed to the task branch.

## Commits

| Commit | What |
|---|---|
| `3fc8428e` | docs: D-200, D-287, D-280, D-311 rewritten as the four rows of *Settlements to record* give; D-196's *Rationale* follows |
| `f1544c49` | feat: header link „← {imię postaci}”, „← Siedziba” on Postać, „Kup” open while the manual map run waits/has ended, the sentence at „Umiejętności” at the run's character alone; tests |
| `328562ac` | docs: styleguide rules „The screen Postać” and „Main button, secondary action and tab” (task point 6); the example „Ekran w Reactcie: Postać” of `guidelines/coding-browser-module.md` |

## Files changed (added / removed lines, base..HEAD)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 59 | 34 |
| `guidelines/coding-browser-module.md` | 4 | 3 |
| `guidelines/styleguide-browser-view.md` | 37 | 7 |
| `src/browser/character-screen.css` | 34 | 0 |
| `src/browser/run-screen.css` | 39 | 0 |
| `src/browser/sim/skills.ts` | 22 | 2 |
| `src/browser/view/character-screen.tsx` | 12 | 2 |
| `src/browser/view/character-trees.tsx` | 18 | 7 |
| `src/browser/view/run-header.tsx` | 18 | 4 |
| `tests/sim/death.test.mjs` | 1 | 1 |
| `tests/sim/loop.test.mjs` | 2 | 2 |
| `tests/sim/skills.test.mjs` | 80 | 10 |
| `tests/sim/trip.test.mjs` | 1 | 1 |
| `tests/view/account-screen.test.mjs` | 52 | 3 |
| `tests/view/character-screen.test.mjs` | 71 | 23 |
| `tests/view/maps-screen.test.mjs` | 3 | 3 |
| `tests/view/run-header.test.mjs` | 25 | 7 |

`src/browser/view/screen-address.ts` and `src/browser/sim/saved-game.ts` are unchanged (only `screenAddress` is imported).

## What the change does

- `src/browser/sim/skills.ts`: new `purchaseOpen(state)` — true unless a manual map run goes on (not paused, not ended); `buyBranch` refuses only then. The rank goes into the team's character, never into `state.run`, so the map run waiting keeps the skills of its start and `restart` (which reads `state.run.character.skills`) starts without it. The end test (`death`/`completion`) is written out rather than imported from `run.ts`, because `run.ts` imports `skills.ts` (the comment says so).
- `src/browser/view/character-trees.tsx`: „Kup” disabled by `!purchaseOpen || unaffordable`; the sentence under „Umiejętności” is now „Przejście na mapie {mapa} jest niezakończone. Kupiony stopień działa od następnego przejścia tej postaci, także w pętli; „Restart” zaczyna bez niego.” and stands only where `run` is given; `character-screen.tsx` gives `run` only when it is this character's run, and `purchaseOpen(state)`.
- `src/browser/view/character-screen.tsx`: `<a class="character-screen-back" href="#/">← Siedziba</a>` as the first child of `.character-screen`, above the two areas.
- `src/browser/view/run-header.tsx`: the `h2.run-header-name` now holds `<a class="run-header-back" href="#/postac/{n}">← {name}</a>`.
- CSS: both links have no underline, padding `--space-2xs --space-xs`, `highlight` under the pointer; in `@media (width < 1280px)` they hold `--touch-target-min` both ways (inline-flex, text centred vertically); in `@media (width < 1280px) and (hover: none)` no `highlight`. The header link keeps the name's look (`text-strong`, heading size, inherited); „← Siedziba” is in `text-label` like a menu item that does not mark the place.

## Checks run (command → exit code)

Test first, seen failing for the expected reason, then passing:

- `npm test -- tests/sim/skills.test.mjs` → **1** before the simulation change (2 failing: „a purchase is taken while a manual map run waits…” — rank 0 where 1 was expected; „a rank bought while the map run waits…” — same), → **0** after (21/21).
- `npm test -- tests/view/run-header.test.mjs` → **1** before the view change (the new link test and the order test, `"Ala"` where `"← Ala"` was expected), → **0** after (24/24).
- `npm test -- tests/view/character-screen.test.mjs` → **1** before (the „Kup is active…” test: expected the new sentence, got „…Stopnie kupisz po jego zakończeniu.”; the „← Siedziba” test: expected `a`, got `div`), → **1** after the view change (my test re-opened a tree whose open state the same component keeps across `update`, so it folded it — a fault of the test's flow, not of the code; fixed by not toggling again), → **0** (18/18).
- The integration test in `tests/view/account-screen.test.mjs` („← {name}” in the header … „Kup” there buys …) was written after the code; I broke `purchaseOpen` for a moment to return `run === null` only: `npm test -- tests/view/account-screen.test.mjs` → **1** (that test alone failing, 132/133), restored the code (diff checked), → **0** (133/133).
- The test „„Kup” is inactive while the map run goes on” passed before and after: it guards against loosening the refusal too far, which the old code already met.

Focused checks after the change (each → exit 0): `npm test --` each of `tests/sim/skills.test.mjs` (21), `tests/sim/death.test.mjs` (33), `tests/sim/loop.test.mjs` (46), `tests/sim/trip.test.mjs` (24), `tests/view/run-screen.test.mjs` (25), `tests/view/end-window-game.test.mjs` (27), `tests/view/maps-screen.test.mjs` (52), `tests/view/character-gear.test.mjs` (7), `tests/view/run-header.test.mjs` (24), `tests/view/character-screen.test.mjs` (18), `tests/view/screen-registry.test.mjs` (15), `tests/view/menu-bar.test.mjs` (32), `tests/view/account-screen.test.mjs` (133), `tests/invariants/test_browser_view_focus_outline.py` (3), `tests/invariants/test_browser_view_token_values.py` (4).

Other checks: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → 1 after the decision edits (13 errors, all `decision:` quotations of the old D-200/D-287 wording), → 0 after the quotations were updated; `python -B .the-way/elements/common/foundation_check.py` (no switch) → 0, run again after the guideline commit → 0 („0 errors”); `python -B .the-way/instruction-files/check_instructions.py` → 0 (0 error, 0 warn); `npx prettier --check` on the changed TS/MJS/CSS → 1 (three test files), after `npx prettier --write` on them → 0; `npx eslint` on the changed TS/MJS → 0; `node tests/quality/eslint-size-rules.mjs` (before the change, to see whether any touched file stands over the D-425 threshold) → 0 functions and files over a threshold, so no preliminary move commit was needed.

Not run: the full `npm test` (the gate is the orchestrator's or CI's, as the handoff gives); StrykerJS on `skills.ts` (the reviewer's tool under `guidelines/testing.md`).

## Own-work check

Requirement most likely unmet: To do 2 — the purchase in the pause must not reach the map run waiting nor the map run „Restart” starts, yet must reach the next map run after „Zakończ”, and it must survive the save and the real store path (`actWithoutCatchUp`) after leaving the run screen by the new link. Checks: the sim test „a rank bought while the map run waits leaves its skills as they were; „Restart” starts without it, and the next map run after „Zakończ” starts with it” (pause and completion), the integration test in `account-screen.test.mjs` (link → Postać, map run paused and saved, „Kup” → the saved game holds the rank at the character and the run's skills unchanged), and the walk below in the running game. All showed the requirement met. I also checked that no other path writes the run's skills back to the team (`teamAtRunStop`/`teamAtRunEnd` touch gear only; completion payment `paidPractice` keeps ranks; a death that takes everything resets the team's skills as before), and that the balance instrument (`balance/campaign.mjs`, `balance/progression.mjs`) buys only after `end`, so no measurement changes.

Mutation in head: a `purchaseOpen` that ignores `paused` → the pause case of the sim test fails; ignoring `completion`/`death` → their cases fail; returning `true` always → the refusal test fails; the view passing `state.run` to every character → the „no sentence at another character” assertion fails; a header link to `#/postac/{run's other id}` → the „Basia/#/postac/2” assertion fails; „← Siedziba” moved into an area → the order assertion fails. The touch target and the hover rules of the phone layout have no jsdom test (the styleguide's rule "Two layouts and one threshold"), checked in the browser below.

## UI check and walk (`ui_check.md`, `walkthrough.md`)

The change alters what a player sees. Walk in Chromium through `playwright-cli` 0.1.22 on `npm run local` (`https://127.0.0.1:62926`, local build of this worktree, Windows 11), account `agent@example.test` (made-up), a state composed with the game's own functions (two characters „Nowa postać” and „Basia”, points in Eksploracja and Zbieranie małych przedmiotów, a map run of „Nowa postać” on Skraj lasu) and sent by the ordinary save request.

| Case | By what | Verdict |
|---|---|---|
| The header of the map run begins with „← Nowa postać”, a link to `#/postac/1` | screen at 1600 × 1000, reading of the element | pass |
| After „Wznów”, a click on the link opens `#/postac/1`; the map run stands paused at its minute (minute 2, still 2 after 2 s), „Wróć do przejścia · Skraj lasu · minuta 2” on the bar, the bar marks Siedziba | screen, reading of the page | pass |
| On Postać „← Siedziba” stands at the top above both areas, href `#/` | screen | pass |
| At „Nowa postać” the new sentence under „Umiejętności”; „Kup: Wprawne oko” active; a purchase saved: character `keenEye: 1`, the run's skills `{}`, `paused: true`, minute 2 | screen and `GET /api/saved-game` | pass |
| At „Basia” (`#/postac/2`) no sentence, „Kup” active | screen | pass |
| „Restart”: the new map run starts with no `keenEye`, the character keeps it | `GET /api/saved-game` | pass |
| „Zakończ” → Postać with no sentence; a new send from Mapy: the run starts with `keenEye: 1` | screen and save | pass |
| Phone layout 360 × 740 with touch: header link 108 × 48, „← Siedziba” 73 × 48; a tap on each leads to `#/postac/1` and to `#/` (Siedziba shown); measurement: `scrollsToTheSide: false`, `controlsSmallerThan48: []` on both screens | `.claude/skills/loop2-play/SKILL.md` measurement | pass; `contentWiderThanItsBox`/`outsideTheWindow` list only the scene picture and the figure's sprite sheet (cropped pictures, not text), which the change does not touch |
| Side observation | console | only the ordinary 401 of `/api/account` before sign-in and the favicon 404; no `uncaught` line |

Not checked: the look under the pointer and the keyboard focus ring of the two links in a real browser (the rules are the shared `:focus-visible` and the same `highlight` pattern as the menu items; no screenshot of the hover state was taken); Firefox and Edge (D-396: by hand in a session of their own); a real Android phone; the ended map run on Postać in the browser (held by `character-screen.test.mjs` with a death, and by the sim test with a completion); the header link while the end-of-run window stands (the header is hidden with it, held by the existing run-header test). Errors outside the task's scope: none found.

### Screenshots (repository `mariusznazar/screenshots`, branch `loop2/przejscia-miedzy-ekranami`, commit `6ec4ec244b159b3598fe249e1fa64e338783a120`)

Old Loop (31 October, 1600 × 1000) beside loop2 after the change (1600 × 1000), then loop2 in the phone layout (360 × 740 with touch), which the old Loop has not:

```text
![Old Loop: the screen of a map run, „← Nowa postać” at the start of the header](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop_06_przejscie_ekran.png?raw=true)
![loop2: the screen of a map run, „← Nowa postać” at the start of the header](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop2_przejscie_1600.png?raw=true)
![Old Loop: the screen of a character, „← Siedziba” at its top](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop_13_postac.png?raw=true)
![loop2: the screen Postać, „← Siedziba” at its top, the map run paused, „Kup” active with the sentence of when the rank acts](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop2_postac_1600.png?raw=true)
![loop2, phone 360 px: the screen of a map run with „← Nowa postać”](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop2_przejscie_360.png?raw=true)
![loop2, phone 360 px: the screen Postać with „← Siedziba”](https://github.com/mariusznazar/screenshots/blob/6ec4ec244b159b3598fe249e1fa64e338783a120/loop2/przejscia-miedzy-ekranami/loop2_postac_360.png?raw=true)
```

The loop2 run screenshot is paused at minute 2 on the map run's own scene; the old one stands at minute 00:00 — the closest state the old picture allows. The old Postać shows an ended run (death); the loop2 Postać shows the run paused with the tree open, the state this task adds.

### Departures from the answers to questions 2–3 (look only, To do 5)

- „← {imię}” keeps loop2's look of the name (heading size, `text-strong`) instead of loop's smaller grey text: the name was already the header's heading in loop2, and the map name beside it keeps its own size; whether the link exists and where it stands is unchanged.
- The arrow and the name are one link, the arrow part of its accessible name („← Nowa postać”), so it is not read as a second „Siedziba” beside the menu item on Postać either („← Siedziba”).
- „← Siedziba” is in `text-label`, as an unmarked item of the menu bar, close to loop's grey.

## Foundation entries (foundation step)

Each written through `elements/decisions/skill/SKILL.md` of the pinned the-way (read with `read.md`, `decide_entry.md`, `template.md`, `elements/common/rules.md`, `elements/common/way_of_working.md`, `examples.md` → WAY-03). No row became a second entry: each changes the decision its *Goes to* names. No entry is `the cycle's` (no pair of examples added; *Rejected* holds only ways the rows' sources keep).

| Entry | Mark | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-200 | row 1 (the refusal while the run goes on and „The game has no purchase in the map-run view…” as the task's *Decisions in play* give them) | The player buys a rank on Postać also while a manual map run waits in a pause or has ended; the map run keeps its skills, „Restart” starts without the rank, and only a map run going on refuses a purchase. | Gracz kupuje stopień na ekranie Postać także wtedy, gdy przejście ręczne czeka w pauzie albo się skończyło; przejście zachowuje swoje umiejętności, „Restart” zaczyna bez kupionego stopnia, a kupna odmawia tylko trwające przejście. |
| D-287 | row 2 (with row 1's part on „Kup”) | „Kup” is no longer among the inactive buttons beside a waiting or ended run; the sentence at „Umiejętności” stands at that run's character alone and says the rank acts from its next map run, in a loop too, and „Restart” starts without it. | „Kup” nie jest już nieaktywne przy przejściu, które czeka albo się skończyło; zdanie przy „Umiejętności” stoi tylko przy postaci tego przejścia i mówi, że stopień działa od jej następnego przejścia, także w pętli, a „Restart” zaczyna bez niego. |
| D-280 | rows 3 and 4 | The name at the start of the header of a map run is the link „← {imię postaci}” to that character's Postać, and „← Siedziba” at the top of Postać leads to Siedziba, in both layouts, each holding the touch target. | Imię na początku nagłówka przejścia jest odnośnikiem „← {imię postaci}” do ekranu Postać tej postaci, a „← Siedziba” na górze ekranu Postać prowadzi do Siedziby, w obu układach, każdy z celem dotyku. |
| D-311 | row 3 | The header's sentence says the name stands at its start as the link „← {imię postaci}” to the character's Postać, in place of the name alone, in both layouts. | Zdanie o nagłówku mówi, że imię stoi na jego początku jako odnośnik „← {imię postaci}” do ekranu Postać, w miejscu samego imienia, w obu układach. |
| D-196 | the cycle's (*Rationale* only, no binding sentence) | Its rationale no longer says a waiting map run stops „Kup”; it says the run keeps the skills of its start, without a rank bought in the wait. | Uzasadnienie nie mówi już, że czekające przejście blokuje „Kup”; mówi, że przejście zachowuje umiejętności ze startu, bez stopnia kupionego w czasie czekania. |

Notes on the wording:
- D-311: the header sentence was extended at its end („…„Zakończ”, the name standing at its start as the link „← {imię postaci}” …”) rather than rewritten at its start, so the nine existing `decision:` quotations „The header holds the character's name, the map's name, the clock” stay valid.
- D-280: a new paragraph (the second paragraph had three sentences already).
- D-287: „„Wejdź”, „Puść w pętlę” at that map run's character and „Kup”” became „„Wejdź” and, at that map run's character, „Puść w pętlę””, the reading its *Verification* already gave („Wejdź” of every character).
- D-200 Rejected: question 1's ways b and c; D-287 Rejected: row 2's way not chosen; D-280 Rejected: question 2's b („no cost to the product known”, its source keeps only „najmniejszy”) and c, and question 3's a („no cost to the product known”).
- The UI sentence quotes „Restart” inside the quoted sentence; `foundation_check.py` masks the passage from „ to the first ”, and the check passes with it.

Test quotations changed with the decisions (lines `decision:` only, no assertion changed): `tests/sim/death.test.mjs`, `tests/sim/loop.test.mjs` (2), `tests/sim/trip.test.mjs`, `tests/sim/skills.test.mjs`, `tests/view/account-screen.test.mjs` (3), `tests/view/character-screen.test.mjs` (2), `tests/view/maps-screen.test.mjs` (3).

Tests changed because the task changes the behaviour they held: `tests/sim/skills.test.mjs` „unknown trees, unknown characters, no skill and every retained run refuse purchase” → refusal only while the run goes on (the paused/ended cases moved to a new test asserting the purchase is taken); `tests/view/character-screen.test.mjs` „„Kup” is inactive with the sentence…” → replaced by the „Kup is active…” test; `tests/view/run-header.test.mjs` first case expects „← Ala”, and „the name is the one of the team member…” became the link test. No invariant test changed.

## Choices made (way rejected, cost if wrong)

- `purchaseOpen` in `skills.ts`, exported and used by the view, so „Kup” follows the simulation. Rejected: importing `mapRunEnded` from `run.ts` (an import cycle `run.ts` ↔ `skills.ts`). Cost if wrong: two copies of the end test (death/completion) to keep alike.
- The sentence keeps „Przejście na mapie {mapa} jest niezakończone.” before the new words, so the reason for naming „Restart” is on the screen. Rejected: the new words alone. Cost if wrong: one sentence to shorten.
- The header link inside the existing `h2` (heading kept for screen readers). Rejected: the link replacing the heading.
- Separate rules in each screen's stylesheet for the two links (their looks differ), not a shared part file. Cost if wrong: two similar rules.
- No negative margin to align „← Siedziba”'s text with the areas' edge; it stands 4 px in, by its padding.

## Reaches beyond the dispatch

- `guidelines/coding-browser-module.md`, example „Ekran w Reactcie: Postać”: its sentence „Gdy w stanie gry stoi przejście na mapie (`run !== null`), przycisk „Kup” jest wyłączony…” became false; rewritten to name `purchaseOpen`. Found by search for the old rule.
- D-196 (`foundations/decisions.md`): its *Rationale* named „Kup” as stopped by a waiting map run; found by the search of the foundation for „Kup”.
- D-47, D-44, D-250, D-275 read whole (from the index, for links, controls and the pause) — no change.
- `.the-way/elements/common/foundation_text.py` and parts of `foundation_check.py`, to check how a nested „…” inside a quoted UI sentence is masked.
- `.the-way/product-guidelines/styleguide/SKILL.md` read (it is for refinement; the styleguide was edited in place as task point 6 gives); `product-guidelines/styleguide/template.md` not read.
- `balance/campaign.mjs` and `balance/progression.mjs` read where they call `buyBranch`, to rule out a change of measurements.

## Working copies

- `.runs/author/` (decision index, check outputs, the state-composing script, commit message files) — removed.
- `.playwright-cli/` (screenshots, scripts of the walk) — removed after the push.
- `.runs/screenshots/` (clone of `mariusznazar/screenshots`) — removed after the push.
- `.runs/local-start/` is the product's own database of the local start and stays, as the skill gives. The browser session was closed, `npm run local:stop` stopped the start (1); no process left running.

## Unread material

- `guidelines/testing.md` read whole in two parts (lines 1–199, 199–510); `guidelines/styleguide-browser-view.md` read whole in five parts.
- The decision index (`decision_index.py`) read for its full entries; of its 319 headings-only lines I read the list by a filter for postać/header/branch/link/menu/focus/touch/pause words, not line by line.
- `.the-way/product-guidelines/styleguide/template.md` and `product-guidelines/template.md`: not read (see reaches).

## Searches not found or unclear

- No decision states what „Restart” starts with as to skills; D-200 now carries it (row 1). Found the behaviour in `restart` of `src/browser/sim/game.ts`.
- D-196's binding sentence („the repertoire of the map run's character, including its bought branches”) reads ambiguously after this change; the code uses the map run's own skills, so a branch action bought in the wait is offered in the editors only from the next map run. Left as it is; consistent with D-200.
- The handoff names `src/browser/view/character-trees.tsx` „and the stylesheet of the screen Postać”: that is `src/browser/character-screen.css`.
