FAIL f124f5f4529b15b22111aa20cc1bf6bec40a0f75

# Review of the whole change — task `edytor-programu-modale`

Range `a566f5d52210085d9c5e94d4878815bd6c1ebc54..f124f5f4529b15b22111aa20cc1bf6bec40a0f75` (commits `05e30198`, `85466a8c`, `46383db1`, `f124f5f4`), read in full with `git diff` and `git log`. `git rev-parse HEAD` in the worktree is `f124f5f4529b15b22111aa20cc1bf6bec40a0f75`, the head given; `.the-way` stands at the pinned `b502011f53225451ddf121e2b772a903b87492db`. Method: `.the-way/task-cycle/review/SKILL.md`, variant "the whole change" (`whole_change.md`). One author, no plan, no slices: every blocking finding comes "from no slice".

Counts: blocking 1 (Important), Minor 6 (all within the task), out of scope 0.

## Findings

### Important

**1. In the phone layout a tap on the header of a rule group beside „▾”, above or below it, folds the group instead of opening its window.**

- Place: `src/browser/program-panel.css:618-623` (phone block: `.rule-list-header .rule-list-controls { flex: none; align-self: stretch; align-items: center; }`), with the header's buttons in `src/browser/view/rule-list.tsx:461-495`.
- What is wrong: the change puts „▾” on the line of the header's text in the phone layout and stretches the span `rule-list-controls` over the whole height of the header, while „▾” (48 × 48) stands centred in it. In a header of two lines or more the span is taller than „▾”, so a strip of the span above and below „▾” is bare: it is neither the text box (`rule-list-body`) nor a gap (`rule-list-gap`), it takes no click of its own and it holds a button. That is exactly the place the product's own rule says Chromium hands to the nearest button.
- Evidence (my check in the running game, Chromium, page area 360 × 740, touch emulated through the browser protocol): a group renamed so that its header wraps to two lines measured header 436..505 and „▾” 446..494, so 10 px strips of `rule-list-controls` stand above and below „▾” (`document.elementFromPoint` there gives `rule-list-controls`). A touch tap 4 px under the header's top edge, at the horizontal centre of „▾”, folded the group (the button read „▸” afterwards, no window opened) with touch radius 0, 8 and 15 px alike. Controls: a touch tap at the centre of the header's text opened „Grupa 1 „…”” as it should; a mouse click on the same strip opened the window (the header's `clickedBare` sees the span as bare). Headers of two lines are ordinary in the phone layout: the author's own screenshot `loop2_lista_regul_360.png` shows both groups' headers on two lines („Grupa 1 Zawsze 3 reguły / Wykonano 1×”). The author saw this too and left it ("a tap above or below it in a header of several lines lands on bare header, which Chromium may give to ▾ (folding only, harmless); not corrected").
- Why it matters: D-296, which this change rewrites, keeps "A tap or a click anywhere on the header outside its buttons opens the group, at its centre and on its text as well", and the styleguide rule "Program editor" as this change writes it says „Żadne miejsce wiersza ani nagłówka poza przyciskiem nie jest gołym wierszem … a w nagłówku przed „▾” stoi przerwa z `rule-list-gap`”. The change's files fail to do what both entries require (WAY-263), and the behaviour is new with this change: before it the buttons stood on a line of their own, as tall as the buttons, with no strip above or below them. The effect on the player is a mistaken fold where an open was meant — harmless to the program, but the very kind of stray tap the task (question 4) set out to remove.
- Direction of a fix (not binding): let „▾” or a gap fill the height of the controls span in the phone layout (for instance `align-items: stretch` on `.rule-list-header .rule-list-controls`, or a stretching gap above and below „▾”), then repeat the touch tap on a two-line header.

Contradiction: yes — D-296 („A tap or a click anywhere on the header outside its buttons opens the group”), a decision this change rewrites, and the styleguide rule "Program editor" as this change writes it.
Slice: from no slice (the whole change is one author's range).

### Minor (all within the task)

**M1. The watch of the window's size can still end in the browser's error of a `ResizeObserver` loop where its change of the list's height removes the page's scrollbar.** `src/browser/view/rule-window.tsx:807-826` (`lay`, run from the `ResizeObserver` callback). The callback resets and sets `min-height` of the list. Where that shortens the page so that a classic (space-taking) vertical scrollbar disappears, the window widens in the same frame, Chromium cannot deliver that change and fires the error event "ResizeObserver loop completed with undelivered notifications.", which the game takes for a failure („Coś w grze się zepsuło — odśwież stronę.”, and the game halts) — the author met the same error with the list observed. Evidence: a probe page of my own (an area `position: relative`, a list, an absolute window, the same `lay` in a `ResizeObserver` on the window alone), in Chromium with scrollbars shown: growing the window gave no error; shrinking it so that the page fit the viewport again gave exactly that error. In the game itself I did not reach it: a change of field in the window is a React commit, so `lay` runs in the layout effect before the observer gathers, and the transition I drove (Programy, 1600 × 720, window on rule 1.13, action field → condition field, the scrollbar going away) gave no error. What remains is a change of the window's size without a commit — a resize of the browser window or a font swap that reflows the window — at the threshold where the page's scrollbar comes or goes; unverified in the game. The consequence, if reached, is severe; its likelihood is low. A cheap guard: defer the work of the callback to the next frame (`requestAnimationFrame`) or skip writing `min-height` when the value does not change.

**M2. The window sets itself off little from the area under it.** Its look is `panel` with a frame in `divider` (`src/browser/program-panel.css`, the window's rule; styleguide rule "The window of a rule and of a rule group", „Jak wygląda”), the same as the area of the program it lies on, so in `loop2_09_okno_reguly_1600.png` the window reads as a continuation of the column, and nothing tells the player that rows lie hidden under it. The author named this as a concern; a stronger frame or a shadow needs a value the token file lacks, which only the human may settle (`src/browser/AGENTS.md`). For the human at the request, against the acceptance criterion.

**M3. `RulePanelView` grows from 161 to 184 lines of the 200 a function may hold** (`src/browser/view/rule-panel.tsx:622`), and `src/browser/view/rule-panel.tsx` from 663 to 691 counted lines (of 800). Below the thresholds of D-425, so Minor; the next addition to the window will need a move first. (`ProgramPanelView` fell from 194 to 159 by the move to `program-naming.ts`.)

**M4. A sentence of D-306's *Verification* is held more broadly than its test checks.** D-306 (`foundations/decisions.md:10049-10050`) lists "a rule moved to another group … by „↓” of its window … the window staying open on the same field under its new row"; the test „„↑” and „↓” of the window of a rule move it one place …” (`tests/view/rule-window.test.mjs:331`) checks the heading, the place under the new row and the focus, not the field. Add the field to the test or leave "on the same field" to the existing row-arrow test.

**M5. The end-of-run window over an open window of a rule was not checked in a browser.** D-311's *Verification* lists for the agent "the window of a rule open before a death standing as it was once the end-of-run window is closed"; the author left it unchecked with a reason (reaching an end takes playing or composing). I read the code path: the areas are `hidden`, the panel's state is kept, and `useCoverBelow` re-reads the boxes when the window's size goes to zero and back, so I expect it to hold; still an unverified check of the request.

**M6. "window" has two meanings in the changed entries and no glossary entry for the window of a rule.** D-288 uses "window" for the browser window ("a window 1280 px wide", rationale) and for the window of a rule in the same entry; the glossary (`foundations/glossary.md`) has no entry for the window of a rule. No sentence I read is read wrongly for it, so Minor (WAY-297).

## Coverage of the task

| Item | Met by | Verdict |
|---|---|---|
| To do 1 (window in place of the panel; header/row/„+ reguła”/„Dodaj regułę z tym” open it; closes when its rule or group goes or another program is shown; follows a moved rule) | `rule-panel.tsx`, `rule-window.tsx`, the unchanged opening and seat logic of `program-panel.tsx` / `rule-list.tsx` (one portal host moved between seats) | met |
| To do 2 (over the program column / editor / screen width; world visible; run goes on; as tall as its content under its row; rows above/below in reach; covered rows out of keyboard and mouse; folded group; hidden with the end-of-run window; closes at the question) | CSS `position: absolute` from the seat, areas `position: relative`; `useCoverBelow` (`inert`, `min-height`); question handling in `program-panel.tsx:673-681` | met, but see finding 1 for the header in the phone layout; M5 unverified in browser |
| To do 3 (pick commits and moves on; stays open; ✕/Escape; focus; closing confirms number; number kept at 16×) | `close()` blurs a focused input first; existing test at `tests/view/program-panel.test.mjs:1060` passes | met |
| To do 4 (headings, sentence, saved name, empty name) | `ruleWindowHeading`, `GROUP_CONDITION_SENTENCE`; test `rule-window.test.mjs:166` | met (a name of spaces alone counted empty — reasonable) |
| To do 5 (phone: rows/headers without arrows and deletion, „▾” stays, thin line; computer unchanged, window without them; bar at the bottom with a line; „Usuń z regułami” destructive) | phone block of `program-panel.css`, `RuleWindowBar` | met, except finding 1 (a strip of the header beside „▾” folds) |
| To do 6 (readable, fits at 1280 × 720 and 360 px, 48 px targets) | author's measurement; my measurement of header and „▾” at 360 px (48 × 48) | met as claimed; finding 1 is about where a tap lands, not size |
| To do 7 (comparison of screenshots, departures named) | author's report: three old screenshots and eight loop2 screenshots in `mariusznazar/screenshots`, departures listed | met for the report; the request's description is the cycle's later step |
| To do 8 (styleguide: new window rule; "Program editor"; touch rule; end-of-run window sentence) | `guidelines/styleguide-browser-view.md` | met |
| To do 9 (decisions say what the editor does; tests quote the new wording) | D-288, D-296, D-306, D-311, D-350, D-124, D-313, D-44; quotations in six test files; `foundation_check.py` 0 errors | met; D-296 is contradicted by the code in finding 1 |
| Acceptance criterion (Mariusz does not point at the old Loop as better) | the human's judgement at the request | not judgeable here; M2 bears on it |
| Questions carried to cycle (backdrop, `aria-modal`, focus) | no backdrop, no `aria-modal`, no trap, Escape on the root, `role="dialog"` with `aria-labelledby`; the departures (a layer over part of the list; focus on the field, not the root) written into the styleguide | met |
| Settlements 1, 3, 10 (D-288) | D-288 paragraphs 2 and 3 | met |
| Settlement 2 (D-311) | D-311 | met |
| Settlement 4 (D-296) | D-296 | written; code contradicts its kept sentence (finding 1) |
| Settlement 5 (styleguide thin line) | "Program editor"; CSS `border-top` in `divider` | met |
| Settlement 6 (D-350) | D-350 | met |
| Settlement 7 (headings and sentence in code with a test) | `rule-window.tsx` and its first test | met |
| Settlement 8 (D-124) | D-124 | met |
| Settlement 9 (D-313) | D-313 sentence and rationale | met |
| Settlement 11 (D-44) | D-44 and the styleguide list of destructive buttons | met |
| Settlement 12 (styleguide bar) | the new styleguide rule | met |

Each changed decision carries in its *Rejected* the ways not chosen that the task's sources keep (D-288: questions 1 b–d, 9 a and c, 4 b and c; D-311: question 2 b and c; D-296 and D-44: the vetoes of D4; D-306: question 3 b; D-350: the veto of row 6). The changed invariant tests: none.

## Declined to judge

- The *Rationale* of D-166 („the panel of a rule opens in place under its row (D-288)”): D-288 now says that where another entry names the rule panel it is the window, and the window does stand under its row, so the sentence stays true; no finding.

## Checks run

- `git rev-parse HEAD`, `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` — head and pin as given.
- `python -B .the-way/task-cycle/change_file_sizes.py a566f5d5… f124f5f4…` (reviewed worktree) — exit 0; +1124 lines over 16 files.
- `npm test -- tests/quality/test_function_and_file_size.py` in a worktree of the base — exit 0 (2 tests, OK); in a worktree of the head — exit 0 (2 tests, OK). Nothing over a threshold at either; the invariant is not marked violated.
- A one-off ESLint run with the two size rules at lower limits on the touched view files, in both worktrees — for the numbers of M3.
- In the head worktree, `npm test -- <file>`, each exit 0: `tests/view/rule-window.test.mjs`, `rule-editor`, `program-panel`, `program-editor`, `run-screen`, `account-screen`, `item-verb-panel`, `group-arrows`, `discovery-rule`, `end-window-game`.
- `npm run typecheck` (head worktree) — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) — exit 0, "0 errors".
- `python -B .the-way/instruction-files/check_instructions.py` (reviewed worktree) — exit 0, "0 error, 0 warn, 122 info".
- Manual, in the running game (`npm run local` from the head worktree, Playwright CLI 0.1.22, Chromium, account at `example.test`): finding 1 (touch taps through the browser protocol at 360 × 740, controls at the header's centre and with the mouse); M1 in-game transition at 1600 × 720 on Programy with the window on rule 1.13 (no error). The browser was opened with Chromium's `--hide-scrollbars` default removed, so that scrollbars take space as on Windows.
- Manual probe page for M1 (described there) — the error appeared only when the callback removed the scrollbar.
- Author's screenshots looked at: `loop2_09_okno_reguly_1600.png`, `loop2_lista_regul_360.png`, `loop2_okno_grupy_360.png`, `loop2_okno_reguly_360.png`.
- Not run: the full gate (`npm test` with no file) — the cycle's own run before the request; Firefox, Edge and a real phone.

## Reaches beyond the selection

- `src/browser/view/rule-list.tsx` (header buttons, `clickedBare`, `Gap`, the portal host of the panel) — to judge the phone header and the move of the window between seats.
- `src/browser/view/programs-entry.ts`, `run-screen.tsx` (which element is the positioned area) — for the window's width and D-421.
- `.claude/skills/loop2-play/SKILL.md` — to run the game; `the author's private rules file for writing scripts` — before writing the probe scripts.

## Working copies

All stood in `.runs/review-whole/`: the decision index and section list, the styleguide and test word diffs, two worktrees (`base` at `a566f5d5`, `head` at `f124f5f4`, each with a junction to the worktree's `node_modules`), the size script, the probe page and the Playwright scripts, the downloaded screenshots, the local start's log and database (inside the `head` worktree), Playwright CLI's `.playwright-cli/` files. The local start was stopped, the browser closed, both worktrees removed with `git worktree remove --force` and `git worktree prune`, and every file removed. Remainder: the empty directory `.runs/review-whole`, which Windows reported as held by another process (most likely the Playwright CLI daemon started there); it holds no file. The reviewed worktree's files, index and branch were not changed (`git status --short` empty).

## Unread material

16 decisions of the index of my selection read whole: D-288, D-296, D-306, D-311, D-350, D-124, D-313, D-44, D-302, D-166, D-370, D-267, D-421, D-425, D-342, D-88. The index (`--section` "Program editor", "Rule panel and the signs of a rule", "Screen of a map run and the end-of-run window", "Look of the browser view: …", `--part browser-view`, and `--decision` for the decisions in play and those the altered tests quote) listed 76 in full and 224 by heading; the rest were read as the index gives them (binding sentences), the headings outside the sections run through once.

- Decisions bearing on the change read only as the index gives them, not whole: D-308, D-303, D-282, D-290, D-304, D-396, D-418, D-419, D-173, D-324, D-371 (no *Rationale* or *Rejected* read; none of them is changed by the task).
- Invariants of `browser-view` and `every`: 14 read whole (browser-view-framework, content-identifiers, eslint-source-rules, prettier-source-format, browser-view-token-values, browser-view-focus-outline, streak-program-change, saved-program-edit, copy-save, document-test-memory-limit, rule-state-from-pick, cross-part-imports, function-and-file-size, node-test-selection); the other 47 matched only by heading and *Part*.
- Glossary: searched for "window", "rule panel", "program editor", "rule group"; no entry read whole.
- Guideline files read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (its new rule read from the diff, the rest from the file). Not read: `guidelines/coding-browser-api-client.md` (its kind does not match the work).
- Part map: the entry `browser-view` read whole.
- Code not read: `src/browser/view/rule-drag.ts`, `discovery-rule.ts`, `end-window.tsx` (unchanged); the changed test files other than `rule-window.test.mjs` read as their diffs only.

## Searches not found or unclear

- Whether the remaining `ResizeObserver` path of M1 (a size change of the window without a React commit at the scrollbar threshold) is reachable in the game: not reproduced; the probe shows the mechanism only.
- Headless Chromium hides scrollbars by default (`--hide-scrollbars`); a check of anything that depends on a classic scrollbar needs that argument removed, which the skill `loop2-play` does not say.
