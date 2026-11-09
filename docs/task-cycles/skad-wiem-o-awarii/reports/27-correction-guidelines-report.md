# Report 27 — correction: the four out-of-date guideline sentences

**Status:** done

Worktree `the root of the repository`, branch `task/skad-wiem-o-awarii`, from head `9e9d64b`. `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (gitlink and `git -C .the-way rev-parse HEAD` agree). Variant of make-change: a correction for the human's remarks. The remark: "you may fix those 4 outdated sentences in passing". No pushed commit.

## Commits

- `494b349` docs: bring the testing guidelines up to the report route of the browser, the dump of the log and the failure watcher, with the ten routes of the account server named and counted. `guidelines/testing.md` (+13 -7 lines in the diff stat: 20 lines changed in all with the below).
- `d41832d` docs: make three examples of the coding guidelines true of the browser report limit option, the pass-through spy on fetch and the last-resort callback. `guidelines/coding-account-policy.md` (+4 -1), `guidelines/coding-browser-api-client.md` (+6 -2), `guidelines/coding-browser-module.md` (+5 -1).

(Two commits first made had a message that said "nine routes"; I reset them softly before anything left the worktree and committed again with the right wording. Nothing else changed.)

Files changed: only the four guideline files. Nothing outside them was touched.

## What changed, per sentence

### 1. `guidelines/testing.md`

All edits are in the section "Trust boundaries" and in "Where in code".

**(a1) Row `src/server/`, guard case count.** Read the test first: `tests/transport.test.mjs` "refused state-changing requests change no account or session and do no password work" has `/api/browser-failure` in its list of routes (the eighth), its refused variants assert `browserLines(logged)` is empty, and its controls send it valid (204, one report line). "refused requests to the save route ..." tests the save route, and its 16 KiB loop includes the report route.

- Old: "dla siedmiu tras kont zmieniających stan (z prośbą o odnośnik do resetu i ustawieniem hasła), oraz przypadek „refused requests to the save route …” tamże, dla ósmej, trasy zapisu."
- New: "dla ośmiu tras zmieniających stan konta albo dziennik (z prośbą o odnośnik do resetu, ustawieniem hasła i zgłoszeniem awarii przeglądarki `POST /api/browser-failure`; to ostatnie niczego na koncie nie zmienia, więc przypadek sprawdza przy nim, że odmowa nie zostawia wiersza zgłoszenia), oraz przypadek „refused requests to the save route …” tamże, dla dziewiątej, trasy zapisu."

**(a2) Row `src/server/`, transport case of the report route.** The case "transport refuses the browser report before the session and the log, and a valid transport reads the session for the account on the line" (`tests/transport.test.mjs`) is tagged `account-request-transport`. Added after the case of the two save routes: "… dla obu tras zapisu, a przypadek „transport refuses the browser report …” dla trasy zgłoszenia awarii przeglądarki." (The earlier "a przypadek" before the save-route case became "przypadek", so the list reads on.)

**(a3) Row `src/server/`, cases of the report route.** New last sentence of the row, naming `browser-failure-report` (D-356) and the six tagged cases of `tests/http.test.mjs`: the 204 and the one line of three words with no session; the account on the line from the stored session only; exactly three string fields; the form of kind, code and place at the edges of each length; the 429 with the one `LIMITED` line and refused bodies using none of the limit (small limit and moved clock); 30 accepted and the 31st refused from many addresses. It says what they prove (the server writes only the three words of the allowed form and the account of the stored session) and what they do not (that a real browser sends the report). I worded "na prawdziwym HTTP i SQLite, a zapisany wiersz widać w przechwyconym wyjściu dziennika serwera", because `accountFixture` opens a real runtime and file database, while `captureLog` captures the line. The untagged cases (rolling hour, other methods get 404, guards before the body) are not listed as proof of the invariant.

**(a4) Row `deploy/`.** Two sentences appended, each with its tests and its limit:
- the dump (D-355, `loop2-deploy-log-dump`): `test_a_deployment_appends_the_log_of_the_containers_it_replaces` and `test_a_failing_dump_warns_and_the_deployment_still_starts_the_containers` in `tests/deploy/test_loop2_deploy_dump.py`, with a stand-in `docker`: header and output appended after the build and before the start (the test asserts the order of the calls), and a failed dump ends in one `warning:` line without stopping the deployment. "dowodzą reakcji skryptu, nie tego, co prawdziwe `docker compose logs` zwraca."
- the watcher message (D-356, `failure-watcher-message`): the cases of `tests/deploy/test_loop2_watch_message.py` with stand-ins `docker`, `pusher`, `flock`, `date` (D-235): each of the five kinds sends a fixed subject and text, and a marker made to look like a player's address in log lines, in Docker's output and in a damaged state file reaches no argument or input of `pusher`, no log, no state file and no other file. "dowodzą reakcji skryptu, nie dostarczenia wiadomości."

**Header fields of "Trust boundaries".** *Decision* gained D-355 and D-356; *Invariant* gained `browser-failure-report`, `loop2-deploy-log-dump`, `failure-watcher-message`. See "Choices" below.

**(b) Expected-results rows.** The route-by-route lists were found by the same words as the handoff gave.
- Origin row and body row: *Resource* now "Trasy zmieniające stan konta, trasa zapisu stanu gry i trasa zgłoszenia awarii przeglądarki"; `POST /api/browser-failure` added to both lists before `PUT /api/saved-game`; the expected result adds "przed zapisem wiersza zgłoszenia"; *Decision* now "D-104 · D-356" (D-356 *Verification*: "answers without the origin guards of D-104").
- Proxy row: "Żądania kont na dziewięciu trasach" became "Żądania kont i zgłoszenia awarii przeglądarki na dziesięciu trasach", and the expected result adds "i zapisem wiersza zgłoszenia". Counting: `paths` in `src/server/account-routes.ts:48-59` holds ten paths (the old nine plus `browserFailure`); the gate `router.all(Object.values(paths), …)` covers all ten. The old "dziewięciu" was true of the nine paths of the base commit `00aa818` (checked: the phrase is already there).
- Not changed: the "Decision" column of the proxy row (D-110) — the report route's proxy refusal is the same rule; I did not add D-356 there, since D-356 cites D-104 for the guards and says nothing of the proxy gate beyond "the guards and the gate".

**(c) Where in code.** Added after `tests/deploy/test_loop2_backup.py`: `test_loop2_deploy_dump.py`, `test_loop2_log_storage.py`, `test_loop2_watch.py`, `test_loop2_watch_message.py`, `watch_script_support.py`, `test_check_address_workflow.py`, each under `tests/deploy/`. Three of them (`test_loop2_log_storage.py`, `test_loop2_watch.py`, `test_check_address_workflow.py`) are listed but not described in a table row; see the first item of "Left open".

### 2. `guidelines/coding-account-policy.md`, "Zegar w testach"

- Old: "Pojemność tablic też jest opcją, żeby test mógł zapełnić tablicę kilkoma kluczami; wartości progów i okien opcjami nie są."
- New: "Pojemność tablic też jest opcją, żeby test mógł zapełnić tablicę kilkoma kluczami, i próg zgłoszeń awarii przeglądarki w ciągu godziny, żeby test mógł go wyczerpać kilkoma żądaniami. Progi prób logowania i zakładania kont oraz okna czasu opcjami nie są, więc testy tych limitów sprawdzają ich prawdziwe wartości."
- What the rule protects: the attempt limits (five failures an address, twenty a client address, five accounts an hour) and the windows (15 minutes, an hour) stay fixed in the constructor, so their tests (`tests/http.test.mjs`) prove the real numbers. `src/server/account-policy.ts` has `browserReportLimit` as an option (line 161, validated at 198-204), and `sendingDeadline` was already an option before this change (a time bound, not an attempt threshold; the old sentence did not speak of it and I left it out too). The browser report limit has no window option; the window stays an hour.

### 3. `guidelines/coding-browser-api-client.md`, "Test na prawdziwym lokalnym serwerze"

Found while reading `tests/account-api.test.mjs`: there are two pass-through spies, not one. `withRecordedFetch` (the report test, line 885) and an inline one in the case "saveGame hands the real fetch a PUT with keepalive and the server gets that request" (line 1004, brought in by the merge from `main`, commit `378259f`). Both record the options and call the real `fetch`, and both restore it in `finally`.

- Old: "Niczego nie podstawia za `fetch`."
- New: "Nie podstawia za `fetch` żadnej własnej odpowiedzi: odpowiedź zawsze daje lokalny serwer. Wyjątkiem są przypadki, które sprawdzają opcje samego wywołania, jak `keepalive`, przekierowania i poświadczenia, których serwer nie widzi; owijają one prawdziwy `fetch` nakładką, która zapisuje podane opcje, przekazuje wywołanie dalej bez zmian i w `finally` przywraca `fetch`."
- It permits a recording wrapper only; a replacement that answers is still named as not done. The sentence names no function, so a third such case needs no new edit.

### 4. `guidelines/coding-browser-module.md`, "Gra na stronie i odpowiedzi serwera"

- Old: "… w konsoli staje jeden wiersz `uncaught kind=… code=… place=…`, a `halt()` gry sprawia, …"
- New: "… w konsoli staje jeden wiersz `uncaught kind=… code=… place=…`, a przy każdym wierszu, którego strona jeszcze nie napisała, moduł wywołuje opcjonalne wywołanie zwrotne `onLine` z rodzajem, kodem i miejscem (`app.ts` podpina do niego metodę klienta konta `reportBrowserFailure`, która wysyła te trzy słowa serwerowi; jej wynik jest pomijany, a jej błąd nie staje się błędem obsługi, D-356), a `halt()` gry sprawia, …"
- Checked against `src/browser/view/last-resort.ts` (`options.onLine?.(kind, code, place)` inside the "not written before" guard, after `console.error`) and `src/browser/view/app.ts:238-253` (`reportLine` with `try`/`catch` and `.catch(() => undefined)`, passed as `onLine`).

## Checks

| Command (from the worktree root) | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" (it reads the guidelines: decisions, invariants, parts they name) |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 errors, 111 warnings; the 4 warnings in `guidelines/testing.md` (lines 255-259) are about older text (`src/browser/sim/hex.ts:10-30`, `rules.test.mjs`, `.runs/stryker/mutation.json`, `.stryker-tmp/`); none comes from the text I wrote. I did not run it on the base commit for a before/after comparison. |
| `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0, 0 | both `294af7fd…` |

