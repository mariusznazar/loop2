PASS 92b8311ab48403cb7beec56c48ee0433db9e7fd2

# Review of the return step's commits — raport-z-wyplata

Range `e3f64ea92423edb538647f8e82688bb86d378d57..92b8311a` (one commit; `foundations/invariants.md`, `foundations/decisions.md`, `tests/sim/loop.test.mjs`). `git rev-parse HEAD` in the worktree = `92b8311ab48403cb7beec56c48ee0433db9e7fd2`, the head given. Method read whole: `.the-way/task-cycle/review/SKILL.md`. Blocking findings: 0. Minor: 3. Out of scope: 0.

## Findings

### Blocking (Critical / Important)

none.

### Minor

**M1. The sentence names the completion as a payer, which D-189 does not.**
`foundations/invariants.md:1310`: "added to its character's skills once, whichever of „Odbierz”, the completion of the map run it was gathered in and the stop of the loop pays it." In the code and in D-189 only „Odbierz” (`takeLoopPractice`, `src/browser/sim/loop.ts:222`) and the stop (`stopLoop`, `:187`) add practice to skills; a completion adds the run's practice to `loop.practice` (`endLoopRun`, `:345`), where it waits. D-189's own *violates* example is "practice added at each completion of an earning loop". A reader of the sentence alone can take the completion for a legitimate way of paying; a change making the completion pay straight into skills, without double payment, would satisfy the sentence and violate D-189. Related: a death with no resurrection takes the gathered practice (D-190), so for that practice "added once" is false read as "exactly once"; "at most once" is what the tests check. Why it is only Minor: the three paths are the places a double payment can arise, the tests (see below) check exactly that, and the sentence is not wrong on any commit the tests can reach. Suggested wording, for the human to take or leave: "The practice an earning loop gathers is never added to its character's skills twice, whichever of „Odbierz” and the stop of the loop pays it and whether the completion of the map run it was gathered in came between."

**M2. *Derives from* names D-189 alone.** The "once" rule is also written in D-241's binding sentence (`foundations/decisions.md:5112-5114`, "since the player last took the practice waiting with „Odbierz”"), in D-246 ("after „Odbierz” it and the button are gone until the earning loop gathers more", `:5290-5292`) and the stop's half in D-245 (verification `complies` line, `:5251`). A change to D-241, D-245 or D-246 finds the invariant by the search of the foundation only through D-189. D-189 does carry it (its *Verification* now names it, `:3695`), so the mirror WAY-12 asks for holds and `foundation_check.py` is clean; the link is thinner than the rule's sources. Not blocking: the template says *Derives from* names the decisions the entry derives from, and D-189 is the one that sets "adds all of it … leaves the earning loop as it is".

**M3. The `trip-run-end` tag the author left on "taking the practice pays what the loop and its map run going on gathered …" (the comment `// invariant: trip-run-end` at `tests/sim/loop.test.mjs:878`) is the weakest citation of the file; the author's own question.** The sentence of `trip-run-end` (`foundations/invariants.md:970`) is about death, ending or restarting a map run, stopping the loop, and completion's deposit. The test does none of these; it asserts that „Odbierz” leaves backpack, run, chest and `stoppedLoops` as they were, and that it empties and pays both practices. Its chest and backpack assertions are not about returning carried items at a stop, and its payment assertions are the ones `loop-practice-payment` is about. My judgement: replace the tag by `loop-practice-payment` (the test does check that the taken practice is paid and emptied, which the invariant's second test only checks for a second take) or drop it. Leaving it does no harm to a verdict (the test passes, `trip-run-end` has many other citing tests, a mutation of the test's subject fails the test either way), so Minor. The tag came with `a9a9b257`, not with this commit; the return step did not add it, it only chose not to move it.

## Against the questions of the handoff

