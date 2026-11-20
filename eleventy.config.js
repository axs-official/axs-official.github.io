const fs = require("node:fs");
const path = require("node:path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  eleventyConfig.addFilter("isoDate", (value) => new Date(value).toISOString());
  eleventyConfig.addFilter("readableDate", (value) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(value)),
  );

  eleventyConfig.addShortcode("currentYear", () => new Date().getUTCFullYear());

  eleventyConfig.addCollection("pages", (collectionApi) =>
    collectionApi.getFilteredByTag("page"),
  );

  // Inline small SVG assets so the copper line and text can inherit theme colors.
  eleventyConfig.addShortcode("inlineSvg", function (filePath, className = "") {
    const absolute = path.join(__dirname, "src", filePath);
    const svg = fs.readFileSync(absolute, "utf8");
    if (!className) return svg;
    return svg.replace("<svg ", `<svg class="${className}" `);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
