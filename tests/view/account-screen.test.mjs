// The page before and after signing in (task konta-graczy-i-logowanie, To do 1, 3, 4, 5 and 15;
// spec section 7; D-96, D-97) and with its saved game state (task zapis-stanu-na-serwerze, To do
// 5–10; spec sections 7 and 8; D-96, D-97, D-208, D-209, D-210, D-211, D-212). These tests run the
// page's logic on a hand-made document model: they prove which elements it builds and what it does
// with the client's answers, never real events, focus or rendering, which the browser check covers
// (D-88).
import assert from "node:assert/strict";
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
} from "../../dist/public/sim/game.js";
import {
  createProgram,
  deleteProgram,
  discardCopyChanges,
  pickProgram,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../../dist/public/sim/programs.js";
import { buyBranch } from "../../dist/public/sim/skills.js";
import { registrationProblems } from "../../dist/public/view/account-screen.js";
import { programFromRules } from "../sim/program-fixture.mjs";

// --- a document model with just what the page and the game build ---------------------------

class FakeElement {
  constructor(tag) {
    this.tag = tag.toLowerCase();
    this.children = [];
    this.parent = null;
    this.attributes = new Map();
    this.listeners = new Map();
    this.className = "";
    this.hidden = false;
    this.value = "";
    this.dataset = {};
    this.style = {};
    this.ownText = "";
    this.isDisabled = false;
  }

  get disabled() {
    return this.isDisabled;
  }

  // As in a browser, an element that becomes disabled loses keyboard focus.
  set disabled(value) {
    this.isDisabled = Boolean(value);
    if (this.isDisabled && fakeDocument.activeElement === this)
      fakeDocument.activeElement = fakeDocument.body;
  }

  get textContent() {
    if (this.children.length === 0) return this.ownText;
    return this.children.map((child) => child.textContent).join("");
  }

  set textContent(text) {
    for (const child of this.children) child.parent = null;
    this.children = [];
    this.ownText = String(text);
  }

  get classList() {
    const element = this;
    const names = () => element.className.split(/\s+/).filter(Boolean);
    return {
      add(...added) {
        element.className = [...new Set([...names(), ...added])].join(" ");
      },
      remove(...removed) {
        element.className = names()
          .filter((name) => !removed.includes(name))
          .join(" ");
      },
      toggle(name, force) {
        const on = force ?? !names().includes(name);
        if (on) this.add(name);
        else this.remove(name);
        return on;
      },
      contains: (name) => names().includes(name),
    };
  }

  get options() {
    return this.children.filter((child) => child.tag === "option");
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  append(...items) {
    for (const item of items) {
      const child =
        typeof item === "string"
          ? Object.assign(new FakeElement("#text"), { ownText: item })
          : item;
      child.remove();
      child.parent = this;
      this.children.push(child);
    }
  }

  appendChild(child) {
    this.append(child);
    return child;
  }

  replaceChildren(...items) {
    for (const child of this.children) child.parent = null;
    this.children = [];
    this.ownText = "";
    this.append(...items);
  }

  remove() {
    if (!this.parent) return;
    this.parent.children = this.parent.children.filter(
      (child) => child !== this,
    );
    this.parent = null;
  }

  contains(other) {
    for (let node = other; node; node = node.parent)
      if (node === this) return true;
    return false;
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }

  /** Calls the element's listeners of `type` as the browser would for that event. */
  fire(type) {
    const event = {
      type,
      target: this,
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      },
    };
    for (const listener of this.listeners.get(type) ?? []) listener(event);
    return event;
  }

  focus() {
    if (!this.isDisabled) fakeDocument.activeElement = this;
  }

  querySelectorAll() {
    return [];
  }

  closest() {
    return null;
  }
}

const fakeDocument = {
  body: null,
  activeElement: null,
  visibilityState: "visible",
  listeners: new Map(),
  createElement: (tag) => new FakeElement(tag),
  createElementNS: (_namespace, tag) => new FakeElement(tag),
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(listener);
  },
  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener);
  },
};

/**
 * The intervals a game in the page keeps running: its clock and its saver's check every 30 real
 * seconds (D-207).
 */
const GAME_INTERVALS = 2;

/** Runs `body` with the document model as the page's document and Node's mocked intervals. */
async function onPage(body) {
  const saved = {
    document: globalThis.document,
    HTMLElement: globalThis.HTMLElement,
    Option: globalThis.Option,
  };
  fakeDocument.body = new FakeElement("body");
  fakeDocument.activeElement = fakeDocument.body;
  fakeDocument.visibilityState = "visible";
  fakeDocument.listeners = new Map();
  globalThis.document = fakeDocument;
  globalThis.HTMLElement = FakeElement;
  globalThis.Option = class extends FakeElement {
    constructor(text, value) {
      super("option");
      this.textContent = text;
      this.value = value;
    }
  };
  // The saver's retries wait on setTimeout; mocked, they run only when a case moves time on.
  mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
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
    await body({ root: fakeDocument.body, intervals: live });
  } finally {
    globalThis.setInterval = mockedSet;
    globalThis.clearInterval = mockedClear;
    mock.timers.reset();
    Object.assign(globalThis, saved);
  }
}

