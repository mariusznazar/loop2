PASS 46e572174b32814af91fe17f3405d4383392caee

# Review of the whole change — loop2: dokończyć przejście widoku na React

- Range: `d850f76063c1f7a302b89d0b89e1fca72682be6d..46e572174b32814af91fe17f3405d4383392caee` (20 commits). `git rev-parse HEAD` = `46e572174b32814af91fe17f3405d4383392caee`, the head given. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink.
- Method: `.the-way/task-cycle/review/SKILL.md` with `whole_change.md`.
- Result: no Critical and no Important finding. 4 Minor findings of this review, all within the task, plus the 2 Minor findings carried from the review of slice 1. No out-of-scope finding.

## Findings

### Critical

None.

### Important

None.

### Minor (this review; each lies within the task)

**m1 — No repository test holds the focus on „Spróbuj ponownie” at each refusal, or that the button stays the same element across a retry.** Slice 8 (`5c4ce66b`); the gap was already there before the change.
Place: `src/browser/view/app.ts:411-412` (`draw` calls `waitingScreen.focusRetry()` at every entry into `refused`), `src/browser/view/waiting-screen.tsx:63-83` (the fixed slot that keeps the button one element), `tests/view/account-screen.test.mjs` (no `activeElement` assertion on the retry button; `grep -n activeElement` finds none for it).
Why it matters: To do 2 asks for "the same … focus as today", and spec Decision 3 (with finding F4 of the spec's review) asks for focus at every entry into `refused`, a refusal after retrying included. This is the one place where the slice rebuilt keyboard behaviour by hand, and the executor showed that both mutations pass the repository's tests: `focusRetry` taken out of `draw`, and a button remounted between `refused` and `retrying` (`reports/executor-8-report.md`, "Mutation in the head").
Evidence the behaviour holds now: I ran the executor's throwaway check against the head (`node --test .runs/review-whole/waiting-check.test.mjs`, exit 0, 1 pass). It covers focus at the first refusal, the same element disabled while it reads „Sprawdzanie…”, the same element at rest after a refusal that follows a retry, and focus back on it. The executor saw the same in a real browser.
It is Minor because the requirement is met and the spec's Decision 7 asks for no such case; a regression would go unseen. Fix: one case in `tests/view/account-screen.test.mjs` with those four assertions, which is what the executor recommended.

**m2 — Slice 7 changes two edge transitions of the page with no test, against the slice's "every behaviour the page has today stays".** Slice 7 (`db8f0f3f`).
I compared the page before it (`git show d850f760:src/browser/view/app.ts`) with the head, transition by transition. The four changes the orchestrator carried judge as follows:
1. *A card created before the card it replaces is closed* (`app.ts:437-456`; before, `showPage()` closed it first). Only the ending „changed” of the reset card reaches this (`showReset` → `showForms` → `placeCard`). `release` disposes the old card before `draw` appends the new one, so the two never stand in the page together. The closing still happens inside the old card's handler of an answer, never while it is drawn, and focus moves after it. D-381 binds what the page opens, focuses and closes, not the order of creating and closing, so it does not forbid this. No behaviour the player can see changes.
2. *After an error nothing handled, a reset that succeeds closes the game that stood* (`app.ts:529-533`; `change` → `release` disposes the view). Before, the old game stayed in its variable, out of `main`, and kept saving. The bar also kept the game's items and „Wyloguj” over a waiting screen, against D-280 ("the game's name, which stands alone on the waiting screens (D-262)"). After the 204, the server holds no saved game state (D-402). A save of the old game is then refused (D-209), and the resulting conflict ends at the same waiting screen. In one case the old saving does harm: a game on revision 0 would write a save the player had just asked to start from zero over. The invariant `uncaught-failure-game-state` ("every save the page sends carries the game state as it stood before the error") is not broken, since sending none breaks no sentence of it. D-323's "saving goes on" speaks of the game that stands, and D-402 says the reset replaces that game. Not forbidden; arguably more correct.
3. *A saver outcome of the game built by a reset, arriving while the old game's logout still waits, acts at once* (`app.ts:508-522`, where the held outcome now lives in each game's `logout`). Before, the global `loggingOut` deferred it, and the old logout's uncertain answer then dropped it at `if (game !== view) return`. The new game's conflict or missing session was lost, so it never reloaded and never expired. D-402 holds only the *old* game's outcomes while the reset waits, which the code still does (`app.ts:511-515`, `:768-770`). Not forbidden; it repairs a lost outcome.
4. *The bar redrawn only when its props differ* (`app.ts:182-193`, `:405-409`). `sameBarProps` compares every field of `MenuBarProps` (`menu-bar.tsx:35-56`). The registry tells a new `ScreenPlace` object at each change of place (`screen-registry.ts:173-185`), and the bar's update is a pure function of its props. No requirement is affected.

