"""Probe the installed tools and existing adapters without changing frozen checks."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path.cwd()
sys.path.insert(0, str(ROOT / "scripts"))
import check_ruff
import check_shellcheck
import quality_support

scratch = ROOT / ".runs/s2-live-probes"
scratch.mkdir(exist_ok=True)
subprocess.run(["git", "init", "--quiet", scratch], check=True, capture_output=True)
(scratch / ".gitignore").write_text(".runs/\n", encoding="utf-8")
parts = check_ruff.PARTS
mapping = "# Parts\n\n" + "".join(f"## {part}\n\n- **Files:** {part}/**\n\n" for part in parts)
mapping += "## foundation\n\n- **Files:** foundations/**\n  .gitignore\n"
(scratch / "foundations").mkdir(exist_ok=True)
(scratch / "foundations/part_map.md").write_text(mapping, encoding="utf-8")
folder = "Scripts" if os.name == "nt" else "bin"
suffix = ".exe" if os.name == "nt" else ""
local = scratch / ".runs/quality-venv" / folder
local.mkdir(parents=True, exist_ok=True)
for name in ("ruff", "shellcheck"):
    shutil.copy2(ROOT / ".runs/quality-venv" / folder / (name + suffix), local / (name + suffix))

cases = [
    ("ruff-clean", "ruff", "build-tools/new file.py", "value = 1\n", 0),
    ("ruff-defect", "ruff", "build-tools/new file.py", "print(missing)\n", 1),
    ("ruff-clean-blocking-noqa", "ruff", "build-tools/new.py", "value = 1  # noqa: F821\n", 1),
    ("ruff-nonblocking-noqa", "ruff", "build-tools/new.py", "value = 1  # noqa: E402\n", 0),
    ("ruff-literal-noqa", "ruff", "build-tools/new.py", 'value = "# noqa: F821"\n', 0),
    ("ruff-file-ignore", "ruff", "build-tools/new.py", "# ruff: file-ignore[F821]\nvalue = 1\n", 1),
    ("ruff-disable", "ruff", "build-tools/new.py", "# ruff: disable[F821]\nvalue = 1\n# ruff: enable[F821]\n", 1),
    ("ruff-nonblocking-ignore", "ruff", "build-tools/new.py", "value = 1  # ruff: ignore[E402]\n", 0),
    ("shell-clean", "shellcheck", "deployment/new.sh", "#!/bin/bash\necho ok\n", 0),
    ("shell-extensionless-defect", "shellcheck", "deployment/new runner", "#!/bin/bash\necho $missing\n", 1),
    ("shell-env-shebang-defect", "shellcheck", "deployment/new runner", "#!/usr/bin/env -S bash -e\necho $missing\n", 1),
    ("shell-quoted-data", "shellcheck", "deployment/new.sh", "printf '%s' '# shellcheck disable=all'\n", 0),
    ("shell-heredoc-data", "shellcheck", "deployment/new.sh", "cat <<'EOF'\n# shellcheck disable=all\nEOF\n", 0),
]
for directive, expected in [("disable=SC2086", 1), ("disable=all", 1), ("disable=SC2000-SC2100", 1),
                            ("enable=quote-safe-variables", 1), ("extended-analysis=false", 1),
                            ("shell=sh", 1), ("shell=bash", 0), ("extended-analysis=true", 0),
                            ("disable=SC2250", 0), ("disable=SC2248", 0), ("disable=SC9999", 2),
                            ("source=/dev/null", 2), ("source-path=library", 2)]:
    cases.append(("shell-directive-" + directive, "shellcheck", "deployment/new.sh",
                  "# shellcheck " + directive + "\necho ok\n", expected))
results = []
for index, (name, tool, path, source, expected) in enumerate(cases):
    destination = scratch / path
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(source, encoding="utf-8", newline="\n")
    module = check_ruff if tool == "ruff" else check_shellcheck
    record = scratch / f".runs/{index}.jsonl"
    actual = quality_support.run_check("live-probe", tool + "-source-rules/1",
                                       lambda: module.check(scratch), record=record)
    result = json.loads(record.read_text(encoding="utf-8"))
    results.append({"case": name, "expected": expected, "actual": actual, "record": result})
    destination.unlink()
    print(json.dumps(results[-1], ensure_ascii=True))
# Real process failure must become inability, not a named pass.
for tool in ("ruff", "shellcheck"):
    executable = local / (tool + suffix)
    try:
        quality_support.run_tool([executable, "--loop2-invalid-option"], cwd=scratch)
    except quality_support.QualityError as problem:
        code = problem.result.returncode
        assert code != 0
        print(json.dumps({"case": tool + "-real-process-error", "actual_exit": code,
                          "stderr": problem.result.stderr.decode("utf-8")}))
    else:
        raise AssertionError("invalid option succeeded")
failed = [item for item in results if item["actual"] != item["expected"]]
print(json.dumps({"cases": len(results), "mismatches": failed}))
sys.exit(bool(failed))
