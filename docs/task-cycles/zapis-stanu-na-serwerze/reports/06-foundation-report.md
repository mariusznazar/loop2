# Report — Foundation entries, task `zapis-stanu-na-serwerze`

- **Status:** done with concerns (the concerns are findings for the orchestrator below, none a
  question for the human)
- **Stage:** the plan's *Foundation entries*, rows 1–30 and 32–34 (row 31 after H2 and row 35 in
  Slice 1 not written, as the handoff gives)
- **Commit:** `fb1ef9d` docs: :memo: record the saved game state on the server in the foundation
  (on `task/zapis-stanu-na-serwerze`, parent `dce2970`, author address the private author address)

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 434 | 50 |
| `foundations/invariants.md` | 57 | 7 |
| `foundations/environment_facts.md` | 12 | 0 |
| `foundations/part_map.md` | 1 | 1 |

(504 insertions, 58 deletions in all, `git show --stat fb1ef9d`.)

## Entries written, with one sentence of meaning in the task document's language (WAY-114)

| Plan row | Entry | Znaczenie |
|---|---|---|
| 1 | D-07, changed (Scope: account-server, browser-view, simulation) | Serwer trzyma konta i zapis stanu gry każdego gracza i nie liczy nic z gry; całą grę liczy przeglądarka i wysyła zapis na serwer — porównanie numeru wersji przez serwer mieści się w tym (przykład „complies”). |
| 2 | D-179 — Who can create and use a player account? (new) | Każdy zakłada konto i gra bez zatwierdzenia; zalogowany gracz odczytuje i zmienia tylko własny zapis; właściciel może zablokować konto. |
| 3 | D-180 — What happens to unsaved progress when a session expires? (new) | Po wygaśnięciu sesji przeglądarka zachowuje niezapisany stan, a po zalogowaniu na to samo konto gra ponawia jego zapis. |
| 4 | D-181 — How does the browser exchange saved game states with the server? (new) | Przeglądarka pobiera i wysyła cały zapis JSON-em przez `fetch()` po HTTPS: `GET /api/saved-game` oddaje zapis z wersją i numerem rewizji albo „brak zapisu” (sukcesem, nie 404), `PUT /api/saved-game` niesie wersję, rewizję, którą przeglądarka widziała, i grę. |
| 5 | D-182 — Where are player accounts and saved game states stored? (new) | Konta i pełne zapisy stanu gry leżą w pliku bazy SQLite na trwałym dysku poza wymienialną warstwą kontenera. |
| 6 | D-183 — What happens to a saved game state of another version? (new) | Zapis niesie numer wersji kształtu; gra wczytuje w całości tylko zapis bieżącej wersji, a zapis innej wersji albo z archetypem spoza danych odrzuca w całości, razem z programami, i zaczyna od nowa. |
| 7 | D-184 — When does the game save the game state on the server? (new) | Gra zapisuje sama: po każdej zmianie stanu przez gracza, po domknięciu i śmierci, co 30 s realnych w biegnącym przejściu i jeszcze raz przy ukryciu albo zamknięciu karty (bez gwarancji); rytm i ukrycie wysyłają tylko zmieniony stan, w locie najwyżej jedno żądanie z `keepalive`, a treść ponad 64 KiB nie wychodzi i liczy się jako za duża. |
| 8 | D-185 — What does the player see of saving the game state? (new) | Udany zapis nic nie pokazuje; nieudany — zdanie „Nie udało się zapisać postępu. Gra spróbuje ponownie.” w wierszu nagłówka nad wierszem D-157 i ponowienia po 5, 10, 20 s, potem co 30 s; za duży — zdanie o za dużym stanie, bez ponawiania tego samego zapisu, próba przy następnej chwili zapisu. |
| 9 | D-186 — Which browser's save of the game state does the server accept? (new) | Serwer nadaje każdemu przyjętemu zapisowi rewizję o jeden wyższą i przyjmuje tylko zapis oparty na rewizji, którą trzyma (0 — brak zapisu); przegrana przeglądarka porzuca swój stan, wczytuje zapis serwera (trwające przejście na pauzie), pokazuje zdanie i gra dalej, zapisując jak zwykle. |
| 10 | D-187 — What does the server do with a save of the game state of a lower version than the one it holds? (new) | Serwer odrzuca zapis o wersji niższej niż trzymana, sprawdzając to przed rewizją i nie czytając gry; stara karta pokazuje „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać. |
| 11 | D-188 — What does the player see when a save of the game state finds no session? (new) | Gdy serwer odpowie na zapis, że sesji nie ma (wygasła albo konto zablokowano), gra znika, wracają formularze ze zdaniem „Sesja wygasła…”, a niezapisany stan zostaje tylko w pamięci strony; po zalogowaniu na to samo konto gra go wysyła i wraca od niego, na inne konto — przepada. |
| 12 | D-97, changed | „Wyloguj” najpierw zapisuje stan („Wylogowywanie…”), potem kończy sesję; przy braku połączenia albo błędzie serwera nie wylogowuje i pokazuje ostrzeżenie; przy odmowie konfliktu albo za dużego zapisu wylogowuje; przy niższej wersji wylogowuje ze zdaniem o aktualizacji nad formularzami; przy braku sesji — jak D-188. |
| 13 | D-96, changed (projected landing merged with row 7) | Po zalogowaniu i przeładowaniu gracz trafia do siedziby albo do ręcznego przejścia z zapisu (trwające na pauzie, zakończone na ekranie po końcu); gra powstaje dopiero po odpowiedzi serwera o zapisie, nigdy nowa przy niepewnej odpowiedzi; odrzucony zapis daje nową grę z jednorazowym zdaniem o innej wersji albo o uszkodzeniu. |
| 14 | D-189 — How does a manual map run come back from a loaded saved game state? (new); D-53's rationale gains „when the saved game state holds no manual map run” | Wczytane trwające przejście wraca w minucie zapisu, na pauzie, z tempem zapisu, a zakończone — na ekranie po końcu; czas między zapisem a wczytaniem go nie przesuwa, także doliczanie nieobecności. |
| 15 | D-104, changed | Trasa zapisu przyjmuje treść do 64 KiB, pozostałe do 16 KiB, a serwer przechowuje najwyżej 64 KiB zapisu na gracza. |
| 16 | D-04, changed | Widok zmienia stan gry tylko funkcjami symulacji, którym podaje wybory gracza, upływ czasu i zapis pobrany z serwera; drugie zdanie mówi teraz o funkcjach, które przesuwają czas gry, więc `newGame`, `send` i wczytanie już od niego nie odbiegają. |
| 17 | D-109, changed | Ważna sesja sama uprawnia też do odczytu i zastąpienia zapisu własnego konta; obie trasy zapisu bez ważnej sesji dostają JSON 401, a żadne pole żądania zapisu nie wskazuje konta. |
| 18 | D-112, changed | Schemat w wersji 4 z tabelą zapisów (klucz i klucz obcy konta, wersja kształtu, rewizja, tekst gry do 65 536 bajtów); przejście bazy zachowuje konta, sesje, odnośniki i zapisy; zapis czyta blokadę, wersję i rewizję w tej samej transakcji; blokada zostawia zapis. |
| 19 | D-156, changed (projected wording) | Wynik potwierdzenia adresu stoi u zalogowanego nad grą, na jakimkolwiek ekranie się ona otwiera. |
| 20 | D-190 — Which file is the exemplar for saved-game code? (new) | Wzorcem rodzaju `saved-game` jest `src/browser/sim/saved-game.ts`; kod tego rodzaju zamienia stan gry na dokument bieżącej wersji, a nieznaną wartość z serwera — na stan gry albo odmowę z powodem, wewnątrz symulacji, bez rzucania wyjątku i bez zmiany argumentów. |
| 21 | invariant `player-save-isolation` (new; Part account-server; Derives from D-109 · D-179; Method test) | Zalogowany gracz odczytuje i zmienia tylko zapis własnego konta. |
| 22 | invariant `expired-session-unsaved-progress` (new; Part browser-view; Derives from D-180 · D-188; Method test) | Wygasła sesja zostawia niezapisany postęp w przeglądarce, a gra ponawia jego zapis dopiero po zalogowaniu na to samo konto. |
| 23 | invariant `account-save-sqlite-store` (new; Part account-server; Derives from D-182; Method test) | Serwer trwale trzyma konta i pełne zapisy stanu gry w bazie SQLite. |
| 24 | invariant `saved-state-http-exchange` (new; Part browser-view; Derives from D-181; Method test) | Przeglądarka pobiera i wysyła zapisy jako JSON przez `fetch()`. |
| 25 | invariant `save-version` (new; Part simulation; Derives from D-183; Method test) | Gra nie wczytuje nic z zapisu innej wersji niż bieżąca wersja kształtu. |
| 26 | invariant `account-mutation-request-guards`, changed | Każda trasa zmieniająca stan, z `PUT /api/saved-game`, odrzuca złe `Origin` i treść nie-JSON, skompresowaną, o złej strukturze albo ponad limit trasy z D-104. |
| 27 | invariant `account-schema-lifecycle`, changed | Przejście schematu zachowuje konta, sesje i zapisy stanu gry. |
| 28 | invariant `account-database-schema`, changed | Jak wyżej, z wartościami. |
| 29 | invariant `account-session-authorization`, changed | `GET /api/saved-game` i `PUT /api/saved-game` bez ważnej sesji dostają JSON 401. |
| 30 | invariant `blocked-account-access`, sentence unchanged; Derives from gains D-179 | Zablokowane konto nie loguje się i nie korzysta z żądań wymagających zalogowania — teraz także z tras zapisu (test rozszerza Slice 3). |
| 32 | fact `fetch-keepalive-body-quota` (new) | Fetch Standard zwraca błąd sieci dla żądania `keepalive`, gdy jego treść z treściami żądań `keepalive` w locie tej samej grupy przekracza 64 KiB. |
| 33 | fact `visibilitychange-hidden-last-event` (new) | Przejście strony w stan `hidden` (zmiana karty, zamknięcie, zminimalizowanie, przejście do innej aplikacji) to ostatnie zdarzenie, które strona niezawodnie widzi. |
| 34 | part map, `account-server`'s sentence | Część odpowiada za trwałe przechowywanie kont, sesji i zapisu stanu gry każdego gracza. |