function all(root) {
  return [root, ...root.children.flatMap(all)];
}

function byClass(root, name) {
  return all(root).filter((element) => element.classList.contains(name));
}

/** Whether an element and every ancestor up to the page's body are shown. */
function shown(element) {
  for (let node = element; node; node = node.parent) {
    if (node.hidden) return false;
    if (node === fakeDocument.body) return true;
  }
  return false;
}

function buttonNamed(root, text) {
  return all(root).find(
    (element) => element.tag === "button" && element.textContent === text,
  );
}

function shownAlerts(root) {
  return all(root).filter(
    (element) => element.getAttribute("role") === "alert" && shown(element),
  );
}

/** The game in the page: its program panel and its headquarters. */
function gameShown(root) {
  return (
    byClass(root, "program-panel").length > 0 ||
    byClass(root, "headquarters").length > 0
  );
}

/** The two forms by their headings: each form with its inputs, button and warning. */
function forms(root) {
  return Object.fromEntries(
    byClass(root, "account-form").map((section) => {
      const heading = section.children.find((child) => child.tag === "h2");
      const form = all(section).find((element) => element.tag === "form");
      return [
        heading.textContent,
        {
          form,
          inputs: all(form).filter((element) => element.tag === "input"),
          labels: all(form).filter((element) => element.tag === "label"),
          button: all(form).find((element) => element.tag === "button"),
          warning: all(form).find(
            (element) => element.getAttribute("role") === "alert",
          ),
        },
      ];
    }),
  );
}

/** Lets the page act on an answer that has just come. */
async function settle() {
  for (let round = 0; round < 5; round += 1) await Promise.resolve();
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
      currentAccount: call("currentAccount"),
      logout: call("logout"),
      confirmEmail: call("confirmEmail"),
      sendConfirmationMessage: call("sendConfirmationMessage"),
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
  value: { id: "a1", email: "ala@example.com", emailConfirmed: true },
};
const UNCONFIRMED_ACCOUNT = {
  ok: true,
  value: { id: "a1", email: "ala@example.com", emailConfirmed: false },
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

/** The page address with a fragment the test sets, counting how often it is cleared. */
function fakeAddress(hash = "") {
  const address = {
    current: hash,
    cleared: 0,
    hash: () => address.current,
    clearFragment() {
      address.cleared += 1;
      address.current = "";
    },
  };
  return address;
}

async function startPage(held, address = fakeAddress()) {
  const { startApp } = await import("../../dist/public/view/app.js");
  startApp(fakeDocument.body, held.client, address);
  await settle();
}

async function signedOutPage(held) {
  await startPage(held);
  await held.answer("currentAccount", NO_SESSION);
  return forms(fakeDocument.body);
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
    const logout = buttonNamed(root, "Wyloguj");
    assert.ok(!logout || !shown(logout), "„Wyloguj” is not shown");

    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, GAME_INTERVALS);
    const header = root.children.find((child) => child.tag === "header");
    assert.ok(
      shown(buttonNamed(header, "Wyloguj")),
      "„Wyloguj” stands in the header",
    );
  });
});

test("an answer of no session shows the two forms with visible labels, and no game", async () => {
  await onPage(async ({ root, intervals }) => {
    const shownForms = await signedOutPage(heldClient());
    assert.deepEqual(Object.keys(shownForms), ["Zaloguj się", "Załóż konto"]);
    const login = shownForms["Zaloguj się"];
    const register = shownForms["Załóż konto"];
    assert.deepEqual(
      login.inputs.map((input) => input.type),
      ["text", "password"],
    );
    assert.deepEqual(
      register.inputs.map((input) => input.type),
      ["text", "password", "password"],
    );
    for (const { inputs, labels } of [login, register]) {
      assert.deepEqual(
        labels.map((label) => label.htmlFor),
        inputs.map((input) => input.id),
      );
    }
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0);
    assert.ok(!shown(buttonNamed(root, "Wyloguj")));
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
      retry.fire("click");
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

test("a sent login waits with both forms locked, and a refusal leaves one warning under it and focus where the player sent it from", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { "Zaloguj się": login, "Załóż konto": register } =
      await signedOutPage(held);
    const [email, password] = login.inputs;
    email.value = "ala@example.com";
    password.value = "dwanaście znaków";
    password.focus();
    login.form.fire("submit");
    await settle();

    assert.deepEqual(
      held.calls.map(({ name, args }) => [name, ...args]),
      [["login", "ala@example.com", "dwanaście znaków"]],
    );
    assert.equal(login.button.textContent, "Logowanie…");
    for (const control of [
      ...login.inputs,
      ...register.inputs,
      login.button,
      register.button,
    ])
      assert.equal(control.disabled, true);
    // The other form sends nothing while one waits.
    register.form.fire("submit");
    login.form.fire("submit");
    await settle();
    assert.equal(held.calls.length, 1);

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
    for (const control of [
      ...login.inputs,
      ...register.inputs,
      login.button,
      register.button,
    ])
      assert.equal(control.disabled, false);
    assert.equal(fakeDocument.activeElement, password);
    assert.equal(gameShown(root), false);
  });
});

