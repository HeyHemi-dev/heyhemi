import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderMermaid, THEMES } from "beautiful-mermaid";
import { existsSync } from "node:fs";

const SOURCE_ROOT = path.resolve("src/assets/projects");
const OUTPUT_ROOT = path.resolve("public/projects");
const THEME_NAME = process.env.MERMAID_THEME ?? "tokyo-night";
const theme = THEMES[THEME_NAME];
const overwrite = process.argv.includes("--overwrite") || process.argv.includes("-f");

if (!theme) {
  console.error(
    `Unknown Mermaid theme "${THEME_NAME}". Available: ${Object.keys(THEMES).join(", ")}`,
  );
  process.exit(1);
}

async function findMermaidFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return findMermaidFiles(fullPath);
      }
      return entry.isFile() && fullPath.endsWith(".mmd") ? [fullPath] : [];
    }),
  );
  return files.flat();
}

function toOutputPath(sourceFile) {
  const relativePath = path.relative(SOURCE_ROOT, sourceFile);
  return path.join(OUTPUT_ROOT, relativePath).replace(/\.mmd$/i, ".svg");
}

async function renderFile(sourceFile) {
  const outputFile = toOutputPath(sourceFile);
  if (!overwrite && existsSync(outputFile)) {
    return { sourceFile, outputFile, status: "skipped" };
  }

  const mermaidSource = await readFile(sourceFile, "utf8");
  const svg = await renderMermaid(mermaidSource, theme);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, svg, "utf8");
  return { sourceFile, outputFile, status: "rendered" };
}

async function main() {
  const files = await findMermaidFiles(SOURCE_ROOT);

  if (files.length === 0) {
    console.log(`No .mmd files found under ${SOURCE_ROOT}`);
    return;
  }

  let renderedCount = 0;
  let skippedCount = 0;

  for (const [index, sourceFile] of files.entries()) {
    const progress = `[${index + 1}/${files.length}]`;
    console.log(`${progress} ${path.relative(process.cwd(), sourceFile)}`);

    const result = await renderFile(sourceFile);
    const source = path.relative(process.cwd(), result.sourceFile);
    const output = path.relative(process.cwd(), result.outputFile);

    if (result.status === "skipped") {
      skippedCount += 1;
      console.log(`  skipped (exists): ${output}`);
      continue;
    }

    renderedCount += 1;
    console.log(`  wrote: ${source} -> ${output}`);
  }

  console.log("");
  console.log(
    `Done. rendered=${renderedCount} skipped=${skippedCount} mode=${overwrite ? "overwrite" : "skip-existing"}`,
  );
  if (!overwrite) {
    console.log("Use --overwrite (or -f) to replace existing SVG files.");
  }
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log("Usage: node scripts/render-mermaid.mjs [--overwrite|-f]");
  console.log("");
  console.log("Renders .mmd files from src/assets/projects to public/projects.");
  console.log("Default behavior skips SVG files that already exist.");
  console.log("Pass --overwrite to regenerate and replace existing SVGs.");
  process.exit(0);
}

if (process.argv.some((arg) => arg.startsWith("-") && !["--overwrite", "-f", "--help", "-h"].includes(arg))) {
  const invalid = process.argv.find(
    (arg) => arg.startsWith("-") && !["--overwrite", "-f", "--help", "-h"].includes(arg),
  );
  console.error(`Unknown option: ${invalid}`);
  console.error("Run with --help for usage.");
  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
