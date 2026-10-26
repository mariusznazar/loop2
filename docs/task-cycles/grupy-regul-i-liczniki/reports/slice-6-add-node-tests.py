from pathlib import Path
p = Path('tests/sim/program.test.mjs')
with p.open(encoding='utf-8', newline='') as handle:
    text = handle.read()
ending = '\r\n' if '\r\n' in text else '\n'
new_import = 'import { newGame, setProgram, createCharacter, send, advanceMinutes } from "../../dist/public/sim/game.js";'
addition = Path('.runs/task-cycles/grupy-regul-i-liczniki/reports/slice-6-node-tests.txt').read_text(encoding='utf-8-sig')
with p.open('w', encoding='utf-8', newline='') as handle:
    handle.write(new_import + ending + text + ending + addition.replace('\n', ending))
