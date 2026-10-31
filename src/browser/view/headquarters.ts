import { ARCHETYPES, CREATED_ARCHETYPE } from "../sim/data/archetypes.js";
import { BALANCE } from "../sim/data/balance.js";
import { pieceCount } from "../sim/trip.js";
import { rehearsalMark, tripWarning } from "./trip-lines.js";
import { MAPS } from "../sim/data/maps.js";
import { ITEMS } from "../sim/data/items.js";
import { canSendMap, characterName, resurrectionReady } from "../sim/game.js";
import { rowProgram } from "../sim/programs.js";
import { SKILLS, type BranchId, type SkillId } from "../sim/data/skills.js";
import { createCharacterSkills } from "./character-skills.js";
import type {
  Character,
  CharacterId,
  Chest,
  EarningLoop,
  GameState,
  MapId,
  Practice,
  ProgramId,
  SavedProgram,
  ItemId,
  Team,
} from "../sim/types.js";
import { createAwayReport } from "./away-report.js";
import { createButton } from "./controls/button.js";
import { createSelectList, type SelectOption } from "./controls/select-list.js";
import { createTextField } from "./controls/text-field.js";

/** The message under the name field when the name typed is empty once trimmed. */
export const EMPTY_NAME_MESSAGE = "Wpisz imię postaci.";

/** The maps a character can be sent to, in the data's order. Pure. */
export function sendMaps(solvedMaps?: readonly MapId[]): MapId[] {
  const maps = Object.keys(MAPS) as MapId[];
  return solvedMaps === undefined
    ? maps
    : maps.filter((mapId) => canSendMap(solvedMaps, mapId));
}

/** The map's name in a character's row: „Mapa: {name}”, with „ · rozwiązana” once the map is solved. Pure. */
export function mapLabel(mapId: MapId, solved: boolean): string {
  return `Mapa: ${MAPS[mapId].name}${solved ? " · rozwiązana" : ""}`;
}

/** The map's solving condition as a sentence: „{name} — {solvingText}”, both from the map's data. Pure. */
export function solvingSentence(mapId: MapId): string {
  return `${MAPS[mapId].name} — ${MAPS[mapId].solvingText}`;
}

/**
 * What the chest shows: one line „{name}: {count}” for each item it holds some of, in the
 * order of the items' data; no line for an empty chest. Pure.
 */
export function chestLines(chest: Chest): string[] {
  return (Object.keys(ITEMS) as ItemId[]).flatMap((id) => {
    const count = chest.pieces[id] ?? 0;
    return count > 0 ? [`${ITEMS[id].name}: ${count}`] : [];
  });
}

/** One row's „Program:” list (D-170): the positions and the value shown. */
export type ProgramPositions = {
  options: SelectOption[];
  value: string;
};

/**
 * The positions of a row's program list, the names of `programs` in list order with the program's
 * number as the value, and the value of the program the row shows. Pure.
 */
export function programPositions(
  programs: readonly SavedProgram[],
  shown: SavedProgram,
): ProgramPositions {
  return {
    options: programs.map((saved) => [String(saved.id), saved.name]),
    value: String(shown.id),
  };
}

const MS_PER_MINUTE = 60_000;
const MINUTES_PER_HOUR = 60;

/** The label of a character's generation number: „pokolenie {n}” from 2 up, nothing at 1. Pure. */
export function generationLabel(generation: number): string | null {
  return generation >= 2 ? `pokolenie ${generation}` : null;
}

/** A character's resurrection line: its text, and whether it stands in `danger`. */
export type ResurrectionLine = {
  text: string;
  danger: boolean;
};

/**
 * The resurrection line of a character at the real moment `nowMs`: „Wskrzeszenie gotowe” once
 * ready, else a warning with the time left. The time left is rounded up to whole minutes first,
 * then divided into hours and minutes, and below an hour only the minutes stand, so the line never
 * promises sooner than the real time. A clock set back gives more time left. Pure.
 */
export function resurrectionLine(
  character: Character,
  nowMs: number,
): ResurrectionLine {
  if (resurrectionReady(character, nowMs))
    return { text: "Wskrzeszenie gotowe", danger: false };
  const minutes = Math.ceil(
    (character.resurrectionReadyAtMs - nowMs) / MS_PER_MINUTE,
  );
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const left =
    hours === 0
      ? `${minutes} min`
      : `${hours} godz. ${minutes % MINUTES_PER_HOUR} min`;
  return {
    text: `Wskrzeszenie za ${left} — śmierć zabierze wprawę i wykupione stopnie`,
    danger: true,
  };
}

