// Reports functions over 100 code lines and files over 400 in the given files (review probe only).
import { ESLint } from "eslint";
import tseslint from "typescript-eslint";
const opts = { skipBlankLines: true, skipComments: true };
const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    { files: ["**/*.{ts,tsx,mjs}"], languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
      rules: { "max-lines-per-function": ["warn", { max: 100, IIFEs: true, ...opts }], "max-lines": ["warn", { max: 400, ...opts }] } },
  ],
});
const results = await eslint.lintFiles(process.argv.slice(2));
for (const r of results) for (const m of r.messages) console.log(`${r.filePath.split(/[\/]/).slice(-1)[0]}:${m.line}: ${m.message}`);
