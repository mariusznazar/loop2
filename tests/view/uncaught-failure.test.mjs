// What the page does with an error that no code of the game handled (D-323, D-253, D-262, D-208,
// D-207, D-97). These tests run the page's logic on jsdom through
// tests/view/page-document.mjs (D-264): they prove which elements the page builds, which lines it
// writes and what the game state does, never what a real browser prints, which the browser check
// covers (D-88). A browser reports an error to the window's `error` event and a
// rejection to `unhandledrejection`; jsdom reports neither of a timer or a promise of Node, so a
// case reports to the window what the browser would.
import {
  assert,
  fire,
  inAct,
  press,
  typeInto,
  withPage,
} from "./page-document.mjs";
import { mock, test } from "node:test";
import {
  createCharacter,
  mapRunEnded,
  newGame,
  send,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { advanceLoopRun, startLoop } from "../../dist/browser/sim/loop.js";
import { savedGame } from "../../dist/browser/sim/saved-game.js";
import { createAccountCard } from "../../dist/browser/view/account-card.js";

const SENTENCE = "Coś w grze się zepsuło — odśwież stronę.";
const SAVE_FAILED = "Nie udało się zapisać postępu. Gra spróbuje ponownie.";
/** The line a window listener of the page writes for an error of the kind `TypeError`. */
const LINE =
  "uncaught kind=TypeError code=none place=view/last-resort.installLastResort";
/** A value the text of an error quotes; it must reach neither the console nor the screen. */
const QUOTED = "a-value-the-error-quotes";

/** The real date the page's clock reads. */
const CLOCK_MS = 1_760_000_000_000;
const GAME_INTERVALS = 2;

// --- the page on jsdom -------------------------------------------------------------------------

/**
 * Runs `body` on a window of its own, with Node's mocked timers and the real date at `CLOCK_MS`,
 * the console's lines kept: the page writes one, and it must not reach the runner.
 */
async function onPage(body) {
  await withPage(async ({ root }) => {
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    const date = mock.method(Date, "now", () => CLOCK_MS);
    // The page's own line stays here; any other report goes on to the harness, which fails the case.
    const harness = console.error;
    const linesWith = (start) =>
      consoleError.mock.calls
        .map((call) => call.arguments.join(" "))
        .filter((line) => line.startsWith(start));
    const consoleError = mock.method(console, "error", (...values) => {
      if (!/^(uncaught|saved-game-load) /.test(String(values[0])))
        harness(...values);
    });
    const mockedSet = globalThis.setInterval;
    const mockedClear = globalThis.clearInterval;
    const live = new Set();
    globalThis.setInterval = (...args) => {
      const id = mockedSet(...args);
      live.add(id);
      return id;
    };
    globalThis.clearInterval = (id) => {
      live.delete(id);
      mockedClear(id);
    };
    try {
      await body({
        root,
        intervals: live,
        lines: () => linesWith("uncaught "),
        loadLines: () => linesWith("saved-game-load "),
      });
    } finally {
      globalThis.setInterval = mockedSet;
      globalThis.clearInterval = mockedClear;
      mock.timers.reset();
      date.mock.restore();
      consoleError.mock.restore();
    }
  });
}

/** A stand-in for `performance` that a case moves by hand; React measures its renders through it. */
const handClock = (now) => ({
  now,
  measure: () => undefined,
  clearMeasures: () => undefined,
});

/** Runs `body` with the `performance` the case gives, back as it was after. */
async function withPerformance(performance, body) {
  const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
  Object.defineProperty(globalThis, "performance", {
    configurable: true,
    value: performance,
  });
  try {
    await body();
  } finally {
    Object.defineProperty(globalThis, "performance", saved);
  }
}

/**
 * Runs `body` outside React's `act`, as a browser runs the page. Inside `act` React keeps an error
 * that nothing handled until the `act` ends and then throws it, instead of giving it to the root.
 */
async function outsideAct(body) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = false;
  try {
    await body();
  } finally {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  }
}

