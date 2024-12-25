const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const rename = require('gulp-rename');


function scripts() {
  return src('app/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/style.scss')
  .pipe(scss({ outputStyle: 'compressed' }))
  .pipe(rename({ suffix: 'min' }))
  .pipe(autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true }))
  .pipe(dest('app/css'))
  .pipe(browserSync.stream())
}


function watching() {
  watch(['app/scss/style.scss'], styles)
  watch(['app/js/main.js'], scripts) 
  watch(['app/*.html']).on('change', browserSync.reload)
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}

function cleanDist() {
  return src('dist')
  .pipe(clean())
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;


exports.default = parallel(styles, scripts, browsersync, watching);