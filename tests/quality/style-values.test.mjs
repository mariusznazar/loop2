import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const read = (path) => readFile(new URL(path, root));
const values = async () =>
  JSON.parse(await read("src/browser/view/design-tokens.json"));

// Frozen task Q9-Q11/Q18-Q19: accidental transcription and attribution errors
// must fail before these records become the generated stylesheet's input.
const roles = {
  page: ["background", "#09090b", "page background"],
  panel: ["background", "#18181b", "chronicle and map-run end"],
  highlight: ["background", "#27272a", "highlighted row"],
  divider: ["other", "#27272a", "section dividers"],
  "control-border": ["other", "#71717b", "Q8"],
  "text-strong": ["text", "#f4f4f5", "names and headings"],
  text: ["text", "#d4d4d8", "body text"],
  "text-secondary": ["text", "#9f9fa9", "descriptions"],
  "text-label": ["text", "#8d8d97", "Q8"],
  "text-disabled": ["text", "#52525c", "disabled items"],
  positive: ["text", "#00bc7d", "POTEM"],
  warning: ["text", "#fe9a00", "no rule matches"],
  danger: ["text", "#ff6467", "freezing and starving"],
  discovery: ["text", "#ffd230", "Odkryto"],
  "player-change": ["text", "#c4b4ff", "Dodano"],
  character: ["other", "#ffd230", "character tile outline"],
  "tile-hidden": ["other", "#18181b", "hidden terrain tile"],
  "tile-revealed": ["other", "#71717b", "Q10 preview choice A"],
  "link-highlight": ["other", "#f4f4f5", "Q10 preview choice A"],
  depleted: ["other", 0.35, "Q10 preview choice A"],
  focus: ["other", "#f4f4f5", "Q10 preview choice A"],
  selected: ["other", "#d4d4d8", "selected group button border"],
  "tile-edge": ["other", "#27272a", "terrain tile edge"],
};
const tokens = {
  "font-ui": ["Geist", "Q11"],
  "font-mono": ["Geist Mono", "Q11"],
  "font-size-label": ["11px", "dates and labels"],
  "font-size-description": ["12px", "buttons, descriptions and chronicle"],
  "font-size-body": ["13px", "menu and body text"],
  "font-size-heading": ["14px", "names and panel headings"],
  "font-size-map-title": ["15px", "map title"],
  "font-size-game-title": ["16px", "game name"],
  "space-2": ["2px", "Q11 spacing scale"],
  "space-4": ["4px", "Q11 spacing scale"],
  "space-8": ["8px", "Q11 spacing scale"],
  "space-12": ["12px", "Q11 spacing scale"],
  "space-16": ["16px", "Q11 spacing scale"],
  "space-24": ["24px", "Q11 spacing scale"],
  "space-32": ["32px", "Q11 spacing scale"],
  "font-weight-regular": [400, "Q19"],
  "font-weight-medium": [500, "Q19"],
  "border-width": ["1px", "Q11"],
  "bar-width": ["2px", "Q11"],
  "character-width": ["4px", "Q19"],
  "step-width": ["2px", "Q19"],
  "step-dash": ["5 4", "Q19"],
  "link-width": ["1.5px", "Q19"],
  "focus-width": ["2px", "Q10 preview choice A"],
  "focus-offset": ["2px", "Q10 preview choice A"],
};

test("the value input preserves all 23 accepted role names, kinds and values", async () => {
  const data = await values();
  assert.deepEqual(Object.keys(data).sort(), ["roles", "tokens"]);
  assert.deepEqual(Object.keys(data.roles).sort(), Object.keys(roles).sort());
  for (const [name, [kind, value, source]] of Object.entries(roles)) {
    assert.deepEqual(Object.keys(data.roles[name]).sort(), [
      "kind",
      "source",
      "value",
    ]);
    assert.equal(data.roles[name].kind, kind, name);
    assert.equal(data.roles[name].value, value, name);
    assert.ok(data.roles[name].source.includes(source), `${name}: ${source}`);
  }
});

