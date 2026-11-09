PASS d385f01168e2bd69a3508d660866ee012eaf6156

# Report 29 - review of the correction for the human's remarks (pull request 71)

Reviewer: a reviewer that made none of the change. Read-only on tracked files. Worktree `the root of the repository`, branch `task/skad-wiem-o-awarii`. `git rev-parse HEAD` = `d385f01168e2bd69a3508d660866ee012eaf6156` (matches the handoff); `git -C .the-way rev-parse HEAD` = `294af7fde45323ac1851c014a03071a97fc38d96` (the pin). Range `9e9d64b..d385f01`, eight commits as the handoff lists; `git diff --stat` shows 12 files, each belonging to an item (see Step 4).

Counts: blocking 0, Minor 6, out of scope 1.

## The remarks, each as made or not

| Remark | Made? |
|---|---|
| "fix those 4 outdated sentences" (guidelines) | Made (`494b349`, `d41832d`): see Step 1. |
| "anything else worth fixing": the nine items | Made: see Step 2. |
| "yes, add that row" (expected result for the public report route) | Made (`d385f01`): two rows for the route (accepted, refused), and the three guard rows extended to name the route. See Step 1. |

## Step 1 - guidelines and the new rows

Read whole: `guidelines/testing.md`, `guidelines/coding-account-policy.md`, `guidelines/coding-browser-api-client.md`, `guidelines/coding-browser-module.md` (the diffs and the places they sit in), against `.the-way/product-guidelines/template.md`.

- `coding-account-policy.md`, "Zegar w testach": the option list now says the clock, the capacity of the tables and the report limit are options; the login and registration thresholds and the time windows are not. Checked against `PolicyOptions` in `src/server/account-policy.ts:155-163` (`now`, `keyCapacity`, `sendingDeadline`, `browserReportLimit`) and the constants at lines 8-16. True. The sentence "tests of those limits check their real values" matches tests that exercise the 15-minute/hour windows with a moved clock.
- `coding-browser-api-client.md`: "puts nothing in place of `fetch`... the exception is cases that check the options of the call; they wrap the real `fetch` with a wrapper that records options, passes the call on unchanged and restores `fetch` in `finally`". Checked against `tests/account-api.test.mjs:883-897` (`withRecordedFetch`) and `:1002-1016` (the save case): both pass the call on to the real `fetch` unchanged and restore it in `finally`. No other `globalThis.fetch =` in the file (grep). True.
- `coding-browser-module.md`: `installLastResort` calls an optional `onLine` once per not-yet-written line; `app.ts` wires `client.reportBrowserFailure`, ignores its result and does not let its failure become a handler error. Checked against `src/browser/view/last-resort.ts:57-75` and `src/browser/view/app.ts:236-252`. True.
- `testing.md`, rule "Trust boundaries": the Decision and Invariant lists gained D-355, D-356, `browser-failure-report`, `loop2-deploy-log-dump`, `failure-watcher-message`; each exists (`foundation_check.py` 0 errors). That is the WAY-169 "bring the rule along" step, not a new rule; the rule's Good/Bad lines are unchanged.
- `testing.md`, `src/server/` row: the test names it cites for `browser-failure-report` and for the transport case all exist verbatim in `tests/http.test.mjs` (lines 4685-5170) and `tests/transport.test.mjs:1138`. The row says what they prove ("that the server writes only three words of the allowed form and the account of the stored session, not that a real browser sends the report"): it states nothing as proved that no test proves. The counts "eight routes ... ninth, the save route" match `tests/transport.test.mjs:586-600` (seven account routes plus the report) and the save route.
- `testing.md`, `deploy/` row: the two dump cases (`test_a_deployment_appends_the_log_of_the_containers_it_replaces`, `test_a_failing_dump_warns_and_the_deployment_still_starts_the_containers`) exist in `tests/deploy/test_loop2_deploy_dump.py:87,164`; the order build, dump, up is asserted at lines 100-105; the statement that they prove the script's reaction and not what `docker compose logs` returns is a limit, not an overclaim. The watcher-message sentence matches `tests/deploy/test_loop2_watch_message.py` (cases at lines 123-254) and the stand-ins `docker`, `pusher`, `flock`, `date` (`tests/deploy/watch_script_support.py:87`).
- `testing.md`, test-file list: the six added files all exist in `tests/deploy/`.
- The new rows for the report route (the five-column form Who, Resource, Action, Expected result, Decision, as the other rows). Each answer, code and number checked:
  - accepted: 204 with no body, `Cache-Control: no-store`, no new cookie and a live session renewed with its own (`assertAccepted`, `tests/http.test.mjs:4665-4676`; `router.all` in `src/server/account-routes.ts:376-382` sets `no-store`); one line `{"failure":"browser","kind":...,"code":...,"place":...}` (`reportLine`, line 4662); the `accountId` only from a stored session of a correctly signed cookie, none for a cookie signed with another key, unsigned, unknown or expired, nor from body, header or query (test at 4779-4845); 30 reports in a rolling hour for the whole server (`defaultBrowserReportLimit = 30`, `src/server/account-policy.ts:11`; test "from many addresses" at 5137).
  - refused: 400 `invalid-request` for a body that is not exactly the three string fields and for a non-object JSON (tests 4847-4895); the word patterns (kind and code: one word of letters, digits, underscore, starting with a letter, up to 64; place: such words joined by `.`, `/`, `-`, up to 96) match `reportWord` and `reportPlace` at `src/server/account-policy.ts:56-59`; the edges at 64 and 96 and the list of stray characters match the test at 4897-4975; 403 for Origin and proxy metadata, 415 for another media type or compression, 413 above 16 KiB, JSON 404 `Not found` for GET, PUT, DELETE, PATCH (tests 4977-5054 and `tests/transport.test.mjs:1138-1186`); 429 `too-many-attempts` with the message "Za dużo prób. Spróbuj ponownie za kilka minut." (`limited()`, `src/server/account-routes.ts:108-115`); one line `{"failure":"browser","kind":"ReasonedFailure","code":"LIMITED","place":"account-routes.browserFailure"}` at the first refusal of an hour and none after it (`limitedLine`, test at 5056-5100; code at `account-routes.ts:424-433`, `account-policy.ts:330-346`); refused bodies use none of the limit; a report counts for an hour from its own moment (test 5103-5128). All true.
  - the three guard rows now name `POST /api/browser-failure`, "ten routes" (counted from `paths` at `account-routes.ts:48-59`: ten), and "before the writing of the report row". True.
