const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        http: false,
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        url: require.resolve("url"),
        buffer: require.resolve("buffer/"),
        process: require.resolve("process/browser"),
        path: require.resolve("path-browserify"),
        util: require.resolve("util/"),
      };
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        })
      );
      return webpackConfig;
    },
  },
};
