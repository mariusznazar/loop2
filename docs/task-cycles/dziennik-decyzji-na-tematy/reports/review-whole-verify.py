"""Independent check of the division of the decision log into sections.

Usage: python -I verify.py BEFORE AFTER TASK OUT
Writes its findings to OUT (UTF-8) and prints ASCII counts.
"""
import re
import sys

before_path, after_path, task_path, out_path = sys.argv[1:5]

def read(path):
    with open(path, encoding="utf-8", newline="") as f:
        return f.read()

before = read(before_path)
after = read(after_path)
task = read(task_path)
out = []

def log(s):
    out.append(s)

log("CR in before: %d, CR in after: %d" % (before.count("\r"), after.count("\r")))
log("before ends with newline: %r, after: %r" % (before[-3:], after[-3:]))

ENTRY = re.compile(r"^### (D-\d+) — ", re.M)
HEAD = re.compile(r"^#{1,3} ", re.M)

def split(text):
    """Return (prefix before first heading after title, list of top-level blocks)."""
    lines = text.split("\n")
    blocks = []  # (kind, key, text)
    cur = None
    for i, line in enumerate(lines):
        if line.startswith("# ") or line.startswith("## ") or line.startswith("### "):
            if cur is not None:
                blocks.append(cur)
            if line.startswith("### "):
                m = re.match(r"### (D-\d+) — ", line)
                cur = ["entry", m.group(1) if m else "BAD:" + line, [line]]
            elif line.startswith("## "):
                cur = ["h2", line[3:], [line]]
            else:
                cur = ["h1", line[2:], [line]]
        else:
            if cur is None:
                cur = ["pre", "", [line]]
            else:
                cur[2].append(line)
    blocks.append(cur)
    return [(k, key, "\n".join(ls)) for k, key, ls in blocks]

bb = split(before)
ab = split(after)

def strip_trailing_blank(t):
    return t.rstrip("\n")

b_entries = [(k, t) for kind, k, t in bb if kind == "entry"]
a_entries = [(k, t) for kind, k, t in ab if kind == "entry"]
log("entries before %d (distinct %d), after %d (distinct %d)" % (
    len(b_entries), len({k for k, _ in b_entries}), len(a_entries), len({k for k, _ in a_entries})))
bd = dict(b_entries)
ad = dict(a_entries)
log("missing in after: %s" % sorted(set(bd) - set(ad)))
log("added in after: %s" % sorted(set(ad) - set(bd)))
diff_exact = [k for k in bd if k in ad and bd[k] != ad[k]]
diff_strip = [k for k in bd if k in ad and strip_trailing_blank(bd[k]) != strip_trailing_blank(ad[k])]
log("entries differing exactly (incl. trailing blank lines): %d %s" % (len(diff_exact), diff_exact[:20]))
log("entries differing after stripping trailing newlines: %d %s" % (len(diff_strip), diff_strip))
# shapes of the trailing blank lines before
from collections import Counter
tails_b = Counter(len(t) - len(t.rstrip("\n")) for _, t in b_entries)
tails_a = Counter(len(t) - len(t.rstrip("\n")) for _, t in a_entries)
log("trailing newline counts before %s after %s" % (dict(tails_b), dict(tails_a)))

# non-entry blocks
log("before non-entry blocks: %s" % [(kind, key, len(t)) for kind, key, t in bb if kind != "entry"])
for kind, key, t in bb:
    if kind == "h1":
        log("before h1 block repr: %r" % t)
for kind, key, t in ab:
    if kind == "h1":
        log("after h1 block repr: %r" % t)
wb = [t for kind, key, t in bb if kind == "h2" and key == "Withdrawn identifiers"]
wa = [t for kind, key, t in ab if kind == "h2" and key == "Withdrawn identifiers"]
log("withdrawn blocks before %d after %d, equal: %s" % (len(wb), len(wa), wb == wa))
log("withdrawn block is last in after: %s" % (ab[-1][0] == "h2" and ab[-1][1] == "Withdrawn identifiers"))

