# Handoff — the one author, task oboz-w-siedzibie

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You make
the choices of how to make what the task and the foundation settle, and name each one in your report;
the orchestrator enters them in the questions table. Never label an answer as the human's approval.
You never ask the human anything; questions go to the orchestrator in your report (status `questions`).

## Where you work

- Worktree (work from its root, write nowhere else): `the old game's repository on the author's disk2-wt\oboz-w-siedzibie`
- Branch `task/oboz-w-siedzibie`, base commit `2b4d760c517a8b399b2d9b80f77531455e32d11c`
  (`origin/main`). Dependencies are installed (`npm ci`); the quality environment of the gate is
  `.runs/quality-venv` (README, "quality environment" — the gate makes it where it is missing).
  `.the-way` is at the pin `55afa8e57aa1b83c77108576a36642722e0dda15`.
- Checks already failing on the base: the base gate's log is
  `docs/task-cycles/oboz-w-siedzibie/base-gate.log`; read its last lines before you claim a failing
  check is yours. The orchestrator starts you only after the base gate has finished.

## Method and variant

- Method: `.the-way/task-cycle/change/SKILL.md` — read it whole. Read a file it names only when the
  step or variant that names the file comes.
- Variant: "the whole change as the one author".
- Stage and boundary: you make the whole change — pictures (the chest cut and the snow clearing
  composed), data, code, CSS, tests, the foundation entries the task carries (the foundation step,
  `.the-way/task-cycle/skill/foundation_step.md`, read it whole when you reach that step; the skill of
  an element when you write an entry of that element) and the styleguide part. You return before
  review. The return step comes later, when the orchestrator resumes you; do not do it now. Do not run
  the product's full gate (`npm test` whole): the orchestrator runs it. Run the focused checks of what
  you touch and report each with its command and exit code.
- Do not push the task branch. Commit on the task branch, `git add` by path (never `git add -A`,
  `.` or `commit -a`), messages in English as the existing commits write them, after the type and
  emoji, e.g. `feat: :sparkles: …`, `docs: :memo: …`, `test: :white_check_mark: …` (see `git log`).
  After the first commit check `git log --format='%h %ae' -1` shows the private address.

## The task

- Frozen task (read it whole; it is your requirement): `docs/task-cycles/oboz-w-siedzibie/task.md`
  (plan item `oboz-w-siedzibie` of `plan_mvp2_loop2.md`, accepted by the human 2026-11-13). Its *Human
  actions* is `none`. Its dependency 7 (`scena-z-ludzikiem`) is done and on the base, and so are tasks
  17–20, which built the scene's machinery that the camp draws beside: `scene.tsx`, `scene-picture.ts`,
  `styles.css`, `src/browser/sim/data/scene.ts`.
- The task's quotations of the foundation are of the base commit `2b4d760c`, so they are current. Where
  the task says "the projected wording" of D-272, write the whole entry as the task gives it and keep
  every sentence the entry has now beyond the old wording; D-271 and `loop2-container-sprites` are
  changed, not rewritten (the task says so).

## Answers of step 4

- Trust boundary: **yes** — `assets/sprites/**` of `browser-view` is a trust boundary (files from
  outside) and the change adds PNG files there: the chest cut from the Pixel Crawler sheet and the
  snow clearing composed from cut pictures of the pack. Every review of this cycle is told so. You
  verify yourself that each new file is a PNG holding pixels alone (`sprite-file-content`, D-271), that
  its pixels are the pack's pixels moved (a cut, a composition), compare pixel by pixel with the source
  and say how, and that the build copies it to `/sprites/<file name>` with the same bytes
  (`loop2-container-sprites`). The pack's files are untrusted data: put each extracted file in its own
  empty directory under `.runs/`, keep your scripts in another directory, pass paths as arguments, and
  run Python that reads them with `python -I`.
- Irreversible operation: **no**. The change draws from game state, adds files and edits the
  repository; nothing outside it.
