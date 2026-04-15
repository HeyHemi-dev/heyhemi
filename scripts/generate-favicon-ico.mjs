import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

function writeIcoHeader({ imageCount }) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // image type (icon)
  header.writeUInt16LE(imageCount, 4);
  return header;
}

function writeIcoDirectoryEntry({
  width,
  height,
  bytesInRes,
  imageOffset,
  planes = 1,
  bitCount = 32,
}) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(width === 256 ? 0 : width, 0);
  entry.writeUInt8(height === 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(planes, 4);
  entry.writeUInt16LE(bitCount, 6);
  entry.writeUInt32LE(bytesInRes, 8);
  entry.writeUInt32LE(imageOffset, 12);
  return entry;
}

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(scriptDir, "..");
  const publicDir = path.join(repoRoot, "public");

  const png32Path = path.join(publicDir, "favicon-32x32.png");
  const png256Path = path.join(publicDir, "apple-touch-icon.png");
  const outPath = path.join(publicDir, "favicon.ico");

  const [png32, png256] = await Promise.all([
    fs.readFile(png32Path),
    fs.readFile(png256Path),
  ]);

  const imageDatas = [
    { width: 32, height: 32, data: png32 },
    { width: 256, height: 256, data: png256 },
  ];

  const header = writeIcoHeader({ imageCount: imageDatas.length });
  const directoryEntries = [];

  let imageOffset = 6 + 16 * imageDatas.length;
  for (const imageData of imageDatas) {
    directoryEntries.push(
      writeIcoDirectoryEntry({
        width: imageData.width,
        height: imageData.height,
        bytesInRes: imageData.data.length,
        imageOffset,
      }),
    );
    imageOffset += imageData.data.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...directoryEntries,
    ...imageDatas.map((imageData) => imageData.data),
  ]);

  await fs.writeFile(outPath, icoBuffer);
  // eslint-disable-next-line no-console
  console.log(`Wrote ${path.relative(repoRoot, outPath)}`);
}

await main();
