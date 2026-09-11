// South Coast — convert curated source photos into optimized WebP assets.
//
// Two source sets feed the site:
//   1. new_brand_materials/old_site_images — photos carried over from the old
//      site, referenced by explicit hash (stable, index-independent).
//   2. new_photos — recent job photos shot on site, referenced by filename.
//
// NAMING RULE: every output file is named for what is actually in the frame.
// If you swap a source photo, rename the output to match — the captions and alt
// text on the site are written against these names.
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const OLD = "new_brand_materials/old_site_images";
const NEW = "new_photos";
const OUT = "public";

// ---- source catalog -------------------------------------------------------
// Descriptions below were re-checked against the actual frames. Several of the
// original labels had drifted from their photos; these are the corrected ones.
const SOURCES = {
  plasterMural: `${OLD}/2dd44814ba4cdc34065c38bcaee35792.jpg`, // curved grisaille plaster mural wall
  luxuryKitchen: `${OLD}/6bb68c99c180d39a55355a94b5a1f0fe.jpg`, // navy kitchen, white beamed ceiling
  grandStair: `${OLD}/f3710d0a46afa52122f80f26ae61a601.jpg`, // curved staircase, black iron railing
  estateExterior: `${OLD}/6af4710a4e97212231bd2a1507cb6dfb.jpg`, // white stucco + balcony, tile roof
  kitchenCabinets: `${OLD}/01b23cfbec8258c6dae90ccabda176c5.jpg`, // two-tone kitchen, navy island
  paneling: `${OLD}/82a74d4020ab8fc6276d61f22d64ce5e.jpg`, // olive paneled wall, in progress
  hallway: `${OLD}/b7a8ba0f24ea680b7c8bbe1d44f2f71e.jpg`, // bright hall + bath, wainscot and trim
  woodChevron: `${OLD}/6a346d2c0d27969933c5e6381bd1f5f2.jpg`, // chevron wood top, freshly sealed
  builtIns: `${OLD}/bef115c139de8bcb6d3ec66e9965928a.jpg`, // primed built-in shelving (in progress)
  stripedRoom: `${OLD}/ab71cb9fa748f5b142cd337048238718.jpg`, // striped wall playroom + oak kitchenette
  metallicCeiling: `${OLD}/5864979afe0d20820b3eba02a6a8f8e6.jpg`, // ornate silver metallic plaster ceiling
  stuccoHome: `${OLD}/32d086af7c7408caf504d96fe441f335.jpg`, // two-story stucco home, stone entry
  patioWood: `${OLD}/f01d98fa9c03d589fd20800f1f0c4d8e.jpg`, // stained wood soffit + rafter tails
  stoneHome: `${OLD}/27ac6af87eb4b369f920a5a50b4a160a.jpg`, // white stone modern home, front elevation
  porchCeiling: `${OLD}/8bbac5e7afde81b6d94b21804cae0d49.jpg`, // stained cathedral porch ceiling

  // --- recent job photos -------------------------------------------------
  bathVanity: `${NEW}/bathroom cabinents.jpg`, // teal vanity, brass pulls, hex tile
  plasterCounter: `${NEW}/plasterbacksplash.jpg`, // microcement backsplash + counter
  walnutStain: `${NEW}/woodstain.jpg`, // walnut slat wall + cabinets, stained and sealed
  oakBuiltIn: `${NEW}/stain cabinents with plaster cabinet doors.jpg`, // white oak built-in wall
  glossCeiling: `${NEW}/custom ceiling finish.jpg`, // high-gloss navy hallway ceiling
  nightHome: `${NEW}/exterior.jpg`, // stucco home lit at night (converted from HEIC)
};

const src = (k) => {
  const p = SOURCES[k];
  if (!p) throw new Error(`Unknown source key: ${k}`);
  return p;
};

async function ensure(dir) {
  await mkdir(path.join(OUT, dir), { recursive: true });
}

// `crop` biases the frame away from something we do not want in shot — a
// painter on a ladder, a parked car. Defaults to a centre crop.
async function hero(key, name, crop = "centre") {
  await ensure("projects/hero");
  for (const w of [2560, 1600]) {
    await sharp(src(key))
      .rotate()
      .resize(w, Math.round(w * 0.62), { fit: "cover", position: crop })
      .modulate({ saturation: 0.92, brightness: 1.0 })
      .webp({ quality: w > 2000 ? 78 : 82 })
      .toFile(path.join(OUT, "projects/hero", `${name}-${w}.webp`));
  }
  console.log("hero:", name);
}

