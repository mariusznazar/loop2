PASS b4658ac701f58692e96df944468b50a478f0a6c0

# Review 22 — slice 6: the shared controls and the screens on them

- **Range:** `4c892df965e7d4e74276afc09ca5c1831316dcea..b4658ac701f58692e96df944468b50a478f0a6c0`
  (one commit, `git log` and `git diff` computed by the reviewer; `git rev-parse HEAD` = the given head)
- **Method:** `the-way-review-change`, pinned `.the-way/task-cycle/review/SKILL.md` at `f0b2130`
  (`git -C .the-way rev-parse HEAD` = gitlink)
- **Read:** handoff 22; frozen `task.md` (To do 4, Q12, Q19 B/C, rows 2, 3, 7, 20); `spec.md`; `plan.md`
  slice 6 and C5, C11; `cycle.md` questions table (S1-I1, FE-2, FE-5 bind); executor's report 21;
  decisions D-03, D-04, D-36, D-38–D-47 whole; part map `browser-view`; guidelines
  `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`
  whole (selected by `.the-way/product-guidelines/reading.md`); the 13 screenshots' key frames.
- **Blocking findings:** 0 · **Minor:** 4 · **Out of scope:** 0 (5 lines under Declined to judge)

## What the change does, verified

- Four modules in `src/browser/view/controls/` (plan C5): `button.ts` (plain, destructive, selected via
  `kind`; `setButtonSelected` sets class and `aria-pressed`), `select-list.ts`, `text-field.ts`
  (`createInputField` → wrapper `span.input-field` with the input and a hidden message;
  `setError` toggles class `error`, message, `aria-invalid`, `aria-describedby`), `number-field.ts`
  on it. Imports touch no DOM (module-level code is declarations and a counter); the view test
  „importing the editor touches no DOM” passes.
- Every `<button>`, `<select>` and number `<input>` of `program-editor.ts`, `status-row.ts`,
  `send-panel.ts` is made by the controls; „Usuń” (`program-editor.ts:343`), „Restart” and
  „Zakończ” (`status-row.ts:48-49`) are `kind: "destructive"` (D-44, To do 4). No other module or
  `index.html` creates a button, select, input or option.
- `styles.css:65-141`: states as styleguide rule 6 and D-40/S1-I1 give them — no own background,
  text `text`, frame `control-border`; hover `highlight` only when not disabled, frame and text role
  unchanged (`.button.destructive` keeps `danger`, `.button.selected` keeps `text-strong` and
  `selected` — cascade checked: equal specificity, later `:disabled` rule wins over kind colours);
  disabled `text-disabled`; error frame and message in `warning` (D-39); hint in `text-label`; no
  `outline` added (D-47). The number field hidden in a row via the wrapper's `hidden` works because
  `styles.css:7-9` has `[hidden] { display: none !important; }`, which beats `.input-field`'s
  `inline-flex`.
- The status row keeps creating its buttons once and updating `textContent` in place (D-36 exemplar
  behaviour intact); focus targets of the editor (`FocusTarget`) never name the number field, so its
  type change to `Field` breaks no focus path.
- Trust boundaries: the range touches none of `assets/icons/**`, `assets/fonts/**`,
  `scripts/kitchen-sink.mjs`, so no crafted-input check applies. No irreversible operation.

## Findings

### Critical

None.

### Important

None.

### Minor

**m1 — A disabled empty field with a hint looks exactly like an enabled one.**
`src/browser/styles.css:108-112` gives a disabled field only `color: var(--text-disabled)`, which
colours the value; `src/browser/styles.css:128-130` gives `::placeholder` `text-label` regardless of
`:disabled`, and the frame stays `control-border`. So a disabled field that is empty and has a hint
shows the same frame and the same hint colour as an enabled one: the player cannot see it is
unusable. Same family: a disabled selected button keeps its bright `selected` frame
(`.button.selected` border not reset under `:disabled`). Evidence: own probe in headless Firefox
152 on the built modules — enabled and disabled empty text fields both compute placeholder
`rgb(141, 141, 151)` (`text-label`), disabled selected button frame `rgb(212, 212, 216)`
(`selected`). Effect today: none — no screen disables a control or gives a field a hint (grep of
`src/browser` outside `controls/` for `disabled|placeholder|hint|setError|selected` exit 1). It will
show on the kitchen-sink page (Slice 7). A fix inside the styleguide: `.input-field
input:disabled::placeholder { color: var(--text-disabled); }`.

**m2 — An error message widens its field and reflows the rule row.**
`src/browser/styles.css:121-125` makes `.input-field` an `inline-flex` column, so the message under
the input sets the wrapper's width; in a rule row the number field grows from `4em` to the
message's width and pushes „Usuń” to a new line (executor's forced shot
`reports/shots/slice6/s6-12-forced-error-in-rule-row.png`). Effect today: none — no screen sets an
error (the editor keeps its silent revert). Should a screen use `setError` in an inline row, the
row jumps; a message positioned out of flow or a wrapper width tied to the input would avoid it.

**m3 — The frame of a disabled control stays `control-border`, whose meaning is "can be clicked
or typed into".**
D-40 gives `control-border` the meaning "something can be clicked or typed into"; styleguide rule
"Each role in its meaning" has review read every used role against its decision.
`src/browser/styles.css:108-112` keeps that frame on a disabled control. The styleguide's own state
list ("disabled — tekst w `text-disabled`", from Q12) asks for nothing more and no role exists for
a disabled frame, so this is no defect of the slice against its sources; it is a tension between
D-40's wording and Q12 the whole-change review or the return step may name. No user effect today
(no disabled control on any screen).

