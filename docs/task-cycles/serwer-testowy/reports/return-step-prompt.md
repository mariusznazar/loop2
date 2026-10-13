# Dispatch — return step analysis (serwer-testowy)

You are a fresh agent performing the analysis of the-way's return step (WAY-11) for this task.
You write **no** foundation entry, check or code in this dispatch: you return a list of findings,
each with a recommendation, and the orchestrator decides what gets written and by whom. Questions
go back in your report, never to the human. Never write a server name, SSH port, SSH user or IPv6
address.

Read: WAY-11, WAY-36, WAY-126, WAY-134 in `.the-way/foundations/decisions.md`; the frozen task
`docs/task-cycles/serwer-testowy/task-frozen.md`; the choice log (§ "Questions and autonomous
choices" and § "Live events and decisions") in `docs/task-cycles/serwer-testowy/cycle.md`; the
ledger `.superpowers/sdd/plan/progress.md`; the real diff `git diff 1701186..HEAD` in the worktree
`C:/Storage/repos/loop2-serwer-testowy` (read it, do not copy it); the current `foundations/*.md`;
the projected entries of the task's sources (`C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md`,
§ Projected foundation changes, the entries the plan's row 2 and *Projected entries* table name for
task 2).

Find, each with evidence (`file:line` or choice-log ID):
1. New decisions or rules from the diff and choice log that still bind after the merge (WAY-36) and
   no current or projected entry states.
2. Code behaviour with no invariant over it that matters after the merge — especially the
   deployment script's trust boundary (input accepted from the forced command), the listen
   configuration, the resource gate — and whether an existing decision's verification already
   covers it.
3. Environment facts the change rests on that the foundation does not hold (the spec and skill rest
   on observations of the host, GitHub runners and Cloudflare — say which are facts the foundation
   should hold now, and which wait for the human's observation at human action 5).
4. Words the foundation's binding sentences now use that the glossary does not settle.
5. Part-map changes: files no part claims (run `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base 1701186`),
   failure modes of the touched parts now known (the error table of the spec), dependencies.
6. Compare the foundation with the code in the touched parts: anything an entry says that the code
   does not do, or the reverse.
7. Projected entries of the task's sources the code makes true that the foundation step missed, and
   every row of *Settlements to record* — confirm each has its entry.

For each finding: what, evidence, whether it binds after the merge, the entry kind you recommend
(or "choice-table line only"), and the price of writing vs not writing it. Write the report to
`docs/task-cycles/serwer-testowy/reports/return-step.md`. Return a summary under 200 words.
