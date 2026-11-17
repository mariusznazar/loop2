# Handoff — the designer of the spec

You are the designer (`write-spec`, variant: write the spec) of a task cycle of the-way, dispatched by the orchestrator of `implement-task`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send questions back to the orchestrator in your report (status `questions`).
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`, base `0b23580bb4f643dfb52c66a7d6a27b1b8d60a5b1`. Pinned the-way: `.the-way` in the worktree at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `.the-way/task-cycle/spec/SKILL.md`, then `design.md` beside it as its section 2 says. Read each whole; read another file it names only when its step comes. You have no skill tool.
- Stage and boundary: you write the spec `spec.md` and your report, and return before any plan or code. You write no code, test or foundation entry and change no tracked file.
- Spec path: `.runs/task-cycles/luki-w-testach-z-przegladu/spec.md`. Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/designer-report.md`. Your directory for working copies: `.runs/designer/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return — a worktree with `git worktree remove --force`, then `git worktree prune` — and state in the report where each copy stood and that it was removed.)

## The open choice

The task has 17 items; the planner found an open design choice in item 16 alone and returned without a plan. Its report is `.runs/task-cycles/luki-w-testach-z-przegladu/reports/planner-report.md` — read it whole; treat its facts as material and verify any mechanism it states in the code (a report's causal story is a hypothesis).

Item 16 of the frozen task `.runs/task-cycles/luki-w-testach-z-przegladu/task.md` (read the whole task; the spec settles a choice of the whole change, but only this choice is open):

> Reguły lintera JavaScript (D-29) obejmują skrypt hooka startu sesji w `.claude/hooks/` i starsze skrypty skilla grania — dziś nie sprawdza ich żadna reguła, a hook biegnie u każdego przy starcie sesji (loop2#136, „Fix or let through" 2, Minor 2; dopisane przez doradcę dnia 2026-11-16).

(English: the JavaScript lint rules of D-29 are to cover the session-start hook script in `.claude/hooks/` and the older scripts of the play skill; today no rule checks them.)

The choice: D-29 limits ESLint to five parts and its *Rejected* names "the whole repository — the scripts of the play skill would need fixes in two copies, an exception, or a change of the shape of one of them and a check of the skill in a real browser, a risk and work with no gain for the game". The hook and the play-skill scripts belong to the part `agent-workflow`. The task requires them covered, so the spec must settle **how** the requirement is met in the foundation and in the code, and what the task's requirement does and does not reach. The planner's ways were: (a) put the whole part `agent-workflow` into D-29's scope; (b) name the hook and the play-skill scripts in both copies (`.claude/` and `.agents/`) as files in D-29's scope; (c) the hook alone; (d) no change. The task's wording excludes (d) and (c) narrows it; do not widen the task beyond its item 16 and its wording ("the hook script … and the older scripts of the play skill"). You may find ways the planner did not list (for example a scope by file pattern rather than by part, how D-32 on formatting and `tests/quality/test_source_tool_scope.py` and `tests/quality/test_quality_invariants.py` follow, how the lint error the planner saw at `compose-state.mjs` is repaired in both copies, and whether the check of a skill in a real browser that D-29's *Rejected* feared is needed after such a repair — verify against the code rather than assume).

Settle at least: (1) the exact scope of files; (2) which decisions change (D-29, D-32, others) and the sentence each gets, named as the change to write — the spec names entries and never words them; (3) which invariant or test keeps the scope (`eslint-source-rules` and `tests/quality/test_source_tool_scope.py` and what changes in them); (4) what must be repaired in the covered files for the check to pass, and how it is shown that the play skill still works; (5) the cost if the choice proves wrong and how it is turned back; (6) which guideline files change (`guidelines/coding.md`'s *Linter* rule).

Constraints that bind your answers: the choice must be the smallest reversible reading that fulfils the task; the human accepts a change of a decision at the merge of the request, where the description puts it before them, so a change of D-29's *Rejected* is allowed but must be named as such; the rules set of ESLint itself (@eslint/js recommended, typescript-eslint) does not change; no new dependency.

## What to read

Whole: the frozen task; `.the-way/task-cycle/spec/SKILL.md`; `.the-way/task-cycle/spec/design.md`; `AGENTS.md` and `guidelines/coding.md` of the worktree; `foundations/part_map.md`; the entries `### D-29`, `### D-32`, `### D-06` of `foundations/decisions.md` (find by heading; also any decision whose binding sentence the *Verification* of D-29 names), and the invariants `eslint-source-rules` and `prettier-source-format` or the invariant D-32 names (search `foundations/invariants.md` by identifier; each whole); the entry of `agent-workflow` in the part map and any decision whose *Scope* names `agent-workflow` and mentions the play skill (search `foundations/decisions.md` for `loop2-play` and read each hit whole); `eslint.config.mjs`; `tests/quality/test_source_tool_scope.py` and `tests/quality/test_quality_invariants.py` (the parts about ESLint); `.claude/hooks/` (list and read the session-start hook); `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/` (the scripts and `SKILL.md`).

## Return

As section 4 of your method says: the status (`questions`, `done` or `reserved`), the spec path and the report path. The report ends with **Unread material:** and **Searches not found or unclear:** (each `none` where so), names every reach beyond this handoff and each working copy.
