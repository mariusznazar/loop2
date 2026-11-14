// The screen Siedziba in React (D-282, D-246, D-217, D-218, D-244, D-245, D-184, D-51, D-330, D-389) on
// jsdom through tests/view/page-document.mjs (D-264): which elements the screen builds, what it
// shows of the game state and of the clock's moment, what its acts hand the page, and that
// nothing on it sends a character. Real focus order, Enter in a field and rendering are the browser
// check's (D-88), so a focus case here holds only what jsdom shows.
import { assert, inAct, press, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import {
  ARCHETYPES,
  CREATED_ARCHETYPE,
} from "../../dist/browser/sim/data/archetypes.js";
import { createCharacter, newGame, send } from "../../dist/browser/sim/game.js";
import { createHeadquarters } from "../../dist/browser/view/headquarters.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

// --- the page ------------------------------------------------------------------------------

const NOW = 1_800_000_000_000;
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const WARNING = " — śmierć zabierze wprawę i wykupione stopnie";
const ARCHETYPE = ARCHETYPES[CREATED_ARCHETYPE].name;

/** Ala (1), Ola (2) and Ela (3), in the order they were created, from the new game. */
function teamOf(count = 3) {
  let state = withEdgeSolved(newGame());
  for (const name of ["Ala", "Ola", "Ela"].slice(0, count))
    state = createCharacter(state, name).state;
  return state;
}

/** `state` with the fields of the character `id` given over it. */
function withCharacter(state, id, fields) {
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((character) =>
        character.id === id ? { ...character, ...fields } : character,
      ),
    },
  };
}

const withChest = (state, pieces) => ({
  ...state,
  team: { ...state.team, chest: { pieces } },
});

const LOOP = {
  runNumber: 3,
  completed: 2,
  run: { mapId: "forest", minute: 212 },
};

const reportLine = (characterId, rest = {}) => ({
  characterId,
  minutes: 0,
  chest: {},
  resurrectionUsed: false,
  stop: null,
  ...rest,
});

const propsOf = (state, nowMs = NOW) => ({ state, nowMs });

/** Builds the screen in the page's body; `calls` records what the screen handed the page. */
async function mount({ root }, props) {
  const calls = [];
  let screen = null;
  await inAct(() => {
    screen = createHeadquarters({
      controls: {
        create: (name) => calls.push(["create", name]),
        stop: (characterId) => calls.push(["stop", characterId]),
        closeReport: () => calls.push(["closeReport"]),
        takePractice: (characterId) =>
          calls.push(["takePractice", characterId]),
      },
      props,
    });
    root.append(screen.element);
  });
  return { screen, calls };
}

/** Presses a key in a field, inside act. */
function pressKey(target, key) {
  const { KeyboardEvent } = globalThis.window;
  return inAct(() =>
    target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true })),
  );
}

const all = (root, selector) => [...root.querySelectorAll(selector)];
const text = (root, selector) => root.querySelector(selector)?.textContent;
const buttonLabelled = (root, label) =>
  all(root, "button").find(
    (button) => button.getAttribute("aria-label") === label,
  );
const buttonNamed = (root, name) =>
  all(root, "button").find((button) => button.textContent === name);
const nameField = (root) =>
  all(root, "input").find(
    (input) => input.getAttribute("aria-label") === "Imię nowej postaci",
  );
const rowOf = (root, name) =>
  all(root, ".team-member").find(
    (row) => text(row, ".team-member-name") === name,
  );
/** The section that holds the heading `heading` among its children. */
const sectionOf = (root, heading) =>
  all(root, "section").find(
    (section) =>
      [...section.children].find((child) => child.localName === "h3")
        ?.textContent === heading,
  );

// --- the sections ----------------------------------------------------------------------------

