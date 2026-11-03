# Plan — Wygląd głównego przycisku i zakładek w wytycznych oraz na karcie logowania

- Task: `.runs/task-cycles/przyciski-i-zakladki/task.md`
- Spec: none
- Base: `799d1ffc899fe631ddc03381302ede7d94f49df5`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — the main button is the button that sends a form, one per form, framed in the colour of its strong text, unfilled; actions outside forms are not covered | decision | *Settlements to record*, row 1 (pytania 1, 1a, 1b) | Slice 1 · Slice 2 · Slice 3 · Slice 4 |
| Row 2 — an action that opens or leaves a state of a form and stands under it is underlined text without a frame; the rest of the game keeps plain buttons | decision | *Settlements to record*, row 2 (pytania 1, 1a, 1b) | Slice 1 · Slice 2 · Slice 3 · Slice 4 |
| Row 3 — the tab is a variant of the button selected in its group: a line at its bottom shows the choice, keyboard handling stays the button's | decision | *Settlements to record*, row 3 (pytania 2, 2a, 2c) | Slice 1 · Slice 2 · Slice 3 · Slice 4 |
| Row 4 — the current position of the menu bar is marked by the same strong text and bottom line as the tab | decision | *Settlements to record*, row 4 (pytanie 2b) | Slice 4 |
| Row 5 — the login card has a fixed top edge at 15% of the window's height, not the exact middle | decision | *Settlements to record*, row 5 (pytanie 4) | Slice 2 |
| Row 6 — the sentence after a request for a password-reset link stands in `text` with a bar on its left, never in green | decision | *Settlements to record*, row 6 (pytanie 3) | Slice 1 · Slice 3 · Slice 4 |
| Row 7 — a new screen is not built on the pattern of the DOM modules; their pure functions may be imported, and an addition to a screen still in DOM may be made in DOM | decision | *Settlements to record*, row 7 (pytania 5, 5b) | Slice 5 |
| Row 8 — a line at a text takes that text's colour, so a frame or bar is part of the text and does not change its role's meaning | decision | *Settlements to record*, row 8 (pytanie 3b) | Slice 1 · Slice 4 |
| D-44 changed — the secondary action on the list of shared controls; the answer to a request for a password-reset link no longer in `text-secondary` | decision (change) | *To do* 11; pytania 1, 3 | Slice 1 · Slice 2 · Slice 3 · Slice 4 |
| D-222 changed — the answer to a request for a password-reset link no longer in `text-secondary` | decision (change) | *To do* 11; pytanie 3 | Slice 1 · Slice 3 · Slice 4 |
| D-40 changed — the example in *Verification*: the choice of a tab shown by the line | decision (change) | *To do* 11; pytania 2, 3b | Slice 4 |
| D-265 changed — the rule on a new screen | decision (change) | *To do* 11; pytania 5, 5b | Slice 5 |

The entries are written by the agent of the plan's *Foundation entries* through
`the-way-record-decision`, as `.the-way/task-cycle/skill/foundation_step.md` gives, before slice 1.
The task carries no projected entry to write (pytanie 6) and names no invariant, environment fact,
glossary term or part-map change.

## Slices

### Slice 1 — shared controls and their look

