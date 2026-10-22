"""The browser and server share one npm package and lockfile.

Ownership comes from the part map. A new part with a nested package needs a reviewed
classification here; prose and package scripts do not classify its purpose.
"""

import json
from pathlib import Path
import re
import subprocess
import tempfile
import unittest

import loop2_invariant_support as support


APPLICATION_PARTS = {"browser-view", "account-server"}
NON_APPLICATION_PARTS = {"build-tools", "agent-workflow", "product-foundation"}
PACKAGE_FILES = {"package.json", "package-lock.json", "npm-shrinkwrap.json"}
SOURCE_EXTENSIONS = {".ts", ".mts", ".cts", ".js", ".mjs", ".cjs", ".html"}


def file_owners(root, tracked):
    """Resolve the map's Files patterns with Git, as the part-map guard does."""
    # data: foundations/part_map.md
    text = (root / "foundations/part_map.md").read_text(encoding="utf-8")
    patterns = []
    for index, section in enumerate(re.split(r"(?m)^## ", text)[1:]):
        name, _, body = section.partition("\n")
        field = re.search(r"(?m)^- \*\*Files:\*\* (.*(?:\n[ \t]+.*)*)", body)
        if field is None:
            continue
        for line in field.group(1).splitlines():
            pattern = line.strip()
            if pattern.startswith("- "):
                pattern = pattern[2:].strip()
            if pattern and pattern != "none":
                patterns.append(f"{pattern} loop2-invariant-owner-{index}={name.strip()}\n")
    with tempfile.TemporaryDirectory(prefix="loop2-package-ownership-") as temporary:
        attributes = Path(temporary, "ownership.attributes")
        attributes.write_text("".join(patterns), encoding="utf-8")
        result = subprocess.run(
            ["git", "-c", f"core.attributesFile={attributes.as_posix()}",
             "-c", "core.ignorecase=false", "check-attr", "-z", "--all", "--stdin"], cwd=root,
            input="\0".join(sorted(tracked)) + "\0", capture_output=True,
            text=True, encoding="utf-8", timeout=60)
        if result.returncode:
            raise AssertionError("git check-attr failed: " + result.stderr)
    fields = result.stdout.split("\0")
    owners = dict.fromkeys(tracked, "unspecified")
    for index in range(0, len(fields) - 2, 3):
        path, attribute, owner = fields[index:index + 3]
        if not attribute.startswith("loop2-invariant-owner-"):
            continue
        if owners[path] != "unspecified":
            raise AssertionError(f"{path} has overlapping part owners: {owners[path]}, {owner}")
        owners[path] = owner
    return owners


class ApplicationPackageLayout(unittest.TestCase):

    def test_application_uses_only_the_root_package(self):
        # invariant: application-package-layout
        tracked = set(support.listed_files())
        root = Path(support.ROOT)
        # data: package.json
        manifest_path = root / "package.json"
        self.assertIn("package.json", tracked, "the root package.json is not tracked")
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        # data: package-lock.json
        lock_path = root / "package-lock.json"
        self.assertIn("package-lock.json", tracked, "the root package-lock.json is not tracked")
        lock = json.loads(lock_path.read_text(encoding="utf-8"))
        self.assertEqual(lock["packages"][""]["name"], manifest["name"])

        owners = file_owners(root, tracked)
        sources = {path: owner for path, owner in owners.items()
                   if not path.startswith("tests/") and Path(path).suffix in SOURCE_EXTENSIONS}
        for part in APPLICATION_PARTS:
            self.assertIn(part, sources.values(), f"{part} owns no application source")
        for source, owner in sorted(sources.items()):
            if owner in NON_APPLICATION_PARTS:
                continue
            parent = Path(source).parent
            while parent != Path("."):
                for filename in PACKAGE_FILES:
                    package = (parent / filename).as_posix()
                    if package not in tracked:
                        continue
                    if owner in APPLICATION_PARTS:
                        self.fail(f"{source} belongs to a separate application package: {package}")
                    self.fail(f"{package} contains {source}, owned by {owner}; "
                              "classify this part in the package-layout check before accepting "
                              "a separate package")
                parent = parent.parent


if __name__ == "__main__":
    unittest.main()
