# Handoff — the agent of the plan's *Foundation entries*

You write the foundation entries of one task of the loop2 repository, in a task cycle run by an orchestrator. The person who requested the cycle delegated intermediate choices to the orchestrator; your questions go to the orchestrator, never to the human, and no answer is the human's approval.

- Worktree (work from its root): `the task's worktree`, branch `task/programy-ze-starych-zapisow`, base `6f237fb8ce26450706d8738d3d3a07298e8ec110` (HEAD now; this is slice 1's base too). You commit on this branch.
- Method: this is the plan's *Foundation entries* row, which takes no row of `make-change`'s variants. Read in full `.the-way/task-cycle/skill/foundation_step.md` (the-way pinned at `55afa8e57aa1b83c77108576a36642722e0dda15`), and the skill of each element when you write an entry of it: the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`. Where `foundation_step.md` or an element's skill names a file, read it when the step that names it comes. Do not substitute a personal skill of the same name.
- Stage and boundary: you write the entries below, only in `foundations/**` (no code, no test file, no guideline file, no skill). The code of the change is made later by other agents in 9 slices; invariants whose method is `test` name the tests of slices 1, 2 and 6 by the plan (`plan.md`); you write the invariant entries as the element's skill gives and do not write the tests. Guidelines are left to their slices.
- Frozen task, read whole: `docs/task-cycles/programy-ze-starych-zapisow/task.md`. Reviewed spec, read whole: `docs/task-cycles/programy-ze-starych-zapisow/spec.md` (its last section *Decisions (settled by the orchestrator after the review of the spec)* binds too). Plan, read whole: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`.
- Report path: `docs/task-cycles/programy-ze-starych-zapisow/reports/foundation-entries-report.md`

## Answers of the orchestrator at start

- Trust boundary: yes — `src/server/**`, `src/browser/sim/saved-game.ts` and by the spec the new `src/browser/sim/previous-programs.ts`. Irreversible operation: no. Reserved choice: none. Open design choice: settled by the reviewed spec.
- D-209 and D-213 stay as they are (the task says "Bez zmiany" for both, and the spec keeps them). The plan's E24 (D-44 changed) is the orchestrator's addition after the plan's review; the spec does not list it, the plan row does; write it.
- The decisions' *Rejected* take the ways the spec and the task's *Questions to settle* ("Not chosen") keep; where neither gives a way, `none considered` or `unknown` as the template gives.

## What to read (selected by the orchestrator; read each whole)

- Foundation, in `foundations/`: `part_map.md`, `glossary.md` (whole); the-way's glossary at `.the-way/foundations/glossary.md`; decisions D-01, D-02, D-07, D-44, D-96, D-104, D-109, D-112, D-114, D-137, D-164, D-165, D-166, D-167, D-169, D-202, D-204, D-205, D-206, D-207, D-208, D-209, D-210, D-211, D-212, D-213, D-229, D-353, D-354, D-355, D-386, each from its heading to the next; invariants save-version, saved-state-http-exchange, saved-program-edit, copy-save, account-save-sqlite-store, account-save-sqlite-upgrade, account-schema-lifecycle, account-database-schema, account-save-durable-storage, account-save-backup, player-save-isolation, account-session-authorization, account-mutation-request-guards, account-client-requests, account-client-outcomes, blocked-account-access, each whole.
- Then, once each entry is settled, the search of the whole foundation that `.the-way/elements/common/way_of_working.md` step 2 gives.

## The entries to write — copied word for word

## Foundation entries

Written before slice 1, by the skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term` and `the-way-update-part-map`, from the spec's *Foundation entries*. The plan names them; it does not word them. D-209 and D-213 stay as they are. A row is referred to below by its label E1 to E24.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 — D-206 (a saved game state of another version is kept by the server as the previous save; its programs can be pulled one by one) | decision, changed | spec *Foundation entries*; settlements rows 1, 3, 4 | Slices 1, 6, 7 |
| E2 — D-104 (the 64 KiB limit covers the previous save; up to two documents per player; the reset route takes 16 KiB) | decision, changed | spec *Foundation entries* | Slices 1, 2 |
| E3 — D-109 (the session alone authorizes reading its own previous save and the reset, each with the privilege) | decision, changed | spec *Foundation entries* | Slice 2 |
| E4 — D-112 (schema version 5: the flag and the table of previous saves; the moves and the privilege write read their conditions in their transaction) | decision, changed | spec *Foundation entries* | Slices 1, 3 |
| E5 — D-210 (an accepted save of a higher version moves the stored one to the previous slot) | decision, changed | spec *Foundation entries* | Slice 1 |
| E6 — D-167 and D-169 (the list of programs gains the pull; a pulled program with a taken name gets "(n)") | decisions, changed | spec *Foundation entries*; settlements rows 3, 4 | Slices 6, 7 |
| E7 — D-354 (the service commands include the new one) | decision, changed | spec *Foundation entries* | Slices 3, 4 |
| E8 — D-355 (the lines a human appends are those of `account-block` and of the new command) | decision, changed | spec *Foundation entries* | Slices 3, 4 |
| E9 — the previous save: one document per account, for every account, written by the two moves, never read by the game's load | decision, new | spec *Foundation entries*; settlements row 1 | Slices 1, 2, 6 |
| E10 — the privilege: a flag on the account, granted and revoked by the operator command, one flag for pull and reset, the two routes and the account field, 403 without it | decision, new | spec *Foundation entries*; settlements row 2 | Slices 1, 2, 3, 4, 5 |
| E11 — the pull: the button, the reader of programs in its own file, the append with numbering, the skipped programs named | decision, new | spec *Foundation entries*; settlements rows 3, 4 | Slices 6, 7 |
| E12 — the reset: the control with its confirmation, the server's move, the new game with no save before it | decision, new | spec *Foundation entries*; settlements row 5 | Slices 1, 2, 8, 9 |
| E13 — `save-version` (the game loads no data from another version except the programs a privileged account pulls through the check of the editor) | invariant, changed | spec *Foundation entries* | Slice 6 (its test) |
| E14 — `account-client-outcomes` (the account holds also the boolean `previousSaveAllowed`) | invariant, changed | spec *Foundation entries* | Slice 5 (its test) |
| E15 — `account-session-authorization` (the two new routes answer JSON 401 without a session) | invariant, changed | spec *Foundation entries* | Slice 2 (its test) |
| E16 — `account-mutation-request-guards` (the reset route is under the guards of D-104) | invariant, changed | spec *Foundation entries* | Slice 2 (its test) |
| E17 — `player-save-isolation` (the previous save belongs to the account like the current one) | invariant, changed | spec *Foundation entries* | Slices 1, 2 (their tests) |
| E18 — `account-schema-lifecycle` and `account-database-schema` ("current version" and the rows kept include the previous saves and the privilege) | invariants, changed | spec *Foundation entries* | Slice 1 (its tests) |
| E19 — new invariant, method `test`, part account-server: a save of a higher version moves the stored one to the previous slot and nothing else but the reset does; the reset refuses an account without the privilege and moves nothing; the previous-save route answers 403 to an account without the privilege whatever the slot holds. Its check: the cases of slices 1 and 2 that carry its marker | invariant, new | spec *Foundation entries* | Slices 1, 2 |
| E20 — new invariant, method `test`, part simulation: the reader of programs reads only `version`, `game.programs` and the items, accepts each program only through the check of the editor, skips an item that is not exactly `id`, `name`, `program`, and throws for no value of a document. Its check: the cases of slice 6 that carry its marker | invariant, new | spec *Foundation entries* | Slice 6 |
| E21 — glossary term **previous save** | glossary, new | spec *Foundation entries* | Slices 1, 2, 6, 7 |
| E22 — glossary term **previous-save privilege** | glossary, new | spec *Foundation entries* | Slices 1, 2, 3, 5 |
| E23 — part map: the description of `account-server` names the second operator command; the *Trust boundary* of `simulation` gains `src/browser/sim/previous-programs.ts`; the new test files are claimed by their parts already (`tests/sim/**`, `tests/view/**`), so no file of this plan needs a claim of its own | part map, changed | spec *Foundation entries* | Slices 3, 6 |
| E24 — D-44 (the reset button „Zacznij od zera” joins the destructive buttons, neutral until the pointer or the focus reaches it and then in `danger`; its pending state is the disabled control) | decision, changed | orchestrator's review of the plan, concern 2 of the planner's report: D-44 and the styleguide name the destructive buttons one by one | Slice 8 |

### The spec's list of the same entries (the spec's wording of what each says)

## Foundation entries

Entries the change will write or change; the foundation step words them.

Decisions, changed:

- **D-206** (decision, changed): a saved game state of another version is still not loaded as a game and the player starts anew, but the server keeps it as the previous save, and an account with the privilege can append its programs one by one; "including the player's programs" no longer means they are lost.
- **D-104** (decision, changed): the 64 KiB limit applies to the previous save too, so the server stores up to two documents per player; the new reset route takes the 16 KiB limit of the small routes.
- **D-109** (decision, changed): the session alone also authorizes reading its own account's previous save and the reset, each with the privilege of the account.
- **D-112** (decision, changed): the schema version is 5, with the flag of the privilege on accounts and the table of previous saves; the save write moves the replaced document in the same transaction; the reset and the privilege write read their conditions in their transaction.
- **D-210** (decision, changed): the accepted save of a higher version moves the stored one to the previous slot.
- **D-167** and **D-169** (decisions, changed): the list of programs gains the pull; a pulled program with a taken name gets "(n)".
- **D-354** (decision, changed): names the new command beside `account-block` and `account-backup`.
- **D-355** (decision, changed): the lines a human appends to the log file are those of `account-block` and of the new command.

D-209 and D-213 are not changed (constraints above).

Decisions, new:

- The previous save: one document per account, for every account, written by the two moves of decision 3, never read by the game's load (settlement 1 of the task).
- The privilege: a flag on the account, granted and revoked by the operator command of decision 5 in the manner of D-137, one flag for pull and reset; the two routes and the field of the account answer; the 403 for an account without it (settlement 2).
- The pull: the button, the reader of programs in its own file, the append with numbering, the skipped programs named (settlements 3 and 4).
- The reset: the control with its confirmation, the server's move, the new game, with no save before it (settlement 5).

Invariants:

- `save-version` (changed): the game loads no data from a saved game state of another version, except the programs a privileged account pulls one by one through the check of the editor.
- `account-client-outcomes` (changed): the account the client returns holds also the boolean `previousSaveAllowed`.
- `account-session-authorization` (changed): the two new routes answer JSON 401 without a session; `account-mutation-request-guards` (changed): the reset route is a state-changing route under the guards of D-104.
- `player-save-isolation` (changed): the previous save belongs to the account like the current one.
- `account-schema-lifecycle` and `account-database-schema` (changed): "current version" and the rows kept now include the previous saves and the privilege.
- New, `test`, part account-server: a save of a higher version moves the stored one to the previous slot, and nothing else but the reset does; the reset refuses an account without the privilege and moves nothing; the previous-save route answers 403 to an account without the privilege whatever the slot holds.
- New, `test`, part simulation: the reader of programs reads only `version`, `game.programs` and the items, accepts each program only through the check of the editor, skips an item that is not exactly `id`, `name`, `program`, and throws for no value of a document.

Glossary:

- **previous save** — the one saved game state the server keeps beside the current one: the one a save of a higher version or a reset replaced.
- **previous-save privilege** — the flag the operator sets on an account that allows it to pull the programs of its previous save and to start the game anew.

Part map (`the-way-update-part-map`): the description of `account-server` names the second operator command (the grant and revoke of the privilege); the *Trust boundary* of `simulation` gains `src/browser/sim/previous-programs.ts`, since the file reads a document that came from the network; the new test files the change adds are claimed by their parts (`account-server` for the server tests, `browser-view` for `tests/view/**` and `tests/account-api.test.mjs`, `simulation` for `tests/sim/**`).

Outside `foundations/`, by the same change: `guidelines/coding.md` (the events `account-previous-save-granted`, `account-previous-save-revoked` and `saved-game-reset` in "Logging scope", and the new command beside `account-block` in "Recording a failure"), `guidelines/testing.md` (rows for the new behaviour), the skill and its references of decision 5, and `guidelines/coding-simulation-module.md` (the new file in its table of files, as a copy of the kind). `guidelines/coding-saved-game.md` is not changed.

### The task's *Decisions in play*

## Decisions in play

- **D-206** — „A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one. The game discards a saved game state of any other version in full, including the player's programs, and starts the player anew. A saved game state whose character names an archetype missing from the data is also discarded whole.”
  - Zmiana, którą robi zadanie (odpowiedzi 1, 3 i 4): zapis innej wersji dalej nie wczytuje się jako gra i gracz zaczyna od nowa, ale serwer odkłada go jako poprzedni zapis, a konto z uprawnieniem wciąga z niego programy przyciskiem; skreślone zostaje „including the player's programs” w sensie „programy przepadają”. Razem z decyzją zmienia się wyprowadzony z niej niezmiennik `save-version` („The game loads no data from a saved game state whose version differs from the game's current version of the saved game state's shape.”) o wyjątek programów wciąganych na żądanie przez konto z uprawnieniem.
- **D-104** — „…while the server stores at most 64 KiB of each player's saved game state.”
  - Zmiana (odpowiedź 1): ten sam limit obejmuje poprzedni zapis; serwer trzyma na gracza do dwóch takich dokumentów.
- **D-210** — „The server refuses a save of the game state whose version of the shape is lower than the version of the saved game state it holds, comparing that number before the basis of D-209 and reading nothing of the game.”
  - Zadanie dokłada (odpowiedź 1): przyjęcie zapisu wyższej wersji odkłada dotychczasowy jako poprzedni zapis; serwer dalej porównuje tylko numer wersji.
- **D-07** — „The server holds the players' accounts and each player's saved game state, and computes nothing of the game.” Bez zmiany: serwer przechowuje i przenosi dokumenty, nie czyta programów; programy z poprzedniego zapisu sprawdza przeglądarka.
- **D-137** — „The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. … The `loop2-deploy` skill describes the command, and only a human runs it on the server.” Bez zmiany; polecenie uprawnienia (punkt 2) idzie tym wzorem.
- **D-213** — „Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value … into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it.” Bez zmiany: wczytanie zapisu zostaje ścisłe; wciąganie czyta z poprzedniego zapisu tylko programy, każdy sprawdzany jak program z edytora.
- **D-96** — „…a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game, above which stands once, in `warning`, „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” for the first two…” Bez zmiany.
- **D-209** — „The server gives each save of the game state it accepts a revision one higher than the one before, starting at 1, and accepts a save only when it names as its basis the revision of the saved game state the server holds, or 0 where the account has none, refusing every other.” Bez zmiany; po resecie konto nie ma zapisu, więc karta otwarta przed resetem dostaje odmowę jak dziś.

### The task's *Settlements to record*

## Settlements to record

Candidates: 6 shown, 5 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Serwer odkłada na każdym koncie jeden poprzedni zapis — ten, który zastąpił zapis wyższej wersji albo reset — a kolejne odłożenie nadpisuje wcześniejszy; dotyczy każdego konta, z uprawnieniem czy bez. | decision | *Questions to settle* 1 (wybór Mariusza) | ile zapisów i dla których kont trzyma serwer oraz kiedy je odkłada |
| 2 | Uprawnienie to znacznik na koncie, nadawany i zdejmowany poleceniem człowieka w kontenerze jak blokada konta, i jeden znacznik obejmuje wciąganie programów i reset. | decision | *Questions to settle* 2 (wybór Mariusza) | czym jest uprawnienie, kto je nadaje i czy wciąganie i reset mają osobne uprawnienia |
| 3 | Konto z uprawnieniem wciąga programy przyciskiem „Wciągnij programy z poprzedniego zapisu” na ekranie Programy w dowolnej chwili, gdy poprzedni zapis istnieje. | decision | *Questions to settle* 3 (wybór Mariusza) | czy wciąganie jest jednorazowe przy wczytaniu, czy stałe, i gdzie stoi |
| 4 | Wciągnięte programy dopisują się na koniec listy z kolejnym numerem przy zajętej nazwie, a program, którego dzisiejsza gra nie przyjmuje, jest pomijany i gra podaje nazwy pominiętych. | decision | *Questions to settle* 4 (wybór Mariusza) | czy programy zastępują listę i czy jeden zły program przerywa wciąganie |
| 5 | Konto z uprawnieniem resetuje grę od zera przyciskiem „Zacznij od zera” z potwierdzeniem, a bieżący zapis przechodzi na miejsce poprzedniego zapisu. | decision | *Questions to settle* 5 (wybór Mariusza) | czy reset jest w grze czy na serwerze i czy zachowuje programy do wciągnięcia |

## Report

Write the full report to the report path: for each entry its identifier, one sentence of its meaning in English and one in Polish, and its mark (`row <n>`, `projected` or `the cycle's`) as `foundation_step.md` gives; the search of the foundation (WAY-33) and what it found; every question. Return: status (`done`, `done with concerns`, `questions` or `blocked`), your commits (explicit `git add <paths>`, never `git add -A`; commit messages in English in the style of `git log` of this repository, written with `git commit -F <file>` when they hold quotes), a one-line check result naming what failed or did not run (you may run `python -B .the-way/elements/common/foundation_check.py` once at the end and report its command and exit code; run no other check; do not run the product's gate), the report path, your questions, the reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), and the own-work check that `make-change` asks for where it applies to this stage. After the first commit run `git log --format='%h %ae' -1`: the author address must be the private address of the account of this repository; say what it shows.
