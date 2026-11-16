FAIL 80cdb843c85a95e12773753cb47af6632e643ba5

# Review of the return step's range — loop2: dokończyć przejście widoku na React

- Range: `f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa..80cdb843c85a95e12773753cb47af6632e643ba5` (3 commits: `937e4b0a`, `6df956ae`, `80cdb843`). `git rev-parse HEAD` = `80cdb843c85a95e12773753cb47af6632e643ba5`, the head given. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `.the-way/task-cycle/review/SKILL.md`, review of the return step's commits (section 2), against the frozen task, the spec, and the entries the return step writes or corrects.
- Result: 1 Important finding (blocking, within the task), 1 Minor finding, 0 out of scope.

## Findings

### Critical

None.

### Important

**I1 — The second sentence of D-402's new paragraph says that the new game's saver outcomes act at once. The code holds them in two cases, and paragraph 1 of D-402 holds them in one of the two.** From commit `937e4b0a`. The test line in `80cdb843` quotes the same sentence.

Place: `foundations/decisions.md:3939`, the sentence: "An outcome of the saver of the game a reset built acts at once, also while the logout of the old game waits for its answer."

What is wrong: the sentence has no qualification, so it says the new game's outcomes are never held. The code holds an outcome of any game, including the game a reset built, in two cases. `src/browser/view/app.ts:508-522` (`whenNotBusy`) holds it:
- while that game's own reset waits (`current.reset.kind === "waiting"`, `:511-515`);
- while that game's own logout waits for its answer (`current.logout.kind === "ending"`, `:516-520`).

Both cases are reachable. The game a reset built has „Zacznij od zera” again when the account has the privilege (`app.ts:556`), and it has „Wyloguj” (`logOut`, `:682-724`, which checks only the state of its own game).

In the second case, D-402 contradicts itself. The player confirms a second reset. While that reset waits, the game the first reset built is "the old game" of paragraph 1, whose outcomes are held "while it waits" (`:3937`). Read literally, paragraph 2 says the same outcomes act at once.

The sentence means something narrower. The entry's own *Rationale* says so (`:3949`): "its outcomes are held neither with those of the old game nor until the old game's logout answers". The clause `tests:` also keeps to that scope: "while the logout of the old game still waits, acting at once". The binding sentence is the one broader than the code.

Why it matters: this is a binding sentence, and a later change is compared against it. Suppose a later agent follows it and removes the hold of the new game's outcomes during its own logout or during a second reset. That agent would be applying D-402 as written, and it would break paragraph 1 of D-402 and the logout's handling of a held outcome (`app.ts:705-722`). As the text stands, the code at the head breaks the sentence too. Under the grading rule on WAY-263, an entry the change writes that states a rule more broadly, or without the qualification the code keeps, is Important.

Evidence: `app.ts:508-522`, `:556`, `:682-724`, `:735-771`; D-402 `:3937` (paragraph 1), `:3939` (paragraph 2), `:3949` (*Rationale*).

Fix: limit the sentence to the old game's logout, the way the *Rationale* does. For example: "An outcome of the saver of the game a reset built is not held for the logout of the old game, which may still wait for its answer." Or: "While the logout of the old game waits for its answer, an outcome of the saver of the game a reset built is not held for it." Change the quotation at `tests/view/previous-save.test.mjs:1498` to the new sentence, so that it still begins a sentence of D-402. The clause `tests:` can stay as it is. Then run `python -B .the-way/elements/common/foundation_check.py`.

### Minor

**m1 — The new wording of D-264's *Rationale* lists what is built by hand as if the list were complete, and it puts the panel of a card taken down on the page.** From commit `937e4b0a`.

Place: `foundations/decisions.md:1251-1253`: "the cases that walk the page also walk what the page builds by hand, the header, the main block and the panel of a card taken down".

What is wrong:
- The list leaves out the hosts of the roots. Each root's factory builds its host by hand: `waiting-screen.tsx:92`, `page-sentences.tsx:85`, `header-rows.tsx:35`, `:73`, `menu-bar.tsx:335`.
- The panel is built by `createFailureCard` in `account-card.tsx:674-683`.

This is the same split that fix m4 (`f89dbd09`) has just written into `guidelines/coding-browser-module.md`. In the foundation, "the page" can be read as the start page's code as a whole, so the sentence is not false. Read as a complete list, though, it tells the reader that the hosts are not built by hand.

Why it is Minor: the passage is in the *Rationale*. No binding sentence and no *Verification* depends on it, and the reason it gives still holds: jsdom has to carry what is built outside React.

Fix, if it is touched: "walk what is built by hand outside React, the header, the main block, the hosts of the roots and the panel of a card taken down".

## What the range answers (n1, n2, n3 of `review-fix-1-report.md`; M1, M2 of `review-slice-1-report.md`)

