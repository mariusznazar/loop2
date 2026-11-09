// The question „Zapisać, odrzucić, wrócić?” of „Zakończ” (task pytanie-przy-zakoncz, To do 1 to 7;
// D-173, D-172, D-171, D-168, D-122, D-283, D-284, D-212, D-44, D-323) on jsdom through
// tests/view/page-document.mjs (D-264). The component is drawn alone first; then the game view is
// built as the page builds it, and „Zakończ” and what follows it are driven through the buttons the
// player presses, the game state read back from the document the view keeps (`keep`). Real events,
// the look and the focus ring are checked in the browser (D-88). Every comparison is of plain data
// or of a handful of words (D-268).
import { assert, inAct, settle, typeInto, withPage } from "./page-document.mjs";
import { mock, test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  advanceMinutes,
  createCharacter,
  mapRunEnded,
  newGame,
  send,
  setPaused,
  setProgram,
  settleDeath,
} from "../../dist/browser/sim/game.js";
import {
  createProgram,
  deleteProgram,
  editProgram,
} from "../../dist/browser/sim/programs.js";
import { loadSavedGame } from "../../dist/browser/sim/saved-game.js";
import { EndQuestion } from "../../dist/browser/view/end-question.js";
import { programFromRules } from "../sim/program-fixture.mjs";

// --- the page on jsdom --------------------------------------------------------------------------

/** The real date the page's clock reads. */
const CLOCK_MS = 1_760_000_000_000;
const RUN_ADDRESS = "#/postac/1/przejscie";

/** A stand-in for `performance` that a case moves by hand (the page's React measures through it). */
const handClock = (now) => ({
  now,
  measure: () => undefined,
  clearMeasures: () => undefined,
});

/**
 * Runs `body` on a window of its own with Node's mocked timers, the real date at `CLOCK_MS` and a
 * clock of real milliseconds the case moves with `pass(ms)`: the next reading of the game's clock,
 * which `reading()` makes, sees them. Without `pass` no real time elapses, so a map run that goes on
 * passes no game minute.
 */
async function onPage(body) {
  await withPage(async ({ root }) => {
    mock.timers.enable({ apis: ["setInterval", "setTimeout"] });
    const date = mock.method(Date, "now", () => CLOCK_MS);
    const saved = Object.getOwnPropertyDescriptor(globalThis, "performance");
    let now = 0;
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: handClock(() => now),
    });
    try {
      await body({
        root,
        pass: (ms) => {
          now += ms;
        },
        reading: () => inAct(() => mock.timers.tick(200)),
      });
    } finally {
      Object.defineProperty(globalThis, "performance", saved);
      mock.timers.reset();
      date.mock.restore();
    }
  });
}

const all = (root) => [root, ...root.querySelectorAll("*")];
const byClass = (root, name) =>
  all(root).filter((element) => element.classList.contains(name));
const pageDocument = () => globalThis.document;

/** Whether an element and every ancestor up to the page's body are shown. */
function shown(element) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden) return false;
    if (node === pageDocument().body) return true;
  }
  return false;
}

const buttonIn = (root, text) =>
  all(root).find(
    (element) => element.localName === "button" && element.textContent === text,
  );

function fire(target, type) {
  const { Event } = globalThis.window;
  target.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
}

/** Clicks `target` inside act. */
function press(target) {
  assert.ok(target, "what the case presses stands");
  return inAct(() => fire(target, "click"));
}

/** The address of the page with a history of its own, as the page's tests build it. */
function fakeAddress(hash) {
  const listeners = new Set();
  const address = {
    entries: [hash],
    index: 0,
    reloaded: 0,
    hash: () => address.entries[address.index],
    go(next) {
      address.entries.splice(address.index + 1);
      address.entries.push(next);
      address.index += 1;
    },
    replace(next) {
      address.entries[address.index] = next;
    },
    reload() {
      address.reloaded += 1;
    },
    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    follow(next) {
      address.go(next);
      for (const listener of listeners) listener();
    },
  };
  return address;
}