const pageDocument = () => globalThis.document;
const all = (root) => [root, ...root.querySelectorAll("*")];
const childrenOf = (element) => [...element.children];
const byClass = (root, name) =>
  all(root).filter((element) => element.classList.contains(name));
const tagged = (root, tag) =>
  all(root).filter((element) => element.localName === tag);

function shown(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    if (node === pageDocument().body) return true;
  }
  return false;
}

const buttonNamed = (root, text) =>
  all(root).find(
    (element) => element.localName === "button" && element.textContent === text,
  );

/** Gives the page's continuations their turns, outside `act`. */
async function turns() {
  for (let round = 0; round < 8; round += 1) await Promise.resolve();
}

/** Lets the page act on an answer that has just come, inside `act`. */
async function settle() {
  await inAct(turns);
}

/** The shown elements that carry the sentence of a failure. */
const sentencesShown = (root) =>
  all(root).filter(
    (element) =>
      element.localName === "p" &&
      element.textContent === SENTENCE &&
      shown(element),
  );

/** The shown alerts of the page, as texts. */
const alertTexts = (root) =>
  all(root)
    .filter(
      (element) => element.getAttribute("role") === "alert" && shown(element),
    )
    .map((element) => element.textContent);

const headerOf = (root) =>
  childrenOf(root).find((child) => child.localName === "header");

/** The card in the page; the page holds one at most. */
const cardOf = (root) => byClass(root, "account-card")[0];

function assertInOrder(root, elements) {
  const order = all(root);
  const places = elements.map((element) => order.indexOf(element));
  assert.ok(
    places.every(
      (place, index) =>
        place !== -1 && (index === 0 || place > places[index - 1]),
    ),
    `in the order asked for: ${places.join(", ")}`,
  );
}

/** The sentence stands in the form of the card, under its button, where a refusal's sentence stands. */
function assertUnderTheButton(card, sentence) {
  const [form] = tagged(card, "form");
  assert.ok(form.contains(sentence), "in the form");
  assertInOrder(card, [tagged(form, "button").at(-1), sentence]);
}

/** A client of the account API whose every answer the test gives when it chooses. */
function heldClient() {
  const calls = [];
  const call =
    (name) =>
    (...args) =>
      new Promise((resolve) => calls.push({ name, args, answer: resolve }));
  return {
    calls,
    client: {
      register: call("register"),
      login: call("login"),
      requestPasswordReset: call("requestPasswordReset"),
      currentAccount: call("currentAccount"),
      logout: call("logout"),
      confirmEmail: call("confirmEmail"),
      sendConfirmationMessage: call("sendConfirmationMessage"),
      setPassword: call("setPassword"),
      loadSavedGame: call("loadSavedGame"),
      saveGame: call("saveGame"),
    },
    /** Gives the answer to the oldest call still waiting of the given name. */
    async answer(name, result, { inside = true } = {}) {
      const index = calls.findIndex((entry) => entry.name === name);
      assert.notEqual(index, -1, `no ${name} call is waiting`);
      const [entry] = calls.splice(index, 1);
      entry.answer(result);
      await (inside ? settle() : turns());
    },
  };
}

/** The page address with a fragment the test sets, and no history. */
function fakeAddress(hash = "") {
  const address = {
    current: hash,
    hash: () => address.current,
    clearFragment() {
      address.current = "";
    },
    go(next) {
      address.current = next;
    },
    replace(next) {
      address.current = next;
    },
    onChange: () => () => undefined,
  };
  return address;
}

async function startPage(
  held,
  address = fakeAddress(),
  { inside = true } = {},
) {
  const { startApp } = await import("../../dist/browser/view/app.js");
  const start = () => startApp(pageDocument().body, held.client, address);
  if (inside) await inAct(start);
  else start();
  await (inside ? settle() : turns());
}

const ACCOUNT = {
  ok: true,
  value: { id: "a1", email: "ala@example.com", emailConfirmed: true },
};
const NO_SESSION = {
  ok: false,
  failure: {
    kind: "refused",
    status: 401,
    code: "unauthenticated",
    message: "Sesja wygasła.",
  },
};

