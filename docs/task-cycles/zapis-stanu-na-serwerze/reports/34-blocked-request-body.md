**Blocked — draft.** A blocking finding of the review of the return step remains after its one fix (*Blocked by review* below). Under the-way's rule the cycle ran no third round and made no reconciliation with `main` on code its review did not accept. Your decision on that finding comes first; the human actions H1 and H2 wait for the correction run after it (*Human actions*).

The game state is now saved on the server and comes back after sign-in in another browser. The server keeps each player's whole saved game state in the same SQLite database as the accounts, in schema version 4 (`loop2_accounts`, accounts, sessions and emailed links kept). The browser loads it with `GET /api/saved-game` and replaces it with `PUT /api/saved-game` (64 KiB for this route, 16 KiB for the others; JSON 401 without a session or for a blocked account; 409 `save-conflict` when another browser saved in between, 409 `save-outdated` for a tab with older code, 413 `save-too-large`). The game is built only once the server answered the load; a manual map run in the save comes back paused at its minute, or on its screen after its end. The game saves by itself after every act of the player, after a completion or a death, every 30 real seconds while a map run passes, and once more when the tab is hidden; failures, conflicts, older code, a missing session and logout each have the sentences the task settles. A saved game state of another version, with an unknown archetype or of a bad shape is refused whole by a new simulation function (`src/browser/sim/saved-game.ts`, the exemplar of the new kind `saved-game`), and the player starts anew with a one-time sentence. The `loop2-deploy` skill says the database holds saved game states, that a rollback across schema version 4 cannot start, and that nothing else merges to `main` from H1 to this merge.

## Task and sources

