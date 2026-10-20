"""Check D-29's source rules and effective ESLint configuration independently."""

import argparse
import json
import os
from pathlib import Path
import shutil
import sys

from quality_support import QualityError, discover_files, run_check, run_tool

PARTS = ("browser-view", "simulation", "account-server", "build-tools")
JS_SUFFIXES = {".js", ".mjs", ".cjs", ".jsx"}
TS_SUFFIXES = {".ts", ".mts", ".cts", ".tsx"}

# Membership is transcribed from the two D-29 environment facts, not tool configs.
JS_RULES = [
    "constructor-super", "for-direction", "getter-return", "no-async-promise-executor",
    "no-case-declarations", "no-class-assign", "no-compare-neg-zero", "no-cond-assign",
    "no-const-assign", "no-constant-binary-expression", "no-constant-condition",
    "no-control-regex", "no-debugger", "no-delete-var", "no-dupe-args",
    "no-dupe-class-members", "no-dupe-else-if", "no-dupe-keys", "no-duplicate-case",
    "no-empty", "no-empty-character-class", "no-empty-pattern", "no-empty-static-block",
    "no-ex-assign", "no-extra-boolean-cast", "no-fallthrough", "no-func-assign",
    "no-global-assign", "no-import-assign", "no-invalid-regexp", "no-irregular-whitespace",
    "no-loss-of-precision", "no-misleading-character-class", "no-new-native-nonconstructor",
    "no-nonoctal-decimal-escape", "no-obj-calls", "no-octal", "no-prototype-builtins",
    "no-redeclare", "no-regex-spaces", "no-self-assign", "no-setter-return",
    "no-shadow-restricted-names", "no-sparse-arrays", "no-this-before-super",
    "no-unassigned-vars", "no-undef", "no-unexpected-multiline", "no-unreachable",
    "no-unsafe-finally", "no-unsafe-negation", "no-unsafe-optional-chaining",
    "no-unused-labels", "no-unused-private-class-members", "no-unused-vars",
    "no-useless-assignment", "no-useless-backreference", "no-useless-catch",
    "no-useless-escape", "no-with", "preserve-caught-error", "require-yield", "use-isnan",
    "valid-typeof",
]
TS_ADDITIONS = [
    "@typescript-eslint/await-thenable", "@typescript-eslint/ban-ts-comment",
    "@typescript-eslint/no-array-constructor", "@typescript-eslint/no-array-delete",
    "@typescript-eslint/no-base-to-string", "@typescript-eslint/no-duplicate-enum-values",
    "@typescript-eslint/no-duplicate-type-constituents",
    "@typescript-eslint/no-empty-object-type", "@typescript-eslint/no-explicit-any",
    "@typescript-eslint/no-extra-non-null-assertion",
    "@typescript-eslint/no-floating-promises", "@typescript-eslint/no-for-in-array",
    "@typescript-eslint/no-implied-eval", "@typescript-eslint/no-misused-new",
    "@typescript-eslint/no-misused-promises", "@typescript-eslint/no-namespace",
    "@typescript-eslint/no-non-null-asserted-optional-chain",
    "@typescript-eslint/no-redundant-type-constituents",
    "@typescript-eslint/no-require-imports", "@typescript-eslint/no-this-alias",
    "@typescript-eslint/no-unnecessary-type-assertion",
    "@typescript-eslint/no-unnecessary-type-constraint",
    "@typescript-eslint/no-unsafe-argument", "@typescript-eslint/no-unsafe-assignment",
    "@typescript-eslint/no-unsafe-call", "@typescript-eslint/no-unsafe-declaration-merging",
    "@typescript-eslint/no-unsafe-enum-comparison",
    "@typescript-eslint/no-unsafe-function-type",
    "@typescript-eslint/no-unsafe-member-access", "@typescript-eslint/no-unsafe-return",
    "@typescript-eslint/no-unsafe-unary-minus", "@typescript-eslint/no-unused-expressions",
    "@typescript-eslint/no-unused-vars", "@typescript-eslint/no-wrapper-object-types",
    "@typescript-eslint/only-throw-error", "@typescript-eslint/prefer-as-const",
    "@typescript-eslint/prefer-namespace-keyword",
    "@typescript-eslint/prefer-promise-reject-errors", "@typescript-eslint/require-await",
    "@typescript-eslint/restrict-plus-operands",
    "@typescript-eslint/restrict-template-expressions",
    "@typescript-eslint/triple-slash-reference", "@typescript-eslint/unbound-method",
    "no-var", "prefer-const", "prefer-rest-params", "prefer-spread",
]
TS_DISABLED = [
    "constructor-super", "getter-return", "no-array-constructor", "no-class-assign",
    "no-const-assign", "no-dupe-args", "no-dupe-class-members", "no-dupe-keys",
    "no-func-assign", "no-implied-eval", "no-import-assign", "no-new-native-nonconstructor",
    "no-new-symbol", "no-obj-calls", "no-redeclare", "no-setter-return",
    "no-this-before-super", "no-throw-literal", "no-undef", "no-unreachable",
    "no-unsafe-negation", "no-unused-expressions", "no-unused-vars", "no-with",
    "prefer-promise-reject-errors", "require-await",
]


