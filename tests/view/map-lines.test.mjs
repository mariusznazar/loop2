// The map lines' pure functions, tested without a browser. Importing the module must not touch
// the DOM.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  sendMaps,
  solvingSentence,
} from "../../dist/browser/view/map-lines.js";

test("importing the map lines touches no DOM: Node has no document and the import succeeded", () => {
  assert.equal(typeof globalThis.document, "undefined");
  assert.equal(typeof sendMaps, "function");
});

test("the condition sentence is the map's name, a dash and the solving text of its data", () => {
  assert.equal(
    solvingSentence("forest"),
    "Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu",
  );
});

test("the headquarters hides maps until their prerequisites are solved; the editor keeps its full map list", () => {
  assert.deepEqual(sendMaps(), ["forest", "forestDeep"]);
  assert.deepEqual(sendMaps([]), ["forest"]);
  assert.deepEqual(sendMaps(["forest"]), ["forest", "forestDeep"]);
});
