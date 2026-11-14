// The page before and after signing in (D-96, D-97) and with its saved game state (D-96, D-97,
// D-208, D-209, D-210, D-211, D-212), holding the login card (D-259, D-260, D-261, D-262) and its
// screens by address (D-280, D-281, D-283, D-284, D-286). These tests run the page's logic on jsdom through tests/view/page-document.mjs (D-264):
// they prove which elements it builds and what it does with the client's answers, never real
// events, focus or rendering, which the browser check covers (D-88).
import {
  assert,
  fire,
  inAct,
  press,
  settle,
  typeInto,
  withPage,
} from "./page-document.mjs";
import { mock, test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  mapRunEnded,
  newGame,
  restart,
  send,
  setPace,
  setPaused,
  setProgram,
  settleDeath,
} from "../../dist/browser/sim/game.js";
import { ABOUT } from "../../dist/browser/sim/data/about.js";
import { advanceLoopRun, startLoop } from "../../dist/browser/sim/loop.js";
import {
  createProgram,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  pickProgram,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../../dist/browser/sim/programs.js";
import { loadSavedGame } from "../../dist/browser/sim/saved-game.js";
import { buyBranch } from "../../dist/browser/sim/skills.js";
import { createAccountCard } from "../../dist/browser/view/account-card.js";
import {
  addressProblem,
  passwordProblems,
  registrationProblems,
} from "../../dist/browser/view/account-rules.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

// --- the page on jsdom --------------------------------------------------------------------------

/**
 * The intervals a game in the page keeps running: its clock and its saver's check every 30 real
 * seconds (D-207).
 */
const GAME_INTERVALS = 2;

/** The real date the page's clock reads, unless a case moves it on; every document it saves holds it. */
const CLOCK_MS = 1_760_000_000_000;

/**
 * Runs `body` on a window of its own, with Node's mocked intervals and the real date at
 * `CLOCK_MS`.
 */
async function onPage(body) {
  await withPage(async ({ root }) => {
    // The saver's retries wait on setTimeout; mocked, they run only when a case moves time on.
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    const date = mock.method(Date, "now", () => CLOCK_MS);
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
      await body({ root, intervals: live });
    } finally {
      globalThis.setInterval = mockedSet;
      globalThis.clearInterval = mockedClear;
      mock.timers.reset();
      date.mock.restore();
    }
  });
}

/**
 * A stand-in for `performance` that a case moves by hand. The page's menu bar draws with React,
 * whose development build measures its renders through `measure` and `clearMeasures` of the
 * `performance` it finds, so the stand-in has both, and they do nothing.
 */
const handClock = (now) => ({
  now,
  measure: () => undefined,
  clearMeasures: () => undefined,
});

/** The document of the window the running case has. */
const pageDocument = () => globalThis.document;

function all(root) {
  return [root, ...root.querySelectorAll("*")];
}

const childrenOf = (element) => [...element.children];

/** Sends `form` inside act, as a browser does; true when the card stopped the page's navigation. */
function sendForm(form) {
  assert.ok(form, "the form the case sends stands");
  return inAct(() => {
    const { Event } = globalThis.window;
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    return !form.dispatchEvent(submit);
  });
}

function byClass(root, name) {
  return all(root).filter((element) => element.classList.contains(name));
}

/** The elements of `tag` under `root`, in the order they stand. */
const tagged = (root, tag) =>
  all(root).filter((element) => element.localName === tag);

const inputsIn = (root) => tagged(root, "input");

const formIn = (root) => tagged(root, "form")[0];

/** The card in the page; the page holds one at most. */
const cardOf = (root) => byClass(root, "account-card")[0];

/** Types into the fields of the form that stands, in their order. */
async function fillIn(root, ...texts) {
  const inputs = inputsIn(root);
  assert.equal(inputs.length, texts.length, "as many fields as texts");
  for (const [index, text] of texts.entries())
    await typeInto(inputs[index], text);
}

/** Whether an element and every ancestor up to the page's body are shown. */
function shown(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    if (node === pageDocument().body) return true;
  }
  return false;
}

function buttonNamed(root, text) {
  // Under the end-of-run window the header's buttons are hidden and the window has buttons of the
  // same names (D-368), so the one a player sees comes first.
  const named = all(root).filter(
    (element) => element.localName === "button" && element.textContent === text,
  );
  return named.find(shown) ?? named[0];
}

/** The button „Konto” of the menu bar, or undefined where the bar holds the game's name alone. */
const accountButton = (root) => buttonNamed(root, "Konto");

const menuIsOpen = (root) =>
  accountButton(root)?.getAttribute("aria-expanded") === "true";

/** Opens the menu „Konto” by a click if it stands closed; returns the button „Konto”. */
async function openMenu(root) {
  const button = accountButton(root);
  assert.ok(button, "the bar holds „Konto”");
  if (!menuIsOpen(root)) await press(button);
  return button;
}

/** The button „Wyloguj”, which stands in the open menu „Konto” only: the menu is opened first. */
async function logoutOf(root) {
  await openMenu(root);
  const button = buttonNamed(root, "Wyloguj");
  assert.ok(button, "the open menu holds „Wyloguj”");
  return button;
}

/** The sentences the menu „Konto” holds, in the order they stand; none while it is closed. */
const menuSentences = (root) =>
  byClass(root, "account-menu-sentence").map(
    (sentence) => sentence.textContent,
  );

/**
 * The bar holds the game's name alone: no item and no „Konto”, so no „Wyloguj” can stand anywhere
 * (D-262, D-280).
 */
function assertNameAloneOnBar(root, reason) {
  const bar = byClass(root, "menu-bar")[0];
  assert.ok(bar, `${reason}: the bar stands`);
  assert.deepEqual(
    byClass(bar, "menu-bar-name").map((name) => name.textContent),
    [ABOUT.name],
    reason,
  );
  assert.equal(byClass(bar, "menu-bar-item").length, 0, reason);
  assert.equal(accountButton(root), undefined, reason);
  assert.equal(buttonNamed(root, "Wyloguj"), undefined, reason);
}

function shownAlerts(root) {
  return all(root).filter(
    (element) => element.getAttribute("role") === "alert" && shown(element),
  );
}

/** The texts of the page's sentences in `confirmation-notice`, on the card or above the game. */
const noticeTexts = (root) =>
  byClass(root, "confirmation-notice")
    .filter(shown)
    .map((notice) => notice.textContent);

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

/** Every field and button under `root` with whether it is locked, as plain data. */
const lockOf = (root) =>
  [...tagged(root, "input"), ...tagged(root, "button")].map(
    (control) => control.disabled,
  );

/** The game in the page: its program panel and its headquarters. */
function gameShown(root) {
  return (
    byClass(root, "program-panel").length > 0 ||
    byClass(root, "headquarters").length > 0
  );
}

/**
 * The form the card stands in, under the name of its state: its heading, or the selected button of
 * the switch where it has none (D-259); with its inputs, button and warning.
 */
function forms(root) {
  return Object.fromEntries(
    byClass(root, "account-form").map((section) => {
      const heading = childrenOf(section).find(
        (child) => child.localName === "h2",
      );
      const selected = all(section.parentElement).find(
        (element) => element.getAttribute("aria-pressed") === "true",
      );
      const form = all(section).find((element) => element.localName === "form");
      return [
        (heading ?? selected).textContent,
        {
          form,
          inputs: all(form).filter((element) => element.localName === "input"),
          labels: all(form).filter((element) => element.localName === "label"),
          button: all(form).find((element) => element.localName === "button"),
          warning: all(form).find(
            (element) => element.getAttribute("role") === "alert",
          ),
          note: all(form).find(
            (element) => element.getAttribute("role") === "status",
          ),
        },
      ];
    }),
  );
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
    async answer(name, result) {
      const index = calls.findIndex((entry) => entry.name === name);
      assert.notEqual(index, -1, `no ${name} call is waiting`);
      const [entry] = calls.splice(index, 1);
      entry.answer(result);
      await settle();
    },
  };
}

const ACCOUNT = {
  ok: true,
  value: {
    id: "a1",
    email: "ala@example.com",
    emailConfirmed: true,
    previousSaveAllowed: false,
  },
};
const UNCONFIRMED_ACCOUNT = {
  ok: true,
  value: {
    id: "a1",
    email: "ala@example.com",
    emailConfirmed: false,
    previousSaveAllowed: false,
  },
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
const NO_CONNECTION = {
  ok: false,
  failure: {
    kind: "unreachable",
    reason: "network",
    message: "Brak połączenia.",
  },
};
/** The server's answer that the account has no saved game state. */
const NO_SAVE = { ok: true, value: null };

/**
 * The page address with a fragment the test sets, counting how often it is cleared and how often
 * the page asks to reload, and with a history of its own: `go` adds an entry after the current one and drops those after it, as a
 * browser does, `replace` changes the current entry, and `back` and `forward` move along it and
 * tell every listener, as the browser's back and forward buttons do through `hashchange`.
 */
function fakeAddress(hash = "") {
  const listeners = new Set();
  const address = {
    entries: [hash],
    index: 0,
    cleared: 0,
    reloaded: 0,
    get current() {
      return address.entries[address.index];
    },
    hash: () => address.current,
    clearFragment() {
      address.cleared += 1;
      address.entries[address.index] = "";
    },
    go(next) {
      address.entries.splice(address.index + 1);
      address.entries.push(next);
      address.index += 1;
    },
    replace(next) {
      address.entries[address.index] = next;
    },
    reload() {
      address.reloaded += 1;
    },
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    /** How many listeners the page keeps on the address. */
    listening: () => listeners.size,
    /** A click on a link to `next`: a new entry, and every listener told, as `hashchange` does. */
    follow(next) {
      address.go(next);
      for (const listener of listeners) listener();
    },
    back() {
      assert.ok(address.index > 0, "there is an entry to go back to");
      address.index -= 1;
      for (const listener of listeners) listener();
    },
    forward() {
      assert.ok(
        address.index < address.entries.length - 1,
        "there is an entry to go forward to",
      );
      address.index += 1;
      for (const listener of listeners) listener();
    },
  };
  return address;
}

async function startPage(held, address = fakeAddress()) {
  const { startApp } = await import("../../dist/browser/view/app.js");
  // A page opened by a reset link places the card as it starts, and a mount goes through act.
  await inAct(() => startApp(pageDocument().body, held.client, address));
  await settle();
}

async function signedOutPage(held) {
  await startPage(held);
  await held.answer("currentAccount", NO_SESSION);
  return forms(pageDocument().body);
}

/** The signed-out page with „Załóż konto” opened by the switch. */
async function registerPage(held) {
  await signedOutPage(held);
  await press(buttonNamed(pageDocument().body, "Załóż konto"));
  return forms(pageDocument().body)["Załóż konto"];
}

// --- the session check ----------------------------------------------------------------------

test("until the server names an account the page has neither the game nor a running clock", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    await startPage(held);
    assert.deepEqual(
      held.calls.map((entry) => entry.name),
      ["currentAccount"],
    );
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0);
    assert.deepEqual(forms(root), {});
    // D-97: „Wyloguj” stands in the menu „Konto”, so before the game the bar's name alone stands,
    // with no „Konto” to hold it.
    assertNameAloneOnBar(root, "while the page asks");

    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, GAME_INTERVALS);
    const header = childrenOf(root).find(
      (child) => child.localName === "header",
    );
    assert.ok(shown(accountButton(header)), "„Konto” stands in the header");
    assert.equal(
      buttonNamed(header, "Wyloguj"),
      undefined,
      "the closed menu holds no „Wyloguj”",
    );
    assert.ok(
      shown(await logoutOf(root)),
      "„Wyloguj” stands in the open menu „Konto”",
    );
  });
});

// D-259: one form at a time, the card opening on „Zaloguj się” with „Załóż konto” behind the switch.
test("an answer of no session shows the card on „Zaloguj się”, and the switch „Załóż konto”, each with visible labels, and no game", async () => {
  await onPage(async ({ root, intervals }) => {
    const shownForms = await signedOutPage(heldClient());
    assert.deepEqual(Object.keys(shownForms), ["Zaloguj się"]);
    const login = shownForms["Zaloguj się"];
    assert.deepEqual(
      login.inputs.map((input) => input.type),
      ["text", "password"],
    );
    assert.deepEqual(
      login.labels.map((label) => label.htmlFor),
      login.inputs.map((input) => input.id),
    );
    await press(buttonNamed(root, "Załóż konto"));
    const afterSwitch = forms(root);
    assert.deepEqual(Object.keys(afterSwitch), ["Załóż konto"]);
    const register = afterSwitch["Załóż konto"];
    assert.deepEqual(
      register.inputs.map((input) => input.type),
      ["text", "password", "password"],
    );
    assert.deepEqual(
      register.labels.map((label) => label.htmlFor),
      register.inputs.map((input) => input.id),
    );
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0);
    assertNameAloneOnBar(root, "no game stands");
  });
});

test("an answer that names no account and is not a refusal of the session shows one warning with retry, neither forms nor game", async () => {
  const answers = {
    "no connection": NO_CONNECTION,
    "a server error": {
      ok: false,
      failure: {
        kind: "refused",
        status: 500,
        code: null,
        message: "Serwer nie mógł.",
      },
    },
    "a transport refusal": {
      ok: false,
      failure: {
        kind: "refused",
        status: 400,
        code: null,
        message: "Serwer nie mógł.",
      },
    },
    "an unexpected answer": {
      ok: false,
      failure: { kind: "unexpected", status: 200, message: "Serwer nie mógł." },
    },
  };
  for (const [name, answer] of Object.entries(answers)) {
    await onPage(async ({ root, intervals }) => {
      const held = heldClient();
      await startPage(held);
      await held.answer("currentAccount", answer);
      const alerts = shownAlerts(root);
      assert.deepEqual(
        alerts.map((alert) => alert.textContent),
        [answer.failure.message],
        name,
      );
      assert.deepEqual(forms(root), {}, name);
      assert.equal(gameShown(root), false, name);
      assert.equal(intervals.size, 0, name);

      const retry = buttonNamed(root, "Spróbuj ponownie");
      assert.ok(retry && shown(retry), `${name}: a retry button is shown`);
      fire(retry, "click");
      await settle();
      assert.equal(
        held.calls.filter((entry) => entry.name === "currentAccount").length,
        1,
        name,
      );
      await held.answer("currentAccount", ACCOUNT);
      await held.answer("loadSavedGame", NO_SAVE);
      assert.equal(gameShown(root), true, name);
    });
  }
});

// --- the forms ------------------------------------------------------------------------------

// D-381: one form stands, so the lock of the whole card holds its field, its button and the switch.
test("a sent login waits with the whole card locked, and a refusal leaves one warning under it and focus where the player sent it from", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { "Zaloguj się": login } = await signedOutPage(held);
    const [, password] = login.inputs;
    await fillIn(root, "ala@example.com", "dwanaście znaków");
    password.focus();
    await sendForm(login.form);

    assert.deepEqual(
      held.calls.map(({ name, args }) => [name, ...args]),
      [["login", "ala@example.com", "dwanaście znaków"]],
    );
    assert.equal(login.button.textContent, "Logowanie…");
    assert.deepEqual(lockOf(cardOf(root)), Array(6).fill(true));
    // Neither the form nor the switch does anything while it waits.
    await press(buttonNamed(root, "Załóż konto"));
    await sendForm(login.form);
    assert.equal(held.calls.length, 1);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);

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
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [refusal.failure.message],
    );
    assert.ok(shown(login.warning));
    assert.equal(login.button.textContent, "Zaloguj się");
    assert.deepEqual(lockOf(cardOf(root)), Array(6).fill(false));
    assert.equal(pageDocument().activeElement, password);
    assert.equal(gameShown(root), false);
  });
});

test("a lost connection on registration leaves one warning under that form and focus on its button", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const register = await registerPage(held);
    await fillIn(
      root,
      "ala@example.com",
      "dwanaście znaków",
      "dwanaście znaków",
    );
    register.button.focus();
    await sendForm(register.form);
    assert.equal(register.button.textContent, "Zakładanie konta…");
    await held.answer("register", NO_CONNECTION);
    assert.ok(shown(register.warning));
    assert.equal(register.warning.textContent, NO_CONNECTION.failure.message);
    assert.equal(shownAlerts(root).length, 1);
    assert.equal(register.button.textContent, "Załóż konto");
    assert.equal(pageDocument().activeElement, register.button);
  });
});

// D-381: no state outlives the card, so a typed password leaves with it; the next card opens with empty
// fields.
test("a created account enters the game at once, and the page keeps no password", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const register = await registerPage(held);
    await fillIn(
      root,
      " Ala@Example.com ",
      "dwanaście znaków",
      "dwanaście znaków",
    );
    await sendForm(register.form);
    assert.deepEqual(held.calls[0].args, [
      " Ala@Example.com ",
      "dwanaście znaków",
      "dwanaście znaków",
    ]);
    await held.answer("register", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, GAME_INTERVALS);
    assert.deepEqual(forms(root), {});
    assert.equal(
      inputsIn(root).some((input) => input.type === "password"),
      false,
    );

    await press(await logoutOf(root));
    await settle();
    await held.answer("saveGame", { kind: "saved", revision: 1 });
    await held.answer("logout", { ok: true, value: null });
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      ["", ""],
    );
  });
});

test("a registration the server would refuse sends nothing and marks the field at fault", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const register = await registerPage(held);
    const [email, password] = register.inputs;
    await fillIn(root, "ala@example.com", "za krótkie", "za krótkie");
    await sendForm(register.form);
    assert.equal(held.calls.length, 0);
    assert.equal(password.getAttribute("aria-invalid"), "true");
    assert.equal(email.getAttribute("aria-invalid"), null);
    assert.equal(pageDocument().activeElement, password);
  });
});

test("registration problems follow the server's rules, counting a password in code points", () => {
  const twelve = "a".repeat(12);
  // Each of these emoji is one code point and two UTF-16 units.
  const emoji = (count) => "😀".repeat(count);
  const cases = [
    ["a valid registration", "ala@example.com", twelve, twelve, []],
    [
      "spaces and capitals around a valid address",
      "  Ala@X.pl ",
      twelve,
      twelve,
      [],
    ],
    ["an address of any characters on both sides", "ą ę@ł", twelve, twelve, []],
    ["no „@”", "ala.example.com", twelve, twelve, ["email"]],
    ["two „@”", "a@b@c", twelve, twelve, ["email"]],
    ["nothing before „@”", "@example.com", twelve, twelve, ["email"]],
    ["nothing after „@”", "ala@ ", twelve, twelve, ["email"]],
    ["11 characters", "a@b", "a".repeat(11), "a".repeat(11), ["password"]],
    ["12 emoji, 24 UTF-16 units", "a@b", emoji(12), emoji(12), []],
    ["11 emoji, 22 UTF-16 units", "a@b", emoji(11), emoji(11), ["password"]],
    ["128 emoji, 256 UTF-16 units", "a@b", emoji(128), emoji(128), []],
    ["129 characters", "a@b", "a".repeat(129), "a".repeat(129), ["password"]],
    ["spaces kept as typed", "a@b", "           x", "           x", []],
    [
      "a repetition differing in a trailing space",
      "a@b",
      twelve,
      `${twelve} `,
      ["confirmation"],
    ],
    [
      "everything wrong at once",
      "ala",
      "krótkie",
      "inne",
      ["email", "password", "confirmation"],
    ],
  ];
  for (const [name, email, password, confirmation, expected] of cases) {
    const problems = registrationProblems(email, password, confirmation);
    assert.deepEqual(Object.keys(problems).sort(), [...expected].sort(), name);
    for (const field of expected)
      assert.ok(problems[field], `${name}: ${field} has a message`);
  }
});

// --- the form „Nie pamiętam hasła” (D-96, D-222) ---------------------------------------------

const RESET_SENTENCE =
  "Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.";
const ADDRESS_SENTENCE = "Podaj adres e-mail w postaci nazwa@domena.";
const REQUEST_REFUSED = {
  ok: false,
  failure: {
    kind: "refused",
    status: 400,
    code: "invalid-request",
    message: "Nie udało się wysłać prośby.",
  },
};
const REQUESTED = { ok: true, value: null };

/** Whether the form shows a sentence of the reset under it. */
const noteShown = (form) => form.note !== undefined && shown(form.note);

/** The signed-out page with the request form opened by its button. */
async function requestPage(held) {
  await signedOutPage(held);
  await press(buttonNamed(pageDocument().body, "Nie pamiętam hasła"));
  return forms(pageDocument().body)["Nie pamiętam hasła"];
}

// D-96: the button puts the form in the card, in place of the one form that stands.
test("the button under „Zaloguj się” puts in its place one form with an empty address, „Wyślij odnośnik” and „Wróć do logowania”", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const before = await signedOutPage(held);
    assert.deepEqual(Object.keys(before), ["Zaloguj się"]);
    const opener = buttonNamed(root, "Nie pamiętam hasła");
    assert.ok(opener, "the button stands under „Zaloguj się”");
    assert.ok(before["Zaloguj się"].form.parentElement.contains(opener));
    assert.equal(before["Zaloguj się"].form.contains(opener), false);
    // What was typed in the form must not come back in the new state.
    await fillIn(root, "ala@example.com", "dwanaście znaków");

    await press(opener);
    const after = forms(root);
    assert.deepEqual(Object.keys(after), ["Nie pamiętam hasła"]);
    const request = after["Nie pamiętam hasła"];
    assert.equal(request.inputs.length, 1);
    assert.equal(request.inputs[0].value, "");
    assert.deepEqual(
      request.labels.map((label) => label.textContent),
      ["Adres e-mail"],
    );
    assert.equal(request.button.textContent, "Wyślij odnośnik");
    assert.ok(buttonNamed(root, "Wróć do logowania"));
    assert.equal(shown(request.warning), false);
    assert.equal(noteShown(request), false);
    assert.equal(pageDocument().activeElement, request.inputs[0]);
    assert.equal(held.calls.length, 0, "no request was made by the opening");
  });
});

test("a request waits with its field and every button of the screen locked, and sends nothing twice", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const request = await requestPage(held);
    await fillIn(root, "ala@example.com");
    request.inputs[0].focus();
    await sendForm(request.form);

    assert.deepEqual(
      held.calls.map(({ name, args }) => [name, ...args]),
      [["requestPasswordReset", "ala@example.com"]],
    );
    assert.equal(request.button.textContent, "Wysyłanie…");
    assert.equal(request.inputs[0].disabled, true);
    assert.equal(request.button.disabled, true);
    assert.equal(
      buttonNamed(pageDocument().body, "Wróć do logowania").disabled,
      true,
    );
    await sendForm(request.form);
    assert.equal(held.calls.length, 1);
  });
});

// D-381: one form stands, so the button locks with it.
test("while a login waits, the button „Nie pamiętam hasła” is locked with the form and opens nothing", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { "Zaloguj się": login } = await signedOutPage(held);
    await fillIn(root, "ala@example.com", "dwanaście znaków");
    await sendForm(login.form);
    const opener = buttonNamed(root, "Nie pamiętam hasła");
    assert.equal(opener.disabled, true);
    await press(opener);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);

    await held.answer("login", NO_CONNECTION);
    assert.equal(opener.disabled, false);
  });
});

test("an address not written as name@domain gets its sentence under the field, nothing is sent and the field takes focus", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const request = await requestPage(held);
    const [email] = request.inputs;
    await fillIn(root, "ala.example.com");
    request.button.focus();
    await sendForm(request.form);

    assert.equal(held.calls.length, 0);
    assert.equal(email.getAttribute("aria-invalid"), "true");
    const message = all(request.form).find(
      (element) =>
        element.classList.contains("input-field-message") && shown(element),
    );
    assert.equal(message.textContent, ADDRESS_SENTENCE);
    assert.equal(email.value, "ala.example.com");
    assert.equal(request.button.disabled, false);
    assert.equal(pageDocument().activeElement, email);
    assert.equal(noteShown(request), false);
  });
});

test("a well-formed address gets the one sentence of the reset under the form in a status, with the field empty and the form and „Wróć do logowania” staying", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const request = await requestPage(held);
    const [email] = request.inputs;
    await fillIn(root, "  nieznany@example.com ");
    email.focus();
    await sendForm(request.form);
    await held.answer("requestPasswordReset", REQUESTED);

    assert.ok(request.note, "the note stands in the form");
    assert.equal(request.note.getAttribute("role"), "status");
    assert.equal(request.note.textContent, RESET_SENTENCE);
    assert.ok(shown(request.note));
    assert.equal(email.value, "");
    assert.equal(email.disabled, false);
    assert.equal(request.button.textContent, "Wyślij odnośnik");
    assert.equal(request.button.disabled, false);
    assert.equal(shown(request.warning), false);
    assert.equal(shownAlerts(root).length, 0);
    assert.deepEqual(Object.keys(forms(root)), ["Nie pamiętam hasła"]);
    assert.equal(buttonNamed(root, "Wróć do logowania").disabled, false);
    assert.equal(pageDocument().activeElement, email);

    // Asking again removes the sentence while the new request is under way.
    await fillIn(root, "ala@example.com");
    await sendForm(request.form);
    assert.equal(noteShown(request), false);
  });
});

test("a refusal or a lost connection on a request stands as the form's warning, keeps the address and returns focus to where it was sent from", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const request = await requestPage(held);
    const [email] = request.inputs;
    await fillIn(root, "ala@example.com");
    email.focus();
    await sendForm(request.form);
    await held.answer("requestPasswordReset", REQUEST_REFUSED);
    assert.ok(shown(request.warning));
    assert.equal(request.warning.textContent, REQUEST_REFUSED.failure.message);
    assert.equal(noteShown(request), false);
    assert.equal(email.value, "ala@example.com");
    assert.equal(email.disabled, false);
    assert.equal(request.button.textContent, "Wyślij odnośnik");
    assert.equal(pageDocument().activeElement, email);

    request.button.focus();
    await sendForm(request.form);
    assert.equal(shown(request.warning), false);
    await held.answer("requestPasswordReset", NO_CONNECTION);
    assert.equal(request.warning.textContent, NO_CONNECTION.failure.message);
    assert.equal(shownAlerts(root).length, 1);
    assert.equal(email.value, "ala@example.com");
    assert.equal(pageDocument().activeElement, request.button);
  });
});

// D-96: „Wróć do logowania” brings back „Zaloguj się”, the one form that goes back to it.
test("„Wróć do logowania” brings back „Zaloguj się”, and nothing typed, no sentence and no warning survives a second visit", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const request = await requestPage(held);
    await fillIn(root, "ala@example.com");
    await sendForm(request.form);
    await held.answer("requestPasswordReset", REQUESTED);
    await fillIn(root, "druga@example.com");
    await sendForm(request.form);
    await held.answer("requestPasswordReset", REQUEST_REFUSED);
    await fillIn(root, "trzecia@example.com");
    assert.ok(shown(request.warning));

    await press(buttonNamed(root, "Wróć do logowania"));
    const back = forms(root);
    assert.deepEqual(Object.keys(back), ["Zaloguj się"]);
    assert.equal(pageDocument().activeElement, back["Zaloguj się"].inputs[0]);
    for (const input of back["Zaloguj się"].inputs)
      assert.equal(input.value, "");

    await press(buttonNamed(root, "Nie pamiętam hasła"));
    const again = forms(root)["Nie pamiętam hasła"];
    assert.equal(again.inputs[0].value, "");
    assert.equal(shown(again.warning), false);
    assert.equal(noteShown(again), false);
  });
});

