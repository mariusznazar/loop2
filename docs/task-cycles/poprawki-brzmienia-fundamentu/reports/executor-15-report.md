# Report - executor of slice 15 (the picture band in the foundation)

**Status:** done

**Commit:** `f173b6513939d0b6c1b05e15c59e33a41c23e2c1` on `task/poprawki-brzmienia-fundamentu` (base `ee68e1901e9e281bd4d1a707a8300136df8619fb`).

**Files changed** (6 files, +46 -45):
- `foundations/decisions.md` (54 lines changed: D-389, D-271, D-272, D-421, D-54, section sentence)
- `foundations/invariants.md` (1 line: `loop2-container-sprites`)
- `tests/invariants/test_loop2_container_sprites.py` (docstring, 19 lines incl. rewrap)
- `tests/view/camp-picture.test.mjs` (3 quotations)
- `tests/view/headquarters-screen.test.mjs` (4 quotations)
- `tests/view/scene-picture.test.mjs` (1 quotation)

## Items of the slice

- D-389 heading question, binding sentences, *Verification* (tests clause and the complies/violates pair), *Rationale*, *Rejected*: made. "The camp at the top of Siedziba is a band across the content" became "The picture band at the top of Siedziba stands across the content" (the new name made "is a band" say the same twice); "The camp moves as the scene does" became "The picture band moves as the scene does". "the characters at the camp", "a character being at the camp", "those at the camp", "none is at the camp" stay (the place of a character); the sentence "a camp with none shows the fire and the chest alone" became "a picture band with none at the camp shows ...". Later mentions in the same entry use "the band" where the entry already did. What the entry binds is unchanged.
- D-271 (first sentence about the pictures: "The pictures in the picture band at the top of Siedziba ..."; *Verification* tests clause and pair; *Rationale*; *Rejected*): made.
- D-272 *Verification* tests clause ("the picture band at the top of Siedziba, the band over the screen's panel"): made. Its binding sentence says "a band at the top of Siedziba" and had no "camp": nothing to change.
- D-421 (the two mentions of the animation of the frames "of the camp"): made, "of the picture band".
- D-54 *Verification* ("in the picture band of Siedziba"): made.
- Sentence of the section "Screen Mapy and Siedziba" ("and the picture band at the top of Siedziba."): made.
- Invariant `loop2-container-sprites`: made ("the picture band's drawing"); `Derives from`, `Method`, `Part` untouched.
- Quotations that the new wording broke (rule 4): made in the three test files named in *Change*: D-389 x7 (`camp-picture.test.mjs:107,117`, `headquarters-screen.test.mjs:701,702,725,761`, `scene-picture.test.mjs:1621`) and D-271 x1 (`camp-picture.test.mjs:94`). No such line stood in a file outside *Change*.
- Docstring of `tests/invariants/test_loop2_container_sprites.py` says what the invariant now says: made (the first sentence, the reading, the "Does NOT cover" line; four places).
- Glossary: no entry added (as the slice says); the entry `at the camp` already has "the picture band at the top of the headquarters" in its *Not* and stays.

## Own-work check

Requirement most likely missed: "camp" means in the foundation only where a character is. Check: `git grep -n -w camp -- foundations/` after the edit. Result: matches only in D-389 lines 9761-9766 and 9780 ("characters at the camp", "a character being at the camp", "those at the camp", "a picture band with none at the camp", "where none is at the camp") and in the glossary entries `headquarters` (*Not*) and `at the camp`. All are the place of a character. No `-i` match without `-w` beyond `campfire` and `campDrawing` (a code name, Slice 16's concern).

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the edits, before the quotations: exit 1, 8 errors (the 8 quotations above) - the expected failure; after the quotations: `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`. Six `listed:` lines, all from earlier slices, none from this one: `account-server-runtime` (tests/invariants/test_account_server_runtime.py), `terrain-drawing-numbers` (tests/invariants/test_terrain_drawing_numbers.py), `player-opaque-session-cookie` (tests/transport.test.mjs), `trip-plan-progress` (tests/sim/trip.test.mjs), `loop-run-knowledge` (tests/sim/catch-up.test.mjs, tests/sim/loop.test.mjs), `sprite-credits` (tests/view/icons.test.mjs). `loop2-container-sprites` is not listed, since its test file changed.
- `npm test -- tests/view/camp-picture.test.mjs`: exit 0, 7 pass.
- `npm test -- tests/view/headquarters-screen.test.mjs`: exit 0, 28 pass.
- `npm test -- tests/view/scene-picture.test.mjs`: exit 0, 71 pass.
- `npm test -- tests/invariants/test_loop2_container_sprites.py`: exit 0, `Ran 1 test ... OK`. A Docker daemon answered (`docker info` exit 0) and the test built the image and ran the container, so it was not skipped. The change to this file is a docstring alone, so I did not break the behaviour to see it fail (no invariant's test changed in code).
- `npx prettier --check` on the three `.mjs` files: exit 0.
- `git grep -n -w camp -- foundations/`: as above.
- Not run: the full gate (`npm test` with no file), as the handoff says.

## Choices

- The binding sentence of D-389 "is a band across the content" became "stands across the content": the rejected way, "The picture band at the top of Siedziba is a band across", repeats the word; "is a strip" would change a word the entry uses nowhere else. Cost if wrong: the quotation in `headquarters-screen.test.mjs:701,761` and `scene-picture.test.mjs:1621` would follow the first words again; nothing is bound differently.
- The sentence in D-271 "The pictures of the camp at the top" became "The pictures in the picture band at the top" ("of the picture band" would read "pictures of the picture band").
- In D-389 *Rationale*, "a picture of the camp at its top" became "a picture band at its top"; the entry's reason (a picture where nothing is to be read) is unchanged.

## Concerns for the next slice

- `tests/invariants/test_loop2_container_sprites.py:14-15` quotes the case name "every file the scene's and the camp's data name stands directly in assets/sprites/ as a .png file" of `tests/view/scene-picture.test.mjs:503`; I left it as the case name stands today (names of tests are Slice 16's). Where Slice 16 renames that test case, this quotation in the docstring must follow it.
- Long lines: a few wrapped lines of D-389 and D-271 are 113-128 characters after the replacement (the entries wrap near 100); I did not rewrap them, since the check does not read the wrap.

## Reaches beyond the handoff

- `the author's global rules file scripts.md` and `git.md` (the user's global rules, loaded by a hook) - read before writing a script and before the commit.
- `.the-way/elements/decisions/template.md` sections "Changing a decision" and "Verification", `.the-way/elements/common/way_of_working.md` lines 1-80, `.the-way/task-cycle/change/slice.md` - to apply rule 2 and rule 4.

## Working copies

`.runs/executor-15/` of the worktree held two edit scripts and the outputs of the checks; removed (`.runs/` now holds `npm-ci.log` and `task-cycles/` only). No other copy was made.

## Unread material

- `.the-way/elements/decisions/template.md` read in part (lines 1-80 not read; read 172-268), `.the-way/elements/invariants/template.md` not read, `.the-way/elements/common/way_of_working.md` read lines 1-80 of 189.
- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `foundations/glossary.md` (only lines 80-100 read): not read whole; the slice changes no code and no test logic, only wording of comments and quotations.
- `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` and the task passages: read through the handoff's copies and the task lines 80-90 and 188-198; the plan file itself not opened.
- Entries of the foundation: D-389, D-271, D-272, D-421 (its first paragraph and *Verification*), D-54, the section sentence and the invariant, read whole.

## Searches not found or unclear

- none
