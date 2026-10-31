import type { AccountClient, AccountResult } from "../account-api.js";
import { accountForm, passwordProblems } from "./account-screen.js";
import { createButton, setButtonWaiting } from "./controls/button.js";
import { createPasswordField } from "./controls/text-field.js";
import type { PageAddress } from "./email-confirmation.js";

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

/** How the screen ends: the password is set, the link is refused, or the player cancels. */
export type ResetEnding = "changed" | "refused" | "cancelled";

/**
 * What the server's answer to setting a password means for the screen: `changed` on success,
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

export type ResetScreenOptions = {
  client: Pick<AccountClient, "setPassword">;
  /** The token read from the fragment; it lives only in this screen's closure. */
  token: string;
  address: PageAddress;
  /** Called once the fragment is gone, with the ending the page goes on from. */
  finished: (ending: ResetEnding) => void;
};

/**
 * Builds the screen „Ustaw nowe hasło”: the fields „Nowe hasło” and „Powtórz hasło”, the button
 * „Ustaw hasło” and the button „Anuluj”. It sends nothing until the player sends the form, and
 * nothing at all when the password rules the server would apply are not met; a problem stands
 * under its field. While one request waits, the fields and „Anuluj” are locked. A change, a
 * refusal of the link and „Anuluj” clear the fragment of the address first and only then call
 * `finished`, so neither a reload nor the back button returns to the token. Any other failure
 * keeps the form and the link and stands as one sentence under the form, with focus back where
 * the player sent the form from.
 */
export function createResetScreen(options: ResetScreenOptions): HTMLElement {
  const { client, token, address, finished } = options;

  const password = createPasswordField({
    label: "Nowe hasło",
    hint: "nowe hasło",
    visibleLabel: true,
    autocomplete: "new-password",
  });
  const confirmation = createPasswordField({
    label: "Powtórz hasło",
    hint: "hasło jeszcze raz",
    visibleLabel: true,
    autocomplete: "new-password",
  });
  const fields = [password, confirmation];
  const reset = accountForm("Ustaw nowe hasło", fields, "Ustaw hasło");
  const cancel = createButton("Anuluj");
  cancel.classList.add("account-form-switch");
  reset.section.append(cancel);

  const element = document.createElement("div");
  element.className = "account-screen";
  element.append(reset.section);

  let waiting = false;
  let ended = false;

  function end(ending: ResetEnding): void {
    if (ended) return;
    ended = true;
    address.clearFragment();
    finished(ending);
  }

  function lock(locked: boolean): void {
    for (const field of fields) field.input.disabled = locked;
    cancel.disabled = locked;
  }

  reset.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (waiting || ended) return;
    reset.warning.set(null);
    const problems = passwordProblems(
      password.input.value,
      confirmation.input.value,
    );
    password.setError(problems.password ?? null);
    confirmation.setError(problems.confirmation ?? null);
    const first = problems.password
      ? password
      : problems.confirmation
        ? confirmation
        : null;
    if (first !== null) {
      first.input.focus();
      return;
    }
    // The control the player sent the form from: the field where Enter was pressed or the button.
    const active = document.activeElement;
    const origin =
      active instanceof HTMLElement && reset.form.contains(active)
        ? active
        : reset.button;
    waiting = true;
    // The request reads the fields before they are locked.
    const answer = client.setPassword(
      token,
      password.input.value,
      confirmation.input.value,
    );
    lock(true);
    setButtonWaiting(reset.button, "Ustawianie…");
    void answer.then((result) => {
      waiting = false;
      setButtonWaiting(reset.button, null);
      lock(false);
      const outcome = resetOutcome(result);
      if (outcome.kind === "failed") {
        reset.warning.set(outcome.message);
        origin.focus();
        return;
      }
      end(outcome.kind);
    });
  });

  cancel.addEventListener("click", () => {
    if (waiting) return;
    end("cancelled");
  });

  return element;
}
