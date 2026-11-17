# Executor report - slice 16 "The picture band in the code's comments and the tests' names"

- **Status:** done
- **Commit:** `c37e2d4e` on `task/poprawki-brzmienia-fundamentu` (slice base `f173b6513939d0b6c1b05e15c59e33a41c23e2c1`)
- **Check result:** all four focused checks passed; `foundation_check.py` 0 errors (6 `listed:` lines, see below); nothing failed or was left unrun among the slice's checks.
- **Report path:** `.runs\task-cycles\poprawki-brzmienia-fundamentu\reports\executor-16-report.md`

## Files changed

| File | Lines added | Lines removed |
|---|---|---|
| `src/browser/view/camp.tsx` | 3 | 3 |
| `tests/view/camp-picture.test.mjs` | 12 | 12 |
| `tests/view/headquarters-screen.test.mjs` | 12 | 12 |
| `tests/view/scene-picture.test.mjs` | 4 | 4 |
| `tests/invariants/test_loop2_container_sprites.py` (docstring line 15 only, added by the orchestrator's addition) | 1 | 1 |
| **Total** | **32** | **32** |

The commit touches these five files only. Nothing under `foundations/`, `guidelines/`, `src/` other than `camp.tsx`, or the plan and task files was changed.

## Items of the slice

1. **`src/browser/view/camp.tsx` comments** - made. Header line 2 "The camp at the top of Siedziba" -> "The picture band at the top of Siedziba"; line 19 "The camp is a picture" -> "The picture band is a picture"; line 70 doc of `Camp` "The camp of the game state" -> "The picture band of the game state". Kept: "the characters at the camp" (line 4, a character), and the identifiers `Camp`, `campDrawing`, `camp` variables and the CSS classes `camp*`.
2. **`tests/view/camp-picture.test.mjs`** - made. Comments: line 1 (file header), 31-32, 46, 92, 104-105, 114. Test titles: "a team with nobody at the camp: the picture band shows the fire and the chest alone"; "only the characters at the camp stand in the picture band, in the order of creation" (the phrase "at the camp" for a character kept); "the picture band draws as many characters as the widest band holds, the first in the order of creation"; "the fire of the picture band is the burning fire in its frames, whatever the game state holds". Kept: comment line 63 "so it is not at the camp" (a character).
3. **`tests/view/headquarters-screen.test.mjs`** - made. Section heading "--- the picture band ---" (line 688), comments at 690, 721-723, 757, 780-782, 805; test titles at 700 ("the picture band stands over the panel of the screen..."), 724 ("the picture band is a picture: ..."), 760 ("the picture band is drawn at twice the pixels..."), 783 ("the picture band follows the manual map run and the earning loops, ..."). Kept: the variable `camp`, `campMembers`, the `.camp*` selectors, and "out of the camp" / "in the camp" at line 794 (characters).
4. **`tests/view/scene-picture.test.mjs`** - made. Title at line 503 "every file the scene's and the picture band's data name stands directly in assets/sprites/ as a .png file" and its comment at 504 ("What the picture band's drawing asks for ... at the camp" - the phrase "at the camp" for a character kept). Also, in the same file, the comment at 1614 "The picture band's two files ..." and the title at 1617 "the picture band's files hold pixels alone, in the size of the data" (this title speaks of the band, so it was renamed too; a choice, see below). Identifiers `CAMP`, `camp` variables kept.
5. **Invariant docstring quotation** (`tests/invariants/test_loop2_container_sprites.py` lines 14-16, the orchestrator's addition) - made. The quotation now reads "every file the scene's and the picture band's data name stands directly in assets/sprites/ as a .png file", which equals the renamed title character for character.
6. **Items not listed in the slice, found by the grep and not changed** - see the list below.

## Other places in `src/` and `README.md` that still call the band "the camp" (not changed, outside the slice's *Change*)

Each is a band-call, not a character-call. Character uses ("at the camp" for a character, "not in the camp" of a character) are left out of the list.

- `src/browser/headquarters.css:2` ("the camp at the top"), `:4` ("the frames of the camp's characters and fire"), `:12` ("The camp at the top of Siedziba"), `:23` ("The camp is a picture and takes no click").
- `src/browser/run-screen.css:6` ("the sprites of the scene and of the camp"), `:1135` ("because the camp of Siedziba runs its frames").
- `src/browser/styles.css:11` ("the camp of Siedziba"), `:662` ("the camp of Siedziba"), `:665` ("the camp's characters and fire of Siedziba"), `:671` ("The camp's fire and the idle sheet of each character in it"), `:672` ("since the camp's fire has no state; its chest is one frame").
- `src/browser/sim/data/scene.ts:39` ("the camp's 672 × 48 clearing"), `:308` ("The camp at the top of Siedziba"), `:317` ("so the camp names no archetype of its own"). The constant `CAMP` (line 324) keeps its name.
- `src/browser/view/camp-picture.ts:14` ("The camp of Siedziba as plain data for drawing"), `:15` ("the pixels of the camp's pictures"), `:68` ("The camp of the state: ..."). Lines 7, 25, 60 and 62 speak of characters and stay.
- `src/browser/view/headquarters.tsx:3` ("the camp, a picture of the campfire ...") and `:276` ("the camp over the panel"). Lines 4, 12 and 364 speak of characters and stay.
- `README.md:34` - two band-calls: "the camp at the top of the "Siedziba" ("Headquarters") screen" and "the characters and the campfire of the camp".

Outside `src/` and `README.md`, the guideline `guidelines/styleguide-browser-view.md` has the section heading "The camp of Siedziba" and its body, and `src/browser/view/camp-picture.ts` (see above) is the file the slice names as read only. A Polish word "obóz" for the band was searched in `src/` and `README.md` and not found.

## Own-work check

- **Requirement:** the slice changes only comments and test titles; no assertion, no behaviour; the case title quoted in the invariant docstring stays equal to the case title in the test file.
- **Check:** `git diff -U0` of the commit, filtered to lines that are neither comments nor test titles: the only remaining line is the docstring quotation in `tests/invariants/test_loop2_container_sprites.py`, which is the intended change. The docstring quotation was compared with the test title by eye; the invariant test (below) passed on the renamed title.
- **Result:** as intended. No failing run was seen, since no assertion changed; no invariant test was changed in behaviour, so the test-first rule did not apply.

## Checks (command and exit code)

1. `npm test -- tests/view/camp-picture.test.mjs` - exit 0; 7 tests, 7 pass.
2. `npm test -- tests/view/headquarters-screen.test.mjs` - exit 0; 28 tests, 28 pass.
3. `npm test -- tests/view/scene-picture.test.mjs` - exit 0; 71 tests, 71 pass.
4. `npx prettier --check src/browser/view/camp.tsx tests/view/camp-picture.test.mjs tests/view/headquarters-screen.test.mjs tests/view/scene-picture.test.mjs` - exit 0; "All matched files use Prettier code style!"
5. `python -B .the-way/elements/common/foundation_check.py` - exit 0; ends with `0 errors`. Six `listed:` lines (none is an error, reported as the check prints them): `foundations/invariants.md:5` `account-server-runtime`; `:354` `terrain-drawing-numbers`; `:668` `player-opaque-session-cookie`; `:978` `trip-plan-progress`; `:1158` `loop-run-knowledge`; `:1288` `sprite-credits`. This slice did not touch `foundations/`; the lines name invariant sentences the check reads as changed against the base. Reported, not analysed further.
6. `npm test -- tests/invariants/test_loop2_container_sprites.py` - exit 0; `Ran 1 test ... OK`; the Docker daemon answered and the production image was built and checked (109.5 s).

Not run: the product's full gate (`npm test` with no file), per the handoff. `foundation_check.py --skip-test-citations` was not run, since no foundation entry was written.

## Choices made

- Used "the picture band" in every title or comment where the subject is the band, and kept "at the camp" only where the subject is a character, as the task's To do 7.14 (b) and the glossary entry `at the camp` give.
- Renamed the second scene-picture title ("the picture band's files hold pixels alone") although the slice named only the title at line 503; it speaks of the band. Rejected: leaving it, which would keep a band called "the camp" in a test title of a file the slice changes.
- Kept identifiers (`Camp`, `campDrawing`, `CAMP`, `camp` variables, `camp*` CSS classes, the file names) as the slice says.
- Kept the wording "widest band" in two titles; the repetition with "picture band" is accepted rather than rewording the meaning.

## Unread material

- `foundations/decisions.md`: read the range 9752-9830 (D-389 whole, with its Rationale and Rejected); did not read other decisions. The handoff's range 9755-9828 lies inside what I read.
- `foundations/glossary.md`: read the entries "headquarters" and "at the camp" (lines 85-100); the rest not read.
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/SKILL.md`, `slice.md` of the-way and the root `AGENTS.md`: read whole.
- `plan.md`: read the header (lines 1-17) and the rules (18-48); the other slices' sections not read (not needed).
- `task.md`: read line 86 (To do 7.14), lines 192-196 (Out of scope), and line 86-ish entries used; the rest not read.
- `src/browser/view/camp-picture.ts`: not read whole; only the lines the grep matched were read (it is in the slice's *Read* list and is not in *Change*).
- `tests/view/camp-picture.test.mjs`: read in parts (lines 1-30, 44-64, 80-95, 102-118); not whole.
- `tests/view/headquarters-screen.test.mjs`: read lines 686-812 only (large file, not read whole).
- `tests/view/scene-picture.test.mjs`: read lines 500-520 and 1610-1625 and grep matches only (large file).
- `tests/invariants/test_loop2_container_sprites.py`: read lines 1-30 only.
- `foundations/invariants.md`: not opened; only one grep hit (line 1200) read.

## Searches not found or unclear

- Searched for a Polish band-name "obóz" in `src/` and `README.md`: not found.
- Unclear, decided by reading the sentence: "the camp's characters and fire" (`headquarters.css:4`, `styles.css:665`) - read as the band's, so it is in the list above, not changed.
- The handoff gave the D-389 range as 9755-9828; the slice gave 9752-9824. Both are inside the range I read.

## Reaches beyond the handoff

- Read `foundations/glossary.md` lines 85-100 and grepped the glossary and the invariant docstring for the phrase; read the docstring lines 1-30 of `tests/invariants/test_loop2_container_sprites.py` to find the quotation.
- Grepped `foundations/invariants.md` for the sprites invariant sentence (line 1200) only, to confirm the docstring's wording; not edited.

## Working copies

None made by me. The check logs I wrote into `.runs/` during the checks (`executor-16-t1.log` to `executor-16-t4.log`, `executor-16-fc.log`) were removed. No worktree, clone or directory `.runs/executor-16/` was created.

## Problems observed

- None in the code. The commit hook (`rules-on-demand`) printed a reminder about the git rules on the first commit attempt; the commit was repeated with the same content and went through. The commit message is in English, the paths were added one by one, and no `git add -A` was used.
