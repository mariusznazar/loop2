// Icon files as untrusted input (D-27, `icon-file-content`): the check is run on the real files
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
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import { CAMPFIRE } from "../../dist/browser/sim/data/campfire.js";
import { CREATURES } from "../../dist/browser/sim/data/creatures.js";
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

/**
 * How each icon file differs from its source. The files copied from the source repository had a
 * black background removed and the shape drawn light; `wood-pile.svg` was taken from its page as
 * the download with no background, so only its colour was changed.
 */
const CHANGES_OF = { "wood-pile": "zmienione (zmieniony kolor)" };
const changesOf = (icon) => CHANGES_OF[icon] ?? CHANGES;

test("each icon credit says how the file differs from its source, the one taken with no background by its colour alone", () => {
  for (const [icon, credit] of Object.entries(ICON_CREDITS))
    assert.equal(credit.changes, changesOf(icon), icon);
});

// --- the folded credits: a React section, read as markup, which needs no document ---------------

/** The section as markup; no `document` stands, as the section needs none. */
const sectionMarkup = () => renderToStaticMarkup(createElement(CreditsSection));

/** The text of a piece of markup: its tags dropped, its entities left as written. */
const textOfMarkup = (markup) => markup.replace(/<[^>]*>/g, "");

/** The `<li>` elements of the section's markup. */
const itemsOf = (markup) =>
  [...markup.matchAll(/<li>(.*?)<\/li>/g)].map((match) => match[1]);

/** The links of one credit: their attribute text and their text. */
const linksOf = (item) =>
  [...item.matchAll(/<a ([^>]*)>(.*?)<\/a>/g)].map((match) => ({
    attributes: match[1],
    text: match[2],
  }));

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
  "wolf-head": "Wolf head icon",
  "bandage-roll": "Bandage roll icon",
  "first-aid-kit": "First aid kit icon",
};

/**
 * The icons of the items, one line each, the first lines of the section: the four resources' and the
 * bandage's, whose icon is the first aid kit's and which no map holds, in the order of the data
 * (items.ts).
 */
const ITEM_ICONS = [
  { name: "patyk", icon: "wood-stick" },
  { name: "jagoda", icon: "berry-bush" },
  { name: "mech", icon: "fern" },
  { name: "włókno", icon: "flax" },
  { name: "opatrunek", icon: "first-aid-kit" },
];

/** Where the lines of the section after the items' stand: the two campfires' and the actions'. */
const CAMPFIRE_AT = ITEM_ICONS.length;
const ACTIONS_AT = CAMPFIRE_AT + 2;

/**
 * The icons of the actions, one line each in the section, after the campfire's: named by the actions
 * that show the icon, in the order of the data (actions.ts); „Opatrz” brings the roll of bandage, and
 * „Wytwórz” joins „Wytwórz — ognisko”, whose icon it shares.
 */
const ACTION_ICONS = [
  { name: "Eksploruj", icon: "binoculars" },
  { name: "Wędruj", icon: "hiking" },
  { name: "Idź, Idź — ognisko", icon: "direction-sign" },
  { name: "Zbierz, Obchód", icon: "grab" },
  { name: "Wytwórz — ognisko, Wytwórz", icon: "claw-hammer" },
  { name: "Zapal — ognisko, Zapal — patyk", icon: "match-tip" },
  { name: "Zasil — ognisko", icon: "logging" },
  { name: "Zjedz — jagoda", icon: "meal" },
  { name: "Opatrz", icon: "bandage-roll" },
  { name: "Uderz — patyk", icon: "deadly-strike" },
  { name: "Kopnij", icon: "boot-kick" },
  { name: "Odskocz", icon: "dodge" },
];

/** The icon of the creatures, one line after the actions' (creatures.ts). */
const CREATURE_ICONS = [{ name: "wilk", icon: "wolf-head" }];

/**
 * Everything the data gives an icon, in the section's order: the items, the campfire, the
 * extinguished campfire, the actions, the creatures.
 */