/** The server's answer holding a save of `state` at `revision`, saved a minute before the clock. */
const saveOf = (state, revision) => ({
  ok: true,
  value: {
    ...JSON.parse(
      JSON.stringify(savedGame(withSaveTime(state, CLOCK_MS - 60_000))),
    ),
    revision,
  },
});

/** A game whose map run passes: Ala sent to the forest at the real date 0. */
const passing = () =>
  send(
    createCharacter(newGame(), "Ala").state,
    { mapId: "forest", characterId: 1 },
    0,
  ).state;

/**
 * Ala in an earning loop in Las, one game minute from the end of her first map run: a game built
 * from a save of her catches up a minute, which ends the run and, taken, is a change to save.
 */
function loopingAla() {
  const made = {
    ...createCharacter(newGame(), "Ala").state,
    solvedMaps: ["forest"],
  };
  const started = startLoop(made, { mapId: "forest", characterId: 1 }, 5).state;
  const whole = advanceLoopRun(started, 1, 100_000);
  assert.ok(
    mapRunEnded(whole.state.loops[1].run),
    "precondition: the run of the loop ends",
  );
  return advanceLoopRun(started, 1, whole.passed - 1).state;
}

/** The arguments of the oldest call of `name` still waiting. */
function argsOf(held, name) {
  const entry = held.calls.find((call) => call.name === name);
  assert.ok(entry, `no ${name} call is waiting`);
  return entry.args;
}

const waitingCalls = (held) => held.calls.map((entry) => entry.name);

/** Reports `error` to the window as a browser reports an error nothing caught; true if not cancelled. */
function reportError(error) {
  const { window } = globalThis;
  return window.dispatchEvent(
    new window.ErrorEvent("error", {
      error,
      message: "message of the error event",
      cancelable: true,
    }),
  );
}

/** Reports `reason` to the window as a browser reports a promise rejected with no handler. */
function reportRejection(reason) {
  const { window } = globalThis;
  const event = new window.Event("unhandledrejection", { cancelable: true });
  Object.defineProperty(event, "reason", { value: reason });
  return window.dispatchEvent(event);
}

/** The page signed in as ALA with the save of a passing map run, which the player resumes and saves. */
async function playing(held) {
  await startPage(held);
  await held.answer("currentAccount", ACCOUNT);
  await held.answer("loadSavedGame", saveOf(passing(), 4));
  await press(buttonNamed(pageDocument().body, "Wznów"));
  await settle();
  await held.answer("saveGame", { kind: "saved", revision: 5 });
}

// --- the game state after an error --------------------------------------------------------------

// invariant: uncaught-failure-game-state
// D-323, D-207, D-208, D-97. Catches a game that goes on changing
// after the error — the clock still reading, a button still acting — a save that reads the clock
// again, whose error would come back with every save, and a save that sends anything but the last
// whole state the page held before the error.
test("after an error nothing handled, in the clock's own reading, the game state stays as it was and every save sends the state from before the error", async () => {
  await onPage(async ({ root, intervals }) => {
    let now = 0;
    let faulty = false;
    const clockReading = () => {
      // Only the reading of the game's clock fails: React and the harness read the same `now`.
      if (faulty && new Error().stack.includes("view/clock.js"))
        throw new TypeError(`the reading failed at ${QUOTED}`);
      return now;
    };
    await withPerformance(handClock(clockReading), async () => {
      const held = heldClient();
      await playing(held);

      // Three real seconds at 1× are three game minutes; the 30-second check then sends them.
      now += 3_000;
      await inAct(() => mock.timers.tick(200));
      await inAct(() => mock.timers.tick(30_000));
      const [before] = held.calls.filter((call) => call.name === "saveGame");
      assert.ok(before, "precondition: the state of the game minutes is saved");
      const sentBefore = before.args[0];
      assert.equal(sentBefore.basedOn, 5, "precondition: on the last revision");
      await held.answer("saveGame", { kind: "saved", revision: 6 });
      assert.equal(
        intervals.size,
        GAME_INTERVALS,
        "precondition: the game runs",
      );

      // The clock's reading fails at its next tick; the browser reports the error to the window.
      faulty = true;
      now += 1_000;
      let thrown = null;
      try {
        mock.timers.tick(200);
      } catch (error) {
        thrown = error;
      }
      assert.ok(thrown instanceof TypeError, "precondition: the reading fails");
      await inAct(() => reportError(thrown));

      assert.equal(
        intervals.size,
        GAME_INTERVALS - 1,
        "the clock no longer ticks",
      );
      // Time goes on and the player acts: nothing changes, so nothing is saved.
      now += 5_000;
      mock.timers.tick(200);
      await press(buttonNamed(root, "Pauza"));
      await press(buttonNamed(root, "4×"));
      await settle();
      assert.deepEqual(
        waitingCalls(held),
        [],
        "no act and no tick changed the state",
      );

      // A save the player asks for still goes, with the state from before the error and without a
      // new reading of the clock, whose error would come back.
      await press(buttonNamed(root, "Konto"));
      await press(buttonNamed(root, "Wyloguj"));
      await settle();
      assert.deepEqual(waitingCalls(held), ["saveGame"]);
      assert.deepEqual(argsOf(held, "saveGame"), [
        { version: sentBefore.version, basedOn: 6, game: sentBefore.game },
      ]);
    });
  });
});

