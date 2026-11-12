// The chronicle memory of the screen of a map run (D-338 to D-346, D-348, D-382, D-383, D-147,
// D-122): what each result of the simulation and each act on the copy
// records, newest first, by kind; the clearing at a send, at „Restart” and at „Zakończ”; the place of
// the paragraph of the last encounter; a chronicle built from a loaded state; the window of a filter
// and the number that changes at every change. Results come from the real functions of the simulation
// where the case is about the game's flow, and are written out by hand where the case is about the
// words one event gives, so each case states the words it expects (D-73).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  discardCopyChanges,
  editProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../../dist/browser/sim/programs.js";
import { createChronicle } from "../../dist/browser/view/chronicle.js";

const SENT = { mapId: "forest", characterId: 1 };
// A real time whose seed lays berries and moss, but no sticks, on the entrance tile.
const REAL_MS = 1760000000003;
const WAIT = "Czeka — żadna reguła nie pasuje";
// The band at the first chill of a new game (tests/view/discovery-band.test.mjs; D-122, D-312).
const CHILL_BAND =
  "Odkryto: Eksploruj, Wędruj, drzewo umiejętności Eksploracja. W regułach można teraz sprawdzić: Temperatura poniżej … °C. Gra dopisała regułę w grupie „Program”: Zawsze → Eksploruj.";

/** A new game with one character, not yet sent. */
function readyGame() {
  return createCharacter(newGame(), "Ala").state;
}

/**
 * A chronicle built from a game with no map run, with the send of its character recorded; `state` is
 * the game the send returned. A new game knows no action, so the first activity is a wait.
 */
function sentChronicle() {
  const before = readyGame();
  const chronicle = createChronicle(before);
  const sent = send(before, SENT, REAL_MS);
  chronicle.record(sent, before);
  return { chronicle, state: sent.state };
}

/** Records a result of the given events on `state`, as a reading of the clock gives one. */
function recordEvents(chronicle, state, events) {
  chronicle.record({ state, events }, state);
}

/** The rows of a filter, newest first: an entry as its fields, the paragraph as its minute. */
function rowsOf(chronicle, filter = "all", size = 1000) {
  return chronicle
    .window(filter, size)
    .rows.map((row) =>
      row.kind === "paragraph" ? { paragraph: row.minute } : { ...row.entry },
    );
}

const entry = (minute, kind, text, role = "text") => ({
  kind,
  minute,
  text,
  role,
});
const waitAt = (minute) => entry(minute, "action", WAIT);
const started = (minute, action) => ({
  kind: "activityStarted",
  minute,
  activity: { kind: "rule", ruleId: 1, action },
  stepTo: null,
});
const waitStarted = (minute) => ({
  kind: "activityStarted",
  minute,
  activity: { kind: "wait" },
  stepTo: null,
});
const attacked = (minute) => ({ kind: "attacked", minute, creature: "wolf" });

/** The copy's program with „Zawsze → Eksploruj” added at the end of its first group. */
function withRuleAdded(program) {
  const next = structuredClone(program);
  next.groups[0].rules.push({
    id: next.nextRuleId,
    condition: { kind: "always" },
    action: { kind: "explore" },
  });
  next.nextRuleId += 1;
  return next;
}

/** The game advanced `minutes` game minutes from its send, with the chronicle recording it. */
function advanced(minutes) {
  const { chronicle, state } = sentChronicle();
  const result = advanceMinutes(state, minutes);
  chronicle.record(result, state);
  return { chronicle, state: result.state };
}

test("a chronicle built from a game with no map run holds nothing, with Kronika and Wszystko picked", () => {
  const chronicle = createChronicle(readyGame());
  const snapshot = chronicle.snapshot();
  assert.equal(snapshot.tab, "chronicle");
  assert.equal(snapshot.filter, "all");
  assert.equal(snapshot.paragraph, null);
  assert.deepEqual(chronicle.window("all", 10), { rows: [], more: false });
});

