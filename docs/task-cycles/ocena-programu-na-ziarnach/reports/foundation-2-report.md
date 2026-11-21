done

# Foundation step 2 — the plan's Foundation entries of correction 1, task `ocena-programu-na-ziarnach`

- Worktree `.`, branch `task/ocena-programu-na-ziarnach`, base head `4e4a104b`; `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink.
- Method read whole: `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/elements/common/rules.md`; decisions `SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`; invariants `SKILL.md`, `decide_entry.md`, `draft.md`, `write.md`, `template.md`, `examples.md`; glossary `SKILL.md`, `read.md`, `decide_entry.md`, `write.md`, `template.md`, `examples.md`.
- Commit: `4d813606` — `docs: :card_file_box: keep the last judging of each character, program and map in the browser's lasting storage …` (paths `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`).
- The part map's row (the cache's module under *Trust boundary*) is not written: Slice 5 writes it.

## Entries

Every entry below is marked `the cycle's`: none is carried whole by a row of the task's *Settlements to record* or by a projected entry; the human's remark 1 and 3 of correction 1 and the reviewed spec carry them.

| Entry | Plan row | Mark | Meaning (English) | Znaczenie (po polsku) |
|---|---|---|---|---|
| D-441 (new) — Where does the game keep the last judging of each character, program and map? | 1 | the cycle's | The browser keeps the last judging of each character–program–map triple in its lasting storage, one value per triple under the account's identifier and the moment the game was made, and the judging stands only while the program is at the stored content revision and the character at the stored generation number; the saved game state holds no judging. | Przeglądarka trzyma ostatnią ocenę każdej trójki postać–program–mapa w swojej trwałej pamięci (localStorage), jedną wartość na trójkę pod identyfikatorem konta i chwilą założenia gry, a ocena stoi tylko dopóki program ma zapisaną rewizję treści, a postać zapisany numer pokolenia; zapis gry nie trzyma żadnej oceny. |
| D-442 (new) — How does the game state count the changes of a program's content? | 2 | the cycle's | Each program of the list carries a content revision, 0 when the program is made and one higher at each save after which its rules, rule groups with their order or trip plan differ, never at a rename, and the server neither gives nor reads it. | Każdy program z listy ma rewizję treści: 0, gdy program powstaje, i o jeden więcej przy każdym zapisaniu, po którym jego reguły, grupy (z kolejnością) albo plan wyprawy są inne, nigdy przy zmianie nazwy; serwer jej nie nadaje ani nie czyta. |
| D-440 (changed) — What does the game remember of a judging, and what stands beside the list „Program:”? | 3 | the cycle's | The game remembers the last judging in the browser that made it (D-441), and a judging erased by a change of the program or a death that takes practice never stands again, the content revision and the generation number telling it apart. | Gra pamięta ostatnią ocenę w przeglądarce, która ją zrobiła (D-441), a ocena skasowana zmianą programu albo śmiercią zabierającą wprawę już nigdy nie wraca, bo odróżnia ją rewizja treści i numer pokolenia. |
| D-04 (changed) — What is the game built with? | 4 | the cycle's | The browser view also draws the mark beside „Program:” from the judgings the browser remembers in its lasting storage, and the game state stores the moment the page made the game, which tells one game of an account from another. | Widok rysuje też znak przy „Program:” z ocen zapamiętanych w trwałej pamięci przeglądarki, a stan gry przechowuje chwilę, w której strona założyła grę, i ta chwila odróżnia jedną grę konta od drugiej. |
| D-386 (changed) — Which game states does the load of a saved game state admit? | 5 | the cycle's | The load takes the moment the game was made as a safe integer of any sign compared with no clock, and a program's content revision as any safe integer from 0. | Wczytanie przyjmuje chwilę założenia gry jako bezpieczną liczbę całkowitą dowolnego znaku, nieporównywaną z zegarem, a rewizję treści programu jako dowolną bezpieczną liczbę całkowitą od 0. |
| D-165 (changed) — How does the game state tell one program from another? | 6 | the cycle's | A judging the browser remembers names its program by its number, so the judging of a deleted program stands beside no other program. | Ocena zapamiętana przez przeglądarkę nazywa swój program jego numerem, więc ocena usuniętego programu nie stanie przy żadnym innym. |
| D-401 (changed) — How does an account with the privilege pull the programs of its previous save? | 7 | the cycle's | The reader takes an item of a document of version 9 or above only with exactly `id`, `name`, `program` and the content revision, and of an earlier version only with exactly the first three; each pulled program starts at the content revision 0, the item's own neither read nor checked. | Czytnik bierze pozycję dokumentu w wersji 9 lub wyższej tylko z kluczami dokładnie `id`, `name`, `program` i rewizją treści, a wcześniejszej wersji tylko z trzema pierwszymi; każdy wciągnięty program zaczyna od rewizji treści 0, a rewizji z pozycji nikt nie czyta ani nie sprawdza. |
| D-206 (changed) — What happens to a saved game state of another version? | 8 | the cycle's | The judgings the browser remembers are no part of the saved game state, so a discarded save takes none along and the game started anew shows none of the discarded game's judgings. | Oceny zapamiętane w przeglądarce nie są częścią zapisu gry, więc odrzucony zapis żadnej nie zabiera, a gra zaczęta od nowa nie pokazuje ocen odrzuconej gry. |
| previous-save-programs-reader (changed invariant) | 9 | the cycle's | The reader skips an item that is not exactly `id`, `name`, `program` and the content revision in a document of version 9 or above, or not exactly `id`, `name` and `program` in an earlier one. | Czytnik pomija pozycję, która w dokumencie wersji 9 lub wyższej nie ma dokładnie kluczy `id`, `name`, `program` i rewizji treści, a we wcześniejszej — dokładnie `id`, `name` i `program`. |
| judging-cache-reading (new invariant; *Method* test, *Part* browser-view, *Derives from* D-441) | 10 | the cycle's | A value read from the browser's lasting storage gives a judging only in the form the cache writes, under a key of its own version naming the account and the game the cache was opened for, and no value or storage exception throws out of the cache. | Wartość odczytana z trwałej pamięci przeglądarki daje ocenę tylko w formie, którą pamięć ocen sama zapisuje, pod kluczem jej wersji z kontem i grą, dla których ją otwarto, a żadna wartość ani wyjątek pamięci nie wychodzi z niej jako błąd. |
| content revision (new glossary term) | 12 | the cycle's | The content revision is the count a program of the player's list carries, kept by the game state and never by the server, unlike the revision the server gives an accepted save (D-209). | Rewizja treści to licznik, który niesie program z listy gracza, trzymany w stanie gry, a nie na serwerze — w odróżnieniu od rewizji, którą serwer nadaje przyjętemu zapisowi (D-209). |
| D-287 (changed: a sentence added) — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended? | 13 | the cycle's | Wherever the sentence under the inactive buttons of a character stands, its words „Wróć do niego i je zakończ, żeby wysłać postać.” are a link to the screen of that manual map run, `#/postac/{n}/przejscie`. | Wszędzie, gdzie pod nieaktywnymi przyciskami postaci stoi zdanie o niezakończonym przejściu, jego część „Wróć do niego i je zakończ, żeby wysłać postać.” jest odnośnikiem do ekranu tego przejścia ręcznego, `#/postac/{n}/przejscie`. |

