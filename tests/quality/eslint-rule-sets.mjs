// Reads a JSON list of file paths on standard input and prints, as JSON, for each file the rules
// ESLint gives it under eslint.config.mjs (`received`, null where it gives the file no
// configuration) and the rules ESLint gives it under nothing but the sets @eslint/js and
// typescript-eslint publish (`expected`, D-29). The test of eslint-source-rules compares the two;
// this script only asks the tools and decides nothing.
import js from "@eslint/js";
import { ESLint } from "eslint";
import { readFileSync } from "node:fs";
import tseslint from "typescript-eslint";

const paths = JSON.parse(readFileSync(0, "utf8"));
const published = [
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
  },
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{ts,mts,cts,tsx}"],
  })),
];
const configured = new ESLint();
const sets = new ESLint({
  overrideConfigFile: true,
  overrideConfig: published,
});
const files = {};
for (const path of paths) {
  const received = await configured.calculateConfigForFile(path);
  const expected = await sets.calculateConfigForFile(path);
  files[path] = {
    received: received === undefined ? null : (received.rules ?? {}),
    expected: expected === undefined ? null : (expected.rules ?? {}),
  };
}
process.stdout.write(JSON.stringify(files));
