// One-off image optimization pass: converts the heavy source PNGs/JPG
// under src/assets to compressed, responsive WebP. Run with:
//   node scripts/optimize-images.mjs
// Not part of the build — source files stay as the editable originals;
// this just (re)generates the .webp files that content.js/Hero import.
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";

const TARGETS = [
  { dir: "src/assets/photos", maxWidth: 1600 },
  { dir: "src/assets", maxWidth: 2400, only: ["hero-backwaters.jpg"] },
];

async function run() {
  let before = 0;
  let after = 0;

  for (const { dir, maxWidth, only } of TARGETS) {
    const files = readdirSync(dir).filter((f) => [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase()));
    for (const file of only ? files.filter((f) => only.includes(f)) : files) {
      const srcPath = join(dir, file);
      const outPath = join(dir, `${basename(file, extname(file))}.webp`);
      const srcSize = statSync(srcPath).size;

      await sharp(srcPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);

      const outSize = statSync(outPath).size;
      before += srcSize;
      after += outSize;
      console.log(
        `${file} -> ${basename(outPath)}  ${(srcSize / 1024 / 1024).toFixed(2)}MB -> ${(outSize / 1024 / 1024).toFixed(2)}MB`
      );
    }
  }

  console.log(`\nTotal: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`);
}

run();
