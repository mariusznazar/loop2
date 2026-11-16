// Working copy of slice 7: writes the run-code files the real-game comparison runs, one per state.
//   node .runs/slice-7-executor/gen-driver7.mjs   (worktree root)
// Each drive-<state>.js is `async (page) => {...}`: it signs in (or out), sends the state's saved
// document, reloads, takes the state's steps and returns the computed styles of the whole page as a
// JSON string that `playwright-cli --raw run-code --filename` prints.
import { readFileSync, writeFileSync } from "node:fs";
const dir = new URL("./", import.meta.url);

const RECORDER = `
  const record = () => {
    const out = {};
    const keyOf = (el) => {
      const parts = [];
      for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
        const index = node.parentElement
          ? Array.prototype.indexOf.call(node.parentElement.children, node) + 1
          : 1;
        const classes = node.classList.length ? "." + Array.from(node.classList).join(".") : "";
        parts.unshift(node.tagName.toLowerCase() + classes + ":" + index);
      }
      return parts.join(">");
    };
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
    return JSON.stringify({ viewport: [innerWidth, innerHeight], hash: location.hash, count: Object.keys(out).length, html: document.documentElement.outerHTML, styles: out });
  };
`;
const EMAIL = "compare@example.test";
const PASSWORD = "compare-password-123";

const signIn = (email = EMAIL) => `
  await page.evaluate(async ([email, password]) => {
    const login = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (login.status !== 200) throw new Error("login " + login.status);
  }, ${JSON.stringify([email, PASSWORD])});`;
const signOut = `
  await page.evaluate(async () => { await fetch("/api/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }); });`;
const sendDocument = (name) => {
  const doc = readFileSync(new URL(`doc-${name}.json`, dir), "utf8").trim();
  return `
    await page.evaluate(async (saved) => {
      const current = await (await fetch("/api/saved-game")).json();
      const reply = await fetch("/api/saved-game", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: saved.version, basedOn: current.save?.revision ?? 0, game: saved.game }),
      });
      if (reply.status !== 200) throw new Error("save refused " + reply.status);
    }, ${doc});`;
};
const hash = (h) => `await page.evaluate((h) => { location.hash = h; }, ${JSON.stringify(h)}); await page.waitForTimeout(500);`;
const click = (selector) => `await page.locator(${JSON.stringify(selector)}).first().click(); await page.waitForTimeout(300);`;
const button = (name, scope = "page") => `await ${scope}.getByRole("button", { name: ${JSON.stringify(name)}, exact: true }).first().click(); await page.waitForTimeout(300);`;

// A state: `auth` ("in", "out" or "none"), the saved document, the steps after the reload.
const STATES = {
  "login-in": { auth: "out", steps: `${click(".account-card details summary")}` },
  "login-register": { auth: "out", steps: `${button("Załóż konto", 'page.locator(".account-card-switch")')}${click(".account-card details summary")}` },
  "login-forgot": { auth: "out", steps: `${button("Nie pamiętam hasła")}${click(".account-card details summary")}` },
  headquarters: { auth: "in", doc: "skills", steps: `${hash("#/")}${click(".headquarters details summary")}` },
  character: { auth: "in", doc: "skills", steps: `${hash("#/postac/1")}` },
  maps: { auth: "in", doc: "skills", steps: `${hash("#/mapy")}` },
  "maps-card": { auth: "in", doc: "skills", steps: `${hash("#/mapy")}${click(".maps-list-item")}` },
  knowledge: { auth: "in", doc: "skills", steps: `${hash("#/wiedza")}${click(".knowledge-tree button")}` },
};
writeFileSync(new URL("drive-register.js", dir), `async (page) => {
  await page.evaluate(async ([email, password]) => {
    for (const address of [email, "other@example.test"]) {
      const reply = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, password, passwordConfirmation: password }),
      });
      if (reply.status !== 201 && reply.status !== 409) throw new Error("register " + reply.status);
    }
  }, ${JSON.stringify([EMAIL, PASSWORD])});
  return "registered";
}
`);
const wrap = (prelude, steps) => `async (page) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  ${prelude}
  await page.reload();
  await page.waitForTimeout(1000);
  ${RECORDER}
  ${steps}
  await page.waitForTimeout(500);
  return await page.evaluate("(" + record.toString() + ")()");
}
`;
for (const [name, { auth, doc, steps }] of Object.entries(STATES)) {
  const prelude = auth === "out" ? signOut : `${signIn()}${doc ? sendDocument(doc) : ""}`;
  writeFileSync(new URL(`drive-${name}.js`, dir), wrap(prelude, steps));
}
// The list of accounts: the account has the owner role (granted by the operator command before).
writeFileSync(new URL("drive-accounts.js", dir), wrap(`${signIn()}`, `${hash("#/konta")}`));
writeFileSync(new URL("drive-accounts-confirm.js", dir), wrap(`${signIn()}`, `${hash("#/konta")}${`await page.getByRole("button", { name: "Zablokuj: other@example.test", exact: true }).click(); await page.waitForTimeout(300);`}`));
// The waiting screen: the request that asks whom the browser is signed in as is held or refused.
const HOLD = (handler) => `async (page) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  ${signIn()}
  await page.route("**/api/account", ${handler});
  await page.reload();
  await page.waitForTimeout(1500);
  ${RECORDER}
  const result = await page.evaluate("(" + record.toString() + ")()");
  await page.unrouteAll({ behavior: "ignoreErrors" });
  return result;
}
`;
writeFileSync(new URL("drive-waiting-held.js", dir), HOLD("() => {}"));
writeFileSync(new URL("drive-waiting-refused.js", dir), HOLD("(route) => route.abort()"));
writeFileSync(new URL("drive-kitchen-sink.js", dir), `async (page) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("http://127.0.0.1:8765/");
  await page.waitForTimeout(1500);
  ${RECORDER}
  return await page.evaluate("(" + record.toString() + ")()");
}
`);
console.log([...Object.keys(STATES), "accounts", "accounts-confirm", "waiting-held", "waiting-refused", "kitchen-sink"].join(" "));
