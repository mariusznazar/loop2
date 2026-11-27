// The screen Siedziba in React (D-282, D-246, D-217, D-218, D-244, D-245, D-447, D-446, D-280, D-39, D-44,
// D-184, D-51, D-330, D-389) on
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
import { gameStylesheetText } from "./game-stylesheets.mjs";

// --- the page ------------------------------------------------------------------------------

const NOW = 1_800_000_000_000;
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const WARNING = " — śmierć zabierze wprawę i wykupione stopnie";
const ARCHETYPE = ARCHETYPES[CREATED_ARCHETYPE].name;
const ARCHETYPE_ICON = `url("/icons/${ARCHETYPES[CREATED_ARCHETYPE].icon}.svg")`;

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

/**
 * `state` with `spent` uses of the team's one resurrection not yet returned, the next of them
 * returning at the real moment `nextMs`.
 */
const withResurrection = (state, spent, nextMs) => ({
  ...state,
  team: {
    ...state.team,
    resurrectionUsesSpent: spent,
    resurrectionNextReturnAtMs: nextMs,
  },
});

const withChest = (state, pieces) => ({
  ...state,
  team: { ...state.team, chest: { pieces } },
});

const LOOP = {
  runNumber: 3,
  completed: 2,
  inARow: 0,
  loopRecord: 0,
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
/** The closed tile „+ postać” at the end of the cards. */
const addTile = (root) => buttonNamed(root, "+ postać");
/** The section that holds the heading `heading` among its children. */
const sectionOf = (root, heading) =>
  all(root, "section").find(
    (section) =>
      [...section.children].find((child) => child.localName === "h3")
        ?.textContent === heading,
  );

/** The condition of the blocks of the phone layout on a device whose pointer cannot hover (D-396). */
const TOUCH = "(width < 1280px) and (hover: none)";

/**
 * The last value the plain rules of the stylesheet declare for `element` as the first of `properties`
 * that a rule holds, a longhand before its shorthand, read from the rules themselves, or null where no
 * rule declares one: jsdom drops a declaration that holds `var()` from its computed style where it
 * stands in a shorthand, such as a frame. Of two rules that match, the later one wins here; blocks of
 * `@media` are left out, as jsdom leaves them out.
 */
function lastDeclared(document, element, ...properties) {
  let last = null;
  for (const rule of document.styleSheets[0].cssRules) {
    if (rule.selectorText === undefined || !element.matches(rule.selectorText))
      continue;
    for (const property of properties) {
      const value = rule.style.getPropertyValue(property);
      if (value === "") continue;
      last = value;
      break;
    }
  }
  return last;
}

// --- the sections ----------------------------------------------------------------------------

// Catches a screen without its heading, a team drawn as a bare list with no heading (D-282) and the
// sections in an order other than the report, the team, the chest.
test("the screen holds its heading Siedziba, then the sections „Drużyna” and „Skrzynka {n}/{cap}” under it", async () => {
  // decision: D-282 "Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading"
  // decision: D-184 "The headquarters shows the chest section heading as „Skrzynka {pieces}/{cap}”, such as „Skrzynka 12/60”, and for an empty chest as „Skrzynka 0/60” above „Skrzynka jest pusta.”"
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
  // decision: D-27 "A section of credits, folded and opened with one click, stands on the login card and at the bottom of Siedziba, as its last part"
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

// Catches the order of the team changed to the name's or the last created's (D-54), a card whose link
// is not its name or leads elsewhere than to the character's screen, a card with a second link, a
// generation label at generation 1, and the archetype's icon missing, after the name or in another
// colour than the name's (D-446).
test("each character stands in a card in the order of creation, its name the one link of the card to its screen Postać, with the archetype's icon before it, its generation from 2 up and its archetype", async () => {
  // decision: D-280 "The card of a character on Siedziba is, whole, a link named by the character's name to the screen Postać of that character"
  // decision: D-446 "The same icon stands before the character's name on its card on Siedziba, drawn as a mask in the colour of that name."
  // decision: D-54 "The characters of the team stand on its list in the order they were created"
  // decision: D-218 "The headquarters and the screen Postać show „pokolenie {n}” beside a character's name from generation number 2 up, in `text-secondary`"
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
    for (const row of rows) {
      assert.equal(text(row, ".team-member-archetype"), ARCHETYPE);
      assert.equal(all(row, "a").length, 1, "the name is the card's one link");
      const head = row.querySelector(".team-member-head");
      const icon = head.firstElementChild;
      assert.ok(icon.classList.contains("icon-mask"));
      assert.equal(icon.style.getPropertyValue("--icon"), ARCHETYPE_ICON);
      assert.equal(icon.getAttribute("aria-hidden"), "true");
      assert.equal(
        icon.nextElementSibling,
        row.querySelector(".team-member-name"),
      );
    }
    assert.deepEqual(
      rows.map((row) => text(row, ".team-member-facts")),
      [ARCHETYPE, `pokolenie 2 · ${ARCHETYPE}`, ARCHETYPE],
    );
  });
});

// Catches the empty team drawn with no sentence, or with the sentence of the screen Mapy (D-51); the
// creation of the first character must stand beside it, its field open from the start, with no
// „Anuluj” and no closing by Escape, and with no resurrection line, which speaks of a team's characters.
test("an empty team says „Drużyna nie ma jeszcze postaci.” beside the tile „+ postać” open on the field of a name, which nothing closes", async () => {
  // decision: D-51 "A new game starts with an empty team, and the player creates the first character in the headquarters before sending any character to a game map"
  await withPage(async (page) => {
    await mount(page, propsOf(newGame()));
    assert.equal(
      text(page.root, ".headquarters-empty"),
      "Drużyna nie ma jeszcze postaci.",
    );
    assert.equal(all(page.root, ".team-member").length, 0);
    assert.equal(page.root.querySelector(".team-resurrection"), null);
    assert.equal(addTile(page.root), undefined, "no closed tile");
    const field = nameField(page.root);
    assert.ok(field, "the field of the first name stands");
    assert.ok(field.closest(".team-list .team-add.open"));
    assert.ok(buttonNamed(page.root, "Załóż"));
    assert.equal(buttonNamed(page.root, "Anuluj"), undefined);
    await typeInto(field, "Ol");
    await pressKey(field, "Escape");
    assert.equal(nameField(page.root), field, "Escape leaves the field");
    assert.equal(field.value, "Ol");
  });
});

// Catches the chest heading without the capacity (D-184), a list for an empty chest and a line that
// does not follow the data's order of items.
test("the chest heading reads the pieces and the capacity, its lines follow the items, and an empty chest says so under „Skrzynka 0/60”", async () => {
  // decision: D-184 "The headquarters shows the chest section heading as „Skrzynka {pieces}/{cap}”, such as „Skrzynka 12/60”, and for an empty chest as „Skrzynka 0/60” above „Skrzynka jest pusta.”"
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

// --- time, earning loops -----------------------------------------------------------------------------

// Catches the resurrection line drawn in each card again, or anywhere but under the heading „Drużyna”
// and above the cards (D-217).
test("the team's resurrection line stands once, under „Drużyna” and above the cards, and in no card", async () => {
  // decision: D-217 "Siedziba shows that line once, in the same words and roles, under the heading „Drużyna” and above the cards of the characters while the team holds a character, and the card of a character on Siedziba holds none of it."
  await withPage(async (page) => {
    await mount(page, propsOf(teamOf(3)));
    const lines = all(page.root, ".team-resurrection");
    assert.equal(lines.length, 1);
    const [line] = lines;
    assert.equal(line.textContent, "Wskrzeszenie drużyny: użycia 3 z 3");
    assert.equal(line.previousElementSibling.textContent, "Drużyna");
    assert.ok(line.nextElementSibling.classList.contains("team-list"));
    for (const card of all(page.root, ".team-member"))
      assert.equal(card.textContent.includes("Wskrzeszenie"), false);
  });
});

// Catches a resurrection line drawn once and left, a line that loses `danger` late or early, and a
// line rebuilt as a new element at every reading, which would drop what stands on it (D-217).
test("the resurrection line follows the clock's moment in the very same element, in danger at zero uses", async () => {
  // decision: D-217 "The screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny: użycia {u} z {c}” in `text-secondary` while the stock of uses is full, „Wskrzeszenie drużyny: użycia {u} z {c}, następne za {g} godz. {m} min czasu realnego” in `text-secondary` while the stock is not full and a use is left, and „Wskrzeszenie drużyny: użycia 0 z {c}, następne za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` at zero uses"
  // decision: D-217 "Siedziba shows that line once, in the same words and roles, under the heading „Drużyna” and above the cards of the characters while the team holds a character"
  await withPage(async (page) => {
    const nextAt = NOW + 8 * HOUR;
    const state = withResurrection(teamOf(1), 3, nextAt);
    const { screen } = await mount(page, propsOf(state));
    const [line] = all(page.root, ".team-resurrection");
    assert.equal(
      line.textContent,
      `Wskrzeszenie drużyny: użycia 0 z 3, następne za 8 godz. 0 min czasu realnego${WARNING}`,
    );
    assert.ok(line.classList.contains("danger"));

    await inAct(() => screen.update(propsOf(state, nextAt - 30 * MINUTE)));
    assert.equal(
      line.textContent,
      `Wskrzeszenie drużyny: użycia 0 z 3, następne za 30 min czasu realnego${WARNING}`,
    );
    assert.ok(line.classList.contains("danger"));

    await inAct(() => screen.update(propsOf(state, nextAt)));
    assert.equal(
      line.textContent,
      "Wskrzeszenie drużyny: użycia 1 z 3, następne za 4 godz. 0 min czasu realnego",
    );
    assert.equal(line.classList.contains("danger"), false);
    assert.equal(all(page.root, ".team-resurrection")[0], line);
  });
});

// Catches an earning loop line and „Zatrzymaj” drawn at a character that has no earning loop, a button that does not
// reach the page's `stop` with the character's number, and the line of a stop missing after it (D-244,
// D-245).
test("a running earning loop shows its line with „Zatrzymaj”, which asks the page to stop that character; a stopped earning loop shows „W obozie” with its line under it", async () => {
  // decision: D-44 "The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons"
  // decision: D-244 "A running earning loop shows on the card and the screen of its character, and at that character in the section „Kto idzie” of the card of a map, as one line in the role `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, with the button „Zatrzymaj”"
  // decision: D-245 "„Zatrzymaj” is a destructive button that acts at once on the click: the items carried in the map run going on are lost, its loot stays out of the chest, the practice D-189 gives enters the character skills, and the character returns to its ordinary state"
  // decision: D-245 "On the character's card and screen, until the next send or start of that character and after a load of the saved game state too, stands in the role `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, or „Pętla zatrzymana” where the earning loop gathered no practice"
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
    assert.deepEqual(
      all(ola.querySelector(".team-member-status"), "p").map(
        (line) => `${line.className}: ${line.textContent}`,
      ),
      [
        "team-member-state: W obozie",
        "team-member-stopped: Pętla zatrzymana · wprawa: Jedzenie +4",
      ],
    );
    assert.equal(
      rowOf(page.root, "Ala").querySelector(".team-member-stopped"),
      null,
    );
  });
});

// Catches a card that says nothing of a character in the camp or in a manual map run, a line other
// than the one of the frame of the screen Postać, and a card not drawn anew when the minute of the
// map run, its death or its completion changes while nothing else does (D-447).
test("each card shows what its character does: „W obozie”, „Przejście: {mapa} · minuta {m}” with its end, drawn anew at each minute, death and completion", async () => {
  // decision: D-447 "The card of a character on Siedziba shows that same line, always, under the character's name and archetype: „W obozie”, „Przejście: {mapa} · minuta {m}” with its ending, or the line of its earning loop with „Zatrzymaj”, and after a stop of its earning loop „W obozie” with the line of the stop under it (D-245)."
  await withPage(async (page) => {
    const state = teamOf(2);
    const { screen } = await mount(page, propsOf(state));
    const stateOf = (name) =>
      text(rowOf(page.root, name), ".team-member-state");
    assert.equal(stateOf("Ala"), "W obozie");
    assert.equal(stateOf("Ola"), "W obozie");

    const entered = sentInto(state, 2);
    await inAct(() => screen.update(propsOf(entered)));
    assert.equal(stateOf("Ala"), "W obozie");
    assert.equal(stateOf("Ola"), "Przejście: Las · minuta 0");

    const at = (run) =>
      propsOf({ ...entered, run: { ...entered.run, ...run } });
    // Nothing but the run's minute changes: the card is drawn anew all the same.
    await inAct(() => screen.update(at({ minute: 17 })));
    assert.equal(stateOf("Ola"), "Przejście: Las · minuta 17");
    await inAct(() =>
      screen.update(at({ minute: 17, death: { minute: 17, cause: "cold" } })),
    );
    assert.equal(stateOf("Ola"), "Przejście: Las · minuta 17 · postać zginęła");
    await inAct(() =>
      screen.update(at({ minute: 30, completion: { minute: 30 } })),
    );
    assert.equal(
      stateOf("Ola"),
      "Przejście: Las · minuta 30 · mapa rozwiązana",
    );
  });
});

// Catches the green frame and the dot left on a card whose character is in no earning loop, missing
// on one that is, or drawn in another role than `positive` (D-39); the card at rest keeps its frame in
// `control-border` and no background of its own, so the block's `panel` shows (styleguide rule "The
// section „Drużyna” of Siedziba").
test("a card whose character's earning loop goes on has a frame in positive and the dot „●” beside its name; another card has its frame in control-border and no dot", async () => {
  // decision: D-39 "`positive` also stands as the frame of the card of a character on Siedziba, and as the dot „●” beside its name, while the earning loop of that character goes on; that frame is no frame at a text in the sense of D-279 and takes no colour from the text beside it."
  // decision: D-42 "`control-border`, `focus`, `character` and `window-frame`, the frame of the window of a rule or of a rule group, have a contrast ratio of at least 3:1 against the colours they touch, and so have `tile-revealed` against `tile-hidden`, the frame of the plaque of a discovery in the scene, in `discovery`, against `panel`, and the frame of the card of a character in an earning loop on Siedziba, in `positive`, against `panel` and `highlight`, the colours it touches"
  await withPage(async (page) => {
    const style = page.document.createElement("style");
    style.textContent = gameStylesheetText().replaceAll(
      ":hover",
      ".is-hovered",
    );
    page.document.head.append(style);
    const { getComputedStyle } = page.document.defaultView;
    await mount(page, propsOf({ ...teamOf(2), loops: { 2: LOOP } }));
    const declared = (element, ...properties) =>
      lastDeclared(page.document, element, ...properties);
    const ala = rowOf(page.root, "Ala");
    const ola = rowOf(page.root, "Ola");
    assert.equal(ala.querySelector(".team-member-dot"), null);
    const dot = ola.querySelector(".team-member-dot");
    assert.equal(dot.textContent, "●");
    assert.equal(dot.getAttribute("aria-hidden"), "true");
    assert.equal(
      dot.previousElementSibling,
      ola.querySelector(".team-member-name"),
    );
    assert.equal(getComputedStyle(dot).color, "var(--positive)");
    assert.equal(declared(ola, "border-color", "border"), "var(--positive)");
    assert.equal(
      declared(ala, "border-color", "border"),
      "var(--frame-width) solid var(--control-border)",
    );
    for (const card of [ala, ola])
      assert.equal(
        declared(card, "background-color", "background"),
        null,
        "no background of its own",
      );
  });
});

// Catches a card that takes no background under the pointer over its link, or one that keeps it on a
// device whose pointer cannot hover, where a tap would leave it lit (D-40; styleguide rule "The section
// „Drużyna” of Siedziba").
test("under the pointer over its link a card takes the background highlight, and on a device that cannot hover it keeps none", async () => {
  // decision: D-280 "The card of a character on Siedziba is, whole, a link named by the character's name to the screen Postać of that character"
  await withPage(async (page) => {
    const style = page.document.createElement("style");
    style.textContent = gameStylesheetText().replaceAll(
      ":hover",
      ".is-hovered",
    );
    page.document.head.append(style);
    await mount(page, propsOf(teamOf(1)));
    const card = rowOf(page.root, "Ala");
    card.querySelector(".team-member-name").classList.add("is-hovered");
    assert.equal(
      lastDeclared(page.document, card, "background-color", "background"),
      "var(--highlight)",
    );
    const touch = [...page.document.styleSheets[0].cssRules]
      .filter((rule) => rule.media?.mediaText === TOUCH)
      .flatMap((rule) => [...rule.cssRules])
      .filter((rule) => card.matches(rule.selectorText))
      .map((rule) => rule.style.getPropertyValue("background"));
    assert.deepEqual(touch, ["transparent"]);
  });
});

// Catches the card's link left the size of the name, so a touch on the card beside the name would open
// nothing, and its buttons under the link's area, so a touch on „Zatrzymaj” would open the screen
// Postać instead (D-280): the stylesheet stretches the name's area over the card and lifts the buttons
// above it. jsdom lays nothing out, so the case reads the rules that do it.
test("the stylesheet stretches the area of the name's link over its card and sets the card's buttons above it", async () => {
  // decision: D-280 "The card of a character on Siedziba is, whole, a link named by the character's name to the screen Postać of that character, on which the menu bar marks Siedziba, on the screen Mapy under each of its addresses the menu bar marks Mapy, and on the screen of a map run the menu bar marks no item; „Zatrzymaj” and „Odbierz” on that card are buttons of their own and open no screen."
  await withPage(async (page) => {
    const style = page.document.createElement("style");
    style.textContent = gameStylesheetText();
    page.document.head.append(style);
    await mount(page, propsOf({ ...teamOf(1), loops: { 1: LOOP } }));
    const card = rowOf(page.root, "Ala");
    const rules = [...page.document.styleSheets[0].cssRules];
    const stretch = rules.find(
      (rule) => rule.selectorText === ".team-member-name::after",
    );
    assert.equal(stretch.style.getPropertyValue("position"), "absolute");
    assert.equal(stretch.style.getPropertyValue("inset"), "0px");
    assert.equal(lastDeclared(page.document, card, "position"), "relative");
    const name = card.querySelector(".team-member-name");
    assert.equal(lastDeclared(page.document, name, "position"), null);
    const stop = buttonLabelled(card, "Zatrzymaj: Ala");
    assert.equal(lastDeclared(page.document, stop, "position"), "relative");
    assert.equal(lastDeclared(page.document, stop, "z-index"), "1");
  });
});

// Catches the focus left on the page once „Zatrzymaj” takes its button away: the keyboard would then
// start the screen again from its top (styleguide, "Focus does not fall to the page").
test("after „Zatrzymaj” the focus stands on the name of that character once its earning loop has stopped", async () => {
  await withPage(async (page) => {
    const state = { ...teamOf(2), loops: { 2: LOOP } };
    let screen = null;
    await inAct(() => {
      screen = createHeadquarters({
        controls: {
          create: () => {},
          // The page stops the earning loop and gives the screen the state at once.
          stop: (characterId) =>
            screen.update(
              propsOf({
                ...state,
                loops: {},
                stoppedLoops: { [characterId]: { eating: 4 } },
              }),
            ),
          closeReport: () => {},
          takePractice: () => {},
        },
        props: propsOf(state),
      });
      page.root.append(screen.element);
    });
    const stop = buttonLabelled(page.root, "Zatrzymaj: Ola");
    stop.focus();
    await press(stop);
    assert.equal(
      globalThis.document.activeElement,
      rowOf(page.root, "Ola").querySelector(".team-member-name"),
    );
  });
});

// Catches a focus moved although the page refused the stop and the button stays where it stood.
test("a stop the page refuses leaves the focus on „Zatrzymaj”", async () => {
  await withPage(async (page) => {
    const state = { ...teamOf(2), loops: { 2: LOOP } };
    await mount(page, propsOf(state));
    const stop = buttonLabelled(page.root, "Zatrzymaj: Ola");
    stop.focus();
    await press(stop);
    assert.equal(globalThis.document.activeElement, stop);
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

/** The texts of the lines of the report in the card of `name`, with whether each stands in danger. */
const reportIn = (root, name) =>
  all(rowOf(root, name), ".away-report-line").map((line) => [
    line.textContent,
    line.classList.contains("danger"),
  ]);

// Catches the lines drawn above „Drużyna” or in another character's card, with the name before them,
// a line not under the character's own lines, `danger` missing or on the wrong line, and the row above
// „Drużyna” missing its sentence or holding a title (D-246).
test("each line of a report stands in its character's card, under its own lines, with no name, the stopped one in danger; above „Drużyna” stands the sentence that counts them", async () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  // decision: D-246 "While the report holds a line, one row above „Drużyna” holds a sentence that counts its lines, each line of an earning loop a death stopped as a loop that stopped and every other line as a loop that went on, in `danger` where a loop stopped and in `positive` otherwise, then „Skrzynka jest pełna.” in `warning` where the chest is full, and one button „Zamknij” that closes the whole report."
  await withPage(async (page) => {
    await mount(page, propsOf(reported()));
    assert.deepEqual(reportIn(page.root, "Ala"), [
      ["5 min · skrzynka: patyk +3", false],
    ]);
    assert.deepEqual(reportIn(page.root, "Ola"), [
      [
        "pętla stanęła po 2 min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 2.",
        true,
      ],
    ]);
    const ola = rowOf(page.root, "Ola");
    assert.equal(
      ola.lastElementChild,
      ola.querySelector(".team-member-report"),
      "the report stands last in the card, under the card's own lines",
    );

    const row = page.root.querySelector(".away-report");
    assert.equal(row.hidden, false);
    assert.equal(row.querySelector("h3"), null, "no title");
    const sentence = row.querySelector(".away-report-summary");
    assert.equal(
      sentence.textContent,
      "Bez ciebie 1 pętla stanęła, 1 chodziła bez przeszkód.",
    );
    assert.ok(sentence.classList.contains("danger"));
    assert.equal(row.querySelectorAll(".away-report-line").length, 0);
    assert.equal(all(row, ".away-report-full").length, 0);
    assert.deepEqual(
      all(row, "button").map((button) => button.textContent),
      ["Zamknij"],
    );
    const sections = all(page.root, ".headquarters > section");
    assert.equal(sections[0], row);
    assert.equal(sections[1].children[0].textContent, "Drużyna");
  });
});

// Catches „Bez ciebie” said of a stop in the open game, a sentence in danger with no loop that stopped,
// and a full chest that is not said once, in the row after the sentence (D-246).
test("a stop in the open game opens the sentence with its count, a report with no stop stands in positive, and a full chest adds „Skrzynka jest pełna.” after the sentence", async () => {
  // decision: D-246 "The sentence reads „Bez ciebie {s} pętla stanęła, {k} chodziła bez przeszkód.” with each count declined — „1 pętla stanęła”, „2 pętle stanęły”, „5 pętli stanęło”, then „1 chodziła”, „2 chodziły”, „5 chodziło” — and a part of zero left out, the part of the loops that went on then reading „{k} pętla chodziła bez przeszkód”, „2 pętle chodziły”, „5 pętli chodziło”; „Bez ciebie” opens it only where every line is a line of a return, and otherwise the sentence opens with its first count."
  // decision: D-246 "An earning loop a death stops in the open game enters the same report, as the one kind of line that is no line of a return, „pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”"
  // decision: D-246 "While the report holds a line, one row above „Drużyna” holds a sentence that counts its lines, each line of an earning loop a death stopped as a loop that stopped and every other line as a loop that went on, in `danger` where a loop stopped and in `positive` otherwise, then „Skrzynka jest pełna.” in `warning` where the chest is full, and one button „Zamknij” that closes the whole report."
  await withPage(async (page) => {
    const state = withChest(
      {
        ...teamOf(2),
        awayReport: [reportLine(2, { stop: { generation: 3, away: false } })],
      },
      { stick: 60 },
    );
    const { screen } = await mount(page, propsOf(state));
    const row = page.root.querySelector(".away-report");
    const sentence = () => row.querySelector(".away-report-summary");
    assert.equal(sentence().textContent, "1 pętla stanęła.");
    assert.ok(sentence().classList.contains("danger"));
    assert.deepEqual(reportIn(page.root, "Ola"), [
      [
        "pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie 3.",
        true,
      ],
    ]);
    const full = all(page.root, ".away-report-full");
    assert.equal(full.length, 1, "said once");
    assert.equal(full[0].textContent, "Skrzynka jest pełna.");
    assert.equal(full[0].previousElementSibling, sentence());

    await inAct(() =>
      screen.update(
        propsOf({
          ...teamOf(2),
          awayReport: [
            reportLine(1, { minutes: 4 }),
            reportLine(2, { minutes: 4 }),
          ],
        }),
      ),
    );
    assert.equal(
      sentence().textContent,
      "Bez ciebie 2 pętle chodziły bez przeszkód.",
    );
    assert.ok(sentence().classList.contains("positive"));
    assert.equal(sentence().classList.contains("danger"), false);
    assert.equal(all(page.root, ".away-report-full").length, 0);
  });
});

// Catches a „Zamknij” that does not reach the page's `closeReport`, a row or lines that stay once the
// page has emptied the report, and focus left on the body once the button is gone, which the next key
// press would lose (D-246).
test("„Zamknij” asks the page to close the report; once the report is empty the row and the lines in the cards go and the focus stands on „Drużyna”", async () => {
  // decision: D-246 "While the report holds a line, one row above „Drużyna” holds a sentence that counts its lines, each line of an earning loop a death stopped as a loop that stopped and every other line as a loop that went on, in `danger` where a loop stopped and in `positive` otherwise, then „Skrzynka jest pełna.” in `warning` where the chest is full, and one button „Zamknij” that closes the whole report."
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
    assert.equal(all(page.root, ".team-member-report").length, 0);
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

// Catches the practice of the earning loop and the map run going on not both in the line, a button on a
// line with nothing waiting, a button that does not carry the name of its character, and one that opens
// the screen Postać: it is a button of its own, not a link (D-280).
test("practice waiting at an earning loop reads in its line in the card with „Odbierz” in `positive` beside it, and a line with none waiting has no button", async () => {
  // decision: D-44 "The screens of the browser view build every button, select list, number field, text field and cell of a pick from the shared controls of `src/browser/view/controls/` — the button in its kinds (the plain button, the destructive button, the button selected in its group, the secondary action (D-275), the tab (D-276), the main look outside a form (D-274) and the button in `positive`), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons, with their text in `danger` at rest, in every layout, and the background `highlight` besides under the pointer, and „Odbierz”, which pays the practice waiting at an earning loop, is the plain button with its text in `positive`"
  // decision: D-39 "`positive` also stands as the text of the button „Odbierz”, which pays the practice waiting at an earning loop, at rest and under the pointer"
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
  // decision: D-246 "The practice waiting in a line is read from that character's earning loop whenever the report is drawn, so it always equals what „Odbierz” would pay at that moment, and after „Odbierz” it and the button are gone until the earning loop gathers more; the rest of the report lies in the game state, so it survives a reload, and a further return before „Zamknij” adds to it; the report shows from one whole game minute of the catch-up, and an earning loop a death stopped opens it at any number of game minutes"
  await withPage(async (page) => {
    await mount(
      page,
      propsOf(waiting({ eating: 4 }, { eating: 1, exploration: 2 })),
    );
    const lines = ["Ala", "Ola"].map((name) =>
      rowOf(page.root, name).querySelector(".away-report-line"),
    );
    assert.deepEqual(
      lines.map((line) => text(line, ".away-report-text")),
      ["5 min · wprawa do odebrania: Eksploracja +2, Jedzenie +5", "3 min"],
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
    assert.equal(take.closest("a"), null, "no link holds the button");
  });
});

// Catches an „Odbierz” that does not reach the page with its character, and a focus left on the
// body once the button is gone with the practice it paid (D-246; styleguide, "Focus does not fall to
// the page"): the name of the card, the element of the card that stays, takes it.
test("„Odbierz” hands the page its character; once nothing waits the button goes and the focus stands on the name of its card", async () => {
  // decision: D-246 "The practice waiting in a line is read from that character's earning loop whenever the report is drawn, so it always equals what „Odbierz” would pay at that moment, and after „Odbierz” it and the button are gone until the earning loop gathers more; the rest of the report lies in the game state, so it survives a reload, and a further return before „Zamknij” adds to it; the report shows from one whole game minute of the catch-up, and an earning loop a death stopped opens it at any number of game minutes"
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
      all(page.root, ".away-report-text").map((line) => line.textContent),
      ["5 min", "3 min"],
    );
    assert.equal(
      globalThis.document.activeElement,
      rowOf(page.root, "Ala").querySelector(".team-member-name"),
    );
  });
});

// Catches practice that is back after a redraw with the earning loop gathering more (D-246): the button
// returns at the next change of the earning loop.
test("the part about practice and „Odbierz” come back when the earning loop gathers more", async () => {
  // decision: D-246 "The practice waiting in a line is read from that character's earning loop whenever the report is drawn, so it always equals what „Odbierz” would pay at that moment, and after „Odbierz” it and the button are gone until the earning loop gathers more; the rest of the report lies in the game state, so it survives a reload, and a further return before „Zamknij” adds to it; the report shows from one whole game minute of the catch-up, and an earning loop a death stopped opens it at any number of game minutes"
  await withPage(async (page) => {
    const { screen } = await mount(page, propsOf(waiting({})));
    assert.equal(buttonNamed(page.root, "Odbierz"), undefined);
    await inAct(() => screen.update(propsOf(waiting({ eating: 1 }))));
    assert.equal(
      text(rowOf(page.root, "Ala"), ".away-report-text"),
      "5 min · wprawa do odebrania: Jedzenie +1",
    );
    assert.ok(buttonLabelled(page.root, "Odbierz: Ala"));
  });
});

// D-246: a line of an earning loop a death stopped has no practice waiting, so it has no button either.
test("a line of an earning loop a death stopped has no „Odbierz”", async () => {
  // decision: D-246 "After being away the player reads a report on Siedziba, one line for each character that had an earning loop, a later earning loop of a character whose earning loop a death stopped opening a line of its own, each line standing in the card of its character in „Drużyna”, under a line, with no name before it, the line of an earning loop a death stopped before a later line of that character: an earning loop a death stopped in `danger`, „pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, and the others in `text`, „{m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa do odebrania: {umiejętność} +{n}”, with „Odbierz” in `positive` where practice waits, a button that opens no screen, with what is empty left out, with „ · wskrzeszenie zużyte” where a resurrection covered a death, {m} in both lines being the game minutes the catch-up passed"
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
  // decision: D-52 "A character has a name, which the player types when creating it; a name that is empty, also once the white space at its start and end is trimmed, creates no character, and two characters may bear the same name"
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(newGame()));
    assert.equal(text(page.root, ".team-add-archetype"), ARCHETYPE);
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
  // decision: D-52 "A character has a name, which the player types when creating it; a name that is empty, also once the white space at its start and end is trimmed, creates no character, and two characters may bear the same name"
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

// Catches a tile that does not open the field in its place, a focus left on the closed tile that a
// touch took away, the field opened anywhere but at the end of the cards (D-54), and „Anuluj” missing
// or drawn as another look than the secondary action (D-275).
test("„+ postać” at the end of the cards opens in its place the field of a name, „Załóż” and „Anuluj”, and the focus moves to the field", async () => {
  // decision: D-275 "An action that opens or leaves a state of a form and stands under that form — „Nie pamiętam hasła”, „Wróć do logowania” and „Anuluj” of the login card — is a secondary action"
  await withPage(async (page) => {
    await mount(page, propsOf(teamOf(2)));
    const list = page.root.querySelector(".team-list");
    assert.equal(nameField(page.root), undefined, "closed at first");
    const add = addTile(page.root);
    assert.equal(add.getAttribute("class"), "button dashed");
    assert.equal(add.closest("li"), list.lastElementChild);
    await press(add);
    const field = nameField(page.root);
    assert.ok(field);
    assert.equal(field.closest("li"), list.lastElementChild);
    assert.equal(globalThis.document.activeElement, field);
    assert.equal(addTile(page.root), undefined);
    assert.equal(text(list.lastElementChild, ".team-add-archetype"), ARCHETYPE);
    const cancel = buttonNamed(list.lastElementChild, "Anuluj");
    assert.equal(cancel.getAttribute("class"), "button secondary");
    assert.deepEqual(
      [...list.lastElementChild.children].map(
        (child) =>
          child.querySelector("input")?.getAttribute("aria-label") ??
          child.textContent,
      ),
      [ARCHETYPE, "Imię nowej postaci", "Załóż", "Anuluj"],
    );
  });
});

// Catches a tile that „Anuluj” or Escape leaves open, a text kept in a field opened again, a character
// created by them, and the focus left on the page once the field is gone (styleguide, "Focus does not
// fall to the page"): the closed „+ postać” in the field's place takes it.
test("„Anuluj” and Escape in the field close the tile with nothing created and the field emptied, and the focus stands on the closed „+ postać”", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(teamOf(1)));
    for (const leave of [
      () => press(buttonNamed(page.root, "Anuluj")),
      () => pressKey(nameField(page.root), "Escape"),
    ]) {
      await press(addTile(page.root));
      await typeInto(nameField(page.root), "Ol");
      await leave();
      assert.equal(nameField(page.root), undefined, "closed");
      assert.equal(globalThis.document.activeElement, addTile(page.root));
      await press(addTile(page.root));
      assert.equal(nameField(page.root).value, "", "the field is empty again");
      await pressKey(nameField(page.root), "Escape");
    }
    assert.deepEqual(calls, []);
  });
});

// Catches a tile left open once a character is created, and the focus left on the page once the field is
// gone: the closed „+ postać” in its place takes it, the new card standing before it.
test("„Załóż” with a name closes the tile, and the focus stands on the closed „+ postać”, after the new card", async () => {
  // decision: D-54 "The characters of the team stand on its list in the order they were created"
  await withPage(async (page) => {
    let screen = null;
    const calls = [];
    const state = teamOf(1);
    await inAct(() => {
      screen = createHeadquarters({
        controls: {
          // The page creates the character and gives the screen the state at once.
          create: (name) => {
            calls.push(name);
            screen.update(propsOf(createCharacter(state, name).state));
          },
          stop: () => {},
          closeReport: () => {},
          takePractice: () => {},
        },
        props: propsOf(state),
      });
      page.root.append(screen.element);
    });
    await press(addTile(page.root));
    await typeInto(nameField(page.root), "Ola");
    await press(buttonNamed(page.root, "Załóż"));
    assert.deepEqual(calls, ["Ola"]);
    assert.equal(nameField(page.root), undefined);
    const list = page.root.querySelector(".team-list");
    assert.deepEqual(
      all(list, ".team-member-name").map((name) => name.textContent),
      ["Ala", "Ola"],
    );
    assert.equal(addTile(page.root).closest("li"), list.lastElementChild);
    assert.equal(globalThis.document.activeElement, addTile(page.root));
  });
});

// Catches an Enter in the field left to the browser: the closed „+ postać” takes the focus at once, and a
// browser presses the focused button with the same key, so the tile would open again at once. jsdom has
// no such default act, so the case reads whether the key's default was spent.
test("Enter in the field creates as „Załóż” does and spends the key, so the closed „+ postać” that takes the focus is not pressed by it", async () => {
  await withPage(async (page) => {
    let screen = null;
    const state = newGame();
    await inAct(() => {
      screen = createHeadquarters({
        controls: {
          create: (name) =>
            screen.update(propsOf(createCharacter(state, name).state)),
          stop: () => {},
          closeReport: () => {},
          takePractice: () => {},
        },
        props: propsOf(state),
      });
      page.root.append(screen.element);
    });
    await typeInto(nameField(page.root), "Ala");
    const { KeyboardEvent } = globalThis.window;
    const enter = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
    });
    await inAct(() => nameField(page.root).dispatchEvent(enter));
    assert.equal(enter.defaultPrevented, true);
    assert.equal(nameField(page.root), undefined, "the tile is closed");
    assert.equal(globalThis.document.activeElement, addTile(page.root));
  });
});