// Catches a send that keeps the entries of the map run before it, or keeps the tab and filter picked
// in it: a send starts the chronicle anew with „Kronika” and „Wszystko” (D-343, D-346, D-383).
test("a send starts the chronicle anew from the start of the first activity at minute 0, with Kronika and Wszystko picked", () => {
  const { chronicle, state } = sentChronicle();
  assert.deepEqual(rowsOf(chronicle), [waitAt(0)]);
  recordEvents(chronicle, state, [started(3, { kind: "explore" })]);
  chronicle.pickTab("terrain");
  chronicle.pickFilter("streak");

  const ended = end(state);
  chronicle.record(ended, state);
  const again = send(ended.state, SENT, REAL_MS + 1);
  chronicle.record(again, ended.state);
  assert.deepEqual(rowsOf(chronicle), [waitAt(0)]);
  assert.equal(chronicle.snapshot().tab, "chronicle");
  assert.equal(chronicle.snapshot().filter, "all");
});

// Catches an entry for each game minute of a wait, or a wait after an action given no entry.
test("a wait gives one entry when it starts and none for the minutes it lasts", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [waitStarted(1), waitStarted(2)]);
  recordEvents(chronicle, state, [waitStarted(3)]);
  recordEvents(chronicle, state, [started(4, { kind: "explore" })]);
  recordEvents(chronicle, state, [waitStarted(9), waitStarted(10)]);
  assert.deepEqual(rowsOf(chronicle), [
    waitAt(9),
    entry(4, "action", "Eksploruj"),
    waitAt(0),
  ]);
});

// Catches the number of a rule or the words of the header („Zbiera: patyk”) in an action's entry.
test("the start of an action gives its entry in the words of the rule's row, with no number of a rule", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [
    started(10, { kind: "gather", resource: "stick" }),
    started(15, { kind: "walkTo", resource: "berry" }),
    started(20, { kind: "explore" }),
    started(40, { kind: "eat" }),
  ]);
  assert.deepEqual(rowsOf(chronicle, "action", 4), [
    entry(40, "action", "Zjedz — jagoda"),
    entry(20, "action", "Eksploruj"),
    entry(15, "action", "Idź — Jagoda"),
    entry(10, "action", "Zbierz — Patyk"),
  ]);
});

// Catches a loss with no number of the streak, a cause in the wrong words, or a loss not in `danger`.
test("a loss of the streak gives „Passa {passa} przerwana: {przyczyna}” in danger, for each cause", () => {
  const { chronicle, state } = sentChronicle();
  const lost = (minute, streak, cause) => ({
    kind: "streakLost",
    minute,
    streak,
    cause,
  });
  recordEvents(chronicle, state, [
    lost(391, 391, "cold"),
    lost(400, 8, "hunger"),
    lost(410, 9, "coldAndHunger"),
    lost(420, 120, "programChanged"),
    lost(430, 5, "programSwitched"),
  ]);
  assert.deepEqual(rowsOf(chronicle, "streak"), [
    entry(
      430,
      "streak",
      "Passa 5 przerwana: przełączenie na inny program",
      "danger",
    ),
    entry(420, "streak", "Passa 120 przerwana: zmiana programu", "danger"),
    entry(
      410,
      "streak",
      "Passa 9 przerwana: zdrowie spadło od zimna i głodu",
      "danger",
    ),
    entry(
      400,
      "streak",
      "Passa 8 przerwana: zdrowie spadło od głodu",
      "danger",
    ),
    entry(
      391,
      "streak",
      "Passa 391 przerwana: zdrowie spadło od zimna",
      "danger",
    ),
  ]);
});

// Catches the words of loop („Postać zamarzła.”) in place of those of „Teraz”, a death in `danger`, a
// completion not in `positive` or with the words of another map, and one entry for two campfires.
test("a campfire going out, a death and a completion give entries of the kind Świat in the words of „Teraz”", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [
    { kind: "campfireExtinguished", minute: 60, at: { q: 1, r: 1 } },
    { kind: "campfireExtinguished", minute: 60, at: { q: 2, r: 1 } },
    { kind: "characterDied", minute: 70, cause: "cold" },
    { kind: "characterDied", minute: 71, cause: "hunger" },
    { kind: "characterDied", minute: 72, cause: "combat" },
    { kind: "mapRunCompleted", minute: 480 },
  ]);
  const deeper = { ...state, run: { ...state.run, mapId: "forestDeep" } };
  recordEvents(chronicle, deeper, [{ kind: "mapRunCompleted", minute: 540 }]);
  assert.deepEqual(rowsOf(chronicle, "world"), [
    entry(540, "world", "Las — głębiej rozwiązany", "positive"),
    entry(480, "world", "Las rozwiązany", "positive"),
    entry(72, "world", "Mag zginął w walce"),
    entry(71, "world", "Mag umarł z głodu"),
    entry(70, "world", "Mag zamarzł"),
    entry(60, "world", "Ognisko wygasło"),
    entry(60, "world", "Ognisko wygasło"),
  ]);
});

