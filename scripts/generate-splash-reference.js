/**
 * Builds a 9:16 JPG: #0F3D3E + logo at 42% of frame width (same rule as the app).
 * Run: node scripts/generate-splash-reference.js
 */
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..');
const logoPath = path.join(root, 'seva_logo_new.png');
const out9 = path.join(root, 'assets', 'seva_splash_reference_9x16.jpg');
const outSq = path.join(root, 'assets', 'seva_splash_reference_square.jpg');

const TEAL = { r: 15, g: 61, b: 62 };

async function compositeJpeg(width, height, outPath) {
  const logoSide = Math.round(width * 0.42);
  const logoLayer = await sharp(logoPath)
    .resize(logoSide, logoSide, {
      fit: 'contain',
      background: { ...TEAL, alpha: 1 },
    })
    .toBuffer();

  const m = await sharp(logoLayer).metadata();
  const left = Math.round((width - m.width) / 2);
  const top = Math.round((height - m.height) / 2);

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: TEAL,
    },
  })
    .composite([{ input: logoLayer, left, top }])
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(outPath);

  console.log('Wrote', outPath, `${width}x${height}`, 'logo box', `${logoSide}x${logoSide}`);
}

async function main() {
  await compositeJpeg(1080, 1920, out9);
  await compositeJpeg(1080, 1080, outSq);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
