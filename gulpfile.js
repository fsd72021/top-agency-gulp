const gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass')(require('sass')),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');

function compile_pug() {
	return gulp.src('./src/pug/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./build'))
		.pipe(livereload())
}

function compile_pug_ar() {
	return gulp.src('./src/pug/arabic/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./build/arabic'))
		.pipe(livereload())
}

function compile_and_minify_sass() {
	return gulp.src('src/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer('last 3 versions'))
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build/css'))
		.pipe(gulp.dest('./src/css/style'))
		.pipe(livereload())
}

function move_css_plugins() {
	return gulp.src('src/css/plugins/*.css')
		.pipe(cleanCSS())
		.pipe(concat('plugins.css'))
		.pipe(gulp.dest('./build/css'))
		.pipe(livereload())
}

function move_style_file() {
	return gulp.src('src/css/style/*.css')
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./build/css'))
		.pipe(livereload())
}

function move_js_plugins() {
	return gulp.src('src/js/plugins/*.js')
		.pipe(concat('plugins.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
		.pipe(livereload())
}

function move_script_file() {
	return gulp.src('src/js/script/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
		.pipe(livereload())
}

function minify_images() {
	return gulp.src(['src/images/*', 'src/images/*/*'])
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.mozjpeg({
				quality: 85,
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
		]))
		.pipe(gulp.dest('./build/images'))
		.pipe(livereload())
}

function move_fonts() {
	return gulp.src('./src/css/plugins/fonts/*.*')
		.pipe(gulp.dest('./build/css/fonts'))
		.pipe(livereload())
}

function move_web_fonts() {
	return gulp.src('./src/webfonts/*.*')
		.pipe(gulp.dest('./build/webfonts'))
		.pipe(livereload())
}

exports.default = function () {
	require('./server.js');
	livereload.listen();
	gulp.watch(['./src/pug'], compile_pug);
	gulp.watch(['./src/pug/arabic'], compile_pug_ar);
	gulp.watch(['./src/sass'], compile_and_minify_sass);
	gulp.watch(['./src/css/plugins'], move_css_plugins);
	gulp.watch(['./src/css/style'], move_style_file);
	gulp.watch(['./src/js/plugins'], move_js_plugins);
	gulp.watch(['./src/js/script'], move_script_file);
	gulp.watch(['./src/images'], minify_images);
	gulp.watch(['./src/css/plugins/fonts'], move_fonts);
	gulp.watch(['./src/webfonts'], move_web_fonts);
}