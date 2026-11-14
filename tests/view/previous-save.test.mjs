// The pull of the previous save on the screen Programy (D-401, D-400, D-167, D-169, D-206, D-207,
// D-208, D-211) on jsdom through tests/view/page-document.mjs (D-264). The game view is built as the
// page builds it (tests/view/end-question.test.mjs does the same), with a client whose answers the
// case gives when it chooses, and the pull is driven through the button the player presses; the game
// state is read back from the document the view keeps (`keep`) and the saves from what the client was
// sent. The page's part of the reset (D-402) runs through `startApp` with a client that holds every
// call until the case answers it. Every expected value is written out here. Real events, the look and the focus ring are the
// browser check's (D-88).
import { assert, inAct, press, settle, withPage } from "./page-document.mjs";
import { mock, test } from "node:test";
import {
  createCharacter,
  newGame,
  send,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { createProgram } from "../../dist/browser/sim/programs.js";
import { savedGame } from "../../dist/browser/sim/saved-game.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";
import {
  CHECK_FAILED,
  FETCH_FAILED,
  GAME_STARTS_ANEW,
  NOT_ALLOWED,
  NO_PREVIOUS_SAVE,
  RESET_FAILED,
  RESET_NOT_ALLOWED,
  programsWord,
  pullResultLine,
} from "../../dist/browser/view/previous-save-lines.js";

// --- the page on jsdom --------------------------------------------------------------------------

/** The real date the page's clock reads. */
const CLOCK_MS = 1_760_000_000_000;
const PROGRAMS = "#/programy";
const HEADQUARTERS = "#/";
const PULL_TEXT = "Wciągnij programy z poprzedniego zapisu";

/** A stand-in for `performance` that a case moves by hand (the page's React measures through it). */
const handClock = (now) => ({
  now,
  measure: () => undefined,
  clearMeasures: () => undefined,
});

/** Runs `body` on a window of its own with Node's mocked timers and the real date at `CLOCK_MS`. */
async function onPage(body) {
  await withPage(async ({ root }) => {
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    const date = mock.method(Date, "now", () => CLOCK_MS);
    const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: handClock(() => 0),
    });
    try {
      await body({ root });
    } finally {
      Object.defineProperty(globalThis, "performance", saved);
      mock.timers.reset();
      date.mock.restore();
    }
  });
}

const all = (root) => [root, ...root.querySelectorAll("*")];
const pageDocument = () => globalThis.document;

/** The address of the page with a history of its own, as the page's tests build it. */
function fakeAddress(hash) {
  const listeners = new Set();
  const address = {
    entries: [hash],
    index: 0,
    hash: () => address.entries[address.index],
    go(next) {
      address.entries.splice(address.index + 1);
      address.entries.push(next);
      address.index += 1;
    },
    replace(next) {
      address.entries[address.index] = next;
    },
    reload() {},
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    follow(next) {
      address.go(next);
      for (const listener of listeners) listener();
    },
  };
  return address;
}

/**
 * A client whose answers the case gives. `saveGame` answers at once and keeps what it was sent;
 * `loadPreviousSavedGame` keeps each question until the case answers it, in the order asked.
 */
function heldClient({ saveAnswer = { kind: "saved", revision: 2 } } = {}) {
  const questions = [];
  const saves = [];
  return {
    questions,
    saves,
    client: {
      saveGame(submission) {
        saves.push(submission);
        return Promise.resolve(saveAnswer);
      },
      loadPreviousSavedGame() {
        return new Promise((resolve) => questions.push(resolve));
      },
    },
    /** Answers the oldest question still open. */
    async answer(result) {
      assert.ok(questions.length > 0, "a question is waiting for its answer");
      questions.shift()(result);
      await settle();
    },
  };
}

/** The game of `state` built in the page as a reload at `hash` builds it. */
async function viewOf(
  state,
  client,
  { hash = PROGRAMS, allowed, onReset } = {},
) {
  const { createGameView } =
    await import("../../dist/browser/view/game-view.js");
  const address = fakeAddress(hash);
  const signedOut = [];
  const view = await inAct(() =>
    createGameView({
      client,
      state,
      revision: 1,
      address,
      entry: "address",
      ...(allowed === undefined ? {} : { previousSaveAllowed: allowed }),
      ...(onReset === undefined ? {} : { onReset }),
      onScreen: () => {},
      onConflict: () => {},
      onOutdated: () => {},
      onSignedOut: () => signedOut.push("signed-out"),
    }),
  );
  pageDocument().body.append(view.element);
  return { view, address, signedOut };
}

/** The game state the view holds now, read from the document it keeps. */
const heldState = (view) => inAct(() => view.keep().document.game);
/** What the player sees of the list: each program's number and name, in order. */
const listed = async (view) =>
  (await heldState(view)).programs.map((saved) => [saved.id, saved.name]);

const pullButton = (view) =>
  all(view.element).find(
    (element) =>
      element.localName === "button" && element.textContent === PULL_TEXT,
  );
const waitingButton = (view) =>
  all(view.element).find(
    (element) =>
      element.localName === "button" && element.textContent === "Wciąganie…",
  );
/** The lines next to the list's acts: each with its class and its text. */
const linesOf = (view) =>
  all(view.element)
    .filter(
      (element) =>
        element.parentElement?.classList.contains("program-actions") &&
        (element.classList.contains("form-note") ||
          element.classList.contains("form-warning")),
    )
    .map((element) => [element.className, element.textContent]);
/** The one line next to the list's acts, as its class and its text. */
function lineOf(view) {
  const lines = linesOf(view);
  assert.equal(lines.length, 1, "one line next to the acts");
  return lines[0];
}
/** Whether an element and every ancestor up to the page's body are shown. */
function shown(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    if (node === pageDocument().body) return true;
  }
  return false;
}

// --- the documents of a previous save -------------------------------------------------------------

const ALWAYS = { kind: "always" };

/** A program of versions 3 to 6: one rule group under „Zawsze” with a trip plan. */
const EXPLORE = {
  groups: [
    {
      id: 1,
      name: "Program",
      condition: ALWAYS,
      rules: [{ id: 1, condition: ALWAYS, action: { kind: "explore" } }],
    },
  ],
  nextGroupId: 2,
  nextRuleId: 2,
  tripPlan: { take: [], bring: [] },
};

/** A program of versions 1 and 2 has no trip plan: the program check refuses it. */
const OLD_EXPLORE = {
  groups: EXPLORE.groups,
  nextGroupId: 2,
  nextRuleId: 2,
};