// Catches a screen without its heading, a team drawn as a bare list with no heading (D-282) and the
// sections in an order other than the report, the team, the chest.
test("the screen holds its heading Siedziba, then the sections „Drużyna” and „Skrzynka {n}/{cap}” under it", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(teamOf(1)));
    assert.equal(text(page.root, "h2"), "Siedziba");
    const headings = all(page.root, "h3").map((heading) => heading.textContent);
    assert.deepEqual(headings, ["Drużyna", "Skrzynka 0/60"]);
    const sections = all(page.root, ".headquarters > section");
    assert.equal(sections.length, 3);
    assert.ok(sections[0].classList.contains("away-report"));
    assert.equal(sections[0].hidden, true, "no report, no section");
  });
});

// Catches the credits of the icons left off Siedziba, opened by default, standing above the last
// part of the screen (D-27), or lost at a refresh of the game state.
test("the folded section „Autorzy grafiki” stands last on the screen, whatever the team and the chest hold, and stays as the player left it", async () => {
  await withPage(async (page) => {
    const state = teamOf(1);
    const { screen } = await mount(page, propsOf(state));
    const screenElement = page.root.querySelector(".headquarters");
    const credits = () => screenElement.lastElementChild;
    assert.equal(credits().localName, "details");
    assert.equal(
      screenElement.querySelectorAll("details").length,
      1,
      "one section stands",
    );
    assert.equal(text(credits(), "summary"), "Autorzy grafiki");
    assert.equal(credits().open, false, "folded until the player opens it");
    assert.ok(
      all(credits(), "li").length > 0,
      "it holds the credit of each icon",
    );

    const section = credits();
    section.open = true;
    for (const next of [
      propsOf(withChest(createCharacter(state, "Ola").state, { stick: 1 })),
      propsOf({ ...state, awayReport: [reportLine(1, { minutes: 3 })] }),
    ]) {
      await inAct(() => screen.update(next));
      assert.equal(credits(), section, "the same section after a refresh");
      assert.equal(section.open, true, "the player's opening is kept");
    }
  });
});

// Catches the order of the team changed to the name's or the last created's (D-54), a name that is no
// link or leads elsewhere than to the character's screen, and a generation label at generation 1.
test("each character stands in the order of creation with its name as a link to its screen Postać, its generation from 2 up and its archetype", async () => {
  await withPage(async (page) => {
    const state = withCharacter(teamOf(), 2, { generation: 2 });
    await mount(page, propsOf(state));
    const rows = all(page.root, ".team-member");
    assert.deepEqual(
      rows.map((row) => text(row, ".team-member-name")),
      ["Ala", "Ola", "Ela"],
    );
    const names = all(page.root, ".team-member-name");
    assert.deepEqual(
      names.map((name) => name.localName),
      ["a", "a", "a"],
    );
    assert.deepEqual(
      names.map((name) => name.getAttribute("href")),
      ["#/postac/1", "#/postac/2", "#/postac/3"],
    );
    assert.deepEqual(
      rows.map((row) => text(row, ".team-member-generation") ?? null),
      [null, "pokolenie 2", null],
    );
    for (const row of rows)
      assert.equal(text(row, ".team-member-archetype"), ARCHETYPE);
  });
});

// Catches the empty team drawn as an empty list, with no sentence, or with the sentence of the screen
// Mapy (D-51); the creation of the first character must stand beside it.
test("an empty team says „Drużyna nie ma jeszcze postaci.” and still offers the creation of a character", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(newGame()));
    assert.equal(
      text(page.root, ".headquarters-empty"),
      "Drużyna nie ma jeszcze postaci.",
    );
    assert.equal(all(page.root, ".team-member").length, 0);
    assert.equal(page.root.querySelector(".team-list"), null);
    assert.ok(nameField(page.root), "the field of the first name stands");
    assert.ok(buttonNamed(page.root, "Załóż"));
  });
});

