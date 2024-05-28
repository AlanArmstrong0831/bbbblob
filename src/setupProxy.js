const {createProxyMiddleware: proxy} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy("/commit/api/**", {
            pathRewrite: {
                '^/commit/api': '/commit/api'
            },
            target: 'http://192.168.1.8:3000',
            changeOrigin: true,
        })
    )
}