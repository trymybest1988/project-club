var gulp = require('gulp')
var gutil = require('gulp-util')
var replace = require('gulp-replace')
var htmlmin = require('gulp-htmlmin')
var clean = require('gulp-clean')
var webpack = require('webpack')
var webpackConf = require('./webpack.config')

var assets = process.cwd() + '/dist'

// html process
gulp.task('default', ['pack'], function () {
  return gulp
        .src(assets + '/*.html')
        .pipe(replace(/<script(.+)?__build([^>]+)?><\/script>/g, ''))
        .pipe(htmlmin({
          collapseWhitespace: true,
          removeComments: true
        }))
        .pipe(gulp.dest(assets))
})

// run webpack pack
gulp.task('pack', ['clean'], function (done) {
  webpack(webpackConf, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true
    }))
    done()
  })
  console.log('node_env:', process.env.NODE_ENV)
})

// clean assets
gulp.task('clean', function () {
  return gulp.src(assets, {
    read: true
  }).pipe(clean())
})
