# Foundation step — ekrany-i-menu

- **Status:** done with concerns
- **Stage:** the foundation step of the plan's *Foundation entries* (no product code, no test, no guideline file)
- **Worktree / branch:** `C:\Storage\repos\loop2-wt\ekrany-i-menu`, `task/ekrany-i-menu`
- **Commits:** `20d804b..f694d86` (9 commits, all `mariusznn@gmail.com`; nothing pushed; no uncommitted tracked change)
- **Files changed:** `foundations/decisions.md` (+307 −136), `foundations/glossary.md` (+1 −2)

## Commits

| Commit | Entries |
|---|---|
| d6d3e07 | glossary `headquarters` |
| a3ec192 | D-96, D-225 |
| 5d5075f | D-44, D-97, D-157, D-208, D-275 |
| 50ea549 | D-199, D-200, D-207, D-217, D-244, D-245, D-246 |
| 95a3fea | D-53, D-62, D-132, D-173, D-212 |
| 5020b76 | D-166, D-196 |
| 4ba1483 | D-280, D-281, D-282 (new) |
| 8e458d4 | D-283, D-284 (new); also trims the *Origin* of D-281 and D-282 to the sources that hold reasoning |
| f694d86 | D-285, D-286, D-287 (new) |

## Rows of the plan's table

