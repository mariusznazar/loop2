import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

ROOT = Path.cwd()
REPORTS = ROOT / ".runs/task-cycles/first-foundation/reports"
tracked = subprocess.check_output(["git", "ls-files", "-z"], text=True).split("\0")

def put(root, relative, text):
    path = root / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")

def mapped_package(root, part, description):
    put(root, "apps/rogue-browser/package.json", json.dumps({"name": "rogue-browser", "type": "module", "scripts": {"build": "vite build"}, "devDependencies": {"vite": "*"}}))
    put(root, "apps/rogue-browser/index.html", '<html><body><script type="module" src="/src/main.ts"></script></body></html>')
    put(root, "apps/rogue-browser/src/main.ts", 'document.body.textContent = "second browser";')
    path = root / "foundations/part_map.md"
    text = path.read_text(encoding="utf-8")
    text += f"\n## {part}\n\n{description}\n\n- **Files:** apps/rogue-browser/**\n- **Depends on:** none\n- **Failure modes:** none\n- **Trust boundary:** none\n"
    path.write_text(text, encoding="utf-8")

def tooling(root):
    put(root, "scripts/tools/package.json", '{"name":"tools","scripts":{"build":"vite build"}}')
    put(root, "scripts/tools/main.ts", 'export const tool = 1;')
    path = root / "foundations/part_map.md"
    path.write_text(path.read_text(encoding="utf-8").replace("- **Files:** package.json", "- **Files:** scripts/tools/**\n  package.json"), encoding="utf-8")

def inherited(root):
    path = root / "tsconfig.browser.json"
    original = json.loads(path.read_text(encoding="utf-8"))
    put(root, "tsconfig.browser.base.json", json.dumps(original))
    put(root, "tsconfig.browser.json", '{"extends":"./tsconfig.browser.base.json"}')

cases = [
    ("unchanged", True, lambda r: None),
    ("tests-package", True, lambda r: put(r, "tests/package.json", '{"name":"test-tools","type":"module","scripts":{"test":"node --test http.test.mjs startup.test.mjs"}}')),
    ("rogue-browser", False, lambda r: mapped_package(r, "rogue-browser", "The part is a second browser application.")),
    ("nested-server", False, lambda r: put(r, "src/server/package.json", '{"name":"separate-server","type":"module"}')),
    ("known-tooling", True, tooling),
    ("inherited-typescript", True, inherited),
    ("unknown-tooling-classification", False, lambda r: mapped_package(r, "new-tooling", "The part is independent tooling.")),
    ("lock-mismatch", False, lambda r: put(r, "package-lock.json", '{"packages":{"":{"name":"wrong-package"}}}')),
]
summary = []
for name, expected, mutate in cases:
    with tempfile.TemporaryDirectory(prefix="loop2-package-rewrite-") as temporary:
        root = Path(temporary)
        for relative in tracked:
            if not relative or relative == ".the-way":
                continue
            source = ROOT / relative
            if source.is_file():
                destination = root / relative
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(source, destination)
        mutate(root)
        subprocess.run(["git", "init", "-q"], cwd=root, check=True)
        paths = [p.relative_to(root).as_posix() for p in root.rglob("*") if p.is_file() and ".git" not in p.relative_to(root).parts]
        subprocess.run(["git", "add", "--", *paths], cwd=root, check=True, capture_output=True)
        result = subprocess.run([sys.executable, "-B", "-m", "unittest", "discover", "-s", "tests/invariants", "-p", "test_application_package_layout.py", "-v"], cwd=root, capture_output=True, text=True)
        (REPORTS / f"package-rewrite-{name}.log").write_text(result.stdout + result.stderr, encoding="utf-8")
        actual = result.returncode == 0
        summary.append({"case": name, "expected_pass": expected, "actual_pass": actual, "exit_code": result.returncode})
        print(name, "PASS" if actual == expected else "UNEXPECTED", "exit", result.returncode)
        assert actual == expected, name
(REPORTS / "package-rewrite-controls.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
