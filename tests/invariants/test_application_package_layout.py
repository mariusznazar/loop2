"""The browser and server share one npm package and lockfile.

Ownership comes from the part map. A new part with a nested package needs a reviewed
classification here; prose and package scripts do not classify its purpose.
"""

import json
from pathlib import Path
import unittest

import loop2_invariant_support as support


APPLICATION_PARTS = {"browser-view", "account-server"}
NON_APPLICATION_PARTS = {"build-tools", "agent-workflow", "product-foundation"}
PACKAGE_FILES = {"package.json", "package-lock.json", "npm-shrinkwrap.json"}
SOURCE_EXTENSIONS = {".ts", ".mts", ".cts", ".js", ".mjs", ".cjs", ".html", ".tsx"}


def application_sources(owners):
    """The files of `owners` (path -> part) that are application source, with their parts."""
    return {path: owner for path, owner in owners.items()
            if not path.startswith("tests/") and Path(path).suffix in SOURCE_EXTENSIONS}


def separate_package_failures(sources, tracked):
    """One message for each source below a tracked package file other than the root one."""
    failures = []
    for source, owner in sorted(sources.items()):
        if owner in NON_APPLICATION_PARTS:
            continue
        parent = Path(source).parent
        while parent != Path("."):
            for filename in sorted(PACKAGE_FILES):
                package = (parent / filename).as_posix()
                if package not in tracked:
                    continue
                if owner in APPLICATION_PARTS:
                    failures.append(f"{source} belongs to a separate application package: "
                                    f"{package}")
                else:
                    failures.append(f"{package} contains {source}, owned by {owner}; "
                                    "classify this part in the package-layout check before "
                                    "accepting a separate package")
            parent = parent.parent
    return failures


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

        owners = support.file_owners(root, tracked)
        sources = application_sources(owners)
        for part in APPLICATION_PARTS:
            self.assertIn(part, sources.values(), f"{part} owns no application source")
        self.assertEqual(separate_package_failures(sources, tracked), [])

    def test_control_a_tsx_source_below_a_nested_package_is_refused(self):
        # invariant: application-package-layout
        owners = {"src/browser/nested/screen.tsx": "browser-view",
                  "src/browser/nested/package.json": "browser-view"}
        failures = separate_package_failures(application_sources(owners), set(owners))
        self.assertEqual(failures, ["src/browser/nested/screen.tsx belongs to a separate "
                                    "application package: src/browser/nested/package.json"])


if __name__ == "__main__":
    unittest.main()