/** The game of `state` built in the page as a reload at `hash` builds it; saves are never answered. */
async function viewOf(state, hash = RUN_ADDRESS) {
  const { createGameView } =
    await import("../../dist/browser/view/game-view.js");
  const address = fakeAddress(hash);
  const view = await inAct(() =>
    createGameView({
      client: { saveGame: () => new Promise(() => undefined) },
      state,
      revision: 1,
      address,
      entry: "address",
      onScreen: () => {},
      onConflict: () => {},
      onOutdated: () => {},
      onSignedOut: () => {},
    }),
  );
  pageDocument().body.append(view.element);
  return { view, address };
}

/** The game state the view holds now, read from the document it keeps. */
const heldState = (view) => inAct(() => view.keep().document.game);

const runScreenOf = (root) => byClass(root, "run-screen")[0];
const questionOf = (root) =>
  byClass(runScreenOf(root), "end-question").find(shown);
const answersOf = (question) =>
  all(question)
    .filter((element) => element.localName === "button")
    .map((button) => button.textContent);
const answer = (root, text) => buttonIn(questionOf(root), text);
const headerButton = (root, text) =>
  buttonIn(byClass(runScreenOf(root), "run-header")[0], text);
const clockOf = (root) =>
  byClass(runScreenOf(root), "run-header-clock")[0].textContent;
const noteOf = (root) => byClass(questionOf(root), "end-question-note")[0];

function shownScreen(root) {
  const shows = (name) => {
    const element = byClass(root, name)[0];
    return element !== undefined && shown(element);
  };
  if (shows("character-screen")) return "character";
  if (shows("run-screen")) return "run";
  if (shows("headquarters")) return "headquarters";
  if (shows("programs-screen")) return "programs";
  return null;
}

// --- the states ---------------------------------------------------------------------------------

const SENT = { mapId: "forest", characterId: 1, programId: 1 };
/** Ala with „Program” and „Program 2” on the list. */
const twoPrograms = () =>
  createProgram(createCharacter(newGame(), "Ala").state).state;
/** Ala's map run of the forest under program 1, going on, the copy the program as it stands. */
const going = () => send(twoPrograms(), SENT, 0).state;
const paused = () => setPaused(going(), true).state;
/** The copy's group renamed „Zmieniony”: a change of the copy alone, so the copy holds unsaved changes. */
const renamed = (state) => {
  const program = structuredClone(state.run.copy.program);
  program.groups[0].name = "Zmieniony";
  return setProgram(state, program).state;
};
/** The map run of the first discovery (minute 84 of a seed whose first chill is there), paused at it. */
const atDiscovery = () => {
  const start = send(twoPrograms(), SENT, 1760000000003).state;
  const state = advanceMinutes(start, 100).state;
  assert.equal(state.run.minute, 84, "precondition: stopped at the discovery");
  assert.notEqual(state.discovery, null, "precondition: a discovery stands");
  return state;
};
/** The map run of `start` ended in Ala's death, the pauses of discoveries lifted, the death settled. */
function dead(start) {
  let state = start;
  for (let round = 0; round < 50 && !mapRunEnded(state.run); round += 1)
    state = advanceMinutes(setPaused(state, false).state, 5000).state;
  assert.ok(state.run.death, "precondition: the map run ended in a death");
  return settleDeath(state, CLOCK_MS).state;
}
/** The map run of `state` ended in a completion in its game minute 480. */
const completed = (state) => ({
  ...state,
  paused: false,
  run: { ...state.run, minute: 480, completion: { minute: 480 } },
});

// --- the component ------------------------------------------------------------------------------

/** Draws the question of `state` and returns its element with the acts it was asked for. */
async function drawn(state) {
  const asked = [];
  const host = pageDocument().createElement("div");
  pageDocument().body.append(host);
  const root = createRoot(host);
  await inAct(() =>
    root.render(
      createElement(EndQuestion, {
        state,
        controls: {
          saveAndEnd: () => asked.push("saveAndEnd"),
          discardAndEnd: () => asked.push("discardAndEnd"),
          back: () => asked.push("back"),
        },
      }),
    ),
  );
  return { host, asked, unmount: () => inAct(() => root.unmount()) };
}

