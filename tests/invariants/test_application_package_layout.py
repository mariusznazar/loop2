"""The browser and server share one npm package and lockfile."""

import json
from pathlib import Path
import re
import shlex
import unittest

import loop2_invariant_support as support


APPLICATION_ROOTS = ("src/browser", "src/server")
PACKAGE_FILES = {"package.json", "package-lock.json", "npm-shrinkwrap.json"}
TYPESCRIPT_EXTENSIONS = (".ts", ".mts", ".cts")


def resolved_config_paths(root, filename):
    """The current application's config, source and output locations."""
    # data: tsconfig.browser.json
    # data: tsconfig.server.json
    path = root / filename
    config = json.loads(path.read_text(encoding="utf-8"))
    options = config["compilerOptions"]
    return {path.resolve(), (path.parent / options["rootDir"]).resolve(),
            (path.parent / options["outDir"]).resolve()}


def build_tokens(command):
    """Shell-like build arguments, with simple option assignments split out."""
    return [piece for token in shlex.split(command, posix=True)
            for piece in re.split(r"(?<=\w)=", token)]


def referenced_configs(package_dir, tokens):
    """Local TypeScript configs selected by tsc in a package build script."""
    names = []
    for index, token in enumerate(tokens):
        if token in ("-p", "--project") and index + 1 < len(tokens):
            names.append(tokens[index + 1])
    if not names and "tsc" in tokens:
        names.append("tsconfig.json")
    return [(package_dir / name).resolve() for name in names]


def copies_application_source(root, tracked, configs, entry, side):
    """An entry built from a local config whose source repeats this application's source."""
    if not isinstance(entry, str):
        return False
    entry_path = (root / entry).resolve()
    for config_path in configs:
        if not config_path.is_file():
            continue
        config = json.loads(config_path.read_text(encoding="utf-8"))
        options = config.get("compilerOptions", {})
        if not options.get("rootDir") or not options.get("outDir"):
            continue
        source_dir = (config_path.parent / options["rootDir"]).resolve()
        output_dir = (config_path.parent / options["outDir"]).resolve()
        if not entry_path.is_relative_to(output_dir):
            continue
        for relative in tracked:
            source_path = (Path(support.ROOT) / relative).resolve()
            if not source_path.is_relative_to(source_dir) or not relative.endswith(
                    TYPESCRIPT_EXTENSIONS):
                continue
            counterpart = (Path(support.ROOT) / side / source_path.relative_to(source_dir))
            if counterpart.is_file() and source_path.read_bytes() == counterpart.read_bytes():
                return True
    return False


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
        application_paths = set().union(*(
            resolved_config_paths(root, name)
            for name in ("tsconfig.browser.json", "tsconfig.server.json")))

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
            # A package elsewhere is relevant when it targets this application's current
            # locations or builds its own browser/server application source.
            package = json.loads((root / package_path).read_text(encoding="utf-8"))
            scripts = package.get("scripts", {})
            build_commands = [str(value) for key, value in scripts.items()
                              if key == "build" or key.startswith("build:")]
            tokens = [token for command in build_commands for token in build_tokens(command)]
            referenced = referenced_configs(root / package_dir, tokens)
            referenced_paths = {(root / package_dir / token).resolve()
                                for token in tokens if token.startswith((".", "src/", "dist/"))}
            references_application = bool(application_paths.intersection(
                referenced_paths.union(referenced)))
            builds_own_application = bool(build_commands and (
                copies_application_source(root / package_dir, tracked, referenced,
                                          package.get("browser"), "src/browser") or
                copies_application_source(root / package_dir, tracked, referenced,
                                          package.get("main"), "src/server")))
            self.assertFalse(references_application or
                             builds_own_application,
                             f"{package_path} defines a separate application package")


if __name__ == "__main__":
    unittest.main()