None of the four goes against a requirement, a decision or an invariant. Changes 2 and 3 alter behaviour, though, and no case holds them (the executor searched `uncaught-failure.test.mjs` and `previous-save.test.mjs`; I found none either). Fix: a case for each in `uncaught-failure.test.mjs` and `previous-save.test.mjs`, or at least name both in the request as behaviour the change alters.

**m3 — A comment of the stylesheet still speaks of two forms of the button.** Comes from no slice: the plan keeps `src/browser/styles.css` unchanged, and the search of slice 13 covered `guidelines/` only.
Place: `src/browser/styles.css:429`: "One rule for both forms, which carry the class." The line came in with `3afd4244` and meant the DOM and the React form of the destructive button. After slice 12 the button has one form (D-265), so the sentence is untrue. A reader would look for a second form. Fix: drop the sentence, or say "the React button carries the class".

**m4 — The guideline says the page (`app.ts`) builds the hosts of the roots and the panel of a card taken down; the code builds both elsewhere.** Slice 13 (`46e57217`), which follows the wording of spec Decision 8.
Place: `guidelines/coding-browser-module.md:197-201`: "Strona (`src/browser/view/app.ts`) buduje przez nie tylko miejsca, w których montują się korzenie Reacta — nagłówek, blok główny i hosty korzeni — oraz panel, który staje w miejscu karty zdjętej przez React". Also `:348-349`: "Strona buduje przez API DOM tylko nagłówek, blok główny i panel w miejscu zdjętej karty". In the code, `app.ts` creates only `<header>` and `<main>` (`app.ts:253`, `:264`). Each host is created by its factory (`waiting-screen.tsx:92`, `page-sentences.tsx:85`, `header-rows.tsx:35`, `:72`, `menu-bar.tsx:335`). The panel is built by `createFailureCard` in `account-card.tsx:674-683`. A reader who follows the rule to `app.ts` does not find the panel there. The rule's point, that only places and the panel are built by hand, stays true. Fix: "the page and the factories of its roots build by hand only …; the panel is built by `createFailureCard` in `account-card.tsx`".

### Minor carried from the review of slice 1 (graded again here; both already queued for the return step)

- **M1 (slice 1 review) — D-276 *Rejected* still says "in both forms of the control (D-265)".** `foundations/decisions.md:4899`. Still true at the head. Minor, within the task.
- **M2 (slice 1 review) — D-264 *Rationale* still speaks of "the screens still in DOM".** `foundations/decisions.md:1252`. After slices 8–10 no screen is built in DOM. Minor, within the task.

The handoff asks that these two not be counted as findings of this review. The method has this review grade them, so they stand here graded Minor and are kept apart from m1–m4. I found no other foundation entry that the change makes untrue. I searched `foundations/` for "both forms", "DOM form", "two forms", "in DOM", "still in DOM", `app.ts`, `createConfirmationNotice`, "bundles nothing", "one by one" and "built by hand"; the remaining hits are the two above, D-259's two forms of the card, and D-265/D-269 describing the rejected ways.

## The carried material, point by point

