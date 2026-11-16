# Report — the return step

**Status:** done (the one concern of the first return is closed by the section "Answer to the question").

**Commits** (on `task/przejscie-widoku-na-react`, head before: `f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa`):

- `937e4b0a` — `foundations/decisions.md` (D-402, D-262, D-276, D-264, D-269, D-407).
- `6df956ae` — `tests/view/account-screen.test.mjs`, `tests/view/uncaught-failure.test.mjs` (comments only, no assertion).

Both with explicit paths, no push, no amend. `git status --short` is empty.

## Foundation compared with code

Compared with the code at the head: D-03, D-44, D-45, D-47, D-76, D-96, D-209, D-211, D-262, D-264, D-265, D-269, D-275, D-276, D-280, D-286, D-323, D-381, D-395, D-402, D-407, D-408, plus D-36, D-43, D-97, D-156, D-157, D-207, D-208, D-210, D-225, D-253, D-261, D-263, D-266, D-267, D-273, D-274 (binding sentences and the passages that speak of the page, the controls or the kitchen-sink page); the invariants `browser-view-framework`, `application-build-kitchen-sink`, `preview-server-access`, `browser-view-focus-outline`, `browser-view-token-values`, `uncaught-failure-game-state`; the part-map entries `browser-view`, `build-tools`, `agent-workflow`, `product-foundation`; the glossary.

| What no longer matched | Correction |
|---|---|
| D-276 *Rejected*: "keyboard handling written by hand in both forms of the control (D-265)" | "…in the control's React component and its tests" (the reference to D-265 goes: that decision no longer speaks of forms) |
| D-264 *Rationale*: "the cases that walk the page also build the screens still in DOM, so what stands in for the model has to carry those too" | "the cases that walk the page also walk what the page builds by hand, the header, the main block and the panel of a card taken down, so what stands in for the model has to carry those too" (that is what `app.ts` and `createFailureCard` build now) |
| D-407 *Verification*: a pair held in part by the case `an error in the drawing of the waiting screen's root or of the sentences' root …` (`tests/view/uncaught-failure.test.mjs`, quoting the second paragraph of D-407) | the part is out of the pair and in the clause `tests:` (see item 4 below) |
| D-269 *Based on* and *Rationale*: the development build of the bundle rests on the entry file of React's package, which the foundation holds as the fact `react-entry-build` and the entry did not name | `react-entry-build` added to *Based on*; one clause in *Rationale* ("which the entry of React's package loads wherever the bundle does not mark production") |

