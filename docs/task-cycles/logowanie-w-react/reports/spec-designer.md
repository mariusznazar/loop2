# Report — designer of the spec, task `logowanie-w-react`

Status: done.
Spec: `.runs/task-cycles/logowanie-w-react/spec.md`.
Worktree `C:\Storage\repos\loop2-wt\logowanie-w-react`, base 3d366c8, the-way at the pinned f45ca40. No tracked file changed: `git status --short` is empty.

The work ran over two sessions. The first ended before anything was written, and the second finished the last trial and wrote both files. In the trial's harness I found a guard, `dropFocusOfDisabled` under `TRIAL_FIXUP`, of which I have no record of writing. I read it, it does what its name says, and I used it as it stood.

## Questions

None were sent, in no batch. Each open choice is one the handoff gives this spec to settle, and each assumption that could change the design was either measured or is the smallest reversible reading, which the spec writes down:

- React in `dependencies` rather than `devDependencies` (spec decision 4). Cost either way: about 8 MB in the image.
- No tool for React's rules (decision 5). This is the reading that changes no decision, so it needs no human. The orchestrator may put it to the human at the request; the spec says so.
- The readings of decision 8: pressing the switch's selected button does nothing; the lock leaves the credits usable.

No reserved choice arose. The choice of test tool was ruled no reserved choice by the orchestrator; esbuild and React are settled by the task; `.the-way/project-level/technology/reserved_choices.md` was read for the rest. jsdom's version and `eslint-plugin-react-hooks` fall outside its stopping test: the first is a test tool one task can change alone, the second is not taken.

## Trials

All in `.runs/task-cycles/logowanie-w-react/spec-trials/react-card/`, a `git archive` of the base with its own `node_modules`, installed with `--ignore-scripts`. The spike there is throwaway: `src/browser/view/account-card.tsx`, `controls/react-controls.tsx`, `account-rules.ts`, and changed `app.ts`, `password-reset.ts`, `build.mjs`, `tsconfig.browser.json`. Its server is stopped and no browser is left open. Registry versions read 2026-11-02: react and react-dom 19.3.1, `@types/react` and `@types/react-dom` 19.3.0, esbuild 0.28.2, jsdom 30.1.3, happy-dom 21.0.4, `eslint-plugin-react-hooks` 7.1.1. Node 24.17.0, system npm 11.13.0.

Test document:

- **Base.** `tests/view/account-screen.test.mjs` on the hand-made model: 69 cases pass, 0.41 s.
- **The same cases on the imitations**, with `Element.prototype` adapted to the model's names (`tests/view/trial-harness.mjs`, `account-screen.trial.mjs`). jsdom: 68 of 69, 2.95 s. happy-dom: 25 of 69 pass at first, and the most common error, 12 times, reads `Option is not a constructor`; with an `Option` written in the harness, 68 of 69, 1.87 s. The one failure on both is the case that shadows `textContent`, whose stand-in starts undefined.
- **React inside the DOM page** (`tests/view/card.trial.mjs`, `card-harness.mjs`). 6 behaviour cases pass on both: card and hidden header, switch, refused login with focus, sign-in through the game in DOM to logout, „Anuluj” inside React's click, set password. The seventh case counts `console.error`, and it fails on both for one reason only: „not wrapped in act” from a mount outside `act`. No warning about `flushSync` or unmounting.
- **Behaviour probes** (`trial-probe.mjs`, `trial-focus.mjs`). Same on both: a disabled focused control keeps focus and `blur()` does not drop it, Enter sends no form, a click on a label moves no focus, a summary opens its details. They differ in `window.Option` and in `getComputedStyle` for `hidden`.
- **Import order** (`trial-order.mjs`, `trial-order2.mjs`), jsdom only. With `window` installed after `react-dom`, `onChange` fires 0 times; before it, once.
- **Focus mutation.** With the code that returns focus removed, the case passes without the guard and fails with it, on both imitations.
- **A failing `assert.equal` on two elements** did not end within 60 s on either imitation; with a comparison by identity the failure reports at once.
- **Audit under D-33** (`trial-audit.mjs`, pinned npm, the D-33 command). Base 48 advisories; all new packages together, jsdom alone and happy-dom alone give the same 48, so none is new. Lock entries: base 509, jsdom 576, happy-dom 549.

Build:

- **Type-check and compile.** Exit 0 with `jsx: react-jsx` and `types: []`. `process` is still refused in `.ts` and `.tsx` (TS2591: note the code, the test matches the words „Cannot find name 'process'”).
- **Bundle.** Base 382,894 bytes in 58 modules; minified 357,727 (gzip 112,179, brotli 97,480); unminified 929,736. Whole trial build 0.8 s, browser configuration only.
- **The framework guard's regexes run on the bundle.** No import specifier; of the markers only `__REACT_DEVTOOLS_GLOBAL_HOOK__`; 5 `@license`; no `process.env`.
- **Lockfile.** 26 esbuild platform packages, `@esbuild/linux-x64` among them.
- **ESLint** on the two `.tsx` files with the base's `eslint.config.mjs`: no report, 7 s. Prettier flags the spike's formatting, which shows only that it reads the file.
- **`browser-view-token-values`' reader** on the spike: no finding, and a colour in a `style` attribute is found. An ASCII apostrophe in JSX text can open a false string; that is a note for the maker's control, not a defect found.

Kitchen-sink and real browser:

- `scripts/kitchen-sink.mjs` compared equal to the base; `--build-only` exits 0; no bare import in `dist/kitchen-sink`.
- In Chromium through Playwright CLI: 5 sections, 10 form samples, one console error, a missing favicon.
- The game page with the bundle, a stub answering 401 on `/api/account`: one script, the card drawn 400 px wide, the header hidden; console errors only that 401 and the favicon.

