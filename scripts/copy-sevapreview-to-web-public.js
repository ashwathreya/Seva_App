/**
 * Copies repo-root static HTML previews into web-landing/public so Vite emits them at /filename.html.
 */
const fs = require('fs');
const path = require('path');

const FILES = ['sevapreview.html', 'sevascreens.html'];

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'web-landing', 'public');

let wrote = 0;
for (const name of FILES) {
  const src = path.join(root, name);
  if (!fs.existsSync(src)) {
    console.warn(
      `Optional ${name} missing at repo root — skip (page will not be on Vercel until you add and commit it).`,
    );
    continue;
  }
  fs.mkdirSync(outDir, { recursive: true });
  const dest = path.join(outDir, name);
  fs.copyFileSync(src, dest);
  console.log('Wrote', path.relative(root, dest));
  wrote += 1;
}

if (wrote === 0) {
  process.exit(0);
}
