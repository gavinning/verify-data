var gulp = require("gulp")
var babel = require("gulp-babel")
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('dev', () => {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"))
})

gulp.task('uglify', () => {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist"))
})

gulp.task("default", ['dev', 'uglify'])