def expected_rules(path):
    """Return adopted active rules with no configured options for this language."""
    names = set(JS_RULES)
    if Path(path).suffix.lower() in TS_SUFFIXES:
        names.difference_update(TS_DISABLED)
        names.update(TS_ADDITIONS)
    return {name: [2] for name in sorted(names)}


def source_files(root):
    """Discover current ownership first, then classify all TS/JS source variants."""
    return [path for path in discover_files(root, PARTS)
            if Path(path).suffix.lower() in JS_SUFFIXES | TS_SUFFIXES]


def _object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise QualityError(f"duplicate JSON key: {key}")
        result[key] = value
    return result


def _rules(value):
    if not isinstance(value, dict):
        raise QualityError("ESLint rules must be an object")
    for name, setting in value.items():
        if (not name or not isinstance(setting, list) or not setting
                or type(setting[0]) is not int or setting[0] not in (0, 1, 2)):
            raise QualityError("invalid effective ESLint rule setting")
    return value


def parse_report(output, paths):
    """Validate the complete bridge schema and coverage before making any verdict."""
    try:
        report = json.loads(output, object_pairs_hook=_object,
                            parse_constant=lambda value: (_ for _ in ()).throw(
                                QualityError(f"invalid JSON constant: {value}")))
    except (ValueError, TypeError) as problem:
        raise QualityError(f"invalid ESLint JSON: {problem}") from problem
    if (not isinstance(report, dict) or type(report.get("schema")) is not int
            or report["schema"] != 1 or not isinstance(report.get("files"), list)):
        raise QualityError("unsupported or incomplete ESLint bridge report")
    seen = set()
    for entry in report["files"]:
        if not isinstance(entry, dict):
            raise QualityError("invalid ESLint file result")
        path = entry.get("path")
        if not isinstance(path, str) or path in seen or path not in paths:
            raise QualityError("duplicate or unexpected ESLint file result")
        seen.add(path)
        if any(type(entry.get(field)) is not bool for field in ("ignored", "processor")):
            raise QualityError("invalid ESLint file coverage flags")
        _rules(entry.get("rules"))
        _rules(entry.get("defaults"))
        inline, disabled = entry.get("inlineRules"), entry.get("disabledRules")
        if not isinstance(inline, list) or not isinstance(disabled, list):
            raise QualityError("incomplete parsed ESLint directives")
        for rules in inline:
            _rules(rules)
        if any(item is not None and (not isinstance(item, list)
               or not all(isinstance(name, str) for name in item)) for item in disabled):
            raise QualityError("invalid parsed ESLint disable directive")
        comments, messages = entry.get("comments"), entry.get("messages")
        if not isinstance(comments, list) or any(not isinstance(item, str) for item in comments):
            raise QualityError("invalid ESLint parsed comments")
        if not isinstance(messages, list):
            raise QualityError("invalid ESLint diagnostics")
        for message in messages:
            if (not isinstance(message, dict) or not isinstance(message.get("message"), str)
                    or type(message.get("severity")) is not int or message["severity"] not in (1, 2)
                    or type(message.get("fatal")) is not bool
                    or not (message.get("ruleId") is None or isinstance(message["ruleId"], str))):
                raise QualityError("invalid ESLint diagnostic")
    if seen != set(paths):
        raise QualityError("ESLint did not inspect every discovered source")
    return report["files"]