test("after an error nothing handled, an act of the player changes no state and starts no save", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await playing(held);
    await inAct(() => reportError(new TypeError(QUOTED)));

    await press(buttonNamed(root, "Pauza"));
    await press(buttonNamed(root, "2×"));
    await settle();

    assert.deepEqual(waitingCalls(held), []);
    assert.ok(buttonNamed(root, "Pauza"), "the run still passes on the screen");
  });
});

// invariant: uncaught-failure-game-state
// D-323. The screen Mapy sends characters, so its buttons are
// acts of the player like „Pauza”. Catches a button of the screen Mapy that, after an error nothing
// handled, still starts an earning loop, enters a map or moves the page, and so changes a state that
// the page must hold as it was.
test("after an error nothing handled, the buttons of the screen Mapy change no state, start no save and open no map run", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress("#/mapy/forest");
    const state = {
      ...createCharacter(newGame(), "Ala").state,
      solvedMaps: ["forest"],
    };
    await startPage(held, address);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(state, 4));
    await settle();
    assert.ok(
      buttonNamed(root, "Wejdź"),
      "precondition: the screen Mapy stands",
    );
    assert.deepEqual(waitingCalls(held), [], "precondition: no save waits");

    await inAct(() => reportError(new TypeError(QUOTED)));
    await press(buttonNamed(root, "Puść w pętlę"));
    await press(buttonNamed(root, "Wejdź"));
    await settle();

    assert.deepEqual(waitingCalls(held), [], "no act started a save");
    assert.ok(
      buttonNamed(root, "Puść w pętlę"),
      "no earning loop took the button",
    );
    assert.equal(address.current, "#/mapy/forest", "no map run was opened");
  });
});

// --- the line in the console ------------------------------------------------------------------

// D-323, D-253, D-252. Catches an event left uncancelled, which the
// browser then prints itself with the error's text, and a line that carries that text or the stack.
test("an error and a rejection nothing handled are cancelled, and each leaves one line of its kind, code and place and no word of its text", async () => {
  const cases = [
    {
      name: "an error event",
      report: () =>
        reportError(Object.assign(new TypeError(QUOTED), { code: "E_QUOTED" })),
      line: "uncaught kind=TypeError code=E_QUOTED place=view/last-resort.installLastResort",
    },
    {
      name: "a rejection with an error",
      report: () => reportRejection(new RangeError(QUOTED)),
      line: "uncaught kind=RangeError code=none place=view/last-resort.installLastResort",
    },
    {
      name: "a rejection with a text",
      report: () => reportRejection(QUOTED),
      line: "uncaught kind=none code=none place=view/last-resort.installLastResort",
    },
    {
      name: "an error event with no error",
      report: () => reportError(undefined),
      line: "uncaught kind=none code=none place=view/last-resort.installLastResort",
    },
    {
      name: "an error whose name and code hold a sentence",
      report: () =>
        reportError(
          Object.assign(new Error(QUOTED), {
            name: `Failed ${QUOTED}`,
            code: `code ${QUOTED}`,
          }),
        ),
      line: "uncaught kind=none code=none place=view/last-resort.installLastResort",
    },
  ];
  for (const { name, report, line } of cases) {
    await onPage(async ({ lines }) => {
      const held = heldClient();
      await startPage(held);
      const proceeded = await inAct(report);
      assert.equal(proceeded, false, `${name}: the event is cancelled`);
      assert.deepEqual(lines(), [line], name);
    });
  }
});

