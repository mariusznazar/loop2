/**
 * The kitchen-sink page of the browser view (D-45): every shared control in each of the seven
 * states of the styleguide's rule "States of shared controls", or the reason a state does not
 * apply; every role of the styleguide's table Roles; and samples of tiles in each state, drawn
 * with the roles by the game's own stylesheet — never a drawing of the game from a game state
 * (D-04). Forms and the part of the menu „Konto” for an unconfirmed address are shown waiting for
 * the server and with a refusal sentence, and the form „Nie pamiętam hasła” with the sentence that
 * answers its request, with made-up values. The menu itself is a React screen and the page holds no
 * React (D-269), so the part of it is built here from the DOM forms of the shared controls and the
 * pure sentences of `email-status.ts`, which the menu uses too, and the page imports no `.tsx`
 * file. Code only this page needs stays in this module: beyond it the page imports only modules the
 * game itself uses, so nothing of the page is compiled into what `npm run build` writes.
 */
import type { ConfirmationMessage } from "../account-api.js";
import { RESOURCES } from "../sim/data/resources.js";
import { hexCenter, hexCorners, tileLabel } from "../sim/hex.js";
import type { Hex } from "../sim/types.js";
import {
  createButton,
  setButtonSelected,
  setButtonWaiting,
  type ButtonOptions,
} from "../view/controls/button.js";
import { createNumberField } from "../view/controls/number-field.js";
import { createPickCell } from "../view/controls/pick-cell.js";
import { createSelectList } from "../view/controls/select-list.js";
import { RESET_REQUESTED_SENTENCE } from "../view/account-rules.js";
import {
  createFormNote,
  createFormWarning,
  createPasswordField,
  createTextField,
  type Field,
} from "../view/controls/text-field.js";
import { messageSentence, UNCONFIRMED_SENTENCE } from "../view/email-status.js";
import { ICON_SQUARE, iconPlaces, TILE_SIZE } from "../view/terrain-picture.js";

/** The page's marker: it stands in this module and in the page's HTML, in no other file of src. */
export const PAGE_MARKER = "loop2-kitchen-sink-page";

const SVG_NS = "http://www.w3.org/2000/svg";
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

/** A sample of a control in a state, or the reason the state does not apply to it. */
type Sample = HTMLElement | string;

/**
 * Hover and focus cannot be held by the page, so their samples carry a class that
 * `kitchen-sink.css` draws as the game draws the state: hover from the role `highlight` (the
 * secondary action's hover by its own rule, in `text` on the background it has; the destructive
 * button's hover and focus in `danger` by the rules of its own in `kitchen-sink.css`), focus by the
 * one `:focus-visible` rule, repeated there with the sample's selector.
 */
function forced(element: HTMLElement, state: State): void {
  if (state === "hover") element.classList.add("sample-hover");
  if (state === "focus") element.classList.add("sample-focus");
}

/**
 * What the loading state of a button shows: the reason the state does not apply to it, or the
 * button's resting text and the text it shows while it waits for the server.
 */
type Loading = string | readonly [string, string];

/** The container of the tabs, as a screen sets it on its group: the thin line under the tabs. */
function inTabs(tab: HTMLElement): HTMLElement {
  const group = document.createElement("div");
  group.className = "tabs";
  group.append(tab);
  return group;
}

/**
 * A button of the given options in each state. A tab (`chosen` given) is shown as a group of its
 * kind sets it, selected or not, inside the container of the class `tabs`.
 */
function buttonSample(
  text: string,
  options: ButtonOptions,
  loading: Loading,
  chosen?: boolean,
) {
  const make = (label: string): HTMLButtonElement => {
    const button = createButton(label, options);
    if (chosen !== undefined) setButtonSelected(button, chosen);
    return button;
  };
  return (state: State): Sample => {
    if (state === "error") return NOT_APPLYING.buttonError;
    if (state === "empty") return NOT_APPLYING.buttonEmpty;
    if (state === "loading") {
      if (typeof loading === "string") return loading;
      const waiting = createButton(loading[0], options);
      setButtonWaiting(waiting, loading[1]);
      return waiting;
    }
    const button = make(text);
    button.disabled = state === "disabled";
    forced(button, state);
    return options.kind === "tab" ? inTabs(button) : button;
  };
}

