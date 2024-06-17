const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

gulp.task("default", function () {
  return gulp
    .src("htmx-toaster.js")
    .pipe(gulp.dest("dist"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist"));
});
