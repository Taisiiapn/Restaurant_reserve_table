const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const deploy = require('gulp-gh-pages');

const cssFiles = [
  './src/css/fonts.scss',
  './src/css/main.scss',
  './src/css/menu.scss',
  './src/css/booking.scss',
  './src/css/contact.scss',
  './src/css/media.scss'
]

const jsFiles = [
  './src/js/lib.js',
  './src/js/main.js',
  './src/js/menu.js',
  './src/js/booking.js'
]

function styles() {
  return gulp.src(cssFiles)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['>0.1%'],
    cascade: false
  }))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(jsFiles)
  .pipe(concat('script.js'))
  .pipe(gulp.dest('./build/js'))
  .pipe(browserSync.stream());
}

function clean() {
  return del(['build/*'])
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  // следить за css / js / html
  gulp.watch('./src/css/**/*.scss', styles)
  gulp.watch('./src/js/**/*.js', scripts)
  gulp.watch('./*.html').on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));
gulp.task('deploy', function () {
  return gulp.src("./build/**/*")
    .pipe(deploy())
});