# task table
rows = re.findall(r"^\s*\| (\d+) \| (.+?) \| (.+?) \| (\d+) \|\s*$", task, re.M)
log("task table rows: %d" % len(rows))
sections_after = []
cur = None
for kind, key, t in ab:
    if kind == "h2" and key != "Withdrawn identifiers":
        body = t.split("\n")[1:]
        sentence_lines = [l for l in body if l.strip()]
        cur = {"heading": key, "body": t, "sentence": " ".join(sentence_lines), "entries": []}
        sections_after.append(cur)
    elif kind == "entry":
        if cur is None:
            log("ENTRY OUTSIDE ANY SECTION: %s" % key)
        else:
            cur["entries"].append(key)
    elif kind == "h2":
        cur = None
log("sections in after: %d" % len(sections_after))
for i, (row, sec) in enumerate(zip(rows, sections_after)):
    num, head, sent, cnt = row
    ok_h = head == sec["heading"]
    ok_s = sent == sec["sentence"]
    # A block runs to the line before the next heading, so the blank line after the
    # sentence shows as the final "\n" of the joined block.
    exact_form = sec["body"] == "## " + head + "\n\n" + sent + "\n"
    if not (ok_h and ok_s and exact_form):
        log("SECTION MISMATCH %s: heading ok %s sentence ok %s form ok %s body %r" % (num, ok_h, ok_s, exact_form, sec["body"]))
    log("%s. %s: %d entries (task projection %s)" % (num, head, len(sec["entries"]), cnt))

# projection
proj = {}
for m in re.finditer(r"^  - (\d+)\. (.+?): (D-\d+(?:, D-\d+)*)\s*$", task, re.M):
    proj[int(m.group(1))] = m.group(3).split(", ")
log("projection sections parsed: %d, entries %d" % (len(proj), sum(len(v) for v in proj.values())))
for i, sec in enumerate(sections_after, start=1):
    p = proj.get(i, [])
    extra = [e for e in sec["entries"] if e not in p]
    gone = [e for e in p if e not in sec["entries"]]
    if extra or gone:
        log("section %d differs from projection: extra %s missing %s" % (i, extra, gone))
# relative order
order = {k: i for i, (k, _) in enumerate(b_entries)}
for i, sec in enumerate(sections_after, start=1):
    idx = [order[e] for e in sec["entries"]]
    if idx != sorted(idx):
        log("section %d out of old order" % i)
allp = [e for v in proj.values() for e in v]
log("projection entries not in before: %s" % sorted(set(allp) - set(bd)))
log("before entries not in projection: %s" % sorted(set(bd) - set(allp)))

# reconstruct: drop section blocks, put entries back in old order -> compare with before
recon_parts = []
for kind, key, t in bb:
    recon_parts.append(t)
recon_before = "\n".join(recon_parts)
log("split/join round trip of before exact: %s" % (recon_before == before))
# multiset of all non-blank lines outside the section heading/sentence
def nonblank_lines(text):
    return Counter(l for l in text.split("\n") if l.strip())
sec_lines = Counter()
for sec in sections_after:
    for l in sec["body"].split("\n"):
        if l.strip():
            sec_lines[l] += 1
diffc = (nonblank_lines(after) - sec_lines) - nonblank_lines(before)
diffd = nonblank_lines(before) - (nonblank_lines(after) - sec_lines)
log("non-blank lines added beyond sections: %d %s" % (sum(diffc.values()), list(diffc)[:5]))
log("non-blank lines lost: %d %s" % (sum(diffd.values()), list(diffd)[:5]))
# blank-line runs between blocks in after
runs = Counter(len(m.group(0)) for m in re.finditer(r"\n{3,}", after))
log("runs of 2+ blank lines in after: %s; in before: %s" % (dict(runs), dict(Counter(len(m.group(0)) for m in re.finditer(r"\n{3,}", before)))))

with open(out_path, "w", encoding="utf-8", newline="\n") as f:
    f.write("\n".join(out) + "\n")
print("lines written", len(out))
