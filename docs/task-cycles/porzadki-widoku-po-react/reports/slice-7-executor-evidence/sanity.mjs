import { readFileSync, readdirSync } from "node:fs";
const dir = process.argv[2];
const marks = ["account-card","account-form","credits","headquarters","camp","character-screen","maps-list-item","maps-card-name","maps-who","knowledge-tree","knowledge-branch","accounts-row","accounts-confirm","session-check","form-warning","tile-list","menu-bar"];
for (const f of readdirSync(dir).filter((n) => n.endsWith(".json")).sort()) {
  try {
    const r = JSON.parse(JSON.parse(readFileSync(`${dir}/${f}`, "utf8")));
    const present = marks.filter((m) => r.html.includes(`class="${m}`) || r.html.includes(` ${m}"`) || r.html.includes(` ${m} `) || r.html.includes(`"${m}-`));
    const open = /<details[^>]* open/.test(r.html);
    console.log(f, r.hash, "elements", r.count, "detailsOpen", open, present.join(","));
  } catch (e) { console.log(f, "ERR", String(e).slice(0, 80)); }
}
