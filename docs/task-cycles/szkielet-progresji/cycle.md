# Cycle record — loop2: szkielet progresji — tabela stopni, map z nową regułą i ścian drabiny oraz pojęcie ściany w słowniku gry

- Task source: the task's note in the author's backlog — accepted by the human 2026-11-20 through the day advisor ("1: a"), the document then having sha256 8f8ebf23bd010334 (plan log); the vault commit 0ac0030f holds the version `Status: waiting for human`; the frozen copy has sha256 20a5d28ebc8c6029 (see the reconciliation in Questions, Q1)
- Task relation: plan item: plan_projektu_2_loop2.md — szkielet-progresji
- Product repository: https://github.com/mariusznazar/loop2.git
- Process pin: `19e5774aed6d1d628042e23deccc110ed9f112c0`
- Target branch and base: main, `fec2ae7ed5b374a43a44803a296c4deb507696e4`
- Task branch: task/szkielet-progresji
- Status: request open

## Two questions at start

- Trust boundary: no — the only file of the change is `foundations/glossary.md`, part `product-foundation`, whose trust boundary the part map gives as `none`.
- Irreversible operation: no — the change adds one entry to a text file.

The cycle prepares an irreversible operation and never performs it; preparing the code for it does
not authorize running it.

## Spec and execution route