Followed from the entries (step 4.4 and the search of step 2), in the same commit:

- `player-self-registration` *Derives from* D-96 · D-179, `blocked-account-access` D-137 · D-139 ·
  D-179 — D-179's *Verification* names both (WAY-17).
- `account-save-durable-storage` *Derives from* `D-17 · D-182`, replacing the quoted projected
  source, since D-182 now carries it; its *Violated: yes* stays for row 31 after H2.
- D-134's rationale loses „Accepted with it: a reload of the page starts a new game, and the mark
  goes with it.”, which this change makes untrue (binding sentences unchanged).

No row of *Settlements to record* was found already stated by a current entry, so no row is tied to
an existing entry instead of a new one.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (after the commit,
  and before it). An intermediate run after the decisions alone gave exit 1 with 9 errors, all the
  invariants and facts the new decisions named before they were written.
- Base: `.runs/…/reports/gate-base-dce2970.log` records `0 errors`, exit 0, so no error is
  inherited.
- Not run: `npm test` (the handoff and `make-change` give it to the cycle). No test was written: a
  foundation entry takes none; the invariant tests come in Slices 1–6 and 8 as the plan gives.

## Own-work check (section 3)

- Requirement most likely unmet: projected entries written "whole as the readiness gate approved
  it" (WAY-126). Check: a script compared, whitespace collapsed, the first paragraph under each
  projected heading of `definicja_mvp_loop2.md` (sha256 `fda97782458d…`, the approved one) with the
  log's binding paragraph. Result: D-07, D-179, D-180, D-182, D-183, D-156 equal; D-181 starts with
  the projected paragraph (the routes follow, plan row 4); D-96 equals the projection up to its
  third sentence, which carries row 7 merged into the projected one (To do 13).
