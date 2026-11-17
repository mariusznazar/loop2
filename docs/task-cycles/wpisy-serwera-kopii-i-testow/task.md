---
title: "loop2: zmiany wpisów o serwerze, kopiach i testach z przeglądu fundamentu"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the folder note of the project Loop in the author's notes"
---

# loop2: zmiany wpisów o serwerze, kopiach i testach z przeglądu fundamentu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Przegląd fundamentu loop2 z 13.11.2026 znalazł wpisy o wdrożeniu, kopiach bazy, granicach kodu i testach, które przemilczają skutek albo przeczą innym wpisom i kodowi.
- Najostrzejszy: wdrożenie commita, który nie zna wersji schematu bazy — wycofanie albo `main` po próbie gałęzi, która przesunęła schemat — nie ratuje gry, tylko ją wyłącza, a D-15 tego nie mówi; człowiek albo agent przy awarii wybierze wycofanie jako szybki ratunek.
- Drugi z wagą: po odtworzeniu bazy z kopii wraca stare hasło każdego konta zresetowanego po zrobieniu kopii, a procedura każe zresetować ponownie tylko konta, o których właściciel wie — choć ślad resetów leży w logu na serwerze.
- Pozostałe sześć to rozjazdy, przez które agent dobierający wpisy po części albo stosujący niezmiennik dostaje niepełny albo fałszywy obraz.

### To do

1. F-2 — D-15: dopisać zdanie, że wdrożenie commita, który nie zna wersji schematu bazy — wycofanie albo `main` po próbie gałęzi, która przesunęła schemat — nie przechodzi sondy zdrowia i zostawia grę leżącą, dopóki nie wdroży się commit, który ją zna (D-112); takie wycofanie nie jest ratunkiem, a taka próba nie jest próbą, którą `main` przeżyje.
2. F-3 — D-360 i instrukcja odtwarzania (`.claude/skills/loop2-deploy/references/backup_and_restore.md` i jej kopia w `.agents/skills/loop2-deploy/references/`): krok, w którym człowiek znajduje linie `password-set` i `account-blocked` od czasu kopii w pliku zrzutu `/var/log/loop2-app.log`, jego pokoleniach i w logu kontenera, i powtarza reset albo blokadę; ten sam krok znajduje linie `account-unblocked` od czasu kopii i każe zdjąć te blokady ponownie (pytanie 2); instrukcja podaje polecenie tylko do odczytu, które człowiek uruchamia w kontenerze gry i które dla znalezionych numerów kont wypisuje ich adresy z odtworzonej bazy (pytanie 1), a D-112 wymienia to polecenie wśród połączeń otwierających bazę obok serwera jako jedno krótkie połączenie tylko do odczytu, które nie zmienia schematu ani danych (pytanie 3); zastrzeżenie, że przy odtwarzaniu na nowym serwerze („With no server”) tego kroku nie ma; zdanie „This instruction has no way to find the other accounts, so it names none.” znika; *Rationale* i *Rejected* D-360 przestają mówić, że resetu nieznanego właścicielowi nie da się odnaleźć; relacja D-360 do D-355.
3. F-7 — niezmiennik `cross-part-imports`: `Rests on: none`; z pola znikają data i commit.
4. F-18 — D-235: zdanie wiążące nazywa oba skrypty rozmawiające z `pusher` — skrypt kopii bazy (D-231) i strażnika awarii `deploy/loop2-watch` (D-356) — i mówi, że zgodność z `pusher` sprawdza człowiek przy zmianie rozmowy któregokolwiek z nich; *Relations* zyskuje D-356; wiersz „Czy kod rozmawia z cudzą usługą?” w `guidelines/testing.md:60` i przepis *Doubles* w `guidelines/testing.md:354` nazywają strażnika i jego szew `tests/deploy/watch_script_support.py` obok skryptu kopii.
5. F-21 — D-109: zdanie wiążące wymienia trasę raportu błędu przeglądarki `POST /api/browser-failure` — dostępną każdemu, z sesją albo bez, pod strażnikami żądań i z własnym limitem D-356, a sesja daje jej tylko `accountId`, nic więcej nie autoryzując; *Relations* zyskuje D-356.
6. F-28 — niezmiennik `tracked-file-private-names`: zdanie wyjątku — odwołanie do prywatnej notatki właściciela z sekretami (D-13) bez jej nazwy i ścieżki jest dozwolone.
7. F-29 — `test-helpers` w *Scope* D-49 i 16 decyzji rodziny testowej: D-73, D-74, D-75, D-76, D-77, D-78, D-79, D-80, D-81, D-82, D-83, D-84, D-85, D-87, D-88, D-89 (bez D-31).
8. F-31 — niezmiennik `account-email-nodemailer-starttls`: usunąć „with Nodemailer 10” (wersję wiąże D-154).
9. Z PR-a https://github.com/mariusznazar/loop2/pull/140 (uwagi C1 i O1, dopisane przez doradcę dnia 16.11): krok 7 sekcji „Restoring over the server's database” w instrukcji odtwarzania (obie kopie `backup_and_restore.md`) — (a) znacznik do sprawdzenia to ten zapisany ostatnio **przed czasem odtwarzanej kopii**, nie po prostu ostatni; (b) dla kopii sprzed zmiany wersji zapisu gry kontrola przechodzi, gdy po zalogowaniu gra zaczyna nową grę z własnym ostrzeżeniem o odrzuconym zapisie — wtedy brak znacznika nie każe cofać odtworzenia.

