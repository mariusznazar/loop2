# Handoff — the return step of the task rana-i-opatrunek

You take the return step (step 11 of the cycle), as a fresh agent of the type `the-way-stage` with `make-change` (the stage is none of the rows of its table: you are the agent of the return step). The change is finished and reviewed; you compare the foundation with the code and correct what no longer matches, in the same change.

- Read whole: `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md` (the return step writes as the foundation step writes), `.the-way/task-cycle/change/SKILL.md` sections 3 and 6 (checks and report); and, when you write an entry of an element, that element's `SKILL.md` by the path `foundation_step.md` gives (`.the-way/elements/decisions/skill/SKILL.md` for a decision, `elements/glossary/skill/SKILL.md` for a glossary term, `elements/part-map/skill/SKILL.md` for the part map, `elements/invariants/skill/SKILL.md`, `elements/environment-facts/skill/SKILL.md`).
- Worktree `the worktree's root` (branch `task/rana-i-opatrunek`), head `55c7d624dfde1e919febe5a1953e0c6dd78f66ad`; the range of the change is `be4e9c09f3c45f421d04983948a88bd6240809bf..55c7d624` (compute the diff yourself, with `git log` and `git diff --stat`). The frozen task `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` (sha256 `55c86eaf63df7156`, read whole). Your directory for working copies: `.runs/return-step/`. Report: `.runs/task-cycles/rana-i-opatrunek/reports/return-step-report.md`. The cycle record and the other files of the record directory are not yours, except those this handoff names.
- Commit by path, in English, no push; run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after every entry (exit 0) and at the end `python -B .the-way/elements/common/foundation_check.py` **without** the switch (exit 0), and `python -B .the-way/instruction-files/check_instructions.py`. Never run the whole suite.

## What you compare

1. The entries the change wrote or changed (the foundation step, commits `9c89f880`, `6d07bf20`): D-379, D-144, D-150, D-145, D-387, D-290, D-199, D-363, D-380, D-120 — each against the code as it now stands (the code changed after they were written: the fixes of slices 4 and of the whole-change review, a different form of the health in the paragraph, a stricter reader of a saved fight).
2. The entries the task names unchanged (*Decisions in play*, the part „Obecne decyzje, których zadanie dotyka”: D-140, D-126, D-192, D-443, D-191, D-193, D-195, D-196, D-197, D-289, D-293, D-309, D-146, D-60, D-374, D-136, D-24, D-428, D-429, D-427, D-206 and the invariants `instrument-game-agreement`, `program-closed-lists`, `action-duration-minimum`, `save-version`).
3. Your own search by the names and words the code adds: `pressure`, „Ucisk”, `tending`, „Opatrywanie małych ran”, `strongerRoll`, `deftHand`, `quickHealing`, `healing`, `healthRegain`, `grownBy`, `healsInCombat`, `forestBandages`; the part map of the touched parts (`simulation`, `browser-view`, `balance-tools`, `agent-workflow`: do the new files stand under its globs; the foundation check claims every tracked file).
4. Findings given to you by the whole-change review, which only the return step can carry: **m-7** — the *Verification* of the entries the change wrote still says „which no test holds yet” for the parts that `tests/sim/pressure.test.mjs`, `tests/sim/tending.test.mjs`, `tests/sim/skills.test.mjs`, `tests/sim/body.test.mjs`, `tests/sim/craft-and-tend.test.mjs`, `tests/view/character-skills.test.mjs`, `tests/view/pressure-pick.test.mjs`, `tests/view/combat-line.test.mjs` hold now: where a decision carries a pair of examples and a test holds part of its sentence, remove that part from the pair and name the test by the clause `tests:` of its *Verification*, leaving a pair only for a part no test holds (the rule of `return_step.md`). The decisions are D-144, D-145, D-150, D-199, D-363, D-387, D-379. Also the stale count in D-416's *Rejected* (about 22 rows at eight trees and fourteen branches), which D-199's copy of the same arithmetic had corrected to nine trees and eighteen branches (about 27 rows): correct it the same way.
5. Choices that bind after the merge (WAY-36) — the orchestrator's choices, which went into the code and are not yet in the foundation; for each, decide whether it is a choice that binds (write it as a decision or into the entry it belongs to, as the decisions template's questions give) or stays a row of the cycle's questions table (then no entry), and say which and why:
   - the words of the pocket's refill „bierze opatrunek z plecaka do kieszeni” (the paragraph „Mag bierze …”, the chronicle „Bierze …”, no actor) — D-340 covers a refill of a slot generally and was not changed;
   - the status of Ucisk „Uciska ranę” and the element of the paragraph of an encounter „Mag uciska ranę: zdrowie {h}/{pełne}”, where {h} is the mage's health after the turn **as a whole number, cut down as the body row cuts it** (the whole-change review's finding I-1: a raw 71.1 was shown before) — D-147 says what the paragraph gives;
   - the units of the previews of the three numerical branches („zdrowia”, „min”, „zdrowia na minutę”) and the decimal comma;
   - the strike „Uderz — patyk” keeps its data row and its slot is still the main hand; only an action whose data name a place (Ucisk: the pocket) reads it; the form of the effect `{ heals: "target"; place: "pocket" }`;
   - a refill of an empty pocket for Ucisk only into an empty pocket the item fits (the review of slice 4, I-2: D-456, D-457);
   - the reader of a saved game refuses a combat record whose turn carries out an action of a branch the run's character has not bought (the whole-change review's m-3, a stricter reader at the trust boundary; `guidelines/coding-saved-game.md` has no sentence against it; the version is 12, raised by Slice 6 because an old save would never get the tree);
   - the limitation: `actionInRepertoire` does not judge an item action by its pair (the repertoire is the Understanding and holds no predispositions); with one archetype and the bandage as the only target of `craft`, `tend` and `pressure` the result agrees with D-120; it becomes a gap with a second recipe item or archetype (the whole-change review m-1, Minor, kept).
   The task's *Settlements to record* rows 1–10 are written already (rows 5 and 10 by the code of their slices); check each against the code and say so in the report's list of rows.
6. The glossary: a word the change uses in a meaning for which `WAY-95` gives it an entry, or a term used against its entry (for example `wall` — the foundation's entry stands at the old wording; the task says task 3 writes the new one, so leave it — and `gear`, `combat turn`); the glossary is `foundations/glossary.md` (11 KB, read whole).

## What you must not do

No entry is deferred and none is proposed for later; the review findings of the request are no foundation entries. An invariant is written only for a rule the task, a decision or the human sets. Do not change code except where a comparison shows a *comment or a test's citation* that no longer matches (name it); a finding that the code is wrong goes in your report as a question for the orchestrator, with the evidence.

## The report

As the record's *Return step* gives it: the foundation compared with the code (what no longer matched and its correction, or none), decisions written or changed (identifiers), invariants, environment facts, glossary terms, part-map changes, projected entries, the rows of *Settlements to record* written (row number and identifier, or the place for a row that goes to code), and for each choice of item 5 its place or why it stays a row. Each check as command and exit code. **Unread material** and **Searches not found or unclear** (`none` where none). Working copies.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

