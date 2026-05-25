// South Coast — convert curated source photos into optimized WebP assets.
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const SRC = "new_brand_materials/old_site_images";
const OUT = "public";

// Source photos referenced by explicit hash (stable, index-independent).
const H = {
  plasterMural: "2dd44814ba4cdc34065c38bcaee35792", // curved Venetian mural wall
  luxuryKitchen: "6bb68c99c180d39a55355a94b5a1f0fe", // coffered-ceiling kitchen
  grandStair: "f3710d0a46afa52122f80f26ae61a601",   // grand curved staircase / foyer
  estateExterior: "6af4710a4e97212231bd2a1507cb6dfb", // Mediterranean exterior
  kitchenCabinets: "01b23cfbec8258c6dae90ccabda176c5", // warm cabinets + dark island
  paneling: "82a74d4020ab8fc6276d61f22d64ce5e",       // gray-green paneling (in progress)
  hallway: "b7a8ba0f24ea680b7c8bbe1d44f2f71e",        // bright hallway + cabinetry
  woodChevron: "6a346d2c0d27969933c5e6381bd1f5f2",    // chevron wood panels
  builtIns: "bef115c139de8bcb6d3ec66e9965928a",       // white built-ins
  cozyLiving: "ab71cb9fa748f5b142cd337048238718",     // cozy living / bedding
  ceilingLights: "5864979afe0d20820b3eba02a6a8f8e6",  // interior ceiling lights
  estate2: "32d086af7c7408caf504d96fe441f335",        // estate exterior blue sky
  patioWood: "f01d98fa9c03d589fd20800f1f0c4d8e",      // patio wood ceiling
  exteriorSky: "27ac6af87eb4b369f920a5a50b4a160a",    // exterior dramatic sky
  whiteHouse: "2c8b02369b528615f25a2ce9a8a46c1e",     // white modern house
  angularCeiling: "8bbac5e7afde81b6d94b21804cae0d49", // angular wood ceiling
};

const src = (k) => path.join(SRC, `${H[k]}.jpg`);

async function ensure(dir) { await mkdir(path.join(OUT, dir), { recursive: true }); }

async function hero(key, name) {
  await ensure("projects/hero");
  for (const w of [2560, 1600]) {
    await sharp(src(key))
      .resize(w, Math.round(w * 0.62), { fit: "cover", position: "centre" })
      .modulate({ saturation: 0.92, brightness: 1.0 })
      .webp({ quality: w > 2000 ? 78 : 82 })
      .toFile(path.join(OUT, "projects/hero", `${name}-${w}.webp`));
  }
  console.log("hero:", name);
}

async function wide(key, dir, name, q = 82, ratio = 0.66, width = 1600) {
  await ensure(dir);
  await sharp(src(key))
    .resize(width, Math.round(width * ratio), { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.93 })
    .webp({ quality: q })
    .toFile(path.join(OUT, dir, `${name}.webp`));
  console.log(`${dir}/${name}`);
}

async function tile(key, name, size = 1000) {
  await ensure("projects/gallery");
  await sharp(src(key))
    .resize(size, size, { fit: "cover", position: "centre" })
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

// ---- heroes (homepage cinematic rotation, plaster-led order) ----
await hero("plasterMural", "plaster-mural");
await hero("luxuryKitchen", "luxury-kitchen");
await hero("grandStair", "grand-staircase");
await hero("estateExterior", "estate-exterior");

// ---- service section images ----
await wide("luxuryKitchen", "services", "hero", 84, 1.1, 1400);
await wide("plasterMural", "services", "plaster");
await wide("paneling", "services", "residential");
await wide("grandStair", "services", "commercial", 82, 1.2, 1400);
await wide("estateExterior", "services", "exterior");
await wide("kitchenCabinets", "services", "cabinetry");
await wide("woodChevron", "services", "process");
await wide("estate2", "services", "cta", 80, 0.6, 2000);

// ---- contact + about ----
await wide("grandStair", "contact", "panel", 82, 1.3, 1400);
await ensure("about");
await wide("paneling", "about", "craftsmanship", 82, 0.7, 1600);

// ---- portfolio gallery tiles (curated order) ----
const gallery = [
  ["luxuryKitchen", "01"], ["plasterMural", "02"], ["grandStair", "03"], ["estateExterior", "04"],
  ["kitchenCabinets", "05"], ["paneling", "06"], ["hallway", "07"], ["woodChevron", "08"],
  ["builtIns", "09"], ["cozyLiving", "10"], ["ceilingLights", "11"], ["estate2", "12"],
  ["patioWood", "13"], ["exteriorSky", "14"], ["whiteHouse", "15"], ["angularCeiling", "16"],
];
for (const [key, name] of gallery) await tile(key, name);
console.log("gallery tiles:", gallery.length);

console.log("\n✓ Brand images processed.");