// Catches the chest heading without the capacity (D-184), a list for an empty chest and a line that
// does not follow the data's order of items.
test("the chest heading reads the pieces and the capacity, its lines follow the items, and an empty chest says so under „Skrzynka 0/60”", async () => {
  await withPage(async (page) => {
    const state = teamOf(1);
    const { screen } = await mount(
      page,
      propsOf(withChest(state, { moss: 2, stick: 5 })),
    );
    const chest = () => sectionOf(page.root, "Skrzynka 7/60");
    assert.ok(chest(), "the heading holds the sum of all items");
    assert.deepEqual(
      all(chest(), ".chest-list li").map((item) => item.textContent),
      ["patyk: 5", "mech: 2"],
    );
    assert.equal(chest().querySelector(".headquarters-empty"), null);

    await inAct(() => screen.update(propsOf(withChest(state, {}))));
    const empty = sectionOf(page.root, "Skrzynka 0/60");
    assert.ok(empty);
    assert.equal(text(empty, ".headquarters-empty"), "Skrzynka jest pusta.");
    assert.equal(empty.querySelector(".chest-list"), null);
  });
});

// --- time, loops -----------------------------------------------------------------------------

// Catches a resurrection line drawn once and left, a line that loses `danger` late or early, and a
// line rebuilt as a new element at every reading, which would drop what stands on it (D-217).
test("the resurrection line follows the clock's moment in the very same element, in danger until ready", async () => {
  await withPage(async (page) => {
    const readyAt = NOW + 8 * HOUR;
    const state = withCharacter(teamOf(1), 1, {
      resurrectionReadyAtMs: readyAt,
    });
    const { screen } = await mount(page, propsOf(state));
    const [line] = all(page.root, ".team-member-resurrection");
    assert.equal(
      line.textContent,
      `Wskrzeszenie za 8 godz. 0 min czasu realnego${WARNING}`,
    );
    assert.ok(line.classList.contains("danger"));

    await inAct(() => screen.update(propsOf(state, readyAt - 30 * MINUTE)));
    assert.equal(
      line.textContent,
      `Wskrzeszenie za 30 min czasu realnego${WARNING}`,
    );
    assert.ok(line.classList.contains("danger"));

    await inAct(() => screen.update(propsOf(state, readyAt)));
    assert.equal(line.textContent, "Wskrzeszenie gotowe");
    assert.equal(line.classList.contains("danger"), false);
    assert.equal(all(page.root, ".team-member-resurrection")[0], line);
  });
});

// Catches a loop line and „Zatrzymaj” drawn at a character that has no loop, a button that does not
// reach the page's `stop` with the character's number, and the line of a stop missing after it (D-244,
// D-245).
test("a running loop shows its line with „Zatrzymaj”, which asks the page to stop that character; a stopped loop shows its line instead", async () => {
  await withPage(async (page) => {
    const state = teamOf(2);
    const looping = { ...state, loops: { 2: LOOP } };
    const { screen, calls } = await mount(page, propsOf(looping));
    assert.equal(
      text(rowOf(page.root, "Ola"), ".team-member-loop"),
      "Pętla: Las · przejście 3 · minuta 212 · domknięte 2",
    );
    const ala = rowOf(page.root, "Ala");
    assert.equal(ala.querySelector(".team-member-loop"), null);
    assert.equal(buttonLabelled(ala, "Zatrzymaj: Ala"), undefined);
    const stop = buttonLabelled(page.root, "Zatrzymaj: Ola");
    assert.ok(stop.classList.contains("destructive"));
    await press(stop);
    assert.deepEqual(calls, [["stop", 2]]);

    await inAct(() =>
      screen.update(propsOf({ ...state, stoppedLoops: { 2: { eating: 4 } } })),
    );
    const ola = rowOf(page.root, "Ola");
    assert.equal(ola.querySelector(".team-member-loop"), null);
    assert.equal(buttonLabelled(ola, "Zatrzymaj: Ola"), undefined);
    assert.equal(
      text(ola, ".team-member-stopped"),
      "Pętla zatrzymana · wprawa: Jedzenie +4",
    );
    assert.equal(
      rowOf(page.root, "Ala").querySelector(".team-member-stopped"),
      null,
    );
  });
});

