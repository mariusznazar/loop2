PASS f4b73af79abd55a59192ee649534eb4f08d1059f

# Review 3 — the return step's commits, task `napis-o-awarii`

Variant: the commits of the return step. Range `da4e7ace16cdd3f69ce0e4c0e551775bdeb01924..f4b73af79abd55a59192ee649534eb4f08d1059f`, computed with `git log` and `git diff`: one commit, `f4b73af`, touching `foundations/decisions.md` (D-323 only) and `foundations/environment_facts.md` (two new facts). `git rev-parse HEAD` is `f4b73af79abd55a59192ee649534eb4f08d1059f`, the head given. `.the-way` is at `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`. The reviewed worktree stayed clean. I read the handoff, the return report (as claims), the frozen task, `findings-1.md`, `review-1.md` (M-5), `review-2.md` (N-1 to N-3), the decision template and the environment-facts template of the pinned the-way.

Counts: blocking 0, Minor 3, out of scope 0.

## What I checked, and the result

### D-323

- **Three binding sentences.** The first paragraph now holds three sentences: (1) state stops, saving goes on, no game is built, sign-in stays at the waiting screen; (2) the sentence of the warning and where it stands; (3) the line as D-253 gives it. The fourth sentence of review 2 (N-1) is joined to the first with a semicolon. Present tense, no normative words, no `should` or `will`, no stage of the product named. This meets `.the-way/elements/decisions/template.md:94`.
- **The first paragraph against rows 1 and 4 and the orchestrator's choice.** Row 1 gives the state stopping, saving going on with the last whole state, and the sentence in `warning` in the three places. Row 4 gives the state unchanged and every save carrying the state from before the error. "Without a new reading of the clock", "an exception or a rejected promise" and "stands once" come from the same task: the answer to question 1, To do 1 to 3. The no-game clause is the orchestrator's choice in `reports/findings-1.md`. Nothing else is added. The third sentence ("The page writes the line of the error as D-253 gives it") is not in rows 1 or 4; it is row 2 by reference. The answer to question 1 quotes the coding guideline that a degraded mode "zawsze zostawia wiersz w logach", so I do not count it as an addition. I do not grade it.
- **Based on / Relations as the template gives them.** *Based on* is two identifiers joined by ` · `, as the template requires. *Relations* is `derives from D-252 · narrows D-247 · narrows D-211 · narrows D-96 · narrows D-203 · narrows D-209`. No mutual narrowing: `grep` of `D-323` in `foundations/` finds it only in D-323, D-262's addendum and the invariant `uncaught-failure-game-state`. None of the five names D-323. `foundation_check.py` passes.
- **Each `narrows`, read whole and tested** (does D-323's sentence override a sentence of the older decision?):

| Decision | The sentence D-323 overrides | Result |
|---|---|---|
| D-247 | "It runs on its own after each load of a saved game state: after a sign-in, … after a sign-in to the same account with the state kept in the page's memory (D-211)" — D-323: no game is built, so the catch-up does not run | correct |
| D-211 | "After a sign-in to the same account the game sends that state and goes on from it" — D-323: the send of the kept state does not run | correct |
| D-96 | "signing in with email and password … also lead to Siedziba, or … to that map run"; "The browser constructs the game only after the server confirms the session and then answers with the account's saved game state" — D-323: a sign-in stays at the waiting screen | correct |
| D-203 | "After the player signs in again to the same account, the game retries saving that state" — D-323: no game, no retry | correct |
| D-209 | the refused tab "loads the server's saved game state … and plays on from the loaded state" — D-323: no game is built | correct |

- **The other decisions the handoff names.**
  - D-62, D-122, D-132, D-173 and D-283 say what buttons do ("Restart", "Zakończ", "Wznów", leaving a screen pauses). The task's accepted reading of question 1 names exactly these sentences of the definition (lines 196, 556, 631, 691, 841, 916, 1218) as describing a game that works, so they are covered. The five `narrows` are the decisions that reading does not list and that D-323's own sentence about a sign-in reaches. The split is consistent with the task. See F-3 for the edge of this reading.
  - D-97, D-207 and D-208: their sentences hold, because D-323 says saving goes on by them and the frozen state is "the state of that moment". No `narrows` is needed.
  - D-212 (a loaded map run comes back paused): it concerns a load, and no load builds a game after the error, so it is not contradicted.
  - D-253 and D-262: they already agree with D-323 (D-253's paragraph says the page has one last-resort handler, cancels the event, writes one line once; D-262's addendum cites D-323).
  - The invariants `uncaught-failure-game-state`, `expired-session-unsaved-progress` ("retries saving it only after …"; not an obligation to retry) and `catch-up-minutes` are not contradicted.
- **Verification, Rationale, Rejected** did not change in this commit. *Rejected* holds only the ways of the task's *Not chosen* (WAY-134), so ways (b) and (c) of the fix round, which are not in the task, rightly stay out. *Rationale* carries the reason for "none is built".

### The two environment facts

I fetched `ReactFiberThrow.js`, `ReactFiberErrorLogger.js`, `shared/reportGlobalError.js` and (for "by default") `react-dom/src/client/ReactDOMRoot.js` from `https://raw.githubusercontent.com/facebook/react/v19.3.1/packages/…` myself. `package.json` and `node_modules/react-dom/package.json` both say 19.3.1, so the fact is about the edition the product stands on.

- Every quoted passage is found word for word:
  - `ReactFiberThrow.js` § `createRootErrorUpdate`: "Unmount the root by rendering null." (line 99) and "update.payload = {element: null};" (line 103).
  - `ReactFiberErrorLogger.js` § `logUncaughtError`: "const onUncaughtError = root.onUncaughtError;" (line 148). § `defaultOnUncaughtError`: "reportGlobalError(error);" (line 37).
  - `reportGlobalError.js`: "In modern browsers, reportError will dispatch an error event," and "emulating an uncaught JavaScript error." (lines 12 to 13).
- The addresses use a tag (`v19.3.1`), as the existing facts of this file do (`ReactFiberHooks.js` at `v19.3.1`, Node at `v24.17.0`).
- Form: one sentence, one *Source* field, `§ place — "passage"` and ` · ` between pages of one edition and between passages, read date `2026-11-07`, an identifier that names no value or edition, the edition named in the sentence because the product stands on it. The form is the template's. The split into two entries is right: the unmounting and the default report are two facts with two dependants, and the template asks for one fact per entry.
- *Based on* leans on them correctly: "where React takes the card down" rests on `react-uncaught-render-error` (the card's root is the one that has `onUncaughtError`, `src/browser/view/account-card.tsx:694`); the sentence for errors thrown in the other eight roots (`createRoot(element)` with no option, in `character-screen.tsx`, `menu-bar.tsx`, `program-list.tsx`, `program-panel.tsx`, `rule-list.tsx`, `rule-panel.tsx`, `run-screen.tsx`, `trip-plan.tsx`) rests on `react-default-uncaught-report`, since `ReactDOMRoot.js:184` sets `onUncaughtError = defaultOnUncaughtError` when the option is absent. Neither fact is named by an invariant.
- The sentences go slightly past their passages (F-1).

### The rest of the foundation

- `html-exception-reporting` agrees with D-253 and with D-323: the event the page cancels is the event the user agent fires first. `uncaught-failure-game-state` ("changes no more until the page is reloaded, and every save … carries the game state as it stood before the error") agrees with D-323's first sentence, and the no-game clause makes it hold on the build-after-error path of review 1. D-253 and D-262 agree with D-323 as above. I found no entry that contradicts another.

## Findings

No Critical or Important finding.

### Minor

**F-1. The sentences of the two new facts go beyond the passages they quote.**
Place: `foundations/environment_facts.md`, `## react-uncaught-render-error` and `## react-default-uncaught-report` (lines 616 to 627).
- `react-uncaught-render-error` says "when an error thrown in its tree is caught by no error boundary" and "and then hands the error". The quoted passages (`Unmount the root by rendering null.`, `update.payload = {element: null};`, `const onUncaughtError = root.onUncaughtError;`) show neither the condition nor the order. The source does support them: the `HostRoot` case of `throwException` (`ReactFiberThrow.js:648` to `:658`) creates this update only after the walk up the fibers found no class boundary, and `update.callback` (line 104 to 110) calls `logUncaughtError` after the render of null. A reader who compares the passages with the source cannot see this from the passages alone. Also the sentence says "an error thrown in its tree" while the identifier says "render-error".
- `react-default-uncaught-report` says "through `reportError`, which fires an `error` event at the window". The passage carries "In modern browsers" and no "window"; without `reportError` the source falls back to a polyfill that dispatches an `ErrorEvent` on `window` and then writes `console.error` if the event is not cancelled. The sentence drops the qualifier.
Why it matters: the template asks that "the sentence says no more than its source says" and that the passage be what a reader compares the source with. This weakens the check of the fact, but no decision is wrong because of it: D-323 relies on the behaviour of the one browser it runs in, and the source does say it. A fix is to quote the passages that carry the condition and the order (for example the `case HostRoot:` lines and `update.callback = () => {`), and to say "in a browser that has `reportError`".

**F-2. D-323's *Based on* does not name `html-exception-reporting`, although the sentence appears only because the browser fires the `error` and `unhandledrejection` events.**
Place: `foundations/decisions.md`, D-323, *Based on*.
The decision says the sentence stands after "an exception or a rejected promise"; the page learns of both through the two events the fact describes. The template asks *Based on* to name every source that, once it stopped being true, would call the decision into question (WAY-90). D-253 names the fact and D-323 states that the page writes the line "as D-253 gives it", so the dependency is reachable by one step, and the fact's own sentence is about cancelling, which is D-253's concern. For that reason I grade it Minor and am not sure it is wrong. If the author reads the fact as D-253's alone, the entry stands as written.

**F-3. The line between the five decisions D-323 narrows and the ones it leaves unnamed rests on the task's reading, and the reading does not list the earning-loop decisions.**
Place: D-239, D-242, D-250 (`foundations/decisions.md:4703`, `:4791`, and D-250 above); *Relations* of D-323.
D-323's first sentence says the game state "changes no more"; D-250 says "the earning loops of other characters go on through" a pause or an end screen, and D-239 and D-242 say an earning loop goes one game minute per real minute. After the error that is no longer true. The accepted reading of question 1 covers only the definition's sentences about saving, "Restart", "Zakończ", "Wznów" and leaving the screen, so these three are by the same test as D-62 and D-173 (overridden in what they describe), but not on the reading's list. Review 1 graded the same gap as M-5 Minor on the ground that the reading covers most of these decisions. I keep it Minor: a reader of D-250 alone meets a collision with no precedence recorded (WAY-25), but the rest of the working game is the same class and an exhaustive `narrows` list has no end. Options: leave it, as the task's reading does (cost: the collision for D-239, D-242 and D-250 stays unwritten); or name one more sentence in D-323 stating that every decision about the game going on yields to it after the error (cost: a meaning wider than rows 1 and 4, which the human has to accept when merging).

## For the request (not a finding)

- The no-game clause and the three added `narrows` (D-96, D-203, D-209), with `narrows D-247` and `narrows D-211`, are the orchestrator's choice, outside the rows of *Settlements to record*. The decision template lets a human accept a changed meaning by merging the request (WAY-14). The request has to put them before the human. D-323's *Origin* points to the task document, which does not hold this choice; its reasoning lives in `reports/findings-1.md` under `.runs/`, which is not kept, so *Rationale* carries it in one sentence.

## Declined to judge

- The code, the tests and the guidelines of the change: reviewed in `review-1.md` and `review-2.md`; this commit changes two foundation files only.
- M-1 to M-7 of review 1 and N-3 of review 2: not touched by this commit; the return step does not fix them (handoff). M-5 is the same subject as F-3 and N-2/N-1 are closed by this commit.
- Whether the sentence of D-323 is wise for the product (a game that stops after a stray error): the human accepted it in the task's answer to question 1.

## Checks run

- `git rev-parse HEAD` → `f4b73af79abd55a59192ee649534eb4f08d1059f`; `git -C .the-way rev-parse HEAD` → `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`.
- `git log da4e7ac..HEAD`, `git diff da4e7ac..HEAD` → one commit, two files.
- `python -B .the-way/elements/common/foundation_check.py` (from the worktree root) → exit 0, "0 errors".
- `curl -sS -f` of `ReactFiberThrow.js`, `ReactFiberErrorLogger.js`, `shared/reportGlobalError.js`, `ReactDOMRoot.js` at `v19.3.1` → exit 0 each, saved in `C:\Users\Mariusz\AppData\Local\Temp\claude\c7b90770d5ecab56\4038ac73-063e-411e-86b4-870359648570\scratchpad\rv3\`; the passages located by reading the files (line numbers above).
- `grep -rn "onUncaughtError\|createRoot(" src/browser` → one root with the option (`account-card.tsx:694`), eight without.
- `grep -n "D-323" foundations/*.md` → no decision narrows D-323.
- Not run: `npm test` and any focused tests (the commit touches no code or test; the gate stage `foundation_check.py` is the check that reaches the change, and I ran it myself).

## Reach beyond the dispatch

- D-96, D-203, D-209, D-211, D-247, D-62, D-122, D-132, D-173, D-283, D-97, D-207, D-208, D-212, D-239 (head), D-250, D-253, D-262: each read whole (D-239, D-250 and D-212 read first paragraphs and *Relations*), to test `narrows` (handoff names the first group; D-239, D-250 and D-212 I added to look for the same collision).
- Invariants `expired-session-unsaved-progress`, `catch-up-minutes`, `uncaught-failure-game-state`: read whole, for a contradiction with D-323.
- `src/browser/view/account-card.tsx:694` and the `createRoot` calls: for the *Based on* check.
- `.the-way/elements/environment-facts/template.md` whole, `.the-way/elements/decisions/template.md` whole.

## Searches not found or unclear

- I found no place in the foundation or the task that records the orchestrator's no-game choice outside `reports/findings-1.md`; D-323's *Origin* does not name it (see "For the request").
- It is unclear whether the template wants a decision about the page's reaction to the `error` and `unhandledrejection` events to name `html-exception-reporting` in its own *Based on* when the decision it derives its handler from (D-253) already does (F-2).
- The return report says it checked the passages by `grep` on its own fetch; I repeated the check by reading the files and did not use its fetch.
