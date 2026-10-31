FAIL 16f8bee

# Review of Slice 1, task `rozliczenie-przejsc`

Range `95de83b..16f8bee`: commit `0363149` (the plan's *Foundation entries*) and commit `16f8bee`
(Slice 1). `git rev-parse HEAD` is `16f8bee8abc2031dfd2eb58b86dabd53ae8fdea7`, the head given. Process
pin: gitlink and `.the-way` HEAD both `a8dfe8a`.

Counts: 1 blocking, 3 Minor, 1 out-of-scope finding, plus 4 lines of **Declined to judge**, which
count as out of scope too.

## Important (blocking)

### F1. Raising the version leaves ten cases of the page's test file red

- **Place:** `tests/view/account-screen.test.mjs:1059`, `:1637`, `:1763`, not changed in the range;
  the cause is `src/browser/sim/saved-game.ts:70`.
- **Slice:** Slice 1. **Named as a defect of the plan:** Slice 1's *Change* and *Checks* leave this
  file out, so the executor did what the plan gave, and the finding stands all the same.
- **What is wrong:** the file holds its own copy of the version, `const VERSION = 1;` at `:1059`,
  and uses 2 as „another version” at `:1637` and `:1763`. With `SAVED_GAME_VERSION` at 2 the page
  refuses each save the test hands it as another version and starts a new game, and the two cases
  that use 2 as a foreign version get a save the game accepts.
- **Why it matters:** the product's own tests fail on the slice's commit, so the gate cannot pass and
  Slices 3, 4 and 5, which list this file in their *Checks*, would meet a failure they did not
  cause. The failing cases are the ones that protect the save path of the page: a 401, a conflict, a
  refused save, a logout, a death saved at once. To do 21 and `guidelines/coding-saved-game.md`,
  „Wersja podnoszona razem z kształtem”, ask for the raised version together with its tests.
  Nothing in the plan names the constant.
- **Evidence:**
  - `node --test tests/view/account-screen.test.mjs` on `95de83b`: exit 0, 35 pass, 0 fail.
  - The same on `16f8bee`: exit 1, 25 pass, 10 fail.
  - The ten failing cases, by name:
    1. „a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to
       the game from it”
    2. „a sign-in to another account after a 401 on a save drops the kept state and loads that
       account's save”
    3. „a save builds the game the load gives: a map run that went on comes back paused at its pace,
       an ended one on its screen after the end”
    4. „each act of the player that changes the game state is saved at once, and one that changes
       nothing sends nothing”
    5. „a game minute that ends the map run in a death is saved at once”
    6. „a refused save starts a new game with its one-time sentence above it, after a confirmation
       notice, and saves the new game at once on the server's revision”
    7. „a failed save shows its line under the title and „Wyloguj”, above the address row, and a
       retry that succeeds clears it”
    8. „a conflict drops the game, asks for the server's save and builds from it with its sentence
       in the header until a save succeeds; a refused one there starts anew”
    9. „„Wyloguj” saves first and goes on, stays or ends each way its save's outcome gives”
    10. „a save that finds no session while the logout's request is under way waits for its answer:
        a logout ends it, an uncertain one then takes the expiry path”
  - With the three lines changed in a scratch worktree: exit 0, 35 pass, 0 fail. So these three lines
    are the whole cause, and no fixture of this file breaks on the new load rules.
- **The fix, confirmed by that run:** `:1059` to 2, and at `:1637` and `:1763` the foreign version
  to 3, each naming To do 21 as `guidelines/testing.md`, *Changing an existing test*, asks.
  `npm test -- tests/view/account-screen.test.mjs` joins the checks of the fix.
- **The author's own-work check** named To do 3 and Q2, which hold. It did not look where this
  change is weakest: the reach of the raised version outside the seven files. The report says at
  *Problems and open points* that the full gate would show any other test, so the check could not
  have caught this.

## Minor

### M1. No crafted document covers the mark on a run ended in death

- **Place:** `tests/sim/saved-game.test.mjs:1013`–`:1025`, `CRAFTED`; code at
  `src/browser/sim/saved-game.ts:870`.
- **What is wrong:** decision 9's row says a run with no completion has its mark equal to whether
  `solvedMaps` holds the map, and decision 10 says each row joins the crafted table. The two crafted
  rows for that equality use a run that goes on; a run ended in death has none.
- **Why Minor:** the load does refuse such a document today: both forged deaths were refused as
  `shape` in the probe. One condition serves both kinds of run, and a forged mark on a death changes
  nothing a player could gain: a death pays nothing and `restart` binds the mark anew.
- **Evidence:** hand mutant `ended.completion ? !mapSolved : !ended.death && solvedMapRun !== mapSolved`
  at `:870`: `node --test tests/sim/saved-game.test.mjs` exit 0, 16 pass, so the mutant lives.

### M2. A line of the doc comment of `advanceMinutes` is broken short

- **Place:** `src/browser/sim/game.ts:449`–`:451`. The line `nothing; where that minute is` stands
  alone. The author reports it. Content is right; no effect on a reader beyond the shape.

### M3. The verb `resurrect` keeps a second meaning beside the new term (concern C4)

- **Place:** `foundations/glossary.md:206`, the new term; D-101 in `foundations/decisions.md`,
  `tests/http.test.mjs:642`, `tests/sim/program-counts.test.mjs:258`.
- **What is wrong:** `.the-way/elements/glossary/template.md:52`–`:57` asks for a renaming, the human
  choosing the word, where a word carries two meanings and one is a meaning a reader of the field
  would not give it. Row 11 says of `resurrection` that a reader of games takes it otherwise. The
  three uses speak of bringing back a session and a count.
- **Why Minor:** it is the plain English verb about no character, so no reader is misled; whether a
  verb counts here is unclear (see *Searches*). The choice is the human's by the template, so the
  orchestrator should carry it to the request and not leave it unsaid.

## Out of scope

### O1. Seven mutants live on lines the range does not change, at the trust boundary

This goes beyond the task: the lines are unchanged, and the same six survivors and one uncovered
mutant stand on `95de83b`. Graded Minor if a later task takes it.

| Mutant | Class | Reason |
|---|---|---|
| `src/browser/sim/saved-game.ts:756:9` `false \|\| entry.count > …` | equivalent | `bringPlan[-1].count` throws, and the catch in `loadSavedGame` turns it into `shape` |
| `:756:19` `>` to `>=` | real gap | no admitted document in the tests holds a deposit at exactly its planned count |
| `:866` five mutants, the `refuse()` among them with no coverage | real gap | no crafted document has a streak or an attack cooldown above the minute |

## Foundation entries, each against the spec, the task's rows and the projected wording

All entries of commit `0363149` were read against `spec.md:284`–`339`, `task.md:230`–`247` and
`definicja_mvp_loop2.md`. No blocking finding.

| Entry | Result |
|---|---|
| D-189 | Approved sentences as the spec lists them; earning-loop sentence, mark clause and both *Rationale* clauses left out as spec row and task 18 give; *Rejected* the approved one; the *complies* example is the author's, from To do 5, which it says |
| D-190 | Approved wording less the earning-loop clause, To do 17 added; *Rationale* less the sentence decision 11 holds back; *Rejected* and examples approved |
| D-194 | Row 2's cost and Q4's ways stand; the sentence loses the death, as the row gives; `currently` kept |
| D-214–D-220 | Each says its row, with the texts in Polish word for word; *Origin* names real sections, `§ Questions carried to cycle` included (`task.md:164`) |
| D-03, D-04, D-179 | As the spec's rows; the sentences of D-04 on the simulation stay; D-179's body already carried the exception |
| D-212 | C3: only *Verification* changed, the link its own row calls for. Accepted |
| `solved-map-manual-run`, `trip-transfer`, `trip-run-end` | Approved or as the rows give; the code does what they say (checked below) |
| `resurrection-renewal` | C2: *Part* adds `browser-view` beyond the row; the template's „a writer in doubt names more” and D-219's scope carry it. Accepted |
| `death-settled-once` | Row 10 |
| `resurrection` | C1: *Not* `none` against the spec's row is right: the element's skill bars the meaning a reader of the field gives, and the definition's last clause holds it. Accepted |
| `generation number` | Row 12 |

Q9's rule: a search of D-214–D-220, the two new invariants and the two terms for `only`, `never`,
`always`, `without`, `solely`, `merely`, `alone`, `must`, `cannot`, `should`, `will` found none.
Entries the spec calls unchanged and that this behaviour could touch — D-183, D-185–D-188, D-200,
D-201, `map-run-repeatability`, `restart-seed`, `simulation-isolation`, `simulation-inputs`, `completion`,
`solved map`, `manual map run`, `practice` — stay true.

## Against the task and the code

No other finding. What was tried and held:

- To do 1–5, 14: the mark binds in `startRun`, a restart takes it anew, it survives an edit of the
  copy, a completion, a death and a load. A second character on a solved map is marked and its
  completion pays nothing, with the first character's paid practice standing. The probe walked these
  through the real functions, each state saved as JSON and loaded back.
- `takeFromNowhere` cannot collapse a repeated item, since a take list holds an item once (D-181,
  `src/browser/sim/programs.ts:197`).
- D-55 holds for the load's equality: `send` throws while a run exists, and `solvedMaps` grows only at
  a completion.
- Trust boundary: `flag` is strict. 22 crafted documents were refused as `shape`, among them a mark
  of 1, 0, text, empty text, null, an object, a list, a missing mark, the mark under `__proto__`, both
  forged deaths, `solvedMaps` removed under a marked run and under a completion, and malformed
  `solvedMaps`. Moving the read of `solvedMaps` before the run changes no reason of a refusal.
- Irreversible operation: the range changes the constant and tests and nothing under `deploy/`,
  `src/server/` or `.github/`; nothing was performed on a server. The discard happens only when the
  merge deploys `main`. The server holds no copy of the number: outside tests `SAVED_GAME_VERSION`
  stands in `src/browser/sim/saved-game.ts` alone, by a search of the tracked directories.
- User interface: no screen file changes in this slice. „Wyniesie: nic” and „Do skrzynki nic nie
  trafiło.” follow from `tripLoot` and `deposited` by reading `src/browser/view/trip-lines.ts`; their
  screens are later slices', so no screenshot is due.

### Changed invariant tests

- `tests/sim/trip.test.mjs:336` `trip-transfer`: expectations changed by To do 2 and 5, requirement
  named. It no longer shows a deposit after a program switch, D-179's *complies* example, since a
  marked run deposits nothing. Coverage holds in two parts: `:351` pins the frozen list after the
  switch and `:176` the deposit from the frozen list; a hand mutant reading the copy's bring list
  fails `:176`.
- `tests/sim/trip.test.mjs:365` `trip-run-end`: the later run moves to `forestDeep`, unsolved, with
  the same expected values and a new assertion that it is unmarked. Sound.
- `tests/sim/saved-game.test.mjs:654` `save-version`: another version moves from 2 to 3, by To do 21.
- `tests/sim/saved-game.test.mjs:678` `save-version`: new, the document of version 1 kept and refused.
  `DOCUMENT` is built from `DOCUMENT_V1` by spreading, which keeps the old document unchanged.

## Declined to judge

- *Method* `test` on `resurrection-renewal` and `death-settled-once`, whose tests come in Slices 2–3:
  the plan orders it so, and it is the whole-change review's to confirm at the request.
- Whether D-190, D-215–D-220 and the two terms match code: that code comes in later slices; here they
  were read against their sources alone.
- The loss of the owner's saved game state at the merge: accepted in Q4 and *Context*.
- The load's equality against runs of an earning loop: task 18's, as spec decision 9 says.

## Checks

The scratch worktree was a detached worktree of `16f8bee` with its dependencies linked; it is removed,
and the reviewed worktree stayed clean. Logs and the probe stand in
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\c314912b-7ac2-4f4a-8da9-b410276885ee\scratchpad\`.

| Command | Where | Exit | Result |
|---|---|---|---|
| `npm run build` | scratch, `16f8bee` | 0 | |
| `npm run typecheck` | scratch | 0 | |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | scratch | 1 | 740 pass, 10 fail, all in `tests/view/account-screen.test.mjs` (F1) |
| `node --test tests/view/account-screen.test.mjs` | scratch, `95de83b` | 0 | 35 pass |
| the same | scratch, `16f8bee` | 1 | 25 pass, 10 fail |
| the same, `:1059` and `:1637` patched | scratch | 1 | 34 pass, 1 fail, which led to `:1763` |
| the same, all three lines patched, then restored | scratch | 0 | 35 pass |
| `npm test -- tests/invariants/test_restart_seed.py` | scratch | 0 | |
| `npm test -- tests/invariants/test_simulation_inputs.py` | scratch | 0 | |
| `npm test -- tests/invariants/test_map_run_repeatability.py` | scratch | 0 | |
| `npm test -- tests/invariants/test_map_run_tiles.py` | scratch | 0 | |
| `npm test -- tests/invariants/test_minute_span_split.py` | scratch | 0 | |
| `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --ignore-path .gitignore --check` on the seven changed files | scratch | 0 | |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the seven changed files | scratch | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | reviewed worktree | 0 | 0 errors |
| `node probe.mjs <scratch worktree>` (`probe.mjs` in the scratchpad) | scratch | 0 | 49 checks. Its first run gave 1: two states of the probe carried a hand-set streak above the minute, which the load rightly refuses; the probe was corrected, not the code |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/trip.ts:60-99,src/browser/sim/game.ts:135-175,src/browser/sim/game.ts:541-580,src/browser/sim/saved-game.ts:738-760,src/browser/sim/saved-game.ts:865-871,src/browser/sim/saved-game.ts:896-903,src/browser/sim/saved-game.ts:939-942"` | scratch | 0 | 114 killed, 6 survived, 1 no coverage; `game.ts` and `trip.ts` 100%; every survivor on an unchanged line (O1) |
| the same tool on lines 750 and 856 of `saved-game.ts` | scratch, `95de83b` | 0 | the same 6 survived and 1 no coverage |
| hand mutant, a death exempt from the mark's equality; `node --test tests/sim/saved-game.test.mjs` | scratch | 0 | survives (M1) |
| hand mutant, `advanceMinutes` reading the copy's bring list; `node --test tests/sim/trip.test.mjs` | scratch | 1 | killed by the case at `:176` |
| `git log --format='%h %ae %s' 95de83b..16f8bee` | reviewed worktree | 0 | both commits at `mariusznn@gmail.com` |

Not run:

- The product's gate, `npm test` with no file argument: the orchestrator's, as the handoff gives.
- The rest of it: `tests/*.test.mjs` at the top of `tests/`, the other Python tests and the quality
  checks. So F1 may not be the whole of what fails; none of these imports `SAVED_GAME_VERSION`, by a
  search of `tests/`.
- A real browser: no screen changed.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Decisions 3–8 of the spec | `spec.md:84`–`233` | what the load and the screens of later slices rest on |
| To do 6–22, Q3, Q5–Q12 | `task.md:23`–`39`, `:63`–`122` | Q9's rule and the sources of D-215–D-219 |
| Approved wording | `definicja_mvp_loop2.md:1452`–`1533`, `:2178`–`2182` in the vault | the projected wording the handoff asks to compare, without naming its path |
| Later slices of the plan | `plan.md`, lines naming `tests/view/account-screen.test.mjs` | whether F1 is taken up later: it is not named |
| The test file of F1 | `tests/view/account-screen.test.mjs:1049`–`1085`, `:1630`–`1670`, `:1755`–`1768` | the failing cases |
| `send`, `restart`, `end`, `passRealTime` | `src/browser/sim/game.ts:282`–`436` | callers of the change |
| The preview and the deposit line | `src/browser/view/trip-lines.ts` | spec decision 2's claim |
| Trip list rule | `src/browser/sim/programs.ts:197`–`211`, D-181 | a repeated item in `takeFromNowhere` |
| D-50, D-61, D-176's *Rationale*, D-183, D-200, D-201 | `foundations/decisions.md` | entries the change could make false |
| `completion`, `solved map`, `practice` and neighbours | `foundations/glossary.md:128`–`187` | the same |
| Entry templates | `.the-way/elements/glossary/template.md:38`–`82`, the search hits at `.the-way/elements/glossary/skill/SKILL.md:34` and `.the-way/elements/invariants/template.md:143`–`145` | concerns C1, C2, C4 |
| Global playbook of code review | `C:\Storage\The Brain\The Brain\Notes\Areas\(A) Claude code\playbook_code_review.md` | the user's instructions ask it read before a review |

## Searches not found or unclear

- Not found: any passage of the task, spec or plan that names the constant `VERSION` of
  `tests/view/account-screen.test.mjs` or the literal 2 at `:1637` and `:1763`. The spec's list at
  decision 10 says „among them” and names `:1179` and `:1546` of that file for another reason.
- Unclear: whether a verb counts as a form of the term for the template's rule on two meanings
  (C4, M3). `.the-way/elements/glossary/template.md:52` says „word”, and `:80` „each of its forms”
  only for a changed meaning.
- Unclear: whether *Method* `test` may stand on an invariant between slices while its test is not
  written; the agent of the entries reads the template as holding at the request, and I found nothing
  that says otherwise for a commit between slices.
