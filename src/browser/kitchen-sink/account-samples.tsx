/**
 * The groups of the kitchen-sink page that show the forms and the part of the menu „Konto” (D-45):
 * the forms of the account screen waiting for the server and with a refusal sentence, the form
 * „Nie pamiętam hasła” with the sentence that answers its request, and the part of the open menu
 * for an unconfirmed address, with made-up values. The menu itself is a screen with state of its
 * own, so the part of it is drawn here from the same controls and the pure sentences of
 * `email-status.ts`, which the menu uses too. Like every module of the page, it stands in
 * `src/browser/kitchen-sink/`, so nothing of it is compiled into what `npm run build` writes.
 */
import { useState } from "react";
import type { ConfirmationMessage } from "../account-api.js";
import { RESET_REQUESTED_SENTENCE } from "../view/account-rules.js";
import { ReactButton } from "../view/controls/react-button.js";
import {
  ReactFormNote,
  ReactFormWarning,
  ReactPasswordField,
  ReactTextField,
} from "../view/controls/react-text-field.js";
import { messageSentence, UNCONFIRMED_SENTENCE } from "../view/email-status.js";
import { FormFigure, Section } from "./sample-parts.js";

/**
 * The sentences of the server (D-100, D-102) and of the client in `account-api.ts`, as a form
 * shows them (D-44).
 */
const REFUSAL = "Nieprawidłowy adres e-mail lub hasło.";
const ACCOUNT_EXISTS = "Konto z tym adresem już istnieje.";
const NO_CONNECTION = "Brak połączenia z serwerem. Spróbuj ponownie.";
const SERVER_ERROR = "Serwer nie mógł obsłużyć żądania. Spróbuj ponownie.";
const TOO_MANY_ATTEMPTS = "Za dużo prób. Spróbuj ponownie za kilka minut.";

/** A field of a form of the page, with its made-up value. */
type FormField = {
  password: boolean;
  label: string;
  hint: string;
  autocomplete: string;
  value: string;
};

const ADDRESS: FormField = {
  password: false,
  label: "Adres e-mail",
  hint: "adres e-mail",
  autocomplete: "email",
  value: "przyklad@example.com",
};

function passwordField(
  label: string,
  hint: string,
  autocomplete: string,
): FormField {
  return {
    password: true,
    label,
    hint,
    autocomplete,
    value: "przykładowe-hasło",
  };
}

/** The kinds of form the page shows, each with its button, its waiting text and its fields. */
const FORM_KINDS = {
  login: {
    button: "Zaloguj się",
    waiting: "Logowanie…",
    fields: [ADDRESS, passwordField("Hasło", "hasło", "current-password")],
  },
  register: {
    button: "Załóż konto",
    waiting: "Zakładanie konta…",
    fields: [
      ADDRESS,
      passwordField("Hasło", "hasło", "new-password"),
      passwordField("Powtórz hasło", "hasło jeszcze raz", "new-password"),
    ],
  },
  request: {
    button: "Wyślij odnośnik",
    waiting: "Wysyłanie…",
    fields: [ADDRESS],
  },
  reset: {
    button: "Ustaw hasło",
    waiting: "Ustawianie…",
    fields: [
      passwordField("Nowe hasło", "nowe hasło", "new-password"),
      passwordField("Powtórz hasło", "hasło jeszcze raz", "new-password"),
    ],
  },
} as const satisfies Record<
  string,
  { button: string; waiting: string; fields: readonly FormField[] }
>;

type FormKind = keyof typeof FORM_KINDS;

/**
 * A form of the account screen as the page shows it, with a made-up address and password: the
 * sign-in form, the registration form, the form „Nie pamiętam hasła” or the form „Ustaw nowe
 * hasło”, waiting for the server (its fields locked and its button waiting), with the sentence of
 * a refusal under it, or, for the request form, with the sentence that answers a request (shown in
 * `text` with a bar at its left, which refuses nothing). The fields hold what is typed in them.
 */
function FormSample({
  kind,
  state,
  sentence,
}: {
  kind: FormKind;
  state: "waiting" | "warning" | "note";
  sentence: string | null;
}) {
  const { button, waiting, fields } = FORM_KINDS[kind];
  const [values, setValues] = useState<readonly string[]>(
    fields.map((field) => field.value),
  );
  return (
    <form
      className="form"
      onSubmit={(event) => {
        // The page sends nothing: the handler only keeps the page from reloading on Enter.
        event.preventDefault();
      }}
    >
      {fields.map((field, index) => {
        const Field = field.password ? ReactPasswordField : ReactTextField;
        return (
          <Field
            key={field.label}
            label={field.label}
            hint={field.hint}
            visibleLabel
            autocomplete={field.autocomplete}
            value={values[index]}
            onChange={(event) => {
              setValues(
                values.map((held, at) =>
                  at === index ? event.target.value : held,
                ),
              );
            }}
            disabled={state === "waiting"}
          />
        );
      })}
      <ReactButton
        text={button}
        submit
        waitingText={state === "waiting" ? waiting : null}
      />
      {state === "note" ? (
        <ReactFormNote sentence={sentence} />
      ) : (
        <ReactFormWarning sentence={sentence} />
      )}
    </form>
  );
}

