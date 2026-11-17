# Executor report — slice 14 (Decisions of the screens and the login card)

**Status:** done with concerns

- Commit: `ee68e190` on `task/poprawki-brzmienia-fundamentu` (base `2a2f1607`).
- Files changed (`git show --numstat`, added / removed):
  - `foundations/decisions.md`: +7 / −7
  - `tests/view/account-screen.test.mjs`: +4 / −4
  - `tests/view/headquarters-screen.test.mjs`: +2 / −2
  - `tests/view/program-editor.test.mjs`: +1 / −0
  - `tests/view/team-lines.test.mjs`: +1 / −1

## Items of the slice

1. **D-57 sentence (To do 7.13).** *Made.* The binding sentence now reads: "A character's warmth is its body temperature in degrees Celsius, counted with tenths and written with a decimal comma, as „36,5 °C”." The old quotations of D-57 (`conditions.test.mjs:276, :295`, `body-row.test.mjs:88`) are prefixes of the new sentence and still stand.
   - *Choice (named):* the task says only that the sentence gets "przecinek dziesiętny" and the plan says "appended after 'counted with tenths'". The exact words are my choice. Way rejected: a bare "with the decimal comma" with no example, which a reader would not map to the body row. Cost if wrong: a reword in a follow-up commit; no test quotes the appended part.
2. **Decision line for D-57 in `tests/view/program-editor.test.mjs` (To do 7.13).** *Made.* Added `// decision: D-57 "A character's warmth … as „36,5 °C”."` directly above the `test("a number with a fraction stands in the sentence …")` at about line 1574. The line quotes the whole new sentence.
3. **D-218 first sentence (To do: Decisions in play, `:4377-4378` of the older commit).** *Made.* Now "The headquarters and the screen Postać show „pokolenie {n}” beside a character's name from generation number 2 up, in `text-secondary`." Code check: `src/browser/view/character-screen.tsx:76` computes `generationLabel(character.generation)` and `:98-99` renders it on the screen Postać, so the wording matches the code.
   - Quotations changed by rule 4: `tests/view/account-screen.test.mjs:3259`, `tests/view/headquarters-screen.test.mjs:184`, `tests/view/team-lines.test.mjs:159`.
4. **D-262 binding sentence (To do: `:5855` of the older commit).** *Made.* Now "Nothing stands on the screen of the login card but the card over the picture of D-272, not even the header." Quotations changed by rule 4: `tests/view/account-screen.test.mjs:5382` and `:5473` (both lines, one edit).
5. **D-278 Rationale (To do: `:6473-6474` of the older commit).** *Made.* The clause "and the card with its credits unfolded ends at 682 px" is removed; the sentence now reads "…with the top edge fixed neither moves. Accepted with it: …". No test quotes the number (grep for `682` in `tests/` finds only an unrelated Python comment).
6. **D-280 binding sentence (To do: `:6516-6517` of the older commit).** *Made.* Now "A player reaches a first map run from Siedziba in at most three clicks: the item „Mapy” of the menu bar, the map's row and „Wejdź”." Quotation changed by rule 4: `tests/view/account-screen.test.mjs:4467`. No other file quotes this sentence.
7. **To do 7.2 (headquarters credits links).** *Made, at a moved line.* The task gives `tests/view/headquarters-screen.test.mjs:773`; the comment now stands at line 850. The comment now reads "The links of the folded section of credits lead outside the game, not to a screen of the game." (It replaces "lead to game-icons.net".)

Rule 5 check: no `invariant:` line was added or changed; no behaviour, no constant name changed; no entry binds anything new beyond the sentences listed above.

## Own-work check

