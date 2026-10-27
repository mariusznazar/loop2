# Slice 10 report: shared password and waiting controls

**Status:** done with concerns (concerns below; none blocks the slice).

**Base** 31448168c1a397048ba752d9b46baa01c75c9d56. **Head** be8221166e9a74fdb2828fc9ba1c711cdf18ff42. **One commit**: be82211 "Add password field, waiting button and form warning to the shared controls and show them in the kitchen-sink page" (code, kitchen-sink page and both guidelines together, since the kitchen-sink page and the styleguide rule describe the same states).

## Changed paths (added / removed lines)

| Path | + | - |
|---|---:|---:|
| `src/browser/view/controls/text-field.ts` | 58 | 8 |
| `src/browser/view/controls/button.ts` | 38 | 5 |
| `src/browser/kitchen-sink/kitchen-sink.ts` | 152 | 12 |
| `src/browser/kitchen-sink/kitchen-sink.css` | 25 | 0 |
| `src/browser/styles.css` | 24 | 1 |
| `guidelines/styleguide-browser-view.md` | 25 | 7 |
| `guidelines/coding-browser-module.md` | 13 | 0 |
| `foundations/decisions.md`, `foundations/part_map.md` | not changed (see consequences) | |

Seven of the nine Change paths changed. No other path changed.

## Checks (command, exit)

| Command | Exit | Result |
|---|---:|---|
| local: `npx prettier --no-config --no-editorconfig --check src/browser`, `npx eslint --max-warnings 0 src/browser`, `npm run build`, `node scripts/kitchen-sink.mjs --build-only` | 0 | clean; quick feedback, not the evidence of record. A first `npm run build` exited 2 on TS2322 (`input.autocomplete` wants the `AutoFill` type); fixed with `setAttribute("autocomplete", ...)`. |
| Linux harness: `docker run --name loop2-task15-controls45-final --network container:loop2-task15-dind ... loop2-task22-verifier:latest bash /inputs/verify.sh be8221166e9a74fdb2828fc9ba1c711cdf18ff42 7012abcfb55b4ba2b2836b574a2275eb1551df28` (`product.bundle` rebuilt first with `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie`), full `npm test` | 0 | 405/405 Node tests pass, 0 skipped; Python 5 + 65 + 176 + 32 tests OK (`skipped=3`, the three Windows-only tests); foundation check `0 errors` inside `npm test`. Log: `reports/45-controls-final.log`. |
| `python -B .the-way/elements/common/foundation_check.py` locally at the head | 0 | `0 errors` |

**Not run or unchecked:** the Windows full gate; the three Linux-skipped Windows-only tests (no Linux pass attributed to them); the unchanged base was not rerun (as instructed). No fail-first run and no mutation run: this slice adds no invariant and changes none (see below).

## User-interface states and screenshots

The browser check ran through the Playwright MCP tools (available), after `npm run kitchen-sink`, with the user's playwright-mcp skill and its five references read first. Screenshots are in `reports/`:

- `reports/45-controls-kitchen-sink-full.png` (viewport 1400 wide, full page): the table of shared controls in the seven states with the new row "Pole hasła" and the loading column filled, and the new section "Formularze czekające na serwer".
- `reports/45-controls-focus-submit.png`: the submit button of the refusal form reached by Tab, with the focus outline.
- `reports/45-controls-narrow-forms.png` (viewport 375 wide): the four forms stacked, no horizontal page scroll (`scrollWidth` 360 against `innerWidth` 375).