1. Slice 7: see m2. None of the four changes is forbidden. Changes 2 and 3 lack a test.
2. Slice 8: see m1. A test is wanted. Its absence is Minor, since the behaviour holds (checked).
3. Slice 9: the three sentences the local start could not bring about are held by the account screen's tests. These all passed at the head (`npm test -- tests/view/account-screen.test.mjs`, 131 pass): the confirmation in `positive` (`:1341-1349`, rewritten by slice 3: first shown sentence of `<main>`, before the game, the game shown), the refused load in `page-notice` (`:3359-3371`), and the sentence after „Zacznij od zera” (previous-save tests, 44 pass). By the code, `page-sentences.tsx:32-47` gives `positive` → `role="status"`, `warning` → `role="alert"`, both with `confirmation-notice` and the role's class, and a refused load → `page-notice` with `role="alert"`. That is the tree `createConfirmationNotice` and `createPageNotice` built (`git show d850f760:src/browser/view/email-confirmation.ts`). `app.ts:562-568` puts the notice first and the refused load after it, as before. No real-browser check of these three: see "Checks not run".
4. Slice 10: the case "an error in the drawing of the waiting screen's root or of the sentences' root …" (`tests/view/uncaught-failure.test.mjs:964-1032`) passed on the old code. That is expected, because the old row depended on no root. It guards the design: the executor made `show()` a no-op and six cases failed. Both variants really take their root down: the `{}` message is no valid React child. Whether a screen reader announces an alert host turning from hidden to shown is not checked, here or by the executor. Spec Decision 1 accepts it as an assumption with a fallback; see "Checks not run".
5. Slice 12: case by case, I compared the 49 cases of the deleted `tests/view/react-controls.test.mjs` (`git show d850f760:…`) with the 49 of `tests/view/shared-controls.test.mjs`. Each case protecting a behaviour or attribute of the React form has its place:
   - plain, `aria-label`, submit (`:58`, `:70`, `:87`);
   - the kinds `destructive`, `positive`, `main`, `secondary` (table at `:105-151`);
   - selected and not selected (`:153`);
   - tab selected, not selected, and a click with `aria-pressed` (`:180`, `:202`, `:223`);
   - `aria-expanded` given true or false, and not given (`:259`);
   - the waiting submit button and stopping waiting (`:290`);
   - locked with its text, for plain, selected, secondary, main and both tabs (table at `:325-380`);
   - the click, waiting or locked (`:382`);
   - the text, password and address fields, and the field locked (`:423-512`);
   - the error message pointed at, and leaving the error state (`:514`, `:540`);
   - typed value (`:567`); warning, note, warning cleared (`:594`, `:620`, `:642`);
   - pick cell available, chosen, greyed with reason, chosen and greyed, icon, greyed giving no pick (`:664-818`);
   - select list with positions, empty, disabled, choice (`:820-946`);
   - the number field's tree, error and disabled (`:948-1003`), ten renders, props only without focus, clamp, the screen's rule, and the trip count rule (`:1005-1178`).

   The cases that went are comparisons of the two forms, or DOM-only setters: "a button whose open state is set on the DOM form", "a pick cell chosen in place" (`setPickCellChosen`), and "a button that stopped waiting is the same element as one that never waited", whose React half is now in `:290`. The *Verification* lines that said "both forms" each have a case on the React form:
   - D-44 (a waiting submit button disabled): `:290`.
   - D-275 (a secondary action with the class `secondary`): the `secondary` row of the kind table, and the locked row.
   - D-276 (a tab, `aria-pressed`, keyboard of the button): `:180`, `:202`, `:223`, and the two tab rows of the locked table.
6. Slice 4: the two removed assertions are the two of M-4 of request #62 (`git show 905c1ab8:docs/task-cycles/napis-o-awarii/request.md`, *Minor findings* 4). They are the count of live intervals "the clock no longer ticks", with its precondition "the game runs" that prepared only it, and `warning.mock.callCount() === 1`. The case still protects the behaviour: the tick after the error, now an explicit assertion "a tick after the error reads no clock" (`uncaught-failure.test.mjs:395-401`); no save after time and acts; and „Wyloguj” sending the state from before the error. A clock still read after the error would throw the faulty reading's `TypeError` from `mock.timers.tick` and fail the new assertion. An implementation that keeps its interval and reads nothing passes, which is what M-4 asked. **Changed invariant test, named:** the case of `uncaught-failure-game-state` ("after an error nothing handled, in the clock's own reading, the game state stays as it was and every save sends the state from before the error"). Its other steps are unchanged.
7. Slice 13: each of the three points follows the change and settles no new meaning.
   - The renamed headings ("w jednej postaci", "z Reactem", "Kontrolki i ich aktualizacja") replace headings that had become untrue. No other file names them, and the executor's search confirms this.
   - D-407 on "Nowy ekran i moduły w DOM" and D-265 on "States of shared controls": each rule now states what that entry binds.
   - The `copy` sentence for `controls/` replaces "in both forms" with "one React component", as D-265 gives. No status of the table changes, which keeps question 4 a ("poprawia reguły", the statuses stay). The sentence "Plik dodany po ostatnim audycie tabeli nie ma w niej wiersza" widens the old "plik budujący elementy przez API DOM …" to any file. That matches the coding template's rule for a file added after the audit (WAY-200), not a new meaning.
   - The rewritten example "Kontrolki i ich aktualizacja" and the new paragraph of "Gra na stronie" match the code, except m4.
