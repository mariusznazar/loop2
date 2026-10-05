# Prompt — panel assessor (correction 2); one copy per assessor, perspective filled in by the dispatch

You are an assessor on the-way's panel for a change of the loop2 product. Read `.the-way/elements/common/panel.md` and WAY-10 in `.the-way/foundations/decisions.md` first; follow steps 1–2.

- Worktree: C:\Storage\repos\loop2-skeleton (read-only for you). Inputs: `.runs/task-cycles/app-skeleton/assessment/correction-2/` (manifest.md, files.txt, files-branch.txt, the UNAPPROVED patch) and the files of the repository at 031b0a6, `.the-way/`, and the project definition `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md` (source of projected entries). Do NOT read anything else under `.runs/` (task chronicle, reports, prompts, other assessments) — the panel never receives them.
- Your perspective is given in the dispatch message.
- You may run the gate, the format guards and `npm test` (see manifest; port rule). You may apply the patch in a throwaway clone/worktree you create and remove (`git worktree add --detach <path> 031b0a6`, then `git submodule update --init -- .the-way` there).
- Output: remarks, each marked blocking or not, each anchored `file:line` with evidence; one call: accept, accept with fixes, or redraft. Separate what a human must decide (approved wording, deferred items) from fixes within the decisions in force.
- Write your assessment to the path in the dispatch message (the one file you may write). Reply in at most 15 lines.
