var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");


var wonderPackage = require("wonder-package");

var bundleDTS = wonderPackage.bundleDTS;
var compileTs = wonderPackage.compileTs;
var package = wonderPackage.package;
var format = wonderPackage.format;


var config = require("./build/gulp_task/common/config");




var tsFilePaths = config.tsFilePaths;
var tsFileDir = config.tsFileDir;
var distPath = config.distPath;
var tsconfigFile = config.tsconfigFile;
var indexFileDir = config.indexFileDir;




require("./build/gulp_task/clean/clean");

require("./build/gulp_task/test/test");


var generateIndex = require("wonder-tool-generate_es2015_index").generate;
var ts = require("typescript");

gulp.task("generateIndex", function(done) {
    var rootDir = path.join(process.cwd(), "src"),
        destDir = "./src/";

    generateIndex("/", rootDir, ["*.ts", "**/*.ts"], destDir, {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.System
    });

    done();
});

gulp.task("compileTsES2015", function(done) {
    compileTs.compileTsES2015(path.join(process.cwd(), tsconfigFile), {
        sourceDir: tsFileDir,
        cwd:"/",
        targetDir:path.join(distPath, "./es2015/")
    }, done);
});

gulp.task("compileTsCommonjs", function(done) {
    compileTs.compileTsCommonjs(path.join(process.cwd(), tsconfigFile), {
        sourceDir: tsFileDir,
        cwd:"/",
        targetDir:path.join(distPath, "./commonjs/")
    }, done);
});

gulp.task("generateDTS", function(done) {
    var indexDTSPath = path.join(indexFileDir, "index.d.ts");

    bundleDTS.generateES2015DTS(indexDTSPath, "wonder.js/dist/es2015", path.join(distPath, "wd.es2015.d.ts"));
    bundleDTS.generateCommonjsDTS(indexDTSPath, "wonder.js/dist/commonjs", path.join(distPath, "wd.commonjs.d.ts"));

    done();
});

gulp.task("rollup", function(done) {
    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});

gulp.task("formatTs", function(done) {
    format.formatTs(tsFilePaths, "/", done);
});



gulp.task("build", gulpSync.sync(["clean","generateIndex",/* "compileTsES2015", */"compileTsCommonjs", "rollup", "formatTs"]));



gulp.task("watch", function(){
    var totalPaths = tsFilePaths;

    gulp.watch(totalPaths, gulpSync.sync(["compileTsCommonjs", "rollup"]));
});