const LAS = {
  groups: [
    {
      id: 1,
      name: "Program",
      condition: ALWAYS,
      rules: [
        {
          id: 1,
          condition: { kind: "hereBelow", resource: "berry", value: 1 },
          action: { kind: "walkTo", resource: "berry" },
        },
      ],
    },
  ],
  nextGroupId: 2,
  nextRuleId: 2,
  tripPlan: { take: [{ item: "berry", count: 2 }], bring: [] },
};

const item = (id, name, program) => ({ id, name, program });
/** The answer of the client for a previous save of `version` holding `programs`. */
const previous = (programs, version = 6) => ({
  ok: true,
  value: { version, game: { programs, nextProgramId: 99 } },
});
const NO_PREVIOUS = { ok: true, value: null };
const failure = (status, code = null) => ({
  ok: false,
  failure: { kind: "refused", status, code, message: "Odmowa." },
});
const NO_CONNECTION = {
  ok: false,
  failure: { kind: "unreachable", reason: "network", message: "Brak sieci." },
};

/** The game of a new player with a second program, „Program 2”. */
const twoPrograms = () => createProgram(newGame()).state;
/** Ala's map run of the forest under program 1, going on; Skraj lasu, which opens Las, is solved. */
const going = () =>
  send(
    createCharacter(withEdgeSolved(twoPrograms()), "Ala").state,
    { mapId: "forest", characterId: 1, programId: 1 },
    0,
  ).state;

// --- no control for an account without the privilege ----------------------------------------------

// invariant: save-version
// Catches the page asking the server, or drawing the button, for an account the privilege flag is
// false or missing for (D-400): the client given has no `loadPreviousSavedGame`, so a question throws.
test("an account without the flag, or with it false, never asks and has no button, however often the screen is shown", async () => {
  for (const allowed of [undefined, false]) {
    await onPage(async () => {
      const saves = [];
      const client = {
        saveGame: (submission) => {
          saves.push(submission);
          return Promise.resolve({ kind: "saved", revision: 2 });
        },
      };
      const { view, address } = await viewOf(newGame(), client, { allowed });
      assert.equal(pullButton(view), undefined);
      assert.deepEqual(linesOf(view), []);
      await inAct(() => address.follow(HEADQUARTERS));
      await inAct(() => address.follow(PROGRAMS));
      assert.equal(pullButton(view), undefined);
      assert.deepEqual(linesOf(view), []);
      assert.deepEqual(saves, []);
      await inAct(() => view.dispose());
    });
  }
});

// --- the order of the states ----------------------------------------------------------------------

// Catches the button standing while the question is open (the page has no answer that a previous
// save exists), the question asked at building on another screen, one not asked at each entering
// of the screen, and an answer of a document that does not show the button (D-401).
test("the question is asked at each entering of Programy; while it is open the button is away, and a document shows it", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view, address } = await viewOf(newGame(), held.client, {
      hash: HEADQUARTERS,
      allowed: true,
    });
    assert.equal(held.questions.length, 0, "no question away from Programy");
    await inAct(() => address.follow(PROGRAMS));
    assert.equal(held.questions.length, 1);
    assert.equal(pullButton(view), undefined);
    assert.deepEqual(linesOf(view), []);
    await held.answer(previous([item(1, "Las", EXPLORE)]));
    assert.ok(pullButton(view), "a document shows the button");
    assert.equal(pullButton(view).disabled, false);
    assert.equal(pullButton(view).className, "button");
    assert.deepEqual(linesOf(view), []);
    // The answer is used only to show the button; the next entering asks again.
    await inAct(() => address.follow(HEADQUARTERS));
    await inAct(() => address.follow(PROGRAMS));
    assert.equal(held.questions.length, 1);
    assert.equal(pullButton(view), undefined);
    // Another program picked on the screen is no new entering.
    await held.answer(previous([item(1, "Las", EXPLORE)]));
    await inAct(() => address.follow("#/programy/1"));
    assert.equal(held.questions.length, 0);
    assert.ok(pullButton(view));
    await inAct(() => view.dispose());
  });
});

// Catches the page built at the address of Programy not asking (the first screen is not entered by
// a change of address).
test("a game built at the address of Programy asks at once", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    assert.equal(held.questions.length, 1);
    await held.answer(previous([item(1, "Las", EXPLORE)]));
    assert.ok(pullButton(view));
    await inAct(() => view.dispose());
  });
});

// Catches an answer of null drawn as the button, a sentence for a thing that is no failure, and a
// failure left silent: null leaves the button away with no line; a failure one sentence (D-401).
test("an answer of null leaves the button away, and a failure of the check leaves it away with one sentence; the next entering asks again", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view, address } = await viewOf(newGame(), held.client, {
      allowed: true,
    });
    await held.answer(NO_PREVIOUS);
    assert.equal(pullButton(view), undefined);
    assert.deepEqual(linesOf(view), []);
    await inAct(() => address.follow(HEADQUARTERS));
    await inAct(() => address.follow(PROGRAMS));
    await held.answer(NO_CONNECTION);
    assert.equal(pullButton(view), undefined);
    assert.deepEqual(linesOf(view), [["form-warning", CHECK_FAILED.text]]);
    await inAct(() => address.follow(HEADQUARTERS));
    await inAct(() => address.follow(PROGRAMS));
    assert.deepEqual(
      linesOf(view),
      [],
      "the old sentence leaves with the screen",
    );
    assert.equal(held.questions.length, 1, "the next entering asks again");
    await held.answer(previous([item(1, "Las", EXPLORE)]));
    assert.ok(pullButton(view));
    await inAct(() => view.dispose());
  });
});

// --- the pull -------------------------------------------------------------------------------------

