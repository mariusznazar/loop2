// The campaign mode of the balance instrument: the road of one player from an empty account over
// many real days, through the game's own functions (`send`, `advanceMinutes`, `settleDeath`,
// `settleCompletion`, `end`, `startLoop`, `catchUp`, `stopLoop` and `buyBranch`), with no number of
// the game copied. The player is a description (balance/players/): how often the player comes back,
// the manual pace, what the player buys and in what order, when the next map is tried and with what
// in the chest, and which program goes where. The time the player
// needs to write a program is not modelled: every program is ready at the first second.
//
// A description holds:
//   days          real days the campaign runs
//   checkHours    the hours between the player's returns, cycled
//   pace          the pace of the manual map runs, one of the game's paces
//   capMinutes    game minutes after which a manual map run is given up (optional)
//   cashIn        "always", "whenPoints" or "never": when a return stops the loop to buy
//   firstMap      the map tried by hand until it is solved, and the place of the loop
//   loopMapAfter  the place of the loop once the last map of `attempts` is solved (optional)
//   buyOrder      branch ids in the order of buying; a repeated id is its next rank
//   attempts      the maps tried after the first one, in order: { map, program, needChest,
//                 needResurrection }, `program` naming a role of `programs`; a needResurrection
//                 attempt waits until one use of the resurrection is left
//   programs      the roles `first`, `loop`, `loopAfter` (optional) and those the attempts name,
//                 each an identifier of a program
//   knowing       whether the account starts with every Understanding (optional, true)

import { BALANCE } from "../dist/browser/sim/data/balance.js";
import { MAPS } from "../dist/browser/sim/data/maps.js";
import { BRANCHES, SKILLS } from "../dist/browser/sim/data/skills.js";
import {
  canSendMap,
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  resurrectionAt,
  resurrectionHasUse,
  send,
  setPaused,
  settleCompletion,
  settleDeath,
} from "../dist/browser/sim/game.js";
import {
  advanceLoopRun,
  catchUp,
  closeAwayReport,
  startLoop,
  stopLoop,
  waitingPractice,
} from "../dist/browser/sim/loop.js";
import { checkProgram } from "../dist/browser/sim/programs.js";
import { mapRunEnded } from "../dist/browser/sim/run.js";
import {
  branchRank,
  buyBranch,
  paidPractice,
  skillProgress,
} from "../dist/browser/sim/skills.js";
import { pieceCount } from "../dist/browser/sim/trip.js";
import {
  DEFAULT_CAP_MINUTES,
  fullUnderstanding,
  meanNumber,
  outcomeOf,
  quantile,
} from "./engine.mjs";
import {
  LOOP_START_MS,
  MS_PER_LOOP_MINUTE,
  MS_PER_MINUTE,
  earnedPoints,
} from "./loop.mjs";

const MS_PER_SECOND = 1000;
const MS_PER_DAY = 24 * 60 * MS_PER_MINUTE;
/** The game minutes a manual map run is passed in one call: long enough to be cheap, short enough to see a discovery. */
const MANUAL_STEP_MINUTES = 600;
const CASH_IN_RULES = ["always", "whenPoints", "never"];
/** The days of a campaign the summary reports, those within the campaign's length. */
const REPORT_DAYS = [1, 2, 3, 5, 7, 10, 14, 21, 28, 42, 56];

/**
 * The programs of a player by role, each taken from `registry` (identifier to program) by the
 * identifier the description gives, as the campaign wants them.
 */
export function programsOf(player, registry) {
  return Object.fromEntries(
    Object.entries(player.programs).map(([role, id]) => {
      if (!Object.hasOwn(registry, id))
        throw new Error(`campaign: no program ${id} for the role ${role}`);
      return [role, registry[id]];
    }),
  );
}

