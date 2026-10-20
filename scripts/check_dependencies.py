"""Audit introduced actual npm package/version pairs against current bulk advisories."""

import argparse
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import sys
import tempfile

from quality_support import QualityError, discover_files, run_check, run_tool

VERSION = "12.2.1"
MANIFESTS = {"package.json", "package-lock.json", "npm-shrinkwrap.json"}
DEPENDENCIES = ("dependencies", "devDependencies", "optionalDependencies", "peerDependencies")
NAME = r"(?:@[a-z0-9._-]+/)?[a-z0-9][a-z0-9._-]*"
PACKAGE_PATH = rf"node_modules/{NAME}(?:/node_modules/{NAME})*"

# Use the already installed npm distribution's client and semver, not an install wrapper.
# Bulk API: npm/cli v12.2.1, workspaces/arborist/lib/audit-report.js.
# No Quick Audit fallback: this request contains only introduced names and versions.
BRIDGE = r"""
import path from 'node:path';
import {createRequire} from 'node:module';
let input = '';
for await (const chunk of process.stdin) input += chunk;
const request = JSON.parse(input);
const local = createRequire(path.resolve('node_modules/npm/package.json'));
if (local('./package.json').version !== '12.2.1') throw Error('wrong local npm version');
const semver = local('semver');
if (request.action === 'compare') {
  for (const [name, version] of request.pairs) {
    if (!semver.valid(version)) throw Error('invalid exact version: ' + name);
  }
  for (const [version, range] of request.requirements) {
    if (semver.validRange(range) === null ||
        (version !== null && !semver.satisfies(version, range)))
      throw Error('invalid or unsatisfied dependency range');
  }
  let body = null;
  if (Object.keys(request.introduced).length) {
    // npm-registry-fetch does not forward redirect mode to its HTTP client.
    const fetch = local('make-fetch-happen');
    const response = await fetch('https://registry.npmjs.org/-/npm/v1/security/advisories/bulk', {
      method:'POST', body:JSON.stringify(request.introduced), retry:0, timeout:30000,
      redirect:'error', cache:'no-store', strictSSL:true,
      headers:{'content-type':'application/json', 'user-agent':'npm/12.2.1 dependency-audit'}
    });
    if (response.status !== 200) throw Error('unsupported bulk advisory HTTP status');
    body = await response.text();
  }
  process.stdout.write(JSON.stringify({version:'12.2.1', body}));
} else if (request.action === 'match') {
  // npm's concrete advisory matcher includes prereleases and accepts loose ranges.
  const options = {includePrerelease:true, loose:true};
  const matches = request.advisories.map(({version, range}) => {
    if (semver.validRange(range, options) === null) throw Error('unsupported advisory range');
    return semver.satisfies(version, range, options);
  });
  process.stdout.write(JSON.stringify({version:'12.2.1', matches}));
} else throw Error('unsupported bridge operation');
"""


def _object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise QualityError(f"duplicate JSON key: {key}")
        result[key] = value
    return result


def _json(text):
    try:
        return json.loads(text, object_pairs_hook=_object,
                          parse_constant=lambda value: (_ for _ in ()).throw(
                              QualityError(f"invalid JSON number: {value}")))
    except (ValueError, TypeError) as problem:
        raise QualityError(f"unreadable JSON: {problem}") from problem


def _read(path):
    try:
        return _json(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError) as problem:
        raise QualityError(f"cannot read {path.name}: {problem}") from problem


def _git(root, *arguments):
    executable = shutil.which("git")
    if not executable:
        raise QualityError("local Git is unavailable")
    result = run_tool([executable, *arguments], cwd=root)
    if result.stderr:
        raise QualityError("Git reported a diagnostic", result)
    return result.stdout


def _snapshot(root, fork_point):
    """Read base files with their own ownership map, including base-only paths."""
    if not re.fullmatch(r"[0-9a-f]{40}", fork_point):
        raise QualityError("fork point must be an explicit full commit hash")
    _git(root, "rev-parse", "--verify", fork_point + "^{commit}")
    _git(root, "merge-base", "--is-ancestor", fork_point, "HEAD")
    entries = _git(root, "ls-tree", "-r", "-z", fork_point)
    if entries and not entries.endswith("\0"):
        raise QualityError("incomplete base tree listing")
    sources = {}
    for entry in entries.rstrip("\0").split("\0"):
        metadata, separator, path = entry.partition("\t")
        if not separator:
            raise QualityError("unreadable base tree entry")
        if PurePosixPath(path).name not in MANIFESTS and path != "foundations/part_map.md":
            continue
        if metadata.split()[0] != "100644" or ".." in PurePosixPath(path).parts:
            raise QualityError(f"unsupported base manifest path: {path}")
        sources[path] = _git(root, "show", fork_point + ":" + path)
    if "foundations/part_map.md" not in sources:
        raise QualityError("base ownership map is missing")
    with tempfile.TemporaryDirectory(prefix="loop2-audit-base-") as temporary:
        snapshot = Path(temporary)
        _git(snapshot, "init", "--quiet")
        for path, text in sources.items():
            target = snapshot / path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(text.encode("utf-8"))
        selected = discover_files(snapshot, ("build-tools",))
        return {path: _json(sources[path]) for path in selected
                if PurePosixPath(path).name in MANIFESTS}


