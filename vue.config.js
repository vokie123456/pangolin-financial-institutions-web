// vue.config.js
const path = require('path')
const webpack = require('webpack')

// 获取编译环境
let build_env = process.env.ENV || "prod"
const build_var = require(`./environment/${build_env}.env`)

if (process.env.server) {
  build_var['URL']['SERVER'] = JSON.stringify(`http://${process.env.server}`)
}

// 传递环境变量
const build_define = Object.assign({
  NODE_ENV: build_env === "prod" ? '"production"' : '"development"', // 编译模式
  BUILD_ENV: JSON.stringify(build_env), // 编译环境
  BUILD_TIME: JSON.stringify(new Date().toLocaleString()) // 编译环境
}, build_var)


module.exports = {
  runtimeCompiler: true,
  // 修改webpack配置
  chainWebpack: config => {
    // 修改环境变量插件
    config
      .plugin('define')
      .init((Plugin, args) => new webpack.DefinePlugin(
        {
          'process.env': Object.assign({
            NODE_ENV: '"development"',
            BASE_URL: '"/"'
          }, build_define)
        }
      ))

    config.module.rules.delete('svg')

    config.module
      .rule('svg')
      .test(/\.svg$/)
      .include
      .add(path.join(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
  },
  // 扩展webpack配置
  configureWebpack: {
    optimization: {
      minimize: false
    },
    externals: {
      'app-config': 'appConfig',
    },
    resolve: {
      alias: {
        '~': path.join(__dirname, "src"),
        '@': path.join(__dirname, "src")
      }
    }
    // module: {
    //   rules: [
    //     {
    //       test: /\.svg$/,
    //       loader: 'svg-sprite-loader',
    //       include: [path.join(__dirname, 'src/assets/icons')],
    //       options: {
    //         symbolId: 'icon-[name]'
    //       }
    //     }
    //   ]
    // }
  }
}