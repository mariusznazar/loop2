// Differential driver: drives the game view through scripted scenarios on jsdom and writes a trace
// (DOM after each step, focus moves, address writes, places told, save requests, reads of the two
// clocks). Run once per build of the view (DIST) and compare the traces.
import { pathToFileURL } from "node:url";
import { writeFileSync } from "node:fs";

const DIST = process.env.DIST;
const OUT = process.env.OUT;
const imp = (path) => import(pathToFileURL(`${DIST}/browser/${path}`).href);
const PD = await import(pathToFileURL(process.env.PD).href);
const { withPage, inAct, settle, typeInto } = PD;
const { mock } = await import("node:test");
const game = await imp("sim/game.js");
const progs = await imp("sim/programs.js");
const loop = await imp("sim/loop.js");
const { createGameView } = await imp("view/game-view.js");

const CLOCK_MS = 1_760_000_000_000;
const log = [];

const withEdgeSolved = (state) => ({
  ...state,
  solvedMaps: ["forestEdge", ...state.solvedMaps],
});
const twoPrograms = () =>
  progs.createProgram(
    game.createCharacter(
      game.createCharacter(withEdgeSolved(game.newGame()), "Ala").state,
      "Bela",
    ).state,
  ).state;
const SENT = { mapId: "forest", characterId: 1, programId: 1 };
const going = () => game.send(twoPrograms(), SENT, 0).state;
function renamed(state) {
  const program = structuredClone(state.run.copy.program);
  program.groups[0].name = "Zmieniony";
  return game.setProgram(state, program).state;
}
function dead(start) {
  let state = start;
  for (let round = 0; round < 50 && !game.mapRunEnded(state.run); round += 1)
    state = game.advanceMinutes(
      game.setPaused(state, false).state,
      5000,
    ).state;
  return game.settleDeath(state, CLOCK_MS).state;
}

function describe(element) {
  if (!element) return String(element);
  const text = (element.textContent ?? "").slice(0, 24).replace(/\s+/g, " ");
  return `${element.localName}.${element.className}|${text}`;
}

function shown(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    if (node === globalThis.document.body) return true;
  }
  return false;
}

async function onPage(name, state, hash, options, body) {
  await withPage(async ({ root, document }) => {
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    let dateReads = 0;
    let perfReads = 0;
    const date = mock.method(Date, "now", () => {
      dateReads += 1;
      return CLOCK_MS;
    });
    const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
    let now = 0;
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: {
        now: () => {
          perfReads += 1;
          return now;
        },
        measure: () => undefined,
        clearMeasures: () => undefined,
      },
    });
    const saves = [];
    const places = [];
    const entries = [hash];
    const listeners = new Set();
    const address = {
      entries,
      index: 0,
      hash: () => entries[address.index],
      go(next) {
        log.push(`address.go ${next}`);
        entries.splice(address.index + 1);
        entries.push(next);
        address.index += 1;
      },
      replace(next) {
        log.push(`address.replace ${next}`);
        entries[address.index] = next;
      },
      reload() {
        log.push("address.reload");
      },
      onChange(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      follow(next) {
        entries.splice(address.index + 1);
        entries.push(next);
        address.index += 1;
        for (const listener of listeners) listener();
      },
    };
    document.addEventListener("focusin", (event) =>
      log.push(`focusin ${describe(event.target)}`),
    );
    log.push(`===== scenario ${name}`);
    try {
      const view = await inAct(() =>
        createGameView({
          client: {
            saveGame(submission) {
              saves.push(submission.game.run?.minute ?? "none");
              log.push(`saveGame run.minute=${saves.at(-1)}`);
              return new Promise(() => undefined);
            },
            async loadPreviousSavedGame() {
              log.push("loadPreviousSavedGame");
              return { ok: true, value: null };
            },
          },
          state,
          revision: 1,
          address,
          entry: "address",
          onScreen: (place) => {
            places.push(place);
            log.push(
              `onScreen ${place.screen.kind} ${JSON.stringify(place.returnEntry)}`,
            );
          },
          onConflict: () => log.push("onConflict"),
          onOutdated: () => {},
          onSignedOut: () => log.push("onSignedOut"),
          ...options,
        }),
      );
      document.body.append(view.element);
      const record = async (label) => {
        await settle();
        log.push(`## ${label}`);
        log.push(
          `reads date=${dateReads} perf=${perfReads} saves=${saves.length}; active=${describe(document.activeElement)}`,
        );
        log.push(root.innerHTML);
      };
      const click = async (text) => {
        const button = [...document.querySelectorAll("button")].find(
          (candidate) => candidate.textContent === text && shown(candidate),
        );
        if (!button) {
          log.push(`!! no button ${text}`);
          return;
        }
        await inAct(() =>
          button.dispatchEvent(
            new window.Event("click", { bubbles: true, cancelable: true }),
          ),
        );
      };
      const tick = async (ms = 0) => {
        now += ms;
        await inAct(() => mock.timers.tick(200));
      };
      const follow = (next) => inAct(() => address.follow(next));
      await record("built");
      await body({ view, click, tick, follow, record, root, document, address });
      await inAct(() => view.dispose());
      await record("disposed");
    } finally {
      Object.defineProperty(globalThis, "performance", saved);
      mock.timers.reset();
      date.mock.restore();
    }
  });
}

const RUN = "#/postac/1/przejscie";

