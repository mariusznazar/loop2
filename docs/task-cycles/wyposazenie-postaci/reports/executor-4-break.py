import sys
path = sys.argv[1]
with open(path, encoding="utf-8", newline="") as f:
    text = f.read()
a = "  if (backpackCount(left) > capacity) refuse();\n"
b = "  if (refill && combatItem(acted.kind) === null) refuse();\n"
print(text.count(a), text.count(b))
text = text.replace(a, "  void capacity;\n").replace(b, "")
with open(path, "w", encoding="utf-8", newline="") as f:
    f.write(text)