// Catches the sentence worded otherwise, the answers in another order, „Odrzuć” drawn as a plain
// button (D-44: it loses the copy's changes) or „Zapisz” and „Wróć” drawn as destructive, and an
// answer wired to the act of another.
test("the question reads „Zapisać, odrzucić, wrócić?” and offers „Zapisz”, „Odrzuć” and „Wróć” in that order, only „Odrzuć” a destructive button, each asking its own act", async () => {
  await withPage(async () => {
    const view = await drawn(renamed(paused()));
    const sentence = byClass(view.host, "end-question-text")[0];
    assert.equal(sentence.textContent, "Zapisać, odrzucić, wrócić?");
    assert.deepEqual(answersOf(view.host), ["Zapisz", "Odrzuć", "Wróć"]);
    const kinds = Object.fromEntries(
      all(view.host)
        .filter((element) => element.localName === "button")
        .map((button) => [
          button.textContent,
          button.classList.contains("destructive"),
        ]),
    );
    assert.deepEqual(kinds, { Zapisz: false, Odrzuć: true, Wróć: false });
    for (const text of ["Wróć", "Zapisz", "Odrzuć"])
      await press(buttonIn(view.host, text));
    assert.deepEqual(view.asked, ["back", "saveAndEnd", "discardAndEnd"]);
    await view.unmount();
  });
});

// D-172 and row 3. Catches the line standing where the program holds nothing the copy lacks,
// standing where the copy's program is gone, naming a program other than the copy's, or missing
// where the program holds such changes.
test("the line of D-172 stands under the sentence only while the copy's program is on the list and holds changes the copy lacks", async () => {
  await withPage(async () => {
    const plain = await drawn(renamed(paused()));
    assert.equal(byClass(plain.host, "end-question-note").length, 0);
    await plain.unmount();

    const lacking = editProgram(
      renamed(paused()),
      1,
      programFromRules({
        condition: { kind: "always" },
        action: { kind: "explore" },
      }),
    ).state;
    const lacks = await drawn(lacking);
    const [note] = byClass(lacks.host, "end-question-note");
    assert.equal(
      note.textContent,
      "Program Program ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.",
    );
    const row = byClass(lacks.host, "end-question-row")[0];
    assert.ok(
      row.compareDocumentPosition(note) & 4,
      "the line stands under the sentence and its answers",
    );
    await lacks.unmount();

    const gone = await drawn(deleteProgram(renamed(paused()), 1).state);
    assert.equal(byClass(gone.host, "end-question-note").length, 0);
    await gone.unmount();

    const second = renamed(
      send(twoPrograms(), { ...SENT, programId: 2 }, 0).state,
    );
    const named = await drawn(
      editProgram(
        second,
        2,
        programFromRules({
          condition: { kind: "always" },
          action: { kind: "explore" },
        }),
      ).state,
    );
    assert.match(
      byClass(named.host, "end-question-note")[0].textContent,
      /^Program Program 2 ma zmiany/,
    );
    await named.unmount();
  });
});

// --- „Zakończ” ----------------------------------------------------------------------------------

// To do 1, rows 4 and 7 of the settlements. Catches „Zakończ” ending the map run at once whatever
// the copy holds, the question missing at one moment of the map run (going on, paused, paused at a
// discovery, after a death, after a completion), a map run that goes on while the question stands,
// and a navigation to Postać before the answer.
test("„Zakończ” with unsaved changes asks at every moment of the map run, leaves the map run where it is and stops the one that goes on", async () => {
  const moments = [
    ["going on", () => renamed(going()), true],
    ["paused", () => renamed(paused()), true],
    ["paused at a discovery", () => renamed(atDiscovery()), true],
    ["after a death", () => renamed(dead(going())), false],
    ["after a completion", () => renamed(completed(paused())), false],
  ];
  for (const [name, start, pausedAfter] of moments) {
    await onPage(async ({ root, pass, reading }) => {
      const { view, address } = await viewOf(start());
      const before = await heldState(view);
      assert.equal(
        questionOf(root),
        undefined,
        `${name}: no question before „Zakończ”`,
      );
      await press(headerButton(root, "Zakończ"));
      assert.deepEqual(
        answersOf(questionOf(root)),
        ["Zapisz", "Odrzuć", "Wróć"],
        name,
      );
      assert.equal(shownScreen(root), "run", name);
      assert.deepEqual(address.entries, [RUN_ADDRESS], `${name}: no new entry`);
      const after = await heldState(view);
      assert.notEqual(after.run, null, `${name}: the map run stands`);
      assert.equal(after.run.minute, before.run.minute, name);
      assert.equal(after.paused, pausedAfter, name);
      // Real time passes and the game's clock reads it: a map run held by the question stands still.
      pass(7_000);
      await reading();
      assert.equal((await heldState(view)).run.minute, before.run.minute, name);
      await inAct(() => view.dispose());
    });
  }
});

