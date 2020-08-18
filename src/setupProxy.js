
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/dev", {
      target: "http://192.168.31.35:3000",
      changeOrigin: true,
      pathRewrite: {
        "^/dev": "",
      },
    })
  );
};
