const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

gulp.task("minify-ie11", function () {
  return gulp
    .src("htmx-toaster.js")
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                ie: "11",
              },
              useBuiltIns: "entry",
              corejs: 3,
            },
          ],
        ],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".ie11.min" }))
    .pipe(gulp.dest("dist"));
});

gulp.task("minify-modern", function () {
  return gulp
    .src("htmx-toaster.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist"))
    .pipe(gulp.dest("docs"));
});

gulp.task("default", gulp.series("minify-ie11", "minify-modern"));
