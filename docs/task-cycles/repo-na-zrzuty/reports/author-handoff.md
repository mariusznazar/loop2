# Handoff — the one author of the change

Delegation: the person who requested this cycle delegated the intermediate choices to the orchestrator; the orchestrator's go-aheads are provisional and are never the human's approval.

Worktree (work only here, from its root): `the repository's root`, branch `task/repo-na-zrzuty`, base `a4015546163f24f82f4694830fcad457efa1caf2`. The pinned the-way is `.the-way` of that worktree (commit `e3825a82386a61930a86f8517fc0c5f422fc2833`, matches the gitlink).

Stage and variant: `make-change`, "the whole change as the one author". Read the method whole: `.the-way/task-cycle/change/SKILL.md`; read a file it names only when the step or variant that names it comes. It includes the foundation step (`.the-way/task-cycle/skill/foundation_step.md`, read whole when you write entries) and ends before review: the orchestrator runs the product's gate, the reviews and the return step.

Frozen task (read whole): `.runs/task-cycles/repo-na-zrzuty/task.md`. No spec and no plan: the task leaves no open design choice. Answers of the start: trust boundary — no; irreversible operation — no. Nothing is pushed and no repository is created by this change.

Report path: `.runs/task-cycles/repo-na-zrzuty/reports/author-report.md` (full report there; return only the status, your commits, a one-line check result naming what failed or did not run, and that path; the report holds **Unread material**, **Searches not found or unclear** and the own-work check, as the method gives).

## What to read

- Foundation entries, each whole: the decisions D-12, D-13, D-254, D-255, D-347 and the decisions the task names (D-254 is the one row 3 of the settlements narrows); the decisions of the-way `WAY-316`, `WAY-317`, `WAY-318`, `WAY-319`, `WAY-219` in the-way's `foundations/` at the pin (`.the-way/foundations/decisions.md`); the part map `foundations/part_map.md` (parts agent-workflow and product-foundation); the invariants whose *Part* names agent-workflow, product-foundation or `every`, and those the entries you write link to; the glossary entries of the terms you use, in the product's glossary and the-way's.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/testing.md` (both apply to agent-workflow).
- The element skills, when you write an entry: `.claude/skills/the-way-record-decision/SKILL.md`, `.claude/skills/the-way-record-environment-fact/SKILL.md`, and `.claude/skills/the-way-record-glossary-term/SKILL.md`, `.claude/skills/the-way-record-invariant/SKILL.md`, `.claude/skills/the-way-update-part-map/SKILL.md` where the entries you write call for them — each project skill routes to its method in `.the-way`; foundation entries are written only through these skills.
- Reading also the files the skill and test name: `.claude/skills/loop2-play/SKILL.md` (its twin `.agents/skills/loop2-play/SKILL.md`), `tests/agent_workflow/test_loop2_play_skill.py`, and how the-way's request description holds screenshots (`.the-way/task-cycle/change/ui_check.md`, `.the-way/task-cycle/skill/request_template.md`, the section on screenshots) so that the skill's text fits the request the cycle writes.

## The task, its parts for you

All of the task's *To do* items and rows 1–5 of its *Settlements to record*, as the frozen task gives them, word for word. In short:

1. Foundation: the place of screenshots (row 1 → a decision), the agent's own push to `mariusznazar/screenshots` with the human's `gh` account (row 2 → a decision), the narrowing of the fallback way through Playwright MCP to a session started in the cycle's worktree (row 3 → a decision or a change to D-254, as the record-decision method gives for a decision narrowed by a later one), the two environment facts (rows 4 and 5), each through its element skill. Sources and wording come from the task and its *Questions to settle*; where a source is a private note, write the fact as its element skill allows and cite no path of a private note.
2. The skill `loop2-play`, both copies byte-identical (`.claude/skills/loop2-play/` and `.agents/skills/loop2-play/`): replace the sentence "Nothing of it stays in the repository: …" with what To do 2 says; add to the Playwright MCP part what To do 3 says; keep the description line short and YAML-safe (the test checks it). The text tells an agent what to do — where the screenshot goes, how it reaches the description — and nothing in it holds an access value or a real account's data; screenshots show only the made-up accounts of the local start (D-13).
3. The part map and the glossary only where an entry you write calls for it. The task carries no invariant.

The text of the skill stays in the English the skill is written in; foundation entries stay in the language of their file; a commit message is in English.

## Out of scope

Removal of the screenshots already in loop2's history; any push to `mariusznazar/screenshots`; any change to the-way.

## Checks already failing on the base

None once the quality venv stands (`.runs/quality-venv` is made in the worktree, as README.md gives; `npm test` fails `tests/quality` ruff and shellcheck without it). `python -B .the-way/elements/common/foundation_check.py` gives `0 errors` on the base; `npm test` does not run it.
