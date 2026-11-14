# Return report — `wskrzeszenie-wspolne`

**Status:** done. One entry changed in the return step (D-242); everything else matched the code.

**Commits:** `b29af11b` docs: D-242 — the order inside one clock reading.

## Return step

### Foundation compared with code

Compared with the code at head `49ca4387` (and the tests that cite them):

- D-190: the shared resurrection (`Team.resurrectionReadyAtMs`), `teamAfterDeath` / `hasNoPractice` (no practice in any skill, no rank, none gathered at the loop; the loop counts `waitingPractice`), the loop going on after such a death, the renewal by the first completion of an unsolved map (`settleCompletion`, `!run.solvedMapRun`), once per map, a ready resurrection staying ready, the loop stop only for a character with practice. Matches (the M-1 clause was fixed before).
- D-216: the three death lines and the renewal line against `end-window-lines.ts` (`endCostLine`, `endRenewalLine`) and `end-window.tsx` — texts, roles and place (renewal line after the deposit line) match; reload keeps them.
- D-217, D-329: „Wskrzeszenie drużyny gotowe / za …” in `team-lines.ts`. Match.
- D-220: `createCharacter` brings no resurrection; `newGame` has `resurrectionReadyAtMs: 0`. Match.
- D-240: `catchUp` goes character by character on the shared team state; a death of a character with no practice leaves it. Match (tests in `catch-up.test.mjs`).
- D-242, D-247: D-242's "Accepted with it" sentence and D-247's clause match the code. See the correction below.
- D-386: `settleCompletion` refuses a moment that is no safe integer with a `RangeError` and reads none where nothing is to settle; the load admits an unsettled first completion. Match.
- Invariants `resurrection-renewal`, `catch-up-state` against their citing tests; glossary `resurrection`, `generation number` against D-190. Match.
- D-04, D-189, D-206, D-212, D-219, D-221, D-241, D-246, D-248, D-311, D-368 (found by the search of the foundation): still true as written; D-219 and D-206 unchanged as the task says.
- Part map, `simulation` and `browser-view`: the change adds no file; every file lies under the globs of `foundations/part_map.md` (`src/browser/sim/**`, `src/browser/view/**`, `tests/sim/**`, `tests/view/**`). No change.
- Python invariant tests that build states (`tests/invariants/test_*.py` using team or characters): run one by one with `python -B scripts/test.py <file>`; results below.

### What no longer matched, and its correction

The order of one clock reading (loops' game minutes first, then the manual run's death and first completion at the reading, commit `4f0781c3`) bound the code but no entry said it; D-242 said only where each death is settled. Corrected: D-242's third sentence now says that the manual run's death and first completion of a reading are settled after the loops' game minutes, at the reading, so that of two deaths on the one resurrection in the open game the earlier in real time takes it; its *Verification* gained a complying example (a loop's death a millisecond before the reading and the manual run's death) and a violating one (the manual run's death settled before the loops' minutes). This is a change of a decision the task listed as unchanged; it was a rule the task itself sets (To do 4: "in the open game and in the manual run the earlier death takes it") and the foundation did not state.

### Decisions written or changed

D-242 changed as above. No new decision.

### Invariants written or changed

None.

### Environment facts

None.

### Glossary terms

None. The words used (practice, resurrection, generation number) are held; „drużyna” / team is plain language.

### Part-map changes

None.

### Projected entries

None (the task is independent).

### Rows of *Settlements to record* written

None: the task's *Settlements to record* is `none`.

### Choices of the cycle (author report 1–7)

- 1 (place of the shared moment, `Team.resurrectionReadyAtMs`): binds the shape of the saved game state, which the code, D-386 and the version raise hold; the field's place is a detail of the shape, not a rule — stays a row of the questions table.
- 2 and 3 (`settleCompletion` at the clock's reading; `completionSettlement`; the load admits an unsettled first completion while it refuses an unsettled death): the rule is already held — D-386 names the function, its moment checks and the load of an unsettled first completion (complies and violates examples), `resurrection-renewal` says "at the real moment of its settling", D-216 says the line stands after a load. The key's name and kinds stay a row.
- 4 (`noPractice` kind; the practice at the loop passed by `takeEnd` itself): the rule is held in D-190 and D-216; the kind's name and the way the loop passes its practice are code detail — stay rows.
- 5 (renewal line written in D-216, its question widened): already written.
- 6 (order inside one clock reading): written now in D-242.
- 7 (word "account" or "team"): the entries say "account" as the task's texts do, the screen says „drużyny”; D-216 and D-217 carry the word „drużyny” and a note to rethink it when more than one team exists; no entry needed.

## Checks

| Command | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the D-242 change) | `0 errors`, exit 0 |
| `python -B scripts/test.py tests/invariants/test_<name>.py` for each of the 14 files that mention team, characters, generation or settlement (action_in_progress, character_team, copy_save, exploring_reveal, map_run_layout, map_run_repeatability, map_run_tiles, minute_span_split, move_reach, player_map_run_pace, program_closed_lists, program_rule_pick, program_world_reference, restart_seed) | each exit 0 |

Not run: `npm test`, as instructed.

## Unread material

- `foundations/part_map.md`: now read lines 1–62 (`browser-view` and `simulation`); the rest only by search for the two parts' names. The earlier report listed it as unread; it is now read for the two touched parts.
- Everything else listed as unread or partly read in `author-report.md` stays as stated there.

## Searches not found or unclear

none
