// The trip plan of a program in React (D-180, D-181, D-264): the folded line with its positions,
// unfolding and folding, and each edit of a position committing the whole program it gives. The
// harness stands first, and every comparison is of plain data (D-268).
import { assert, inAct, typeInto, withPage } from "./page-document.mjs";
import { test } from "node:test";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { TripPlanView } from "../../dist/browser/view/trip-plan.js";
import { emptyProgram } from "../../dist/browser/sim/programs.js";

const OFFERED = ["stick", "berry", "moss"];
const MESSAGE = "Wpisz liczbę całkowitą od 1.";

/** A program of the given trip plan; its other parts are those of an empty program. */
const withTrip = (take, bring = []) => ({
  ...emptyProgram(),
  tripPlan: { take, bring },
});

/** Draws the trip plan of `program` in a root of its own; `commits` collects each program it gives. */
async function draw(document, program, items = OFFERED) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const commits = [];
  await inAct(() =>
    root.render(
      createElement(TripPlanView, {
        program,
        items,
        onCommit: (next) => commits.push(next),
      }),
    ),
  );
  return { root: container, commits };
}

/**
 * Draws the trip plan so that each commit draws the program it gives, as the page does; `commits`
 * collects them. The focus check needs the rows that an edit moves to be drawn anew.
 */
async function drawAgain(document, program, items = OFFERED) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const commits = [];
  const show = (current) =>
    createElement(TripPlanView, {
      program: current,
      items,
      onCommit: (next) => {
        commits.push(next);
        root.render(show(next));
      },
    });
  await inAct(() => root.render(show(program)));
  return { root: container, commits };
}

const lineButton = (root) => root.querySelector(".trip-plan-line button");
const labelled = (root, label) => root.querySelector(`[aria-label="${label}"]`);
const rows = (root) => [...root.querySelectorAll("ol li")];

/** Clicks the element `inAct`, as a browser clicks it. */
const click = (element) =>
  inAct(() => {
    element.click();
  });

test("an empty trip plan folds to the line „Plan wyprawy: pusty” with no icon and no list", async () => {
  await withPage(async ({ document }) => {
    const { root } = await draw(document, withTrip([], []));
    const button = lineButton(root);
    assert.ok(button, "the line holds a button");
    assert.equal(button.textContent, "Plan wyprawy: pusty");
    assert.equal(button.getAttribute("aria-expanded"), "false");
    assert.equal(root.querySelectorAll("img").length, 0, "no icon stands");
    assert.equal(root.querySelectorAll("select").length, 0, "no list stands");
  });
});

test("a folded line shows each position's item icon and count, with Zabierz and Wynieś, and no list", async () => {
  await withPage(async ({ document }) => {
    const { root } = await draw(
      document,
      withTrip(
        [{ item: "stick", count: 5 }],
        [
          { item: "berry", count: 2 },
          { item: "moss", count: 1 },
        ],
      ),
    );
    const icons = [...root.querySelectorAll("img")];
    assert.deepEqual(
      icons.map((icon) => icon.getAttribute("src")),
      ["/icons/wood-stick.svg", "/icons/berry-bush.svg", "/icons/fern.svg"],
      "each position's icon is its resource's file, in its order",
    );
    assert.deepEqual(
      icons.map((icon) => icon.parentElement.textContent),
      ["5", "2", "1"],
      "each icon is followed by its count",
    );
    const text = lineButton(root).parentElement.textContent;
    assert.ok(text.includes("Zabierz"), "the line names the take list");
    assert.ok(text.includes("Wynieś"), "the line names the bring list");
    assert.equal(lineButton(root).getAttribute("aria-expanded"), "false");
    assert.equal(root.querySelectorAll("select").length, 0, "no list stands");
  });
});

