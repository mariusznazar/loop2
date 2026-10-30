import {
  newGame,
  setProgram,
  createCharacter,
  send,
  advanceMinutes,
} from "../../dist/public/sim/game.js";
import { programFromRules } from "./program-fixture.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { BALANCE } from "../../dist/public/sim/data/balance.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { sameHex } from "../../dist/public/sim/hex.js";
import {
  actionFeasible,
  chooseActivity,
  conditionHolds,
} from "../../dist/public/sim/program.js";
import { newMapRun } from "../../dist/public/sim/run.js";
import { newKnowingGame } from "./understanding-fixture.mjs";

const [mapId, map] = Object.entries(MAPS)[0];
// The id of a character of the team, which the map run carries.
const characterId = 1;
const [stick, berry] = map.resources.map((resource) => resource.id);

const ALWAYS = { kind: "always" };
const EXPLORE = { kind: "explore" };
const WANDER = { kind: "wander" };
const below = (resource, value) => ({ kind: "hereBelow", resource, value });
const walkTo = (resource) => ({ kind: "walkTo", resource });
const rule = (condition, action) => ({ condition, action });
const program = programFromRules;

/** A fresh map run of the first map at minute 0, its first activity chosen by `startProgram`. */
function freshRun(seed = 3, startProgram = program()) {
  return newMapRun(map, seed, startProgram, { mapId, characterId }).run;
}

/** The run with the character's tile replaced by `change(tile)`. */
function withHere(run, change) {
  return {
    ...run,
    tiles: run.tiles.map((tile) =>
      sameHex(tile.at, run.character.at) ? change({ ...tile }) : tile,
    ),
  };
}

/** The run with every tile revealed or not and without stock. */
function cleared(run, revealed) {
  return {
    ...run,
    tiles: run.tiles.map((tile) => ({ ...tile, revealed, stock: {} })),
  };
}

test("always holds", () => {
  assert.equal(conditionHolds(freshRun(), map, ALWAYS), true);
});

test("hereBelow reads 0 on an unrevealed tile, whatever lies there", () => {
  const run = withHere(freshRun(), (tile) => ({
    ...tile,
    revealed: false,
    stock: { [stick]: 12 },
  }));
  assert.equal(conditionHolds(run, map, below(stick, 1)), true);
});

test("hereBelow compares the true stock of a revealed tile", () => {
  const run = withHere(freshRun(), (tile) => ({
    ...tile,
    revealed: true,
    stock: { [stick]: 12 },
  }));
  assert.equal(conditionHolds(run, map, below(stick, 12)), false);
  assert.equal(conditionHolds(run, map, below(stick, 13)), true);
  assert.equal(
    conditionHolds(run, map, below(berry, 1)),
    true,
    "a lacking resource counts 0",
  );
});

test("hereBelow with N = 0 never holds", () => {
  const run = withHere(freshRun(), (tile) => ({
    ...tile,
    revealed: true,
    stock: {},
  }));
  assert.equal(conditionHolds(run, map, below(stick, 0)), false);
});

test("the first rule whose condition holds and whose action is feasible wins", () => {
  const run = freshRun();
  const chosen = chooseActivity(
    run,
    map,
    program(rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)),
  );
  assert.deepEqual(chosen, { kind: "rule", ruleId: 1, action: EXPLORE });
});

test("a rule whose condition does not hold is skipped", () => {
  const run = freshRun();
  const chosen = chooseActivity(
    run,
    map,
    program(rule(below(stick, 0), WANDER), rule(ALWAYS, EXPLORE)),
  );
  assert.deepEqual(chosen, { kind: "rule", ruleId: 2, action: EXPLORE });
});

test("a rule whose action is not feasible is skipped", () => {
  const run = withHere(freshRun(), (tile) => ({ ...tile, revealed: true }));
  const chosen = chooseActivity(
    run,
    map,
    program(rule(ALWAYS, EXPLORE), rule(ALWAYS, WANDER)),
  );
  assert.deepEqual(chosen, { kind: "rule", ruleId: 2, action: WANDER });
});

test("with no applicable rule the character waits", () => {
  const run = cleared(freshRun(), true);
  assert.deepEqual(chooseActivity(run, map, program()), { kind: "wait" });
  assert.deepEqual(
    chooseActivity(
      run,
      map,
      program(rule(ALWAYS, EXPLORE), rule(ALWAYS, walkTo(stick))),
    ),
    {
      kind: "wait",
    },
  );
});

