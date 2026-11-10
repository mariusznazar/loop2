# Handoff — the planner

You are a fresh planner. Work from the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`, head `adbec4b`, which moved the process pin to `e3825a82386a61930a86f8517fc0c5f422fc2833`). Write nothing outside this worktree.

**Delegation.** The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which is the cycle's only contact with you. You never ask the human; questions go back in your report with status `questions`.

**Method.** Read `.the-way/task-cycle/plan/SKILL.md` whole (the method `plan-task`), and a file it names only when the step or variant that names it comes. Stage: write the plan of the change, and its size report; no code. Boundary: you write `plan.md` and `plan-size.md` in `docs/task-cycles/teksty-rozjechane-z-kodem/` and return.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md` (copy of the ready task, approved 2026-11-08). Read it whole: its 42 items, its questions 1-7 with their answers, *Decisions in play*, and the two rows of *Settlements to record* (items 29 and 37 carry the decisions D-111 and D-252). No spec exists; no open design choice was found.

**Answers of step 4 (cycle step 4).**
- Trust boundary: yes. `src/server/configuration.ts` (item 29) lies in `src/server/**`, the trust boundary of `account-server`; `package-lock.json` (item 1) is a trust-boundary file of `build-tools`. A slice that changes either is marked with that risk. Reviews of such a slice check crafted input: a password file of only a BOM, a BOM plus bytes, a BOM and a newline, zero bytes.
- Irreversible operation: no. Item 22 only reads the host through the MCP server `mikrus` (read-only commands; the host is `joanna273`; tools `mcp__mikrus__exec` and `mcp__mikrus__servers`, deferred, loaded with ToolSearch). Item 23 widens the reads an agent may make in `.claude/skills/loop2-deploy/SKILL.md` and its copy under `.agents/`; Mariusz settled it in question 2 (answer B), so the task authorizes it. Nothing is deployed, migrated or deleted.
- Execution route: planned slices (the orchestrator judged that more than one agent is needed: six parts, code and tests, three guideline skills, five foundation element skills, a read of the remote host).
- Checks carried from the pin move: none. The gate on `adbec4b` passed (`npm test` exit 0, `0 errors` in `foundation_check`); nothing fails there that passed on the base.

**What the orchestrator knows that the task does not say (use it, verify it).**
- Foundation entries of the task are written through the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`; guideline files through `the-way-maintain-coding-guidelines`, `the-way-maintain-testing-guidelines`, `the-way-maintain-styleguide` (see `AGENTS.md` of the product). Item 36 changes a glossary entry (`catch-up`), items 22 and 34 environment facts, the rest decisions.
- Item 22 must be read by an agent that can call MCP `mikrus`; a slice that needs it says so in its *Read* and *Checks*. If the tool is missing in the executor's session, it returns `blocked`.
- Item 40 says the reason for D-313 stands in `docs/task-cycles/ekran-przejscia/cycle.md:230` at commit `2aae30a`; where it is not there, the cycle asks Mariusz — the cycle cannot, so the slice returns `questions` with what was searched. Item 31 names `git show 1b09f80:docs/task-cycles/plan-wyprawy/task.md`.
- The tracked tests of the repository run with `npm test` (the one command: build, Node tests, `.the-way/gate/run_tests.py`, `foundation_check.py`). The executors run focused checks only (`python -B scripts/test.py <file>` for one test file; `python -B .the-way/elements/common/foundation_check.py`); the orchestrator runs the gate (WAY-160).
- Item 4 and 5 change the kitchen-sink page (`src/browser/kitchen-sink/**`, `src/browser/view/terrain-picture.ts`): a user-interface change; the slice's guideline reading includes `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md`.

**What to read (selected by the orchestrator).** Guidelines, each whole: `guidelines/coding.md` (and the kind files its index row matches for the code of items 4, 5, 29), `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`. Foundation: `foundations/part_map.md`; the decisions of *Decisions in play* of the task (D-01, D-02, D-05, D-04, D-48, D-54, D-56, D-67, D-101, D-111, D-147, D-156, D-183, D-185, D-207, D-211, D-213, D-237, D-247, D-252, D-269, D-280, D-312, D-313) plus those whose *Scope* names a part a slice touches, as "Reading the foundation" in `.the-way/elements/common/way_of_working.md` gives; the glossary whole.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/plan-report.md` as the method gives it, with its **Unread material** and **Searches not found or unclear** sections (each `none` if so). Return: status, a one-line check result, the report path, your questions and concerns, and each reach beyond this handoff.