/**
 * A pick cell of the rule panel in each state, chosen or not (D-288, D-289). Its action is a made-up
 * sample; the greyed state carries a reason of the panel, and the icon greys with the cell.
 */
function pickCellSample(chosen: boolean) {
  return (state: State): Sample => {
    if (state === "error") return NOT_APPLYING.pickError;
    if (state === "empty") return NOT_APPLYING.pickEmpty;
    if (state === "loading") return NOT_APPLYING.pickLoading;
    const greyed = state === "disabled";
    const cell = createPickCell({
      text: "Zbierz",
      icon: "grab",
      chosen,
      greyed,
      reason: greyed ? "nie znasz jeszcze celu" : null,
    });
    forced(cell, state);
    return cell;
  };
}

function selectListSample(state: State): Sample {
  if (state === "error") return NOT_APPLYING.listError;
  if (state === "loading") return NOT_APPLYING.listLoading;
  const list = createSelectList(
    "Lista wyboru",
    state === "empty"
      ? []
      : [
          ["first", "Pierwsza pozycja"],
          ["second", "Druga pozycja"],
        ],
  );
  list.disabled = state === "disabled";
  forced(list, state);
  return list;
}

/**
 * A field in each state; `loading` is the reason the state does not apply to a field of its kind,
 * or null where the field is locked while its form waits for the server.
 */
function fieldSample(
  make: () => Field,
  value: string,
  wrong: string,
  loading: string | null,
) {
  return (state: State): Sample => {
    if (state === "loading" && loading !== null) return loading;
    const field = make();
    field.input.value = state === "empty" ? "" : value;
    field.input.disabled = state === "disabled" || state === "loading";
    if (state === "error") {
      field.input.value = wrong;
      field.setError("Wpis jest niepoprawny.");
    }
    forced(field.input, state);
    return field.element;
  };
}

/**
 * The shared controls of D-44 and the pick cell of D-288, each with the maker of its samples, and
 * beside the button the looks other kinds of it have: the main button of D-274, the one that sends
 * a form and, as the kind `main`, the one that sends none, and the tab of D-276, which is the
 * button selected in its group drawn as a tab. The password field is
 * the text field with its entry hidden.
 */
const CONTROLS: readonly (readonly [string, (state: State) => Sample])[] = [
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
    buttonSample(
      "Zakończ",
      { kind: "destructive" },
      NOT_APPLYING.buttonLoading,
    ),
  ],
  [
    "Przycisk wybrany w grupie",
    buttonSample("Wybrany", { kind: "selected" }, NOT_APPLYING.buttonLoading),
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
      { kind: "tab" },
      NOT_APPLYING.tabLoading,
      false,
    ),
  ],
  [
    "Zakładka wybrana",
    buttonSample("Zaloguj się", { kind: "tab" }, NOT_APPLYING.tabLoading, true),
  ],
  ["Komórka wyboru", pickCellSample(false)],
  ["Komórka wyboru wybrana", pickCellSample(true)],
  ["Lista wyboru", selectListSample],
  [
    "Pole liczby",
    fieldSample(
      () =>
        createNumberField({
          label: "Pole liczby",
          hint: "liczba",
          min: 0,
          max: 99,
          step: 1,
        }),
      "12",
      "120",
      NOT_APPLYING.numberLoading,
    ),
  ],
  [
    "Pole tekstowe",
    fieldSample(
      () => createTextField({ label: "Pole tekstowe", hint: "podpowiedź" }),
      "Tekst wpisu",
      "?",
      null,
    ),
  ],
  [
    "Pole hasła",
    fieldSample(
      () => createPasswordField({ label: "Pole hasła", hint: "hasło" }),
      "przykładowe-hasło",
      "krótkie",
      null,
    ),
  ],
];

function cell(tag: "th" | "td", content: Node | string): HTMLTableCellElement {
  const element = document.createElement(tag);
  element.append(content);
  return element;
}

function reason(text: string): HTMLElement {
  const element = document.createElement("span");
  element.className = "sample-reason";
  element.textContent = text;
  return element;
}