- **Goal:** The shared controls of `src/browser/view/controls/` hold, in both forms (the DOM function and the React component, D-265), the secondary action as a further kind of the shared button — a `<button>` that is not the one sending its form — and the tab as a variant of the button selected in its group, keeping the same element and `aria-pressed`; `tests/view/react-controls.test.mjs` has cases comparing the two forms for the secondary action at rest and locked, and for the tab selected, not selected and locked, written first and failing until both forms agree. `src/browser/styles.css` draws, from existing design tokens only: the main look on the button that sends a form, recognised by its existing `type="submit"` with no new option (pytania 1, 1a: at rest the card's background, text in `text-strong` at `--font-weight-emphasis`, frame in `currentColor`; under the pointer the background `highlight`, frame and text unchanged; while waiting the look every disabled button has today — text in `text-disabled`, normal weight, frame in `control-border`); the secondary action (pytanie 1a: no frame, text in `text-secondary`, underlined, no padding at its sides; under the pointer text in `text`, background unchanged; disabled text in `text-disabled`; focus by the one `:focus-visible` rule); the tab (pytanie 2c: no frame; selected — text in `text-strong` at `--font-weight-emphasis` and a bottom line in `selected` of `--bar-width`; not selected — text in `text-label`; under the pointer the background `highlight`; while the form waits text in `text-disabled` with the line of the choice kept; text in `--font-size-body`) and, through a class a screen sets on the tabs' container, the thin line in `divider` of `--frame-width` under the whole group; and the sentence under a form that refuses nothing (`.form-note`) in `text` with a bar on its left in `currentColor` of `--bar-width` (pytanie 3). Sizes the task does not name stay as the button has them today. The buttons of pace and every other selected button keep today's look of the button selected in its group. The comment at `createFormNote` in `src/browser/view/controls/text-field.ts` no longer promises that the sentence is announced, and says it stands in `text`; the element stays as it is (pytanie 3a). The comments of the changed rules and of `button.ts` describe the looks as they now are. In `src/browser/tokens.css` `--bar-width` keeps 2 px, and its `Source:` covers also the bar of that sentence and the line of the tab, with the source: Mariusz's choice from the preview of the variants of the card, 2026-11-02, in this task (*To do* 7). No new token and no new colour: a value the task does not give is named in the report, never chosen (`src/browser/AGENTS.md`). The login card is not changed in this slice; nothing it shows changes but what these shared rules draw.
- **Change:** `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/text-field.ts` · `tests/view/react-controls.test.mjs` · `src/browser/styles.css` · `src/browser/tokens.css`
- **Read:** `.runs/task-cycles/przyciski-i-zakladki/task.md:17-39` Need and To do · `.runs/task-cycles/przyciski-i-zakladki/task.md:42-104` Questions to settle, pytania 1 to 3a · `.runs/task-cycles/przyciski-i-zakladki/task.md:141-151` Context · `.runs/task-cycles/przyciski-i-zakladki/task.md:210-260` Decisions in play, Settlements to record and Out of scope
  `foundations/decisions.md:676-690` D-28 · `foundations/decisions.md:792-806` D-36 · `foundations/decisions.md:822-836` D-38 · `foundations/decisions.md:837-851` D-39 · `foundations/decisions.md:852-866` D-40 · `foundations/decisions.md:867-881` D-41 · `foundations/decisions.md:882-896` D-42 · `foundations/decisions.md:897-911` D-43 · `foundations/decisions.md:912-926` D-44 · `foundations/decisions.md:957-971` D-47 · `foundations/decisions.md:972-986` D-48 · `foundations/decisions.md:1409-1421` D-73 · `foundations/decisions.md:1461-1475` D-77 · `foundations/decisions.md:1515-1527` D-81 · `foundations/decisions.md:1593-1618` D-87 · D-88 · `foundations/decisions.md:4119-4171` D-222 · `foundations/decisions.md:5395-5457` D-264 · D-265 · `foundations/decisions.md:5486-5559` D-267 · D-268 · `foundations/decisions.md:5586-5614` D-270
  Foundation entries rows 1, 2, 3, 6 and 8, and the changes of D-44 and D-222
  `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:409-418` eslint-source-rules · `foundations/invariants.md:439-448` prettier-source-format · `foundations/invariants.md:459-498` browser-view-token-values · browser-view-focus-outline · design-token-contrast · design-token-sources · `foundations/invariants.md:579-598` node-test-selection · focused-test-execution · `foundations/invariants.md:1189-1198` document-test-memory-limit
  `foundations/part_map.md:3-29` browser-view · `foundations/glossary.md:94-105` unit test · integration test
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  `src/browser/view/controls/react-text-field.tsx` · `src/browser/view/account-card.tsx:201-265` CardForm · `src/browser/view/account-card.tsx:556-627` Card · `tests/view/page-document.mjs` · `src/browser/kitchen-sink/kitchen-sink.css:1-25` the samples of hover and focus
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/react-controls.test.mjs` (the new cases fail before both forms exist, then pass) · `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/invariants/test_design_token_sources.py` · `npm test -- tests/invariants/test_design_token_contrast.py` · `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Foundation entries rows 1, 2, 3, 6, 8 · D-44 changed · D-222 changed

### Slice 2 — the login card on the new controls, and its screenshots

- **Goal:** In `src/browser/view/account-card.tsx` „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” are the secondary action of slice 1 in its React form, still buttons that change the card's state and lock with it (pytanie 1); the switch „Zaloguj się” / „Załóż konto” is two tabs — the variant of the button selected in its group, same element, `aria-pressed`, Tab reaches each, Enter or Space switches, focus goes to the address field (pytanie 2a, D-260) — in a container carrying the class of the tabs' group from slice 1; the button that sends each form keeps `submit` and so takes the main look. In `src/browser/styles.css` the screen of the card (`.account-card-screen`) gives the card a fixed top edge at 15% of the window's height (in `vh`, which is no value in place of a token, D-43) in place of the exact middle, the horizontal layout unchanged, so that unfolding the credits, switching a tab and the sentence appearing under a form move nothing above them; its comment no longer speaks of the middle (pytanie 4, *To do* 5); the rules and comments of `.account-card-switch` and `.account-form-switch` fit the tabs and the secondary action. The cases of `tests/view/account-screen.test.mjs` find the card's controls by element, attribute and text, so they are expected to pass unchanged; one that breaks is a finding for the report, changed only where it breaks for a reason this slice intends and named there as a file beyond *Change*. Then, by `.claude/skills/loop2-play/SKILL.md`, run the game with `npm run local` and save PNG screenshots of the card on the picture of the game at 1280 × 800 into `.runs/task-cycles/przyciski-i-zakladki/screenshots/` (ignored by git; commit nothing of them): each of the four states of D-259 — „Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła”, and „Ustaw nowe hasło” opened by an address with `#reset-password=` — the form „Nie pamiętam hasła” with the answer to a request, „Zaloguj się” with the credits unfolded, a refusal under a form, and keyboard focus on a tab and on a secondary action; name in the report every state not captured and why. Inspect them as the own-work check of the user interface, and measure with the page's layout that the tabs and „Autorzy grafiki” keep their top position between the states and when the credits unfold.
- **Change:** `src/browser/view/account-card.tsx` · `src/browser/styles.css` · `.runs/task-cycles/przyciski-i-zakladki/screenshots/*.png`
- **Read:** `.runs/task-cycles/przyciski-i-zakladki/task.md:17-39` Need and To do · `.runs/task-cycles/przyciski-i-zakladki/task.md:42-110` Questions to settle, pytania 1 to 4 · `.runs/task-cycles/przyciski-i-zakladki/task.md:135-200` pytanie 6b and Context · `.runs/task-cycles/przyciski-i-zakladki/task.md:210-260` Decisions in play, Settlements to record and Out of scope
  `foundations/decisions.md:792-806` D-36 · `foundations/decisions.md:822-836` D-38 · `foundations/decisions.md:837-866` D-39 · D-40 · `foundations/decisions.md:882-926` D-42 · D-43 · D-44 · `foundations/decisions.md:957-986` D-47 · D-48 · `foundations/decisions.md:1409-1421` D-73 · `foundations/decisions.md:1461-1475` D-77 · `foundations/decisions.md:1593-1618` D-87 · D-88 · `foundations/decisions.md:1773-1787` D-96 · `foundations/decisions.md:4119-4171` D-222 · `foundations/decisions.md:4219-4252` D-225 · `foundations/decisions.md:5161-5189` D-254 · `foundations/decisions.md:5281-5375` D-259 · D-260 · D-261 · D-262 · `foundations/decisions.md:5395-5457` D-264 · D-265 · `foundations/decisions.md:5486-5514` D-267 · `foundations/decisions.md:5642-5666` D-272
  Foundation entries rows 1, 2, 3 and 5, and the change of D-44
  `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:409-418` eslint-source-rules · `foundations/invariants.md:439-448` prettier-source-format · `foundations/invariants.md:459-478` browser-view-token-values · browser-view-focus-outline · `foundations/invariants.md:579-598` node-test-selection · focused-test-execution · `foundations/invariants.md:1189-1198` document-test-memory-limit
  `foundations/part_map.md:3-29` browser-view · `foundations/glossary.md:94-105` unit test · integration test
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md`
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` · `tests/view/account-screen.test.mjs:1-160` the page on jsdom and its helpers · `tests/view/account-screen.test.mjs:3384-3620` the login card
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/react-controls.test.mjs` · `npm run typecheck` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/quality/test_quality_invariants.py` · the game by `.claude/skills/loop2-play/SKILL.md` (`npm run local`, Playwright CLI, or Playwright MCP where the CLI fails): the screenshots inspected and the top positions measured, `npm run local:stop` at the end
- **Depends on:** Slice 1 · Foundation entries rows 1, 2, 3, 5 · D-44 changed

### Slice 3 — the kitchen-sink page

- **Goal:** The kitchen-sink page shows in the DOM form of each control (D-269) the main button, the secondary action and the tab, selected and not selected, each in every state of the styleguide's rule "States of shared controls" or with the reason the state does not apply (pytania 1a, 2c: error and empty apply to none of them, as to the button; the main button's loading is its waiting; a state of the secondary action or the tab that does not apply gets its reason in the page's words), and the form „Nie pamiętam hasła” with the answer to a request, which now stands in `text` with its bar (*To do* 9). The page's list of the shared controls no longer says six, and the comment of its form samples no longer says `text-secondary`. `src/browser/kitchen-sink/kitchen-sink.css` draws the hover sample of the secondary action as `styles.css` draws its hover (text in `text`, background unchanged) and of any new look the existing hover sample rule does not reach, from tokens only and with no `outline` outside its one focus rule (D-47). Nothing the page imports reaches a `.tsx` file. Inspect the page in a browser where the tools of `.claude/skills/loop2-play/SKILL.md` stand, served by `npm run kitchen-sink`.
- **Change:** `src/browser/kitchen-sink/kitchen-sink.ts` · `src/browser/kitchen-sink/kitchen-sink.css`
- **Read:** `.runs/task-cycles/przyciski-i-zakladki/task.md:25-39` To do · `.runs/task-cycles/przyciski-i-zakladki/task.md:42-104` Questions to settle, pytania 1 to 3a · `.runs/task-cycles/przyciski-i-zakladki/task.md:210-252` Decisions in play and Settlements to record
  `foundations/decisions.md:822-836` D-38 · `foundations/decisions.md:837-881` D-39 · D-40 · D-41 · `foundations/decisions.md:897-941` D-43 · D-44 · D-45 · `foundations/decisions.md:957-986` D-47 · D-48 · `foundations/decisions.md:4119-4171` D-222 · `foundations/decisions.md:5427-5457` D-265 · `foundations/decisions.md:5560-5585` D-269
  Foundation entries rows 1, 2, 3 and 6, and the changes of D-44 and D-222
  `foundations/invariants.md:409-418` eslint-source-rules · `foundations/invariants.md:439-448` prettier-source-format · `foundations/invariants.md:459-478` browser-view-token-values · browser-view-focus-outline · `foundations/invariants.md:499-508` application-build-kitchen-sink
  `foundations/part_map.md:3-29` browser-view
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md`
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/text-field.ts` · `src/browser/styles.css` · `src/browser/kitchen-sink/index.html` · `scripts/kitchen-sink.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run kitchen-sink -- --build-only` · `npm test -- tests/invariants/test_application_build_kitchen_sink.py` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm run typecheck` · `npm test -- tests/quality/test_quality_invariants.py` · the page inspected in a browser where the tools stand, or named in the report as not inspected
- **Depends on:** Slice 1 · Foundation entries rows 1, 2, 3, 6 · D-44 changed · D-222 changed

### Slice 4 — the styleguide of the browser view

- **Goal:** Through `the-way-maintain-styleguide`, as the cycle's author writes a styleguide's file by `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`, `guidelines/styleguide-browser-view.md` gains the main button, the secondary action and the tab: their look, their states and where they apply (pytania 1b, 2b: the main look only on the button that sends a form; text only for actions that open or leave a state of a form and stand under it; the tab a look of the button selected in its group, keyboard as the button's); the mark of the current position of a menu bar (pytanie 2b); the principle of pytanie 3b, that a line at a text takes that text's colour; and entries on its list of controls departing from the states for the secondary action and the tab, by their paths. The sentence after a request for a password-reset link stands there in `text` with its bar, and every wording that gives it `text-secondary` goes — in the rules "States of shared controls" and "The kitchen-sink page" included. Each changed rule cites its decisions, the entries of the plan's *Foundation entries* among them. The rule set keeps the nine required rules in the template's order (D-38). The task's deliberate audit covered the card alone (task, *Context*); no other screen is audited.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/przyciski-i-zakladki/task.md:15-139` Description and Questions to settle · `.runs/task-cycles/przyciski-i-zakladki/task.md:141-200` Context · `.runs/task-cycles/przyciski-i-zakladki/task.md:210-260` Decisions in play, Settlements to record and Out of scope
  `foundations/decisions.md:822-866` D-38 · D-39 · D-40 · `foundations/decisions.md:882-941` D-42 · D-43 · D-44 · D-45 · `foundations/decisions.md:957-986` D-47 · D-48 · `foundations/decisions.md:4119-4171` D-222 · `foundations/decisions.md:5281-5328` D-259 · D-260 · `foundations/decisions.md:5427-5457` D-265 · `foundations/decisions.md:5560-5585` D-269
  Foundation entries rows 1 to 4, 6 and 8, and the changes of D-44, D-222 and D-40
  `foundations/invariants.md:459-508` browser-view-token-values · browser-view-focus-outline · design-token-contrast · design-token-sources · application-build-kitchen-sink
  `foundations/part_map.md:3-29` browser-view · `foundations/part_map.md:118-134` agent-workflow
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` · `.the-way/product-guidelines/styleguide/SKILL.md` · `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md`
  `src/browser/styles.css` · `src/browser/tokens.css` · `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/text-field.ts` · `src/browser/kitchen-sink/kitchen-sink.ts`
- **Model:** same — it writes the binding wording that later screens follow across several rules of the styleguide, keeping to the template and to the task's answers without adding a meaning they do not carry
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · Foundation entries rows 1, 2, 3, 4, 6, 8 · D-44 changed · D-222 changed · D-40 changed

### Slice 5 — the statuses of the DOM modules in the coding guidelines

- **Goal:** Through `the-way-maintain-coding-guidelines`, as the cycle's author writes coding guidelines by `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md`, with the deliberate departure of pytanie 5a — no full audit of the code and no trial run of the tools — the table *Files of this kind* of `guidelines/coding-browser-module.md` gives the status `do not copy` to the 17 files the task's *Context* lists, and keeps `copy` at `account-rules.ts`, `clock.ts`, `credits.ts`, `password-reset.ts`, `terrain-picture.ts`, `credits-section.tsx` and the files of `controls/` (pytanie 5); a file slice 1 added under `src/browser/view/` gets its row as a control's file. The guidelines gain the three notes of pytanie 5: a new screen is not built on the pattern of these files, as the changed D-265 also says; the status does not forbid importing their pure functions; the examples from `status-row.ts`, `app.ts` and `game-view.ts` are about maintaining a screen that stays in DOM; with pytanie 5b's limit that an addition to a screen still in DOM may be made in DOM. The example of the controls is changed only where slice 1 made it untrue. Each changed rule cites its decision.
- **Change:** `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/przyciski-i-zakladki/task.md:17-39` Need and To do · `.runs/task-cycles/przyciski-i-zakladki/task.md:111-123` Questions to settle, pytania 5, 5a, 5b · `.runs/task-cycles/przyciski-i-zakladki/task.md:141-151` Context · `.runs/task-cycles/przyciski-i-zakladki/task.md:210-260` Decisions in play, Settlements to record and Out of scope
  `foundations/decisions.md:676-690` D-28 · `foundations/decisions.md:792-806` D-36 · `foundations/decisions.md:912-926` D-44 · `foundations/decisions.md:5427-5457` D-265 · `foundations/decisions.md:5486-5514` D-267 · `foundations/decisions.md:5560-5585` D-269
  Foundation entries row 7 and the change of D-265
  `foundations/invariants.md:35-44` browser-view-framework
  `foundations/part_map.md:3-29` browser-view · `foundations/part_map.md:118-134` agent-workflow
  `guidelines/coding.md` · `guidelines/coding-browser-module.md`
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md`
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Foundation entries row 7 · D-265 changed

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: the main button, the secondary actions as underlined text, tabs with a bottom line, the answer to a request brighter with a bar, unfolding the credits moving nothing (pytanie 6a) | Slice 1 · Slice 2 |
| *To do* 1 — the button that sends a form has the main look in every form, both forms, no new parameter | Slice 1 (look on `type="submit"`) · Slice 2 (card) · Slice 3 (sample) |
| *To do* 2 — „Nie pamiętam hasła”, „Wróć do logowania”, „Anuluj” as the secondary action, a new shared control in both forms with a case in the comparison test | Slice 1 · Slice 2 · Slice 3 |
| *To do* 3 — the switch as tabs, a variant of the button selected in its group, same element and `aria-pressed`, both forms; pace buttons unchanged | Slice 1 · Slice 2 · Slice 3 |
| *To do* 4 — the sentence after a request in `text` with a bar on its left | Slice 1 · Slice 3 (sample) |
| *To do* 5 — fixed top edge of the card, comment at `.account-card-screen` | Slice 2 |
| *To do* 6 — comment at `createFormNote` | Slice 1 |
| *To do* 7 — `--bar-width` kept at 2 px with a widened `Source:` | Slice 1 |
| *To do* 8 — the styleguide through `the-way-maintain-styleguide` | Slice 4 |
| *To do* 9 — the kitchen-sink page in DOM form with the main button, secondary action, tabs and the sentence | Slice 3 |
| *To do* 10 — `do not copy` at 17 files and three notes, no full audit | Slice 5 |
| *To do* 11 — rows of *Settlements to record*, changes of D-44, D-222, D-40, D-265 | Foundation entries |
| *To do* 12 — screenshots of every state of the card on the picture of the game | Slice 2 (taken and inspected) · the orchestrator's record commit and request (record Q3) |
| *Settlements to record* row 1 | Foundation entries row 1 |
| *Settlements to record* row 2 | Foundation entries row 2 |
| *Settlements to record* row 3 | Foundation entries row 3 |
| *Settlements to record* row 4 | Foundation entries row 4 |
| *Settlements to record* row 5 | Foundation entries row 5 |
| *Settlements to record* row 6 | Foundation entries row 6 |
| *Settlements to record* row 7 | Foundation entries row 7 |
| *Settlements to record* row 8 | Foundation entries row 8 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The secondary action is a further kind of the shared button in both forms, as `button.ts` already makes the destructive and the selected button one `<button>` with several looks | a new pair of files of its own in `controls/` — two more files, a further row in the coding table, and a second way of making a button | a rename of the kind across the card, the kitchen-sink page and the test |
| The tab is a class both forms set on the button selected in its group, and the thin line under the group a class the screen sets on the group's container | the look attached only by a selector of the card's container — the variant would not stand in the forms and the comparison test would not hold it, against *To do* 3 "w obu postaciach" | a rename of two classes |
| The shared looks (main button, secondary action, tab, the sentence's bar) and `--bar-width` go with the controls in slice 1; only the card's own layout goes in slice 2 | all styles with the card — slice 1's controls and comparison cases would stand without their look | none in the product; a slice boundary only |
| Sizes and spacing the task does not name stay as the button has them today; only the tab's text takes `--font-size-body` (pytanie 2c) | new sizes for the main button or the secondary action — values with no settled source | a later change of size by a further request |
| The screenshots are taken in slice 2, the last slice that changes the look of the game, as its own-work check of the user interface | a slice of its own — it would make no commit, since the screenshots stand in an ignored directory, and fail the mechanical check of a slice | a later fix of the card's look makes the orchestrator have them taken again before the request |
| `tests/view/account-screen.test.mjs` stays out of slice 2's *Change*: its cases of the card find controls by element, `type`, `aria-pressed` and text, not by class, and the change of look is inspected in a browser (D-87); its helpers and card cases stand in *Read* | the file in *Change* — its 4377 lines would count whole in the slice's reading for a change not expected | a case that does break is changed by slice 2 and reaches review as a file beyond *Change*, which the mechanical check passes on as information |
| Code before the text of the guidelines: slices 1–3, then the styleguide and the coding guidelines | the styleguide first — it names the classes, files and kinds slices 1–3 make | none in the product |
| The example of the controls in `guidelines/coding-browser-module.md` changes only where slice 1 made it untrue | no change — an example naming fewer options of `ReactButton` than it has; a rewrite — beyond *To do* 10 and pytanie 5a | a reviewer asking for one sentence more or less |
