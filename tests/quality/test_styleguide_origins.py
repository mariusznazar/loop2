"""Declaration origins must follow actual inputs, producers and loaded output."""

import copy
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
import styleguide_source


class OriginChecks(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)

    def write(self, name, text):
        target = self.root / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(text.encode("utf-8"))

    def facts(self, governed):
        originals = [styleguide_source._read_source(self.root, name) for name in governed]
        dependencies, imports, unresolved, configurations = styleguide_source._acquire(self.root, originals)
        return styleguide_source._call(self.root, "sources", originals, dependencies,
                                      imports, unresolved, configurations)

    def inspect(self, facts, queries=()):
        driver = """
import {readFileSync} from 'node:fs';
import {analyzePages,effectiveStyle} from './scripts/styleguide_pages.mjs';
const input=JSON.parse(readFileSync(0,'utf8'));
try {
  const result=analyzePages(input.facts,{root:input.root});
  const answers=input.queries.map(q=>{
    const page=result.pages.find(p=>p.path===q.page);
    const element=page.elements.find(e=>e.attributes.id==='target');
    return effectiveStyle(page,element.id,q.property,q.options??{});
  });
  process.stdout.write(JSON.stringify({result,answers}));
} catch(error) { process.stdout.write(JSON.stringify({error:error.message})); }
"""
        process = subprocess.run([shutil.which("node"), "--input-type=module", "-e", driver],
                                 cwd=ROOT, input=json.dumps({"root": str(self.root),
                                                           "facts": facts, "queries": queries}),
                                 text=True, capture_output=True, encoding="utf-8", check=False)
        self.assertEqual(process.returncode, 0, process.stderr)
        self.assertEqual(process.stderr, "")
        return json.loads(process.stdout)

    def generated_fixture(self, standalone=False, extra_style=""):
        for name in ["scripts/style-assets.mjs", "scripts/build.mjs", "scripts/kitchen-sink.mjs",
                     "package.json", "tsconfig.browser.json", "tsconfig.styleguide.json",
                     "src/browser/view/design-tokens.json", "assets/fonts/Geist.woff2",
                     "assets/fonts/GeistMono.woff2", "assets/fonts/OFL.txt"]:
            target = self.root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / name, target)
        page = "tools/styleguide/index.html" if standalone else "src/browser/index.html"
        output = ".runs/styleguide/public" if standalone else "dist/public"
        marker = "<!-- STYLEGUIDE_TOKEN_DATA -->" if standalone else ""
        html = '<link rel="stylesheet" href="/design-tokens.css">\n'
        html += '<link rel="stylesheet" href="/styles.css">\n' + extra_style
        html += '<button id="target">Fixture</button>\n' + marker
        self.write(page, html)
        self.write("src/browser/view/styles.css", "button:focus-visible {outline-color:var(--focus)}\n"
                   "button {color:var(--text); --ring:var(--focus)}\n")
        (self.root / output).mkdir(parents=True, exist_ok=True)
        emit = "import {emitStyleAssets} from './scripts/style-assets.mjs';" + (
            "await emitStyleAssets({sourceRoot:process.argv[1],outputDirectory:process.argv[2]});")
        process = subprocess.run([shutil.which("node"), "--input-type=module", "-e", emit,
                                  str(self.root), str(self.root / output)], cwd=ROOT,
                                 capture_output=True, text=True, encoding="utf-8", check=False)
        self.assertEqual(process.returncode, 0, process.stderr)
        if standalone:
            self.write("tools/styleguide/styles.css", "")
            self.write(output + "/styleguide.css", "")
            data = json.loads((self.root / "src/browser/view/design-tokens.json").read_bytes())
            serialized = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
            for character in "<>&\u2028\u2029":
                serialized = serialized.replace(character, f"\\u{ord(character):04x}")
            html = html.replace(marker, '<script type="application/json" id="styleguide-tokens">'
                                + serialized + '</script>')
        self.write(output + "/index.html", html)
        governed = [page, "src/browser/view/design-tokens.json", "src/browser/view/styles.css"]
        if standalone:
            governed.append("tools/styleguide/styles.css")
        return governed, page, output

    @staticmethod
    def query(page, property="outline-color", **options):
        return {"page": page, "property": property, "options": options}

    def test_both_outputs_certify_focus_and_text_against_original_records(self):
        for standalone in (False, True):
            with self.subTest(standalone=standalone):
                governed, page, output = self.generated_fixture(standalone)
                report = self.inspect(self.facts(governed), [
                    self.query(page, states=["focus-visible"]), self.query(page, "color")])
                self.assertNotIn("error", report)
                focus, text = report["answers"]
                self.assertEqual(focus["status"], "resolved")
                self.assertEqual(focus["value"], "#f4f4f5")
                self.assertEqual([origin["name"] for origin in focus["origins"]], ["focus"])
                self.assertEqual([origin["name"] for origin in text["origins"]], ["text"])
                origin = focus["origins"][0]
                self.assertEqual(origin["source"]["path"], "src/browser/view/design-tokens.json")
                self.assertEqual(origin["source"]["pointer"], "/roles/focus/value")
                self.assertEqual(origin["producer"]["path"], "scripts/style-assets.mjs")
                self.assertEqual(origin["output"]["path"], output + "/design-tokens.css")
                original = (self.root / origin["source"]["path"]).read_text(encoding="utf-8")
                encoded = original.encode("utf-16-le")
                span = encoded[2 * origin["source"]["start"]:2 * origin["source"]["end"]]
                self.assertEqual(json.loads(span.decode("utf-16-le")), "#f4f4f5")

    def test_equal_values_and_overridden_alias_do_not_invent_roles(self):
        governed, page, _output = self.generated_fixture(extra_style=
            '<style>button {--unrelated:#f4f4f5; outline-color:var(--unrelated)!important}</style>\n')
        answer = self.inspect(self.facts(governed), [self.query(page, states=["focus-visible"])])["answers"][0]
        self.assertEqual(answer["status"], "resolved")
        self.assertEqual(answer["value"], "#f4f4f5")
        self.assertEqual(answer["references"], ["--unrelated"])
        self.assertEqual(answer["origins"], [])
        governed, page, _output = self.generated_fixture(extra_style=
            '<style>button {outline-color:var(--ring)!important;--ring:var(--text-strong)}</style>\n')
        answer = self.inspect(self.facts(governed), [self.query(page, states=["focus-visible"])])["answers"][0]
        self.assertEqual(answer["value"], "#f4f4f5")
        self.assertEqual([origin["name"] for origin in answer["origins"]], ["text-strong"])

    def test_missing_changed_output_token_producer_and_loading_refuse_certificate(self):
        for mutation in ("delete-output", "output", "token", "producer", "caller", "loading", "escape"):
            with self.subTest(mutation=mutation):
                governed, page, output = self.generated_fixture()
                if mutation == "delete-output":
                    (self.root / output / "design-tokens.css").unlink()
                elif mutation == "output":
                    self.write(output + "/design-tokens.css", ":root{--focus:#f4f4f5}")
                elif mutation == "token":
                    name = "src/browser/view/design-tokens.json"
                    data = json.loads((self.root / name).read_bytes())
                    data["roles"]["focus"]["value"] = "#ff0000"
                    self.write(name, json.dumps(data))
                elif mutation in {"producer", "caller"}:
                    name = "scripts/style-assets.mjs" if mutation == "producer" else "scripts/build.mjs"
                    self.write(name, (self.root / name).read_text(encoding="utf-8") + "\nthrow Error('changed');\n")
                elif mutation == "loading":
                    html = (self.root / output / "index.html").read_text(encoding="utf-8")
                    self.write(output + "/index.html", html.replace('/design-tokens.css', '/unrelated.css'))
                else:
                    data = json.loads((self.root / "tsconfig.browser.json").read_bytes())
                    data["compilerOptions"]["outDir"] = "../outside"
                    self.write("tsconfig.browser.json", json.dumps(data))
                report = self.inspect(self.facts(governed), [self.query(page, states=["focus-visible"])])
                if "error" not in report:
                    self.assertEqual(report["answers"][0]["status"], "unresolved")
                    self.assertEqual(report["result"]["pages"][0]["origins"]["status"], "unresolved")

    def test_acquired_module_constructs_element_without_widening_inventory(self):
        self.write("view/a.html", '<script type="module" src="main.js"></script>')
        self.write("view/main.ts", "import {button} from '../shared/control.js';document.body.append(button());")
        self.write("shared/control.ts", "export function button(){const b=document.createElement('button');"
                   "b.id='target';return b;}")
        facts = self.facts(["view/a.html", "view/main.ts"])
        result = self.inspect(facts)
        self.assertNotIn("error", result)
        self.assertEqual(result["result"]["inventory"], ["view/a.html", "view/main.ts"])
        page = result["result"]["pages"][0]
        self.assertFalse(page["unresolved"])
        self.assertTrue(any(e["attributes"].get("id") == "target" for e in page["elements"]))
        self.assertIn("shared/control.ts", [item["path"] for item in page["loaded"]])

    def test_page_uses_acquired_target_instead_of_a_coincident_module_name(self):
        self.write("view/a.html", '<script type="module" src="main.js"></script>')
        self.write("view/main.ts", "import {button} from '../shared/control.js';document.body.append(button());")
        self.write("shared/control.ts", "export function button(){const b=document.createElement('button');"
                   "b.id='target';return b;}")
        self.write("shared/control.js", "export function button(){const b=document.createElement('button');"
                   "b.id='unrelated';return b;}")
        facts = self.facts(["view/a.html", "view/main.ts", "shared/control.js"])
        report = self.inspect(facts)
        self.assertNotIn("error", report)
        page = report["result"]["pages"][0]
        self.assertTrue(any(element["attributes"].get("id") == "target" for element in page["elements"]))
        self.assertNotIn("shared/control.js", [entry["path"] for entry in page["loaded"]])

    def test_dependency_integrity_and_version_are_not_optional(self):
        self.write("view/a.html", '<script type="module" src="main.js"></script>')
        self.write("view/main.ts", "import {x} from '../shared/value.js';")
        self.write("shared/value.ts", "export const x='unchanged';")
        facts = self.facts(["view/a.html", "view/main.ts"])
        variants = []
        for change in ("old", "missing", "digest", "text", "location", "target", "path"):
            altered = copy.deepcopy(facts)
            if change == "old":
                altered["schema"] = 2
            elif change == "missing":
                altered["dependencies"] = []
            elif change == "digest":
                altered["dependencies"][0]["digest"] = "0" * 64
            elif change == "text":
                altered["dependencies"][0]["source"] = "export const x='forged';"
            elif change == "location":
                altered["imports"][0]["line"] = 900
            elif change == "target":
                altered["imports"][0]["target"] = "view/main.ts"
            else:
                altered["dependencies"][0]["path"] = "../outside.ts"
            variants.append((change, altered))
        for change, altered in variants:
            with self.subTest(change=change):
                self.assertIn("error", self.inspect(altered))
        self.write("shared/value.ts", "export const x='stale';")
        self.assertIn("error", self.inspect(facts))

    def test_generated_dependency_mapping_cannot_be_forged(self):
        self.write("view/a.html", "<p>Fixture</p>")
        self.write("tests/view/uses.ts", "import {x} from '../../dist/public/shared.js';")
        self.write("src/browser/shared.ts", "export const x=1;")
        self.write("tsconfig.browser.json", json.dumps({"compilerOptions": {
            "rootDir": "src/browser", "outDir": "dist/public",
            "module": "NodeNext", "moduleResolution": "NodeNext"}}))
        facts = self.facts(["view/a.html", "tests/view/uses.ts"])
        self.assertNotIn("error", self.inspect(facts))
        facts["imports"][0]["target"] = "tests/view/uses.ts"
        self.assertIn("error", self.inspect(facts))

    def test_removed_loading_and_same_named_literal_do_not_certify_focus(self):
        for extra, remove_link in [('<style>button{--focus:#f4f4f5}</style>', False), ("", True)]:
            with self.subTest(remove_link=remove_link):
                governed, page, output = self.generated_fixture(extra_style=extra)
                if remove_link:
                    for name in [page, output + "/index.html"]:
                        text = (self.root / name).read_text(encoding="utf-8")
                        self.write(name, text.replace('<link rel="stylesheet" href="/design-tokens.css">', ""))
                answer = self.inspect(self.facts(governed), [self.query(page, states=["focus-visible"])])["answers"][0]
                self.assertEqual(answer["origins"], [])
                if not remove_link:
                    self.assertEqual(answer["status"], "resolved")
                    self.assertEqual(answer["value"], "#f4f4f5")

    def test_updated_token_after_real_emission_changes_origin_value_and_hash(self):
        governed, page, output = self.generated_fixture()
        before = self.inspect(self.facts(governed), [self.query(page, states=["focus-visible"])])["answers"][0]
        name = "src/browser/view/design-tokens.json"
        data = json.loads((self.root / name).read_bytes())
        data["roles"]["focus"]["value"] = "#ff0000"
        self.write(name, json.dumps(data))
        emit = "import {emitStyleAssets} from './scripts/style-assets.mjs';" + (
            "await emitStyleAssets({sourceRoot:process.argv[1],outputDirectory:process.argv[2]});")
        process = subprocess.run([shutil.which("node"), "--input-type=module", "-e", emit,
                                  str(self.root), str(self.root / output)], cwd=ROOT,
                                 capture_output=True, text=True, encoding="utf-8", check=False)
        self.assertEqual(process.returncode, 0, process.stderr)
        after = self.inspect(self.facts(governed), [self.query(page, states=["focus-visible"])])["answers"][0]
        self.assertEqual(after["status"], "resolved")
        self.assertEqual(after["value"], "#ff0000")
        self.assertNotEqual(before["origins"][0]["source"]["digest"], after["origins"][0]["source"]["digest"])
        self.assertNotEqual(before["origins"][0]["output"]["digest"], after["origins"][0]["output"]["digest"])

    def test_standalone_loading_cannot_escape_its_own_output(self):
        governed, page, output = self.generated_fixture(True)
        for name in [page, output + "/index.html"]:
            text = (self.root / name).read_text(encoding="utf-8")
            self.write(name, text.replace('/design-tokens.css', '../design-tokens.css'))
        answer = self.inspect(self.facts(governed), [self.query(page, states=["focus-visible"])])
        self.assertEqual(answer["answers"][0]["status"], "unresolved")
        self.assertTrue(any("escapes caller root" in diagnostic["reason"]
                            for diagnostic in answer["result"]["pages"][0]["origins"]["unresolved"]))

    def test_missing_producer_or_even_harmless_unreviewed_edit_is_inability(self):
        for mutation in ("missing", "comment"):
            with self.subTest(mutation=mutation):
                governed, page, _output = self.generated_fixture()
                name = "scripts/style-assets.mjs"
                if mutation == "missing":
                    (self.root / name).unlink()
                else:
                    self.write(name, (self.root / name).read_text(encoding="utf-8") + "\n// Harmless edit.\n")
                result = self.inspect(self.facts(governed), [self.query(page, states=["focus-visible"])])
                self.assertEqual(result["answers"][0]["status"], "unresolved")
                self.assertEqual(result["result"]["pages"][0]["origins"]["status"], "unresolved")


if __name__ == "__main__":
    unittest.main()
