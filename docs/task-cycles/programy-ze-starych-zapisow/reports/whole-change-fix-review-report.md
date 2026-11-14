PASS 5fe76674

# Review of the fix of the Minor findings of the whole-change review (fix variant)

Range `7adcc0bbcd683e7f633cd1f37edbb570fb451251..5fe76674bdfe1291940ddff865d4468ccaea22dc` (`git rev-parse HEAD` is `5fe76674bdfe1291940ddff865d4468ccaea22dc`, the head given); commits `7a7b318f`, `ec7973ef`, `0e43afdb`, `086a2644`, `5fe76674`. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`. Read: the findings file `reports/whole-change-findings.md`, the fix report `reports/whole-change-fix-report.md`, and the diff of the range computed by me (13 files, 5 commits). Read-only: no tracked file changed, no commit made, `git status --short` empty after each of my checks.

Counts: blocking 0; Minor remaining 0 of the sixteen; new Minor 1; out of scope 1.

## Each finding of the findings file

| No. | Verdict | Evidence |
|---|---|---|
| 1 | fixed | `tests/account-storage.test.mjs` (the case "a reset moves nothing without the privilege, for a blocked account, and with no current save"): the `setPreviousSavePrivilege(…, true)` call is gone, so the account is blocked and never privileged and the step answers `blocked` only if the block is read first; the comment now says so. My mutation (swap of the two reads in `resetSavedGame`) fails the file: `npm test -- tests/account-storage.test.mjs` exit 1, 81 pass, 1 fail. |
| 2 | fixed | The same case resets a privileged account twice (`moved`, then `nothing-to-move`) and checks that the slot still holds the first document and no current save stays (`tests/account-storage.test.mjs` +21 lines). The fixer's mutation (the `nothing-to-move` branch deleting the slot) is reported failing; the case reads the slot after the second reset, so it would. |
| 3 | fixed | `tests/http.test.mjs`, case "a reset with any field is a 400 that moves nothing, and no request names an account": a body with a field and no cookie, and with a forged cookie, is 400 `invalid-request` and moves nothing. With the session check before the field check the answer would be 401, so the order is pinned; the fixer's mutation fails the case. |
| 4 | fixed | `guidelines/testing.md` `src/server/` row names "the reset moves the save to the previous slot and answers 204, a second reset changes nothing, and a card on another revision then gets the conflict" (word diff). |
| 5 | fixed | `guidelines/coding.md`: `git diff --word-diff` over the range prints no changed word, only line breaks. The two paragraphs are rewrapped to about 80 columns. |
| 6 | fixed | `guidelines/coding-simulation-module.md`: the word diff prints no changed word; the table is re-padded to one width (21 lines changed, none by content). |
| 7 | fixed | `tests/sim/previous-programs.test.mjs`: the case "a document, a game or an item that is undefined, a Map or a class instance is not a plain object, and one with no prototype is" (see the deviation below). The fixer's mutation (`isPlainObject` accepting any object) is reported failing; I read the case against `previous-programs.ts` and it asserts `{ ok: false }` for a document and a game, a skip by place for an item, and a read for the null-prototype set. |
| 8 | fixed | The case "a very deep value at a place of the document and a very long list of items are read without error": 30 000-deep values at six places of an item, at the game and at the version, and a list of 200 000 items. My mutation (`JSON.stringify(value)` at the start of `readItem`) fails the file: exit 1, 17 pass, 2 fail. |
| 9 | fixed | `GAME_STARTS_ANEW` moved to `src/browser/view/previous-save-lines.ts` beside `RESET_NOT_ALLOWED` and `RESET_FAILED`, exported; `app.ts` imports it; the module comment names the reset's sentences. |
| 10 | fixed | `src/browser/view/app.ts` `logOut`: `if (game !== view) return;` after the success branch and before the failure sentence and the conflict reload; three new page cases in `tests/view/previous-save.test.mjs` (both outcomes of the logout's save with the logout failing after the reset; the reset succeeding after a logout failed; a logout the server ended after the reset). My mutation (the new line removed) fails the file: exit 1, 43 pass, 1 fail. See the deviation below. |
| 11 | fixed | No file needed, as the findings file says. |
| 12 | fixed | `tests/sim/program-list.test.mjs`: the round-trip case appends `Program`, `program`, `Program (2)`, `PROGRAM 2`, a name with Polish letters and an emoji, and 5000 characters to `team()`, writes the expected names out, stamps a save time, goes through `savedGame`, JSON and `loadSavedGame`, and expects `{ ok: true, state }`. My mutation (`nextProgramId` not raised) fails the file: exit 1, 29 pass, 5 fail. |
| 13 | fixed | `guidelines/testing.md` (word diff): `previousSaveAllowed` named in the answers of `GET /api/account`, `POST /api/accounts` and `POST /api/session`; the two new routes added to the lists of routes of the no-session row and of the blocked-account row (with the reset between the session check and the move, which a test covers), and to the Origin and body rows; "dziesięciu" is "dwunastu". I counted the paths in `src/server/account-routes.ts:48-61`: twelve. |
| 14 | fixed | `src/browser/kitchen-sink/kitchen-sink.ts`: the loading column of "Przycisk niszczący" is a disabled button that keeps its text; I built the page (`npm run kitchen-sink -- --build-only`, exit 0), served `dist/kitchen-sink` on 127.0.0.1 and read the row with `playwright-cli`: "Przycisk niszczący \| Zakończ \| Zakończ \| Zakończ \| Zakończ [disabled] \| Nie dotyczy… \| Nie dotyczy… \| Zacznij od zera [disabled]". `guidelines/styleguide-browser-view.md`: the loading bullet names "Wciąganie…" and the destructive wait, the *Przycisk niszczący* paragraph no longer says the destructive button never waits, the destructive sample is listed in the kitchen-sink rule and its *Decision:* line gains D-395 and D-396. D-44: the pull's label added. |
| 15 | fixed | `foundations/decisions.md` D-112: "of the game" added in four places, each a sentence about the reset of the saved game state (the decision paragraph, two in *Rationale*, one in *Rejected*); the sentences about the password reset are untouched (word diff, 4 insertions). |
| 16 | fixed | `tests/view/previous-save.test.mjs`: the generated sentences are asserted by class, count (`\b3\b`, `\b2\b`, `\b1\b`), the names and the place, and by the absence of a digit or of an appended name where the requirement says so; the fixed sentences by the exported constants. One test keeps the full wording of the result line through `pullResultLine`. The fixer's mutation (`appended` counting every item) is reported failing four cases. |

## The two deviations

**Finding 10, the guard after the success branch rather than at the top of the continuation. Accepted.** At the top (`if (mine !== latest || game !== view) return;`) the continuation would drop the answer of a logout the server did end: the session is gone, the page would keep the new game, and the first save of that game would meet a 401 and only then show the forms (D-211, D-97). After the success branch the forms come at once, as when the logout answers before the reset, and the guard still stops the two things the finding was about: the failure sentence on the new game and the reload for a lost save of the old game. The third new page case ("a logout that the server ended after the reset built the new game brings the forms") pins that placement, and the fixer reports that the top placement fails it. The finding said "after the awaits of `logOut`"; the placement is a reading of the intent and a better one. Nothing else in the continuation touches the new game: `logoutWaiting` is cleared by `dropGame` anyway, and `later` (the held outcome) concerns the old game.

**Finding 7, the null-prototype row. Accepted, kept.** No foundation entry says "plain object", as the fixer found. The row is not invented, though: `src/browser/sim/saved-game.ts` (lines 112-116, the exemplar of the kind `saved-game`) admits exactly the same prototypes, `Object.prototype` and `null`, and `coding-saved-game.md` says the document is read strictly from its own keys only, so the reader's `isPlainObject` matches the load. The row guards against a change that would make the reader refuse more than the load does; `JSON.parse` never gives such an object, so it can fail only by a deliberate change. It tests an implementation detail a little more than behaviour (`testing.md`, *Behaviour, not implementation*), but it is one assertion in a case whose other rows (`undefined`, a Map, a class instance) are the point of the finding. Dropping the null-prototype lines would also be acceptable; I do not ask for it.

## Foundation edits against the template of `the-way-record-decision`

I read `.the-way/elements/decisions/template.md` whole (fields, binding sentences, "Changing a decision", "Relations and precedence", "Verification").

- **D-44:** edited in place; the added clause ("as the button „Wciągnij programy z poprzedniego zapisu” reads „Wciąganie…” while its pull waits (D-395)") stays inside the same binding sentence, so the paragraph keeps its sentence count; present tense, no *should* or *will*; *Scope*, *Relations*, *Verification*, *Origin* untouched. D-44 had no relation to D-395 before and the template's relations are only `derives from` and `narrows`; a reference by number in the text, as the entry already makes to D-173 and D-396, is allowed.
- **D-112:** edited in place; four insertions of "of the game"; nothing else changed; no count or file named in *Rationale* or *Rejected*.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors`.

