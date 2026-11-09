# Handoff - Slice 10 (executor, `make-change`)
## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The plan and the task can be wrong: if a value, a line number or a sentence in them does not pass your own reckoning,
say so in the report instead of fitting the code to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- The slice's base: `f7f0726`. The head you start from: `f7f0726`. Your range runs from `f7f0726`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.
- Class of model the orchestrator set for this slice: same (sonnet).
- The foundation step is done: decisions D-352, D-353, D-354 were added at the end of `foundations/decisions.md`, the rule "Recording a failure" of `guidelines/coding.md` was extended,
  and the line of D-254 was wrapped (every decision after D-254 moved one line down against the ranges the plan gives; the identifier is the address, the range only its size at the base).

## Your stage and its boundary

- You make: **a slice, or the retry of a slice** - Slice 10 of the plan, below. Method: read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/slice.md` whole;
  read `.the-way/task-cycle/change/ui_check.md` before you finish a change that alters what a screen shows.
- You do not open the whole plan or the whole task: your section of the plan and the passages below are your reading, besides the files and entries named in *Read*.
  The passages of the task bind where your section says less.
- Do the work yourself; dispatch no subagent. Run only the focused checks of the slice's *Checks*; **never run the product's gate (`npm test` without arguments)**, also if a text below names it - report that as a mismatch.
- Commit your work with explicit paths (`git add <path> ...`, never `git add -A`); commit messages in English in the form of the repository's earlier commits (`<type>: :emoji: <what>`, see `git log`). Never return an uncommitted change.
- A temporary defect you put in the code to see a test fail is taken out again before you commit; the report records the failing run and the passing run, each as a command and an exit code.
- Trust boundary: the cycle's answer at start is *yes* (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where your slice touches them, a crafted input at that boundary is part of your own-work check.
- Irreversible operation: none; the cycle prepares and never performs one.
- Privacy: no secret, password or personal data in your report, and none in any file you write.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-10-report.md`.

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 10")

### Slice 10 — An emailed link pasted into the tab of an open game reloads the page

