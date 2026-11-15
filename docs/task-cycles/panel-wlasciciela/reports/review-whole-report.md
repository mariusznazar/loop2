FAIL e9b6864865f7abbf11466b4b231664cb1ad3aebd

# Review of the whole change — "panel właściciela", range `b1904c5b..e9b68648`

`git rev-parse HEAD` is `e9b6864865f7abbf11466b4b231664cb1ad3aebd`, the head given. Range read as `git log b1904c5b..e9b68648` (21 commits) and `git diff b1904c5b..e9b68648` (38 files, +5369 −192): every source and foundation hunk was read. The test files I read are named under Unread material.

Counts: **3 blocking (Important)**, **20 Minor within the task**, **4 outside the task** (Minor). No Critical.

Short result: the server side holds. The five routes, the role read at each request, the 409 for an owner, the command and the migration all stood up to the slice reviews' probes and mutations, and the server code has not changed since slice 4 (`git diff --stat a3bb2bf6..e9b68648 -- src/server` is empty). The three blocking findings are where the change leaves a decision, a guideline and the code saying different things. (1) The confirmation's „Wróć” is drawn as a secondary action, which D-275 and the styleguide's own rule forbid outside a form. (2) D-109 says the refusal comes "before the body is read", but the guards parse the body first. (3) `guidelines/coding.md` restates the D-253 and D-354 lists without `account-role`.

## Findings

### Important (blocking, within the task)

**I-1. The confirmation of „Zablokuj” draws „Wróć” as a secondary action (underlined text), against D-275, D-44 and the styleguide's own rule, and unlike the confirmation of „Zacznij od zera” it says it copies.** Spans slices: slice 6 (`57e03bc9`, the styleguide sentence) and slice 7 (`e89c7333`, the code and its test).

- Place: `src/browser/view/accounts-screen.tsx:235` (`kind="secondary"` on „Wróć”); `guidelines/styleguide-browser-view.md:1000-1005` ("Potwierdzenie „Zablokuj” stoi tak jak potwierdzenie „Zacznij od zera” (D-402): … i akcja poboczna „Wróć” (D-275)"); the test that pins it, `tests/view/accounts-screen.test.mjs:293-306` (`assert.ok(withdraw.classList.contains("secondary"))`).
- What is wrong:
  - D-275 says that a secondary action is only "an action that opens or leaves a state of a form and stands under that form", and that "Every other action of the browser view keeps the button D-44 gives it". Its *Rejected* names this exact drift: "text wherever an action is secondary — each agent judges what is secondary, so the screens drift apart". D-44's rationale says the same.
  - The styleguide's rule *Main button, secondary action and tab* (`guidelines/styleguide-browser-view.md:448-453`) says: "Akcją poboczną (`kind: "secondary"`) jest tylko działanie, które otwiera albo opuszcza stan formularza i stoi pod tym formularzem — dziś „Nie pamiętam hasła”, „Wróć do logowania” i „Anuluj” karty logowania … Każde inne działanie, choćby poboczne, zostaje przy przycisku, który daje mu D-44."
  - The new rule *The list of accounts* (`guidelines/styleguide-browser-view.md:1000-1005`) contradicts that rule and cites D-275 for the opposite. The confirmation is no form, and the confirmation it claims to copy (`src/browser/view/program-list.tsx:288-292`) uses a plain button for „Wróć”.
  - The orchestrator's A3 said "built as that of „Zacznij od zera” (sentence, „Tak, zablokuj”, „Wróć”)". The executor of slice 7 says in its report that it did not copy the plain „Wróć”.
- Why it matters: the user sees two confirmations in one game, each with its own „Wróć”, one a framed button and the other underlined grey text. The UI check's screenshots `screenshot 05-owner-block-confirmation` and `screenshot 08-player-zacznij-od-zera-confirmation`, viewed by me, show it. The styleguide now holds two rules that contradict each other, so the author of the next screen cannot tell which one applies. That is the drift D-275 was written to stop.
- Fix: draw „Wróć” as a plain `ReactButton`, as `program-list.tsx` does. Make the styleguide sentence say the plain button. Change the test to assert that the button is not `secondary`.

