# Handoff — the foundation step (the plan's *Foundation entries*)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the
human's approval. You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The statements of the task may be wrong: if a value or a sentence does not pass your own reckoning, say so in the report instead of fitting the entry to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`.
- Base (the head you start from, and slice 1's base): `00aa818e59ab484358970f98af1f4ab61e969e4c`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.

## Your stage and its boundary

- Stage: the foundation step of the cycle. Variant: the agent of the plan's *Foundation entries* — it takes none of the rows of the table
  of variants of `make-change`. Read `.the-way/task-cycle/change/SKILL.md` whole for how a change is committed and reported, and
  `.the-way/task-cycle/skill/foundation_step.md` whole for what this step writes. Write each entry through the pinned project skill of its element,
  reading the skill whole: `the-way-record-decision` (decisions) and `the-way-maintain-coding-guidelines` (the guideline rule).
  Where a skill leads the human through a question, you decide on your own recommendation and say so in the report; a question only arises
  in the cases `foundation_step.md` names, and then you return `blocked` or `questions` with every question and your recommended answer.
- Write only: `foundations/decisions.md` (three new decisions and the form-only wrap of D-254) and `guidelines/coding.md` (the rule "Recording a failure"),
  plus what those skills themselves say must follow (a *Relations* link, for example). No code, no test, no other file.
  Do not run the product's gate. Run `python -B .the-way/elements/common/foundation_check.py` from the worktree's root, as the skills give.
- Commit your work (explicit paths, never `git add -A`); one commit per entry is welcome. Messages in English, in the form of the repository's earlier commits
  (`docs: :memo: <what>`, see `git log`).
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/04-foundation-report.md`.

## Answers of the orchestrator's start

- Trust boundary: yes (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`) — not touched by this step.
- Irreversible operation: no. Open design choice: none. Reserved choice: none.

## What you write

The plan's *Foundation entries* (copied below word for word; the plan itself is `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, section *Foundation entries*):

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Settlement 1 — when an emailed link's fragment (`#confirm-email=…`, `#reset-password=…`) appears in the address of a tab whose game is open, the page reloads and does what a page opened by that link does | decision | Settlements to record, row 1 | Slice 10 |
| Settlement 2 — a browser that breaks off sending a request's body, and a session write refused because the account was blocked during a registration, are an expected course and leave no failure line; another cause of a failed session write stays a failure | decision | Settlements to record, row 2 | Slices 3, 4 |
| Settlement 3 — the sentence by which a service command (`account-block`, `account-backup`) answers the operator is no log line; the JSON line alone is the log line | decision | Settlements to record, row 3 | Slice 2; the guideline rule of To do 32 below |
| D-254 — its line at `foundations/decisions.md:5226` (138 characters) wrapped as the neighbouring lines are, no word changed | decision, form only | To do, item 24 (the line of the decision log) | none; Slice 12 wraps the skill's line of the same item |
| `guidelines/coding.md`, rule "Recording a failure" — the operator's sentence of a service command is no log line, so its JSON failure line and the sentence after it are one record of the failure, citing Settlement 3 by the identifier it gets | coding guideline, written through the project skill `the-way-maintain-coding-guidelines` | To do, item 32; Settlement 3 | Slice 2 |

No invariant, glossary term, environment fact or change of the part map: every file the change
touches is already claimed by a part. The foundation step writes the three settlements and D-254
through `the-way-record-decision` and the guideline rule through
`the-way-maintain-coding-guidelines`; no slice writes them.


The rows of *Settlements to record* of the task and the questions they come from (copied word for word from
`.runs/task-cycles/porzadki-z-uwag-pr/task.md:148-156` *Settlements to record*, `:94-99` "Co robi otwarta gra…", `:100-107` "Co jest awarią…"):

## Settlements to record

Candidates: 8 shown, 3 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gdy w adresie karty z już otwartą grą pojawi się link z maila (`#confirm-email=…`, `#reset-password=…`), strona przeładowuje się i robi to, co strona otwarta tym linkiem. | decision | pytanie „Co robi otwarta gra…”, Answer i Not chosen | czy dopisać to obok D-281 i D-96, czy zostawić w samym kodzie; bez wpisu późniejsza zmiana adresów ekranów może po cichu wrócić do „link przepada” |
| 2 | Przeglądarka zrywająca wysyłanie treści żądania i odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to spodziewany przebieg, nie awaria, i nie zostawiają wiersza awarii; inna przyczyna nieudanego zapisu sesji zostaje awarią. | decision | pytanie „Co jest awarią…”, Answer (1), (2) i Not chosen | czy przy następnej zmianie obsługi błędów serwera te dwa przypadki znów zapisać jako awarię, co da fałszywe alarmy strażnika |
| 3 | Zdanie, którym polecenie serwisowe (`account-block`, `account-backup`) odpowiada operatorowi, nie jest wierszem logu; wierszem logu jest tylko wiersz JSON. | decision | pytanie „Co jest awarią…”, Answer (3a) i Not chosen | czy zdanie dla operatora liczyć jako drugi zapis awarii i je usuwać albo przenosić; wytyczna z pozycji 32 potrzebuje decyzji, z której wynika |

