"""Invariant account-server-runtime: The account and save server's TypeScript source and
deployment use Node.js major version 24.

Covers, in the working tree being checked:
- package.json `engines.node`, and the root entry of package-lock.json, admit Node.js 24 and no
  other major version;
- the Node.js type definitions the server's TypeScript is checked against (`@types/node` in
  package.json and in package-lock.json) are of major version 24, and tsconfig.server.json lets
  the server's compilation use them;
- every deployment file the repository holds (Dockerfile, compose file, .nvmrc, .node-version,
  .tool-versions, CI workflow, platform file) that names Node.js versions or Node.js images
  names major version 24 in every one of them — each FROM line (with ARG/ENV defaults filled
  in), each element of a version list or CI matrix a `node-version` refers to, each version on
  a .tool-versions line, the content of a `node-version-file` — and every application Dockerfile names one; the named cloudflared wrapper is restricted
  to its official non-Node base and ownership label.

Does NOT cover: which Node.js actually runs the server on a machine (the check runs the product
nowhere); a deployment defined outside this repository. A repository holding no deployment file
would pass the deployment test on the declarations above alone, since `engines.node` is what a
Node.js platform reads when no other file names a version; this one holds a Dockerfile, a
Compose file, a workflow and a deploy script, and the test reads each of them.
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
        # invariant: account-server-runtime
        engines = load_json("package.json").get("engines", {})
        self.assertIn("node", engines, "package.json declares no engines.node")
        self.assertEqual(range_major(engines["node"]), EXPECTED_MAJOR,
                         f"package.json engines.node is {engines['node']!r}")

    def test_lockfile_root_engines_admit_only_node_24(self):
        # invariant: account-server-runtime
        root_entry = load_json("package-lock.json").get("packages", {}).get("", {})
        node = root_entry.get("engines", {}).get("node")
        self.assertIsNotNone(node, "package-lock.json's root entry declares no engines.node")
        self.assertEqual(range_major(node), EXPECTED_MAJOR,
                         f"package-lock.json root engines.node is {node!r}")

    def test_node_type_definitions_are_major_24(self):
        # invariant: account-server-runtime
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
        # invariant: account-server-runtime
        options = load_json("tsconfig.server.json").get("compilerOptions", {})
        if "types" in options:
            self.assertIn("node", options["types"],
                          f"tsconfig.server.json compilerOptions.types is {options['types']!r}, "
                          "so the server is not checked against the Node.js definitions")


# What names a Node.js version inside a deployment file. Every version a file names is read —
# each FROM line, each element of a list or matrix, each version on a .tool-versions line.
FROM_LINE = re.compile(r"^\s*FROM\s+(?:--\S+\s+)*(\S+)", re.IGNORECASE | re.MULTILINE)
IMAGE_LINE = re.compile(r"^\s*-?\s*image:\s*[\"']?([^\"'\s#]+)", re.MULTILINE)
BUILD_DEFAULT = re.compile(r"^\s*(?:ARG|ENV)\s+([A-Za-z_]\w*)[= ]\s*[\"']?([^\"'\s]+)",
                           re.IGNORECASE | re.MULTILINE)
NODE_VERSION_ENV = re.compile(r"\bNODE_VERSION[\"']?\s*[:= ]\s*[\"']?v?([^\"'\s]+)")
TOOL_VERSIONS_LINE = re.compile(r"^\s*(?:nodejs|node)\s+(.+)$", re.MULTILINE)
VERSION_KEYS = ("node-version", "node_version", "NODE_VERSION")
VERSION_FILE_KEYS = ("node-version-file",)
MATRIX_REFERENCE = re.compile(r"matrix\.([\w-]+)")
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
    found = re.match(r"v?(\d+)", text.strip().strip("\"'"))
    return int(found.group(1)) if found else None


def key_values(text, key):
    """Every value a YAML or TOML key holds in a file: a scalar, each element of a flow list
    `[a, b]`, or each item of a block list below the key."""
    values = []
    lines = text.splitlines()
    pattern = re.compile(r"^(\s*)(?:-\s+)?[\"']?" + re.escape(key) + r"[\"']?\s*[:=]\s*(.*)$")
    for number, line in enumerate(lines):
        match = pattern.match(line)
        if not match:
            continue
        indent = len(match.group(1))
        rest = re.sub(r"\s+#.*$", "", match.group(2)).strip()
        if rest.startswith("["):
            values += [v.strip().strip("\"'") for v in rest.strip("[]").split(",") if v.strip()]
        elif rest:
            values.append(rest.strip("\"'"))
        else:
            for following in lines[number + 1:]:
                if not following.strip() or following.strip().startswith("#"):
                    continue
                if len(following) - len(following.lstrip()) <= indent:
                    break
                item = re.match(r"^\s*-\s+(.*)$", following)
                if not item:
                    break
                values.append(re.sub(r"\s+#.*$", "", item.group(1)).strip().strip("\"'"))
    return values


def node_mentions(relative, text):
    """(what, major or None) for each Node.js version a deployment file names."""
    base = relative.rsplit("/", 1)[-1]
    mentions = []
    if base in (".nvmrc", ".node-version"):
        mentions.append((f"{base} content {text.strip()!r}", version_major(text)))
    if base == ".tool-versions":
        mentions += [(f"node {v}", version_major(v))
                     for line in TOOL_VERSIONS_LINE.findall(text) for v in line.split()]
    if any(fnmatch.fnmatchcase(base, p) for p in DOCKERFILE_NAMES):
        defaults = dict(BUILD_DEFAULT.findall(text))
        references = [re.sub(r"\$\{?(\w+)\}?", lambda m: defaults.get(m.group(1), m.group(0)), r)
                      for r in FROM_LINE.findall(text)]
    else:
        references = IMAGE_LINE.findall(text)
    for reference in references:
        is_node, major = image_major(reference)
        if is_node:
            mentions.append((f"image {reference}", major))
    keys, read = list(VERSION_KEYS), set()
    while keys:
        key = keys.pop()
        if key in read:
            continue
        read.add(key)
        for value in key_values(text, key):
            if value.startswith("${{"):
                keys += MATRIX_REFERENCE.findall(value)
                continue
            mentions.append((f"{key} {value}", version_major(value)))
    for key in VERSION_FILE_KEYS:
        for value in key_values(text, key):
            if value.rsplit("/", 1)[-1] == "package.json":
                continue  # engines.node, checked by the tests above
            path = os.path.join(support.ROOT, *value.split("/"))
            content = support.read_text(path) if os.path.isfile(path) else ""
            mentions.append((f"{key} {value} content {content.strip()!r}",
                             version_major(content) if content else None))
    mentions += [(f"NODE_VERSION {v}", version_major(v)) for v in NODE_VERSION_ENV.findall(text)]
    return mentions


class NodeMajorInDeployment(unittest.TestCase):

    def test_deployment_files_name_only_node_24(self):
        # invariant: account-server-runtime
        problems = []
        for relative in support.deployment_files():
            text = support.read_text(os.path.join(support.ROOT, *relative.split("/")))
            if relative == "deploy/cloudflared.Dockerfile":
                instructions = [line.strip() for line in text.splitlines()
                                if line.strip() and not line.lstrip().startswith("#")]
                self.assertEqual(len(instructions), 2)
                self.assertRegex(instructions[0], r"^FROM cloudflare/cloudflared:"
                                 r"[0-9]+\.[0-9]+\.[0-9]+@sha256:[0-9a-f]{64}$")
                self.assertEqual(instructions[1], 'LABEL org.opencontainers.image.title="loop2"')
                continue
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
