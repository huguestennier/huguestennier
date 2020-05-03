const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


module.exports = function (eleventyConfig) {
  
  eleventyConfig.addPlugin(syntaxHighlight);
  markdownTemplateEngine: "md";

  eleventyConfig.addPassthroughCopy("src/_theme");

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true,
  });

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
  };
  let markdownLib = markdownIt(options).use(markdownItAnchor, {
    level: 2,
    permalink: true,
    permalinkSymbol: "#",
    permalinkBefore: true
  });

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src",
      layouts: "_layouts",
      output: "_site",
      data: "data",
    },
  };
};