| State | Sample on the page | Read from the real browser |
|---|---|---|
| Masking | "Pole hasła" row, all seven states, and the password fields of the forms | the inputs have `type=password`; the screenshot shows dots, no letters |
| Button waiting | "Przycisk" row, loading column: "Logowanie…"; form samples with "Logowanie…" and "Zakładanie konta…" | button `disabled`, `aria-busy=true`, computed text colour `rgb(82, 82, 92)`, which is `--text-disabled` `#52525c` |
| Fields locked | "Pole tekstowe" and "Pole hasła" loading cells; fields of both waiting forms | `disabled` on every input, text in `text-disabled` |
| Warning under the form | refusal form ("Nieprawidłowy adres e-mail lub hasło.") and no-connection form ("Brak połączenia z serwerem. Spróbuj ponownie.") | colour `rgb(254, 154, 0)`, which is `--warning` `#fe9a00`; element `role=alert`, one sentence, wraps at 260 px |
| Keyboard focus | form samples | Tab from the e-mail field goes to the password field and then to the submit button; the button matches `:focus-visible` with `solid 2px rgb(244, 244, 245)` (`--focus`); Enter in the password field fires `submit` once (the page cancels it) |
| Visible labels | form samples | each input has a `<label for>` that matches its `id` (`labels[0]` read for all ten inputs of the four forms) |
| Not applicable, with reasons on the page | destructive and selected buttons, select list, number field in loading | the reason texts of `NOT_APPLYING` |

Console: one error, `favicon.ico` 404, a file the page does not have; nothing from the page's code.

A finding that the contract below carries: a focused button that becomes `disabled` loses keyboard focus. After two animation frames `document.activeElement` was `BODY`. The styleguide rule and the guideline now say that the screen must move focus back after the wait.

## Actual reading reaches

Real Chrome through Playwright MCP of `http://127.0.0.1:<port>/` served by `npm run kitchen-sink` (the page of the product, synthetic values: `przyklad@example.com`, a made-up password). Not exercised: any real account screen (slice 11), the real server, the secure cookie, a mobile browser, other browsers, a screen reader (the `role=alert` announcement is by construction only).

## Own-work check (WAY-164)

Requirement most likely unmet: "every affected state has a sample or a precise non-applicability" together with "the fields are locked and the waiting text appears" (task To do 15). Check: a projection over the first sample table (all 7 controls x 7 states, read for tag, `type`, `disabled`, `aria-busy`, text) and over the four form samples. It showed every loading cell is either a waiting control or a stated reason, none empty. It also showed that the list's empty-state cell holds an empty `<select>` with no reason text (a state that existed before this slice and is covered by the rule: an empty list). The check did not find a missing state of this slice.

## Foundation, guideline and surface consequences

