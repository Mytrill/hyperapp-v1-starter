const { context, src, task } = require("fuse-box/sparky")
const {
  FuseBox,
  WebIndexPlugin,
  SassPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  ReplacePlugin,
  QuantumPlugin
} = require("fuse-box")

/** Tasks */
task("default", context => {
  context.clean().then(context.serve)
})

task("dev", context => {
  context.clean().then(context.dev)
})

task("prod", context => {
  context.clean().then(context.prod)
})

/** Set Config */
function initFusebox(configFile, isProduction) {
  const valuesToReplace = require(`./config/${configFile}.js`)
  return FuseBox.init({
    homeDir: "src/",
    output: "public/$name.js",
    target: "browser@es5",
    plugins: [
      WebIndexPlugin({
        template: "src/index.html"
      }),
      [
        SassPlugin(),
        CSSResourcePlugin({
          dist: "public/css-resources"
        }),
        CSSPlugin()
      ],
      ReplacePlugin(valuesToReplace),
      isProduction &&
        QuantumPlugin({
          uglify: true,
          treeshake: true,
          bakeApiIntoBundle: "app"
        })
    ],
    alias: {
      components: "~/components",
      lib: "~/lib"
    }
  })
}

/** Context */
context(
  class {
    /** clean dist directory */
    clean() {
      return src("public")
        .clean("public/")
        .clean(".fusebox/")
        .exec()
    }

    /** build, watch and serve */
    serve() {
      const fuse = initFusebox("dev", false)
      fuse.dev({ open: true })
      fuse
        .bundle("app")
        .watch()
        .hmr()
        .instructions(" > index.tsx")
      return fuse.run()
    }

    /** dev build */
    dev() {
      const fuse = initFusebox("dev", true)
      fuse.bundle("app").instructions(" > index.tsx")
      return fuse.run()
    }

    /** prod build  */
    prod() {
      const fuse = initFusebox("prod", true)
      fuse.bundle("app").instructions(" > index.tsx")
      return fuse.run()
    }
  }
)
