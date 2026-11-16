# Designer report — przejscie-widoku-na-react

**Status:** done

- Spec: `docs/task-cycles/przejscie-widoku-na-react/spec.md`
- Method: `.the-way/task-cycle/spec/SKILL.md` and `design.md`, designer's variant, at `.the-way` `bfb2e109735b5fff98802b8be0ff3c43c799262a` (the pinned commit; checked with `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way`).

## Questions sent and their answers

None. Every point that looked open was settled by a source or is a design choice the spec weighs:

- Which assertions loop2#62-10 means: the record of request #62 (`git show 905c1ab8:docs/task-cycles/napis-o-awarii/request.md`, *Minor findings* 4, "M-4") names exactly two — the live-interval count "the clock no longer ticks" and the `console.warn` count — matching To do 7's two. The other live-interval count, in `assertWaitingWithSentence`, is left (see Observations).
- The task lists the row of the failure among what React draws (To do 2) while the carried question asks that no root's error take it down: Decision 1 satisfies both, so no question.
- Reserved choices: none met. esbuild already bundles the game (D-263); React is the view's framework (D-03); no library, store or framework is added.

## Ways weighed

The spec carries each with its cost; in short:

1. **The failure sentence in the header** — chosen: its own root, drawn at the start into a hidden host, shown at the error by the page without a render. Rejected: rendering at the error (React refuses `flushSync` inside its commit with a `console.error`, so the render is late and depends on React still working); built by hand outside React (robust, but contradicts To do 2's list); inside the bar's or the saver's root (an error there takes it down).
2. **Roots of the start page** — menu bar, row of the failure, row of saving in the header; waiting screen, sentences above the game in main; game and card as today. Rejected: one skeleton root (question 2 b); waiting screen and sentences in one root; rows read through `useSyncExternalStore` (late by a microtask, one reader each).
3. **The page's one value** — three kinds (checking with four waiting states incl. `stopped`, card, game with logout and reset phases). Rejected: logout as a kind of its own (a reset can succeed during a logout; the game acts during it); keeping the variables.
4. **Kitchen-sink bundling** — `tsc` into a staging directory inside `dist/kitchen-sink/`, esbuild into the existing entry path, staging removed, React's development build, not minified. Rejected: esbuild reading sources; compiler output left in the served directory; staging outside `dist/kitchen-sink/`; production build.
5. **Forced hover/focus on the page** — class on a wrapper, CSS pointed at the control inside. Rejected: a class prop on every shared control; writing classes into React's elements.
6. **Empty number field on the page** — one optional starting-text prop of `ReactNumberField`. Rejected: dispatching `input` through the native setter from the page; `value={NaN}`; an untrue "Nie dotyczy".

## The four checks

1. Placeholders, `TBD`, empty sections: none after one fix (a wrong cross-reference "Decision 4 of To do 6" in Decision 2 corrected).
2. Contradictions: the goal of To do 7 widened to name the precondition and the added cases, so it agrees with Decision 7; the rest agrees with the task's settlements and answers, D-323, D-262, D-381, D-76, D-273, D-45.
3. Several independent changes: yes, in part. To do 7 (two test assertions) is independent of the rest; To do 3 (one value) could be done without React; To do 1 depends on To do 5 and To do 5 on To do 2 (the start page must leave the DOM forms before they go). The task bundles them on purpose; the plan can slice along them.
4. Requirements readable two ways, settled in the spec: which interval assertion To do 7 means (the "clock no longer ticks" one); what "samo zdanie" leaves on the waiting screen (its root draws no text, the header's row is the sentence); what "drawn in React" leaves the page to build by hand (only mount places and the To do 6 panel).

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-263, D-264, D-266 (the game's bundling shape and the test harness), D-272, D-273 (sprites stay out of the kitchen-sink page), D-381 (the card's opening and closing), D-270 (read in passing, adjacent to D-269); the *Verification* lines of D-275 and D-276 by search for "both forms" — to find entries the change touches.
- Code: `scripts/static-files.mjs`, `tsconfig.browser.json`, `src/browser/index.html`, `src/browser/main.ts`, `src/browser/view/state-store.ts` (excerpts), `src/browser/styles.css` (rules of the header rows, notices, session check, card), `eslint.config.mjs` (excerpt: `.tsx` under `src/browser` linted), `README.md` (search) — to see what the build and the rows depend on.
- Tests: `tests/invariants/test_application_build_kitchen_sink.py` (whole), `tests/invariants/test_application_build_output.py` (docstring), `tests/invariants/test_browser_view_focus_outline.py` (docstring), `tests/view/game-saver.test.mjs` (harness and `sentenceOf`), `tests/view/page-document.mjs` (`fire`, `press`, `settle`), `tests/view/account-screen.test.mjs` and `tests/view/previous-save.test.mjs` (searches and excerpts for the classes and clicks they rely on) — to know which tests the design must keep passing.
- History: `git log` for the commits that brought the DOM failure row, the panel and the kitchen-sink script (`cbe0a663`, `c0337587`, `73b0563a`; titles only); `gh pr view 62` and `git show 905c1ab8:docs/task-cycles/napis-o-awarii/request.md` — the method asks for the reason of the code being rebuilt, and the findings M-1, M-4 and 8 identify loop2#62-7, #62-10 and #62-5.

## Observations for the orchestrator

- **Styleguide and the number field's empty state.** "States of shared controls" gives fields an empty state "puste pole z podpowiedzią w `text-label`"; the React number field has no hint, the DOM form had „liczba”. The page will now show the field as the game draws it, with no hint. The mismatch predates this change; the spec neither adds a hint nor rewrites that sentence.
- **A third live-interval count.** `assertWaitingWithSentence` (`tests/view/uncaught-failure.test.mjs:777`) counts live intervals as "no clock and no saver", the same kind of detail M-4 named; To do 7 names two assertions and this is not one, so the spec leaves it.
- **Two hypotheses the maker or the reviewer confirms**: that a screen reader announces an alert whose host turns from hidden to shown (Decision 1); that clicks on the React „Spróbuj ponownie” outside `act` raise React's act warning in the harness (Decision 7) — reasoned from React's behaviour, not run.
- The task gives the comparison test as 1280 lines; at the base commit it has 1335.

## Working copies

None made; `.runs/designer/` was not created.

**Unread material:**

- `foundations/decisions.md`: D-253 and D-225 read whole except the last lines of their *Rejected* paragraphs.
- `src/browser/view/controls/button.ts`, `text-field.ts`, `number-field.ts`, `pick-cell.ts` — not read (their React forms and their users were; `select-list.ts` read whole).
- `src/browser/view/account-card.tsx` — lines 1–130 and 580–744 (header, options, `Card`, `createFailureCard`, `createAccountCard`), not the forms between.
- `src/browser/view/menu-bar.tsx` — lines 1–80 and 325–362 (props and factory).
- `src/browser/view/game-view.ts` — lines 85–305; `src/browser/view/state-store.ts` — excerpts on the saver and `saveLine`.
- `src/browser/kitchen-sink/kitchen-sink.css` — lines 1–120 of 188.
- `tests/view/react-controls.test.mjs` — lines 1–130, 270–330, 540–720, 940–1120 and every test name by search.
- `tests/view/uncaught-failure.test.mjs` — lines 1–430 and 590–1020; 430–590 by search only.
- The tests that call `startApp`: `tests/view/account-screen.test.mjs`, `previous-save.test.mjs` — by search and excerpts; `tests/view/owner-panel.test.mjs` — by search only.
- `foundations/glossary.md` — headings only: none of the terms this spec uses has an entry.

**Searches not found or unclear:**

- loop2#62-10, #62-5 and #62-7 as written appear nowhere in the repository; matched by content to M-4, minor finding 8 and M-1 of request #62's record — unclear only in the numbering.
- A reason in the descriptions of the commits `cbe0a663`, `73b0563a`, `c0337587` for the shapes being rebuilt: none beyond their titles; the reasons quoted are those of D-265, D-269 and D-323.
- A rule or source on whether a screen reader announces a `role="alert"` element made visible: not looked up; left as a hypothesis.
