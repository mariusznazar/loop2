FAIL 25223337030f132619d0acda080146fc41d67e00

# Review of slices 11, 12, 13 and 14 of `zapas-i-wskrzeszenie` (grouped review)

Range `14f9b8da..25223337` (four commits: `8d0e49cb` slice 11, `fe59bd56` slice 12, `fd5eb418` slice 13,
`25223337` slice 14). `git rev-parse HEAD` in the worktree is `25223337030f132619d0acda080146fc41d67e00`,
the head given. `.the-way` stands on `19e5774a`, the commit the gitlink records.

Counts: blocking 1 (Important), Minor 4, out of scope 0 (lines of Declined to judge: 6).

## Findings

### Important

**I-1 — slice 13. The two-deaths case of the clock runs on a team state that the game never holds and the load refuses, and asserts a clock moment that only that state gives.**

- Place: `tests/view/clock.test.mjs:610` (`const both = withUses(practised(practised(twoCharacters(), 1), 2), 2);`),
  with the helper `withUses(state, spent, nextReturnMs = null)` at `tests/view/clock.test.mjs:219-229`, and the
  assertion at `tests/view/clock.test.mjs:629-632`
  (`handed.team.resurrectionNextReturnAtMs === T0 + LOOP_MINUTE_MS + RENEWAL_MS`).
- What is wrong: the case sets two uses spent with no moment of the next return (`resurrectionNextReturnAtMs: null`).
  The load refuses exactly that shape (`src/browser/sim/saved-game.ts:510`:
  `if ((nextValue === null) !== (spent === 0)) refuse();`), and no function of the game makes it: a death
  that spends a use of a full stock starts the clock, and a death with the clock running leaves it as it runs
  (`src/browser/sim/game.ts:643-650`, `nextReturnMs ?? momentAfter(nowMs, renewalMs())`; D-190 as Slice 1
  wrote it). On this impossible state, Ola's earning-loop death, which takes the last use, falls into the
  `?? momentAfter(...)` branch and *starts* the clock at its own moment, and the case asserts that moment. In
  every state the game can hold with two uses spent, the clock already runs from an earlier death and the
  death that takes the last use does not move it. So the asserted value is a behaviour that D-190 gives in no
  reachable state, and the case's quotation of D-242 („and the clock of the returns runs from the moment of
  the death that started it”) is shown on a death that, in the game, never starts the clock.
- Why it matters: the slice's goal is that every case "reads the uses as Slice 6 made them"; this one reads a
  shape Slice 6 forbids. The assertion would not catch a regression of the rule it seems to show: with the
  impossible fixture, a bug that restarted the clock at every death gives the same value, so the case passes
  for a reason other than the rule. A reader of the case learns a false rule (the death that takes the last
  use starts the clock). The order of the two deaths, which the case exists for, is still shown by the
  generation assertions (`:633-647`), so the fix is small: give the fixture a moment that the game could hold,
  for example `withUses(..., 2, T0 + 2 * HOUR)` (any moment after the reading), and assert that the death
  leaves that moment as it was (D-190, D-240: a death with the clock running does not move it), or drop the
  moment assertion. The default `nextReturnMs = null` of `withUses` invites the same mistake for any `spent`
  above zero; a helper that requires the moment when `spent > 0` closes that.
- Evidence: in a scratch worktree of the head (`.runs/review-s1114/wt`), with only line 610 changed to
  `withUses(practised(practised(twoCharacters(), 1), 2), 2, T0 + 2 * 3_600_000)`,
  `npm test -- tests/view/clock.test.mjs` exits 1: 26 pass, 1 fail, this case, at the moment assertion,
  `actual: 1760007200000` (the moment the fixture set, left as it was), `expected: 1760014460000`. The
  generation assertions before it held.
- Contradiction: no — the product code follows D-190; the defect is a test fixture outside the states the
  game and its load admit, and an expected value that holds only there.

### Minor

**M-1 — slice 11. D-329's binding sentence still gives „Wejdź” a warning.**
`foundations/decisions.md:9883`: „… the warning of a clipped plan, and „Wejdź” and „Puść w pętlę” with their
warnings, …”. Asked to decide whether the sentence is now false: it is not false. The plural reads
collectively, „Puść w pętlę” keeps the sentence of D-326 beside it, and D-287 still puts a sentence under the
inactive buttons of each character; the slice's own rule ("keep each sentence the task does not change word
for word") kept it, and its *Verification* and *Rationale* now list the warnings exactly. It is imprecise,
though: written when „Wejdź” had the mark of D-251, it now lets a reader look for a warning under „Wejdź”,
and Slice 15, which removes that warning from the code, reads D-329. Since this task already changes D-329,
rewording the phrase to name only what stands (for example „„Wejdź” and „Puść w pętlę” with „Pętla nic nie
zarobi do skrzynki” beside it”, as the *Verification* says) costs one sentence at the return step. Leaving
it costs nothing in the code today. Not blocking.

