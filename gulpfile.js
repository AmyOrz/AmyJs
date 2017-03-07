var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task("webpack", function() {
    return gulp
        .src('./')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./build'));
});
gulp.task("scripts",function () {
   gulp.src('./build/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});
gulp.task('default', function(){
    gulp.run( 'webpack' );

    // 监听文件变化
    gulp.watch('./src/*.*', function(){
        gulp.run( 'webpack');
    });
    gulp.watch('./src/*/*.*', function(){
        gulp.run( 'webpack');
    });
});

