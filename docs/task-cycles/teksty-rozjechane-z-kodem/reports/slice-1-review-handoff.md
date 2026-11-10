# Handoff — review of Slice 1

You are a fresh reviewer. You did not make this change. Work from the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`); you are read-only: you change no tracked file and make no commit. The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator; ask it, never the human.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole (the method `review-change`), in its variant "a planned slice"; read a file it names (`fix.md`, `whole_change.md`) only when the step or variant that names it comes. Its report form and grades bind you. Grade and scope are yours; nothing in this handoff calls a finding wrong, Minor or out of scope.

**Range.** `adbec4b025b9b5760bdb41b5d803794cbb062acd..fe84d1e`. Compute `git diff adbec4b025b9b5760bdb41b5d803794cbb062acd..fe84d1e` and `git log adbec4b025b9b5760bdb41b5d803794cbb062acd..fe84d1e` yourself, and confirm `git rev-parse HEAD` shows `fe84d1e`; if HEAD differs, the worktree has moved on: review the range by commit ids, never the working tree.

**Risk of this slice.** Trust boundary: the slice's files lie in a trust boundary of the part map (`package-lock.json` of `build-tools`, `src/server/**` of `account-server`). Check crafted input at that boundary as the slice's section below says. Irreversible operation: none.

**The task and the slice.** Judge the change against the passages of the frozen task that the slice names in its *Read* (`docs/task-cycles/teksty-rozjechane-z-kodem/task.md`, the lines given there) and against the section below, copied from `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md` word for word. The guideline files and foundation entries of *Read* are read whole (find a decision by its `### D-nn` heading; the plan's line ranges are from base `adbec4b`, and the foundation step has since edited `foundations/`).

### Slice 1 — The Node.js range in README, package.json and the lockfile

- **Goal:** the requirement is Node.js 24.15.0 or newer within line 24, written `^24.15.0`, in three
  places: the sentence "Wymagania: …" of `README.md` (line 5, kept in Polish and naming the floor
  where it now says "24.x"), `engines.node` of `package.json` and `engines.node` of the root entry
  (`packages[""]`) of `package-lock.json`. The README may give the reason (the pinned npm and jsdom
  declare that floor) only after the lockfile shows it; it states no reason it cannot find there.
  Nothing else of the lockfile changes: no regeneration, no new resolution, one line differs.
- **Change:** `README.md` · `package.json` · `package-lock.json`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:26-26` To do, item 1 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:83-87` Questions to settle, question 1 ·
  `guidelines/coding.md` · `foundations/part_map.md:84-116` build-tools ·
  `foundations/decisions.md:3-15` D-01 · `foundations/decisions.md:765-776` D-33 ·
  `foundations/invariants.md:5-13` account-server-runtime ·
  `foundations/invariants.md:449-457` introduced-npm-vulnerabilities ·
  `foundations/invariants.md:549-557` dependency-audit-refusal ·
  `tests/invariants/test_account_server_runtime.py`
- **Model:** cheaper
- **Risk:** trust boundary — `package-lock.json` (build-tools)
- **Checks:** `python -B scripts/test.py tests/invariants/test_account_server_runtime.py` exits 0 (a
  regression check: the invariant reads the major version 24 from the range and passed before);
  `git diff --stat -- package-lock.json` shows one line changed; `python -B scripts/audit_dependencies.py`
  exits 0 (the lockfile now differs from the fork point, so it asks the npm registry; without
  network report it unchecked, never passed)
- **Depends on:** none

**The executor's report.** `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-1-report.md` — a set of claims to verify, not evidence.

**Scope of this range (Slice 1 covers the plan's *Foundation entries*).** The range starts at `adbec4b`, the base written before the foundation entries, so it contains the 20 commits of the plan's *Foundation entries* (`6c31f59`..`3fcf546`, files `foundations/decisions.md`, `foundations/glossary.md`, `foundations/environment_facts.md`) and then the executor's commit `fe84d1e`. Review the foundation entries against the plan's section *Foundation entries* (`plan.md`, the rows are in the table there), the frozen task items 21, 24-36, 38-42 and the two rows of *Settlements to record*, and the templates of the elements (`.the-way/elements/decisions/template.md`, `.the-way/elements/environment-facts/template.md`, `.the-way/elements/glossary/template.md`, `.the-way/elements/common/rules.md`). Their writers' reports are `reports/foundation-1-report.md` and `reports/foundation-2-report.md` (claims to verify). Check source fidelity: every quotation, number and place in an entry is from its source (`git show` of the commit a row names, the code, the page), not from memory.

**Crafted input and the lockfile.** For the lockfile change, check that exactly one line of `package-lock.json` differs and that `^24.15.0` is the range the pinned npm and jsdom entries of the lockfile declare for line 24 (the executor's report claims it). The invariant test `tests/invariants/test_account_server_runtime.py` reads the major version from the range.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-1-review.md` as `review-change` gives it. Its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`). Include the checks you ran with command and exit code, each reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`). Return: the first line, the report path, and a one-line summary of the findings by grade.
