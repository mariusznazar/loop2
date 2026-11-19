"""Compare Python ASTs and shfmt syntax trees of every changed file between two commits."""

import ast
import json
import subprocess
import sys

BEFORE, AFTER, SHFMT = sys.argv[1], sys.argv[2], sys.argv[3]


def show(rev, path):
    return subprocess.run(["git", "show", f"{rev}:{path}"], capture_output=True, check=True).stdout


def strip_pos(node):
    if isinstance(node, dict):
        return {
            k: strip_pos(v)
            for k, v in node.items()
            if not (isinstance(v, dict) and set(v) <= {"Offset", "Line", "Col"})
        }
    if isinstance(node, list):
        return [strip_pos(v) for v in node]
    return node


names = subprocess.run(["git", "diff", "--name-only", BEFORE, AFTER], capture_output=True, text=True, check=True).stdout.split()
py_diff = sh_diff = py_n = sh_n = 0
for name in names:
    if name.endswith((".py", ".pyi")):
        py_n += 1
        a = ast.dump(ast.parse(show(BEFORE, name)), include_attributes=False)
        b = ast.dump(ast.parse(show(AFTER, name)), include_attributes=False)
        if a != b:
            py_diff += 1
            print("PY DIFF", name)
    elif name.startswith("deploy/"):
        sh_n += 1
        trees = []
        for rev in (BEFORE, AFTER):
            out = subprocess.run([SHFMT, "-ln", "bash", "--to-json"], input=show(rev, name), capture_output=True, check=True).stdout
            trees.append(json.dumps(strip_pos(json.loads(out)), sort_keys=True))
        if trees[0] != trees[1]:
            sh_diff += 1
            print("SH DIFF", name)
    else:
        print("OTHER", name)
print("py files", py_n, "differing", py_diff)
print("sh files", sh_n, "differing", sh_diff)