// Catches a pull that replaces the list, appends out of order, keeps a taken name or a number, takes
// the document the check saw instead of fetching again (the server may hold another now), changes
// anything but the list and its next number, and does not save at once (D-401, D-169, D-165, D-207).
test("a pull fetches the previous save again and appends its programs in order with free names and the next numbers, and the game saves at once", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(twoPrograms(), held.client, {
      allowed: true,
    });
    await held.answer(previous([item(1, "Las", EXPLORE)]));
    const before = await heldState(view);
    assert.deepEqual(await listed(view), [
      [1, "Program"],
      [2, "Program 2"],
    ]);

    await press(pullButton(view));
    // Waiting: disabled with its own text, and no second question while it waits.
    assert.equal(pullButton(view), undefined);
    assert.equal(waitingButton(view).disabled, true);
    assert.equal(held.questions.length, 1, "the pull asks the server again");
    await press(waitingButton(view));
    assert.equal(held.questions.length, 1);

    await held.answer(
      previous([
        item(7, "Program", EXPLORE),
        item(8, "  Las nocą ", LAS),
        item(9, "program 2", EXPLORE),
      ]),
    );
    assert.deepEqual(await listed(view), [
      [1, "Program"],
      [2, "Program 2"],
      [3, "Program (2)"],
      [4, "Las nocą"],
      [5, "program 2 (2)"],
    ]);
    const after = await heldState(view);
    assert.equal(after.nextProgramId, 6);
    assert.deepEqual(after.programs[3].program, LAS);
    const others = (game) => {
      const copy = structuredClone(game);
      delete copy.programs;
      delete copy.nextProgramId;
      return copy;
    };
    assert.deepEqual(others(after), others(before));
    const [className, text] = lineOf(view);
    assert.equal(className, "form-note");
    assert.match(text, /\b3\b/, "the count of the appended programs");
    // Back at rest, pressable again, with the focus owed to it by the list.
    assert.equal(waitingButton(view), undefined);
    assert.equal(pullButton(view).disabled, false);
    // One save, at once, holding the new list.
    assert.equal(held.saves.length, 1);
    assert.deepEqual(
      held.saves[0].game.programs.map((saved) => saved.name),
      ["Program", "Program 2", "Program (2)", "Las nocą", "program 2 (2)"],
    );
    await inAct(() => view.dispose());
  });
});

// Catches a button that goes away after a pull: a second press appends copies again (D-401).
test("after a pull the button stays, and a second press appends the programs again as copies", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Las", LAS)]));
    for (let round = 0; round < 2; round += 1) {
      await press(pullButton(view));
      await held.answer(previous([item(1, "Las", LAS)]));
    }
    assert.deepEqual(await listed(view), [
      [1, "Program"],
      [2, "Las"],
      [3, "Las (2)"],
    ]);
    assert.ok(pullButton(view));
    assert.equal(held.saves.length, 2);
    await inAct(() => view.dispose());
  });
});

// Catches a pull that stops at the first program the check refuses, a skipped program missing from
// the sentence or named in a sentence of its own, and a count that counts the skipped ones.
test("skipped programs stand in one sentence by their names, and the others are appended", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(
      previous([
        item(1, "Stary", OLD_EXPLORE),
        item(2, "Las", LAS),
        { id: 3, name: "Obcy", program: EXPLORE, extra: true },
        item(4, "   ", EXPLORE),
        item(5, "Noc", EXPLORE),
      ]),
    );
    assert.deepEqual(await listed(view), [
      [1, "Program"],
      [2, "Las"],
      [3, "Noc"],
    ]);
    const [className, text] = lineOf(view);
    assert.equal(className, "form-note");
    assert.match(
      text,
      /\b2\b/,
      "the count of the appended, no skipped one in it",
    );
    for (const name of ["Stary", "Obcy"])
      assert.ok(text.includes(name), `${name} is named`);
    assert.match(text, /\b4\b/, "the program with no name by its place");
    for (const name of ["Las", "Noc"])
      assert.ok(!text.includes(name), `${name} was appended, not skipped`);
    await inAct(() => view.dispose());
  });
});

// Catches only-skipped documents counted as a pull of zero programs or given the sentence of no
// readable program, and nothing saved or appended where nothing was accepted.
test("a document with every program skipped gives the skipped sentence alone and changes nothing", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Stary", OLD_EXPLORE)]));
    await press(pullButton(view));
    await held.answer(previous([item(1, "Stary", OLD_EXPLORE)]));
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    const [className, text] = lineOf(view);
    assert.equal(className, "form-note");
    assert.ok(text.includes("Stary"), "the skipped program is named");
    assert.doesNotMatch(text, /\d/, "no count of appended programs");
    assert.deepEqual(held.saves, []);
    await inAct(() => view.dispose());
  });
});

// Catches an unreadable document (a version above the game's, a game with no list) or a list with no
// program giving anything but the sentence that the save holds no program the game can read, and the
// button going away for it.
test("an unreadable document, and one with no program, give the sentence of no readable program; nothing is appended or saved", async () => {
  const sentence = pullResultLine({ ok: false }).text;
  for (const document of [
    previous([item(1, "Las", LAS)], 7),
    { ok: true, value: { version: 6, game: {} } },
    previous([]),
  ]) {
    await onPage(async () => {
      const held = heldClient();
      const { view } = await viewOf(newGame(), held.client, { allowed: true });
      await held.answer(previous([item(1, "Las", LAS)]));
      await press(pullButton(view));
      await held.answer(document);
      assert.deepEqual(await listed(view), [[1, "Program"]]);
      assert.deepEqual(linesOf(view), [["form-note", sentence]]);
      assert.ok(pullButton(view), "the button stays for another try");
      assert.deepEqual(held.saves, []);
      await inAct(() => view.dispose());
    });
  }
});

// Catches an answer of null at the pull drawn as a failure or leaving the button: the previous save
// is gone, so one sentence and no control (D-401).
test("a pull that finds no previous save says so and the button goes away", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(NO_PREVIOUS);
    assert.deepEqual(linesOf(view), [["form-note", NO_PREVIOUS_SAVE.text]]);
    assert.equal(pullButton(view), undefined);
    assert.equal(waitingButton(view), undefined);
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    await inAct(() => view.dispose());
  });
});

// Catches a failed fetch that drops the button, appends something or is drawn as a result, and a
// retry that does not work: the control stays for a retry (D-401).
test("a failed fetch is one warning, the button stays, and a retry appends", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(failure(500));
    assert.deepEqual(linesOf(view), [["form-warning", FETCH_FAILED.text]]);
    assert.equal(pullButton(view).disabled, false);
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    await press(pullButton(view));
    await held.answer(previous([item(1, "Las", LAS)]));
    assert.deepEqual(await listed(view), [
      [1, "Program"],
      [2, "Las"],
    ]);
    const [className, text] = lineOf(view);
    assert.equal(className, "form-note");
    assert.match(text, /\b1\b/, "the count of the appended programs");
    await inAct(() => view.dispose());
  });
});

