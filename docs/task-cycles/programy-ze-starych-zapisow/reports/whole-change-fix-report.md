# Report — the fix of the Minor findings of the whole-change review (findings 1 to 16)

**Status:** done (with the notes under *Choices* and *Contested in part*; no question blocks).

Worktree `the task's worktree`, branch `task/programy-ze-starych-zapisow`, range from `7adcc0bb`.

## Commits (6, on top of `7adcc0bb`)

| Commit | What |
|---|---|
| `7a7b318f` | tests: findings 1, 2, 3, 7, 8, 12 (`tests/account-storage.test.mjs`, `tests/http.test.mjs`, `tests/sim/previous-programs.test.mjs`, `tests/sim/program-list.test.mjs`) |
| `ec7973ef` | guidelines: findings 4, 5, 6, 13 and the two new case titles of finding 7/8 (`guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-simulation-module.md`) |
| `0e43afdb` | page: findings 9, 10, 16 (`src/browser/view/app.ts`, `src/browser/view/previous-save-lines.ts`, `tests/view/previous-save.test.mjs`) |
| `086a2644` | finding 14 (`src/browser/kitchen-sink/kitchen-sink.ts`, `guidelines/styleguide-browser-view.md`) |
| `5fe76674` | foundation: findings 14 (D-44) and 15 (D-112) (`foundations/decisions.md`), through the rules of `the-way-record-decision` |

Files changed with added/removed lines (`git diff 7adcc0bb --stat`): `foundations/decisions.md` +4/-4, `guidelines/coding-simulation-module.md` +21/-21, `guidelines/coding.md` +10/-9, `guidelines/styleguide-browser-view.md` +14/-9, `guidelines/testing.md` +10/-10, `src/browser/kitchen-sink/kitchen-sink.ts` +9/-5, `src/browser/view/app.ts` +8/-5, `src/browser/view/previous-save-lines.ts` +8/-3, `tests/account-storage.test.mjs` +21/-2, `tests/http.test.mjs` +18, `tests/sim/previous-programs.test.mjs` +123, `tests/sim/program-list.test.mjs` +28, `tests/view/previous-save.test.mjs` +~120/-~45. No change to `src/server/**` or `src/browser/sim/**` (every mutation of those files was restored byte for byte; `git status` clean after each).

## The findings, one line each

