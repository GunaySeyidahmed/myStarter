// Include gulp
var gulp = require("gulp");

// Include Our Plugins
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var watch = require('gulp-watch');
var autoprefixer = require('autoprefixer-core');
var rigger = require('gulp-rigger');
var minify = require('gulp-minify');
var minifyCSS=require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename"); //minify elediyimiz dosyanın adını değiştirmek için kullandık bunu
var concat = require('gulp-concat'); //tüm js dosyalarını birleştirip all.js diye bir js dosyasında toplamak için
var flatten = require('gulp-flatten'); //fondaki klasör altında olan fontları tek klasöre toplamak için
// var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var notify = require("gulp-notify");
const imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var rimraf = require('rimraf');

var gulpJustStarted = true;
var lastCompile = new Date();

const babel = require('gulp-babel');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');


var path = {
    build: { //Burada işlemden sonra bitmiş dosyaların nereye koyulacağını gösteriyoruz
        html: 'build/',
        js: 'build/frq-templates/assets/js/',
        vendor: 'build/frq-templates/assets/js/vendor/', //src deki vendor klasörünü buildeki vendor klasörüne eklemek için
        css: 'build/frq-templates/assets/css/main/',
        images: 'build/frq-templates/assets/img/',
        fonts: 'build/frq-templates/assets/fonts/',
        libs: 'build/frq-templates/assets/libs/' //bower ile src klasörüne yüklediğim dosyaları build klasörüne eklemek için
    },
    src: { //Burası kaynaklar
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/frq-templates/assets/js/main/**/*.js',
        vendor: 'src/frq-templates/assets/js/vendor/*.js',
        css: 'src/frq-templates/assets/css/main.scss',
        images: 'src/frq-templates/assets/img/**/*.*',
        fonts: 'src/frq-templates/assets/fonts/**/*.*',
        libs: 'src/frq-templates/assets/libs/**/'
    },
    watch: { //Burada izlemek istediğimiz dosyaları belirtiyoruz
        html: 'src/**/*.html',
        js: 'src/frq-templates/assets/js/main/*.js',
        vendor: 'src/frq-templates/assets/js/vendor/*.js',
        css: 'src/frq-templates/assets/css/**/*.scss',
        images: 'src/frq-templates/assets/img/**/*.*',
        fonts: 'src/frq-templates/assets/fonts/**/*.*',
        libs: 'src/frq-templates/assets/libs/'
    },
    clean: './build'
};

var reload = function(){
    
    return connect.reload();                   
}

// var bNotify = function(t){
//     if(!gulpJustStarted && new Date() - lastCompile < 1000) {
//         notify(t)
//         gulpJustStarted = false;
//         lastCompile = new Date()
//     }
// }

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
    .on('error', function(err) {
        console.log(err)
        this.emit('end')
    })
        .pipe(rigger()) //rigger ile dosyaları birleşdiriyoruz header footer gibi komponentleri import ediyoruz bir nevi
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload())
        /*.pipe(
            notify(function(){
                if(!gulpJustStarted) {
                    gulpJustStarted = false;
                    // lastCompile = new Date()
                    return 'HTML COMPILED'
                }
                return false
            })
        );*/
    });



gulp.task('js:build', function () {
    browserify({
        /*entries: ['./src/js/main/main.js'],*/
        entries: ['./src/frq-templates/assets/js/main/main.js','./node_modules/@material/switch/index.js'],
        debug: true
    })
    .transform(babelify)
    .on('error',gutil.log)
    .transform("babelify", {
        presets: ["es2015"], 
        plugins: ["add-module-exports","transform-es2015-modules-umd"]}
    ) 
    .bundle()
    .on('error',gutil.log)
    .pipe(source('all.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(buffer())
    .pipe(uglify()) //Сожмем наш js
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(path.build.js))

    .pipe(reload())
    .pipe(notify("JS compiled"));


    /*gulp.src(path.src.js) //burdakileri al derle
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(path.build.js)) //minify etmeden all.js dosyasını ekledik aşağıdaki noSource: true  komutunu silersek buna gerek olmayacak sanırım denemedim ama mantık olarak o kod minify olunmamışını eklemesini engelliyor
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        noSource:true //bu build altındaki js klasörüne düşen index.js yi düşürmüyor sadece min olan düşüyor 
    }))
    
    .pipe(gulp.dest(path.build.js)) //derlenmiş dosyayı buraya at
    .pipe(reload())
    .pipe(notify("JS compiled"));*/
});



gulp.task('css:build', function () {
    gulp.src(path.src.css) //Bizim main.scss seçer
        .pipe(sass({ includePaths: ['./node_modules'] }))
        .on('error', function(err) {
            console.log(err)
            this.emit('end')
        })
        .pipe(postcss([ autoprefixer({ browsers: ["> 0%", 'ie 11'] }) ]))
        .pipe(gulp.dest(path.build.css))
        .pipe(minifyCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(path.build.css)) //build deki css e atar
        .pipe(reload())
        .pipe(notify("CSS compiled"));
    });



gulp.task('image:build', function () {
    gulp.src(path.src.images) //resimleri seçer
    .on('error', function(err) {
        console.log(err)
        this.emit('end')
    })
    .pipe(imagemin({ //Сожмем их
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    }))
    .pipe(gulp.dest(path.build.images))
    .pipe(reload())
    // .pipe(notify("IMAGE compiled"));
});

gulp.task('libs:build', function () {
    gulp.src(path.src.libs) 
    .on('error', function(err) {
        console.log(err)
        this.emit('end')
    })
    .pipe(gulp.dest(path.build.libs))
    .pipe(reload())
    // .pipe(notify("LIBS compiled"));
});


gulp.task('vendor:build', function () {
    gulp.src(path.src.vendor) 
    .on('error', function(err) {
        console.log(err)
        this.emit('end')
    })
    .pipe(gulp.dest(path.build.vendor))
    .pipe(reload())
    // .pipe(notify("VENDOR compiled"));
});



gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
    .on('error', function(err) {
        console.log(err)
        this.emit('end')
    })
    .pipe(flatten())
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload())
    // .pipe(notify("FONTS compiled"));
});


gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build',
    'libs:build',
    'vendor:build'
]);


gulp.task('watch', function(){
    

    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.images], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });

    watch([path.watch.libs], function(event, cb) {
        gulp.start('libs:build');
    });

    watch([path.watch.vendor], function(event, cb) {
        gulp.start('vendor:build');
    });
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true,
    open: {browser: 'Google Chrome'}
  });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['connect', 'build', 'watch']);