- Co robi otwarta gra, gdy do jej karty wklei się link z maila?
  - Answer: A — strona przeładowuje się, gdy w adresie otwartej gry pojawi się link z maila, i dalej dzieje się to, co przy otwarciu linku w nowej karcie; przeładowanie w trakcie ręcznego przejścia opiera się na ostatnim zapisie przy ukryciu strony, który według D-207 nie ma gwarancji dotarcia, więc w złym razie przepada do 30 sekund gry.
  - Not chosen:
    - B. Otwarta gra sama obsługuje link bez przeładowania — nic nie przepada, ale powstaje druga droga obok startu strony, więcej kodu i testów, a gra musi znikać przy formularzu resetu (D-96)
    - C. Zostaje jak jest, a D-281 dopisuje, że otwarta gra traktuje link z maila jak adres bez ekranu — zero kodu; gracz nadal traci link bez słowa
  - Source: Mariusz, 2026-11-08: „A”
- Co jest awarią, a co zwykłym przebiegiem: przeglądarka zrywająca wysyłanie, blokada konta w trakcie rejestracji i zdanie dla operatora po wierszu JSON?
  - Answer: (1) przeglądarka zrywająca wysyłanie treści żądania to spodziewana odmowa, jak za duża albo zepsuta treść, bez wiersza awarii; (2) odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to zamierzony skutek blokady, bez wiersza awarii, a inna przyczyna nieudanego zapisu sesji zostaje awarią; (3a) zdanie, którym polecenie serwisowe odpowiada operatorowi, nie jest wierszem logu — zostaje obok wiersza JSON, a wytyczne to mówią. Każdy fałszywy wiersz awarii stałby się fałszywym alarmem strażnika z zadania „skąd wiem o awarii”.
  - Not chosen:
    - (1) zostawić zerwanie jako awarię — każde zerwane połączenie gracza daje alarm
    - (2) zostawić odmowę zapisu sesji przy blokadzie jako awarię — rzadki fałszywy alarm
    - (3b) usunąć zdanie dla operatora — po blokadzie albo jej odmowie operator widzi w terminalu sam JSON, wbrew D-137
    - (3c) usunąć wiersz JSON — awaria polecenia nie trafia do logu, wbrew D-252
  - Source: Mariusz, 2026-11-08: „tak, przyjmuję rekomendacje” (rekomendacje: 1 zmienić, 2 zmienić, 3a)

Items 24 and 32 of *To do* (`task.md:67` and `task.md:81`), word for word:

