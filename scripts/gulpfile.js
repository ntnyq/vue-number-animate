const gulp = require('gulp')
const rollup = require('rollup')
const fs = require('fs-extra')
const through = require('through2')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

const rollupConfig = require('./rollup.config')
const {
  pathSrc,
  pathDist,
  banner
} = require('./utils')

function makeRollupTask (config) {
  async function buildTask () {
    const bundle = await rollup.rollup(config)

    return bundle.write(config.output)
  }

  const displaName = config.output.file.split('/').slice(-1)

  buildTask.displayName = `rollup: ${displaName}`

  return buildTask
}

function clean () {
  return fs.remove(pathDist())
}

async function runRollup () {
  await gulp.parallel(...rollupConfig.map(makeRollupTask))()
}

function style () {
  return (
    gulp
      .src([pathSrc('style.scss')])
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(concat('number-animate.css'))
      .pipe(through.obj(function (file, encoding, callback) {
        file.contents = Buffer.concat([Buffer.from(banner), file.contents])
        this.push(file)
        return callback()
      }))
      .pipe(gulp.dest(pathDist()))
      .pipe(postcss([
        cssnano()
      ]))
      .pipe(rename('number-animate.min.css'))
      .pipe(gulp.dest(pathDist()))
  )
}

exports.build = gulp.series(clean, gulp.parallel(runRollup, style))