/** The description with its defaults filled in, or an error naming what is wrong with it. */
function checkedPlayer(player, programs) {
  const fail = (what) => {
    throw new Error(`campaign: player ${player.name ?? "?"}: ${what}`);
  };
  if (!(player.days > 0)) fail("days must be above 0");
  const checkHours = player.checkHours ?? [24];
  if (!checkHours.every((hours) => hours > 0))
    fail("every return must be after more than 0 hours");
  if (!BALANCE.paces.includes(player.pace))
    fail(`pace ${player.pace} is none of the game's paces`);
  if (!CASH_IN_RULES.includes(player.cashIn)) fail("unknown cashIn");
  for (const mapId of [player.firstMap, player.loopMapAfter ?? player.firstMap])
    if (!Object.hasOwn(MAPS, mapId)) fail(`no map ${mapId}`);
  const buyOrder = player.buyOrder ?? [];
  for (const branchId of buyOrder)
    if (!Object.hasOwn(BRANCHES, branchId)) fail(`no branch ${branchId}`);
  for (const role of ["first", "loop"])
    if (!programs[role]) fail(`no program for the role ${role}`);
  const attempts = (player.attempts ?? []).map((attempt) => {
    if (!Object.hasOwn(MAPS, attempt.map)) fail(`no map ${attempt.map}`);
    if (!programs[attempt.program])
      fail(`no program for the role ${attempt.program}`);
    return {
      ...attempt,
      needChest: attempt.needChest ?? {},
      needResurrection: attempt.needResurrection ?? false,
    };
  });
  return {
    ...player,
    checkHours,
    buyOrder,
    attempts,
    capMinutes: player.capMinutes ?? DEFAULT_CAP_MINUTES,
    knowing: player.knowing ?? true,
  };
}

/** Whether the chest holds at least `need`, a record of item to count. */
function hasAll(chest, need) {
  return Object.entries(need).every(
    ([item, count]) => (chest.pieces[item] ?? 0) >= count,
  );
}

/**
 * Buys ranks in the order of the list, a repeated branch being its next rank; a rank that is not
 * affordable is passed over, and the list is gone through again until a pass buys nothing. Every
 * rank bought is added to `bought`.
 */
function buyRanks(state, characterId, order, bought) {
  let current = state;
  for (;;) {
    let progress = false;
    const seen = {};
    for (const branchId of order) {
      seen[branchId] = (seen[branchId] ?? 0) + 1;
      const character = current.team.characters.find(
        (each) => each.id === characterId,
      );
      if (branchRank(character.skills, branchId) !== seen[branchId] - 1)
        continue;
      const next = buyBranch(current, characterId, branchId).state;
      if (next === current) continue;
      current = next;
      bought.push(branchId);
      progress = true;
    }
    if (!progress) return current;
  }
}

/** The state of a new account: one mage, the programs of the player on the list, the seed given. */
function newAccount(player, programs, seed) {
  let state = newGame();
  if (player.knowing) state = { ...state, understanding: fullUnderstanding() };
  state = createCharacter(state, "Mag").state;
  const roles = Object.keys(programs);
  const ids = {};
  const list = roles.map((role, index) => {
    ids[role] = index + 1;
    return {
      id: index + 1,
      name: role,
      program: checkProgram(programs[role], null),
    };
  });
  return {
    state: {
      ...state,
      programs: list,
      nextProgramId: roles.length + 1,
      lastSeed: seed,
    },
    ids,
  };
}

/** The empty record of one campaign. */
function newLog(seed) {
  return {
    seed,
    firstMapAttempts: 0,
    firstMapSolvedRealMinutes: null,
    firstMapGameMinutes: 0,
    lastMapAttempts: 0,
    lastMapSolvedDay: null,
    attemptsByMap: {},
    solvedDayByMap: {},
    progressLost: 0,
    resurrectionsUsed: 0,
    bought: [],
    lastPurchaseDay: null,
    loopCompletions: 0,
    daily: [],
  };
}

/** The real days gone since the campaign began. */
function daysGone(ctx) {
  return (ctx.clock.ms - LOOP_START_MS) / MS_PER_DAY;
}

/** The character of the team, the only one a campaign plays. */
function characterOf(ctx) {
  return ctx.state.team.characters.find((each) => each.id === ctx.characterId);
}

/** The practice waiting at the earning loop, the map run going on included. */
function pendingOf(ctx) {
  const loop = ctx.state.loops[ctx.characterId];
  return loop ? waitingPractice(loop) : {};
}

/**
 * One manual map run to its end at the manual pace; the real clock moves with it by the real time
 * the game minutes take at that pace. A death and a completion are settled at the real moment the
 * map run ends, as the browser view settles them.
 */
