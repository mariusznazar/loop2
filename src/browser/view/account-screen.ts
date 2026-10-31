import type {
  Account,
  AccountClient,
  AccountResult,
  ConfirmationMessage,
} from "../account-api.js";
import { createButton, setButtonWaiting } from "./controls/button.js";
import {
  createFormNote,
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
 * The message for an address the server would refuse, or null when it would take it. The rule is
 * the server's: the address, trimmed, holds exactly one „@” with text on both sides. Pure.
 */
export function addressProblem(email: string): string | null {
  const parts = email.trim().split("@");
  return parts.length !== 2 || parts[0] === "" || parts[1] === ""
    ? PROBLEM_MESSAGES.email
    : null;
}

/**
 * The fields of a new password the server would refuse, with their messages; empty when it would
 * take it. The password has 12 to 128 Unicode code points, counted as typed, never trimmed; the
 * repetition equals the password exactly. Pure.
 */
export function passwordProblems(
  password: string,
  confirmation: string,
): Partial<Record<"password" | "confirmation", string>> {
  const problems: Partial<Record<"password" | "confirmation", string>> = {};
  const length = [...password].length;
  if (length < 12 || length > 128)
    problems.password = PROBLEM_MESSAGES.password;
  if (confirmation !== password)
    problems.confirmation = PROBLEM_MESSAGES.confirmation;
  return problems;
}

/**
 * The fields of a registration the server would refuse, with their messages; empty when it would
 * take it: the address's rule and the password rules together. Pure.
 */
export function registrationProblems(
  email: string,
  password: string,
  confirmation: string,
): Partial<Record<RegistrationField, string>> {
  const problems: Partial<Record<RegistrationField, string>> = {};
  const address = addressProblem(email);
  if (address !== null) problems.email = address;
  return { ...problems, ...passwordProblems(password, confirmation) };
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

/** The answer to a request for a password-reset link, the same for every well-formed address. */
const RESET_REQUESTED_SENTENCE =
  "Jeśli to konto ma potwierdzony adres, wysłaliśmy na niego odnośnik. Gdy wiadomość nie przyjdzie, spróbuj ponownie później.";

export type AccountScreen = {
  /**
   * The sections of the screen, for the page to place: the two forms, or, in the third state, the
   * one form „Nie pamiętam hasła”. The state is which sections this element holds.
   */
  element: HTMLElement;
  /**
   * Leaves the screen: every field is emptied and unlocked, every message removed, an answer still
   * awaited is ignored when it comes, and the two forms stand again.
   */
  reset(): void;
  /** Moves keyboard focus to the address field of „Zaloguj się”. */
  focus(): void;
};

export type AccountForm = {
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

/**
 * A section with the heading `title` and a form of `fields` whose submit button reads `buttonText`
 * (the title unless given) and, under it, the form's warning. The screen places it and adds the
 * handler of `submit`.
 */
export function accountForm(
  title: string,
  fields: Field[],
  buttonText: string = title,
): AccountForm {
  const section = document.createElement("section");
  section.className = "account-form";
  const heading = document.createElement("h2");
  heading.textContent = title;
  const form = document.createElement("form");
  form.className = "form";
  form.noValidate = true;
  const button = createButton(buttonText, { submit: true });
  const warning = createFormWarning();
  form.append(...fields.map((field) => field.element), button, warning.element);
  section.append(heading, form);
  return { section, form, fields, button, warning };
}

/**
 * Builds the screen of a player who is not signed in: the form „Zaloguj się” (address, password)
 * and the form „Załóż konto” (address, password, repeated password), and passes the account to
 * `signedIn`, with the outcome of the confirmation message a registration sent (null after a
 * sign-in), once the server has signed this browser in. Under „Zaloguj się” stands the button
 * „Nie pamiętam hasła”, which puts in place of both forms the form of the same name (address,
 * „Wyślij odnośnik”) with „Wróć do logowania”, which brings them back. One form waits at a time:
 * while it does, the fields and buttons of the whole screen are locked and its button shows the
 * waiting text. A refusal or a lost connection stands as one sentence under the form that sent it,
 * and focus returns to the field or button the player sent it from.
 */
export function createAccountScreen(
  client: Pick<AccountClient, "login" | "register" | "requestPasswordReset">,
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

  const requestEmail = emailField();
  const request = accountForm(
    "Nie pamiętam hasła",
    [requestEmail],
    "Wyślij odnośnik",
  );
  const requestNote = createFormNote();
  request.form.append(requestNote.element);

  // The buttons that move between the states of the screen; they lock with the forms.
  const forgot = createButton("Nie pamiętam hasła");
  forgot.classList.add("account-form-switch");
  login.section.append(forgot);
  const back = createButton("Wróć do logowania");
  back.classList.add("account-form-switch");
  request.section.append(back);

  element.append(login.section, register.section);
  const forms = [login, register, request];
  const switches = [forgot, back];

  // Each request takes the next number; an answer is acted on only while its number is the last.
  let latest = 0;
  let waiting = false;

  function lock(locked: boolean): void {
    for (const form of forms) {
      for (const field of form.fields) field.input.disabled = locked;
      form.button.disabled = locked;
    }
    for (const control of switches) control.disabled = locked;
  }

  function clearMessages(): void {
    for (const form of forms) {
      form.warning.set(null);
      for (const field of form.fields) field.setError(null);
    }
    requestNote.set(null);
  }

  /**
   * Sends one form: waits with the screen locked, then calls `onSuccess` with the value of a
   * successful answer and the control the player sent the form from, or shows the refusal under
   * the form and returns focus to that control. An answer that comes after a reset is ignored.
   */
  async function send<Value>(
    form: AccountForm,
    waitingText: string,
    ask: () => Promise<AccountResult<Value>>,
    onSuccess: (value: Value, origin: HTMLElement) => void,
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
    const answer = ask();
    lock(true);
    setButtonWaiting(form.button, waitingText);
    const result = await answer;
    if (mine !== latest) return;
    waiting = false;
    setButtonWaiting(form.button, null);
    lock(false);
    if (result.ok) {
      onSuccess(result.value, origin);
      return;
    }
    form.warning.set(result.failure.message);
    origin.focus();
  }

  login.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (waiting) return;
    clearMessages();
    void send(
      login,
      "Logowanie…",
      async () =>
        entryOf(
          await client.login(loginEmail.input.value, loginPassword.input.value),
          () => null,
        ),
      signIn,
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
    void send(
      register,
      "Zakładanie konta…",
      async () =>
        entryOf(
          await client.register(
            registerEmail.input.value,
            registerPassword.input.value,
            registerConfirmation.input.value,
          ),
          (registered) => registered.confirmationMessage,
        ),
      signIn,
    );
  });

  request.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (waiting) return;
    clearMessages();
    const message = addressProblem(requestEmail.input.value);
    requestEmail.setError(message);
    if (message !== null) {
      requestEmail.input.focus();
      return;
    }
    void send(
      request,
      "Wysyłanie…",
      () => client.requestPasswordReset(requestEmail.input.value),
      (_none, origin) => {
        // The same sentence for every well-formed address; the form stays for another request.
        requestEmail.input.value = "";
        requestNote.set(RESET_REQUESTED_SENTENCE);
        origin.focus();
      },
    );
  });

  // Each button empties every field and removes every message, swaps the sections and moves focus
  // to the address field of the form it opened.
  forgot.addEventListener("click", () => {
    if (waiting) return;
    reset();
    element.replaceChildren(request.section);
    requestEmail.input.focus();
  });

  back.addEventListener("click", () => {
    if (waiting) return;
    reset();
    loginEmail.input.focus();
  });

  function signIn(entry: SignedInEntry): void {
    reset();
    signedIn(entry.account, entry.message);
  }

  function reset(): void {
    latest += 1;
    waiting = false;
    for (const form of forms) {
      setButtonWaiting(form.button, null);
      for (const field of form.fields) field.input.value = "";
    }
    lock(false);
    clearMessages();
    element.replaceChildren(login.section, register.section);
  }

  return {
    element,
    reset,
    focus: () => loginEmail.input.focus(),
  };
}
