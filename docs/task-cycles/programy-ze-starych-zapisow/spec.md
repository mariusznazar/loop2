# Spec — Wciąganie programów ze starych zapisów na uprawnienie i reset gry od zera do testów

- Task: `docs/task-cycles/programy-ze-starych-zapisow/task.md`
- Open choice: the contract across the trust boundary for the previous saved game state and the reset; where the previous save moves inside the server and what the reset does to the revision of D-209 and its basis; exactly which saves move; how the browser reads a document of an older version for its programs and numbers a taken name; the operator command of the privilege; what the browser shows while and after the fetch and the reset.

Words used below. The **previous save** is the one saved game state the server holds beside the account's current one (the task's "poprzedni zapis"). The **privilege** is the account's flag set by the operator command (the task's "uprawnienie"). The **current save** is today's `saved_games` row. The **schema version** (the database's `user_version`) and `SAVED_GAME_VERSION` (the version of the shape of a saved game state) are two different numbers that both read 5 after this change: the change adds schema step 5 and leaves `SAVED_GAME_VERSION` at 5, because no type of the game state changes.

## Intent

A player whose saved game state is replaced by a newer shape of the game, or who resets the game for a test, no longer loses the programs: the server keeps the replaced document as the previous save, and an account that holds the privilege can append the programs of that document to the list of its present game, and can start the game from zero. Everything else about D-206 stays: the game loads whole only a document of its current version.

## Goals and non-goals

Goals:

- The server keeps one previous save per account, for every account, with or without the privilege (task point 1).
- An operator command grants and revokes the privilege (point 2); the `loop2-deploy` skill describes it (point 6).
- A privileged account with a previous save sees the button that appends the programs of that save (points 3, 4); a privileged account sees the reset control, with a confirmation (point 5).
- A document of any older version gives its programs one by one, each through the check of the editor; what the game does not admit is skipped and named.

Non-goals:

- Migration of whole saves between versions (out of scope of the task). The reader of this change reads programs and nothing else of a document.
- More than one previous save, a history, an undo of a pull, a pull that replaces the list, a pull that stops at the first refused program.
- An HTTP route that grants the privilege (D-137 forbids an operator HTTP route; only the container command does).
- A change of `GameState`, of `SAVED_GAME_VERSION`, of the load (`loadSavedGame`), of D-209, of D-213 or of the sentence of D-96 for a refused load.
- A deletion of the previous save by anything but the next move into the slot (or the deletion of the account, which cascades).
- A save made by the page before a reset, and any new state of the saver for the reset.

## Constraints

- **The task**, every sentence. In particular: the previous save has the 64 KiB limit of the saved game state; the privilege covers pull and reset together; the button shows only for a privileged account with a previous save; a reset moves the current save to the previous slot, the game starts anew, and a card open before the reset gets the refusal as today (D-209, which the task keeps unchanged: "Bez zmiany"); D-213 is unchanged too; the server computes nothing of the game (D-07).
- **Reading of the task's point 1.** "The save that replaced an accepted save of a higher version" is read as: the stored save that an accepted save of a higher version replaces moves to the previous slot (the task's line under D-210: "przyjęcie zapisu wyższej wersji odkłada dotychczasowy jako poprzedni zapis"); the reset moves the stored current save. The other reading (the incoming save is stored as previous) contradicts point 5 and the task's D-210 line.
- **D-07, D-210.** The server reads nothing inside the game. It copies the stored text; it compares the version numbers only.
- **D-104, D-109, trust boundary.** `src/server/**` and `src/browser/sim/saved-game.ts` are trust boundaries. Every state-changing route passes the guards of `mutationGuards` (exact Origin, JSON, body limit); input is an object of expected fields with explicit checks; a session alone names the account; no field of a request names an account.
- **D-112 and the schema rule.** One step per version, a step that reached the test server is never edited (steps 1–4 stay), a step is additive and keeps every row; transactions hold no asynchronous work. Block, version, revision and now the privilege are read in the transaction that writes.
- **D-213, D-386 and the kind guideline `guidelines/coding-saved-game.md` stay as they are** and govern `saved-game.ts` and the load only. The reader of this change is a new simulation file outside that kind (decision 4); it keeps the same discipline by the spec's own words: it takes `unknown`, throws for no value a document can hold, changes nothing passed to it, shares nothing with it, reads no clock, imports only simulation files; an error of its own code is not a skip and propagates.
- **D-137, D-354.** The operator's sentence is not a log line; a command that touches the accounts' data installs its own last resort; only a human runs it.
- **Invariants that this change touches** (listed under Foundation entries): `save-version`, `account-client-outcomes`, `account-session-authorization`, `player-save-isolation`, `account-mutation-request-guards`, `account-schema-lifecycle`, `account-database-schema`.
- **Code as it stands.** `writeSavedGame` in `src/server/database.ts` already reads block, stored version and stored revision in one transaction, in the order blocked, outdated, conflict; the page builds a game from a refused load with `revision` equal to the stored revision, so the first save of a new game after a version bump is accepted on its basis and is the save that moves the old one. `readAccount` validates every column of `accounts`.
- **Deployment.** The first deployment of the change moves the persistent database of the test server to schema version 5; from then on `main` before this change fails health with exit 8 (the same property of every earlier schema step, as the skill states for versions 2 to 4). A trial deployment of the branch before the merge has the same effect on `main`'s deployments. This is the human's decision at deployment, not the change's.

