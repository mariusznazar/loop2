# Slice 10 report - The card and its four states

**Status:** done with concerns. The one concern: the work needed two control files and their test, which the slice's *Change* does not list (see Adaptations).

**Branch:** task/logowanie-w-react, base 00212956394ad4b1525286fc7c20bbd3dacd97a6.

## Commits

- 4f51d7f feat: let the React button lock with its text kept and the React field carry the keyboard of an address, each kept alike with its DOM form
- 8723f9b style: format the cases of the locked button and the address field as Prettier leaves them
- 6cc3b88 feat: add the login card and its four states in React, built by createAccountCard, with cases that drive it as the page will

## Files changed (added / removed lines, base to HEAD)

| File | + | - |
|---|---|---|
| src/browser/view/account-card.tsx (new) | 653 | 0 |
| tests/view/account-screen.test.mjs | 1053 | 1 |
| src/browser/view/controls/react-button.tsx | 4 | 1 |
| src/browser/view/controls/react-text-field.tsx | 8 | 0 |
| tests/view/react-controls.test.mjs | 52 | 0 |

`src/browser/view/app.ts` is unchanged, so nothing a player sees changes.

## Checks (command, exit code)

Tests written first:

- `npm test -- tests/view/react-controls.test.mjs`, before the three new cases: exit 0, 21 pass (baseline).
- The same, with the three new cases and the controls unchanged: exit 1, 24 tests, 3 fail, each at the harness's comparison of plain data (a missing `disabled` twice, the missing `inputmode` and `spellcheck` once). With the props: exit 0, 24 pass.
- `npm test -- tests/view/account-screen.test.mjs` against an empty stub of `createAccountCard`: exit 1, 96 tests, 69 pass, 27 fail. In this first run 8 stopped on a `TypeError` from pressing a button that did not stand, which is no failure by the method, so `press` and `sendForm` gained an assertion on their target.
- The same, run again: exit 1, 96 tests, 69 pass, 27 fail, each at an assertion, 0 on a `TypeError` or `ReferenceError`. Every new case was seen failing; the 69 cases of `createAccountScreen` stayed green.
- The same with the card: exit 0, 96 pass.

Final runs, on the tree committed in 6cc3b88:

| Command | Exit |
|---|---|
| `npm test -- tests/view/account-screen.test.mjs` | 0 (96 pass) |
| `npm test -- tests/view/react-controls.test.mjs` | 0 (24 pass) |
| `npm test -- tests/view/memory-limit.test.mjs` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` (added by me) | 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` (added by me) | 0 |

A check that failed and then passed: `npm test -- tests/quality/test_quality_invariants.py` exited 1 on its first run: Prettier flagged `tests/view/react-controls.test.mjs`, from my commit 4f51d7f. ESLint passed in that run. After `prettier --write` and commit 8723f9b it exited 0. This was a real fault of mine, not an unstable test.

Not run:

- Full `npm test` and the product gate: the handoff and the method leave them to the orchestrator.
- `python -B .the-way/elements/common/foundation_check.py`: part of the gate. So the part of the new file is unchecked by a run; `foundations/part_map.md:10` claims `src/browser/view/**`.
- Screenshot of the running product (`ui_check.md`): unchecked. `app.ts` does not use the card, and its CSS comes in Slice 11, so the product shows no card to photograph. No rendered appearance of the card has been judged. The browser walk below reads behaviour only, on a page without the game's stylesheet.

## Own-work check

**Requirement most likely unmet:** To do 5, each form working as today, for what jsdom cannot show. Spec decision 1 says jsdom does not prove that Enter sends a form or that a click on a label moves focus, and the loss of focus by a disabled control is only imitated by the harness. Every focus case here rests on that imitation.

**Check:** a throwaway page outside the repository bundled the real `account-card.tsx` with esbuild and a client answered by hand, served on 127.0.0.1 only (`file:` is blocked by Playwright, and that setting was left alone), and driven with `playwright-cli` in Chromium. Readings are in `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\80e715fa-45f2-474f-ab5a-30785e95c924\scratchpad\browser-check\walk.txt`.

**What it showed, all as required:**

- A click on the label „Hasło” put focus in its field.
- Enter in the password field sent `login` once, with what was typed; all 6 controls were disabled and the button read „Logowanie…”.
- Focus really fell to `body` during the wait, so the harness's imitation matches Chromium.
- After a refusal: the card unlocked, one warning stood under the form, focus was back on the password field and the values stayed.
- The switch emptied the fields, removed the warning, put focus in the address field and left the page's sentence.
- One click opened the credits, and they stayed open across a change of state.
- Tab went through the switch, the fields, the submit button, „Nie pamiętam hasła” and the summary.
- `signedIn` disposed the card from the continuation; the extra field of the answer did not pass on.
- The console held one error, a 404 for `favicon.ico` of my throwaway server, and no report of React.

**Not walked in the browser:** „Nie pamiętam hasła”, „Ustaw nowe hasło” and the waiting of registration. Those are covered on jsdom only, and Slice 11's walk takes them.

**Mutations:** 16 breaks of `account-card.tsx`, each built, run and restored by a script (`scratchpad\mutate.py`, results in `scratchpad\mutations.txt`, both under the same directory as above). 15 were caught by a case that names the break, among them: focus moved before the commit (7 cases), a disposed card acting on an answer, the render made asynchronous (27), the credits remounted, the fragment cleared after the page is told.

