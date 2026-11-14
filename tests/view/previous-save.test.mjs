// The pull of the previous save on the screen Programy (D-395, D-394, D-167, D-169, D-206, D-207,
// D-208, D-211) on jsdom through tests/view/page-document.mjs (D-264). The game view is built as the
// page builds it (tests/view/end-question.test.mjs does the same), with a client whose answers the
// case gives when it chooses, and the pull is driven through the button the player presses; the game
// state is read back from the document the view keeps (`keep`) and the saves from what the client was
// sent. Every expected value is written out here. Real events, the look and the focus ring are the
// browser check's (D-88).
import { assert, inAct, settle, withPage } from "./page-document.mjs";
import { mock, test } from "node:test";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import { createProgram } from "../../dist/browser/sim/programs.js";
import {
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

function fire(target, type) {
  const { Event } = globalThis.window;
  target.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
}

/** Clicks `target` inside act. */
function press(target) {
  assert.ok(target, "what the case presses stands");
  return inAct(() => fire(target, "click"));
}

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
async function viewOf(state, client, { hash = PROGRAMS, allowed } = {}) {
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

/** A program of versions 3 to 5: one rule group under „Zawsze” with a trip plan. */
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
const previous = (programs, version = 5) => ({
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
/** Ala's map run of the forest under program 1, going on. */
const going = () =>
  send(
    createCharacter(twoPrograms(), "Ala").state,
    { mapId: "forest", characterId: 1, programId: 1 },
    0,
  ).state;

// --- no control for an account without the privilege ----------------------------------------------

// Catches the page asking the server, or drawing the button, for an account the privilege flag is
// false or missing for (D-394): the client given has no `loadPreviousSavedGame`, so a question throws.
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
// of the screen, and an answer of a document that does not show the button (D-395).
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
// failure left silent: null leaves the button away with no line; a failure one sentence (D-395).
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
    assert.deepEqual(linesOf(view), [
      ["form-warning", "Nie udało się sprawdzić poprzedniego zapisu."],
    ]);
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
// anything but the list and its next number, and does not save at once (D-395, D-169, D-165, D-207).
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
    assert.deepEqual(linesOf(view), [["form-note", "Wciągnięto 3 programy."]]);
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

// Catches a button that goes away after a pull: a second press appends copies again (D-395).
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
    assert.deepEqual(linesOf(view), [
      [
        "form-note",
        "Wciągnięto 2 programy. Pominięto programy, których ta wersja gry nie przyjmuje: „Stary”, „Obcy”, bez nazwy (pozycja 4).",
      ],
    ]);
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
    assert.deepEqual(linesOf(view), [
      [
        "form-note",
        "Pominięto program, którego ta wersja gry nie przyjmuje: „Stary”.",
      ],
    ]);
    assert.deepEqual(held.saves, []);
    await inAct(() => view.dispose());
  });
});

// Catches an unreadable document (a version above the game's, a game with no list) or a list with no
// program giving anything but the sentence that the save holds no program the game can read, and the
// button going away for it.
test("an unreadable document, and one with no program, give the sentence of no readable program; nothing is appended or saved", async () => {
  const sentence =
    "Poprzedni zapis nie zawiera programów, które ta wersja gry potrafi wczytać.";
  for (const document of [
    previous([item(1, "Las", LAS)], 6),
    { ok: true, value: { version: 5, game: {} } },
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
// is gone, so one sentence and no control (D-395).
test("a pull that finds no previous save says so and the button goes away", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(NO_PREVIOUS);
    assert.deepEqual(linesOf(view), [
      ["form-note", "Nie ma już poprzedniego zapisu."],
    ]);
    assert.equal(pullButton(view), undefined);
    assert.equal(waitingButton(view), undefined);
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    await inAct(() => view.dispose());
  });
});

// Catches a failed fetch that drops the button, appends something or is drawn as a result, and a
// retry that does not work: the control stays for a retry (D-395).
test("a failed fetch is one warning, the button stays, and a retry appends", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view } = await viewOf(newGame(), held.client, { allowed: true });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(failure(500));
    assert.deepEqual(linesOf(view), [
      [
        "form-warning",
        "Nie udało się pobrać poprzedniego zapisu. Spróbuj ponownie.",
      ],
    ]);
    assert.equal(pullButton(view).disabled, false);
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    await press(pullButton(view));
    await held.answer(previous([item(1, "Las", LAS)]));
    assert.deepEqual(await listed(view), [
      [1, "Program"],
      [2, "Las"],
    ]);
    assert.deepEqual(linesOf(view), [["form-note", "Wciągnięto 1 program."]]);
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
// has no privilege, or an append (D-394).
test("a 403 previous-save-forbidden says the account has no such privilege now, and the button goes away", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { view, signedOut } = await viewOf(newGame(), held.client, {
      allowed: true,
    });
    await held.answer(previous([item(1, "Las", LAS)]));
    await press(pullButton(view));
    await held.answer(failure(403, "previous-save-forbidden"));
    assert.deepEqual(linesOf(view), [
      [
        "form-warning",
        "To konto nie ma już uprawnienia do poprzedniego zapisu.",
      ],
    ]);
    assert.equal(pullButton(view), undefined);
    assert.equal(waitingButton(view), undefined);
    assert.deepEqual(signedOut, []);
    assert.deepEqual(await listed(view), [[1, "Program"]]);
    await inAct(() => view.dispose());
  });
});

// Catches a name of the document written into the page as markup (D-395: shown only as text).
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
    assert.deepEqual(linesOf(view), [
      [
        "form-note",
        "Wciągnięto 1 program. Pominięto program, którego ta wersja gry nie przyjmuje: „<b>Obcy</b>”.",
      ],
    ]);
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
// goes on and while one has ended and waits, and the map run itself is left as it was (D-395).
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
