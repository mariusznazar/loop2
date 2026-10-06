"""The browser and server share one npm package and lockfile."""

from html.parser import HTMLParser
import json
from pathlib import Path
import re
import shlex
import subprocess
import tempfile
import unittest
from urllib.parse import urljoin, urlsplit
from urllib.request import url2pathname

import loop2_invariant_support as support


APPLICATION_ROOTS = ("src/browser", "src/server")
PACKAGE_FILES = {"package.json", "package-lock.json", "npm-shrinkwrap.json"}
TYPESCRIPT_EXTENSIONS = (".ts", ".mts", ".cts")


def application_part_files(root, tracked):
    """Resolve the application parts' explicit ownership using the map's Git patterns."""
    # data: foundations/part_map.md
    text = (root / "foundations/part_map.md").read_text(encoding="utf-8")
    patterns = []
    for section in re.split(r"(?m)^## ", text)[1:]:
        name, _, body = section.partition("\n")
        if name.strip() not in ("browser-view", "account-server"):
            continue
        field = re.search(r"(?m)^- \*\*Files:\*\* (.*(?:\n[ \t]+.*)*)", body)
        if field is None:
            raise AssertionError(f"{name} has no Files field in the part map")
        patterns.extend(line.strip().removeprefix("- ")
                        for line in field.group(1).splitlines() if line.strip())
    if not patterns:
        raise AssertionError("the part map assigns no application files")
    # check-attr has the same pattern semantics as the part-map guard, including **.
    with tempfile.TemporaryDirectory(prefix="loop2-package-ownership-") as temporary:
        attributes = Path(temporary, "ownership.attributes")
        attributes.write_text("".join(f"{pattern} loop2-invariant-application\n"
                                      for pattern in patterns), encoding="utf-8")
        result = subprocess.run(
            ["git", "-c", f"core.attributesFile={attributes.as_posix()}",
             "-c", "core.ignorecase=false", "check-attr", "-z", "--stdin",
             "loop2-invariant-application"], cwd=root,
            input="\0".join(sorted(tracked)) + "\0", capture_output=True,
            text=True, encoding="utf-8", timeout=60)
        if result.returncode:
            raise AssertionError("git check-attr failed: " + result.stderr)
    fields = result.stdout.split("\0")
    return {fields[index] for index in range(0, len(fields) - 2, 3)
            if fields[index + 2] == "set"}


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


class PageScripts(HTMLParser):
    """Read actual script references and the page's first base URL."""

    def __init__(self):
        super().__init__()
        self.base = None
        self.sources = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "base" and self.base is None and "href" in attributes:
            self.base = attributes["href"]
        if tag == "script" and attributes.get("src"):
            self.sources.append(attributes["src"])


def page_loads_entry(page, entry_path):
    """A local script URL resolves to this package's compiled browser entry."""
    parser = PageScripts()
    parser.feed(page.read_text(encoding="utf-8"))
    base = urljoin(page.resolve().as_uri(), parser.base or "")
    for source in parser.sources:
        reference = urlsplit(urljoin(base, source))
        if reference.scheme == "file" and not reference.netloc:
            if Path(url2pathname(reference.path)).resolve() == entry_path:
                return True
    return False


def has_browser_entry(root, tracked, configs, entry):
    """A built browser entry backed by copied source or an application page."""
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
        entry_relative = entry_path.relative_to(output_dir)
        for relative in tracked:
            source_path = (Path(support.ROOT) / relative).resolve()
            if not source_path.is_relative_to(source_dir) or not relative.endswith(
                    TYPESCRIPT_EXTENSIONS):
                continue
            emitted_extension = {".ts": ".js", ".mts": ".mjs", ".cts": ".cjs"}[
                source_path.suffix]
            if source_path.relative_to(source_dir).with_suffix(
                    emitted_extension) != entry_relative:
                continue
            counterpart = (Path(support.ROOT) / "src/browser" / source_path.relative_to(source_dir))
            if counterpart.is_file() and (
                    source_path.read_bytes() == counterpart.read_bytes()):
                return True
            pages = (root / "index.html", source_dir / "index.html")
            if any(
                    page.is_file() and page.relative_to(support.ROOT).as_posix() in tracked
                    and page_loads_entry(page, entry_path) for page in pages):
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

        owned_sources = application_part_files(root, tracked)
        for source in sorted(owned_sources):
            parent = Path(source).parent
            while parent != Path("."):
                for filename in PACKAGE_FILES:
                    self.assertNotIn((parent / filename).as_posix(), tracked,
                                     f"{source} belongs to a separate application package")
                parent = parent.parent

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
            # locations or builds its own browser application entry. Part ownership
            # above covers independent server packages without source-byte inference.
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
                has_browser_entry(root / package_dir, tracked, referenced,
                                  package.get("browser"))))
            self.assertFalse(references_application or
                             builds_own_application,
                             f"{package_path} defines a separate application package")


if __name__ == "__main__":
    unittest.main()