const NAMED = [
  ...ITEM_ICONS,
  CAMPFIRE,
  CAMPFIRE.extinguished,
  ...ACTION_ICONS,
  ...CREATURE_ICONS,
];

// The credits of the packs of the scene's pictures, which follow the icons' lines (D-271,
// `sprite-credits`): what the pack is for, the title, author and licence the pack's page on OpenGameArt
// gives, and the change the files of the game made to it, with its page and its licence linked. The
// dust is the pack Smoke & Fire Animated Particle [16x16] and the wolf the pack LPC Wolf, whose files
// are frames cut from its sheet.
const PACK_LINES = [
  "Kurz i obłok walki: „Smoke & Fire Animated Particle [16x16]”, KnoblePersona, opengameart.org, CC BY 3.0, zmienione (przekolorowane)",
  "Wilk: „[LPC] Wolf Animation”, Stephen „Redshrike” Challener (grafika), William.Thompsonj (współtwórca), opengameart.org, CC BY 3.0, zmienione (wycięte klatki)",
];
const PACK_PAGES = [
  "https://opengameart.org/content/smoke-fire-animated-particle-16x16",
  "https://opengameart.org/content/lpc-wolf-animation",
];
const PACK_LICENCE = "http://creativecommons.org/licenses/by/3.0/";

test("the section credits the campfire's icon, by Lorc, after the five items' icons", () => {
  const items = itemsOf(sectionMarkup());
  assert.equal(items.length, NAMED.length + PACK_LINES.length);
  assert.equal(
    textOfMarkup(items[CAMPFIRE_AT]),
    "ognisko: „Campfire icon”, Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)",
  );
  assert.match(
    linksOf(items[CAMPFIRE_AT])[0].attributes,
    /^href="https:\/\/game-icons\.net\/1x1\/lorc\/campfire\.html"/,
  );
});

test("the section credits the extinguished campfire's icon, by Delapouite, right after the campfire's", () => {
  const items = itemsOf(sectionMarkup());
  assert.equal(
    textOfMarkup(items[CAMPFIRE_AT + 1]),
    "ognisko wygasłe: „Wood Pile icon”, Delapouite, game-icons.net, CC BY 3.0, zmienione (zmieniony kolor)",
  );
  assert.match(
    linksOf(items[CAMPFIRE_AT + 1])[0].attributes,
    /^href="https:\/\/game-icons\.net\/1x1\/delapouite\/wood-pile\.html"/,
  );
});

test("the section credits the bandage's icon, the first aid kit by Delapouite, as the last line of the items, before the campfire's", () => {
  // decision: D-27 "A section of credits, folded and opened with one click, stands on the login card and at the bottom of Siedziba, as its last part, and credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and says how the icon file differs from its source"
  const items = itemsOf(sectionMarkup());
  assert.equal(
    textOfMarkup(items[CAMPFIRE_AT - 1]),
    "opatrunek: „First aid kit icon”, Delapouite, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)",
  );
  assert.match(
    linksOf(items[CAMPFIRE_AT - 1])[0].attributes,
    /^href="https:\/\/game-icons\.net\/1x1\/delapouite\/first-aid-kit\.html"/,
  );
});

test("the section credits „Opatrz”'s icon, the roll of bandage by Lorc, once, among the actions' icons after „Zjedz — jagoda”", () => {
  // decision: D-27 "A section of credits, folded and opened with one click, stands on the login card and at the bottom of Siedziba, as its last part, and credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and says how the icon file differs from its source"
  const items = itemsOf(sectionMarkup());
  const at = ACTIONS_AT + ACTION_ICONS.findIndex((a) => a.name === "Opatrz");
  assert.equal(
    textOfMarkup(items[at]),
    "Opatrz: „Bandage roll icon”, Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)",
  );
  assert.match(
    linksOf(items[at])[0].attributes,
    /^href="https:\/\/game-icons\.net\/1x1\/lorc\/bandage-roll\.html"/,
  );
  assert.match(textOfMarkup(items[at - 1]), /^Zjedz — jagoda: /);
  assert.equal(
    items.filter((item) => item.includes("bandage-roll.html")).length,
    1,
  );
});

