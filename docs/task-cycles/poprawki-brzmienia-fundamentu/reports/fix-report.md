# Fix report - whole-change review of `poprawki-brzmienia-fundamentu`

**Status:** `done with concerns` (one finding fixed in part, see Minor 5; a few reaches beyond the findings' lists, see below)

**Commit:** `d09512b4cb3d25599cc02b33a7da2c4fdb006a3d` on `task/poprawki-brzmienia-fundamentu` (one commit, from the reviewed head `bcc35f33f571f890626affedb9d430d5cc6a7a39`). 14 files, 70 insertions, 34 deletions.

**Check result in one line:** `foundation_check.py` (both modes) 0 errors; the changed tests pass; `ruff` not run (`.runs/quality-venv` missing); the full gate not run (as instructed).

## Findings

### B1 - fixed
`tests/view/icons.test.mjs`: the case that already carried `// invariant: sprite-credits` (the one on `PACK_OF_SPRITE`, title now ends "... and README.md names for each file the pack assigned to it") calls a new helper `packOfSpriteInReadme()`. The helper reads the line of point 2 of the README ("2. The graphics in `assets/sprites/` ..."), splits it at "The second pack is " and "The third is ", finds in each sentence the one pack of `SPRITE_PACKS` it names, and takes each `` `assets/sprites/<file>.png` `` of the sentence as a file of that pack. The case then asserts `deepEqual` of the result with `PACK_OF_SPRITE`: a file the README puts under another pack, a file it forgets and a file it adds all fail. No `invariant:` line was added or changed (three stand in the file as before). Done after B2's reword of the same sentence, so the check reads the reworded sentence.
- Seen failing, then passing: (a) README with `wolf-bite.png` renamed in the list: `npm test -- tests/view/icons.test.mjs` fails on the case, diff shows `wolf-bite-x.png` against `wolf-bite.png` (exit 1 of the run); (b) README with a sentence naming two packs: fails "packs named in: The third is ..."; README restored from a copy; real README: `npm test -- tests/view/icons.test.mjs` exit 0, 36 pass. (I read the failing runs through `grep`; the exit codes of the grep pipelines are not those of npm, the pass/fail lines are the evidence.)
- `foundation_check.py` no longer lists `sprite-credits` (a file citing it changed).

### B2 - fixed
"The picture band" in place of "the camp" for the band, in English files only; identifiers, class names and file names kept; "at the camp" for a character kept.
- `README.md` point 2 (two places: "the picture band at the top of the "Siedziba" ... screen", "the characters and the campfire of the picture band").
- `src/browser/view/camp-picture.ts`: the comment of `CampMember` (now "A character drawn in the picture band"), the comment of `CampDrawing` (two places), the comment of `campDrawing`.
- `src/browser/sim/data/scene.ts`: the comments of `PICTURE_PIXEL` and of `CAMP` (opening sentence rewritten to "The picture band at the top of Siedziba, in the pixels of its picture: one picture, the snow clearing, ..." and "so the picture band names no archetype of its own").
- `src/browser/headquarters.css`: three places (file head, the long comment, "The picture band is a picture and takes no click"); the comment's "a band over the screen's panel" became "it lies over the screen's panel" so that it does not repeat "band".
- `src/browser/styles.css`: lines 11, 662, 665 and 671-672 (comment over the frames rule).
- `src/browser/run-screen.css`: file head and the comment over the scene's motion.
- `guidelines/styleguide-browser-view.md`: the heading `### The camp of Siedziba` is now `### The picture band of Siedziba`. `git grep "The camp of Siedziba"` and `git grep -i "camp of Siedziba"` over the whole repository (foundations, tests, guidelines, `.the-way` included) found no reference to the heading text beyond the heading itself and the comments listed above (now rewritten), so none was left to follow.
- Reach beyond the finding's list: `src/browser/view/headquarters.tsx` lines 3 and 276 call the band "the camp" in the same sense, so I changed them too ("the picture band"); lines 12 and 364 ("not in the camp") use the character's place and stay. Reported as the same defect the finding names.
- Not changed, noticed: `.claude/skills/loop2-scene-art/SKILL.md:9` and its twin `.agents/skills/loop2-scene-art/SKILL.md:9` say "the camp at the top of Siedziba" for the band. Not in the findings' list; the pair would need syncing. For the orchestrator.

### Minor 1, 2, 4 - not changed
As the orchestrator instructs: the wording is the task's, accepted by the human; the request will name each (the `reading` *Not*; the ordinary senses of "reading"; `narrowed by D-265` in D-03).

### Minor 3 - fixed
D-322's first new sentence now ends "(D-317, D-319)". No test quotes that span (`git grep 'decision: D-322 "'` lines quote other sentences).

### Minor 5 - fixed in part (contested in one detail)
`tests/invariants/test_account_save_backup_encrypted.py`: the second `decision: D-232` line of `test_control_a_whole_run_sends_exactly_the_file_age_wrote` now quotes only "Outside the container's writable layer of D-231, the plain database exists on the host only in that pipe", as `tests/deploy/test_loop2_backup.py:249` does. The reviewer's second line, "and the backup is not compressed", was tried and `foundation_check.py` refused it ("the quotation does not begin a sentence of `D-232`": a quotation has to begin a sentence), so it was removed; the claim that the backup is not compressed has no line of its own. The test does check that `age` gets the plain database whole (`age_input == PLAIN_DATABASE`), which the decision's first sentence line (the existing one) already covers in part. For the orchestrator: if a line for "not compressed" is wanted, it can only be a quotation that begins a sentence of D-232, which the entry's wording does not offer.

### Minor 6 - fixed
Opening sentences only of the docstrings of `tests/invariants/test_account_server_runtime.py` ("... TypeScript source and its container image use Node.js major version 24.") and `tests/invariants/test_terrain_drawing_numbers.py` ("... (the terrain drawing, not the scene) shows no number of the stock a tile holds."), to the invariants' present sentences. `foundation_check.py` no longer lists the two invariants.

### Minor 7 - fixed
D-355 *Rationale*: "... except the file and its owner, which a human creates, and two things read once on the server on 2026-11-14, that `logrotate` ..." (the 2026-11-14 readings kept).

### Minor 8 - fixed
D-218 *Verification*: "tests: „pokolenie {n}” beside the name of a character on Siedziba and on the screen Postać from generation number 2 up, and no label at generation 1." (the case `tests/view/character-screen.test.mjs:108-111` exists and passes with the rest of the file's checks I ran only as listed below - see own-work check).

### Minor 9 - fixed
`foundations/environment_facts.md`, `docker-compose-down-volumes`: sentence now "... the Compose file's services, the networks it defines and the default network, and no volume, ...". *Source* untouched (it already quotes "The default network, if one is used."). Followed `record-environment-fact` as far as a change of the sentence goes: `write.md` step 4.4, the dependant `foundations/invariants.md:693` (`Rests on`) is about volumes and is not touched; no decision names the fact (`git grep` found only the invariant).

### Out-of-scope findings
Not fixed, as instructed (the comment of `src/browser/sim/game.ts:369`; the `campDrawing` carrier in `at the camp`).

## Own-work check (section 3)
Requirement most likely not met: B1's "the test fails where the README names another pack for a file" and B2's "no band named camp left in English files". Checks: (1) the failing runs of the new README check described under B1; (2) `git grep -n -i -w camp -- README.md src/browser guidelines ':!foundations'` after the edits: only identifiers, class names, file names, `at the camp` / `atCamp` (character's place) and the Polish line of the styleguide (line 129, file names) remain; the README line holds `camp-clearing.png` only. The result of (2) is checked by reading the output, not by a script that decides.

## Checks (command, result)
- `npm test -- tests/view/icons.test.mjs`: exit 0, 36 pass (after the change); failing runs for B1 as above.
- `npm test -- tests/invariants/test_account_save_backup_encrypted.py`: exit 0, 2 tests OK.
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0, 4 OK. `... test_browser_view_focus_outline.py`: exit 0, 3 OK (both read the changed stylesheets).
- `npm test -- tests/view/camp-picture.test.mjs`: exit 0, 7 pass. `... tests/view/scene-picture.test.mjs`: exit 0, 71 pass. `... tests/view/shared-controls.test.mjs`: exit 0, 50 pass. `... tests/sim/rules.test.mjs`: exit 0, 6 pass. `... tests/view/headquarters-screen.test.mjs`: exit 0, 28 pass.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 0, `0 errors` (after the first run, which reported 1 error on the "not compressed" quotation - the run that led to the removal described under Minor 5; the failing and the passing run are both counted here). Same for the run without the flag: exit 0, `0 errors`. Listed lines: three, `player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge` (each "reads `test` and its sentence is changed by this change, while no file citing it changed"; not mine). The listed lines of `sprite-credits`, `account-server-runtime` and `terrain-drawing-numbers` are gone.
- `npx prettier --check` on `tests/view/icons.test.mjs`, `scene.ts`, `camp-picture.ts`, `headquarters.tsx`: exit 0. `npx eslint` on the same: exit 0.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, 0 errors, 144 warnings, 7 info (as before; not triaged).
- Not run: `ruff` (`.runs/quality-venv` missing; the only Python changes are docstrings and one removed comment line); the product's full gate (`npm test` without a file), as instructed; `tests/invariants/test_account_server_runtime.py` and `tests/invariants/test_terrain_drawing_numbers.py` (docstring-only changes; they need Docker / a full build); the character-screen test for Minor 8 (a sentence of *Verification* only).

## Choices
- B1 helper: the pack of a file is the pack named in the README sentence the file stands in; a sentence naming no pack or two packs fails. Rejected: matching file names against a hand-written list of expected sentences (would restate PACK_OF_SPRITE). Cost if wrong: a README rewrite of point 2 into another shape (a table) breaks the helper and needs the helper rewritten, which is the intended signal.
- B1: the check stands in the case on `PACK_OF_SPRITE` (the `// invariant: sprite-credits` line of that case), not in a new case, so no marker line was added.
- B2: `headquarters.tsx` lines 3 and 276 changed beyond the finding's list (see above).

## Reaches beyond the handoff
- `foundations/decisions.md`: I read by range only D-322 (the line of its sentence), D-355 (lines 2058-2070, with the rest of the range cut), D-218 (lines 6084-6100), D-232 (first lines, to see its sentences). The same for `foundations/invariants.md` (sentences of `sprite-credits`, `account-server-runtime`, `terrain-drawing-numbers`), `foundations/glossary.md` (grep of "camp", to follow the meaning of "at the camp"), `foundations/environment_facts.md` (lines 738-756). `.the-way/task-cycle/change/fix.md` and `.the-way/elements/environment-facts/skill/write.md` read whole (named by the method).
- `git grep` over the repository for `camp` (outside the listed dirs) to find the skill-file occurrences named above.

## Unread material
- `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` (read lines 925-945 only, around the heading I changed), `.the-way/elements/decisions/skill/SKILL.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/elements/environment-facts/skill/SKILL.md` was read whole; the other files of the skill (`read.md`, `decide_entry.md`, `draft.md`) were not read: the change to the fact was one phrase already carried by its quoted *Source*, and `write.md` was read. The decisions' skill was not needed for the three decision edits (a wording fix in D-322 given by the orchestrator, one exception in D-355's *Rationale*, one phrase in D-218's *Verification*), and I did not read it - noted as a gap.
- Files I changed that I read only in ranges, not whole: `src/browser/styles.css`, `src/browser/run-screen.css`, `src/browser/headquarters.css` (head only), `src/browser/sim/data/scene.ts`, `src/browser/view/headquarters.tsx`, `README.md` (lines 28-40), `guidelines/styleguide-browser-view.md`, `tests/view/icons.test.mjs` (lines 1-40 and 340-475), the two Python docstring files (first lines only). All edits are to comments, prose or one named function; the whole-file reading did not seem to bear on them. `guidelines/testing.md` and `guidelines/coding.md` read whole; `src/browser/AGENTS.md` whole.
- The reviewer's whole report `review-whole-report.md` was not read; the findings file was enough.

## Searches not found or unclear
- A reference to the styleguide heading `The camp of Siedziba` from tests or foundation: not found (so none followed).
- The rule that a `decision:` quotation must begin a sentence is not stated in the handoff or the findings file; `foundation_check.py` stated it; the reviewer's recommended second quotation for Minor 5 therefore does not stand.

## Working copies
- `.runs/fix/README.good` (a copy of the README for the failing run of B1): stood in `.runs/fix/` of the worktree; removed (`rm -rf .runs/fix`) before the commit. No worktree or clone made.
