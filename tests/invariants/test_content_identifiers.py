"""Invariant content-identifiers: No TypeScript file under `src/browser/` outside
`src/browser/sim/data/` names a game map, a resource, an item or an archetype, outside its
comments, by the identifier or the name that the files of `src/browser/sim/data/` give it.

The identifiers and names are written out below in ENTRIES, transcribed from the files of
`src/browser/sim/data/`: the keys of `MAPS` (`maps.ts`), `RESOURCES` (`resources.ts`), `ITEMS`
(`items.ts`) and `ARCHETYPES` (`archetypes.ts`), and the `name` each entry gives. The check does
not read the data at run time for its expected values (WAY-228), so a map, a resource, an item or
an archetype added to the data is scanned for only once it is written out here; a tripwire reads the data's entries, as
`npm run build` compiles them in a temporary copy of the working tree, only to fail when one of
them is not written out here, telling the maintainer to add it. The files scanned are the TypeScript files (`.ts`, `.tsx`, `.mts`,
`.cts`) git tracks or would track under `src/browser/`, less those under `src/browser/sim/data/`.

Reading of the sentence:
- names ... outside its comments: the identifier or the name stands in the file's text with its
  `//` and `/* */` comments removed — in code, in a string or in a template alike;
- names it by the identifier or the name: the identifier or name stands as a whole token, case
  as the data gives it, not preceded or followed by a letter, a digit, `_`, `$` or `-`; so `stick`
  in `'stick'`, `stick:`, `/icons/stick.svg` or `RESOURCES.stick` names the resource, while
  `wood-stick` (an icon file's name) and `stickCount` do not.

Covers:
- the scan of every such file against every identifier and name written out;
- the tripwire: every map, resource, item and archetype the data gives, with its name, stands among
  ENTRIES; a control shows it fails on made-up data holding a resource or an item that is not
  written out;
- control of the scan: made-up text naming each identifier and each name written out, in code, in a
  string and in a template, is flagged; the same names in comments only, in `wood-stick`-like
  compounds or inside longer identifiers are not; a file under `src/browser/sim/data/` and a file
  that is no TypeScript are not scanned.

Does NOT cover: a map, a resource, an item or an archetype named otherwise (by an index, or built from
pieces at run time, or written with escape sequences); files outside `src/browser/`.
"""

import json
import os
import re
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from source_lexer import without_comments

BROWSER_DIRECTORY = "src/browser/"
DATA_DIRECTORY = "src/browser/sim/data/"
TYPESCRIPT_EXTENSIONS = (".ts", ".tsx", ".mts", ".cts")
# The game maps, resources, items and archetypes, with the identifier and the name the data gives
# each.
ENTRIES = (
    {"kind": "map", "id": "forestEdge", "name": "Skraj lasu"},
    {"kind": "map", "id": "forest", "name": "Las"},
    {"kind": "map", "id": "forestDeep", "name": "Las — głębiej"},
    {"kind": "map", "id": "forestPack", "name": "Las — wataha"},
    {"kind": "map", "id": "forestDeep2", "name": "Las — głębiej II"},
    {"kind": "map", "id": "forestDeep3", "name": "Las — głębiej III"},
    {"kind": "map", "id": "forestDeep4", "name": "Las — głębiej IV"},
    {"kind": "map", "id": "forestLair", "name": "Las — matecznik"},
    {"kind": "resource", "id": "stick", "name": "patyk"},
    {"kind": "resource", "id": "berry", "name": "jagoda"},
    {"kind": "resource", "id": "moss", "name": "mech"},
    {"kind": "resource", "id": "fiber", "name": "włókno"},
    {"kind": "item", "id": "stick", "name": "patyk"},
    {"kind": "item", "id": "berry", "name": "jagoda"},
    {"kind": "item", "id": "moss", "name": "mech"},
    {"kind": "item", "id": "fiber", "name": "włókno"},
    {"kind": "item", "id": "bandage", "name": "opatrunek"},
    {"kind": "archetype", "id": "elementalMage", "name": "Mag żywiołów"},
)