// --- the report ------------------------------------------------------------------------------

const reported = () => ({
  ...teamOf(2),
  awayReport: [
    reportLine(1, { minutes: 5, chest: { stick: 3 } }),
    reportLine(2, { minutes: 2, stop: { generation: 2, away: true } }),
  ],
});

// Catches the section drawn below „Drużyna”, the stopped line not first, `danger` missing or on the
// wrong line, and the title of a return missing (D-246).
test("a report stands above „Drużyna”, titled „Gdy cię nie było”, the loop that stopped first and in danger", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(reported()));
    const section = page.root.querySelector(".away-report");
    assert.equal(section.hidden, false);
    assert.equal(section.children[0].textContent, "Gdy cię nie było");
    const lines = all(section, ".away-report-line");
    assert.deepEqual(
      lines.map((line) => line.textContent),
      [
        "Ola: pętla stanęła po 2 min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
        "Ala: 5 min · skrzynka: patyk +3",
      ],
    );
    assert.deepEqual(
      lines.map((line) => line.classList.contains("danger")),
      [true, false],
    );
    const sections = all(page.root, ".headquarters > section");
    assert.equal(sections[0], section);
    assert.equal(sections[1].children[0].textContent, "Drużyna");
    assert.equal(all(section, ".away-report-full").length, 0);
  });
});

// Catches the title chosen by the presence of a stop rather than by where it happened (the stop in
// the open game gives „Pętle, które stanęły”), and a full chest that is not said (D-246).
test("only stops in the open game give the title „Pętle, które stanęły”, and a full chest adds „Skrzynka jest pełna.”", async () => {
  await withPage(async (page) => {
    const state = withChest(
      {
        ...teamOf(2),
        awayReport: [reportLine(2, { stop: { generation: 3, away: false } })],
      },
      { stick: 60 },
    );
    await mount(page, propsOf(state));
    const section = page.root.querySelector(".away-report");
    assert.equal(section.children[0].textContent, "Pętle, które stanęły");
    assert.equal(
      text(section, ".away-report-line"),
      "Ola: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 3.",
    );
    assert.equal(text(section, ".away-report-full"), "Skrzynka jest pełna.");
  });
});

// Catches a „Zamknij” that does not reach the page's `closeReport`, a section that stays once the
// page has emptied the report, and focus left on the body once the button is gone, which the next
// key press would lose (D-246).
test("„Zamknij” asks the page to close the report; once the report is empty the section goes and the focus stands on „Drużyna”", async () => {
  await withPage(async (page) => {
    const open = reported();
    let screen = null;
    const calls = [];
    await inAct(() => {
      screen = createHeadquarters({
        controls: {
          create: () => calls.push("create"),
          stop: () => calls.push("stop"),
          // The page empties the report and gives the screen the state at once.
          closeReport: () => {
            calls.push("closeReport");
            screen.update(propsOf({ ...open, awayReport: [] }));
          },
          takePractice: () => calls.push("takePractice"),
        },
        props: propsOf(open),
      });
      page.root.append(screen.element);
    });
    const close = buttonNamed(page.root, "Zamknij");
    close.focus();
    assert.equal(globalThis.document.activeElement, close);
    await press(close);
    assert.deepEqual(calls, ["closeReport"]);
    assert.equal(page.root.querySelector(".away-report").hidden, true);
    const heading = sectionOf(page.root, "Drużyna").children[0];
    assert.equal(globalThis.document.activeElement, heading);
  });
});

// Catches the focus moved to the heading although the report stays (a page that refuses the close).
test("„Zamknij” leaves the focus on its button when the report is still there", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(reported()));
    const close = buttonNamed(page.root, "Zamknij");
    close.focus();
    await press(close);
    assert.deepEqual(calls, [["closeReport"]]);
    assert.equal(globalThis.document.activeElement, close);
  });
});

