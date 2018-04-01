var gulp = require("gulp");
var imagemin = require("gulp-imagemin");

gulp.task("default", function() {
  return gulp
    .src("./src/images/**/*")
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./dist/images"));
});
