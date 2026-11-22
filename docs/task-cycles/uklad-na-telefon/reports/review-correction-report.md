FAIL 9fee9680dbf25ea7dfe7c4830564e7b2b26acde0

# Review of correction 1 and of the return step after it

Range `6f9c462f..9fee9680` (4 commits: `22b35b42`, `6468d9fc` by the correction agent; `eba37755`, `9fee9680` by the return step). `git rev-parse HEAD` = `9fee9680dbf25ea7dfe7c4830564e7b2b26acde0`, the head given. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md` (review of a correction made for the human's remarks).

Counts: blocking 2 (Important), Minor 2, out of scope 0.

## Files changed (added / removed lines, `git diff --numstat 6f9c462f..9fee9680`)

- `foundations/decisions.md` +25 -14
- `guidelines/styleguide-browser-view.md` +47 -16
- `src/browser/maps-screen.css` +12 -0
- `src/browser/program-panel.css` +54 -4
- `src/browser/programs-screen.css` +12 -0
- `src/browser/run-screen.css` +13 -0
- `src/browser/styles.css` +6 -0
- `src/browser/view/rule-list.tsx` +139 -89
- `src/browser/view/rule-panel.tsx` +23 -3
- `tests/view/rule-editor.test.mjs` +54 -0
- `tests/view/shared-controls.test.mjs` +27 -0

## Findings

### Important

**I-1. In the phone layout a finger-sized tap on the empty strip of a row's or a header's text line, right of its text, goes to „Usuń”, to the header's „Usuń grupę” or „Zwiń grupę” above, and deletes the rule or the whole group instead of opening it.**

- What a player sees: at 360 px a player taps the empty right-hand part of a rule's first line (right of „Zawsze → Eksploruj”) or of a group header's first line (right of „2 reguły”). With a contact the size the correction itself took as a finger (radius 16 px), the rule is deleted, or — for the first rule of a group — the group above is deleted with all its rules, or folded. No confirmation is asked. A plain tap (Playwright's) and a tap of radius 10 px at the same point open the row.
- Place in the code: `src/browser/view/rule-list.tsx` `RowText` / `clickedBare` and `src/browser/program-panel.css:525-545` (phone block: `.rule-list-controls { flex-basis: 100% }`, `.rule-list-arrows { margin-right: auto }`). The text element `rule-list-body` is `display: contents` (`program-panel.css:359-361`), so it covers only the text itself. The bare part of the `li`/header right of the text is the row, which is an ancestor of the buttons. That is exactly the case the new styleguide sentence describes as unsafe: „Chromium oddaje dotknięcie, które ląduje o kilka pikseli od przycisku, temu przyciskowi, o ile pod palcem nie leży element, który przyjmuje kliknięcia i nie ma w sobie przycisku” (`guidelines/styleguide-browser-view.md`, rule Program editor). With the buttons moved to a line of their own, the right-hand buttons („Usuń”, „▾”, „✕”) sit 4 px under the row's text line, and a header's button line sits right above the first rule's text line.
- Why it matters: remark 1 asks that „a tap anywhere on a rule's row outside its buttons opens the rule” and names the empty strip among the three places to check. The fault the remark names — a tap meant to open silently changes the program — remains at the right end of the empty strip, and there the button reached is destructive. The correction report claims the opposite („both radii: centre, start of the text, middle of the text, middle of the bare strip and the strip 20 px from the next button all reached the row”); that claim does not hold for the strip of the text line above the right-hand buttons.
- Evidence (Chromium of Playwright CLI 0.1.22, `.playwright/cli.phone.config.json`, 360 × 740, touch, the composed program of three groups and six rules):
  - Without any listener (real taps, `Input.dispatchTouchEvent` with `radiusX/radiusY` 16): Programy, a tap at (300,344), the strip right of „1.1 Zawsze → Eksploruj”, 13 px above the top of „Usuń” (287..335 × 357..405) → rule 1 gone (`rules=2,3,4,5,6`). In the first run of the same probe the group „Ciepło” was deleted with its rules and „Jedzenie” folded.
  - With a capturing listener that records the click's target and stops it: Programy — rows 1.1, 1.2: strip → r0 `li.rule-list-row`, r10 `li.rule-list-row`, r16 `button „Usuń”`; row 2.1 (first rule of group 2): r16 `button „Usuń grupę”` (the ✕ of the header above); header „Jedzenie”: r16 `button „Zwiń grupę”` at the middle of the strip, `button „Usuń grupę”` above ✕. Screen of a map run — header „Jedzenie” r16 → `„Usuń grupę”`, header „Reszta” r16 → `„Usuń grupę”`, row 2.1 r16 → `„Usuń”`; r0 and r10 → the row or header in every case.
  - Where text lies near the point instead of bare row (e.g. header „Ciepło”, whose „2 reguły” reaches x 316), the r16 tap goes to the text span and opens: the mechanism works where the text element is under the finger, which supports the reading above.
- Limit of the evidence: radius 16 px is an emulation; a real Android phone reports its own contact size (the correction's concern 5). The radius is the one the correction used to accept its own work.
- Comes from: the correction's code (`6468d9fc`). The return step's entries state it as met.
- Contradiction: yes — D-306, its second paragraph „A tap or a click anywhere on a program rule's row outside its buttons opens the rule panel, at the centre of the row, on its text and on its empty strip alike, and moves no rule”, and D-296's sentence „A tap or a click anywhere on the header outside its buttons opens the group”, both written in `eba37755`; and the human's remark 1.

**I-2. A tap or a click on the handle „⋮⋮” of a row or a header opens nothing, while D-306, D-296 and the styleguide, as the return step wrote them, say a tap anywhere outside the buttons opens, and the styleguide counts the handle as part of the text that opens.**

- What a player sees: on a phone, a tap on „⋮⋮” at the left edge of a rule's row or a group's header (about 16 × 20 px) does nothing.
- Place in the code: `src/browser/view/rule-list.tsx:149-154` `clickedBody` excludes `.drag-handle`, and both `RowText`'s handler and the row's `clickedBare` go through it.
- The entries: D-306 second paragraph („anywhere on a program rule's row outside its buttons”), D-296 („anywhere on the header outside its buttons”), styleguide `guidelines/styleguide-browser-view.md`, rule Program editor: „Wiersz reguły i nagłówek grupy otwiera dotknięcie albo kliknięcie w dowolnym miejscu poza ich przyciskami (D-306, D-296). Tekst wiersza — uchwyt, numer, warunek, …” and „Everything is done by touch”: „otwiera się dotknięciem w dowolnym miejscu poza swoimi przyciskami”. The handle is no button.
- Why it matters: the entries say more than the code does (WAY-263); tasks 12 and 17–21 read these sentences as binding. Either the handle opens on a tap or click (a drag gives no click), or the sentences name the handle as an exception.
- Evidence: real taps (`page.touchscreen.tap`) at the centre of the handle of rules 1, 2, 4, 6 and headers 1, 2 on Programy at 360 px: `open` stayed on the group opened before in every case. The capturing probe: the click reaches `span.drag-handle` (r0, r10, r16) and the code drops it.
- Comes from: the return step's entries (`eba37755`) over the code of `6468d9fc`, which kept the handle excluded as before.
- Contradiction: yes — D-306 second paragraph and D-296 second sentence (`eba37755`), and the styleguide rule Program editor.

### Minor

**M-1. The new case „the stylesheets let the reason of a greyed pick cell break only between its words” (`tests/view/shared-controls.test.mjs`) takes its expected value from a rule no foundation entry holds.** `guidelines/testing.md`, rule „Where the expected value comes from”: „Wymaganie, którego test potrzebuje, a którego fundament jeszcze nie niesie, trafia najpierw do fundamentu, dopiero potem test z niego korzysta.” The requirement (the human's remark 2) stands only in the styleguide (rule States of shared controls), not in a decision; the test carries no `decision:` line. Consequence is small: the styleguide sentence tells a later reader why `overflow-wrap: normal` holds.

**M-2. The comment of `.app-main` in `src/browser/styles.css:214-218` still says „at most 1344 px and the full width of a narrower window (D-280)”**, which D-280's new wording no longer says (it counts the window less the page's side padding). A code comment, outside the diff's lines; the return step names it and left it.

## Each remark of the human

- **1 (fix)**: partly made. A tap at the centre of a rule's row and of a group's header and on their text opens them, at 360 px on Programy and on the screen of a map run, with a plain tap and with radius 10 and 16 px; the buttons are 48 × 48 px and stand at the two ends of a line of their own, so the centre of the row is bare row; the arrows of a rule and of a group still move it (below). Not made: the empty strip right of the text above the right-hand buttons with a finger-sized tap (I-1), and the handle (I-2). The test kept is the structure jsdom can see (`rule-editor.test.mjs`), which is as far as the test environment goes.
- **2 (fix, both)**: made. (a) After a tap on „↓”/„↑” of rule 3 on Programy at 360 px with touch (`(hover: none)` true), the row's background read `rgba(0, 0, 0, 0)`. The blocks for „Teraz”, „Potem”, the lists of maps and of programs were checked by reading the code only: selectors exist (`now-rows.tsx:110,118`, `maps-screen.tsx:197`, `program-list.tsx:231`) and come after the base `:hover` rules at the same or higher specificity. (b) Pick of „Czynność” for the character „Drugi” at 360 px: every section `144px 144px`; „gałąź niewykupiona” on one line (one line top), reason `scrollWidth/clientWidth` 126/126, cell 142/142; screenshot looked at.
- **3**: the reader's M-1, taken by the return step: D-280's new wording and pair checked against the code — `body { padding: 0 var(--space-l) }` (16 px) at ≥1280 and `var(--space-s)` (8 px) in the phone block, `.app-main { max-width: 1344px }`: 1920 → 1344, 1280 → 1248, 360 → 344. True.
- **8**: made. D-396's *Rejected* at `9fee9680` equals word for word its *Rejected* at `587f74f6` (slice 1, before the fix `666e50a5` added the two ways); the ways left are the projected entry's and those of the task's questions 6 and 7 (*Not chosen*).

## Review of the code and the entries

- Computer layout (≥1280): every new rule but two stands under `(width < 1280px)`. The two outside it — `.rule-list-body { display: contents }` and `.rule-list-arrows { display: inline-flex; gap: var(--space-xs) }` — draw the same line as before (the controls already had `inline-flex` with that gap), and `.pick-cell-reason { overflow-wrap: normal }` changes nothing where no word of a reason is wider than its cell. Measured in an ordinary session at 1280 × 720 with no touch: every row and header 27 px high on one line, controls at 1122/1136..1243; a rule row under the mouse `rgb(39, 39, 42)`; a click on the condition opened the rule. The correction's pixel comparison was not repeated.
- 48 px floor: rule and header buttons 48 × 48 (e.g. „W górę” 27..75 × 357..405), rows over 48 px high.
- Keyboard: rows and headers keep `tabIndex=0` and Enter/Space (`asksToOpen` unchanged); `RowText` takes no focus. In the pick at 360 px, from „Eksploruj”: ArrowDown → „Idź”, ArrowDown → „Zbierz” (next section, same column), ArrowRight → „Obchód”, ArrowUp → „Idź” (last line of the previous section, column clamped), as D-306 and `cellAfterKey` give; at 1280 the conditions keep two columns (`427px 427px`). `drawnColumns` falls back to `columnsOf` where the tracks are not in px (jsdom).
- Tests: the new cases test what jsdom can see (DOM structure, a click's target, the cascade of `overflow-wrap`), no layout. The structure case pins class names and React's own `onclick` on the text element; that is an implementation detail by `testing.md` „Behaviour, not implementation”, but D-396's `tests:` clause and the styleguide now name that structure, and the `onclick` is what makes the element a target of Chromium's adjustment, so the assertion breaks exactly when the fault would return. Not a finding.
- The correction's concerns: 1 (`rule-panel.tsx` outside the list) — needed for remark 2b, right to leave. 2 (two lines at 720–1279 px) — within D-396's one phone layout, written as a cost in the styleguide; right to leave. 3 (no rule for the tap) — the return step wrote it (D-306, D-296, styleguide), see I-1 and I-2. 4 (running background checked by a hand-set class) — the selector `:not(.running)` excludes it by reading; right to leave. 5 (real phone's contact size) — I-1 shows the strip already fails at radius 16, so it is not only a concern.
- Entries of the return step: D-280 true (above). D-306 and D-296: form allowed by `.the-way/elements/decisions/template.md` (D-306 a second paragraph for a part of its question, D-296 a second sentence in the first paragraph; the `tests:` clauses in words; pairs for what no test holds); content departs from the code as I-1 and I-2 say. D-396 `tests:` clause matches the new structure case. Styleguide sentences on hover, the pick in two columns, the reason between words, the buttons on their own line: true. No invariant written, nothing deferred.

## Declined to judge

- How Firefox, Edge and Chrome on a real Android phone adjust a tap — not checkable here; D-396 leaves them to a check by hand and to the try on a phone after the merge.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, „0 errors”.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, „0 error, 144 warn, 7 info”.
- `npm test -- tests/view/rule-editor.test.mjs` — exit 0, 82 pass.
- `npm test -- tests/view/shared-controls.test.mjs` — exit 0, 54 pass.
- `npm test -- tests/quality/test_quality_invariants.py` — exit 0, 8 tests OK.
- `npm test -- tests/quality/test_function_and_file_size.py` — exit 0, 2 tests OK.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0, 4 tests OK.
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — exit 0, 3 tests OK.
- Manual, in the browser: `npm run local` at `https://127.0.0.1:62642`, an account at `example.test`, a state composed from loop2-play's `compose-state.mjs` with a second character „Drugi” without „Obchód” and a program of three groups and six rules; Playwright CLI 0.1.22 with `.playwright/cli.phone.config.json` (360 × 740, touch, `(hover: none)` true), then the ordinary config at 1280 × 720. Probes and results as given under I-1, I-2 and the remarks. Arrows with real taps: Programy — rule 3 „W dół” → `1,2,4,3,5,6`, „W górę” → back; group 2 „Grupa w dół” → groups `1,3,2`, „Grupa w górę” → back. Screen of a map run (paused) — centre of rule 3 → opens rule 3; centre of header 2 → opens group 2; text of rule 3 → rule 3; centre of rule 5 → rule 5; name of group 2 → group 2; arrows of rule 3 and group 2 as on Programy. The browser was closed and the start stopped (`npm run local:stop`, 1 stopped).
- Not run: the full `npm test` (the cycle's own run).

## Reaches beyond the dispatch

- `guidelines/testing.md` whole (the handoff points to it for the tests).
- `src/browser/AGENTS.md` whole (work in `src/browser/`).
- `foundations/decisions.md`: D-288, D-289, D-290, D-296, D-306 whole; D-396 by its diff and *Rejected*. To judge the entries and the keys of the pick.
- `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md` whole: the form of the entries.
- `git show 587f74f6:foundations/decisions.md`, D-396 *Rejected* line, and `git log 587f74f6..9fee9680 -- foundations/decisions.md`: remark 8.
- `src/browser/view/rule-list.tsx:120-200, 380-391, 488-502`, `src/browser/view/rule-panel.tsx:128-187, 350-459`, `src/browser/program-panel.css:255-560`, `src/browser/styles.css:20-40, 205-232, 270-300`, `src/browser/programs-screen.css:42-62`, `src/browser/maps-screen.css:22-42`, `src/browser/run-screen.css:530-630`, `src/browser/view/now-rows.tsx:100-130`, `src/browser/tokens.css` (spacing tokens by search): the code beside the diff.
- `.claude/skills/loop2-play/SKILL.md` whole and `.claude/skills/loop2-play/compose-state.mjs` whole; `src/browser/sim/types.ts` (types of a program, by search); `src/browser/sim/saved-game.ts:1443-1454`: to start the game and compose the state.

## Working copies

- `.runs/review-correction/` of the worktree (logs of the focused tests and of the local start, the compose and probe scripts, the composed state, two screenshots looked at): removed.
- `.playwright-cli/` of the worktree (the CLI's own files): removed.
- The local start's database stays under `.runs/local-start/`, made by the product's own tool, which the next start removes. No screenshot was shown to the human or pushed. `git status --short` empty after the removal.

## Unread material

- `reports/reader-report.md`: only the lines found by search for „M-1” and „D-280” (its M-1 and the table row of D-280), not whole.
- `reports/return-step-report.md`: its last section, „Return step again, for correction 1” (lines 118-185), as the handoff names.
- `guidelines/styleguide-browser-view.md`: the hunks of the range's diff and their context, not the whole file.
- `reports/correction-1-report.md`, `correction-1-remarks.md`, `task.md`: read whole.

## Searches not found or unclear

- How large a contact Chrome on a real Android phone reports for a tap, and so how far its adjustment reaches: not known here; I-1 uses radius 16 px, the correction's own model.
- No test or entry says why a click on the handle opens nothing (whether it is wanted for the mouse); none found by search for `drag-handle` in tests and decisions.

## Questions

none
