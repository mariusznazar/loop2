Status: done with concerns

Concern (one): the citations of D-290 in three tests no longer find their sentence, so the foundation check ends with exit 1 and 3 errors until the slices change those three lines; the details are under "Checks".

# Foundation report — the plan's *Foundation entries*

## Commits

- First and last (one commit for the whole step): `ed70970ab7a3215b8fe48b0178973483ad54d26b` — "docs: :card_file_box: write the foundation entries of the model of actions with a target and the bandage — add D-443; ..." — on branch `task/model-czynnosci-i-przedmiotow`, base `aff09e987e3b64801f9011b2f8ad69c4723b4521`.
- Files changed: `foundations/decisions.md` (222 lines changed), `foundations/environment_facts.md` (+12), `foundations/invariants.md` (+3 −3). No code, no test, no guideline file, no instruction file changed (`check_instructions.py` not run, as the handoff says).

## Entries (meaning in English and in Polish, mark, additions)

Each changed decision keeps its question and number; its *Rationale* and *Rejected* describe the decision as it now stands, the *Rejected* of an entry from a row taking the "Not chosen" of the row's source with the cost the source gives (WAY-134). In every changed decision that a later slice's test will hold I kept a pair of examples until those tests stand (the template's "Verification"); each pair is quoted under its entry. A pair kept only until a test of the same change holds the sentence does not make an entry `the cycle's`, and a link in *Relations* does not.

### Entry 1 — D-443, new, `projected`

Placed at the end of the section "How a program runs: rules, actions and conditions", after D-380. Number: the log's highest entry is D-442 and its list of withdrawn numbers holds nothing above D-361, so D-443 is the next free one.

- EN: An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data; the actions made before keep kinds of their own until a change rewrites them.
- PL: Czynność to czasownik plus cel, a cel wynika z własności przedmiotu w danych gry; dawne czynności zostają osobnymi rodzajami, dopóki zmiana ich nie przepisze.
- Binding sentences, *Scope* (`simulation · browser-view`), *Based on* (`none`), *Origin* (`none`), *Rationale* and *Rejected*: word for word the approved definition's (the task's „Zadanie zapisuje”; I also read the projected entry in the definition's file, see "Reaches").
- Added, not given by the projected entry (it left both `TODO`): *Relations* `derives from D-18 · derives from D-26`; *Verification*, whose `tests:` clause names what the plan names — the targets of „Wytwórz” and „Opatrz” following the recipe and the healing property in the simulation, the pick of the rule panel and the balance instrument; a second item laid in a test or an overlay alone becoming a target of each and moss of neither; the check refusing either verb with a target the data do not give; a program of every kind of today read from a version-9 previous save and appended with exactly its content — plus the pair below, kept until those tests (Slices 10, 13, 17) stand with their `decision:` lines. The field *Verification* was `TODO` in the projected entry; the rule of the foundation step reads that a field left `TODO` makes an entry `the cycle's`, save a pair kept only until a test holds. I marked the entry `projected` because the `tests:` clause is the plan's own and the pair is the kept kind; the orchestrator can put it before the human as `the cycle's` if it reads the rule the other way.
- The pair, word for word:
  - complies: an item given a recipe by its row in the items' data becoming a target of „Wytwórz” in the simulation, in the pick of the rule panel and in the balance instrument with no change of code outside the data; „Idź — ognisko” and „Zjedz — jagoda” staying the kinds of action they are, with the program that holds them read from a previous save as it was written
  - violates: a list of the items „Opatrz” takes written in the code of the simulation, of the program editor or of the balance instrument; a new kind of action added for one more pair of a verb and an item that the properties of the items in the data already give; a program holding a kind of action of today changed in its content by the read from a previous save
- No invariant of its own (the task says so).

### Entry 2 — D-145, `row 2`, `row 3`, `row 14`

- EN: A stick stays in the backpack after a strike; „Opatrz — {rzecz}” uses up one piece of its target and gives back its healing whatever took the health, is not carried out in combat or at full health, and leaves the piece in the backpack where health is full at its end.
- PL: Patyk zostaje w plecaku po ciosie; „Opatrz — {rzecz}” zużywa jedną sztukę celu i oddaje jego leczenie bez względu na to, co zabrało zdrowie, nie wykonuje się w walce ani przy pełnym zdrowiu, a gdy zdrowie jest pełne w chwili jej końca, sztuka zostaje w plecaku.
- Binding: the first paragraph keeps the stick sentence (its test citation `A stick stays in the backpack after a strike` still stands); a second paragraph carries rows 2, 3 and 14. The part „the game has no action for dressing wounds” went, and the pair's violating example „an action for dressing wounds added to the data while this decision stands” with it.
- Added: *Relations* gains `derives from D-140 · derives from D-443` (links); the pair below.
- The pair, word for word:
  - complies: the stick in the backpack after an encounter fought with it, as it was before, with nothing of it changed; „Opatrz — Opatrunek” below full health, health rising and the backpack losing one bandage when it ends, whether the health was lost to cold, to hunger or to a blow; health reaching full in the minutes of the action leaving the bandage in the backpack
  - violates: the end of an encounter taking or breaking the stick its strikes used; „Opatrz” carried out in combat or at full health; health given back above full health; a bandage taken where health is full when the action ends

### Entry 3 — D-290, `row 6`

- EN: The pick of the rule panel sets the actions in five groups: „Opatrz” stands in Żywność i walka after „Zjedz — jagoda”, and „Wytwórz” stands alone in a new fifth group, Wytwarzanie.
- PL: Wybór czynności ma pięć grup: „Opatrz” stoi w grupie Żywność i walka po „Zjedz — jagoda”, a „Wytwórz” sam w nowej, piątej grupie Wytwarzanie.
- Position of the new group: fifth, after Żywność i walka, as the task's row says „piątej grupie” and as `ACTIONS`' order of groups in `src/browser/sim/data/actions.ts` (four groups today, in that order) continues.
- Added: none beyond the row (the *Verification* `tests:` clause now says „five named groups”; I carried no pair, since the existing tests hold the sentence and change with the slice; see the concern on the citations).

### Entry 4 — D-121, `row 5`

- EN: The first gathered moss brings the bandage and „Wytwórz”, and the first bandage crafted brings „Opatrz”; the condition „Zdrowie poniżej” stays with the first wolf attack.
- PL: Pierwszy zebrany mech wprowadza opatrunek i „Wytwórz”, a pierwszy wytworzony opatrunek wprowadza „Opatrz”; warunek „Zdrowie poniżej” zostaje przy pierwszej napaści wilka.
- The addition stands at the end of the existing second sentence, so every existing test quotation of D-121 still stands. *Rationale*: „care for the body” joins the tutorial order, the accepted line about moss no longer says nothing uses moss, and the new kind of revealing event (the first piece of an item crafted) is named with its link to D-128; *Rejected*: Not chosen b and the path without a letter of question 4.
- The pair, word for word:
  - complies: the first gathered moss bringing the bandage and „Wytwórz” in the game minute of the gathering, and the first „Wytwórz” that ends with its effect on the bandage bringing „Opatrz” in that game minute and nothing before it
  - violates: „Opatrz” brought by the first gathered moss; the condition „Zdrowie poniżej” brought by the first piece of the bandage

### Entry 5 — D-318, `row 11`

- EN: At „Wytwórz” and „Opatrz” with an item as the target the mage stays where it stands, as at „Zjedz — jagoda”, and the scene gets no new picture or effect.
- PL: Przy „Wytwórz” i „Opatrz” z przedmiotem jako celem mag stoi tam, gdzie stał, jak przy „Zjedz — jagoda”; scena nie dostaje nowego obrazka ani efektu.
- Added: the pair below. The list in the second sentence gained „Wytwórz” and „Opatrz” with an item as the target, so as not to be read as „Wytwórz — ognisko”, which goes to the campfire.
- The pair, word for word:
  - complies: the mage standing where it stood during „Wytwórz — Opatrunek” and „Opatrz — Opatrunek”, the scene showing no picture and no effect of either
  - violates: the mage walking to the campfire, to the right edge or to the middle of the clearing during „Opatrz — Opatrunek”; an effect of dressing added to the scene

### Entry 6 — D-363, `row 8`

- EN: The price of an action whose price its target gives stands at each target of the pick of its target and at the chosen action, such as „Wytwórz — Opatrunek (2 mchy)” and „Opatrz — Opatrunek (1 opatrunek)”, and the cells „Wytwórz” and „Opatrz” of the pick of actions have none.
- PL: Cena czynności, której cenę daje cel, stoi przy każdym celu w wyborze celu i przy wybranej czynności, na przykład „Wytwórz — Opatrunek (2 mchy)” i „Opatrz — Opatrunek (1 opatrunek)”; komórki „Wytwórz” i „Opatrz” w wyborze czynności jej nie mają.
- Wording note: row 8 says only „Wytwórz” has no price in its cell; the spec (Decision 3, unit 7: „the cell „Opatrz” shows its time and no price”) gives „Opatrz” none either, since its price is that of its target. I wrote both, following the spec. The first sentence's „at every cell of its pick” gained „save the cell of an action whose price its target gives”; the first paragraph's other words are unchanged (the three existing quotations stand).
- Added: *Relations* gains `derives from D-443` (link); the pair below.
- The pair, word for word:
  - complies: the cells „Wytwórz” and „Opatrz” of the pick of actions with no price; „Opatrunek (2 mchy)” at the target of „Wytwórz” and „Opatrunek (1 opatrunek)” at the target of „Opatrz”; „Wytwórz — Opatrunek (2 mchy)” at the action chosen in the panel; the row of the rule reading „Wytwórz — Opatrunek” with no price
  - violates: a price in the cell „Wytwórz” of the pick of actions, a price kept in the data of the action „Wytwórz” itself instead of read from the recipe of its target; a price in the row of a rule with „Opatrz — Opatrunek”

### Entry 7 — D-293, `row 9`, `row 13`

- EN: The cell „Wytwórz” of the pick of actions shows no time, „Opatrz” shows its own, and an action whose time its target gives shows it at each target of the pick of its target, beside the price.
- PL: Komórka „Wytwórz” w wyborze czynności nie ma czasu, komórka „Opatrz” ma swój, a czynność, której czas daje cel, pokazuje go przy każdym celu w wyborze celu, obok ceny.
- Added: *Relations* gains `derives from D-443` (link); the pair below.
- The pair, word for word:
  - complies: the cell „Opatrz” of the pick of actions with its time and the cell „Wytwórz” with none; the target of „Wytwórz” in the pick of its target with its price and its time beside it, from the recipe of the target
  - violates: a time in the cell „Wytwórz” of the pick of actions; the time of „Wytwórz” kept in the data of the action itself instead of read from the recipe of its target; the pick of the target of „Wytwórz” with the price and no time

### Entry 8 — D-380, `row 10`, `row 15`

- EN: „Wytwórz — {rzecz}” and „Opatrz — {rzecz}” short of a thing name it „brakuje {ile} × {rzecz}”, „Opatrz — {rzecz}” at full health names „zdrowie pełne”, and where both hold „zdrowie pełne” stands first.
- PL: „Wytwórz — {rzecz}” i „Opatrz — {rzecz}” bez rzeczy w plecaku podają „brakuje {ile} × {rzecz}”, „Opatrz — {rzecz}” przy pełnym zdrowiu podaje „zdrowie pełne”, a gdy prawdziwe są oba, stoi „zdrowie pełne”.
- Binding: a second paragraph (the first paragraph already has the three sentences the template allows; the list of the five old actions „short of a thing in the backpack” is quoted by a test, so I did not extend it). *Rejected* from the rows: the wording „nie ma czego opatrywać” and the reverse order.
- The pair, word for word (it extends the entry's existing pair; the lead-in names the new actions):
  - complies: …; „Wytwórz — Opatrunek” with no moss in the backpack reading „brakuje 2 × mech”; „Opatrz — Opatrunek” at full health, with no bandage in the backpack, reading „zdrowie pełne”
  - violates: …; „Opatrz — Opatrunek” at full health, with no bandage in the backpack, reading „brakuje 1 × opatrunek”

### Entry 9 — D-142, a sentence added, `row 12`

- EN: „Wytwórz” and „Opatrz” take what they use out of the backpack when they end, with their effect, so an attack that interrupts either takes nothing.
- PL: „Wytwórz” i „Opatrz” zabierają rzeczy z plecaka na końcu czynności, razem z jej skutkiem, więc przerwane napaścią nie zabierają nic.
- Binding: a new one-sentence paragraph; the three existing sentences and their quotations are untouched. *Rationale* names the cost the task's question 8 accepts (time at risk, not pieces; the moment of an attack is random); *Rejected* adds the way not chosen (pieces taken at the start).
- The pair, word for word:
  - complies: an attack in a minute before the end of „Wytwórz — Opatrunek” leaving the moss in the backpack and no bandage made; an attack in the minute in which „Opatrz — Opatrunek” ends coming after its effect, with the bandage gone and the health given back
  - violates: the moss or the bandage taken at the start of the action and lost with the attack

### Entry 10 — D-289, sentences added, `row 1` and `the cycle's`

- Row 1, EN: A thing that lies on no map, such as the bandage, is no target of „Idź”, „Zbierz”, „Obchód” or „Tu leży mniej niż”, in a map run or outside one. PL: Rzecz, która nie leży na żadnej mapie, jak opatrunek, nie staje wśród celów „Idź”, „Zbierz”, „Obchód” ani w warunku „Tu leży mniej niż” — ani w przejściu mapy, ani poza nim.
- `the cycle's` (from the spec's Decision 3, unit 7, not from a row), EN: „Wytwórz” and „Opatrz” with no known target stand greyed with „nie znasz jeszcze celu”, as „Idź” and the others of the entry do. PL: „Wytwórz” i „Opatrz” bez znanego celu stoją wyszarzone z powodem „nie znasz jeszcze celu”, jak „Idź” i pozostałe z wpisu.
- Both sentences stand in a second paragraph; the existing paragraph and its quotations are untouched. *Relations* gains `derives from D-443` (link).
- Added, not given by the row or the spec: the pair below (kept until the tests of Slices 10 and 13 stand). The *Rejected* holds the row's Not chosen b.
- The pair, word for word:
  - complies: the bandage standing among the items of „Zapas poniżej” and in no pick of „Idź”, „Zbierz”, „Obchód” or „Tu leży mniej niż”, with a map run or without one; „Wytwórz” with no known item of a recipe standing greyed with „nie znasz jeszcze celu”
  - violates: „Zbierz — Opatrunek” greyed with „nie ma go na tej mapie”; „Opatrz” with no known target standing out of the pick or standing there with no reason

### Entry 11 — D-441, `the cycle's`

- EN: A remembered judging holds a fingerprint of the content of the program it judged and stands beside „Program:” only while the program holds that content as well as the content revision and the character's generation number it was judged at.
- PL: Zapamiętana ocena trzyma odcisk treści programu, który oceniła, i stoi przy „Program:” tylko dopóki program ma tę treść, a także rewizję treści i pokolenie postaci, przy których go oceniono.
- Binding: one sentence added to the first paragraph (the stored value holds the fingerprint, defined by the counting of D-442) and one to the second (the judging stands only while the fingerprints are equal; a value whose fingerprint is no text of that form is a value of another form). The existing sentences are untouched, so the existing quotations of D-441 stand. The accepted case of a judging beside other content after a lost change went from *Rationale*; the reasoning for the fingerprint and the cost of one more field joined it. *Rejected* is unchanged.
- Not written into the entry: „the stored form is version 2”. The decision names no number of the stored form today („the key naming the version of the stored form”), and a number of a version is a single value that belongs to the code and its test (question 3 of "Where it goes"); a value of version 1 is already „neither read, written nor removed” by the entry's own sentence. If the orchestrator wants the number in the entry, it is one clause.
- Added (the cycle's): the pair below, kept until the tests of Slice 1 stand.
- The pair, word for word (it extends the entry's existing pair; the lead-in now also names the fingerprint):
  - complies: …; a judging made after a change that a refused save lost, standing beside no program that later reaches the same content revision with other content
  - violates: …; a judging standing beside „Program:” where the content revision of the program equals the judging's and the content of the program is another; a judging read from a value whose fingerprint is no text of the form of a fingerprint

### Entry 12 — D-442, `the cycle's`

- EN: The content revision itself is unchanged; its rationale and accepted cost no longer hold the case the fingerprint closes, and the fingerprint-only way stays rejected as a way that replaces the count.
- PL: Rewizja treści zostaje bez zmian; jej uzasadnienie i przyjęty koszt tracą przypadek, który zamyka odcisk, a droga z samym odciskiem zostaje odrzucona jako zastępująca licznik.
- Binding sentences and *Verification* unchanged. *Rationale*: „needs no hash and no clock” became „needs no clock”; one sentence says the count may repeat for other content after a lost change, so nothing reads it alone and D-441 reads it beside a fingerprint; the accepted cost keeps „one more number in each saved program and in the load” only. *Rejected*: „a fingerprint of the program's content, compared when a judging is read” became „a fingerprint of the program's content alone, in place of the count”; the clock way is unchanged.

### Entry 13 — invariant `content-identifiers`, `the cycle's`

- EN: No TypeScript file under `src/browser/` outside the data files names a game map, a resource, an item or an archetype by the identifier or name the data give it.
- PL: Żaden plik TypeScript w `src/browser/` poza plikami danych nie nazywa mapy, zasobu, przedmiotu ani archetypu identyfikatorem ani nazwą z danych.
- Only the sentence changed (the words „an item” added). *Method* stays `test`, its test `tests/invariants/test_content_identifiers.py` is changed by Slice 5, which brings it to items; the check lists the entry as „reads `test` and its sentence is changed by this change, while no file citing it changed” — that is the expected listing, and the request names the test the slice will alter.

### Entry 14 — invariant `icon-credits`, `the cycle's`

- EN: *Rests on* gains the facts of the titles of the icons `bandage-roll` and `first-aid-kit`; the sentence is unchanged.
- PL: *Rests on* dostaje fakty o tytułach ikon `bandage-roll` i `first-aid-kit`; zdanie bez zmian.
- Check `tests/invariants/test_icon_credits.py` is changed by Slice 8; this step changes no test.

### Entry 15 — environment fact `game-icons-bandage-roll-title`, `the cycle's`

- EN: The page of Lorc's icon `bandage-roll` on game-icons.net names the icon „Bandage roll icon”.
- PL: Strona ikony `bandage-roll` autora Lorc na game-icons.net nazywa ją „Bandage roll icon”.
- Read on 2026-11-21 from the page `https://game-icons.net/1x1/lorc/bandage-roll.html` (heading `<h1 id="icon-name">`: „Bandage roll icon”; the author line: „by Lorc under CC BY 3.0”); archived copy `https://web.archive.org/web/20261009034055/https://game-icons.net/1x1/lorc/bandage-roll.html` (2026-10-09), the closest existing capture found through the archive's CDX index, whose heading I read too: the same text. Placed after `game-icons-wolf-head-title`; *Source* in the form of the other title facts.

### Entry 16 — environment fact `game-icons-first-aid-kit-title`, `the cycle's`

- EN: The page of Delapouite's icon `first-aid-kit` on game-icons.net names the icon „First aid kit icon”.
- PL: Strona ikony `first-aid-kit` autora Delapouite na game-icons.net nazywa ją „First aid kit icon”.
- Read on 2026-11-21 from `https://game-icons.net/1x1/delapouite/first-aid-kit.html` (heading: „First aid kit icon”; author line „by Delapouite under CC BY 3.0”); archived copy `https://web.archive.org/web/20250912194634/https://game-icons.net/1x1/delapouite/first-aid-kit.html` (2025-09-12), the latest capture the CDX index lists, heading read: the same text.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (from the worktree root) on the base before my edits: exit 0, „0 errors”.
- The same command after my edits, run on the committed tree: **exit 1, 3 errors**, all the same cause:
  - `tests/sim/data.test.mjs:206`, `tests/view/program-editor.test.mjs:1058`, `tests/view/rule-editor.test.mjs:1528`: „the quotation stands in no binding sentence of `D-290`”. Each cites `decision: D-290 "The pick of the rule panel sets the actions in four named groups"`; D-290 now says five groups (row 6), so the sentence they quote cannot stand. They are tests; I changed none. The slices that hold the five groups (7, 12, 13) change those three lines to the new wording „The pick of the rule panel sets the actions in five named groups”. Until then the full gate would fail on them; nothing else of the check fails.
  - One line the script only lists: `foundations/invariants.md:236: listed: content-identifiers reads test and its sentence is changed by this change, while no file citing it changed` — entry 13 above.
  - The check reports no limit on sentences or words for any decision I changed or added.
- Not run: `python -B .the-way/instruction-files/check_instructions.py` (no instruction file changed); the tests of the repository and the full gate (the handoff forbids them).
- Own-work check, entry by entry against its row and the code:
  - Rows 1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15 each stand in the entry the plan names (D-289, D-145, D-145, D-121, D-290, D-363, D-293, D-380, D-318, D-142, D-293, D-145, D-380); the wording of each matches the task's row and the spec's Decision 3 on the points they overlap (price and time of the cells, the reasons, the group, the end-of-action payment). Rows 4 and 7 go to data and icons and are not entries; the plan's entries 15 and 16 are the two facts.
  - Code: the four groups of today and their order in `src/browser/sim/data/actions.ts` (`move`, `gather`, `fire`, `foodAndCombat`) match D-290's old wording, so the new group follows them; `ICON_SOURCE_COMMIT` in `src/browser/view/credits.ts` was not needed by an entry.
  - What the entries most likely do not meet: the part of the requirement that D-363's old sentence „at every cell of its pick … and at the action chosen in the panel” and D-293's first sentence still hold for the new verbs where the text now carves them out; I checked the three existing quotations of D-363 and the five of D-293 still stand (the check says so: no error on them).

## Reaches beyond this handoff

- `a working file of the project's definition (outside the repository's tracked files)` (the projected entry of the new decision, lines 63–76): read to take its *Based on* (`none`) and *Origin* (`none`), which „Zadanie zapisuje” does not give; it is the approved definition's file.
- `.runs/task-cycles/model-czynnosci-i-przedmiotow/plan.md`: a search of `plan.md`, `spec.md` and the frozen task for the word „Wytwarzanie” (lines found: plan 198 „a fifth group „Wytwarzanie” after „Żywność i walka””, and the like), to settle the position of the new group; I read only those lines, and the line quoted is the only one the entry rests on beside the task's „piątej grupie”.
- `foundations/invariants.md`, `judging-cache-reading` (read whole), to check that D-441's new sentence needs no change to it: its sentence says „the form the cache writes”, which covers the fingerprint.
- `src/browser/sim/data/actions.ts` (groups, lines 45–52 and the `group:` fields), grep only.
- game-icons.net pages and the Internet Archive's CDX index, by `curl`, for entries 15 and 16.
- Tests quoting the decisions I changed (`git grep 'decision: D-…'`), to keep their quotations standing.

## Unread material

- The task: lines 1–39 and 125–149 and 237 onward of `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md` (I read 40–125 and 150–240, which hold *To do* 8–15, *Questions to settle*, *Context*, *Decisions in play* and *Settlements to record*). The spec: I read 190–360 and 380–432 as the handoff names, and nothing else.
- Decisions named by the handoff that I read only in part or not at all: D-18, D-26, D-23, D-128, D-401 (read to 70 lines each, cut at 1500 characters a line, so the tail of the long lines of D-401 was not read), D-440 and D-439 (read whole as part of the section just before D-441, yes), D-206 (not read whole), D-63, D-143, D-144, D-140, D-60, D-310, D-387, D-416 (not read; their text is quoted in the task, which I read). I did not read the whole of `foundations/decisions.md` or `invariants.md`.
- `elements/decisions/examples.md`, `elements/invariants/examples.md`, `elements/common/projected_mode.md` and `elements/common/critique/SKILL.md` (not needed: not projected mode, no collective review).
- `foundations/part_map.md`: read the part headings, the files of `browser-view` and a few lines; not whole. `foundations/glossary.md` was read whole (the entries use no term in another meaning; „fingerprint” is a plain word the decision defines by what it equals; no glossary entry added).
- `src/browser/sim/data/items.ts` and `src/browser/view/credits.ts` beyond the lines named above.

## Searches not found or unclear

- The position of the group „Wytwarzanie” among the groups: the task's row 6 says „nowej, piątej grupie”, the spec says only „five groups”; the plan (outside the handoff) says after „Żywność i walka”. I wrote it fifth and last. Unclear in the task and spec; settled by the plan's wording and the task's „piątej”.
- Whether D-443 is `projected` or `the cycle's` (its *Verification* was `TODO` in the projected entry): unclear in the rule; entry 1 above.
- Whether the number of the stored form of the judging cache (2) belongs in D-441: the entry names no number today; I left it out (entry 11).
- Row 8's „Wytwórz has no price in its cell” against the spec's „Opatrz shows its time and no price”: I followed the spec for „Opatrz” (entry 6).

## Working copies

None made. No directory `.runs/foundation/` was created; the files of the scratchpad of the session (outputs of the check, the list of citations) lie outside the worktree and are no working copies in the sense of the cycle's rule.
