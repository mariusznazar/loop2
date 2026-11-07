FAIL eb1f864485e4dfb79a188a93c3d738440d845123

# Review of the whole change — Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”

Range `73751e8..eb1f864` (`git log`: `06c69ad` pin move, `c5befaf` code, `eb1f864` foundation and styleguide).
`git rev-parse HEAD` in `C:\Storage\repos\loop2-wt\pytanie-przy-zakoncz` = `eb1f864485e4dfb79a188a93c3d738440d845123`, the head given. One-author route, no slices, no spec, no plan.

Counts: blocking 1, Minor 3 (all within the task), out of scope 3.

## Verdicts on the two readings the orchestrator asked for

### 1. Placement of the question — does not fulfil the task's wording (blocking, Important)

See finding I-1. The wording asks for the band closer to the heading of the copy; the author put it above the whole program panel.

### 2. New decision D-324 — within the task and the decision-log rules; all eight rows written

- Rule: `.the-way/elements/decisions/skill/decide_entry.md`: "When they answer two independent questions, propose two entries, or keep the question the rest serves." D-173's question is "What can the player do with the copy after a map run ends?"; rows 5–7 answer "what does the map run do, and what stands on the screen, while the question stands". Two questions, so two entries is what the rule gives. Numbering: D-324 is the next free number (the log ends at D-323; no other branch of this checkout writes D-324, `grep` over `.runs` and the log).
- The task's sentence "Co z tych odpowiedzi cykl wpisuje do D-173, mówią wiersze 1–8" does not say that rows 5–7 stand in D-173's text; rows 5–7 name no D-173 text in their "What the cycle would otherwise guess" column. *Decisions in play* binds D-173 and D-44 as the entries written; D-324 is an addition the task does not forbid and the skill rule gives. I judge it within the task. Cost: the vault plan's *Projected entries* does not know D-324 (see out-of-scope O-1).
- Coverage of rows (checked against the text of `foundations/decisions.md`, each entry read whole):
  - row 1: D-173, binding sentence 3 („Zapisz”, „Odrzuć” ends with no save, „Wróć” closes and leaves the map run as it was) and *Verification* („Odrzuć” leaves „Program” as it was). Met.
  - row 2: D-173, binding sentence 3 („new program under the first free name with no name field, and ends the map run”). Met.
  - row 3: D-173, "the line of D-172 stands under the sentence". That „Zapisz” replaces the program's changes is only implied by "as „Zapisz w programie” does" and by *Rationale*; see M-1.
  - row 4: D-173 ("in a band above the program", `warning`, answers in order, „Odrzuć” destructive (D-44)). Met.
  - rows 5, 6, 7: D-324 binding sentences 1–3; each clause of the three rows is there (pause like „Pauza”, „Wróć” restores, rest of the screen works, list of what closes it, „Wznów”/„Restart”, leaving the screen, memory of the page only, reload as D-212). Met. *Rejected* of D-324 holds exactly Q6 B and C and Q7 B and C, with the cost beside each as the sources keep it (WAY-134); *Accepted with it* follows Q6 and Q7 "Cost".
  - row 8: D-173 has "under the band of a discovery where one stands"; "nad nagłówkiem kopii" is not written. See I-1 (the entry says what the code does, but the code departs from the row).
- Form: D-173 and D-324 each have three binding sentences; *Scope*, *Relations*, *Verification* (complies/violates), *Origin*, *Rationale*, *Rejected* present; `foundation_check.py` 0 errors. D-173's *Rejected* holds only ways its sources keep (definicja's first two, Q2 B/C, Q3 B/C, Q4 A/C, Q8 A); D-44's added *Rejected* line is Q5 B with the cost as the source gives it. The edit of D-173's first sentence ("or ends the map run with „Zakończ”") is the reading the task's Question 7 fixes.
- Other entries: `grep` of „Zakończ” over `foundations/` — D-53, D-62, D-132, D-122, D-212, D-311, the entry at line 3328 (carried items lost at „Zakończ”) stay true after the change; none moved.

## Findings

### Critical

None.

### Important

