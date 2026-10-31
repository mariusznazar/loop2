# Report — the agent of *Foundation entries*, task kopia-bazy

**Status:** `done with concerns`. All 22 rows are written, nothing is blocked, and no row changes meaning. The concerns are listed under *Concerns for the orchestrator*; none needs an answer before Slice 1.

## Files and commits

| Commit | Message | File | Added | Removed |
|---|---|---|---|---|
| `6c35ed9` | docs: :memo: record the facts of SQLite's backup, pusher and age that the database backup rests on | `foundations/environment_facts.md` | 20 | 2 |
| `15ee86f` | docs: :memo: record the decisions and invariants of the database backup, the violated mark of account-save-backup included | `foundations/decisions.md` | 265 | 8 |
| | | `foundations/invariants.md` | 41 | 1 |
| `b7dd37d` | docs: :memo: name the backup command, the release check, the backup script, the restore trial, Strych and pusher in the part map | `foundations/part_map.md` | 7 | 4 |

Branch `task/kopia-bazy`, head `b7dd37d`, not pushed. Commit address, from `git log -1 --format='%ae'` after the first commit: the private repository's address.

## Entries, rows and meanings

| Row | Final identifier | Lines at `b7dd37d` | Znaczenie |
|---|---|---|---|
| E1 | D-214 | `foundations/decisions.md:3892-3917` | Spójna, ukończona kopia bazy kont i zapisów leży poza serwerem gry, żeby po jego utracie odzyskać dane do ostatniej zachowanej kopii; miejscem jest Strych, jeśli pomieści kopie i da się z nich odtworzyć bazę, a inaczej inne urządzenie. |
| E2 | D-215 | `foundations/decisions.md:3918-3940` | Serwer korzysta z SQLite przez wbudowany `node:sqlite`, a wydanie Node.js trafia na serwer dopiero po sprawdzeniu na nim odczytu, zapisu i tworzenia kopii bazy. |
| E3 | D-216 | `foundations/decisions.md:3941-3977` | Kopia powstaje raz na dobę, nocą, zostaje ich 7 w siedmiu stałych plikach dni tygodnia, ostatnia ma najwyżej dobę, kopię zastępuje tylko zainstalowany przez człowieka harmonogram albo ręczne uruchomienie przez człowieka, a nic nie kasuje plików ani nie czyta listy plików Strychu. |
| E4 | D-217 | `foundations/decisions.md:3978-4024` | O 03:17 harmonogram na serwerze uruchamia ręcznie zainstalowany skrypt poza kontenerem, który robi kopię krótkim poleceniem w kontenerze `loop2`, odbiera ją przez `docker exec` i sam ją wysyła; kopia dzieli blokadę z wdrożeniem, a wdrożenie tylko ostrzega o rozjeździe skryptu i harmonogramu. |
| E5 | D-218 | `foundations/decisions.md:4025-4061` | Kopia jest szyfrowana na serwerze gry narzędziem `age` z plikiem tożsamości użytym jako klucz symetryczny, jawna baza istnieje na hoście tylko w potoku, a kopia nie jest kompresowana. |
| E6 | D-219 | `foundations/decisions.md:4062-4098` | Przy nieudanej kopii skrypt woła raz `pusher` ze stałą treścią bez danych graczy; harmonogram, który nie ruszył, i leżący serwer zostają bez powiadomienia, tę lukę przeglądamy przed publicznym uruchomieniem kont, a dziennik nie trzyma danych graczy ani wartości dostępowych. |
| E7 | D-220 | `foundations/decisions.md:4099-4126` | Sprawdzone odtworzenie to jedna próba na komputerze właściciela przed scaleniem: pobranie, odszyfrowanie, uruchomienie tego samego commitu, logowanie kontem testowym, powrót zapisu i usunięcie kopii; nie obejmuje budowy nowego serwera, a odtworzenie na bazie serwera zostaje procedurą człowieka. |
| E8 | D-221 | `foundations/decisions.md:4127-4146` | Żaden test nie dotyka Strychu ani `pusher`: reakcje skryptu pokazują atrapy, które nie dowodzą doręczenia, a prawdziwy kontakt sprawdza człowiek, gdy zmienia się sposób rozmowy z tymi usługami. |
| E9 | D-13 | `foundations/decisions.md:273-288` | Klucz szyfrujący leży w `/etc/loop2/backup-encryption-key` (root, 0400), klucz do Strychu w `/backup_key`, oba mają kopię w prywatnej notatce i nie dostaje ich żaden kontener, login do Strychu nie stoi w repozytorium, a przy zmianie klucza szyfrującego stary zostaje w notatce, dopóki potrzebuje go jakaś kopia. |
| E10 | D-112 | `foundations/decisions.md:1985-1997` | Polecenie kopii otwiera krótkie połączenie z bazą obok połączenia serwera, na tych samych zasadach co polecenie blokady. |
| E11 | D-73 | `foundations/decisions.md:1386-1398` | Lista odstępstw od szablonu testów zyskuje D-221. |
| E12 | `account-save-backup` | `foundations/invariants.md:1038-1047` | Baza serwera kont i zapisów ma ukończoną, spójną kopię poza serwerem gry; wpis ma *Violated: yes*, bo zdanie jest dziś fałszywe, aż człowiek wykona H2 i H3. |
| E13 | `account-save-sqlite-upgrade` | `foundations/invariants.md:1048-1057` | Wdrożone wydanie Node.js przeszło sprawdzenie odczytu, zapisu i tworzenia kopii bazy. |
| E14 | `account-save-backup-encrypted` | `foundations/invariants.md:1058-1067` | Kopia bazy nie opuszcza serwera gry niezaszyfrowana. |
| E15 | `account-save-backup-failure-notice` | `foundations/invariants.md:1068-1077` | Każdy nieudany krok skryptu kopii — polecenie w kontenerze, także gdy kontener nie działa, szyfrowanie i wysyłka, która też zastępuje najstarszą kopię — kończy się wywołaniem `pusher`. |
| E16 | `account-save-sqlite-access` | `foundations/invariants.md:698-706` | Zdanie bez zmian; wpis wywodzi się teraz z D-215 zamiast z fragmentu definicji. |
| E17 | `node-sqlite-database` | `foundations/environment_facts.md:250-254` | Fakt zyskuje asynchroniczną funkcję `backup()`, jej liczbę stron w partii (domyślnie 100) i restart przy zmianach z innego połączenia. |
| E18 | `sqlite-online-backup` | `foundations/environment_facts.md:358-362` | Ukończona kopia Online Backup API jest spójną migawką, krok kopiuje do N stron, a zmiana z innego połączenia restartuje kopię, więc częste restarty mogą ją zatrzymać na zawsze. |
| E19 | `mikrus-pusher-mail` | `foundations/environment_facts.md:364-368` | Dokumentacja Mikrusa mówi, że `pusher` wysyła maila do samego użytkownika, czyta standardowe wejście, a pierwszy parametr to temat; nie podaje adresu ani limitów, a skrypt nie podaje `https`, więc wiadomość może iść bez szyfrowania. |
| E20 | `age-file-encryption` | `foundations/environment_facts.md:370-374` | `age` 1.0.0 pozwala użyć pliku tożsamości jako klucza symetrycznego przy jawnym `-e`, kończy się kodem 0 tylko dla całego wejścia, a jego pliki nie dają się niepostrzeżenie zmienić. |
| E21 | part map, *External context* | `foundations/part_map.md:174-175` | Mikrus Strych i usługa `pusher` są partnerami zewnętrznymi w obu kierunkach, a to, co od nich przychodzi, jest niezaufane. |
| E22 | part map, responsibilities | `foundations/part_map.md:62`, `:81`, `:137-139` | `account-server` zyskuje polecenie kopii i sprawdzenie wydania, `deployment` skrypt kopii z harmonogramem, a `build-tools` uruchamianie próby odtworzenia. |

