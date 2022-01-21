const {series,dest,watch,src} = require('gulp');
const sass = require('gulp-sass') (require('sass'));
const notify = require('gulp-notify');


///CSS
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');


////JS
const terjerjs = require('gulp-terser-js');
const concat = require('gulp-concat');
const rename = require('gulp-rename');


const  css = (end)=>{    
    return src('./app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(),cssnano() ]))
    .pipe(sourcemaps.write('.'))
     .pipe(dest('./public/css'))
     .pipe(notify({message: 'actualizando el css'}))
}

const js = (end)=>{
    return src('./app/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat(
        'build.js'
    ))
    .pipe(terjerjs())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('./public/js'))
    .pipe(notify({message: 'actualizando js'}))
}




const actualizar = ()=>{
    watch('./app/scss/**/*.scss',css)
    watch('./app/js/**/*.js',js)
}



exports.default = actualizar;