function manualRun(ctx, { mapId, programId }) {
  const { player, clock } = ctx;
  let current = send(
    ctx.state,
    { mapId, characterId: ctx.characterId, programId },
    clock.ms,
  ).state;
  while (!mapRunEnded(current.run) && current.run.minute < player.capMinutes) {
    current = advanceMinutes(current, MANUAL_STEP_MINUTES).state;
    if (current.discovery) current = setPaused(current, false).state;
  }
  const run = current.run;
  const gameMinutesPerSecond = BALANCE.gameMinutesPerRealSecond * player.pace;
  clock.ms += Math.ceil(run.minute / gameMinutesPerSecond) * MS_PER_SECOND;
  const outcome = outcomeOf(run);
  if (run.death) current = settleDeath(current, clock.ms).state;
  if (run.completion) current = settleCompletion(current, clock.ms).state;
  const settlement = current.run.deathSettlement?.kind ?? null;
  current = end(current).state;
  ctx.state = current;
  return { outcome, minute: run.minute, settlement };
}

/** Buys what the list allows, and writes down the day if anything was bought. */
function buyAll(ctx) {
  const before = ctx.log.bought.length;
  ctx.state = buyRanks(
    ctx.state,
    ctx.characterId,
    ctx.player.buyOrder,
    ctx.log.bought,
  );
  if (ctx.log.bought.length > before) ctx.log.lastPurchaseDay = daysGone(ctx);
}

/** Whether stopping the loop now would let the player buy a rank of the list. */
function purchaseWaits(ctx) {
  if (!ctx.state.loops[ctx.characterId]) return false;
  const stopped = stopLoop(ctx.state, ctx.characterId).state;
  const after = buyRanks(stopped, ctx.characterId, ctx.player.buyOrder, []);
  return after !== stopped;
}

/** The map of the last attempt, where the player's road ends, or null for a player with none. */
function lastMapOf(player) {
  return player.attempts.length > 0 ? player.attempts.at(-1).map : null;
}

/** Starts the earning loop on the map and with the program the road has come to. */
function startPlayersLoop(ctx) {
  const { player, ids } = ctx;
  const lastMap = lastMapOf(player);
  const after = lastMap !== null && ctx.state.solvedMaps.includes(lastMap);
  const started = startLoop(
    ctx.state,
    {
      mapId: after ? (player.loopMapAfter ?? player.firstMap) : player.firstMap,
      characterId: ctx.characterId,
      programId: after && ids.loopAfter ? ids.loopAfter : ids.loop,
    },
    ctx.clock.ms,
  ).state;
  if (!started.loops[ctx.characterId])
    throw new Error("campaign: the game refused the loop");
  ctx.state = { ...started, saveTimeMs: ctx.clock.ms };
}

/** The first map, tried by hand until it is solved or the campaign's days are gone. */
function solveFirstMap(ctx) {
  const { player, log, ids, clock } = ctx;
  while (
    !ctx.state.solvedMaps.includes(player.firstMap) &&
    clock.ms < ctx.horizonMs
  ) {
    const result = manualRun(ctx, {
      mapId: player.firstMap,
      programId: ids.first,
    });
    log.firstMapAttempts += 1;
    log.firstMapGameMinutes += result.minute;
    if (result.outcome === "solved")
      log.firstMapSolvedRealMinutes =
        (clock.ms - LOOP_START_MS) / MS_PER_MINUTE;
  }
}

/** What the record keeps of one day of the campaign: points, chest, the levels as they would stand if the loop stopped. */
function dailyRecord(ctx, day) {
  const character = characterOf(ctx);
  const pending = pendingOf(ctx);
  const withPending = paidPractice(character.skills, pending);
  const lastMap = lastMapOf(ctx.player);
  return {
    day,
    points: earnedPoints(character.skills),
    pointsWithPending: earnedPoints(withPending),
    chest: pieceCount(ctx.state.team.chest.pieces),
    generation: character.generation,
    solved: ctx.state.solvedMaps.length,
    lastMapSolved: lastMap !== null && ctx.state.solvedMaps.includes(lastMap),
    bought: ctx.log.bought.length,
    levels: Object.fromEntries(
      Object.keys(SKILLS).map((id) => [
        id,
        skillProgress(withPending, id).level,
      ]),
    ),
  };
}

