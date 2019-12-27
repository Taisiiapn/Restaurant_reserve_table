// const gulp = require('gulp');
// const concat = require('gulp-concat');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const del = require('del');
// const browserSync = require('browser-sync').create();
// const sass = require('gulp-sass');

// // порядок подключения css
// const cssFiles = [
//   './src/css/header.css',
//   './src/css/main.css',
//   './src/css/footer.css',
//   './src/css/media.css'
// ]

// // порядок подключения js
// const jsFiles = [
//   './src/js/lib.js',
//   './src/js/main.js'
// ]

// function styles() { // task for styles
//   return gulp.src(cssFiles)
//   .pipe(concat('style.css'))
//   .pipe(autoprefixer({
//     overrideBrowserslist: ['>0.1%'],
//     cascade: false
//   }))
//   .pipe(cleanCSS({
//     level: 2
//   }))
//   //output folder
//   .pipe(gulp.dest('./build/css'))
//   .pipe(browserSync.stream());
// }

// function scripts() { // task for scripts
//   return gulp.src(jsFiles)
//   .pipe(concat('script.js'))
//   .pipe(uglify({
//     toplevel: true
//   }))
//   .pipe(gulp.dest('./build/js'))
//   .pipe(browserSync.stream());
// }

// function clean() {
//   return del(['build/*'])
// }

// function watch() {
//   browserSync.init({
//     server: {
//       baseDir: "./"
//     }
//   });
//   // следить за css / js / html
//   gulp.watch('./src/css/**/*.css', styles)
//   gulp.watch('./src/js/**/*.js', scripts)
//   gulp.watch("./*.html").on('change', browserSync.reload);
// }

// //вызывает ф-ии styles / scripts
// gulp.task('styles', styles);
// gulp.task('scripts', scripts);

// gulp.task('del', clean);
// // следить за всеми изменениями
// gulp.task('watch', watch);
// // удаляет все в build, снова строит папки (styles, scripts)
// gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
// gulp.task('dev', gulp.series('build', 'watch'));






const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
// const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

// порядок подключения css
const cssFiles = [
  './src/css/main.scss',
  './src/css/menu.scss',
  './src/css/gallery.scss',
  './src/css/contact.scss',
  './src/css/footer.scss',
  './src/css/media.scss'
]

// порядок подключения js
const jsFiles = [
  './src/js/lib.js',
  './src/js/header.js',
  './src/js/gallery.js',
  './src/js/main.js'
]

function styles() { // task for styles
  return gulp.src(cssFiles)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['>0.1%'],
    cascade: false
  }))
  //output folder
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
}

function scripts() { // task for scripts
  return gulp.src(jsFiles)
  .pipe(concat('script.js'))
  // .pipe(uglify({
  //   toplevel: true
  // }))
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
  gulp.watch("./*.html").on('change', browserSync.reload);
}

//вызывает ф-ии styles / scripts
gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('del', clean);
// следить за всеми изменениями
gulp.task('watch', watch);
// удаляет все в build, снова строит папки (styles, scripts)
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));