1. `tests/account-storage.test.mjs`: the privilege is no longer granted to the blocked account, so the step answers `blocked` only if the block is read first; comment reworded. Mutation (swap of the two reads in `resetSavedGame`) fails the case.
2. Same file: the case now resets twice for a privileged account (second answer `nothing-to-move`) and checks the slot still holds the first document and no current save. Mutation (the `nothing-to-move` branch deletes the slot) fails the case.
3. `tests/http.test.mjs`, case "a reset with any field…": a body with a field and no cookie, and with a forged cookie, is 400 `invalid-request` and moves nothing. Mutation (session check before the field check in `src/server/account-routes.ts`) fails the case. Added to the second case only: one request carrying a field without a session is all the order needs.
4. `guidelines/testing.md`, `src/server/` row: the title "the reset moves the save to the previous slot and answers 204, a second reset changes nothing, and a card on another revision then gets the conflict" added (it exists at `tests/http.test.mjs:4590`).
5. `guidelines/coding.md`: the two paragraphs reflowed to about 80 columns; no word changed.
6. `guidelines/coding-simulation-module.md`: the table realigned to the width of `previous-programs.ts` (every row re-padded, as Prettier pads).
7. `tests/sim/previous-programs.test.mjs`: one case: `undefined`, a `Map` and a class instance are no document, no game and no item (item: skipped by place); a null-prototype document, game and item is read. Mutation (`isPlainObject` accepting any object with an object prototype) fails it.
8. Same file: one case: a 30 000-deep value at six places of a document (id, name, program, extra key, condition, trip plan) and at the game and the version, and a list of 200 000 items, read with no throw and with the expected items. Mutation (`JSON.stringify(value)` at the start of `readItem`) fails it, while the existing sweep over `HOSTILE_VALUES` stays green, so the case catches what the sweep cannot.
9. `GAME_STARTS_ANEW` moved from `app.ts` to `previous-save-lines.ts` beside `RESET_NOT_ALLOWED` and `RESET_FAILED`, exported; the module's comment names the reset's sentences; `previous-save.test.mjs` imports it.
10. `app.ts` `logOut`: after the success branch of `await client.logout()`, `if (game !== view) return;` before the failure sentence and the conflict reload. Three new page cases in `tests/view/previous-save.test.mjs` (see *Choices*). Mutations below.
11. No file touched, as the dispatch says.
12. `tests/sim/program-list.test.mjs`: one round-trip case: names `Program`, `program`, `Program (2)`, `PROGRAM 2`, Polish letters with an emoji, 5000 characters, appended to `team()`, then `savedGame` of the state with a save time (`withSaveTime`), JSON, `loadSavedGame` gives `{ ok: true, state }`. Expected names written out. Mutation (`nextProgramId` not raised in `appendPrograms`) fails it; another (name taken case-sensitively) fails it too.
13. `guidelines/testing.md`: `previousSaveAllowed` named in the answers of `GET /api/account`, `POST /api/accounts` (`false`) and `POST /api/session`; the two new routes added to the route lists of the no-session row, the blocked-account row (with the reset between session check and move, D-396) and the Origin and body rows; "dziesięciu tras" is now "dwunastu" (the 12 paths of `paths` in `src/server/account-routes.ts:48-61`).
14. Kitchen-sink: the loading state of "Przycisk niszczący" shows "Zacznij od zera" disabled (the text it keeps, as `program-list.tsx` does) in place of "Nie dotyczy"; `Loading` takes `null` as "disabled, text kept". Styleguide: the loading bullet names "Wciąganie…" and the destructive wait; the *Przycisk niszczący* paragraph no longer says the destructive button never waits; the kitchen-sink rule lists the waiting destructive sample; `Decision:` of the rule gains D-395 and D-396. D-44: the waiting label of the pull added (its destructive wait was already there). Screenshot below.
15. D-112: "the reset of the game" in the decision paragraph, in two places of *Rationale* and in *Rejected* (the four sentences about the previous save); the sentences about the password reset are untouched. No glossary entry (see *Choices*).
16. `tests/view/previous-save.test.mjs`: the generated sentences are asserted by role, count and names (`\b3\b`, the names `Stary`/`Obcy`, the place `4`, no appended name, no digit for the skipped-only sentence); the fixed sentences by the exported constants `CHECK_FAILED`, `FETCH_FAILED`, `NO_PREVIOUS_SAVE`, `NOT_ALLOWED`, `GAME_STARTS_ANEW` and `pullResultLine({ ok: false })`. The one test that keeps the full wording is "the result line of the reader's answer names the appended count and the skipped programs". Mutation (`appended` counting every item) fails four cases, the pure one included.

## Checks (command, exit code)

- `npm test -- tests/account-storage.test.mjs`: 0 (82 pass). `npm test -- tests/http.test.mjs`: 0 (95 pass). `npm test -- tests/sim/previous-programs.test.mjs`: 0 (19). `npm test -- tests/sim/program-list.test.mjs`: 0 (34). `npm test -- tests/view/previous-save.test.mjs`: 0 (44). Also 0: `tests/view/account-screen.test.mjs` (131), `tests/view/program-list.test.mjs` (23), `tests/view/menu-bar.test.mjs` (29), `tests/view/uncaught-failure.test.mjs` (17).
- `npm run typecheck`: 0.
- `npm test -- tests/quality/test_quality_invariants.py`: 0 (5 tests: eslint, prettier, ruff, shellcheck invariants). `npx prettier --write` run on every changed TS/MJS file beforehand.
- `npm test -- tests/invariants/test_application_build_kitchen_sink.py`: 0 (3 tests).
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the decision edits: 0, `0 errors`. Final `python -B .the-way/elements/common/foundation_check.py` at the end: 0, `0 errors`.
- Not run: the product's gate `npm test` (the orchestrator's).

### New tests failing on purpose (each mutation restored byte for byte from a copy; `git status` clean after)