## Decisions

### 1. The HTTP contract

Two new routes and one new field. Both routes sit in the router's `paths` table, so they carry `Cache-Control: no-store`, the transport check and the 503 of a server without accounts like every account route.

**`GET /api/previous-saved-game`** — the previous save of the session's account.

- Checks, in this order: the transport check of the router; the session (no session, a blocked account: 401 `unauthenticated`, as `GET /api/saved-game`); the privilege of the account read at that moment (without it: 403 with the code `previous-save-forbidden`, whatever the slot holds, so the answer tells nothing of the slot); then the read.
- Answer 200, JSON, built as the answer of `GET /api/saved-game` is, the stored text embedded as it is: one key `previous`, holding either `null` (the account has none) or an object with exactly `version` (the stored version) and `game` (the stored game). No revision is sent: the browser does not need it. A `null` is a success of its own, never a 404, for the reason D-204 gives (an unmatched `/api/` request is a 404 too).
- No input: no body, and the query string is read by nothing.
- The answer is at most the stored document (64 KiB, D-104) and a few bytes of envelope.

**`POST /api/saved-game-reset`** — moves the current save to the previous slot and leaves the account with no current save.

- Checks, in this order: the transport check; the guards of D-104 with the 16 KiB limit of the small routes (Origin, JSON, compressed bodies refused, a non-object refused); the body is an object with no field (any field: 400 `invalid-request`, as the logout route); the session (401 `unauthenticated`); then one database write that, in its own transaction, reads the block (blocked: 401, as a save of a blocked account), then the privilege (without it: 403 `previous-save-forbidden`), then does the move.
- Answer 204 with no body when the move was made and also when the account had no current save (nothing to move: nothing changes, the previous slot stays as it is). The browser needs no difference between the two.
- The business event `saved-game-reset` with the account's identifier is logged when a current save moved.

**The account answer** — `GET /api/account`, the login and the registration answers all carry the account's body; it gains one boolean, `previousSaveAllowed`, the privilege. It carries nothing of the slot, so it leaks nothing about it. The browser reads it with the rest of the account when it names the account, and shows no control and sends no request for the previous save when it is false.

Ways considered:

- *Fold the previous save into the existing route* (`GET /api/saved-game?previous=...`, `DELETE /api/saved-game` for the reset). Rejected: the route that builds the game would hold a mode that serves another document, one parameter away from the document the game is loaded and overwritten from; `DELETE` stands outside the guards written for `POST`/`PUT` and carries no JSON body for the check of the media type.
- *One status route for everybody* answering the privilege and the existence of a previous save. Rejected: every account would ask it on every Programs screen, and a non-privileged account would get a success from a route that holds a privileged function.
- *The privilege learnt from a failing request* (403 on the first `GET`). Rejected by the task ("so the button shows without a failing request").
- *404 or an empty success for an account without the privilege.* A 404 reads as a missing route (D-05, D-204). An empty success answers a non-privileged account the same as a privileged one without a slot; it also leaks nothing, but then the reset, which cannot answer "done" when it moved nothing because of the missing privilege, would still have to be a 403, and two routes would refuse in two ways. One refusal, 403 with its code, for both.
- *The existence of the slot as a second boolean of the account answer.* Rejected: it goes stale at once (the slot appears at the first save after a bump, in a page that is already open) and the account answer is read once per page load.

