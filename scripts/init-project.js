#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'fs';

if (!existsSync('package.json')) {
    console.error('[ERROR] Please run this in an existing NodeJS project (make sure package.json exists)', process.cwd());
    process.exit();
}

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

if (pkg.name.includes('@anodized')) {
    throw new Error('Cannot run in anodized scope: ' + process.cwd());
}

if (!existsSync('tsconfig.json')) {
    writeFileSync('tsconfig.json', JSON.stringify({
        compilerOptions: {
            jsx: 'react',
            jsxFactory: 'AnodizedTSX.createElement',
            experimentalDecorators: true,
            lib: ['ES2015', 'DOM']
        }
    }, null, 4));
    console.log('[SUCCESS] Project is ready for use with JSX/TSX');
    process.exit();
}

const file = readFileSync('tsconfig.json', 'utf-8');
const cfg = JSON.parse(file);

Object.assign(cfg.compilerOptions, {
    jsx: 'react',
    jsxFactory: 'AnodizedTSX.createElement',
    experimentalDecorators: true,
    lib: ['ES2015', 'DOM']
});

writeFileSync('tsconfig.json', JSON.stringify(cfg, null, 4));
console.log('[SUCCESS] Project is ready for use with JSX/TSX');
process.exit();