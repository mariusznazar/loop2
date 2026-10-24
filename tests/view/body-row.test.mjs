// The row of the body and the backpack under the status row (spec Decision 3, "What the player
// reads beside it"; task, To do 14): values cut down, never rounded, with a decimal comma; a value
// below the threshold of chill or hunger in `danger`; the backpack's pieces of its cap.
import assert from "node:assert/strict";
import { test } from "node:test";
import { backpackText, bodyValues } from "../../dist/public/view/body-row.js";

/** The texts of the body row joined as the row shows them. */
function joined(body) {
  return bodyValues(body)
    .map((value) => value.text)
    .join(" · ");
}

/** The character of a map run with the given backpack and carrying capacity. */
function character(backpack, carryingCapacity = 15) {
  return {
    archetypeId: "elementalMage",
    at: { q: 0, r: 0 },
    traits: { carryingCapacity },
    backpack: { stick: 0, berry: 0, moss: 0, fiber: 0, ...backpack },
  };
}

test("the body row reads temperature, satiety and health as the task's example", () => {
  assert.equal(
    joined({ temperature: 36.8, satiety: 82, health: 100 }),
    "Temperatura 36,8 °C · Sytość 82 % · Zdrowie 100",
  );
});

test("temperature is cut down to tenths, never rounded up", () => {
  assert.equal(
    bodyValues({ temperature: 36.976, satiety: 100, health: 100 })[0].text,
    "Temperatura 36,9 °C",
  );
  assert.equal(
    bodyValues({ temperature: 37.0, satiety: 100, health: 100 })[0].text,
    "Temperatura 37,0 °C",
  );
});

test("a chilled 34.99 °C shows as „34,9” in danger; 35.0 is not chilled", () => {
  const chilled = bodyValues({ temperature: 34.99, satiety: 100, health: 50 });
  assert.deepEqual(chilled[0], { text: "Temperatura 34,9 °C", danger: true });
  const warm = bodyValues({ temperature: 35.0, satiety: 100, health: 50 });
  assert.deepEqual(warm[0], { text: "Temperatura 35,0 °C", danger: false });
});

test("satiety and health are cut down to whole numbers", () => {
  const values = bodyValues({
    temperature: 36.5,
    satiety: 82.999999,
    health: 99.95,
  });
  assert.equal(values[1].text, "Sytość 82 %");
  assert.equal(values[2].text, "Zdrowie 99");
});

test("satiety below 30 stands in danger and 30 does not; health never does", () => {
  const starving = bodyValues({ temperature: 36.5, satiety: 29.4, health: 3 });
  assert.deepEqual(starving[1], { text: "Sytość 29 %", danger: true });
  assert.deepEqual(starving[2], { text: "Zdrowie 3", danger: false });
  assert.equal(starving[0].danger, false);
  const fed = bodyValues({ temperature: 36.5, satiety: 30, health: 3 });
  assert.deepEqual(fed[1], { text: "Sytość 30 %", danger: false });
});

test("an empty backpack reads „Plecak 0/15”", () => {
  assert.equal(backpackText(character({})), "Plecak 0/15");
});

test("a backpack holding items reads its count, its cap and each held item in the data's order", () => {
  assert.equal(
    backpackText(character({ berry: 2, stick: 5 })),
    "Plecak 7/15: patyk 5, jagoda 2",
  );
  assert.equal(
    backpackText(character({ fiber: 1, berry: 3 })),
    "Plecak 4/15: jagoda 3, włókno 1",
  );
});

test("the cap is the character's carrying capacity", () => {
  assert.equal(backpackText(character({ moss: 2 }, 20)), "Plecak 2/20: mech 2");
});

/** A document making elements with just what the body row uses: no browser in Node. */
function fakeDocument() {
  return {
    createElement(tag) {
      const classes = new Set();
      return {
        tag,
        children: [],
        textContent: "",
        set className(value) {
          classes.clear();
          for (const name of value.split(" ")) if (name) classes.add(name);
        },
        get className() {
          return [...classes].join(" ");
        },
        classList: {
          toggle(name, force) {
            if (force) classes.add(name);
            else classes.delete(name);
          },
          contains: (name) => classes.has(name),
        },
        append(...items) {
          this.children.push(...items);
        },
      };
    },
  };
}

/** The body row built on a fake document and shown the given body and backpack. */
async function shownRow(body, backpack) {
  const { createBodyRow } = await import("../../dist/public/view/body-row.js");
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    const row = createBodyRow();
    row.update({ run: { body, character: character(backpack) } });
    const [bodyText, backpackLine] = row.element.children;
    const values = bodyText.children.filter((node) => typeof node !== "string");
    return { row, values, backpackLine };
  } finally {
    globalThis.document = saved;
  }
}

test("the row on the screen marks only the value below its threshold as danger, and updates in place", async () => {
  const { row, values, backpackLine } = await shownRow(
    { temperature: 34.99, satiety: 82, health: 40 },
    { stick: 5, berry: 2 },
  );
  assert.deepEqual(
    values.map((value) => value.textContent),
    ["Temperatura 34,9 °C", "Sytość 82 %", "Zdrowie 40"],
  );
  assert.deepEqual(
    values.map((value) => value.classList.contains("danger")),
    [true, false, false],
  );
  assert.equal(backpackLine.textContent, "Plecak 7/15: patyk 5, jagoda 2");

  row.update({
    run: {
      body: { temperature: 36.2, satiety: 12, health: 40 },
      character: character({}),
    },
  });
  assert.deepEqual(
    values.map((value) => value.classList.contains("danger")),
    [false, true, false],
  );
  assert.equal(values[1].textContent, "Sytość 12 %");
  assert.equal(backpackLine.textContent, "Plecak 0/15");
});
