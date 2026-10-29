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
- game states: a new game, the game after `setProgram` on it, the fully knowing game (as
  `KNOWING_GAME_JS` in `program_fixture.py` gives it, from which the rest of the scenario goes on),
  the game after `setProgram`, after a character created, after a send
  of that character to the map `forest`, at every game minute of 240 minutes of a program using
  every condition kind and every action kind (sent at the real time T, on which it gathers, eats,
  builds a campfire and lights it within those minutes, and stays alive), paused, after real time,
  after a restart and after an end;
- for the functions of `game.js`: each of those states with names typed for a new character,
  programs, sends, real times, minutes and pause flags written out below;
- for `canSendMap`: solved-map lists with a map that has no prerequisite and one whose prerequisite
  is either absent or present;
- for the functions taking a map run: the map runs of those states, a successful combat resolution,
  a selected combat rule, and a completed combat minute, plus copies of some runs
  with a stick burning on the character's tile, with a body one game minute from death and with
  the character dead; the map `forest` as the data module `maps.js` gives it; conditions of every
  kind of the closed list (`always`, "fewer than N here" for each resource and N in 0, 1, 7, 50,
  the body's, the backpack's for each item, the campfire's), actions of every kind (explore,
  wander, go to and gather each resource, every action on the campfire and the backpack), and the
  programs below;
- for the functions of the body, the backpack, the world and the program's helpers: the bodies,
  backpacks, characters and campfires of those map runs, warmths, satieties, minutes, the uses of
  an item and the kinds of condition;
- for the hex functions: the tiles of the runs, their coordinates, predicates, sizes;
- for the random functions: seeds, real times and every stream: layout, wander and gathering;
- every exported function the table below does not name (a later one, for one) is called with
  every combination, up to 400 per function, of a pool of the values above, as many as its
  declared arity; errors it throws are allowed, changes are not.

Controls, so the check can fail: the same checker, given made-up functions that change a top-level
key of a state, push onto a program's rules, lower a tile's stock, delete a key, add a key set to
`undefined` and set a number to `NaN`, reports each; the made-up state has the shape of the game
state, a list of programs and a map run carrying the copy of its program (D-152), and a push onto
the rules of a program of the list and a push onto the rules of the copy are each reported; a
made-up function that builds a new state from its input without changing it is not reported. The run must also make more than 1000 calls
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
from program_fixture import KNOWING_GAME_JS, program_from_rules

BUILT_DIRECTORY = "dist/public/sim"

# Every exported function this check calls with inputs chosen for it, by module.
TABLE = {
    "game.js": ["newGame", "characterName", "createCharacter", "setProgram", "send", "canSendMap", "restart",
                "end", "setPaused", "passRealTime", "advanceMinutes"],
    "hex.js": ["offsetToAxial", "sameHex", "hexDistance", "tileAt", "neighbours", "nearestTile",
               "hexCenter", "hexCorners", "tileLabel"],
    "layout.js": ["drawLayout"],
    "program.js": ["conditionHolds", "walkTarget", "actionFeasible", "chooseActivity",
                   "chooseCombatRule",
                   "conditionNumber", "onStep", "itemFor", "campfireTarget"],
    "random.js": ["nextRandom", "streamState", "mixSeed"],
    "run.js": ["newMapRun", "stepMinute", "finishMinute"],
    "combat.js": ["resolveCombat"],
    "body.js": ["startingBody", "eatenBody", "bodyMinute"],
    "character.js": ["newTraits", "newBackpack", "backpackCount", "backpackCap"],
    "world.js": ["warmthAt", "worldMinute"],
}

RESOURCES = ("stick", "berry", "moss", "fiber")
ITEMS = RESOURCES  # the items of the backpack are the resources of Las
ALWAYS = {"kind": "always"}
AWAY = {"kind": "awayFromCampfire"}


def here_below(resource, value):
    return {"kind": "hereBelow", "resource": resource, "value": value}