def _dependencies(package):
    if not isinstance(package, dict):
        raise QualityError("manifest or locked package is not an object")
    maps = {}
    for field in DEPENDENCIES:
        value = package.get(field, {})
        if not isinstance(value, dict) or any(
                not re.fullmatch(NAME, name) or not isinstance(spec, str) or not spec.strip()
                for name, spec in value.items()):
            raise QualityError(f"unsupported {field} map")
        maps[field] = value
    return maps


def _spec(name, spec):
    if spec.startswith("npm:"):
        alias = re.fullmatch(rf"npm:({NAME})@(.+)", spec)
        if not alias:
            raise QualityError("unsupported npm alias")
        return alias.groups()
    return name, spec


def _resolve(packages, owner, name):
    while True:
        candidate = (owner + "/" if owner else "") + "node_modules/" + name
        if candidate in packages:
            return packages[candidate]
        if not owner:
            return None
        owner = owner.rsplit("/node_modules/", 1)[0] if "/node_modules/" in owner else ""


def _collect(files):
    """Validate complete paired manifests/locks and retain all concrete package versions."""
    pairs, requirements = set(), []
    manifests = {path for path in files if PurePosixPath(path).name == "package.json"}
    locks = {path for path in files if PurePosixPath(path).name != "package.json"}
    if not manifests:
        raise QualityError("no npm manifest in build-tools")
    for path in sorted(manifests):
        prefix = path.removesuffix("package.json")
        associated = [prefix + name for name in ("package-lock.json", "npm-shrinkwrap.json")
                      if prefix + name in locks]
        if not associated:
            raise QualityError(f"missing lock for {path}")
        manifest = files[path]
        maps = _dependencies(manifest)
        if manifest.get("workspaces"):
            raise QualityError("workspace manifests are unsupported")
        for lock_path in associated:
            lock = files[lock_path]
            if not isinstance(lock, dict) or type(lock.get("lockfileVersion")) is not int or (
                    lock["lockfileVersion"] not in {2, 3}):
                raise QualityError(f"unsupported lockfile: {lock_path}")
            packages = lock.get("packages")
            if not isinstance(packages, dict) or "" not in packages:
                raise QualityError("missing lock package table or root")
            if _dependencies(packages[""]) != maps:
                raise QualityError("manifest and locked root dependency maps differ")
            for location, package in packages.items():
                _dependencies(package)
                if location == "":
                    continue
                if not re.fullmatch(PACKAGE_PATH, location) or package.get("link"):
                    raise QualityError("unsupported linked or non-npm package location")
                name = package.get("name", location.rsplit("node_modules/", 1)[1])
                version = package.get("version")
                if not isinstance(name, str) or not re.fullmatch(NAME, name) or (
                        not isinstance(version, str) or not re.fullmatch(
                            r"[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?", version)):
                    raise QualityError("missing actual npm name or exact version")
                if "resolved" in package:
                    resolved = package["resolved"]
                    # Compare complete supported spellings; never normalize an untrusted URL.
                    # npm also recognizes %2f/%2F for a scoped package's one separator.
                    names = {name}
                    if name.startswith("@"):
                        names.update({name.replace("/", "%2f"), name.replace("/", "%2F")})
                    archive = f"{name.rsplit('/', 1)[-1]}-{version}.tgz"
                    sources = {f"https://registry.npmjs.org/{source}/-/{archive}"
                               for source in names}
                    if not isinstance(resolved, str) or resolved not in sources:
                        raise QualityError("unsupported or conflicting registry tarball identity")
                pairs.add((name, version))
            for location, package in packages.items():
                maps_here = _dependencies(package)
                optional = maps_here["optionalDependencies"]
                for field, dependencies in maps_here.items():
                    for name, spec in dependencies.items():
                        if field == "dependencies" and name in optional:
                            continue
                        actual, wanted = _spec(name, spec)
                        target = _resolve(packages, location, name)
                        metadata = package.get("peerDependenciesMeta", {})
                        if not isinstance(metadata, dict):
                            raise QualityError("invalid peer dependency metadata")
                        peer = metadata.get(name, {})
                        if not isinstance(peer, dict):
                            raise QualityError("invalid peer dependency metadata entry")
                        if target is None:
                            if field != "peerDependencies" or peer.get("optional") is not True:
                                raise QualityError(f"missing locked dependency: {name}")
                            requirements.append((None, wanted))
                            continue
                        target_name = target.get("name", name)
                        # Ordinary ranges bind an install name and version, including aliases.
                        # Only an explicit npm: specification asserts the real package name.
                        if spec.startswith("npm:") and target_name != actual:
                            raise QualityError("alias does not resolve to its actual npm name")
                        requirements.append((target["version"], wanted))
    paired = {path.removesuffix("package.json") + name for path in manifests
              for name in ("package-lock.json", "npm-shrinkwrap.json")}
    if locks - paired:
        raise QualityError("lockfile without matching manifest")
    return pairs, requirements


