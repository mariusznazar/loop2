"""Invariant simulation-inputs: No function that a file of the simulation exports changes a value
passed to it.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written). A Node script this check writes to a temporary directory imports every module
under `dist/public/sim/` and calls every function each one exports, through one checker: before a
call it takes a deep snapshot of every argument — every own key, its value, `undefined`, `NaN`,
`-0`, array lengths and the identity of functions included — and after the call, whether it
returned or threw, it takes the snapshot again; any difference is a change of a value passed.

Reading of the sentence:
- a value passed to it: every argument and everything reachable from it through own keys;
- changes: a key added, removed or given another value, at any depth.

Inputs (written out below, or reached by driving `game.js` from them):
- game states: a new game, the game after `setProgram`, after a send of the map `forest` with the
  archetype `elementalMage`, at every game minute of 170 minutes of a program using every
  condition kind and every action kind, paused, after real time, after a restart and after an end;
- for the functions of `game.js`: each of those states with programs, sends, real times, minutes
  and pause flags written out below;
- for the functions taking a map run: the map runs of those states, the map `forest` as the data
  module `maps.js` gives it, the conditions `always` and "fewer than N here" for each resource and
  N in 0, 1, 7, 50, the actions explore, wander and go to each resource, the programs below;
- for the hex functions: the tiles of the runs, their coordinates, predicates, sizes;
- for the random functions: seeds, real times and both streams;
- every exported function the table below does not name (a later one, for one) is called with
  every combination, up to 400 per function, of a pool of the values above, as many as its
  declared arity; errors it throws are allowed, changes are not.

Controls, so the check can fail: the same checker, given made-up functions that change a top-level
key of a state, push onto a program's rules, lower a tile's stock, delete a key, add a key set to
`undefined` and set a number to `NaN`, reports each; a made-up function that builds a new state
from its input without changing it is not reported. The run must also make more than 1000 calls
and call every function of the table at least once.

Does NOT cover: a change made later, after the function returned, through an object it kept;
inputs other than those above; values passed through `this` or closures.
"""

import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support

BUILT_DIRECTORY = "dist/public/sim"

# Every exported function this check calls with inputs chosen for it, by module.
TABLE = {
    "game.js": ["newGame", "setProgram", "send", "restart", "end", "setPaused", "passRealTime",
                "advanceMinutes"],
    "hex.js": ["offsetToAxial", "sameHex", "hexDistance", "tileAt", "neighbours", "nearestTile",
               "hexCenter", "hexCorners", "tileLabel"],
    "layout.js": ["drawLayout"],
    "program.js": ["conditionHolds", "walkTarget", "actionFeasible", "chooseActivity"],
    "random.js": ["nextRandom", "streamState", "mixSeed"],
    "run.js": ["newMapRun", "stepMinute"],
}

RESOURCES = ("stick", "berry", "moss", "fiber")
ALWAYS = {"kind": "always"}


def here_below(resource, value):
    return {"kind": "hereBelow", "resource": resource, "value": value}


ACTIONS = [{"kind": "explore"}, {"kind": "wander"}] + [
    {"kind": "walkTo", "resource": r} for r in RESOURCES]
CONDITIONS = [ALWAYS] + [here_below(r, v) for r in RESOURCES for v in (0, 1, 7, 50)]
PROGRAMS = [
    {"rules": []},
    {"rules": [
        {"condition": here_below("stick", 7), "action": {"kind": "explore"}},
        {"condition": ALWAYS, "action": {"kind": "walkTo", "resource": "berry"}},
        {"condition": here_below("moss", 50), "action": {"kind": "walkTo", "resource": "moss"}},
        {"condition": ALWAYS, "action": {"kind": "explore"}},
        {"condition": ALWAYS, "action": {"kind": "wander"}},
    ]},
    {"rules": [{"condition": ALWAYS, "action": {"kind": "wander"}}]},
]
SENT = {"mapId": "forest", "archetypeId": "elementalMage"}
T = 1760000000000
T_OTHER = 1760000123456
MINUTES = 170
SEEDS = [0, 1, 204219582, 4294967295]

INPUTS = {
    "actions": ACTIONS, "conditions": CONDITIONS, "programs": PROGRAMS, "sent": SENT,
    "t": T, "tOther": T_OTHER, "minutes": MINUTES, "seeds": SEEDS, "resources": list(RESOURCES),
    "streams": ["layout", "wander"], "realMs": [0, 999, 1000, 61000], "advance": [0, 1, 25],
    "sizes": [1, 24], "offsets": [[0, 0], [1, 1], [3, 2], [-1, 5]],
}

