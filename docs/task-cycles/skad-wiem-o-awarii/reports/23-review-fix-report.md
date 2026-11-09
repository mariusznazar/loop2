PASS ae151c4dfe7d69b47bec823903dda696c3cf9343

# Review of the fix after the review of the whole change

Fix range `c493ba8c44780dfe76724bd618aed97b03e10a5f..ae151c4` (one commit, `ae151c4`); `git rev-parse HEAD` = `ae151c4dfe7d69b47bec823903dda696c3cf9343`, the head given. Method: review SKILL.md with `fix.md`. Bounded by `reports/22-fix-findings.md` and `reports/22-fix-report.md`. I changed no tracked file; `git status --short` is empty.

Counts: blocking 0, new Minor 0, out of scope 0.

## Findings of the file

- **N1 (comments cite D-347 for sending): fixed.** `src/browser/view/app.ts:238` now cites D-353; `src/browser/view/last-resort.ts:41` cites D-253 (the "once" rule); the header comment of the first new test in `tests/view/uncaught-failure.test.mjs` reads `D-353, D-253`. No `D-347` remains in those three files. Comments only.
- **N2 (invariant tag on view tests): fixed.** The three `// invariant: browser-failure-report` lines are gone from `tests/view/uncaught-failure.test.mjs`; the two tags in `tests/account-api.test.mjs` stay, as the finding allowed. The diff of the test file removes only comment lines and rewrites the citation in one.
- **N4 (residual-risk wording): fixed.** Both `SKILL.md` copies now say that the address with a line break may be typed on purpose and may also be pasted from one a player registered, because the server accepts any text around exactly one `@`, with the advice to type it as registered or check it for a line break before pasting. This is true of `normalizeEmail` (`src/server/account-policy.ts:83-88`) and of what the filter does (my hand trial in the whole-change review).
- **N5 (rollback and the Compose file): fixed.** Both copies: the dump reads the `compose.yaml` of the commit being deployed; a commit whose Compose file has no `app` or `cloudflared` service makes `docker compose logs` fail, the script warns and the log of the running containers is not kept; the paragraph points to "Rollback across the tunnel transition" in `references/troubleshooting.md`, which exists (`troubleshooting.md:151`). The sentence "A commit from before the watcher, ..." is intact, only re-wrapped across a line.
- **Slice 2 Minor (printf line break): fixed, and behaviour unchanged.** `deploy/loop2-deploy:342` is now one line with `\n`. I ran both forms in bash with the same arguments and compared `od -c`: identical bytes (a line break after the third `%s`). `bash -n` passes. The dump tests (9), `loop2-host-sharing` (18) pass.
- **Slice 5 M1 (watcher comment): fixed; the comment now says what the script does.** Header: Nothing read from a log or Docker, no number and no commit or account name goes into a *message*; the state holds container ids, start times and times of the last messages; the script's log holds counts and statuses; nothing of the content of a log line reaches either. That matches the code (`state_text`, `report_run`, `count_lines`). The comment before the constants block says that messages, names, paths and limits stand inside and the patterns and the two anchored prefixes outside; I checked: `EPOCH_PATTERN`, `INSPECT_LINE` etc. stand after `# === end of constants ===`, and the prefixes are in `count_lines`. One nit, not a finding: the state also holds the end of the last window, which "times of the last messages" does not name.

## What the fix itself changed

`git diff --name-only`: the two `SKILL.md` copies, `deploy/loop2-deploy`, `deploy/loop2-watch`, `src/browser/view/app.ts`, `src/browser/view/last-resort.ts`, `tests/view/uncaught-failure.test.mjs`. I read the whole diff: the only non-comment, non-prose change is the `printf` format string, shown identical at run time. The `deploy/loop2-watch` diff is comment lines only (executable lines and the constants block unchanged). No other file changed. The two skill copies are byte-identical (`diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy`: no output, exit 0). No new Critical or Important finding.

## Checks I ran

| Command | Exit |
|---|---|
| `git rev-parse HEAD` | 0, `ae151c4...` |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | 0 (identical) |
| `printf` old and new format compared with `od -c` in bash | identical |
| `bash -n deploy/loop2-deploy`; `bash -n deploy/loop2-watch` | 0, 0 |
| `npm test -- tests/deploy/test_loop2_deploy_dump.py` | 0 (9) |
| `npm test -- tests/invariants/test_loop2_host_sharing.py` | 0 (18) |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 (5) |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |

Not run: the full gate and shellcheck (`tests/quality/test_quality_invariants.py`; the fix report says it passed, and my diff reading shows only a format-string line and comments changed in the scripts); `tests/deploy/test_loop2_watch.py` (comment-only change in the script).

## Declined to judge

None. Real-host behaviour stays on the whole-change review's unchecked list.

## Reaches beyond the dispatch

`src/server/account-policy.ts:83-88` (to confirm the N4 claim) and `deploy/loop2-watch` lines 20-60, 180-300 (to compare the new comments with the code).

## Searches not found or unclear

None.
