// Review probe: crafted version-9 documents at the strict load, for the content revision and the
// moment the game was made. Run from the review worktree root: node ../probe-load.mjs
import { createCharacter, newGame, withSaveTime } from "./wt/dist/browser/sim/game.js";
import { loadSavedGame, savedGame } from "./wt/dist/browser/sim/saved-game.js";

const results = [];
const record = (name, value) => results.push(`${name}: ${value}`);

const base = withSaveTime(
  createCharacter(newGame(1760000000123), "Ala").state,
  1760000000999,
);
const text = JSON.stringify(savedGame(base));
const fresh = () => JSON.parse(text);

function tryLoad(name, document) {
  try {
    const loaded = loadSavedGame(document);
    record(name, loaded.ok ? `ok ${JSON.stringify(loaded.state.madeAtMs)} ${JSON.stringify(loaded.state.programs.map((p) => p.contentRevision))}` : `refused ${loaded.reason}`);
  } catch (error) {
    record(name, `THREW ${error && error.name}`);
  }
}

// Round trip through JSON text.
tryLoad("round trip", JSON.parse(text));
{
  const loaded = loadSavedGame(JSON.parse(text));
  record("round trip deepEqual", JSON.stringify(loaded.state) === JSON.stringify(base));
}

const revisions = {
  missing: undefined,
  null: null,
  string: "3",
  negative: -1,
  float: 1.5,
  NaN: NaN,
  Infinity: Infinity,
  minusInfinity: -Infinity,
  beyondSafe: 2 ** 53,
  huge: 1e21,
  negZero: -0,
  boolean: true,
  list: [],
  object: {},
  bigint: 3n,
  maxSafe: Number.MAX_SAFE_INTEGER,
};
for (const [name, value] of Object.entries(revisions)) {
  const document = fresh();
  if (name === "missing") delete document.game.programs[0].contentRevision;
  else document.game.programs[0].contentRevision = value;
  tryLoad(`revision ${name}`, document);
}
// Extra keys on an item.
{
  const document = fresh();
  document.game.programs[0].revision = 0;
  tryLoad("item extra key revision", document);
}
{
  const document = JSON.parse(
    text.replace('"contentRevision":0', '"contentRevision":0,"__proto__":{"x":1}'),
  );
  tryLoad("item __proto__ own key", document);
}
{
  const document = JSON.parse(
    text.replace('"contentRevision":0', '"__proto__":{"contentRevision":0}'),
  );
  tryLoad("item revision only as __proto__ key", document);
}
{
  const document = fresh();
  const item = document.game.programs[0];
  delete item.contentRevision;
  document.game.programs[0] = Object.assign(Object.create({ contentRevision: 0 }), item);
  tryLoad("item revision inherited", document);
}
{
  const document = fresh();
  Object.defineProperty(document.game.programs[0], "contentRevision", {
    get() {
      throw new Error("getter ran");
    },
    enumerable: true,
  });
  tryLoad("item revision accessor that throws", document);
}

const moments = {
  missing: undefined,
  null: null,
  string: "1760000000123",
  NaN: NaN,
  Infinity: Infinity,
  minusInfinity: -Infinity,
  float: 1.5,
  beyondSafe: 2 ** 53,
  minusBeyondSafe: -(2 ** 53),
  maxSafe: Number.MAX_SAFE_INTEGER,
  minSafe: Number.MIN_SAFE_INTEGER,
  negative: -5,
  zero: 0,
  negZero: -0,
  farAhead: 8640000000000000,
  object: {},
  bigint: 5n,
};
for (const [name, value] of Object.entries(moments)) {
  const document = fresh();
  if (name === "missing") delete document.game.madeAtMs;
  else document.game.madeAtMs = value;
  tryLoad(`moment ${name}`, document);
}
{
  const document = fresh();
  document.game.madeAt = 0;
  tryLoad("game extra key madeAt", document);
}
{
  const document = fresh();
  delete document.game.madeAtMs;
  document.game.madeAt = 1760000000123;
  tryLoad("game moment under another name", document);
}

// What newGame stores where the page would give a moment the load refuses.
for (const value of [1.5, NaN, Infinity, 2 ** 53, "5"]) {
  try {
    const state = withSaveTime(createCharacter(newGame(value), "Ala").state, 1);
    const loaded = loadSavedGame(JSON.parse(JSON.stringify(savedGame(state))));
    record(`newGame(${String(value)}) then save and load`, loaded.ok ? "ok" : `refused ${loaded.reason}`);
  } catch (error) {
    record(`newGame(${String(value)})`, `THREW ${error && error.name}`);
  }
}

console.log(results.join("\n"));