// Catches an entry for the end of an action, a step, a tile, an exchange of blows or an end of an
// encounter: none of them is a kind of the chronicle (D-340, D-147).
test("the end of an action, a step, a revealed tile, an exchange and the end of an encounter give no entry and change nothing", () => {
  const { chronicle, state } = sentChronicle();
  const version = chronicle.snapshot().version;
  recordEvents(chronicle, state, [
    { kind: "activityFinished", minute: 5, activity: { kind: "wait" } },
    { kind: "moved", minute: 5, from: { q: 1, r: 1 }, to: { q: 2, r: 1 } },
    { kind: "tileRevealed", minute: 5, at: { q: 2, r: 1 } },
    { kind: "combatEnded", minute: 6, outcome: "creatureDeparted" },
    { kind: "loopRunEnded", characterId: 2 },
  ]);
  assert.deepEqual(rowsOf(chronicle), [waitAt(0)]);
  assert.equal(chronicle.snapshot().version, version);
});

// Catches the paragraph kept apart from the order of time, an earlier attack's paragraph kept beside
// the later one, or an entry for each attack (D-147).
test("an attack places the paragraph at its minute among the entries, and the next attack moves it", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [started(3, { kind: "explore" })]);
  recordEvents(chronicle, state, [attacked(5)]);
  recordEvents(chronicle, state, [started(9, { kind: "eat" })]);
  assert.deepEqual(rowsOf(chronicle), [
    entry(9, "action", "Zjedz — jagoda"),
    { paragraph: 5 },
    entry(3, "action", "Eksploruj"),
    waitAt(0),
  ]);
  assert.deepEqual(rowsOf(chronicle, "combat"), [{ paragraph: 5 }]);
  assert.deepEqual(rowsOf(chronicle, "action"), [
    entry(9, "action", "Zjedz — jagoda"),
    entry(3, "action", "Eksploruj"),
    waitAt(0),
  ]);

  recordEvents(chronicle, state, [attacked(20)]);
  assert.deepEqual(rowsOf(chronicle), [
    { paragraph: 20 },
    entry(9, "action", "Zjedz — jagoda"),
    entry(3, "action", "Eksploruj"),
    waitAt(0),
  ]);
  assert.deepEqual(rowsOf(chronicle, "combat"), [{ paragraph: 20 }]);
  assert.equal(chronicle.snapshot().paragraph.minute, 20);
});

// Catches a wait after an attack given no entry: the encounter ended the wait before it.
test("an attack ends the wait before it, so the next wait gives its entry", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [attacked(5), waitStarted(8)]);
  assert.deepEqual(rowsOf(chronicle), [waitAt(8), { paragraph: 5 }, waitAt(0)]);
});

// Catches „Restart” keeping the entries or the paragraph of the map run it ends, resetting the tab or
// the filter the player picked (D-346, D-383), or keeping the wait of the ended map run so that the new
// map run's first wait gives no entry.
test("„Restart” clears the entries and the paragraph and keeps the tab and the filter", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [attacked(5), started(9, { kind: "eat" })]);
  recordEvents(chronicle, state, [waitStarted(12)]);
  chronicle.pickTab("terrain");
  chronicle.pickFilter("world");
  const restarted = restart(state);
  chronicle.record(restarted, state);
  assert.deepEqual(rowsOf(chronicle), [waitAt(0)]);
  const snapshot = chronicle.snapshot();
  assert.equal(snapshot.paragraph, null);
  assert.equal(snapshot.tab, "terrain");
  assert.equal(snapshot.filter, "world");
});

