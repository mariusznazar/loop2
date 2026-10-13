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
