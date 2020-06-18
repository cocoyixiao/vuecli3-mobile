const path = require("path");

const idDev = process.env.NODE_ENV == "development";
const publicPath = idDev ? "/" : "http://www.xxx.com";
module.exports = {
  publicPath: publicPath, // 这个地方就是你的cdn的地址
  chainWebpack: config => {
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-html-loader")
      .loader("pug-html-loader")
      .end();
    // 处理全局stylus
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    );
  },
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null // 设置代理
  }
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/stylus/common.styl")]
    });
}
