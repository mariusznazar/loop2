# Report — Slice 8, task `reset-hasla`

**Status:** done

**Commit:** `931f578` on `task/reset-hasla` (one commit, no push).

## Files changed

- `src/browser/view/account-screen.ts` +159 -41
- `src/browser/view/controls/text-field.ts` +28 -1 (`createFormNote`, `FormNote`)
- `src/browser/styles.css` +16 (`.form-note`, `.account-form:only-child`, `.account-form-switch`)
- `tests/view/account-screen.test.mjs` +296 -1

## Checks (command, exit code)

- `npm test -- tests/view/account-screen.test.mjs` — 0 (44 tests pass).
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0.
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — 0.
- `npm run typecheck` — 0.
- `npm test -- tests/quality/test_quality_invariants.py` — 0.
- `npx prettier --no-config --no-editorconfig --check` on the four files — 0.
- Not run: the full gate `npm test` (the orchestrator's); foundation_check.
- Not seen: the rendered appearance. The screenshot is unchecked. The forms need a configured server; their samples are seen on the kitchen-sink page in Slice 10, and the layout of one form in place of two only on the human's visit in H1. Spacing and width of the new rules (`max-width`, `margin-top`) are therefore read from code only.

### Failing run of the tests written first

Before the screen was changed, `npm test -- tests/view/account-screen.test.mjs` (exit 1, import of a missing export) was first brought to the assertions by adding the split functions (they were only a refactor). Then it ran with exit 1: 8 of the 44 tests failed, the 36 others, including the old registration and sign-in cases, passed. The first failed on the assertion "the button stands under „Zaloguj się”"; the other seven stopped on the missing button (`buttonNamed` returned undefined), i.e. a missing element, not on a wrong value. After the screen: exit 0.

### Invariant tests

No invariant test was written or changed. `browser-view-token-values` and `browser-view-focus-outline` are existing guards; they pass after the change (exit 0), the failing run of them was not made because no new rule was added to them (the new CSS uses `var(--…)` tokens only; the only lengths are `max-width: 480px`, a layout dimension exempt in D-43, like the `minmax(260px, …)` already there).

## Own-work check (section 3)

Requirement most likely not met: the sentence of row 3 and everything typed must disappear together on every way out of the request state (back button, `reset` from outside, a new submit), and a late answer after a reset must change nothing. Check: the three cases "„Wróć do logowania” brings back…", "reset from outside…" and "a well-formed address…". Mutation: removing `requestNote.set(null)` from `clearMessages` (`npm test -- tests/view/account-screen.test.mjs`) made exactly those three fail (exit 1, 3 failures); restored, exit 0.

## What was done, by the plan

- `accountForm(title, fields, buttonText = title)` and its type `AccountForm` exported.
- `registrationProblems` split into exported `addressProblem(email): string | null` and `passwordProblems(password, confirmation)` (messages stay in `PROBLEM_MESSAGES`); registration's result is the same (old cases untouched and green, plus a new case that checks the composition).
- `send<Value>(form, waitingText, ask, onSuccess(value, origin))`; login and register pass the shared `signIn`, the request passes its own success.
- Request form joins `forms`; `lock` also locks the two buttons; `clearMessages` also clears the note; `reset` ends with `element.replaceChildren(login.section, register.section)`.
- Buttons: „Nie pamiętam hasła" in the login section after its form, „Wróć do logowania" in the request section after its form (both outside the `<form>`, so neither submits). Each runs `reset()` then swaps and moves focus (to the request address field / to the login address field). While waiting both are ignored (they are also disabled).
- On 204: field emptied, row 3's sentence in the note, focus back to the control the player sent from. Failure: the form's warning, field kept, focus back. Bad address: sentence under the field, focus on it, nothing sent.
- The test's `heldClient` got `requestPasswordReset`; `forms()` helper got `note`.

## Reaches beyond the dispatch

- `.runs/task-cycles/reset-hasla/…/slice.md` and `ui_check.md` of the method (`.the-way/task-cycle/change/`): named by `SKILL.md` for a slice and for a screen change.
- `foundations/decisions.md` D-214 lines are in the handoff; read as given. No other reach.

## Searches not found or unclear

- The plan does not say whether the sentence's text is shared with the kitchen-sink page (Slice 10). I kept `RESET_REQUESTED_SENTENCE` private to `account-screen.ts`; Slice 10 either exports it or writes the sentence into `formSample` itself. Unclear, not blocking.
- The plan does not name the placement or width of the one-form state. I chose `.account-form:only-child { max-width: 480px }`, left to the maker by the spec; it is not seen rendered.

## Choices, with the way rejected and its cost if wrong

- Note placed inside the `<form>` after the warning (under the form, where refusals stand); rejected: outside the form in the section — then `forms()`-style lookups and the grouping of messages differ from the warning. Cost if wrong: a one-line move.
- Back button and opener button outside the `<form>`: rejected inside, because a second `button` in the form would be found as "the form's button" by the test helper and by a reader of the DOM. Cost: none beyond layout.
- Focus after 204 goes to the control sent from (as for a failure), not to the sentence: the field is empty and ready for another request.
- Only `addressProblem` and `passwordProblems` are exported rules (the spec names two: the address and the two-password rule); the length rule alone is not separately exported.

## Problems observed

None. One tooling note: Bash heredocs with certain quoting aborted once with "unexpected EOF" yet had applied part of the edits; the final file states were verified by diff and tests.
