/**
 * The chronicle memory of a manual map run (D-338, D-339, D-346, D-147; task kronika-z-filtrami,
 * To do 1–9; spec D2, D6, D7): the entries in the memory of the page, never in the game state or the
 * save, the place of the paragraph of the last encounter, whether the last start of an activity
 * recorded was a wait, the tab and the filter picked, the number of the map run, and a number that
 * changes at every change of these, which a screen compares to draw nothing again where nothing
 * changed. The game view creates it from the game state it is built from and records into it every
 * result, with the state before it and, for an act on the copy, what the act was. It holds no React
 * and no DOM; nothing runs when the module is imported.
 */
import type { GameResult } from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import {
  actEntries,
  eventEntry,
  type ChronicleEntry,
  type ChronicleKind,
  type CopyAct,
} from "./chronicle-entries.js";

/** The tab picked in the right area of the screen of a map run: „Kronika” or „Teren” (D-346). */
export type ChronicleTab = "chronicle" | "terrain";

/** The filter picked: „Wszystko”, or one kind of entry (D-343). */
export type ChronicleFilter = "all" | ChronicleKind;

/**
 * Where the paragraph of the last encounter stands: before the entry recorded `seq`-th, counted from
 * zero in the whole order, and after every earlier one, at the game minute of the attack (D-147).
 */
export type ParagraphPlace = { readonly seq: number; readonly minute: number };

/**
 * A row of a window: an entry, with a key that stays the entry's through the map run, or the place
 * of the paragraph of the last encounter, which the screen composes from the game state it draws.
 */
export type ChronicleRow =
  | { kind: "entry"; key: number; entry: ChronicleEntry }
  | { kind: "paragraph"; minute: number };

/** The rows of a window, newest first, and whether older rows of the filter stand beyond it. */
export type ChronicleWindow = { rows: ChronicleRow[]; more: boolean };

/** What the screen compares and reads at each draw; the same object while the number stays. */
export type ChronicleSnapshot = {
  readonly version: number;
  /** How many map runs the memory has seen start, by a send or by „Restart”; a load counts none. */
  readonly runNumber: number;
  readonly tab: ChronicleTab;
  readonly filter: ChronicleFilter;
  readonly paragraph: ParagraphPlace | null;
};

/** The chronicle memory. */
export type Chronicle = {
  /**
   * Records a result the game takes, with the game state before it and, for an act of the player on
   * the copy, what the act was; the act's entries come before those of the result's events.
   */
  record(result: GameResult, before: GameState, act?: CopyAct): void;
  /** The player picks a tab. */
  pickTab(tab: ChronicleTab): void;
  /** The player picks a filter. */
  pickFilter(filter: ChronicleFilter): void;
  snapshot: () => ChronicleSnapshot;
  /**
   * Calls `listener` after each change of the chronicle, the tab or the filter — once for a result
   * recorded, however many entries it gave — and returns the way to stop; the screen reads the
   * memory with it as an external store, which takes `subscribe` and `snapshot` as functions
   * apart from the memory.
   */
  subscribe: (listener: () => void) => () => void;
  /**
   * The rows of the filter's `size` newest entries, newest first; for „Wszystko” with the paragraph
   * at its place where the window reaches it, and for „Walka” the paragraph alone.
   */
  window(filter: ChronicleFilter, size: number): ChronicleWindow;
};

const KINDS: readonly ChronicleKind[] = [
  "action",
  "discovery",
  "combat",
  "change",
  "streak",
  "world",
];

/** For each kind, the places of its entries in the whole order. */
type KindIndex = Record<ChronicleKind, number[]>;

function emptyIndex(): KindIndex {
  return Object.fromEntries(
    KINDS.map((kind) => [kind, []]),
  ) as unknown as KindIndex;
}

/**
 * The chronicle of the game state the game view is built from: no entry; after a load of a map run
 * whose last encounter the state holds, the paragraph of that encounter as its first place, at the
 * game minute of the attack (D-339); the wait marked where the map run's current activity is a wait,
 * so a wait that goes on gives no second entry; „Kronika” and „Wszystko” picked.
 *
 * Recording follows the events of each result in order: a map run ended — by „Zakończ”, or by
 * „Restart” before its new start — clears the entries, the paragraph and the wait; a map run started
 * clears them too, counts one more map run in the snapshot and, with no map run ended in the same
 * result, as at a send, picks „Kronika” and „Wszystko” again, while „Restart” keeps the tab and the
 * filter (D-343, D-346). The start of a wait gives its entry only where the last start recorded was
 * not a wait; an attack moves the paragraph to the end of the order at its minute and ends the wait;
 * every other event gives the entry `eventEntry` gives it, or none.
 */
