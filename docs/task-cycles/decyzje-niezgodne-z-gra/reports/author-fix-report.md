# Report of the fix — task `decyzje-niezgodne-z-gra` (findings M1–M4 of the review of `6be2ec6c`)

**Status:** `done`.

**Commit:** `e22516f9` on `task/decyzje-niezgodne-z-gra` (range `6be2ec6c..e22516f9`), 13 files, +26 −27. O1 (`foundations/part_map.md`) not touched, as the handoff says.

## Findings, one by one

**M1 — `tests/view/tile-list.test.mjs:268-269`, fixed as the reviewer gave it.** Now: "The line holds the stock of the tile alone, since D-70 puts the campfire's minutes left in the row of the list of revealed tiles." The second clause is the reason D-70 gives, not a claim of the case.

**M2 — line-number pointers, fixed (all five).** The reviewer's search `git grep -n -E "(decisions|invariants)\.md:[0-9]" -- tests src scripts deploy` before the fix found exactly the five places and nothing else; after the fix it finds 0. I also searched `git grep -n -E "(decisions|invariants)\.md" -- tests src scripts deploy` for other forms of pointer to the two files (no other pointer with a line number or a line range; the remaining hits are tests that read the files, not comments that point into them).
The pointers were stale as well as numbered: at base `5327f55a` and on the head, line 476 of the log is D-17 and line 450 is D-16, line 2590 is D-122 (the comments name D-23, D-144 and D-22), so the numbers did not even hold on the day they were checked. What each comment now says:

| Place | Now |
|---|---|
| `tests/sim/combat.test.mjs:217` and `:257` | `// Sources: D-23, D-144.` |
| `tests/sim/encounters.test.mjs:726` | `// Source: the invariant minute-span-split.` (line 528 of the invariants file is that entry, on the base and on the head) |
| `tests/sim/encounters.test.mjs:836` | the line removed; the line above it already says `D-144: 24 / 3 = 8 kicks…` |
| `tests/sim/encounters.test.mjs:871` | `// Sources: the invariants map-run-repeatability and restart-seed; D-22.` (lines 165 and 309 of the invariants file are those two entries, on the base and on the head) |

**M3 — `tests/sim/trip.test.mjs:639`, fixed.** Now: "D-251: the mark on the card of the map and the run read one cut." Search for the old place of the mark in test comments: `git grep -n -i "list of maps" -- tests` finds one other place, `tests/view/map-lines.test.mjs:31`, a test **title** about the list of maps hiding maps until their prerequisites are solved; it does not speak of the mark and is right, so it stays. No other test comment puts the mark on the list.

**M4 — "owner" for the person who runs the server in test comments, fixed (comment lines only).** Renamed to `operator` in 19 places, all read in context first:
`tests/account-backup.test.mjs:405`, `tests/account-mail.test.mjs:426`, `tests/account-storage.test.mjs:1219, 1989, 2176, 3020, 3164, 3166, 3442, 3444`, `tests/deploy/test_loop2_backup.py:17, 119`, `tests/deploy/test_loop2_watch.py:140`, `tests/deploy/test_restore_trial.py:3, 18` (module docstring), `tests/http.test.mjs:1796, 2235`, `tests/invariants/test_account_save_backup_encrypted.py:21` (module docstring), `tests/startup.test.mjs:582`. These are the reviewer's list; the same search I ran (`.runs/author/list_owner2.py` on `tests/`, read line by line) found no other place of this sense.
Kept: the role (`owner role`, `owner panel`, `an owner's bar`, `the owner's page`, `the owner's link „Panel właściciela”` in the tests of the panel), identifiers and addresses (`const owner`, `owner@example.test`, `asOwner`), `file_owners`/`owner` in `test_application_package_layout.py`, and two I read as not the person who runs the server: `tests/invariants/test_loop2_one_serving_process_container.py:35` (“a socket whose owner it …”, the owner of a process) and `tests/sim/skills.test.mjs:637` (a title: “its owner's run”, the character that owns the tree). Doubtful and left: none new; `tests/account-api.test.mjs`, `tests/owner-routes.test.mjs` and `tests/account-owner.test.mjs` carry the word only for the role.
Two of the places are Python module docstrings (`test_restore_trial.py:3, 18`, `test_account_save_backup_encrypted.py:21`), text that no code reads, not `#` comments.

## The fix changes comments and text of comments only

`git diff 6be2ec6c -U0 | grep '^[+-]' | grep -v '^+++\|^---' | grep -v -E '^[+-]\s*(//|#|\*|/\*)'` prints only the three docstring lines named above (module docstrings of `test_restore_trial.py` and `test_account_save_backup_encrypted.py`: the line of `The operator runs the launcher…`, `Does NOT cover: …(the operator does both before`, `well but is a wrong one; \`age\` run on the operator's computer…`). Every other changed line starts with `//` or `#`. No assertion, string, identifier, test title, file name or role value changed.

## Checks (none is the gate)

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B .runs/task-cycles/decyzje-niezgodne-z-gra/reports/inv-names-check.py .runs/author/inv-fix.txt` | 0 | 0 mismatches |
| `git grep -n -E "(decisions\|invariants)\.md:[0-9]" -- tests src scripts deploy` | — | 0 hits (before: 5) |
| `npm test -- tests/view/tile-list.test.mjs` | 0 | 15 pass, 0 fail |
| `npm test -- tests/sim/combat.test.mjs` / `encounters.test.mjs` / `trip.test.mjs` | 0 / 0 / 0 | 11 / 29 / 29 pass, 0 fail |
| `npm test -- tests/account-backup.test.mjs` / `account-mail.test.mjs` / `startup.test.mjs` | 0 / 0 / 0 | 10 / 10 / 18 pass, 0 fail |
| `npm test -- tests/account-storage.test.mjs` / `tests/http.test.mjs` | 0 / 0 | 87 / 95 pass, 0 fail |
| `npm test -- tests/deploy/test_loop2_backup.py` / `tests/invariants/test_account_save_backup_encrypted.py` / `tests/deploy/test_restore_trial.py` / `tests/deploy/test_loop2_watch.py` | 0 each | 26 / 2 / 19 / 99 tests OK |
| The gate (`npm test` with no argument) | not run | the orchestrator's |

## Own-work check

Requirement most likely not met: "the comments say no more than their case checks and carry no line numbers of the log" across the whole of `tests/`, not only the places listed. Check: the reviewer's pointer search (0 hits after), the second search for other pointer forms (none), the search for the old place of the mark (one hit, a title that is right), and the search for the person-sense of "owner" in tests read in context. The foundation check confirms that no `decision:` quotation was disturbed. What showed: all four findings held; none was wrong. One more point seen, not a finding: `tests/sim/rule-signs.test.mjs` still cites D-380 for a case that no longer promises "the backpack before the energy" (noted in the first report, not changed; the case's claim is now true to its assertions).

## Unread material

none beyond the first report's (`guidelines/styleguide-browser-view.md`, which this fix does not touch: it changes comments in tests only).

## Searches not found or unclear

none.

## Working copies

None of the kind the rule names. The scripts of this fix stand in `.runs/author/` (ignored): `fix1.py`, `fcfix.txt`, `inv-fix.txt`, `owner-w2.txt`. `node_modules/` and `dist/` of the first stage stay in the worktree (ignored, made by the product's tools), as the first report says.
