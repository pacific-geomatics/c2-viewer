import browserify from 'browserify';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import streamify from 'gulp-streamify';
import eslint from 'gulp-eslint';

(function () {
  'use strict';

  // Browserify
  gulp.task('browserify', function() {
    var bundleStream = browserify('./lib/index.js')
      .transform('babelify', {presets: ['es2015', 'react']})
      .bundle();

    return bundleStream
      .pipe(source('./lib/index.js'))
      .pipe(streamify(uglify()))
      .pipe(rename('javascript/bundle.js'))
      .pipe(gulp.dest('./public'));
  });

  // Lint
  gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_mudles/**', '!public/javascript/bundle.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });

  // Start Server
  gulp.task('start', ['browserify', 'lint'], function () {
    nodemon({
      script: 'server.js'
    , ext: 'js html'
    , ignore: ['bundle.js']
    , tasks: ['browserify', 'lint']
    , exec: 'babel-node'
    });
  });

  // Start Server
  gulp.task('default', ['start']);
})();