test("a lost connection on registration leaves one warning under that form and focus on its button", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    const { "Załóż konto": register } = await signedOutPage(held);
    const [email, password, confirmation] = register.inputs;
    email.value = "ala@example.com";
    password.value = "dwanaście znaków";
    confirmation.value = "dwanaście znaków";
    register.button.focus();
    register.form.fire("submit");
    await settle();
    assert.equal(register.button.textContent, "Zakładanie konta…");
    await held.answer("register", NO_CONNECTION);
    assert.ok(shown(register.warning));
    assert.equal(register.warning.textContent, NO_CONNECTION.failure.message);
    assert.equal(shownAlerts(root).length, 1);
    assert.equal(register.button.textContent, "Załóż konto");
    assert.equal(fakeDocument.activeElement, register.button);
  });
});

test("a created account enters the game at once, and the forms keep no password", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const { "Zaloguj się": login, "Załóż konto": register } =
      await signedOutPage(held);
    login.inputs[1].value = "stare hasło z logowania";
    const [email, password, confirmation] = register.inputs;
    email.value = " Ala@Example.com ";
    password.value = "dwanaście znaków";
    confirmation.value = "dwanaście znaków";
    register.form.fire("submit");
    await settle();
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
    for (const input of [...login.inputs, ...register.inputs])
      if (input.type === "password") assert.equal(input.value, "");
  });
});

test("a registration the server would refuse sends nothing and marks the field at fault", async () => {
  await onPage(async () => {
    const held = heldClient();
    const { "Załóż konto": register } = await signedOutPage(held);
    const [email, password, confirmation] = register.inputs;
    email.value = "ala@example.com";
    password.value = "za krótkie";
    confirmation.value = "za krótkie";
    register.form.fire("submit");
    await settle();
    assert.equal(held.calls.length, 0);
    assert.equal(password.getAttribute("aria-invalid"), "true");
    assert.equal(email.getAttribute("aria-invalid"), null);
    assert.equal(fakeDocument.activeElement, password);
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

// --- logout ---------------------------------------------------------------------------------

async function signedInPage(held) {
  await startPage(held);
  await held.answer("currentAccount", ACCOUNT);
  await held.answer("loadSavedGame", NO_SAVE);
  return buttonNamed(fakeDocument.body, "Wyloguj");
}

test("a confirmed logout or an expired session removes the game and its clock and brings back the forms", async () => {
  for (const [name, answer] of Object.entries({
    "a confirmed logout": { ok: true, value: null },
    "an expired session": NO_SESSION,
  })) {
    await onPage(async ({ root, intervals }) => {
      const held = heldClient();
      const logout = await signedInPage(held);
      logout.focus();
      logout.fire("click");
      await settle();
      assert.equal(logout.disabled, true, name);
      assert.equal(logout.getAttribute("aria-busy"), "true", name);
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
      assert.deepEqual(
        Object.keys(forms(root)),
        ["Zaloguj się", "Załóż konto"],
        name,
      );
      assert.ok(!shown(logout), name);
    });
  }
});

test("a logout whose outcome is uncertain keeps the game with one warning, and „Wyloguj” stays usable", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const logout = await signedInPage(held);
    logout.focus();
    logout.fire("click");
    await settle();
    await held.answer("saveGame", { kind: "saved", revision: 1 });
    await held.answer("logout", NO_CONNECTION);
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, GAME_INTERVALS);
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [NO_CONNECTION.failure.message],
    );
    assert.equal(logout.disabled, false);
    assert.ok(shown(logout));
    assert.equal(fakeDocument.activeElement, logout);
    assert.deepEqual(forms(root), {});
  });
});

test("signing in and out again and again keeps at most one clock running", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const logout = await signedInPage(held);
    for (let round = 0; round < 3; round += 1) {
      assert.equal(intervals.size, GAME_INTERVALS);
      logout.fire("click");
      await settle();
      await held.answer("saveGame", { kind: "saved", revision: round + 1 });
      await held.answer("logout", { ok: true, value: null });
      assert.equal(intervals.size, 0);
      const { "Zaloguj się": login } = forms(root);
      login.inputs[0].value = "ala@example.com";
      login.inputs[1].value = "dwanaście znaków";
      login.form.fire("submit");
      await settle();
      await held.answer("login", ACCOUNT);
      await held.answer("loadSavedGame", NO_SAVE);
    }
    assert.equal(intervals.size, GAME_INTERVALS);
    assert.equal(byClass(root, "columns").length, 1);
  });
});

