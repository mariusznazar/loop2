import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { BALANCE } from "../../dist/browser/sim/data/balance.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { BRANCHES, SKILLS } from "../../dist/browser/sim/data/skills.js";
import { newGame } from "../../dist/browser/sim/game.js";
import { catchUp } from "../../dist/browser/sim/loop.js";
import {
  campaignSweep,
  comeBack,
  dueAttempt,
  playCampaign,
  programsOf,
} from "../../balance/campaign.mjs";
import { LOOP_START_MS } from "../../balance/loop.mjs";
import best from "../../balance/players/edge-daily-best.json" with { type: "json" };
import decent from "../../balance/players/edge-daily-decent.json" with { type: "json" };
import stock from "../../balance/players/edge-daily-decent-stock.json" with { type: "json" };
import {
  emptyLoopContext,
  loopContextOf,
  minutesOfAnEmptyRun,
} from "./campaign-fixture.mjs";
import { REFERENCE_PROGRAMS, forestNaive } from "../sim/reference-programs.mjs";

// The campaign of a player over many days, checked against relations the campaign code does not
// compute: the first map is solved before any loop starts, no purchase is made that the points do
// not cover, a map is tried only with what its attempt asks for, and the sums agree with the
// campaigns they sum. The campaigns here are short, on one to three seeds.

const FIRST_MAP = "forestEdge";
/** The real time one use of the resurrection takes to return: four hours, the game's start value. */
const RENEWAL_MS = 4 * 60 * 60 * 1000;

/** The player with the given fields changed, for a short campaign. */
function shortPlayer(player, changes) {
  return { ...player, days: 3, ...changes };
}

/** One campaign of the player on the seed, with its programs from the reference programs. */
function play(player, seed) {
  return playCampaign({
    player,
    programs: programsOf(player, REFERENCE_PROGRAMS),
    seed,
  });
}

/** The points a tree has earned at the practice: one for each threshold of its levels reached. */
function earnedIn(skillId, practice) {
  return SKILLS[skillId].thresholds.filter((threshold) => practice >= threshold)
    .length;
}

/** The points the ranks of the branches of one tree cost, from the costs of the game's data. */
function spentIn(skillId, ranks) {
  return Object.entries(ranks)
    .filter(([branchId]) => BRANCHES[branchId].skill === skillId)
    .reduce(
      (sum, [branchId, rank]) =>
        sum +
        BRANCHES[branchId].costs
          .slice(0, rank)
          .reduce((total, cost) => total + cost, 0),
      0,
    );
}

test("a player whose first program does not solve the first map stays on it: no loop, no purchase, nothing solved", () => {
  const player = shortPlayer(best, {
    days: 0.02,
    programs: { ...best.programs, first: "emptyProgram" },
  });
  const log = play(player, 1);
  assert.equal(log.firstMapSolvedRealMinutes, null);
  assert.ok(log.firstMapAttempts >= 1);
  assert.equal(log.loopCompletions, 0);
  assert.deepEqual(log.daily, []);
  assert.deepEqual(log.bought, []);
  assert.deepEqual(log.final.solvedMaps, []);
  assert.deepEqual(log.final.chest, {});
});

test("the first map is solved by hand before the loop starts, in at least the real time its game minutes take at the pace", () => {
  for (const seed of [1, 2]) {
    const log = play(shortPlayer(best), seed);
    assert.ok(log.final.solvedMaps.includes(FIRST_MAP), `seed ${seed}`);
    assert.notEqual(log.firstMapSolvedRealMinutes, null, `seed ${seed}`);
    assert.ok(log.firstMapAttempts >= 1, `seed ${seed}`);
    const realSeconds = log.firstMapSolvedRealMinutes * 60;
    const gameMinutesPerSecond = BALANCE.gameMinutesPerRealSecond * best.pace;
    assert.ok(
      realSeconds >= log.firstMapGameMinutes / gameMinutesPerSecond,
      `seed ${seed}`,
    );
    assert.ok(realSeconds < 24 * 60 * 60, `seed ${seed}`);
  }
});

test("the player returns once a day: the days of the record run from 1 to the days of the campaign, each map is tried only on a return", () => {
  const log = play(shortPlayer(best), 1);
  assert.deepEqual(
    log.daily.map((row) => row.day),
    [1, 2, 3],
  );
  assert.ok(log.attemptsByMap.forest >= 1);
  for (const day of Object.values(log.solvedDayByMap))
    assert.ok(day >= 1 && day <= 3);
});

test("each solved map had its opening map solved before it", () => {
  const log = play(shortPlayer(best, { days: 10 }), 1);
  assert.ok(log.final.solvedMaps.length >= 2);
  log.final.solvedMaps.forEach((mapId, index) => {
    const opener = MAPS[mapId].opensAfter;
    if (opener === undefined) return;
    assert.ok(
      log.final.solvedMaps.slice(0, index).includes(opener),
      `${mapId} after ${opener}`,
    );
  });
});

