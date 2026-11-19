# Report - the fix of the Minor findings of the whole-change review, task `podzial-trzech-miejsc`

**Status:** done

**Commit:** `94c0c560` (on `7e8dcce3`), one commit. Amended once, before return, only to remove a byte-order mark my first commit-message file carried; the diff did not change.

**Files changed:**
- `guidelines/coding-browser-module.md` (+3 -2)
- `src/browser/view/run-entry.ts` (+2 -1, a comment only, no code)

## Findings

### 1. `coding-browser-module.md:365-370`, a clause broader than the code - fixed

I read `page-game-acts.ts:76-209` and `app.ts` (grep of `whenNotBusy`, `onPlace`) and confirmed the finding. `logOut` and `resetGame` take `page` (`places`, `memory`, `client`, `calls`) and reach `expire`, `showForms`, `focusCard`, `reloadAfterConflict`, `showGame` through `page.calls`. `whenNotBusy(places, view, action)` takes the call as its own third argument, built in `app.ts:213` and `:215`. `onPlace(places, view, next)` calls nothing back.

Old: "co te działania wołają z powrotem w `app.ts`, dostają przez ten sam parametr."

New: "co wołają z powrotem w `app.ts` wylogowanie i reset gry, dostają przez ten sam parametr (`page.calls`), a wstrzymywanie wyników — jako funkcję w osobnym argumencie."

The wording is mine, not the reviewer's example. The reviewer's example named `whenNotBusy` in code font, but the sentence names the acts by what they do ("wstrzymywaniu wyników zapisującego"), so I kept that name for the third act and named the two others by their function in the same register. `onPlace` is not named: it calls nothing back, so no clause is owed to it.

### 2. `run-entry.ts:154-155`, comment half true after `halt()` - fixed

Checked against `run-screen-state.ts:76-85` (the interface comment of `openWindow`) and `:131-135` (`closeQuestionNow` returns false when `game.halted()`). New comment, in English like the rest of the file:

"„Koniec przejścia” of the header opens the window; a question standing goes as „Wróć” closes it, since the window and the question do not show together (D-311), except after `halt()`, when the question stays and the window waits behind it (D-323)."

One further change beyond the reviewer's clause: "never stand together" became "do not show together". The old phrase was false in the screen's state after `halt()` (`windowOpen` true with a question standing), as the finding itself notes; "show" is what `windowShown()` guards (`question === null`), so the sentence is true of the code in both cases. The comment now agrees with `run-screen-state.ts:76-85`.

## Checks (each with its exit code)

- `npm run typecheck`: exit 0
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/run-entry.ts`: exit 0
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/run-entry.ts`: exit 0
- `node node_modules/prettier/bin/prettier.cjs --check guidelines/coding-browser-module.md` (extra, the repository's own config): exit 0
- `npm test -- tests/view/run-screen.test.mjs`: exit 0 (21 pass, 0 fail)
- `python -B .the-way/elements/common/foundation_check.py`: exit 0 (0 errors)

Not run: the product's full gate (`npm test` with no path), by the handoff: it is the orchestrator's.

## Own-work check

The requirement the fix most likely misses: To do 7, that the sentences of the guidelines naming the divided places agree with the code, and for the comment, that it is true of the code. The check was reading each changed sentence against the function it describes (`whenNotBusy`'s signature and its call sites in `app.ts:213,215`; `closeQuestionNow` and the `windowShown` guard), not a test: both changes are prose. I read the guideline whole (it was the file to change) and saw no other sentence with the same breadth; I ran no search for one. The other mentions of `page-game-acts.ts` in it name `logOut` correctly. No behaviour changed, so no test was added or run beyond the focused one above.

## Reach beyond the dispatch

- `run-screen-state.ts:60-135`, read: to verify the comment's claim against `closeQuestionNow` and the interface comment. The handoff named the lines only through the findings.
- `page-game-acts.ts:60-209` and a grep of `whenNotBusy|onPlace` in `src/browser/view/`: to verify the first finding. Same reason.
- `.the-way/task-cycle/change/fix.md`: read, as `SKILL.md` section 1 names it for a fix.

## Working copies

None made except `.runs/fix/msg.txt`, a commit-message file; I removed it. Directory `.runs/fix/` stays empty and is ignored.

## Choices

- Commit message in English and without the Polish quotation marks of the button's name (`Koniec przejscia`): the first attempt with the quotation marks broke the shell's quoting and was not committed. Cost if wrong: none; the repository's history names the button with the marks, mine does not.
- The first message file had a byte-order mark; I amended it away before return rather than leave it in the history.

## Unread material

none (the plan and the frozen task, named "reference only" by the handoff, I did not read; the findings carried what the fix needed).

## Searches not found or unclear

none
