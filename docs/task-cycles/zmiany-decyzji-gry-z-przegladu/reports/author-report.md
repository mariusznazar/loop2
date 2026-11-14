# Author report — zmiany-decyzji-gry-z-przegladu

**Status:** done (with the findings below for the orchestrator; no question to the human).

**Commits** (branch `task/zmiany-decyzji-gry-z-przegladu`, base `5159e8c475a5faa77529020a51b21e271c695132`):

- `2e5c2a80` — `docs: :card_file_box:` the decisions, the glossary term, the invariants and D-393 (`foundations/` only).
- `3767fd3d` — `docs: :card_file_box:` D-136, "keeping the earning loop going" (one word pair, by explicit path).
- `285a210c` — `docs: :memo:` the sentence in `guidelines/coding-saved-game.md` and the comment above `SAVED_GAME_VERSION`.

## Files changed

| File | Added / removed lines |
|---|---|
| `foundations/decisions.md` | +50 / −36 (33 exact-string edits and the new D-393) |
| `foundations/glossary.md` | +6 / −0 |
| `foundations/invariants.md` | +2 / −2 |
| `guidelines/coding-saved-game.md` | +2 / −2 |
| `src/browser/sim/saved-game.ts` | +3 / −1 (comment only; checked with `git diff HEAD~1 HEAD -- src`: only the comment lines above `SAVED_GAME_VERSION` differ) |

(`git diff --numstat 5159e8c4 HEAD`.)

## Checks

After the D-136 change: `python -B .the-way/elements/common/foundation_check.py` → exit 0 (`0 errors`).

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 (`0 errors`) |
| `python -B .the-way/elements/common/foundation_check.py` (without the switch, after the last edit) | 0 (`0 errors`) |
| `npx prettier --check src/browser/sim/saved-game.ts` | 0 |
| `npx eslint src/browser/sim/saved-game.ts` | 0 |
| `python -B -m unittest test_streak_program_change` (run in `tests/invariants/`; the test of the invariant whose sentence changed) | 0 (5 tests OK) |

