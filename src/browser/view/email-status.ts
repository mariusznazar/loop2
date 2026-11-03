import type { ConfirmationMessage } from "../account-api.js";

/**
 * The sentences about an unconfirmed address (D-157), pure and with no DOM, so that the menu
 * „Konto” of `menu-bar.tsx` and the kitchen-sink page, which reaches no React file (D-269), write
 * the same words.
 */

/** The role a sentence about the address is written in (D-39, D-40). */
export type SentenceRole = "text-secondary" | "warning";

export type Sentence = {
  text: string;
  role: SentenceRole;
};

/** What the menu says until a send made in this page ends. */
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
