/**
 * The registry of the game's screens, outside React (D-280, D-281, D-283): a table with one entry
 * for each screen of the game view, through which the view shows a screen, draws the screens after a
 * result of the simulation and after a reading of the clock, picks the element that gets the
 * keyboard's focus and cleans up. A new screen is one more entry of the table; no function of the
 * view names it. The registry knows no screen but Przejście, whose way back the page is told of
 * (`ScreenPlace`): an entry tells it which kinds of `Screen` it holds, whether its instance lives
 * always or only while the player is on it, and how to build it. Nothing here runs when the module
 * is imported.
 */
import type { GameEvent } from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import type { PageAddress } from "./email-confirmation.js";
import {
  returnToRunEntry,
  SCREEN_KINDS,
  screenAddress,
  type ReturnEntry,
  type Screen,
} from "./screen-address.js";

export type { Screen };

/** Where the player is: the screen, and the bar's way back to a map run the player left. */
export type ScreenPlace = {
  readonly screen: Screen;
  readonly returnEntry: ReturnEntry | null;
};

/** How a change of screen treats the address: a new entry of the history, none, or no write. */
export type ShowHow = "go" | "replace" | "none";

/** What an entry gets to navigate with, so that it imports no registry. */
export type ScreenPort = {
  /** The screen the player is on. */
  current(): Screen;
  /** Shows `next`, with the address treated as `how` says. */
  show(next: Screen, how: ShowHow): void;
  /** Moves the focus to the element of the screen that shows. */
  focusShown(): void;
  /** Moves the focus to the element of the screen that shows where it stands nowhere useful. */
  focusIfLost(): void;
};

/** What an entry builds for its screens, once for an `always` entry and at each entering otherwise. */
export type ScreenInstance = {
  /** The screen's element: an `always` instance's is placed at creation, the other at its build. */
  readonly element: HTMLElement;
  /** An editor field of the screen commits its text before the address changes. */
  commit?(): void;
  /** The player leaves for a screen of another entry; called before the address changes. */
  leave?(): void;
  /** The change of screen is made: `screen` is the one the player is on, whichever entry holds it. */
  placed?(screen: Screen): void;
  /** Draws from the state after a result of the simulation; `events` are those of the call. */
  drawResult(events: readonly GameEvent[]): void;
  /** Draws after a reading of the clock; `shown` is whether the player is on this screen. */
  drawReading(shown: boolean): void;
  /** Takes the instance down. */
  dispose(): void;
};

/** One screen of the table: the kinds of `Screen` it holds and how it lives. */
export type ScreenEntry = {
  /** The kinds of `Screen` the entry holds; no other entry holds one of them. */
  readonly kinds: readonly Screen["kind"][];
  /** Builds the instance; `screen` is the one the player is on when it is built. */
  build(port: ScreenPort, screen: Screen): ScreenInstance;
} & (
  | { readonly lives: "always" }
  | {
      readonly lives: "while-shown";
      /** The instance is built anew where the key of the next screen differs from the last. */
      key(screen: Screen): string;
    }
);

export type ScreenRegistryOptions = {
  /** The game's element, which the instances' elements are appended to. */
  readonly element: HTMLElement;
  /** The table, in the order the screens stand in the document. */
  readonly entries: readonly ScreenEntry[];
  /** The first screen. */
  readonly first: Screen;
  /** Where the screen's fragment is written. */
  readonly address: Pick<PageAddress, "go" | "replace">;
  /** The current game state. */
  state(): GameState;
  /** The page is told where the player is, at the first screen and at each change. */
  onPlace(place: ScreenPlace): void;
};

export type ScreenRegistry = {
  /** Draws every living instance from the state with no events, then shows the first screen. */
  start(): void;
  /**
   * Shows `next`: the address gets its fragment with a new entry (`go`), in place of the current
   * one (`replace`) or not at all. The screens that hold `next` show and the others hide, the
   * `while-shown` ones are built, built anew or taken down, and the page is told its place.
   */
  show(next: Screen, how: ShowHow): void;
  /** Draws every living instance after a result of the simulation, then tells the page its place. */
  drawResult(events: readonly GameEvent[]): void;
  /** Draws every living instance after a reading of the clock. */
  drawReading(): void;
  focusShown(): void;
  focusIfLost(): void;
  current(): Screen;
  /** Takes every living instance down and stops telling the page. */
  dispose(): void;
};

function sameScreen(one: Screen, other: Screen): boolean {
  return screenAddress(one) === screenAddress(other);
}

function samePlace(one: ScreenPlace, other: ScreenPlace): boolean {
  return (
    sameScreen(one.screen, other.screen) &&
    one.returnEntry?.text === other.returnEntry?.text &&
    one.returnEntry?.address === other.returnEntry?.address
  );
}

/**
 * Builds the registry: the `always` entries are built at once, in table order, and their elements
 * appended. Throws where two entries hold one kind of `Screen` and where no entry holds a kind of
 * `Screen` that `SCREEN_KINDS` lists: both are faults of the code, caught at the first build.
 */
