import fs from "node:fs";
import path from "node:path";

const siteDir = "_site";
const base = process.env.BASE_URL || "http://localhost:8080";

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)],
  );
}

const htmlFiles = walk(siteDir).filter((file) => file.endsWith(".html"));
const internal = new Map();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    internal.set(href, `${file} -> ${href}`);
  }
  for (const match of html.matchAll(/src="([^"]+)"/g)) {
    const src = match[1];
    if (!src.startsWith("/") || src.startsWith("//")) continue;
    internal.set(src, `${file} -> ${src}`);
  }
}

async function check(href) {
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await fetch(base + href, { redirect: "manual" });
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 400));
    }
  }
  throw lastError;
}

const results = [];
for (const [href, source] of internal) {
  try {
    const response = await check(href);
    if (response.status !== 200) results.push({ status: response.status, href, source });
  } catch (error) {
    results.push({ status: "error", error: error.message, href, source });
  }
}

console.log(
  JSON.stringify(
    {
      checked: internal.size,
      failures: results,
    },
    null,
    2,
  ),
);
