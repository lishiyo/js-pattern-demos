// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

/** TESTING **/
gulp.task('lint-client', function() {
  return gulp.src('./javascript/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// gulp.task('lint-test', function() {
//   return gulp.src('./test/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });

gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('./javascript/dashboard.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('public/js'));
});

// gulp.task('browserify-test', ['lint-test'], function() {
//   return gulp.src('test/tabs.js')
//     .pipe(browserify({
//       insertGlobals: true
//     }))
//     .pipe(rename('tabs-test.js'))
//     .pipe(gulp.dest('build'));
// });

// gulp.task('test', ['lint-test', 'browserify-test'], function() {
//   return gulp.src('test/index.html')
//     .pipe(mochaPhantomjs());
// });

/** if Client JS changes, re-browserify client and then re-lint and re-browserify Test **/
// gulp.task('watch', function() {
//   gulp.watch('client/**/*.js', ['browserify-client', 'test']);
//   gulp.watch('test/**/*.js', ['test']);
// });

/** Building to Public **/
gulp.task('styles', function() {
  return gulp.src('css/dashboard.scss')
    .pipe(sass())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('dashboard.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('public/css/dashboard.css')
    .pipe(minifyCSS())
    .pipe(rename('dashboard.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('public/js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build', ['uglify', 'minify']);

/** use in development **/
gulp.task("watch-dev", function(){
	gulp.watch('javascript/*.js', ['browserify-client']);
	gulp.watch('css/*.scss', ['styles']);
});

// Default Workflow
// TEST does the lintering and browserifying
gulp.task('default', ['build', 'watch-dev']);