test("an answer that comes after the screen was left is ignored", async () => {
  await onPage(async () => {
    const { createAccountScreen } =
      await import("../../dist/public/view/account-screen.js");
    const held = heldClient();
    const signedIn = [];
    const screen = createAccountScreen(held.client, (account) =>
      signedIn.push(account),
    );
    fakeDocument.body.append(screen.element);
    const { "Zaloguj się": login } = forms(fakeDocument.body);
    login.inputs[0].value = "ala@example.com";
    login.inputs[1].value = "dwanaście znaków";
    login.form.fire("submit");
    await settle();
    screen.reset();
    assert.equal(login.inputs[1].value, "");
    assert.equal(login.button.disabled, false);
    await held.answer("login", ACCOUNT);
    assert.deepEqual(signedIn, []);
    assert.equal(login.button.textContent, "Zaloguj się");
  });
});

// --- the row of an unconfirmed address ------------------------------------------------------

/** The header row of the unconfirmed address and its parts, or null while the page shows none. */
function statusRow(root) {
  const header = root.children.find((child) => child.tag === "header");
  const row = byClass(header, "email-status").find(shown);
  if (!row) return null;
  const [sentence, button] = row.children;
  return { row, header, sentence, button };
}

test("a reload or sign-in with an unconfirmed address shows the row after the title and Wyloguj, and leaves it at logout", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", UNCONFIRMED_ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    const { header, row, sentence, button } = statusRow(root);
    assert.equal(sentence.textContent, "Adres e-mail niepotwierdzony.");
    assert.equal(sentence.classList.contains("warning"), false);
    assert.equal(button.textContent, "Wyślij ponownie");
    const logout = buttonNamed(header, "Wyloguj");
    const order = header.children.filter(
      (child) => child === row || child.tag === "h1" || child === logout,
    );
    assert.deepEqual(
      order.map((child) => child.tag),
      ["h1", "button", "div"],
    );

    logout.fire("click");
    await settle();
    await held.answer("saveGame", { kind: "saved", revision: 1 });
    await held.answer("logout", { ok: true, value: null });
    assert.equal(statusRow(root), null);
    assert.equal(header.children.includes(row), false);

    // Signing in again with the same account brings the row back, once.
    const { "Zaloguj się": login } = forms(root);
    login.inputs[0].value = "ala@example.com";
    login.inputs[1].value = "dwanaście znaków";
    login.form.fire("submit");
    await settle();
    await held.answer("login", UNCONFIRMED_ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(byClass(header, "email-status").length, 1);
    assert.equal(
      statusRow(root).sentence.textContent,
      "Adres e-mail niepotwierdzony.",
    );
  });
});

test("a confirmed address shows no row", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    assert.equal(statusRow(root), null);
  });
});

test("a created account starts the row with the outcome of its first message", async () => {
  const outcomes = {
    sent: "Wysłaliśmy odnośnik potwierdzający na ala@example.com.",
    limited: "Za dużo wiadomości. Spróbuj ponownie za godzinę.",
    failed: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
  };
  for (const [message, sentence] of Object.entries(outcomes)) {
    await onPage(async ({ root }) => {
      const held = heldClient();
      const { "Załóż konto": register } = await signedOutPage(held);
      const [email, password, confirmation] = register.inputs;
      email.value = "ala@example.com";
      password.value = "dwanaście znaków";
      confirmation.value = "dwanaście znaków";
      register.form.fire("submit");
      await settle();
      await held.answer("register", {
        ok: true,
        value: {
          ...UNCONFIRMED_ACCOUNT.value,
          confirmationMessage: message,
        },
      });
      await held.answer("loadSavedGame", NO_SAVE);
      assert.equal(statusRow(root).sentence.textContent, sentence, message);
    });
  }
});

test("Wyślij ponownie sends one request for the signed-in account and shows its outcome in the row", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", UNCONFIRMED_ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);
    const { button, sentence } = statusRow(root);
    button.fire("click");
    await settle();
    assert.deepEqual(
      held.calls.map((entry) => entry.name),
      ["sendConfirmationMessage"],
    );
    assert.equal(button.textContent, "Wysyłanie…");
    await held.answer("sendConfirmationMessage", {
      ok: true,
      value: "limited",
    });
    assert.equal(
      sentence.textContent,
      "Za dużo wiadomości. Spróbuj ponownie za godzinę.",
    );
    assert.equal(sentence.classList.contains("warning"), true);
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
    const main = notice.parent;
    assert.equal(main.children.indexOf(notice), 0);
    assert.equal(gameShown(main), true);

    buttonNamed(root, "Wyloguj").fire("click");
    await settle();
    await held.answer("saveGame", { kind: "saved", revision: 1 });
    await held.answer("logout", CONFIRMED);
    assert.equal(noticeOf(root).length, 0);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się", "Załóż konto"]);
  });
});

