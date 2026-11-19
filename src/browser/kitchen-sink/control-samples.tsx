/**
 * The group of the kitchen-sink page that shows the shared controls (D-45) in each of the seven
 * states of the styleguide's rule "States of shared controls", or the reason a state does not
 * apply: the samples of each control, the table that lists them and its section. The sample of the
 * number field in the state empty keeps the ref of its input, which the entry of the page reads to
 * empty it once drawn. Like every module of the page, it stands in `src/browser/kitchen-sink/`, so
 * nothing of it is compiled into what `npm run build` writes.
 */
import { createRef, useState } from "react";
import type { ReactNode } from "react";
import type { ConditionNumber } from "../sim/program.js";
import { ReactButton } from "../view/controls/react-button.js";
import type { ReactButtonProps } from "../view/controls/react-button.js";
import { ReactNumberField } from "../view/controls/react-number-field.js";
import type { NumberRule } from "../view/controls/react-number-field.js";
import { ReactPickCell } from "../view/controls/react-pick-cell.js";
import { ReactSelectList } from "../view/controls/react-select-list.js";
import {
  ReactPasswordField,
  ReactTextField,
} from "../view/controls/react-text-field.js";
import { Forced, reason, Section } from "./sample-parts.js";
import type { State } from "./sample-parts.js";

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
export const emptyNumberInput = createRef<HTMLInputElement>();

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

export function ControlsSection() {
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
