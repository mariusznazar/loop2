"""Check that no file git tracks holds an absolute path on a disk or, in a Markdown file, a note
link, by the command of the pinned the-way. Standard library only."""

import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COMMAND = ROOT / ".the-way" / "task-cycle" / "tracked_private_paths_check.py"


class TrackedFilePrivatePaths(unittest.TestCase):
    # invariant: tracked-file-private-paths
    def test_no_tracked_file_holds_a_private_path(self) -> None:
        run = subprocess.run([sys.executable, "-B", str(COMMAND), "tracked-file-private-paths"],
                             cwd=ROOT, capture_output=True, encoding="utf-8", check=False)
        self.assertEqual(run.returncode, 0, run.stdout + run.stderr)


if __name__ == "__main__":
    unittest.main()
