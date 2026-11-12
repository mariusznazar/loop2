# Handoff — the one author, task wilk-wbiega

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You make
the choices of how to make what the task and the foundation settle, and name each one in your report;
the orchestrator enters them in the questions table. Never label an answer as the human's approval.
You never ask the human anything; questions go to the orchestrator in your report (status `questions`).

## Where you work

- Worktree (work from its root, write nowhere else): `the task's worktree`
- Branch `task/wilk-wbiega`, base commit `7ff7c729f60fafac1f9cd467dd68607a5f326451` (`origin/main`).
  Dependencies are installed (`npm ci`), the quality environment is `.runs/quality-venv` (README,
  "quality environment"). `.the-way` is at the pin `55afa8e57aa1b83c77108576a36642722e0dda15`.
- Checks already failing on the base: the base gate's log is
  `docs/task-cycles/wilk-wbiega/base-gate.log`; the orchestrator tells you below if anything failed
  there (read that file's last lines before you claim a failing check is yours). **Until the
  orchestrator's message says the base gate has finished, do not change a tracked file.** You may
  read, and write under the ignored `.runs/`.

## Method and variant

- Method: `.the-way/task-cycle/change/SKILL.md` — read it whole. Read a file it names only when the
  step or variant that names the file comes.
- Variant: "the whole change as the one author".
- Stage and boundary: you make the whole change — assets, data, code, tests, the foundation entries
  the task carries (the foundation step, `.the-way/task-cycle/skill/foundation_step.md`, read it whole
  when you reach that step; the skill of an element when you write an entry of that element), the
  credits rows and the styleguide part. You return before review. The return step comes later, when
  the orchestrator resumes you; do not do it now. Do not run the product's full gate (`npm test`
  whole): the orchestrator runs it. Run the focused checks of what you touch and report each with its
  command and exit code.
- Do not push the task branch. Commit on the task branch, `git add` by path (never `git add -A`,
  `.` or `commit -a`), messages in English as the existing commits write them, after the type and
  emoji, e.g. `feat: :sparkles: …`, `docs: :memo: …`, `test: :white_check_mark: …` (see `git log`).
  After the first commit check `git log --format='%h %ae' -1` shows the private address.

## The task

- Frozen task (read it whole; it is your requirement): `docs/task-cycles/wilk-wbiega/task.md`
  (sha256 `df6f4594ef46…`, from the human's note, accepted 2026-11-11, plan item `wilk-wbiega` of
  `plan_mvp2_loop2.md`). Its *Human actions* is `none`.
