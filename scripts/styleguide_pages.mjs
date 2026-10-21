/** Bounded, non-executing page construction and authored-style cascade evidence. */
import path from "node:path";
import { existsSync, readFileSync, realpathSync, lstatSync } from "node:fs";
import { createHash } from "node:crypto";
import ts from "typescript";
import { parsers as htmlParsers } from "prettier/plugins/html";
import { parsers as cssParsers } from "prettier/plugins/postcss";
import { inspectSources, inspectImports } from "./styleguide_source.mjs";
import { cssName } from "./styleguide_css.mjs";

const unknown = Symbol("unresolved source value");
const located = (source, line, reason) => ({ path: source.path, line, reason });
const inherited =
  /^(?:color|font(?:-.+)?|line-height|visibility|fill|stroke(?:-.+)?|text-align)$/;
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

function originalBytes(root, relative) {
  if (
    typeof relative !== "string" ||
    !relative ||
    /[\\:]/.test(relative) ||
    [...relative].some((character) => character.charCodeAt(0) < 32) ||
    path.posix.isAbsolute(relative) ||
    path.posix.normalize(relative) !== relative ||
    relative.split("/").some((part) => [".", "..", ""].includes(part))
  )
    throw new Error("Unsafe evidence path");
  let current = path.resolve(root);
  for (const part of relative.split("/")) {
    current = path.join(current, part);
    if (lstatSync(current).isSymbolicLink())
      throw new Error(`Evidence path crosses a link: ${relative}`);
  }
  if (!lstatSync(current).isFile())
    throw new Error(`Not an evidence file: ${relative}`);
  return readFileSync(current);
}

function sourceRequest(files) {
  return {
    schema: 2,
    files,
    dependencies: [],
    configurations: [],
    imports: [],
    unresolved: [],
  };
}