// To do 2 and the second clause of D-173. Catches a question asked where the copy holds nothing
// to lose, and „Zakończ” that no longer leads to Postać.
test("„Zakończ” without unsaved changes ends the map run at once and opens Postać of its character", async () => {
  await onPage(async ({ root }) => {
    const { view, address } = await viewOf(going());
    await press(headerButton(root, "Zakończ"));
    assert.equal(questionOf(root), undefined);
    assert.equal((await heldState(view)).run, null);
    assert.equal(shownScreen(root), "character");
    assert.deepEqual(address.entries, [RUN_ADDRESS, "#/postac/1"]);
    await inAct(() => view.dispose());
  });
});

// --- the three answers --------------------------------------------------------------------------

/** Ala's program 1 as the copy of `renamed` holds it, written out. */
const RENAMED_PROGRAM = {
  groups: [
    { id: 1, name: "Zmieniony", condition: { kind: "always" }, rules: [] },
  ],
  tripPlan: { take: [], bring: [] },
  nextGroupId: 2,
  nextRuleId: 1,
};

// To do 3, rows 1 and 3 and D-172. Catches „Zapisz” that leaves the map run standing, saves into
// no program or into another one, leaves the changes of the program the copy lacks in place of
// the copy's, or does not lead to Postać; and the editor after it showing another program.
test("„Zapisz” saves the copy into its program, replacing what the program had since, ends the map run and leads to Postać, and Programy then shows that program", async () => {
  await onPage(async ({ root }) => {
    // The program was edited since the copy was taken from it: the line stands, the save replaces.
    const lacking = editProgram(
      renamed(going()),
      1,
      programFromRules({
        condition: { kind: "always" },
        action: { kind: "explore" },
      }),
    ).state;
    const { view, address } = await viewOf(lacking);
    await press(headerButton(root, "Zakończ"));
    assert.equal(
      noteOf(root).textContent,
      "Program Program ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.",
    );
    await press(answer(root, "Zapisz"));
    const saved = await heldState(view);
    assert.equal(saved.run, null, "the map run ended");
    assert.deepEqual(saved.programs[0].program, RENAMED_PROGRAM);
    assert.equal(saved.programs.length, 2, "no program added");
    assert.deepEqual(
      saved.programs[1],
      lacking.programs[1],
      "program 2 as it was",
    );
    assert.equal(shownScreen(root), "character");
    assert.deepEqual(address.entries, [RUN_ADDRESS, "#/postac/1"]);
    await inAct(() => address.follow("#/programy"));
    const current = byClass(root, "program-list-item").find(
      (item) => item.getAttribute("aria-current") === "page",
    );
    assert.equal(current.textContent, "Program");
    await inAct(() => view.dispose());
  });
});

// To do 3 last clause, row 2, D-171, D-168. Catches a name field opened by „Zapisz”, a name other
// than the first free one, a copy left belonging to the deleted program, the new program not the
// one the character used last, and the editor after the end not showing the new program.
test("„Zapisz” of a copy whose program was deleted saves it as a new program under the first free name with no name field, ends the map run, and Programy shows the new program", async () => {
  await onPage(async ({ root }) => {
    const start = deleteProgram(
      renamed(send(twoPrograms(), { ...SENT, programId: 2 }, 0).state),
      2,
    ).state;
    const { view, address } = await viewOf(start);
    await press(headerButton(root, "Zakończ"));
    assert.equal(byClass(root, "end-question-note").length, 0);
    await press(answer(root, "Zapisz"));
    assert.equal(
      byClass(root, "program-name").filter(shown).length,
      0,
      "no name field",
    );
    const saved = await heldState(view);
    assert.equal(saved.run, null);
    assert.deepEqual(
      saved.programs.map((program) => [program.id, program.name]),
      [
        [1, "Program"],
        [3, "Program 2"],
      ],
    );
    assert.deepEqual(saved.programs[1].program, RENAMED_PROGRAM);
    assert.equal(saved.lastUsedPrograms[1], 3);
    assert.equal(shownScreen(root), "character");
    await inAct(() => address.follow("#/programy"));
    const current = byClass(root, "program-list-item").find(
      (item) => item.getAttribute("aria-current") === "page",
    );
    assert.equal(
      current.textContent,
      "Program 2",
      "Programy shows the new one",
    );
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root }) => {
    // Program 2 is the first free name once it is deleted, but taken names are skipped.
    const base = deleteProgram(
      renamed(send(twoPrograms(), { ...SENT, programId: 2 }, 0).state),
      2,
    ).state;
    const start = {
      ...base,
      programs: [
        ...base.programs,
        { id: 7, name: "program 2", program: base.programs[0].program },
      ],
      nextProgramId: 8,
    };
    const { view } = await viewOf(start);
    await press(headerButton(root, "Zakończ"));
    await press(answer(root, "Zapisz"));
    assert.deepEqual(
      (await heldState(view)).programs.map((program) => program.name),
      ["Program", "program 2", "Program 3"],
    );
    await inAct(() => view.dispose());
  });
});