# The data modules and collections the tripwire reads, as `npm run build` compiles them.
BUILT_DATA = "dist/browser/sim/data"
COLLECTIONS = (
    ("maps.js", "MAPS", "map"),
    ("resources.js", "RESOURCES", "resource"),
    ("items.js", "ITEMS", "item"),
    ("archetypes.js", "ARCHETYPES", "archetype"),
)
READER = r"""
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const [dataDirectory, collectionsJson, outPath] = process.argv.slice(2);
const out = [];
for (const [file, exportName, kind] of JSON.parse(collectionsJson)) {
  const module = await import(pathToFileURL(join(dataDirectory, file)).href);
  for (const [id, entry] of Object.entries(module[exportName] || {})) {
    out.push({ kind, id, name: entry && typeof entry.name === 'string' ? entry.name : null });
  }
}
writeFileSync(outPath, JSON.stringify(out));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def data_entries():
    """The entries the data gives — read only for the tripwire, never as an expected value."""
    data = support.built_copy().file(BUILT_DATA)
    if not os.path.isdir(data):
        raise AssertionError(f"`npm run build` placed no {BUILT_DATA}")
    work = tempfile.mkdtemp(prefix="loop2-content-tripwire-")
    try:
        script = os.path.join(work, "reader.mjs")
        out_path = os.path.join(work, "entries.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(READER)
        code, output = support.run([node(), script, data, json.dumps(COLLECTIONS), out_path], work)
        if code != 0:
            raise AssertionError(f"the reader exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(work, ignore_errors=True)


def not_written_out(read, written):
    """The entries of `read` that `written` lacks, as messages for the maintainer."""
    known = {(e["kind"], e["id"], e["name"]) for e in written}
    return [
        f"the data gives the {e['kind']} {e['id']!r} named {e['name']!r}, which ENTRIES in "
        f"tests/invariants/test_content_identifiers.py does not hold; add it there so that "
        f"the check scans for it"
        for e in read
        if (e["kind"], e["id"], e["name"]) not in known
    ]


def token_pattern(word):
    return re.compile(r"(?<![\w$-])" + re.escape(word) + r"(?![\w$-])")


def scanned(relative):
    return (
        relative.startswith(BROWSER_DIRECTORY)
        and not relative.startswith(DATA_DIRECTORY)
        and relative.endswith(TYPESCRIPT_EXTENSIONS)
    )


def findings(relative, text, entries):
    if not scanned(relative):
        return []
    code = without_comments(text)
    found = []
    for entry in entries:
        for label, word in (("identifier", entry["id"]), ("name", entry["name"])):
            if word and token_pattern(word).search(code):
                found.append(
                    f"{relative} names the {entry['kind']} {entry['id']} by its {label} {word!r}"
                )
    return found


class ContentIdentifiers(unittest.TestCase):
    def test_browser_files_outside_the_data_name_no_content(self):
        # invariant: content-identifiers
        # decision: D-332 "In `#/mapy/{map}`, {map} is the identifier of the map in the game's data as it stands"
        entries = ENTRIES
        files = [p for p in support.listed_files() if scanned(p)]
        self.assertTrue(files, "no TypeScript file under src/browser/ outside the data")
        found = []
        for relative in files:
            found += findings(
                relative, support.read_text(os.path.join(support.ROOT, relative)), entries
            )
        self.assertEqual(
            found, [], "a file outside the data names content by its identifier or name"
        )

    def test_tripwire_every_data_entry_is_written_out(self):
        # invariant: content-identifiers
        read = data_entries()
        self.assertTrue(read, "the tripwire read no entry of the data")
        self.assertEqual(not_written_out(read, ENTRIES), [])

    def test_control_the_tripwire_fails_on_an_entry_not_written_out(self):
        # invariant: content-identifiers
        self.assertEqual(not_written_out(list(ENTRIES), ENTRIES), [])
        stone = {"kind": "resource", "id": "stone", "name": "kamień"}
        self.assertTrue(
            not_written_out(list(ENTRIES) + [stone], ENTRIES),
            "a resource added to the data goes unseen",
        )
        bandage = {"kind": "item", "id": "bandage", "name": "bandaż"}
        self.assertTrue(
            not_written_out(list(ENTRIES) + [bandage], ENTRIES),
            "an item added to the data goes unseen",
        )
        renamed = [dict(e, name="Puszcza") if e["kind"] == "map" else e for e in ENTRIES]
        self.assertTrue(not_written_out(renamed, ENTRIES), "a renamed map goes unseen")
        renamed_item = [dict(e, name="witka") if e["kind"] == "item" else e for e in ENTRIES]
        self.assertTrue(not_written_out(renamed_item, ENTRIES), "a renamed item goes unseen")

    def test_control_the_scan_flags_a_view_file_naming_an_item(self):
        # invariant: content-identifiers
        probe = "src/browser/view/probe.ts"
        for word in ("stick", "patyk", "berry", "jagoda", "moss", "mech", "fiber", "włókno"):
            with self.subTest(word=word):
                text = f"const x = {json.dumps(word, ensure_ascii=False)};\n"
                self.assertTrue(
                    any(" names the item " in line for line in findings(probe, text, ENTRIES)),
                    f"the scan does not flag the item {word!r} in a view file",
                )
        item_only = [{"kind": "item", "id": "bandage", "name": "bandaż"}]
        for text in ("const x = 'bandage';\n", "const x = `${n} bandaż`;\n"):
            with self.subTest(text=text):
                self.assertTrue(
                    findings(probe, text, item_only),
                    f"the scan does not flag an item no resource is, in {text!r}",
                )

    def test_control_the_scan_flags_named_content(self):
        # invariant: content-identifiers
        entries = ENTRIES
        probe = "src/browser/view/probe.ts"
        for entry in entries:
            for word in (entry["id"], entry["name"]):
                for text in (
                    f"const x = {json.dumps(word, ensure_ascii=False)};\n",
                    f"const x = `<b>${{n}} {word}</b>`;\n",
                    f"const p = '/icons/{word}.svg';\n",
                    f"const s = {{ {json.dumps(word, ensure_ascii=False)}: 1 }};\n",
                ):
                    with self.subTest(text=text):
                        self.assertTrue(
                            findings(probe, text, entries), f"the scan does not flag {text!r}"
                        )
                with self.subTest(comment=word):
                    text = f"// {word}\n/* {word} */\nconst y = 1;\n"
                    self.assertEqual(
                        findings(probe, text, entries),
                        [],
                        f"the scan flags {word!r} standing in comments only",
                    )
                    compound = f"const z = 'wood-{word}-bush'; const w{word}Count = 2;\n"
                    self.assertEqual(
                        findings(probe, compound, entries),
                        [],
                        f"the scan flags {word!r} inside a compound token",
                    )
            self.assertTrue(findings(probe, f"RESOURCES.{entry['id']};\n", entries))
        named = f"export const a = {json.dumps(entries[0]['id'], ensure_ascii=False)};\n"
        self.assertEqual(findings("src/browser/sim/data/probe.ts", named, entries), [])
        self.assertEqual(findings("src/browser/index.html", named, entries), [])


if __name__ == "__main__":
    unittest.main()