test("the address rule and the password rules each give registration's result alone", () => {
  const twelve = "a".repeat(12);
  assert.equal(addressProblem(" ala@example.com "), null);
  assert.equal(addressProblem("ala"), ADDRESS_SENTENCE);
  assert.equal(addressProblem("a@b@c"), ADDRESS_SENTENCE);
  assert.equal(addressProblem("@b"), ADDRESS_SENTENCE);
  assert.equal(addressProblem("a@ "), ADDRESS_SENTENCE);
  assert.deepEqual(passwordProblems(twelve, twelve), {});
  assert.deepEqual(Object.keys(passwordProblems("krótkie", "krótkie")), [
    "password",
  ]);
  assert.deepEqual(Object.keys(passwordProblems(twelve, `${twelve} `)), [
    "confirmation",
  ]);
  assert.deepEqual(registrationProblems("ala", "krótkie", "inne"), {
    email: ADDRESS_SENTENCE,
    ...passwordProblems("krótkie", "inne"),
  });
});

// --- logout ---------------------------------------------------------------------------------

/** The page signed in; returns the button „Wyloguj”, which stands in the menu „Konto”, opened first. */
async function signedInPage(held) {
  await startPage(held);
  await held.answer("currentAccount", ACCOUNT);
  await held.answer("loadSavedGame", NO_SAVE);
  return logoutOf(pageDocument().body);
}

// The page calls focus() on the card here (D-381).
test("a confirmed logout or an expired session removes the game and its clock and brings back the card, with focus in its first field", async () => {
  for (const [name, answer] of Object.entries({
    "a confirmed logout": { ok: true, value: null },
    "an expired session": NO_SESSION,
  })) {
    await onPage(async ({ root, intervals }) => {
      const held = heldClient();
      const logout = await signedInPage(held);
      logout.focus();
      await press(logout);
      assert.equal(logout.disabled, true, name);
      assert.equal(logout.getAttribute("aria-busy"), "true", name);
      assert.equal(menuIsOpen(root), true, `${name}: the menu stays open`);
      assert.equal(
        gameShown(root),
        true,
        `${name}: the game stays while the server answers`,
      );
      // Logout saves the game state first (D-97).
      await held.answer("saveGame", { kind: "saved", revision: 1 });
      await held.answer("logout", answer);
      assert.equal(gameShown(root), false, name);
      assert.equal(intervals.size, 0, name);
      const shownForms = forms(root);
      assert.deepEqual(Object.keys(shownForms), ["Zaloguj się"], name);
      assert.equal(
        pageDocument().activeElement,
        shownForms["Zaloguj się"].inputs[0],
        name,
      );
      assert.ok(!shown(logout), name);
      assertNameAloneOnBar(root, name);
    });
  }
});

// D-97 and D-285: the one warning stands as the sentence of the menu „Konto”, which stays open.
test("a logout whose outcome is uncertain keeps the game with its sentence in the open menu „Konto”, and „Wyloguj” stays usable", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const logout = await signedInPage(held);
    logout.focus();
    await press(logout);
    await held.answer("saveGame", { kind: "saved", revision: 1 });
    await held.answer("logout", NO_CONNECTION);
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, GAME_INTERVALS);
    assert.equal(menuIsOpen(root), true, "the menu stays open");
    assert.deepEqual(menuSentences(root), [NO_CONNECTION.failure.message]);
    assert.equal(
      byClass(root, "account-menu-sentence")[0].classList.contains("warning"),
      true,
    );
    assert.deepEqual(shownAlerts(root), [], "the header holds no alert");
    assert.equal(logout.disabled, false);
    assert.ok(shown(logout));
    assert.equal(pageDocument().activeElement, logout);
    assert.deepEqual(forms(root), {});

    // A new request clears the sentence while it waits, and the page logs out when it ends.
    await press(logout);
    assert.deepEqual(menuSentences(root), []);
    await held.answer("saveGame", { kind: "saved", revision: 2 });
    await held.answer("logout", { ok: true, value: null });
    assert.equal(gameShown(root), false);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
  });
});

test("signing in and out again and again keeps at most one clock running", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const logout = await signedInPage(held);
    for (let round = 0; round < 3; round += 1) {
      assert.equal(intervals.size, GAME_INTERVALS);
      // Each sign-in builds the bar's menu anew, closed, so the button is looked up again.
      await press(round === 0 ? logout : await logoutOf(root));
      await held.answer("saveGame", { kind: "saved", revision: round + 1 });
      await held.answer("logout", { ok: true, value: null });
      assert.equal(intervals.size, 0);
      await signIn(held, ACCOUNT);
      await held.answer("loadSavedGame", NO_SAVE);
    }
    assert.equal(intervals.size, GAME_INTERVALS);
    // The game holds several screens (D-280), so one game is one element of the game.
    assert.equal(byClass(root, "game-view").length, 1);
  });
});

// --- the sentence of an unconfirmed address, in the menu „Konto” ---------------------------
// D-157: the sentence with „Wyślij ponownie” stands in the menu „Konto”, closed until the player
// opens it.

/** The sentence and the button of an unconfirmed address in the opened menu, or null where none stand. */
async function unconfirmedPart(root) {
  await openMenu(root);
  const part = byClass(root, "account-menu-unconfirmed")[0];
  if (!part) return null;
  const [sentence, button] = part.children;
  return { block: part.parentElement, sentence, button };
}

/** What the closed bar holds: the name, the three items and „Konto”, with no mark of the address. */
const barText = (root) => byClass(root, "menu-bar")[0].textContent;

test("a reload or sign-in with an unconfirmed address shows the sentence and Wyślij ponownie in the open menu „Konto”, before Wyloguj, and leaves them at logout", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", UNCONFIRMED_ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    // The closed menu shows nothing of the address, and no row of it stands in the header.
    assert.equal(barText(root), `${ABOUT.name}SiedzibaMapyProgramyKonto`);
    assert.deepEqual(menuSentences(root), []);
    assert.equal(buttonNamed(root, "Wyślij ponownie"), undefined);
    assert.equal(byClass(root, "email-status").length, 0);

    const { block, sentence, button } = await unconfirmedPart(root);
    assert.equal(sentence.textContent, "Adres e-mail niepotwierdzony.");
    assert.equal(sentence.classList.contains("warning"), false);
    assert.equal(button.textContent, "Wyślij ponownie");
    const logout = buttonNamed(root, "Wyloguj");
    assert.equal(
      byClass(block, "account-menu-address")[0].textContent,
      "ala@example.com",
    );
    assertInOrder(block, [sentence, button, logout]);

    await press(logout);
    await held.answer("saveGame", { kind: "saved", revision: 1 });
    await held.answer("logout", { ok: true, value: null });
    assert.equal(byClass(root, "account-menu-unconfirmed").length, 0);
    assert.deepEqual(menuSentences(root), []);

    // Signing in again with the same account brings a menu of its own back: closed, one sentence.
    await signIn(held, UNCONFIRMED_ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(byClass(root, "account-menu").length, 1);
    assert.equal(menuIsOpen(root), false);
    assert.deepEqual(menuSentences(root), []);
    assert.equal(
      (await unconfirmedPart(root)).sentence.textContent,
      "Adres e-mail niepotwierdzony.",
    );
    assert.equal(byClass(root, "account-menu-unconfirmed").length, 1);
  });
});

test("a confirmed address shows no sentence and no Wyślij ponownie in the open menu, which holds the address and Wyloguj", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(await unconfirmedPart(root), null);
    assert.equal(buttonNamed(root, "Wyślij ponownie"), undefined);
    assert.deepEqual(menuSentences(root), []);
    assert.equal(
      byClass(root, "account-menu-address")[0].textContent,
      "ala@example.com",
    );
    assert.ok(buttonNamed(root, "Wyloguj"));
  });
});

test("a created account starts the sentence of its menu with the outcome of its first message, and the closed bar shows no mark of it", async () => {
  const outcomes = {
    sent: "Wysłaliśmy odnośnik potwierdzający na ala@example.com.",
    limited: "Za dużo wiadomości. Spróbuj ponownie za godzinę.",
    failed: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
  };
  for (const [message, sentence] of Object.entries(outcomes)) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const register = await registerPage(held);
      await fillIn(
        root,
        "ala@example.com",
        "dwanaście znaków",
        "dwanaście znaków",
      );
      await sendForm(register.form);
      await held.answer("register", {
        ok: true,
        value: {
          ...UNCONFIRMED_ACCOUNT.value,
          confirmationMessage: message,
        },
      });
      await held.answer("loadSavedGame", NO_SAVE);
      assert.equal(
        barText(root),
        `${ABOUT.name}SiedzibaMapyProgramyKonto`,
        message,
      );
      const opened = await unconfirmedPart(root);
      assert.equal(opened.sentence.textContent, sentence, message);
      assert.equal(
        opened.sentence.classList.contains("warning"),
        message !== "sent",
        message,
      );
    });
  }
});

test("Wyślij ponownie sends one request for the signed-in account and shows its outcome in the menu, which stays open", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", UNCONFIRMED_ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    const { button } = await unconfirmedPart(root);
    await press(button);
    assert.deepEqual(
      held.calls.map((entry) => entry.name),
      ["sendConfirmationMessage"],
    );
    assert.equal(button.textContent, "Wysyłanie…");
    assert.equal(menuIsOpen(root), true);
    await held.answer("sendConfirmationMessage", {
      ok: true,
      value: "limited",
    });
    const { sentence } = await unconfirmedPart(root);
    assert.equal(
      sentence.textContent,
      "Za dużo wiadomości. Spróbuj ponownie za godzinę.",
    );
    assert.equal(sentence.classList.contains("warning"), true);
    assert.equal(
      menuIsOpen(root),
      true,
      "the menu stays open after the answer",
    );
    assert.equal(button.textContent, "Wyślij ponownie");
    assert.equal(pageDocument().activeElement, button);
  });
});

// --- the confirmation from the link ---------------------------------------------------------

const TOKEN = "Zm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmE";
const LINK = `#confirm-email=${TOKEN}`;
const CONFIRMED = { ok: true, value: null };
const INVALID_LINK = {
  ok: false,
  failure: {
    kind: "refused",
    status: 400,
    code: "invalid-link",
    message: "Odnośnik jest nieważny albo wygasł.",
  },
};

function noticeOf(root) {
  return byClass(root, "confirmation-notice").filter(shown);
}

/** The page's sentence in the card, above its switch and form (D-261). */
function assertAboveTheForm(root, notice) {
  const card = cardOf(root);
  assert.ok(card?.contains(notice), "the sentence stands in the card");
  assertInOrder(card, [notice, tagged(card, "button")[0], formIn(card)]);
}

test("with a token in the address the page confirms first, saying so, and checks the session only after the answer", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(LINK);
    await startPage(held, address);
    assert.deepEqual(
      held.calls.map(({ name, args }) => [name, ...args]),
      [["confirmEmail", TOKEN]],
    );
    const waiting = byClass(root, "session-check-text").find(shown);
    assert.equal(waiting.textContent, "Potwierdzanie adresu…");
    assert.equal(address.cleared, 0);

    await held.answer("confirmEmail", CONFIRMED);
    assert.equal(address.cleared, 1);
    assert.deepEqual(
      held.calls.map((entry) => entry.name),
      ["currentAccount"],
    );
    assert.equal(
      byClass(root, "session-check-text").find(shown).textContent,
      "Sprawdzanie logowania…",
    );
  });
});

// D-259: the card shows one form.
test("the result stands as one sentence above the game for a signed-in player and leaves at the next change between forms and game", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held, fakeAddress(LINK));
    await held.answer("confirmEmail", CONFIRMED);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    const [notice] = noticeOf(root);
    assert.equal(noticeOf(root).length, 1);
    assert.equal(notice.textContent, "Adres e-mail potwierdzony.");
    assert.equal(notice.classList.contains("positive"), true);
    const main = notice.parentElement;
    assert.equal(childrenOf(main).indexOf(notice), 0);
    assert.equal(gameShown(main), true);

    await press(await logoutOf(root));
    await settle();
    await held.answer("saveGame", { kind: "saved", revision: 1 });
    await held.answer("logout", CONFIRMED);
    assert.equal(noticeOf(root).length, 0);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
  });
});

// D-261: the sentence stands in the card, above the switch.
test("a refused link stands in warning above the form in the card for a player who is not signed in, and the fragment goes", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(LINK);
    await startPage(held, address);
    await held.answer("confirmEmail", INVALID_LINK);
    await held.answer("currentAccount", NO_SESSION);
    const [notice] = noticeOf(root);
    assert.equal(noticeOf(root).length, 1);
    assert.equal(notice.textContent, "Odnośnik jest nieważny albo wygasł.");
    assert.equal(notice.classList.contains("warning"), true);
    assertAboveTheForm(root, notice);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
    assert.equal(address.cleared, 1);
  });
});

test("a lost connection on the confirmation keeps the fragment and shows the client message in warning above the screen", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(LINK);
    await startPage(held, address);
    await held.answer("confirmEmail", NO_CONNECTION);
    await held.answer("currentAccount", NO_SESSION);
    const [notice] = noticeOf(root);
    assert.equal(notice.textContent, NO_CONNECTION.failure.message);
    assert.equal(notice.classList.contains("warning"), true);
    assert.equal(address.cleared, 0);
    assert.equal(address.hash(), LINK);
  });
});

test("an address without a token asks only for the session and shows no notice", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held, fakeAddress("#other"));
    assert.deepEqual(
      held.calls.map((entry) => entry.name),
      ["currentAccount"],
    );
    await held.answer("currentAccount", NO_SESSION);
    assert.equal(noticeOf(root).length, 0);
  });
});

test("the sentence of a confirmation waits through a failed session check and shows once it passes", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held, fakeAddress(LINK));
    await held.answer("confirmEmail", CONFIRMED);
    await held.answer("currentAccount", NO_CONNECTION);
    assert.equal(noticeOf(root).length, 0);
    fire(buttonNamed(root, "Spróbuj ponownie"), "click");
    await settle();
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(noticeOf(root).length, 1);
    assert.equal(
      held.calls.some((entry) => entry.name === "confirmEmail"),
      false,
    );
  });
});

// --- the form for a password-reset link ---------------------------------------------------------

const RESET_TOKEN = "cmVzZXRyZXNldHJlc2V0cmVzZXRyZXNldHJlc2V0cmVzZXQ";
const RESET_LINK = `#reset-password=${RESET_TOKEN}`;
const NEW_PASSWORD = "nowe hasło 123";
const CHANGED = { ok: true, value: null };

/** The failures that keep the form: the client's one sentence under it and the link as it was. */
const KEEPING_FAILURES = {
  "no connection": NO_CONNECTION,
  "a timeout": {
    ok: false,
    failure: { kind: "unreachable", reason: "timeout", message: "Za długo." },
  },
  "the gate full": {
    ok: false,
    failure: {
      kind: "refused",
      status: 429,
      code: "too-many-attempts",
      message: "Za dużo prób. Spróbuj ponownie za kilka minut.",
    },
  },
  "a server error": {
    ok: false,
    failure: {
      kind: "refused",
      status: 500,
      code: null,
      message: "Serwer nie mógł.",
    },
  },
  "a password the server refuses": {
    ok: false,
    failure: {
      kind: "refused",
      status: 400,
      code: "invalid-password",
      message: "Hasło musi mieć od 12 do 128 znaków.",
    },
  },
};

/**
 * An address that, at the moment its fragment is cleared, notes whether the reset form still
 * stands alone in the page: the fragment must go before the page moves on.
 */
function resetAddress(root) {
  const address = fakeAddress(RESET_LINK);
  const clear = address.clearFragment;
  address.formAtClear = [];
  address.clearFragment = () => {
    const standing = Object.keys(forms(root));
    address.formAtClear.push(
      standing.length === 1 && standing[0] === "Ustaw nowe hasło",
    );
    clear();
  };
  return address;
}

const resetFormOf = (root) => forms(root)["Ustaw nowe hasło"];

/** Types the new password twice into the form. */
async function fillReset(form, password = NEW_PASSWORD, repeated = password) {
  await typeInto(form.inputs[0], password);
  await typeInto(form.inputs[1], repeated);
}

/** The sentences the page puts above its screen, in order, with their roles. */
function pageSentences(root) {
  return all(root)
    .filter(
      (element) =>
        shown(element) &&
        (element.classList.contains("confirmation-notice") ||
          element.classList.contains("page-notice")),
    )
    .map((element) => [
      element.textContent,
      element.classList.contains("positive") ? "positive" : "warning",
    ]);
}

/** The message standing under a field of the form, or null while it shows none. */
function fieldMessage(input) {
  const message = all(input.parentElement).find(
    (element) =>
      element.classList.contains("input-field-message") && shown(element),
  );
  return message ? message.textContent : null;
}

test("with a reset token in the address the page shows the form at once, asking nothing, building no game and saving nothing", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const address = fakeAddress(RESET_LINK);
    await startPage(held, address);
    // Whoever is signed in in this browser, the page has asked nothing to know it.
    assert.deepEqual(held.calls, []);
    assert.deepEqual(Object.keys(forms(root)), ["Ustaw nowe hasło"]);
    const form = resetFormOf(root);
    assert.deepEqual(
      form.labels.map((label) => label.textContent),
      ["Nowe hasło", "Powtórz hasło"],
    );
    assert.deepEqual(
      form.inputs.map((input) => [
        input.type,
        input.getAttribute("autocomplete"),
      ]),
      [
        ["password", "new-password"],
        ["password", "new-password"],
      ],
    );
    assert.equal(form.button.textContent, "Ustaw hasło");
    assert.equal(form.button.type, "submit");
    assert.ok(buttonNamed(root, "Anuluj"), "the button „Anuluj” stands");
    assert.equal(shown(form.warning), false);
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0);
    assert.equal(
      byClass(root, "session-check").some(shown),
      false,
      "no session check is shown",
    );
    assertNameAloneOnBar(root, "no game stands");
    assert.equal(address.cleared, 0);
    assert.equal(address.hash(), RESET_LINK);
    // Time passing sends nothing either: no timer of a game or a saver exists.
    mock.timers.tick(10 * 60_000);
    await settle();
    assert.deepEqual(held.calls, []);
  });
});

test("a sent form waits with its fields and „Anuluj” locked, sends the token and both passwords once and keeps the fragment", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(RESET_LINK);
    await startPage(held, address);
    const form = resetFormOf(root);
    await fillReset(form);
    form.inputs[0].focus();
    await sendForm(form.form);

    assert.deepEqual(
      held.calls.map(({ name, args }) => [name, ...args]),
      [["setPassword", RESET_TOKEN, NEW_PASSWORD, NEW_PASSWORD]],
    );
    assert.equal(form.button.textContent, "Ustawianie…");
    assert.equal(form.button.disabled, true);
    assert.deepEqual(
      form.inputs.map((input) => input.disabled),
      [true, true],
    );
    const cancel = buttonNamed(root, "Anuluj");
    assert.equal(cancel.disabled, true);
    // A second send and a click on the locked „Anuluj” do nothing.
    await sendForm(form.form);
    await press(cancel);
    assert.equal(held.calls.length, 1);
    assert.equal(address.cleared, 0);
    assert.deepEqual(Object.keys(forms(root)), ["Ustaw nowe hasło"]);
  });
});

test("a password the server would refuse sends nothing, marks the field at fault, takes focus there and keeps the link", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(RESET_LINK);
    await startPage(held, address);
    const form = resetFormOf(root);

    await fillReset(form, "krótkie", "krótkie");
    await sendForm(form.form);
    assert.equal(
      fieldMessage(form.inputs[0]),
      "Hasło musi mieć od 12 do 128 znaków.",
    );
    assert.equal(fieldMessage(form.inputs[1]), null);
    assert.equal(pageDocument().activeElement, form.inputs[0]);

    await fillReset(form, NEW_PASSWORD, "inne hasło 123");
    await sendForm(form.form);
    assert.equal(fieldMessage(form.inputs[0]), null);
    assert.equal(
      fieldMessage(form.inputs[1]),
      "Powtórzone hasło różni się od hasła.",
    );
    assert.equal(pageDocument().activeElement, form.inputs[1]);

    assert.deepEqual(held.calls, []);
    assert.equal(address.cleared, 0);
    assert.equal(address.hash(), RESET_LINK);
    assert.equal(form.button.disabled, false);
    assert.equal(buttonNamed(root, "Anuluj").disabled, false);
  });
});

// D-261, D-381: the card of the link closes and one new card opens on „Zaloguj się” with the sentence in
// it, above its switch.
test("a change clears the fragment first, then shows a new card with the sentence in positive above its form, asks about no session and focuses the address field", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const address = resetAddress(root);
    await startPage(held, address);
    const form = resetFormOf(root);
    await fillReset(form);
    await sendForm(form.form);
    await held.answer("setPassword", CHANGED);

    assert.deepEqual(address.formAtClear, [true]);
    assert.equal(address.cleared, 1);
    assert.equal(address.hash(), "");
    assert.deepEqual(held.calls, []);
    assert.equal(byClass(root, "account-card").length, 1, "one card stands");
    const shownForms = forms(root);
    assert.deepEqual(Object.keys(shownForms), ["Zaloguj się"]);
    assert.deepEqual(pageSentences(root), [
      ["Hasło zmienione. Zaloguj się nowym hasłem.", "positive"],
    ]);
    const [notice] = noticeOf(root);
    assertAboveTheForm(root, notice);
    assert.equal(
      pageDocument().activeElement,
      shownForms["Zaloguj się"].inputs[0],
    );
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0);
  });
});

// D-261: where the check leads to the forms, the sentence stands in the card.
test("a refused link, whatever its reason, clears the fragment first and then checks the session: the card or the game with the sentence in warning above the form or the game", async () => {
  const reasons = {
    "an unknown or spent link": "Odnośnik jest nieważny albo wygasł.",
    "a link of a blocked account": "Konto jest zablokowane.",
  };
  for (const [name, message] of Object.entries(reasons)) {
    const refused = {
      ok: false,
      failure: { kind: "refused", status: 400, code: "invalid-link", message },
    };
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = resetAddress(root);
      await startPage(held, address);
      const form = resetFormOf(root);
      await fillReset(form);
      await sendForm(form.form);
      await held.answer("setPassword", refused);
      assert.deepEqual(address.formAtClear, [true], name);
      assert.equal(address.hash(), "", name);
      assert.deepEqual(
        held.calls.map((entry) => entry.name),
        ["currentAccount"],
        name,
      );
      await held.answer("currentAccount", NO_SESSION);
      assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
      assert.deepEqual(
        pageSentences(root),
        [["Odnośnik jest nieważny albo wygasł.", "warning"]],
        name,
      );
      const [notice] = noticeOf(root);
      assertAboveTheForm(root, notice);
    });
    await onPage(async ({ root }) => {
      const held = heldClient();
      await startPage(held, fakeAddress(RESET_LINK));
      const form = resetFormOf(root);
      await fillReset(form);
      await sendForm(form.form);
      await held.answer("setPassword", refused);
      await held.answer("currentAccount", ACCOUNT);
      await held.answer("loadSavedGame", NO_SAVE);
      assert.equal(gameShown(root), true, name);
      assert.deepEqual(
        pageSentences(root),
        [["Odnośnik jest nieważny albo wygasł.", "warning"]],
        name,
      );
      const [notice] = noticeOf(root);
      assert.equal(childrenOf(notice.parentElement).indexOf(notice), 0, name);
    });
  }
});

// D-259: the card shows one form.
test("„Anuluj” clears the fragment first and opens the page as usual with the session check and no sentence", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = resetAddress(root);
    await startPage(held, address);
    await press(buttonNamed(root, "Anuluj"));
    assert.deepEqual(address.formAtClear, [true]);
    assert.equal(address.hash(), "");
    assert.deepEqual(
      held.calls.map((entry) => entry.name),
      ["currentAccount"],
    );
    await held.answer("currentAccount", NO_SESSION);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
    assert.deepEqual(pageSentences(root), []);
  });
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held, fakeAddress(RESET_LINK));
    await press(buttonNamed(root, "Anuluj"));
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(gameShown(root), true);
    assert.deepEqual(pageSentences(root), []);
  });
});

test("a failure that is no change and no refused link keeps the form, the fragment and the link, with the client's sentence under the form and focus back where the player sent it from", async () => {
  for (const [name, failure] of Object.entries(KEEPING_FAILURES)) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = fakeAddress(RESET_LINK);
      await startPage(held, address);
      const form = resetFormOf(root);
      await fillReset(form);
      form.inputs[1].focus();
      await sendForm(form.form);
      await held.answer("setPassword", failure);

      assert.deepEqual(Object.keys(forms(root)), ["Ustaw nowe hasło"], name);
      assert.equal(shown(form.warning), true, name);
      assert.equal(form.warning.textContent, failure.failure.message, name);
      assert.equal(address.cleared, 0, name);
      assert.equal(address.hash(), RESET_LINK, name);
      assert.equal(pageDocument().activeElement, form.inputs[1], name);
      assert.equal(form.button.textContent, "Ustaw hasło", name);
      assert.equal(form.button.disabled, false, name);
      assert.deepEqual(
        form.inputs.map((input) => [input.disabled, input.value]),
        [
          [false, NEW_PASSWORD],
          [false, NEW_PASSWORD],
        ],
        name,
      );
      assert.equal(buttonNamed(root, "Anuluj").disabled, false, name);
      assert.deepEqual(held.calls, [], name);

      // The link still works: the same token goes out again, from the button this time.
      form.button.focus();
      await sendForm(form.form);
      assert.deepEqual(
        held.calls.map(({ name: call, args }) => [call, ...args]),
        [["setPassword", RESET_TOKEN, NEW_PASSWORD, NEW_PASSWORD]],
        name,
      );
      assert.equal(shown(form.warning), false, name);
      await held.answer("setPassword", failure);
      assert.equal(pageDocument().activeElement, form.button, name);
    });
  }
});

// --- the saved game state -------------------------------------------------------------------

const EXPIRED = "Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.";
const OUTDATED = "Gra została zaktualizowana. Odśwież stronę.";
const CONFLICT =
  "Gra została zapisana w innej przeglądarce. Wczytano ten zapis.";
const OTHER_VERSION =
  "Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.";
const DAMAGED =
  "Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.";
const OTHER_ACCOUNT = {
  ok: true,
  value: { id: "b2", email: "ola@example.com", emailConfirmed: true },
};

