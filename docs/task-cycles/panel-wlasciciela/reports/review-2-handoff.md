# Handoff — review "review-2" ("panel właściciela")

## What is reviewed and where

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. You are read-only: you change no file of the repository; you write only your report.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. **Range to review: `6e1eeef7..7fafc743`** — compute the diff yourself with `git diff 6e1eeef7..7fafc743` and `git log 6e1eeef7..7fafc743`; confirm that `git rev-parse HEAD` is `7fafc743` (or that `7fafc743` is the head you were given), and ask by `questions` where it is not.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; a file it names only when the step or variant that names it comes. You have no skill tool.
- Answers of step 4: **trust boundary: yes** — the change adds and changes code in `src/server/**`, which the part map names as `account-server`'s trust boundary; check **crafted input** at every place the change reaches it (a request with no session, a session of a player, a session of a blocked account, a body naming another account's identifier or other fields, a role read from the session instead of the database, an unknown stored value). **Irreversible operation: no**; check that the change only prepares what a human runs on the server.
- Frozen task: `.runs/task-cycles/panel-wlasciciela/task-frozen.md`; plan: `.runs/task-cycles/panel-wlasciciela/plan.md`; no spec. Orchestrator's recorded choices that bind the change: **A1** (each entry of the list carries the role as a fourth field, `role`: `player` or `owner`), **A2** (the foundation step brought the quoting lines `// decision:` of D-112, D-253 and D-354 into line, changing in the tests only the text of those comment lines).
- Your report: `.runs/task-cycles/panel-wlasciciela/reports/review-2-report.md`. Your directory for working copies: `.runs/review-2/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Foundation entries by identifier, with current ranges (the plan's ranges are those of the base `b1904c5b`)

| Decision | Current range |
|---|---|
| D-112 | `foundations/decisions.md:2365-2379` |
| D-137 | `foundations/decisions.md:3082-3103` |
| D-202 | `foundations/decisions.md:4381-4410` |
| D-400 | `foundations/decisions.md:10700-10716` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

D-410 is the plan's "new decision on the role" and D-411 its "new decision on the screen of the list". Read the entries your review needs whole; reach for others selectively and name each reach.

## Also in this range, for slice 2

- The executor's report (claims to verify): `.runs/task-cycles/panel-wlasciciela/reports/executor-2-report.md`; its evidence logs are in `.runs/task-cycles/panel-wlasciciela/reports/executor-2-evidence/`. Slice 1 and its review passed; slice 2's range starts at slice 1's head `6e1eeef7`.
- Gaps the executor named, which you judge: it did not read the part-map element's `template.md`, `rules.md`, `examples.md`, `first_map.md` (the change to `foundations/part_map.md` is one line of *Files*); its test of the list carries no `// decision:` line because the foundation check refused the quotations it tried; the method names `listAccounts`, `setAccountRole` and `blockForPanel` are its own choice and slices 3 and 4 depend on them; it did not check how `normalizeEmail` lowercases non-ASCII addresses, which bears on the sort.
- The point of this slice for the trust boundary: the block for the panel reads the role **inside its own transaction** and refuses an owner there, also when a second connection changed the role just before; `blockAccount`, `unblockAccount` and `setPreviousSavePrivilege` stay as they are (the commands use them). Check that with a mutation of your own (for instance, move the role read out of the transaction, or drop the refusal) the executor's tests fail, and say what you ran.
- Not part of this slice: the `references/troubleshooting.md` remark O1 of the review of slice 1, and the Minor findings M1–M3 of that review (kept for the review of the whole change).

## The slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

You judge the slice against the passages of the task below and against its section of the plan, not the plan alone. The executor's selection is the *Read* line of the section. This slice's *Risk*: trust boundary — `src/server/**` (`account-server`: the blocking and the role of accounts)

### Slice 2 — Database operations of the panel

