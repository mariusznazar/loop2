// Icon files as untrusted input (spec sections 6 and 9.2): the check is run on the real files
// and on made-up files holding each forbidden form, so that it can fail.
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ICON_CREDITS, ICON_SOURCE_COMMIT } from '../../dist/public/view/credits.js';
import { RESOURCES } from '../../dist/public/sim/data/resources.js';

const ICONS = fileURLToPath(new URL('../../assets/icons/', import.meta.url));

const NAMESPACES = [' xmlns="http://www.w3.org/2000/svg"', ' xmlns:xlink="http://www.w3.org/1999/xlink"'];

/** Returns the reasons an SVG text is not safe to draw; an empty list means it passes. */
function violations(svg) {
  let text = svg;
  for (const declaration of NAMESPACES) text = text.replace(declaration, '');
  const found = [];
  if (!/^\s*<svg[\s>]/.test(text)) found.push('not an svg document');
  if (/<script/i.test(text)) found.push('script element');
  if (/<foreignObject/i.test(text)) found.push('foreignObject element');
  if (/\son[a-z]+\s*=/i.test(text)) found.push('event attribute');
  if (/<!DOCTYPE/i.test(text)) found.push('document type declaration');
  if (/<!ENTITY/i.test(text)) found.push('entity declaration');
  if (/<\?xml-stylesheet/i.test(text)) found.push('style sheet instruction');
  if (/<style/i.test(text)) found.push('style element');
  if (/@import/i.test(text)) found.push('css import');
  if (/(?:xlink:)?href\s*=(?!\s*["'])/i.test(text)) found.push('unquoted href');
  for (const match of text.matchAll(/(?:xlink:)?href\s*=\s*(["'])(.*?)\1/gi)) {
    if (!match[2].startsWith('#')) found.push('href outside the file');
  }
  for (const match of text.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
    if (!match[2].startsWith('#')) found.push('url( outside the file');
  }
  if (/https?:|data:|\/\//i.test(text)) found.push('external reference');
  return found;
}

const files = readdirSync(ICONS).filter(name => name.endsWith('.svg'));

test('every icon file passes the untrusted-input rules', () => {
  assert.ok(files.length > 0, 'no icon files found');
  for (const name of files) {
    assert.deepEqual(violations(readFileSync(ICONS + name, 'utf8')), [], name);
  }
});

const OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">';
const CRAFTED = {
  'a script': `${OPEN}<script>alert(1)</script></svg>`,
  'an onload attribute': `<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"></svg>`,
  'a foreignObject': `${OPEN}<foreignObject><div/></foreignObject></svg>`,
  'an external href': `${OPEN}<image href="https://example.com/a.png"/></svg>`,
  'an external xlink:href': `${OPEN}<use xlink:href="other.svg#a"/></svg>`,
  'an external url(': `${OPEN}<path style="fill:url(https://example.com/a)"/></svg>`,
  'a data: URI': `${OPEN}<image href="data:image/png;base64,AAAA"/></svg>`,
  'a protocol-relative address': `${OPEN}<path d="M0 0" data-x="//example.com"/></svg>`,
  'an xmlns with another value': '<svg xmlns="http://example.com/svg"></svg>',
  'a <!DOCTYPE': `${OPEN}<!DOCTYPE svg></svg>`,
  'an <!ENTITY': `${OPEN}<!ENTITY x SYSTEM "file.txt"></svg>`,
  'an <?xml-stylesheet': `${OPEN}<?xml-stylesheet type="text/css" href="#s"?></svg>`,
  'a <style element': `${OPEN}<style>path{fill:red}</style></svg>`,
  'an @import': `${OPEN}<path style="@import 'a.css'"/></svg>`,
  'an unquoted href': `${OPEN}<use href=other.svg#a /></svg>`,
  'an unquoted xlink:href': `${OPEN}<use xlink:href=other.svg#a /></svg>`,
};

for (const [form, svg] of Object.entries(CRAFTED)) {
  test(`the check rejects an svg holding ${form}`, () => {
    assert.notDeepEqual(violations(svg), []);
  });
}

test('the check passes an svg holding only the two allowed namespace declarations', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#a"/><path style="fill:url(#a)"/></svg>';
  assert.deepEqual(violations(svg), []);
});

/** The one colour the icon shapes are drawn in, dark on the light revealed tile. */
const DARK = '#2b2b2b';
const ALLOWED_ATTRIBUTES = ['xmlns', 'viewBox', 'd', 'fill'];

test('every icon file is a dark shape without a background: svg and path elements, allowed attributes only', () => {
  assert.ok(files.length > 0, 'no icon files found');
  for (const name of files) {
    const svg = readFileSync(ICONS + name, 'utf8');
    const elements = new Set([...svg.matchAll(/<([A-Za-z][\w:-]*)/g)].map(match => match[1]));
    assert.deepEqual([...elements].sort(), ['path', 'svg'], name);
    for (const match of svg.matchAll(/\s([A-Za-z][\w:-]*)\s*=/g)) {
      assert.ok(ALLOWED_ATTRIBUTES.includes(match[1]), `${name}: attribute ${match[1]}`);
    }
    assert.doesNotMatch(svg, /d="M0 0h512v512H0z"/, `${name}: background path`);
    const paths = [...svg.matchAll(/<path\b([^>]*)>/g)];
    assert.ok(paths.length > 0, name);
    for (const path of paths) assert.match(path[1], new RegExp(`\\sfill="${DARK}"`), `${name}: a path not filled ${DARK}`);
  }
});

const CHANGES = 'zmienione (bez tła, ciemny kolor)';

test('each icon credit records that the file was changed from its source', () => {
  for (const [icon, credit] of Object.entries(ICON_CREDITS)) assert.equal(credit.changes, CHANGES, icon);
});

/** A stand-in for the few DOM calls the footer makes: elements keep what is appended to them. */
function fakeDocument() {
  return {
    createElement(tag) {
      return { tag, children: [], append(...items) { this.children.push(...items); } };
    },
  };
}
const textOf = node => (typeof node === 'string' ? node : node.textContent ?? node.children.map(textOf).join(''));

async function builtFooter() {
  const { createFooter, footerCredits } = await import('../../dist/public/view/footer.js');
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    return { items: createFooter().children[0].children, credits: footerCredits() };
  } finally {
    globalThis.document = saved;
  }
}

/** Each icon's title as its page on game-icons.net gives it (environment facts game-icons-*-title). */
const TITLES = {
  'wood-stick': 'Wood stick icon',
  'berry-bush': 'Berry bush icon',
  fern: 'Fern icon',
  flax: 'Flax icon',
};

test('each footer line names the icon by its title on game-icons.net and says after the licence that it was changed', async () => {
  const { items, credits } = await builtFooter();
  const resources = Object.values(RESOURCES);
  assert.ok(credits.length > 0);
  assert.equal(items.length, resources.length);
  assert.equal(items.length, credits.length);
  items.forEach((item, i) => {
    const credit = credits[i];
    const title = TITLES[resources[i].icon];
    assert.ok(title, resources[i].icon);
    assert.equal(textOf(item), `${resources[i].name}: „${title}”, ${credit.author}, game-icons.net, CC BY 3.0, ${CHANGES}`);
  });
});

test('the footer links open in a new tab, without opener or referrer', async () => {
  const { items } = await builtFooter();
  for (const item of items) {
    const links = item.children.filter(node => typeof node !== 'string');
    assert.equal(links.length, 2);
    for (const link of links) {
      assert.equal(link.target, '_blank', link.href);
      assert.equal(link.rel, 'noopener noreferrer', link.href);
    }
  }
});

test('each icon named in the resources data exists as a file', () => {
  const names = Object.values(RESOURCES).map(resource => resource.icon);
  assert.ok(names.length > 0);
  for (const icon of names) assert.ok(existsSync(`${ICONS}${icon}.svg`), icon);
});

test('each icon file has a credit with an author and the source commit', () => {
  assert.match(ICON_SOURCE_COMMIT, /^[0-9a-f]{40}$/);
  for (const resource of Object.values(RESOURCES)) {
    const credit = ICON_CREDITS[resource.icon];
    assert.ok(credit, resource.icon);
    assert.ok(credit.author.length > 0, resource.icon);
    assert.match(credit.sourceUrl, /^https:\/\/game-icons\.net\//, resource.icon);
  }
  for (const name of files) assert.ok(ICON_CREDITS[name.replace(/\.svg$/, '')], name);
});