Price if wrong: before the first deployment, the contract is cheap to change. After it, the only user is the operator's own account; the cost is a page and a route changed together in one deployment (the client and the server always deploy together; an old tab only ignores the new field).

### 2. Where the previous save moves, and the revision

**The schema step.** One new step, number 5, added at the end of the list, additive, editing none of 1–4:

- a flag column on `accounts`, not null, default 0, checked to 0 or 1, so every existing account stays unprivileged and unchanged;
- a table of previous saved game states, one row per account: the account's identifier as key and as a foreign key that cascades with the account, the version (at least 1), the revision (at least 1), and the game text with the same 64 KiB check by bytes as `saved_games` (a text cast to a blob, D-104).

Ways considered for the slot: columns on the `saved_games` row — rejected, because the reset deletes the current row and the slot must outlive it, and because D-112 keeps the saved game state out of the row every login reads; a table of previous saves with a row per move (a history) — rejected by the task (one previous save). The previous table is a copy of the current table's shape, so one reading and one validation of a stored game serve both.

**Operations in the database class** (units of `database.ts`, each one transaction, each reading in it what it checks):

- The save write (existing) keeps its order: blocked, outdated (stored version greater than the incoming one), conflict (stored revision other than the basis), and keeps the revision it gives (the stored revision plus 1, or 1 where the account has no current save). After those pass, and only then, when the account has a current save of a version lower than the incoming one, the same transaction first copies the current row into the previous slot (replacing what the slot held) and then writes the new current row. A thrown error rolls back both.
- The reset write: reads blocked, then the privilege, then the current save; with a current save it copies the row to the previous slot and deletes the current row, in one transaction; without one it changes nothing.
- A reader of the previous save by account identifier, validating the stored columns as the reader of the current save does.
- A write of the privilege by the normalized address: one transaction, outcomes granted / already granted / revoked / not granted / no such account, returning the account identifier for the event.

**The revision after a reset: D-209 stays as it is.** After a reset the account holds no current save, so a save based on 0 is accepted and gets revision 1, and any other basis is refused, as D-209 says. A card open across the reset, whose basis is not 0, gets the refusal as today (409 `save-conflict`); it loads the server's save, which is none, and builds a new game by the path and with the sentence D-209 already has. The reset itself names no basis (the player confirmed the act; from a stale card it moves what the server holds, which still lands in the previous slot and so is not lost).

The prices of keeping D-209 as written, all in the privileged player's own account:

1. A card open across the reset whose basis equals a revision that the new game's saves have since reached (it needs equal numbers) is accepted over the new game. What is lost is the new game; the previous save is never touched by a save.
2. A card whose basis is 0 (it loaded when the account had no save and has not saved since) is accepted after a reset, as it is today before a first save.
3. The sentence of D-209, "Gra została zapisana w innej przeglądarce. Wczytano ten zapis.", is imprecise for a card that loses to another card's reset and finds no save; it stays.
4. A tab of an older version after a reset bypasses D-210: that guard compares with the stored current save, and after a reset there is none. An older tab whose save is refused as a conflict loads no save, builds a game of its own version and saves it on basis 0, accepted with the lower version; a reload with the current code then refuses it as another version, and the first save of the new game moves it into the slot, replacing the document the reset put there. The harm is the programs of the reset document, in a rare sequence (an older tab open across a deployment and a reset). It is not closed here; D-210 stays as the task has it, apart from the move.

