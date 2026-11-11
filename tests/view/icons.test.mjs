// Icon files as untrusted input (spec sections 6 and 9.2): the check is run on the real files
// and on made-up files holding each forbidden form, so that it can fail.
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ICON_CREDITS,
  ICON_SOURCE_COMMIT,
} from "../../dist/browser/view/credits.js";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import { RESOURCES } from "../../dist/browser/sim/data/resources.js";
import { CAMPFIRE } from "../../dist/browser/sim/data/campfire.js";
import { CreditsSection } from "../../dist/browser/view/credits-section.js";

const ICONS = fileURLToPath(new URL("../../assets/icons/", import.meta.url));

const NAMESPACES = [
  ' xmlns="http://www.w3.org/2000/svg"',
  ' xmlns:xlink="http://www.w3.org/1999/xlink"',
];

/** Returns the reasons an SVG text is not safe to draw; an empty list means it passes. */
function violations(svg) {
  let text = svg;
  for (const declaration of NAMESPACES) text = text.replace(declaration, "");
  const found = [];
  if (!/^\s*<svg[\s>]/.test(text)) found.push("not an svg document");
  if (/<script/i.test(text)) found.push("script element");
  if (/<foreignObject/i.test(text)) found.push("foreignObject element");
  if (/\son[a-z]+\s*=/i.test(text)) found.push("event attribute");
  if (/<!DOCTYPE/i.test(text)) found.push("document type declaration");
  if (/<!ENTITY/i.test(text)) found.push("entity declaration");
  if (/<\?xml-stylesheet/i.test(text)) found.push("style sheet instruction");
  if (/<style/i.test(text)) found.push("style element");
  if (/@import/i.test(text)) found.push("css import");
  if (/(?:xlink:)?href\s*=(?!\s*["'])/i.test(text)) found.push("unquoted href");
  for (const match of text.matchAll(/(?:xlink:)?href\s*=\s*(["'])(.*?)\1/gi)) {
    if (!match[2].startsWith("#")) found.push("href outside the file");
  }
  for (const match of text.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
    if (!match[2].startsWith("#")) found.push("url( outside the file");
  }
  if (/https?:|data:|\/\//i.test(text)) found.push("external reference");
  return found;
}

const files = readdirSync(ICONS).filter((name) => name.endsWith(".svg"));

test("every icon file passes the untrusted-input rules", () => {
  assert.ok(files.length > 0, "no icon files found");
  for (const name of files) {
    assert.deepEqual(violations(readFileSync(ICONS + name, "utf8")), [], name);
  }
});

const OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">';
const CRAFTED = {
  "a script": `${OPEN}<script>alert(1)</script></svg>`,
  "an onload attribute": `<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"></svg>`,
  "a foreignObject": `${OPEN}<foreignObject><div/></foreignObject></svg>`,
  "an external href": `${OPEN}<image href="https://example.com/a.png"/></svg>`,
  "an external xlink:href": `${OPEN}<use xlink:href="other.svg#a"/></svg>`,
  "an external url(": `${OPEN}<path style="fill:url(https://example.com/a)"/></svg>`,
  "a data: URI": `${OPEN}<image href="data:image/png;base64,AAAA"/></svg>`,
  "a protocol-relative address": `${OPEN}<path d="M0 0" data-x="//example.com"/></svg>`,
  "an xmlns with another value": '<svg xmlns="http://example.com/svg"></svg>',
  "a <!DOCTYPE": `${OPEN}<!DOCTYPE svg></svg>`,
  "an <!ENTITY": `${OPEN}<!ENTITY x SYSTEM "file.txt"></svg>`,
  "an <?xml-stylesheet": `${OPEN}<?xml-stylesheet type="text/css" href="#s"?></svg>`,
  "a <style element": `${OPEN}<style>path{fill:red}</style></svg>`,
  "an @import": `${OPEN}<path style="@import 'a.css'"/></svg>`,
  "an unquoted href": `${OPEN}<use href=other.svg#a /></svg>`,
  "an unquoted xlink:href": `${OPEN}<use xlink:href=other.svg#a /></svg>`,
};

for (const [form, svg] of Object.entries(CRAFTED)) {
  test(`the check rejects an svg holding ${form}`, () => {
    assert.notDeepEqual(violations(svg), []);
  });
}

test("the check passes an svg holding only the two allowed namespace declarations", () => {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#a"/><path style="fill:url(#a)"/></svg>';
  assert.deepEqual(violations(svg), []);
});

/** The one colour the icon shapes are drawn in, light on the grey revealed tile. */
const LIGHT = "#f4f4f5";
const ALLOWED_ATTRIBUTES = ["xmlns", "viewBox", "d", "fill"];

test("every icon file is a light shape without a background: svg and path elements, allowed attributes only", () => {
  assert.ok(files.length > 0, "no icon files found");
  for (const name of files) {
    const svg = readFileSync(ICONS + name, "utf8");
    const elements = new Set(
      [...svg.matchAll(/<([A-Za-z][\w:-]*)/g)].map((match) => match[1]),
    );
    assert.deepEqual([...elements].sort(), ["path", "svg"], name);
    for (const match of svg.matchAll(/\s([A-Za-z][\w:-]*)\s*=/g)) {
      assert.ok(
        ALLOWED_ATTRIBUTES.includes(match[1]),
        `${name}: attribute ${match[1]}`,
      );
    }
    assert.doesNotMatch(svg, /d="M0 0h512v512H0z"/, `${name}: background path`);
    const paths = [...svg.matchAll(/<path\b([^>]*)>/g)];
    assert.ok(paths.length > 0, name);
    for (const path of paths)
      assert.match(
        path[1],
        new RegExp(`\\sfill="${LIGHT}"`),
        `${name}: a path not filled ${LIGHT}`,
      );
  }
});

const CHANGES = "zmienione (bez tła, jasny kolor)";

test("each icon credit records that the file was changed from its source", () => {
  for (const [icon, credit] of Object.entries(ICON_CREDITS))
    assert.equal(credit.changes, CHANGES, icon);
});

/** A stand-in for the few DOM calls the footer makes: elements keep what is appended to them. */
function fakeDocument() {
  return {
    createElement(tag) {
      return {
        tag,
        children: [],
        append(...items) {
          this.children.push(...items);
        },
      };
    },
  };
}
const textOf = (node) =>
  typeof node === "string"
    ? node
    : (node.textContent ?? node.children.map(textOf).join(""));

async function builtFooter() {
  const { createFooter, footerCredits } =
    await import("../../dist/browser/view/footer.js");
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    return {
      items: createFooter().children[0].children,
      credits: footerCredits(),
    };
  } finally {
    globalThis.document = saved;
  }
}

/** Each icon's title as its page on game-icons.net gives it (environment facts game-icons-*-title). */
const TITLES = {
  "wood-stick": "Wood stick icon",
  "berry-bush": "Berry bush icon",
  fern: "Fern icon",
  flax: "Flax icon",
  campfire: "Campfire icon",
  binoculars: "Binoculars icon",
  hiking: "Hiking icon",
  "direction-sign": "Direction sign icon",
  grab: "Grab icon",
  "claw-hammer": "Claw hammer icon",
  "match-tip": "Match tip icon",
  logging: "Logging icon",
  meal: "Meal icon",
  "deadly-strike": "Deadly strike icon",
  "boot-kick": "Boot kick icon",
  dodge: "Dodge icon",
  "wood-pile": "Wood Pile icon",
};

/**
 * The icons of the actions, one line each in the footer, after the campfire's: named by the actions
 * that show the icon, in the order of the data (actions.ts).
 */
const ACTION_ICONS = [
  { name: "Eksploruj", icon: "binoculars" },
  { name: "Wędruj", icon: "hiking" },
  { name: "Idź, Idź — ognisko", icon: "direction-sign" },
  { name: "Zbierz, Obchód", icon: "grab" },
  { name: "Wytwórz — ognisko", icon: "claw-hammer" },
  { name: "Zapal — ognisko, Zapal — patyk", icon: "match-tip" },
  { name: "Zasil — ognisko", icon: "logging" },
  { name: "Zjedz — jagoda", icon: "meal" },
  { name: "Uderz — patyk", icon: "deadly-strike" },
  { name: "Kopnij", icon: "boot-kick" },
  { name: "Odskocz", icon: "dodge" },
];

/**
 * Everything the data gives an icon, in the footer's order: the resources, the campfire, the
 * extinguished campfire, the actions.
 */
const NAMED = [
  ...Object.values(RESOURCES),
  CAMPFIRE,
  CAMPFIRE.extinguished,
  ...ACTION_ICONS,
];

test("each footer line names the icon by its title on game-icons.net and says after the licence that it was changed", async () => {
  const { items, credits } = await builtFooter();
  assert.ok(credits.length > 0);
  assert.equal(items.length, NAMED.length);
  assert.equal(items.length, credits.length);
  items.forEach((item, i) => {
    const credit = credits[i];
    const title = TITLES[NAMED[i].icon];
    assert.ok(title, NAMED[i].icon);
    assert.equal(
      textOf(item),
      `${NAMED[i].name}: „${title}”, ${credit.author}, game-icons.net, CC BY 3.0, ${CHANGES}`,
    );
  });
});

test("the footer credits the campfire's icon, by Lorc, after the four resources' icons", async () => {
  const { items } = await builtFooter();
  assert.equal(items.length, NAMED.length);
  assert.equal(
    textOf(items[4]),
    "ognisko: „Campfire icon”, Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)",
  );
  const links = items[4].children.filter((node) => typeof node !== "string");
  assert.equal(links[0].href, "https://game-icons.net/1x1/lorc/campfire.html");
});

test("the footer credits the extinguished campfire's icon, by Delapouite, right after the campfire's", async () => {
  const { items } = await builtFooter();
  assert.equal(
    textOf(items[5]),
    "ognisko wygasłe: „Wood Pile icon”, Delapouite, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)",
  );
  const links = items[5].children.filter((node) => typeof node !== "string");
  assert.equal(
    links[0].href,
    "https://game-icons.net/1x1/delapouite/wood-pile.html",
  );
});

test("the footer credits the actions' icons after the two campfires', one line each, in the order of the data", async () => {
  const { items } = await builtFooter();
  assert.deepEqual(
    items.slice(6).map((item) => textOf(item).split(":")[0]),
    ACTION_ICONS.map((action) => action.name),
  );
});

test("the campfire's data names the icon file campfire.svg and its title on game-icons.net", () => {
  assert.equal(CAMPFIRE.icon, "campfire");
  assert.equal(CAMPFIRE.iconTitle, "Campfire icon");
});

test("the extinguished campfire's data names the icon file wood-pile.svg and its title on game-icons.net", () => {
  assert.equal(CAMPFIRE.extinguished.icon, "wood-pile");
  assert.equal(CAMPFIRE.extinguished.iconTitle, "Wood Pile icon");
});

test("the footer links open in a new tab, without opener or referrer", async () => {
  const { items } = await builtFooter();
  for (const item of items) {
    const links = item.children.filter((node) => typeof node !== "string");
    assert.equal(links.length, 2);
    for (const link of links) {
      assert.equal(link.target, "_blank", link.href);
      assert.equal(link.rel, "noopener noreferrer", link.href);
    }
  }
});

test("each icon the data names, the campfire's included, exists as a file", () => {
  const names = NAMED.map((named) => named.icon);
  assert.ok(names.includes(CAMPFIRE.icon));
  for (const icon of names) assert.ok(existsSync(`${ICONS}${icon}.svg`), icon);
});

test("each action of the data names an icon and its title, and the icon file exists", () => {
  for (const [id, action] of Object.entries(ACTIONS)) {
    assert.ok(action.icon, `${id} names no icon`);
    assert.ok(action.iconTitle, `${id} names no icon title`);
    assert.ok(
      existsSync(`${ICONS}${action.icon}.svg`),
      `${id}: ${action.icon}`,
    );
  }
});

test("each icon file has a credit with an author and the source commit", () => {
  assert.match(ICON_SOURCE_COMMIT, /^[0-9a-f]{40}$/);
  for (const named of NAMED) {
    const credit = ICON_CREDITS[named.icon];
    assert.ok(credit, named.icon);
    assert.ok(credit.author.length > 0, named.icon);
    assert.match(credit.sourceUrl, /^https:\/\/game-icons\.net\//, named.icon);
  }
  for (const name of files)
    assert.ok(ICON_CREDITS[name.replace(/\.svg$/, "")], name);
});

// --- the folded credits: a React section, read as markup, which needs no document ---------------

/** The section as markup; no `document` stands, as the section needs none. */
const sectionMarkup = () => renderToStaticMarkup(createElement(CreditsSection));

/** The text of a piece of markup: its tags dropped, its entities left as written. */
const textOfMarkup = (markup) => markup.replace(/<[^>]*>/g, "");

/** The `<li>` elements of the section's markup. */
const itemsOf = (markup) =>
  [...markup.matchAll(/<li>(.*?)<\/li>/g)].map((match) => match[1]);

test("the section is a folded details whose summary reads Autorzy grafiki, with no state", () => {
  assert.equal(globalThis.document, undefined);
  const markup = sectionMarkup();
  assert.match(
    markup,
    /^<details><summary>Autorzy grafiki<\/summary><ul class="credits">.*<\/ul><\/details>$/,
  );
  assert.doesNotMatch(markup, /<details[^>]*\sopen/, "folded by default");
  assert.doesNotMatch(markup, /\son[a-z]+=|<script/i, "no script");
});

test("each line of the section is the footer's line: the icon's title, author, game-icons.net, CC BY 3.0 and the change", () => {
  const items = itemsOf(sectionMarkup());
  assert.equal(items.length, NAMED.length);
  items.forEach((item, i) => {
    assert.equal(
      textOfMarkup(item),
      `${NAMED[i].name}: „${TITLES[NAMED[i].icon]}”, ${ICON_CREDITS[NAMED[i].icon].author}, game-icons.net, CC BY 3.0, ${CHANGES}`,
    );
  });
});

test("the section links each icon's page and the licence, each opening in a new tab without opener or referrer", () => {
  const items = itemsOf(sectionMarkup());
  items.forEach((item, i) => {
    const links = [...item.matchAll(/<a ([^>]*)>(.*?)<\/a>/g)];
    assert.equal(links.length, 2, NAMED[i].icon);
    assert.equal(
      links[0][1],
      `href="${ICON_CREDITS[NAMED[i].icon].sourceUrl}" target="_blank" rel="noopener noreferrer"`,
    );
    assert.equal(links[0][2], "game-icons.net");
    assert.equal(
      links[1][1],
      'href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer"',
    );
    assert.equal(links[1][2], "CC BY 3.0");
  });
});