function controlsSection(): HTMLElement {
  const table = document.createElement("table");
  table.className = "sample-table";
  const head = document.createElement("tr");
  head.append(cell("th", "Kontrolka"));
  for (const [, name] of STATES) head.append(cell("th", name));
  const rows = CONTROLS.map(([name, sample]) => {
    const row = document.createElement("tr");
    const label = cell("th", name);
    label.scope = "row";
    row.append(label);
    for (const [state] of STATES) {
      const shown = sample(state);
      row.append(cell("td", typeof shown === "string" ? reason(shown) : shown));
    }
    return row;
  });
  table.createTHead().append(head);
  table.createTBody().append(...rows);
  const panel = document.createElement("div");
  panel.className = "sample-panel";
  panel.append(table);
  return section("Wspólne kontrolki w stanach", panel);
}

// --- forms waiting for the server -----------------------------------------------------------

/** The sentences of the task and of the client in `account-api.ts`, as a form shows them (D-44). */
const REFUSAL = "Nieprawidłowy adres e-mail lub hasło.";
const ACCOUNT_EXISTS = "Konto z tym adresem już istnieje.";
const NO_CONNECTION = "Brak połączenia z serwerem. Spróbuj ponownie.";
const SERVER_ERROR = "Serwer nie mógł obsłużyć żądania. Spróbuj ponownie.";
const TOO_MANY_ATTEMPTS = "Za dużo prób. Spróbuj ponownie za kilka minut.";

/** The kinds of form the page shows, each with its button, its waiting text and its fields. */
const FORM_KINDS = {
  login: { button: "Zaloguj się", waiting: "Logowanie…" },
  register: { button: "Załóż konto", waiting: "Zakładanie konta…" },
  request: { button: "Wyślij odnośnik", waiting: "Wysyłanie…" },
  reset: { button: "Ustaw hasło", waiting: "Ustawianie…" },
} as const;

type FormKind = keyof typeof FORM_KINDS;

/**
 * A form of the account screen as the page shows it, with a made-up address and password: the
 * sign-in form, the registration form, the form „Nie pamiętam hasła” or the form „Ustaw nowe
 * hasło”, waiting for the server (its fields locked and its button waiting), with the sentence of
 * a refusal under it, or, for the request form, with the sentence that answers a request (shown in
 * `text` with a bar at its left, which refuses nothing).
 */
function formSample(
  kind: FormKind,
  state: "waiting" | "warning" | "note",
  sentence: string | null,
): HTMLElement {
  const form = document.createElement("form");
  form.className = "form";
  // The page sends nothing: the handler only keeps the page from reloading on Enter.
  form.addEventListener("submit", (event) => event.preventDefault());
  const password = (label: string, hint: string, autocomplete: string) =>
    createPasswordField({ label, hint, visibleLabel: true, autocomplete });
  const address = createTextField({
    label: "Adres e-mail",
    hint: "adres e-mail",
    visibleLabel: true,
    autocomplete: "email",
  });
  const fields: Field[] = {
    login: [address, password("Hasło", "hasło", "current-password")],
    register: [
      address,
      password("Hasło", "hasło", "new-password"),
      password("Powtórz hasło", "hasło jeszcze raz", "new-password"),
    ],
    request: [address],
    reset: [
      password("Nowe hasło", "nowe hasło", "new-password"),
      password("Powtórz hasło", "hasło jeszcze raz", "new-password"),
    ],
  }[kind];
  const values =
    kind === "request"
      ? ["przyklad@example.com"]
      : kind === "reset"
        ? ["przykładowe-hasło", "przykładowe-hasło"]
        : ["przyklad@example.com", "przykładowe-hasło", "przykładowe-hasło"];
  fields.forEach((field, index) => {
    field.input.value = values[index];
    field.input.disabled = state === "waiting";
  });
  const button = createButton(FORM_KINDS[kind].button, { submit: true });
  if (state === "waiting") setButtonWaiting(button, FORM_KINDS[kind].waiting);
  form.append(...fields.map((field) => field.element), button);
  if (state === "note") {
    const note = createFormNote();
    note.set(sentence);
    form.append(note.element);
  } else {
    const warning = createFormWarning();
    warning.set(sentence);
    form.append(warning.element);
  }
  return form;
}

