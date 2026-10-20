"""Focused probe: empty parsed disable list must mean blanket suppression."""
import json
from pathlib import Path
import subprocess
import sys

root = Path.cwd()
sys.path.insert(0, str(root / "scripts"))
import check_eslint

script = r"""
const { inspectFiles } = await import(process.argv[1]);
class FakeESLint {
  constructor(options) { this.options = options; }
  async isPathIgnored() { return false; }
  async calculateConfigForFile() {
    return { rules: { 'no-debugger': [2] }, languageOptions: {} };
  }
  async lintText(text, options) {
    this.options.overrideConfig.plugins['quality-inspection'].rules.comments.create({
      sourceCode: { getAllComments: () => [{type: 'Block', value: ' eslint-disable , '}] }
    });
    return [{ filePath: options.filePath, messages: [], suppressedMessages: [] }];
  }
}
const result = await inspectFiles({ ESLint: FakeESLint, plugin: {}, parser: {}, commentParser: {
  parseDirective: () => ({ label: 'eslint-disable', value: ',' }),
  // The pinned parser splits on commas and drops empty names.
  parseListConfig: (value) => Object.fromEntries(value.split(',').map(s => s.trim()).filter(Boolean).map(s => [s, true]))
} }, { root: process.cwd(), configuration: false,
  files: [{path: 'scripts/empty-list.js', rules: {'no-debugger': [2]}}]
}, async () => '/* eslint-disable , */\n');
console.log(JSON.stringify(result));
"""
result = subprocess.run(["node", "--input-type=module", "--eval", script,
                         (root / "scripts/inspect_eslint.mjs").as_uri()],
                        cwd=root, capture_output=True, text=True, encoding="utf-8")
print("bridge_exit:", result.returncode)
print(result.stdout, end="")
print(result.stderr, end="", file=sys.stderr)
if result.returncode:
    sys.exit(result.returncode)
entry = check_eslint.parse_report(result.stdout, ["scripts/empty-list.js"])[0]
actual = check_eslint.source_ok(entry, {"no-debugger": [2]})
print("expected_source_ok: false")
print("actual_source_ok:", json.dumps(actual))
sys.exit(1 if actual else 0)
