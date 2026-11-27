# Foundation report — task rana-i-opatrunek (agent of the plan's Foundation entries)

**Status:** done

## Commits (range start `be4e9c09f3c45f421d04983948a88bd6240809bf`, branch `task/rana-i-opatrunek`)

- `9c89f880` — docs: the ten decisions (file `foundations/decisions.md`, +≈84 / −≈45 lines, in place).
- `6d07bf20` — test: three `decision:` quotation lines (3 files, 1 line each, no assertion changed).

Not pushed. Author address of both commits `the author's private address` (the conditional private address; checked).

## Entries — each changed in place, none renumbered, no new number

Rows 5 and 10 (data or code) have **no entry written**: they are written by slices 2 and 4 (row 5) and 4 and 10 (row 10) in
`src/browser/sim/data/skills.ts`, `src/browser/sim/data/archetypes.ts` and `src/browser/sim/data/actions.ts` with their tests.

Marks. D-144, D-150, D-145, D-387, D-290 and D-379 carry rows 1–4 and 6–9 whole: marked `row <n>`. D-199, D-380, D-363 and
D-120 carry no row of *Settlements to record*; the task's *Decisions in play* gives their change ("follows from the code").
I marked them `the cycle's` as the safe reading of `foundation_step.md` ("an entry no row and no projected entry carries
whole"); the orchestrator decides whether *Decisions in play*, which the human accepted with the task, makes them `row`-like.
No pair of examples I added makes any entry `the cycle's` (see "Pairs", the `foundation_step.md` exception "a pair kept only
until a test of the same change holds the sentence"); the handoff's wording on this point reads the other way, and I followed
`foundation_step.md`.

| Entry | Meaning in English | Znaczenie po polsku | Mark |
|---|---|---|---|
| D-379 | The skills are nine; the ninth, „Opatrywanie małych ran”, gives a level and a point at 10, 28, 60 and 110 practice, its branches „Mocniejszy zwój” (+5 health from a bandage, 1 · 1 · 2), „Wprawna dłoń” (−2 minutes of „Opatrz”, 1 · 1 · 2), „Szybkie gojenie” (+0.05 health regained by itself in a game minute, 2 · 3), „Ucisk” (3). | Umiejętności jest dziewięć; dziewiąta, „Opatrywanie małych ran”, daje poziom i punkt przy 10, 28, 60 i 110 wprawy, a jej gałęzie to „Mocniejszy zwój” (+5 zdrowia z opatrunku, 1 · 1 · 2), „Wprawna dłoń” (−2 minuty „Opatrz”, 1 · 1 · 2), „Szybkie gojenie” (+0,05 zdrowia samoistnego powrotu na minutę, 2 · 3) i „Ucisk” (3). | row 6 |
| D-144 (three rows, one paragraph) | The bought branch Ucisk opens the combat action „Ucisk — {rzecz}”, which the player writes as a combat rule with a threshold of its own and which uses one piece from a pocket of the belt (an empty pocket taking one from the backpack), while „Opatrz” stays out of combat and takes from the backpack; in one turn it gives back what „Opatrz” gives with the same item, „Mocniejszy zwój” ranks included, never above full, and at full health it is not carried out. | Kupiona gałąź Ucisk otwiera czynność walki „Ucisk — {rzecz}”, którą gracz pisze jako regułę walki z własnym progiem i która zużywa sztukę z kieszeni pasa (pusta kieszeń bierze z plecaka), a „Opatrz” zostaje poza walką i bierze z plecaka; w jednej turze Ucisk przywraca tyle, co „Opatrz” tym samym przedmiotem, ze stopniami „Mocniejszego zwoju”, nigdy ponad pełne, a przy pełnym zdrowiu się nie wykonuje. | rows 1, 2, 3 |
| D-150 | „Ucisk — {rzecz}” grows „Opatrywanie małych ran”, which stands among the elemental mage’s predispositions. | „Ucisk — {rzecz}” rozwija „Opatrywanie małych ran”, które stoi wśród predyspozycji Maga żywiołów. | row 4 |
| D-145 | The health „Opatrz — {rzecz}” gives back is the healing the data give the thing, increased by the bought ranks of „Mocniejszy zwój”; „It is not carried out in combat” stays. | Zdrowie, które daje „Opatrz — {rzecz}”, to leczenie z danych przedmiotu powiększone o kupione stopnie „Mocniejszego zwoju”; zdanie o niewykonywaniu w walce zostaje. | row 7 |
| D-387 | 0.05 health a game minute of regain is the number of a body with no bought rank of „Szybkie gojenie”, each rank adding 0.05. | 0,05 zdrowia na minutę samoistnego powrotu to liczba ciała bez kupionych stopni „Szybkiego gojenia”, każdy stopień dokłada 0,05. | row 8 |
| D-290 | „Ucisk” stands in the group „Żywność i walka” after „Odskocz” and before „Załóż” (which ends the group). | „Ucisk” stoi w grupie „Żywność i walka” za „Odskocz”, przed „Załóż”, które kończy grupę. | row 9 |
| D-199 | „Ucisk” gives the price and omits before-and-after values, as „Obchód”, „Czysty płomień” and „Zwiad” do. | „Ucisk” pokazuje cenę bez wartości „teraz → po kupnie”, jak „Obchód”, „Czysty płomień” i „Zwiad”. | the cycle's (Decisions in play, D-199) |
| D-380 | „Ucisk — {rzecz}” is refused with the same words and in the same order as „Opatrz”: „zdrowie pełne” before „brakuje {ile} × {rzecz}”, the lack counted in the pockets with the backpack that refills a pocket. | „Ucisk — {rzecz}” odmawia tymi samymi słowami i w tej samej kolejności co „Opatrz”: „zdrowie pełne” przed „brakuje …”, z brakiem liczonym w kieszeni razem z plecakiem, z którego kieszeń się uzupełnia. | the cycle's (Decisions in play, D-380) |
| D-363 | „Ucisk” with an item as the target is an action whose target gives the price: no price at its cell, the price at the target and at the chosen action, „Ucisk — Opatrunek (1 opatrunek)”. | „Ucisk” z przedmiotem jako celem to czynność, której cena wynika z celu: bez ceny w komórce wyboru, z ceną przy celu i przy wybranej czynności, „Ucisk — Opatrunek (1 opatrunek)”. | the cycle's (Decisions in play, D-363) |
| D-120 | Its *Verification* no longer says „Wytwórz” and „Opatrz” with an item as the target stay open with no predisposition: with the bandage as the target they are grown by „Opatrywanie małych ran” and leave the repertoire with that skill; only the walks and „Wędruj” stay open. | Jego *Verification* nie mówi już, że „Wytwórz” i „Opatrz” z przedmiotem jako celem zostają otwarte bez predyspozycji: z opatrunkiem jako celem rozwija je „Opatrywanie małych ran” i wypadają z repertuaru razem z nim; otwarte zostają tylko ruchy i „Wędruj”. | the cycle's (Decisions in play, D-120) |

Other changes written with them, all in prose of the same entries: *Rationale* of D-144, D-150, D-145, D-379, D-387, D-290,
D-363 (one sentence each on why); *Rejected* of D-144 (Q1 b, Q5 a, Q7 part 1 b), D-150 (Q6 b, c), D-145, D-379, D-387 (Q2 b, c;
D-379 also Q6 part 2 "another name"), D-290 (Q7 place "right after „Opatrz”"). The *Rejected* of D-199, D-380, D-363 and
D-120 is left as it stood: their source (*Decisions in play*, "bez wyboru") keeps no way not chosen of its own. D-144 *Relations*
gained `derives from D-456` (a link; it makes nothing `the cycle's`). D-199 *Rationale* and *Rejected*: the counts "eight
trees and fourteen branches" and "about 22 rows" made false by the ninth tree and the four branches now read "nine trees and
eighteen branches" and "about 27 rows" (the same arithmetic, 9 + 18).

Binding words: the foundation check reported no excess of paragraph or total words; D-379 stands in two paragraphs (283 → ≈291
words in the first; the branches of the ninth skill in a second), D-144 gained a third paragraph.

## Pairs of examples added (word for word; each only until a test of a later slice holds the sentence)

**D-144**, the clause now reads "For a creature's dodge, the end of an encounter and „Ucisk — {rzecz}”, which no test holds yet, an agent compares a change with the part no test holds:" and the two bullets gained, after the dodge examples already there:
- complies: „Ucisk — Opatrunek” in a combat turn at 40 health with a bandage in a pocket giving back what „Opatrz — Opatrunek” gives and using up that bandage, with an empty pocket and a bandage in the backpack taking the bandage into the pocket and giving the health in the same turn, at 90 health giving back only up to 100, and at 100 health not carried out
- violates: „Ucisk — Opatrunek” using up a bandage from the backpack while a pocket holds one, giving back more or less than „Opatrz — Opatrunek” does with the same bandage, raising health above full or being carried out at full health; „Opatrz” carried out in a combat turn

**D-150** (new pair, clause "For „Ucisk — {rzecz}” growing „Opatrywanie małych ran”, which no test holds yet, an agent compares a change with the part no test holds:"):
- complies: „Ucisk — Opatrunek” ending in effect adding one practice to „Opatrywanie małych ran”, the skill that „Wytwórz — Opatrunek” and „Opatrz — Opatrunek” grow too, and the skill standing among the elemental mage's predispositions
- violates: „Ucisk — Opatrunek” growing a skill other than „Opatrywanie małych ran”, or no skill; „Opatrywanie małych ran” left out of the elemental mage's predispositions

**D-145** (new pair, clause "For the increase of the healing by „Mocniejszy zwój”, which no test holds yet, an agent compares a change with the part no test holds:"):
- complies: „Opatrz — Opatrunek” at 20 health with two ranks of „Mocniejszy zwój” bought giving back 10 health more than with none
- violates: „Opatrz — Opatrunek” giving back the same health with ranks of „Mocniejszy zwój” bought as with none, or the increase held in the code of the action rather than read from the bought ranks

**D-379** (clause extended: "…, and for the threshold, the effects and the prices of „Opatrywanie małych ran”, which no test holds yet, an agent compares…"; the *tests:* clause now says "the thresholds of eight of the nine character skills"); appended to the existing bullets:
- complies: …; „Opatrywanie małych ran” giving a level and a point at 10, 28, 60 and 110 practice; „Mocniejszy zwój” bought to its third rank for 1, 1 and then 2 points, each rank adding 5 health to a bandage; „Wprawna dłoń” taking 2 minutes off „Opatrz” for each rank; „Szybkie gojenie” bought for 2 and then 3 points; „Ucisk” bought for 3 points
- violates: …; a threshold of „Opatrywanie małych ran” other than 10, 28, 60 or 110; „Szybkie gojenie” bought to its second rank for 2 points; „Ucisk” bought for a price other than 3; „Mocniejszy zwój” adding 4 health a rank

**D-387** (new pair, clause "For the ranks of „Szybkie gojenie”, which no test holds yet, an agent compares a change with the part no test holds:"):
- complies: a body that is neither chilled nor starving, with two ranks of „Szybkie gojenie” bought, regaining 0.15 health in a game minute outside combat, and one with none regaining 0.05
- violates: a body with ranks of „Szybkie gojenie” bought regaining only 0.05, or a rank adding another amount than 0.05

**D-199** (clause extended with "the price alone of „Ucisk”, which no test holds yet"); appended to the existing bullets:
- complies: …; „Ucisk” at rank 0 reading its description and „cena 3” with no before-and-after values
- violates: …; „teraz … → po kupnie …” beside „Ucisk”

**D-363** (new pair, clause "For „Ucisk” with an item as the target, which no test holds yet, an agent compares a change with the part no test holds:"):
- complies: the cell of „Ucisk” in the pick of actions showing no price, the pick of its target showing „Opatrunek (1 opatrunek)” and the action chosen in the panel „Ucisk — Opatrunek (1 opatrunek)”
- violates: the cell of „Ucisk” showing „(1 opatrunek)” after its name; the row of a rule with „Ucisk — Opatrunek” showing a price

D-290, D-380 and D-120 carry no new pair: D-290's and D-380's existing *tests:* clauses already name the parts (the groups and their order; the refusals and their order) and the later slices' tests extend them; D-120's *tests:* clause is only corrected (see above). The numbers in the pairs (25 from the bandage: not written; 40 / 90 / 100 / 20 health, +10 for two ranks, 0.15) are examples I computed from the task's numbers (5 health a rank, 0.05 a rank), not values taken from the data.

## Quotations of tests changed (`foundation_check.py --skip-test-citations` named exactly these three)

| File | Old quotation | New quotation | Sentence cited now |
|---|---|---|---|
| `tests/sim/gear-wear.test.mjs:465` | D-290 "The pick of the rule panel sets the actions in five named groups: Ruch — „Eksploruj”, … Żywność i walka — „Zjedz — jagoda”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Załóż”; and Wytwarzanie — „Wytwórz”." | D-290 "The pick of the rule panel sets the actions in five named groups" | the first sentence of D-290, by its opening (the full list now holds „Ucisk”; the test asserts that „Załóż” ends the group, which stays true) |
| `tests/sim/skills.test.mjs:111` | D-379 "The eight character skills give a level and a point at each of these amounts of practice" | D-379 "The nine character skills give a level and a point at each of these amounts of practice" | first sentence of D-379 |
| `tests/view/character-skills.test.mjs:24` | same as above | same as above | first sentence of D-379 |

Kept as they stood, because the entry grew by a sentence or a clause after the quoted words: the D-144, D-145, D-150, D-199,
D-363, D-380 and D-387 quotations, and D-379's "Each rank of a branch gives the effect below …" (14 tests).

Tests whose assertions the change will make false and which I left alone (not mine; the slices change them): the test in
`tests/sim/gear-wear.test.mjs` around line 465 (a `deepEqual` of the group „foodAndCombat” without „Ucisk”); the tests behind the
two D-379 lines, which assert eight skills (`tests/sim/skills.test.mjs`, `tests/view/character-skills.test.mjs`), and any
test that counts the skills or branches.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — first run (after the entries): exit 1, three
  errors (the three quotations above); after the fix: exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, `0 error, 0 warn, 129 info`.
- The product's gate and the full test suite were not run (outside this handoff's boundary).
- Not run: `foundation_check.py` without `--skip-test-citations` (it would report the entries whose pairs wait for tests, and the
  handoff names the skipping run).

## Reach beyond the handoff

- `grep` of `foundations/decisions.md` and `foundations/invariants.md` for `Odskocz|Kopnij` and for "eight/fourteen trees": found
  D-143 (line ≈6987), which lists the actions the first wolf attack brings into the Understanding („Uderz — patyk”, „Kopnij”,
  „Odskocz”); I did not change it: it says nothing of branch actions, and D-195 gives the entry of a branch action with its
  tree. Found **D-416** (line ≈4864, *Rejected* of the screen Wiedza): "about 22 rows at eight trees and fourteen branches" —
  the same arithmetic as D-199's, now stale; it is outside the ten decisions and I left it, **for the orchestrator to decide
  (recommend: update it to "about 27 rows at nine trees and eighteen branches" in the return step or a fix)**.
- `grep` of the test files for the `decision:` lines of the ten decisions (to know which quotations the change touches).
- D-451 and D-461 were not opened (D-451 is a link of D-144 already there; D-461 is the gear screen, not in play).

## Choices (with the way rejected and its cost if wrong)

- D-363 and D-380, D-199, D-144, D-145, D-150: the new content added **after** the quoted words or as a sentence of its own,
  as the handoff asks; the way rejected: rewriting each list into the quoted sentence (it would have broken about 30
  quotations of tests; costs a commit of quotation lines and no meaning). For D-145 this leaves the earlier sentence "gives back
  that healing" followed by a sentence that says the healing is increased by the ranks; if the reviewer finds that tension
  unclear, the cost is to change that sentence and its six quotations.
- D-379: the branches of the ninth skill stand in a second paragraph, because adding them to the first would pass the 300-word
  limit of a paragraph. Rejected: a sentence joined to the first paragraph (would be ≈340 words).
- D-144: the Ucisk sentences are a third paragraph; the sentences about „Załóż” stay a paragraph of their own.
- D-120: only its *Verification* clause changed, as the task says; the binding sentences are untouched.
- Relation of the pair to the mark: see "Marks" above.

## Working copies

`.runs/foundation/` (edit scripts and the outputs of the checks) stood under the worktree; **removed** at the end. No worktree or
clone was made. Nothing remains.

## Problems observed

None of the code or the foundation beyond D-416 above. The two hook messages (rules on scripts and on git) stopped each of my
first Bash calls once and were read; no effect on the work.

**Unread material:** `foundations/part_map.md` — read the first 80 lines of about 190 (the parts browser-view, simulation and the start of account-server; no part of the map is changed by this step); D-451 and D-461 (see above); D-146's and the others' context entries were read whole except those two.

**Searches not found or unclear:** none.