| Row | Identifier | Commit | Znaczenie (pl) |
|---|---|---|---|
| E1 | D-283 (new) | 8e458d4 | Wyjście z ekranu ręcznego przejścia zatrzymuje je tak, jak „Pauza”, a pętle chodzą dalej. |
| E2 | D-96 (changed, projected whole) | a3ec192 | Po zalogowaniu formularzem i przy odświeżeniu bez fragmentu gra prowadzi do Siedziby albo do przejścia z zapisu, odświeżenie pod adresem zostaje na jego ekranie, a po odnośniku z maila strona otwiera Siedzibę; zdanie o błędzie kodu przy wczytywaniu zostaje. |
| E3 | D-97 (changed, projected whole) | 5d5075f | „Wyloguj” stoi w menu „Konto”, a zasady wylogowania zostają. |
| E4 | D-157 (changed, projected whole) | 5d5075f | Sprawa niepotwierdzonego adresu z „Wyślij ponownie” i zdaniem o wyniku wysyłania stoi w menu „Konto”, a nie w wierszu nagłówka. |
| E5 | D-199 (changed, projected whole; heading now „…the screen Postać…”) | 50ea549 | Umiejętności z „Kup” pokazuje ekran Postać, bez zmian w treści. |
| E6 | D-200 (changed, projected whole) | 50ea549 | Stopnie kupuje się na ekranie Postać, a skończone ręczne przejście liczy się jak trwające do „Restart” albo „Zakończ”. |
| E7 | D-208 (changed, projected whole) | 5d5075f | Komunikat o nieudanym zapisie stoi w wierszu pod paskiem menu i pokazuje się tylko przy kłopocie. |
| E8 | D-212 (changed, projected whole) | 95a3fea | Przejście z zapisu wraca jak dotąd, a ekran, na którym strona się otwiera, daje D-96. |
| E9 | D-217 (changed, projected whole; heading now „What does the game show…”) | 50ea549 | Wiersz wskrzeszenia stoi na karcie i na ekranie postaci i mówi wprost, że to czas realny. |
| E10 | D-244 (changed, projected whole) | 50ea549 | Wiersz pętli z „Zatrzymaj” stoi na karcie i na ekranie postaci, a podglądu pętli nadal nie ma. |
| E11 | glossary `headquarters` (projected whole) | d6d3e07 | Siedziba to jeden z ekranów gry, a nie cała gra poza przejściem. |
| E12 | D-280 (new, part) | 4ba1483 | Gra ma ekrany Siedziba, Postać, Programy i Przejście o jednej szerokości pod jednym paskiem z nazwą gry, Siedzibą, Programami i „Konto”, a poza ekranem trwającego albo skończonego przejścia w pasku stoi „Wróć do przejścia”. |
| E13 | D-281 (new, part) | 4ba1483 | Ekrany mają adresy po `#`, adres przejścia niesie numer postaci, ekran przejścia dostaje przejście jako parametr, a adres bez istniejącego ekranu po cichu otwiera najbliższy. |
| E14 | D-282 (new, part) | 4ba1483 | Każda kolumna ekranu jest osobnym obszarem, a drużyna w Siedzibie jest sekcją z nagłówkiem. |
| E15 | D-44 (part) | 5d5075f | Przycisk „Wyślij ponownie” czeka jako „Wysyłanie…”, już bez wzmianki o nagłówku. |
| E16 | D-53 (part) | 95a3fea | Postać dalej rusza z Siedziby, a „Zakończ” prowadzi na ekran Postać tej postaci. |
| E17 | D-166 (part) | 5020b76 | Programy mają własny ekran z listą po lewej i pokazują zawsze zapisany program, a na ekranie przejścia lista prowadzi do kopii i zapisanych programów. |
| E18 | D-245 (part) | 50ea549 | Wiersz zatrzymanej pętli stoi na karcie i na ekranie postaci zamiast w jej wierszu. |
| E19 | D-246 (part) | 50ea549 | Gracz wracający do ręcznego przejścia czyta raport z nieobecności po wejściu na Siedzibę. |
| E20 | D-03 — tied, no change | — | Widok jest budowany w React, a ekrany to komponenty `.tsx` rysujące ze stanu gry (bez zmian; pasek, Postać i lista programów to urzeczywistniają). |
| E21 | D-196 (correction) | 5020b76 | Edytor Programów poza przejściem nie dodaje gałęzi, a w przejściu, także czekającym i skończonym do „Restart” albo „Zakończ”, oba edytory idą za postacią z przejścia. |
| E22 | D-207 (correction) | 50ea549 | Przykład zapisu po „Kup” mówi teraz o ekranie Postać. |
| E23 | D-225 (correction) | a3ec192 | „Anuluj” formularza „Ustaw nowe hasło” otwiera zalogowanemu graczowi Siedzibę, a niezalogowanemu formularze konta. |
| E24 | D-275 (correction) | 5d5075f | Przykład „Wyloguj” jako zwykłego przycisku mówi teraz o menu „Konto”. |
| E25 | D-287 (new) | f694d86 | Gdy ręczne przejście czeka albo się skończyło, Siedziba i Postać pozwalają na to, na co pozwala symulacja, a przy nieaktywnych „Wyślij”, „Puść w pętlę” i „Kup” stoją zdania o niezakończonym przejściu. |
| E26 | D-280 | 4ba1483 | Pozycja menu czyta się „Wróć do przejścia · {mapa} · minuta {m}”, z minutą gry jak w wierszu stanu. |
| E27 | D-280 | 4ba1483 | Imię na karcie postaci prowadzi na ekran Postać, gdzie pasek znaczy Siedzibę, a na ekranie przejścia pasek nie znaczy niczego. |
| E28 | D-280 | 4ba1483 | Pozycje paska menu nie mają ikon. |
| E29 | D-280 | 4ba1483 | Nazwa gry stoi po lewej na pasku, a na ekranach oczekiwania stoi sama. |
| E30 | D-285 (new) | f694d86 | Menu „Konto” otwiera się kliknięciem i klawiaturą, zamyka Escape, kliknięciem obok i drugim kliknięciem, a fokus wraca na „Konto”. |
| E31 | D-285 | f694d86 | Menu „Konto” stoi otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka, i po odpowiedzi, aż gracz je zamknie. |
| E32 | D-280 | 4ba1483 | Treść ekranów ma najwyżej 1344 px szerokości, a w węższym oknie całą szerokość. |
| E33 | D-286 (new) | f694d86 | Zdanie strony nad grą stoi nad pierwszym ekranem i znika przy pierwszej zmianie ekranu. |
| E34 | D-196 (with E21) | 5020b76 | W edytorze Programów przejście czekające i skończone liczy się jak trwające, więc oferta idzie za postacią z przejścia. |
| E35 | D-284 (new) | 8e458d4 | Powrót na ekran przejścia go nie wznawia; przejście czeka w pauzie na „Wznów”. |
| E36 | D-62 (part, minimal) | 95a3fea | „Zakończ” po śmierci prowadzi na ekran, który daje D-53. |
| E37 | D-132 (Verification only) | 95a3fea | Przykład po rozwiązaniu mówi, że „Zakończ” wraca na ekran Postać tej postaci. |
| E38 | D-173 (Verification only) | 95a3fea | Przykład „Zakończ” z niezapisanymi zmianami mówi o powrocie na ekran Postać tej postaci. |
| E39 | none written | — | Słowo „card” nie dostaje wpisu w słowniku: karta logowania, karta postaci i karta mapy to jedno znaczenie, które czytelnik interfejsów nadaje temu słowu. |

