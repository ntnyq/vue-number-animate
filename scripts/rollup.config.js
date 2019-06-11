const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const vue = require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const { terser } = require('rollup-plugin-terser')

const {
  pkg: { version },
  pathSrc,
  pathDist,
  banner
} = require('./utils')
// const { version } = pkg

module.exports = [
  {
    input: 'main.js',
    output: 'number-animate.esm.js',
    format: 'es'
  },
  {
    input: 'main.js',
    output: 'number-animate.cjs.js',
    format: 'cjs'
  },
  {
    input: 'main.js',
    output: 'number-animate.js',
    format: 'umd'
  },
  {
    input: 'main.js',
    output: 'number-animate.min.js',
    format: 'umd'
  }
].map(opts => {
  const minify = /min\.js$/.test(opts.output)

  const config = {
    input: pathSrc(opts.input),

    output: {
      file: pathDist(opts.output),
      format: opts.format,
      // dir: pathDist(),
      exports: 'named',
      name: 'NumberAnimate',
      banner,
      globals: {
        vue: 'Vue'
      }
    },

    external: [
      'vue',
      ...(opts.format === 'es' ? [
        // dependencies no need builtIn
      ] : [])
    ],

    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.VUE_APP_VERSION': JSON.stringify(version)
      }),
      resolve({
        browser: true,
        preferBuiltins: true
      }),
      commonjs(),
      json(),
      vue(),
      ...(
        opts.format !== 'es'
          ? [babel({
            babelrc: false,
            presets: ['@vue/app'],
            runtimeHelpers: true,
            extensions: ['.js', '.vue'],
            exclude: [/\/core-js\//, /@babel\/runtime/]
          })]
          : []),
      ...(
        minify
          ? [terser({
            output: {
              comments: /^!/
            }
          })]
          : []
      )
    ]
  }

  return config
})