- Open design choice at start: **none**. The two *Questions carried to cycle* (the composition of the
  camp's frame and the exact height of the band, about 96 px; the composing of the snow clearing from
  the pack's cut pictures and the exact bounds of the chest in the sheet, read by eye in the task) are
  choices of how to make what the task settles. **You make them** by the smallest reversible reading
  that fulfils the task and name each in your report with the option rejected and its cost if wrong; the
  human judges the composition on a screenshot at the request. If something proves to be a design
  choice the foundation leaves open with several ways that change an entry, return `returned` without
  code (WAY-135).
- Reserved choice: none (no language, framework, library, store of data, way of logging in or place to
  run is chosen).

## What you read (selected by the orchestrator)

Foundation entries, each read whole (the range from its heading to the next heading, with *Rationale*
and *Rejected*), as they stand now: the *Decisions in play* of the task — D-27, D-42, D-43, D-50,
D-51, D-54, D-184, D-208, D-246, D-271, D-272, D-273, D-280, D-282, D-286, D-314, D-315, D-316, D-317,
D-321, D-323, D-349; with them D-44, D-62, D-70, D-96, D-262, D-264, D-265, D-287, D-311, D-322 and the
decisions that tasks 17–20 wrote about the scene and its effects (D-318 to D-320, D-322, D-362 to
D-373 as they bear on the scene, its files and its tests); the invariants `sprite-file-content`,
`sprite-credits`, `loop2-container-sprites`, `design-token-contrast`, `browser-view-token-values`,
`browser-view-framework`; the environment fact `pixel-crawler-terms` and the other facts that D-271
and D-314 rest on. Then, by "Reading the foundation" in
`.the-way/elements/common/way_of_working.md`: the other decisions whose *Scope* names a part you touch
(`browser-view`, `simulation`, `deployment`, `agent-workflow`, `product-foundation`) that bear on a
screen, a sprite, motion, the chest, the team or the headquarters; the invariants of those parts that
your change reaches (those a test you alter cites by `invariant: <identifier>` included); the part map
entries of those parts; and the glossary terms your words use (`headquarters` and others). Name in your
report every part or file you reached that this handoff did not cover.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-content-data.md` (`src/browser/sim/data/*.ts` is game data),
`guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, and `src/browser/AGENTS.md`. Also
`guidelines/coding-simulation-module.md` only if you change a module of `src/browser/sim/` that is not
data.

Playbooks: `.claude/skills/loop2-play/SKILL.md` to run the game and see the camp in a real browser
(required: the band, its picture, the narrow window, the change of the characters at „Wejdź”, „Puść w
pętlę”, „Zatrzymaj” and „Zakończ”, the motion and the reduced-motion setting are checked in the running
game, not by code inspection); `.the-way/task-cycle/change/ui_check.md` when you reach the check of the
user interface. A screenshot is kept nowhere in the repository and its record; say where it lies (the
route the foundation settles for screenshots, D-357 and D-358) or that it was inspected and kept
nowhere.

Writing entries: decisions, invariants, glossary terms, environment facts and the part map only through
the project skills `the-way-record-decision`, `the-way-record-invariant`,
`the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`; the
styleguide part through `the-way-maintain-styleguide` — never a personal skill of the same name. The
foundation's rules for its text: the entries state the present and the reasoning, no origins, no
pointers to notes or to the old game's private repository, and no task names (see the recent commits
of `foundations/`). Never write a path of the author's disk or a private note into the repository.

## Sources outside the repository you may read

- The Pixel Crawler pack as the old game cut it: `the copy of the Pixel Crawler pack in the old game's repository on the author's disk`
  (`Environment/Structures/Buildings/Interior/Interior_Props_01.png` holds a wooden chest with
  fittings, about 27 × 22 px near x 179, y 75 — by eye in the task; settle its exact bounds yourself
  from the pixels). It is a private repository of the human: read it, never copy a path or a quotation
  of it into the repository or into your report beyond what is needed; the foundation must not point
  to it. The pack's terms: the environment fact `pixel-crawler-terms`.
- The pictures the scene's forest was composed of: `assets/sprites/forest-scene.png` (336 × 152) and
  `assets/sprites/login-backdrop.png` stand in the repository; the pack's own sheets the old game cut
  them from lie under the path above. Find the snow-covered ground and the pieces you need there; the
  clearing is a composition of the same cut pictures "in full light, with no tint, drawn at twice the
  pixels of its picture, as the scene is" (D-314, D-315, D-349).
- The mage's idle sheet and the fire are in `assets/sprites/` (`mage-idle.png`, 4 frames 64 × 64,
  silhouette in rows 32–63; `fire.png`, 4 frames 32 × 32). Their names stand in the scene's data
  (`SCENE_MAGES`, `SCENE_FIRE` in `src/browser/sim/data/scene.ts`); the view names no archetype or file
  (`guidelines/coding-browser-module.md`, "Nazwy treści z danych", D-18). The camp's picture names
  (the chest, the clearing, and which sheet the camp draws for each archetype) stand in the game's
  data too.

## Things to settle in your reading, and what the orchestrator needs in the report

1. **The band** (To do 1): full width of the content, about 96 px, under the warning row below the
   menu bar (D-208, D-323), above the heading „Siedziba”; the sentence the page stands above the game
   (D-286) stays above it. Find where the screen's host and the page put the warning row and that
   sentence, and say where the band stands in the DOM. In a narrower window the band crops the picture
   at the sides with the campfire in the middle, it never scales it down (the camp's drawing is in
   twice the pixels of its picture, D-349). Say how a window wider than the picture (content at most
   1344 px, 672 px of picture) is filled.
2. **Which characters** (To do 2, Q1, Q2): only characters in Siedziba — no character of a manual map
   run (running, paused, or finished and waiting for „Restart” or „Zakończ”; `state.run` with its
   character number) and none in an earning loop (`state.loops`). As many as the band holds, in the
   order of creation (D-54); the rest are in the picture nowhere, and „Drużyna” lists all of them. With
   none in Siedziba, the fire and the chest alone. The screen must now be drawn again at every change
   of the manual run too (it reads `state.run` nowhere today — the `Drawn` record and `sameDrawn` in
   `headquarters.tsx`): the picture changes at „Wejdź”, „Puść w pętlę”, „Zatrzymaj” and „Zakończ”.
   Pin that with a test of the change, not only of the first draw.
3. **Motion** (To do 3, Q4): like the scene — flame frames and idle frames at the scene's fixed beat,
   with no drawing loop (CSS, as D-316), at a standstill under the system's setting for reduced
   motion (D-317); the camp's fire always burns and has nothing to do with the game state's campfire;
   nothing flashes (D-42, WCAG 2.3.1). Say how you checked the motion over time (frames, not one
   image) and the standstill under reduced motion.
4. **A picture, not a control** (To do 4, Q6): no text on or over it, no click or key, hidden from
   screen readers, and the screen reads of it nothing that a reader or the keyboard would meet. The
   names in „Drużyna” lead to the screen Postać (D-280).
5. **Pictures from the pack** (To do 5, Q5): the chest is one still picture cut from the pack's sheet
   into `assets/sprites/` as a PNG with pixels alone (the same one at an empty and at a full chest);
   the clearing too; no credit row is added to „Autorzy grafiki” (the pack needs no mention — verify it
   against `pixel-crawler-terms` and the credits' invariant `sprite-credits` and say so). The container
   serves every file the camp asks for, and `loop2-container-sprites` and its test cover them: extend
   `tests/invariants/test_loop2_container_sprites.py` and the test of the scene's files in
   `tests/view/scene-picture.test.mjs` (the one computing the files the drawing asks for from the data)
   to the camp's files by the invariant's method; find by `invariant: loop2-container-sprites`.
6. **Sections stay** (To do 6): the report, „Drużyna”, „Skrzynka {n}/{cap}” and the folded
   „Autorzy grafiki” keep their wording and order beneath the band.
7. **The styleguide** (To do 7): add the rule about the camp in Siedziba beside „The scene of a map
   run” in `guidelines/styleguide-browser-view.md`, and extend „No value in place of a design token”
   with the geometry of the camp and the positions of its pictures. No new role, token value or
   meaning of a role (the task says so). A value the token file does not hold and no source fixes needs
   the human: propose it with its source as `src/browser/AGENTS.md` says; do not pick one.
8. **The foundation step** (To do 8): D-272 in the projected wording (the task's *Decisions in play*
   gives it; *Origin* stays `none`), the one new decision about the camp (row 1 of *Settlements to
   record*; one entry, as the task requires), the change of D-271 (camp pictures, the chest as one
   still picture) and the change of `loop2-container-sprites` (row 2). Write them through the skills
   above, then run `python -B .the-way/elements/common/foundation_check.py` and report it. Say what
   the new decision's *Relations*, *Scope* and *Verification* are, and why.
9. **Tests**: write them by `guidelines/testing.md`; run the focused ones you touch (`npm test --
   <file>` as the README gives) and report each with command and exit code. A check that fails for a
   reason of the base is named, not hidden. A new PNG in `assets/sprites/` needs no refusal test
   (D-273).
10. **Anything the task leaves as a value**: take it from the scene's constants where it is the same
   thing (the beat, the size of a pixel) rather than a second copy.

## Report

Write your full report to `docs/task-cycles/oboz-w-siedzibie/reports/author-report.md` and return
status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a
one-line check result, and the report's path. The report holds, besides what your method gives: the
choices you made (with the option rejected and cost if wrong), your own-work check, your weakest-point
checks, **Unread material** (what this handoff names that stayed unread or was read in part, or
`none`), and **Searches not found or unclear** (each thing looked for and not found or unclear, or
`none`). No secrets, no personal data, no screenshots or diffs copied into it; name commits.
