# Report — the foundation entries of `karty-i-katalog-map`

**Status:** done with concerns (no question for the human; the concerns are listed below).

## Commits

One commit on `task/karty-i-katalog-map`, on top of `58d4849`: see `git log -1` (hash given in the return message). It changes only `foundations/decisions.md` (+255 −119 lines, before the second pass of review). No invariant, glossary term, environment fact or part-map entry was written: the search found none needed (the glossary's „headquarters" stays true; `content-identifiers` already forbids the view to name a map by its identifier; every file the change adds falls under parts the map already gives to `browser-view` and `simulation`).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — before my edits: exit 0, `0 errors`; after all edits: exit 0, `0 errors`.
- No other check ran (no code, no test).

## Identifiers and where they stand in `foundations/decisions.md` (heading line – last line of the entry, after my commit)

New entries (the next free number was D-325; the log has no withdrawn numbers):

| Entry | Lines | Heading |
|---|---|---|
| D-325 | 7057–7070 | What does the screen Mapy show? |
| D-326 | 7072–7085 | What does the game say before an earning loop that earns nothing? |
| D-327 | 7087–7100 | What does the card of a map hold? (Settlement 1) |
| D-328 | 7102–7115 | Does the card of a map show what the player has not discovered? (Settlement 2) |
| D-329 | 7117–7130 | What stands at each character in the section „Kto idzie”, and in what order? (Settlement 3) |
| D-330 | 7132–7145 | What is the first of the three clicks from Siedziba to the first map run? (Settlement 4) |
| D-331 | 7147–7160 | What does the screen Mapy show before a map is picked, and how does a row of the list look? (Settlement 5) |
| D-332 | 7162–7175 | What does {map} name in `#/mapy/{map}`? (Settlement 6) |

Existing entries changed (identifiers unchanged): D-53 1074–1094 · D-55 1115–1134 · D-133 2525–2545 · D-134 2547–2564 · D-149 2802–2815 (heading now „When does the game offer a map opened by another map?") · D-165 3034–3047 · D-170 3114–3127 · D-171 3129–3142 · D-180 3288–3301 · D-188 3394–3405 · D-217 4037–4048 · D-243 4837–4863 · D-244 4865–4882 · D-251 5077–5098 (heading now „How does the card of a map mark a rehearsal the loop cannot repeat?") · D-274 5745–5782 (heading now „What does a main button look like, and which buttons have it?") · D-280 5916–5962 · D-281 5964–5998 · D-282 6000–6024 · D-287 6110–6136 (heading now with „the screen Mapy"). D-03 39–50 is unchanged.

## Entries: meaning in English and in Polish

Marks: `row n` = a row of *Settlements to record*; `projected` = a projected entry of the definition; `the cycle's` = an entry the task's own *Decisions in play* sections carry from the human's answers (questions 3–6, 12), no row and no projected entry carrying it whole.

- **D-327** (`row 1`, with one clause `the cycle's`, see concern 1) — EN: the card of a map follows the card of the old Loop with numbers from the map's data, a part the map lacks absent, five named departures, and „usual step" meaning the step most maps give. PL: karta mapy idzie za kartą starego Loop z liczbami z danych mapy, części, której mapa nie ma, nie ma wcale, pięć odejść jest wymienionych, a „krok zwykły" to krok, jaki daje większość map.
- **D-328** (`row 2`) — EN: the card shows all of the map's data whatever the player discovered, and the Understanding does not change by it. PL: karta pokazuje wszystko z danych mapy, bez względu na to, co gracz odkrył, a Zrozumienie się przez to nie zmienia.
- **D-329** (`row 3`) — EN: the order of the lines at each character in „Kto idzie", „Wejdzie: …" always, „Wejdź" opens the map run screen, „Puść w pętlę" leaves the player on the card, the sentence of an empty team. PL: kolejność wierszy przy postaci w „Kto idzie", „Wejdzie: …" zawsze, „Wejdź" otwiera ekran przejścia, „Puść w pętlę" zostawia gracza na karcie, zdanie przy pustej drużynie.
- **D-330** (`row 4`) — EN: the first click is „Mapy" on the menu bar and no button at a character in Siedziba leads to the screen Mapy. PL: pierwszym kliknięciem jest „Mapy" w pasku menu, a przy postaci w Siedzibie nie ma przycisku prowadzącego na ekran Mapy.
- **D-331** (`row 5`) — EN: under `#/mapy` before a pick „Wybierz mapę z listy." stands on the right, and a row of the list is a link with „rozwiązana", picked as a program on the list of programs. PL: pod `#/mapy` przed wyborem po prawej stoi „Wybierz mapę z listy.", a wiersz listy to odnośnik z „rozwiązana", wybrany jak program na liście programów.
- **D-332** (`row 6`) — EN: `{map}` in `#/mapy/{map}` is the map's identifier in the game's data as it stands. PL: `{map}` w `#/mapy/{map}` to identyfikator mapy z danych gry, taki jak jest.
- **D-325** (`projected`) — EN: the screen Mapy holds the list of open maps on the left, the card of the picked map on the right with its parts, and the section „Kto idzie". PL: ekran Mapy ma po lewej listę otwartych map, po prawej kartę wybranej mapy z jej częściami i sekcję „Kto idzie".
- **D-326** (`projected`) — EN: with an empty „Wynieś" list „Pętla nic nie zarobi do skrzynki" stands in `warning` beside „Puść w pętlę" and the button still acts. PL: przy pustej liście „Wynieś" obok „Puść w pętlę" stoi „Pętla nic nie zarobi do skrzynki" w `warning`, a przycisk dalej działa.
- **D-53** (`projected`) — EN: the player sends a character from the card of a map on the screen Mapy; „Zakończ" still returns to the screen Postać. PL: gracz wysyła postać z karty mapy na ekranie Mapy; „Zakończ" wraca na ekran Postać.
- **D-134** (`projected`) — EN: from the first completion the list and the card show the map as „rozwiązana" in `positive`. PL: od pierwszego ukończenia lista i karta pokazują mapę jako „rozwiązana" w `positive`.
- **D-149** (`projected`) — EN: a map whose opener is unsolved is absent from the screen Mapy, and appears with its card from the opener's first completion; the simulation refuses a send alike. PL: mapy, której mapa otwierająca jest nierozwiązana, nie ma na ekranie Mapy, a od pierwszego ukończenia otwierającej stoi tam z kartą; symulacja odmawia wysłania tak samo.
- **D-165** (`projected`) — EN: „the program picked for a character" replaces „the program picked on a character's row of the headquarters". PL: „program wybrany dla postaci" zamiast „programu wybranego w wierszu postaci w Siedzibie".
- **D-170** (`projected`) — EN: the list „Program:" stands at the character in „Kto idzie", the order of which program stands first unchanged. PL: lista „Program:" stoi przy postaci w „Kto idzie", a kolejność, który program stoi pierwszy, bez zmiany.
- **D-180** (`projected`) — EN: the card of a map shows what of the trip plan enters (added as a third sentence, so „Each position" keeps its antecedent). PL: karta mapy pokazuje, co z planu wyprawy wejdzie.
- **D-188** (`projected`) — EN: the line of a clipped plan stands at a character on the card of a map, and on the screen of a map run beside „Restart". PL: wiersz przyciętego planu stoi przy postaci na karcie mapy i na ekranie przejścia obok „Restart".
- **D-243** (`projected`) — EN: „Puść w pętlę" stands at each character in „Kto idzie" of a solved map beside „Wejdź". PL: „Puść w pętlę" stoi przy każdej postaci w „Kto idzie" mapy rozwiązanej obok „Wejdź".
- **D-251** (`projected`) — EN: the rehearsal mark stands under „Wejdź" at the character in „Kto idzie". PL: znak próby stoi pod „Wejdź" przy postaci w „Kto idzie".
- **D-280** (`projected`, the part the code makes true) — EN: the screen Mapy and the item „Mapy" (between Siedziba and Programy, marked under each address of Mapy), and the sentence of three clicks; Wiedza left to task 22. PL: ekran Mapy i pozycja „Mapy" w pasku (między Siedzibą a Programami, znaczona pod każdym adresem Map) oraz zdanie o trzech kliknięciach; Wiedzę zostawiam zadaniu 22.
- **D-281** (`projected`, the part the code makes true) — EN: `#/mapy` and `#/mapy/{map}` join the addresses; the address of a map off the list falls under „any other Siedziba"; `{map}` points to D-332. PL: do adresów dochodzą `#/mapy` i `#/mapy/{map}`; adres mapy spoza listy podpada pod „any other Siedziba"; `{map}` odsyła do D-332.
- **D-282** (`projected`, the part the code makes true) — EN: the binding sentence already says it; I added to *Verification* the list and the card of Mapy as areas of their own and Siedziba in React under „Drużyna". PL: zdanie wiążące już to mówi; dopisałem do *Verification* listę i kartę Map jako osobne obszary oraz Siedzibę w React z nagłówkiem „Drużyna".
- **D-133** (`projected`, the part the code makes true) — EN: the card of each open map shows the sentence of its solving condition (the status-row half is left to task 14). PL: karta każdej otwartej mapy pokazuje zdanie jej warunku rozwiązania (część o wierszu stanu zostaje zadaniu 14).
- **D-03** (`projected`, unchanged) — EN: the projected wording equals the present one, so I tied it and wrote no change. PL: projektowane brzmienie równa się obecnemu, więc powiązałem i nie zmieniałem wpisu.
- **D-287** (`the cycle's`) — EN: the screen Mapy beside Siedziba and Postać, „Wejdź" in place of „Wyślij", and the unfinished-run sentence under the inactive buttons of each character in „Kto idzie". PL: ekran Mapy obok Siedziby i Postaci, „Wejdź" zamiast „Wyślij" i zdanie o niezakończonym przejściu pod nieaktywnymi przyciskami każdej postaci w „Kto idzie".
- **D-274** (`the cycle's`) — EN: „Wejdź" at each character in „Kto idzie" has the main look though it sends no form, „Puść w pętlę" stays plain; new heading, example and a *Rejected* way. PL: „Wejdź" przy każdej postaci w „Kto idzie" ma główny wygląd mimo że nie wysyła formularza, „Puść w pętlę" zostaje zwykły; nowy nagłówek, przykład i odrzucona droga.
- **D-217** (`the cycle's`) — EN: the resurrection line also stands at the character in „Kto idzie". PL: wiersz wskrzeszenia stoi też przy postaci w „Kto idzie".
- **D-244** (`the cycle's`) — EN: the loop line with „Zatrzymaj" also stands at the character in „Kto idzie". PL: wiersz pętli z „Zatrzymaj" stoi też przy postaci w „Kto idzie".
- **D-55** (`the cycle's`) — EN: the example of *Verification* moved to „Wejdź" in „Kto idzie", naming the state after the end of a map run. PL: przykład z *Verification* przeniesiony na „Wejdź" w „Kto idzie", z nazwanym stanem po końcu przejścia.
- **D-171** (`the cycle's`) — EN: the example of *Verification* moved to the list „Program:" at the character in „Kto idzie". PL: przykład z *Verification* przeniesiony na listę „Program:" przy postaci w „Kto idzie".

## Ties and weighings (WAY-33, WAY-134)

- No row was found already stated by an existing entry, so every row became an entry. Row 6 was weighed against a tie to D-281 (which names `{n}` by meaning): I kept D-332 apart because the row has its own *Rejected* (two ways) and its own question, and D-281 now points to it by identifier. If the orchestrator prefers the tie, D-332 folds into D-281's third sentence and D-281 gains the two *Rejected* ways; no other entry depends on the number.
- Row 4 stands apart from D-280's sentence of three clicks (which I kept in the projected wording: „the choice of a map, the map's row and „Wejdź""); D-330 says the first of them is the item „Mapy". The two read together without conflict, but D-280's phrase alone does not name the item.
- D-03: tied, no change (as the handoff says). D-282: tied to the present sentence; only *Verification* examples added.

## Reaches beyond this handoff

- `.the-way/elements/decisions/skill/*.md`, `template.md`, `examples.md` (WAY-03 read), `elements/common/rules.md`, `way_of_working.md`, `projected_mode.md` — required by the skill.
- `a private note in the author's vault` and `git.md` — the user's global instructions require them before writing a rule and before a commit.
- `plan.md` (*Coverage*, *Choices*, *Orchestrator's notes*), `cycle.md` — to see what the slices expect of the entries and to confirm the plan's Choice C2.
- `foundations/part_map.md`, `glossary.md`, `invariants.md` (`content-identifiers`) — the search of the whole foundation.
- `src/browser/sim/data/maps.ts` (grep only) — to confirm the identifiers `forest` and `forestDeep` used in D-332 and D-281 examples.

## Searches not found or unclear

1. The projected entries' own fields not quoted by the task: I did not read the private definition, so *Scope*, *Rationale* and *Rejected* of D-325 and D-326 rest on the fragments the task quotes or on the task's own text. D-325: *Rationale* and *Rejected* are the one quoted each. **D-326 *Rejected* is `unknown`** (nothing quoted); *Rationale* is from the task's *Need* (the veteran report). If the definition holds a *Rejected* for D-326 or longer fields for D-325, the request should carry them.
2. D-149: the definition's *Rationale* clause „the end of the map run that opens a map names the way to it" is not written, because the task says it runs ahead of the game until task 16; the *Rationale* says instead that the player finds the next map on the list.
3. In D-53, D-134, D-133, D-170, D-188, D-243, D-274, D-287 I reworded *Rationale* or *Rejected* only to move the place („headquarters" → card of a map / screen Mapy; „Wyślij" → „Wejdź") and, in D-274, to add the two costs the task's answer to question 6 states; I added no new reason.
4. Stale words left on purpose, for the return step or task 25: D-189 still says „the list of maps marks it as not predicting the earning loop" (the mark is now on the card of a map, D-251); D-169 *Rationale* („the select lists of the program panel and of the headquarters") and D-265 *Verification* („a new section of the headquarters built in DOM") — as the handoff says. D-245 and D-246 are untouched (task 25 writes them).
5. The hash of the commit is not in this file (written before the commit).

## Concerns

1. **The meaning of „usual step" in D-327** (third binding sentence: „the step most maps' data give, the first of the data's order on a tie") is the plan's Choice C2, given by the orchestrator's note, not a sentence of the accepted row 1. It makes a binding of a choice the human has not seen; the request should put that sentence before the human as `the cycle's`.
2. D-327's *Verification* numbers (83 and 33 minutes, „≈ 11 z 16", „≈ 280 min") are the task's, copied unchanged; I did not recompute them (no code).
3. D-327's first sentence is long by necessity (the row lists six parts of the card with their contents); the template allows three sentences and the entry holds three.
