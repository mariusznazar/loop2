# Slice 40 report — pointers that origin/main brought in at the second merge

**Status:** done with concerns (concerns: pointers outside this slice's scope listed below; D-372 edit made by editor after reading the decision skill, see "Decision skill")

**Base:** HEAD at start was `688a16be60b2ae0556f68068b96ad33d36f8c7d0`, worktree clean.

**Commits:**
- `7f0df0ba` docs: styleguide bullet and the Rationale of D-372
- `e3bfa3a3` test: tokens.css, styles.css, scene-picture.ts and the three scene test files

**Files changed (added/removed lines, `git diff --stat`):** decisions.md 1/1, styleguide-browser-view.md 4/4, styles.css 10/9, tokens.css 7/7, scene-picture.ts 3/3, scene-frost-contrast.test.mjs 11/11, scene-picture.test.mjs 8/8, scene.test.mjs 17/18 (total 61 insertions, 61 deletions).

Only comments, docstrings, one test title and the one phrase of D-372 changed. I checked it: `git diff -U0 -- src tests` with comment lines filtered out shows only the seven `tokens.css` declaration lines (whose only change is inside their `/* Source: … */` comment) and the one test title.

## Per changed entry: old pointer, outcome, entry

### guidelines/styleguide-browser-view.md (list of sources of a value, ~l.348)
- Old: "wartości wyglądu zadania „swit-rosnacy-z-passa” … wybór Mariusza z podglądu wartości wyglądu tego zadania … z nazwą zadania i datą wyboru, 2026-11-11; te same nazwę i datę niesie komentarz …".
- Outcome: takes the kind of the list ("wybór Mariusza z tego podglądu … z datą wyboru"): "z podglądu wartości wyglądu sceny … wybór Mariusza z tego podglądu, wariant A odcieni i wariant FA szronu, z datą wyboru, 2026-11-11; tę samą datę niesie komentarz przy regule powrotu odcienia …". The date is from the note (all answers "Mariusz, 2026-11-11", questions 3 and 10 of the note in the snapshot); no date question to the orchestrator.

### src/browser/tokens.css (seven Source comments, l.80-87)
- Old: "…preview of the values of appearance of the task swit-rosnacy-z-passa, 2026-11-11, variant A/FA …: <what> (question 3 / 10 of that task)".
- Outcome: "…preview of the values of appearance, 2026-11-11, variant A/FA …: <what>", the task name and the question number dropped; every declaration keeps a non-empty `Source:`. Entries: `--scene-tint-cool`, `--scene-tint-warm`, `--scene-tint-cool-opacity`, `--scene-tint-warm-opacity`, `--scene-frost-fill`, `--scene-frost-outline`, `--scene-frost-crystal`.

### src/browser/styles.css
- l.1807 "(D-315, D-316, D-320; task swit-rosnacy-z-passa)" -> "(D-315, D-316, D-320, D-372)": task name dropped; D-372 added because the comment names the frost layer and only D-372 (and D-315) place it over the tint.
- l.2001 "(D-315, D-316; task swit-rosnacy-z-passa)" -> "(D-315, D-316)": task name dropped.
- l.2008-2009 "preview of the values of appearance of the task swit-rosnacy-z-passa, variant A, 2026-11-11" -> "preview of the values of appearance, variant A, 2026-11-11" (the 2 s of the return is in D-316, which also says it was chosen from the preview).
- l.2035 "(D-316; task swit-rosnacy-z-passa, the shape of its ragged edge settled there)" -> "(D-372, D-271)": D-316 does not mention the frost at all (checked); D-372 holds the ragged inner edge, the outline alone at the first pixel and the thickness; D-271 holds "squares of one pixel of the scene on its grid".
- l.2047-2048 "…and under the plaque and the badge (D-320)" -> "…do not change with the streak (D-315, D-372), and under the plaque and the badge, as the styleguide's rule on the scene of a map run has it": D-320 does not say the frost lies under the badge (checked); D-315 and D-372 say the frost lies over the tint; the order frost/badge is only in the styleguide rule "The scene of a map run" (no decision states it).

### src/browser/view/scene-picture.ts
- l.198 "the tint of one that does is for the task that adds it to settle" (forward pointer to a task) -> "no decision gives the tint of a map that does, and until one does it stays at 0 …". No information lost: the code returns 0 for a map without a required streak.
- l.213 "(D-316)" on `frostOf` -> "(D-372)": D-316 does not mention the frost.

### tests/view/scene-frost-contrast.test.mjs
- Header comment: "To do 5, the condition of the rule D of D-271 …; in the task document (question 10, carried question 4); … table (a) of the preview … the task cites, and my measurement …" -> "The condition of D-271 for the frost …"; the five snow literals stay with what the note gives about them (measured at each value of the tint), and the 2026-11-12 browser measurement (`#c2cebe`, `#d4caa6`) stays. The pointers to the task document and the preview table are gone. I could not write a source for the three of five samples beyond "measured once": the foundation holds only the 3:1 rule (D-271), not the samples; they are test inputs, measured values.
- Title "the contrast helper reads the preview's measured 3.21:1 …" -> "… reads a measured 3.21:1 …" and the comment above it "the two colours the preview measured" -> "two colours whose ratio was measured outside it". No other file cites the old title (git grep).

### tests/view/scene-picture.test.mjs
- l.693 section header: "(task swit-rosnacy-z-passa)" dropped.
- l.700 "To do 4." -> "D-373." (the 20 minutes, "20 or fewer left", extinguished fire: D-373 binding sentence). Dropped "one stick adding 20" (it is in D-373's Rationale).
- l.792 "To do 4, D-271, D-273." -> "D-373, D-271, D-273." (D-273 read: trust boundary of sprites kept by review; D-373 the file of the smaller flame).
- l.843 "To do 2, D-315." -> "D-316." (even growth to 0.8 at the required streak, full gold only at a completion are in D-316, not D-315).
- l.877 "To do 5." -> "D-372."
- l.911 "To do 2 and 3, D-322." -> "D-316, D-322." (return, pause, discovery, death, completion: D-316; time stands: D-322).

### tests/view/scene.test.mjs
- l.1358 section header: task name dropped.
- l.1379 "To do 1, carried question 2, D-315 … (row 1 puts under the tint …)" -> "D-315, D-372 … (D-315 puts under the tint everything the scene draws but the badge and the frost)".
- l.1471 "To do 2." -> "D-316."
- l.1488 "To do 2 and 3, D-322." -> "D-316."
- l.1522 "To do 3, D-322, accepted question 7." -> "D-316, D-322." (the return waits for „Wznów” is in D-316's binding sentence)
- l.1548 "To do 2." -> "D-316."
- l.1583 "Carried question 1, D-43." -> "D-43." (D-43 read: no colour value outside the token file; the test asserts the style holds numbers only)
- l.1597 "To do 5." -> "D-372, D-271, D-349." (pixel of the scene on its grid: D-271; the 336 × 152 picture at twice its size: D-349)
- l.1628 "To do 5." -> "D-372."
- l.1643 "To do 4, D-316." -> "D-373, D-316." (the smaller flame is D-373; the extinguished fire stays as D-316 gives it)
- l.1662 "To do 4, the beat of the frames." -> "D-373, the same beat."
- l.1676 "To do 6, D-322." -> "D-322."

### foundations/decisions.md — D-372, Rationale
- Old: "it fills the first minutes of a map run, as the reconnaissance wanted;"
- New: "it fills the first minutes of a map run;" The note (question 9) gives the sense "fills the first minutes of the run, as the reconnaissance wanted"; dropping the pointer keeps the sense that the frost fills the first minutes. I added no reason the note does not give (the reconnaissance document itself says the character stands and the cold grows in the first 84 seconds, but that is not in the task note, so it is not added).
- Decision skill: `the-way-record-decision` (read `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `elements/common/rules.md`, `elements/common/way_of_working.md`). Step 1/2: the entry is a change in place of an existing decision (no new question, no new number, so no new decision was needed in this slice: every comment's requirement is in D-271, D-315, D-316, D-322, D-349, D-372, D-373 or D-273); searched the foundation for "reconnaissance" (one more hit, see below). Step 4.3: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` -> `0 errors`, then without the switch (see Checks). The edit itself I made with the editor tool as the handoff says.

## No new decision written
No requirement turned out to live only in the note and be needed by code: the one candidate, "a running return of the tint is kept on a rise and not restarted" (test title in `scene-picture.test.mjs` and `scene.test.mjs`), is not in the note either (searched "od nowa", "restart", "w toku", "skok"); it stays a behaviour the tests protect and is cited to no decision beyond D-316 (return over 2 s, no jump).

## Checks (command, exit)
- `npm test -- tests/view/scene-frost-contrast.test.mjs` exit 0 (2 tests)
- `npm test -- tests/view/scene-picture.test.mjs` exit 0 (50 tests)
- `npm test -- tests/view/scene.test.mjs` exit 0 (47 tests)
- `npm test -- tests/invariants/test_design_token_sources.py` exit 0 (2 tests)
- `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0 (4 tests)
- `npm test -- tests/invariants/test_design_token_contrast.py` exit 0 (3 tests)
- `npx eslint src/browser/view/scene-picture.ts tests/view/scene-frost-contrast.test.mjs tests/view/scene-picture.test.mjs tests/view/scene.test.mjs` exit 0
- `npx prettier --check` on the three test files, scene-picture.ts, styles.css, tokens.css, the styleguide: pass. `foundations/decisions.md` fails prettier, and it failed identically at the base commit (checked with `git stash`); the file is not formatted by prettier in this repository, my edit did not change that.
- ruff: no Python file changed, not run.
- `python -B .the-way/elements/common/foundation_check.py` exit 0 (`0 errors`).
- S1 (`git grep` of the private-name pattern on the Change files) prints no line (exit 1 of git grep = no match).
- S3: hits in the Change files, none fixed because none points outside the repository:
  - `src/browser/styles.css` lines 809, 819, 919-959, 1379, 2665, 2678 (`trip plan`, `trip-plan-*`, `clipped-plan`): "plan" is the product's word, the trip plan of a program (D-180), and CSS class names.
  - `guidelines/styleguide-browser-view.md:857`: heading "Plan of a user-interface change", a heading of the styleguide template's Examples section, an instruction, not a pointer.
  - `foundations/decisions.md`: ~60 hits, nearly all "trip plan" / "plan" of the program or "Plan wyprawy". Three are real pointers in decisions other than D-372, outside this slice's allowed change to `decisions.md`: line 1104, D-48 *Origin*: "Decision 1 of the spec in `docs/task-cycles/styleguide-loop2/spec.md` at commit b0c4d44" (a pointer to a cycle record in git history; the handoff's decision says a pointer of this kind counts); lines 6263-6265, D-273 *Rejected*: "the plan records neither its cost nor the human's reason for it … a change of the plan" (a plan of an earlier cycle); line 6452, D-279 *Rationale*: "joins the divergence from the project definition, and the plan gains one" (a plan of an earlier cycle and a project definition). I left them; they need the orchestrator's decision (a later slice for the reasoning of decisions, or this one widened).
  - `scene-picture.ts`, the three test files: no S3 hit.

## Own-work check
- Requirement most likely not met: "no comment, docstring or test title points to a document outside the foundation" in the Change files, including phrasings that carry none of the searched words.
- Check: beyond S1/S3 I searched the Change files with `git grep -nIE -i '\brows? [0-9]|\bpreview\b|reconnaissance|settlements?|\bdefinition\b|\bconcept\b|old loop|accepted question|carried question|\bnote\b|MVP|vault|\.runs|task\b|swit-rosnacy|To do [0-9]|[Qq]uestion [0-9]|task document|the task cites'`, then read each remaining hit.
- Showed: the remaining hits are the product's own words ("earning loop", `.form-note`, "the preview of the terrain and focus" in other tokens, which is a named design preview the styleguide's list gives as a source), the running public game "loop" / "the old Loop" (the game kantarion, not its repository: `styles.css:1900` "the value the old Loop gave a paused scene", `scene-picture.test.mjs:43-45`, `scene.test.mjs:350,415`; D-321 and D-322 say the same of the game), and "the preview" in tokens.css and the styleguide list, which is the kind the styleguide itself names. Nothing else.
- Second check: for each comment I rewrote that cites a decision I opened the decision (D-43, D-271, D-273, D-315, D-316, D-320, D-322, D-349, D-372, D-373) and compared the claim; four old citations did not hold (frost cited to D-316 in `styles.css`/`scene-picture.ts`; "under the plaque and the badge (D-320)"; tint growth and return cited to D-315/D-322 in tests; smaller flame cited to D-316) and were corrected as listed above.

## Reaches beyond the dispatch
- Read the decision text of D-43, D-271, D-273, D-315, D-316, D-317, D-320, D-322, D-349, D-372, D-373 (to check citations); the handoff names D-80, D-82, D-362, D-368 and the invariant `tracked-file-private-names`; see Unread material.
- Grepped `foundations/decisions.md` for "reconnaissance" and `docs/task-cycles`/"plan" (to answer S3 and the D-372 search).
- Searched the note for "od nowa|restart|w toku|skok" to see whether the kept-running return is a requirement only the note holds.

## Unread material
- `src/browser/tokens.css`: read the head (l.1-12) and l.79-90 in full; the rest only by searches (no pointer pattern matched).
- `src/browser/styles.css` (2768 lines): read l.1795-2465 whole; the rest only by searches.
- `src/browser/view/scene-picture.ts`: read whole.
- `tests/view/scene.test.mjs` (1689 lines): read l.1350-1689; `tests/view/scene-picture.test.mjs` (971 lines): read l.685-971 and l.38-48; the rest only by searches. `tests/view/scene-frost-contrast.test.mjs`: whole.
- `guidelines/styleguide-browser-view.md` and `guidelines/testing.md`, `guidelines/coding.md`, `src/browser/AGENTS.md`: read whole.
- Handoff *Read*: `task.md` passages only through the handoff's copies (not opened in the file); `cycle.md` Q9 not opened (the handoff's decision restates it); D-80, D-82, D-362 (as changed), D-368 and the invariant `tracked-file-private-names` not opened: this slice changes none of them and no changed comment cites them. D-82's wording was seen only in the S3 output (lines 1679, 1686). The invariant `design-token-sources` read through `tests/invariants/test_design_token_sources.py` passing, not its entry text; `tests/invariants/test_design_token_sources.py` not read, only run. `.claude/skills/the-way-record-environment-fact/SKILL.md` not read (no environment fact changed).
- Note `swit_rosnacy_z_passa_loop2.md` in the snapshot: read lines 26-36, 58-64, 73-78, 98-113 and by searches; not read whole.

## Searches not found or unclear
- The `rozpoznanie_frajda.md` text on the first 84 seconds exists in the snapshot but the task note's question 9 gives only "wypełnia pierwsze minuty przejścia, jak chciało rozpoznanie"; I kept only that sense.
- The sources of the five snow samples in `scene-frost-contrast.test.mjs`: the note gives them as measurements of the preview; I did not open the preview (a working directory outside the repository); so the comment says "measured once at each value of the tint" and keeps the 2026-11-12 browser measurement, nothing more.
- Another pointer found outside this slice's scope: D-364 *Rejected* (`foundations/decisions.md:8925`): "the gap the report of the reconnaissance names the largest" — a pointer to a reconnaissance report; D-364 is not a decision of the task `swit-rosnacy-z-passa`, and the handoff allows `decisions.md` only the D-372 phrase, so I left it. Also the three S3 pointers listed above (D-48, D-273, D-279). All four are for the orchestrator.
- Value check: the handoff says the highest decision is D-372 "or higher; check"; it is D-386 (not used, since no decision was written).
