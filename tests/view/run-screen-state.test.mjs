// The state of the screen Przejście (D-173, D-311, D-322, D-324, D-368, D-371, D-323): the question
// „Zapisać, odrzucić, wrócić?”, the end-of-run window, its wait for the scene's effect and the focus
// owed to a window. The module touches no document, so these cases run on game states of the
// simulation alone and prove what stands, never what a screen draws (D-88).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createCharacter,
  newGame,
  send,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { createRunScreenState } from "../../dist/browser/view/run-screen-state.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const SENT = { mapId: "forest", characterId: 1, programId: 1 };

/** Ala's map run of Las, going on, the copy the program as it stands. */
const going = () =>
  send(createCharacter(withEdgeSolved(newGame()), "Ala").state, SENT, 0).state;

/** The copy's group renamed „Zmieniony”: a change of the copy alone, so the copy holds unsaved changes. */
function renamed(state) {
  const program = structuredClone(state.run.copy.program);
  program.groups[0].name = "Zmieniony";
  return setProgram(state, program).state;
}

/** The map run of `state` ended in a completion in its game minute 480. */
const ended = (state) => ({
  ...state,
  paused: false,
  run: { ...state.run, minute: 480, completion: { minute: 480 } },
});

const DIED = [{ kind: "characterDied" }];
const COMPLETED = [{ kind: "mapRunCompleted" }];

/**
 * A state of the screen over a game `state` the case changes through `game.state`, with the
 * system's setting for reduced motion as `reduced`.
 */
function screenOf(state, { reduced = false } = {}) {
  const game = { state, halted: false };
  const screen = createRunScreenState({
    game: { get: () => game.state, halted: () => game.halted },
    reducedMotion: () => reduced,
  });
  /** Hands the state `next` to the screen as a result of the store that ended the map run or did not. */
  const take = (next, events = [], endedRun = false) => {
    game.state = next;
    screen.taken({
      result: { state: next, events },
      before: state,
      copyAct: undefined,
      endedRun,
    });
  };
  return { screen, game, take };
}

// Catches a window that stands over a screen the player is not on, or one that does not stand over
// the screen of an ended map run that the player comes to.
test("a game built on an ended map run opens the window, which stands once the player is on the screen, and it opens again at each entering after „✕”", () => {
  // decision: D-311 "After a character's death or a completion that window (D-368) stands over this screen"
  // decision: D-368 "The window scrolls in itself while its buttons"
  // decision: D-371 "Whether the end-of-run window (D-368) is open is a memory of the page"
  const { screen } = screenOf(ended(going()));
  assert.equal(screen.windowShown(), false, "the player is on another screen");
  screen.entered();
  assert.equal(screen.windowShown(), true);
  screen.closeWindow();
  assert.equal(screen.windowShown(), false, "„✕” closed it");
  screen.left();
  screen.entered();
  assert.equal(screen.windowShown(), true, "an entering opens it again");
});

// Catches a window that covers the screen of a map run that goes on.
test("the window stands only over an ended map run", () => {
  const { screen, game, take } = screenOf(going());
  screen.entered();
  assert.equal(screen.windowShown(), false);
  take(ended(game.state));
  screen.entered();
  assert.equal(screen.windowShown(), false, "a result with no end opens none");
});

// Catches a window that opens over the death or the completion before the player has seen the
// scene's effect, and one that never opens (D-322).
test("a death or a completion on the screen makes the window wait for the scene's effect, which ends the wait", () => {
  // decision: D-311 "It opens of itself at the end of the map run once the scene's effect of the death or the completion has played"
  // decision: D-368 "When a manual map run ends in a character's death or a completion, the end-of-run window opens of itself over the screen of the map run"
  // decision: D-371 "Whether the end-of-run window (D-368) is open is a memory of the page"
  for (const events of [DIED, COMPLETED]) {
    const { screen, game, take } = screenOf(going());
    screen.entered();
    take(ended(game.state), events, true);
    assert.equal(screen.windowShown(), false, "the window waits");
    screen.effectEnded();
    assert.equal(screen.windowShown(), true, "the effect has ended");
  }
});

// Catches a wait where the scene shows no effect: the window would never open.
test("the window opens at once where the system asks for less motion, where the events hold no end of the effect's kind and where the player is on another screen", () => {
  // decision: D-311 "It opens of itself at the end of the map run once the scene's effect of the death or the completion has played"
  const reduced = screenOf(going(), { reduced: true });
  reduced.screen.entered();
  reduced.take(ended(reduced.game.state), DIED, true);
  assert.equal(reduced.screen.windowShown(), true, "reduced motion");

  const plain = screenOf(going());
  plain.screen.entered();
  plain.take(ended(plain.game.state), [], true);
  assert.equal(plain.screen.windowShown(), true, "no effect in the events");

  const away = screenOf(going());
  away.take(ended(away.game.state), DIED, true);
  away.screen.entered();
  assert.equal(
    away.screen.windowShown(),
    true,
    "ended on another screen, the entering shows the last image at once",
  );
});

// Catches a wait that outlives the screen: a player who leaves and comes back would see no window.
test("leaving the screen ends the wait for the effect, and the window stands at the next entering", () => {
  // decision: D-311 "It opens of itself at the end of the map run once the scene's effect of the death or the completion has played"
  // decision: D-371 "Whether the end-of-run window (D-368) is open is a memory of the page"
  const { screen, game, take } = screenOf(going());
  screen.entered();
  take(ended(game.state), DIED, true);
  screen.left();
  screen.entered();
  assert.equal(screen.windowShown(), true);
});

