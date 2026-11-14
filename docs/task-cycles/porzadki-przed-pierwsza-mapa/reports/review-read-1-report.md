PASS 76fb7bcbe427ff7abde71018b6a2ae8a2fb70a5e

# Read-whole review of the decisions the whole-change review left unread

Reviewer: fresh, read-only, made none of the change. Method: `.the-way/task-cycle/review/SKILL.md` and
`whole_change.md`. Dispatch: `reports/review-read-1-handoff.md` (the human's remark 2 of
`reports/remarks-1.md`).

Range judged: `git diff 6ab6a32b..7d61f0f3` (82 files). Decisions read from the committed text,
`git show 76fb7bcb:foundations/decisions.md`, each from its heading to the next `###` heading.
Note: `git rev-parse HEAD` was `76fb7bcb` when I began and `d7cddb27` (one commit, D-393/D-395
rationale wording, written by the other agent) when I finished; I judged the committed text of
`76fb7bcb`, and D-393 to D-395 only as the change's own entries.

## Findings

None. Blocking: 0. Minor: 0. Out of scope: 0.

Two things I looked at hard and found sound, because the next task (the first new map) will build on
them:

- `src/browser/view/controls/react-number-field.tsx`, whole. The one rule-taking path replaces the
  two old paths (range rule and `rule="trip"`) without a behavioural change. I compared them step by
  step: Enter (range: `setDraft(String(commit(draft)))`, trip: `commitTrip` then `setDraft(String(count))`),
  blur (trip: a text the rule rejects stays in the field and is reported only when typed; otherwise
  commit when typed, then `setDraft(null)`; range: `readNumberField` never returns null, so the
  rejected-text branch is never taken and the old range path is the same as the new one), and focus.
  `readTripCount` returns `{ value, commit: true }`, so a valid count is committed every time, also
  when equal to the held one, as D-181 requires. The control imports only `../../sim/program.js` (a type);
  no file under `controls/` imports a screen module (checked over every import line of the folder).
- `src/browser/view/tabs-area.tsx`, whole. The rename changes names and the header comment only; the
  pick of tab and filter still lives in the chronicle memory read through `useSyncExternalStore`, so
  D-346 (the pick holds through leaving the screen, through „Restart" and through a rule panel opened)
  is as before. Hooks stand at the top level of each function component, before the early return in
  `ChronicleList`; the file has no Effect.

## Decision by decision (all twenty-one read whole, as the handoff lists them)

- **D-44** (the eight shared controls). Read whole. Bears on the change through the number field. The
  change keeps the field a shared control built from the same tree; nothing it does is on the
  decision's "violates" list (no module makes its own `<button>`; the field takes its rule from the
  screen, which D-395 settles and D-44 does not contradict). Holds.
- **D-267** (rules of hooks and effects). Read whole. The change adds no Hook and no Effect; it removes
  `createRoot`/`flushSync` wrappers from `rule-list.tsx`, `rule-panel.tsx` and `trip-plan.tsx` (all
  called outside render); the one new inline function, `rule={(text, held) => readNumberField(...)}`
  in `rule-panel.tsx:487`, is an event-time callback, not a Hook or an Effect dependency. The three
  components' remaining Hooks (`useLayoutEffect`, `useRef`, `useState`) are untouched. Holds.
- **D-276** (what a tab is). Read whole. The tabs of the area keep `kind="tab"` on the shared button
  (`tabs-area.tsx:201`); the rename changes no look, element, `aria-pressed` or key handling. Holds.
- **D-311** (layout of the screen of a map run). Read whole. The area with the tabs still stands under
  the drawing of the map in the left column (`run-screen.tsx:192`, section class `screen-area run-tabs`);
  the decision names the area by its role, never by the module name. Nothing it says is untrue after
  the rename. Holds.
