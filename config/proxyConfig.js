module.exports = {
 proxy: {
    '/api': {  //将www.exaple.com印射为/apis
      target: 'http://192.168.1.5:8080', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/api': ''  //需要rewrite的,
      }       
    }
 }
}