/** The version of the shape of the saved game state this game writes and loads (D-206). */
const VERSION = 6;
/** The version before `VERSION`, which D-206 makes another version: the save of a game that began on Las. */
const OLDER_VERSION = 5;
/** The moment the saves the server hands back were saved at; the load refuses a document without one. */
const SAVED_MS = CLOCK_MS - 60_000;
/** A new game with Ala in its team. */
const newWithCharacter = () => createCharacter(newGame(), "Ala").state;
/** The same game with Skraj lasu solved, which opens Las. */
const withCharacter = () => withEdgeSolved(newWithCharacter());
/** A game whose map run passes: Ala sent to the forest at the real date 0, unpaused. */
const passing = () =>
  send(withCharacter(), { mapId: "forest", characterId: 1 }, 0).state;
/** A game state as plain JSON, as it travels in a save. */
const plain = (state) => JSON.parse(JSON.stringify(state));
/** The server's answer holding a save of `game` at `revision`, stamped at its save (D-248). */
const saveOf = (game, revision, version = VERSION) => ({
  ok: true,
  value: { version, revision, game: plain({ ...game, saveTimeMs: SAVED_MS }) },
});
/** What the page sends to save `game` on the basis of `basedOn`, stamped by the clock (D-248). */
const submission = (game, basedOn) => ({
  version: VERSION,
  basedOn,
  game: plain({ ...game, saveTimeMs: CLOCK_MS }),
});

/** The names of the client's calls still waiting, oldest first. */
const waitingCalls = (held) => held.calls.map((entry) => entry.name);

/** The arguments of the oldest call of `name` still waiting. */
function argsOf(held, name) {
  const entry = held.calls.find((call) => call.name === name);
  assert.ok(entry, `no ${name} call is waiting`);
  return entry.args;
}

async function signIn(held, account) {
  const page = pageDocument().body;
  await fillIn(page, account.value.email, "dwanaście znaków");
  await sendForm(forms(page)["Zaloguj się"].form);
  await held.answer("login", account);
}

/**
 * The page signed in as ALA with her save of a passing map run at revision 4; the player picks 4×,
 * and the save of that answers that there is no session. Returns the state that save carried.
 */
async function expiredPage(held) {
  await startPage(held);
  await held.answer("currentAccount", ACCOUNT);
  await held.answer("loadSavedGame", saveOf(passing(), 4));
  await press(buttonNamed(pageDocument().body, "4×"));
  await settle();
  // The map run came back paused (D-212), and the pace is the player's change.
  const kept = { ...passing(), paused: true, pace: 4 };
  assert.deepEqual(argsOf(held, "saveGame"), [submission(kept, 4)]);
  await held.answer("saveGame", { kind: "signed-out" });
  return kept;
}

// invariant: expired-session-unsaved-progress
// D-203, D-211. Catches the state lost at the 401, the game left running beside the forms, the save
// asked for again instead of the kept state sent, and the kept state sent on another basis than the
// revision last seen. D-259: the card shows one form.
test("a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to the game from it", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const kept = await expiredPage(held);
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0, "the game's time stops");
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [EXPIRED],
    );
    assertNameAloneOnBar(root, "no game stands");

    await signIn(held, ACCOUNT);
    assert.deepEqual(waitingCalls(held), ["saveGame"]);
    assert.deepEqual(argsOf(held, "saveGame"), [submission(kept, 4)]);
    assert.equal(gameShown(root), true);
    assert.ok(shown(buttonNamed(root, "Wznów")), "its map run stands paused");
    assert.deepEqual(shownAlerts(root), []);
    await held.answer("saveGame", { kind: "saved", revision: 5 });
    assert.deepEqual(shownAlerts(root), []);
    assert.equal(intervals.size, GAME_INTERVALS);
  });
});

// invariant: expired-session-unsaved-progress
// D-203, D-211. Catches the kept state saved under another account, and a kept state that waits on
// for a later sign-in after another account's.
test("a sign-in to another account after a 401 on a save drops the kept state and loads that account's save", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await expiredPage(held);
    await signIn(held, OTHER_ACCOUNT);
    assert.deepEqual(waitingCalls(held), ["loadSavedGame"]);
    assert.deepEqual(forms(root), {}, "the forms leave while the page asks");
    assert.equal(
      byClass(root, "session-check-text").find(shown)?.textContent,
      "Sprawdzanie logowania…",
    );
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(gameShown(root), true);
    assert.deepEqual(waitingCalls(held), [], "nothing is saved");
    assert.ok(
      !buttonNamed(root, "Wznów") || !shown(buttonNamed(root, "Wznów")),
    );

    await press(await logoutOf(root));
    await settle();
    assert.deepEqual(argsOf(held, "saveGame"), [submission(newGame(), 0)]);
    await held.answer("saveGame", { kind: "saved", revision: 1 });
    await held.answer("logout", { ok: true, value: null });
    await signIn(held, ACCOUNT);
    assert.deepEqual(
      waitingCalls(held),
      ["loadSavedGame"],
      "back on the first account its own save is asked for",
    );
  });
});

const LOAD_FAILED = "Nie udało się wczytać gry. Spróbuj ponownie.";

/**
 * A fault of the code inside the real load, for as long as it lasts, its error quoting `quoted`: a
 * language function fails on the saved document alone, which no value of a document can make it do.
 * Returns what `console.error` got meanwhile and the way to end the fault.
 */
function faultInLoad(quoted) {
  const ownKeys = Reflect.ownKeys;
  const error = mock.method(console, "error", () => {});
  Reflect.ownKeys = (value) => {
    if (Object.hasOwn(value, "version") && Object.hasOwn(value, "game"))
      throw new TypeError(`a fault of the code at ${quoted}`);
    return ownKeys(value);
  };
  return {
    lines: () => error.mock.calls.map((call) => call.arguments.join(" ")),
    end() {
      Reflect.ownKeys = ownKeys;
      error.mock.restore();
    },
  };
}

// D-213, D-96. Catches the error taken for a refusal, which starts a new game and saves it over the
// player's save; a game built or a save sent while the sentence stands; the error's text in the
// console, which may quote what the save holds. The sentence and the button are D-96's, and that the
// retry saves nothing is D-207's: nothing the player did changed.
test("an error of the code in the load of a downloaded save keeps the save, builds no game, and the retry loads it", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    const fault = faultInLoad("the-quoted-value");
    try {
      await held.answer("loadSavedGame", saveOf(passing(), 4));
    } finally {
      fault.end();
    }
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [LOAD_FAILED],
    );
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0, "no game's time runs");
    assert.deepEqual(waitingCalls(held), [], "nothing is saved");
    const [line, ...others] = fault.lines();
    assert.deepEqual(others, [], "one line");
    assert.match(line, /TypeError/, "the kind of the error");
    assert.match(line, /a1/, "the account");
    assert.doesNotMatch(line, /the-quoted-value|a fault/);

    fire(buttonNamed(root, "Spróbuj ponownie"), "click");
    await settle();
    assert.deepEqual(waitingCalls(held), ["currentAccount"], "both requests");
    await held.answer("currentAccount", ACCOUNT);
    assert.deepEqual(waitingCalls(held), ["loadSavedGame"]);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    assert.equal(gameShown(root), true);
    assert.deepEqual(shownAlerts(root), []);
    assert.deepEqual(waitingCalls(held), [], "the retry saves nothing");
    assert.ok(shown(buttonNamed(root, "Wznów")), "it is the save's map run");
  });
});

// D-211, D-213. Catches the kept state dropped before the load, so that the
// retry finds no state and the next load brings the older save; the state left for another account.
test("an error of the code in the load of the kept state keeps it for the retry, and only then is it sent", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const kept = await expiredPage(held);
    const fault = faultInLoad("the-quoted-value");
    try {
      await signIn(held, ACCOUNT);
    } finally {
      fault.end();
    }
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [LOAD_FAILED],
    );
    assert.equal(gameShown(root), false);
    assert.deepEqual(forms(root), {}, "the forms leave for the sentence");
    assert.deepEqual(waitingCalls(held), [], "nothing is saved or asked for");
    assert.equal(fault.lines().length, 1);
    assert.doesNotMatch(fault.lines()[0], /the-quoted-value|a fault/);

    fire(buttonNamed(root, "Spróbuj ponownie"), "click");
    await settle();
    await held.answer("currentAccount", ACCOUNT);
    assert.deepEqual(
      waitingCalls(held),
      ["saveGame"],
      "the kept state, not the older save on the server",
    );
    assert.deepEqual(argsOf(held, "saveGame"), [submission(kept, 4)]);
    assert.equal(gameShown(root), true);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    await expiredPage(held);
    const fault = faultInLoad("the-quoted-value");
    try {
      await signIn(held, ACCOUNT);
    } finally {
      fault.end();
    }
    fire(buttonNamed(root, "Spróbuj ponownie"), "click");
    await settle();
    await held.answer("currentAccount", OTHER_ACCOUNT);
    assert.deepEqual(
      waitingCalls(held),
      ["loadSavedGame"],
      "another account's save, never the kept state",
    );
  });
});

/**
 * A game whose map run ended in Ala's death, the pause of each discovery lifted by the player, the
 * death settled as the game's clock settles it; the load refuses a death unsettled (D-221).
 */
/** The map run of `start`, Ala's passing one unless given, ended in a death, settled. */
function ended(start = passing()) {
  let state = start;
  for (let round = 0; round < 50 && !mapRunEnded(state.run); round += 1)
    state = advanceMinutes(setPaused(state, false).state, 5000).state;
  assert.ok(state.run.death, "precondition: the map run ended in a death");
  return settleDeath(state, 1_760_000_000_000).state;
}

/** The header's line of saving, or null while it says nothing. */
function saveLine(root) {
  const header = childrenOf(root).find((child) => child.localName === "header");
  return byClass(header, "save-line").find(shown) ?? null;
}

/** The page's sentences above the screen, in the order they stand. */
const pageNotices = (root) =>
  byClass(root, "page-notice")
    .filter(shown)
    .map((notice) => notice.textContent);

// D-96. Catches a game built before the saved game state answers, and a new game
// saved by itself over nothing.
test("after the session check the page keeps „Sprawdzanie logowania…” until the saved game state answers, and none gives a new game that saves nothing by itself", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    assert.deepEqual(waitingCalls(held), ["loadSavedGame"]);
    assert.equal(gameShown(root), false);
    assert.deepEqual(
      byClass(root, "session-check-text")
        .filter(shown)
        .map((text) => text.textContent),
      ["Sprawdzanie logowania…"],
    );
    assertNameAloneOnBar(root, "no game stands");

    await held.answer("loadSavedGame", NO_SAVE);
    assert.ok(shown(byClass(root, "headquarters")[0]));
    mock.timers.tick(30_000);
    await settle();
    assert.deepEqual(waitingCalls(held), [], "an untouched game is not saved");
  });
});

// D-212. Catches a loaded map run left running, at another pace, or moved to the
// headquarters, an ended one closed, and a loaded game saved again by itself.
test("a save builds the game the load gives: a map run that went on comes back paused at its pace, an ended one on its screen after the end", async () => {
  const passingAt8 = { ...passing(), pace: 8 };
  for (const [name, game, expected] of [
    ["going on", passingAt8, { pause: "Wznów", pace: "8×" }],
    ["ended in a death", ended(), { pause: null, pace: null }],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      await startPage(held);
      await held.answer("currentAccount", ACCOUNT);
      await held.answer("loadSavedGame", saveOf(game, 3));
      assert.equal(shown(byClass(root, "headquarters")[0]), false, name);
      // The screen of a map run holds no column of its own, so the screen itself is what shows.
      assert.ok(shown(byClass(root, "run-screen")[0]), name);
      assert.ok(shown(buttonNamed(root, "Restart")), name);
      assert.ok(shown(buttonNamed(root, "Zakończ")), name);
      const resume = buttonNamed(root, "Wznów");
      assert.equal(
        Boolean(resume && shown(resume)),
        expected.pause !== null,
        name,
      );
      if (expected.pace !== null)
        assert.ok(
          buttonNamed(root, expected.pace).classList.contains("selected"),
          name,
        );
      mock.timers.tick(30_000);
      await settle();
      assert.deepEqual(waitingCalls(held), [], `${name}: nothing is sent`);
    });
  }
});

/** Ala in an earning loop in Las; with `short` her first map run is one game minute from its end. */
function loopingAla(short) {
  const made = { ...withCharacter(), solvedMaps: ["forestEdge", "forest"] };
  const started = startLoop(made, { mapId: "forest", characterId: 1 }, 5).state;
  if (!short) return started;
  const whole = advanceLoopRun(started, 1, 100_000);
  assert.ok(
    mapRunEnded(whole.state.loops[1].run),
    "precondition: the run ends",
  );
  return advanceLoopRun(started, 1, whole.passed - 1).state;
}

/** The page hides, as a browser tells it. */
function hidePage() {
  const document = pageDocument();
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value: "hidden",
  });
  fire(document, "visibilitychange");
}

// D-207, D-212. The save loaded was made a minute before the clock's date. Catches a game that does not catch up after the load, and a
// catch-up that ended a run and is not saved at once, or saved once per run end.
test("a loaded game catches its loop up once, and a catch-up that ended a map run of the loop is saved at once", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(loopingAla(true), 3));
    assert.deepEqual(waitingCalls(held), ["saveGame"]);
    const [sent] = argsOf(held, "saveGame");
    assert.equal(sent.basedOn, 3);
    assert.equal(sent.game.loops[1].runNumber, 2, "the end was taken");
    assert.equal(sent.game.awayReport.length, 1);
    assert.equal(sent.game.awayReport[0].minutes, 1, "one minute, passed once");
    assert.equal(sent.game.saveTimeMs, CLOCK_MS);
    assert.ok(gameShown(root));
  });
});

// D-207: saving after any caught-up minute would make each reload send, and two open tabs refuse
// each other (D-209).
test("a catch-up that ended no map run sends nothing until the page hides, and the document then holds it caught up once", async () => {
  await onPage(async () => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(loopingAla(false), 3));
    assert.deepEqual(waitingCalls(held), []);
    mock.timers.tick(90_000);
    await settle();
    assert.deepEqual(waitingCalls(held), [], "the rhythm is the manual run's");

    hidePage();
    await settle();
    const [sent] = argsOf(held, "saveGame");
    assert.equal(sent.game.loops[1].run.minute, 1);
    assert.equal(sent.game.awayReport[0].minutes, 1);
    assert.equal(sent.game.loops[1].runNumber, 1);
  });
});

// The starts of the acts below. Ala in the team and a second program, „Program 2”, on the list.
const twoPrograms = () => createProgram(withCharacter()).state;
/** Ala's map run of the forest under program 1, paused, as a loaded map run comes back. */
const pausedRun = () =>
  setPaused(
    send(twoPrograms(), { mapId: "forest", characterId: 1, programId: 1 }, 0)
      .state,
    true,
  ).state;
/** The same map run with an edited copy: „Zawsze → Eksploruj” the program lacks. */
const changedCopy = () =>
  setProgram(
    pausedRun(),
    programFromRules({
      condition: { kind: "always" },
      action: { kind: "explore" },
    }),
  ).state;

/** The input the page names `label` for assistive technology. */
function inputLabelled(root, label) {
  const input = all(root).find(
    (element) =>
      element.localName === "input" &&
      element.getAttribute("aria-label") === label,
  );
  assert.ok(input, `a field „${label}” stands`);
  return input;
}

/** The button the page names `label` for assistive technology. */
function buttonLabelled(root, label) {
  const button = all(root).find(
    (element) =>
      element.localName === "button" &&
      element.getAttribute("aria-label") === label,
  );
  assert.ok(button, `a button „${label}” stands`);
  return button;
}

/** The two programs with sticks discovered, so a trip list can take an item. */
const knowingSticks = () => {
  const state = twoPrograms();
  return {
    ...state,
    understanding: { ...state.understanding, items: ["stick"] },
  };
};

/** The two programs with Ala's eating tree known and its first threshold, 15, reached. */
const eatingPoint = () => {
  const state = twoPrograms();
  return {
    ...state,
    understanding: { ...state.understanding, trees: ["eating"] },
    team: {
      ...state.team,
      characters: state.team.characters.map((character) => ({
        ...character,
        skills: { ...character.skills, eating: { practice: 15, ranks: {} } },
      })),
    },
  };
};

/** The select list the page names `label` for assistive technology. */
const listLabelled = (root, label) =>
  all(root).find(
    (element) =>
      element.localName === "select" &&
      element.getAttribute("aria-label") === label,
  );

function pickOn(list, value) {
  list.value = value;
  fire(list, "change");
}

/** Ala with the forest solved and the second program picked on her row (D-170). */
const solvedAla = () =>
  pickProgram({ ...twoPrograms(), solvedMaps: ["forestEdge", "forest"] }, 1, 2)
    .state;

/**
 * Each act of the player D-207 names, made once on a game built from `start`: `act` clicks, types
 * or picks it on the page, and `expected` is the game state it leaves, from the simulation call the
 * act stands for, or `check` a trait of the saved state where its exact value is not the page's.
 */
const ACTS = [
  {
    // The editor of the saved programs stands on Programy, beside the list of programs (D-166).
    name: "an edit of a program",
    start: twoPrograms,
    hash: "#/programy",
    act: (root) => fire(buttonNamed(root, "+ dodaj grupę"), "click"),
    check: (game, start) => {
      assert.equal(
        game.programs[0].program.groups.length,
        start.programs[0].program.groups.length + 1,
      );
      assert.deepEqual(game.programs[1], plain(start.programs[1]));
    },
  },
  {
    // Programy has an editor too, so the button is the one of the screen of the map run.
    name: "an edit of the copy",
    start: pausedRun,
    act: (root) =>
      fire(
        buttonNamed(byClass(root, "run-screen")[0], "+ dodaj grupę"),
        "click",
      ),
    check: (game, start) => {
      assert.equal(
        game.run.copy.program.groups.length,
        start.run.copy.program.groups.length + 1,
      );
      assert.deepEqual(game.programs, plain(start.programs));
    },
  },
  {
    // The plan stands folded to a line, and the line opens the lists; each step runs in an act of its
    // own, as the lists draw only after the act that opened them has ended.
    name: "an edit of a program's trip plan",
    start: knowingSticks,
    hash: "#/programy",
    ownActs: true,
    act: async (root) => {
      await press(
        byClass(programsScreenOf(root), "trip-plan-line")[0].querySelector(
          "button",
        ),
      );
      await press(buttonLabelled(root, "Zabierz: dodaj przedmiot"));
    },
    check: (game, start) => {
      assert.deepEqual(game.programs[0].program, {
        ...plain(start.programs[0].program),
        tripPlan: { take: [{ item: "stick", count: 1 }], bring: [] },
      });
      assert.deepEqual(game.programs[1], plain(start.programs[1]));
    },
  },
  {
    // The rank is bought on the screen Postać, where „Kup” stands (D-199, D-200).
    name: "buying a branch rank",
    start: eatingPoint,
    hash: "#/postac/1",
    act: (root) => fire(buttonLabelled(root, "Kup: Szybki posiłek"), "click"),
    expected: (start) => buyBranch(start, 1, "quickMeal").state,
  },
  {
    // The list of programs, with its actions, is a screen of its own: Programy (D-166, D-167).
    name: "„Nowy program”",
    start: twoPrograms,
    hash: "#/programy",
    act: (root) => fire(buttonNamed(root, "Nowy program"), "click"),
    expected: (start) => createProgram(start).state,
  },
  {
    // The name field of the list is a field of React: each step runs in an act of its own, since the
    // typed name reaches the field's „Zapisz” only when the act that typed it has ended.
    name: "„Zmień nazwę”",
    start: twoPrograms,
    hash: "#/programy",
    ownActs: true,
    act: async (root) => {
      await press(buttonNamed(root, "Zmień nazwę"));
      await typeInto(inputLabelled(root, "Nazwa programu"), "Zbieranie");
      await press(buttonNamed(root, "Zapisz"));
    },
    expected: (start) => renameProgram(start, 1, "Zbieranie").state,
  },
  {
    name: "„Usuń”",
    start: twoPrograms,
    hash: "#/programy",
    // The list of programs holds the „Usuń” of the program; a rule's „Usuń” in the editor beside it
    // is another button.
    act: (root) =>
      fire(
        buttonNamed(
          byClass(programsScreenOf(root), "program-list-view")[0],
          "Usuń",
        ),
        "click",
      ),
    expected: (start) => deleteProgram(start, 1).state,
  },
  {
    name: "„Zapisz w programie”",
    start: changedCopy,
    act: (root) => fire(buttonNamed(root, "Zapisz w programie"), "click"),
    expected: (start) => saveCopyIntoProgram(start).state,
  },
  {
    // The name field of the copy's save is a field of React: each step runs in an act of its own.
    name: "„Zapisz jako nowy program”",
    start: changedCopy,
    ownActs: true,
    act: async (root) => {
      await press(buttonNamed(root, "Zapisz jako nowy program"));
      await typeInto(inputLabelled(root, "Nazwa programu"), "Las");
      await press(buttonNamed(root, "Zapisz"));
    },
    expected: (start) => saveCopyAsNewProgram(start, "Las").state,
  },
  {
    name: "„Porzuć zmiany”",
    start: changedCopy,
    act: (root) => fire(buttonNamed(root, "Porzuć zmiany"), "click"),
    expected: (start) => discardCopyChanges(start).state,
  },
  {
    name: "„Przełącz postać na ten program”",
    start: pausedRun,
    act: (root) => {
      pickOn(listLabelled(root, "Program:"), "2");
      fire(buttonNamed(root, "Przełącz postać na ten program"), "click");
    },
    expected: (start) => switchProgram(start, 2).state,
  },
  {
    name: "creating a character",
    start: twoPrograms,
    act: (root) => {
      inputLabelled(root, "Imię nowej postaci").value = "Ola";
      fire(buttonNamed(root, "Załóż"), "click");
    },
    expected: (start) => createCharacter(start, "Ola").state,
  },
  {
    // The program is picked at the character in „Kto idzie” of the card of a map (D-170).
    name: "the pick at a character in „Kto idzie”",
    start: twoPrograms,
    hash: "#/mapy/forest",
    act: (root) => pickOn(listLabelled(root, "Program: Ala"), "2"),
    expected: (start) => pickProgram(start, 1, 2).state,
  },
  {
    name: "„Puść w pętlę”",
    start: solvedAla,
    hash: "#/mapy/forest",
    act: (root) =>
      fire(buttonLabelled(root, "Puść w pętlę: Ala, mapa Las"), "click"),
    // The start takes the real date as its time, and the list shows program 2.
    expected: (start) =>
      startLoop(
        start,
        { mapId: "forest", characterId: 1, programId: 2 },
        CLOCK_MS,
      ).state,
  },
  {
    // Siedziba keeps the line of a loop with its „Zatrzymaj”.
    name: "„Zatrzymaj” in Siedziba",
    start: () => loopingAla(false),
    act: (root) => fire(buttonNamed(root, "Zatrzymaj"), "click"),
    check: (game) => {
      assert.equal(game.loops[1], undefined);
      assert.notEqual(game.stoppedLoops[1], undefined);
    },
  },
  {
    name: "„Zatrzymaj” at a character in „Kto idzie”",
    start: () => loopingAla(false),
    hash: "#/mapy/forest",
    act: (root) =>
      fire(buttonNamed(byClass(root, "maps-screen")[0], "Zatrzymaj"), "click"),
    check: (game) => {
      assert.equal(game.loops[1], undefined);
      assert.notEqual(game.stoppedLoops[1], undefined);
    },
  },
  {
    name: "„Wejdź”",
    start: twoPrograms,
    hash: "#/mapy/forest",
    act: (root) => fire(buttonLabelled(root, "Wejdź: Ala, mapa Las"), "click"),
    // The send takes the real date as its time, so its seed is not this case's to write.
    check: (game) => {
      assert.equal(game.run.mapId, "forest");
      assert.equal(game.run.character.id, 1);
    },
  },
  {
    name: "„Restart”",
    start: pausedRun,
    act: (root) => fire(buttonNamed(root, "Restart"), "click"),
    expected: (start) => restart(start).state,
  },
  {
    name: "„Zakończ”",
    start: pausedRun,
    act: (root) => fire(buttonNamed(root, "Zakończ"), "click"),
    expected: (start) => end(start).state,
  },
  {
    name: "„Wznów”",
    start: pausedRun,
    act: (root) => fire(buttonNamed(root, "Wznów"), "click"),
    expected: (start) => setPaused(start, false).state,
  },
  {
    name: "a pace",
    start: pausedRun,
    act: (root) => fire(buttonNamed(root, "2×"), "click"),
    expected: (start) => setPace(start, 2).state,
  },
];

// D-211, D-248. Catches `keep()` writing a document with no save time, which the
// sign-in would refuse and start anew, a moment older than the reading it makes, and a stamp written
// into the view's state, which the saver's comparison would take for a change.
test("the document kept for the same account holds the moment of its reading and loads, and the view's state stays what it was", async () => {
  await onPage(async () => {
    let current = CLOCK_MS;
    const date = mock.method(Date, "now", () => current);
    try {
      const { createGameView } =
        await import("../../dist/browser/view/game-view.js");
      const held = heldClient();
      // Inside act: the game holds a React root, the list of programs on Programy.
      const view = await inAct(() =>
        createGameView({
          client: held.client,
          state: withCharacter(),
          revision: 3,
          address: fakeAddress(),
          entry: "address",
          onScreen: () => {},
          onConflict: () => {},
          onOutdated: () => {},
          onSignedOut: () => {},
        }),
      );
      current = CLOCK_MS + 5_000;
      const kept = view.keep();
      assert.equal(kept.revision, 3);
      assert.equal(kept.document.game.saveTimeMs, CLOCK_MS + 5_000);
      assert.deepEqual(loadSavedGame(kept.document), {
        ok: true,
        state: { ...withCharacter(), saveTimeMs: CLOCK_MS + 5_000 },
      });

      mock.timers.tick(30_000);
      await settle();
      assert.deepEqual(waitingCalls(held), [], "keep() changes no state");
      await inAct(() => view.dispose());
    } finally {
      date.mock.restore();
    }
  });
});

