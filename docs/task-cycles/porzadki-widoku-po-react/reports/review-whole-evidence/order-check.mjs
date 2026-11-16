// Working copy of slice 6: compares the game's stylesheets before the split (styles-base.css, kept
// in this directory) with the stylesheets the game's page links now.
//   node .runs/slice-6-executor/order-check.mjs <report file> [<kitchen-sink DOM html>]
// 1. every style rule and at-rule in one concatenation stands in the other (text compared with its
//    white space normalised, comments aside), as a multiset;
// 2. every pair of style rules whose order changed, whose selectors have the same specificity and that
//    declare a common property (a shorthand and its longhands count as common) under the same or
//    overlapping conditions is listed, with the files that draw the classes of each selector;
// 3. no rule of a moved file reaches an element of the kitchen-sink page (a DOM copy of the page, when
//    given), nor names a class that the page's sources give an element.
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { gameStylesheetNames } from "../../tests/view/game-stylesheets.mjs";
const require = createRequire(import.meta.url);
const csstree = require("css-tree");

const [reportFile, recordDir] = process.argv.slice(2);
const dir = ".runs/review-whole";
const out = [];

// ---------- flattening ----------
function normalise(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
}
function flatten(file, text) {
  const ast = csstree.parse(text, { positions: true });
  const items = [];
  const visit = (node, conditions) => {
    if (node.type === "Rule") {
      const declared = [];
      csstree.walk(node.block, { visit: "Declaration", enter: (d) => declared.push(d.property) });
      items.push({
        kind: "rule",
        file,
        line: node.loc.start.line,
        conditions,
        selectors: splitSelectors(node.prelude),
        prelude: csstree.generate(node.prelude),
        props: [...new Set(declared)],
        key: `${conditions.join(" | ")} || ${normalise(text.slice(node.loc.start.offset, node.loc.end.offset))}`,
      });
    } else if (node.type === "Atrule" && ["media", "supports", "starting-style", "layer"].includes(node.name) && node.block) {
      const condition = `@${node.name} ${node.prelude ? csstree.generate(node.prelude) : ""}`.trim();
      for (const child of node.block.children.toArray()) visit(child, [...conditions, condition]);
    } else if (node.type === "Atrule") {
      items.push({
        kind: "at",
        file,
        line: node.loc.start.line,
        conditions,
        selectors: [],
        prelude: `@${node.name} ${node.prelude ? csstree.generate(node.prelude) : ""}`,
        props: [],
        key: `${conditions.join(" | ")} || ${normalise(text.slice(node.loc.start.offset, node.loc.end.offset))}`,
      });
    }
  };
  for (const node of ast.children.toArray()) visit(node, []);
  return items;
}
function splitSelectors(prelude) {
  const list = [];
  if (prelude.type === "SelectorList") for (const s of prelude.children.toArray()) list.push(s);
  return list.map((s) => ({ text: csstree.generate(s), ast: s }));
}

const BEFORE = ["styles.css"];
const base = BEFORE.flatMap((name) => flatten(name, readFileSync(`${dir}/before/${name}`, "utf8")));
const names = gameStylesheetNames();
const after = names.flatMap((name) => flatten(name, readFileSync(`src/browser/${name}`, "utf8")));
out.push(`linked stylesheets, in order: ${names.join(", ")}`);
out.push(`style rules and at-rules: before ${base.length}, after ${after.length}`);
for (const [label, items] of [["before", base], ["after", after]]) {
  const per = new Map();
  for (const item of items) {
    const entry = per.get(item.file) ?? { rules: 0, selectors: 0 };
    entry.rules++;
    entry.selectors += item.selectors.length;
    per.set(item.file, entry);
  }
  for (const [file, entry] of per) out.push(`   ${label} ${file}: ${entry.rules} rules and at-rules, ${entry.selectors} selectors`);
}

