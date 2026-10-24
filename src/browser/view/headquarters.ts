import { ARCHETYPES, CREATED_ARCHETYPE } from "../sim/data/archetypes.js";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import { characterName } from "../sim/game.js";
import type {
  CharacterId,
  Chest,
  GameState,
  MapId,
  ResourceId,
  Team,
} from "../sim/types.js";
import { createButton } from "./controls/button.js";
import { createTextField } from "./controls/text-field.js";

/** The message under the name field when the name typed is empty once trimmed. */
export const EMPTY_NAME_MESSAGE = "Wpisz imię postaci.";

/** The maps a character can be sent to, in the data's order. Pure. */
export function sendMaps(): MapId[] {
  return Object.keys(MAPS) as MapId[];
}

/**
 * What the chest shows: one line „{name}: {count}” for each resource it holds some of, in the
 * order of the resources' data; no line for an empty chest. Pure.
 */
export function chestLines(chest: Chest): string[] {
  return (Object.keys(RESOURCES) as ResourceId[]).flatMap((id) => {
    const count = chest.pieces[id] ?? 0;
    return count > 0 ? [`${RESOURCES[id].name}: ${count}`] : [];
  });
}

/** What the headquarters asks for; the app turns each into a simulation call. */
export type HeadquartersControls = {
  /** Creates a character of the given name, already trimmed and not empty. */
  create(name: string): void;
  send(characterId: CharacterId, mapId: MapId): void;
};

export type Headquarters = {
  element: HTMLElement;
  /** Shows the team and its chest of the given game state. */
  update(state: GameState): void;
};

/** A heading of a section of the headquarters. */
function sectionHeading(text: string): HTMLElement {
  const heading = document.createElement("h3");
  heading.textContent = text;
  return heading;
}

/** A note shown in place of an empty list. */
function emptyNote(text: string): HTMLElement {
  const note = document.createElement("p");
  note.className = "headquarters-empty";
  note.textContent = text;
  return note;
}

/**
 * Builds the headquarters: the section „Drużyna” with the team's characters in the order they were
 * created, each with its name, the name of its archetype and the button „Wyślij” for each map, and
 * the creation of a character; and the section „Skrzynka” with the team's chest. Every name of the
 * game's content comes from the data. The name field and its button are made once, so they keep
 * focus; the list of characters is rebuilt when the team changes.
 */
export function createHeadquarters(
  controls: HeadquartersControls,
): Headquarters {
  const element = document.createElement("div");
  element.className = "headquarters";
  const title = document.createElement("h2");
  title.textContent = "Siedziba";

  const team = document.createElement("section");
  team.className = "headquarters-section";
  const noCharacter = emptyNote("Drużyna nie ma jeszcze postaci.");
  const list = document.createElement("ul");
  list.className = "team-list";

  const creation = document.createElement("div");
  creation.className = "character-creation";
  const creationLabel = document.createElement("span");
  creationLabel.className = "character-creation-label";
  creationLabel.textContent = `Nowa postać: ${ARCHETYPES[CREATED_ARCHETYPE].name}`;
  const nameField = createTextField({
    label: "Imię nowej postaci",
    hint: "Imię",
  });
  const createButtonElement = createButton("Załóż");
  creation.append(creationLabel, nameField.element, createButtonElement);
  team.append(sectionHeading("Drużyna"), noCharacter, list, creation);

  const chest = document.createElement("section");
  chest.className = "headquarters-section";
  const emptyChest = emptyNote("Skrzynka jest pusta.");
  const chestList = document.createElement("ul");
  chestList.className = "chest-list";
  chest.append(sectionHeading("Skrzynka"), emptyChest, chestList);

  element.append(title, team, chest);

  const submit = (): void => {
    const name = characterName(nameField.input.value);
    if (name === null) {
      nameField.setError(EMPTY_NAME_MESSAGE);
      return;
    }
    nameField.setError(null);
    nameField.input.value = "";
    controls.create(name);
  };
  createButtonElement.addEventListener("click", submit);
  nameField.input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submit();
  });
  nameField.input.addEventListener("input", () => nameField.setError(null));

  let shownTeam: Team | null = null;
  let sendButtons: HTMLButtonElement[] = [];

  function renderTeam(shown: Team): void {
    sendButtons = [];
    const rows = shown.characters.map((character) => {
      const row = document.createElement("li");
      row.className = "team-member";
      const name = document.createElement("span");
      name.className = "team-member-name";
      name.textContent = character.name;
      const archetype = document.createElement("span");
      archetype.className = "team-member-archetype";
      archetype.textContent = ARCHETYPES[character.archetypeId].name;
      row.append(name, archetype);
      for (const mapId of sendMaps()) {
        const where = document.createElement("span");
        where.textContent = `Mapa: ${MAPS[mapId].name}`;
        const button = createButton("Wyślij", {
          label: `Wyślij: ${character.name}, mapa ${MAPS[mapId].name}`,
        });
        button.addEventListener("click", () =>
          controls.send(character.id, mapId),
        );
        sendButtons.push(button);
        row.append(where, button);
      }
      return row;
    });
    list.replaceChildren(...rows);
    noCharacter.hidden = rows.length > 0;
    list.hidden = rows.length === 0;

    const lines = chestLines(shown.chest).map((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      return item;
    });
    chestList.replaceChildren(...lines);
    emptyChest.hidden = lines.length > 0;
    chestList.hidden = lines.length === 0;
  }

  return {
    element,
    update(state: GameState): void {
      if (state.team !== shownTeam) {
        shownTeam = state.team;
        renderTeam(state.team);
      }
      // One map run at a time: while one goes on, no other character can be sent.
      for (const button of sendButtons) button.disabled = state.run !== null;
    },
  };
}
