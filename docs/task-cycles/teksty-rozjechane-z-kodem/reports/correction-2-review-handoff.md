# Handoff — review of correction 2

You are the reviewer of the whole change, resumed for the review of a later change to the open request (variant of `review-change` for a correction for the human's answer; read `.the-way/task-cycle/review/fix.md` again as the SKILL names it). You are read-only: change no tracked file, make no commit, call no tool of the `mikrus` MCP. Work in the worktree `the task's worktree`.

**Range.** `fcc9db2..b4c2356` (five commits: `a6187ca`, `be420e7`, `aee1ecd`, `e175b32` of the foundation step, and `b4c2356`, the code). Compute `git diff fcc9db2..b4c2356` and `git log` yourself; confirm `git rev-parse HEAD` shows `b4c2356` or review the range by commit ids.

**The human's answer (Mariusz, 2026-11-10).** On the corrected request he accepted the choices listed in items 1 and 2 as recommended, and, for item 4 (findings left unfixed that he may feel), asked that they be fixed. The findings that item names, and only they, are the remarks the correction binds:
1. A mail password file of two byte-order marks passed startup (your finding 9 of `reports/whole-review.md`; `reports/slice-4-review.md`). The rule now (D-111, rewritten by `a6187ca`): refuse a password that is empty once every U+FEFF is taken out; a mark followed by characters stays accepted (the decoder drops the leading mark, a second one stays in the password). Code: `b4c2356` (`src/server/configuration.ts`, `tests/startup.test.mjs`, trust boundary `src/server/**`).
2. D-247 and the invariant `catch-up-minutes` said "a load of a saved game state" (your finding 17): `be420e7` changed D-247; the writer reports that the invariant's text never held the phrase and left it (verify).
3. The testing guidelines' trust-boundary row for `src/server/` did not name the startup refusal (`aee1ecd`; the writer also added D-111 and the invariant to two list lines of `### Trust boundaries`, which it calls a small step beyond the remark).
4. D-01 labelled the figure 11,141 as respondents (`e175b32`; the writer re-fetched the State of JS page and cites the first three rows by rank only).
The fifth finding of that item, the fact `mikrus-tunnel-outbound-tcp`, is not changed on purpose (a reading of its tool would need a further allowance of reads, which only the human gives).

**Reports** (claims to verify): `reports/correction-2-step-1-report.md`, `reports/correction-2-step-2-report.md`; handoffs `reports/correction-2-step-1-handoff.md`, `reports/correction-2-step-2-handoff.md`.

**Crafted input (trust boundary).** Try, in a scratch copy outside the worktree (never change the tree), the password files: zero bytes; one mark; two marks; three marks; a mark and a newline; two marks and a newline; a mark and text; two marks and text; text alone; 1024 bytes of valid text; 1025 bytes; invalid UTF-8; a file of marks above 1024 bytes. The refusal message must name the setting and never the file's content. Confirm the new fixtures of the case that carries `invariant: account-startup-configuration` fail on the base source and pass on the head.

**Also check** that D-111's new text agrees with the code, with `account-startup-configuration` and with the other entries that derive from D-111 (the writer says none needed a change), that D-247 keeps its meaning, that the guideline row says what the case does, that D-01 claims no more than the page shows, and that nothing else changed in the range. Run `python -B .the-way/elements/common/foundation_check.py` (exit 0 expected) and `git diff --check`.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/correction-2-review.md` as `review-change` gives it: first line `PASS <sha>` or `FAIL <sha>`; findings by grade with place and your own words; the checks run (command, exit code); reaches; **Unread material** and **Searches not found or unclear** (each `none` if so). Return the first line, the report path and a one-line summary by grade.
