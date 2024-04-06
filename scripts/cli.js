
if (process.argv.includes('init')) {
    await import('./init-project');
    process.exit();
}