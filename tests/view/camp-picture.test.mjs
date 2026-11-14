// The camp of Siedziba as data for drawing (D-272): which characters stand in it, how many the widest band
// holds, and what the fire and the chest are. What a window of another width shows, and how the pictures
// move, are the browser check's (D-88): nothing here computes a layout.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import {
  campCapacity,
  campDrawing,
} from "../../dist/browser/view/camp-picture.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const NOW = 1_800_000_000_000;
const MAP = "forest";
const LOOP = {
  runNumber: 3,
  completed: 2,
  run: { mapId: "forest", minute: 212 },
};

/** The new game with `count` characters, named after the order they were created, numbered from 1. */
function teamOf(count) {
  let state = withEdgeSolved(newGame());
  for (let n = 1; n <= count; n++)
    state = createCharacter(state, `Postać ${n}`).state;
  return state;
}

const ids = (state) => campDrawing(state).members.map((member) => member.id);

// Catches a camp drawn only where the team has someone in Siedziba (a team of none, as in a new game, would
// draw no camp at all), or one that drops the fire or the chest with the characters.
test("a team with nobody in Siedziba shows the fire and the chest alone", () => {
  const empty = campDrawing(newGame());
  assert.deepEqual(empty.members, []);
  assert.equal(empty.fire.href, "/sprites/fire.png");
  assert.equal(empty.chest.href, "/sprites/chest.png");

  const away = send(teamOf(1), { mapId: MAP, characterId: 1 }, NOW).state;
  assert.deepEqual(ids(away), []);
  assert.deepEqual(campDrawing(away).fire, empty.fire);
  assert.deepEqual(campDrawing(away).chest, empty.chest);
});

// Catches a camp that draws the whole team (a character on a map or in a loop standing at the fire), one
// that forgets one of the three ways a character is away, or one that reorders the characters (D-54).
test("only the characters in Siedziba stand in the camp, in the order of creation", () => {
  // 1 stays, 2 is in the manual map run, 3 in an earning loop, 4 had its loop stopped, 5 stays.
  const base = send(teamOf(5), { mapId: MAP, characterId: 2 }, NOW).state;
  const state = {
    ...base,
    loops: { 3: LOOP },
    stoppedLoops: { 4: { eating: 4 } },
  };
  assert.deepEqual(ids(state), [1, 4, 5]);
  assert.deepEqual(ids(teamOf(3)), [1, 2, 3]);
});

// Catches a manual map run that is read only while it goes: a paused run and one that has ended and waits for
// „Restart” or „Zakończ” are still the run of that character, so it is not in Siedziba.
test("the character of a manual map run is away while the run goes, is paused or has ended", () => {
  const going = send(teamOf(2), { mapId: MAP, characterId: 1 }, NOW).state;
  const paused = { ...going, paused: true };
  const died = {
    ...going,
    run: { ...going.run, death: { minute: 4, cause: "cold" } },
  };
  const solved = { ...going, run: { ...going.run, completion: { minute: 4 } } };
  for (const state of [going, paused, died, solved])
    assert.deepEqual(ids(state), [2]);
  // „Zakończ” leaves no run behind: the character is back.
  assert.deepEqual(ids({ ...going, run: null }), [1, 2]);
});

// Catches a capacity that counts the fire's half or the gap wrong, which would draw a character no band holds
// or leave a place at the widest band empty. 672 / 2 − 32 / 2 − 6 = 314 pixels of the row, 32 to a cell.
test("the camp draws as many characters as the widest band holds, the first in the order of creation", () => {
  assert.equal(campCapacity(), 9);
  const crowded = teamOf(12);
  assert.deepEqual(ids(crowded), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(crowded.team.characters.length, 12, "the team keeps them all");
  assert.deepEqual(ids(teamOf(9)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

// Catches a chest drawn in another picture, or another frame, when it holds more (D-271, D-184): how much it
// holds is told by the section „Skrzynka {n}/{cap}”, not by the camp.
test("the chest is one still picture, the same empty and full", () => {
  const state = teamOf(1);
  const full = {
    ...state,
    team: { ...state.team, chest: { pieces: { stick: 60 } } },
  };
  assert.deepEqual(campDrawing(full), campDrawing(state));
  assert.equal(campDrawing(state).chest.frames, 1);
});

// Catches a camp that has a fire of its own state, standing still or out: the fire of the camp burns in its
// frames always, whatever a campfire of the game state is (D-316 draws that one in the scene).
test("the fire of the camp is the burning fire in its frames, whatever the game state holds", () => {
  const away = send(teamOf(1), { mapId: MAP, characterId: 1 }, NOW).state;
  const fire = campDrawing(away).fire;
  assert.equal(fire.frames, 4);
  assert.deepEqual(campDrawing(newGame()).fire, fire);
});

// Catches a character in a sheet of another pose or a size that is not the file's: the camp shows the idle
// sheet, four frames of 64 × 64, with the figure in its lower half, which the files hold.
test("a character stands in the idle sheet of its archetype", () => {
  const [member] = campDrawing(teamOf(1)).members;
  assert.deepEqual(member.idle, {
    href: "/sprites/mage-idle.png",
    width: 64,
    height: 64,
    frames: 4,
  });
});