### The exact words of E36–E38 (the orchestrator's ruling)

- **D-62**, binding sentence: changed „„Zakończ”, which returns to the screen from which the player sends the character" to „„Zakończ”, which returns to the screen D-53 gives" (the projected wording of that clause). *Rationale*: changed „„Zakończ” leads to the screen from which the player sends the character, whatever that screen becomes." to „„Zakończ” leads to the screen D-53 gives, whatever that screen becomes.", since it says the same untrue thing. Left as they stand: everything else, including „After a character's death the screen stays on the state…”, „Restart”, the pace buttons, *Relations* `none`, the *Verification* examples and *Rejected*; the projected „the end of the map run takes the right area” stays for task 16.
- **D-132**, *Verification* complies: changed „and „Zakończ” returns to the headquarters" to „and „Zakończ” returns to the screen Postać of that character". Left: the binding sentences, the violating example „the game going back to the headquarters with a message the moment the map run completes”, *Rationale*, *Rejected*.
- **D-173**, *Verification* complies: changed „„Zakończ” with unsaved changes returning to the headquarters at once" to „„Zakończ” with unsaved changes returning to the screen Postać of that character at once". Left: everything else, the binding „„Zakończ” ends the map run at once…” included (the dialog stays for task 12).
- D-62 and D-53 do not collide once D-62 names D-53; no precedence needed.

## Choices made, with the way rejected and its cost if wrong

1. **Settlement rows folded into D-280** (rows 2, 3, 4, 6, 9 with E12): they give values or ways of moving that E12's own question carries („one content width”, „„Wróć do przejścia” with the map and the map run's clock”, „how does the player move between them”). Rejected: one decision per row — five small entries answering one question. Cost if wrong: a later task splits D-280; references to D-280 stay valid for the part they mean.
2. **D-280 states that on the screen of a map run the bar marks no item** — the task's reading of D-277 under *Decisions in play*, not a row; written because Slice 1 and Slice 4 build on it. Cost if wrong: one clause to drop.
3. **E35 as its own decision D-284**, not a sentence of D-283: D-283 is projected whole as approved (with *Rejected:* `none considered`), and the return is a new rule beside it (template, "Changing a decision"). Rejected: one entry — its *Rejected* would mix `none considered` with the way of question 10.
4. **Rows 7 and 8 as one decision D-285** (how the menu „Konto” opens, closes and stays open). Rejected: two entries for one control.
5. **D-281 *Based on* `uri-fragment-in-requests`** where the projected entry reads `none`: the rationale („the server hands out files, so a screen reached by the fragment survives a refresh”) rests on RFC 9110 keeping the fragment out of the request, which that existing environment fact holds, and the plan asked to record such a source. No new environment fact was needed. Cost if wrong: the field goes back to `none`.
6. **D-166 part reads „and beside it the program editor”** where the projected text reads „in the middle”: this task builds two columns (To do item 5: „a obok dzisiejszy panel programu”), so „in the middle” is not yet true; task 5 writes the whole.
7. **D-281 adds „{n} being the number of a character (D-56) or of a program (D-165)”** from To do item 2; no new meaning.
8. **D-245 part keeps „with its text in the role `danger`”**: the projected D-245 drops it with task 5's change of D-44; this task writes only „card and screen” in place of "row".
9. **D-246 part writes „on reaching Siedziba”** (projected words) while the rest of the entry still says „of the headquarters”; the same screen under its two names.
10. ***Origin*** of the projected entries whose *Origin* was `TODO`: kept as in the foundation and extended with the definition's projected entry and, where the task's questions hold reasoning, with `ekrany_i_menu_loop2.md` questions. Explicit projected *Origin* (D-97, D-280–D-283) kept as written, D-280 and D-281 extended with the task questions their settlements come from.
11. ***Verification*** of projected entries marked `TODO` (D-96, D-157, D-166, D-196, D-199, D-200, D-208, D-212, D-244, D-280–D-287): settled by keeping the current examples that stay true, adapting those the change makes untrue, and adding examples taken from the task's own words; written on my recommendation under the delegation. No invariant derives from the new decisions.
12. **Ways not chosen of the form „Bez decyzji — cykl wybierze sam”** (questions 1, 5, 11 point 1, 15) left out of every *Rejected*: they are no way of the product's behaviour. Cost if wrong: one clause per entry.
13. **E39 judged without an entry:** the uses of "card" in tracked files are the login card (D-27, D-96, D-261, D-262, D-265, D-268, D-273, D-276, D-278…), and now a character's card (D-217, D-244, D-245, D-280); one definition („a framed block of a screen that holds one subject”) is true of both, and it is the meaning a reader of interfaces gives the word, so the template's "Which words take an entry" gives none. No new meaning settled.

