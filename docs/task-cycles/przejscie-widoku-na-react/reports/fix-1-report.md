# Report — the fix of the Minor findings of the review of the whole change (fix 1)

**Status: done.** No finding contested. Product code did not change; no case showed the code to differ from the reviewer's comparison, so there are no `questions`.

Range: `46e572174b32814af91fe17f3405d4383392caee..f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa`, branch `task/przejscie-widoku-na-react`, the worktree clean after the last commit.

## Commits

| Commit | Finding | What |
|---|---|---|
| `f8a2bbc4` | m1 | `tests/view/account-screen.test.mjs` (+60): one case, „„Spróbuj ponownie” is one button through a refusal, a retry and a next refusal, waiting as „Sprawdzanie…”, and takes the focus at each refusal” |
| `ce4b4a38` | m3 | `src/browser/styles.css:429` (±1): "One rule for both forms, which carry the class." became "The React button carries the class." (the reviewer's second option); nothing else in the stylesheet |
| `8b8709f0` | m2 (3) | `tests/view/previous-save.test.mjs` (+43): two cases (a conflict, a signed-out answer) of the game a reset built, acting at once while the old game's logout waits |
| `c5583a04` | m2 (2) | `tests/view/uncaught-failure.test.mjs` (+~48): one case, a reset that succeeds after an error nothing handled closes the game that stood; the file's `heldClient` gained two held calls, `loadPreviousSavedGame` and `resetSavedGame`, which no other case there uses |
| `8bdd5273` | m2 (2) | the same file: the D-323 quotations of that case rewritten to begin a sentence of D-323 (the foundation check refused the first draft, see Checks) |
| `f89dbd09` | m4 | `guidelines/coding-browser-module.md` (+10/-6): the two places |

## Each finding

**m1 — fixed** (`f8a2bbc4`). One case, expected values written out: no button while the page asks; one button at the first refusal reading „Spróbuj ponownie”, enabled, `document.activeElement` is it; after pressing it, the same element (by identity), reading „Sprawdzanie…”, disabled; after `currentAccount` ok and `loadSavedGame` refused, the same element again, reading „Spróbuj ponownie”, enabled, and focused. Ground quoted in the case: D-262 and D-44, and To do 2 of the task. jsdom moves focus off a disabled control (`tests/view/page-document.mjs`, the observer in `openWindow`), so the focus assertions are real.
The case can fail (each mutation applied, run, restored with `git checkout`; logs in `reports/fix-1-logs/`):
- `focusRetry` taken out of `draw` (`app.ts:412` replaced by `void 0;`): `npm test -- tests/view/account-screen.test.mjs` exit 1, 1 fail: "focus at the first refusal: expected <button class="button">, got <body>".
- the button remounted between states (`key={waiting.kind}` on `ReactButton` in `waiting-screen.tsx`): exit 1, 1 fail: "the same button while it retries: expected <button>, got <button>" (two different elements).
- focus only at the first refusal (`focusRetry` only when `previous` was `asking`): exit 1, 1 fail: "focus back on it at the refusal after the retry: expected <button>, got <body>".

**m2 — fixed** for the two behaviours the reviewer named (no change to the page; both cases pass on the head code, which agrees with the reviewer's comparison).
- (3) `8b8709f0`, looped over the file's `HELD_OUTCOMES` (conflict, signed-out): logout pressed, reset confirmed, the logout's own save answered saved, so the logout request waits (precondition asserted); the reset answered 204 builds the new game (precondition: one program); "Nowy program" makes the new game save (precondition: one `saveGame` waits); that save answered with the outcome; then the outcome acted at once (conflict: one `loadSavedGame` call waits; signed-out: the page text holds „Sesja wygasła”) and the old logout still waits (one `logout` call). Ground: D-402 (twice quoted), D-209, D-211.
  Can fail: a page-level counter of logouts under way, which makes `whenNotBusy` drop the outcome while any logout waits (the old global `loggingOut` in effect): `npm test -- tests/view/previous-save.test.mjs` exit 1, 2 fail ("the server's save: expected 1, got 0"; „Sesja wygasła” not found).
- (2) `c5583a04`/`8bdd5273`: page at `#/programy` with an account that has the privilege; the reset confirmed and waiting (precondition); the error reported to the window; the reset answered 204. Asserted with the file's own `assertWaitingWithSentence` (one sentence in the header, the waiting screen's place shown and empty, no card, no game, no interval left, so no clock and no saver), the bar holds no „Konto”, no call waits, and a minute of timer ticks sends nothing. Ground: D-323, D-402, D-280 (quoted).
  Can fail: `if (state.kind === "game") return;` added before the `change(...stopped)` in the `failed` branch of `showGame` (the old game stays): `npm test -- tests/view/uncaught-failure.test.mjs` exit 1, only this case fails ("after the reset: waiting: expected a true value, got false"). A coarser mutation (the `change` replaced by nothing) fails this case and two existing ones.
- The reviewer's changes 1 and 4 need no case (the reviewer's own judgement); not touched.

