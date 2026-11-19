PASS 94c0c560c2ed648f991027a6409480b9109f6b57

# Review of the fix of the Minor findings of the whole-change review, task `podzial-trzech-miejsc`

Fix range: `7e8dcce3..94c0c560`, one commit. `git rev-parse HEAD` in the worktree is `94c0c560c2ed648f991027a6409480b9109f6b57`, the head given. The working tree is clean. Two files change: `guidelines/coding-browser-module.md` (+3 −2) and `src/browser/view/run-entry.ts` (+2 −1, a comment only). The findings file `reports/whole-review-findings.md` holds the two Minor findings of my whole-change review, both within the task.

## Each finding

1. **`guidelines/coding-browser-module.md:365-370`, a clause broader than the code: fixed.**
   - The new text at `:369-371` says that logout and the reset of the game get what they call back in `app.ts` "przez ten sam parametr (`page.calls`)", and that the hold of the saver's outcomes gets it "jako funkcję w osobnym argumencie".
   - This matches the code:
     - `logOut(page)` and `resetGame(page)` destructure `calls` from the page they receive (`src/browser/view/page-game-acts.ts:115`, `:172`).
     - `whenNotBusy(places, view, action)` takes its call as the third argument (`page-game-acts.ts:80-84`). It is built in `showGame` (`src/browser/view/app.ts:212-215`).
   - The sentence does not name the game's place (`onPlace`). That is right: it calls nothing back into `app.ts`.
   - No other sentence of the paragraph changed.

2. **`src/browser/view/run-entry.ts:154-155`, the comment half true after `halt()`: fixed.**
   - The comment at `:154-156` now reads: "… a question standing goes as „Wróć” closes it, since the window and the question do not show together (D-311), except after `halt()`, when the question stays and the window waits behind it (D-323)."
   - Each part matches the code:
     - `closeQuestionNow` refuses after halt (`src/browser/view/run-screen-state.ts:131-135`).
     - `openWindow` still sets `windowOpen` (`:223-231`).
     - `windowShown` requires `question === null` (`:137-147`), so "do not show together" holds before and after the error.
   - The comment now agrees with the interface comment of `openWindow` (`run-screen-state.ts:76-81`).
   - The comment changed and no code did.

## The fix diff

No new Critical, Important or Minor finding. The guideline edit is confined to the clause the finding named. The comment edit changes one line of prose and no code.

## Checks

All in the reviewed worktree at `94c0c560`. No tracked file changed.

| Command | Exit / result |
|---|---|
| `git rev-parse HEAD` | 0, `94c0c560c2ed648f991027a6409480b9109f6b57` |
| `git diff 7e8dcce3..94c0c560`, `git log 7e8dcce3..94c0c560`, `git diff --stat 7e8dcce3..94c0c560` | 0; one commit, two files, 5 insertions and 3 deletions |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/run-entry.ts` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/run-entry.ts` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |

Manual check: each changed sentence read against the code it describes, at the lines cited above.

Not run:
- The full gate, which is the orchestrator's.
- Tests. The fix changes prose and a comment and no code; the fix report's `npm test -- tests/view/run-screen.test.mjs` (exit 0) is its own claim.

## Declined to judge

none

## Reaches

none beyond the findings file, the fix report, the diff and the code the two findings cite.

## Working copies

None made. `.runs/review-whole/` was not recreated.

## Unread material

The fix handoff `reports/fix-handoff.md` was not read: the findings file, the fix report and the diff carried what this review needs.

## Searches not found or unclear

none
