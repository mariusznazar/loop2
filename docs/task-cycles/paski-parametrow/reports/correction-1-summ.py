import json, sys
raw = open(sys.argv[1], encoding="utf-8").read()
d = json.loads(raw)
if isinstance(d, str):
    d = json.loads(d)
s = d["samples"]
with_text = [x for x in s if x["text"]]
out = []
out.append(f"shot {d['shot']} timedOut {d.get('timedOut')} samples {len(s)} with text {len(with_text)}")
if with_text:
    out.append(f"text {with_text[0]['text']!r} first t {with_text[0]['t']} last t {with_text[-1]['t']}")
    out.append(f"first rect {with_text[0]['textRect']} last rect {with_text[-1]['textRect']} last opacity {with_text[-1]['opacity']}")
    shakes = sorted({x['cellTranslate'] for x in s})
    out.append(f"cell translates {shakes[:6]} ... blow marks {sorted({str(x['cellBlow']) for x in s})} standing {sorted({x['standing'] for x in s})} play {sorted({str(x['play']) for x in s})}")
    out.append(f"cells {with_text[0]['cellRects']} bar {with_text[0]['barRect']}")
    # inside own cell, outside others
    bad = []
    for x in with_text:
        l, t, r, b = x["textRect"]
        cells = x["cellRects"]
        own = cells[2]
        if l < own[0] or r > own[2] or t < own[1] or b > own[3]:
            bad.append(("outside own", x["t"], x["textRect"], own))
        for i, c in enumerate(cells):
            if i == 2: continue
            if l < c[2] and r > c[0] and t < c[3] and b > c[1]:
                bad.append(("over cell", i, x["t"]))
    out.append(f"violations {bad[:5]} count {len(bad)}")
out.append(f"minutes {d['minutes'][:3]} .. {d['minutes'][-3:]}")
out.append(f"after {d['after']}")
open(sys.argv[1] + ".txt", "w", encoding="utf-8").write("\n".join(out) + "\n")
