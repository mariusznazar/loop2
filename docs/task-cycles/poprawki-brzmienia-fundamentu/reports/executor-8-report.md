# Report - executor of slice 8

**Status:** done (one check not run: ruff, the environment `.runs/quality-venv` is missing)

**Commit:** `c753bc5e` on `task/poprawki-brzmienia-fundamentu` (base `2c17721d`)

**Files changed** (12 insertions, 11 deletions in all):
- `foundations/decisions.md` (+7 / -6): D-104, D-271, D-49
- `foundations/invariants.md` (+1 / -1): `sprite-credits`
- `README.md` (+2 / -2, two long lines)
- `tests/invariants/account_container_support.py` (+1 / -1)
- `tests/deploy/test_account_storage.py` (+1 / -1)

## Items of the slice

1. **D-104, last item of `tests:` (To do 7.15 a)** - made. Was: "every route the application answers with a method other than GET and HEAD listed by a case that checks these guards on it." Now: "every route the application answers with a method other than GET and HEAD found on the list of guarded routes that the case of these guards holds, a route off that list failing the case, as does a route on it that the application lacks." Read from `tests/transport.test.mjs:1372-1409` (`every route the application answers with a method other than GET and HEAD is a route a guard case lists`): it holds a hand-written list (the eight account POST routes of `guardedAccountPaths`, `PUT` save, `POST` reset, four owner POST routes) and two `deepEqual` checks, routes of the app off the list and listed routes the app lacks. It does not check that each listed route is guarded in some other case (the comment names those cases); the clause no longer says so. No path or test name in the clause (the template forbids them). The binding sentences are untouched, so the `decision: D-104 "..."` lines hold.
2. **D-271, item of `tests:` (7.15 b)** - made. Was "every picture file of the sprites assigned to the pack it comes from, and every such pack whose licence asks for a credit having a line among the game's credits". Now: "every picture file of the sprites having an assignment to a pack in the table of its test, which does not judge whether the assignment is right, and every pack that table assigns a file to, where its licence asks for a credit, having a line among the game's credits". Read from `tests/view/icons.test.mjs:386-457` (`PACK_OF_SPRITE`, `SPRITE_PACKS`, the two `sprite-credits` tests).
3. **D-271, *Rejected* (To do 2.13)** - made: "hand pixel work whose look is judged only at the request" -> "...only once it is made" (the *Rationale* already said so).
4. **D-49 (7.15 e)** - made: `account-server-default-address` now in code marks in the second sentence. The first sentence, which `tests/quality/test_invariant_support.py:127,138` quote, is unchanged.
5. **`README.md` line of D-49 test (7.15 d)** - made: "one test of the default address" -> "one test file of the default address, `tests/invariants/test_account_server_default_address.py`: ... in a case for each of the two starts, one wholly unconfigured outside production and one fully configured with valid settings, and each case passes when ...". Checked against the file: two `test_*` cases, `"test"` env without account settings and `"production"` env with all settings.
6. **`README.md` point 2 of "First run", the list of sprite files (To do 2.13 / 7.15)** - made. The `mage-bend` and `fire-small` are named under Pixel Crawler (the bending mage "made by hand from the pack's mage", from commit `6780cf5d`; the smaller flame "cut down by hand from the frames of its fire", from D-271 and `96d7b4f3`); a second pack "[LPC] Wolf Animation" (CC BY 3.0) with the four `wolf-*.png`; a third "Smoke & Fire Animated Particle [16x16]" (CC BY 3.0) with `dust.png`, and a sentence that the licences of the second and third ask for a credit, which the section "Autorzy grafiki" gives. Checked against `assets/sprites/`: all 18 PNG files are named in the README under the pack `PACK_OF_SPRITE` gives them, and no named path is missing on disk (shell loop, output "named" x18, no "MISSING", no "NOT A FILE").
7. **Invariant `sprite-credits` (To do 2.13)** - made: the sentence now ends "..., the pack of each file being the one the list of the sprite files in `README.md` names." Fields unchanged; no `invariant:` line added or changed.
8. **`tests/invariants/account_container_support.py`, helper `wait_until_ready` (7.15 c)** - made: the line `decision: D-112 "..."` is now the plain comment `# The server opens its database before its readiness line, so this wait follows the opening (D-112).`
9. **`tests/deploy/test_account_storage.py` (7.15 f)** - made: `test_replaced_container_keeps_accounts_and_sessions` -> `test_replaced_container_keeps_accounts_sessions_and_saved_game_states`. The test does check the saved game state after replacement (lines 144-148). No other reference to the old name (`git grep`).

