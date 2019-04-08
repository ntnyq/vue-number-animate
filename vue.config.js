const { version } = require('./package.json')

process.env.VUE_APP_VERSION = version

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',

  runtimeCompiler: process.env.NODE_ENV === 'development',

  devServer: {
    open: true
  },

  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: `${__dirname}`
        }
      }
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('number-animate$', `${__dirname}/${process.env.APP_PATH}`)
      .set('number-animate/dist/style.css$', `${__dirname}/${process.env.APP_STYLE_PATH}`)

    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
  }
}