### Questions to settle

- F-3 — co zrobić z D-360, skoro resety od czasu kopii da się odnaleźć w logu?
  - Answer: zmienić D-360 — krok „znajdź w logu resety i blokady od czasu kopii i powtórz je” w D-360 i w instrukcji odtwarzania, z zastrzeżeniem, że przy nowym serwerze go nie ma; w obu kopiach skilla poprawić zdanie „This instruction has no way to find the other accounts”.
  - Not chosen:
    - zostawić decyzję, a odrzucenie przepisać tak, by jedynym powodem był dodatkowy krok w dniu awarii — przy innych graczach osoba, która zresetowała hasło po wycieku, po odtworzeniu kopii ma konto znów otwarte na stare hasło, choć ślad resetu leży w logu.
  - Source: the author's note of the review of the foundation of 2026-11-13, sekcja 1, F-3, „Decyzja (2026-11-13): zmieniamy (a)”; zdecydował doradca dnia z upoważnienia Mariusza.
- F-7 — na czym stoi niezmiennik `cross-part-imports`?
  - Answer: `Rests on: none` — zdanie mówi o plikach repozytorium; data i commit znikają z pola.
  - Not chosen:
    - nowy fakt o rozwiązywaniu modułów TypeScriptu i Node przez `the-way-record-environment-fact` — odczyt strony dokumentacji, nowy fakt i jedna linia.
    - nowy fakt o dopasowaniu wzorców ścieżek gita przez `the-way-record-environment-fact` — odczyt strony dokumentacji, nowy fakt i jedna linia.
  - Source: the author's note of the review of the foundation of 2026-11-13, sekcja 1, F-7, „Decyzja (2026-11-13): zmieniamy (a)”; zdecydował doradca dnia z upoważnienia Mariusza.
- F-28 — jak pogodzić odesłania do „private note” w D-13 i skillu `loop2-deploy` z niezmiennikiem `tracked-file-private-names`?
  - Answer: jedno zdanie wyjątku w `tracked-file-private-names`: odwołanie do prywatnej notatki z sekretami bez jej nazwy i ścieżki jest dozwolone.
  - Not chosen:
    - zmiana D-13 i skilla — wpis i 56 miejsc „private note” w dwóch kopiach skilla.
  - Source: the author's note of the review of the foundation of 2026-11-13, sekcja 1, F-28, „Decyzja (2026-11-13): zmieniamy (a)”; zdecydował doradca dnia z upoważnienia Mariusza.
- F-31 — co z „with Nodemailer 10”, którego nic nie sprawdza?
  - Answer: usunąć „with Nodemailer 10” z niezmiennika `account-email-nodemailer-starttls`; wersję wiąże D-154.
  - Not chosen:
    - test wersji głównej, jak test wersji Expressa — ok. 30 linii testu.
  - Source: the author's note of the review of the foundation of 2026-11-13, sekcja 1, F-31, „Decyzja (2026-11-13): zmieniamy (b)”; zdecydował doradca dnia z upoważnienia Mariusza.