/** Writes the record of each whole day the clock has reached and the record has not yet. */
function markDays(ctx) {
  const reached = daysGone(ctx);
  while (
    ctx.nextDayMark <= reached + 1e-9 &&
    ctx.nextDayMark <= ctx.player.days
  ) {
    ctx.log.daily.push(dailyRecord(ctx, ctx.nextDayMark));
    ctx.nextDayMark += 1;
  }
}

/**
 * The game's catch-up from the save time to `now`, passed in steps that each end at the end of a map
 * run of the earning loop, so that every end is seen alone: the game's `advanceLoopRun` says how many
 * loop minutes the map run going on still lasts, and the catch-up passes up to that minute. The uses of
 * the resurrection a death spent are the uses the game reads as left before the end less those it
 * reads after it, both at the moment of the end (`resurrectionAt` counts the uses that returned up
 * to it). Sets the state the catch-up leaves, and gives the uses spent and the map runs completed.
 */
function passAway(ctx, now) {
  const { characterId } = ctx;
  const completedBefore = ctx.state.loops[characterId]?.completed ?? 0;
  let state = ctx.state;
  let completed = completedBefore;
  let usesSpent = 0;
  while (state.loops[characterId]) {
    const minutes = Math.floor((now - state.saveTimeMs) / MS_PER_LOOP_MINUTE);
    if (minutes <= 0) break;
    const { passed } = advanceLoopRun(state, characterId, minutes);
    if (passed === 0) break;
    const moment = state.saveTimeMs + passed * MS_PER_LOOP_MINUTE;
    const caught = catchUp(state, moment);
    if (caught.events.length > 0)
      usesSpent +=
        resurrectionAt(state.team, moment).usesLeft -
        resurrectionAt(caught.state.team, moment).usesLeft;
    completed = caught.state.loops[characterId]?.completed ?? completed;
    state = { ...caught.state, saveTimeMs: caught.clockMs };
  }
  ctx.state = state.loops[characterId] ? state : { ...state, saveTimeMs: now };
  return { usesSpent, completions: completed - completedBefore };
}

/**
 * The player comes back after `hours`: the game's catch-up passes the time away, the report of the
 * away time is closed, and the record learns what the loop did meanwhile: each use of the
 * resurrection a covered death spent, and each map run the loop completed.
 */
export function comeBack(ctx, hours) {
  const { log } = ctx;
  const now = Math.min(
    ctx.horizonMs,
    ctx.clock.ms + Math.round(hours * 60 * MS_PER_MINUTE),
  );
  const generationBefore = characterOf(ctx).generation;
  const { usesSpent, completions } = passAway(ctx, now);
  ctx.clock.ms = now;
  log.resurrectionsUsed += usesSpent;
  ctx.state = closeAwayReport(ctx.state).state;
  log.loopCompletions += completions;
  if (characterOf(ctx).generation > generationBefore) log.progressLost += 1;
  markDays(ctx);
}

/**
 * The first attempt not yet solved, when the road to it is open and the player has what it asks for;
 * an attempt that waits for the resurrection is due while the team has one use of it left.
 */
export function dueAttempt(ctx) {
  const attempt = ctx.player.attempts.find(
    (each) => !ctx.state.solvedMaps.includes(each.map),
  );
  if (!attempt) return undefined;
  const ready =
    canSendMap(ctx.state.solvedMaps, attempt.map) &&
    hasAll(ctx.state.team.chest, attempt.needChest) &&
    (!attempt.needResurrection ||
      resurrectionHasUse(ctx.state.team, ctx.clock.ms));
  return ready ? attempt : undefined;
}

/** Whether this return stops the loop: nothing runs, a map is due, or the rule of cashing in says so. */
function cashesIn(ctx, due) {
  return (
    !ctx.state.loops[ctx.characterId] ||
    Boolean(due) ||
    ctx.player.cashIn === "always" ||
    (ctx.player.cashIn === "whenPoints" && purchaseWaits(ctx))
  );
}

