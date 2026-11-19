// Crafted address fragments at the trust boundary of browser-view, run against one tree's build.
// Usage: node crafted.mjs <tree root> <output json>
// Records, for each fragment, the requests the page sends with their arguments, how often the
// fragment is cleared, the text of the page and where the focus stands, so that two trees can be
// compared case by case.
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const [rootDir, outFile] = process.argv.slice(2);
const from = (rel) => pathToFileURL(path.join(rootDir, rel)).href;
const { startMemoryLimit } = await import(from("tests/view/memory-limit.mjs"));
startMemoryLimit();
const { withPage, inAct, settle, press } = await import(
  from("tests/view/page-document.mjs")
);
const { startApp } = await import(from("dist/browser/view/app.js"));

const TOKEN = "Zm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmFyZm9vYmE";
const BIG = "A".repeat(200_000);
const NO_SESSION = {
  ok: false,
  failure: { kind: "refused", status: 401, code: "unauthenticated", message: "Sesja wygasla." },
};
const INVALID = {
  ok: false,
  failure: { kind: "refused", status: 400, code: "invalid-link", message: "x" },
};
const UNREACHABLE = {
  ok: false,
  failure: { kind: "unreachable", reason: "network", message: "Brak polaczenia." },
};
const CONFIRMED = { ok: true, value: null };

function heldClient() {
  const calls = [];
  const log = [];
  const call =
    (name) =>
    (...args) => {
      log.push({ name, args: args.map(describe) });
      return new Promise((resolve) => calls.push({ name, answer: resolve }));
    };
  const names = [
    "register", "login", "requestPasswordReset", "currentAccount", "logout",
    "confirmEmail", "sendConfirmationMessage", "setPassword", "loadSavedGame",
    "saveGame", "resetSavedGame",
  ];
  const client = Object.fromEntries(names.map((name) => [name, call(name)]));
  client.reportBrowserFailure = () => Promise.resolve();
  return {
    log,
    client,
    waiting: (name) => calls.some((entry) => entry.name === name),
    async answer(name, result) {
      const index = calls.findIndex((entry) => entry.name === name);
      if (index === -1) throw new Error(`no ${name} waiting`);
      const [entry] = calls.splice(index, 1);
      entry.answer(result);
      await settle();
    },
  };
}

function describe(value) {
  if (typeof value === "string")
    return { length: value.length, head: value.slice(0, 24), tail: value.slice(-8) };
  return typeof value;
}

function fakeAddress(hash) {
  const address = {
    current: hash,
    cleared: 0,
    hash: () => address.current,
    clearFragment() {
      address.cleared += 1;
      address.current = "";
    },
    go(next) { address.current = next; },
    replace(next) { address.current = next; },
    reload() {},
    onChange: () => () => undefined,
  };
  return address;
}

function snapshot(document, held, address) {
  const active = document.activeElement;
  return {
    calls: held.log.map((entry) => ({ ...entry })),
    cleared: address.cleared,
    hashLength: address.current.length,
    text: document.body.textContent.replace(/\s+/g, " ").trim(),
    focus: active ? `${active.localName}:${active.getAttribute("name") ?? active.textContent.slice(0, 20)}` : null,
  };
}

const confirmCases = [
  ["confirm empty token", "#confirm-email="],
  ["confirm oversized token", `#confirm-email=${BIG}`],
  ["confirm malformed token", "#confirm-email=a b%00<x>&=\u0000"],
  ["confirm repeated key", `#confirm-email=${TOKEN}#confirm-email=${TOKEN}`],
  ["confirm key then reset key", `#confirm-email=${TOKEN}&reset-password=${TOKEN}`],
  ["confirm key in other case", `#Confirm-Email=${TOKEN}`],
  ["confirm key not at start", `#x&confirm-email=${TOKEN}`],
];
const confirmAnswers = [
  ["refused", INVALID],
  ["unreachable", UNREACHABLE],
  ["confirmed", CONFIRMED],
];
const resetCases = [
  ["reset empty token", "#reset-password="],
  ["reset oversized token", `#reset-password=${BIG}`],
  ["reset malformed token", "#reset-password=a b%00<x>&=\u0000"],
  ["reset repeated key", `#reset-password=${TOKEN}#reset-password=x`],
  ["reset key then confirm key", `#reset-password=${TOKEN}&confirm-email=${TOKEN}`],
  ["reset with second equals", "#reset-password=a=b"],
];

const results = {};

for (const [name, hash] of confirmCases)
  for (const [answerName, answer] of confirmAnswers) {
    const key = `${name} / ${answerName}`;
    await withPage(async ({ document }) => {
      const held = heldClient();
      const address = fakeAddress(hash);
      await inAct(() => startApp(document.body, held.client, address));
      await settle();
      const steps = { started: snapshot(document, held, address) };
      if (held.waiting("confirmEmail")) {
        await held.answer("confirmEmail", answer);
        steps.confirmed = snapshot(document, held, address);
      }
      if (held.waiting("currentAccount")) {
        await held.answer("currentAccount", NO_SESSION);
        steps.signedOut = snapshot(document, held, address);
      }
      results[key] = steps;
    });
  }

for (const [name, hash] of resetCases) {
  await withPage(async ({ document }) => {
    const held = heldClient();
    const address = fakeAddress(hash);
    await inAct(() => startApp(document.body, held.client, address));
    await settle();
    const steps = { started: snapshot(document, held, address) };
    const cancel = [...document.querySelectorAll("button")].find(
      (button) => button.textContent === "Anuluj",
    );
    if (cancel) {
      await press(cancel);
      steps.cancelled = snapshot(document, held, address);
      if (held.waiting("currentAccount")) {
        await held.answer("currentAccount", NO_SESSION);
        steps.signedOut = snapshot(document, held, address);
      }
    }
    results[name] = steps;
  });
}

writeFileSync(outFile, JSON.stringify(results, null, 1), "utf8");
console.log(`cases ${Object.keys(results).length}`);