8. Slice 2 and the kitchen-sink page: checked in a real browser at the head (see Checks). The sample of the empty number field shows `""`, and the other five read `12`, `12`, `12`, `12` and `120`. Each of the 15 focus samples draws a `solid` outline on the control itself, never on the wrapper and never on the `tabs` container. The hover samples draw `rgb(39, 39, 42)` = `--highlight` (`#27272a`), except the secondary action, which keeps `transparent`. The destructive button reads `rgb(255, 100, 103)`. The console holds no report of React, only the favicon 404, React DevTools' info and Chrome's verbose password-field hints. `kitchen-sink.css` keeps one outline rule with exactly two selectors, and its invariant test passes. The empty-state typing is in the entry module, outside React, after the first `flushSync` draw, with a comment that names the technique (`kitchen-sink.tsx:1034-1064`), as settlement N1 asks. The page imports, beyond its module, only modules the game uses.
9. Foundation entries: see above. D-03, D-44, D-265, D-269, D-275, D-276, D-323, D-381 and D-407 say what the code does. D-269's first clause, which slice 1's review declined to judge, now holds. D-407's precision (three roots; the failure row drawn at the start, hidden, shown without a render) is what `header-rows.tsx:34-52`, `app.ts:259-262` and `:310-315` do. D-265's second paragraph is `react-text-field.tsx:96-123` with `account-card.tsx:674-683`.
10. Slice 3: its four rewritten assertions keep what they protect, and the six `fire` clicks became `press`. The diff matches spec Decision 7, line by line. No finding.
11. Commit messages: not checked, as the handoff says.

## Coverage of the task

| Item | Met by | Verdict |
|---|---|---|
| To do 1 — page bundled as the game, React forms, same states | slices 1, 2; D-269 | met (checked in a browser at the head) |
| To do 2 — start page, line of saving, confirmation sentence in React, own roots, same texts/roles/places/focus | slices 3, 6, 8, 9, 10; D-407, D-03, D-381 | met; focus held only by a throwaway check (m1) |
| To do 3 — state one value, kept values apart | slice 7 | met; two edge transitions altered (m2) |
| To do 4 — sentence alone at the waiting screen after an error | slice 8; D-323 | met; `assertWaitingWithSentence` holds it |
| To do 5 — DOM forms and comparison test gone, `SelectOption` available | slices 11, 12 | met; no import of a deleted file remains (`git grep`) |
| To do 6 — panel from one constant shared with `ReactFormWarning` | slice 5; D-265 | met; the case asserts `form-warning` and `alert` |
| To do 7 — two assertions test behaviour | slice 4 | met |
| To do 8 — guidelines follow the change | slice 13 | met; m4 |
| Settlement 1 (D-269) | foundation step, slices 1, 2 | met |
| Settlement 2 (D-265) | foundation step, slices 5, 11, 12 | met |
| Settlement 3 (D-407) | foundation step, slices 6, 8, 9, 10 | met |
| Question carried to the cycle | slice 10, D-407 second paragraph | met |

Fidelity to the sources: the task's answers to questions 1–6 are kept. Q1 a: bundled, React forms, no change to the serving lines. Q2 a: separate roots. Q3 b: panel outside React from one constant. Q4 a: rows removed, no new rows, no status changed. Q5 b: `styles.css` untouched. Q6 b: `setQuestion`/`setWindow` untouched. D-262 (header and main hidden at the card), D-323 (sentence once; nothing built after the error), D-381 (card created, focused and closed by the page) and D-407, D-265, D-269 as changed agree with the code.

Trust boundary: `git diff 7c0fda9f..46e57217 -- scripts tsconfig.kitchen-sink.json package.json package-lock.json src/browser/kitchen-sink/index.html tsconfig.browser.json tests/invariants` is empty, so nothing after slice 1 touched the script or the served paths. The script's whole diff is what slice 1's review judged: `out`, `host`, the server block and `openInBrowser` stand as they were. Irreversible operation: none.

Reserved choice: none. `package.json` and `package-lock.json` do not change, and esbuild is settled by D-263.