- **n1: answered.**
  - D-262 has a second paragraph (`decisions.md:2897-2899`). Its first sentence says that focus moves to „Spróbuj ponownie” at each entry into the warning, the entry after a retry included. Its second says that the button is one element through the refusal, the retry and the next refusal.
  - Both sentences agree with the code. `app.ts:410-412` calls `waitingScreen.focusRetry()` at every `change` into `refused`. `waiting-screen.tsx:63-83` keeps the button in one slot through `refused` and `retrying`. `app.ts:467-475` keeps `retrying` across the requests of a retry. `waiting-screen.tsx:76` draws „Sprawdzanie…”, and `ReactButton` disables the button while it waits.
  - The paragraph follows spec Decision 3 (`spec.md:105`: "at every entry into this state, a refusal after retrying included, the page moves focus") and F4 of the spec's review, which asked for it. To do 2 of the task asks for "ten sam … fokus co dziś" (the same … focus as today).
  - The case at `tests/view/account-screen.test.mjs:567` quotes both sentences, and its line pointing to the task is gone.
  - The clause `tests:` names the case's four checks. The pair (*complies*/*violates*) is unchanged and covers only „Potwierdzanie adresu…”, which no test holds.
  - The new *Rationale* sentence (`:2923-2926`) names no file and no count.
  - WAY-05 allows one more paragraph for each further part a decision answers.