// D-246, D-189: practice waits at the earning loop of a line that went on, and „Odbierz” stands beside
// that line alone.
const waiting = (practice, runPractice = {}) => ({
  ...teamOf(2),
  loops: {
    1: {
      ...LOOP,
      practice,
      run: { ...LOOP.run, practice: runPractice, death: null },
    },
  },
  awayReport: [reportLine(1, { minutes: 5 }), reportLine(2, { minutes: 3 })],
});

// Catches the practice of the loop and the map run going on not both in the line, a button on a
// line with nothing waiting and a button that does not carry the name of its character.
test("practice waiting at a loop reads in its line with „Odbierz” in `positive` beside it, and a line with none waiting has no button", async () => {
  await withPage(async (page) => {
    await mount(
      page,
      propsOf(waiting({ eating: 4 }, { eating: 1, exploration: 2 })),
    );
    const section = page.root.querySelector(".away-report");
    const lines = all(section, ".away-report-line");
    assert.deepEqual(
      lines.map((line) => text(line, ".away-report-text")),
      [
        "Ala: 5 min · wprawa do odebrania: Eksploracja +2, Jedzenie +5",
        "Ola: 3 min",
      ],
    );
    assert.deepEqual(
      lines.map((line) =>
        all(line, "button").map((button) => button.textContent),
      ),
      [["Odbierz"], []],
    );
    const take = buttonLabelled(page.root, "Odbierz: Ala");
    assert.equal(take.getAttribute("class"), "button positive");
    assert.equal(take.getAttribute("type"), "button");
  });
});

// Catches an „Odbierz” that does not reach the page with its character, and a focus left on the
// body once the button is gone with the practice it paid (D-246).
test("„Odbierz” hands the page its character; once nothing waits the button goes and the focus stands on „Zamknij”", async () => {
  await withPage(async (page) => {
    const before = waiting({ eating: 4 });
    let screen = null;
    const calls = [];
    await inAct(() => {
      screen = createHeadquarters({
        controls: {
          create: () => calls.push("create"),
          stop: () => calls.push("stop"),
          closeReport: () => calls.push("closeReport"),
          takePractice: (characterId) => {
            calls.push(["takePractice", characterId]);
            // The page pays the practice and gives the screen the state at once.
            screen.update(
              propsOf({
                ...before,
                loops: { 1: { ...before.loops[1], practice: {} } },
              }),
            );
          },
        },
        props: propsOf(before),
      });
      page.root.append(screen.element);
    });
    const take = buttonLabelled(page.root, "Odbierz: Ala");
    take.focus();
    await press(take);
    assert.deepEqual(calls, [["takePractice", 1]]);
    assert.equal(buttonNamed(page.root, "Odbierz"), undefined);
    // The line stays with its minutes, only the part about practice has gone.
    assert.deepEqual(
      all(page.root.querySelector(".away-report"), ".away-report-text").map(
        (line) => line.textContent,
      ),
      ["Ala: 5 min", "Ola: 3 min"],
    );
    assert.equal(
      globalThis.document.activeElement,
      buttonNamed(page.root, "Zamknij"),
    );
  });
});

// Catches practice that is back after a redraw with the loop gathering more (D-246): the button
// returns at the next change of the loop.
test("the part about practice and „Odbierz” come back when the loop gathers more", async () => {
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(waiting({})));
    assert.equal(buttonNamed(page.root, "Odbierz"), undefined);
    await inAct(() => screen.update(propsOf(waiting({ eating: 1 }))));
    assert.equal(
      text(page.root, ".away-report-text"),
      "Ala: 5 min · wprawa do odebrania: Jedzenie +1",
    );
    assert.ok(buttonLabelled(page.root, "Odbierz: Ala"));
  });
});

// D-246: a line of a loop a death stopped has no practice waiting, so it has no button either.
test("a line of a loop a death stopped has no „Odbierz”", async () => {
  await withPage(async (page) => {
    const state = {
      ...waiting({ eating: 4 }),
      awayReport: [
        reportLine(1, { minutes: 5, stop: { generation: 2, away: true } }),
      ],
    };
    await mount(page, propsOf(state));
    assert.equal(buttonNamed(page.root, "Odbierz"), undefined);
  });
});