Matched the code and unchanged: D-03, D-44, D-45, D-47, D-76, D-96, D-209, D-211, D-265, D-275, D-280, D-286, D-323, D-381, D-395, D-408 and the other decisions listed above. The invariants match too: `browser-view-focus-outline` ("`:focus-visible` and one more selector" is the one rule of `kitchen-sink.css` with its two selectors `:focus-visible, .sample-focus :not(span):not(div):not(option)`), `application-build-kitchen-sink`, `preview-server-access` (the script's serving lines stand as the whole-change review checked), `uncaught-failure-game-state` (a reset that closes the game and sends nothing breaks no sentence of it), `browser-view-framework`, `browser-view-token-values`. The part map needs no change: the new files fall under `src/browser/view/**`, `src/browser/kitchen-sink/**` and `tests/view/**` of `browser-view`; `tsconfig.kitchen-sink.json` and `scripts/kitchen-sink.mjs` stay in `build-tools`; the descriptions of the parts stay true. The glossary holds no term of the change ("secondary action" does not speak of forms). No environment fact was missing besides what D-269 now names. The search words of the whole-change review ("both forms", "two forms", "DOM form", "in DOM", "DOM APIs", `createElement`, `app.ts`, "by hand", the deleted file names) were searched again over `foundations/`: the remaining hits are D-03's rejected options, D-407's rejected ways and the text of D-264 that this step corrected.

## Entries written or changed

| Entry | Kind | Change | Marked |
|---|---|---|---|
| D-402 | decision | second paragraph (two sentences), `derives from D-323` added, *Verification* `tests:` and pair, *Rationale* | the cycle's (choices a and c) |
| D-262 | decision | second paragraph (two sentences), *Verification* `tests:`, *Rationale* | the cycle's (choice b) |
| D-276 | decision | *Rejected* wording | the cycle's |
| D-264 | decision | *Rationale* wording | the cycle's |
| D-269 | decision | *Based on* (`react-entry-build` added), *Rationale* clause | the cycle's |
| D-407 | decision | *Verification*: pair shortened, clause `tests:` extended | the cycle's |

No invariant, environment fact, glossary term or part-map entry written or changed; no projected entry; no row of *Settlements to record* left (the three rows were written by the foundation step: row 1 in D-269, row 2 in D-265, row 3 in D-407).

### What I wrote, entry by entry (English, then Polish)

1. **D-402**, second paragraph: "Where an error that no code of the game handled came first (D-323), a reset that succeeds closes the game that stood, with its saving, and builds none, so the page shows the waiting screen with the sentence of the failure alone. An outcome of the saver of the game a reset built acts at once, also while the logout of the old game waits for its answer."
   - PL: Gdy wcześniej wystąpił błąd, którego nie obsłużył żaden kod gry, reset, który się udaje, zamyka grę, która stała, razem z jej zapisem i nie buduje żadnej, więc strona pokazuje ekran oczekiwania z samym zdaniem o awarii. Wynik zapisu gry zbudowanej przez reset działa od razu, także gdy wylogowanie starej gry jeszcze czeka na odpowiedź.
2. **D-262**, second paragraph: "At each entry into the warning with „Spróbuj ponownie”, the first and one after a retry, focus moves to that button. The button is one element through the refusal, the retry, in which it reads „Sprawdzanie…” and is disabled, and the next refusal."
   - PL: Przy każdym wejściu w ostrzeżenie z „Spróbuj ponownie”, pierwszym i po ponowieniu, fokus przechodzi na ten przycisk. Przycisk jest jednym elementem przez odmowę, ponowienie, w którym czyta „Sprawdzanie…” i jest wyłączony, i następną odmowę.
3. D-276, D-264, D-269: the corrections of the table above, no change of a binding sentence.
4. **D-407**: from the pair I removed the two parts the case holds — "the row of the failure drawn once when the page starts into a host of its own that stays hidden, and shown at the error by the page with no render" (*complies*) and "the sentence of the failure drawn in the root of another place of the page, or rendered by a root at the error" (*violates*) — and named the case in `tests:`: "an error in the drawing of the waiting screen's root or of the root of the sentences above the game, each taken down by React, leaving the sentence of the failure shown once in its row and one line written". The rest of the pair (a new screen as a root of its own, no single root, no shared context, the waiting screen or a row of sentences inside one root of a skeleton) no test holds and stays. D-265's pair stays whole: the case that quotes D-265 (`tests/view/shared-controls.test.mjs`) holds the first sentence only, and no test quotes its second paragraph (the panel's constant), so its examples are all for parts no test holds. D-323's pair stands as the foundation step left it.

## Return step, choices that bind after the merge

| Choice | Went to |
|---|---|
| a. A reset that succeeds after an error nothing handled closes the game that stood and builds none | D-402, second paragraph, first sentence (with `derives from D-323`; D-323 itself is unchanged, since its sentences already say "builds no game" and are quoted by 19 cases); *Verification* `tests:` and *Rationale` of D-402. The case `tests/view/uncaught-failure.test.mjs` "a reset that succeeds closes the game that stood…" now quotes that sentence in place of the sentence of D-402 on 204, which the case does not hold after an error |
| b. Focus moves to „Spróbuj ponownie” at every entry into the refused screen, a refusal after a retry included, and the button stays one element | D-262, second paragraph (two sentences). `tests/view/account-screen.test.mjs` (the case "„Spróbuj ponownie” is one button …") quotes both |
| c. A saver outcome of a game built by a reset, arriving while the old game's logout waits, acts at once | D-402, second paragraph, second sentence. D-402's old text ("the outcomes of the old game's saver") did not say it for the logout of the old game. **Concern:** the cases that hold it are `tests/view/previous-save.test.mjs:1490-1531` (the loop over `HELD_OUTCOMES`), which cite only the two older sentences of D-402. I did not touch that file (the handoff: "any other test" is not mine), so the sentence is carried by a pair (complies / violates) in D-402's *Verification*, not by `tests:`. One comment line `// decision: D-402 "An outcome of the saver of the game a reset built acts at once, also while the logout of the old game waits for its answer."` in those cases lets the pair's part go and gives the clause `tests:` its words ("an outcome of the saver of the game a reset built acting at once while the old game's logout waits, a conflict reloading it and a missing session showing the forms") |
| d. Decision 6 / settlement N1 (the page types an empty text into its number-field sample outside React, in its entry module) and forcing hover and focus by the class of a wrapper | Left in the record (spec Decision 5, Decision 6 and N1), no entry. Judged: they bind no later work beyond what stands. "Code only the page needs stays in the page's entry module" is a rule of `guidelines/styleguide-browser-view.md` ("The kitchen-sink page"), the place the template's question 2 names for such a rule; D-45 already asks of the page each state or the reason a state does not apply; D-47 and the invariant `browser-view-focus-outline` already hold the one extra selector of the sample of focus, which is the wrapper class's CSS side; D-269 states what the page shows and how it is built, not how a state no prop draws is reached. The technique is the maker's choice and its cost (the page showing the number instead of the empty field after a change of React) falls on a developer's page, as the spec says |
| e. D-264, D-276 | corrected, as above |

