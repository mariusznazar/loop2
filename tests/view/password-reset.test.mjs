// The reset link in the page's address and the meaning of the server's answer to setting a
// password (task reset-hasla, To do 4; spec decisions 10 and 11; D-216, D-217). The pure reading
// of the fragment and the sorting of each answer; the screen and the page are proved in
// account-screen.test.mjs on the hand-made document model (D-88).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  readResetToken,
  resetOutcome,
} from "../../dist/public/view/password-reset.js";

const TOKEN = "Zm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmE";

const refusal = (status, code, message) => ({
  ok: false,
  failure: { kind: "refused", status, code, message },
});

test("the fragment's token is read as it stands, and any other fragment yields none", () => {
  const cases = [
    ["a fragment with a token", `#reset-password=${TOKEN}`, TOKEN],
    ["no fragment", "", null],
    ["the bare hash", "#", null],
    ["the key without the equals sign", "#reset-password", null],
    // Malformed: the key is there, so the server judges the token and refuses it.
    ["the key with an empty token", "#reset-password=", ""],
    ["a token not of the token's form", "#reset-password=a b", "a b"],
    ["a second equals sign stays in the token", "#reset-password=a=b", "a=b"],
    ["the confirmation fragment", `#confirm-email=${TOKEN}`, null],
    ["the key not at the start", `#x&reset-password=${TOKEN}`, null],
    ["the key in another case", `#Reset-Password=${TOKEN}`, null],
  ];
  for (const [name, hash, expected] of cases)
    assert.equal(readResetToken(hash), expected, name);
});

test("only a success is a change and only the code invalid-link is a refused link, whatever its reason or status", () => {
  const unreachable = (reason, message) => ({
    ok: false,
    failure: { kind: "unreachable", reason, message },
  });
  const cases = [
    ["success", { ok: true, value: null }, { kind: "changed" }],
    [
      "the link refused",
      refusal(400, "invalid-link", "Odnośnik jest nieważny albo wygasł."),
      { kind: "refused" },
    ],
    [
      "the link refused with another status",
      refusal(410, "invalid-link", "Inny powód."),
      { kind: "refused" },
    ],
    [
      "no connection",
      unreachable("network", "Brak połączenia."),
      { kind: "failed", message: "Brak połączenia." },
    ],
    [
      "a timeout",
      unreachable("timeout", "Za długo."),
      { kind: "failed", message: "Za długo." },
    ],
    [
      "the gate full",
      refusal(429, "too-many-attempts", "Za dużo prób."),
      { kind: "failed", message: "Za dużo prób." },
    ],
    [
      "a server error",
      refusal(500, null, "Serwer nie mógł."),
      { kind: "failed", message: "Serwer nie mógł." },
    ],
    [
      "a password the server refuses",
      refusal(400, "invalid-password", "Hasło musi mieć od 12 do 128 znaków."),
      { kind: "failed", message: "Hasło musi mieć od 12 do 128 znaków." },
    ],
    [
      "a request the server refuses",
      refusal(400, "invalid-request", "Żądanie jest niepoprawne."),
      { kind: "failed", message: "Żądanie jest niepoprawne." },
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
      { kind: "failed", message: "Serwer nie mógł." },
    ],
  ];
  for (const [name, result, expected] of cases)
    assert.deepEqual(resetOutcome(result), expected, name);
});
