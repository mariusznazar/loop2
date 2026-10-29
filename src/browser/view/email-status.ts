import type {
  Account,
  AccountClient,
  ConfirmationMessage,
} from "../account-api.js";
import { createButton, setButtonWaiting } from "./controls/button.js";

/** The role a sentence of the header row is written in (D-39, D-40). */
export type SentenceRole = "text-secondary" | "warning";

export type Sentence = {
  text: string;
  role: SentenceRole;
};

/** What the row says until a send made in this page ends. */
export const UNCONFIRMED_SENTENCE: Sentence = {
  text: "Adres e-mail niepotwierdzony.",
  role: "text-secondary",
};

/**
 * The sentence of the outcome of a confirmation message. A sent message is a note of what happened
 * while the address is still unconfirmed, so `text-secondary`; a message the limit or a failure
 * kept from being sent is something not carried out, so `warning`. Pure.
 */
export function messageSentence(
  message: ConfirmationMessage,
  email: string,
): Sentence {
  if (message === "sent")
    return {
      text: `Wysłaliśmy odnośnik potwierdzający na ${email}.`,
      role: "text-secondary",
    };
  if (message === "limited")
    return {
      text: "Za dużo wiadomości. Spróbuj ponownie za godzinę.",
      role: "warning",
    };
  return {
    text: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
    role: "warning",
  };
}

export type EmailStatus = {
  /** The row for the header, on a line of its own; hidden while the address is confirmed. */
  element: HTMLElement;
  /** Takes the row off the page and makes an answer still awaited act on nothing. */
  dispose(): void;
};

/**
 * The row of a signed-in player with an unconfirmed address: one sentence and the button
 * „Wyślij ponownie”. It starts with the outcome of the registration's message where `start` gives
 * one, else with „Adres e-mail niepotwierdzony.”; each send replaces the sentence with its outcome.
 * The button waits as „Wysyłanie…”, takes focus back after the answer, and the row disappears when
 * the server says the address is already confirmed. Each send takes the next number and only the
 * last one's answer acts.
 */
export function createEmailStatus(
  client: Pick<AccountClient, "sendConfirmationMessage">,
  account: Account,
  start: ConfirmationMessage | null,
): EmailStatus {
  const element = document.createElement("div");
  element.className = "email-status";
  element.hidden = account.emailConfirmed;
  const sentence = document.createElement("p");
  sentence.className = "email-status-sentence";
  sentence.setAttribute("aria-live", "polite");
  const button = createButton("Wyślij ponownie");
  element.append(sentence, button);

  function show(next: Sentence): void {
    sentence.textContent = next.text;
    sentence.classList.toggle("warning", next.role === "warning");
  }
  show(
    start === null
      ? UNCONFIRMED_SENTENCE
      : messageSentence(start, account.email),
  );

  let latest = 0;
  button.addEventListener("click", () => {
    if (button.disabled) return;
    void (async () => {
      const mine = ++latest;
      setButtonWaiting(button, "Wysyłanie…");
      const result = await client.sendConfirmationMessage();
      if (mine !== latest) return;
      setButtonWaiting(button, null);
      if (result.ok) {
        show(messageSentence(result.value, account.email));
      } else if (
        result.failure.kind === "refused" &&
        result.failure.code === "email-already-confirmed"
      ) {
        element.hidden = true;
        return;
      } else {
        show({ text: result.failure.message, role: "warning" });
      }
      button.focus();
    })();
  });

  return {
    element,
    dispose(): void {
      latest += 1;
      element.remove();
    },
  };
}
