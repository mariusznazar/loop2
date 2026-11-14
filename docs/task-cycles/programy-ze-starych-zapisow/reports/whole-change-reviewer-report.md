PASS 7adcc0bb

# Review of the whole change — programy-ze-starych-zapisow

Range `6f237fb8ce26450706d8738d3d3a07298e8ec110..7adcc0bbcd683e7f633cd1f37edbb570fb451251` (38 files, +5574 / -168), worktree `the task's worktree`, `git rev-parse HEAD` = `7adcc0bbcd683e7f633cd1f37edbb570fb451251` (the head given). I changed no tracked file and made no commit.

Counts (second pass, after reading the foundation and all guideline files whole): blocking 0, Minor within the task 16 (the final numbered list below), out of scope 3, and 6 lines of Declined to judge. The first line is unchanged: no new finding blocks.

## Changed files (added / removed lines, from `git diff --numstat`)

| File | + | - |
|---|---|---|
| `.agents/skills/loop2-deploy/SKILL.md` | 83 | 5 |
| `.agents/skills/loop2-deploy/references/troubleshooting.md` | 19 | 12 |
| `.claude/skills/loop2-deploy/SKILL.md` | 83 | 5 |
| `.claude/skills/loop2-deploy/references/troubleshooting.md` | 19 | 12 |
| `foundations/decisions.md` | 132 | 53 |
| `foundations/glossary.md` | 12 | 0 |
| `foundations/invariants.md` | 30 | 10 |
| `foundations/part_map.md` | 2 | 1 |
| `guidelines/coding-simulation-module.md` | 1 | 0 |
| `guidelines/coding.md` | 5 | 2 |
| `guidelines/styleguide-browser-view.md` | 1 | 1 |
| `guidelines/testing.md` | 8 | 3 |
| `src/browser/account-api.ts` | 52 | 2 |
| `src/browser/sim/previous-programs.ts` | 115 | 0 |
| `src/browser/sim/programs.ts` | 38 | 0 |
| `src/browser/styles.css` | 21 | 0 |
| `src/browser/view/account-card.tsx` | 7 | 2 |
| `src/browser/view/app.ts` | 87 | 8 |
| `src/browser/view/game-view.ts` | 276 | 8 |
| `src/browser/view/menu-bar.tsx` | 15 | 4 |
| `src/browser/view/previous-save-lines.ts` | 93 | 0 |
| `src/browser/view/program-list.tsx` | 157 | 5 |
| `src/server/account-previous-save.ts` | 95 | 0 |
| `src/server/account-routes.ts` | 72 | 0 |
| `src/server/database.ts` | 117 | 2 |
| `stryker.config.json` | 1 | 0 |
| `tests/account-api.test.mjs` | 287 | 8 |
| `tests/account-backup.test.mjs` | 1 | 1 |
| `tests/account-storage.test.mjs` | 713 | 18 |
| `tests/deploy/test_account_backup_stream.py` | 1 | 1 |
| `tests/http.test.mjs` | 524 | 1 |
| `tests/sim/previous-programs.test.mjs` | 571 | 0 |
| `tests/sim/program-list.test.mjs` | 85 | 0 |
| `tests/transport.test.mjs` | 115 | 0 |
| `tests/view/account-screen.test.mjs` | 12 | 2 |
| `tests/view/menu-bar.test.mjs` | 44 | 1 |
| `tests/view/previous-save.test.mjs` | 1361 | 0 |
| `tests/view/program-list.test.mjs` | 319 | 1 |

No screenshot or other image file is among the commits of the range (WAY-316).

## Verdict

PASS. No blocking finding. Every item of the task's *To do* 1-6, every row of *Settlements to record* 1-5 and every *Decisions in play* entry is met by the commits. The three user-visible flows work in a real browser. I found no Critical or Important defect at the trust boundaries.

## Coverage against the task