function formsSection(): HTMLElement {
  const samples: readonly (readonly [string, HTMLElement])[] = [
    [
      "Zaloguj się: oczekiwanie na serwer",
      formSample("login", "waiting", null),
    ],
    [
      "Załóż konto: oczekiwanie na serwer",
      formSample("register", "waiting", null),
    ],
    ["Zaloguj się: odmowa serwera", formSample("login", "warning", REFUSAL)],
    [
      "Załóż konto: odmowa serwera",
      formSample("register", "warning", ACCOUNT_EXISTS),
    ],
    [
      "Załóż konto: brak połączenia",
      formSample("register", "warning", NO_CONNECTION),
    ],
    [
      "Nie pamiętam hasła: oczekiwanie na serwer",
      formSample("request", "waiting", null),
    ],
    [
      "Nie pamiętam hasła: odmowa serwera",
      formSample("request", "warning", SERVER_ERROR),
    ],
    [
      "Nie pamiętam hasła: odpowiedź na prośbę",
      formSample("request", "note", RESET_REQUESTED_SENTENCE),
    ],
    [
      "Ustaw nowe hasło: oczekiwanie na serwer",
      formSample("reset", "waiting", null),
    ],
    [
      "Ustaw nowe hasło: odmowa serwera",
      formSample("reset", "warning", TOO_MANY_ATTEMPTS),
    ],
  ];
  const list = document.createElement("div");
  list.className = "form-samples";
  for (const [name, form] of samples) {
    const figure = document.createElement("figure");
    figure.className = "form-sample";
    const caption = document.createElement("figcaption");
    caption.textContent = name;
    figure.append(form, caption);
    list.append(figure);
  }
  return section("Formularze czekające na serwer", list);
}

// --- part of the menu „Konto” for an unconfirmed address -----------------------------------

/** A made-up address: the page names no real one and holds no game state. */
const SAMPLE_ADDRESS = "przyklad@example.com";

/**
 * The part of the open menu „Konto” for an unconfirmed address (D-157), built from the DOM forms of
 * the shared controls and the sentences of `email-status.ts`, with the classes the menu itself
 * draws with: the address, the sentence, and „Wyślij ponownie” — waiting for the answer (the button
 * disabled and reading „Wysyłanie…”), or beside the sentence of a message the limit or a failure
 * kept from being sent. The menu is a React screen and this page holds none (D-269), so the part is
 * made here; the button waits at once and sends nothing.
 */
function menuSample(state: ConfirmationMessage | "waiting"): HTMLElement {
  const sentence =
    state === "waiting"
      ? UNCONFIRMED_SENTENCE
      : messageSentence(state, SAMPLE_ADDRESS);
  const address = document.createElement("p");
  address.className = "account-menu-address";
  address.textContent = SAMPLE_ADDRESS;
  const said = document.createElement("p");
  said.className =
    sentence.role === "warning"
      ? "account-menu-sentence warning"
      : "account-menu-sentence";
  said.setAttribute("aria-live", "polite");
  said.textContent = sentence.text;
  const button = createButton("Wyślij ponownie");
  if (state === "waiting") setButtonWaiting(button, "Wysyłanie…");
  const unconfirmed = document.createElement("div");
  unconfirmed.className = "account-menu-unconfirmed";
  unconfirmed.append(said, button);
  const block = document.createElement("div");
  block.className = "account-menu-block";
  block.append(address, unconfirmed);
  const sample = document.createElement("div");
  sample.className = "menu-sample";
  sample.append(block);
  return sample;
}

