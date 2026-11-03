/**
 * The login card (D-96), the exemplar of a screen in React (D-36): one panel with the game's name,
 * one sentence about it, the page's one sentence (D-261), the form of the state it stands in and
 * the folded credits. Its four states (D-259) are „Zaloguj się” and „Załóż konto”, between which
 * a switch moves, „Nie pamiętam hasła” and „Ustaw nowe hasło”, the form of a password-reset link
 * (D-225).
 *
 * The page holds the card as it holds the game: `createAccountCard` is the one boundary between
 * the DOM page and this screen. Below it each form is a component that holds what is typed as its
 * own state, so a change of state unmounts the form and with it everything typed and every message
 * (D-260). The page is called from an event handler or the continuation of an answer, never from
 * render or an effect, since it may dispose the card from there. Nothing runs when the module is
 * imported.
 */
import { createRef, useLayoutEffect, useRef, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
  ReactElement,
  ReactNode,
  RefObject,
} from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type {
  Account,
  AccountClient,
  AccountResult,
  ConfirmationMessage,
} from "../account-api.js";
import { ABOUT } from "../sim/data/about.js";
import {
  addressProblem,
  passwordProblems,
  registrationProblems,
  RESET_REQUESTED_SENTENCE,
} from "./account-rules.js";
import { ReactButton } from "./controls/react-button.js";
import {
  ReactFormNote,
  ReactFormWarning,
  ReactPasswordField,
  ReactTextField,
} from "./controls/react-text-field.js";
import { CreditsSection } from "./credits-section.js";
import type { ConfirmationNotice, PageAddress } from "./email-confirmation.js";
import { resetOutcome } from "./password-reset.js";
import type { ResetEnding } from "./password-reset.js";

type CardClient = Pick<
  AccountClient,
  "login" | "register" | "requestPasswordReset" | "setPassword"
>;

type SignedIn = (account: Account, message: ConfirmationMessage | null) => void;

/** What a page opened by a password-reset link hands the card. */
export type AccountCardReset = {
  /** The token read from the fragment; it leaves the card only in the request that spends it. */
  token: string;
  address: PageAddress;
  /** Called once the fragment is gone, with the ending the page goes on from. */
  finished: (ending: ResetEnding) => void;
};

export type AccountCardOptions = {
  client: CardClient;
  /** The page's one sentence, which stays through every change of state (D-261). */
  sentence: ConfirmationNotice | null;
  /** The account a form signed in, with the outcome of a confirmation message it sent, if any. */
  signedIn: SignedIn;
  /** Given, the card stands in „Ustaw nowe hasło” and has no other state. */
  reset: AccountCardReset | null;
};

export type AccountCard = {
  /** The card with its screen, for the page to place. */
  element: HTMLElement;
  /** Moves keyboard focus to the first field of the state the card stands in. */
  focus(): void;
  /** Unmounts the card and takes it out of the page; an answer still awaited is then ignored. */
  dispose(): void;
};

/** A state of the card with the switch, or the one it opens through „Nie pamiętam hasła”. */
type CardState = "login" | "register" | "request";

/** The control the player sent a form from, for focus to come back to. */
type FormOrigin = HTMLElement | null;

/** The lock of the whole card while a form waits for the server (spec decision 8). */
type CardLock = {
  /** Whether the card is drawn locked; every field and button of it reads this. */
  locked: boolean;
  /**
   * Whether a form waits: read by handlers, since a request leaves before the commit that shows
   * `locked`.
   */
  isSending: () => boolean;
  /** Sends one form: locks the card, and on the answer unlocks it and calls `answered`. */
  send: <Value>(
    ask: () => Promise<Value>,
    answered: (value: Value) => void,
  ) => void;
  /** Moves focus once the commit under way is in the page; a disabled control cannot take it. */
  focusAfterCommit: (target: () => HTMLElement | null) => void;
};

/** One card-wide wait; an answer that comes after `isDisposed` holds is ignored. */
function useCardLock(isDisposed: () => boolean): CardLock {
  const [locked, setLocked] = useState(false);
  const sending = useRef(false);
  const focusTarget = useRef<(() => HTMLElement | null) | null>(null);

  // After every commit of the card, so it follows the commit that unlocks or opens a state.
  useLayoutEffect(() => {
    const target = focusTarget.current;
    focusTarget.current = null;
    target?.()?.focus();
  });

  return {
    locked,
    isSending: () => sending.current,
    send(ask, answered) {
      sending.current = true;
      setLocked(true);
      void ask().then((value) => {
        if (isDisposed()) return;
        sending.current = false;
        setLocked(false);
        answered(value);
      });
    },
    focusAfterCommit(target) {
      focusTarget.current = target;
    },
  };
}

