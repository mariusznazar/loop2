done with concerns

# Foundation entries, part C — report

Stage: foundation step, part C (rows F32, F33, F34 of the plan's *Foundation entries*). Method: `make-change` for the report; entries written by following the `SKILL.md` of `record-decision`, `record-environment-fact`, `record-invariant` as files in `.the-way` (no skill tool).

## Concern the orchestrator must see (deviation from the ruling on F32)

The orchestrator ruled: keep F32 as a change of D-441. It cannot be made. D-441's binding sentences already hold 599 words of the 600 the template allows (counted by `foundation_check.py`: paragraphs 174 + 135 + 171 + 33 + 86, minus my draft's 156 = 599 before my edit), and every sentence of D-441 except the 33-word one on `Wyloguj` is cited by a line `decision:` of a test, so the sentences cannot be shortened without rewriting the decision and re-quoting about 60 test lines. An edit of D-441 that adds the count made the check report `D-441 ... binding sentences have 755 words in all (at most 600)` as an error. I reverted it and wrote the count as a **new decision D-463**, which mirrors how D-442 (the count of a program's content changes) stands beside D-441. D-441 and D-440 are left as Part B left them. The row's meaning is kept whole (the value of a remembered judging holds the character's count of the player's gear changes, read against the game state; the stored form's version rises); only its home differs. The request must name D-463 as a new decision marked the cycle's, not D-441 as a changed one. Cost if the orchestrator wants D-441 edited anyway: a human decides what to cut from D-441 (the record of D-440 in its last paragraph, 86 words, is the natural part to move out), and the tests citing it are re-quoted by Slice 10.

## Commits

- `f91fa619` — `foundations/decisions.md`, `foundations/environment_facts.md`, `foundations/invariants.md` (by path).

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1, `14 errors`: the same 14 `decision:` citation errors of tests (`D-144` ×11, `D-145` ×2, `D-446`, `D-445` as before part C; baseline run before my edit gave the same 14), which the slices fix. No error caused by my entries. The run before the revert (D-441 edit) showed a 15th, the word limit of D-441: gone with the revert. Output kept in `docs/task-cycles/wyposazenie-postaci/reports/foundation-C-check.txt`.
- Not run: the product's gate and the one command (outside the boundary); `.the-way/instruction-files/check_instructions.py` (not named by the foundation step).

## Entries

### F32 — D-463 (new decision; the cycle's)

Heading: `D-463 — How does the game state count the gear changes the player makes?`, last entry of the section *Gear of a character*, *Relations* derives from D-440 · D-441 · D-461, *Scope* simulation · browser-view, *Rejected* `unknown` (the cycle's entry; no statement of the human names the ways weighed).

- Meaning (English): the game state counts at each character, from 0, the gear changes the player makes on the screen Postać, and a remembered judging holds the count of its character and stands only while it equals the game state's count, so a gear change by the player erases the character's judgings on every map while a return from a map run and a death that takes the gear count nothing; the count is part of the stored form, whose version rises, and the opening of the page removes stored values whose count is above the loaded game's.
- Znaczenie (po polsku): stan gry liczy przy każdej postaci, od 0, zmiany wyposażenia, które gracz robi na ekranie Postać; zapamiętana ocena trzyma licznik swojej postaci i stoi tylko dopóki równa się on liczbie w stanie gry, więc zmiana wyposażenia przez gracza kasuje oceny postaci na każdej mapie, a powrót z przejścia i śmierć, która zabiera wyposażenie, nie liczą nic; licznik jest częścią zapisanej postaci oceny, której wersja rośnie, a otwarcie strony usuwa wartości z licznikiem wyższym niż we wczytanej grze.
- Mark: `the cycle's` (F32 is the cycle's by the plan; also the home differs from the plan's row, see the concern above).
- Added pair, word for word (for the description to quote; it stays until the tests of Slice 10 hold the sentences, which the return step removes):
  - complies: a stick taken off on the screen Postać raising the count of its character by one, so that no judging stands beside that character on any map, while a map run of its earning loop in which a strike took a stick into an empty hand leaves the count and the judgings as they were
  - violates: a change of the gear made by the player that leaves the count where it was; a count that rises at the return of a map run; the page removing the character's judgings from the browser at the change, with no count in the stored value
- The existing sentences of D-440 (paragraph on gear changes) and D-441 are unchanged; no cited sentence of a test changed, so no new citation error.

### F33 — environment fact `game-icons-gloves-title` (new; the cycle's)

- Icon picked: Delapouite's `gloves`, "Gloves icon" on game-icons.net (CC BY 3.0, tags armor, clothing, hand; description "Light gloves made of leather to protect the hands from the cold weather or contact with hard materials."). It is a sign of putting on, unlike every icon of the other actions (`grab`, `claw-hammer`, `match-tip`, `logging`, `meal`, `deadly-strike`, `boot-kick`, `dodge`, `binoculars`, `hiking`, `direction-sign`, `magnifying-glass`, `bandage-roll`, `first-aid-kit`, `wood-pile`).
- **For Slice 9:** file `assets/icons/gloves.svg` from `https://game-icons.net/1x1/delapouite/gloves.html` (author Delapouite; title "Gloves icon"; licence CC BY 3.0; archived copy `https://web.archive.org/web/20250914084727/https://game-icons.net/1x1/delapouite/gloves.html`). The credit and the icon file are Slice 9's.
- Source checked: the live page's `<h1 id="icon-name">` reads "Gloves icon" and the archived copy of 2025-09-14 (found in the Internet Archive's CDX index, status 200) reads the same; read 2026-11-26.
- Meaning (English): the page of Delapouite's icon `gloves` on game-icons.net names the icon "Gloves icon".
- Znaczenie (po polsku): strona ikony `gloves` autora Delapouite w game-icons.net nazywa ikonę „Gloves icon”.
- Mark: `the cycle's`.
- Concern about the choice: gloves read as "put on" for a bandage or a stick less directly than a picture of a hand taking a thing; no icon on game-icons.net named equip or wield was found by the search. Runners-up looked at: `armor-upgrade` (Delapouite; reads as strengthening, not putting on), `hand-grip` (a hand exerciser, no).

### F34 — invariant `icon-credits` (changed; the cycle's)

- *Rests on* gains `game-icons-gloves-title` as its last item; the sentence, *Method*, *Derives from* (D-27), *Part* and *Violated* are unchanged, so no test citing it needs checking against new wording. The test of the invariant finds `assets/icons/gloves.svg` absent until Slice 9 adds the file and its credit.
- Meaning (English): the credit for each icon file rests, besides the other titles, on the title game-icons.net gives the gloves icon.
- Znaczenie (po polsku): ocena kredytów ikon opiera się, obok pozostałych tytułów, na tytule, który game-icons.net daje ikonie rękawic.
- Mark: `the cycle's`.

## Reaches beyond the dispatch

none beyond the handoff's list; I read D-440, D-441, D-442 (partly, its opening and form), D-453, D-461, D-462 and D-451 whole to place D-463, and `tests/**` by grep for `decision: D-441` quotations to see which sentences are cited.

## Own-work check

Requirement most likely not met: "F32 changes D-441" (the plan's row and the orchestrator's ruling). Check: the foundation check after the D-441 edit reported the word limit as an error (`755 words in all (at most 600)`), and a count of D-441's paragraphs showed 599 words before my edit and every sentence cited by tests. Result: the requirement cannot be met by an edit of D-441, hence D-463 and the concern above. Second check: after the revert and D-463 the check shows only the 14 earlier errors.

## Choices

- New decision D-463 in place of an edit of D-441. Rejected: cutting D-441 to fit (rewrites a decision and about 60 test quotations, beyond the cycle's scope); leaving the count unrecorded (the row would not be written). Cost if wrong: the request names one new decision more than the plan says.
- *Rejected* of D-463 is `unknown`, as the template gives for an entry marked the cycle's; the plan's rejected way (the page removing the stored judgings at the act) is the plan's own, not a statement of the human, so it stays out (WAY-134) but the pair's `violates` line names it as a behaviour to refuse.
- Icon `gloves` over `armor-upgrade` and `hand-grip`; cost if wrong: Slice 9 swaps one file, one credit and this fact.

## Unread material

- `.runs/orchestrator/decision_index.md`: not read (I read the decisions I touched whole instead).
- `plan.md` *Choices* read whole; the slices named in the rows' *What depends on it* read only as the row of Slice 1 (first lines) and the *Choices* table; not read: Slices 2, 9, 10.
- `task_frozen.md`: read only the lines that name D-441, judgings (lines 90–158 by grep), not whole.
- `elements/decisions/examples.md` and the examples named by the three templates: not read.
- Whole log search (WAY-33): by grep for `generation number`, `count of the gear`, `gear changes the player`, `icon-credits`, `game-icons`, `D-441`, `D-463`; no decision of the log states the count or answers its question; D-440 (Part B) states the erasing without the mechanism.

## Searches not found or unclear

- No icon named for equipping or wielding found on game-icons.net (the tag page `tags/equipment.html` answers 404); the choice is by tags `armor`, `clothing`, `hand`.
- Whether the product's `foundation_check.py` reports `D-463` as needing a test line: it did not (the pair of examples holds it).

## Working copies

`.runs/foundation-C/` held the two outputs of the foundation check; removed. The final output is kept as `docs/task-cycles/wyposazenie-postaci/reports/foundation-C-check.txt`. No other copy, no worktree.
