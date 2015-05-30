var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    path = require('path'),
    notify = require('gulp-notify')
    livereload = require('gulp-livereload');

//LESS
gulp.task('less', function () {
  gulp.src('less/style.less')
    .pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ]
  })
  .on('error', function(err) {
    this.emit('end');
  }))
  .on("error", notify.onError(function(error) {
    return "Failed to Compile LESS: " + error.message;
  }))
  .pipe(gulp.dest('./'))
  .pipe(livereload());
});

// HTML 
gulp.task('html', function() {
  return gulp.src([ './index.html' ])
  .pipe(livereload());
});

// JS 
gulp.task('js', function() {
  return gulp.src([ 'js/default.js' ])
  .pipe(livereload());
});

//Watch
gulp.task('watch', function () {
    livereload.listen()
    gulp.watch(['js/default.js'], ['js']);
    gulp.watch(['less/**/*'], ['less']);
    gulp.watch('./index.html', ['html'])
});

//Build
gulp.task('build', function () {
  gulp.src('less/style.less')
  .pipe(gulp.dest('./'))
});

gulp.task('default', ['watch']);
gulp.task('build', ['less']);