// Catches a 401 of the pull shown as a sentence or ignored: it goes to the page as a save's 401
// does (D-211), once, and appends nothing.
test("a 401 at the pull goes to the page as a save's 401, and nothing is appended", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view, signedOut } = await viewOf(newGame(), held.client, {
      allowed: true,
    });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(failure(401, "unauthenticated"));
    assert.deepEqual(signedOut, ["signed-out"]);
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    assert.deepEqual(held.saves, []);
    await inAct(() => view.dispose());
  });
});

// Catches a 403 of the pull told as a failed fetch, the button kept for an account the server says
// has no privilege, or an append (D-400).
test("a 403 previous-save-forbidden says the account has no such privilege now, and the button goes away", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view, signedOut } = await viewOf(newGame(), held.client, {
      allowed: true,
    });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(failure(403, "previous-save-forbidden"));
    assert.deepEqual(linesOf(view), [["form-warning", NOT_ALLOWED.text]]);
    assert.equal(pullButton(view), undefined);
    assert.equal(waitingButton(view), undefined);
    assert.deepEqual(signedOut, []);
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    await inAct(() => view.dispose());
  });
});

// Catches a name of the document written into the page as markup (D-401: shown only as text).
test("names from the document are shown as text, in the sentence and in the list", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(
      previous([
        item(1, '<img src="x" onerror="1">', LAS),
        { id: 2, name: "<b>Obcy</b>", program: EXPLORE, extra: 1 },
      ]),
    );
    // The page holds images and bold text of its own; what the names must not make is more of them.
    const programsScreen = all(view.element).find((e) =>
      e.classList.contains("programs-screen"),
    );
    assert.equal(
      programsScreen.querySelectorAll("img, b, [onerror]").length,
      0,
    );
    const [className, text] = lineOf(view);
    assert.equal(className, "form-note");
    assert.match(text, /\b1\b/, "the count of the appended programs");
    assert.ok(text.includes("<b>Obcy</b>"), "the skipped name, as text");
    assert.deepEqual(await listed(view), [
      [1, "Program"],
      [2, '<img src="x" onerror="1">'],
    ]);
    await inAct(() => view.dispose());
  });
});

// Catches a pull that is not an act through the one place: an act is saved at once (D-207) and a save
// over the limit shows the sentence of D-208 as any save does.
test("a state over the limit after a pull gets the sentence of D-208 in the line of saving", async () => {
  await onPage(async () => {
    const held = heldClient({ saveAnswer: { kind: "too-large" } });
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(previous([item(1, "Las", LAS)]));
    assert.equal(held.saves.length, 1);
    assert.equal(
      view.saveLine.textContent,
      "Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.",
    );
    await inAct(() => view.dispose());
  });
});

// --- late answers ---------------------------------------------------------------------------------

// Catches an answer of the check that arrives after the player left the screen still showing the
// button on the next entering, or an answer of a game disposed meanwhile doing anything.
test("an answer of the check that comes after the player left the screen is ignored, and so is one that comes after the game was disposed", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view, address } = await viewOf(newGame(), held.client, {
      allowed: true,
    });
    await inAct(() => address.follow(HEADQUARTERS));
    await inAct(() => address.follow(PROGRAMS));
    assert.equal(held.questions.length, 2);
    // The first answer comes late, while the second question is open.
    held.questions.shift()(previous([item(1, "Las", LAS)]));
    await settle();
    assert.equal(pullButton(view), undefined, "a late answer shows nothing");
    await held.answer(NO_PREVIOUS);
    assert.equal(pullButton(view), undefined);

    await inAct(() => address.follow(HEADQUARTERS));
    await inAct(() => address.follow(PROGRAMS));
    await inAct(() => view.dispose());
    await held.answer(previous([item(1, "Las", LAS)]));
    assert.equal(pullButton(view), undefined);
    assert.deepEqual(held.saves, []);
  });
});

// Catches the answer of a pull that comes after the player left the screen appending the programs.
test("the answer of a pull that comes after the player left the screen appends nothing and saves nothing", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view, address } = await viewOf(newGame(), held.client, {
      allowed: true,
    });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await inAct(() => address.follow(HEADQUARTERS));
    await held.answer(previous([item(1, "Las", LAS)]));
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    assert.deepEqual(held.saves, []);
    // Coming back asks anew, and the button is not left waiting by the pull that was dropped.
    await inAct(() => address.follow(PROGRAMS));
    assert.equal(waitingButton(view), undefined);
    assert.equal(pullButton(view), undefined);
    await held.answer(previous([item(1, "Las", LAS)]));
    assert.ok(pullButton(view));
    assert.equal(pullButton(view).disabled, false);
    await inAct(() => view.dispose());
  });
});

// --- a map run ------------------------------------------------------------------------------------

// Catches the button tied to there being no map run: it stands and works while a manual map run
// goes on and while one has ended and waits, and the map run itself is left as it was (D-401).
test("the pull works while a manual map run goes on and while one has ended", async () => {
  const ended = () => {
    const state = going();
    return {
      ...state,
      paused: false,
      run: { ...state.run, minute: 480, completion: { minute: 480 } },
    };
  };
  for (const state of [going(), { ...going(), paused: true }, ended()]) {
    await onPage(async () => {
      const held = heldClient();
      const { view } = await viewOf(state, held.client, { allowed: true });
      await held.answer(previous([item(1, "Las", LAS)]));
      assert.ok(pullButton(view), "the button stands beside the map run");
      const before = await heldState(view);
      await press(pullButton(view));
      await held.answer(previous([item(1, "Las", LAS)]));
      const after = await heldState(view);
      assert.deepEqual(
        after.programs.map((saved) => saved.name),
        ["Program", "Program 2", "Las"],
      );
      assert.deepEqual(after.run, before.run);
      assert.equal(held.saves.length, 1);
      await inAct(() => view.dispose());
    });
  }
});

// --- the page -------------------------------------------------------------------------------------