- Task: `zapis_stanu_na_serwerze_loop2.md` (vault, `Notes/Projects/(P) Loop/_zadania`), accepted 2026-10-29, sha256 `87a5257730e2…` (the file at the cycle's start differs only in its `Status:` line); plan item 16 `zapis-stanu-na-serwerze` of `plan_mvp_loop2.md` (depends on 3, 15, 19, 20, all delivered); definition `definicja_mvp_loop2.md` approved 2026-10-29, sha256 `fda97782458d…`, fingerprint 934f56c6.
- Process pin: `.the-way` at `a8dfe8a`, not moved.
- Base `dce2970`. `main` has since moved to `56fa086` (PR #41, task 13 `plan-wyprawy`); not merged in — see *Not run*.

## The cycle

- **Spec** — written because the task carried open design choices to the cycle (routes, refusal codes, the revision check between browsers, where the version stands, the last save at closing, retry rhythm, header order, entry scopes). Review: FAIL (3 findings: `keepalive` and too-large, a loaded game's "last saved" state, D-109 left unchanged) → one revision → re-review FAIL on one new finding (guideline passages made untrue), settled by the orchestrator in the spec's *Decisions* 10.
- **Route: a plan of 9 slices** — five parts, a schema step, a new kind of code with its exemplar, three guideline disciplines, the deploy skill and about thirty foundation entries. Slices 1, 2, 3 and 9 had reviews of their own: Slice 1 FAIL (load refused the server's `save` object; D-97 dropped the update sentence; waits and walks untested) → fixes → PASS; Slice 2 PASS; Slice 3 PASS; Slice 9 FAIL (three wording faults of the deploy skill, among them an H2 step that could pass without testing anything) → fix → PASS.
- **Review of the whole change** `dce2970..ae0d7e2`: FAIL, 1 blocking (12 of the player's acts could lose their immediate save with every test green) → fix `582e9be` (a table-driven test over 16 acts) → PASS.
- **Gate** on `582e9be`: `npm test` exit 0.
- **Return step** `188b836`: D-04, D-184, D-185, D-190 corrected to the code. Its review FAIL (2 blocking) → fix `dbd0fa6`, `3bd8f3f` → review FAIL: **I-2 remains**.
- Record of the cycle (spec, plan, every handoff and report, questions table, stages): [cycle.md at `f1407355d6a3222e623d1d1d8e042bb09401ddca`](https://github.com/mariusznazar/loop2/blob/f1407355d6a3222e623d1d1d8e042bb09401ddca/docs/task-cycles/zapis-stanu-na-serwerze/cycle.md). Please merge with a merge commit that keeps the branch's commits, so this link survives.

## Blocked by review

- **I-2** (Important, WAY-263), `src/browser/view/game-saver.ts:3-5` and the older inline comment at `:186`. The reviewer's words (`reports/32-return-fix-review-report.md`): the new header comment says that after a save before a logout that goes on "nothing more is sent (D-184)". That is false, and D-184 does not say it. After that save the game stays on screen, and it stays for good if the logout request then fails; a later save request and the 30-second check both still send (a scratch test confirmed it). An agent who made the code match the comment would stop saving after a failed logout, so the player would lose progress without any warning. The doc of `moment()` and the new test are right. Fix: drop or correct that clause, and the comment at `:186` with it. The code itself is right; only the comment is wrong.
- What the fix tried: the return step's first review (FAIL `188b836`) found that the saver's comments dropped D-184's logout exception; the fix `3bd8f3f` stated the exception and added a test that a moment asked for during the save before a logout that goes on is not sent (seen failing against a break) — and in the header comment wrote the exception too broadly.
- Time, models and tokens so far (`stages.md`): 4 h 03 min of working time; 258.9 M tokens in all (251.0 M cached input, 1.16 M output) — claude-opus-5-5 249.1 M, claude-sonnet-5-5 9.7 M. Review rounds: spec 2, Slice 1 2, Slice 2 1, Slice 3 1, Slice 9 2, whole change 2, return step 2.

## Not run on this code

- **The reconciliation with `main`** (`56fa086`, task 13): `foundations/decisions.md` and `foundations/invariants.md` conflict, because `main` wrote D-179 – D-189 too — this branch's D-179 – D-190 will become **D-190 – D-201** at the reconciliation; and task 13 changed the game state (`tripPlan` in a program, `bringPlan` and `deposited` in a map run, the chest keyed by item), which the strict load of `saved-game.ts` must cover, or it refuses every save that holds a trip plan. The handoff for it is written (`reports/33-reconcile-handoff.md`), not dispatched. The review of the reconciliation, the gate after it, and the final merge of `main` before your merge have not run.
- The return step's review has not accepted `3bd8f3f`.
- H1, H2, and To do 14 (removing the violated mark of `account-save-durable-storage` after H2).

## Checks

- `npm test` on `3bd8f3f`: exit 0 — node 855/855, 315 Python tests in 4 directories passed, `foundation_check.py` 0 errors. On `582e9be` (reviewed change before the return step): exit 0, node 854/854. On the base `dce2970`: exit 0.
- Skipped by the suites themselves: `tests/deploy` 3, `tests/invariants` 2.
- Unchecked: screenshot inspection of the page — the foundation names no route for a screenshot of the running product; the UI states (header save lines, notices above the game, a loaded run paused and an ended one on its screen, forms with the expiry and update sentences, each logout outcome) are asserted in unit tests on a hand-made document model.
- Information: the Slice 2 executor saw one failure of the cookie case "set and touch refuse unusable cookie input without changing stored sessions" (subtest "invalid domain", `tests/account-storage.test.mjs`, part `account-server`) in a run under its own deliberate mutation of the migration — not a run of the change; every gate run and three clean runs passed; cause not verified.
- Own-work checks (WAY-164): each executor named its weakest requirement and its check in its report — among them the save body measured in bytes not characters (Slice 4), one request in flight with coalesced moments (Slice 5), the logout race closed with a test (Slice 6), the v3 → v4 move on a database written by `main`'s own code (Slice 2), crafted saved documents refused whole (Slice 1).

## What this request settles

Decisions (numbers before the renumbering to D-190 – D-201):

- **D-07** (new wording, projected) — Serwer trzyma konta graczy i zapis stanu gry każdego z nich i niczego z gry nie liczy; przeglądarka liczy całą grę i wysyła zapis na serwer.
- **D-179** (new, projected) — Każdy sam zakłada konto i od razu gra; zalogowany gracz odczytuje i zmienia tylko własny zapis; właściciel może zablokować konto.
- **D-180** (new, projected) — Gdy sesja wygaśnie w trakcie gry, przeglądarka zachowuje niezapisany stan i ponawia jego zapis po zalogowaniu na to samo konto.
- **D-181** (new, projected) — Przeglądarka pobiera i wysyła cały zapis jako JSON przez `fetch()`: `GET /api/saved-game` i `PUT /api/saved-game` z wersją kształtu, numerem ostatnio widzianego zapisu i grą.
- **D-182** (new, projected) — Konta i pełne zapisy stanu gry leżą w pliku SQLite na trwałym dysku poza wymienialną warstwą kontenera.
- **D-183** (new, projected) — Zapis niesie numer wersji kształtu; gra wczytuje w całości tylko zapis bieżącej wersji, a zapis innej wersji albo z archetypem spoza danych odrzuca w całości i zaczyna od nowa.
- **D-184** (new, row 1) — Gra zapisuje sama: po każdej zmianie stanu przez gracza, po domknięciu i śmierci, co 30 s realnych w trakcie przejścia i raz jeszcze przy ukryciu karty, bez gwarancji, że ten ostatni dojdzie.
- **D-185** (new, row 2) — Udany zapis nic nie pokazuje; nieudany pokazuje w nagłówku „Nie udało się zapisać postępu. Gra spróbuje ponownie.” i ponawia po 5, 10, 20 s, potem co 30 s; za duży ma własne zdanie i nie jest ponawiany.
- **D-186** (new, row 3) — Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis; przegrana przeglądarka wczytuje zapis serwera i pokazuje „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.”.
- **D-187** (new, row 4) — Serwer odrzuca zapis niższej wersji niż ta, którą trzyma; stara karta pokazuje „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać.
- **D-188** (new, row 5) — Gdy zapis trafi na brak sesji, gra znika, wracają formularze z „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”, a niezapisany stan zostaje tylko w pamięci strony do zalogowania na to samo konto.
- **D-189** (new, row 8) — Wczytane trwające ręczne przejście wraca na pauzie w minucie zapisu, z tempem z zapisu; zakończone wraca na ekran po swoim końcu; czas nieobecności go nie przesuwa.
- **D-190** (new, To do 12) — Wzorcem rodzaju `saved-game` jest `src/browser/sim/saved-game.ts`: zamienia stan gry na zapis bieżącej wersji, a nieznaną wartość — zapis z serwera albo stan z pamięci strony — na stan gry albo odmowę z powodem.
- **D-04** (changed, row 10) — Widok zmienia stan gry tylko funkcjami symulacji, którym podaje wybory gracza, upływ czasu i zapis pobrany z serwera albo trzymany w pamięci strony.
- **D-96** (changed, projected + row 7) — Po zalogowaniu i przeładowaniu gracz trafia do siedziby, a gdy w zapisie jest ręczne przejście — do tego przejścia; gra powstaje dopiero, gdy serwer odda zapis albo powie, że go nie ma.
- **D-97** (changed, row 6) — „Wyloguj” najpierw zapisuje stan; przy nieudanym zapisie z braku połączenia nie wylogowuje; przy odmowie z innej przeglądarki, za dużym zapisie i starszym kodzie wylogowuje, a przy starszym kodzie zostawia nad formularzami „Gra została zaktualizowana. Odśwież stronę.”.
- **D-104** (changed, row 9) — Trasa zapisu przyjmuje treść do 64 KiB, inne trasy zostają przy 16 KiB; serwer trzyma najwyżej 64 KiB zapisu na gracza.
- **D-109** (changed, spec) — Ważna sesja upoważnia też do odczytu i zastąpienia zapisu własnego konta; obie trasy zapisu bez sesji dają JSON 401.
- **D-112** (changed, To do 1) — Bieżąca wersja schematu to 4; przejście bazy zachowuje konta, sesje, odnośniki i zapisy stanu gry z ich wartościami.
- **D-156** (changed, projected) — Wynik potwierdzenia adresu stoi u zalogowanego gracza nad grą, na jakimkolwiek ekranie się ona otwiera.
- **D-53** and **D-134** — rationale only: the headquarters is the screen the game opens on when the save holds no manual map run; a reload no longer starts a new game.

Invariants:

- **`player-save-isolation`** (new) — Zalogowany gracz odczytuje i zmienia tylko zapis własnego konta.
- **`expired-session-unsaved-progress`** (new) — Wygasła sesja zostawia niezapisany postęp w przeglądarce, a gra ponawia jego zapis dopiero po zalogowaniu na to samo konto.
- **`account-save-sqlite-store`** (new) — Serwer trzyma konta i pełne zapisy stanu gry w bazie SQLite.
- **`saved-state-http-exchange`** (new) — Przeglądarka pobiera i wysyła zapisy jako JSON przez `fetch()`.
- **`save-version`** (new) — Gra nie wczytuje niczego z zapisu, którego wersja różni się od bieżącej wersji kształtu.
- **`account-mutation-request-guards`** (changed) — obejmuje też trasę zapisu, a „za duża” treść znaczy ponad limit trasy z D-104.
- **`account-schema-lifecycle`**, **`account-database-schema`** (changed) — przejście bazy zachowuje też zapisy stanu gry.
- **`account-session-authorization`**, **`blocked-account-access`** (changed in scope) — trasy zapisu bez ważnej sesji albo zablokowanego konta dają JSON 401.
- **`account-save-durable-storage`** — relinked to D-17 and D-182; still `Violated: yes` until H2 (To do 14).

Environment facts: **`fetch-keepalive-body-quota`** — standard Fetch odrzuca żądanie `keepalive`, gdy treści żądań `keepalive` w locie przekraczają razem 64 KiB; **`visibilitychange-hidden-last-event`** — przejście karty w stan `hidden` to ostatnie zdarzenie, które strona pewnie widzi.

Part map: `account-server` gains the persistence of saved game states; `simulation`'s *Trust boundary* gains `src/browser/sim/saved-game.ts`.

Guidelines (new meanings for your approval, below): `guidelines/coding-saved-game.md` (new kind `saved-game`), its row in `guidelines/coding.md`, and changes of `coding-simulation-module.md`, `coding-browser-module.md`, `coding-database-access.md`, `testing.md`.

### What the foundation puts in front of you at the merge

- Invariant tests altered: those marked `account-mutation-request-guards`, `account-schema-lifecycle`, `account-database-schema`, `account-session-authorization`, `blocked-account-access`, `account-request-transport` (extended to the save routes), and new tests of the five new invariants.
- Surfaces altered: two new HTTP routes, `GET` and `PUT /api/saved-game`; the account database's schema version 4; the simulation's new trust boundary `src/browser/sim/saved-game.ts`.
- *Violated* marks: none set or cleared by this request yet; `account-save-durable-storage` is cleared only after H2.

## Questions

1. **The remaining finding I-2.** Options: (a) the correction run corrects the comment at `game-saver.ts:3-5` and `:186` (a comment-only change; the code and its tests stay), then runs what has not run — the review of that fix, the reconciliation with `main` and its review, the gate, then H1 and H2; (b) you accept `3bd8f3f` despite the finding and the correction run goes straight to the reconciliation. **Recommendation: (a)** — the comment tells the next agent the opposite of what the code must do; the fix is one clause.
2. **Guideline meanings that need your approval (WAY-172)**, as Slice 7 and the return step's fix name them:
   - `guidelines/coding-saved-game.md` as a whole — the new kind, its four rules, its *When to read*, which replaces `coding-simulation-module.md` for `src/browser/sim/saved-game.ts`, and lines 8-10 and 122 as corrected in `dbd0fa6` (the load reads the server's document and the state kept in page memory). Recommendation: approve.
   - Its rule „Wersja podnoszona razem z kształtem”: changing the paces, a map's width and height, identifiers or the nature-energy cap does not raise the version, so saves of the current version are then refused as damaged („Zapis był uszkodzony…”), not as another version. Options: keep; or require a raised version for those changes too. Recommendation: keep.
   - `guidelines/coding-browser-module.md`, § „Gra na stronie i odpowiedzi serwera”: a failed session or saved-game request shows one warning with retry, while save failures get their own sentences in the saving line. Recommendation: approve.

Other choices within the request: 14 rows of the [questions table](https://github.com/mariusznazar/loop2/blob/f1407355d6a3222e623d1d1d8e042bb09401ddca/docs/task-cycles/zapis-stanu-na-serwerze/cycle.md#questions-and-autonomous-choices).

## Human actions

- **H1** — deploy a commit of this request to the test server with the installed deploy script (D-15) and check the acceptance criterion: a game saved in one browser comes back after sign-in to the same account in another. **H2** — deploy the same commit again (it replaces the application container) and check that the save from H1 comes back; the steps stand in `.claude/skills/loop2-deploy/references/setup_and_secrets.md`, § "Deploying a request head and accepting it".
- **Do H1 and H2 only after the correction run** has merged `main` in and passed its review and gate. The reason: H1 moves `loop2_accounts` to schema version 4 and opens the window in which nothing else may merge to `main` (every merge deploys `main` with schema 3, which refuses the database — exit 8); and a save made now by code without task 13's trip plans would be refused as damaged by the reconciled code.
- After H2 the cycle removes the violated mark of `account-save-durable-storage` (To do 14) and commits it here.

## Review findings for you to choose from

Not fixed; for you to choose which become new tasks.

### Minor findings of the review of the whole change (`reports/26-whole-review-report.md`), in the reviewer's words

New findings of this review:

- **m-1. A hidden page after a failed save sends nothing while the state is unchanged**
  (Slice 5, `6aae1e7`; `src/browser/view/game-saver.ts:122`, `:192-195`). `sendNow` sets
  `baseline` to the state it sends, before the answer comes back. So after a failed save, the state
  that is not saved counts as "the state last sent". Outside a passing map run (an edit in the
  headquarters, the screen after a death), a tab closed during the 5-second retry wait sends no last
  save, and the edit is lost. D-184 says exactly this ("only where it changed since the save last
  sent"), so the code matches the decision. Against it stands To do 7's „przy zamykaniu albo
  ukrywaniu karty gra próbuje jeszcze jednego zapisu” and what a player would reasonably expect.
  During an outage the last save would fail as well, which keeps the loss small. Fix if wanted:
  treat a failed send as "not sent" for the check (the baseline stays at the last state saved).
  Mandated by the spec and D-184, so not blocking.
- **m-2. `keepalive` on the save request is pinned by no test** (Slice 4, `adb13fb`;
  `src/browser/account-api.ts:373`). Mutant `true` → `false` passes
  `tests/account-api.test.mjs` (exit 0). The executor says so in its report. The reason given is that
  a Node server cannot see the flag on the wire. A test that wraps `globalThis.fetch` and records the
  `init` it is given could pin it without a browser. Without `keepalive`, the save in flight when the
  tab closes is cancelled, which is D-184's „no guarantee” made worse.
- **m-3. The saver's choice to drop a moment made during a logout save is pinned by no test**
  (Slice 5; `src/browser/view/game-saver.ts:183-185`). Mutant `pending = false` → nothing passes
  `tests/view/game-saver.test.mjs`. The choice is the executor's (report 17, *Choices*). If the
  logout then fails, the 30-second check still finds the changed state, so nothing is lost.
- **m-4. D-04 and D-190 name only the saved game state downloaded from the server, but the page
  also loads the document it kept in page memory** (comes from no slice: the plan's *Foundation
  entries* rows 16 and 20; code `src/browser/view/app.ts:259`). After a sign-in to the same
  account, the page builds the game with `loadSavedGame(kept.document)`. That is spec decision 8,
  and spec decision 5 names both inputs. D-04's binding sentence lists what the view passes to the
  simulation: "the player's choices, the passing of real time and the saved game state the browser
  downloaded from the server". D-190 says "an unknown value downloaded from the server". A reader who
  takes that list as closed may read the kept-state path as a breach of D-04. Question 10 of the
  task was asked to avoid exactly that kind of strained reading. The code does what D-04 is for (the
  state changes only through a function of the simulation), and D-188 requires going on from the
  kept state, so this is wording, not behaviour. Fix: add "or the one it kept in page memory
  (D-188)" to both entries, through `the-way-record-decision`.
- **m-5. Typo in a new guideline** (Slice 7, `483f5dc`; `guidelines/coding-saved-game.md:84`):
  „niewolno mniej” should read „nie wolno mniej”.

The Minor findings of the slice reviews (`reports/25-slice-minor-findings.md`), graded as findings
of this review:

- **Slice 1 M1** (`tests/sim/saved-game.test.mjs:699-704`, `:741-742`; `saved-game.ts:376`, `:393`,
  `:426`) — Minor, open. Three crafted cases are refused by a second fault in them, so the checks of
  identities below their counters and of unique identities (decision 5's floor) are unprotected. A
  player can only forge their own save (D-07), and the load still refuses other faults.
- **Slice 1 M2** (`tests/sim/saved-game.test.mjs:479-482`) — Minor, open. The check that the
  argument stays unchanged on the refused path cannot fail. The page drops a refused document, so a
  change to it would reach no player.
- **Slice 1 M3** (`src/browser/sim/saved-game.ts:53-57`) — Minor, open in the code. The comment of
  `SAVED_GAME_VERSION` still names only `GameState` and the items. The guideline now carries the rest
  (`guidelines/coding-saved-game.md`, last paragraph of „Wersja podnoszona razem z kształtem”), as
  the Slice 7 report says.
- **Slice 2 M1** (`src/server/database.ts:101-107`) — Minor, open. STRICT and the two `CHECK (… >= 1)`
  have no test. Step 4 is fixed once H1 deploys it, so a test only guards an edit made before then.
- **Slice 2 M2** (`tests/account-storage.test.mjs:581-653`) — Minor, open. No test shows that step 4
  leaves the other tables and columns alone. Same reasoning as M1.
- **Slice 3 M1** (`src/server/account-routes.ts:353-357`) — Minor, open. The order "block before
  size" in the PUT is held by no test. It shows only for a session row that survived a block.
- **Slice 3 M2** (`src/server/account-routes.ts:335-341`) — Minor, open. GET embeds the stored text.
  It is valid only while the one writer stores `JSON.stringify` of an object.
- **Slice 3 M3**, together with Slice 4 (`src/server/app.ts:69-87`, `src/browser/account-api.ts:384-393`)
  — Minor, open. A 413 from the server's body limit carries no `code`, and the client takes a 413 as
  too large only with `save-too-large`. A 413 without a code would come back as `failed`, with the
  retries and „Gra spróbuje ponownie.”. This client cannot cause one: it measures the same UTF-8
  string the server limits and sends nothing over 65 536 bytes. So it does not happen today.
- **Slice 9 m-1** (`.claude/skills/loop2-deploy/references/setup_and_secrets.md:307`, `:337`) —
  Minor, open. "H1" now has three meanings in that one file: the tunnel's `:34-41`, Outsider's
  `:230` and this task's `:307`.
- **Slice 9 m-2** (`troubleshooting.md:114`, emailed links left out) — fixed in `ae0d7e2`. The
  passage now reads "keeping every account, session, emailed link and saved game state". Withdrawn.
- **Slice 9 m-3** (`.claude/skills/loop2-deploy/SKILL.md:179-180`) — Minor, open. The version-4
  sentence still stands under „Account mail”, where it has nothing to do with mail.
- **Slice 9 fix m-1** (`setup_and_secrets.md:334-336`) — Minor, open. "no save button" and "edit
  and keep a program" sit next to the program panel's „Zapisz…” buttons.
- **Slice 9 fix m-2** (`setup_and_secrets.md:338`) — Minor, open. "an empty team means the save was
  lost" gives a false alarm when the change chosen was a program edit.

Slice 2's lines under *Declined to judge*: the deploy skill still saying version 3 is fixed by
Slice 9 (`59bf3da`, `ae0d7e2`). The 413 `save-too-large` before the write is done by Slice 3.
Neither stands any more. The other two stand below, under **Declined to judge**.

### Minor finding of the review of its fix (`reports/28-whole-fix-review-report.md`)

- **mf-1. The unchanged-act part finds the pause button by its empty label**
  (`tests/view/account-screen.test.mjs:1470-1473`). It looks for the first button with no text
  inside `.status-row`. If the status row later labels that button without a map run, the selector
  finds nothing, and the case fails with a `TypeError`, not with a false pass. The fix report names
  this itself.

### Minor findings of the review of the return step (`reports/30-return-review-report.md`)

- **m-1 — "a saved game state … kept in the page's memory" (D-04 `:64-65`, D-190 `:3547-3548`)
  names as *saved* what D-188 (`:3477`) calls "the unsaved game state". In the code it is a saved
  document (`KeptGame.document: SavedGame`) of progress not saved on the server, so both readings
  are defensible, but the word now means two things across three neighbouring entries, and read
  literally against `saved-state-http-exchange` (`foundations/invariants.md:980`, "The browser
  loads and sends saved game states as JSON through `fetch()` requests") D-04 describes a saved
  game state the browser loads without a request. Wording such as "the saved document of the
  unsaved game state D-188 keeps in the page's memory" would remove both readings. Not blocking:
  the invariant derives from D-181, the exchange with the server, and no reader is misled about
  what the code does.
- **m-2 — D-04's *Origin* (`:85`) names question 10 and row 10 only**, while the new clause rests on
  row 5 (the kept state, D-188). D-188 is cited in the sentence, so the trail exists; adding row 5
  to *Origin* would make it direct.
- **m-3 — D-184's new exception has no test** (no test sends a moment during the logout's save and
  checks it is dropped when the logout goes on; `git grep` over `tests/` for it finds none). The
  whole review graded this as an untested choice (m-3 there); it is now a binding sentence. Not
  within this range's commits, named because I-2 depends on it.
- **m-4 — D-185's "once the save before a logout has failed … until a save succeeds"** reads as
  holding until success, but a too-large refusal in between resets it (`game-saver.ts:167`), so a
  later plain failure shows „…Gra spróbuje ponownie.” again. D-185's own too-large clause takes the
  line meanwhile, so the gap is only after too-large → failure; an edge, no player harm.

### Outside the task's scope (`reports/26-whole-review-report.md`, § Declined to judge)

- A player who sends `version: 9007199254740991` stores it, so their own browser's saves read as
  outdated afterwards. This is spec decision 1's contract; it touches only the player's own save
  (D-07). Outside the task.
- The one failure of the cookie case "set and touch refuse unusable cookie input…" (subtest
  "invalid domain") under a mutation in the Slice 2 executor's run. The case is outside the change;
  my run of `tests/account-storage.test.mjs` passed. Cause unknown; outside the task.
- To do 14 and plan row 31 (remove the violated mark after H2) — work after H2, outside the range by
  the plan.
- H1, H2 and the acceptance criterion on the test server — human actions (D-12, D-75). No agent can
  run them.
