import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public/images/projetos');
const EXTS = new Set(['.png', '.jpg', '.jpeg']);
const QUALITY = 82;
const MAX_WIDTH = 1920;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const files = await walk(ROOT);
let originalTotal = 0;
let webpTotal = 0;

for (const file of files) {
  const original = await fs.stat(file);
  originalTotal += original.size;
  const target = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const img = sharp(file);
  const meta = await img.metadata();
  const resized =
    meta.width && meta.width > MAX_WIDTH ? img.resize({ width: MAX_WIDTH }) : img;
  await resized.webp({ quality: QUALITY, effort: 5 }).toFile(target);
  const out = await fs.stat(target);
  webpTotal += out.size;
  const saved = (((original.size - out.size) / original.size) * 100).toFixed(1);
  console.log(
    `${path.relative(process.cwd(), file)} ${(original.size / 1024).toFixed(0)}KB → ${(
      out.size / 1024
    ).toFixed(0)}KB (-${saved}%)`
  );
  await fs.unlink(file);
}

console.log(
  `\nTotal: ${(originalTotal / 1024 / 1024).toFixed(2)}MB → ${(webpTotal / 1024 / 1024).toFixed(2)}MB (-${(
    ((originalTotal - webpTotal) / originalTotal) *
    100
  ).toFixed(1)}%)`
);
