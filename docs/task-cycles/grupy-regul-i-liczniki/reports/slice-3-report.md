# Slice 3 report

**Status:** done with concerns

**Commit:** `65ad040fc7e3a24e66bb65ecdbcfa0601cb2f7a6` — `test: :recycle: route invariant programs through fixture helper`

## Change

All nine assigned invariant drivers now build explicit program inputs with the existing test-only `program_from_rules` helper. Empty programs use `program_from_rules([])`. The helper remains a direct wrapper and does not choose rules, calculate expectations, or validate input.

In `test_exploring_reveal.py`, the complete activity assertion now checks that the action is exploration, its start minute is 0, and it ends at minute 20. Existing assertions still check the character's position, that the tile is unrevealed before the end and revealed at the end, and that exploration does not restart on the revealed entrance. The deliberate corrupted-record control still fails when exploration is made to start on that revealed tile, and no longer adds a rule index to the fabricated record.

Files changed (added / removed lines):

| File | Added | Removed |
|---|---:|---:|
| `tests/invariants/test_action_in_progress.py` | 4 | 3 |
| `tests/invariants/test_exploring_reveal.py` | 9 | 8 |
| `tests/invariants/test_character_team.py` | 3 | 2 |
| `tests/invariants/test_map_run_layout.py` | 6 | 5 |
| `tests/invariants/test_map_run_repeatability.py` | 5 | 4 |
| `tests/invariants/test_move_reach.py` | 5 | 4 |
| `tests/invariants/test_map_run_tiles.py` | 3 | 2 |
| `tests/invariants/test_minute_span_split.py` | 4 | 3 |
| `tests/invariants/test_player_map_run_pace.py` | 3 | 2 |

## Checks

| Command | Exit | Result |
|---|---:|---|
| `npm test` | 1 | Node: 318 passed, 0 failed, 0 skipped. Python: agent workflow 5 passed; deploy 64 passed; invariants ran 160 tests but `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass` errored because `Get-NetTCPConnection -State Listen` returned no listener objects; quality 32 passed. This is the same baseline environment error recorded in the handoff. The gate stopped before foundation checking. The Python summaries do not report skip counts, and the saved log has no Docker-specific output; the deploy suite reports 64 tests and `OK`, but the log does not establish whether those tests exercised Docker. Full output: `reports/slice-3-test.log`; captured exit code: `reports/slice-3-test-exit-code.txt`. |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`; run separately because `npm test` stopped before this check. |
| `git diff --check` | 0 | No whitespace errors. |
| `rg -n '"rules"\s*:|ruleIndex' tests/invariants/test_action_in_progress.py tests/invariants/test_exploring_reveal.py tests/invariants/test_character_team.py tests/invariants/test_map_run_layout.py tests/invariants/test_map_run_repeatability.py tests/invariants/test_move_reach.py tests/invariants/test_map_run_tiles.py tests/invariants/test_minute_span_split.py tests/invariants/test_player_map_run_pace.py` | 1 (expected) | `rg` found no raw flat wrappers or `ruleIndex` references in the nine assigned files; exit 1 is ripgrep's no-match result. |

## Reads beyond the dispatch selection

I read `package.json` to confirm the repository test command and its order, `.the-way/gate/run_tests.py` to understand the Python test directory summaries, and `tests/invariants/loop2_invariant_support.py` to understand why invariant checks build temporary copies. These reads did not change the implementation scope.

No deliberate failing-first run was needed: this slice preserves simulation behavior, and the handoff explicitly says no failing-first helper test is needed. No browser UI changed, so no screenshot check applies.

## Own-work check

The requirement most likely to be missed was leaving one driver's explicit fixture outside the shared constructor, especially an empty program or an inline scenario input. The assigned-file scan above found no raw `"rules"` wrapper or `ruleIndex`; the full test gate ran the assigned invariants, including their existing negative controls. The only reported test error was the unrelated baseline listener-enumeration environment error described above.

## Expectations and choices

The changed exploration expectation comes from the assigned `exploring-reveal` invariant and task item 2: an exploration action lasts to its end, reveals the tile then, and cannot start on an already revealed tile. Rule index is not part of that behavior. Position, reveal timing, and the corrupted-record controls remain checked.

I used the plan's single test-only constructor for each existing explicit fixture. The rejected option was to retain duplicated `{"rules": ...}` builders or add fixture-specific constructors; that would leave more call sites to migrate and make the later grouped representation switch incomplete. The chosen helper is intentionally limited to constructing the existing representation, so it cannot make a test's expected outcome follow the implementation.

No structural mismatch or adaptation was needed. No files outside the assigned list were changed, and no production code was changed.
