// The text of the game's stylesheets as the game's page links them (D-421). The page
// src/browser/index.html names each stylesheet in a <link rel="stylesheet">, in the order the
// cascade reads them; this module reads each named file of src/browser/ in that order, leaving out
// /tokens.css, the file of design tokens, which no case reads. It imports no jsdom and is no test
// file: a test takes the text of the stylesheets from it.
import { readFileSync } from "node:fs";

const PAGE = new URL("../../src/browser/index.html", import.meta.url);
const SHEETS = new URL("../../src/browser/", import.meta.url);
const LEFT_OUT = new Set(["/tokens.css"]);

// The hrefs of the stylesheet links of the game's page, in the order they stand.
function linkedHrefs() {
  const html = readFileSync(PAGE, "utf8");
  return (html.match(/<link\b[^>]*>/g) ?? [])
    .filter((tag) => /\brel="stylesheet"/.test(tag))
    .map((tag) => {
      const href = /\bhref="([^"]+)"/.exec(tag);
      if (href === null)
        throw new Error(`a stylesheet link without href: ${tag}`);
      return href[1];
    });
}

// The names of the game's stylesheets, in the order the page links them, without the design tokens.
export function gameStylesheetNames() {
  return linkedHrefs()
    .filter((href) => !LEFT_OUT.has(href))
    .map((href) => {
      const file = /^\/([\w.-]+\.css)$/.exec(href);
      if (file === null)
        throw new Error(
          `the stylesheet ${href} is no file directly in src/browser/`,
        );
      return file[1];
    });
}

// The texts of the game's stylesheets joined in the order the page links them, one newline between
// two files, so that a rule's place in the joined text is its place in the cascade.
export function gameStylesheetText() {
  return gameStylesheetNames()
    .map((name) => readFileSync(new URL(name, SHEETS), "utf8"))
    .join("\n");
}
