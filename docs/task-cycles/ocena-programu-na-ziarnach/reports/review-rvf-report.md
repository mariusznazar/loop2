PASS f2d28489

# Review rvf — fix of review rv's finding I-1, task `ocena-programu-na-ziarnach`

Range `25d1494d..f2d28489` (one commit, `f2d28489`); `git rev-parse HEAD` in the cycle worktree gave
`f2d28489bedc2f39f2cbc3dd6d5fcf32acd441d3`, the head given. Files changed:
`src/browser/view/maps-screen.tsx` (+8 −3), `tests/view/maps-screen.test.mjs` (+43). Method:
`.the-way/task-cycle/review/SKILL.md` with `fix.md`.

## Findings file, finding by finding

**I-1 — fixed.** `ShownJudging` now carries `from: JudgingAct` (`src/browser/view/maps-screen.tsx:141`),
set to the click that made the result (`maps-screen.tsx:623`), and the first click of „Puść w pętlę”
passes as `standing` only a result whose `from` is `"judge"` (`maps-screen.tsx:480`:
`shown?.from === "judge" ? shown.judging : undefined`). A result made by a first click of „Puść w
pętlę” has `from: "loop"`; „Puść mimo to” (`spend`) keeps it as `from: "loop"`, so after a stop it is
no standing result and the same rows wait for the second click again. A result kept at an at-once
start (`resultKept` returns `now` unchanged) keeps its `from: "judge"`. This is what D-243
(`foundations/decisions.md:8780-8785`, „…the same line as the result of the button of a judging
(D-329) that stands under the character. Otherwise … a second click starts the earning loop.”), the
task's *To do* 5, Q14 and *Settlements to record* row 5 say. Evidence:

- The reviewer's probe of review rv (`reports/review-rv-probe.test.mjs.txt`, copied unchanged into
  `tests/view/zz-review-probe.test.mjs` of a worktree of `f2d28489`), `npm test --
  tests/view/zz-review-probe.test.mjs` exit 0, printed `PROBE calls ["judge","startLoop","stop","judge"]`
  and `PROBE button Puść mimo to` — against `["judge","startLoop","stop","judge","startLoop"]` at
  `25d1494d` (`reports/review-rv-probe-output.txt`). The fourth click judged and waits.
- Mutation: `maps-screen.tsx` of `25d1494d` put back under the tests of the head, `npm test --
  tests/view/maps-screen.test.mjs` exit 1, 40 passed, 1 failed — the new case, „expected
  ["judge","startLoop","stop","judge"], got ["judge","startLoop","stop","judge","startLoop"]”
  (`reports/review-rvf-mutation-output.txt`); with the head's file restored, exit 0, 41 passed. The new
  case is red on the defect and green on the fix.

## The fix diff, for what it broke

Probes of my own on jsdom (`tests/view/zz-review-rvf-probe.test.mjs` in the worktree of the head, not
committed; `npm test -- tests/view/zz-review-rvf-probe.test.mjs` exit 0, output kept as
`reports/review-rvf-probe-output.txt`):

1. Result of „Oceń na 12 ziarnach” with a death → „Puść w pętlę” with the same rows → stop → „Puść w
   pętlę” with the same rows: calls `["judge","judge","startLoop","stop","judge","startLoop"]`. The
   at-once start of Q14 still works, and the result kept at that start still counts as one of the
   button of a judging at the next click (it keeps `from: "judge"`).
2. Result of the button → „Puść w pętlę” with other rows (waits, „Puść mimo to”) → second click → stop
   → „Puść w pętlę” with the rows of that loop result: calls
   `["judge","judge","startLoop","stop","judge"]`, button „Puść mimo to”. A result that replaced the
   button's result at a first click of „Puść w pętlę” is no standing result, as D-243 says.
3. „Puść w pętlę” with a death (waits) → „Oceń na 12 ziarnach” with the same rows → button back to
   „Puść w pętlę” → its click: calls `["judge","judge","judge","startLoop"]`. A new judging by the
   button turns the result into one of the button (`from: "judge"`) and drops the wait.

Read of the code: `from` is a required field of `ShownJudging`, and the only place that builds one
(`maps-screen.tsx:617-624`) sets it; `spend` spreads the held result and keeps it; `clear` and the
reset on a change of map remove it. The type check (`tsc -p tsconfig.browser.json --noEmit`) passes,
so no other construction lacks the field. Nothing else of the behaviour changed: the other 40 cases of
`tests/view/maps-screen.test.mjs` and the cases of `judging-lines`, `uncaught-failure` and
`state-store` pass at the head unchanged (the range touches no other test).

Trust boundary: the range does not touch `src/browser/sim/saved-game.ts` nor any other boundary of the
part map; nothing to check there. Irreversible operation: none in the range; the change only alters
which result the view passes to its own comparison before the store's `startLoop`.

The new test: its expectation comes from D-243 (quoted in two `decision:` lines whose text stands in
`foundations/decisions.md:8780-8785`), its inputs are written in the case (`MIXED`, the hand-made
loop), and it asserts the outcome the player sees — no start (no `startLoop` call), „Puść mimo to” with
the sentence, the start at the second click. The order of `judge` and `startLoop` it pins is the
order D-243 requires (the click judges first), so it is no implementation detail under
„Behaviour, not implementation” of `guidelines/testing.md`.

