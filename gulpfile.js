const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const server = require("browser-sync").create();
const reload = server.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const gulpConfig = require("./gulp.config");
const gulpif = require("gulp-if");

const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require("./gulp.config");

sass.compiler = require("node-sass");

const env = process.env.NODE_ENV;

task("clean", () => {
  console.log(env);
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy", () => {
  return src(`${SRC_PATH}/sass/**/*.scss`).pipe(dest(DIST_PATH));
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("copy:images", () => {
  return src(`${SRC_PATH}/images/**/*`)
    .pipe(dest(`${DIST_PATH}/images`))
    .pipe(reload({ stream: true }));
});

task("copy:media", () => {
  return src(`${SRC_PATH}/media/**/*`)
    .pipe(dest(`${DIST_PATH}/media`))
    .pipe(reload({ stream: true }));
});

task("sass", () => {
  return src([...STYLE_LIBS, `${SRC_PATH}/sass/main.scss`])
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(env === "prod", gcmq()))
    .pipe(
      gulpif(
        env === "prod",
        autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false,
        })
      )
    )
    .pipe(gulpif(env === "prod", cleanCss()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("scripts", () => {
  return src([...JS_LIBS, `${SRC_PATH}/js/**/*.js`])
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.js"))
    .pipe(
      gulpif(
        env === "prod",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif(env === "prod", uglify()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

// task("icons", () => {
//   return src(`${SRC_PATH}/images/icons/*.svg`)
//     .pipe(
//       svgo({
//         plugins: [
//           { removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)" } },
//         ],
//       })
//     )
//     .pipe(svgSprite({ mode: { symbol: { sprite: "../sprite.svg" } } }))
//     .pipe(dest(`${DIST_PATH}/images/icons`));
// });

task("server", () => {
  server.init({
    server: {
      baseDir: DIST_PATH,
    },
    open: false,
  });
});

task("watch", () => {
  watch(`${SRC_PATH}/sass/**/*.scss`, series("sass"));
  watch(`${SRC_PATH}/*.html`, series("copy:html"));
  watch(`${SRC_PATH}/js/**/*.js`, series("scripts"));
  watch(`${SRC_PATH}/images/**/*`, series("copy:images"));
});

task(
  "default",
  series(
    "clean",
    parallel("copy:html","copy:images","copy:media", "sass", "scripts"),
    parallel("watch", "server")
  )
);
task(
  "build",
  series("clean", parallel("copy:html", "copy:images", "copy:media", "sass", "scripts"))
);