// To do 4, row 1. Catches „Odrzuć” that saves, that keeps the map run, that changes the program, or
// that does not lead to Postać.
test("„Odrzuć” ends the map run with no save, the program as it was, and leads to Postać", async () => {
  await onPage(async ({ root }) => {
    const start = renamed(paused());
    const { view, address } = await viewOf(start);
    await press(headerButton(root, "Zakończ"));
    await press(answer(root, "Odrzuć"));
    const left = await heldState(view);
    assert.equal(left.run, null);
    assert.deepEqual(left.programs, start.programs, "programs untouched");
    assert.equal(shownScreen(root), "character");
    assert.deepEqual(address.entries, [RUN_ADDRESS, "#/postac/1"]);
    assert.equal(questionOf(root), undefined);
    await inAct(() => view.dispose());
  });
});

// To do 5, row 5. Catches „Wróć” that leaves the map run paused, that sets going a map run that
// was paused before the question, that leaves the question standing, or that drops the copy's
// changes or the map run's minute.
test("„Wróć” closes the question and puts the map run back as it was: one that went on goes on, one that was paused stays paused", async () => {
  await onPage(async ({ root, pass, reading }) => {
    const { view } = await viewOf(renamed(going()));
    await press(headerButton(root, "Zakończ"));
    assert.match(clockOf(root), / \(pauza\)$/);
    await press(answer(root, "Wróć"));
    assert.equal(questionOf(root), undefined);
    assert.doesNotMatch(clockOf(root), / \(pauza\)$/);
    assert.ok(headerButton(root, "Pauza"), "„Pauza” stands again");
    assert.equal(shownScreen(root), "run");
    assert.deepEqual((await heldState(view)).run.copy.program, RENAMED_PROGRAM);
    assert.ok(
      pageDocument().activeElement === runScreenOf(root),
      "the focus went back to the screen",
    );
    pass(3_000);
    await reading();
    assert.equal((await heldState(view)).run.minute, 3, "it goes on");
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root, pass, reading }) => {
    const { view } = await viewOf(renamed(paused()));
    await press(headerButton(root, "Zakończ"));
    await press(answer(root, "Wróć"));
    assert.equal(questionOf(root), undefined);
    assert.match(clockOf(root), / \(pauza\)$/);
    assert.ok(headerButton(root, "Wznów"), "it waits for „Wznów”");
    pass(3_000);
    await reading();
    assert.equal((await heldState(view)).run.minute, 0, "it stays paused");
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(atDiscovery()));
    await press(headerButton(root, "Zakończ"));
    await press(answer(root, "Wróć"));
    assert.ok(
      (await heldState(view)).discovery !== null,
      "the stop at the discovery stays",
    );
    assert.equal(byClass(runScreenOf(root), "discovery-band").length, 1);
    await inAct(() => view.dispose());
  });
});

// --- while the question stands ------------------------------------------------------------------