// --- the creation of a character ----------------------------------------------------------------

// Catches a name handed to the page untrimmed, a field that keeps its text after a creation and a
// creation that does not reach the page at all.
test("„Załóż” hands the page the trimmed name and empties the field; Enter in the field does the same", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(newGame()));
    assert.equal(
      text(page.root, ".character-creation-label"),
      `Nowa postać: ${ARCHETYPE}`,
    );
    await typeInto(nameField(page.root), "  Ola ");
    await press(buttonNamed(page.root, "Załóż"));
    assert.deepEqual(calls, [["create", "Ola"]]);
    assert.equal(nameField(page.root).value, "");

    await typeInto(nameField(page.root), "Ela");
    await pressKey(nameField(page.root), "Enter");
    assert.deepEqual(calls, [
      ["create", "Ola"],
      ["create", "Ela"],
    ]);
    assert.equal(nameField(page.root).value, "");
  });
});

// Catches a character created from a name that is empty once trimmed, a message missing under the
// field or standing after the player has begun to type (the field's error state, D-44).
test("a name empty once trimmed creates nothing and says „Wpisz imię postaci.” under the field until the player types", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(newGame()));
    await typeInto(nameField(page.root), "   ");
    await press(buttonNamed(page.root, "Załóż"));
    assert.deepEqual(calls, []);
    const message = () => page.root.querySelector(".input-field-message");
    assert.equal(message().hidden, false);
    assert.equal(message().textContent, "Wpisz imię postaci.");
    assert.equal(nameField(page.root).getAttribute("aria-invalid"), "true");

    await typeInto(nameField(page.root), "O");
    assert.equal(message().hidden, true);
    assert.equal(nameField(page.root).getAttribute("aria-invalid"), null);
  });
});

// Catches the field and the button rebuilt at a refresh of the game state: they would lose the text
// typed and the focus the player has in them, at every game minute (D-36).
test("the field keeps its element, its text and its focus, and the button its focus, through every refresh of the state and of the moment", async () => {
  await withPage(async (page) => {
    const state = teamOf(1);
    const { screen } = await mount(page, propsOf(state));
    const field = nameField(page.root);
    const button = buttonNamed(page.root, "Załóż");
    await typeInto(field, "Ol");
    field.focus();
    const refreshes = [
      propsOf({ ...state, loops: { 1: LOOP } }, NOW + MINUTE),
      propsOf(withChest(createCharacter(state, "Ola").state, { stick: 1 })),
      propsOf({ ...state, awayReport: [reportLine(1, { minutes: 3 })] }),
      propsOf({ ...state, awayReport: [] }, NOW + HOUR),
    ];
    for (const props of refreshes) {
      await inAct(() => screen.update(props));
      assert.equal(nameField(page.root), field, "the same field");
      assert.equal(field.value, "Ol");
      assert.equal(globalThis.document.activeElement, field);
    }
    button.focus();
    await inAct(() => screen.update(propsOf(newGame(), NOW + 2 * HOUR)));
    assert.equal(buttonNamed(page.root, "Załóż"), button, "the same button");
    assert.equal(globalThis.document.activeElement, button);
  });
});

// --- the camp --------------------------------------------------------------------------------

/** The elements of the characters the camp draws. */
const campMembers = (root) => all(root, ".camp .camp-member");

/** `state` with its character `id` sent into a map run, going. */
const sentInto = (state, id) =>
  send(state, { mapId: "forest", characterId: id }, NOW).state;