- **Goal:** when the address of a tab whose game is open changes to an emailed link's fragment —
  `#confirm-email=…` or `#reset-password=…`, as `readConfirmationToken` and `readResetToken` read
  them — the page reloads, and the reloaded page does what a page opened by that link does (D-156,
  D-224, D-225, D-281's fragments of emailed links), instead of the listener of `address.onChange`
  in `src/browser/view/game-view.ts:815`–`:822` resolving the fragment as a screen and replacing it
  with Siedziba (To do 21, Settlement 1). Any other change of the address goes on as today. The
  reload goes through the `PageAddress` the page already receives (`src/browser/view/email-confirmation.ts:15`–`:28`,
  `browserAddress` at `:80`–`:102`), so the test's address sees it (see *Choices*). Tests in
  `tests/view/account-screen.test.mjs`, with its `fakeAddress`, show a reload for both fragments and
  none for a screen's address; written first and seen failing on the base. Since jsdom proves no real
  `hashchange`, the slice operates the running game once as `.claude/skills/loop2-play/SKILL.md`
  gives: signed in, a `#confirm-email=…` fragment typed into the address bar of the open game
  reloads the page, which shows the confirmation's sentence; the evidence in the report (D-254).
- **Change:** `src/browser/view/game-view.ts` · `src/browser/view/email-confirmation.ts` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:22-22` Need, the fourth point ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:61-61` To do, item 21 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:94-99` Questions to settle, „Co robi otwarta gra…” ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:130-146` Decisions in play ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:148-156` Settlements to record ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  Foundation entries: Settlement 1 as written ·
  `foundations/decisions.md:5986-6020` D-281 · `foundations/decisions.md:5936-5984` D-280 ·
  `foundations/decisions.md:1799-1812` D-96 · `foundations/decisions.md:2924-2937` D-156 ·
  `foundations/decisions.md:4229-4249` D-224 · `foundations/decisions.md:4251-4285` D-225 ·
  `foundations/decisions.md:3741-3801` D-207 · `foundations/decisions.md:5201-5228` D-254 ·
  `foundations/decisions.md:5443-5473` D-264 · `foundations/decisions.md:5574-5617` D-268 ·
  `foundations/invariants.md:889-898` email-confirmation-link ·
  `foundations/invariants.md:1079-1088` password-reset-link ·
  `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  `foundations/part_map.md:3-28` browser-view · `foundations/glossary.md:87-91` headquarters ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/app.ts` · `src/browser/view/password-reset.ts` ·
  `src/browser/view/screen-address.ts` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** same — the orchestrator raised it from `cheaper`: it adds a member to a type that every fake address of the view's tests implements, changes what the page does on an address change, and ends with operating the running game in a real browser
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/email-confirmation.test.mjs` ·
  `npm test -- tests/view/password-reset.test.mjs`; the game operated once in a real browser as
  `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Foundation entries: Settlement 1

## The plan's Choices (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Choices")

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| To do 4 gets no slice: the orchestrator's base run shows the class running and passing, so the task's condition does not hold | a slice that rewrites the class's PowerShell preparation anyway | the class could stop running again on another state of the machine, and only a reader of the gate's output would see it, as before |
| Slice 2 keeps the non-zero exit code `account-backup` gives today when its cleanup fails, and changes only the failure's name and the operator's sentence | exit 0 after a whole backup — the nightly script would send it, but the plain copy left in the container's `/tmp` would reach the owner by no notice; a new exit code of its own — the skill's table of the command's codes in `backup_and_restore.md` changes in two copies for a rare case whose sentence, in the backup log, already says which | one night's backup is not sent each time only the cleanup fails; the owner learns it from the notice and the log |
| Slice 4 tells the block apart where the session write learns it, carried from the database to the error handler of the session callback | reading the account's blocked state again after the write failed — a second query, and an unblock in between turns a block's refusal back into a failure line | a cause wrongly read as the block hides a real failure of the session write |
| Items 9, 10 and 17 are three slices in a chain over `src/server/app.ts` and `tests/http.test.mjs`, after Slice 1 | one slice of all three — a reviewer judges a change of behaviour, a second one and a gap of tests at once | three reviews of a trust boundary instead of one |
| Item 15 joins the simulation's test slice (Slice 9), though it guards `loop.ts`, not the load | a slice of its own | none beyond a larger review of Slice 9 |
| Slice 8 observes what the client hands the real `fetch` and lets it reach the file's real local server | a stand-in for `fetch` — against the example "Test na prawdziwym lokalnym serwerze" of `guidelines/coding-browser-api-client.md` | a wrapper that changes the request would test the wrapper; the review checks that it passes the call on unchanged |
| Slice 10 reloads through the `PageAddress` the page already gets, which gains the reload | `location.reload()` called in `game-view.ts` — no test of the view can see it | one more member of a type every fake address of the tests implements |
| Slice 11 sends docker's own error text to standard error, which stays in the terminal, and puts in the report only the docker step and its exit status | docker's text in the report — the report is copied into the request, and docker's message over `DOCKER_HOST=ssh://…` can carry the server's name or address, which D-13 keeps out of requests | Mariusz has to read the terminal, not only the file, to see the reason |
| Slice 12 keeps the tunnel's H1–H5 and renames the mail's and the saved-game's steps | renaming all three families — the tunnel's names stand also in `backup_and_restore.md`, in `troubleshooting.md`'s section on abandoning the request and in further places, so more files and more references to miss | the tunnel's steps keep a name as generic as before |
| The 5-second `timeout` of `refusedStart` (`tests/startup.test.mjs:95`) stays as it is, though several cases use it (the orchestrator's answer to the planner's open question) | raising it with item 2 — the task and the review row name only the occupied-port case, and nobody has seen `refusedStart` fail | a later load failure of another case of the same file, to be a remark of a later task |
| Slice 12 changes the text of the measuring section only for items 26 and 27 and leaves the launcher without a signal handler | a signal handler in `scripts/measure-passwords.mjs` that removes the container — the task asks the skill to say how, and a killed terminal or lost connection runs no handler anyway | none |

## Passages of the task your *Read* names (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/task.md`, lines as given)

### `task.md:22-22`

- Gracz, który wklei link z maila potwierdzającego albo resetu hasła do karty z już otwartą grą, ląduje w Siedzibie, a link przepada bez potwierdzenia (loop2#055-3).

### `task.md:61-61`

21. Gdy w adresie karty z już otwartą grą pojawi się link z maila (`#confirm-email=…` albo `#reset-password=…`), strona przeładowuje się i dalej robi to, co strona otwarta tym linkiem (pytanie „Co robi otwarta gra…”; loop2#055-3; `src/browser/view/game-view.ts:817`–`:822`, `src/browser/app.ts:584`–`:589`).

### `task.md:94-99`

- Co robi otwarta gra, gdy do jej karty wklei się link z maila?
  - Answer: A — strona przeładowuje się, gdy w adresie otwartej gry pojawi się link z maila, i dalej dzieje się to, co przy otwarciu linku w nowej karcie; przeładowanie w trakcie ręcznego przejścia opiera się na ostatnim zapisie przy ukryciu strony, który według D-207 nie ma gwarancji dotarcia, więc w złym razie przepada do 30 sekund gry.
  - Not chosen:
    - B. Otwarta gra sama obsługuje link bez przeładowania — nic nie przepada, ale powstaje druga droga obok startu strony, więcej kodu i testów, a gra musi znikać przy formularzu resetu (D-96)
    - C. Zostaje jak jest, a D-281 dopisuje, że otwarta gra traktuje link z maila jak adres bez ekranu — zero kodu; gracz nadal traci link bez słowa
  - Source: Mariusz, 2026-11-08: „A”

### `task.md:130-146`

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

### `task.md:148-156`

## Settlements to record

Candidates: 8 shown, 3 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gdy w adresie karty z już otwartą grą pojawi się link z maila (`#confirm-email=…`, `#reset-password=…`), strona przeładowuje się i robi to, co strona otwarta tym linkiem. | decision | pytanie „Co robi otwarta gra…”, Answer i Not chosen | czy dopisać to obok D-281 i D-96, czy zostawić w samym kodzie; bez wpisu późniejsza zmiana adresów ekranów może po cichu wrócić do „link przepada” |
| 2 | Przeglądarka zrywająca wysyłanie treści żądania i odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to spodziewany przebieg, nie awaria, i nie zostawiają wiersza awarii; inna przyczyna nieudanego zapisu sesji zostaje awarią. | decision | pytanie „Co jest awarią…”, Answer (1), (2) i Not chosen | czy przy następnej zmianie obsługi błędów serwera te dwa przypadki znów zapisać jako awarię, co da fałszywe alarmy strażnika |
| 3 | Zdanie, którym polecenie serwisowe (`account-block`, `account-backup`) odpowiada operatorowi, nie jest wierszem logu; wierszem logu jest tylko wiersz JSON. | decision | pytanie „Co jest awarią…”, Answer (3a) i Not chosen | czy zdanie dla operatora liczyć jako drugi zapis awarii i je usuwać albo przenosić; wytyczna z pozycji 32 potrzebuje decyzji, z której wynika |

## What to return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run,
and the report path. The report holds what `make-change` section 6 gives: the files changed with added and removed line counts, each check as its command and exit code
(the failing run of each test written first included), the own-work check (the requirement most likely not met, the check written and run, what it showed),
each reach beyond this handoff (what, where, why), each choice with the way rejected and its cost if wrong, each adaptation of the plan to the code, and
**Searches not found or unclear** - each thing you looked for and did not find, or that was unclear, wherever it arose, or `none`.
Where the work needs a choice the task and the foundation do not settle, return `returned` with no code; where a fact or permission is missing, `blocked`.