**I-1. The question stands above the whole program panel, not "tuż nad nagłówkiem kopii" (task, To do 1 and row 8) — within the task, blocking.**
- Place: `src/browser/view/run-screen.tsx` (the `<EndQuestion>` after `DiscoveryBand` and before `<div className="run-program-place">`, lines ~158–163 of the new file), and the placement test in `tests/view/end-question.test.mjs` ("the question stands in the program's area under the band of a discovery and above the program panel"), and D-173's text.
- Task wording (frozen `task.md`): To do 1, last sub-item: "pas pytania stoi pod nim, tuż nad nagłówkiem kopii „Kopia: {imię}” i jej linią „Niezapisane zmiany w kopii.” (pytanie 8)". Question 8, Answer: "Pas pytania stoi pod pasem odkrycia, tuż nad nagłówkiem kopii i jej linią „Niezapisane zmiany w kopii.”; nic, co już stoi, się nie przesuwa poza samym programem, a pytanie stoi przy kopii, której dotyczy." Question 4 and To do 1's first sub-item: "w pasie nad programem, jak pas odkrycia".
- What the code does: the screenshot `reports/question-under-discovery-band.png` (and `question-running.png`) shows the order band of a discovery, question, then the list „Program:”, „Nowy program”, and only then „Kopia: Program” and „Niezapisane zmiany w kopii.”. So two controls (the list and „Nowy program”) stand between the question and the heading of the copy: it is above the program panel, not "tuż nad" the heading, and not "przy kopii, której dotyczy".
- Why it is wrong, not only different: (a) "tuż nad" has one meaning, directly above, and the task gives it twice (To do 1 and Q8). (b) The author's reason for the other placement (author-report, choice 3: inside the panel "only the copy section and rules would move, whereas row 8 says nothing already standing moves except the program itself") does not hold: the copy section and its rules are the program, so a band just above the heading of the copy moves only the program, as Q8 says; the author's placement is the one that also pushes the list and „Nowy program” down. (c) Both readings of "nad programem" are met by the band standing just above the heading (it is above the rules of the program and under the band of a discovery); the author's reading satisfies only one of the two sentences of the task, and the author's own report names it unclear (author-report, "Searches not found or unclear").
- Effect on the user (WAY-220): small but real. The question that is about the copy stands two controls away from the copy's heading and its line „Niezapisane zmiany w kopii.”; at 1280 px it wraps to three rows and pushes „Program:”, „Nowy program” and the whole copy down by that height, with the discovery band above it. The player sees no breakage.
- Why it blocks: a missed requirement of the task (WAY-161, Important by section 3: "a missed requirement"), and the foundation entry D-173 and the placement test were written to the departure (D-173 omits "nad nagłówkiem kopii", row 8; WAY-263).
- Fix as the cycle may choose: place `EndQuestion` in the program panel just above `.copy-section` (the panel has its own React root; the question needs a way into it, as the author notes: a one-line move plus a prop path), then change the placement test and D-173's "in a band above the program" to say "above the heading of the copy" (D-173's *Rejected* line for Q8 A stays). Or, if the cycle reads the two sentences of the task as in conflict, ask the human one question — "pas pytania nad listą „Program:” i „Nowy program”, czy tuż nad „Kopia: …”?" — before the request, because the answer changes code, test and D-173. I recommend the first: the text of Q8 and the not-chosen option A ("pas odkrycia zjeżdża w dół o wysokość pytania") both read the band as the one directly next to the discovery band and the heading.
- Cost if left: a merged placement different from the human-accepted task; a later task (14, 16) that reads D-173's text stands on the wrong place. Cost if fixed: a small change to the panel boundary and one test.

### Minor (within the task)

**M-1. D-173's binding text leaves half of row 3 to be read from D-172.** `foundations/decisions.md`, D-173 sentence 2–3. Row 3: "„Zapisz” je zastępuje" (the changes the program has that the copy lacks). D-173 says the line stands and „Zapisz” "saves the copy as „Zapisz w programie” does"; D-172 says that save replaces them in one click, so the text is true and complete by reference, but the row's words are only in *Rationale* ("the line of D-172 says what the save replaces"). Saying it in the binding sentence ("and replaces them") would make the entry carry the row. Not blocking: nothing in the code or the entry says otherwise.

**M-2. Evidence file does not show what the author's report says it shows.** `reports/after-save-programy.png` is described as "taken on Programy after „Zapisz”" (author-report, Check of the changed screen), but the image shows Siedziba (the character's headquarters: „Ala”, „Mag żywiołów”, the list of icon credits), not Programy with the copy's groups; the author wrote that they did not open it. The claim "Programy shows „Program” with the two groups of the copy" is covered by the test case „Zapisz” saves the copy into its program … and Programy then shows that program, so the behaviour is proven by the test, but the screenshot is no evidence for it (WAY-219).