/** One field's value, the message under it and its input. */
function useField(sharedRef?: RefObject<HTMLInputElement | null>) {
  const ownRef = useRef<HTMLInputElement>(null);
  const inputRef = sharedRef ?? ownRef;
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  return {
    value,
    setValue,
    setError,
    focus: () => inputRef.current?.focus(),
    /** What the shared field takes: the card's state controls it. */
    control: {
      value,
      error,
      inputRef,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
    },
  };
}

type CardField = ReturnType<typeof useField>;

/**
 * Shows each field's problem under it, or none, and moves focus to the first field at fault.
 * Returns whether there was one: such a form sends nothing.
 */
function showProblems(checked: [CardField, string | null | undefined][]) {
  let first: CardField | null = null;
  for (const [field, problem] of checked) {
    field.setError(problem ?? null);
    if (problem && first === null) first = field;
  }
  first?.focus();
  return first !== null;
}

/** The fields of an account, copied, so nothing else of the answer passes on. */
function accountOf({ id, email, emailConfirmed }: Account): Account {
  return { id, email, emailConfirmed };
}

/** A text input with the keyboard of an address; the browser's own check is stricter than the server's. */
function AddressField({ field, lock }: { field: CardField; lock: CardLock }) {
  return (
    <ReactTextField
      label="Adres e-mail"
      hint="adres e-mail"
      visibleLabel
      autocomplete="email"
      inputMode="email"
      spellCheck={false}
      disabled={lock.locked}
      {...field.control}
    />
  );
}

type CardFormProps = {
  lock: CardLock;
  /** The heading of a state without the switch (D-259). */
  heading?: string;
  submitText: string;
  /** The text of the submit button while the form waits for the server (D-44). */
  waitingText: string;
  /** The sentence of a refusal or a lost connection, under the form. */
  warning: string | null;
  /** The sentence of an answer that refuses nothing; left out by a form that has none. */
  note?: string | null;
  /** Called when the player sends the form, unless a form waits. */
  onSend: (origin: FormOrigin) => void;
  /** The fields of the form. */
  children: ReactNode;
  /** The button under the form that leaves it, if it has one. */
  exit?: ReactElement;
};

/** One form of the card, its submit button and sentences, and the way out under it. */
function CardForm({
  lock,
  heading,
  submitText,
  waitingText,
  warning,
  note,
  onSend,
  children,
  exit,
}: CardFormProps) {
  const submitButton = useRef<HTMLButtonElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (lock.isSending()) return;
    // The control the player sent the form from: the field where Enter was pressed or the button.
    const active = document.activeElement;
    onSend(
      active instanceof HTMLElement && event.currentTarget.contains(active)
        ? active
        : submitButton.current,
    );
  }

  return (
    <section className="account-form">
      {heading === undefined ? null : <h2>{heading}</h2>}
      <form className="form" noValidate onSubmit={handleSubmit}>
        {children}
        <ReactButton
          text={submitText}
          submit
          waitingText={lock.locked ? waitingText : null}
          buttonRef={submitButton}
        />
        <ReactFormWarning sentence={warning} />
        {note === undefined ? null : <ReactFormNote sentence={note} />}
      </form>
      {exit === undefined ? null : (
        <div className="account-form-switch">{exit}</div>
      )}
    </section>
  );
}

type FormProps = {
  client: CardClient;
  lock: CardLock;
  firstField: RefObject<HTMLInputElement | null>;
};

type SigningFormProps = FormProps & { signedIn: SignedIn };

