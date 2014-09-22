gulp = require 'gulp'
browserify = require 'browserify'
source = require 'vinyl-source-stream'

gulp.task 'build', ->
  browserify('./perfectResize.coffee', extensions: ['.coffee'], standalone: 'perfectResize')
    .bundle()
    .pipe source 'perfectResize.js'
    .pipe gulp.dest './lib'

gulp.task 'watch', ['build'], ->
  gulp.watch [ 'src/**/*.coffee' ], ['build']

gulp.task 'default', [ 'build' ]
