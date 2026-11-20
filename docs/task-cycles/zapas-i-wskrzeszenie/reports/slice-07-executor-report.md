**Status:** done with concerns

# Slice 7 report: the tests of the load hold the shape of version 8

## Commit and files

- Commit `f2707957` (on `task/zapas-i-wskrzeszenie`, base `20e6eaab`): `test: :white_check_mark: hold the saved-game tests to version 8 ...`
- Changed: `tests/sim/saved-game.test.mjs`, +202 / -57 lines. The commit adds nothing else.
- `src/browser/sim/saved-game.ts`: not changed. No crafted case of the slice's list was admitted by the load, so no fix was needed (see the own-work check).

## What the slice's tests now hold

- The current document (`DOCUMENT`) is version 8. Its team holds `resurrectionUsesSpent: 2` and `resurrectionNextReturnAtMs: 1760000028800000`, so the non-empty branch of the team's uses is filled. It loads into the state it describes.
- `HEADQUARTERS` is version 8 with no use spent and no moment, so the empty branch is filled too.
- The version 7 document is kept as `DOCUMENT_V7` and refused as `version`, both alone and with the version 8 team beside its number. Every older document still refuses as `version`.
- Version 8 is the current version, so the version tests now use 7 and 9 as "another version", and the server-save test uses 8.
- Crafted version 8 documents are refused whole as `shape`, in the `CRAFTED` list: a count of uses spent that is fractional, below 0, text, none, not a number, infinite, above the data's count of 3 (4), or beyond the safe integers; a moment that is fractional, text, none, not a number, infinite, beyond or below the safe integers; a moment with no use spent (also 0 with 0 spent); a moment missing with some spent; a team without either key; the version 7 key beside the new keys and instead of them.
- Settlements of a death that spent a use (`resurrectionUsed`): crafted cases for `usesLeft` missing, 4, 10, -1, 1.5, text "2", none, 2^53, and a settlement on a run that is still going on.
- Positive cases: `usesLeft` 0, 1, 2 and 3 load (3 is the data's count, admitted as the commit `20e6eaab` settled). A team with 0 spent and no moment, and with all 3 spent and a moment, load.
- The moment of the next return below zero loads (the old readiness test was renamed to match the new key).
- `dead()` now defaults to `{ kind: "resurrectionUsed", usesLeft: 0 }`, which matches the document's 2 spent before the death (`usesLeft` = 3 - 2 - 1 = 0). This is a choice I made; the alternative was a default with `usesLeft` of 2, which would not match the document.
- The helper `usedUp` sets all 3 uses spent with the next return at `REAL_MS + 1`; `deathUnready` uses it too.
- The simulation-made state test expects the death of a character with practice to settle with `usesLeft: 2` (3 uses less the one it spends).
- The failing expectation of the marked completion (old line 3128, `deposited` expected `[]`) is now `[{ item: "berry", count: 2 }]`, with an assertion that the character carries 2 berries at completion. Reason: D-189 says a marked run brings its loot out to the chest as every run does; the game deposits the berries carried (2 of the 3 taken from the chest). The 2 comes from one run of the game, not from an independent calculation, so this expectation is weaker than the others. See concerns.
- The D-386 comment in the save-time edge test now names the team's moment of the next return instead of the removed key. The comment that pointed to "question 15 of the task" was removed, so no comment points outside the foundation.
- The file was formatted with Prettier; only my new `dead()` signature line changed by it.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Red run before the edits, at the start of the slice | `npm test -- tests/sim/saved-game.test.mjs` | 1 | 13 pass, 28 fail (the version 8 document was not yet written) |
| Red run after the first edits | same | 1 | 41 pass, 3 fail (the version 7 death doc, the record test, the simulation-made state test) |
| Red run after the expectation fixes | same | 1 | 41 pass, 1 fail (the deposit of the marked completion) |
| Green run after the last fix (before the commit) | same | 0 | 44 pass, 0 fail |
| Green run after restoring the source, the commit's state | same | 0 | 44 pass, 0 fail |
| Team test file | `npm test -- tests/sim/team.test.mjs` | 0 | 22 pass, 0 fail |
| Mutant A: the spent bound and the moment-with-spent check removed, and the `usesLeft` bound changed from `>` to `>=` (a one-time edit of `saved-game.ts`, restored after) | `npm test -- tests/sim/saved-game.test.mjs` | 1 | Fails "uses spent above the data's count" (the first admitted crafted case) and "uses left 3" of the settlement test |
| Mutant B: only the moment-with-spent check removed (restored after) | same | 1 | Fails "a moment of the next return with none spent" (the first admitted crafted case) |
| Restored source | same | 0 | 44 pass; `git status` clean apart from the commit |
| Lint of the test file | `node node_modules/eslint/bin/eslint.js tests/sim/saved-game.test.mjs` | 0 | no output |
| Format of the test file | `node node_modules/prettier/bin/prettier.cjs --config prettier.config.mjs --check tests/sim/saved-game.test.mjs` | 0 | "All matched files use Prettier code style!" after `--write` |
| Decision quotes of the test file | a one-off node script (`decision: D-N "..."` lines checked against each entry of `foundations/decisions.md`) | 0 | 52 quotes, 0 not found |

- Not run, by the handoff's instruction: the full `npm test`, `foundation_check.py`, `check_instructions.py`, and Stryker (the reviewer runs the mutation tool on the changed simulation files, per `guidelines/testing.md`). The full gate is the orchestrator's or CI's, so none of the gate's checks is passed by this report.

## Own-work check (section 3)

- Requirement: crafted version 8 documents are refused whole as `shape`, and a settlement with `usesLeft` equal to the data's count loads (question 15 and D-190).
- Check: the `CRAFTED` cases and the settlement test above, plus Mutants A and B.
- Result: the load refused every listed crafted case; no case was admitted that should be refused, so `saved-game.ts` stays as it was. The mutants showed the refusals are caught by the test (the first admitted case fails the test), and the restored file passes.
- The requirement I think is most likely unmet: the load checks each settlement's `usesLeft` only against the data's count, not against the team's spent count. See concerns.

## Concerns

1. The load admits a death settlement whose `usesLeft` does not match the team's count (e.g. `usesLeft` 0 with 0 spent). The slice's list does not ask for this check. A simple check (`usesLeft` = count - spent) is not sound, because a death of another character in a catch-up can change the team's spent while a manual death stands. A stricter check would need a rule from the orchestrator. I recommend no change in this slice.
2. The load admits a `resurrectionUsed` settlement on a character with no practice. The game writes `noPractice` there. Not in the slice's list; a reviewer may craft it. Not changed.
3. The marked-completion expectation (`berry` 2) rests on one run of the game. I did not derive it from the program alone. If the eating timing changes, the test fails with the value shown.
4. The `dead()` default is a choice (see above). If the orchestrator prefers another default, the change is one line.
5. The name "a map run of a solved map comes back marked, and its completion with the empty deposit" still describes a crafted document with `deposited: []`, which the load admits. The name is accurate for that document; the marked-run deposit is covered by the renamed state.

## Walk of walkthrough.md

Not applicable: the change alters no behaviour a user sees in the running product; it changes only the tests of the load and one expectation of a test.

## Choices

- Kept the version 7 document as `DOCUMENT_V7` (instead of deleting it) because the "refused as version" test needs it.
- Did not change `saved-game.ts`: no crafted case was admitted. Rejected: adding a team-count check to the settlement (see concern 1).
- Changed the three old readiness cases in `CRAFTED` into the new team cases, and added the settlement cases to the same list, so one test covers all crafted refusals.

## Working copies

- A directory `.runs/slice-07-executor` held my scratch files: the one-off quote-check script, copies of `saved-game.ts` and of the test file before the edits and before Prettier, and the run outputs. It was removed by its full path, and its absence is confirmed. No `git worktree` was made, so none had to be removed.
- The run outputs are not kept in `reports/`; the results are in the table above.

## Unread material

- `tests/sim/saved-game.test.mjs` (3161 lines) was read in ranges, not whole: unread are lines 141–439, 1273–1499, 1701–2199, 2231–2321, 2357–2568, 2610–2721, and parts of 2833–2863 and 2897–2939. The altered cases I touched were read.
- `task.md` and `plan.md` were not opened; the passages copied in the handoff were used as the handoff gives them.
- Foundation entries quoted by altered cases but not read whole: D-212 (`decisions.md` 4169–4230), D-221, D-191, D-50, D-56, D-239, D-241, D-248, D-369, D-403 (the quoted sentences are checked by the quote script; the entries themselves are not read). `decision_index.py` was not run (see Searches).
- `tests/sim/team.test.mjs`: read only through grep.
- `src/browser/sim/game.ts` (lines 120–130 and 640–655, for the `usesLeft` formula) and `src/browser/sim/run.ts` (lines 317–327, for the eating effect): read in part, as reaches (below).
- `guidelines/coding.md`, `guidelines/testing.md` (both pages, whole), `guidelines/coding-saved-game.md` (whole), `src/browser/sim/types.ts` (whole), `src/browser/sim/data/balance.ts` (whole), `src/browser/sim/saved-game.ts` (whole): read.
- Foundation entries read whole: D-190, D-214, D-206, D-386, D-189, D-213; invariants `save-version` and `solved-map-manual-run`; `foundations/part_map.md` simulation section.

## Reaches beyond the dispatch

- `src/browser/AGENTS.md`: read, because the product's `AGENTS.md` asks for it when working in `src/browser/`. It holds browser-view rules, which do not apply to this simulation file.
- `game.ts` and `run.ts` (in part): to check the `usesLeft` formula and the eating effect behind the marked-completion expectation.
- The Windows user's private rule files (`scripts.md`, `git.md`) were read because the environment asked for them before a script and before a commit. Nothing in them changed the work.

## Searches not found or unclear

- `decision_index.py` was not run, so the altered cases' quoted decisions were not indexed by it. I read the quoted decisions named above only in part (see Unread material).
- Searched for `resurrectionReadyAtMs` in the test file: remaining hits are the version 1–3 documents (history), the version 7 document (intended), and the two crafted cases for the old keys (intended).
- Searched for comments pointing outside the foundation ("task", "slice", "question"): one hit ("question 15 of the task"), removed.
- Unclear: whether the commit's author address (the same as the repository's earlier commits) matches the rule on private repositories. I did not change it.
