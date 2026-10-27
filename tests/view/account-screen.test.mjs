// The page before and after signing in (task konta-graczy-i-logowanie, To do 1, 3, 4, 5 and 15;
// spec section 7; D-94, D-95). These tests run the page's logic on a hand-made document model:
// they prove which elements it builds and what it does with the client's answers, never real
// events, focus or rendering, which the browser check covers (D-88).
import assert from "node:assert/strict";
import { mock, test } from "node:test";
import { registrationProblems } from "../../dist/public/view/account-screen.js";

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
  createElement: (tag) => new FakeElement(tag),
  createElementNS: (_namespace, tag) => new FakeElement(tag),
};

/** Runs `body` with the document model as the page's document and Node's mocked intervals. */
async function onPage(body) {
  const saved = {
    document: globalThis.document,
    HTMLElement: globalThis.HTMLElement,
    Option: globalThis.Option,
  };
  fakeDocument.body = new FakeElement("body");
  fakeDocument.activeElement = fakeDocument.body;
  globalThis.document = fakeDocument;
  globalThis.HTMLElement = FakeElement;
  globalThis.Option = class extends FakeElement {
    constructor(text, value) {
      super("option");
      this.textContent = text;
      this.value = value;
    }
  };
  mock.timers.enable({ apis: ["setInterval"] });
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

const ACCOUNT = { ok: true, value: { id: "a1", email: "ala@example.com" } };
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

async function startPage(held) {
  const { startApp } = await import("../../dist/public/view/app.js");
  startApp(fakeDocument.body, held.client);
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
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, 1);
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
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, 1);
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
    await held.answer("logout", NO_CONNECTION);
    assert.equal(gameShown(root), true);
    assert.equal(intervals.size, 1);
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
      assert.equal(intervals.size, 1);
      logout.fire("click");
      await settle();
      await held.answer("logout", { ok: true, value: null });
      assert.equal(intervals.size, 0);
      const { "Zaloguj się": login } = forms(root);
      login.inputs[0].value = "ala@example.com";
      login.inputs[1].value = "dwanaście znaków";
      login.form.fire("submit");
      await settle();
      await held.answer("login", ACCOUNT);
    }
    assert.equal(intervals.size, 1);
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
