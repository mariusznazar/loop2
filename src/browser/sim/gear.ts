// The player's two acts on a character's gear (D-452, D-453): putting a piece on from the chest and
// taking a piece off into it, and what the screen Postać shows for a slot's pick (D-456, D-460);
// and the gear a map run gives back to its character at its end (D-183, D-190, D-460).
// Each function returns a new state and changes nothing passed to it.
import { fitsSlot, gearSlots } from "./character.js";
import { GEAR_SLOTS, type GearSlot } from "./data/gear.js";
import { ITEMS, type ItemId } from "./data/items.js";
import { BALANCE } from "./data/balance.js";
import { mapRunEnded } from "./run.js";
import { pieceCount } from "./trip.js";
import type { GameResult } from "./game.js";
import type { Character, CharacterId, GameState, Gear, Team } from "./types.js";

/** Why the player's act on a gear slot was refused. */
export type GearRefusal =
  | "noCharacter"
  | "noSlot"
  | "manualRun"
  | "notInChest"
  | "wrongPlace"
  | "emptySlot"
  | "chestFull";

/** The words the screen shows for a refusal; the reason „skrzynka pełna” is the chest's one. */
export const GEAR_REFUSAL_WORDS: Record<GearRefusal, string> = {
  noCharacter: "Nie ma takiej postaci.",
  noSlot: "Nie ma takiego miejsca.",
  manualRun:
    "Przejście na mapie jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.",
  notInChest: "Skrzynki nie ma tej sztuki.",
  wrongPlace: "Ta sztuka nie pasuje do tego miejsca.",
  emptySlot: "Nie ma czego zdjąć.",
  chestFull: "skrzynka pełna",
};

/** What an act returns: the usual result and the refusal, null where the act was made. */
export type GearResult = GameResult & { refusal: GearRefusal | null };

/** What the pick of a slot on the screen Postać shows: the pieces of the chest that fit, and whether „Zdejmij” acts. */
export type GearPick = {
  options: { item: ItemId; count: number }[];
  takeOff: GearRefusal | null;
};

function characterOf(
  state: GameState,
  characterId: CharacterId,
): Character | undefined {
  return state.team.characters.find((listed) => listed.id === characterId);
}

function refused(state: GameState, refusal: GearRefusal): GearResult {
  return { state, events: [], refusal };
}

/** The refusal every act shares: an unknown character, an unknown slot, or the character of a manual map run. */
function sharedRefusal(
  state: GameState,
  characterId: CharacterId,
  slot: GearSlot,
): GearRefusal | null {
  if (!characterOf(state, characterId)) return "noCharacter";
  if (!Object.hasOwn(GEAR_SLOTS, slot)) return "noSlot";
  if (state.run?.character.id === characterId) return "manualRun";
  return null;
}

/**
 * The state after an act on `before`'s gear: the gear and the chest as given, the slot marked as
 * changed by the player at a character in an earning loop (D-453, D-460) and the count of the gear
 * changes raised by one (D-463). The character's place in the team's list stays.
 */
function acted(
  state: GameState,
  before: Character,
  slot: GearSlot,
  gear: Character["gear"],
  pieces: Partial<Record<ItemId, number>>,
): GearResult {
  const inLoop = state.loops[before.id] !== undefined;
  const changedSlots =
    inLoop && !before.changedSlots.includes(slot)
      ? [...before.changedSlots, slot]
      : before.changedSlots;
  const after: Character = {
    ...before,
    gear,
    changedSlots,
    gearChanges: before.gearChanges + 1,
  };
  return {
    state: {
      ...state,
      team: {
        ...state.team,
        chest: { pieces },
        characters: state.team.characters.map((listed) =>
          listed === before ? after : listed,
        ),
      },
    },
    events: [],
    refusal: null,
  };
}

/**
 * Puts `item` from the chest on `slot` of the character's gear. The piece the slot held goes back to
 * the chest. Refused where the chest lacks the item, where the item does not fit the slot, and for
 * the character of a manual map run (D-287, D-453); the chest is read before the act.
 */
export function putOnPiece(
  state: GameState,
  characterId: CharacterId,
  slot: GearSlot,
  item: ItemId,
): GearResult {
  const refusal = sharedRefusal(state, characterId, slot);
  if (refusal) return refused(state, refusal);
  const character = characterOf(state, characterId)!;
  if ((state.team.chest.pieces[item] ?? 0) < 1)
    return refused(state, "notInChest");
  if (!fitsSlot(item, slot)) return refused(state, "wrongPlace");
  const pieces = { ...state.team.chest.pieces };
  const held = character.gear[slot];
  if (held !== null) pieces[held] = (pieces[held] ?? 0) + 1;
  const left = (pieces[item] ?? 0) - 1;
  if (left > 0) pieces[item] = left;
  else delete pieces[item];
  return acted(
    state,
    character,
    slot,
    { ...character.gear, [slot]: item },
    pieces,
  );
}

