import { readFile, readdir } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const hotelDir = join(root, "data", "hotels");
const destinationDir = join(root, "data", "destinations");
const index = JSON.parse(await readFile(join(root, "data", "index.json"), "utf8"));
const files = (await readdir(hotelDir)).filter(file => file.endsWith(".json")).sort();
const indexed = [...index.hotels].map(path => basename(path)).sort();
const errors = [];
const warnings = [];
const destinationIds = new Set();
const ids = new Set();
const requiredProfileTitles = ["地理位置与周边", "场地布局", "建筑、水体与植物", "抵达与实际条件"];

function check(condition, file, message) {
  if (!condition) errors.push(`${file}: ${message}`);
}
function warn(condition, file, message) {
  if (!condition) warnings.push(`${file}: ${message}`);
}
function validUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}
function canonicalImageUrl(value) {
  try {
    const url = new URL(value);
    url.search = "";
    return decodeURIComponent(url.href).toLowerCase();
  } catch {
    return value;
  }
}
function isSurroundingsImage(image) {
  return /周边|村落|街|河谷|海湾|岛屿|稻田|农业|道路|步道|抵达|东岸|夜景|渔船|机场|城镇|国家公园/.test(
    `${image.type || ""} ${image.caption || ""}`
  );
}
function checkGallery(gallery, label, kind) {
  const images = gallery || [];
  check(images.length >= 12, label, `${kind}图库至少需要 12 张图片`);
  warn(images.length >= 15, label, `${kind}图库少于 15 张，资料充足时应继续扩充至 15–20 张以上`);
  const urls = images.map(image => canonicalImageUrl(image.url || ""));
  check(new Set(urls).size === urls.length, label, `${kind}图库存在重复图片`);
  check(images.some(isSurroundingsImage), label, `${kind}图库至少需要 1 张周边环境或抵达过程图片`);
}

check(JSON.stringify(files) === JSON.stringify(indexed), "data/index.json", "索引与 data/hotels 目录不一致");

for (const file of files) {
  const hotel = JSON.parse(await readFile(join(hotelDir, file), "utf8"));
  const label = `data/hotels/${file}`;
  check(hotel.schemaVersion === 1, label, "schemaVersion 必须为 1");
  check(/^[a-z0-9-]+$/.test(hotel.id || ""), label, "id 只能使用小写字母、数字和连字符");
  check(!ids.has(hotel.id), label, `id 重复：${hotel.id}`);
  ids.add(hotel.id);
  check(["draft", "published", "archived", "excluded"].includes(hotel.status), label, "status 无效");

  for (const key of ["name", "englishName", "country", "region", "locality", "placeLabel", "hotelType"]) {
    check(Boolean(hotel.identity?.[key]), label, `identity.${key} 缺失`);
  }
  check(["A", "B", "C"].includes(hotel.classification?.grade), label, "classification.grade 无效");
  check(hotel.classification?.tags?.length >= 3, label, "至少需要 3 个标签");
  check(hotel.classification?.waterTypes?.length >= 1, label, "至少需要 1 种水体");
  check(hotel.classification?.tradeoffs?.length >= 1, label, "至少需要 1 项取舍");

  check(Number.isFinite(hotel.pricing?.minimum), label, "pricing.minimum 必须是数字");
  check(Number.isFinite(hotel.pricing?.maximum), label, "pricing.maximum 必须是数字");
  check(hotel.pricing?.minimum <= hotel.pricing?.maximum, label, "最低价不能高于最高价");
  check(validDate(hotel.pricing?.verifiedAt || ""), label, "pricing.verifiedAt 日期无效");

  for (const key of ["aesthetic", "value", "water", "greenery", "architecture", "exploration"]) {
    const value = hotel.scores?.[key];
    check(Number.isInteger(value) && value >= 0 && value <= 100, label, `scores.${key} 必须是 0–100 的整数`);
  }

  check((hotel.editorial?.oneLine || "").length >= 15, label, "一句话结论少于 15 个字");
  check((hotel.editorial?.reason || "").length >= 30, label, "收录理由少于 30 个字");
  check(hotel.editorial?.advantages?.length >= 2, label, "至少需要 2 项优点");
  check(hotel.editorial?.disadvantages?.length >= 1, label, "至少需要 1 项缺点");
  for (const item of hotel.editorial?.disadvantages || []) {
    check(["可能淘汰", "明显取舍", "轻微提醒"].includes(item.level), label, `缺点级别无效：${item.level}`);
    check((item.text || "").length >= 5, label, "缺点描述过短");
  }

  check(hotel.profile?.sections?.length === 4, label, "基本介绍必须包含 4 个章节");
  hotel.profile?.sections?.forEach((section, i) => {
    check(section.title === requiredProfileTitles[i], label, `第 ${i + 1} 个介绍标题应为“${requiredProfileTitles[i]}”`);
    check((section.text || "").length >= 60, label, `“${section.title}”少于 60 个字`);
  });

  check(validUrl(hotel.media?.cover || ""), label, "封面 URL 无效");
  checkGallery(hotel.media?.gallery, label, "酒店");
  for (const image of hotel.media?.gallery || []) {
    check(validUrl(image.url || ""), label, "图库 URL 无效");
    check(Boolean(image.type && image.source), label, "图库图片必须填写 type 和 source");
  }
  check(validUrl(hotel.links?.ctrip || ""), label, "携程链接无效");
  check(validUrl(hotel.links?.official || ""), label, "官网链接无效");
  check(validDate(hotel.verification?.updatedAt || ""), label, "verification.updatedAt 日期无效");
  warn(hotel.verification?.status === "verified", label, "资料尚未标记为 verified");

  const ageDays = (Date.now() - Date.parse(`${hotel.pricing.verifiedAt}T00:00:00Z`)) / 86400000;
  warn(ageDays <= 180, label, `价格已超过 ${Math.floor(ageDays)} 天未复核`);
}

