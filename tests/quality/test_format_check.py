"""Exercise formatter scope and verdicts at real Git and Node boundaries."""

from contextlib import redirect_stderr
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
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
import quality_support


FAKE_PRETTIER = r"""
import fs from 'node:fs/promises';
export const version = '3.9.10';
export async function getSupportInfo() {
  return {options: Object.entries({tabWidth:2,useTabs:false,semi:true,
    singleQuote:false,printWidth:80,endOfLine:'lf',trailingComma:'all',
    experimentalTernaries:false}).map(([name, value]) => ({name, default:value}))};
}
export async function resolveConfig(file, options) {
  if (options.editorconfig === true) {
    try { return JSON.parse(await fs.readFile('.editorconfig', 'utf8')); }
    catch { return JSON.parse(await fs.readFile('prettier.config.mjs', 'utf8')); }
  }
  if (options.editorconfig !== false || !options.config.endsWith('prettier.config.mjs'))
    throw Error('configuration boundary was weakened');
  return JSON.parse(await fs.readFile(options.config, 'utf8'));
}
export async function format(source, options) {
  if (!options.filepath) throw Error('missing parser selection path');
  return source.replaceAll('\r', '').replace(/=1;?/g, ' = 1;');
}
"""


@unittest.skipUnless(shutil.which("node"), "local Node is unavailable")
class FormatChecks(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="format-check-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        subprocess.run(["git", "init", "--quiet", self.root], check=True,
                       capture_output=True)
        parts = ("browser-view", "simulation", "account-server", "build-tools",
                 "deployment", "agent-workflow")
        mapping = "# Parts\n\n" + "".join(
            f"## {part}\n\n- **Files:** {part}/**\n\n" for part in parts)
        mapping += ("## foundation\n\n- **Files:** foundations/**\n  .gitignore\n"
                    "  /.gitattributes\n  prettier.config.mjs\n  package.json\n"
                    "  package-lock.json\n  .editorconfig\n")
        self.write("foundations/part_map.md", mapping)
        self.write(".gitignore", "node_modules/\n.runs/\ndist/\n")
        self.write(".gitattributes", "".join(f"*.{suffix} text eol=lf\n" for suffix in
                   ("ts", "tsx", "mts", "cts", "js", "jsx", "mjs", "cjs", "html", "css")))
        self.write("prettier.config.mjs", "{}")
        self.write("package.json", '{"devDependencies":{"prettier":"3.9.10"}}')
        self.write("package-lock.json", '{"packages":{"node_modules/prettier":'
                   '{"version":"3.9.10"}}}')
        self.write("node_modules/prettier/index.mjs", FAKE_PRETTIER)
        self.write("browser-view/good.ts", "const value = 1;\n")

    def write(self, path, text):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(text.encode("utf-8"))
        return target

    def module(self):
        try:
            return importlib.import_module("check_format")
        except ImportError:
            self.fail("the formatter method is not implemented")

    def verdict(self):
        module = self.module()
        record = self.root / ".runs/result.jsonl"
        with redirect_stderr(io.StringIO()):
            code = quality_support.run_check(
                "format", "prettier-source-format/1", lambda: module.check(self.root),
                record=record)
        return code, json.loads(record.read_text(encoding="utf-8"))

    def test_default_format_passes(self):
        self.assertEqual(self.verdict()[0], 0)

    def test_new_owned_sources_are_never_hidden_by_prettierignore(self):
        for part in ("browser-view", "simulation", "account-server", "build-tools"):
            with self.subTest(part=part):
                path = self.write(part + "/nested/new file.ts", "const value=1\n")
                self.write(part + "/.prettierignore", "**/*\n")
                self.assertEqual(self.verdict()[0], 1)
                path.unlink()

    def test_javascript_and_browser_html_css_are_checked(self):
        for path in ("build-tools/new.js", "browser-view/new.html", "simulation/new.html",
                     "browser-view/new.css", "simulation/new.css"):
            with self.subTest(path=path):
                self.write(path, "value = 1;\n")
                self.assertEqual(self.verdict()[0], 0)
                source = self.write(path, "value=1\n")
                self.assertEqual(self.verdict()[0], 1)
                source.unlink()

    def test_markdown_icons_python_and_unadopted_parts_are_excluded(self):
        for path in ("browser-view/note.md", "browser-view/icon.svg", "build-tools/run.py",
                     "deployment/run.ts", "agent-workflow/run.js", "node_modules/run.ts",
                     ".runs/run.ts", "dist/run.ts", "account-server/file.css"):
            self.write(path, "value=1\n")
        self.assertEqual(self.verdict()[0], 0)

    def test_crlf_is_a_violation_even_with_matching_formatter_output(self):
        self.write("browser-view/good.ts", "const value = 1;\r\n")
        self.assertEqual(self.verdict()[0], 1)

    def test_invalid_utf8_cannot_be_silently_replaced_into_a_pass(self):
        (self.root / "browser-view/good.ts").write_bytes(b"const value = 1;\xff\n")
        code, record = self.verdict()
        self.assertEqual(code, 2)
        self.assertIsNone(record["invariant"])

    def test_weak_configuration_does_not_pass_when_source_happens_to_match(self):
        for config in ({"semi": False}, {"endOfLine": "auto"}, {"printWidth": 120},
                       {"singleQuote": True}, {"plugins": ["extra"]}, {"parser": "babel"},
                       {"experimentalTernaries": True}, {"unknownOption": False}):
            with self.subTest(config=config):
                self.write("prettier.config.mjs", json.dumps(config))
                self.assertEqual(self.verdict()[0], 1)

    def test_lf_checkout_attributes_are_required(self):
        self.write(".gitattributes", "*.ts -text eol=lf\n")
        self.assertEqual(self.verdict()[0], 1)

    def test_actual_styleguide_paths_keep_lf_and_font_licence_keeps_its_bytes(self):
        root = Path(__file__).resolve().parents[2]
        paths = ["tools/styleguide/main.ts", "tools/styleguide/page.ts",
                 "tools/styleguide/index.html", "tools/styleguide/styles.css"]
        result = subprocess.run(["git", "check-attr", "-z", "text", "eol", "--", *paths,
                                 "assets/fonts/OFL.txt"], cwd=root, capture_output=True,
                                check=True)
        fields = result.stdout.decode("utf-8").strip("\0").split("\0")
        attributes = {(fields[index], fields[index + 1]): fields[index + 2]
                      for index in range(0, len(fields), 3)}
        for path in paths:
            self.assertEqual(attributes[path, "text"], "set", path)
            self.assertEqual(attributes[path, "eol"], "lf", path)
        self.assertEqual(attributes["assets/fonts/OFL.txt", "text"], "unset")

    def test_owned_tools_styleguide_sources_are_discovered_and_formatted(self):
        mapping = (self.root / "foundations/part_map.md").read_text(encoding="utf-8")
        self.write("foundations/part_map.md", mapping.replace(
            "- **Files:** browser-view/**", "- **Files:** browser-view/**\n  tools/styleguide/**"))
        for path in ("tools/styleguide/new.ts", "tools/styleguide/new.html",
                     "tools/styleguide/new.css"):
            with self.subTest(path=path):
                source = self.write(path, "value=1\n")
                self.assertEqual(self.verdict()[0], 1)
                source.write_bytes(b"value = 1;\n")
                self.assertEqual(self.verdict()[0], 0)
                source.unlink()

    def test_local_attributes_cannot_replace_missing_repository_rules(self):
        self.write(".gitattributes", "")
        self.assertEqual(self.verdict()[0], 1)
        self.write(".git/info/attributes", "*.ts text eol=lf\n")
        self.assertEqual(self.verdict()[0], 1)

    def test_global_attributes_cannot_replace_missing_repository_rules(self):
        self.write(".gitattributes", "")
        attributes = self.write(".runs/user.attributes", "*.ts text eol=lf\n")
        config = self.write(".runs/user.gitconfig", "[core]\n attributesFile = "
                            + json.dumps(attributes.as_posix()) + "\n")
        with patch.dict(os.environ, {"GIT_CONFIG_GLOBAL": str(config)}):
            self.assertEqual(self.verdict()[0], 1)

    def test_local_override_cannot_weaken_valid_repository_rules(self):
        self.write(".git/info/attributes", "*.ts text eol=crlf\n")
        self.assertEqual(self.verdict()[0], 1)

    def test_new_nested_attributes_and_current_edits_are_evaluated_without_index_changes(self):
        attributes = self.write("browser-view/.gitattributes", "*.ts text eol=crlf\n")
        subprocess.run(["git", "-C", self.root, "add", "--", ".gitattributes",
                        "browser-view/.gitattributes"], check=True, capture_output=True)
        index = (self.root / ".git/index").read_bytes()
        config = (self.root / ".git/config").read_bytes()
        root_attributes = self.write(".gitattributes", "")
        attributes.write_bytes(b"*.ts text eol=lf\n")
        self.assertEqual(self.verdict()[0], 0)
        self.assertEqual((self.root / ".git/index").read_bytes(), index)
        self.assertEqual(root_attributes.read_bytes(), b"")
        self.assertEqual(attributes.read_bytes(), b"*.ts text eol=lf\n")
        nested = self.write("browser-view/deep/.gitattributes", "*.ts -text\n")
        self.write("browser-view/deep/new.ts", "const value = 1;\n")
        self.assertEqual(self.verdict()[0], 1)
        self.assertEqual(nested.read_bytes(), b"*.ts -text\n")
        self.assertEqual((self.root / ".git/index").read_bytes(), index)
        self.assertEqual((self.root / ".git/config").read_bytes(), config)
        self.assertEqual(list((self.root / ".runs").glob("format-attributes-*")), [])

    def test_editor_configuration_cannot_disagree_with_the_checked_configuration(self):
        self.write(".editorconfig", '{"tabWidth":4}')
        self.assertEqual(self.verdict()[0], 1)

    def test_missing_or_unpinned_tools_give_no_named_verdict(self):
        self.write("package.json", '{"devDependencies":{"prettier":"^3.9.10"}}')
        code, record = self.verdict()
        self.assertEqual(code, 2)
        self.assertIsNone(record["invariant"])
        self.write("package.json", '{"devDependencies":{"prettier":"3.9.10"}}')
        (self.root / "node_modules/prettier/index.mjs").unlink()
        self.assertEqual(self.verdict()[0], 2)

    def test_missing_configuration_is_not_a_default_pass(self):
        (self.root / "prettier.config.mjs").unlink()
        self.assertEqual(self.verdict()[0], 2)

    def test_wrong_installed_version_gives_no_named_verdict(self):
        self.write("node_modules/prettier/index.mjs",
                   FAKE_PRETTIER.replace("'3.9.10'", "'3.9.9'"))
        code, record = self.verdict()
        self.assertEqual(code, 2)
        self.assertIsNone(record["invariant"])

    def test_malformed_or_incomplete_tool_output_never_passes(self):
        module = self.module()
        invoke = module.run_tool
        for output in ("not json", '{}', '{"version":"3.9.10","files":[]}',
                       '{"version":"3.9.10","files":[{"path":"browser-view/good.ts",'
                       '"formatted":"yes","configuration":true}]}'):
            def malformed(command, *, output=output, **options):
                if "--input-type=module" in command:
                    return subprocess.CompletedProcess(command, 0, output, "")
                return invoke(command, **options)
            with self.subTest(output=output), patch.object(module, "run_tool",
                                                         side_effect=malformed):
                code, record = self.verdict()
                self.assertEqual(code, 2)
                self.assertIsNone(record["invariant"])


if __name__ == "__main__":
    unittest.main()
