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

const gulp = require('gulp');
const path = require('path');
const htmlreplace = require('gulp-html-replace');
const replace = require('gulp-replace');

// clean build
gulp.task('clean', () => {
  return gulp.src('build', {read: false, allowEmpty: true})
    .pipe(clean({force: true}));
});

//copy 
gulp.task('copy',() => {
  return gulp.src(['app/images/**/*', 'app/css/**/*', 'app/js/main.min.js', 'app/.htaccess', '!app/html/**/*'], {base: 'app'})
  .pipe(gulp.dest('build'));
});

//replace html
gulp.task('html', () => {
  return gulp.src('app/**/*.html')
    .pipe(replace('.html"', '"'))
    .pipe(htmlreplace({
      'removeHtmlExtension': {
        src: '',
        tpl: '<link rel="stylesheet" href="%s.css"><script src="%s.js"></script>'
      }
    }))
    .pipe(gulp.dest('build'));
});

//delete html-folder
gulp.task('cleanHtmlFromBuild', () => {
  return gulp.src('build/html', { read: false, allowEmpty: true })
    .pipe(clean({ force: true }));
});

gulp.task('build', gulp.series('clean', 'copy', 'html', 'cleanHtmlFromBuild'));
gulp.task('default', gulp.series('build'));



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