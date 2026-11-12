# Handoff — review of the whole change of the task "swit-rosnacy-z-passa"

You are a fresh reviewer of a the-way task cycle. You did not make this change. The human reviews the
request, not your steps; send questions to the orchestrator in your report (`questions`). You are
read-only: change no file of the worktree and make no commit.

## Where you work

- Worktree (work from its root): `the task's worktree`, branch
  `task/swit-rosnacy-z-passa`
- Range to review: base `7846213c25675b2c084e4587cd1ffb09316ef486` to head
  `83c8369a58703dcf4f471226635bc424d5135da0` (`83c8369a`). Three commits: `96d7b4f3` (code, tests, one sprite), `38a75f0a` (foundation
  entries), `83c8369a` (styleguide).
- Your method: `.the-way/.claude/skills/the-way-review-change/SKILL.md` — read it whole; read a
  file it names only when the step or variant that names it comes. Your variant: **the whole change**
  (one author, no plan, no slices).
- Full report: `docs/task-cycles/swit-rosnacy-z-passa/reports/review-1-report.md`; its first line
  `PASS <sha>` or `FAIL <sha>`; include **Unread material** and **Searches not found or unclear**,
  the checks you ran with command and exit code, and how many decisions you read whole and how many
  by title only (WAY-150).

## What the change is

- Frozen task, read **whole**: `docs/task-cycles/swit-rosnacy-z-passa/task.md` (accepted by the
  human 2026-11-11). Cover every item of its *To do* (1–8), the acceptance criterion, each row of
  *Settlements to record* (1–7), every projected entry it carries in *Decisions in play* (D-315 and
  D-132 whole; the part of the scene entry now D-316; the rule-D sentence of D-271), and check the
  source fidelity of every value (colours, openings, curve, 2 s, 20 minutes, 16 px, 37 °C → 35 °C).
- No spec and no plan exist (no open design choice; one author).
- The author's report: `docs/task-cycles/swit-rosnacy-z-passa/reports/author-report.md`.
- The task moved no pin.

## Told by the orchestrator

- **Trust boundary: yes** — `assets/sprites/**` of the part browser-view; the change adds
  `assets/sprites/fire-small.png`. Check crafted input at it: that the file holds pixels alone
  (`sprite-file-content`, D-271, D-273), that the build copies exactly it, that nothing in the code
  builds a file name or URL from user data, and that the test's PNG reader and its literals are sound.
- **Irreversible operation: no.**
- The checks already failing on the base: none (the quality environment was set up as README.md gives).
- The author pushed screenshots to `mariusznazar/screenshots` by the route of D-357 and D-358; the
  links are in the author's report. This is within the route; judge only whether what the screenshots
  claim agrees with the code. A screenshot of the scene is evidence of the author's own-work check.

## Your selection

You select your own foundation and guidelines by "Reading the foundation"
(`.the-way/elements/common/way_of_working.md`) and `.the-way/product-guidelines/reading.md`, for the
parts the change touches: `browser-view`, `simulation` (`src/browser/sim/data/scene.ts`),
`product-foundation` and `agent-workflow` (the styleguide). The orchestrator does not name your
reading; the author's report lists what the author left unread, and these gaps are yours to judge:

- Decisions the author did not read whole: D-38, D-39, D-42, D-43, D-48, D-68, D-69, D-70, D-122,
  D-131, D-133, D-250, D-272, D-273, D-311, D-314, D-318, D-319, D-320 (read from its Verification
  on), D-341, D-349, D-364, D-366, D-367. Read those whose topic the change touches (colour tokens and
  their names D-43/D-48; the pause and a stop at a discovery D-122/D-250; the stand of the mage and
  the badge D-319/D-320; the fixed scene size D-349; sprites D-272/D-273), and say which you skimmed
  by title only.
- The author did not read the glossary (`streak`, `completion`, `extinguished campfire`), the part
  map, `src/browser/sim/body.ts`, `src/browser/view/run-screen.tsx` or `src/browser/sim/data/items.ts`.
  The 20 minutes of a stick and the cooling rate of the body are quoted from the task; check them
  against the code.
- Points the author names as open for the review: the plaque of the flying icon lies over the tint;
  the tint also stands still at a discovery; a map with no streak requirement keeps the tint cool
  until a completion; `@property` dependence of the 2 s return; the first one or two pixels of the
  frost are the outline alone; fractional device pixel ratios; D-372 and D-373 as new numbers; the
  *Origin* of the entries, where the task names its own document and the pinned template of the
  decisions says a task document is not named in *Origin* (WAY-27) — judge which holds and what the
  entries should say.
- The task's item 7 asks D-132 "w całości"; the D-132 of this base already names the window of
  the end of the run (task 16 is merged), and the author added only the light in full gold. Judge
  whether the entry reads as the task's projection requires.

## What the orchestrator asks of the report

- Whether tests really exercise the behaviours (the author reports that it saw each of four tests fail
  under a deliberate break, and names one break no test catches) — read tests against the guidelines
  in `guidelines/testing.md`.
- The look cannot be proved by code reading; where you can, run the game as
  `.claude/skills/loop2-play/SKILL.md` gives and look at the scene at a streak of 0, at the required
  streak, in full gold, during a loss, in the pause, at the three frost thicknesses, and the smaller
  flame. You may run focused checks and the scene's tests; do not run the full `npm test`.
- For a finding, say whether it blocks, its grade and whether it is outside the task's scope. Return
  only what the method gives.
