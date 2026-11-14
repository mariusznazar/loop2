import { checkProgram, ProgramCheckError } from "./programs.js";
import { SAVED_GAME_VERSION } from "./saved-game.js";
import type { Program } from "./types.js";

/**
 * One item of the list of programs of a previous save, as the reader gives it: a program with its
 * trimmed name and its content as the program check built it, or an item skipped and named by its
 * name where that is a text, else by its place on the list counted from 1.
 */
export type PreviousItem =
  | { kind: "read"; name: string; program: Program }
  | { kind: "skipped"; name: string }
  | { kind: "skipped"; place: number };

/** The programs a document gives in order, or the refusal to read it at all. */
export type PreviousPrograms =
  | { ok: false }
  | { ok: true; items: PreviousItem[] };

const UNREADABLE: PreviousPrograms = { ok: false };

function isPlainObject(value: unknown): value is object {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/** The value of an own data key; an inherited key, an accessor or no key gives undefined. */
function ownData(object: object, key: string): { value: unknown } | undefined {
  const descriptor = Object.getOwnPropertyDescriptor(object, key);
  return descriptor && "value" in descriptor
    ? { value: descriptor.value as unknown }
    : undefined;
}

/** Whether the object's own keys are exactly `keys`, no key besides them and none missing. */
function hasExactKeys(object: object, keys: readonly string[]): boolean {
  const names = Reflect.ownKeys(object);
  return (
    names.length === keys.length && keys.every((key) => names.includes(key))
  );
}

/** A list with no hole and no key besides its indexes and its length; undefined for any other value. */
function listWithoutHoles(value: unknown): unknown[] | undefined {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype)
    return undefined;
  if (Reflect.ownKeys(value).length !== value.length + 1) return undefined;
  const items: unknown[] = [];
  for (let index = 0; index < value.length; index += 1) {
    const slot = ownData(value, String(index));
    if (!slot) return undefined;
    items.push(slot.value);
  }
  return items;
}

/** A version the document may carry: a safe integer from 1 up to the current version, itself included. */
function readableVersion(value: unknown): boolean {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= 1 &&
    value <= SAVED_GAME_VERSION
  );
}

/**
 * One item of the list, at its place counted from 1. An item is read only when it is a plain object
 * with exactly the keys `id`, `name` and `program`, its name is a text not empty after trimming and
 * the program check accepts its program; any other item is skipped and named. The value of `id` is
 * neither read nor checked. Only the program check's own refusal is a skip; every other error
 * propagates.
 */
function readItem(value: unknown, place: number): PreviousItem {
  const named = isPlainObject(value) ? ownData(value, "name") : undefined;
  const name =
    named && typeof named.value === "string" && named.value.trim() !== ""
      ? named.value.trim()
      : undefined;
  if (!isPlainObject(value) || name === undefined)
    return { kind: "skipped", place };
  if (!hasExactKeys(value, ["id", "name", "program"]))
    return { kind: "skipped", name };
  const program = ownData(value, "program");
  if (!program) return { kind: "skipped", name };
  try {
    return { kind: "read", name, program: checkProgram(program.value, null) };
  } catch (error) {
    if (error instanceof ProgramCheckError) return { kind: "skipped", name };
    throw error;
  }
}

/**
 * The programs of a previous save's document, read one by one: `version`, `game.programs` and the
 * items of that list are read, nothing else of the document is. A document that is not a plain
 * object with a readable version and a game whose programs are a list without holes is unreadable,
 * and so is one of a version above the current one. The document is changed by no read, and the
 * result shares nothing with it.
 */
export function readPreviousPrograms(saved: unknown): PreviousPrograms {
  if (!isPlainObject(saved)) return UNREADABLE;
  const version = ownData(saved, "version");
  if (!version || !readableVersion(version.value)) return UNREADABLE;
  const game = ownData(saved, "game");
  if (!game || !isPlainObject(game.value)) return UNREADABLE;
  const programs = ownData(game.value, "programs");
  const items = programs ? listWithoutHoles(programs.value) : undefined;
  if (!items) return UNREADABLE;
  return {
    ok: true,
    items: items.map((item, index) => readItem(item, index + 1)),
  };
}
