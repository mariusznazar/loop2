import { lstat, mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = fileURLToPath(new URL("../", import.meta.url));
const roleKinds = {
  page: "background",
  panel: "background",
  highlight: "background",
  divider: "other",
  "control-border": "other",
  "text-strong": "text",
  text: "text",
  "text-secondary": "text",
  "text-label": "text",
  "text-disabled": "text",
  positive: "text",
  warning: "text",
  danger: "text",
  discovery: "text",
  "player-change": "text",
  character: "other",
  "tile-hidden": "other",
  "tile-revealed": "other",
  "link-highlight": "other",
  depleted: "other",
  focus: "other",
  selected: "other",
  "tile-edge": "other",
};
const familyNames = ["font-ui", "font-mono"];
const weightNames = ["font-weight-regular", "font-weight-medium"];
const lengthNames = [
  "font-size-label",
  "font-size-description",
  "font-size-body",
  "font-size-heading",
  "font-size-map-title",
  "font-size-game-title",
  "space-2",
  "space-4",
  "space-8",
  "space-12",
  "space-16",
  "space-24",
  "space-32",
  "border-width",
  "bar-width",
  "character-width",
  "step-width",
  "link-width",
  "focus-width",
  "focus-offset",
];
const tokenNames = [
  ...familyNames,
  ...weightNames,
  ...lengthNames,
  "step-dash",
];
const fontFiles = ["Geist.woff2", "GeistMono.woff2", "OFL.txt"];

function exactKeys(value, keys, label) {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.keys(value).length !== keys.length ||
    !keys.every((key) => Object.hasOwn(value, key))
  ) {
    throw new Error(`Invalid token schema: ${label}`);
  }
}

function record(value, keys, label) {
  exactKeys(value, keys, label);
  if (typeof value.source !== "string" || !value.source.trim()) {
    throw new Error(`Missing token source: ${label}`);
  }
}

function validateTokens(data) {
  exactKeys(data, ["roles", "tokens"], "root");
  exactKeys(data.roles, Object.keys(roleKinds), "roles");
  exactKeys(data.tokens, tokenNames, "tokens");
  for (const [name, kind] of Object.entries(roleKinds)) {
    const item = data.roles[name];
    record(item, ["kind", "value", "source"], name);
    const valid =
      name === "depleted"
        ? typeof item.value === "number" &&
          Number.isFinite(item.value) &&
          item.value >= 0 &&
          item.value <= 1
        : typeof item.value === "string" && /^#[0-9a-f]{6}$/i.test(item.value);
    if (item.kind !== kind || !valid) {
      throw new Error(`Invalid role value or kind: ${name}`);
    }
  }
  for (const name of tokenNames) {
    const item = data.tokens[name];
    record(item, ["value", "source"], name);
    let valid;
    if (familyNames.includes(name)) {
      valid =
        typeof item.value === "string" &&
        /^[A-Za-z][A-Za-z0-9 ]{0,63}$/.test(item.value);
    } else if (weightNames.includes(name)) {
      valid =
        Number.isInteger(item.value) && item.value >= 1 && item.value <= 1000;
    } else if (name === "step-dash") {
      valid =
        typeof item.value === "string" &&
        /^[1-9]\d*(?:\.\d+)? [1-9]\d*(?:\.\d+)?$/.test(item.value);
    } else {
      valid =
        typeof item.value === "string" &&
        /^(?:[1-9]\d*(?:\.\d+)?|0\.\d*[1-9]\d*)px$/.test(item.value);
    }
    if (!valid) throw new Error(`Invalid token value: ${name}`);
  }
  if (
    data.tokens["font-weight-regular"].value >
    data.tokens["font-weight-medium"].value
  ) {
    throw new Error("Invalid font weight token order");
  }
}

/** Reject links in every existing path component, including Windows junctions. */
export async function assertPlainPath(target, { allowMissing = false } = {}) {
  const absolute = path.resolve(target);
  const parent = path.dirname(absolute);
  if (parent !== absolute) await assertPlainPath(parent, { allowMissing });
  try {
    const stat = await lstat(absolute);
    if (stat.isSymbolicLink())
      throw new Error(`Unsafe symlink path: ${absolute}`);
    return stat;
  } catch (error) {
    if (allowMissing && error.code === "ENOENT") return null;
    throw error;
  }
}

