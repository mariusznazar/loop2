"""Observe the actual check's real Node exchanges without replacing any result."""
import json
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(root / "scripts"))
import check_dependencies

trace = Path(__file__).with_name("f5-integration1-node-final.jsonl")
trace.write_bytes(b"")
actual_node = check_dependencies._node
comparison = None


def observe_node(directory, request):
    global comparison
    answer = actual_node(directory, request)
    with trace.open("a", encoding="utf-8", newline="\n") as stream:
        stream.write(json.dumps({"request": request, "response": answer}, ensure_ascii=True) + "\n")
    if request["action"] == "compare" and answer.get("body"):
        comparison = (request, answer)
        response = json.loads(answer["body"])
        for name, advisories in response.items():
            for advisory in advisories:
                print(json.dumps({"name": name, "advisory": advisory}, ensure_ascii=True))
    if request["action"] == "match":
        submitted, observed = comparison
        response = json.loads(observed["body"])
        rows = []
        for name, advisories in response.items():
            for advisory in advisories:
                for version in submitted["introduced"][name]:
                    rows.append({"name": name, "version": version, "id": advisory["id"],
                                 "severity": advisory["severity"],
                                 "range": advisory["vulnerable_versions"], "url": advisory["url"]})
        matches = [row for row, matched in zip(rows, answer["matches"], strict=True) if matched]
        summary = {"introduced_pairs": sum(map(len, submitted["introduced"].values())),
                   "returned_advisories": sum(map(len, response.values())),
                   "matched_pairs": len({(row["name"], row["version"]) for row in matches}),
                   "matches": matches}
        Path(__file__).with_name("f5-integration1-matches-final.json").write_text(
            json.dumps(summary, indent=2, ensure_ascii=True), encoding="utf-8")
        print(json.dumps({"exact_matches": summary}, ensure_ascii=True))
    return answer


check_dependencies._node = observe_node
sys.argv = [str(root / "scripts/check_dependencies.py"), "--fork-point",
            "c379207bfd8bd148d3589ea75604ba5165915d01", "--record",
            ".runs/f5-integration1-evidence-final.jsonl"]
raise SystemExit(check_dependencies.main())