// Catches the entries or the paragraph left after „Zakończ”, or a clearing the screen is not told
// of, since the number stays.
test("„Zakończ” clears the entries and the paragraph", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [attacked(5), started(9, { kind: "eat" })]);
  const version = chronicle.snapshot().version;
  chronicle.record(end(state), state);
  assert.deepEqual(rowsOf(chronicle), []);
  assert.equal(chronicle.snapshot().paragraph, null);
  assert.notEqual(chronicle.snapshot().version, version);
});

/** The game as a load would give it: a map run at minute 300 that a wolf attacked at minute 212. */
function loadedWithEncounter(state) {
  return {
    ...state,
    paused: true,
    run: {
      ...state.run,
      minute: 300,
      lastCombat: {
        creatureId: "wolf",
        attackMinute: 212,
        resolveMinute: 215,
        result: null,
      },
    },
  };
}

// Catches the paragraph lost at a load, standing at the minute of the load, or entries invented for
// what came before (D-339).
test("a chronicle built from a loaded state holds the paragraph of the last encounter alone, at the attack's minute", () => {
  const { state } = sentChronicle();
  const chronicle = createChronicle(loadedWithEncounter(state));
  assert.deepEqual(rowsOf(chronicle), [{ paragraph: 212 }]);
  assert.deepEqual(rowsOf(chronicle, "combat"), [{ paragraph: 212 }]);
  assert.deepEqual(rowsOf(chronicle, "action"), []);
  assert.equal(chronicle.snapshot().tab, "chronicle");
  assert.equal(chronicle.snapshot().filter, "all");

  recordEvents(chronicle, state, [started(301, { kind: "explore" })]);
  assert.deepEqual(rowsOf(chronicle), [
    entry(301, "action", "Eksploruj"),
    { paragraph: 212 },
  ]);
});

test("a chronicle built from a loaded state with no attack holds nothing", () => {
  const { state } = sentChronicle();
  const chronicle = createChronicle({
    ...state,
    run: { ...state.run, minute: 300 },
  });
  assert.deepEqual(rowsOf(chronicle), []);
  assert.equal(chronicle.snapshot().paragraph, null);
});

// Catches a load in the middle of a wait giving the wait an entry at the next minute of it, or a
// load in an action keeping the next wait from its entry.
test("a load in the middle of a wait gives that wait no entry, and a load in an action gives the next wait its entry", () => {
  const { state } = sentChronicle();
  assert.equal(state.run.current.activity.kind, "wait", "precondition");
  const waiting = createChronicle(state);
  recordEvents(waiting, state, [waitStarted(1)]);
  assert.deepEqual(rowsOf(waiting), []);

  const acting = createChronicle({
    ...state,
    run: {
      ...state.run,
      current: {
        activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } },
        startMinute: 0,
        endMinute: 20,
        stepTo: null,
      },
    },
  });
  recordEvents(acting, state, [waitStarted(20)]);
  assert.deepEqual(rowsOf(acting), [waitAt(20)]);
});

// Catches the discovery written from the list of what was found alone, without the sentence of the
// rule the game wrote, a change entry for the rule the game wrote at the first chill, and a loss of
// the streak missed at the chill (D-345, D-123, D-341). A new game waits from minute 0 to the first
// chill at minute 84 (tests/view/discovery-band.test.mjs), its streak growing by one in each of the
// minutes 1 to 83.
test("the first chill gives one entry of the discovery holding the band's text, the loss of the streak, and no entry of a change", () => {
  const { chronicle, state } = advanced(100);
  assert.equal(
    state.run.minute,
    84,
    "precondition: stopped at the first chill",
  );
  assert.deepEqual(rowsOf(chronicle, "discovery"), [
    entry(84, "discovery", CHILL_BAND, "discovery"),
  ]);
  assert.deepEqual(rowsOf(chronicle, "streak"), [
    entry(
      84,
      "streak",
      "Passa 83 przerwana: zdrowie spadło od zimna",
      "danger",
    ),
  ]);
  assert.deepEqual(rowsOf(chronicle, "change"), []);
});

// Catches an entry that follows the group's later rename, as the band does while it stands (D-312
// binds the band alone; D-382).
test("the entry of a discovery keeps the group the band named at the discovery after the group is renamed", () => {
  const { chronicle, state } = advanced(100);
  const program = structuredClone(state.run.copy.program);
  program.groups[0].name = "Ogień";
  chronicle.record(setProgram(state, program), state, {
    kind: "edit",
    move: null,
  });
  assert.deepEqual(rowsOf(chronicle, "discovery"), [
    entry(84, "discovery", CHILL_BAND, "discovery"),
  ]);
  assert.deepEqual(rowsOf(chronicle, "change"), [
    entry(84, "change", "Zmieniono grupę „Ogień”", "player-change"),
  ]);
});