await onPage("question flow", renamed(going()), RUN, {}, async (c) => {
  await c.tick(3000);
  await c.record("after 3s");
  await c.click("Zakończ");
  await c.record("question");
  await c.click("Wróć");
  await c.record("back");
  await c.click("Pauza");
  await c.record("pause");
  await c.click("Zakończ");
  await c.click("Wznów");
  await c.record("resume closes question");
  await c.tick(2000);
  await c.click("4×");
  await c.record("pace");
  await c.click("Zakończ");
  await c.click("Zapisz");
  await c.record("saved and ended -> character");
  await c.follow("#/mapy");
  await c.record("maps");
  await c.follow("#/mapy/forest");
  await c.record("map forest");
  await c.click("Wejdź");
  await c.record("sent");
  await c.tick(4000);
  await c.tick(1000);
  await c.follow("#/");
  await c.record("left to headquarters (pause)");
  await c.follow("#/programy");
  await c.record("programs");
  await c.click("Nowy program");
  await c.record("new program");
  await c.follow(RUN);
  await c.record("back on the run");
  await c.click("Wznów");
  await c.tick(3000);
  await c.click("Restart");
  await c.record("restart");
  await c.click("Zakończ");
  await c.record("end with unsaved? ");
});

await onPage("death and window", dead(going()), RUN, {}, async (c) => {
  await c.tick(1000);
  await c.record("window open");
  await c.click("✕");
  await c.record("closed");
  await c.click("Koniec przejścia");
  await c.record("reopened");
  await c.follow("#/");
  await c.record("left");
  await c.follow(RUN);
  await c.record("window again");
  await c.click("Restart");
  await c.record("restart from window");
  await c.tick(2000);
});

await onPage("window with unsaved", renamed(dead(going())), RUN, {}, async (c) => {
  await c.tick(1000);
  await c.record("window open");
  await c.click("Zakończ");
  await c.record("question over window");
  await c.click("Wróć");
  await c.record("back, window stays closed");
  await c.click("Koniec przejścia");
  await c.record("reopened");
  await c.click("Zakończ");
  await c.click("Odrzuć");
  await c.record("discarded -> character");
  await c.tick(1000);
});

await onPage("open map from window", renamed(dead(going())), RUN, {}, async (c) => {
  await c.tick(1000);
  const open = [...c.document.querySelectorAll("button")].find((b) =>
    b.textContent.startsWith("Otwarte"),
  );
  log.push(`open button ${open ? open.textContent : "none"}`);
  if (open) {
    await inAct(() =>
      open.dispatchEvent(new window.Event("click", { bubbles: true })),
    );
    await c.record("asked");
    await c.click("Odrzuć");
    await c.record("discard -> map");
  }
});

await onPage(
  "privileged programs",
  twoPrograms(),
  "#/programy",
  { previousSaveAllowed: true, onReset: () => log.push("onReset") },
  async (c) => {
    await c.tick(1000);
    await c.record("programs privileged");
    await c.click("Zacznij od zera");
    await c.record("ask reset");
    await c.click("Wróć");
    await c.click("Zacznij od zera");
    await c.click("Tak, zacznij od zera");
    await c.record("confirmed");
    await inAct(() => c.view.setReset({ waiting: false, sentence: "Nie udało się." }));
    await c.record("reset failed");
    await c.follow("#/");
    await c.follow("#/programy");
    await c.record("programs again");
    await c.click("Usuń");
    await c.record("deleted");
  },
);

await onPage("halt", renamed(going()), RUN, {}, async (c) => {
  await c.tick(2000);
  await c.click("Zakończ");
  await c.record("question");
  await inAct(() => c.view.halt());
  await c.tick(5000);
  await c.click("Wróć");
  await c.click("Zapisz");
  await c.click("Pauza");
  await c.click("Wznów");
  await c.click("4×");
  await c.record("after halt");
  const kept = c.view.keep();
  log.push(`kept minute ${kept.document.game.run?.minute}`);
  await c.follow("#/");
  await c.record("navigation after halt");
  await c.follow(RUN);
  await c.record("back after halt");
});

await onPage("maps acts", { ...twoPrograms(), solvedMaps: ["forest", "forestEdge"] }, "#/mapy/forest", {}, async (c) => {
  await c.tick(1000);
  await c.record("map card");
  await c.click("Puść w pętlę");
  await c.record("loop started");
  await c.tick(3000);
  await c.follow("#/");
  await c.click("Zatrzymaj");
  await c.record("stopped loop on Siedziba");
  await c.follow("#/mapy/forest");
  await c.click("Wejdź");
  await c.record("sent from maps");
});

await onPage("loop and catch-up", loopState(), "#/", {}, async (c) => {
  await c.tick(1000);
  await c.record("headquarters with loop");
  await c.click("Zatrzymaj");
  await c.record("stopped loop");
  await c.follow("#/postac/2");
  await c.click("Kup");
  await c.record("buy");
  await c.follow("#/postac/2");
  await c.record("character 2");
  await c.tick(1000);
});

function loopState() {
  const made = twoPrograms();
  const started = loop.startLoop(
    { ...made, solvedMaps: ["forest", ...made.solvedMaps] },
    { mapId: "forest", characterId: 2 },
    5,
  ).state;
  return started;
}

writeFileSync(OUT, log.join("\n"), "utf8");
console.log("lines", log.length);
process.exit(0);