test("a click on the line unfolds the lists, and a second click folds them again", async () => {
  await withPage(async ({ document }) => {
    const { root } = await draw(
      document,
      withTrip([{ item: "stick", count: 5 }]),
    );
    await click(lineButton(root));
    assert.equal(lineButton(root).getAttribute("aria-expanded"), "true");
    assert.equal(
      root.querySelectorAll("select").length,
      1,
      "the take row stands",
    );
    assert.ok(labelled(root, "Zabierz: dodaj przedmiot"), "the take list adds");
    assert.ok(labelled(root, "Wynieś: dodaj przedmiot"), "the bring list adds");
    await click(lineButton(root));
    assert.equal(lineButton(root).getAttribute("aria-expanded"), "false");
    assert.equal(
      root.querySelectorAll("select").length,
      0,
      "the lists fold away",
    );
  });
});

test("each list offers the items it does not hold, and its add button stays off when it holds all", async () => {
  await withPage(async ({ document }) => {
    const { root } = await draw(
      document,
      withTrip([
        { item: "stick", count: 5 },
        { item: "berry", count: 1 },
      ]),
    );
    await click(lineButton(root));
    const [first, second] = [...root.querySelectorAll("select")];
    const values = (select) =>
      [...select.options].map((option) => option.value);
    assert.deepEqual(
      values(first),
      ["stick", "moss"],
      "the stick row offers its own item and the one not held",
    );
    assert.deepEqual(
      values(second),
      ["berry", "moss"],
      "the berry row offers its own item and the one not held",
    );
    assert.deepEqual(
      [...first.options].map((option) => option.textContent),
      ["patyk", "mech"],
      "the options name the items by their data",
    );
    assert.equal(
      labelled(root, "Zabierz: dodaj przedmiot").disabled,
      false,
      "moss is still to add",
    );
    assert.equal(
      labelled(root, "Wynieś: dodaj przedmiot").disabled,
      false,
      "the bring list is empty",
    );
  });
  await withPage(async ({ document }) => {
    const { root } = await draw(
      document,
      withTrip([
        { item: "stick", count: 5 },
        { item: "berry", count: 1 },
        { item: "moss", count: 1 },
      ]),
    );
    await click(lineButton(root));
    assert.equal(
      labelled(root, "Zabierz: dodaj przedmiot").disabled,
      true,
      "every item is held by the take list",
    );
  });
});

test("Dodaj przedmiot commits the list with the first item it does not hold, at count 1", async () => {
  await withPage(async ({ document }) => {
    const { root, commits } = await draw(
      document,
      withTrip([
        { item: "stick", count: 5 },
        { item: "berry", count: 1 },
      ]),
    );
    await click(lineButton(root));
    await click(labelled(root, "Zabierz: dodaj przedmiot"));
    assert.deepEqual(commits, [
      withTrip([
        { item: "stick", count: 5 },
        { item: "berry", count: 1 },
        { item: "moss", count: 1 },
      ]),
    ]);
  });
});

test("a count typed and left commits it; a count that is no whole number from 1 keeps the previous one and shows the message", async () => {
  await withPage(async ({ document, window }) => {
    const { root, commits } = await draw(
      document,
      withTrip([{ item: "stick", count: 5 }]),
    );
    await click(lineButton(root));
    const count = labelled(root, "Zabierz: liczba");
    await inAct(() => count.focus());
    await typeInto(count, "0");
    await inAct(() => count.blur());
    assert.deepEqual(commits, [], "the zero commits nothing");
    assert.equal(count.value, "0", "the typed text stays in the field");
    assert.equal(count.getAttribute("aria-invalid"), "true");
    const message = count.parentElement.querySelector(".input-field-message");
    assert.equal(
      message.textContent,
      MESSAGE,
      "the message stands under the field",
    );
    assert.equal(message.hidden, false, "the message is shown");

    await inAct(() => count.focus());
    await typeInto(count, "2.4");
    await inAct(() =>
      count.dispatchEvent(
        new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      ),
    );
    assert.deepEqual(commits, [], "a fraction commits nothing");

    await inAct(() => count.focus());
    await typeInto(count, "7");
    await inAct(() => count.blur());
    assert.deepEqual(commits, [withTrip([{ item: "stick", count: 7 }])]);
    assert.equal(
      count.getAttribute("aria-invalid"),
      null,
      "the message goes with a valid count",
    );
    assert.equal(message.hidden, true);
  });
});

