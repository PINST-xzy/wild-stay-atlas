import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const hotelDir = join(root, "data", "hotels");
const lodgingIds = new Set([
  "our-jungle-house",
  "our-jungle-camp",
  "ecotravel-cottages",
  "sumatra-orangutan-explore-guesthouse"
]);

for (const file of (await readdir(hotelDir)).filter(name => name.endsWith(".json"))) {
  const path = join(hotelDir, file);
  const data = JSON.parse(await readFile(path, "utf8"));
  data.classification.collection = lodgingIds.has(data.id) ? "lodging" : "resort";
  await writeFile(path, `${JSON.stringify(data, null, 2)}\n`);
}

const indexPath = join(root, "data", "index.json");
const index = JSON.parse(await readFile(indexPath, "utf8"));
index.contentVersion = "2026.07.24.8";
await writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log("Classified resort and lodging collections");