- Form: the file keeps the template's required form (rule headings, Decision/Invariant/Good/Bad fields, Examples, Where in code); the rows cite D-356, D-104, D-110, which exist. No rule was added.

Result: Step 1 holds.

## Step 2 - the nine items

1. D-356 names the one `LIMITED` line: made. The binding sentence now says the route "at the first refusal of an hour writes one failure line of its own, `LIMITED`, as the notice that reports were dropped"; Verification gained a "complies" and a "violates" (a removal in the name of D-353); Rationale gained the sentence on why it is kept. Code and test agree (see Step 1). D-353 (`foundations/decisions.md:7897`) lists other refusals and does not reach this one, so there is no collision and no `narrows` is needed. The binding paragraph still has three sentences (template: one to three). See Minor 1 on one phrase of the Rationale sentence.
2. D-355 Rationale no longer says "nothing unchecked": made; it now says "nothing about the server that this repository does not carry, except two things nobody has checked, that `logrotate` runs daily there and which release of Compose the server has", which are the two unread items of review 25 M4. See Minor 2.
3. The browser kind's share: made in both skill copies (byte-identical, `diff -q` printed nothing, the skill test passes) and in D-356 Verification. Checked against `deploy/loop2-watch`: `KIND_INTERVAL_SECONDS=21600` (line 60), `DAY_MESSAGE_LIMIT=6` over a rolling `DAY_SECONDS=86400` (61-62), `KINDS=(down unhealthy restarted failures browser)` (87), `decide()` (428-466): the browser kind goes once in six hours at most, so at most four sends fit in any 24 hours (a message exactly 24 hours old no longer counts), and the day's budget of six leaves at least two. "At least two", not "two", is right. True. (The skill sentence at line 291 is the old one reworded; D-356 had no "leaves room".)
4. Part map: made. `foundations/part_map.md:147-150` now reads "the failure watcher with its schedule, and the scheduled check of the public address, the watcher and the check both telling the owner when the running game fails". Unambiguous; both appear in the part's Files (`deploy/**`, `.github/workflows/check-address.yml`).
5. Fact split: made, two entries `logrotate-rotation-triggers` and `logrotate-rotation-count`; D-355 *Based on* names both; nothing else named the old identifier (grep); the old identifier is not on `main` (`git show main:foundations/environment_facts.md | grep -c logrotate` = 0), so no withdrawn row is needed (rules.md "Withdrawn identifiers"). I re-read the source: I fetched the archived page `web.archive.org/web/20261009164358/https://manpages.ubuntu.com/manpages/jammy/man8/logrotate.8.html` (59 KB) and stripped markup. The DESCRIPTION passage and the `rotate count` passage match word for word; the `maxsize` passage matches once the spaces that markup-stripping puts around the parentheses and commas are collapsed. The count entry now says "removes the log or mails it to the address that a `mail` directive specifies", which is what the source says (the dropped "or mailed" is restored). The triggers entry still holds two statements of one source (the trigger list and `maxsize`); see Minor 5. `github-schedule-shortest-interval` untouched.
6. D-347 rewrap: made. The *Rationale* paragraph is word-identical to the base (token comparison of the whole D-347 section with whitespace collapsed: equal), and the new lines are 94-99 characters like the neighbours.
7. `account-block` refuses a line break: made, both copies identical. Hand trial (below): the normal address ran, appended one tagged JSON line, printed `exit 0`; an address with a line feed and an address with a carriage return, each carrying a forged JSON line, were refused with the message and nothing reached the dump; an address with a single quote written as `'\''` was taken as one value. The quoting of the block is sound: the address sits inside single quotes, so `$`, backticks, `!` and backslashes are literal, and the only character that needs escaping, the single quote, has its `'\''` rule written in the skill. The check is a `case` with `$'\n'` and `$'\r'` patterns (bash, as the skill says), a `case` and not an `exit`, so a pasted block does not close the human's terminal. The filter is kept. The residual-risk sentence is rewritten to what remains (an address reaching the command another way). The skill test passes (copies identical, no IPv6 literal, no `mikr.us` name, description under 400 characters). The two new checker warnings are judged under Minor 3.
8. Watcher `flock` logging: made. `take_own_lock` logs "another run holds ... (flock exit 1)" only for status 1 (flock's own conflict code under `--nonblock`) and "flock could not take ... (flock exit N); nothing was read" for other statuses; `deploy_lock_is_held` sets `DEPLOY_LOCK_WHY` to "is held (flock exit 1)" or "could not be looked at, flock failed (flock exit N)" or "file cannot be opened for reading"; the function's return values and every exit are as before (the diff touches only the two functions, one global and the two log lines in `main`). The message and the state are untouched: `test_loop2_watch_message.py` passes, and the new tests assert the state file is unchanged and no pusher call is made. The new log text carries a number and a fixed phrase only (no tool output, no player data). shellcheck: `test_quality_invariants.py` exit 0. Red first re-run by me: see Checks.
9. Constructor check: made. The test (`tests/http.test.mjs:5031-5054`) builds `new AccountPolicy({ browserReportLimit })` for 0, -1, 1.5, NaN, Infinity, 2**53 and "30" (each fails `Number.isSafeInteger(...) && >= 1` at `account-policy.ts:200-205`, so each throws) and for 1 and 30 expects none; the regex names the setting only. A constructor that takes NaN or a text, or `< 0` for `< 1`, or drops `isSafeInteger`, fails it. It sits before the route test of the limit; the sibling messages are tested nowhere else (author's search; I did not find them either).

## Step 3 - foundation entries the correction wrote or changed, against the code

Read whole: D-355, D-356, D-353, D-347 (changed section), the entries `logrotate-rotation-triggers`, `logrotate-rotation-count`, the part map entry `deployment`, invariants `browser-failure-report` and `failure-watcher-message`; templates `elements/decisions/template.md`, `elements/environment-facts/template.md` and `elements/common/rules.md` (identifiers and withdrawn).

- D-355 and D-356 binding sentences say what the code does (watcher, `LIMITED`, six-hour kind interval, route limit). D-356's new "complies"/"violates" examples are examples the template allows (the violating one is code that goes against the decision, not a change that replaces it).
- D-356 *Rationale* and D-355 *Rationale* name no file, script or count as the template forbids; "at most four of the day's six" stands in Verification, a field.
- The environment facts keep source and quotations as before; the fact sentences say no more than the source.
- The part map sentence is true of the files.

No blocking departure found. Two wording points are Minor 1 and Minor 2.

## Step 4 - nothing else changed

`git diff 9e9d64b..d385f01 --stat` (12 files): `.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md` (items 3, 7); `deploy/loop2-watch`, `tests/deploy/test_loop2_watch.py` (item 8); `foundations/decisions.md` (1, 2, 3, 5 via *Based on*, 6); `foundations/environment_facts.md` (5); `foundations/part_map.md` (4); `guidelines/coding-account-policy.md`, `coding-browser-api-client.md`, `coding-browser-module.md`, `testing.md` (the four outdated sentences and the rows); `tests/http.test.mjs` (9). No file outside an item. No change to `src/`.

Trust boundary: yes (`deploy/**`, the skill's command, a test of `src/server/account-policy.ts`). Hostile input at the boundary: the new log text of the watcher holds a status number and a fixed phrase; the skill's command is the place a registered address reaches a shell, and it is now checked and quoted (Step 2, item 7). Irreversible operation: none performed by the cycle; the skill's command appends to a file only after the check and only JSON lines of the command.

## Findings

### Critical

none.

### Important

none.

### Minor

1. `foundations/decisions.md`, D-356 *Rationale*, the sentence "...and without it a flood past the limit would look like a quiet hour". What is wrong: the 30 accepted reports of that hour still write 30 lines and still raise the watcher's browser message, so the hour is not quiet; what the `LIMITED` line adds is that reports beyond 30 were dropped (without it the log is indistinguishable from exactly thirty reports). Why it matters: the Rationale is the text a later cleaner reads to decide whether the line may go; the sentence gives a reason that is a little off. Evidence: `src/server/account-routes.ts:420-433` (accepted reports are written before any refusal) and the test at `tests/http.test.mjs:5137-5150` (31 lines: 30 reports and one `LIMITED`). Suggested wording: "without it a flood past the limit would leave the same thirty lines as a flood of thirty".
2. `foundations/decisions.md`, D-355 *Rationale*, "depends on nothing about the server that this repository does not carry, except two things nobody has checked". The two things named are right (they are review 25 M4), but the sentence attaches them to "appending the log", whereas the daily run of `logrotate` is a dependency of the bound the rotation gives, and the file's existence and owner (made by a human, named in *Lacks*) is also something about the server that the repository does not carry. Reads as slightly more exact than it is; no code is wrong. Not blocking: the *Risks taken* list holds the rotation hypotheses.
3. `.claude/skills/loop2-deploy/SKILL.md:347` and `.agents/skills/loop2-deploy/SKILL.md:347`: `check_instructions.py` warns `dead-path ... '\'' does not exist` in each copy. Judgment: the quoting should not be changed. `'\''` is the standard way to put a single quote inside single quotes, I ran it (`o'brien@x` read back as one value), and the rule it applies to is the one thing the block needs from the human. The warning is of the same advisory class as the ~70 existing `dead-path` warnings for server paths in the same file, and the checker's own note says code in a fenced block is not read as a path. If the warning is unwanted, move the escape into the fenced block as a short example line (for instance `email='O'\''Brien@example.com'`) and say in prose only that a quote is written like that; that also shows the form instead of describing it.
4. `tests/deploy/test_loop2_watch.py:475-498` (deployment-lock test): the broken-`flock` cases (status 2, 127) are driven at the first look only; the second look's wording ("dropped: ... could not be looked at, flock failed") has a held case (`hold_deploy_lock_from(2)`) but no broken case. The two looks share `deploy_lock_is_held`, so a break in the second-look line alone (for example a copy of the old text there) would be caught only for the held status. Low risk; broader coverage would be nice.
5. `foundations/environment_facts.md`, `logrotate-rotation-triggers`: the sentence still joins the list of time/size triggers (DESCRIPTION) and the `maxsize` directive (a separate passage). They are one topic of one page, so I do not call it a template breach, but the template says "two facts from one edition about different things stand as two entries"; a strict reader could split `maxsize` out. The count entry is clean.
6. `.claude/skills/loop2-deploy/SKILL.md:366-368` (and the twin): after the rewrite, a short line "shows, then `exit` and the status. The file gets only" breaks the wrapping of the paragraph. Cosmetic.

### Out of scope

- `deploy/loop2-watch`: when `flock` is missing or broken the run now says so in the log but still exits 0 every five minutes, so a host without `flock` leaves a watcher that never reads anything and is seen only in `/var/log/loop2-watch.log`. This is how the item asked (name the status in the log); whether such a run should fail loudly is a design question for the watcher's owner, beyond this correction.

## Declined to judge

- The text of the Polish rows' wording beyond truth (style of the table cells): left to the author's conventions in the file.
- Whether `LIMITED` should be a `failure` word `browser` line at all (D-356 decides it; this correction only names it).
- The pre-existing `dead-path` warnings of the checker for server paths in the skill and in `guidelines/testing.md`.

## Checks (command, exit code)

In the reviewed worktree:

- `python -B .the-way/elements/common/foundation_check.py` : exit 0, "0 errors".
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` : exit 0 (5 tests OK).
- `npm test -- tests/deploy/test_loop2_watch.py` : exit 0 (78 tests OK, 229 s).
- `npm test -- tests/deploy/test_loop2_watch_message.py` : exit 0 (8 tests OK).
- `npm test -- tests/quality/test_quality_invariants.py` : exit 0 (5 tests OK; includes the shellcheck test).
- `npm test -- tests/http.test.mjs` : exit 0 (89 tests, 0 failed).
- `python -B .the-way/instruction-files/check_instructions.py .` : prints warnings only, no error; the new ones in the diff are the two `'\''` lines (Minor 3). (The handoff names `instruction-files/check_instructions.py`; it lives under `.the-way/`.)
- `diff -q .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` : no output (identical).

Manual checks:

- Red first for item 8, re-run by me in a separate detached worktree of `d385f01` in the scratchpad (since removed with `git worktree remove`), with `deploy/loop2-watch` put back to the base version `9e9d64b`: the two new tests ran, 3 failures out of 2 tests (the held-lock case failed on "skipped: the deployment lock is held (flock exit 1)" against the old "held or cannot be read"; the own-lock case failed for status 2 and 127 on `assertNotRegex ... holds`). So the tests fail when the behaviour they protect breaks. The reviewed worktree, its index and branch were not touched.
- `account-block` command by hand in Git Bash (GNU bash), the block cut from the skill by `awk`, `docker` replaced by a shell function that prints `Account <address> is now blocked.` and one JSON line, the dump path replaced by a file in the scratchpad (`...\scratchpad\trial`): address `player@example.com` -> sentence, JSON line, `exit 0`, one dump line `<UTC time> account-block | {"event":"account-blocked","accountId":"a1"}`; address with a line feed (`a@x`, LF, forged JSON, LF, `b@y`) -> `refused: the address holds a line feed or a carriage return; nothing was run`, dump unchanged and empty; the same with carriage returns -> the same refusal, dump empty; `o'brien@example.com` -> run normally. As the author found, Git Bash on Windows drops a carriage return from quoted text read as script source, so I fed the address through an environment variable (`email=$TRIAL`) and ran the rest of the block as the skill has it. The `'\''` source form (`email='o'\''brien@x'`) reads back as `o'brien@x`, and an address typed with real line feeds inside the quotes is refused. A Linux terminal with a pasted carriage return was not available.
- Fetched the archived `logrotate(8)` page and compared the three quoted passages (Step 2, item 5).

Not run: the whole gate (`npm test`), as the handoff says.

## Reaches beyond the handoff

- `elements/decisions/template.md`, `elements/environment-facts/template.md`, `elements/common/rules.md` (identifiers, withdrawn identifiers) of the pinned the-way: to judge form of the changed entries (the handoff names `product-guidelines/template.md` only).
- `.the-way/product-guidelines/testing/template.md` (grep for the shape of the expected-results table): to check the five-column form of the new rows.
- `foundations/decisions.md` D-353 (whole) and D-347 (changed section), `foundations/invariants.md` entries `browser-failure-report` and `failure-watcher-message`: to check the new D-356 sentences do not collide with them.
- `src/browser/view/last-resort.ts`, `src/browser/view/app.ts`, `tests/account-api.test.mjs`, `tests/transport.test.mjs`, `tests/deploy/test_loop2_deploy_dump.py`, `tests/deploy/watch_script_support.py`: to check the three coding-guideline examples and the testing rows against the code.
- `reports/25-review-return-step-report.md` (Minor findings M1, M3, M4, M5) and `reports/28-correction-rest-report.md`: to compare each item with its source and the author's claims.
- The archived `logrotate(8)` page at web.archive.org (fetched with `curl`).
- `git show main:foundations/environment_facts.md`, `git merge-base main HEAD`: to see whether the old fact identifier reached `main`.

## Searches not found or unclear

- `instruction-files/check_instructions.py` (the handoff's path) does not exist at the repository root; the script is `.the-way/instruction-files/check_instructions.py`. Found there.
- I could not find any test of the sibling constructor messages "Invalid limiter capacity" and "Invalid sending deadline" in `tests/` (agrees with the author), so "beside the siblings" had no place to point at.
- I could not run the carriage return case on a Linux bash (see the trial note); the line feed case was run as typed, and the carriage return case through an environment variable.
- The handoff says D-356 holds "leaves room"; it does not (only the skill does); the author noted this too.