/** Tries the map of the attempt by hand and writes down how it went. */
function tryMap(ctx, attempt) {
  const { log, ids } = ctx;
  const generation = characterOf(ctx).generation;
  const result = manualRun(ctx, {
    mapId: attempt.map,
    programId: ids[attempt.program],
  });
  log.attemptsByMap[attempt.map] = (log.attemptsByMap[attempt.map] ?? 0) + 1;
  const isLast = attempt.map === lastMapOf(ctx.player);
  if (isLast) log.lastMapAttempts += 1;
  if (result.outcome === "solved") {
    log.solvedDayByMap[attempt.map] = daysGone(ctx);
    if (isLast) log.lastMapSolvedDay = daysGone(ctx);
  }
  if (result.settlement === "resurrectionUsed") log.resurrectionsUsed += 1;
  if (characterOf(ctx).generation > generation) log.progressLost += 1;
}

/** One return of the player, after the catch-up: stop the loop and buy, try a map that is due, start the loop again. */
function cashIn(ctx, due) {
  if (ctx.state.loops[ctx.characterId])
    ctx.state = stopLoop(ctx.state, ctx.characterId).state;
  buyAll(ctx);
  if (due) {
    tryMap(ctx, due);
    buyAll(ctx);
  }
  startPlayersLoop(ctx);
}

/** The returns of the player on the rhythm of the description, until the campaign's days are gone. */
function returnsUntilTheEnd(ctx) {
  let visit = 0;
  while (
    ctx.state.solvedMaps.includes(ctx.player.firstMap) &&
    ctx.clock.ms < ctx.horizonMs
  ) {
    const { checkHours } = ctx.player;
    comeBack(ctx, checkHours[visit % checkHours.length]);
    visit += 1;
    if (ctx.clock.ms >= ctx.horizonMs) break;
    const due = dueAttempt(ctx);
    if (cashesIn(ctx, due)) cashIn(ctx, due);
  }
}

/** What the campaign ended with: points with the loop's pending practice, practice, ranks, chest, generation, solved maps. */
function finalRecord(ctx) {
  const character = characterOf(ctx);
  const withPending = paidPractice(character.skills, pendingOf(ctx));
  return {
    points: earnedPoints(withPending),
    practice: Object.fromEntries(
      Object.entries(withPending).map(([id, skill]) => [id, skill.practice]),
    ),
    ranks: Object.fromEntries(
      Object.values(character.skills).flatMap((skill) =>
        Object.entries(skill.ranks),
      ),
    ),
    chest: { ...ctx.state.team.chest.pieces },
    generation: character.generation,
    solvedMaps: [...ctx.state.solvedMaps],
  };
}

/**
 * One campaign of `player` on `seed`, with `programs` by role (see `programsOf`): the first map by
 * hand until it is solved, its purchases, then the returns of the player over the campaign's days,
 * each with the game's own catch-up. Gives the record of the campaign.
 */
export function playCampaign({ player: description, programs, seed }) {
  const player = checkedPlayer(description, programs);
  const account = newAccount(player, programs, seed);
  const ctx = {
    player,
    ids: account.ids,
    state: account.state,
    characterId: account.state.team.characters[0].id,
    clock: { ms: LOOP_START_MS },
    horizonMs: LOOP_START_MS + Math.round(player.days * MS_PER_DAY),
    nextDayMark: 1,
    log: newLog(seed),
  };
  solveFirstMap(ctx);
  buyAll(ctx);
  if (ctx.state.solvedMaps.includes(player.firstMap)) startPlayersLoop(ctx);
  returnsUntilTheEnd(ctx);
  ctx.log.final = finalRecord(ctx);
  return ctx.log;
}

/** The count, extremes and tenth, fiftieth and ninetieth percentile of the values present, two decimals, or null for none. */
function spread(values) {
  const sorted = values
    .filter((value) => value !== null && value !== undefined)
    .sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  const rounded = (value) => Math.round(value * 100) / 100;
  return {
    n: sorted.length,
    min: rounded(sorted[0]),
    p10: rounded(quantile(sorted, 0.1)),
    median: rounded(quantile(sorted, 0.5)),
    p90: rounded(quantile(sorted, 0.9)),
    max: rounded(sorted.at(-1)),
  };
}

