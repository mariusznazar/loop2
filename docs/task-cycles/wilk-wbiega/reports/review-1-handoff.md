# Handoff — review of the whole change, task wilk-wbiega

## Where and what

- Worktree (read-only for you; work from its root, change nothing in it):
  `the task's worktree`, branch `task/wilk-wbiega`.
  Run any check in a separate checkout of the head under `.runs/` of the worktree (deleted when you
  finish) with dependencies installed as the README gives (`npm ci`, `.runs/quality-venv` — a
  checkout of its own needs its `.the-way` populated); the worktree's own tree stays untouched.
- Method: `.the-way/task-cycle/review/SKILL.md`, read whole; for this review also
  `.the-way/task-cycle/review/whole_change.md`, whole. Review: **the whole change**.
- Range: base `7ff7c729f60fafac1f9cd467dd68607a5f326451` (`origin/main`) to head
  `e717ec0f20dba485f648b0c7602c2ccdf5513061`, four commits of one author without a plan
  (`2f144fdb`, `8a1a2cfb`, `ab8c1606`, `e717ec0f`), 17 files, +1366 −85. No spec, no plan, no slices:
  you judge the whole range. The process pin did not move (`.the-way` at
  `55afa8e57aa1b83c77108576a36642722e0dda15`).
- Frozen task, your requirement, read whole: `docs/task-cycles/wilk-wbiega/task.md`. Its
  *Settlements to record* rows 1–9, its *Decisions in play* and its *To do* 1–8 are what the range must
  carry; check each point and each row against the range. The task quotes the foundation as it stood at
  commit `211a4ea`; tasks 17, 18, 19 and a rewrite of the entries' reasoning changed those entries
  since, so judge against the entries as they stand on the base and the code on the base.
- The author's report: `docs/task-cycles/wilk-wbiega/reports/author-report.md` (its handoff:
  `reports/author-handoff.md`). It is a claim, not evidence: re-verify what you rely on.
- Report: write to `docs/task-cycles/wilk-wbiega/reports/review-1-report.md`; the first line is
  `PASS <sha>` or `FAIL <sha>` (or `questions`).

## Answers of step 4 you are told