test("a refused link stands in warning above the forms for a player who is not signed in, and the fragment goes", async () => {
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
    assert.equal(notice.parent.children.indexOf(notice), 0);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się", "Załóż konto"]);
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
    buttonNamed(root, "Spróbuj ponownie").fire("click");
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
const VERSION = 1;
const withCharacter = () => createCharacter(newGame(), "Ala").state;
/** A game whose map run passes: Ala sent to the forest at the real date 0, unpaused. */
const passing = () =>
  send(withCharacter(), { mapId: "forest", characterId: 1 }, 0).state;
/** A game state as plain JSON, as it travels in a save. */
const plain = (state) => JSON.parse(JSON.stringify(state));
/** The server's answer holding a save of `game` at `revision`. */
const saveOf = (game, revision, version = VERSION) => ({
  ok: true,
  value: { version, revision, game: plain(game) },
});
/** What the page sends to save `game` on the basis of `basedOn`. */
const submission = (game, basedOn) => ({
  version: VERSION,
  basedOn,
  game: plain(game),
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
  const { "Zaloguj się": login } = forms(fakeDocument.body);
  login.inputs[0].value = account.value.email;
  login.inputs[1].value = "dwanaście znaków";
  login.form.fire("submit");
  await settle();
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
  buttonNamed(fakeDocument.body, "4×").fire("click");
  await settle();
  // The map run came back paused (D-212), and the pace is the player's change.
  const kept = { ...passing(), paused: true, pace: 4 };
  assert.deepEqual(argsOf(held, "saveGame"), [submission(kept, 4)]);
  await held.answer("saveGame", { kind: "signed-out" });
  return kept;
}

// invariant: expired-session-unsaved-progress
// Task zapis-stanu-na-serwerze, To do 9; D-203, D-211. Catches the state lost at the 401, the game
// left running beside the forms, the save asked for again instead of the kept state sent, and the
// kept state sent on another basis than the revision last seen.
test("a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to the game from it", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    const kept = await expiredPage(held);
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0, "the game's time stops");
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się", "Załóż konto"]);
    assert.deepEqual(
      shownAlerts(root).map((alert) => alert.textContent),
      [EXPIRED],
    );
    assert.ok(!shown(buttonNamed(root, "Wyloguj")));

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

    buttonNamed(root, "Wyloguj").fire("click");
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

/** A game whose map run ended in Ala's death, the pause of each discovery lifted by the player. */
function ended() {
  let state = passing();
  for (let round = 0; round < 50 && !mapRunEnded(state.run); round += 1)
    state = advanceMinutes(setPaused(state, false).state, 5000).state;
  assert.ok(state.run.death, "precondition: the map run ended in a death");
  return state;
}

/** The header's line of saving, or null while it says nothing. */
function saveLine(root) {
  const header = root.children.find((child) => child.tag === "header");
  return byClass(header, "save-line").find(shown) ?? null;
}

/** The page's sentences above the screen, in the order they stand. */
const pageNotices = (root) =>
  byClass(root, "page-notice")
    .filter(shown)
    .map((notice) => notice.textContent);

// Spec section 7; D-96. Catches a game built before the saved game state answers, and a new game
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
    assert.ok(!shown(buttonNamed(root, "Wyloguj")));

    await held.answer("loadSavedGame", NO_SAVE);
    assert.ok(shown(byClass(root, "headquarters")[0]));
    mock.timers.tick(30_000);
    await settle();
    assert.deepEqual(waitingCalls(held), [], "an untouched game is not saved");
  });
});

// To do 6; D-212. Catches a loaded map run left running, at another pace, or moved to the
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
      assert.ok(shown(byClass(root, "run-panel")[0]), name);
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
      element.tag === "input" && element.getAttribute("aria-label") === label,
  );
  assert.ok(input, `a field „${label}” stands`);
  return input;
}

