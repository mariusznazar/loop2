import { ARCHETYPES, CREATED_ARCHETYPE } from "../sim/data/archetypes.js";
import { BALANCE } from "../sim/data/balance.js";
import { pieceCount } from "../sim/trip.js";
import { characterName } from "../sim/game.js";
import type { CharacterId, Chest, GameState, Team } from "../sim/types.js";
import { createAwayReport } from "./away-report.js";
import { screenAddress } from "./screen-address.js";
import { createButton } from "./controls/button.js";
import { createTextField } from "./controls/text-field.js";
import {
  chestLines,
  generationLabel,
  loopLine,
  resurrectionLine,
  stoppedLoopLine,
} from "./team-lines.js";

/** The message under the name field when the name typed is empty once trimmed. */
export const EMPTY_NAME_MESSAGE = "Wpisz imię postaci.";

/** What the headquarters asks for; the app turns each into a simulation call. */
export type HeadquartersControls = {
  /** Creates a character of the given name, already trimmed and not empty. */
  create(name: string): void;
  /** Stops a character's earning loop at once. */
  stop(characterId: CharacterId): void;
  /** Closes the whole report on earning loops (D-246). */
  closeReport(): void;
};

export type Headquarters = {
  element: HTMLElement;
  /**
   * Shows the team, its chest, each row's loop and each row's resurrection line of the given game
   * state, the line read at the real moment `nowMs`.
   */
  update(state: GameState, nowMs: number): void;
  /**
   * Rewrites the resurrection lines alone at the real moment `nowMs`, for the passing of real time
   * while the game state stays as it is; an element is written only when its text or role changed.
   */
  tick(state: GameState, nowMs: number): void;
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
 * Builds the headquarters: the section of the report on earning loops above it while the report
 * holds a line (D-246); the section „Drużyna” with the team's characters in the order they were
 * created, each with its name as a link to its screen Postać, its generation „pokolenie {n}” from 2
 * up, the name of its archetype, the line of its resurrection on a row of its own, the line of its
 * earning loop with „Zatrzymaj” or the line of a stopped loop, and the creation of a character; and
 * the section „Skrzynka” with the team's chest. The screen sends nobody: a character is sent from
 * the card of a map on the screen Mapy (D-53). Every name of the game's content comes from the data.
 * The name field and its button are made once, so they keep focus; the list of characters is
 * rebuilt when the team changes, and the lines of a loop and of a stop are written in place.
 */
export function createHeadquarters(
  controls: HeadquartersControls,
): Headquarters {
  const element = document.createElement("div");
  element.className = "headquarters";
  const title = document.createElement("h2");
  title.textContent = "Siedziba";

  // Where focus goes when „Zamknij” of the report leaves the screen: the heading of the section
  // that takes its place, so the next key press reaches the team's first control.
  const teamHeading = sectionHeading("Drużyna");
  teamHeading.setAttribute("tabindex", "-1");
  const report = createAwayReport(() => {
    controls.closeReport();
    if (!report.shown()) teamHeading.focus();
  });

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
  team.append(teamHeading, noCharacter, list, creation);

  const chest = document.createElement("section");
  chest.className = "headquarters-section";
  const emptyChest = emptyNote("Skrzynka jest pusta.");
  const chestList = document.createElement("ul");
  chestList.className = "chest-list";
  const chestHeading = sectionHeading("");
  chest.append(chestHeading, emptyChest, chestList);

  element.append(title, report.element, team, chest);

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

  let shownTeam = "";
  let shownChest = "";
  let loopRows: {
    characterId: CharacterId;
    line: HTMLElement;
    stop: HTMLButtonElement;
    stopped: HTMLElement;
  }[] = [];
  let resurrectionLines: {
    element: HTMLElement;
    characterId: CharacterId;
  }[] = [];

  function renderTeam(shown: Pick<Team, "characters">): void {
    loopRows = [];
    resurrectionLines = [];
    const rows = shown.characters.map((character) => {
      const row = document.createElement("li");
      row.className = "team-member";
      // The name leads to the character's screen Postać (D-281, question 7).
      const name = document.createElement("a");
      name.className = "team-member-name";
      name.href = screenAddress({
        kind: "character",
        characterId: character.id,
      });
      name.textContent = character.name;
      const generation = generationLabel(character.generation);
      const generationElement = document.createElement("span");
      generationElement.className = "team-member-generation";
      generationElement.textContent = generation ?? "";
      const archetype = document.createElement("span");
      archetype.className = "team-member-archetype";
      archetype.textContent = ARCHETYPES[character.archetypeId].name;
      const resurrection = document.createElement("p");
      resurrection.className = "team-member-resurrection";
      resurrectionLines.push({
        element: resurrection,
        characterId: character.id,
      });
      const loopLineElement = document.createElement("p");
      loopLineElement.className = "team-member-loop";
      loopLineElement.hidden = true;
      const stopButton = createButton("Zatrzymaj", {
        kind: "destructive",
        label: `Zatrzymaj: ${character.name}`,
      });
      stopButton.hidden = true;
      stopButton.addEventListener("click", () => controls.stop(character.id));
      const stoppedLine = document.createElement("p");
      stoppedLine.className = "team-member-stopped";
      stoppedLine.hidden = true;
      loopRows.push({
        characterId: character.id,
        line: loopLineElement,
        stop: stopButton,
        stopped: stoppedLine,
      });
      row.append(name);
      if (generation !== null) row.append(generationElement);
      row.append(
        archetype,
        resurrection,
        loopLineElement,
        stopButton,
        stoppedLine,
      );
      return row;
    });
    list.replaceChildren(...rows);
    noCharacter.hidden = rows.length > 0;
    list.hidden = rows.length === 0;
  }

  /** Draws the chest's heading and list; the list is rebuilt only when the chest changed. */
  function drawChest(chestShown: Chest): void {
    chestHeading.textContent = `Skrzynka ${pieceCount(chestShown.pieces)}/${BALANCE.chestCapacity}`;
    const key = JSON.stringify(chestShown);
    if (key === shownChest) return;
    shownChest = key;
    const lines = chestLines(chestShown).map((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      return item;
    });
    chestList.replaceChildren(...lines);
    emptyChest.hidden = lines.length > 0;
    chestList.hidden = lines.length === 0;
  }

  /** Writes an element's text and visibility only where they differ, so a redraw touches what changed. */
  function setLine(element: HTMLElement, text: string | null): void {
    const hidden = text === null;
    if (element.hidden !== hidden) element.hidden = hidden;
    if (text !== null && element.textContent !== text)
      element.textContent = text;
  }

  /** Draws each row's line of a loop and „Zatrzymaj”, or the line of the stop, in place (D-244, D-245). */
  function drawLoops(state: GameState): void {
    for (const row of loopRows) {
      const loop = Object.hasOwn(state.loops, row.characterId)
        ? state.loops[row.characterId]
        : undefined;
      const stoppedPractice =
        loop === undefined && Object.hasOwn(state.stoppedLoops, row.characterId)
          ? state.stoppedLoops[row.characterId]
          : undefined;
      setLine(row.line, loop === undefined ? null : loopLine(loop));
      if (row.stop.hidden !== (loop === undefined))
        row.stop.hidden = loop === undefined;
      setLine(
        row.stopped,
        stoppedPractice === undefined ? null : stoppedLoopLine(stoppedPractice),
      );
    }
  }

  /** Writes each resurrection line at `nowMs`, an element only where its text or role changed. */
  function drawResurrectionLines(state: GameState, nowMs: number): void {
    for (const { element: line, characterId } of resurrectionLines) {
      const character = state.team.characters.find(
        (candidate) => candidate.id === characterId,
      );
      if (character === undefined) continue;
      const shown = resurrectionLine(character, nowMs);
      if (line.textContent !== shown.text) line.textContent = shown.text;
      if (line.classList.contains("danger") !== shown.danger)
        line.classList.toggle("danger", shown.danger);
    }
  }

  return {
    element,
    tick: drawResurrectionLines,
    update(state: GameState, nowMs: number): void {
      report.update(state);
      drawChest(state.team.chest);
      const teamKey = JSON.stringify({
        characters: state.team.characters.map(
          ({ id, name, archetypeId, generation }) => ({
            id,
            name,
            archetypeId,
            generation,
          }),
        ),
      });
      if (teamKey !== shownTeam) {
        shownTeam = teamKey;
        renderTeam(state.team);
      }
      drawLoops(state);
      drawResurrectionLines(state, nowMs);
    },
  };
}
