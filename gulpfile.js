var gulp = require('gulp');
//include plugins
var jshint = require('gulp-jshint');
var jslint = require('gulp-jslint');



gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('jshint', function() {
    gulp.src('./app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    
});


gulp.task('jslint', function() {
    gulp.src('./app/*.js')
    .pipe(jslint())
    .pipe(jslint.reporter('default'));

    
});




