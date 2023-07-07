const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 处理前后端跨域问题
  devServer: {
    proxy: {
      // 任意名字，这里用api
      '/api': {
        target: 'http://localhost:5000/', // 需要跨域访问的目标域名和端口号
        changeOrigin: true,
        // 重写请求到后端
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})

