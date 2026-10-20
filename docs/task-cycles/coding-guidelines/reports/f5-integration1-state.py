"""Read local alias peer semantics and fingerprint the untouched product inputs."""
import hashlib
import json
from pathlib import Path
import subprocess

for name in ("package.json", "package-lock.json"):
    print(json.dumps({"path": name, "sha256": hashlib.sha256(Path(name).read_bytes()).hexdigest()}))
subprocess.run(["git", "diff", "--cached", "--name-only"], check=True)
script = r'''
import {createRequire} from 'node:module';
import path from 'node:path';
const local = createRequire(path.resolve('node_modules/npm/package.json'));
const Arborist = local('@npmcli/arborist');
const tree = await new Arborist({path:process.cwd()}).loadVirtual();
const target = tree.inventory.get('node_modules/typescript');
const peers = [...target.edgesIn].filter(edge => edge.peer).map(edge => ({
  from:edge.from.location, spec:edge.spec, valid:edge.valid, type:edge.type
}));
console.log(JSON.stringify({npm:local('./package.json').version,
  installName:target.name, actualName:target.package.name, version:target.version,
  resolved:target.resolved, peers}, null, 2));
'''
result = subprocess.run(["node", "--input-type=module", "-e", script], capture_output=True)
print(result.stdout.decode("utf-8"), end="")
print(result.stderr.decode("utf-8"), end="")
raise SystemExit(result.returncode)
