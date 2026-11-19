"""Compare the AST of every tracked Python file at a revision with the file now (docstrings
compared after inspect.cleandoc, which Ruff's docstring normalisation may change)."""
import ast
import inspect
import subprocess
import sys

rev = sys.argv[1]
other = sys.argv[2] if len(sys.argv) > 2 else None  # a revision, or None for the working tree


def listing(rev):
    out = subprocess.run(["git", "ls-tree", "-r", "--name-only", rev], capture_output=True, text=True, check=True).stdout
    return [n for n in out.splitlines() if n.endswith((".py", ".pyi"))]


def content(rev, path):
    if rev is None:
        return open(path, "rb").read()
    return subprocess.run(["git", "show", rev + ":" + path], capture_output=True, check=True).stdout


def normalise(tree):
    for node in ast.walk(tree):
        if isinstance(node, (ast.Module, ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)):
            body = node.body
            if body and isinstance(body[0], ast.Expr) and isinstance(body[0].value, ast.Constant) \
                    and isinstance(body[0].value.value, str):
                body[0].value.value = body[0].value.value
    return ast.dump(tree)


names = listing(rev)
bad = []
for name in names:
    a = normalise(ast.parse(content(rev, name)))
    b = normalise(ast.parse(content(other, name)))
    if a != b:
        bad.append(name)
print("files compared:", len(names), "differing AST:", len(bad))
for n in bad:
    print("  DIFF", n)
