# Report: the plan's *Foundation entries*, task cycle `ekran-przejscia`

(Saved by the orchestrator from the agent's returned text: the harness refused the agent's own write.)

- **Status:** done with concerns
- **Commit:** `cd8ff84` on `task/ekran-przejscia`, on top of `44317eb`, not pushed.
- **Check:** `python -B .the-way/elements/common/foundation_check.py` exited 0 with „0 errors” before and after the commit. `npm test` was not run: this step changes no code or test.

## Files and commits
- `foundations/decisions.md` +210 −61
- `foundations/invariants.md` +1 −1
- Commit `cd8ff84`

## Entries

| Plan row | Identifier | Meaning (EN) | Znaczenie (PL) | Mark |
|---|---|---|---|---|
| E1 | D-130 | The five pace buttons stand beside „Pauza” in the header of the screen of a map run. | Pięć przycisków tempa stoi obok „Pauza” w nagłówku ekranu przejścia. | projected |
| E2 | D-19 | The numbers of a tile's stock stand in the list and in the line under the drawing, which shows the hovered tile or else the character's tile, never on the drawing. *Rationale* gains the projected sentence. | Liczby zapasu stoją w tabeli i w linii pod rysunkiem (kafelek wskazany, a bez wskazania kafelek postaci), nigdy na rysunku. | projected |
| E3 + E4 | D-311 (new) | The header holds the character, the map and the whole status row in today's order. Under it stand three areas: the world (scene, encounter paragraph, end line, body row with backpack, drawing with its tile line), the program, and on the right the rule editing or else the table of revealed tiles. | Nagłówek z postacią, mapą i całym wierszem stanu nad trzema obszarami: świat, program, a po prawej edycja reguły albo tabela kafelków. | projected (part, WAY-126) · row 1 |
| E5 | D-133 | The goal's numbers stand in the status row in the header. | Liczby celu stoją w wierszu stanu w nagłówku. | projected (part) |
| E6 | D-147 | The encounter paragraph stands in the world area, under the scene and above the body row. | Zapis starcia stoi w obszarze świata pod kadrem, nad wierszem ciała. | projected (part) |
| E7 | D-185 | „Do skrzynki: …” stands in the world area, under the scene and the encounter paragraph, above the body row. | „Do skrzynki: …” stoi w obszarze świata pod kadrem i zapisem starcia. | projected (part) |
| E8 | D-216 | The line about a death stands where „Do skrzynki: …” stands. | Linia o śmierci stoi na miejscu „Do skrzynki: …”. | projected (part) |
| E9 | D-122 | A discovery shows a band in the role `discovery` above the program, with „Dodaj regułę z tym” and „Wznów”, until the player goes on. After a completion in that minute the band has no „Wznów” and stands until „Restart” or „Zakończ”. | Pas odkrycia nad programem z dwoma przyciskami; po rozwiązaniu mapy bez „Wznów”. | projected (part) |
| E10 | D-312 (new) | The band says „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, with no rule number. It names the copy's first rule group as it stands and leaves the sentence out when the copy has no group. | Pas mówi „Gra dopisała regułę w grupie „{nazwa grupy}”: …”, z obecną pierwszą grupą kopii; bez grupy pomija zdanie. | the cycle's (row 5 whole plus the orchestrator's answer) |
| E11 | D-313 (new) | „Dodaj regułę z tym” adds a rule built from the discovery at the end of the copy's first group and opens its panel on the field it filled. With neither an action nor a condition it acts as „+ reguła”. It is disabled when the copy has no rule group. | Przycisk dodaje regułę z odkrycia i otwiera panel na wypełnionym polu; bez grupy wyłączony. | the cycle's (row 4 whole plus the orchestrator's answer) |
| E12 | D-314 (new) | The background of the scene is a still picture of a forest in snow, made from loop's cut Pixel Crawler pictures. | Tło sceny to nieruchomy las w śniegu z gotowych obrazków starego Loop. | row 2 |
| E13 | D-315 (new) | The background is in full light, and night or dawn is a layer over it, never darkness in the file. | Tło w pełnym świetle; noc i świt to warstwa nad nim. | row 3 |
| E14 | D-272 | A picture of the game stands behind the login card and as the scene, with no text on it. | Obraz gry stoi za kartą logowania i jako scena, bez tekstu na nim. | projected (part) |
| E15 | D-282 | Its example names the world, the program and the right area as areas of their own. | Przykład wymienia trzy obszary ekranu przejścia. | projected (part) |
| E16 | D-281 | Confirmed, no edit. | Bez zmiany. | projected (part) |
| E17 | D-46 | Its example puts the Geist Mono clock in the status row of the header. | Zegar w Geist Mono w wierszu stanu w nagłówku. | the cycle's (example only, task question 9) |
| E18 | terrain-drawing-numbers | The drawing of the game map shows no number of the stock a tile holds. | Rysunek mapy nie pokazuje liczb zapasu. | projected (follows D-19) |

Notes on the entries:
- E3 and E4 are one entry, D-311. Row 1 answers the same question as the projected entry, and a binding sentence cannot say „until task 14”. The order of the world area (encounter paragraph, then the end line) comes from task question 4, which is no row.
- E9 (D-122). The band's „Wznów” works like the header's „Wznów”. After a completion it is absent: from the current *violates* example („leaving the map run paused with „Wznów””) and plan Slice 8. The sentence on the encounter paragraph's place, which D-122 answered in passing, moved to D-147.
- E7 (D-185). Its *Rationale* lost the words about discovery and the status row, which had become untrue.
- E6, E7, E8 (D-147, D-185, D-216). Each gained the task document in *Origin*.
- E14 (D-272). Its *Verification* drops „the game with no picture” and adds the scene with no text over it.
- E16 (D-281) is still true: `src/browser/view/run-screen.ts:86-99` draws `{ ...state, run }` and does not read `state.run` by itself.
- E17 (D-46) matches the code: `src/browser/styles.css:1278-1283` sets `.status-text` in the mono font.
- E18 (terrain-drawing-numbers) changed. Old: „The terrain panel's drawing of the game map shows no number of the stock a tile holds.” New: „The drawing of the game map shows no number of the stock a tile holds.” The test that cites it, `tests/invariants/test_terrain_drawing_numbers.py` (lines 428, 469, 479), reads the panel minus its table, still the drawing, so it stays valid until Slice 7. Its docstring still quotes the old sentence; Slice 7 has to quote the new one.

## Checks
| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before the commit) | 0 | 0 errors |
| `python -B .the-way/elements/common/foundation_check.py` (after the commit) | 0 | 0 errors |

`npm test` not run: no code or test changed, and the full suite is the cycle's run.

## Own-work check
The requirement most likely missed: an entry the merged code will not make true. Every sentence about place read against plan Slices 5, 6, 8 and 9 and against the current code wherever a *Verification* names it. D-312 and D-313 needed the orchestrator's answers to stay true, so both carry them and are marked `the cycle's`.

## Questions and concerns
1. D-130 lost the reasons in its *Rejected*: the projected *Rejected* drops the reasons the current entry gave („— the controls of a map run's time would stand in two places, or the browser view would gain a control the shared controls do not hold”). Written whole as projected (WAY-126); restoring them would leave the approved wording.
2. „Terrain panel” will name nothing in the code after Slice 11. D-19, written whole in the projected wording, keeps „the terrain panel's drawing”; D-70, D-125 and the example in D-45 also say „terrain panel”. Left as they are, beyond this handoff. The invariant (E18) no longer uses the name. Whether to rename later or add a glossary term is the orchestrator's call.
3. Two entries still say „discovery line”: D-195 („The discovery line names the tree…”) and D-121 („in one line of discoveries”). The band shows the same text (`discoveryText`), so both read as still true; not edited.
4. The critique step did not run: `elements/common/way_of_working.md` asks for a critique by a fresh agent before collective review; `make-change` forbids dispatching a subagent, so the cycle's reviewers read these entries.
5. D-312 and D-313 carry clauses beyond their rows, for the request to put before the human: D-312 names the copy's first group as it stands and leaves the sentence out when the copy has no group; D-313 is disabled when the copy has no rule group; D-313's *Rejected* holds the way the plan rejected (adding the group „Program”), from the plan's *Choices*.

## Reaches beyond the handoff
- The project definition `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md`: *Projected foundation changes*, *Open questions*, the projected entries for the layout, the scene and the end of a map run — for the whole projected *Rationale*, *Rejected* and *Origin*.
- The vault copy of the task, identical to `task.md`, named in *Origin* fields.
- Foundation entries D-118/D-121, D-195, D-45, D-55, D-70, D-166, D-283, D-284, D-289, D-306 and `player-map-run-pace`, from the whole-foundation search for „discovery line”, „status row”, „terrain panel”, „program panel” and „column”.
- Code: `run-screen.ts`, `status-row.ts:165-215`, `styles.css:1270-1290` and the terrain test, to confirm E16, E17 and E18's test.
- the-way's own examples: WAY-03, `instruction-file-imports`, `script-imports`, `return-step-record`.

## Searches not found or unclear
- The decision log has no list of withdrawn numbers, and nothing refers to D-311 to D-315, so the next free number was D-311.
- No source says outright that the picture behind the login card is a snowy forest. D-314's *Rationale* rests on the reason task question 2 gives for rejecting the green forest.
- D-313's „panel's order” of fields is read from D-306: condition, number, target of the condition, action, target of the action.
