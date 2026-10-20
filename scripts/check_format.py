"""Check the complete source formatting and LF policy adopted by D-32."""

import argparse
import json
import os
from pathlib import Path
import shutil
import sys
import tempfile

from quality_support import QualityError, discover_files, run_check, run_tool

PARTS = ("browser-view", "simulation", "account-server", "build-tools")
VERSION = "3.9.10"
SCRIPT_SUFFIXES = {".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"}

# No CLI glob/ignore discovery: every selected file reaches the API individually.
BRIDGE = r"""
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
let input = '';
for await (const chunk of process.stdin) input += chunk;
const request = JSON.parse(input);
const prettier = await import(pathToFileURL(path.resolve('node_modules/prettier/index.mjs')));
if (prettier.version !== '3.9.10') throw Error('wrong local Prettier version');
const support = await prettier.getSupportInfo();
if (!Array.isArray(support.options)) throw Error('malformed option metadata');
const defaults = new Map(support.options.map(option => [option.name, option.default]));
const required = {tabWidth:2,useTabs:false,semi:true,singleQuote:false,printWidth:80,endOfLine:'lf'};
for (const [key, value] of Object.entries(required)) {
  if (defaults.get(key) !== value) throw Error('unexpected adopted default: ' + key);
}
function same(value, expected) {
  if (Array.isArray(value) && Array.isArray(expected))
    return value.length === expected.length && value.every((item, i) => same(item, expected[i]));
  return value === expected;
}
function adopted(config) {
  if (!config || Array.isArray(config) || typeof config !== 'object')
    throw Error('missing or malformed explicit configuration');
  return Object.entries(config).every(([key, value]) =>
    key === 'plugins' ? Array.isArray(value) && value.length === 0 :
    defaults.has(key) && same(value, defaults.get(key)));
}
const files = [];
for (const file of request.files) {
  const config = await prettier.resolveConfig(path.resolve(file), {
    config:path.resolve('prettier.config.mjs'), editorconfig:false
  });
  const editor = await prettier.resolveConfig(path.resolve(file), {editorconfig:true});
  const configuration = adopted(config) && adopted(editor);
  const source = await fs.readFile(file, 'utf8');
  const formatted = await prettier.format(source, {...config, filepath:path.resolve(file)});
  if (typeof formatted !== 'string') throw Error('malformed formatter output');
  files.push({path:file, configuration, formatted:source === formatted && !source.includes('\r')});
}
process.stdout.write(JSON.stringify({version:prettier.version, files}));
"""


def _json_file(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, ValueError) as problem:
        raise QualityError(f"cannot read {path.name}: {problem}") from problem


def _attribute_values(command, root, files, environment):
    result = run_tool([*command, "check-attr", "-z", "--stdin", "text", "eol"],
                      cwd=root, env=environment,
                      input=("\0".join(files) + "\0").encode("utf-8"))
    if result.stderr or not result.stdout.endswith("\0"):
        raise QualityError("unreadable checkout attributes")
    fields = result.stdout[:-1].split("\0")
    if len(fields) != len(files) * 6:
        raise QualityError("incomplete checkout attributes")
    observed = {}
    for index in range(0, len(fields), 3):
        path, attribute, value = fields[index:index + 3]
        if path not in files or attribute not in {"text", "eol"}:
            raise QualityError("unexpected checkout attribute")
        key = (path, attribute)
        if key in observed:
            raise QualityError("duplicate checkout attribute")
        observed[key] = value
    return all(observed.get((path, "eol")) == "lf"
               and observed.get((path, "text")) in {"set", "auto"} for path in files)


