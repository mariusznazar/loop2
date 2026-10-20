"""Independent final-review cases; write only in the retained ignored scratch tree."""

import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import time

TASK = Path(__file__).resolve().parents[4]
REPORTS = Path(__file__).resolve().parent
SCRATCH = TASK / ".runs/final-review-scratch"
BASE = "c379207bfd8bd148d3589ea75604ba5165915d01"
HEAD = "e31f6a4051f33b832cb8603d67e815240af5464f"
RESULTS = []
ENV = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")
ENV["TEMP"] = str(SCRATCH / ".runs/temp")
ENV["TMP"] = ENV["TEMP"]


def run(label, command, *, cwd=SCRATCH, expected=None, source=None, invariant=None):
    output = REPORTS / ("final-review-" + label + ".log")
    started = time.monotonic()
    with output.open("wb") as stream:
        result = subprocess.run([str(x) for x in command], cwd=cwd, env=ENV,
                                stdout=stream, stderr=subprocess.STDOUT)
    row = dict(label=label, command=[str(x) for x in command], cwd=str(cwd),
               exit=result.returncode, expected=expected, source=source,
               invariant=invariant, output=str(output),
               seconds=round(time.monotonic() - started, 2))
    output.with_suffix(".json").write_text(json.dumps(row, indent=2), encoding="utf-8")
    RESULTS.append(row)
    (REPORTS / "final-review-executions.json").write_text(
        json.dumps(RESULTS, indent=2), encoding="utf-8")
    print(label, result.returncode, flush=True)
    return result.returncode


def command(invariant):
    special = {
        "eslint-source-rules": ["scripts/check_eslint.py"],
        "eslint-configuration-rules": ["scripts/check_eslint.py", "--configuration"],
        "ruff-source-rules": ["scripts/check_ruff.py"],
        "shellcheck-source-rules": ["scripts/check_shellcheck.py"],
        "prettier-source-format": ["scripts/check_format.py"],
        "introduced-npm-vulnerabilities": ["scripts/check_dependencies.py", "--fork-point", BASE],
        "guidelines-form": [".the-way/product-guidelines/form_check.py"],
        "guidelines-reference-current": [".the-way/product-guidelines/form_check.py",
                                         "--merge-onto", BASE],
    }
    if invariant in special:
        return [sys.executable, "-B", *special[invariant]]
    return [sys.executable, "-B", "-m", "unittest", "discover", "-s", "tests/invariants",
            "-p", "test_" + invariant.replace("-", "_") + ".py"]