export function FormsSection() {
  return (
    <Section title="Formularze czekające na serwer">
      <div className="form-samples">
        <FormFigure name="Zaloguj się: oczekiwanie na serwer">
          <FormSample kind="login" state="waiting" sentence={null} />
        </FormFigure>
        <FormFigure name="Załóż konto: oczekiwanie na serwer">
          <FormSample kind="register" state="waiting" sentence={null} />
        </FormFigure>
        <FormFigure name="Zaloguj się: odmowa serwera">
          <FormSample kind="login" state="warning" sentence={REFUSAL} />
        </FormFigure>
        <FormFigure name="Załóż konto: odmowa serwera">
          <FormSample
            kind="register"
            state="warning"
            sentence={ACCOUNT_EXISTS}
          />
        </FormFigure>
        <FormFigure name="Załóż konto: brak połączenia">
          <FormSample
            kind="register"
            state="warning"
            sentence={NO_CONNECTION}
          />
        </FormFigure>
        <FormFigure name="Nie pamiętam hasła: oczekiwanie na serwer">
          <FormSample kind="request" state="waiting" sentence={null} />
        </FormFigure>
        <FormFigure name="Nie pamiętam hasła: odmowa serwera">
          <FormSample kind="request" state="warning" sentence={SERVER_ERROR} />
        </FormFigure>
        <FormFigure name="Nie pamiętam hasła: odpowiedź na prośbę">
          <FormSample
            kind="request"
            state="note"
            sentence={RESET_REQUESTED_SENTENCE}
          />
        </FormFigure>
        <FormFigure name="Ustaw nowe hasło: oczekiwanie na serwer">
          <FormSample kind="reset" state="waiting" sentence={null} />
        </FormFigure>
        <FormFigure name="Ustaw nowe hasło: odmowa serwera">
          <FormSample
            kind="reset"
            state="warning"
            sentence={TOO_MANY_ATTEMPTS}
          />
        </FormFigure>
      </div>
    </Section>
  );
}

/** A made-up address: the page names no real one and holds no game state. */
const SAMPLE_ADDRESS = "przyklad@example.com";

/**
 * The part of the open menu „Konto” for an unconfirmed address (D-157), drawn from the shared
 * button and the sentences of `email-status.ts`, with the classes the menu itself draws with: the
 * address, the sentence, and „Wyślij ponownie” — waiting for the answer (the button disabled and
 * reading „Wysyłanie…”), or beside the sentence of a message the limit or a failure kept from being
 * sent. The menu is a screen with state of its own, so the part is drawn here; the button waits at
 * once and sends nothing.
 */
function MenuSample({ state }: { state: ConfirmationMessage | "waiting" }) {
  const sentence =
    state === "waiting"
      ? UNCONFIRMED_SENTENCE
      : messageSentence(state, SAMPLE_ADDRESS);
  return (
    <div className="menu-sample">
      <div className="account-menu-block">
        <p className="account-menu-address">{SAMPLE_ADDRESS}</p>
        <div className="account-menu-unconfirmed">
          <p
            className={
              sentence.role === "warning"
                ? "account-menu-sentence warning"
                : "account-menu-sentence"
            }
            aria-live="polite"
          >
            {sentence.text}
          </p>
          <ReactButton
            text="Wyślij ponownie"
            waitingText={state === "waiting" ? "Wysyłanie…" : null}
          />
        </div>
      </div>
    </div>
  );
}

export function MenuSection() {
  return (
    <Section title="„Konto” z niepotwierdzonym adresem: część narysowana ze wspólnych kontrolek">
      <div className="form-samples">
        <FormFigure name="Wyślij ponownie: oczekiwanie na serwer">
          <MenuSample state="waiting" />
        </FormFigure>
        <FormFigure name="Wyślij ponownie: pułap wiadomości">
          <MenuSample state="limited" />
        </FormFigure>
        <FormFigure name="Wyślij ponownie: wysyłka się nie udała">
          <MenuSample state="failed" />
        </FormFigure>
      </div>
    </Section>
  );
}
