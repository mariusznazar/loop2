# Handoff — the return step (task "Zbieranie jako widowisko")

You are the one author, resumed for the return step (step 11 of the cycle). The review of the whole
change and of the fix both ended in `PASS` on head `8531d93d3c5cdc5b9572bce17c534d4bdadd228d`
(base `211a4ea`). Work in `the worktree's root`, on branch
`task/zbieranie-jako-widowisko`; commit by path in English as before.

## Method

- Read `.the-way/task-cycle/skill/return_step.md` whole and follow it. It writes as the foundation
  step writes: read `.the-way/task-cycle/skill/foundation_step.md` again where you write an entry, and
  the skill of an element when you write an entry of that element.
- Variant of `make-change`: none (the return step takes no row of its table). Do not run the full
  gate (the orchestrator runs it); run the focused checks your edits need, with command and exit code
  (`python -B .the-way/elements/common/foundation_check.py` at least).

## What to compare, and what the orchestrator wants you to look at

Compare with the code as it stands at the head above: the entries the change wrote or changed
(D-362, D-363, D-364, D-317, D-271, `smoke-fire-particle-licence`, `sprite-credits`, the part-map row
and the styleguide section), the entries the task names in *Decisions in play* (read in the frozen
task `.runs/task-cycles/zbieranie-jako-widowisko/task.frozen.md`), and the part map of the touched
parts (`browser-view`, `simulation`, `product-foundation`, `agent-workflow`). Then search the whole
foundation once for what the change touches, as `elements/common/way_of_working.md` "2. Search the
foundation" gives. Items the orchestrator knows of — decide each by the rules of the return step, do
not take them as settled:

1. **D-27** (footer and section of credits credit icons only) no longer matches the code: both now
   hold the pack's row. The return step corrects what no longer matches in the same change. The task
   says task 24 rewrites D-27 (its projected wording) — write no more of that wording than the
   smallest correction that makes D-27 true now; say in the report what you left to task 24.
2. **The facing of the bending mage** (per prop from `SCENE_PROPS`' `mageFaces`: sticks and bush
   right, moss left, fibre as the mage faces) — the fix made it, and the styleguide says it. It binds
   after the merge: by the rule "a choice that binds after the merge" is it a decision (D-362 or
   another), a part of one, or only a row of the questions table? Decide and write it, or say why not.
3. **Other choices of the author** that bind after the merge (WAY-36): the rule of which readings show
   no effect (a stop, more than one end of a gathering, an end together with an action that takes
   pieces out of the backpack), an effect replaced by a newer one, the timings, the frame order of the
   bend, the 8 dust frames, the effect and the plaque outside the `no-preference` motion block. Each
   is either written into the foundation or left as a row of the questions table; the report says
   which, with the reason, so that the orchestrator can enter the rows.
4. **Words**: a word the change uses in a meaning for which WAY-95 gives an entry (read
   `foundations/glossary.md` whole), e.g. "effect", "overdue", "end of a gathering", "bend"; and the
   use of "catch-up" (the glossary's meaning is the computing after a load or a sign-in; the fix
   replaced the wrong use with "a tab left in the background").
5. **Environment facts**: sources outside the product the change rests on that the foundation does not
   hold (the pack page and its licence are in `smoke-fire-particle-licence`; check whether the
   statement that the pack file holds 16 cells of 16 × 16 in a 64 × 64 sheet, of which rows 0–1 are
   smoke, is a fact the code rests on — you downloaded the file to `.runs/dust-pack/smoke_fire.png`).
6. The projected entries and *Settlements to record* rows the task carries: confirm each is written
   (rows 1–4; D-317 and D-271 in part; `smoke-fire-particle-licence`; `sprite-credits`; the part map
   row; the styleguide section) and that the part of D-317 and of D-271 that the task says it does
   NOT write (the rule of the question 6, the whole reduced-motion rule, the rule D with its
   condition, the scuffle's cloud) is not written.

No entry is deferred: one this request does not write is neither proposed nor listed for later.

## Report

Write your report to
`docs/task-cycles/zbieranie-jako-widowisko/reports/return-step-report.md`
with the sections of the cycle's *Return step* (Foundation compared with code; Decisions written or
changed; Invariants written or changed; Environment facts; Glossary terms; Part-map changes;
Projected entries written whole or in part; Rows of *Settlements to record* written), the choices that
stay rows of the questions table (each with the way not taken and the cost if wrong), your commits,
each check with command and exit code, **Unread material** and **Searches not found or unclear**.
Return only: status, commits (or none), a one-line check result, the report path.