**I-2. D-109, which the change writes, says the owner routes refuse a session without the role "before the body is read, with nothing read of the body", but the four POST routes read and parse the body before the session and the role.** Comes from no slice: it is the plan's *Foundation entries* (foundation step `f1733cf9`), and the plan's slice 4 Goal uses the same words.

- Place: `foundations/decisions.md:2270`, the binding sentence: "checked after the session and before the body is read, with nothing read of the body and nothing changed". The same claim stands at `:2290` (*complies*: "reads the role … before it reads the body") and at `:2294` (*Rationale*: "The refusal for a missing role comes before the body is read").
- Code: `src/server/owner-routes.ts`. The router registers `...mutationGuards(runtime.configuration.publicOrigin, accountBodyLimit)` for the four POST paths before `ownerOnly`. Those guards check the Origin, the media type and the size, and they parse the JSON body. So a player's request with a body that is no JSON, or one over 16 KiB, gets 400 or 413, not 403 `owner-forbidden`. The test confirms it: `tests/owner-routes.test.mjs:930-1040` ("with and without a session", guards before the session). So does the slice-4 probe (`reports/review-4-evidence/probe-out.txt`: a player with a foreign Origin gets 403 `Invalid request origin`). What the code holds is narrower: no *field* of the body is read before the role (`owner-routes.ts:32-47`, `:58-62`).
- Why it matters: WAY-263. The entry is one the change writes, and the code does not do what it says. A reader of D-109 who trusts "nothing read of the body" may move the guards after the role check to "comply". That would break D-104 and the invariant `account-mutation-request-guards`, under which a refused body must not reach the session at all. The order the code has is the right one, so the entry is what is wrong. The slice-4 review graded this M-4, Minor. I grade it Important under WAY-263 and WAY-364: the content of the entry disagrees with the code.
- Fix, through `the-way-record-decision`: write "after the session and before any field of the body is read" at `:2270`, `:2290` and `:2294`.

**I-3. `guidelines/coding.md` still lists the service commands of D-354 and the processes of D-253 without `account-role`, while both decisions, changed by this change, now name it.** From slice 3 (`8e21d315`), whose *Change* held `guidelines/coding.md`. It is also a gap of the plan: slice 3's Goal named only `### Logging scope`.

- Place: `guidelines/coding.md:131-132` ("Zdanie, którym polecenie serwisowe (`account-block`, `account-previous-save`, `account-backup`) odpowiada operatorowi, nie jest wierszem logu (D-354).") and `guidelines/coding.md:146-148` ("Procesy dotykające danych kont — serwer, `account-block`, `account-previous-save` i `account-backup` — mają własną, `installLastResort` …").
- Against: D-253 at `foundations/decisions.md:6321` and D-354 at `:9888` both list `account-role`. The code does what the decisions say (`src/server/account-role.ts` calls `installLastResort("account-role")`).
- Why it matters: WAY-263. A file of the change restates an entry it changes differently: the guideline gives three commands where the decisions give four. The coding guideline is what the next author of a service command reads. With this list, `account-role` looks like a process with no handler of its own, and its sentence looks like a log line.
- Fix: add `account-role` to both lists through `the-way-maintain-coding-guidelines`.

### Minor (within the task: the cycle may cut these into the fix's findings file)

