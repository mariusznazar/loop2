# Report of the return step of correction 1 — task `sesja-w-przegladarce`

**Status:** `done`

**Commit:** `255e41be` docs: :memo: add the styleguide's rule that the menu bar stays in sight when the screen of a map run opens, from the human's remark on the request — `guidelines/styleguide-browser-view.md` +13 −0.

Head compared: `1ce0195a` (correction 1 on `81502efc`).

## Return step (the record's *Return step* form)

- **Foundation compared with code:**
  - The styleguide's rule "Focus does not fall to the page" (`guidelines/styleguide-browser-view.md`): the focus still goes to the shown screen when the clicked control leaves the page, never to the page — matches `focusIfLost`/`focusShown` with `preventScroll: true`. Its neighbours "Visible focus" (no outline is set by the change) and "The end-of-run window" (the window takes the focus once; the page goes to its top) — match.
  - D-370 ("the page is at its top when the window opens, so the menu bar stands above it in sight"; "the window takes the focus when it opens") — matches: `run-screen.tsx:161` and `focusWindow` are unchanged, and the page now also stands at its top before, at entering.
  - D-371 (the window opens again at every entering of the screen of an ended map run) — matches: `placed` in `run-entry.ts` still calls `screenState.entered()` at each entering, after the new scroll.
  - D-368, D-311, D-280 — no sentence on focus or on where the page stands at entering; unchanged by the correction.
  - D-408 (*Verification*: the registry "focuses … the screens through those entries"; violates: a screen "that the registry shows, draws, focuses or takes down by a branch written for it") — matches: the registry focuses every screen the same way, with no branch; the page going to its top stands in the run screen's own entry, not in a branch of the registry.
  - D-407 (the state of the screen Przejście in `run-screen-state.ts`) — matches: the flag `here` lives in the entry and holds no question or window.
  - D-88, D-89 (real focus checked by hand; the return condition of the exclusion) — no sentence made false; the correction report names the return condition for the human.
  - Invariants of `browser-view` on focus: `browser-view-focus-outline` (no `outline` set outside the one rule) — matches; no other invariant names focus or scrolling.
  - Search of the foundation (`foundations/decisions.md`, `foundations/invariants.md`, the styleguide) for "focus" with screen, page, scroll and keyboard, and for "scroll"/„przewij”: no sentence says that a screen takes the focus and scrolls into view, or that the page is left where it is at a change of screen. Nothing no longer matched; nothing corrected.
  - Part map: `browser-view` claims `src/browser/view/**`, `agent-workflow` claims `guidelines/**`; both match. `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors` (after the styleguide change).
- **Decisions written or changed:** none.
- **Styleguide rule written** (the place the rule goes; no foundation entry): "The menu bar stays in sight when the screen of a map run opens" in `guidelines/styleguide-browser-view.md`, after "Focus does not fall to the page" — *Decision* `none`, *Invariant* `none`. Source: the human's remark on the request, item 2 (`reports/correction-1-remarks.md`: "The menu bar stays in sight when a run screen opens: moving the keyboard focus to the screen must not scroll the page."), given by the adviser of the day on behalf of the human. The binding sentence is the remark's, nothing wider: it speaks of the screen of a map run alone. Marked `the cycle's` for its wording, its *Good*/*Bad* lines and its one sentence of reason ("strona przewinięta przy wejściu chowa pasek menu nad krawędzią okna, a z nim drogę do innych ekranów"), which the remark does not give and the template requires of a rule with *Decision* `none`; the request's description names it among what the human did not see in the task.
  - Meaning in English: when the screen of a map run opens, the menu bar stands in sight; moving the keyboard focus to that screen does not scroll the page.
  - Meaning in Polish: gdy otwiera się ekran przejścia, pasek menu stoi w polu widzenia; przeniesienie fokusu klawiatury na ten ekran nie przewija strony.
  - Where it went, and why there: it passes the plan test (it binds after the merge, WAY-36) and goes by question 2 of the decisions template — a rule only for the look of the product, what the player sees of the page at a change of screen — to the styleguide, as a rule with its reason in one sentence, beside the rule on focus it extends. It carries no choice with a real cost: the remark sets the outcome and no other way was weighed. Not a sentence of D-370, which answers how the end-of-run window covers the screen, a different question.
- **Invariants written or changed:** none. The rule is the human's, but no cheap test of the product's code can check it (it needs layout; jsdom scrolls nothing), so *Invariant* reads `none`.
- **Environment facts:** none. The correction rests on `focus({ preventScroll: true })` and `scrollTop`, behaviour of the browser observed in the cycle's own check (Chrome 157); nothing cites them, and the template writes the product's own measurement as no fact.
- **Glossary terms:** none.
- **Part-map changes:** none.
- **Projected entries written whole or in part:** none.
- **Rows of *Settlements to record* written:** none (the task's table is `none`); the remark's rule went to the styleguide as above.

## Consequence to name (not a rule)

The registry now moves the focus to every shown screen without scrolling, wider than the remark's run screen: a screen of another kind that is entered while the focus is lost (a bar link, back and forward, the deletion of a program, the end of a map run leading to Postać or Mapy) no longer jumps so that its top meets the window's top; the page stays where the browser leaves it. The remark sets no rule for those screens, and the rule written names none; the correction report's *Choices* names this cost. Not written as a rule.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` → exit 0 (`0 errors`).
- Not run: the full gate.

## Unread material

- `.the-way/task-cycle/skill/return_step.md`, `foundation_step.md`: read whole earlier in this cycle (first return step); not re-read whole for this one, as the handoff says they are the same files.
- `.the-way/product-guidelines/template.md`: lines 40–90 read again (form and fields of a rule); the rest as read earlier.
- `.the-way/elements/decisions/template.md`: lines 133–171 as read in the first return step.
- `reports/review-correction-1-report.md`: not opened; the handoff gives its verdict (`PASS 1ce0195a`, no finding).
- D-407 and D-408 read in the passages the search hit (binding sentences, *Verification*); D-370 and D-371 whole.

## Searches not found or unclear

- A sentence of the foundation on where the page stands at a change of screen, or that a screen scrolls into view when it takes the focus: none found.
- Whether a rule on what the page shows at a change of screen is "the look of the product" (question 2) or a decision on the screen of a map run (question 5): read as the former, by the styleguide's own rule "Focus does not fall to the page", which stands there with *Decision* `none`; a reader who takes it as a decision would move it into D-311.

## Working copies

`.runs/author/` held the log of `foundation_check.py`: removed. Remainder: none. No browser and no server started.