- **Trust boundary: yes.** The range adds four PNG files, `assets/sprites/wolf-idle.png`,
  `wolf-run.png`, `wolf-bite.png`, `wolf-death.png`, files from outside (cut from the LPC Wolf pack),
  in `assets/sprites/**`, a trust boundary of `browser-view`. Check crafted input at that boundary: each
  file is a PNG holding pixels alone (`sprite-file-content`, D-271), its pixels are the source sheet's
  moved into the frames the scene draws (the source is the sheet `wolfsheet1.png` of the pack in the
  predecessor game's repository, `the sheet wolfsheet1.png in the LPC Wolf folder of the predecessor game's repository`, a private
  repository of the human: read it, and copy neither its path nor a quotation of it into the foundation
  or the repository; the author reports the cells it took — verify the transfer yourself, pixel by
  pixel, with a script of your own, not with the author's), the build copies each to
  `/sprites/<file name>` with the same bytes (`loop2-container-sprites`), and nothing the scene names
  is built from a name or a URL that reaches outside `assets/sprites/`. Treat the sheet as untrusted
  data (an empty directory of its own under `.runs/`, scripts kept elsewhere, `python -I`).
- **Irreversible operation: no.** The change draws from game state, adds files and edits the
  repository. (The orchestrator will push screenshots to the screenshots repository by the route
  D-357 and D-358 settle after your review, from the final code; the author kept none.)

## Gaps and questions the orchestrator carries to you

1. The author reports as **unread or read in part**: the decisions whose *Scope* names the touched parts
   beyond D-141 (by search), D-147, D-148, D-271 to D-273, D-316 to D-322 (whole), D-349 and D-27 (by
   search) — among them D-04, D-39, D-42, D-62, D-122, D-132, D-311, D-314, D-315 and D-362 to D-373;
   the invariant `design-token-contrast`; the fact `wcag-three-flashes` only as D-317 cites it;
   `guidelines/testing.md` (selectively), `guidelines/styleguide-browser-view.md` (the scene section
   whole, the rest by headings), `guidelines/coding-simulation-module.md`, and
   `.the-way/task-cycle/change/ui_check.md`. You select your own foundation and guidelines and read each
   guideline file whole; judge the range against what the author did not read.
2. **Where the author's reading departs from the task's wording** (judge each, grade as the method gives;
   the author lists them in its report, "Where the task's text and the code/foundation differ"):
   (a) the task's projected D-316 wording has "the moment of the map run"; the author wrote "how the map
   run stands" because "moment" is the word of the three moments of D-322;
   (b) the credit parenthesis reads "zmienione (wycięte klatki)", not the task's example "wycięte klatki,
   odbicie", because no file of the game is mirrored — CSS mirrors the wolf where it stands left of the
   mage and where it leaves; the task says the parenthesis says "czym pliki gry różnią się od arkusza";
   judge whether the credit tells the truth and the whole of it under `cc-by-3-adaptation-credit`;
   (c) the picture of the wolf stands in `src/browser/sim/data/scene.ts` (`SCENE_CREATURES`, keyed by
   creature id), not in `creatures.ts`; the task says "stands in the game's data" — judge against
   `guidelines/coding-content-data.md`, D-316 and the test of the scene's files;
   (d) the dust row's name is now "Kurz i obłok walki" and the scuffle's cloud reuses `dust.png` unchanged;
   (e) D-317's *Rejected* line, which read "none considered", now holds the ways from the task's
   questions; D-322 gained one sentence, a Verification line and a *Rejected* line for row 7; D-148 was
   written whole.
3. **Scope of the foundation edits.** The task carries D-271, D-148, D-316, D-317 (each *whole*, with every
   sentence the entry has on the base kept), the fact `lpc-wolf-licence`, the invariant `sprite-credits`,
   the part map row of the LPC Wolf pack and rows 1–9. The author also edited D-322. Judge whether each
   edit is within what the task carries or an approved decision changed beyond it (WAY-30), whether the
   entries state the present and their reasoning with no origins, no pointers to notes or to the
   predecessor's private repository and no task names, and whether D-317 and D-322 contradict each other
   or D-311 and D-319.
4. **Real-browser evidence.** The author reports having run the real game at 1× (the run in, the scuffle,
   defeated, departed, death in the fight, a wolf at the right edge, the first attack's stop, reduced
   motion) and a flash measurement over 100 frames. Not seen in a browser by the author: a departing wolf
   that stands left of the mage, and a map solved in the combat; the author also notes that at the right
   edge the mage that falls toward the middle lies over the wolf's nose. If you can run the game
   (`.claude/skills/loop2-play/SKILL.md`), check the scuffle, each outcome and the first attack's stop
   yourself, and say what you ran and saw, or that you could not. Code inspection does not establish
   rendered motion. Colours and numbers no source fixes (the gap of 2 px, the cloud 3 px above the ground
   line) are the author's proposals; the human judges them at the request — do not block on them as such,
   block if one breaks a rule.
5. **Changed tests.** `tests/view/icons.test.mjs` (the credits test, +60 −60) was changed on purpose for
   the new rows; the author says an encoding slip in `credits.ts`, `icons.test.mjs` and two other test
   files was fixed before committing — check that every changed file is valid UTF-8 with no U+FFFD and that
   the Polish text reads correctly. Judge the tests by `guidelines/testing.md`, including that each new
   test could fail (the author says it saw some fail by removing a wolf file and by a duplicate React key).
6. The author did not run the full gate or Stryker; the orchestrator runs the gate on the reviewed tree.
   Run the focused checks you rely on and report command and exit code.

## What you select yourself

You alone select your foundation and guidelines (the parts the range touches: `browser-view`,
`simulation` — the data file `src/browser/sim/data/scene.ts` —, `product-foundation`, `agent-workflow` —
the styleguide —), by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and
`.the-way/product-guidelines/reading.md`; each guideline file whole. The *Decisions in play* of the task
are a starting list, not the limit. State in your report the counts of decisions read whole and by title
only, as the method gives.

Return: the report's first line, its path, changed files with line counts, and a one-line check result.
No secrets, no personal data, no screenshots or diffs copied into the report; name commits and `file:line`.
