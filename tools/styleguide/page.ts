import { controlFactories } from "../../src/browser/view/controls/index.js";
import { RESOURCES } from "../../src/browser/sim/data/resources.js";
import { ICON_CREDITS, ICON_LICENCE } from "../../src/browser/view/credits.js";

/** Supplied by the standalone builder; values are labels, never inline styles. */
export type StyleguideTokens = {
  roles: Record<
    string,
    {
      kind: "background" | "text" | "other";
      value: string | number;
      source: string;
    }
  >;
  tokens: Record<string, { value: string | number; source: string }>;
};

const stateLabels = {
  default: "Zwykły",
  hover: "Pod kursorem",
  focus: "Fokus",
  disabled: "Wyłączony",
  error: "Błąd",
  empty: "Pusty",
  loading: "Ładowanie",
};
type State = keyof typeof stateLabels;
type Control = keyof typeof controlFactories;
const controlLabels: Record<Control, string> = {
  button: "Przycisk",
  "destructive-button": "Przycisk niszczący",
  "selected-button": "Przycisk wybrany w grupie",
  select: "Lista wyboru",
  "number-field": "Pole liczby",
  "text-field": "Pole tekstowe",
};
const roleDescriptions: Record<string, string> = {
  page: "Miejsce gry",
  panel: "Osobny blok",
  highlight: "Zaznaczony wiersz",
  divider: "Granica sekcji",
  "control-border": "Pole do wpisania",
  "text-strong": "Nazwa i ważna wartość",
  text: "Treść do przeczytania",
  "text-secondary": "Wyjaśnienie",
  "text-label": "Etykieta pola",
  "text-disabled": "Teraz niedostępne",
  positive: "Działa prawidłowo",
  warning: "Niepoprawny wpis — popraw wartość",
  danger: "Grozi utrata postępu",
  discovery: "Odkryto nowe miejsce",
  "player-change": "Gracz zmienił program",
  character: "Tu jest postać",
  "tile-hidden": "Miejsce nieznane",
  "tile-revealed": "Miejsce znane",
  "link-highlight": "Kafelek i wiersz tego samego miejsca",
  depleted: "Zasób wyczerpany",
  focus: "Miejsce obsługi klawiaturą",
  selected: "Wybrane w grupie",
  "tile-edge": "Granica kafelków",
};

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Rejects absent/incomplete builder data before any samples are mounted. */
export function readStyleguideTokens(
  serialized: string | null | undefined,
): StyleguideTokens {
  if (!serialized) throw new Error("Missing styleguide token data");
  let data: unknown;
  try {
    data = JSON.parse(serialized);
  } catch {
    throw new Error("Malformed styleguide token JSON");
  }
  if (!record(data) || !record(data.roles) || !record(data.tokens))
    throw new Error("Invalid styleguide token data");
  for (const name of Object.keys(roleDescriptions)) {
    const role = data.roles[name];
    if (
      !record(role) ||
      !["background", "text", "other"].includes(String(role.kind))
    )
      throw new Error(`Invalid styleguide token role ${name}`);
  }
  const requiredTokens = [
    "font-ui",
    "font-mono",
    "font-size-label",
    "font-size-description",
    "font-size-body",
    "font-size-heading",
    "font-size-map-title",
    "font-size-game-title",
    "space-2",
    "space-4",
    "space-8",
    "space-12",
    "space-16",
    "space-24",
    "space-32",
    "font-weight-regular",
    "font-weight-medium",
    "border-width",
    "bar-width",
    "character-width",
    "step-width",
    "step-dash",
    "link-width",
    "focus-width",
    "focus-offset",
  ];
  if (
    requiredTokens.some(
      (name) => !record(data.tokens) || !record(data.tokens[name]),
    )
  )
    throw new Error("Incomplete styleguide tokens");
  for (const token of [
    ...Object.values(data.roles),
    ...Object.values(data.tokens),
  ]) {
    if (
      !record(token) ||
      (typeof token.value !== "string" && typeof token.value !== "number") ||
      typeof token.source !== "string" ||
      !token.source.trim()
    )
      throw new Error("Invalid styleguide token record");
  }
  return data as StyleguideTokens;
}

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text = "",
  className = "",
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.textContent = text;
  node.className = className;
  return node;
}
function section(title: string): HTMLElement {
  const node = element("section");
  node.append(element("h2", title));
  return node;
}

