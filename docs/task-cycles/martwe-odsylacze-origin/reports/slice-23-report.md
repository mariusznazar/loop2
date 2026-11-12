# Slice 23 report

**Status:** done

Slice base: `a9c59e173020c1b9eebbc117a3e18e67f1125714` (HEAD at start, worktree clean).

## Commits

- `5a853374` docs: record D-377 and D-378 (`foundations/decisions.md`, +30)
- `18093f00` test: comments and titles of the nine test files (46 lines added, 61 removed across them)

Files changed: `foundations/decisions.md`, `tests/sim/{trip,skills,copy,copy-actions,program-list,program-counts,map-card,rule-signs,gather}.test.mjs`. Only comments, docstrings and test titles changed in the tests (two titles: skills and rule-signs).

## Decisions written

Method: `the-way-record-decision` (-> `.the-way/elements/decisions/skill/SKILL.md`): step 1 read (template, rules, way_of_working, read.md, decide_entry.md, foundation entries D-18, D-82, D-191-D-201, D-308-D-310, D-372, D-374-D-376), step 2 search of the foundation (D-18, D-191, D-372, D-310 touched; no collision, no glossary term), step 3 draft from the note passages, step 4.3 write at the end of the log and `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (exit 0, "0 errors"). No invariant is named, so step 4.4 had nothing to write.

- **D-377** (new, *Origin* none): the practice curves of the eight character skills and the effect and prices of each branch. Reasoning from the passage of the (deleted) note on practice and skill trees, question Q8 (numbers of the old loop game's data are an accepted requirement; weak point: balance measured in another game, with two ranks of „Zwinny odskok” a dodge takes the whole wolf blow; later tuning is a change of data and tests); *Rejected* is the note's option B. I checked every number of the decision against `src/browser/sim/data/skills.ts` and `actions.ts`/`creatures.ts` (thresholds, costs, amounts, base 6/3/5 damage and dodge, wolf blow 7): all agree.
- **D-378** (new, *Origin* none): the words of each refusal of an action (the table of the note on state and reason at a rule, question 4, 16 rows). *Rejected* is the note's options B and C (same as D-310's). D-310 already held the form and order; it did not hold the per-row words. I chose a new decision, not an edit of D-310, because the slice allows only adding a decision and the template reads a new rule beside an old one as a new question.

## Per changed line: old pointer, outcome, entry

Outcomes: named = entry named; written = entry written; removed.

### tests/sim/map-card.test.mjs
- l.1-2 "To do 4 of the task karty-i-katalog-map, in the vault's karty_i_katalog_map_loop2.md" -> removed; header now "D-327, D-333 and D-142" (named).
- l.57 "the task's To do 4 gives „≈ 18 z 25”" -> "D-333: rounded to the nearest whole" (named). See concern 1.

### tests/sim/gather.test.mjs
- l.17 "task, To do 5" -> removed (D-25, D-64 to D-66, D-71 stay).
- l.330 "task, To do 1 and 7" -> removed (the doc comment says what the function does).

### tests/sim/program-counts.test.mjs
- l.250 "Task "programy-gracza", To do 1" -> removed (the code line says it).

### tests/sim/program-list.test.mjs
- l.1-3 "task "programy-gracza", vault file programy_gracza_loop2.md (To do 3, 4, 5 and 9)" -> removed; D-164, D-165, D-168, D-169, D-170 stay.
- l.349 "spec decision 4" -> D-170 (named; D-170 holds the order pick, used last, entered last, first of the list).

### tests/sim/copy.test.mjs
- l.2-3 "task "programy-gracza", vault file `programy_gracza_loop2.md` (D-82), its To do 1, 5, 6, 7, 10 and 11" -> removed; header "D-91, D-93, D-123, D-164, D-165 and D-170".
- l.30 "(D-91; To do 1)" -> "(D-91)".
- l.76 "To do 7" -> D-164 (named).
- l.131 "D-170; To do 5" -> "D-170".
- l.175 "To do 6" -> D-164 (named).
- l.190 "To do 10, D-93" -> "D-93".
- l.226 "To do 11, D-123" -> "D-123".
- l.280-281 "Plan, Choices: outside a map run `setProgram` edits ..." -> removed (the test title already says it; it was a plan choice of the cycle, not a product requirement).
- l.313 "spec constraint D-90" -> "D-126" (D-126 holds that a rule outside the repertoire is passed over and stays in the program; D-90 of the spec was not the foundation's D-90, which is about rule groups). Named.

### tests/sim/copy-actions.test.mjs
- l.2-3 "task "programy-gracza", vault file `programy_gracza_loop2.md` (To do 6 to 12)" -> removed; D-93, D-131, D-136, D-164, D-171, D-174 stay.
- l.314 "Changed by the task "kronika-z-filtrami" (To do 4, D-341)" -> "D-341" (named).
- l.399 "task kronika-z-filtrami, To do 4; D-341, D-131" -> "D-341, D-131".

### tests/sim/rule-signs.test.mjs
- l.2-3 "task stan-i-powod-przy-regule, To do 2 to 6 and questions 3 to 5 ... table of question 4 ... To do 2 and 3" -> "D-308, D-309, D-310 and D-378"; reasons D-378 and D-309, bars D-308 (named).
- l.88-90 "The table of question 4 ... the words are the task's, which is what binds them" and the title "...the reason of the table of question 4" -> "(D-378)" and title "...the reason of its row in D-378" (written: D-378). Title of the test of the table changed as the slice allows.
- l.762-764 "task teraz-i-potem, To do 1, questions 1, 2, 8, 9, 14 and 15 ... the task's examples" -> "D-334, D-335, D-147 ... examples of those decisions" (named).

### tests/sim/skills.test.mjs
- l.1 "accepted task wprawa_i_drzewa_loop2.md, To do and Questions 1-12" -> "D-191, D-193, D-194, D-197, D-198, D-372 and D-377" (D-377 written).
- title l.107 "all accepted cumulative thresholds" -> "all cumulative thresholds of D-377" (written: D-377).
- l.193 "Accepted Q7 and Q8: 5 - 3*2 is clamped to one minute" -> "D-372" (named; D-372 carries the example).
- l.255 "Accepted Q8" -> "D-377" (written).
- l.501 "Accepted Q8" -> "D-377" (written).
- l.537-538 "(To do 2, 3); the loop test is src/sim/skills.test.ts:470-480" -> "(D-194, D-214)" and the loop test removed.

### tests/sim/trip.test.mjs
- l.112 "(To do 3, 5)" -> D-214. l.381 "(To do 3, 5)" -> D-214. l.348 "(To do 5)" -> D-189. l.362 "(To do 2)" -> D-189. (named)
- l.123 "hand-counted from To do 4-6 of plan_wyprawy_loop2.md" -> "from the rules of D-179 and D-187" (named).
- l.542-543 "hand-counted from To do 1-5 and 14 of the task rozliczenie-przejsc; the loop test a case follows is named in the case" -> "from the rules of D-189, D-190 and D-214" (named).
- l.553-554, 586, 627, 642, 670, 696 "loop src/sim/chest.test.ts:... / skills.test.ts:..." (six comments) -> removed; each test keeps its `invariant:` line and its title.
- l.707 "To do 14, D-61, D-190, question Q1" -> "D-61, D-190".
- l.726 "(To do 5, item 4)" -> "(D-189)".

## Checks (command, exit code)

- `npm test -- tests/sim/trip.test.mjs` 0 (29 pass); `skills` 0 (18); `copy` 0 (12); `copy-actions` 0 (35); `program-list` 0 (26); `program-counts` 0 (11); `map-card` 0 (11); `rule-signs` 0 (40); `gather` 0 (16). Same counts as before the change were not recorded at the base; all pass, 0 fail.
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 <nine files>` 0.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig <nine files>` 0.
- `python -B .the-way/elements/common/foundation_check.py` 0 ("0 errors"), after both commits' content.
- S1 (`git grep` with the slice's pattern) prints no line, exit 1. S2 no line, exit 1. S3 no line, exit 1. So no S2 hit needs a "points to nothing" listing; S2/S3 hits existed at the start (listed above) and are all fixed.
- Extra search beyond S1-S3, case-insensitive for `loop|vault|note|task|spec|plan|definition|concept|MVP|accepted|predecessor|Mariusz|choices|round|pytanie|zadani`: remaining hits are code identifiers (`tripPlan`, `bringPlan`, `around`, "rounded"), "earning loop", the invariant name `trip-plan-progress`, and test titles using "plan"/"trip plan" for the product's trip plan; none points outside the repository. This extra search found "Plan, Choices" (copy.test.mjs) and "spec constraint D-90", which S3 missed.
- Not run: `npm test` with no argument (the cycle's gate).

## Own-work check

Requirement most likely not met: "no pointer left, and each named decision really holds what the comment relies on". Checks: (a) S1-S3 plus the broader search above, no pointer left; (b) every `D-n` cited in the nine files resolves to a `### D-n` heading (script-free loop over `grep -o`, no MISSING); (c) I read the cited decisions against the sentence each comment attaches to them (D-164 for the copy/restart/edit, D-170 for the row order, D-214/D-189 for "from nowhere", D-126 for passing over, D-333 for rounding, D-310/D-378 for reasons, D-334/D-335/D-147 for Teraz/Potem) and found the doubtful ones listed in the concerns.