/**
 * Takes the piece of `slot` off the character's gear into the chest. Refused on an empty slot, where
 * the chest has no room (the reason „skrzynka pełna”), and for the character of a manual map run.
 */
export function takeOffPiece(
  state: GameState,
  characterId: CharacterId,
  slot: GearSlot,
): GearResult {
  const refusal = sharedRefusal(state, characterId, slot);
  if (refusal) return refused(state, refusal);
  const character = characterOf(state, characterId)!;
  const held = character.gear[slot];
  if (held === null) return refused(state, "emptySlot");
  if (pieceCount(state.team.chest.pieces) + 1 > BALANCE.chestCapacity)
    return refused(state, "chestFull");
  const pieces = {
    ...state.team.chest.pieces,
    [held]: (state.team.chest.pieces[held] ?? 0) + 1,
  };
  return acted(
    state,
    character,
    slot,
    { ...character.gear, [slot]: null },
    pieces,
  );
}

/**
 * What the pick of `slot` on the screen Postać shows (D-456): the items of the chest that fit the
 * slot, in the order of the data, each with the pieces the chest holds of it, and whether „Zdejmij”
 * acts, with its reason where it does not. Null for an unknown character or slot.
 */
export function gearPick(
  state: GameState,
  characterId: CharacterId,
  slot: GearSlot,
): GearPick | null {
  const character = characterOf(state, characterId);
  if (!character || !Object.hasOwn(GEAR_SLOTS, slot)) return null;
  const options = (Object.keys(ITEMS) as ItemId[])
    .filter(
      (item) =>
        fitsSlot(item, slot) && (state.team.chest.pieces[item] ?? 0) > 0,
    )
    .map((item) => ({ item, count: state.team.chest.pieces[item]! }));
  let takeOff: GearRefusal | null = null;
  if (state.run?.character.id === characterId) takeOff = "manualRun";
  else if (character.gear[slot] === null) takeOff = "emptySlot";
  else if (pieceCount(state.team.chest.pieces) + 1 > BALANCE.chestCapacity)
    takeOff = "chestFull";
  return { options, takeOff };
}

/**
 * The team after the end of a map run of the character `characterId`, whose gear stood at `runGear`
 * at that end (D-183, D-190, D-460), merged slot by slot. A slot the player changed since that map run
 * started keeps the player's choice, and the piece the map run left in it goes to the chest, in the
 * order of the slots of the data, or is lost where the chest has no room, as loot beyond the free room
 * of the chest is; any other slot takes what the map run left. Where the death that ended the map run
 * takes the gear (`taken`), the gear of the map run is lost: a changed slot keeps the player's choice,
 * any other is emptied, and nothing goes to the chest. The changed slots are cleared. The very team
 * where nothing changes, and for a character the team does not list.
 */
export function teamAtRunEnd(
  team: Team,
  characterId: CharacterId,
  runGear: Gear,
  taken: boolean,
): Team {
  const before = team.characters.find((listed) => listed.id === characterId);
  if (!before) return team;
  const gear = { ...before.gear };
  const pieces = { ...team.chest.pieces };
  let room = BALANCE.chestCapacity - pieceCount(pieces);
  let changed = before.changedSlots.length > 0;
  for (const slot of gearSlots()) {
    const left = taken ? null : runGear[slot];
    if (!before.changedSlots.includes(slot)) {
      changed ||= gear[slot] !== left;
      gear[slot] = left;
    } else if (left !== null && room > 0) {
      pieces[left] = (pieces[left] ?? 0) + 1;
      room -= 1;
      changed = true;
    }
  }
  if (!changed) return team;
  const after: Character = { ...before, gear, changedSlots: [] };
  return {
    ...team,
    chest: { pieces },
    characters: team.characters.map((listed) =>
      listed === before ? after : listed,
    ),
  };
}

/**
 * The team after „Zakończ” or „Restart” ends the manual map run of `state` (D-183): before a completion
 * and a death the map run's gear becomes its character's; after either, the team as it stands, since
 * the completion and the settled death have given the gear already. The very team with no map run.
 */
export function teamAtRunStop(state: GameState): Team {
  const run = state.run;
  if (!run || mapRunEnded(run)) return state.team;
  return teamAtRunEnd(state.team, run.character.id, run.character.gear, false);
}