test("the value input supplies each accepted non-role value with its own source", async () => {
  const data = await values();
  assert.deepEqual(Object.keys(data.tokens).sort(), Object.keys(tokens).sort());
  for (const [name, [value, source]] of Object.entries(tokens)) {
    assert.deepEqual(Object.keys(data.tokens[name]).sort(), [
      "source",
      "value",
    ]);
    assert.equal(data.tokens[name].value, value, name);
    assert.ok(data.tokens[name].source.includes(source), `${name}: ${source}`);
    assert.ok(!(name in data.roles), name);
  }
  for (const record of [
    ...Object.values(data.roles),
    ...Object.values(data.tokens),
  ]) {
    assert.match(record.source, /2026-10-20/);
    assert.match(record.source, /Q(?:8|9|10|11|19)/);
  }
  for (const name of ["control-border", "text-label"]) {
    assert.match(data.roles[name].source, /https:\/\/www\.w3\.org\/TR\//);
  }
  for (const [name, record] of Object.entries(data.roles)) {
    if (
      !["tile-revealed", "link-highlight", "depleted", "focus"].includes(name)
    ) {
      assert.ok(record.source.includes("https://kantarion.bieda.it/"), name);
    }
  }
});

test("coincident values remain independently editable for distinct purposes", async () => {
  const { roles, tokens } = await values();
  roles.discovery.value = "#ffffff";
  roles.divider.value = "#ffffff";
  roles.focus.value = "#ffffff";
  tokens["bar-width"].value = "8px";
  assert.equal(roles.character.value, "#ffd230");
  assert.equal(roles.highlight.value, "#27272a");
  assert.equal(roles["tile-edge"].value, "#27272a");
  assert.equal(roles["link-highlight"].value, "#f4f4f5");
  assert.equal(tokens["step-width"].value, "2px");
  assert.equal(tokens["focus-width"].value, "2px");
  assert.equal(tokens["focus-offset"].value, "2px");
});

test("vendored fonts are complete WOFF2 data accompanied by pinned byte provenance", async () => {
  const source = (await read("assets/fonts/SOURCE.md")).toString("utf8");
  assert.match(source, /v1\.8\.1/);
  for (const [local, upstream, sha256] of [
    [
      "Geist",
      "Geist/webfonts/Geist%5Bwght%5D.woff2",
      "2ffebe993e969069a9789d15164b7715d42491b5835516c5e3b935d5f81b05f1",
    ],
    [
      "GeistMono",
      "GeistMono/webfonts/GeistMono%5Bwght%5D.woff2",
      "afaacc4c5fbba89d2ebf7a02dc4070208540874592a5504d57175782fe893101",
    ],
  ]) {
    const bytes = await read(`assets/fonts/${local}.woff2`);
    assert.ok(bytes.length > 48, local);
    assert.equal(bytes.subarray(0, 4).toString("ascii"), "wOF2", local);
    assert.equal(bytes.readUInt32BE(8), bytes.length, local);
    assert.ok(bytes.readUInt16BE(12) > 0, local);
    assert.equal(bytes.readUInt16BE(14), 0, local);
    assert.ok(bytes.readUInt32BE(20) > 0, local);
    assert.ok(!/^\s*(?:<!doctype|<html)/i.test(bytes.toString("utf8")), local);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), sha256);
    assert.ok(source.includes(sha256));
    assert.ok(
      source.includes(
        `https://raw.githubusercontent.com/vercel/geist-font/e1f671c727f6de7e97c1e1d26dbb44f349c19459/fonts/${upstream}`,
      ),
    );
  }
});

test("the upstream OFL includes its copyright and redistribution conditions", async () => {
  const bytes = await read("assets/fonts/OFL.txt");
  const license = bytes.toString("utf8");
  const source = (await read("assets/fonts/SOURCE.md")).toString("utf8");
  assert.match(license, /Copyright/);
  assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/);
  assert.match(license, /each copy\s+contains the above copyright notice/);
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    "c683bfbcc7e087f5d37a54ef628f10387c451a83ddc459b151403a164ac46c90",
  );
  assert.ok(source.includes(createHash("sha256").update(bytes).digest("hex")));
  assert.ok(
    source.includes(
      "https://raw.githubusercontent.com/vercel/geist-font/e1f671c727f6de7e97c1e1d26dbb44f349c19459/OFL.txt",
    ),
  );
});
