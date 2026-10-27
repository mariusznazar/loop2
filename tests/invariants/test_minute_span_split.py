"""Invariant minute-span-split: A map run advanced by a span of game minutes reaches the same game
state, with the same events in the same order, at every game minute, however the span is split
into calls of the simulation, up to and including the character's death.

The simulation is built by `npm run build` in a temporary copy of the working tree (the real tree
is never written) and driven through its public functions in `dist/public/sim/game.js` by a Node
script this check writes to a temporary directory: `newGame`, `setProgram`, `createCharacter`,
`send`, `advanceMinutes` and `passRealTime`, each returning `{state, events}`. After every call
the script records the JSON of the whole game state and the events that call gave.
The new game of each sent character is one whose Understanding holds everything the built data
modules list, as `KNOWING_GAME_JS` in `program_fixture.py` gives it, so that the rules of the
program stay what the check drives.

Reading of the sentence:
- a span of game minutes: the SPAN minutes after a send to the map Las (`forest`) of a character
  created in a new game, of the archetype `elementalMage`, at the real time and with the program
  of a scenario below;
- calls of the simulation: the calls that pass game minutes, `advanceMinutes(state, n)` and
  `passRealTime(state, ms)` (1000 ms of real time is one game minute);
- the same game state at every game minute: one minute a call is the reference; for every other
  split, after each call the state equals the reference's state at the game minute the call
  reached, and the events of the call are, in order, the reference's events of the game minutes
  from the one after the previous call's to that one. A split of real time into pieces that are
  not whole seconds leaves real time not yet turned into a game minute in `realMsCarry`; that
  carry belongs to the split, not to a game minute, so for such a split the state is compared less
  `realMsCarry`; everything else is compared whole;
- up to and including death: in the scenarios where the character dies, the spans reach past the
  death minute; every call from there on must give the state of the death minute and no events.

Scenarios (the program ACCEPTANCE is the one of `tests/sim/acceptance.test.mjs`):
- ALIVE: ACCEPTANCE sent at ALIVE_REAL_MS, 480 game minutes; it gathers, eats, builds, lights and
  feeds a campfire and stays alive;
- DIES_IDLE: the empty program sent at ALIVE_REAL_MS, 300 game minutes; it dies in minute 243;
- DIES_BUSY: ACCEPTANCE sent at T, 400 game minutes; it gathers, eats and builds a campfire and
  dies before minute 400.

Splits, written out below: one call for the whole span; calls of 2 minutes, 1 then 2 minutes, 3,
7 and 60 minutes; calls of growing sizes 1, 2, 3, 5, 8, ...; passRealTime in whole seconds of
uneven sizes; passRealTime in pieces of 1500 ms.

Controls, so the check can fail: the comparison flags made-up records with a changed field of the
state, an event left out, two events swapped, an event added and a changed carry where the carry
is compared; the splits together end a call at every game minute of each span; ALIVE ends a
gathering, an eating, a crafting, a lighting and a feeding of a campfire and is alive at its last
minute; DIES_IDLE dies in minute 243 and DIES_BUSY before its span ends, after a gathering, an
eating and a crafting.

Does NOT cover: maps, archetypes, programs and seeds other than these; a program changed, a
pause or a restart within the span; the browser view's clock.
"""

import copy as copying
import json
import os
import shutil
import tempfile
import unittest

import loop2_invariant_support as support
from program_fixture import KNOWING_GAME_JS, program_from_rules

GAME_MODULE = "dist/public/sim/game.js"
# The map sent to, as the data files name it (D-18), and the character sent: the first one a
# new game creates, which takes the id 1.
SENT = {"mapId": "forest", "characterId": 1}

# Real times, in ms, given to `send`; the seed derives from them.
ALIVE_REAL_MS = 1760000800000
T = 1760000000000


def rule(condition, action):
    return {"condition": condition, "action": action}


def below(kind, value):
    return {"kind": kind, "value": value}


def item_below(item, value):
    return {"kind": "itemBelow", "item": item, "value": value}


ALWAYS = {"kind": "always"}
AWAY = {"kind": "awayFromCampfire"}


def gather(resource):
    return {"kind": "gather", "resource": resource}


def walk_to(resource):
    return {"kind": "walkTo", "resource": resource}


