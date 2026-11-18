# Plan — loop2: struktura kodu — reguła rozmiaru, duże funkcje, narzędzie nieużywanego kodu

- Task: `.runs/task-cycles/struktura-kodu/task-frozen.md`
- Spec: none
- Base: `a3d913dac87160f56b194ce863c60145a551765a`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| The rule of the size of a function and a file: a function holds at most 200 lines of code in all the code the linter reaches (application, scripts, tests), a file at most 800 in the application's code and the scripts (tests outside the file rule), counted without comments and blank lines, the lines of nested functions counted in the function that holds them; exceptions the function `accountRoutes` (`src/server/account-routes.ts`) and the file `src/browser/sim/saved-game.ts`, each with its reason; the rule runs as a separate run of the product's ESLint beside D-29, and its *Relations* say how it stands beside D-29, so that review does not take the second configuration for a break of D-29 (the task's *Decisions in play*) | decision (new) | Settlements row 1 · To do 1 | Slice 1 sets the thresholds, the scope and the two exceptions in the run's configuration and names the decision in `guidelines/coding.md`; Slices 2–6 bring their function under its threshold |
| No function and no file the rule of size reaches is over the thresholds of row 1's decision, other than its exceptions; *Method* `test`, *Violated* `yes` (WAY-51), *Part* the parts holding the code the run reads and the part holding its configuration | invariant (new) | Settlements row 2 · To do 2–3 · cycle choice Q1 | Slice 1 writes its test, which cites it and is marked as an expected failure; check: the main case of `tests/quality/test_function_and_file_size.py` |
| loop2 keeps no tool for unused code in its gate; the run of knip of 2026-11-13 was a one-time review and found one dead function | decision (new) | Settlements row 3 | none of the slices |

The agent of these entries writes the three rows before any slice, through
`.claude/skills/the-way-record-decision/SKILL.md` for rows 1 and 3 and
`.claude/skills/the-way-record-invariant/SKILL.md` for row 2, as
`.the-way/task-cycle/skill/foundation_step.md` gives, each in the meaning of its row and in its own
wording. Row 2's sentence names no function or file over a threshold: the set that keeps it
violated stands at the test's marking (Slice 1, cycle choice Q1). Since its test is written by
Slice 1, this agent runs `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`;
the run without the switch reports row 2's invariant as cited by no test until Slice 1 is made, and
that report is no failure of this agent. No row changes the part map: the configuration of the
rule's run stands in `tests/quality/`, which build-tools already holds (To do 6, Choices).

## Slices

### Slice 1 — the test of the rule of size, its configuration and the rule in the guidelines

- **Goal:** the rule of size has its test in the product's suite and its rule in the coding
  guidelines (To do 1, 2, 3, 5 and 6). `tests/quality/eslint-size-rules.mjs` runs the product's own
  ESLint apart from the run on `eslint.config.mjs`, applying only the built-in rules
  `max-lines-per-function` and `max-lines`, with blank lines and comments skipped and the lines of
  nested functions counted in the function that holds them, at the thresholds of the decision of
  *Foundation entries* row 1: the function rule on every file the run of `eslint.config.mjs` lints,
  the file rule on the same files except those under `tests/`. It takes those files and ignores
  from `eslint.config.mjs` instead of keeping a list of patterns of its own, lets no
  bulk-suppressions file hide a report (as D-29 gives for the linter's run), and its configuration
  lists the decision's two exceptions and no other: the file rule off for
  `src/browser/sim/saved-game.ts`, and of the function rule only the report of `accountRoutes` in
  `src/server/account-routes.ts` dropped, not those of the other functions of that file. Run from
  the repository root with no argument, it prints every function and every file over a threshold
  with its file, line and size, and decides nothing else, as `tests/quality/eslint-rule-sets.mjs`
  only asks the tool. Its name is none that ESLint looks up as a configuration (`eslint.config.*`),
  so the linter's run and `tests/quality/test_source_tool_scope.py` stay as they are.
  `tests/quality/test_function_and_file_size.py` holds two cases: the case that cites the invariant
  of *Foundation entries* row 2 (`# invariant: <identifier>`) and fails naming every function and
  file over a threshold with its place and size; and a control case, not marked, that runs the same
  configuration on made-up files in a temporary directory — a function and a file one line over
  their thresholds reported, a test file over the file threshold not reported, `accountRoutes` over
  the threshold at the exception's place not reported while another function of that file is — so
  that a run that reports nothing because it is broken cannot pass as the expected failure. The
  first case is seen failing before it is marked, then marked as an expected failure
  (`unittest.expectedFailure`, WAY-51), with a comment at the marking naming the code that keeps it
  failing once this change is finished: today `startApp` (`src/browser/view/app.ts`),
  `createProgramsEntry` and its method `build` (`src/browser/view/programs-entry.ts`) and the file
  `src/browser/kitchen-sink/kitchen-sink.tsx` (cycle choice Q1). Where the first failing run shows,
  beside the four views and the test function Slices 2–6 split, a set other than that one, the
  comment names the set found and the report says so. `guidelines/coding.md` gains the rule
  `### Size of a function and a file` right after `### Logging scope`, in the form of the pinned
  coding template: *Decision* the decision of row 1, *Invariant* that of row 2, *Good* and *Bad*
  written or `none`, and a text that says the thresholds and the exceptions stand in that decision,
  repeats none of them and gives no command that counts sizes; its *Where in code* gains both new
  files. No file outside `tests/quality/` is added, so the part map does not change (To do 6).
- **Change:** `tests/quality/eslint-size-rules.mjs` · `tests/quality/test_function_and_file_size.py`
  · `guidelines/coding.md`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:33-61` Questions to settle ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:92-111` Decisions in play, Settlements to record,
  Out of scope · `.runs/task-cycles/struktura-kodu/cycle.md:53-53` Questions and autonomous choices,
  row Q1 · Foundation entries row 1 · Foundation entries row 2 · `foundations/decisions.md:431-445`
  D-28 · `foundations/decisions.md:446-460` D-29 · `foundations/decisions.md:491-505` D-32 ·
  `foundations/decisions.md:826-840` D-73 · `foundations/decisions.md:886-900` D-77 ·
  `foundations/decisions.md:946-960` D-82 · `foundations/decisions.md:961-975` D-83 ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:418-427`
  ruff-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/invariants.md:1228-1237` cross-part-imports · `guidelines/testing.md` ·
  `.the-way/product-guidelines/coding/template.md:60-78` Required form ·
  `.the-way/product-guidelines/coding/template.md:232-255` What each section carries, Size of a
  function and a file · `.the-way/elements/invariants/template.md:44-72` Method and test ·
  `.the-way/elements/invariants/template.md:157-165` Violated ·
  `tests/quality/test_quality_invariants.py` · `tests/quality/eslint-rule-sets.mjs` ·
  `tests/quality/test_source_tool_scope.py` · `eslint.config.mjs`
- **Model:** same — the slice joins a rule of the foundation, a quality test of build-tools and a
  rule of agent-workflow's guidelines, and its expected-failure marking needs a control so that it
  cannot hide a broken run.
- **Risk:** none
- **Checks:** `npm test -- tests/quality/test_function_and_file_size.py` before the marking: fails,
  its message naming each function and file over a threshold with its size — the four views,
  `tests/transport.test.mjs` near line 537 and the set of Q1; after the marking: passes, with one
  expected failure and the control case passed; the control case seen failing once against the
  configuration broken for a moment (for example every report of `account-routes.ts` dropped) and
  then restored, each run in the report · `node tests/quality/eslint-size-rules.mjs` ·
  `npm test -- tests/quality/test_source_tool_scope.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` (ESLint, Prettier and Ruff reach the new
  files; it also runs the dependency audit, which needs the network) ·
  `python -B .the-way/elements/common/foundation_check.py` — 0 errors, row 2's invariant cited
- **Depends on:** Foundation entries row 1 · Foundation entries row 2

### Slice 2 — Scene divided under the threshold of a function

- **Goal:** `Scene` in `src/browser/view/scene.tsx` (about 366 lines of code from line 557) is
  divided so that no function of that file and no new function is over 200 lines of code, with no
  change of what the player sees and of what the module exports (To do 4). Start from the verdict
  of the task's *Context* as a hypothesis to check in the code: the state the scene keeps from one
  reading to the next — the shown walk, the events seen, the last state, the effects, the creature
  effects, the tint and the moment — gathered in one memory object, and its advance from one
  reading to the next a pure function in the new file `src/browser/view/scene-memory.ts`, which the
  component calls in its drawing; the drawing stays in the component and in its existing helper
  components. Hooks stay at the top level of a component or of a custom Hook and an effect keeps
  every value it reads among its dependencies (D-267; the rules Hooki and Efekty of
  `guidelines/coding-browser-module.md`). `scene.tsx` stays at or under 800 lines of code. No style,
  token, data or test changes: behaviour does not change, so the existing tests of the scene are
  the check. Where the verdict's cut does not bring every part under the threshold, the agent cuts
  further inside these two files and says how in its report.
- **Change:** `src/browser/view/scene.tsx` · `src/browser/view/scene-memory.ts`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:92-95` Decisions in play ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:107-111` Out of scope · Foundation entries row 1 ·
  Foundation entries row 2 · `foundations/decisions.md:551-565` D-36 ·
  `foundations/decisions.md:4234-4262` D-267 · `foundations/decisions.md:1021-1035` D-88 ·
  `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:236-247`
  content-identifiers · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447`
  prettier-source-format · `foundations/invariants.md:1228-1237` cross-part-imports ·
  `foundations/invariants.md:1198-1207` loop2-container-sprites · `foundations/glossary.md:18-23`
  map run · `foundations/glossary.md:253-257` reading · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `src/browser/view/scene-picture.ts` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** strongest — the verdict asks a new shape for the state of the component with the
  highest complexity in the code, kept between readings by updates made while it draws, and its
  animations are proven by no test (D-88).
- **Risk:** none
- **Checks:** `node tests/quality/eslint-size-rules.mjs` — no report in `scene.tsx` or
  `scene-memory.ts` · `npm run typecheck` · `node node_modules/eslint/bin/eslint.js --max-warnings 0
  src/browser/view/scene.tsx src/browser/view/scene-memory.ts` · `node
  node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path
  .gitignore src/browser/view/scene.tsx src/browser/view/scene-memory.ts` ·
  `npm test -- tests/view/scene.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` ·
  `npm test -- tests/view/end-window-game.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/view/headquarters-screen.test.mjs` · the manual check of D-88 in a real
  browser by `.claude/skills/loop2-play/SKILL.md`: a manual map run with the mage walking and
  gathering (the flying icon, the dust of a miss), a pause and „Wznów”, a wolf's attack and its
  outcome, and the moment of a death or a completion, each as before the change; motion described
  in the report, no screenshot kept, since nothing the player sees changes
- **Depends on:** Slice 1

### Slice 3 — RuleListView divided under the threshold of a function

- **Goal:** `RuleListView` in `src/browser/view/rule-list.tsx` (about 511 lines of code from line
  215) is divided so that no function of that file and no new function is over 200 lines of code,
  with no change of what the player sees and of what the module exports (To do 4). Start from the
  verdict of the task's *Context* as a hypothesis to check in the code: the dragging of program
  rules and rule groups — the dragged item, the landing, the listener of the page's `dragend` and
  the handlers of the drag's start, passage, drop and leaving — moved to a custom Hook in the new
  file `src/browser/view/rule-drag.ts`; where the rest still stands over the threshold, the drawing
  of a rule's row and of a group's header become components in `rule-list.tsx`. Hooks stay at the
  top level of a component or of a custom Hook, an effect keeps every value it reads among its
  dependencies and the listener it adds is removed by its cleanup (D-267). The file keeps its
  status `do not copy` in the table of `guidelines/coding-browser-module.md`, which does not
  change. No style, token or test changes. Where the verdict's cut does not bring every part under
  the threshold, the agent cuts further inside these two files and says how in its report.
- **Change:** `src/browser/view/rule-list.tsx` · `src/browser/view/rule-drag.ts`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:92-95` Decisions in play ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:107-111` Out of scope · Foundation entries row 1 ·
  Foundation entries row 2 · `foundations/decisions.md:551-565` D-36 ·
  `foundations/decisions.md:4234-4262` D-267 · `foundations/decisions.md:1021-1035` D-88 ·
  `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:236-247`
  content-identifiers · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447`
  prettier-source-format · `foundations/invariants.md:1228-1237` cross-part-imports ·
  `foundations/invariants.md:1208-1217` rule-state-from-pick · `foundations/invariants.md:828-837`
  streak-program-change · `foundations/invariants.md:838-847` saved-program-edit ·
  `foundations/invariants.md:848-857` copy-save · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:53-63` program rule, rule group · `foundations/glossary.md:180-184` copy ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/program-editor.ts` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** same — dragging is made of real browser events that no test on the document
  imitation proves (D-88), and the Hook takes references the list shares with its focus and with
  the seat of the rule panel.
- **Risk:** none
- **Checks:** `node tests/quality/eslint-size-rules.mjs` — no report in `rule-list.tsx` or
  `rule-drag.ts` · `npm run typecheck` · `node node_modules/eslint/bin/eslint.js --max-warnings 0
  src/browser/view/rule-list.tsx src/browser/view/rule-drag.ts` · `node
  node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path
  .gitignore src/browser/view/rule-list.tsx src/browser/view/rule-drag.ts` ·
  `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/view/rule-signs.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · the manual check of D-88 in a real browser by
  `.claude/skills/loop2-play/SKILL.md`: a rule dragged within its group, into another group and onto
  a folded group, a group dragged among groups, the line „tu wyląduje” where the drop lands, a drag
  cancelled with Escape, the arrows at a group's edge and the keyboard's focus after a rule is
  removed, each as before the change; described in the report, no screenshot kept
- **Depends on:** Slice 1

### Slice 4 — RulePanelView divided under the threshold of a function

- **Goal:** `RulePanelView` in `src/browser/view/rule-panel.tsx` (about 345 lines of code from line
  197) is divided so that no function of that file and no new function is over 200 lines of code,
  with no change of what the player sees and of what the module exports (To do 4). Start from the
  verdict of the task's *Context* as a hypothesis to check in the code: `changed`, which gives the
  program after a field takes a value, taken out of the component as a function of the file, and
  the field of a rule group's name a component of its own; where the rest still stands over the
  threshold, the drawing of the pick grid or of a field becomes a component in the same file. Hooks
  stay at the top level of a component or of a custom Hook, and an effect keeps every value it reads
  among its dependencies (D-267). No style, token or test changes. Where the verdict's cut does not
  bring every part under the threshold, the agent cuts further inside this file and says how in its
  report.
- **Change:** `src/browser/view/rule-panel.tsx`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:92-95` Decisions in play ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:107-111` Out of scope · Foundation entries row 1 ·
  Foundation entries row 2 · `foundations/decisions.md:551-565` D-36 ·
  `foundations/decisions.md:4234-4262` D-267 · `foundations/decisions.md:1021-1035` D-88 ·
  `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:236-247`
  content-identifiers · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447`
  prettier-source-format · `foundations/invariants.md:1228-1237` cross-part-imports ·
  `foundations/invariants.md:1208-1217` rule-state-from-pick · `foundations/invariants.md:828-837`
  streak-program-change · `foundations/invariants.md:838-847` saved-program-edit ·
  `foundations/invariants.md:848-857` copy-save · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:53-63` program rule, rule group · `foundations/glossary.md:180-184` copy ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/program-editor.ts` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `node tests/quality/eslint-size-rules.mjs` — no report in `rule-panel.tsx` ·
  `npm run typecheck` · `node node_modules/eslint/bin/eslint.js --max-warnings 0
  src/browser/view/rule-panel.tsx` · `node node_modules/prettier/bin/prettier.cjs --check
  --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/rule-panel.tsx` ·
  `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/discovery-rule.test.mjs` ·
  `npm test -- tests/view/program-panel.test.mjs` · the manual check of D-88 in a real browser by
  `.claude/skills/loop2-play/SKILL.md`: the rule panel opened under a rule and under a group, the
  keyboard in the pick grid (arrows, Enter, a greyed cell), the number field, a group renamed, and
  „✕” giving the focus back, each as before the change; described in the report, no screenshot kept
- **Depends on:** Slice 1

### Slice 5 — ProgramPanelView divided under the threshold of a function

- **Goal:** `ProgramPanelView` in `src/browser/view/program-panel.tsx` (about 293 lines of code
  from line 397) is divided so that no function of that file and no new function is over 200 lines
  of code, with no change of what the player sees and of what the module exports (To do 4). Start
  from the verdict of the task's *Context* as a hypothesis to check in the code: the header of the
  map run's copy with its name field — today the value `runHead` built in the component — a
  component of its own in the same file, taking what it shows and the handlers it calls as props.
  Hooks stay at the top level of a component or of a custom Hook, and an effect keeps every value it
  reads among its dependencies (D-267). `program-panel.tsx` stays at or under 800 lines of code. No
  style, token or test changes. Where the verdict's cut does not bring every part under the
  threshold, the agent cuts further inside this file and says how in its report.
- **Change:** `src/browser/view/program-panel.tsx`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:92-95` Decisions in play ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:107-111` Out of scope · Foundation entries row 1 ·
  Foundation entries row 2 · `foundations/decisions.md:551-565` D-36 ·
  `foundations/decisions.md:4234-4262` D-267 · `foundations/decisions.md:1021-1035` D-88 ·
  `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:236-247`
  content-identifiers · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447`
  prettier-source-format · `foundations/invariants.md:1228-1237` cross-part-imports ·
  `foundations/invariants.md:1208-1217` rule-state-from-pick · `foundations/invariants.md:828-837`
  streak-program-change · `foundations/invariants.md:838-847` saved-program-edit ·
  `foundations/invariants.md:848-857` copy-save · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:180-184` copy · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `node tests/quality/eslint-size-rules.mjs` — no report in `program-panel.tsx` ·
  `npm run typecheck` · `node node_modules/eslint/bin/eslint.js --max-warnings 0
  src/browser/view/program-panel.tsx` · `node node_modules/prettier/bin/prettier.cjs --check
  --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/program-panel.tsx` ·
  `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs` ·
  `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/end-question.test.mjs` ·
  `npm test -- tests/view/previous-save.test.mjs` · the manual check of D-88 in a real browser by
  `.claude/skills/loop2-play/SKILL.md`: on the screen of a map run, the copy renamed, saved in the
  program and as a new program, its unsaved changes shown, the question „Zapisać, odrzucić, wrócić?”
  and the switch of the character to another program; on the screen Programy, a program renamed
  and deleted, each with the keyboard's focus as before the change; described in the report, no
  screenshot kept
- **Depends on:** Slice 1

### Slice 6 — the function of a transport test divided under the threshold

- **Goal:** the case „refused state-changing requests change no account or session and do no
  password work” of `tests/transport.test.mjs`, whose function begins near line 537 and holds about
  238 lines of code (the task's line 517 has moved), is divided so that no function of the file is
  over 200 lines of code (To do 4): for example the preparation of the accounts, links and routes,
  the table of refused variants and the controls with every guard satisfied moved into functions of
  the file. The case keeps its name, which `guidelines/testing.md` cites in its *Trust boundaries*,
  its line `invariant: account-mutation-request-guards` and its decision line, and every route,
  variant, assertion and message as they stand: nothing it proves is weakened, dropped or skipped
  (`guidelines/testing.md`, rule Changing an existing test). The changed case is seen failing once
  against a guard of the account server broken for a moment — for example the check of the Origin
  for one route — and that file is restored byte for byte; the report names the break, the command
  and the failure. No file under `src/` changes in the slice's commits.
- **Change:** `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context · Foundation entries row 1 ·
  Foundation entries row 2 · `foundations/decisions.md:826-840` D-73 ·
  `foundations/decisions.md:901-915` D-78 · `foundations/decisions.md:946-960` D-82 ·
  `foundations/decisions.md:976-990` D-84 · `foundations/invariants.md:738-747`
  account-mutation-request-guards · `foundations/invariants.md:408-417` eslint-source-rules ·
  `foundations/invariants.md:438-447` prettier-source-format · `guidelines/coding.md` ·
  `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/transport.test.mjs` — fails with the guard broken, naming the route
  and the variant, and passes once it is restored · `node tests/quality/eslint-size-rules.mjs` — no
  report of a function in `tests/transport.test.mjs` · `node node_modules/eslint/bin/eslint.js
  --max-warnings 0 tests/transport.test.mjs` · `node node_modules/prettier/bin/prettier.cjs --check
  --no-config --no-editorconfig --ignore-path .gitignore tests/transport.test.mjs` ·
  `git diff --stat a3d913dac87160f56b194ce863c60145a551765a -- src` — empty
- **Depends on:** Slice 1

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: the gate gives a signal when a function or a file grows over the limit, beside the linter of D-29 | Foundation entries rows 1–2 · Slice 1 |
| To do 1 — the rule with its thresholds, scope, way of counting and two exceptions | Foundation entries row 1 · Slice 1 (the run's configuration) |
| To do 2 — the test of the rule apart from the run on `eslint.config.mjs`, the size rules alone, every function and file over a threshold named with its place and size, its configuration listing only the decision's exceptions, seen failing once | Slice 1 |
| To do 3 — the invariant marked violated and its test an expected failure while code other than the exceptions stands over a threshold (WAY-51) | Foundation entries row 2 · Slice 1 (the marking, with the set of cycle choice Q1) |
| To do 4 — `Scene` divided | Slice 2 |
| To do 4 — `ProgramPanelView` divided | Slice 5 |
| To do 4 — `RuleListView` divided | Slice 3 |
| To do 4 — `RulePanelView` divided | Slice 4 |
| To do 4 — the function of the test in `tests/transport.test.mjs` divided | Slice 6 |
| To do 5 — `### Size of a function and a file` in `guidelines/coding.md`, naming the decision and the invariant and repeating no threshold or exception | Slice 1 |
| To do 6 — the configuration's part in the part map, if it stands outside `tests/quality/` | met by its place: the configuration stands in `tests/quality/`, which build-tools holds, so no change of the part map is needed (Choices) |
| Settlements row 1 — decision on the rule of size | Foundation entries row 1 |
| Settlements row 2 — invariant of the rule, violated | Foundation entries row 2 · Slice 1 |
| Settlements row 3 — decision that knip stays out of the gate | Foundation entries row 3 |
| Cycle choice Q1 — the set over the limit today besides the task's splits (`startApp`, `createProgramsEntry`, `kitchen-sink.tsx`), no exception written and none of them split | Slice 1 (the comment at the marking and the set found in its report); the request puts `createProgramsEntry` and `kitchen-sink.tsx` before the human (orchestrator) |
| Out of scope — `createGameView`, `startApp`, the stylesheet, the template of the-way, `createTripPlan` | no slice changes `src/browser/view/game-view.ts`, `src/browser/view/app.ts`, `src/browser/view/programs-entry.ts`, `src/browser/kitchen-sink/kitchen-sink.tsx`, a stylesheet or `src/browser/view/trip-plan.tsx` |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The configuration of the rule's run stands in `tests/quality/` under a name ESLint does not look up as a configuration, so To do 6 needs no change of the part map | a configuration file at the root of the repository — it needs an entry of the part map, and the file patterns of `eslint.config.mjs` and the Prettier patterns of `tests/quality/test_quality_invariants.py` name only the two root configuration files, so both would have to change too | none in behaviour; a reader looks for the configuration of the rule beside the other quality checks |
| The run takes its files and ignores from `eslint.config.mjs` and applies the two size rules alone | a list of file patterns of its own in the size configuration — it drifts without a signal when `eslint.config.mjs` reaches a new directory, and code there escapes the rule of size | the run parses with the typed configuration of the linter, so it takes about as long as the linter's run in the gate |
| The function rule reaches every file the run of `eslint.config.mjs` lints — application, scripts, tests, the scripts of deployment and the three directories of agent-workflow D-29 names, and the two root configuration files — and the file rule the same files outside `tests/` | `src/`, `scripts/` and `tests/` alone — leaves out JavaScript of deployment and agent-workflow that the linter checks, and needs a second list of patterns | the human may read the row's "aplikacja, skrypty, testy" more narrowly; none of the files added by this reading is over a threshold today, so no exception follows from it, and the decision says the scope in words |
| The exception `accountRoutes` drops the one report that names that function in `src/server/account-routes.ts`; the exception `saved-game.ts` turns the file rule off for that file | the function rule off for the whole of `account-routes.ts` — it would exempt the other functions of that file too, which the decision does not name | the dropping reads the function's name from ESLint's report; a change of that text in a later ESLint shows in the control case, which then fails |
| The main case of the test is marked as an expected failure, and a control case, not marked, proves on made-up files that the run reports what it should | the main case alone — a run broken by a configuration error would count as the expected failure and hide the break | one more case to keep in the suite |
| The set that keeps the invariant violated is named in a comment at the expected-failure marking, as cycle choice Q1 gives, and in Slice 1's report | the set named in the invariant's entry — the template gives *Violated* only `yes` or `no`, and a sentence naming code goes stale with the first split | the comment goes stale when another task splits one function of the set; that change sees the marking and the comment together |
| The agent of *Foundation entries* writes all three entries, Slice 1 writes the invariant's test | Slice 1 writing the invariant with its test (WAY-69) — its *Change* would hold `foundations/invariants.md` whole, which no slice can read | the invariant reads `test` for one stage before a test cites it; the agent of the entries runs the foundation check with `--skip-test-citations` |
| `Scene`'s step moves to the new `scene-memory.ts` and the dragging of `RuleListView` to the new `rule-drag.ts`; `RulePanelView` and `ProgramPanelView` are divided inside their files | everything inside the existing files — `scene.tsx` already holds 736 lines of code of the 800 the file rule allows, and a split inside it can reach the limit; a new file for every split — more files where `rule-panel.tsx` (487) and `program-panel.tsx` (639) have room | a slice that needs a further new file reports it as a deviation from its *Change* |
| Slices 2–6 come after Slice 1 and measure with the rule's own run | slices measuring with the orchestrator's script under `.runs/` — a second way of counting, which the rule asks there be none of beside its test | the five splits wait for Slice 1 |
| Each view slice checks its part of the game in a real browser (D-88) | the tests on the document imitation alone — they do not prove real dragging, focus or the scene's animations | the time of one manual check in each of four slices |
| The transport case is seen failing against a guard of the server broken for a moment and restored | no failing run, since the case only changes shape — the product's rule asks every changed test to be seen failing before it is seen passing | a broken guard left in place by mistake; the check `git diff --stat … -- src` catches it |
| The order of work departs from the styleguide's example (environment and library, values, one screen, its states) | that order — it fits a change of what a screen shows; this change shows nothing new: the foundation entries and the rule's test come first and the screens' code is only divided | none |