Other:

- **Controls** (`trial-parity.mjs`): a comparison of tag, attributes and text gives „same” for submit, selected and waiting buttons, and for fields differs only in the `value` attribute of a controlled input, in static markup. The client render was not compared; the spec leaves `value` out in either case.
- **Credits** (`trial-ssr.mjs`): static markup with `document` undefined works; `createFooter` draws on jsdom.

## Ways weighed

The spec's *Decisions* hold each rejected way with why it lost and the cost if the choice is wrong. In short:

1. **Test document.** jsdom. happy-dom lost because the page's path needs an `Option` written by the test, against a second saved and 27 lockfile entries; the extended hand-made model and real-browser tests lost outright.
2. **Controls.** Two forms with one element tree and a comparison test. Wrapped DOM elements lost because they would be what D-36 makes the exemplar; React controls in DOM screens lost on a root per control; a shared class function lost as needless.
3. **Mounting.** `createAccountCard` with `{ element, focus(), dispose() }`, a root per opening, `flushSync`, one exit function. A root for the page's life, a card kept hidden, an asynchronous render and `root.replaceChildren` lost.
4. **Layout.** `dist/browser/` for modules, `dist/public/` for what is served. The closest rival, modules left in `dist/public/` beside a renamed bundle, costs no test line but serves 58 unusable modules and needs a hole in the framework guard. The chosen way costs 282 lines in 78 test files, mechanical and failing loudly when missed.
5. **React's rules.** Guideline and review, with a report of React's development build failing a test. The plugin needs a human change of D-29.
6. **Kitchen-sink.** No change of the script. Bundling the page lost.

## The four checks

1. **Placeholder, `TBD`, empty section:** none; a search of the spec finds none and every section has content.
2. **Contradictions:** one found and fixed. The spec first called all six places of `main.replaceChildren` non-card; two of them place the card. Also corrected: „7 cases” of the spike to 6, since the seventh is the console count; the unit table's claim of who imports `account-screen.ts`. No decision contradicts the task or the foundation. D-96's projected wording lacks the load-error clause the base added; the spec keeps the clause, as the handoff's reconciliation gives.
3. **Several independent changes?** No: React cannot enter without the bundle, and the card's tests cannot run without the new document. It does fall into stages the plan can slice, and the imitation port can be proved on the DOM page before React arrives, as the trial did.
4. **Requirements readable two ways:** settled in decision 8 (the selected switch button, the lock and the credits, the order in the card, the card's width) and in decision 3 (which openings move focus).

## Reaches beyond the dispatch

- `.the-way/project-level/technology/reserved_choices.md`: named by the method, read to place the choices.
- `guidelines/coding-content-data.md`, head: the new data file.
- `tests/invariants/test_application_build_kitchen_sink.py`, `test_icon_credits.py`, `test_browser_view_framework.py`, `test_application_build_output.py`, `test_application_package_layout.py`, `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `loop2_invariant_support.py`: to check each invariant on the layout.
- `tests/quality/test_quality_invariants.py`: Prettier's patterns take `.tsx`.
- `scripts/audit_dependencies.py`, `scripts/test.py`, `scripts/test-node-file.mjs`, `package.json`, `.dockerignore`, `tests/http.test.mjs`, `src/server/app.ts`: what the layout touches.
- `src/browser/view/email-confirmation.ts`, `footer.ts`, `credits.ts`, `controls/button.ts`, `controls/text-field.ts`, `main.ts`, `styles.css`: the code the choices depend on.
- `README.md`, `.claude/skills/loop2-deploy/` lines: to fix current anchors.
- D-32, D-46, D-79, D-255, D-256: stood inside the ranges read; D-32 bears on `.tsx` formatting.
- `foundations/invariants.md`: `focused-test-execution` and `font-file-provenance` stood inside the ranges read.

Nothing else was read beyond the sources the handoff names. `cycle.md` was not read, as the handoff asks.

## What was not run

The full gate on any of this; the `Dockerfile`; Stryker, whose `buildCommand` is judged unchanged by reading, not by a run; ESLint beyond the spike's two files; `npm ci` on Linux; the audit by `scripts/audit_dependencies.py` itself, whose command was run by hand; the temporary-directory script of `test_icon_credits.py` reaching `react`, which stays a maker's matter in decision 7; `eslint-plugin-react-hooks`. The spec's *Left to the maker* names what the change must run.

## Searches not found or unclear

- The task counts 67 cases and 3262 lines in `tests/view/account-screen.test.mjs`; on the base the runner counts 69 and the file has 3381. The handoff gives the lines, not the cases. The spec uses 69.
- The task cites `README.md:11` for the step of `npm run build`; on the base it stands at `README.md:25`, and the handoff's reconciliation does not name this line. `README.md:3` stands as cited.
- `tests/invariants/test_simulation_randomness.py:54` lists code extensions without `.tsx`, and To do 14 does not name it. It reads `src/browser/sim/` alone, where no `.tsx` can stand under `simulation-isolation`, so the spec leaves it. It is named here so the choice is visible.
- `guidelines/testing.md`, `guidelines/coding.md` and the task's *Decisions in play* say nothing on where the new data file's row belongs; the spec puts it in `guidelines/coding-content-data.md`, the table of its kind, on the coding-guidelines route.
- Whether the words „above the account forms” in D-97, D-156, D-160, D-211 and D-225 need a change once the sentence stands inside the card: the task records only S3. The spec reads them as still true, with S3 saying where. The foundation step may judge otherwise.
- The origin of `dropFocusOfDisabled` in the trial's harness, as said at the top.