test("the item select commits the position with the item picked", async () => {
  await withPage(async ({ document }) => {
    const { root, commits } = await draw(
      document,
      withTrip([
        { item: "stick", count: 5 },
        { item: "berry", count: 1 },
      ]),
    );
    await click(lineButton(root));
    const first = root.querySelector("select");
    await inAct(() => {
      first.value = "moss";
      first.dispatchEvent(
        new first.ownerDocument.defaultView.Event("change", { bubbles: true }),
      );
    });
    assert.deepEqual(commits, [
      withTrip([
        { item: "moss", count: 5 },
        { item: "berry", count: 1 },
      ]),
    ]);
  });
});

test("↑ and ↓ move a position, and the first one's ↑ and the last one's ↓ are off", async () => {
  await withPage(async ({ document }) => {
    const plan = withTrip([
      { item: "stick", count: 5 },
      { item: "berry", count: 1 },
      { item: "moss", count: 2 },
    ]);
    const { root, commits } = await draw(document, plan);
    await click(lineButton(root));
    const [top, middle, bottom] = rows(root);
    const button = (row, label) =>
      [...row.querySelectorAll("button")].find(
        (each) => each.getAttribute("aria-label") === label,
      );
    assert.equal(button(top, "Zabierz: w górę").disabled, true);
    assert.equal(button(bottom, "Zabierz: w dół").disabled, true);
    await click(button(middle, "Zabierz: w górę"));
    assert.deepEqual(
      commits[0],
      withTrip([
        { item: "berry", count: 1 },
        { item: "stick", count: 5 },
        { item: "moss", count: 2 },
      ]),
    );
    await click(button(middle, "Zabierz: w dół"));
    assert.deepEqual(
      commits[1],
      withTrip([
        { item: "stick", count: 5 },
        { item: "moss", count: 2 },
        { item: "berry", count: 1 },
      ]),
    );
  });
});

test("an edit that moves a position keeps the focus on the control it leaves in its place", async () => {
  await withPage(async ({ document }) => {
    const { root, commits } = await drawAgain(
      document,
      withTrip([
        { item: "stick", count: 5 },
        { item: "berry", count: 1 },
        { item: "moss", count: 2 },
      ]),
    );
    await click(lineButton(root));
    const middleUp = labelled(rows(root)[1], "Zabierz: w górę");
    await click(middleUp);
    assert.equal(commits.length, 1, "the move commits once");
    // The berry row is now the first: its ↑ is off, so the focus goes to its select.
    const first = rows(root)[0].querySelector("select");
    assert.equal(first.value, "berry");
    assert.equal(
      document.activeElement,
      first,
      "the focus stays on the moved position",
    );
    await click(labelled(rows(root)[0], "Zabierz: w dół"));
    // The berry row is now second: its ↓ stays on, so the focus goes to that button.
    assert.equal(
      document.activeElement,
      labelled(rows(root)[1], "Zabierz: w dół"),
      "the focus follows the position to its ↓",
    );
  });
});

test("a count typed as the number shown commits nothing", async () => {
  await withPage(async ({ document }) => {
    const { root, commits } = await draw(
      document,
      withTrip([{ item: "stick", count: 5 }]),
    );
    await click(lineButton(root));
    const count = labelled(root, "Zabierz: liczba");
    await inAct(() => count.focus());
    await typeInto(count, "5.0");
    await inAct(() => count.blur());
    assert.deepEqual(commits, [], "the same count is no edit");
    assert.equal(count.getAttribute("aria-invalid"), null);
  });
});

test("Usuń is the destructive button of its position and commits the list without it", async () => {
  await withPage(async ({ document }) => {
    const { root, commits } = await draw(
      document,
      withTrip([
        { item: "stick", count: 5 },
        { item: "berry", count: 1 },
      ]),
    );
    await click(lineButton(root));
    const remove = [...rows(root)[0].querySelectorAll("button")].find(
      (each) => each.getAttribute("aria-label") === "Zabierz: usuń przedmiot",
    );
    assert.equal(remove.textContent, "Usuń");
    assert.ok(
      remove.classList.contains("destructive"),
      "it is the destructive look",
    );
    await click(remove);
    assert.deepEqual(commits, [withTrip([{ item: "berry", count: 1 }])]);
  });
});