- **D-44** (`foundations/decisions.md:857`): its last sentence already carries the waiting rule (recorded by the foundation commit 713b60d before this slice). I changed nothing there: the decision already says what the code now does, and the code and the styleguide now agree with it. The old styleguide sentence "loading - nie dotyczy żadnej kontrolki" was the contradiction; it is rewritten (see below). No new decision.
- **Styleguide rule "States of shared controls"** (`guidelines/styleguide-browser-view.md`): loading is now defined (button disabled under a changed text, fields disabled, one sentence under the form in `warning`, focus returns to the control the player began from); the password field has the same states as the text field; the visible label is in `text-label`; the departures list now has loading reasons for the destructive and selected buttons, the select list and (new line) the number field; the kitchen-sink rule names the forms. Role meanings did not change: `warning` already means "something will not run" (D-39). Its Invariant line stays `none`.
- **Invariants:** none added, none changed, none marked Violated. The existing ones were exercised by the full `npm test`: `browser-view-token-values` (I wrote no colour, length in px/rem/em, font name or unitless value in a file of the part other than `tokens.css`; the CSS widths 260px and the like are layout dimensions D-43 leaves out), `browser-view-focus-outline` (I declared no `outline`), `design-token-contrast` (no token changed), `design-token-sources` (no token changed), `application-build-kitchen-sink` (the page's code stays outside `npm run build`), `browser-view-framework` (no framework). No new token value.
- **`guidelines/coding-browser-module.md`**: the four files of `src/browser/view/controls/` are now listed as `copy` (they were missing from the table), and the Examples section names the waiting API. `body-row.ts` is also missing from that table; I did not add it (not part of this slice).
- **`foundations/part_map.md`**: unchanged. The description of browser-view ("the kitchen-sink page that shows the shared controls, roles and tiles in every state") still holds: the forms are the shared controls composed. No file was added, so `Files:` is unchanged.
- **Guidelines not changed that a reader may expect:** `guidelines/coding.md` (no new kind), `guidelines/testing.md` (no test added; D-75, D-87 and D-88 below).

## Return conditions of D-75, D-87, D-88 (assessment)

- **D-75** (complete journeys manually, automation reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking is a significant task cost): not met by this slice. I checked the states once by hand; it took about fifteen tool calls and found one fact (focus loss) that a unit test with a hand-made document would not have shown. The account screen in slice 11 will repeat this by hand once more. No condition is met yet; the cost is visible but not "significant".
- **D-87** (pixel comparison reconsidered on a concrete visual defect or an agreed requirement for an exact layout): not met. I saw no visual defect in the three screenshots; the narrow screenshot shows the forms wrapping and the warning wrapping inside its panel.
- **D-88** (real events, focus and SVG manual; reconsidered on a defect the document model missed): not met, but the evidence is close to it. The focus loss on a disabled button is a real-browser fact; the model of the document (`tests/view`) would not show it, and nothing in the product fails because of it today (no screen uses the button yet). If slice 11's screen loses focus after a refusal, that is a defect a document model misses and the return condition would be met. I mark it for the review of the whole change.

## Contract of the controls for slice 11

From `src/browser/view/controls/button.ts`:
- `createButton(text, { kind?, label?, submit? })`; `submit: true` makes `type="submit"`, otherwise `type="button"` as before.
- `setButtonWaiting(button, waitingText | null)`: with text, disabled + `aria-busy=true` + the text shown (the resting text is remembered); with `null`, the resting text and the enabled state come back; a button that was not waiting is left as it is. It never changes focus.

From `src/browser/view/controls/text-field.ts`:
- `createPasswordField(options)` returns the same `Field` as the text field (`element`, `input`, `setError`); the browser masks the value.
- `FieldOptions` gained `visibleLabel?: boolean` (the label is a `<label for>` above the input; otherwise `aria-label`, as before) and `autocomplete?: string` (such as `email`, `current-password`, `new-password`).
- `createFormWarning()` returns `{ element, set(sentence | null) }`: a hidden `<p role="alert" class="form-warning">` that shows one sentence in `warning`. Place `element` under the form.
- Fields are locked with `field.input.disabled = true`; there is no wrapper that locks a whole form.

From `src/browser/styles.css`: class `form` (a column with the spacing token, for a `<form>` of the screen); `form-warning`, `input-field-label`. The kitchen-sink page's `formSample` in `src/browser/kitchen-sink/kitchen-sink.ts` is the reference for composing a form (a `<form>` whose submit handler is the screen's, the fields, the submit button, the warning).

The screen must: show the client's three generic Polish failure sentences and the server's own messages as the client returns them (slice 9, unchanged here); serialize transitions; clear password inputs when leaving; and, after the answer, call `setButtonWaiting(button, null)`, unlock the fields and move focus to the field or button the player began from (the disabled button drops it to `body`).

## Reaches beyond the dispatch

