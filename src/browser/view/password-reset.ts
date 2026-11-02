import type { AccountResult } from "../account-api.js";

const FRAGMENT_PREFIX = "#reset-password=";

/**
 * The token the fragment of the page's address carries for a password reset, or null when it
 * carries none. Whatever follows `#reset-password=` is the token as it stands, even when empty or
 * not of the token's form: the server's refusal is the one place that judges a token. Pure.
 */
export function readResetToken(hash: string): string | null {
  return hash.startsWith(FRAGMENT_PREFIX)
    ? hash.slice(FRAGMENT_PREFIX.length)
    : null;
}

/** How the form ends: the password is set, the link is refused, or the player cancels. */
export type ResetEnding = "changed" | "refused" | "cancelled";

/**
 * What the server's answer to setting a password means for the form: `changed` on success,
 * `refused` for a refusal with the code `invalid-link` whatever its reason, and otherwise a
 * failure that keeps the form and stands as the client's one sentence under it. Pure.
 */
export type ResetOutcome =
  | { readonly kind: "changed" }
  | { readonly kind: "refused" }
  | { readonly kind: "failed"; readonly message: string };

export function resetOutcome(result: AccountResult<null>): ResetOutcome {
  if (result.ok) return { kind: "changed" };
  const { failure } = result;
  if (failure.kind === "refused" && failure.code === "invalid-link")
    return { kind: "refused" };
  return { kind: "failed", message: failure.message };
}
