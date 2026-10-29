from pathlib import Path
import subprocess

records = Path(".runs/task-cycles/plan-wyprawy")
mutations = [
    ("closed", "src/browser/sim/programs.ts", "tests/invariants/test_program_closed_lists.py",
     'throw new Error(\n        `program: condition kind ${String(value.kind)} is not on the closed list`,\n      );',
     'return value as unknown as Condition;'),
    ("pick", "src/browser/sim/program.ts", "tests/invariants/test_program_rule_pick.py",
     'case "always":\n      return true;', 'case "always":\n      return false;'),
]
for name, path, test, old, new in mutations:
    source = Path(path)
    original = source.read_text(encoding="utf-8")
    assert old in original
    try:
        source.write_text(original.replace(old, new, 1), encoding="utf-8", newline="\n")
        with (records / f"{name}-invariant-red.log").open("w", encoding="utf-8") as out:
            code = subprocess.run(["npm.cmd", "test", "--", test], stdout=out, stderr=subprocess.STDOUT, check=False).returncode
        print(f"npm test -- {test} (temporary broken behaviour): {code}")
        assert code == 1
    finally:
        source.write_text(original, encoding="utf-8", newline="\n")
    with (records / f"{name}-invariant-green.log").open("w", encoding="utf-8") as out:
        code = subprocess.run(["npm.cmd", "test", "--", test], stdout=out, stderr=subprocess.STDOUT, check=False).returncode
    print(f"npm test -- {test} (restored): {code}")
    assert code == 0
