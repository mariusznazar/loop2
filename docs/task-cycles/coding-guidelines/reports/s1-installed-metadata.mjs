import { createRequire } from 'node:module';
const require = createRequire(new URL('./package.json', import.meta.url));
const packages = ['eslint','@eslint/js','typescript-eslint','globals','prettier','npm','typescript','typescript-compiler'];
for (const installName of packages) {
  const metadata = require(`${installName}/package.json`);
  console.log(JSON.stringify({installName,name:metadata.name,version:metadata.version}));
}
const estree = createRequire(require.resolve('@typescript-eslint/typescript-estree'));
const parserApi = estree('typescript/package.json');
console.log(JSON.stringify({parserApiPath:estree.resolve('typescript/package.json'),name:parserApi.name,version:parserApi.version}));
