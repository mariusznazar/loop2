# Report — executor of Slice 6, task rana-i-opatrunek

**Status:** done

Base `17a80c095368a46b97a7ca549ebac3f1757d6596`, head `e2850d3ffdf2379e794513a2f40994d959b08e28` (one commit).

## Commits

- `e2850d3f` feat: the version of the saved game's shape rises to 12 (D-206, D-195, D-191, D-144, D-457, D-379).

## Files changed (added / removed lines, `git diff --stat` before the commit, then prettier-formatted)

- `src/browser/sim/saved-game.ts` — `SAVED_GAME_VERSION` 11 -> 12 and the comment over it (+7 / -2 in the first diff; the comment now says a version rises also where no key differs but a game of version 11 with „Wytwórz” discovered would never get the tree of „Opatrywanie małych ran”, and a combat record may hold a turn of „Ucisk”). No other line of the loader changed: slice 5 had already made it read the skill, the action and the turn.
- `tests/sim/saved-game.test.mjs` — about +460 / -60.
- `tests/sim/previous-programs.test.mjs` — +15 / -3 (version 12 added to the table of readable versions, the precondition names 12, the loop reads 6 to 12, the header comment names versions 9 to 11 and 12).

## What the saved-game test now holds

- The document of version 11 stays, written out, as `DOCUMENT_V11` (with `LAST_COMBAT_V11`); a new test refuses it as `version`, and the document of version 12 with its version written 11 too, and holds `SAVED_GAME_VERSION === DOCUMENT_V11.version + 1`. The test of version 10 no longer holds the "+ 1" pair (it moved to version 11's test). The list of other versions in "a document of another version is refused" is now 0, 9, 10, 11, 13, -1.
- The document of the current version, `DOCUMENT` (version 12), is version 11 with: the tree `tending` last among the known trees and the action `pressure` among the known actions; Ala holding `tending` with practice 110 (four points, spent on „Ucisk” 3 and the first rank of „Mocniejszy zwój” 1), the same as the snapshot of the map run's character; Ola and Ewa and the earning loop's character holding `tending` with no practice (`NEW_SKILLS_12`); the map run's practice `tending: 3` (two turns of „Ucisk” and the one tending the record counts) and `oneHandedCombat: 2`; and a last combat of five turns: strike with refill, „Załóż”, strike, „Ucisk” from a pocket (refill false, health 65 -> 95), „Ucisk” refilled through the empty pocket from the backpack (refill true, health 88 -> 100, the full health), outcome `creatureDeparted` with the wolf at 12, practice `{ oneHandedCombat: 2, tending: 2 }`, rule starts `{ 3: 2, 7: 1, 8: 2 }`, the stick in the hand, empty pockets, the backpack of seven pieces. `HEADQUARTERS` is version 12 with Ala's skills of nine.
- New crafted documents of version 12, refused whole as `shape` (in `CRAFTED`): a turn of „Ucisk” with damage 6, 0.5 and -6, the refilled turn with damage, with no item, with a stick, with an item the data lack, with a field beyond its kind and item, without or with a text refill mark; „Ucisk” as the activity going on of the map run and of an earning loop; a minute counted to „Ucisk”; a rank of „Ucisk” above its price, of „Mocniejszy zwój” and „Wprawna dłoń” above their prices, „Ucisk” with two points and with no practice, a branch of tending under `exploration`, a branch of another tree under `tending`, a rank of tending with the Understanding lacking the tree, the map run's character and an earning loop's character with ranks beyond their points, a key beside the skill, no ranks, practice below 0, the map run's practice and the combat's practice of `tending` at 0; and the rule-place table gained „Ucisk” with every target that is no healing item or no item (rule places only).
- New loading tests: the current document holds the tree, the ranks and the two turns and the load gives them back (literal expected values); the edges „Ucisk” with exactly three points, the last rank of „Mocniejszy zwój”, the snapshot at the map run's start, a skill with practice and no rank, and a turn in which the wolf dodges; „Ucisk” in a rule of a program, a copy, a base and an earning loop's program loads.
- The header comment tells version 11 as the earlier ones are told and version 12 as the current one.

## Checks (command, exit code)

- First run on the base of the slice (constant still 11, document of version 12 written): `npm test -- tests/sim/saved-game.test.mjs` exit 1, 53 tests, 34 failed; the first, „a document of the current version loads into the state it describes”, got `{ ok: false, reason: 'version' }`; the tests of the new document of 12 failed the same way. (Run in the working tree before the constant was raised, not on a separate commit.)
- After the change: `npm test -- tests/sim/saved-game.test.mjs` exit 0 (53 pass) · `npm test -- tests/sim/previous-programs.test.mjs` exit 0 (25) · `npm test -- tests/view/previous-save.test.mjs` exit 0 (46) · `npm test -- tests/sim/loop-record.test.mjs` exit 0 (24) · `npm test -- tests/view/account-screen.test.mjs` exit 0 (132) · `npm run typecheck` exit 0.
- Beyond the *Checks*: `npm test -- tests/view/judging-cache-page.test.mjs` exit 0 (6), `tests/invariants/test_character_team.py` exit 0, `tests/invariants/test_program_closed_lists.py` exit 0; `npx prettier --check` and `npx eslint` on the three files exit 0 (prettier first reported the new test file; `prettier --write` fixed it before the commit). The whole suite was not run.

## Own-work check (section 3)

- Requirement most likely missed: the crafted documents refuse for the reason the task names, not for an accident of the document (a case that is refused anyway proves nothing). Check: a temporary copy of the test file (`tests/sim/zz-exec6-probe.test.mjs`, removed; the script of the mutations is kept as `.runs/task-cycles/rana-i-opatrunek/reports/executor-6-mutate2.sh`) ran only the new crafted cases and listed those not refused; with the loader as committed the list was empty. Then, one at a time, I weakened the loader and the new cases named below were the ones that stopped being refused, each mutation restored:
  - no check of a rank against the branch's prices -> „a rank of „Ucisk” above its price”, „… „Mocniejszy zwój” above its prices”, „… „Wprawna dłoń” above its prices”;
  - no check that the tree is known -> „a rank of „Ucisk” in a tree the Understanding lacks”;
  - no check that the branch belongs to the skill -> „a rank of „Ucisk” of a branch of another tree” and „a rank of „Wprawne oko” in the tree of „Opatrywanie małych ran””;
  - no check of damage 0 for healing in combat -> the three damage cases of a turn of „Ucisk”;
  - no refusal of a combat verb as the activity going on -> both „Ucisk” as the activity cases;
  - points threshold lowered to -100 -> the four cases of ranks beyond points or with no practice.
  The mutation of the version constant (back to 11) is caught by the tests of the current document, as the first run shows.
- The task item 9 (the version rises by one because the tree enters only with a pair discovered in a minute): the version is 12 and the old document is refused (test of version 11).

## Walk of `walkthrough.md`

The change alters what a player sees: an account holding a saved game of version 11 now meets the refusal and starts anew.

| Case | By what | Verdict |
|---|---|---|
| A saved game of version 11 on an account is refused as another version though its game would load under 12: the player sees the band „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” and an empty team | `npm run local` (this computer, Windows, `https://127.0.0.1:65164`), an account made through `POST /api/accounts`, a document `{version: 11, game: <the game a new game makes>}` put with `PUT /api/saved-game` (the server stored it: revision 1), then the login card in Chromium by Playwright CLI | passed: the page text read exactly that band and „Drużyna nie ma jeszcze postaci.” |
| The game started anew is saved at version 12 | `fetch('/api/saved-game')` from the page | passed: `version: 12`, `revision: 2` |
| The save of version 12 loads back at reload | reload of the page | passed: no band, the same empty team |
| A character made in a game of version 12 holds the nine skills and loads back after a reload | made „Ala” through the card, reload, `fetch('/api/saved-game')` | passed: the team showed „Ala”, the save held version 12 and the skills `exploration … dodging, tending` |
| Side observation | the page console | a 401 on `/api/account` before the login and a 404 on `favicon.ico`, both outside the task and unchanged by it |

What I did not check: the phone layout; the account with the previous-save privilege pulling programs from the version-11 save (its screen is covered by `tests/view/previous-save.test.mjs`, which passed; it needs the owner role and a command against the database); a save of version 11 made by a real game of the base (the document was made from the new game's state, which is the point of the case, since only the version refuses it). Where each check ran: Windows 11, Chromium of Playwright CLI 0.1.22, `https://127.0.0.1:65164`. The local start was stopped (`npm run local:stop`, "Local starts stopped: 1").

## Reaches beyond the dispatch

- `src/browser/AGENTS.md` (read; it concerns design tokens of the view, nothing of the slice).
- `src/browser/sim/saved-game.ts:300-345, 690-835` and `skills.ts:43-68` (`skillProgress`), `data/archetypes.ts`, `data/creatures.ts`, `data/actions.ts:225-260`, `data/balance.ts` (the five combat minutes), `program.ts:510` (`combatItem`): to know what the loader checks of a turn of „Ucisk”, the points and the longest fight; the dispatch's *Read* named `types.ts` and `data/skills.ts` only.
- `foundations/decisions.md:854-871` (D-425, the file-size limit exempts the tests, so the long test file breaks no rule).
- `.claude/skills/loop2-play/SKILL.md:1-200` for the walk.

## Working copies

- `.runs/executor-6/` (the saved loader to restore after each mutation, scripts, outputs of the runs, a cookie jar of a throwaway local account, a base copy of the test file, the document put to the local server): made in the worktree, removed with `rm -rf` of its full path before returning; only `reports/executor-6-mutate2.sh` was kept (it reads `.runs/executor-6/saved-game.ts.good`, which it needs to be made again from the committed `saved-game.ts` to run). The probe test file `tests/sim/zz-exec6-probe.test.mjs` was untracked and removed.
- The local game start and its database under `.runs/local-start/` and the Playwright session (`.playwright-cli/`) are files the product's own tools make; the start was stopped and the session closed.

## Unread material

- `src/browser/sim/types.ts`: not read whole; searched only by what the loader's code showed.
- `foundations/invariants.md:1048-1057` and `1378-1387`: read (both). `foundations/part_map.md:34-66`: the simulation entry read in part (files and trust boundary). `foundations/decisions.md` D-206, D-195, D-191: read whole. D-144, D-379, D-457 quoted in the commit as the task names them; not opened.
- `guidelines/testing.md`: read whole (two pages).

## Searches not found or unclear

- none for the code. The plan's phrase "a combat record with a turn of Ucisk that refilled an empty pocket and one that took from a pocket" did not say whether the record may still hold the wolf's dodge; see the choice below.

## Choices, with the way rejected and the cost if wrong

1. **The combat of the current document has five turns and ends `creatureDeparted`, with two strikes, not four.** The combat lasts `BALANCE.combatMinutes` = 5 minutes (`run.ts:828`), so a record of seven turns would be a document the game never writes, and the record's 5 minutes and the sums of the crafted minute cases would have to move. Rejected: seven turns with the wolf defeated (changes `RUN_RECORD`, `resolveMinute`, `attackCooldownStart`, the streak and four crafted cases with absolute numbers). Cost if wrong: a reviewer wanting the wolf defeated needs a six-turn fight, which five minutes do not allow.
2. **The wolf's dodge no longer stands in the document's combat record** (the wolf dodges only below 8 health, which needs three strikes). It is kept by the edge case „a turn in which the wolf dodges beside the turns of „Ucisk”” (exchange 4 set to a dodge). Rejected: dropping the equip turn or a Ucisk turn to keep it. Cost if wrong: the dodge is covered by an edge case, not by the document that "fills every branch".
3. **A new `NEW_SKILLS_12` (nine skills) for the characters of the current documents** instead of changing `NEW_SKILLS`, which the old documents use. The loader does not require every skill, so this is not needed to load; it makes the documents say what a created character holds (D-379). Cost if wrong: one more constant.
4. **No assertion that the game of version 11 loads under 12 if only the version is changed.** It is true now, but any later shape change would make it fail for no fault; the refusal as `version` of the old document and of the new document written 11 is held.
5. **One commit for the tests and the constant,** since the failing run on the base was made in the working tree; the repository's earlier slices split test and feature, so a reviewer may ask for a split.

## Problems observed

- None in the product. The existing `a crafted document ... refused whole as shape` test stops at its first failing case, so a mutation shows only one name there; that is why the probe copy listed all the new cases at once.