DRIVER = r"""
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const [simDirectory, inputsPath, outPath] = process.argv.slice(2);
const I = JSON.parse(readFileSync(inputsPath, 'utf8'));
const clone = (v) => JSON.parse(JSON.stringify(v));

// A deep snapshot: every own key and value, with undefined, NaN, -0 and functions told apart.
const functions = new Map();
const snapshot = (value, seen = new Set()) => {
  if (value === undefined) return ['undefined'];
  if (value === null) return ['null'];
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return ['NaN'];
    if (Object.is(value, -0)) return ['-0'];
    return ['number', value];
  }
  if (typeof value === 'function') {
    if (!functions.has(value)) functions.set(value, functions.size);
    return ['function', functions.get(value)];
  }
  if (typeof value !== 'object') return [typeof value, String(value)];
  if (seen.has(value)) return ['cycle'];
  seen.add(value);
  const keys = Reflect.ownKeys(value).map(String).sort();
  const out = [Array.isArray(value) ? 'array' : 'object', Object.isFrozen(value)];
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    out.push(key, 'value' in descriptor ? snapshot(descriptor.value, seen) : ['accessor']);
  }
  seen.delete(value);
  return out;
};

const report = { calls: {}, changes: [], controls: {}, total: 0, unknown: [] };
const check = (label, fn, args) => {
  const before = args.map((a) => JSON.stringify(snapshot(a)));
  let threw = null;
  try { fn(...args); } catch (error) { threw = error; }
  const after = args.map((a) => JSON.stringify(snapshot(a)));
  report.calls[label] = (report.calls[label] || 0) + 1;
  report.total += 1;
  const changed = [];
  for (let i = 0; i < args.length; i += 1) if (before[i] !== after[i]) changed.push(i);
  if (changed.length && report.changes.length < 50) {
    report.changes.push({ label, changed, args: JSON.stringify(args).slice(0, 400) });
  }
  return changed.length > 0;
};

// --- controls of the checker ---
const makeState = () => ({ program: { rules: [{ condition: { kind: 'always' }, action: { kind: 'wander' } }] },
  run: { tiles: [{ at: { q: 0, r: 0 }, stock: { stick: 3 } }], minute: 1 }, paused: false, lastSeed: 1 });
const controls = {
  topLevel: (s) => { s.paused = !s.paused; return s; },
  pushRule: (s) => { s.program.rules.push(s.program.rules[0]); },
  lowerStock: (s) => { s.run.tiles[0].stock.stick -= 1; },
  deleteKey: (s) => { delete s.lastSeed; },
  addUndefined: (s) => { s.extra = undefined; },
  setNaN: (s) => { s.run.minute = NaN; },
  pure: (s) => ({ ...s, paused: !s.paused, run: { ...s.run, minute: s.run.minute + 1 } }),
};
for (const [name, fn] of Object.entries(controls)) {
  const saved = report.changes.length;
  report.controls[name] = check('control ' + name, fn, [makeState()]);
  report.changes.length = saved;
  delete report.calls['control ' + name];
  report.total -= 1;
}

// --- the modules ---
const modules = {};
const walk = (directory) => {
  for (const name of readdirSync(directory).sort()) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.m?js$/.test(name)) modules[relative(simDirectory, path).replace(/\\/g, '/')] = path;
  }
};
walk(simDirectory);
const ns = {};
for (const [name, path] of Object.entries(modules)) ns[name] = await import(pathToFileURL(path).href);
const exported = {};
for (const [name, m] of Object.entries(ns)) {
  exported[name] = Object.keys(m).filter((k) => typeof m[k] === 'function').sort();
}
report.exported = exported;

const g = ns['game.js'];
const MAP = ns['data/maps.js'].MAPS.forest;
const call = (module, name, args) => check(module + ' ' + name, ns[module][name], args);

// Game states along a scenario, each kept as its own object.
const states = [];
let state = g.newGame();
states.push(state);
state = g.setProgram(state, clone(I.programs[1])).state; states.push(state);
state = g.send(state, clone(I.sent), I.t).state; states.push(state);
for (let m = 0; m < I.minutes; m += 1) { state = g.advanceMinutes(state, 1).state; states.push(state); }
state = g.passRealTime(state, 6000).state; states.push(state);
state = g.setPaused(state, true).state; states.push(state);
state = g.passRealTime(state, 5000).state; states.push(state);
state = g.setPaused(state, false).state; states.push(state);
state = g.restart(state).state; states.push(state);
state = g.advanceMinutes(state, 40).state; states.push(state);
const ended = g.end(state).state; states.push(ended);
const runs = states.filter((s) => s.run).map((s) => s.run);
const sample = (list, count) => list.filter((_, i) => i % Math.max(1, Math.floor(list.length / count)) === 0);

// game.js
call('game.js', 'newGame', []);
for (const s of sample(states, 40)) {
  for (const p of I.programs) call('game.js', 'setProgram', [s, clone(p)]);
  call('game.js', 'send', [s, clone(I.sent), I.t]);
  call('game.js', 'send', [s, clone(I.sent), I.tOther]);
  call('game.js', 'restart', [s]);
  call('game.js', 'end', [s]);
  call('game.js', 'setPaused', [s, true]);
  call('game.js', 'setPaused', [s, false]);
  for (const ms of I.realMs) call('game.js', 'passRealTime', [s, ms]);
  for (const minutes of I.advance) call('game.js', 'advanceMinutes', [s, minutes]);
}
// hex.js
for (const [col, row] of I.offsets) call('hex.js', 'offsetToAxial', [col, row]);
const predicates = [(t) => t.revealed, () => true, () => false, (t) => (t.stock.berry || 0) > 0];
for (const run of sample(runs, 30)) {
  const tiles = run.tiles;
  const from = run.character.at;
  for (const tile of tiles) {
    call('hex.js', 'sameHex', [from, tile.at]);
    call('hex.js', 'hexDistance', [from, tile.at]);
    call('hex.js', 'tileAt', [tiles, tile.at]);
    call('hex.js', 'neighbours', [tiles, tile.at]);
    call('hex.js', 'tileLabel', [tile]);
    for (const size of I.sizes) call('hex.js', 'hexCenter', [tile.at, size]);
  }
  for (const p of predicates) call('hex.js', 'nearestTile', [tiles, from, p]);
}
for (const size of I.sizes) call('hex.js', 'hexCorners', [size]);
// layout.js, random.js, run.js
for (const seed of I.seeds) {
  call('layout.js', 'drawLayout', [MAP, seed]);
  call('random.js', 'nextRandom', [seed]);
  for (const stream of I.streams) call('random.js', 'streamState', [seed, stream]);
  for (const ms of [I.t, I.tOther]) call('random.js', 'mixSeed', [seed, ms]);
  for (const p of I.programs) call('run.js', 'newMapRun', [MAP, seed, clone(p), clone(I.sent)]);
}
for (const run of sample(runs, 60)) {
  for (const p of I.programs) {
    call('run.js', 'stepMinute', [run, MAP, clone(p)]);
    call('program.js', 'chooseActivity', [run, MAP, clone(p)]);
  }
  for (const c of I.conditions) call('program.js', 'conditionHolds', [run, MAP, clone(c)]);
  for (const a of I.actions) call('program.js', 'actionFeasible', [run, MAP, clone(a)]);
  for (const r of I.resources) call('program.js', 'walkTarget', [run, r]);
}
// The program and the map kept across calls: pass the same objects many times.
const shared = clone(I.programs[1]);
for (const run of sample(runs, 20)) call('run.js', 'stepMinute', [run, MAP, shared]);

// Every exported function not named in the table: a pool of values, combined.
const table = JSON.parse(process.argv[5]);
const pool = [states[0], states[2], states[states.length - 2], ended, runs[0], runs[runs.length - 1],
  MAP, clone(I.programs[1]), clone(I.sent), runs[0].tiles, runs[0].character.at, clone(I.conditions[1]),
  clone(I.actions[2]), 'berry', 'wander', 0, 1, I.t, true, (t) => t.revealed];
for (const [module, names] of Object.entries(exported)) {
  for (const name of names) {
    if ((table[module] || []).includes(name)) continue;
    report.unknown.push(module + ' ' + name);
    const arity = Math.min(ns[module][name].length, 4);
    let made = 0;
    const combine = (prefix) => {
      if (made >= 400) return;
      if (prefix.length === arity) { made += 1; call(module, name, prefix); return; }
      for (const value of pool) combine([...prefix, value]);
    };
    combine([]);
  }
}
writeFileSync(outPath, JSON.stringify(report));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def drive():
    copy = support.built_copy()
    directory = copy.file(BUILT_DIRECTORY)
    if not os.path.isfile(os.path.join(directory, "game.js")):
        raise AssertionError(f"`npm run build` placed no {BUILT_DIRECTORY}/game.js")
    work = tempfile.mkdtemp(prefix="loop2-inputs-")
    try:
        script = os.path.join(work, "driver.mjs")
        inputs = os.path.join(work, "inputs.json")
        out_path = os.path.join(work, "report.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(inputs, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(INPUTS, handle)
        code, output = support.run([node(), script, directory, inputs, out_path,
                                    json.dumps(TABLE)], work)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(work, ignore_errors=True)


_report = {}


def report():
    if "value" not in _report:
        _report["value"] = drive()
    return _report["value"]


class SimulationInputs(unittest.TestCase):

    def test_no_exported_function_changes_its_arguments(self):
        # invariant: simulation-inputs
        result = report()
        self.assertEqual(result["changes"], [], "an exported function of the simulation "
                                                "changed a value passed to it")
        for module, names in TABLE.items():
            for name in names:
                self.assertGreater(result["calls"].get(f"{module} {name}", 0), 0,
                                   f"{module} {name} was never called")
        self.assertGreater(result["total"], 1000, "the run made too few calls to mean much")

    def test_control_the_checker_sees_each_kind_of_change(self):
        # invariant: simulation-inputs
        controls = report()["controls"]
        for name in ("topLevel", "pushRule", "lowerStock", "deleteKey", "addUndefined",
                     "setNaN"):
            self.assertIs(controls.get(name), True,
                          f"the checker misses the change the made-up function {name} makes")
        self.assertIs(controls.get("pure"), False,
                      "the checker reports a made-up function that changes nothing")


if __name__ == "__main__":
    unittest.main()