- **M-1.** `src/browser/view/accounts-entry.ts:36` and `:38`. The sentence of a failed read, „Nie udało się wczytać listy kont. Spróbuj ponownie.”, and that of a failed operation, „Nie udało się wykonać operacji. Spróbuj ponownie.”, are two sentences each. The styleguide rule *The list of accounts* (`guidelines/styleguide-browser-view.md:1011`) says "Każde z tych dwóch zdań to jedno zdanie". The tests check one sentence for `unknown-account` and `owner-not-blockable` (`tests/view/accounts-screen.test.mjs:530-534`, `:570-574`), not for these two. Effect is small, and `app.ts` has the same two-sentence form for the game.
- **M-2.** The `loop2-deploy` skill tells the human that a given role holds "from its next request" (`.claude/skills/loop2-deploy/SKILL.md:442`). It then tells the human to check that „Panel właściciela” stands in the menu „Konto” after giving the role (`:462`). The page reads the role only when it loads: the UI check's observation 1 found that an open page shows no link until it is reloaded. A human who gives the role with the game already open sees no link and may think the command failed. Add "reload the page" to both places, in both copies.
- **M-3.** `guidelines/testing.md` was not brought along with the new trust-boundary routes. Its *integration test* files (`:360`) and *Where in code* (`:441-451`) do not name `tests/account-owner.test.mjs` or `tests/owner-routes.test.mjs`; this was review-2's M1. The *Trust boundaries* rule's invariant list (`:156`) and its `src/server/` row (`:176`) do not name `owner-panel-authorization` and its test. The permission table (`:194-232`) has no row for the five owner routes, and rows `:199` and `:214` say that the account answer of `GET /api/account` and of `POST /api/session` holds "samym identyfikatorem konta, znormalizowanym adresem i znacznikami…". That is no longer true for an owner, whose answer holds `"role":"owner"` (D-410). `product-guidelines/reading.md` puts such an extension in the current task. Graded Minor because the file is not one of the change's and the tests themselves hold the rules.
- **M-4.** The guideline tables *Files of this kind* lack the new files. `guidelines/coding-http-application.md:13-16` has no row for `src/server/owner-routes.ts`; this was review-4's M-2. `guidelines/coding-browser-module.md:13-85` has no rows for `src/browser/view/accounts-screen.tsx` and `src/browser/view/accounts-entry.ts`, so a reader does not know whether they may be copied.
- **M-5.** The glossary term `owner`, which the change writes ("An owner is an account whose role is `owner`"; *Not*: "the person who reaches the server and runs its commands — 'operator'"), is used for the person in text the change writes:
  - `src/server/account-role.ts:6`: "The owner gives or takes the owner role of one account";
  - `.claude/skills/loop2-deploy/SKILL.md:372`: "the owner signs in with the same card";
  - `.claude/skills/loop2-deploy/SKILL.md:616`: "the owner's account is blocked, so that its owner cannot reach the panel";
  - and, in paragraphs the change edits, `:467` ("The owner blocks a player account … with one command") and `:547`.

  The same lines stand in `.agents/skills/loop2-deploy/SKILL.md`. Each reads right in context, hence Minor. Write "operator" or "the human" there.
