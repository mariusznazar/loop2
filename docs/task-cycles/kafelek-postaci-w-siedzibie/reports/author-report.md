Status: done with concerns

# Author report — kafelek-postaci-w-siedzibie (the whole change as the one author)

## Commits

- `3d8cb03d` docs: the foundation entries of the task (D-280, D-446, D-447, D-39, D-42, D-217, D-246, D-44, the rationale of D-389) and the quotations `// decision:` of every test that cited a changed sentence (To do 14).
- `03ff7633` feat: the cards of „Drużyna”, the row of the report, the tile „+ postać”, the dashed kind of the shared button, the kitchen-sink sample, the tests.
- `d19e5445` docs: the styleguide.

## Files changed (added / removed lines, base d79ad0b7..HEAD)

| File | + | − |
|---|---|---|
| foundations/decisions.md | 129 | 86 |
| guidelines/styleguide-browser-view.md | 91 | 9 |
| src/browser/headquarters.css | 193 | 48 |
| src/browser/kitchen-sink/control-samples.tsx | 4 | 0 |
| src/browser/styles.css | 19 | 3 |
| src/browser/view/away-report.ts | 85 | 61 |
| src/browser/view/controls/react-button.tsx | 5 | 3 |
| src/browser/view/headquarters.tsx | 77 | 219 |
| src/browser/view/team-cards.tsx (new) | 241 | 0 |
| tests/view/headquarters-screen.test.mjs | 473 | 82 |
| tests/view/away-report.test.mjs | 190 | 108 |
| tests/view/account-screen.test.mjs | 62 | 55 |
| tests/view/shared-controls.test.mjs | 52 | 0 |
| tests/sim/catch-up.test.mjs | 17 | 17 |
| tests/sim/loop.test.mjs | 2 | 2 |
| tests/view/team-lines.test.mjs | 6 | 6 |
| tests/view/screen-address.test.mjs | 3 | 3 |
| tests/view/character-screen.test.mjs, clock, maps-screen, menu-bar | 1–2 each | 1–2 each |

The quotation-only test files changed only their `// decision:` lines. No simulation file changed; `closeAwayReport` already closes the whole report.

## What the change does (in the player's words)

