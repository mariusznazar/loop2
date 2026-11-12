# Slice 21 report

**Status:** done with concerns (concerns below; no blocker).

**Slice base:** `a18acf22015ebf4e05e7c63b348373cd36622a62` (HEAD at the start, worktree clean).

**Commits**

- `ce6196e6` docs: :memo: record where Wędruj goes, the numbers of the conditions, the return of nature energy and the survival of a program on Las as D-373 to D-376 (`foundations/decisions.md`, +50 lines).
- `3a4a8090` test: :memo: name decisions instead of notes and tasks in the comments and titles of the simulation tests of discovery, the campfire and the body (the nine test files; comments, docstrings and test titles only).

Only comments, docstrings and test titles changed in the tests: `git diff -U0 -- tests` with comment lines and `test(` lines filtered out prints nothing.

## Checks

| Check | Command | Exit |
|---|---|---|
| tests, per file | `npm test -- tests/sim/<file>.test.mjs` for data (34 pass), discovery (46), repertoire (32), actions (18), conditions (17), acceptance (5), body (36), encounters (29), campfire (35); no failure | 0 each |
| eslint | `node node_modules/eslint/bin/eslint.js --max-warnings 0 <the nine files>` | 0 |
| prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig <the nine files>` | 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` (also with `--skip-test-citations` right after writing the entries) | 0 (0 errors) |
| S1 | `git grep -nIE '<S1 pattern>' -- <nine files>` | 1 (no line) |
| S2 | `git grep -nIE '<S2 pattern>' -- <nine files>` | 1 (no line), so there is nothing to justify |

The product gate (`npm test` with no argument) was not run, as instructed.

Extra search I ran (not in the Checks): `git grep -n -i -E '\btasks?\b|\bspec\b|\bslice\b|\bconcept\b|\bdefinition\b|\bvault\b|Pytanie|\bO[0-9]+\b|Context'` on the nine files, filtered of `.slice(`: no hit left.

## Foundation entries written (through `the-way-record-decision`)

Steps of `.the-way/elements/decisions/skill/SKILL.md` done: 1 Read (`read.md`, `template.md`, `rules.md`, `way_of_working.md`, `foundation_step.md`; the log's numbers inspected: highest was D-372, no withdrawn number above it), 2 Decide entry (`decide_entry.md`: plan test passed, one question each, the log searched for each question and found not answering it; D-23 noted: it leaves open which kinds of condition hold numbers, D-151 already names two, so D-374 follows D-151's precedent), 3 Draft (all four with *Origin* `none`, *Based on* `none`), 4.3 Write and `foundation_check.py --skip-test-citations` (0 errors). Step 4.1 and 4.2 (asking and showing the human) are the orchestrator's by the handoff; these four are marked **the cycle's** (no row of *Settlements to record* carries them). No invariant is named in *Verification* that the file does not hold (`nature-energy-range` exists).

