// The confirmation from the link in the page's address (task potwierdzenie-adresu, To do 3 and 4;
// spec sections 2 and 10; D-39, D-104). The pure reading of the fragment and the sentence for each
// answer, and the module's use of the address against a client the test answers: proof of what is
// sent and when the fragment goes, never of a real address bar (D-88).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  confirmFromAddress,
  confirmationOutcome,
  readConfirmationToken,
} from "../../dist/public/view/email-confirmation.js";

const TOKEN = "Zm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmE";

const refusal = (status, code, message) => ({
  ok: false,
  failure: { kind: "refused", status, code, message },
});
const INVALID_LINK = refusal(
  400,
  "invalid-link",
  "Odnośnik jest nieważny albo wygasł.",
);
const NO_CONNECTION = {
  ok: false,
  failure: {
    kind: "unreachable",
    reason: "network",
    message: "Brak połączenia z serwerem. Spróbuj ponownie.",
  },
};

test("the fragment's token is read, and a fragment without one yields none", () => {
  const cases = [
    ["a fragment with a token", `#confirm-email=${TOKEN}`, TOKEN],
    ["no fragment", "", null],
    ["the bare hash", "#", null],
    ["another fragment", "#section", null],
    ["the key without the equals sign", "#confirm-email", null],
    // Malformed: the key is there, so the server judges the token and refuses it.
    ["the key with an empty token", "#confirm-email=", ""],
    ["a token that is not of the token's form", "#confirm-email=a b", "a b"],
    ["the key not at the start", `#x&confirm-email=${TOKEN}`, null],
    ["the key in another case", `#Confirm-Email=${TOKEN}`, null],
  ];
  for (const [name, hash, expected] of cases)
    assert.equal(readConfirmationToken(hash), expected, name);
});

test("each answer to a confirmation has its sentence and role, and only a confirmation or a link refusal is definitive", () => {
  const cases = [
    [
      "confirmed",
      { ok: true, value: null },
      { text: "Adres e-mail potwierdzony.", role: "positive" },
      true,
    ],
    [
      "the link refused",
      INVALID_LINK,
      { text: "Odnośnik jest nieważny albo wygasł.", role: "warning" },
      true,
    ],
    [
      "no connection",
      NO_CONNECTION,
      { text: NO_CONNECTION.failure.message, role: "warning" },
      false,
    ],
    [
      "a server error",
      refusal(500, null, "Serwer nie mógł obsłużyć żądania."),
      { text: "Serwer nie mógł obsłużyć żądania.", role: "warning" },
      false,
    ],
    [
      "a refusal of the request itself",
      refusal(400, "invalid-request", "Żądanie jest niepoprawne."),
      { text: "Żądanie jest niepoprawne.", role: "warning" },
      false,
    ],
    [
      "an unexpected answer",
      {
        ok: false,
        failure: {
          kind: "unexpected",
          status: 200,
          message: "Serwer nie mógł.",
        },
      },
      { text: "Serwer nie mógł.", role: "warning" },
      false,
    ],
  ];
  for (const [name, result, notice, definitive] of cases)
    assert.deepEqual(confirmationOutcome(result), { notice, definitive }, name);
});

/** An address whose fragment the test sets, counting how often it is cleared. */
function fakeAddress(hash) {
  const address = {
    hash: () => address.current,
    current: hash,
    cleared: 0,
    clearFragment() {
      address.cleared += 1;
      address.current = "";
    },
  };
  return address;
}

function recordingClient(result) {
  const sent = [];
  return {
    sent,
    client: {
      confirmEmail: (token) => {
        sent.push(token);
        return Promise.resolve(result);
      },
    },
  };
}

test("an address without a token sends nothing and is left as it is", async () => {
  const { client, sent } = recordingClient({ ok: true, value: null });
  const address = fakeAddress("#section");
  assert.equal(await confirmFromAddress(client, address), null);
  assert.deepEqual(sent, []);
  assert.equal(address.cleared, 0);
});

test("a definitive answer, confirmed or the link refused, sends the token once and clears the fragment", async () => {
  for (const [name, result, text] of [
    ["confirmed", { ok: true, value: null }, "Adres e-mail potwierdzony."],
    ["refused", INVALID_LINK, "Odnośnik jest nieważny albo wygasł."],
  ]) {
    const { client, sent } = recordingClient(result);
    const address = fakeAddress(`#confirm-email=${TOKEN}`);
    const notice = await confirmFromAddress(client, address);
    assert.equal(notice.text, text, name);
    assert.deepEqual(sent, [TOKEN], name);
    assert.equal(address.cleared, 1, name);
    assert.equal(address.hash(), "", name);
  }
});

test("a lost connection or a server error keeps the fragment, so a reload tries again", async () => {
  for (const [name, result] of [
    ["no connection", NO_CONNECTION],
    ["a server error", refusal(500, null, "Serwer nie mógł obsłużyć żądania.")],
  ]) {
    const { client, sent } = recordingClient(result);
    const address = fakeAddress(`#confirm-email=${TOKEN}`);
    const notice = await confirmFromAddress(client, address);
    assert.equal(notice.role, "warning", name);
    assert.deepEqual(sent, [TOKEN], name);
    assert.equal(address.cleared, 0, name);
    assert.equal(address.hash(), `#confirm-email=${TOKEN}`, name);
  }
});