// D-207's list of acts. Catches an act of the player whose change is left to the next
// 30-second check or to the hidden page, and an act that changes nothing sending a save.
test("each act of the player that changes the game state is saved at once, and one that changes nothing sends nothing", async () => {
  const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
  // The clock reads no real time, so an act that starts the map run again leaves no carried time.
  Object.defineProperty(globalThis, "performance", {
    configurable: true,
    value: handClock(() => 0),
  });
  try {
    for (const { name, start, hash, ownActs, act, expected, check } of ACTS) {
      await onPage(async ({ root }) => {
        const held = heldClient();
        const begun = start();
        await startPage(held, fakeAddress(hash ?? ""));
        await held.answer("currentAccount", ACCOUNT);
        await held.answer("loadSavedGame", saveOf(begun, 4));
        assert.deepEqual(waitingCalls(held), [], `${name}: precondition`);
        // Inside act: a send and „Zakończ” change the screen, and the bar redraws with React.
        await (ownActs ? act(root) : inAct(() => act(root)));
        await settle();
        assert.deepEqual(waitingCalls(held), ["saveGame"], name);
        const [sent] = argsOf(held, "saveGame");
        assert.equal(sent.basedOn, 4, name);
        // D-248: the document holds the clock's moment, the state does not.
        if (expected)
          assert.deepEqual(
            sent.game,
            plain({ ...expected(begun), saveTimeMs: CLOCK_MS }),
            name,
          );
        else check(sent.game, begun);
      });
    }
  } finally {
    Object.defineProperty(globalThis, "performance", saved);
  }

  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(pausedRun(), 4));
    // Without a map run the pause changes nothing (setPaused). The header in React draws nothing
    // without a map run, so the pause pressed without a map run is the „Wznów” the hidden screen of
    // a map run still holds after „Zakończ” ended its map run (D-281).
    await inAct(() => fire(buttonNamed(root, "Zakończ"), "click"));
    await settle();
    assert.deepEqual(
      waitingCalls(held),
      ["saveGame"],
      "precondition: „Zakończ” saved",
    );
    await held.answer("saveGame", { kind: "saved", revision: 5 });
    const resume = buttonNamed(byClass(root, "run-screen")[0], "Wznów");
    assert.equal(shown(resume), false, "precondition: the screen is hidden");
    // Inside act: the click reaches the screen's React tree.
    await inAct(() => fire(resume, "click"));
    await settle();
    assert.deepEqual(waitingCalls(held), []);
  });
});

// --- the character's row: starting, watching and stopping an earning loop --------------------
// D-243, D-244, D-245, D-251.

/** The row of the character named `name` in the headquarters under `root`. */
function rowOf(root, name) {
  const row = byClass(root, "team-member").find(
    (candidate) =>
      byClass(candidate, "team-member-name")[0].textContent === name,
  );
  assert.ok(row, `a row of ${name} stands`);
  return row;
}

/** The block of the character named `name` in „Kto idzie” of the screen Mapy under `root`. */
function whoOf(root, name) {
  const member = byClass(root, "maps-who-member").find(
    (candidate) => byClass(candidate, "maps-who-name")[0].textContent === name,
  );
  assert.ok(member, `a block of ${name} stands in „Kto idzie”`);
  return member;
}

/**
 * The game of `state` built in the page without the account page around it, as a reload at
 * `address` builds it; its element stands in the body.
 */
async function viewOf(state, address = fakeAddress()) {
  const { createGameView } =
    await import("../../dist/browser/view/game-view.js");
  const held = heldClient();
  const view = await inAct(() =>
    createGameView({
      client: held.client,
      state,
      revision: 1,
      address,
      entry: "address",
      onScreen: () => {},
      onConflict: () => {},
      onOutdated: () => {},
      onSignedOut: () => {},
    }),
  );
  pageDocument().body.append(view.element);
  return { view, held };
}

/** Ala, the first character, and Ola, the second, with the forest solved and Ala in a loop in it. */
function alaLoopingOlaFree() {
  const solved = { ...eatingPoint(), solvedMaps: ["forestEdge", "forest"] };
  const team = createCharacter(solved, "Ola").state;
  return startLoop(team, { mapId: "forest", characterId: 1 }, 5).state;
}

// Catches a row that draws the loop line and „Zatrzymaj” for every character or for none, and
// buttons disabled for the whole team (or by the one map run, as before) when only the character in
// the loop must be shut out; „Kup” and the program list must stay active (D-200, D-170).
test("a character in a loop shows its line and „Zatrzymaj” in Siedziba and in „Kto idzie”; its „Wejdź” and „Puść w pętlę” are disabled, another character's are not, and „Kup” and the program list stay active", async () => {
  await onPage(async ({ root }) => {
    const address = fakeAddress("#/");
    const { view } = await viewOf(alaLoopingOlaFree(), address);
    const ala = rowOf(root, "Ala");
    const ola = rowOf(root, "Ola");
    const [line] = byClass(ala, "team-member-loop");
    assert.ok(shown(line));
    assert.equal(
      line.textContent,
      "Pętla: Las · przejście 1 · minuta 0 · domknięte 0",
    );
    assert.ok(shown(buttonNamed(ala, "Zatrzymaj")));
    assert.ok(buttonNamed(ala, "Zatrzymaj").classList.contains("destructive"));
    assert.ok(!shown(byClass(ola, "team-member-loop")[0]));
    assert.ok(!shown(buttonNamed(ola, "Zatrzymaj")));
    // Siedziba sends nobody: no list of programs and no button of sending in a row (D-329, D-330).
    // A character in no loop has no „Zatrzymaj” at all.
    for (const [row, buttons] of [
      [ala, ["Zatrzymaj"]],
      [ola, []],
    ]) {
      assert.equal(tagged(row, "select").length, 0);
      assert.deepEqual(
        tagged(row, "button").map((button) => button.textContent),
        buttons,
      );
    }

    // The character's block in „Kto idzie”, under each map of the list.
    await follow(address, "#/mapy/forest");
    const whoAla = whoOf(root, "Ala");
    const whoOla = whoOf(root, "Ola");
    assert.equal(
      byClass(whoAla, "maps-who-loop-line")[0].textContent,
      "Pętla: Las · przejście 1 · minuta 0 · domknięte 0",
    );
    assert.equal(byClass(whoOla, "maps-who-loop").length, 0);
    for (const map of ["Las", "Las — głębiej"]) {
      await follow(
        address,
        map === "Las" ? "#/mapy/forest" : "#/mapy/forestDeep",
      );
      assert.equal(
        buttonLabelled(whoOf(root, "Ala"), `Wejdź: Ala, mapa ${map}`).disabled,
        true,
        map,
      );
      assert.equal(
        buttonLabelled(whoOf(root, "Ola"), `Wejdź: Ola, mapa ${map}`).disabled,
        false,
        map,
      );
    }
    await follow(address, "#/mapy/forest");
    assert.equal(
      buttonLabelled(whoOf(root, "Ala"), "Puść w pętlę: Ala, mapa Las")
        .disabled,
      true,
    );
    assert.equal(
      buttonLabelled(whoOf(root, "Ola"), "Puść w pętlę: Ola, mapa Las")
        .disabled,
      false,
    );
    // The map not yet solved has no loop button at all.
    await follow(address, "#/mapy/forestDeep");
    assert.equal(
      all(whoOf(root, "Ola")).filter((element) =>
        element.getAttribute("aria-label")?.startsWith("Puść w pętlę"),
      ).length,
      0,
    );
    assert.equal(
      listLabelled(whoOf(root, "Ala"), "Program: Ala").disabled,
      false,
    );
    await inAct(() => view.dispose());
    // „Kup” is not on Siedziba; the character in the loop buys on its screen Postać (D-200).
    const character = await viewOf(
      alaLoopingOlaFree(),
      fakeAddress("#/postac/1"),
    );
    assert.equal(buttonLabelled(root, "Kup: Szybki posiłek").disabled, false);
    await inAct(() => character.view.dispose());
  });
});

// D-287. Catches a block whose inactive „Wejdź” and „Puść w pętlę” say
// nothing after the end of a map run, a sentence standing beside the buttons rather than under them,
// one sentence per map instead of one per character, a sentence left on after „Zakończ”, and a
// sentence of sending that stays in Siedziba.
test("after the end of a map run every character's „Wejdź” is inactive under the sentence why, and „Zakończ” takes the sentence away", async () => {
  await onPage(async ({ root }) => {
    const endedWithOla = createCharacter(ended(), "Ola").state;
    const sentence =
      "Przejście na mapie Las jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.";
    const address = fakeAddress("#/mapy/forest");
    const { view } = await viewOf(endedWithOla, address);
    for (const name of ["Ala", "Ola"]) {
      const who = whoOf(root, name);
      const notes = byClass(who, "maps-who-run-note");
      assert.equal(notes.length, 1, `${name}: one sentence at the character`);
      assert.equal(notes[0].textContent, sentence, name);
      assert.ok(shown(notes[0]), `${name}: the sentence shows`);
      const enter = buttonLabelled(who, `Wejdź: ${name}, mapa Las`);
      assert.equal(enter.disabled, true, name);
      assertInOrder(root, [enter, notes[0]]);
    }
    // Siedziba says nothing of sending.
    await follow(address, "#/");
    for (const name of ["Ala", "Ola"])
      assert.equal(
        byClass(rowOf(root, name), "team-member-run-note").length,
        0,
      );
    await inAct(() => view.dispose());

    // „Zakończ” stands on the run's screen; after it the sentence of every character goes.
    const runAddress = fakeAddress("#/postac/1/przejscie");
    const run = await viewOf(endedWithOla, runAddress);
    await inAct(() => fire(buttonNamed(root, "Zakończ"), "click"));
    await follow(runAddress, "#/mapy/forest");
    for (const name of ["Ala", "Ola"]) {
      assert.equal(
        byClass(whoOf(root, name), "maps-who-run-note").length,
        0,
        `${name}: no run, no sentence`,
      );
      assert.equal(
        buttonLabelled(whoOf(root, name), `Wejdź: ${name}, mapa Las`).disabled,
        false,
        name,
      );
    }
    await inAct(() => run.view.dispose());
  });
});

// D-329. Catches a name that is no link, a link to another address, and a link
// that does not open the character's screen Postać.
test("the name in a character's row is a link to its screen Postać, which then opens", async () => {
  await onPage(async ({ root }) => {
    const { view } = await viewOf(withCharacter());
    const [name] = byClass(rowOf(root, "Ala"), "team-member-name");
    assert.equal(name.localName, "a");
    assert.equal(name.getAttribute("href"), "#/postac/1");
    const href = name.getAttribute("href");
    await inAct(() => view.dispose());
    // The page opens the screen the link names, as a load at that address does.
    const opened = await viewOf(withCharacter(), fakeAddress(href));
    assert.equal(shownScreen(root), "character");
    await inAct(() => opened.view.dispose());
  });
});

// D-329. Catches a click on „Puść w pętlę” that leaves the character as it was, that opens a
// map run or leads away from the screen Mapy, that is not saved, or that does not move the focus to
// the „Zatrzymaj” that now stands in the button's place; the loop line must stand at once with the
// buttons of the character shut.
test("„Puść w pętlę” puts the character into a loop at once and the player stays on the screen Mapy, where the character shows it", async () => {
  await onPage(async ({ root }) => {
    const address = fakeAddress("#/mapy/forest");
    const { view, held } = await viewOf(solvedAla(), address);
    const ala = whoOf(root, "Ala");
    assert.equal(byClass(ala, "maps-who-loop").length, 0);
    await press(buttonLabelled(ala, "Puść w pętlę: Ala, mapa Las"));
    assert.equal(shownScreen(root), "maps", "the player stays on Mapy");
    assert.deepEqual(address.entries, ["#/mapy/forest"], "with no new entry");
    assert.equal(
      byClass(ala, "maps-who-loop-line")[0].textContent,
      "Pętla: Las · przejście 1 · minuta 0 · domknięte 0",
    );
    assert.equal(buttonLabelled(ala, "Wejdź: Ala, mapa Las").disabled, true);
    assert.equal(
      buttonLabelled(ala, "Puść w pętlę: Ala, mapa Las").disabled,
      true,
    );
    assert.equal(
      pageDocument().activeElement,
      buttonNamed(ala, "Zatrzymaj"),
      "the focus goes to „Zatrzymaj”, which took the place of the pressed button",
    );
    assert.equal(
      byClass(rowOf(root, "Ala"), "team-member-loop")[0].textContent,
      "Pętla: Las · przejście 1 · minuta 0 · domknięte 0",
      "Siedziba holds the line as well",
    );
    assert.deepEqual(waitingCalls(held), ["saveGame"]);
    await inAct(() => view.dispose());
  });
});

// Catches a stop that asks first, one that leaves the line of the loop or none of the stop, and one
// that shows practice the loop did not gather (D-245).
test("„Zatrzymaj” stops at once and the row shows „Pętla zatrzymana” with the practice paid, or the bare words, until the next start", async () => {
  await onPage(async ({ root }) => {
    const base = alaLoopingOlaFree();
    const gathering = {
      ...base,
      loops: {
        1: { ...base.loops[1], practice: { eating: 4, exploration: 12 } },
      },
    };
    const address = fakeAddress("#/");
    const { view } = await viewOf(gathering, address);
    const ala = rowOf(root, "Ala");
    await press(buttonNamed(ala, "Zatrzymaj"));
    assert.ok(!shown(byClass(ala, "team-member-loop")[0]));
    assert.ok(!shown(buttonNamed(ala, "Zatrzymaj")));
    const [stopped] = byClass(ala, "team-member-stopped");
    assert.ok(shown(stopped));
    assert.equal(
      stopped.textContent,
      "Pętla zatrzymana · wprawa: Eksploracja +12, Jedzenie +4",
    );
    assert.ok(!shown(byClass(rowOf(root, "Ola"), "team-member-stopped")[0]));

    // On the screen Mapy the character may enter again, and the next start clears the line.
    await follow(address, "#/mapy/forest");
    assert.equal(
      buttonLabelled(whoOf(root, "Ala"), "Wejdź: Ala, mapa Las").disabled,
      false,
    );
    await press(
      buttonLabelled(whoOf(root, "Ala"), "Puść w pętlę: Ala, mapa Las"),
    );
    await follow(address, "#/");
    assert.ok(!shown(stopped));
    assert.ok(shown(byClass(ala, "team-member-loop")[0]));
    await inAct(() => view.dispose());
  });

  await onPage(async ({ root }) => {
    const { view } = await viewOf(alaLoopingOlaFree());
    const ala = rowOf(root, "Ala");
    await press(buttonNamed(ala, "Zatrzymaj"));
    assert.equal(
      byClass(ala, "team-member-stopped")[0].textContent,
      "Pętla zatrzymana",
    );
    await inAct(() => view.dispose());
  });
});

// Catches a line lost on a load: the entry lives in the game state, so a game built from a state
// holding it shows the line, in that character's row alone (D-245).
test("a game built from a state with a stopped loop shows the line of the stop in that character's row", async () => {
  await onPage(async ({ root }) => {
    const base = alaLoopingOlaFree();
    const { view } = await viewOf({
      ...base,
      loops: {},
      stoppedLoops: { 1: { eating: 7 } },
    });
    assert.equal(
      byClass(rowOf(root, "Ala"), "team-member-stopped")[0].textContent,
      "Pętla zatrzymana · wprawa: Jedzenie +7",
    );
    assert.ok(!shown(byClass(rowOf(root, "Ola"), "team-member-stopped")[0]));
    await inAct(() => view.dispose());
  });
});

// Catches the chest inside the key of the rows: a deposit, or a take at another
// character's start, rebuilt every row of Siedziba and every block of „Kto idzie”, so a list open
// at a character went. The start is made on the screen Mapy, where the characters are sent from, and
// Siedziba, hidden meanwhile, draws the chest on.
test("a change of the chest redraws the chest alone: the rows of Siedziba and the blocks of „Kto idzie” stay, with their lists", async () => {
  await onPage(async ({ root }) => {
    const solved = { ...eatingPoint(), solvedMaps: ["forestEdge", "forest"] };
    const stocked = {
      ...solved,
      team: { ...solved.team, chest: { pieces: { stick: 10 } } },
    };
    const taking = editProgram(stocked, 1, {
      ...stocked.programs[0].program,
      tripPlan: { take: [{ item: "stick", count: 3 }], bring: [] },
    }).state;
    const team = createCharacter(taking, "Ola").state;
    const begun = startLoop(team, { mapId: "forest", characterId: 1 }, 5).state;
    const { view } = await viewOf(begun, fakeAddress("#/mapy/forest"));
    const row = rowOf(root, "Ala");
    const stop = buttonNamed(row, "Zatrzymaj");
    const who = whoOf(root, "Ala");
    const list = listLabelled(who, "Program: Ala");
    const chestText = () =>
      childrenOf(byClass(root, "chest-list")[0]).map(
        (item) => item.textContent,
      );
    const heading = () =>
      byClass(root, "chest-list")[0].parentElement.children[0].textContent;
    assert.deepEqual(chestText(), ["patyk: 7"]);
    assert.ok(heading().startsWith("Skrzynka 7/"));

    // Ola's start takes three sticks out of the chest.
    await press(
      buttonLabelled(whoOf(root, "Ola"), "Puść w pętlę: Ola, mapa Las"),
    );
    assert.deepEqual(chestText(), ["patyk: 4"]);
    assert.ok(heading().startsWith("Skrzynka 4/"));
    assert.equal(rowOf(root, "Ala"), row, "the row is the same element");
    assert.equal(buttonNamed(row, "Zatrzymaj"), stop);
    assert.equal(whoOf(root, "Ala"), who, "the block is the same element");
    assert.equal(listLabelled(who, "Program: Ala"), list);
    await inAct(() => view.dispose());
  });
});

// D-251, D-329. Catches a mark in the wrong place or role, a mark at a map not yet solved,
// and a mark that ignores the chest.
test("the mark of a rehearsal the loop cannot repeat stands under „Wejdź” of a solved map, and only where the chest lacks what the list takes", async () => {
  const MARK =
    "Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.";
  /** Ala with the forest solved, a take list of three sticks and `held` sticks in the chest. */
  const holding = (held) => {
    const solved = { ...twoPrograms(), solvedMaps: ["forestEdge", "forest"] };
    const stocked = {
      ...solved,
      team: { ...solved.team, chest: { pieces: { stick: held } } },
    };
    return editProgram(stocked, 1, {
      ...stocked.programs[0].program,
      tripPlan: { take: [{ item: "stick", count: 3 }], bring: [] },
    }).state;
  };
  await onPage(async ({ root }) => {
    const address = fakeAddress("#/mapy/forest");
    const { view } = await viewOf(holding(2), address);
    const who = whoOf(root, "Ala");
    const marks = byClass(who, "rehearsal-mark");
    assert.equal(marks.length, 1, "one under „Wejdź”");
    assert.ok(shown(marks[0]));
    assert.equal(marks[0].textContent, MARK);
    assertInOrder(root, [
      buttonLabelled(who, "Wejdź: Ala, mapa Las"),
      marks[0],
    ]);
    await follow(address, "#/mapy/forestDeep");
    assert.equal(
      byClass(whoOf(root, "Ala"), "rehearsal-mark").length,
      0,
      "the map not yet solved has no mark",
    );
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root }) => {
    const { view } = await viewOf(holding(3), fakeAddress("#/mapy/forest"));
    assert.equal(byClass(whoOf(root, "Ala"), "rehearsal-mark").length, 0);
    await inAct(() => view.dispose());
  });
});

/** A game whose map run passes one game minute before Ala dies of cold. */
function lastMinute() {
  let state = passing();
  for (let round = 0; round < 1000; round += 1) {
    const next = advanceMinutes(setPaused(state, false).state, 1).state;
    if (mapRunEnded(next.run)) break;
    state = next;
  }
  return state;
}

// D-207, D-221. Catches a death left unsaved until the next 30-second check, and a death
// saved unsettled, which the next load would refuse.
test("a game minute that ends the map run in a death is saved at once, settled", async () => {
  await onPage(async ({ root }) => {
    const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
    let now = 0;
    // The clock measures real time; this case moves it on by hand.
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: handClock(() => now),
    });
    try {
      const held = heldClient();
      await startPage(held);
      await held.answer("currentAccount", ACCOUNT);
      await held.answer("loadSavedGame", saveOf(lastMinute(), 4));
      await press(buttonNamed(root, "Wznów"));
      await settle();
      await held.answer("saveGame", { kind: "saved", revision: 5 });
      assert.deepEqual(waitingCalls(held), []);

      // Five real seconds at 1× are five game minutes; the first of them ends in the death.
      now += 5_000;
      await inAct(() => mock.timers.tick(200));
      await settle();
      const [sent] = argsOf(held, "saveGame");
      assert.equal(sent.basedOn, 5);
      assert.equal(sent.game.run.death.cause, "cold");
      assert.deepEqual(sent.game.run.deathSettlement, {
        kind: "resurrectionUsed",
      });
    } finally {
      Object.defineProperty(globalThis, "performance", saved);
    }
  });
});

/** Ala at generation 2 at the headquarters, her resurrection ready `left` ms after `at`. */
function renewing(at, left) {
  const state = withCharacter();
  const [ala] = state.team.characters;
  return {
    ...state,
    team: {
      ...state.team,
      characters: [{ ...ala, generation: 2, resurrectionReadyAtMs: at + left }],
    },
  };
}

// D-207, D-217. Catches a headquarters that draws the passing of real time only when the game state
// changes, one that rewrites a line that did not change, and a tick that makes a new state, which
// the saver would send. The screen is drawn in React, so the writes of the line are counted as the
// changes of its text the page's document records, and a tick that changes the text runs in act.
test("a clock tick rewrites the resurrection line of the headquarters at the clock's moment, writes a line only when it changed, and saves nothing", async () => {
  await onPage(async ({ root }) => {
    const T = 1_760_000_000_000;
    let current = T;
    const date = mock.method(Date, "now", () => current);
    try {
      const held = heldClient();
      await startPage(held);
      await held.answer("currentAccount", ACCOUNT);
      // 59 min 30 s left at the clock's start: rounded up, one whole hour.
      await held.answer("loadSavedGame", saveOf(renewing(T, 3_570_000), 4));
      const [line] = byClass(root, "team-member-resurrection");
      const warning = " — śmierć zabierze wprawę i wykupione stopnie";
      assert.equal(
        line.textContent,
        `Wskrzeszenie za 1 godz. 0 min czasu realnego${warning}`,
      );
      assert.ok(line.classList.contains("danger"));
      const [label] = byClass(root, "team-member-generation");
      assert.equal(label.textContent, "pokolenie 2");

      let recorded = 0;
      const watcher = new globalThis.window.MutationObserver((records) => {
        recorded += records.length;
      });
      watcher.observe(line, {
        characterData: true,
        childList: true,
        subtree: true,
      });
      /** The changes of the line's text since the last call; the observer reports them at the next await. */
      const writes = async () => {
        await settle();
        const count = recorded;
        recorded = 0;
        return count;
      };
      // 20 s on: 59 min 10 s left is 60 minutes still; the tick writes nothing.
      current = T + 20_000;
      await inAct(() => mock.timers.tick(200));
      assert.equal(await writes(), 0);
      // 31 s on: 58 min 59 s left rounds up to 59 minutes.
      current = T + 31_000;
      await inAct(() => mock.timers.tick(200));
      assert.equal(await writes(), 1);
      assert.equal(
        line.textContent,
        `Wskrzeszenie za 59 min czasu realnego${warning}`,
      );
      await inAct(() => mock.timers.tick(200));
      assert.equal(
        await writes(),
        0,
        "a tick in the same minute writes nothing",
      );
      // At the moment of readiness the line turns ready, within one tick, and loses `danger`.
      current = T + 3_570_000;
      await inAct(() => mock.timers.tick(200));
      assert.equal(line.textContent, "Wskrzeszenie gotowe");
      assert.ok(!line.classList.contains("danger"));
      assert.equal(await writes(), 1);
      watcher.disconnect();

      // Nothing was saved: the ticks made no new state, and the saver's own check finds none.
      mock.timers.tick(60_000);
      assert.deepEqual(waitingCalls(held), []);
    } finally {
      date.mock.restore();
    }
  });
});

// D-96. Catches a new game built when the saved game state cannot be had, a retry that asks for the
// save alone, and a 401 read as a failure. D-259: the card shows one form.
test("a failed or uncertain answer for the saved game state shows the warning with retry, which asks both again; no session shows the forms", async () => {
  const answers = {
    "no connection": NO_CONNECTION,
    "a server error": {
      ok: false,
      failure: {
        kind: "refused",
        status: 500,
        code: null,
        message: "Serwer nie mógł.",
      },
    },
    "an unexpected answer": {
      ok: false,
      failure: { kind: "unexpected", status: 200, message: "Serwer nie mógł." },
    },
  };
  for (const [name, answer] of Object.entries(answers)) {
    await onPage(async ({ root, intervals }) => {
      const held = heldClient();
      await startPage(held);
      await held.answer("currentAccount", ACCOUNT);
      await held.answer("loadSavedGame", answer);
      assert.deepEqual(
        shownAlerts(root).map((alert) => alert.textContent),
        [answer.failure.message],
        name,
      );
      assert.equal(gameShown(root), false, name);
      assert.equal(intervals.size, 0, name);
      assert.deepEqual(forms(root), {}, name);
      fire(buttonNamed(root, "Spróbuj ponownie"), "click");
      await settle();
      assert.deepEqual(waitingCalls(held), ["currentAccount"], name);
      await held.answer("currentAccount", ACCOUNT);
      assert.deepEqual(waitingCalls(held), ["loadSavedGame"], name);
      await held.answer("loadSavedGame", NO_SAVE);
      assert.equal(gameShown(root), true, name);
    });
  }
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SESSION);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
    assert.equal(gameShown(root), false);
  });
});

// D-96, D-206. Catches a refused save loaded in part, the sentence of another version
// for a damaged save, the sentence missing or under the confirmation notice, and the refused save
// left on the server to come back at the next sign-in.
test("a refused save starts a new game with its one-time sentence above it, after a confirmation notice, and saves the new game at once on the server's revision", async () => {
  const foreign = plain(withCharacter());
  foreign.team.characters[0].archetypeId = "nieznany";
  for (const [name, save, sentence] of [
    // D-206: a version older than the current one is another version.
    [
      "another version",
      saveOf(withCharacter(), 7, OLDER_VERSION),
      OTHER_VERSION,
    ],
    [
      "an archetype absent from the data",
      { ok: true, value: { version: VERSION, revision: 7, game: foreign } },
      OTHER_VERSION,
    ],
    [
      "a bad shape",
      { ok: true, value: { version: VERSION, revision: 7, game: {} } },
      DAMAGED,
    ],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      await startPage(held, fakeAddress(LINK));
      await held.answer("confirmEmail", CONFIRMED);
      await held.answer("currentAccount", ACCOUNT);
      await held.answer("loadSavedGame", save);
      const main = childrenOf(root).find((child) => child.localName === "main");
      const [confirmation, refusal, game] = main.children;
      assert.equal(
        confirmation.textContent,
        "Adres e-mail potwierdzony.",
        name,
      );
      assert.equal(refusal.textContent, sentence, name);
      assert.equal(refusal.classList.contains("page-notice"), true, name);
      // The game's element holds its screens (D-280).
      assert.equal(game.className, "game-view", name);
      assert.ok(shown(byClass(root, "headquarters")[0]), name);
      assert.deepEqual(
        argsOf(held, "saveGame"),
        [submission(newGame(), 7)],
        name,
      );
      await held.answer("saveGame", { kind: "saved", revision: 8 });
      assert.deepEqual(pageNotices(root), [sentence], name);
      assert.equal(saveLine(root), null, name);
    });
  }
});

