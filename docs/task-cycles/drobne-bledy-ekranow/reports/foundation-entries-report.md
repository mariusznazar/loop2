# Report — Foundation entries, cycle `drobne-bledy-ekranow`

**Status:** done

## Commits (on `task/drobne-bledy-ekranow`, after `bd82d394`)

- `dddbc7d5` — `foundations/decisions.md` (D-04, D-172, D-207, D-285, D-294, D-297, D-306, D-342, D-350, D-381) and the lines `decision:` of nine test files re-quoted.
- `fecbea47` — `guidelines/styleguide-browser-view.md` (rows 7, 11, 12, 13, 14).

Files changed: `foundations/decisions.md` (about +168 −96 lines), `guidelines/styleguide-browser-view.md` (+30 −10 lines about), and nine test files, comment lines `decision:` only (32 lines): `tests/account-api.test.mjs`, `tests/sim/copy-actions.test.mjs`, `tests/sim/trip.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/game-saver.test.mjs`, `tests/view/menu-bar.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/program-panel.test.mjs`, `tests/view/rule-editor.test.mjs`.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` at head (`fecbea47`): exit 0, `0 errors`. Before the re-quoting it reported 32 errors, exactly the 32 lines `decision:` listed below; after it, none. The run without `--skip-test-citations` is green too.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, 0 errors, 147 warnings, all `dead-path` of files this change did not write; none from my lines (the nine warnings that name the styleguide are old: `.css`, `/styles.css`, `#/konta`, `#/mapy`, `#/wiedza`).
- Not run: the full suite (`npm test`) — the cycle's run before the request; the tests whose comment lines I changed were not run, only their comment lines changed.

## Entries, one by one

Meaning in English / in Polish. Marks: `row n`, `projected`, `the cycle's`. The note "ordering" says which behaviour no code makes true yet; I wrote the decision for what the slice will do and did not soften it.

| Entry | Mark | English | Polski |
|---|---|---|---|
| D-297 | row 1 | „↑” is disabled only where no group stands before the rule's group, „↓” only where none stands after it, so an empty group at the edge takes the rule. | „↑” jest wyłączona tylko wtedy, gdy przed grupą reguły nie stoi żadna grupa, „↓” tylko gdy za nią nie stoi żadna; pusta grupa na brzegu przyjmuje regułę. |
| D-306 | row 2 | Deleting the rule closes its panel; moving the rule to another group, by an arrow or the handle, closes nothing and the panel goes with the rule. | Usunięcie reguły zamyka jej panel; przeniesienie reguły do innej grupy, strzałką albo uchwytem, niczego nie zamyka i panel idzie za regułą. |
| D-306, the examples „Zapas poniżej 8 · Patyk → Zbierz — Patyk” in *Verification* (tests clause) and *Rationale*, now „8 szt.” | the cycle's (orchestrator's answer 3) | The number of a condition stands with its unit also in the example. | Liczba warunku stoi z jednostką także w przykładzie. |
| D-350 *Rejected* | row 3 | Closing the panel at a fold would make the player lose the open field and the place in it. | Zamknięcie panelu przy zwinięciu grupy kosztowałoby gracza otwarte pole i miejsce w nim. |
| D-04 | row 4 | The view draws also from the player's acts on the copy with the copy before and after (chronicle), from the page's memory of the end-of-run window, and from the place the browser gives for the walking mage (scene). | Widok rysuje też z aktów gracza na kopii z kopią przed i po (kronika), z pamięci strony o oknie końca i z położenia, które przeglądarka podaje dla maga w marszu (scena). |
| D-207 | row 5 | The 30-second rhythm and the hidden page send also where the save last sent failed. | Rytm 30 s i ukryta strona wysyłają także wtedy, gdy ostatni wysłany zapis się nie udał. |
| D-285 | row 6 | After a click outside the menu focus stays where the player clicked; it returns to „Konto” after Escape, a second click on „Konto” and a click on a place that takes no focus. | Po kliknięciu poza menu fokus zostaje tam, gdzie gracz kliknął; wraca na „Konto” po Escape, drugim kliknięciu „Konto” i kliknięciu w miejsce bez fokusu. |
| Styleguide, rule "Menu bar, the menu „Konto” and the list of programs" | row 7 | Says what D-285 says. | Mówi to samo co D-285. |
| D-172 | row 8 | With no unsaved changes of the copy the line reads „Program {name} ma zmiany, których nie ma w tej kopii.”; the full sentence only with unsaved changes. | Bez niezapisanych zmian kopii linia czyta „Program {name} ma zmiany, których nie ma w tej kopii.”; pełne zdanie tylko przy niezapisanych zmianach. |
| D-342 | row 9 | An entry of a changed rule reads „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””. | Wpis o zmienionej regule czyta „Zmieniono regułę 2.1: „Zawsze → Eksploruj” na „Zawsze → Wędruj””. |
| Styleguide, rule "The end-of-run window" | row 11 | The pieces of the time bar have one colour, told apart by order, gap, length and the legend under the bar in the same order; the item leaves „Otwarte dla człowieka”, the two others stay. | Kawałki paska czasu mają jeden kolor, odróżnia je kolejność, szczelina, długość i legenda pod paskiem w tej samej kolejności; pozycja wychodzi z „Otwarte dla człowieka”, dwie pozostałe zostają. |
| Styleguide, rule "States of shared controls", the pick cell | row 12 | A greyed pick cell takes no highlight under the pointer; its dashed frame is in `text-disabled`. | Wyszarzona komórka wyboru nie podświetla się pod kursorem; jej przerywana ramka jest w `text-disabled`. |
| Styleguide, new rule "A name typed by the player breaks in its row" | row 13 | A typed name with no space breaks in its row and does not run out of it. | Wpisana nazwa bez spacji łamie się w swoim wierszu i nie wychodzi poza niego. |
| Styleguide, new rule "Focus does not fall to the page" | row 14 | Where the element holding focus goes away, focus goes to the element in its place or nearest to it, never to the page. | Gdy znika element z fokusem, fokus idzie na element w jego miejscu albo najbliżej, nigdy na stronę. |
| D-294 | row 15 | Each new copy, after a send and after a switch to another program, has every rule group unfolded. | Każda nowa kopia, po wysłaniu i po przełączeniu na inny program, ma wszystkie grupy rozwinięte. |
| D-381 | row 17 | The page moves focus to the card also after a refused emailed link and after „Anuluj”. | Strona przenosi fokus na kartę także po odrzuconym odnośniku z maila i po „Anuluj”. |

