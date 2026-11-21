"""Mutation probes of the review rcg: each mutation is applied to one file of the review worktree,
one focused test file is run, and the file is restored byte for byte. Output goes to mutate-out.txt."""

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(".runs/review-rcg/wt")
OUT = Path(".runs/review-rcg/mutate-out.txt")

MUTATIONS = [
    (
        "startFrom refused load makes a game with no moment",
        "src/browser/view/app.ts",
        ": { state: newGame(Date.now()), revision, refused: loaded.reason }",
        ": { state: newGame(), revision, refused: loaded.reason }",
        "tests/view/judging-cache-page.test.mjs",
    ),
    (
        "reset of D-402 makes a game with no moment",
        "src/browser/view/page-game-acts.ts",
        "{ state: newGame(Date.now()), revision: 0, refused: null },",
        "{ state: newGame(), revision: 0, refused: null },",
        "tests/view/judging-cache-page.test.mjs",
    ),
    (
        "cache opened under another account id",
        "src/browser/view/game-view.ts",
        "accountId: options.accountId,",
        'accountId: "x",',
        "tests/view/judging-cache-page.test.mjs",
    ),
    (
        "link of the run sentence leads to the row's character",
        "src/browser/view/maps-screen.tsx",
        "runCharacterId={run.character.id}",
        "runCharacterId={id}",
        "tests/view/maps-screen.test.mjs",
    ),
    (
        "mark stands for a record of a lower generation",
        "src/browser/sim/judging-record.ts",
        "character.generation !== record.generation",
        "character.generation < record.generation",
        "tests/sim/judging-record.test.mjs",
    ),
    (
        "mark stands for a record of a lower content revision",
        "src/browser/sim/judging-record.ts",
        "saved.contentRevision !== record.contentRevision",
        "saved.contentRevision < record.contentRevision",
        "tests/sim/judging-record.test.mjs",
    ),
    (
        "maps screen reads the record once at build, not at each draw",
        "src/browser/view/maps-entry.ts",
        "readRecord: (ids: JudgingIds) => judgingCache?.read(ids) ?? null,",
        "readRecord: frozenReader,",
        "tests/view/maps-screen.test.mjs",
    ),
]


def run(test: str) -> tuple[int, str]:
    done = subprocess.run(
        ["npm.cmd", "test", "--", test],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
    )
    text = done.stdout + done.stderr
    counts = " ".join(re.findall(r"\u2139 (?:tests|pass|fail) [0-9]+", text))
    fails = re.findall(r"not ok \d+ - (.*)", text)
    return done.returncode, counts + " | first failing: " + (fails[0] if fails else "-")


def main() -> int:
    lines = []
    for name, rel, old, new, test in MUTATIONS:
        path = ROOT / rel
        original = path.read_bytes()
        source = original.decode("utf-8")
        if source.count(old) != 1:
            lines.append(f"{name}: target found {source.count(old)} times, skipped")
            continue
        mutated = source.replace(old, new)
        if new == "readRecord: frozenReader,":
            # Read every record once, when the entry builds, and answer from that snapshot afterwards.
            mutated = mutated.replace(
                "      let disposed = false;\n",
                "      let disposed = false;\n"
                "      const snapshot = new Map<string, ReturnType<NonNullable<typeof judgingCache>['read']>>();\n"
                "      const frozenReader = (ids: JudgingIds) => {\n"
                "        const key = JSON.stringify(ids);\n"
                "        if (!snapshot.has(key)) snapshot.set(key, judgingCache?.read(ids) ?? null);\n"
                "        return snapshot.get(key) ?? null;\n"
                "      };\n",
                1,
            )
        try:
            path.write_bytes(mutated.encode("utf-8"))
            code, summary = run(test)
        finally:
            path.write_bytes(original)
        lines.append(f"{name} [{rel} -> {test}]: exit {code}; {summary}")
    code, summary = run("tests/sim/judging-record.test.mjs")
    lines.append(f"control, all restored [judging-record]: exit {code}; {summary}")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("done", len(lines))
    return 0


if __name__ == "__main__":
    sys.exit(main())