| Entry | Question | Reasoning taken from | One sentence of its meaning |
|---|---|---|---|
| D-373 | Where does „Wędruj” go, and how does it draw? | the note of the author's test guide task, Q7c, and the note of the Las task (its context lines on the concept and the old Loop's movement tests), read from the snapshot | „Wędruj” goes onto a neighbour not yet revealed if there is one, else any neighbour, with one draw of the wandering generator, and can be carried out while the tile has a neighbour, the check drawing nothing. |
| D-374 | What numbers does a condition on the body, the backpack, the campfire and the tile accept? | the Płomyk task note Q2 (energy 0–100 by 1, first number 30) and the spec of the earlier campfire task, Decision 3 (the other ranges, steps, first numbers, the check's rule), read from loop2's git history | Each numeric condition accepts a number from its minimum to its maximum on its step, holds strictly below it, and the program check refuses anything else. |
| D-375 | How fast does a mage's nature energy come back? | Płomyk task note Q2 (0.5 a minute, satiety at least 60 compared after the fall) | In a minute outside combat with satiety, after its fall, at or above 60, nature energy comes back by 0.5 up to the cap. |
| D-376 | Can a program of the closed lists keep the mage alive on Las? | the campfire task note (Acceptance criteria, Q12, the lighting question), Płomyk task note To do 7 and Q9 | On Las a program built of the closed lists survives 480 game minutes on a seed a test names, lighting paid in nature energy too, and the empty program dies. |

*Rejected* is `unknown` in D-373, D-375 and D-376 (the notes keep no ways not chosen with a cost for these points; the alternatives the notes name for Q9 concern Las — głębiej and carry no cost). D-374 *Rejected* takes the two ways the spec weighed.

## Pointers changed (old pointer, outcome, entry)

Outcomes: **named** = existing entry named; **written** = new entry written; **removed** = pointer or comment gone.

`tests/sim/data.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| title "…of the task" (Las) | removed | none needed |
| title "the task's map data…" (Las — głębiej) | removed | none needed |
| "D-290 (task edytor-programu, To do 4) … from the task's order" | removed the task, kept D-290 | D-290 named |
| title "…rates and thresholds are the task's" | removed | none needed (values stay written in the test) |
| title "…as the task works it out" | replaced by the arithmetic 0.002 × (37 − 25) | none needed |
| "Task rozliczenie-przejsc, To do 9 (question Q10): 480 real minutes, … commit cdc7c0d, `src/sim/data/balance.ts:125`" | named | D-190 (eight hours) |
| "Task petla-zarobkowa, To do 2 (D-18, D-239, spec section 14)" | named | D-18, D-239 |
| "paces of the task "rozwiazanie-lasu", Question 3 (Mariusz, 2026-10-25)" | named | D-21 |
| "task document odkrywanie_loop2.md of the vault (D-82)" | named | D-118, D-120, D-121, D-195 |
| title "…pairs of verb and target of the task" and "Task: the character skills…" | removed / named | D-120 |
| "The rows of the table of To do 2" | named | D-121 |
| `odkrywanie_loop2.md:21`, `:23`, `:24`, `:25`, `:26` (five row comments) | removed (the docstring names D-121) | D-121 |
| `odkrywanie_loop2.md:22 and :28` (two) | kept the information, pointer removed ("An item enters with the revealed tile that holds it") | D-121 |
| "the condition: plomyk_loop2.md:22 (task plomyk, To do 5)" | removed | D-121 holds it |
| "wprawa_i_drzewa_loop2.md: accepted Q3, the action is discovered with its tree" | named | D-195 |
| "odkrywanie_loop2.md:17-26 — the table; :80 — Zawsze known from the start" | named | D-121, D-118 |
| "odkrywanie_loop2.md:23 — pierwszy zebrany patyk reveals the campfire" | named | D-121 |
| "(spec 4.5)" in "Validation of ids…" | removed | none needed |
| "(task, To do 1 and 7)" on `heldProgram` | removed | none needed |
| title "…and Las's is the task's" | replaced by "a streak of 480" | none needed (value is asserted) |

`tests/sim/discovery.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| header: task "odkrywanie", `odkrywanie_loop2.md` To do 1, 2, 6, Q2, Q11, Context line 99 | named; first-chill minutes now derived in the comment (0.002 × (37 − 25) = 0,024; 35,008 and 34,984) | D-118, D-121, D-122, D-123 |
| "from the first row of the table of To do 2" and "rows … of To do 2 after the first two", "To do 2, first row" | named | D-121 |
| "Task "programy-gracza", To do 11 (D-123)" (three places) | named | D-123 |
| "Changed by the task "kronika-z-filtrami" (To do 4, D-341)" | named | D-341, D-348 |
| "Task plomyk, To do 5 (plomyk_loop2.md:22)" | named | D-121 |
| "Task "programy-gracza", To do 6" | removed | none needed |
| "Slice 10 (O2…O5; task To do 5) … task Context, line 99" | named | D-71, D-122 |

`tests/sim/repertoire.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| header: task "odkrywanie" (To do 1, 3, 4; Q8, Q12), `odkrywanie_loop2.md` lines | named | D-118, D-119, D-120, D-126, D-127 |
| "as To do 3 gives them" | named | D-120 |

`tests/sim/actions.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| ":181 Accepted task przewodnik_testow_loop2.md, Q7c: a hidden neighbour takes precedence" | written | **D-373** (new) |
| "Q7c quotes concept line 1261 for one draw" | written | **D-373** (new) |

`tests/sim/conditions.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| "(task, To do 12–13; spec Decision 3; D-26, D-57) … from the spec's table" | written (ranges), D-26, D-57 kept | **D-374** (new) |
| "Task plomyk, To do 5 (plomyk_loop2.md:22)" (:115, body full) | named | D-374 |
| "(task, To do 1 and 7)" on `heldProgram` | removed | none needed |
| ":298 Task plomyk, To do 5 …: from 0 to 100 by 1" | written | **D-374** (new) |

`tests/sim/acceptance.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| "The task's acceptance criterion: … as this task leaves it" | written | **D-376** (new) |
| "Task plomyk (plomyk_loop2.md in the vault, Notes/Projects/(P) Loop/_zadania, To do 7, line 24)" | named (D-63, D-177); the line "the program needed no change" dropped as history | D-63, D-177, D-376 |
| "what this task brings" | removed | none needed |

`tests/sim/body.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| "from the task's numbers" | removed | none needed (numbers written in the comment) |
| "Nature energy (task plomyk, plomyk_loop2.md in the vault …: To do 1 at line 18 and To do 4 at line 21)" | named; return rule written | D-176, **D-375** (new) |
| "(task teraz-i-potem, To do 4 to 6, Pytanie 6, and D-337 in foundations/decisions.md)" | named | D-337 |

`tests/sim/encounters.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| "Task plomyk, Q3 and To do 4 (plomyk_loop2.md …)" | named | D-71, D-375 |
| "Task plomyk, To do 2 (plomyk_loop2.md, line 19)" | named | D-63 |

`tests/sim/campfire.test.mjs`

| Old pointer | Outcome | Entry |
|---|---|---|
| "(task, To do 7–12; …)" and "from the task" | removed, D-ids kept | D-26, D-63, D-68, D-69, D-71, D-72 |
| title "…with the task's labels and minutes" | removed | none needed |
| "(task, To do 1 and 7)" on `heldProgram` | removed | none needed |
| "(task plomyk, plomyk_loop2.md …: To do 2, To do 3, To do 4 and Q10 at line 58)" and "from the task" | named | D-63, D-71, D-175, D-176, D-177, **D-375** (new) |
| "Q10: the minute's 0.5 comes back before the lighting takes effect" | named | D-71 |
| "(task koszty-i-stan-ogniska, To do 1 to 4; D-63, D-145, D-175)" | task removed, D-363 added (the editor shows the price the simulation takes) | D-63, D-145, D-175, D-363 |
| "(task kronika-z-filtrami, To do 7; spec D1, D11)" | named | D-344, D-348, D-71 |

## Own-work check

Requirement most likely not met: "no comment, docstring or test title points to a vault note, task document, or a file of the old Loop's repository", including pointers that name no file ("the task", "To do N", "spec …" of a task). Check: S1 and S2 exit 1, plus the wider search above (task, spec, slice, concept, definition, vault, Pytanie, O-numbers, Context) with no hit; and a search for `.md`, `.ts`, `line N`, dates and "Mariusz" in the nine files, which found only: a public URL (the Mulberry32 source), and `foundations/decisions.md:NNNN` / `invariants.md:NNN` line references in `encounters.test.mjs` (lines 415, 624, 727, 762), which point into this repository and stay.

Second requirement: "every test passes as before". Check: nine focused runs, exit 0, no failure; code diff outside comments and titles is empty.

## Concerns and observations

1. **Pinned data numbers with no entry.** Several tests pin game data (body cooling 0.002, satiety loss 0.6, health losses, the campfire's 6 sticks, 60 minutes of burning, 0.5 °C of warming, 25 satiety per berry, Las's size and resources, the archetype's skills). The foundation holds none of these numbers, and I did not write entries for them: the slice's pointers named them only as "from the task", the values stand written in the test, and the slice's *Goal* names writing entries for requirements the code needs that the pointer carried. A reviewer may want entries for them (D-82 says a requirement behind a test's expected value stands in a decision or an invariant; D-80 for balance numbers). Left to the orchestrator.
2. **D-368 in the handoff.** The handoff lists "D-368 new" among the entries made before the slice; at the base D-368 is the end-of-run window decision merged from `origin/main`. Highest number at the base was D-372, so my entries are D-373 to D-376.
3. **D-374 and D-23.** D-23's *Verification* says its sentence avoids naming what a kind of condition may take, so as not to bind which kinds the closed list holds. D-374 names kinds with their ranges (as D-151 already does for two). If the orchestrator reads this as a collision with D-23, D-374 can lose the list of kinds in favour of a bare rule, but the energy range and the others would then have no home.
4. **Sources I used beyond the snapshot of the vault.** The ranges, steps and first numbers of the non-energy conditions and the rule of the program check (D-374) come from the spec of an earlier campfire task cycle, read from loop2's own git history (`git show 273446fb:docs/task-cycles/…/spec.md`), because the vault snapshot did not hold them. No path or name of that record enters any file.
5. **Reach beyond the handoff:** I read the `D-18`, `D-21`, `D-22`, `D-23`, `D-25`, `D-63`, `D-71`, `D-118` to `D-123`, `D-151`, `D-175` to `D-178`, `D-190`, `D-195`, `D-219`, `D-239`, `D-290`, `D-337`, `D-344`, `D-348`, `D-363` entries selectively (by heading or passage) to decide whether each pointer's content was already held; the invariants `nature-energy-range`, `simulation-randomness`, `map-run-repeatability`, `resurrection-renewal` and the part-map entry of `simulation` by passage; `src/browser/sim/data/conditions.ts` to check the numbers of D-374 against the data.

## Unread material

- `guidelines/coding.md` and `guidelines/testing.md`: read in part only (coding.md first 150 lines, a table of kinds; testing.md whole). Coding.md is large; the change touched no code.
- `.claude/skills/the-way-record-decision/SKILL.md` and `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `common/rules.md`, `common/way_of_working.md`, `task-cycle/skill/foundation_step.md`: read whole. `decisions/examples.md`: read; the example entry WAY-03 of the-way's own log read.
- Task passages and the plan's *Choices* table and orchestrator's review: only the passages the handoff copies were read; `task.md` and `plan.md` themselves were not opened.
- Foundation entries "Foundation entries row 1/2/3" (D-82 as changed, D-362 as changed, the invariant `tracked-file-private-names`): read D-82, D-362 whole and the invariant `tracked-file-private-names`; `action-duration-minimum` read whole.
- Snapshot notes: `plomyk_loop2.md` To do and Questions (lines 1–60) and Context (62–71) whole; `odkrywanie_loop2.md` lines 10–47, 76–78, 97–100; `przewodnik_testow_loop2.md` lines 29–31, 114, 137–156; `mag_w_lesie_loop2.md` lines 50–58; `ognisko_i_jedzenie_loop2.md` lines 30–60; `koncepcja_projektowa.md` lines 1255–1265. The rest of those notes stayed unread.
- Whole test files: I read the pointer contexts and surrounding blocks of each, not every line of the nine files (5468 lines).

## Searches not found or unclear

- No decision held the rate and threshold of nature energy's return (0.5, satiety 60 after the fall): searched `well fed`, `0.5` near energy in `foundations/decisions.md`; only D-71, D-175, D-177 mention it without numbers. Written as D-375.
- No decision held the preference of „Wędruj” or its one draw: searched `Wędruj`, `neighbour`, `draw`, `wander` in decisions and invariants. Written as D-373.
- No decision held the ranges of the numeric conditions except health in D-151. Written as D-374.
- No decision held the requirement that a program of the closed lists survives Las: searched `surviv*`, `well-built`. Written as D-376.
- Unclear: whether the empty program's death "in minute 243" in `acceptance.test.mjs` should be part of D-376; I left the number out of the entry (a result of the data) and the test keeps it hand-worked in its comment.
- `foundations/decisions.md:NNNN` line references in `encounters.test.mjs` (415, 624, 727, 762) are stale line numbers into this repository; not a pointer in the sense of the slice, left unchanged.