Not run: `npm test` (the orchestrator's gate, as the handoff says); the tests of `loop-practice-payment` (`tests/sim/loop.test.mjs`) — only one word of the sentence moved and the test cites the identifier, not the text. No test written or changed, so no failing run of a test written first and no invariant test seen failing (the test of `streak-program-change` already holds the ended-run case: "a map run ended in death keeps its streak", and passes with the new sentence; the test file is untouched).

## Own-work check

- **Requirement most likely not met:** item 8 — every bare "loop" that means the earning loop is changed, and nothing else (the previous game, `loop clock`, an animation loop, `loop2`, a program loop stay).
- **Check:** a script counted, on the base and on the result, the standalone words `loop`/`loops` of `foundations/decisions.md` that are not preceded by `earning` (also across a line break) and not followed by `clock`. Base 227, result 202, 25 fewer after the first commit; D-136 makes 26 (result 201). The decisions where the count fell are exactly those I list below (D-93, D-164, D-189, D-208, D-239 ×2, D-241 ×2, D-246 ×2, D-247 ×4, D-251 ×2, D-329 ×2, D-369 ×4, D-389 ×3), and I read each remaining use by context (list below) before the edit.
- **What it showed:** 26 places in 13 decisions changed (D-136 included, see below). No place left as unclear. A first count of mine had also counted places where "earning" ends the previous line (for example D-207, D-243, D-246 line 5306, D-250); those already read "earning loop" and are not touched.

## Reaches beyond the handoff

- `foundations/invariants.md` invariant `loop-practice-payment`: "the stop of the loop" to "the stop of the earning loop" (one word). Why: the glossary term I wrote moves that use (the glossary template's "A changed meaning" says to rewrite each use whose meaning the definition moves). The handoff names item 8 for decisions only; the invariant's *Method*, links and tests are unchanged.
- `guidelines/coding-saved-game.md`, the rule's field *Decision*: `D-369` added (`D-206 · D-213 · D-369`), because the new sentence rests on D-369. This is a citation, not a second sentence.
- The glossary of the-way (`.the-way/foundations/glossary.md`): only a `grep` of its headings for a term holding "loop" (none), not read whole; the glossary skill's step 2 asks for the search of the-way's glossary for the same meaning. `.the-way/product-guidelines/coding/template.md` (whole, for the form of the guideline's rule); the skills' `SKILL.md`, step files, `template.md` and `examples.md` of decisions, glossary and invariants (as each skill's step 1 gives), and the entry WAY-03 of `.the-way/foundations/decisions.md` (the example of the decisions' form).
- `src/browser/sim/run-record.ts:1-40` (for `MINUTE_KINDS`), `src/browser/view/scene.tsx:605-630`, `src/browser/view/trip-lines.ts:70-100`, `src/browser/sim/programs.ts:720-770`, `src/browser/sim/data/skills.ts`, `src/browser/sim/data/actions.ts` (labels) and `tests/sim/repertoire.test.mjs:70-80` — to check each claim of a decision I edited against the code of the base before writing it (F-1, F-19, F-20, F-27).
- `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` and `.the-way/product-guidelines/coding/SKILL.md`: this skill leads the refinement; the task already answers its question, so I used it only for the form of the rule (`coding/template.md`), as the handoff says.

## Entries written or changed

For each: one sentence in English, one in Polish, and the marking.

1. **D-369** (changed) — item 1 of the task's *To do*; no row carries it and it is no projected entry, so it is marked `the cycle's` in the sense of the foundation step, with the meaning given by the task's item 1 text.
   - EN: every later change that adds or removes an ordinary action alters the shape of the record and so raises the version again, discarding every older saved game state in full (D-206).
   - PL: każda późniejsza zmiana, która dodaje albo usuwa zwykłą czynność, zmienia kształt rekordu i znów podnosi wersję, a to odrzuca w całości każdy starszy zapis (D-206).
2. **D-346, D-383** (changed) — item 2.
   - EN: the pick of the tab and of the filter of the chronicle does not survive a reload of the page; "Kronika" and "Wszystko" stand picked again.
   - PL: wybór zakładki i filtra kroniki nie przeżywa przeładowania strony; znów stoją „Kronika” i „Wszystko”.
3. **`streak-program-change`** (changed) — **row 3**.
   - EN: a change of the program rules or rule groups of the copy, and every switch of the program, in a map run that has not ended, sets that map run's streak to zero on every map.
   - PL: zmiana reguł albo grup reguł kopii i każde przełączenie programu w przejściu, które się nie skończyło, zeruje passę tego przejścia na każdej mapie.
4. **D-120** (changed) — item 4.
   - EN: "Wytwórz — ognisko" is open only to an archetype with the predisposition "Wytwarzanie ogniska"; the campfire open to every archetype is a rejected way, to be weighed again at the design of a second archetype.
   - PL: „Wytwórz — ognisko” jest otwarte tylko dla archetypu z predyspozycją „Wytwarzanie ogniska”; ognisko otwarte dla każdego archetypu jest odrzuconym wariantem do ponownego rozważenia przy drugim archetypie.
5. **D-186, D-179** (changed) — item 5.
   - EN: the line "Wyniesie" appears after a switch of the character to another program, not at an edit of the plan; the shield of the frozen snapshot stands in the simulation and at the switch, since the screen gives no plan edit during a map run (D-180).
   - PL: linia „Wyniesie” pojawia się po przełączeniu postaci na inny program, nie przy edycji planu; osłona zamrożonej migawki dotyczy symulacji i przełączenia, bo ekran nie daje edycji planu w trakcie przejścia (D-180).
6. **D-311** (changed) — item 6.
   - EN: in a window narrower than 1074 px, below the smallest window of D-393, the screen is one column and the chronicle stands under the whole program, so its place depends on the program's length.
   - PL: w oknie węższym niż 1074 px, poniżej najmniejszego okna z D-393, ekran ma jedną kolumnę, a kronika stoi pod całym programem, więc jej miejsce zależy od długości programu.
7. **D-367** (changed) — item 7.
   - EN: a running effect finishes unless the map run is left or a new one starts; the effect stands where the mage stood or was walking to at the previous reading.
   - PL: trwający efekt dokańcza się, chyba że gracz wyjdzie z przejścia albo zacznie się nowe; efekt stoi tam, gdzie mag stał albo dokąd szedł przy poprzednim odczycie.
8. **Glossary `loop`** (new) — **row 2**.
   - EN: loop is the predecessor game, the game loop2 starts from, and not an earning loop.
   - PL: „loop” to poprzednia gra, z której wychodzi loop2, a nie pętla zarobkowa.
9. **D-393** (new) — **row 1**.
   - EN: the game works in the current Chrome, Edge and Firefox on a computer, Safari is outside the set, and the smallest supported window is a page area of 1280 × 720 px, not the screen resolution.
   - PL: gra działa w bieżących Chrome, Edge i Firefox na komputerze, Safari jest poza zbiorem, a najmniejsze okno to obszar strony 1280 × 720 px, nie rozdzielczość ekranu.
10. **Item 8 edits** (26 places in 13 decisions, below) — item 8, no new meaning, only the full name `earning loop`.
11. **`loop-practice-payment`** (one word) — reach beyond the handoff, see above.

**Numbering of D-393:** the next free number on the base (`D-392` is the last entry, no withdrawn-identifiers list). Another branch merged before this one may take D-393; the orchestrator should check at the merge.

### Item 8 — the full list

Changed (decision, phrase before → after):

- D-136: "Las teaches keeping the loop going" → "… keeping the earning loop going" (the orchestrator's autonomous choice: in the *Rationale* that opens "a map checks whether a program survives on its own", the word reads as the earning loop; commit `3767fd3d`). Its binding sentence is untouched.
- D-93: "a preview of the loop" → "a preview of the earning loop".
- D-164 (*Verification*): "the loop unchanged until its next start" → "the earning loop unchanged …".
- D-189: "and when the loop stops" → "and when the earning loop stops".
- D-208: "one program shared by the loops" → "… the earning loops".
- D-239: "a loop of short map runs" → "an earning loop of short map runs"; "delays the loop" → "delays the earning loop".
- D-241: "or the loop stops" → "or the earning loop stops"; "so the loop and that map run" → "so the earning loop and that map run".
- D-246: "read from the loop whenever the section is drawn" → "… the earning loop …"; "until the loop gathers more" → "until the earning loop gathers more".
- D-247: "No loop in it ran" → "No earning loop in it ran"; "the catch-up of a loop ends" → "… of an earning loop ends"; "those of a loop that does not die" → "those of an earning loop …"; "no loop measured was" → "no earning loop measured was".
- D-251: heading "a rehearsal the loop cannot repeat" → "… the earning loop cannot repeat"; "the game speaks of a loop it does not have yet" → "… an earning loop …".
- D-329: "the line of the loop" → "the line of the earning loop"; "the lines of the resurrection and of the loop" → "… of the earning loop".
- D-369: "the number of loops" ×2 → "the number of earning loops"; "nothing the loops use" → "nothing the earning loops use"; "the loops' map run" → "the earning loops' map run".
- D-389: "those on a map and in a loop too" → "… in an earning loop too"; "a character in a loop sits at the fire" → "… in an earning loop …"; "walks in a loop" → "walks in an earning loop".

Left, with the reason (a list of kinds, not each of the ~177 uses):

- previous game, "as in loop", "than loop", "of loop", "loop's", "the old loop game", "old Loop", "the predecessor game, loop": D-04, D-07, D-08, D-11, D-12, D-14, D-17, D-21, D-23, D-27, D-39, D-40, D-41, D-43, D-44, D-46, D-53, D-57, D-62 ("as the end of loop does"), D-63, D-64, D-121, D-128, D-130, D-131, D-132, D-133, D-135, D-140, D-144, D-147, D-167, D-169, D-174, D-218, D-219, D-220, D-271, D-274, D-276, D-280, D-281, D-288, D-289, D-290, D-291, D-300, D-305, D-308, D-309, D-310, D-311, D-314, D-316, D-317, D-318, D-319, D-321, D-322, D-327, D-334, D-335, D-336, D-337, D-338, D-340, D-342, D-343, D-344, D-347, D-349, D-362, D-363, D-368, D-369 ("the end of the old Loop"), D-370, D-374 to D-379, D-387, D-388 — each is the previous game, as the new glossary term says.
- another sense: the loop of animation frames or drawing — D-316, D-322 ("loops until", "an effect in a loop"), D-364 ("bends in a loop", "the loop at „Zbierz”"), D-389 ("no loop of drawing"); the event loop — D-112; a loop that restarts a crashing container — D-355; a loop of a React Hook rule — D-267; `Loop: <address>` readiness line, a literal the server writes — D-252.
- `loop clock`: a defined term of the glossary, in D-242, D-248 and the glossary.
- "the loop2 / Puść w pętlę" and other Polish text: not English text of the check.
- **Unclear, then decided by the orchestrator:** D-136, *Rationale*, "keeping the loop going" — changed in commit `3767fd3d` (see the list of changed places).

## Unread material

- The review note `foundation_review_2026-11-13.md`: read only the heading list and the sections F-1, F-8, F-12, F-19, F-20, F-22, F-27, F-38 and F-40 of section 1, each to the next `###`; every other section stayed unread, as the handoff says.
- The glossary of the-way (`.the-way/foundations/glossary.md`): searched by headings (`grep`) for a term holding "loop", not read whole.
- The invariants named only as *Verification* of changed decisions, which I did not read whole: `trip-plan-progress`, `copy-save`, `trip-transfer`, `solved-map-manual-run`, `trip-run-end`, `catch-up-minutes`, `loop2-container-sprites` (read: `streak-program-change`, `save-version`, `saved-program-edit`, `loop-practice-payment`). The decision D-213, cited by the guideline, was not read; no edit depends on it.
- `foundations/environment_facts.md`: searched with `grep` for WebKit/Chromium/Playwright and for the word "loop"; not read.
- The step files of `.the-way/product-guidelines/coding/` other than `SKILL.md` and `template.md` (recognize, kinds, settle and the others): not read; the task already settles the one sentence, so no step of refinement ran.
- Decisions: every decision I changed or that the handoff names was read whole by its range of lines; the 177 other bare uses of "loop" were classified by a search with context (about 200 characters), not by reading those decisions whole.

## Searches not found or unclear

- D-136's "the loop going": unclear to me; the orchestrator decided it (changed).
- The note names `D-62:1391`, `D-311:7436`, `D-189:3690` etc. by line; I re-found each by text. All places F-38 names stand on the base. F-38's "ok. 10 places in ok. 8 decisions" was a rough count: the real count is 25 places in 12 decisions (the review counted only the short "the loop"; the task asks for "loops" as well).
- The *Based on* of D-393: the fact that the WebKit of the agents' computer is too old for the installed Playwright is a statement about the tools; I put it only into *Rejected* (as the task's *Not chosen* keeps it) and left *Based on* `none`, since the environment facts hold no fact about WebKit (`grep` on `foundations/environment_facts.md` for `webkit`/`chromium`: no entry).
- A test or script that compares a test's docstring with the sentence of its invariant: none found (`foundation_check.py` only checks identifiers).

## Findings for the orchestrator (not changed)

0. (Closed.) D-136's "keeping the loop going" was changed after the orchestrator's decision; the binding sentence of D-136 stays as it was.

1. `tests/invariants/test_streak_program_change.py:1-3` quotes the old sentence of `streak-program-change` in its docstring. The handoff says no test is changed, so I left it. The test's content already covers the new wording (ended-run case at line 34 of the test). The reviewer may want the docstring aligned in the same request.
2. D-136's binding sentence ("every change of the program rules or rule groups the map run carries out ... sets it to zero") has the same gap as the old invariant sentence (it does not say "not ended"); D-136 is not in the task and I did not change it.
3. `guidelines/coding-saved-game.md`, the paragraph after the rule: "Zmiana którejś z tych rzeczy nie podnosi wersji sama" lists "rodzajów działań" among the checks against the data. My sentence in the first paragraph names the one exception (a new or removed ordinary action) and says so ("choć zmiana danych niżej wersji sama nie podnosi"), so the two stay consistent; I did not touch the second paragraph.
4. The glossary template's *Not* says the carrier of a meaning is "the term of another entry … never one holding the term or its forms". The task orders `earning loop` as the carrier in the entry `loop`; `earning loop` is a term of another entry, so I read it as allowed, but its words contain "loop". `foundation_check.py` does not check it (it checks the presence of *Not* only).
5. D-393 *Scope* names `agent-workflow` (the daily checks of the agent) and `browser-view`; the task does not name parts, so this is my choice, from the part map (`.claude/**` and `guidelines/**` are `agent-workflow`; the screens are `browser-view`). Rejected: only `browser-view` — the decision binds how an agent checks, which `browser-view` does not hold.

## Choices (way rejected, cost if wrong)

- **D-346 / D-383 wording:** the reload clause stands in the binding sentence and in *Rationale* as an accepted cost, and I added one example to *complies* in each. Rejected: *Rationale* alone — a binding sentence must carry what a later change is compared with (the human decided "wybór nie przeżywa przeładowania"). Cost if wrong: one clause to drop.
- **D-186:** I left the sentence "so a divergence from the plan in the program panel is visible" as it was; after a switch the copy's plan differs from the snapshot, so it holds. Rejected: rewriting it — the task names only the two quoted places.
- **D-179 clause:** it names the simulation allowing a trip plan change without a streak break (D-131) and the switch bringing another trip plan, as the reason for the shield. Rejected: the shorter "the shield concerns the simulation and the switch" alone — it gives a reader no reason. Cost if wrong: one clause.
- **D-311 clause:** put in *Accepted with it* in the existing list, with the referral to D-393 and D-282. Rejected: a new sentence after the list — the list holds the costs.
- **D-367 wording of the clause:** "it stands where that mage stood or was walking to at the previous reading". Rejected: "…which is the place the mage stood or walked to" with a comma change — the clause stays loose.
- **D-120 *Verification*:** the pair reads "Wędruj" (open to every archetype) beside "Wytwórz — ognisko" (only with the predisposition), as F-19 gives; the old "making an archetype's own goods" half dropped because the example now shows the contrast with data that exist.
- **D-393:** the binding sentences hold the set and the window (two sentences); the Chromium/Firefox/Edge split of checks stands in *Rationale* as *Accepted with it*, as the task says. *Rejected* holds exactly the three ways the task keeps (the screen resolution; Firefox added to the way the agent plays; no entry). I did not add Safari-inside-the-set as a rejected way: no source in the task keeps it. *Verification* has a pair of examples I wrote (the task does not give one); if the human does not want them, the field becomes `none`.
- **Guideline sentence:** a separate sentence, not an extension of the old one; `D-369` added to the field *Decision*.
- **Comment of `SAVED_GAME_VERSION`:** the comment names the actions and their reason, nothing else changes. Rejected: a comment pointing to D-369 — comments in this file do not cite decisions by number.

## Problems as observed

- None in the code. `foundation_check.py` reported no error before or after. The decisions file is edited by exact strings, each unique (the script stops when a string is not unique; none stopped).
