import path from 'path';
import browserify from 'browserify';
import webpack from 'webpack';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import watchify from 'watchify';
import { assign } from 'lodash';
import gulp from 'gulp';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import nodemon from 'gulp-nodemon';
import streamify from 'gulp-streamify';
import sourcemaps from 'gulp-sourcemaps';


// Browserify
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
// add custom browserify options here
var customOpts = {
  entries: ['./src/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
b.transform('babelify', {presets: ['es2015', 'react']})

gulp.task('browserify', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, uglify, impossible to read javascript code
    //.pipe(streamify(uglify()))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/javascript'));
}

// Clean
gulp.task('clean', function(){
  return gulp.src(['dist/*'], { read: false })
  .pipe(clean());
});

// Move
gulp.task('move',['clean'], function(){
  gulp.src(['src/public/**/*'])
  .pipe(gulp.dest('dist'));
});

// Lint
gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_mudles/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Start Server
gulp.task('start', ['move', 'browserify', 'lint'], function () {
  nodemon({
    script: 'src/server.js'
  , exec: 'babel-node'
  });
});

// Start Server
gulp.task('default', ['start']);