// To do 6, row 6. Catches the question surviving the leaving of the screen, a map run that goes on
// on the return, and a question that comes back with the screen.
test("leaving the screen closes the question and the map run stays paused on the return, “Zakończ” asking again", async () => {
  await onPage(async ({ root, pass, reading }) => {
    const { view, address } = await viewOf(renamed(going()));
    await press(headerButton(root, "Zakończ"));
    await inAct(() => address.follow("#/"));
    assert.equal(shownScreen(root), "headquarters");
    assert.equal((await heldState(view)).paused, true, "the map run stands");
    await inAct(() => address.follow(RUN_ADDRESS));
    assert.equal(shownScreen(root), "run");
    assert.equal(questionOf(root), undefined);
    assert.match(clockOf(root), / \(pauza\)$/);
    pass(4_000);
    await reading();
    assert.equal((await heldState(view)).run.minute, 0);
    await press(headerButton(root, "Zakończ"));
    assert.ok(questionOf(root), "it asks again");
    await inAct(() => view.dispose());
  });
});

// To do 6 second clause, row 6, D-212. Catches the question written into the game state or the
// save, and a reload that brings it back or that resumes the map run.
test("the question lives in the page alone: a game built from the kept document stands with no question and the map run paused", async () => {
  await onPage(async ({ root }) => {
    const first = await viewOf(renamed(going()));
    await press(headerButton(root, "Zakończ"));
    const { document } = await inAct(() => first.view.keep());
    assert.doesNotMatch(JSON.stringify(document), /Zapisać|question|pytanie/i);
    await inAct(() => first.view.dispose());
    pageDocument().body.replaceChildren();
    const loaded = loadSavedGame(JSON.parse(JSON.stringify(document)));
    assert.equal(loaded.ok, true);
    const { view } = await viewOf(loaded.state);
    assert.equal(questionOf(root), undefined);
    assert.match(clockOf(root), / \(pauza\)$/);
    assert.ok(headerButton(root, "Wznów"));
    await inAct(() => view.dispose());
  });
});

// To do 6 third group, row 7. Catches „Wznów” of the header or of the band that leaves the question
// over a map run that goes on, „Restart” that keeps it over the restarted map run, and the pace
// buttons and a second „Zakończ” that close it or stack a second one.
test("„Wznów” of the header and of the band and „Restart” close the question and do their own act; the pace buttons and a second „Zakończ” leave it", async () => {
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(paused()));
    await press(headerButton(root, "Zakończ"));
    await press(headerButton(root, "4×"));
    await press(headerButton(root, "Zakończ"));
    assert.equal(
      byClass(runScreenOf(root), "end-question").length,
      1,
      "one question, as it stood",
    );
    assert.equal((await heldState(view)).pace, 4);
    assert.equal((await heldState(view)).paused, true);
    await press(headerButton(root, "Wznów"));
    assert.equal(questionOf(root), undefined);
    assert.equal((await heldState(view)).paused, false, "the map run goes on");
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(atDiscovery()));
    await press(headerButton(root, "Zakończ"));
    const band = byClass(runScreenOf(root), "discovery-band")[0];
    await press(buttonIn(band, "Wznów"));
    assert.equal(questionOf(root), undefined);
    assert.equal(byClass(runScreenOf(root), "discovery-band").length, 0);
    assert.equal((await heldState(view)).paused, false);
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root, pass, reading }) => {
    const { view } = await viewOf(renamed(going()));
    pass(5_000);
    await reading();
    assert.equal((await heldState(view)).run.minute, 5);
    await press(headerButton(root, "Zakończ"));
    await press(headerButton(root, "Restart"));
    assert.equal(questionOf(root), undefined);
    const restarted = await heldState(view);
    assert.equal(restarted.run.minute, 0, "the map run started again");
    assert.equal(restarted.paused, false);
    assert.deepEqual(restarted.run.copy.program, RENAMED_PROGRAM, "copy kept");
    await press(headerButton(root, "Zakończ"));
    assert.ok(questionOf(root), "the copy still holds unsaved changes");
    await inAct(() => view.dispose());
  });
});

/** The program panel of the screen of a map run. */
const panelOf = (root) => byClass(runScreenOf(root), "program-panel")[0];