- Pytanie 1 — jak człowiek dochodzi od numeru konta w linii `password-set` albo `account-blocked` do adresu konta, któremu każe zresetować hasło albo które blokuje ponownie?
  - Answer: instrukcja odtwarzania podaje jedno polecenie tylko do odczytu, które człowiek uruchamia w kontenerze gry i które dla podanych numerów kont wypisuje ich adresy z odtworzonej bazy; kod gry się nie zmienia, adresy widzi tylko człowiek w swoim terminalu, jak przy blokadzie.
  - Not chosen:
    - polecenie blokady przyjmuje też numer konta, a nowe polecenie wypisuje adres dla numeru, pod testami — zadanie zmienia kod serwera kont, a przegląd zakładał „kod bez zmian”.
    - krok wypisuje tylko numery kont, adres człowiek ustala sam — w dniu awarii człowiek pisze zapytanie do bazy od zera, pod presją.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a”.
- Pytanie 2 — czy krok z F-3 obejmuje też linie `account-unblocked`, czyli blokady zdjęte po zrobieniu kopii, które odtworzenie przywraca?
  - Answer: tak — krok szuka też `account-unblocked` i każe zdjąć te blokady ponownie.
  - Not chosen:
    - krok obejmuje tylko resety i blokady — gracz odblokowany po kopii po odtworzeniu znów nie może się zalogować, dopóki sam się nie odezwie.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a”.