**M-3. Placement test encodes the order the author chose.** `tests/view/end-question.test.mjs`, the case on order in the program's area. It checks `discovery-band > end-question > run-program-place`; when I-1 is fixed it must check the question standing between the list and the heading of the copy (just above the `Kopia:` heading, under the band of a discovery). Listed so the fix of I-1 changes it with the code.

### Out of scope (outside the task; grade as stated)

**O-1. (Minor)** The vault plan `plan_mvp2_loop2.md`, section *Projected entries*, lists only D-173 and D-44 for this task, not D-324; the return step of the cycle should record D-324 there. Not a defect of the repository.

**O-2. (Minor)** After `halt()` (D-323), „Zakończ” of a copy with no unsaved changes still navigates to Postać (`endRun` calls `show`, unchanged by this task), while „Zakończ” with unsaved changes now does nothing. D-323 says the game state changes no more and the buttons change nothing; navigation is not game state, and the first path is as it was before the task. Unchanged behaviour of the old path; mention only.

**O-3. (Minor)** `guidelines/coding-browser-module.md`, table *Files of this kind*, has no row for the new `src/browser/view/end-question.tsx`; the guideline itself says that a file added after the last audit has none and is no exemplar. `foundation_check.py` reports no error. A kind-audit task owns it.

## Declined to judge

- The look of the question at windows narrower than 1280 px (task gives no layout; the author did not check it; at 1280 px it wraps to three rows) — outside the task.
- The kitchen-sink page: the band is no shared control (the styleguide rule "The kitchen-sink page" is about shared controls); I did not judge a need for a sample.
- The danger colour of „Odrzuć” under the pointer and at focus in the real browser: not rechecked by me (the author states the same class and rule as „Zakończ”; `tests/view/end-question.test.mjs` checks the destructive kind; `react-controls` and token-contrast tests pass).
- The pre-existing inconsistency O-2 and the guideline table O-3 — outside the task.

## Checks I ran (command, exit code)

All in the reviewed worktree (nothing tracked changed; `git status --short` clean before and after; build output goes to the ignored `dist/`).

