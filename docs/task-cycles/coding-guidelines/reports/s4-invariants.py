"""Run the existing simulation-owned invariant modules, without changing their checks."""
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path.cwd() / "tests/invariants"))
names = [
    "map_run_repeatability", "simulation_randomness", "action_in_progress",
    "player_map_run_pace", "simulation_isolation", "simulation_inputs",
    "content_identifiers", "program_rule_pick", "exploring_reveal", "move_reach",
    "walk_target", "map_run_tiles", "restart_seed", "program_closed_lists",
    "walk_feasibility", "program_world_reference", "map_run_layout",
]
suite = unittest.TestSuite(unittest.defaultTestLoader.loadTestsFromName("test_" + name)
                           for name in names)
result = unittest.TextTestRunner(verbosity=2).run(suite)
sys.exit(0 if result.wasSuccessful() else 1)
