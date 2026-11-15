// The owner's panel on the page (D-280, D-281, D-410, D-411) on jsdom through tests/view/page-document.mjs
// (D-264): the page is started through `startApp` at the address the case sets, with a client whose
// calls the case answers when it chooses, so that the sign-in, the menu „Konto”, the link „Panel
// właściciela” and the list of accounts run as a player meets them. The address is the window's own
// (`browserAddress`), so a link followed in the page moves it as a browser does. The look and the
// focus are the browser check's (D-88).
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

// Each case has a time limit of its own, so that a call the product does not make fails the case
// instead of waiting for the test runner's default.
const CASE_LIMIT_MS = 15_000;
const bounded = (name, body) => test(name, { timeout: CASE_LIMIT_MS }, body);

const pageDocument = () => globalThis.document;
const all = (root, selector) => [...root.querySelectorAll(selector)];
const buttonNamed = (root, text) =>
  all(root, "button").find((button) => button.textContent === text);

const OWNER = {
  id: "a1",
  email: "boss@example.test",
  emailConfirmed: true,
  previousSaveAllowed: false,
  role: "owner",
};
const PLAYER = {
  ...OWNER,
  id: "a2",
  email: "ala@example.test",
  role: "player",
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
const NO_RIGHT = {
  ok: false,
  failure: {
    kind: "refused",
    status: 403,
    code: "owner-forbidden",
    message: "a message of the server",
  },
};
const LIST = [
  {
    email: "one@example.test",
    role: "player",
    blocked: false,
    previousSaveAllowed: false,
  },
  {
    email: "two@example.test",
    role: "player",
    blocked: true,
    previousSaveAllowed: true,
  },
];

/**
 * The page started through `startApp` at `hash`, with a client that holds every call until the case
 * answers it. `named` gives the calls of one method in the order they were made.
 */
async function startedPage(hash) {
  globalThis.history.replaceState(null, "", hash);
  const { startApp } = await import("../../dist/browser/view/app.js");
  const { browserAddress } =
    await import("../../dist/browser/view/email-confirmation.js");
  const calls = [];
  const hold =
    (name) =>
    (...args) =>
      new Promise((resolve) => {
        calls.push({ name, args, resolve });
      });
  const client = {
    currentAccount: hold("currentAccount"),
    login: hold("login"),
    loadSavedGame: hold("loadSavedGame"),
    loadPreviousSavedGame: hold("loadPreviousSavedGame"),
    listAccounts: hold("listAccounts"),
    saveGame: hold("saveGame"),
    logout: hold("logout"),
    reportBrowserFailure: () => Promise.resolve({ ok: true, value: null }),
  };
  await inAct(() => startApp(pageDocument().body, client, browserAddress()));
  await settle();
  return {
    named: (name) => calls.filter((entry) => entry.name === name),
    async answer(name, result) {
      const index = calls.findIndex((entry) => entry.name === name);
      assert.notEqual(index, -1, `no ${name} call is waiting`);
      const [entry] = calls.splice(index, 1);
      entry.resolve(result);
      await settle();
    },
  };
}

/**
 * Runs a case on a window of its own. The game in the page keeps a clock running every real second,
 * so the intervals are Node's mocked ones, which stop the process from waiting on them; the case's
 * own timers stay real.
 */
async function onPage(body) {
  await withPage(async () => {
    mock.timers.enable({ apis: ["setInterval"] });
    try {
      await body();
    } finally {
      mock.timers.reset();
    }
  });
}

/** Lets a followed fragment take effect, inside act, as the browser applies it between two events. */
const afterNavigation = () =>
  inAct(() => new Promise((resolve) => setTimeout(resolve, 10)));

const screenOf = () => pageDocument().body.querySelector(".accounts-screen");
const rowsOf = () =>
  all(pageDocument().body, ".accounts-row").map(
    (row) => row.querySelector(".accounts-email").textContent,
  );
const marked = () =>
  all(pageDocument().body, ".menu-bar-item[aria-current='page']").map(
    (link) => link.textContent,
  );

// decision: D-280 "the menu „Konto” of such an account holds, after the address and before its buttons, the link „Panel właściciela”"
// decision: D-281 "names the screen of the list of accounts (D-411) for an account with the owner role; for any other account it leads to no existing screen, falls under „any other” and opens Siedziba"
// decision: D-411 "shows every account sorted by its email address, and for each account its address, its blocked state, its previous-save privilege and its role"
bounded(
  "an owner signs in, opens the menu, follows „Panel właściciela” and the list of accounts stands with the rows the client gave",
  async () => {
    await onPage(async () => {
      const page = await startedPage("#/");
      await page.answer("currentAccount", NO_SESSION);
      const [email, password] = all(pageDocument().body, "input");
      await typeInto(email, OWNER.email);
      await typeInto(password, "test-password-1");
      await inAct(() =>
        fire(pageDocument().body.querySelector("form"), "submit"),
      );
      const [login] = page.named("login");
      assert.deepEqual(login.args, [OWNER.email, "test-password-1"]);
      await page.answer("login", { ok: true, value: OWNER });
      await page.answer("loadSavedGame", { ok: true, value: null });
      assert.deepEqual(marked(), ["Siedziba"], "the game stands on Siedziba");
      await press(buttonNamed(pageDocument().body, "Konto"));
      const link = all(pageDocument().body, ".account-menu-block a")[0];
      assert.equal(link.textContent, "Panel właściciela");
      await press(link);
      // jsdom does not follow an anchor that a synthetic click dispatches, so the case takes the
      // fragment the link carries, as a browser does when it follows it, and waits inside act for it.
      globalThis.location.hash = link.getAttribute("href");
      await afterNavigation();
      assert.equal(globalThis.location.hash, "#/konta", "the link leads there");
      assert.equal(
        pageDocument().body.querySelector(".account-menu-block"),
        null,
        "the menu is closed after the link",
      );
      const [read] = page.named("listAccounts");
      assert.deepEqual(
        read.args,
        [],
        "the list is read once the screen stands",
      );
      assert.ok(screenOf(), "the screen of the list stands");
      await page.answer("listAccounts", { ok: true, value: LIST });
      assert.deepEqual(rowsOf(), ["one@example.test", "two@example.test"]);
    });
  },
);

// decision: D-281 "for any other account it leads to no existing screen, falls under „any other” and opens Siedziba"
bounded(
  "a player's #/konta opens Siedziba and the list is never read",
  async () => {
    await onPage(async () => {
      const page = await startedPage("#/konta");
      await page.answer("currentAccount", { ok: true, value: PLAYER });
      await page.answer("loadSavedGame", { ok: true, value: null });
      assert.equal(screenOf(), null, "no screen of the list");
      assert.equal(page.named("listAccounts").length, 0, "no read of the list");
      assert.deepEqual(marked(), ["Siedziba"], "Siedziba stands");
    });
  },
);

// decision: D-281 "names the screen of the list of accounts (D-411) for an account with the owner role"
bounded(
  "after a reload at #/konta an owner stays on the screen of the list",
  async () => {
    await onPage(async () => {
      const page = await startedPage("#/konta");
      await page.answer("currentAccount", { ok: true, value: OWNER });
      await page.answer("loadSavedGame", { ok: true, value: null });
      assert.ok(screenOf(), "the screen of the list stands after the reload");
      assert.equal(page.named("listAccounts").length, 1, "read once");
      await page.answer("listAccounts", { ok: true, value: LIST });
      assert.ok(screenOf(), "still on the screen");
      assert.deepEqual(rowsOf(), ["one@example.test", "two@example.test"]);
    });
  },
);

// decision: D-411 "shows every account sorted by its email address, and for each account its address, its blocked state, its previous-save privilege and its role"
bounded(
  "a list refused as owner-forbidden shows the sentence that the account has no right to it",
  async () => {
    await onPage(async () => {
      const page = await startedPage("#/konta");
      await page.answer("currentAccount", { ok: true, value: OWNER });
      await page.answer("loadSavedGame", { ok: true, value: null });
      await page.answer("listAccounts", NO_RIGHT);
      const warnings = all(screenOf(), ".form-warning").map(
        (element) => element.textContent,
      );
      assert.deepEqual(warnings, ["To konto nie ma prawa do listy kont."]);
      assert.equal(rowsOf().length, 0);
    });
  },
);
