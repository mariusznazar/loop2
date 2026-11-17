# Report — executor of slice 10: simulation: citations on tests that already check

**Status:** done with concerns (two: the copy-save case differs in wording from the plan's; `foundation_check.py` exits 1 on an error that stands at the base commit too).

## Commits and files

Base `24acd7e8f51ce13dedc5a23e775b8bee0ccf68ab`. One commit:

- `50d54bdd` test: :white_check_mark: cite the invariants action-in-progress, minute-span-split, program-rule-pick, copy-save and catch-up-minutes at the simulation cases that already check them, ...

Files (added/removed lines; 9 added, 3 removed in total), no file of `src/` changed:

- `tests/sim/encounters.test.mjs` (+3 −1): `// invariant: action-in-progress` above "an eligible attack interrupts a long exploration before it finishes"; `// invariant: minute-span-split` above the `for (const scenario of COMBAT_SPLITS)` loop that makes the cases "combat time splitting preserves every state and ordered event: ..."; the old comment `// Invariant minute-span-split: compare ...` (above `traceChunks`) lost its malformed prefix and keeps its description and its `Source:` line.
- `tests/sim/combat.test.mjs` (+4 −2): both `// Invariant program-rule-pick: ...` comments became `// invariant: program-rule-pick` as a line of their own, the description following on the next lines with its first word capitalised.
- `tests/sim/copy-actions.test.mjs` (+1): `// invariant: copy-save` above "„Zapisz jako nowy program” is no switch: the streak, the beaten attacks, the counts and the entered-with program stay".
- `tests/sim/catch-up.test.mjs` (+1): `// invariant: catch-up-minutes` above "a loop that stops in the catch-up writes its line with the minutes it worked and the generation, and the others go on" (minutes 243 of 300 for the loop that stopped, 300 for the other).

The malformed comments the slice leaves alone (`encounters.test.mjs` map-run-repeatability and restart-seed, `body.test.mjs` nature-energy-range) are untouched.

## Checks (command, exit code)

Green, after the last restore of `src/` (worktree clean):

- `npm.cmd test -- tests/sim/encounters.test.mjs` — exit 0 (29 tests, 29 pass)
- `npm.cmd test -- tests/sim/combat.test.mjs` — exit 0 (11 of 11)
- `npm.cmd test -- tests/sim/copy-actions.test.mjs` — exit 0 (35 of 35)
- `npm.cmd test -- tests/sim/catch-up.test.mjs` — exit 0 (33 of 33)
- `python -B .the-way/elements/common/foundation_check.py` — **exit 1**, one error: `tests/transport.test.mjs:1377: the quotation does not begin a sentence of `D-104``. Not from this slice: with `tests/` put back to the base commit (`git checkout -- tests`, then `git apply` of my saved diff) the same command gave exit 1 and the same single error (output `.runs/executor-10/fc-base.txt`; my diff `.runs/executor-10/slice.patch`). It stands in `tests/transport.test.mjs`, which the base commit `24acd7e8` ("add the case of the routes of the application that answer a method other than GET and HEAD") wrote; it is the orchestrator's or another slice's to settle. My citations raise no error.
- `git status --short -- src` — empty, exit 0; `git diff 24acd7e8 --stat -- src` — empty, exit 0.
- `npx.cmd prettier --check` on the four files — exit 0.

Each case seen failing (once, with the command that later shows it passing = the green line above). Each break was made in `src/browser/sim/`, the file restored with `git checkout -- <file>`, and `git diff --stat -- src` shown empty (exit 0) before the next step and before the commit. Logs are in `.runs/executor-10/`.

| Invariant / case | Break (for a moment) | Command | Exit | Cited case failing |
|---|---|---|---|---|
| action-in-progress, "an eligible attack interrupts a long exploration before it finishes" | `run.ts`, finishMinute: the attack no longer sets `current: null` (the action in progress is kept) | `npm.cmd test -- tests/sim/encounters.test.mjs` | 1 | yes; with it two other cases ("an action ending in attack minute lands, ...", "first chill and attack in one minute ...") |
| minute-span-split, "combat time splitting preserves every state and ordered event: <5 scenarios>" | `game.ts`, advanceMinutes: the returned run's `attackCooldownStart` grows by 1 when the call passes more than one minute (a state that depends on how the span is split) | `npm.cmd test -- tests/sim/encounters.test.mjs` | 1 | yes, all five; with them "cooldown starts at combat end E ..." and "a departed creature starts cooldown ..." |
| program-rule-pick, "combat skips a false first group and selects it when its condition holds" | `program.ts`, judgeProgram: in combat the group's condition is not checked | `npm.cmd test -- tests/sim/combat.test.mjs` | 1 | yes; the only failure |
| program-rule-pick, "combat skips a false first rule and selects it when its condition holds" | `program.ts`, judgeRule: in combat the rule's condition is not checked | `npm.cmd test -- tests/sim/combat.test.mjs` | 1 | yes; the only failure |
| copy-save, "„Zapisz jako nowy program” is no switch: ..." | `programs.ts`, saveCopyAsNewProgram: it zeroes the counts, the streak and the beaten attacks, as a switch does | `npm.cmd test -- tests/sim/copy-actions.test.mjs` | 1 | yes; with it "„Zapisz jako nowy program” works where the program is gone and after death" |
| catch-up-minutes, "a loop that stops in the catch-up writes its line with the minutes it worked ..." | `loop.ts`, catchUp: the line takes `span.minutes` (all the minutes of the span) instead of `passed` (the minutes until the loop stopped) | `npm.cmd test -- tests/sim/catch-up.test.mjs` | 1 | yes; with it "a stop in the catch-up closes the line of an earlier return ..." and "with one resurrection for two deaths ..." |

A first thought for the last row, dropping `&& !stopped` from the `while` of `catchUp`, gave exit 0 (33 of 33): an equivalent mutation, since after a stop the loop is gone and `advanceLoopRun` passes 0 minutes, so the `break` on `advanced.passed === 0` ends the loop anyway. It is not the evidence; I report it so the reviewer does not repeat it.

## Own-work check (section 3)

Requirement most likely missed: "each case seen failing against `src/browser/sim/` broken where its clause holds" — in particular that the break is of the clause and not just of whatever the case happens to touch. Check: for each of the six citations I ran the file against a break named in the table above, and read the list of failing cases to see that the cited case is among them (it is, in every row). The weakest link is the minute-span-split row: its break is a contrived, split-dependent field and not a natural bug; it shows the cases catch split dependence in the state they compare, which is the clause, but not that they catch every natural kind of it.

Mutating in my head: a citation line is a comment, so no code behaviour changed; the only risk is the wrong case carrying a citation, handled by the choice below.

## Choices, with the way rejected and the cost if wrong

1. **copy-save case (mismatch with the plan's wording; small).** The plan says "the counts at zero after a switch". The case with that effect is "a switch gives the map run a fresh copy ... with the streak, the beaten attacks and the counts at zero" (line 328 before my edit); it checks `switchProgram`, which the clause of copy-save does not mention, so a break of the clause (a save as a new program acting as a switch) does not fail it. The case that checks the clause — „Zapisz jako nowy program” is no switch: the streak, the beaten attacks, the counts and the entered-with program stay — holds the same counts, as the opposite side of the same contrast, so I cited that one (the red run shows it failing). Rejected: citing the switch case too (it would claim a clause it cannot fail on). Cost if wrong: the reviewer or the orchestrator wanted the switch case; adding the line above it is one line.
2. **Where the minute-span-split citation stands.** I put it above the `for` loop that makes the cases (the comment above `traceChunks`, 70 lines up, keeps its description and `Source:` line but no longer starts with the malformed prefix). Rejected: leaving the citation in the helper's comment, which is not at the case. Cost if wrong: none for `foundation_check.py`, which reads the file.
3. **Which catch-up case carries `catch-up-minutes`.** The file already cites it at two cases ("... one game minute for each whole real minute ..." and "a clock turned back ..."); the third, the clause "until it stops", is the case that checks the minutes of a loop that stopped in the span (243 of 300), so I cited that one. A case close to it, "a stop in the catch-up closes the line of an earlier return with the minutes added", also checks it (10 + 243) and fails on the same break; not cited, as the plan has one citation here.
4. **The wording of the two program-rule-pick comments.** Each keeps its description (capitalised first word) and its `Sources:` line below the citation line; nothing in the description was reworded.

## Reaches beyond the dispatch

- `the author's global rule file git.md` (the user's global rule, read before the commit; the hook required it).
- `.the-way/elements/common/foundation_check.py` lines 145-184 and 355-394 (how a citation is read: `CITATION`, `cited_names`), to put the lines in the form it reads.
- `src/browser/sim/run.ts` 680-781 (`finishMinute`), `src/browser/sim/combat.ts` (whole), `src/browser/sim/program.ts` (`judgeProgram`, `judgeRule`, `chooseCombatRule`), `src/browser/sim/programs.ts` (`saveCopyAsNewProgram`, `switchProgram`), `src/browser/sim/loop.ts` 420-612 (`loopSpan`, `passLoops`, `catchUp`), `src/browser/sim/game.ts` 700-897 (`passRealTime`, `advanceMinutes`): to choose the breaks. Not edited in the commit.
- `scripts/test-node-file.mjs` (what `npm test -- <file>` runs).
- The whole of `tests/sim/catch-up.test.mjs`, `encounters.test.mjs`, `combat.test.mjs` and `copy-actions.test.mjs` before changing each.

## Working copies

No worktree and no clone. `.runs/executor-10/` (ignored by git) holds the logs of the runs named above, `slice.patch` and `fc-base.txt`; it stays for the reviewer to read and may be removed.

## Mismatches of the plan (section 4)

- Small: the plan's line numbers in `foundations/invariants.md` and `decisions.md` differed from the handoff's current ranges; I used the handoff's. The copy-save wording: see choice 1.

**Unread material:** none. (Read whole: `make-change/SKILL.md`, `slice.md`, `guidelines/testing.md`, `guidelines/coding.md`, the five invariants, D-20, D-23, D-140, D-71, D-171, D-242, D-247, glossary `copy`, `earning loop`, `loop`, `catch-up`, part `simulation`.)

**Searches not found or unclear:** none. One point unclear: the plan's "the counts at zero after a switch" for copy-save (choice 1).
