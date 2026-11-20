import fs from "node:fs";
import path from "node:path";
import { openSync } from "fontkit";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const fontDir = path.join(root, "scripts", "fonts");
const imgDir = path.join(root, "src", "assets", "img");
const profileDir = process.env.AXS_PROFILE_DIR || "";

fs.mkdirSync(imgDir, { recursive: true });

function loadFont(file) {
  return openSync(path.join(fontDir, file));
}

const fonts = {
  display: loadFont("BodoniModa-450.ttf"),
  displayItalic: loadFont("BodoniModa-450-Italic.ttf"),
  text: loadFont("Newsreader-400.ttf"),
  textItalic: loadFont("Newsreader-400-Italic.ttf"),
  mono: loadFont("IBMPlexMono-400.ttf"),
};

const ink = {
  bg: "#080706",
  fg: "#e8dfcf",
  soft: "#c9beae",
  dim: "#918677",
  accent: "#d07a52",
  line: "#2b2620",
};

const paper = {
  bg: "#efe8db",
  fg: "#17130f",
  soft: "#3d352c",
  dim: "#706556",
  accent: "#9b3e22",
  line: "#c9bda9",
};

function pathText(font, text, x, y, size, fill) {
  const scale = size / font.unitsPerEm;
  const run = font.layout(text);
  let cursor = x;
  let pathData = "";

  for (let index = 0; index < run.glyphs.length; index += 1) {
    const glyph = run.glyphs[index];
    const position = run.positions[index];
    const glyphX = cursor + (position.xOffset || 0) * scale;
    const glyphY = y - (position.yOffset || 0) * scale;
    const outline = glyph.path.scale(scale, -scale).translate(glyphX, glyphY).toSVG();
    if (outline) pathData += outline;
    cursor += (position.xAdvance || glyph.advanceWidth) * scale;
  }

  return `<path d="${pathData}" fill="${fill}"/>`;
}

function trackedText(font, text, x, y, size, tracking, fill) {
  const scale = size / font.unitsPerEm;
  let cursor = x;
  let output = "";

  for (const char of text) {
    const run = font.layout(char);
    const glyph = run.glyphs[0];
    const position = run.positions[0];
    if (char !== " ") {
      const outline = glyph.path
        .scale(scale, -scale)
        .translate(cursor + (position.xOffset || 0) * scale, y)
        .toSVG();
      if (outline) output += `<path d="${outline}" fill="${fill}"/>`;
    }
    cursor += (position.xAdvance || glyph.advanceWidth) * scale + tracking;
  }

  return { svg: output, width: cursor - x - tracking };
}

function textWidth(font, text, size) {
  return (font.layout(text).advanceWidth * size) / font.unitsPerEm;
}

function trackedWidth(font, text, size, tracking) {
  return textWidth(font, text, size) + Math.max(0, text.length - 1) * tracking;
}

function seal(cx, cy, radius, fg, accent, lineWidth = 1.1) {
  const r = radius;
  const tickInner = r * 0.965;
  const tickOuter = r * 1.015;
  let ticks = "";
  for (let index = 0; index < 24; index += 1) {
    const angle = (index * Math.PI * 2) / 24 - Math.PI / 2;
    const length = index % 2 === 0 ? tickOuter : tickInner + (tickOuter - tickInner) * 0.45;
    const x1 = cx + Math.cos(angle) * tickInner;
    const y1 = cy + Math.sin(angle) * tickInner;
    const x2 = cx + Math.cos(angle) * length;
    const y2 = cy + Math.sin(angle) * length;
    ticks += `<path d="M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}"/>`;
  }

  const diamond = r * 0.235;
  const nodes = [
    [cx, cy - r],
    [cx + r, cy],
    [cx, cy + r],
    [cx - r, cy],
  ]
    .map(([x, y]) => `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(r * 0.014).toFixed(2)}" fill="${accent}" stroke="none"/>`)
    .join("");

  return `
    <g fill="none" stroke="${fg}" stroke-width="${lineWidth}">
      <circle cx="${cx}" cy="${cy}" r="${r}"/>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.88).toFixed(2)}" opacity="0.55"/>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.58).toFixed(2)}" opacity="0.32"/>
      <g opacity="0.55">${ticks}</g>
      <path d="M${cx} ${cy - r * 0.78}V${cy + r * 0.78}M${cx - r * 0.78} ${cy}H${cx + r * 0.78}" opacity="0.7"/>
      <path d="M${cx} ${cy - diamond}L${cx + diamond} ${cy}L${cx} ${cy + diamond}L${cx - diamond} ${cy}Z"/>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.026).toFixed(2)}" fill="${accent}" stroke="none"/>
    </g>
    ${nodes}
  `;
}