Structure: there is no size rule in `guidelines/coding.md`, so the invariant test of WAY-361 does not exist. `change_file_sizes.py` gives `app.ts` 695 → 820 lines (+125, the state's types and `change`/`draw`) and `kitchen-sink.tsx` 1064 lines (it replaces the 833-line `.ts`); the new modules are 97–123 lines each. By WAY-363 any finding of structure would be Minor, and I raise none beyond m3. The added code has a user everywhere: `FailureRow.dispose` and `WaitingScreen.dispose` are never called by the page, which lives until reload, as the bar's `dispose` is not called either. That keeps the factory shape the spec asks for.

## Declined to judge

- Whether a screen reader announces the failure row turning from hidden to shown: spec Decision 1 records it as an accepted assumption with a fallback, and no reader is available here. Named, not judged.
- The size of the reading of slice 3 (Q1 of the cycle record): a matter of the plan's choice of class, not of the change.

## Checks run (from the root of the reviewed worktree unless named)

| Check | Command or method | Result |
|---|---|---|
| head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | head as given; pin equal |
| uncaught failure | `npm test -- tests/view/uncaught-failure.test.mjs` | exit 0, 18 pass |
| account screen | `npm test -- tests/view/account-screen.test.mjs` | exit 0, 131 pass |
| shared controls | `npm test -- tests/view/shared-controls.test.mjs` | exit 0, 49 pass |
| saver | `npm test -- tests/view/game-saver.test.mjs` | exit 0, 20 pass |
| previous save | `npm test -- tests/view/previous-save.test.mjs` | exit 0, 44 pass |
| owner panel | `npm test -- tests/view/owner-panel.test.mjs` | exit 0, 4 pass |
| menu bar | `npm test -- tests/view/menu-bar.test.mjs` | exit 0, 32 pass |
| email confirmation | `npm test -- tests/view/email-confirmation.test.mjs` | exit 0, 5 pass |
| state store | `npm test -- tests/view/state-store.test.mjs` | exit 0, 12 pass |
| kitchen-sink build invariant | `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | exit 0, 3 OK |
| focus outline invariant | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | exit 0, 3 OK |
| framework invariant | `npm test -- tests/invariants/test_browser_view_framework.py` | exit 0, 9 OK |
| token values invariant | `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0, 4 OK |
| test selection | `npm test -- tests/quality/test_node_test_selection.py` | exit 0, 1 OK |
| types | `npm run typecheck` | exit 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0, `0 error, 138 warn, 7 info` |
| file sizes | `python -B .the-way/task-cycle/change_file_sizes.py d850f760… 46e57217…` | exit 0; table as above |
| decision index | `python -B .the-way/elements/common/decision_index.py --output .runs/review-whole/index.md --section … --part browser-view --part build-tools --part agent-workflow --part product-foundation --decision …` | exit 0; 61 in full, 257 by heading |
| retry focus (m1) | the executor's throwaway check, copied to `.runs/review-whole/waiting-check.test.mjs`, `node --test` | exit 0, 1 pass |
| kitchen-sink build | `npm run kitchen-sink -- --build-only` | exit 0; `dist/kitchen-sink/` holds the page, stylesheets, static files and the one bundle |
| kitchen-sink in a real browser | page served by `python -m http.server 8791 --bind 127.0.0.1` from `dist/kitchen-sink/`; Playwright MCP opened it, read the computed styles and values, read the console at level debug | as in point 8 |
| trust boundary after slice 1 | `git diff 7c0fda9f..46e57217 -- scripts tsconfig.kitchen-sink.json …` | empty |
| untouched files | `git diff --quiet d850f760..46e57217 -- package.json package-lock.json src/browser/styles.css src/browser/index.html src/browser/view/menu-bar.tsx src/browser/view/last-resort.ts tests/invariants` | exit 0 |
| leftovers of deleted names | `git grep -n -e "controls/button" … -e "react-controls" -e "createFormWarning" -e "setButtonWaiting" -e "createButton\b" -e "createConfirmationNotice" -e "createPageNotice" -- . ':!foundations'` | no hit |
| stale "two forms" wording | `git grep -n -i -e "both forms" -e "DOM form" -e "two forms" -e "still in DOM" -e "in DOM" … -- foundations guidelines src tests …` | M1, M2 (slice 1), m3 |

**Checks not run:**
- A real-browser check of the `positive` sentence, the refused-load sentence and the sentence after „Zacznij od zera” above the game. The local start grants no privilege to a new account, and the slice-9 executor found the same. These are held by the jsdom cases above.
- A screen reader on the failure row: none available.
- A mutation of the product to watch the slice-4 tick assertion fail: not run. The assertion's force is reasoned from the faulty clock reading.
- The whole `npm test`: the orchestrator's alone.

## Reaches beyond the dispatch

- `git show 905c1ab8:docs/task-cycles/napis-o-awarii/request.md`: to match the two removed assertions with M-4 (point 6).
- `src/browser/view/screen-registry.ts:113-185` and `src/browser/view/menu-bar.tsx:34-70`, `:330-370`: to judge the bar's redraw by props (m2, change 4).
- `src/browser/styles.css:1-12`, `:44-60`, `:176-240`, `:420-440`, `:628-662`: the hosts' boxes, the `[hidden]` rule and the stale comment (m3).
- `git log -L429,429:src/browser/styles.css`: the origin of that comment.
- `src/browser/view/controls/react-number-field.tsx:55-140`, `react-text-field.tsx:20-123`: the empty-state typing and the focus selector of the page.
- `reports/executor-8-waiting-check.mjs.txt`: run as a check (m1).

## Working copies

- `.runs/review-whole/` held the decision index and the list of sections, the logs of the checks, two string lists of the old and new kitchen-sink page, and the copy of the executor's waiting check. Removed before returning; nothing of it is needed beside this report.
- The page server (`python -m http.server`, port 8791 on 127.0.0.1) was stopped; the port no longer listens.
- Playwright MCP wrote `the main checkout's .playwright-mcp/console-2026-11-16T08-17-12-986Z.log` and `page-2026-11-16T08-17-13-430Z.yml` in the main checkout's root. Both were deleted with the then-empty directory, and the browser page was closed. No screenshot was taken.
- `dist/` (the product's own build output, ignored by git) stays, as the product's tools leave it.
- The reviewed worktree is unchanged (`git status --short` empty).

## Unread material

- **Decisions:** of the 61 listed in full in the index of my selection, I read 2 whole from the file: D-265 and D-269. The other 59 I read by their binding sentences and *Scope* in the index. Of the changed entries, D-03, D-44, D-275, D-276, D-323, D-381 and D-407 I read through the index and the full word diff of the range, which shows every changed passage. Their unchanged *Rejected* and *Relations* (except D-407 *Rejected* and D-276 *Rejected*, read in the diff) were not read. I ran through the questions of the 257 decisions outside the topic sections and opened none whole. D-352, D-213, D-207, D-210 and D-157 bear on the change, and their statements were not read; the code of the change does not reach the parts they govern beyond what the tests hold.
- Decisions that bear on the change and stayed unread whole: D-323, D-407, D-381, D-03, D-44, D-275, D-276 (as above), D-402, D-97, D-96, D-208, D-209, D-211, D-262, D-264, D-36, D-253 (binding sentences only).
- Invariants read whole: `uncaught-failure-game-state`, `browser-view-framework`, `browser-view-token-values`, `browser-view-focus-outline`, `application-build-kitchen-sink`, `preview-server-access`. Part map: `browser-view`, `build-tools`, `agent-workflow`, `product-foundation` read whole. Glossary: not read; no term of the change was looked up.
- Guidelines:
  - `guidelines/coding.md`: lines 1-245 (all rules); its examples 246-332 not read.
  - `guidelines/coding-browser-module.md`: read through the full diff of the range, not whole.
  - `guidelines/styleguide-browser-view.md`: read through the full diff, not whole.
  - `guidelines/testing.md`: lines 41-152 and 295-349; the rest, *Trust boundaries*, *Mutation testing* and the recipes among it, not read.
  - `src/browser/AGENTS.md`: not read.
  - `.the-way/product-guidelines/template.md` and the coding and styleguide templates: not read. For the form of the guideline files I relied on `foundation_check.py` (exit 0) and on the unchanged shape of the rules.
  - `.the-way/project-level/technology/reserved_choices.md`: not read. No dependency, language, framework or store changed.
- Reports: I read whole those of slice 1's review and of the executors of slices 2, 7, 8, 10 and 13. Of slices 4, 9 and 12 I read the own-work sections, and of the foundation entries the entries and the search sections. The reports of slices 3, 5, 6 and 11, `designer-report.md`, `designer-report-2.md`, `spec-reviewer-report-2.md` and `planner-report.md` were not read. Of `spec-reviewer-report.md`, only F4, F5 and the searches were read.
- Code: `kitchen-sink.tsx`, `app.ts`, `waiting-screen.tsx`, `page-sentences.tsx` and `header-rows.tsx` read whole; the rest of the range read through its diff.

## Searches not found or unclear

- A repository test asserting focus on „Spróbuj ponownie”: none (m1).
- A case for a reset that succeeds after an error, and for a new game's saver outcome during the old game's logout: none (m2).
- The handoff states the foundation check two ways ("red until slice 12" and "exits 0 now"). At the head it exits 0.
- The decision index script takes numbers as `D-03`, not `3` or `03`; found by trial.
