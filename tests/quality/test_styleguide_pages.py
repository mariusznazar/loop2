"""Page-scoped loading and cascade evidence through the real source extractor."""

import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]


class PageChecks(unittest.TestCase):
    def setUp(self):
        self.assertTrue((ROOT / "scripts/styleguide_pages.mjs").is_file(),
                        "page analysis has not been implemented")
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)

    def inspect(self, sources, queries=()):
        files = [{"path": path, "source": source,
                  "digest": hashlib.sha256(source.encode("utf-8")).hexdigest(), "fragments": [],
                  "kind": {".html": "html", ".css": "css", ".ts": "typescript"}.get(
                      Path(path).suffix, "token-values")}
                 for path, source in sources.items()]
        for name, source in sources.items():
            target = self.root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(source.encode("utf-8"))
        driver = r"""
import {readFileSync} from 'node:fs';
import {inspectSources, inspectImports} from './scripts/styleguide_source.mjs';
import path from 'node:path';
import {analyzePages, effectiveStyle} from './scripts/styleguide_pages.mjs';
const request = JSON.parse(readFileSync(0, 'utf8'));
const input = {schema:2, root:request.root, operation:'sources', files:request.files,
  dependencies:[], configurations:[], imports:[], unresolved:[]};
for (const file of inspectImports({files:input.files.filter(f=>f.kind==='typescript')}).files) {
  for (const edge of file.imports) {
    const candidate = typeof edge.specifier === 'string' ?
      path.posix.normalize(path.posix.join(path.posix.dirname(edge.path), edge.specifier)) : '';
    const target = input.files.find(f=>[candidate.replace(/\.js$/, '.ts'), candidate].includes(f.path));
    input.imports.push({...edge, resolution:target?'local':'unresolved',
      target:target?.path??null, reason:target?null:'unresolved fixture import'});
  }
}
const facts = inspectSources(input);
function freeze(value) {
  if (value && typeof value === 'object') {
    Object.freeze(value); Object.values(value).forEach(freeze);
  }
  return value;
}
const result = analyzePages(freeze(facts), {root:request.root});
const answers = request.queries.map(q => {
  const page = result.pages.find(p => p.path === q.page);
  const element = page.elements.find(e => e.attributes.id === q.id);
  if (!element) throw new Error('Missing requested element: ' + q.id);
  return effectiveStyle(page, element.id, q.property, q.options ?? {});
});
process.stdout.write(JSON.stringify({result, answers}));
"""
        process = subprocess.run([shutil.which("node"), "--input-type=module", "-e", driver],
                                 cwd=ROOT, input=json.dumps({"files": files, "queries": queries,
                                                            "root": str(self.root)}),
                                 text=True, capture_output=True, encoding="utf-8", check=False)
        self.assertEqual(process.returncode, 0, process.stderr)
        self.assertEqual(process.stderr, "")
        return json.loads(process.stdout)

    @staticmethod
    def query(page="view/a.html", property="color", **options):
        return {"page": page, "id": "target", "property": property, "options": options}

    def test_styles_are_loaded_per_page_and_unreferenced_copy_cannot_help(self):
        sources = {"view/a.html": '<link rel="stylesheet" href="theme.css"><button id="target">A</button>',
                   "view/b.html": '<button id="target">B</button>',
                   "view/theme.css": 'button {color:var(--focus)} :root {--focus:green}',
                   "view/unused.css": 'button {color:var(--focus)} :root {--focus:green}'}
        report = self.inspect(sources, [self.query(), self.query("view/b.html")])
        self.assertEqual([a["status"] for a in report["answers"]], ["resolved", "missing"])
        self.assertEqual(report["answers"][0]["value"], "green")
        self.assertEqual(report["answers"][0]["references"], ["--focus"])
        self.assertNotIn("view/unused.css", [s["path"] for s in report["result"]["pages"][0]["loaded"]])
        sources["view/a.html"] = '<button id="target">A</button>'
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "missing")

    def test_import_embedded_and_inline_order_specificity_and_priority(self):
        sources = {"view/a.html": '<link rel="stylesheet" href="theme.css">\n'
                   '<style>button {color:green} #target {color:blue}</style>\n'
                   '<button id="target" style="color:orange">A</button>',
                   "view/theme.css": '@import "base.css"; button {color:purple}',
                   "view/base.css": '#target {color:red !important}'}
        answer = self.inspect(sources, [self.query()])["answers"][0]
        self.assertEqual(answer["value"], "red")
        self.assertEqual(answer["evidence"][0]["path"], "view/base.css")
        sources["view/base.css"] = '#target {color:red}'
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["value"], "orange")

    def test_alias_override_cycle_and_fallback_keep_original_evidence(self):
        sources = {"view/a.html": '<style>\n:root {--focus:green; --ring:var(--focus)}\n'
                   'button {outline-color:var(--ring)}\n</style>\n<button id="target">A</button>'}
        answer = self.inspect(sources, [self.query(property="outline-color")])["answers"][0]
        self.assertEqual(answer["value"], "green")
        self.assertEqual(answer["references"], ["--ring", "--focus"])
        self.assertEqual({e["line"] for e in answer["evidence"]}, {2, 3})
        sources["view/a.html"] = sources["view/a.html"].replace(
            '<button id="target">', '<button id="target" style="--focus:blue">')
        # Custom properties are resolved at the element where they are defined.
        self.assertEqual(self.inspect(sources, [self.query(property="outline-color")])[
            "answers"][0]["value"], "green")
        sources["view/a.html"] = '<style>:root {--a:var(--b);--b:var(--a)} '
        sources["view/a.html"] += 'button {color:var(--a, orange)}</style><button id="target">A</button>'
        answer = self.inspect(sources, [self.query()])["answers"][0]
        self.assertIn(answer["status"], ["unresolved", "resolved"])
        if answer["status"] == "resolved":
            self.assertEqual(answer["value"], "orange")

    def test_conditional_override_is_unresolved_until_condition_is_supplied(self):
        sources = {"view/a.html": '<style>button{color:green} '
                   '@media (max-width: 600px){button{color:red}}</style><button id="target">A</button>'}
        queries = [self.query(), self.query(conditions={"@media (max-width: 600px)": False}),
                   self.query(conditions={"@media (max-width: 600px)": True})]
        answers = self.inspect(sources, queries)["answers"]
        self.assertEqual([a["status"] for a in answers], ["unresolved", "resolved", "resolved"])
        self.assertEqual([a["value"] for a in answers[1:]], ["green", "red"])

    def test_focus_class_attribute_and_ancestor_selector_states(self):
        sources = {"view/a.html": '<style>.panel > button.action:focus-visible[aria-invalid="true"]'
                   '{outline-color:green}</style><section class="panel">'
                   '<button id="target" class="action" aria-invalid="true">A</button></section>'}
        answers = self.inspect(sources, [self.query(property="outline-color"),
                                        self.query(property="outline-color", states=["focus-visible"])])["answers"]
        self.assertEqual([a["status"] for a in answers], ["missing", "resolved"])

    def test_shorthand_replaces_longhand_and_later_longhand_can_replace_it(self):
        sources = {"view/a.html": '<style>button{outline-color:green;outline:none}</style>'
                   '<button id="target">A</button>'}
        answer = self.inspect(sources, [self.query(property="outline-color")])["answers"][0]
        self.assertEqual(answer["status"], "unresolved")
        sources["view/a.html"] = sources["view/a.html"].replace('outline:none', 'outline:none;outline-color:blue')
        self.assertEqual(self.inspect(sources, [self.query(property="outline-color")])[
            "answers"][0]["value"], "blue")

    def test_missing_stylesheet_and_new_page_are_not_success(self):
        sources = {"view/a.html": '<link rel="stylesheet" href="generated.css"><button id="target">A</button>',
                   "view/new.html": '<script type="module" src="missing.js"></script>'}
        report = self.inspect(sources, [self.query()])
        self.assertEqual(len(report["result"]["pages"]), 2)
        self.assertTrue(all(p["unresolved"] for p in report["result"]["pages"]))
        self.assertEqual(report["answers"][0]["status"], "unresolved")

    def test_module_helper_arguments_and_generated_style_attachment(self):
        sources = {"view/a.html": '<script type="module" src="main.js"></script>',
                   "view/main.ts": "import {button} from './control.js';\n"
                   "const sheet = document.createElement('style');\n"
                   "sheet.textContent = '.action {color:green}';\n"
                   "document.head.append(sheet);\n"
                   "document.body.append(button('action'));",
                   "view/control.ts": "export function button(kind: string) {\n"
                   "const element = document.createElement('button');\n"
                   "element.id = 'target'; element.className = kind;\nreturn element;\n}"}
        result = self.inspect(sources, [self.query()])
        answer = result["answers"][0]
        self.assertEqual(answer["value"], "green")
        loaded = {entry["path"]: entry["via"] for entry in result["result"]["pages"][0]["loaded"]}
        self.assertEqual(loaded["view/main.ts"]["path"], "view/a.html")
        self.assertEqual(loaded["view/control.ts"]["path"], "view/main.ts")
        self.assertEqual((answer["evidence"][0]["path"], answer["evidence"][0]["line"]),
                         ("view/main.ts", 3))
        sources["view/main.ts"] = sources["view/main.ts"].replace('document.head.append(sheet);', '')
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "missing")

    def test_unknown_class_and_dynamic_module_reference_remain_unresolved(self):
        sources = {"view/a.html": '<script type="module" src="main.js"></script><style>.action{color:green}</style>',
                   "view/main.ts": "const element=document.createElement('button');"
                   "element.id='target'; element.className=runtimeClass;"
                   "document.body.append(element); import(runtimeModule);"}
        report = self.inspect(sources, [self.query()])
        self.assertEqual(report["answers"][0]["status"], "unresolved")
        self.assertTrue(report["result"]["pages"][0]["unresolved"])

    def test_inline_declarations_on_same_line_do_not_cross_element_boundaries(self):
        sources = {"view/a.html": '<button id="target" style="color:green">A</button>'
                   '<button style="color:red">B</button>'}
        answer = self.inspect(sources, [self.query()])["answers"][0]
        self.assertEqual(answer["status"], "unresolved")

    def test_detached_parent_cannot_load_generated_style(self):
        sources = {"view/a.html": '<button id="target">A</button><script src="main.js"></script>',
                   "view/main.ts": "const box=document.createElement('div');\n"
                   "const sheet=document.createElement('style');\n"
                   "sheet.textContent='button{color:green}';\nbox.append(sheet);"}
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "missing")

    def test_unsupported_selector_cannot_lose_on_guessed_specificity(self):
        sources = {"view/a.html": '<style>:is(#target,.other){color:red} '
                   'button.action{color:green}</style><button id="target" class="action">A</button>'}
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "unresolved")

    def test_local_focus_alias_override_and_inline_override_change_query(self):
        sources = {"view/a.html": '<style>:root{--focus:green} button{color:var(--focus)}</style>'
                   '<button id="target" style="--focus:blue">A</button>'}
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["value"], "blue")
        sources["view/a.html"] = sources["view/a.html"].replace('--focus:blue', 'color:orange')
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["value"], "orange")

    def test_typescript_inline_priority_and_original_source_location(self):
        sources = {"view/a.html": '<style>#target{color:red!important}</style><script src="main.js"></script>',
                   "view/main.ts": "const button=document.createElement('button');\n"
                   "button.id='target';\nbutton.style.setProperty('color','green','important');\n"
                   "document.body.append(button);"}
        answer = self.inspect(sources, [self.query()])["answers"][0]
        self.assertEqual(answer["value"], "green")
        self.assertEqual((answer["evidence"][0]["path"], answer["evidence"][0]["line"]),
                         ("view/main.ts", 3))
        sources["view/main.ts"] = sources["view/main.ts"].replace("'green','important'", "'green',priority")
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "unresolved")

    def test_generated_output_is_loaded_only_via_real_reference_and_origin_stays_pending(self):
        (self.root / "tsconfig.browser.json").write_text(json.dumps({"compilerOptions": {
            "rootDir": "src/browser", "outDir": "dist/public"}}), encoding="utf-8")
        output = self.root / "dist/public"
        output.mkdir(parents=True)
        (output / "design-tokens.css").write_text(':root{--focus:green}', encoding="utf-8")
        sources = {"src/browser/index.html": '<link rel="stylesheet" href="/design-tokens.css">'
                   '<style>button{color:var(--focus)}</style><button id="target">A</button>',
                   "src/browser/view/design-tokens.json": '{"roles":{"focus":{"value":"green"}}}'}
        result = self.inspect(sources, [self.query("src/browser/index.html")])
        page = result["result"]["pages"][0]
        self.assertIn("dist/public/design-tokens.css", [entry["path"] for entry in page["loaded"]])
        self.assertEqual(result["answers"][0]["status"], "unresolved")
        self.assertTrue(any("origin" in item["reason"] for item in page["unresolved"]))
        (output / "design-tokens.css").unlink()
        result = self.inspect(sources, [self.query("src/browser/index.html")])
        self.assertEqual(result["answers"][0]["status"], "unresolved")
        self.assertNotIn("dist/public/design-tokens.css", [entry["path"] for entry in
                         result["result"]["pages"][0]["loaded"]])

    def test_unhandled_loading_mutations_and_construction_cannot_silently_pass(self):
        for operation in ["const link=document.createElement('link'); link.rel='stylesheet'; "
                          "link.href='other.css'; document.head.append(link);",
                          "sheet.insertRule('button{color:red}');",
                          "document.querySelector('button').style.color='red';",
                          "unknownElement.style.color='red';",
                          "{ const e=document.createElement('button'); document.body.append(e); }",
                          "unknownHelper();"]:
            with self.subTest(operation=operation):
                sources = {"view/a.html": '<style>button{color:green}</style>'
                           '<button id="target">A</button><script src="main.js"></script>',
                           "view/main.ts": operation}
                self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "unresolved")

    def test_nested_css_and_ambiguous_style_blocks_do_not_invent_applicability(self):
        for css in ['.outside {button{color:red}}', 'button{color:green}</style><style>button{color:red}']:
            with self.subTest(css=css):
                sources = {"view/a.html": f'<style>{css}</style><button id="target">A</button>'}
                self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "unresolved")

    def test_longhand_override_makes_shorthand_query_require_expansion(self):
        sources = {"view/a.html": '<style>button{outline:solid green;outline-color:red}</style>'
                   '<button id="target">A</button>'}
        self.assertEqual(self.inspect(sources, [self.query(property="outline")])[
            "answers"][0]["status"], "unresolved")

    def test_boolean_dom_property_false_does_not_create_disabled_attribute(self):
        sources = {"view/a.html": '<style>button{color:green} button:disabled{color:red}</style>'
                   '<script src="main.js"></script>',
                   "view/main.ts": "const button=document.createElement('button');"
                   "button.id='target';button.disabled=false;document.body.append(button);"}
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["value"], "green")

    def test_unknown_expression_effects_cannot_retain_resolved_styles(self):
        for expression in [
            "flag ? b.style.color='red' : b.style.color='blue'",
            "flag && (b.style.color='red')",
            "flag || (b.style.color='red')",
            "flag ?? (b.style.color='red')",
            "(b.style.color='red', 0)",
            "!(b.style.color='red')",
            "[b.style.color='red']",
            "new Change(b)",
            "({...change(b)})",
            "({[change(b)]: 1})",
        ]:
            with self.subTest(expression=expression):
                sources = {"view/a.html": '<style>button{color:green}</style>'
                           '<script type="module" src="main.js"></script>',
                           "view/main.ts": "const b=document.createElement('button');\n"
                           "b.id='target';\ndocument.body.append(b);\n" + expression + ";"}
                report = self.inspect(sources, [self.query()])
                self.assertEqual(report["answers"][0]["status"], "unresolved")
                self.assertTrue(any(item["path"] == "view/main.ts" and item["line"] == 4
                                    for item in report["result"]["pages"][0]["unresolved"]))

    def test_replace_children_detaches_descendants_and_severs_removed_parent(self):
        sources = {"view/a.html": '<html><head><style>body button{color:green}</style></head>'
                   '<body><script type="module" src="main.js"></script></body></html>',
                   "view/main.ts": "const box=document.createElement('div');\n"
                   "const b=document.createElement('button');\nb.id='target';\n"
                   "box.append(b);\ndocument.body.append(box);\ndocument.body.replaceChildren();"}
        report = self.inspect(sources, [self.query()])
        page = report["result"]["pages"][0]
        target = next(e for e in page["elements"] if e["attributes"].get("id") == "target")
        box = next(e for e in page["elements"] if e["tag"] == "div")
        self.assertFalse(target["attached"])
        self.assertFalse(box["attached"])
        self.assertIsNone(box["parent"])
        self.assertEqual(target["parent"], box["id"])
        self.assertEqual(report["answers"][0]["status"], "unresolved")
        sources["view/main.ts"] += "\ndocument.body.append(b);"
        report = self.inspect(sources, [self.query()])
        self.assertEqual(report["answers"][0]["value"], "green")
        self.assertTrue(next(e for e in report["result"]["pages"][0]["elements"]
                             if e["attributes"].get("id") == "target")["attached"])

    def test_replace_children_retires_removed_styles_and_their_imports(self):
        for head, extra_sources, construction in [
            ("", {}, "const sheet=document.createElement('style');\n"
             "sheet.textContent='button{color:green}';\ndocument.head.append(sheet);\n"),
            ("<style>button{color:green}</style>", {}, ""),
            ('<link rel="stylesheet" href="theme.css">',
             {"view/theme.css": '@import "base.css";', "view/base.css": 'button{color:green}'}, ""),
        ]:
            with self.subTest(head=head):
                sources = {"view/a.html": '<html><head>' + head + '</head><body>'
                           '<button id="target"></button><script type="module" src="main.js">'
                           '</script></body></html>',
                           "view/main.ts": construction + "document.head.replaceChildren();",
                           **extra_sources}
                report = self.inspect(sources, [self.query()])
                self.assertEqual(report["answers"][0]["status"], "missing")
                self.assertEqual(report["result"]["pages"][0]["declarations"], [])
                self.assertTrue(next(e for e in report["result"]["pages"][0]["elements"]
                                     if e["attributes"].get("id") == "target")["attached"])
        sources = {"view/a.html": '<button id="target"></button>'
                   '<script type="module" src="main.js"></script>',
                   "view/main.ts": "const box=document.createElement('div');\n"
                   "const sheet=document.createElement('style');\n"
                   "sheet.textContent='button{color:green}';\nbox.append(sheet);\n"
                   "document.head.append(box);\ndocument.head.replaceChildren();"}
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "missing")
        sources["view/main.ts"] += "\ndocument.head.append(box);"
        self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["value"], "green")

    def test_uncertain_script_order_and_attached_style_replacement_are_not_success(self):
        for html, module in [
            ('<script async src="main.js"></script><style>button{color:red}</style>',
             "const sheet=document.createElement('style');sheet.textContent='button{color:green}';document.head.append(sheet);"),
            ('<script src="main.js"></script><style>button{color:red}</style>',
             "const sheet=document.createElement('style');sheet.textContent='button{color:green}';document.head.append(sheet);"),
            ('<script src="main.js"></script>',
             "const sheet=document.createElement('style');\nsheet.textContent='button{color:green}';\n"
             "document.head.append(sheet);\nsheet.textContent='button{color:red}';"),
        ]:
            with self.subTest(html=html):
                sources = {"view/a.html": html + '<button id="target">A</button>', "view/main.ts": module}
                self.assertEqual(self.inspect(sources, [self.query()])["answers"][0]["status"], "unresolved")


if __name__ == "__main__":
    unittest.main()