// ---------- 1. multiset ----------
const count = (items) => {
  const map = new Map();
  for (const item of items) map.set(item.key, (map.get(item.key) ?? 0) + 1);
  return map;
};
const cb = count(base);
const ca = count(after);
let missing = 0;
for (const [key, n] of cb) if ((ca.get(key) ?? 0) !== n) { out.push(`MISSING/EXTRA in after (${n} vs ${ca.get(key) ?? 0}): ${key.slice(0, 160)}`); missing++; }
for (const [key, n] of ca) if (!cb.has(key)) { out.push(`EXTRA in after: ${key.slice(0, 160)}`); missing++; }
out.push(`1. rules in one and not the other: ${missing}`);

// ---------- 2. order-changed pairs ----------
// A rule's identity: its key and the n-th occurrence of that key.
function indexed(items) {
  const seen = new Map();
  return items.map((item, index) => {
    const n = seen.get(item.key) ?? 0;
    seen.set(item.key, n + 1);
    return { ...item, id: `${item.key}#${n}`, index };
  });
}
const B = indexed(base);
const A = indexed(after);
const afterIndex = new Map(A.map((item) => [item.id, item]));

function specificity(ast) {
  const sum = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const max = (list) => list.reduce((best, s) => (cmp(s, best) > 0 ? s : best), [0, 0, 0]);
  let total = [0, 0, 0];
  const walk = (node) => {
    switch (node.type) {
      case "IdSelector": total = sum(total, [1, 0, 0]); break;
      case "ClassSelector": case "AttributeSelector": total = sum(total, [0, 1, 0]); break;
      case "TypeSelector": if (node.name !== "*") total = sum(total, [0, 0, 1]); break;
      case "PseudoElementSelector": total = sum(total, [0, 0, 1]); break;
      case "PseudoClassSelector": {
        const name = node.name.toLowerCase();
        if (name === "where") break;
        if (["not", "is", "has", "matches"].includes(name) && node.children) {
          const inner = [];
          node.children.forEach((child) => {
            if (child.type === "SelectorList") child.children.forEach((s) => inner.push(specificity(s)));
            else inner.push(specificity(child));
          });
          total = sum(total, max(inner));
        } else total = sum(total, [0, 1, 0]);
        break;
      }
      default: break;
    }
  };
  // only the compound selectors of this selector; the nested ones are counted by the pseudo-class above
  csstree.walk(ast, {
    enter(node) {
      if (["IdSelector", "ClassSelector", "AttributeSelector", "TypeSelector", "PseudoElementSelector", "PseudoClassSelector"].includes(node.type)) walk(node);
    },
  });
  // the walk visits the arguments of :not() and friends as well; take them out again
  csstree.walk(ast, {
    enter(node) {
      if (node.type === "PseudoClassSelector" && ["not", "is", "has", "matches", "where"].includes(node.name.toLowerCase()) && node.children) {
        csstree.walk(node, {
          enter(inner) {
            if (inner === node) return;
            if (["IdSelector", "ClassSelector", "AttributeSelector", "TypeSelector", "PseudoElementSelector", "PseudoClassSelector"].includes(inner.type)) {
              const negative =
                inner.type === "IdSelector" ? [1, 0, 0] :
                inner.type === "ClassSelector" || inner.type === "AttributeSelector" || inner.type === "PseudoClassSelector" ? [0, 1, 0] :
                inner.type === "TypeSelector" && inner.name === "*" ? [0, 0, 0] : [0, 0, 1];
              total = [total[0] - negative[0], total[1] - negative[1], total[2] - negative[2]];
            }
          },
        });
      }
    },
  });
  return total;
}
function cmp(a, b) {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] - b[i];
  return 0;
}
for (const item of [...B, ...A]) for (const selector of item.selectors) selector.specificity ??= specificity(selector.ast);

