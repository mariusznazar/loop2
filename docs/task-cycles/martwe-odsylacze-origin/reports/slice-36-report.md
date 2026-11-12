# Slice 36 report

**Status:** done (with the judgments listed under *Concerns*)

**Base:** `329514af7acee3bc80664866d401b367c5f39b4e` (HEAD at start, clean worktree).

**Commits:**
- `eceb579c` docs: add D-384 (new decision, written through `the-way-record-decision`).
- `5b78e796` test: comments of the eight test files.

## Files changed

`foundations/decisions.md` (+15, D-384 at the end), `tests/sim/catch-up.test.mjs`, `death.test.mjs`, `loop.test.mjs`, `random.test.mjs`, `rules.test.mjs`, `run-record.test.mjs`, `saved-game.test.mjs`, `tests/password-measurement.test.mjs`. The diff of `tests/` holds only comment lines (checked with a filter over `git diff -U0`).

## New decision D-384

D-384 "Which game states does the load of a saved game state admit?" (scope simulation, Origin `none`). Next free number: the highest heading at the head was D-383. Written through `the-way-record-decision`: read project skill, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `common/rules.md`, `common/way_of_working.md`; step 2 search (D-206, D-213, D-221, D-247, D-248, `save-version`, `death-settled-once`: none answered the question in passing); step 3 draft; step 4.3 `foundation_check.py` 0 errors; step 4.4: no invariant named, no other entry names D-384 yet. Its content comes from the sources in the tree (the test comments themselves and the earlier cycle's spec in git history, sections 4, 9, 13 of the earning-loop and settling specs), not from a vault note. Reason for the entry: tests assert it (RangeError for a moment that is no safe integer in `settleDeath` and `withSaveTime`; load admits any safe integer of any sign for the save time and the moment of readiness; load admits what the game makes) and no foundation entry stated it.

## Per changed line: old pointer, outcome, entry

| File | Old pointer | Outcome | Entry |
|---|---|---|---|
| rules.test.mjs:1 | "Spec rules S1 and S2 (spec section 3)" | named the invariants the two scans check; S1/S2 kept as local labels | simulation-isolation, D-04, simulation-randomness, D-22, content-identifiers, D-18 |
| rules.test.mjs docstrings (2) | "spec rule S1/S2" | "scan S1/S2" | (header) |
| random.test.mjs:74 | "(spec 5)" | D-22 (fifth draw moving no other) | D-22 |
| password-measurement:22 | "(spec, section 6)" 80% of 512 MiB | invariant name | player-argon2-deployment-check |
| password-measurement:36 | "(reports/63-human-remarks.md, item 4)" | pointer dropped, the fact about the fixture stays | none (see Concerns 1) |
| password-measurement:82 | "provisional candidate of the spec, section 5" | the explicit profile of `src/server/passwords.ts` | D-113 (see Concerns 2) |
| run-record:1 | "task koniec-przejscia, To do 5, 10" | dropped, decisions already listed | D-135, D-368, D-212 (checked, state the record) |
| catch-up header | "and the spec (sections 2, 4, 6, 7, 8, 11, 14 and 15)" | replaced by the decisions that hold those sections | D-239 (14), D-241 (4), D-242 (6, 7), D-240 (7), D-246 (11), D-247 (8); 2 stays with D-242, D-250 already cited in the file |
| catch-up:383 | "Spec section 7 and 16" | D-240 | D-240 |
| catch-up:434 | "Spec section 2 and 6" | D-242 | D-242 |
| catch-up:496 | "as the spec section 7 gives" | "as the two decisions give" (D-240, D-242) | D-240, D-242 |
| catch-up:745 | "functions of the slice" | "functions of the earning loop" | none |
| loop header | "and from the spec (sections 1, 3, 4, 5 and 15)" | dropped; D-241, D-249, D-190, D-22 already listed | existing list |
| loop:431 | "Spec 3" | D-249, D-119 | D-249, D-119 |
| loop:517 | "Spec 3" | D-119 | D-119 |
| loop:626 | "Spec 4, D-179" | D-179 | D-179 |
| loop:784 | "Spec 4" | D-241, D-221 | D-241, D-221 |
| loop:909-911 | "Spec 4, 15 and the plan's *Goal* ... This slice does not change the trust boundary" | whole comment removed (title says the first half, the second half is process talk) | none |
| loop:1003 | "functions of the slice" | "functions of the earning loop" | none |
| death header | (no pointer) | added D-384 to the list | D-384 |
| death:158 | "D-190" cited for the number a death gave | D-190, D-216 (D-190 alone does not say the settlement holds the number) | D-190, D-216 |
| death:333, 354 | "Spec, decision 4" | D-384 | D-384 |
| death:379 | "Spec, decision 4" | D-221 | D-221 |
| death:417, 437, 463 | "Spec, decision 6" | dropped; D-190 / D-190, D-200 / D-190 | D-190 ("a Restart after a death with no resurrection ready starts from the character as that death left it"), D-200 |
| saved-game:40 | "(D-206; spec sections 1, 9, 11 and 13)" | D-206, D-241, D-245, D-246, D-248 (the four keys loops, stoppedLoops, awayReport, saveTimeMs) | those |
| saved-game:719 | "(spec, decision 1)" | D-204 | D-204 |
| saved-game:797 | "decision 5" | D-190, D-216 | those |
| saved-game:804 | "Decision 5" | D-216 | D-216 (see Concerns 3) |
| saved-game:1061 | "Decision 9" | D-190, D-220 for the generation, D-384 for the moment | those |
| saved-game:1336 | "(decision 9; D-55, D-189)" | "(D-55, D-189)" | D-55, D-189 |
| saved-game:1371 | "(decision 9)" | D-221, D-190 | those |
| saved-game:1666 | "Spec section 13, the save time" | D-248, D-384 | those |
| saved-game:1679 | "Spec section 13, the earning loops" | D-241 | D-241 |
| saved-game:1815 | "Spec section 13, the stopped loops" | D-245, D-241 | those |
| saved-game:1843 | "Spec section 13, the report" | D-246 | D-246 |
| saved-game:2258, 2264 | "Spec section 13 ... as settled at the review of the slice" | D-384; review remark dropped | D-384 |
| saved-game:2319 | "Spec section 1: no function fills the four keys yet" | D-241, D-246, D-248 (a new game holds none) | those |
| saved-game:2329 | "Spec section 9" | D-248 | D-248 |
| saved-game:2340 | "Spec section 9" | D-384 | D-384 |
| saved-game:2351 | "Spec section 13; D-07, D-248" | "D-384; D-07, D-248" | D-384 |
| saved-game:2366 | "Spec section 13: `savedGame` takes no real time" | D-248 (stamped on the way to the document) | D-248 |

Cited decisions opened and checked against the claim: D-04, D-18, D-22, D-55, D-71, D-07, D-113, D-119, D-135, D-179, D-183, D-189, D-190, D-200, D-204, D-206, D-209, D-211, D-212, D-213, D-216, D-218, D-219, D-220, D-221, D-239, D-240 to D-251, D-368. Invariants read whole: simulation-isolation, simulation-randomness, content-identifiers, player-argon2-deployment-check, save-version, death-settled-once, catch-up-state, catch-up-minutes, catch-up-death-moment, minute-span-split, map-run-repeatability, trip-transfer, trip-run-end, loop-run-knowledge.

## Checks

- S1 `git grep` over the eight files: no line (exit 1 of grep).
- S3 `git grep` over the eight files: only `saved-game.test.mjs:48` ("frozen bring\n// plan", the product's bring plan, not a document). The other earlier hits on "trip plan" / "bring plan" (about 25 lines, titles and data names in `catch-up`, `loop`, `saved-game`) and `catch-up.test.mjs:50`, `loop.test.mjs:82` ("`program` with the trip plan given") are the product's trip plan, not a plan document. No hit points to a document outside the foundation.
- Wider search (task, Q-number, To do, section, decision N, settled at, review, slug names, `.md`, `reports/`, URLs): clean, except `catch-up.test.mjs:7` "its predecessor" (the old Loop game as a game, as D-219 words it; no file named) and `password-measurement.test.mjs:74` `"https://loop2.mariusznazar.com"` (a code string, not a comment; left, outside the slice's allowance).
- `npx prettier --check` on the eight files: exit 0. `npx eslint` on the eight files: exit 0. (No Python file changed, ruff not run.)
- `python -B .the-way/elements/common/foundation_check.py`: "0 errors", exit 0.
- Focused tests, one at a time with `npm test -- <file>`, each exit 0: catch-up 28/28, death 26/26, random 12/12, rules 6/6, run-record 15/15, loop 37/37, saved-game 36/36, password-measurement 12/12.
- Full `npm test` not run (as instructed).

## Own-work check

Requirement most likely not met: a comment still citing a decision for something the decision does not state, or a leftover pointer in a place the greps do not reach. Checks: opened each cited decision (list above) and compared the claim; broad greps above. Findings fixed: `death.test.mjs:158` cited D-190 alone for "the settlement holds the number this death gave" (now D-190, D-216). Not fully covered: comments citing D-07, D-61, D-194 that predate this slice (`death.test.mjs:230, 241`, `saved-game.test.mjs:2352`) were read for plausibility only; D-07 was opened, D-61 and D-194 were not.

## Concerns (judgments for the orchestrator)

1. `password-measurement.test.mjs:36` "kernel 5.15 has no memory.peak": the fixture's claim is true of the kernel but no foundation entry states it (`cgroup-memory-accounting` lists what 5.15 counts, not that the file is missing). I dropped the pointer and kept the statement, since the fixture lacks that file for this reason. If the orchestrator wants it sourced, it needs an environment-fact entry.
2. `password-measurement.test.mjs:82` the numbers m=65536, t=3, p=1, 32 bytes are in `src/server/passwords.ts` and the test; no decision states them (D-106, D-113 say "explicit, measured"). I cited D-113 for "one explicit Argon2id profile" only. The test copies the production profile by hand, so changing the profile deliberately breaks it; I did not add a decision for the numbers (the profile is a tuning value, not a requirement) and did not change the test.
3. `saved-game.test.mjs:804` "the number of that death stays however far the character has gone on since" rests on D-216 ("Teraz to pokolenie {n}" read until Restart or Zakończ and after a load, "the game state remembers how each death was settled"). D-216 does not say it as plainly as the comment; it is the closest entry. A sharper sentence would be an edit of D-216.
4. D-384 also states "the load admits every game state the game's own functions make". The test file's own comment (`saved-game.test.mjs` near the "Game states the simulation makes" block) said so; no earlier entry did.
5. Mismatch with the handoff: none of substance. The handoff's plan said D-372 or higher; the head was D-383.

## Reach beyond the dispatch

- Read `guidelines/coding-saved-game.md` (lines 1-200) to see what the foundation says about strict reading and the load (it names D-213, D-241, D-247): not in the *Read* list; needed to place the load conditions.
- Read the earlier cycles' specs from git history (`git show af373251:docs/task-cycles/petla-zarobkowa/spec.md`, `git show 48fae938:docs/task-cycles/rozliczenie-przejsc/spec.md`, into a scratch file outside the tree) to learn what "spec section N" meant. Not a vault or old-Loop source.
- Opened `foundations/decisions.md` and `foundations/invariants.md` by passage, the decisions and invariants named above whole.

## Unread material

- `docs/task-cycles/martwe-odsylacze-origin/task.md` passages and the cycle record `cycle.md` (question Q9) were not opened; the handoff copies the passages and states the Q9 decision. `.the-way/elements/decisions/examples.md` read only to its first lines (the decision skill's step 1 names the examples; I took the form from D-382, D-383 and D-248 instead). `guidelines/testing.md` read whole; `guidelines/coding.md` read whole. `guidelines/coding-saved-game.md` read from line 1 to 200 (the rest is the file's "Where in code" list). The eight test files were read by their comments and the passages around each pointer, not whole; the snapshot `the private snapshot of the notes (not committed)/` was not needed and not opened.

## Searches not found or unclear

- The spec sections that the old comments cited were found only in git history; `docs/task-cycles/*/spec.md` of the rules-scan spec ("spec section 3" in `rules.test.mjs`) was not looked up: the invariants `simulation-isolation`, `simulation-randomness`, `content-identifiers` state the same scans, so I used them.
- No foundation entry states that kernel 5.15 has no `memory.peak` (Concerns 1) or the numbers of the Argon2id profile (Concerns 2).
