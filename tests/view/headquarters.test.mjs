// The headquarters' pure part that stays in its module, tested without a browser. Importing the
// module must not touch the DOM. The other pure functions the headquarters uses are tested in
// team-lines.test.mjs and map-lines.test.mjs.
import assert from "node:assert/strict";
import { test } from "node:test";
import { mapLabel } from "../../dist/browser/view/headquarters.js";

test("importing the headquarters touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof mapLabel, "function");
});

test("a map's label is „Mapa: {name}”, with „ · rozwiązana” once solved, the name from the data", () => {
  assert.equal(mapLabel("forest", false), "Mapa: Las");
  assert.equal(mapLabel("forest", true), "Mapa: Las · rozwiązana");
});