test("the bandage's data names the icon file first-aid-kit.svg and its title on game-icons.net, and the file exists", () => {
  // decision: D-27 "The game's icons are SVG files from game-icons.net, kept in `assets/icons/`"
  assert.equal(ITEMS.bandage.icon, "first-aid-kit");
  assert.equal(ITEMS.bandage.iconTitle, "First aid kit icon");
  assert.ok(existsSync(`${ICONS}first-aid-kit.svg`));
});

test("the section credits the actions' icons after the two campfires', one line each, in the order of the data", () => {
  const items = itemsOf(sectionMarkup());
  assert.deepEqual(
    items
      .slice(ACTIONS_AT, ACTIONS_AT + ACTION_ICONS.length)
      .map((item) => textOfMarkup(item).split(":")[0]),
    ACTION_ICONS.map((action) => action.name),
  );
});

test("the section credits the wolf's icon, by Lorc, after the actions' icons and before the packs", () => {
  // decision: D-27 "A section of credits, folded and opened with one click, stands on the login card and at the bottom of Siedziba, as its last part, and credits each icon with its title as game-icons.net gives it, its author, its page on game-icons.net and its licence, and says how the icon file differs from its source"
  const items = itemsOf(sectionMarkup());
  const at = ACTIONS_AT + ACTION_ICONS.length;
  assert.equal(
    textOfMarkup(items[at]),
    "wilk: „Wolf head icon”, Lorc, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)",
  );
  assert.match(
    linksOf(items[at])[0].attributes,
    /^href="https:\/\/game-icons\.net\/1x1\/lorc\/wolf-head\.html"/,
  );
  assert.match(textOfMarkup(items[at + 1]), /^Kurz i obłok walki: /);
});

test("the wolf's data names the icon file wolf-head.svg and its title on game-icons.net, and the file exists", () => {
  // decision: D-27 "The game's icons are SVG files from game-icons.net, kept in `assets/icons/`"
  // decision: D-416 "Each thing of the Understanding on the screen stands with its icon from the game's data and its name, and a creature has its icon in the data"
  assert.equal(CREATURES.wolf.icon, "wolf-head");
  assert.equal(CREATURES.wolf.iconTitle, "Wolf head icon");
  assert.ok(existsSync(`${ICONS}wolf-head.svg`));
});

test("the campfire's data names the icon file campfire.svg and its title on game-icons.net", () => {
  assert.equal(CAMPFIRE.icon, "campfire");
  assert.equal(CAMPFIRE.iconTitle, "Campfire icon");
});

test("the extinguished campfire's data names the icon file wood-pile.svg and its title on game-icons.net", () => {
  assert.equal(CAMPFIRE.extinguished.icon, "wood-pile");
  assert.equal(CAMPFIRE.extinguished.iconTitle, "Wood Pile icon");
});

test("each icon the data names, the campfire's included, exists as a file", () => {
  // decision: D-27 "The game's icons are SVG files from game-icons.net, kept in `assets/icons/`"
  const names = NAMED.map((named) => named.icon);
  assert.ok(names.includes(CAMPFIRE.icon));
  for (const icon of names) assert.ok(existsSync(`${ICONS}${icon}.svg`), icon);
});