/** The button the page names `label` for assistive technology. */
function buttonLabelled(root, label) {
  const button = all(root).find(
    (element) =>
      element.tag === "button" && element.getAttribute("aria-label") === label,
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
      element.tag === "select" && element.getAttribute("aria-label") === label,
  );

function pickOn(list, value) {
  list.value = value;
  list.fire("change");
}

/**
 * Each act of the player D-207 names, made once on a game built from `start`: `act` clicks, types
 * or picks it on the page, and `expected` is the game state it leaves, from the simulation call the
 * act stands for, or `check` a trait of the saved state where its exact value is not the page's.
 */
const ACTS = [
  {
    name: "an edit of a program",
    start: twoPrograms,
    act: (root) => buttonNamed(root, "Dodaj grupę").fire("click"),
    check: (game, start) => {
      assert.equal(
        game.programs[0].program.groups.length,
        start.programs[0].program.groups.length + 1,
      );
      assert.deepEqual(game.programs[1], plain(start.programs[1]));
    },
  },
  {
    name: "an edit of the copy",
    start: pausedRun,
    act: (root) => buttonNamed(root, "Dodaj grupę").fire("click"),
    check: (game, start) => {
      assert.equal(
        game.run.copy.program.groups.length,
        start.run.copy.program.groups.length + 1,
      );
      assert.deepEqual(game.programs, plain(start.programs));
    },
  },
  {
    name: "an edit of a program's trip plan",
    start: knowingSticks,
    act: (root) =>
      buttonLabelled(root, "Zabierz: dodaj przedmiot").fire("click"),
    check: (game, start) => {
      assert.deepEqual(game.programs[0].program, {
        ...plain(start.programs[0].program),
        tripPlan: { take: [{ item: "stick", count: 1 }], bring: [] },
      });
      assert.deepEqual(game.programs[1], plain(start.programs[1]));
    },
  },
  {
    name: "buying a branch rank",
    start: eatingPoint,
    act: (root) => buttonLabelled(root, "Kup: Szybki posiłek").fire("click"),
    expected: (start) => buyBranch(start, 1, "quickMeal").state,
  },
  {
    name: "„Nowy program”",
    start: twoPrograms,
    act: (root) => buttonNamed(root, "Nowy program").fire("click"),
    expected: (start) => createProgram(start).state,
  },
  {
    name: "„Zmień nazwę”",
    start: twoPrograms,
    act: (root) => {
      buttonNamed(root, "Zmień nazwę").fire("click");
      inputLabelled(root, "Nazwa programu").value = "Zbieranie";
      buttonNamed(root, "Zapisz").fire("click");
    },
    expected: (start) => renameProgram(start, 1, "Zbieranie").state,
  },
  {
    name: "„Usuń”",
    start: twoPrograms,
    act: (root) => buttonNamed(root, "Usuń").fire("click"),
    expected: (start) => deleteProgram(start, 1).state,
  },
  {
    name: "„Zapisz w programie”",
    start: changedCopy,
    act: (root) => buttonNamed(root, "Zapisz w programie").fire("click"),
    expected: (start) => saveCopyIntoProgram(start).state,
  },
  {
    name: "„Zapisz jako nowy program”",
    start: changedCopy,
    act: (root) => {
      buttonNamed(root, "Zapisz jako nowy program").fire("click");
      inputLabelled(root, "Nazwa programu").value = "Las";
      buttonNamed(root, "Zapisz").fire("click");
    },
    expected: (start) => saveCopyAsNewProgram(start, "Las").state,
  },
  {
    name: "„Porzuć zmiany”",
    start: changedCopy,
    act: (root) => buttonNamed(root, "Porzuć zmiany").fire("click"),
    expected: (start) => discardCopyChanges(start).state,
  },
  {
    name: "„Przełącz postać na ten program”",
    start: pausedRun,
    act: (root) => {
      pickOn(listLabelled(root, "Program:"), "2");
      buttonNamed(root, "Przełącz postać na ten program").fire("click");
    },
    expected: (start) => switchProgram(start, 2).state,
  },
  {
    name: "creating a character",
    start: twoPrograms,
    act: (root) => {
      inputLabelled(root, "Imię nowej postaci").value = "Ola";
      buttonNamed(root, "Załóż").fire("click");
    },
    expected: (start) => createCharacter(start, "Ola").state,
  },
  {
    name: "the pick on a headquarters row",
    start: twoPrograms,
    act: (root) => pickOn(listLabelled(root, "Program: Ala"), "2"),
    expected: (start) => pickProgram(start, 1, 2).state,
  },
  {
    name: "sending",
    start: twoPrograms,
    act: (root) => buttonNamed(root, "Wyślij").fire("click"),
    // The send takes the real date as its time, so its seed is not this case's to write.
    check: (game) => {
      assert.equal(game.run.mapId, "forest");
      assert.equal(game.run.character.id, 1);
    },
  },
  {
    name: "„Restart”",
    start: pausedRun,
    act: (root) => buttonNamed(root, "Restart").fire("click"),
    expected: (start) => restart(start).state,
  },
  {
    name: "„Zakończ”",
    start: pausedRun,
    act: (root) => buttonNamed(root, "Zakończ").fire("click"),
    expected: (start) => end(start).state,
  },
  {
    name: "„Wznów”",
    start: pausedRun,
    act: (root) => buttonNamed(root, "Wznów").fire("click"),
    expected: (start) => setPaused(start, false).state,
  },
  {
    name: "a pace",
    start: pausedRun,
    act: (root) => buttonNamed(root, "2×").fire("click"),
    expected: (start) => setPace(start, 2).state,
  },
];

// To do 7; D-207, decision 6's list. Catches an act of the player whose change is left to the next
// 30-second check or to the hidden page, and an act that changes nothing sending a save.
test("each act of the player that changes the game state is saved at once, and one that changes nothing sends nothing", async () => {
  const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
  // The clock reads no real time, so an act that starts the map run again leaves no carried time.
  Object.defineProperty(globalThis, "performance", {
    configurable: true,
    value: { now: () => 0 },
  });
  try {
    for (const { name, start, act, expected, check } of ACTS) {
      await onPage(async ({ root }) => {
        const held = heldClient();
        const begun = start();
        await startPage(held);
        await held.answer("currentAccount", ACCOUNT);
        await held.answer("loadSavedGame", saveOf(begun, 4));
        assert.deepEqual(waitingCalls(held), [], `${name}: precondition`);
        act(root);
        await settle();
        assert.deepEqual(waitingCalls(held), ["saveGame"], name);
        const [sent] = argsOf(held, "saveGame");
        assert.equal(sent.basedOn, 4, name);
        if (expected) assert.deepEqual(sent.game, plain(expected(begun)), name);
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
    await held.answer("loadSavedGame", saveOf(twoPrograms(), 4));
    // Without a map run the pause changes nothing (setPaused); its button stands, unlabelled.
    const pause = all(byClass(root, "status-row")[0]).find(
      (element) => element.tag === "button" && element.textContent === "",
    );
    pause.fire("click");
    await settle();
    assert.deepEqual(waitingCalls(held), []);
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

// To do 7; D-207. Catches a death left unsaved until the next 30-second check.
test("a game minute that ends the map run in a death is saved at once", async () => {
  await onPage(async ({ root }) => {
    const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
    let now = 0;
    // The clock measures real time; this case moves it on by hand.
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: { now: () => now },
    });
    try {
      const held = heldClient();
      await startPage(held);
      await held.answer("currentAccount", ACCOUNT);
      await held.answer("loadSavedGame", saveOf(lastMinute(), 4));
      buttonNamed(root, "Wznów").fire("click");
      await settle();
      await held.answer("saveGame", { kind: "saved", revision: 5 });
      assert.deepEqual(waitingCalls(held), []);

      // Five real seconds at 1× are five game minutes; the first of them ends in the death.
      now += 5_000;
      mock.timers.tick(200);
      await settle();
      const [sent] = argsOf(held, "saveGame");
      assert.equal(sent.basedOn, 5);
      assert.equal(sent.game.run.death.cause, "cold");
    } finally {
      Object.defineProperty(globalThis, "performance", saved);
    }
  });
});

// To do 6; D-96. Catches a new game built when the saved game state cannot be had, a retry that
// asks for the save alone, and a 401 read as a failure.
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
      buttonNamed(root, "Spróbuj ponownie").fire("click");
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
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się", "Załóż konto"]);
    assert.equal(gameShown(root), false);
  });
});

// To do 5; D-96, D-206. Catches a refused save loaded in part, the sentence of another version
// for a damaged save, the sentence missing or under the confirmation notice, and the refused save
// left on the server to come back at the next sign-in.
test("a refused save starts a new game with its one-time sentence above it, after a confirmation notice, and saves the new game at once on the server's revision", async () => {
  const foreign = plain(withCharacter());
  foreign.team.characters[0].archetypeId = "nieznany";
  for (const [name, save, sentence] of [
    ["another version", saveOf(withCharacter(), 7, 2), OTHER_VERSION],
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
      const main = root.children.find((child) => child.tag === "main");
      const [confirmation, refusal, columns] = main.children;
      assert.equal(
        confirmation.textContent,
        "Adres e-mail potwierdzony.",
        name,
      );
      assert.equal(refusal.textContent, sentence, name);
      assert.equal(refusal.classList.contains("page-notice"), true, name);
      assert.equal(columns.className, "columns", name);
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

// To do 7; D-208. Catches the failure shown nowhere or below the row of an unconfirmed address, no
// retry, and the sentence left after a save succeeds.
test("a failed save shows its line under the title and „Wyloguj”, above the address row, and a retry that succeeds clears it", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", UNCONFIRMED_ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    assert.equal(saveLine(root), null, "hidden while it says nothing");
    buttonNamed(root, "4×").fire("click");
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
    const header = line.parent;
    const logout = buttonNamed(header, "Wyloguj");
    const row = byClass(header, "email-status")[0];
    const order = header.children.filter((child) =>
      [logout, line, row].includes(child),
    );
    assert.deepEqual(order, [logout, line, row]);

    mock.timers.tick(5_000);
    await settle();
    assert.deepEqual(argsOf(held, "saveGame"), [
      submission({ ...passing(), paused: true, pace: 4 }, 4),
    ]);
    await held.answer("saveGame", { kind: "saved", revision: 5 });
    assert.equal(saveLine(root), null);
  });
});

// To do 8; D-209. Catches the lost game kept on screen or running, the server's save not asked
// for, the sentence missing or not leaving at the first successful save, and a refused save on that
// path read as a conflict.
test("a conflict drops the game, asks for the server's save and builds from it with its sentence in the header until a save succeeds; a refused one there starts anew", async () => {
  await onPage(async ({ root, intervals }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    buttonNamed(root, "4×").fire("click");
    await settle();
    await held.answer("saveGame", { kind: "conflict" });
    assert.equal(gameShown(root), false);
    assert.equal(intervals.size, 0);
    assert.deepEqual(waitingCalls(held), ["loadSavedGame"]);
    assert.ok(shown(byClass(root, "session-check-text")[0]));
    assert.ok(!shown(buttonNamed(root, "Wyloguj")));

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

    buttonNamed(root, "8×").fire("click");
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
    buttonNamed(root, "4×").fire("click");
    await settle();
    await held.answer("saveGame", { kind: "conflict" });
    await held.answer("loadSavedGame", saveOf(withCharacter(), 6, 2));
    assert.deepEqual(pageNotices(root), [OTHER_VERSION]);
    assert.equal(saveLine(root), null);
    assert.deepEqual(argsOf(held, "saveGame"), [submission(newGame(), 6)]);
  });
});

/** The page signed in with a loaded map run, „Wyloguj” clicked; returns the button. */
async function loggingOutPage(held) {
  await startPage(held);
  await held.answer("currentAccount", ACCOUNT);
  await held.answer("loadSavedGame", saveOf(passing(), 4));
  const logout = buttonNamed(fakeDocument.body, "Wyloguj");
  logout.fire("click");
  await settle();
  assert.equal(logout.textContent, "Wylogowywanie…");
  assert.deepEqual(argsOf(held, "saveGame"), [
    submission({ ...passing(), paused: true }, 4),
  ]);
  return logout;
}

// To do 10; D-97. Catches a session ended after a failed save, a logout held back by a refusal
// that is for good, the update sentence missing, and the expiry path skipped at logout.
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
        pageNotices(root),
        sentence === null ? [] : [sentence],
        name,
      );
      assert.deepEqual(
        Object.keys(forms(root)),
        ["Zaloguj się", "Załóż konto"],
        name,
      );
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
    assert.equal(fakeDocument.activeElement, logout);
  });

  await onPage(async ({ root }) => {
    const held = heldClient();
    await loggingOutPage(held);
    await held.answer("saveGame", { kind: "signed-out" });
    assert.deepEqual(waitingCalls(held), [], "no logout without a session");
    assert.deepEqual(pageNotices(root), [EXPIRED]);
    await signIn(held, ACCOUNT);
    assert.deepEqual(argsOf(held, "saveGame"), [
      submission({ ...passing(), paused: true }, 4),
    ]);
  });
});