// Catches the band standing inside the screen's panel (narrower than the content, with its padding), under
// the heading „Siedziba” instead of over it (D-272), or the sections under it changed by the band: the
// text of the screen is the text of its panel, so the band adds none.
test("the camp stands over the panel of the screen, the heading under it, and adds no text", async () => {
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(teamOf(2)));
    const camp = screen.element.firstElementChild;
    assert.ok(camp.classList.contains("camp"));
    assert.equal(
      camp.nextElementSibling,
      page.root.querySelector(".headquarters"),
    );
    assert.equal(camp.querySelector("h2, h3"), null);
    assert.equal(
      screen.element.textContent,
      page.root.querySelector(".headquarters").textContent,
    );
    assert.equal(camp.textContent, "");
  });
});

// Catches the camp made a control: a link, a button or a field in it, a stop in the keyboard's order, a name
// for a reader, or a picture a reader would announce (D-272, D-321): the screen's names in „Drużyna” lead
// to the character (D-280), the camp leads nowhere.
test("the camp is a picture: nothing in it takes the keyboard or a click, and it is hidden from readers", async () => {
  await withPage(async (page) => {
    const { screen, calls } = await mount(page, propsOf(teamOf(3)));
    const camp = page.root.querySelector(".camp");
    assert.equal(camp.getAttribute("aria-hidden"), "true");
    assert.equal(
      camp.querySelectorAll(
        "a, button, input, select, textarea, [tabindex], [role]",
      ).length,
      0,
    );
    const pictures = all(camp, "img");
    assert.ok(
      pictures.length >= 1 + 1 + 1 + 3,
      "the clearing, the fire, the chest, three characters",
    );
    for (const picture of pictures)
      assert.equal(picture.getAttribute("alt"), "");
    const before = camp.innerHTML;
    for (const part of [
      ".camp-member",
      ".camp-fire",
      ".camp-chest",
      ".camp-background",
    ])
      await press(camp.querySelector(part));
    assert.deepEqual(calls, []);
    assert.equal(camp.innerHTML, before);
    assert.equal(screen.element.querySelector(".camp"), camp);
  });
});

// Catches a camp drawn at the size of its picture, or at a fraction of twice it, where the pixels of the
// picture would come out unequal and shake in motion (D-349): the band is 96 px high, its clearing 672 × 48
// pixels of picture drawn at 1344 × 96, the fire of 32 × 32 at 64 × 64, a character's cell 32 wide at 64.
test("the camp is drawn at twice the pixels of its pictures, in a band 96 px high", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(teamOf(1)));
    const camp = page.root.querySelector(".camp");
    assert.equal(camp.style.height, "96px");
    const clearing = camp.querySelector(".camp-background");
    assert.equal(clearing.getAttribute("width"), "1344");
    assert.equal(clearing.getAttribute("height"), "96");
    const box = (selector) => {
      const { width, height } = camp.querySelector(selector).style;
      return [width, height];
    };
    assert.deepEqual(box(".camp-fire"), ["64px", "64px"]);
    assert.deepEqual(box(".camp-chest"), ["52px", "42px"]);
    assert.deepEqual(box(".camp-member"), ["64px", "96px"]);
    assert.deepEqual(box(".camp-member-sprite"), ["128px", "128px"]);
  });
});

