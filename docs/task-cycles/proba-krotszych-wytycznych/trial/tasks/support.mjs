import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { format } from "node:util";

// Shared by the three tests of the measurement. A test reads the run directory
// from RUN_DIR and loads the code of the agent's run from its dist/ folder.

export function runDirectory() {
  const value = process.env.RUN_DIR;
  if (!value) throw new Error("RUN_DIR is not set");
  return resolve(value);
}

export async function loadDist(relativePath) {
  const url = pathToFileURL(join(runDirectory(), "dist", relativePath)).href;
  return import(url);
}

// The agent's module, or the reason it did not load. A test whose module did
// not load fails at its own assertion, so no behaviour passes by default.
export async function loadAgentModule(name) {
  try {
    return { module: await loadDist(`server/${name}.js`) };
  } catch (error) {
    return { error };
  }
}

export function exported(loaded, name) {
  if (loaded.error) throw loaded.error;
  const value = loaded.module[name];
  if (typeof value !== "function")
    throw new Error(`the module does not export a function ${name}`);
  return value;
}

// Runs `work` while every console method collects its text. Returns what the
// work returned or threw and the lines in the order they were written.
export async function captureConsole(work) {
  const lines = [];
  const names = ["log", "error", "warn", "info", "debug"];
  const originals = new Map(names.map((name) => [name, console[name]]));
  for (const name of names)
    console[name] = (...args) => {
      lines.push(format(...args));
    };
  let returned;
  let thrown;
  let threw = false;
  try {
    returned = await work();
  } catch (error) {
    threw = true;
    thrown = error;
  } finally {
    for (const [name, original] of originals) console[name] = original;
  }
  return { returned, threw, thrown, lines };
}

// A line the product writes is one JSON object; anything else is plain text.
export function parseLine(line) {
  try {
    const value = JSON.parse(line);
    return value !== null && typeof value === "object" && !Array.isArray(value)
      ? value
      : undefined;
  } catch {
    return undefined;
  }
}

// A real account database on a temporary file, and its cleanup.
export async function temporaryDatabase() {
  const { AccountDatabase } = await loadDist("server/database.js");
  const directory = await mkdtemp(join(tmpdir(), "loop2-trial-"));
  const path = join(directory, "accounts.sqlite");
  const database = new AccountDatabase(path);
  return {
    database,
    path,
    async dispose() {
      database.close();
      await rm(directory, { recursive: true, force: true });
    },
  };
}

export function createAccount(database, email) {
  const account = database.createAccount(email, "hash-" + email);
  if (!account) throw new Error("precondition: the account " + email);
  return account;
}
