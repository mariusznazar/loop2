PASS 3a5b17252229e60facf0cd9714f1395d08e10159

# Review of the return step, task `rozliczenie-przejsc`

Range `923391c..3a5b172`, two commits; `git rev-parse HEAD` is the head given. Variant: a later change
on the task's branch, against the task and the entries the return step writes or corrects.

**Counts:** 0 blocking, 4 Minor, 4 out of scope (the lines of *Declined to judge*).

## Findings

### Critical

None.

### Important

None.

### Minor

**M1. D-221 holds a lasting exclusion written categorically.**
`foundations/decisions.md:4039`, „which leave the death unsettled and take no real moment”.

- What is wrong: Q9's rule (`task.md:109`) bars words that exclude an alternative and wants a lasting
  exclusion written as what the game does not have today; the spec glosses that as „currently”
  (`spec.md:287`–`288`). A search of D-221 for `only`, `never`, `always`, `without`, `solely`, `merely`,
  `must`, `cannot` finds none, and `alone` stands once, in *Rejected*, describing a rejected way. „take
  no real moment” is the one exclusion in the binding sentences. Report 19 does not speak of Q9 for
  D-221.
- Why Minor and not blocking: Q9 ends „zasada dotyczy wierszy *Settlements to record*”, and D-221 is no
  row; the sentence is true of today's code (`game.ts:487`, `:530`), and the Rejected ways are the
  template's own place for what was turned down. The human's reason for the rule still reaches it:
  these elements will change.
- Fix, one word: „which currently leave the death unsettled and take no real moment”.

**M2. D-221's *Rationale* describes the change, not the decision as it stands.**
`foundations/decisions.md:4053`, „so `minute-span-split` compares what it compared”.

- What is wrong: the template wants *Rationale* to describe the decision as it then stands, never the
  change (`.the-way/elements/decisions/template.md:125`–`126`). „what it compared” points to the time
  before this task, which a reader of the log cannot see without git history. The words come over from
  the spec (`spec.md:112`), where a before existed.
- Evidence of what it should say: `tests/invariants/test_minute_span_split.py:20`–`21` compares calls of
  `advanceMinutes` and `passRealTime`, whose results hold a death unsettled.
- Fix: „so `minute-span-split` holds of game states with the death unsettled”, or the like.

**M3. „Whoever passes game time” reads wider than what the entry means.**
`foundations/decisions.md:4039`.

- What is wrong: read alone, the sentence takes in `passRealTime`, which passes game time and returns
  it unsettled (`game.ts:502`), and every test that calls `advanceMinutes` and reads the result.
- Why Minor: the same sentence's „so the game state the browser view holds, draws and saves” and the
  *Verification*'s violating example („drawing or saving what they return”) give the scope, and the
  *Rationale* itself rests on those functions being checked unsettled. In product code the one caller
  is `clock.ts:68`–`69`, which complies. An agent comparing a change will read it as meant. Worth a
  word only if M1 or M2 opens the sentence anyway.

**M4. C1: the rename is required by the template, and the request has to say so.**
`foundations/decisions.md:1834`, `tests/http.test.mjs:642`, `tests/sim/program-counts.test.mjs:258`. Open
from report 08 M3, not new here.

- Checked: these are all the uses (`git grep -i` over every tracked file outside `.the-way`, each read).
- The author's „Unclear” can be settled. The definition of `resurrection` is false of „resurrect a
  destroyed session”, which is the template's test for two meanings (`glossary/template.md`, „Two uses
  carry two meanings”); the skill reads a word in each of its forms (`glossary/skill/decide_entry.md`);
  and row 11 says a reader of games takes the game's meaning otherwise. So „one of the two is renamed,
  the human choosing the new word” applies.
- *Not* reading `none` is right: the skill bars the meaning a reader of the field gives
  (`glossary/skill/SKILL.md:34`), so no `TODO` belongs there.