// Properties: a shorthand and its longhands are common.
const SHORTHANDS = {
  margin: /^margin(-|$)/,
  padding: /^padding(-|$)/,
  border: /^border(-|$)/,
  "border-top": /^border(-top(-|$)|$|-(width|style|color)$)/,
  "border-right": /^border(-right(-|$)|$|-(width|style|color)$)/,
  "border-bottom": /^border(-bottom(-|$)|$|-(width|style|color)$)/,
  "border-left": /^border(-left(-|$)|$|-(width|style|color)$)/,
  "border-width": /^border(-(top|right|bottom|left))?-width$|^border$/,
  "border-style": /^border(-(top|right|bottom|left))?-style$|^border$/,
  "border-color": /^border(-(top|right|bottom|left))?-color$|^border$/,
  background: /^background(-|$)/,
  font: /^(font|line-height)(-|$)/,
  flex: /^flex(-|$)/,
  "flex-flow": /^flex-(flow|direction|wrap)$/,
  gap: /^(gap|row-gap|column-gap)$/,
  inset: /^(inset|top|right|bottom|left|inset-(block|inline)(-start|-end)?)$/,
  overflow: /^overflow(-|$)/,
  mask: /^(-webkit-)?mask(-|$)/,
  "-webkit-mask": /^(-webkit-)?mask(-|$)/,
  animation: /^animation(-|$)/,
  transition: /^transition(-|$)/,
  outline: /^outline(-|$)/,
  "list-style": /^list-style(-|$)/,
  "text-decoration": /^text-decoration(-|$)/,
  "grid-template": /^grid-template(-|$)/,
  "grid-area": /^grid-(area|row|column)(-|$)/,
  "place-items": /^(place-items|align-items|justify-items)$/,
  "place-content": /^(place-content|align-content|justify-content)$/,
  "padding-inline": /^padding-(inline|left|right)/,
  "margin-inline": /^margin-(inline|left|right)/,
};
function sameFamily(p, q) {
  if (p === q) return true;
  if (p.startsWith("--") || q.startsWith("--")) return false;
  if (SHORTHANDS[p]?.test(q)) return true;
  if (SHORTHANDS[q]?.test(p)) return true;
  // a longhand and the shorthand it belongs to: the first dash-separated words
  const longP = p.replace(/^-webkit-/, "");
  const longQ = q.replace(/^-webkit-/, "");
  if (longP === longQ) return true;
  return false;
}
function commonProps(a, b) {
  const common = [];
  for (const p of a.props) for (const q of b.props) if (sameFamily(p, q)) common.push(p === q ? p : `${p}~${q}`);
  return [...new Set(common)];
}
// Conditions overlap unless two known thresholds exclude each other.
function disjoint(c1, c2) {
  const widths = (cs) => cs.map((c) => /\((max|min)-width:\s*(\d+)px\)/.exec(c)).filter(Boolean).map((m) => [m[1], Number(m[2])]);
  const w1 = widths(c1), w2 = widths(c2);
  for (const [t1, v1] of w1) for (const [t2, v2] of w2) {
    if (t1 === "max" && t2 === "min" && v1 < v2) return true;
    if (t1 === "min" && t2 === "max" && v2 < v1) return true;
  }
  const motion = (cs) => cs.find((c) => /prefers-reduced-motion/.test(c));
  if (motion(c1) && motion(c2) && motion(c1) !== motion(c2)) return true;
  return false;
}
function sameSpecificityPairs(a, b) {
  const pairs = [];
  for (const sa of a.selectors) for (const sb of b.selectors) if (cmp(sa.specificity, sb.specificity) === 0) pairs.push([sa, sb]);
  return pairs;
}