def _adopted_defaults(entry, expected):
    defaults = entry["defaults"]
    if set(defaults) != set(expected) or any(value[0] != 2 for value in defaults.values()):
        raise QualityError("isolated ESLint configuration lost adopted rules")
    return defaults


def configuration_ok(entry, expected):
    """Compare effective options to an isolated no-options configuration of the same rules."""
    if entry["ignored"] or entry["processor"]:
        return False
    defaults = _adopted_defaults(entry, expected)
    actual = {name: value for name, value in entry["rules"].items() if value[0] != 0}
    return actual == defaults


def source_ok(entry, expected):
    """Reject blocking diagnostics and parsed rule-changing/suppressing directives."""
    if entry["ignored"] or entry["processor"]:
        return False
    defaults = _adopted_defaults(entry, expected)
    for names in entry["disabledRules"]:
        if names is None or set(names) & expected.keys():
            return False
    for rules in entry["inlineRules"]:
        active = {name: value for name, value in rules.items() if value[0] != 0}
        if active != defaults:
            return False
    for message in entry["messages"]:
        if message["fatal"]:
            raise QualityError("ESLint could not parse source: " + message["message"])
        if message["ruleId"] in expected:
            return False
        raise QualityError("unexpected non-adopted ESLint diagnostic: " + message["message"])
    return True


def check(root, configuration):
    paths = source_files(root)
    node = shutil.which("node")
    if node is None:
        raise QualityError("Node.js is unavailable locally")
    request = {"root": str(root), "configuration": configuration,
               "files": [{"path": path, "rules": expected_rules(path)} for path in paths]}
    environment = {key: value for key, value in os.environ.items()
                   if key.upper() not in {"NODE_OPTIONS", "NODE_PATH", "ESLINT_USE_FLAT_CONFIG"}}
    result = run_tool([node, str(root / "scripts/inspect_eslint.mjs")], cwd=root,
                      env=environment, input=json.dumps(request).encode("utf-8"))
    if result.stderr.strip():
        raise QualityError("ESLint bridge reported a warning: " + result.stderr, result)
    entries = parse_report(result.stdout, paths)
    verdicts = []
    for entry in entries:
        expected = expected_rules(entry["path"])
        okay = configuration_ok(entry, expected) if configuration else source_ok(entry, expected)
        if not okay:
            print(json.dumps({"path": entry["path"], "configuration": configuration,
                              "messages": entry["messages"], "comments": entry["comments"]},
                             ensure_ascii=True), file=sys.stderr)
        verdicts.append(okay)
    return all(verdicts)


def main(argv=None, *, root=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--configuration", action="store_true")
    parser.add_argument("--record", type=Path)
    arguments = parser.parse_args(argv)
    root = Path(root).resolve() if root is not None else Path(__file__).resolve().parents[1]
    name = "eslint-configuration-rules" if arguments.configuration else "eslint-source-rules"
    # invariant: eslint-source-rules/1
    # invariant: eslint-configuration-rules/1
    return run_check(name, name + "/1", lambda: check(root, arguments.configuration),
                     record=arguments.record)


if __name__ == "__main__":
    sys.exit(main())