- `scripts/kitchen-sink.mjs:1-60`, to learn how the page is built and served, and `tests/invariants/test_application_build_kitchen_sink.py:1-40`, to know what `npm test` holds the page to.
- `src/browser/view/controls/number-field.ts` (whole, it builds on `createInputField` which I changed), `.the-way/product-guidelines/styleguide/SKILL.md`, `.the-way/product-guidelines/coding/template.md` (grep for the status rules), `docs/task-cycles/konta-graczy-i-logowanie/reports/44-client-report.md:42-57` and `linux-verification.md` for the harness command.
- `guidelines/coding.md:1-243`, `src/browser/AGENTS.md`, `foundations/decisions.md:857-871, 1365-1377, 1521-1546` and the invariant entries `browser-view-*`, `design-token-*`, `application-build-kitchen-sink`: as named by the dispatch.
- I did not invoke the five project skills as tools; I followed `the-way-make-change` and `the-way-maintain-styleguide` by hand from the pinned files (the styleguide skill is written for a refinement, so I took from it the order of work and the rule that an accepted meaning is only applied, not invented). I did not read `cycle.md`.
- Playwright MCP wrote its snapshot and console logs to `.playwright-mcp/` under the main checkout `C:\Storage\repos\loop2\` (its root is the session that started the server, not this worktree) and the screenshots first landed there; I copied the three screenshots to this worktree's `reports/`, deleted the copies and removed `.playwright-mcp/` in the main checkout. Nothing else was touched there.

## Choices (rejected way, cost if wrong)

1. **`setButtonWaiting` in `button.ts` with a `WeakMap` of resting texts.** Rejected: leaving the text swap to each screen (two screens and the logout button would each repeat it, and the disabled state, `aria-busy` and the restore could drift); a `data-` attribute for the resting text (a second source of state in the DOM). Cost: module-level state; one more exported function for a thing the guidelines call "the screen adds its own handler".
2. **`createFormWarning` in `text-field.ts`**, not a new file. Rejected: a new controls file (the Change list has nine paths, and a new file would be a new path and a part-map entry). Cost: the text-field module now holds one non-field control.
3. **Visible label as an option of the field** (`visibleLabel`), not a separate label element each screen builds. Rejected: `aria-label` plus a screen-built text (a screen reader would read the name twice, and each screen would style its own labels). Cost: `FieldOptions` is a little wider; the number field gets the option too.
4. **The kitchen-sink samples of the waiting state are four composed forms plus the loading column of the table**, built from the real shared controls through the same functions a screen will use. Rejected: only the table (it does not show the label change on a button in its form or the warning under the form). Cost: the page grew by about 150 lines and holds sentences from slice 9 and the task; they are copied by hand and can drift from `account-api.ts` (the page is not allowed to import the client: the page imports only modules the game uses, and the client is not one yet).
5. **Loading for the text field and password field shows the locked field**, which looks like disabled. Rejected: declaring loading not applicable to fields (the task says the fields are locked while waiting). Cost: two columns look the same; the difference is the context (the form samples show the pair together).
6. **Loading does not apply to the destructive and selected buttons, the select list or the number field**, each with a reason on the page. Rejected: showing a waiting sample for all (no form waits on them; a counterfeit sample). Cost: a future screen that makes one of these wait changes the reason (the reason text says "żaden formularz … nie ma …").
7. **Did not rewrite D-44 or record a new decision**, because D-44 already carries the rule (see above). Rejected: re-recording it. Cost: none; if the orchestrator renumbers decisions with upstream PR 31, D-44 is not among them.
8. **The `form` class of `styles.css` is a layout helper** with the spacing token, `align-items: flex-start` (the button keeps its natural width). Rejected: a stretched button (a full-width button is a new look no decision settles). Cost: slice 11 may want the forms side by side or in a panel; the panel is the screen's.

## Concerns and problems as observed

- **The wording of the three generic failure sentences is still mine from slice 9** (reports/44-client-report.md, choice 4); this slice shows two of them on the page as samples and did not change them. The owner has not seen the wording.
- **A disabled button drops focus** (verified in Chrome, two frames after the change). Not a defect of this slice, since no screen uses the button yet; it is stated in the contract and in the styleguide. If slice 11 omits the focus return, that would be a defect (D-88's return condition, above).
- **`role=alert` on a hidden-then-shown paragraph** announces in most readers by convention; I did not test a reader (not exercised, stated above).
- **The empty list sample** (`select` with no options) has no reason text; it is the state "empty" of an existing control and predates the slice.
- **A guess, not verified:** that the first error of the Playwright console (favicon 404) would also appear on the served game page; I did not open it.
