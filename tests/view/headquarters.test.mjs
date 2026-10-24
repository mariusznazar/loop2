// The headquarters' pure parts, tested without a browser. Importing the module must not touch
// the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import { chestLines } from "../../dist/public/view/headquarters.js";

test("importing the headquarters touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof chestLines, "function");
});

test("an empty chest shows no line, so the headquarters marks it empty", () => {
  assert.deepEqual(chestLines({ pieces: {} }), []);
  assert.deepEqual(chestLines({ pieces: { stick: 0 } }), []);
});

test("a chest holding pieces shows a line per resource held, in the order of the resources' data", () => {
  assert.deepEqual(chestLines({ pieces: { moss: 2, stick: 5, berry: 0 } }), [
    "patyk: 5",
    "mech: 2",
  ]);
});
