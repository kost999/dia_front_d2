'use strict';

// Dependencies

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  fileinclude = require('gulp-file-include'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  babel = require('gulp-babel'),
  postcss = require('gulp-postcss'),
  mqpacker = require('css-mqpacker'),
  minify = require('gulp-csso'),
  run = require('run-sequence'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  del = require('del'),
  sortCSSmq = require('sort-css-media-queries');

// Paths

var path = {
  build: {
    html: 'build/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    style: 'build/css/',
    js: 'build/js/'
  },
  src: {
    html:'src/*.html',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    style: 'src/style/style.scss',
    js: 'src/js/main.js',
    jsLibs: 'src/js/libs.js'
  },
  watch: {
    html: 'src/**/*.html',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    style: 'src/style/**/*.scss',
    jsLibs: 'src/js/**/*.js',
    js: 'src/js/**/*.js'
  },
  clean: './build'
};

gulp.task('html:build', function() {
  return gulp.src(path.src.html)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error %>')}))
    .pipe(fileinclude())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('img:build', function() {
  return gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('style:build', function() {
  return gulp.src(path.src.style)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error %>')}))
    .pipe(sass())
    .pipe(prefixer({browsers: ['last 2 versions', 'ie >= 10']}))
    .pipe(postcss([
      mqpacker({
        sort: sortCSSmq.desktopFirst
      })
    ]))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.style))
    .pipe(minify())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(path.build.style))
    .pipe(reload({stream: true}));
});

gulp.task('jsLibs:build', function() {
  return gulp.src(path.src.jsLibs)
    .pipe(plumber({errorHandler: notify.onError('Error <%= error %>')}))
    .pipe(sourcemaps.init())
    .pipe(fileinclude())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function() {
  return gulp.src(path.src.js)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error %>')}))
    .pipe(fileinclude())
    .pipe(plumber.stop())
    // .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('build', function (fn) {
  run(
    'clean',
  [
      'html:build',
      'img:build',
      'fonts:build',
      'jsLibs:build',
      'js:build',
      'style:build'
  ],
    fn
  );
});

gulp.task('watch', function() {
  gulp.watch(path.watch.html, ['html:build']);
  gulp.watch(path.watch.img, ['img:build']);
  gulp.watch(path.watch.fonts, ['fonts:build']);
  gulp.watch(path.watch.style, ['style:build']);
  gulp.watch(path.watch.jsLibs, ['jsLibs:build']);
  gulp.watch(path.watch.js, ['js:build']);
});

var browSyncConfig = {
  server: {
    baseDir: './build'
  },
  tunnel: false,
  host: 'localhost',
  port: 3000,
  logPrefix: 'diad'
};

//Dev tasks

gulp.task('serve',['build', 'watch'], function () {
  browserSync(browSyncConfig);
});

// Clean

gulp.task('clean', function () {
  return del(path.clean);
});

// Default task
gulp.task('default', ['start']);