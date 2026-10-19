"""Behavioral checks for the independent ESLint invariant methods."""

from contextlib import redirect_stderr, redirect_stdout
import importlib.util
import io
import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))


class EslintChecks(unittest.TestCase):
    def setUp(self):
        path = ROOT / "scripts/check_eslint.py"
        self.assertTrue(path.is_file(), "ESLint method is not implemented")
        spec = importlib.util.spec_from_file_location("check_eslint", path)
        self.check = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(self.check)

    def test_expected_membership_matches_whole_authoritative_facts(self):
        text = (ROOT / "foundations/environment_facts.md").read_text(encoding="utf-8")
        js = text.split("## eslint-recommended-rules/1\n", 1)[1].split("\n- **Holds for:**", 1)[0]
        ts = text.split("## typescript-eslint-typechecked-rules/1\n", 1)[1].split("\n- **Holds for:**", 1)[0]
        enabled, disabled = ts.split(" and disabling ")
        javascript = set(re.findall(r"`([^`]+)`", js)) - {"recommended", "error"}
        additions = set(re.findall(r"`([^`]+)`", enabled)) - {"recommendedTypeChecked", "base", "eslintRecommended", "recommended-type-checked", "error"}
        removals = set(re.findall(r"`([^`]+)`", disabled))
        self.assertEqual(set(self.check.expected_rules("scripts/new.js")), javascript)
        self.assertEqual(set(self.check.expected_rules("scripts/new.ts")), javascript - removals | additions)
        self.assertEqual(len(javascript), 64)
        self.assertEqual(len(javascript - removals | additions), 92)

    def test_language_selection_includes_new_variants_without_root_allowlist(self):
        with patch.object(self.check, "discover_files", return_value=[
                "scripts/new/deep.mts", "tests/view/new.cts", "src/server/new.tsx",
                "scripts/new.jsx", "scripts/new.cjs", "scripts/new.mjs",
                "scripts/new.js", "scripts/new.ts", "scripts/no.py"]):
            self.assertEqual(self.check.source_files(ROOT), [
                "scripts/new/deep.mts", "tests/view/new.cts", "src/server/new.tsx",
                "scripts/new.jsx", "scripts/new.cjs", "scripts/new.mjs",
                "scripts/new.js", "scripts/new.ts"])

    def test_bridge_disables_inline_config_and_preserves_every_requested_path(self):
        bridge = ROOT / "scripts/inspect_eslint.mjs"
        self.assertTrue(bridge.is_file(), "ESLint bridge is not implemented")
        script = """
          const { inspectFiles } = await import(process.argv[1]);
          class FakeESLint {
            constructor(options) {
              if (options.allowInlineConfig !== false || options.fix !== false ||
                  options.applySuppressions !== false || options.cache !== false) {
                throw new Error('unsafe lint options');
              }
              this.options = options;
            }
            async isPathIgnored(path) { return path.endsWith('ignored.ts'); }
            async calculateConfigForFile() {
              return { rules: { 'no-debugger': [2] }, languageOptions: {} };
            }
            async lintText(text, options) {
              const rule = this.options.overrideConfig.plugins['quality-inspection'].rules.comments;
              rule.create({ sourceCode: { getAllComments: () => [{type: 'Line', value: 'eslint-disable no-debugger'}, {type: 'Block', value: 'eslint-disable no-debugger'}] } });
              return [{ filePath: options.filePath, messages: [], suppressedMessages: [] }];
            }
          }
          const result = await inspectFiles({ ESLint: FakeESLint, plugin: {}, parser: {}, commentParser: {
              parseDirective: () => ({ label: 'eslint-disable', value: 'no-debugger' }),
              parseListConfig: () => ({ 'no-debugger': true })
            } }, {
            root: process.cwd(), configuration: false,
            files: [ {path: 'scripts/new.js', rules: {'no-debugger': [2]}},
                     {path: 'scripts/ignored.ts', rules: {'no-debugger': [2]}} ]
          }, async () => 'debugger;');
          console.log(JSON.stringify(result));
        """
        result = subprocess.run(["node", "--input-type=module", "--eval", script, bridge.as_uri()],
                                cwd=ROOT, capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(result.returncode, 0, result.stderr)
        report = json.loads(result.stdout)
        self.assertEqual([entry["path"] for entry in report["files"]],
                         ["scripts/new.js", "scripts/ignored.ts"])
        self.assertEqual(report["files"][0]["comments"], ["eslint-disable no-debugger", "eslint-disable no-debugger"])
        self.assertTrue(report["files"][1]["ignored"])
        self.assertEqual(report["files"][0]["disabledRules"], [["no-debugger"]])

    def test_empty_parsed_disable_lists_are_blanket_suppressions(self):
        bridge = ROOT / "scripts/inspect_eslint.mjs"
        cases = [
            {"label": label, "value": value, "want_disabled": [None]}
            for label in ("eslint-disable", "eslint-disable-next-line", "eslint-disable-line")
            for value in ("", ",", " , , ", "'', \"\"")
        ]
        cases.extend([
            {"label": "eslint-enable", "value": ",", "want_disabled": []},
            {"label": "eslint", "value": "no-debugger: error", "want_disabled": []},
        ])
        script = r"""
          import { readFileSync } from 'node:fs';
          const { inspectFiles } = await import(process.argv[1]);
          const cases = JSON.parse(readFileSync(0, 'utf8'));
          class FakeESLint {
            constructor(options) { this.options = options; }
            async isPathIgnored() { return false; }
            async calculateConfigForFile() {
              return { rules: { 'no-debugger': [2] }, languageOptions: {} };
            }
            async lintText(text, options) {
              const item = JSON.parse(text);
              this.options.overrideConfig.plugins['quality-inspection'].rules.comments.create({
                sourceCode: { getAllComments: () => [{type: 'Block', value: JSON.stringify(item)}] }
              });
              return [{ filePath: options.filePath, messages: [], suppressedMessages: [] }];
            }
          }
          const report = await inspectFiles({ ESLint: FakeESLint, plugin: {}, parser: {},
            commentParser: {
              parseDirective: value => JSON.parse(value),
              // These literal cases all have zero names in ESLint's list parser.
              parseListConfig: () => ({}),
              parseJSONLikeConfig: () => ({ok: true, config: {'no-debugger': 'error'}})
            }
          }, { root: process.cwd(), configuration: false,
            files: cases.map((item, index) => ({path: `scripts/empty-${index}.js`, rules: {'no-debugger': [2]}}))
          }, async absolute => JSON.stringify(cases[Number(/empty-(\d+)\.js$/.exec(absolute)[1])]));
          console.log(JSON.stringify(report));
        """
        result = subprocess.run(["node", "--input-type=module", "--eval", script, bridge.as_uri()],
                                cwd=ROOT, input=json.dumps(cases), capture_output=True,
                                text=True, encoding="utf-8")
        self.assertEqual(result.returncode, 0, result.stderr)
        paths = [f"scripts/empty-{index}.js" for index in range(len(cases))]
        entries = self.check.parse_report(result.stdout, paths)
        for case, entry in zip(cases, entries):
            with self.subTest(label=case["label"], value=case["value"]):
                self.assertEqual(entry["disabledRules"], case["want_disabled"])
                self.assertEqual(self.check.source_ok(entry, {"no-debugger": [2]}),
                                 case["want_disabled"] == [])

    def entry(self):
        return {"path": "scripts/new.js", "ignored": False, "processor": False,
                "rules": {"no-debugger": [2]}, "defaults": {"no-debugger": [2]},
                "comments": [], "messages": [], "inlineRules": [], "disabledRules": []}

    def test_effective_configuration_accepts_exact_default_options(self):
        self.assertTrue(self.check.configuration_ok(self.entry(), {"no-debugger": [2]}))

    def test_configuration_rejects_disabled_warn_extra_and_changed_options(self):
        for rules in ({}, {"no-debugger": [0]}, {"no-debugger": [1]},
                      {"no-debugger": [2, {"allow": True}]},
                      {"no-debugger": [2], "quotes": [2, "single"]}):
            with self.subTest(rules=rules):
                entry = self.entry()
                entry["rules"] = rules
                self.assertFalse(self.check.configuration_ok(entry, {"no-debugger": [2]}))

    def test_exclusion_and_processors_cannot_hide_a_file(self):
        for key in ("ignored", "processor"):
            entry = self.entry()
            entry[key] = True
            self.assertFalse(self.check.configuration_ok(entry, {"no-debugger": [2]}))
            self.assertFalse(self.check.source_ok(entry, {"no-debugger": [2]}))

    def test_inline_changes_and_blocking_suppression_fail(self):
        for field, value in (("disabledRules", [["no-debugger"]]),
                             ("disabledRules", [None]),
                             ("inlineRules", [{"no-debugger": [0]}]),
                             ("inlineRules", [{"no-debugger": [2], "quotes": [2, "single"]}]),
                             ("inlineRules", [{"no-debugger": [2, {"allow": True}]}])):
            with self.subTest(field=field, value=value):
                entry = self.entry()
                entry[field] = value
                self.assertFalse(self.check.source_ok(entry, {"no-debugger": [2]}))

    def test_redundant_inline_rules_and_nonblocking_disable_pass(self):
        entry = self.entry()
        entry["comments"] = ["documentation mentions eslint-disable", "eslint no-debugger: error"]
        entry["inlineRules"] = [{"no-debugger": [2]}]
        entry["disabledRules"] = [["no-console"]]
        self.assertTrue(self.check.source_ok(entry, {"no-debugger": [2]}))

    def test_blocking_source_report_fails(self):
        entry = self.entry()
        entry["messages"] = [{"ruleId": "no-debugger", "severity": 2,
                              "message": "Unexpected debugger", "fatal": False}]
        self.assertFalse(self.check.source_ok(entry, {"no-debugger": [2]}))

    def test_fatal_parser_error_has_no_rule_verdict(self):
        entry = self.entry()
        entry["messages"] = [{"ruleId": None, "severity": 2,
                              "message": "File is not in the parser project", "fatal": True}]
        with self.assertRaises(self.check.QualityError):
            self.check.source_ok(entry, {"no-debugger": [2]})

    def test_incomplete_oracle_cannot_produce_a_source_pass(self):
        for defaults in ({}, {"no-debugger": [0]}, {"no-debugger": [1]}):
            entry = self.entry()
            entry["defaults"] = defaults
            with self.subTest(defaults=defaults), self.assertRaises(self.check.QualityError):
                self.check.source_ok(entry, {"no-debugger": [2]})

    def test_real_discovery_reaches_new_owned_ts_js_paths(self):
        with tempfile.TemporaryDirectory(dir=ROOT / ".runs") as directory:
            fixture = Path(directory)
            subprocess.run(["git", "init", "--quiet", str(fixture)], check=True, capture_output=True)
            (fixture / "foundations").mkdir()
            (fixture / "scripts/deep").mkdir(parents=True)
            (fixture / "tests/new").mkdir(parents=True)
            (fixture / ".gitignore").write_text("node_modules/\n.runs/\n", encoding="utf-8")
            (fixture / "foundations/part_map.md").write_text(
                "## browser-view\n\n- **Files:** src/browser/*\n\n"
                "## simulation\n\n- **Files:** sim/**\n\n"
                "## account-server\n\n- **Files:** src/server/**\n\n"
                "## build-tools\n\n- **Files:** scripts/**\n  tests/**\n  .gitignore\n\n"
                "## product-foundation\n\n- **Files:** foundations/**\n", encoding="utf-8")
            subprocess.run(["git", "-C", str(fixture), "add", "foundations/part_map.md", ".gitignore"],
                           check=True, capture_output=True)
            (fixture / "scripts/deep/new.mts").write_text("export {};", encoding="utf-8")
            (fixture / "tests/new/new.jsx").write_text("export {};", encoding="utf-8")
            (fixture / "scripts/no.py").write_text("pass", encoding="utf-8")
            (fixture / "node_modules").mkdir()
            (fixture / "node_modules/hidden.ts").write_text("debugger;", encoding="utf-8")
            self.assertEqual(self.check.source_files(fixture),
                             ["scripts/deep/new.mts", "tests/new/new.jsx"])

    def test_parser_rejects_incomplete_duplicate_unexpected_and_malformed_results(self):
        good = {"schema": 1, "files": [self.entry()]}
        self.assertEqual(self.check.parse_report(json.dumps(good), ["scripts/new.js"]), good["files"])
        bad = ["{}", "not-json", '{"schema":1,"schema":1,"files":[]}',
               '{"schema":1,"files":NaN}', json.dumps({"schema": 1, "files": []})]
        for entries in ([self.entry(), self.entry()], [{**self.entry(), "path": "other.js"}],
                        [{**self.entry(), "rules": []}], [{**self.entry(), "messages": [{}]}],
                        [{**self.entry(), "ignored": 0}], [{**self.entry(), "comments": [1]}]):
            bad.append(json.dumps({"schema": 1, "files": entries}))
        for payload in bad:
            with self.subTest(payload=payload), self.assertRaises(self.check.QualityError):
                self.check.parse_report(payload, ["scripts/new.js"])

    def test_missing_node_has_no_named_verdict_and_overwrites_old_pass(self):
        with tempfile.TemporaryDirectory(dir=ROOT / ".runs") as directory:
            record = Path(directory, "result.jsonl")
            record.write_text('{"verdict":"pass"}\n', encoding="utf-8")
            captured = io.StringIO()
            with (patch.object(self.check, "source_files", return_value=["scripts/new.js"]),
                  patch.object(self.check.shutil, "which", return_value=None),
                  redirect_stdout(captured), redirect_stderr(captured)):
                code = self.check.main(["--record", str(record)], root=ROOT)
            self.assertEqual(code, 2)
            recorded = json.loads(record.read_text())
            self.assertIsNone(recorded["invariant"])
            self.assertEqual(json.loads(captured.getvalue()), recorded)

    def test_tool_errors_and_malformed_json_never_become_success(self):
        for response in (self.check.QualityError("missing package"),
                         subprocess.CompletedProcess([], 0, "{}", ""),
                         subprocess.CompletedProcess([], 0, "{}", "warning")):
            with tempfile.TemporaryDirectory(dir=ROOT / ".runs") as directory:
                record = Path(directory, "result.jsonl")
                captured = io.StringIO()
                with (patch.object(self.check, "source_files", return_value=["scripts/new.js"]),
                      patch.object(self.check, "run_tool",
                                   side_effect=response if isinstance(response, Exception) else None,
                                   return_value=response),
                      redirect_stdout(captured), redirect_stderr(captured)):
                    code = self.check.main(["--configuration", "--record", str(record)], root=ROOT)
                self.assertEqual(code, 2)
                recorded = json.loads(record.read_text())
                self.assertIsNone(recorded["invariant"])
                self.assertEqual(json.loads(captured.getvalue()), recorded)


if __name__ == "__main__":
    unittest.main()