// invariant: save-version
// Catches the page not giving the game the account's flag (the game then never asks, or asks for
// every account): the flag comes from the account the server names, a missing flag counts as false.
test("the page gives the game the account's flag: only a privileged account's game asks for the previous save", async () => {
  const { startApp } = await import("../../dist/browser/view/app.js");
  for (const allowed of [true, false, undefined]) {
    await onPage(async () => {
      const calls = [];
      const hold =
        (name) =>
        (...args) =>
          new Promise((resolve) => calls.push({ name, args, resolve }));
      const client = {
        currentAccount: hold("currentAccount"),
        loadSavedGame: hold("loadSavedGame"),
        loadPreviousSavedGame: hold("loadPreviousSavedGame"),
        saveGame: () => new Promise(() => undefined),
        reportBrowserFailure: () => Promise.resolve({ ok: true, value: null }),
      };
      const answer = async (name, result) => {
        const index = calls.findIndex((entry) => entry.name === name);
        assert.notEqual(index, -1, `no ${name} call is waiting`);
        const [entry] = calls.splice(index, 1);
        entry.resolve(result);
        await settle();
      };
      await inAct(() =>
        startApp(pageDocument().body, client, fakeAddress(PROGRAMS)),
      );
      await settle();
      await answer("currentAccount", {
        ok: true,
        value: {
          id: "a1",
          email: "ala@example.test",
          emailConfirmed: true,
          ...(allowed === undefined ? {} : { previousSaveAllowed: allowed }),
        },
      });
      await answer("loadSavedGame", { ok: true, value: null });
      const asked = calls.filter(
        (entry) => entry.name === "loadPreviousSavedGame",
      );
      assert.equal(asked.length, allowed === true ? 1 : 0);
      const buttons = () =>
        all(pageDocument().body).filter(
          (element) =>
            element.localName === "button" && element.textContent === PULL_TEXT,
        );
      assert.equal(buttons().length, 0, "no button before the answer");
      if (allowed === true) {
        await answer("loadPreviousSavedGame", previous([item(1, "Las", LAS)]));
        assert.equal(buttons().length, 1);
      }
    });
  }
});

// --- the screens ----------------------------------------------------------------------------------

// Catches the button, drawn once, shown on a screen other than Programy: it stands in the screen
// Programy alone, which the other screens hide.
test("the button stands in the screen Programy alone", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view, address } = await viewOf(newGame(), held.client, {
      allowed: true,
    });
    await held.answer(previous([item(1, "Las", LAS)]));
    assert.equal(shown(pullButton(view)), true);
    await inAct(() => address.follow(HEADQUARTERS));
    assert.equal(
      pullButton(view) === undefined || !shown(pullButton(view)),
      true,
    );
    await inAct(() => view.dispose());
  });
});

// --- the sentences --------------------------------------------------------------------------------

// Catches a Polish plural said wrong: 1 program, 2 to 4 programy, the rest programów, the teens
// 12 to 14 among the rest.
test("the word for a count of programs follows Polish plural", () => {
  const words = [1, 2, 3, 4, 5, 11, 12, 14, 21, 22, 25, 112].map((count) =>
    programsWord(count),
  );
  assert.deepEqual(words, [
    "program",
    "programy",
    "programy",
    "programy",
    "programów",
    "programów",
    "programów",
    "programów",
    "programów",
    "programy",
    "programów",
    "programów",
  ]);
});

// Catches a result line whose role or parts are wrong where no view case reaches them.
test("the result line of the reader's answer names the appended count and the skipped programs", () => {
  const read = (name) => ({ kind: "read", name, program: {} });
  const skipped = (name) => ({ kind: "skipped", name });
  assert.deepEqual(pullResultLine({ ok: false }), {
    role: "text",
    text: "Poprzedni zapis nie zawiera programów, które ta wersja gry potrafi wczytać.",
  });
  assert.deepEqual(pullResultLine({ ok: true, items: [] }), {
    role: "text",
    text: "Poprzedni zapis nie zawiera programów, które ta wersja gry potrafi wczytać.",
  });
  assert.deepEqual(
    pullResultLine({ ok: true, items: [read("A"), read("B"), read("C")] }),
    { role: "text", text: "Wciągnięto 3 programy." },
  );
  assert.deepEqual(
    pullResultLine({
      ok: true,
      items: [read("A"), skipped("B"), { kind: "skipped", place: 3 }],
    }),
    {
      role: "text",
      text: "Wciągnięto 1 program. Pominięto programy, których ta wersja gry nie przyjmuje: „B”, bez nazwy (pozycja 3).",
    },
  );
});

// --- the reset of the game (D-402) ----------------------------------------------------------------

const RESET_TEXT = "Zacznij od zera";
const RESET_CONFIRM_TEXT = "Tak, zacznij od zera";
const WITHDRAW_TEXT = "Wróć";
const buttonOf = (view, text) =>
  all(view.element).find(
    (element) => element.localName === "button" && element.textContent === text,
  );
const resetButton = (view) => buttonOf(view, RESET_TEXT);
const confirmation = (view) =>
  view.element.querySelector(".program-reset-confirm");

// Catches the control on an account the page gives no privilege, or a game given no callback for a
// confirmed reset: the control then stands in the page of no one who may not reset (D-402).
test("the reset control stands only for a privileged account whose page gives the game a callback", async () => {
  const cases = [
    [undefined, undefined],
    [false, () => {}],
    [true, undefined],
  ];
  for (const [allowed, onReset] of cases) {
    await onPage(async () => {
      const held = heldClient();
      const { view } = await viewOf(twoPrograms(), held.client, {
        allowed,
        onReset,
      });
      assert.equal(resetButton(view), undefined);
      await inAct(() => view.dispose());
    });
  }
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(twoPrograms(), held.client, {
      allowed: true,
      onReset: () => {},
    });
    await held.answer(NO_PREVIOUS);
    assert.ok(
      resetButton(view),
      "the control stands for the privileged account",
    );
    await inAct(() => view.dispose());
  });
});

// Catches a click that resets, saves or changes the game before the player confirms (D-402): the
// click that opens the confirmation sends nothing and changes nothing.
test("the click that opens the confirmation sends nothing and changes nothing", async () => {
  await onPage(async () => {
    const held = heldClient();
    const resets = [];
    const { view } = await viewOf(twoPrograms(), held.client, {
      allowed: true,
      onReset: () => resets.push("reset"),
    });
    await held.answer(NO_PREVIOUS);
    const before = await heldState(view);
    await press(resetButton(view));
    assert.ok(confirmation(view), "the confirmation stands");
    assert.deepEqual(resets, []);
    assert.deepEqual(held.saves, []);
    assert.deepEqual(await heldState(view), before);
    await inAct(() => view.dispose());
  });
});

