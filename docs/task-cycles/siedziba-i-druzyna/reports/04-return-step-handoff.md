# Handoff — return step, task cycle `siedziba-i-druzyna`

You are the change's author, resumed for the return step. Same delegation, worktree
(`C:\Storage\repos\loop2-wt\siedziba-i-druzyna`, branch `task/siedziba-i-druzyna`) and rules as
`reports/01-author-handoff.md`: commit on the branch, never push, questions to the orchestrator in
your report.

## State

- Head: `24bbc2d`. The review of the whole change returned `PASS 24bbc2d5e1126db971e9135991e894fe1024a183`
  (`reports/02-review.md`) with no blocking finding. Its Minor and out-of-scope findings are **not**
  fixed in this cycle: they go to the request's lists for the human. Do not act on them here, and
  the review findings are no foundation entries.
- The cycle's gate on `24bbc2d` ran after the review (`reports/03-gate.log`).

## Stage

- Read whole step 11 of `.the-way/task-cycle/skill/SKILL.md` (the item starting „Take the return
  step”) and the element skills it names, and take it with `the-way-make-change`.
- Compare with the code: the entries the change writes or changes (D-50, D-51, D-52, D-53, D-54,
  D-55, the invariant `character-team`, the glossary term `headquarters`, the part-map line of
  `tests/invariants/test_character_team.py`), those the task names (*Decisions in play*: D-03, D-04,
  D-18, D-21, D-22, D-39, D-44, `content-identifiers`, `simulation-inputs`, `map-run-repeatability`),
  those your search of the foundation found, and the part map of `simulation`, `browser-view`,
  `product-foundation` and `agent-workflow`. Correct in this change whatever no longer matches —
  for example an entry that still speaks of a send panel or of a character held as an archetype in
  the map run, or the glossary terms `map run` and `map run restart` against the run that now names
  a character by id.
- Write, each through its pinned project skill (`the-way-record-environment-fact`,
  `the-way-record-glossary-term`, `the-way-record-decision`, `the-way-update-part-map`): a source
  outside the product the change rests on that the foundation does not hold; a word the change uses
  in a meaning other than the usual one, or a term used against its entry — weigh here the words
  your report raised, „team” and „manual map run”, by the glossary's test „Which words take an
  entry”, and write an entry only where that test holds; a settlement row or projected entry the
  code makes true that the foundation step missed; a choice that binds after the merge (WAY-36) —
  weigh the character's identity by a counter id (task 16's save and task 18's character-by-character
  computation read it) and the map run naming the team's character by id. Write an invariant only for
  a rule the task, a decision or the human sets. Every other choice stays a row of the questions
  table, which the orchestrator keeps from your first report.
- Run `python -B .the-way/elements/common/foundation_check.py` and any check your commits affect.

## Report

Write `C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\reports\04-return-step-report.md`:
what you compared and what no longer matched, each entry written or corrected with one sentence of
its meaning in Polish, the commits, every check with its command and exit code, and reaches. Return
a short message: status, commits (or none), a one-line check result, the report's path.