// D-208: the line stands under the menu bar and not in the menu „Konto”. Catches the failure shown nowhere or only in the closed menu, no
// retry, and the sentence left after a save succeeds.
test("a failed save shows its line under the menu bar, outside the menu „Konto”, and a retry that succeeds clears it", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", UNCONFIRMED_ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    assert.equal(saveLine(root), null, "hidden while it says nothing");
    await press(buttonNamed(root, "4×"));
    await settle();
    await held.answer("saveGame", {
      kind: "failed",
      failure: NO_CONNECTION.failure,
    });
    const line = saveLine(root);
    assert.equal(
      line.textContent,
      "Nie udało się zapisać postępu. Gra spróbuje ponownie.",
    );
    assert.equal(line.classList.contains("form-warning"), true);
    const header = line.parentElement;
    assert.equal(header.localName, "header");
    const [bar] = childrenOf(header);
    assert.ok(bar.classList.contains("menu-bar-host"), "the bar stands first");
    assert.deepEqual(
      childrenOf(header).map((child) => child.classList.contains("save-line")),
      [false, true],
      "the line stands under the bar",
    );
    assert.equal(
      byClass(bar, "account-menu").some((menu) => menu.contains(line)),
      false,
      "the line is no part of the menu",
    );
    assert.equal(menuIsOpen(root), false, "it shows with the menu closed");

    mock.timers.tick(5_000);
    await settle();
    assert.deepEqual(argsOf(held, "saveGame"), [
      submission({ ...passing(), paused: true, pace: 4 }, 4),
    ]);
    await held.answer("saveGame", { kind: "saved", revision: 5 });
    assert.equal(saveLine(root), null);
  });
});

// D-209. Catches the lost game kept on screen or running, the server's save not asked
// for, the sentence missing or not leaving at the first successful save, and a refused save on that
// path read as a conflict.
test("a conflict drops the game, asks for the server's save and builds from it with its sentence in the header until a save succeeds; a refused one there starts anew", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    await press(buttonNamed(root, "4×"));
    await settle();
    await held.answer("saveGame", { kind: "conflict" });
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0);
    assert.deepEqual(waitingCalls(held), ["loadSavedGame"]);
    assert.ok(shown(byClass(root, "session-check-text")[0]));
    assertNameAloneOnBar(root, "no game stands");

    await held.answer("loadSavedGame", saveOf({ ...passing(), pace: 2 }, 6));
    assert.equal(gameShown(root), true);
    assert.ok(shown(buttonNamed(root, "Wznów")));
    assert.ok(buttonNamed(root, "2×").classList.contains("selected"));
    assert.equal(saveLine(root).textContent, CONFLICT);
    assert.deepEqual(
      waitingCalls(held),
      [],
      "the loaded game waits for an act",
    );

    await press(buttonNamed(root, "8×"));
    await settle();
    assert.deepEqual(argsOf(held, "saveGame"), [
      submission({ ...passing(), paused: true, pace: 8 }, 6),
    ]);
    await held.answer("saveGame", { kind: "saved", revision: 7 });
    assert.equal(saveLine(root), null);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    await press(buttonNamed(root, "4×"));
    await settle();
    await held.answer("saveGame", { kind: "conflict" });
    // D-206: a version older than the current one is another version.
    await held.answer(
      "loadSavedGame",
      saveOf(withCharacter(), 6, OLDER_VERSION),
    );
    assert.deepEqual(pageNotices(root), [OTHER_VERSION]);
    assert.equal(saveLine(root), null);
    assert.deepEqual(argsOf(held, "saveGame"), [submission(newGame(), 6)]);
  });
});

/** The page signed in with a loaded map run, „Wyloguj” of the open menu clicked; returns the button. */
async function loggingOutPage(held) {
  await startPage(held);
  await held.answer("currentAccount", ACCOUNT);
  await held.answer("loadSavedGame", saveOf(passing(), 4));
  const logout = await logoutOf(pageDocument().body);
  await press(logout);
  assert.equal(logout.textContent, "Wylogowywanie…");
  assert.deepEqual(argsOf(held, "saveGame"), [
    submission({ ...passing(), paused: true }, 4),
  ]);
  return logout;
}

// D-97. Catches a session ended after a failed save, a logout held back by a refusal that is for
// good, the update sentence missing, and the expiry path skipped at logout. D-259, D-261: one form
// stands, and the sentence stands in the card, in `confirmation-notice`.
test("„Wyloguj” saves first and goes on, stays or ends each way its save's outcome gives", async () => {
  const outcomes = [
    ["saved", { kind: "saved", revision: 5 }, null],
    ["a conflict", { kind: "conflict" }, null],
    ["too large", { kind: "too-large" }, null],
    ["outdated", { kind: "outdated" }, OUTDATED],
  ];
  for (const [name, outcome, sentence] of outcomes) {
    await onPage(async ({ root, intervals }) => {
      const held = heldClient();
      await loggingOutPage(held);
      await held.answer("saveGame", outcome);
      assert.deepEqual(waitingCalls(held), ["logout"], name);
      assert.equal(gameShown(root), true, `${name}: the game stays meanwhile`);
      await held.answer("logout", { ok: true, value: null });
      assert.equal(gameShown(root), false, name);
      assert.equal(intervals.size, 0, name);
      assert.deepEqual(
        noticeTexts(root),
        sentence === null ? [] : [sentence],
        name,
      );
      assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"], name);
    });
  }

  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const logout = await loggingOutPage(held);
    await held.answer("saveGame", {
      kind: "failed",
      failure: NO_CONNECTION.failure,
    });
    assert.deepEqual(waitingCalls(held), [], "no logout after a failed save");
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, GAME_INTERVALS);
    assert.equal(
      saveLine(root).textContent,
      "Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.",
    );
    assert.equal(logout.textContent, "Wyloguj");
    assert.equal(logout.disabled, false);
    assert.equal(pageDocument().activeElement, logout);
    // D-97, D-208: the sentence of the failed save stands under the bar, not in the menu „Konto”.
    assert.equal(menuIsOpen(root), true);
    assert.deepEqual(menuSentences(root), []);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    await loggingOutPage(held);
    await held.answer("saveGame", { kind: "signed-out" });
    assert.deepEqual(waitingCalls(held), [], "no logout without a session");
    assert.deepEqual(noticeTexts(root), [EXPIRED]);
    await signIn(held, ACCOUNT);
    assert.deepEqual(argsOf(held, "saveGame"), [
      submission({ ...passing(), paused: true }, 4),
    ]);
  });
});

// D-97, D-210. Catches a stopped tab trying to save before logout, and the forms without the
// sentence of the update. D-261: the sentence stands in the card.
test("a tab that stopped saving as outdated logs out without a save and shows the update sentence above the form in the card", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    await press(buttonNamed(root, "4×"));
    await settle();
    await held.answer("saveGame", { kind: "outdated" });
    assert.equal(gameShown(root), true, "the game stays");
    assert.equal(saveLine(root).textContent, OUTDATED);

    await press(await logoutOf(root));
    await settle();
    assert.deepEqual(waitingCalls(held), ["logout"]);
    await held.answer("logout", { ok: true, value: null });
    assert.deepEqual(noticeTexts(root), [OUTDATED]);
    assertAboveTheForm(root, noticeOf(root)[0]);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
  });
});

// D-97, D-211. Catches the expiry path started while the logout's request is under way, and a
// logout that does not happen leaving the save's 401 unanswered. D-261: the sentence stands in the
// card.
test("a save that finds no session while the logout's request is under way waits for its answer: a logout ends it, an uncertain one then takes the expiry path", async () => {
  for (const [name, answer] of [
    ["a confirmed logout", { ok: true, value: null }],
    ["an uncertain logout", NO_CONNECTION],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      await loggingOutPage(held);
      await held.answer("saveGame", { kind: "saved", revision: 5 });
      assert.deepEqual(waitingCalls(held), ["logout"], name);
      // The player acts while the server ends the session; that save finds none. The click lies
      // outside the menu „Konto”, which stood open, so it closes the menu too, and React sees it.
      await press(buttonNamed(root, "8×"));
      assert.equal(
        menuIsOpen(root),
        false,
        `${name}: the click outside closes it`,
      );
      assert.deepEqual(argsOf(held, "saveGame"), [
        submission({ ...passing(), paused: true, pace: 8 }, 5),
      ]);
      await held.answer("saveGame", { kind: "signed-out" });
      assert.equal(gameShown(root), true, `${name}: the logout decides`);
      assert.deepEqual(forms(root), {}, name);

      await held.answer("logout", answer);
      assert.equal(gameShown(root), false, name);
      if (answer.ok) {
        assert.deepEqual(noticeTexts(root), [], name);
        await signIn(held, ACCOUNT);
        assert.deepEqual(waitingCalls(held), ["loadSavedGame"], name);
      } else {
        assert.deepEqual(noticeTexts(root), [EXPIRED], name);
        await signIn(held, ACCOUNT);
        assert.deepEqual(
          argsOf(held, "saveGame"),
          [submission({ ...passing(), paused: true, pace: 8 }, 5)],
          name,
        );
      }
    });
  }
});

// --- the report on earning loops in the headquarters ------------------------------------------
// D-246, D-42.

/** The section of the report in the headquarters under `root`, or undefined. */
const reportSection = (root) => {
  const section = byClass(root, "away-report")[0];
  assert.ok(section, "the section of the report is built");
  return section;
};

/** Ala and Ola with a report: Ala's loop went on for 5 minutes, Ola's stopped in the catch-up. */
function reported(rest = {}) {
  const made = createCharacter(withCharacter(), "Ola").state;
  // Ola's loop stopped in a death that gave her generation 2, as the report's stop says.
  const base = {
    ...made,
    team: {
      ...made.team,
      characters: made.team.characters.map((character) =>
        character.id === 2 ? { ...character, generation: 2 } : character,
      ),
    },
  };
  return {
    ...base,
    awayReport: [
      {
        characterId: 1,
        minutes: 5,
        chest: { stick: 3 },
        resurrectionUsed: false,
        stop: null,
      },
      {
        characterId: 2,
        minutes: 2,
        chest: {},
        resurrectionUsed: false,
        stop: { generation: 2, away: true },
      },
    ],
    ...rest,
  };
}

// Catches a section missing, placed under „Drużyna”, or with the lines in the order of the data.
test("a game built from a state with a report shows the section above „Drużyna”, the stopped line first", async () => {
  await onPage(async ({ root }) => {
    const { view } = await viewOf(reported());
    const section = reportSection(root);
    assert.ok(shown(section));
    assert.equal(
      section.children[0].textContent,
      "Gdy cię nie było",
      "the title",
    );
    assert.deepEqual(
      byClass(section, "away-report-line").map((line) => line.textContent),
      [
        "Ola: pętla stanęła po 2 min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
        "Ala: 5 min · skrzynka: patyk +3",
      ],
    );
    assert.ok(
      byClass(section, "away-report-line")[0].classList.contains("danger"),
    );
    assert.ok(
      !byClass(section, "away-report-line")[1].classList.contains("danger"),
    );
    const [headquarters] = byClass(root, "headquarters");
    const sections = childrenOf(headquarters).filter((child) =>
      child.classList.contains("headquarters-section"),
    );
    assert.equal(sections[0], section, "above the team's section");
    assert.equal(sections[1].children[0].textContent, "Drużyna");
    await inAct(() => view.dispose());
  });
});

// Catches the title of a section that holds only stops in the open game (D-246) and a full chest
// that is not said, or said for a chest that is not full.
test("only stops in the open game give „Pętle, które stanęły”, and a full chest adds its sentence", async () => {
  await onPage(async ({ root }) => {
    const base = reported();
    const { view } = await viewOf({
      ...base,
      awayReport: [
        {
          characterId: 2,
          minutes: 0,
          chest: {},
          resurrectionUsed: false,
          stop: { generation: 3, away: false },
        },
      ],
      team: { ...base.team, chest: { pieces: { stick: 60 } } },
    });
    const section = reportSection(root);
    assert.equal(section.children[0].textContent, "Pętle, które stanęły");
    assert.equal(
      byClass(section, "away-report-line")[0].textContent,
      "Ola: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 3.",
    );
    const [full] = byClass(section, "away-report-full");
    assert.ok(shown(full));
    assert.equal(full.textContent, "Skrzynka jest pełna.");
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root }) => {
    const { view } = await viewOf(reported());
    assert.ok(!shown(byClass(reportSection(root), "away-report-full")[0]));
    await inAct(() => view.dispose());
  });
});

test("a state with an empty report shows no section", async () => {
  await onPage(async ({ root }) => {
    const { view } = await viewOf(withCharacter());
    assert.ok(!shown(reportSection(root)));
    await inAct(() => view.dispose());
  });
});

// Catches a „Zamknij” that closes one line, one that is not saved, and one that leaves focus on the
// page body once the button is gone (D-42).
test("„Zamknij” closes the whole section at once, saves, and focus stays on the screen", async () => {
  await onPage(async ({ root }) => {
    const { view, held } = await viewOf(reported());
    const close = buttonNamed(reportSection(root), "Zamknij");
    close.focus();
    assert.equal(pageDocument().activeElement, close);
    await press(close);
    assert.ok(!shown(reportSection(root)));
    assert.deepEqual(waitingCalls(held), ["saveGame"]);
    assert.deepEqual(argsOf(held, "saveGame")[0].game.awayReport, []);
    await settle();
    const focused = pageDocument().activeElement;
    assert.notEqual(
      focused,
      pageDocument().body,
      "focus did not fall to the body",
    );
    assert.ok(shown(focused), "focus is on something on the screen");
    assert.ok(byClass(root, "headquarters")[0].contains(focused));
    await inAct(() => view.dispose());
  });
});

// D-207, D-189, D-246: „Odbierz” pays the practice waiting at once and the game saves it, the loop
// and its map run going on stay, and the line stays with its minutes while the part about practice
// and the button are gone.
test("„Odbierz” pays the practice waiting, saves at once, leaves the loop and the line, and the button goes", async () => {
  await onPage(async ({ root }) => {
    const base = alaLoopingOlaFree();
    const state = {
      ...base,
      loops: { 1: { ...base.loops[1], practice: { eating: 4 } } },
      awayReport: [
        {
          characterId: 1,
          minutes: 5,
          chest: {},
          resurrectionUsed: false,
          stop: null,
        },
      ],
    };
    const eatingBefore = state.team.characters[0].skills.eating.practice;
    const { view, held } = await viewOf(state);
    const [line] = byClass(reportSection(root), "away-report-text");
    assert.equal(
      line.textContent,
      "Ala: 5 min · wprawa do odebrania: Jedzenie +4",
    );
    await press(buttonLabelled(reportSection(root), "Odbierz: Ala"));
    assert.deepEqual(waitingCalls(held), ["saveGame"]);
    const saved = argsOf(held, "saveGame")[0].game;
    assert.equal(
      saved.team.characters[0].skills.eating.practice,
      eatingBefore + 4,
    );
    assert.deepEqual(saved.loops[1].practice, {});
    assert.deepEqual(saved.loops[1].run.minute, state.loops[1].run.minute);
    assert.equal(saved.awayReport.length, 1);
    assert.equal(
      byClass(reportSection(root), "away-report-text")[0].textContent,
      "Ala: 5 min",
    );
    assert.ok(
      !all(reportSection(root)).some(
        (element) =>
          element.localName === "button" && element.textContent === "Odbierz",
      ),
      "no button „Odbierz” stands",
    );
    assert.ok(shown(byClass(reportSection(root), "away-report-line")[0]));
    await inAct(() => view.dispose());
  });
});

// Catches a report that is not in the game state: it must come back from a reload, and what the
// reload of a closed report returns must not show it again.
test("the report survives a reload, and a closed report stays closed after one", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(reported(), 3));
    assert.ok(shown(reportSection(root)));
    await press(buttonNamed(reportSection(root), "Zamknij"));
    const [sent] = argsOf(held, "saveGame");
    assert.deepEqual(sent.game.awayReport, []);
    const stored = { ok: true, value: { ...sent, revision: 4 } };
    await held.answer("saveGame", { kind: "saved", revision: 4 });

    // A second page loads what the first one saved.
    pageDocument().body.replaceChildren();
    const again = heldClient();
    await startPage(again);
    await again.answer("currentAccount", ACCOUNT);
    await again.answer("loadSavedGame", stored);
    assert.ok(gameShown(root));
    assert.ok(!shown(reportSection(root)));
  });
});

// D-246, D-53: „Zakończ” leads to the screen Postać, so the report is read on reaching Siedziba, not
// after „Zakończ”. Catches the report drawn
// on the screen of a manual map run or on Postać, and one not shown when Siedziba is reached.
test("a manual map run hides the report with Siedziba, „Zakończ” opens Postać without it, and Siedziba shows it on being reached", async () => {
  await onPage(async ({ root }) => {
    const address = fakeAddress();
    const { view } = await viewOf(
      { ...reported(), run: passing().run },
      address,
    );
    assert.equal(shownScreen(root), "run");
    assert.ok(!shown(reportSection(root)));
    await press(buttonNamed(root, "Zakończ"));
    assert.equal(shownScreen(root), "character");
    assert.ok(!shown(reportSection(root)));
    await follow(address, "#/");
    assert.equal(shownScreen(root), "headquarters");
    assert.ok(shown(reportSection(root)));
    await inAct(() => view.dispose());
  });
});

// --- the screens by address -----------------------------------------------------------------------
// D-96, D-212, D-225, D-280, D-281, D-283, D-284, D-286. The address is the test's own, so these cases
// prove what the page reads and writes of it and which screen it shows, never the browser's history
// (D-88); the real `browserAddress` has its own cases below, on jsdom's history.

/** The one screen of the game that shows, by what stands on it; null while none does. */
function shownScreen(root) {
  const shows = (name) => {
    const element = byClass(root, name)[0];
    return element !== undefined && shown(element);
  };
  if (shows("character-screen")) return "character";
  if (shows("maps-screen")) return "maps";
  if (shows("run-screen")) return "run";
  if (shows("headquarters")) return "headquarters";
  if (shows("programs-screen")) return "programs";
  return null;
}

/** The items of the bar as `[text, href, aria-current]`, in the order they stand. */
const barItems = (root) =>
  byClass(root, "menu-bar-item").map((item) => [
    item.textContent,
    item.getAttribute("href"),
    item.getAttribute("aria-current"),
  ]);

/** The item „Wróć do przejścia …” of the bar as `[text, href]`, or null where none stands. */
function returnItem(root) {
  const item = byClass(root, "menu-bar-item").find((candidate) =>
    candidate.textContent.startsWith("Wróć do przejścia"),
  );
  return item ? [item.textContent, item.getAttribute("href")] : null;
}

// D-311, D-122: the clock stands in the header of the screen, in React, as „Minuta {game minute}”, with „ (pauza)” at a pause.
const clockTextOf = (root) => byClass(root, "run-header-clock")[0]?.textContent;

/** A click on the link to `hash`, inside act: the bar redraws at a change of screen. */
const follow = (address, hash) => inAct(() => address.follow(hash));
const goBack = (address) => inAct(() => address.back());
const goForward = (address) => inAct(() => address.forward());

/** Runs `body` with the clock reading no real time, so a run going on passes no game minute. */
async function withStillClock(body) {
  const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
  Object.defineProperty(globalThis, "performance", {
    configurable: true,
    value: handClock(() => 0),
  });
  try {
    await body();
  } finally {
    Object.defineProperty(globalThis, "performance", saved);
  }
}

/** The page signed in by a reload at `hash`, with `game` as the account's save at revision 4. */
async function reloadedAt(held, hash, game) {
  const address = fakeAddress(hash);
  await startPage(held, address);
  await held.answer("currentAccount", ACCOUNT);
  await held.answer("loadSavedGame", saveOf(game, 4));
  return address;
}

/** Ala with the forest run going on (unpaused once loaded), a second program and a second character. */
const fullGame = () => {
  const team = createCharacter(twoPrograms(), "Ola").state;
  return send(team, { mapId: "forest", characterId: 1, programId: 1 }, 0).state;
};

const RUN_ADDRESS = "#/postac/1/przejscie";

// D-96, D-212, D-283. Catches the first screen read from the address after the
// sign-in form (another account in the same tab would land at the previous player's address), the
// manual map run of the save not opened after a sign-in or a reload with no fragment, and a reload
// at an address taken to the map run.
test("the first screen of each entry: the sign-in form and a reload with no fragment lead to Siedziba or to the save's map run, a reload at an address to its screen", async () => {
  // After the sign-in form, whatever the tab's address was.
  for (const [name, game, screen, hash] of [
    ["a save with a map run going on", passing(), "run", RUN_ADDRESS],
    ["a save with a map run ended", ended(), "run", RUN_ADDRESS],
    ["a save with no map run", withCharacter(), "headquarters", "#/"],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = fakeAddress("#/programy");
      await startPage(held, address);
      await held.answer("currentAccount", NO_SESSION);
      await signIn(held, ACCOUNT);
      await held.answer("loadSavedGame", saveOf(game, 4));
      assert.equal(shownScreen(root), screen, name);
      assert.equal(address.hash(), hash, `${name}: the address is written`);
      assert.equal(address.entries.length, 1, `${name}: with no new entry`);
      if (screen === "run")
        assert.ok(shown(buttonNamed(root, "Restart")), `${name}: its screen`);
    });
  }
  // At a reload with no fragment.
  for (const [name, game, screen, hash] of [
    ["a save with a map run going on", passing(), "run", RUN_ADDRESS],
    ["a save with no map run", withCharacter(), "headquarters", "#/"],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = await reloadedAt(held, "", game);
      assert.equal(shownScreen(root), screen, name);
      assert.equal(address.hash(), hash, name);
      assert.equal(address.entries.length, 1, name);
    });
  }
  // At a reload at an address, while the save holds a map run: the address wins (D-96).
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/programy", passing());
    assert.equal(shownScreen(root), "programs");
    assert.equal(address.hash(), "#/programy");
    assert.ok(
      !shown(buttonNamed(root, "Wznów")),
      "the map run's screen is not shown",
    );
  });
});

// D-96: „a reload at `#/postac/2` while the
// saved game state holds a manual map run staying on the screen Postać of character 2”. Catches
// the save's map run winning over the address, and the screen Postać not built for the address.
test("a reload at #/postac/1 while the save holds a map run opens the screen Postać of Ala, with the bar marking Siedziba and „Wróć do przejścia”", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/postac/1", passing());
    assert.equal(shownScreen(root), "character");
    assert.equal(byClass(root, "character-screen-name")[0]?.textContent, "Ala");
    assert.equal(address.hash(), "#/postac/1");
    assert.equal(address.entries.length, 1);
    assert.deepEqual(barItems(root), [
      ["Siedziba", "#/", "page"],
      ["Mapy", "#/mapy", null],
      ["Programy", "#/programy", null],
      ["Wróć do przejścia · Las · minuta 0", RUN_ADDRESS, null],
    ]);
    assert.deepEqual(waitingCalls(held), [], "nothing is saved by a reload");
  });
});

// D-281. Catches an address of the five that opens another screen, or one the page
// rewrites although it names an existing screen.
test("a reload at each of the seven addresses opens its screen and leaves the address as it is", async () => {
  for (const [hash, screen] of [
    ["#/", "headquarters"],
    ["#/postac/1", "character"],
    ["#/mapy", "maps"],
    ["#/mapy/forest", "maps"],
    ["#/programy", "programs"],
    ["#/programy/2", "programs"],
    [RUN_ADDRESS, "run"],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = await reloadedAt(held, hash, fullGame());
      assert.equal(shownScreen(root), screen, hash);
      assert.equal(address.hash(), hash, hash);
      assert.equal(address.entries.length, 1, hash);
    });
  }
});

// D-281, D-331. Catches a reload that leaves Mapy for another
// screen, a map picked at `#/mapy` before the player picks one, a card that is not the map the
// address names, and the name of a character in „Kto idzie” that is no link to its screen Postać.
test("a reload at #/mapy/forest stays on Mapy with Las picked, #/mapy picks none, and the name of a character is a link to its screen Postać", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/mapy/forest", fullGame());
    assert.equal(shownScreen(root), "maps");
    assert.deepEqual(address.entries, ["#/mapy/forest"], "no new entry");
    assert.equal(byClass(root, "maps-card-name")[0].textContent, "Las");
    assert.deepEqual(
      byClass(root, "maps-list-item").map((item) => [
        item.textContent,
        item.getAttribute("aria-current"),
      ]),
      [
        ["Skraj lasurozwiązana", null],
        ["Las", "page"],
      ],
    );
    const names = byClass(root, "maps-who-name");
    assert.deepEqual(
      names.map((name) => [name.textContent, name.getAttribute("href")]),
      [
        ["Ala", "#/postac/1"],
        ["Ola", "#/postac/2"],
      ],
    );
    // The link of a name leads on: the page opens the screen the link names.
    await follow(address, names[0].getAttribute("href"));
    assert.equal(shownScreen(root), "character");
    assert.equal(byClass(root, "maps-screen-host").length, 0);
  });
  await onPage(async ({ root }) => {
    const held = heldClient();
    await reloadedAt(held, "#/mapy", fullGame());
    assert.equal(shownScreen(root), "maps");
    assert.equal(byClass(root, "maps-card").length, 0, "no card before a pick");
    assert.equal(
      byClass(root, "maps-card-empty")[0].textContent,
      "Wybierz mapę z listy.",
    );
  });
});

// D-280, D-281 (the browser's back and forward). Catches a link that opens no screen, a
// back or forward that leaves the screen where it was, and a mark of the bar that lags behind.
test("the items of the bar lead to their screens, and back and forward walk the screens the player visited, the bar marking each", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/", withCharacter());
    const marked = () =>
      barItems(root)
        .filter(([, , current]) => current === "page")
        .map(([text]) => text);
    assert.equal(shownScreen(root), "headquarters");
    assert.deepEqual(marked(), ["Siedziba"]);

    // The item „Mapy” leads to #/mapy and marks Mapy there and under the address of a map.
    const maps = byClass(root, "menu-bar-item").find(
      (item) => item.textContent === "Mapy",
    );
    assert.ok(maps, "the bar holds „Mapy”");
    await follow(address, maps.getAttribute("href"));
    assert.equal(address.hash(), "#/mapy");
    assert.equal(shownScreen(root), "maps");
    assert.deepEqual(marked(), ["Mapy"]);
    assert.equal(
      pageDocument().activeElement,
      byClass(root, "maps-screen-host")[0],
      "with focus on nothing the screen takes it",
    );
    await follow(address, "#/mapy/forest");
    assert.equal(shownScreen(root), "maps");
    assert.deepEqual(marked(), ["Mapy"]);
    assert.equal(byClass(root, "maps-card-name")[0].textContent, "Las");
    await goBack(address);
    await goBack(address);
    assert.equal(shownScreen(root), "headquarters");
    await goForward(address);
    await goForward(address);
    assert.equal(address.hash(), "#/mapy/forest");
    await follow(address, "#/");
    assert.deepEqual(marked(), ["Siedziba"]);

    await follow(address, "#/programy");
    assert.equal(shownScreen(root), "programs");
    assert.deepEqual(marked(), ["Programy"]);
    assert.ok(
      !shown(byClass(root, "headquarters")[0]),
      "Siedziba is hidden while Programy shows",
    );
    // With focus on nothing — a link that left the bar, the browser's button — the screen takes it.
    assert.equal(
      pageDocument().activeElement,
      byClass(root, "programs-screen")[0],
    );

    await follow(address, "#/postac/1");
    assert.equal(shownScreen(root), "character");
    assert.deepEqual(marked(), ["Siedziba"], "Postać marks Siedziba");

    await goBack(address);
    assert.equal(shownScreen(root), "programs");
    assert.deepEqual(marked(), ["Programy"]);
    await goBack(address);
    assert.equal(shownScreen(root), "headquarters");
    assert.deepEqual(marked(), ["Siedziba"]);
    assert.equal(
      pageDocument().activeElement,
      byClass(root, "headquarters-screen")[0],
    );
    await goForward(address);
    assert.equal(shownScreen(root), "programs");
    assert.deepEqual(address.entries, [
      "#/",
      "#/mapy",
      "#/mapy/forest",
      "#/",
      "#/programy",
      "#/postac/1",
    ]);
    assert.deepEqual(
      waitingCalls(held),
      [],
      "a change of screen saves nothing",
    );
  });
});