| Task item | Where met | How I checked |
|---|---|---|
| To do 1 — one previous save per account, for every account, written by a save of a higher version and by the reset, replacing the earlier one, 64 KiB | `src/server/database.ts` (`previous_saves` table with the byte check, `movePreviousSave`, the move inside `writeSavedGame` only after block/outdated/conflict pass, `resetSavedGame`) | read the code; `tests/account-storage.test.mjs` 82 pass; mutation `stored.version <= save.version` killed (1 failing) |
| To do 2 — the privilege, set and removed by a command in the container, four outcomes | `src/server/account-previous-save.ts`, `setPreviousSavePrivilege` | ran the command against a made-up account in the local start: `grant` (exit 0, event line with the account's number), `grant` again (exit 0, "already held"), unknown address (exit 4), wrong arguments (exit 2 with "Nothing changed."), `revoke` (exit 0) |
| To do 3 — button on Programy, any time, only with the privilege and an existing previous save | `game-view.ts` `askPrevious`/`pullPrevious`, `program-list.tsx` | real browser: no button for an unprivileged account, none for a privileged one with no previous save, the button after a reset |
| To do 4 — appended at the end, "Las (2)", skipped named in one sentence, same check as the editor, nothing else of the old save read | `previous-programs.ts`, `appendPrograms` in `programs.ts`, `previous-save-lines.ts` | real browser with a crafted slot (below); `tests/sim/previous-programs.test.mjs` 17 pass, `tests/sim/program-list.test.mjs` 33 pass; mutations (version bound, first number of the suffix) killed |
| To do 5 — "Zacznij od zera" with a confirmation, the current save goes to the previous place, the game starts anew | server reset write and route, `program-list.tsx`, `game-view.ts`, `app.ts` `resetGame` | real browser (below); mutations of the page flow killed |
| To do 6 — the skill describes the command | both copies of `SKILL.md` (new section "The previous-save privilege") and `references/troubleshooting.md` | `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` prints nothing; `tests/agent_workflow/test_loop2_deploy_skill.py` exit 0 |
| Settlements 1-5 | decisions D-393 (1), D-394 (2), D-395 (3, 4), D-396 (5) and invariants `previous-save-slot`, `previous-save-programs-reader` | read each whole against the code |
| Human action (grant the privilege on the test server) | not done by the change | the change only writes the command and its skill text; no route grants the privilege; no migration or script runs the command |
| D-209, D-213, D-96, D-137, D-07 unchanged | | the hunks of `foundations/decisions.md` (`git diff -U0`) start at D-44, D-104, D-109, D-112, D-167/D-169, D-206, D-210 and D-354/D-355; none falls in D-209 (base lines 4096-4139), D-213, D-96, D-137 or D-07. `git diff` of `src/browser/sim/saved-game.ts` is empty |
| Out of scope (migration of whole saves) | | the reader reads `version`, `game.programs` and the items only |

Source fidelity: the new decisions restate the task's and spec's answers; D-206 now says the game loads none of another version's document "as a game" and the previous save keeps it, and drops "including the player's programs" in the sense of "lost", as the task's D-206 line requires. The `save-version` invariant carries the exception for the pulled programs, as the task says. I found no added behaviour the task and spec do not carry and no dropped sentence. Two small additions go with E24 (D-44 gains "Zacznij od zera"), which the orchestrator wrote into the plan.

## The three flows, run by me

`npm run local` (https://127.0.0.1 with a port the system chose), `playwright-cli`, a made-up account `reviewer@example.test`, the grant by `node dist/server/account-previous-save.js grant …` against the local start's database. No screenshot was taken or published; I read page snapshots only.

1. Unprivileged account. Programy shows no pull and no reset control; `GET /api/previous-saved-game` and `POST /api/saved-game-reset` answer 403 `previous-save-forbidden` (the GET with `Cache-Control: no-store`); `GET /api/account` carries `previousSaveAllowed:false`; the page sent no request for the previous save before my manual one.
2. Privileged account (after the grant and a reload). Programy shows "Zacznij od zera", no pull button. The click that opens the confirmation changed nothing (request count the same). The confirmation's text names the replacement of an earlier previous save. "Wróć" closed it with the list unchanged. Confirm: the page showed a new game with one program, the sentence "Gra zaczyna się od nowa, a poprzednia czeka jako poprzedni zapis." above it, and the pull button; server `GET /api/saved-game` answered `{"save":null}` (no save sent at once) and the previous save held the two programs.
3. Pull. "Wciągnij programy z poprzedniego zapisu" gave "Program (2)" and "Program 2" next to "Program", the line "Wciągnięto 2 programy.", and a save at once (revision 1). I then wrote into the local database a previous save of version 3 with these items: a good program "Las", one without a trip plan, one with an extra key, one named with spaces, one with a number as its name, one named `<img src=x onerror=alert(1)>`, one named "program". The pull appended four ("Las", "Zla czynnosc", the `<img…>` name as plain text, "program (3)"), skipped four and said so in one sentence: "Pominięto programy, których ta wersja gry nie przyjmuje: „Bez planu”, „Obce pole”, bez nazwy (pozycja 4), bez nazwy (pozycja 5).". No element was injected. Console showed no error of the game's own.
4. Revoked while the page was open: the pull answered with the sentence "To konto nie ma już uprawnienia do poprzedniego zapisu." and the button went away; the reset answered "To konto nie ma już uprawnienia do zacznięcia gry od zera."; the server's save kept all seven programs and nothing moved.
5. Crafted requests (made from the signed-in page): reset with a field 400 `invalid-request`; with `[]` 400; `text/plain` 415; a 20 000-character body 413; two resets in a row 204 and 204 with the previous slot unchanged by the second; `POST /api/previous-saved-game` 404 as any unmatched API request. A card open across a reset: its next save was refused as a conflict and the page showed D-209's sentence "Gra została zapisana w innej przeglądarce. Wczytano ten zapis." and a new game, as spec price 3 says.
6. The command: outputs and exit codes as listed in the coverage table; the local start was stopped (`npm run local:stop`), the browser closed, `.playwright-cli/` removed. `npm run local` rebuilt `dist/` (ignored by git); no tracked file changed (`git status --short` empty, HEAD unchanged).

## Findings

### Blocking

None.

### Minor, within the task: the final numbered list (to cut into the findings file of the one fix round)

This list replaces the first one. Finding 9 of the first pass (a row for `previous-save-lines.ts` in `guidelines/coding-browser-module.md`) is **withdrawn**: the guideline itself says (rule *Nowy ekran i moduły w DOM*) that a file added after the last audit of the table has no row, and the file is a pure text module that builds no DOM. Findings 12 to 16 are new in the second pass, found by reading the decisions and the guideline files whole. Each carries the slice it comes from.

1. `tests/account-storage.test.mjs:1192-1197` — the comment says the block is read before the privilege, but the account in that step is blocked and privileged, so the step passes whatever the order. I checked the lines; the order is untested (the slice 1 reviewer's swap of the two reads left the file green). Fix: block an account that never got the privilege, or drop the sentence. Minor: nothing moves either way. Slice 1 (`896b7509`, fix `4e1decb2`).
2. `tests/account-storage.test.mjs` (the case "a reset moves nothing without the privilege, for a blocked account, and with no current save") — "nothing to move" is tried only with an empty slot (`empty@example.test`), so a reset with no current save that wrongly emptied an existing previous slot would not show. Add: reset once, reset again, check the slot still holds the first document. Minor: the code returns before touching the slot. Slice 1.
3. `tests/http.test.mjs`, cases "no session, a forged…" and "a reset with any field…" — the order "empty-object check before the session" (`src/server/account-routes.ts:574-583`) is pinned by no test (no request sends a field without a session). Minor: both answers are refusals and nothing leaks. Slice 2 (`41d80c2e`).
4. `guidelines/testing.md:173` (the `src/server/` row of *Trust boundaries*) — it names six of the seven new HTTP-level case titles; the case "the reset moves the save to the previous slot and answers 204, a second reset changes nothing, and a card on another revision then gets the conflict" is missing (I grepped the file: absent; every title the change does quote exists in `tests/`). Fix: add the title. Slice 2.
5. `guidelines/coding.md:131` and `:146` — the two edited lines run to about 107 and 109 characters in paragraphs wrapped near 80 (I measured the added lines). A reflow would keep the file's shape; no effect on a reader. Slice 3 (`d946a58b`).
6. `guidelines/coding-simulation-module.md:25` — the new table row is not aligned with the columns of the others (cosmetic). Slice 6 (`ea8de2c2`).
7. `tests/sim/previous-programs.test.mjs` — no case passes `undefined`, a `Map`, a class instance or a null-prototype object as a document or item, although the spec says "plain object" (the slice 6 reviewer's probe found the code right for each). One row each would pin the rule. Slice 6.
8. `tests/sim/previous-programs.test.mjs` — `HOSTILE_VALUES` has no deep or large list (the slice 6 reviewer ran a 5000-deep object and a 200000-item list by hand with no throw). A test would only record it. Slice 6.
9. `src/browser/view/app.ts` (the constant `GAME_STARTS_ANEW`, near line 57) and `src/browser/view/previous-save-lines.ts` (`RESET_NOT_ALLOWED`, `RESET_FAILED`) — the three sentences of the reset are split over two files (the slice 9 executor's own note). No effect on the player; a later reader looks in two places. Polish. Slice 9 (`7adcc0bb`).
10. `src/browser/view/app.ts` `logOut`, after `await client.logout()` (about lines 575-590) — a logout that passed its save and then fails uncertainly after a successful reset in between runs `if (save.kind === "conflict") reloadAfterConflict()` for the new game, which replaces the player's brand new game with another new game and shows the failed-logout sentence on it. It needs three things in the same few hundred milliseconds (a logout save that lost to a conflict, a reset that succeeded, a logout request that failed). Fix: a `game !== view` check after the awaits of `logOut`, with a test of the two orders. Slice 9.
11. `src/browser/view/app.ts` `logOut` and `resetGame` — a reset that succeeds while a logout still waits for its save drops the old game, so the logout's promise returns at `game !== view` and nothing more happens; `dropGame` sets `logoutWaiting` to false, so the player can press "Wyloguj" again. The spec's sentence "the logout's own continuation covers it" overstates (the continuation just returns); the player sees nothing wrong. No code change beyond finding 10; the spec's sentence could be corrected in the cycle record. Slice 9.
12. (new) No test shows that the game state after `appendPrograms` is admitted by the game's own load. D-386 says "the game never writes a saved game state that its own load discards", and a refused load discards the whole game (D-206), so a pulled program that the load later refused would cost the player the new game. Names are the likeliest cause (the load needs them trimmed, non-empty and unique case-insensitively). I probed it by hand against `dist/browser/sim/` (a game with a character and a save time, names `Program`, ` program `, `Program (2)`, `PROGRAM 2`, a name with Polish letters and an emoji, a 5000-character name; `savedGame` → JSON → `loadSavedGame`): `ok: true` for the whole set and for each alone, so the code is right. Add one round-trip case to `tests/sim/program-list.test.mjs`. Slice 6.
13. (new) `guidelines/testing.md` table of who may do what is stale after the change. The account answer now carries `previousSaveAllowed`, but the rows still say the answer holds "only" the identifier, the address and `emailConfirmed`: line 196 (`GET /api/account`, "z samym identyfikatorem konta, znormalizowanym adresem i znacznikiem `emailConfirmed`"), line 208 (`POST /api/accounts`) and line 211 (`POST /api/session`). The lists of routes in lines 195 and 213 (JSON 401 without a session; blocked account), 227 and 228 (Origin and body checks) and the count "na dziesięciu trasach" in line 229 do not name the two new routes. The tests of both routes exist (`tests/transport.test.mjs`, `tests/http.test.mjs`); only the guideline text lags, and a reader of the table would take the extra field as a defect. Slice 2 (the slice that added rows to this table) and slice 5 (the client).
14. (new) The destructive button now waits for the server, and three places still say it never does. D-44 as the change words it says a control awaiting a server response is disabled in `text-disabled`, "Zacznij od zera" among them; the pull button reads "Wciąganie…" while it waits. But `guidelines/styleguide-browser-view.md:255-257` says "Loading dotyczy tylko zwykłego przycisku … przycisk niszczący i przycisk wybrany w grupie nie czekają na serwer", `src/browser/kitchen-sink/kitchen-sink.ts:66-67` and `:233-236` show the destructive button's loading state as "Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz (D-44)" (D-45 asks the page to show each state or the reason it does not apply; the styleguide rule *The kitchen-sink page* asks that a new state reach the page in the same change), and the list of waiting labels in that styleguide bullet (lines 214-223) and in D-44 names neither "Wciąganie…" nor the destructive wait. Slice 8 made the destructive wait (and edited line 252 of the styleguide), slice 7 the "Wciąganie…" label. Effect: a dev-only page and two texts that say the opposite of the code; no effect on the player. Fix: a sample of the destructive button disabled on the kitchen-sink page, and the two lines of the styleguide and D-44's list of labels brought to the code.
15. (new) D-112 uses "reset" in two meanings in one decision. Its text first says "setting a password by a password-reset link …" and its Rationale says "A reset removes every session of the account in the same transaction as the change of the hash", and then, in the new sentences, "the reset reads the account's blocked state, its privilege and its saved game state in the transaction that moves the saved game state into the previous save" (decision paragraph) and "… in the transaction of the reset means no save lands between the check and the move" (Rationale). A reader of the same entry can take the second for the password reset. The glossary has no entry for either. The code names the two differently (`resetSavedGame` against the password flow). Fix: "the reset of the game" in the new sentences of D-112 (and, if the human wants it, a glossary entry that separates the two). Minor (the WAY-99 case, with the cited sentences). From the foundation entries (E4), no slice.
16. (new) The view tests pin the exact wording of sentences that no foundation entry fixes: for example `tests/view/previous-save.test.mjs` compares `[ ["form-note", "Wciągnięto 3 programy."]]` and the text of the skipped-names sentence. The spec leaves the wording to the maker, and D-395 states only what the sentence tells. `guidelines/testing.md` (*Behaviour, not implementation*) says not to fix the exact text of a refusal without a requirement that fixes it. Effect: a change of wording breaks tests that guard no behaviour. The repository does pin sentences that decisions quote (D-96, D-209, D-211); these are not among them. Fix: assert the parts the requirement fixes (the number, the names, the role) and keep the full sentence in one test at most. Slices 7, 8, 9.

### Out of scope (counted separately)

- `.claude/skills/loop2-deploy/references/setup_and_secrets.md:325-336` has a "merge nothing else to `main`" window for a request that brings saved game states (schema 4) and none for this change (schema 5). `SKILL.md` lines 530-537 state the same property for version 5, so no sentence is false. The task's *To do* 6 and the spec's list of passages do not reach it. Slice 4.
- The sentence of the pull that names skipped programs has no limit on the length of the list (the spec's *Left to the maker* leaves it open; the task says "nazwy pominiętych"): a document with thousands of unreadable items gives one very long line. It is the account's own document, 64 KiB at most. Slice 7.
- `guidelines/coding-browser-module.md` (the Example paragraphs *Gra na stronie i odpowiedzi serwera*, lines 300-349) lists when the page removes the game (logout, 401, a lost conflict) and the methods `createGameView` returns; after the change the page also replaces the game after a confirmed reset and the view returns `setReset`. An example, not a rule, and the spec's list of guideline edits does not include the file. Slice 9.

### Slice reviewers' Minor findings I regraded and drop from the fix list

- Slice 2 M2 (the executor's report misdescribes the vanished-account throw): a wrong sentence in a report, no defect in the code; `src/server/app.ts:93-127` does answer JSON 500 as the slice reviewer says. No action.
- Slice 2 M4 (the Trust-boundaries lists gained `D-393..D-396` and `previous-save-slot`): I agree with the slice reviewer; both lists are the section's index and the rows cite them. No action.
- Slice 3 item 2 (`database.close()` removal not caught): an equivalent mutant; the process exits right after, as the block command does. No action.
- Slice 6 M2 (survivors that are defence in depth for non-JSON values): equivalent for documents the page can hand over; keep the code.
- Slice 6 M5 (a name of spaces is named by place): the code follows D-395's "not empty after trimming"; the spec's "non-empty text" is looser. I agree with the slice reviewer; the spec's word could be aligned to D-395 in the cycle record. No code change.

## Mismatches the mechanical checks passed on (slices with no review of their own)

- Slice 5, `tests/view/account-screen.test.mjs` (two `Account` fixtures gained `previousSaveAllowed: false`): I read the diff (12 / 2); no assertion changed. Acceptable.
- Slice 7, new file `src/browser/view/previous-save-lines.ts`: judged: the first pass's finding 9 (no row in `guidelines/coding-browser-module.md`) is withdrawn in the second pass, because that guideline tolerates a file added after its last audit. The file holds only sentences and the Polish plural, draws nothing and runs nothing on import; the plural `programsWord` is right for 1, 2-4, 5-21, 22-24 and for the 12-14 exception, by reading it. `src/browser/styles.css` is unchanged by slice 7 as the handoff says; slice 8 added `.program-reset-confirm` and `.program-reset-text`, which read tokens only.
- Slice 8, two added exported sentences in `previous-save-lines.ts` and small test-helper additions: acceptable; the reset control is a destructive shared button (D-44 as amended by E24), disabled while its reset waits.
- Slice 4: the two questions answered by the orchestrator. The omission of a window for version 5 in `setup_and_secrets.md` is the first item of the out-of-scope list. The frontmatter `description` not naming the new command stands (the 400-character test is met, `test_loop2_deploy_skill.py` exit 0). The new section follows the shape of "Blocking a player account": plain commands, the filtered run keeping the event lines with the tag `account-previous-save`, what each of grant and revoke does and does not do, what it prints, the exit codes 0-4 (which I confirmed against the code and the run above), what it touches. The two passages that the new appended lines made false (lines 266 and 282) now name both commands. The rollback paragraphs and `troubleshooting.md` say schema 5 and what step 5 adds. The foundation's D-355 and the skill agree on the lines the human appends.
- Slice 9: the executor's two edge cases are findings 10 and 11 of the final list, both Minor.

## Foundation entries against the code

- D-393, D-394, D-395, D-396 (read whole): each sentence of the Decision paragraph matches the code and my browser run, including: one previous save per account for every account; no other act writes it; the load never reads it (`loadSavedGame` and `saved-game.ts` untouched); 403 with `previous-save-forbidden` whatever the slot holds; no HTTP route grants the privilege; `previousSaveAllowed` carries nothing of the slot; the reader's rules (version 1 up to the current, exact keys, trimmed name, check of the editor, skip and go on, "(n)" numbering, saves at once); the reset sends no save before it, holds the old saver's outcomes, disables the control and "Wyloguj", answers 204 also with nothing to move, and builds a revision-0 game with no save at once.
- D-112 (changed lines): "version 5", the move "when the save passes and the stored saved game state is of a lower version", the reset reading block, privilege and current save in its transaction, the grant/revoke outcomes, "blocking keeps … its previous save" — all match `database.ts`.
- D-104, D-109, D-206, D-210, D-44, D-167, D-169, D-354, D-355 (changed lines): match. D-210's new title ("differs from") and sentence match `writeSavedGame`, which still refuses lower versions before the basis.
- Invariants `previous-save-slot` and `previous-save-programs-reader` carry method `test`; the markers `// invariant: previous-save-slot` stand in `tests/account-storage.test.mjs`, `tests/http.test.mjs`, `tests/transport.test.mjs`, and `// invariant: previous-save-programs-reader` and `save-version` in `tests/sim/previous-programs.test.mjs`. Changed invariants whose tests carry their markers: `save-version` (also `tests/sim/saved-game.test.mjs`, unchanged), `account-client-outcomes` (`tests/account-api.test.mjs`). `python -B .the-way/elements/common/foundation_check.py` printed `0 errors`, exit 0.
- Part map: `account-server` description names the second command; `simulation` *Trust boundary* gains `src/browser/sim/previous-programs.ts`; the new test files fall under `tests/sim/**`, `tests/view/**`.
- Glossary: "previous save" and "previous-save privilege" read as the spec words them; both with `Not: none`.
- A changed invariant test is named: none of the changed invariants' existing tests were weakened; the existing tests that read the schema version as 4 now read 5 (account-storage, account-backup, `test_account_backup_stream.py`) as the spec lists.

## Trust boundary (crafted input), what I checked

- Server (`src/server/**`): the two routes sit in the `paths` table (no-store, transport check, 503 without accounts); the reset is under `mutationGuards` with the 16 KiB limit (413 seen); a body of another shape (field, array), wrong media type refused before the session (415/400 seen); the session alone names the account, no field names one; the privilege is read at the request (GET) and in the writing transaction (reset), so a revoked privilege stops the next request (seen); a blocked account answers 401 from `sessionAccount` and from the reset transaction; a replayed reset is 204 and changes nothing (seen); two cards of one account meet D-209 (seen). The stored text is embedded as it was stored, valid JSON by construction (`JSON.stringify` at save, 64 KiB check by bytes in the table, the same in `previous_saves`). The table name in `readStoredGame` is a closed union, not input.
- `src/browser/sim/previous-programs.ts`: takes `unknown`; own data keys only (`Object.getOwnPropertyDescriptor`); no accessor is read; exact keys; a list with holes or extra keys is unreadable; a refusal of the check is the only skip (other errors propagate); the result shares nothing with the document; names are text, shown as text (checked in the browser with an `<img>` name). A version above the current is unreadable. `src/browser/sim/saved-game.ts` is unchanged.
- Irreversible operation: no. Step 5 only adds (`ALTER TABLE … ADD COLUMN … DEFAULT 0` and `CREATE TABLE`); the upgrade of a version-4 database is tested ("a version-4 database opens as version 5 with every row kept…", "a failing step 5 leaves a version-4 database at version 4…"). The change only prepares the grant: the command exists and the skill gives it to the human; nothing in the code, the deploy script or the tests runs it on the server.

## Declined to judge

- A 401 on the question that the screen asks when it is shown (not on the pull's own fetch) shows "Nie udało się sprawdzić poprzedniego zapisu." instead of going through D-211: the spec and plan place the 401 handling on the pull's fetch; the session's loss reaches the page at the next save.
- The role `positive` of the sentence above the new game after a reset: D-39 says `positive` means "in order"; the spec names no role; the choice costs a colour.
- The reset control standing only on the screen Programy: the spec's "in the game (not outside it)" is read by the plan as "on a screen of the game", and the styleguide did not force another place.
- The unbounded list of skipped names (out-of-scope list above).
- The sentence of the confirmation in `warning` (a bar in the colour of the text) where the loss it announces is that of a previous save's programs: D-39 gives `danger` for "progress or data may be lost", and the precedent of the question „Zapisać, odrzucić, wrócić?” (D-173) writes its sentence in `warning`; the choice follows the precedent and costs a colour.
- The older tab after a reset bypassing D-210 and the other prices of D-396: the spec accepts them as prices.

## Checks I ran (command, exit code)

All in `the task's worktree` at `7adcc0bb`:

| Command | Exit | Result |
|---|---|---|
| `npm run typecheck` | 0 | |
| `npm test -- tests/account-storage.test.mjs` | 0 | 82 pass, 0 fail |
| `npm test -- tests/http.test.mjs` | 0 | 95 pass, 0 fail |
| `npm test -- tests/transport.test.mjs` | 0 | 12 pass, 0 fail |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 | 17 pass |
| `npm test -- tests/sim/program-list.test.mjs` | 0 | 33 pass |
| `npm test -- tests/account-api.test.mjs` | 0 | 32 pass |
| `npm test -- tests/view/previous-save.test.mjs` | 0 | 41 pass |
| `npm test -- tests/view/program-list.test.mjs` | 0 | 23 pass |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 | 29 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 131 pass |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | 0 | prints nothing |
| `npm run local` (background), `playwright-cli …`, `node dist/server/account-previous-save.js grant|revoke …` | see the flows | grant exit 0, repeat 0, unknown address 4, wrong arguments 2, revoke 0 |
| `npm run local:stop` | 0 | "Local starts stopped: 1" |

Mutations, each in a separate detached worktree of the head made under my scratchpad (removed after; the `node_modules` junction was removed first), each test file run with `npm test -- <file>`:

| Mutation | File | Exit | Failing |
|---|---|---|---|
| remove `if (game !== view) return;` after the reset's await (`app.ts`) | `tests/view/previous-save.test.mjs` | 1 | 1 |
| `stored.version < save.version` to `<=` (`database.ts`) | `tests/account-storage.test.mjs` | 1 | 1 |
| remove the privilege check of `GET /api/previous-saved-game` | `tests/http.test.mjs` | 1 | 2 |
| the reset's `unprivileged` outcome answered 204 | `tests/http.test.mjs` | 1 | 2 |
| `value <= SAVED_GAME_VERSION` to `<` (reader) | `tests/sim/previous-programs.test.mjs` | 1 | 13 |
| first number of the suffix 2 to 3 (`programs.ts`; the same edit also hit `suggestedProgramName`) | `tests/sim/program-list.test.mjs` | 1 | 9 |
| the pull appends with `state = …` instead of `act(…)` (no save at once) | `tests/view/previous-save.test.mjs` | 1 | 4 |

Not run: `npm test` without a file and the mutation tool of `guidelines/testing.md` on the changed files (the orchestrator's gate; the slice reviewers ran it on slices 1, 6). Not checked: focus, hover and focus-ring looks of the new controls (no screenshot taken); the 401 path of the reset in a real browser (the jsdom cases cover it).

Checks of the second pass (all in the reviewed worktree at `7adcc0bb`; git status stayed empty):

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK (the formatter and linter invariants over the new files) |
| `npm test -- tests/quality/test_source_tool_scope.py` | 0 | 4 tests OK |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | 1 test OK (`stryker.config.json` lists the new test file) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | OK |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | OK |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | OK |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | OK |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | OK |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 0 | OK |
| `npm test -- tests/view/react-controls.test.mjs` | 0 | 56 pass |
| `node` probe of `appendPrograms` then `savedGame` then `loadSavedGame` over `dist/browser/sim/` (a scratch file in my scratchpad) | 0 | `load: true` for the whole set of names and for each alone; baseline games load as well |

## Second pass (after the coordinator's message): what I read, what it added

Read whole in this pass:

- `.the-way/elements/common/way_of_working.md` "Reading the foundation" (lines 59-101). By its step 1 the change touches the parts `account-server` (`src/server/**`, its tests), `browser-view` (`src/browser/*.ts`, `src/browser/view/**`, `src/browser/styles.css`, `tests/view/**`, `tests/account-api.test.mjs`), `simulation` (`src/browser/sim/**`, `tests/sim/**`), `build-tools` (`stryker.config.json`), `agent-workflow` (`.claude/**`, `.agents/**`, `guidelines/**`) and `product-foundation` (`foundations/**`), and `deployment` through `tests/deploy/test_account_backup_stream.py`. By its step 2 (a search of each `- **Scope:**` line with its continuation lines, the part as a whole item, `,` and `·` both separating items) the log gives **389 decisions** for the six parts first named (`deployment` adds more that I did not select, see Unread material). My first selection used the plan's lists and the diff; the procedure adds the decisions of the parts' own scopes, which is where the first pass was short.
- **71 decisions read whole**, each from its heading to the next heading: D-02, D-05, D-114, D-165, D-166, D-204, D-205, D-207, D-208, D-211, D-229, D-386 (the twelve the coordinator named); D-07, D-96, D-97, D-137, D-203, D-209, D-212, D-213, D-36, D-117, D-286, D-287; D-164, D-167, D-169, D-206, D-210, D-104, D-109, D-112; D-274, D-275, D-265, D-280, D-281, D-323, D-347, D-353, D-354, D-355, D-356, D-357, D-362; D-15, D-228, D-231, D-236, D-360, D-173, D-285, D-202, D-252, D-253; D-168, D-170, D-172, D-181, D-182, D-248, D-254, D-256, D-351, D-267; D-45, D-279, D-303, D-42, D-43, D-47, D-40, D-264, D-38; and, from the first pass, D-39 and D-393 to D-396, plus D-44 (its decision text, verification and rationale as the diff showed them). (The list of nine in the fourth group counts D-45 to D-38 once each; D-173 once.)
- **318 decisions by title only**: the rest of the 389; I read every title of the selection and opened each whose title points to a bearing on the change (the ones above). The titles of the other decisions (the combat, the scene, the chronicle, the skill numbers, the end-of-run window, the camp, the map card, the body row and similar) name no saved game state, account, program list, control state, log, deployment or guideline matter.
- The unchanged neighbours of the changed invariants: `foundations/invariants.md` lines 706-886 (from `loop2-shared-public-origin` to `unblock-restores-no-session`, which holds `account-session-authorization`, `account-mutation-request-guards`, `account-request-transport`, `account-schema-lifecycle`, `account-database-schema`, `account-session-storage`, `account-client-requests`, `account-client-outcomes`, `blocked-account-access`, `player-server-session`) and 978-1046 (`player-save-isolation`, `expired-session-unsaved-progress`, `account-save-sqlite-store`, `saved-state-http-exchange`, `save-version`). The new invariants `previous-save-slot` and `previous-save-programs-reader` I had read whole.
- `foundations/part_map.md` lines 1-120 (the parts `browser-view`, `simulation`, `account-server`, `build-tools`), `agent-workflow`, `product-foundation` and `deployment` (lines 119-176 were read in the first pass of the second reading), and the glossary entries by grep (`program`, `blocked account`, `save time`, the two new terms).
- Guideline files, **each whole**: `guidelines/coding.md`, `guidelines/coding-browser-module.md` (the table and rules in this pass; the head in the first), `guidelines/coding-saved-game.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (read against the new reset control, its confirmation and the pull's states; the scene, camp, chronicle and end-of-run rules I read for the part that bears on controls and roles, not line by line for their own subject).

What it added:

- Finding 12 (the round trip through the game's own load, from D-386 and `coding-saved-game.md`), 13 (stale rows of the table in `guidelines/testing.md`), 14 (the destructive button's wait against the styleguide, the kitchen-sink page and D-45/D-44), 15 (D-112's two meanings of "reset", WAY-99) and 16 (exact sentences pinned by tests, `testing.md` *Behaviour, not implementation*), and the out-of-scope item on the examples of `coding-browser-module.md`.
- Finding 9 of the first pass withdrawn (the guideline tolerates a file with no row).
- Nothing that changes a verdict: D-286 (the sentence above the new game leaves at the first change of screen — met, I saw it stand above Programy and the new game kept the screen the address names), D-209/D-211/D-97 (the reset's 401 goes through `expire()` and the held outcomes follow the logout's pattern), D-173/D-279 (the confirmation follows the pattern of the question „Zapisać, odrzucić, wrócić?”: sentence in `warning`, a bar in the colour of the text, a destructive confirm, a plain „Wróć”), D-267 (the three `useLayoutEffect`s of `program-list.tsx` list the reactive values they read; hooks stand at the top level), D-351 (`previous-programs.ts` imports only simulation files), D-362 (no path or note name outside the repository in any added line), D-252/D-253/D-354/D-355 (new events carry only `accountId`; the command has its own last resort; its sentence is no log line), D-256 (the local start keeps no account, which is why my run left nothing), D-15/D-231/D-236/D-228/D-360 (the backup and rollback texts say what step 5 does; the backup carries the new table by `backup()` of the whole file; the restore text needs nothing for the new column) hold.
- One check I could make only because of the reading: a round trip of the appended game state through `savedGame` and `loadSavedGame` (finding 12), run by hand against `dist/browser/sim/` with the made-up names above: admitted.

## Questions for the orchestrator

None blocking. Two to settle in the fix round:
1. Findings 10 and 11 (the logout beside the reset): fix with a `game !== view` check after the awaits in `logOut`, or leave as a documented price? My recommendation: add the check, one line, and a test of the two orders; leaving costs a rare wrong reload and nothing else.
2. Finding 14: bring the kitchen-sink page, the styleguide lines 214-223 and 255-257 and D-44's list of labels to the code (a sample of the disabled destructive button and the "Wciąganie…" label), or move the new waits to the existing look (no waiting label on the pull, no disabled reset)? My recommendation: the first; the code is as the human-facing decision D-44 now says, and the cost is one sample and three sentences.

## Reach beyond the handoff

- `.the-way/task-cycle/review/SKILL.md` and `whole_change.md` (named by the handoff, read whole); `.the-way/product-guidelines/reading.md` lines 1-60; `.the-way/elements/common/way_of_working.md` lines 50-124 (named by the handoff, read in the second pass).
- `reports/slice-9-executor-report.md` (read whole, to check the executor's edge cases and own-work check); the other executor reports were not opened beyond the handoff's summary.
- Every decision of the 71 in the list above that the handoff did not name, `foundations/invariants.md` lines 706-886 and 978-1046, `foundations/part_map.md`, `foundations/glossary.md` (by grep).
- `src/server/transport.ts` (a grep for the body check), `src/server/account-routes.ts` lines 78-100, 455-545 and 741-751 (the session helper, the neighbouring routes and the logout route, to compare the reset with them), `src/browser/view/app.ts` around `dropGame`, `showGame`, `logOut` (to follow the reset flow), `src/browser/sim/saved-game.ts` lines 84-110, 215-235, 470-500 and 1340-1375 (the load's name and list rules and its entry point, to see that a pulled name passes the load later), `src/browser/kitchen-sink/kitchen-sink.ts` lines 60-75 and 215-262 (the destructive sample, finding 14).
- `guidelines/coding-database-access.md`, `coding-http-application.md`, `coding-simulation-module.md`, `coding-browser-api-client.md` (each whole, first pass), and the five files named in the second pass.
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md` 318-345 and `backup_and_restore.md` 262-280 (to judge the out-of-scope item on the window text and whether the backup text goes stale), `tests/account-database-check-standin.mjs` (a grep, to see whether the database check names the tables).
- `.claude/skills/loop2-play/SKILL.md` (named by the handoff), the rule file `the author's rule file on writing scripts` (the user's global instruction for scripts, before I wrote temporary scripts into my scratchpad).

## Unread material

**Counts (second pass):** the selection by step 2 of "Reading the foundation" holds **389 decisions** whose scope names `account-server`, `browser-view`, `simulation`, `build-tools`, `agent-workflow` or `product-foundation`. **71 read whole** (listed above) and **318 by title only**. I did not select the 65 further decisions whose scope names `deployment` alone or with parts outside these six (the deploy script, the watcher, the backup schedule, the tunnel); of them I read D-15, D-228, D-231, D-236 and D-360 because they bear on a rollback and a backup of the new table, and D-355, D-356, D-357 for the log file and screenshots. I did not read the other `deployment` decisions: the change adds no file to `deploy/**`, `Dockerfile`, `compose.yaml` or the workflows.

**Decisions that bear on the change and stayed unread:** none of the ones the change reaches by topic. Opened by title and judged not to bear, with the reason: D-96's neighbours on the login card (D-259 to D-262, D-278, D-381: the card is unchanged), the scene, chronicle, end-of-run window and camp (D-311 to D-322, D-338 to D-350, D-364 to D-373, D-389: no file of theirs changed), the program editor decisions (D-288 to D-310: the list of programs is the only part of Programy touched, and `program-panel.tsx` is unchanged), and the combat, skill and number decisions (D-140 to D-151, D-175 to D-249 where not named above: the simulation files changed are `programs.ts` (the append) and the new reader only). D-44 and D-206 and the other changed decisions I read whole in this pass.

**Invariants:** read whole: the ones named above (lines 706-886, 978-1046) and the two new ones. Not read: the invariants of `simulation` and `browser-view` by `Part` beyond those cited by a test the change alters (their tests I ran: `test_browser_view_token_values`, `test_browser_view_focus_outline`, `test_design_token_contrast`, `test_simulation_isolation`, `test_simulation_inputs`, `test_cross_part_imports`, `tests/view/react-controls.test.mjs`, all exit 0).

**Guideline files:** read whole: `coding.md`, `coding-browser-module.md`, `coding-saved-game.md`, `coding-database-access.md`, `coding-http-application.md`, `coding-simulation-module.md`, `coding-browser-api-client.md`, `testing.md`, `styleguide-browser-view.md` (the scene, camp, chronicle and end-of-run rules read for their rules on controls, roles and focus, not studied for their own subject). Not read: `coding-account-policy.md`, `coding-content-data.md`, `coding-mail-sending.md`, `coding-password-hashing.md`, `coding-session-store.md` (kinds the change does not touch). `.the-way/product-guidelines/template.md` and the discipline templates were not compared: the change adds rows and lines to existing guideline files and no guideline file.

**Test files:** I read the titles of every new case of `tests/account-storage.test.mjs`, `tests/http.test.mjs`, `tests/transport.test.mjs`, a few lines of `tests/view/previous-save.test.mjs` (for finding 16) and the commented lines I cite; I did not read `tests/view/previous-save.test.mjs` (1361 lines), `tests/sim/previous-programs.test.mjs`, `tests/account-api.test.mjs` or the other test files whole; I judged them by running them and by the seven mutations. The reports of the slice reviewers I took from the handoff, not from the files.

## Searches not found or unclear

- none that blocked the review.
- Unclear: the spec's "Nothing stops a reset while a logout waits; the logout's own continuation covers it" (finding 11): the continuation just returns, which is harmless, but "covers it" overstates.
- Unclear: the spec's "non-empty text" for a skipped name against D-395's "not empty after trimming" (slice 6 M5): D-395 and the code agree; the spec's wording is the looser one.
- Unclear: whether `src/browser/sim/previous-programs.ts` is of the kind `saved-game`. The kind index of `guidelines/coding.md` says that kind is a simulation file that turns a document downloaded from the server into a game state or a refusal; the reader turns it into programs or "unreadable". The spec ruled it a `simulation-module` file; the reader meets the saved-game rules in substance (strict, never throws on a document, changes nothing, imports only simulation files, only the check's own refusal is a skip). I judged it by both guidelines and found no departure. If the human wants the kind boundary stated, the sentence of the kind index needs a word.
- Not found: any decision or invariant that requires the reset control to stand on a screen other than Programy; the spec's "in the game" is open.
