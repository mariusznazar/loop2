# Report 21 — slice 6: the shared controls and the screens on them

- **Status:** done with concerns
- **Base:** `4c892df965e7d4e74276afc09ca5c1831316dcea` · **Head:** `b4658ac`
- **Method:** `the-way-make-change` (pinned `.the-way/task-cycle/change/SKILL.md`, `f0b2130`), executor of a planned slice

## Read

Handoff 21; frozen `task.md`, `spec.md` (Decision 8a included), `plan.md` (slice 6, *Foundation entries*,
*Choices*), `cycle.md` (questions table: S1-I1, FE-2, FE-5 bind here). Foundation by "Reading the
foundation" for `browser-view`: decisions D-03, D-04, D-06, D-18, D-19, D-21, D-23, D-26, D-27, D-28,
D-29, D-32, D-36, D-38–D-47, whole; invariants `browser-view-framework`, `content-identifiers`,
`terrain-drawing-numbers`, `browser-view-token-values`, `browser-view-focus-outline`; part map
`browser-view`; glossary headings (no term of this slice in it). Guidelines by
`.the-way/product-guidelines/reading.md`: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/styleguide-browser-view.md`, whole. Every changed file read whole before the change;
`tests/view/program-editor.test.mjs`, `tests/view/status-row.test.mjs`, `src/browser/view/app.ts`,
`tests/invariants/test_browser_view_token_values.py` (its reading of words and literals).

## Files changed (one commit `b4658ac`)

| File | + | − |
|---|---|---|
| `src/browser/view/controls/button.ts` (new) | 45 | 0 |
| `src/browser/view/controls/select-list.ts` (new) | 30 | 0 |
| `src/browser/view/controls/number-field.ts` (new) | 24 | 0 |
| `src/browser/view/controls/text-field.ts` (new) | 67 | 0 |
| `src/browser/styles.css` | 62 | 14 |
| `src/browser/view/program-editor.ts` | 35 | 43 |
| `src/browser/view/status-row.ts` | 5 | 8 |
| `src/browser/view/send-panel.ts` | 2 | 3 |

Files = the slice's *Change*, nothing else.

What the code does:

- `button.ts` — `createButton(text, { kind?: "plain" | "destructive" | "selected", label? })` makes a
  `<button type="button" class="button">`, adding `destructive` or `selected`; `setButtonSelected(el,
  selected)` toggles `selected` and `aria-pressed` for a group.
- `select-list.ts` — `createSelectList(label, options = [])` (`class="select-list"`, `aria-label`) and
  `setSelectOptions(el, options)`; no error state (FE-5); a list with no options is its empty state.
- `text-field.ts` — `createInputField(type, { label, hint? })` returns `{ element, input, setError }`:
  a wrapper `span.input-field` holding the `<input>` and, under it, `span.input-field-message`
  (hidden). `setError(message)` adds class `error`, shows the message, sets `aria-invalid` and
  `aria-describedby`; `setError(null)` removes all of it. `createTextField(options)` = text type; the
  hint is the `placeholder`.
- `number-field.ts` — `createNumberField({ label, hint?, min, max, step })` on `createInputField("number")`.
- None touches the DOM when imported (only function and type declarations plus a counter `let`).
- `styles.css` — the element rules `button, select, input`, `button`, `button:hover…`, `select option`
  and `.rule button` of Slice 4 replaced by rules on the controls' classes (no second set): default (no
  background, `text`, frame `control-border`, `font: inherit`); buttons at `--font-size-detail` (12 px,
  Q11, Slice 4 m3) with one padding `--space-2xs`/`--space-s`; select and fields padding
  `--space-2xs`/`--space-xs`; destructive text `danger`; selected text `text-strong`, frame `selected`;
  hover `highlight` only while not disabled, frame and text role unchanged; disabled text
  `text-disabled`, `cursor: default`; option colours `text` on `panel`; empty field hint
  (`::placeholder`) in `text-label`; error frame and message in `warning`. No `outline` added; focus
  stays the one `:focus-visible` rule. `color-scheme: dark` stays on `:root`.
- Screens: `program-editor.ts` builds its four selects, number field, „↑”, „↓”, „Usuń” (destructive)
  and „Dodaj regułę” through the controls (its private `button()` and `select()` helpers removed;
  `fillResources` uses `setSelectOptions`; the row keeps the number field as a `Field` and hides
  `row.value.element`); `status-row.ts` — „Pauza”/„Wznów” plain, „Restart” and „Zakończ” destructive,
  still made once and updated in place; `send-panel.ts` — „Wyślij” plain.

## Checks (command — exit code)

Run in the worktree, Git Bash, Windows 11, Node 24; logs in the session scratchpad.

Before the commit (working tree) and again after it at `b4658ac`, same results:

- `npm run build` — 0
- `node --test "tests/view/*.test.mjs"` — 0 (59 tests, 59 pass, among them „importing the editor
  touches no DOM”, which now imports `button.js`, `select-list.js`, `number-field.js` and through it
  `text-field.js`)
- `python -B -m unittest discover -s tests/invariants -p "test_browser_view_*.py"` — 0 (13 tests:
  framework, token values, focus outline)
- `python -B -m unittest discover -s tests/invariants -p "test_content_identifiers.py"` — 0 (4 tests)
- `python -B -m unittest discover -s tests/invariants -p "test_terrain_drawing_numbers.py"` — 0 (3 tests)
- `python -B .the-way/gate/run_tests.py tests/quality` — 0 (27 tests: ESLint, Prettier, Ruff,
  ShellCheck … over the new files too)
- `python -B .the-way/elements/common/foundation_check.py` — 1, exactly the five pattern errors left
  after Slice 4 (`src/browser/kitchen-sink/**`, `tsconfig.kitchen-sink.json`,
  `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs`,
  `src/browser/AGENTS.md`); no other error, so the new files under `src/browser/view/controls/` are
  claimed by `browser-view`.
- `npx prettier --no-config --no-editorconfig --ignore-path .gitignore --check` on the changed files —
  0 after `--write` reflowed one import of `number-field.ts`.

Positive control of the token-values test's population: with `text-field.ts` changed for a moment to
`className = "input-field field"`, `… -p "test_browser_view_token_values.py"` — 1, reporting
`src/browser/view/controls/text-field.ts: line 33: in a literal: the colour field`; file restored
(diff empty) before the commit. So the new modules are searched, and the class names avoid the system
colour words (`field`, `highlight`, `mark`, `menu` …) FE-2 reads as whole words.

Not run: the full suite (`npm test`) — the cycle's run before the request, as the method says.

Tests written: none. The plan's choice C11 gives the controls no test of their own elements (no DOM in
the repository, no dependency added); the existing view tests are the slice's starting tests and pass
unchanged. No invariant test changed.

Mutations in mind no test catches (left to review and the kitchen-sink page, C11): „Usuń”, „Restart”
or „Zakończ” made plain; a missing `error` class or message in `setError`; a missing `aria-pressed`;
hover drawn on a disabled control.

## Own-work check (WAY-164)

- Requirement most likely missed: "`program-editor.ts`, `status-row.ts` and `send-panel.ts` make every
  button, select and number field through them; „Zakończ”, „Usuń” and „Restart” are destructive
  buttons" — a leftover `createElement("button"|"select"|"input")` or a plain destructive button.
- Check: `grep -rnE 'createElement\("(button|select|input|textarea)"\)|new Option\(' src/browser
  --include=*.ts | grep -v "/controls/"` — exit 1 (no match); `grep -rnE 'createButton\("[^"]*"'
  src/browser/view` lists seven calls: „Usuń” (`program-editor.ts:343`), „Restart”, „Zakończ”
  (`status-row.ts:48-49`) with `kind: "destructive"`, „Dodaj regułę”, „↑”, „↓”, „Wyślij”, „Pauza”
  plain; no element selector `button`/`select`/`input`/`option` is left in `styles.css` but
  `.rule input[type="number"]` (layout width, kept from Slice 4).
- In the running page (below): every button carries `class="button"`, the three destructive buttons
  compute `color: rgb(255, 100, 103)` (`--danger`), the others `rgb(212, 212, 216)` (`--text`).

## Screenshot of the running product (WAY-219)

Route of Slices 4 and 5: `npm run build`, built server `LOOP2_LISTEN_PORT=38617 node
dist/server/main.js` (127.0.0.1), Playwright (the harness's MCP browser), Chromium, 1440×900 and
390×844; computed styles read in the page. Files in `reports/shots/slice6/`:

- `s6-01-send-panel-empty-program.png` — fresh page: „Dodaj regułę”, „Wyślij” as shared buttons.
- `s6-02-program-rules.png` — two rules added by clicks, the second switched to „Tu leży mniej niż”:
  selects, number field (hidden in row 1, shown in row 2), „↑”, „↓”, „Usuń” in `danger`.
- `s6-03-hover-destructive.png` — „Usuń” under the pointer: background `rgb(39, 39, 42)` (`highlight`),
  text `rgb(255, 100, 103)` and frame `rgb(113, 113, 123)` unchanged.
- `s6-04-hover-select.png` — select under the pointer: `highlight`, text `text`, frame unchanged; the
  number field under the pointer computes the same.
- `s6-05-focus-keyboard.png`, `s6-06-focus-destructive.png` — Tab through the rule row: selects, „↑”,
  „↓”, „Usuń” each `outline: 2px solid rgb(244, 244, 245)`, offset 2px.
- `s6-07-run-status-row.png` — after „Wyślij”: „Pauza” plain, „Restart” and „Zakończ” in `danger`.
- `s6-08-focus-pause-kept.png` — keyboard Enter on „Pauza” turns it into „Wznów” with focus kept;
  resumed with Enter, the clock went from minute 1 to minute 4 and focus stayed on „Pauza” with its
  outline (the elements are updated in place).
- `s6-09-restart-focus-hover.png` — „Restart” focused by Tab and under the pointer.
- `s6-10-forced-states.png` — **forced states**, made in the page with the real built modules
  (`import('/view/controls/…')`) and the real stylesheet, appended for the shot and removed after:
  disabled button and disabled destructive button (text `rgb(82, 82, 92)` = `text-disabled`), selected
  button (`text-strong`, frame `rgb(212, 212, 216)` = `selected`, `aria-pressed="true"`) beside an
  unselected one (`aria-pressed="false"`), disabled select, empty select (0 options), number field in
  error (frame `rgb(254, 154, 0)` = `warning`, message under it in `warning`, `aria-invalid`,
  `aria-describedby` = the message's id), disabled number field, empty text field with hint
  (placeholder `rgb(141, 141, 151)` = `text-label`), text field in error, and a field whose error was
  set and cleared (class, hidden message and both ARIA attributes gone).
- `s6-11-forced-selected-hover.png` — selected button under the pointer: `highlight`, frame `selected`
  and text `text-strong` unchanged; a disabled button under the pointer keeps a transparent
  background.
- `s6-12-forced-error-in-rule-row.png` — **forced**: the row's number field given the error class and
  a message by DOM, to see the layout in the rule row (see *Concerns*).
- `s6-13-narrow.png` — 390 px: rule rows wrap, no horizontal scroll (`scrollWidth` 390).

States not reachable in the game today, so shown only forced: disabled, error, empty (no screen
disables a control, sets an error or has a hint, and the resource lists are never empty), selected
(no group of buttons exists). Unchecked: the native drop-down list of a select opened (its options
popup), and every state in any browser but Chromium. Loading applies to no control (D-44). The
kitchen-sink page of Slice 7 will show every state. The only console error was the base's
`favicon.ico` 404. Server stopped, browser closed; the shots were moved out of
`C:\Storage\repos\loop2\.playwright-mcp\`, whose snapshot and console files from this and earlier
sessions remain there (ignored by git; a guard hook refused deleting outside the worktree).

## Choices (way rejected — cost if wrong)

- One `createButton` with a `kind` and a `setButtonSelected` for groups — rejected three factory
  functions (one per button kind) — a rename in three screens and Slice 7.
- The fields' error is an API (`setError`) the screens do not call: the program editor keeps its commit
  rule (text with no number reverts to the previous value, nothing committed) — rejected showing an
  error message in the editor, which changes the screen's behaviour beyond the slice — if the human
  wants the editor to show the error, one call in `program-editor.ts`.
- Field markup: a wrapper `span.input-field` with the input and its message, the message tied by
  `aria-describedby` to an id from a module counter — rejected inserting the message as the input's
  sibling on demand (no "under the field" placement in an inline row) — markup of two controls.
- `number-field.ts` builds on `createInputField` exported by `text-field.ts`, keeping the plan's four
  modules (C5) — rejected a fifth shared module or duplicated code — a module split.
- Class names `button`, `destructive`, `selected`, `select-list`, `input-field`, `input-field-message`,
  `error` — chosen so no TypeScript literal holds a colour word (FE-2; `field`, `highlight`, `mark`
  would fail the token test).
- Sizes: buttons 12 px (`--font-size-detail`, Q11 "przyciski"), selects and fields keep the body's
  13 px (Q11 names no size for them); one button padding for every screen (`--space-2xs` / `--space-s`,
  the rule row's from Slice 4) so the program's and the status row's buttons are one size (audit
  zarzut 3) — rejected the status row's larger `--space-xs` / `--space-m` — the status row's buttons
  are smaller than in Slice 4 (`s6-07`); a padding step change in one rule.
- Hover only `:not(:disabled)`, disabled `cursor: default`, frame of a disabled control unchanged
  (the styleguide names only the text) — rejected a dimmed frame on disabled — one rule.
- The empty select list has no hint: the styleguide's empty state for lists is "lista bez pozycji",
  with the hint only for fields — rejected a placeholder option — Slice 7 may want a visible sample.
- `readNumberField` stays in `program-editor.ts` (it is that editor's commit rule over the data's
  range, and its tests import it from there).

Adaptations of section 4: none; the plan's files and names held.

## Concerns for the next dispatch

1. Firefox lowers `::placeholder` opacity in its default styles; the usual reset `opacity: 1` is a
   unitless opacity D-43 counts, and there is no token for full opacity. In Firefox the empty field's
   hint would then show `text-label` dimmed, below the 4.5:1 of D-42. Not seen (Chromium only); not
   worked round with `opacity: 100%`. A question for the orchestrator: accept, add a token with a
   source, or check Firefox first.
2. A field's error message widens its wrapper, so in the rule row the row reflows (`s6-12`, forced).
   No screen shows an error today; the kitchen-sink (Slice 7) shows the field alone. Review may judge
   whether the message should not widen the field.
3. No test guards the wiring (destructive kind on the three buttons, state classes) — plan C11; only
   review and the kitchen-sink page catch it.
4. `guidelines/coding-browser-module.md` *Files of this kind* gains no rows for the four new modules —
   by its template a file added after the audit takes no row until the guidelines are refreshed
   (WAY-200); the file is outside the slice's *Change*.