/** The line of a character in an earning loop (D-227): the map, the run, its minute, runs completed. Pure. */
export function loopLine(loop: EarningLoop): string {
  return `Pętla: ${MAPS[loop.run.mapId].name} · przejście ${loop.runNumber} · minuta ${loop.run.minute} · domknięte ${loop.completed}`;
}

/**
 * The line of a character whose earning loop was stopped (D-228): „Pętla zatrzymana” and, where the
 * loop gathered practice, „ · wprawa: {skill} +{n}, …” in the order of the skills' data. Pure.
 */
export function stoppedLoopLine(practice: Practice): string {
  const gains = (Object.keys(SKILLS) as SkillId[])
    .filter((id) => (practice[id] ?? 0) > 0)
    .map((id) => `${SKILLS[id].name} +${practice[id]}`);
  return gains.length
    ? `Pętla zatrzymana · wprawa: ${gains.join(", ")}`
    : "Pętla zatrzymana";
}

/** What the headquarters asks for; the app turns each into a simulation call. */
export type HeadquartersControls = {
  buy(characterId: CharacterId, branch: BranchId): void;
  /** Creates a character of the given name, already trimmed and not empty. */
  create(name: string): void;
  /** Picks the program of a character's row, kept until the character is sent. */
  pick(characterId: CharacterId, programId: ProgramId): void;
  /** Sends a character to a map with the program its row shows. */
  send(characterId: CharacterId, mapId: MapId, programId: ProgramId): void;
  /** Puts a character into an earning loop on a solved map with the program its row shows. */
  startLoop(characterId: CharacterId, mapId: MapId, programId: ProgramId): void;
  /** Stops a character's earning loop at once. */
  stop(characterId: CharacterId): void;
  /** Closes the whole report on earning loops (D-229). */
  closeReport(): void;
};