function cornerMarks(width, height, color) {
  const size = 12;
  const inset = 18;
  return `
    <g stroke="${color}" stroke-width="0.8" opacity="0.65">
      <path d="M${inset} ${inset}h${size}M${inset} ${inset}v${size}"/>
      <path d="M${width - inset} ${inset}h-${size}M${width - inset} ${inset}v${size}"/>
      <path d="M${inset} ${height - inset}h${size}M${inset} ${height - inset}v-${size}"/>
      <path d="M${width - inset} ${height - inset}h-${size}M${width - inset} ${height - inset}v-${size}"/>
    </g>
  `;
}

function heroSvg(theme) {
  const width = 1200;
  const height = 420;
  const c = theme;
  const fontSize = 200;
  const baseline = 252;
  const x = 62;

  const aWidth = textWidth(fonts.display, "A", fontSize);
  const xsWidth = textWidth(fonts.display, "XS", fontSize);
  const dashWidth = 58;
  const gap = 13;
  const dashX = x + aWidth + gap;
  const xsX = dashX + dashWidth + gap;

  const taglineSize = 35;
  const taglineY = 314;
  const taglineOne = "Software, ";
  const taglineTwo = "built to the line.";
  const taglineOneWidth = textWidth(fonts.text, taglineOne, taglineSize);

  const topLabel = trackedText(fonts.mono, "PORTFOLIO / VOL. I", 62, 45, 10.5, 2.1, c.dim);
  const topRightText = "ALGERIA · 36° N / 3° E";
  const topRightWidth = trackedWidth(fonts.mono, topRightText, 10.5, 2.1);
  const topRight = trackedText(fonts.mono, topRightText, 1138 - topRightWidth, 45, 10.5, 2.1, c.dim);

  const bottomLeft = trackedText(
    fonts.mono,
    "LANGUAGE DESIGN · NATIVE SYSTEMS · INTERFACES",
    62,
    384,
    9.6,
    2.05,
    c.dim,
  );
  const bottomRightText = "AXS-OFFICIAL.GITHUB.IO";
  const bottomRightWidth = trackedWidth(fonts.mono, bottomRightText, 9.6, 2.05);
  const bottomRight = trackedText(fonts.mono, bottomRightText, 1138 - bottomRightWidth, 384, 9.6, 2.05, c.dim);

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${c.bg}"/>
    <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" stroke="${c.line}"/>
    ${cornerMarks(width, height, c.accent)}

    ${topLabel.svg}
    ${topRight.svg}
    <path d="M62 66H1138" stroke="${c.line}"/>

    ${pathText(fonts.display, "A", x, baseline, fontSize, c.fg)}
    <path d="M${dashX} 204H${dashX + dashWidth}" stroke="${c.accent}" stroke-width="2.4"/>
    ${pathText(fonts.display, "XS", xsX, baseline, fontSize, c.fg)}

    ${pathText(fonts.text, taglineOne, 64, taglineY, taglineSize, c.soft)}
    ${pathText(fonts.textItalic, taglineTwo, 64 + taglineOneWidth, taglineY, taglineSize, c.fg)}

    <g>
      <rect x="812" y="82" width="292" height="292" stroke="${c.line}"/>
      <path d="M812 112V82H842M1094 82H1104V112M1104 374H1074M842 374H812V344" stroke="${c.accent}" stroke-width="1"/>
      ${seal(958, 228, 116, c.fg, c.accent, 1.05)}
    </g>

    <path d="M62 356H1138" stroke="${c.line}"/>
    ${bottomLeft.svg}
    ${bottomRight.svg}
  </svg>`;
}

function ogSvg() {
  const width = 1200;
  const height = 630;
  const c = ink;
  const fontSize = 216;
  const baseline = 342;
  const x = 64;
  const aWidth = textWidth(fonts.display, "A", fontSize);
  const dashWidth = 64;
  const gap = 14;
  const dashX = x + aWidth + gap;
  const xsX = dashX + dashWidth + gap;

  const taglineY = 412;
  const taglineSize = 42;
  const taglineOne = "Software, ";
  const taglineOneWidth = textWidth(fonts.text, taglineOne, taglineSize);

  const topLabel = trackedText(fonts.mono, "PORTFOLIO / VOL. I", 64, 56, 11, 2.2, c.dim);
  const topRightText = "ALGERIA · 36° N / 3° E";
  const topRightWidth = trackedWidth(fonts.mono, topRightText, 11, 2.2);
  const topRight = trackedText(fonts.mono, topRightText, 1136 - topRightWidth, 56, 11, 2.2, c.dim);

  const bottomLabel = trackedText(fonts.mono, "AXS-OFFICIAL.GITHUB.IO", 64, 576, 11, 2.2, c.dim);
  const bottomRightText = "PRIVATE ARCHIVE / BY REQUEST";
  const bottomRightWidth = trackedWidth(fonts.mono, bottomRightText, 11, 2.2);
  const bottomRight = trackedText(fonts.mono, bottomRightText, 1136 - bottomRightWidth, 576, 11, 2.2, c.accent);

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${c.bg}"/>
    <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" stroke="${c.line}"/>
    ${cornerMarks(width, height, c.accent)}

    ${topLabel.svg}
    ${topRight.svg}
    <path d="M64 82H1136" stroke="${c.line}"/>

    ${pathText(fonts.display, "A", x, baseline, fontSize, c.fg)}
    <path d="M${dashX} 278H${dashX + dashWidth}" stroke="${c.accent}" stroke-width="2.8"/>
    ${pathText(fonts.display, "XS", xsX, baseline, fontSize, c.fg)}

    ${pathText(fonts.text, taglineOne, 66, taglineY, taglineSize, c.soft)}
    ${pathText(fonts.textItalic, "built to the line.", 66 + taglineOneWidth, taglineY, taglineSize, c.fg)}

    ${trackedText(fonts.mono, "INDEPENDENT SYSTEMS STUDIO", 66, 478, 11, 2.3, c.dim).svg}

    <g>
      <rect x="786" y="172" width="346" height="346" stroke="${c.line}"/>
      <path d="M786 204V172H818M1132 172H1146V204M1146 518H1114M818 518H786V486" stroke="${c.accent}" stroke-width="1.1"/>
      ${seal(959, 345, 140, c.fg, c.accent, 1.15)}
    </g>

    <path d="M64 542H1136" stroke="${c.line}"/>
    ${bottomLabel.svg}
    ${bottomRight.svg}
  </svg>`;
}