## Findings

### Critical

none

### Important

none

### Minor

**m-1. A test comment points to a document outside the foundation** —
`tests/view/maps-screen.test.mjs:1590` („// D-243, task Q14: only a result from the button of a
judging counts as seen. …”). `guidelines/testing.md`, rule „Where the expected value comes from”:
„Komentarz testu nie wskazuje dokumentu spoza fundamentu.” „task Q14” names a question of the task's
document, which is not in the foundation and which a later reader of the test cannot open from the
repository; the rule the case protects is in D-243, which the comment also names and which the
`decision:` lines quote. Consequence: a dangling reference only, the case is understandable through
D-243; hence Minor. The same wording stands in the slice's earlier case at
`tests/view/maps-screen.test.mjs:1713`, outside this fix diff. Fix: drop „, task Q14”.

## Declined to judge

- The `standing` result captured at the click, before the judging runs a frame later: a new judging by
  the button within that frame would leave the click comparing with the older result. Set aside as
  outside the fix diff (it is slice 11's code, which review rv reviewed), and the window is one frame.
- Minor findings M-1..M-4 of review rv: not part of this fix, by the dispatch and by `fix.md`.

## Checks run

All in a detached worktree of `f2d28489` at
`.runs/review-rvf/wt`, after
`git submodule update --init -- .the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`, the pinned
commit) and `npm ci`:

- `npm test -- tests/view/zz-review-probe.test.mjs` (review rv's probe) → exit 0, calls
  `["judge","startLoop","stop","judge"]`, button „Puść mimo to”.
- `npm test -- tests/view/zz-review-rvf-probe.test.mjs` (my three probes) → exit 0, 3 passed.
- Mutation: `git checkout 25d1494d -- src/browser/view/maps-screen.tsx`, `npm test --
  tests/view/maps-screen.test.mjs` → exit 1 (the new case alone fails); file restored to `f2d28489`.
- `npm test -- tests/view/maps-screen.test.mjs` → exit 0, 41 passed.
- `npm test -- tests/view/judging-lines.test.mjs` → exit 0, 12 passed.
- `npm test -- tests/view/uncaught-failure.test.mjs` → exit 0, 19 passed.
- `npm test -- tests/view/state-store.test.mjs` → exit 0, 12 passed.
- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0.
- `python -B <cycle worktree>/.the-way/elements/common/foundation_check.py --skip-test-citations`
  run from the review worktree's root → exit 0, „0 errors”. With `--skip-test-citations` the
  `decision:` quotations of tests are not checked by it; I compared the two quotations of the new case
  with `foundations/decisions.md:8780-8785` by hand: they match.
- `npx eslint src/browser/view/maps-screen.tsx tests/view/maps-screen.test.mjs` → exit 0.
- `npx prettier --check` on the same two files → exit 0.
- `npx tsc -p tsconfig.browser.json --noEmit` → exit 0.
- `node tests/quality/eslint-size-rules.mjs` → exit 0, „0 functions and files over a threshold in 335
  files”.
- Not run: the full gate (`npm test` with no argument), by the dispatch; the foundation check without
  `--skip-test-citations`, by the dispatch. No walk in a real browser: the fix changes no drawing, only
  which result counts as standing, and the jsdom probes cover the paths.

## Reaches beyond the dispatch

- `foundations/decisions.md:8771-8802`, D-243 as it stands at the head — to compare the code with the
  entry the change writes and the test quotations with its text (the dispatch named D-243 by a line
  range of the plan, `8741-8768`, which no longer holds it at the head).
- `guidelines/styleguide-browser-view.md:654-725`, „The screen Mapy” — the section the fix's screen
  belongs to, to confirm the fix changes nothing the section governs.

## Working copies

- `.runs/review-rvf/wt` (detached
  worktree of `f2d28489`, with its `node_modules`, the two probe files and the mutation) — removed with
  `git worktree remove --force`, then `git worktree prune`.
- `.runs/review-rvf/` (the outputs of
  the runs) — removed. Kept beside this report: `reports/review-rvf-probe-output.txt` (output of my
  three probes) and `reports/review-rvf-mutation-output.txt` (output of the mutation run).

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 654-725 („The screen Mapy”) and the lines a search
  for „Puść w pętlę”, „Puść mimo to” and „Oceń na 12” found (198, 229, 267, 471, 486); not the rest of
  the file's 1213 lines. The fix changes no markup, class, text or style.
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`,
  `src/browser/AGENTS.md`: read whole.
- Foundation entries D-326, D-239, D-170, D-409, D-207, `foundations/part_map.md:3-31`,
  `src/browser/view/state-store.ts` and the plan's Foundation entries rows 1 and 3: not read; the fix
  diff reaches none of them (it changes only which result counts as standing for D-243's comparison).
- `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`: not opened; its passages came word for
  word in the dispatch.

## Searches not found or unclear

- D-243 at `foundations/decisions.md:8741-8768`, the range the plan's *Read* names: at the head D-243
  begins at line 8771; found by its heading.
