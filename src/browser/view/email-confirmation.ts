import type { AccountClient, AccountResult } from "../account-api.js";

/** The role of the sentence that tells the result of the confirmation (D-39). */
export type NoticeRole = "positive" | "warning";

export type ConfirmationNotice = {
  text: string;
  role: NoticeRole;
};

/** Where the page reads and clears the fragment of its address; the browser's own, or a test's. */
export type PageAddress = {
  hash(): string;
  /** Removes the fragment from the address without a navigation. */
  clearFragment(): void;
};

const FRAGMENT_PREFIX = "#confirm-email=";

/**
 * The token the fragment of the page's address carries, or null when it carries none. Whatever
 * follows `#confirm-email=` is the token as it stands, even when empty or not of the token's form:
 * the server refuses it as it refuses an unknown one, and the player reads the sentence of an
 * invalid link instead of silence. Pure.
 */
export function readConfirmationToken(hash: string): string | null {
  return hash.startsWith(FRAGMENT_PREFIX)
    ? hash.slice(FRAGMENT_PREFIX.length)
    : null;
}

/**
 * The sentence for the server's answer to a confirmation, and whether the answer is definitive:
 * the address is confirmed, or the server refused the link. Any other failure — no connection, a
 * server error, an unexpected answer — is not definitive and shows the client's own message in
 * `warning`. Pure.
 */
export function confirmationOutcome(result: AccountResult<null>): {
  notice: ConfirmationNotice;
  definitive: boolean;
} {
  if (result.ok)
    return {
      notice: { text: "Adres e-mail potwierdzony.", role: "positive" },
      definitive: true,
    };
  const { failure } = result;
  if (failure.kind === "refused" && failure.code === "invalid-link")
    return {
      notice: {
        text: "Odnośnik jest nieważny albo wygasł.",
        role: "warning",
      },
      definitive: true,
    };
  return {
    notice: { text: failure.message, role: "warning" },
    definitive: false,
  };
}

/** The page's real address; outside a browser it carries no fragment. */
export function browserAddress(): PageAddress {
  return {
    hash: () => (typeof location === "undefined" ? "" : location.hash),
    clearFragment(): void {
      if (typeof location === "undefined" || typeof history === "undefined")
        return;
      history.replaceState(null, "", location.pathname + location.search);
    },
  };
}

/**
 * When the page's address carries a confirmation token, sends it and returns the sentence of the
 * result; returns null when it carries none. The fragment is removed only once the answer is
 * definitive, so after a lost connection a reload tries again and a spent token is never resent.
 */
export async function confirmFromAddress(
  client: Pick<AccountClient, "confirmEmail">,
  address: PageAddress,
): Promise<ConfirmationNotice | null> {
  const token = readConfirmationToken(address.hash());
  if (token === null) return null;
  const { notice, definitive } = confirmationOutcome(
    await client.confirmEmail(token),
  );
  if (definitive) address.clearFragment();
  return notice;
}

/** The one sentence of the result, to stand above the screen. */
export function createConfirmationNotice(
  notice: ConfirmationNotice,
): HTMLElement {
  const element = document.createElement("p");
  element.className = "confirmation-notice";
  element.classList.add(notice.role);
  element.setAttribute("role", notice.role === "warning" ? "alert" : "status");
  element.textContent = notice.text;
  return element;
}