/** „Zaloguj się”: address, password and the way to „Nie pamiętam hasła”. */
function LoginForm({
  client,
  lock,
  firstField,
  signedIn,
  onForgotten,
}: SigningFormProps & { onForgotten: () => void }) {
  const address = useField(firstField);
  const password = useField();
  const [warning, setWarning] = useState<string | null>(null);

  function send(origin: FormOrigin): void {
    setWarning(null);
    lock.send(
      () => client.login(address.value, password.value),
      (result) => {
        if (!result.ok) {
          setWarning(result.failure.message);
          lock.focusAfterCommit(() => origin);
          return;
        }
        address.setValue("");
        password.setValue("");
        signedIn(accountOf(result.value), null);
      },
    );
  }

  return (
    <CardForm
      lock={lock}
      submitText="Zaloguj się"
      waitingText="Logowanie…"
      warning={warning}
      onSend={send}
      exit={
        <ReactButton
          text="Nie pamiętam hasła"
          kind="secondary"
          disabled={lock.locked}
          onClick={onForgotten}
        />
      }
    >
      <AddressField field={address} lock={lock} />
      <ReactPasswordField
        label="Hasło"
        hint="hasło"
        visibleLabel
        autocomplete="current-password"
        disabled={lock.locked}
        {...password.control}
      />
    </CardForm>
  );
}

/** „Załóż konto”: address, password and repeated password, checked before anything is sent. */
function RegisterForm({
  client,
  lock,
  firstField,
  signedIn,
}: SigningFormProps) {
  const address = useField(firstField);
  const password = useField();
  const confirmation = useField();
  const [warning, setWarning] = useState<string | null>(null);

  function send(origin: FormOrigin): void {
    setWarning(null);
    const problems = registrationProblems(
      address.value,
      password.value,
      confirmation.value,
    );
    const refused = showProblems([
      [address, problems.email],
      [password, problems.password],
      [confirmation, problems.confirmation],
    ]);
    if (refused) return;
    lock.send(
      () => client.register(address.value, password.value, confirmation.value),
      (result) => {
        if (!result.ok) {
          setWarning(result.failure.message);
          lock.focusAfterCommit(() => origin);
          return;
        }
        address.setValue("");
        password.setValue("");
        confirmation.setValue("");
        signedIn(accountOf(result.value), result.value.confirmationMessage);
      },
    );
  }

  return (
    <CardForm
      lock={lock}
      submitText="Załóż konto"
      waitingText="Zakładanie konta…"
      warning={warning}
      onSend={send}
    >
      <AddressField field={address} lock={lock} />
      <ReactPasswordField
        label="Hasło"
        hint="hasło"
        visibleLabel
        autocomplete="new-password"
        disabled={lock.locked}
        {...password.control}
      />
      <ReactPasswordField
        label="Powtórz hasło"
        hint="hasło jeszcze raz"
        visibleLabel
        autocomplete="new-password"
        disabled={lock.locked}
        {...confirmation.control}
      />
    </CardForm>
  );
}

/**
 * „Nie pamiętam hasła”: an address and „Wyślij odnośnik”. The form stays after the answer, with the
 * same sentence for every well-formed address, for another request (D-222).
 */
function RequestForm({
  client,
  lock,
  firstField,
  onBack,
}: FormProps & { onBack: () => void }) {
  const address = useField(firstField);
  const [warning, setWarning] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  function send(origin: FormOrigin): void {
    setWarning(null);
    setNote(null);
    if (showProblems([[address, addressProblem(address.value)]])) return;
    lock.send(
      () => client.requestPasswordReset(address.value),
      (result: AccountResult<null>) => {
        lock.focusAfterCommit(() => origin);
        if (!result.ok) {
          setWarning(result.failure.message);
          return;
        }
        address.setValue("");
        setNote(RESET_REQUESTED_SENTENCE);
      },
    );
  }

  return (
    <CardForm
      lock={lock}
      heading="Nie pamiętam hasła"
      submitText="Wyślij odnośnik"
      waitingText="Wysyłanie…"
      warning={warning}
      note={note}
      onSend={send}
      exit={
        <ReactButton
          text="Wróć do logowania"
          kind="secondary"
          disabled={lock.locked}
          onClick={onBack}
        />
      }
    >
      <AddressField field={address} lock={lock} />
    </CardForm>
  );
}

/**
 * „Ustaw nowe hasło”: it sends nothing until the player sends the form. A change, a refusal of the
 * link and „Anuluj” clear the fragment of the address first and only then call `finished`, so
 * neither a reload nor the back button returns to the token; any other failure keeps the form and
 * the link (D-225).
 */
