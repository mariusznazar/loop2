# Return step report

Status: **done**. Head compared: `b6b4bbff`. One commit: `e8ea984a`. Nothing uncommitted outside `.runs/`.

## Foundation compared with code

Compared at `b6b4bbff` with the code, by reading the entry against the code and by a search of the whole foundation (`grep` over `foundations/*.md` for `press`, `fire`, `number field`, `trip rule`/`tripCount`/`readNumberField`, `right-area`/`RightArea`, `createTripPlan`/`createRuleList`/`createRulePanel`, `chooseActivity`/`judgeProgram`/`resolveCombat`/`pickActivity`/`conditionHolds`/`actionRefusal`, `tsconfig`, `_map`):

- **D-393, D-394, D-395, D-06, `simulation-type-check`, `simulation-isolation`, part map `build-tools`**: match the code. `tsconfig.sim.json` has `lib ["ES2022"]`, `types []`, `noEmit`, covers `src/browser/sim/**/*.ts`; `scripts/build.mjs` and `npm run typecheck` run it first; the part map claims the file and the test; D-394's function stays; no shared control imports a screen module (`react-number-field.tsx` imports only a type from `sim/program.js`).
- **D-04**: matches (the simulation stays pure functions; the removed map parameter touches no sentence of it). **D-181**: matches (the count field accepts and refuses the same entries with the same message; no sentence of D-181 names the old `rule="trip"` parameter). **D-73** and its departures: untouched. **D-265**: matches (the two forms still draw one tree; the same-tree cases pass). **D-268**: matches (a test file takes `assert` from the harness; unchanged). **`simulation-inputs`**: sentence unchanged; its test lost one argument at four calls.
- **D-264**: the one mismatch. Its sentence lists what the harness carries, and the harness now also exports `press` and `fire`, which every view test file used to copy (the 13 copies the change removed). The list was true but incomplete, and a rule for what a test file does with them was missing. Corrected below.
- **Glossary**: no entry and no decision names `right-area`/`RightArea` (the search finds only the prose "the right area" of other screens in D-307-era and Mapy text, which are not this module). No term was used against its entry. The removed factories (`createTripPlan`, `createRuleList`, `createRulePanel`), the removed map parameter, `_map` and `rule="trip"` are named by no entry.
- **Invariants naming build**: `application-build-output` ("compiles both the browser and the server TypeScript configurations and bundles…") and `application-build-layout` stay true with a third configuration that only checks; not changed.

## Decisions

- **D-264 changed in place**, through `the-way-record-decision` (skill invoked; its steps followed: element template, `rules.md`, `way_of_working.md`, `read.md`, `decide_entry.md`; search of the foundation done; entry shown below). The binding sentence gains: "A test file of such a screen clicks a control and fires an event through the harness's `press` and `fire`, which send the event as a browser does inside `act`, and keeps no copy of either." *Verification* gains the complying case "clicks a button with the harness's `press`" and the violating case "a test file of a screen in React that defines its own `press` or `fire`". *Rationale* gains the reason (the same work in every test of a screen, so it stands once in the harness that already awaits React's work through `act`). *Rejected* gains "`press` and `fire` in a module of their own beside the harness — one more import in each test file, standing after the harness, with no gain over the harness that already carries `act`". Mark: **the cycle's** (no row and no projected entry carries it; the request puts it before the human).
  - One sentence, English: the harness of the tests of React screens also carries `press` and `fire`, and a test file keeps no copy of them.
  - Jedno zdanie, po polsku: uprząż testów ekranów w React niesie też `press` i `fire`, a plik testu nie trzyma własnych kopii.
  - Why a decision: the place and the one form of `press`/`fire` bind after the merge — a new test file would otherwise write a fourteenth copy, as thirteen files did — and the task excludes no entry for it (WAY-36). It stays within D-264's own question (what carries the tests of a screen in React), so it is an edit, not a new number.
  - D-268 and the invariant `document-test-memory-limit` derive from D-264; neither sentence changes (they concern `assert` and the memory limit), so step 4.4 writes nothing more.

## Choices that bind after the merge and are not written (WAY-36), with the reason

- **The name `tabs-area`**: a name of one module, no rule for later work; the plan test (does the rule still bind once merged?) finds none. The guidelines' file table (changed in this request) is where later authors find it.
- **The `NumberRule` shape of the number field** (`(text, held) => NumberReading | null`): the principle that binds later work is D-395 (the control receives the rule from the screen); the shape is a type in code that the compiler enforces on each screen, and the tests of `react-controls.test.mjs` pin the behaviour. A second entry would repeat D-395's rule or copy a type.

## Invariants, environment facts, glossary terms, part-map changes, projected entries, rows

- Invariants written or changed: none (nothing new; the rule of D-264 is kept by review: no mechanism checks that a test file defines no `press`; the task and the decision set no invariant for it, and the return step writes none "merely because no invariant covers it").
- Environment facts: none — the change rests on no source outside the product beyond what the foundation holds.
- Glossary terms: none.
- Part-map changes: none beyond the foundation step's (`tsconfig.sim.json`, `test_simulation_type_check.py`, a clause in the `build-tools` sentence). `tests/view/page-document.mjs` and the renamed files are claimed by `browser-view` through `tests/view/**` and `src/browser/view/**`; `foundation_check.py` reports no unclaimed file.
- Projected entries: none (the task is independent of any project). Rows of *Settlements to record*: all four were written by the foundation step; the code still makes each true; none missed.

## Checks (command, exit code)

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`), run after the D-264 edit |

I changed no code and no test. No correction of code or a test is left for the request's list from this step.

## Unread material

- D-04, D-06, D-265, D-264, D-268 read whole; D-73 and D-181 not read whole in this step (the search showed no sentence of either touched; D-181 I read only as quoted in the task); the glossary read by headings and the entry `chronicle`; `part_map.md` read whole earlier in the cycle. `reports/review-*` not read.

## Searches not found or unclear

- No decision or glossary entry naming `right-area`, the three removed factories or `rule="trip"`: none found (expected).
- Whether D-264's list of what the harness "does" was meant as closed: unclear; I treated it as the list of the harness's rules and extended it, since the new sentence is about what a test file takes from it, as D-268's does for `assert`.