# The acceptance program: eats when hungry, keeps a campfire, keeps a berry and 8 sticks at hand.
ACCEPTANCE = program_from_rules([
    rule(below("satietyBelow", 35), {"kind": "eat"}),
    rule(below("temperatureBelow", 36), {"kind": "lightCampfire"}),
    rule(below("temperatureBelow", 36.5), {"kind": "feedCampfire"}),
    rule(below("temperatureBelow", 35.2), {"kind": "walkToCampfire"}),
    rule(below("campfireLeftBelow", 1), {"kind": "craftCampfire"}),
    rule(item_below("berry", 1), gather("berry")),
    rule(item_below("berry", 1), walk_to("berry")),
    rule({"kind": "hereBelow", "resource": "berry", "value": 1}, {"kind": "explore"}),
    rule(item_below("berry", 1), {"kind": "wander"}),
    rule(item_below("stick", 8), gather("stick")),
    rule(item_below("stick", 8), walk_to("stick")),
    rule(below("temperatureBelow", 36), {"kind": "lightItem"}),
    rule(ALWAYS, {"kind": "explore"}),
    rule(AWAY, {"kind": "walkToCampfire"}),
    rule(ALWAYS, gather("stick")),
    rule(ALWAYS, gather("berry")),
    rule(ALWAYS, {"kind": "wander"}),
])
EMPTY = program_from_rules([])

# name: (program, real time of the send, span in game minutes)
SCENARIOS = {
    "ALIVE": (ACCEPTANCE, ALIVE_REAL_MS, 480),
    "DIES_IDLE": (EMPTY, ALIVE_REAL_MS, 300),
    "DIES_BUSY": (ACCEPTANCE, T, 400),
}
IDLE_DEATH_MINUTE = 243

REFERENCE = "one minute a call"


def cut(sizes, total):
    """The sizes, repeated in order, until they add up to `total`; the last one cut to fit."""
    found, reached = [], 0
    while reached < total:
        for size in sizes:
            if reached >= total:
                break
            size = min(size, total - reached)
            found.append(size)
            reached += size
    return found


def minutes_calls(sizes, total):
    return [["advanceMinutes", size] for size in cut(sizes, total)]


def real_time_calls(pieces_ms, total):
    """passRealTime calls of the pieces, repeated, whose real time adds up to `total` minutes."""
    calls, reached = [], 0
    while reached < total * 1000:
        for piece in pieces_ms:
            if reached >= total * 1000:
                break
            piece = min(piece, total * 1000 - reached)
            calls.append(["passRealTime", piece])
            reached += piece
    return calls


GROWING = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]

# name: (calls for a span of `total` minutes, whether the carry of real time is compared)
SPLITS = {
    REFERENCE: (lambda total: minutes_calls([1], total), True),
    "one call": (lambda total: minutes_calls([total], total), True),
    "two minutes a call": (lambda total: minutes_calls([2], total), True),
    "one, then two minutes a call": (lambda total: [["advanceMinutes", 1]]
                                     + minutes_calls([2], total - 1), True),
    "three minutes a call": (lambda total: minutes_calls([3], total), True),
    "seven minutes a call": (lambda total: minutes_calls([7], total), True),
    "sixty minutes a call": (lambda total: minutes_calls([60], total), True),
    "growing calls": (lambda total: minutes_calls(GROWING, total), True),
    "real time in whole seconds": (lambda total: real_time_calls([3000, 1000, 11000, 4000],
                                                                 total), True),
    "real time in pieces of 1500 ms": (lambda total: real_time_calls([1500], total), False),
}

DRIVER = KNOWING_GAME_JS + r"""
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [gamePath, runsPath, outPath] = process.argv.slice(2);
const game = await import(pathToFileURL(gamePath).href);
const runs = JSON.parse(readFileSync(runsPath, 'utf8'));
const out = {};
for (const [key, { program, sent, realMs, calls }] of Object.entries(runs)) {
  let state = await newKnowingGame(game, gamePath);
  state = game.setProgram(state, program).state;
  state = game.createCharacter(state, 'Ala').state;
  state = game.send(state, sent, realMs).state;
  const records = [{ state: JSON.parse(JSON.stringify(state)), events: [] }];
  for (const [name, arg] of calls) {
    const result = game[name](state, arg);
    state = result.state;
    records.push({ state: JSON.parse(JSON.stringify(state)),
                   events: JSON.parse(JSON.stringify(result.events)) });
  }
  out[key] = records;
}
writeFileSync(outPath, JSON.stringify(out));
"""


