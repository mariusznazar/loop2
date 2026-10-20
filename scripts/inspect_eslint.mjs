/** Local ESLint API bridge; rule membership comes exclusively from the Python method. */
import { readFile, realpath } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const extensions = "**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}";

export async function inspectFiles(tools, request, readSource = readFile) {
  const { ESLint, plugin, parser, commentParser } = tools;
  const common = {
    cwd: request.root,
    allowInlineConfig: false,
    applySuppressions: false,
    fix: false,
    cache: false,
  };
  // data: eslint.config.mjs
  const configured = new ESLint({
    ...common,
    overrideConfigFile: path.join(request.root, "eslint.config.mjs"),
  });
  const files = [];
  for (const input of request.files) {
    const absolute = path.resolve(request.root, input.path);
    const ignored = await configured.isPathIgnored(absolute);
    const actual = ignored
      ? undefined
      : await configured.calculateConfigForFile(absolute);
    const entry = {
      path: input.path,
      ignored: ignored || !actual,
      processor: Boolean(actual?.processor),
      rules: actual?.rules ?? {},
      defaults: {},
      inlineRules: [],
      disabledRules: [],
      comments: [],
      messages: [],
    };
    files.push(entry);
    if (entry.ignored || entry.processor) continue;
    const typed = /\.(?:ts|mts|cts|tsx)$/i.test(input.path);
    let commentNodes = [];
    const inspection = {
      rules: {
        comments: {
          meta: { schema: [] },
          create(context) {
            commentNodes = context.sourceCode.getAllComments();
            entry.comments = commentNodes.map((comment) => comment.value);
            return {};
          },
        },
      },
    };
    // No tool preset is imported: this normalizes the independently supplied rule options.
    const baseline = new ESLint({
      ...common,
      overrideConfigFile: true,
      overrideConfig: {
        files: [extensions],
        languageOptions: {
          ...actual.languageOptions,
          ...(typed ? { parser } : {}),
        },
        plugins: {
          ...(typed ? { "@typescript-eslint": plugin } : {}),
          "quality-inspection": inspection,
        },
        rules: input.rules,
        linterOptions: { reportUnusedDisableDirectives: "off" },
      },
    });
    entry.defaults = (await baseline.calculateConfigForFile(absolute)).rules;
    if (request.configuration) continue;
    // Add comment capture only to the source run, leaving the option oracle unchanged.
    const source = new ESLint({
      ...common,
      overrideConfigFile: true,
      overrideConfig: {
        files: [extensions],
        languageOptions: {
          ...actual.languageOptions,
          ...(typed ? { parser } : {}),
        },
        plugins: {
          ...(typed ? { "@typescript-eslint": plugin } : {}),
          "quality-inspection": inspection,
        },
        rules: { ...input.rules, "quality-inspection/comments": "error" },
        linterOptions: { reportUnusedDisableDirectives: "off" },
      },
    });
    const results = await source.lintText(await readSource(absolute, "utf8"), {
      filePath: absolute,
      warnIgnored: true,
    });
    if (
      results.length !== 1 ||
      path.resolve(results[0].filePath) !== absolute ||
      !Array.isArray(results[0].messages) ||
      !Array.isArray(results[0].suppressedMessages) ||
      results[0].suppressedMessages.length
    ) {
      throw new Error(
        `Incomplete or suppressed ESLint result for ${input.path}`,
      );
    }
    for (const comment of commentNodes) {
      const directive = commentParser.parseDirective(comment.value);
      if (
        !directive ||
        comment.type === "Shebang" ||
        (comment.type === "Line" &&
          !/^eslint-disable-(?:next-)?line$/.test(directive.label))
      )
        continue;
      if (/^eslint-disable(?:-next-line|-line)?$/.test(directive.label)) {
        const names = Object.keys(
          commentParser.parseListConfig(directive.value),
        );
        entry.disabledRules.push(names.length ? names : null);
      } else if (directive.label === "eslint") {
        const parsed = commentParser.parseJSONLikeConfig(directive.value);
        if (!parsed.ok)
          throw new Error(
            `Uninterpretable inline rules in ${input.path}: ${parsed.error.message}`,
          );
        const inline = new ESLint({
          ...common,
          overrideConfigFile: true,
          overrideConfig: [
            {
              files: [extensions],
              languageOptions: {
                ...actual.languageOptions,
                ...(typed ? { parser } : {}),
              },
              plugins: typed ? { "@typescript-eslint": plugin } : {},
              rules: input.rules,
            },
            { rules: parsed.config },
          ],
        });
        entry.inlineRules.push(
          (await inline.calculateConfigForFile(absolute)).rules,
        );
      }
    }
    entry.messages = results[0].messages.map((message) => ({
      ruleId: message.ruleId,
      severity: message.severity,
      message: message.message,
      fatal: message.fatal ?? false,
    }));
  }
  return { schema: 1, files };
}