Way considered: continuing the revision from the previous slot's revision after a reset closes price 1 with one more read in the save write. Rejected: it changes D-209, which the task keeps unchanged, adds a coupling between two tables and calls for a sentence of its own. Price if the choice is wrong: price 1 happens, once, to one account.

Price if the moves are wrong as a whole: a lost previous save is a lost document of one player's own (D-07); the server's other state is unharmed because a move is a copy plus the usual write inside one transaction.

### 3. Which saves move

Exactly two things put a document into the previous slot, and each replaces what the slot held:

1. An accepted save whose version is higher than the stored current save's version: the stored current save moves.
2. The reset, with a current save present.

Nothing else moves: an accepted save of the same version as the stored one (the stored one is overwritten, as today); a save refused as blocked, outdated or conflicting (it writes nothing, so it moves nothing); a first save of an account with no current save; the block or unblock of the account; the grant or the revoke of the privilege (the slot stays while the privilege is off and is there again when it is granted); a load. The slot is not read by the game's load and not written by the browser.

Price: two version bumps before the pull, or a reset before the pull, replace the older previous save and its programs; the confirmation of the reset must say so (decision 6). The task accepts this ("kolejne odłożenie nadpisuje wcześniejszy").

### 4. What the browser does with the fetched previous document

**Which code reads it.** A new simulation file, `src/browser/sim/previous-programs.ts`, outside `saved-game.ts` and outside the kind `saved-game`; its kind guideline is `guidelines/coding-simulation-module.md` (it neither turns a game state into a document nor a document into a game state or a refusal; it takes programs out of a document). `saved-game.ts`, `loadSavedGame`, D-213 and `guidelines/coding-saved-game.md` stay unchanged, and D-206 keeps the load whole-or-nothing; the pull is a second, separate act that reads less. The file has its own small checks (a plain object, an own data key, a list without holes) and imports from the simulation `checkProgram` and `ProgramCheckError` of `programs.ts` alone; it needs nothing exported from `saved-game.ts`. It is a new place where a document that came from the network is read, so the part map's *Trust boundary* of `simulation` gains it (decision 7, Foundation entries), and crafted documents are the subject of its test.

- *Input:* the document the client hands over, an `unknown`. *Output:* either "unreadable" or the programs read: for each item of the document's list of programs, in order, either a program with its name and its content as `checkProgram(content, null)` built it, or a skipped item with the name it is told by.
- *Unreadable* means: the document is not a plain object with an own `version` that is a safe integer from 1 up to the current `SAVED_GAME_VERSION` and an own `game` that is a plain object with an own `programs` that is a list without holes. A version above the current one is unreadable, because its shape is unknown to this code, which is the conservative reading; a version from 1 to the current is read, including the current (the reset puts a current-version document in the slot).
- *Items are read strictly, one by one.* An item is accepted only when it is a plain object with exactly the own data keys `id`, `name` and `program` (the shape every version from 1 to 5 wrote, as the history of `saved-game.ts` shows), its `name` is a text that is not empty after trimming, and `checkProgram(item.program, null)` accepts its program — the check the editor uses for a program (`editProgram`). An item that fails any of these is skipped and named, and the others go on: the item's name when it is a non-empty text, else its place on the list counted from 1. The value of `id` is not used and not checked: the pulled program gets a number of the present game. A refusal of the check is only `ProgramCheckError`; every other error propagates. Nothing of the document outside `version`, `game.programs` and the items is read.
- *Why one by one.* A program of version 2 has no trip plan and the check refuses it; a program naming an action or an item the data no longer has is refused by the closed lists; refusing one must not refuse the others (the task).
- The strict `matches` comparison of the load is not applied to a program's content: the editor's check builds the program from the closed lists and drops what it does not know, which is what "the same check as the editor" is.

**Appending.** A new function in `programs.ts` (beside `createProgram` and the naming functions it uses), not in the reader's file, takes a game state and the programs read and returns the game state with them appended at the end of the list in order, each with the next program number (`nextProgramId` rises by the count, D-165) and a name free on the list; nothing else of the game state changes: no copy, no count, no pick, no program used last. Names follow D-169's rule (trimmed, letter case ignored) and are taken one program at a time against the list including those just appended: the name as it stands if free; else the name, a space and `(n)` for the smallest n from 2 that makes it free — "Las (2)", and "Las (3)" when "Las (2)" is taken. A name that already ends in a number in parentheses gets another: "Las (2) (2)".

