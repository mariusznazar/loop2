# Report — executor of slice 3

**Status:** done

## Files and commits

- `tests/view/account-screen.test.mjs` — 51 added, 22 removed.
- Commit `6cbdc8b7` — `test: :white_check_mark: read the account screen's sentences and the line of saving by what the page shows, not as children of the header and the main, and click „Spróbuj ponownie” through press (D-208, D-280, D-156, D-286, D-96, D-264)`. Range `d3c20034..6cbdc8b7`. No product code changed.

## What changed

- Three helpers stand after `noticeOf`: `shownSentences(root)` gives the shown elements with `confirmation-notice` or `page-notice` under `root`, in document order. `mainOf(root)` gives the page's `<main>`. `gameElementOf(root)` gives the element with class `game-view`.
- The case "the result stands as one sentence above the game …" (formerly :1325–1327): `main` is `mainOf(root)`, not the notice's parent. The notice is index 0 of `shownSentences(main)`. `assertInOrder(main, [notice, game])` checks that it stands before the game's element. The game's element is shown, and `gameShown(main)` stays.
- The case "a refused save starts a new game …" (formerly :3340–3350): `shownSentences(main)` texts deep-equal `["Adres e-mail potwierdzony.", sentence]`. The second carries `page-notice`. `assertInOrder(main, [...sentences, gameElementOf(main)])` checks the order. The check that the headquarters are shown stays. The old `game.className === "game-view"` check is now `gameElementOf` (by class) plus the order check.
- The case "a failed save shows its line under the menu bar …" (formerly :3386 and :3391–3395):
  - `form-warning`: the shown `form-warning` elements under the line (the line itself included, since `byClass` includes its root) have the texts `["Nie udało się zapisać postępu. Gra spróbuje ponownie."]`.
  - The header comes from `root`'s children. Its shown children are read: the first carries `menu-bar-host`, and `save-line` is mapped to `[false, true]`. The check that the line is no part of the menu „Konto” and the one that the menu is closed are unchanged.
- The six clicks on „Spróbuj ponownie” (formerly :550, :1397, :1995, :2034, :2055, :3284) go through `await press(…)`. The `await settle()` after each stays, and no assertion changed.
- The comment before "the page's sentence stands in the card above the switch, …" now reads "D-261, and the roles of the page's sentence."
- The assertion at :1712 is not touched.

Ground of each changed assertion: To do 2 and settlement 3 (question 2 a), and spec Decision 1, as the slice gives. Each expected value stays written out.

## Checks

- `npx prettier --check tests/view/account-screen.test.mjs`: exit 0.
- `npx eslint tests/view/account-screen.test.mjs`: exit 0.
- `npm test -- tests/view/account-screen.test.mjs` on the committed tree: exit 0. 131 tests, 131 pass, 0 fail. No "not wrapped in act" line in the output. It ran twice, once before the commit and once after the own-work check had restored the tree, with the same result both times.
- Not run:
  - `npm run typecheck`: no TypeScript changed.
  - `npm test` with no argument: it is the orchestrator's run.
  - `python -B .the-way/elements/common/foundation_check.py`: not in the slice's *Checks*. The handoff says it is red until slice 12 because of `tests/view/react-controls.test.mjs`.

## Own-work check

- **Requirement most likely unmet:** the rewritten assertions must still pass once the start page draws in roots of its own:
  - a hidden `failure-line` host in the header between the bar and the line of saving;
  - `save-line` as a host with the sentence inside it;
  - the sentences in a host in `<main>`, after a hidden waiting host and before the game.
- **Check:** an exploratory edit of `src/browser/view/app.ts`, made by a script in `.runs/executor-3/` after the commit:
  - a hidden `div.failure-line` after the bar;
  - a `div.save-line` host holding `view.saveLine` without the class `save-line`, its `hidden` read from the inner element;
  - `showPage(hiddenDiv, div(notices), view.element)`.
