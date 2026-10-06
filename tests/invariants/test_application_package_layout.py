"""The browser and server share one npm package and lockfile."""

import json
from pathlib import Path
import unittest

import loop2_invariant_support as support


APPLICATION_ROOTS = ("src/browser", "src/server")
PACKAGE_FILES = {"package.json", "package-lock.json", "npm-shrinkwrap.json"}
APPLICATION_PATH_NAMES = {"browser", "server", "client", "web", "api"}
APPLICATION_SCRIPT_REFERENCES = (
    "src/browser", "src/server", "tsconfig.browser", "tsconfig.server",
    "dist/public", "dist/server",
)
TYPESCRIPT_EXTENSIONS = (".ts", ".mts", ".cts")


class ApplicationPackageLayout(unittest.TestCase):

    def test_application_uses_only_the_root_package(self):
        # invariant: application-package-layout/1
        tracked = set(support.listed_files())
        root = Path(support.ROOT)
        # data: package.json
        manifest_path = root / "package.json"
        self.assertTrue(manifest_path.is_file(), "the root package.json is missing")
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        # data: package-lock.json
        lock_path = root / "package-lock.json"
        self.assertTrue(lock_path.is_file(), "the root package-lock.json is missing")
        lock = json.loads(lock_path.read_text(encoding="utf-8"))
        self.assertEqual(lock["packages"][""]["name"], manifest["name"])

        for side in APPLICATION_ROOTS:
            sources = [p for p in tracked if p.startswith(side + "/")
                       and p.endswith(TYPESCRIPT_EXTENSIONS) and not p.endswith(".d.ts")]
            self.assertTrue(sources, f"{side} contains no application TypeScript")
            for source in sources:
                parent = Path(source).parent
                while parent != Path("."):
                    for filename in PACKAGE_FILES:
                        self.assertNotIn((parent / filename).as_posix(), tracked,
                                         f"{source} belongs to a separate npm package")
                    parent = parent.parent

        for package_path in sorted(p for p in tracked if p.endswith("/package.json")):
            package_dir = Path(package_path).parent
            if any(package_path.startswith(side + "/") for side in APPLICATION_ROOTS):
                continue  # The ancestor check above gives the more precise failure.
            # A package elsewhere is relevant when its build scripts target the application,
            # or its own TypeScript source is in a browser/server package directory.
            package = json.loads((root / package_path).read_text(encoding="utf-8"))
            scripts = package.get("scripts", {})
            build_commands = " ".join(str(value) for key, value in scripts.items()
                                      if key == "build" or key.startswith("build:"))
            references_application = any(ref in build_commands.replace("\\", "/")
                                         for ref in APPLICATION_SCRIPT_REFERENCES)
            owns_typescript = any(p.startswith(package_dir.as_posix() + "/")
                                  and p.endswith(TYPESCRIPT_EXTENSIONS) for p in tracked)
            application_directory = bool(APPLICATION_PATH_NAMES.intersection(
                part.lower() for part in package_dir.parts))
            self.assertFalse(references_application or
                             (application_directory and owns_typescript and build_commands),
                             f"{package_path} defines a separate application package")


if __name__ == "__main__":
    unittest.main()
