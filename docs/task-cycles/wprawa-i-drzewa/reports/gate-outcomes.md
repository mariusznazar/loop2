# Outcomes of the completed full gates

Each row names a method that failed in at least one completed full gate. A failure count is a run count, not its number of failing subtests. The original log retains every failing subtest. These methods are not among the five Docker-dependent skips. A PASS cell means the method passed within that completed invariant stage, even if another method made the whole gate fail.

The cancelled optional baseline is excluded: its invariant stage did not complete. Focused author/reviewer runs and their failure/pass counts are recorded separately in the stage reports and return.md. Initial-author totals that were not preserved remain explicitly unknown; this table does not pretend to reconstruct them.

| Full gate | Exit | Failed methods | Failure instances |
|---|---:|---:|---:|
| [gate.log](../gate.log) | 1 | 74 | 349 |
| [gate-2.log](../gate-2.log) | 1 | 1 | 1 |
| [gate-3.log](../gate-3.log) | 0 | 0 | 0 |

All named failed files belong to simulation except test_terrain_drawing_numbers.py, which belongs to browser-view. Both are task parts, recovered from the frozen task, changed files and foundations/part_map.md. No failed-then-passing check here belongs to a part outside this task.

| Method | File / part | gate.log | gate-2.log | gate-3.log | FAIL runs | PASS runs |
|---|---|---|---|---|---:|---:|
| `test_action_in_progress.ActionInProgress.test_actions_last_their_full_duration_through_program_changes` | `tests/invariants/test_action_in_progress.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_action_in_progress.ActionInProgress.test_control_the_changed_programs_choose_otherwise` | `tests/invariants/test_action_in_progress.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_character_team.CharacterTeam.test_a_send_of_a_character_no_team_holds_is_refused` | `tests/invariants/test_character_team.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_character_team.CharacterTeam.test_every_character_of_every_state_belongs_to_one_team` | `tests/invariants/test_character_team.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_copy_save.CopySave.test_control_a_switch_in_the_same_scenario_zeroes_the_streak` | `tests/invariants/test_copy_save.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_copy_save.CopySave.test_control_the_saves_were_made` | `tests/invariants/test_copy_save.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_copy_save.CopySave.test_precondition_the_streak_stands_at_ten_before_the_save` | `tests/invariants/test_copy_save.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_copy_save.CopySave.test_save_as_a_new_program_leaves_the_copy_and_the_streak_and_is_no_switch` | `tests/invariants/test_copy_save.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_copy_save.CopySave.test_save_into_the_program_leaves_the_copy_and_the_streak` | `tests/invariants/test_copy_save.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_exploring_reveal.ExploringReveal.test_control_the_comparison_flags_breaks` | `tests/invariants/test_exploring_reveal.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_exploring_reveal.ExploringReveal.test_exploring_at_the_entrance` | `tests/invariants/test_exploring_reveal.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_exploring_reveal.ExploringReveal.test_long_runs` | `tests/invariants/test_exploring_reveal.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_layout.MapRunLayout.test_a_restart_under_another_program_has_the_same_layout` | `tests/invariants/test_map_run_layout.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_layout.MapRunLayout.test_control_the_comparison_flags_breaks` | `tests/invariants/test_map_run_layout.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_layout.MapRunLayout.test_two_sends_on_one_seed_have_one_layout` | `tests/invariants/test_map_run_layout.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_repeatability.MapRunRepeatability.test_controls_the_compared_runs_can_differ` | `tests/invariants/test_map_run_repeatability.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_repeatability.MapRunRepeatability.test_restart_with_the_same_program_replays_the_run` | `tests/invariants/test_map_run_repeatability.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_repeatability.MapRunRepeatability.test_two_processes_give_the_same_run_minute_by_minute` | `tests/invariants/test_map_run_repeatability.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_tiles.MapRunTiles.test_control_single_tile_starts_are_reached` | `tests/invariants/test_map_run_tiles.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_tiles.MapRunTiles.test_control_the_comparison_flags_breaks` | `tests/invariants/test_map_run_tiles.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_tiles.MapRunTiles.test_control_the_layouts_can_show_a_break` | `tests/invariants/test_map_run_tiles.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_map_run_tiles.MapRunTiles.test_tiles_at_each_start` | `tests/invariants/test_map_run_tiles.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_a_dead_character_stays_dead_and_gives_no_events` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_control_the_comparison_flags_breaks` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_control_the_completion_scenario_completes_once_and_the_map_run_then_stands` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_control_the_discovery_scenario_stops_at_a_discovery` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_control_the_scenarios_are_what_they_are_meant_to_be` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_control_the_splits_end_a_call_at_every_minute` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_every_split_ends_a_call_in_the_minute_of_the_discovery_with_the_reference_state` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_every_split_reaches_the_same_state_and_events_at_every_minute` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_minute_span_split.MinuteSpanSplit.test_every_split_reaches_the_same_state_and_events_through_a_completion` | `tests/invariants/test_minute_span_split.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_move_reach.MoveReach.test_control_the_comparison_flags_breaks` | `tests/invariants/test_move_reach.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_move_reach.MoveReach.test_every_move_ends_on_a_neighbour` | `tests/invariants/test_move_reach.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_player_map_run_pace.PlayerMapRunPace.test_a_chosen_pace_scales_the_real_time_and_stays_until_changed` | `tests/invariants/test_player_map_run_pace.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_player_map_run_pace.PlayerMapRunPace.test_a_completion_ends_the_run_unpaused_and_drops_the_real_time_beyond_it` | `tests/invariants/test_player_map_run_pace.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_player_map_run_pace.PlayerMapRunPace.test_control_a_game_that_knows_everything_is_not_stopped` | `tests/invariants/test_player_map_run_pace.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_player_map_run_pace.PlayerMapRunPace.test_control_the_paused_inputs_would_move_an_unpaused_run` | `tests/invariants/test_player_map_run_pace.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_player_map_run_pace.PlayerMapRunPace.test_control_the_same_real_time_at_a_streak_of_100_is_not_stopped` | `tests/invariants/test_player_map_run_pace.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_player_map_run_pace.PlayerMapRunPace.test_control_the_same_real_time_at_the_pace_one_moves_the_run_less` | `tests/invariants/test_player_map_run_pace.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_player_map_run_pace.PlayerMapRunPace.test_whole_unpaused_seconds_move_the_run_on` | `tests/invariants/test_player_map_run_pace.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_closed_lists.ProgramClosedLists.test_group_conditions_accept_listed_values_and_refuse_unlisted_kinds` | `tests/invariants/test_program_closed_lists.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_closed_lists.ProgramClosedLists.test_programs_with_unlisted_kinds_are_refused` | `tests/invariants/test_program_closed_lists.py` / simulation | FAIL | FAIL | PASS | 2 | 1 |
| `test_program_rule_pick.ProgramRulePick.test_a_group_whose_condition_lies_outside_the_repertoire_is_passed_over` | `tests/invariants/test_program_rule_pick.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_rule_pick.ProgramRulePick.test_a_rule_outside_the_repertoire_is_passed_over` | `tests/invariants/test_program_rule_pick.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_rule_pick.ProgramRulePick.test_a_rule_whose_condition_names_a_target_outside_the_repertoire_is_passed_over` | `tests/invariants/test_program_rule_pick.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_rule_pick.ProgramRulePick.test_control_the_comparison_flags_wrong_picks` | `tests/invariants/test_program_rule_pick.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_rule_pick.ProgramRulePick.test_every_free_minute_of_long_runs` | `tests/invariants/test_program_rule_pick.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_rule_pick.ProgramRulePick.test_groups_skip_false_empty_and_infeasible_before_first_feasible_rule` | `tests/invariants/test_program_rule_pick.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_rule_pick.ProgramRulePick.test_no_rule_when_none_holds_and_can_be_carried_out` | `tests/invariants/test_program_rule_pick.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_rule_pick.ProgramRulePick.test_the_first_rule_with_both_is_started` | `tests/invariants/test_program_rule_pick.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_program_world_reference.ProgramWorldReference.test_held_programs_name_things_only_by_kind` | `tests/invariants/test_program_world_reference.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_restart_seed.RestartSeed.test_control_sends_take_other_seeds` | `tests/invariants/test_restart_seed.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_restart_seed.RestartSeed.test_each_restart_keeps_the_seed_of_the_run_it_replaces` | `tests/invariants/test_restart_seed.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_saved_program_edit.SavedProgramEdit.test_an_edit_of_a_saved_program_leaves_the_copy_the_streak_and_the_counts` | `tests/invariants/test_saved_program_edit.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_saved_program_edit.SavedProgramEdit.test_control_the_edit_of_the_copy_zeroes_the_streak_and_restarts_changed_counts` | `tests/invariants/test_saved_program_edit.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_saved_program_edit.SavedProgramEdit.test_control_the_edit_was_made_to_the_saved_program` | `tests/invariants/test_saved_program_edit.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_saved_program_edit.SavedProgramEdit.test_precondition_the_map_run_stands_at_ten_with_its_counts` | `tests/invariants/test_saved_program_edit.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_simulation_inputs.SimulationInputs.test_control_the_checker_sees_each_kind_of_change` | `tests/invariants/test_simulation_inputs.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_simulation_inputs.SimulationInputs.test_no_exported_function_changes_its_arguments` | `tests/invariants/test_simulation_inputs.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_simulation_isolation.SimulationIsolation.test_built_simulation_runs_with_the_language_globals_alone` | `tests/invariants/test_simulation_isolation.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_simulation_randomness.SimulationRandomness.test_control_draws_follow_the_seed` | `tests/invariants/test_simulation_randomness.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_simulation_randomness.SimulationRandomness.test_control_gathering_draws_follow_the_seed` | `tests/invariants/test_simulation_randomness.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_simulation_randomness.SimulationRandomness.test_run_calls_no_other_source_of_random_numbers` | `tests/invariants/test_simulation_randomness.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_streak_program_change.StreakProgramChange.test_a_map_run_ended_in_death_keeps_its_streak` | `tests/invariants/test_streak_program_change.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_streak_program_change.StreakProgramChange.test_a_switch_to_another_program_zeroes_the_streak` | `tests/invariants/test_streak_program_change.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_streak_program_change.StreakProgramChange.test_an_edit_that_changes_the_program_zeroes_the_streak` | `tests/invariants/test_streak_program_change.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_streak_program_change.StreakProgramChange.test_control_an_edit_that_hands_back_the_same_program_leaves_the_streak` | `tests/invariants/test_streak_program_change.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_streak_program_change.StreakProgramChange.test_precondition_the_streak_stands_at_ten_before_the_edit` | `tests/invariants/test_streak_program_change.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_terrain_drawing_numbers.TerrainDrawingNumbers.test_the_drawing_shows_no_stock` | `tests/invariants/test_terrain_drawing_numbers.py` / browser-view | FAIL | PASS | PASS | 1 | 2 |
| `test_walk_feasibility.WalkFeasibility.test_a_stock_of_zero_is_no_stock` | `tests/invariants/test_walk_feasibility.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_walk_feasibility.WalkFeasibility.test_control_the_comparison_flags_breaks` | `tests/invariants/test_walk_feasibility.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_walk_feasibility.WalkFeasibility.test_going_is_started_where_possible_and_nowhere_else` | `tests/invariants/test_walk_feasibility.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_walk_target.WalkTarget.test_control_the_comparison_flags_breaks` | `tests/invariants/test_walk_target.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
| `test_walk_target.WalkTarget.test_going_to_each_resource` | `tests/invariants/test_walk_target.py` / simulation | FAIL | PASS | PASS | 1 | 2 |