test("a wait lasts waitMinutes, one game minute", () => {
  assert.equal(BALANCE.waitMinutes, 1);
  const { run } = newMapRun(map, 3, program(), { mapId, characterId });
  assert.deepEqual(run.current, {
    activity: { kind: "wait" },
    startMinute: 0,
    endMinute: 1,
    stepTo: null,
  });
});

test("feasibility and choice do not draw from the wander generator", () => {
  const run = freshRun();
  const before = JSON.stringify(run);
  actionFeasible(run, map, WANDER);
  actionFeasible(run, map, WANDER);
  chooseActivity(run, map, program(rule(ALWAYS, WANDER)));
  chooseActivity(run, map, program(rule(ALWAYS, WANDER)));
  assert.equal(JSON.stringify(run), before);
});

test("the chosen action is a copy, not the program rule itself", () => {
  const rules = program(rule(ALWAYS, EXPLORE));
  const chosen = chooseActivity(freshRun(), map, rules);
  assert.notEqual(chosen.action, rules.groups[0].rules[0].action);
});

// D-23, D-90 and D-91: groups gate ordered rules; a new game gives a first empty group.
const group = (id, condition, rules) => ({
  id,
  name: `Group ${id}`,
  condition,
  rules,
});
const grouped = (...groups) => ({
  tripPlan: { take: [], bring: [] },
  nextGroupId: 100,
  nextRuleId: 1000,
  groups,
});
const identified = (id, condition, action) => ({ id, condition, action });

test("a new game starts with one empty Program group under always", () => {
  const initial = newGame().programs[0].program;
  assert.ok(
    Array.isArray(initial.groups),
    "the program is an ordered list of groups",
  );
  assert.equal(initial.groups.length, 1);
  assert.equal(initial.groups[0].name, "Program");
  assert.deepEqual(initial.groups[0].condition, ALWAYS);
  assert.deepEqual(initial.groups[0].rules, []);
  assert.ok(initial.nextGroupId > initial.groups[0].id);
  assert.ok(initial.nextRuleId > 0);
  assert.equal(Object.hasOwn(initial, "rules"), false);
});

test("group order skips false, empty and infeasible groups and then takes the first qualifying rule", () => {
  const candidate = grouped(
    group(7, below(stick, 0), [identified(71, ALWAYS, WANDER)]),
    group(5, ALWAYS, []),
    group(4, ALWAYS, [identified(42, ALWAYS, walkTo(stick))]),
    group(2, ALWAYS, [
      identified(23, below(stick, 0), WANDER),
      identified(24, ALWAYS, EXPLORE),
      identified(25, ALWAYS, WANDER),
    ]),
    group(1, ALWAYS, [identified(11, ALWAYS, WANDER)]),
  );
  let accepted;
  assert.doesNotThrow(() => {
    accepted = setProgram(newGame(), candidate).state.programs[0].program;
  });
  assert.deepEqual(chooseActivity(freshRun(), map, accepted), {
    kind: "rule",
    ruleId: 24,
    action: EXPLORE,
  });
});

test("all empty groups and an empty list of groups leave the character waiting", () => {
  for (const candidate of [
    grouped(),
    grouped(group(8, ALWAYS, []), group(3, ALWAYS, [])),
  ]) {
    let accepted;
    assert.doesNotThrow(() => {
      accepted = setProgram(newGame(), candidate).state.programs[0].program;
    });
    assert.deepEqual(chooseActivity(freshRun(), map, accepted), {
      kind: "wait",
    });
  }
});

test("identical rule contents keep distinct identities when groups and rules move", () => {
  const first = identified(91, ALWAYS, EXPLORE);
  const second = identified(17, ALWAYS, EXPLORE);
  const candidate = grouped(
    group(3, ALWAYS, [first, second]),
    group(7, ALWAYS, []),
  );
  let accepted;
  assert.doesNotThrow(() => {
    accepted = setProgram(newGame(), candidate).state.programs[0].program;
  });
  assert.equal(chooseActivity(freshRun(), map, accepted).ruleId, 91);
  const moved = {
    ...accepted,
    groups: [group(7, ALWAYS, [second]), group(3, ALWAYS, [first])],
  };
  assert.equal(chooseActivity(freshRun(), map, moved).ruleId, 17);
  assert.deepEqual(
    accepted.groups[0].rules.map((entry) => entry.id),
    [91, 17],
  );
});

