import type {
  Account,
  AccountClient,
  AccountResult,
  ConfirmationMessage,
} from "../account-api.js";
import { createButton, setButtonWaiting } from "./controls/button.js";
import {
  createFormWarning,
  createPasswordField,
  createTextField,
  type Field,
  type FormWarning,
} from "./controls/text-field.js";

/**
 * The messages of a registration the server would refuse, word for word as the server's account
 * routes give them, so the player reads the same sentence whichever side finds the problem.
 */
const PROBLEM_MESSAGES = {
  email: "Podaj adres e-mail w postaci nazwa@domena.",
  password: "Hasło musi mieć od 12 do 128 znaków.",
  confirmation: "Powtórzone hasło różni się od hasła.",
} as const;

export type RegistrationField = keyof typeof PROBLEM_MESSAGES;

/**
 * The fields of a registration the server would refuse, with their messages; empty when it would
 * take it. The rules are the server's: the address, trimmed, holds exactly one „@” with text on
 * both sides; the password has 12 to 128 Unicode code points, counted as typed, never trimmed;
 * the repetition equals the password exactly. Pure.
 */
export function registrationProblems(
  email: string,
  password: string,
  confirmation: string,
): Partial<Record<RegistrationField, string>> {
  const problems: Partial<Record<RegistrationField, string>> = {};
  const parts = email.trim().split("@");
  if (parts.length !== 2 || parts[0] === "" || parts[1] === "")
    problems.email = PROBLEM_MESSAGES.email;
  const length = [...password].length;
  if (length < 12 || length > 128)
    problems.password = PROBLEM_MESSAGES.password;
  if (confirmation !== password)
    problems.confirmation = PROBLEM_MESSAGES.confirmation;
  return problems;
}

/** The account a form signed in, with the outcome of a confirmation message it sent, if any. */
type SignedInEntry = {
  account: Account;
  message: ConfirmationMessage | null;
};

/** The entry for a successful answer; the account's fields are copied, nothing else passes on. */
function entryOf<Value extends Account>(
  result: AccountResult<Value>,
  messageOf: (value: Value) => ConfirmationMessage | null,
): AccountResult<SignedInEntry> {
  if (!result.ok) return result;
  const { id, email, emailConfirmed } = result.value;
  return {
    ok: true,
    value: {
      account: { id, email, emailConfirmed },
      message: messageOf(result.value),
    },
  };
}

export type AccountScreen = {
  /** The two forms, for the page to place. */
  element: HTMLElement;
  /**
   * Leaves the screen: every field is emptied and unlocked, every message removed, and an answer
   * still awaited is ignored when it comes.
   */
  reset(): void;
  /** Moves keyboard focus to the address field of „Zaloguj się”. */
  focus(): void;
};

type AccountForm = {
  section: HTMLElement;
  form: HTMLFormElement;
  fields: Field[];
  button: HTMLButtonElement;
  warning: FormWarning;
};

function emailField(): Field {
  const field = createTextField({
    label: "Adres e-mail",
    hint: "adres e-mail",
    visibleLabel: true,
    autocomplete: "email",
  });
  // A text input with the keyboard of an address: the browser's own address check is stricter
  // than the server's, so it is not used.
  field.input.setAttribute("inputmode", "email");
  field.input.spellcheck = false;
  return field;
}

function accountForm(title: string, fields: Field[]): AccountForm {
  const section = document.createElement("section");
  section.className = "account-form";
  const heading = document.createElement("h2");
  heading.textContent = title;
  const form = document.createElement("form");
  form.className = "form";
  form.noValidate = true;
  const button = createButton(title, { submit: true });
  const warning = createFormWarning();
  form.append(...fields.map((field) => field.element), button, warning.element);
  section.append(heading, form);
  return { section, form, fields, button, warning };
}

/**
 * Builds the screen of a player who is not signed in: the form „Zaloguj się” (address, password)
 * and the form „Załóż konto” (address, password, repeated password), and passes the account to
 * `signedIn`, with the outcome of the confirmation message a registration sent (null after a
 * sign-in), once the server has signed this browser in. One form waits at a time: while it does,
 * the fields and buttons of both are locked and its button shows the waiting text. A refusal or a
 * lost connection stands as one sentence under the form that sent it, and focus returns to the
 * field or button the player sent it from.
 */