def node():
    path = shutil.which("node")
    if path is None:
        raise AssertionError("node is not on PATH")
    return path


def run_key(scenario, split):
    return f"{scenario} / {split}"


def drive():
    """{run key: records}: the send's record first, then one record after each call."""
    game = support.built_copy().file(GAME_MODULE)
    if not os.path.isfile(game):
        raise AssertionError(f"`npm run build` placed no {GAME_MODULE}, so the simulation "
                             "cannot be driven")
    runs = {}
    for scenario, (program, real_ms, span) in SCENARIOS.items():
        for split, (make, _carry) in SPLITS.items():
            runs[run_key(scenario, split)] = {"program": program, "sent": SENT,
                                              "realMs": real_ms, "calls": make(span)}
    directory = tempfile.mkdtemp(prefix="loop2-minute-span-split-")
    try:
        script = os.path.join(directory, "driver.mjs")
        runs_path = os.path.join(directory, "runs.json")
        out_path = os.path.join(directory, "records.json")
        with open(script, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(DRIVER)
        with open(runs_path, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(runs, handle)
        code, output = support.run([node(), script, game, runs_path, out_path], directory)
        if code != 0:
            raise AssertionError(f"the driver exited {code}:\n{output}")
        with open(out_path, encoding="utf-8") as handle:
            return json.load(handle)
    finally:
        shutil.rmtree(directory, ignore_errors=True)


_records = {}


def records():
    if "value" not in _records:
        _records["value"] = drive()
    return _records["value"]


def minute(record):
    return record["state"]["run"]["minute"]


def by_minute(reference):
    """({game minute: the reference's state when it first reached it}, {game minute: the events
    of the call that reached it}), from the records of one minute a call."""
    states, events = {}, {}
    for record in reference:
        reached = minute(record)
        if reached not in states:
            states[reached] = record["state"]
            events[reached] = record["events"]
    return states, events


def less_carry(state):
    return {key: value for key, value in state.items() if key != "realMsCarry"}


def findings(reference, split, compare_carry):
    """What breaks the sentence in one split's records against the reference's: a list."""
    found = []
    states, events = by_minute(reference)
    previous = minute(split[0])
    if split[0]["state"] != states[previous]:
        found.append("the sent states differ")
    for index, record in enumerate(split[1:], start=1):
        reached = minute(record)
        if reached not in states:
            found.append(f"call {index} reached game minute {reached}, which one minute a call "
                         "never reached")
            break
        expected_state = states[reached]
        state = record["state"]
        if not compare_carry:
            expected_state, state = less_carry(expected_state), less_carry(state)
        if state != expected_state:
            found.append(f"call {index}: the state at game minute {reached} differs:\n"
                         f"split:     {json.dumps(state)[:1500]}\n"
                         f"reference: {json.dumps(expected_state)[:1500]}")
        expected_events = [e for m in range(previous + 1, reached + 1) for e in events[m]]
        if record["events"] != expected_events:
            found.append(f"call {index}: the events of game minutes {previous + 1} to {reached} "
                         f"differ:\nsplit:     {json.dumps(record['events'])[:1500]}\n"
                         f"reference: {json.dumps(expected_events)[:1500]}")
        previous = reached
    return found


def finished_kinds(run_records):
    return {e["activity"]["action"]["kind"] for r in run_records for e in r["events"]
            if e["kind"] == "activityFinished" and e["activity"]["kind"] == "rule"}


def deaths(run_records):
    return [e for r in run_records for e in r["events"] if e["kind"] == "characterDied"]


class MinuteSpanSplit(unittest.TestCase):

    def test_every_split_reaches_the_same_state_and_events_at_every_minute(self):
        # invariant: minute-span-split
        result = records()
        for scenario in SCENARIOS:
            reference = result[run_key(scenario, REFERENCE)]
            for split, (_make, carry) in SPLITS.items():
                if split == REFERENCE:
                    continue
                with self.subTest(scenario=scenario, split=split):
                    self.assertEqual(findings(reference, result[run_key(scenario, split)], carry),
                                     [])

    def test_a_dead_character_stays_dead_and_gives_no_events(self):
        # invariant: minute-span-split
        result = records()
        for scenario in ("DIES_IDLE", "DIES_BUSY"):
            for split in SPLITS:
                with self.subTest(scenario=scenario, split=split):
                    run_records = result[run_key(scenario, split)]
                    died = [i for i, r in enumerate(run_records)
                            if any(e["kind"] == "characterDied" for e in r["events"])]
                    self.assertEqual(len(died), 1, "the character does not die exactly once")
                    at_death = run_records[died[0]]
                    death_minute = minute(at_death)
                    self.assertEqual(at_death["state"]["run"]["death"]["minute"], death_minute)
                    for later in run_records[died[0] + 1:]:
                        self.assertEqual(later["events"], [])
                        self.assertEqual(minute(later), death_minute)
                        self.assertEqual(later["state"]["run"], at_death["state"]["run"])

    def test_control_the_scenarios_are_what_they_are_meant_to_be(self):
        # invariant: minute-span-split
        result = records()
        alive = result[run_key("ALIVE", REFERENCE)]
        self.assertEqual(minute(alive[-1]), SCENARIOS["ALIVE"][2])
        self.assertIsNone(alive[-1]["state"]["run"]["death"])
        self.assertTrue({"gather", "eat", "craftCampfire", "lightCampfire", "feedCampfire"}
                        <= finished_kinds(alive), finished_kinds(alive))
        idle = result[run_key("DIES_IDLE", REFERENCE)]
        self.assertEqual([d["minute"] for d in deaths(idle)], [IDLE_DEATH_MINUTE])
        busy = result[run_key("DIES_BUSY", REFERENCE)]
        self.assertEqual(len(deaths(busy)), 1, "DIES_BUSY does not die within its span")
        self.assertLess(deaths(busy)[0]["minute"], SCENARIOS["DIES_BUSY"][2] - 10)
        self.assertTrue({"gather", "eat", "craftCampfire"} <= finished_kinds(busy),
                        finished_kinds(busy))

    def test_control_the_splits_end_a_call_at_every_minute(self):
        # invariant: minute-span-split
        result = records()
        for scenario, (_program, _real_ms, span) in SCENARIOS.items():
            last = minute(result[run_key(scenario, REFERENCE)][-1])
            ended = {minute(r) for split in SPLITS if split != REFERENCE
                     for r in result[run_key(scenario, split)][1:]}
            self.assertEqual(sorted(set(range(1, last + 1)) - ended), [],
                             f"{scenario}: no split other than one minute a call ends a call at "
                             "these game minutes")
            self.assertGreater(last, 200, f"{scenario} passes too few game minutes")
            if scenario == "ALIVE":
                self.assertEqual(last, span)

    def test_control_the_comparison_flags_breaks(self):
        # invariant: minute-span-split
        result = records()
        reference = result[run_key("ALIVE", REFERENCE)]
        split = result[run_key("ALIVE", "seven minutes a call")]
        self.assertEqual(findings(reference, split, True), [])
        busy = next(i for i, r in enumerate(split) if len(r["events"]) >= 2 and i > 1)

        changed = copying.deepcopy(split)
        changed[busy]["state"]["run"]["body"]["health"] += 0.05
        self.assertTrue(findings(reference, changed, True), "a changed state goes unseen")
        left_out = copying.deepcopy(split)
        del left_out[busy]["events"][0]
        self.assertTrue(findings(reference, left_out, True), "an event left out goes unseen")
        swapped = copying.deepcopy(split)
        first, second = swapped[busy]["events"][:2]
        swapped[busy]["events"][:2] = [second, first]
        self.assertTrue(findings(reference, swapped, True), "two swapped events go unseen")
        added = copying.deepcopy(split)
        added[busy]["events"].append(added[busy]["events"][0])
        self.assertTrue(findings(reference, added, True), "an event added goes unseen")
        carried = copying.deepcopy(split)
        carried[busy]["state"]["realMsCarry"] = 500
        self.assertTrue(findings(reference, carried, True), "a changed carry goes unseen")
        self.assertEqual(findings(reference, carried, False), [],
                         "the carry is compared where it is meant to be left out")


if __name__ == "__main__":
    unittest.main()