Tests that read the guidelines: searched `tests/` for `guidelines/` (see Searches). The one hit, `tests/invariants/test_terrain_drawing_numbers.py`, mentions `guidelines/testing.md` only in a docstring; it does not open the file. So no test run was due, and none was run. Not run: the whole gate (the cycle's), and `npm test` of any file.

## Own-work check

The requirement most likely not met: every claim I wrote in a guideline row is something a test proves, and no case is named as proving what it does not.
- Check: I read each test I named before wording it (`tests/transport.test.mjs` the guard case, the transport case and the save-route case; `tests/http.test.mjs` the six tagged report cases and the limit cases; `tests/deploy/test_loop2_deploy_dump.py` the two tagged cases; `tests/deploy/test_loop2_watch_message.py` the first cases and its docstring; `tests/account-api.test.mjs` both spies).
- Showed: the names I quote match the `test(` titles and `def test_` names verbatim (copied from the grep output). Two corrections made on reading: the guard case runs the report route with "no report line" for refused variants, so I worded the report route's part of it as "odmowa nie zostawia wiersza zgłoszenia" rather than "no log line at all"; and the save-keepalive case is a second spy, so the coding-guideline sentence is general instead of naming one function.
- A second check: the route count by `grep` of `paths` in `src/server/account-routes.ts` (10 entries).

## Choices (with the way rejected and its cost if wrong)

1. **The header lists of "Trust boundaries" gained the invariants and decisions the new text cites.** Every invariant named in the table is already in the *Invariant* line (the line is the set named in the table), so I extended it with `browser-failure-report`, `loop2-deploy-log-dump` and `failure-watcher-message`, and *Decision* with D-355 and D-356. Rejected: leaving the lists as they were, which would leave the cited names out of the header, unlike all the other rows. Cost if wrong: `account-save-backup-failure-notice` (a similar invariant of `deploy/`) is not in the list and stays out, so someone may ask why the dump and the watcher are in; removing the two is a one-line edit. `foundation_check.py` accepts both lists (exit 0).
2. **No new row in the expected-results table for the report route** (who: anyone; action: `POST /api/browser-failure`; expected: 204, 429 with one `LIMITED` line, `accountId` from the session only). Rejected: adding it now, because the handoff scoped the sentences to naming and counting, and a new row is a new rule row of the permissions table that rests on D-356 (the skill says a new rule needs the human's word). Cost if wrong: the public report route's own expected results stand only in the `src/server/` row of the boundary table, not in the permissions table.
3. **Row `deploy/` describes only the two invariants' cases; the other new tests are in "Where in code" only.** Rejected: describing `test_loop2_watch.py`, `test_loop2_log_storage.py` and `test_check_address_workflow.py` in the row, because none of them is the test of a refusal invariant of this boundary and the row would grow past what the handoff asked for. Cost if wrong: a reader finds these three files in the list without a note of what they prove.
4. **The Compose and logrotate static check is not claimed as proof anywhere.** Its docstring: "nothing runs"; whether `logrotate` runs on the server is in the request's unchecked list.

## Reaches beyond the dispatch

- `src/server/account-routes.ts` (lines 48-64, 370-420), `src/server/account-policy.ts` (lines 140-210), `src/browser/view/last-resort.ts` whole, `src/browser/view/app.ts` (lines 195-262): to count the routes and to check the three coding sentences against the code. The handoff names the files, not the exact lines.
- `tests/http.test.mjs` (lines 262-345, 4640-5130), `tests/transport.test.mjs` (lines 505-740, 1000-1200), `tests/account-api.test.mjs` (lines 880-1040): to word the cases exactly.
- `tests/deploy/test_loop2_deploy_dump.py`, `test_loop2_watch_message.py`, `test_loop2_watch.py`, `test_loop2_log_storage.py`, `watch_script_support.py`, `test_check_address_workflow.py` (docstrings and test names; the first two read in part).
- `foundations/decisions.md` D-355 and D-356 whole; `foundations/invariants.md` the three invariants whole; `foundations/part_map.md` the sections of `account-server` and `deployment`: for the names of decisions, the invariants and the boundary.
- `.the-way/product-guidelines/template.md`, `.the-way/product-guidelines/testing/template.md`, `.the-way/product-guidelines/coding/template.md`, and both pinned skill files: for the form (the skills' steps 1-5 are the refinement with the human and were not run, as the handoff says).
- `spec.md` (the "Tests the change must bring" and "Settlements" parts, and B2 for the option), `request.md` line 18 for the unproved list, `reports/21-review-whole-report.md` whole.
- `git show 00aa818:guidelines/testing.md`: to see that "dziewięciu" stood there before the change.

## Searches not found or unclear

- Tests that read the guidelines: `grep -rln "guidelines/"` over `tests` (`*.py`, `*.mjs`) found one file whose mention is a docstring; nothing opens a guideline file. The handoff expected some, so no test is run for these edits. `instruction-files/check_instructions.py` reads them (it follows them as instruction files), and I ran it; it is not part of `npm test` as far as I saw.
- The handoff names the row text "ósmej" and "siedmiu tras"; both found at the row of `src/server/`. The expected-results rows were found by their wording (lines 218-220 before my edit).
- `check_instructions.py` has no "baseline" mode; I judged my text by the line numbers of the warnings, which are all in older lines.
- Whether the "Decision" header should hold D-355 and D-356 as I have it: not settled by the template (it says the rule's decisions are those the table cites; see Choice 1).

## Left open (for the orchestrator)

- The rest of what is "worth fixing" in `guidelines/testing.md` goes to the other agent. Things I saw there, not changed: the `smoke test` recipe's *Files* does not list the new watcher/dump tests (they are integration-level with stand-ins); the *Doubles* field of `integration test` names the backup script's seam but not the watcher's (`tests/deploy/watch_script_support.py`), a recipe-rule edit I left alone.
- No question that blocks.

## Rows for the report route

The human answered "yes, add that row" (via the coordinator). Head before the work: `43c46cd`. Commit: `d385f01`. Only `guidelines/testing.md` changed; two rows inserted in the expected-results table of "Trust boundaries", before the rows of the Origin guard (no old text was changed).

Read for the wording: `src/server/account-routes.ts` (the route, `limited`, `invalidRequest`, `refuse`), `src/server/account-policy.ts` (`isBrowserReport`, `admitBrowserReport`, the window and the limit), `src/server/log-line.ts` (`writeBrowserFailure`, `writeFailure`), `src/server/transport.ts` (`mutationGuards`), the cases of `tests/http.test.mjs` about the report (the six tagged `browser-failure-report`, the guards case, the other-methods case, the rolling-hour case) and `tests/transport.test.mjs` (the transport case), the invariant `browser-failure-report`, D-356 and D-104 (D-110 for the proxy metadata, as the existing proxy row cites it).

### New text (row 1, an accepted report; Who | Resource | Action | Expected result | Decision)

- Who: "Każdy wywołujący, z sesją lub bez". Resource: "Wiersz dziennika serwera o awarii przeglądarki".
- Action: POST /api/browser-failure with the three texts of the allowed form, meeting Origin and JSON, within 30 accepted reports in a rolling hour counted together for the whole server, whoever sends.
- Expected: 204 with no body and no new cookie (a live session is renewed with its own), `Cache-Control: no-store`; one line `{"failure":"browser","kind":…,"code":…,"place":…}` and nothing else of the request (no address, header or query); `accountId` only when the stored session of a correctly signed cookie names it (a cookie signed with another key, unsigned, unknown, expired, or none, and a body, header or query, give no account); no session needed; the answer above the limit is in the next row. Decision: D-356 · D-104.

### New text (row 2, the refusals)

- Action: a body of other than exactly three string fields (missing, extra including `accountId`, not strings), not a JSON object (empty, broken, array, `null`, number, text), `kind`/`code` not one word of letters, digits, underscore starting with a letter up to 64 characters, `place` not such words joined by `.`, `/`, `-` up to 96 characters (space, quote, brace, `@`, line break, control, non-ASCII refused); Origin missing, null, duplicated or foreign; media other than JSON, compressed, or over 16 KiB; missing, duplicated or wrong X-Forwarded-Proto or CF-Connecting-IP; GET, PUT, DELETE or PATCH; above 30 reports in a rolling hour.
- Expected: no refusal writes a report line, except the one below. Wrong body or word form: 400 `invalid-request` (a non-object body: 400 JSON), which does not use the limit; Origin: 403; other media or compressed: 415; over 16 KiB: 413; wrong proxy metadata: 403 before the session is read; other method: JSON 404 `Not found`. Above the limit: 429 `too-many-attempts` with "Za dużo prób. Spróbuj ponownie za kilka minut."; the first refusal in an hour writes the one `LIMITED` line (`{"failure":"browser","kind":"ReasonedFailure","code":"LIMITED","place":"account-routes.browserFailure"}`), later refusals nothing; a report counts for an hour from its own moment. Decision: D-356 · D-104 · D-110.

### What each statement rests on (and what I did not claim)

- Status codes and codes: 204/no body/no-store/no new cookie, `assertAccepted` in `tests/http.test.mjs`; 400 `invalid-request`, `assertInvalidRequest`; 429 `too-many-attempts` and the message, `assertLimited`/`limitMessage` (the code comes from `limited()` in the route); 403, 415, 413 and JSON 404, the guards case and the other-methods case; wrong proxy metadata refused before the session and writing nothing, the transport case.
- The non-object bodies are asserted only as status 400 and a JSON content type, so the row gives no code for them.
- Not claimed: that a guard refusal (403, 415, 413) uses none of the limit (no case counts it; the cases about the limit use refused bodies of the route's own checks); the 4xx of a body of another size below 16 KiB; the behaviour on a real browser; the Origin variants (suffix, path, port) that the other routes' case tries.

### Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 errors, 113 warnings. Two more than before (111): both `dead-path` for `'\''` in the two copies of `loop2-deploy/SKILL.md`, which came with commit `19fbab8` of another agent. None from `guidelines/testing.md`. |
| `git diff --stat` | 0 | `guidelines/testing.md` 2 insertions, no deletion |

No test reads the guideline file; none was run.
