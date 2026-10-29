from pathlib import Path
import subprocess

root = Path.cwd()
records = root / ".runs/task-cycles/plan-wyprawy"
game_path = root / "src/browser/sim/game.ts"
program_path = root / "src/browser/sim/programs.ts"
game = game_path.read_text(encoding="utf-8")
program = program_path.read_text(encoding="utf-8")
try:
    broken = game.replace("const deposited = completed ? tripLoot(endedRun, current.team.chest, map) : null;", "const deposited = tripLoot(endedRun, current.team.chest, map);")
    assert broken != game
    game_path.write_text(broken, encoding="utf-8", newline="\n")
    broken = program.replace("const zeroed = !mapRunEnded(run) && ruleContentChanged;", "const zeroed = !mapRunEnded(run) && (ruleContentChanged || !sameData(previous, program));")
    assert broken != program
    program_path.write_text(broken, encoding="utf-8", newline="\n")
    with (records / "trip-invariants-red.log").open("w", encoding="utf-8") as out:
        red = subprocess.run(["npm.cmd", "test", "--", "tests/sim/trip.test.mjs"], stdout=out, stderr=subprocess.STDOUT, check=False).returncode
    print(f"npm test -- tests/sim/trip.test.mjs (temporary broken completion gate and progress): {red}")
    assert red == 1
finally:
    game_path.write_text(game, encoding="utf-8", newline="\n")
    program_path.write_text(program, encoding="utf-8", newline="\n")
with (records / "trip-invariants-green.log").open("w", encoding="utf-8") as out:
    green = subprocess.run(["npm.cmd", "test", "--", "tests/sim/trip.test.mjs"], stdout=out, stderr=subprocess.STDOUT, check=False).returncode
print(f"npm test -- tests/sim/trip.test.mjs (restored): {green}")
assert green == 0
