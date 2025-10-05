import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../assets');
const OUTPUT_DIR = path.join(__dirname, '../assets/optimized');

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function processDir(inputDir, outputDir) {
  await ensureDir(outputDir);
  const entries = await readdir(inputDir, { withFileTypes: true });

  for (const entry of entries) {
    const inputPath = path.join(inputDir, entry.name);
    const outputPath = path.join(outputDir, entry.name);

    if (entry.isDirectory()) {
      // Skip the output directory to avoid infinite recursion
      if (path.resolve(inputPath) === path.resolve(OUTPUT_DIR) || entry.name === 'optimized') {
        continue;
      }
      // Recurse into subdirectories (e.g., testimonials)
      await processDir(inputPath, outputPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      continue;
    }

    const baseName = path.parse(entry.name).name;

    // Generate WebP alongside optimized asset in mirrored folder
    const webpPath = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    console.log(`✓ Created WebP: ${path.relative(OUTPUT_DIR, webpPath)}`);

    const optimizedPath = path.join(outputDir, entry.name);
    if (ext === '.png') {
      await sharp(inputPath)
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(optimizedPath);
    } else {
      await sharp(inputPath)
        .jpeg({ quality: 85, progressive: true })
        .toFile(optimizedPath);
    }
    console.log(`✓ Optimized: ${path.relative(OUTPUT_DIR, optimizedPath)}`);
  }
}

async function optimizeImages() {
  try {
    await ensureDir(OUTPUT_DIR);
    await processDir(ASSETS_DIR, OUTPUT_DIR);

    console.log('\n✅ All images optimized successfully!');
    console.log(`Output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
