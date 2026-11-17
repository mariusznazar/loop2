PASS 255e41be125239b0a96e0d244a881130a59c5333

# Review of the return step of correction 1 — task `sesja-w-przegladarce`

Variant: a later change to an open request (the return step's commits of correction 1), method
`.the-way/task-cycle/review/SKILL.md` with `.the-way/task-cycle/review/fix.md` (correction part).
Range `1ce0195a..255e41be`, one commit `255e41be` ("docs: :memo: add the styleguide's rule that the
menu bar stays in sight when the screen of a map run opens, …"), one file
`guidelines/styleguide-browser-view.md` +12 −0 (the handoff says +13; `git log --stat` gives 12).
`git rev-parse HEAD` = `255e41be125239b0a96e0d244a881130a59c5333`, the head given.
`.the-way` at `bfb2e109`, the commit the gitlink records.

## Findings

### Critical

none

### Important

none

### Minor

none

Blocking: 0. Minor: 0. Out of scope: 0.

## The remarks of correction 1 (`reports/correction-1-remarks.md`)

- **Item 2** ("The menu bar stays in sight when a run screen opens: moving the keyboard focus to the
  screen must not scroll the page."): **made**. The code was made in `1ce0195a` (reviewed `PASS` in
  `reports/review-correction-1-report.md`, not re-reviewed here); this range writes the rule that
  binds it after the merge, `guidelines/styleguide-browser-view.md:563-573`.
- Items 1, 3–8: no code and no rule asked of this request (let through, or moved to another task);
  nothing in the range touches them, rightly.

## What was checked, by the points of the handoff

1. **The rule against the remark and the template.**
   - Scope: the binding paragraph (`:570-571`) — „Gdy otwiera się ekran przejścia, pasek menu stoi w
     polu widzenia: przeniesienie fokusu klawiatury na ten ekran nie przewija strony.” — is the
     remark's sentence, the run screen alone. It does not take in the author's wider wording from
     `reports/correction-1-report.md:72` ("moving the focus to a shown screen does not scroll the
     page"), so the registry's wider no-scroll for every screen stays code, not rule, as the return
     step's report says under "Consequence to name". Not wider than the remark, not narrower.
   - Form (`.the-way/product-guidelines/template.md` "Required form" and "Rules of writing"):
     `### ` heading of its own under `## Rules`, in English; *Decision*, *Invariant*, *Good*, *Bad*
     in that order; *Decision* `none`, *Invariant* `none`; *Good* and *Bad* one line each,
     describing a use that follows and one that breaks the rule; then how to apply it; the reason in
     one sentence („Powód: strona przewinięta przy wejściu chowa pasek menu nad krawędzią okna, a z
     nim drogę do innych ekranów.”). No rationale, no rejected options, no decision repeated.
   - State of the product: the rule text lists nothing the code has today. *Good* names two
     concrete uses („Wejdź” on Mapy, „Wróć do przejścia” on the bar), which is what a *Good* line is
     for and what the neighbouring rules' *Good* lines do; both are the two entries the remark names.
     The *Good* line's „fokus klawiatury stoi na tym ekranie” is true at both entries: the clicked
     control leaves the page in both cases (Mapy is hidden; the bar drops „Wróć do przejścia” on the
     run screen, styleguide `:591`), and `focusIfLost` (`src/browser/view/screen-registry.ts:206-213`)
     moves the focus to the shown screen; where an ended run is entered, the focus goes to the end
     window, which lies inside the screen's element (`run-screen.tsx:308-312`).
   - Place: right after "Focus does not fall to the page" (`:551-561`), the other rule with
     *Decision* `none` on where the focus goes, and right before "Menu bar, the menu „Konto” and the
     list of programs". Fits.
   - Language: Polish body, English heading and field names, as the file and the template give.
2. **No contradiction with the neighbours.**
   - "Focus does not fall to the page" (`:551-561`): the focus still goes to the screen, never to
     the page; the new rule only bars the scroll. Agrees.
   - "Menu bar, …" (`:575-611`): the bar stands at the top of every screen; the new rule keeps it in
     sight at entering. Agrees.
   - "The end-of-run window" (`:992-1098`) and D-370 (`foundations/decisions.md:10396-10420`, read
     whole): D-370 puts the page at its top when the window opens so the menu bar stands in sight; its
     rejected option "the window taking the focus without moving the page" concerns the window, not
     the entering, and the new rule does not ask for it. The window's own `focus()` without
     `preventScroll` (`src/browser/view/end-window.tsx:66`, `run-screen.tsx:311`) is followed by
     `scrollTop = 0` (`run-screen.tsx:161-163`, `:312`), and at an entering `placed`
     (`src/browser/view/run-entry.ts:259-264`) puts the page at its top before `screenState.entered()`
     opens the window; the outcome the rule binds holds. Considered as a possible wording conflict
     ("focus moved to this screen does not scroll") and set aside: at an entering the window is
     focused on a page already at its top, and a window that appears mid-play is no opening of the
     screen.
   - D-371 (`:10422-10439`, read whole): the window opens at every entering; `placed` still calls
     `screenState.entered()` at each, after the scroll. Agrees.
   - D-407, D-408 (`:4553-4583`, read whole): the registry focuses every screen the same way, with no
     branch for the run screen (`screen-registry.ts:196-214`); the scroll to the top stands in the run
     screen's own entry, which D-408 allows ("one branch left for the way back to the screen of a map
     run" is about the registry's loops, and the entry is the screen's own module); the `here` flag
     is entry-local and holds no question or window, so `run-screen-state.ts` keeps what D-407 gives
     it. Agrees.
   - D-311 (passage searched): no sentence on focus or on where the page stands. Agrees.
3. **No entry went stale at `1ce0195a`.** Own searches of `foundations/decisions.md`,
   `foundations/invariants.md`, `foundations/glossary.md`, every file of `guidelines/` and
   `src/browser/AGENTS.md` for `scroll`, `scrollTop`, `preventScroll`, `into view`, `focus`/`fokus`
   with screen and page, „przewij”: no sentence says a screen scrolls into view when it takes the
   focus, or that the page is left where it is at a change of screen. The hits on scrolling are about
   the program panel's rows (`foundations/decisions.md:10196-10228`), the chronicle (`:10670-10796`), the pick (`:9271`),
   the end window (D-368, D-370) — none touched by the correction. `guidelines/coding-browser-module.md:244,271`
   name a screen's `focus()` method, which still exists. `tests/view/character-screen.test.mjs:181`
   and `tests/view/headquarters-screen.test.mjs:327` cite "Focus does not fall to the page", which is
   unchanged. The return step's claim holds.
4. **Styleguide rule, no decision, no invariant.**
   - By `.the-way/task-cycle/skill/return_step.md` a choice that binds after the merge goes to the
     place the questions of the decisions template give
     (`.the-way/elements/decisions/template.md:145-159`). Question 2, "a rule only for … the look of
     the product", answers yes: what the player sees of the page at a change of screen; the remark
     fixes the outcome and no costly alternative is carried by the rule (the means — `preventScroll`,
     the page to its top in `placed` — stay in code, with the author's *Choices* in
     `reports/correction-1-report.md:65-68`). The styleguide already keeps the sibling rule "Focus
     does not fall to the page" with *Decision* `none`. Right.
   - Invariant: `return_step.md` lets an invariant be written *only* for a rule the task, a decision
     or the human sets — a necessary condition, not an order to write one. The human set this rule,
     but its place is the guidelines by question 2, and there *Invariant* names an invariant only
     where a cheap test checks the rule (template "An invariant only where a cheap test checks the
     rule"); no test of the suite can: jsdom has no layout, and D-88 excludes automating checks of
     real focus. With *Invariant* `none` the rule is kept by the review of each change it reaches,
     which is what an invariant with *Method* `review` would add, a second copy. No invariant is
     right. The return step's report cites jsdom only; D-88 is the stronger ground, which changes
     nothing.
   - The rule is the cycle's wording of the human's remark; naming it in the request's description
     is the orchestrator's (template "A rule with no decision is accepted as a row of the task's
     table").
5. **Checks** — below.

## Declined to judge

- The correction's code (`1ce0195a`), including the wider effect that every screen is now focused
  without scrolling: reviewed `PASS` in `reports/review-correction-1-report.md`; outside this range.
- The Roles table of `guidelines/styleguide-browser-view.md:14-41` fails Prettier's check: present at
  the base `1ce0195a` too, outside this range and outside the gate (the one command is
  `python -B scripts/test.py`, no Prettier step for Markdown found in `package.json`).

## Checks

- `git diff 1ce0195a..255e41be`, `git log 1ce0195a..255e41be --stat`, `git rev-parse HEAD`
  → head `255e41be`, one commit, one file.
- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` → both `bfb2e109…`.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py` → exit 0, `0 error, 142 warn, 7 info`;
  no warning on lines 563–573 of the styleguide (9 warnings in that file, all on other lines, such as
  the hash addresses `#/mapy` at `:662`).
- `git diff --check 1ce0195a..255e41be` → exit 0.
- `npx prettier --check guidelines/styleguide-browser-view.md` → exit 1; same result on the base
  through `--stdin-filepath` (exit 1); the only hunk Prettier would change is `14,41` (the Roles
  table), none in the new rule.
- Tests that read the styleguide file: search of `tests/` for `styleguide-browser-view` → none; tests
  only cite rules by name in comments (`tests/view/character-screen.test.mjs:181`,
  `tests/view/headquarters-screen.test.mjs:327`, `tests/view/program-list.test.mjs:264,485`), none
  of them the new rule. No test to run.
- Not run: the full gate (the orchestrator's); no browser check (the range changes no code).

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md` — whole; the method sends a correction's review there.
- `.the-way/elements/decisions/template.md:133-171` — the five questions, to judge where the rule goes
  (point 4).
- `.the-way/elements/invariants/template.md:1-75` — whether an invariant with *Method* `review` was due
  (point 4).
- `foundations/decisions.md` D-311 (`:9955-9975`, searched for focus, menu bar, top) — the handoff
  names it.
- `src/browser/view/run-screen.tsx:140-175,240-315`, `src/browser/view/end-window.tsx:55-75`,
  `src/browser/view/run-entry.ts:80-145,210-285` at `1ce0195a`, and `git grep` for `.focus(`,
  `scrollTop`, `preventScroll`, `scrollIntoView` in `src/browser` — to judge the rule and its *Good*
  line against the code (points 1–3).
- `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `src/browser/AGENTS.md` — grep for
  focus and scroll (point 3).
- `reports/correction-1-report.md:65-74` — the author's choices and the wider wording, to judge
  "no wider" (point 1).

## Working copies

None made; `.runs/review-correction-1-return/` was not created. Prettier's base check read the file
from `git show` through stdin, writing nothing.

## Unread material

- `foundations/decisions.md`: D-368 and D-280 not read whole (only the passages the searches hit);
  D-311 only searched. D-370, D-371, D-407, D-408 read whole.
- `reports/review-correction-1-report.md`: its first line only (`PASS 1ce0195a…`).
- `reports/return-step-report.md` (the first return step): not opened; this range adds a rule and
  changes no entry the first return step compared.
- `reports/correction-1-report.md`: lines 1–20 by search hits and 65–92; not read whole.
- `guidelines/styleguide-browser-view.md`, `.runs/task-cycles/sesja-w-przegladarce/task.md`,
  `reports/correction-1-remarks.md`, `reports/correction-1-return-step-report.md`,
  `.the-way/task-cycle/skill/return_step.md`, `.the-way/product-guidelines/template.md`,
  `.the-way/task-cycle/review/SKILL.md`: read whole.

## Searches not found or unclear

- A sentence of the foundation or the guidelines that says a screen scrolls into view when it takes
  the focus, or that the page is left where it is at a change of screen: none found.
- A Prettier check of Markdown in the one command: none found in `package.json` scripts.