- Open design choice at start: none — the task's *To do* gives the entry, its place (after `## overlay`), its sentence and its `Not` line; *Settlements to record* is `none`; the `wall` entry is a projected entry that the task carries and that settles itself.
- Reserved choice: none
- Execution route and reason: one author without a plan — one entry of one file; no slice-size script run.
- Author: `the-way-author`, class `cheaper` (the orchestrator is Sonnet 5.5; the cheaper model of the session's family is Haiku 5.5, requested as `haiku`), for its entry, the foundation step and the return step; no reason for another class.
- Plan: none on the one-author route
- Discarded attempt: none
- Slices returned too large: none
- Agent waiting: Claude Code; background agents report by completion notification; no limit reached.
- Whole-change review: reviewer `the-way-stage`, `opus` (Opus 5.5), by `review-change`; range `fec2ae7e..216b8bf9`; first line `PASS 216b8bf92c2a3784acadd6ba66cb3c88d39184b2`, `reports/review-whole-report.md`; changed file `foundations/glossary.md` +6 -0; every task item met (the entry after `## overlay`, the projected sentence character for character, `- **Not:** none`, no Meaning (pl) line); *Settlements to record* none; D-362 holds; no spec, no plan, no slices, so no finding comes from a slice; 0 Critical, 0 Important, 1 Minor within the task, 2 declined as outside the task
- Review rounds:
  - findings `reports/fix-findings.md`, contradiction no: the whole-change review `PASS` listed one Minor finding within the task (`foundations/glossary.md:304`, the definition has no main verb, and its list reads items and spells as kinds of idea of a program); the one fix was dispatched to the author (`reports/author-fix-handoff.md`); the author made no commit and answered with the task's passage that mandates the wording (`reports/author-fix-report.md`, `done with concerns`); no fix range, so no review of a fix; the finding stands in the request as an unfixed Minor finding for the human's choice
- Weakest-point checks: author: the requirement that the sentence is the projected one word for word — read the committed entry against the projected text, found its own first draft ("A wall is a map that ...") departing from it and restored the projected sentence before the commit (`reports/author-report.md`, own-work check); reviewer: the same sentence compared character for character with the task, and the word `wall` searched in the tracked files for the *Not* line (`reports/review-whole-report.md`)

## Slices

| Slice | Base | Class, executor and model | Risk | Head | Mechanical check and retry | Review, fix and review of the fix |
|---|---|---|---|---|---|---|

One-author route: no slices.

## Events

| Time | Stage | Actor and model | Handoff, skill and inputs | Output or full report | Short result and next step |
|---|---|---|---|---|---|
| 2026-11-20 | start | orchestrator, Sonnet 5.5 | `implement-task` at pin `19e5774a`; task document read whole; plan row 1 read: `Depends on` `—`, definition fingerprint `e69a87d6`, definition `Status: approved 2026-11-20` | — | plan member checks hold (no dependency; approval stands); the user's standing instructions for this cycle: before EVERY full test gate write that to the day advisor and wait for its `start` signal; start reviewers on the strongest class with `model: opus` |
| 2026-11-20 | step 4 housekeeping | orchestrator | `git fetch`; remote `main` is at `fec2ae7e` (PR #164 merged); local `main` was 12 commits behind | worktree `.runs/worktrees/szkielet-progresji` on `task/szkielet-progresji` created `--no-track` from `origin/main` | `.the-way` initialised in the worktree at `19e5774a` = gitlink |
| 2026-11-20 | step 4 base | orchestrator | base `fec2ae7e` is a merge commit; `git rev-parse <base>^{tree}` and `<base>^2^{tree}` both print `0d8cb1f7b0c876d58a12695010fa788b94d6be13`; no gate on the base | list taken from the cycle record of the merged branch, `docs/task-cycles/wzorzec-kodu-przyrzadu/cycle.md` in `74546bb7`: *Verification* gives CI `tests` as passed, so the list is empty | recorded in Verification |
| 2026-11-20 | step 4 worktree removal | orchestrator | `python -B .the-way/task-cycle/remove_merged_worktrees.py --apply --target main` | exit 0; removed `.runs/worktrees/wzorzec-kodu-przyrzadu`; "Directories of cycles that stay for a human decision": none | go on |
| 2026-11-20 | author dispatch | `the-way-author`, class `cheaper`, model `haiku` | `make-change`, "the whole change as the one author"; handoff `reports/author-handoff.md` | report `reports/author-report.md` | done: commit `216b8bf9`, `foundations/glossary.md` +6; checks `foundation_check.py` exit 0, `check_instructions.py` exit 0, `git diff --check` exit 0; report has Unread material, Searches (none unresolved) and own-work check; mechanical check: worktree clean, range non-empty, `.runs/author/` removed; the author's unread items concern two entries of the-way's own glossary and `part_map.md`, bearing on nothing it judged (the form follows neighbouring entries of this glossary) |
| 2026-11-20 | whole-change review dispatch | `the-way-stage`, strongest class, `model: opus` (the user's standing instruction) | `review-change`, whole change `fec2ae7e..216b8bf9`; handoff `reports/review-whole-handoff.md` | report `reports/review-whole-report.md` | dispatched in the background |
| 2026-11-20 | whole-change review result | reviewer, opus | `reports/review-whole-report.md` | `PASS 216b8bf9`; 0 Critical, 0 Important, 1 Minor within the task, 2 declined (out of scope); `foundations/glossary.md` 300 -> 306 | Minor finding 1 goes to one fix (step 9, WAY-161) |
| 2026-11-20 | fix dispatch | author resumed, `the-way-author`, haiku | `make-change` fix; handoff `reports/author-fix-handoff.md`, findings `reports/fix-findings.md` (the handoff carries the task passage that mandates the wording, as evidence for a contested finding) | report `reports/author-fix-report.md` | dispatched |
| 2026-11-20 | fix result | author, haiku | `reports/author-fix-report.md` | `done with concerns`, no commit, head stays `216b8bf9`; the author answered Minor finding 1 with the evidence of the task (the projected sentence is mandated word for word; the verb form would change the sentence's first word and its approval) and left the choice to the human; `foundation_check.py` exit 0, `git diff --check` exit 0 | no change to review, so no review of a fix; the finding goes unfixed to the request's list of Minor findings, with the reviewer's words and place `foundations/glossary.md:304`, and the human's choice named in *For you to decide* |
| 2026-11-20 | correction of a path | orchestrator | the fix report's Searches item says `reports/fix-findings.md` was not found and a copy sat at `.runs/task-cycles/szkielet-progresji/fix-findings.md`; `ls` shows the file only in `reports/` | — | the author's statement of the path is wrong, the content it read was the same; recorded, nothing else changes |
| 2026-11-20 | signal | day advisor (cross-session message) | the user's standing instruction: write before every full gate and wait for the advisor's `start` | message: `start` for the full gate, covering the opening of the request and the pushes of this round; a new signal is asked for after a round of corrections | the branch pushed and the draft request opened (https://github.com/mariusznazar/loop2/pull/165); CI starts on it |
| 2026-11-20 | return step dispatch | author resumed, `the-way-author`, haiku | `make-change` return step; handoff `reports/author-return-handoff.md` | report `reports/author-return-report.md` | dispatched |
| 2026-11-20 | return step result | author, haiku | `reports/author-return-report.md` | `done`, no commit, head stays `216b8bf9`; `foundation_check.py` exit 0, `check_instructions.py` exit 0, `git diff --check` exit 0; nothing to correct, so no review of the return step | go to the request |
| 2026-11-20 | step 12 | orchestrator | `git fetch`: remote `main` has no commit beyond the base, so no merge and no renumbering of decisions; `cycle_stages.py`, `cycle_measures.py`, `remarks_check.py`, `review_reminder.py` (`reminder: no`), `request_check.py`, `private_paths_check.py` | `stages.md`, `mechanism_measures.md`, `request.md` | request opened as a draft |

## Questions and autonomous choices

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|
| Q1 | The plan log gives sha256 8f8ebf23bd010334 for the accepted document; the document read now has 20a5d28ebc8c6029. Did a source change since acceptance? | The vault history shows the document differing from its last commit (`0ac0030f`) in two lines only: `Status: waiting for human` → `Status: ready for cycle`, and *To do* item 1 made exact (place after `## overlay`, only the definition sentence, `- **Not:** none`, "Meaning (pl)" not copied). The second is the day advisor's clarification of the entry the task already required; nothing the human decided changes. The cycle works from the current document. | `git diff HEAD` of the vault file; vault commits `0ac0030f`, `a979ef44` | Stop and ask the human to re-accept | the entry would be written from a document the human did not see in this exact wording; low, since the clarification only narrows the form of the entry | author |
| Q2 | Which guidelines does the change read? | None: `product-foundation` is in the *Applies to* list of no coding guideline (`guidelines/coding.md` names browser-view, simulation, account-server, build-tools, balance-tools, deployment, agent-workflow, test-helpers); the change writes no code and no test; the styleguide's part is `browser-view` | `guidelines/coding.md` header; `foundations/part_map.md` | read `coding.md` anyway | none | author |
| Q3 | Which decisions does the author read? | D-362 (named by the task's *Decisions in play* and the only decision whose *Scope* names `product-foundation`) | `.runs/orchestrator/index.md`: 1 decision in full, none by heading | — | a decision about the glossary the index did not show | author |

## Artifacts

| Kind | Path or commit | Author or agent | Review result |
|---|---|---|---|
| Frozen task | `.runs/task-cycles/szkielet-progresji/task.md` (copy of the vault document, sha256 20a5d28ebc8c6029, 2026-11-20) | orchestrator | — |
| Code commit | `216b8bf9` — `foundations/glossary.md` +6 | author (Haiku 5.5) | whole-change review `PASS` (`reports/review-whole-report.md`) |
| Reports | `reports/author-report.md`, `reports/review-whole-report.md`, `reports/author-fix-report.md`, `reports/author-return-report.md`; handoffs `reports/author-handoff.md`, `reports/review-whole-handoff.md`, `reports/author-fix-handoff.md`, `reports/author-return-handoff.md`; findings `reports/fix-findings.md` | agents and orchestrator | — |

## Verification

| Command or manual check | Actor, commit and environment | Exit code and result | Failed or unchecked |
|---|---|---|---|
| list of tests failing on the base | orchestrator, base `fec2ae7e` (tree equal to the tree of its second parent `2e160787`, the head of merged #164) | taken from the final gate of the cycle of the merged branch, `docs/task-cycles/wzorzec-kodu-przyrzadu/cycle.md` in commit `74546bb7`, *Verification* (CI `tests` on the last head passed) — empty list | none |
| `python -B .the-way/elements/common/foundation_check.py` | author, reviewer, return step, at `216b8bf9` | exit 0, `0 errors` (each run) | none |
| `python -B .the-way/instruction-files/check_instructions.py` | author, return step, `216b8bf9` | exit 0, `0 error, 149 warn, 7 info`; the 149 warnings not compared with a baseline | none |
| `git diff --check`; `python -B .the-way/task-cycle/change_file_sizes.py fec2ae7e 216b8bf9` | author, reviewer | exit 0; `foundations/glossary.md` 300 -> 306 | none |
| the final gate | CI on the request's last head | the final gate is the CI run on the request's last head; the cycle has no local time of it; its result stands in *Checks* of the request's description, not in this copy | not yet run |
| `python -B .the-way/task-cycle/review_reminder.py origin/main` | orchestrator | exit 0: tag `foundation-review/2026-11-13`, merges 49, threshold 60, `reminder: no` | none |
| `python -B .the-way/task-cycle/cycle_stages.py` and `cycle_measures.py` (session `c5cf5bfa-224e-499a-881c-3282f49bfb11`) | orchestrator | exit 0 each; `stages.md`, `mechanism_measures.md` written (regenerated before the copy) | none |
| `python -B .the-way/task-cycle/remarks_check.py .runs/task-cycles/szkielet-progresji` | orchestrator | first run exit 1 (7 items listed), the 7 appended to the process remarks word for word, second run exit 0 (`checked: 4 reports, 7 items other than none, 0 not in the process remarks`); 2 runs | none |
| `python -B .the-way/task-cycle/request_check.py` and `private_paths_check.py` on `request.md` | orchestrator | exit 0 each (first runs) | none |

## Return step

- Foundation compared with code: the entry `wall` against the task, the part map line of `product-foundation` and the uses of the word in the tracked files (two hits, both in a field sense); D-362 compared, not changed; the other decisions of the task's *Decisions in play* belong to other tasks and are not changed; nothing no longer matched (`reports/author-return-report.md`)
- Decisions written or changed: none
- Invariants written or changed: none
- Environment facts: none
- Glossary terms: `wall` (written in the change, row projected; no other word of it needs an entry: `program` and `solved map` already have one, `map`, `item` and `spell` are used in a field sense)
- Part-map changes: none
- Projected entries written whole or in part: `wall` (whole)
- Rows of *Settlements to record* written: none (the task's *Settlements to record* is `none`)

## Request handoff

- Request URL and status: https://github.com/mariusznazar/loop2/pull/165 — draft (the final run of the tests had not finished when the request opened)
- Description: `request.md` beside this record, written by `task-cycle/skill/request_template.md`; form check `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/szkielet-progresji/request.md --task .runs/task-cycles/szkielet-progresji/task.md` exit 0, 1 run; private-paths check on it exit 0, 1 run; the link to the record and the checks of the copy are filled in after the commit that adds it
- Writes to the task's line in the backlog: none (the cycle added no request link and set no state; the day advisor keeps the line)
- Working copies left: none so far
- Directories of earlier tasks kept: none
- Corrections after the request opened: none
- Process remarks on the-way:
  - fix, .runs/task-cycles/szkielet-progresji/reports/author-fix-report.md: `.runs/task-cycles/szkielet-progresji/reports/fix-findings.md` (the path the handoff names) — not found; the file exists at `.runs/task-cycles/szkielet-progresji/fix-findings.md` and I read that one. Its content matches the handoff's description.
  - author, .runs/task-cycles/szkielet-progresji/reports/author-report.md: None unresolved. The `wall` search found only the two non-glossary uses above, neither in the projected meaning.
  - author, .runs/task-cycles/szkielet-progresji/reports/author-report.md: The 149 warnings of `check_instructions.py` were not read one by one and not compared with the pre-change tree; the script's error count is 0, so they do not stop the tests. The change touches only the glossary file, which the script's visible output does not name.
  - return step, .runs/task-cycles/szkielet-progresji/reports/author-return-report.md: `git grep -i -w` for `wall`, `spell`, `item`, `map`, `program` in `foundations/`: as above.
  - return step, .runs/task-cycles/szkielet-progresji/reports/author-return-report.md: None unclear.
  - whole-change review, .runs/task-cycles/szkielet-progresji/reports/review-whole-report.md: `decision_index.py --decision 362` found no decision; the switch takes the identifier with its prefix, `D-362`.
  - whole-change review, .runs/task-cycles/szkielet-progresji/reports/review-whole-report.md: The author's report places the second `wall` hit in `foundations/invariants.md` at line 2186; it is in `foundations/decisions.md` at line 2186.