/** The share of the list for which `test` holds, in percent with one decimal, or null for an empty list. */
function shareOf(list, test) {
  return list.length === 0
    ? null
    : Math.round((list.filter(test).length / list.length) * 1000) / 10;
}

/** The averages of the records of the logs on each reported day. */
function summarizeDays(logs, days) {
  return days.map((day) => {
    const rows = logs
      .map((log) => log.daily.find((row) => row.day === day))
      .filter(Boolean);
    return {
      day,
      points: meanNumber(rows, (row) => row.points),
      pointsWithPending: meanNumber(rows, (row) => row.pointsWithPending),
      chest: meanNumber(rows, (row) => row.chest),
      bought: meanNumber(rows, (row) => row.bought),
      generationAbove1Share: shareOf(rows, (row) => row.generation > 1),
      lastMapSolvedShare: shareOf(rows, (row) => row.lastMapSolved),
    };
  });
}

/** For each map the campaigns tried: how many solved it, on which day, and after how many attempts. */
function summarizeMaps(logs) {
  const mapIds = [
    ...new Set(logs.flatMap((log) => Object.keys(log.solvedDayByMap))),
  ];
  return Object.fromEntries(
    mapIds.map((mapId) => [
      mapId,
      {
        solved: logs.filter((log) => log.solvedDayByMap[mapId] !== undefined)
          .length,
        day: spread(logs.map((log) => log.solvedDayByMap[mapId])),
        attempts: spread(logs.map((log) => log.attemptsByMap[mapId] ?? 0)),
      },
    ]),
  );
}

/** For each tree of skills: the top level, how many campaigns reached it and on which day, the practice at the end. */
function summarizeTrees(logs) {
  return Object.fromEntries(
    Object.keys(SKILLS).map((id) => {
      const topLevel = SKILLS[id].thresholds.length + 1;
      const reached = logs.map(
        (log) =>
          log.daily.find((row) => row.levels[id] >= topLevel)?.day ?? null,
      );
      return [
        id,
        {
          topLevel,
          reachedTop: reached.filter((day) => day !== null).length,
          dayReachedTop: spread(reached),
          finalPractice: spread(logs.map((log) => log.final.practice[id])),
          topThreshold: SKILLS[id].thresholds.at(-1),
        },
      ];
    }),
  );
}

/**
 * `playCampaign` over a list of seeds, with the sum of the campaigns: how many solved the first
 * and the last map and when, the losses of progress, the purchases, the averages on the reported
 * days, the trees of skills and the points and chest at the end.
 */
export function campaignSweep({ player, programs, seeds }) {
  const logs = seeds.map((seed) => playCampaign({ player, programs, seed }));
  const days = REPORT_DAYS.filter((day) => day <= player.days);
  const summary = {
    campaigns: logs.length,
    firstMapSolved: logs.filter((log) => log.firstMapSolvedRealMinutes !== null)
      .length,
    firstMapAttempts: spread(logs.map((log) => log.firstMapAttempts)),
    firstMapRealMinutes: spread(
      logs.map((log) => log.firstMapSolvedRealMinutes),
    ),
    lastMapSolved: logs.filter((log) => log.lastMapSolvedDay !== null).length,
    lastMapSolvedDay: spread(logs.map((log) => log.lastMapSolvedDay)),
    lastMapAttempts: spread(logs.map((log) => log.lastMapAttempts)),
    solvedDayByMap: summarizeMaps(logs),
    progressLostMean: meanNumber(logs, (log) => log.progressLost),
    progressLostAtLeastOnce: logs.filter((log) => log.progressLost > 0).length,
    resurrectionsUsedMean: meanNumber(logs, (log) => log.resurrectionsUsed),
    loopCompletionsMean: meanNumber(logs, (log) => log.loopCompletions),
    lastPurchaseDay: spread(logs.map((log) => log.lastPurchaseDay)),
    boughtMean: meanNumber(logs, (log) => log.bought.length),
    byDay: summarizeDays(logs, days),
    trees: summarizeTrees(logs),
    finalPoints: spread(logs.map((log) => log.final.points)),
    finalChest: spread(logs.map((log) => pieceCount(log.final.chest))),
  };
  return { summary, logs };
}
