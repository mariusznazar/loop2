PASS 1355b9106713cdc3f162bc53b2b6255dca82e982

# Review of the fix of the Minor findings — spokojniejszy-wyglad

Fix range `c7f2aa7b..1355b910` (three commits: `8e61985f`, `fa725951`, `1355b910`). `git rev-parse HEAD`
in the worktree gave `1355b9106713cdc3f162bc53b2b6255dca82e982`, the head of the message. Method:
`.the-way/task-cycle/review/SKILL.md` with `fix.md`. The findings file
(`reports/fix-findings.md`) holds Minor findings alone, so only a new Critical or Important finding in
the fix diff would fail this review.

## The findings file, finding by finding

- **M1 — fixed.** `tests/view/world-area.test.mjs:706-743`: a new case lays the real
  `src/browser/styles.css` on the test's jsdom page (a local copy of `computed` of `scene.test.mjs`) and
  reads, for every icon of the drawing, `color` of the `foreignObject` and of its `.icon-mask` as
  `var(--text-strong)`, the one dimmed icon's `opacity` as `var(--depleted)` and the others' as not.
  Evidence, in a separate worktree of the head (the reviewed worktree untouched): with the rule
  `.terrain-drawing .icon { color: var(--text-strong) }` emptied, `node --test
  tests/view/world-area.test.mjs` → exit 1, the new case failing with `expected "var(--text-strong)",
  got "var(--text)"` — the colour D-40 lists as violating; with the rule `.terrain-drawing .icon.dimmed
  { opacity: var(--depleted) }` emptied → exit 1, the same case failing (the mutant the author did not
  run); unmutated → exit 0, 22 of 22. The memory limit: the file's first import is
  `./page-document.mjs`, as in `scene.test.mjs`, and the comparisons are of short strings (D-268).
- **M2 — fixed.** D-27 *Rationale* (`foundations/decisions.md:687-689`) now gives the reason for the
  bottom of Siedziba: the old Loop, from whose views the product starts, stands its credits there on
  its main screen — the reason of the task's question 3 and row 3 and the definition's input quoted
  under it; nothing added beyond them.
- **M3 — fixed.** D-27 *Rejected* (`foundations/decisions.md:696-697`) keeps both halves of question 3,
  *Not chosen* B: the caption of the credits first on the main screen, and a screen leaving the old
  Loop's with no gain for the player.
- **M4 — not in this fix**, as the message says: the orchestrator names D-262's first sentence in the
  request; D-262 is unchanged in the fix diff (confirmed).
- **M5 — fixed.** `src/browser/kitchen-sink/kitchen-sink.ts:581-590`: `iconMask(href, tag)` makes a
  `span` for the role samples (`:615`) and a `div` inside the `foreignObject` of the tile samples
  (`:696`). The `span` is a flex item of `.role-sample` (`display: flex`, `kitchen-sink.css:101-106`),
  so its 24 px width and height apply as before.

## New findings in the fix diff

### Critical / Important

none

### Minor

**N1. D-27 calls the predecessor game "the old Loop", where the log calls it "the predecessor game,
loop".**
Place: `foundations/decisions.md:688` and `:697`.
What is wrong: every other entry names it "the predecessor game, loop" (D-21 `:480`, D-280 `:6004`,
D-291 `:6326`, D-327 `:7197` and others); "the old Loop" is a second name for one thing, and "the screen
would leave the old Loop's" reads awkwardly (the old Loop's what — its screen). Why it matters: a
search of the log for "predecessor game" misses D-27's reason. Polish; for the request's list.

## Declined to judge

none

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `1355b9106713cdc3f162bc53b2b6255dca82e982` |
| `git diff --numstat c7f2aa7b..1355b910` | 3 files, listed below |
| `node --test tests/view/world-area.test.mjs` (reviewed worktree, built `dist/` of the earlier run plus the test reads `src/` styles) | exit 0 |
| Separate worktree of the head (`git worktree add --detach` in the scratchpad, `node_modules` linked, `npm run build` exit 0), unmutated `node --test tests/view/world-area.test.mjs` | exit 0, 22 pass |
| Same, colour rule of the map's icons emptied | exit 1, new case fails: `expected "var(--text-strong)", got "var(--text)"` |
| Same, `depleted` opacity rule emptied | exit 1, new case fails |
| Scratch worktree removed (link removed first; `node_modules` of the reviewed worktree intact) | done |
| `npx --no-install prettier --no-config --no-editorconfig --check` on the two changed code files | exit 0 |
| `npx --no-install eslint` on the two changed code files | exit 0 |
| `npx --no-install tsc -p tsconfig.kitchen-sink.json --noEmit` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| `git status --short` in the reviewed worktree after all checks | empty |

Not run: the full `npm test` (the orchestrator's); the kitchen-sink page in a browser (the author's
browser read covers M5; my check is the stylesheet's flex rule and the type check).

## Reaches beyond the dispatch

- `src/browser/kitchen-sink/kitchen-sink.css:101-106` (`.role-sample`): for M5's layout.
- A search of `foundations/decisions.md` for "old Loop" and "predecessor game": for N1.

## Unread material

none — the findings file, the fix report, `fix.md` and the whole fix diff were read whole; the
foundation and guidelines selected for the review of the whole change stand as that report lists them,
and the fix touches no part beyond them.

## Searches not found or unclear

none
