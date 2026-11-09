# Report of the fix after the review of the whole change

**Status:** done

Findings file: `.runs/task-cycles/skad-wiem-o-awarii/reports/22-fix-findings.md`. Head before the fix: `c493ba8`.
The findings file was missing when I was dispatched; I changed nothing then, read it once it existed and fixed exactly its six findings.

## Findings

- **N1, fixed.** `src/browser/view/app.ts:238` now cites D-353; `src/browser/view/last-resort.ts:41` cites D-253 ("once"); the header comment of the first test at `tests/view/uncaught-failure.test.mjs` reads `D-353, D-253`. Comments only. Check: the view test file passes.
- **N2, fixed.** The three `// invariant: browser-failure-report` tags are dropped from `tests/view/uncaught-failure.test.mjs`; the two in `tests/account-api.test.mjs` stay. Check: both test files pass (a tag is a comment).
- **N4, fixed.** `.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md`, the residual-risk sentence: the line break may be typed on purpose or pasted from an address a player registered (the server accepts any text around one `@`); advice: type the address as registered, or check it for a line break before pasting. Copies byte-identical (`cmp`, and the skill test).
- **N5, fixed.** Same two files, rollback paragraph "A rollback and the failure record": the dump reads the `compose.yaml` of the commit being deployed; a commit whose Compose file has no `app` or `cloudflared` service makes `docker compose logs` fail, the script warns and the log of the running containers is not kept; points to "Rollback across the tunnel transition" in `references/troubleshooting.md`.
- **Slice 2 Minor 1, fixed.** `deploy/loop2-deploy:342`: the real line break inside the `printf` format is now `\n`, on one line. Check: dump, host-sharing and keeps-running tests pass.
- **Slice 5 M1, fixed (comment only).** `deploy/loop2-watch` header: the sentence on the message no longer claims the state and the log hold no numbers or names; it says the state holds container ids, start times and times of last messages, the log holds counts and statuses, and nothing of the content of a log line reaches either. The comment before the constants block says what stands inside (messages, names, paths, limits) and outside (patterns, the two anchored prefixes).

## Files and commit

Seven files, 31 added / 19 removed lines: `src/browser/view/app.ts`, `src/browser/view/last-resort.ts`, `tests/view/uncaught-failure.test.mjs`, `deploy/loop2-deploy`, `deploy/loop2-watch`, both `loop2-deploy/SKILL.md` copies. Commit: see `git log` (one commit on `task/skad-wiem-o-awarii`, not pushed).

## Checks (all via `npm test -- <file>`)

| File | Exit |
|---|---|
| tests/view/uncaught-failure.test.mjs | 0 |
| tests/account-api.test.mjs | 0 |
| tests/deploy/test_loop2_deploy_dump.py (9 tests) | 0 |
| tests/invariants/test_loop2_host_sharing.py (18) | 0 |
| tests/invariants/test_loop2_deploy_keeps_running.py (13) | 0 |
| tests/deploy/test_loop2_watch.py (76) | 0 |
| tests/quality/test_quality_invariants.py (5; shellcheck and lint) | 0 |
| tests/agent_workflow/test_loop2_deploy_skill.py (5) | 0 |

Not run: the full suite and `foundation_check.py` (the cycle's run, not the fix's).

## Own-work check

Requirement most likely missed: the fix must stay as small as the findings. Check: `git diff --stat` shows only the seven files and only the lines named; the `printf` diff is one line joined; the tag removals touch three comment lines. The `\n` change is behaviour-preserving, shown by the 9 dump tests passing before and after.

## Reaches beyond the dispatch

`foundations/decisions.md` headings of D-253, D-353, D-347 (grep of the headings only) to confirm the citations; `deploy/loop2-watch` lines 328-372 (`count_lines`, `read_logs`) to word the comment on the prefixes truthfully.

## Searches not found or unclear

The findings file was absent at dispatch (orchestrator slip, already known). Otherwise none.

## Choices

N4 and N5 are a few lines each rather than one sentence, to carry the advice and the pointer. Cost if wrong: prose only.