- **M-6.** (review-1 M1) No test writes an unknown stored role or removes the `CHECK`. See `src/server/database.ts:186` (`CHECK (role IN ('player', 'owner'))`) and `:382` (the refusal in `accountFromRow`). The typecheck holds the read branch. No other unknown stored value of `accountFromRow` has a test either.
- **M-7.** (review-1 M2) The failing-step-6 test in `tests/account-storage.test.mjs` (lines 887-939 at `55e3b8e8`) cannot tell a rolled-back step from one that failed before changing anything: step 6 is one `ALTER TABLE`. The code is right.
- **M-8.** (review-1 M3) The text of D-410 cites D-12, but its *Relations* (`foundations/decisions.md:10902`) leaves D-12 out. Form only (WAY-364).
- **M-9.** (review-fix-4) The *Verification* lines of D-400 (`foundations/decisions.md:10709`) and D-410 (`:10903`) do not list the invariant `owner-panel-authorization`, which derives from both. D-109 and D-137 do list it.
- **M-10.** (review-4 M-3) The routes read the body address as the login does (`src/server/owner-routes.ts:58-62`, `normalizeEmail`), and tests hold it. The panel paragraphs of D-137 (`foundations/decisions.md:3086`) and D-400 (`:10704`) say only "named by its email address in the body". The decisions are silent rather than wrong.
- **M-11.** (review-4 M-5) `src/server/owner-routes.ts:66-72`: `operationRoute` types `run` as `{ outcome: string; accountId?: string }` and its events as `Record<string, string>`. A misspelled outcome or event key compiles. This is structure below a rule of size the product does not have.
- **M-12.** (review-2 M2) The list test `tests/account-owner.test.mjs:75-111` carries a plain comment naming D-411, not a `// decision:` line.
- **M-13.** (review-fix-2) `tests/account-owner.test.mjs:241-264`: `holdWriteLock` rejects with "lock holder exited" also after a normal finish. Harmless once resolved, but it would hide the cause if the worker died before reporting.
- **M-14.** (review-3 M-2) The usage test (`tests/account-owner.test.mjs:509` onward) tries no upper-case role word (`Owner`) and no address with an inner space. The code refuses both, as the older commands do.
- **M-15.** Appearance, graded by its effect on the user. The screen of the list of accounts has no visible heading; its list is named „Konta” for assistive technology only (`src/browser/view/accounts-screen.tsx:328`). An owner who follows the link lands on a list with no title and no marked bar item. In a wide window `margin-right: auto` on the confirmation's sentence (`src/browser/styles.css:899`, copied from `.program-reset-text`, which stands in a narrow column) puts „Tak, zablokuj” and „Wróć” about 300 px from the end of the sentence (UI check, observations 2 and 6; screenshot `05`). Neither breaks a written rule.
- **M-16.** `tests/view/accounts-screen.test.mjs:551`: the stand-in answers `owner-not-blockable` with status 403, but the server answers 409 (`src/server/owner-routes.ts`, the `refuse(response, 409, …)` call). The entry branches on the code, so the test still holds. The fixture states a status the server never sends.
- **M-17.** Structure: `src/browser/view/programs-entry.ts:64` and `:356`. The programs screen now carries an `owner` option only because `resolveScreen` needs a third parameter, at a call that resolves the address of a program and can never meet `accounts`. A concern of the new screen leaks into another screen's entry. Below a rule of size the product does not have.
- **M-18.** `tests/view/screen-registry.test.mjs:462` cites D-408's sentence "… its address and its position on the menu bar" on the test of the list of accounts, a screen that has no position on the bar (D-280).
- **M-19.** D-400's *Verification*, which the change writes, names among its tests "a revoke stopping the next read and reset" through the panel. `tests/owner-routes.test.mjs:783-852` checks the next read (`/api/previous-saved-game`, `:800-824`) and not the reset. The reset reads the same flag, which `tests/http.test.mjs` covers for the command.
- **M-20.** The new `account-role` wrapper in the skill (`.claude/skills/loop2-deploy/SKILL.md:429`) copies the pattern `'{"failure":"account-role"'*'}'`. The command's last-resort line is `{"failure":"uncaught",…,"place":"account-role"}` (`src/server/log-line.ts:89-94`), so the wrapper does not append that line to `/var/log/loop2-app.log`. The two older wrappers (`:494`, `:573`) have the same pattern. The copy is in the task; the pattern is older.

Closed: review-1's O1. Both copies of `references/troubleshooting.md` now say "The current code writes schema version 6" and describe the move to 6. I checked this against `src/server/database.ts:314-334`: version 6 is `schemaSteps.length`, and a newer version is refused with `UNSUPPORTED_SCHEMA`, as the paragraphs on 3, 4 and 5 say for their versions. The two copies are identical (`cmp`).

### Outside the task (Minor)

- **O-1.** About 70 older lines of `foundations/decisions.md` (the rationales of D-12, D-233 and D-356 among them), code comments (`src/server/account-block.ts:10`, `account-previous-save.ts:9`, `account-backup.ts:9`, `database.ts` near the block) and the skills `loop2-deploy` and `loop2-play` use "owner" for the human who runs the server, now that the glossary term `owner` names the role. A separate rename to "operator", as the foundation agent proposed. The new text is M-5.
- **O-2.** D-408 (`foundations/decisions.md:10866`) says a new screen adds "its address and its position on the menu bar". The list of accounts has none, as the screen of a map run has none (D-280). The wording should say "if any". The change's citation of it is M-18.
- **O-3.** `guidelines/styleguide-browser-view.md:960-969`: the rule *The end-of-run window* still holds an „Otwarte dla człowieka:” list. That rule predates this task.
- **O-4.** `src/server/log-line.ts:86-94`: the comment says the last-resort handler covers "a rejection included", while it installs `uncaughtException` only. Node 24 raises an unhandled rejection as an uncaught exception by default, so the behaviour holds and the comment is merely terse. It predates this task.

## Judgement of the change against the task

