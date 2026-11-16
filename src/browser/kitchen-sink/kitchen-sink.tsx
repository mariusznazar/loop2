/**
 * The kitchen-sink page of the browser view (D-45): every shared control in each of the seven
 * states of the styleguide's rule "States of shared controls", or the reason a state does not
 * apply; every role of the styleguide's table Roles; and samples of tiles in each state, drawn
 * with the roles by the game's own stylesheet — never a drawing of the game from a game state
 * (D-04). Forms and the part of the menu „Konto” for an unconfirmed address are shown waiting for
 * the server and with a refusal sentence, and the form „Nie pamiętam hasła” with the sentence that
 * answers its request, with made-up values. The page is one React root on a host element it
 * appends to the body, and it draws each control from the React form the game draws it from
 * (D-269); the menu itself is a screen with state of its own, so the part of it is drawn here from
 * the same controls and the pure sentences of `email-status.ts`, which the menu uses too. Code
 * only this page needs stays in this module: beyond it the page imports only modules the game
 * itself uses, so nothing of the page is compiled into what `npm run build` writes.
 */
import { createRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { ConfirmationMessage } from "../account-api.js";
import { RESOURCES } from "../sim/data/resources.js";
import { hexCenter, hexCorners, tileLabel } from "../sim/hex.js";
import type { ConditionNumber } from "../sim/program.js";
import type { Hex } from "../sim/types.js";
import { RESET_REQUESTED_SENTENCE } from "../view/account-rules.js";
import { ReactButton } from "../view/controls/react-button.js";
import type { ReactButtonProps } from "../view/controls/react-button.js";
import { ReactNumberField } from "../view/controls/react-number-field.js";
import type { NumberRule } from "../view/controls/react-number-field.js";
import { ReactPickCell } from "../view/controls/react-pick-cell.js";
import { ReactSelectList } from "../view/controls/react-select-list.js";
import {
  ReactFormNote,
  ReactFormWarning,
  ReactPasswordField,
  ReactTextField,
} from "../view/controls/react-text-field.js";
import { messageSentence, UNCONFIRMED_SENTENCE } from "../view/email-status.js";
import { ICON_SQUARE, iconPlaces, TILE_SIZE } from "../view/terrain-picture.js";

/** The page's marker: it stands in this module and in the page's HTML, in no other file of src. */
export const PAGE_MARKER = "loop2-kitchen-sink-page";

/** Room around the tiles for the outlines' stroke, as in `terrain-drawing.tsx`. */
const MARGIN = 4;

// --- controls -------------------------------------------------------------------------------

type State =
  "default" | "hover" | "focus" | "disabled" | "error" | "empty" | "loading";

/** The seven states, in the order of the styleguide's rule, with their names on the page. */
const STATES: readonly (readonly [State, string])[] = [
  ["default", "zwykły"],
  ["hover", "pod kursorem"],
  ["focus", "z fokusem"],
  ["disabled", "wyłączony"],
  ["error", "błąd"],
  ["empty", "pusty"],
  ["loading", "ładowanie"],
];

/** Why a state does not apply, in the words of the styleguide's rule. */
const NOT_APPLYING = {
  buttonError: "Nie dotyczy: przycisk nie ma niepoprawnej wartości.",
  buttonEmpty: "Nie dotyczy: przycisk nie ma pozycji ani wpisu.",
  listError: "Nie dotyczy: lista podaje tylko poprawne pozycje.",
  buttonLoading:
    "Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz (D-44).",
  secondaryLoading:
    "Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz; akcja poboczna jest wtedy wyłączona (D-275).",
  tabLoading:
    "Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz; zakładka jest wtedy wyłączona, z linią wyboru (D-276).",
  mainLoading:
    "Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz; ten przycisk nie wysyła formularza, a wyłączony wygląda jak każdy wyłączony (D-274).",
  listLoading:
    "Nie dotyczy: żaden formularz, który czeka na serwer, nie ma listy wyboru (D-44).",
  pickError: "Nie dotyczy: komórka nie ma wpisu, który mógłby być błędny.",
  pickEmpty: "Nie dotyczy: komórka jest jedną pozycją, nie listą.",
  pickLoading:
    "Nie dotyczy: żaden formularz, który czeka na serwer, nie ma komórki wyboru (D-44).",
  numberLoading:
    "Nie dotyczy: żaden formularz, który czeka na serwer, nie ma pola liczby (D-44).",
};

/** The reason a state does not apply to a control, as the page shows it. */
function reason(text: string): ReactNode {
  return <span className="sample-reason">{text}</span>;
}

/**
 * Hover and focus cannot be held by the page, so their samples stand in a wrapper that carries a
 * class `kitchen-sink.css` draws as the game draws the state, on the control inside it: hover from
 * the role `highlight` (the secondary action's hover by its own rule, in `text` on the background
 * it has; the destructive button's hover and focus in `danger` by the rules of its own in
 * `kitchen-sink.css`), focus by the one `:focus-visible` rule, repeated there with the selector of
 * the wrapper's class. The wrapper stands round the control, so the control's own element carries
 * nothing for the page.
 */
function Forced({ state, children }: { state: State; children: ReactNode }) {
  const forced =
    state === "hover"
      ? "sample-hover"
      : state === "focus"
        ? "sample-focus"
        : undefined;
  return <span className={forced}>{children}</span>;
}

/**
 * What the loading state of a button shows: the reason the state does not apply to it, or the
 * button's resting text and the text it shows while it waits for the server, null where the button
 * keeps its text and is only disabled, as „Zacznij od zera” does while its reset waits (D-44, D-402).
 */
type Loading = string | readonly [string, string | null];

/** The kinds and flags that make a button the kind a row of the page shows. */
type ButtonLook = Pick<ReactButtonProps, "kind" | "submit" | "selected">;

/**
 * A button of the given look in each state. A tab is shown as a group of its kind sets it, selected
 * or not, inside the container of the class `tabs`.
 */
function buttonSample(text: string, look: ButtonLook, loading: Loading) {
  return (state: State): ReactNode => {
    if (state === "error") return reason(NOT_APPLYING.buttonError);
    if (state === "empty") return reason(NOT_APPLYING.buttonEmpty);
    if (state === "loading") {
      if (typeof loading === "string") return reason(loading);
      const [resting, waiting] = loading;
      return (
        <ReactButton
          text={resting}
          {...look}
          waitingText={waiting}
          disabled={waiting === null}
        />
      );
    }
    const button = (
      <ReactButton text={text} {...look} disabled={state === "disabled"} />
    );
    // The container stands inside the wrapper, so `.tabs > .button.tab` of styles.css still holds.
    return (
      <Forced state={state}>
        {look.kind === "tab" ? <div className="tabs">{button}</div> : button}
      </Forced>
    );
  };
}

/**
 * A pick cell of the rule panel in each state, chosen or not (D-288, D-289). Its action is a made-up
 * sample; the greyed state carries a reason of the panel, and the icon greys with the cell.
 */
function pickCellSample(chosen: boolean) {
  return (state: State): ReactNode => {
    if (state === "error") return reason(NOT_APPLYING.pickError);
    if (state === "empty") return reason(NOT_APPLYING.pickEmpty);
    if (state === "loading") return reason(NOT_APPLYING.pickLoading);
    const greyed = state === "disabled";
    return (
      <Forced state={state}>
        <ReactPickCell
          text="Zbierz"
          icon="grab"
          chosen={chosen}
          greyed={greyed}
          reason={greyed ? "nie znasz jeszcze celu" : null}
        />
      </Forced>
    );
  };
}

/** The select list in a state; it keeps the position chosen in its own state, as a screen would. */
function SelectListSample({ state }: { state: State }) {
  const [chosen, setChosen] = useState("first");
  return (
    <Forced state={state}>
      <ReactSelectList
        label="Lista wyboru"
        options={
          state === "empty"
            ? []
            : [
                ["first", "Pierwsza pozycja"],
                ["second", "Druga pozycja"],
              ]
        }
        value={state === "empty" ? "" : chosen}
        disabled={state === "disabled"}
        onChange={(event) => {
          setChosen(event.target.value);
        }}
      />
    </Forced>
  );
}

function selectListSample(state: State): ReactNode {
  if (state === "error") return reason(NOT_APPLYING.listError);
  if (state === "loading") return reason(NOT_APPLYING.listLoading);
  return <SelectListSample state={state} />;
}

/**
 * A text field or a password field in a state, holding its value in its own state as a screen
 * would. A field is locked while its form waits for the server, so loading shows it disabled.
 */
function TextFieldSample({
  state,
  password,
  label,
  hint,
  value,
  wrong,
}: {
  state: State;
  password: boolean;
  label: string;
  hint: string;
  value: string;
  wrong: string;
}) {
  const [typed, setTyped] = useState(
    state === "empty" ? "" : state === "error" ? wrong : value,
  );
  const Field = password ? ReactPasswordField : ReactTextField;
  return (
    <Forced state={state}>
      <Field
        label={label}
        hint={hint}
        value={typed}
        onChange={(event) => {
          setTyped(event.target.value);
        }}
        disabled={state === "disabled" || state === "loading"}
        error={state === "error" ? "Wpis jest niepoprawny." : null}
      />
    </Forced>
  );
}

/** The range of the number field's sample, made up; the page has no rule of any screen. */
const SAMPLE_NUMBER: ConditionNumber = {
  defaultValue: 12,
  min: 0,
  max: 99,
  step: 1,
};

/** The rule of the numbers the sample takes: a number, held to the range; any other text is refused. */
const sampleNumberRule: NumberRule = (text) => {
  const typed = Number(text);
  if (text.trim() === "" || Number.isNaN(typed)) return null;
  return {
    value: Math.min(SAMPLE_NUMBER.max, Math.max(SAMPLE_NUMBER.min, typed)),
    commit: true,
  };
};

/** The input of the number field's sample of the empty state, which the page empties once drawn. */
const emptyNumberInput = createRef<HTMLInputElement>();

/** The number field in a state, holding the number it commits as a screen would. */
function NumberFieldSample({ state }: { state: State }) {
  const [held, setHeld] = useState(state === "error" ? 120 : 12);
  return (
    <Forced state={state}>
      <ReactNumberField
        label="Pole liczby"
        number={SAMPLE_NUMBER}
        value={held}
        rule={sampleNumberRule}
        onCommit={setHeld}
        disabled={state === "disabled"}
        error={state === "error" ? "Wpis jest niepoprawny." : null}
        inputRef={state === "empty" ? emptyNumberInput : undefined}
      />
    </Forced>
  );
}

/**
 * The shared controls of D-44 and the pick cell of D-288, each with the maker of its samples, and
 * beside the button the looks other kinds of it have: the main button of D-274, the one that sends
 * a form and, as the kind `main`, the one that sends none, and the tab of D-276, which is the
 * button selected in its group drawn as a tab. The password field is the text field with its entry
 * hidden.
 */
const CONTROLS: readonly (readonly [string, (state: State) => ReactNode])[] = [
  [
    "Przycisk",
    buttonSample("Wyślij ponownie", {}, ["Wyślij ponownie", "Wysyłanie…"]),
  ],
  [
    "Przycisk główny",
    buttonSample("Zaloguj się", { submit: true }, [
      "Zaloguj się",
      "Logowanie…",
    ]),
  ],
  [
    "Przycisk główny poza formularzem",
    buttonSample("Wejdź", { kind: "main" }, NOT_APPLYING.mainLoading),
  ],
  [
    "Przycisk niszczący",
    buttonSample("Zakończ", { kind: "destructive" }, ["Zacznij od zera", null]),
  ],
  [
    "Przycisk w zieleni",
    buttonSample("Odbierz", { kind: "positive" }, NOT_APPLYING.buttonLoading),
  ],
  [
    "Przycisk wybrany w grupie",
    buttonSample("Wybrany", { selected: true }, NOT_APPLYING.buttonLoading),
  ],
  [
    "Akcja poboczna",
    buttonSample(
      "Wróć do logowania",
      { kind: "secondary" },
      NOT_APPLYING.secondaryLoading,
    ),
  ],
  [
    "Zakładka niewybrana",
    buttonSample(
      "Załóż konto",
      { kind: "tab", selected: false },
      NOT_APPLYING.tabLoading,
    ),
  ],
  [
    "Zakładka wybrana",
    buttonSample(
      "Zaloguj się",
      { kind: "tab", selected: true },
      NOT_APPLYING.tabLoading,
    ),
  ],
  ["Komórka wyboru", pickCellSample(false)],
  ["Komórka wyboru wybrana", pickCellSample(true)],
  ["Lista wyboru", selectListSample],
  [
    "Pole liczby",
    (state) =>
      state === "loading" ? (
        reason(NOT_APPLYING.numberLoading)
      ) : (
        <NumberFieldSample state={state} />
      ),
  ],
  [
    "Pole tekstowe",
    (state) => (
      <TextFieldSample
        state={state}
        password={false}
        label="Pole tekstowe"
        hint="podpowiedź"
        value="Tekst wpisu"
        wrong="?"
      />
    ),
  ],
  [
    "Pole hasła",
    (state) => (
      <TextFieldSample
        state={state}
        password
        label="Pole hasła"
        hint="hasło"
        value="przykładowe-hasło"
        wrong="krótkie"
      />
    ),
  ],
];

function ControlsSection() {
  return (
    <Section title="Wspólne kontrolki w stanach">
      <div className="sample-panel">
        <table className="sample-table">
          <thead>
            <tr>
              <th>Kontrolka</th>
              {STATES.map(([state, name]) => (
                <th key={state}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CONTROLS.map(([name, sample]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                {STATES.map(([state]) => (
                  <td key={state}>{sample(state)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

// --- forms waiting for the server -----------------------------------------------------------

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

/** A sample with its name under it, as the forms and the part of the menu are listed. */
function FormFigure({ name, children }: { name: string; children: ReactNode }) {
  return (
    <figure className="form-sample">
      {children}
      <figcaption>{name}</figcaption>
    </figure>
  );
}

function FormsSection() {
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

// --- part of the menu „Konto” for an unconfirmed address -----------------------------------

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

function MenuSection() {
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

// --- roles ----------------------------------------------------------------------------------

/** The kinds of the table Roles, by their names on the page. */
type Kind = "tło" | "tekst" | "inne";

/** The 26 roles of the styleguide's table Roles, in its order, with their kinds. */
const ROLES: readonly (readonly [string, Kind])[] = [
  ["page", "tło"],
  ["panel", "tło"],
  ["highlight", "tło"],
  ["rule-winning", "tło"],
  ["rule-running", "tło"],
  ["divider", "inne"],
  ["control-border", "inne"],
  ["selected", "inne"],
  ["condition-unmet", "inne"],
  ["text-strong", "tekst"],
  ["text", "tekst"],
  ["text-secondary", "tekst"],
  ["text-label", "tekst"],
  ["text-disabled", "tekst"],
  ["positive", "tekst"],
  ["warning", "tekst"],
  ["danger", "tekst"],
  ["discovery", "tekst"],
  ["player-change", "tekst"],
  ["character", "inne"],
  ["tile-hidden", "inne"],
  ["tile-revealed", "inne"],
  ["tile-edge", "inne"],
  ["link-highlight", "inne"],
  ["depleted", "inne"],
  ["focus", "inne"],
];

/** The five roles of the kind background, on which every role of the kind text stands. */
const SURFACES = ROLES.filter(([, kind]) => kind === "tło").map(
  ([name]) => name,
);

/** The icon files of the resources, in the data's order, never named here (D-18). */
const ICONS = Object.values(RESOURCES).map(({ icon }) => `/icons/${icon}.svg`);

/**
 * An icon file drawn as the game draws it: the mask `icon-mask`, in the colour its place gives. A
 * `span` beside text, as the game draws it there, and a `div` in the foreign object of the drawing.
 */
function IconMask({
  href,
  tag,
  className,
}: {
  href: string;
  tag: "span" | "div";
  className?: string;
}) {
  const Tag = tag;
  return (
    <Tag
      className={
        className === undefined ? "icon-mask" : `icon-mask ${className}`
      }
      style={{ "--icon": `url("${href}")` } as CSSProperties}
    />
  );
}

function RoleSample({ name, kind }: { name: string; kind: Kind }) {
  if (kind === "tło") {
    // A background with the text that stands on it (styleguide: "Every background with its text").
    return (
      <span className="role-sample">
        <span
          className="role-surface"
          style={{ backgroundColor: `var(--${name})` }}
        >
          Treść na tym tle
        </span>
      </span>
    );
  }
  if (kind === "tekst") {
    return (
      <span className="role-sample">
        {SURFACES.map((surface) => (
          <span
            key={surface}
            className="role-surface"
            style={{
              backgroundColor: `var(--${surface})`,
              color: `var(--${name})`,
            }}
          >
            {`Tekst na ${surface}`}
          </span>
        ))}
      </span>
    );
  }
  if (name === "depleted") {
    // The role holds an opacity, not a colour: an icon as the drawing of the map draws it, in
    // `text-strong`, as it stands and dimmed by the role.
    return (
      <span className="role-sample">
        <IconMask href={ICONS[0]} tag="span" className="role-icon" />
        <IconMask href={ICONS[0]} tag="span" className="role-icon dimmed" />
      </span>
    );
  }
  return (
    <span className="role-sample">
      <span
        className="role-swatch"
        style={{ backgroundColor: `var(--${name})` }}
      />
    </span>
  );
}

function RolesSection() {
  return (
    <Section title="Role">
      <table className="sample-table">
        <thead>
          <tr>
            <th>Rola</th>
            <th>Rodzaj</th>
            <th>Próbka</th>
          </tr>
        </thead>
        <tbody>
          {ROLES.map(([name, kind]) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              <td>{kind}</td>
              <td>
                <RoleSample name={name} kind={kind} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

// --- tiles ----------------------------------------------------------------------------------

/** A tile of a sample: where it stands, whether it is known, its icons and its outline. */
type SampleTile = {
  at: Hex;
  revealed: boolean;
  /** No icons, every resource's icon, or every icon with the first one depleted. */
  icons: "none" | "all" | "first-depleted";
  outline: "character" | "step-target" | "link-highlight" | null;
};

/** The tiles of a sample drawn as the terrain panel draws its tiles, under the game's classes. */
function TileDrawing({ tiles }: { tiles: readonly SampleTile[] }) {
  const corners = hexCorners(TILE_SIZE);
  const centres = tiles.map((tile) => hexCenter(tile.at, TILE_SIZE));
  const xs = centres.flatMap((c) => corners.map((k) => c.x + k.x));
  const ys = centres.flatMap((c) => corners.map((k) => c.y + k.y));
  const left = Math.min(...xs) - MARGIN;
  const top = Math.min(...ys) - MARGIN;
  const width = Math.max(...xs) - Math.min(...xs) + 2 * MARGIN;
  const height = Math.max(...ys) - Math.min(...ys) + 2 * MARGIN;
  const pointsOf = (index: number): string =>
    corners
      .map((k) => `${centres[index].x + k.x},${centres[index].y + k.y}`)
      .join(" ");
  return (
    <svg
      className="terrain-drawing"
      width={width}
      height={height}
      viewBox={`${left} ${top} ${width} ${height}`}
      aria-hidden="true"
    >
      {tiles.map((tile, index) => {
        const { x: cx, y: cy } = centres[index];
        const icons = tile.icons === "none" ? [] : ICONS;
        // The game's placement of the icons on a tile, with its tile size and icon square.
        const places = iconPlaces(
          icons.length,
          cx,
          cy,
          TILE_SIZE * ICON_SQUARE,
        );
        return (
          <g key={index} className={tile.revealed ? "tile revealed" : "tile"}>
            <polygon points={pointsOf(index)} />
            {icons.map((href, i) => (
              // As the drawing of the game draws an icon: the mask in the square of a foreign object.
              <foreignObject
                key={href}
                x={places[i].x}
                y={places[i].y}
                width={places[i].size}
                height={places[i].size}
                className={
                  tile.icons === "first-depleted" && i === 0
                    ? "icon dimmed"
                    : "icon"
                }
              >
                <IconMask href={href} tag="div" />
              </foreignObject>
            ))}
          </g>
        );
      })}
      {/* Outlines go on top of every tile, as the terrain panel draws them. */}
      {tiles.map((tile, index) =>
        tile.outline === null ? null : (
          <polygon
            key={index}
            points={pointsOf(index)}
            className={`outline ${tile.outline}`}
          />
        ),
      )}
    </svg>
  );
}

const HERE: Hex = { q: 0, r: 0 };
const EAST: Hex = { q: 1, r: 0 };

/** A row of the list of revealed tiles marked by the link highlight, as on hover in the game. */
function LinkedRow() {
  return (
    <table className="tile-list">
      <tbody>
        <tr className="hovered">
          <th scope="row">{tileLabel({ col: 0, row: 0 })}</th>
          {["12", "8", "6", "6"].slice(0, ICONS.length).map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

/** The samples of tiles, one per state the terrain panel draws, with their names on the page. */
const TILE_SAMPLES: readonly (readonly [string, ReactNode, string?])[] = [
  [
    "Kafelek nieodsłonięty",
    <TileDrawing
      key="hidden"
      tiles={[{ at: HERE, revealed: false, icons: "none", outline: null }]}
    />,
  ],
  [
    "Kafelek odsłonięty z ikonami",
    <TileDrawing
      key="revealed"
      tiles={[{ at: HERE, revealed: true, icons: "all", outline: null }]}
    />,
  ],
  [
    "Krawędź między kafelkami obu rodzajów",
    <TileDrawing
      key="edge"
      tiles={[
        { at: HERE, revealed: false, icons: "none", outline: null },
        { at: EAST, revealed: true, icons: "all", outline: null },
      ]}
    />,
  ],
  [
    "Postać",
    <TileDrawing
      key="character"
      tiles={[{ at: HERE, revealed: true, icons: "all", outline: "character" }]}
    />,
  ],
  [
    "Cel kroku na kafelku nieodsłoniętym i odsłoniętym",
    <TileDrawing
      key="step-target"
      tiles={[
        { at: HERE, revealed: false, icons: "none", outline: "step-target" },
        { at: EAST, revealed: true, icons: "all", outline: "step-target" },
      ]}
    />,
  ],
  [
    "Podświetlenie powiązania: kafelek i jego wiersz listy",
    <>
      <TileDrawing
        tiles={[
          { at: HERE, revealed: true, icons: "all", outline: "link-highlight" },
        ]}
      />
      <LinkedRow />
    </>,
  ],
  [
    "Wyczerpane: pierwsza ikona przy zapasie zero",
    <TileDrawing
      key="depleted"
      tiles={[
        { at: HERE, revealed: true, icons: "first-depleted", outline: null },
      ]}
    />,
    "W grze zbieranie zabiera zapas z kafelka; przy zapasie zero ikona przygasa.",
  ],
];

function TilesSection() {
  return (
    <Section title="Próbki kafelków">
      <div className="tile-samples">
        {TILE_SAMPLES.map(([name, drawing, note]) => (
          <figure key={name} className="tile-sample">
            {drawing}
            <figcaption>{name}</figcaption>
            {note === undefined ? null : reason(note)}
          </figure>
        ))}
      </div>
    </Section>
  );
}

// --- page -----------------------------------------------------------------------------------

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="sample-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Page() {
  return (
    <>
      <header>
        <h1>Loop — strona wszystkich stanów</h1>
      </header>
      <ControlsSection />
      <FormsSection />
      <MenuSection />
      <RolesSection />
      <TilesSection />
    </>
  );
}

/**
 * Types an empty text into an input the way a player clears it, and the way the test harness types
 * (`typeInto` of `tests/view/page-document.mjs`): through the native value setter of the input's
 * prototype, which React's own record of the value does not see, and then a bubbling `input` event,
 * which React reads as a change. The field's change handler then holds an empty draft, and the field
 * shows what the game shows after a player empties it, which no prop of the number field draws:
 * the field shows its number unless a draft stands, and a draft comes only from typing. The page
 * needs this alone, so it stays here and the shared field keeps no prop for the page (D-45).
 */
function typeEmptyInto(input: HTMLInputElement): void {
  const descriptor = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(input),
    "value",
  );
  if (descriptor?.set === undefined) return;
  descriptor.set.call(input, "");
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

document.body.dataset.page = PAGE_MARKER;
// The root stands on a host element the page appends to the body, never on the body itself.
const host = document.createElement("div");
host.className = "sample-page";
document.body.append(host);
const root = createRoot(host);
flushSync(() => {
  root.render(<Page />);
});
// Right after the first draw, outside React and not in an Effect: an Effect synchronizes with a
// system outside React and handles no event of a user (D-267), and typing is such an event.
if (emptyNumberInput.current !== null) typeEmptyInto(emptyNumberInput.current);
