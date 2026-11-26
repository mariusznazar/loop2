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
 * Nothing runs when the module is imported.
 */
import { useState } from "react";
import {
  GEAR_PLACES,
  GEAR_SLOTS,
  type GearPlace,
  type GearSlot,
} from "../sim/data/gear.js";
import { ITEMS } from "../sim/data/items.js";
import { MAPS } from "../sim/data/maps.js";
import type { Character, MapRun } from "../sim/types.js";
import { CharacterFigure } from "./character-figure.js";
import { ReactButton, type TileFace } from "./controls/react-button.js";

export type CharacterGearProps = {
  character: Character;
  /** The manual map run of the game state, which locks the tiles of its own character (D-287). */
  run: MapRun | null;
  /** Whether the character is in an earning loop, which its tiles then say (D-462). */
  inLoop: boolean;
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

/** The body of the section: the figure with the tiles around it, and which tile is chosen. */
function GearBody({
  character,
  locked,
}: {
  character: Character;
  locked: boolean;
}) {
  const [chosen, setChosen] = useState<GearSlot | null>(null);
  const tile = (slot: GearSlot) => (
    <ReactButton
      key={slot}
      kind="tile"
      tile={faceOf(character, slot)}
      selected={chosen === slot}
      disabled={locked}
      onClick={() => setChosen(chosen === slot ? null : slot)}
    />
  );
  return (
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
  );
}

/** The section: heading, sentence, and the body with the tiles around the figure. */
export function CharacterGear({ character, run, inLoop }: CharacterGearProps) {
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
        locked={locked}
      />
    </section>
  );
}