- **To do 1** (role in the database, a new account a player, schema 6 keeping every account a player): met. One step at the end of `schemaSteps`, with default `player` and the `CHECK` (`src/server/database.ts:181-187`); `createAccount` gives `player`; a version-5 database moves to 6 with every row kept (review-1, the test in `tests/account-storage.test.mjs`).
- **To do 2** (the role command on the pattern of `account-previous-save`): met. `src/server/account-role.ts` normalizes the address and has four outcomes, exit codes 0, 1, 2, 3 and 4, a last-resort handler, and event lines after a change only. It ends no session and stops no link, which the fix of review-3 tests. The command only prepares: it is never run on the server by the cycle.
- **To do 3** (same card; „Panel właściciela” in the menu „Konto”; same bar; `#/konta` gives a player Siedziba): met. See `src/browser/view/menu-bar.tsx:228-238`, `screen-address.ts:62` and `:166-167`; tests in `tests/view/menu-bar.test.mjs` (3 new) and `tests/view/owner-panel.test.mjs` (4); UI check steps 1-2.
- **To do 4** (list sorted by address; address, blocked state, privilege, "nic więcej"): met with the fourth field, the role (A1); see the judgement of A1 below.
- **To do 5** (four operations with the commands' effects; „Zablokuj” destructive with the confirmation's content; the other three at once; no „Zablokuj” at an owner, the server refuses; the privilege to everyone): met in behaviour. „Wróć” of the confirmation is drawn the wrong way (I-1).
- **To do 6** (role checked by the server at each request; a player refused on each route; a test of it): met. `ownerOnly` reads the account by the session at each request. `tests/owner-routes.test.mjs:423-460` refuses a player on all five routes with state compared, and review-4's ten mutations each failed a test.
- **To do 7** (the styleguide describes the screen, the link and „Zablokuj” among the destructive buttons): met, except that the description contradicts D-275 (I-1) and asks for one sentence where the code writes two (M-1).
- **To do 8** (commands unchanged; the skill describes the panel, the role command and when to use the commands): `account-block.ts` and `account-previous-save.ts` are not in the range. The tests of both commands on an owner's account are in `tests/account-owner.test.mjs` (review-3). The skill covers all four subjects (M-2, M-5, M-20 are its Minor defects).
- **Settlements to record**, rows 1-9:
  - rows 1, 3 and 4: D-137 and D-400;
  - row 2: D-410 and D-112;
  - rows 5, 6 and 7: D-280, D-281 and D-411;
  - row 8: the invariant `owner-panel-authorization`, with the 409 after fix 4;
  - row 9: the glossary term `owner`.

  Each is present and agrees with the code, except D-109's sentence on the body (I-2).
