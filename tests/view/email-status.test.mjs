// The sentences about an unconfirmed address (D-39, D-157), which the menu „Konto” and the
// kitchen-sink page both write. Pure functions of `email-status.ts`, run on plain values.
//
// This file has no cases on a DOM: the menu „Konto” of `menu-bar.tsx` shows the sentence and the
// button of an unconfirmed address, and the cases of `tests/view/menu-bar.test.mjs` carry it: the
// sentence and the button of an unconfirmed address, the registration's first outcome, a send that
// waits and its outcomes, a failure of the client, an address already confirmed, and an answer that
// comes after the bar was disposed.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  messageSentence,
  UNCONFIRMED_SENTENCE,
} from "../../dist/browser/view/email-status.js";

test("each outcome of a confirmation message has its sentence and role", () => {
  const outcomes = {
    sent: [
      "Wysłaliśmy odnośnik potwierdzający na ala@example.com.",
      "text-secondary",
    ],
    limited: ["Za dużo wiadomości. Spróbuj ponownie za godzinę.", "warning"],
    failed: [
      "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
      "warning",
    ],
  };
  for (const [message, [text, role]] of Object.entries(outcomes))
    assert.deepEqual(
      messageSentence(message, "ala@example.com"),
      { text, role },
      message,
    );
});

test("a sent message names the address of the account it went to", () => {
  assert.equal(
    messageSentence("sent", "ola@example.org").text,
    "Wysłaliśmy odnośnik potwierdzający na ola@example.org.",
  );
});

test("an unconfirmed address with no send made in the page is said in text-secondary", () => {
  assert.deepEqual(UNCONFIRMED_SENTENCE, {
    text: "Adres e-mail niepotwierdzony.",
    role: "text-secondary",
  });
});