test("the same line is written once until the page is reloaded, and a line of another error is written too", async () => {
  await onPage(async ({ lines }) => {
    const held = heldClient();
    await startPage(held);
    for (let round = 0; round < 3; round += 1)
      await inAct(() => reportError(new TypeError(`${QUOTED} ${round}`)));
    assert.deepEqual(lines(), [LINE], "three errors alike, one line");

    await inAct(() => reportRejection(new RangeError(QUOTED)));
    await inAct(() => reportError(new TypeError(QUOTED)));
    assert.deepEqual(lines(), [
      LINE,
      "uncaught kind=RangeError code=none place=view/last-resort.installLastResort",
    ]);
  });
});

/**
 * Gives the account client of `held` a report that records each call, with the number of console
 * lines written before it; the report answers as the server does, a 204.
 */
function recordReports(held, lines) {
  const sent = [];
  held.client.reportBrowserFailure = (kind, code, place) => {
    sent.push({ kind, code, place, written: lines().length });
    return Promise.resolve({ ok: true, value: null });
  };
  return sent;
}

// D-356, D-253. Catches a report sent before its line is written,
// a report sent again for a line already written, and a line the account client never hears of.
test("each distinct line goes to the account client once per page load, after its console line, for errors and rejections alike", async () => {
  await onPage(async ({ lines }) => {
    const held = heldClient();
    const sent = recordReports(held, lines);
    await startPage(held);
    for (let round = 0; round < 3; round += 1)
      await inAct(() => reportError(new TypeError(`${QUOTED} ${round}`)));
    await inAct(() => reportRejection(new RangeError(QUOTED)));
    await settle();
    assert.deepEqual(sent, [
      {
        kind: "TypeError",
        code: "none",
        place: "view/last-resort.installLastResort",
        written: 1,
      },
      {
        kind: "RangeError",
        code: "none",
        place: "view/last-resort.installLastResort",
        written: 2,
      },
    ]);
  });
});

// D-323, D-253. Catches a card taken down that reports under the
// place of the page's handling instead of its own, and a report left out for it.
test("a card taken down on the page is reported once, with the place of its own line", async () => {
  await onPage(async ({ root, lines }) => {
    await outsideAct(async () => {
      const held = heldClient();
      const sent = recordReports(held, lines);
      const address = fakeAddress(
        "#confirm-email=Zm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmE",
      );
      await startPage(held, address, { inside: false });
      await held.answer(
        "confirmEmail",
        {
          ok: false,
          failure: { kind: "unexpected", status: 200, message: {} },
        },
        { inside: false },
      );
      await held.answer("currentAccount", NO_SESSION, { inside: false });
      assert.equal(byClass(root, "account-card-screen").length, 1);
      assert.deepEqual(sent, [
        {
          kind: "Error",
          code: "none",
          place: "view/account-card.createAccountCard",
          written: 1,
        },
      ]);
    });
  });
});

// D-323, D-253. Catches a report whose failure leaves the error
// uncancelled, or writes a second line of its own, or reaches the window as an error of the page.
test("a report the account client throws or refuses leaves the error cancelled, its one line written and no error of its own", async () => {
  const doubles = {
    "a double that throws": () => {
      throw new Error("a double that throws");
    },
    "a double that refuses": () =>
      Promise.reject(new Error("a double that refuses")),
  };
  for (const [name, report] of Object.entries(doubles)) {
    await onPage(async ({ lines }) => {
      const held = heldClient();
      held.client.reportBrowserFailure = report;
      await startPage(held);
      const proceeded = await inAct(() => reportError(new TypeError(QUOTED)));
      await settle();
      assert.equal(proceeded, false, `${name}: the error is cancelled`);
      assert.deepEqual(lines(), [LINE], name);
    });
  }
});

