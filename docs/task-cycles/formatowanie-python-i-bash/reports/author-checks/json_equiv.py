import json, sys

def strip(node):
    if isinstance(node, dict):
        if set(node) >= {"Offset", "Line", "Col"} and len(node) <= 3:
            return None
        return {k: strip(v) for k, v in node.items() if not (isinstance(v, dict) and set(v) >= {"Offset", "Line", "Col"})}
    if isinstance(node, list):
        return [strip(v) for v in node]
    return node

for name in sys.argv[1:]:
    a = strip(json.load(open(".runs/author/sh/%s.before.json" % name, encoding="utf-8")))
    b = strip(json.load(open(".runs/author/sh/%s.after.json" % name, encoding="utf-8")))
    print(name, "tree equal without positions:", a == b)