test("no purchase is made that the points of its tree do not cover, and the record of purchases agrees with the ranks held", () => {
  for (const seed of [1, 2]) {
    const log = play(shortPlayer(best, { days: 10 }), seed);
    for (const skillId of Object.keys(SKILLS)) {
      assert.ok(
        spentIn(skillId, log.final.ranks) <=
          earnedIn(skillId, log.final.practice[skillId] ?? 0),
        `seed ${seed}, ${skillId}`,
      );
    }
    const held = Object.values(log.final.ranks).reduce(
      (sum, rank) => sum + rank,
      0,
    );
    assert.equal(log.bought.length, held, `seed ${seed}`);
    for (const [branchId, rank] of Object.entries(log.final.ranks))
      assert.equal(
        log.bought.filter((bought) => bought === branchId).length,
        rank,
        `seed ${seed}, ${branchId}`,
      );
  }
});

test("a player who buys nothing holds no rank, and a purchase only comes from a list that names it", () => {
  const none = play(shortPlayer(best, { days: 10, buyOrder: [] }), 1);
  assert.deepEqual(none.bought, []);
  assert.deepEqual(none.final.ranks, {});
  const some = play(shortPlayer(best, { days: 10 }), 1);
  for (const branchId of some.bought)
    assert.ok(best.buyOrder.includes(branchId), branchId);
});

test("an attempt whose need of the chest can never be met is never made", () => {
  const impossible = {
    ...best.attempts[0],
    needChest: { stick: BALANCE.chestCapacity + 1 },
  };
  const log = play(shortPlayer(best, { attempts: [impossible] }), 1);
  assert.ok(log.final.solvedMaps.includes(FIRST_MAP));
  assert.deepEqual(log.attemptsByMap, {});
  assert.deepEqual(log.final.solvedMaps, [FIRST_MAP]);
});

test("the same seed gives the same campaign", () => {
  assert.deepEqual(play(shortPlayer(decent), 3), play(shortPlayer(decent), 3));
});

test("the sum of campaigns counts them and takes its means from the campaigns it sums", () => {
  const seeds = [1, 2, 3];
  const player = shortPlayer(best);
  const programs = programsOf(player, REFERENCE_PROGRAMS);
  const { summary, logs } = campaignSweep({ player, programs, seeds });
  assert.equal(logs.length, seeds.length);
  assert.deepEqual(
    logs.map((log) => log.seed),
    seeds,
  );
  assert.equal(summary.campaigns, seeds.length);
  const boughtMean =
    logs.reduce((sum, log) => sum + log.bought.length, 0) / seeds.length;
  assert.equal(summary.boughtMean, Math.round(boughtMean * 100) / 100);
  assert.deepEqual(
    summary.byDay.map((row) => row.day),
    [1, 2, 3],
  );
  const dayTwo = summary.byDay[1];
  const chestMean =
    logs.reduce((sum, log) => sum + log.daily[1].chest, 0) / seeds.length;
  assert.equal(dayTwo.chest, Math.round(chestMean * 100) / 100);
});

test("the three players of Skraj lasu name programs of the reference file, maps and ranks the game has, and ask for the chest their programs take", () => {
  for (const player of [best, decent, stock]) {
    assert.equal(player.firstMap, FIRST_MAP, player.name);
    assert.ok(player.description.length > 0, player.name);
    const programs = programsOf(player, REFERENCE_PROGRAMS);
    for (const [role, id] of Object.entries(player.programs))
      assert.equal(
        programs[role],
        REFERENCE_PROGRAMS[id],
        `${player.name} ${role}`,
      );
    for (const attempt of player.attempts) {
      assert.ok(MAPS[attempt.map], `${player.name} ${attempt.map}`);
      for (const { item, count } of programs[attempt.program].tripPlan.take)
        assert.ok(
          (attempt.needChest[item] ?? 0) >= count,
          `${player.name} ${attempt.map} ${item}`,
        );
    }
    for (const branchId of new Set(player.buyOrder)) {
      const wanted = player.buyOrder.filter((each) => each === branchId).length;
      assert.ok(BRANCHES[branchId], `${player.name} ${branchId}`);
      assert.ok(
        wanted <= BRANCHES[branchId].costs.length,
        `${player.name} ${branchId}`,
      );
    }
  }
});

test("a player naming a program the registry lacks is refused", () => {
  const player = { ...best, programs: { ...best.programs, first: "nope" } };
  assert.throws(() => programsOf(player, REFERENCE_PROGRAMS), /nope/);
});