def _node(root, request):
    executable = shutil.which("node")
    if not executable:
        raise QualityError("local Node is unavailable")
    environment = {key: value for key, value in os.environ.items()
                   if not key.upper().startswith(("NODE_", "NPM_CONFIG_"))}
    result = run_tool([executable, "--input-type=module", "-e", BRIDGE], cwd=root,
                      env=environment, input=json.dumps(request).encode("utf-8"), timeout=90)
    if result.stderr:
        raise QualityError("npm bridge reported a diagnostic", result)
    answer = _json(result.stdout)
    if not isinstance(answer, dict) or answer.get("version") != VERSION:
        raise QualityError("unsupported npm bridge result")
    return answer


def _advisories(response, introduced):
    if not isinstance(response, dict) or response.keys() - introduced.keys():
        raise QualityError("unsupported bulk advisory response")
    checks, severities = [], []
    for name, advisories in response.items():
        if not isinstance(advisories, list):
            raise QualityError("advisories are not an array")
        for advisory in advisories:
            if not isinstance(advisory, dict) or advisory.get("name", name) != name or (
                    type(advisory.get("id")) is not int or advisory["id"] <= 0) or (
                    advisory.get("severity") not in {"info", "low", "moderate", "high", "critical"}) or any(
                    not isinstance(advisory.get(key), str) or not advisory[key].strip()
                    for key in ("vulnerable_versions", "title", "url")):
                raise QualityError("incomplete or unsupported concrete advisory")
            for version in introduced[name]:
                checks.append({"version": version, "range": advisory["vulnerable_versions"]})
                severities.append(advisory["severity"])
    return checks, severities


def check(root, fork_point):
    """No named verdict is possible before both graphs and all advisory data validate."""
    root = Path(root).resolve()
    files = {path: _read(root / path) for path in discover_files(root, ("build-tools",))
             if PurePosixPath(path).name in MANIFESTS}
    base = _snapshot(root, fork_point)
    before, old_requirements = _collect(base)
    after, new_requirements = _collect(files)
    manifest = files.get("package.json", {})
    declared = {**manifest.get("dependencies", {}), **manifest.get("devDependencies", {})}
    tool_locks = [files[path]["packages"].get("node_modules/npm", {})
                  for path in ("package-lock.json", "npm-shrinkwrap.json") if path in files]
    if declared.get("npm") != VERSION or not tool_locks or any(
            package.get("version") != VERSION or package.get("name", "npm") != "npm"
            for package in tool_locks):
        raise QualityError("npm 12.2.1 must be declared and locked locally")
    installed = _read(root / "node_modules/npm/package.json")
    if not isinstance(installed, dict) or installed.get("version") != VERSION:
        raise QualityError("local npm 12.2.1 is unavailable")
    introduced = {}
    for name, version in sorted(after - before):
        introduced.setdefault(name, []).append(version)
    answer = _node(root, {"action": "compare", "pairs": sorted(before | after),
                         "requirements": old_requirements + new_requirements,
                         "introduced": introduced})
    if set(answer) != {"version", "body"}:
        raise QualityError("incomplete comparison response")
    if not introduced:
        if answer["body"] is not None:
            raise QualityError("unexpected offline comparison output")
        return True
    checks, severities = _advisories(_json(answer["body"]), introduced)
    matches = _node(root, {"action": "match", "advisories": checks})
    results = matches.get("matches")
    if set(matches) != {"version", "matches"} or not isinstance(results, list) or (
            len(results) != len(checks)) or any(type(item) is not bool for item in results):
        raise QualityError("incomplete advisory range matching")
    return not any(match and severity != "info" for match, severity in zip(results, severities))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--fork-point", required=True)
    parser.add_argument("--record", type=Path)
    arguments = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    return run_check("dependency-audit", "introduced-npm-vulnerabilities/1",
                     lambda: check(root, arguments.fork_point), record=arguments.record)


if __name__ == "__main__":
    sys.exit(main())