// D-281, trust: the fragment is the player's input. Catches a crafted fragment that
// throws, opens no screen, or stays in the address; and a replacement that adds an entry of the
// history. The fragments of the emailed links are no row here since D-352: with the game standing
// they reload the page (the case "a fragment of an emailed link that appears in the address of an
// open game reloads the page…"), and a link's fragment behind a screen's address stays one.
test("an address that leads to no existing screen opens the nearest one and has its fragment replaced, with no new entry, at a reload and through a link alike", async () => {
  const CRAFTED = [
    ["a character number with a letter", "#/postac/x", "headquarters", "#/"],
    ["a program number below one", "#/programy/-1", "headquarters", "#/"],
    ["a program nobody has", "#/programy/9", "programs", "#/programy"],
    [
      "a map run of a character with none",
      RUN_ADDRESS,
      "character",
      "#/postac/1",
    ],
    [
      "a map run of a character nobody has",
      "#/postac/7/przejscie",
      "headquarters",
      "#/",
    ],
    [
      "a map before its opener is solved",
      "#/mapy/forestDeep",
      "headquarters",
      "#/",
    ],
    ["a map the data lacks", "#/mapy/nowhere", "headquarters", "#/"],
    ["a long fragment", `#/postac/${"1".repeat(5000)}`, "headquarters", "#/"],
    [
      "a screen's address with a link's fragment behind it",
      `#/postac/1${LINK}`,
      "headquarters",
      "#/",
    ],
  ];
  for (const [name, hash, screen, nearest] of CRAFTED) {
    // At a reload.
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = await reloadedAt(held, hash, twoPrograms());
      assert.equal(shownScreen(root), screen, name);
      assert.deepEqual(address.entries, [nearest], name);
    });
    // Through a link while the game stands.
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = await reloadedAt(held, "#/programy", twoPrograms());
      await follow(address, hash);
      assert.equal(shownScreen(root), screen, name);
      assert.deepEqual(address.entries, ["#/programy", nearest], name);
      assert.equal(address.index, 1, name);
    });
  }
});

// D-53, D-280, D-329. Catches a send that leaves the player on the screen
// Mapy, „Zakończ” that leads to Siedziba, either without an entry of the history, a screen of Mapy
// left standing under the map run, and the back button after „Zakończ” landing on a screen of a map
// run that is gone.
test("a send leads to the screen of the map run and „Zakończ” to the screen Postać of that character, each with a new entry, and back after „Zakończ” lands on Postać", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/mapy/forest", twoPrograms());
    await press(buttonLabelled(root, "Wejdź: Ala, mapa Las"));
    assert.equal(shownScreen(root), "run");
    assert.deepEqual(address.entries, ["#/mapy/forest", RUN_ADDRESS]);
    assert.equal(
      byClass(root, "maps-screen-host").length,
      0,
      "the screen Mapy is gone",
    );
    // „Wejdź” left with the screen Mapy, so the screen opened takes the keyboard's focus.
    assert.equal(pageDocument().activeElement, byClass(root, "run-screen")[0]);
    assert.equal(
      returnItem(root),
      null,
      "no „Wróć do przejścia” on its screen",
    );
    assert.deepEqual(
      barItems(root).map(([, , current]) => current),
      [null, null, null],
      "no item marked on the screen of a map run",
    );
    await held.answer("saveGame", { kind: "saved", revision: 5 });

    await press(buttonNamed(root, "Zakończ"));
    assert.equal(shownScreen(root), "character");
    assert.equal(byClass(root, "character-screen-name")[0]?.textContent, "Ala");
    assert.deepEqual(address.entries, [
      "#/mapy/forest",
      RUN_ADDRESS,
      "#/postac/1",
    ]);
    assert.equal(
      pageDocument().activeElement,
      byClass(root, "character-screen-host")[0],
      "„Zakończ” left with its screen, so Postać takes the focus",
    );
    assert.equal(returnItem(root), null, "the map run is gone");
    await held.answer("saveGame", { kind: "saved", revision: 6 });

    await goBack(address);
    assert.equal(shownScreen(root), "character");
    assert.deepEqual(
      address.entries,
      ["#/mapy/forest", "#/postac/1", "#/postac/1"],
      "the entry of the map run gone is replaced with the nearest screen",
    );
    assert.deepEqual(waitingCalls(held), []);
  });
});

// D-280, D-330. Catches a way from Siedziba to the first
// map run that takes more than three clicks, a first click that is no item of the bar, a row of the
// list that leads elsewhere than to its map, and „Wejdź” that does not send the one character with
// the program its list shows. A click on a link is the address changing, which the case makes with
// `follow` on the address the link itself holds.
test("a player with one character, who has picked nothing, goes from Siedziba through „Mapy”, the row of Skraj lasu and „Wejdź” to the screen of the map run in three clicks", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/", newWithCharacter());
    assert.equal(shownScreen(root), "headquarters");
    assert.deepEqual(
      tagged(byClass(root, "headquarters")[0], "button")
        .filter(shown)
        .map((button) => button.textContent),
      ["Załóż"],
      "no button of Siedziba leads to the maps or sends",
    );

    // First click: the item „Mapy” of the bar.
    const bar = byClass(root, "menu-bar-item").find(
      (item) => item.textContent === "Mapy",
    );
    await follow(address, bar.getAttribute("href"));
    assert.equal(shownScreen(root), "maps");
    assert.equal(
      byClass(root, "maps-card-empty")[0].textContent,
      "Wybierz mapę z listy.",
    );

    // Second click: the row of Skraj lasu, the one map the list holds.
    const rows = byClass(root, "maps-list-item");
    assert.deepEqual(
      rows.map((item) => item.textContent),
      ["Skraj lasu"],
    );
    await follow(address, rows[0].getAttribute("href"));
    assert.equal(byClass(root, "maps-card-name")[0].textContent, "Skraj lasu");

    // Third click: „Wejdź” at the character.
    await press(buttonLabelled(root, "Wejdź: Ala, mapa Skraj lasu"));
    assert.equal(shownScreen(root), "run");
    assert.equal(clockTextOf(root), "Minuta 0");
    assert.deepEqual(address.entries, [
      "#/",
      "#/mapy",
      "#/mapy/forestEdge",
      RUN_ADDRESS,
    ]);
    const [sent] = argsOf(held, "saveGame");
    assert.equal(sent.game.run.mapId, "forestEdge");
    assert.equal(sent.game.run.character.id, 1);
    assert.equal(sent.game.run.copy.programId, 1);
  });
});

// D-283, D-284, D-207. Catches a map run
// that passes its game minutes while the player stands on another screen, a leave that pauses
// without saving, a leave of a paused or ended map run that saves although nothing changed, and a
// return that resumes the map run by itself.
test("leaving the screen of a map run that goes on pauses it as „Pauza” does and saves at once; a return resumes nothing, and leaving a paused or an ended map run saves nothing", async () => {
  await withStillClock(async () => {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = await reloadedAt(held, "", passing());
      // The loaded map run came back paused (D-212); the player goes on.
      await press(buttonNamed(root, "Wznów"));
      await held.answer("saveGame", { kind: "saved", revision: 5 });
      assert.doesNotMatch(clockTextOf(root), / \(pauza\)$/);

      await follow(address, "#/");
      assert.equal(shownScreen(root), "headquarters");
      assert.deepEqual(waitingCalls(held), ["saveGame"], "the pause is saved");
      assert.deepEqual(argsOf(held, "saveGame"), [
        submission({ ...passing(), paused: true }, 5),
      ]);
      await held.answer("saveGame", { kind: "saved", revision: 6 });
      assert.deepEqual(returnItem(root), [
        "Wróć do przejścia · Las · minuta 0",
        RUN_ADDRESS,
      ]);

      // Real time passes: the map run stands at its minute, since it is paused.
      mock.timers.tick(5_000);
      await settle();
      await goBack(address);
      assert.equal(shownScreen(root), "run");
      assert.equal(clockTextOf(root), "Minuta 0 (pauza)");
      assert.ok(shown(buttonNamed(root, "Wznów")), "it waits for „Wznów”");
      assert.deepEqual(waitingCalls(held), [], "the return changes nothing");

      // The own-work check: the forward button leaves the screen as a link does, and pauses too.
      await press(buttonNamed(root, "Wznów"));
      await held.answer("saveGame", { kind: "saved", revision: 7 });
      await goForward(address);
      assert.equal(shownScreen(root), "headquarters");
      assert.deepEqual(argsOf(held, "saveGame"), [
        submission({ ...passing(), paused: true }, 7),
      ]);
    });
  });

  for (const [name, game] of [
    ["a paused map run", passing()],
    ["a map run ended in a death", ended()],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = await reloadedAt(held, "", game);
      assert.equal(shownScreen(root), "run", name);
      await follow(address, "#/programy");
      assert.equal(shownScreen(root), "programs", name);
      assert.deepEqual(waitingCalls(held), [], `${name}: nothing changed`);
      assert.ok(returnItem(root), `${name}: „Wróć do przejścia” stands`);
    });
  }
});

// D-283's rejected way: a logout or an expiry leaves the game with no change of screen
// and pauses nothing. Catches a logout's save that pauses the map run, and a listener on the
// address left behind by a game that has gone.
test("„Wyloguj” on the screen of a map run going on saves it as it goes and pauses nothing, and the game that left listens to the address no more", async () => {
  await withStillClock(async () => {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const address = await reloadedAt(held, "", passing());
      await press(buttonNamed(root, "Wznów"));
      await held.answer("saveGame", { kind: "saved", revision: 5 });
      assert.equal(address.listening(), 1, "the game listens to the address");
      await press(await logoutOf(root));
      assert.deepEqual(argsOf(held, "saveGame"), [submission(passing(), 5)]);
      await held.answer("saveGame", { kind: "saved", revision: 6 });
      await held.answer("logout", { ok: true, value: null });
      assert.equal(gameShown(root), false);
      assert.equal(address.listening(), 0);
    });
  });
});

// D-225, D-96, D-281. Catches „Anuluj” or a refused link of a signed-in player
// leading to the save's map run, and a confirmation link doing so.
test("after an emailed link — a confirmation, „Anuluj” of „Ustaw nowe hasło” or a refused link — a signed-in player opens Siedziba, whatever the save holds", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(LINK);
    await startPage(held, address);
    await held.answer("confirmEmail", CONFIRMED);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    assert.equal(shownScreen(root), "headquarters");
    assert.deepEqual(noticeTexts(root), ["Adres e-mail potwierdzony."]);
    assert.equal(address.hash(), "#/");
    assert.ok(returnItem(root), "the way back to the map run stands");
  });
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(RESET_LINK);
    await startPage(held, address);
    await press(buttonNamed(root, "Anuluj"));
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    assert.equal(shownScreen(root), "headquarters");
    assert.equal(address.hash(), "#/");
  });
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(RESET_LINK);
    await startPage(held, address);
    const form = resetFormOf(root);
    await fillReset(form);
    await sendForm(form.form);
    await held.answer("setPassword", INVALID_LINK);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    assert.equal(shownScreen(root), "headquarters");
    assert.deepEqual(noticeTexts(root), [
      "Odnośnik jest nieważny albo wygasł.",
    ]);
    assert.equal(address.hash(), "#/");
  });
});

// D-209: a game built again after a conflict stays on the screen the address names.
// Catches the rebuilt game opening the save's map run or Siedziba instead.
test("a game built again after a conflict stays on the screen the address names, also when the game before it came from the sign-in form", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/programy", passing());
    assert.equal(shownScreen(root), "programs", "precondition");
    // Inside act: the edit changes a program, and the list of Programy redraws with React.
    await press(buttonNamed(root, "+ dodaj grupę"));
    await held.answer("saveGame", { kind: "conflict" });
    await held.answer("loadSavedGame", saveOf({ ...passing(), pace: 2 }, 6));
    assert.equal(shownScreen(root), "programs");
    assert.equal(address.hash(), "#/programy");
    assert.equal(saveLine(root).textContent, CONFLICT);
  });
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress();
    await startPage(held, address);
    await held.answer("currentAccount", NO_SESSION);
    await signIn(held, ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    assert.equal(
      shownScreen(root),
      "run",
      "precondition: the sign-in's screen",
    );
    await follow(address, "#/postac/1");
    // Inside act: the edit redraws Postać, a screen in React.
    await press(buttonNamed(root, "+ dodaj grupę"));
    await held.answer("saveGame", { kind: "conflict" });
    await held.answer("loadSavedGame", saveOf({ ...passing(), pace: 2 }, 6));
    assert.equal(shownScreen(root), "character", "not the sign-in's screen");
    assert.equal(address.hash(), "#/postac/1");
  });
});

// D-288, D-282. Catches the rule panel of Programy kept as a
// third area beside the list and the editor, or drawn outside the program panel, and an area of the
// panel left standing while nothing is open.
test("on Programy the list and the editor are the two areas, and an open group draws its panel inside the program panel, directly under its header", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await reloadedAt(held, "#/programy", twoPrograms());
    const screen = programsScreenOf(root);
    assert.equal(
      byClass(screen, "rule-panel-area").length,
      0,
      "no area of its own for the panel",
    );
    assert.equal(byClass(screen, "rule-panel").length, 0, "nothing is open");
    assert.equal(screen.classList.contains("with-rule-panel"), false);

    const header = byClass(screen, "rule-list-header").find((element) =>
      shown(element),
    );
    await press(header);
    const panel = byClass(screen, "rule-panel")[0];
    assert.ok(panel, "a group opens the panel");
    assert.ok(
      header.nextElementSibling.classList.contains("rule-list-panel"),
      "the panel's item stands directly under the header",
    );
    assert.ok(
      header.nextElementSibling.contains(panel),
      "the panel stands in that item",
    );
    const areas = childrenOf(screen).filter((child) => shown(child));
    assert.deepEqual(
      areas.map((child) => child.classList.contains("screen-area")),
      [true, true],
      "two areas: the list and the editor",
    );
    assert.equal(
      byClass(byClass(screen, "program-panel")[0], "rule-panel").length,
      1,
      "the panel is inside the program panel",
    );

    await press(buttonLabelled(screen, "Zamknij panel"));
    assert.equal(byClass(screen, "rule-panel").length, 0, "closed");
    assert.equal(byClass(screen, "rule-list-panel").length, 0);
  });
});

// --- Programy: the list of programs and the panel beside it ----------------------------------
// D-166, D-281. The list is a link to each
// program's address, so a pick is the address changing, which these cases make by `follow`.

/** The screen Programy, shown or not. */
const programsScreenOf = (root) => byClass(root, "programs-screen")[0];

/** The programs on the list of Programy as `[name, href, aria-current]`, in the order they stand. */
const programItems = (root) =>
  byClass(programsScreenOf(root), "program-list-item").map((item) => [
    item.textContent,
    item.getAttribute("href"),
    item.getAttribute("aria-current"),
  ]);

/** The sentences about a map run that stand above the editor in `screen` and are shown. */
const runNotes = (screen) =>
  byClass(screen, "program-run-note")
    .filter(shown)
    .map((note) => note.textContent);

const NOTE = "Zmiany tutaj nie dotykają przejścia na mapie Las.";

/** The number of groups of the program numbered `id` in the saved game state `sent` holds. */
const groupsOf = (sent, id) =>
  sent.game.programs.find((saved) => saved.id === id).program.groups.length;

// D-166. Catches the program panel still standing beside Siedziba, Programy holding
// the select list „Program:” or the copy beside its own list, the sentence missing above the editor
// of Programy beside a waiting map run, and the sentence standing on the screen of the map run.
test("Siedziba holds no program panel; Programy holds the list and a panel with the sentence; Przejście holds the select list with the copy first and no sentence", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await reloadedAt(held, "#/programy", pausedRun());
    assert.equal(shownScreen(root), "programs");
    assert.equal(
      byClass(byClass(root, "headquarters-screen")[0], "program-panel").length,
      0,
      "Siedziba holds no panel",
    );
    const programs = programsScreenOf(root);
    assert.deepEqual(programItems(root), [
      ["Program", "#/programy/1", "page"],
      ["Program 2", "#/programy/2", null],
    ]);
    assert.equal(
      listLabelled(programs, "Program:"),
      undefined,
      "no select list",
    );
    assert.equal(byClass(programs, "program-switch").length, 0);
    assert.equal(byClass(programs, "copy-section").length, 0);
    assert.deepEqual(runNotes(programs), [NOTE]);

    const run = byClass(root, "run-screen")[0];
    const list = listLabelled(run, "Program:");
    assert.deepEqual(
      [...list.options].map((option) => option.textContent),
      ["Kopia w przejściu", "Program", "Program 2"],
    );
    assert.equal(list.value, "copy");
    assert.deepEqual(runNotes(run), []);
  });
});

// D-166; the invariant saved-program-edit. Catches a pick on the list that
// changes the program edited only on the list and not under the panel, the address not picking on
// the list, and an edit on Programy reaching the copy.
test("the address picks the program on the list and in the panel, an edit on Programy lands in it and never in the copy, and `#/programy` shows the first", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/programy", pausedRun());
    const programs = programsScreenOf(root);

    await follow(address, "#/programy/2");
    assert.deepEqual(
      programItems(root).map(([name, , current]) => [name, current]),
      [
        ["Program", null],
        ["Program 2", "page"],
      ],
    );
    await press(buttonNamed(programs, "+ dodaj grupę"));
    await settle();
    const [edited] = held.calls.filter((call) => call.name === "saveGame");
    assert.equal(groupsOf(edited.args[0], 2), 2, "program 2 got the group");
    assert.equal(groupsOf(edited.args[0], 1), 1);
    assert.equal(
      edited.args[0].game.run.copy.program.groups.length,
      1,
      "the copy is not edited",
    );
    await held.answer("saveGame", { kind: "saved", revision: 5 });

    await follow(address, "#/programy");
    assert.deepEqual(
      programItems(root).map(([name, , current]) => [name, current]),
      [
        ["Program", "page"],
        ["Program 2", null],
      ],
    );
    await press(buttonNamed(programs, "+ dodaj grupę"));
    await settle();
    const [again] = held.calls.filter((call) => call.name === "saveGame");
    assert.equal(groupsOf(again.args[0], 1), 2, "`#/programy` is program 1");
    assert.deepEqual(address.entries, [
      "#/programy",
      "#/programy/2",
      "#/programy",
    ]);
  });
});

// D-166. Catches the panel of Programy and the panel of Przejście sharing the program
// shown: the one panel that moved between the screens would carry what a pick on one into the other.
test("the program each panel shows stays its own: a pick on the select list of Przejście does not move Programy", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/programy/2", pausedRun());
    await follow(address, RUN_ADDRESS);
    const run = byClass(root, "run-screen")[0];
    await inAct(() => pickOn(listLabelled(run, "Program:"), "1"));
    await press(buttonNamed(run, "+ dodaj grupę"));
    await settle();
    const [onRun] = held.calls.filter((call) => call.name === "saveGame");
    assert.equal(groupsOf(onRun.args[0], 1), 2, "Przejście edits program 1");
    assert.equal(groupsOf(onRun.args[0], 2), 1);
    await held.answer("saveGame", { kind: "saved", revision: 5 });

    await follow(address, "#/programy/2");
    await press(buttonNamed(programsScreenOf(root), "+ dodaj grupę"));
    await settle();
    const [onPrograms] = held.calls.filter((call) => call.name === "saveGame");
    assert.equal(
      groupsOf(onPrograms.args[0], 2),
      2,
      "Programy edits program 2",
    );
    assert.equal(groupsOf(onPrograms.args[0], 1), 2);
    assert.equal(
      listLabelled(run, "Program:").value,
      "1",
      "Przejście still shows the program it showed",
    );
  });
});

// D-281. Catches „Nowy program” leaving the new program unshown, and without an entry
// of the history.
test("„Nowy program” of the list shows the new program with a new entry of the history", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/programy", twoPrograms());
    await press(buttonNamed(programsScreenOf(root), "Nowy program"));
    assert.deepEqual(address.entries, ["#/programy", "#/programy/3"]);
    assert.deepEqual(
      programItems(root).map(([name, , current]) => [name, current]),
      [
        ["Program", null],
        ["Program 2", null],
        ["Program 3", "page"],
      ],
    );
  });
});

// D-281. Catches the deletion of the program shown leaving the address at a
// program that is gone, or adding an entry the back button would land on that names a gone program.
test("deleting the program shown opens the nearest screen, Programy with the first program, in place of its entry", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/programy/2", twoPrograms());
    const list = byClass(programsScreenOf(root), "program-list-view")[0];
    await press(buttonNamed(list, "Usuń"));
    assert.deepEqual(address.entries, ["#/programy"]);
    assert.equal(shownScreen(root), "programs");
    assert.deepEqual(programItems(root), [["Program", "#/programy/1", "page"]]);
  });
});

/**
 * Ala's map run of the forest on the copy of „Program 2”, which holds „Zawsze → Eksploruj”, ended
 * in a death, beside „Program 3”.
 */
const endedOnSecondProgram = () =>
  ended(
    send(
      editProgram(
        createProgram(twoPrograms()).state,
        2,
        programFromRules({
          condition: { kind: "always" },
          action: { kind: "explore" },
        }),
      ).state,
      { mapId: "forest", characterId: 1, programId: 2 },
      0,
    ).state,
  );

/** The counts the player sees beside the rules of the program Programy shows. */
const countsOnProgramy = (root) =>
  byClass(programsScreenOf(root), "rule-count")
    .filter(shown)
    .map((count) => count.textContent);

/** The name of each program on the list of Programy with whether it is the one shown. */
const programsShown = (root) =>
  programItems(root).map(([name, , current]) => [name, current === "page"]);

// D-173 („after „Zakończ” the program panel shows the program the copy belongs to”), D-93, question
// 15, the review of the whole change (B1). „Zakończ” opens Postać, which has no panel, so the panel
// the player reaches next is the bar's „Programy”. Catches `#/programy` showing the first program
// while the counts stand beside „Program 2”, and `#/programy/{n}` no longer showing program n.
test("after „Zakończ” the bar's „Programy” shows the program the copy belonged to, and `#/programy/{n}` still shows program n", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const game = endedOnSecondProgram();
    const address = await reloadedAt(held, RUN_ADDRESS, game);
    await press(buttonNamed(root, "Zakończ"));
    assert.equal(shownScreen(root), "character", "precondition: Postać opens");
    await held.answer("saveGame", { kind: "saved", revision: 5 });

    await follow(address, "#/programy");
    assert.equal(address.hash(), "#/programy", "the address has no number");
    assert.deepEqual(programsShown(root), [
      ["Program", false],
      ["Program 2", true],
      ["Program 3", false],
    ]);
    // The own-work check, D-93: the counts of the map run stand beside the rules of that program —
    // each rule the program holds at the end, those the map run added to it included — and the
    // rule „Zawsze → Eksploruj” it set out with fired.
    const rules = game.programs[1].program.groups[0].rules.length;
    assert.equal(countsOnProgramy(root).length, rules, "a count at each rule");
    assert.match(countsOnProgramy(root)[0], /^Wykonano [1-9][0-9]*×$/);
    await press(buttonNamed(programsScreenOf(root), "+ dodaj grupę"));
    await settle();
    const [edited] = argsOf(held, "saveGame");
    assert.equal(groupsOf(edited, 2), 2, "the panel edits „Program 2”");
    assert.equal(groupsOf(edited, 1), 1);
    await held.answer("saveGame", { kind: "saved", revision: 6 });

    await follow(address, "#/programy/1");
    assert.deepEqual(programsShown(root), [
      ["Program", true],
      ["Program 2", false],
      ["Program 3", false],
    ]);
    assert.deepEqual(countsOnProgramy(root), [], "no count beside „Program”");
  });
});

// D-173 with D-168 and D-281: the program the copy belonged to may be gone, deleted during the map
// run or on Programy after „Zakończ”; `#/programy` then shows the first program. Catches a program
// gone from the list kept as the one shown, or „Program 3” shown in its place.
test("after „Zakończ” `#/programy` shows the first program once the copy's program is deleted, during the map run or on Programy", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(
      held,
      RUN_ADDRESS,
      deleteProgram(endedOnSecondProgram(), 2).state,
    );
    // The copy of a deleted program holds unsaved changes (D-168), so „Zakończ” asks first (D-173).
    await press(buttonNamed(root, "Zakończ"));
    await press(buttonNamed(root, "Odrzuć"));
    await held.answer("saveGame", { kind: "saved", revision: 5 });
    await follow(address, "#/programy");
    assert.deepEqual(programsShown(root), [
      ["Program", true],
      ["Program 3", false],
    ]);
  });
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, RUN_ADDRESS, endedOnSecondProgram());
    await press(buttonNamed(root, "Zakończ"));
    await held.answer("saveGame", { kind: "saved", revision: 5 });
    await follow(address, "#/programy");
    assert.deepEqual(
      programsShown(root)[1],
      ["Program 2", true],
      "precondition: the copy's program is shown",
    );
    const list = byClass(programsScreenOf(root), "program-list-view")[0];
    await press(buttonNamed(list, "Usuń"));
    assert.deepEqual(programsShown(root), [
      ["Program", true],
      ["Program 3", false],
    ]);
    assert.deepEqual(address.entries, [
      RUN_ADDRESS,
      "#/postac/1",
      "#/programy",
    ]);
  });
});

