# Handoff 17 — the return step (stage: make-change, the return step)

You take the return step of a the-way task cycle, a fresh agent with `make-change`. You take none of
the variants of the table in `make-change`'s `SKILL.md`: your stage is the return step, and your method
for it is `.the-way/task-cycle/skill/return_step.md`, which you read whole, together with
`.the-way/task-cycle/skill/foundation_step.md` (the return step writes as the foundation step writes) and
`.the-way/task-cycle/change/SKILL.md` for how a change is committed and reported. You read the skill of an
element whole when you write an entry of that element (`the-way-record-decision`, `the-way-record-invariant`,
`the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact`; in
`.claude/skills/` of the worktree). Use no personal skill of the same name without the `the-way-` prefix.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator
(Sonnet 5.5), who delegates to you the return step on your own recommendation. The human accepts the
entries at the merge of the request; you never label your own answer as the human's approval. A question for
the human arises only in the cases `foundation_step.md` lists: return it with status `blocked`; the
orchestrator opens the blocked draft request. Other questions go to the orchestrator in your report.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`, head `621d1448…` (check `git rev-parse HEAD`; the worktree is clean). The change is
  the range `6f36c7a..621d144`: the foundation step (`6f36c7a..3ea46e8`), seven slices (`3ea46e8..1880393`)
  and the fix of the whole-change review's Minor findings (`1880393..621d144`). Commit what you write on this
  branch, English messages in the repository's form (`docs: :memo: <what>`), added **by path**, never
  `git add -A`, `.` or `commit -a`. Pinned the-way: `.the-way` at `294af7f`.
- Frozen task, read whole: `docs/task-cycles/kronika-z-filtrami/task.md` (Polish). Reviewed spec, read whole:
  `docs/task-cycles/kronika-z-filtrami/spec.md`. Plan: `docs/task-cycles/kronika-z-filtrami/plan.md`.
- Reports to read (claims to verify against the code and the foundation as they stand): foundation step
  `reports/06-foundation-report.md`; slices `reports/07…13-slice*-report.md`; whole-change review
  `reports/14-review-report.md`; the fix `reports/15-fix-report.md`; its review `reports/16-fix-review-report.md`
  (all in `docs/task-cycles/kronika-z-filtrami/reports/`).
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/17-return-report.md`.
- Answers of step 4: trust boundary no; irreversible operation no.

## What you compare, as `return_step.md` gives

1. The entries the change writes or changes (D-338 … D-347, the glossary term `chronicle`, D-04, D-19, D-122,
   D-147, D-185, D-272, D-311), the entries the task names (*Decisions in play*) and the ones a search of the
   whole foundation finds (WAY-33), and the part map of the touched parts (`browser-view`, `simulation`,
   `agent-workflow`, `product-foundation`), each **compared with the code as it stands at the head**: what no longer
   matches, and its correction in the same change. The code changed after the foundation step wrote its entries
   (seven slices and a fix: names, the order of events in a minute, `runNumber`, the window, the shape of the
   events); check each claim of each entry that the code can falsify, including each *Verification* example.
2. A source outside the product the change rests on that the foundation does not hold: write it as an
   environment fact through `the-way-record-environment-fact` — candidates the foundation step named: the
   Playwright reading of the browser's console that D-347 rests on (`Based on: none` now); decide on the
   evidence, not on the candidate.
3. A word the change uses in a meaning for which WAY-95 gives it an entry; a term used against its entry takes
   the use corrected and no entry.
4. A row of *Settlements to record* or a projected entry the code makes true that the foundation step missed.
5. A choice that binds after the merge (WAY-36) — examples to judge, not to accept: the two new events of the
   simulation (`streakLost`, `campfireExtinguished`) that task 16 may read; the filter and the tab starting at
   „Kronika" and „Wszystko" after a load (the whole-change review's finding 2, which the orchestrator keeps for
   the human: do not change D-346 or the code for it); the order of the entries of one edit; the moved rule or
   group found without a hint. Where the task or its spec excludes an entry for a choice, the exclusion prevails
   and the choice stays a row of the questions table. An invariant only for a rule the task, a decision or the
   human sets. No entry is deferred: what this request does not write is neither proposed nor listed for later,
   and the review findings are no foundation entries.

Select and read the foundation as "Reading the foundation" in `.the-way/elements/common/way_of_working.md`
gives, each entry whole; the guidelines of the parts, each whole, where an entry's claim depends on them.
Run `python -B .the-way/elements/common/foundation_check.py` after each change of the foundation.

## What the report holds

As `make-change`, `return_step.md` and `foundation_step.md` give; and, for the orchestrator's record, these
fields, each with its content or `none`: foundation compared with code (the entries compared, what no longer
matched and its correction); decisions written or changed; invariants written or changed (each with the task,
decision or human that sets its rule); environment facts; glossary terms; part-map changes; projected entries
written whole or in part; rows of *Settlements to record* written. Keep, for each entry you write or change,
one sentence of its meaning in English and one in the task document's language, marked `row <n>`, `projected`
or `the cycle's`. Add the foundation check with its command and exit code, the own-work check, every reach
beyond this handoff, and **Searches not found or unclear**. If you commit nothing, say so and why. Return your
status, your commits and the report path in one short message.