// To do 6 last group, row 7, D-173 read as the task gives. Catches the panel's buttons inactive
// while the question stands, a question left standing over a copy that holds nothing to save, a
// map run that goes on when the question goes, and a „Zakończ” that still asks afterwards.
test("the buttons of the panel work while the question stands, and it goes when the copy holds no unsaved changes, leaving the map run paused", async () => {
  const closers = [
    [
      "„Zapisz w programie”",
      (root) => press(buttonIn(panelOf(root), "Zapisz w programie")),
    ],
    [
      "„Porzuć zmiany”",
      (root) => press(buttonIn(panelOf(root), "Porzuć zmiany")),
    ],
    [
      "„Zapisz jako nowy program”",
      async (root) => {
        await press(buttonIn(panelOf(root), "Zapisz jako nowy program"));
        const form = byClass(panelOf(root), "program-name")[0];
        await press(buttonIn(form, "Zapisz"));
      },
    ],
    [
      "„Przełącz postać na ten program”",
      async (root) => {
        const list = all(panelOf(root)).find(
          (element) =>
            element.localName === "select" &&
            element.getAttribute("aria-label") === "Program:",
        );
        list.value = "2";
        await inAct(() => fire(list, "change"));
        await press(buttonIn(panelOf(root), "Przełącz postać na ten program"));
      },
    ],
  ];
  for (const [name, close] of closers) {
    await onPage(async ({ root }) => {
      const { view } = await viewOf(renamed(going()));
      await press(headerButton(root, "Zakończ"));
      assert.ok(questionOf(root), `${name}: the question stands`);
      await close(root);
      assert.equal(questionOf(root), undefined, `${name}: the question went`);
      const held = await heldState(view);
      assert.notEqual(held.run, null, `${name}: the map run stands`);
      assert.equal(held.paused, true, `${name}: and stays paused`);
      assert.ok(headerButton(root, "Wznów"), `${name}: „Wznów” stands`);
      await press(headerButton(root, "Zakończ"));
      assert.equal(
        (await heldState(view)).run,
        null,
        `${name}: „Zakończ” ends at once`,
      );
      assert.equal(shownScreen(root), "character", name);
      await inAct(() => view.dispose());
    });
  }
});

/**
 * Types `text` into the name field of the rule panel of group 1, which stands in the program panel
 * under the header of the group, and leaves the field, as a player does.
 */
async function renameGroupTo(root, text) {
  const panel = panelOf(root);
  let input = panel.querySelector('input[aria-label="Nazwa grupy"]');
  if (input === null) {
    const header = panel.querySelector('[data-group="1"] .rule-list-header');
    await press(header);
    input = panel.querySelector('input[aria-label="Nazwa grupy"]');
  }
  await inAct(() => input.focus());
  await typeInto(input, text);
  await inAct(() => input.blur());
}

// To do 6 third bullet of the last group, row 7. Catches the question dropped by an edit after which
// the copy still differs from its program, and one kept by an edit after which it does not.
test("an edit of the copy leaves the question unless the copy then equals its program, when the question goes like after a save", async () => {
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(paused()));
    await press(headerButton(root, "Zakończ"));
    await renameGroupTo(root, "Inny");
    assert.equal(
      (await heldState(view)).run.copy.program.groups[0].name,
      "Inny",
    );
    assert.ok(questionOf(root), "still different from the program: it stands");
    await renameGroupTo(root, "Program");
    assert.equal(
      (await heldState(view)).run.copy.program.groups[0].name,
      "Program",
      "precondition: the copy is the program again",
    );
    assert.equal(questionOf(root), undefined);
    assert.equal(
      (await heldState(view)).paused,
      true,
      "the map run stays paused",
    );
    await inAct(() => view.dispose());
  });
});

/**
 * What stands in the program's area and in the program panel of the screen of a map run, as the
 * classes of the children of each, in the order they stand.
 */
function placeOf(root) {
  const area = byClass(runScreenOf(root), "run-program")[0];
  const panel = byClass(area, "program-panel")[0];
  const classes = (parent) =>
    [...parent.children].map((child) => child.className);
  return { area: classes(area), panel: classes(panel), panelElement: panel };
}

