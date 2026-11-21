"""Differential check of the old copies of the cut against source_lexer and the four files."""
import importlib
import os
import re
import sys

ROOT = os.path.abspath(".")
sys.path.insert(0, os.path.join(ROOT, "tests", "invariants"))
sys.path.insert(0, os.path.join(ROOT, ".runs", "executor-2", "old"))

import loop2_invariant_support as support  # noqa: E402
import source_lexer as lx  # noqa: E402

old_iso = importlib.import_module("old_test_simulation_isolation")
old_rnd = importlib.import_module("old_test_simulation_randomness")
old_cid = importlib.import_module("old_test_content_identifiers")
old_bal = importlib.import_module("old_balance_source_scan")
new_iso = importlib.import_module("test_simulation_isolation")
new_rnd = importlib.import_module("test_simulation_randomness")
new_cid = importlib.import_module("test_content_identifiers")
new_bal = importlib.import_module("balance_source_scan")

corpus = []
for rel in support.listed_files():
    if rel.endswith((".ts", ".tsx", ".mts", ".cts", ".js", ".mjs", ".cjs")):
        corpus.append((rel, support.read_text(os.path.join(ROOT, rel))))
for mod in (new_iso, new_rnd, new_cid):
    pass
snippets = []
for mod in (old_iso, old_rnd, old_bal):
    for name in ("FLAGGED_SOURCES", "CLEAN_SOURCE"):
        v = getattr(mod, name, None)
        if isinstance(v, str):
            snippets.append(v)
        elif v:
            snippets += list(v)
import balance_source_scan  # noqa
for name in ("test_balance_instrument_file_writes", "test_balance_instrument_repeatability"):
    m = importlib.import_module(name)
    for attr in ("FLAGGED_SOURCES", "CLEAN_SOURCE"):
        v = getattr(m, attr)
        snippets += [v] if isinstance(v, str) else list(v)
adversarial = [
    "const a = 'cry\pto'; const b = \"node\:crypto\";\n",
    "const a = `{crypto}`; const b = `$crypto`; const c = `x${y}crypto${z}`;\n",
    "const a = `{writeFile}`; const b = `}writeFile${`;\n",
    "const s = 'unterminated crypto\nconst t = 1;\n",
    "const s = 'unterminated at eof crypto",
    "const s = 'a\'",
    "const t = `open ${a + `inner ${b}` + c} tail` / 2;\n",
    "const t = `x ${/re'/.test(a)} y`;\n",
    "const t = `x ${/[//]/.test(a)} y`;\n",
    "const r = a / b / c; const s = /ab+c/gi.test(x); return /x/;\n",
    "x = y /* c */ / 2; z = /* c */ /re/;\n",
    "// only a comment",
    "/* unterminated",
    "const t = `unterminated ${a",
    "a = `x`; b = 1 / 2; c = 'y' / 3;\n",
    "\n" * 80 + "/re/.test(a)\n",
    "if (a) { x } /re/.test(b)\n",
    "typeof /re/; return/x/g;\n",
    "Math//c\n.random()\n",
    "const o = {a: 1}; const p = o.a /2/ 1;\n",
    "const crypto_ = '\u0063rypto' + `\u0063rypto`;\n",
]
corpus += [("snippet%d.ts" % i, t) for i, t in enumerate(snippets + adversarial)]

problems = []
ws = lambda s: re.sub(r"\s+", " ", s)
for rel, t in corpus:
    # 1 isolation + balance segments, code_only
    if old_iso.segments(t) != lx.segments(t):
        problems.append(("iso segments", rel))
    if old_bal.segments(t) != lx.segments(t):
        problems.append(("bal segments", rel))
    if old_iso.without_comments(t) != lx.without_comments(t):
        problems.append(("iso without_comments", rel))
    if old_iso.code_only(t) != lx.code_only(t) or old_bal.code_only(t) != new_bal.code_only(t):
        problems.append(("code_only", rel))
    if old_iso.findings(rel if rel.endswith(".ts") else rel, t) != new_iso.findings(rel, t):
        problems.append(("iso findings", rel))
    # balance string_values superset
    ov, nv = old_bal.string_values(t), new_bal.string_values(t)
    if not set(ov) <= set(nv):
        problems.append(("bal string_values not superset", rel, sorted(set(ov) - set(nv))[:3]))
    # randomness
    if old_rnd.findings(rel, t) != new_rnd.findings(rel, t):
        problems.append(("rnd findings", rel))
    if rel.endswith(old_rnd.CODE_EXTENSIONS):
        oc, os_ = old_rnd.split_source(t)
        if not set(os_) <= set(lx.string_values(t)):
            problems.append(("rnd strings not superset", rel, sorted(set(os_) - set(lx.string_values(t)))[:3]))
        # the code view: names found by the forbidden patterns equal
        for pat, name in old_rnd.FORBIDDEN_NAMES + old_rnd.GENERATOR_CONSTANT:
            if bool(pat.search(oc)) != bool(pat.search(lx.code_only(t))):
                problems.append(("rnd code view", rel, name))
    # content ids
    if ws(old_cid.without_comments(t)) != ws(lx.without_comments(t)):
        problems.append(("cid without_comments", rel))
    if old_cid.findings(rel, t, old_cid.ENTRIES) != new_cid.findings(rel, t, new_cid.ENTRIES):
        problems.append(("cid findings", rel))
print("corpus", len(corpus), "files/snippets; problems", len(problems))
for p in problems:
    print(p)
for p in problems:
    for rel, t in corpus:
        if rel == p[1]:
            print(repr(rel), repr(t)[:200])
            if p[0] == "rnd findings":
                print(" old", old_rnd.findings(rel, t), " new", new_rnd.findings(rel, t))
            if p[0] == "cid without_comments":
                print(" old", repr(old_cid.without_comments(t)), "\n new", repr(lx.without_comments(t)))