- Dependencies 17 (`zbieranie-jako-widowisko`, PR #77), 18 (`swit-rosnacy-z-passa`, PR #83) and 19
  (`trzy-chwile-gdy-czas-stoi`, PR #84) are merged and on the base. Build on them: the dust of a
  miss, the effect machinery of the scene (events of the call, previous reading), the tint, frost and
  the three moments' effects stand in `scene.tsx`, `scene-picture.ts`, `styles.css`,
  `src/browser/sim/data/scene.ts`. **The task's quotations of the foundation are of commit `211a4ea`;
  the entries have since been changed by tasks 17, 18, 19 and a rewrite of their reasoning.** Read
  each entry as it stands now in `foundations/`; where the task says "the projected wording", write
  the whole entry as the task gives it **and** keep every sentence the entry has now beyond the old
  wording (the task says so for D-316, D-317 and D-271). Where the task's text and the entry now
  disagree on a fact of the code, the code and the current entry decide, and you say so in the report.

## Answers of step 4

- Trust boundary: **yes** — `assets/sprites/**` of `browser-view` is a trust boundary (files from
  outside) and the change adds PNG files there: the wolf's sheets, cut from the LPC Wolf pack. Every
  review of this cycle is told so. You verify yourself that each new file is a PNG holding pixels
  alone (`sprite-file-content`, D-271), that its pixels are the source sheet's pixels moved into the
  frames the scene draws (compare pixel by pixel with the source and say how; a mirrored frame is the
  source's mirrored), that the build copies it to `/sprites/<file name>` with the same bytes
  (`loop2-container-sprites`), and that the wolf's pack files and the Smoke & Fire file you recolour
  are treated as untrusted data: put a downloaded or extracted file in its own empty directory under
  `.runs/`, keep your scripts in another directory, pass paths as arguments, and run Python that reads
  them with `python -I`.
- Irreversible operation: **no**. The change draws from game state, adds files and edits the
  repository; nothing outside it.
- Open design choice at start: **none**. The two *Questions carried to cycle* (which of the six sheets
  to take; the cut of the frames: common frame, facing, scale of the scene's one size D-349) are
  choices of how to make what the task settles; every where-and-how of the wolf (from the right edge,
  beside the mage, which side, what the mage does; the scuffle; the four outcomes; the first attack;
  reduced motion; credits) is settled by *Questions to settle* and *Settlements to record*. **You make
  the two choices** by the smallest reversible reading that fulfils the task and name each in your
  report with the option rejected and its cost if wrong. If something proves to be a design choice the
  foundation leaves open with several ways that change an entry, return `returned` without code
  (WAY-135).
- Reserved choice: none (no language, framework, library, store of data, way of logging in or place to
  run is chosen).

## What you read (selected by the orchestrator)

Foundation entries, each read whole (the range from its heading to the next heading, with *Rationale*
and *Rejected*), as they stand now: the *Decisions in play* of the task — D-147, D-148, D-141, D-27,
D-271, D-272, D-273, D-316, D-317, D-318, D-319, D-320, D-321, D-322, D-349; the invariants
`sprite-credits`, `sprite-file-content`, `loop2-container-sprites`, `design-token-contrast`; the
environment facts `lpc-wolf-licence` (it does not exist yet — you write it, task row 8),
`smoke-fire-particle-licence`, `pixel-crawler-terms`, `cc-by-3-adaptation-credit`,
`cc-by-3-licence-copy`, `game-icons-licence`, `wcag-three-flashes`. Then, by "Reading the foundation"
in `.the-way/elements/common/way_of_working.md`: the other decisions whose *Scope* names a part you
touch (`browser-view`, `simulation`, `product-foundation`, `agent-workflow`; `build-tools` only if you
touch the README), among them those the scene's earlier tasks wrote (D-04, D-39, D-42, D-62, D-122,
D-132, D-311, D-314, D-315, D-362 to D-373), the invariants of those parts, the part map entries of
those parts, and the glossary terms your words use. Name in your report every part or file you reached
that this handoff did not cover.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-content-data.md` (`src/browser/sim/data/*.ts` is game data),
`guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, and `src/browser/AGENTS.md`. Also
`guidelines/coding-simulation-module.md` only if you change a module of `src/browser/sim/` that is not
data.

Playbooks: `.claude/skills/loop2-play/SKILL.md` to run the game and see the wolf in a real browser
(required: motion and the states of the scene are checked in the running game — the run in, the
scuffle, each of the four outcomes, the first attack's stop, reduced motion — not by code inspection);
`.the-way/task-cycle/change/ui_check.md` when you reach the check of the user interface. A screenshot
is kept nowhere in the repository and its record; say where it lies (the route the foundation settles
for screenshots, D-357 and D-358) or that it was inspected and kept nowhere.

Writing entries: decisions, invariants, glossary terms, environment facts and the part map only through
the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`,
`the-way-record-environment-fact`, `the-way-update-part-map`; the styleguide part through
`the-way-maintain-styleguide` — never a personal skill of the same name. The record's own rules for
foundation text: the entries state the present and the reasoning, no origins, no pointers to notes or
to the old game's private repository, and no task names (see the recent commits of `foundations/`).

## Sources outside the repository you may read

- The LPC Wolf sheets: `the LPC Wolf folder of the predecessor game's repository` (`wolfsheet1.png` to `wolfsheet6.png`,
  `howl.png`), and the note on the old game's cutting of them, `the notes on the packs in the predecessor game's repository`
  lines 30–50 (side views on a 64 × 32 grid from `x = 320`, rows from `y = 96`: walk, run, bite, death;
  the old game mirrored at cutting). It is a private repository of the human: read it, never copy a
  path or a quotation of it into the repository or into your report beyond what is needed; the
  foundation must not point to it. The pack's own page is https://opengameart.org/content/lpc-wolf-animation
  (read 2026-11-11 by the refiners; the facts for `lpc-wolf-licence` are in *Questions to settle* of the
  task, first question, and *Settlements to record*, row 8). Reading the page yourself is optional; if
  you do and it differs, say so.
- The Smoke & Fire Animated Particle [16x16] pack file task 17 recoloured: a copy lies at
  `the Smoke & Fire pack file kept in the worktree of task 17` (64 × 64 cells:
  smoke in rows 0 and 1, fire in rows 2 and 3, per task 17's report). Copy it into an empty directory of
  your own. `assets/sprites/dust.png` is task 17's recolouring of eight smoke cells; the cloud of the
  scuffle is "from the same file" (task, *Context*) — reuse the way task 17 recoloured, and say whether
  you reuse `dust.png` or add a file.

## Things to settle in your reading, and what the orchestrator needs in the report

1. **The wolf's picture stands in the game's data** (To do 5; D-316 projected: "the picture of each
   resource, creature and archetype standing in the game's data"): the file of the creature's sprite
   is named in `src/browser/sim/data/` (the creature's data), the view names no file of the wolf. The
   test of the scene's files (`tests/view/scene-picture.test.mjs`, the one computing the files the
   drawing asks for from the data; `loop2-container-sprites` rests on it) must cover the wolf's files.
2. **Run, scuffle, outcomes** are as the task's To do 1–4 give them. The run is an effect of an
   ordinary event (D-317): at most 300 ms at every pace, an overdue one dropped, after a load in the
   combat minutes the wolf stands at once beside the mage; under the system's setting for reduced
   motion the wolf stands at once and every frame stands still; the scuffle is a lasting occupation of
   the character, not an effect (it lasts the combat minutes); the outcome is an effect of an ordinary
   event (≤ 300 ms; under reduced motion a still image for at most 300 ms). The mage turns toward the
   wolf. The wolf stands on the right of the mage, on the left when the mage stands at the right edge
   (`rightEdgeX`, 16 px). Find how the scene reads the combat's start (`attacked`), its outcome
   (`combatEnded`: `creatureDefeated`, `characterDied`, `creatureDeparted`), the completion in the
   combat minutes, and a load — and name where the previous reading of the scene is kept.
3. **First attack in the game** (To do 4, Q5): the stop at the discovery shows the wolf already beside
   the mage; the scuffle starts at „Wznów”; D-322 says the world stands still at a stop, so no motion
   during the stop. Check it in the real game (the first attack of a new game).
4. **Flashing** (D-42, D-317, WCAG 2.3.1): the scuffle has no flashes; no effect lights or darkens the
   whole area. Say in the report how you checked that (frames over time, not one image).
5. **Scale and fit**: the scene has one size, 672 × 304 px, twice its picture (D-349); the wolf's
   frames are drawn at that scale. The wolf's frames share one frame and the baseline of the mage's
   feet; the bite, the death and the run must not jump when the animation changes (compare the frames
   as the old game's note says: normalise to a common frame bottom-aligned and centred).
6. **Credits** (To do 6): the row of the wolf and the widened row of the dust, exactly in the form the
   task gives, where the credits stand today (the footer of the game and the folded „Autorzy grafiki”
   section on the login card: `src/browser/view/credits.ts`, `credit-lines.ts`, `credits-section.tsx`
   — find them). The parenthesis says how the game's files differ from the sheet, as your cut comes
   out. Task 24 (`spokojniejszy-wyglad`) is not merged: you write the rows where the credits stand
   today. The invariant `sprite-credits` is carried as the task's row 9 and *Decisions in play* say;
   check the existing test of it (`tests/invariants/…`, find by `invariant: sprite-credits`) and
   extend what the invariant's method needs.
7. **The foundation step** (To do 8): write the entries the task assigns, with the plan's additions:
   D-271, D-148, D-316 (the projected "What does the scene show, and from what does it draw?" — keep
   every sentence of the current D-316 beyond the old wording), D-317 (the projected "How long do the
   scene's effects last?" with the three planned additions, the rows 3 and 4 of *Settlements*; it must
   not contradict D-322 and D-311 as task 19 wrote them), the invariant `sprite-credits` (row 9), the
   environment fact `lpc-wolf-licence` written from the page (row 8), rows 1, 2, 5, 6, 7 as decisions
   where they belong (name which entry carries each), and the part map's External context row for the
   LPC Wolf pack (`them → us`, `untrusted`). Write the entries through the skills above, then run
   `python -B .the-way/elements/common/foundation_check.py` and report it.
8. **The styleguide** (To do 7): "The scene of a map run" in `guidelines/styleguide-browser-view.md`
   tells of the wolf and the scuffle as the task fixes them; keep the sentences task 17–19 wrote.
9. **Tests**: write them by `guidelines/testing.md`; run the focused ones you touch (`npm test -- <file>`
   as the README gives) and report each with command and exit code. A check that fails for a reason of
   the base is named, not hidden. A new PNG in `assets/sprites/` needs no refusal test (D-273).
10. **The colours**: the cloud's recolouring takes the scene's colours (the dust's palette, task 17);
    the wolf keeps the pack's own colours. Where a value no source fixes needs the human, propose it
    with its source in a comment/token line as `src/browser/AGENTS.md` says.

## Report

Write your full report to `docs/task-cycles/wilk-wbiega/reports/author-report.md` and return status
(`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line
check result, and the report's path. The report holds, besides what your method gives: the choices you
made (with the option rejected and cost if wrong), your own-work check, your weakest-point checks,
**Unread material** (what this handoff names that stayed unread or was read in part, or `none`), and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`). No
secrets, no personal data, no screenshots or diffs copied into it; name commits.
