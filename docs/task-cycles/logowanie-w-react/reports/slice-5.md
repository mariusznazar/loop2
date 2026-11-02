# Report — Slice 5, task `logowanie-w-react`

**Status:** `done with concerns` (one concern: the harness drops focus one microtask after `disabled` is set, see Concerns).

## Files and commits

| File | Added | Removed |
|---|---|---|
| `tests/view/page-document.mjs` (new) | 243 | 0 |
| `tests/view/page-document.test.mjs` (new) | 536 | 0 |

Commit: `758ba84` test: :white_check_mark: add the jsdom harness with its limit, its fresh window per case and its safe assert. Base 4273f70.

What the harness exports: `assert` (seven methods), `withPage(body)` with `{ window, document, root }`, `inAct(action)`, `settle()`, `typeInto(field, text)`. The name of a harness function was left to me; Slice 6 keeps its own `onPage` for mocked timers around `withPage`.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/page-document.test.mjs`, stub with no-op `assert` and page stubs (first failing run) | 1 | 55 cases, 34 failed, at their assertions or at the helper's "the action did not fail" |
| same, real `assert` over page stubs (second failing run) | 1 | 55 cases, 23 failed, among them the invariant-tagged `deepEqual` refusals and the runner-report case (`expected 1, got 0`) |
| `npm test -- tests/view/page-document.test.mjs`, finished harness, run twice on the tree that was committed | 0 | 55 pass, 0 fail, 0 skipped, 4.5 s |
| `npm test -- tests/view/memory-limit.test.mjs` | 0 | 37 pass; its guard now reads the real harness and this test file |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 pass (ESLint, Prettier, Ruff, ShellCheck) |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | 1 pass; added by me because a new `*.test.mjs` enters the gate |
| `node --test tests/view/page-document.test.mjs`, 17 mutations of the harness, one at a time | 1 each | every one caught, table below |
| `node <scratchpad>/own-check.mjs` | 0 | own-work check below |

**Invariant `document-test-memory-limit`:** the new case „a file that imports the harness is killed above 2 GiB, by the limit the harness started, and says why” passed on the stub, which already started the limit. So it was seen failing by a break: `startMemoryLimit({ limitBytes: 8192 * 1024 ** 2 })` left the limit above the child's own stop, the child reached the stop, exit 1 on that case alone. I did not run it with the limit removed: the safety rule forbids it, and 8 GiB kept a limit on the run. Passing with the same command: exit 0, above.

### Mutations, each with the cases that caught it

| Mutation | Failing cases |
|---|---|
| limit above the child's stop | 1, the kill case |
| `jsdom` and `react` by `await import(...)` | 2, the controlled field's typing and the React focus case; this confirms the comment on why they are required |
| no `IS_REACT_ACT_ENVIRONMENT` | 15 |
| `settle` outside `act` | 1 |
| plain `field.value =` | 1 |
| `input` not bubbling | 2 |
| focus not moved | 4 |
| the outside element stays | 4 |
| focus moved on any `disabled` change | 1 |
| product line not told apart | 1 |
| reports do not fail the case | 6 |
| the same window for each case | 1 |
| no `pretendToBeVisual` | 1 |
| `Option` not installed | 1 |
| walk refuses elements only | 3 |
| `equal` by `===` | 2 |
| a value on the error | 24 |

Mutations not run, in the head instead: `notPlain` without `seen` loops without end on data that refers to itself, with no growth in memory, so the case hangs and no limit ends it; it would show as a run that does not finish. `window.close()` removed: no case catches it, since it only releases the window's resources. `moveFocusAway`'s `:disabled` check and `equal` on rendered elements are caught above.

## Own-work check

**The requirement most likely unmet:** „every later test takes its reading of a page from it”, that is, the harness carries the whole of today's DOM page, which no case of Slice 5 draws, since its cases use bare React and bare DOM.

**The check:** a throwaway file in the scratchpad, `startMemoryLimit` first, `assert` from the harness: `startApp` from `dist/browser/view/app.js` with a held client and mocked timers, signed out, typing into both fields, submit, a refused login, a second submit, sign-in, no save.

**What it showed:** exit 0, no report failed the page. 2 forms; the submit button disabled and one `login` call; focus on the body after `settle`; focus back on a button after the refusal; 2 elements of the game drawn; 183 MiB of memory. It also showed the concern below.

## Reaches beyond the dispatch

- `.runs/task-cycles/logowanie-w-react/plan.md`, by search for the harness's names, then lines 43, 140-158 and 323: to see what later slices ask of the harness. No name of a harness function stands there.
- `.runs/task-cycles/logowanie-w-react/reports/memory-finding.md`, its head: how the crash was measured, so my runs stay clear of it.
- `tests/view/memory-limit.test.mjs`, `tests/view/memory-limit-child.mjs`: the guard's regular expression, so that neither new file trips it by text, and the shape of the proof.
- `src/browser/view/app.ts:61-74`, and a search of `src/browser` for `console.error` and for browser globals read at run time: the product's only line and the list `PAGE_GLOBALS`.
- `node_modules/jsdom/lib/jsdom/living/helpers/focusing.js`, `nodes/Node-impl.js`, `nodes/DocumentOrShadowRoot-impl.js`, `virtual-console.js`, `browser/Window.js`: why focus must go outside `body` (an element in `head` is under `display: none`, so not focusable) and what its removal leaves.

## Searches not found or unclear

- **„Names its case”.** A plain error cannot name its case by itself; the runner does. I read it as the runner's report naming the case, and proved it by a child that fails for real. See the choice below.
- **„Moves focus to an element outside `body`”.** The spec does not say where focus ends. I ended it on the body, as the model and a browser do, because the moved cases compare against real elements and `tests/view/account-screen.test.mjs:70` sets the body.
- **The harness's function names** stand in no document the dispatch gives.
- **The stop at `Atomics.wait` pace** in the growth case is my reckoning, about 1 GiB/s, not measured apart.

## Choices, each with the way rejected and its cost if wrong

- **`createRequire` for `jsdom` and `react`, not `import`.** Rejected: static imports, which run before the limit starts; `await import(...)`, which lets the test file's next import, `react-dom`, load with no window (measured: 2 cases fail). Cost if wrong: none seen; `require` of the same package gives the same instance a test file's `import` gets, as the passing `act` cases show.
- **`deepEqual` refuses every object that is neither an array nor a plain object**, not elements alone. Rejected: refusing elements and passing a `Map` or a class instance to `isDeepStrictEqual` unentered, which leaves the walk spec decision 10 warns of. Cost if wrong: a case that compares a `Map`, `Set` or `Date` must compare its content instead; `tests/view/account-screen.test.mjs` compares none of these in a `deepEqual` as far as a search for their constructors shows. Functions pass unentered and compare by identity.
- **Any line on `console.error` that is not the product's fails the case**, jsdom's reports included, among them an error thrown in a listener and any „not implemented”. Rejected: matching React's wording, which has no mark of its own and changes with versions. Cost if wrong: a case that deliberately provokes a line mocks `console.error`, as `faultInLoad` at `tests/view/account-screen.test.mjs:1873` already does, and a new product line joins `PRODUCT_LINE`.
- **A report goes into the error as its text values alone**, cut to 300 characters; values beside it are never written out, since one may be an element.
- **A case that throws keeps its own error** and any report of that case is dropped. Rejected: joining them, more code for a case that has already failed.
- **The child cases live in the test file, gated by an environment variable**, run by `node --test-name-pattern`, without a separate child file, because the slice's *Change* names two files. Rejected: an in-process check alone, which cannot show what the runner does with the error, which spec decision 10 leaves as „not run”. Cost: these two cases start a process, so at them this file is an integration test and not a unit test, and the tree spec decision 9 calls one process is two for them; the child runs under its own limit.
- **The kill case grows to 2 GiB for real, on every gate**, about 4 s and one process above the 1.68 GB the Node stage peaked at, with a stop of its own at 4 GiB. Rejected: `process.report` listing worker threads, cheap but it proves a thread and not a kill; a limit read from the environment, which would be a way to raise it. Cost: a moment a little above 2 GiB in each `npm test`; the peak was not measured. **The review of the whole change may want this weighed.**
- **`withPage` does not unmount React roots**: it does not know them. `window.close()` ends the page.

## Concerns

- **Focus leaves one microtask after `disabled` is set**, because the harness watches through a `MutationObserver`, the only thing that sees React's `setAttribute`. Measured: right after a click, with no await, `document.activeElement` is still the button; after `settle` it is the body. The hand-made model did this at once, so **Slice 6 must read focus after an await**, where a case now reads it straight after a fired event.
- Focus moving away fires `blur` on the disabled control in jsdom. A browser need not, so a field that acts on `onBlur` could behave differently here than in play. Nothing does so today.

## Problems as observed

One of my commands hung for 180 s and was stopped: a stray `cat` at its start waited on standard input, no test had started and no test process was running. Nothing else came of it.

## Plan and code

No mismatch of structure. `.runs/task-cycles/logowanie-w-react/spec.md` decision 9 says the tree such a file kills is one process; see the child cases above. The handoff's product gate was left to the orchestrator, and `python -B .the-way/elements/common/foundation_check.py` was not run for the same reason. No screen changed, so `ui_check.md` does not apply.
