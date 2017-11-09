var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

gulp.task("sass", function() {
    return gulp.src("style.scss")
        .pipe(sass())
        .pipe(gulp.dest(""))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("browserSync", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task("watch", ["browserSync", "sass"], function() {
    gulp.watch("*.html",browserSync.reload);
    gulp.watch("*.js", browserSync.reload);
    gulp.watch("*.scss", ["sass"]);
});