// D-97, D-210. Catches a stopped tab trying to save before logout, and the forms without the
// sentence of the update.
test("a tab that stopped saving as outdated logs out without a save and shows the update sentence above the forms", async () => {
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", saveOf(passing(), 4));
    buttonNamed(root, "4×").fire("click");
    await settle();
    await held.answer("saveGame", { kind: "outdated" });
    assert.equal(gameShown(root), true, "the game stays");
    assert.equal(saveLine(root).textContent, OUTDATED);

    buttonNamed(root, "Wyloguj").fire("click");
    await settle();
    assert.deepEqual(waitingCalls(held), ["logout"]);
    await held.answer("logout", { ok: true, value: null });
    assert.deepEqual(pageNotices(root), [OUTDATED]);
    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się", "Załóż konto"]);
  });
});

// D-97, D-211; the concern of slice 5. Catches the expiry path started while the logout's request
// is under way, and a logout that does not happen leaving the save's 401 unanswered.
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
      // The player acts while the server ends the session; that save finds none.
      buttonNamed(root, "8×").fire("click");
      await settle();
      assert.deepEqual(argsOf(held, "saveGame"), [
        submission({ ...passing(), paused: true, pace: 8 }, 5),
      ]);
      await held.answer("saveGame", { kind: "signed-out" });
      assert.equal(gameShown(root), true, `${name}: the logout decides`);
      assert.deepEqual(forms(root), {}, name);

      await held.answer("logout", answer);
      assert.equal(gameShown(root), false, name);
      if (answer.ok) {
        assert.deepEqual(pageNotices(root), [], name);
        await signIn(held, ACCOUNT);
        assert.deepEqual(waitingCalls(held), ["loadSavedGame"], name);
      } else {
        assert.deepEqual(pageNotices(root), [EXPIRED], name);
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
