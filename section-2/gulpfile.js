var gulp = require("gulp");
var imagemin = require("gulp-imagemin");

gulp.task("default", ["imagemin"]);

gulp.task("imagemin", function() {
  return gulp
    .src("./src/images/**/*")
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./dist/images"));
});
