import type { AccountClient, AccountResult } from "../account-api.js";

/** The role of the sentence that tells the result of the confirmation (D-39). */
export type NoticeRole = "positive" | "warning";

export type ConfirmationNotice = {
  text: string;
  role: NoticeRole;
};

/**
 * Where the page reads and writes the fragment of its address; the browser's own, or a test's. The
 * fragment names a screen (D-281) or carries an emailed link's token (D-156, D-224).
 */
export type PageAddress = {
  hash(): string;
  /** Removes the fragment from the address without a navigation. */
  clearFragment(): void;
  /** Goes to the fragment `hash`, `#` included, with a new entry of the browser's history. */
  go(hash: string): void;
  /** Replaces the fragment with `hash`, `#` included, with no new entry of the history. */
  replace(hash: string): void;
  /**
   * Listens for a change of the fragment the page did not make through `go` or `replace`: the
   * browser's back and forward, and a link followed. Returns the removal of the listener.
   */
  onChange(listener: () => void): () => void;
  /** Reloads the page at its address, fragment included, so that the start of the page reads it. */
  reload(): void;
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

/**
 * The page's real address: `location` for the fragment, `history` for writing it — `pushState` for
 * a new entry and `replaceState` for none, neither of which fires `hashchange` — and the window's
 * `hashchange` for what the page did not write itself, which the browser's back and forward and a
 * followed link fire. Outside a browser it carries no fragment, writes nothing, hears nothing and
 * reloads nothing.
 */
export function browserAddress(): PageAddress {
  const inBrowser = (): boolean =>
    typeof location !== "undefined" &&
    typeof history !== "undefined" &&
    typeof window !== "undefined";
  const write = (hash: string, how: "push" | "replace"): void => {
    if (!inBrowser()) return;
    const url = location.pathname + location.search + hash;
    if (how === "push") history.pushState(null, "", url);
    else history.replaceState(null, "", url);
  };
  return {
    hash: () => (typeof location === "undefined" ? "" : location.hash),
    clearFragment: () => write("", "replace"),
    go: (hash) => write(hash, "push"),
    replace: (hash) => write(hash, "replace"),
    onChange(listener): () => void {
      if (!inBrowser()) return () => undefined;
      window.addEventListener("hashchange", listener);
      return () => window.removeEventListener("hashchange", listener);
    },
    reload(): void {
      if (typeof location !== "undefined") location.reload();
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