// Catches a confirmation that does not say that an earlier previous save is replaced and that its
// programs can no longer be pulled, and a withdraw that changes anything (D-402).
test("the confirmation names the replacement of an earlier previous save, and withdrawing changes nothing", async () => {
  await onPage(async () => {
    const held = heldClient();
    const resets = [];
    const { view } = await viewOf(twoPrograms(), held.client, {
      allowed: true,
      onReset: () => resets.push("reset"),
    });
    await held.answer(NO_PREVIOUS);
    const before = await heldState(view);
    await press(resetButton(view));
    const sentence = confirmation(view).querySelector(".program-reset-text");
    assert.match(sentence.textContent, /poprzedniego zapisu/);
    assert.match(sentence.textContent, /zastąp/);
    assert.match(sentence.textContent, /zera/);
    await press(buttonOf(view, WITHDRAW_TEXT));
    assert.equal(confirmation(view), null);
    assert.deepEqual(resets, []);
    assert.deepEqual(held.saves, []);
    assert.deepEqual(await heldState(view), before);
    await inAct(() => view.dispose());
  });
});

// Catches a confirmed reset that calls the page twice, a control that stays pressable while the page
// waits, a save sent before the page's act, and a failure that does not return the control to rest
// with its sentence (D-402, D-44).
test("a confirmed reset calls the page once, waits for its answer, and a failure returns the control to rest with its sentence", async () => {
  await onPage(async () => {
    const held = heldClient();
    const resets = [];
    const { view } = await viewOf(twoPrograms(), held.client, {
      allowed: true,
      onReset: () => resets.push("reset"),
    });
    await held.answer(NO_PREVIOUS);
    await press(resetButton(view));
    await press(buttonOf(view, RESET_CONFIRM_TEXT));
    assert.deepEqual(resets, ["reset"]);
    assert.equal(confirmation(view), null);
    assert.equal(resetButton(view).disabled, true);
    await press(resetButton(view));
    assert.deepEqual(resets, ["reset"]);
    assert.deepEqual(held.saves, []);
    await inAct(() =>
      view.setReset({ waiting: false, sentence: RESET_FAILED }),
    );
    assert.equal(resetButton(view).disabled, false);
    assert.deepEqual(linesOf(view), [["form-warning", RESET_FAILED]]);
    await inAct(() => view.setReset({ waiting: false, sentence: null }));
    assert.deepEqual(linesOf(view), []);
    await inAct(() => view.dispose());
  });
});

// Catches a confirmation that stays open when the player leaves Programy, and a game that asks the
// server for the reset itself: the client given has no reset method, so a call of one would throw.
test("leaving Programy closes the confirmation, and the game asks the server for no reset", async () => {
  await onPage(async () => {
    const held = heldClient();
    const resets = [];
    const { view, address } = await viewOf(twoPrograms(), held.client, {
      allowed: true,
      onReset: () => resets.push("reset"),
    });
    await held.answer(NO_PREVIOUS);
    await press(resetButton(view));
    assert.ok(confirmation(view), "the confirmation stands");
    await inAct(() => address.follow(HEADQUARTERS));
    await inAct(() => address.follow(PROGRAMS));
    assert.equal(confirmation(view), null);
    assert.ok(resetButton(view));
    assert.deepEqual(resets, []);
    assert.deepEqual(held.saves, []);
    await inAct(() => view.dispose());
  });
});

// --- the page's reset (D-402, D-209, D-211, D-97) -------------------------------------------------

const RESET_OK = { ok: true, value: null };
const FORBIDDEN = failure(403, "previous-save-forbidden");
const SERVER_ERROR = failure(500);
const NO_SESSION = failure(401, "unauthenticated");
const EXPIRED_SENTENCE =
  "Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.";

/**
 * The page started through `startApp` with a client that holds every call until the case answers
 * it, signed in as an account with (or without) the privilege and showing Programy with the game of
 * `state`, loaded at `revision`. `log` is every call in the order it was made.
 */
async function startedPage(options = {}) {
  // An `allowed` the case gives as undefined stays undefined: the account answer then has no flag.
  const { allowed, state, revision } = {
    allowed: true,
    state: twoPrograms(),
    revision: 3,
    ...options,
  };
  const { startApp } = await import("../../dist/browser/view/app.js");
  const calls = [];
  const log = [];
  const hold =
    (name) =>
    (...args) =>
      new Promise((resolve) => {
        log.push(name);
        calls.push({ name, args, resolve });
      });
  const client = {
    currentAccount: hold("currentAccount"),
    loadSavedGame: hold("loadSavedGame"),
    loadPreviousSavedGame: hold("loadPreviousSavedGame"),
    resetSavedGame: hold("resetSavedGame"),
    saveGame: hold("saveGame"),
    logout: hold("logout"),
    reportBrowserFailure: () => Promise.resolve({ ok: true, value: null }),
  };
  const page = {
    log,
    named: (name) => calls.filter((entry) => entry.name === name),
    async answer(name, result) {
      const index = calls.findIndex((entry) => entry.name === name);
      assert.notEqual(index, -1, `no ${name} call is waiting`);
      const [entry] = calls.splice(index, 1);
      entry.resolve(result);
      await settle();
    },
  };
  await inAct(() =>
    startApp(pageDocument().body, client, fakeAddress(PROGRAMS)),
  );
  await settle();
  await page.answer("currentAccount", {
    ok: true,
    value: {
      id: "a1",
      email: "ala@example.test",
      emailConfirmed: true,
      ...(allowed === undefined ? {} : { previousSaveAllowed: allowed }),
    },
  });
  await page.answer("loadSavedGame", {
    ok: true,
    value: { ...savedGame(withSaveTime(state, CLOCK_MS)), revision },
  });
  if (allowed === true) await page.answer("loadPreviousSavedGame", NO_PREVIOUS);
  return page;
}

const pageButton = (text) =>
  all(pageDocument().body).find(
    (element) => element.localName === "button" && element.textContent === text,
  );
const programNames = () =>
  [...pageDocument().body.querySelectorAll(".program-list-item")].map(
    (element) => element.textContent,
  );
const resetLines = () =>
  [
    ...pageDocument().body.querySelectorAll(".program-actions .form-warning"),
  ].map((element) => element.textContent);
const pageNotices = () =>
  [...pageDocument().body.querySelectorAll(".confirmation-notice")].map(
    (element) => [element.className, element.textContent],
  );
const bodyText = () => pageDocument().body.textContent;

/** The player opens the confirmation and confirms it. */
async function confirmReset() {
  await press(pageButton(RESET_TEXT));
  await press(pageButton(RESET_CONFIRM_TEXT));
}

