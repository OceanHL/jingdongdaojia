/*
  1. npm run build 打包代码
  2. 把代码给后端
  3. 后端把前端代码放入后端工程
  4. 后端重启后端服务
  【容易出问题的就是publicPath配置】
  publicPath: "./", 对应着在【当前域名下】访问资源
  publicPath: "/jingdong", 对应着在【当前域名下的jingdong目录下】访问资源
*/
module.exports = {
  // webpack中的publicPath属性
  publicPath: "./", // 在【当前域名下】访问资源
  // publicPath: "/jingdong", // 在【当前域名下的jingdong目录下】访问资源
  devServer: {
    proxy: {
      "/api": {
        target:
          "https://www.fastmock.site/mock/2044dfd892765aa3a7714a7ee6b84e11/jd",
        changeOrigin: true
      }
    }
  }
};
