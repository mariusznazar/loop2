import { readFileSync } from 'node:fs';
console.log(`Node ${process.version}`);
for (const name of ['prettier', 'typescript', 'typescript-compiler', 'npm']) {
  const pkg = JSON.parse(readFileSync(`node_modules/${name}/package.json`, 'utf8'));
  console.log(`${name}: actual package ${pkg.name}@${pkg.version}`);
}
