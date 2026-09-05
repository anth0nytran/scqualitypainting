/* ============================================================
   Convert downloaded stock photos into site-ready WebP.

   Source photos are from Unsplash (Unsplash License: free for
   commercial use, no attribution required — credits recorded in
   public/services/CREDITS.md anyway). Chosen for showing the
   actual work with no people in frame.

   Usage: node scripts/import-stock-images.mjs <sourceDir>
   ============================================================ */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const srcDir = process.argv[2];
if (!srcDir) {
    console.error("Usage: node scripts/import-stock-images.mjs <sourceDir>");
    process.exit(1);
}

const outDir = path.resolve(process.cwd(), "public", "services");

const JOBS = [
    {
        src: "0-vZHPAbfS4.jpg",
        out: "interior-painting.webp",
        width: 1600,
        credit: "Unsplash — freshly painted interior wall with crisp baseboard trim",
        page: "https://unsplash.com/photos/0-vZHPAbfS4",
    },
    {
        src: "XbwHrt87mQ0.jpg",
        out: "exterior-painting.webp",
        width: 1600,
        credit: "Unsplash — painted stucco exterior with trim, garage and front door at dusk",
        page: "https://unsplash.com/photos/XbwHrt87mQ0",
    },
];

await mkdir(outDir, { recursive: true });

const lines = ["# Stock photo credits", "", "Source: Unsplash (Unsplash License — free for commercial use).", ""];

for (const job of JOBS) {
    const buf = await readFile(path.join(srcDir, job.src));
    const meta = await sharp(buf).metadata();
    await sharp(buf)
        .resize({ width: job.width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(outDir, job.out));
    console.log(
        `${job.src} (${meta.width}x${meta.height}) -> public/services/${job.out} @ ${job.width}w`
    );
    lines.push(`- \`${job.out}\` — ${job.credit}. ${job.page}`);
}

lines.push("");
await writeFile(path.join(outDir, "CREDITS.md"), lines.join("\n"), "utf8");
console.log("Wrote public/services/CREDITS.md");
