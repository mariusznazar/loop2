# Findings of the review of the return step — for the fix

Source: `reports/review-return-report.md`, first line `FAIL e8ea984a98b54d67bdafaec087d9668ae149dc6d`, range
`b6b4bbffd655c0142ed03060c352d81bd360c032..e8ea984a` (the one commit of the return step, the edit of D-264).
Cut word for word from the report: the two blocking findings. The Minor finding of this review is not
yours to fix.

## Blocking findings

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
