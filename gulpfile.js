'use strict';

var gulp = require('gulp'),
    aliasify = require('aliasify'),
    autoprefix = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    html = require('gulp-minify-html'),
    sass = require('gulp-sass'),
    seq = require('gulp-sequence'),
    size = require('gulp-size'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util');


var debug = util.env.debug,
    api = util.env.api || 'mock',
    pkg = require('./package.json');


gulp.task('clean-dist', function() {
    return del('./dist');
});

gulp.task('clean-build', function() {
    return del('./build');
});

gulp.task('js', function() {
    var opt = {
        bundleExternal: false,
        debug: debug,
        transform: [babelify]
    };

    return browserify(pkg.main, opt)
        .transform(aliasify, {
            aliases: {
                './api': {'relative': './api/' + api}
            }
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(debug ? util.noop() : streamify(uglify()))
        .pipe(gulp.dest('build/js'))
        .pipe(size({showFiles: true}));
});

gulp.task('js-lib', function() {
    var bundler = browserify({
        debug: debug
    });

    Object.keys(pkg.dependencies).forEach(function(x) {
        bundler.require(x);
    });
    return bundler
        .bundle()
        .pipe(source('lib.js'))
        .pipe(debug ? util.noop() : streamify(uglify()))
        .pipe(gulp.dest('build/js'))
        .pipe(size({showFiles: true}));
});

gulp.task('eslint', function() {
    return gulp.src(['src/js/**/*.js', 'gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('css', function() {
    return gulp.src(['src/css/**/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefix('last 2 version'))
        .pipe(gulp.dest('build/css'))
        .pipe(size({showFiles: true}));
});

gulp.task('html', function() {
    return gulp.src(['src/*.html'])
        .pipe(html({
            conditionals: true
        }))
        .pipe(gulp.dest('build'))
        .pipe(size({showFiles: true}));
});

gulp.task('watch', ['eslint', 'js', 'css', 'html'], function() {
    gulp.watch(['src/js/**/*.js'], ['eslint', 'js']);
    gulp.watch(['src/css/**/*.scss'], ['css']);
    gulp.watch(['src/*.html'], ['html']);
});

gulp.task('rev', function() {
    var Rev = require('gulp-rev-all'),
        r = new Rev({
            dontRenameFile: ['.html'],
            hashLength: 6
        });

    return gulp.src('build/**/*')
        .pipe(r.revision())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', seq(
    'clean-build',
    ['js', 'js-lib', 'css', 'html']
));

gulp.task('default', seq(
    ['build', 'clean-dist'],
    'rev'
));
