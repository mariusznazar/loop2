# Handoff — review of the whole change, task trzy-chwile-gdy-czas-stoi

## Where and what

- Worktree (read-only for you; work from its root, change nothing in it):
  `the task's worktree`, branch `task/trzy-chwile-gdy-czas-stoi`.
  Run any check in a separate checkout of the head under `.runs/` of the worktree (deleted when you
  finish) with dependencies installed as the README gives; the worktree's own tree stays untouched.
- Method: `.the-way/task-cycle/review/SKILL.md`, read whole; for this review also
  `.the-way/task-cycle/review/whole_change.md`, whole. Review: **the whole change**.
- Range: base `20bcc58df073ab5d5ead7c6f04cd136117da08bd` (`origin/main`) to head
  `81578d6653c3f583810685cd6f18c9372bad5068`, five commits of one author without a plan
  (`c130b231`, `04b43088`, `d8c8f496`, `959a8024`, `81578d66`). No spec, no plan, no slices: you judge
  the whole range. The process pin did not move (`.the-way` at `55afa8e57aa1b83c77108576a36642722e0dda15`).
- Frozen task, your requirement, read whole: `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/task.md`.
  Its *Settlements to record* rows 1–7 and its *Decisions in play* are what the foundation entries of
  the range must carry; check each point of *To do* and each row against the range.
- The author's report: `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/reports/author-report.md`
  (its handoff: `reports/author-handoff.md`). It is a claim, not evidence: re-verify what you rely on.
- Report: write to `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/reports/review-1-report.md`; the first
  line is `PASS <sha>` or `FAIL <sha>` (or `questions`).

## Answers of step 4 you are told

- **Trust boundary: yes.** The range adds `assets/sprites/mage-death.png`, a file from outside (a sheet
  of the Pixel Crawler pack), in `assets/sprites/**`, a trust boundary of `browser-view`. Check crafted
  input at that boundary: the file is a PNG holding pixels alone (`sprite-file-content`, D-271), its
  pixels are the source sheet's moved into the scene's frames (the source is
  `the Pixel Crawler pack in the predecessor game's repository, Entities\Npc's\Wizzard\Death\Death-Sheet.png`, loop `cdc7c0d`;
  verify the transfer yourself, pixel by pixel, not by the author's script), the build copies it to
  `/sprites/<file name>` with the same bytes (`loop2-container-sprites`), and nothing the scene names
  is built from a name or a URL that reaches outside `assets/sprites/`.
- **Irreversible operation: no.** The change draws from game state and edits the repository. (The author
  pushed screenshots to the screenshots repository by the route D-357/D-358 settle — see below.)

## Gaps and questions the orchestrator carries to you

1. The author read these only through the task's quotations or by tests, not as entries: D-62, D-132,
   D-272, D-349, the invariants `sprite-file-content`, `design-token-contrast`, `loop2-container-sprites`,
   the fact `pixel-crawler-terms`, the glossary, the part map beyond `browser-view`, and the decisions
   whose *Scope* names the touched parts beyond the ones it names read whole. You select your own
   foundation; read these whole as your selection requires and judge the range against them.
2. **Scope of the foundation edits.** The task carries D-322, D-311 (sentence about the window), D-271
   (keep task 18's sentence, change it only if it does not fit the specks), D-39 (plaque frame), D-42
   (fourth criterion), the fact for 2.3.1 and the styleguide part. The author also **edited D-315** to
   name the plaques of a discovery and the cold layer as lying over the tint (Choices 5 of its report),
   and wrote D-271 extensions for the cold layer and the specks. Judge whether each is within what the
   task carries or an approved decision changed beyond it (WAY-30), and whether D-317, D-368, D-371 are
   rightly left untouched. Grade as the method gives.
3. **Real-browser evidence.** The author reports timings and luminance measured in Chromium and
   screenshots at the screenshots repository (commit `11eb42fbf9e30bd4a710513b7440207d34964014`,
   directory `loop2/trzy-chwile-gdy-czas-stoi/`, embeds in the author's report, "Own-work check"). If
   you can run the game (`.claude/skills/loop2-play/SKILL.md`), check the three moments and the
   end-of-run window in a real browser yourself; say what you ran and saw, or that you could not.
   Code inspection does not establish rendered motion.
4. **Colours are the human's to choose at the request** (task acceptance criteria and question 9): the
   cold layer `#2f5fd0` at 0.5 and the specks `#b21818` / `#985a3b` are *proposals* — the author notes the
   specks read as dark sparks, not light. Do not block on the colours as such; do block if a proposal
   breaks a rule (3:1 against the snow where the foundation sets it, the source line of a token, D-317's
   whole-area flash, D-42 2.3.1, the cold layer indistinguishable from the cool tint of streak 0).
5. The author changed existing tests on purpose (`tests/view/end-window-game.test.mjs` helpers fire the end
   of the effect; `scene-picture.test.mjs` `decodePng` reads 8-bit RGB and the file list gains the death
   sheet). Judge them as changed tests, not as new ones.
6. The author did not run the full gate, `tests/quality`, `tests/deploy` or Stryker; the orchestrator
   runs the gate on the reviewed tree. Run the focused checks you rely on and report command and exit code.

## What you select yourself

You alone select your foundation and guidelines (the parts the range touches: `browser-view`,
`simulation` — the data file `src/browser/sim/data/scene.ts` —, `product-foundation`, `agent-workflow`
— the styleguide —, `build-tools` — README), by "Reading the foundation" in
`.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`; each guideline
file whole. The *Decisions in play* of the task are a starting list, not the limit. State in your report
the counts of decisions read whole and by title only, as the method gives.

Return: the report's first line, its path, changed files with line counts, and a one-line check result.
No secrets, no personal data, no screenshots or diffs copied into the report; name commits and `file:line`.