Rule 4 (quotations of test lines): no binding sentence of D-104, D-271, D-49 or D-112 was reworded, so no `decision:` line needed a change.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the decisions and again after the invariant: exit 0, `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py` at the end: exit 0, `0 errors`. Lines `listed:` (6, no error), each an invariant that reads `test` whose sentence this change reworded while no file citing it changed: `account-server-runtime`, `terrain-drawing-numbers`, `player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge` (all from earlier slices) and `sprite-credits` (this slice; the citing file is `tests/view/icons.test.mjs`, not in this slice's Change). Now the sentence says the README list names each file's pack; the test's table `PACK_OF_SPRITE` agrees with it today (checked in item 6), but no test reads the README.
- `npm test -- tests/deploy/test_account_storage.py`: exit 0 (1 test, 118 s, Docker daemon answered).
- `npm test -- tests/invariants/test_account_server_default_address.py`: exit 0 (2 tests).
- `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml` on the two Python files: **not run**, `.runs/quality-venv` does not exist in the worktree. Not a pass. By eye: the changes are a renamed method and a comment; `ruff.toml` selects no line-length rule (lines over 100 characters already stand in the files).

## Own-work check

Requirement most likely unmet: the README list of sprite files must be complete and true "checked against `assets/sprites/`", as the invariant now leans on it. Check: loop over all 18 files of `assets/sprites/` for their path in code marks in `README.md`, and over every `assets/sprites/*.png` path in the README for its existence. Result: all named, none missing. Second most likely: the new `tests:` clauses overstate a test; both were written from reading the tests (items 1, 2).

## Choices

- D-104 clause says the case also fails for a listed route the app lacks (the test's second `deepEqual`), kept short; rejected a bare "listed by the case" (the old, misleading words). Cost if wrong: a clause slightly longer than needed.
- README: kept "whose terms do not require a mention" for Pixel Crawler though the environment fact now reads "ask for no credit except where the project has a saxophone solo"; the game has no saxophone solo, so the sentence stays true. Rejected: copying the saxophone sentence into the README.
- README describes `dust.png` as of the cloud of "a miss and of a scuffle" from D-271's first sentence.

## Reaches beyond the handoff

- `tests/view/icons.test.mjs:380-457` (read, not changed) and `src/browser/view/credits.ts` (read), to word the D-271 clause and the README packs. `git log` of `mage-bend.png`, `fire-small.png`, `dust.png` for how they were made. `foundations/invariants.md:508-516` (`account-server-default-address`) and `:1288-1296`. `README.md:20-40`, `:60-96`. All inside the slice's files or their direct evidence.

## Unread material

- The task `Read` list: `tests/transport.test.mjs:283-330` read (lines 270-339), `:431-640` not read in full (read only what the case at `:1372-1409` and the heading lines needed; grep of `decision: D-104` lines); `foundations/decisions.md` D-273 (`:4998-5030`) and D-205 (`:3676-3704`) not read (not touched by any item, no wording of them is quoted by a changed line); D-112 read whole, D-104, D-271, D-49 whole. `.the-way/elements/decisions/examples.md` read (names WAY-03 only; WAY-03 itself not opened). `.the-way/elements/invariants/examples.md` not named by the handoff, not read. Plan `:18-48` not read separately (the rules are copied in the handoff). `task.md:26`, `:40`, `:87`, `:164`, `:192-196` read as part of reading the whole task file.
- `guidelines/testing.md` read whole; `guidelines/coding.md` read whole.

## Searches not found or unclear

- none that blocks. The task item 2.13 names "point 2 of the list of images in `README.md`"; it stands as point 2 of the list after "Two commands build and run the server" (line 34), not under a heading "First run" as such (the heading above is the first-run section); adapted without question.

## Working copies

- `.runs/executor-8/` (logs of the two focused test runs) stood in the worktree; removed before returning. The tests' own temporary copies (built copy, Docker images, containers, volumes) are made and cleaned by the product's tests and stay outside this rule.
