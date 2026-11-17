# Handoff — executor of slice 15: the JavaScript lint rules reach the session-start hook and the play skill's scripts

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `dbba14992ad04ea0cb6d8efff95c7590020336f0`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Citations: where you add or change an `// invariant: <id>` or `// decision: D-NN "..."` comment, run `python -B .the-way/elements/common/foundation_check.py` before you commit and put its command and exit code in the report; a quotation after `decision:` must be a passage that begins a sentence of the decision's text, word for word (an earlier slice failed that check, unnoticed until the orchestrator ran it). Where the check reports an error that your change did not cause, name it and the file and line.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-15-report.md`. Your directory for working copies: `.runs/executor-15/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 15 — the JavaScript lint rules reach the session-start hook and the play skill's scripts

- **Goal:** as the spec settles it, in commits holding nothing but To do 16: the ESLint case of
  `tests/quality/test_source_tool_scope.py` checks a list of its own — the files of the five parts and
  every script file under `.claude/hooks/`, `.claude/skills/loop2-play/` and `.agents/skills/loop2-play/`,
  the three written as plain path prefixes — and fails when one of the three yields no script file;
  it is seen red first on the configuration as it stands, naming the seven files. Then
  `eslint.config.mjs` gives those directories' script files `recommended` and the globals of Node.js,
  joining neither the TypeScript patterns nor the programs; the ESLint case of
  `tests/quality/test_quality_invariants.py` is seen red on the two `POINTS` reports; `POINTS` is
  removed from both copies of `compose-state.mjs`, which stay byte for byte the same, with no change
  of what the script prints. `eslint-source-rules` names the three directories and gains agent-workflow
  in *Part*, through `the-way-record-invariant`; the paragraph on the patterns under *Linter* in
  `guidelines/coding.md` says the new scope, in the form of the pinned template. The Prettier and LF
  cases, `PRETTIER_PATTERNS`, `.gitattributes`, the hook, `frames.js` and `save-frames.mjs` stay as
  they are. D-29 is the row of *Foundation entries*.
- **Change:** `eslint.config.mjs` · `tests/quality/test_source_tool_scope.py` ·
  `.claude/skills/loop2-play/compose-state.mjs` · `.agents/skills/loop2-play/compose-state.mjs` ·
  `foundations/invariants.md` · `guidelines/coding.md`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:48-48` To do 16 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/spec.md` · `foundations/decisions.md:446-460` D-29 (as
  the row of *Foundation entries* changes it) · `foundations/decisions.md:491-505` D-32 ·
  `foundations/decisions.md:431-445` D-28 · `foundations/decisions.md:948-962` D-83 ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447`
  prettier-source-format · `tests/quality/eslint-rule-sets.mjs` · `tests/quality/test_quality_invariants.py` ·
  `tests/invariants/loop2_invariant_support.py:1-117` the listing of files and their parts ·
  `.claude/skills/loop2-play/SKILL.md` · `.claude/skills/loop2-play/frames.js` ·
  `.claude/skills/loop2-play/save-frames.mjs` · `.claude/hooks/the-way-pin-check.mjs` ·
  `tests/agent_workflow/test_loop2_play_skill.py` · `foundations/part_map.md:90-143` build-tools,
  agent-workflow · `.the-way/elements/invariants/skill/SKILL.md` ·
  `.the-way/product-guidelines/coding/template.md` · `.the-way/product-guidelines/coding/SKILL.md` ·
  `.the-way/task-cycle/skill/foundation_step.md` · `guidelines/testing.md`
- **Model:** same — the spec settles every choice, but the slice writes an invariant through its
  skill, changes a test of the scope of a trust-boundary-adjacent tool configuration and a guideline
  paragraph (orchestrator's change of the planner's `cheaper`).
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/quality/test_source_tool_scope.py` (red first, naming the seven
  files; green after the configuration) · `npm.cmd test -- tests/quality/test_quality_invariants.py`
  (red on the two `POINTS` reports; green after the removal) · `npm.cmd run build`, then
  `node .claude/skills/loop2-play/compose-state.mjs` and `node .agents/skills/loop2-play/compose-state.mjs`
  each end with code 0 and print one document that `loadSavedGame` of `dist/browser/sim/saved-game.js`
  loads without refusal · `cmp .claude/skills/loop2-play/compose-state.mjs .agents/skills/loop2-play/compose-state.mjs` ·
  `npm.cmd test -- tests/agent_workflow/test_loop2_play_skill.py` ·
  `python -B .the-way/elements/common/foundation_check.py` ·
  `python -B .the-way/instruction-files/check_instructions.py`
- **Depends on:** Foundation entries (D-29) · Slice 2 (`foundations/invariants.md`)

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:48-48 — To do 16

16. Reguły lintera JavaScript (D-29) obejmują skrypt hooka startu sesji w `.claude/hooks/` i starsze skrypty skilla grania — dziś nie sprawdza ich żadna reguła, a hook biegnie u każdego przy starcie sesji (loop2#136, „Fix or let through” 2, Minor 2; dopisane przez doradcę dnia 2026-11-16).

### .runs/task-cycles/luki-w-testach-z-przegladu/spec.md — whole file is named; read it from the path (a spec).


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/decisions.md:446-460` D-29 (as   the row of *Foundation entries* changes it) -> current: `foundations/decisions.md:446-459` D-29
- plan: `foundations/decisions.md:491-505` D-32 -> current: `foundations/decisions.md:491-504` D-32
- plan: `foundations/decisions.md:431-445` D-28 -> current: `foundations/decisions.md:431-444` D-28
- plan: `foundations/decisions.md:948-962` D-83 -> current: `foundations/decisions.md:948-961` D-83
- plan: `foundations/invariants.md:408-417` eslint-source-rules -> current: `foundations/invariants.md:408-416` eslint-source-rules
- plan: `foundations/invariants.md:438-447` prettier-source-format -> current: `foundations/invariants.md:438-446` prettier-source-format
- `tests/quality/eslint-rule-sets.mjs`
- `tests/quality/test_quality_invariants.py`
- `tests/invariants/loop2_invariant_support.py:1-117` the listing of files and their parts
- `.claude/skills/loop2-play/SKILL.md`
- `.claude/skills/loop2-play/frames.js`
- `.claude/skills/loop2-play/save-frames.mjs`
- `.claude/hooks/the-way-pin-check.mjs`
- `tests/agent_workflow/test_loop2_play_skill.py`
- plan: `foundations/part_map.md:90-143` build-tools,   agent-workflow -> current: `foundations/part_map.md:90-124` build-tools; `foundations/part_map.md:126-143` agent-workflow
- `.the-way/elements/invariants/skill/SKILL.md`
- `.the-way/product-guidelines/coding/template.md`
- `.the-way/product-guidelines/coding/SKILL.md`
- `.the-way/task-cycle/skill/foundation_step.md`
- `guidelines/testing.md`
- added by the orchestrator, written by the foundation step: `foundations/decisions.md:446-459` D-29

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
