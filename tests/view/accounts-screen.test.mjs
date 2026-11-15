// The screen of the list of accounts (D-411, D-410, D-281, D-44) on jsdom through
// tests/view/page-document.mjs (D-264): the entry of the screen with a stand-in of the account client,
// which is outside the product (the network), so that each request the screen makes is a call with
// the address it was made for. Real focus order and rendering are the browser check's (D-88), so a
// focus case here holds only what jsdom shows.
import {
  assert,
  fire,
  inAct,
  press,
  settle,
  withPage,
} from "./page-document.mjs";
import { test } from "node:test";
import { createAccountsEntry } from "../../dist/browser/view/accounts-entry.js";

// --- the page ------------------------------------------------------------------------------

const PORT = {
  current: () => ({ kind: "accounts" }),
  show() {},
  focusShown() {},
  focusIfLost() {},
};

const ONE = "one@example.test";
const TWO = "two@example.test";
const BOSS = "boss@example.test";

/** An account of the list, a player's unless `extra` says otherwise. */
const account = (email, extra = {}) => ({
  email,
  role: "player",
  blocked: false,
  previousSaveAllowed: false,
  ...extra,
});

const ok = (value) => ({ ok: true, value });
const refused = (status, code) => ({
  ok: false,
  failure: {
    kind: "refused",
    status,
    code,
    message: "a message of the server",
  },
});
const UNREACHABLE = {
  ok: false,
  failure: { kind: "unreachable", reason: "network", message: "no connection" },
};
const UNEXPECTED = {
  ok: false,
  failure: { kind: "unexpected", status: 200, message: "not a list" },
};

