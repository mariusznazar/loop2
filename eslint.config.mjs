import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const extensions = "{js,mjs,cjs,jsx,ts,mts,cts,tsx}";
const typedExtensions = "{ts,mts,cts,tsx}";
const directories = [
  "src/browser",
  "src/server",
  "scripts",
  "tests/sim",
  "tests/view",
  "tests/quality",
];
const sourceFiles = directories.map(
  (directory) => `${directory}/**/*.${extensions}`,
);
sourceFiles.push(
  "tests/http.test.mjs",
  "tests/startup.test.mjs",
  "eslint.config.mjs",
  "prettier.config.mjs",
);
const typescriptFiles = directories.map(
  (directory) => `${directory}/**/*.${typedExtensions}`,
);
const excluded = [
  "**/node_modules/**",
  "**/dist/**",
  ".the-way/**",
  ".runs/**",
  ".stryker-tmp/**",
  ".superpowers/**",
];

function program(configPath, includes, extraOptions = {}) {
  const config = ts.readConfigFile(
    fileURLToPath(new URL(configPath, import.meta.url)),
    ts.sys.readFile,
  );
  if (config.error)
    throw new Error(
      ts.flattenDiagnosticMessageText(config.error.messageText, "\n"),
    );
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  if (parsed.errors.length)
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext(parsed.errors, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => root,
        getNewLine: () => "\n",
      }),
    );
  return ts.createProgram({
    rootNames: ts.sys.readDirectory(
      root,
      [".ts", ".mts", ".cts", ".tsx"],
      excluded,
      includes,
    ),
    options: {
      ...parsed.options,
      noEmit: true,
      jsx: ts.JsxEmit.Preserve,
      ...extraOptions,
    },
  });
}

const programs = [
  program("tsconfig.browser.json", ["src/browser/**/*"]),
  program("tsconfig.server.json", ["src/server/**/*"]),
  program("tsconfig.browser.json", ["scripts/**/*", "tests/**/*"], {
    types: ["node"],
  }),
];

export default [
  { ignores: excluded },
  { linterOptions: { noInlineConfig: true } },
  {
    ...js.configs.recommended,
    files: sourceFiles,
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: typescriptFiles,
  })),
  {
    files: typescriptFiles,
    languageOptions: { parserOptions: { programs, tsconfigRootDir: root } },
  },
  {
    files: [`src/browser/**/*.${extensions}`],
    languageOptions: { globals: globals.browser },
  },
  {
    files: [
      `src/server/**/*.${extensions}`,
      `scripts/**/*.${extensions}`,
      `tests/**/*.${extensions}`,
      "*.config.mjs",
    ],
    languageOptions: { globals: globals.node },
  },
];