Rows 10 and 16: not mine, not written.

## Ordering: which behaviour a slice still has to make true

Every row below was written for what the slice will do; a pair of examples (*Verification*) carries the part no test holds yet, as `elements/decisions/skill/SKILL.md` step 3 asks; the return step removes the part a test then holds.

- Row 1 D-297: none — code and tests already do it (the code's `ruleArrows` and `moveRule`). The pair of examples for an empty group at the edge of the program stays because no existing test puts an empty group at the very edge; if the return step finds a test that does, it removes the pair.
- Row 2 D-306 (deleting closes, a move to another group keeps the panel open on the same field): Slice 8. Pair in *Verification*.
- Row 3 D-350 *Rejected*: Slice 8 (follows D-306). I also added "and deleting the rule" to the list of what closes the panel in the same *Rejected*, since D-306 now names it.
- Row 4 D-04: none, no code changes. Verification complies line extended.
- Row 5 D-207: Slice 16. Tests clause rewritten ("and that save did not fail"); pair for the send after a failed save and for the rhythm taking the place of the planned retry (D-208 itself is unchanged, its sentence "at once at a moment of saving of D-207" already says it).
- Row 6 D-285 and row 7 styleguide: Slice 17. The test `tests/view/menu-bar.test.mjs` „a click outside the menu closes it and focus lands on „Konto”” (line 289) asserts the old behaviour; I re-quoted its line `decision:` to the part it still holds (closing on a click outside) and left the test body; Slice 17 has to change the test and may then quote the new focus clause.
- Row 8 D-172: Slice 10. Tests clause now says the full sentence with unsaved changes; the short line stands in the pair.
- Row 9 D-342: Slice 11. The pair holds the new wording.
- Row 11, 12, 13, 14 (styleguide): rows 11: none; 12: Slice 2; 13: Slice 13; 14: Slices 8, 14, 15.
- Row 15 D-294: Slice 9. Pair in *Verification*.
- Row 17 D-381: Slice 15. Pair in *Verification*; the quotations of eight tests re-quoted.

## The lines `decision:` re-quoted (32, change only the quotation)

- D-297: `tests/view/program-editor.test.mjs:1617`, `tests/view/rule-editor.test.mjs:399` (the clause on „↑” and „↓” disabled).
- D-172: `tests/sim/copy-actions.test.mjs:112,138,165,181`, `tests/sim/trip.test.mjs:333`, `tests/view/program-panel.test.mjs:1268` (the new full sentence).
- D-207: `tests/account-api.test.mjs:1312`, `tests/view/account-screen.test.mjs:2177,2204`, `tests/view/game-saver.test.mjs:205,329,427,457,571,602,677` (the insertion „or where the save last sent failed”).
- D-285: `tests/view/menu-bar.test.mjs:246,258,289,301` to the first clause alone (open, close); `:274,312` to the new full sentence.
- D-381: `tests/view/account-screen.test.mjs:1064,1708,5475,5511,5531,5545,6086,6149`.
- D-306 and D-294: no re-quoting (the first sentence of each kept as a prefix; the new content stands after it).

## Choices (the way rejected, the cost if wrong)

1. D-306: the new content stands in the same last sentence after the old text (`…closes it, as does deleting the rule; moving the rule … closes nothing`), so every quotation of "After the last field the panel stays open, and „✕”, Escape or opening another rule closes it" stays valid. Rejected: a rewritten sentence, which would force about twenty re-quotations. Cost if wrong: none for the meaning.
2. D-207: the insertion is „or where the save last sent failed,” before „the save time of a document being no change of it”; the rest of the sentence is untouched, as ordered.
3. D-172 as one sentence with „where the copy holds no unsaved changes … and … where it holds some”, the semicolon and „„Zapisz w programie” then saves at once” kept. Rejected: splitting it into two sentences (then the six quotations would need two quotations each or a prefix).
4. D-285 and D-381: the new focus clause stands after the old text where the quotations start, so most quotations remain prefixes; those that included the old tail are re-quoted.
5. Row 13 and row 14 are new rules of the styleguide with *Decision* none and *Invariant* none, each with a one-sentence reason, in the template's form; placed after "A line at a text takes the colour of that text". No decision or invariant is written for them (row's *Goes to* is guidelines). The rule of row 13 names no inventory of screens (the form forbids "lists the state of the product"); one example, the team row of Siedziba, stands in *Good*.
6. The styleguide bullet of the time bar said the legend stands „obok” (beside) the bar; the code and the row put it under the bar, so I wrote „pod paskiem”. Cost if wrong: a one-word change.
7. D-04 *Rejected* got the way the source keeps (D-348 and D-371 as "narrows D-04", the scene counting the place itself); the *Rationale* got a sentence on the mage's place from the browser (D-319) and on the window's memory (D-371), and the chronicle sentence now names D-348. Not a way I derived.
8. D-04's reading of "the place the browser gives for the mage while it walks" comes from `reachedX` in `src/browser/view/scene.tsx` (the computed `translate` of the mage's element); I read that function only.