test("each action of the data names an icon and its title, and the icon file exists", () => {
  // decision: D-27 "The game's icons are SVG files from game-icons.net, kept in `assets/icons/`"
  // decision: D-291 "Each action has one icon, which stands for it in a program rule's row, in its cell of the pick, over the mage's head, in the rows „Teraz” and „Potem” under the scene and beside the action on the screen Wiedza; an action with a target shows the icon of the action, never one of its target"
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
  // decision: D-27 "The game's icons are SVG files from game-icons.net"
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

test("the section is a folded details whose summary reads Autorzy grafiki, with no state", () => {
  // decision: D-27 "A section of credits, folded and opened with one click"
  assert.equal(globalThis.document, undefined);
  const markup = sectionMarkup();
  assert.match(
    markup,
    /^<details><summary>Autorzy grafiki<\/summary><ul class="credits">.*<\/ul><\/details>$/,
  );
  assert.doesNotMatch(markup, /<details[^>]*\sopen/, "folded by default");
  assert.doesNotMatch(markup, /\son[a-z]+=|<script/i, "no script");
});

test("each line of the section holds the icon's title, author, game-icons.net, CC BY 3.0 and the change, for the icon of each credit", () => {
  const items = itemsOf(sectionMarkup());
  assert.equal(items.length, NAMED.length + PACK_LINES.length);
  NAMED.forEach((named, i) => {
    assert.equal(
      textOfMarkup(items[i]),
      `${named.name}: „${TITLES[named.icon]}”, ${ICON_CREDITS[named.icon].author}, game-icons.net, CC BY 3.0, ${changesOf(named.icon)}`,
    );
  });
});

// invariant: sprite-credits
test("the section's last two lines credit the packs of the dust and of the wolf: what each is for, its title, author, page and licence, and that the files were changed, with its page and its licence linked", () => {
  // decision: D-271 "A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, the game takes the pack LPC Wolf under its licence CC BY 3.0"
  const items = itemsOf(sectionMarkup()).slice(NAMED.length);
  assert.equal(items.length, PACK_LINES.length);
  items.forEach((item, i) => {
    // React writes the ampersand of the title as an entity, as markup does.
    assert.equal(textOfMarkup(item).replaceAll("&amp;", "&"), PACK_LINES[i]);
    const links = [...item.matchAll(/<a ([^>]*)>(.*?)<\/a>/g)];
    assert.deepEqual(
      links.map((link) => [link[1], link[2]]),
      [
        [
          `href="${PACK_PAGES[i]}" target="_blank" rel="noopener noreferrer"`,
          "opengameart.org",
        ],
        [
          `href="${PACK_LICENCE}" target="_blank" rel="noopener noreferrer"`,
          "CC BY 3.0",
        ],
      ],
    );
  });
});

// --- the packs of the pictures in assets/sprites: each file has its pack, each pack that asks, its line --

const SPRITES = fileURLToPath(
  new URL("../../assets/sprites/", import.meta.url),
);

/**
 * The three packs the scene's pictures come from (D-271) and whether the licence of each asks for a
 * credit: Pixel Crawler asks for none but of a project with a saxophone solo, which the game has not
 * (environment fact pixel-crawler-terms), the other two are under CC BY 3.0 (lpc-wolf-licence,
 * smoke-fire-particle-licence).
 */
const SPRITE_PACKS = {
  "Pixel Crawler": { asksForCredit: false },
  "[LPC] Wolf Animation": { asksForCredit: true },
  "Smoke & Fire Animated Particle [16x16]": { asksForCredit: true },
};

/**
 * The pack each PNG file directly in assets/sprites/ comes from. A new file is added here with the pack
 * it was made from, which is how the credits come to be asked about it.
 */
const PACK_OF_SPRITE = {
  "berry-bush.png": "Pixel Crawler",
  "camp-clearing.png": "Pixel Crawler",
  "chest.png": "Pixel Crawler",
  "dust.png": "Smoke & Fire Animated Particle [16x16]",
  "fire-small.png": "Pixel Crawler",
  "fire.png": "Pixel Crawler",
  "forest-scene.png": "Pixel Crawler",
  "login-backdrop.png": "Pixel Crawler",
  "mage-bend.png": "Pixel Crawler",
  "mage-death.png": "Pixel Crawler",
  "mage-idle.png": "Pixel Crawler",
  "mage-run.png": "Pixel Crawler",
  "moss.png": "Pixel Crawler",
  "sticks.png": "Pixel Crawler",
  "wolf-bite.png": "[LPC] Wolf Animation",
  "wolf-death.png": "[LPC] Wolf Animation",
  "wolf-idle.png": "[LPC] Wolf Animation",
  "wolf-run.png": "[LPC] Wolf Animation",
};

const spriteFiles = readdirSync(SPRITES, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.png$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort();

/**
 * The pack of each sprite file as the list of the sprite files in README.md names it: point 2 of the
 * list ("First run") has one sentence for each pack, and a file named in a sentence comes from the pack
 * that sentence is about.
 */
function packOfSpriteInReadme() {
  const readme = readFileSync(
    fileURLToPath(new URL("../../README.md", import.meta.url)),
    "utf8",
  );
  const point = readme.match(/^2\. The graphics in `assets\/sprites\/`.*$/m);
  assert.ok(
    point,
    "README.md has no point 2 on the graphics in assets/sprites",
  );
  const packs = {};
  for (const sentence of point[0].split(
    /(?=The second pack is |The third is )/,
  )) {
    const named = Object.keys(SPRITE_PACKS).filter((pack) =>
      sentence.includes(pack),
    );
    assert.equal(named.length, 1, `packs named in: ${sentence.slice(0, 60)}`);
    for (const [, name] of sentence.matchAll(
      /`assets\/sprites\/([^`/]+\.png)`/g,
    ))
      packs[name] = named[0];
  }
  return packs;
}

// invariant: sprite-credits
test("each PNG file directly in assets/sprites is assigned to one of the three packs, a file with no assignment fails naming it, and README.md names for each file the pack assigned to it", () => {
  // decision: D-271 "A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, the game takes the pack LPC Wolf under its licence CC BY 3.0"
  assert.ok(spriteFiles.length > 0, "no sprite files found");
  assert.deepEqual(
    spriteFiles.filter((name) => !Object.hasOwn(PACK_OF_SPRITE, name)),
    [],
    "files of assets/sprites with no pack assigned in PACK_OF_SPRITE",
  );
  for (const [name, pack] of Object.entries(PACK_OF_SPRITE))
    assert.ok(Object.hasOwn(SPRITE_PACKS, pack), `${name}: pack ${pack}`);
  assert.deepEqual(
    packOfSpriteInReadme(),
    PACK_OF_SPRITE,
    "the pack each sprite file has in the list of README.md, against PACK_OF_SPRITE",
  );
});

// invariant: sprite-credits
test("each pack with a file in assets/sprites whose licence asks for a credit has a line among the credits of the section, and a pack without one fails by name", () => {
  // decision: D-271 "A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, the game takes the pack LPC Wolf under its licence CC BY 3.0"
  // Precondition: both credited packs have files, so the check below has something to ask about.
  const packsInUse = new Set(
    spriteFiles.map((name) => PACK_OF_SPRITE[name]).filter(Boolean),
  );
  assert.ok(packsInUse.has("[LPC] Wolf Animation"));
  assert.ok(packsInUse.has("Smoke & Fire Animated Particle [16x16]"));
  // React writes the ampersand of a title as an entity, as markup does.
  const lines = itemsOf(sectionMarkup()).map((item) =>
    textOfMarkup(item).replaceAll("&amp;", "&"),
  );
  assert.deepEqual(
    [...packsInUse].filter(
      (pack) =>
        SPRITE_PACKS[pack].asksForCredit &&
        !lines.some((line) => line.includes(`„${pack}”`)),
    ),
    [],
    "packs whose licence asks for a credit with no line among the credits of the section",
  );
});

test("the section links each icon's page and the licence, each opening in a new tab without opener or referrer", () => {
  const items = itemsOf(sectionMarkup()).slice(0, NAMED.length);
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