function ResetForm({
  client,
  lock,
  firstField,
  reset,
}: FormProps & { reset: AccountCardReset }) {
  const password = useField(firstField);
  const confirmation = useField();
  const [warning, setWarning] = useState<string | null>(null);
  const ended = useRef(false);

  function end(ending: ResetEnding): void {
    if (ended.current) return;
    ended.current = true;
    reset.address.clearFragment();
    reset.finished(ending);
  }

  function send(origin: FormOrigin): void {
    if (ended.current) return;
    setWarning(null);
    const problems = passwordProblems(password.value, confirmation.value);
    const refused = showProblems([
      [password, problems.password],
      [confirmation, problems.confirmation],
    ]);
    if (refused) return;
    lock.send(
      () => client.setPassword(reset.token, password.value, confirmation.value),
      (result) => {
        const outcome = resetOutcome(result);
        if (outcome.kind !== "failed") {
          end(outcome.kind);
          return;
        }
        setWarning(outcome.message);
        lock.focusAfterCommit(() => origin);
      },
    );
  }

  function cancel(): void {
    if (!lock.isSending()) end("cancelled");
  }

  return (
    <CardForm
      lock={lock}
      heading="Ustaw nowe hasło"
      submitText="Ustaw hasło"
      waitingText="Ustawianie…"
      warning={warning}
      onSend={send}
      exit={
        <ReactButton
          text="Anuluj"
          kind="secondary"
          disabled={lock.locked}
          onClick={cancel}
        />
      }
    >
      <ReactPasswordField
        label="Nowe hasło"
        hint="nowe hasło"
        visibleLabel
        autocomplete="new-password"
        disabled={lock.locked}
        {...password.control}
      />
      <ReactPasswordField
        label="Powtórz hasło"
        hint="hasło jeszcze raz"
        visibleLabel
        autocomplete="new-password"
        disabled={lock.locked}
        {...confirmation.control}
      />
    </CardForm>
  );
}

/** The one sentence of the page, in its role, as `createConfirmationNotice` gives it. */
function PageSentence({ notice }: { notice: ConfirmationNotice }) {
  return (
    <p
      className={`confirmation-notice ${notice.role}`}
      role={notice.role === "warning" ? "alert" : "status"}
    >
      {notice.text}
    </p>
  );
}

type CardProps = AccountCardOptions & {
  firstField: RefObject<HTMLInputElement | null>;
  isDisposed: () => boolean;
};

/** The card: what stands in every state, and the form of the state it stands in. */
function Card({
  client,
  sentence,
  signedIn,
  reset,
  firstField,
  isDisposed,
}: CardProps) {
  const [state, setState] = useState<CardState>("login");
  const lock = useCardLock(isDisposed);

  /** Changes the state of the card, and puts focus in the first field of the form it opened. */
  function open(next: CardState): void {
    if (lock.isSending() || next === state) return;
    lock.focusAfterCommit(() => firstField.current);
    setState(next);
  }

  const forms = { client, lock, firstField };
  const hasSwitch = reset === null && state !== "request";

  return (
    <div className="account-card">
      <h1>{ABOUT.name}</h1>
      <p className="account-card-about">{ABOUT.sentence}</p>
      {sentence === null ? null : <PageSentence notice={sentence} />}
      {hasSwitch ? (
        <div className="account-card-switch tabs">
          <ReactButton
            text="Zaloguj się"
            kind="tab"
            selected={state === "login"}
            disabled={lock.locked}
            onClick={() => {
              open("login");
            }}
          />
          <ReactButton
            text="Załóż konto"
            kind="tab"
            selected={state === "register"}
            disabled={lock.locked}
            onClick={() => {
              open("register");
            }}
          />
        </div>
      ) : null}
      {reset !== null ? (
        <ResetForm {...forms} reset={reset} />
      ) : state === "login" ? (
        <LoginForm
          {...forms}
          signedIn={signedIn}
          onForgotten={() => {
            open("request");
          }}
        />
      ) : state === "register" ? (
        <RegisterForm {...forms} signedIn={signedIn} />
      ) : (
        <RequestForm
          {...forms}
          onBack={() => {
            open("login");
          }}
        />
      )}
      <CreditsSection />
    </div>
  );
}

/**
 * Builds the card in an element of its own, for the page to place. The render is synchronous, so
 * the card stands in the element when this returns and the page has no frame with an empty screen.
 * Each opening is a new root: nothing typed outlives `dispose()`.
 */
export function createAccountCard(options: AccountCardOptions): AccountCard {
  const element = document.createElement("div");
  element.className = "account-card-screen";
  const root = createRoot(element);
  const firstField = createRef<HTMLInputElement>();
  let disposed = false;
  flushSync(() => {
    root.render(
      <Card {...options} firstField={firstField} isDisposed={() => disposed} />,
    );
  });
  return {
    element,
    focus: () => firstField.current?.focus(),
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