- **n2: answered.**
  - D-402's paragraph 2, sentence 1 (`:3939`) says that a reset that succeeds after an error nothing handled closes the game that stood, with its saving, builds none, and shows the waiting screen with the sentence of the failure alone.
  - The code does this. `resetGame` → `showGame` (`app.ts:745-752`) meets `failed` and changes the state to `checking`/`stopped` (`:529-533`). `change` → `release` disposes the game view (`:346-358`), and `waiting-screen.tsx` draws nothing in `stopped`.
  - The case at `tests/view/uncaught-failure.test.mjs:862` quotes that sentence in place of D-402's sentence on 204, which the case does not hold.
  - `derives from D-323` is added, and the clause `tests:` names the case.
  - The choice is the one the record holds: cycle.md Q2 (slice 7's transition 2, no return for repair), judged "arguably more correct" by the review of the whole change.
- **n3: answered.** "(To do 4 of the task)" is gone from `tests/view/uncaught-failure.test.mjs:765`. `git grep -n -E "To do [0-9]|of the task" -- tests src scripts guidelines` finds nothing.
- **M1 (D-276 *Rejected*): answered.** `:4912` now reads "in the control's React component and its tests", and the reference to D-265's two forms is gone.
- **M2 (D-264 *Rationale*): answered.** "the screens still in DOM" is gone. See m1 for the precision of the new list.

## The other entries the range changes

- **D-402, paragraph 2, sentence 2:** see I1. The new *Rationale* sentences (`:3949`) are scoped correctly and name no file. The clause `tests:` names cases that hold what it says: the `HELD_OUTCOMES` loop at `previous-save.test.mjs:1494-1532` (conflict → `loadSavedGame`, missing session → the forms) and the case at `uncaught-failure.test.mjs:862`. The pair keeps only the confirmation example, which no test holds.
- **D-269:** `react-entry-build` is added to *Based on*. That environment fact exists (`foundations/environment_facts.md:582-586`) and says what the clause claims. The page's bundle defines `process.env.NODE_ENV` as `"development"` (`scripts/kitchen-sink.mjs:51`), so "wherever the bundle does not mark production" holds.
- **D-407:** the two removed parts of the pair are now named in the clause `tests:`. The case at `uncaught-failure.test.mjs:1017` quotes the second paragraph, and its comment (`:1014-1016`) names the two ways it catches. The rest of the pair (`:4373-4374`) is held by no test, and it stays.
- **Test comments (`6df956ae`, `80cdb843`):** only comment lines changed. The diff of `tests/` holds no changed assertion or call. Each `decision:` quotation begins a sentence of its entry, and the foundation check passes.
- **Another entry made untrue?** I considered D-323's "saving goes on as D-207, D-208 and D-97 give it". After paragraph 2 of D-402, a reset that succeeds after the error ends that saving. D-323 already speaks of the saving of the game that stands, and a logout under D-97 also ends it. D-402 now derives from D-323 and states the case, so I find D-323 not made untrue. No other entry the range reaches is made untrue. The invariant `uncaught-failure-game-state` is not touched, since sending nothing breaks no sentence of it.

## Declined to judge

- Whether D-262's new paragraph (focus and one button) should have been a decision of its own rather than a second paragraph of D-262: WAY-05 allows the paragraph, and the return step weighed both choices in its report. This is a matter of how the foundation is arranged, not of agreement with the code.
- The cases of the logout that the server ended and of the reset's late answer, in `previous-save.test.mjs`: the range changed no line of them.

## Checks run (from the root of the reviewed worktree)

| Check | Command or method | Result |
|---|---|---|
| head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD` | head as given; `.the-way` at `bfb2e109…` |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| previous save | `npm test -- tests/view/previous-save.test.mjs` | exit 0, 46 tests, 46 pass |
| account screen | `npm test -- tests/view/account-screen.test.mjs` | exit 0, 132 tests, 132 pass |
| uncaught failure | `npm test -- tests/view/uncaught-failure.test.mjs` | exit 0, 19 tests, 19 pass |
| format | `npx prettier --check tests/view/previous-save.test.mjs tests/view/account-screen.test.mjs tests/view/uncaught-failure.test.mjs` | exit 0 |
| test comments pointing to the task | `git grep -n -E "To do [0-9]|of the task" -- tests src scripts guidelines` | exit 1 (no hit) |
| assertions unchanged | read `git diff f89dbd09..80cdb843 -- tests` | only `//` and `/** */` comment lines changed |
| I1 | read `app.ts:508-522`, `:556`, `:682-771` | the two holds of the new game's outcome as described |
| trust boundary | `git log --stat f89dbd09..80cdb843` | the range touches only `foundations/decisions.md` and three test files; `scripts/kitchen-sink.mjs` is not touched |
| worktree state | `git status --short` after my run | empty |

Not run:
- The whole `npm test`, which is the orchestrator's alone.
- A mutation that renders the failure row from a root at the error, to confirm the case at `uncaught-failure.test.mjs:1017` catches it (the D-407 pair). I judged it from the case's comment, the binding sentence it quotes, and the earlier reviews.

## Reaches beyond the dispatch

- `src/browser/view/app.ts:341-581`, `:587-771`: to compare the sentences of D-402 and D-262 with the code (I1, n1, n2).
- `src/browser/view/waiting-screen.tsx` (whole file): for D-262's paragraph.
- `foundations/decisions.md`: D-96 and D-97 (`:2718-2756`), to see whether either holds the logout's hold of an outcome (neither does); D-323 (`:4333-4346`), whole.
- `foundations/environment_facts.md:582-592` and `scripts/kitchen-sink.mjs:49-52`, `scripts/build.mjs:49-52`: for D-269's *Based on*.
- `tests/view/previous-save.test.mjs:1470-1533`, `tests/view/account-screen.test.mjs:558-571`, `tests/view/uncaught-failure.test.mjs:850-862`, `:960-1049`: what the quoting cases hold.
- `.the-way/foundations/decisions.md:622-635` (WAY-05): whether a second paragraph is allowed in a decision.
- `guidelines/testing.md` (whole file), as `AGENTS.md` asks before a review of tests: the rule that a test comment points to no document outside the foundation, and that a requirement goes to the foundation first.
- `docs/task-cycles/przejscie-widoku-na-react/cycle.md` rows Q2 and Q4; `spec.md:16`, `:105-106`; `reports/spec-reviewer-report.md` F4; `task.md` (search for focus and reset; To do 2 at line 28).

## Working copies

- `.runs/review-return/`: the logs of the three test runs. Removed.
- `.runs/review-return-diff.txt`: a word diff of the range. I wrote it directly under `.runs/` instead of under my directory, and removed it.
- Nothing is kept in `reports/` besides this report. No worktree, clone or screenshot. The product's own build output from `npm test` (`dist/`, ignored by git) stays as the product's tools leave it.

## Unread material

- `task.md`: searched for focus, reset and saving; To do 2 read. The rest not read; the whole-change review judged the task's coverage.
- `spec.md`: lines 16 and 105-106 (Decision 3) only. `plan.md`: not read; the range answers review findings, not a slice of the plan.
- `reports/foundation-entries-report.md`: not read. The handoff limits this review to what the range changed, and the foundation step's entries were judged before.
- `reports/review-fix-1-report.md`: lines 9-48 (m1-m4, n1-n3). `reports/review-slice-1-report.md`: M1 and M2 only. `reports/return-step-report.md` and `reports/review-whole-report.md`: whole.
- Decisions read whole: D-402, D-264, D-323, D-96, D-97. D-262 up to its *Rejected*; the tail of *Rejected* after `:2934` not read. D-407: binding sentences, *Verification* and *Rationale*; *Rejected* not read. D-269 and D-276: only the changed passages and their sentences around them. The other decisions of the handoff's list (D-03, D-36, D-43-D-47, D-76, D-156, D-157, D-207-D-211, D-225, D-253, D-261, D-263, D-265-D-267, D-273-D-275, D-280, D-286, D-288, D-289, D-381, D-395): not read; the range does not change them.
- Invariants of the handoff's list: not read; the range changes no invariant, and its only bearing (`uncaught-failure-game-state`) is judged through the return step's report and the whole-change review.

## Searches not found or unclear

- The handoff says the foundation check is red until slice 12 deletes `tests/view/react-controls.test.mjs`. At the head it exits 0 with `0 errors`, as the return step and slice 12's row in `cycle.md` say. The handoff's note is out of date.
- A foundation entry stating that a game's saver outcome is held while that game's own logout waits for its answer: none found (D-97 does not say it). The hold is the code's (`app.ts:516-520`). I1 does not depend on an entry for it: the new sentence of D-402 denies the hold either way.