**m4 — The program editor's number field has no hint, so its empty state shows nothing.**
`src/browser/view/program-editor.ts:331-336` creates the number field without `hint`; Q12 and rule 6
describe the empty state of a field as "puste pole z podpowiedzią w `text-label`". When the player
clears the field before `change` commits (and reverts) it, the field is blank. Small: the empty
moment lasts only until `change`; the API supports a hint (`FieldOptions.hint`).

## Executor's concerns, judged

1. Firefox dimming `::placeholder` below 4.5:1 — **not reproduced**. Headless Firefox 152.0.3:
   placeholder of `#8d8d97` on `#09090b` renders `rgb(141, 141, 151)`, identical to a reference
   `<div>` of the same colour (pixel read from the screenshot), and computed `::placeholder` opacity
   is `1` on the built `styles.css`. No token and no reset needed for current Firefox. Not a
   finding.
2. Error message widens its field — Minor m2.
3. No wiring tests — plan choice C11, accepted by the orchestrator (cycle record C1–C11); not a
   finding of this slice. Residual risk stands: „Usuń”/„Restart”/„Zakończ” made plain or a missing
   state class is caught only by review and the kitchen-sink page.
4. `guidelines/coding-browser-module.md` *Files of this kind* lacks the four modules — not a
   finding: `.the-way/product-guidelines/coding/template.md:173-175` says "a file added after that
   audit takes no row until the guidelines are refreshed or extended (WAY-200)"; its *Where in code*
   `src/browser/view/` already covers `controls/`.
5. Status-row buttons smaller than in Slice 4 — see Declined to judge.

## Declined to judge

- The program editor not showing the error state for an invalid number (it reverts silently, as at
  the base) — the task moves fields onto the controls (To do 4); changing the editor's behaviour is
  not asked for.
- The status row's buttons now one size with the program's (`--space-2xs`/`--space-s`, 12 px) and so
  smaller than in Slice 4 — the audit's charge 3 asks for one size; target size is no criterion D-42
  adopts.
- Buttons at 12 px beside selects and fields at 13 px in one rule row (slightly different heights,
  `s6-02`) — Q11 names 12 px for buttons and no size for selects or fields.
- The native drop-down of an opened select and every browser but Chromium (executor) and Firefox
  (this review, controls only) — not checked by either; the task names no browser.
- `aria-pressed` set only on buttons a group passes through `setButtonSelected` — accessibility
  beyond the three WCAG criteria D-42 keeps.

## Checks run

In a temporary detached worktree of `b4658ac` (scratchpad), with junctions to the task worktree's
`node_modules` and `.runs/quality-venv`; the worktree was removed afterwards (junctions removed
first) and the reviewed worktree stayed clean (`git status --short` empty, HEAD `b4658ac`).

| Check | Exit code and result |
|---|---|
| `npm run build` | 0 |
| `node --test "tests/view/*.test.mjs"` | 0 — 59 tests, 59 pass |
| `python -B -m unittest discover -s tests/invariants -p "test_browser_view_*.py"` | 0 — OK |
| `python -B -m unittest discover -s tests/invariants -p "test_content_identifiers.py"` | 0 — OK |
| `python -B -m unittest discover -s tests/invariants -p "test_terrain_drawing_numbers.py"` | 0 — OK |
| `python -B -m unittest discover -s tests/invariants -p "test_design_token_*.py"` | 0 — OK |
| `python -B .the-way/gate/run_tests.py tests/quality` | 0 — 27 tests OK (ESLint, Prettier, Ruff, ShellCheck …) |
| `python -B .the-way/elements/common/foundation_check.py` | 1 — exactly the five pattern errors the plan leaves after Slice 4 (`src/browser/kitchen-sink/**`, `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs`, `src/browser/AGENTS.md`); no other error, so `src/browser/view/controls/*` are claimed |
| `grep -rnE 'createElement\("(button\|select\|input\|textarea\|option)"\)\|new Option\(\|<(button\|select\|input\|textarea)' src/browser \| grep -v /controls/` | 1 — no leftover control made outside the shared modules |
| `grep -rn "createButton\|createSelectList\|createNumberField\|createTextField" src/browser --include=*.ts \| grep -v /controls/` | 0 — 12 calls; the three destructive buttons carry `kind: "destructive"` |
| Firefox placeholder probe: static page, `#8d8d97` placeholder vs reference text on `#09090b`, `firefox --headless --screenshot`, pixels read in Python | all three samples `rgb(141, 141, 151)` — no dimming in Firefox 152.0.3 |
| Firefox controls probe: built server `LOOP2_LISTEN_PORT=38799 node dist/server/main.js` (127.0.0.1), a probe page in the temporary worktree's `dist/public/` importing the built control modules with the real `tokens.css` and `styles.css`, screenshot and computed styles | plain `rgb(212,212,216)` `text`; destructive `rgb(255,100,103)` `danger`; selected text `rgb(244,244,245)`, frame `rgb(212,212,216)`; `aria-pressed` true/false; disabled (plain, destructive, selected) text `rgb(82,82,92)`; disabled frame `rgb(113,113,123)`; error frame and message `rgb(254,154,0)`, `aria-invalid` and `aria-describedby` set; placeholder `text-label`, opacity 1, same when disabled (m1); buttons 12 px, selects 13 px; no outline unfocused. Server stopped |
| Screenshots of the executor, viewed: `s6-02`, `s6-07`, `s6-10`, `s6-12`, `s6-13` | match the report's description; forced states (`s6-10`, `s6-12`) as marked |

Not run: the full `npm test` (the cycle's own run before the request); hover and keyboard focus in
Firefox (the probe was a static screenshot; Chromium evidence is the executor's `s6-03`–`s6-09`).