- **Requirement:** every quotation of a reworded binding sentence follows the new sentence, and no old wording remains in `foundations/` or `tests/`.
- **Check:** `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the decision edits, before the test quotations were changed: `6 errors`, all of them the six `decision:` quotations listed in item 3–6 (`account-screen` 3259, 4467, 5382, 5473; `headquarters-screen` 184; `team-lines` 159). Those were then fixed. Re-run after the fix: 0 errors. Then `git grep` for the old wordings ("The headquarters shows „pokolenie", "Nothing stands on the screen of the login card but the card, not even", "the choice of a map, the map's row") finds none in `foundations/` or `tests/`.
- Result: no requirement failed after the fix.

## Checks (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → exit 0, `0 errors` (first run before test fixes: `6 errors`, exit not captured because of a pipe in that run; the same run was repeated later without the pipe).
- `python -B .the-way/elements/common/foundation_check.py` (full, slice end, rule 3) → exit 0, `0 errors`.
- `npm test -- tests/view/account-screen.test.mjs` → exit 0; tests 133, pass 133, fail 0.
- `npm test -- tests/view/headquarters-screen.test.mjs` → exit 0; tests 28, pass 28, fail 0.
- `npm test -- tests/view/team-lines.test.mjs` → exit 0; tests 16, pass 16, fail 0.
- `npm test -- tests/view/program-editor.test.mjs` → exit 0; tests 55, pass 55, fail 0.
- `npx prettier --check` on the four test files → exit 0, "All matched files use Prettier code style!".
- Not run: the full `npm test` (forbidden by the handoff); `.runs/quality-venv` was not used (no Python check was needed).

### `listed:` lines from the foundation check (rule 3; no error)

These six invariants read `test` and their sentence is changed by this change, while no file citing them changed. I did not change any invariant; the listing comes from the branch's earlier commits:

- `foundations/invariants.md:5` `account-server-runtime` (tests/invariants/test_account_server_runtime.py)
- `foundations/invariants.md:354` `terrain-drawing-numbers` (tests/invariants/test_terrain_drawing_numbers.py)
- `foundations/invariants.md:668` `player-opaque-session-cookie` (tests/transport.test.mjs)
- `foundations/invariants.md:978` `trip-plan-progress` (tests/sim/trip.test.mjs)
- `foundations/invariants.md:1158` `loop-run-knowledge` (tests/sim/catch-up.test.mjs, tests/sim/loop.test.mjs)
- `foundations/invariants.md:1288` `sprite-credits` (tests/view/icons.test.mjs)

These need naming in the request (the foundation check asks for it); I have not analysed them further, since they are outside this slice.

## Unread material

- `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md` — read only the lines named in *Read* (26, 74, 85, 156, 163, 165–166, 192–196) and the grep hits for D-57 and "przecink"; the rest not read.
- `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md` — read lines 1–60 and grep hits for slice 14 and "7.13"; the slice section was taken from the handoff copy.
- `foundations/decisions.md`: D-57 (5887–5902), D-218 (6084–6105), D-262 and D-278 (3049–3124), D-272 (4971–4998), D-280 (4307–4379) read in full ranges. D-323 (4521–4537): only its first lines, not whole; it does not bind a change in this slice.
- `guidelines/coding.md`: not read (the handoff lists it; the slice changes only test comments and quotations).
- `guidelines/testing.md`: not read whole; grep for `decision:` in it and in `guidelines/coding.md` finds no rule about the form of the line. Read whole this is a gap.
- `guidelines/styleguide-browser-view.md`: not read (no file of the part `browser-view` other than tests was changed).
- `src/browser/view/character-screen.tsx`: read lines 70–96 and grep of `generation`; the rest not read.
- Element files: `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `examples.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/elements/common/way_of_working.md` read whole. `decision_index.py` was not run, and the search of the whole foundation (way_of_working step 2) was not done beyond the quotation greps; the entries touched were identified by their quotations.
- `AGENTS.md` of the worktree: read via the session context.

## Searches not found or unclear

- The task's line numbers did not match the branch: the headquarters comment is at line 850 (task: 773); the D-57 and D-218 anchors are found by quotation.
- The exact wording of the D-57 appended phrase is not in the task (see item 1).
- The handoff asks to find decision quotations with `git grep -n 'decision: D-<n> "'`; done for D-57, D-218, D-262, D-280 — each listed above.

## Reach beyond the handoff

- None into other slices' files. The commit's author email is the one the user's git rules name for the private account (`the private address that the account rule gives`); not changed.

## Working copies

- `.runs/executor-14/` (test outputs, foundation check outputs, prettier output) — made by me and removed before this report, with `rm -rf`. Nothing remains. No worktree was made.
- Stays: `.runs/npm-ci.log` (not mine, present before the slice).
