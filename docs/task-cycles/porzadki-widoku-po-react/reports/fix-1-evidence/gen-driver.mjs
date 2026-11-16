// Working copy of fix 1: writes the run-code files of the real-game comparison, one per state.
// Each drive-<state>.js signs in, sends the saved document, reloads, takes the state's steps, stops every
// animation at its start (so the computed values do not depend on the time of the recording) and returns
// the computed style of every element and of its ::before and ::after, with the list of its animations.
import { readFileSync, writeFileSync } from "node:fs";
const dir = new URL("./", import.meta.url);
const EMAIL = "compare@example.test";
const PASSWORD = "compare-password-123";
const RECORDER = `
  const record = () => {
    const out = {};
    const keyOf = (el) => {
      const parts = [];
      for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
        const index = node.parentElement ? Array.prototype.indexOf.call(node.parentElement.children, node) + 1 : 1;
        const classes = node.classList.length ? "." + Array.from(node.classList).join(".") : "";
        parts.unshift(node.tagName.toLowerCase() + classes + ":" + index);
      }
      return parts.join(">");
    };
    const animations = [];
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = 0;
    }
    for (const a of document.getAnimations()) {
      const t = a.effect.getComputedTiming();
      const target = a.effect.target;
      animations.push([target ? keyOf(target) + (a.effect.pseudoElement ?? "") : "?", a.animationName ?? a.constructor.name, t.duration, t.iterations, t.easing, t.fill, t.delay, t.direction].join(" | "));
    }
    animations.sort();
    const take = (el, pseudo) => {
      const cs = getComputedStyle(el, pseudo);
      const props = {};
      for (let i = 0; i < cs.length; i++) props[cs[i]] = cs.getPropertyValue(cs[i]);
      return props;
    };
    for (const el of document.querySelectorAll("*")) {
      const key = keyOf(el);
      out[key] = take(el, null);
      for (const pseudo of ["::before", "::after"]) {
        const content = getComputedStyle(el, pseudo).content;
        if (content !== "none" && content !== "normal") out[key + pseudo] = take(el, pseudo);
      }
    }
    return JSON.stringify({ viewport: [innerWidth, innerHeight], hash: location.hash, count: Object.keys(out).length, animations, html: document.documentElement.outerHTML, styles: out });
  };
`;
const signIn = `
  await page.evaluate(async ([email, password]) => {
    const login = await fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (login.status !== 200) throw new Error("login " + login.status);
  }, ${JSON.stringify([EMAIL, PASSWORD])});`;
const sendDocument = (name) => {
  const doc = readFileSync(new URL(`doc-${name}.json`, dir), "utf8").trim();
  return `
    await page.evaluate(async (saved) => {
      const current = await (await fetch("/api/saved-game")).json();
      const reply = await fetch("/api/saved-game", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ version: saved.version, basedOn: current.save?.revision ?? 0, game: saved.game }) });
      if (reply.status !== 200) throw new Error("save refused " + reply.status);
    }, ${doc});`;
};
const hash = (h) => `await page.evaluate((h) => { location.hash = h; }, ${JSON.stringify(h)}); await page.waitForTimeout(500);`;
// Elements the paused scene may not show in the state: the attributes the scene's state sets on them, set by hand,
// so that the rules for a burning fire, a walk and the camp are exercised on the same elements before and after.
const INJECT = `
  await page.evaluate(() => {
    for (const fire of document.querySelectorAll(".scene-fire")) fire.setAttribute("data-burning", "true");
    for (const mage of document.querySelectorAll(".scene-mage, .scene-badge-carrier")) { mage.setAttribute("data-walking", ""); mage.style.setProperty("--walk-start", "-300%"); }
  });
  await page.waitForTimeout(300);`;
const STATES = {
  "run-live": { doc: "live", steps: "" },
  "run-fire": { doc: "fire", steps: "" },
  "run-fire-walk": { doc: "fire", steps: INJECT },
  "run-discovery": { doc: "discovery", steps: "" },
  "run-death": { doc: "death", steps: "" },
  "run-completion": { doc: "completion", steps: "" },
  headquarters: { doc: "live", steps: hash("#/") },
  "headquarters-camp": { doc: "camp", steps: hash("#/") },
};
writeFileSync(new URL("drive-register.js", dir), `async (page) => {
  await page.evaluate(async ([email, password]) => {
    const reply = await fetch("/api/accounts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, passwordConfirmation: password }) });
    if (reply.status !== 201 && reply.status !== 409) throw new Error("register " + reply.status);
  }, ${JSON.stringify([EMAIL, PASSWORD])});
  return "registered";
}
`);
for (const [name, { doc, steps }] of Object.entries(STATES)) {
  writeFileSync(new URL(`drive-${name}.js`, dir), `async (page) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  ${signIn}
  ${sendDocument(doc)}
  await page.reload();
  await page.waitForTimeout(1500);
  ${RECORDER}
  ${steps}
  await page.waitForTimeout(500);
  return await page.evaluate("(" + record.toString() + ")()");
}
`);
}
console.log(Object.keys(STATES).join(" "));
