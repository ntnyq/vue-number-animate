const gulp = require('gulp')
const rollup = require('rollup')
const rimraf = require('rimraf')
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

gulp.task('clean', () => new Promise((resolve, reject) => {
  rimraf(pathDist(), err => {
    if (err) reject(err)
    resolve()
  })
}))

function makeRollupTask (config) {
  async function buildTask () {
    const bundle = await rollup.rollup(config)

    return bundle.write(config.output)
  }

  buildTask.displayName = `rollup:${config.output.file}`

  return buildTask
}

gulp.task('rollup', gulp.series(
  gulp.parallel(
    ...rollupConfig.map(makeRollupTask)
  )
))

gulp.task('style', () => {
  return (
    gulp
      .src([
        pathSrc('style.scss')
        // require any css style you like
      ])
      .pipe(sass())
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
})

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    'rollup',
    'style'
  )
))
