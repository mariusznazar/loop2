PASS 9e7f586ef73661a990b068f011b3e0460cacd860

# Review of the fix of the return step (findings of `reports/findings-return-1.md`)

Range `e8ea984a..9e7f586e`: one commit, `9e7f586e`, one file, `foundations/decisions.md` (D-264). `git rev-parse HEAD` is `9e7f586e`, the head given. Blocking findings remaining: 0. Minor: 1 new, 1 old (not given to the fix). Out of scope: 0.

## The findings

### Important 1 (`fire` said to send inside `act`) — fixed

The binding sentence of D-264 (`foundations/decisions.md:5921-5923`) now reads: a test file "clicks a control through the harness's `press`, which clicks inside `act`, and sends an event through its `fire`, which sends the event as a browser does and which the test file puts in `act` where React must answer, and keeps no copy of either". Against the code:

- `press` (`tests/view/page-document.mjs:134-137`) returns `inAct(() => fire(target, "click"))`: clicks inside `act`. True.
- `fire` (`:125-131`) builds the event of the target's window and dispatches it, with no `act`: "sends the event as a browser does". True. `tests/view/page-document.test.mjs:411` names only `press` as inside `act`, and `:433-450` fires outside it.
- "which the test file puts in `act` where React must answer": the call sites listed in the finding wrap it in `inAct` where a case awaits a React answer (`end-question.test.mjs:713`, `:859`, `run-screen.test.mjs:501`, `:507`, `tabs-area.test.mjs:462`, `account-screen.test.mjs:2511`). The text states it as what the file does, which matches the way the harness splits the work; it no longer claims `act` for `fire`.

The *Rationale* sentence now says "Clicking a control inside `act` and sending an event as a browser does is the same work in every test of a screen", which attributes `act` to the click only. True. `grep -n "defines its own\|firing an event inside" foundations/decisions.md` finds nothing: no old wording left.

### Important 2 (*violates* case broader than the rule) — fixed

The case now reads "a test file of a screen in React that defines a copy of the harness's `press` or `fire`" (`:5933-5934`), matching the binding sentence's "keeps no copy of either". The code the finding named no longer reads as a violation: the keydown helper `press` of `tests/view/end-window.test.mjs:607` is no copy of the click helper (different arguments and event), and the `fire` element variables of `scene.test.mjs:292`, `:1665` are no definition of a helper. `grep -nE "^(export )?(async )?(function|const) (press|fire)\b" tests/view/*.test.mjs` finds only `chronicle-entries.test.mjs:33`, a test file that does not import the harness (an unrelated name for a program group), so no copy exists at the head.

## What the fix itself brought

- Form against `.the-way/elements/decisions/template.md`: the binding paragraph is still three sentences, one of them longer; no *should*/*will*, no capitalised keywords; every field kept; *Rationale* names no file, script or count; the *Rejected* way is untouched and still true (all test files take `press`/`fire` in the import with `assert`/`inAct`/`withPage`). The complying case is untouched and true.
- Minor (new, in the fix diff, blocks nothing): one line of the *Rationale* (`foundations/decisions.md:5953`) is now about 116 characters where the rest of the entry wraps near 100; formatting only. The entry is otherwise consistent in its three places that mention `fire`.
- Minor (earlier, Minor 1 of the first review, not given to the fix, stays as it was): the rule could have been a new question next to D-264 (WAY-19); the entry stays the cycle's for the human to settle at the merge.
- No new Critical or Important finding. The fix touches no code and no other entry.

## Declined to judge

- The author's statement that the project skill `the-way-record-decision` was invoked: cannot be verified from files; per the handoff, not graded.
- Whether each bare `fire(...)` call in `account-screen.test.mjs` (`:534`, `:1327`) is safe without `act` (I did not run those cases); the entry says what the files do where React must answer, and the cases are outside this range.

## Checks

| Command | Exit |
|---|---|
| `git rev-parse HEAD` (is `9e7f586e`) | 0 |
| `git log e8ea984a..9e7f586e`, `git diff e8ea984a..9e7f586e` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| `grep -n "defines its own\|firing an event inside" foundations/decisions.md` | 1, no match (what I wanted) |
| `grep -nE "^(export )?(async )?(function\|const) (press\|fire)\b" tests/view/*.test.mjs` | match only `chronicle-entries.test.mjs:33` |

`npm test` and the view tests were not run: the range holds no code and the handoff forbids `npm test`.

## Reaches beyond the dispatch

- `tests/view/page-document.mjs` and `tests/view/page-document.test.mjs`, and the call sites of the first review: to judge the new wording against the code (the handoff names them).
- `.the-way/elements/decisions/template.md`: to compare the form (already read whole in the first review).

## Unread material

- Read whole: the handoff, `findings-return-1.md`, `fix.md`, the fix report `fix-2-report.md`, the fix diff, D-264 as it stands (lines 5914-5965), `tests/view/page-document.mjs` (first review).
- Not read: D-268, D-395 and other entries (unchanged and out of this range), `reports/review-return-report.md` re-read (written by me).

## Searches not found or unclear

- None.
