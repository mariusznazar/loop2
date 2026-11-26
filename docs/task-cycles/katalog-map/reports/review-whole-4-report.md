FAIL 8725b92dfe98ae9b0abe770027aeebf7d90c1eb3

# Review of the fix of the findings of the second whole-change review, task `katalog-map`

- Worktree `the task's worktree`; `git rev-parse HEAD` = `8725b92dfe98ae9b0abe770027aeebf7d90c1eb3`, the head given. Fix range `523046f6..8725b92d`: `69d98b19` (move of the card), `bf3e933a` (title, short sentence, condition in „Żąda”), `8725b92d` (D-327, D-133, styleguide).
- Method: `.the-way/task-cycle/review/fix.md` (read whole again) with section 2 and 3 of `SKILL.md`. Findings file `reports/findings-whole-2.md` and fix report `reports/fix-whole-2-report.md` read whole.
- Result: B1 **remains in part** (the title is fixed; D-327's departure sentence, rewritten by the fix, is still broader than the code — finding R1 below, Important); B2 fixed; Minor 1–5 fixed. No other new Critical or Important finding; one new Minor.

## Each finding of the findings file

### B1 — the title and D-327's departure list: remains (in part)

Fixed in its first half:
- `src/browser/tokens.css:59` adds `--font-size-map-card-title: 22px; /* Source: loop, https://kantarion.bieda.it/ read 2026-11-26 from the rendered page: the title of the card of a map, the element h1 „Skraj lasu” at /mapy/forestEdge, its computed font-size 22px */` — the same form as the other loop values (site, date, "from the rendered page", the element), the comment after `;` on the line, as `design-token-sources` reads it (`npm test -- tests/invariants/test_design_token_sources.py` → 0). Named by what it is for (D-48).
- I opened the page myself (Playwright, `https://kantarion.bieda.it/mapy/forestEdge`, 2026-11-26): `article h1` „Skraj lasu”, class `text-[22px]`, computed `font-size` 22px, `font-weight` 400, `line-height` 33px. The source is true.
- `.maps-card-name` reads the token and `--font-weight-body` (400, the old title's weight). D-327 („at the size and weight of the predecessor's card title”), its complying and violating examples (22 px against 15 px) and the styleguide's card item agree.

Not fixed in its second half, see **R1**.

### B2 — the short sentence: fixed

- Each of the five maps has `goalText` in `src/browser/sim/data/maps.ts`, true of its `solving`: Skraj lasu and Las 480 min → „Osiem godzin bez jednej zmiany programu.”; Las — głębiej 540 min, 2 attacks → „Dziewięć godzin … i dwa pokonane wilki.”; Las — wataha 540, 6 → „… sześć pokonanych wilków.”; Las — matecznik 600, 1 → „Dziesięć godzin … i jeden pokonany niedźwiedź.” (each checked against the map's `solving` and `attackers`).
- The card shows it under the heading (`map-card.tsx`, `goalSentence`); the whole `solvingText` closes „Żąda” under its table (`.maps-card-condition`, `text-secondary`, detail size). Nothing the card said before is lost.
- D-133 („in its part „Żąda”, under the table”) and D-327 (the short sentence written by hand; „Żąda” closes with the condition) say what the code does; `tests:` clauses follow.
- The view names no map: the sentences live in the data (`test_content_identifiers.py` → 0).
- Tests hold it by hand-written expectations: `tests/view/map-lines.test.mjs` the five sentences written out; `tests/view/maps-screen.test.mjs` the sentence under the heading and the condition in „Żąda” for Skraj lasu, Las and Las — głębiej; `tests/sim/data.test.mjs` `goalText` in the two whole-map expectations.
- „dwa pokonane wilki” against „dwie pokonane napaści wilka”: **no rule** is at stake. D-146 makes a beaten attack exactly an attack whose creature reaches zero health („a creature at zero makes a beaten attack”), so two beaten attacks are two defeated wolves and the sentence is true of the data; the predecessor wrote „wilki” as well. Which words the player reads is **a choice for the human**. The same holds for „Osiem godzin bez jednej zmiany programu.” leaving out „bez utraty zdrowia od zimna i głodu”: the old sentence left its counterpart out too, and the whole condition stands under „Żąda”.

### Minor 1 — fixed
`CHOOSE_TEXT` is a module-private `const` of `src/browser/view/map-card.tsx`.

### Minor 2 — fixed
`map-card.tsx` keys an icon of a table row by `${icon}|${index}`.

### Minor 3 — fixed
The card's components moved to `src/browser/view/map-card.tsx`. `69d98b19` alone, compared line by line with the card's block of `maps-screen.tsx` at `523046f6`: identical but for Minor 2's key and `export` on `MapCard`, so no change of behaviour. Sizes (probe below): `maps-screen.tsx` 693 → 505 code lines (848 → 640 lines in all); `map-card.tsx` 222 lines, under 400 code lines; `MapCard` 116 code lines (115 before, +1 for the condition line), `MapsView` 167 and `CharacterRow` 165, unchanged; the size test passes.

### Minor 4 — fixed
The doc of `demandRows` (`map-lines.ts`) and the test's name and comment (`tests/view/map-lines.test.mjs`) say „in hours, or in minutes where it is not a whole number of hours”.

### Minor 5 — fixed
`tests/view/maps-screen.test.mjs` compares the classes of the heading's children in order and the texts of name, tag and opener apart, no longer the run-together text.

## Finding of this review

### R1. D-327 still says the card departs from the predecessor's „in six things only”, and the predecessor's heading carries the icon of the creature that attacks, which this card's heading does not — Important (remains of B1)

- Place: `foundations/decisions.md`, D-327, second paragraph, „It departs from the card of the predecessor game, beyond its words and the roles of its parts, in six things only: …” (written by `8725b92d`); `src/browser/view/map-card.tsx`, the heading (`maps-card-top`: name, tag, opener, button).
- What is wrong: the predecessor's heading row holds, beside the title, the icon of the map's attacking creature: `{threat && (<span className="ml-auto self-center text-zinc-400 desk:ml-0"><Icon name={threat.icon} className="block size-[17px]" /></span>)}` (`src/components/probe/MapPage.tsx:144-148`, `the old game's repository`, branch `feat/archetypes`). This card's heading has no such icon. An icon is neither a word nor a role, and it is none of the six listed things, so the sentence the fix wrote is broader than the code (WAY-263: restated more broadly). A second, weaker case of the same kind: on a phone the predecessor stands its entry button in a bar pinned to the bottom of the screen (`MapPage.tsx`, the `sticky bottom-[61px] … desk:hidden` block holding `{actions}`), while this card puts „Wejdź — wybierz postać” in the heading.
- Why it matters: a reader of D-327, the next task on the card among them, is told the card holds what the predecessor's holds but six named things, and would not look for the creature's icon at the title. The human's comparison of the pair is not affected; the foundation is.
- Fix (one of): name the heading's creature icon (and the phone's pinned entry bar) among the departures; or narrow the sentence to what it means to count (for example „in what its parts hold”) so that the heading's look is outside it; or put the icon into the heading. Whichever is chosen, the test lines that quote „… in six things only” follow.
- Evidence: the old `MapPage.tsx` lines quoted, read with `git -C the old game's repository show feat/archetypes:src/components/probe/MapPage.tsx`; `map-card.tsx` heading. On the running old page Skraj lasu has no attacker, so the icon could not be seen there, and a map with an attacker was not open in a fresh game (the address `/mapy/forestDeep` led back to `/mapy`); the code is the evidence.
- Contradiction: yes — D-327 („It departs from the card of the predecessor game, beyond its words and the roles of its parts, in six things only”), an entry this change writes.

## New Minor (within the task)

1. D-327, first paragraph, „the mean gap between attacks counted with it” — the trim to 300 words (now 297) turned „counted with that quiet time” into „it”, which a reader may refer to „the chance of an attack” or „one total number” before it. Nothing true was lost: I compared the first paragraph before and after word by word; the other changes are the title's size and weight, the short sentence and the condition moved into „Żąda”, each true of the code. The *Rationale*'s closing „the streak stands twice, in the sentence in minutes and in „Żąda” in hours” is still true (both now in „Żąda”; the short sentence gives it a third time in words).

## Declined to judge

- The wording of the five short sentences („wilki”, what they leave out of the condition) — the human's choice, as said under B2.
- The new screenshots (commit `3125cd88…` of `mariusznazar/screenshots`) — not opened; the human judges the pair.
- „Teren” values after their labels and the tag's grey — look choices for the human, unchanged by the fix.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` | 0 | `8725b92d…` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .the-way/task-cycle/change_file_sizes.py 523046f6 8725b92d` | 0 | 12 files, +95; `map-card.tsx` +222 (added), `maps-screen.tsx` 848 → 640 |
| `node .runs/review-whole-4/p.mjs src/browser/view/maps-screen.tsx src/browser/view/map-card.tsx src/browser/view/map-lines.ts` (the probe kept as `reports/review-whole-3-size-probe.mjs`) | 0 | functions over 100 / files over 400 code lines: `CharacterRow` 165, `MapsView` 167, `maps-screen.tsx` 505, `MapCard` 116 |
| `diff` of `MapCard` and its parts in `map-card.tsx` at `69d98b19` against the block of `maps-screen.tsx` at `523046f6` | 1 (differences) | only the key of Minor 2 and `export` |
| `npm run --silent typecheck` | 0 | — |
| `npx eslint --max-warnings 0` on `map-card.tsx`, `maps-screen.tsx`, `map-lines.ts`, `sim/data/maps.ts` and the four changed tests | 0 | — |
| `npx prettier --check` on the same, `maps-screen.css` and `tokens.css` | 0 | — |
| `npm test -- tests/view/map-lines.test.mjs` | 0 | 13 pass |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 51 pass |
| `npm test -- tests/view/maps-record.test.mjs` | 0 | 10 pass |
| `npm test -- tests/sim/data.test.mjs` | 0 | 45 pass |
| `npm test -- tests/view/map-catalog.test.mjs` | 0 | 13 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 132 pass |
| `npm test -- tests/invariants/test_content_identifiers.py`, `test_design_token_sources.py`, `test_browser_view_token_values.py`, `test_browser_view_framework.py`, `tests/quality/test_function_and_file_size.py`, one at a time | 0 each | 5, 2, 4, 9 and 2 OK |
| Manual: Playwright on `https://kantarion.bieda.it/mapy/forestEdge`, computed style of `article h1` | — | 22px, 400, 33px |
| Manual: `git -C the old game's repository show feat/archetypes:src/components/probe/MapPage.tsx`, lines 127-300 | — | the old card's heading, „Żąda”, „Teren”, the phone bar (R1, the six departures) |

The six departures, each checked against the old card and the code: the attack line's one total number (old: „potem {h} karencji — średnio raz na …”) true; no „gasi” (old: `map.suppresses`) true; no „bez ognia” line where the map does not cool (old: „nie stygnie”) true, and all five maps cool today; „Żąda” as a table closing with the condition (old: rows with icons, no labels) true; the record in „Czyha” true; the button to „Kto idzie” (old: `onChoose` opens a picker) true. What is missing from the list is R1.

Not run: the full gate (the orchestrator's); the size test on the base (nothing is over a threshold on the head).

## Working copies

- `.runs/review-whole-4/` held the diffs of the fix, the card's file at `69d98b19`, the card's block at `523046f6`, the logs of the checks and a copy of the size probe; removed with `rm -rf` on that full path before returning.
- The browser tool wrote two page snapshots by itself, `.playwright-mcp/page-2026-11-25T23-29-54-773Z.yml` and `page-2026-11-25T23-29-59-894Z.yml`, in the main checkout's ignored directory; both removed by their full paths (the older file there is not this review's and stays). The browser was closed.

## Unread material

- Decisions read whole in this review besides the 47 of the earlier one: **0 new ones**; D-327 and D-133 read again whole at the new head (both already among the 47), and D-146's binding sentence (already in the index of the earlier review) for the „wilki” question.
- The fix diff read whole, every file. `map-card.tsx` read through its diff against the earlier block and its header.
- Styleguide: only the card item changed by the fix, read whole with the lines around it; the rest was read whole in the earlier review and is unchanged.
- The new screenshots: not opened.

## Searches not found or unclear

- A map with an attacker on the running old page: not reachable in a fresh game (`/mapy/forestDeep` led to `/mapy`), so the heading's creature icon of R1 rests on the old code alone.
- Whether D-327's departure list is meant to count the look of the heading and the phone's pinned bar, or only what the parts hold: unclear from its words — the reason R1 offers both fixes.
