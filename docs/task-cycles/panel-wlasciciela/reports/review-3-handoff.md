# Handoff — review "review-3" ("panel właściciela")

## What is reviewed and where

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. You are read-only: you change no file of the repository; you write only your report.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. **Range to review: `dec8f39b..85966562`** — compute the diff yourself with `git diff dec8f39b..85966562` and `git log dec8f39b..85966562`; confirm that `git rev-parse HEAD` is `85966562` (or that `85966562` is the head you were given), and ask by `questions` where it is not.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; a file it names only when the step or variant that names it comes. You have no skill tool.
- Answers of step 4: **trust boundary: yes** — the change adds and changes code in `src/server/**`, which the part map names as `account-server`'s trust boundary; check **crafted input** at every place the change reaches it (a request with no session, a session of a player, a session of a blocked account, a body naming another account's identifier or other fields, a role read from the session instead of the database, an unknown stored value). **Irreversible operation: no**; check that the change only prepares what a human runs on the server.
- Frozen task: `.runs/task-cycles/panel-wlasciciela/task-frozen.md`; plan: `.runs/task-cycles/panel-wlasciciela/plan.md`; no spec. Orchestrator's recorded choices that bind the change: **A1** (each entry of the list carries the role as a fourth field, `role`: `player` or `owner`), **A2** (the foundation step brought the quoting lines `// decision:` of D-112, D-253 and D-354 into line, changing in the tests only the text of those comment lines).
- Your report: `.runs/task-cycles/panel-wlasciciela/reports/review-3-report.md`. Your directory for working copies: `.runs/review-3/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Foundation entries by identifier, with current ranges (the plan's ranges are those of the base `b1904c5b`)

| Decision | Current range |
|---|---|
| D-112 | `foundations/decisions.md:2365-2379` |
| D-137 | `foundations/decisions.md:3082-3103` |
| D-252 | `foundations/decisions.md:6248-6318` |
| D-253 | `foundations/decisions.md:6319-6369` |
| D-354 | `foundations/decisions.md:9886-9912` |
| D-400 | `foundations/decisions.md:10700-10716` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

D-410 is the plan's "new decision on the role" and D-411 its "new decision on the screen of the list". Read the entries your review needs whole; reach for others selectively and name each reach.

## Also in this range, for slice 3

- The executor's report (claims to verify): `.runs/task-cycles/panel-wlasciciela/reports/executor-3-report.md`. Slices 1 and 2 and their reviews passed; this range starts at slice 2's head `dec8f39b`.
- The command is run by a human on the server (D-12) and changes the role that gates the owner panel: check crafted input at its arguments (an address with spaces, upper case, empty, an address not in the database, a third word instead of `owner`/`player`, extra arguments), that a refusal changes nothing and creates no file (no database file at the given path: exit 3), the exit codes, the sentences of the four outcomes, that the event line carries the account's number and no address and appears only after a change, and the last-resort handler of its own (D-253). Mutate the command or its tests at least twice (for instance, make `already-owner` change the database; log the address) and say what you ran.
- Points the executor raised, which you judge: (1) `tests/startup.test.mjs` is in the plan's *Change* but unchanged, as the foundation step already brought its two quoting lines into line (A2) — say whether anything is missing there; (2) the command's reports say "its sessions and emailed links stay as they were" — judge that wording against D-410 and D-137; (3) the test of the unchanged commands passed on its first run, so it guards regressions only — judge whether it proves To do 8 (the commands work on an owner's account, with the same reports and effects as on a player's); (4) it read the glossary entry `owner` only by grep. The edit of `guidelines/coding.md` is two event names in `### Logging scope` (D-252 lets an agent add such an item alone): check it against `product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md` where they exist, as `review-change` says for changed guidelines.
- Not part of this slice, kept for the review of the whole change: the Minor findings of the reviews of slices 1 and 2.

## The slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

You judge the slice against the passages of the task below and against its section of the plan, not the plan alone. The executor's selection is the *Read* line of the section. This slice's *Risk*: trust boundary — `src/server/**` (`account-server`: a command that changes the role of an account, which only a human runs, D-12)

### Slice 3 — The command that gives and takes the role

- **Goal:** `src/server/account-role.ts` (new) is the command `node dist/server/account-role.js owner|player <email address>`, made on the pattern of `account-previous-save.ts` and `account-block.ts` in everything that is not the operation: the address normalized as at login; the usage line and `Nothing changed.` on wrong arguments (exit 2), on no existing database file (exit 3), on an unknown address (exit 4), on a database that cannot be opened or changed (exit 1, the JSON line of the failure first); its own last-resort handler named `account-role`; one sentence for each of the four outcomes of the role change of Slice 2 (made owner, already owner, made player, already player); one JSON line of an event with the account's number and no address after a change only, the events `account-owner-granted` and `account-owner-revoked`, which are added to the list of the business events in `### Logging scope` of `guidelines/coding.md` (edit through the project skill `the-way-maintain-coding-guidelines`, read `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md`). Tests, written first, in `tests/account-owner.test.mjs` by the pattern of the tests of `account-previous-save` in `tests/account-storage.test.mjs`: each outcome and its exit code beside an open connection, usage error, unknown address and unusable database changing nothing and creating no file, the event lines, the failure line. The test of the unchanged commands (task To do 8): `account-block` blocks and unblocks, and `account-previous-save` grants and revokes, an account whose role is owner, with the reports and effects they have for a player, and a command refused or failed changes nothing as before. The lines `// decision: D-112 …` and `// decision: D-253 …` in `tests/startup.test.mjs` quote the wording of those decisions as the foundation step wrote it. No other file of the server changes, and neither `account-block.ts` nor `account-previous-save.ts`.
- **Change:** `src/server/account-role.ts` · `tests/account-owner.test.mjs` · `guidelines/coding.md` · `tests/startup.test.mjs`
- **Read:** `guidelines/testing.md` · `src/server/account-block.ts` · `src/server/account-previous-save.ts` · `src/server/log-line.ts` · `foundations/decisions.md:3074-3092` D-137 · `foundations/decisions.md:10672-10685` D-400 · `foundations/decisions.md:6234-6299` D-252 · `foundations/decisions.md:6301-6350` D-253 · `foundations/decisions.md:9858-9883` D-354 · `foundations/decisions.md:2357-2370` D-112 · `tests/account-storage.test.mjs:2720-2780` · `tests/account-storage.test.mjs:3072-3320` · `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-38` To do · the new decision on the role · the glossary term "owner"
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (`account-server`: a command that changes the role of an account, which only a human runs, D-12)
- **Checks:** `npm run typecheck` · `npm test -- tests/account-owner.test.mjs` · `npm test -- tests/account-storage.test.mjs` · `npm test -- tests/startup.test.mjs` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 2 · the foundation entries D-252 · D-253 · D-354 · the new decision on the role

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