- **Goal:** `AccountDatabase` has three more operations, each by an email address normalized as at login, and the file `tests/account-owner.test.mjs` (new) tests them on real SQLite files, written first. (a) A list of every account, sorted by address ascending, each entry holding the address, the role, the blocked state and the previous-save privilege and nothing else of the account. (b) A change of role by address, one write in one transaction, answering `made-owner`, `already-owner`, `made-player`, `already-player` or `unknown`, ending no session and stopping no link. (c) A block for the panel: the same marking, deletion of the sessions and stopping of the links in one transaction as `blockAccount`, but the transaction reads the account's role and, for an owner, changes nothing and answers a refusal of its own (`owner`), also when the role was set by a second connection just before; its other answers are those of `blockAccount`. `blockAccount`, `unblockAccount` and `setPreviousSavePrivilege` stay as they are, since the commands use them and the commands stay unchanged. The tests cover: the sort, the four fields, a block of a player ending its sessions and stopping its links and nothing of another account, a block of an owner changing nothing (also the owner's own sessions and links), the role change by a second connection committed before the block, each outcome of the role change, and that the role change leaves block state, privilege, sessions and saved games as they were. The new test file is added to *Files* of `account-server` in `foundations/part_map.md` through the project skill `the-way-update-part-map` (read `.claude/skills/the-way-update-part-map/SKILL.md`).
- **Change:** `src/server/database.ts` · `tests/account-owner.test.mjs` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` · `foundations/decisions.md:3074-3092` D-137 · `foundations/decisions.md:2357-2370` D-112 · `foundations/decisions.md:10672-10685` D-400 · `foundations/decisions.md:4371-4395` D-202 · `foundations/invariants.md:858-866` blocked-account-access · `foundations/invariants.md:868-877` player-server-session · `foundations/invariants.md:878-887` unblock-restores-no-session · `foundations/invariants.md:898-907` unblock-restores-no-link · `tests/account-storage.test.mjs:1-136` · `tests/account-storage.test.mjs:2022-2070` · `.claude/skills/the-way-update-part-map/SKILL.md` · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-38` To do · the new decision on the role · the new decision on the screen of the list
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (`account-server`: the blocking and the role of accounts)
- **Checks:** `npm run typecheck` · `npm test -- tests/account-owner.test.mjs` · `npm test -- tests/account-storage.test.mjs` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · the foundation entries D-137 · D-400 · the new decision on the screen of the list

## Passages of the task (copied word for word from `.runs/task-cycles/panel-wlasciciela/task-frozen.md`)

### To do

1. Konto ma rolę zapisaną w bazie kont: gracz albo właściciel; nowe konto jest graczem, a baza przechodzi na nową wersję schematu z zachowaniem każdego konta jako gracza.
2. Rolę właściciela nadaje i odbiera komenda uruchamiana przez człowieka w kontenerze `loop2`, na wzór `account-previous-save` (D-400): konto wskazane adresem, odpowiedź, że rola została zmieniona, już taka była albo że konta o tym adresie nie ma, i nic nie zmienia, gdy odmawia.
3. Właściciel loguje się tą samą kartą logowania co gracz; jego menu „Konto” ma, obok adresu i „Wyloguj”, odnośnik „Panel właściciela” prowadzący pod adres `#/konta`. Pasek menu wygląda u gracza i u właściciela tak samo; gracz nie ma odnośnika, a adres `#/konta` otwiera mu Siedzibę, jak każdy adres, który nie prowadzi do istniejącego ekranu (D-281).
4. Ekran pod `#/konta` pokazuje listę kont posortowaną po adresie e-mail; przy każdym koncie stoi jego adres, stan blokady i to, czy ma uprawnienie do poprzedniego zapisu — nic więcej o koncie.
5. Przy każdym koncie listy stoją cztery operacje: zablokuj, odblokuj, nadaj uprawnienie do poprzedniego zapisu, odbierz je — każda ze skutkami, jakie dziś daje komenda (D-137, D-400). „Zablokuj” jest przyciskiem niszczącym i otwiera potwierdzenie mówiące, że blokada kończy sesje gracza w każdej przeglądarce i unieważnia jego odnośniki z maili, a odblokowanie ich nie przywraca; trzy pozostałe operacje działają od razu. Konta z rolą właściciela, własnego też, panel nie blokuje: przycisku nie ma, a serwer odmawia; uprawnienie do poprzedniego zapisu da się nadać i odebrać każdemu kontu.
6. Trasy API listy kont i czterech operacji sprawdzają rolę po stronie serwera, przy każdym żądaniu; sesja gracza dostaje na każdej z nich odmowę, a test tej odmowy jest częścią zadania.
7. Styleguide (`guidelines/styleguide-browser-view.md`) opisuje ekran listy kont, odnośnik „Panel właściciela” w menu „Konto” i „Zablokuj” na liście przycisków niszczących.
8. Komendy `account-block` i `account-previous-save` zostają bez zmian jako droga awaryjna obok panelu; skill `loop2-deploy` (`.claude/skills/` i `.agents/skills/`) opisuje panel, komendę roli i to, kiedy sięgać po komendy.

## Decisions in play

Stan w repo `loop2` na commicie `2a8645d4`.