// Catches a reset control, or a request for a reset, on the page of an account the server names
// without the privilege or with the flag missing (D-400), and a page that asks the server before the
// player confirms (D-402).
test("the page gives the reset control to a privileged account alone, and sends nothing for it before the confirmation", async () => {
  for (const allowed of [false, undefined]) {
    await onPage(async () => {
      const page = await startedPage({ allowed });
      assert.equal(pageButton(RESET_TEXT), undefined);
      assert.deepEqual(page.named("resetSavedGame"), []);
    });
  }
  await onPage(async () => {
    const page = await startedPage({ allowed: true });
    assert.ok(pageButton(RESET_TEXT), "the control stands");
    await press(pageButton(RESET_TEXT));
    await press(pageButton(WITHDRAW_TEXT));
    assert.deepEqual(page.log, [
      "currentAccount",
      "loadSavedGame",
      "loadPreviousSavedGame",
    ]);
  });
});

// Catches a save of the page's own before the reset (D-402, D-207), a reset sent more than once, and a
// "Wyloguj" that stays pressable while the reset waits (the logout would save and end the session).
test("a confirmed reset is the next call after the confirmation, with no save before it, and „Wyloguj” cannot be pressed while it waits", async () => {
  await onPage(async () => {
    const page = await startedPage();
    await confirmReset();
    assert.deepEqual(page.log, [
      "currentAccount",
      "loadSavedGame",
      "loadPreviousSavedGame",
      "resetSavedGame",
    ]);
    assert.equal(pageButton(RESET_TEXT).disabled, true, "the control waits");
    await press(pageButton("Konto"));
    const logout = pageButton("Wyloguj");
    assert.equal(logout.disabled, true);
    assert.equal(logout.textContent, "Wyloguj");
    await press(logout);
    assert.deepEqual(page.named("saveGame"), []);
    assert.deepEqual(page.named("logout"), []);
    assert.equal(page.named("resetSavedGame").length, 1);
    // The failure gives „Wyloguj” back.
    await page.answer("resetSavedGame", SERVER_ERROR);
    assert.equal(pageButton("Wyloguj").disabled, false);
    assert.equal(pageButton(RESET_TEXT).disabled, false);
  });
});

// Catches a new game built on a revision other than 0, one saved at once, one that loads the server's
// save again, a missing sentence above it, and the game left on another screen (D-402, D-209).
test("on 204 the page builds a new game on revision 0 with the sentence above it, and sends no save at once", async () => {
  await onPage(async () => {
    const page = await startedPage();
    assert.deepEqual(programNames(), ["Program", "Program 2"]);
    await confirmReset();
    await page.answer("resetSavedGame", RESET_OK);
    assert.deepEqual(programNames(), ["Program"], "the game is a new one");
    assert.ok(shown(pageDocument().body.querySelector(".program-list-item")));
    const notices = pageNotices();
    assert.equal(notices.length, 1);
    assert.match(notices[0][0], /positive/);
    assert.equal(notices[0][1], GAME_STARTS_ANEW);
    assert.deepEqual(page.named("saveGame"), [], "no save at once");
    assert.equal(page.named("loadSavedGame").length, 0);
    // The first save of the new game is based on 0, as for an account with no save.
    await press(pageButton("Nowy program"));
    const saves = page.named("saveGame");
    assert.equal(saves.length, 1);
    assert.equal(saves[0].args[0].basedOn, 0);
    assert.equal(saves[0].args[0].game.programs.length, 2);
  });
});

// Catches a new game with no question about the previous save, so that its programs cannot be pulled
// (task point 5): the new game's Programy asks again and the pull appends the reset game's programs.
test("after the reset the new game's Programy asks for the previous save, and its programs can be pulled", async () => {
  await onPage(async () => {
    const page = await startedPage();
    await confirmReset();
    await page.answer("resetSavedGame", RESET_OK);
    assert.equal(page.named("loadPreviousSavedGame").length, 1);
    await page.answer("loadPreviousSavedGame", previous([item(1, "Las", LAS)]));
    await press(pageButton(PULL_TEXT));
    await page.answer("loadPreviousSavedGame", previous([item(1, "Las", LAS)]));
    assert.deepEqual(programNames(), ["Program", "Las"]);
  });
});

const HELD_OUTCOMES = [
  {
    name: "a conflict",
    outcome: { kind: "conflict" },
    acted: (page) =>
      assert.equal(page.named("loadSavedGame").length, 1, "the server's save"),
    notActed: (page) => assert.equal(page.named("loadSavedGame").length, 0),
  },
  {
    name: "a signed-out answer",
    outcome: { kind: "signed-out" },
    acted: () => assert.match(bodyText(), /Sesja wygasła/),
    notActed: () => assert.doesNotMatch(bodyText(), /Sesja wygasła/),
  },
];

// Catches the old saver's outcome acted on while the reset waits (the page would drop the game, or
// show the forms, under a request that may yet succeed), and one lost after a failure (D-402, D-209,
// D-211): the outcome waits, and a failure acts on it.
for (const held of HELD_OUTCOMES) {
  test(`${held.name} of the old saver during the reset waits, and a failed reset acts on it`, async () => {
    await onPage(async () => {
      const page = await startedPage();
      await press(pageButton("Nowy program"));
      await confirmReset();
      await page.answer("saveGame", held.outcome);
      held.notActed(page);
      assert.deepEqual(programNames(), ["Program", "Program 2", "Program 3"]);
      await page.answer("resetSavedGame", SERVER_ERROR);
      held.acted(page);
    });
  });

  test(`${held.name} of the old saver during the reset is dropped when the reset succeeds`, async () => {
    await onPage(async () => {
      const page = await startedPage();
      await press(pageButton("Nowy program"));
      await confirmReset();
      await page.answer("saveGame", held.outcome);
      await page.answer("resetSavedGame", RESET_OK);
      held.notActed(page);
      assert.deepEqual(programNames(), ["Program"]);
      assert.equal(pageNotices().length, 1);
    });
  });
}

// Catches a conflict from the old game's saver, answered after the reset, that the page acts on: it
// would load the server's save (none) and replace the new game with another new one (D-402, D-209).
test("a conflict that the old saver gets after the reset is not acted on", async () => {
  await onPage(async () => {
    const page = await startedPage();
    await press(pageButton("Nowy program"));
    await confirmReset();
    await page.answer("resetSavedGame", RESET_OK);
    await page.answer("saveGame", { kind: "conflict" });
    assert.equal(page.named("loadSavedGame").length, 0);
    assert.deepEqual(programNames(), ["Program"]);
    assert.equal(pageNotices().length, 1, "the sentence of the reset stands");
  });
});