test("group conditions use the same legal number, resource and item values as rules", () => {
  const conditions = [
    ALWAYS,
    below(stick, 3),
    { kind: "temperatureBelow", value: 36.5 },
    { kind: "satietyBelow", value: 50 },
    { kind: "itemBelow", item: "berry", value: 8 },
    { kind: "campfireLeftBelow", value: 20 },
    { kind: "awayFromCampfire" },
  ];
  for (const condition of conditions) {
    const candidate = grouped(
      group(5, condition, [identified(9, ALWAYS, EXPLORE)]),
    );
    let accepted;
    assert.doesNotThrow(() => {
      accepted = setProgram(newGame(), candidate).state.programs[0].program;
    });
    assert.deepEqual(accepted, candidate);
  }
});

test("group conditions refuse unknown kinds and invalid fields while accepting a legal control", () => {
  const valid = grouped(group(5, ALWAYS, []));
  assert.doesNotThrow(() => setProgram(newGame(), valid));
  for (const condition of [
    { kind: "unknown" },
    { kind: "hereBelow", resource: "unknown", value: 3 },
    { kind: "itemBelow", item: "unknown", value: 8 },
    { kind: "temperatureBelow", value: 36.55 },
    { kind: "hereBelow", resource: stick, value: -1 },
    { kind: "satietyBelow", value: Infinity },
  ]) {
    assert.throws(() =>
      setProgram(newGame(), grouped(group(5, condition, []))),
    );
  }
});

test("program identities are unique positive integers below the next identity counters", () => {
  const valid = grouped(
    group(3, ALWAYS, [identified(7, ALWAYS, EXPLORE)]),
    group(5, ALWAYS, [identified(9, ALWAYS, WANDER)]),
  );
  assert.doesNotThrow(() => setProgram(newGame(), valid));
  const corruptions = [
    (p) => {
      p.groups[1].id = 3;
    },
    (p) => {
      p.groups[1].rules[0].id = 7;
    },
    (p) => {
      p.groups[0].id = 0;
    },
    (p) => {
      p.groups[0].rules[0].id = -1;
    },
    (p) => {
      p.groups[0].rules[0].id = 1.5;
    },
    (p) => {
      p.nextGroupId = 5;
    },
    (p) => {
      p.nextRuleId = 9;
    },
    (p) => {
      p.nextRuleId = Number.MAX_SAFE_INTEGER + 1;
    },
    (p) => {
      delete p.nextGroupId;
    },
    (p) => {
      p.groups[0].groups = [];
    },
    (p) => {
      p.groups[0].rules = "bad list";
    },
    (p) => {
      p.groups = null;
    },
  ];
  for (const corrupt of corruptions) {
    const candidate = structuredClone(valid);
    corrupt(candidate);
    assert.throws(() => setProgram(newGame(), candidate));
  }
});

test("editing, deleting or transferring a started rule leaves its action running to completion", () => {
  // D-20: rule identity records the origin; the running action is its own copy.
  const candidate = grouped(
    group(3, ALWAYS, [identified(7, ALWAYS, EXPLORE)]),
    group(5, ALWAYS, []),
  );
  let state;
  assert.doesNotThrow(() => {
    state = setProgram(
      createCharacter(newKnowingGame(), "Ala").state,
      candidate,
    ).state;
  });
  state = send(state, { mapId, characterId }, 1760000000000).state;
  const original = structuredClone(state.run.current);
  const replacements = [
    grouped(group(3, ALWAYS, [identified(7, ALWAYS, WANDER)])),
    grouped(group(3, ALWAYS, [])),
    grouped(
      group(3, ALWAYS, []),
      group(5, below(stick, 0), [identified(7, ALWAYS, EXPLORE)]),
    ),
  ];
  for (const replacement of replacements) {
    const edited = setProgram(state, replacement).state;
    const beforeEnd = advanceMinutes(edited, original.endMinute - 1).state;
    assert.deepEqual(beforeEnd.run.current, original);
    const finished = advanceMinutes(beforeEnd, 1);
    assert.ok(finished.events.some((event) => event.kind === "tileRevealed"));
    assert.deepEqual(
      finished.events.find((event) => event.kind === "activityFinished")
        .activity,
      { kind: "rule", ruleId: 7, action: EXPLORE },
    );
  }
});
