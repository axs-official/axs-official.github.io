import { chromium } from "playwright";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const axeSource = fs.readFileSync(
  path.resolve("node_modules/axe-core/axe.min.js"),
  "utf8",
);
const base = process.env.BASE_URL || "http://localhost:8080";
const shotDir = path.join(os.tmpdir(), "axs-shots");
fs.mkdirSync(shotDir, { recursive: true });
const pages = ["/", "/practice/", "/studio/", "/archive/", "/contact/", "/colophon/", "/404.html"];
const browser = await chromium.launch();
const results = [];

for (const route of pages) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(String(error)));
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.addScriptTag({ content: axeSource });
  const audit = await page.evaluate(async () => {
    const output = await window.axe.run(document, {
      runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
    });
    return output.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.map((node) => node.target.join(" ")),
    }));
  });
  const overflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    title: document.title,
    h1: document.querySelector("h1")?.textContent.trim() ?? null,
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
    description: document.querySelector('meta[name="description"]')?.content ?? null,
  }));
  results.push({ route, status: response?.status(), consoleErrors, overflow, audit });
  await context.close();
}

// Narrow viewport overflow checks.
const narrow = [];
for (const width of [320, 360, 390, 768, 1024]) {
  const context = await browser.newContext({ viewport: { width, height: 844 } });
  const page = await context.newPage();
  for (const route of ["/", "/practice/", "/contact/"]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    if (metrics.scrollWidth > metrics.clientWidth + 1) {
      narrow.push({ width, route, ...metrics });
    }
  }
  await context.close();
}

// Mobile menu interaction.
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.locator("[data-menu-toggle]").click();
await page.waitForTimeout(150);
const menuState = await page.evaluate(() => ({
  open: document.querySelector("[data-mobile-menu]")?.classList.contains("is-open"),
  expanded: document.querySelector("[data-menu-toggle]")?.getAttribute("aria-expanded"),
  focused: document.activeElement?.getAttribute("data-menu-close") !== null,
  bodyLocked: document.body.classList.contains("menu-open"),
}));
await page.screenshot({
  path: path.join(shotDir, "menu-mobile.png"),
});
await page.keyboard.press("Escape");
const menuClosed = await page.evaluate(() => ({
  open: document.querySelector("[data-mobile-menu]")?.classList.contains("is-open"),
  expanded: document.querySelector("[data-menu-toggle]")?.getAttribute("aria-expanded"),
  focusedToggle: document.activeElement?.hasAttribute("data-menu-toggle"),
}));
await context.close();

// Theme persistence and reduced motion.
const themeContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const themePage = await themeContext.newPage();
await themePage.goto(base + "/", { waitUntil: "networkidle" });
await themePage.locator("[data-theme-toggle]").click();
const themeAfterClick = await themePage.evaluate(() => ({
  theme: document.documentElement.dataset.theme,
  stored: localStorage.getItem("axs-theme"),
  meta: document.querySelector('meta[name="theme-color"]')?.content,
  pressed: document.querySelector("[data-theme-toggle]")?.getAttribute("aria-pressed"),
}));
await themePage.reload({ waitUntil: "networkidle" });
const themeAfterReload = await themePage.evaluate(() => ({
  theme: document.documentElement.dataset.theme,
  meta: document.querySelector('meta[name="theme-color"]')?.content,
}));
await themeContext.close();

const motionContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const motionPage = await motionContext.newPage();
await motionPage.goto(base + "/", { waitUntil: "networkidle" });
const reducedMotion = await motionPage.evaluate(() => {
  const item = document.querySelector("[data-reveal]");
  return {
    visible: item?.classList.contains("is-visible"),
    reveal: item?.classList.contains("reveal"),
    opacity: item ? getComputedStyle(item).opacity : null,
  };
});
await motionContext.close();

console.log(
  JSON.stringify(
    { results, narrow, menuState, menuClosed, themeAfterClick, themeAfterReload, reducedMotion },
    null,
    2,
  ),
);

await browser.close();