24. Linia D-254 w `foundations/decisions.md` (dziś `:5226`, 138 znaków) i linia 35 `.claude/skills/loop2-play/SKILL.md` (127 znaków) są zawinięte jak sąsiednie, bez zmiany treści, w obu kopiach skilla (loop2#050-10, 050-11).
32. Reguła „Recording a failure” w `guidelines/coding.md` mówi, że zdanie, którym polecenie serwisowe (`account-block`, `account-backup`) odpowiada operatorowi, nie jest wierszem logu, więc wiersz JSON awarii i zdanie po nim to jeden zapis awarii; zmianę wytycznych robi skill `the-way-maintain-coding-guidelines` (pytanie „Co jest awarią…”; loop2#051-7, a w sekcji „Zadanie 4” źródła loop2#051-13).

The task's *Decisions in play* (`task.md:130-146`, word for word):

## Decisions in play

- D-84 — Which real mechanisms do new or changed tests exercise?: „A test of file or HTTP failure uses real temporary files or a real local server, waits for a readiness event or condition with a time limit and error handling, and cleans up its files, servers and processes even after failure; polling a condition is allowed…”
- D-77 — How are tests selected and limited as a whole?: „There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.”
- D-252 — How does loop2 write its failures to its logs, and what does it log?: „A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names, while its Bash scripts keep their own text and a line in the browser's console is plain text.” Jego *Verification* uznaje za zgodne „a failure the server handled written as one line with `failure`, `kind`, `code` and `place` and the `accountId` of its case”.
- D-137 — How does the operator block and unblock a player account?: „…with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction…”
- D-207 — When does the game save the game state on the server?: „…the browser has at most one save request in flight, each sent with `keepalive`…”
- D-213 — Which file is the exemplar for saved-game code?: „Saved-game code turns … an unknown value … into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it.”
- D-96 — What does a player see before and after signing in?: „…a page opened by a password-reset link shows the form „Ustaw nowe hasło” (D-225) in the card, for a signed-in player too, and builds no game while that form stands. … and after an emailed link (D-156, D-224) the page opens Siedziba.” oraz „a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game”.
- D-281 — How does an address name a screen?: „The fragments of emailed links (D-156, D-224) stand apart from these, and after them the page opens Siedziba.”
- D-156 — How does an emailed link confirm a player's email address?: „The game page the link opens sends the token to the account server in a request meeting D-104, also without a session…”
- D-224 — What form does a password-reset link take?: „The game page reads the token from the fragment of its address and sends it only with the form „Ustaw nowe hasło”, in a request meeting D-104.”
- D-160 — What does an emailed link of a blocked account do?: „A link that a block stopped stays stopped after the account is unblocked, and the player, signed in again, asks for a new confirmation message with „Wyślij ponownie”.”
- D-13 — Where do the server's access values and secrets live?: „…runtime credentials live outside the checkout in … `/etc/loop2/smtp-password` for the mail service … and grants the root-owned SMTP password file with group 1000 and mode 0440 only to the application as `/run/secrets/loop2_smtp_password`…”
- D-17 — How does loop2 share the Mikrus host with other workloads?: „A deployment of loop2 changes nothing on the host but loop2's own checkout, application and connector images and containers, its named database volume `loop2_accounts`, log and lock, and the build cache and base images its builds add to the shared Docker store, which it never prunes…”
- D-113 — Which file is the exemplar for password hashing?: „Hashing and verification share one bounded admission gate, preserve password content, and use one explicit Argon2id profile, measured with that gate in the deployed container image.”
- D-207, D-96, D-156 i D-224 mówią o stronie, którą link otwiera; żaden wpis nie mówi, co robi strona już otwarta, gdy fragment z maila pojawi się w jej adresie.

## How to read and write

- Select your reading by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and by the skills named above; the orchestrator names these
  decisions for you to read whole in `foundations/decisions.md`: D-281 · D-96 · D-156 · D-224 · D-225 · D-252 · D-253 · D-137 · D-160 · D-207 · D-254.
  Guideline file to read whole before you change it: `guidelines/coding.md`.
- Row 1 (Settlement 1), row 2 (Settlement 2), row 3 (Settlement 3): each is written whole as an entry of its kind, its meaning the row's and its wording yours (WAY-134).
  Search the whole foundation once for an entry that already states the same (WAY-33): a row already stated becomes no second entry, you tie it to that entry and the report says so.
  Mind D-96 / D-281 / D-156 / D-224 for row 1, D-252 / D-137 for rows 2 and 3, and give each entry the *Scope* parts the decision log's rules require
  (rows 1: browser-view; row 2: account-server; row 3: account-server, build-tools, agent-workflow if the skill's rules say so — decide by the rules, not by this list).
- The wrap of D-254 (To do 24): form only. Its line `foundations/decisions.md:5226` is 138 characters; wrap it as the neighbouring lines are; **no word changes**.
  Show with `git diff --word-diff` that no word changed. The line numbers may have moved: find the line by the sentence of D-254.
- The guideline rule (To do 32): in `guidelines/coding.md`, rule "Recording a failure": it must say that the sentence by which a service command (`account-block`, `account-backup`)
  answers the operator is not a log line, so the JSON failure line and the sentence after it are one record of the failure; it cites Settlement 3 by the identifier the decision gets.
  Keep the rule's other sentences; change as little as the meaning needs. The guidelines' own checks (`guidelines/` metadata, the decisions cited in the rule's header) follow the skill.
- The code and the line numbers of the task are not yours to change or to fit the entry to.

## What to return

Status (`done`, `done with concerns`, `questions`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report path.
The report holds, besides what `make-change` section 6 asks (files changed with line counts, each check as command and exit code, reaches beyond the handoff, choices with the way rejected and the cost if wrong):
for each entry one sentence of its meaning in English and one in Polish (the task's language), marked `row 1`, `row 2`, `row 3`, `the cycle's` (D-254, the guideline rule) as `foundation_step.md` gives;
the identifier each new decision got; whether the search of the whole foundation found an entry that already states a row; and **Searches not found or unclear** — each thing you looked for and did not find or that was unclear, or `none`.
The own-work check (section 3 of `make-change`): name the requirement you most likely fail (for example a changed word in the wrap of D-254, or a *Scope* that does not match the part map), write the check and report what it showed.
