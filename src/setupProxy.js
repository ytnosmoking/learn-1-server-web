
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/dev", {
      target: "http://127.0.0.1:3000",
      changeOrigin: true,
      pathRewrite: {
        "^/dev": "",
      },
    }),
    createProxyMiddleware("/images", {
      target: "http://127.0.0.1:3000/images",
      changeOrigin: true,
      pathRewrite: {
        "^/images": "",
      },
    }),
    createProxyMiddleware("/clound", {
      target: "http://music.163.com/eapi",
      changeOrigin: true,
      pathRewrite: {
        "^/clound": "",
      },
    }),
    createProxyMiddleware("/cloundMusic", {
      target: "https://api.imjad.cn/cloudmusic",
      changeOrigin: true,
      pathRewrite: {
        "^/cloundMusic": "",
      },
    })
  );
};
