module.exports = {
  publicPath: "/ner-annotator/",
  outputDir: "./docs/",

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: [
    'quasar'
  ]
};