// Catches the loss recorded before the change that caused it, the two in different minutes, or the
// change of the copy left with no entry (D-341, D-342). Minute 50 of a new game stands before the
// first chill, so its streak is 50.
test("an edit of the copy gives its entry and then the loss of the streak it caused, in the same minute", () => {
  const { chronicle, state } = advanced(50);
  assert.equal(state.run.streak, 50, "precondition: a streak of 50");
  chronicle.record(
    setProgram(state, withRuleAdded(state.run.copy.program)),
    state,
    { kind: "edit", move: null },
  );
  assert.deepEqual(rowsOf(chronicle, "all", 2), [
    entry(50, "streak", "Passa 50 przerwana: zmiana programu", "danger"),
    entry(
      50,
      "change",
      "Dodano regułę 1.1: Zawsze → Eksploruj",
      "player-change",
    ),
  ]);
  assert.deepEqual(rowsOf(chronicle, "change"), [
    entry(
      50,
      "change",
      "Dodano regułę 1.1: Zawsze → Eksploruj",
      "player-change",
    ),
  ]);
});

// Catches an entry for an edit of a saved program, which changes no map run (D-342, saved-program-edit).
test("an edit of a saved program gives no entry", () => {
  const { chronicle, state } = advanced(50);
  const version = chronicle.snapshot().version;
  const saved = state.programs[0];
  chronicle.record(
    editProgram(state, saved.id, withRuleAdded(saved.program)),
    state,
  );
  assert.deepEqual(rowsOf(chronicle, "change"), []);
  assert.equal(chronicle.snapshot().version, version);
});

// Catches a save, a save as a new program, a switch or a discard with no entry, with the name of
// another program, or a discard described by what it changed (D-342).
test("a save, a save as a new program, a switch and a discard each give their entry with the program's name", () => {
  const { chronicle, state } = advanced(50);
  const edit = { kind: "edit", move: null };
  let current = state;
  const act = (result, description) => {
    chronicle.record(result, current, description);
    current = result.state;
  };
  act(setProgram(current, withRuleAdded(current.run.copy.program)), edit);
  act(saveCopyIntoProgram(current), { kind: "save" });
  act(setProgram(current, withRuleAdded(current.run.copy.program)), edit);
  act(saveCopyAsNewProgram(current, "Nowy"), { kind: "saveAsNew" });
  act(switchProgram(current, 1), { kind: "switch" });
  act(setProgram(current, withRuleAdded(current.run.copy.program)), edit);
  act(discardCopyChanges(current), { kind: "discard" });
  // „Program” holds one rule after the first save, so the rule added after the switch is its second.
  const change = (text) => entry(50, "change", text, "player-change");
  assert.deepEqual(rowsOf(chronicle, "change"), [
    change("Porzucono zmiany kopii"),
    change("Dodano regułę 1.2: Zawsze → Eksploruj"),
    change("Przełączono postać na program „Program”"),
    change("Zapisano kopię jako nowy program „Nowy”"),
    change("Dodano regułę 1.2: Zawsze → Eksploruj"),
    change("Zapisano kopię w programie „Program”"),
    change("Dodano regułę 1.1: Zawsze → Eksploruj"),
  ]);
});

// Catches an act after the end given the minute of the clock or none: it stands at the minute of the
// end (D-342, D-173).
test("an edit of the copy after a death stands at the game minute of the death", () => {
  const { chronicle, state } = advanced(50);
  const dead = {
    ...state,
    run: { ...state.run, minute: 312, death: { minute: 312, cause: "cold" } },
  };
  chronicle.record(
    setProgram(dead, withRuleAdded(dead.run.copy.program)),
    dead,
    { kind: "edit", move: null },
  );
  assert.deepEqual(rowsOf(chronicle, "change"), [
    entry(
      312,
      "change",
      "Dodano regułę 1.1: Zawsze → Eksploruj",
      "player-change",
    ),
  ]);
});

