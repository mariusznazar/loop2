"""Capture a check's raw combined output and command evidence without shell conversion."""

import json
from pathlib import Path
import subprocess
import sys
import time

output = Path(sys.argv[1])
command = sys.argv[2:]
started = time.time()
with output.open("wb") as stream:
    result = subprocess.run(command, stdout=stream, stderr=subprocess.STDOUT)
evidence = {"command": command, "exit_code": result.returncode,
            "seconds": round(time.time() - started, 3), "output": str(output)}
with output.with_suffix(output.suffix + ".json").open("w", encoding="utf-8") as stream:
    json.dump(evidence, stream, ensure_ascii=True, indent=2)
print(json.dumps(evidence, ensure_ascii=True))
sys.exit(result.returncode)
