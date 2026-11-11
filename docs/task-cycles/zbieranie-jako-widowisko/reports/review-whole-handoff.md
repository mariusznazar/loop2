# Handoff — review of the whole change (task "Zbieranie jako widowisko")

You review the code of one change of a the-way task cycle as an agent that did not make it. You are
read-only: change no tracked file, make no commit, never write in the worktree except the ignored
scratch under `.runs/` (use your own new directory there).

## What you review

- Method: read `.the-way/task-cycle/review/SKILL.md` whole (project skill `the-way-review-change`),
  and, as it says for this variant, `.the-way/task-cycle/review/whole_change.md`. Variant: **the whole
  change**.
- Worktree: `the worktree's root`, branch `task/zbieranie-jako-widowisko`.
  Work from its root. Pinned the-way: `.the-way` at `e3825a82386a61930a86f8517fc0c5f422fc2833`.
- Range: base `211a4ea556d48f5da98fc08380b3c061b9365709` (main) to head `6019d7a` (confirm with
  `git rev-parse HEAD` that the head is `6019d7a…` before you go on; the full SHA is in `git log`).
  Compute the diff yourself: `git diff 211a4ea..6019d7a`, `git log 211a4ea..6019d7a`.
- Route: one author without a plan, no spec, no slices; the foundation step was done by the author
  with its code (decisions D-362, D-363, D-364 new; D-317 and D-271 changed in part; fact
  `smoke-fire-particle-licence`; invariant `sprite-credits`; one row of the part map; the styleguide
  section "The scene of a map run"). The return step has not run yet; the orchestrator runs it after
  your review, so do not fault the change for what the return step is to compare and write.
- The frozen task (read whole — it is the requirement):
  `docs/task-cycles/zbieranie-jako-widowisko/task.frozen.md`.
  Check every item of its *To do* 1–8, its *Acceptance criteria*, each of *Settlements to record*
  rows 1–4 and each projected entry its *Decisions in play* carries, against the code and the
  entries written, and the source fidelity of the foundation entries to the task's wording
  (the task document is the source; the definition and the plan are the author's private notes,
  which you do not read).
- The author's report (claims to verify, not evidence):
  `docs/task-cycles/zbieranie-jako-widowisko/reports/author-report.md`.

## Answers of the orchestrator at start

- **Trust boundary: yes.** `assets/sprites/**` is a trust boundary of `browser-view` (files from
  outside). The change adds `assets/sprites/mage-bend.png` (made by hand from files of an earlier
  session) and `assets/sprites/dust.png` (derived from a pack downloaded from OpenGameArt). Check
  crafted input at this boundary: that each file is a PNG holding pixels alone (D-273,
  `sprite-file-content`: no ancillary chunk that carries text, a profile, a comment or a trailing
  payload; inspect the bytes), that the build copies it and the test `loop2-container-sprites` covers
  it, that nothing of the downloaded archive other than the one derived image entered the repository,
  and that the credit row names the pack, its author and licence as the licence requires
  (`cc-by-3-adaptation-credit`, `cc-by-3-licence-copy`).
- **Irreversible operation: no.**
- Also check that no screenshot, frame, snapshot or other image of the author's inspection is in the
  range (the repository holds none).

## Gaps the author's report states, carried to you

The author's **Unread material** says it did not read whole: decisions D-03, D-04, D-18, D-27, D-43,
D-65, D-66, D-67, D-71, D-125, D-197, D-242, D-267, D-291, D-314, D-315, D-321, D-349; invariants
`browser-view-framework`, `design-token-contrast`, `design-token-sources`, `loop2-container-icons`,
`action-in-progress`, `player-map-run-pace`, `map-run-layout`, `font-file-provenance`; the whole of
`foundations/part_map.md` and `foundations/glossary.md`; lines 470–596 of
`guidelines/styleguide-browser-view.md`. You select your own foundation and guidelines (WAY-150),
and these entries are likely within your selection: read whole those that bear on the change
(D-04 on the scene's previous reading and the game state, D-43 and `browser-view-token-values` on
values written in place of tokens, D-66 on a missed gathering, D-27 and D-291 on credits and icons,
D-322 and D-319 on stops and reduced motion, the part map and the glossary in full), and judge
whether the author's code or entries contradict any of them.

Points for your judgment from the author's report (do not take them as settled):
- The scene shows no effect for a gathering that ends at a stop (pause, discovery, death,
  completion) or in a reading that carries more than one end of a gathering. Is that what the task's
  "an effect overdue when its turn comes is dropped" and To do 6 ask for?
- The bend sheet always faces right (the mirror is turned back); the task does not name it.
- The author found 8 smoke cells in the pack file where the task says 4 smoke frames, and used the 8;
  the page does not give a count.
- The author could check in a real browser only the 1× pace, the hit and miss of "Zbierz" with a
  stick, and the bend loop; reduced motion, 8×/16×, the fibre path, "Obchód" and the removal of an
  effect at `animationend` were checked only in jsdom and in the code.
- D-27 still says only icons are credited in the footer while the footer now holds the pack row;
  task 24 is to rewrite D-27 (the task document says so). The orchestrator hands this to the return
  step; grade it as you see fit.

## Checks

Do not run the product's full gate (`npm test` with no argument): the orchestrator runs it. Focused
checks you run yourself are welcome, each as `npm test -- <file>` (the script needs the npm
environment), with its command and exit code in the report; do not run two builds at once.
The quality environment `.runs/quality-venv` exists in the worktree.

## Report

Write your full report to
`docs/task-cycles/zbieranie-jako-widowisko/reports/review-whole-report.md`
as the method gives it. Return its first line (`PASS <sha>` or `FAIL <sha>`) or `questions`, the
changed files with their added and removed line counts, the report path, and a one-line check
result. The report holds your counts of decisions read whole and by title only, **Unread material**
and **Searches not found or unclear**, each reach beyond the handoff, and for each blocking finding
the place it comes from. List Minor findings that lie within the task separately from those
outside its scope.