**What the player is told.** One result line in the Programs screen, after each pull, whose content is:

- how many programs were appended, when any were;
- one sentence naming the skipped programs by the names the reader gave them, all of them, when any were skipped (the task: "jednym zdaniem podaje nazwy pominiętych");
- when the document is unreadable, or readable with no program accepted and none skipped, one sentence that the previous save holds no programs this version of the game can read; nothing appended;
- the previous save is gone since the check (the answer is `null`): one sentence that there is none, and the control goes away;
- a failure of the fetch: one sentence that the previous save could not be fetched, the control kept for a retry; a 401 is handled as a save's 401 (D-211) through the page; a 403 `previous-save-forbidden` as one sentence that the account has no such privilege now.

The names of skipped programs come from the document and are shown only as text. After a pull the game saves at once, as it does after any act on the list of programs (D-207); a game that comes out over the limit gets the sentence of D-208 as any save does.

Ways considered for the reader: a lenient `loadSavedGame` for older versions — rejected, it is the migration D-213 forbids ("a lenient load that fills missing keys"); the reader inside `saved-game.ts` — rejected, it reads less than the kind's guideline allows ("Wolno odmówić więcej, niewolno mniej") and would change that guideline and D-213 for a function that is not a load; reading the old document's whole game state and picking programs from it — rejected, it reads what the task says the game does not read; items read leniently (any other key ignored) — rejected, the items had one shape in every version and strict items skip one by one the same way. Price if wrong: a program the reader accepts that the game's own load would refuse is impossible, because the same check admits both; a program wrongly skipped is lost for the pull but stays in the slot.

### 5. The operator command

- **File and name** by the pattern of `src/server/account-block.ts`: `src/server/account-previous-save.ts`, run as `docker exec loop2 node dist/server/account-previous-save.js grant <email>` and `... revoke <email>`.
- **Same mechanics as the block command:** the address is named as at login (`normalizeEmail`); it opens the existing database named by `LOOP2_DATABASE_PATH` beside the running server with the server's own opening rules; makes one change in one transaction; closes it; `installLastResort` with its own name; of a database error only kind and code, through `writeFailure` (the failure line is a JSON line, the sentence beside it is not a log line, D-354); the same exit codes: 0 the account is in the state asked for, 1 the database could not be opened or changed, 2 wrong arguments, 3 no database file, 4 no account has that address, and every non-zero exit changes nothing.
- **Sentences** of the command say, in the manner of the block command's: that the privilege was granted, or revoked; that the account already held it, or already did not hold it ("nothing changed"); that no account has the address ("nothing changed"). Wrong arguments print the usage line and "Nothing changed."
- **Events:** a change writes one JSON event line with the account's identifier, named `account-previous-save-granted` and `account-previous-save-revoked` so that the skill's existing filter for the lines appended to `/var/log/loop2-app.log` (events beginning with `account-`) lets them pass; the failure line carries `account-previous-save` as its name.
- **What it does not do:** it ends no session and stops no link (unlike the block); a page already open keeps the flag it was given until it reloads, but the server decides at each request (the reset reads the privilege in its transaction, the fetch at request time).
- **The `loop2-deploy` skill**, both byte-identical copies (`.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md`, which a test compares), gains a section for this command as "Blocking a player account" describes the block: only the human runs it; the plain commands; the way to keep the event lines in the dump file with the filter and its tag; what each of grant and revoke does and does not do; what it prints and the exit codes; what it touches. Two passages that the new appended lines make false are edited in the same pass: "The `account-block` lines, which the human appends to the same file ... Nothing else reaches it." (`SKILL.md` lines 265-266, in "Seeing deployments") and "the human's `account-block` lines" in the paragraph on how an agent reads the file (line 280), which must name the lines of the new command too. Its rollback paragraph and `references/troubleshooting.md` (the paragraph "A database newer than the code", and the account-related lines of `SKILL.md` around 249 and 453) say that the current code writes schema version 5, what step 5 adds, and that code that knows only version 4 or older refuses the database, as they say for versions 2 to 4.