def _attributes(root, files, environment):
    executable = shutil.which("git")
    if executable is None:
        raise QualityError("local Git is unavailable")
    effective = _attribute_values([executable], root, files, environment)
    # A separate empty Git directory reads current worktree .gitattributes without
    # the real index, info/attributes, user/system configuration or attribute files.
    isolated = {key: value for key, value in environment.items()
                if not key.upper().startswith("GIT_")}
    isolated.update(GIT_ATTR_NOSYSTEM="1", GIT_CONFIG_NOSYSTEM="1",
                    GIT_CONFIG_GLOBAL=os.devnull, GIT_CONFIG_SYSTEM=os.devnull)
    runs = root / ".runs"
    runs.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="format-attributes-", dir=runs) as temporary:
        directory = Path(temporary)
        template = directory / "empty-template"
        template.mkdir()
        git_directory = directory / "git"
        result = run_tool([executable, "init", "--bare", "--quiet",
                           "--template", template, git_directory], cwd=root, env=isolated)
        if result.stdout or result.stderr:
            raise QualityError("unexpected isolated Git initialization diagnostic")
        repository = _attribute_values(
            [executable, "--git-dir", git_directory, "--work-tree", root,
             "-c", "core.bare=false", "-c", "core.attributesFile="],
            root, files, isolated)
    return effective and repository


def check(root):
    """Return a verdict only after complete source, configuration and output checks."""
    root = Path(root).resolve()
    candidates = discover_files(root, PARTS)
    browser = set(discover_files(root, ("browser-view", "simulation")))
    files = [path for path in candidates if Path(path).suffix.lower() in SCRIPT_SUFFIXES
             or path in browser and Path(path).suffix.lower() in {".html", ".css"}]
    if not files:
        raise QualityError("no formatter sources discovered")
    for path in files:
        try:
            (root / path).read_bytes().decode("utf-8")
        except (OSError, UnicodeError) as problem:
            raise QualityError(f"unreadable UTF-8 source: {path}") from problem
    manifest = _json_file(root / "package.json")
    lock = _json_file(root / "package-lock.json")
    if (manifest.get("devDependencies", {}).get("prettier") != VERSION
            or lock.get("packages", {}).get("node_modules/prettier", {}).get("version")
            != VERSION):
        raise QualityError("Prettier must be pinned to 3.9.10 in manifest and lockfile")
    for path in ("prettier.config.mjs", "node_modules/prettier/index.mjs"):
        if not (root / path).is_file():
            raise QualityError(f"required local formatter input is unavailable: {path}")
    executable = shutil.which("node")
    if executable is None:
        raise QualityError("local Node is unavailable")
    environment = {key: value for key, value in os.environ.items()
                   if key.upper() not in {"NODE_OPTIONS", "NODE_PATH"}}
    result = run_tool([executable, "--input-type=module", "-e", BRIDGE], cwd=root,
                      env=environment, input=json.dumps({"files": files}).encode("utf-8"))
    if result.stderr:
        raise QualityError("Prettier reported an unexpected diagnostic: " + result.stderr)
    try:
        report = json.loads(result.stdout)
    except ValueError as problem:
        raise QualityError("malformed formatter JSON") from problem
    if (not isinstance(report, dict) or set(report) != {"version", "files"}
            or report["version"] != VERSION or not isinstance(report["files"], list)):
        raise QualityError("unsupported formatter result")
    observed = {}
    for item in report["files"]:
        if (not isinstance(item, dict) or set(item) != {"path", "formatted", "configuration"}
                or not isinstance(item["path"], str) or item["path"] not in files
                or item["path"] in observed or type(item["formatted"]) is not bool
                or type(item["configuration"]) is not bool):
            raise QualityError("malformed or duplicate formatter file result")
        observed[item["path"]] = item["formatted"] and item["configuration"]
    if set(observed) != set(files):
        raise QualityError("incomplete formatter file coverage")
    attributes = _attributes(root, files, environment)
    failures = [path for path, passed in observed.items() if not passed]
    for path in failures:
        print("format or configuration differs: " + json.dumps(path), file=sys.stderr)
    if not attributes:
        print("covered paths do not preserve LF checkout attributes", file=sys.stderr)
    return not failures and attributes


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--record", type=Path)
    args = parser.parse_args()
    return run_check("prettier-source-format", "prettier-source-format/1",
                     lambda: check(Path(__file__).resolve().parents[1]), record=args.record)


if __name__ == "__main__":
    sys.exit(main())
