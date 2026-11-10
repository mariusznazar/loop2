# Handoff — Slice 4

You are the executor of Slice 4 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `e04ac0e338c42b31260be7363aee666cbc09e5e8`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

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

**Notes of the orchestrator for this slice.**
- Run a `.mjs` test file as `npm test -- tests/startup.test.mjs` (the form `python -B scripts/test.py <file>` of the plan fails for `.mjs` files outside `npm run`, with `KeyError: 'npm_execpath'`; a `test_*.py` file runs either way). Report the command you ran.
- D-111 was rewritten by the foundation step (commit `0202a50`): the password file must decode to a nonempty password, so a file of only a byte-order mark is refused at startup. Read its current text whole; it is the source of the rule.
- This slice meets crafted files at a trust boundary: your test must show, by the fixtures and not by the function's output, the refusal of: only a byte-order mark (EF BB BF), a mark and a newline, zero bytes, and 1025 bytes; and the acceptance of a mark followed by other characters (the mark dropped, as the decoder drops it today) and of a file of exactly 1024 bytes where the existing case already holds those fixtures.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-4-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