def below(kind, value):
    return {"kind": kind, "value": value}


def item_below(item, value):
    return {"kind": "itemBelow", "item": item, "value": value}


def rule(condition, action):
    return {"condition": condition, "action": action}


def gather(resource):
    return {"kind": "gather", "resource": resource}


def walk_to(resource):
    return {"kind": "walkTo", "resource": resource}


CAMPFIRE_ACTIONS = [{"kind": kind} for kind in (
    "walkToCampfire", "craftCampfire", "lightCampfire", "lightItem", "feedCampfire", "eat")]
ACTIONS = ([{"kind": "explore"}, {"kind": "wander"}] + [walk_to(r) for r in RESOURCES]
           + [gather(r) for r in RESOURCES] + CAMPFIRE_ACTIONS)
CONDITIONS = ([ALWAYS] + [here_below(r, v) for r in RESOURCES for v in (0, 1, 7, 50)]
              + [below("temperatureBelow", v) for v in (30, 35.2, 36.5, 37)]
              + [below("satietyBelow", v) for v in (0, 30, 50, 100)]
              + [item_below(i, v) for i in ITEMS for v in (0, 1, 8)]
              + [below("campfireLeftBelow", v) for v in (0, 1, 20, 120)] + [AWAY])
CONDITION_KINDS = ["always", "hereBelow", "temperatureBelow", "satietyBelow", "itemBelow",
                   "campfireLeftBelow", "awayFromCampfire"]
PROGRAMS = [
    program_from_rules([]),
    # Every condition kind and every action kind: the acceptance program of
    # tests/sim/acceptance.test.mjs.
    program_from_rules([
        rule(below("satietyBelow", 35), {"kind": "eat"}),
        rule(below("temperatureBelow", 36), {"kind": "lightCampfire"}),
        rule(below("temperatureBelow", 36.5), {"kind": "feedCampfire"}),
        rule(below("temperatureBelow", 35.2), {"kind": "walkToCampfire"}),
        rule(below("campfireLeftBelow", 1), {"kind": "craftCampfire"}),
        rule(item_below("berry", 1), gather("berry")),
        rule(item_below("berry", 1), walk_to("berry")),
        rule(here_below("berry", 1), {"kind": "explore"}),
        rule(item_below("berry", 1), {"kind": "wander"}),
        rule(item_below("stick", 8), gather("stick")),
        rule(item_below("stick", 8), walk_to("stick")),
        rule(below("temperatureBelow", 36), {"kind": "lightItem"}),
        rule(ALWAYS, {"kind": "explore"}),
        rule(AWAY, {"kind": "walkToCampfire"}),
        rule(ALWAYS, gather("stick")),
        rule(ALWAYS, gather("berry")),
        rule(ALWAYS, {"kind": "wander"}),
    ]),
    program_from_rules([rule(ALWAYS, {"kind": "wander"})]),
]
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}
# Names typed for a new character: plain, with white space around it, and empty once trimmed.
NAMES = ["Ala", "  Ola ", "", "   "]
# On this real time the program above builds its campfire by game minute 140 and lights it by 190.
T = 1760000800000
T_OTHER = 1760000123456
MINUTES = 240
SEEDS = [0, 1, 204219582, 4294967295]

INPUTS = {
    "actions": ACTIONS, "conditions": CONDITIONS, "programs": PROGRAMS, "sent": SENT,
    "names": NAMES,
    "t": T, "tOther": T_OTHER, "minutes": MINUTES, "seeds": SEEDS, "resources": list(RESOURCES),
    "streams": ["layout", "wander", "gather"], "realMs": [0, 999, 1000, 61000],
    "advance": [0, 1, 25], "sizes": [1, 24], "offsets": [[0, 0], [1, 1], [3, 2], [-1, 5]],
    "conditionKinds": CONDITION_KINDS, "uses": ["fuel", "food", "lightable"],
    "warmths": [0, 0.15, 0.5, 0.65], "satieties": [0, 25], "renewalMinutes": [1, 119, 120],
}