- **Human actions**: the role command is described in the skill for the human to run after deployment; nothing in the range runs it.
- **Out of scope**: no account operation beyond the four.
- **Trust boundary** (answer of step 4): the server code is unchanged since `a3bb2bf6`, which review-4 probed over real HTTP with 18 crafted requests and ten mutations: no cookie, a forged or blocked session, a player's session on all five routes, case-changed paths, two cookies, `__proto__` and duplicate keys, dotless-I addresses, bodies over the limit and foreign Origins. I re-read the five routes, `accountBody`, `listAccounts`, `setAccountRole`, `blockForPanel` and the command against that list and found no input it missed. The list answers four fields built one by one, and `accountBody` adds `role` only for an owner. The browser's client takes from the list exactly four keys of their own kinds (`src/browser/account-api.ts`, `panelAccountOf`) and sends only `{email}`.
- **Irreversible operation** (answer: no): the migration runs at a deployment the automation starts, and the role command is run by the human. The change only prepares both, and the skill states the consequence: no rollback across version 6.
- **A1** (the role as a fourth field): the reading fulfils both items. To do 5 asks for no „Zablokuj” at an owner's account, which the screen cannot know from the three fields of To do 4. The human's reason for question 6, "tyle, ile potrzeba do czterech operacji", covers a field the operations need. D-411 states it and its rationale. What departs from the literal "nic więcej o koncie" is that the role is also *shown* as text („Rola: właściciel”), not only used to leave the button out. D-411 settles showing it, so I raise no finding. The human sees it in the request.
- **UI check observations** (A8): 1 → M-2 (skill wording; the behaviour itself follows D-400's own precedent for the privilege). 2 and 6 → M-15. 3 (focus to the counterpart button) accepted: the button pressed ends disabled, and the styleguide's rule cannot be kept to the letter. 4 (whole list disabled while waiting) accepted: stricter, not contradicted. 5 (retry button under the failed-read sentence) accepted; the two-sentence form is M-1. 7 (link indent) accepted: it is the list-link look the styleguide names.
- **Slices 5-11 as slices** (no review of their own):
  - Slice 5 (`175d6d42`): the client matches the routes. The executor's own-work check named its weakest point, the role reading through `register`. That point is held by `roleOf` being one function used for all three answers, and by the test of a non-`owner` role in `tests/view/account-screen.test.mjs:6130`.
  - Slice 6 (`9faef372`, `57e03bc9`): I-1 and M-1.
  - Slice 7 (`e89c7333`, `861b6c9c`): I-1, M-1, M-15 and M-16. The executor's eight mutations are the strongest own-work check in the browser slices; I accept them as reported.
  - Slice 8 (`757f4a90`): the token-value invariant passes. The not-applied width rule (A5) is right: the screen has one area, and the UI check measured 1344 px at a 1900 px window.
  - Slice 9 (`c6a88e74`): M-17. The executor's mutation of `resolveScreen` is sound.
  - Slice 10 (`cb593e3f`, `3e3e4f3f`): correct. The `accountOf` normalization duplicates `roleOf`, which is harmless.
  - Slice 11 (`e9b68648`): M-2, M-5 and M-20. The schema-6 statements, which the executor did not check against the code, are true (see "Closed" above). The wrapper was never run (the executor said so). I compared it with the two older wrappers and with `log-line.ts`, which gives M-20.

## Structure of the code the change leaves

- Sizes: `python -B .the-way/task-cycle/change_file_sizes.py b1904c5b e9b68648`, exit 0. The table is kept in `reports/review-whole-evidence/change-file-sizes.txt`. The largest growths:
  - `src/server/database.ts` 848 → 942 (+94);
  - `src/browser/account-api.ts` 517 → 658 (+141);
  - `src/browser/styles.css` 3192 → 3300 (+108);
  - `src/server/account-routes.ts` 908 → 917 (+9);
  - new files `accounts-screen.tsx` 385, `accounts-entry.ts` 214, `owner-routes.ts` 155 and `account-role.ts` 92.

  Total +5177 lines, of which 3,884 are in test files.
- Size test: `guidelines/coding.md` holds no rule `### Size of a function and a file` (its *Rules* are Linter, Formatter, Dependency audit and five logging rules), so the product has no test of size. No second run in worktrees of the base and the head was needed, and none was made. Every finding of structure is therefore Minor (WAY-363): M-11 and M-17.
- Read in the files that grew: `database.ts` gains `markBlocked`, taken out of `blockAccount` and shared with `blockForPanel` — no duplicate block logic — and `accountFromRow`, taken out of `readAccount` and shared with `listAccounts`. Both are improvements. `account-routes.ts` exports seven helpers and an extracted `accountPrelude`, all used by `owner-routes.ts`, with no behaviour change (`tests/http.test.mjs` 95 pass at slice 4). No code is left without a user. One name stopped being true: the comment "The body limit of the six small routes" (`account-routes.ts:63`) now also bounds four routes of another file. That is trivial and I did not grade it.

## Declined to judge

- Rate limiting of the owner routes: the task and D-137's accepted risk (five accounts, all the human's) do not ask for it.
- The gap between the role read in `ownerOnly` and the operation's own transaction within one request: D-410 promises the role "from the next request"; the block reads the role in its own transaction, which is where it matters.
- The wording of the invariants `account-schema-lifecycle`, `account-database-schema` (which do not name the role) and `account-session-authorization` ("an … email address supplied by the caller cannot authorize … changing another account", which the owner routes satisfy only because the role, not the address, authorizes): unchanged entries outside the task's rows, and true as read.
- „Wciągnij programy z poprzedniego zapisu” not appearing in the UI check after a reset of an empty game: behaviour of D-401, not of the panel.
- The page showing the owner link only after a reload, as behaviour: it follows D-400's precedent for the privilege. Only the skill's wording is graded (M-2).

## Checks run

All from the worktree root, each in the foreground with a 280-second limit (one script, `.runs/review-whole/checks.sh`, run in the background and waited for). Summary in `reports/review-whole-evidence/checks-summary.txt`.

