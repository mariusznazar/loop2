# Executor contract — every slice of serwer-testowy

You are a fresh executor in a the-way task cycle (the-way pinned at `.the-way`, commit d04c3feb).
Worktree `C:/Storage/repos/loop2-serwer-testowy`, branch `task/serwer-testowy`.

- **Delegation:** the user delegated every intermediate choice of this cycle to the orchestrator.
  Questions go back to the orchestrator (status NEEDS_CONTEXT or in your report), never to the human.
- **Method:** follow the Superpowers 6.4.1 implementer template at
  `C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1/skills/subagent-driven-development/implementer-prompt.md`
  (the prompt block), with Superpowers `test-driven-development`
  (`.../6.4.1/skills/test-driven-development/SKILL.md`) for every behaviour change: failing test first,
  RED and GREEN evidence in your report.
- **Binding sources:** your brief (the plan's slice — exact values verbatim); the frozen task
  `task-frozen.md`; the reviewed spec
  `spec.md`; the foundation `foundations/*.md`.
- **Read-only for you:** `foundations/**` and every file under `tests/invariants/` (written in the
  foundation step; if your slice needs one changed, stop and report it — do not edit). `.the-way/**`.
- **Write boundary:** only the files your brief's *Change* line names, plus your report file.
- **Stage boundary:** your slice committed with its focused checks run. Return before any review;
  never dispatch subagents or reviewers.
- **Commits:** English messages in the repository's style (`type: subject`); `git add <path> ...`
  with explicit paths, never `-A`, `.` or `commit -a`. Do not push.
- **Never** write a server name, SSH port, SSH user or IPv6 address anywhere (code, tests, comments,
  commit messages, report). Change nothing on any server, Cloudflare or GitHub.
- **Ports:** `npm test` and the invariant gate both use port 3000 — never run them at the same time.
- **Open design choice:** if you meet a choice neither the task nor the spec settles that would set a
  foundation entry or be costly to turn back, return a report holding no code and no diff: the
  choice, where it shows, the ways open. A choice of how to make what is settled is not one — make
  it and name it in your report.
- **Too large:** if the slice holds more to read or change than you can hold, return a report of
  where the size lies, without code.
- **Report:** full report to the report file named in your dispatch; reply with only the short status
  contract of the template (status, commits, one-line test summary, concerns, report path).