function controlExample(name: Control, state: State): HTMLElement {
  const label = `${controlLabels[name]} — ${stateLabels[state]}`;
  const disabled = state === "disabled";
  const buttonOptions = {
    text: name === "destructive-button" ? "Usuń przykład" : "Przykład",
    label,
    disabled,
  };
  let native: HTMLButtonElement | HTMLInputElement | HTMLSelectElement;
  let container: HTMLElement;
  if (
    name === "button" ||
    name === "destructive-button" ||
    name === "selected-button"
  ) {
    native = controlFactories[name](buttonOptions);
    container = native;
  } else {
    const empty = state === "empty";
    const field =
      name === "select"
        ? controlFactories.select({
            label,
            disabled,
            value: empty ? "" : "example",
            options: empty
              ? []
              : [{ value: "example", label: "Przykładowa pozycja" }],
          })
        : controlFactories[name]({
            label,
            disabled,
            value: empty
              ? ""
              : name === "number-field"
                ? "3"
                : "Przykładowy tekst",
            placeholder: "Wpisz wartość",
          });
    native = field.control;
    container = field.element;
    if (state === "error") field.setError("Wartość wymaga poprawy.");
  }
  if (state === "hover" || state === "focus")
    native.className += ` preview-${state}`;
  return container;
}

function matrix(): HTMLElement {
  const group = section("Wspólne kontrolki — siedem stanów");
  group.append(
    element(
      "p",
      "Fokus i najechanie pokazane w wielu komórkach to demonstracje stylu. Rzeczywisty fokus przenosisz klawiszem Tab; żadna próbka nie ustawia go automatycznie.",
    ),
  );
  for (const name of Object.keys(controlFactories) as Control[]) {
    const row = section(controlLabels[name]);
    row.className = "control-row";
    const cells = element("div", "", "state-grid");
    for (const state of Object.keys(stateLabels) as State[]) {
      const cell = element("div", "", "state-cell");
      cell.setAttribute("data-control", name);
      cell.setAttribute("data-state", state);
      cell.append(element("h3", stateLabels[state]));
      const button = name.endsWith("button");
      const reason =
        state === "loading"
          ? "Nie dotyczy: kontrolka nie czeka na odpowiedź serwera."
          : button && (state === "error" || state === "empty")
            ? state === "error"
              ? "Nie dotyczy: przycisk nie ma niepoprawnej wartości."
              : "Nie dotyczy: przycisk nie przyjmuje wartości do wpisania."
            : null;
      cell.setAttribute(
        "data-applicability",
        reason ? "inapplicable" : "rendered",
      );
      if (reason) cell.append(element("p", reason, "state-reason"));
      else {
        cell.append(controlExample(name, state));
        if (state === "hover" || state === "focus")
          cell.append(element("p", "Demonstracja stylu", "preview-label"));
      }
      cells.append(cell);
    }
    row.append(cells);
    group.append(row);
  }
  return group;
}

const terrainLabels: Record<string, string> = {
  hidden: "Nieodsłonięty",
  "hidden-link": "Nieodsłonięty + powiązanie",
  "hidden-step": "Nieodsłonięty + cel kroku",
  "hidden-step-link": "Nieodsłonięty + cel kroku + powiązanie",
  revealed: "Odsłonięty",
  "revealed-link": "Odsłonięty + powiązanie",
  character: "Postać",
  "character-link": "Postać + powiązanie",
  step: "Cel kroku",
  "step-link": "Cel kroku + powiązanie",
  depleted: "Wyczerpane",
  "depleted-link": "Wyczerpane + powiązanie",
  "depleted-character": "Wyczerpane + postać",
  "depleted-character-link": "Wyczerpane + postać + powiązanie",
  "depleted-step": "Wyczerpane + cel kroku",
  "depleted-step-link": "Wyczerpane + cel kroku + powiązanie",
};
function svg<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attributes: Record<string, string>,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attributes))
    node.setAttribute(key, value);
  return node;
}
function terrainSample(name: string): HTMLElement {
  const hidden = name.startsWith("hidden");
  const linked = name.includes("link");
  const depleted = name.includes("depleted");
  const resource = Object.values(RESOURCES)[0];
  const sample = element("div", "", "terrain-sample");
  sample.append(element("p", terrainLabels[name]));
  // Geometry only: these static polygons have no game coordinates or state.
  const picture = svg("svg", {
    viewBox: "0 0 100 100",
    width: "100",
    height: "100",
    class: "terrain-drawing",
    role: "img",
    "aria-label": terrainLabels[name],
  });
  const tile = svg("g", {
    class: `tile${hidden ? "" : " revealed"}${linked ? " hovered" : ""}`,
  });
  const points = "50,10 85,30 85,70 50,90 15,70 15,30";
  tile.append(svg("polygon", { points, class: "tile-body" }));
  if (!hidden)
    tile.append(
      svg("image", {
        href: `./icons/${resource.icon}.svg`,
        x: "30",
        y: "30",
        width: "40",
        height: "40",
        class: `icon${depleted ? " dimmed" : ""}`,
      }),
    );
  tile.append(
    svg("polygon", {
      points: "50,15 80,33 80,67 50,85 20,67 20,33",
      class: "link-outline",
    }),
  );
  if (name.includes("character"))
    tile.append(svg("polygon", { points, class: "outline character" }));
  if (name.includes("step"))
    tile.append(svg("polygon", { points, class: "outline step-target" }));
  picture.append(tile);
  sample.append(picture);
  if (!hidden || linked)
    sample.append(
      element(
        "p",
        hidden
          ? "Powiązany wiersz"
          : `${resource.name}: ${depleted ? "0" : "3"}`,
        `sample-stock${linked ? " sample-linked-row" : ""}`,
      ),
    );
  return sample;
}

