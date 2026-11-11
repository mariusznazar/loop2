# Handoff — review of the whole change

## Delegation

You review the whole change of the task cycle `spokojniejszy-wyglad` of the product loop2 as an agent
that did not make it. The person who requested the cycle delegated intermediate choices to the
orchestrator; nothing in this handoff is the human's approval. You are read-only: change no tracked
file, commit nothing, run no test of the product's full gate (`npm test`) — the orchestrator runs it.
You may run focused checks and the game locally to look at it (they must leave the worktree clean).

## What you do

Your method: `review-change`, **the whole change**, by
`.the-way/task-cycle/review/SKILL.md` (read whole; then `.the-way/task-cycle/review/whole_change.md`,
which that file names for this review). You select your own foundation and guidelines, as that method
gives (by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and
`.the-way/product-guidelines/reading.md`, the guidelines whole). Report the count of decisions read
whole and by title only.

## Where

- Worktree (work from its root; process root is its `.the-way`, pinned
  `52f8164a354ee1a704af0d58add2f3be8e4f0247`): `the worktree's root`
- Range: base `3b7e4930e3193376416f569e3b9cae1c31caa780` to head
  `c7f2aa7b931e3aa1931b86b964e68c2cd08c19cb` — confirm with `git rev-parse HEAD` first and, if it
  differs from the head's short form `c7f2aa7b`, ask before you go on. Four commits: `9e1bc608`,
  `4e0c06b2`, `80bd62d1`, `c7f2aa7b`. Compute the diff yourself: `git diff 3b7e4930..c7f2aa7b`.
- The route: one author without a plan (class `same`), no spec, no slices.

## What the change must do

The frozen task, whole: `.runs/task-cycles/spokojniejszy-wyglad/task.md` (human-accepted
2026-11-11; its *To do* items 1–10, *Questions to settle* with their answers, *Decisions in play* and
*Settlements to record* rows 1–3 are the requirement and carry the entries the foundation step writes).
Check coverage of every *To do* item, every settlement row and every projected entry the task
carries, and the source fidelity of the foundation entries against the wording the task quotes.

## Answers of step 4

- Trust boundary: no (the task changes no file in `assets/icons/**`, `assets/fonts/**`,
  `assets/sprites/**`; verify in the diff that none changed).
- Irreversible operation: no.
- Open design choice: none by the orchestrator's reading; how a mask is drawn inside the SVG drawing
  of the map is a way of making what the task settles. Judge whether the author's way (a
  `foreignObject` holding the badge's mask element) leaves a choice the foundation should hold.
- Checks failing on the base: none (`npm test` on the base: exit 0).

## The author's report

`.runs/task-cycles/spokojniejszy-wyglad/reports/author-report.md` — a set of claims to verify, never
evidence. Its **Unread material** is carried to you because it stands in your range of judgment: the
author left unread D-45, D-70 and D-291 (read by quotation and grep), the invariant entries
`browser-view-token-values` and `browser-view-focus-outline`, and the part-map entries of
`product-foundation` and `agent-workflow`; and it read `definicja_mvp2_loop2.md` (outside the
repository, the projected wording of D-27, D-40, D-43, `icon-credits`) as a reach. Read what bears on
the change yourself.

The report names choices beyond the letter of the task that you grade and scope yourself: the rename
of `footer.ts` to `credit-lines.ts` (and the module table line), the rename of the CSS class
`action-icon` to `icon-mask` in files unrelated to the three icon sites, comment edits in
`src/browser/sim/data/*.ts` and in `README.md`, the wording of D-262's first sentence and its
*Verification* example, the entries written whole as the task carries them, and the changed tests of
`tests/invariants/test_icon_credits.py` and `tests/view/*`. Also check the author's own-work claim: the
rule `.terrain-drawing .icon { color: var(--text-strong) }` is unprotected by a test.

## Your report

Write it to `.runs/task-cycles/spokojniejszy-wyglad/reports/whole-review-report.md` as the method
gives (first line `PASS <sha>` or `FAIL <sha>`; graded findings with the criteria for appearance and
guideline examples; each blocking finding with the slice it comes from — here no slice, the one
author's work; Minor findings you do not mark outside the scope are fixed by the cycle). Return the
first line, the changed files with their added and removed line counts, a one-line check result
naming what failed or did not run, the report path, your questions, and in the report **Unread
material** and **Searches not found or unclear** (each `none` where none).