## Concerns

1. **Projected *Rationale* and *Rejected* written word for word lose content of the current entries.** As foundation_step.md and the handoff ask, D-96, D-157, D-199, D-200, D-208 and D-217 carry the approved projected *Rationale* and *Rejected* whole. These approved texts are shorter than the current ones and drop sentences that are still true, for example in D-96 „repeating the password helps detect a registration typo…”, „The form a password-reset link opens stands before anyone knows who is signed in, because the link alone authorizes it (D-109)…” and the costs beside „a third form…”, „the headquarters after signing in…”, „discarding a saved game state without a word”, and the whole way „the sentence of another version for a damaged saved game state too”; in D-208 the costs of every rejected way and „the limit holding at most about 12 earning loops on Las…”; in D-217 „it can read „0 min””. `git diff 20d804b..f694d86 -- foundations/decisions.md` shows each. Recommendation: accept as approved, or restore the dropped clauses in a correction the human approves; I did not merge them myself, since that would change the approved text.
2. **D-173 against Slice 10.** D-173's binding sentence „after „Zakończ” the program panel shows the program the copy belongs to” stays (ruling). Slice 10 says „`#/programy` shows the first program of the list”, and the panel leaves Siedziba, so after „Zakończ” the only program panel the player reaches may show another program. Recommendation: the orchestrator checks Slice 10 against D-173 (and D-93's counts „after „Zakończ” beside the rules of the program the copy belongs to”) before Slice 10 runs.
3. **Uses of „headquarters” in its old meaning outside the foundation** (WAY-97 asks the author of the changed definition to rewrite them in the same change; my stage writes no code, test or skill): `src/browser/sim/skills.ts:145` („Refuses purchases outside headquarters”), `src/browser/sim/types.ts:398` („null = the headquarters”), `tests/sim/body.test.mjs:272` („„Zakończ” after death leads to the headquarters (D-53, D-62)”, now untrue), `tests/sim/saved-game.test.mjs:2244`, `:2267`, `:2283`, `:2322` (state names „the headquarters after „Zakończ””), `tests/sim/skills.test.mjs` (`headquarters()` helper), `tests/sim/repertoire.test.mjs:374`, `tests/invariants/test_program_closed_lists.py:9,28,33,216,223`, `tests/invariants/test_program_world_reference.py:17,39,250`, `tests/view/clock.test.mjs:314`, and `.claude/skills/loop2-deploy/references/setup_and_secrets.md:329-334` with its copy `.agents/skills/loop2-deploy/references/setup_and_secrets.md:329-334` („the header shows the logout”, „Reload: the headquarters appears straight away…”, untrue after D-96 and D-97). In the foundation no use reads false under the new definition; D-04's rationale („real time passing at the headquarters”, „an idle headquarters”) and D-149's rationale („on returning to headquarters”) stay true read as Siedziba and were left. Recommendation: route the code, test and skill uses to the slices that touch those files, or to a slice of the orchestrator's choosing.
4. **D-218** says „The headquarters shows „pokolenie {n}”…”; To do item 4 has the screen Postać show it too. D-218 stays true (Siedziba keeps the label), so I wrote nothing; Slice 5 draws the label on Postać by the same rule. Recommendation: none needed now; a later task may widen D-218 as D-217 was widened.
5. **No critique by a fresh agent** of the set (way_of_working "Critique before collective review"): `make-change` forbids dispatching a subagent; the review of the change covers it.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` after the glossary edit | 0 (`0 errors`) |
| the same after D-96, D-225 | 0 |
| the same after D-44, D-97, D-157, D-208, D-275 | 0 |
| the same after D-199, D-200, D-207, D-217, D-244, D-245, D-246 | 0 |
| the same after D-53, D-62, D-132, D-173, D-212 | 0 |
| the same after D-166, D-196 | 0 |
| the same after D-280–D-282 | 0 |
| the same after D-283, D-284 | 0 |
| the same after D-285–D-287, and once more at the head f694d86 | 0 |
| `git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` = `f45ca40724251a46965aed69f733d0a35c430048` | match |
| `sha256sum` of the task copy and of the vault task | both `ebb78ed12f587c20` |
| `git log --format='%h %ae'` | every commit `mariusznn@gmail.com` |

Not run: `npm test` and the product's gate (the orchestrator's run, per the handoff). No test was written: a foundation entry has none.

Own-work check (make-change section 3): the requirement most likely missed was „take the projected entry whole as approved”; the check was a word-for-word comparison of each projected binding sentence written with the definition at `definicja_mvp2_loop2.md` lines 601, 796, 886, 901, 916, 931, 961, 976, 1218 and 1445 (D-212 had „on its screen” where the projected text reads „with its screen”, fixed in 95a3fea before commit). It showed the binding sentences identical, save the deliberate parts listed above.

## Reaches beyond the handoff

- `foundations/decisions.md`: D-04, D-21, D-51, D-55, D-122 (start), D-131, D-156, D-164, D-165, D-167, D-168, D-169, D-171, D-172, D-174, D-218, D-219, D-224, D-243, D-250, D-261, D-262, D-276, D-277, D-278, D-279, D-43 — for the step-2 search (links, collisions, uses of „headquarters”, „header”, „card”).
- `foundations/environment_facts.md` `uri-fragment-in-requests` — for D-281's *Based on*.
- `foundations/invariants.md` searched for UI phrases („Zakończ”, „Wyloguj”, panel, header, Siedziba, screen): no invariant touched.
- `.the-way/foundations/glossary.md` headings — the words of the process to keep qualified („part”, „step”, „element”, „entry”).
- `.the-way/foundations/decisions.md` WAY-03 — the decision element's example.
- `git grep -i -w headquarters` and `card` over the tracked files — the glossary skill's list of uses.

## Questions

none

## Searches not found or unclear

- The definition's file hash (`sha256` prefix `efc19197`) differs from „odcisk 9641f804”; the fingerprint is the one the definition's gate line records (`definicja_mvp2_loop2.md:1504`, „Definition fingerprint: 9641f804”), which matches. Not a mismatch, but the handoff's wording reads like a file hash.
- The task gives no role (`text-secondary` or other) for the two sentences of D-287; the entry names none.
- The task does not say where the menu „Konto” opens (below „Konto” or elsewhere); D-285 names no place.
- „Wyślij ponownie” in the kitchen-sink page and „header row” wording in `guidelines/styleguide-browser-view.md` are Slice 1's and Slice 7's, not looked at here.