- **D-343** (the chronicle's filters and entries). Read whole. Filters and entry rows in `tabs-area.tsx`
  are unchanged. Holds.
- **D-346** (how long the pick of a tab holds). Read whole. See above: the pick is the chronicle
  memory's, which the change does not touch. Holds.
- **D-18** (content lives in the data files). Read whole. The change moves the tests from the position
  of an entry to its identifier, which is the direction D-18 asks (a map added by data alone breaks no
  test); no content moves into code. `content-identifiers` (read whole) covers `src/`, which the
  change leaves. Holds.
- **D-35** (exemplar of simulation modules, `src/browser/sim/game.ts`). Read whole. The change removes a
  `map` argument from `judgeProgram` in `game.ts:174`; the file keeps its role (explicit input,
  state plus events). `mapOf` still has six other users in the file, so no import is left over. Holds.
- **D-36** (exemplar of browser modules, `account-card.tsx`). Read whole. Untouched file; the
  guideline table `guidelines/coding-browser-module.md` still names the exemplar and now lists
  `tabs-area.tsx` where `right-area.tsx` stood. Holds.
- **D-85** (exemplars of the test levels). Read whole. The unit exemplar is still in
  `tests/sim/traits.test.mjs:102` ("the count of a hand-made backpack is the pieces of all items
  together"); the change only turns its file's map into `"forest"` by identifier and one `first` item
  into `"stick"`, leaving the exemplar's hand-written data and sums as they were. The integration and
  smoke exemplars are in files the change does not touch. Holds.
- **D-88** (real events, focus, SVG not automated). Read whole. The shared `press` and `fire` in
  `tests/view/page-document.mjs` run in the document imitation; the change claims no more for them
  than the logic they run (their comments say "as a browser does", which describes the event's shape).
  No test of a real browser is added or dropped. Holds.
- **D-89** (revisiting a testing exclusion). Read whole. The change touches no category deliberately
  left untested (no player journey, no whole-screen comparison, no real-browser test is added or
  removed); the condition of return is not met by anything here. Holds.
- **D-130** (the pace buttons). Read whole. Reads on nothing of the change: the pace buttons are in
  the header (`run-header.tsx`), which the change does not touch; the `ReactButton` they use is
  untouched.
- **D-263** (esbuild bundles the browser's code). Read whole. `scripts/build.mjs` gains the third
  check step only; the bundling step and the single bundler are untouched. Holds.
- **D-269** (the kitchen-sink page holds no React). Read whole. The page's imports
  (`src/browser/kitchen-sink/kitchen-sink.ts:14-36`) reach `controls/number-field.ts` (the DOM form,
  untouched; it imports only `text-field.ts`), `account-rules`, `email-status`, `terrain-picture`,
  `sim/data/resources` and `sim/hex`; none reaches a `.tsx` file, none reaches `trip-editor.ts` (which
  now has a type-only import of the React number field). Holds.
- **D-76** (fonts and preview server refusal tests), **D-79** (npm registry contract), **D-163**
  (Outsider SMTP), **D-235** (Strych and `pusher`), **D-273** (sprite files): read whole. Each is a
  departure from the test template for a boundary the change does not reach: fonts and the preview
  server's serving (the change leaves `scripts/kitchen-sink.mjs`, `static-files.mjs` and the fonts
  alone, and D-76's own sentence says a change of how the page is built is not a change of the
  boundary), the registry audit, the mailer, the backup script and `assets/sprites/`. The two new tests
  (`tests/invariants/test_simulation_type_check.py`, `tests/quality/test_source_tool_scope.py`) work in
  a copy of the tree and reach no service. Bears on nothing of the change.
- **D-06** (build). Read whole, against `scripts/build.mjs` and `tsconfig.sim.json`. The text the change
  wrote says the build "type-checks the simulation's files under a third configuration of their own
  that emits nothing", and that is what the code does: the loop runs `tsconfig.sim.json`,
  `tsconfig.browser.json`, `tsconfig.server.json`, and `tsconfig.sim.json` has `noEmit`. The linked
  invariants `application-build-layout` and `application-build-output` (read whole) say "distinct
  configurations for the browser and server" and "compiles both the browser and the server
  configurations": both stay true with a third, checking-only configuration (the test of the second
  names "a configuration other than the two named" as outside its scope). Holds.
- **D-07** (server computes nothing of the game). Read whole. The change moves no computation to the
  server; the simulation stays browser code. Bears on nothing.

Invariants and glossary read as far as judging needed, each whole: `application-package-layout`,
`application-build-layout`, `application-build-output`, `content-identifiers`, `sprite-file-content`,
`simulation-isolation`. The part map's diff (the `build-tools` text, `tsconfig.sim.json` and
`tests/invariants/test_simulation_type_check.py` in its files) and the invariants' diff were read as
written; no glossary term in the changed files lacks an entry that a sentence there would be read
wrongly for.

## Declined to judge

- The correctness of D-393, D-394, D-395 and the other entries the change writes: judged by the earlier
  review of the whole change and the fix reviews, and being corrected now by another agent.
- Whether the number field's `NumberRule` should be documented as called more than once per commit
  (`handleBlur` asks the rule for null, then `commit` asks again): the old trip path did the same with
  `tripCount`, both rules are pure, and nothing the task asks reaches it.
- The test files, apart from the ones a decision binds (`react-controls.test.mjs` for the number field,
  `traits.test.mjs` for D-85, `test_simulation_type_check.py` read whole): judged by the earlier
  review.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` in the worktree: exit 0, "0 errors". It reads
  the working tree, in which another agent was editing `foundations/decisions.md` (the tree was at
  `d7cddb27`); the result is for that tree, not for `76fb7bcb` alone.
- `git grep -n -i "right-area|RightArea|createTripPlan|createRuleList|createRulePanel|rule=\"trip\"|rule-panel-host|trip-plan-host" 76fb7bcb -- . ':!.runs' ':!.the-way'`:
  the only hit is the rejected way of D-395, which quotes `rule="trip"` as the old shape; exit 0. No
  stale name remains in code, guidelines or styles.
- `git diff --check 6ab6a32b..7d61f0f3`: exit 0, no whitespace errors.
- Manual: step-by-step comparison of the old and new commit/blur/Enter/focus paths of the number field
  (see Findings); import scan of `src/browser/view/controls/` (no screen import) and of
  `src/browser/kitchen-sink/kitchen-sink.ts` (no `.tsx`).
- Not run: `npm test`, `npm run build`, any test that builds `dist/` (forbidden by the handoff); the
  invariant tests `test_simulation_type_check.py` and `test_application_build_output.py` run
  `npm run build` in a copy, so I read them instead.

## Reaches beyond the dispatch

- `git show 76fb7bcb:foundations/invariants.md` and the entries `application-package-layout`,
  `application-build-layout`, `application-build-output`, `content-identifiers`, `sprite-file-content`,
  `simulation-isolation`: the invariants the decisions D-06, D-18 and D-273 verify through.
- D-393 and D-395 in the committed text: to judge D-06 and D-44 against what the change wrote.
- `tests/invariants/test_application_build_output.py` (header only) for the scope of the build invariant.

## Unread material

Counts: of my selection, **all 21 decisions of the handoff read whole** (D-44, D-267, D-276, D-311,
D-343, D-346, D-18, D-35, D-36, D-85, D-88, D-89, D-130, D-263, D-269, D-76, D-79, D-163, D-235, D-273,
D-06 and D-07; that is 22 headings, the handoff's "twenty-one" counting the five "read in part" with
the fifteen and D-06, D-07 as listed), none by title only. Nothing of the dispatch is unread, with these
limits: the decisions D-06 and D-07 were read whole but the changed paragraphs of D-06 were also checked
against the diff; the test files were read only where a decision binds them (see Declined to judge); I did
not re-read the guidelines files whole, which the earlier review read whole.

## Searches not found or unclear

- The handoff says "twenty-one" decisions but lists twenty-two identifiers (fifteen the earlier review
  did not open, five read in part, D-06 and D-07). I read all twenty-two.
- No test or rule pins that the code of `tsconfig.sim.json` is `noEmit`; the new test
  `test_the_build_writes_nothing_beside_the_sources_of_the_simulation` pins the effect, which I judged
  enough (the earlier review's M6 is the same question).
