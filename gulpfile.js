// переменные
const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');


function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/style.scss')
  .pipe(scss({ outputStyle: 'compressed' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true }))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())
}

function htmlInclude() {
  return src('app/html/pages/*.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))

  .pipe(dest('app'))
  .pipe(browserSync.stream());
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/html/**/*.html'], htmlInclude);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    },
    notify: false
  })
}

function cleanDist() {
  return src('dist')
  .pipe(clean())
}

// экспорты и вызовы
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.htmlInclude = htmlInclude;


exports.default = parallel(styles, scripts, browsersync, watching, htmlInclude);