## The two comments of tests

- `tests/view/account-screen.test.mjs` (the m1 case): the line "To do 2 of the task: …" replaced by two lines `decision: D-262 "…"`, the two sentences of D-262's new paragraph. The existing quotations of D-262 and D-44 stay.
- `tests/view/uncaught-failure.test.mjs`: "(To do 4 of the task)" dropped from the comment of `assertWaitingWithSentence`; the quotation of D-323 stays there as the sentence of D-323 holds it. In the case of the reset after an error the `decision: D-402` line now quotes the new first sentence of D-402's second paragraph.
- No assertion changed. `git grep -n -E "To do [0-9]|of the task"` over `tests src scripts guidelines` has no hit.

## Checks

| Check | Command | Result |
|---|---|---|
| foundation after the entries | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| foundation at the head after both commits | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| account screen | `npm test -- tests/view/account-screen.test.mjs` | exit 0, 132 pass |
| uncaught failure | `npm test -- tests/view/uncaught-failure.test.mjs` | exit 0, 19 pass |
| format | `npx prettier --check tests/view/account-screen.test.mjs tests/view/uncaught-failure.test.mjs` | exit 0 |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0, `0 error, 138 warn, 7 info` |

Not run: the whole `npm test` (the orchestrator's alone); `foundation_check.py` with the switch `--skip-test-citations` (the plain run is stricter and passes).

## Own-work check (`make-change`, section 3)

- Requirement most likely not met: every `decision:` line of the two test files that quote an entry I wrote begins a sentence of that entry and stands in its binding sentences (the check's own rule), and the entries I touched keep the quotations of the other tests valid. Check: the foundation check run after the entries and after the commits (exit 0, no error); my new sentences are separate paragraphs, so no quotation of D-402 (`tests/http.test.mjs`, `tests/account-storage.test.mjs`, `tests/account-api.test.mjs`, `tests/view/previous-save.test.mjs`) and none of D-262 or D-323 changed its text.
- Second requirement: the entries carry no word the template bars (*should*, *will*, RFC keywords in capitals) and my *Rationale* sentences name no file, script or count. A search of my diff (`git diff f89dbd09..HEAD -- foundations/decisions.md`) shows none.
- Third: the claim in D-402's *Rationale* that a save of the old game "on the basis 0 would be accepted over the start from zero" follows D-209's text (a save is accepted on 0 where the account has none) and the whole-change review's note; I did not run it.

## Choices and ways rejected

- **A second paragraph in D-402, not a sentence in D-323, for choices a and c.** D-323 has three sentences already and its quoted sentences must keep their start; a fourth sentence there would break "one to three". D-402 owns the reset; a reader of D-323 alone finds nothing about the reset, but D-402 `derives from D-323` and says "Where an error … came first (D-323)". Cost if wrong: a reader who searches D-323 for the reset does not find it; the cost of putting it in D-323 would be a decision of three sentences with a fourth.
- **`derives from D-323`, not `narrows D-323` or `narrows D-402`.** The second paragraph agrees with D-323 ("builds no game") and limits D-402's third sentence, which D-402 itself now says in its own paragraph, so no precedence between two decisions is needed. Cost if wrong: a reader of D-402's third sentence alone reads "replaces the game" without the exception; the paragraph under it gives it.
- **D-262 for choice b, a second paragraph.** The handoff named D-262 or D-96; D-96 holds three long sentences that many tests quote, and D-262 is the entry of the waiting screens. A part "that can change on its own" is a question of its own by the template's "Changing a decision", so a new decision about the behaviour of the retry button was the other reading; I took the handoff's reading and kept it a precision. Cost if wrong: the focus rule is changed with the places rule.
- **Choice c in a pair, not in `tests:`**, because the tests holding it are another file's (see the table). Way rejected: adding the one comment line to `tests/view/previous-save.test.mjs`; it is a comment, not an assertion, but the handoff says "any other test" is not mine.
- **`react-entry-build` in D-269's *Based on*.** Cost if wrong: one more fact named; the fact is true and the bundle's `define` of `process.env.NODE_ENV` stands on it.

## Questions

None blocking. One for the orchestrator, with my recommendation: add the one `decision: D-402 "An outcome of the saver of the game a reset built acts at once, also while the logout of the old game waits for its answer."` line to the case at `tests/view/previous-save.test.mjs:1493` (the loop of `HELD_OUTCOMES` for the new game's outcomes) and then take the matching two parts out of D-402's pair and name the cases in its clause `tests:`. Without it the sentence is held by a pair, which the foundation check accepts.

## Reaches beyond the handoff

- `.the-way/elements/common/foundation_check.py` (the part that reads `decision:` lines and the rule "held"): to see that a decision is held when any test quotes it and what makes a quotation valid.
- `foundations/environment_facts.md` (`react-entry-build`, `react-hook-order-report`, `browser-bare-import-resolution`) and `scripts/kitchen-sink.mjs`, `tsconfig.kitchen-sink.json`, `src/browser/kitchen-sink/kitchen-sink.css`, `kitchen-sink.tsx` (lines near the typing of the empty text): to judge D-269's *Based on* and the settlement of choice d.
- `src/browser/view/waiting-screen.tsx`, `src/browser/view/app.ts` (the lines around `draw`, `whenNotBusy`, `showGame`): to word the sentences of D-262 and D-402 as the code does.
- `tests/view/previous-save.test.mjs:1270-1335, 1480-1540` and `tests/view/uncaught-failure.test.mjs:960-1135, 755-900`: to see what the cases hold.
- `docs/task-cycles/przejscie-widoku-na-react/spec.md` Decisions 3-6 and N1, `reports/spec-reviewer-report.md` F4, `reports/review-whole-report.md`, `reports/review-fix-1-report.md`: the sources of choices a-d.
- `the author's rules for writing an artefact` and `.../git.md` (the author's rules for writing an artefact and a commit).

## Unread material

- D-03 *Based on*/*Rationale*/*Rejected* read whole; D-44 and D-45, D-47, D-76, D-96, D-209, D-211, D-262, D-264, D-265, D-269, D-275, D-276, D-280, D-286, D-323, D-381, D-395, D-402, D-407, D-408 read whole.
- D-209, D-210, D-211, D-225, D-261 read whole. D-36, D-43, D-97, D-156, D-157, D-207, D-208, D-253, D-273, D-274 read as printed with each field cut to its first 1100-1500 characters, so the tail of some *Rationale* and *Rejected* fields was not read; D-263 and D-266 read whole; D-267 whole.
- D-288, D-289: named in the handoff's ranges, not read (nothing in the change reaches them).
- Invariants: `uncaught-failure-game-state`, `application-build-kitchen-sink`, `preview-server-access`, `browser-view-focus-outline`, `browser-view-token-values` read whole; `browser-view-framework` read whole.
- Part map: `browser-view`, `build-tools`, `agent-workflow`, `product-foundation` read whole through the lines I printed (the entry `build-tools` from its *Files* to the end of the first lines of it).
- Glossary: read the headings and the entry "secondary action"; the other terms were searched by words, not read.
- `foundations/decisions.md` beyond the entries above: not read; searched by words.
- Task, spec (Decisions 3-6, N1, *Foundation entries*, *Left to the maker*), reviews: read whole; plan: not read (its *Foundation entries* are carried by the foundation step's report, read whole). `guidelines/testing.md`: not read whole; I read nothing of it, and changed no assertion; the rule that a test comment quotes the foundation was taken from the handoff and the review. `guidelines/styleguide-browser-view.md`: lines 385-435 only.
- `src/browser/AGENTS.md`, `guidelines/coding.md`: not read (no product code changed).

## Searches not found or unclear

- A foundation entry that states the focus of „Spróbuj ponownie” or the one element of the button: none found before this step (written now, choice b).
- A foundation entry that states what a reset that succeeds after an error does: none before this step (choice a).
- `guidelines/testing.md`'s exact words on a test comment quoting the foundation: not read; relied on the handoff and the review of fix 1.
- The handoff says "D-264's *Rationale*" is untrue: the quoted sentence stood at `foundations/decisions.md:1252` of the earlier head; found by search and corrected.

## Working copies

None made. Three scratch files of command output in `.runs/` (`return-step-fc1.txt`, `return-step-t1.txt`, `return-step-t2.txt`) were removed before returning. No worktree, clone or screenshot.

## Answer to the question

The orchestrator answered yes: one comment line in `tests/view/previous-save.test.mjs`, nothing else in that file, no assertion changed. Done in commit `80cdb843`:

- `tests/view/previous-save.test.mjs`: one line `// decision: D-402 "An outcome of the saver of the game a reset built acts at once, also while the logout of the old game waits for its answer."` added in the loop over `HELD_OUTCOMES` (the cases "…of the game a reset built acts at once, while the logout of the old game still waits"), after the two older D-402 lines.
- `foundations/decisions.md`, D-402 *Verification*: the clause `tests:` now holds "a conflict and a missing session answered to the saver of the game a reset built, while the logout of the old game still waits, acting at once, the conflict reloading the game and the missing session showing the forms"; the two parts of that sentence are out of the pair, which keeps the confirmation example alone, as before the step.

Checks:

| Check | Command | Result |
|---|---|---|
| foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| previous save | `npm test -- tests/view/previous-save.test.mjs` | exit 0, 46 pass |
| format | `npx prettier --check tests/view/previous-save.test.mjs` | exit 0 |

The concern of the status line and the table row c above is closed: status is now `done`. The commit list is `937e4b0a`, `6df956ae`, `80cdb843`. `git status --short` is empty.

**Unread material (current):** as above, plus: `tests/view/previous-save.test.mjs` read lines 1270-1335 and 1480-1540 only, not whole; `foundations/decisions.md` D-402 was re-read whole at its edit.

**Searches not found or unclear (current):** as above; the earlier gap on D-402's sentence is closed. Nothing new.

**Working copies:** none made.

## Fix of I1

**Commit:** `d164271d` (explicit paths `foundations/decisions.md` and `tests/view/previous-save.test.mjs`; no amend, no push).

**The finding holds.** `src/browser/view/app.ts:508-522` (`whenNotBusy`) holds an outcome of any game, a game a reset built included, while that game's own reset waits and while that game's own logout waits for its answer; `logOut` (`:695-724`) runs the held outcome after the logout answers. My sentence "acts at once" was broader than that and, for a second reset, against paragraph 1 of D-402. The *Rationale* of D-402 ("held neither with those of the old game nor until the old game's logout answers") and the clause `tests:` were already at the narrow scope.

**Change.** D-402, paragraph 2, sentence 2 now reads: "An outcome of the saver of the game a reset built is not held for the logout of the old game, which may still wait for its answer." The quotation at `tests/view/previous-save.test.mjs` (the `HELD_OUTCOMES` loop, the line after the two older D-402 lines) is that sentence, so it still begins a sentence of D-402. The clause `tests:` is unchanged ("…while the logout of the old game still waits, acting at once…"), as are the *Rationale* and the rest of the file. `git grep "acts at once, also while"` over `foundations tests src guidelines` has no hit left. m1 of the review (D-264's list) is not touched, as instructed.

**Checks:**

| Check | Command | Result |
|---|---|---|
| foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| previous save | `npm test -- tests/view/previous-save.test.mjs` | exit 0, 46 pass |
| format | `npx prettier --check tests/view/previous-save.test.mjs` | exit 0 |

**Own-work check:** requirement most likely not met: the new sentence is still true of the code in the case the test builds and not broader than the code in the two cases the finding names. Check: read `app.ts:508-522` and `:695-724` against the sentence (the new game's own logout and own reset still hold, and the sentence speaks of the old game's logout only); the quotation begins the sentence and the foundation check passes. I did not run a mutation of the code.

**Reaches beyond the handoff:** `src/browser/view/app.ts:695-724` (the logout), to word the sentence.

**Unread material (current):** as above, plus `findings-return.md` and `review-return-report.md` read whole; D-402 re-read whole at its edit; `app.ts` read at 505-523 and 695-724 only.

**Searches not found or unclear (current):** as above; nothing new.

**Working copies:** none made.