| Finding | Mutation | Command | Exit | Failing case |
|---|---|---|---|---|
| 1 | `resetSavedGame` reads the privilege before the block | `npm test -- tests/account-storage.test.mjs` | 1 | "a reset moves nothing without the privilege, for a blocked account, and with no current save" |
| 2 | `nothing-to-move` branch deletes `previous_saves` row | same | 1 | same case |
| 3 | `POST saved-game-reset` checks the session before the fields | `npm test -- tests/http.test.mjs` | 1 | "a reset with any field is a 400…" |
| 7 | `isPlainObject` returns `typeof prototype === "object"` | `npm test -- tests/sim/previous-programs.test.mjs` | 1 | the new plain-object case |
| 8 | `JSON.stringify(value)` at the start of `readItem` | same | 1 | the new deep/long case (and the "nothing else is read" case) |
| 12 | `nextProgramId: state.nextProgramId` in `appendPrograms`; also `taken.has(name)` | `npm test -- tests/sim/program-list.test.mjs` | 1 | the new round-trip case (among others) |
| 10 | remove the new `game !== view` line | `npm test -- tests/view/previous-save.test.mjs` | 1 | "a logout that fails after the reset built the new game leaves that game as it is…" |
| 10 | guard before the success branch (`mine !== latest \|\| game !== view`) | same | 1 | "a logout that the server ended after the reset built the new game brings the forms" |
| 10 | `dropGame` no longer clears `logoutSentence` | same | 1 | "a reset that succeeds after a logout failed uncertainly builds the new game without that logout's sentence" |
| 16 | `appended` counts every item in `pullResultLine` | same | 1 | four cases, incl. the pure sentence test |

## Own-work check (section 3)

Requirement most likely unmet: finding 10 asks for "a `game !== view` check after the awaits of `logOut`", and a check at the top of that continuation would drop the answer of a logout the server ended, after the reset replaced the game, leaving a live-looking new game on an ended session. Check: the case "a logout that the server ended after the reset built the new game brings the forms". It passes with the guard placed after the success branch (forms stand) and fails with the guard before it (mutation above). The screen change of finding 14: `npm run kitchen-sink -- --build-only` (0), the page served from `dist/kitchen-sink` by `python -m http.server` on 127.0.0.1:8765, `playwright-cli eval` read the row ("Zakończ | Zakończ | Zakończ | Zakończ [disabled] | Nie dotyczy… | Nie dotyczy… | Zacznij od zera [disabled]"), and the screenshot was looked at before the push. Console: only Chrome's password-field notes and a favicon 404. The server was stopped by its process number, the browser closed.

Screenshot (D-357, `mariusznazar/screenshots`, branch `loop2/programy-ze-starych-zapisow`, only made-up values on it): commit `ee360ac729dd535acc142b4961f2a41bcc3256b5`, file `loop2/programy-ze-starych-zapisow/kitchen-sink-destructive-loading.png`:
`![The kitchen-sink row of the destructive button: the loading column shows "Zacznij od zera" disabled](https://github.com/mariusznazar/screenshots/blob/ee360ac729dd535acc142b4961f2a41bcc3256b5/loop2/programy-ze-starych-zapisow/kitchen-sink-destructive-loading.png?raw=true)`
The clone is in `.runs/screenshots` (git-ignored); the local copy is `.playwright-cli/kitchen-sink-destructive-loading.png`.

## Choices (way rejected and its cost if wrong)

