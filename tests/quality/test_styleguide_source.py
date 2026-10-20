"""Behavior of map-driven appearance extraction and the D-43 token Method."""

from contextlib import redirect_stderr
import importlib
import io
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))


class SourceChecks(unittest.TestCase):
    def setUp(self):
        self.assertTrue((ROOT / "scripts/styleguide_source.py").is_file(),
                        "source Method has not been implemented")
        self.module = importlib.import_module("styleguide_source")
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        subprocess.run([shutil.which("git"), "init", "-q", str(self.root)], check=True)
        self.write("foundations/part_map.md", "## browser-view\n\n- **Files:** view/**\n"
                   "  src/browser/view/**\n  assets/**\n\n## other\n\n- **Files:** foundations/**\n")

    def write(self, path, text):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text, encoding="utf-8")

    def facts(self):
        return self.module.source_facts(self.root)

    def verdict(self):
        with redirect_stderr(io.StringIO()):
            return self.module.check(self.root, "tokens")

    def test_new_map_owned_path_is_inspected_without_fixed_directory_list(self):
        self.write("view/unloaded/deep.css", "a { color: red; }")
        self.assertIs(self.verdict(), False)
        self.assertEqual([f["path"] for f in self.facts()["files"]], ["view/unloaded/deep.css"])

    def test_missing_tracked_file_is_inability(self):
        self.write("view/gone.css", "a {color:var(--text)}")
        subprocess.run([shutil.which("git"), "add", "view/gone.css"], cwd=self.root, check=True)
        (self.root / "view/gone.css").unlink()
        with self.assertRaises(self.module.QualityError):
            self.verdict()

    def test_css_literals_cover_notations_compounds_and_unitless_values(self):
        cases = ["color: red", "color: CanvasText", "color: HighlightText",
                 r"color: r\65 d", "color: #1234", "color: rgb(1 2 3 / .5)",
                 "color: oklch(50% .2 20)", "color: color(display-p3 1 0 0)",
                 "background:linear-gradient(var(--page),rebeccapurple)",
                 "border: 1px solid var(--divider)", "padding:calc(var(--gap) + 2rem)",
                 "font-family: 'Geist', sans-serif", "font: bold 1em Arial",
                 "font-weight:600", "font-weight:normal", "stroke-width:2",
                 "stroke-dasharray:5 4", "opacity:.3", "fill-opacity:.2",
                 "color:var(--text,blue)", "--another: #abc"]
        for declaration in cases:
            with self.subTest(declaration=declaration):
                self.write("view/s.css", f"a {{{declaration}}}")
                self.assertIs(self.verdict(), False)

    def test_css_exceptions_and_nonappearance_values_are_positive_controls(self):
        self.write("view/s.css", '''/* color:red; padding:2px */
@media (max-width: 720px) { a {
 color:currentColor; background:transparent; fill:none; font:inherit;
 margin:0; padding:0px; gap:2%; height:20rem; min-width:4em; max-height:2px;
 grid-template-columns:minmax(260px,1fr) 2fr; grid-auto-columns:10px;
 width:30vw; height:40vh; line-height:1.4; flex:1; z-index:3;
 border:var(--border); opacity:var(--opacity); font-weight:var(--weight);
 content:"red 12px"; background-image:url("red/12px.svg");
}}
''')
        self.assertIs(self.verdict(), True)

    def test_non_width_media_sizes_are_not_exempt(self):
        self.write("view/s.css", "@media (min-height: 400px) {a{color:inherit}}")
        self.assertIs(self.verdict(), False)

    def test_review_css_names_follow_css_casing_not_dom_camelcase(self):
        for name in ["font-weight", "FONT-WEIGHT", "Font-Weight"]:
            with self.subTest(name=name):
                self.write("view/s.css", f"p {{{name}:600}}")
                self.assertIs(self.verdict(), False)
        for name in ["width", "WIDTH", "Width", "GRID-TEMPLATE-COLUMNS"]:
            with self.subTest(name=name):
                self.write("view/s.css", f"p {{{name}:12px}}")
                self.assertIs(self.verdict(), True)
        self.write("view/s.css", "p {--MixedCase:var(--Value); FONT-WEIGHT:var(--Weight)}")
        self.assertEqual([d["property"] for d in self.facts()["files"][0]["declarations"]],
                         ["--MixedCase", "font-weight"])
        self.write("view/p.ts", "el.style.fontWeight = '600';")
        self.assertIs(self.verdict(), False)

    def test_review_svg_presentation_attributes_are_not_lost(self):
        for name in ["letter-spacing", "word-spacing", "baseline-shift", "kerning"]:
            for value, expected in [("2px", False), ("var(--spacing)", True), ("0", True)]:
                with self.subTest(name=name, value=value):
                    self.write("view/p.html", f'<svg><text {name}="{value}">word</text></svg>')
                    self.assertIs(self.verdict(), expected)
        self.write("view/p.html", '<div letter-spacing="2px" data-color="red">word</div>'
                   '<svg><text x="2px" y="4px" data-spacing="2px">word</text></svg>')
        self.assertIs(self.verdict(), True)
        self.write("view/p.ts", "el.setAttribute('letter-spacing', '2px');")
        self.assertIs(self.verdict(), False)

    def test_review_attribute_casing_respects_receiver_namespace(self):
        for name in ["style", "STYLE", "StYlE"]:
            with self.subTest(name=name):
                self.write("view/p.ts", "const element = document.createElement('div'); "
                           f"const el = element; el.setAttribute('{name}', 'padding: 2px');")
                self.assertIs(self.verdict(), False)
        self.write("view/p.ts", "const el = document.createElement('div'); "
                   "el.setAttribute('STYLE', 'padding: var(--space)');")
        self.assertIs(self.verdict(), True)
        self.write("view/p.ts", "const el = document.createElementNS('http://www.w3.org/2000/svg', 'g'); "
                   "el.setAttribute('STYLE', 'padding: 2px'); el.setAttribute('viewBox', '0 0 2 2');")
        self.assertIs(self.verdict(), True)
        for source in ["el.setAttribute('STYLE', 'padding: 2px');",
                       "function make(document) { const el = document.createElementNS("
                       "'http://www.w3.org/2000/svg', 'g'); el.setAttribute('STYLE', 'padding: 2px'); }",
                       "el.setAttribute(name, value);"]:
            with self.subTest(source=source):
                self.write("view/p.ts", source)
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_review_style_aliases_use_lexical_bindings_and_retain_escapes(self):
        prefix = "const s = el.style; const t = s; "
        self.write("view/p.ts", prefix + "t.padding = '2px';")
        self.assertIs(self.verdict(), False)
        self.write("view/p.ts", prefix + "t.padding = 'var(--space)';")
        self.assertIs(self.verdict(), True)
        self.write("view/p.ts", "el.style = 'padding: var(--space)';")
        self.assertIs(self.verdict(), True)
        self.write("view/p.ts", "const s = el.style; function prose(s) { s.padding = '2px'; } "
                   "function nested({s}) { s.padding = '2px'; } "
                   "{ const s = {}; s.padding = '2px'; }")
        self.assertIs(self.verdict(), True)
        cases = [prefix + "t.padding = value;", "use(el.style.setProperty);",
                 "return el.style;", "target.value = el.style;", "const bag = [el.style];",
                 "const bag = {value: el.style};", "let s = el.style; s.padding = value;",
                 "const s = el.style; const t = s; use(t);",
                 "export const s = el.style;", "const s = el.style; export {s};",
                 "const s = el.style; const bag = {s};",
                 "use(el.setAttribute);"]
        for source in cases:
            with self.subTest(source=source):
                self.write("view/p.ts", source)
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_review_python_fragments_bind_without_becoming_program_files(self):
        self.write("view/p.py", "SCRIPT = '''class Element { constructor() { "
                   "this.style = {setProperty() {}}; } }'''\n")
        facts = self.facts()["files"][0]
        self.assertTrue(facts["unresolved"])
        self.assertEqual(facts["unresolved"][0]["path"], "view/p.py")

    def test_review_namespaced_attributes_are_not_inline_style(self):
        prefix = "const el = document.createElementNS('http://www.w3.org/2000/svg', 'g'); "
        for namespace in ["null", "''"]:
            with self.subTest(namespace=namespace):
                self.write("view/p.ts", prefix +
                           f"el.setAttributeNS({namespace}, 'style', 'padding: 2px');")
                self.assertIs(self.verdict(), False)
        self.write("view/p.ts", prefix + "el.setAttributeNS('urn:metadata', 'style', 'padding: 2px');")
        self.assertIs(self.verdict(), True)
        self.write("view/p.ts", prefix + "el.setAttributeNS(namespace, 'style', 'padding: 2px');")
        with self.assertRaises(self.module.QualityError):
            self.verdict()

    def test_supports_function_value_never_escapes_inspection(self):
        self.write("view/s.css", "@supports (color: rgb(1 2 3)) {a{color:inherit}}")
        with self.assertRaises(self.module.QualityError):
            self.verdict()

    def test_html_css_and_attributes_keep_original_lines(self):
        self.write("view/p.html", '<!doctype html>\n<div style="padding: 2px">\n'
                   '<svg><path fill="red" /></svg>\n<style>\na{color:blue}\n</style></div>')
        facts = self.facts()["files"][0]
        self.assertEqual({v["line"] for v in facts["violations"]}, {2, 3, 5})
        self.assertGreaterEqual(len(facts["sites"]), 4)
        self.assertIs(self.verdict(), False)

    def test_html_text_paths_image_geometry_are_not_styles(self):
        self.write("view/p.html", '<p>red 12px</p><img src="red/12px.svg" width="32" height="16">'
                   '<svg viewBox="0 0 512 512"><path d="M0 0h12" fill="currentColor"/></svg>')
        self.assertIs(self.verdict(), True)

    def test_svg_html_integration_points_preserve_attribute_semantics(self):
        for point in ["foreignObject", "desc", "title"]:
            cases = [
                ('<div letter-spacing="2px">word</div>', True),
                ('<div><span letter-spacing="2px">word</span></div>', True),
                ('<text letter-spacing="2px">ordinary HTML element</text>', True),
                ('<div style="letter-spacing: 2px">word</div>', False),
                ('<div style="letter-spacing: var(--spacing)">word</div>', True),
                ('<svg><text letter-spacing="2px">word</text></svg>', False),
                ('<svg><text letter-spacing="var(--spacing)">word</text></svg>', True),
                ('<svg><foreignObject><div letter-spacing="2px">word</div>'
                 '</foreignObject></svg><div letter-spacing="2px">sibling</div>', True),
            ]
            for content, expected in cases:
                with self.subTest(point=point, content=content):
                    self.write("view/p.html", f"<svg><{point}>{content}</{point}></svg>")
                    self.assertIs(self.verdict(), expected)
        self.write("view/p.html", '<svg><foreignObject><title>'
                   '<span style="padding: 2px">title text</span></title></foreignObject></svg>')
        self.assertIs(self.verdict(), True)
        self.write("view/p.html", '<svg><foreignObject letter-spacing="2px">'
                   '<div letter-spacing="2px">word</div></foreignObject></svg>')
        facts = self.facts()["files"][0]
        self.assertEqual([d["selector"] for d in facts["declarations"]], ["foreignObject"])
        self.assertIs(self.verdict(), False)

    def test_unsupported_integration_point_trees_are_explicitly_unresolved(self):
        cases = ['<svg><foreignObject><math><mtext>word</mtext></math></foreignObject></svg>',
                 '<svg><title><title>nested HTML title</title></title></svg>']
        for source in cases:
            with self.subTest(source=source):
                self.write("view/p.html", source)
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_typescript_appearance_sinks_literals_and_templates(self):
        cases = ["el.style.color = 'red';", "el.style['padding'] = '2px';",
                 "el.style.setProperty('opacity', '.3');",
                 "el.setAttribute('fill', '#abc');",
                 "el.setAttribute('style', 'font-weight: 600');",
                 "el.style.cssText = 'margin: 2rem';",
                 "el.innerHTML = `<span style=\"color:red\">x</span>`;",
                 "sheet.insertRule('a {color:red}');",
                 "Object.assign(el.style, {border: '2px solid var(--focus)'});",
                 "const color = 'CanvasText';", "const tint = '#123abc';",
                 "const textColor = '#123abc';", "const cssText = 'a{color:red}';",
                 "el.style.color = enabled ? 'red' : 'var(--text)';"]
        for source in cases:
            with self.subTest(source=source):
                self.write("view/p.ts", source)
                self.assertIs(self.verdict(), False)

    def test_typescript_prose_paths_geometry_and_known_template_are_valid(self):
        self.write("view/p.ts", '''// red #123 12px
const path = 'red/12px.svg'; const radius = 16; const margin = 4;
el.textContent = 'red'; const label = 'red';
el.setAttribute('width', String(radius * 2 + margin));
el.setAttribute('viewBox', `${-margin} 0 ${radius} 20`);
const token = 'var(--text)'; el.style.color = `${token}`;
el.style.opacity = '0'; el.style.width = '12px';
''')
        self.assertIs(self.verdict(), True)

    def test_style_element_text_is_css_but_string_replace_is_not(self):
        self.write("view/p.ts", "const label = input.replace('red', 'blue');")
        self.assertIs(self.verdict(), True)
        self.write("view/p.ts", "const style = document.createElement('style');\n"
                   "style.textContent = 'a {color:red}';")
        self.assertIs(self.verdict(), False)
        self.write("view/p.ts", "const style = document.createElement('style');\n"
                   "style.textContent = css;")
        with self.assertRaises(self.module.QualityError):
            self.verdict()

    def test_unassigned_dynamic_css_template_cannot_disappear(self):
        self.write("view/p.ts", "const text = `a { color: ${theme.value} }`;")
        with self.assertRaises(self.module.QualityError):
            self.verdict()

    def test_embedded_python_javascript_retains_literal_source_location(self):
        self.write("view/p.py", "SCRIPT = '''\nexport function make() {\n"
                   "const node = document.createElement('div');\n"
                   "node.style.color = 'red';\nreturn node;\n}\n'''\n")
        self.assertIs(self.verdict(), False)
        self.assertEqual(self.facts()["files"][0]["violations"][0]["line"], 4)

    def test_unknown_interpolation_and_style_helpers_never_pass(self):
        cases = ["el.style.color = `${theme.color}`;", "el.style.cssText = makeStyle();",
                 "el.style[property] = value;", "el.setAttribute(attribute, value);",
                 "applyStyle(el, {color: theme.color});", "el.innerHTML = content;",
                 "sheet.replaceSync(css);", "const s = css`a{color:${unknown}}`;",
                 "Object.assign(el.style, unknown);", "const s = el.style; s.color = value;",
                 "applyTheme(el.style, theme);", "el.style.unknownMutation(theme);",
                 "Reflect.set(el.style, 'color', theme.color);"]
        for source in cases:
            with self.subTest(source=source):
                self.write("view/p.ts", source)
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_escaping_style_mutator_is_not_silently_ignored(self):
        for source in ["const {setProperty} = el.style; setProperty('color', theme);",
                       "const set = el.setAttribute; set('fill', theme);"]:
            with self.subTest(source=source):
                self.write("view/p.ts", source)
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_generic_svg_attribute_helper_is_inspected_at_calls(self):
        helper = '''function svgElement(name, attributes) {
 const element = document.createElementNS('http://www.w3.org/2000/svg', name);
 for (const [key, value] of Object.entries(attributes))
   element.setAttribute(key, String(value));
 return element;
}
'''
        self.write("view/p.ts", helper + "svgElement('image', {width: icon.size, height: icon.size, href: icon.href});")
        self.assertIs(self.verdict(), True)
        self.write("view/p.ts", helper + "svgElement('path', {fill: 'red', 'stroke-width': 2});")
        self.assertIs(self.verdict(), False)
        self.write("view/p.ts", helper + "svgElement('path', attributes);")
        with self.assertRaises(self.module.QualityError):
            self.verdict()
        self.write("view/p.ts", "export " + helper)
        with self.assertRaises(self.module.QualityError):
            self.verdict()

    def test_python_embedded_html_is_inspected_without_fixture_exception(self):
        self.write("view/probe.py", '"""red 12px"""\nSVG = \'<path fill="#2b2b2b"/>\'\n')
        self.assertIs(self.verdict(), False)
        self.assertEqual(self.facts()["files"][0]["violations"][0]["line"], 2)

    def test_explicit_asset_and_document_classifications_retain_inventory(self):
        self.write("assets/icons/a.svg", '<path fill="#abc"/>')
        self.write("assets/fonts/Geist.woff2", "wOF2font-bytes")
        self.write("assets/fonts/SOURCE.md", "The font has red 12px examples.")
        self.write("src/browser/view/design-tokens.json", '{"roles":{},"tokens":{}}')
        self.assertIs(self.verdict(), True)
        self.assertEqual({f["kind"] for f in self.facts()["files"]},
                         {"icon-exception", "font", "documentation", "token-values"})

    def test_unknown_source_or_parse_failure_is_not_a_success(self):
        cases = [("view/unknown.foo", "anything"), ("view/s.css", "a { color:"),
                 ("view/p.ts", "const = ;"), ("view/p.py", "def :"),
                 ("view/s.css", "a { color: mystery(42); }")]
        for path, source in cases:
            with self.subTest(path=path, source=source):
                self.write(path, source)
                with self.assertRaises(self.module.QualityError):
                    self.verdict()
                (self.root / path).unlink()

    def test_missing_later_inspectors_are_explicit_inability(self):
        self.write("view/s.css", "a { color:var(--text); }")
        with self.assertRaises(self.module.QualityError):
            self.module.check(self.root, "focus")
        with self.assertRaises(self.module.QualityError):
            self.module.contrast_pairs(self.root)

    def test_truncated_inventory_and_malformed_parser_output_are_rejected(self):
        self.write("view/s.css", "a {color:var(--text)}")
        valid = self.facts()
        bad = ["{", "null", json.dumps({**valid, "files": []}),
               json.dumps({**valid, "files": [{"path": "view/s.css", "complete": True}]}),
               json.dumps({**valid, "schema": 99}), json.dumps({**valid, "schema": True})]
        for output in bad:
            with self.subTest(output=output):
                result = subprocess.CompletedProcess([], 0, output, "")
                with patch.object(self.module, "run_tool", return_value=result):
                    with self.assertRaises(self.module.QualityError):
                        self.verdict()

    def test_source_protocol_distinguishes_unknown_and_empty_values(self):
        self.write("view/p.ts", "el.style.color = '';\nel.style.opacity = value;")
        facts = self.facts()["files"][0]
        self.assertEqual([(item["value"], item["line"]) for item in facts["declarations"]],
                         [("", 1), (None, 2)])
        self.assertEqual(len(facts["unresolved"]), 1)

    def test_priority_is_retained_for_css_and_embedded_declaration_lists(self):
        cases = [
            ("view/p.css", "\nbutton{color:var(--text)!important}", 2),
            ("view/p.css", "\nbutton{color:var(--text) ! /*priority*/ IMPORTANT}", 2),
            ("view/p.html", '<style>\nbutton{color:var(--text)!important}</style>', 2),
            ("view/p.html", '<div>\n<button style="color:var(--text)!important">x</button></div>', 2),
            ("view/p.ts", "sheet.insertRule('button{color:var(--text)!important}');", 1),
            ("view/p.ts", "el.style.cssText = 'color:var(--text)!important';", 1),
            ("view/p.ts", "el.setAttribute('style', 'color:var(--text)!important');", 1),
            ("view/p.py", "CSS = '''\nbutton{color:var(--text)!important}'''", 2),
        ]
        for path, source, line in cases:
            with self.subTest(path=path, source=source):
                self.write(path, source)
                report = self.facts()
                self.assertEqual(report["schema"], 2)
                declaration = report["files"][0]["declarations"][0]
                self.assertEqual((declaration["value"], declaration["priority"], declaration["line"]),
                                 ("var(--text)", "important", line))
                self.assertIs(self.verdict(), True)
                (self.root / path).unlink()
        self.write("view/p.css", 'button{color:var(--text);content:"!important"}')
        self.assertEqual([d["priority"] for d in self.facts()["files"][0]["declarations"]],
                         ["normal", "normal"])
        self.write("view/p.css", "button{color:red!important}")
        self.assertIs(self.verdict(), False)

    def test_priority_from_dom_set_property_is_separate_from_value(self):
        for suffix, expected in [("", "normal"), (", ''", "normal"),
                                 (", 'important'", "important"), (", 'IMPORTANT'", "important")]:
            with self.subTest(suffix=suffix):
                self.write("view/p.ts", f"el.style.setProperty('color', 'var(--text)'{suffix});")
                declaration = self.facts()["files"][0]["declarations"][0]
                self.assertEqual((declaration["value"], declaration["priority"]),
                                 ("var(--text)", expected))
                self.assertIs(self.verdict(), True)
        self.write("view/p.ts", "const priority = 'important';\n"
                   "el.style.setProperty('color', 'red', priority);")
        declaration = self.facts()["files"][0]["declarations"][0]
        self.assertEqual((declaration["priority"], declaration["line"]), ("important", 2))
        self.assertIs(self.verdict(), False)
        self.write("view/p.ts", "el.style.setProperty('color', value, 'important');")
        declaration = self.facts()["files"][0]["declarations"][0]
        self.assertEqual((declaration["value"], declaration["priority"]), (None, "important"))

    def test_priority_unknown_or_embedded_in_dom_value_cannot_pass(self):
        for source in ["el.style.setProperty('color', 'var(--text)', priority);",
                       "el.style.setProperty('color', 'var(--text)', flag ? '' : 'important');",
                       "el.style.setProperty('color', 'var(--text)', 'urgent');",
                       "el.style.color = 'var(--text)!important';",
                       r"el.style.cssText = 'color:var(--text)!\\69mportant';"]:
            with self.subTest(source=source):
                self.write("view/p.ts", source)
                declaration = self.facts()["files"][0]["declarations"][0]
                self.assertIsNone(declaration["priority"])
                with self.assertRaises(self.module.QualityError):
                    self.verdict()
        self.write("view/p.ts", "const token = 'var(--text)';\n"
                   "el.style.setProperty('color', token, priority);")
        facts = self.facts()["files"][0]
        self.assertEqual(facts["declarations"][0]["line"], 2)
        self.assertEqual(facts["unresolved"][0]["line"], 2)

    def test_priority_protocol_requires_exact_field_value_and_located_inability(self):
        self.write("view/p.css", "button{color:var(--text)}\n")
        valid = self.facts()
        for priority in ["urgent", True, 1, [], None]:
            with self.subTest(priority=priority):
                bad = json.loads(json.dumps(valid))
                bad["files"][0]["declarations"][0]["priority"] = priority
                bad["files"][0]["unresolved"] = [{"path": "view/p.css", "line": 2,
                                                   "reason": "unrelated inability"}]
                result = subprocess.CompletedProcess([], 0, json.dumps(bad), "")
                with patch.object(self.module, "run_tool", return_value=result):
                    with self.assertRaises(self.module.QualityError):
                        self.facts()
        for old_schema in [False, True]:
            bad = json.loads(json.dumps(valid))
            bad["files"][0]["declarations"][0].pop("priority", None)
            if old_schema:
                bad["schema"] = 1
            result = subprocess.CompletedProcess([], 0, json.dumps(bad), "")
            with patch.object(self.module, "run_tool", return_value=result):
                with self.assertRaises(self.module.QualityError):
                    self.facts()

    def test_out_of_inventory_or_out_of_range_evidence_is_rejected(self):
        self.write("view/s.css", "a {color:red}")
        valid = self.facts()
        for field, value in [("path", "../outside.css"), ("line", 2), ("line", True)]:
            with self.subTest(field=field, value=value):
                bad = json.loads(json.dumps(valid))
                bad["files"][0]["violations"][0][field] = value
                result = subprocess.CompletedProcess([], 0, json.dumps(bad), "")
                with patch.object(self.module, "run_tool", return_value=result):
                    with self.assertRaises(self.module.QualityError):
                        self.verdict()

    def test_adjacency_bridge_requires_actual_role_names_and_exact_pair_evidence(self):
        self.write("view/s.css", "a {color:var(--text)}")
        self.write("src/browser/view/design-tokens.json", '{"roles":{"text":{},"page":{}},"tokens":{}}')
        pairs = [[], [{"roles": ["text", "page"], "path": "view/s.css", "line": 1}],
                 [{"roles": ["text", "invented"], "path": "view/s.css", "line": 1}]]
        for index, pair in enumerate(pairs):
            report = {"schema": 1, "operation": "adjacency", "inventory":
                      ["src/browser/view/design-tokens.json", "view/s.css"],
                      "unresolved": [], "findings": [], "result": pair}
            result = subprocess.CompletedProcess([], 0, json.dumps(report), "")
            with patch.object(self.module, "run_tool", return_value=result):
                if index == 2:
                    with self.assertRaises(self.module.QualityError):
                        self.module.contrast_pairs(self.root)
                else:
                    self.assertEqual(self.module.contrast_pairs(self.root), pair)


if __name__ == "__main__":
    unittest.main()
