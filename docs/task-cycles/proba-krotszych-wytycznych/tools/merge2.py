import re, io
R = "[a sibling worktree] proba-krotszych-wytycznych/docs/task-cycles/proba-krotszych-wytycznych/reports/"
GROUPS = ["known-practice","project-decision","derivable-case","state-listing","repeated-decision-or-config","structure"]
ABBR = {"known-practice":"KP","project-decision":"PD","derivable-case":"DC","state-listing":"SL","repeated-decision-or-config":"RD","structure":"ST"}
def parse(letter):
    rows = {}
    for line in io.open(R + "classification-%s.md" % letter, encoding="utf-8"):
        if not line.startswith("| S"): continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        m = re.match(r"(S\d{3})([a-z]?)", cells[0])
        if not m: continue
        uid, mem = m.group(1), m.group(2)
        gi = next((i for i, c in enumerate(cells) if c in GROUPS), None)
        if gi is None: continue
        g, src, origin, conf = cells[gi], cells[gi+1], cells[gi+2], cells[gi+3]
        origin = origin.replace("origin: ", "")
        rows.setdefault(uid, []).append(dict(mem=mem, g=g, src=src, origin=origin, conf=conf, text=cells[0]))
    return rows
A, B = parse("A"), parse("B")
EXAMPLES = {"S%03d" % i for i in range(86, 102)}
def fmt(rows):
    return "; ".join("%s%s %s/%s/%s%s" % (r["mem"] and r["mem"] + ":" or "", "", ABBR[r["g"]], r["src"][:3], r["conf"][:1], ("/" + r["origin"]) if r["origin"] else "") for r in rows)
lines = []
count = {"trial": {}, "main": {}}
def bump(k, a): count[k][a] = count[k].get(a, 0) + 1
for u in sorted(set(A) | set(B)):
    a, b = A.get(u, []), B.get(u, [])
    if not a or not b:
        lines.append((u, "ONLY ONE", fmt(a), fmt(b), "keep", "keep")); bump("trial","keep"); bump("main","keep"); continue
    ma, mb = [r["mem"] for r in a], [r["mem"] for r in b]
    pairs = None
    if ma == mb:
        pairs = list(zip(a, b))
    elif len(a) == 1 and len(b) == 1:
        pairs = [(a[0], b[0])]
    elif len(set(r["g"] for r in a + b)) == 1:
        pairs = [(a[0], b[0])]
    trial, main, status = [], [], "AGREE"
    if pairs is None or any(x["g"] != y["g"] for x, y in pairs):
        status = "DIFFER"; trial = ["keep"]; main = ["keep"]
    else:
        for x, y in pairs:
            g = x["g"]
            own = x["src"] == "own" and y["src"] == "own"
            if g == "known-practice": t, m = "replace by name", "keep"
            elif g in ("project-decision", "structure"): t, m = "keep", "keep"
            elif g == "derivable-case":
                nm = x["origin"] == "no-mistake" and y["origin"] == "no-mistake"
                t = "remove" if nm else "keep"; m = "remove" if (nm and own) else "keep"
                if not nm: status = "AGREE (origin differs/unknown: kept)"
            elif g == "state-listing": t, m = "remove", ("remove" if own else "keep")
            elif g == "repeated-decision-or-config":
                t = "remove"; m = "remove" if own else "keep"
                if x["src"] != y["src"]:
                    t, m = "keep", "keep"; status = "AGREE (source differs: kept)"
                if u in EXAMPLES: m = "keep (form: an example needs its text; author confirms)"
            trial.append(t); main.append(m)
    ts, ms = "/".join(sorted(set(trial))), "/".join(sorted(set(main)))
    if len(set(trial)) > 1: ts = "|".join(trial)
    if len(set(main)) > 1: ms = "|".join(main)
    lines.append((u, status, fmt(a), fmt(b), ts, ms))
    bump("trial", ts); bump("main", ms)
out = ["| id | status | A: group/source/confidence[/origin] | B: same | trial file | main |", "|---|---|---|---|---|---|"]
for l in lines:
    if "ST/" in l[2] and "ST/" in l[3] and l[1] == "AGREE":
        continue
    out.append("| " + " | ".join(l) + " |")
out.append("")
out.append("Rows not shown: structure units on which both classifiers agree (table rows, list bullets, paths): kept everywhere.")
out.append("")
out.append("Trial file actions: " + str(count["trial"]))
out.append("Main actions: " + str(count["main"]))
io.open(R + "classification-merged.md", "w", encoding="utf-8").write("\n".join(out))
print(count)