| Check | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git log 73751e8..HEAD`; `git diff 73751e8..HEAD` read | 0 | head as given |
| `npm test -- tests/view/end-question.test.mjs` | 0 | 16 pass |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 8 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 126 pass |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 49 pass |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 | 13 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | pass |
| `npm test -- tests/invariants/test_copy_save.py` | 0 | pass |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 | pass |
| `npx tsc -p tsconfig.browser.json --noEmit` | 0 | no errors |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npx eslint --max-warnings 0` on the six changed source and test files | 0 | clean |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser tests/view` | 0 | clean |
| Mutation check M1 of mine, in a scratch copy of the head (`git archive` into the scratchpad, `node_modules` junctioned): `resume` computed as `!state.paused` only (drops `!mapRunEnded(run)`), `npm test -- tests/view/end-question.test.mjs` | 1 | 1 fail: the case „Zakończ” with unsaved changes asks at every moment … — the test catches it |
| Mutation check M2, same scratch copy: „Zapisz” of a deleted program saves under the fixed name "Program" instead of `suggestedProgramName` | 1 | 1 fail: the case „Zapisz” of a copy whose program was deleted … first free name — the test catches it |

Not run (by the handoff): `npm test` without an argument (the orchestrator runs the gate on the final tree); the author's real-browser check was not repeated by me (no browser run); I read the three screenshots under `reports/`.

Manual checks:
- Pin move `06c69ad`: `git show --stat` lists only `.the-way` (gitlink), `AGENTS.md` and 42 `the-way-*` entry points in `.claude/skills/` and `.agents/skills/` (40 changed, `the-way-review-foundation` added in each); `AGENTS.md` diff is inside the markers `the-way:begin` (line 19) to `the-way:end` (line 31); no `.claude/rules/the-way.md`. `git -C .the-way rev-parse HEAD` = `52889bc700123b50258c4201835034f0529351df` = `git ls-files --stage -- .the-way`. Met.
- Answers of step 4: `src/browser/sim/` has no change in `git diff --stat 73751e8..HEAD`; `saved-game.ts` untouched; the question is `let question` in `createGameView` and in the screen's closure, never in the state passed to `keep()`; the test "the question lives in the page alone" reads the kept document. No operation that cannot be undone: „Odrzuć” ends a map run and drops the copy, which „Porzuć zmiany” and „Zakończ” did before. Holds.
- D-323: `closeQuestion`, `saveAndEnd`, `discardAndEnd`, `back` and the asking branch of `end()` return first on `halted` (`src/browser/view/game-view.ts`); test 15 compares the kept document whole before and after. Holds.
- Own-work check of the author: the weakest point they name is the placement; its check (DOM order in a case and in the browser) would not catch the requirement "tuż nad nagłówkiem kopii" unmet, because the case asserts the order the author chose, not the distance to the heading — this is I-1. The second named point (state after `halt()`) is checked and holds.
- Tests: each case names its break in the comment above it; I compared the claims of the author's 12 mutants with two of my own (M1, M2 above); both fail a test. Expected values are written out (sentences, button lists, names), not computed by the code under test; the file imports `page-document.mjs` first and takes `assert` from it (testing guideline, "Tests on a document imitation").
- Guidelines: `guidelines/coding.md` (lint, format: tsc, eslint, prettier pass), `guidelines/coding-browser-module.md` (React `.tsx`, no new hooks, no DOM module pattern, `copyLacksSentence` a pure function imported from a React view to a React view; the band is not a shared control, so the two-forms rule does not apply), `guidelines/styleguide-browser-view.md` (role `warning` for the sentence and the line of D-172; bar in `currentColor` per "A line at a text takes the colour of that text"; no value in place of a token — `browser-view-token-values` passes; „Odrzuć” added to the destructive list and D-173 to the rule's *Decision* line, as To do 8 asks), `guidelines/testing.md`, `src/browser/AGENTS.md` (only tokens in the added CSS rules) — no departure found beyond I-1.
- To do coverage: 1 (question at every moment; sentence in `warning`; buttons in order; „Odrzuć” destructive; D-172 line; placement — I-1), 2 (case „Zakończ” without unsaved changes ends at once), 3 (both „Zapisz” cases, the deleted-program one with `suggestedProgramName` and no field), 4, 5, 6 (pause, leaving, reload, „Wznów”/„Restart”, copy no longer unsaved, pace and second „Zakończ”; the ended-run screens hold the question in the same code path and test 3 covers asking after death and completion), 7 (Programy shows the program the copy belongs to, the new one after „Zapisz” of a deleted program), 8 (styleguide line). All are met except placement.

## Reaches beyond the dispatch (what, where, why)

- `.the-way/task-cycle/review/whole_change.md`: named by the method for the whole-change review.
- `.the-way/elements/decisions/template.md` and `.the-way/elements/decisions/skill/SKILL.md`, `decide_entry.md`: to judge D-324 against the decision-log rules (the orchestrator's second question).
- `foundations/decisions.md` search for „Zakończ” and the entries it found (D-53, D-62, D-132, D-122, D-212, D-311, line 3328 entry): to see whether another entry answered the question in passing; none moved.
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`: guidelines of the touched parts, each whole.
- `src/browser/sim/game.ts` (`restart`, `end`, `setPaused`): to check what „Restart” and „Wróć” do to the paused state.
- `.runs/task-cycles/pytanie-przy-zakoncz/cycle.md`: to read the answers of step 4.
- Vault `Notes\Projects\(P) Loop\_zadania\pytanie_przy_zakoncz_loop2.md` and `Notes\Projects\(P) Loop\plan_mvp2_loop2.md`: I only listed the directory to confirm the file named in D-173's and D-324's *Origin* exists (it does); I did not read the plan (O-1 is by the task's own text).

## Searches not found or unclear

- The task's *Decisions in play* lists the entries written (D-173, D-44) and says rows 1–8 name what goes into D-173; it does not say whether rows 5–7 may move to a new entry. I judged by `decide_entry.md` (two questions, two entries); unclear whether the human meant one entry.
- The task's two sentences on placement ("w pasie nad programem, jak pas odkrycia" and "tuż nad nagłówkiem kopii") can be read as one place only if the band stands between the discovery band and the heading of the copy; the task does not say whether the list „Program:” and „Nowy program” count as part of "program". Unclear (decides I-1's remedy).
- The handoff's focused-check form `python -B scripts/test.py <file>` fails outside npm; I used `npm test -- <file>` as the author did.
- The frozen task's front matter reads `status: draft` while its body reads `Status: ready for cycle`; I took the body line (the cycle record says the human accepted it on 2026-11-07).
- No invariant guards D-173 or D-324 (no *Verification* invariant); not looked for further.
