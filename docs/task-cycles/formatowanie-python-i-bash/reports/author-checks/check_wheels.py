import hashlib, json, re, urllib.request

d = json.load(open(".runs/author/shfmt-py.json", encoding="utf-8"))
text = open("requirements-quality.txt", encoding="utf-8").read()
block = text.split("shfmt-py==4.2.0")[1]
pinned = set(re.findall(r"--hash=sha256:([0-9a-f]{64})", block))
got = set()
for u in d["urls"]:
    if u["packagetype"] != "bdist_wheel":
        continue
    data = urllib.request.urlopen(u["url"]).read()
    digest = hashlib.sha256(data).hexdigest()
    print(u["filename"], digest, digest == u["digests"]["sha256"], digest in pinned)
    got.add(digest)
print("pinned set equals downloaded set:", pinned == got, len(pinned))