// --- the sentence ----------------------------------------------------------------------------

// D-323, D-208. Catches a sentence that replaces the sentence of a
// failed save, one standing more than once, and one in a role but `warning`.
test("on a game screen the sentence stands once in the row under the menu bar, in warning, beside the sentence of a failed save and not instead of it", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await playing(held);
    await press(buttonNamed(root, "4×"));
    await settle();
    await held.answer("saveGame", { kind: "failed" });
    assert.deepEqual(alertTexts(root), [SAVE_FAILED], "precondition");

    await inAct(() => reportError(new TypeError(QUOTED)));
    await inAct(() => reportError(new TypeError(QUOTED)));
    await inAct(() => reportRejection(new RangeError(QUOTED)));

    const header = headerOf(root);
    const [sentence, ...others] = sentencesShown(root);
    assert.deepEqual(others, [], "one sentence, whatever the number of errors");
    assert.ok(header.contains(sentence), "in the header");
    assert.equal(sentence.getAttribute("role"), "alert");
    assert.ok(sentence.classList.contains("form-warning"), "the role warning");
    assert.ok(
      byClass(header, "menu-bar-host").every(
        (bar) => header.firstElementChild === bar,
      ),
      "the bar first",
    );
    assertInOrder(header, [header.firstElementChild, sentence]);
    assert.deepEqual(alertTexts(root).sort(), [SAVE_FAILED, SENTENCE].sort());
    assert.ok(
      shown(
        byClass(header, "save-line").find(
          (line) => line.textContent === SAVE_FAILED,
        ),
      ),
      "the sentence of the save stays",
    );
  });
});

test("while the page asks for the session the sentence stands under the bar of the waiting screen, and the card then shows it in the card", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    assert.ok(
      shown(headerOf(root)),
      "precondition: the waiting screen has its header",
    );

    await inAct(() => reportError(new TypeError(QUOTED)));
    assert.equal(sentencesShown(root).length, 1);
    assert.ok(headerOf(root).contains(sentencesShown(root)[0]));
    assert.ok(shown(byClass(root, "session-check")[0]));

    await held.answer("currentAccount", NO_SESSION);
    const card = cardOf(root);
    assert.ok(card, "the card stands");
    const [sentence, ...others] = sentencesShown(root);
    assert.deepEqual(others, [], "the header is hidden, so one sentence shows");
    assert.ok(card.contains(sentence), "in the card");
    assert.equal(sentence.getAttribute("role"), "alert");
    assert.ok(sentence.classList.contains("form-warning"));
    assertUnderTheButton(card, sentence);
  });
});

test("an error while the card stands puts the sentence in the card under the button of its form, once, and the card still works", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", NO_SESSION);
    assert.deepEqual(sentencesShown(root), [], "precondition");

    await inAct(() => reportError(new TypeError(QUOTED)));
    await inAct(() => reportError(new TypeError(QUOTED)));

    const card = cardOf(root);
    const [sentence, ...others] = sentencesShown(root);
    assert.deepEqual(others, []);
    assertUnderTheButton(card, sentence);
    await press(buttonNamed(root, "Załóż konto"));
    assert.equal(sentencesShown(root).length, 1, "the next form keeps it");
    assert.ok(cardOf(root).contains(sentencesShown(root)[0]));
  });
});

/** Signs in on the card that stands, and gives the load the save `loaded`. */
async function signInOn(held, root, loaded) {
  const card = cardOf(root);
  const [address, password] = tagged(card, "input");
  await typeInto(address, "ala@example.com");
  await typeInto(password, "dwanaście znaków");
  await inAct(() => {
    const { Event } = globalThis.window;
    tagged(card, "form")[0].dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
  });
  await held.answer("login", ACCOUNT);
  await held.answer("loadSavedGame", loaded);
}

