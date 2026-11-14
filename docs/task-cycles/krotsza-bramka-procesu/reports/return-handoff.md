# Handoff — the return step

You are resumed as the one author of this change, for the return step. It is not one of the rows of
the variants table of `make-change`; your stage is the return step.

## Where and what

- Worktree `the repository root`, branch `task/krotsza-bramka-procesu`,
  head `32629e02` (after the fix of the Minor findings and its review, both `PASS`).
- Read whole: `.the-way/task-cycle/skill/foundation_step.md` and `.the-way/task-cycle/skill/return_step.md`
  (the return step writes as the foundation step writes); and, when you write an entry of an element,
  that element's `SKILL.md` at the path `foundation_step.md` gives.
- The frozen task: `.runs/task-cycles/krotsza-bramka-procesu/task.md`. The change is the commits
  `6b4487d1` (pin move), `cb617b4c`, `4ffd7b04`, `dcc6b3ba`, `32629e02` on top of the base
  `2a8645d4`.
- Your report: `.runs/task-cycles/krotsza-bramka-procesu/reports/return-report.md`. Your directory for
  working copies: `.runs/author/` (the rules for working copies are the ones of your first handoff).

## What the return step compares here

- The foundation entries the change writes or changes (D-405 and D-406), those the task names
  (*Decisions in play*: D-77, D-83, D-49, D-73, D-28; *Settlements to record*: row 1, which D-405
  carries), and those the search of the foundation finds, each against the code as it stands:
  `scripts/test.py`, `tests/quality/test_test_gate.py`, `tests/quality/gate_fixture.py`,
  `scripts/docker_gate.py`, the gate tests; and the part map entries of the touched parts
  (`build-tools`, `product-foundation`, `agent-workflow`).
- The new pin changes what the-way gives the product; ask whether any entry of the foundation or file of
  `guidelines/` still says what the old runner did (for example that the directories run one after
  another by the runner itself, or the opposite). The reviewer found `README.md:76` (fixed); look for
  its likes.
- Environment facts: D-406 rests on a measurement outside the repository (the earlier time of the gate)
  and on the three runs of this cycle, whose logs are in the record, which is not part of the
  repository's tree at the merge. Decide by `return_step.md` and the skill of that element whether a
  fact is to be written; D-362 forbids naming a private note in an entry.

## What you must not do

- Do not write the rule of size of a function and a file in `guidelines/coding.md`: the task's question
  5 gives it to a later task of the game.
- Do not change `scripts/docker_gate.py` or the repair of the isolation of the Docker tests (the task's
  *Out of scope*).
- Do not rewrite D-405 or D-406 for the Minor findings the reviews already listed (they go to the
  request's list); change them only for a mismatch with the code or the foundation that the return step
  itself finds.
- Do NOT run the whole gate (`npm test` without an argument): the orchestrator runs it once, on the
  tree this step leaves. Run the focused checks the step needs, each with its command and exit code.

## Your report

By the rules of `return_step.md` and `change/SKILL.md`: status, commits (or none), the foundation
compared with code, decisions, invariants, environment facts, glossary terms, part-map changes,
projected entries, rows of *Settlements to record* written, every check with its command and exit
code, **Unread material**, **Searches not found or unclear**, your working copies.