## Reaches beyond the handoff

- `src/browser/view/scene.tsx` (`reachedX`, lines about 520–545 and 686–701): to word D-04 for the scene truthfully.
- `src/browser/view/program-editor.ts` (`ruleArrows`, lines 302–311) and `tests/view/program-editor.test.mjs:1615–1700`, `tests/view/rule-editor.test.mjs:395–412`: to see what tests hold row 1.
- `src/browser/view/end-window.tsx` (lines 195–225) and `src/browser/run-screen.css` (lines 405–470): to check that the legend stands under the bar.
- `src/browser/sim/data/conditions.ts` (unit fields): to check that D-306's example „8 szt.” is what the data gives.
- `.the-way/product-guidelines/styleguide/template.md`, `product-guidelines/template.md`, `product-guidelines/reading.md`, `product-guidelines/styleguide/SKILL.md`: the template of a styleguide rule for rows 13 and 14 (the handoff names the foundation step and the decisions skill; the rules of guidelines are the rule of that place).
- `foundations/decisions.md` D-259, D-226 area (lines about 2945, 3430–3463, text on „Anuluj”): to word D-381 („Anuluj” of the form „Ustaw nowe hasło”).

## Working copies

None remained. I made `.runs/foundation-entries/` (the re-quoting script, two output files); removed the whole directory before returning. No git worktree made.

## Questions and concerns

No questions.