Settlements rows, tied: 1 → D-216; 2 → D-217; 3 → D-112; 4 → D-218; 5 → `account-save-backup-encrypted`; 6 and 7 → D-13; 8 and 9 → D-219; 10 → `account-save-backup-failure-notice`; 11 → `mikrus-pusher-mail`; 12 → D-220. No row was already stated in the foundation, so none became a tie to an older entry.

The proposed identifiers of E14 and E15 stand, so the two test paths of Slice 3 stand. The facts take `sqlite-online-backup`, `mikrus-pusher-mail` and `age-file-encryption`.

## Changed entries beside their earlier wording

- **`account-save-sqlite-access`.** The sentence is unchanged. *Derives from* moves from the quoted definition passage to D-215. No test cites it. `tests/deploy/test_account_storage.py:21` names `account-save-durable-storage`, not this entry.
- **`node-sqlite-database`.** The sentence keeps everything it said and adds `backup()`, its batch and its restart. Named by D-112, D-114, D-215, `player-express-session-sqlite-store`, `account-save-sqlite-access`, `account-schema-lifecycle`, `account-database-schema` and `account-save-sqlite-upgrade`. Each was checked: the addition takes nothing away from them.
- **D-13, D-73, D-112.** Earlier wordings are in `git show 95de83b:foundations/decisions.md`. Followers checked: D-111 derives from D-13 and reads none of the changed clauses; D-114 and D-115 derive from D-112 and do not count its connections; the three invariants of D-112 say nothing of the number of connections; D-74 to D-79 and D-163 narrow D-73 and are untouched. `loop2-host-sharing` holds, as no new grant exists.