Ways considered: one command with both block and privilege actions — rejected, the block command's file and its documented usage line are an interface the skill and tests name; a flag in a configuration list of addresses — rejected by the task. Price if wrong: a rename of one file and its skill section.

### 6. What the browser shows

The task fixes the buttons' names and the confirmation of the reset; the maker places the reset control by `guidelines/styleguide-browser-view.md`, and the spec fixes only this about it: the control exists only for an account whose account answer says `previousSaveAllowed`; it is in the game (not outside it); and it is behind the confirmation, the click that opens the confirmation changing nothing. For any other account nothing of it is in the page and no request for the previous save or the reset is ever sent.

**The pull button.** It stands on the Programs screen, with the list's other acts (the screen of D-166/D-167), is available whenever that screen is shown, including while a manual map run waits or goes on, and exists only when the check below says the previous save exists. A privileged account's Programs screen asks `GET /api/previous-saved-game` when the screen is shown (the answer is used only to show or hide the button; nothing is kept between openings). While the question is open the button is not shown. An answer of a document shows it; `null` or a failure leaves it away (a failure of the check shows one sentence that the previous save could not be checked; the next opening asks again). Pressed: the button shows its waiting state and is not pressable; the page fetches the previous save again (so the pull works on what the server holds now); the result decision 4 gives is shown; the button returns to its resting state and stays while the previous save exists (a second press appends copies again, as the task accepts). The sentence of a result or a failure stands next to the control it answers.

**The reset.** The control opens a confirmation, which says: the present game goes to the place of the previous save, a previous save already there is replaced and its programs cannot be pulled any more, and the game starts from zero; with a way to confirm and a way to withdraw that changes nothing. After the confirmation:

1. The page sends no save of its own first: programs are saved right after each edit (D-207), so the server's current save already holds them.
2. The page sends `POST /api/saved-game-reset`. While it waits, the control shows its waiting state, and the outcomes of the old game's saver (conflict, outdated, signed out) are held by the page, as the page already holds them while a logout is under way (`loggingOut` and `deferred` in `app.ts`), and acted on only if the reset fails; "Wyloguj" is not pressable. No new state of `GameSaver` is asked for.
3. On 204 the page drops the old game with its saver and builds a new game as for an account with no save (revision 0, a new game, a new saver), showing one sentence above it that the game starts anew and the previous game waits as the previous save; the held outcomes are dropped; no save is sent at once, as for an account with no save. A save of the old game that reaches the server after the reset has a basis other than 0 and gets the conflict of D-209, which nobody acts on.
4. On 401 the page proceeds as for a save with no session (D-211). On 403 one sentence that the account has no such privilege now. On any other failure one sentence that the game could not be started anew; the game stays, the saving goes on and the held outcome, if any, is acted on, the control available again.

