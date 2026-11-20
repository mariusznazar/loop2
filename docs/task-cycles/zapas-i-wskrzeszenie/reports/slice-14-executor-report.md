**Status:** `done with concerns`

# Slice 14 — The end-of-run window speaks of uses: executor report

Branch `task/zapas-i-wskrzeszenie`, base `fd5eb418`. Method: `.the-way/task-cycle/change/SKILL.md`, variant "a slice, or the retry of a slice".

## Commits

- `25223337` feat: :sparkles: write the uses of the team's resurrection into the end-of-run window's lines (D-216). Pushed: no.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/end-window-lines.ts` | 34 | 10 |
| `tests/view/end-window-lines.test.mjs` | 50 | 21 |
| `tests/view/end-window.test.mjs` | 10 | 10 |
| `tests/view/end-window-game.test.mjs` | 6 | 6 |

What the code does now (per D-216 as it stands in `foundations/decisions.md`):

- After a death that spent a use (`deathSettlement.kind === "resurrectionUsed"`): „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia {u} z {c}; zużyte wracają po kolei, jedno {r} czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.” in `text-secondary`. `{c}` is `BALANCE.resurrectionUses`; `{u}` is `{c}` less `settlement.usesSpent`, computed when drawn; `{r}` comes from `renewalSpanText(BALANCE.resurrectionRenewalRealMinutes)`.
- New pure export `renewalSpanText(minutes)`: 60 gives „co godzinę”, 120 „co 2 godziny”, 300 „co 5 godzin”, 240 „co 4 godziny”, 720 „co 12 godzin”, 1320 „co 22 godziny”; 90 gives „co 1 godz. 30 min”; 59 gives „co 59 min”. Declension through `countedName` (`src/browser/view/counted-name.ts`).
- Death with no use left (`progressLost`): „Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.” in `danger`.
- Death of a character with no practice (`noPractice`): „Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.” in `text-secondary`.
- First solving that returned a use: „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.” in `text-secondary`; none where the stock was full (`endRenewalLine`).
- Roles, the death-unsettled `null` and the completion deposit line are unchanged.

Test changes, each with its reason. The reason is the `decision:` line of the case, which quotes D-216 as it stands (the closing quote is included; the foundation check requires it):

- `end-window-lines.test.mjs`: the used-up case now builds `usesSpent: 1` and expects „zostały użycia 2 z 3” and „co 4 godziny”; a second assertion with `usesSpent: 3` expects „0 z 3” in `text-secondary`. The no-practice and renewal texts are the D-216 words. New case: the span forms (above). The renewal case is retitled and its settlement shape gets `usesSpent: 1` where it builds a death.
- `end-window.test.mjs`: `DIED` and the „why” case build `{ kind: "resurrectionUsed", usesSpent: 1 }`; the expected cost text, the danger text, the no-practice text and the renewal text are the D-216 words; the `decision:` quotes are updated.
- `end-window-game.test.mjs`: the reload case after a death expects the same used-up line with „2 z 3” and „co 4 godziny”; the reload cases expect the no-practice and renewal texts; the `decision:` quotes are updated.

## Checks

Each run was made from the worktree root; the results are below.

- `npm test -- tests/view/end-window-lines.test.mjs`: exit 0, 12 of 12 pass. Run before Prettier and again after the final comment edits: pass both times.
- `npm test -- tests/view/end-window.test.mjs`: exit 0, 14 of 14 pass (final run).
- `npm test -- tests/view/end-window-game.test.mjs`: exit 0, 27 of 27 pass (final run).
- `npx prettier --check` on the four files: exit 0 (after one `--write` on the lines test, which only re-wrapped one assertion).
- `npx eslint` on the four files: exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 23 errors, none in the four files of my Change. The 23 are in `guidelines/styleguide-browser-view.md` and `src/browser/view/trip-lines.ts` (both `D-251`, withdrawn, to be named by slices 15, 16, 18), `src/browser/maps-screen.css`, `src/browser/view/maps-screen.tsx`, `tests/view/maps-screen.test.mjs`, `tests/view/trip.test.mjs`, `tests/view/account-screen.test.mjs` and `tests/sim/trip.test.mjs`, which later slices stand for by the plan. Those errors predate my commit, which touches none of those files.
- Not run, by design: the full `npm test` (the gate is the orchestrator's or CI's); the foundation check without `--skip-test-citations` (the orchestrator asked for the skipped form).

Test-first: not followed for this slice. The code and the test changes were written in one pass, so I did not record a failing run before the code. The cases that check the four lines assert literal text (hand-written from D-216 and the task's question 6 and 16), so they cannot pass by reusing the code's own helpers; I did not make a separate failing run for the new span function.

## Own-work check (`SKILL.md` section 3)

- Requirement most likely unmet: the line must speak of the moment of death, with the uses left computed from the settlement's `usesSpent`, not from the current state. Check: the `usesSpent: 3` assertion (expects „0 z 3”) and the `usesSpent: 1` assertion (expects „2 z 3”). Result: both pass. A mutation that reads the state's current stock instead would fail the reload case only where the state differs; I did not run that mutation.
- Requirement: the danger colour only at zero uses left. Check: the `progressLost` case expects `danger`, the `resurrectionUsed` case expects `text-secondary`. Both pass.
- Requirement: the span in the hours of the data with the forms of question 16. Check: the `renewalSpanText` table (hand-derived, teens and one hour included). Passes.
- Mutations thought through: a plural off by one (12 and 22 are the teen and the few cases), a wrong split of hours and minutes, a text in another role, a line shown while unsettled: each changes an asserted text or role, so a test catches it.

## Walk and screenshot (`walkthrough.md`, `ui_check.md`)

- Judgement: the change alters text a user sees in the window (behaviour a user sees).
- Walk: not performed. The orchestrator's handoff makes the walk through the running game with screenshots a dedicated step after slice 17. No plan of cases was drafted and no case was checked in the running product.
- Screenshot: none taken, for the same reason. The role and text states are checked by the jsdom class and text assertions of the three files, not by looking at the rendered window.

## Reaches beyond the dispatch

- Read `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`, because the method names them for a change that alters what a screen shows.
- Read `src/browser/view/team-lines.ts` for the existing hours-and-minutes reading of D-217, to check it does not already give the span form (it does not; D-216's span is a separate form).
- Read the user's global `git.md` rules (the hook asked for it before the commit).
- Read `src/browser/sim/types.ts` (`DeathSettlement`), `src/browser/sim/game.ts` (`teamAfterDeath`), `src/browser/sim/data/balance.ts` (count 3, span 240 min), as the handoff's extra note asks.

## Working copies

- `.runs/slice-14-executor/` (my directory): test logs, the decision index, and a copy of the lines test before Prettier. Removed before return by its full path; no git worktree was made, so no `git worktree remove` applied. The removal result is stated in my return message.

## Unread material

- Not read whole: `tests/view/end-window.test.mjs` (742 lines; read at lines 40-80 and 228-418 only) and `tests/view/end-window-game.test.mjs` (1229 lines; read at lines 1080-1215 only). Each file was edited by search and ranges, as the reading note allows.
- Not read: `task.md` itself (the passages the handoff copies were used instead).
- Not read: the glossary entry `resurrection` (the slice lists it in its dependency table; my *Read* does not name it).
- Not opened: decisions quoted by unchanged assertions in the altered cases, namely D-212, D-311, D-369, D-370, D-371 and D-62 (their sentences are unchanged by this slice; the altered assertions are the cost, renewal and no-practice texts only). D-368 was read through the decision index, where its full text is listed.
- `foundations/part_map.md`: only lines 1-40 (the browser-view section, 3-31, is covered).
- `guidelines/testing.md` and `guidelines/styleguide-browser-view.md`: read whole, in ranges.

## Searches not found or unclear

- Stale wording outside my Change: `guidelines/styleguide-browser-view.md:1050` says the cost line stands in `danger` „gdy wskrzeszenie nie było gotowe (D-185, D-216)”. This is prose, not quoted text, and the guideline is not in my Change. It may need the styleguide's maintenance step.
- Stale comment outside my Change: `tests/view/world-area.test.mjs:284` quotes the old no-practice text („śmierć nie zużyła wskrzeszenia drużyny”) in a comment; no assertion reads it.
- The old text `Następne wskrzeszenie` and `nie było gotowe` no longer appears in `src/` or in my test files (grep); `kind: "resurrectionUsed"` without `usesSpent` no longer appears in my test files.
- Unclear: whether `zostały użycia {u} z {c}` should decline `użycie` for `{u} = 1`. D-216 writes the words literally; I followed D-216 and did not decline.

## Concerns and questions

1. D-216 puts the line of a death that spent the last use (`usesSpent` equal to the count) in `text-secondary` with „zostały użycia 0 z 3”. D-217 puts the card's line at zero uses in `danger`. The two agree only if the window keeps the D-216 role. I followed D-216 as written. Question for the orchestrator: keep it, or should the zero-left window line be `danger` as well? Answer I recommend: keep D-216 as written, since it is the decision of record for this line; the card and the window then differ by design, and the human can decide.
2. „zostały użycia {u} z {c}” is literal, so `{u} = 1` reads „zostały użycia 1 z 3”. Recommended answer: keep the literal wording, as D-216 gives it; a declension would be a new decision.
3. The renewal span comes from `BALANCE.resurrectionRenewalRealMinutes` (240, an integer). `renewalSpanText` does not handle fractional minutes. Not needed with the data as it stands.
4. Trust boundary: this slice reads `usesSpent` from a state that `saved-game.ts` has already checked (`integer(read.usesSpent, 1)`, `usesSpent > BALANCE.resurrectionUses` refused). I added no new input read; the crafted-input checks belong to the saved-game slice, which I did not touch.
5. The commit's author address is `mariusznn@gmail.com`, the address that the user's rule gives for the private account. I did not verify this repository's remote account.