// Catches the field and the button rebuilt at a refresh of the game state: they would lose the text
// typed and the focus the player has in them, at every game minute; and the open tile closed by a
// refresh, which the player did not ask for.
test("the open field keeps its element, its text and its focus, and the button its focus, through every refresh of the state and of the moment", async () => {
  await withPage(async (page) => {
    const state = teamOf(1);
    const { screen } = await mount(page, propsOf(state));
    await press(addTile(page.root));
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

// --- the picture band ------------------------------------------------------------------------

/** The elements of the characters the picture band draws. */
const campMembers = (root) => all(root, ".camp .camp-member");

/** `state` with its character `id` sent into a map run, going. */
const sentInto = (state, id) =>
  send(state, { mapId: "forest", characterId: id }, NOW).state;

// Catches the band standing inside the screen's panel (narrower than the content, with its padding), under
// the heading „Siedziba” instead of over it (D-272), or the sections under it changed by the band: the
// text of the screen is the text of its panel, so the band adds none.
test("the picture band stands over the panel of the screen, the heading under it, and adds no text", async () => {
  // decision: D-389 "The picture band at the top of Siedziba stands across the content"
  // decision: D-389 "The picture band moves as the scene does"
  // decision: D-272 "A picture of the game stands behind the login card"
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

// Catches the picture band made a control: a link, a button or a field in it, a stop in the keyboard's order, a name
// for a reader, or a picture a reader would announce (D-389): the screen's names in „Drużyna” lead
// to the character (D-280), the picture band leads nowhere.
test("the picture band is a picture: nothing in it takes the keyboard or a click, and it is hidden from readers", async () => {
  // decision: D-389 "The picture band moves as the scene does"
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

// Catches a picture band drawn at the size of its picture, or at a fraction of twice it, where the pixels of the
// picture would come out unequal and shake in motion (D-349): the band is 96 px high, its clearing 672 × 48
// pixels of picture drawn at 1344 × 96, the fire of 32 × 32 at 64 × 64, a character's cell 32 wide at 64.
test("the picture band is drawn at twice the pixels of its pictures, in a band 96 px high", async () => {
  // decision: D-389 "The picture band at the top of Siedziba stands across the content"
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

// Catches a screen that does not read the manual map run, which the picture band needs: with it the picture would
// change only at a change of the team or of an earning loop, and not at „Wejdź” and „Zakończ”. Every change of the
// four — „Wejdź”, „Puść w pętlę”, „Zatrzymaj”, „Zakończ” — shows in the picture band at once, and „Drużyna” still lists all.
test("the picture band follows the manual map run and the earning loops, and „Drużyna” lists every character all the while", async () => {
  // decision: D-389 "The characters that stand in it are those"
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

    // The run goes on: a game minute changes nothing the picture band shows.
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
// „Puść w pętlę”, a button that leads to the screen Mapy or a link other than the name of a card.
test("nothing on the screen sends a character or leads to the screen Mapy", async () => {
  // decision: D-330 "The first of the three clicks from Siedziba to a first map run (D-280) is the item „Mapy” of the menu bar"
  // decision: D-53 "The player sends a character to a game map from the card of the map on the screen Mapy, and „Zakończ” returns to the screen Postać of that character"
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
      ["+ postać", "Zamknij", "Zatrzymaj: Ola"],
    );
    // The links of the folded section of credits lead outside the game, not to a screen of the game.
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
    // A new state object of the same team, earning loops, report and moment: only a map run would differ.
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