function roleExample(name: string, kind: string): HTMLElement {
  const example = element("div", "", "role-example");
  if (kind === "text") {
    for (const background of ["page", "panel", "highlight"]) {
      const row = element("p", "", `background-${background}`);
      row.append(element("span", roleDescriptions[name], `role-${name}`));
      example.append(row);
    }
  } else if (kind === "background")
    example.append(element("p", roleDescriptions[name], `background-${name}`));
  else if (name === "focus") {
    const button = controlFactories.button({
      text: "Miejsce obsługi klawiaturą",
    });
    button.className += " preview-focus";
    example.append(
      button,
      element("p", "Demonstracja stylu fokusu", "preview-label"),
    );
  } else if (name === "selected")
    example.append(
      controlFactories["selected-button"]({ text: "Wybrane w grupie" }),
    );
  else if (name === "control-border")
    example.append(
      controlFactories["text-field"]({
        label: "Pole do wpisania",
        value: "Edytowalne",
      }).element,
    );
  else if (name === "divider")
    example.append(
      element("p", "Pierwsza sekcja"),
      element("hr"),
      element("p", "Druga sekcja"),
    );
  else {
    const terrain =
      name === "tile-hidden"
        ? "hidden"
        : name === "character"
          ? "character"
          : name === "link-highlight"
            ? "revealed-link"
            : name === "depleted"
              ? "depleted"
              : "revealed";
    example.append(terrainSample(terrain));
  }
  return example;
}

function roles(data: StyleguideTokens): HTMLElement {
  const group = section("Role wyglądu");
  const cards = element("div", "", "sample-grid");
  for (const [name, role] of Object.entries(data.roles)) {
    const card = element("section", "", "role-card");
    card.setAttribute("data-role", name);
    card.append(
      element("h3", `${name} — ${roleDescriptions[name]}`),
      roleExample(name, role.kind),
      element("p", `${role.kind}: ${role.value}`, "token-value"),
      element("p", role.source, "token-source"),
    );
    cards.append(card);
  }
  group.append(cards);
  return group;
}

function typography(data: StyleguideTokens): HTMLElement {
  const group = section("Typografia i odstępy");
  for (const [name, token] of Object.entries(data.tokens)) {
    if (!name.startsWith("font-") && !name.startsWith("space-")) continue;
    const row = element("div", "", "scale-sample");
    row.setAttribute("data-token", name);
    row.append(element("p", `${name}: ${token.value}`, "token-value"));
    row.append(
      element(
        name.startsWith("space-") ? "div" : "p",
        name.startsWith("space-") ? "" : "Przykład tekstu — 0123456789",
        `token-${name}`,
      ),
    );
    group.append(row);
  }
  return group;
}

function credits(): HTMLElement {
  const footer = element("footer");
  const resource = Object.values(RESOURCES)[0];
  const credit = ICON_CREDITS[resource.icon];
  const source = element("a", resource.iconTitle);
  source.href = credit.sourceUrl;
  const licence = element("a", ICON_LICENCE.name);
  licence.href = ICON_LICENCE.url;
  footer.append(
    source,
    element("span", ` — ${credit.author}; ${credit.changes}; `),
    licence,
  );
  return footer;
}

/** Constructs isolated samples with real controls; never reads or changes a game. */
export function createStyleguidePage(tokens: StyleguideTokens): HTMLElement {
  const page = element("article", "", "styleguide");
  page.append(
    element("h1", "Loop2 — wygląd interfejsu"),
    element("p", "Lokalne próbki wyglądu. Kontrolki nie sterują grą."),
    matrix(),
    roles(tokens),
    typography(tokens),
  );
  const terrain = section("Teren — statyczne próbki");
  const samples = element("div", "", "sample-grid");
  for (const name of Object.keys(terrainLabels)) {
    const sample = terrainSample(name);
    sample.setAttribute("data-terrain", name);
    samples.append(sample);
  }
  terrain.append(samples);
  page.append(terrain, credits());
  return page;
}