- **Runs:**
  - Simulated tree with the new test file, `npm test -- tests/view/account-screen.test.mjs`: exit 0, 131 of 131 pass.
  - Simulated tree with the test file as it stood at `d3c20034`, same command: exit 1, 128 pass and 3 fail. The three failures are exactly the three cases whose assertions this slice rewrote: "a failed save shows its line under the menu bar, …", "a refused save starts a new game …" and "the result stands as one sentence above the game …".
  - Both files were restored with `git checkout --`, and the focused test ran again on the committed tree: exit 0, 131 of 131.
- **Mutations considered in my head, each caught:**
  - the sentence of the line of saving not in `form-warning`;
  - the line of saving before the bar;
  - the failure row shown without a failure (the shown children become three);
  - the refusal above the confirmation;
  - a sentence after the game;
  - a missing game element (`assertInOrder` fails on index −1).

## Reaches beyond the handoff

- `src/browser/view/app.ts:102-118` and `:167-448` (read only): to see today's tree — which classes the notices, the line of saving and the header's children carry, and how `showPage` fills `<main>` — so that the rewritten assertions pass now.
- `src/browser/view/email-confirmation.ts:129-138` (`createConfirmationNotice`, read only) and a grep of `src/browser` for `game-view`: to confirm that the class `game-view` stands on one element only.
- `docs/task-cycles/przejscie-widoku-na-react/spec.md:45` and `:84-89`: the classes that stay and the units "Sentences above the game" and "The two warning rows". I read them so that the helpers select by classes that survive Slices 6–10.
- `scripts/test-node-file.mjs` and the `scripts` of `package.json`: how the focused test runs.

## Working copies

- `.runs/executor-3/`, holding `simulate.py` and the logs `sim-new.log`, `sim-old.log` and `final.log`: removed.
- `.runs/executor-3-test.log`: the log of the first focused run. It stood directly under `.runs/` instead of in `.runs/executor-3/`, which departs from the handoff's paragraph. Removed.
- The temporary edits of `src/browser/view/app.ts` and the old copy of the test file were restored with `git checkout --`. The worktree is clean. `dist/` was rebuilt from the restored source by the last focused run.
- Nothing is kept in `reports/` besides this report.

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole, in two parts.
- `guidelines/testing.md`: read whole, in two parts.
- `tests/view/account-screen.test.mjs`: read in part, as the slice allows: lines 1–270, 520–562, 1260–1407, 1700–1715, 1980–2064, 2080–2090, 3260–3409 and 5825–5869.
- Everything else the *Read* names was read whole: spec Decisions 1, 2 and 7, `page-document.mjs:90-169`, `guidelines/coding.md`, and D-208, D-156, D-286, D-96 and D-264.

## Searches not found or unclear

- Spec :87 does not say for certain whether the `positive` page sentence keeps the class `confirmation-notice` once drawn in React. Spec :45 says the class stays with `positive`/`warning`, so `shownSentences` selects by `confirmation-notice` or `page-notice`. If a later slice drops `confirmation-notice` from the positive sentence, the two rewritten cases in `<main>` fail, and so do `noticeOf` and `noticeTexts`, which read the same class.

## Choices

- **Sentences of `<main>` selected by class (`confirmation-notice`, `page-notice`), not by role.** Rejected: by `role` alert/status. The positive sentence has `role="status"`, which other parts of the game may carry too. Cost if wrong: see the previous section.
- **The refused-save case asserts both texts, so exactly two sentences.** The old case destructured three children without a count. Rejected: destructuring the first two. The count is what the case protects (one confirmation and one refusal). Cost if wrong: none today; a later slice adding a third shown sentence there would be a change of D-96 or D-156 anyway.
- **The header is taken from `root`, not as the line's parent.** Rejected: `line.parentElement`. It holds today and after the change, but the shown-children check already proves the line is a shown child of the header. Cost if wrong: none.
- No adaptation for a mismatch between plan and code: every line number of the slice matched.