- What follows: nothing an agent can do, and the author is right not to pick the word. In the request,
  though, „left as it is” is a departure from WAY-99 for the human to accept, not a neutral third way;
  the report's „the main branch's rule is kept either way” holds of the `TODO` sentence alone.

## Claims of report 19 checked

| Claim | Result | Evidence |
|---|---|---|
| D-221, „functions that pass game time … take no real moment” | true | `advanceMinutes(state, minutes)`, `passRealTime(state, realMs)`, `game.ts:530`, `:487`; both leave `deathSettlement` null |
| D-221, a function apart settles | true | `settleDeath`, `game.ts:435` |
| D-221, the caller settles at once, one result | true | `clock.ts:67`–`69`; `passRealTime` has this one caller in `src`, `advanceMinutes` the one in `passRealTime`; deaths are set in `run.ts:456`, `:632` alone |
| D-221, a load refuses a death unsettled | true | `saved-game.ts:798`–`799`; crafted case „a death unsettled”, `tests/sim/saved-game.test.mjs:1140` |
| D-221, „refused … and so discarded” | true | `app.ts:54` starts a new game, `:216` saves over the refused state at once, with the notice D-96 asks |
| D-221's *Rejected* against spec decisions 4 and 7 | true; the three ways are the spec's, their reasons kept | `spec.md:122`–`130`, `:177`–`179`. WAY-134 binds rows, and D-221 is none |
| D-221, form | keeps the template: question, three sentences, fields, two-way link, end of the log, next free number, no withdrawn list in the file | `decisions/template.md`; `foundation_check.py` exit 0 |
| D-221, *Origin* | the places exist | vault note `rozliczenie_przejsc_loop2.md`, line 33 (To do 16), line 166 (first carried question) |
| Verification's examples are the author's | named in C2, so the human meets them at the merge, as `decisions/skill/SKILL.md:34`–`35` needs | report 19, C2 |
| A binding choice, WAY-36 | D-221 passes the plan test: its rule binds task 18 | `.the-way/foundations/decisions.md:912`; spec, *Cost if wrong* |
| D-04: „check” is the last word of a term of the-way | true | `.the-way/foundations/glossary.md:169`, `standing check`; WAY-104 |
| D-04: same meaning, D-207's words | true | „The 30-second rhythm” `decisions.md:3663`, „a rhythm of saving” `:3679`; the saver's interval runs at an idle headquarters and sends where the state differs, `game-saver.ts:207`, `check` |
| „the one bare word this change brought in” | true for the words searched | `git diff -U0 95de83b..HEAD` of the three foundation files for `check`, `step`, `gate`, `flow`, `debt`, `element`, `fact`, `choice`, `slice`, `surface`, `interface`, `exemplar`, `orchestrator`, `action`: hits are „the player's choices”, an old line rewrapped, and `human action` in D-219, the term of the-way itself |
| `death-settled-once` markers in `tests/sim/death.test.mjs` alone | true | `:304`, `:317`; both halves of the sentence have a case |
| `resurrection-renewal` markers in three files | true | `death.test.mjs`, `clock.test.mjs:239`, `:265`, `headquarters.test.mjs:134` |
| `clock.ts` is the one reader of the two clocks under `src/browser/` | true | `git grep` shows no other |
| Ten places in the test, nine titles and one comment; no expectation changed | true | the diff; 7 + 1 + 1 titles and the comment at `:443` |
| No use of „moment of resurrection” left | true | `git grep` exit 1; the forms `moment of a/the/its resurrection` leave only `death.test.mjs:84`, which says „its resurrection's readiness” |
| Sizes of the diff | true | `git diff --stat` |
| Spec decision 5 left out of the foundation | accepted | a stored number needs no later caller to do anything, unlike D-221, whose rule a later caller can forget. The report names the choice with its cost, so the human sees it |

## Changed invariant tests

