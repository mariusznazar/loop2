# Handoff — Slice 7

You are the executor of Slice 7 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `f96f56f1c1af8efafda26dd9f5bd9548ea3d82c6`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 7 — The deploy skill lets the agent read two more facts of the server

- **Goal:** the list "Allowed" of the section "Agent or human" of
  `.claude/skills/loop2-deploy/SKILL.md` and of its byte-identical copy
  `.agents/skills/loop2-deploy/SKILL.md` gains exactly two read-only commands (question 2, answer B):
  the number of lines of the `authorized_keys` of the account the MCP runs as that carry the forced
  command `/usr/local/bin/loop2-deploy` — the number only, never the content of a key — and
  `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy`, each with the value it expects as the skill
  states the expected value of its other metadata reads (one entry; `755 root:root`, which the two
  facts of the foundation hold). No other permission is added or widened, and the skill's
  prohibitions stay. Both copies are edited to stay byte for byte equal, and neither names the
  server, its identifier or its address.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:60-60` To do, item 23 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:88-93` Questions to settle, question 2 ·
  `foundations/decisions.md:271-289` D-12 · `foundations/part_map.md:118-133` agent-workflow ·
  `foundations/part_map.md:143-173` deployment · `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` exits 0 (the
  copies are byte-identical; no server name or IPv6 literal); `python -B .the-way/elements/common/foundation_check.py`
  exits 0
- **Depends on:** none

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-7-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
