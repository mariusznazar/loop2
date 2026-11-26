# Findings of the review of Slice 10 (review-10-report.md), for the fix

Blocking, in the reviewer's words (the reviewer's mark of contradiction with the settlements: yes — invariant document-test-memory-limit, D-268):

### Important 1 — the new test file imports Node's assertion module beside the jsdom harness, so the gate's test of `document-test-memory-limit` fails

- Place: `tests/view/judging-cache-gear.test.mjs:10` (`import assert from "node:assert/strict";`) with `tests/view/judging-cache-gear.test.mjs:17` (`import { inAct, press, withPage } from "./page-document.mjs";`).
- What is wrong: the file builds the screen Mapy on jsdom through `tests/view/page-document.mjs` and takes `assert` from `node:assert/strict`. The invariant `document-test-memory-limit` (`foundations/invariants.md:1198-1206`) says "a test file that imports it imports no assertion module of Node", and D-268 says such a file "takes from it an `assert` ... never `node:assert`". The rule "Tests on a document imitation" of `guidelines/testing.md:326-342` says the same, and that the harness is imported "przed wszystkim innym"; the file imports it eighth, after the modules of `dist/` that load React.
- Why it matters: the repository's own guard fails, so the one command `npm test` fails on this head; and the guard exists because Node's `assert` writes a whole element into its message when a comparison on an element fails, which can take the machine's memory.
- Evidence: `npm test -- tests/view/memory-limit.test.mjs` on the head: exit 1, 36 pass, 1 fail — `the tree holds no file that goes round the harness of a document imitation`, actual `[ 'tests/view/judging-cache-gear.test.mjs imports an assertion module of Node beside the harness' ]`. Output kept at `docs/task-cycles/wyposazenie-postaci/reports/review-10-memory-limit-run.txt`. The executor did not open `guidelines/testing.md` (its **Unread material**) and did not run this test, which is outside the slice's *Checks*.
- Fix: make `import { assert, inAct, press, withPage } from "./page-document.mjs";` the file's first import and drop `node:assert/strict`, as `tests/view/maps-record.test.mjs:10` and `tests/view/maps-screen.test.mjs:8` do; the harness's `assert` has `equal`, `notEqual`, `deepEqual` and `ok`, which are all the file uses.

Contradiction: yes — invariant `document-test-memory-limit` (D-268)

## Minor findings
