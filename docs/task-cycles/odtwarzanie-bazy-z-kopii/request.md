**State: ready** — corrected twice (for your remarks after the restore trial, then for the four small fixes you chose); one question waits for your answer.

## What you will see

Nothing changes in the game. What changes is the written instruction you follow on the day the game server is lost: the one for restoring the accounts and saved games from a backup, with its short entry in the skill that describes the server. The task listed sixteen places where the earlier reviews found that you could lose players' saves, bring back an old password, leave a file of addresses and password hashes readable by others, or be stuck on a command the text did not give. All sixteen are dealt with.

You did the trial yourself on 2026-11-11 on the real test server, from the newest nightly backup chosen by its time, and it worked from the first step to the last. The instruction now says so: the date, what was tried and what was not. In the trial you needed three things the instruction did not give, and they are now in it: where to get the address of the backup store (it is loaded from the installed backup script, without being shown), that the decrypted database file must be made readable by the owner only (it came out readable by everyone, and was protected only by its private directory), and what the "marker" of the final check is and what to do if you did not write it down. After the trial the four small fixes you chose were made too: the subject of the failure message is written as the script sends it, the path with the old encryption key repeats the private-file setting, the paragraph about the trial names the two branches it never reached, and the sentence about the version reads matches what was actually done.

The main changes, in the order of a restore: fetching the backup from the backup store to the server with the store's key checked, and choosing the newest backup by its time; using the old encryption key for a backup made before the key was replaced; setting the database file to the right owner and mode; trying a second time after a failed first try without overwriting the database kept aside; a warning that merging into the main branch in the middle of a restore starts a deployment; a note that a backup holding saves of another version of the game is accepted, and the game then starts those players afresh; and a final step that tells you to ask everyone who reset a password after the backup to reset it again, and to block again the accounts blocked after it. The instruction also now says how to count, without reading them, the lines that would switch off the check of the backup store's key in the server's SSH settings, and the test server's count is `0`.

### Underneath

The instruction and the skill's short entry are kept as two identical copies, one for each assistant. The foundation gets two new decisions (a restore signs nobody out; an agent may only count the lines of root's SSH settings) and one new fact about the server's SSH settings, read on the server through the read-only access an agent has.

## For you to decide

**To fix: one small thing, with my recommendation**

1. One line of the skill's entry about the failure message is 150 characters long where the rest of the file wraps at about 100. It is only how the text looks; it says nothing wrong. Leaving it costs nothing; fixing it costs another round of review for a line break. I recommend leaving it. Leave it, or make a task of it? (Minor findings, 1)

**You accept these by merging; if one does not suit you, say which**

