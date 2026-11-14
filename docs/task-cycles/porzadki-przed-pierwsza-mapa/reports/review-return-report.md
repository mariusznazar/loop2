FAIL e8ea984a98b54d67bdafaec087d9668ae149dc6d

# Review of the return step's commits, range b6b4bbff..e8ea984a

One commit, `e8ea984a`, one file, `foundations/decisions.md`: the edit of D-264 (`foundations/decisions.md:5914`). `git rev-parse HEAD` is `e8ea984a`, the head given. Counts: blocking 2, Minor 1, out of scope 0.

## Findings

### Important 1 — the new sentence says `fire` sends its event inside `act`; it does not

- Place: `foundations/decisions.md:5921-5922` (binding sentence: "through the harness's `press` and `fire`, which send the event as a browser does inside `act`") and the new *Rationale* sentence at `:5950-5952` ("Clicking a control and firing an event inside `act` is the same work in every test of a screen, so it stands once in the harness that already awaits React's work through `act`").
- Wrong: in the code at the head only `press` enters `act` (`tests/view/page-document.mjs:134-137`, `return inAct(() => fire(target, "click"))`). `fire` (`:125-131`) only builds the event of the target's window and dispatches it, with no `act`. The harness's own test says so: `tests/view/page-document.test.mjs:433-450` fires outside `act`, and `:411` names only `press` as "inside act".
- Evidence that tests rely on the difference: `fire` is called bare, with no `act` around it, at `tests/view/account-screen.test.mjs:534`, `:1327`, `:2066` (`fire(document, "visibilitychange")`), `:2186` (`pickOn`), `tests/view/maps-screen.test.mjs:484`, `tests/view/uncaught-failure.test.mjs:903`; and it is wrapped by the test file with `inAct(() => fire(...))` at `tests/view/end-question.test.mjs:713`, `:859`, `tests/view/run-screen.test.mjs:501`, `:507`, `tests/view/tabs-area.test.mjs:462`, `tests/view/account-screen.test.mjs:2511`.
- Why it matters: the entry binds later authors of tests. A reader who believes `fire` is act-wrapped drops the `inAct` around it, and React's update outside `act` then fails the case through the harness's `console.error` watch. WAY-263: an entry the change writes that restates what the code does differently is Important. The return step's report says the same sentence is "true but incomplete" for the old list; for the new sentence it is not true of `fire`.
- Fix direction (the reviewer does not edit): say that `press` clicks inside `act` and `fire` sends the event as a browser does, the test file putting `fire` in `act` where React must answer; likewise in the *Rationale* sentence.

### Important 2 — the *violates* case is broader than the rule and than the change

- Place: `foundations/decisions.md:5933-5934`, "a test file of a screen in React that defines its own `press` or `fire`".
- The binding sentence says a test file "keeps no copy of either". The change removed copies of the click helper and the event helper. The *violates* case forbids defining "its own `press` or `fire`" without the qualifier "copy", so it reads against code the foundation does not intend to forbid and that exists at the head:
  - `tests/view/end-window.test.mjs:607` defines its own `press = (target, key) => …`, a keydown helper, not a copy of the harness's click (the file imports `assert, inAct, withPage` from the harness, `:11`, so it is a "test file of a screen in React").
  - `tests/view/scene.test.mjs` (imports `page-document`) has local variables named `fire` that hold an element, at `:292` and `:1665`.
  - Other key helpers in files of React screens carry other names (`escape`, `pressKey`, `key`): `tests/view/end-window-game.test.mjs:91`, `headquarters-screen.test.mjs:87`, `program-panel.test.mjs:135`.
- Why it matters: an agent comparing a change with the decision (what the pair of examples is for, template "Verification") would flag `end-window.test.mjs:607` as violating today, or a future author would rename a legitimate keyboard helper for no reason. WAY-263: restating a rule more broadly or without its qualification is Important. The code is not wrong; the entry is.
- Fix direction: "defines a copy of the harness's `press` or `fire`" (or "of its own for a click or an event of the kind the harness sends").

### Minor 1 — a new rule next to D-264's question is, by the template, a new question

- Place: `foundations/decisions.md:5914` (question: "What does a test of a screen built with React run on?").
- Template, "Changing a decision": "a new rule next to an existing decision is a new question (WAY-19)". The first half of the new sentence (the harness carries `press` and `fire`) fits the list of what the harness carries. The second half (a test file keeps no copy) is a rule about what a test file does with the harness, the shape of D-268, which answers that kind of question under its own number and derives from D-264. The return step judged it "within D-264's own question"; that is defensible, since the question is about what carries the tests, and edits in place keep the log short. Cost of leaving: none now; one question carrying a harness list and two file rules. Cost of a new number: one more entry and a `derives from D-264`. The entry is marked the cycle's, so the human decides at the merge. Not blocking.

## What I judged and found right