function menuSection(): HTMLElement {
  const samples: readonly (readonly [string, HTMLElement])[] = [
    ["Wyślij ponownie: oczekiwanie na serwer", menuSample("waiting")],
    ["Wyślij ponownie: pułap wiadomości", menuSample("limited")],
    ["Wyślij ponownie: wysyłka się nie udała", menuSample("failed")],
  ];
  const list = document.createElement("div");
  list.className = "form-samples";
  for (const [name, row] of samples) {
    const figure = document.createElement("figure");
    figure.className = "form-sample";
    const caption = document.createElement("figcaption");
    caption.textContent = name;
    figure.append(row, caption);
    list.append(figure);
  }
  return section(
    "„Konto” z niepotwierdzonym adresem: część z postaci DOM kontrolek, bez Reacta",
    list,
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
function iconMask(href: string, tag: "span" | "div"): HTMLElement {
  const mask = document.createElement(tag);
  mask.className = "icon-mask";
  mask.style.setProperty("--icon", `url("${href}")`);
  return mask;
}

function roleSample(name: string, kind: Kind): HTMLElement {
  const sample = document.createElement("span");
  sample.className = "role-sample";
  if (kind === "tło") {
    // A background with the text that stands on it (styleguide: "Every background with its text").
    const block = document.createElement("span");
    block.className = "role-surface";
    block.style.backgroundColor = `var(--${name})`;
    block.textContent = "Treść na tym tle";
    sample.append(block);
  } else if (kind === "tekst") {
    for (const surface of SURFACES) {
      const text = document.createElement("span");
      text.className = "role-surface";
      text.style.backgroundColor = `var(--${surface})`;
      text.style.color = `var(--${name})`;
      text.textContent = `Tekst na ${surface}`;
      sample.append(text);
    }
  } else if (name === "depleted") {
    // The role holds an opacity, not a colour: an icon as the drawing of the map draws it, in
    // `text-strong`, as it stands and dimmed by the role.
    for (const dimmed of [false, true]) {
      const icon = iconMask(ICONS[0], "span");
      icon.classList.add("role-icon");
      if (dimmed) icon.classList.add("dimmed");
      sample.append(icon);
    }
  } else {
    const swatch = document.createElement("span");
    swatch.className = "role-swatch";
    swatch.style.backgroundColor = `var(--${name})`;
    sample.append(swatch);
  }
  return sample;
}

function rolesSection(): HTMLElement {
  const table = document.createElement("table");
  table.className = "sample-table";
  const head = document.createElement("tr");
  head.append(cell("th", "Rola"), cell("th", "Rodzaj"), cell("th", "Próbka"));
  const rows = ROLES.map(([name, kind]) => {
    const row = document.createElement("tr");
    const label = cell("th", name);
    label.scope = "row";
    row.append(label, cell("td", kind), cell("td", roleSample(name, kind)));
    return row;
  });
  table.createTHead().append(head);
  table.createTBody().append(...rows);
  return section("Role", table);
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

/** A tile of a sample drawn as the terrain panel draws its tiles, under the game's classes. */
function drawSample(tiles: readonly SampleTile[]): SVGSVGElement {
  const corners = hexCorners(TILE_SIZE);
  const centres = tiles.map((tile) => hexCenter(tile.at, TILE_SIZE));
  const xs = centres.flatMap((c) => corners.map((k) => c.x + k.x));
  const ys = centres.flatMap((c) => corners.map((k) => c.y + k.y));
  const left = Math.min(...xs) - MARGIN;
  const top = Math.min(...ys) - MARGIN;
  const width = Math.max(...xs) - Math.min(...xs) + 2 * MARGIN;
  const height = Math.max(...ys) - Math.min(...ys) + 2 * MARGIN;

  const drawing = document.createElementNS(SVG_NS, "svg");
  drawing.classList.add("terrain-drawing");
  drawing.setAttribute("width", String(width));
  drawing.setAttribute("height", String(height));
  drawing.setAttribute("viewBox", `${left} ${top} ${width} ${height}`);
  drawing.setAttribute("aria-hidden", "true");

  const outlines: SVGElement[] = [];
  tiles.forEach((tile, index) => {
    const { x: cx, y: cy } = centres[index];
    const points = corners.map((k) => `${cx + k.x},${cy + k.y}`).join(" ");
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", tile.revealed ? "tile revealed" : "tile");
    const polygon = document.createElementNS(SVG_NS, "polygon");
    polygon.setAttribute("points", points);
    group.append(polygon);
    const icons = tile.icons === "none" ? [] : ICONS;
    // The game's placement of the icons on a tile, with its tile size and icon square.
    const places = iconPlaces(icons.length, cx, cy, TILE_SIZE * ICON_SQUARE);
    icons.forEach((href, i) => {
      // As the drawing of the game draws an icon: the mask in the square of a foreign object.
      const frame = document.createElementNS(SVG_NS, "foreignObject");
      frame.setAttribute("x", String(places[i].x));
      frame.setAttribute("y", String(places[i].y));
      frame.setAttribute("width", String(places[i].size));
      frame.setAttribute("height", String(places[i].size));
      const depleted = tile.icons === "first-depleted" && i === 0;
      frame.setAttribute("class", depleted ? "icon dimmed" : "icon");
      frame.append(iconMask(href, "div"));
      group.append(frame);
    });
    drawing.append(group);
    if (tile.outline) {
      const outline = document.createElementNS(SVG_NS, "polygon");
      outline.setAttribute("points", points);
      outline.setAttribute("class", `outline ${tile.outline}`);
      outlines.push(outline);
    }
  });
  // Outlines go on top of every tile, as the terrain panel draws them.
  drawing.append(...outlines);
  return drawing;
}

const HERE: Hex = { q: 0, r: 0 };
const EAST: Hex = { q: 1, r: 0 };

/** A row of the list of revealed tiles marked by the link highlight, as on hover in the game. */
function linkedRow(): HTMLTableElement {
  const table = document.createElement("table");
  table.className = "tile-list";
  const row = document.createElement("tr");
  row.className = "hovered";
  const label = cell("th", tileLabel({ col: 0, row: 0 }));
  label.scope = "row";
  row.append(label);
  for (const value of ["12", "8", "6", "6"].slice(0, ICONS.length))
    row.append(cell("td", value));
  table.createTBody().append(row);
  return table;
}

/** The samples of tiles, one per state the terrain panel draws, with their names on the page. */
const TILE_SAMPLES: readonly (readonly [string, () => Node[], string?])[] = [
  [
    "Kafelek nieodsłonięty",
    () => [
      drawSample([{ at: HERE, revealed: false, icons: "none", outline: null }]),
    ],
  ],
  [
    "Kafelek odsłonięty z ikonami",
    () => [
      drawSample([{ at: HERE, revealed: true, icons: "all", outline: null }]),
    ],
  ],
  [
    "Krawędź między kafelkami obu rodzajów",
    () => [
      drawSample([
        { at: HERE, revealed: false, icons: "none", outline: null },
        { at: EAST, revealed: true, icons: "all", outline: null },
      ]),
    ],
  ],
  [
    "Postać",
    () => [
      drawSample([
        { at: HERE, revealed: true, icons: "all", outline: "character" },
      ]),
    ],
  ],
  [
    "Cel kroku na kafelku nieodsłoniętym i odsłoniętym",
    () => [
      drawSample([
        { at: HERE, revealed: false, icons: "none", outline: "step-target" },
        { at: EAST, revealed: true, icons: "all", outline: "step-target" },
      ]),
    ],
  ],
  [
    "Podświetlenie powiązania: kafelek i jego wiersz listy",
    () => [
      drawSample([
        { at: HERE, revealed: true, icons: "all", outline: "link-highlight" },
      ]),
      linkedRow(),
    ],
  ],
  [
    "Wyczerpane: pierwsza ikona przy zapasie zero",
    () => [
      drawSample([
        { at: HERE, revealed: true, icons: "first-depleted", outline: null },
      ]),
    ],
    "W grze zbieranie zabiera zapas z kafelka; przy zapasie zero ikona przygasa.",
  ],
];

function tilesSection(): HTMLElement {
  const list = document.createElement("div");
  list.className = "tile-samples";
  for (const [name, draw, note] of TILE_SAMPLES) {
    const figure = document.createElement("figure");
    figure.className = "tile-sample";
    const caption = document.createElement("figcaption");
    caption.textContent = name;
    figure.append(...draw(), caption);
    if (note) figure.append(reason(note));
    list.append(figure);
  }
  return section("Próbki kafelków", list);
}

// --- page -----------------------------------------------------------------------------------

function section(title: string, content: Node): HTMLElement {
  const element = document.createElement("section");
  element.className = "sample-section";
  const heading = document.createElement("h2");
  heading.textContent = title;
  element.append(heading, content);
  return element;
}

const header = document.createElement("header");
const title = document.createElement("h1");
title.textContent = "Loop — strona wszystkich stanów";
header.append(title);
document.body.dataset.page = PAGE_MARKER;
document.body.append(
  header,
  controlsSection(),
  formsSection(),
  menuSection(),
  rolesSection(),
  tilesSection(),
);
