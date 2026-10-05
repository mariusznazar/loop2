"""Invariant account-server-runtime/1: The account and save server's TypeScript source and
deployment use Node.js major version 24.

Covers, on the commit being checked:
- package.json `engines.node`, and the root entry of package-lock.json, admit Node.js 24 and no
  other major version;
- the Node.js type definitions the server's TypeScript is checked against (`@types/node` in
  package.json and in package-lock.json) are of major version 24, and tsconfig.server.json lets
  the server's compilation use them;
- every deployment file the repository holds (Dockerfile, compose file, .nvmrc, .node-version,
  .tool-versions, CI workflow, platform file) that names a Node.js version or a Node.js image
  names major version 24, and every Dockerfile names one.

Does NOT cover: which Node.js actually runs the server on a machine (the check runs the product
nowhere); a deployment defined outside this repository. While the repository holds no deployment
file — the skeleton has none — the deployment test passes on the declarations above alone, since
`engines.node` is what a Node.js platform reads when no other file names a version.
"""

import fnmatch
import json
import os
import re
import unittest

import loop2_invariant_support as support

EXPECTED_MAJOR = 24


def range_major(spec):
    """The one major version an npm version or range admits, or None when it admits several or
    its form is not one of the simple forms read here."""
    spec = spec.strip()
    single = re.fullmatch(r"[\^~=v]*\s*(\d+)(?:\.(?:\d+|x|X|\*)){0,2}(?:-[\w.]+)?", spec)
    if single:
        return int(single.group(1))
    pair = re.fullmatch(r">=\s*v?(\d+)(?:\.0){0,2}\s+<\s*v?(\d+)(?:\.0){0,2}", spec)
    if pair and int(pair.group(2)) == int(pair.group(1)) + 1:
        return int(pair.group(1))
    return None


def load_json(relative):
    with open(os.path.join(support.ROOT, relative), encoding="utf-8") as handle:
        return json.load(handle)


class NodeMajorInPackageFiles(unittest.TestCase):

    def test_package_engines_admit_only_node_24(self):
        # invariant: account-server-runtime/1
        engines = load_json("package.json").get("engines", {})
        self.assertIn("node", engines, "package.json declares no engines.node")
        self.assertEqual(range_major(engines["node"]), EXPECTED_MAJOR,
                         f"package.json engines.node is {engines['node']!r}")

    def test_lockfile_root_engines_admit_only_node_24(self):
        # invariant: account-server-runtime/1
        root_entry = load_json("package-lock.json").get("packages", {}).get("", {})
        node = root_entry.get("engines", {}).get("node")
        self.assertIsNotNone(node, "package-lock.json's root entry declares no engines.node")
        self.assertEqual(range_major(node), EXPECTED_MAJOR,
                         f"package-lock.json root engines.node is {node!r}")

    def test_node_type_definitions_are_major_24(self):
        # invariant: account-server-runtime/1
        package = load_json("package.json")
        declared = {**package.get("dependencies", {}), **package.get("devDependencies", {})}
        self.assertIn("@types/node", declared, "package.json does not depend on @types/node")
        self.assertEqual(range_major(declared["@types/node"]), EXPECTED_MAJOR,
                         f"package.json @types/node is {declared['@types/node']!r}")
        locked = load_json("package-lock.json").get("packages", {}).get(
            "node_modules/@types/node", {}).get("version")
        self.assertIsNotNone(locked, "package-lock.json locks no @types/node")
        self.assertEqual(range_major(locked), EXPECTED_MAJOR,
                         f"package-lock.json locks @types/node {locked!r}")

    def test_server_compilation_uses_node_type_definitions(self):
        # invariant: account-server-runtime/1
        options = load_json("tsconfig.server.json").get("compilerOptions", {})
        if "types" in options:
            self.assertIn("node", options["types"],
                          f"tsconfig.server.json compilerOptions.types is {options['types']!r}, "
                          "so the server is not checked against the Node.js definitions")


# What names a Node.js version inside a deployment file.
FROM_LINE = re.compile(r"^\s*FROM\s+(?:--\S+\s+)*(\S+)", re.IGNORECASE | re.MULTILINE)
IMAGE_LINE = re.compile(r"^\s*-?\s*image:\s*[\"']?([^\"'\s#]+)", re.MULTILINE)
NODE_VERSION_KEY = re.compile(r"node[-_]version[\"']?\s*[:=]\s*\[?\s*[\"']?v?([^\"'\s,\]]+)",
                              re.IGNORECASE)
NODE_VERSION_ENV = re.compile(r"\bNODE_VERSION[\"']?\s*[:= ]\s*[\"']?v?([^\"'\s]+)")
TOOL_VERSIONS_LINE = re.compile(r"^\s*(?:nodejs|node)\s+v?(\S+)", re.MULTILINE)
DOCKERFILE_NAMES = ("Dockerfile", "Dockerfile.*", "*.Dockerfile", "*.dockerfile",
                    "Containerfile", "Containerfile.*")


def image_major(reference):
    """For an image reference naming a Node.js image, (True, its major or None); else (False,)."""
    reference = reference.split("@")[0]
    directory, _, last = reference.rpartition("/")
    last, _, tag = last.partition(":")
    last = last.lower()
    if last == "node":
        found = re.match(r"v?(\d+)", tag)
        return True, int(found.group(1)) if found else None
    distroless = re.fullmatch(r"nodejs(\d+)(?:-.*)?", last)
    if distroless:
        return True, int(distroless.group(1))
    return False, None


def version_major(text):
    found = re.match(r"v?(\d+)", text.strip())
    return int(found.group(1)) if found else None


def node_mentions(relative, text):
    """(what, major or None) for each Node.js version a deployment file names."""
    base = relative.rsplit("/", 1)[-1]
    mentions = []
    if base in (".nvmrc", ".node-version"):
        mentions.append((f"{base} content {text.strip()!r}", version_major(text)))
    if base == ".tool-versions":
        mentions += [(f"node {v}", version_major(v)) for v in TOOL_VERSIONS_LINE.findall(text)]
    if any(fnmatch.fnmatchcase(base, p) for p in DOCKERFILE_NAMES):
        references = FROM_LINE.findall(text)
    else:
        references = IMAGE_LINE.findall(text)
    for reference in references:
        is_node, major = image_major(reference)
        if is_node:
            mentions.append((f"image {reference}", major))
    mentions += [(f"node-version {v}", version_major(v)) for v in NODE_VERSION_KEY.findall(text)]
    mentions += [(f"NODE_VERSION {v}", version_major(v)) for v in NODE_VERSION_ENV.findall(text)]
    return mentions


class NodeMajorInDeployment(unittest.TestCase):

    def test_deployment_files_name_only_node_24(self):
        # invariant: account-server-runtime/1
        problems = []
        for relative in support.deployment_files():
            text = support.read_text(os.path.join(support.ROOT, *relative.split("/")))
            mentions = node_mentions(relative, text)
            base = relative.rsplit("/", 1)[-1]
            if any(fnmatch.fnmatchcase(base, p) for p in DOCKERFILE_NAMES) and not any(
                    what.startswith("image ") for what, _ in mentions):
                problems.append(f"{relative}: names no Node.js image, so the Node.js it runs "
                                "cannot be told")
            for what, major in mentions:
                if major != EXPECTED_MAJOR:
                    problems.append(f"{relative}: {what} is not Node.js {EXPECTED_MAJOR}")
        self.assertEqual(problems, [])


if __name__ == "__main__":
    unittest.main()