export function createScreenRegistry(
  options: ScreenRegistryOptions,
): ScreenRegistry {
  const { element, entries, address } = options;
  const byKind = new Map<Screen["kind"], ScreenEntry>();
  for (const entry of entries) {
    for (const kind of entry.kinds) {
      if (byKind.has(kind))
        throw new Error(`two screen entries hold the kind ${kind}`);
      byKind.set(kind, entry);
    }
  }
  for (const kind of SCREEN_KINDS) {
    if (!byKind.has(kind))
      throw new Error(`no screen entry holds the kind ${kind}`);
  }
  function entryOf(screen: Screen): ScreenEntry {
    const entry = byKind.get(screen.kind);
    if (entry === undefined)
      throw new Error(`no screen entry holds the kind ${screen.kind}`);
    return entry;
  }

  let current: Screen = options.first;
  entryOf(current);
  /** The place the page was last told. */
  let told: ScreenPlace | null = null;
  let disposed = false;
  /** The living instances, with the key a `while-shown` one was built for. */
  const living = new Map<
    ScreenEntry,
    { readonly instance: ScreenInstance; readonly key: string | null }
  >();

  /** The living instances, in the order of the table. */
  function instances(): { entry: ScreenEntry; instance: ScreenInstance }[] {
    const found = [];
    for (const entry of entries) {
      const held = living.get(entry);
      if (held !== undefined) found.push({ entry, instance: held.instance });
    }
    return found;
  }

  /** Tells the page where the player is, when that changed. */
  function tellPlace(): void {
    if (disposed) return;
    const place: ScreenPlace = {
      screen: current,
      returnEntry:
        current.kind === "run" ? null : returnToRunEntry(options.state()),
    };
    if (told !== null && samePlace(told, place)) return;
    told = place;
    options.onPlace(place);
  }

  /** The element of the screen that shows. */
  function shownElement(): HTMLElement | null {
    return living.get(entryOf(current))?.instance.element ?? null;
  }

  /**
   * The focus moves to the screen without scrolling the page: a screen taller than the window would
   * otherwise be scrolled to its top edge, past the menu bar above it, which stays in sight.
   */
  function focusShown(): void {
    shownElement()?.focus({ preventScroll: true });
  }

  /**
   * Moves keyboard focus to the screen that shows where it stands nowhere useful: on the body — the
   * link followed left the bar, or the browser's button moved nothing — or on a screen of the game
   * that is hidden now, so the keyboard goes on from the screen the player sees. The page does not
   * scroll, as at `focusShown`.
   */
  function focusIfLost(): void {
    const active = document.activeElement;
    const shown = shownElement();
    const lost =
      active === null ||
      active === document.body ||
      (element.contains(active) && shown?.contains(active) !== true);
    if (lost) shown?.focus({ preventScroll: true });
  }

  const port: ScreenPort = {
    current: () => current,
    show,
    focusShown,
    focusIfLost,
  };

  for (const entry of entries) {
    if (entry.lives !== "always") continue;
    const instance = entry.build(port, current);
    element.append(instance.element);
    living.set(entry, { instance, key: null });
  }

  function show(next: Screen, how: ShowHow): void {
    const nextEntry = entryOf(next);
    const currentEntry = entryOf(current);
    // Text typed and not yet committed goes where it was typed before the screen or the program
    // changes.
    if (!sameScreen(current, next))
      for (const { instance } of instances()) instance.commit?.();
    if (currentEntry !== nextEntry)
      living.get(currentEntry)?.instance.leave?.();
    const hash = screenAddress(next);
    if (how === "go") address.go(hash);
    else if (how === "replace") address.replace(hash);
    current = next;
    for (const entry of entries) {
      if (entry.lives !== "while-shown") continue;
      const held = living.get(entry);
      if (entry !== nextEntry) {
        if (held !== undefined) {
          held.instance.dispose();
          living.delete(entry);
        }
        continue;
      }
      const key = entry.key(next);
      if (held?.key === key) continue;
      held?.instance.dispose();
      const instance = entry.build(port, next);
      element.append(instance.element);
      living.set(entry, { instance, key });
    }
    for (const { entry, instance } of instances()) {
      if (entry.lives === "always")
        instance.element.hidden = entry !== nextEntry;
    }
    for (const { instance } of instances()) instance.placed?.(next);
    tellPlace();
  }

  function drawResult(events: readonly GameEvent[]): void {
    for (const { instance } of instances()) instance.drawResult(events);
    tellPlace();
  }

  return {
    start() {
      drawResult([]);
      show(options.first, "replace");
    },
    show,
    drawResult,
    drawReading() {
      const shownEntry = entryOf(current);
      for (const { entry, instance } of instances())
        instance.drawReading(entry === shownEntry);
    },
    focusShown,
    focusIfLost,
    current: () => current,
    dispose() {
      disposed = true;
      for (const { instance } of instances()) instance.dispose();
      living.clear();
    },
  };
}
