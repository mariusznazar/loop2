# Handoff — reviewer of slice 1 and of the foundation entries, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You did not make this change. Your questions go to the orchestrator; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`. Work from its root; the pinned the-way is its `.the-way`. Read-only: no change, no commit, no server.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and follow it. Read a file it names when its step comes.

**What is reviewed.** Slice 1, with the plan's *Foundation entries* as part of its range. Range: base `95de83b98a5083c516b8fffad3237eaa64cad8d5`, head `49bfb74`. `b7dd37d` ends the foundation entries.

**Your selection.**
- Slice 1's handoff, with its section of the plan, its ranges and passages, which is your selection for the code: `docs/task-cycles/kopia-bazy/reports/slice-1-handoff.md`
- For the entries: the plan's *Foundation entries* in `docs/task-cycles/kopia-bazy/plan.md`, and in `docs/task-cycles/kopia-bazy/task-frozen.md` the sections *Questions to settle*, *Decisions in play* and *Settlements to record*; in `docs/task-cycles/kopia-bazy/spec.md` the section *Foundation entries* and decisions 7, 8, 13 and 16; `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`, lines 641–708 and 1929–1969.
- The element templates you need for the entries: `.the-way/elements/`, by the kind.

**Authors' reports.**
- Foundation entries: `docs/task-cycles/kopia-bazy/reports/12-foundation-report.md`
- Slice 1: `docs/task-cycles/kopia-bazy/reports/slice-1-report.md`

**Answers of step 4.**
- Trust boundary: yes — `src/server/**`, `deploy/**`, the new keys, Strych's listing included. Check crafted input at that boundary: here the command's arguments and its environment, and what reaches standard output, standard error and the temporary directory.
- Irreversible operation: yes — replacing older backups on Strych, restoring over the server's database, changing the encryption key. Check that the change only prepares them: no test, entry or instruction has an agent perform one.

**Information from the mechanical check.**
- Clean worktree; slice 1's one commit changed exactly the five files of its *Change*.
- The executor added the part-map line by hand, by the rules of `.the-way/elements/part-map/skill/`, and did not invoke `the-way-update-part-map`.
- The first failing test was not written before the code; the executor shows each test failing by breaking the code four ways.
- The executor's test writer pauses 3 ms between commits, after a writer with no pause starved the command's own open. The orchestrator kept D-112's busy timeout for the backup, as the server's writes are sparse and a failed open is a failed night with a notice.
- The executor added no signal handlers for removing the temporary directory.
- No critique of the entries ran: the writer's method forbids a subagent. You are their first independent reading.
- Foundation report, *Concerns for the orchestrator*, item 1: three matters of the spec stand in no entry. Judge it.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-1-review-report.md`, first line `PASS <sha>` or `FAIL <sha>`, as your method gives.

**Return.** That first line, a one-line check result naming what failed or did not run, and the report's path.