// D-286. Catches the sentence standing above Programy and Postać until a
// reload, and one that comes back on the return to Siedziba.
test("the page's sentence above the first screen leaves at the first change of screen and does not come back", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = fakeAddress(LINK);
    await startPage(held, address);
    await held.answer("confirmEmail", CONFIRMED);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer(
      "loadSavedGame",
      saveOf(withCharacter(), 4, OLDER_VERSION),
    );
    assert.deepEqual(pageSentences(root), [
      ["Adres e-mail potwierdzony.", "positive"],
      [OTHER_VERSION, "warning"],
    ]);
    await held.answer("saveGame", { kind: "saved", revision: 5 });
    // An act that changes no screen leaves the sentences standing; „Nowy program” now opens the new
    // program on Programy, so the act is a new character.
    await typeInto(inputLabelled(root, "Imię nowej postaci"), "Ola");
    await press(buttonNamed(root, "Załóż"));
    await held.answer("saveGame", { kind: "saved", revision: 6 });
    assert.equal(pageSentences(root).length, 2);

    await follow(address, "#/programy");
    assert.deepEqual(pageSentences(root), []);
    await goBack(address);
    assert.equal(shownScreen(root), "headquarters");
    assert.deepEqual(pageSentences(root), []);
  });
});

// D-280, D-277. Catches „Wróć do przejścia” missing on a screen, standing on the map
// run's own screen, gone after the character's death, with the clock written otherwise than the
// status row writes it, or an item marked on the screen of a map run.
test("„Wróć do przejścia · {mapa} · minuta {m}” stands on Siedziba, Postać, Programy and Mapy while a map run waits or has ended, leads to its screen and is gone there", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/", passing());
    const entry = ["Wróć do przejścia · Las · minuta 0", RUN_ADDRESS];
    assert.deepEqual(returnItem(root), entry);
    await follow(address, "#/postac/1");
    assert.deepEqual(returnItem(root), entry);
    await follow(address, "#/programy");
    assert.deepEqual(returnItem(root), entry);
    assert.deepEqual(barItems(root)[2], ["Programy", "#/programy", "page"]);
    await follow(address, "#/mapy/forest");
    assert.deepEqual(returnItem(root), entry);
    assert.deepEqual(barItems(root)[1], ["Mapy", "#/mapy", "page"]);

    await follow(address, entry[1]);
    assert.equal(shownScreen(root), "run");
    assert.deepEqual(barItems(root), [
      ["Siedziba", "#/", null],
      ["Mapy", "#/mapy", null],
      ["Programy", "#/programy", null],
    ]);
  });
  await onPage(async ({ root }) => {
    const held = heldClient();
    const game = ended();
    const address = await reloadedAt(held, "#/", game);
    assert.deepEqual(returnItem(root), [
      `Wróć do przejścia · Las · minuta ${game.run.death.minute}`,
      RUN_ADDRESS,
    ]);
    await follow(address, RUN_ADDRESS);
    await press(buttonNamed(root, "Zakończ"));
    assert.equal(shownScreen(root), "character");
    assert.equal(returnItem(root), null);
  });
});

// D-217: the screens refresh as time passes, so a reading of the clock rewrites the resurrection
// lines of Siedziba, of Postać and of the characters in „Kto idzie” of the screen Mapy whenever they
// show, also while a manual map run waits. Catches the lines refreshed only without a map run, a
// screen that draws its line at the moment it was built, and a tick that saves.
test("a clock tick rewrites the resurrection line of Siedziba, of Postać and of Mapy while a manual map run waits, and saves nothing", async () => {
  const T = 1_760_000_000_000;
  const warning = " — śmierć zabierze wprawę i wykupione stopnie";
  /** Ala at generation 2 with a paused map run, her resurrection 59 min 30 s away at `T`. */
  const waiting = () => ({
    ...passing(),
    team: renewing(T, 3_570_000).team,
  });
  for (const [hash, lineClass] of [
    ["#/", "team-member-resurrection"],
    ["#/postac/1", "character-screen-resurrection"],
    ["#/mapy/forest", "maps-who-resurrection"],
  ]) {
    await onPage(async ({ root }) => {
      let current = T;
      const date = mock.method(Date, "now", () => current);
      try {
        const held = heldClient();
        await reloadedAt(held, hash, waiting());
        assert.ok(returnItem(root), `${hash}: precondition, the map run waits`);
        const [line] = byClass(root, lineClass);
        assert.ok(shown(line), hash);
        assert.equal(
          line.textContent,
          `Wskrzeszenie za 1 godz. 0 min czasu realnego${warning}`,
          hash,
        );
        current = T + 31_000;
        await inAct(() => mock.timers.tick(200));
        assert.equal(
          line.textContent,
          `Wskrzeszenie za 59 min czasu realnego${warning}`,
          hash,
        );
        current = T + 3_570_000;
        await inAct(() => mock.timers.tick(200));
        assert.equal(line.textContent, "Wskrzeszenie gotowe", hash);
        assert.ok(!line.classList.contains("danger"), hash);
        await inAct(() => mock.timers.tick(60_000));
        assert.deepEqual(waitingCalls(held), [], `${hash}: nothing is saved`);
      } finally {
        date.mock.restore();
      }
    });
  }
});

// Postać and Mapy are created on entering them and disposed on leaving; the DOM screens are built
// once. Catches a screen Postać left in the page after the player left it, or two of them.
test("the screens Postać and Mapy are built on entering them and gone on leaving, while Siedziba and Programy are built once and hidden", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const address = await reloadedAt(held, "#/", withCharacter());
    const hosts = () => byClass(root, "character-screen-host").length;
    const mapsHosts = () => byClass(root, "maps-screen-host").length;
    assert.equal(hosts(), 0);
    assert.equal(mapsHosts(), 0);
    const [headquarters] = byClass(root, "headquarters");
    await follow(address, "#/postac/1");
    assert.equal(hosts(), 1);
    assert.ok(!shown(headquarters));
    await follow(address, "#/programy");
    assert.equal(hosts(), 0);
    await goBack(address);
    assert.equal(hosts(), 1);
    await goBack(address);
    assert.equal(hosts(), 0);
    assert.equal(byClass(root, "headquarters")[0], headquarters, "the same");
    assert.ok(shown(headquarters));

    // Mapy is one screen under both of its addresses: a pick of a map does not build it again.
    await follow(address, "#/mapy");
    assert.equal(mapsHosts(), 1);
    assert.ok(!shown(headquarters));
    const [host] = byClass(root, "maps-screen-host");
    await follow(address, "#/mapy/forest");
    assert.equal(mapsHosts(), 1);
    assert.equal(byClass(root, "maps-screen-host")[0], host, "the same");
    await follow(address, "#/programy");
    assert.equal(mapsHosts(), 0, "gone on leaving");
    await goBack(address);
    assert.equal(mapsHosts(), 1);
    await follow(address, "#/");
    assert.equal(mapsHosts(), 0);
    assert.equal(byClass(root, "headquarters")[0], headquarters, "the same");
  });
});

// D-352, D-156, D-224. A fragment of an emailed link
// that appears in the address of a tab whose game is open (the link pasted into the address bar) must
// reload the page, which then does what a page opened by the link does; before, the listener took it
// for an address with no screen and replaced it with Siedziba, so the link was lost. Catches a
// listener that resolves the fragment as a screen, one that reloads for one of the two links only,
// and one that rewrites the fragment before the reload, which would send the reloaded page to
// Siedziba with no token.
test("a fragment of an emailed link that appears in the address of an open game reloads the page, which keeps the fragment and the screen as they were", async () => {
  for (const [name, link] of [
    ["a confirmation link", LINK],
    ["a password-reset link", RESET_LINK],
  ]) {
    await onPage(async ({ root }) => {
      const address = fakeAddress("#/mapy");
      const { view } = await viewOf(withCharacter(), address);
      assert.equal(shownScreen(root), "maps", `${name}: precondition`);
      await follow(address, link);
      assert.equal(address.reloaded, 1, `${name}: the page reloads`);
      assert.equal(
        address.hash(),
        link,
        `${name}: the fragment is left for the reloaded page to read`,
      );
      assert.equal(
        shownScreen(root),
        "maps",
        `${name}: no screen replaces the one shown`,
      );
      await inAct(() => view.dispose());
    });
  }
});

// The same decision from the other side: only the two fragments of emailed links reload the page.
// Catches a listener that reloads at every change of the address, and one that takes a fragment that
// only begins like a link, with no token sign, for one.
test("any other change of the address of an open game goes on as before and reloads nothing", async () => {
  await onPage(async ({ root }) => {
    const address = fakeAddress("#/");
    const { view } = await viewOf(withCharacter(), address);
    await follow(address, "#/programy");
    assert.equal(shownScreen(root), "programs");
    await goBack(address);
    await goForward(address);
    assert.equal(shownScreen(root), "programs");
    // A fragment that names no screen opens the nearest one and is replaced, a link's lookalikes too.
    for (const fragment of [
      "#nieznany",
      "#confirm-email",
      "#reset-password",
      "#/confirm-email=abc",
      "#CONFIRM-EMAIL=abc",
    ]) {
      await follow(address, fragment);
      assert.equal(shownScreen(root), "headquarters", fragment);
      assert.equal(address.hash(), "#/", `${fragment}: replaced`);
    }
    assert.equal(address.reloaded, 0);
    await inAct(() => view.dispose());
  });
});

// The real address of the page (D-281), on jsdom's history: proof of which call of `history` each
// way makes and that the listener hears the browser's traversal, never of a real address bar
// (D-88). Catches `go` that replaces, `replace` that adds an entry, a listener deaf to `hashchange`
// and a removal that leaves it.
test("browserAddress goes to a fragment with a new entry, replaces one without, and its listener hears the browser's back and forward until removed", async () => {
  await withPage(async ({ window }) => {
    const { browserAddress } =
      await import("../../dist/browser/view/email-confirmation.js");
    const address = browserAddress();
    const length = window.history.length;
    assert.equal(address.hash(), "");

    address.go("#/programy");
    assert.equal(window.location.hash, "#/programy");
    assert.equal(window.history.length, length + 1);
    address.replace("#/postac/1");
    assert.equal(window.location.hash, "#/postac/1");
    assert.equal(window.history.length, length + 1, "replace adds no entry");
    assert.equal(address.hash(), "#/postac/1");

    const heard = [];
    const remove = address.onChange(() => heard.push(address.hash()));
    const nextChange = () =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("no change of the address within 2 s")),
          2_000,
        );
        window.addEventListener(
          "hashchange",
          () => {
            clearTimeout(timer);
            // The page's own listener was added first, so it has run by now.
            resolve();
          },
          { once: true },
        );
      });
    const back = nextChange();
    window.history.back();
    await back;
    assert.deepEqual(heard, [""]);
    const forward = nextChange();
    window.history.forward();
    await forward;
    assert.deepEqual(heard, ["", "#/postac/1"]);

    remove();
    const again = nextChange();
    window.history.back();
    await again;
    assert.deepEqual(heard, ["", "#/postac/1"], "removed, it hears nothing");
  });
});

// --- the page around the card -------------------------------------------------------------------
// D-261, D-262, D-381.

/** The page's own two parts, in the body beside the card. */
function pageParts(root) {
  const child = (name) =>
    childrenOf(root).find((element) => element.localName === name);
  return [child("header"), child("main")];
}

/** Whether the header and the place of the screen show, as the same word for each. */
const partsShown = (root) => pageParts(root).map(shown);

/** The waiting text that shows, or undefined. */
const waitingText = (root) =>
  byClass(root, "session-check-text").find(shown)?.textContent;

// D-262. Catches the card inside `main` or under the header, and a waiting screen that loses the
// header. D-27, D-262: catches a footer, whatever it holds, standing at the page's body on a waiting
// screen or over the game.
test("the card stands alone in the page's body, and the screens before and after it keep the header and have no footer", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    assert.equal(waitingText(root), "Sprawdzanie logowania…");
    assert.equal(
      tagged(root, "footer").length,
      0,
      "no footer on a waiting screen",
    );
    assert.equal(
      tagged(root, "details").length,
      0,
      "no credits on a waiting screen",
    );
    assert.deepEqual(partsShown(root), [true, true]);

    await held.answer("currentAccount", NO_SESSION);
    const card = byClass(root, "account-card-screen")[0];
    assert.ok(card, "the card stands");
    assert.equal(card.parentElement, root);
    assert.ok(shown(card));
    assert.deepEqual(partsShown(root), [false, false]);
    assert.equal(tagged(root, "h1").filter(shown).length, 1, "one name shows");

    await signIn(held, ACCOUNT);
    assert.equal(cardOf(root), undefined);
    assert.equal(card.parentElement, null);
    assert.equal(waitingText(root), "Sprawdzanie logowania…");
    assert.deepEqual(partsShown(root), [true, true]);
    assert.equal(tagged(root, "footer").length, 0, "no footer after sign-in");
    assert.equal(tagged(root, "details").length, 0, "no credits after sign-in");

    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(gameShown(root), true);
    assert.deepEqual(partsShown(root), [true, true]);
    assert.equal(tagged(root, "footer").length, 0, "no footer over the game");
    assert.equal(
      tagged(root, "details").length,
      1,
      "the game holds its one folded section of credits, on Siedziba",
    );
  });
});

// D-262, D-280. Catches the game's name left as a title of its own beside the bar, an item
// or „Konto” on a waiting screen, and a bar over the game that lacks its items or its menu.
test("the header holds the menu bar: the game's name alone on every waiting screen, the items and „Konto” over the game", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    assertNameAloneOnBar(root, "the session check");
    await held.answer("currentAccount", NO_CONNECTION);
    assertNameAloneOnBar(root, "the warning with its retry");
    await press(buttonNamed(root, "Spróbuj ponownie"));
    await held.answer("currentAccount", ACCOUNT);
    assertNameAloneOnBar(root, "the wait for the saved game state");
    await held.answer("loadSavedGame", NO_SAVE);

    const header = pageParts(root)[0];
    const bars = byClass(root, "menu-bar");
    assert.equal(bars.length, 1, "one bar stands");
    assert.ok(header.contains(bars[0]), "the bar stands in the header");
    assert.equal(tagged(header, "h1").length, 0, "no title beside the bar");
    const items = byClass(bars[0], "menu-bar-item");
    assert.deepEqual(
      items.map((item) => [item.textContent, item.getAttribute("href")]),
      [
        ["Siedziba", "#/"],
        ["Mapy", "#/mapy"],
        ["Programy", "#/programy"],
      ],
    );
    assert.deepEqual(
      items.map((item) => item.getAttribute("aria-current")),
      ["page", null, null],
      "the bar marks Siedziba",
    );
    assert.ok(accountButton(root), "„Konto” stands");
    assert.equal(menuIsOpen(root), false, "the menu stands closed");
  });
});

// D-96, D-225, D-262, D-381 (on what closes a card). Catches a card left
// standing over a waiting screen, or under it the page still hidden.
test("the card of a reset link stands alone at once, and each way out of it shows the page again", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held, fakeAddress(RESET_LINK));
    assert.deepEqual(partsShown(root), [false, false]);
    assert.ok(shown(cardOf(root)));

    await press(buttonNamed(root, "Anuluj"));
    assert.equal(cardOf(root), undefined);
    assert.deepEqual(partsShown(root), [true, true]);
    assert.equal(waitingText(root), "Sprawdzanie logowania…");

    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(gameShown(root), true);
    assert.deepEqual(partsShown(root), [true, true]);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held, fakeAddress(RESET_LINK));
    const form = resetFormOf(root);
    await fillReset(form);
    await sendForm(form.form);
    await held.answer("setPassword", INVALID_LINK);
    assert.equal(cardOf(root), undefined);
    assert.equal(waitingText(root), "Sprawdzanie logowania…");
    assert.deepEqual(partsShown(root), [true, true]);
  });
});

// D-96, D-213, D-381. Catches a failed load of the kept state that leaves the card
// standing, its sentence and „Spróbuj ponownie” out of sight, since no waiting screen comes first.
test("an error of the code in the load of the kept state closes the card, so its warning and retry show", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await expiredPage(held);
    const fault = faultInLoad("the-quoted-value");
    try {
      await signIn(held, ACCOUNT);
    } finally {
      fault.end();
    }
    assert.equal(cardOf(root), undefined);
    assert.deepEqual(partsShown(root), [true, true]);
    assert.ok(shown(buttonNamed(root, "Spróbuj ponownie")));
  });
});

// D-211, D-381. Catches a sign-in with a kept state, the one that shows the game with no
// waiting screen before it, leaving the card over the game.
test("a sign-in that goes straight back to the kept game closes the card", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await expiredPage(held);
    await signIn(held, ACCOUNT);
    assert.equal(cardOf(root), undefined);
    assert.equal(gameShown(root), true);
    assert.deepEqual(partsShown(root), [true, true]);
  });
});

// D-381: focus() is called after a confirmed logout and after a password was set, and no other
// opening of the card moves focus. Catches a call of focus() added to `showForms` itself.
test("a card opened by the session check or by an expired save takes no focus", async () => {
  await onPage(async () => {
    const held = heldClient();
    await signedOutPage(held);
    assert.equal(pageDocument().activeElement, pageDocument().body);
  });
  await onPage(async () => {
    const held = heldClient();
    await expiredPage(held);
    assert.equal(pageDocument().activeElement, pageDocument().body);
  });
});

// D-261: „Gra została zaktualizowana. Odśwież stronę.” stays when the visitor switches, and
// a sentence leaves at a change between the card and the game. Catches a warning in another role,
// a sentence lost at a press, and a pending sentence that also comes back above the game.
test("the page's sentence stays in the card through a press of the switch, in warning as an alert, and leaves when the game comes", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await loggingOutPage(held);
    await held.answer("saveGame", { kind: "outdated" });
    await held.answer("logout", { ok: true, value: null });
    const [notice] = noticeOf(root);
    assert.equal(notice.textContent, OUTDATED);
    assert.equal(notice.getAttribute("role"), "alert");
    assert.equal(notice.classList.contains("warning"), true);

    await press(buttonNamed(root, "Załóż konto"));
    assert.deepEqual(noticeTexts(root), [OUTDATED]);
    assertAboveTheForm(root, noticeOf(root)[0]);

    await press(buttonNamed(root, "Zaloguj się"));
    await signIn(held, ACCOUNT);
    assert.deepEqual(noticeTexts(root), []);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.deepEqual(pageSentences(root), []);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held, fakeAddress(LINK));
    await held.answer("confirmEmail", CONFIRMED);
    await held.answer("currentAccount", NO_SESSION);
    assert.deepEqual(noticeTexts(root), ["Adres e-mail potwierdzony."]);
    await signIn(held, ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(gameShown(root), true);
    assert.deepEqual(pageSentences(root), []);
  });
});

// --- the login card -----------------------------------------------------------------------------
// D-96, D-222, D-225, D-259, D-260, D-261, D-381. These cases drive the card through createAccountCard alone, as the page does.

const GAME_NAME = "Loop";
// The sentence about the game (D-96).
const GAME_SENTENCE =
  "Napisz postaci program i sprawdź, jak długo przeżyje bez ciebie.";
const STORED_PASSWORD = "dwanaście znaków";
const OTHER_PASSWORD = "inne dwanaście znaków";

const POSITIVE_NOTICE = {
  text: "Hasło zmienione. Zaloguj się nowym hasłem.",
  role: "positive",
};
const WARNING_NOTICE = {
  text: "Gra została zaktualizowana. Odśwież stronę.",
  role: "warning",
};
const LOGIN_REFUSED = {
  ok: false,
  failure: {
    kind: "refused",
    status: 401,
    code: "invalid-credentials",
    message: "Nieprawidłowy adres e-mail lub hasło.",
  },
};
const EMAIL_FIELD = ["Adres e-mail", "adres e-mail", "email"];
const NEW_PASSWORD_REPEATED = [
  "Powtórz hasło",
  "hasło jeszcze raz",
  "new-password",
];
const REGISTERED = {
  ok: true,
  value: { ...UNCONFIRMED_ACCOUNT.value, confirmationMessage: "limited" },
};

const submitIn = (root) =>
  tagged(root, "button").find((button) => button.type === "submit");

const labelTexts = (root) =>
  tagged(root, "label").map((label) => label.textContent);

const headingTexts = (root) =>
  tagged(root, "h2").map((heading) => heading.textContent);

/** The buttons of a group, each with whether it says it is the selected one. */
const switchState = (root) =>
  tagged(root, "button")
    .filter((button) => button.hasAttribute("aria-pressed"))
    .map((button) => [button.textContent, button.getAttribute("aria-pressed")]);

const SWITCH_ON_LOGIN = [
  ["Zaloguj się", "true"],
  ["Załóż konto", "false"],
];
const SWITCH_ON_REGISTER = [
  ["Zaloguj się", "false"],
  ["Załóż konto", "true"],
];

/** The texts of the sentences under the fields, and of the warning under the form, that show. */
const shownMessages = (root) =>
  all(root)
    .filter(
      (element) =>
        shown(element) &&
        (element.classList.contains("input-field-message") ||
          element.classList.contains("form-warning") ||
          element.classList.contains("form-note")),
    )
    .map((element) => element.textContent);

/** Puts a new card in the page; `entered` holds each call of `signedIn`. */
async function openCard(root, client, options = {}) {
  const entered = [];
  const card = await inAct(() =>
    createAccountCard({
      client,
      sentence: null,
      signedIn: (account, message) => entered.push({ account, message }),
      reset: null,
      ...options,
    }),
  );
  root.append(card.element);
  return { card, entered };
}

/** The option `reset` of a page opened by a link; `steps` holds what ended it, in order. */
function resetLink() {
  const steps = [];
  const address = fakeAddress(RESET_LINK);
  const clear = address.clearFragment;
  address.clearFragment = () => {
    steps.push("fragment cleared");
    clear();
  };
  return {
    steps,
    address,
    reset: {
      token: RESET_TOKEN,
      address,
      finished: (ending) => steps.push(ending),
    },
  };
}

/** The card with a login sent and waiting for its answer. */
async function waitingLogin(root, held, options) {
  const opened = await openCard(root, held.client, options);
  await fillIn(root, "ala@example.com", STORED_PASSWORD);
  await sendForm(formIn(root));
  assert.equal(submitIn(root)?.textContent, "Logowanie…", "precondition");
  return opened;
}

// D-259. Catches a state other than „Zaloguj się” at the opening, a
// heading beside the switch, a request sent by the opening and another order in the card.
test("the card opens on „Zaloguj się” with the name, the sentence, the switch, a form without a heading, „Nie pamiętam hasła” and the folded credits, in that order", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    const names = tagged(root, "h1");
    assert.deepEqual(
      names.map((name) => name.textContent),
      [GAME_NAME],
    );
    const about = tagged(root, "p").find(
      (paragraph) => paragraph.textContent === GAME_SENTENCE,
    );
    assert.ok(about, "the sentence about the game stands");
    assert.deepEqual(switchState(root), SWITCH_ON_LOGIN);
    assert.deepEqual(headingTexts(root), []);
    assert.deepEqual(labelTexts(root), ["Adres e-mail", "Hasło"]);
    assert.deepEqual(
      inputsIn(root).map((input) => input.type),
      ["text", "password"],
    );
    assert.equal(submitIn(root)?.textContent, "Zaloguj się");
    const opener = buttonNamed(root, "Nie pamiętam hasła");
    assert.ok(opener, "the button „Nie pamiętam hasła” stands");
    assert.equal(formIn(root).contains(opener), false);
    const [credits] = tagged(root, "details");
    const [firstSwitch] = tagged(root, "button");
    assertInOrder(root, [
      names[0],
      about,
      firstSwitch,
      formIn(root),
      opener,
      credits,
    ]);
    assert.deepEqual(noticeTexts(root), []);
    assert.deepEqual(held.calls, []);
  });
});

// D-96, D-259. Catches the form of another state, a heading under the switch, and
// „Nie pamiętam hasła” standing under „Załóż konto”.
test("„Załóż konto” shows address, password and repeated password, with no heading and no „Nie pamiętam hasła”, and the switch says so", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await press(buttonNamed(root, "Załóż konto"));
    assert.deepEqual(switchState(root), SWITCH_ON_REGISTER);
    assert.deepEqual(headingTexts(root), []);
    assert.deepEqual(labelTexts(root), [
      "Adres e-mail",
      "Hasło",
      "Powtórz hasło",
    ]);
    assert.deepEqual(
      inputsIn(root).map((input) => input.type),
      ["text", "password", "password"],
    );
    assert.equal(submitIn(root)?.textContent, "Załóż konto");
    assert.equal(buttonNamed(root, "Nie pamiętam hasła"), undefined);
    assert.deepEqual(held.calls, []);
  });
});

// D-96, D-259. Catches the switch in the state, a field not empty, the heading or a
// way back missing, and a way back to another state than „Zaloguj się”.
test("„Nie pamiętam hasła” shows its heading and an empty address with „Wyślij odnośnik” and „Wróć do logowania”, no switch, and the way back opens „Zaloguj się”", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await fillIn(root, "ala@example.com", STORED_PASSWORD);
    await press(buttonNamed(root, "Nie pamiętam hasła"));
    assert.deepEqual(headingTexts(root), ["Nie pamiętam hasła"]);
    assert.deepEqual(switchState(root), []);
    assert.deepEqual(labelTexts(root), ["Adres e-mail"]);
    assert.equal(inputsIn(root)[0]?.value, "");
    assert.equal(submitIn(root)?.textContent, "Wyślij odnośnik");
    assert.equal(pageDocument().activeElement, inputsIn(root)[0]);
    assert.deepEqual(held.calls, [], "no request was made by the opening");

    await press(buttonNamed(root, "Wróć do logowania"));
    assert.deepEqual(switchState(root), SWITCH_ON_LOGIN);
    assert.deepEqual(headingTexts(root), []);
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      ["", ""],
    );
    assert.equal(pageDocument().activeElement, inputsIn(root)[0]);
  });
});

// D-225, D-259. Catches the switch in the form of a link, whose press would have to
// remove the link, the heading or „Anuluj” missing, and a request sent at the opening.
test("a card opened with a reset link shows „Ustaw nowe hasło” with its heading, its two fields, „Ustaw hasło” and „Anuluj”, no switch, and asks nothing", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { address, reset } = resetLink();
    await openCard(root, held.client, { reset });
    assert.deepEqual(headingTexts(root), ["Ustaw nowe hasło"]);
    assert.deepEqual(switchState(root), []);
    assert.deepEqual(labelTexts(root), ["Nowe hasło", "Powtórz hasło"]);
    assert.deepEqual(
      inputsIn(root).map((input) => input.type),
      ["password", "password"],
    );
    assert.equal(submitIn(root)?.textContent, "Ustaw hasło");
    assert.ok(buttonNamed(root, "Anuluj"), "the button „Anuluj” stands");
    assert.deepEqual(held.calls, []);
    assert.equal(address.cleared, 0);
  });
});