def case(label, invariant, path, text, expected, source):
    target = SCRATCH / path
    original = target.read_bytes() if target.exists() else None
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(text.encode("utf-8"))
    added = original is None
    if added:
        subprocess.run(["git", "add", "--", path], cwd=SCRATCH, check=True,
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    try:
        return run(label, command(invariant), expected=expected,
                   source=source + "; applied whole file at " + path, invariant=invariant)
    finally:
        if original is None:
            # Retain each input, without deleting it or leaving it in check scope.
            archive = SCRATCH / ".runs/cases" / label / path
            archive.parent.mkdir(parents=True, exist_ok=True)
            target.replace(archive)
            subprocess.run(["git", "restore", "--staged", "--", path], cwd=SCRATCH,
                           check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        else:
            archive = SCRATCH / ".runs/cases" / label / path
            archive.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(target, archive)
            target.write_bytes(original)


def setup():
    run("setup-worktree", ["git", "worktree", "add", "--detach", SCRATCH, HEAD], cwd=TASK)
    (SCRATCH / ".runs/temp").mkdir(parents=True, exist_ok=True)
    run("setup-submodule", ["git", "-c", "protocol.file.allow=always", "submodule",
                           "update", "--init", "--reference", str(TASK / ".the-way"),
                           "--", ".the-way"])
    run("setup-node-copy", ["robocopy", TASK / "node_modules", SCRATCH / "node_modules",
                           "/E", "/NFL", "/NDL", "/NJH", "/NJS", "/NP"])
    # Native standalone tool binaries, copied from the pinned installation.
    tools = SCRATCH / ".runs/quality-venv/Scripts"
    tools.mkdir(parents=True, exist_ok=True)
    for name in ("ruff.exe", "shellcheck.exe"):
        shutil.copyfile(TASK / ".runs/quality-venv/Scripts" / name, tools / name)


def pairs():
    number = 0
    for guideline in sorted((SCRATCH / "guidelines").glob("*.md")):
        text = guideline.read_text(encoding="utf-8")
        for match in re.finditer(r"(?m)^```(good|bad) ([a-z0-9-]+) ([^\n]+)\n(.*?)^```\s*$",
                                text, re.S):
            kind, invariant, path, content = match.groups()
            number += 1
            line = text[:match.start()].count("\n") + 1
            case(f"case-{number:02d}-{kind}-{invariant}", invariant, path, content,
                 0 if kind == "good" else 1, f"{guideline}:{line}")
    assert number == 26, number


def breaks():
    # Derived independently from invariant sentences, never copied from bad blocks.
    items = [
        ("eslint-source-rules", "scripts/reviewer-suppression.mjs",
         "/* eslint-disable no-unused-vars */\nexport const value = 1;\n"),
        ("ruff-source-rules", "tests/quality/reviewer_suppression.py",
         "# ruff: noqa: F401\nVALUE = 2\n"),
        ("shellcheck-source-rules", "deploy/reviewer-directive",
         "#!/usr/bin/env bash\n# shellcheck disable=SC2086\nprintf '%s\\n' \"$1\"\n"),
        ("prettier-source-format", "tests/quality/reviewer-crlf.mjs",
         "export const value = 1;\r\n"),
        ("simulation-isolation", "src/browser/sim/reviewer-timer.ts",
         "export const timer = setTimeout(() => {}, 1);\n"),
        ("simulation-inputs", "src/browser/sim/reviewer-mutation.ts",
         "export function change(value: { paused?: boolean }): void {\n  value.paused = true;\n}\n"),
        ("browser-view-framework", "src/browser/view/reviewer-framework.ts",
         'import "vue";\nexport const label = "label";\n'),
        ("content-identifiers", "src/browser/view/reviewer-map.ts",
         'export const selectedMap = "forest";\n'),
        ("account-server-express-http", "src/server/reviewer-https.ts",
         'import * as https from "node:https";\nexport const server = https.createServer();\n'),
    ]
    for invariant, path, text in items:
        case("break-" + invariant, invariant, path, text, 1, "reviewer-authored from sentence")
    config = (SCRATCH / "eslint.config.mjs").read_text(encoding="utf-8")
    config = config.replace('  { ignores: excluded },',
                            '  { ignores: [...excluded, "src/server/app.ts"] },')
    case("break-eslint-configuration-rules", "eslint-configuration-rules",
         "eslint.config.mjs", config, 1, "reviewer-authored omission of an owned source")
    app = (SCRATCH / "src/server/app.ts").read_text(encoding="utf-8")
    app = app.replace('response.status(404).json({ error: "Not found" });',
                      'response.status(200).send("<html><body>fallback</body></html>");')
    assert 'status(200)' in app
    case("break-loop2-api-error-route", "loop2-api-error-route",
         "src/server/app.ts", app, 1, "reviewer-authored HTML-success fallback")
    general = (SCRATCH / "guidelines/coding.md").read_text(encoding="utf-8")
    case("break-guidelines-form", "guidelines-form", "guidelines/coding.md",
         general.replace("## Kinds of code", "## Code catalogue"), 1,
         "reviewer-authored removal of mandatory kind index heading")
    case("break-guidelines-reference-current", "guidelines-reference-current",
         "guidelines/coding.md", general.replace("D-32@7eedf283", "D-32@00000000"), 1,
         "reviewer-authored stale formatter reference")
    # A second vulnerable version, selected independently from the guideline version.
    lock = json.loads((SCRATCH / "tests/quality/fixtures/dependency-audit/package-lock.json")
                      .read_text(encoding="utf-8"))
    lock["packages"]["node_modules/minimist"]["version"] = "1.2.0"
    case("break-introduced-npm-vulnerabilities", "introduced-npm-vulnerabilities",
         "tests/quality/fixtures/dependency-audit/package-lock.json",
         json.dumps(lock, indent=2) + "\n", 1,
         "reviewer-authored change of companion dependency to minimist 1.2.0; real bulk service")
    # Make the listening Express process launch a second HTTP-serving child.
    main = (SCRATCH / "src/server/main.ts").read_text(encoding="utf-8")
    main = ('import { spawn } from "node:child_process";\n' + main
            + '\nspawn(process.execPath, ["--input-type=module", "-e", '
              '\'import {createServer} from "node:http"; createServer((q,r)=>r.end("extra"))'
              '.listen(0,"127.0.0.1");\'], { stdio: "ignore" });\n')
    case("break-loop2-one-serving-process", "loop2-one-serving-process",
         "src/server/main.ts", main, 1,
         "reviewer-authored second server child of Express listener")


def baselines(prefix):
    for invariant in ("eslint-source-rules", "eslint-configuration-rules",
                      "ruff-source-rules", "shellcheck-source-rules",
                      "prettier-source-format", "introduced-npm-vulnerabilities",
                      "guidelines-form", "guidelines-reference-current"):
        run(prefix + "-" + invariant, command(invariant), expected=0,
            invariant=invariant, source="unmodified final HEAD scratch")


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "setup":
        setup()
    else:
        existing = REPORTS / "final-review-executions.json"
        if existing.exists():
            RESULTS.extend(json.loads(existing.read_text(encoding="utf-8")))
        if mode == "cases":
            baselines("baseline")
            pairs()
            breaks()
            baselines("restored")
        else:
            raise ValueError(mode)
