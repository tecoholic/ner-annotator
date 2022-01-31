const webpack = require("webpack");

module.exports = {
  publicPath: "/ner-annotator/",
  outputDir: "./docs/",

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  configureWebpack: (config) => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          APPLICATION_VERSION: JSON.stringify(
            require("./package.json").version
          ),
        }),
      ],
    };
  },

  transpileDependencies: ["quasar"],
};
