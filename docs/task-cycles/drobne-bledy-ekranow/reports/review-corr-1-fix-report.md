PASS 31ca8d122e4df926a6cde3d6a22e3a37788192cd

# Review of the fix of I-1, correction 1 (documents), cycle `drobne-bledy-ekranow`

Fix range: `9350cfe22adc3a693b8152bd3b03e2d8a2917c75..31ca8d122e4df926a6cde3d6a22e3a37788192cd`. `git log` shows one commit, `31ca8d12` ("name the hiding of the scene… as the cause of the cut of an effect in D-367 and in the two lines of the styleguide"). `git rev-parse HEAD` is `31ca8d12`. The diff touches `foundations/decisions.md` (+3/−3) and `guidelines/styleguide-browser-view.md` (+5/−5) and nothing in `src/` or `tests/`. The method is `.the-way/task-cycle/review/fix.md`, and the findings file is `reports/correction-1-findings.md` (I-1 alone). The fix report is the section "Fix of the blocking finding" of `reports/correction-1b-report.md`.

Counts: 0 blocking, 1 Minor (new), 0 out of scope.

## The finding

**I-1: fixed.** Each place the finding named now gives the cause the code acts on: the scene is hidden, either by leaving the screen of the run or by the end-of-run window.

- **What the code does at `31ca8d12`.** The fix commit changes no code. `src/browser/view/scene.tsx:799`–`804` still ends a flight, a dust cloud and a wolf's run in, fall or run off on any `animationcancel` whose target is the effect's own element, whatever the cause. `src/browser/view/run-screen.tsx:180` still puts `hidden={covering}` on `.run-world`, which holds the scene, while the end-of-run window stands. `src/browser/styles.css:20`–`22` still makes `[hidden]` `display: none !important`.
- **D-367's binding sentence** (`foundations/decisions.md:11303`) now reads "unless the map run is left, the scene is hidden — by leaving the screen of the run or by the end-of-run window that stands in its place (D-370) — or a new map run starts". Both causes that cancel the effect's animation are named. Nothing else on the screen of the run hides the scene (my earlier search; see below), so the list is whole. D-370 is the right citation: "While the end-of-run window … stands, the header and the three areas of the screen of a map run are not shown".
- **D-367's pair of examples** (`:11308`–`:11310`). The lead-in now reads "For an effect running when the scene is hidden". The *complies* example now reads "whose animation the browser cancels because the scene is hidden — the player left the screen of the run, or the end-of-run window stands — over at once and not drawn again when the scene is shown". Both are true of the listener.
- **The styleguide** (`guidelines/styleguide-browser-view.md:847`–`849` and `:870`–`872`). Both sentences now read „bo scena zniknęła — gracz wyszedł z ekranu przejścia albo stanęło okno końca przejścia (D-370)”, the second in parentheses. Each says what happens when the scene is shown again: the effect ends as at its animation's end and does not play from its start. That is what `effectOver` and `creatureOver` do.
- **What the fix rightly left alone:**
  - The tint's sentence at styleguide line 792 still names leaving the screen alone. The window does not reach the return of the tint, because at a death and a completion the tint stands at once (D-316).
  - The clauses `tests:` of D-316 and D-317 still say "cut by leaving the screen of the run". They describe the test at `tests/view/scene.test.mjs:1990`, which fires the cancel as a hidden screen does, so they remain true.

## What the fix diff broke

No new Critical or Important finding.

- D-367 still agrees with D-370's "though they stay in the page with their state". That sentence is about the elements and the state of the areas. Dropping an effect that was overdue anyway is the drop D-317 makes.
- D-367's quotation that tests use, "Any other reading starts none", is untouched, and the foundation check is clean.

**Minor (new), m-1.** D-367's *violates* example (`foundations/decisions.md:11310`) still reads "the same effect left standing at its first frame, so that it plays from its start when the screen is shown again". Under the end-of-run window it is the scene that is shown again after „✕”, not the screen. The example is a correct violation for one of the two causes, so a reader still learns what is forbidden, which is why it blocks nothing. Fix: "when the scene is shown again", to match the *complies* example above it.

## Checks

| Check | Command or method | Result |
|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | exit 0, `0 error, 142 warn, 7 info` (the same counts as at `9350cfe2`) |
| No code or test changed in the fix | `git diff --stat 9350cfe2..31ca8d12 -- src tests` | empty |
| The cited code still stands | `git show 31ca8d12:src/browser/view/scene.tsx` lines 796–806 | the listener as quoted in I-1 |
| Narrow wording left behind | `grep` for "the screen of the run is left" and „wyjściem z ekranu przejścia” in both files | only styleguide line 792 (the tint), which is rightly left |
| Full suite, the local game | not run | the coordinator forbids both; no test file changed in the fix |

## Reaches beyond the dispatch

None beyond what this pass's review already read. I used my earlier reading of D-370, D-371, `run-screen.tsx:130`–`215`, `styles.css:15`–`30` and the search showing that nothing else on the screen of the run hides the scene.

## Working copies

None made.

## Unread material

- `reports/correction-1b-report.md`: only the section "Fix of the blocking finding" read, as the dispatch names; the rest was read in the earlier pass at `9350cfe2`.
- `reports/correction-1-findings.md`: read whole.
- `.the-way/task-cycle/review/fix.md`: read whole in the earlier pass and not reread; the file did not change, since the pin is the same.

## Searches not found or unclear

- Whether a browser fires `animationcancel` for an animation a stop holds paused when its element is hidden: still not checked in a browser, since the game was not started. I-1 and this fix both rest on the CSS rule that `display: none` cancels every animation of the subtree. Part A's check in a real browser saw the cancel when the screen was left; nobody has seen it under the window.
