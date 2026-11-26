import json, sys
raw = open(sys.argv[1], encoding="utf-8").read()
d = json.loads(raw)
if isinstance(d, str):
    d = json.loads(d)
out, last = [], None
for f in d:
    key = (f.get("minute"), f["health"], f["count"], f["words"], f["blow"], f["animation"])
    if key != last:
        out.append(f"{f['t']:>5} {f.get("minute")} hp={f['health']} n={f['count']} [{f['words']}] op={f['opacity']} blow={f['blow']} anim={f['animation']} shake={f['shake']}")
        last = key
open(sys.argv[1] + ".txt", "w", encoding="utf-8").write("\n".join(out) + "\n")
