import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const TOKENS = readFileSync(
  new URL("../../src/browser/tokens.css", import.meta.url),
  "utf8",
);

/** The value of a design token, as `tokens.css` declares it. */
function token(name) {
  const match = new RegExp(`${name}: (#[0-9a-fA-F]{6});`).exec(TOKENS);
  assert.ok(match, `${name} stands in tokens.css as a six-digit colour`);
  return match[1];
}

/** The contrast ratio of two colours, as WCAG 2.2 defines it (1.4.11 asks 3:1 of a graphic). */
function contrast(a, b) {
  const luminance = (hex) => {
    const channel = (at) => {
      const value = Number.parseInt(hex.slice(at, at + 2), 16) / 255;
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
  };
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

// To do 5, the condition of the rule D of D-271 for the frost: its outline stands out from the snow it
// lies on by 3:1. The snow colours are fixed literals, each with its source: `#bccae5` (today's snow
// without a tint), `#bacfd0` (under the cool tint at streak 0) and `#ddc69e` (under the full gold) are
// in the task document (question 10, carried question 4); `#c2cebe` (t = 0.4) and `#d4caa5` (t = 0.8)
// are in table (a) of the preview of the values of appearance the task cites, and my measurement of the
// scene as the browser draws it on 2026-11-12 gave `#c2cebe` and `#d4caa6`. What this test guards: the
// token of the outline against those snow samples, measured once. It does not follow the tint tokens:
// a change to `--scene-tint-*` that changes the snow under the frost passes unseen, and its author
// measures the snow again.
test("the frost's outline stands out from the snow at every tint, 3:1 at least", () => {
  const SNOW = {
    "no tint": "#bccae5",
    "streak 0": "#bacfd0",
    "t = 0.4": "#c2cebe",
    "t = 0.8, the required streak": "#d4caa5",
    "full gold, a completion": "#ddc69e",
  };
  const outline = token("--scene-frost-outline");
  for (const [name, snow] of Object.entries(SNOW))
    assert.ok(
      contrast(outline, snow) >= 3,
      `${name}: ${contrast(outline, snow)}`,
    );
});

// A hand check of the helper on the two colours the preview measured: 3.21 on the snow without a tint.
test("the contrast helper reads the preview's measured 3.21:1 of the outline on the snow without a tint", () => {
  assert.ok(Math.abs(contrast("#3c7289", "#bccae5") - 3.21) < 0.01);
  assert.equal(contrast("#000000", "#ffffff"), 21);
});
