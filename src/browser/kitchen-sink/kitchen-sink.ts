/**
 * The kitchen-sink page of the browser view (D-45): every shared control in each of the seven
 * states of the styleguide's rule "States of shared controls", or the reason a state does not
 * apply; every role of the styleguide's table Roles; and samples of tiles in each state, drawn
 * with the roles by the game's own stylesheet — never a drawing of the game from a game state
 * (D-04). Forms and the header row of an unconfirmed address are shown waiting for the server and
 * with a refusal sentence, with made-up values. Code only this page needs stays in this module: beyond it the page imports only modules
 * the game itself uses, so nothing of the page is compiled into what `npm run build` writes.
 */
import type { Account, ConfirmationMessage } from "../account-api.js";
import { RESOURCES } from "../sim/data/resources.js";
import { hexCenter, hexCorners, tileLabel } from "../sim/hex.js";
import type { Hex } from "../sim/types.js";
import {
  createButton,
  setButtonWaiting,
  type ButtonKind,
} from "../view/controls/button.js";
import { createNumberField } from "../view/controls/number-field.js";
import { createSelectList } from "../view/controls/select-list.js";
import {
  createFormWarning,
  createPasswordField,
  createTextField,
  type Field,
} from "../view/controls/text-field.js";
import { createEmailStatus } from "../view/email-status.js";

/** The page's marker: it stands in this module and in the page's HTML, in no other file of src. */
export const PAGE_MARKER = "loop2-kitchen-sink-page";

const SVG_NS = "http://www.w3.org/2000/svg";
/** The tiles' radius, as the game draws them (`terrain-picture.ts`). */
const TILE_SIZE = 24;
/** Room around the tiles for the outlines' stroke, as in `terrain-panel.ts`. */
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
  listLoading:
    "Nie dotyczy: żaden formularz, który czeka na serwer, nie ma listy wyboru (D-44).",
  numberLoading:
    "Nie dotyczy: żaden formularz, który czeka na serwer, nie ma pola liczby (D-44).",
};

/** A sample of a control in a state, or the reason the state does not apply to it. */
type Sample = HTMLElement | string;

/**
 * Hover and focus cannot be held by the page, so their samples carry a class that
 * `kitchen-sink.css` draws as the game draws the state: hover from the role `highlight`, focus by
 * the one `:focus-visible` rule, repeated there with the sample's selector.
 */
function forced(element: HTMLElement, state: State): void {
  if (state === "hover") element.classList.add("sample-hover");
  if (state === "focus") element.classList.add("sample-focus");
}

/** The button of a form waiting for the server, and the text it shows meanwhile. */
const WAITING_BUTTON = ["Zaloguj się", "Logowanie…"] as const;