- **D-137** — How does the operator block and unblock a player account? (`foundations/decisions.md:2881`)
  - Brzmienie: „The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction; unblocking clears the account's blocked mark and restores no session and no link. The `loop2-deploy` skill describes the command, and only a human runs it on the server.” Weryfikacja: „violates: an HTTP route of the account server that blocks accounts”. Odrzucone: „an owner panel in the browser with an owner role — a new route inside the trust boundary to defend”.
  - Zmiana, którą robi zadanie (pytanie 1, 3 i 4): blokuje i odblokowuje także konto z rolą właściciela z panelu w grze, przez trasę API, która odmawia sesji bez tej roli, z tym samym skutkiem w jednej transakcji; konta z rolą właściciela panel nie blokuje; komenda zostaje jako droga awaryjna. Panel właściciela wychodzi z *Rejected*, a uzasadnienie mówi, że ryzyko przejęcia konta właściciela przyjęto przy pięciu kontach na serwerze, wszystkich Mariusza, i że wraca do oceny, gdy gra otworzy się dla innych.
- **D-400** — What is the previous-save privilege and who gives it? (`foundations/decisions.md:9694`)
  - Brzmienie: „The previous-save privilege is a flag on the player account, off when the account is created, which the operator grants and revokes, naming the account by its email address normalized as at login, with the command `account-previous-save` run in the `loop2` container as D-137 gives for the block […] and only a human runs it on the server. […] and no HTTP route grants or revokes it.” Weryfikacja: „violates: an HTTP route of the account server that grants or revokes the privilege”. Odrzucone: „an HTTP route that grants the privilege — D-137 keeps an operator route out of the server”.
  - Zmiana, którą robi zadanie (pytanie 1 i 3): uprawnienie nadaje i odbiera także konto z rolą właściciela z panelu, przez trasę API odmawiającą sesji bez tej roli, każdemu kontu, właścicielowi też; komenda zostaje.
- **D-109** — What identity authorizes an account request? (`foundations/decisions.md:2128`)
  - Brzmienie: „[…] a valid server-side session alone authorizes reading its own account, reading and replacing its own account's saved game state, reading its own account's previous save and starting its own account's game from zero, each of those two for an account that holds the previous-save privilege (D-400), asking for a confirmation message to its own account's address or destroying that browser's session. […] an account identifier or email address supplied in a request grants no authority […]”.
  - Zmiana, którą robi zadanie: ważna sesja konta z rolą właściciela, czytaną przy każdym żądaniu, autoryzuje też odczyt listy kont i cztery operacje na cudzym koncie wskazanym w żądaniu; sesja bez tej roli dostaje na tych trasach odmowę.
- **D-202** — Who can create and use a player account? (`foundations/decisions.md:3894`)
  - Brzmienie: „Anyone can create a player account and start playing without approval. A signed-in player can read and change only their own saved game state. The operator can block an account from signing in and using the game.”
  - Zmiana, którą robi zadanie: nowe konto jest graczem; blokować konto może też konto z rolą właściciela, z panelu.
- **D-112** — How does the account database open and preserve its schema? (`foundations/decisions.md:2182`)
  - Brzmienie (fragmenty): „[…] the operator's blocking command of D-137, its command for the previous-save privilege of D-400 and the backup command of D-231 each open one short-lived connection beside it under the same rules; opening reads the schema version and, in the same transaction, applies in order every migration step after it up to the current version 5 — one step per version, a step never edited once deployed, a later version adding one step at the end […]. Accounts have an opaque random primary identifier, uniquely normalized email, encoded password hash, creation time, blocked state and the time their email address was confirmed, unset until it is, and the previous-save privilege, off until the operator grants it […]”.
  - Zmiana, którą robi zadanie (pytanie 2): konto ma też rolę, gracz albo właściciel, gracz przy założeniu; schemat dostaje wersję 6 jednym krokiem na końcu, który zostawia każde istniejące konto graczem; komenda roli otwiera krótkie połączenie obok serwera na tych samych zasadach.
- **D-280** — Which screens does the game have, and how does the player move between them? (`foundations/decisions.md:6519`)
  - Brzmienie (fragment): „[…] over the game the items Siedziba, Mapy and Programy, with no icons, and the menu „Konto” with the address and „Wyloguj” […]”.
  - Zmiana, którą robi zadanie (pytanie 5): menu „Konto” konta z rolą właściciela trzyma też „Panel właściciela”; gra ma ekran listy kont, tylko dla właściciela; pozycje paska bez zmian.
- **D-281** — How does an address name a screen? (`foundations/decisions.md:6582`)
  - Brzmienie (fragment): „An address names a screen in the fragment after `#`: `#/`, `#/postac/{n}`, `#/mapy`, `#/mapy/{map}`, `#/programy`, `#/programy/{n}` and `#/postac/{n}/przejscie` […] and any other Siedziba […]”.
  - Zmiana, którą robi zadanie (pytanie 5): dochodzi `#/konta`, ekran listy kont dla konta z rolą właściciela; dla gracza adres prowadzi do Siedziby jak „any other”.
