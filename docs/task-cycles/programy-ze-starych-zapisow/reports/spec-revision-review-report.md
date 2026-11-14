PASS

# Report of the review of the revised spec

- Revised spec: `docs/task-cycles/programy-ze-starych-zapisow\spec.md`
- Compared with: `spec-reviewed.md` beside it; my first report `reports\spec-reviewer-report.md`; the rulings R1-R5 and notes c, d in `reports\spec-revision-handoff.md`; the designer's `reports\spec-revision-report.md`.
- Read-only; no test or other check run. No earlier finding is open, and the rulings introduced no defect that would make the build go wrong. The notes below are for the maker or a one-line fix of the spec; none is a finding of the kinds `review.md` lists.

## My earlier findings and notes, one by one

1. **D-209 override (finding 1): resolved.** Decision 2 now keeps D-209: after a reset a save on basis 0 is accepted and gets revision 1 (the save write "keeps the revision it gives", stored revision plus 1, or 1 with no current save); the invariant about continuing the revision, the extra sentence for a conflict that finds no save and D-209 as a changed decision are gone (`spec.md:193`, "D-209 and D-213 are not changed"); the non-goals and the constraints say so. The three prices the ruling asked for are named (a card whose basis equals a revision the new game reached; a card with basis 0; the imprecise D-209 sentence), and the continuation of the revision stays as a rejected way with its reason. I checked the prices against the code: `loadGame` in `src\browser\view\app.ts:479-492` builds a new game on revision 0 when the server holds no save, and `afterConflict && start.refused === null` still shows D-209's sentence, so price 3 describes the code as it stands.
2. **Reader against the saved-game guideline (finding 2): resolved by the ruling.** The reader is now `src/browser/sim/previous-programs.ts`, kind `coding-simulation-module.md`; `saved-game.ts`, D-213 and `coding-saved-game.md` are not touched; the guideline's table gains a row (`spec.md:219`). Items are strict: exactly the own data keys `id`, `name`, `program`, a name non-empty after trimming, a program the editor's check accepts; the others skipped and named one by one. I verified the strictness is safe: `fields(item, ["id", "name", "program"])` is the item read of the load in versions 1 (2923c3c8), 2 (16f8bee8), 3 (bc8eaecd), 4 (41abf1fc) and at HEAD (5), so no genuine item of any version is skipped for its keys. The part map's *Trust boundary* of `simulation` gains the file (`spec.md:116`, `:217`) and crafted documents are the subject of its test (`spec.md:210`, `:228`). A residual risk is in note c.
3. **Finishing save and quiet period (finding 3): resolved.** Decision 6 has no save before the reset, no new state of `GameSaver`, and no "as for a logout" claim; the prices name the unsaved last moments, the save in flight and the basis-0 old game. Checked against the code, see "New defects looked for" below.
4. **Note a (older tab after a reset): resolved**, named as price 4 of decision 2 with its sequence and harm; D-210 not changed apart from the move.
5. **Note b (placement): resolved.** Both constraints are gone; `spec.md:151` states only the privilege condition, "in the game", and the confirmation whose opening click changes nothing; the maker places it by the styleguide.
6. **Note c (D-355, skill passages): resolved.** D-355 joins the changed decisions (`spec.md:191`); decision 5 names the two passages (`SKILL.md` 265-266 and 280, which I had read) and keeps the twin copy byte-identical.
7. **Note d (tests that read the schema version as 4): resolved and extended.** Decision 7 lists `tests\account-storage.test.mjs` 185-189, 323, 347, 451, 487, 594, 639, the added 1289-1290 (the assertion "no schema step is added", which I read and which is indeed false after the change), the titles at 318, 320, 444, 587, `tests\account-backup.test.mjs:281` and `tests\deploy\test_account_backup_stream.py:90`. My own grep over `tests` finds no other read of the current schema version as 4 (the version-4 mentions in `tests\sim\saved-game.test.mjs` are documents of the saved game state, not the schema).

Checked that no stale mention of the removed parts remains: a grep of the revised spec for "finishing", "quiet", "continu", "any screen" and "every turn" finds only the rejected-way sentence about continuing the revision.

## New defects looked for

