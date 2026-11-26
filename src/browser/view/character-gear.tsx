/**
 * The section „Wyposażenie” of the screen Postać (D-461, D-454, D-462, D-287, D-445): the heading, the
 * sentence of the character's situation, where one stands, and under it the figure of the character
 * with the tiles of the eight slots of its gear around it — on its left „Głowa”, „Tułów” and „Nogi”, on
 * its right „Ręka główna” and „Druga ręka”, under it a row of the three pockets. Each tile is a tile of
 * the shared button (D-44): the icon of the piece its slot holds, or the pale name of its place where
 * the slot holds nothing; every slot stands, a slot no item of the data fits yet too (D-454).
 *
 * The tiles show the gear the game keeps at the character outside a map run (D-452): for a character in
 * an earning loop that is the gear of its next map run, with „Postać jest w pętli. Zmiana działa od
 * następnego przejścia.” above the tiles (D-462); for the character of the manual map run the game state
 * holds, going, paused or ended until „Restart” or „Zakończ”, it is the gear the character entered with,
 * its tiles cannot be chosen, and „Przejście na mapie {mapa} jest niezakończone. Wyposażenie zmienisz po
 * jego zakończeniu.” stands under the heading (D-287). The tiles of another character stay open.
 *
 * At most one tile is chosen, by a touch; a touch of another tile moves the choice and a second touch of
 * the chosen one takes it away. Which tile is chosen is this section's own state, so each entering of
 * the screen, which builds it anew, starts with none chosen, as the trees of „Umiejętności” start folded.
 * Under the tiles stands the pick of the chosen tile (D-461), in the pick cells of the rule panel: what
 * it offers is `gearPick` of the simulation, and a cell sends its act out of the section and closes the
 * pick. Nothing runs when the module is imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import {
  GEAR_PLACES,
  GEAR_SLOTS,
  type GearPlace,
  type GearSlot,
} from "../sim/data/gear.js";
import { ITEMS, type ItemId } from "../sim/data/items.js";
import { MAPS } from "../sim/data/maps.js";
import { GEAR_REFUSAL_WORDS, gearPick, type GearPick } from "../sim/gear.js";
import type { Character, GameState } from "../sim/types.js";
import { CharacterFigure } from "./character-figure.js";
import { ReactButton, type TileFace } from "./controls/react-button.js";
import { ReactPickCell } from "./controls/react-pick-cell.js";

export type CharacterGearProps = {
  character: Character;
  /**
   * The game state: its manual map run locks the tiles of the run's own character (D-287), and the
   * chest of its team is what the pick of a tile offers (D-461).
   */
  state: GameState;
  /** Whether the character is in an earning loop, which its tiles then say (D-462). */
  inLoop: boolean;
  /** Called when the player picks an item of the chest for a slot; the screen sends the act out. */
  onPutOn: (slot: GearSlot, item: ItemId) => void;
  /** Called when the player takes the piece of a slot off. */
  onTakeOff: (slot: GearSlot) => void;
};

/** The places whose tiles stand on the left of the figure, top to bottom, and on its right (D-461). */
const LEFT_PLACES: readonly GearPlace[] = ["head", "torso", "legs"];
const RIGHT_PLACES: readonly GearPlace[] = ["mainHand", "secondHand"];
/** The place whose tiles stand in a row under the figure. */
const POCKETS_PLACE: GearPlace = "pocket";

/** The slots of the places given, in the order of the data. */
function slotsOf(places: readonly GearPlace[]): GearSlot[] {
  return (Object.keys(GEAR_SLOTS) as GearSlot[])
    .filter((slot) => places.includes(GEAR_SLOTS[slot]))
    .sort(
      (first, second) =>
        places.indexOf(GEAR_SLOTS[first]) - places.indexOf(GEAR_SLOTS[second]),
    );
}

/** What the tile of a slot shows: the icon of its piece, named by the piece, or the name of its place. */
function faceOf(character: Character, slot: GearSlot): TileFace {
  const piece = character.gear[slot];
  return piece === null
    ? { slotName: GEAR_PLACES[GEAR_SLOTS[slot]].name }
    : { icon: ITEMS[piece].icon, name: ITEMS[piece].name };
}

/** The two acts of the section, which the screen sends out as it sends its others (D-461). */
type GearActs = {
  onPutOn: (slot: GearSlot, item: ItemId) => void;
  onTakeOff: (slot: GearSlot) => void;
};

/**
 * The pick under the chosen tile (D-461): the heading with the slot's place and its piece, and under it the
 * cells of the pick — one for each item of the chest that fits the slot, with its icon and its name and
 * pieces, then „Zdejmij” with no icon where the slot holds a piece — or, where the chest holds nothing
 * that fits, the one sentence of it. What the pick holds is `gearPick` of the simulation: which items fit
 * and whether „Zdejmij” can act, with its reason where it cannot, which greys the cell.
 */