Concerns:
1. D-381: "an emailed link the server refused" and „Anuluj” of „Ustaw nowe hasło” are my wording; I did not verify in code which screens the refused link leads to (no code of the slice exists yet). If Slice 15's code finds another flow, the pair of examples names it.
2. The test `tests/view/menu-bar.test.mjs` „a click outside the menu closes it and focus lands on „Konto”” still asserts the old behaviour until Slice 17.
3. D-295's `complies` line (the number of a condition without unit, as D-306's examples were) is not touched, as ordered; the cycle lists it as a Minor finding out of scope. D-288 and the lines at 8776, 8808, 8988, 9152 of `foundations/decisions.md` hold the same example „Zapas poniżej 8 · Patyk” without a unit; only D-306 was in the order.
4. Row 10's comment stands in `src/browser/run-screen.css`, not in `styles.css` (handoff note) — left to Slice 21.

## Unread material

- `foundations/part_map.md`: read lines 1–60 only (the browser-view and simulation parts, to check the files and the part names the entries and the styleguide rest on).
- `.runs/task-cycles/drobne-bledy-ekranow/decision-index.md`: read lines 1–566 of 1235; the entries to change I read whole in `foundations/decisions.md`.
- `guidelines/coding-browser-module.md`, the invariants file, the environment facts: not named, not read.
- D-348, D-371, D-336, D-370, D-194, D-201: read whole (D-348 read to the start of its *Rationale* tail, not past line 10656). D-336 and D-194/D-201 had no bearing on the wording; I noted none.

## Searches not found or unclear

- None not found.
- Unclear: the handoff's list names D-194 and D-201 "for their wording around yours"; I found no row of this stage that touches them.
- Unclear: the handoff names D-348 and D-371 "(named by row 4)" — row 4 needs the three sources only; read for the references in D-04's sentence.

## Own-work check

**Requirement most likely not met.** The task says each row's decision must say what the row says and leave no other entry saying the opposite ("agent czytający decyzję dosłownie »naprawi« kod wbrew temu..." and the whole point of rows 1, 2, 6, 8, 9, 15, 17). The likeliest fault of my entries: a changed sentence leaves the old wording alive in another place — another decision, the styleguide, or a test's `decision:` line — so a later agent reads the old rule.

**Check.** A throwaway script (`.runs/foundation-entries/stale.py`, `python -I -B`, removed after the run) scanned every tracked `.md`, `.mjs`, `.ts`, `.tsx`, `.py` and `.css` file outside `.the-way` for the old wording of each changed sentence: „disabled only on the program's first rule”, „focus then returning to „Konto””, „focus then on „Konto””, „Zmieniono regułę 2.1: … → …”, the old D-207 clause without „or where the save last sent failed”, the old D-381 list, the old D-350 *Rejected* („lose the field and the rule”), the old D-172 clause, „with or without unsaved changes of the copy”, the old styleguide menu sentence and the old „Otwarte dla człowieka” item. It also had two control phrases: one that must not match anything, and „gone after it”, which must match, to prove that the scan can hit. I also read by grep every other decision that speaks of closing the rule panel, of the first or last rule of the program, of returning focus to „Konto” and of the unfolded state, for a sentence that contradicts the new ones (D-303 on deleting a rule, D-313, D-350, D-173).

**Run.** `python -I -B .runs/foundation-entries/stale.py` — exit 1, which here means only that the positive control hit: the two hits were `foundations/decisions.md` and `tests/view/scene.test.mjs` for „gone after it” (D-172's own tests clause and an unrelated test). No real stale phrase was found anywhere; the negative control did not match. The grep reading found no decision that says the opposite: D-350 *Rejected* and D-306 agree on what closes the panel (I had already added „deleting the rule” there), D-303 confirms „Usuń” deletes a rule, D-173's line of D-172 stands under a question that only stands with unsaved changes, so it takes the full sentence.

Then `python -B .the-way/elements/common/foundation_check.py` at head: exit 0, `0 errors`.

**What it showed.** No fault; no new commit. What the check cannot show: a re-quoted `decision:` line quotes the whole new sentence while its test holds only part of it (for example `tests/sim/copy-actions.test.mjs:112` holds the predicate, not the Polish wording). That is how those lines stood before (they quoted the whole old sentence), so I kept it; the foundation check does not read the clause `tests:`.