**The survivor:** removing `next === state` from `open`. It is an equivalent mutation. React skips a commit for an unchanged state, so the focus request stays pending and lands at the next commit, the one that locks the card, on a field that cannot take focus. No visible behaviour changes. The guard stays, since it says what decision 8 says and leaves no request pending.

## Reaches beyond the dispatch

- `.runs/.../spec.md:74-86`, Decision 2: to learn whether adding a prop to a control fits the spec, once the controls proved short. It does: „a new attribute is written twice; the test fails until both agree”.
- `.runs/.../reports/slice-8.md`, whole: the same question.
- `.runs/.../plan.md`: a search for `styles.css|account-card|createAccountCard`, the rows F1, F3, F5, S1, S2, S3 found by search, and lines 215 and 268 alone: what the rows are, and which slice writes the CSS (Slice 11). The whole plan was not opened.
- `src/browser/styles.css:215-299`: the existing classes of the forms.
- `tests/view/react-controls.test.mjs`, whole: it is changed here.
- `.the-way/task-cycle/change/ui_check.md`, `slice.md`: named by the method.
- `.claude/skills/loop2-play/SKILL.md`, first 60 lines: the route to a real browser.
- `src/browser/view/footer.ts`, first lines: what `CreditsSection` reads.

Everything the slice's *Read* names was read: the three spec and task passages from the handoff, each guideline and code file whole, the Current ranges of the foundation. `tests/view/account-screen.test.mjs` came back cut short at line 1407 and was read on to its end.

## Searches not found or unclear

- `guidelines/coding-browser-module.md` still names `status-row.ts` the exemplar, does not list `account-card.tsx`, and its rule „TypeScript i DOM” still says no UI framework, while D-03 and D-36 say otherwise. I took this for Slice 14's work (row F3 names Slices 10 and 14) and did not change it. Unclear to me whether that row binds anything in Slice 10 beyond the file itself.
- The spec gives the option of the page's sentence no name. I named it `sentence`, the word decision 3 uses for `showForms`.
- The class names of the card stand nowhere. Named under Choices.

## Adaptations (section 4 of the method)

**The React controls could not do what decision 8 requires, and the slice's *Change* lists neither control file.** Spec decision 8 locks every button and keeps `inputmode="email"` and `spellcheck` off on the address; `ReactButton` disabled only while waiting, and `ReactFieldProps` had neither attribute. I treated this as a small mismatch, a signature short of a prop, not a change of shape: the card still builds on the controls, and decision 2 foresees a new attribute written into both forms. Added: `disabled` on `ReactButton`, `inputMode` and `spellCheck` on the fields, with three cases in `tests/view/react-controls.test.mjs` keeping them alike with the DOM forms. If you read it as structural, it stands in its own commit, 4f51d7f.

In those cases the DOM side of `spellcheck` is set by `setAttribute`, since jsdom does not reflect the property. The DOM screen itself uses the property `field.input.spellcheck = false`.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| `ReactButton` gets `disabled` | `waitingText` equal to the button's own text: it would say `aria-busy` on buttons that do not wait, and the styleguide says selected buttons do not wait. `<fieldset disabled>`: `control.disabled` stays false, which every lock case reads. Setting `disabled` through a ref: DOM by hand in the exemplar. | One optional prop to remove. |
| Each form holds its fields as its own state, so a change of state unmounts them (D-260) | One component holding all fields, with a reset of its own for each change | A later screen that keeps fields across states needs another shape. |
| Focus moves in one layout effect of the card, after a request set by a handler | `flushSync` in the continuation: decision 3 uses it once, at the boundary | The effect runs after every commit of the card; it holds nothing unless asked. |
| A closure flag behind `isDisposed` ignores a late answer | A numbered request, as `createAccountScreen` does: `dispose()` is the only way to leave while a form waits, every other way being locked | None seen. |
| Host element `account-card-screen`, card `account-card`, plus `account-card-about` and `account-card-switch`; the sentence as `confirmation-notice`, the form as `account-form` and `form` | Other names: the spec fixes none | Slice 11 renames them with its CSS. |
| The exit button's `account-form-switch` stands on a wrapper `div` | A `className` prop on `ReactButton`: a second change of the control for one margin | One element more. |
| Sign-in empties the fields and unlocks before `signedIn`, as `reset()` does today | Leaving that to `dispose()`, since the page always closes the card | A few lines that matter only if a page does not dispose. |
| `ended` kept in the reset form, as `createResetScreen` has it, with a case | Dropped as unreachable, since the page disposes from `finished` | Two lines. |

## For Slice 11, as observed

- `forms()` in the test file reads every `.account-form` by its `h2`; the card's two switch states have none, so that helper breaks on the card.
- The file's `fire` runs outside act. My cases press and send through `inAct`. Spec decision 1 says a mount outside act is reported; I mounted inside `inAct` throughout and did not measure the outside case.
- `password-reset.ts` still imports `account-screen.ts`, so the card pulls the old DOM module in until that goes.
- The test file now has about 4280 lines; the plan's table named the cost of growing past 3381.