const FAILED_RESETS = [
  {
    name: "403 previous-save-forbidden",
    answer: FORBIDDEN,
    line: RESET_NOT_ALLOWED,
  },
  { name: "another refusal", answer: SERVER_ERROR, line: RESET_FAILED },
  { name: "no connection", answer: NO_CONNECTION, line: RESET_FAILED },
];

// Catches a failed reset that drops the game, leaves the control waiting or the saving stopped, or
// shows no sentence, or the wrong one for a 403 (D-402, D-400).
for (const { name, answer, line } of FAILED_RESETS) {
  test(`a reset answered with ${name} shows its one sentence, and the game stays, saving on, with the control at rest`, async () => {
    await onPage(async () => {
      const page = await startedPage();
      await confirmReset();
      await page.answer("resetSavedGame", answer);
      assert.deepEqual(resetLines(), [line]);
      assert.deepEqual(programNames(), ["Program", "Program 2"]);
      assert.equal(pageButton(RESET_TEXT).disabled, false);
      assert.deepEqual(pageNotices(), []);
      assert.equal(page.named("loadSavedGame").length, 0);
      await press(pageButton("Nowy program"));
      const saves = page.named("saveGame");
      assert.equal(saves.length, 1, "the game goes on saving");
      assert.equal(saves[0].args[0].basedOn, 3);
    });
  });
}

// Catches a reset answered 401 that is not handled as a save with no session (D-211): the game goes,
// the forms stand with the sentence, and the state is kept for the same account.
test("a reset answered with no session shows the forms with the expired sentence, as a save does", async () => {
  await onPage(async () => {
    const page = await startedPage();
    await confirmReset();
    await page.answer("resetSavedGame", NO_SESSION);
    assert.deepEqual(programNames(), []);
    assert.ok(bodyText().includes(EXPIRED_SENTENCE));
  });
});

// Catches a page that stops a reset while a logout waits, or lets the reset's late answer build a
// game over the forms the logout brought (D-402): the logout's own answer decides what stands.
test("a reset confirmed while a logout waits is sent, and the logout's answer decides what the page shows", async () => {
  await onPage(async () => {
    const page = await startedPage();
    await press(pageButton("Konto"));
    await press(pageButton("Wyloguj"));
    assert.equal(page.named("saveGame").length, 1, "the logout's own save");
    await confirmReset();
    assert.equal(page.named("resetSavedGame").length, 1, "the reset is sent");
    await page.answer("saveGame", { kind: "saved", revision: 4 });
    await page.answer("logout", { ok: true, value: null });
    assert.deepEqual(programNames(), [], "the forms stand");
    await page.answer("resetSavedGame", RESET_OK);
    assert.deepEqual(programNames(), [], "the late answer builds no game");
    assert.deepEqual(pageNotices(), []);
  });
});

/** The text of the page with the menu „Konto” open, where the logout's sentence stands. */
async function textWithMenuOpen() {
  if (!pageButton("Wyloguj")) await press(pageButton("Konto"));
  return bodyText();
}

/** The player opens the menu and presses „Wyloguj”, which sends the logout's own save. */
async function pressLogout() {
  await press(pageButton("Konto"));
  await press(pageButton("Wyloguj"));
}

// Catches the uncertain end of a logout, answered after a reset built the new game, acting on the
// new game: its failure sentence on it, and, where the old game's save lost to a conflict, a reload
// that replaces it with another new game (D-402, D-97, D-209).
test("a logout that fails after the reset built the new game leaves that game as it is, whatever the outcome of the logout's save", async () => {
  for (const outcome of [
    { kind: "saved", revision: 4 },
    { kind: "conflict" },
  ]) {
    await onPage(async () => {
      const page = await startedPage();
      await pressLogout();
      await confirmReset();
      await page.answer("saveGame", outcome);
      assert.equal(page.named("logout").length, 1, "the logout is sent");
      await page.answer("resetSavedGame", RESET_OK);
      assert.deepEqual(programNames(), ["Program"], "the new game");
      await page.answer("logout", NO_CONNECTION);
      assert.deepEqual(programNames(), ["Program"], outcome.kind);
      assert.equal(page.named("loadSavedGame").length, 0, "no reload");
      assert.equal(pageNotices().length, 1, "the sentence of the reset stands");
      assert.ok(
        !(await textWithMenuOpen()).includes(NO_CONNECTION.failure.message),
        "no sentence of the old game's logout",
      );
    });
  }
});

// Catches the reset's success leaving the sentence of an uncertain logout, or „Wyloguj” pressed out
// by it, on the new game that the other order built (D-402, D-97).
test("a reset that succeeds after a logout failed uncertainly builds the new game without that logout's sentence", async () => {
  await onPage(async () => {
    const page = await startedPage();
    await pressLogout();
    await confirmReset();
    await page.answer("saveGame", { kind: "saved", revision: 4 });
    await page.answer("logout", NO_CONNECTION);
    assert.ok(
      (await textWithMenuOpen()).includes(NO_CONNECTION.failure.message),
      "precondition: the old game shows the uncertain end of its logout",
    );
    await page.answer("resetSavedGame", RESET_OK);
    assert.deepEqual(programNames(), ["Program"], "the new game");
    assert.ok(
      !(await textWithMenuOpen()).includes(NO_CONNECTION.failure.message),
    );
    assert.equal(pageButton("Wyloguj").disabled, false);
    assert.equal(page.named("loadSavedGame").length, 0);
    assert.equal(pageNotices().length, 1, "the sentence of the reset stands");
  });
});

// Catches a logout that the server ended, answered after a reset built the new game, left without
// effect: the session is over, so the forms stand, as when the logout answers first (D-97, D-402).
test("a logout that the server ended after the reset built the new game brings the forms", async () => {
  await onPage(async () => {
    const page = await startedPage();
    await pressLogout();
    await confirmReset();
    await page.answer("saveGame", { kind: "saved", revision: 4 });
    await page.answer("resetSavedGame", RESET_OK);
    assert.deepEqual(programNames(), ["Program"], "the new game");
    await page.answer("logout", { ok: true, value: null });
    assert.deepEqual(programNames(), [], "the forms stand");
    assert.ok(pageButton("Zaloguj się"), "the login card");
  });
});
