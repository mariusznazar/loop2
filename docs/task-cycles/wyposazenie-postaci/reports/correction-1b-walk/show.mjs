import { readFileSync } from "node:fs";
const o = JSON.parse(readFileSync(process.argv[2], "utf8"));
const f = (c) => `${c.el} x=${c.x} w=${c.w} client=${c.client} scroll=${c.scroll} display=${c.display} width=${c.width} min=${c.minWidth} max=${c.maxWidth} flex=${c.flex} overflowX=${c.overflowX} pad=${c.padding} box=${c.boxSizing}`;
console.log("viewport", JSON.stringify(o.viewport));
console.log("worldArea", f(o.worldArea));
console.log("parent", f(o.parentOfWorldArea));
for (const c of o.children) console.log("child", f(c), "text=" + c.text.replace(/\n/g, " "));
for (const c of o.chainFromSceneUp) console.log("chain", f(c));
