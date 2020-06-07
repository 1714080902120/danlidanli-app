module.exports = {
  publicPath: './',
  configureWebpack: {
    // externals: {
    //   'T': 'T'
    // },
    // performance: {
    //   hints: false
    // },
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'common': '@/common',
        'network': '@/network',
        'store': '@/store'
      }
    }
  },
  devServer: {
    proxy: {//配置跨域
      '/apis': {
        target: 'https://pv.sohu.com',//搜狐的域名
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/apis': ''//请求的时候使用这个api就可以
        }
      }

    }
  },
  css: {
      loaderOptions: {
        postcss: {
          plugins: [
            require("autoprefixer")({
              // 配置使用 autoprefixer
              overrideBrowserslist: ["last 15 versions"]
            }),
            require("postcss-pxtorem")({
              rootValue: 75, // 换算的基数
              // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
              //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
              selectorBlackList: ["ig"],
              propList: ["*"],
              exclude: /node_modules/
            })
          ]
        }
      }
    }
  }