**(a) A rule the task, a decision or the human sets, or behaviour merely because no invariant covers it?** A rule that is set. Task item 3: "Wypłacona wprawa nie wraca drugi raz: po „Odbierz” czekającej wprawy nie ma … ukończenie tego przejścia dodaje do pętli tylko wprawę zebraną po „Odbierz”, a późniejsze „Zatrzymaj” wypłaca i wpisuje … tylko to, co zebrało się po „Odbierz”". The approved D-246 ("after „Odbierz” it and the button are gone until the earning loop gathers more") and D-189 ("adds all of it … leaves … the earning loop as they are", *violates*: "practice added at each completion") say the same. The decision-or-invariant test (`.the-way/elements/decisions/template.md:125`) is met: a commit can be pointed at on which the sentence is false (the author's mutation and mine below). The return step's rule ("an invariant only for a rule the task, a decision or the human sets") is kept, so the entry is not one to drop. Nothing else in the step is an invariant: the focus to „Zamknij" and the accessible name stay table rows, as the report says; I read nothing in the task or in D-246 that sets them (I did not search the rest of the foundation for them).

**(b) The entry against the invariants element's template.** Fields in order `Method`, `Rests on`, `Derives from`, `Part`, `Violated` as the template's form gives; one sentence; no branch name; no reason or rejected way in the entry (WAY-08, WAY-56). `Method: test` is right: two tests cite it (WAY-61, WAY-65: the citation is the line `// invariant: loop-practice-payment` directly above each test). Identifier names what the sentence constrains (the payment of a loop's practice), not what it demands, like `trip-transfer` and `death-settled-once`; it clashes with no identifier or withdrawn identifier (searched the file; the only other invariant naming practice is `solved-map-manual-run`, line 1040, about the manual run, no overlap). `Rests on: none` is right: no source outside the product. `Part: simulation` is right: `takeLoopPractice`, `stopLoop`, `endLoopRun` and the save's reading all lie there, and the view only calls them; I found no path by which a change to `browser-view` alone pays practice. `Violated: no`: the code meets it. The entry stands after the last entry and before the withdrawn identifiers, as the template says. See M1 and M2 for the two things short of perfect.

**(c) Do the cited tests carry it, failing and passing.** Reproduced in a scratch worktree of the head (not the reviewed one), `npm test -- tests/sim/loop.test.mjs`:
- the head as it is: exit 0, 44 pass, 0 fail;
- mutation M-a (the author's): `takeLoopPractice` leaving `loop.practice` unemptied: exit 1, 4 fail, among them both citing tests ("practice taken is paid once …" and "taking the practice twice in a row …");
- mutation M-b (mine): `takeLoopPractice` leaving `loop.run.practice` unemptied (so the completion would add the taken practice to the loop a second time): exit 1, 2 fail, among them "practice taken is paid once …"; this is the double payment at the completion and it is caught by the first citing test;
- sources restored after each; the scratch worktree and its junction to `node_modules` removed afterwards (the reviewed worktree's `node_modules` intact, `git status --short` of the reviewed worktree empty).
The first citing test asserts values from outside the code (skills grow by 40+9, then by the one exploration after, `loop.practice` `{ exploration: 1 }` after the completion, the stop's `stoppedLoops` `{ exploration: 1 }`), not a value computed by the function it tests. The stop's half of the sentence is checked there; the second test checks the repeated take and the no-op states. Neither test covers a stop right after „Odbierz” with no completion between; that is a state of the sentence's "whichever" no test reaches. Not blocking: `stopLoop` and `takeLoopPractice` read the same `waitingPractice`, and the emptied loop gives `{}` there (a stop of an emptied loop is also the case of the existing "stopping a loop that gathered nothing writes an empty sum").
The commit re-tags one test from `trip-run-end` to `loop-practice-payment` (`tests/sim/loop.test.mjs:924`) and adds the tag above the second (`:952`): changed invariant tests named per the skill: `tests/sim/loop.test.mjs` for `trip-run-end` (one citation removed; the sentence of `trip-run-end` says nothing of „Odbierz”, so no coverage of that sentence is lost; nine other places in `catch-up.test.mjs`, `loop.test.mjs` and `trip.test.mjs` still cite it, counted by `grep`) and for `loop-practice-payment` (new). No test of the trust boundary (`saved-game`) was touched; the commit changes no code of the game.

**(d) A missed entry the change made untrue.** My own selection by "Reading the foundation", for `simulation` and `browser-view` and the words "practice", "Odbierz", "report", "earning loop": D-189 (whole), D-241 (whole, the binding sentence and the rationale), D-245 (whole), D-246 (whole), D-190 (whole), the entries `trip-run-end`, `trip-transfer`, `catch-up-state`, `death-settled-once`, `save-version` (whole), the invariant list's lines with "practice" (grep, all 2 hits). The code read: `src/browser/sim/loop.ts` `waitingPractice`, `stopLoop`, `takeLoopPractice`, `endLoopRun`. Result:
- D-241's rationale (`foundations/decisions.md:5132-5136`) now says "until the player takes it with „Odbierz” or the loop stops"; matches the code (`takeLoopPractice` empties both).
- D-189's rationale and *Rejected*, D-245's rationale, D-246's binding sentence and *Verification* all say what the code does. D-246's *Verification* `complies` example reads "the practice waiting at its earning loop, the map run going on included" (the task's item 8 correction), true.
- `catch-up-state` speaks of "character and chest state" after the catch-up; the practice of the loop is part of neither `team.characters[].skills` nor the chest for a loop still going, and the catch-up does not call „Odbierz”; the sentence stays true (its test I did not run; only the loop test file was run, see Checks).
- `grep` for "until the loop stops" / "when the loop stops" / "loop stops" in decisions, invariants, glossary and `guidelines/*.md`: the only hits are D-189's own sentence (`:3690`, "and when the loop stops", which is the stop's half and true) and D-241's (`:5133`, true as now worded).
I found nothing the change made untrue that the return step left uncorrected. The glossary's `headquarters` entry (the author says it was already incomplete) I did not read whole beyond the grep; see Unread.

## Declined to judge

- The correctness of the changes of earlier commits (`caf7bf39`, `be946654`, `1a4b79b8`, `a9a9b257`, `e3f64ea9`): reviewed and passed in earlier stages; I read the code of `loop.ts` only as far as the invariant's three paths.
- The wording of D-189, D-241, D-245 and D-246 themselves: the human approved them with the task; I compared only the new entry with them.
- The mutation gate and the full `npm test`: the orchestrator's.

## Checks

| Command | Where | Exit code | Result |
|---|---|---|---|
| `git rev-parse HEAD` | reviewed worktree | 0 | `92b8311ab48403cb7beec56c48ee0433db9e7fd2` |
| `git diff e3f64ea92423edb538647f8e82688bb86d378d57..HEAD` and `git log --oneline e3f64ea9..HEAD` | reviewed worktree | 0 | one commit, three files |
| `python -B .the-way/elements/common/foundation_check.py` | reviewed worktree | 0 | `0 errors`, so the citations are found and the identifier is unique |
| `npm test -- tests/sim/loop.test.mjs` (build, then `scripts/test-node-file.mjs`) | scratch worktree of the head | 0 | 44 pass, 0 fail |
| the same command with `takeLoopPractice` leaving `loop.practice` unemptied | scratch worktree | 1 | 4 fail, both citing tests among them |
| the same command with `takeLoopPractice` leaving `loop.run.practice` unemptied | scratch worktree | 1 | 2 fail, "practice taken is paid once …" among them |
| `grep` for `loop-practice-payment`, `invariant: trip-run-end`, "practice" in `foundations/invariants.md`, "loop stops" in the foundation and guidelines | reviewed worktree | 0 | as above |

Not run: the full `npm test` (the orchestrator's); `tests/sim/catch-up.test.mjs`, `tests/sim/death.test.mjs` and `tests/sim/saved-game*.test.mjs` (the commit changes no code of the game, so the focused file is the one it touches); no view test.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md:118-131` ("Decision or invariant", "Plan test"): to judge (a).
- `.the-way/elements/invariants/skill/SKILL.md` and `decide_entry.md`: the skill's steps for deciding an entry, for (b).
- `src/browser/sim/loop.ts` (lines 165-260, 285-380): the code the sentence and the tests are about.
- `foundations/decisions.md` D-189, D-190, D-241, D-245, D-246 (whole each): the entries the invariant derives from or neighbours.
- `foundations/invariants.md` `trip-run-end`, `trip-transfer`, `save-version`, `death-settled-once`, `catch-up-state`: neighbours of the new entry, for the form and for overlap.
- `tests/sim/loop.test.mjs:840-1010`: the tests the commit changes, with their neighbours.

## Unread material

The dispatch names the handoff, the task, the return report, the template and the skill; all read whole except: `.the-way/elements/invariants/template.md`, read whole but for a stretch of about 4 000 characters in its middle (the sentence rules from "Quoted text, in this template, is text between" to the *Links* section) that the output truncated; I read the rest of the *Links*, *Part* and *Violated* sections and the part on the sentence up to that point. `.the-way/elements/invariants/rules.md` does not exist (the handoff names it; the rules of form stand in `elements/common/rules.md`, which I did not open): the fields, the identifier form and the `none` words were checked against the template's own "Form of an entry". `.the-way/elements/invariants/skill/draft.md` and `write.md`: not read. The glossary and the part map: not read whole (the part map's `simulation` part was judged from the paths of the code; the glossary was searched by grep for the words only). The invariants, decisions and guideline files beyond the entries named above: not read; the decision log was searched by words, not read.

## Searches not found or unclear

- `.the-way/elements/invariants/rules.md` (named in the handoff): does not exist at the pinned commit; the template and `elements/common/rules.md` hold the rules instead.
- No rule found that says whether an invariant sentence may name a control label such as „Odbierz”; the sentence does so and D-189 does too, so I did not count it as a finding.
- The invariants template is marked "Draft" and its *Derives from* rule leaves open how many decisions an entry names when several carry the rule; that is the ground of M2.
- No test found that stops a loop directly after „Odbierz” with no completion between (see (c)).