function within(parent, target) {
  const relative = path.relative(parent, target);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) &&
      relative !== ".." &&
      !path.isAbsolute(relative))
  );
}

async function inputFile(sourceRoot, relative) {
  const filename = path.join(sourceRoot, relative);
  const stat = await assertPlainPath(filename);
  if (!stat.isFile()) throw new Error(`Invalid asset input path: ${relative}`);
  return readFile(filename);
}

function validateFont(bytes, name) {
  if (
    bytes.length < 48 ||
    bytes.toString("ascii", 0, 4) !== "wOF2" ||
    bytes.readUInt32BE(8) !== bytes.length ||
    bytes.readUInt16BE(12) === 0 ||
    bytes.readUInt16BE(14) !== 0 ||
    bytes.readUInt32BE(16) === 0 ||
    bytes.readUInt32BE(20) === 0 ||
    bytes.readUInt32BE(20) > bytes.length - 48
  ) {
    throw new Error(`Invalid WOFF2 font header: ${name}`);
  }
}

function tokenCss(data) {
  const declarations = Object.entries(data.roles).map(
    ([name, item]) => `  --${name}: ${item.value};`,
  );
  for (const [name, item] of Object.entries(data.tokens)) {
    const value = familyNames.includes(name)
      ? JSON.stringify(item.value)
      : item.value;
    declarations.push(`  --${name}: ${value};`);
  }
  const faces = familyNames.map((name, index) => {
    const family = JSON.stringify(data.tokens[name].value);
    const low = data.tokens["font-weight-regular"].value;
    const high = data.tokens["font-weight-medium"].value;
    return `@font-face {\n  font-family: ${family};\n  src: url("./fonts/${fontFiles[index]}") format("woff2");\n  font-weight: ${low} ${high};\n  font-style: normal;\n  font-display: swap;\n}`;
  });
  return `:root {\n${declarations.join("\n")}\n}\n\n${faces.join("\n\n")}\n`;
}

/**
 * Emit styles into an existing caller-owned directory; never remove files.
 * Outputs inside the source tree must stay under its generated dist/ or .runs/.
 * All source records, asset headers and destination paths are checked before writes.
 */
export async function emitStyleAssets({
  sourceRoot = defaultRoot,
  outputDirectory,
}) {
  const source = path.resolve(sourceRoot);
  const output = path.resolve(outputDirectory);
  const sourceStat = await assertPlainPath(source);
  const outputStat = await assertPlainPath(output);
  if (!sourceStat.isDirectory() || !outputStat.isDirectory()) {
    throw new Error("Asset source and output paths must be directories");
  }
  if (
    within(output, source) ||
    (within(source, output) &&
      !["dist", ".runs"].some((name) =>
        within(path.join(source, name), output),
      )) ||
    (await realpath(output)) !== output
  ) {
    throw new Error(
      "Unsafe asset output path; expected a canonical generated directory",
    );
  }
  const data = JSON.parse(
    (await inputFile(source, "src/browser/view/design-tokens.json")).toString(
      "utf8",
    ),
  );
  validateTokens(data);
  const styles = await inputFile(source, "src/browser/view/styles.css");
  const assets = new Map();
  for (const name of fontFiles) {
    const bytes = await inputFile(source, `assets/fonts/${name}`);
    if (name.endsWith(".woff2")) validateFont(bytes, name);
    else if (
      !bytes.includes(Buffer.from("Copyright")) ||
      !bytes.includes(Buffer.from("SIL OPEN FONT LICENSE Version 1.1"))
    ) {
      throw new Error("Missing font copyright or OFL licence");
    }
    assets.set(`fonts/${name}`, bytes);
  }
  assets.set("design-tokens.css", tokenCss(data));
  assets.set("styles.css", styles);
  for (const name of assets.keys()) {
    const stat = await assertPlainPath(path.join(output, name), {
      allowMissing: true,
    });
    if (stat && (!stat.isFile() || stat.nlink !== 1)) {
      throw new Error(`Unsafe asset destination path: ${name}`);
    }
  }
  await mkdir(path.join(output, "fonts"), { recursive: true });
  for (const [name, bytes] of assets) {
    await writeFile(path.join(output, name), bytes);
  }
}