- Form of the new *complies*/*violates* cases and the *Rejected* way against `.the-way/elements/decisions/template.md`: the three binding sentences are the maximum (1 to 3), no normative word in capitals, no *should*/*will*; all fields present; *Rationale* and *Rejected* name no file, script or count (`page-document.mjs` appears only in the binding sentence, as before). The *Rejected* way is the one question the task carried to the cycle ("`tests/view/page-document.mjs` or a module beside it"), so it is not a derived way in the sense of WAY-134 (the entry is not written from a row). Its reason, one more import after the harness with no gain over the harness that already carries `act`, is true of the code: all 15 files take `press`/`fire` in the same import as `assert`/`inAct`/`withPage`.
- Not widened beyond the change: the rule is limited to `press`/`fire` and "a test file of such a screen"; the 13 removed copies are the reach. Apart from Important 2 it does not reach other helpers.
- D-268 and `document-test-memory-limit` (`foundations/invariants.md:1188`): left unchanged rightly. D-268 binds `assert` from the harness and the memory limit; the invariant binds who loads jsdom, no Node assertion module and the 2 GiB kill. Neither sentence mentions `press`, `fire` or the harness's other exports, and neither became false. Nothing needs an invariant: the task and the decision set none, and review is the check.
- WAY-36 claim on `tabs-area` and the `NumberRule` shape: I agree. A module name binds nothing once merged (plan test), and the shape of the number field's rule is a type the compiler enforces on each screen; the principle that binds later work (the shared control gets its rule from the screen) is in D-395, by the return step's report. I did not read D-395 whole (see Unread material).

## Process fact (recorded, not graded)

The report `reports/return-step-report.md` says D-264 was changed "through `the-way-record-decision` (skill invoked; its steps followed)". The handoff says the agent wrote the edit by hand with the template and did not invoke the skill, as it did for D-394 and D-395 earlier in the cycle; `AGENTS.md` requires the skill. The two statements disagree; I took the handoff's as the process fact and could not verify either from the files. The entry is judged as it stands.

## Declined to judge

- Whether the 13-copy removal in the test files themselves is correct (the earlier whole-change review's matter; this range holds no code).
- `D-394`, `D-395`, `D-06` and `simulation-type-check` (written in earlier commits of the cycle, outside this range).
- The English/Polish one-sentence summaries in the return report: not part of the entry.

## Checks

| Command | Exit |
|---|---|
| `git rev-parse HEAD` (is `e8ea984a`) | 0 |
| `git log b6b4bbff..e8ea984a`, `git diff b6b4bbff..e8ea984a` (one commit, one file) | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| `grep -rnE "function (press\|fire)\b\|const (press\|fire)\b\|(press\|fire) *=" tests/` (copies of the helpers left in the test files) | 0; no copy of the harness's click or event helper; only the key helper `end-window.test.mjs:607`, the unrelated `fire` names in `chronicle-entries.test.mjs:33`, `tile-list.test.mjs:160` (files not on the harness) and `scene.test.mjs`, `camp-picture.test.mjs` (element variables) |
| `grep -n "fire(" tests/view/*.test.mjs` read against call sites (is `fire` act-wrapped) | 0; both bare and `inAct`-wrapped calls found (Important 1) |

`npm test` and the page-document view test were not run: the range holds no code, and the handoff forbids `npm test`. Not run, so the harness's behaviour is read from the source and from `page-document.test.mjs`, not executed.

## Reaches beyond the dispatch

- `tests/view/*.test.mjs` call sites of `fire`, `press` and the key helpers, and `tests/view/page-document.test.mjs:405-450`: to judge whether the new sentences are true of the code (the handoff asked for it).
- `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.the-way/task-cycle/skill/return_step.md`, `foundation_step.md`: named in the handoff, read whole.
- `foundations/invariants.md:1188-1196` (`document-test-memory-limit`) and `foundations/decisions.md:6070-6110` (D-268): to judge that they stay unchanged.

## Unread material

- Read whole: the handoff, the frozen task, the return step's report, `review/SKILL.md`, `return_step.md`, `foundation_step.md`, the decision template, `rules.md`, D-264 whole, D-268 (the part to its *Rationale*; the tail of its *Rejected* was cut at the end of my read), the invariant `document-test-memory-limit`, `tests/view/page-document.mjs` whole.
- Not read: D-395, D-394, D-265 and D-73/D-181 (the report claims about them are not verified here beyond the task's quotes); the glossary and the part map; the view test files other than the passages cited.
- No decisions screened by title; the foundation selection was the handoff's, not the whole-change selection.

## Searches not found or unclear

- Not found: the project skill invocation of `the-way-record-decision` for this edit, either way (contradiction in the process fact above).
- Unclear: whether D-264's list of what the harness does was meant to be closed, as the report says; the edit extends it either way, so it did not change a grade.
