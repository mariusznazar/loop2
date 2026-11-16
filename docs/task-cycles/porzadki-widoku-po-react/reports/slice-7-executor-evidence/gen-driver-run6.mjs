// Working copy of slice 6: writes the run-code files the real-game comparison runs, one per state.
//   node .runs/slice-6-executor/gen-driver.mjs   (in the worktree root)
// Each drive-<state>.js is `async (page) => {...}`: it sends the state's saved document on the open
// (signed-in) page, reloads, takes the state's steps and returns the computed styles of the whole
// page as a JSON string, which `playwright-cli --raw run-code --filename` prints and a redirect
// puts in a file.
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

function sendDocument(name) {
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
    }, ${doc});
    await page.reload();
    await page.waitForTimeout(1000);
  `;
}

const EMAIL = "compare@example.test";
const PASSWORD = "compare-password-123";

const REGISTER = `async (page) => {
  await page.evaluate(async ([email, password]) => {
    const reply = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, passwordConfirmation: password }),
    });
    if (reply.status !== 201) {
      const login = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (login.status !== 200) throw new Error("login " + login.status);
    }
  }, ${JSON.stringify([EMAIL, PASSWORD])});
  return "registered";
}
`;

const run = (selector) => `await page.locator(${JSON.stringify(selector)}).first().click();`;
const button = (name, scope = "") =>
  `await page${scope}.getByRole("button", { name: ${JSON.stringify(name)}, exact: true }).first().click();`;

// Each state: the saved document sent first and the steps that bring the page to the state.
const STATES = {
  "run-kronika": { doc: "live", steps: `` },
  "run-teren": { doc: "live", steps: button("Teren") },
  "run-rulepanel": {
    doc: "live",
    steps: `${run(".run-program .rule-list-row")}
      await page.waitForTimeout(300);
      ${run(".run-program .rule-panel-value button")}`,
  },
  "run-discovery": { doc: "discovery", steps: `` },
  "run-question": {
    doc: "live",
    steps: `await page.locator(".run-program").getByRole("button", { name: "Usuń", exact: true }).first().click();
      ${button("Zakończ")}`,
  },
  "run-death": { doc: "death", steps: `` },
  "run-completion": { doc: "completion", steps: `` },
  programs: {
    doc: "live",
    steps: `await page.getByRole("link", { name: "Programy" }).click();`,
  },
  "programs-reset": {
    doc: "live",
    steps: `await page.getByRole("link", { name: "Programy" }).click();
      ${button("Zacznij od zera")}`,
  },
  "programs-trip": {
    doc: "live",
    steps: `await page.getByRole("link", { name: "Programy" }).click();
      ${run(".programs-screen .trip-plan-line button")}`,
  },
  "programs-rulepanel": {
    doc: "live",
    steps: `await page.getByRole("link", { name: "Programy" }).click();
      ${run(".programs-screen .rule-list-row")}
      await page.waitForTimeout(300);`,
  },
};

writeFileSync(new URL("drive-register.js", dir), REGISTER);
for (const [name, { doc, steps }] of Object.entries(STATES)) {
  const source = `async (page) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  ${sendDocument(doc)}
  ${RECORDER}
  ${steps}
  await page.waitForTimeout(500);
  return await page.evaluate("(" + record.toString() + ")()");
}
`;
  writeFileSync(new URL(`drive-${name}.js`, dir), source);
}
console.log(Object.keys(STATES).join("\n"));

// The kitchen-sink page, served by serve-ks.mjs.
writeFileSync(
  new URL("drive-kitchen-sink.js", dir),
  `async (page) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("http://127.0.0.1:8765/");
  await page.waitForTimeout(1500);
  ${RECORDER}
  return await page.evaluate("(" + record.toString() + ")()");
}
`,
);
