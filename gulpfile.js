var config = require('./config/gulp.config');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
	console.log('default task.');
});

gulp.task('autoprefix', function() {
	return gulp.src(config.distStyleDir + '**/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2', 'iOS >= 7'],
			cascade: false
		}))
		.pipe(gulp.dest(config.distStyleDir))
});