// Catches a window that draws every entry, one that drops the newest, a filter that shows another
// kind, or a window that hides that more entries stand beyond it (D-382).
test("a filter's window holds its newest entries up to its size, newest first, and says whether more stand beyond it", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [
    started(1, { kind: "explore" }),
    { kind: "streakLost", minute: 2, streak: 2, cause: "hunger" },
    started(3, { kind: "gather", resource: "stick" }),
    { kind: "campfireExtinguished", minute: 4, at: { q: 1, r: 1 } },
    started(5, { kind: "eat" }),
  ]);
  const eat = entry(5, "action", "Zjedz — jagoda");
  const gather = entry(3, "action", "Zbierz — Patyk");
  assert.deepEqual(chronicle.window("action", 2).more, true);
  assert.deepEqual(rowsOf(chronicle, "action", 2), [eat, gather]);
  assert.deepEqual(rowsOf(chronicle, "action", 4), [
    eat,
    gather,
    entry(1, "action", "Eksploruj"),
    waitAt(0),
  ]);
  assert.equal(chronicle.window("action", 4).more, false);
  assert.deepEqual(rowsOf(chronicle, "world"), [
    entry(4, "world", "Ognisko wygasło"),
  ]);
  assert.deepEqual(rowsOf(chronicle, "discovery"), []);
  assert.deepEqual(rowsOf(chronicle, "all", 3), [
    eat,
    entry(4, "world", "Ognisko wygasło"),
    gather,
  ]);
  assert.equal(chronicle.window("all", 3).more, true);
});

// Catches the paragraph drawn in a window that ends before its place, or left out of one that reaches
// it.
test("the paragraph stands in the window of Wszystko only where the window reaches its place", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [started(3, { kind: "explore" })]);
  recordEvents(chronicle, state, [attacked(5)]);
  recordEvents(chronicle, state, [
    started(9, { kind: "gather", resource: "stick" }),
    started(12, { kind: "eat" }),
  ]);
  assert.deepEqual(rowsOf(chronicle, "all", 2), [
    entry(12, "action", "Zjedz — jagoda"),
    entry(9, "action", "Zbierz — Patyk"),
    { paragraph: 5 },
  ]);
  assert.deepEqual(rowsOf(chronicle, "all", 1), [
    entry(12, "action", "Zjedz — jagoda"),
  ]);
});

// Catches a number that stays at a change, so the screen would not draw it, or one that changes with
// nothing changed, so the screen would draw the rows again for nothing (D-382).
test("the number changes at every change of the chronicle, the tab or the filter, and at nothing else", () => {
  const { chronicle, state } = sentChronicle();
  const versions = [chronicle.snapshot().version];
  const changed = () => {
    const now = chronicle.snapshot().version;
    const differs = now !== versions.at(-1);
    versions.push(now);
    return differs;
  };
  recordEvents(chronicle, state, [waitStarted(1)]);
  assert.equal(changed(), false, "a wait already recorded");
  chronicle.pickTab("terrain");
  assert.equal(changed(), true, "a tab picked");
  assert.equal(chronicle.snapshot().tab, "terrain");
  chronicle.pickTab("terrain");
  assert.equal(changed(), false, "the same tab picked again");
  chronicle.pickFilter("action");
  assert.equal(changed(), true, "a filter picked");
  assert.equal(chronicle.snapshot().filter, "action");
  chronicle.pickFilter("action");
  assert.equal(changed(), false, "the same filter picked again");
  recordEvents(chronicle, state, [started(4, { kind: "explore" })]);
  assert.equal(changed(), true, "an entry recorded");
  recordEvents(chronicle, state, [attacked(5)]);
  assert.equal(changed(), true, "the paragraph placed");
});