// Catches the window that opens again after „Wróć”, which D-173 forbids, and one that stands with
// the question.
test("the question closes the window, which stays closed after „Wróć”", () => {
  // decision: D-173 "„Zapisz” saves the copy as „Zapisz w programie” does, replacing the changes its program holds that the copy lacks, or, where its program was deleted, as a new program under the first free name with no name field, and ends the map run; „Odrzuć” ends it with no save; „Wróć” closes the question and leaves the map run as it was"
  // decision: D-311 "After a character's death or a completion that window (D-368) stands over this screen"
  // decision: D-371 "Whether the end-of-run window (D-368) is open is a memory of the page"
  const { screen } = screenOf(renamed(ended(going())));
  screen.entered();
  assert.equal(screen.windowShown(), true, "precondition: the window stands");
  const asked = screen.ask(null);
  assert.deepEqual(asked, { resume: false, opens: null });
  assert.equal(screen.windowShown(), false);
  assert.equal(screen.closeQuestion(), true);
  assert.equal(screen.question(), null);
  assert.equal(screen.windowShown(), false, "„Wróć” does not open it");
});

// Catches a „Wróć” that puts a paused map run going, or leaves a map run that went on paused (D-324).
test("the question remembers whether the map run went on, and which button asked it", () => {
  // decision: D-324 "While the question „Zapisać, odrzucić, wrócić?” of D-173 stands, the map run is paused as „Pauza” pauses it"
  const goingOn = screenOf(renamed(going()));
  goingOn.screen.entered();
  assert.deepEqual(goingOn.screen.ask("forest"), {
    resume: true,
    opens: "forest",
  });
  assert.equal(goingOn.screen.ask(null), null, "a second ask leaves it");
  assert.deepEqual(goingOn.screen.question(), {
    resume: true,
    opens: "forest",
  });

  const standing = screenOf(setPaused(renamed(going()), true).state);
  standing.screen.entered();
  assert.deepEqual(standing.screen.ask(null), { resume: false, opens: null });
});

// Catches a question that stands over a copy with no unsaved changes (D-324).
test("the question goes when the copy no longer holds unsaved changes, and stays while it does", () => {
  // decision: D-324 "The rest of the screen works as usual"
  const { screen, game, take } = screenOf(renamed(going()));
  screen.entered();
  screen.ask(null);
  take(renamed(game.state));
  assert.notEqual(screen.question(), null, "still unsaved");
  take(going());
  assert.equal(screen.question(), null, "the copy matches its program again");
});

// Catches „Koniec przejścia” that leaves the question standing beside the window (D-311, D-324).
test("„Koniec przejścia” closes a standing question and opens the window, and does nothing over a map run that goes on", () => {
  // decision: D-324 "The rest of the screen works as usual"
  const ending = screenOf(renamed(ended(going())));
  ending.screen.entered();
  ending.screen.ask(null);
  assert.equal(ending.screen.openWindow(), true, "it closed the question");
  assert.equal(ending.screen.question(), null);
  assert.equal(ending.screen.windowShown(), true);
  assert.equal(ending.screen.openWindow(), false, "no question was standing");

  const running = screenOf(renamed(going()));
  running.screen.entered();
  running.screen.ask(null);
  assert.equal(running.screen.openWindow(), false);
  assert.notEqual(running.screen.question(), null, "the question stays");
});

// Catches the end of the map run that leaves its question standing.
test("the end of the map run drops the question", () => {
  const { screen } = screenOf(renamed(going()));
  screen.entered();
  screen.ask(null);
  screen.forgetQuestion();
  assert.equal(screen.question(), null);
});

// Catches a screen state that changes after an error nothing handled (D-323): the window, the
// question and the wait stay as they were.
test("after halt the question, the window and the wait change nothing, while entering and leaving go on", () => {
  const asking = screenOf(renamed(ended(going())));
  asking.screen.entered();
  asking.screen.closeWindow();
  asking.screen.openWindow();
  asking.screen.ask(null);
  assert.notEqual(asking.screen.question(), null, "precondition: it stands");
  asking.game.halted = true;
  assert.equal(asking.screen.closeQuestion(), false);
  assert.equal(asking.screen.openWindow(), false);
  assert.notEqual(asking.screen.question(), null, "the question stays");
  asking.screen.left();
  assert.notEqual(
    asking.screen.question(),
    null,
    "leaving leaves a standing question after halt",
  );
  asking.screen.forgetQuestion();
  assert.equal(asking.screen.question(), null, "the end of a map run drops it");

  const standing = screenOf(ended(going()));
  standing.screen.entered();
  standing.game.halted = true;
  standing.screen.closeWindow();
  assert.equal(standing.screen.windowShown(), true, "„✕” does nothing");
  assert.equal(standing.screen.ask(null), null);

  const waiting = screenOf(going());
  waiting.screen.entered();
  waiting.take(ended(waiting.game.state), DIED, true);
  waiting.game.halted = true;
  waiting.screen.effectEnded();
  assert.equal(waiting.screen.windowShown(), false, "the wait goes on");
  waiting.screen.left();
  waiting.screen.entered();
  assert.equal(
    waiting.screen.windowShown(),
    true,
    "navigation goes on: leaving ended the wait and the entering opened the window",
  );
});

// Catches a window opened before the page placed the game that takes no focus, or takes it twice.
test("a window that stands when the game is built owes the focus once, after the game stands in the page", () => {
  // decision: D-370 "The window takes the focus when it opens"
  const { screen } = screenOf(ended(going()));
  screen.entered();
  screen.built();
  assert.equal(screen.takeOwedFocus(false), false, "not in the page yet");
  assert.equal(screen.takeOwedFocus(true), true);
  assert.equal(screen.takeOwedFocus(true), false, "owed once");

  const away = screenOf(ended(going()));
  away.screen.built();
  assert.equal(
    away.screen.takeOwedFocus(true),
    false,
    "no window stands over another screen",
  );
});
