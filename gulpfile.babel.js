import path from 'path'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import watchify from 'watchify'
import { assign } from 'lodash'
import browserify from 'browserify'
import gulp from 'gulp'
import gutil from 'gulp-util'
import clean from 'gulp-clean'
import eslint from 'gulp-eslint'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import nodemon from 'gulp-nodemon'
import streamify from 'gulp-streamify'
import sourcemaps from 'gulp-sourcemaps'

/**
 * Browserify
 * https://www.codementor.io/reactjs/tutorial/react-js-browserify-workflow-part-1
 */
let customOpts = {
  entries: ['./src/app.js'],
  debug: true
}
let opts = assign({}, watchify.args, customOpts);
let bundler = watchify(browserify(customOpts));
bundler.transform('babelify', {presets: ['es2015', 'react', 'stage-0']})

gulp.task('browserify', bundle)
bundler.on('update', bundle)
bundler.on('log', gutil.log)

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    //.pipe(streamify(uglify()))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/javascript'));
}

/**
 * Clean
 */
gulp.task('clean', function(){
  return gulp.src(['dist/*'], { read: false })
    .pipe(clean());
});

/**
 * Move
 */
gulp.task('move',['clean'], function(){
  return gulp.src(['src/public/**/*'])
    .pipe(gulp.dest('dist'));
});

/**
 * Lint
 */
gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_mudles/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * Start Server
 */
gulp.task('start', ['clean', 'move', 'browserify'], function () {
  nodemon({
    script: 'src/server.js'
  , exec: 'babel-node'
  });
});

/**
 * Default
 */
gulp.task('default', ['start']);