export function createAccountScreen(
  client: Pick<AccountClient, "login" | "register">,
  signedIn: (account: Account, message: ConfirmationMessage | null) => void,
): AccountScreen {
  const element = document.createElement("div");
  element.className = "account-screen";

  const loginEmail = emailField();
  const loginPassword = createPasswordField({
    label: "Hasło",
    hint: "hasło",
    visibleLabel: true,
    autocomplete: "current-password",
  });
  const login = accountForm("Zaloguj się", [loginEmail, loginPassword]);

  const registerEmail = emailField();
  const registerPassword = createPasswordField({
    label: "Hasło",
    hint: "hasło",
    visibleLabel: true,
    autocomplete: "new-password",
  });
  const registerConfirmation = createPasswordField({
    label: "Powtórz hasło",
    hint: "hasło jeszcze raz",
    visibleLabel: true,
    autocomplete: "new-password",
  });
  const register = accountForm("Załóż konto", [
    registerEmail,
    registerPassword,
    registerConfirmation,
  ]);
  element.append(login.section, register.section);
  const forms = [login, register];

  // Each request takes the next number; an answer is acted on only while its number is the last.
  let latest = 0;
  let waiting = false;

  function lock(locked: boolean): void {
    for (const form of forms) {
      for (const field of form.fields) field.input.disabled = locked;
      form.button.disabled = locked;
    }
  }

  function clearMessages(): void {
    for (const form of forms) {
      form.warning.set(null);
      for (const field of form.fields) field.setError(null);
    }
  }

  async function send(
    form: AccountForm,
    waitingText: string,
    request: () => Promise<AccountResult<SignedInEntry>>,
  ): Promise<void> {
    if (waiting) return;
    // The control the player sent the form from: the field where Enter was pressed or the button.
    const active = document.activeElement;
    const origin =
      active instanceof HTMLElement && form.form.contains(active)
        ? active
        : form.button;
    waiting = true;
    const mine = ++latest;
    // The request reads the fields before they are locked.
    const answer = request();
    lock(true);
    setButtonWaiting(form.button, waitingText);
    const result = await answer;
    if (mine !== latest) return;
    waiting = false;
    setButtonWaiting(form.button, null);
    lock(false);
    if (result.ok) {
      reset();
      signedIn(result.value.account, result.value.message);
      return;
    }
    form.warning.set(result.failure.message);
    origin.focus();
  }

  login.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (waiting) return;
    clearMessages();
    void send(login, "Logowanie…", async () =>
      entryOf(
        await client.login(loginEmail.input.value, loginPassword.input.value),
        () => null,
      ),
    );
  });

  register.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (waiting) return;
    clearMessages();
    const problems = registrationProblems(
      registerEmail.input.value,
      registerPassword.input.value,
      registerConfirmation.input.value,
    );
    const checked: [Field, RegistrationField][] = [
      [registerEmail, "email"],
      [registerPassword, "password"],
      [registerConfirmation, "confirmation"],
    ];
    let first: Field | null = null;
    for (const [field, name] of checked) {
      const message = problems[name] ?? null;
      field.setError(message);
      if (message !== null && first === null) first = field;
    }
    if (first !== null) {
      first.input.focus();
      return;
    }
    void send(register, "Zakładanie konta…", async () =>
      entryOf(
        await client.register(
          registerEmail.input.value,
          registerPassword.input.value,
          registerConfirmation.input.value,
        ),
        (registered) => registered.confirmationMessage,
      ),
    );
  });

  function reset(): void {
    latest += 1;
    waiting = false;
    for (const form of forms) {
      setButtonWaiting(form.button, null);
      for (const field of form.fields) field.input.value = "";
    }
    lock(false);
    clearMessages();
  }

  return {
    element,
    reset,
    focus: () => loginEmail.input.focus(),
  };
}