// decision: D-428 "The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection, the switch `--no-resurrection` starts the loop with every use spent and the clock of the returns started at the start of the loop, after which the uses return as in the game, and the player of a campaign who waits for the resurrection before trying the next map tries when at least one use is left"
test("a player who waits for the resurrection tries its next map while one use is left, and waits when every use is spent", () => {
  const attempt = {
    map: FIRST_MAP,
    program: "first",
    needChest: {},
    needResurrection: true,
  };
  const dueWith = (usesSpent) => {
    const game = newGame();
    return dueAttempt({
      player: { attempts: [attempt] },
      state: {
        ...game,
        solvedMaps: [],
        team: {
          ...game.team,
          resurrectionUsesSpent: usesSpent,
          resurrectionNextReturnAtMs:
            usesSpent === 0 ? null : LOOP_START_MS + RENEWAL_MS,
        },
      },
      clock: { ms: LOOP_START_MS },
    });
  };
  assert.equal(dueWith(2), attempt, "two uses spent, one left");
  assert.equal(dueWith(3), undefined, "all three uses spent");
});

test("one return that covers several deaths counts every use spent, and the loop it leaves alive counts no death as a completion", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  // A map run of the empty program ends in 243 game minutes, so the 24 hours of this return hold the
  // deaths at minutes 243, 486, 729, 972 and 1215; each finds a use, for the one the earlier death
  // spent returned four hours (240 minutes) after the clock started, before the next death.
  assert.equal(minutesOfAnEmptyRun(), 243, "precondition: the run's length");
  const ctx = emptyLoopContext();
  comeBack(ctx, 24);
  assert.equal(ctx.log.resurrectionsUsed, 5);
  assert.equal(ctx.log.loopCompletions, 0);
  assert.equal(ctx.log.progressLost, 0);
  assert.equal(ctx.state.loops[ctx.characterId].runNumber, 6);
});

test("one return that holds completions and covered deaths counts each use spent and each completion, as the game's catch-up over the same span ends them", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  // The game's own catch-up is the expectation: every map run of the loop it leaves alive ended in a
  // completion or in a death a use covered, so the uses spent are the map runs that ended less the
  // completions.
  const caught = catchUp(
    loopContextOf(forestNaive, 1).state,
    LOOP_START_MS + 24 * 60 * 60 * 1000,
  ).state;
  const [loop] = Object.values(caught.loops);
  const completions = loop.completed;
  const uses = loop.runNumber - 1 - completions;
  assert.ok(completions > 0, "precondition: a map run was completed");
  assert.ok(uses > 0, "precondition: a death was covered");
  const ctx = loopContextOf(forestNaive, 1);
  comeBack(ctx, 24);
  assert.equal(ctx.log.resurrectionsUsed, uses);
  assert.equal(ctx.log.loopCompletions, completions);
  assert.equal(ctx.log.progressLost, 0);
});

test("a loop that stops after covered deaths counts each of the uses spent and no completion, the stopping death being no use and no completion", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  // With the renewal far beyond the return no use comes back: the deaths at minutes 243, 486 and 729
  // spend the three uses, and the one at minute 972 finds none and stops the loop.
  const renewalMinutes = BALANCE.resurrectionRenewalRealMinutes;
  try {
    BALANCE.resurrectionRenewalRealMinutes = 100000;
    assert.equal(minutesOfAnEmptyRun(), 243, "precondition: the run's length");
    const ctx = emptyLoopContext();
    comeBack(ctx, 24);
    assert.equal(ctx.state.loops[ctx.characterId], undefined);
    assert.equal(ctx.log.resurrectionsUsed, BALANCE.resurrectionUses);
    assert.equal(ctx.log.loopCompletions, 0);
    assert.equal(ctx.log.progressLost, 1);
  } finally {
    BALANCE.resurrectionRenewalRealMinutes = renewalMinutes;
  }
});

test("a loop minute that an overlay shortens after the instrument is loaded changes no step of a return: the campaign takes the loop minute from the instrument's loop file, as the game's catch-up does, and the return ends with the same count", () => {
  // decision: D-190 "A character's death takes what it carried and pays nothing of its map run; when the resurrection has no use left, it also takes all the character's practice"
  // The return is run in a process of its own with a limit of time, for a campaign that steps by a
  // loop minute other than the game's makes no progress and never ends.
  const fixture = new URL("./campaign-fixture.mjs", import.meta.url).href;
  const campaign = new URL("../../balance/campaign.mjs", import.meta.url).href;
  const balance = new URL(
    "../../dist/browser/sim/data/balance.js",
    import.meta.url,
  ).href;
  const script = `
    import { comeBack } from "${campaign}";
    import { BALANCE } from "${balance}";
    import { emptyLoopContext } from "${fixture}";
    const ctx = emptyLoopContext();
    BALANCE.loopMinuteRealSeconds = 30;
    comeBack(ctx, 24);
    console.log(JSON.stringify(ctx.log));
  `;
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "--eval", script],
    { encoding: "utf8", timeout: 20_000 },
  );
  assert.equal(result.error, undefined, "the return ended within its limit");
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), {
    resurrectionsUsed: 5,
    loopCompletions: 0,
    progressLost: 0,
    daily: [],
  });
});