**M-2 — slices 12 and 14. Test names and comments still say "ready" or "renewal" of the old single resurrection.**
`tests/view/end-window-game.test.mjs:1160` and `:1162` („…no renewal line where the resurrection was ready”),
`tests/view/end-window.test.mjs:334-335` („where the resurrection was found ready”, „…a first completion that
renewed”), and `tests/view/team-lines.test.mjs`, the case „a clock set back lengthens the time left: the
moment an hour earlier reads 9 godz. 0 min for 8 hours of renewal” (the renewal is 4 hours now; the case's
fixture is a clock set back, so the value holds, the name does not). The assertions are right; the words of
the names mislead a reader about the rule. The settlement kind `resurrectionReady` in the code is a label of
Slice 6 and is not part of this finding.

**M-3 — slice 14. Test-first was not followed as the slice's *Checks* order it.**
The executor writes it made no failing run before the code. I made the run afterwards: the head's
`tests/view/end-window-lines.test.mjs` against the base's `src/browser/view/end-window-lines.ts` (with a stub
export `renewalSpanText`, without which the file does not load) exits 1, 8 pass, 4 fail — exactly the four
cases of the lines (used use and no use left, no practice, the span, the returned use). So the cases do fail
when the behaviour they protect is absent; the departure has no consequence for the code. Recorded so the
cycle's record holds it.

**M-4 — slice 11. D-216's question keeps „what a completion renewed?”.**
`foundations/decisions.md`, heading of D-216. The executor's concern 3. Not false: a first solving that returns
a use renews the stock. The task changes the four lines, not the question. Polish only.

## The executors' concerns, judged

- Slice 11, concern 1 (D-329 "with their warnings"): not false; Minor M-1, recommended at the return step.
- Slice 11, concern 2 (old "ready" wording in D-219, the earning-loop entry near D-56, `foundations/decisions.md:98`
  D-04, glossary `generation number`): outside the entries slice 11 names and outside this range; the human's
  remark 2, as the handoff gives it, sends them to the return step. Declined below.
