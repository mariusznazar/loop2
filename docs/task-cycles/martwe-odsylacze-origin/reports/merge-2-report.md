# Report — the second reconciliation with the target branch (renumbering, then the merge of `origin/main`)

**Status:** done with concerns (the concerns are in "Concerns" below; none blocks the commit).

Start: `git rev-parse HEAD` = `9c65ad243881a4ed88004f0eef7844204f4b1bc6`, worktree clean, branch `task/martwe-odsylacze-origin`. `origin/main` = `20bcc58df073ab5d5ead7c6f04cd136117da08bd` (as the handoff says); merge base `4660e14a`.

## Commits

- `6b20afea` `docs: :memo: renumber the decisions of this task to D-374…D-386 to leave D-372 and D-373 to main` (part A)
- `688a16be60b2ae0556f68068b96ad33d36f8c7d0` `Merge origin/main into task/martwe-odsylacze-origin: …` (part B)

Nothing pushed. Nothing opened, committed or checked out in the vault or in `the local clone of the old game's repository`.

## A. Renumbering

- Before: `git grep -oE 'D-(37[2-9]|38[0-9])' -- . ':!.the-way' ':!.runs'` = 98 tokens in 25 files (decisions.md, invariants.md, `src/browser/styles.css`, 5 files in `src/browser/view/`, 10 in `tests/sim/`, 7 in `tests/view/`). The handoff's description held: no token of D-385 or above, no token of the form `D-1372`/`D-3720`, no variant with another dash.
- Method: one pass of a byte-exact script (`re.subn` on bytes, `(?<![A-Za-z0-9-])D-(37[2-9]|38[0-4])(?![0-9])`, +2, files read and written as bytes) — one pass, so no number is replaced twice; the order of the handoff is not needed. All files were `i/lf`. Result: 98 replacements in 25 files; `git diff --stat`: 25 files, 92 insertions and 92 deletions (equal), only files that had tokens.
- After: 98 tokens (now in D-374…D-386). Headings: …D-371, D-374…D-386 contiguous (checked before the merge); in the merged log D-371, D-372 (main's), D-373 (main's), D-374…D-386.
- `python -B .the-way/elements/common/foundation_check.py` exit 0 after the renumbering and again before the merge commit.

## B. Merge

