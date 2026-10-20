"""Adversarial prepared inputs for provenance and historical role preservation."""

from contextlib import redirect_stderr
import copy
import io
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
try:
    import styleguide_values as values
except ImportError:
    values = None
try:
    import check_styleguide as dispatcher
except ImportError:
    dispatcher = None


def document():
    """Hand-selected readable values; not a product palette or expected-value oracle."""
    kinds = {
        "page": "background", "panel": "background", "highlight": "background",
        "positive": "text", "warning": "text", "danger": "text", "discovery": "text",
        "player-change": "text", "text-strong": "text", "text": "text",
        "text-secondary": "text", "text-label": "text", "text-disabled": "text",
        "divider": "other", "control-border": "other", "selected": "other",
        "character": "other", "tile-hidden": "other", "tile-revealed": "other",
        "tile-edge": "other", "link-highlight": "other", "depleted": "other",
        "focus": "other",
    }
    result = {"roles": {name: {"kind": kind, "value": "#ffffff", "source": "fixture"}
                        for name, kind in kinds.items()}, "tokens": {}}
    for name in ("page", "panel", "highlight", "tile-hidden", "tile-edge", "text-disabled"):
        result["roles"][name]["value"] = "#000000"
    result["roles"]["tile-revealed"]["value"] = "#777777"
    result["roles"]["depleted"]["value"] = 0.1
    return result


