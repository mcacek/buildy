var gulp = require('gulp');
var config = require('./src/gulp/gulp-config');

require('require-dir')(__dirname + '/src/gulp/tasks')

gulp.task('default', function() {
    console.log(config);
});
