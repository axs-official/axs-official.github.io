import { chromium } from "playwright";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const out = path.join(os.tmpdir(), "axs-shots");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();

async function capture(name, viewport, options = {}) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile: Boolean(options.isMobile),
    hasTouch: Boolean(options.isMobile),
    colorScheme: options.colorScheme || "dark",
  });
  if (options.theme) {
    await context.addInitScript((theme) => {
      localStorage.setItem("axs-theme", theme);
    }, options.theme);
  }
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto(options.url || "http://localhost:8080/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
  });
  await page.waitForTimeout(250);
  const metrics = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    theme: document.documentElement.dataset.theme || "ink",
    fonts: Array.from(document.fonts).map((font) => ({
      family: font.family,
      weight: font.weight,
      status: font.status,
    })),
  }));
  await page.screenshot({ path: path.join(out, `${name}.png`), fullPage: true, animations: "disabled", timeout: 60000 });
  await page.screenshot({ path: path.join(out, `${name}-viewport.png`), fullPage: false, animations: "disabled" });
  await context.close();
  return { name, viewport, metrics, errors };
}

const results = [];
results.push(await capture("home-desktop-ink", { width: 1440, height: 1000 }));
results.push(await capture("home-desktop-paper", { width: 1440, height: 1000 }, { theme: "paper", colorScheme: "light" }));
results.push(await capture("home-mobile-ink", { width: 390, height: 844 }, { isMobile: true }));
results.push(await capture("practice-desktop-ink", { width: 1440, height: 1000 }, { url: "http://localhost:8080/practice/" }));
results.push(await capture("archive-desktop-ink", { width: 1440, height: 1000 }, { url: "http://localhost:8080/archive/" }));
results.push(await capture("studio-desktop-ink", { width: 1440, height: 1000 }, { url: "http://localhost:8080/studio/" }));
results.push(await capture("contact-desktop-ink", { width: 1440, height: 1000 }, { url: "http://localhost:8080/contact/" }));
results.push(await capture("colophon-desktop-ink", { width: 1440, height: 1000 }, { url: "http://localhost:8080/colophon/" }));
results.push(await capture("404-desktop-ink", { width: 1440, height: 1000 }, { url: "http://localhost:8080/404.html" }));

console.log(JSON.stringify(results, null, 2));
await browser.close();
