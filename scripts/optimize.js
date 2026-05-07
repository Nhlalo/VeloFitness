import sharp from "sharp";
import fs from "fs";
import path from "path";

const sizes = [640, 1080, 1600, 1920, 2560];
const inputFolder = "src/assets/images";
const outputFolder = "src/assets/images";

const images = fs
  .readdirSync(inputFolder)
  .filter((f) => f.match(/\.(jpg|jpeg|png)$/i));

//If the 'npm run image' script is run, then this will make every image within the assests/images have the same image with different widths of 640, 1080, 1600, 1920, 2560
async function processImages() {
  for (const image of images) {
    const inputPath = path.join(inputFolder, image);
    const name = path.parse(image).name;

    console.log(`Processing ${image}...`);

    for (const size of sizes) {
      const outputPath = path.join(outputFolder, `${name}-${size}w.webp`);

      await sharp(inputPath)
        .resize(size)
        .webp({ quality: 80 })
        .toFile(outputPath);
    }
  }
  console.log("Done!");
}

processImages();
