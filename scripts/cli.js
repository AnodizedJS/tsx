#!/usr/bin/env node

if (process.argv.includes('init')) {
    await import('./init-project.js');
    process.exit();
}