- **The page's handling of the old saver's outcomes during the reset (decision 6, step 2).** The code holds, while a logout is under way, only the saver's callbacks `onConflict` and `onSignedOut`, through `whenNotLoggingOut` into one `deferred` slot whose closure acts only `if (game === view)` (`app.ts:369-375`, `:402-404`); `onOutdated` is already a no-op (`:403`). On 204 the page builds a new game, `game` is a new view, so any closure still held is a no-op even if nobody clears it, and the spec also says to drop it; on a failure the held outcome is acted on, and with none the saver, never halted, goes on. A conflict held during the wait halts the old saver, which is what a conflict does anyway. A lost answer heals as the spec says (the next save conflicts, the page loads "no save" on D-209's path). The old saver is disposed with the old game (`game-saver.ts:246-251`), so its timers and retries die. I find no defect. Two precisions, both for the maker, not for the spec: the spec's list "(conflict, outdated, signed out) are held" is exact for the first and third only (the second needs no holding); and acts the player makes in the old game between the confirmation and the 204 are lost too, which the prices (unsaved "last moments at the confirmation") cover in spirit.
- **The new reader file as a trust boundary.** It takes `unknown`, has its own plain-object, own-data-key and hole-free-list checks, imports only the simulation, refuses a version above the current, reads nothing outside `version`, `game.programs` and the items, uses no clock, and lets an error of its own code propagate; `checkProgram` for JSON-parsed data throws only `ProgramCheckError` (I read `programs.ts:23-278`). Names come from the document and are shown as text only. Cross-part imports are not affected (same part). No test in `tests\**\*.py` names `saved-game.ts`, so nothing there ties the trust-boundary list to one file.
- **The D-209 prices.** Each is consistent with the code and with the ruling. Price 4 (older tab) is also reachable through a tab of the older version that itself holds this feature when a later version bump comes; the same sequence and harm, so the price already covers it.
- **Consistency of the rest.** Foundation entries, units, non-goals and "Left to the maker" agree with the rulings. Nothing from the first review was lost: the verified claims about `writeSavedGame`, `readAccount`, `mutationGuards`, the router and the block command still hold, since the revision touched none of them.

## Notes for the maker or a one-line fix (not findings)

a. **Store the trimmed name.** The reader accepts a name that is "not empty after trimming", not necessarily trimmed (the revision report says so). The append says names "follow D-169's rule (trimmed ...)", which the maker will take as trimming the name. It is worth saying in one clause that the appended name is the trimmed one: the load refuses an untrimmed name (`givenName` in `saved-game.ts`, `characterName` = `trim`), and a game that wrote one would be discarded whole at the next load (D-386). Only crafted input can hit it.
b. **Two small inconsistencies in the spec.** `spec.md:35` still says the trust boundaries are `src/server/**` and `saved-game.ts` alone; `:116` and `:217` add the new file. `:116` says the reader "needs nothing exported from `saved-game.ts`" and imports only `checkProgram` and `ProgramCheckError`, while `:172` lets it import `SAVED_GAME_VERSION` from `saved-game.ts` or hold a constant of its own; the second is the maker's stated choice, so the first sentence should say "unless the maker imports the version constant".
c. **Placement of the new file between two kinds (the designer's own flag).** `coding-simulation-module.md` covers modules "poza ... plikiem zapisu gry"; the saved-game kind's "When to read" speaks of a file that turns "a document fetched from the server" into a game state or a refusal. The reader turns a fetched document into programs, so the spec's placement is defensible, and it is the orchestrator's ruling R2. The residual risk is that the reviewer of the change reads the saved-game kind broadly and asks for its strict reading; the strict items already satisfy that guideline's wording at the level of the items, so the cost of that reading is small. No action needed.
d. **Logout and reset at once.** The spec makes "Wyloguj" not pressable while the reset waits; it does not say the reset control is not pressable while a logout waits, and both would use the page's `loggingOut` and single `deferred` slot if the maker reuses them. Cheap to cover in the maker's tests.

## Questions

None.

## Reach beyond this handoff

- `spec-revision-handoff.md` and `spec-revision-report.md` (named by the message); `spec-reviewed.md` was not re-read, my first report and the first read of that spec being the reference.
- `guidelines\coding-simulation-module.md` lines 1-80 (the kind guideline of the new file).
- `git show` greps of `fields(item, ["id", "name", "program"])` in `saved-game.ts` at commits 16f8bee8, bc8eaecd, 41abf1fc and HEAD.
- `tests\account-storage.test.mjs` lines 1283-1293; greps of `tests` for the schema version and for `saved-game.ts` in Python tests; `src\browser\sim\game.ts` `characterName` (lines 391-398).
- A grep of `src\browser\view` for `onSignedOut`, `deferred` and `loggingOut`.

## Unread material

- `spec-reviewed.md` was not re-read; the diff against it was taken by grep (a 93-line difference) and by reading the whole revised spec and the revision report.
- `.agents\skills\loop2-deploy\SKILL.md` not opened (identical blob to the `.claude` copy, per the designer).
- `guidelines\coding-simulation-module.md`: read lines 1-80 only (table and the first two rules); the rest not read.
- Everything my first handoff named keeps the reading status of my first report (`reports\spec-reviewer-report.md`).

## Searches not found or unclear

none