- Second: every passage of the two facts stands word for word in its source with markup dropped —
  checked by a script on the downloaded `fetch.bs` (whatwg/fetch `e9460d1b22ead1c6a72eeac37fb2ec0dc01aeb1d`)
  and MDN `index.md` (mdn/content `9a0e5c1cfa8d5079e22c410de757707706f1cc75`): all four passages
  found.

## Reaches beyond the dispatch

- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`, § Projected
  foundation changes — for the full projected entries (*Based on*, *Rationale*, *Rejected*,
  *Verification* examples), which the task quotes only by their binding sentences.
- Decisions read beyond the handoff's list, as the search of step 2 found them: D-05, D-21, D-51,
  D-56, D-62, D-129, D-132, D-134, D-138, D-139, D-152–D-157, D-162, D-164, D-165; invariants
  `minute-span-split`, `account-save-sqlite-access`, `player-server-session`, `account-session-storage`.
- Precedent commits `f545afe` and `7ed5cc0` (how earlier cycles wrote new invariants whose tests a
  slice writes) and the-way's WAY-172 and WAY-216 (for row 20).
- The two sources of rows 32–33, downloaded to the session's scratchpad to check the passages.

## Searches not found or unclear

- `foundations/decisions.md` holds no list of withdrawn numbers; D-179 is the next free number after
  D-178.
- The spec gives the MDN commit only as `9a0e5c1cfa8d`; its full hash was read from the GitHub API
  (`9a0e5c1cfa8d5079e22c410de757707706f1cc75`, committed 2026-10-26).
- Unclear: the invariants template says "An invariant whose test is not written yet reads `review`
  (WAY-61)", while the plan names each new invariant's check as a test of a later slice and earlier
  cycles (`f545afe`, `7ed5cc0`) wrote such invariants `Method: test` in the foundation step. Written
  `test`, as precedent; see the first finding.

## Choices, with the way rejected and its cost if wrong

1. **New invariants (rows 21–25) written `Method: test`** before their tests exist. Rejected:
   `review`, turned to `test` by each slice. Cost if wrong: until Slices 1–4 and 6 land, the branch
   holds five `test` invariants no test cites; a reviewer may flag it. Each slice that writes the
   test must not leave it unwritten.
2. **D-179 *Relations* `derives from D-07`.** The projection reads `TODO — narrows the projected
   decision "How is the work of the game split…"`; `TODO` is no word that field takes, and D-179
   goes against nothing in D-07 (D-07's rationale itself says account isolation prevents changing
   another player's save), so "narrows" would claim a precedence where nothing collides. Rejected:
   `narrows D-07`. Cost if wrong: one word of *Relations*.
3. **D-179's first and third sentences kept beside D-96's „Anyone can create an account without
   operator approval…” and D-137's blocking**, rather than moved under WAY-19's "the sentence moves
   to the new decision": both D-96's wording and D-179's were approved whole at the gate, and the
   sentences agree. Rejected: removing the sentence from D-96. Cost if wrong: one rule stated in two
   decisions, to be changed in both.
4. **The projected fields *Review when*, *Approved by* and *Change* dropped**, as the template has
   none and precedent (D-138, D-152) dropped them. Cost: the review triggers of D-07, D-179, D-181,
   D-182 and D-183 (for example "a release that changes the saved-game shape … after players other
   than the game's author have saved game states") stand only in the definition.
5. **D-189's *Rejected* takes ways B and C of question 8, D of question 15 and B of question 23**;
   ways A and C of question 15 are where to record the answer, not other answers, so they stay out
   (they would tell how the decision was reached, WAY-29). Cost if wrong: two ways of a source not
   kept in the log.
6. **Row 20 is written without a question to the human.** WAY-172 asks the human's approval for a new
   meaning of guidelines in the task document; To do 12, which the human accepted, names the file as
   the exemplar of a new kind and lets its guideline draw the boundary with `simulation-module`.
   D-190's second sentence holds only what To do 11 and 12, D-04 and D-183 already carry (state or
   refusal, inside the simulation, arguments unchanged). Rejected: `blocked` with the question. Cost
   if wrong: the code of Slice 1 is built before the human sees the decision. For the orchestrator:
   the rule spec decision 2 gives Slice 7's guideline — "the pinned document of the test is
   rewritten only together with a raised version" — is a mechanism of D-183's "version number of its
   shape", not written into D-190; I read it as a use of a meaning D-183 carries, so not a question
   for the human either.
7. **D-112 keeps "every account, session, emailed link and saved game state"** on the move (spec,
   Foundation entries), while `account-schema-lifecycle` and `account-database-schema` gain only
   saved game states (plan rows 27–28) and still name no emailed links, as before this change.
   Cost: the decision says more than the two invariants, as it did for links already.
8. **Mechanisms of the spec written into binding sentences** where the plan row names the spec
   decision as a source: the revision counter from 1 with 0 for none (D-186), the version checked
   before the basis (D-187), one request in flight with `keepalive` and no body over 64 KiB sent
   (D-184), the retry after 5, 10, 20 s then every 30 s and the line above D-157 (D-185), the routes
   (D-181), the table and the transaction (D-112). Cost if wrong: a slice that implements otherwise
   has to change the decision.
9. **Facts named by D-184 alone** (`Based on`), the decision holding the hiding moment and the
   `keepalive` rule; not by D-104, whose 64 KiB the human chose for size (question 9). Cost if wrong:
   a change of the quota is not found from D-104.

## Problems observed

- The tests that cite `account-database-schema`, `account-schema-lifecycle`,
  `account-mutation-request-guards`, `account-session-authorization` and `blocked-account-access`
  (`tests/account-storage.test.mjs`, `tests/transport.test.mjs`, `tests/http.test.mjs`,
  `tests/startup.test.mjs`, `tests/deploy/test_account_storage.py`) check the wording at
  `{fork-point}` and not yet the saved game states and save routes the new wording adds; Slices 2
  and 3 extend them as the plan gives. Checked by reading the citations (`git grep "invariant: …"`),
  not by running them.
- A first attempt to write the new decisions through a Bash heredoc failed in the shell
  (`unexpected EOF`) and wrote nothing (`git status` clean apart from the earlier edits); the text
  went through a file written with the editor instead.

## Questions

None.