Titles only, under `// invariant: save-version`, `tests/sim/saved-game.test.mjs`: the case at `:702`, and
in the table `CRAFTED` the rows „a character without its moment of readiness” and „a moment of readiness
fractional / as text / of none / not a number / infinite / beyond the safe integers / below the safe
integers”. Each row breaks the same key the same way. The request has to name them (WAY-03); report 19
lists them. `death-settled-once` changed in *Derives from* alone, which the decision template requires
once D-221 names it.

## Answers of step 4

- Trust boundary: the range does not touch `src/browser/sim/saved-game.ts`, or anything under `src`.
- Irreversible operation: `SAVED_GAME_VERSION` stands nowhere in the diff, which is two documentation
  files and one test file; it holds nothing done on a server.

## Declined to judge

- `README.md:55` and the line on accounts the author reports as false: they predate this task and speak
  of nothing it touches; out of the task.
- Bare `map`, `action` and `test` in older foundation entries, against *Two glossaries*: older than this
  change, and a matter for the-way or a task of its own.
- Whether task 18's computing of time away can settle every death it passes through `settleDeath` as it
  stands: task 18's review, as report 17 gave.
- Comments that cite the spec's decisions, as `tests/sim/saved-game.test.mjs:825` and `app.ts:215`: lines
  this range does not change, and the repository's habit.

## Checks

| Check | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at `3a5b172` | 0 | 0 errors |
| `git diff --check 923391c..3a5b172` | 0 | clean |
| `node --test tests/sim/saved-game.test.mjs`, on the `dist` already built, as the range changes nothing under `src` | 0 | 17 pass, 0 fail |
| `git grep -c "moment of resurrection"` | 1 | no hit |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | 0 | both `a8dfe8a` |
| `git status --short` after the checks | 0 | clean |
| Manual: every clause of D-221 read against `clock.ts`, `game.ts`, `saved-game.ts`, `app.ts` | | the table above |

Not run:

- `npm test` whole: the orchestrator's, by the handoff.
- `npm test -- <file>`: it builds into the reviewed worktree, so I ran the file directly with `node --test`.
- Prettier and ESLint on the test file: the author ran Prettier; strings and one comment changed.
- Mutation of the tests: only titles changed, so a mutant tells nothing here.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `resurrect` and its forms | `git grep -i` over tracked files | C1 |
| WAY-36, WAY-99, WAY-104 | `.the-way/foundations/decisions.md` | D-221's place in the log, C1, the correction of D-04 |
| The glossary element's skill, `decide_entry.md`, `write.md` | `.the-way/elements/glossary/skill/` | C1 |
| `game-saver.ts`, `app.ts`, `run.ts` | `src/browser/` | whether D-04's rhythm and D-221's „so discarded” and „one caller” are true |
| `tests/invariants/test_minute_span_split.py`, header | | the *Rejected* and *Rationale* of D-221 |
| `tests/sim/death.test.mjs:300`–`339` | | the markers of `death-settled-once` |
| Reports 06, 08, 17, by search for Q9 and `resurrect` | `.runs/task-cycles/rozliczenie-przejsc/reports/` | how earlier reviews held these two |
| `foundations/invariants.md`, `minute-span-split`, `save-version` | | the words of D-221 |
| D-190, D-207, D-214 | `foundations/decisions.md` | D-221's relations, D-04's correction, the wording in use |
| The vault note `rozliczenie_przejsc_loop2.md`, two lines | `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\` | D-221's *Origin* |
| `.the-way/elements/invariants/template.md:77` | | what a change owes for an altered invariant test |

## Searches not found or unclear

- **Unclear, how far Q9 reaches:** its question speaks of the task's candidates for the foundation, its
  last sentence of the rows of *Settlements to record*. The handoff names it for D-221, which is no row.
  I took the last sentence as the limit, hence M1's grade.
- **Unclear, what *Origin* should hold for a decision whose reasoning lives in the spec:** the template
  wants where the full reasoning lives, and the spec leaves the tree with the cycle. D-221 cites the task
  note, as D-04 does, and holds most of the reasoning itself. Accepted.
- **Not found:** a statement in report 19 on Q9 for D-221.
