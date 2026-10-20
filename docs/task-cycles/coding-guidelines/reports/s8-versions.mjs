import {createRequire} from 'node:module';
const r=createRequire(new URL('../../../../package.json', import.meta.url));
console.log(JSON.stringify({node:process.version, prettier:r('prettier/package.json').version, typescript:r('typescript/package.json').version, compiler:r('typescript-compiler/package.json').version, npm:r('npm/package.json').version, express:r('express/package.json').version}));