const flagged = [];
for (let i = 0; i < B.length; i++) {
  const x = B[i];
  if (x.kind !== "rule") continue;
  const xa = afterIndex.get(x.id);
  if (!xa) continue;
  for (let j = i + 1; j < B.length; j++) {
    const y = B[j];
    if (y.kind !== "rule") continue;
    const ya = afterIndex.get(y.id);
    if (!ya || xa.index < ya.index) continue; // order kept
    const common = commonProps(x, y);
    if (common.length === 0) continue;
    if (disjoint(x.conditions, y.conditions)) continue;
    const pairs = sameSpecificityPairs(x, y);
    if (pairs.length === 0) continue;
    flagged.push({ x, y, xa, ya, common, pairs });
  }
}
{
  const groups = new Map();
  for (const f of flagged) {
    const key = `rules of ${f.xa.file} stood before rules of ${f.ya.file} and now stand after them`;
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  for (const [key, n] of [...groups].sort()) out.push(`   pairs by stylesheets: ${key}: ${n}`);
}
out.push(`2. pairs whose order changed, with the same specificity and a common property: ${flagged.length}`);

// The files that draw each class (the same parts as analyze.mjs), to judge a pair.
function walkDir(root, found = []) {
  for (const name of readdirSync(root)) {
    const path = join(root, name);
    if (statSync(path).isDirectory()) walkDir(path, found);
    else if (/\.(ts|tsx)$/.test(name)) found.push(path);
  }
  return found;
}
const sources = walkDir("src/browser").filter((p) => !p.replaceAll("\\", "/").includes("/sim/")).map((p) => {
  const text = readFileSync(p, "utf8");
  // the class tokens a file gives an element: the quoted strings on the lines that speak of a class
  const tokens = new Set();
  for (const line of text.split("\n")) {
    if (!/class/i.test(line)) continue;
    for (const literal of line.match(/"[^"]*"|'[^']*'|`[^`]*`/g) ?? [])
      for (const token of literal.slice(1, -1).replace(/\$\{[^}]*\}/g, " ").split(/\s+/))
        if (/^[a-z][a-z0-9-]*$/.test(token)) tokens.add(token);
  }
  const broad = new Set();
  for (const literal of text.match(/"[^"\n]*"|'[^'\n]*'|`[^`]*`/g) ?? [])
    for (const token of literal.slice(1, -1).replace(/\$\{[^}]*\}/g, " ").split(/\s+/))
      if (/^[a-z][a-z0-9-]*$/.test(token)) broad.add(token);
  return { path: p.replaceAll("\\", "/").replace("src/browser/", ""), text, tokens, broad };
});
function classesOf(selector) {
  const classes = [];
  csstree.walk(selector.ast, { visit: "ClassSelector", enter: (n) => classes.push(n.name) });
  return classes;
}
function drawers(cls) {
  return sources.filter((s) => s.tokens.has(cls)).map((s) => s.path.replace(/^view\//, "").replace(/\.tsx?$/, ""));
}
// The rightmost compound of a selector: the element the rule styles.
function subject(selector) {
  const nodes = selector.ast.children.toArray();
  let at = nodes.length;
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].type === "Combinator") break;
    at = i;
  }
  const compound = nodes.slice(at);
  return {
    classes: compound.filter((n) => n.type === "ClassSelector").map((n) => n.name),
    type: compound.find((n) => n.type === "TypeSelector" && n.name !== "*")?.name ?? null,
    pseudoElement: compound.find((n) => n.type === "PseudoElementSelector")?.name ?? null,
  };
}
function filesNamingAll(classes) {
  return sources.filter((s) => classes.every((cls) => s.tokens.has(cls))).map((s) => s.path.replace(/^view\//, "").replace(/\.tsx?$/, ""));
}
const undetectedPairs = new Set();
const broadOpen = [];
const autoJudged = { pseudoElement: 0, type: 0, noFileNamesBoth: 0 };
const open = [];
for (const f of flagged) {
  let judged = null;
  for (const [sa, sb] of f.pairs) {
    const ua = subject(sa), ub = subject(sb);
    if (ua.pseudoElement !== ub.pseudoElement) { judged = "pseudoElement"; continue; }
    if (ua.type && ub.type && ua.type !== ub.type) { judged = "type"; continue; }
    // a subject with no class (a universal or bare type selector) is placed by the classes of its ancestors
    const sideClasses = (selector, u) => (u.classes.length ? u.classes : classesOf(selector));
    const union = [...new Set([...sideClasses(sa, ua), ...sideClasses(sb, ub)])];
    const files = union.length ? filesNamingAll(union) : ["(no class)"];
    if (files.length === 0) {
      judged = "noFileNamesBoth";
      const undetected = union.filter((cls) => drawers(cls).length === 0);
      // the same search over every string literal of a file, not only the lines that speak of a class
      const broadFiles = sources.filter((s) => union.every((cls) => s.broad.has(cls))).map((s) => s.path);
      if (broadFiles.length > 0) broadOpen.push(`${f.xa.file}:${sa.text}  vs  ${f.ya.file}:${sb.text}  [files: ${broadFiles.join(",")}]`);
      if (undetected.length > 0) undetectedPairs.add(`${f.xa.file}:${sa.text}  vs  ${f.ya.file}:${sb.text}  [no file gives: ${undetected.join(",")}]`);
      continue;
    }
    judged = null;
    open.push({ f, sa, sb, files });
    break;
  }
  if (judged) autoJudged[judged]++;
}
for (const f of flagged) {
  if (f.xa.file !== "styles.css" && f.ya.file !== "styles.css") continue;
  out.push(`SHAREDPAIR [${f.xa.file}:${f.xa.line} ${f.pairs[0][0].text}] stood before [${f.ya.file}:${f.ya.line} ${f.pairs[0][1].text}] and now stands after it; common ${f.common.join(",")}; cond [${f.x.conditions.join(";")}]/[${f.y.conditions.join(";")}]`);
}
out.push(`2a. pairs judged by the script: different pseudo-element ${autoJudged.pseudoElement}, different element type ${autoJudged.type}, no source file names the classes of both subjects ${autoJudged.noFileNamesBoth}`);
out.push(`2b. pairs left to judge: ${open.length}`);
out.push(`2b'. pairs judged by the script in which a class of a subject is given to no element by any source file I could find (distinct): ${undetectedPairs.size}`);
out.push(`2b''. of the pairs the script judged by the files, those whose two subjects' classes stand together as string literals in one file (any line): ${broadOpen.length}`);
for (const line of broadOpen) out.push(`   BROAD ${line}`);
for (const { f, sa, sb, files } of open) {
  const describe = (item, sel) => `${item.file}:${item.line} ${sel.text}`;
  out.push(
    `PAIR base ${f.x.line}/${f.y.line}: [${describe(f.xa, sa)}] stood before [${describe(f.ya, sb)}] and now stands after it; common ${f.common.join(",")}; spec ${sa.specificity.join(".")}; cond [${f.x.conditions.join(";")}]/[${f.y.conditions.join(";")}]; files naming both: ${files.slice(0, 8).join(",")}`,
  );
}

// ---------- DOM evidence: the pages of the recorded states ----------
const { JSDOM } = require("jsdom");
const doms = [];
if (recordDir)
  for (const one of recordDir.split(",")) for (const file of readdirSync(one).filter((name) => name.endsWith(".json")).sort()) {
    if (file === "kitchen-sink.json" && doms.some((d) => d.name === "kitchen-sink")) continue;
    const recorded = JSON.parse(JSON.parse(readFileSync(`${one}/${file}`, "utf8")));
    if (recorded.html) doms.push({ name: file.replace(".json", ""), doc: new JSDOM(recorded.html).window.document });
  }
out.push(`recorded pages used as DOM evidence: ${doms.map((d) => d.name).join(", ")}`);
// leave out what jsdom cannot evaluate: states and pseudo-elements; the rest stays, so a match is a superset
const strip = (text) =>
  text
    .replace(/::?(before|after|placeholder|marker)\b/g, "")
    .replace(/:(hover|focus-visible|focus|active|disabled|enabled)\b/g, "")
    .replace(/:not\(\s*\)/g, "");
const matchCache = new Map();
function matched(domIndex, selectorText) {
  const key = `${domIndex}|${selectorText}`;
  if (!matchCache.has(key)) {
    let set;
    try { set = new Set(doms[domIndex].doc.querySelectorAll(strip(selectorText))); } catch { set = null; }
    matchCache.set(key, set);
  }
  return matchCache.get(key);
}
let carriedBoth = 0;
let notEvaluated = 0;
for (const f of flagged) {
  let carried = null;
  for (const [sa, sb] of f.pairs) {
    for (let d = 0; d < doms.length && !carried; d++) {
      const ma = matched(d, sa.text), mb = matched(d, sb.text);
      if (ma === null || mb === null) { notEvaluated++; continue; }
      for (const element of ma) if (mb.has(element)) { carried = `${doms[d].name}: <${element.tagName.toLowerCase()} class="${element.className}">`; break; }
    }
    if (carried) break;
  }
  if (carried) { carriedBoth++; out.push(`CARRIED BY ONE ELEMENT: base ${f.x.line}/${f.y.line} [${f.xa.file}:${f.xa.line}] [${f.ya.file}:${f.ya.line}] in ${carried}`); }
}
out.push(`2c. flagged pairs whose two selectors match one element in a recorded page: ${carriedBoth} (selectors jsdom could not evaluate: ${notEvaluated})`);

// ---------- 3. the kitchen-sink page ----------
const ksIndex = doms.findIndex((d) => d.name === "kitchen-sink");
if (ksIndex !== -1) {
  const ksSources = ["src/browser/kitchen-sink/kitchen-sink.tsx", "src/browser/kitchen-sink/kitchen-sink.css"].map((p) => readFileSync(p, "utf8"));
  // the class tokens the page's sources give an element: those of its TypeScript and its own stylesheet
  const ksTokens = new Set(sources.find((x) => x.path === "kitchen-sink/kitchen-sink.tsx").tokens);
  csstree.walk(csstree.parse(ksSources[1]), { visit: "ClassSelector", enter: (n) => ksTokens.add(n.name) });
  let reached = 0;
  let namedClasses = 0;
  for (const item of A) {
    if (item.kind !== "rule" || item.file === "styles.css") continue;
    for (const selector of item.selectors) {
      const set = matched(ksIndex, selector.text);
      if (set === null) out.push(`KS selector not evaluated: ${item.file}:${item.line} ${selector.text}`);
      else if (set.size > 0) { out.push(`KS REACHED: ${item.file}:${item.line} ${selector.text} -> ${set.size} element(s)`); reached++; }
      const classes = classesOf(selector);
      if (classes.length > 0 && classes.every((cls) => ksTokens.has(cls))) { out.push(`KS SOURCE GIVES EVERY CLASS of ${item.file}:${item.line} ${selector.text}`); namedClasses++; }
    }
  }
  out.push(`3. selectors of moved rules that match an element of the kitchen-sink page: ${reached}; selectors of moved rules whose every class the page's sources give an element: ${namedClasses}`);
}

// ---------- 4. which moved rules the recorded pages exercise ----------
{
  const unmatched = [];
  let total = 0;
  for (const item of A) {
    if (item.kind !== "rule" || item.file === "styles.css") continue;
    for (const selector of item.selectors) {
      total++;
      const gameDoms = doms.map((_, d) => d).filter((d) => doms[d].name !== "kitchen-sink");
      const hit = gameDoms.some((d) => (matched(d, selector.text)?.size ?? 0) > 0);
      if (!hit) unmatched.push(`${item.file}:${item.line} ${selector.text}${item.conditions.length ? " [" + item.conditions.join("; ") + "]" : ""}`);
    }
  }
  out.push(`4. selectors of moved rules: ${total}; matching no element of any recorded game page (states and pseudo-elements left out of the match): ${unmatched.length}`);
  for (const line of unmatched) out.push(`   UNMATCHED ${line}`);
}

writeFileSync(reportFile, `${out.join("\n")}\n`, "utf8");
console.log(out.filter((line) => /^(linked|style rules|recorded|\d[abc]?\.)/.test(line)).join("\n"));