function avatarSvg() {
  const size = 512;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="${ink.bg}"/>
    <rect x="0.5" y="0.5" width="${size - 1}" height="${size - 1}" stroke="${ink.line}"/>
    ${seal(256, 256, 188, ink.fg, ink.accent, 2.1)}
  </svg>`;
}

function writeSvg(file, svg) {
  fs.writeFileSync(file, svg.trim() + "\n");
  console.log("wrote", path.relative(root, file));
}

async function renderPng(svg, file, width, height) {
  let pipeline = sharp(Buffer.from(svg));
  if (width && height) pipeline = pipeline.resize(width, height);
  await pipeline.png().toFile(file);
  console.log("wrote", path.relative(root, file));
}

const darkHero = heroSvg(ink);
const lightHero = heroSvg(paper);
const og = ogSvg();
const avatar = avatarSvg();

writeSvg(path.join(imgDir, "og.svg"), og);

await renderPng(og, path.join(imgDir, "og.png"), 1200, 630);

if (profileDir) {
  fs.mkdirSync(profileDir, { recursive: true });
  writeSvg(path.join(profileDir, "hero-dark.svg"), darkHero);
  writeSvg(path.join(profileDir, "hero-light.svg"), lightHero);
  await renderPng(avatar, path.join(profileDir, "avatar.png"), 512, 512);
}

const favicon = fs.readFileSync(path.join(imgDir, "favicon.svg"));
for (const size of [32, 180, 192, 512]) {
  const name = size === 180 ? "apple-touch-icon.png" : `favicon-${size}.png`;
  await renderPng(favicon, path.join(imgDir, name), size, size);
}

console.log("brand assets complete");