## Concerns and things the cycle may want to look at

1. `map-card.test.mjs` l.57: the note's „≈ 18 z 25” (half rounds up, 17.5 -> 18) is held by D-333 only as "rounded to the nearest whole"; the half-up case is the test's own value. I did not write a decision for it.
2. `rule-signs.test.mjs` l.233 "...rounded down, of what it costs" (the energy a character has in „brak energii natury: 9 z 10"): the rounding down is in neither the note's table nor the foundation (D-378 says `{ma} z {trzeba}` only). It is a requirement only the test and the code hold. Not changed (no pointer).
3. `program-counts.test.mjs` l.17 cites "foundations/decisions.md:1619,1641" for D-92 and D-93; those line numbers are stale (the file moved). It is a repository path, not a pointer of this slice; left as is.
4. The orchestrator's rule about the cycle records widened S3; I also treated "Plan, Choices" and "spec constraint D-90" as pointers (see above). The foundation's D-90 is a different decision from the spec's "D-90", so the old comment was misleading, not just a pointer.
5. The D-82 sentence "a requirement that only a document held has to be entered into the foundation" led me to write D-377 for the skill numbers. If the cycle prefers that tests simply expect the numbers of the data file (D-18) with no decision, D-377 can be dropped and the five citations of it turned into "the data of the character skills (D-18)". Cost if D-377 is wrong: a wrong number in a decision that the test then checks against the same data, so a mismatch fails the test, not silently.

## Unread material

- `docs/task-cycles/martwe-odsylacze-origin/task.md` and `plan.md`: I read only the passages copied into the handoff (not the files).
- `foundations/decisions.md`: D-80 (named in the handoff's *Read*) not read; D-82 read whole; D-362/D-368 and the invariant `tracked-file-private-names` not read (no comment of my nine files touches them). Each decision cited in my edits I read whole or by its binding sentences and its *Rationale* where it was long (D-308, D-310, D-327, D-333, D-334, D-335, D-147: read to the end of the binding part and verification; *Rejected* of D-308, D-334, D-335 in part).
- `foundations/invariants.md`: read whole `trip-transfer`, `trip-run-end`, `solved-map-manual-run`, `trip-plan-progress`, `action-duration-minimum`; the other invariants cited by `invariant:` lines in my files (none) not applicable.
- `foundations/part_map.md`: only the first lines of the `simulation` entry.
- `.the-way/task-cycle/skill/foundation_step.md`, `guidelines/testing.md`, `guidelines/coding.md`, `.claude/skills/the-way-record-decision/SKILL.md`: the skill file and `foundation_step.md` read whole; `guidelines/testing.md` and `guidelines/coding.md` not read (no code or test logic changed).
- Snapshot: `wprawa_i_drzewa_loop2.md` read lines 8-92 and the table of settlements in part; `stan_i_powod_przy_regule_loop2.md` read lines 98-126 (question 4) only; the old Loop's tests under `old-loop/` not opened (every loop-test pointer was removed because the title and the `invariant:` line already say it, or a decision holds it).

## Searches not found or unclear

- Settlement of "how a send's one function (item 4 of To do 5) is a requirement": no decision names `sendTake`; the behaviour is D-189. I dropped the "item 4" reference; the code and test titles carry the rest.
- The "Choices" the copy.test comment pointed to (plan of an earlier cycle) is not in the tree; I treated its content as redundant with the test title.
- Nothing else not found.

## Reaches beyond the dispatch

None beyond the Read list, except `src/browser/sim/data/skills.ts`, `actions.ts`, `creatures.ts` (read to check the numbers of D-377, a check not a source) and D-91, D-93, D-126, D-61, D-189, D-190, D-214, D-179, D-187, D-193, D-194, D-197, D-198, D-333 (found by grep to replace pointers).