function buttonSample(text: string, kind: ButtonKind, waits = false) {
  return (state: State): Sample => {
    if (state === "error") return NOT_APPLYING.buttonError;
    if (state === "empty") return NOT_APPLYING.buttonEmpty;
    if (state === "loading") {
      if (!waits) return NOT_APPLYING.buttonLoading;
      const waiting = createButton(WAITING_BUTTON[0], { kind });
      setButtonWaiting(waiting, WAITING_BUTTON[1]);
      return waiting;
    }
    const button = createButton(text, { kind });
    button.disabled = state === "disabled";
    forced(button, state);
    return button;
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

/** The six shared controls of D-44, each with the maker of its samples. */
const CONTROLS: readonly (readonly [string, (state: State) => Sample])[] = [
  ["Przycisk", buttonSample("Wyślij", "plain", true)],
  ["Przycisk niszczący", buttonSample("Zakończ", "destructive")],
  ["Przycisk wybrany w grupie", buttonSample("Wybrany", "selected")],
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
const NO_CONNECTION = "Brak połączenia z serwerem. Spróbuj ponownie.";

/**
 * A form of the account screen as the page shows it, with a made-up address and password: the
 * sign-in form or the registration form, waiting for the server (its fields locked and its button
 * waiting) or with the sentence of a refusal under it.
 */
function formSample(
  kind: "login" | "register",
  state: "waiting" | "warning",
  sentence: string | null,
): HTMLElement {
  const registering = kind === "register";
  const form = document.createElement("form");
  form.className = "form";
  // The page sends nothing: the handler only keeps the page from reloading on Enter.
  form.addEventListener("submit", (event) => event.preventDefault());
  const fields = [
    createTextField({
      label: "Adres e-mail",
      hint: "adres e-mail",
      visibleLabel: true,
      autocomplete: "email",
    }),
    createPasswordField({
      label: "Hasło",
      hint: "hasło",
      visibleLabel: true,
      autocomplete: registering ? "new-password" : "current-password",
    }),
  ];
  if (registering)
    fields.push(
      createPasswordField({
        label: "Powtórz hasło",
        hint: "hasło jeszcze raz",
        visibleLabel: true,
        autocomplete: "new-password",
      }),
    );
  const values = [
    "przyklad@example.com",
    "przykładowe-hasło",
    "przykładowe-hasło",
  ];
  fields.forEach((field, index) => {
    field.input.value = values[index];
    field.input.disabled = state === "waiting";
  });
  const button = createButton(registering ? "Załóż konto" : "Zaloguj się", {
    submit: true,
  });
  if (state === "waiting")
    setButtonWaiting(button, registering ? "Zakładanie konta…" : "Logowanie…");
  const warning = createFormWarning();
  warning.set(sentence);
  form.append(...fields.map((field) => field.element), button, warning.element);
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
      "Załóż konto: brak połączenia",
      formSample("register", "warning", NO_CONNECTION),
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

// --- header row of an unconfirmed address ---------------------------------------------------

/** A made-up account: the page names no real address and holds no game state. */
const SAMPLE_ACCOUNT: Account = {
  id: "sample",
  email: "przyklad@example.com",
  emailConfirmed: false,
};

/**
 * The header row of the module `email-status.ts` as the page shows it, on a line of the header's
 * own kind: waiting for the answer to „Wyślij ponownie” (the button disabled and reading
 * „Wysyłanie…”), or starting with the sentence of a refused message beside the button. The request
 * of the waiting sample never ends and sends nothing.
 */
function headerRowSample(start: ConfirmationMessage | "waiting"): HTMLElement {
  const row = createEmailStatus(
    { sendConfirmationMessage: () => new Promise(() => undefined) },
    SAMPLE_ACCOUNT,
    start === "waiting" ? null : start,
  );
  if (start === "waiting") row.element.querySelector("button")?.click();
  const header = document.createElement("div");
  header.className = "header-sample";
  header.append(row.element);
  return header;
}

function headerRowSection(): HTMLElement {
  const samples: readonly (readonly [string, HTMLElement])[] = [
    ["Wyślij ponownie: oczekiwanie na serwer", headerRowSample("waiting")],
    ["Wyślij ponownie: pułap wiadomości", headerRowSample("limited")],
    ["Wyślij ponownie: wysyłka się nie udała", headerRowSample("failed")],
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
  return section("Wiersz nagłówka z niepotwierdzonym adresem", list);
}

// --- roles ----------------------------------------------------------------------------------

/** The kinds of the table Roles, by their names on the page. */
type Kind = "tło" | "tekst" | "inne";

/** The 23 roles of the styleguide's table Roles, in its order, with their kinds. */
const ROLES: readonly (readonly [string, Kind])[] = [
  ["page", "tło"],
  ["panel", "tło"],
  ["highlight", "tło"],
  ["divider", "inne"],
  ["control-border", "inne"],
  ["selected", "inne"],
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

/** The three roles of the kind background, on which every role of the kind text stands. */
const SURFACES = ROLES.filter(([, kind]) => kind === "tło").map(
  ([name]) => name,
);

/** The icon files of the resources, in the data's order, never named here (D-18). */
const ICONS = Object.values(RESOURCES).map(({ icon }) => `/icons/${icon}.svg`);

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
    // The role holds an opacity, not a colour: an icon as it stands and dimmed by it.
    for (const dimmed of [false, true]) {
      const icon = document.createElement("img");
      icon.src = ICONS[0];
      icon.alt = "";
      icon.width = 24;
      icon.height = 24;
      icon.className = dimmed ? "role-icon dimmed" : "role-icon";
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
    // Two icons per row, centred on the tile, as `terrain-picture.ts` places them.
    const iconSize = TILE_SIZE * 0.7;
    const rows = Math.ceil(icons.length / 2);
    icons.forEach((href, i) => {
      const inRow = Math.min(2, icons.length - Math.floor(i / 2) * 2);
      const image = document.createElementNS(SVG_NS, "image");
      image.setAttribute("href", href);
      image.setAttribute(
        "x",
        String(cx + (i % 2) * iconSize - (inRow * iconSize) / 2),
      );
      image.setAttribute(
        "y",
        String(cy + Math.floor(i / 2) * iconSize - (rows * iconSize) / 2),
      );
      image.setAttribute("width", String(iconSize));
      image.setAttribute("height", String(iconSize));
      const depleted = tile.icons === "first-depleted" && i === 0;
      image.setAttribute("class", depleted ? "icon dimmed" : "icon");
      group.append(image);
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
    "Ten stan widać tylko tutaj: w grze zapas zasobu nie spada dziś do zera.",
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
  headerRowSection(),
  rolesSection(),
  tilesSection(),
);