// Each break here lets a browser correct or refuse an address, or fill the wrong password, with
// nothing else showing it.
test("every field keeps its label, hint and autocomplete token, the address its keyboard and no spell check, and no form checks itself", async () => {
  const states = [
    {
      name: "„Zaloguj się”",
      fields: [EMAIL_FIELD, ["Hasło", "hasło", "current-password"]],
    },
    {
      name: "„Załóż konto”",
      opener: "Załóż konto",
      fields: [
        EMAIL_FIELD,
        ["Hasło", "hasło", "new-password"],
        NEW_PASSWORD_REPEATED,
      ],
    },
    {
      name: "„Nie pamiętam hasła”",
      opener: "Nie pamiętam hasła",
      fields: [EMAIL_FIELD],
    },
    {
      name: "„Ustaw nowe hasło”",
      withLink: true,
      fields: [
        ["Nowe hasło", "nowe hasło", "new-password"],
        NEW_PASSWORD_REPEATED,
      ],
    },
  ];
  for (const { name, opener, withLink, fields } of states) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const options = withLink ? { reset: resetLink().reset } : {};
      await openCard(root, held.client, options);
      if (opener) await press(buttonNamed(root, opener));
      assert.deepEqual(
        inputsIn(root).map((input) => [
          tagged(root, "label").find((label) => label.htmlFor === input.id)
            ?.textContent,
          input.placeholder,
          input.getAttribute("autocomplete"),
        ]),
        fields,
        name,
      );
      assert.equal(formIn(root).noValidate, true, name);
      for (const input of inputsIn(root)) {
        const address = input.type === "text";
        assert.equal(
          input.getAttribute("inputmode"),
          address ? "email" : null,
          name,
        );
        assert.equal(
          input.getAttribute("spellcheck"),
          address ? "false" : null,
          name,
        );
      }
    });
  }
});

// D-260. Catches a password kept for the way back, a refusal or a field's message left
// standing after the switch, focus left behind, and a press that takes the page's sentence too.
test("a press of the switch empties every field, removes every message, moves focus to the address field and leaves the page's sentence", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client, { sentence: POSITIVE_NOTICE });
    await fillIn(root, "ala@example.com", STORED_PASSWORD);
    await sendForm(formIn(root));
    await held.answer("login", LOGIN_REFUSED);
    assert.deepEqual(shownMessages(root), [LOGIN_REFUSED.failure.message]);

    await press(buttonNamed(root, "Załóż konto"));
    assert.deepEqual(switchState(root), SWITCH_ON_REGISTER);
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      ["", "", ""],
    );
    assert.deepEqual(shownMessages(root), []);
    assert.equal(pageDocument().activeElement, inputsIn(root)[0]);
    assert.deepEqual(noticeTexts(root), [POSITIVE_NOTICE.text]);

    await fillIn(root, "ala", "krótkie", "inne");
    await sendForm(formIn(root));
    assert.equal(shownMessages(root).length, 3, "precondition: three messages");

    await press(buttonNamed(root, "Zaloguj się"));
    assert.deepEqual(switchState(root), SWITCH_ON_LOGIN);
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      ["", ""],
    );
    assert.deepEqual(shownMessages(root), []);
    assert.equal(pageDocument().activeElement, inputsIn(root)[0]);
    assert.deepEqual(noticeTexts(root), [POSITIVE_NOTICE.text]);
  });
});

// D-381. Catches a press that clears what is typed although nothing was
// switched, and one that takes focus.
test("a press of the state already shown clears nothing and moves no focus", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await fillIn(root, "ala@example.com", STORED_PASSWORD);
    await sendForm(formIn(root));
    await held.answer("login", LOGIN_REFUSED);
    const [, password] = inputsIn(root);
    password.focus();

    await press(buttonNamed(root, "Zaloguj się"));
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      ["ala@example.com", STORED_PASSWORD],
    );
    assert.deepEqual(shownMessages(root), [LOGIN_REFUSED.failure.message]);
    assert.equal(pageDocument().activeElement, password);
  });
});

// D-261, and the roles of createConfirmationNotice. Catches a sentence outside the card,
// below the switch or the heading, gone at a change of state, or in another role.
test("the page's sentence stands in the card above the switch, or above the form where none stands, in its role, through every change of state", async () => {
  for (const [notice, role] of [
    [POSITIVE_NOTICE, "status"],
    [WARNING_NOTICE, "alert"],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      await openCard(root, held.client, { sentence: notice });
      const [card] = byClass(root, "account-card");
      const [sentence] = byClass(root, "confirmation-notice");
      assert.ok(card?.contains(sentence), "the sentence stands in the card");
      assert.equal(sentence.textContent, notice.text);
      assert.equal(sentence.getAttribute("role"), role);
      assert.equal(sentence.classList.contains(notice.role), true);
      assertInOrder(root, [sentence, tagged(root, "button")[0], formIn(root)]);

      await press(buttonNamed(root, "Załóż konto"));
      assertInOrder(root, [sentence, tagged(root, "button")[0], formIn(root)]);
      assert.deepEqual(noticeTexts(root), [notice.text]);

      await press(buttonNamed(root, "Zaloguj się"));
      await press(buttonNamed(root, "Nie pamiętam hasła"));
      assert.deepEqual(noticeTexts(root), [notice.text]);
      assertInOrder(root, [sentence, tagged(root, "h2")[0], formIn(root)]);
    });
  }
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client, {
      sentence: WARNING_NOTICE,
      reset: resetLink().reset,
    });
    const [sentence] = byClass(root, "confirmation-notice");
    assert.deepEqual(noticeTexts(root), [WARNING_NOTICE.text]);
    assertInOrder(root, [sentence, tagged(root, "h2")[0], formIn(root)]);
  });
});

// D-96. Catches credits missing from a state, not last, unfolded at the opening,
// remounted by a change of state, which folds them again, or caught by the lock.
test("the folded credits stand last in all four states, stay open across a change of state and stay usable while the card waits", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    const [card] = byClass(root, "account-card");
    const [credits] = tagged(root, "details");
    assert.ok(credits, "the credits stand");
    assert.equal(credits.open, false, "folded at the opening");
    assert.equal(tagged(credits, "summary")[0].textContent, "Autorzy grafiki");
    assert.ok(tagged(credits, "a").length > 0, "the credits hold their links");
    assert.equal(childrenOf(card).at(-1), credits);

    credits.open = true;
    for (const opener of ["Załóż konto", "Zaloguj się", "Nie pamiętam hasła"]) {
      await press(buttonNamed(root, opener));
      assert.equal(tagged(root, "details")[0], credits, opener);
      assert.equal(credits.open, true, opener);
      assert.equal(childrenOf(card).at(-1), credits, opener);
    }

    await fillIn(root, "ala@example.com");
    await sendForm(formIn(root));
    assert.equal(submitIn(root).textContent, "Wysyłanie…", "precondition");
    assert.equal(tagged(root, "details")[0], credits);
    assert.equal(credits.open, true);
    assert.equal(
      credits.closest("fieldset, [inert]"),
      null,
      "no lock holds it",
    );
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client, { reset: resetLink().reset });
    const [card] = byClass(root, "account-card");
    const [credits] = tagged(root, "details");
    assert.ok(credits, "the credits stand");
    assert.equal(childrenOf(card).at(-1), credits);
  });
});

// D-381: the page places the card and calls focus() at once. Catches an asynchronous
// render, which leaves the element empty when the function returns.
test("the card stands in its element when createAccountCard returns", async () => {
  await onPage(async () => {
    const held = heldClient();
    const inputs = await inAct(() => {
      const card = createAccountCard({
        client: held.client,
        sentence: null,
        signedIn: () => {},
        reset: null,
      });
      return inputsIn(card.element).length;
    });
    assert.equal(inputs, 2);
  });
});

// D-381: no opening of the card moves focus but a call of focus(). Catches an autofocus,
// and a focus() that holds the first state's field after a change of state.
test("the card takes no focus when it opens, and focus() moves it to the first field of the state it stands in", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const outside = pageDocument().createElement("button");
    root.append(outside);
    outside.focus();
    const { card } = await openCard(root, held.client);
    assert.equal(pageDocument().activeElement, outside);

    card.focus();
    assert.equal(pageDocument().activeElement, inputsIn(card.element)[0]);
    assert.notEqual(pageDocument().activeElement, outside);

    await press(buttonNamed(root, "Załóż konto"));
    outside.focus();
    card.focus();
    assert.equal(pageDocument().activeElement, inputsIn(card.element)[0]);
    assert.notEqual(pageDocument().activeElement, outside);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    const { card } = await openCard(root, held.client, {
      reset: resetLink().reset,
    });
    card.focus();
    assert.equal(inputsIn(card.element).length, 2, "precondition");
    assert.equal(pageDocument().activeElement, inputsIn(card.element)[0]);
  });
});

// D-381. Catches an element left in the page, a typed password left behind in it, and an
// answer that still signs in, ends the form or clears the link's fragment after the card has gone.
test("dispose() takes the element out with what it holds, and an answer still awaited is ignored", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { card, entered } = await waitingLogin(root, held);
    await inAct(() => card.dispose());
    assert.equal(card.element.parentElement, null);
    assert.equal(card.element.children.length, 0);
    await held.answer("login", ACCOUNT);
    assert.deepEqual(entered, []);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    const { steps, address, reset } = resetLink();
    const { card } = await openCard(root, held.client, { reset });
    await fillIn(root, NEW_PASSWORD, NEW_PASSWORD);
    await sendForm(formIn(root));
    assert.equal(submitIn(root)?.textContent, "Ustawianie…", "precondition");
    await inAct(() => card.dispose());
    await held.answer("setPassword", INVALID_LINK);
    assert.deepEqual(steps, []);
    assert.equal(address.cleared, 0);
  });
});

// D-381: the page closes the card from signedIn and finished. React reports a root
// unmounted while it renders, and the harness fails the case on that report; called from render or
// an effect these would do so. Catches those two places.
test("signedIn and finished may dispose the card, from the answer and from the click", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const opened = await waitingLogin(root, held, {
      signedIn: () => opened.card.dispose(),
    });
    await held.answer("login", ACCOUNT);
    assert.equal(opened.card.element.parentElement, null);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    const { reset } = resetLink();
    const opened = await openCard(root, held.client, {
      reset: { ...reset, finished: () => opened.card.dispose() },
    });
    await press(buttonNamed(root, "Anuluj"));
    assert.equal(opened.card.element.parentElement, null);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    const { reset } = resetLink();
    const opened = await openCard(root, held.client, {
      reset: { ...reset, finished: () => opened.card.dispose() },
    });
    await fillIn(root, NEW_PASSWORD, NEW_PASSWORD);
    await sendForm(formIn(root));
    await held.answer("setPassword", CHANGED);
    assert.equal(opened.card.element.parentElement, null);
  });
});

// D-44, D-381. Catches a page reloaded by the send, a trimmed password (D-98), a
// control left open by the lock, a second request, a warning elsewhere, and focus lost at the
// unlock: it may return only after the commit, since a disabled control cannot take it.
test("a sent login locks the whole card, and a refusal leaves one warning under the form and focus where the player sent it from", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await fillIn(root, " ala@example.com ", `  ${STORED_PASSWORD}  `);
    const [, password] = inputsIn(root);
    password.focus();
    assert.equal(await sendForm(formIn(root)), true, "the page stays");
    assert.deepEqual(
      held.calls.map(({ name, args }) => [name, ...args]),
      [["login", " ala@example.com ", `  ${STORED_PASSWORD}  `]],
    );
    assert.equal(submitIn(root).textContent, "Logowanie…");
    assert.deepEqual(new Set(lockOf(root)).size, 1, "all alike");
    assert.equal(lockOf(root)[0], true);
    assert.equal(lockOf(root).length, 6, "two fields and four buttons");

    await sendForm(formIn(root));
    await press(buttonNamed(root, "Załóż konto"));
    await press(buttonNamed(root, "Nie pamiętam hasła"));
    assert.equal(held.calls.length, 1, "nothing is sent twice");
    assert.deepEqual(switchState(root), SWITCH_ON_LOGIN);
    assert.equal(inputsIn(root).length, 2, "the state stays while it waits");

    await held.answer("login", LOGIN_REFUSED);
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [LOGIN_REFUSED.failure.message],
    );
    assert.equal(formIn(root).contains(shownAlerts(root)[0]), true);
    assert.equal(submitIn(root).textContent, "Zaloguj się");
    assert.deepEqual(new Set(lockOf(root)).size, 1, "all alike");
    assert.equal(lockOf(root)[0], false);
    assert.equal(pageDocument().activeElement, password);
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      [" ala@example.com ", `  ${STORED_PASSWORD}  `],
    );
  });
});

// D-381: state shows only after a commit. Catches the guard
// held in state alone, which lets a second send through before the lock is drawn.
test("two sends and a switch before the lock is drawn send once and change nothing", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await fillIn(root, "ala@example.com", STORED_PASSWORD);
    await inAct(() => {
      fire(formIn(root), "submit");
      fire(formIn(root), "submit");
      fire(buttonNamed(root, "Załóż konto"), "click");
    });
    assert.deepEqual(waitingCalls(held), ["login"]);
    assert.deepEqual(switchState(root), SWITCH_ON_LOGIN);
    await held.answer("login", NO_CONNECTION);
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      ["ala@example.com", STORED_PASSWORD],
    );
  });
});

// D-96: the entry to the game. Catches a confirmation's outcome lost or invented, a field
// of the answer passed on beyond the account, a value trimmed, and a password left in the field.
test("a sign-in and a registration hand the account on with the outcome of the message, and keep no password", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { entered } = await waitingLogin(root, held);
    await held.answer("login", {
      ok: true,
      value: { ...ACCOUNT.value, role: "admin" },
    });
    assert.deepEqual(entered, [{ account: ACCOUNT.value, message: null }]);
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      ["", ""],
    );
    assert.equal(lockOf(root)[0], false);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    const { entered } = await openCard(root, held.client);
    await press(buttonNamed(root, "Załóż konto"));
    await fillIn(root, " Ala@Example.com ", STORED_PASSWORD, STORED_PASSWORD);
    await sendForm(formIn(root));
    assert.deepEqual(held.calls[0].args, [
      " Ala@Example.com ",
      STORED_PASSWORD,
      STORED_PASSWORD,
    ]);
    assert.equal(submitIn(root).textContent, "Zakładanie konta…");
    assert.equal(lockOf(root).length, 6, "three fields and three buttons");
    assert.equal(new Set(lockOf(root)).size, 1, "all alike");
    assert.equal(lockOf(root)[0], true);
    await held.answer("register", REGISTERED);
    assert.deepEqual(entered, [
      { account: UNCONFIRMED_ACCOUNT.value, message: "limited" },
    ]);
    assert.deepEqual(
      inputsIn(root).map((input) => input.value),
      ["", "", ""],
    );
  });
});

// D-44. Catches a warning that does not show, a warning kept through the next send, and
// focus not returned to the button, which is the origin when the field holds no focus.
test("a lost connection on a registration leaves one warning, removed by the next send, and focus on the button it was sent from", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await press(buttonNamed(root, "Załóż konto"));
    await fillIn(root, "ala@example.com", STORED_PASSWORD, STORED_PASSWORD);
    const button = submitIn(root);
    button.focus();
    await sendForm(formIn(root));
    await held.answer("register", NO_CONNECTION);
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [NO_CONNECTION.failure.message],
    );
    assert.equal(button.textContent, "Załóż konto");
    assert.equal(pageDocument().activeElement, button);

    await sendForm(formIn(root));
    assert.deepEqual(shownAlerts(root), []);
  });
});

// D-98, D-99. Catches a request sent past a local check, a field marked other than the one
// at fault, and focus left where it was; the sentences are the server's (account-rules.ts).
test("a registration the server would refuse sends nothing, marks each field at fault and takes focus to the first", async () => {
  const CASES = [
    {
      name: "the password alone",
      texts: ["ala@example.com", "za krótkie", "za krótkie"],
      marked: [null, "true", null],
      messages: ["Hasło musi mieć od 12 do 128 znaków."],
      focused: 1,
    },
    {
      name: "the repetition alone",
      texts: ["ala@example.com", STORED_PASSWORD, OTHER_PASSWORD],
      marked: [null, null, "true"],
      messages: ["Powtórzone hasło różni się od hasła."],
      focused: 2,
    },
    {
      name: "all three",
      texts: ["ala", "krótkie", "inne"],
      marked: ["true", "true", "true"],
      messages: [
        ADDRESS_SENTENCE,
        "Hasło musi mieć od 12 do 128 znaków.",
        "Powtórzone hasło różni się od hasła.",
      ],
      focused: 0,
    },
  ];
  for (const { name, texts, marked, messages, focused } of CASES) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      await openCard(root, held.client);
      await press(buttonNamed(root, "Załóż konto"));
      await fillIn(root, ...texts);
      await sendForm(formIn(root));
      assert.deepEqual(held.calls, [], name);
      assert.deepEqual(
        inputsIn(root).map((input) => input.getAttribute("aria-invalid")),
        marked,
        name,
      );
      assert.deepEqual(shownMessages(root), messages, name);
      assert.equal(pageDocument().activeElement, inputsIn(root)[focused], name);
      assert.equal(lockOf(root).includes(true), false, name);
    });
  }
});

// D-222. Catches a badly written address sent, its sentence missing, and the lock of the
// state: the field, „Wyślij odnośnik” and „Wróć do logowania” alike.
test("a request checks its address first and waits with its field and every button locked", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await press(buttonNamed(root, "Nie pamiętam hasła"));
    await fillIn(root, "ala.example.com");
    submitIn(root).focus();
    await sendForm(formIn(root));
    assert.deepEqual(held.calls, []);
    assert.deepEqual(shownMessages(root), [ADDRESS_SENTENCE]);
    assert.equal(inputsIn(root)[0].value, "ala.example.com");
    assert.equal(pageDocument().activeElement, inputsIn(root)[0]);

    await fillIn(root, "ala@example.com");
    await sendForm(formIn(root));
    assert.deepEqual(
      held.calls.map(({ name, args }) => [name, ...args]),
      [["requestPasswordReset", "ala@example.com"]],
    );
    assert.equal(submitIn(root).textContent, "Wysyłanie…");
    assert.equal(lockOf(root).length, 3, "a field and two buttons");
    assert.equal(new Set(lockOf(root)).size, 1, "all alike");
    assert.equal(lockOf(root)[0], true);
    await press(buttonNamed(root, "Wróć do logowania"));
    assert.deepEqual(headingTexts(root), ["Nie pamiętam hasła"]);
  });
});

// D-222. Catches the sentence in the role of a refusal, an address left in the field, the
// form closed after the answer, and a sentence kept through the next send.
test("a well-formed address gets the one sentence under the form in a status, with the field empty and focus back, and the form stays", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await press(buttonNamed(root, "Nie pamiętam hasła"));
    await fillIn(root, "  nieznany@example.com ");
    const [email] = inputsIn(root);
    email.focus();
    await sendForm(formIn(root));
    await held.answer("requestPasswordReset", REQUESTED);

    const [note] = byClass(root, "form-note");
    assert.equal(note.getAttribute("role"), "status");
    assert.equal(formIn(root).contains(note), true);
    assert.deepEqual(shownMessages(root), [RESET_SENTENCE]);
    assert.deepEqual(shownAlerts(root), []);
    assert.equal(email.value, "");
    assert.equal(email.disabled, false);
    assert.equal(submitIn(root).textContent, "Wyślij odnośnik");
    assert.equal(buttonNamed(root, "Wróć do logowania").disabled, false);
    assert.equal(pageDocument().activeElement, email);

    await fillIn(root, "ala@example.com");
    await sendForm(formIn(root));
    assert.deepEqual(shownMessages(root), []);
  });
});

// D-44. Catches a refusal taken for the sentence of the reset, an address lost, and focus
// not back on the control the player sent from, field or button.
test("a refusal or a lost connection on a request stands as the warning, keeps the address and returns focus", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await press(buttonNamed(root, "Nie pamiętam hasła"));
    await fillIn(root, "ala@example.com");
    const [email] = inputsIn(root);
    email.focus();
    await sendForm(formIn(root));
    await held.answer("requestPasswordReset", REQUEST_REFUSED);
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [REQUEST_REFUSED.failure.message],
    );
    assert.deepEqual(shownMessages(root), [REQUEST_REFUSED.failure.message]);
    assert.equal(email.value, "ala@example.com");
    assert.equal(pageDocument().activeElement, email);

    const button = submitIn(root);
    button.focus();
    await sendForm(formIn(root));
    await held.answer("requestPasswordReset", NO_CONNECTION);
    assert.deepEqual(shownMessages(root), [NO_CONNECTION.failure.message]);
    assert.equal(email.value, "ala@example.com");
    assert.equal(pageDocument().activeElement, button);
  });
});

// D-260, „as the button „Nie pamiętam hasła” does”. Catches a typed address or a sentence that
// comes back at the next visit to the state.
test("nothing typed and no sentence survives leaving „Nie pamiętam hasła” and coming back", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await openCard(root, held.client);
    await press(buttonNamed(root, "Nie pamiętam hasła"));
    await fillIn(root, "ala@example.com");
    await sendForm(formIn(root));
    await held.answer("requestPasswordReset", REQUESTED);
    await fillIn(root, "druga@example.com");
    assert.deepEqual(shownMessages(root), [RESET_SENTENCE]);

    await press(buttonNamed(root, "Wróć do logowania"));
    await press(buttonNamed(root, "Nie pamiętam hasła"));
    assert.equal(inputsIn(root)[0].value, "");
    assert.deepEqual(shownMessages(root), []);
  });
});

// D-44, D-225. Catches a token left out of the request, a second request, „Anuluj” open
// while the form waits, and a fragment cleared before the answer.
test("a sent „Ustaw nowe hasło” waits with the whole card locked, sends the token and both passwords once and keeps the fragment", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { steps, address, reset } = resetLink();
    await openCard(root, held.client, { reset });
    await fillIn(root, NEW_PASSWORD, NEW_PASSWORD);
    await sendForm(formIn(root));
    assert.deepEqual(
      held.calls.map(({ name, args }) => [name, ...args]),
      [["setPassword", RESET_TOKEN, NEW_PASSWORD, NEW_PASSWORD]],
    );
    assert.equal(submitIn(root).textContent, "Ustawianie…");
    assert.equal(lockOf(root).length, 4, "two fields and two buttons");
    assert.equal(new Set(lockOf(root)).size, 1, "all alike");
    assert.equal(lockOf(root)[0], true);

    await sendForm(formIn(root));
    await press(buttonNamed(root, "Anuluj"));
    assert.equal(held.calls.length, 1);
    assert.deepEqual(steps, []);
    assert.equal(address.hash(), RESET_LINK);
  });
});

// D-98, D-225. Catches a request sent past a local check, the message under the wrong
// field, a warning left from the check before, and the link spent or cleared by it.
test("a new password the server would refuse sends nothing, stands under its field, takes focus there and keeps the link", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { steps, address, reset } = resetLink();
    await openCard(root, held.client, { reset });

    await fillIn(root, "krótkie", "krótkie");
    await sendForm(formIn(root));
    assert.equal(
      fieldMessage(inputsIn(root)[0]),
      "Hasło musi mieć od 12 do 128 znaków.",
    );
    assert.equal(fieldMessage(inputsIn(root)[1]), null);
    assert.equal(pageDocument().activeElement, inputsIn(root)[0]);

    await fillIn(root, NEW_PASSWORD, "inne hasło 123");
    await sendForm(formIn(root));
    assert.equal(fieldMessage(inputsIn(root)[0]), null);
    assert.equal(
      fieldMessage(inputsIn(root)[1]),
      "Powtórzone hasło różni się od hasła.",
    );
    assert.equal(pageDocument().activeElement, inputsIn(root)[1]);

    assert.deepEqual(held.calls, []);
    assert.deepEqual(steps, []);
    assert.equal(address.hash(), RESET_LINK);
    assert.equal(lockOf(root).includes(true), false);
  });
});

// D-225: the fragment goes first, so neither a reload nor the back button returns to the
// token. Catches the order turned, a refusal read by its sentence instead of its code, and the
// ending of a change told as a refusal.
test("a change and a refused link, whatever its reason, clear the fragment first and then end the form with their ending", async () => {
  const refused = (message) => ({
    ok: false,
    failure: { kind: "refused", status: 400, code: "invalid-link", message },
  });
  for (const [name, answer, ending] of [
    ["a change", CHANGED, "changed"],
    ["a dead link", INVALID_LINK, "refused"],
    ["a blocked account", refused("Konto jest zablokowane."), "refused"],
  ]) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const { steps, address, reset } = resetLink();
      await openCard(root, held.client, { reset });
      await fillIn(root, NEW_PASSWORD, NEW_PASSWORD);
      await sendForm(formIn(root));
      await held.answer("setPassword", answer);
      assert.deepEqual(steps, ["fragment cleared", ending], name);
      assert.equal(address.hash(), "", name);
    });
  }
});

// D-225; the form's own `ended`. Catches „Anuluj” that leaves the fragment, and a form
// that ends twice or sends after its end while the page has not yet closed the card.
test("„Anuluj” clears the fragment first and ends the form, which then ends no second time and sends nothing", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { steps, address, reset } = resetLink();
    await openCard(root, held.client, { reset });
    await press(buttonNamed(root, "Anuluj"));
    assert.deepEqual(steps, ["fragment cleared", "cancelled"]);
    assert.equal(address.hash(), "");
    assert.deepEqual(held.calls, []);

    await press(buttonNamed(root, "Anuluj"));
    await fillIn(root, NEW_PASSWORD, NEW_PASSWORD);
    await sendForm(formIn(root));
    assert.deepEqual(steps, ["fragment cleared", "cancelled"]);
    assert.deepEqual(held.calls, []);
  });
});

// D-225: no connection or a full gate leaves the form, one sentence and the link working.
// Catches a failure read as an end, a lost field, focus not returned, and a token not sent again.
test("a failure that is no change and no refused link keeps the form and the link, with the sentence under the form and focus back", async () => {
  for (const [name, failure] of Object.entries(KEEPING_FAILURES)) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const { steps, address, reset } = resetLink();
      await openCard(root, held.client, { reset });
      await fillIn(root, NEW_PASSWORD, NEW_PASSWORD);
      const [, repeated] = inputsIn(root);
      repeated.focus();
      await sendForm(formIn(root));
      await held.answer("setPassword", failure);

      assert.deepEqual(steps, [], name);
      assert.equal(address.hash(), RESET_LINK, name);
      assert.deepEqual(shownMessages(root), [failure.failure.message], name);
      assert.equal(pageDocument().activeElement, repeated, name);
      assert.equal(submitIn(root).textContent, "Ustaw hasło", name);
      assert.equal(lockOf(root).includes(true), false, name);
      assert.deepEqual(
        inputsIn(root).map((input) => input.value),
        [NEW_PASSWORD, NEW_PASSWORD],
        name,
      );

      const button = submitIn(root);
      button.focus();
      await sendForm(formIn(root));
      assert.deepEqual(
        held.calls.map(({ name: call, args }) => [call, ...args]),
        [["setPassword", RESET_TOKEN, NEW_PASSWORD, NEW_PASSWORD]],
        name,
      );
      assert.deepEqual(shownMessages(root), [], name);
      await held.answer("setPassword", failure);
      assert.equal(pageDocument().activeElement, button, name);
    });
  }
});
