/**
 * Copies the interactive design preview into public/index.html for Vercel static hosting.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'seva_app_design_preview.html');
const outDir = path.join(root, 'public');
const dest = path.join(outDir, 'index.html');

if (!fs.existsSync(src)) {
  console.error('Missing seva_app_design_preview.html at repo root.');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log('Wrote', path.relative(root, dest));
