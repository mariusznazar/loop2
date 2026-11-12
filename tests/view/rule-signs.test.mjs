// The signs at the rules of the copy of a map run (D-308, D-310) on
// jsdom through tests/view/page-document.mjs: which rows stand as winning or running, the bar of
// each row and header, the reason, and where the signs do not stand. The look itself, the colours and
// the order of the backgrounds under the pointer, is checked in the browser (D-88); one case here
// reads the order of the rules of the stylesheet, which that look rests on. Every comparison is of
// plain data (D-268).
import { assert, inAct, withPage } from "./page-document.mjs";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  createCharacter,
  end,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { createProgramPanel } from "../../dist/browser/view/program-panel.js";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const SENT = { mapId: "forest", characterId: 1 };
const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const NEVER = { kind: "hereBelow", resource: "stick", value: 0 };
const act = (kind) => ({ kind });
const rule = (id, condition, action) => ({ id, condition, action });
const group = (id, condition, rules) => ({
  id,
  name: `Group ${id}`,
  condition,
  rules,
});
const program = (...groups) => ({
  tripPlan: { take: [], bring: [] },
  nextGroupId: 100,
  nextRuleId: 1000,
  groups,
});

const EXPLORE = rule(7, ALWAYS, act("explore"));
const WANDER = rule(8, ALWAYS, act("wander"));
const EAT = rule(9, ALWAYS, act("eat"));
const NEVER_RULE = rule(10, NEVER, act("explore"));

/** The panel of the screen of a map run (`mode`), the copy edits being real simulation calls. */
async function wired({ root }, start, mode = "run") {
  const game = {
    state: start,
    apply(result) {
      game.state = result.state;
      game.panel.update(game.state, result.events);
    },
    change: (result) => inAct(() => game.apply(result)),
  };
  const refused = () => {
    throw new Error("the case calls no other control");
  };
  game.panel = createProgramPanel(
    {
      editCopy: (edited) => game.apply(setProgram(game.state, edited)),
      editProgram: refused,
      createProgram: refused,
      renameProgram: refused,
      deleteProgram: refused,
      saveCopy: refused,
      saveCopyAsNew: refused,
      discardCopy: refused,
      switchProgram: refused,
    },
    mode,
  );
  game.root = game.panel.element;
  root.append(game.root);
  await inAct(() => game.panel.update(game.state, []));
  return game;
}

/** A game whose program 1 holds `groups`, the character Ala in the team, sent to the forest. */
function sentWith(...groups) {
  const created = createCharacter(newKnowingGame(), "Ala").state;
  const set = setProgram(created, program(...groups)).state;
  return send(set, SENT, REAL_MS).state;
}

const rowOf = (root, id) => root.querySelector(`[data-rule="${id}"]`);
const headerOf = (root, id) =>
  root.querySelector(`[data-group="${id}"] .rule-list-header`);
const classes = (element) => [...element.classList].sort();
const reasonOf = (row) =>
  row.querySelector(".rule-reason")?.textContent ?? null;
const signed = (root) => [
  ...root.querySelectorAll(
    ".rule-list-row.winning, .rule-list-row.running, [class*='bar-'], .rule-reason",
  ),
];

// Catches the winning row not standing out, the bar of a row below the winner going missing, the
// reason missing beside an amber bar and a reason standing beside the other bars.
test("the copy stands with the winner, a bar at each row and header, and the reason of the rule that cannot start", async () => {
  await withPage(async (page) => {
    const game = await wired(
      page,
      sentWith(
        group(1, ALWAYS, [EAT, EXPLORE, WANDER]),
        group(2, NEVER, [NEVER_RULE]),
      ),
    );
    const { root } = game;
    assert.deepEqual(classes(rowOf(root, 9)), ["bar-blocked", "rule-list-row"]);
    assert.equal(reasonOf(rowOf(root, 9)), "brakuje 1 × jagoda");
    assert.deepEqual(classes(rowOf(root, 7)), [
      "bar-go",
      "rule-list-row",
      "winning",
    ]);
    assert.deepEqual(
      classes(rowOf(root, 8)),
      ["bar-go", "rule-list-row"],
      "a rule below the winner that could start has the green bar and no background",
    );
    assert.deepEqual(classes(rowOf(root, 10)), ["bar-unmet", "rule-list-row"]);
    assert.equal(reasonOf(rowOf(root, 10)), null);
    assert.deepEqual(classes(headerOf(root, 1)), [
      "bar-go",
      "rule-list-header",
    ]);
    assert.deepEqual(classes(headerOf(root, 2)), [
      "bar-unmet",
      "rule-list-header",
    ]);
  });
});

