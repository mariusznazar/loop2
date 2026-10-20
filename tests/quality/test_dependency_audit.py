"""Exercise dependency comparisons with real Git, Node and npm's semver boundary."""

from contextlib import redirect_stderr
import copy
import importlib
import io
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
import quality_support


def installed_semver():
    candidates = [Path(__file__).resolve().parents[2] / "node_modules/npm/node_modules/semver"]
    launcher = shutil.which("npm.cmd") or shutil.which("npm")
    if launcher:
        candidates.append(Path(launcher).resolve().parent / "node_modules/npm/node_modules/semver")
    return next((path for path in candidates if (path / "package.json").is_file()), None)


SEMVER = installed_semver()


@unittest.skipUnless(shutil.which("node") and SEMVER, "local Node/npm semver unavailable")
class DependencyAudit(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="dependency-audit-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.git("init", "--quiet")
        self.write("foundations/part_map.md", "# Parts\n\n## build-tools\n\n"
                   "- **Files:** package.json\n  package-lock.json\n  npm-shrinkwrap.json\n"
                   "  scripts/**\n\n## foundation\n\n- **Files:** foundations/**\n  .gitignore\n")
        self.write(".gitignore", "node_modules/\n.runs/\n")
        self.manifest = {"name": "test-app", "devDependencies": {"npm": "11.13.0"},
                         "dependencies": {"a": "1.0.0"}}
        self.lock = {"lockfileVersion": 3, "packages": {
            "": copy.deepcopy(self.manifest),
            "node_modules/npm": {"version": "11.13.0", "dev": True},
            "node_modules/a": {"version": "1.0.0"}}}
        self.save()
        self.git("add", "package.json", "package-lock.json", "foundations/part_map.md", ".gitignore")
        self.git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
                 "-c", "core.hooksPath=", "commit", "--quiet", "-m", "fixture base")
        self.base = self.git("rev-parse", "HEAD").strip()
        self.write("node_modules/npm/package.json", json.dumps({"version": "11.13.0"}))
        self.write("node_modules/npm/node_modules/semver/index.js",
                   "module.exports = require(" + json.dumps(str(SEMVER)) + ");")
        # Only the remote exchange is replaced. Node, Git, range matching and parsers are real.
        self.write("node_modules/npm/node_modules/npm-registry-fetch/index.js", r'''
const fs = require('node:fs');
module.exports = async (url, options) => {
  if (url !== 'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk' ||
      options.method !== 'POST' || options.retry !== 0 || options.redirect !== 'error')
    throw Error('wrong registry boundary');
  fs.writeFileSync('.runs/payload.json', JSON.stringify(options.body));
  const text = fs.readFileSync('.runs/response.json', 'utf8');
  if (text === 'NETWORK_FAILURE') throw Error('registry unavailable');
  return {text:async () => text};
};
''')
        self.response({})

    def write(self, path, content):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content.encode("utf-8"))
        return target

    def git(self, *arguments):
        result = subprocess.run(["git", *arguments], cwd=self.root, capture_output=True, check=True)
        return result.stdout.decode("utf-8")

    def save(self):
        self.write("package.json", json.dumps(self.manifest))
        self.lock["packages"][""] = copy.deepcopy(self.manifest)
        self.write("package-lock.json", json.dumps(self.lock))

    def response(self, value):
        self.write(".runs/response.json", json.dumps(value))

    def advisory(self, severity="low", versions="<2.0.0", name="a"):
        return {"id": 100, "name": name, "severity": severity,
                "vulnerable_versions": versions, "title": "Fixture advisory",
                "url": "https://github.com/advisories/GHSA-fixture"}

    def introduce(self, version="1.5.0"):
        self.manifest["dependencies"]["a"] = version
        self.lock["packages"]["node_modules/a"]["version"] = version
        self.save()

    def verdict(self, base=None):
        try:
            module = importlib.import_module("check_dependencies")
        except ImportError:
            self.fail("dependency audit method is not implemented")
        record = self.root / ".runs/result.jsonl"
        with redirect_stderr(io.StringIO()):
            code = quality_support.run_check("dependency-audit", "introduced-npm-vulnerabilities/1",
                lambda: module.check(self.root, base or self.base), record=record)
        return code, json.loads(record.read_text(encoding="utf-8"))

    def test_unchanged_pairs_pass_offline_after_complete_comparison(self):
        self.write(".runs/response.json", "NETWORK_FAILURE")
        self.assertEqual(self.verdict()[0], 0)
        self.assertFalse((self.root / ".runs/payload.json").exists())

    def test_concrete_advisory_ranges_and_every_severity(self):
        self.introduce()
        for severity, versions, want in [("info", "*", 0), ("low", "<2", 1),
                ("moderate", "^1.5", 1), ("high", ">=1.4 <1.6", 1),
                ("critical", "1.0.0 || >=1.5.0", 1), ("critical", "<1.4", 0)]:
            with self.subTest(severity=severity, versions=versions):
                self.response({"a": [self.advisory(severity, versions)]})
                self.assertEqual(self.verdict()[0], want)

    def test_alias_uses_actual_name_and_matching_version_only(self):
        self.manifest["dependencies"]["alias"] = "npm:real@2.1.0"
        self.lock["packages"]["node_modules/alias"] = {"name": "real", "version": "2.1.0"}
        self.save()
        self.response({"real": [self.advisory("critical", "<2", "real"),
                                self.advisory("info", ">=2", "real")]})
        self.assertEqual(self.verdict()[0], 0)
        self.assertEqual(json.loads((self.root / ".runs/payload.json").read_text()),
                         {"real": ["2.1.0"]})
        self.response({"real": [self.advisory("low", ">=2", "real")]})
        self.assertEqual(self.verdict()[0], 1)

    def test_each_dependency_class_and_transitive_version_is_audited(self):
        for field in ("dependencies", "devDependencies", "optionalDependencies", "peerDependencies"):
            with self.subTest(field=field):
                self.manifest.setdefault(field, {})["outer"] = "2.0.0"
                self.lock["packages"]["node_modules/outer"] = {
                    "version": "2.0.0", "dependencies": {"a": "2.0.0"}}
                self.lock["packages"]["node_modules/outer/node_modules/a"] = {"version": "2.0.0"}
                self.save()
                self.response({"a": [self.advisory("low", "2.0.0")]})
                self.assertEqual(self.verdict()[0], 1)
                self.assertEqual(json.loads((self.root / ".runs/payload.json").read_text()),
                                 {"a": ["2.0.0"], "outer": ["2.0.0"]})
                del self.manifest[field]["outer"]

    def test_new_nested_manifest_and_lock_are_in_scope(self):
        self.write("scripts/new path/package.json", '{"dependencies":{"b":"3.0.0"}}')
        self.write("scripts/new path/package-lock.json", json.dumps({"lockfileVersion": 3,
            "packages": {"": {"dependencies": {"b": "3.0.0"}},
                         "node_modules/b": {"version": "3.0.0"}}}))
        self.response({"b": [self.advisory("low", "*", "b")]})
        self.assertEqual(self.verdict()[0], 1)

    def test_same_pair_moved_to_new_manifest_is_not_introduced(self):
        self.write("scripts/moved/package.json", '{"dependencies":{"a":"1.0.0"}}')
        self.write("scripts/moved/package-lock.json", json.dumps({"lockfileVersion": 3,
            "packages": {"": {"dependencies": {"a": "1.0.0"}},
                         "node_modules/a": {"version": "1.0.0"}}}))
        self.write(".runs/response.json", "NETWORK_FAILURE")
        self.assertEqual(self.verdict()[0], 0)

    def test_missing_locks_base_and_unsupported_lock_shapes_never_pass(self):
        self.assertEqual(self.verdict("f" * 40)[0], 2)
        for bad in ({}, {"lockfileVersion": 1, "dependencies": {}},
                    {"lockfileVersion": 3, "packages": {}},
                    {"lockfileVersion": 3, "packages": {"": self.manifest}}):
            with self.subTest(lock=bad):
                self.write("package-lock.json", json.dumps(bad))
                self.assertEqual(self.verdict()[0], 2)
        self.save()
        self.write("scripts/new/package.json", "{}")
        self.assertEqual(self.verdict()[0], 2)

    def test_manifest_lock_mismatch_and_incomplete_transitive_graph_are_unavailable(self):
        self.manifest["dependencies"]["a"] = "2.0.0"
        self.save()
        self.assertEqual(self.verdict()[0], 2)
        self.manifest["dependencies"]["a"] = "1.0.0"
        self.lock["packages"]["node_modules/a"]["dependencies"] = {"missing": "1"}
        self.save()
        self.assertEqual(self.verdict()[0], 2)

    def test_bad_advisory_schema_range_severity_and_name_never_pass(self):
        self.introduce()
        bad = [None, [], {"a": {}}, {"a": ["a"]}, {"error": "unavailable"},
               {"a": [self.advisory("unknown")]}, {"a": [self.advisory(versions="garbage")]},
               {"a": [self.advisory(name="other")]}, {"a": [{}]},
               {"a": [dict(self.advisory(), id=True)]}]
        for response in bad:
            with self.subTest(response=response):
                self.response(response)
                code, record = self.verdict()
                self.assertEqual(code, 2)
                self.assertIsNone(record["invariant"])

    def test_network_malformed_output_and_missing_pinned_tool_are_unavailable(self):
        self.introduce()
        for response in ("NETWORK_FAILURE", "not json"):
            self.write(".runs/response.json", response)
            self.assertEqual(self.verdict()[0], 2)
        self.response({})
        self.write("node_modules/npm/package.json", '{"version":"11.12.0"}')
        self.assertEqual(self.verdict()[0], 2)
        (self.root / "node_modules/npm/package.json").unlink()
        self.assertEqual(self.verdict()[0], 2)

    def test_stale_pass_is_overwritten_when_later_advisory_is_invalid(self):
        self.introduce()
        self.assertEqual(self.verdict()[0], 0)
        self.response({"a": [self.advisory(), self.advisory(versions="not-a-range")]})
        code, record = self.verdict()
        self.assertEqual(code, 2)
        self.assertIsNone(record["invariant"])

    def test_prerelease_semver_is_not_misclassified_by_numeric_comparison(self):
        self.introduce("2.0.0-beta.1")
        self.response({"a": [self.advisory("low", ">=2.0.0-beta.0 <2.0.0")]})
        self.assertEqual(self.verdict()[0], 1)

    def test_prerelease_matches_npm_inclusive_advisory_ranges(self):
        self.introduce("2.0.0-beta.1")
        self.response({"a": [self.advisory("low", "<2.0.0")]})
        self.assertEqual(self.verdict()[0], 1)

    def test_conflicting_registry_identity_never_audits_the_install_alias_as_real(self):
        self.introduce()
        self.lock["packages"]["node_modules/a"]["resolved"] = (
            "https://registry.npmjs.org/other/-/other-1.5.0.tgz")
        self.save()
        self.assertEqual(self.verdict()[0], 2)

    def test_tarball_version_conflict_is_unavailable_before_offline_pass(self):
        self.lock["packages"]["node_modules/a"]["resolved"] = (
            "https://registry.npmjs.org/a/-/a-1.5.0.tgz")
        self.save()
        self.write(".runs/response.json", "NETWORK_FAILURE")
        code, record = self.verdict()
        self.assertEqual(code, 2)
        self.assertIsNone(record["invariant"])
        self.assertFalse((self.root / ".runs/payload.json").exists())

    def test_tarball_dot_segments_are_unavailable_before_offline_pass(self):
        self.lock["packages"]["node_modules/a"]["resolved"] = (
            "https://registry.npmjs.org/a/-/../../other/-/other-1.5.0.tgz")
        self.save()
        self.write(".runs/response.json", "NETWORK_FAILURE")
        code, record = self.verdict()
        self.assertEqual(code, 2)
        self.assertIsNone(record["invariant"])
        self.assertFalse((self.root / ".runs/payload.json").exists())

    def test_tarball_ambiguous_urls_are_unavailable_before_offline_pass(self):
        urls = [
            "https://registry.npmjs.org/a/-/%2e%2e/%2e%2e/other/-/other-1.5.0.tgz",
            r"https://registry.npmjs.org/a/-/..\..\other\-\other-1.5.0.tgz",
            "https://registry.npmjs.org/a/-/a-1.0.0.tgz?download=1",
            "https://registry.npmjs.org/a/-/a-1.0.0.tgz#fragment",
            "https://registry.npmjs.org/a/-/other-1.0.0.tgz",
            "https://registry.npmjs.org/a/-/a-1.0.0.tgz/extra",
            "https://registry.npmjs.org/a/-/%61-1.0.0.tgz",
            "https://registry.npmjs.org/a/-/\na-1.0.0.tgz",
            "https://registry.npmjs.org:443/a/-/a-1.0.0.tgz",
        ]
        self.write(".runs/response.json", "NETWORK_FAILURE")
        for url in urls:
            with self.subTest(url=url):
                self.lock["packages"]["node_modules/a"]["resolved"] = url
                self.save()
                code, record = self.verdict()
                self.assertEqual(code, 2)
                self.assertIsNone(record["invariant"])
                self.assertFalse((self.root / ".runs/payload.json").exists())

    def test_tarball_supported_exact_identities_retain_alias_and_scope_support(self):
        self.lock["packages"]["node_modules/a"]["resolved"] = (
            "https://registry.npmjs.org/a/-/a-1.0.0.tgz")
        self.save()
        self.write(".runs/response.json", "NETWORK_FAILURE")
        self.assertEqual(self.verdict()[0], 0)
        self.assertFalse((self.root / ".runs/payload.json").exists())
        for name, version, source in [
                ("real-name", "2.0.0", "real-name/-/real-name-2.0.0.tgz"),
                ("@scope/real", "2.0.0", "@scope/real/-/real-2.0.0.tgz"),
                ("@scope/real", "2.0.0", "@scope%2freal/-/real-2.0.0.tgz"),
                ("@scope/real", "2.0.0", "@scope%2Freal/-/real-2.0.0.tgz"),
                ("real-name", "2.0.0-beta.1+build", "real-name/-/real-name-2.0.0-beta.1+build.tgz")]:
            with self.subTest(source=source):
                self.manifest["dependencies"]["alias"] = f"npm:{name}@{version}"
                self.lock["packages"]["node_modules/alias"] = {
                    "name": name, "version": version,
                    "resolved": "https://registry.npmjs.org/" + source}
                self.save()
                self.response({})
                self.assertEqual(self.verdict()[0], 0)
                self.assertEqual(json.loads((self.root / ".runs/payload.json").read_text()),
                                 {name: [version]})

    def test_tarball_historical_identity_conflict_is_unavailable(self):
        self.lock["packages"]["node_modules/a"]["resolved"] = (
            "https://registry.npmjs.org/a/-/a-1.5.0.tgz")
        self.save()
        self.git("add", "package-lock.json")
        self.git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
                 "-c", "core.hooksPath=", "commit", "--quiet", "-m", "conflicting base source")
        base = self.git("rev-parse", "HEAD").strip()
        self.lock["packages"]["node_modules/a"]["resolved"] = (
            "https://registry.npmjs.org/a/-/a-1.0.0.tgz")
        self.save()
        self.write(".runs/response.json", "NETWORK_FAILURE")
        code, record = self.verdict(base)
        self.assertEqual(code, 2)
        self.assertIsNone(record["invariant"])
        self.assertFalse((self.root / ".runs/payload.json").exists())

    def test_tarball_fix_does_not_require_historical_npm_tool_pin(self):
        current_manifest, current_lock = copy.deepcopy(self.manifest), copy.deepcopy(self.lock)
        del self.manifest["devDependencies"]["npm"]
        del self.lock["packages"]["node_modules/npm"]
        self.save()
        self.git("add", "package.json", "package-lock.json")
        self.git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
                 "-c", "core.hooksPath=", "commit", "--quiet", "-m", "base before audit tool")
        base = self.git("rev-parse", "HEAD").strip()
        self.manifest, self.lock = current_manifest, current_lock
        self.save()
        self.assertEqual(self.verdict(base)[0], 0)
        self.assertEqual(json.loads((self.root / ".runs/payload.json").read_text()),
                         {"npm": ["11.13.0"]})

    def test_nested_pinned_npm_cannot_mask_a_different_root_tool_lock(self):
        del self.manifest["devDependencies"]["npm"]
        self.manifest["dependencies"]["npm"] = "11.13.0"
        self.manifest["optionalDependencies"] = {"npm": "12.0.0"}
        self.lock["packages"]["node_modules/npm"]["version"] = "12.0.0"
        self.lock["packages"]["node_modules/a/node_modules/npm"] = {"version": "11.13.0"}
        self.save()
        self.assertEqual(self.verdict()[0], 2)

    def test_duplicate_registry_keys_cannot_erase_a_blocking_advisory(self):
        self.introduce()
        raw = '{"a":' + json.dumps([self.advisory()]) + ',"a":[]}'
        self.write(".runs/response.json", raw)
        self.assertEqual(self.verdict()[0], 2)

    def test_scoped_alias_and_multiple_versions_match_separately(self):
        self.manifest["dependencies"].update({"alias": "npm:@scope/real@2.0.0", "a": "1.5.0"})
        self.lock["packages"]["node_modules/a"]["version"] = "1.5.0"
        self.lock["packages"]["node_modules/alias"] = {
            "name": "@scope/real", "version": "2.0.0", "dependencies": {"a": "3.0.0"},
            "resolved": "https://registry.npmjs.org/@scope/real/-/real-2.0.0.tgz"}
        self.lock["packages"]["node_modules/alias/node_modules/a"] = {"version": "3.0.0"}
        self.save()
        self.response({"a": [self.advisory("critical", "<1.5.0"), self.advisory("info", "3")]})
        self.assertEqual(self.verdict()[0], 0)
        self.assertEqual(json.loads((self.root / ".runs/payload.json").read_text()),
                         {"@scope/real": ["2.0.0"], "a": ["1.5.0", "3.0.0"]})
        self.response({"a": [self.advisory("low", "3")]})
        self.assertEqual(self.verdict()[0], 1)

    def test_deleted_base_lock_and_dangling_current_lock_are_unavailable(self):
        (self.root / "package-lock.json").unlink()
        self.git("add", "package-lock.json")
        self.git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
                 "-c", "core.hooksPath=", "commit", "--quiet", "-m", "missing base lock")
        base = self.git("rev-parse", "HEAD").strip()
        self.save()
        self.assertEqual(self.verdict(base)[0], 2)
        self.write("scripts/dangling/package-lock.json", json.dumps(self.lock))
        self.assertEqual(self.verdict()[0], 2)

    def test_npm_config_cannot_redirect_or_omit_audit_data(self):
        self.introduce()
        self.write(".npmrc", "registry=http://invalid.invalid\nomit=dev\n")
        self.git("add", "-f", ".npmrc")
        # Give the config an owner so this checks npm isolation rather than map failure.
        mapping = (self.root / "foundations/part_map.md").read_text()
        self.write("foundations/part_map.md", mapping.replace("  scripts/**", "  scripts/**\n  .npmrc"))
        previous = os.environ.get("NPM_CONFIG_REGISTRY")
        os.environ["NPM_CONFIG_REGISTRY"] = "http://invalid.invalid"
        try:
            self.response({"a": [self.advisory()]})
            self.assertEqual(self.verdict()[0], 1)
        finally:
            if previous is None:
                os.environ.pop("NPM_CONFIG_REGISTRY", None)
            else:
                os.environ["NPM_CONFIG_REGISTRY"] = previous


if __name__ == "__main__":
    unittest.main()