async function loadTools(root) {
  const require = createRequire(path.join(root, "package.json"));
  // data: package.json
  const manifest = JSON.parse(
    await readFile(path.join(root, "package.json"), "utf8"),
  );
  // data: package-lock.json
  const lock = JSON.parse(
    await readFile(path.join(root, "package-lock.json"), "utf8"),
  );
  const rootReal = await realpath(root);

  async function localPackage(
    specifier,
    expectedName,
    version,
    resolver = require,
  ) {
    const names = Array.isArray(expectedName) ? expectedName : [expectedName];
    let directory = path.dirname(resolver.resolve(specifier));
    let metadata;
    for (;;) {
      try {
        metadata = JSON.parse(
          await readFile(path.join(directory, "package.json"), "utf8"),
        );
        break;
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      const parent = path.dirname(directory);
      if (parent === directory)
        throw new Error(`Cannot locate local package ${expectedName}`);
      directory = parent;
    }
    version ??= metadata.version;
    const relative = path
      .relative(rootReal, await realpath(directory))
      .split(path.sep)
      .join("/");
    if (
      !relative.startsWith("node_modules/") ||
      relative.includes("../") ||
      !names.includes(metadata.name) ||
      metadata.version !== version ||
      lock.packages?.[relative]?.version !== version ||
      (lock.packages[relative].name ?? specifier) !== metadata.name
    ) {
      throw new Error(
        `Missing, nonlocal, unpinned or wrong-version package ${expectedName}; expected ${version}`,
      );
    }
    return resolver.resolve(specifier);
  }

  const pins = {
    eslint: "10.12.0",
    "@eslint/js": "10.0.1",
    "typescript-eslint": "8.71.2",
    globals: "17.13.0",
  };
  for (const [name, version] of Object.entries(pins)) {
    const declared =
      manifest.devDependencies?.[name] ?? manifest.dependencies?.[name];
    const locked =
      lock.packages?.[""]?.devDependencies?.[name] ??
      lock.packages?.[""]?.dependencies?.[name];
    if (declared !== version || locked !== version)
      throw new Error(
        `Unpinned declared dependency ${name}; expected ${version}`,
      );
    await localPackage(name, name, version);
  }
  const parserEntry = await localPackage(
    "@typescript-eslint/parser",
    "@typescript-eslint/parser",
    "8.71.2",
    createRequire(require.resolve("typescript-eslint")),
  );
  const estreeEntry = await localPackage(
    "@typescript-eslint/typescript-estree",
    "@typescript-eslint/typescript-estree",
    "8.71.2",
    createRequire(parserEntry),
  );
  const estreeRequire = createRequire(estreeEntry);
  await localPackage(
    "typescript",
    ["typescript", "@typescript/typescript6"],
    "6.0.2",
    estreeRequire,
  );
  // A compatibility package can report 6.0.2 in metadata and export a different API.
  if (estreeRequire("typescript").version !== "6.0.2") {
    throw new Error("Parser TypeScript API runtime must be 6.0.2");
  }
  const declarations = {
    ...manifest.dependencies,
    ...manifest.devDependencies,
  };
  const compilers = Object.entries(declarations).flatMap(([name, declared]) => {
    const version =
      name === "typescript" && /^7\.\d+\.\d+$/.test(declared)
        ? declared
        : /^npm:typescript@(7\.\d+\.\d+)$/.exec(declared)?.[1];
    return version ? [{ name, declared, version }] : [];
  });
  if (compilers.length !== 1)
    throw new Error(
      "Cannot identify one pinned application TypeScript 7 compiler",
    );
  const compiler = compilers[0];
  const lockedCompiler =
    lock.packages?.[""]?.devDependencies?.[compiler.name] ??
    lock.packages?.[""]?.dependencies?.[compiler.name];
  if (lockedCompiler !== compiler.declared)
    throw new Error("Unpinned declared application compiler");
  await localPackage(compiler.name, "typescript", compiler.version);
  if (require(compiler.name).version !== compiler.version) {
    throw new Error(
      "Application TypeScript compiler runtime differs from its pinned version",
    );
  }
  const { ESLint } = require("eslint");
  if (ESLint.version !== pins.eslint)
    throw new Error("ESLint runtime version differs from the adopted version");
  const { plugin, parser } = require("typescript-eslint");
  const eslintRequire = createRequire(require.resolve("eslint"));
  await localPackage(
    "@eslint/plugin-kit",
    "@eslint/plugin-kit",
    undefined,
    eslintRequire,
  );
  const { ConfigCommentParser } = eslintRequire("@eslint/plugin-kit");
  return { ESLint, plugin, parser, commentParser: new ConfigCommentParser() };
}

async function main() {
  const request = JSON.parse(readFileSync(0, "utf8"));
  if (
    path.resolve(request.root) !== process.cwd() ||
    typeof request.configuration !== "boolean" ||
    !Array.isArray(request.files)
  )
    throw new Error("Invalid ESLint inspection request");
  const seen = new Set();
  for (const file of request.files) {
    if (
      typeof file.path !== "string" ||
      path.isAbsolute(file.path) ||
      file.path.split(/[\\/]/).includes("..") ||
      seen.has(file.path) ||
      !/\.(?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$/i.test(file.path) ||
      !file.rules ||
      Object.values(file.rules).some((value) => JSON.stringify(value) !== "[2]")
    ) {
      throw new Error("Unsafe or incomplete ESLint source request");
    }
    seen.add(file.path);
  }
  const tools = await loadTools(request.root);
  process.stdout.write(
    JSON.stringify(await inspectFiles(tools, request)) + "\n",
  );
}

if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
) {
  main().catch((error) => {
    process.stderr.write(String(error.stack ?? error) + "\n");
    process.exitCode = 2;
  });
}