Conflicts: `foundations/decisions.md` (5), `guidelines/styleguide-browser-view.md` (1), `src/browser/styles.css` (2), `src/browser/tokens.css` (1), plus the gitlink `.the-way` (took main's). `scene.tsx`, `scene-picture.test.mjs`, `scene.test.mjs` merged by git without conflict. No marker left (`git grep -nE '^(<<<<<<<|>>>>>>>) '` prints nothing).

### decisions.md

Rule applied: main changed no *Origin* of an existing decision, so *Origin* stays `none` (the branch's). Everything outside *Rationale*/*Rejected*/*Origin* is main's.

1. **D-132** (line ~2724): verification line `…no „Otwarte: {mapa} →”; the scene after a completion left in the tint of the required streak` is main's; binding sentence and the "complies" line merged cleanly from main; *Origin* `none`; *Rationale* is main's whole (both sides changed it); *Rejected* is the branch's (main did not touch it).
2. **D-271**: main's verification "violates" line (with the CSS shape and the frost under 3:1), *Rationale* and *Rejected* whole from main; *Origin* `none`.
3. **D-315**: main's verification lines; *Rationale* whole from main; *Origin* `none`; *Rejected* is main's (merged cleanly).
4. **D-316**: main's verification lines; *Rationale* whole from main; *Origin* `none`; *Rejected* main's (clean).
5. **End of the log**: the branch's D-371 *Rationale*/*Rejected* (main left D-371 as the base had it) and the branch's D-374…D-386 kept; main's D-372 (frost) and D-373 (flame) inserted whole between D-371 and D-374, *Origin* `none` as main has it.

### Decisions where I took main's *Rationale*/*Rejected* whole, and what the branch's version carried that main's no longer has

(Sentences of the branch's *Rationale*/*Rejected* that are absent from the merged text; the branch had moved them from vault notes. The orchestrator decides whether a follow-up slice puts them back. Computed by a sentence comparison, so a sentence the two sides word differently shows as lost.)

#### D-132

- „Teraz” gives the outcome of a map run that has ended, the cause of a death or the map's completion text, so the player reads on the screen why the map run ended.
- The „time stands still” of the screen after a completion, like that of the screen after a death, concerns that map run alone: the earning loops of the other characters go on, as they do in a pause.
- A win opens with the win and leads on to what it opened.
- The end stands in a window over the screen, which puts it where nothing that stood there before has to move, and the menu bar with the row of warnings stays above it.
- Accepted with it: the same completion text is read on the screen in a second place, as the title of the window; at a repeated completion the button says „Otwarte”, though the map was open before; the window hides the scene while it stands.

#### D-271

- *Rationale:* the packs of loop keep one style and known terms, and Pixel Crawler holds the mage, fire and trees the game's pictures show; what they ask is the cutting of frames from their sheets.
- The mage matches the game's only archetype and its frames are ready, but only for standing, running and dying: the clothed characters of the pack have no pose of gathering.
- The pack's terms ask for no credit and allow its arts to be altered, so a picture made from them may be dimmed and composed.
- The smoke of the pack Pixel Crawler is about as light as the ground and cannot be seen on it, and the pack Smoke & Fire Animated Particle holds a ready cloud in a flat style without outline, like the smoke of Pixel Crawler, that, recoloured to the browns of the scene, stands out from the ground; its licence asks for a credit, which the game gives.
- Accepted with it: credits for the pack of the dust, and frames of a bending mage made by hand or, where hand work comes out weak, generated for those few frames.
- *Rejected:* the hooded figure of loop — its sheet is the pack's rogue, though the game calls the character a mage; generated pictures as the main way — frames drift apart, which the makers of such tools name as their main problem, and the pixels need correcting by hand; any other new pack — a wider choice, but another palette and scale, new licences and more credits; for the dust of a miss: the smoke of Pixel Crawler — it cannot be seen on the ground; particles of single pixels in a brown that stands out from the ground — barely visible; a cloud drawn by hand from the pixels of Pixel Crawler — hand pixel work whose look is judged only at the request.

#### D-315

- *Rationale:* the night of the scene brightens with the streak and the solving of a map gives a full dawn, so the darkness changes while the background stays one picture, and the background in full light is that dawn.
- The night is a layer over the picture, and the scene has no night until that layer is built.
- *Rejected:* a background darkened in its file — the night would have to replace the file.

#### D-316

- The clock of the view reads the time every 200 ms, so the smoothness of motion has to come from CSS, which divides time into equal steps for the frames of the sprite and needs no clock of its own; the risk that D-03 took with React, a rebuilt node restarting a CSS animation and the figure shaking, is one this scene meets, since the screen is redrawn five times a second.
- The scene may thus show what the character's tile does not hold, which can mislead the reading of a condition such as „Tu leży mniej niż”, as the scene of loop, which did not show the tile either, could; the numbers of the stock are given by the table and the line under the map.

### Check script (decisions)

`merged` log 386 decisions, `origin/main` 373, none missing. For each decision the text before *Rationale* with the *Origin* lines left out, compared with main's: differs only for D-82, D-362 and D-374…D-386 (exactly the allowed set). Decisions whose *Origin* still names a note or a `.md` file: **D-48 only** (its allowed spec pointer, `docs/task-cycles/styleguide-loop2/spec.md`); none names a vault note. Order of headings is the same as main's (main itself has 111, 113, 112, 114).

### Other conflicts

- `guidelines/styleguide-browser-view.md` (line ~347): the branch's shortened line (`z 2026-11-02 — wybór Mariusza z tego podglądu z datą wyboru;`) kept in place of main's old text (which still named the task `przyciski-i-zakladki`, To do 7); main's new bullet about the values chosen in the task `swit-rosnacy-z-passa` kept as main wrote it (listed below).
- `src/browser/styles.css`, first conflict (comment of `.scene`, line ~1800): the branch's first paragraph (no `task scena-z-ludzikiem`) plus main's new paragraph "The layers of the scene …" as written.
- `src/browser/styles.css`, second conflict (~2000–2180): main's new rules and comments (tint, `@property --tint`, `.scene-tint`, the frost) first, then the "The scene's motion" comment with the branch's wording (no `task scena-z-ludzikiem, To do 5 and 10`).
- `src/browser/tokens.css` (line ~70): the branch's seven "Lines" tokens (sources reworded by the branch, no "settled in the task, Q11") plus main's new block "Tint of the scene's light and frost on its edges" as written.
- The comparison with `origin/main` of the rest of `styles.css` shows only the branch's removals of pointers and the renumbered decisions.

### Pin of `.the-way`

Main's gitlink `55afa8e57aa1b83c77108576a36642722e0dda15` taken. `git -C .the-way fetch origin`, `git -C .the-way checkout --detach 55afa8e5…`. `git ls-files --stage -- .the-way` = `55afa8e5…` and `git -C .the-way rev-parse HEAD` = `55afa8e5…`: agree. Main changed no installer-owned file (only the gitlink), so nothing else to take. `python -B .the-way/installation/install.py .` (preview) lists only `KEEP` lines, no change; exit 0.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` — exit 0 (`0 errors`).
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` — exit 0, `checked: 444 files, 0 listed`.
- Whole-repository S1 (`git grep -nIE '<S1 of Slice 34>' -- . ':(exclude).the-way'`) — prints no line (exit 1), so main brought in no S1 hit and the `pixel-crawler-terms` line is clean.
- Whole-repository S2 on `src tests guidelines`: 33 lines in all; the ones main added are in "New pointers" below (S2 and a wider pattern of mine).
- Decision-comparison script — see above.
- `npm test -- tests/view/scene.test.mjs` exit 0 (47 pass); `tests/view/scene-picture.test.mjs` exit 0 (50 pass); `tests/view/scene-frost-contrast.test.mjs` exit 0 (2 pass); `tests/invariants/test_browser_view_token_values.py` exit 0 (4); `test_design_token_sources.py` exit 0 (2); `test_design_token_contrast.py` exit 0 (3); `test_browser_view_focus_outline.py` exit 0 (3). `npm run typecheck` exit 0.
- The whole gate not run, as told. `eslint`/`prettier` not run (only comments and a stylesheet/token resolution; no source file with a conflict).

## New pointers main brought in (kinds this branch removes), left as main wrote them

Line numbers are those of the merged tree.

- `guidelines/styleguide-browser-view.md:349–353` — task by name `swit-rosnacy-z-passa`, "z nazwą zadania".
- `src/browser/styles.css:1807, 2001, 2009, 2035` — `task swit-rosnacy-z-passa` (four comments).
- `src/browser/tokens.css:81–87` — seven *Source* comments: "the task swit-rosnacy-z-passa … (question 3 of that task)" / "(question 10 of that task)".
- `src/browser/view/scene-picture.ts:198` — "is for the task that adds it to settle" (a task by role, not by name).
- `tests/view/scene-frost-contrast.test.mjs:32, 35, 36` — "To do 5", "in the task document (question 10, carried question 4)", "the preview … the task cites".
- `tests/view/scene-picture.test.mjs:693, 700, 792, 843, 877, 911` — task name in a heading, "To do 4/2/5/2 and 3".
- `tests/view/scene.test.mjs:1358, 1379, 1471, 1488, 1522, 1548, 1583, 1597, 1628, 1643, 1662, 1676` — task name in a heading, "To do N", "carried question 1/2", "accepted question 7".
- `foundations/decisions.md` (main's new D-372 *Rationale*, ~8430): "as the reconnaissance wanted" — a pointer in words to a note, no name. D-271 *Rationale* and D-315/D-316 *Rejected* say "chosen from the preview" (a preview of values; no file named).
- Note: the text of D-82 at `foundations/decisions.md:1686` (the decision on test comments) names "a test comment that names a task document" among what violates it; the test comments above are such comments. This is main's own conflict with its decision, not made by the merge.

## Concerns / things the handoff did not survive or did not say

1. Resolving by the handoff's rule 2 puts `Origin: none` over *Rationale* text of D-132, D-271, D-315, D-316 that no longer holds the branch's moved reasoning (list above). If the task wants the whole reasoning of those notes in the decision, these four need a follow-up edit. I did not read or move vault material.
2. Rule 2 says nothing about *Rejected* when main changed only *Rationale* (D-132): I kept the branch's *Rejected* there.
3. The handoff says the new decision of this task is "numbered D-368"; D-368 is in main's log too (the end-of-run window decision), so in the merged log it is a main decision unchanged — nothing for me to renumber.
4. The Windows console writes in ANSI; the "lost sentences" above were written to a UTF-8 file by script, so the quotes are exact.

## Own-work check

Requirement most likely not met: "nothing of main is lost; only D-82, D-362 and the renumbered decisions differ before *Rationale*". Check: the decision-comparison script against `git show origin/main:foundations/decisions.md`; it printed exactly `D-82, D-362, D-374…D-386` and `missing from merged: []`. A second check: `git diff origin/main HEAD --stat` on the scene sources and tests shows only changes in comments (the branch's removals and renumbering); the focused tests of those files pass (exit 0).

**Unread material:** none (the handoff, `change/SKILL.md`, the rules `scripts.md` and `git.md` read whole; of `plan.md` I read only the lines with S1/S2 and Slice 34's *Checks*; `task.md` and the commit `ccc03bcf` not opened — the handoff's description was enough for a merge).

**Searches not found or unclear:** none, apart from concern 3 (D-368 numbering).
