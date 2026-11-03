// The list of programs on the screen Programy (task ekrany-i-menu, To do 5 and 14; questions 5 and 15;
// D-165, D-166, D-167, D-169) on jsdom through tests/view/page-document.mjs (D-264): which elements
// the list builds, which program it marks, what its acts hand the page and which name the name rule
// refuses. Real focus order and rendering are the browser check's (D-88), so a focus case here holds
// only what jsdom shows.
import { assert, inAct, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { newGame } from "../../dist/browser/sim/game.js";
import { createProgramList } from "../../dist/browser/view/program-list.js";

// --- the page ------------------------------------------------------------------------------

const PROGRAM = newGame().programs[0].program;

/** The player's programs: „Program” with number 1 and „Las nocą” with number 3, a gap between. */
const TWO = [
  { id: 1, name: "Program", program: PROGRAM },
  { id: 3, name: "Las nocą", program: PROGRAM },
];
const ONE = [{ id: 1, name: "Program", program: PROGRAM }];

const propsOf = (programs, chosenId = 3) => ({ programs, chosenId });

/** Builds the list in the page's body; `calls` counts what the list handed the page. */
async function mount({ root }, props) {
  const calls = [];
  let list = null;
  await inAct(() => {
    list = createProgramList({
      onCreate: () => {
        calls.push(["create"]);
      },
      onRename: (programId, name) => {
        calls.push(["rename", programId, name]);
      },
      onDelete: (programId) => {
        calls.push(["delete", programId]);
      },
      props,
    });
    root.append(list.element);
  });
  return { list, calls };
}

/** Clicks inside act; React's work on an event shows only through act. */
function press(target) {
  assert.ok(target, "what the case presses stands");
  const { Event } = target.ownerDocument.defaultView;
  return inAct(() =>
    target.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true }),
    ),
  );
}

const buttonNamed = (root, text) =>
  [...root.querySelectorAll("button")].find(
    (button) => button.textContent === text,
  );
const links = (root) => [...root.querySelectorAll(".program-list-item")];
const nameField = (root) => root.querySelector(".input-field input");

// --- the list ------------------------------------------------------------------------------

test("each program is a link to its own number's address, in the list's order", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(TWO));
    assert.deepEqual(
      links(page.root).map((link) => [
        link.textContent,
        link.getAttribute("href"),
      ]),
      [
        ["Program", "#/programy/1"],
        ["Las nocą", "#/programy/3"],
      ],
    );
  });
});

test("only the chosen program is marked with aria-current, and none is marked without one", async () => {
  await withPage(async (page) => {
    const { list } = await mount(page, propsOf(TWO, 3));
    assert.deepEqual(
      links(page.root).map((link) => link.getAttribute("aria-current")),
      [null, "page"],
    );
    await inAct(() => list.update(propsOf(TWO, null)));
    assert.deepEqual(
      links(page.root).map((link) => link.getAttribute("aria-current")),
      [null, null],
    );
  });
});

test("Usuń is inactive while the list holds one program and active beside two (D-167)", async () => {
  await withPage(async (page) => {
    await mount(page, propsOf(ONE, 1));
    const remove = buttonNamed(page.root, "Usuń");
    assert.ok(remove, "Usuń stands beside the one program");
    assert.equal(remove.disabled, true);
  });
  await withPage(async (page) => {
    await mount(page, propsOf(TWO, 3));
    const remove = buttonNamed(page.root, "Usuń");
    assert.ok(remove, "Usuń stands beside two programs");
    assert.equal(remove.disabled, false);
    assert.equal(remove.className, "button destructive");
  });
});

test("Usuń hands the chosen program's number to the page, and Nowy program hands it the act", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Usuń"));
    await press(buttonNamed(page.root, "Nowy program"));
    assert.deepEqual(calls, [["delete", 3], ["create"]]);
  });
});

// --- the name field ------------------------------------------------------------------------

test("Zmień nazwę opens the field with the chosen program's name, and a second press closes it", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    assert.equal(nameField(page.root), null);
    await press(buttonNamed(page.root, "Zmień nazwę"));
    assert.equal(nameField(page.root).value, "Las nocą");
    assert.equal(page.document.activeElement, nameField(page.root));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    assert.equal(nameField(page.root), null);
    assert.deepEqual(calls, []);
  });
});

test("Zapisz hands a name the name rule takes to the page and closes the field", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "Las zimą");
    await press(buttonNamed(page.root, "Zapisz"));
    assert.deepEqual(calls, [["rename", 3, "Las zimą"]]);
    assert.equal(nameField(page.root), null);
  });
});

test("a chosen program keeps its own name, letter case changed, without a refusal", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "las nocą");
    assert.equal(
      page.root.querySelector(".input-field-message").textContent,
      "",
    );
    await press(buttonNamed(page.root, "Zapisz"));
    assert.deepEqual(calls, [["rename", 3, "las nocą"]]);
  });
});

test("a name another program bears is refused in the field, and Zapisz hands nothing on", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "program");
    assert.equal(
      page.root.querySelector(".input-field-message").textContent,
      "Program o tej nazwie już istnieje.",
    );
    assert.equal(nameField(page.root).getAttribute("aria-invalid"), "true");
    await press(buttonNamed(page.root, "Zapisz"));
    assert.deepEqual(calls, []);
    assert.notEqual(nameField(page.root), null);
  });
});

test("an empty name is refused in the field with its own message", async () => {
  await withPage(async (page) => {
    const { calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "   ");
    assert.equal(
      page.root.querySelector(".input-field-message").textContent,
      "Wpisz nazwę programu.",
    );
    await press(buttonNamed(page.root, "Zapisz"));
    assert.deepEqual(calls, []);
  });
});

test("the name field leaves when another program is chosen, and nothing is handed on", async () => {
  await withPage(async (page) => {
    const { list, calls } = await mount(page, propsOf(TWO, 3));
    await press(buttonNamed(page.root, "Zmień nazwę"));
    await typeInto(nameField(page.root), "Inna");
    await inAct(() => list.update(propsOf(TWO, 1)));
    assert.equal(nameField(page.root), null);
    assert.deepEqual(calls, []);
  });
});