/** The page waits as it does while it asks the server, with the sentence under the bar, and no game. */
function assertWaitingWithSentence(root, intervals, reason) {
  assert.equal(sentencesShown(root).length, 1, `${reason}: one sentence`);
  assert.ok(headerOf(root).contains(sentencesShown(root)[0]), reason);
  assert.ok(shown(byClass(root, "session-check")[0]), `${reason}: waiting`);
  assert.equal(cardOf(root), undefined, `${reason}: no card`);
  assert.equal(
    byClass(root, "program-panel").length +
      byClass(root, "headquarters").length,
    0,
    `${reason}: no game`,
  );
  assert.equal(intervals.size, 0, `${reason}: no clock and no saver`);
}

// invariant: uncaught-failure-game-state
// D-323, D-247, D-211, D-207. Catches a game built after the error
// that catches up the earning loops of a loaded save, takes the result and saves a state the
// error came before.
test("after an error nothing handled no game is built: a card built after it shows the sentence, and a sign-in on it stays at the waiting screen and saves nothing", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    await playing(held);
    await inAct(() => reportError(new TypeError(QUOTED)));

    await press(buttonNamed(root, "Konto"));
    await press(buttonNamed(root, "Wyloguj"));
    await settle();
    await held.answer("saveGame", { kind: "saved", revision: 6 });
    await held.answer("logout", { ok: true, value: null });
    assert.ok(cardOf(root), "the card stands");
    assert.equal(sentencesShown(root).length, 1);
    assert.ok(
      cardOf(root).contains(sentencesShown(root)[0]),
      "in the new card",
    );

    // The save of the account holds an earning loop whose map run ends in the catch-up.
    await signInOn(held, root, saveOf(loopingAla(), 6));
    assertWaitingWithSentence(root, intervals, "after the sign-in");
    mock.timers.tick(60_000);
    await settle();
    assert.deepEqual(waitingCalls(held), [], "nothing is saved");
  });
});

test("an error on the waiting screen before the first game leaves a sign-in that loads a save at the waiting screen, with no game built and no save sent", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    await startPage(held);
    await inAct(() => reportError(new TypeError(QUOTED)));

    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(loopingAla(), 3));

    assertWaitingWithSentence(root, intervals, "after the load");
    mock.timers.tick(60_000);
    await settle();
    assert.deepEqual(waitingCalls(held), [], "nothing is saved");
  });
});

// --- failures the game foresees ----------------------------------------------------------------

const NO_CONNECTION = {
  ok: false,
  failure: {
    kind: "unreachable",
    reason: "network",
    message: "Brak połączenia.",
  },
};

// D-323, D-208, D-96, D-213. Catches the sentence of the failure
// standing beside the sentence a failure the game foresees already has, or its line written for it.
test("a failure the game foresees keeps its own sentence alone: a lost connection, a refused sign-in and a load that meets an error of the code", async () => {
  await onPage(async ({ root, lines }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", NO_CONNECTION);
    assert.deepEqual(alertTexts(root), ["Brak połączenia."]);
    assert.deepEqual(lines(), []);
  });

  await onPage(async ({ root, lines }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", NO_SESSION);
    const [address, password] = tagged(root, "input");
    await typeInto(address, "ala@example.com");
    await typeInto(password, "dwanaście znaków");
    await inAct(() => {
      const { Event } = globalThis.window;
      tagged(root, "form")[0].dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    });
    const refusal = {
      ok: false,
      failure: {
        kind: "refused",
        status: 401,
        code: "invalid-credentials",
        message: "Nieprawidłowy adres e-mail lub hasło.",
      },
    };
    await held.answer("login", refusal);
    assert.deepEqual(alertTexts(root), [refusal.failure.message]);
    assert.deepEqual(lines(), []);
  });

  await onPage(async ({ root, lines, loadLines }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    // A fault of the code inside the real load: a language function fails on the saved document.
    const ownKeys = Reflect.ownKeys;
    Reflect.ownKeys = (value) => {
      if (Object.hasOwn(value, "version") && Object.hasOwn(value, "game"))
        throw new TypeError(`a fault of the code at ${QUOTED}`);
      return ownKeys(value);
    };
    try {
      await held.answer("loadSavedGame", saveOf(passing(), 4));
    } finally {
      Reflect.ownKeys = ownKeys;
    }
    assert.deepEqual(alertTexts(root), [
      "Nie udało się wczytać gry. Spróbuj ponownie.",
    ]);
    assert.deepEqual(lines(), []);
    assert.equal(loadLines().length, 1, "the line of the load alone");
  });
});

