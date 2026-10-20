"""Verify wheel integrity, runtime closure, and the documented offline install."""
from email.parser import BytesParser
import hashlib
import importlib.metadata
import json
from pathlib import Path
import re
import subprocess
import sys
import zipfile

root=Path.cwd()
lock=(root / "requirements-quality.txt").read_text(encoding="utf-8")
blocks={}
for chunk in lock.split("\n\n"):
    match=re.search(r"^(ruff|shellcheck-py)==([^\s]+)",chunk,re.M)
    if match:
        blocks[match[1]]=(match[2],set(re.findall(r"--hash=sha256:([0-9a-f]{64})",chunk)))
assert set(blocks)=={"ruff","shellcheck-py"}
for name, (version, hashes) in blocks.items():
    data=json.loads((root / ".runs/task-cycles/coding-guidelines/reports" / ("s2-"+name+"-metadata.json")).read_text(encoding="utf-8"))
    expected={item["digests"]["sha256"] for item in data["urls"] if item["packagetype"]=="bdist_wheel" and not item["yanked"]}
    assert hashes==expected
    assert data["info"]["version"]==version
    assert not data["info"]["requires_dist"]
    print(json.dumps({"package":name,"version":version,"published_wheel_hashes":len(hashes),"runtime_dependencies":[]}))
for wheelhouse in (".runs/s2-wheelhouse-windows",".runs/s2-wheelhouse-linux"):
    wheels=list((root / wheelhouse).glob("*.whl"))
    assert len(wheels)==2
    for wheel in wheels:
        with zipfile.ZipFile(wheel) as archive:
            names=[name for name in archive.namelist() if name.endswith(".dist-info/METADATA")]
            assert len(names)==1
            metadata=BytesParser().parsebytes(archive.read(names[0]))
        name=metadata["Name"].replace("_","-")
        version, hashes=blocks[name]
        assert metadata["Version"]==version
        assert not metadata.get_all("Requires-Dist",[])
        digest=hashlib.sha256(wheel.read_bytes()).hexdigest()
        assert digest in hashes
        print(json.dumps({"wheel":wheel.name,"sha256":digest,"requires_dist":[]}))
for name, expected in (("ruff","ruff 0.17.1"),("shellcheck","version: 0.11.0")):
    executable=root / ".runs/s2-offline-venv/Scripts" / (name+".exe")
    result=subprocess.run([executable,"--version"],capture_output=True,text=True,check=True)
    assert expected in result.stdout and not result.stderr
    print(json.dumps({"offline_executable":str(executable.relative_to(root)),"version":result.stdout}))
print("PASS: complete published wheel hashes, downloaded artifact metadata closure, offline executable versions")