DRIVER = KNOWING_GAME_JS + r"""
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

const report = { calls: {}, changes: [], controls: {}, successes: {}, errors: {}, total: 0, unknown: [] };
const check = (label, fn, args) => {
  const before = args.map((a) => JSON.stringify(snapshot(a)));
  let threw = null;
  try { fn(...args); } catch (error) { threw = error; }
  const after = args.map((a) => JSON.stringify(snapshot(a)));
  report.calls[label] = (report.calls[label] || 0) + 1;
  if (!threw) report.successes[label] = (report.successes[label] || 0) + 1;
  else report.errors[label] = String(threw.message ?? threw);
  report.total += 1;
  const changed = [];
  for (let i = 0; i < args.length; i += 1) if (before[i] !== after[i]) changed.push(i);
  if (changed.length && report.changes.length < 50) {
    report.changes.push({ label, changed, args: JSON.stringify(args).slice(0, 400) });
  }
  return changed.length > 0;
};

// --- controls of the checker (not passed to the product) ---
// A made-up state of the shape of the game state: the player's list of programs and a map run
// carrying its copy (D-152).
const makeProgram = () => ({ groups: [{ id: 1, name: 'Program', condition: { kind: 'always' },
  rules: [{ id: 1, condition: { kind: 'always' }, action: { kind: 'wander' } }] }],
  nextGroupId: 2, nextRuleId: 2 });
const makeState = () => ({ programs: [{ id: 1, name: 'Program', program: makeProgram() }],
  run: { tiles: [{ at: { q: 0, r: 0 }, stock: { stick: 3 } }], minute: 1,
    copy: { program: makeProgram(), programId: 1, deletedName: null, base: makeProgram() } },
  paused: false, lastSeed: 1 });
const controls = {
  topLevel: (s) => { s.paused = !s.paused; return s; },
  pushRule: (s) => { s.programs[0].program.groups[0].rules.push(s.programs[0].program.groups[0].rules[0]); },
  pushCopyRule: (s) => { s.run.copy.program.groups[0].rules.push(s.run.copy.program.groups[0].rules[0]); },
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
const newGame = g.newGame();
states.push(newGame);
states.push(g.setProgram(newGame, clone(I.programs[1])).state);
// The scenario goes on from the game that knows everything, beside the new game above.
let state = await newKnowingGame(g, join(simDirectory, 'game.js'));
states.push(state);
state = g.setProgram(state, clone(I.programs[1])).state; states.push(state);
state = g.createCharacter(state, I.names[0]).state; states.push(state);
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
// Copies of runs reaching what the scenario does not: a stick burning on the character's tile, a
// body one game minute from death, a dead character.
const withCampfire = runs.filter((run) => run.campfires.length > 0);
for (const run of [runs[5], withCampfire[withCampfire.length - 1]]) {
  const at = clone(run.character.at);
  runs.push({ ...clone(run), burningItems: [{ item: 'stick', at, minutesLeft: 1 },
    { item: 'stick', at, minutesLeft: 3 }] });
  runs.push({ ...clone(run), body: { temperature: 34.9, satiety: 29.5, health: 0.5 } });
  runs.push({ ...clone(run), death: { minute: run.minute, cause: 'cold' } });
}
const sample = (list, count) => list.filter((_, i) => i % Math.max(1, Math.floor(list.length / count)) === 0);

// game.js
call('game.js', 'newGame', []);
for (const name of I.names) call('game.js', 'characterName', [name]);
for (const s of sample(states, 40)) {
  for (const name of I.names) call('game.js', 'createCharacter', [s, name]);
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
call('game.js', 'canSendMap', [[], 'forest']);
call('game.js', 'canSendMap', [[], 'forestDeep']);
call('game.js', 'canSendMap', [['forest'], 'forestDeep']);
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
// Successful frozen-input calls exercise the public combat operations beyond rejected input.
const combatProgram = { groups: [{ condition: { kind: "always" }, rules: [
  { id: 701, condition: { kind: "always" }, action: { kind: "kick" } },
]}] };
const combatMap = ns["data/maps.js"].MAPS.forestDeep;
const combatRun = {
  ...ns["run.js"].newMapRun(combatMap, 17, combatProgram,
    { mapId: "forestDeep", characterId: 1 }).run,
  minute: 5,
  current: null,
  activeCombat: { creatureId: "wolf", attackMinute: 1, resolveMinute: 5 },
};
call("combat.js", "resolveCombat", [combatRun, combatMap, "wolf", clone(combatProgram)]);
call("program.js", "chooseCombatRule", [combatRun, combatMap, clone(combatProgram), 100, 20]);
call("run.js", "finishMinute", [{ run: combatRun, events: [], picks: false }, combatMap,
  clone(combatProgram)]);
for (const run of sample(runs, 60)) {
  for (const p of I.programs) {
    call('run.js', 'stepMinute', [run, MAP, clone(p)]);
    call('program.js', 'chooseActivity', [run, MAP, clone(p)]);
  }
  for (const c of I.conditions) call('program.js', 'conditionHolds', [run, MAP, clone(c)]);
  for (const a of I.actions) call('program.js', 'actionFeasible', [run, MAP, clone(a)]);
  for (const r of I.resources) call('program.js', 'walkTarget', [run, r]);
}
// body.js, character.js, world.js and the program's helpers
call('body.js', 'startingBody', []);
call('character.js', 'newTraits', []);
call('character.js', 'newBackpack', []);
for (const run of sample(runs, 60).concat(runs.slice(-6))) {
  for (const satiety of I.satieties) call('body.js', 'eatenBody', [run.body, satiety]);
  for (const warmth of I.warmths) call('body.js', 'bodyMinute', [run.body, warmth, MAP]);
  call('character.js', 'backpackCount', [run.character.backpack]);
  call('character.js', 'backpackCap', [run.character]);
  call('world.js', 'warmthAt', [run, run.character.at]);
  for (const campfire of run.campfires) call('world.js', 'warmthAt', [run, campfire.at]);
  for (const minute of I.renewalMinutes) call('world.js', 'worldMinute', [run, MAP, minute]);
  call('world.js', 'worldMinute', [run, MAP, run.minute + 1]);
  call('program.js', 'campfireTarget', [run]);
  for (const use of I.uses) call('program.js', 'itemFor', [run.character.backpack, use]);
}
for (const kind of I.conditionKinds) {
  call('program.js', 'conditionNumber', [kind]);
  const number = ns['program.js'].conditionNumber(kind);
  if (number) {
    for (const value of [number.min, number.defaultValue, 36.55]) {
      call('program.js', 'onStep', [value, number]);
    }
  }
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
        for label in ("combat.js resolveCombat", "program.js chooseCombatRule",
                      "run.js finishMinute"):
            self.assertGreater(result["successes"].get(label, 0), 0,
                               f"{label} had no successful frozen-input call: "
                               f"{result['errors'].get(label)}")
        self.assertGreater(result["total"], 1000, "the run made too few calls to mean much")

    def test_control_the_checker_sees_each_kind_of_change(self):
        # invariant: simulation-inputs
        controls = report()["controls"]
        for name in ("topLevel", "pushRule", "pushCopyRule", "lowerStock", "deleteKey", "addUndefined",
                     "setNaN"):
            self.assertIs(controls.get(name), True,
                          f"the checker misses the change the made-up function {name} makes")
        self.assertIs(controls.get("pure"), False,
                      "the checker reports a made-up function that changes nothing")


if __name__ == "__main__":
    unittest.main()
