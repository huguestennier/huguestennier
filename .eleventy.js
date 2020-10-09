module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/hugues.css");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};