async function wide(key, dir, name, { q = 82, ratio = 0.66, width = 1600, crop = "centre" } = {}) {
  await ensure(dir);
  await sharp(src(key))
    .rotate()
    .resize(width, Math.round(width * ratio), { fit: "cover", position: crop })
    .modulate({ saturation: 0.93 })
    .webp({ quality: q })
    .toFile(path.join(OUT, dir, `${name}.webp`));
  console.log(`${dir}/${name}`);
}

async function tile(key, name, crop = "centre", size = 1000) {
  await ensure("projects/gallery");
  await sharp(src(key))
    .rotate()
    .resize(size, size, { fit: "cover", position: crop })
    .modulate({ saturation: 0.93 })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, "projects/gallery", `${name}.webp`));
}

// ---- clean out old-brand image directories ----
for (const d of ["c_homes", "neighborhoods"]) {
  await rm(path.join(OUT, d), { recursive: true, force: true });
}
await rm(path.join(OUT, "DA4A5VBO6FCP7M7ABSRWRG33NQ.jpg"), { force: true });
for (const f of ["aerial.png", "buy.png", "sell.png", "hero.png", "cta.png"]) {
  await rm(path.join(OUT, "services", f), { force: true });
}
for (const f of ["hero.png", "panel.png"]) {
  await rm(path.join(OUT, "contact", f), { force: true });
}
for (const f of ["cuervo-og.jpg", "toro-og.jpg"]) {
  await rm(path.join(OUT, "og", f), { force: true });
}
// Retired: names that described a market segment rather than the photo
// (residential/commercial/process), renders nothing on the site consumed
// (exterior/wood-chevron — both already shown as gallery tiles), and the
// CREDITS file for the two Unsplash stock shots we no longer use.
for (const f of [
  "residential.webp",
  "commercial.webp",
  "process.webp",
  "exterior.webp",
  "wood-chevron.webp",
  "bath-vanity.webp",
  "CREDITS.md",
]) {
  await rm(path.join(OUT, "services", f), { force: true });
}

// ---- heroes (homepage cinematic rotation, plaster-led order) ----
await hero("plasterMural", "plaster-mural");
await hero("luxuryKitchen", "luxury-kitchen");
await hero("grandStair", "grand-staircase");
await hero("estateExterior", "estate-exterior");

// ---- service section images (named for their subject) ----
await wide("luxuryKitchen", "services", "hero", { q: 84, ratio: 1.1, width: 1400 });
await wide("plasterMural", "services", "plaster");
await wide("paneling", "services", "paneling");
await wide("grandStair", "services", "staircase", { q: 82, ratio: 1.2, width: 1400 });
await wide("kitchenCabinets", "services", "cabinetry");
await wide("stuccoHome", "services", "cta", { q: 80, ratio: 0.6, width: 2000 });

// Replacements for the retired Unsplash stock photos — our own jobs instead.
await wide("hallway", "services", "interior-painting");
await wide("stoneHome", "services", "exterior-painting");

// New subjects from recent jobs.
await wide("walnutStain", "services", "wood-staining");
await wide("plasterCounter", "services", "microcement");

// ---- contact + about ----
await wide("grandStair", "contact", "panel", { q: 82, ratio: 1.3, width: 1400 });
await ensure("about");
await wide("paneling", "about", "craftsmanship", { q: 82, ratio: 0.7 });

// ---- portfolio gallery tiles ----
// 01-16 keep their numbering so nothing referencing a tile breaks.
// 17-21 are the recent job photos.
const gallery = [
  ["luxuryKitchen", "01"], ["plasterMural", "02"], ["grandStair", "03"], ["estateExterior", "04"],
  ["kitchenCabinets", "05"], ["paneling", "06"], ["hallway", "07"], ["woodChevron", "08"],
  ["builtIns", "09"], ["stripedRoom", "10"], ["metallicCeiling", "11"], ["stuccoHome", "12"],
  ["patioWood", "13"], ["stoneHome", "14"],
  // Re-shot at full resolution; crop from the top to keep a parked car out of frame.
  ["nightHome", "15", "north"],
  ["porchCeiling", "16"],
  ["bathVanity", "17"], ["plasterCounter", "18"], ["walnutStain", "19"], ["oakBuiltIn", "20"],
  // Crop to the ceiling so the painter on the ladder stays out of frame.
  ["glossCeiling", "21", "north"],
];
for (const [key, name, crop] of gallery) await tile(key, name, crop ?? "centre");
console.log("gallery tiles:", gallery.length);

console.log("\n✓ Brand images processed.");