**m3 — fixed** (`ce4b4a38`): see the table. The invariants `browser-view-token-values` and `browser-view-focus-outline` have nothing in the changed line (a comment only).

**m4 — fixed** (`f89dbd09`). Rule *Nowy ekran i moduły w DOM*: "Strona (`app.ts`) i fabryki jej korzeni budują przez nie tylko miejsca … — nagłówek i blok główny stawia strona, a host każdego korzenia jego fabryka — oraz panel … który buduje `createFailureCard` z `src/browser/view/account-card.tsx`". Example *Gra na stronie i odpowiedzi serwera*: "Strona buduje przez API DOM tylko nagłówek i blok główny, host każdego korzenia stawia fabryka tego korzenia, a panel w miejscu zdjętej karty buduje `createFailureCard` z `account-card.tsx`; …". Checked against the code: `app.ts:253,264` create `<header>` and `<main>`; hosts at `waiting-screen.tsx:92`, `page-sentences.tsx:85`, `header-rows.tsx:35,73`, `menu-bar.tsx:335`; `createFailureCard` at `account-card.tsx:674`, a function the file does not export (the guideline already named it in the example about the card). Read as the handoff names: `.the-way/product-guidelines/coding/SKILL.md`, `.the-way/product-guidelines/template.md`, `.the-way/product-guidelines/coding/template.md`, each whole. No meaning the task did not settle, no new status in the table of files, the `Decision` field of the rule unchanged (D-265 · D-407), no value or decision repeated.

## Checks (command, exit code)

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/account-screen.test.mjs` (with m1) | 0 | 132 pass, 0 fail |
| same, with each of the 3 m1 mutations | 1, 1, 1 | 1 fail each, reasons above |
| `npm test -- tests/view/previous-save.test.mjs` | 0 | 46 pass, 0 fail |
| same, with the m2 (3) mutation | 1 | 2 fail (the two new cases) |
| `npm test -- tests/view/uncaught-failure.test.mjs` (final) | 0 | 19 pass, 0 fail |
| same, with the m2 (2) mutation | 1 | 1 fail (the new case) |
| `npx eslint tests/view/account-screen.test.mjs` | 0 | |
| `npx eslint tests/view/previous-save.test.mjs tests/view/uncaught-failure.test.mjs` | 0 | |
| `npx prettier --check` on the three test files, `src/browser/styles.css`, `guidelines/coding-browser-module.md` | 0 | all formatted |
| `npm run typecheck` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` — first run, after the m4 edit | 1 | 2 errors: `tests/view/uncaught-failure.test.mjs:864`, `:865`: the quotation does not begin a sentence of `D-323` (my first draft quoted from the middle of the sentences) |
| same, after `8bdd5273` | 0 | 0 errors |
| `python -B .the-way/instruction-files/check_instructions.py` (after the m4 edit) | 0 | 0 error, 138 warn, 7 info (warnings are the existing ones; none for the lines I changed was inspected one by one) |