Prices: the last moments of the old game not yet saved at the confirmation (a manual map run in progress, up to the 30 seconds of D-207's rhythm, or a save in flight) are not in the previous save; a save of the old game made while its basis is 0 (a game that had not yet saved) and landing after the reset is accepted, and the new game's first save is then refused as a conflict and loads it (price 2 of decision 2).

**A reset whose answer is lost** (a timeout after the server moved the save): the page shows the failure sentence and the game stays; its next save is refused as a conflict and the page loads the server's save, finds none and builds a new game on D-209's path with D-209's sentence, imprecise as price 3 of decision 2 names. The state heals itself.

### 7. Units and their interfaces

- `src/server/database.ts` — adds the schema step, the privilege to `Account`, the previous-save reader, the reset write, the privilege write, and the move inside the save write. Depends on nothing new. Used by the routes and the command.
- `src/server/account-routes.ts` — adds the two paths and handlers and the field of the account body. Depends on the database class and `mutationGuards`.
- `src/server/account-previous-save.ts` — the operator command. Depends on `database.ts`, `account-policy.ts` (`normalizeEmail`), `log-line.ts`.
- `src/browser/account-api.ts` — adds `previousSaveAllowed` to `Account` (a boolean the client requires, as it requires `emailConfirmed`), the refusal code `previous-save-forbidden` to `refusalCodes`, `loadPreviousSavedGame()` returning the result of a document or `null` read with the exact keys `previous`, `version`, `game` as `loadSavedGame` reads its answer, and `resetSavedGame()` as a 204 request with the empty-object body. Keeps no state.
- `src/browser/sim/previous-programs.ts` — new; the reader of decision 4. Depends on `programs.ts` (`checkProgram`, `ProgramCheckError`) and `SAVED_GAME_VERSION` from `saved-game.ts` as a value to compare, or a constant of its own that a test ties to it (the maker's choice; the file may not import anything outside the simulation).
- `src/browser/sim/programs.ts` — adds the append with numbering of names. Depends on nothing new.
- The view (`program-list.tsx` or the program screen's page code, `game-view.ts`, `app.ts`) — the pull button and its states, the reset control with its confirmation, the page's flow of the reset and the new game, the sentences. Depends on the client and the two simulation functions above. `game-saver.ts` is not changed for the reset.
- The skill and its references — the section and the paragraphs of decision 5.
- **Existing tests that read the schema version as 4 and must change with step 5** (verified in the code at the base commit): `tests/account-storage.test.mjs` lines 185-189 (version 5 as the first unknown one: becomes 6), 323, 347, 451, 487, 594, 639 (the current version after a move) and 1289-1290 (the assertion "no schema step is added", which the change makes false), with their titles and comments that say "version 4" (lines 318, 320, 444, 587); `tests/account-backup.test.mjs` line 281; `tests/deploy/test_account_backup_stream.py` line 90 (a test of the deployment part). The tests that read other versions (lines 215, 365, 508, 674, 705 and the 99 of `tests/startup.test.mjs`) stay.

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

## Left to the maker

- The Polish wording of every sentence of decisions 4 and 6, in the voice of the existing ones, and the roles the styleguide gives them.
- The place of the reset control, its confirmation's layout and the waiting states, by the styleguide; the exact names of the new methods, types, columns, table and codes (the names above are the spec's proposal where it gives one).
- How the page holds the old saver's outcomes during the reset (decision 6, step 2): by the existing mechanism of the logout or by a similar guard of its own; the spec binds the behaviour.
- How the Programs screen asks the question of the existence of the previous save and hands the answer to the button; how the view gets the client's two new methods.
- Whether the append function returns the final names or the page recomputes the count.
- The tests: which cases, their fixtures (a database of schema version 4 written in a test by its own schema, per the database guidelines; documents of versions 1 to 5 for the reader, with a version 1 program that lacks a trip plan, items with a foreign key or a missing key, and other crafted documents), and the changes to the existing tests that decision 7 lists.
- Whether the sentence for skipped programs shortens a very long list of names (the task says it names them; nothing in the spec shortens it).
- The text of the skill's new section and of the edited passages, and the exact paragraphs of `troubleshooting.md`; the `.agents` copy of `SKILL.md` stays byte-identical to the `.claude` one.

## Decisions (settled by the orchestrator after the review of the spec)

Rulings R1–R5 of the cycle record (`cycle.md`, *Questions and autonomous choices*) are applied above. The reviewer of the revision (`reports/spec-revision-review-report.md`, `PASS`) left four notes for the maker, settled here as autonomous choices:

- The name the append writes is the trimmed one the reader returned (the game's load refuses an untrimmed name, so a crafted name must never reach a save).
- The trust boundaries named in *Constraints* include the new reader file, `src/browser/sim/previous-programs.ts`; where the lines of this spec disagree on whether the reader imports `SAVED_GAME_VERSION`, it imports it (the reader needs the highest readable version), and the maker reads "imports only simulation files" accordingly.
- The new file stays under the kind guideline `guidelines/coding-simulation-module.md`; its strict items already meet the wording of `guidelines/coding-saved-game.md`, which the maker reads as well.
- Nothing stops a reset while a logout waits; the logout's own continuation covers it (`app.ts` already holds the old saver's outcomes). No change.
