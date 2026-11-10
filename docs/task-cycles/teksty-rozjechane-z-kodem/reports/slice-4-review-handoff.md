# Handoff — review of Slice 4

You are a fresh reviewer. You did not make this change. Work from the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`); you are read-only: you change no tracked file and make no commit. The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator; ask it, never the human.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole (the method `review-change`), in its variant "a planned slice"; read a file it names (`fix.md`, `whole_change.md`) only when the step or variant that names it comes. Its report form and grades bind you. Grade and scope are yours; nothing in this handoff calls a finding wrong, Minor or out of scope.

**Range.** `e04ac0e338c42b31260be7363aee666cbc09e5e8..60c799e`. Compute `git diff e04ac0e338c42b31260be7363aee666cbc09e5e8..60c799e` and `git log e04ac0e338c42b31260be7363aee666cbc09e5e8..60c799e` yourself, and confirm `git rev-parse HEAD` shows `60c799e`; if HEAD differs, the worktree has moved on: review the range by commit ids, never the working tree.

**Risk of this slice.** Trust boundary: the slice's files lie in a trust boundary of the part map (`package-lock.json` of `build-tools`, `src/server/**` of `account-server`). Check crafted input at that boundary as the slice's section below says. Irreversible operation: none.

**The task and the slice.** Judge the change against the passages of the frozen task that the slice names in its *Read* (`docs/task-cycles/teksty-rozjechane-z-kodem/task.md`, the lines given there) and against the section below, copied from `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md` word for word. The guideline files and foundation entries of *Read* are read whole (find a decision by its `### D-nn` heading; the plan's line ranges are from base `adbec4b`, and the foundation step has since edited `foundations/`).

### Slice 4 — The server refuses a mail password file that decodes to an empty password

- **Goal:** `readSmtpPassword` of `src/server/configuration.ts` refuses, at startup and with the
  same message as today (the setting's name, never the file's content), a password file whose
  decoded text is empty, so a file of only a byte-order mark (EF BB BF) is refused as a file of zero
  bytes is. Every other file keeps its present result, among them a file of a byte-order mark and a
  newline (refused as a control character), a byte-order mark followed by other characters (accepted
  with the mark dropped, as the decoder drops it today) and the longest accepted file of 1024
  bytes. The failing test comes first: the byte-order mark alone added to the list of invalid files
  of the existing case "the SMTP password file must be a small non-empty UTF-8 regular file without
  control characters …" in `tests/startup.test.mjs`, seen failing before the change; the case
  stays marked with its invariant. D-111 as the foundation step wrote it is the source of the rule.
  The code of this slice meets crafted files at a trust boundary, so its review is told to try a file
  of only a mark, a mark and a newline, a mark and bytes, zero bytes and 1025 bytes.
- **Change:** `src/server/configuration.ts` · `tests/startup.test.mjs`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:66-66` To do, item 29 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:94-98` Questions to settle, question 3 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:172-172` Settlements to record, row 2 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/part_map.md:62-82` account-server ·
  `foundations/decisions.md:2012-2023` D-111 · `foundations/decisions.md:291-304` D-13 ·
  `foundations/decisions.md:2881-2894` D-153 · `foundations/invariants.md:749-757`
  account-startup-configuration
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (account-server)
- **Checks:** `python -B scripts/test.py tests/startup.test.mjs` exits 0, the new file seen failing
  first; `npm run typecheck` exits 0
- **Depends on:** Settlement row 2 (Foundation entries)

**The executor's report.** `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-4-report.md` — a set of claims to verify, not evidence.

**Crafted input to try (trust boundary `src/server/**`).** Check, by reading the code and, where you can, by running it (read-only: use a scratch copy outside the worktree, never change the tree), the refusal and acceptance of these password files: only a byte-order mark (EF BB BF); a mark and a newline; a mark and bytes; zero bytes; 1024 bytes of valid text; 1025 bytes; invalid UTF-8; a file that is not a regular file. The refusal message must name the setting and never the file's content. D-111 (rewritten by the foundation step, commit `0202a50`) is the source of the rule: read its current text whole. The executor ran `.mjs` tests as `npm test -- <file>`; the plan's `python -B scripts/test.py <file>` form fails for `.mjs` outside `npm run` (the orchestrator knows).

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-4-review.md` as `review-change` gives it. Its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`). Include the checks you ran with command and exit code, each reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`). Return: the first line, the report path, and a one-line summary of the findings by grade.