| Check | Command | Exit |
|---|---|---|
| Head | `git rev-parse HEAD` | `e9b6864865f7abbf11466b4b231664cb1ad3aebd` |
| Server unchanged since slice 4 | `git diff --stat a3bb2bf6..e9b68648 -- src/server` | 0, empty |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Typecheck | `npm run typecheck` | 0 |
| Prettier on the 27 changed TS/TSX/MJS/CSS files | `npx prettier --check <files>` | 0 |
| ESLint on the 26 changed TS/TSX/MJS files | `npx eslint <files>` | 0 |
| Owner routes | `npm test -- tests/owner-routes.test.mjs` | 0 (13 pass) |
| Database operations and command | `npm test -- tests/account-owner.test.mjs` | 0 (13 pass) |
| Browser client | `npm test -- tests/account-api.test.mjs` | 0 (39 pass) |
| Screen of the list | `npm test -- tests/view/accounts-screen.test.mjs` | 0 (21 pass) |
| Page with the panel | `npm test -- tests/view/owner-panel.test.mjs` | 0 (4 pass) |
| Menu bar | `npm test -- tests/view/menu-bar.test.mjs` | 0 (32 pass) |
| Addresses | `npm test -- tests/view/screen-address.test.mjs` | 0 (61 pass) |
| Registry | `npm test -- tests/view/screen-registry.test.mjs` | 0 (15 pass) |
| Skill copies and description | `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 (5 tests) |
| Sizes | `python -B .the-way/task-cycle/change_file_sizes.py b1904c5b e9b68648` | 0 |
| Skill and troubleshooting copies | `cmp` of the two `SKILL.md` and the two `troubleshooting.md` | 0, identical |
| Manual | the UI check's screenshots `05` and `08` viewed | „Wróć” underlined text in the block confirmation, a framed button in the reset confirmation (I-1) |

Not run, with the reason:
- the product's full gate (bare `npm test`): the orchestrator's;
- `tests/account-storage.test.mjs`, `tests/account-backup.test.mjs`, `tests/startup.test.mjs`, `tests/http.test.mjs`, `tests/transport.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/previous-save.test.mjs`, `tests/deploy/test_account_backup_stream.py`, the token, focus and private-path invariants: run green by the slice reviews and executors on unchanged code, and covered by the orchestrator's gate;
- `tests/quality/test_quality_invariants.py`: ruff and shellcheck are not found in this worktree's environment (review-1); Prettier, its third check, I ran directly;
- no mutation run of my own: the slice-4 review's ten and the slice-7 and slice-9 executors' mutations cover the code my findings do not touch, and none of my findings needs one.

## Reach beyond the handoff

- `src/browser/view/program-list.tsx:60-61`, `:284-292` (grep): to compare the reset confirmation's „Wróć” (I-1).
- `src/server/log-line.ts:47-94`: the line the last resort writes (M-20, O-4).
- `src/server/database.ts:310-334`: the schema check, to verify the skill's version-6 statements (O1 closed).
- `src/browser/styles.css:219-245`, `:797-811`: the screen grid and the reset rules (M-15, A5).
- `foundations/invariants.md`: the entries `account-client-outcomes`, `account-client-requests`, `account-session-authorization`, `blocked-account-access`, `account-schema-lifecycle`, `account-database-schema`, `player-self-registration`, `previous-save-slot`, `unblock-restores-no-session`, `unblock-restores-no-link`, `player-server-session` and `owner-panel-authorization`, whole: the invariants the change reaches.
- The UI check's screenshots `screenshot 05-owner-block-confirmation` and `screenshot 08-player-zacznij-od-zera-confirmation` in `.runs/ui-check/`, as the handoff allows.

## Working copies

- `.runs/review-whole/` in the worktree held the diffs per area, my check script and its outputs, the decision selection, the invariant extract and the size table. Removed before returning (see the last line of this section). No worktree, clone or screenshot was made.
- Kept beside this report: `reports/review-whole-evidence/change-file-sizes.txt` and `reports/review-whole-evidence/checks-summary.txt`.
- The test runs wrote the product's own `dist/` build, which is not a working copy of mine.
- Removal of `.runs/review-whole/`: done.

## Unread material

- **Decisions:** the selection is 341 decisions whose *Scope* names a touched part (account-server, browser-view, agent-workflow, deployment, product-foundation), the task's *Decisions in play* among them.
  - **Read whole (35):** D-12, D-39, D-40, D-41, D-42, D-43, D-44, D-45, D-46, D-47, D-104, D-112, D-137, D-253, D-264, D-265, D-266, D-267, D-275, D-276, D-277, D-278, D-280, D-281, D-285, D-353, D-354, D-400, D-401, D-402, D-407, D-408, D-409, D-410, D-411.
  - **Read in part (4):**
    - D-109: binding paragraphs, changed *Verification*, *Rationale*, *Rejected*; its unchanged first *Verification* lines only in diff context;
    - D-202: binding paragraphs, changed *Verification* and *Rationale* in the diff;
    - D-252: the changed paragraph, *Verification* and *Rationale* in the diff;
    - D-279: its binding sentence only.
  - **By title only:** the other 302.
  - **Decisions that bear on the change and stayed unread whole:** D-99 (normalization of the address), D-139 and D-160 (blocked accounts), D-96, D-97, D-101, D-157, D-211 (the page and the session), D-36, D-37, D-114, D-117 (exemplars), D-15, D-229, D-231 (rollback, SQLite, backup), D-262, D-286, D-395. The foundation agent's unread list (D-99, D-96, D-97, D-101, D-152, D-156, D-157, D-204, D-231, D-399, D-401, D-402, D-206, D-211, D-160, D-277, D-332) is partly closed by this review: D-401, D-402 and D-277 are now read whole.
- **Guidelines:** read whole `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-browser-api-client.md`, `guidelines/coding-http-application.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md` and `guidelines/styleguide-browser-view.md` (lines 968-1012 of it as the diff, which adds them whole). Not selected and not read: `guidelines/coding-account-policy.md` (`owner-routes.ts` and `account-role.ts` import `normalizeEmail` but change no account-policy file), and the other kind files.
- **Foundation, other files:** the part map read whole. The glossary: the entries `owner`, `blocked account` and `previous-save privilege` whole (the diff), not the rest of the file. Invariants: the twelve named under Reach, not the rest of `foundations/invariants.md`.
- **Cycle documents:**
  - read whole: the task, the plan, the foundation report, the executor reports of slices 5-11, the review reports of slices 1 and 4, the UI-check report;
  - read only in their Minor sections: `review-2-report.md`, `review-3-report.md`, `review-fix-2-report.md`, `review-fix-4-report.md`;
  - not read: the executor reports of slices 1-4, the fix reports, `review-fix-1-report.md`, `review-fix-3-report.md`, and the handoffs other than mine.
- **Tests:**
  - read whole: `tests/view/accounts-screen.test.mjs`, `tests/view/owner-panel.test.mjs`;
  - read as diffs: `tests/view/menu-bar.test.mjs`, `tests/view/screen-registry.test.mjs`, `tests/view/account-screen.test.mjs`;
  - only grepped, not read: `tests/owner-routes.test.mjs` (1209 lines; tests and invariant citations listed), `tests/account-owner.test.mjs` (750 lines; helper and usage test located), the additions to `tests/account-api.test.mjs`, `tests/account-storage.test.mjs` and `tests/view/screen-address.test.mjs`. The slice reviews read the server-side files whole.
- **Source:** every hunk of `src/` in the range read; the unchanged rest of `database.ts`, `account-routes.ts`, `app.ts`, `transport.ts`, `menu-bar.tsx`, `game-view.ts` and `app.ts` (browser) not read.

## Searches not found or unclear

- An allowance in D-275, D-44 or the styleguide for a secondary action outside a form, in a confirmation: not found (I-1).
- A statement of how an open page learns that its account's role changed: not found in D-410, D-280 or D-281. D-400 says it for the privilege ("a page that is open keeps the flag it was given until it reloads") (M-2).
- Whether „Nie udało się wczytać listy kont. Spróbuj ponownie.” counts as the "jedno zdanie" of the styleguide: unclear. It is two by punctuation, and `app.ts` has the same form for the game (M-1).
- A test of the reset route stopped by a revoke through the panel, which D-400's *Verification* names: not found. `grep` of `tests/owner-routes.test.mjs` finds only `/api/previous-saved-game` (M-19).
- A rule of size in `guidelines/coding.md`: not found, so there is no size test to run in worktrees.
- ruff and shellcheck binaries for `tests/quality/test_quality_invariants.py` in this worktree: not found (as review-1 found).