- Pytanie 3 — D-112 wylicza połączenia otwierające bazę kont obok serwera („the operator's blocking command of D-137 and the backup command of D-231 each open one short-lived connection beside it under the same rules”), a polecenie odczytu adresów z pytania 1 na tej liście nie stoi i nie ma przesuwać schematu; co z D-112?
  - Answer: zadanie zmienia D-112 — lista zyskuje polecenie odczytu adresów, które otwiera jedno krótkie połączenie tylko do odczytu i nie zmienia schematu ani danych.
  - Not chosen:
    - D-112 bez zmian, polecenie czyta bazę poza jej regułami — przegląd zmiany albo następny przegląd fundamentu zgłosi rozjazd, a D-112 dalej mówi, że bazę otwierają tylko trzy programy.
    - powrót do pytania 1 i zmiana kodu albo sam numer konta — koszty jak przy pytaniu 1.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 a”.

## Context

- Dane przeglądu z dowodami, cytatami i decyzjami przy F-2, F-3, F-7, F-18, F-21, F-28, F-29, F-31: the author's note of the review of the foundation of 2026-11-13, sekcja 1; przegląd sprawdzał commit `1b0c8ad4`, szkic tego dokumentu sprawdzono przy `fc00c406`.
- Decyzje przy propozycjach podjęła 13.11.2026 sesja „doradca dnia” z upoważnienia Mariusza; F-2, F-18, F-21, F-29 i F-31 szły partią jako wiersze tabeli, F-3, F-7 i F-28 pojedynczo.
- Skill wdrożenia już mówi o skutku z F-2: „The first deployment of the commit with address confirmation, including the human's trial deployment of its branch (M4) before the merge, moves the database to schema version 3: an earlier commit, `main` included, then refuses it and fails health with exit 8, and only the human repairs the database” (`.claude/skills/loop2-deploy/SKILL.md:444-450`).
- Linie, których szuka krok z F-3: `src/server/account-routes.ts:665` pisze `writeEvent("password-set", { accountId })`, `src/server/account-block.ts:95` — `account-blocked`, `:97` — `account-unblocked`; każda niesie tylko `accountId`, nie adres.
- Polecenie blokady przyjmuje adres, nie numer konta: „Usage: node dist/server/account-block.js block|unblock <email address>” (`.claude/skills/loop2-deploy/SKILL.md:406`).
- Log gry żyje w kontenerze do następnego wdrożenia, a w pliku `/var/log/loop2-app.log` z pokoleniami ok. 4 tygodnie (D-355); kopie bazy sięgają najwyżej 7 dni (`deploy/loop2-backup:13`).
- Odtwarzanie zatrzymuje aplikację w kroku 3 i wdraża działający commit w kroku 6 (`backup_and_restore.md:462`, `:476`); wdrożenie dopisuje log starego kontenera do pliku tuż przed jego wymianą, a gdy dopisanie się nie uda, pisze `warning:` do logu wdrożenia i idzie dalej (D-355).
- Obie kopie skilla `loop2-deploy` (`.claude/skills/` i `.agents/skills/`) są dziś identyczne.
- Trasa raportu błędu przeglądarki: `src/server/account-routes.ts:391-403` (strażnicy żądań zmieniających stan, wspólni z innymi trasami kont), `:414-441` (wzorce treści, `policy.admitBrowserReport()`, `accountId` z sesji); pilnuje jej niezmiennik `browser-failure-report`.
- Testy strażnika powołują się już na D-235: `tests/deploy/watch_script_support.py:12-15`, `tests/deploy/test_loop2_watch.py:6`, `tests/deploy/test_loop2_watch_message.py:29`.
- Rodzina testowa to 17 decyzji o *Scope* dokładnie „browser-view, simulation, account-server, build-tools, deployment, agent-workflow”; D-31 (reguły Basha) pliku `.py` pomocnika nie dotyczy, więc zostaje bez `test-helpers`.
- Zmiany w `guidelines/testing.md` przenoszą tylko nowe brzmienie D-235 i nie dodają reguły od siebie.
- Zadanie nie pisze kodu ani testów: zmienia wpisy fundamentu (część `product-foundation`), skill `loop2-deploy` i `guidelines/testing.md` (część `agent-workflow`).

## Questions carried to cycle

- F-3: w którym miejscu procedury stoi nowy krok — przed krokiem 6, gdy log zatrzymanego kontenera jeszcze istnieje, czy po nim, gdy wdrożenie dopisało ten log do pliku (a przy nieudanym dopisaniu zostawiło `warning:` w logu wdrożenia) — i jakim ograniczonym poleceniem `grep -F`/`zgrep -F` po stałym ciągu, wzorem `.claude/skills/loop2-deploy/SKILL.md:277`.

## Human actions

none

## Decisions in play

Decyzje, które zadanie zmienia (zmiana według przeglądu i pytań wyżej):

- D-15 — „A deployment that stops before it starts the new containers leaves the running loop2 containers in service. A rollback is a deployment of an earlier commit — a revert merged to `main`, or a human's run of the installed deploy script with that commit, which may name a commit of any branch of the GitHub repository while the automation's key deploys only commits of `main`. No earlier image is kept, so a rollback restores the earlier commit's code, never the data of that time.” — zmiana: zdanie o commicie, który nie zna wersji schematu (To do 1); *Rationale* „A human can try a request before its merge or recover at once.” przestaje przemilczać ten skutek.
- D-360 — „A restore of the account and save database from a backup signs nobody out: the passwords and sessions the backup holds come back as they were. Whoever reset a password since the backup resets it again, and the restore procedure ends by saying so.” — zmiana: krok odnalezienia w logu resetów, blokad i zdjętych blokad od czasu kopii i powtórzenia ich, z odczytem adresów kont, poza odtwarzaniem na nowym serwerze; *Rationale* („a reset he does not know of since the backup stays undone”) i *Rejected* (odrzucony krok czytania logu) przepisane; *Relations* + D-355 (To do 2).
- D-235 — „Mikrus Strych and the `pusher` service have no contract test, and no test reaches them: the backup script's reactions are tested with stand-ins for its tools, which prove reactions and not delivery. The agreement with them is checked by a human when the way of talking to them changes.” — zmiana: oba skrypty (D-231, D-356), *Relations* + D-356 (To do 4).
- D-109 — „A visitor may create an account or attempt credential login subject to the transport, origin, input and admission guards, and may ask for a password-reset link subject to the transport, origin and input guards; …” (`foundations/decisions.md:2125`, zdanie dalej wylicza linki i sesję) — zmiana: trasa raportu błędu przeglądarki, *Relations* + D-356 (To do 5).
- D-112 — „The account server opens one application-owned SQLite connection before readiness, and the operator's blocking command of D-137 and the backup command of D-231 each open one short-lived connection beside it under the same rules; …” (`foundations/decisions.md:2179`) — zmiana: lista zyskuje polecenie odczytu adresów z instrukcji odtwarzania, jedno krótkie połączenie tylko do odczytu, które nie zmienia schematu ani danych (To do 2, pytanie 3). Bez zmiany zostaje *Rejected*: „a step back from a newer version, or a copy of the database before a move — not provided, so a rollback across a schema change fails until code that knows the newer version is deployed”, na które powołuje się To do 1.
- D-49 — „- **Scope:** account-server, build-tools, deployment” — zmiana: + `test-helpers` (To do 7).
- D-73, D-74, D-75, D-76, D-77, D-78, D-79, D-80, D-81, D-82, D-83, D-84, D-85, D-87, D-88, D-89 — „- **Scope:** browser-view, simulation, account-server, build-tools, deployment, agent-workflow” — zmiana: + `test-helpers`; ich zdania wiążące się nie zmieniają (To do 7).

Decyzje, na które zadanie się powołuje bez zmiany:

- D-355 — „a line of the game's log lives in its container until the next deployment and in the file for about four weeks”.
- D-356 — „calls `pusher` with a fixed subject and text …” oraz „sends the kind, the code and the place of an error that no code handled to a route of the game's server, which limits the reports it accepts”.
- D-137 — „The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container … only a human runs it on the server.”
- D-13 — „… stay outside the repository in the repository's GitHub secrets and the owner's private note …”; niezmiennik `tracked-file-private-names` wywodzi się z D-362, która zostaje bez zmian.
- D-154 — „The account server composes and sends email confirmation and password-reset messages through Mikrus Outsider SMTP with Nodemailer 10.”
- D-351 — niezmiennik `cross-part-imports` wywodzi się z niej; *Based on: none* zostaje.

## Settlements to record

Candidates: 9 shown, 5 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Po odtworzeniu bazy z kopii na tym samym serwerze człowiek znajduje w logu (plik zrzutu, jego pokolenia, log kontenera) linie `password-set`, `account-blocked` i `account-unblocked` od czasu kopii, odczytuje adresy tych kont poleceniem tylko do odczytu w kontenerze i powtarza reset, blokadę albo zdjęcie blokady; przy nowym serwerze tego kroku nie ma — zmienia D-360. | decision | Questions to settle: F-3, Pytanie 1, Pytanie 2 | czy zdjęte blokady i odczyt adresów wchodzą do zdania wiążącego D-360, czy tylko do skilla, i co trafia do *Rejected* D-360 |
| 2 | Polecenie odczytu adresów z instrukcji odtwarzania otwiera bazę kont obok serwera jednym krótkim połączeniem tylko do odczytu, które nie zmienia schematu ani danych — zmienia D-112. | decision | Questions to settle: Pytanie 3 | czy polecenie wolno uznać za zgodne z D-112 bez zmiany jej listy połączeń, czy cykl ma stanąć na niezgodności |
| 3 | Niezmiennik `cross-part-imports` nie stoi na żadnym fakcie: `Rests on: none`. | invariant | Questions to settle: F-7 | czy szukać i zapisać fakt o rozwiązywaniu modułów albo wzorcach ścieżek gita |
| 4 | Odwołanie do prywatnej notatki właściciela z sekretami bez jej nazwy i ścieżki jest wyjątkiem niezmiennika `tracked-file-private-names`. | invariant | Questions to settle: F-28 | czy zamiast wyjątku przepisać D-13 i 56 miejsc „private note” w skillu |
| 5 | Niezmiennik `account-email-nodemailer-starttls` nie wiąże wersji Nodemailera; wiąże ją D-154. | invariant | Questions to settle: F-31 | czy dopisać test wersji głównej Nodemailera |

## Out of scope

- Pozostałe propozycje przeglądu fundamentu z 13.11.2026 — niosą je inne zadania, wymienione w the author's note of the review of the foundation of 2026-11-13, sekcja „Zadania z decyzji”.