const destinationFiles = (await readdir(destinationDir)).filter(file => file.endsWith(".json")).sort();
const indexedDestinations = [...(index.destinations || [])].map(path => basename(path)).sort();
check(JSON.stringify(destinationFiles) === JSON.stringify(indexedDestinations), "data/index.json", "度假地索引与 data/destinations 目录不一致");

for (const file of destinationFiles) {
  const destination = JSON.parse(await readFile(join(destinationDir, file), "utf8"));
  const label = `data/destinations/${file}`;
  check(destination.schemaVersion === 1, label, "schemaVersion 必须为 1");
  check(/^[a-z0-9-]+$/.test(destination.id || ""), label, "id 只能使用小写字母、数字和连字符");
  check(!destinationIds.has(destination.id), label, `id 重复：${destination.id}`);
  destinationIds.add(destination.id);
  check(["draft", "published", "archived", "excluded"].includes(destination.status), label, "status 无效");
  for (const key of ["name", "englishName", "country", "region", "type", "placeLabel"]) {
    check(Boolean(destination.identity?.[key]), label, `identity.${key} 缺失`);
  }
  for (const key of ["aesthetic", "water", "greenery", "exploration", "publicness", "affordability", "accessEase"]) {
    const value = destination.scores?.[key];
    check(Number.isInteger(value) && value >= 0 && value <= 100, label, `scores.${key} 必须是 0–100 的整数`);
  }
  check(destination.profile?.baseAreas?.length >= 2, label, "至少需要 2 个落脚区域");
  check(destination.pricing?.budgetBands?.length >= 2, label, "至少需要 2 档住宿预算");
  check(destination.editorial?.advantages?.length >= 2, label, "至少需要 2 项优点");
  check(destination.editorial?.disadvantages?.length >= 1, label, "至少需要 1 项取舍");
  check(validUrl(destination.media?.cover || ""), label, "封面 URL 无效");
  checkGallery(destination.media?.gallery, label, "度假地");
  for (const image of destination.media?.gallery || []) {
    check(validUrl(image.url || ""), label, "图库 URL 无效");
    check((image.caption || "").length >= 4, label, "度假地图片必须填写清晰图注");
  }
  check(validUrl(destination.links?.ctrip || ""), label, "携程链接无效");
  check(validUrl(destination.links?.primary || ""), label, "主要核验链接无效");
  check(validDate(destination.verification?.updatedAt || ""), label, "verification.updatedAt 日期无效");
}

for (const message of warnings) console.warn(`WARN  ${message}`);
if (errors.length) {
  for (const message of errors) console.error(`ERROR ${message}`);
  console.error(`\n${errors.length} 个错误，${warnings.length} 个提醒`);
  process.exit(1);
}
console.log(`Validated ${files.length} hotels and ${destinationFiles.length} destinations: 0 errors, ${warnings.length} warnings`);
