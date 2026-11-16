// The focus on the login card after a refused emailed link and after „Anuluj” of the form „Ustaw
// nowe hasło” (D-381, D-225). The page runs on jsdom through tests/view/page-document.mjs, as
// account-screen.test.mjs does (D-264): these cases prove which element the page focuses, never a
// real browser's focus, which the check by hand covers (D-88).
import {
  assert,
  inAct,
  press,
  settle,
  typeInto,
  withPage,
} from "./page-document.mjs";
import { mock, test } from "node:test";

/** The real date the page's clock reads; the game built by a signed-in player keeps its clock. */
const CLOCK_MS = 1_760_000_000_000;

/** Runs `body` on a window of its own, with Node's mocked timers, so a game's clock never runs on. */
async function onPage(body) {
  await withPage(async ({ root }) => {
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    const date = mock.method(Date, "now", () => CLOCK_MS);
    try {
      await body({ root });
    } finally {
      mock.timers.reset();
      date.mock.restore();
    }
  });
}

const pageDocument = () => globalThis.document;

function all(root) {
  return [root, ...root.querySelectorAll("*")];
}

function byClass(root, name) {
  return all(root).filter((element) => element.classList.contains(name));
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
  const named = all(root).filter(
    (element) => element.localName === "button" && element.textContent === text,
  );
  return named.find(shown) ?? named[0];
}

/** Sends `form` inside act, as a browser does; the card stops the page's navigation. */
function sendForm(form) {
  assert.ok(form, "the form the case sends stands");
  return inAct(() => {
    const { Event } = globalThis.window;
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    return !form.dispatchEvent(submit);
  });
}

/** A client of the account API whose every answer the case gives when it chooses. */
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

/**
 * The forms of the card under the name of their state, as the account-screen cases read them: the
 * heading of a state without the switch, else the selected button of the switch.
 */
function forms(root) {
  return Object.fromEntries(
    byClass(root, "account-form").map((section) => {
      const heading = [...section.children].find(
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
          button: all(form).find((element) => element.localName === "button"),
        },
      ];
    }),
  );
}

/** The page's address with a fragment the case sets, and a history of its own, as the page uses it. */
function fakeAddress(hash) {
  const address = {
    entries: [hash],
    index: 0,
    cleared: 0,
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
    reload() {},
    onChange: () => () => undefined,
  };
  return address;
}

async function startPage(held, address) {
  const { startApp } = await import("../../dist/browser/view/app.js");
  await inAct(() => startApp(pageDocument().body, held.client, address));
  await settle();
}

const TOKEN = "cmVzZXRyZXNldHJlc2V0cmVzZXRyZXNldHJlc2V0cmVzZXQ";
const RESET_LINK = `#reset-password=${TOKEN}`;
const NEW_PASSWORD = "nowe hasło 123";

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
const ACCOUNT = {
  ok: true,
  value: {
    id: "a1",
    email: "ala@example.com",
    emailConfirmed: true,
    previousSaveAllowed: false,
  },
};
const NO_SAVE = { ok: true, value: null };
/** The server's refusal of a reset link that does not work, whatever its reason (D-225). */
const LINK_REFUSED = {
  ok: false,
  failure: {
    kind: "refused",
    status: 400,
    code: "invalid-link",
    message: "Odnośnik jest nieważny albo wygasł.",
  },
};

/** The first field of the card's form „Zaloguj się”, where a focus after the card lands. */
const cardField = (root) => forms(root)["Zaloguj się"].inputs[0];

/** Opens the page on the form „Ustaw nowe hasło”, types the password and sends the form. */
async function sendResetForm(held, root) {
  await startPage(held, fakeAddress(RESET_LINK));
  const form = forms(root)["Ustaw nowe hasło"];
  await typeInto(form.inputs[0], NEW_PASSWORD);
  await typeInto(form.inputs[1], NEW_PASSWORD);
  await sendForm(form.form);
}

// D-381: a refused emailed link followed by the card for a player who is not signed in leaves the
// focus in the card's first field, not on the page. Catches a refused link that shows the card
// without moving focus to it.
test("a refused reset link moves focus to the first field of the card the session check shows", async () => {
  // decision: D-381 "…after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło” — and the card closes from its own handlers of an answer and of a click, never while it is being drawn."
  await onPage(async ({ root }) => {
    const held = heldClient();
    await sendResetForm(held, root);
    await held.answer("setPassword", LINK_REFUSED);
    await held.answer("currentAccount", NO_SESSION);

    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
    assert.equal(pageDocument().activeElement, cardField(root));
  });
});

// D-381: „Anuluj” of the form „Ustaw nowe hasło” is named with the refused link as a moment the card
// takes the focus. Catches „Anuluj” that shows the card with the focus left on the page.
test("„Anuluj” moves focus to the first field of the card the session check shows", async () => {
  // decision: D-381 "…after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło” — and the card closes from its own handlers of an answer and of a click, never while it is being drawn."
  await onPage(async ({ root }) => {
    const held = heldClient();
    await startPage(held, fakeAddress(RESET_LINK));
    await press(buttonNamed(root, "Anuluj"));
    await held.answer("currentAccount", NO_SESSION);

    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
    assert.equal(pageDocument().activeElement, cardField(root));
  });
});

// D-381 and D-262: the session check that failed is answered again at „Spróbuj ponownie”, and the
// card it then shows still follows the refused link. Catches a focus that is spent by the failed
// check, so the retry shows the card with the focus on the page.
test("a refused link whose session check fails and passes at the retry still moves focus to the card", async () => {
  // decision: D-381 "…after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło” — and the card closes from its own handlers of an answer and of a click, never while it is being drawn."
  // decision: D-262 "At each entry into the warning with „Spróbuj ponownie”, the first and one after a retry, focus moves to that button."
  await onPage(async ({ root }) => {
    const held = heldClient();
    await sendResetForm(held, root);
    await held.answer("setPassword", LINK_REFUSED);
    await held.answer("currentAccount", NO_CONNECTION);
    await press(buttonNamed(root, "Spróbuj ponownie"));
    await settle();
    await held.answer("currentAccount", NO_SESSION);

    assert.deepEqual(Object.keys(forms(root)), ["Zaloguj się"]);
    assert.equal(pageDocument().activeElement, cardField(root));
  });
});

// D-381: a refused link that the session check takes to the game changes nothing: no card stands
// and the page does not move focus into one. Catches a focus call made before the check decides
// between the card and the game.
test("a refused reset link of a signed-in player opens the game and no card takes focus", async () => {
  // decision: D-381 "Where the session check leads to the game instead, nothing changes."
  await onPage(async ({ root }) => {
    const held = heldClient();
    await sendResetForm(held, root);
    await held.answer("setPassword", LINK_REFUSED);
    await held.answer("currentAccount", ACCOUNT);
    await held.answer("loadSavedGame", NO_SAVE);

    assert.equal(byClass(root, "account-card").length, 0);
    const focused = pageDocument().activeElement;
    assert.equal(
      byClass(root, "account-card").some((card) => card.contains(focused)),
      false,
    );
  });
});
