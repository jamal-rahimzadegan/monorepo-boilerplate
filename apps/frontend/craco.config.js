const path = require("path");
const { getLoader, loaderByName } = require("craco");

const packages = [];
packages.push(path.resolve(__dirname, "../common/src"));

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );

      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);

        return webpackConfig;
      }
    },
  },
};
