// Wraps index.html (written as an artifact body fragment) into a full HTML document for static hosting.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const src = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const marker = '<div class="app">';
const at = src.indexOf(marker);
if (at < 0) throw new Error(`Could not find ${marker} in index.html`);

const head = src.slice(0, at).trim();
const body = src.slice(at).trim();
const html = `<!doctype html>
<html lang="en">
<head>
${head}
</head>
<body>
${body}
</body>
</html>
`;

mkdirSync(new URL('./dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('./dist/index.html', import.meta.url), html);
console.log(`dist/index.html written (${(html.length / 1024).toFixed(1)} KB)`);
