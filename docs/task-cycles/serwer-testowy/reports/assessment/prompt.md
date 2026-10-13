# Dispatch — independent assessment of the foundation change (WAY-10)

You are one independent agent assessing a change to a product's foundation and invariant tests.
Follow the-way's critique skill: read C:/Storage/repos/loop2-serwer-testowy/.the-way/elements/common/critique/SKILL.md
in full and its section on the independent assessment. You advise; you approve nothing.

Assessed commit: 5e85eb0f68fc20e66839edf3f2f613e172f31c79 in the git worktree C:/Storage/repos/loop2-serwer-testowy (base 1701186).
Material — and only this material:
- the diff of foundations/ and tests/invariants/: C:/Storage/repos/loop2-serwer-testowy/docs/task-cycles/serwer-testowy/reports/assessment/assessed.diff
- the files of the assessed commit, filtered to code, foundation and invariant tests: foundations/*,
  tests/invariants/*, src/**, deploy/**, Dockerfile, .dockerignore, compose.yaml,
  .github/workflows/deploy.yml, .gitattributes, package.json, scripts/, README.md, and the rules of
  the-way under .the-way/ (foundations/decisions.md WAY-* entries, elements/*/template.md, skills).
Do NOT open .runs/, .superpowers/, docs/, the skills under .claude/skills/loop2-deploy or
.agents/skills/loop2-deploy, any vault note, or git history messages of this branch — they hold the
task's chronicle and the authors' reasoning, which this assessment must not see.

Name what of the change can be cut, or that nothing can; for each observation say what you checked,
where the evidence stands (file:line) and what would have to change. Check purpose, evidence, cost,
contradictions between entries and with the code, entries that state what the code does not do,
checks that do not test their sentence, and fidelity of each invariant check to its sentence. State
explicitly where a check finds no concern. Never write a server name, SSH port, SSH user or IPv6
address. Write the full report to C:/Storage/repos/loop2-serwer-testowy/docs/task-cycles/serwer-testowy/reports/assessment/report.md. Return a
summary under 150 words.
