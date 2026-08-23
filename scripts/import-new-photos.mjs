// One-off import of the user's real Stitch-generated photos, matched to
// their destination slot by actual visual content (the source folder
// numbering did not match the prompt order they were requested in).
// Hero image is deliberately excluded — kept as-is per instruction.
import sharp from "sharp";
import { statSync } from "node:fs";
import { join } from "node:path";

const SRC_ROOT =
  "C:/Users/impac/Downloads/stitch_godavari_tourism_showcase (1)/stitch_godavari_tourism_showcase";
const DEST_ROOT = "src/assets/photos";

const MAPPING = [
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_1", "place-bhimavaram.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_3", "place-antarvedi.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_4", "place-ksheera-temple.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_5", "place-perupalem.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_6", "place-kolleru.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_7", "place-dindi.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_8", "place-undi.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_9", "package-konaseema.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_10", "package-temple-river.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_11", "place-narasapuram.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_12", "package-delta-explorer.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_13", "contact-backdrop.webp"],
  ["warm_cinematic_documentary_travel_photography_natural_saturated_greens_warm_14", "about-backdrop.webp"],
];

async function run() {
  let before = 0;
  let after = 0;
  for (const [folder, destName] of MAPPING) {
    const srcPath = join(SRC_ROOT, folder, "screen.png");
    const destPath = join(DEST_ROOT, destName);
    const srcSize = statSync(srcPath).size;

    await sharp(srcPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destPath);

    const outSize = statSync(destPath).size;
    before += srcSize;
    after += outSize;
    console.log(`${folder} -> ${destName}  ${(srcSize / 1024 / 1024).toFixed(2)}MB -> ${(outSize / 1024 / 1024).toFixed(2)}MB`);
  }
  console.log(`\nTotal: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`);
}

run();