/** A promise the case settles by hand, to hold an answer while the screen waits for it. */
function deferred() {
  let resolve = () => {};
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

/**
 * A stand-in of the client: each call is recorded as `[name, ...arguments]` and answered with the
 * next answer queued for that method, a value or a promise.
 */
function makeClient() {
  const calls = [];
  const answers = {
    listAccounts: [],
    blockAccount: [],
    unblockAccount: [],
    grantPreviousSave: [],
    revokePreviousSave: [],
  };
  const client = Object.fromEntries(
    Object.keys(answers).map((name) => [
      name,
      (...values) => {
        calls.push([name, ...values]);
        const next = answers[name].shift();
        if (next === undefined) throw new Error(`no answer queued for ${name}`);
        return Promise.resolve(next);
      },
    ]),
  );
  return { client, calls, answers };
}

/** Builds the entry's screen in the page's body, as the registry builds it on entering `#/konta`. */
async function mount({ root }, client) {
  const signedOut = [];
  const entry = createAccountsEntry({
    client,
    onSignedOut: () => signedOut.push("signed out"),
  });
  let instance = null;
  await inAct(() => {
    instance = entry.build(PORT, { kind: "accounts" });
    root.append(instance.element);
  });
  return { instance, signedOut };
}

/** Lets the answers of a chain of requests, each waiting on the one before, reach the page. */
async function settleAll() {
  for (let round = 0; round < 4; round += 1) await settle();
}

const all = (root, selector) => [...root.querySelectorAll(selector)];
const rows = (root) => all(root, ".accounts-row");
const rowOf = (root, email) =>
  rows(root).find(
    (row) => row.querySelector(".accounts-email").textContent === email,
  );
const buttonOf = (root, text, email) =>
  root.querySelector(`button[aria-label="${text}: ${email}"]`);
const warning = (root) => root.querySelector(".form-warning");
const buttonTexts = (row) =>
  all(row, ".accounts-actions button").map((button) => button.textContent);

/** The screen with `list` as the server's first answer, settled. */
async function mountList(page, list) {
  const stand = makeClient();
  stand.answers.listAccounts.push(ok(list));
  const mounted = await mount(page, stand.client);
  await settleAll();
  return { ...stand, ...mounted };
}

// --- reading the list ----------------------------------------------------------------------

test("the list is read once when the screen is built, and a line stands in its place until the answer comes", async () => {
  await withPage(async (page) => {
    const stand = makeClient();
    const answer = deferred();
    stand.answers.listAccounts.push(answer.promise);
    await mount(page, stand.client);
    assert.deepEqual(stand.calls, [["listAccounts"]]);
    assert.equal(rows(page.root).length, 0, "no row stands before the answer");
    assert.match(
      page.root.querySelector(".accounts-loading")?.textContent,
      /Wczytywanie/,
    );
    await inAct(() => answer.resolve(ok([account(ONE)])));
    await settleAll();
    assert.equal(page.root.querySelector(".accounts-loading"), null);
    assert.equal(rows(page.root).length, 1);
    assert.deepEqual(stand.calls, [["listAccounts"]]);
  });
});

test("each account is a row with its address, blocked state, privilege and role, in the order the server gives", async () => {
  // decision: D-411 "shows every account sorted by its email address, and for each account its address, its blocked state, its previous-save privilege and its role"
  await withPage(async (page) => {
    // Not in the order of the addresses: the screen keeps the server's order.
    await mountList(page, [
      account(TWO, { blocked: true, previousSaveAllowed: true }),
      account(BOSS, { role: "owner" }),
      account(ONE),
    ]);
    const shown = rows(page.root);
    assert.deepEqual(
      shown.map((row) => row.querySelector(".accounts-email").textContent),
      [TWO, BOSS, ONE],
    );
    const cells = (email) => {
      const row = rowOf(page.root, email);
      return [".accounts-state", ".accounts-privilege", ".accounts-role"].map(
        (selector) => row.querySelector(selector).textContent,
      );
    };
    assert.deepEqual(cells(TWO), ["zablokowane", "tak", "gracz"]);
    assert.deepEqual(cells(BOSS), ["odblokowane", "nie", "właściciel"]);
    assert.deepEqual(cells(ONE), ["odblokowane", "nie", "gracz"]);
  });
});

test("a list with no account says so in one sentence and shows no row", async () => {
  await withPage(async (page) => {
    await mountList(page, []);
    assert.equal(rows(page.root).length, 0);
    assert.match(
      page.root.querySelector(".accounts-empty")?.textContent,
      /Nie ma żadnych kont\./,
    );
  });
});

test("a failed read stands as one sentence in warning with a retry, which reads the list again", async () => {
  await withPage(async (page) => {
    for (const failure of [
      UNREACHABLE,
      UNEXPECTED,
      refused(500, null),
      refused(403, "previous-save-forbidden"),
    ]) {
      const stand = makeClient();
      stand.answers.listAccounts.push(failure, ok([account(ONE)]));
      const { instance } = await mount(page, stand.client);
      await settleAll();
      assert.match(warning(page.root)?.textContent, /Nie udało się wczytać/);
      assert.equal(
        rows(page.root).length,
        0,
        "no list stands after a failed read",
      );
      const retry = page.root.querySelector(".accounts-retry button");
      assert.equal(retry?.textContent, "Spróbuj ponownie");
      assert.deepEqual(stand.calls, [["listAccounts"]]);

      await press(retry);
      await settleAll();
      assert.deepEqual(stand.calls, [["listAccounts"], ["listAccounts"]]);
      assert.equal(rows(page.root).length, 1);
      assert.equal(warning(page.root), null);
      assert.equal(page.root.querySelector(".accounts-retry"), null);
      await inAct(() => instance.dispose());
    }
  });
});

test("the refusal owner-forbidden of the list is said as the account having no right to it, with no retry", async () => {
  await withPage(async (page) => {
    const stand = makeClient();
    stand.answers.listAccounts.push(refused(403, "owner-forbidden"));
    await mount(page, stand.client);
    await settleAll();
    assert.match(warning(page.root)?.textContent, /nie ma prawa/);
    assert.equal(page.root.querySelector(".accounts-retry"), null);
    assert.equal(rows(page.root).length, 0);
    assert.deepEqual(stand.calls, [["listAccounts"]]);
  });
});

test("a 401 on the read goes to the page's signed-out handling once and shows no sentence of failure", async () => {
  await withPage(async (page) => {
    const stand = makeClient();
    stand.answers.listAccounts.push(refused(401, "unauthenticated"));
    const { signedOut } = await mount(page, stand.client);
    await settleAll();
    assert.equal(signedOut.length, 1);
    assert.equal(warning(page.root), null);
    assert.equal(rows(page.root).length, 0);
  });
});

// --- the buttons of a row -------------------------------------------------------------------

test("an account with the owner role has no „Zablokuj” and the other three buttons, and a player has all four", async () => {
  // decision: D-411 "an account with the owner role has no „Zablokuj”"
  await withPage(async (page) => {
    await mountList(page, [account(BOSS, { role: "owner" }), account(ONE)]);
    assert.deepEqual(buttonTexts(rowOf(page.root, BOSS)), [
      "Odblokuj",
      "Nadaj uprawnienie do poprzedniego zapisu",
      "Odbierz uprawnienie do poprzedniego zapisu",
    ]);
    assert.deepEqual(buttonTexts(rowOf(page.root, ONE)), [
      "Zablokuj",
      "Odblokuj",
      "Nadaj uprawnienie do poprzedniego zapisu",
      "Odbierz uprawnienie do poprzedniego zapisu",
    ]);
  });
});

test("of each pair of buttons the one that makes no sense for the state of the row is disabled", async () => {
  await withPage(async (page) => {
    await mountList(page, [
      account(ONE),
      account(TWO, { blocked: true, previousSaveAllowed: true }),
    ]);
    const disabled = (email) =>
      all(rowOf(page.root, email), ".accounts-actions button")
        .filter((button) => button.disabled)
        .map((button) => button.textContent);
    assert.deepEqual(disabled(ONE), [
      "Odblokuj",
      "Odbierz uprawnienie do poprzedniego zapisu",
    ]);
    assert.deepEqual(disabled(TWO), [
      "Zablokuj",
      "Nadaj uprawnienie do poprzedniego zapisu",
    ]);
  });
});

test("„Zablokuj” is a destructive button, and the confirmation's two buttons are a destructive one and a secondary action", async () => {
  await withPage(async (page) => {
    await mountList(page, [account(ONE)]);
    const block = buttonOf(page.root, "Zablokuj", ONE);
    assert.ok(block.classList.contains("destructive"));
    await press(block);
    const confirm = rowOf(page.root, ONE).querySelector(".accounts-confirm");
    const confirming = confirm.querySelector("button.destructive");
    assert.equal(confirming.textContent, "Tak, zablokuj");
    const withdraw = [...confirm.querySelectorAll("button")].find(
      (button) => button.textContent === "Wróć",
    );
    assert.ok(withdraw.classList.contains("secondary"));
  });
});

// --- the confirmation of „Zablokuj” -----------------------------------------------------------

test("the click on „Zablokuj” sends nothing and opens the confirmation with its one sentence of effects", async () => {
  // decision: D-411 "„Zablokuj” is a destructive button and opens a confirmation that says that the block ends the player's sessions in every browser and makes the links from emails useless, and that unblocking restores neither, and the other three operations act at once, with no confirmation"
  await withPage(async (page) => {
    const { calls } = await mountList(page, [account(ONE), account(TWO)]);
    await press(buttonOf(page.root, "Zablokuj", TWO));
    assert.deepEqual(
      calls,
      [["listAccounts"]],
      "only the read of the list so far",
    );
    const confirms = all(page.root, ".accounts-confirm");
    assert.equal(confirms.length, 1);
    assert.ok(
      rowOf(page.root, TWO).contains(confirms[0]),
      "the confirmation stands in the row that was clicked",
    );
    const sentence = confirms[0].querySelector(
      ".accounts-confirm-text",
    ).textContent;
    assert.match(sentence, /w każdej przeglądarce/);
    assert.match(sentence, /odnośniki z maili/);
    assert.match(sentence, /nie przywraca/);
    assert.equal(sentence.match(/[.!?]/g).length, 1, "one sentence");
  });
});

test("the confirmation sends the one block with the address of its row, and the list is read again", async () => {
  await withPage(async (page) => {
    const { calls, answers } = await mountList(page, [
      account(ONE),
      account(TWO),
    ]);
    const held = deferred();
    answers.blockAccount.push(held.promise);
    answers.listAccounts.push(
      ok([account(ONE), account(TWO, { blocked: true })]),
    );
    await press(buttonOf(page.root, "Zablokuj", TWO));
    const confirm = rowOf(page.root, TWO).querySelector(".accounts-confirm");
    await press(
      [...confirm.querySelectorAll("button")].find(
        (button) => button.textContent === "Tak, zablokuj",
      ),
    );
    // While the answer is awaited the confirmation is gone and „Zablokuj” waits, disabled, with its text.
    assert.equal(all(page.root, ".accounts-confirm").length, 0);
    const waiting = buttonOf(page.root, "Zablokuj", TWO);
    assert.ok(waiting.disabled);
    assert.equal(waiting.textContent, "Zablokuj");
    await inAct(() => held.resolve(ok("blocked")));
    await settleAll();
    assert.deepEqual(calls, [
      ["listAccounts"],
      ["blockAccount", TWO],
      ["listAccounts"],
    ]);
    assert.equal(all(page.root, ".accounts-confirm").length, 0);
    assert.equal(
      rowOf(page.root, TWO).querySelector(".accounts-state").textContent,
      "zablokowane",
    );
    assert.equal(
      rowOf(page.root, ONE).querySelector(".accounts-state").textContent,
      "odblokowane",
    );
  });
});

test("„Wróć” closes the confirmation, sends nothing and leaves the row as it was", async () => {
  await withPage(async (page) => {
    const { calls } = await mountList(page, [account(ONE)]);
    await press(buttonOf(page.root, "Zablokuj", ONE));
    const confirm = rowOf(page.root, ONE).querySelector(".accounts-confirm");
    await press(
      [...confirm.querySelectorAll("button")].find(
        (button) => button.textContent === "Wróć",
      ),
    );
    await settleAll();
    assert.deepEqual(calls, [["listAccounts"]]);
    assert.equal(all(page.root, ".accounts-confirm").length, 0);
    assert.equal(
      rowOf(page.root, ONE).querySelector(".accounts-state").textContent,
      "odblokowane",
    );
    assert.equal(
      page.document.activeElement,
      buttonOf(page.root, "Zablokuj", ONE),
      "focus is back on the control the player started from",
    );
  });
});

test("opening the confirmation moves focus to „Wróć”, and only one confirmation stands at a time", async () => {
  await withPage(async (page) => {
    await mountList(page, [account(ONE), account(TWO)]);
    await press(buttonOf(page.root, "Zablokuj", ONE));
    const first = rowOf(page.root, ONE).querySelector(".accounts-confirm");
    assert.equal(page.document.activeElement.textContent, "Wróć");
    assert.ok(first.contains(page.document.activeElement));
    await press(buttonOf(page.root, "Zablokuj", TWO));
    assert.equal(all(page.root, ".accounts-confirm").length, 1);
    assert.equal(
      rowOf(page.root, ONE).querySelector(".accounts-confirm"),
      null,
    );
    assert.ok(rowOf(page.root, TWO).querySelector(".accounts-confirm"));
  });
});

// --- the three operations that act at once -----------------------------------------------------

test("each of the other three buttons sends its one request at once, with the address of its row, and the list is read again", async () => {
  // decision: D-411 "the other three operations act at once, with no confirmation"
  await withPage(async (page) => {
    const cases = [
      [
        "Odblokuj",
        "unblockAccount",
        "unblocked",
        account(TWO, { blocked: true }),
      ],
      [
        "Nadaj uprawnienie do poprzedniego zapisu",
        "grantPreviousSave",
        "granted",
        account(TWO),
      ],
      [
        "Odbierz uprawnienie do poprzedniego zapisu",
        "revokePreviousSave",
        "revoked",
        account(TWO, { previousSaveAllowed: true }),
      ],
    ];
    for (const [text, method, outcome, second] of cases) {
      const { calls, answers, instance } = await mountList(page, [
        account(ONE),
        second,
      ]);
      answers[method].push(ok(outcome));
      answers.listAccounts.push(ok([account(ONE), account(TWO)]));
      await press(buttonOf(page.root, text, TWO));
      await settleAll();
      assert.deepEqual(
        calls,
        [["listAccounts"], [method, TWO], ["listAccounts"]],
        text,
      );
      await inAct(() => instance.dispose());
    }
  });
});

// --- waiting, focus and the answers that refuse -------------------------------------------------

test("while an operation waits its button is disabled and keeps its text, no other button of the list can be pressed, and focus comes back after the answer", async () => {
  await withPage(async (page) => {
    const { calls, answers } = await mountList(page, [
      account(ONE),
      account(TWO),
    ]);
    const held = deferred();
    answers.grantPreviousSave.push(held.promise);
    answers.listAccounts.push(
      ok([account(ONE), account(TWO, { previousSaveAllowed: true })]),
    );
    const grant = buttonOf(
      page.root,
      "Nadaj uprawnienie do poprzedniego zapisu",
      TWO,
    );
    grant.focus();
    await press(grant);
    assert.ok(grant.disabled, "the button that waits is disabled");
    assert.equal(grant.textContent, "Nadaj uprawnienie do poprzedniego zapisu");
    assert.ok(
      all(page.root, ".accounts-row button").every((button) => button.disabled),
      "no button of the list can be pressed while an answer is awaited",
    );
    // A second press of the disabled button, as a browser would not deliver, sends nothing.
    fire(grant, "click");
    assert.equal(
      calls.filter(([name]) => name === "grantPreviousSave").length,
      1,
    );

    await inAct(() => held.resolve(ok("granted")));
    await settleAll();
    assert.ok(
      buttonOf(page.root, "Zablokuj", ONE) &&
        !buttonOf(page.root, "Zablokuj", ONE).disabled,
      "the buttons are pressable again",
    );
    // The control the player started from now makes no sense for the row, so its counterpart has focus.
    assert.equal(
      page.document.activeElement,
      buttonOf(page.root, "Odbierz uprawnienie do poprzedniego zapisu", TWO),
    );
  });
});

test("the answer unknown-account is said in one sentence, and the list is read again", async () => {
  await withPage(async (page) => {
    const { calls, answers } = await mountList(page, [
      account(ONE, { blocked: true }),
      account(TWO),
    ]);
    answers.unblockAccount.push(refused(404, "unknown-account"));
    answers.listAccounts.push(ok([account(TWO)]));
    await press(buttonOf(page.root, "Odblokuj", ONE));
    await settleAll();
    assert.deepEqual(calls, [
      ["listAccounts"],
      ["unblockAccount", ONE],
      ["listAccounts"],
    ]);
    const sentence = warning(page.root);
    assert.match(sentence?.textContent, /nie ma/);
    assert.equal(
      sentence.textContent.match(/[.!?]/g).length,
      1,
      "one sentence",
    );
    assert.deepEqual(
      rows(page.root).map(
        (row) => row.querySelector(".accounts-email").textContent,
      ),
      [TWO],
      "the list stands as it was read again",
    );
  });
});

test("a block the server refuses for an owner is said in a sentence of its own after the confirmation", async () => {
  await withPage(async (page) => {
    const { calls, answers } = await mountList(page, [
      account(ONE),
      account(TWO),
    ]);
    answers.blockAccount.push(refused(403, "owner-not-blockable"));
    answers.listAccounts.push(
      ok([account(ONE), account(TWO, { role: "owner" })]),
    );
    await press(buttonOf(page.root, "Zablokuj", TWO));
    const confirm = rowOf(page.root, TWO).querySelector(".accounts-confirm");
    await press(
      [...confirm.querySelectorAll("button")].find(
        (button) => button.textContent === "Tak, zablokuj",
      ),
    );
    await settleAll();
    assert.deepEqual(calls, [
      ["listAccounts"],
      ["blockAccount", TWO],
      ["listAccounts"],
    ]);
    const sentence = warning(page.root);
    assert.match(sentence?.textContent, /właściciela/);
    assert.equal(
      sentence.textContent.match(/[.!?]/g).length,
      1,
      "one sentence",
    );
    assert.equal(
      buttonOf(page.root, "Zablokuj", TWO),
      null,
      "the row now has no „Zablokuj”",
    );
  });
});

test("a failed operation is said in one sentence in warning and the list is read again", async () => {
  await withPage(async (page) => {
    for (const failure of [UNREACHABLE, UNEXPECTED, refused(500, null)]) {
      const { calls, answers, instance } = await mountList(page, [
        account(ONE),
      ]);
      answers.grantPreviousSave.push(failure);
      answers.listAccounts.push(ok([account(ONE)]));
      const grant = buttonOf(
        page.root,
        "Nadaj uprawnienie do poprzedniego zapisu",
        ONE,
      );
      grant.focus();
      await press(grant);
      await settleAll();
      assert.deepEqual(calls, [
        ["listAccounts"],
        ["grantPreviousSave", ONE],
        ["listAccounts"],
      ]);
      assert.match(warning(page.root)?.textContent, /Nie udało się/);
      const again = buttonOf(
        page.root,
        "Nadaj uprawnienie do poprzedniego zapisu",
        ONE,
      );
      assert.ok(!again.disabled, "the control can be used again");
      assert.equal(
        page.document.activeElement,
        again,
        "focus is on the control the player started from",
      );
      await inAct(() => instance.dispose());
    }
  });
});

test("an operation refused as owner-forbidden says the account has no right, and reads the list no more", async () => {
  await withPage(async (page) => {
    const { calls, answers } = await mountList(page, [account(ONE)]);
    answers.grantPreviousSave.push(refused(403, "owner-forbidden"));
    await press(
      buttonOf(page.root, "Nadaj uprawnienie do poprzedniego zapisu", ONE),
    );
    await settleAll();
    assert.deepEqual(calls, [["listAccounts"], ["grantPreviousSave", ONE]]);
    assert.match(warning(page.root)?.textContent, /nie ma prawa/);
  });
});

test("a 401 on an operation or on the read after it goes to the signed-out handling and reads nothing more", async () => {
  await withPage(async (page) => {
    {
      const { calls, answers, signedOut, instance } = await mountList(page, [
        account(ONE),
      ]);
      answers.grantPreviousSave.push(refused(401, "unauthenticated"));
      await press(
        buttonOf(page.root, "Nadaj uprawnienie do poprzedniego zapisu", ONE),
      );
      await settleAll();
      assert.equal(signedOut.length, 1);
      assert.deepEqual(calls, [["listAccounts"], ["grantPreviousSave", ONE]]);
      assert.equal(warning(page.root), null);
      await inAct(() => instance.dispose());
    }
    {
      const { answers, signedOut } = await mountList(page, [account(ONE)]);
      answers.grantPreviousSave.push(ok("granted"));
      answers.listAccounts.push(refused(401, "unauthenticated"));
      await press(
        buttonOf(page.root, "Nadaj uprawnienie do poprzedniego zapisu", ONE),
      );
      await settleAll();
      assert.equal(signedOut.length, 1);
      assert.equal(warning(page.root), null);
    }
  });
});

test("an answer that comes after the screen is taken down changes nothing and tells the page nothing", async () => {
  await withPage(async (page) => {
    const stand = makeClient();
    const held = deferred();
    stand.answers.listAccounts.push(held.promise);
    const { instance, signedOut } = await mount(page, stand.client);
    await inAct(() => instance.dispose());
    await inAct(() => held.resolve(refused(401, "unauthenticated")));
    await settleAll();
    assert.equal(signedOut.length, 0);
    assert.equal(page.root.children.length, 0, "the screen left the page");
  });
});
