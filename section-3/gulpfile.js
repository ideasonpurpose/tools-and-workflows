var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const atImport = require("postcss-import");
const browserSync = require("browser-sync").create();

gulp.task("default", ["imagemin", "sass", "html"]);

gulp.task("html", function() {
  gulp
    .src("./src/*.html")
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream());
});

gulp.task("imagemin", function() {
  return gulp
    .src("./src/images/**/*")
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./dist/images"))
    .pipe(browserSync.stream());
});

gulp.task("sass", function() {
  return gulp
    .src("./src/sass/style.scss")
    .pipe(
      sass({
        sourceComments: true,
        outputStyle: "expanded",
        includePaths: ["node_modules"]
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer(), atImport()]))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", ["default"], function() {
  browserSync.init({
    open: false,
    server: "dist"
  });
  gulp.watch("./src/index.html", ["html"]);
  gulp.watch("./src/images/**/*", ["imagemin"]);
  gulp.watch("./src/sass/**/*", ["sass"]);
});
