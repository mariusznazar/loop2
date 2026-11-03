// The sentences about an unconfirmed address (task potwierdzenie-adresu, To do 6 and 7; spec section
// 10; D-39, D-157), which the menu „Konto” and the kitchen-sink page both write. Pure functions of
// `email-status.ts`, run on plain values.
//
// Changed in task ekrany-i-menu (To do 9): the header row of the page, `createEmailStatus`, is gone,
// and so are this file's cases on its DOM (its elements, the waiting button, the focus after an
// answer, the answer that removes the row, the answer that comes after the row left). The menu
// „Konto” of `menu-bar.tsx` does all of that now, and the cases of `tests/view/menu-bar.test.mjs`
// carry it: the sentence and the button of an unconfirmed address, the registration's first outcome,
// a send that waits and its outcomes, a failure of the client, an address already confirmed, and an
// answer that comes after the bar was disposed.
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
