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

    def record_dom(self, renamed=False):
        """Small authored transport fixture; the expected policy result is independent."""
        source = """const names = { className: 'class', htmlFor: 'for' };
class RecordNode {
  constructor() {
    this.attributes = {};
    this.style = { setProperty() {}, removeProperty() {} };
    return new Proxy(this, {
      set(target, prop, value) {
        if (prop in target || typeof prop === 'symbol') { target[prop] = value; return true; }
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          target.attributes[names[prop] || String(prop).toLowerCase()] = String(value);
          return true;
        }
        target[prop] = value; return true;
      },
      get(target, prop) {
        if (prop in target || typeof prop === 'symbol') return target[prop];
        const name = names[prop] || String(prop).toLowerCase();
        if (name in target.attributes) return target.attributes[name];
        return undefined;
      },
    });
  }
  setAttribute(name, value) { this.attributes[String(name)] = String(value); }
  setAttributeNS(ns, name, value) { this.setAttribute(name, value); }
  toggleAttribute(name, force) { const on = force === undefined ? !this.hasAttribute(name) : !!force; if (on) this.setAttribute(name, ''); else this.removeAttribute(name); return on; }
  hasAttribute(name) { return String(name) in this.attributes; }
  removeAttribute(name) { delete this.attributes[String(name)]; }
}
"""
        if renamed:
            import re
            for old, new in [('RecordNode', 'Vessel'), ('names', 'aliases'),
                             ('target', 'destination'), ('prop', 'key'),
                             ('value', 'payload'), ('name', 'label'),
                             ('force', 'requested'), ('on', 'enabled'), ('ns', 'space')]:
                source = re.sub(r"\b" + old + r"\b", new, source)
        return source

    def test_record_dom_has_located_transport_evidence_after_python_extraction(self):
        # Losing local allocation/dispatch proof must make these fixtures unresolved.
        for renamed in [False, True]:
            with self.subTest(renamed=renamed):
                self.write('view/renamed.py', 'SCRIPT = r"""\n' + self.record_dom(renamed) + '"""\n')
                facts = self.facts()["files"][0]
                self.assertEqual(facts["unresolved"], [])
                self.assertEqual(facts["violations"], [])
                self.assertEqual([(s["line"], s["kind"]) for s in facts["sites"]
                                  if s["kind"].startswith('record-dom-')],
                                 [(6, 'record-dom-style'), (25, 'record-dom-forward'),
                                  (26, 'record-dom-forward')])
                self.assertEqual(sorted({(site['line'], site['kind']) for site in facts['sites']
                                  if site['line'] in [6, 25, 26] and site['kind'] in ['assignment', 'call']}),
                                 [(6, 'assignment'), (25, 'call'), (26, 'call')])
                self.assertEqual(facts["source"], (self.root / 'view/renamed.py').read_bytes().decode('utf-8'))

    def test_record_dom_actual_helpers_resolve_only_the_five_original_sites(self):
        for filename, expected in [('test_icon_credits.py', [(102, 'record-dom-style'),
                                                           (140, 'record-dom-forward')]),
                                   ('test_terrain_drawing_numbers.py', [(125, 'record-dom-style'),
                                                                      (172, 'record-dom-forward'),
                                                                      (176, 'record-dom-forward')])]:
            with self.subTest(filename=filename):
                original = (ROOT / 'tests/invariants' / filename).read_text(encoding='utf-8')
                self.write('view/renamed.py', original)
                facts = self.facts()["files"][0]
                self.assertEqual(facts['unresolved'], [])
                self.assertEqual(facts['violations'], [])
                self.assertEqual([(s['line'], s['kind']) for s in facts['sites']
                                  if s['kind'].startswith('record-dom-')], expected)

    def test_record_dom_dataset_proxy_cannot_change_dispatch_or_escape_the_receiver(self):
        original = (ROOT / 'tests/invariants/test_terrain_drawing_numbers.py').read_text(encoding='utf-8')
        for changed in [original.replace("get: (_t, prop) => self.attributes['data-' + kebab(prop)]",
                                         'get: (_t, prop) => native[prop]'),
                        original.replace("const kebab = (s) => String(s)", "const kebab = (s) => external(s)"),
                        original.replace("return new Proxy(this, {", "const leaked = new External(this); return new Proxy(this, {")]:
            self.write('view/dataset.py', changed)
            facts = self.facts()['files'][0]
            self.assertTrue(facts['unresolved'])
            self.assertFalse(any(site['kind'].startswith('record-dom-') for site in facts['sites']))

    def test_record_dom_proof_refuses_mutation_escape_and_unknown_dispatch(self):
        source = self.record_dom()
        mutations = {
            'style body': source.replace('setProperty() {}', "setProperty() { document.body.style.opacity = '0.5'; }"),
            'style method replacement': source.replace('return new Proxy', 'this.style.setProperty = external; return new Proxy'),
            'style replacement': source + 'RecordNode.prototype.style = native.style;',
            'method replacement': source + 'RecordNode.prototype.setAttribute = native.setAttribute;',
            'method escape': source + 'const stolen = RecordNode.prototype.toggleAttribute;',
            'receiver escape': source.replace('return new Proxy', 'leak(this); return new Proxy'),
            'constructor allocation effect': source.replace('return new Proxy', 'new Unknown(this); return new Proxy'),
            'constructor side effect': source.replace('return new Proxy', 'unknown(); return new Proxy'),
            'subclass override': source + 'class Child extends RecordNode { setAttribute(name, value) { native.setAttribute(name, value); } }',
            'static initialization': source.replace('class RecordNode {', 'class RecordNode { static { mutate(this); }'),
            'builtin replacement': 'Proxy = external;\n' + source,
            'prototype alias': source + 'const proto = RecordNode.prototype; proto[unknown] = external;',
            'style escape': source.replace('return new Proxy', 'leak(this.style); return new Proxy'),
            'storage escape': source.replace('return new Proxy', 'leak(this.attributes); return new Proxy'),
            'storage replacement': source.replace('this.attributes = {};', 'this.attributes = native;'),
            'other receiver': source.replace('this.setAttribute(name, value)', 'native.setAttribute(name, value)'),
            'proxy target': source.replace('new Proxy(this,', 'new Proxy(native,'),
            'proxy dispatch': source.replace('return target[prop];', 'return native[prop];'),
            'proxy side effect': source.replace('return undefined;', 'leak(target); return undefined;'),
            'storage side effect': source.replace('this.attributes[String(name)] = String(value);',
                                                  'this.attributes[String(name)] = String(value); leak(this);'),
            'shadowed builtin': 'const Proxy = external;\n' + source,
            'aliased mapping escape': source + 'leak(names);',
            'mapping mutation': source + "names.className = 'style';",
            'computed replacement': source + 'RecordNode.prototype[unknown] = external;',
        }
        for label, changed in mutations.items():
            with self.subTest(case=label):
                self.write('view/changed.py', 'SCRIPT = r"""\n' + changed + '\n"""\n')
                facts = self.facts()['files'][0]
                self.assertTrue(facts['unresolved'] or facts['violations'], label)
                self.assertFalse(any(s['kind'].startswith('record-dom-') for s in facts['sites']), label)

    def test_record_dom_receiver_aliases_and_allocations_cannot_escape_or_change_dispatch(self):
        # Retaining a proof after these independently supplied mutations is a false pass.
        source = self.record_dom()
        mutations = {
            'review constructor alias': source.replace('return new Proxy',
                'const alias = this; alias[unknown] = external; return new Proxy'),
            'review prototype write': source.replace('return new Proxy',
                'this.__proto__ = native; return new Proxy'),
            'review instance escape': source + 'const instance = new RecordNode(); leak(instance);',
            'constructor alias escape': source.replace('return new Proxy',
                'const alias = this; escaped = alias; return new Proxy'),
            'constructor alias chain': source.replace('return new Proxy',
                'const alias = this; const second = alias; second[unknown] = external; return new Proxy'),
            'wrapped constructor alias': source.replace('return new Proxy',
                'const alias = (this); alias[unknown] = external; return new Proxy'),
            'constructed instance alias': source + 'const instance = new RecordNode(); const alias = instance; alias[unknown] = external;',
            'constructed instance write': source + 'const instance = new RecordNode(); instance[unknown] = external;',
            'constructed direct escape': source + 'leak(new RecordNode());',
            'unproved instance method': source.replace('class RecordNode {', 'class RecordNode { removeProperty() { const alias = this; alias[unknown] = external; }') + 'const instance = new RecordNode(); instance.removeProperty();',
            'factory allocation escape': source + "globalThis.document = { createDocumentFragment: () => { const f = new RecordNode('template'); leak(f); f.nodeType = 11; return f; } };",
        }
        for label, changed in mutations.items():
            with self.subTest(case=label):
                self.write('view/alias.py', 'SCRIPT = r"""\n' + changed + '\n"""\n')
                facts = self.facts()['files'][0]
                self.assertTrue(facts['unresolved'], label)
                self.assertFalse(any(s['kind'].startswith('record-dom-') for s in facts['sites']), label)

    def test_record_dom_bounded_document_factories_and_local_callers_survive_renaming(self):
        for renamed in [False, True]:
            constructor, local, argument, subclass = (('Vessel', 'piece', 'label', 'Segment') if renamed
                                                       else ('RecordNode', 'fragment', 'tag', 'Fragment'))
            fragments = [f"{{ const {local} = new {constructor}('template'); {local}.nodeType = 11; return {local}; }}",
                         f'new {constructor}()', f'new {subclass}()']
            for fragment in fragments:
                with self.subTest(renamed=renamed, fragment=fragment):
                    factories = f"""
class {subclass} extends {constructor} {{ constructor() {{ super('#fragment'); this.nodeType = 11; }} }}
globalThis.document = {{
  createElement: ({argument}) => new {constructor}({argument}),
  createElementNS: (space, {argument}) => new {constructor}({argument}, space),
  createDocumentFragment: () => {fragment},
}};
globalThis.document = {{ createElementNS: (space, {argument}) => new {constructor}({argument}) }};
const instance = new {constructor}(); instance.setAttribute('id', 'safe');
"""
                    source = self.record_dom(renamed).replace('return new Proxy',
                        f"const {local} = this; {local}.attributes.id = 'safe'; return new Proxy")
                    self.write('view/factory.py', 'SCRIPT = r"""\n' + source + factories + '"""\n')
                    facts = self.facts()['files'][0]
                    self.assertEqual(facts['unresolved'], [])
                    self.assertEqual(facts['violations'], [])
                    self.assertEqual(sum(s['kind'].startswith('record-dom-') for s in facts['sites']), 3)

    def test_record_dom_factory_results_require_complete_local_use_evidence(self):
        factory = "globalThis.document = { createElement: (tag) => new RecordNode(tag) };\n"
        result = "const instance = globalThis.document.createElement('div'); "
        mutations = {
            'review factory result mutation': result + "instance[unknown] = external; instance.setAttributeNS(null, 'id', 'safe');",
            'review factory result escape': result + 'leak(instance);',
            'result alias': result + 'const alias = instance; alias[unknown] = external;',
            'direct result escape': "leak(globalThis.document.createElement('div'));",
            'bare document result': "const instance = document.createElement('div'); leak(instance);",
            'static computed result': "const instance = globalThis['document']['createElement']('div'); leak(instance);",
            'wrapped result': "const instance = (document.createElement('div')); leak(instance);",
            'factory alias': "const make = document.createElement; leak(make('div'));",
            'factory destructuring': "const {createElement: make} = document; leak(make('div'));",
            'document alias': "const doc = globalThis.document; leak(doc.createElement('div'));",
            'global alias': "const root = globalThis; leak(root.document.createElement('div'));",
            'computed factory dispatch': "leak(document[unknown]('div'));",
            'computed document dispatch': "leak(globalThis[unknown].createElement('div'));",
            'factory replacement': 'document.createElement = external;',
            'document replacement': 'globalThis.document = external;',
        }
        for label, use in mutations.items():
            with self.subTest(case=label):
                self.write('view/factory-result.py', 'SCRIPT = r"""\n' + self.record_dom() + factory + use + '\n"""\n')
                facts = self.facts()['files'][0]
                self.assertTrue(facts['unresolved'], label)
                self.assertFalse(any(s['kind'].startswith('record-dom-') for s in facts['sites']), label)
        for changed_factory in [factory.replace(' };', ', ...external };'),
                                factory.replace(' };', ', createElement: external };'),
                                factory.replace(' };', ", 'createElement': external };")]:
            self.write('view/factory-result.py', 'SCRIPT = r"""\n' + self.record_dom() + changed_factory + '\n"""\n')
            facts = self.facts()['files'][0]
            self.assertTrue(facts['unresolved'])
            self.assertFalse(any(s['kind'].startswith('record-dom-') for s in facts['sites']))

    def test_record_dom_factory_result_callers_preserve_safe_and_appearance_evidence(self):
        for renamed in [False, True]:
            constructor, local, tag = ('Vessel', 'piece', 'label') if renamed else ('RecordNode', 'instance', 'tag')
            for factory, parameters, allocation, arguments in [
                    ('createElement', tag, tag, "'div'"),
                    ('createElementNS', 'space, ' + tag, tag + ', space', "null, 'div'"),
                    ('createDocumentFragment', '', '', '')]:
                for document in ['document', 'globalThis.document', "globalThis['document']"]:
                    with self.subTest(renamed=renamed, factory=factory, document=document):
                        prefix = self.record_dom(renamed) + f"globalThis.document = {{ {factory}: ({parameters}) => new {constructor}({allocation}) }};\n"
                        use = f"const {local} = {document}.{factory}({arguments}); {local}.setAttributeNS(null, 'id', 'safe');"
                        self.write('view/factory-safe.py', 'SCRIPT = r"""\n' + prefix + use + '\n"""\n')
                        facts = self.facts()['files'][0]
                        self.assertEqual(facts['unresolved'], [])
                        self.assertEqual(facts['violations'], [])
                        self.assertEqual(sum(s['kind'].startswith('record-dom-') for s in facts['sites']), 3)
        prefix = self.record_dom() + "globalThis.document = { createElement: (tag) => new RecordNode(tag) };"
        for call in ["globalThis.document.createElement('div').setAttribute('fill', '#123456');",
                     "const instance = globalThis.document.createElement('div'); instance.setAttribute('fill', '#123456');"]:
            self.write('view/factory-safe.py', 'SCRIPT = r"""\n' + prefix + call + '\n"""\n')
            facts = self.facts()['files'][0]
            self.assertTrue(facts['violations'])
            self.assertTrue(any(d['property'] == 'fill' and d['value'] == '#123456' for d in facts['declarations']))
            self.assertEqual(sum(s['kind'].startswith('record-dom-') for s in facts['sites']), 3)

    def test_record_dom_document_members_cannot_hide_an_implicit_receiver(self):
        factory = "globalThis.document = { createElement: (tag) => new RecordNode(tag) };"
        mutations = {
            'review assigned method mutation': "document.mutate = function () { const instance = this.createElement('div'); instance[unknown] = external; instance.setAttributeNS(null, 'id', 'safe'); }; document.mutate();",
            'review assigned method escape': "document.mutate = function () { const instance = this.createElement('div'); leak(instance); }; document.mutate();",
            'safe custom method remains unsupported': "document.safe = function () { const instance = this.createElement('div'); instance.setAttributeNS(null, 'id', 'safe'); }; document.safe();",
            'inherited method can expose document': 'const doc = document.valueOf(); leak(doc);',
            'unknown member read': 'leak(document.unknown);',
            'unproved listener replacement': "document.addEventListener = function () { leak(this); }; document.addEventListener();",
            'unproved text factory replacement': "document.createTextNode = function () { return this.createElement('div'); }; leak(document.createTextNode());",
        }
        for label, use in mutations.items():
            with self.subTest(case=label):
                self.write('view/document-member.py', 'SCRIPT = r"""\n' + self.record_dom() + factory + use + '\n"""\n')
                facts = self.facts()['files'][0]
                self.assertTrue(facts['unresolved'], label)
                self.assertFalse(any(s['kind'].startswith('record-dom-') for s in facts['sites']), label)
        members = [
            "mutate() { const instance = this.createElement('div'); instance[unknown] = external; instance.setAttributeNS(null, 'id', 'safe'); }",
            "addEventListener() { leak(this); }",
            "get createTextNode() { return this.createElement; }",
            "createTextNode: (text) => new RecordNode(text)",
            "valueOf() { return this; }",
            "unknown: {}",
        ]
        for member in members:
            with self.subTest(member=member):
                self.write('view/document-member.py', 'SCRIPT = r"""\n' + self.record_dom() +
                           factory.replace(' };', ', ' + member + ' };') + '\n"""\n')
                facts = self.facts()['files'][0]
                self.assertTrue(facts['unresolved'])
                self.assertFalse(any(s['kind'].startswith('record-dom-') for s in facts['sites']))

    def test_record_dom_only_proved_text_factory_and_empty_listener_are_supported(self):
        for renamed in [False, True]:
            element, text_class, parameter, base = (('Vessel', 'Glyph', 'value', 'Parent') if renamed
                                                   else ('RecordNode', 'TextNode', 'text', 'Base'))
            for inherited in [False, True]:
                with self.subTest(renamed=renamed, inherited=inherited):
                    text_source = f"""
class {base} {{}}
class {text_class}{' extends ' + base if inherited else ''} {{
  constructor({parameter}) {{ {'super();' if inherited else ''} this.nodeType = 3; this.data = String({parameter}); this.parentNode = null; }}
}}
globalThis.document = {{
  createElement: (tag) => new {element}(tag),
  createTextNode: ({parameter}) => new {text_class}({parameter}),
  addEventListener() {{}},
}};
document.createTextNode('safe'); document.addEventListener();
"""
                    source = self.record_dom(renamed) + text_source
                    self.write('view/document-supported.py', 'SCRIPT = r"""\n' + source + '\n"""\n')
                    facts = self.facts()['files'][0]
                    self.assertEqual(facts['unresolved'], [])
                    self.assertEqual(facts['violations'], [])
                    self.assertEqual(sum(s['kind'].startswith('record-dom-') for s in facts['sites']), 3)
                    for changed in [source.replace('this.nodeType = 3;', 'external(); this.nodeType = 3;'),
                                    source + f'{text_class} = external;',
                                    source.replace(f'class {base} {{}}', f'class {base} {{ constructor() {{ external(); }} }}') if inherited else source + f'leak({text_class});',
                                    source + f'leak({base if inherited else text_class});']:
                        self.write('view/document-supported.py', 'SCRIPT = r"""\n' + changed + '\n"""\n')
                        facts = self.facts()['files'][0]
                        self.assertTrue(facts['unresolved'])
                        self.assertFalse(any(s['kind'].startswith('record-dom-') for s in facts['sites']))

    def test_record_dom_all_callers_still_expose_appearance_values_and_uncertainty(self):
        callers = [
            ("new RecordNode().setAttribute('fill', '#123456');", 'fill', '#123456'),
            ("new RecordNode().setAttributeNS(null, 'stroke-width', '3');", 'stroke-width', '3'),
            ("new RecordNode().style.setProperty('opacity', '0.5');", 'opacity', '0.5'),
            ("new RecordNode().setAttribute('style', 'padding:2px');", 'padding', '2px'),
        ]
        for call, property_name, value in callers:
            with self.subTest(call=call):
                self.write('view/changed.py', 'SCRIPT = r"""\n' + self.record_dom() + call + '\n"""\n')
                facts = self.facts()['files'][0]
                self.assertTrue(facts['violations'])
                self.assertTrue(any(d['property'] == property_name and d['value'] == value
                                    for d in facts['declarations']))
        for call in ["new RecordNode().setAttribute(key, value);",
                     "new RecordNode().setAttributeNS(null, key, value);",
                     "new RecordNode().toggleAttribute(key);",
                     "new RecordNode().style.setProperty(key, value);"]:
            with self.subTest(call=call):
                self.write('view/changed.py', 'SCRIPT = r"""\n' + self.record_dom() + call + '\n"""\n')
                self.assertTrue(self.facts()['files'][0]['unresolved'])
        changed = self.record_dom().replace('this.setAttribute(name, value)',
                                           "this.setAttribute('fill', '#123456')")
        self.write('view/changed.py', 'SCRIPT = r"""\n' + changed + '"""\n')
        self.assertTrue(self.facts()['files'][0]['violations'])

    def dependency_fixture(self, source='import { x } from "../data/a.js";'):
        self.write("foundations/part_map.md", "## browser-view\n\n- **Files:** view/**\n"
                   "\n## other\n\n- **Files:** foundations/**\n  data/**\n")
        self.write("view/main.ts", source)
        self.write("data/a.ts", 'export const x = "red";')

    def corrupt_transport(self, mutate):
        run = self.module.run_tool

        def transport(*args, **kwargs):
            result = run(*args, **kwargs)
            request = json.loads(kwargs["input"])
            report = json.loads(result.stdout)
            mutate(report, request)
            return subprocess.CompletedProcess(result.args, result.returncode, json.dumps(report), result.stderr)

        return patch.object(self.module, "run_tool", side_effect=transport)

    def test_import_manifest_rejects_duplicate_and_forged_edges_before_reading(self):
        self.dependency_fixture()
        cases = [("line", True), ("line", 2), ("start", -1), ("end", 999),
                 ("expression", "forged"), ("specifier", "../data/forged.js"),
                 ("specifierStart", 0), ("specifierEnd", 2), ("kind", "invented")]
        for field, value in cases:
            with self.subTest(field=field):
                def mutate(report, request, field=field, value=value):
                    if request["operation"] == "imports":
                        report["files"][0]["imports"][0][field] = value
                with self.corrupt_transport(mutate):
                    with self.assertRaises(self.module.QualityError):
                        self.facts()

        def duplicate(report, request):
            if request["operation"] == "imports":
                report["files"][0]["imports"] *= 2
        with self.corrupt_transport(duplicate):
            with self.assertRaises(self.module.QualityError):
                self.facts()

        for change in ["omit", "duplicate", "digest", "schema"]:
            def mutate(report, request, change=change):
                if request["operation"] != "imports":
                    return
                if change == "omit":
                    report["files"] = []
                elif change == "duplicate":
                    report["files"] *= 2
                elif change == "digest":
                    report["files"][0]["digest"] = "0" * 64
                else:
                    report["schema"] = True
            with self.subTest(change=change):
                with self.corrupt_transport(mutate):
                    with self.assertRaises(self.module.QualityError):
                        self.facts()

    def test_fix_1_total_and_partial_parser_edge_omissions_are_inability(self):
        self.dependency_fixture('import { x } from "../data/a.js";\n'
                                'import { y } from "../data/missing.js";')
        for retain in [[], [0], [1]]:
            def omit(report, request, retain=retain):
                if request["operation"] == "imports":
                    for entry in report["files"]:
                        if entry["path"] == "view/main.ts":
                            entry["imports"] = [entry["imports"][index] for index in retain]
            with self.subTest(retain=retain):
                with self.corrupt_transport(omit):
                    with self.assertRaises(self.module.QualityError):
                        self.facts()

    def test_fix_1_url_shorthand_is_an_escape_of_its_value_binding(self):
        self.dependency_fixture('const moduleURL = new URL("../data/a.js", import.meta.url);\n'
                                'const leaked = { moduleURL };\n'
                                'leaked.moduleURL.pathname = "/other.js";\n'
                                'await import(moduleURL);')
        facts = self.facts()
        self.assertTrue(facts["unresolved"])
        self.assertEqual(facts["dependencies"], [])
        self.write("view/main.ts", 'const moduleURL = new URL("../data/a.js", import.meta.url);\n'
                   'const separate = { moduleURL: "unrelated property name" };\n'
                   'await import(moduleURL);')
        self.assertEqual(self.facts()["unresolved"], [])

    def test_fix_1_original_coverage_witness_is_strictly_validated(self):
        self.dependency_fixture()
        for change in ["missing-files", "missing-sites", "duplicate-sites", "digest", "span", "schema"]:
            def corrupt(report, request, change=change):
                if request["operation"] != "coverage":
                    return
                if change == "missing-files":
                    report["files"] = []
                elif change == "missing-sites":
                    report["files"][0]["sites"] = []
                elif change == "duplicate-sites":
                    report["files"][0]["sites"] *= 2
                elif change == "digest":
                    report["files"][0]["digest"] = "0" * 64
                elif change == "span":
                    report["files"][0]["sites"][0]["start"] = True
                else:
                    report["schema"] = True
            with self.subTest(change=change):
                with self.corrupt_transport(corrupt):
                    with self.assertRaises(self.module.QualityError):
                        self.facts()

    def test_fix_1_generated_originals_cannot_cross_excluded_components_before_read(self):
        self.write("tests/probe.mjs", 'import { x } from "../dist/public/a.js";')
        read = self.module._read_source
        for directory in ["node_modules/vendor", ".git/vendor", ".runs/vendor",
                          ".the-way/vendor", "dist/vendor", "data/node_modules/vendor"]:
            self.write("tsconfig.browser.json", json.dumps({"compilerOptions": {
                "module": "NodeNext", "moduleResolution": "NodeNext",
                "rootDir": directory, "outDir": "dist/public"}}))
            self.write(directory + "/a.ts", "export const x = 1;")
            attempted = []

            def observe(root, path, attempted=attempted):
                attempted.append(path)
                return read(root, path)

            with self.subTest(directory=directory):
                with patch.object(self.module, "discover_files", return_value=["tests/probe.mjs"]):
                    with patch.object(self.module, "_read_source", side_effect=observe):
                        facts = self.facts()
                self.assertNotIn(directory + "/a.ts", attempted,
                                 "excluded mapped original reached the read boundary")
                self.assertEqual(facts["dependencies"], [])
                self.assertTrue(facts["unresolved"])

    def test_final_dependency_snapshot_and_manifest_cannot_be_omitted_or_forged(self):
        self.dependency_fixture()
        def mutate_collection(key, mode):
            def mutate(report, request):
                if request["operation"] != "sources":
                    return
                if mode == "omit":
                    report[key] = []
                elif mode == "duplicate":
                    report[key] *= 2
                else:
                    report[key][0]["path"] = "data/forged.ts"
            return mutate
        for key in ["dependencies", "imports"]:
            for mode in ["omit", "duplicate", "forge"]:
                with self.subTest(key=key, mode=mode):
                    with self.corrupt_transport(mutate_collection(key, mode)):
                        with self.assertRaises(self.module.QualityError):
                            self.facts()
        for field, value in [("source", "altered bytes"), ("digest", "0" * 64), ("kind", "css")]:
            with self.subTest(field=field):
                def mutate(report, request, field=field, value=value):
                    if request["operation"] == "sources":
                        report["dependencies"][0][field] = value
                with self.corrupt_transport(mutate):
                    with self.assertRaises(self.module.QualityError):
                        self.facts()

        def boolean_location(report, request):
            if request["operation"] == "sources":
                report["imports"][0]["line"] = True
        with self.corrupt_transport(boolean_location):
            with self.assertRaises(self.module.QualityError):
                self.facts()

    def test_source_change_during_acquisition_is_not_stale_success(self):
        self.dependency_fixture()
        def mutate(_report, request):
            if request["operation"] == "sources":
                self.write("data/a.ts", 'export const x = "blue";')
        with self.corrupt_transport(mutate):
            with self.assertRaises(self.module.QualityError):
                self.facts()

    def test_dynamic_literal_is_acquired_but_unknown_shadowed_and_external_stay_inability(self):
        self.dependency_fixture('const loaded = import("../data/a.js");')
        facts = self.facts()
        self.assertEqual(facts["imports"][0]["kind"], "dynamic-runtime")
        self.assertEqual(facts["imports"][0]["target"], "data/a.ts")
        for source in ['import(moduleName);', 'import("package-name");',
                       'function load(require) { return require("../data/a.js"); }',
                       'const require = local; require("../data/a.js");',
                       'module.require("../data/a.js");',
                       'import library = require("../data/a.js");',
                       'import x from "/data/a.js";', 'import x from "../../outside.js";',
                       'import x from "../node_modules/a.js";', 'import x from "../data/a";']:
            with self.subTest(source=source):
                self.write("view/main.ts", source)
                facts = self.facts()
                self.assertTrue(facts["unresolved"])
                self.assertEqual(facts["dependencies"], [])
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_type_imports_exports_and_extension_substitution_are_located(self):
        self.dependency_fixture('import type { T } from "../data/a.js";\n'
                                'export { type T, x } from "../data/a.js";\n'
                                'type Q = import("../data/other.mjs").Q;\n'
                                'export type { C } from "../data/c.cjs";')
        self.write("data/other.mts", 'export type Q = string;')
        self.write("data/c.cts", 'export type C = string;')
        facts = self.facts()
        self.assertEqual([(i["line"], i["kind"], i["target"]) for i in facts["imports"]],
                         [(1, "import-type", "data/a.ts"), (2, "export-mixed", "data/a.ts"),
                          (3, "import-type", "data/other.mts"), (4, "export-type", "data/c.cts")])
        self.assertEqual(facts["unresolved"], [])

    def test_declaration_only_module_cannot_stand_in_for_runtime_source(self):
        self.dependency_fixture()
        (self.root / "data/a.ts").unlink()
        self.write("data/a.d.ts", "export declare const x: string;")
        self.assertTrue(self.facts()["unresolved"])
        self.write("view/main.ts", 'import type { x } from "../data/a.js";')
        facts = self.facts()
        self.assertEqual(facts["unresolved"], [])
        self.assertEqual(facts["imports"][0]["target"], "data/a.d.ts")

    def test_utf16_and_crlf_import_locations_preserve_original_bytes(self):
        self.dependency_fixture()
        (self.root / "view/main.ts").write_bytes(
            '// emoji: \U0001f332\r\nimport { x } from "../data/a.js";\r\n'.encode("utf-8"))
        facts = self.facts()
        self.assertEqual(facts["imports"][0]["line"], 2)
        self.assertIn("\r\n", facts["files"][0]["source"])
        self.assertEqual(facts["unresolved"], [])

    def test_link_boundary_is_rejected_before_dependency_read(self):
        self.dependency_fixture()
        target = self.root / "data/a.ts"
        target.unlink()
        with tempfile.TemporaryDirectory() as outside:
            real = Path(outside) / "a.ts"
            real.write_text('throw new Error("outside")', encoding="utf-8")
            try:
                target.symlink_to(real)
            except OSError:
                self.skipTest("creating symlinks is unavailable")
            with patch.object(self.module, "discover_files", return_value=["view/main.ts"]):
                with self.assertRaises(self.module.QualityError):
                    self.facts()

    def test_tooling_and_generated_references_are_explicit_boundaries(self):
        self.write("foundations/part_map.md", "## browser-view\n\n- **Files:** tests/**\n"
                   "\n## other\n\n- **Files:** foundations/**\n  tsconfig.*.json\n  src/**\n")
        self.write("tsconfig.browser.json", json.dumps({"compilerOptions": {
            "module": "NodeNext", "moduleResolution": "NodeNext",
            "rootDir": "src/browser", "outDir": "dist/public"}}))
        self.write("tsconfig.styleguide.json", json.dumps({"extends": "./tsconfig.browser.json",
                   "compilerOptions": {"rootDir": ".", "outDir": ".runs/styleguide/public"}}))
        self.write("src/browser/a.ts", "export const x = 1;")
        self.write("tests/probe.mjs", 'import assert from "node:assert/strict";\n'
                   'import { x } from "../dist/public/a.js";\n'
                   'await import("../.runs/styleguide/public/src/browser/a.js");')
        facts = self.facts()
        self.assertEqual([i["resolution"] for i in facts["imports"]],
                         ["tooling", "generated", "generated"])
        self.assertEqual([i["target"] for i in facts["imports"]],
                         [None, "src/browser/a.ts", "src/browser/a.ts"])
        self.assertTrue(all(i["reason"] for i in facts["imports"]))
        self.assertEqual([i["path"] for i in facts["dependencies"]], ["src/browser/a.ts"])
        self.assertEqual([i["path"] for i in facts["configurations"]],
                         ["tsconfig.browser.json", "tsconfig.styleguide.json"])

    def test_const_url_import_requires_lexical_builtin_unmutated_unescaped_evidence(self):
        self.dependency_fixture('const moduleURL = new URL("../data/a.js", import.meta.url);\n'
                                'await import(moduleURL);')
        facts = self.facts()
        self.assertEqual(facts["imports"][0]["target"], "data/a.ts")
        self.assertEqual(facts["imports"][0]["kind"], "dynamic-url")
        self.assertTrue(facts["imports"][0]["via"])
        bad = ['const URL = custom; ', 'URL = custom; ', 'globalThis.URL = custom; ',
               'import.meta.url = "file:///elsewhere"; ', 'const meta = import.meta; ',
               'eval("URL = custom"); ']
        suffixes = ['moduleURL.pathname = "elsewhere";', 'consume(moduleURL);',
                    'moduleURL.searchParams.set("a", "b");', 'const alias = moduleURL;']
        good = 'const moduleURL = new URL("../data/a.js", import.meta.url);\n'
        cases = [prefix + good + 'await import(moduleURL);' for prefix in bad]
        cases += [good + suffix + 'await import(moduleURL);' for suffix in suffixes]
        cases += ['let moduleURL = new URL("../data/a.js", import.meta.url); await import(moduleURL);',
                  'const moduleURL = new URL(path, import.meta.url); await import(moduleURL);',
                  'const moduleURL = new URL("../data/a.js", base); await import(moduleURL);',
                  good + 'function load(moduleURL) { return import(moduleURL); }']
        for source in cases:
            with self.subTest(source=source):
                self.write("view/main.ts", source)
                self.assertTrue(self.facts()["unresolved"])

    def test_generated_prefix_without_verified_configuration_and_source_is_inability(self):
        self.write("foundations/part_map.md", "## browser-view\n\n- **Files:** tests/**\n"
                   "\n## other\n\n- **Files:** foundations/**\n  tsconfig.*.json\n  src/**\n")
        self.write("tests/probe.mjs", 'import { x } from "../dist/public/a.js";')
        self.assertTrue(self.facts()["unresolved"])
        config = {"compilerOptions": {"module": "NodeNext", "moduleResolution": "NodeNext",
                  "rootDir": "src/browser", "outDir": "dist/public"}}
        self.write("tsconfig.browser.json", json.dumps(config))
        self.assertTrue(self.facts()["unresolved"])
        self.write("src/browser/a.ts", "export const x = 1;")
        self.assertEqual(self.facts()["unresolved"], [])
        for field, value in [("rootDir", "../outside"), ("outDir", "elsewhere"),
                             ("module", "CommonJS"), ("noEmit", "true"),
                             ("emitDeclarationOnly", 1), ("jsx", "preserve")]:
            changed = json.loads(json.dumps(config))
            changed["compilerOptions"][field] = value
            self.write("tsconfig.browser.json", json.dumps(changed))
            self.assertTrue(self.facts()["unresolved"])
        self.write("tsconfig.browser.json", json.dumps(config))
        def mutate(report, request):
            if request["operation"] == "sources":
                report["configurations"][0]["digest"] = "0" * 64
        with self.corrupt_transport(mutate):
            with self.assertRaises(self.module.QualityError):
                self.facts()

        for mode in ["omit", "duplicate", "stale"]:
            def corrupt_config(report, request, mode=mode):
                if request["operation"] != "sources":
                    return
                if mode == "omit":
                    report["configurations"] = []
                elif mode == "duplicate":
                    report["configurations"] *= 2
                else:
                    self.write("tsconfig.browser.json", json.dumps({"compilerOptions": {}}))
            self.write("tsconfig.browser.json", json.dumps(config))
            with self.subTest(mode=mode):
                with self.corrupt_transport(corrupt_config):
                    with self.assertRaises(self.module.QualityError):
                        self.facts()

    def test_actual_app_and_standalone_imports_have_original_dependency_evidence(self):
        facts = self.module.source_facts(ROOT)
        self.assertEqual(facts["unresolved"], [])
        dependencies = {file["path"]: file for file in facts["dependencies"]}
        self.assertIn("src/browser/sim/game.ts", dependencies)
        self.assertIn("src/browser/sim/data/resources.ts", dependencies)
        self.assertIn("src/browser/sim/types.ts", dependencies)
        self.assertIn("src/browser/sim/hex.ts", dependencies)
        governed = {file["path"] for file in facts["files"]}
        self.assertNotIn("src/browser/sim/game.ts", governed)
        self.assertIn("tests/view/dom-support.mjs", governed)
        witnesses = {(edge["path"], edge["target"]) for edge in facts["imports"]
                     if edge["resolution"] == "local"}
        self.assertIn(("src/browser/view/app.ts", "src/browser/sim/game.ts"), witnesses)
        self.assertIn(("tools/styleguide/page.ts", "src/browser/sim/data/resources.ts"), witnesses)
        self.assertIn(("src/browser/sim/game.ts", "src/browser/sim/run.ts"), witnesses)
        self.assertIn(("src/browser/sim/types.ts", "src/browser/sim/data/resources.ts"), witnesses)

    def verdict(self):
        with redirect_stderr(io.StringIO()):
            return self.module.check(self.root, "tokens")

    def test_missing_import_cannot_produce_a_token_pass(self):
        self.write("view/main.ts", 'import { catalog } from "../data/missing.js";')
        with self.assertRaises(self.module.QualityError):
            self.verdict()

    def test_old_direct_extractor_request_cannot_omit_dependency_evidence(self):
        result = subprocess.run([shutil.which("node"), "--input-type=module", "-e",
                                 "import {inspectSources} from './scripts/styleguide_source.mjs';"
                                 "inspectSources({files:[]});"], cwd=ROOT, capture_output=True)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("source request protocol", result.stderr.decode("utf-8"))

    def test_operation_cannot_hide_missing_import_acquisition(self):
        self.write("view/main.ts", 'import { x } from "../data/missing.js";')
        call = self.module._call

        def inspector(root, operation, *args):
            if operation == "focus":
                return {"schema": 1, "operation": "focus", "inventory": ["view/main.ts"],
                        "unresolved": [], "findings": [], "result": True}
            return call(root, operation, *args)

        with patch.object(self.module, "_call", side_effect=inspector):
            with self.assertRaises(self.module.QualityError):
                self.module.check(self.root, "focus")

    def test_acquired_graph_is_separate_complete_and_never_executed(self):
        self.write("foundations/part_map.md", "## browser-view\n\n- **Files:** view/**\n"
                   "\n## other\n\n- **Files:** foundations/**\n  data/**\n")
        self.write("view/main.ts", 'import { x, type T } from "../data/a.js";')
        self.write("view/unloaded.css", 'a{color:var(--text)}')
        self.write("data/a.ts", 'import type { T } from "./b.js";\n'
                   'export { y } from "./b.js";\n'
                   'throw new Error("must not execute"); export const color = "red";')
        self.write("data/b.ts", 'export { x } from "./a.js"; export type T = string;')
        facts = self.facts()
        self.assertEqual([f["path"] for f in facts["files"]],
                         ["view/main.ts", "view/unloaded.css"])
        self.assertEqual([f["path"] for f in facts["dependencies"]], ["data/a.ts", "data/b.ts"])
        self.assertEqual([(i["path"], i["kind"], i["target"]) for i in facts["imports"]],
                         [("view/main.ts", "import-mixed", "data/a.ts"),
                          ("data/a.ts", "import-type", "data/b.ts"),
                          ("data/a.ts", "export-runtime", "data/b.ts"),
                          ("data/b.ts", "export-runtime", "data/a.ts")])
        self.assertEqual(facts["unresolved"], [])
        self.assertIs(self.verdict(), True)

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

    def python_template(self, tail="", expression="'<g/>'"):
        return ('NS = "http://www.w3.org/2000/svg"\n'
                'def picture(inner, extra=""):\n'
                '    return f\'<svg xmlns="{NS}"{extra}>{inner}</svg>\'\n'
                f'FIRST = picture({expression})\n' + tail)

    def test_python_finite_template_binds_defaults_keywords_and_original_call(self):
        source = self.python_template('SECOND = picture(extra=\' fill="red"\', inner="<path/>")\n')
        self.write("view/p.py", source)
        facts = self.facts()["files"][0]
        self.assertEqual(facts["unresolved"], [])
        self.assertEqual([(v["line"], v["reason"]) for v in facts["violations"]],
                         [(5, "fill: literal color: red")])
        fragments = self.module._python_fragments(source)
        expanded = [f for f in fragments if "origin" in f]
        self.assertEqual([f["text"] for f in expanded],
                         ['<svg xmlns="http://www.w3.org/2000/svg"><g/></svg>',
                          '<svg xmlns="http://www.w3.org/2000/svg" fill="red"><path/></svg>'])
        self.assertEqual([f["origin"]["call"]["line"] for f in expanded], [4, 5])
        self.assertTrue(all(f["origin"]["template"]["line"] == 3 for f in expanded))

    def test_python_template_actual_sources_preserve_all_expansions(self):
        for filename, calls, remaining in [("test_icon_credits.py", 20, 0),
                                           ("test_icon_file_content.py", 23, 0)]:
            with self.subTest(filename=filename):
                source = (ROOT / "tests/invariants" / filename).read_text(encoding="utf-8")
                self.write("view/p.py", source)
                facts = self.facts()["files"][0]
                self.assertEqual(len(facts["unresolved"]), remaining, facts["unresolved"])
                self.assertEqual(facts["violations"], [])
                expanded = [f for f in self.module._python_fragments(source) if "origin" in f]
                self.assertEqual(len(expanded), calls)

    def test_python_template_raw_holes_cannot_hide_appearance(self):
        cases = ['<path fill="red"/>', '<path stroke-width="2"/>',
                 '<style>g { opacity: .5 }</style>', '<g><path style="color:red">']
        for inner in cases:
            with self.subTest(inner=inner):
                self.write("view/p.py", self.python_template(expression=repr(inner)))
                facts = self.facts()["files"][0]
                self.assertTrue(facts["violations"] or facts["unresolved"])

    def test_python_malformed_final_svg_close_still_inspects_all_opening_tags(self):
        for inner, forbidden in [('<path d="M0 0">', False),
                                 ('<path fill="red">', True),
                                 ('<style>g{opacity:.5}</style><path>', True)]:
            with self.subTest(inner=inner):
                self.write("view/p.py", self.python_template(expression=repr(inner)))
                facts = self.facts()["files"][0]
                self.assertEqual(facts["unresolved"], [])
                self.assertEqual(bool(facts["violations"]), forbidden)
        for extra in [' fill="red"', ' style="opacity:.5"', '><style>g{color:red}</style><g x="']:
            with self.subTest(extra=extra):
                self.write("view/p.py", self.python_template(
                    f'SECOND = picture("<g/>", {extra!r})\n'))
                facts = self.facts()["files"][0]
                self.assertTrue(facts["violations"] or facts["unresolved"])

    def test_python_template_unknown_calls_mutation_escape_and_recursion_refuse(self):
        tails = ['SECOND = picture(unknown)\n', 'alias = picture\n', 'consume(picture)\n',
                 'picture = other\n', 'NS = "other"\n',
                 'SECOND = picture(*values)\n', 'SECOND = picture(**values)\n',
                 'SECOND = picture("<g/>", extra=unknown())\n',
                 'def hidden(picture):\n    return picture("<g/>")\n',
                 'globals()["NS"] = "other"\n']
        sources = [self.python_template(tail) for tail in tails]
        sources += [self.python_template().replace('extra=""', 'extra=unknown'),
                    self.python_template().replace('{inner}', '{picture(inner)}'),
                    self.python_template().replace('{inner}', '{inner.upper()}')]
        for source in sources:
            with self.subTest(source=source):
                self.write("view/p.py", source)
                self.assertTrue(self.facts()["files"][0]["unresolved"])

    def test_python_template_non_name_bindings_and_reflection_refuse(self):
        tails = ['try:\n    run()\nexcept Exception as picture:\n    pass\n',
                 'match value:\n    case {"x": picture}:\n        pass\n',
                 'import sys\nsys.modules[__name__].NS = "changed"\n',
                 'other.__globals__["NS"] = "changed"\n']
        sources = [self.python_template(tail) for tail in tails]
        sources.append(self.python_template().replace('extra=""', 'extra=unknown').replace(
            "FIRST = picture('<g/>')", "FIRST = picture('<g/>', '')"))
        for source in sources:
            with self.subTest(source=source):
                self.write("view/p.py", source)
                self.assertTrue(self.facts()["files"][0]["unresolved"])

    def test_python_expansion_protocol_and_multiline_original_location(self):
        source = '# emoji: \U0001f33f\n' + self.python_template(
            'SECOND = picture("<g/>", extra=\'\\n fill="red"\')\n')
        self.write("view/p.py", source)
        facts = self.facts()["files"][0]
        self.assertEqual(facts["unresolved"], [])
        self.assertEqual([v["line"] for v in facts["violations"]], [6])
        self.assertTrue(all(site["line"] <= 6 for site in facts["sites"]))
        for field, value in [("line", True), ("start", -1), ("end", 99999),
                             ("expression", "forged")]:
            with self.subTest(field=field):
                snapshot = self.module._read_source(self.root, "view/p.py")
                fragment = next(f for f in snapshot["fragments"] if "origin" in f)
                fragment["origin"]["call"][field] = value
                with self.assertRaises(self.module.QualityError):
                    self.module._call(self.root, "sources", [snapshot])

    def test_python_text_and_href_holes_are_inspected_after_substitution(self):
        for value in ['<b style="color:red">x</b>', '" style="opacity:.5" x="']:
            for hole in ["text", "href"]:
                with self.subTest(hole=hole, value=value):
                    source = ('def link(text="ok", href="https://example.org/"):\n'
                              '    return f\'<a href="{href}">{text}</a>\'\n'
                              f'RESULT = link({hole}={value!r})\n')
                    self.write("view/p.py", source)
                    facts = self.facts()["files"][0]
                    # An ordinary quote in text is harmless; markup and attribute
                    # escapes still enter the real HTML/CSS extractor.
                    if hole == "text" and value.startswith('"'):
                        self.assertEqual(facts["unresolved"], [])
                        self.assertEqual(facts["violations"], [])
                    else:
                        self.assertTrue(facts["violations"] or facts["unresolved"])

    def test_python_renamed_lookup_with_readonly_local_alias_and_copy(self):
        source = ('CATALOG = {"leaf.svg": "Leaf"}\n'
                  'def caption(stem, title=None):\n'
                  '    title = CATALOG[stem + ".svg"] if title is None else title\n'
                  '    return f"<li>{title}</li>"\n'
                  'def check(data=None):\n'
                  '    data = CATALOG if data is None else data\n'
                  '    return "leaf.svg" in data and data["leaf.svg"] == "Leaf"\n'
                  'COPY = {key: value for key, value in CATALOG.items() if key != "x"}\n'
                  'RESULT = caption("leaf")\n')
        self.write("view/p.py", source)
        self.assertEqual(self.facts()["files"][0]["unresolved"], [])
        self.assertIn('<li>Leaf</li>', [f["text"] for f in self.module._python_fragments(source)])
        mutations = ['    data["leaf.svg"] = "changed"\n', '    consume(data)\n',
                     '    alias = data\n', '    data.update({})\n',
                     '    def nested():\n        return data\n']
        for mutation in mutations:
            with self.subTest(mutation=mutation):
                self.write("view/p.py", source.replace('    return "leaf.svg"', mutation + '    return "leaf.svg"'))
                self.assertTrue(self.facts()["files"][0]["unresolved"])
        for tail in ['consume(CATALOG)\n', 'CATALOG["leaf.svg"] = "changed"\n',
                     'VIEW = CATALOG.items()\n', 'ALIAS = CATALOG\n',
                     'SECOND = caption("missing")\n',
                     'SECOND = caption("leaf", title=unknown)\n']:
            with self.subTest(tail=tail):
                self.write("view/p.py", source + tail)
                self.assertTrue(self.facts()["files"][0]["unresolved"])

    def test_python_template_limits_keep_explicit_inability(self):
        for source in [self.python_template(expression='"x"' + ' + "x"' * 40),
                       self.python_template('RESULT = picture("x")\n' * 4096),
                       self.python_template(expression=repr("x" * 1_000_001))]:
            with self.subTest(length=len(source)):
                fragments = self.module._python_fragments(source)
                self.assertTrue(any(fragment["dynamic"] for fragment in fragments))

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

    def svg_helper(self, forwarding="value"):
        return ("function makeShape(tag, attributes) {\n"
                " const node = document.createElementNS('http://www.w3.org/2000/svg', tag);\n"
                " for (const [key, value] of Object.entries(attributes))\n"
                f"   node.setAttribute(key, {forwarding});\n"
                " return node;\n}\n")

    def test_svg_helper_direct_and_string_forwarding_preserve_original_values(self):
        for forwarding in ["value", "String(value)"]:
            with self.subTest(forwarding=forwarding):
                source = self.svg_helper(forwarding) + (
                    "const points = '1,2 3,4 5,6';\n"
                    "const fill = 'var(--text)';\n"
                    "makeShape('polygon', {points, fill, class: theme.className,\n"
                    " 'aria-label': theme.label, width: size, height: size});\n")
                self.write("view/p.ts", source)
                self.assertIs(self.verdict(), True)
                facts = self.facts()["files"][0]
                self.assertEqual(facts["source"], (self.root / "view/p.ts").read_bytes().decode("utf-8"))
                self.assertEqual([(d["line"], d["property"], d["value"])
                                  for d in facts["declarations"]], [(8, "fill", "var(--text)")])
                self.assertIn((4, "node.setAttribute(key, " + forwarding + ")"),
                              [(s["line"], s["expression"]) for s in facts["sites"]])

    def test_svg_helper_shorthand_appearance_and_namespace_are_not_geometry(self):
        for member, prefix, expected in [
                ("fill", "const fill = 'red';", False),
                ("opacity", "const opacity = '.4';", False),
                ("points", "const points = '1,2 3,4';", True),
                ("'stroke-width': '2'", "", False),
                ("'letter-spacing': '2px'", "", False),
                ("FILL: 'red'", "", True),
                ("width: '12px', height: '4rem'", "", True),
                ("style: 'color: red'", "", False)]:
            with self.subTest(member=member):
                self.write("view/p.ts", self.svg_helper() + prefix +
                           "\nmakeShape('polygon', {" + member + "});")
                self.assertIs(self.verdict(), expected)

    def test_svg_helper_uncertain_members_and_appearance_never_pass(self):
        for argument in ["{fill}", "{fill: palette.value}", "{[key]: 'currentColor'}",
                         "{...attributes}", "{get fill() { return 'red'; }}",
                         "{customAttribute: unknown}", "{onclick: code}",
                         "attributes"]:
            with self.subTest(argument=argument):
                self.write("view/p.ts", self.svg_helper() + "makeShape('g', " + argument + ");")
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_svg_helper_changed_bindings_receiver_or_iteration_never_pass(self):
        source = self.svg_helper("String(value)")
        mutations = [
            source.replace("key, String(value)", "value, String(key)"),
            source.replace("node.setAttribute", "other.setAttribute"),
            source.replace("Object.entries(attributes)", "Object.entries(other)"),
            source.replace("const [key, value]", "const [key, value = 'red']"),
            source.replace("for (const", "for await (const"),
            source.replace("String(value)", "String('red')"),
            source.replace("return node;", "consume(node); return node;"),
            source.replace("return node;", "return other;"),
            source.replace("const node", "let node"),
            source.replace("tag, attributes)", "tag, attributes = external)"),
            source.replace("http://www.w3.org/2000/svg", "http://www.w3.org/1999/xhtml"),
            source.replace("node.setAttribute(key, String(value));",
                           "{ const value = 'red'; node.setAttribute(key, String(value)); }"),
            "export " + source,
            source + "const retained = makeShape;",
            source + "consume({makeShape});",
            source + "export {makeShape};",
            source + "makeShape = replacement;",
            source + "makeShape(...args);",
            source + "makeShape('g', {}, extra);",
        ]
        for mutation in mutations:
            with self.subTest(mutation=mutation):
                self.write("view/p.ts", mutation + "makeShape('g', {class: 'sample'});")
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_svg_helper_shadowed_replaced_or_escaped_builtins_never_pass(self):
        source = self.svg_helper("String(value)")
        for prefix in ["const Object = external;", "const document = external;",
                       "function String(value) { return 'red'; }",
                       "Object.entries = external;", "document.createElementNS = external;",
                       "const entries = Object.entries;", "consume(document);",
                       "const global = globalThis;", "const native = String;",
                       "eval(code);", "Reflect.set(document, key, value);"]:
            with self.subTest(prefix=prefix):
                self.write("view/p.ts", prefix + source + "makeShape('g', {});")
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_svg_helper_uses_lexical_identity_with_renamed_and_shadowed_names(self):
        source = self.svg_helper().replace("makeShape", "paint").replace("attributes", "pairs")
        source = source.replace("node", "result").replace("key", "label").replace("value", "payload")
        source += "paint('g', {fill: 'var(--text)'});\n"
        source += "function unrelated(paint) { return paint('g', {}); }\n"
        source += "const object = {paint: 'label'};"
        self.write("view/p.ts", source)
        self.assertIs(self.verdict(), True)

    def test_svg_helper_refuses_indirect_builtin_replacement(self):
        for prefix in ["({}).constructor.entries = replacement;",
                       "const native = ''.constructor; consume(native);",
                       "const prototype = target.__proto__; consume(prototype);"]:
            with self.subTest(prefix=prefix):
                self.write("view/p.ts", prefix + self.svg_helper() + "makeShape('g', {});")
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_svg_helper_refuses_computed_reflection_and_uncertain_mutation(self):
        for prefix in [
                "({})['con' + 'structor'].entries = replacement;",
                "const key = `con${'structor'}`; ({})[key].entries = replacement;",
                "const key = flag ? 'safe' : 'constructor'; ({})[key].entries = replacement;",
                "const key = unknown; target[key].entries = replacement;",
                "const native = target[unknown]; native.entries = replacement;",
                "const native = target[unknown]; const alias = native; alias[other] = replacement;",
                "const native = target[unknown]; consume(native);",
                "const native = target[unknown]; publish({native});",
                "target[unknown] = replacement;",
                "delete target[unknown];",
                "target[unknown]++;",
                "({})[unknown]('code');",
                "const {['con' + 'structor']: native} = {}; native.entries = replacement;",
                "const {[unknown]: native} = target; consume(native);",
                "({constructor: native} = {}); native.entries = replacement;",
                "const native = target[unknown]; function change(value) { value.entries = replacement; } change(native);",
                "const native = target[unknown]; function use(value) { return value; } use(native);",
                "function use(value) { String(value); } use = consume; use(target[unknown]);",
                "top['O' + 'bject'].entries = replacement;",
        ]:
            with self.subTest(prefix=prefix):
                self.write("view/p.ts", prefix + self.svg_helper() + "makeShape('g', {});")
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_public_token_method_refuses_computed_svg_builtin_mutation(self):
        checker = importlib.import_module("check_styleguide")
        self.write("view/p.ts", self.svg_helper() +
                   '\n({})["con" + "structor"].entries = () => [["opacity", ".37"]];\n'
                   "makeShape('g', {});")
        record = self.root / ".runs/result.jsonl"
        with redirect_stderr(io.StringIO()):
            actual = checker.main(["--check", "tokens", "--record", str(record)], root=self.root)
        result = json.loads(record.read_text(encoding="utf-8"))
        self.assertEqual(actual, 2, result)
        self.assertIsNone(result["invariant"])
        self.assertNotEqual(result["verdict"], "pass")

    def test_svg_helper_refuses_replaced_scalar_read_sink(self):
        for prefix in ["Array.isArray = consume;", "const native = Array; consume(native);",
                       "const node = document.createElement('p'); node.__defineSetter__('textContent', consume); node.textContent = target[unknown];"]:
            with self.subTest(prefix=prefix):
                self.write("view/p.ts", prefix + "Array.isArray(target[unknown]);" +
                           self.svg_helper() + "makeShape('g', {});")
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_svg_helper_keeps_bounded_reads_and_imported_dispatch(self):
        cases = [
            "const key = 'la' + 'bel'; const value = target[key]; consume(value);",
            "const value = target[unknown]; const alias = value; String(alias);",
            "function label(value = '') { const node = document.createElement('p'); node.textContent = value; return node; } label(target[unknown]);",
            "function text() { const node = document.createElement('a'); return node; } const node = text(); node.href = target[unknown];",
            "const {[unknown]: value} = target; String(value);",
            "const value = target[unknown]; makeShape('g', {'aria-label': value});",
        ]
        for prefix in cases:
            with self.subTest(prefix=prefix):
                self.write("view/p.ts", prefix + self.svg_helper() + "makeShape('g', {});")
                self.assertIs(self.verdict(), True)
        self.write("view/factories.ts", "export const choices = {plain: () => null};")
        self.write("view/p.ts", "import {choices} from './factories.js'; choices[unknown]({});" +
                   self.svg_helper() + "makeShape('g', {});")
        self.assertIs(self.verdict(), True)
        for dispatch in ["const alias = choices[unknown]; alias({});",
                         "choices[unknown].entries = replacement;",
                         "consume(choices[unknown]);"]:
            with self.subTest(dispatch=dispatch):
                self.write("view/p.ts", "import {choices} from './factories.js';" + dispatch +
                           self.svg_helper() + "makeShape('g', {});")
                with self.assertRaises(self.module.QualityError):
                    self.verdict()

    def test_public_token_method_keeps_python_record_dom_and_svg_boundaries(self):
        checker = importlib.import_module("check_styleguide")
        cases = [
            ("python", self.python_template(expression="'<g fill=\"currentColor\"/>'"), 0),
            ("python", self.python_template(expression="'<g fill=\"red\"/>'"), 1),
            ("python", self.python_template(expression="unknown"), 2),
            ("record", self.record_dom() + "new RecordNode().setAttribute('fill', 'currentColor');", 0),
            ("record", self.record_dom() + "new RecordNode().setAttribute('fill', 'red');", 1),
            ("record", self.record_dom() + "new RecordNode().setAttribute('fill', unknown);", 2),
            ("svg", self.svg_helper() + "makeShape('g', {fill: 'currentColor'});", 0),
            ("svg", self.svg_helper() + "makeShape('g', {fill: 'red'});", 1),
            ("svg", self.svg_helper() + "makeShape('g', {fill: unknown});", 2),
        ]
        for family, source, expected in cases:
            with self.subTest(family=family, expected=expected):
                text = source if family == "python" else 'SCRIPT = r"""\n' + source + '\n"""\n'
                self.write("view/public.py", text)
                record = self.root / ".runs/result.jsonl"
                record.unlink(missing_ok=True)
                with redirect_stderr(io.StringIO()):
                    actual = checker.main(["--check", "tokens", "--record", str(record)], root=self.root)
                result = json.loads(record.read_text(encoding="utf-8"))
                self.assertEqual(actual, expected, result)
                if expected < 2:
                    self.assertEqual(result["invariant"], "design-token-use/1")
                    self.assertEqual(result["verdict"], "pass" if expected == 0 else "fail")
                else:
                    self.assertNotEqual(result["verdict"], "pass")

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
                self.assertEqual(report["schema"], 3)
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