// Catches a screen that does not read the manual map run, which the camp needs: with it the picture would
// change only at a change of the team or of a loop, and not at „Wejdź” and „Zakończ”. Every change of the
// four — „Wejdź”, „Puść w pętlę”, „Zatrzymaj”, „Zakończ” — shows in the camp at once, and „Drużyna” still lists all.
test("the camp follows the manual map run and the earning loops, and „Drużyna” lists every character all the while", async () => {
  await withPage(async (page) => {
    const state = teamOf(3);
    const { screen } = await mount(page, propsOf(state));
    const names = () =>
      all(page.root, ".team-member-name").map((n) => n.textContent);
    const standing = () => campMembers(page.root).length;
    assert.equal(standing(), 3);
    const first = campMembers(page.root)[0];

    // „Wejdź” for Ola: a map run begins, and the character goes out of the camp.
    const entered = sentInto(state, 2);
    await inAct(() => screen.update(propsOf(entered)));
    assert.equal(standing(), 2);
    assert.deepEqual(names(), ["Ala", "Ola", "Ela"]);
    assert.equal(
      campMembers(page.root)[0],
      first,
      "the character that stays is the same element",
    );

    // The run goes on: a game minute changes nothing the camp shows.
    await inAct(() =>
      screen.update(
        propsOf({
          ...entered,
          run: { ...entered.run, minute: entered.run.minute + 1 },
        }),
      ),
    );
    assert.equal(standing(), 2);

    // „Zakończ”: the run is gone, the character is back.
    await inAct(() => screen.update(propsOf({ ...entered, run: null })));
    assert.equal(standing(), 3);

    // „Puść w pętlę” for Ela, then „Zatrzymaj”.
    await inAct(() => screen.update(propsOf({ ...state, loops: { 3: LOOP } })));
    assert.equal(standing(), 2);
    assert.deepEqual(names(), ["Ala", "Ola", "Ela"]);
    await inAct(() =>
      screen.update(propsOf({ ...state, stoppedLoops: { 3: { eating: 4 } } })),
    );
    assert.equal(standing(), 3);
  });
});

// --- what the screen does not do -------------------------------------------------------------

// Catches a control of sending left on Siedziba (D-330): the list „Program:”, „Wejdź”,
// „Puść w pętlę”, a button that leads to the screen Mapy or a link other than a character's name.
test("nothing on the screen sends a character or leads to the screen Mapy", async () => {
  await withPage(async (page) => {
    const state = { ...reported(), loops: { 2: LOOP } };
    await mount(page, propsOf(state));
    assert.equal(all(page.root, "select").length, 0);
    assert.deepEqual(
      all(page.root, "button")
        .map(
          (button) => button.getAttribute("aria-label") ?? button.textContent,
        )
        .sort(),
      ["Zamknij", "Zatrzymaj: Ola", "Załóż"],
    );
    // The links of the folded section of credits lead to game-icons.net, not to a screen of the game.
    assert.deepEqual(
      all(page.root, ".headquarters > :not(details) a").map((link) =>
        link.getAttribute("href"),
      ),
      ["#/postac/1", "#/postac/2"],
    );
    const words = all(page.root, ".headquarters > :not(details)")
      .map((part) => part.textContent)
      .join(" ");
    for (const word of [
      "Wyślij",
      "Wejdź",
      "Puść w pętlę",
      "Program:",
      "Wejdzie",
    ])
      assert.equal(words.includes(word), false, word);
  });
});

// --- the boundary ----------------------------------------------------------------------------

// Catches a reading of the clock that redraws the screen when it changes nothing the screen shows:
// the page calls `update` at every reading and every game minute of a map run, and React reports an
// update outside act, which the page's cases make with a bare tick of the clock.
test("an update that changes nothing the screen shows draws nothing, so it needs no act", async () => {
  await withPage(async (page) => {
    const state = teamOf(1);
    const { screen } = await mount(page, propsOf(state));
    // A new state object of the same team, loops, report and moment: only a map run would differ.
    screen.update(propsOf({ ...state, paused: !state.paused }, NOW + 1));
    screen.update(propsOf(state, NOW + 2));
  });
});

// Catches an unmount that leaves the screen in the page or its handlers working after the page has
// let it go.
test("dispose takes the screen out of the page and later updates change nothing", async () => {
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(teamOf(1)));
    await inAct(() => screen.dispose());
    assert.equal(page.root.querySelector(".headquarters"), null);
    await inAct(() => screen.update(propsOf(teamOf(2))));
    assert.equal(page.root.querySelector(".headquarters"), null);
  });
});

// Catches a `focus()` that moves nothing; the page gives the screen focus when a link opens it.
test("focus puts the keyboard's focus on the screen's element", async () => {
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(teamOf(1)));
    screen.focus();
    assert.equal(globalThis.document.activeElement, screen.element);
  });
});