### Judgements the plan left to this step

- **The content revision: an entry of its own, D-442**, in the section „Programs: ownership, names and the copy”. Not a sentence of D-165: D-165 answers how one program is told from another, the revision how one content of a program is told from an earlier one, a part that can change on its own (the template's „Changing a decision”: a part that can change on its own is a question of its own). Not a sentence of D-441: D-386 and D-401 name it as a field of the saved program, apart from any judging. It is named apart from the revision of a save in its binding sentence („The content revision is no revision of a save (D-209)”) and in the glossary.
- **Glossary.** `content revision` takes an entry: after this change the bare word „revision” stands in the foundation for the server's counter of a save (D-209, D-402: „revision 0”), and the qualified term carries the other meaning; *Not* reads `none` (the term never carried another meaning in the files). The moment the game was made takes **no entry**: the phrase reads in its plain meaning, no file uses it in a second meaning, and D-04 and D-441 give its rules; „save time” got its entry for a second meaning („moment of saving”) that this phrase does not have.
- **D-402 and D-209 not changed.** Neither names the keys of a previous save's item (Decisions 11.1 asks the change only where they do). The sentence that a game started anew or built after a refused save shows no judging of the game before stands once, in D-441 (paragraph 3, and its key naming the game by its moment); writing it into D-402 and D-209 too would answer one question in two entries, which the template's „Changing a decision” (WAY-19) moves into the newer one. D-206 gets the sentence because the human's remark names it („Fundament (nowa decyzja o ocenie, D-206 i decyzje o zapisie) mówi, gdzie oceny leżą”).
- **D-287's link.** The human's remark 3 names „zdanie „Wróć do niego i je zakończ” (albo jego część)”; the entry binds the second Polish sentence of the text whole, „Wróć do niego i je zakończ, żeby wysłać postać.”, as the link. Slice 11 builds that; a narrower link (part of it) would need the entry changed.
- **D-441 and D-211, D-07, D-117.** No entry forbids the cache (spec Decision 1, confirmed by both spec reviews). D-441 states the boundary as a binding sentence without weakening D-211 — „The unsaved game state stays out of the browser's lasting storage as D-211 gives, and the remembered judgings stay there after „Wyloguj”, holding … no email address, no name and nothing the game loads.” — and its first paragraph says „nothing of a remembered judging enters the game state, which is whole without it”. Its *Rationale* says why D-211 does not bind it (no game state, nothing goes back into it, a judging made again gives it anew; the price D-211's *Rejected* names, a new path of code and a decision about the browser's storage, is paid here), that D-07's server still holds the whole save, and that D-117 binds the API client only. No `narrows` relation: the decisions do not collide.
- **D-441 *Based on*.** The spec gives no source; the decision rests on the browser's lasting storage outliving the session and refusing a write at its quota, so I read and cite the HTML Standard, Web storage (https://html.spec.whatwg.org/multipage/webstorage.html), § 12.1 and § 12.2.1, read 2026-11-21, in place of a `TODO` or a `none` the source would not support.
- **D-440 tests clause** is rewritten to what the tests of the slices are to hold (spec Decision 10): the record with the content revision and the generation, a change back to the content judged, a deleted program's judging; „through a save and a load, and a saved game state holding a cause, another kind or other than twelve results refused” goes, since no saved game state holds a judging. The clause is not read by the script.

### For the human (put before the human at the merge)

- **The *Rejected* of D-441 and D-442.** The decisions template gives an entry marked `the cycle's` the *Rejected* `unknown` unless a statement of the human names the ways weighed. The human's remark 1 names two of the ways in D-441's *Rejected* (the judgings in the saved game state; the shortened judging in the save with the least recently used removed). The others — in D-441 one value per game, both forms, a key naming the account alone, a random token in place of the moment, clearing at „Wyloguj”; in D-442 the fingerprint of the content, the revision as a real moment, the view's hooks — are the ways the reviewed spec weighed (Decisions 2, 3, 4, 8), which the plan orders into *Rationale* and *Rejected*. I wrote them from the spec, since `unknown` („nobody knows what was weighed”) would be false where the spec records them; the request should say so.
- **The counter's limit** stands in D-442 *Rationale* („Accepted with it …”) and in D-441 *Rationale*, naming exactly the two open paths of spec Decisions 11.2: a page closed while its save failed (D-208) and a save refused at „Wyloguj” (D-97); D-441 claims to close only the refused-save page path and the drop of values above the loaded game's own revision or generation (Decisions 11.3).

## Added pairs of examples, word for word

Each pair below is kept only until a test of this change holds the sentence (the decisions `SKILL.md`, *Verification* of a later slice), except where marked.

**D-441** (the invariant `judging-cache-reading` holds the reading; the pair is for the rest):

```
  - complies: a judging made, the page reloaded and the badge of that character, program and map
    standing again with no judging made; a program saved with other rules and then with the rules it
    had, showing no mark until it is judged; a game made by „Zacznij od zera” showing no mark the
    game before it had; a browser that refuses `localStorage` showing a judging until the page is
    reloaded, with no sentence; a game built after a refused save showing no mark this browser had
    for it; the judgings of the account kept after „Wyloguj” and shown at the next sign-in
  - violates: a judging written into the game state or the saved game state; a key naming the
    account by its email address; a judging of one account or of one game shown in another; an
    exception of `localStorage` reaching the handling of D-323; the judgings cleared at „Wyloguj”;
    a function of the simulation reading or writing the browser's storage
```

**D-442**:

```
  - complies: the threshold of a rule changed and saved, raising the program's content revision from
    3 to 4; that program renamed and staying at 4; two of its rule groups swapped and saved, raising
    it to 5; a copy saved as a new program, and a program pulled from a previous save whose item
    held 7, starting at 0
  - violates: a rename raising the content revision; a save that swaps two rules leaving it as it
    was; a program pulled from a previous save keeping the content revision its item held; the
    content revision raised at every save, whatever changed; the server raising it at an accepted
    save
```

**D-206** (new pair, „An agent compares a change with the part no invariant and no test holds:”):

```
  - complies: a saved game state of version 8 discarded, the new game made at another moment and
    showing no badge beside „Program:” though the browser holds judgings of the discarded game
  - violates: the judgings of the discarded game shown beside the same character, program and map
    numbers of the new game
```

**D-287** (added to its existing pair; the intro now reads „For what Siedziba and the screen Postać keep active, and for the link in the sentence under the buttons, an agent compares a change with the part no test holds:”):

```
complies (added): ; while a map run of
    character 2 on „Las — głębiej” waits, „Wróć do niego i je zakończ, żeby wysłać postać.” under
    the buttons of every character on the card of Las leading to `#/postac/2/przejscie`
violates (added): ; that sentence standing as plain text
    under the buttons of a character, or its link leading to the screen Postać of the character of
    its row
```

**D-04** (added to its existing *complies*, which no test holds):

```
; the screen Mapy drawing the mark beside „Program:” from
    a judging the browser keeps in its lasting storage, read under the account's identifier and the
    moment the game state names its game by; the page passing the clock's reading to the function
    that makes a new game
```

## Quotations of decisions in tests

Kept word for word (as the plan's note lists): D-04 („The game is written in TypeScript”), D-206 (its three sentences; the new one is a paragraph of its own), D-209 and D-402 (unchanged), D-386 (its sentences; the moment and the content revision are a paragraph of their own), D-165 („Each program of the player carries a number …”, „Each record of the game state that names a program …”), D-287 (both sentences; the link is a third sentence), D-440's second paragraph, its sentence „A judging, the one „Puść w pętlę” runs included (D-243), replaces …” and its third paragraph's sentence (the new sentence follows it), D-401's first sentence, the start of its second up to „from 1 up to the game's current one”, and its third.

Changed, as the plan foresaw, and reported by the check (each owned by the slice the plan names; no other file):

- D-440's first sentence: `tests/sim/judging-record.test.mjs:187`, `:794` (Slice 4); `tests/sim/saved-game.test.mjs:2595` (Slice 2); `tests/sim/saved-game-judgings.test.mjs:111`, `:124`, `:257`, `:304` (Slice 9, removing the file).
- D-165's sentence on the remembered judging: `tests/sim/saved-game-judgings.test.mjs:170` (Slice 9).
- D-401's sentence on the keys: `tests/sim/previous-programs.test.mjs:134`, `:334`, `:382`; `tests/view/previous-save.test.mjs:485` (Slice 3).

The new wording each quotation follows:

- D-440: „The game remembers the last judging of each character, program and map in the browser that made it, as D-441 gives: the twelve results of its seeds — solved, a death or undecided — and the equipment it took from what the chest held, while the cause and the game minute of a line stand only in the result shown after the judging (D-329).”
- D-165: „A judging the browser remembers for a character, a program and a map (D-441) names its program by that number too, so the judging of a deleted program stands beside no other program.”
- D-401: „… the list of programs of its game and the items of that list, takes an item only when its keys are exactly `id`, `name`, `program` and the content revision (D-442) in a document of version 9 or above, or exactly `id`, `name` and `program` in one of an earlier version, and its name is not empty after trimming, accepts the program of an item only through the check the program editor uses, skips every other item and goes on, and throws for no value a document can hold.” and the new paragraph „Each program appended starts at the content revision 0, and the content revision an item holds, like its `id`, is neither read nor checked.”

## The changed invariant against its tests (`invariants/skill/write.md`, step 4.2)

- At `{fork-point}` (as on the base head): „The reader of the programs of a previous save reads from a document only its version, the list of programs of its game and the items of that list, accepts each program only through the check of the program editor, skips an item that is not exactly the keys `id`, `name` and `program`, and throws for no value a document can hold.”
- Now: „… skips an item that is not exactly the keys `id`, `name`, `program` and the content revision in a document of version 9 or above, or exactly the keys `id`, `name` and `program` in a document of an earlier version, and throws for no value a document can hold.”
- Citing tests: `tests/sim/previous-programs.test.mjs`, the cases at lines 264, 284, 306, 332, 359, 380, 494, 505, 551, 614, 686, 699, 733 and 747 (`invariant: previous-save-programs-reader`). Against the new wording: the cases on the keys of an item (`:265` „an item with a key besides id, name and program is skipped and named, and the others go on”, `:285`, `:307`) and every case whose document is of the current version 9 with three-key items no longer state the rule for version 9 — they must split by version and give version-9 items the content revision (Slice 3, which owns the file; the spec's Decision 10 lists the cases); `:506` „the id of an item is neither used nor checked” extends to the content revision; `:700` and the trust-boundary cases (`:528`–`:751`) stay true. No file outside the plan's slices needs to follow.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` before any edit — exit 0, „0 errors”.
- The same after the edits and before the commit (twice, the second after a wording fix of D-04) — exit 1, 12 errors, all „the quotation stands in no binding sentence” of D-440, D-165 and D-401 at exactly the test lines listed above, the passages the plan's note says change and the named slices make follow. No limit of words or sentences, field, link, number or term error. Nothing else of the foundation was broken by these entries.
- No full gate run (the handoff's boundary).

## What follows from the entries (step 4.4)

- `foundations/part_map.md`: the cache's module under *Trust boundary* of `browser-view` — Slice 5, through `the-way-update-part-map`.
- `guidelines/testing.md`, „Trust boundaries”: the row of `src/browser/sim/previous-programs.ts` (Slice 3) and the row of the cache's module with `judging-cache-reading` and D-441 (Slice 5).
- `judging-cache-reading` reads `test` with no citing test until Slice 5 writes `tests/view/judging-cache.test.mjs` and sees it fail once (WAY-321).
- The tests clauses of D-441 and D-442, and the pairs above, to be turned into tests clauses where the slices' `decision:` lines hold the sentences (the return step).

## Reaches

- `foundations/decisions.md`: the section list and the entries D-04, D-07, D-117, D-165, D-203–D-212, D-386, D-399–D-403, D-439, D-440, D-287 read whole; D-22, D-190, D-243, D-329 read in the lines that name a judging or a save; a grep of the whole log for „remember”, „judgings”, „lasting storage”, `localStorage`, `sessionStorage`, IndexedDB, `przejscie`, „Wróć do przejścia”.
- `foundations/invariants.md`: the list of identifiers; `previous-save-programs-reader`, `simulation-isolation`, `simulation-inputs`, `player-save-isolation`, `expired-session-unsaved-progress`, `account-save-sqlite-store`, `saved-state-http-exchange`, `save-version`, `uncaught-failure-game-state`, `cross-part-imports`, `page-address-fragment`, `balance-instrument-repeatability` and the withdrawn list.
- `foundations/glossary.md` whole; the-way's glossary at the pinned commit, its terms (for „entry”, which D-441 avoids by „value”).
- Tests: every `decision:` line quoting D-04, D-07, D-117, D-165, D-206, D-209, D-211, D-287, D-386, D-401, D-402, D-439, D-440 (by grep, distinct quotations compared); the test names and `invariant:` lines of `tests/sim/previous-programs.test.mjs`.
- Web: https://html.spec.whatwg.org/multipage/webstorage.html, read 2026-11-21 for D-441's *Based on* (the page was read through a fetch that returns quotations; § 12.2.3 on the `SecurityError` of a refused storage was given in part only and is not cited).
- `.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md`, `spec-review-report.md`, `spec-review-2-report.md` whole.

## Unread material

- `foundations/decisions.md` outside the entries named under *Reaches*; `foundations/part_map.md` (its row is Slice 5's); `foundations/environment_facts.md` beyond the grep for the browser's storage, which found nothing.
- The example entries of the-way (`WAY-03` and the invariant and glossary examples) read only in their first lines through a search; the product's own entries served as the examples of form.
- `plan.md`, `cycle.md`, `request.md` and the other record files not named in the handoff: not opened. The „four ways of the description” of the human's remark 1 stand in the request, which I did not read, so D-441's *Rejected* does not name them beyond the two the remark itself states.
- `reports/slice-06-measure-output.txt` (the spec's 107.6–167.0 %): not named in the handoff and not read, so D-441's *Rationale* gives no number for the size of the judgings.

## Searches not found or unclear

- No entry of the foundation forbids the game to keep data other than the unsaved game state in the browser's lasting storage (grep of `foundations/*.md`, `guidelines/*.md`, `src/browser/AGENTS.md` for `localStorage`, `sessionStorage`, IndexedDB, „lasting storage”; positive control: D-211's and D-117's lines were found). The fallback of remark 1 is not owed.
- No glossary entry „revision” in the product's or the-way's glossary.
- D-209 and D-402: no sentence naming the keys of a previous save's item (read whole).

## Working copies

- `.runs/foundation-2/` held the section index of the decision log and three outputs of the foundation check; removed with `rm -rf` on that full path before returning. Nothing kept in `reports/`: the final check output is quoted above. The fetch of the HTML Standard made no file.
