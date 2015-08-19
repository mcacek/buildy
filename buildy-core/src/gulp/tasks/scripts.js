var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var config = require('../gulp-config');
var path = require('path');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var modulesConfig = config.tasks.modules;
var browserifyConfig = config.browserify;

gulp.task('scripts:main', scriptsMain);
gulp.task('scripts:main:watch', scriptsMainWatch);
gulp.task('scripts:vendor', scriptsVendor);
gulp.task('scripts', ['scripts:main', 'scripts:vendor']);

function getModulePath(moduleName) {
    return path.join(__dirname, '/../../modules', moduleName, moduleName + '.js');
}

function getBundlers(withWatch) {
    var bundlers = [];

    modulesConfig.names.forEach(function(moduleName) {
        bundlers.push(withWatch ? getWatchableBundler(moduleName) : getBundler(moduleName));
    });

    return bundlers;
}

function getBundler(moduleName) {
    return browserify(getModulePath(moduleName), browserifyConfig.defaultConfig);
}

function getWatchableBundler(moduleName) {
    var bundler = watchify(getBundler(moduleName))

    bundler.on('update', function() {
        bundleModule(bundler, moduleName);
    });

    bundleModule(bundler, moduleName);

    return bundler;
}

function bundleModule(bundler, moduleName) {
    bundler.external(browserifyConfig.external)
        .bundle()
        .pipe(source(moduleName + '.js'))
        .pipe(gulp.dest(modulesConfig.dest));
}


function scriptsMain(cb) {
    var bundlers = getBundlers(false);
    var i = 0;
    var len = bundlers.length;
    var moduleName;
    var bundler;

    for(i; i<len; i++) {
        moduleName = modulesConfig.names[i];
        bundleModule(bundlers[i], moduleName);
    }

    cb();
}

function scriptsMainWatch() {
    getBundlers(true);
}

function scriptsVendor(cb) {
    return gulp.src(config.files.vendor.paths)
        .pipe(concat(config.files.vendor.bundle))
        .pipe(gulp.dest(config.files.vendor.dest));
}