// Catches the number of the map run staying at a send or at „Restart” (a screen that starts its window
// anew at a new map run would not hear of it), changing where only an entry, a tab, a filter or the
// end of the map run comes (the window would start anew while the player reads), or not changing the
// snapshot the screen compares.
test("the number of the map run changes at a send and at „Restart”, and at nothing else", () => {
  const { chronicle, state } = sentChronicle();
  const first = chronicle.snapshot().runNumber;
  recordEvents(chronicle, state, [started(3, { kind: "explore" })]);
  recordEvents(chronicle, state, [attacked(5)]);
  chronicle.pickTab("terrain");
  chronicle.pickFilter("action");
  assert.equal(chronicle.snapshot().runNumber, first, "entries and picks");

  const restarted = restart(state);
  chronicle.record(restarted, state);
  const second = chronicle.snapshot().runNumber;
  assert.notEqual(second, first, "Restart");

  const ended = end(restarted.state);
  chronicle.record(ended, restarted.state);
  assert.equal(chronicle.snapshot().runNumber, second, "Zakończ");
  const sent = send(ended.state, SENT, REAL_MS + 1);
  chronicle.record(sent, ended.state);
  const third = chronicle.snapshot().runNumber;
  assert.notEqual(third, second, "a send");
  assert.notEqual(third, first);
});

// Catches a screen left stale (no call at a change of the chronicle or at a pick), a call for each
// entry of one result (the screen would draw again for each), a call where nothing changed, and a
// listener that goes on being called after it stopped. The screen reads the memory through this.
test("a listener is called once for a result that changed the chronicle and once for a pick that changed it, and never after it stopped", () => {
  const { chronicle, state } = sentChronicle();
  let calls = 0;
  const stop = chronicle.subscribe(() => {
    calls += 1;
  });
  recordEvents(chronicle, state, [
    started(3, { kind: "explore" }),
    started(4, { kind: "wander" }),
  ]);
  assert.equal(calls, 1, "two entries of one result, one call");
  recordEvents(chronicle, state, [
    { kind: "activityFinished", minute: 5, activity: { kind: "wait" } },
  ]);
  assert.equal(calls, 1, "an event that gives no entry, no call");
  chronicle.pickFilter("action");
  assert.equal(calls, 2, "a filter picked");
  chronicle.pickFilter("action");
  assert.equal(calls, 2, "the same filter picked again");
  chronicle.pickTab("terrain");
  assert.equal(calls, 3, "a tab picked");
  stop();
  chronicle.pickTab("chronicle");
  recordEvents(chronicle, state, [started(6, { kind: "explore" })]);
  assert.equal(calls, 3, "no call after the listener stopped");
});

// Catches the last minutes that take the paragraph of the last encounter as an entry, run on past the
// death's entry, or change with edits of the copy made after the end (D-368, D-147, D-339). The
// paragraph stands at the game minute of the attack and is no entry; the death's entry is the last of
// the minutes, and an act after the end stands after it.
test("the entries up to the death end with its entry, oldest first, leave out the paragraph of the last encounter and stay as they were after an edit", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [started(3, { kind: "explore" })]);
  recordEvents(chronicle, state, [attacked(5)]);
  recordEvents(chronicle, state, [
    started(7, { kind: "gather", resource: "stick" }),
  ]);
  recordEvents(chronicle, state, [
    { kind: "characterDied", minute: 9, cause: "cold" },
  ]);
  const beforeEdit = chronicle.entriesToDeath(10);
  assert.deepEqual(beforeEdit, [
    waitAt(0),
    entry(3, "action", "Eksploruj"),
    entry(7, "action", "Zbierz — Patyk"),
    entry(9, "world", "Mag zamarzł"),
  ]);
  chronicle.record({ state, events: [] }, state, { kind: "discard" });
  assert.deepEqual(chronicle.entriesToDeath(10), beforeEdit);
  assert.deepEqual(chronicle.entriesToDeath(2), [
    entry(7, "action", "Zbierz — Patyk"),
    entry(9, "world", "Mag zamarzł"),
  ]);
  assert.deepEqual(chronicle.entriesToDeath(0), []);
});

// Catches the last minutes shown with no death recorded, or with the entries of a chronicle that began
// at a load, which holds only the paragraph of the last encounter (D-339).
test("the entries up to the death are empty while no death is recorded and after a load", () => {
  const { chronicle, state } = sentChronicle();
  recordEvents(chronicle, state, [started(3, { kind: "explore" })]);
  assert.deepEqual(chronicle.entriesToDeath(4), []);
  const dead = {
    ...state,
    run: { ...state.run, minute: 9, death: { minute: 9, cause: "cold" } },
  };
  assert.deepEqual(createChronicle(dead).entriesToDeath(4), []);
});