export function createChronicle(state: GameState): Chronicle {
  let entries: ChronicleEntry[] = [];
  let byKind = emptyIndex();
  const combat = state.run?.lastCombat ?? null;
  let paragraph: ParagraphPlace | null = combat
    ? { seq: 0, minute: combat.attackMinute }
    : null;
  let waiting = state.run?.current?.activity.kind === "wait";
  let tab: ChronicleTab = "chronicle";
  let filter: ChronicleFilter = "all";
  let version = 0;
  let runNumber = 0;
  let snapshot: ChronicleSnapshot | null = null;
  const listeners = new Set<() => void>();

  function notify(): void {
    for (const listener of [...listeners]) listener();
  }

  function changed(): void {
    version += 1;
    snapshot = null;
  }

  function add(entry: ChronicleEntry): void {
    byKind[entry.kind].push(entries.length);
    entries.push(entry);
    changed();
  }

  function clear(): void {
    if (entries.length > 0 || paragraph !== null || waiting) changed();
    entries = [];
    byKind = emptyIndex();
    paragraph = null;
    waiting = false;
  }

  function pick(nextTab: ChronicleTab, nextFilter: ChronicleFilter): void {
    if (nextTab === tab && nextFilter === filter) return;
    tab = nextTab;
    filter = nextFilter;
    changed();
  }

  /** A pick the player makes: the listeners hear of it where it changed anything. */
  function picked(nextTab: ChronicleTab, nextFilter: ChronicleFilter): void {
    const from = version;
    pick(nextTab, nextFilter);
    if (version !== from) notify();
  }

  function record(result: GameResult, before: GameState, act?: CopyAct) {
    const from = version;
    if (act)
      for (const entry of actEntries(act, before, result.state)) add(entry);
    let ended = false;
    for (const event of result.events) {
      switch (event.kind) {
        case "mapRunEnded":
          ended = true;
          clear();
          break;
        case "mapRunStarted":
          clear();
          runNumber += 1;
          changed();
          if (!ended) pick("chronicle", "all");
          break;
        case "attacked":
          paragraph = { seq: entries.length, minute: event.minute };
          waiting = false;
          changed();
          break;
        case "activityStarted": {
          const wait = event.activity.kind === "wait";
          if (!(wait && waiting)) add(eventEntry(event, result.state)!);
          waiting = wait;
          break;
        }
        default: {
          const entry = eventEntry(event, result.state);
          if (entry) add(entry);
        }
      }
    }
    if (version !== from) notify();
  }

  function window(shown: ChronicleFilter, size: number): ChronicleWindow {
    if (shown === "combat")
      return {
        rows: paragraph
          ? [{ kind: "paragraph", minute: paragraph.minute }]
          : [],
        more: false,
      };
    // Only the window is read, never the whole chronicle: in the whole order an entry's place is its
    // index, in a kind's order its index points into the whole order.
    const kind = shown === "all" ? null : byKind[shown];
    const count = kind ? kind.length : entries.length;
    const from = Math.max(0, count - Math.max(0, size));
    const at = kind ? null : paragraph;
    const rows: ChronicleRow[] = [];
    for (let i = count - 1; i >= from; i -= 1) {
      if (at && at.seq === i + 1)
        rows.push({ kind: "paragraph", minute: at.minute });
      const seq = kind ? kind[i] : i;
      rows.push({ kind: "entry", key: seq, entry: entries[seq] });
    }
    if (at && at.seq === from)
      rows.push({ kind: "paragraph", minute: at.minute });
    return { rows, more: from > 0 };
  }

  return {
    record,
    pickTab: (next) => picked(next, filter),
    pickFilter: (next) => picked(tab, next),
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    snapshot() {
      snapshot ??= { version, runNumber, tab, filter, paragraph };
      return snapshot;
    },
    window,
  };
}
