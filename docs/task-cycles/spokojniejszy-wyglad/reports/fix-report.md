# Fix report — Minor findings M1–M5 of the review of c7f2aa7b

**Status:** `done`. Branch `task/spokojniejszy-wyglad`, worktree `the worktree's root`. Nothing pushed; no screenshot taken or pushed.

## Commits (range from c7f2aa7b)

| Commit | Finding |
|---|---|
| `8e61985f` | M1 — test |
| `fa725951` | M5 — kitchen-sink |
| `1355b910` | M2, M3 — D-27 |

Files: `tests/view/world-area.test.mjs` (+39), `src/browser/kitchen-sink/kitchen-sink.ts` (helper takes the tag), `foundations/decisions.md` (D-27 *Rationale* and *Rejected*).

## Findings

- **M1 — fixed.** New case "the icons of the drawing take the colour text-strong, the icon of a stock of 0 dimmed by depleted" in `tests/view/world-area.test.mjs`. It lays the real `src/browser/styles.css` on the jsdom page with a local copy of `computed` (the helper of `scene.test.mjs` is not exported and importing that file would run its tests) and reads, for every icon of the drawing, `color` of the `foreignObject` and of its `.icon-mask` = `var(--text-strong)`, `opacity` of the one dimmed icon = `var(--depleted)` and of the others not that. The memory limit starts through the first import of the file, `./page-document.mjs`, which calls `startMemoryLimit()` (as `scene.test.mjs` does); no new import was needed.
  - Red: with the rule `.terrain-drawing .icon { color: var(--text-strong); }` emptied in `src/browser/styles.css` for a moment, `npm test -- tests/view/world-area.test.mjs` → exit 1 (the new case fails).
  - Restored (`git diff` of `styles.css` empty): same command → exit 0.
  - The first run of the case failed for another reason (I had asserted an empty `opacity` for undimmed icons; jsdom gives `"1"`); I changed that line to `notEqual(…, "var(--depleted)")`, the behaviour that matters, before the red run.
- **M2, M3 — fixed.** D-27 *Rationale* now says: "On Siedziba it stands at the bottom, as the last part of the screen, where the old Loop, from whose views the product starts, stands its credits on the main screen." *Rejected* for "under its heading" now reads "the caption of the credits would be the first thing on the main screen of the game, and the screen would leave the old Loop's with no gain for the player". Both come from the task's question 3 (*Not chosen* B, and the answer "tak jak w starej Loop") and from the definition's input quoted there; nothing added. I followed `the-way-record-decision` (template rules: no file or count in *Rationale*/*Rejected*; the reason beside each rejected way). `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- **M4 — nothing to do by me**, as answered: D-262's wording left as it is.
- **M5 — fixed.** `iconMask(href, tag)` in `kitchen-sink.ts` takes `"span" | "div"`: a `span` for the role samples beside text, a `div` inside the `foreignObject` of the tile samples. Checked in the browser on `npm run kitchen-sink`: the two `.role-icon` are `span`, `display: block` (flex items), 24×24, opacity 1 and 0.35, `rgb(244, 244, 245)`; 24 `div.icon-mask` stand in the tile samples. Server and browser closed, `.playwright-cli/` deleted.

## Checks (command → exit code)

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `node --test "tests/view/**/*.test.mjs" "tests/sim/**/*.test.mjs"` | 0 (1808 tests, 1808 pass; one more than before: the new case) |
| `npm test -- tests/view/world-area.test.mjs` | 0 (red once as above, exit 1) |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 |

Not run: the full `npm test` (the orchestrator's).

## Own-work check

- **Requirement most likely unmet:** M1 asks that removing the colour rule be caught. Check: the red run above — the case fails with the rule gone and passes with it. A second removal (the `depleted` opacity rule) I did not run; the case reads that value too, in the same way, so I expect it to fail, but I did not see it.
- M5's check is the browser read above; M2/M3 by `foundation_check.py` and by reading D-27 against the question 3 text.

## Reaches beyond the dispatch

None beyond `fix.md` and the two reports named in the message (`fix-findings.md` read; `whole-review-report.md` not opened, since the findings file holds the reviewer's words).

## Unread material

`whole-review-report.md` (the findings file carries what the fix needs).

## Searches not found or unclear

None. (The orchestrator's "`startMemoryLimit` first" is met by the first import of `page-document.mjs`, which calls it; named here so the reviewer need not look for a separate call.)