// Row 4 and row 8, D-122, D-173. Catches the question standing above the band of a discovery, above
// the list „Program:” and „Nowy program” (the program panel's first controls, which stay where
// they were), under the heading of the copy, or not under the band after a completion in the minute
// of a discovery, where the band has no „Wznów”: it stands in the panel, just above the heading of
// the copy „Kopia: …” and its line.
test("the question stands under the band of a discovery and directly above the heading of the copy, after the list „Program:” and „Nowy program”, also after a completion in the minute of a discovery", async () => {
  const order = [
    "program-list",
    "program-actions",
    "end-question",
    "copy-section",
    "program-editing",
  ];
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(atDiscovery()));
    await press(headerButton(root, "Zakończ"));
    const place = placeOf(root);
    assert.deepEqual(place.area, ["discovery-band", "run-program-place"]);
    assert.deepEqual(place.panel, order);
    const question = questionOf(root);
    const heading = byClass(place.panelElement, "copy-heading")[0];
    assert.equal(heading.textContent, "Kopia: Program");
    assert.ok(
      question.nextElementSibling.contains(heading),
      "the heading of the copy is the next thing under the question",
    );
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(completed(atDiscovery())));
    await press(headerButton(root, "Zakończ"));
    const place = placeOf(root);
    assert.deepEqual(place.area, ["discovery-band", "run-program-place"]);
    assert.deepEqual(place.panel, order);
    const band = byClass(runScreenOf(root), "discovery-band")[0];
    assert.equal(buttonIn(band, "Wznów"), undefined, "no „Wznów” in the band");
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(paused()));
    await press(headerButton(root, "Zakończ"));
    const place = placeOf(root);
    assert.deepEqual(place.area, ["run-program-place"]);
    assert.deepEqual(place.panel, order);
    await inAct(() => view.dispose());
  });
});

// Row 7 with row 4. Catches the question tied to the copy being shown: a player who picks another
// program on the list „Program:” while it stands must still see it (the map run waits for the
// answer), standing in the same place, and it must not move into the panel of Programy.
test("the question stays in its place while the panel shows another program, and never stands on Programy", async () => {
  await onPage(async ({ root }) => {
    const { view, address } = await viewOf(renamed(paused()));
    await press(headerButton(root, "Zakończ"));
    const list = all(runScreenOf(root)).find(
      (element) =>
        element.localName === "select" &&
        element.getAttribute("aria-label") === "Program:",
    );
    list.value = "2";
    await inAct(() => fire(list, "change"));
    assert.equal(
      byClass(runScreenOf(root), "copy-section").length,
      0,
      "precondition: the panel shows a saved program",
    );
    assert.ok(questionOf(root), "the question stands");
    const place = placeOf(root);
    assert.equal(
      place.panel.indexOf("end-question") >
        place.panel.indexOf("program-actions"),
      true,
    );
    await inAct(() => address.follow("#/programy"));
    assert.equal(
      byClass(byClass(root, "programs-screen")[0], "end-question").length,
      0,
    );
    await inAct(() => view.dispose());
  });
});

// D-323. Catches a question that, after an error nothing handled, pauses a map run, saves, ends the
// map run or leads away: the game state held must be the one from before the error.
test("after halt() the question changes nothing: „Zakończ” asks nothing and the three answers leave the game state as it was", async () => {
  await onPage(async ({ root }) => {
    const { view, address } = await viewOf(renamed(going()));
    await press(headerButton(root, "Zakończ"));
    assert.ok(questionOf(root), "precondition: the question stands");
    const before = await inAct(() => view.keep());
    view.halt();
    for (const text of ["Wróć", "Zapisz", "Odrzuć"]) {
      await press(answer(root, text));
      assert.deepEqual(
        await inAct(() => view.keep()),
        before,
        `${text}: nothing changed`,
      );
      assert.equal(shownScreen(root), "run", text);
    }
    assert.deepEqual(address.entries, [RUN_ADDRESS]);
    await inAct(() => view.dispose());
  });
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(paused()));
    const before = await inAct(() => view.keep());
    view.halt();
    await press(headerButton(root, "Zakończ"));
    assert.equal(questionOf(root), undefined, "no question is asked");
    assert.deepEqual(await inAct(() => view.keep()), before);
    assert.equal(shownScreen(root), "run");
    await inAct(() => view.dispose());
  });
});

// The focus a keyboard player needs: the first answer takes it when the question opens.
test("the first answer takes the keyboard focus when the question opens", async () => {
  await onPage(async ({ root }) => {
    const { view } = await viewOf(renamed(paused()));
    await press(headerButton(root, "Zakończ"));
    assert.equal(pageDocument().activeElement, answer(root, "Zapisz"));
    await settle();
    await inAct(() => view.dispose());
  });
});
