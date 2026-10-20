"""Locate the exact matched identities in the unchanged current product lock."""
import json
from pathlib import Path

directory = Path(__file__).parent
matches = json.loads((directory / "f5-integration1-matches-final.json").read_text())["matches"]
packages = json.loads(Path("package-lock.json").read_text())["packages"]
for name, version in sorted({(row["name"], row["version"]) for row in matches}):
    locations = [location for location, package in packages.items() if location and (
        package.get("name", location.rsplit("node_modules/", 1)[-1]), package["version"]
    ) == (name, version)]
    print(json.dumps({"name": name, "version": version, "locations": locations,
                      "inBundle": [packages[location].get("inBundle") for location in locations]},
                     ensure_ascii=True))
