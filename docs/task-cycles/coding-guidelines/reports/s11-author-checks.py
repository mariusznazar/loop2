"""Check authored tables against accepted sources and exercise the audit fixture."""

from pathlib import Path
import json
import re
import subprocess
import sys

root = Path.cwd()
reports = root / ".runs/task-cycles/coding-guidelines/reports"
task = (root / ".runs/task-cycles/coding-guidelines/task.md").read_text(encoding="utf-8")
general = (root / "guidelines/coding.md").read_text(encoding="utf-8")
expected = {}
for line in task.splitlines():
    cells = [cell.strip() for cell in line.strip("|").split("|")]
    if len(cells) != 4 or not cells[0].startswith("`content-data`") and not (
            cells[0].startswith("`simulation-module`") or cells[0].startswith("`browser-module`")
            or cells[0].startswith("`http-application`")):
        continue
    kind, file = re.findall(r"`([^`]+)`", cells[0])
    directory = re.findall(r"`([^`]+)`", cells[1])[-1]
    exemplar = re.findall(r"`([^`]+)`", cells[2])[0]
    copies = re.findall(r"`([^`]+)`", cells[3])
    expected[kind] = {directory + exemplar: "exemplar", **{
        directory + name: "copy" for name in copies}}
    document = (root / file).read_text(encoding="utf-8")
    table = document.split("## Files of this kind", 1)[1].split("## Rules", 1)[0]
    actual = {}
    for row in table.splitlines():
        match = re.match(r"\| `([^`]+)` \| (exemplar|copy|do not copy) \|", row)
        if match:
            assert match[1] not in actual, "duplicate table path"
            actual[match[1]] = match[2]
    assert actual == expected[kind], kind
index = general.split("## Kinds of code", 1)[1].split("## Rules", 1)[0]
indexed = re.findall(r"(?m)^\| ([a-z-]+) \| `guidelines/coding-([a-z-]+)\.md` \|", index)
assert set(indexed) == {(kind, kind) for kind in expected}
assert len(indexed) == 4
decisions = (root / "foundations/decisions.md").read_text(encoding="utf-8")
ruff = decisions.split("### D-30/1", 1)[1].split("- **Change:", 1)[0]
accepted_examples = set(re.findall(r"`([A-Z]+[0-9]+)`", ruff))
example_headings = set(re.findall(r"(?m)^### ([A-Z]+[0-9]+)$", general))
assert accepted_examples == example_headings and len(example_headings) == 14
assert "tests/sim/time.test.mjs" in general
assert all(word in general for word in ["Node/Python", "HTML", "sesji", "zapisu gry", "poczty"])
assert "11.13.0" not in general and "12.2.1" in general
assert len(re.findall(r"(?m)^```good ", "\n".join(
    path.read_text(encoding="utf-8") for path in (root / "guidelines").glob("coding*.md")))) == 13
print("PASS: four exact accepted status tables and index; fourteen Ruff examples; test example; deferrals; npm amendment; thirteen rule pairs")
sys.path.insert(0, str(root / "scripts"))
import check_dependencies as audit
from quality_support import discover_files
owned = discover_files(root, ("build-tools",))
for name in ["package.json", "package-lock.json"]:
    assert "tests/quality/fixtures/dependency-audit/" + name in owned
original, _ = audit._collect(audit._snapshot(root, "c379207bfd8bd148d3589ea75604ba5165915d01"))
assert any(name == "express" for name, version in original)
assert all(name != "minimist" for name, version in original)
print("PASS: fixture files owned by build-tools; original fork contains no minimist pair")

scratch = root / ".runs/s11-audit-scratch"
case_path = "tests/quality/fixtures/dependency-audit/npm-shrinkwrap.json"
run_results = []
for polarity, wanted in [("good", 0), ("bad", 1)]:
    match = re.search(r"(?ms)^```" + polarity + " introduced-npm-vulnerabilities "
                      + re.escape(case_path) + r"\n(.*?)^```$", general)
    assert match is not None
    (scratch / case_path).write_bytes(match[1].encode("utf-8"))
    output = reports / ("s11-audit-" + polarity + ".log")
    command = [sys.executable, "-B", "scripts/check_dependencies.py", "--fork-point",
               "c379207bfd8bd148d3589ea75604ba5165915d01", "--record",
               ".runs/s11-audit-" + polarity + ".jsonl"]
    with output.open("wb") as stream:
        result = subprocess.run(command, cwd=scratch, stdout=stream, stderr=subprocess.STDOUT)
    verdicts = [json.loads(line) for line in (scratch / command[-1]).read_text(
        encoding="utf-8").splitlines()]
    evidence = {"command": command, "cwd": str(scratch), "exit_code": result.returncode,
                "output": str(output), "records": verdicts}
    output.with_suffix(".log.json").write_text(json.dumps(evidence, indent=2), encoding="utf-8")
    assert result.returncode == wanted, evidence
    assert any(row.get("verdict") == ("pass" if wanted == 0 else "fail") for row in verdicts), evidence
    run_results.append(evidence)
    print("PASS: actual audit " + polarity + " case exited " + str(wanted))
(reports / "s11-audit-pair-results.json").write_text(json.dumps(run_results, indent=2), encoding="utf-8")