class ValueTests(unittest.TestCase):
    def setUp(self):
        self.assertIsNotNone(values, "styleguide value checks are not implemented")
        self.temporary = tempfile.TemporaryDirectory(prefix="styleguide-values-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.data = document()
        self.save()

    def save(self):
        path = self.root / "src/browser/view/design-tokens.json"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(self.data), encoding="utf-8")
        return path

    def run_value(self, selector, **options):
        with redirect_stderr(io.StringIO()):
            return values.check(self.root, selector, **options)

    def git(self, *arguments):
        return subprocess.run(["git", *arguments], cwd=self.root, check=True,
                              capture_output=True).stdout.decode("utf-8").strip()

    def commit(self):
        self.git("add", "src/browser/view/design-tokens.json")
        self.git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
                 "commit", "--quiet", "-m", "Fixture")
        return self.git("rev-parse", "HEAD")

    def earlier(self, data=None):
        path = self.root / "earlier.json"
        path.write_text(json.dumps(self.data if data is None else data), encoding="utf-8")
        return path

    def test_source_records_cover_nested_compounds_and_arrays(self):
        self.data["tokens"] = {
            "font": {"value": {"family": "Geist", "weight": 500}, "source": "fixture"},
            "dash": {"value": [3, 2], "source": "fixture"},
        }
        self.save()
        self.assertTrue(self.run_value("sources"))

    def test_every_record_needs_a_nonempty_source(self):
        for source in (None, "", "  ", 42):
            with self.subTest(source=source):
                self.data["roles"]["page"]["source"] = source
                self.save()
                self.assertFalse(self.run_value("sources"))
        del self.data["roles"]["page"]["source"]
        self.save()
        self.assertFalse(self.run_value("sources"))

    def test_nested_record_cannot_hide_an_unsourced_value(self):
        self.data["tokens"]["nested"] = {
            "value": {"a": {"value": 4}}, "source": "outer"}
        self.save()
        self.assertFalse(self.run_value("sources"))

    def test_unknown_value_bearing_fields_never_silently_disappear(self):
        for mutate in (
                lambda data: data.update(extra={"value": 8}),
                lambda data: data["tokens"].update(raw=4),
                lambda data: data["roles"]["page"].update(extra=5)):
            with self.subTest(mutate=mutate):
                self.data = document()
                mutate(self.data)
                self.save()
                with self.assertRaises(values.QualityError):
                    self.run_value("sources")

    def test_duplicate_keys_and_invalid_numbers_are_inability(self):
        for text in ('{"roles":{},"roles":{},"tokens":{}}',
                     '{"roles":{},"tokens":{"x":{"value":NaN,"source":"s"}}}'):
            self.save().write_text(text, encoding="utf-8")
            with self.assertRaises(values.QualityError):
                self.run_value("sources")

    def test_preserved_roles_allow_value_and_source_changes(self):
        earlier = self.earlier()
        self.data["roles"]["page"]["value"] = "#123456"
        self.data["roles"]["page"]["source"] = "new source"
        self.save()
        self.assertTrue(self.run_value("roles", historical_input=earlier))

    def test_valid_kind_change_reaches_preservation_violation(self):
        earlier = self.earlier()
        self.data["roles"]["page"]["kind"] = "other"
        self.save()
        self.assertFalse(self.run_value("roles", historical_input=earlier))

    def test_valid_role_rename_reaches_preservation_violation(self):
        earlier = self.earlier()
        self.data["roles"]["renamed-page"] = self.data["roles"].pop("page")
        self.save()
        self.assertFalse(self.run_value("roles", historical_input=earlier))

    def test_additional_historical_roles_are_protected_too(self):
        old = copy.deepcopy(self.data)
        old["roles"]["retired"] = {"kind": "text", "value": "#fff", "source": "old"}
        self.assertFalse(self.run_value("roles", historical_input=self.earlier(old)))

    def test_invalid_prepared_input_is_inability(self):
        for old in ({}, {"roles": [], "tokens": {}},
                    {"roles": {"page": {"kind": "unknown", "value": "#fff"}}, "tokens": {}}):
            with self.subTest(old=old):
                with self.assertRaises(values.QualityError):
                    self.run_value("roles", historical_input=self.earlier(old))

    def test_real_git_history_and_prepared_inputs_use_same_comparison(self):
        self.git("init", "--quiet")
        base = self.commit()
        self.data["roles"]["page"]["kind"] = "other"
        self.save()
        self.assertFalse(self.run_value("roles", fork_point=base))

    def test_successfully_read_empty_tree_is_empty_history(self):
        self.git("init", "--quiet")
        self.git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
                 "commit", "--quiet", "--allow-empty", "-m", "Empty")
        base = self.git("rev-parse", "HEAD")
        self.assertTrue(self.run_value("roles", fork_point=base))

    def test_git_error_never_becomes_empty_history(self):
        for revision in ("none", "not-a-commit", "0" * 40):
            with self.subTest(revision=revision):
                with self.assertRaises(values.QualityError):
                    self.run_value("roles", fork_point=revision)

    def test_historical_interfaces_are_exclusive_and_required(self):
        for options in ({}, {"fork_point": "0" * 40, "historical_input": self.earlier()}):
            with self.subTest(options=options):
                with self.assertRaises(values.QualityError):
                    self.run_value("roles", **options)

    def additional(self, first="focus", second="selected"):
        path = self.root / "src/browser/view/styles.css"
        path.write_text(".example { outline: var(--focus); }\n", encoding="utf-8")
        return [{"roles": [first, second], "path": "src/browser/view/styles.css", "line": 1}]

    def contrast(self, pairs=None):
        self.assertTrue(callable(getattr(values, "contrast", None)), "contrast is not implemented")
        captured = io.StringIO()
        with redirect_stderr(captured):
            verdict = values.contrast(self.data, [] if pairs is None else pairs, self.root)
        return verdict, [json.loads(line) for line in captured.getvalue().splitlines()]

    def test_full_required_pair_families_are_evaluated(self):
        verdict, events = self.contrast()
        self.assertTrue(verdict)
        measured = {tuple(event["roles"]) for event in events if event["event"] == "contrast"}
        text = ("positive", "warning", "danger", "discovery", "player-change",
                "text-strong", "text", "text-secondary", "text-label")
        expected = {(name, background) for name in text
                    for background in ("page", "panel", "highlight")}
        expected.update({("control-border", "page"), ("control-border", "panel"),
                         ("control-border", "highlight"), ("focus", "page"),
                         ("focus", "panel"), ("focus", "highlight"),
                         ("character", "tile-hidden"), ("character", "tile-revealed"),
                         ("character", "tile-edge"), ("tile-revealed", "tile-hidden")})
        self.assertEqual(measured, expected)

    def test_contrast_thresholds_are_not_rounded_up(self):
        for name, below, above in (("text-secondary", "#747474", "#757575"),
                                   ("focus", "#595959", "#5a5a5a")):
            with self.subTest(name=name):
                self.data = document()
                self.data["roles"][name]["value"] = below
                self.assertFalse(self.contrast()[0])
                self.data["roles"][name]["value"] = above
                self.assertTrue(self.contrast()[0])

    def test_additional_touching_pair_can_fail_while_baseline_passes(self):
        self.assertTrue(self.contrast()[0])
        verdict, events = self.contrast(self.additional())
        self.assertFalse(verdict)
        failed = [event for event in events if event.get("passed") is False]
        self.assertEqual([(event["roles"], event["ratio"], event["threshold"]) for event in failed],
                         [(["focus", "selected"], 1.0, 3.0)])

    def test_disabled_text_and_depleted_icons_have_no_threshold(self):
        pairs = self.additional("text-disabled", "page")
        pairs += self.additional("depleted", "page")
        verdict, events = self.contrast(pairs)
        self.assertTrue(verdict)
        self.assertEqual({tuple(event["roles"]) for event in events
                          if event["event"] == "contrast-exempt"},
                         {("text-disabled", "page"), ("depleted", "page")})

    def test_unknown_or_incomplete_adjacency_is_inability(self):
        for change in ({"roles": ["focus", "unknown"]}, {"line": 0}, {"line": True},
                       {"path": "../outside.css"}, {"path": "missing.css"},
                       {"roles": ["focus"]}, {"extra": "unexpected"}, {"path": ""}):
            with self.subTest(change=change):
                pairs = self.additional()
                pairs[0].update(change)
                with self.assertRaises(values.QualityError):
                    self.contrast(pairs)
        with self.assertRaises(values.QualityError):
            self.contrast({"pairs": []})

    def test_exact_product_schema_is_separate_from_role_preservation(self):
        self.data["roles"]["page"]["kind"] = "other"
        with self.assertRaises(values.QualityError):
            self.contrast()
        self.data = document()
        del self.data["roles"]["focus"]
        with self.assertRaises(values.QualityError):
            self.contrast()

    def test_unsupported_colors_never_yield_partial_success(self):
        for color in ("var(--other)", "#12345", "rgba(0,0,0,.5)", "garbage"):
            with self.subTest(color=color):
                self.data = document()
                self.data["roles"]["page"]["value"] = color
                with self.assertRaises(values.QualityError):
                    self.contrast()

    def test_actual_contrast_requires_independent_source_discovery(self):
        self.assertTrue(callable(getattr(values, "contrast", None)), "contrast is not implemented")
        with patch.dict(sys.modules, {"styleguide_source": None}):
            with self.assertRaises(values.QualityError):
                self.run_value("contrast")
        with patch.dict(sys.modules, {"styleguide_source": SimpleNamespace(
                contrast_pairs=lambda root: self.additional())}):
            self.assertFalse(self.run_value("contrast"))

    def test_invalid_later_adjacency_cannot_be_hidden_by_an_earlier_failure(self):
        pairs = self.additional()
        pairs.append({"roles": ["unknown", "page"], "path": "missing.css", "line": 1})
        with self.assertRaises(values.QualityError):
            self.contrast(pairs)