function GearPickCells({
  character,
  slot,
  pick,
  onPick,
  onTake,
}: {
  character: Character;
  slot: GearSlot;
  pick: GearPick;
  onPick: (item: ItemId) => void;
  onTake: () => void;
}) {
  const held = character.gear[slot];
  const heading = `${GEAR_PLACES[GEAR_SLOTS[slot]].name}: ${
    held === null ? "nic" : ITEMS[held].name
  }`;
  return (
    <div className="character-gear-pick" role="group" aria-label={heading}>
      <h4 className="character-gear-pick-heading">{heading}</h4>
      {pick.options.length === 0 ? (
        <p className="character-gear-pick-empty">
          W skrzynce nie ma nic, co tu pasuje.
        </p>
      ) : null}
      {pick.options.length === 0 && held === null ? null : (
        <div className="character-gear-pick-cells">
          {pick.options.map(({ item, count }) => (
            <ReactPickCell
              key={item}
              text={`${ITEMS[item].name} × ${count}`}
              icon={ITEMS[item].icon}
              onPick={() => onPick(item)}
            />
          ))}
          {held === null ? null : (
            <ReactPickCell
              text="Zdejmij"
              greyed={pick.takeOff !== null}
              reason={
                pick.takeOff === null ? null : GEAR_REFUSAL_WORDS[pick.takeOff]
              }
              onPick={onTake}
            />
          )}
        </div>
      )}
    </div>
  );
}

/**
 * The body of the section: the figure with the tiles around it, which tile is chosen, and under them the
 * pick of the chosen tile. A pick or „Zdejmij” sends its act and closes the pick, and the focus goes to the
 * tile of the slot, since the cell that held it has left the screen with the pick.
 */
function GearBody({
  character,
  state,
  locked,
  onPutOn,
  onTakeOff,
}: GearActs & {
  character: Character;
  state: GameState;
  locked: boolean;
}) {
  const [chosen, setChosen] = useState<GearSlot | null>(null);
  const tiles = useRef<Partial<Record<GearSlot, HTMLButtonElement | null>>>({});
  const refocus = useRef<GearSlot | null>(null);
  // After each commit, a pick that has just closed hands the focus to its tile, which stands in its place.
  useLayoutEffect(() => {
    const slot = refocus.current;
    if (slot === null) return;
    refocus.current = null;
    tiles.current[slot]?.focus();
  });
  const act = (slot: GearSlot, send: () => void) => {
    refocus.current = slot;
    setChosen(null);
    send();
  };
  const tile = (slot: GearSlot) => (
    <ReactButton
      key={slot}
      kind="tile"
      tile={faceOf(character, slot)}
      selected={chosen === slot}
      disabled={locked}
      buttonRef={(element) => {
        tiles.current[slot] = element;
      }}
      onClick={() => setChosen(chosen === slot ? null : slot)}
    />
  );
  const pick = chosen === null ? null : gearPick(state, character.id, chosen);
  return (
    <>
      <div className="character-gear-body">
        <div className="character-gear-left">
          {slotsOf(LEFT_PLACES).map(tile)}
        </div>
        <CharacterFigure archetypeId={character.archetypeId} />
        <div className="character-gear-right">
          {slotsOf(RIGHT_PLACES).map(tile)}
        </div>
        <div className="character-gear-pockets">
          {slotsOf([POCKETS_PLACE]).map(tile)}
        </div>
      </div>
      {chosen === null || pick === null ? null : (
        <GearPickCells
          character={character}
          slot={chosen}
          pick={pick}
          onPick={(item) => act(chosen, () => onPutOn(chosen, item))}
          onTake={() => act(chosen, () => onTakeOff(chosen))}
        />
      )}
    </>
  );
}

/** The section: heading, sentence, and the body with the tiles around the figure and the pick of the chosen one. */
export function CharacterGear({
  character,
  state,
  inLoop,
  onPutOn,
  onTakeOff,
}: CharacterGearProps) {
  const run = state.run;
  const locked = run !== null && run.character.id === character.id;
  const sentence = locked
    ? `Przejście na mapie ${MAPS[run.mapId].name} jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.`
    : inLoop
      ? "Postać jest w pętli. Zmiana działa od następnego przejścia."
      : null;
  return (
    <section className="character-screen-gear">
      <h3>Wyposażenie</h3>
      {sentence === null ? null : (
        <p className="character-gear-note">{sentence}</p>
      )}
      {/* Keyed by the lock: a map run that starts or ends builds the body anew, with no tile chosen,
          so a tile that cannot be chosen is never the chosen one. */}
      <GearBody
        key={locked ? "locked" : "open"}
        character={character}
        state={state}
        locked={locked}
        onPutOn={onPutOn}
        onTakeOff={onTakeOff}
      />
    </section>
  );
}