export type Headquarters = {
  element: HTMLElement;
  /**
   * Shows the team, its chest, each row's program and each row's resurrection line of the given
   * game state, the line read at the real moment `nowMs`.
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
 * holds a line (D-229); the section „Drużyna” with the team's characters in the order they were
 * created, each with its name, its generation „pokolenie {n}” from 2 up, the name of its
 * archetype, the line of its resurrection on a row of its own, one list „Program:” and the button
 * „Wyślij” for each map, and the creation of a character; and the section „Skrzynka” with the team's chest. Every name of the
 * game's content comes from the data. The name field and its button are made once, so they keep
 * focus; the list of characters is rebuilt when the team, the solved maps or the programs' numbers
 * and names change, and the row's program list is only set to the program the row shows otherwise.
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
  let shownSolved: MapId[] | null = null;
  let shownChest = "";
  let shownPrograms = "";
  let sendButtons: { element: HTMLButtonElement; characterId: CharacterId }[] =
    [];
  let loopButtons: { element: HTMLButtonElement; characterId: CharacterId }[] =
    [];
  let loopRows: {
    characterId: CharacterId;
    line: HTMLElement;
    stop: HTMLButtonElement;
    stopped: HTMLElement;
  }[] = [];
  let programLists = new Map<CharacterId, HTMLSelectElement>();
  let skills: ReturnType<typeof createCharacterSkills>[] = [];
  let resurrectionLines: {
    element: HTMLElement;
    characterId: CharacterId;
  }[] = [];
  let warnings: {
    element: HTMLElement;
    characterId: CharacterId;
    capacity: number;
    mapId: MapId;
  }[] = [];
  let marks: {
    element: HTMLElement;
    characterId: CharacterId;
    capacity: number;
    mapId: MapId;
    solved: boolean;
  }[] = [];

  function renderTeam(
    shown: Pick<Team, "characters">,
    solved: MapId[],
    programs: readonly SavedProgram[],
  ): void {
    sendButtons = [];
    loopButtons = [];
    loopRows = [];
    marks = [];
    programLists = new Map();
    skills = [];
    resurrectionLines = [];
    warnings = [];
    const rows = shown.characters.map((character) => {
      const row = document.createElement("li");
      row.className = "team-member";
      const name = document.createElement("span");
      name.className = "team-member-name";
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
      const programLabel = document.createElement("span");
      programLabel.className = "team-member-program-label";
      programLabel.textContent = "Program:";
      const programList = createSelectList(
        `Program: ${character.name}`,
        programPositions(programs, programs[0]).options,
      );
      programList.addEventListener("change", () =>
        controls.pick(character.id, Number(programList.value)),
      );
      programLists.set(character.id, programList);
      row.append(name);
      if (generation !== null) row.append(generationElement);
      row.append(
        archetype,
        resurrection,
        loopLineElement,
        stopButton,
        stoppedLine,
        programLabel,
        programList,
      );
      for (const mapId of sendMaps(solved)) {
        const isSolved = solved.includes(mapId);
        const where = document.createElement("span");
        where.className = isSolved ? "map-label solved" : "map-label";
        where.textContent = mapLabel(mapId, isSolved);
        const condition = document.createElement("span");
        condition.className = "map-solving";
        condition.textContent = solvingSentence(mapId);
        const button = createButton("Wyślij", {
          label: `Wyślij: ${character.name}, mapa ${MAPS[mapId].name}`,
        });
        button.addEventListener("click", () =>
          controls.send(character.id, mapId, Number(programList.value)),
        );
        sendButtons.push({ element: button, characterId: character.id });
        // A map not yet solved has no loop (D-226).
        const loopButton = isSolved
          ? createButton("Puść w pętlę", {
              label: `Puść w pętlę: ${character.name}, mapa ${MAPS[mapId].name}`,
            })
          : null;
        if (loopButton !== null) {
          loopButton.addEventListener("click", () =>
            controls.startLoop(character.id, mapId, Number(programList.value)),
          );
          loopButtons.push({ element: loopButton, characterId: character.id });
        }
        const warning = document.createElement("p");
        warning.className = "trip-warning";
        warnings.push({
          element: warning,
          characterId: character.id,
          capacity: character.traits.carryingCapacity,
          mapId,
        });
        const mark = document.createElement("p");
        mark.className = "rehearsal-mark";
        mark.hidden = true;
        marks.push({
          element: mark,
          characterId: character.id,
          capacity: character.traits.carryingCapacity,
          mapId,
          solved: isSolved,
        });
        row.append(where, condition, button);
        if (loopButton !== null) row.append(loopButton);
        row.append(warning, mark);
      }
      const trees = createCharacterSkills(character.id, (id) =>
        controls.buy(character.id, id),
      );
      skills.push(trees);
      row.append(trees.element);
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

  /** Draws each row's line of a loop and „Zatrzymaj”, or the line of the stop, in place (D-227, D-228). */
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
      const programsKey = JSON.stringify(
        state.programs.map((saved) => [saved.id, saved.name]),
      );
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
      if (
        teamKey !== shownTeam ||
        state.solvedMaps !== shownSolved ||
        programsKey !== shownPrograms
      ) {
        shownTeam = teamKey;
        shownSolved = state.solvedMaps;
        shownPrograms = programsKey;
        renderTeam(state.team, state.solvedMaps, state.programs);
      }
      // Each row shows the program of D-170 as the simulation gives it.
      for (const [characterId, programList] of programLists)
        programList.value = programPositions(
          state.programs,
          rowProgram(state, characterId),
        ).value;
      // One map run at a time: while one goes on, no other character can be sent. A character in
      // a loop can neither be sent nor put into another loop; the others can (D-226).
      const inLoop = (characterId: CharacterId): boolean =>
        Object.hasOwn(state.loops, characterId);
      for (const { element, characterId } of sendButtons)
        element.disabled = state.run !== null || inLoop(characterId);
      for (const { element, characterId } of loopButtons)
        element.disabled =
          state.run?.character.id === characterId || inLoop(characterId);
      drawLoops(state);
      for (const panel of skills) panel.update(state);
      drawResurrectionLines(state, nowMs);
      for (const warning of warnings) {
        const text = tripWarning(
          rowProgram(state, warning.characterId).program.tripPlan,
          warning.capacity,
          MAPS[warning.mapId],
        );
        warning.element.hidden = text === null;
        warning.element.textContent = text ?? "";
      }
      for (const mark of marks) {
        setLine(
          mark.element,
          rehearsalMark(
            mark.solved,
            rowProgram(state, mark.characterId).program.tripPlan,
            mark.capacity,
            MAPS[mark.mapId],
            state.team.chest,
          ),
        );
      }
    },
  };
}
