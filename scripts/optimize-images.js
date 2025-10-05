import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../assets');
const OUTPUT_DIR = path.join(__dirname, '../assets/optimized');

async function optimizeImages() {
  try {
    // Create output directory if it doesn't exist
    if (!existsSync(OUTPUT_DIR)) {
      await mkdir(OUTPUT_DIR, { recursive: true });
    }

    // Read all files from assets directory
    const files = await readdir(ASSETS_DIR);

    // Filter image files
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to optimize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(ASSETS_DIR, file);
      const baseName = path.parse(file).name;

      // Generate WebP version
      const webpPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(webpPath);

      console.log(`✓ Created WebP: ${baseName}.webp`);

      // Generate optimized original format
      const ext = path.extname(file).toLowerCase();
      const optimizedPath = path.join(OUTPUT_DIR, file);

      if (ext === '.png') {
        await sharp(inputPath)
          .png({ quality: 85, compressionLevel: 9 })
          .toFile(optimizedPath);
      } else {
        await sharp(inputPath)
          .jpeg({ quality: 85, progressive: true })
          .toFile(optimizedPath);
      }

      console.log(`✓ Optimized: ${file}`);
    }

    console.log('\n✅ All images optimized successfully!');
    console.log(`Output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
