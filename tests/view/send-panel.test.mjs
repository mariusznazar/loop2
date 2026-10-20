import assert from "node:assert/strict";
import { test } from "node:test";
import { ARCHETYPES } from "../../dist/public/sim/data/archetypes.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { createSendPanel } from "../../dist/public/view/send-panel.js";
import { installDOM } from "./dom-support.mjs";

test("every send button names its data target and sends it once through a native control", (t) => {
  const document = installDOM(t);
  const calls = [];
  const panel = createSendPanel((target) => calls.push(target));
  const expected = Object.keys(ARCHETYPES).flatMap((archetypeId) =>
    Object.keys(MAPS).map((mapId) => ({ archetypeId, mapId })),
  );
  assert.ok(expected.length > 0);
  assert.equal(panel.children.length, expected.length);
  for (const [index, target] of expected.entries()) {
    const [who, where, button] = panel.children[index].children;
    assert.equal(who.textContent, ARCHETYPES[target.archetypeId].name);
    assert.equal(where.textContent, `Mapa: ${MAPS[target.mapId].name}`);
    assert.equal(button.tagName, "BUTTON");
    assert.equal(button.type, "button");
    assert.equal(button.textContent, "Wyślij");
    assert.ok(button.className.split(" ").includes("control"));
    assert.ok(!button.className.split(" ").includes("destructive-button"));
    button.focus();
    button.click();
    assert.equal(document.activeElement, button);
    assert.deepEqual(calls, expected.slice(0, index + 1));
    button.disabled = true;
    button.click();
    assert.deepEqual(calls, expected.slice(0, index + 1));
  }
});