Not run: the whole `npm test` (the orchestrator's alone). Each mutation was restored with `git checkout <file>`; `git status` was clean of `src/` changes before each commit.

## Own-work check

The requirement the work most likely does not meet: To do 2 of the task, "the same texts, roles, places and focus as today", for the waiting screen's button, together with spec Decision 3 (focus at every entry into `refused`). Check: the m1 case and its three mutations above; it fails on each of the two ways the executor of slice 8 named and on a third (focus only at the first refusal), and passes on the head. For m2 and m4 the check is that each case fails against a code mutation of the transition it holds, and that the guideline's sentences were read against the lines of the code the finding names.

## Choices

- m3: took the reviewer's second option ("the React button carries the class") rather than dropping the sentence, so the comment still says which element carries the class. Cost if wrong: none, a comment.
- m2 (2): the reset is confirmed before the error, not after. After the error the control still sends the reset (the page's `resetGame` does not look at `failed`), but the order "reset waits, error comes, 204 arrives" is the one the reviewer's change 2 is about. Rejected: pressing the control after the error; it holds the same transition but adds the question whether the control may send after an error, which the finding does not raise.
- m2 (3): reused `HELD_OUTCOMES` of the file instead of writing the two outcomes again, so the new cases check each outcome with the same `acted` of the file's cases about the old game's saver.
- `heldClient` of `uncaught-failure.test.mjs` extended with two held calls instead of a second client in the case: additive, and no other case calls them.

## Reaches beyond the handoff

- Read in `tests/view/previous-save.test.mjs` lines 1–272 and 1070–1488, in `tests/view/uncaught-failure.test.mjs` lines 1–480 and 650–910 and `tests/view/account-screen.test.mjs` lines 100–430, 486–630 and 5270–5470, and `tests/view/page-document.mjs` whole: the helpers and the cases the new ones stand beside (the handoff names the files, not the helpers).
- `docs/task-cycles/przejscie-widoku-na-react/spec.md` Decision 3 and `task.md` To do 2, by search for "focus", to ground the m1 case.
- D-44 whole and the first lines of D-211, by identifier, to quote them as the ground of the m1 and m2 (3) cases; the handoff names D-323, D-402, D-209 and D-262 but neither of these two.
- `.the-way/task-cycle/change/fix.md`, which `SKILL.md` section 1 names for a fix.
- `the author's rules for a commit` (the global instructions require it before a commit).

## Unread material

- D-280 (`foundations/decisions.md:4123-4191`): not read; I used only the sentence the case quotes, taken from an existing quotation of it in `tests/view/account-screen.test.mjs`, which the foundation check accepted.
- D-323: read the first paragraph (the binding text), not its rationale or *Rejected*. D-262, D-209, D-402, D-381: read whole.
- D-36, D-43, D-45, D-47, D-76, D-96, D-97, D-156, D-157, D-207, D-208, D-210, D-211 (read the first lines only), D-225, D-253, D-261, D-263–D-267, D-269, D-273–D-276, D-286, D-288, D-289, D-395, D-407, D-03 and the invariants other than `uncaught-failure-game-state` (read whole): not read; the handoff lists them as ranges for the whole task, and none is the ground of an m1–m4 case or of a guideline sentence changed here. D-44 read whole.
- `guidelines/styleguide-browser-view.md`: not read (m1–m4 change no rule of it; the only file of the part that I changed is a comment of `styles.css`).
- `src/browser/view/header-rows.tsx`, `menu-bar.tsx`, `page-sentences.tsx`: not read; their `createElement` lines were found by `grep`.
- The review's *The carried material, point by point* in `review-whole-report.md`: not read beyond the first lines; the findings file holds the reviewer's words for m1–m4, and I worked from it.
- Read whole: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `waiting-screen.tsx`, `app.ts`, `tests/view/page-document.mjs`, the findings file, `fix.md`, `SKILL.md` of make-change, and the three skill files of product-guidelines named in m4.

## Searches not found or unclear

- None unclear. One note: the handoff's *Read* lists D-209 at `foundations/decisions.md:3677-3722`, which matched.
- Observation for the request's list, not a finding of the file: the *Good* line of the rule *Nowy ekran i moduły w DOM* (`guidelines/coding-browser-module.md:194`) still says "strona buduje przez API DOM tylko miejsca, w których montują się korzenie, i panel w miejscu zdjętej karty". It reads right as a short form of the corrected text, so I left it; the finding names the two places only.

## Working copies

None made beyond the files under `.runs/fix-1/` (logs of my own runs). Removed: `.runs/fix-1/` (deleted whole). Kept in `reports/fix-1-logs/` the five logs of the mutation runs, `m1-mut-focus.log`, `m1-mut-remount.log`, `m1-mut-secondfocus.log`, `m2-3-mut.log`, `m2-2-mut2.log`, under `docs/task-cycles/przejscie-widoku-na-react/reports/fix-1-logs/`. No git worktree was made; `git worktree prune` ran.