- **Finding 10, where the guard stands.** After the success branch, not at the top of the continuation. Rejected: the guard at the top (what the finding words) — it makes a logout the server ended after a reset do nothing, so the player stays on a new game whose session is gone until its first save gets 401 (D-211); it passes `logout ok` through the forms as before the fix. If the orchestrator wants the top placement, one line moves and the third new case turns.
- **Finding 10, tests.** Three page cases cover the orders: logout answers failure after the reset (with a `saved` and with a `conflict` save outcome, the latter being the finding's triple), reset answers 204 after the logout failed, logout ends the session after the reset. They look in the menu with `textWithMenuOpen`, because a click on the reset control outside the menu closes the menu and the failure sentence is then not in the page (the first version of the second case failed on that precondition).
- **Finding 15, glossary.** None written: with "the reset of the game" in the four sentences the entry has one meaning per word, and D-396 and the guidelines already name the act. Not read: `foundations/glossary.md` (I judged from the finding's text that no entry exists for either meaning). If a glossary entry for "reset of the game" is wanted, it is a separate `the-way-record-glossary-term` step.
- **Finding 13, row 229 and the previous-save read.** Only "dwunastu tras" changed there; no claim of a transport refusal for `GET /api/previous-saved-game` was added, because no transport test sends it (the gate stands before the route as for all 12 paths, per `router.all(Object.values(paths))`). Row 207 (identifier in the request grants nothing) was not in the finding and is untouched.
- **Finding 16, program-list view test.** `tests/view/program-list.test.mjs` hands the component sentences ("Wciągnięto 2 programy.", the reset failure text) as props and reads them back; that is a passthrough of an input, not wording the view produces, so it stays.

## Contested in part

- **Finding 7, the null-prototype row.** Added as the finding asks, but the only source of "a null-prototype object is plain" is the code's `isPlainObject` and the spec's words; no foundation entry fixes it, and `JSON.parse` never gives such an object. The assertion can fail only by a deliberate change of the rule. The `undefined`, `Map` and class-instance rows come from D-395's "no guess" (rationale). Drop the null-prototype lines of that case if the reviewer holds it a test of a decision, not of behaviour.
- **Finding 8.** The finding calls it a record, not a defence; I added the case because a recursive step in the reader would throw a RangeError the sweep does not reach (mutation shows it), at a cost of 200 000 skipped items per run (milliseconds).
- **Finding 14, D-44.** D-44 already named the destructive wait ("„Zacznij od zera” while its reset waits for the server among them"); only the pull's label was missing, and that is all that changed in D-44.

## Reach beyond the dispatch

- `.the-way/elements/decisions/skill/{SKILL,read,decide_entry}.md`, `.the-way/elements/common/{way_of_working,rules}.md`, `.the-way/elements/decisions/template.md`: read whole for the two decision edits (the project skill's own instruction).
- `foundations/decisions.md`: D-44, D-45, D-112, D-357, D-386, D-395, D-396, D-213 (D-213 first paragraph only), each as its entry, for the findings and for the sources of test comments.
- `.claude/skills/loop2-play/SKILL.md` (lines 1-70, 155-204): the way to run the page and push a screenshot (the handoff names D-357, the skill gives the commands). `scripts/kitchen-sink.mjs` (first 60 lines): how the page is built and served.
- `src/browser/view/controls/button.ts`, `src/browser/view/program-list.tsx` (grep), `src/browser/view/game-saver.ts` (`saveBeforeLogout`, by grep): to see what the waiting destructive button and the pending logout promise do.
- `.runs/.../spec.md` (grep for "logout", "plain object"), `foundations/invariants.md` (the entry `previous-save-programs-reader`), `src/server/database.ts` and `src/server/account-routes.ts` (the routes and `resetSavedGame`), `tests/transport.test.mjs` (lines 1000-1311).
- `tests/view/menu-bar.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/program-list.test.mjs` (git diff and grep, for pinned sentences).
- `the author's rule file on git` (before the commits) and `scripts.md` (before a one-off Python script), global rules of the user.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-608 whole; lines 609-980 only through a grep for "Zacznij od zera", "Wciąganie", "loading", "destrukc", "niszcz" (line 923 on "Restart" and "Zakończ" found; nothing else bears on the findings).
- `guidelines/coding-database-access.md`, `guidelines/coding-http-application.md`: not read; I changed no file of those kinds (only tests of the server, and `src/server` mutations that were restored).
- `guidelines/coding-saved-game.md`: not read; no file of the kind `saved-game` changed.
- `guidelines/testing.md`: lines 1-356 and 357-474 read whole.
- `foundations/glossary.md`, `foundations/part_map.md`: not read (see the glossary choice).
- `reports/whole-change-reviewer-report.md` and the slice reports `slice-<n>-executor-report.md`: not read; the findings file carried what the fix needed.
- `.runs/.../task.md`, `plan.md`: not read; `spec.md` only by grep.
- `decisions D-82`: its content taken from the text of `guidelines/testing.md` ("Where the expected value comes from"), not opened in the log.

## Searches not found or unclear

- No foundation entry states "plain object" for the reader's document, game or item (searched `foundations/*.md` for "plain object", "null-prototype", "null prototype"); the word is in the spec only. See finding 7 above.
- The handoff says finding 14's D-44 list "names neither „Wciąganie…” nor the destructive wait"; D-44 already named the destructive wait. Unclear whether the finding was written from an older wording; the pull's label was the only gap.
- The handoff asks to read the kitchen-sink's "own tests"; the only test of the page is the build invariant `tests/invariants/test_application_build_kitchen_sink.py` (marker and build output); none asserts the content of a sample, so the new sample has no automatic test, only the screenshot and the `eval` read.
- Finding 13 names lines 195, 213, 227, 228, 229 and 196, 208, 211; it does not name row 207 or the "Odmowa 4xx przed odczytem…" clause of row 229, which I left.
- A cosmetic leftover noticed, not fixed (out of scope): the comment above `accountBodyLimit` in `src/server/account-routes.ts:63` still says "the six small routes".
