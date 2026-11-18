// Runs ESLint with the two size rules of ESLint alone, `max-lines-per-function` and `max-lines`, apart
// from the run on eslint.config.mjs, and prints each function and each file over a threshold of
// D-425 as `<file>:<line>: <ESLint's message, which gives the size>`, one per line, with the path
// relative to the directory checked. It decides nothing: the test of function-and-file-size reads
// the lines. Run from the repository root with no argument it checks the repository; the one
// optional argument is another directory to check with the same configuration (the control case of
// that test checks a made-up tree).
//
// The files and the ignores come from eslint.config.mjs, so a file the linter of D-29 lints is a file
// this run measures, and no list of patterns is kept here. The only part of the rules that is not
// ESLint's own setting is the exception of the function `accountRoutes` (see `isException`),
// because ESLint's rule gives no way to exempt one function by name.
import { ESLint } from "eslint";
import { resolve } from "node:path";
import tseslint from "typescript-eslint";
import linterConfig from "../../eslint.config.mjs";

const FUNCTION_RULE = "max-lines-per-function";
const FILE_RULE = "max-lines";
const FUNCTION_LIMIT = 200;
const FILE_LIMIT = 800;
// The two exceptions D-425 lists, and no other: a file kept whole over the threshold of a file, and
// the one function whose report is dropped.
const FILE_EXCEPTION = "src/browser/sim/saved-game.ts";
const FUNCTION_EXCEPTION = {
  file: "src/server/account-routes.ts",
  message: "Function 'accountRoutes' has too many lines",
};

// Every pattern some entry of the linter's configuration gives to `files` is a file the linter
// lints, and the entries that hold only `ignores` (and a `name`) are its global ignores. An entry
// whose `ignores` ESLint reads as local to it, one that holds `files` or another key beside
// `ignores`, is a form this run cannot read the way the linter does, so it stops the run.
function lintedPatterns(config) {
  const files = [];
  const ignores = [];
  for (const entry of config) {
    if (entry.ignores !== undefined) {
      const onlyIgnores = Object.keys(entry).every(
        (key) => key === "ignores" || key === "name",
      );
      if (!onlyIgnores)
        throw new Error(
          "eslint.config.mjs holds an entry with ignores beside other keys, which this run cannot read",
        );
      ignores.push(...entry.ignores);
    } else if (entry.files !== undefined) {
      for (const pattern of entry.files) {
        if (typeof pattern !== "string")
          throw new Error(
            "eslint.config.mjs holds a files entry this run cannot read",
          );
        if (!files.includes(pattern)) files.push(pattern);
      }
    }
  }
  return { files, ignores };
}

const { files, ignores } = lintedPatterns(linterConfig);
const sizeOptions = { skipBlankLines: true, skipComments: true };

const overrideConfig = [
  { ignores },
  { linterOptions: { noInlineConfig: true } },
  {
    files,
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: {
      [FUNCTION_RULE]: [
        "error",
        { max: FUNCTION_LIMIT, IIFEs: true, ...sizeOptions },
      ],
      [FILE_RULE]: ["error", { max: FILE_LIMIT, ...sizeOptions }],
    },
  },
  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  // The file rule is off for the files under tests/ (D-425) and for the one file kept whole.
  { files: ["tests/**"], rules: { [FILE_RULE]: "off" } },
  { files: [FILE_EXCEPTION], rules: { [FILE_RULE]: "off" } },
];

function isException(relative, message) {
  return (
    message.ruleId === FUNCTION_RULE &&
    relative === FUNCTION_EXCEPTION.file &&
    message.message.startsWith(FUNCTION_EXCEPTION.message)
  );
}

const directory = resolve(process.argv[2] ?? process.cwd());
// `applySuppressions` is false by default in ESLint's API; it is set here so that no
// eslint-suppressions.json hides a report (D-29).
const eslint = new ESLint({
  cwd: directory,
  overrideConfigFile: true,
  overrideConfig,
  applySuppressions: false,
});
const results = await eslint.lintFiles(["."]);

const reports = [];
for (const result of results) {
  const relative = result.filePath
    .slice(directory.length + 1)
    .replaceAll("\\", "/");
  for (const message of result.messages) {
    if (message.fatal)
      throw new Error(`${relative}:${message.line}: ${message.message}`);
    if (message.ruleId !== FUNCTION_RULE && message.ruleId !== FILE_RULE)
      continue;
    if (isException(relative, message)) continue;
    reports.push({ relative, line: message.line, text: message.message });
  }
}
reports.sort((a, b) => a.relative.localeCompare(b.relative) || a.line - b.line);
for (const report of reports)
  process.stdout.write(`${report.relative}:${report.line}: ${report.text}\n`);
process.stderr.write(
  `${reports.length} functions and files over a threshold in ${results.length} files\n`,
);