## Kitchen-sink change and the screenshot

Read the diff (`kitchen-sink.ts` +6/-8): `Loading` takes `null` for "disabled, text kept"; the rest of the page is untouched. Rendered as above. The row mixes two texts: the resting, hover, focus and disabled samples read "Zakończ" and the loading sample reads "Zacznij od zera" (new Minor 17 below). The screenshot: no image file is in the commits of the range (`git diff --name-only 7adcc0bb..HEAD` filtered for `.png`, `.jpg`, `.gif` counts 0). It stands in the public repository `mariusznazar/screenshots`: I listed `loop2/programy-ze-starych-zapisow` at commit `ee360ac729dd535acc142b4961f2a41bcc3256b5` (it holds `kitchen-sink-destructive-loading.png` among the earlier files), and that commit is the head of the branch `loop2/programy-ze-starych-zapisow`, not of `main`. That is the place D-357 gives, with the link by commit and `?raw=true` in the fix report. I opened no image.

## Findings of this review

No Critical or Important finding comes from the fix.

New Minor (goes to the request's list, blocks nothing; within the task):

17. `src/browser/kitchen-sink/kitchen-sink.ts:234` — the sample of "Przycisk niszczący" shows "Zakończ" in four states and "Zacznij od zera" disabled in the loading column, so one row of one control carries two texts (every other row with a loading sample uses the same text throughout). The fixer chose the text of the real wait. Effect: a dev-only page reads slightly oddly. Fix: `["Zakończ", null]`, or keep as is and say it in the row's label. No effect on a player.

Noted, outside the fix diff and the task: the comment above `accountBodyLimit` in `src/server/account-routes.ts:62` says "the six small routes"; it was already stale at the base (eight small routes) and the reset makes it more so. Out of scope.

## Declined to judge

- The Polish wording of the three sentences the fixer moved or left: unchanged text, no requirement to judge.
- `tests/view/program-list.test.mjs` handing the component sentences as props and reading them back, which the fixer left as a passthrough: not part of the fix diff.

## Checks I ran (command, exit code)

At `5fe76674`, in `the task's worktree`:

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npm run typecheck` | 0 | |
| `npm test -- tests/account-storage.test.mjs` | 0 | 82 pass |
| `npm test -- tests/http.test.mjs` | 0 | 95 pass |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 | 19 pass |
| `npm test -- tests/sim/program-list.test.mjs` | 0 | 34 pass |
| `npm test -- tests/view/previous-save.test.mjs` | 0 | 44 pass |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 | 29 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 131 pass |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 | 3 tests OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| `npm run kitchen-sink -- --build-only`, a static server on 127.0.0.1, `playwright-cli eval` of the row | 0 | row as quoted above; server stopped, browser closed, `.playwright-cli/` removed |
| `gh api` (read, public repository `mariusznazar/screenshots`): the directory listing at the commit and the branches where that commit is the head | 0 | file present; branch `loop2/programy-ze-starych-zapisow` |

Mutations, each in a separate detached worktree of the head (the `node_modules` junction removed before the worktree; removed after; each mutation restored with `git checkout -- .`):

| Mutation | File run | Exit | Failing |
|---|---|---|---|
| the new `game !== view` line of `logOut` removed (finding 10) | `tests/view/previous-save.test.mjs` | 1 | 1 |
| the two reads of `resetSavedGame` swapped (finding 1) | `tests/account-storage.test.mjs` | 1 | 1 |
| `nextProgramId` not raised in `appendPrograms` (finding 12) | `tests/sim/program-list.test.mjs` | 1 | 5 |
| `JSON.stringify(value)` at the start of `readItem` (finding 8) | `tests/sim/previous-programs.test.mjs` | 1 | 2 |

Not run: the product's gate (`npm test` without a file), which is the orchestrator's; the mutations of findings 2, 3, 7 and 16, which I judged from the fixer's table and from reading the cases.

## Reach beyond the dispatch

- `.the-way/task-cycle/review/SKILL.md` and `fix.md` (named); `.the-way/elements/decisions/template.md` (whole, for the two decision edits).
- `src/browser/sim/saved-game.ts` lines 105-130 (the load's admission of prototypes, for the null-prototype row); `src/server/account-routes.ts` lines 44-68 and 405-420 (the paths and the small routes); `src/browser/view/app.ts` lines 545-600 (the whole `logOut`, to follow the guard); `src/browser/kitchen-sink/kitchen-sink.ts` (the diff and the row).
- The public repository `mariusznazar/screenshots`, read through `gh api` for the directory listing and the branch of the commit named in the fix report (nothing of the project was sent, only that public name).

## Unread material

- The review of the whole change's own report `reports/whole-change-reviewer-report.md` I wrote earlier; I did not re-read it, the findings file carries its words.
- The fix handoff (`reports/whole-change-fix-handoff.md`, if one exists) was not given to me and I did not look for it.
- Decisions: D-44 and D-112 read in their changed lines and the template; the rest of the foundation I read in the earlier review and did not reselect for this fix, which touches no new part.
- Guideline files: `guidelines/testing.md`, `styleguide-browser-view.md`, `coding.md` and `coding-simulation-module.md` I read only through the word diffs of the range and the lines I cite (I read them whole in the earlier review).
- Test files: `tests/view/previous-save.test.mjs` (the changed parts and the three new cases), `tests/sim/previous-programs.test.mjs` and `tests/sim/program-list.test.mjs` (the new cases), `tests/account-storage.test.mjs` and `tests/http.test.mjs` (the changed lines); not whole.
- I did not open the screenshot image.

## Searches not found or unclear

- none that blocked the review. Unclear only: the findings file wording of finding 10 ("after the awaits of `logOut`") against the fixer's placement; judged above.