// Catches the running row never drawn, drawn while its rule is also the winner, and a fix of the
// copy not showing at once.
test("the rule whose action goes on stands as running while another rule wins, and an edit of the copy shows at once", async () => {
  await withPage(async (page) => {
    const game = await wired(page, sentWith(group(1, ALWAYS, [EXPLORE])));
    assert.ok(rowOf(game.root, 7).classList.contains("winning"));
    assert.equal(game.root.querySelector(".running"), null);

    const edited = program(group(1, ALWAYS, [WANDER, EXPLORE]));
    await game.change(setProgram(game.state, edited));
    assert.deepEqual(classes(rowOf(game.root, 8)), [
      "bar-go",
      "rule-list-row",
      "winning",
    ]);
    assert.deepEqual(classes(rowOf(game.root, 7)), [
      "bar-go",
      "rule-list-row",
      "running",
    ]);
  });
});

// Catches the bar of the open row going with its background and the open row losing its place.
test("an open row keeps its bar and its classes of state, which the stylesheet lets give way", async () => {
  await withPage(async (page) => {
    const game = await wired(
      page,
      sentWith(group(1, ALWAYS, [EAT, EXPLORE, WANDER])),
    );
    await inAct(() => rowOf(game.root, 7).click());
    assert.deepEqual(classes(rowOf(game.root, 7)), [
      "bar-go",
      "open",
      "rule-list-row",
      "winning",
    ]);
    assert.deepEqual(classes(rowOf(game.root, 9)), [
      "bar-blocked",
      "rule-list-row",
    ]);
  });
});

// Catches signs standing beside a saved program opened during a map run (D-174) and on Programy.
test("a saved program picked during a map run and the screen Programy show no signs", async () => {
  await withPage(async (page) => {
    const run = sentWith(group(1, ALWAYS, [EAT, EXPLORE]));
    const game = await wired(page, run);
    assert.ok(signed(game.root).length > 0, "precondition: the copy has signs");
    const list = game.root.querySelector('select[aria-label="Program:"]');
    const { Event } = list.ownerDocument.defaultView;
    const { set } = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(list),
      "value",
    );
    await inAct(() => {
      set.call(list, "1");
      list.dispatchEvent(new Event("change", { bubbles: true }));
    });
    assert.ok(rowOf(game.root, 7), "precondition: a saved program is shown");
    assert.deepEqual(signed(game.root), []);
  });
  await withPage(async (page) => {
    const game = await wired(
      page,
      sentWith(group(1, ALWAYS, [EAT, EXPLORE])),
      "programs",
    );
    assert.ok(rowOf(game.root, 7), "precondition: Programy shows the rules");
    assert.deepEqual(signed(game.root), []);
  });
});

// Catches the signs going at the end of the map run: after a death they stand, counted on the
// stopped minute, until „Zakończ”, after which the saved program shows none.
test("the signs stand on the screen after a death and go with „Zakończ”", async () => {
  await withPage(async (page) => {
    const game = await wired(page, sentWith(group(1, ALWAYS, [EAT, EXPLORE])));
    await game.change({
      state: {
        ...game.state,
        run: { ...game.state.run, death: { minute: 3, cause: "cold" } },
      },
      events: [],
    });
    assert.deepEqual(classes(rowOf(game.root, 7)), [
      "bar-go",
      "rule-list-row",
      "winning",
    ]);
    assert.equal(reasonOf(rowOf(game.root, 9)), "brakuje 1 × jagoda");
    await game.change(end(game.state));
    assert.deepEqual(signed(game.root), []);
  });
});

// Catches a reorder of the rules of the stylesheet that lets the pointer cover the state of a row
// or the state cover the open row (D-308): of rules of equal weight the later wins, so the pointer
// must come first, then the states, then the open row.
test("the stylesheet puts the background under the pointer before the states, and the open row after them", () => {
  const sheet = readFileSync(
    new URL("../../src/browser/styles.css", import.meta.url),
    "utf8",
  );
  const place = (selector) => {
    const found = sheet.search(
      new RegExp(`^${selector.replace(/[.]/g, "\\.")}[,\\s{]`, "m"),
    );
    assert.ok(found >= 0, `${selector} stands in the stylesheet`);
    return found;
  };
  assert.ok(place(".rule-list-row:hover") < place(".rule-list-row.winning"));
  assert.ok(place(".rule-list-row:hover") < place(".rule-list-row.running"));
  assert.ok(place(".rule-list-row.winning") < place(".rule-list-row.open"));
  assert.ok(place(".rule-list-row.running") < place(".rule-list-row.open"));
});