- **D-252** i **D-354** — logi i zdanie komendy serwisowej (`foundations/decisions.md:5541`, `:8963`)
  - Brzmienie (D-252, fragment): „The product logs changes of a player's account and of access to it […], and an agent adds alone an item that fits this principle, an identifier of a thing included, while anything that points to a person takes the human's consent.” D-354: „The sentence by which a service command of the account server, `account-block`, `account-previous-save` or `account-backup`, answers the operator is no log line […]”.
  - Zmiana, którą robi zadanie: lista komend serwisowych D-354 i D-252 dostaje komendę roli; operacje z panelu i zmiana roli to zmiany konta, które produkt loguje.
- **D-104** — Which request origin and body may change account state? (`foundations/decisions.md:2061`)
  - Brzmienie (fragment): „[…] every state-changing route requires exactly the configured serialized HTTPS Origin and an application/json body with […] at most 16 KiB for every other route […]”.
  - Bez zmiany: obowiązuje cztery nowe trasy operacji.
- **D-12** — What access to the server does an agent have? (`foundations/decisions.md:339`)
  - Brzmienie: „An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.”
  - Bez zmiany: komendę roli uruchamia człowiek (*Human actions*).

## Settlements to record

Candidates: 9 shown, 9 accepted — 2026-11-14

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Konto z rolą właściciela blokuje i odblokowuje konta oraz nadaje i odbiera uprawnienie do poprzedniego zapisu z panelu w grze; ryzyko przejęcia konta właściciela przyjęte przy pięciu kontach na serwerze, wszystkich Mariusza, wraca do oceny, gdy gra otworzy się dla innych. | decision | pytanie 1 (zmienia D-137 i D-400) | czy w ogóle wolno dodać trasę blokującą konto, skoro D-137 ją odrzuca |
| 2 | Rola (gracz albo właściciel) jest zapisana przy koncie w bazie, a rolę właściciela nadaje i odbiera komenda uruchamiana przez człowieka w kontenerze `loop2`. | decision | pytanie 2 (zmienia D-112) | rola w bazie czy adres w ustawieniach serwera |
| 3 | Komendy `account-block` i `account-previous-save` zostają obok panelu jako droga awaryjna. | decision | pytanie 3 | usunięcie komend jako zdublowanych przez panel |
| 4 | Panel nie blokuje konta z rolą właściciela, także własnego, a uprawnienie do poprzedniego zapisu nadaje i odbiera każdemu kontu. | decision | pytanie 4 | czy właściciel może zablokować sam siebie albo innego właściciela |
| 5 | Panel właściciela otwiera odnośnik „Panel właściciela” w menu „Konto” właściciela, pod adresem `#/konta`; pasek menu gracza i właściciela jest taki sam. | decision | pytanie 5 (zmienia D-280 i D-281) | czwarta pozycja paska menu albo inne miejsce wejścia |
| 6 | Lista kont pokazuje tylko adres e-mail, stan blokady i uprawnienie do poprzedniego zapisu, posortowane po adresie. | decision | pytanie 6 | dołożenie daty założenia, potwierdzenia adresu albo innych danych gracza |
| 7 | „Zablokuj” otwiera potwierdzenie, a odblokowanie i obie operacje uprawnienia działają od razu. | decision | pytanie 7 | potwierdzenie przy każdej operacji albo przy żadnej |
| 8 | Każda trasa panelu właściciela odmawia sesji konta bez roli właściciela, a rolę czyta przy każdym żądaniu, nie z chwili logowania; serwer odmawia blokady konta z rolą właściciela. | invariant | To do 5 i 6, pytanie 4; przyjęty: Mariusz (przez doradcę dnia), 2026-11-14, „1 a — przyjąć oba wiersze” | test odmowy tylko jednej trasy albo rola zapamiętana w sesji przy logowaniu |
| 9 | „Właściciel” w grze to rola konta, a nie tylko osoba z dostępem do serwera, którą dziennik nazywa „operator” albo „owner”. | glossary term | pytanie 1 i 2; hasła słownika „blocked account” i „previous-save privilege” mówią „the operator”; przyjęty: Mariusz (przez doradcę dnia), 2026-11-14, „1 a — przyjąć oba wiersze” | „owner” w nowych wpisach czytane raz jako osoba z SSH, raz jako rola konta |

## Your report

As `review-change` gives it: the first line `PASS <sha>` or `FAIL <sha>` (or `questions`), graded findings with `file:line`, each check you ran with its command and exit code, **Reach beyond the handoff**, **Working copies**, **Unread material** and **Searches not found or unclear**.
