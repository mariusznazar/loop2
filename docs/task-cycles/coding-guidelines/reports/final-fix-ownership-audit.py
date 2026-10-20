"""Check real map claims and trace the real live dependency audit after map repair."""
import importlib.util
import json
from pathlib import Path
import sys
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "scripts"))
import check_dependencies as audit

spec = importlib.util.spec_from_file_location("pinned_map_guard", ROOT / ".the-way/elements/part-map/format_guard.py")
guard = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = guard
spec.loader.exec_module(guard)
map_path = str(ROOT / "foundations/part_map.md")
rules = guard.read_rules()
entries, sections = guard.parse_map(Path(map_path).read_text(encoding="utf-8"), rules)
report = guard.Report(map_path)
tracked = guard.tracked_files(str(ROOT), report)
claims = guard.check_files(entries, sections, report, str(ROOT), tracked)
expected = {"package.json", "package-lock.json",
            "tests/quality/fixtures/dependency-audit/package.json",
            "tests/quality/fixtures/dependency-audit/package-lock.json"}
for name in sorted(expected):
    actual = [entry.identifier for entry in claims[name]]
    print("PINNED_GIT_PATTERN_CLAIMS", json.dumps({name: actual}), flush=True)
    assert actual == ["build-tools"], (name, actual)

real_collect = audit._collect
real_tool = audit.run_tool
collected = []
def collect(files):
    collected.append(set(files))
    print("REAL_AUDIT_COLLECT_FILES", json.dumps(sorted(files)), flush=True)
    answer = real_collect(files)
    print("REAL_AUDIT_COLLECT_PAIRS", len(answer[0]), flush=True)
    return answer

def tool(command, **options):
    print("REAL_TOOL_ARGV", json.dumps([str(item) for item in command]), flush=True)
    if options.get("input") is not None:
        print("REAL_TOOL_STDIN", repr(options["input"]), flush=True)
    result = real_tool(command, **options)
    print("REAL_TOOL_EXIT", result.returncode, flush=True)
    print("REAL_TOOL_STDOUT", json.dumps(result.stdout, ensure_ascii=True), flush=True)
    print("REAL_TOOL_STDERR", json.dumps(result.stderr, ensure_ascii=True), flush=True)
    return result

sys.argv = [str(ROOT / "scripts/check_dependencies.py"), "--fork-point",
            "c379207bfd8bd148d3589ea75604ba5165915d01", "--record",
            str(ROOT / ".runs/final-fix-audit.jsonl")]
with patch.object(audit, "_collect", collect), patch.object(audit, "run_tool", tool):
    code = audit.main()
assert code == 0, code
assert collected[-1] == expected, collected
print("PASS: each root/nested path has exactly one build-tools claim and enters the actual live audit")
