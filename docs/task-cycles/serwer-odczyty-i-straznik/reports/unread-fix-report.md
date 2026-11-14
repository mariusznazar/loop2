# Report of the fix of finding I1, task cycle `serwer-odczyty-i-straznik`

**Status:** done

**Commit:** `51289d70` on `task/serwer-odczyty-i-straznik` (parent `6cb19fb6`), two files, 7 added and 6 removed lines:
- `foundations/environment_facts.md` (entry `loop2-app-log-sqlite-busy-lines`, sentence and *Source*; 2 added, 2 removed lines)
- `foundations/decisions.md` (D-205 *Rationale*, one sentence; 5 added, 4 removed lines; no binding sentence, no field changed)

## Finding I1: fixed, way (a)

The reading looked for the constant's name `SQLITE_BUSY`, which no line of the game's log holds. Of an error a failure line writes `kind`, `code` and `errcode` only (`src/server/log-line.ts:7-9`, `:32-45`); the line is `JSON.stringify({ failure, kind, code, errcode, place, ... })`, so the key order is fixed and a busy failure leaves `"errcode":5,` followed by `"place"` (`src/server/database.ts:197` and `:205` compare `errcode` with 5). The fact now reads for `"errcode":5,`. The trailing comma is deliberate: `"errcode":5` alone would also match `"errcode":517` (SQLite's extended number for a busy snapshot, from my knowledge of SQLite, not read here), or any other number that begins with 5; `isBusy` compares with exactly 5.

What the new readings show (2026-11-14):
- `"errcode":5,` is on no line of the dump and on no line of `.1`.
- The dump holds no line with `"failure":` at all, so no failure line of any kind (no `"errcode":` and no `ERR_SQLITE_ERROR` either). No count of busy lines is written: there are none.
- `.1` holds one line, `logrotate trial`, and nothing of the game. So the copy cannot show anything about busy failures; the old D-205 sentence read as if both files had been checked.
- Positive control: the same grep form with `"event":"link-issued"` matches one line in the dump, so a fixed string written as the game writes its JSON lines (no space after the colon) matches there. On `.1` no control can match, because the file holds no game line. The needles `"errcode":`, `ERR_SQLITE_ERROR` and `"failure":` match nothing in either file, which follows from the dump holding no failure line at all.

The fact's sentence now says that and nothing about the dump's time span (not read: no allowed reading shows the dump's first line). D-205's sentence now says: the dump held no line with SQLite's busy number 5 in a failure line and no failure line of any kind, its rotated copy held no line of the game, and the log of the running containers was not read. It no longer says what the old text implied (that the file was searched for the thing a busy failure leaves).

Other places quoting the old claim: one search of the repository outside `.runs` and `.the-way` for `SQLITE_BUSY` and the identifier found `foundations/environment_facts.md` (fixed), `foundations/decisions.md` D-205 (fixed; the D-205 *Based on* names the identifier, which is kept), `src/server/database.ts:197,205` (the constant's real use, left), `tests/deploy/test_loop2_watch.py:44` (a test line with `"code":"SQLITE_BUSY"` the server never writes; pre-existing, left alone as the findings file says). The skill `.claude/skills/loop2-deploy/SKILL.md` and the rest of `.claude` hold no match; the skill's allowed readings are unchanged.

## Readings, raw output

The server identity (id, name, port, user, address) is in no file and no message; the one account identifier in the control output is replaced by `<account>`. The `mcp__mikrus__exec` tool wraps each output in JSON `{"output": "..."}`, with `"` written `&quot;`; below the output is shown as the tool printed it, with `&quot;` read back as `"`.

1. Text checked in code first: `src/server/log-line.ts:39-44` and `tests/account-storage.test.mjs:2818-2828`, `:2884-2890` (shapes `"kind":"Error","code":"ERR_SQLITE_ERROR","errcode":26` and `1811`).
2. `grep -F -m 50 -- '"errcode":5,' /var/log/loop2-app.log` -> output: empty
3. `grep -F -m 50 -- '"errcode":5,' /var/log/loop2-app.log.1` -> output: empty
4. `grep -F -m 50 -- '"code":"ERR_SQLITE_ERROR"' /var/log/loop2-app.log` -> output: empty
5. `grep -F -m 50 -- '"errcode":' /var/log/loop2-app.log` -> output: empty
6. `grep -F -m 50 -- '"failure":' /var/log/loop2-app.log` -> output: empty
7. `grep -F -m 50 -- '"failure":' /var/log/loop2-app.log.1` -> output: empty
8. `grep -F -m 50 -- '"errcode":' /var/log/loop2-app.log.1` -> output: empty
9. `grep -F -m 50 -- 'ERR_SQLITE_ERROR' /var/log/loop2-app.log.1` -> output: empty
10. `grep -F -m 50 -- 'ERR_SQLITE_ERROR' /var/log/loop2-app.log` -> output: empty
11. `grep -F -m 50 -- '"event":"link-issued"' /var/log/loop2-app.log` -> `loop2              | 2026-11-13T23:03:05.952126792Z {"event":"link-issued","accountId":"<account>","linkPurpose":"password-reset"}`
12. `grep -F -m 50 -- '"event":' /var/log/loop2-app.log.1` -> output: empty
13. `grep -F -m 50 -- 'Z {"' /var/log/loop2-app.log.1` -> output: empty
14. `grep -F -m 50 -- 'loop2 ' /var/log/loop2-app.log.1` -> output: empty
15. `tail -n 200 /var/log/loop2-app.log.1` -> `logrotate trial`
16. `grep --version | head -1` -> `grep (GNU grep) 3.7`

Beyond the forms the handoff named: readings 4-10 and 12-14 are extra positive and negative controls, all `grep -F -m 50 -- '<fixed string>'` of the two files; reading 15 is the skill's allowed `tail -n 200` of `.1`, run because readings 12-14 returned nothing and the fact needed to say what `.1` holds; 16 is the skill's allowed version read. Readings 4, 5, 8, 9, 10 are not quoted in the fact beyond what its sentence says; the *Source* quotes 2, 3, 6, 7, 15, 11 and 16.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` from the worktree root: exit 0, "0 errors".
- `python -B -m unittest -v test_tracked_file_private_paths` from `tests/agent_workflow`: exit 0, 1 test OK.
- Search of the diff (`git diff | grep -i -E 'joanna|273|7f52ba10|\.mikrus|root@'`) for the server's id and the ports derived from it, the account identifier and an address pattern: no match (grep exit 1). The server's name and user were never seen, so they could not be searched for; no text of either entered the diff.
- Not run: `npm test` and any slow test, as the handoff says.

## Own-work check (section 3)

Requirement most likely not met: that the new needle is the exact text the code writes and cannot match something else. Check: read `src/server/log-line.ts` (`JSON.stringify`, fixed key order `failure, kind, code, errcode, place`) and the tests' parsed shapes; this gave `"errcode":5,` with the trailing comma, which keeps `517` and other extended numbers out. The control (reading 11) shows the colon-without-space form matches in the dump. The check did not run the needle against a line holding `"errcode":5,`, since the files hold no failure line to show it; that is the stated limit of the control, and the fact does not claim more.

Skill reach: the-way's `elements/environment-facts/template.md`, `skill/{SKILL,decide_entry,draft,read,write}.md`, `elements/common/{rules,way_of_working}.md`, `elements/decisions/skill/{SKILL,decide_entry,read}.md` and the passages of `elements/decisions/template.md` on *Rationale* (lines 55-100) and "Changing a decision" (133-150), read for the two foundation writes.

## Choices

- Needle `"errcode":5,` over `"errcode":5` (the finding's form): exact match on 5; the cost if wrong is none for a zero result, and a prefix needle would have counted 517 as busy.
- The D-205 sentence says "SQLite's busy number 5 in a failure line", not the constant's name or the needle's characters, to keep the *Rationale* free of tool-level detail (the decision template).
- Way (b) not taken: the readings were allowed and cheap, so the fact holds a real reading rather than a disclaimer.

## Problems as observed

- `.1` holds one line, `logrotate trial`: the rotated copy has no game content (observed by readings 12-15). Cause not verified (a manual `logrotate` trial is a guess from the text).
- The dump holds no failure line of any kind. That agrees with a healthy game and also with a dump that does not span the nights of the backup; the dump's first line and span were not read (no allowed reading gives it), so the fact makes no claim about the span.

## Unread material

- `src/server/log-line.ts`: read whole. `tests/account-storage.test.mjs`: read only lines 2810-2830 and 2880-2892. `src/server/database.ts`: read lines 190-215 only.
- `.claude/skills/loop2-deploy/SKILL.md`: read lines 40-110 (section "Agent or human"); the rest not read, searched by grep for the claim only.
- Foundation: `foundations/environment_facts.md` read from line 800 to the end and the one entry; `foundations/decisions.md` read lines 3940-4019 (D-204, D-205 whole, D-206 start); D-236 and D-112 not read.
- `.the-way/elements/decisions/template.md`: read lines 55-100 and 133-150 only (not whole). The skills of the two element writes were read whole except `decisions/skill/projected.md`, `environment-facts/skill/projected.md` (projected mode, not this work), and the-way's `missing_element_file.md`.
- `.runs/.../task.md` and `reports/unread-reading.md`: not read; the findings file carried what was needed.

## Searches not found or unclear

- The handoff's "exact text a failure line holds": no single test or code line shows a busy line; the shape `"errcode":5,` is derived from `JSON.stringify` and the key order in `log-line.ts`, checked against tests with other numbers (26, 1811), not against a test with 5.
- No allowed reading shows the dump's first line or time span; the fact leaves the span out.
- A the-way rule on how an environment fact's *Source* quotes an empty output: the existing entries use "no output"; kept.