## Checks

| Command | Exit | Note |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at base, before any change | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` at head `b7dd37d` | 0 | `0 errors` |

**Not run:** `npm test`, as the handoff orders; the gate is the orchestrator's. No test was written in this stage. I read `tests/invariants/test_application_package_layout.py:23-48`, the one test I found reading `foundations/part_map.md` in a way the map's text could reach: it reads *Files* only, and no *Files* changed.

**Sources read raw, 2026-10-31,** with `curl`, each page turned to plain text by a small script. Every quoted passage was compared word for word with the download, whitespace collapsed: 33 of 34 matched by script, and the one miss, `The busy timeout in milliseconds.`, is an older passage whose raw text carries a reference link around two words, compared by eye. The five archived copies opened and hold the same passages; the two frozen GitHub addresses gave files identical to their tag's.

## Own-work check

- **Requirement most likely missed:** that the projected entries stand whole as approved. **Check:** a script compared the definition's lines 643–646, 662–669, 681–683, 687 and 694–701, and 1931–1932 and 1959–1960, with the log and the invariants file. **Result:** the binding sentences of E1, E2, E12 and E13 and the *Rationale*, *Rejected* and *Based on* of E2 are word for word; the *Rationale* and *Rejected* of E1 match once `copy` reads `backup` (see *Choices*).
- **Also checked by script:** no word `copy` in the new decisions other than the private copy of a key, a term D-13 already uses; no *should*, *will* or capitalized RFC 2119 keyword in them; each new decision has one to three binding sentences; no server name, login, port or address in the diff.

## Reaches beyond the dispatch

- `foundations/decisions.md`, the entries the part-map selection gave: D-01, D-05, D-08 to D-17, D-31, D-73 to D-85, D-89, D-103, D-111, D-112, D-114, D-137, D-163, D-205, D-209, because the element's step 1 selects them.
- rsync's manual at its 3.2.7 commit, because D-216 rests on rsync writing a temporary file beside the target and removing a partial file, a claim the spec makes with no source. The two passages stand quoted in D-216's *Based on*. Not on the handoff's list of pages; the spec's sentence held.
- `guidelines/testing.md:10` and `:56`, `.the-way/product-guidelines/testing/template.md:136`, to see what D-221 departs from.

## Searches not found or unclear

- **`backup` in the foundation.** A first search through `grep` in Git Bash returned nothing; the Grep tool, with a wider pattern, found the expected D-13, D-104 and D-112 lines, so the search stood and the first one was not relied on.
- **SQLite's page on one-step backup.** `https://www.sqlite.org/backup.html` § 3 says of copying all in one call: "This requires holding a read-lock on the source database file for the duration of the operation, preventing any other database user from writing to the database." Spec decision 1 rests on one step beside a writer. I judged this no contradiction and did not stop: the database runs in WAL mode, where `sqlite-wal-concurrency` says readers and a writer run at the same time, and the spec's measurement shows a separate writer committing through the step with no busy error. The page's sentence does not name WAL. If you read it otherwise, it is the fact for Slice 1's test to hold, which that slice's *Checks* already ask for.
- **`pusher`'s exit status.** The raw script ends in `curl -s` with no `-f`, and where `curl` is missing it prints a line and runs a bare `exit`, so it exits 0. An HTTP error or a missing `curl` therefore gives exit 0. Spec decision 8 says "A failing `pusher` is logged": that can only mean a failure `pusher` reports, such as no connection. Nothing rests on more; Slice 3 needs to know.
- **Whether a fact may hold two addresses for `pusher`.** The template allows several addresses only as pages of one edition. Row 11 is one row and its source names both the wiki page and the script that page points to. I kept one entry, treating them as one published document. A reviewer may read that otherwise.
- **The stale word of two older decisions.** D-104's *Rationale* and *Rejected* say "copy of the database" (`foundations/decisions.md`, lines near 1874). I left them: outside this list, and not the glossary's game term in context.
- **D-112's *Rejected*** still says "a copy of the database before a move — not provided". It stays true: nightly backups are not made before a schema move. Left unchanged.
- **The testing guideline** says seven departures at `guidelines/testing.md:10`, while D-73 now has eight, until Slice 7.
- **`age` version on the owner's computer.** The fact names 1.0.0, the server's candidate. `winget` gives some other release; the manual's compatibility line says later versions decrypt, but no source reads which release the owner gets.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| `copy` reads `backup` in E1's *Rationale*, *Rejected* and *Verification* (four places), under the handoff's word rule | Keeping them verbatim under "whole as approved" | The prose differs from the definition by one word; the meaning does not. The definition itself is untouched |
| E1's SQLite citation becomes the fact `sqlite-online-backup`, by identifier alone, as the template asks; E2 keeps its Node citation and adds `node-sqlite-database`, because the fact does not carry release-candidate status | Keeping both as approved with no identifier | `foundations` would not show that the decisions rest on those facts |
| E1's Strych citation is a word-for-word passage read 2026-10-31, as the handoff asks; the Docker and NCSC citations stay as approved, read 2026-10-04 | Re-reading those two as well | They stay in the older citation form, as in D-205 |
| The definition's *Review when* and *Approved by* are not written, and *Origin* names the full approved entry, as D-205 does: the log's template has no such fields | Adding fields the template lacks | E1's and E2's review conditions, the date 2027-04-04 included, live only in the definition |
| E2 gains a complying and a violating example naming the image-build step, carrying the spec's "realized by the image-build check" without touching what was approved | A sentence in *Rationale* or *Rejected* | One pair to read |
| *Method: test* for E13, E14 and E15 now, although the tests come in Slices 2 and 3, as the plan's *Choices* accept | `review` until each slice, which the template's "whose test is not written yet" reads | True for a few commits on the task branch; the check does not look. The slices must keep the identifiers |
| D-217 names D-10 in *Rationale* and adds no `narrows D-10`: no binding sentence of D-10 collides with it | A `narrows` relation | None; D-10 is unchanged, as the spec says |
| D-13 also places the Strych login, which the spec's *Constraints* call an access value, though its *Foundation entries* do not list that | Leaving the login unnamed | One clause; without it D-13 says nothing of where that value stands |
| D-13 keeps the old encryption key in the note until every backup made with it is replaced, because the general rotation sentence would otherwise destroy it. From spec decision 13 | Leaving it only to the skill | The binding sentence is longer |
| D-13's *Rejected* gains question 4's way B and question 9's way B, the sources of rows 6 and 7 | Only question 9's | One clause, shared with D-218 |
| D-216 says only the installed schedule or a human's hand run replaces a backup, from the handoff's answer on irreversible operations | Leaving it to D-12 | One clause |
| D-216's *Based on* quotes Strych's advice, and its *Rationale* gives the 25 MB limit and about 385 accounts of spec decision 5, not the 440 of question 1, which that decision corrects | Writing the 440 | A number differs from the task's question 1; the spec explains why |
| D-221's *Rejected* names the contract test the adopted template asks for, with the reason D-163 gives. The spec names no rejected way here, and the entry comes from no settlements row | `unknown` | A way the spec did not list, though the departure itself implies it |
| D-221's *Scope* is `deployment, build-tools`, the form of D-163 | Adding `agent-workflow` for the guideline | A later guideline change finds it by D-73 instead |
| One commit for decisions and invariants, since each names the other | Two commits, one of them failing the check | None |

## Concerns for the orchestrator

1. **No entry carries three things of the spec, and the lists gave them none:** decision 1's one-step `rate` and its rejected ways (`VACUUM INTO`, the default `rate`, `rate: -1`), decision 6's strict host-key check against its own file with its rejected ways, and decision 9's rejected ways for the release check. Once `.runs` is gone, a later agent changing `rate` or the host-key options finds no reason in the foundation. **Recommendation:** leave as planned for this request and name it in the request; the slices' tests hold the behaviour, and the ways stay in the task record. The other way is one more decision each, which the plan did not ask for.
2. **`account-save-backup` is set violated** and must be named under *What the foundation puts in front of the human at the merge*. Clearing it is a later commit outside this step.
3. **No critique ran.** The element's way of working asks one fresh agent to critique a set of proposals shown together, and my method forbids dispatching a subagent. The set reaches a reviewer through the cycle.
4. **Overwriting on Strych stays untried.** D-216 rests on it as spec decision 7 does, and H2.5 is its trial. The entry does not say so, since an entry states what binds.
