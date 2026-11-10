# Handoff — Slice 8

You are the executor of Slice 8 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `c2cfc04bb59937642757dad4375e60092ec9dc0f`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 8 — The four facts about the test server's state carry a reading

- **Goal:** the *Source* of `loop2-host-forced-command-entry`, `loop2-host-installed-command`,
  `mikrus-host-docker-workloads` and `mikrus-host-swap` in `foundations/environment_facts.md` is each
  a reading in the form of the environment-fact template — `reading: <command> on <host>, <tool and
  version> — "<output word for word>"; run <date>` — made now by this agent through the `mikrus` MCP
  server (the tools `mcp__mikrus__servers` and `mcp__mikrus__exec`, deferred: load them with
  `ToolSearch`; where they are missing return `blocked`). It runs only commands of the list "Allowed"
  of the deploy skill as Slice 7 left it: the two new commands for the first two facts, `docker ps`
  and `free` for the other two, so the fact about swap rests on the `free` output and its sentence
  says no more than that output does. The tool and its version come from a read the list allows; where
  no allowed command prints a version, the executor returns `questions` naming each tool, and writes no
  version from memory or from the entry's earlier wording. `<host>` is written as "the test server's
  host", never the server's name, identifier, port or address, which the deploy skill keeps out of the
  repository. A sentence of a fact changes only where the new reading shows it false or wider than the
  output; the entries that rest on the four facts (D-14, D-16, D-17, D-231) are read to confirm they
  still stand, and the identifiers stay.
- **Change:** `foundations/environment_facts.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:59-59` To do, item 22 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:88-93` Questions to settle, question 2 ·
  `.claude/skills/loop2-deploy/SKILL.md:45-88` Agent or human ·
  `.the-way/elements/environment-facts/template.md` ·
  `foundations/decisions.md:271-289` D-12 · `foundations/decisions.md:307-321` D-14 ·
  `foundations/decisions.md:344-368` D-16 · `foundations/decisions.md:370-393` D-17 ·
  `foundations/decisions.md:4444-4501` D-231 · `foundations/part_map.md:143-173` deployment
- **Model:** same — it records output of a remote host word for word and must stop rather than fill
  a missing version
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`; each
  of the four *Source* lines names the command that was run and carries the output as the host
  returned it, which the executor shows beside the entry in its report
- **Depends on:** Slice 7

**Notes of the orchestrator for this slice.**
- Slice 7 is committed (`c2cfc04`): the list "Allowed" in `.claude/skills/loop2-deploy/SKILL.md` now holds the two commands for the first two facts, exactly as the skill writes them: the `stat` of the installed deploy script (expects `755 root:root`) and the count of the authorized-keys lines that begin with the forced command (expects `1`; the count only). Use exactly the strings the skill gives, and for the other two facts `docker ps` and `free`, no other command. Read the skill's whole section "Agent or human" first and keep to its limits: reads only, no key content, the server's name, id, port and address never copied into any file or report (write the host as "the test server's host").
- The MCP tools are deferred in your session: load `mcp__mikrus__servers` and `mcp__mikrus__exec` with ToolSearch (`select:mcp__mikrus__servers,mcp__mikrus__exec`). Call `servers` to get the server id, then `exec` with it. If the tools are not available to you, return `blocked` and write nothing.
- The tilde in the count command may not expand under the MCP's `exec`. Run it once as written; if it errors and prints no count, return `questions` (do not rewrite the command from memory and do not widen what is allowed).
- The template of the facts asks for `<tool and its version>`. None of the allowed commands prints a version. Do not write a version from memory, from the entry's earlier wording or from an unlisted command. For each tool, write the version only if an allowed read prints it. If a version cannot be had, write nothing in its place and return `questions` naming each tool whose version is missing, with the reading you would write. The orchestrator will settle it. Commit only the facts whose reading is complete and in the template's form, or commit none and return `questions` with all four drafted readings in the report. Tell the orchestrator which you did.
- Today is 2026-11-10 (`run 2026-11-10`).

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-8-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