function validatedSources(facts, root) {
  if (
    facts.schema !== 3 ||
    !["files", "dependencies", "configurations", "imports", "unresolved"].every(
      (key) => Array.isArray(facts[key]),
    )
  )
    throw new Error("Page analysis requires complete source schema 3");
  const snapshots = [
    ...facts.files,
    ...facts.dependencies,
    ...facts.configurations,
  ];
  const seen = new Set();
  for (const file of snapshots) {
    const bytes = originalBytes(root, file.path);
    if (
      seen.has(file.path) ||
      file.digest !== digest(bytes) ||
      file.source !== (file.kind === "font" ? null : bytes.toString("utf8"))
    )
      throw new Error(
        `Duplicate, forged or stale source evidence: ${file.path}`,
      );
    seen.add(file.path);
  }
  const originals = [...facts.files, ...facts.dependencies];
  const byPath = new Map(originals.map((file) => [file.path, file]));
  const parsed = inspectImports({
    files: originals.filter((file) => file.kind === "typescript"),
  });
  const edges = parsed.files.flatMap((file) => file.imports);
  if (edges.length !== facts.imports.length)
    throw new Error("Missing import evidence");
  const edgeIds = new Set();
  for (const edge of facts.imports) {
    const id = `${edge.path}:${edge.start}`;
    const actual = edges.find(
      (item) => item.path === edge.path && item.start === edge.start,
    );
    if (
      edgeIds.has(id) ||
      !actual ||
      Object.keys(actual).some(
        (key) => JSON.stringify(actual[key]) !== JSON.stringify(edge[key]),
      )
    )
      throw new Error("Forged import location or expression");
    edgeIds.add(id);
    if (edge.resolution === "local") {
      if (
        typeof edge.specifier !== "string" ||
        /[\\:%?#]/.test(edge.specifier) ||
        !edge.specifier.startsWith(".")
      )
        throw new Error("Unsafe import evidence");
      const relative = path.posix.normalize(
        path.posix.join(path.posix.dirname(edge.path), edge.specifier),
      );
      const extension = path.posix.extname(relative);
      const suffixes = {
        ".js": [".ts", ".tsx", ".d.ts", ".js", ".jsx"],
        ".mjs": [".mts", ".d.mts", ".mjs"],
        ".cjs": [".cts", ".d.cts", ".cjs"],
      }[extension];
      const candidates = suffixes
        ? suffixes.map(
            (suffix) => relative.slice(0, -extension.length) + suffix,
          )
        : [relative];
      const expected = candidates.find(
        (candidate) =>
          (edge.kind.endsWith("-type") || !/\.d\.[cm]?ts$/.test(candidate)) &&
          within(root, candidate),
      );
      if (expected !== edge.target || !byPath.has(edge.target))
        throw new Error("Missing or mismatched acquired dependency");
    } else if (edge.resolution === "generated") {
      if (!byPath.has(edge.target) || !facts.configurations.length)
        throw new Error("Missing generated import original/configuration");
      if (
        !edge.path.startsWith("tests/") ||
        typeof edge.specifier !== "string" ||
        !edge.specifier.startsWith(".") ||
        /[\\:%?#]/.test(edge.specifier)
      )
        throw new Error("Unsafe generated import relation");
      const target = path.posix.normalize(
        path.posix.join(path.posix.dirname(edge.path), edge.specifier),
      );
      const configs = new Map(
        facts.configurations.map((file) => [
          file.path,
          JSON.parse(file.source),
        ]),
      );
      const browser = configs.get("tsconfig.browser.json");
      let mapped = false;
      for (const [name, config] of configs) {
        if (
          !["tsconfig.browser.json", "tsconfig.styleguide.json"].includes(name)
        )
          throw new Error("Unrecognized generated import configuration");
        const standalone = name === "tsconfig.styleguide.json";
        const options = {
          ...(standalone ? browser?.compilerOptions : {}),
          ...config.compilerOptions,
        };
        if (
          (standalone
            ? config.extends !== "./tsconfig.browser.json"
            : "extends" in config) ||
          options.module !== "NodeNext" ||
          options.moduleResolution !== "NodeNext" ||
          typeof options.rootDir !== "string" ||
          typeof options.outDir !== "string" ||
          !options.outDir ||
          options.outDir === "." ||
          options.noEmit ||
          options.emitDeclarationOnly ||
          ["paths", "rootDirs", "outFile", "moduleSuffixes", "jsx"].some(
            (key) => key in options,
          )
        )
          throw new Error("Unproved generated import compiler mapping");
        for (const directory of [options.rootDir, options.outDir])
          if (
            directory !== "." &&
            (path.posix.normalize(directory) !== directory ||
              directory.startsWith("../") ||
              /[\\:]/.test(directory) ||
              path.posix.isAbsolute(directory))
          )
            throw new Error("Escaping generated import compiler directory");
        if (!target.startsWith(options.outDir + "/")) continue;
        const original = path.posix.join(
          options.rootDir,
          target.slice(options.outDir.length + 1),
        );
        const extension = path.posix.extname(original);
        const candidates = (
          { ".js": [".ts", ".tsx"], ".mjs": [".mts"], ".cjs": [".cts"] }[
            extension
          ] ?? []
        ).map((suffix) => original.slice(0, -extension.length) + suffix);
        const expected = candidates.find((candidate) =>
          within(root, candidate),
        );
        if (expected === edge.target) mapped = true;
      }
      if (!mapped) throw new Error("Forged generated import target");
    } else if (
      !["tooling", "unresolved"].includes(edge.resolution) ||
      edge.target !== null
    )
      throw new Error("Invalid import resolution evidence");
  }
  const dependencies = inspectSources(sourceRequest(facts.dependencies)).files;
  return new Map(
    [...facts.files, ...dependencies].map((file) => [file.path, file]),
  );
}

function within(root, relative) {
  const absolute = path.resolve(root, relative);
  const local = path.relative(root, absolute);
  if (local.startsWith("..") || path.isAbsolute(local)) return null;
  if (!existsSync(absolute)) return null;
  const actual = path.relative(realpathSync(root), realpathSync(absolute));
  return actual.startsWith("..") || path.isAbsolute(actual) ? null : absolute;
}

function compilerMount(root) {
  const file = within(root, "tsconfig.browser.json");
  if (!file) return null;
  const parsed = ts.parseConfigFileTextToJson(file, readFileSync(file, "utf8"));
  const options = parsed.config?.compilerOptions;
  if (parsed.error || !options?.rootDir || !options?.outDir) return null;
  return { source: options.rootDir, output: options.outDir };
}

// Identity is only the admission gate for the independently checked derivation below.
// These complete programs include the input validation, helpers, import bindings and
// top-level effects. Exact bytes deliberately refuse even harmless producer edits.
// Do not replace this with whitespace-stripped tokens (ASI changes their semantics).
const producerPrograms = {
  "scripts/style-assets.mjs":
    "11c193c2eec8c36d0a94fe573a441655dfb3581bdb8f6ee943efef03dae6d472",
  "scripts/build.mjs":
    "9aff37212631bc2bd9d009c98a81a941ac1909a6cd4a7b3d5a14e6cd78f4a6b1",
  "scripts/kitchen-sink.mjs":
    "63f2a373419e579219a7e16ee590cbacabb4278bdca051e24c385e05668f2d0b",
};
const certifiedDeclarations = new WeakMap();
const tokenPath = "src/browser/view/design-tokens.json";
const roleKinds = {
  page: "background",
  panel: "background",
  highlight: "background",
  divider: "other",
  "control-border": "other",
  selected: "other",
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
  "tile-edge": "other",
  "link-highlight": "other",
  depleted: "other",
  focus: "other",
};
const familyTokens = ["font-ui", "font-mono"];
const weightTokens = ["font-weight-regular", "font-weight-medium"];
const lengthTokens = [
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

function freezeEvidence(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freezeEvidence);
    Object.freeze(value);
  }
  return value;
}

function witness(file, node, tree) {
  const start = node.getStart(tree),
    end = node.end;
  return {
    path: file.path,
    digest: file.digest,
    line: tree.getLineAndCharacterOfPosition(start).line + 1,
    start,
    end,
  };
}

function programWitness(root, name, functionName) {
  const bytes = originalBytes(root, name);
  if (digest(bytes) !== producerPrograms[name])
    throw new Error(`Unrecognized origin producer program: ${name}`);
  const file = { path: name, digest: digest(bytes) };
  const tree = ts.createSourceFile(
    name,
    bytes.toString("utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  let node = tree.statements.find(
    (statement) =>
      ts.isFunctionDeclaration(statement) &&
      statement.name?.text === functionName,
  );
  if (!node) {
    function find(current) {
      if (
        ts.isCallExpression(current) &&
        ts.isIdentifier(current.expression) &&
        current.expression.text === functionName
      )
        node = current;
      ts.forEachChild(current, find);
    }
    find(tree);
  }
  return {
    file,
    tree,
    anchor: node ? witness(file, node, tree) : { ...file, line: 1 },
  };
}

function tokenRecords(file) {
  const data = JSON.parse(file.source);
  const tree = ts.parseJsonText(file.path, file.source);
  if (tree.parseDiagnostics.length)
    throw new Error("Unparseable original token records");
  function properties(node) {
    if (!node || !ts.isObjectLiteralExpression(node))
      throw new Error("Invalid token object");
    const map = new Map();
    for (const property of node.properties) {
      if (
        !ts.isPropertyAssignment(property) ||
        !ts.isStringLiteral(property.name) ||
        map.has(property.name.text)
      )
        throw new Error("Duplicate or unsupported token key");
      map.set(property.name.text, property.initializer);
    }
    return map;
  }
  const top = properties(tree.statements[0]?.expression);
  if (top.size !== 2 || !top.has("roles") || !top.has("tokens"))
    throw new Error("Invalid token root");
  const result = [];
  const names = new Set();
  for (const group of ["roles", "tokens"]) {
    const expected =
      group === "roles"
        ? Object.keys(roleKinds)
        : [...familyTokens, ...weightTokens, ...lengthTokens, "step-dash"];
    const keys = [...properties(top.get(group)).keys()];
    if (
      keys.length !== expected.length ||
      expected.some((key) => !keys.includes(key))
    )
      throw new Error(
        "Token keys cannot pass the recognized producer validator",
      );
    for (const [name, node] of properties(top.get(group))) {
      const fields = properties(node),
        record = data[group][name];
      if (
        names.has(name) ||
        !/^[a-z][a-z0-9-]*$/.test(name) ||
        fields.size !== (group === "roles" ? 3 : 2) ||
        !fields.has("value") ||
        !fields.has("source") ||
        typeof record.source !== "string" ||
        !record.source.trim() ||
        !["string", "number"].includes(typeof record.value) ||
        (group === "roles" &&
          !["background", "text", "other"].includes(record.kind))
      )
        throw new Error("Invalid token record or colliding name");
      names.add(name);
      const family = group === "tokens" && familyTokens.includes(name);
      let valid;
      if (group === "roles")
        valid =
          record.kind === roleKinds[name] &&
          (name === "depleted"
            ? typeof record.value === "number" &&
              Number.isFinite(record.value) &&
              record.value >= 0 &&
              record.value <= 1
            : typeof record.value === "string" &&
              /^#[0-9a-f]{6}$/i.test(record.value));
      else if (family)
        valid =
          typeof record.value === "string" &&
          /^[A-Za-z][A-Za-z0-9 ]{0,63}$/.test(record.value);
      else if (weightTokens.includes(name))
        valid =
          Number.isInteger(record.value) &&
          record.value >= 1 &&
          record.value <= 1000;
      else if (name === "step-dash")
        valid =
          typeof record.value === "string" &&
          /^[1-9]\d*(?:\.\d+)? [1-9]\d*(?:\.\d+)?$/.test(record.value);
      else
        valid =
          typeof record.value === "string" &&
          /^(?:[1-9]\d*(?:\.\d+)?|0\.\d*[1-9]\d*)px$/.test(record.value);
      if (!valid)
        throw new Error(
          "Token value cannot pass the recognized producer validator",
        );
      result.push({
        name,
        kind: group === "roles" ? "role" : "token",
        roleKind: record.kind ?? null,
        value: family ? JSON.stringify(record.value) : String(record.value),
        source: {
          ...witness(file, fields.get("value"), tree),
          pointer: `/${group}/${name}/value`,
        },
      });
    }
  }
  if (
    data.tokens["font-weight-regular"].value >
    data.tokens["font-weight-medium"].value
  )
    throw new Error("Invalid font weight order");
  return { data, records: result };
}

function outputReference(reference, from, output) {
  if (
    typeof reference !== "string" ||
    !reference ||
    /[\\:%?#]/.test(reference) ||
    [...reference].some((character) => character.charCodeAt(0) <= 32) ||
    reference.startsWith("//")
  )
    throw new Error("Unsafe output loading reference");
  const target = path.posix.normalize(
    reference.startsWith("/")
      ? output + reference
      : path.posix.join(path.posix.dirname(from), reference),
  );
  if (!target.startsWith(output + "/"))
    throw new Error("Output loading reference escapes caller root");
  return target;
}

function proveOrigins(source, sources, root) {
  const standalone = source.path === "tools/styleguide/index.html";
  const applies = standalone || source.path === "src/browser/index.html";
  const result = {
    status: applies ? "unresolved" : "not-applicable",
    declarations: [],
    loaded: [],
    unresolved: [],
  };
  if (!applies) return result;
  try {
    const emitter = programWitness(
      root,
      "scripts/style-assets.mjs",
      "tokenCss",
    );
    const callerName = standalone
      ? "scripts/kitchen-sink.mjs"
      : "scripts/build.mjs";
    const caller = programWitness(root, callerName, "emitStyleAssets");
    const emission = emitter.tree.statements.find(
      (statement) =>
        ts.isFunctionDeclaration(statement) &&
        statement.name?.text === "emitStyleAssets",
    );
    const inputs = new Map([
      [emitter.file.path, emitter.file.digest],
      [caller.file.path, caller.file.digest],
    ]);
    const read = (name) => {
      const bytes = originalBytes(root, name);
      if (sources.has(name) && sources.get(name).digest !== digest(bytes))
        throw new Error(`Stale inventoried origin: ${name}`);
      inputs.set(name, digest(bytes));
      return bytes;
    };
    // Both inspected callers have fixed roots, and compiler options must agree.
    const output = standalone ? ".runs/styleguide/public" : "dist/public";
    const configNames = [
      "tsconfig.browser.json",
      ...(standalone ? ["tsconfig.styleguide.json"] : []),
    ];
    const configs = configNames.map((name) => ({
      path: name,
      source: read(name).toString("utf8"),
    }));
    const browser = JSON.parse(configs[0].source);
    const config = standalone ? JSON.parse(configs[1].source) : browser;
    const options = { ...browser.compilerOptions, ...config.compilerOptions };
    if (
      browser.extends ||
      browser.compilerOptions?.rootDir !== "src/browser" ||
      browser.compilerOptions?.outDir !== "dist/public" ||
      (standalone && config.extends !== "./tsconfig.browser.json") ||
      options.rootDir !== (standalone ? "." : "src/browser") ||
      options.outDir !== output ||
      options.module !== "NodeNext" ||
      options.moduleResolution !== "NodeNext" ||
      options.noEmit ||
      options.emitDeclarationOnly ||
      ["paths", "rootDirs", "outFile", "moduleSuffixes", "jsx"].some(
        (key) => key in options,
      )
    )
      throw new Error("Unproved origin compiler/output mapping");
    const packageData = JSON.parse(read("package.json").toString("utf8"));
    const command = standalone ? "kitchen-sink" : "build";
    if (
      packageData.type !== "module" ||
      packageData.scripts?.[command] !== `node ${callerName}` ||
      packageData.scripts?.[`pre${command}`] ||
      packageData.scripts?.[`post${command}`]
    )
      throw new Error("Unproved package producer entry");
    const tokens = sources.get(tokenPath);
    if (!tokens || tokens.kind !== "token-values")
      throw new Error("Missing governed token origin");
    if (digest(read(tokenPath)) !== tokens.digest)
      throw new Error("Stale token origin");
    const { data, records } = tokenRecords(tokens);
    const declarations = records.map(
      (record) => `  --${record.name}: ${record.value};`,
    );
    const faces = ["font-ui", "font-mono"].map(
      (name, index) =>
        `@font-face {\n  font-family: ${JSON.stringify(data.tokens[name].value)};\n  src: url("./fonts/${["Geist.woff2", "GeistMono.woff2"][index]}") format("woff2");\n  font-weight: ${data.tokens["font-weight-regular"].value} ${data.tokens["font-weight-medium"].value};\n  font-style: normal;\n  font-display: swap;\n}`,
    );
    const expected = `:root {\n${declarations.join("\n")}\n}\n\n${faces.join("\n\n")}\n`;
    const generatedPath = output + "/design-tokens.css";
    const generated = read(generatedPath);
    if (!generated.equals(Buffer.from(expected)))
      throw new Error("Generated token output has no current source origin");
    const styles = new Map([
      [generatedPath, null],
      [output + "/styles.css", "src/browser/view/styles.css"],
    ]);
    if (standalone)
      styles.set(output + "/styleguide.css", "tools/styleguide/styles.css");
    for (const [target, original] of styles) {
      if (original) {
        if (!sources.has(original) || sources.get(original).kind !== "css")
          throw new Error(`Missing governed stylesheet origin: ${original}`);
        if (!read(target).equals(read(original)))
          throw new Error(`Stale copied stylesheet: ${target}`);
      }
    }
    for (const name of ["Geist.woff2", "GeistMono.woff2", "OFL.txt"]) {
      const bytes = read("assets/fonts/" + name);
      if (
        name.endsWith(".woff2")
          ? bytes.length < 48 ||
            bytes.toString("ascii", 0, 4) !== "wOF2" ||
            bytes.readUInt32BE(8) !== bytes.length ||
            bytes.readUInt16BE(12) === 0 ||
            bytes.readUInt16BE(14) !== 0 ||
            bytes.readUInt32BE(16) === 0 ||
            bytes.readUInt32BE(20) === 0 ||
            bytes.readUInt32BE(20) > bytes.length - 48
          : !bytes.includes(Buffer.from("Copyright")) ||
            !bytes.includes(Buffer.from("SIL OPEN FONT LICENSE Version 1.1"))
      )
        throw new Error(
          "Font input cannot pass the recognized producer validator",
        );
      if (!read(output + "/fonts/" + name).equals(bytes))
        throw new Error(`Stale emitted font input: ${name}`);
    }
    let expectedHtml = source.source;
    if (standalone) {
      const marker = "<!-- STYLEGUIDE_TOKEN_DATA -->";
      if (expectedHtml.split(marker).length !== 2)
        throw new Error("Missing unique token-data marker");
      const escaped = JSON.stringify(data).replace(
        /[<>&\u2028\u2029]/g,
        (character) =>
          `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`,
      );
      expectedHtml = expectedHtml.replace(
        marker,
        () =>
          `<script type="application/json" id="styleguide-tokens">${escaped}</script>`,
      );
    }
    const documentPath = output + "/index.html",
      documentBytes = read(documentPath);
    if (!documentBytes.equals(Buffer.from(expectedHtml)))
      throw new Error(
        "Output HTML is not the caller's current source transformation",
      );
    const loading = [];
    function visit(node) {
      if (node.kind === "element") {
        const attrs = Object.fromEntries(
          node.attrs.map((attribute) => [attribute.name, attribute.value]),
        );
        if (node.name === "base")
          throw new Error("Output base URL cannot certify loading");
        const style =
          node.name === "link" &&
          attrs.rel?.split(/\s+/).includes("stylesheet");
        const script = node.name === "script" && attrs.src;
        if (style || script) {
          const reference = style ? attrs.href : attrs.src;
          const target = outputReference(reference, documentPath, output);
          const bytes = read(target);
          const edge = {
            path: documentPath,
            digest: digest(documentBytes),
            line: node.sourceSpan.start.line + 1,
            reference,
            target,
            targetDigest: digest(bytes),
            kind: style ? "style" : "module",
          };
          loading.push(edge);
          if (
            style &&
            (!styles.has(target) ||
              "disabled" in attrs ||
              attrs.rel.includes("alternate"))
          )
            throw new Error(
              "Output stylesheet has no recognized producer/loading relation",
            );
          if (style) {
            const tree = cssParsers.css.parse(bytes.toString("utf8"));
            if (
              tree.nodes.some(
                (child) =>
                  child.type === "css-atrule" &&
                  child.name.toLowerCase() === "import",
              )
            )
              throw new Error(
                "Output CSS import origin is outside the finite emitter graph",
              );
          }
        }
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(htmlParsers.html.parse(documentBytes.toString("utf8")));
    const generatedLoading = loading.filter(
      (edge) => edge.target === generatedPath,
    );
    result.declarations = generatedLoading.length
      ? records.map((record, index) =>
          freezeEvidence({
            ...record,
            producer: emitter.anchor,
            emission: witness(emitter.file, emission, emitter.tree),
            caller: caller.anchor,
            output: {
              path: generatedPath,
              digest: digest(generated),
              line: index + 2,
            },
            loading: generatedLoading,
            configurations: configs.map((config) => ({
              path: config.path,
              digest: inputs.get(config.path),
            })),
          }),
        )
      : [];
    result.loaded = loading;
    result.inputs = [...inputs].map(([name, hash]) => ({
      path: name,
      digest: hash,
    }));
    result.output = output;
    result.status = "certified";
    // Recheck after the graph is inspected; there is no persistent success cache.
    for (const [name, hash] of inputs)
      if (digest(originalBytes(root, name)) !== hash)
        throw new Error("Origin bytes changed during inspection");
  } catch (error) {
    result.status = "unresolved";
    result.declarations = [];
    result.unresolved.push(
      located(
        source,
        1,
        `Generated origin cannot be certified: ${error.message}`,
      ),
    );
  }
  return result;
}

/** Every inventoried HTML document gets an independent page; no shared success cache. */
export function analyzePages(facts, { root }) {
  const sources = validatedSources(facts, root);
  const mount = compilerMount(root);
  const pages = facts.files
    .filter((file) => file.kind === "html" && file.path.endsWith(".html"))
    .map((source) => {
      const origins = proveOrigins(
        source,
        new Map(facts.files.map((file) => [file.path, file])),
        root,
      );
      const page = buildPage(
        source,
        sources,
        root,
        mount,
        origins,
        facts.imports,
      );
      page.origins = origins;
      page.unresolved.push(...origins.unresolved);
      page.unresolved.push(...facts.unresolved);
      return page;
    });
  for (const file of [
    ...facts.files,
    ...facts.dependencies,
    ...facts.configurations,
  ])
    if (digest(originalBytes(root, file.path)) !== file.digest)
      throw new Error(
        `Source bytes changed during page inspection: ${file.path}`,
      );
  return { schema: 1, inventory: facts.files.map((file) => file.path), pages };
}

function buildPage(source, sources, root, mount, origins, imports) {
  const page = {
    path: source.path,
    loaded: [],
    elements: [],
    declarations: [],
    unresolved: [],
  };
  const issue = (file, line, reason) =>
    page.unresolved.push(located(file, line, reason));
  const element = (tag, file, line, attributes = {}, parent = null) => {
    const node = {
      id: page.elements.length,
      tag,
      attributes,
      parent,
      path: file.path,
      line,
      unknownAttributes: [],
      inline: [],
      attached: parent !== null,
    };
    page.elements.push(node);
    return node;
  };
  const html = element("html", source, 1);
  html.attached = true;
  const head = element("head", source, 1, {}, html.id);
  const body = element("body", source, 1, {}, html.id);
  const inlineOwners = new Map();
  const embeddedDeclarations = new Set();
  const stylesheetOwners = new Map();
  let nextOrder = 0;
  const order = (declarations, target = null, condition = "", owner = null) => {
    for (const declaration of declarations) {
      if (target !== null) {
        if (
          inlineOwners.has(declaration) &&
          inlineOwners.get(declaration) !== target
        )
          issue(
            declaration,
            declaration.line,
            "original line cannot distinguish inline declaration owners",
          );
        inlineOwners.set(declaration, target);
      }
      const ordered = {
        ...declaration,
        target,
        order: nextOrder++,
        condition,
      };
      page.declarations.push(ordered);
      if (certifiedDeclarations.has(declaration))
        certifiedDeclarations.set(
          ordered,
          certifiedDeclarations.get(declaration),
        );
      if (owner !== null) stylesheetOwners.set(ordered, owner);
    }
  };
  const loaded = (file, via) => {
    page.loaded.push({ path: file.path, via });
    page.unresolved.push(...file.unresolved);
  };
  function resolve(reference, from, kind, line) {
    if (kind === "module" && from.kind === "typescript") {
      const relations = imports.filter(
        (edge) =>
          edge.path === from.path &&
          edge.line === line &&
          edge.specifier === reference,
      );
      const targets = new Set(relations.map((edge) => edge.target));
      if (
        !relations.length ||
        targets.size !== 1 ||
        relations.some(
          (edge) => !["local", "generated"].includes(edge.resolution),
        ) ||
        !sources.has(relations[0].target)
      ) {
        issue(
          from,
          line,
          "Module load has no unique acquired original relationship",
        );
        return null;
      }
      return sources.get(relations[0].target);
    }
    if (origins.status === "certified" && kind === "style") {
      try {
        const target = outputReference(
          reference,
          from.path.startsWith(origins.output + "/")
            ? from.path
            : origins.output + "/index.html",
          origins.output,
        );
        const edge = origins.loaded.find(
          (item) => item.target === target && item.kind === "style",
        );
        if (!edge)
          throw new Error("Stylesheet is outside certified loading graph");
        const bytes = originalBytes(root, target);
        if (digest(bytes) !== edge.targetDigest)
          throw new Error("Stale generated stylesheet");
        const extracted = inspectSources(
          sourceRequest([
            {
              path: target,
              kind: "css",
              source: bytes.toString("utf8"),
              digest: digest(bytes),
              fragments: [],
            },
          ]),
        ).files[0];
        for (const declaration of extracted.declarations) {
          const origin = origins.declarations.find(
            (item) =>
              item.output.path === target &&
              item.output.line === declaration.line &&
              `--${item.name}` === declaration.property &&
              item.value === declaration.value &&
              declaration.selector === ":root" &&
              declaration.priority === "normal",
          );
          if (origin) certifiedDeclarations.set(declaration, origin);
          else if (
            target.endsWith("/styles.css") ||
            target.endsWith("/styleguide.css")
          ) {
            declaration.output = {
              path: target,
              digest: digest(bytes),
              line: declaration.line,
            };
            declaration.path = target.endsWith("/styleguide.css")
              ? "tools/styleguide/styles.css"
              : "src/browser/view/styles.css";
            declaration.digest =
              sources.get(declaration.path)?.digest ?? digest(bytes);
          }
        }
        extracted.certified = true;
        return extracted;
      } catch (error) {
        issue(from, line, error.message);
        return null;
      }
    }
    if (
      typeof reference !== "string" ||
      /^(?:[a-z][\w+.-]*:|\/\/)|[\\\0]/i.test(reference)
    ) {
      issue(from, line, "unresolved or nonlocal loading reference");
      return null;
    }
    const clean = reference.split(/[?#]/, 1)[0];
    if (
      origins.status === "certified" &&
      kind === "module" &&
      from.kind === "html"
    ) {
      try {
        const target = outputReference(
          reference,
          origins.output + "/index.html",
          origins.output,
        );
        if (
          !origins.loaded.some(
            (edge) => edge.target === target && edge.kind === "module",
          )
        )
          throw new Error("Module is outside observed output graph");
        const original =
          (source.path === "tools/styleguide/index.html"
            ? ""
            : "src/browser/") +
          target.slice(origins.output.length + 1).replace(/\.js$/, ".ts");
        if (!sources.has(original))
          throw new Error("Output module lacks acquired original");
        return sources.get(original);
      } catch (error) {
        issue(from, line, error.message);
        return null;
      }
    }
    let relative = path.posix.normalize(
      clean.startsWith("/")
        ? path.posix.join(mount?.source ?? "", clean.slice(1))
        : path.posix.join(path.posix.dirname(from.path), clean),
    );
    if (relative.startsWith("../")) {
      issue(from, line, "loading reference escapes the repository");
      return null;
    }
    const candidates = [relative];
    if (kind === "module") candidates.push(relative.replace(/\.js$/, ".ts"));
    for (const candidate of candidates)
      if (sources.has(candidate)) return sources.get(candidate);
    // Generated CSS is read only through an actual reference and an actual output file.
    if (kind === "style" && mount) {
      if (relative.startsWith(mount.source + "/"))
        relative = mount.output + relative.slice(mount.source.length);
      const physical = within(root, relative);
      if (physical) {
        const bytes = readFileSync(physical);
        const extracted = inspectSources(
          sourceRequest([
            {
              path: relative,
              kind: "css",
              source: bytes.toString("utf8"),
              digest: createHash("sha256").update(bytes).digest("hex"),
              fragments: [],
            },
          ]),
        ).files[0];
        extracted.generated = true;
        return extracted;
      }
    }
    issue(from, line, `missing ${kind} loading target: ${reference}`);
    return null;
  }
  function sheet(file, via, chain = [], condition = "", owner = null) {
    if (chain.includes(file.path)) {
      issue(file, 1, "cyclic stylesheet import");
      return;
    }
    loaded(file, via);
    if (file.generated)
      issue(
        source,
        via.line,
        `generated stylesheet origin mapping is pending: ${file.path}`,
      );
    let tree;
    try {
      tree = cssParsers.css.parse(file.source);
    } catch {
      issue(file, 1, "stylesheet structure cannot be parsed");
      return;
    }
    checkNesting(tree, file, 1);
    // The extractor owns declarations/priority. This parse reads loading edges only.
    for (const node of tree.nodes) {
      if (node.type !== "css-atrule" || node.name.toLowerCase() !== "import")
        continue;
      const params = node.raws?.params ?? "";
      const match =
        /^\s*(?:["']([^"']+)["']|url\(\s*["']?([^\s"')]+)["']?\s*\))\s*(.*)$/.exec(
          params,
        );
      const line = node.source?.start?.line ?? 1;
      if (!match) {
        issue(file, line, "unresolved stylesheet import");
        continue;
      }
      const imported = resolve(match[1] ?? match[2], file, "style", line);
      if (imported)
        sheet(
          imported,
          located(file, line, "CSS import"),
          [...chain, file.path],
          [condition, match[3] ? `@media ${match[3]}` : ""]
            .filter(Boolean)
            .join(" / "),
          owner,
        );
    }
    order(file.declarations, null, condition, owner);
  }
  function checkNesting(node, file, line, ruleDepth = 0) {
    if (node.type === "css-rule") {
      if (ruleDepth)
        issue(file, line, "nested CSS selector composition is unresolved");
      ruleDepth++;
    }
    for (const child of node.nodes ?? [])
      checkNesting(child, file, line, ruleDepth);
  }
  function checkEmbedded(text, file, line) {
    try {
      checkNesting(cssParsers.css.parse(text), file, line);
    } catch {
      issue(file, line, "embedded stylesheet structure cannot be parsed");
    }
  }
  function attach(parent, child, file, line) {
    if (!child || typeof child.id !== "number") {
      issue(file, line, "unresolved appended element");
      return;
    }
    child.parent = parent.id;
    child.attached = parent.attached;
    if (["link", "script"].includes(child.tag) && child.attached)
      issue(file, line, "dynamically attached loading element is unresolved");
    if (child.tag === "style" && child.attached) {
      if (!child.styleDeclarations)
        issue(file, line, "unresolved generated style content");
      else
        order(
          child.styleDeclarations,
          null,
          child.styleCondition ?? "",
          child.id,
        );
    }
    for (const descendant of page.elements.filter(
      (node) => node.parent === child.id,
    ))
      attach(child, descendant, file, line);
  }
  function detach(child, disconnect = true) {
    child.attached = false;
    if (disconnect) child.parent = null;
    page.declarations = page.declarations.filter((declaration) => {
      if (stylesheetOwners.get(declaration) !== child.id) return true;
      stylesheetOwners.delete(declaration);
      return false;
    });
    for (const descendant of page.elements.filter(
      (node) => node.parent === child.id,
    ))
      detach(descendant, false);
  }
  function declarationsIn(file, first, last, inline) {
    return file.declarations.filter(
      (d) =>
        d.line >= first &&
        d.line <= last &&
        (inline
          ? !d.selector &&
            ["inline", "typescript", "html-attribute"].includes(d.context)
          : !!d.selector || d.context.startsWith("@")),
    );
  }
  const modules = new Map();
  function module(file, via) {
    if (modules.has(file.path)) return modules.get(file.path);
    loaded(file, via);
    const tree = ts.createSourceFile(
      file.path,
      file.source,
      ts.ScriptTarget.Latest,
      true,
    );
    const env = new Map();
    modules.set(file.path, env);
    if (tree.parseDiagnostics.length) {
      issue(file, 1, "module cannot be parsed");
      return env;
    }
    const lineOf = (node) =>
      tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1;
    const member = (node) =>
      ts.isPropertyAccessExpression(node)
        ? node.name.text
        : ts.isElementAccessExpression(node) &&
            ts.isStringLiteral(node.argumentExpression)
          ? node.argumentExpression.text
          : null;
    const receiver = (node) =>
      ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)
        ? node.expression
        : null;
    const isNode = (value) =>
      value && typeof value.id === "number" && typeof value.tag === "string";
    const functionValue = (node, scope) => ({ fn: node, scope, call: invoke });
    let depth = 0;
    function invoke(callable, args) {
      if (++depth > 24) {
        depth--;
        issue(
          file,
          lineOf(callable.fn),
          "recursive helper exceeds analysis bound",
        );
        return unknown;
      }
      const local = new Map(callable.scope);
      callable.fn.parameters.forEach((parameter, index) =>
        local.set(parameter.name.getText(tree), args[index] ?? unknown),
      );
      const result = ts.isBlock(callable.fn.body)
        ? statements(callable.fn.body.statements, local)
        : value(callable.fn.body, local);
      depth--;
      return result;
    }
    function value(node, scope) {
      if (!node) return unknown;
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
        return node.text;
      if (ts.isNumericLiteral(node)) return Number(node.text);
      if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
      if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
      if (ts.isIdentifier(node)) return scope.get(node.text) ?? unknown;
      if (
        ts.isAsExpression(node) ||
        ts.isParenthesizedExpression(node) ||
        ts.isNonNullExpression(node)
      )
        return value(node.expression, scope);
      if (ts.isArrowFunction(node) || ts.isFunctionExpression(node))
        return functionValue(node, scope);
      if (ts.isObjectLiteralExpression(node)) {
        const result = {};
        for (const property of node.properties) {
          if (property.name && ts.isComputedPropertyName(property.name)) {
            issue(
              file,
              lineOf(property),
              "computed object member effects are unresolved",
            );
          } else if (ts.isPropertyAssignment(property))
            result[property.name.getText(tree).replace(/^["']|["']$/g, "")] =
              value(property.initializer, scope);
          else if (ts.isShorthandPropertyAssignment(property))
            result[property.name.text] =
              scope.get(property.name.text) ?? unknown;
          else if (ts.isMethodDeclaration(property))
            result[property.name.getText(tree)] = functionValue(
              property,
              scope,
            );
          else
            issue(
              file,
              lineOf(property),
              "unsupported object member effects are unresolved",
            );
        }
        return result;
      }
      if (ts.isPropertyAccessExpression(node)) {
        if (node.expression.getText(tree) === "document")
          return (
            { body, head, documentElement: html }[node.name.text] ?? unknown
          );
        const object = value(node.expression, scope);
        if (isNode(object)) {
          if (node.name.text === "style" || node.name.text === "classList")
            return { owner: object, kind: node.name.text };
          return object.attributes[node.name.text] ?? unknown;
        }
        return object?.[node.name.text] ?? unknown;
      }
      if (ts.isBinaryExpression(node)) {
        if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
          const assigned = value(node.right, scope);
          if (ts.isIdentifier(node.left)) scope.set(node.left.text, assigned);
          else
            write(
              value(receiver(node.left), scope),
              member(node.left),
              assigned,
              node.right,
            );
          return assigned;
        }
        if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
          const left = value(node.left, scope),
            right = value(node.right, scope);
          return left === unknown || right === unknown ? unknown : left + right;
        }
      }
      if (ts.isConditionalExpression(node)) {
        const condition = value(node.condition, scope);
        if (typeof condition === "boolean")
          return value(condition ? node.whenTrue : node.whenFalse, scope);
        issue(
          file,
          lineOf(node),
          "unknown conditional expression effects are unresolved",
        );
        return unknown;
      }
      if (!ts.isCallExpression(node)) {
        issue(
          file,
          lineOf(node),
          "unsupported expression effects are unresolved",
        );
        return unknown;
      }
      const name = member(node.expression),
        receiverNode = receiver(node.expression);
      const args = node.arguments.map((argument) => value(argument, scope));
      const line = lineOf(node);
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        issue(file, line, "dynamic module loading is unresolved");
        return unknown;
      }
      if (
        receiverNode?.getText(tree) === "document" &&
        ["createElement", "createElementNS"].includes(name)
      ) {
        const tag = args[name === "createElement" ? 0 : 1];
        if (typeof tag !== "string") {
          issue(file, line, "dynamic element name");
          return unknown;
        }
        return element(tag, file, line);
      }
      const object = receiverNode ? value(receiverNode, scope) : null;
      if (isNode(object)) {
        if (["append", "appendChild", "replaceChildren"].includes(name)) {
          if (name === "replaceChildren")
            for (const child of page.elements.filter(
              (e) => e.parent === object.id,
            ))
              detach(child);
          for (const child of args) attach(object, child, file, line);
          return args[0];
        }
        if (name === "setAttribute") {
          write(object, args[0], args[1], node.arguments[1]);
          return unknown;
        }
        if (name === "addEventListener") {
          issue(
            file,
            line,
            "event-driven element mutation needs state analysis",
          );
          return unknown;
        }
      }
      if (object?.kind === "classList") {
        const current = object.owner.attributes.class ?? "";
        if (name === "add" && args.every((arg) => typeof arg === "string"))
          object.owner.attributes.class = [current, ...args].join(" ");
        else object.owner.unknownAttributes.push("class");
        return unknown;
      }
      if (object?.kind === "style" && name === "setProperty") {
        addInline(object.owner, args[0], node);
        return unknown;
      }
      const callable = value(node.expression, scope);
      if (callable?.fn) return callable.call(callable, args);
      issue(
        file,
        line,
        "unresolved helper call may change page construction or styles",
      );
      return unknown;
    }
    function addInline(target, property, node) {
      const first = lineOf(node),
        last = tree.getLineAndCharacterOfPosition(node.end).line + 1;
      const declarations = declarationsIn(file, first, last, true).filter(
        (d) => d.property === cssName(String(property)),
      );
      if (!declarations.length)
        issue(
          file,
          first,
          "style assignment lacks extracted declaration evidence",
        );
      order(declarations, target.id);
    }
    function write(object, name, assigned, node) {
      if (!node) return;
      if (object?.kind === "style") {
        addInline(object.owner, name, node);
        return;
      }
      if (!isNode(object)) {
        issue(file, lineOf(node), "assignment receiver is unresolved");
        return;
      }
      if (name === "textContent" && object.tag === "style") {
        if (object.attached)
          issue(
            file,
            lineOf(node),
            "replacement of an attached stylesheet is unresolved",
          );
        const first = lineOf(node),
          last = tree.getLineAndCharacterOfPosition(node.end).line + 1;
        object.styleDeclarations = declarationsIn(file, first, last, false);
        if (assigned === unknown || !object.styleDeclarations.length)
          issue(file, first, "generated CSS content is unresolved");
        else checkEmbedded(assigned, file, first);
      } else if (
        name === "innerHTML" ||
        name === "outerHTML" ||
        name === "style"
      ) {
        issue(
          file,
          lineOf(node),
          "DOM replacement or whole style assignment needs construction analysis",
        );
      } else if (!["textContent", "innerText"].includes(name)) {
        const attribute = name === "className" ? "class" : name;
        if (typeof attribute !== "string" || assigned === unknown)
          object.unknownAttributes.push(attribute ?? "*");
        else if (
          typeof assigned === "boolean" &&
          [
            "disabled",
            "hidden",
            "checked",
            "selected",
            "multiple",
            "required",
          ].includes(attribute)
        ) {
          if (assigned) object.attributes[attribute] = "";
          else delete object.attributes[attribute];
        } else object.attributes[attribute] = String(assigned);
      }
    }
    function statements(nodes, scope) {
      for (const node of nodes)
        if (ts.isFunctionDeclaration(node) && node.name && node.body)
          scope.set(node.name.text, functionValue(node, scope));
      for (const node of nodes) {
        if (ts.isImportDeclaration(node)) {
          if (node.importClause?.isTypeOnly) continue;
          const specifier = node.moduleSpecifier.text;
          const imported = resolve(specifier, file, "module", lineOf(node));
          if (!imported) continue;
          if (imported.kind === "css") {
            sheet(imported, located(file, lineOf(node), "module style import"));
            continue;
          }
          const exports = module(
            imported,
            located(file, lineOf(node), "module import"),
          );
          const bindings = node.importClause?.namedBindings;
          if (bindings && ts.isNamedImports(bindings))
            for (const binding of bindings.elements)
              if (!binding.isTypeOnly)
                scope.set(
                  binding.name.text,
                  exports.get(
                    binding.propertyName?.text ?? binding.name.text,
                  ) ?? unknown,
                );
        } else if (ts.isVariableStatement(node))
          for (const declaration of node.declarationList.declarations)
            scope.set(
              declaration.name.getText(tree),
              value(declaration.initializer, scope),
            );
        else if (ts.isExpressionStatement(node)) value(node.expression, scope);
        else if (ts.isReturnStatement(node))
          return value(node.expression, scope);
        else if (
          ts.isIfStatement(node) ||
          ts.isForOfStatement(node) ||
          ts.isForStatement(node) ||
          ts.isWhileStatement(node)
        )
          issue(
            file,
            lineOf(node),
            "conditional or repeated construction needs state analysis",
          );
        else if (
          ![
            ts.SyntaxKind.FunctionDeclaration,
            ts.SyntaxKind.InterfaceDeclaration,
            ts.SyntaxKind.TypeAliasDeclaration,
            ts.SyntaxKind.EmptyStatement,
          ].includes(node.kind)
        )
          issue(
            file,
            lineOf(node),
            "unsupported module statement needs construction analysis",
          );
      }
      return unknown;
    }
    statements(tree.statements, env);
    return env;
  }
  loaded(source, { path: source.path, line: 1, reason: "page document" });
  const scripts = [];
  function markup(node, parent) {
    if (node.kind !== "element") {
      for (const child of node.children ?? []) markup(child, parent);
      return;
    }
    const line = (node.sourceSpan?.start?.line ?? 0) + 1;
    const attrs = Object.fromEntries(
      node.attrs.map((attr) => [attr.name.toLowerCase(), attr.value]),
    );
    const target =
      { html, head, body }[node.name] ??
      element(node.name, source, line, attrs, parent.id);
    Object.assign(target.attributes, attrs);
    if (
      ["style", "link"].includes(node.name) &&
      scripts.some((script) => !script.deferred)
    )
      issue(
        source,
        line,
        "classic script execution relative to later styles is unresolved",
      );
    if (node.name === "base")
      issue(source, line, "HTML base URL is unresolved");
    if (attrs.style !== undefined) {
      const attr = node.attrs.find(
        (attribute) => attribute.name.toLowerCase() === "style",
      );
      order(
        declarationsIn(
          source,
          attr.sourceSpan.start.line + 1,
          attr.sourceSpan.end.line + 1,
          true,
        ),
        target.id,
      );
    }
    if (
      node.name === "link" &&
      attrs.rel?.split(/\s+/).includes("stylesheet")
    ) {
      const file = resolve(attrs.href, source, "style", line);
      if (file)
        sheet(
          file,
          located(source, line, "HTML stylesheet link"),
          [],
          attrs.media ? `@media ${attrs.media}` : "",
          target.id,
        );
      if ("disabled" in attrs || attrs.rel.includes("alternate"))
        issue(
          source,
          line,
          "alternate or disabled stylesheet loading is unresolved",
        );
    }
    if (node.name === "style") {
      const declarations = declarationsIn(
        source,
        line,
        node.sourceSpan.end.line + 1,
        false,
      );
      for (const declaration of declarations) {
        if (embeddedDeclarations.has(declaration))
          issue(
            source,
            line,
            "original line cannot distinguish embedded stylesheet owners",
          );
        embeddedDeclarations.add(declaration);
      }
      for (const child of node.children)
        if (child.kind === "text") checkEmbedded(child.value, source, line);
      target.styleDeclarations = declarations;
      target.styleCondition = attrs.media ? `@media ${attrs.media}` : "";
      order(declarations, null, target.styleCondition, target.id);
      return;
    }
    if (node.name === "script") {
      if ("async" in attrs)
        issue(source, line, "asynchronous script loading order is unresolved");
      if (attrs.src)
        scripts.push({
          reference: attrs.src,
          line,
          deferred: attrs.type === "module" || "defer" in attrs,
        });
      else if (node.children.some((child) => child.value?.trim()))
        issue(
          source,
          line,
          "inline module execution needs construction analysis",
        );
      return;
    }
    for (const child of node.children ?? []) markup(child, target);
  }
  try {
    markup(htmlParsers.html.parse(source.source), body);
  } catch {
    issue(source, 1, "page markup cannot be parsed");
  }
  for (const script of scripts) {
    const file = resolve(script.reference, source, "module", script.line);
    if (file)
      module(file, located(source, script.line, "HTML script reference"));
  }
  return page;
}

function compound(selector, node, states) {
  let remaining = selector,
    score = [0, 0, 0],
    uncertain = false,
    matches = true;
  const tag = /^(\*|[a-zA-Z][\w-]*)/.exec(remaining);
  if (tag) {
    if (tag[1] !== "*") {
      score[2]++;
      matches &&= node.tag.toLowerCase() === tag[1].toLowerCase();
    }
    remaining = remaining.slice(tag[0].length);
  }
  while (remaining) {
    let match = /^([.#])([\w-]+)/.exec(remaining);
    if (match) {
      const attr = match[1] === "." ? "class" : "id";
      score[attr === "id" ? 0 : 1]++;
      if (
        node.unknownAttributes.includes(attr) ||
        node.unknownAttributes.includes("*")
      )
        uncertain = true;
      else
        matches &&=
          attr === "class"
            ? (node.attributes.class ?? "").split(/\s+/).includes(match[2])
            : node.attributes.id === match[2];
    } else if (
      (match = /^\[([\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([\w-]+)))?\]/.exec(
        remaining,
      ))
    ) {
      score[1]++;
      if (
        node.unknownAttributes.includes(match[1]) ||
        node.unknownAttributes.includes("*")
      )
        uncertain = true;
      else
        matches &&=
          match[1] in node.attributes &&
          ((match[2] === undefined &&
            match[3] === undefined &&
            match[4] === undefined) ||
            node.attributes[match[1]] === (match[2] ?? match[3] ?? match[4]));
    } else if (
      (match =
        /^:(root|focus-visible|focus|hover|active|disabled|enabled)(?![\w(-])/.exec(
          remaining,
        ))
    ) {
      score[1]++;
      if (match[1] === "root") matches &&= node.tag === "html";
      else if (["disabled", "enabled"].includes(match[1])) {
        if (node.unknownAttributes.includes("disabled")) uncertain = true;
        else
          matches &&=
            match[1] === "disabled"
              ? "disabled" in node.attributes
              : !("disabled" in node.attributes);
      } else matches &&= states.includes(match[1]);
    } else return { matches: null, score };
    remaining = remaining.slice(match[0].length);
  }
  return { matches: matches ? (uncertain ? null : true) : false, score };
}

function selectorMatch(page, selector, node, states) {
  // Splitting only outside attribute strings avoids treating their spaces as combinators.
  const pieces = selector.trim().match(/(?:\[[^\]]*\]|[^\s>+~])+|[>+~]/g) ?? [];
  if (!pieces.length || pieces.includes("+") || pieces.includes("~"))
    return { matches: null, score: [0, 0, 0] };
  let current = node,
    result = compound(pieces.pop(), current, states);
  while (pieces.length && result.matches !== false) {
    const direct = pieces.at(-1) === ">";
    if (direct) pieces.pop();
    const part = pieces.pop();
    if (!part) return { matches: null, score: result.score };
    let found = false,
      uncertain = result.matches === null;
    current = page.elements[current.parent];
    while (current) {
      const tested = compound(part, current, []);
      if (tested.matches !== false) {
        result.score = result.score.map(
          (number, index) => number + tested.score[index],
        );
        uncertain ||= tested.matches === null;
        found = true;
        break;
      }
      if (direct) break;
      current = page.elements[current.parent];
    }
    result.matches = found ? (uncertain ? null : true) : false;
  }
  return result;
}

const shorthands = {
  outline: ["outline-color", "outline-width", "outline-style"],
  border: [
    "border-color",
    "border-width",
    "border-style",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
  ],
  background: ["background-color", "background-image"],
  font: ["font-family", "font-size", "font-weight", "line-height"],
};
const affects = (written, requested) =>
  written === requested ||
  (written === "all" && !requested.startsWith("--")) ||
  shorthands[written]?.includes(requested) ||
  shorthands[requested]?.includes(written);
const compare = (left, right) => {
  for (let i = 0; i < left.length; i++)
    if (left[i] !== right[i]) return left[i] - right[i];
  return 0;
};

/** Query one actual construction, preserving unknown loading/applicability and var origins.
 * states applies to the queried element. conditions maps exact at-rule contexts to booleans.
 * resolved is a bounded authored value, not a browser computed value or an invariant verdict.
 */
export function effectiveStyle(
  page,
  elementId,
  property,
  { states = [], conditions = {} } = {},
) {
  const target = page.elements.find((element) => element.id === elementId);
  if (!target) throw new Error("Query element does not belong to the page");
  const unresolved = (reason, evidence = [], references = []) => ({
    status: "unresolved",
    value: null,
    evidence,
    references,
    origins: [],
    unresolved: [{ path: target.path, line: target.line, reason }],
  });
  if (page.unresolved.length)
    return {
      ...unresolved("page loading or construction is unresolved"),
      unresolved: page.unresolved,
    };
  if (!target.attached)
    return unresolved("queried element is not attached to the page");
  function query(node, name, trail = []) {
    const key = `${node.id}:${name}`;
    if (trail.includes(key))
      return unresolved("cyclic custom-property reference");
    const candidates = [];
    for (const declaration of page.declarations) {
      if (!affects(declaration.property, name)) continue;
      let match;
      if (declaration.target !== null)
        match = {
          matches: declaration.target === node.id,
          score: [1, 0, 0, 0],
        };
      else {
        const variants = declaration.selector
          .split(",")
          .map((selector) =>
            selectorMatch(page, selector, node, node === target ? states : []),
          );
        const applicable = variants.filter(
          (variant) => variant.matches !== false,
        );
        if (!applicable.length) continue;
        match = applicable.sort((a, b) => compare(b.score, a.score))[0];
        match = { ...match, score: [0, ...match.score] };
      }
      if (match.matches === false) continue;
      const context = [declaration.condition, declaration.context]
        .filter(
          (entry) =>
            entry &&
            !["inline", "typescript", "html-attribute"].includes(entry),
        )
        .join(" / ");
      if (context && conditions[context] === false) continue;
      const unknownCondition = !!context && conditions[context] !== true;
      const rank = [
        declaration.priority === "important" ? 1 : 0,
        ...match.score,
        declaration.order,
      ];
      candidates.push({
        declaration,
        rank,
        unknownSelector: match.matches === null,
        uncertain:
          match.matches === null ||
          unknownCondition ||
          declaration.priority === null,
      });
    }
    candidates.sort((a, b) => compare(b.rank, a.rank));
    const winner = candidates[0];
    if (!winner) {
      if (
        node.parent !== null &&
        (name.startsWith("--") || inherited.test(name))
      )
        return query(page.elements[node.parent], name, [...trail, key]);
      return {
        status: "missing",
        value: null,
        evidence: [],
        references: [],
        origins: [],
        unresolved: [],
      };
    }
    if (
      winner.uncertain ||
      candidates.some(
        (entry) => entry.unknownSelector || entry.declaration.priority === null,
      )
    )
      return unresolved(
        "declaration applicability, condition or priority is unresolved",
        candidates.map((entry) => entry.declaration),
      );
    const declaration = winner.declaration;
    if (declaration.value === null || declaration.property !== name)
      return unresolved("value or shorthand expansion is unresolved", [
        declaration,
      ]);
    if (
      ["revert", "revert-layer", "initial", "unset"].includes(declaration.value)
    )
      return unresolved("CSS-wide reset needs computed-value analysis", [
        declaration,
      ]);
    if (declaration.value === "inherit") {
      if (node.parent === null)
        return unresolved("inherit has no authored parent value", [
          declaration,
        ]);
      const result = query(page.elements[node.parent], name, [...trail, key]);
      return { ...result, evidence: [declaration, ...result.evidence] };
    }
    let text = declaration.value,
      evidence = [declaration],
      references = [];
    const variable = /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g;
    let failed = false;
    text = text.replace(variable, (_expression, reference, fallback) => {
      references.push(reference);
      const result = query(node, reference, [...trail, key]);
      references.push(...result.references);
      evidence.push(...result.evidence);
      if (result.status === "resolved") return result.value;
      if (result.status === "missing" && fallback !== undefined)
        return fallback.trim();
      failed = true;
      return "";
    });
    if (failed || /var\(/.test(text))
      return unresolved(
        "custom-property value cannot be resolved",
        evidence,
        references,
      );
    return {
      status: "resolved",
      value: text,
      evidence,
      references,
      origins: [
        ...new Set(
          evidence
            .map((declaration) => certifiedDeclarations.get(declaration))
            .filter(Boolean),
        ),
      ],
      unresolved: [],
    };
  }
  return query(target, property);
}