class DispatcherTests(unittest.TestCase):
    def setUp(self):
        self.assertIsNotNone(dispatcher, "styleguide dispatcher is not implemented")
        self.temporary = tempfile.TemporaryDirectory(prefix="styleguide-dispatch-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        path = self.root / "src/browser/view/design-tokens.json"
        path.parent.mkdir(parents=True)
        path.write_text(json.dumps(document()), encoding="utf-8")

    def recorded(self, selector, *options):
        path = self.root / "record.jsonl"
        with redirect_stderr(io.StringIO()):
            code = dispatcher.main(["--check", selector, "--record", str(path), *options],
                                   root=self.root)
        return code, json.loads(path.read_text(encoding="utf-8"))

    def test_recorded_pass_violation_and_inability_are_distinct(self):
        code, record = self.recorded("sources")
        self.assertEqual((code, record["verdict"], record["invariant"]),
                         (0, "pass", "design-token-sources/1"))
        path = self.root / "src/browser/view/design-tokens.json"
        data = document()
        del data["roles"]["page"]["source"]
        path.write_text(json.dumps(data), encoding="utf-8")
        code, record = self.recorded("sources")
        self.assertEqual((code, record["verdict"], record["invariant"]),
                         (1, "fail", "design-token-sources/1"))
        path.write_text("malformed", encoding="utf-8")
        code, record = self.recorded("sources")
        self.assertEqual((code, record["verdict"], record["invariant"]), (2, "fail", None))

    def test_all_planned_selectors_fail_explicitly_when_modules_are_unavailable(self):
        for selector in ("tokens", "focus", "states", "production", "fonts"):
            with self.subTest(selector=selector):
                with patch.dict(sys.modules, {"styleguide_source": None, "styleguide_runtime": None}):
                    code, record = self.recorded(selector)
                self.assertEqual((code, record["verdict"], record["invariant"]), (2, "fail", None))
                self.assertIn("unavailable", record["description"])

    def test_prepared_role_violation_is_recorded_for_preservation(self):
        earlier = self.root / "earlier.json"
        earlier.write_text(json.dumps(document()), encoding="utf-8")
        later = document()
        later["roles"]["page"]["kind"] = "other"
        (self.root / "src/browser/view/design-tokens.json").write_text(
            json.dumps(later), encoding="utf-8")
        code, record = self.recorded("roles", "--historical-input", str(earlier))
        self.assertEqual((code, record["verdict"], record["invariant"]),
                         (1, "fail", "design-role-preservation/1"))

    def test_historical_arguments_cannot_change_another_method(self):
        code, record = self.recorded("sources", "--fork-point", "0" * 40)
        self.assertEqual((code, record["invariant"]), (2, None))
        code, record = self.recorded("roles")
        self.assertEqual((code, record["invariant"]), (2, None))

    def test_parser_rejects_conflicting_history_interfaces(self):
        with redirect_stderr(io.StringIO()), self.assertRaises(SystemExit) as caught:
            dispatcher.main(["--check", "roles", "--fork-point", "0" * 40,
                             "--historical-input", "earlier.json"], root=self.root)
        self.assertEqual(caught.exception.code, 2)


if __name__ == "__main__":
    unittest.main()