2. How you tell which backup is newest: you fetch the seven weekday backups by their fixed names, with their times kept, and take the first in a listing sorted by time. The backup log is only a cross-check. In the trial the newest by time agreed with the log. The log alone was not chosen, because on a new server the log is gone, which is exactly when you restore. The price is up to seven encrypted files fetched instead of one.
3. The task said that a new key from "Rotating" would sign every player out; it does not (rotation keeps the old keys), so the instruction forbids a new key at that step for two different reasons, one for creating the file and another for rotating.
4. The SSH-settings count never shows `0` for something it could not follow: a quoted setting name, a path written `~name/...`, a path with a variable or a quote, or more than sixteen levels of included files each count as one. A `1` may therefore be a harmless oddity that you then look at; a false `0` was the case the task forbids.
5. The decrypted database is made private by running the decrypt with `umask 077`, not by changing its mode afterwards, which would leave a moment when it is readable.
6. The subject of the failure message is written as the script sends it, with underscores. The instruction adds that Mikrus's documentation says its message service reads underscores as spaces. Nobody has seen such a message arrive, so that sentence rests on the documentation only.
7. The paragraph about the trial does not call it the "checked restore" that the foundation defines as the trial on your own computer, and it leaves out of its list of untried parts two things that are not steps of this procedure (the backup script's exit code after a signal, and that trial on your computer).
8. Two entries in the foundation that you did not see in the task. A fact: root's SSH settings and the system-wide ones on the test server, with the files they include, contain no line that sets the two host-key options; it rests on a reading taken with the instruction's counting command. And the decision about the backup store's key check now points at that fact as one of its bases.

**Open: your decision needed**

9. Parts of the procedure were not tried, and the instruction says so in its own text: the way back after a failed check, a second attempt after a failed one, the old encryption key, the move of the two helper files of the database in step 4, a password reset or a block redone in step 8, the exit code of the transfer for a missing weekday file, a backup of a newer database version than the running game knows, and the path with no server at all. The backup script's exit code after a signal was not run on Linux either, and the `umask 077` command is new and was not run: it rests on the observed fact that the file came out readable by everyone, which shows that the tool follows the umask. If one of these paths is wrong, you find out on the day of a real failure, not before; if you try them now, you spend another session on a server that holds only your accounts. I recommend merging: the untried parts are marked in the text, and the common path is proven. If you want the way back and the second attempt tried, I would make a separate task for another trial. Merge with these parts untried?

## Cost

About one hour and seven minutes of working time, spread over the orchestrator, an author agent and a reviewer agent, on Claude Sonnet 5.5 and, for the reviewer, Claude Opus 5.5; about 82 million tokens, almost all of it cached input. One review round failed (a blocking finding in the SSH count, plus five small findings), was fixed once, and its fix passed review; each of the two corrections was reviewed once and passed. The table of stages is in the record of the cycle.

## How to merge

Merge with a merge commit that keeps the commits: the link to the record of the cycle survives only then, and the record's copy is added and removed by a pair of commits, three times, on purpose.

The foundation has waited for a review for 72 merges since the start of the history; no earlier review is tagged. The review is the skill `the-way-review-foundation`, started in a session in this repository. Nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — skorygowane dwa razy (po Twoich uwagach po próbie odtworzenia, potem o cztery drobne poprawki, które wybrałeś); czeka jedno pytanie do Ciebie.

### Co zobaczysz

W grze nic się nie zmienia. Zmienia się pisemna instrukcja, według której pójdziesz w dniu, gdy serwer gry przepadnie: ta o odtwarzaniu kont i zapisów gry z kopii, razem z jej krótkim wpisem w skillu opisującym serwer. Zadanie wymieniało szesnaście miejsc, w których wcześniejsze recenzje wykazały, że można stracić zapisy graczy, przywrócić stare hasło, zostawić plik z adresami i skrótami haseł czytelny dla innych albo utknąć na poleceniu, którego tekst nie podawał. Wszystkie szesnaście jest załatwionych.

Próbę zrobiłeś sam 2026-11-11 na prawdziwym serwerze testowym, z najnowszej kopii nocnej wybranej po czasie, i poszła od pierwszego kroku do ostatniego. Instrukcja mówi to teraz wprost: datę, co próbowano i czego nie. W próbie potrzebowałeś trzech rzeczy, których instrukcja nie dawała, i teraz w niej są: skąd wziąć adres składu kopii (wczytuje się go z zainstalowanego skryptu kopii, bez pokazywania), że odszyfrowany plik bazy ma być czytelny tylko dla właściciela (wyszedł czytelny dla wszystkich i chronił go tylko prywatny katalog) oraz czym jest „znacznik” w ostatnim sprawdzeniu i co robić, gdy go nie zapisałeś. Po próbie zrobiono też cztery drobne poprawki, które wybrałeś: temat wiadomości o nieudanej kopii jest zapisany tak, jak wysyła go skrypt, ścieżka ze starym kluczem szyfrowania powtarza ustawienie prywatności pliku, akapit o próbie wymienia dwie gałęzie, do których nie doszła, a zdanie o odczycie wersji narzędzi zgadza się z tym, co faktycznie zrobiono.

Główne zmiany, w kolejności odtwarzania: pobranie kopii ze składu kopii na serwer ze sprawdzeniem klucza składu i wybór najnowszej kopii po czasie; użycie starego klucza szyfrowania dla kopii zrobionej przed jego zmianą; ustawienie właściciela i trybu pliku bazy; druga próba po nieudanej pierwszej bez nadpisywania bazy odłożonej na bok; ostrzeżenie, że scalenie do głównej gałęzi w trakcie odtwarzania uruchomi wdrożenie; informacja, że kopia z zapisami innej wersji gry zostaje przyjęta, a gra zaczyna wtedy tych graczy od nowa; oraz końcowy krok, który każe poprosić o ponowny reset hasła każdego, kto resetował je po kopii, i zablokować ponownie konta zablokowane po niej. Instrukcja mówi też, jak policzyć, bez czytania, wiersze, które wyłączyłyby sprawdzanie klucza składu w ustawieniach SSH serwera; na serwerze testowym liczba wynosi `0`.

#### Pod spodem

Instrukcja i krótki wpis w skillu są utrzymywane w dwóch identycznych kopiach, po jednej dla każdego asystenta. Fundament dostaje dwie nowe decyzje (odtworzenie nikogo nie wylogowuje; agent może tylko policzyć wiersze ustawień SSH roota) i jeden nowy fakt o ustawieniach SSH serwera, odczytany na serwerze przez dostęp tylko do odczytu, który ma agent.

### Do rozstrzygnięcia

**Do poprawienia: jedna drobna rzecz, z moją rekomendacją**

1. Jeden wiersz we wpisie skilla o wiadomości o nieudanej kopii ma 150 znaków, a reszta pliku zawija się przy około 100. To tylko wygląd tekstu, nic w nim nie jest błędne. Zostawienie nic nie kosztuje; poprawienie kosztuje kolejną rundę recenzji za złamanie wiersza. Rekomenduję zostawić. Zostawić, czy zrobić z tego zadanie? (Minor findings, 1)

**Przyjmujesz scaleniem; jeśli któryś punkt Ci nie pasuje, napisz który**

2. Jak poznać najnowszą kopię: pobierasz siedem kopii dni tygodnia pod ich stałymi nazwami, z zachowanymi czasami, i bierzesz pierwszą z listy posortowanej po czasie. Log kopii jest tylko kontrolą. W próbie najnowsza po czasie zgadzała się z logiem. Samego logu nie wybrano, bo na nowym serwerze logu nie ma, a właśnie wtedy odtwarzasz. Cena: do siedmiu zaszyfrowanych plików zamiast jednego.
3. Zadanie mówiło, że nowy klucz z „Rotating” wylogowałby wszystkich graczy; nie wylogowuje (rotacja zachowuje stare klucze), więc instrukcja zakazuje nowego klucza w tym kroku z dwóch różnych powodów, osobnego dla tworzenia pliku i osobnego dla rotacji.
4. Licznik ustawień SSH nigdy nie pokazuje `0` dla czegoś, czego nie umiał prześledzić: nazwa ustawienia w cudzysłowie, ścieżka zapisana `~nazwa/...`, ścieżka ze zmienną albo cudzysłowem i więcej niż szesnaście poziomów dołączanych plików liczą się po jednym. `1` może więc być nieszkodliwą osobliwością, na którą potem patrzysz; fałszywe `0` to przypadek, którego zadanie zakazywało.
5. Odszyfrowana baza staje się prywatna przez uruchomienie odszyfrowania z `umask 077`, a nie przez zmianę trybu po fakcie, która zostawiłaby chwilę, gdy jest czytelna.
6. Temat wiadomości o nieudanej kopii jest zapisany tak, jak wysyła go skrypt, z podkreślnikami. Instrukcja dodaje, że według dokumentacji Mikrusa jego usługa wiadomości traktuje podkreślniki jak spacje. Nikt nie widział takiej wiadomości po jej dotarciu, więc to zdanie opiera się tylko na dokumentacji.
7. Akapit o próbie nie nazywa jej „sprawdzonym odtworzeniem”, które fundament definiuje jako próbę na Twoim komputerze, i pomija na liście nieprzećwiczonych części dwie rzeczy, które nie są krokami tej procedury (kod wyjścia skryptu kopii po sygnale i tę próbę na Twoim komputerze).
8. Dwa wpisy fundamentu, których nie widziałeś w zadaniu. Fakt: ustawienia SSH roota i systemowe na serwerze testowym, razem z plikami, które dołączają, nie zawierają wiersza ustawiającego dwie opcje klucza hosta; opiera się na odczycie wziętym poleceniem liczącym z instrukcji. Oraz decyzja o sprawdzaniu klucza składu kopii wskazuje teraz ten fakt jako jedną ze swoich podstaw.

**Otwarte: potrzebna Twoja decyzja**

9. Części procedury nie były próbowane i instrukcja mówi to we własnym tekście: droga wstecz po nieudanym sprawdzeniu, druga próba po nieudanej, stary klucz szyfrowania, przeniesienie dwóch plików pomocniczych bazy w kroku 4, ponowny reset hasła albo blokada w kroku 8, kod wyjścia przesyłania przy brakującym pliku dnia tygodnia, kopia nowszej wersji bazy niż zna działająca gra oraz ścieżka bez żadnego serwera. Kod wyjścia skryptu kopii po sygnale też nie był uruchamiany na Linuksie, a polecenie z `umask 077` jest nowe i nieuruchomione: opiera się na zaobserwowanym fakcie, że plik wyszedł czytelny dla wszystkich, co pokazuje, że narzędzie idzie za umaską. Jeśli któraś z tych ścieżek jest błędna, dowiesz się tego w dniu prawdziwej awarii, nie wcześniej; jeśli spróbujesz ich teraz, poświęcisz kolejną sesję na serwerze, który ma tylko Twoje konta. Rekomenduję scalić: nieprzećwiczone części są oznaczone w tekście, a zwykła ścieżka jest sprawdzona. Jeśli chcesz mieć sprawdzoną drogę wstecz i drugą próbę, zrobiłbym osobne zadanie na kolejną próbę. Scalić z tymi częściami nieprzećwiczonymi?

### Koszt

Około godziny i siedmiu minut czasu pracy orkiestratora, agenta autora i agenta recenzenta, na Claude Sonnet 5.5, a recenzenta na Claude Opus 5.5; około 82 mln tokenów, prawie wszystko to wejście z cache. Jedna runda recenzji zakończyła się porażką (uwaga blokująca w liczniku ustawień SSH i pięć drobnych), poprawiono ją raz, a poprawka przeszła recenzję; każda z dwóch korekt była recenzowana raz i przeszła. Tabela etapów jest w zapisie cyklu.

### Jak scalić

Scal commitem scalającym, który zachowuje commity: link do zapisu cyklu przeżywa tylko wtedy, a kopia zapisu jest dodawana i usuwana parą commitów, trzykrotnie, celowo.

Fundament czeka na przegląd od 72 scaleń od początku historii; żaden wcześniejszy przegląd nie ma tagu. Przeglądem jest skill `the-way-review-foundation`, uruchomiony w sesji w tym repozytorium. Nic w tym PR-ze na niego nie czeka.

</details>

## Technical changes

Seven commits besides the three pairs of the record: three of the author (the instruction, the two decisions, the fact with D-238's basis), two of the fix of the whole-change review, one of the first correction (after the trial) and one of the second (the four small fixes). The change adds no code and no test: it is prose for agents and entries of the foundation, and the existing test of the skill keeps its two copies equal.

- `08f7a06` — `.claude/skills/loop2-deploy/references/backup_and_restore.md` and `.claude/skills/loop2-deploy/SKILL.md`, with the copies in `.agents/skills/loop2-deploy/` byte for byte equal: to-do items 1–14 (the log's empty-copy sentence, the exit-code table, the reinstall rule, the SSH warning, the owner's-computer trial, the server restore steps 1, 2, 5, 8, the second attempt and the wrapped lines, the merge warning, the saved-game version, what a restore gives back, the "With no server" path, and the counting command of the list of what an agent may read).
- `aa15552` — `foundations/decisions.md`: D-360 and D-361.
- `76120d8` — `foundations/environment_facts.md` and D-238's *Based on* in `foundations/decisions.md`; renamed in `a264539` to `loop2-host-ssh-host-key-options` with a *Source* quoting the new command and its reading.
- `bff07d5` — the fix of the blocking finding and of three Minor ones, in both copies: the counting command counts a quoted first word and any `~` path other than `~/` as one; step 1 of the server restore ends with `cd /root/loop2-restore` so the plain database cannot land outside the private directory; the two bans on a new session key get their own reasons; one bullet of `SKILL.md` is rewrapped.
- `a264539` — the fix of the other two Minor findings: the fact's identifier and *Source*, D-238's *Based on*, and `bash --version` among the allowed reads in `SKILL.md`.
- `1c9ca88` — the correction after the restore trial, in both copies of `backup_and_restore.md`: to-do item 15 (the sentence `The procedure has never been tried.` of "Restoring over the server's database" replaced by the date, the result and the list of what was not tried); step 1 loads `STRYCH_HOST` from the installed script and uses `"$STRYCH_HOST"` in the fetch and in the second-attempt text, with a fallback to `/srv/loop2/deploy/loop2-backup` on the path with no server; step 2 runs the decrypt as `( umask 077; age … )` and expects `-rw-------`; step 7 explains the marker and the case of one not written down.
- `39da4d4` — the second correction, the four small fixes, in both copies of `SKILL.md` and `backup_and_restore.md`: the notice subject quoted as the script sends it (`kopia_bazy_loop2_nieudana`) in two places; the old-key decrypt stated as the same command with the old key's path and with `umask 077` and `-o accounts.sqlite` staying; the result paragraph naming the two branches never reached (moving `-wal` and `-shm` in step 4, a reset or a block redone in step 8); the allowed version reads may be piped through `head -1` and run in the same call as the counting command; one long line rewrapped.

## Checks

- The gate `npm test` on the final head `39da4d4`: exit 0, 543 tests in 4 directories, every directory passed, and the foundation check inside it reported 0 errors. It passed on `a264539` and on `1c9ca88` as well. On the base `f672c7b`, the first run failed in two quality tests only for want of the quality tool environment of `README.md` that the worktree did not yet hold; after the environment was installed, `npm test -- tests/quality/test_quality_invariants.py` passed (1 failing run of those two tests on the base before the environment, 1 passing after).
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`, run by the author, the reviewer and inside the gate. The second correction touched no foundation file.
- The restore itself was run once on the real test server by you, on 2026-11-11, steps 1 to 8, with the output pasted into the cycle; the commands were those of the instruction at `a264539` except the load of the host (the command now written into step 1). Not run by anyone: the parts listed in item 9 of *For you to decide*, `umask 077` on Linux, and `age`'s way of creating a file (reasoned from the observed mode). The test of the backup script's notice (`tests/invariants/test_account_save_backup_failure_notice.py`) was run by the author of the second correction, exit 0; it does not cover the skill's text.
- Own-work checks: the counting command was run on 17, then 24 fake configuration trees by the author (5 of the first 17 failed with the `Include` handling switched off, which is the proof that the cases test it), and on 20 plus 7 ordinary configurations by the reviewer, who found the two forms of the blocking finding; the shell blocks of the instruction pass `bash -n` (8 blocks, rechecked after each correction); the loading of `STRYCH_HOST` and the brace form were run in bash by the reviewer against a copy of the backup script. The counting command was read on the test server through the read-only `mikrus` access twice (before and after its fix): output `0`, GNU bash 5.1.16 and GNU grep 3.7.
- User-interface states and screenshots: none; the change shows no screen.
- The form check of this description: last command `python -B .the-way/task-cycle/request_check.py docs/task-cycles/odtwarzanie-bazy-z-kopii/request.md --task docs/task-cycles/odtwarzanie-bazy-z-kopii/task.md`, to be recorded below with the other checks when the copy is committed.
- The remarks check on the original of the record: seven runs over the cycle, exit 1 when a report listed new items (14, then 8, then 3), exit 0 after each was appended to the process remarks.

## Foundation entries

1. `row 1` — D-360: a restore of the database signs nobody out; whoever reset a password since the backup resets it again, because anyone who knows the old password signs in again anyway.
2. `row 2` — D-361: an agent reads root's and the system-wide SSH configuration only as the count of lines setting `KnownHostsCommand` or `VerifyHostKeyDNS`, and never their content.
3. `the cycle's` — `loop2-host-ssh-host-key-options` (an environment fact): root's and the system-wide SSH configuration on the test server's host, with the files their `Include` lines name, contain no line setting `KnownHostsCommand` or `VerifyHostKeyDNS`; the counting command printed `0` on the test server on 2026-11-11.
4. `the cycle's` — D-238's *Based on* gains that fact; its binding sentences, *Rationale* and *Rejected* are unchanged.

No invariant test is altered, no surface and no *Violated* mark. The corrections after the trial wrote no entry: the return step found that no entry says the server restore was untried, and decided that D-234's "checked restore" stays the trial on the owner's computer.

## Minor findings

The one Minor finding that no fix made, in the reviewer's words (review of the second correction, within the task):

1. D1 — `.claude/skills/loop2-deploy/SKILL.md:191`, both copies: "the line group 1 edited, `SKILL.md:191` in both copies, is now 150 characters, well past the file's wrap of about 100. It needs rewrapping." (Item 1 of *For you to decide*.)

Earlier Minor findings of the cycle (N1 and N2 of the review of the fix, C1 and C2 of the review of the first correction) were fixed by the second correction.

## Findings outside the task's scope

None left. The one finding the reviewers marked outside the task's scope (the failure message's subject, written with spaces in the skill and with underscores by `deploy/loop2-backup:56`) was fixed in the skill at your request, by the second correction.

No check whose file belongs to a part outside the task's parts failed in a cycle run and passed again.

## Course of the cycle

- **Task and sources:** an independent task: correct the instruction for restoring the account database from a backup and have the restore tried once on the server; sources are the task document (updated 2026-11-08) and the notes of the reviews of the pull requests it lists, with the decisions of the foundation it names.
- **Process pin:** `e3825a82386a61930a86f8517fc0c5f422fc2833`; the task did not move it. The gate passed on the final head.
- **Spec:** none; the task left no open design choice (the one question it carried to the cycle, how step 1 reads the newest backup, is a choice of how within D-230).
- **Route:** one author without a plan, the same author resumed for the fix, the return step and both corrections; the change is one instruction file with its copy and a few foundation entries.
- **Plan:** none.
- **Choices:** 10 other choices of the cycle, in the questions table of the record.
- **Blocking findings left:** none; the one blocking finding of the whole-change review was fixed once and its fix passed review.
- **Corrections:** two. The first, for the remarks of the owner after the restore trial (given in the conversation of the cycle, with the pasted output of the trial; written into the first correction's handoff in the record). The second, for the owner's decision to fix the four small groups of unfixed findings (written into the second correction's handoff). Neither reset the branch: each is one commit on top of the earlier head (`2dc0a02`, then `84db15e`); the remote target branch had nothing new to merge (`origin/main` was still the task's base `f672c7b`).
- **Record:** the record of the cycle in `docs/task-cycles/odtwarzanie-bazy-z-kopii/`; the first copy was added by `31f835b6c3d0306362082fb0c6170a0b1aba6d90` and the second by `5c4cfb80ee292af671be951af6f5097025739da6`, each removed by the next commit; the third copy, after the second correction, is linked below once it is committed.
