/**
 * compress-images.mjs
 * Compresses all PNG images in src/assets/images/ to WebP + optimised JPEG
 * Output goes to public/images/ so they're served directly (no Vite bundling overhead)
 * Run: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC  = join(__dirname, '../src/assets/images');
const DEST = join(__dirname, '../public/images');

await mkdir(DEST, { recursive: true });

const files = (await readdir(SRC)).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

console.log(`\n🖼  Compressing ${files.length} images...\n`);

for (const file of files) {
  const input    = join(SRC, file);
  const name     = basename(file, extname(file));
  const outWebP  = join(DEST, `${name}.webp`);
  const outJPEG  = join(DEST, `${name}.jpg`);

  // WebP — best quality/size ratio, modern browsers
  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(outWebP);

  // JPEG fallback — for older browsers
  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 75, progressive: true, mozjpeg: true })
    .toFile(outJPEG);

  const { size: webpSize } = await import('fs').then(m =>
    m.promises.stat(outWebP)
  );
  console.log(`  ✓ ${file.padEnd(45)} → ${(webpSize / 1024).toFixed(0).padStart(5)} KB (webp)`);
}

console.log('\n✅ Done. Images saved to public/images/\n');