// --- a root of React ---------------------------------------------------------------------------

// D-323, D-262. Catches a root the page never hears of, and a
// card taken down that leaves an empty screen with the error only in the console.
test("an error in the drawing of a root of the game reaches the page through the window", async () => {
  await onPage(async ({ root, lines }) => {
    // React's development build adds a warning of its own about the root it takes down.
    const warning = mock.method(console, "warn", () => {});
    await outsideAct(async () => {
      const held = heldClient();
      // The address of the account is no text: the menu cannot draw it once it opens.
      const broken = { ok: true, value: { ...ACCOUNT.value, email: {} } };
      await startPage(held, fakeAddress(), { inside: false });
      await held.answer("currentAccount", broken, { inside: false });
      await held.answer(
        "loadSavedGame",
        { ok: true, value: null },
        { inside: false },
      );
      assert.deepEqual(sentencesShown(root), [], "precondition");

      fire(buttonNamed(root, "Konto"), "click");
      await turns();

      assert.equal(sentencesShown(root).length, 1);
      assert.ok(headerOf(root).contains(sentencesShown(root)[0]));
      assert.deepEqual(lines(), [
        "uncaught kind=Error code=none place=view/last-resort.installLastResort",
      ]);
      assert.equal(warning.mock.callCount(), 1);
    }).finally(() => warning.mock.restore());
  });
});

test("a card that React takes down after an error is replaced by the sentence alone in its place, and the page hears of the error", async () => {
  await onPage(async ({ lines }) => {
    await outsideAct(async () => {
      const heard = [];
      // The sentence of the page is no text: the card cannot be drawn.
      const card = createAccountCard({
        client: heldClient().client,
        sentence: { text: {}, role: "warning" },
        reset: null,
        failed: false,
        signedIn: () => undefined,
        onUncaught: (error) => heard.push(error),
      });

      assert.equal(heard.length, 1, "the page is told once");
      assert.equal(card.element.textContent, SENTENCE);
      assert.equal(card.element.querySelectorAll("form").length, 0);
      assert.deepEqual(
        [...card.element.querySelectorAll("p")].map((p) => p.textContent),
        [SENTENCE],
        "nothing but the sentence",
      );
      assert.deepEqual(lines(), [], "the card writes no line itself");
      // The page may go on with the card as with any other.
      card.fail();
      card.focus();
      card.dispose();
      assert.equal(card.element.isConnected, false);
    });
  });
});

test("a card taken down on the page leaves the sentence alone in the card's place, with one line of the error", async () => {
  await onPage(async ({ root, lines }) => {
    await outsideAct(async () => {
      const held = heldClient();
      // A refusal with a message that is no text reaches the card as the sentence of the page.
      const address = fakeAddress(
        "#confirm-email=Zm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmE",
      );
      await startPage(held, address, { inside: false });
      await held.answer(
        "confirmEmail",
        {
          ok: false,
          failure: { kind: "unexpected", status: 200, message: {} },
        },
        { inside: false },
      );
      await held.answer("currentAccount", NO_SESSION, { inside: false });

      const screen = byClass(root, "account-card-screen")[0];
      assert.ok(screen, "the place of the card stands");
      assert.equal(screen.textContent, SENTENCE);
      assert.deepEqual(sentencesShown(root).length, 1);
      assert.deepEqual(lines(), [
        "uncaught kind=Error code=none place=view/account-card.createAccountCard",
      ]);
      assert.equal(
        tagged(root, "form").length,
        0,
        "no form of the card stands",
      );
    });
  });
});
