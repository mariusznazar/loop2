import json, sys
p = sys.argv[1]
d = json.loads(open(p, encoding="utf-8").read())
if isinstance(d, str): d = json.loads(d)
s = [x for x in d["samples"] if x["text"]]
bar = s[0]["barRect"]
over = [x for x in s if x["textRect"][1] < bar[3] or x["textRect"][3] <= bar[1]]
rects = {tuple(x["textRect"]) for x in s}
marks = []
for target in (0, 100, 250, 450, 650, 800, 1000, 1100, 1200, 1300):
    near = min(s, key=lambda x: abs(x["t"] - target))
    marks.append(f"{near['t']}:{near['opacity']}")
out = f"{p.rsplit('/',1)[-1]} bar {bar} rects {sorted(rects)} overlapping {len(over)}/{len(s)} opacity {' '.join(marks)}"
open(p + ".prof", "w", encoding="utf-8").write(out + "\n")