- Each character in „Drużyna” stands in a card with a thin frame (`control-border`, no background of its own), in a grid: cards of one width, as many as fit (5 at the full width of 1600 px, 4 at 1280 px), two in a row in the phone layout.
- In the card: the hooded-mage icon in the name's colour, the name, the green dot „●” at the end of the name's line while the earning loop goes on and then a green frame; „pokolenie {n} · Mag żywiołów” in `text-secondary`; the line of what the character does — „W obozie”, „Przejście: … · minuta {m}” with its end, or the loop line with „Zatrzymaj” — and after a stop „W obozie” with „Pętla zatrzymana …” under it.
- The resurrection line stands once under the heading „Drużyna”, above the cards; an empty team shows „Drużyna nie ma jeszcze postaci.” there instead.
- The report lines stand in their character's card, under a thin line, with no name; above „Drużyna” stands one row: the counting sentence („Bez ciebie 1 pętla stanęła, 2 chodziły bez przeszkód.”, red where a loop stopped, green otherwise, no „Bez ciebie” where an open-game stop is among the lines), „Skrzynka jest pełna.” in `warning` where the chest is full, and one „Zamknij”.
- The whole card is the link to the screen Postać (the name's link area stretched over the card), under the pointer the card turns `highlight`; „Zatrzymaj” and „Odbierz” are buttons above that area.
- The grid ends with the dashed „+ postać” (new shared button kind `dashed`); a touch opens, in its place, the archetype, the field „Imię nowej postaci”, „Załóż” and „Anuluj”; an empty team has it open from the start, with no „Anuluj”, Escape not closing it.

## Checks run (command → exit code)

Every `npm test -- <file>` below builds first and runs one file only (the guidelines' way for one file); the full gate was not run, as the handoff asks.

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 (run three times, last after the final edit) |
| `npx eslint <the 9 changed TS/JS files>` | 0 |
| `npx prettier --check <the changed TS/JS files> src/browser/headquarters.css src/browser/styles.css` | 0 |
| `node tests/quality/eslint-size-rules.mjs` | prints „0 functions and files over a threshold in 387 files” |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 (37 pass), final HEAD |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (132 pass), final HEAD |
| `npm test -- tests/view/away-report.test.mjs` | 0 (23 pass), final HEAD |
| `npm test -- tests/view/shared-controls.test.mjs` | 0 (71 pass), final HEAD |
| `npm test -- tests/view/team-lines.test.mjs`, `character-screen`, `maps-screen`, `menu-bar`, `screen-address`, `clock`, `icons`, `camp-picture`, `tests/sim/catch-up.test.mjs`, `tests/sim/loop.test.mjs` | 0 each (quotation-only changes) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 1 at first, then 0 (see below) |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 first (92 quotations of old wording), 0 after the requotes |
| `python -B .the-way/elements/common/foundation_check.py` | 0 („0 errors”), final HEAD |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 (0 error, 0 warn) |

The failing then passing runs, both kept:

- `test_browser_view_token_values.py`: exit 1 — `src/browser/view/team-cards.tsx` held the string literal `"field"`, which the test reads as the CSS system colour `Field`. Renamed the focus targets to `"name"`/`"tile"`; exit 0. A real finding of the invariant's test, not a flake.
- Test seen failing before its code (mutation of the code under test, then restored):
  - dashed button: `border-style: dashed` replaced by `solid` in styles.css → `npm test -- tests/view/shared-controls.test.mjs` exit 1 (70 pass, 1 fail); restored → exit 0.
  - redraw of a card at a minute of the manual map run: `one.runLine === other.runLine` removed from `sameDrawn` → `npm test -- tests/view/headquarters-screen.test.mjs` exit 1 (the status case fails); restored → exit 0.
  - Enter in the field: written after the browser walk found the bug; with `event.preventDefault()` removed → exit 1 (the new case fails); restored → exit 0.

Not run: the full gate `npm test` (the human asked it to wait; the orchestrator's or CI's run), `gate_times.py`, `tests/quality/test_quality_invariants.py` as a whole (ESLint/Prettier were run on the changed files directly instead), StrykerJS (no simulation file changed). Firefox and Edge were not checked (D-396 says by hand, by a person).

## Own-work check

- Weakest requirement: To do 9 — after „Załóż” the tile closes and the closed „+ postać” takes the focus; jsdom has no default acts of keys, so a browser could differ.
- Check: in Chromium (Playwright CLI, local start), empty team, typed „Ala”, pressed Enter, read the tile's class and the focused element.
- Result: it **failed**: the tile stood open again with the focus in the field. Cause, verified by the fix: the focus moved to the closed „+ postać” within the Enter keydown, and Chromium then pressed the newly focused button with the same Enter. Fixed with `preventDefault()` on Enter in the field (`src/browser/view/team-cards.tsx`), covered by the new case „Enter in the field creates as „Załóż” does and spends the key…” in `tests/view/headquarters-screen.test.mjs`, seen failing without the fix; the browser then showed the tile closed, one card, focus on „+ postać”.

## Walk through the running product

Where: Windows 11, Chromium of Playwright CLI 0.1.22, `npm run local` (https://127.0.0.1:57464), account `agent@example.test`; states composed with the built simulation and sent by the save request (skill loop2-play).

| Case | By what | Verdict |
|---|---|---|
| One character in the camp, 1600 × 1000: card with icon, name, „Mag żywiołów”, „W obozie”; resurrection line once; „+ postać” after it | screen, screenshot | pass |
| Five characters (in camp, earning loop, manual run, after a stop, generation 2): five in a row, green frame and dot only at the loop, „Przejście: Skraj lasu · minuta 0”, „W obozie” + „Pętla zatrzymana · wprawa: …” | screen, screenshot | pass |
| Report: sentence red with „Bez ciebie 1 pętla stanęła, 1 chodziła bez przeszkód.”, „Zamknij”; lines in Ala's and Ola's cards with no name; „Odbierz” green | screen, screenshot | pass |
| A real catch-up of 4 game minutes produced the green „Bez ciebie 1 pętla chodziła bez przeszkód.” and „4 min” in the card | screen | pass |
| Hover over a card away from the name: background `rgb(39, 39, 42)` (= highlight); `elementFromPoint` at the card's corner lies in the link `#/postac/1` | page reading | pass |
| Keyboard Tab reaches the name; the focus ring stands on the name | screen, screenshot | pass |
| Empty team: field open, no „Anuluj”; Enter creates and closes the tile | page reading | fell wrong, corrected (see own-work check) |
| „+ postać” → field focused; Escape → closed, focus on „+ postać”; „Anuluj” → same; „Załóż” → new card, tile closed | page reading | pass |
| 1280 × 720: no side scroll, four columns of 250 px | page reading | pass |
| Phone 360 × 740 with touch: two cards in a row, the long name „Konstantynopolitańczykowianeczka” breaks in its card, no side scroll, `controlsSmallerThan48` empty; the lists of the measurement name only the picture band, as the skill expects | measurement, screenshots | pass |
| Phone: tap on a card's lower part → `#/postac/2`; tap „Zatrzymaj: Ala” → address stays `#/`, the card reads „W obozie / Pętla zatrzymana”, focus on „Ala”; tap „+ postać” → focus in the field | page reading | pass |
| Phone with the report and with the open tile: measurement clean, no control under 48 px | measurement, screenshots | pass |
| Side observation | — | the hidden failure row „Coś w grze się zepsuło…” is in the DOM text (hidden), no console error was written; nothing outside the task found |

What I did not check: Firefox and Edge (a person's check, D-396); the kitchen-sink page was built by its invariant test but not opened in a browser; a full chest in the browser (held by the jsdom case); hover of the dashed „+ postać” in the browser (held by the stylesheet case); the real phone.

## Screenshots (repository `mariusznazar/screenshots`, branch `loop2/kafelek-postaci-w-siedzibie`, commit `c47fe3e51ca0c483600d2d5adf0a3964db0adeb4`)

Link form: `https://github.com/mariusznazar/screenshots/blob/c47fe3e51ca0c483600d2d5adf0a3964db0adeb4/loop2/kafelek-postaci-w-siedzibie/<file>?raw=true`

| File | What it shows | What I checked on it |
|---|---|---|
| `loop_13_siedziba.png` | old Loop, Siedziba, one character, 1600 × 1000 (predecessor, D-418) | — |
| `loop_01_start.png` | old Loop, the same with the ready resurrection | — |
| `loop2_siedziba_jedna_postac.png` | loop2, 1600 × 1000, one character „Nowa postać” in the camp, the state closest to the old one | frame in `control-border`, no text outside the frame, icon before the name |
| `loop2_siedziba_kilka_postaci.png` | five characters: camp, earning loop (green frame, dot, „Zatrzymaj”), manual run, after a stop, generation 2 | five in a row, green only at the loop, every line inside its card |
| `loop2_siedziba_kursor_i_fokus.png` | the same with the pointer over Ala's card and the keyboard focus on Ola's name | `highlight` under the pointer, focus ring on the name, not on the card |
| `loop2_siedziba_raport.png` | the report: red counting sentence with „Zamknij”, lines in the cards under a line, „Odbierz” | no name before the lines, red line of the stopped loop, nothing crosses a frame |
| `loop2_siedziba_pusta_druzyna.png` | empty team: „Drużyna nie ma jeszcze postaci.”, the open tile with the field and „Załóż”, no „Anuluj” | dashed frame of the open tile in `control-border` |
| `loop2_siedziba_plus_postac_otwarte.png` | one card and the open „+ postać” with „Ola” typed, „Załóż”, „Anuluj” | focus ring on the field, „Anuluj” as underlined grey text |
| `loop2_siedziba_telefon.png` | phone 360 px, touch: two cards a row, a long name broken in its card, „+ postać” | no side scroll, controls ≥ 48 px (measurement) |
| `loop2_siedziba_telefon_plus_postac.png` | phone, the open tile with „Ola” typed | „Załóż”, „Anuluj” ≥ 48 px, field inside the card |
| `loop2_siedziba_telefon_raport.png` | phone with the report row and the lines in the cards | no side scroll, „Zamknij” and „Odbierz” ≥ 48 px |

The screenshots show only the made-up local account (its address is not on any of them) and no secret.

## Departures within To do 13 and answer 5 (look, words, proportions, spacing, layout)

1. The open tile starts with a line of the new character's archetype — the icon and „Mag żywiołów” in `text-secondary` — in place of today's label „Nowa postać: Mag żywiołów”; why: the open tile then reads like a card in the making, and the field's name stays „Imię nowej postaci”.
2. The frame of the open tile is dashed in `control-border` (the choice answer 5 leaves), so the tile keeps the look of the closed one.
3. The line under a card's own lines that sets the report apart is a solid line in `divider`, not the dashed lighter line of old Loop; why: `divider` is the role of „one part ends, the next begins” (D-40), and a dash of it at 1.19:1 vanishes. Cost: the line is faint (1.19:1 against `panel`).
4. Cards are 250 px wide (old Loop ≈ 192 px at its narrower content), so five fit at 1600 px in the 1344 px content of loop2.
5. „+ postać” text stands in `text`, the default of a shared control, not the dimmer grey of old Loop; the closed tile stretches to the height of its row, as old Loop's grid does.
6. The name stands in `--font-size-heading` (14 px) at the emphasis weight, like old Loop's 14 px name; the second and third lines in the label and detail sizes (11 and 12 px).
7. „Zamknij” stands right after the counting sentence, not pushed to the far end as old Loop's „przeczytane”.
8. After „Odbierz” the focus goes to the card's name (the element of the card that stays), no longer to „Zamknij”, since the button now stands in the card (styleguide rule "Focus does not fall to the page").
No way the human did not choose was taken; no decision the task leaves unchanged was changed.

## Foundation entries written or changed

All through the element's skill (`.the-way/elements/decisions/skill/SKILL.md` read as a file), on the task branch.

- **D-280** — row 8. EN: the whole card of a character on Siedziba is one link, named by the character's name, to its screen Postać, and „Zatrzymaj” and „Odbierz” on it are buttons that open no screen. PL: cały kafelek postaci w Siedzibie jest jednym odnośnikiem do jej ekranu Postać, nazwanym jej imieniem, a „Zatrzymaj” i „Odbierz” w nim są osobnymi przyciskami, które ekranu nie otwierają. Rationale sentence about the name changed with it; *Rejected* adds the name alone („no cost to the product known”, the source keeping „koszt zero”).
- **D-446** — row 2. EN: the archetype's icon stands before the character's name on its card on Siedziba, as a mask in the name's colour. PL: ikona archetypu stoi przed imieniem na kafelku postaci w Siedzibie, maską w kolorze imienia.
- **D-447** — row 3. EN: the card on Siedziba always shows the same line of what the character does as the frame of the screen Postać, and after a stop „W obozie” with the line of the stop under it. PL: kafelek w Siedzibie zawsze pokazuje ten sam wiersz tego, co postać robi, co ramka ekranu Postać, a po zatrzymaniu pętli „W obozie” z wierszem zatrzymania pod nim.
- **D-39** — row 4. EN: `positive` also stands as the frame of a card and the dot „●” beside the name while the character's earning loop goes on, a frame that is no frame at a text. PL: `positive` stoi też jako ramka kafelka i kropka „●” przy imieniu, dopóki pętla postaci chodzi; ta ramka nie jest ramką przy tekście.
- **D-42** — row 5. EN: that green frame has at least 3:1 against `panel` and `highlight`, the colours it touches. PL: ta zielona ramka ma co najmniej 3:1 wobec `panel` i `highlight`, barw, których dotyka. Added to its pair of examples (complies), word for word: „the green frame of the card of a character in an earning loop on a card with no background of its own, so that it touches `panel` at rest and `highlight` under the pointer, on both of which `positive` keeps the 4.5:1 of its text;”. *Rejected* adds the pair of its own in the contrast test (the source keeps it with its reason).
- **D-217** — row 6. EN: Siedziba shows the resurrection line once, under „Drużyna” and above the cards, while the team holds a character, and no card holds it; the screen Postać and „Kto idzie” keep it. PL: Siedziba pokazuje wiersz wskrzeszenia raz, pod „Drużyną”, nad kafelkami, dopóki drużyna ma postać, a kafelek go nie ma; ekran Postać i „Kto idzie” bez zmiany. Changed in its pair of examples (complies), word for word: „„Wskrzeszenie drużyny: użycia 3 z 3” in `text-secondary` under „Drużyna” on Siedziba, on the screen Postać and in „Kto idzie””.
- **D-246** — rows 7, 11, 12. EN: the report lines stand in their character's card, under a line, with no name, a stopped line before a later one, „Odbierz” opening no screen; above „Drużyna” one row holds the counting sentence (declined counts, a zero part left out, „Bez ciebie” only where every line is one of a return), red where a loop stopped and green otherwise, „Skrzynka jest pełna.” once after it, and one „Zamknij”. PL: wiersze raportu stoją w kafelku swojej postaci, pod kreską, bez imienia, wiersz pętli zatrzymanej przed późniejszym, „Odbierz” nie otwiera ekranu; nad „Drużyną” jeden wiersz ze zdaniem liczącym pętle (odmienione liczby, bez części z zerem, „Bez ciebie” tylko przy samych wierszach powrotu), czerwonym albo zielonym, z „Skrzynka jest pełna.” raz i jednym „Zamknij”. The sentence of the order between characters and the titles went; *Rejected* adds 2.5 a, 7.1 a, 7.1 c, 7.2 b, 7.2 c of the task; the older item „closing at each character, as the predecessor game did” was removed, since the predecessor's deployed version closes all at once (`AwaySummary.tsx`) and 7.1 c now carries that way.
- **D-44** — row 15. EN: the closed „+ postać” is built from a kind of its own of the shared button, the dashed button: a dashed frame in `control-border`, its text in the middle, `highlight` under the pointer with frame and text unchanged. PL: zamknięte „+ postać” jest osobnym rodzajem wspólnego przycisku, przyciskiem przerywanym: przerywana ramka w `control-border`, napis na środku, pod kursorem tło `highlight`, ramka i tekst bez zmiany. Added to its pair (violates), word for word: „the closed „+ postać” made as a `<button>` of the screen with a dashed frame of its own.” *Rejected* adds question 10 b and c and 9.2 b.
- **D-389** — the rationale's „the way to a character stays its name in „Drużyna”” now reads „its card”, with D-280 (row 8).
- **Styleguide** `guidelines/styleguide-browser-view.md` — rows 1, 9, 10, 13, 14: the new rule „The section „Drużyna” of Siedziba” (after „The picture band of Siedziba”), the dashed button in „States of shared controls”, „Main button, secondary action and tab” and „The kitchen-sink page”, the green frame in the Roles table (`positive`) and in „Contrast of every pair”, „Anuluj” of the open tile as a secondary action, and the picture band's sentence „do postaci prowadzą kafelki”.

## Choices made (with the way rejected and its cost if wrong)

- A new module `src/browser/view/team-cards.tsx` holds the card and the tile; rejected: growing `headquarters.tsx` (436 lines, under the threshold of D-425, no move needed); cost: one more file.
- The card's link area is the name's `::after` stretched over the card (one link, named by the name); rejected: `role="button"` on the whole card as old Loop does, which would add a second control and a name other than the name.
- `reportLinesOf(state, id)` and `reportSummary(state)` replace `reportEntries`/`reportTitle`; the summary counts only lines of characters the team holds, as the cards show only those.
- Focus after a stop or a take: the card's name.

## Reaches beyond the handoff's selection

- `src/browser/kitchen-sink/control-samples.tsx` (the dashed sample; the styleguide's kitchen-sink rule asks for it).
- `tests/view/account-screen.test.mjs` (the integration cases of Siedziba: creating a character, the report, the resurrection line, the three clicks).
- `.the-way/product-guidelines/template.md` (rules of a guidelines file) and `.the-way/elements/common/rules.md`, `way_of_working.md` steps 2–4, read for the foundation step.
- The old Loop `AwaySummary.tsx`, `CharacterTile.tsx`, `RosterPanel.tsx` lines 120–200 (named by the handoff); `src/sim/report.ts` not opened (the task quotes what it counts).

## Working copies and remainders

- `.runs/author/` (index of decisions, compose script and states, screenshots, logs, backups of mutated files, the clone `.runs/author/screenshots` of the screenshots repository): removed.
- `.playwright-cli/` (Playwright CLI's working files): removed. `.runs/npm-ci.log`: removed.
- Browser: closed (`playwright-cli close`); local start: stopped (`npm run local:stop`, „Local starts stopped: 1”). No background process remains.
- Remainders that stay by the product's own rules: `node_modules/` (installed by `npm ci`), `dist/` (the build), `.runs/local-start/` (the local start's database, which the next start removes).

## Unread material

- The decisions of *Decisions in play* not changed by the task — D-218, D-244, D-245, D-282, D-287, D-54, D-51, D-52, D-279, D-275, D-265, D-396, D-418, D-419, D-38, D-43, D-40 — read by their binding sentences in the index of `decision_index.py` (D-40, D-43 whole); their *Rationale* and *Rejected* not read.
- D-389: binding sentences (index) and its rationale paragraph; its *Rejected* in part.
- `foundations/part_map.md` entry `browser-view`: its description and files (first 30 lines), not the rest of the entry.
- `foundations/glossary.md`: not read.
- `.claude/skills/loop2-scene-art/SKILL.md`: not read (no picture or effect of the scene changed).
- Old Loop `src/sim/report.ts`: not read.

## Searches not found or unclear

- The rationale of D-389 still says „since „Drużyna” speaks of earning loops alone”, which is no longer true now the card shows „Przejście: …”; the task changes only the D-280 sentence there, so I left it — a reviewer or the human may want it rewritten.
- jsdom applies no `@media` block and no browser default act of keys; the phone layout and the Enter case were checked in Chromium.

## Problems as observed

- Found in the browser and fixed: Enter in the field of a new name opened the tile again at once (cause verified: the browser pressed the newly focused „+ postać” with the same key).
- Found by the token test and fixed: the literal `"field"` is a CSS system colour name for that test.
