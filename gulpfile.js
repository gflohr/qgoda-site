'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var copy = require('gulp-copy');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jsValidate = require('gulp-jsvalidate');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var mkdirp = require('mkdirp');

var src = { dir: '.' };
src.assetdir = src.dir + '/_assets';
src.jsdir = src.assetdir + '/js';
src.sassdir = src.assetdir + '/scss';

var dest = { dir: './assets' };
dest.cssdir = dest.dir + '/css';
dest.jsdir = dest.dir + '/js';
dest.fontsdir = dest.dir + '/fonts';

var paths = {
    fonts: {
        src: ['node_modules/font-awesome/fonts/fontawesome-webfont.*'],
        dest: dest.fontsdir,
        options: {
            prefix: 3 
        }
    },
    sass: { 
        src: [src.sassdir + '/*.scss'],
        dest: dest.cssdir,
        include: [
                   src.sassdir,
                   'node_modules/bootstrap/scss',
                   'node_modules/font-awesome/scss'
                 ],
        watch: [src.sassdir + '/**/*.scss',
                src.sassdir + '/**/_*.scss',
                'node_modules/bootstrap/scss'],
    },
    js: {
        app: {
            src: [src.jsdir + '/**/*.js'],
            dest: dest.jsdir
        },
        vendor: {
            src: [
                   'node_modules/jquery/dist/jquery.js',
                   'node_modules/tether/dist/js/tether.js',
                   'node_modules/bootstrap/dist/js/bootstrap.js'
                 ],
            dest: dest.jsdir
        }
    },
    browserSync: {
        baseDir: '_site',
        watch: ['_timestamp']
    }
};

var uglifyOptions = {
    compress: {
        drop_debugger: false
    }
};

function jsError(err) {
    gutil.log([err.fileName, err.lineNumber, err.description].join(': '));
    process.exit(1);
}

gulp.task('clean', function() {
    return del([dest.cssdir, dest.jsdir, dest.fontsdir]);
});

gulp.task('fonts', function() {
    mkdirp.sync(paths.fonts.dest);
    return gulp.src(paths.fonts.src)
    .pipe(copy(paths.fonts.dest, paths.fonts.options));
});

gulp.task('sass', function() {
    return gulp.src(paths.sass.src)
    .pipe(plumber({
        errorHandler: notify.onError(function(err) {
           return err.message;
        })}))
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: paths.sass.include}))
    .pipe(postcss([ autoprefixer({ browsers: [ 'last 4 versions' ]}) ]))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        extname: '.min.css'
     }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('js.app', function() {
    return gulp.src(paths.js.app.src)
    .pipe(plumber({
        errorHandler: notify.onError(function(err) {
            return [err.fileName, err.lineNumber, err.description].join(': ');
        })}))
    .pipe(jsValidate())
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(plumber())
    .pipe(uglify(uglifyOptions)).on('error', function(err) {
        gutil.log('bundling into app.min.js failed: fix above syntax errors!');
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js.app.dest));
});

gulp.task('js.vendor', function() {
    return gulp.src(paths.js.vendor.src)
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.min.js'))
    .pipe(uglify(uglifyOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js.vendor.dest));
});

gulp.task('js', ['js.app', 'js.vendor']);

gulp.task('build', ['sass', 'js', 'fonts']);

gulp.task('watch', function() {
    gulp.watch(paths.fonts.src, ['fonts']);
    gulp.watch(paths.sass.watch, ['sass']);
    gulp.watch(paths.js.app.src, ['js.app']);
    gulp.watch(paths.js.vendor.src, ['js.vendor']);
    gulp.watch(paths.browserSync.watch, ['browser-sync-reload']);
});

gulp.task('browser-sync-reload', function() {
    browserSync.reload();
});

gulp.task('browser-sync', function(callback) {
    browserSync.init({
        server: {
            baseDir: paths.browserSync.baseDir
        },
        browser: "google chrome"
    }, callback);
});

gulp.task('default', function(callback) {
    runSequence(
        ['clean'],
        ['build'],
        ['watch', 'browser-sync'],
        callback
    );
});