- Slice 11, concern 3 (D-216's heading): allowed; Minor M-4.
- Slice 11, concern 4 (the span "in the form of the time reading of D-217"): allowed; the code
  (`renewalSpanText`) gives exactly the forms of question 16, and the data's span is an integer number of
  minutes (240).
- Slice 12 (no browser walk; red run only for `team-lines`): allowed. The walk is the dedicated step after
  slice 17 (the handoff), and the slice orders test-first only for `team-lines.test.mjs`, which the executor
  ran red. The other two files changed only the cases of the old field, which fail on the base by
  construction.
- Slice 12, the count `3` in the expected values (a view that hard-coded 3 would pass): allowed by
  `guidelines/testing.md`, "Where the expected value comes from" ("Test parametru gry może użyć konkretnych
  liczb") with D-190 as the source; the code reads `BALANCE.resurrectionUses` and the hours through
  `resurrectionAt` (`src/browser/sim/game.ts:132-135`) and `BALANCE.resurrectionRenewalRealMinutes` — nothing
  is hard-coded in the view.
- Slice 13 (8 h -> 4 h in the tests): allowed; a cause on the side of the data and of D-190, named in the
  executor's report. (No mutation run for view files: allowed, `guidelines/testing.md` "Mutation testing"
  names StrykerJS for `simulation` only.)
- Slice 14, concern 1 (the line of a death that spent the last use reads „zostały użycia 0 z 3” in
  `text-secondary` while D-217 makes zero uses `danger` at the character): follows the task. Question 6 gives
  the line after a death that spent a use in `text-secondary`, whatever uses it left, and Settlements row 7
  carries it into D-216. Not a defect of this change; the difference is the human's choice. Declined below.
- Slice 14, concern 2 (literal „użycia 1 z 3”): follows question 6 and D-216 word for word; allowed.
- Slice 14, "no test-first run recorded": Minor M-3, with the red run I made.

## What was checked against the task and the foundation

- Slice 11 against Settlements rows 6, 7, 8 and To do 4 and 7:
  - D-215: question and binding line in the wording of row 8 („Mapa jest już rozwiązana: to przejście nie
    płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”), *Verification* quoting it,
    *Rationale* reworded from the same start. Agrees.
  - D-216: the four lines in the wordings of question 6 with `{u}`, `{c}`, `{r}`; `{u}` is the data's count
    less `usesSpent` of the settlement, read when the window is drawn (the orchestrator's note on request 166);
    the span in the forms of question 16; the line of a returned use only where one was returned, none at a
    full stock. The code (`src/browser/view/end-window-lines.ts:87-153`) does exactly that. Agrees.
  - D-217: the three lines of question 6, `danger` only at zero uses, the time reading below one hour and the
    rounding sentence word for word. The code (`src/browser/view/team-lines.ts:69-93`) does exactly that.
    Agrees.
  - D-329: *Verification* and *Rationale* without the warning of a rehearsal and without D-251. Agrees (M-1 on
    the binding sentence).
  - D-251: its entry gone from the log, a row in "Withdrawn identifiers" between D-80 and D-254 with *Why* and
    successor `none`; no other reference to D-251 in `foundations/` (search: one hit, the row). Agrees with
    `.the-way/elements/decisions/template.md`, "Changing a decision" and "Withdrawn numbers".
  - `foundation_check.py --skip-test-citations` reports nothing in `foundations/`.
- Slices 12-14 against question 6 and 16, D-216 and D-217 as they stand: every text is word for word; roles
  `text-secondary`/`danger` as the entries give; no new colour or style value (the stylesheet changes are two
  comments; `tests/invariants/test_browser_view_token_values.py` passes); the hours come from the data. The
  `decision:` lines of the changed cases hold the sentences as they stand (the citation check reports none of
  the changed files).
- Trust boundary (`src/browser/sim/saved-game.ts`, not changed in this range): the window reads
  `settlement.usesSpent`, which the load admits only as a safe integer from 1 up to the data's count
  (`saved-game.ts:835-841`), so the uses left stay in `0..count-1`, never negative and never non-finite; the
  team's uses are admitted only from 0 to the count, with a moment exactly when some are spent
  (`saved-game.ts:504-516`). Crafted input reaches the view only through these checks. Nothing in slices 12-14
  reads saved input otherwise.
- No reserved choice is taken; no screenshot file is in the range; no code exists to make a test pass.

## Declined to judge

- Old "ready" wording outside the entries slice 11 names (D-219, the earning-loop entry near D-56,
  `foundations/decisions.md:98`, glossary `generation number`): outside slices 11-14; the human's remark 2 gives it to the return step.
- `guidelines/styleguide-browser-view.md:649, 674-675, 679, 1049-1050` (D-251 and the old wording of the
  resurrection lines): the style guide belongs to slices 15-18 by the plan and To do 4.
- The references to D-251 and the old quotations in `src/browser/maps-screen.css`, `src/browser/view/maps-screen.tsx`,
  `src/browser/view/trip-lines.ts`, `tests/sim/trip.test.mjs`, `tests/view/account-screen.test.mjs`,
  `tests/view/maps-screen.test.mjs`, `tests/view/trip.test.mjs`: slices 15, 16 and 18 by the plan.
- The window's line after the last use spent in `text-secondary` while the card shows zero uses in `danger`:
  settled by the human in question 6 and Settlements row 7.
- The browser walk with screenshots of the changed lines: the dedicated step after slice 17 (human's remark 4,
  as the handoff gives it).
- The load's handling of the team's uses and the settlement (`saved-game.ts`): changed by Slice 6, outside this range; only its effect on the view was checked.

## Checks run

- `git rev-parse HEAD` — `25223337030f132619d0acda080146fc41d67e00`, the head given; `git -C .the-way rev-parse HEAD`
  equals the gitlink (`19e5774a`).
- `npm test -- tests/view/team-lines.test.mjs` — exit 0.
- `npm test -- tests/view/character-screen.test.mjs` — exit 0.
- `npm test -- tests/view/headquarters-screen.test.mjs` — exit 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0.
- `npm test -- tests/view/clock.test.mjs` — exit 0.
- `npm test -- tests/view/end-window-lines.test.mjs` — exit 0.
- `npm test -- tests/view/end-window.test.mjs` — exit 0.
- `npm test -- tests/view/end-window-game.test.mjs` — exit 0.
- `npm test -- tests/quality/test_function_and_file_size.py` — exit 0 (no function or file of the range over
  the threshold).
- `npx prettier --check` on the twelve changed files of code, tests and stylesheets — exit 0; `npx eslint` on
  the ten changed TS/MJS files — exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1, 23 errors, none in
  `foundations/` and none in a file of this range. By file: `guidelines/styleguide-browser-view.md` 2,
  `src/browser/maps-screen.css` 2, `src/browser/view/maps-screen.tsx` 1, `src/browser/view/trip-lines.ts` 2,
  `tests/sim/trip.test.mjs` 1, `tests/view/account-screen.test.mjs` 6, `tests/view/maps-screen.test.mjs` 6,
  `tests/view/trip.test.mjs` 3 — each a reference to the withdrawn D-251 or a quotation of D-189 or D-217 as
  they stood, in files of slices 15-18, as the plan expects.
- Scratch runs in a worktree of the head at `.runs/review-s1114/wt` (node_modules joined by a junction to the
  reviewed worktree's):
  - the head's `end-window-lines.test.mjs` against the base's `end-window-lines.ts`: without a stub, exit 1 on
    the import of `renewalSpanText`; with a stub export, exit 1, 4 of 12 fail — the four cases of the lines
    (M-3);
  - `team-lines.ts` mutated to put the line in `danger` already at the last use (`usesLeft > 1`):
    `npm test -- tests/view/team-lines.test.mjs` exit 1, 2 fail ("a part of the stock…", "a use returns at its
    moment…") — the tests guard `danger` only at zero;
  - `clock.test.mjs:610` given a moment the game can hold: exit 1, the two-deaths case fails at the moment
    assertion (I-1).
- Not run: the full `npm test` (the cycle's own run before the request; the handoff forbids it bare);
  `check_instructions.py` (the gate's).

## Reaches beyond the dispatch

- `src/browser/sim/game.ts:70-135` (`usesAt`, `resurrectionAt`) and `:620-745` (`teamAfterDeath`,
  `settleDeath`, `settleCompletion`) — to judge what the clock's fixtures and the lines read.
- `src/browser/sim/saved-game.ts:182-194`, `:500-516`, `:835-841` — the trust boundary the handoff names.
- `src/browser/sim/data/balance.ts:30-49` — the data's count and span.
- `foundations/decisions.md`: D-287 (`:10145-10153`, its binding sentence) and the binding sentences of D-326
  and D-188 — to decide whether D-329's sentence became false.
- `.the-way/elements/decisions/template.md:205-249` ("Changing a decision", "Withdrawn numbers") — the rules of
  a withdrawal.
- `.the-way/task-cycle/remarks_check.py:1-97` — the form of this report's sections.
- The four executors' reports, as the handoff names them.

## Working copies

- `.runs/review-s1114/` held a worktree of the head
  (`wt`, removed with `git worktree remove --force`, then `git worktree prune`; its node_modules junction was
  removed first, by itself, leaving its target untouched) and the outputs of the scratch runs (`a.txt`,
  `b.txt`, `c.txt`, `size.txt`). The directory is removed before I return; the results are written above,
  nothing is kept in `reports/`.
- `.runs/review-s1114-fc.txt`, the output of the
  foundation check, stood for a minute directly under `.runs/` and was removed; its content is above.

## Unread material

- `foundations/decisions.md`: D-185, D-189, D-190, D-218, D-219, D-221, D-242 and D-368 not read whole; the
  quotations of D-190, D-219, D-221 and D-242 in the changed cases were checked by the foundation check, and
  D-215, D-216, D-217 were read through the diff, whose hunks hold their binding sentences, *Verification*
  and *Rationale* whole; D-329 read whole.
- `foundations/invariants.md`: `resurrection-renewal`, `catch-up-minutes`, `catch-up-death-moment` not read;
  `foundations/glossary.md` (`resurrection`) and `foundations/part_map.md:3-31` not read.
- The files of the-way named in slice 11's *Read* (`.claude/skills/the-way-record-decision/SKILL.md`,
  `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `examples.md`,
  `.the-way/elements/common/way_of_working.md`, `rules.md`, `.the-way/task-cycle/skill/foundation_step.md`) not
  read; `.the-way/elements/decisions/template.md` read only at `:205-249`.
- `src/browser/view/counted-name.ts` not read (its forms checked through the cases of `renewalSpanText`).
- The changed test files read through the diff and the ranges `tests/view/clock.test.mjs:312-335`,
  `:530-680` and `tests/view/end-window-game.test.mjs:1090-1200`, not whole.
- `task.md` read only through the passages the handoff copies; `plan.md` not opened.
- Guidelines read whole: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`,
  `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`.

## Searches not found or unclear

- The human's remark 2 and remark 4 and request 166 the handoff cites stand in `cycle.md`, which is not mine to
  read; I took their content from the handoff's wording.
- `foundation_check.py --skip-test-citations` still reports "the quotation stands in no binding sentence"
  errors of test files; what the flag skips is unclear to me (slice 13's executor saw the same).
