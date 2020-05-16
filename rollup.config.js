import svelte from "rollup-plugin-svelte"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"

import path from "path"
import fs from "fs"

const production = !process.env.ROLLUP_WATCH

export default {
   input: "index.js",
   output: {
      sourcemap: true,
      format: "es",
      name: "app",
      dir: "public/build",
      chunkFileNames: "[name].js",
   },
   plugins: [
      {
         resolveId(id) {
            if (id === "pages") {
               return id
            }
            return null
         },
         load(id) {
            if (id === "pages") {
               let files = []
               const basePath = "src/pages"
               const addToList = (mypath, isBase = true) => {
                  const list = fs.readdirSync(path.join(__dirname, mypath))
                  const maplist = list
                     .filter(x => {
                        const stuff = fs.statSync(path.join(__dirname, mypath, x))
                        const directory = stuff.isDirectory()
                        if (directory) {
                           addToList(`${mypath}/${x}`, false)
                        }
                        return !directory
                     })
                     .map(x => {
                        const file = x.toLowerCase().split(".")
                        const relativePath = !isBase ? mypath.replace(basePath, "") : ""
                        return `'${relativePath}/${file[0]}': () => import('./${mypath + "/" + x}')`
                     })
                  files = [...files, ...maplist]
               }
               addToList(basePath)
               console.log(files)
               return `export default {\n${files.join(",\n")}\n};`
            }
            return null
         },
      },
      svelte({
         dev: !production,
         css: css => {
            css.write("public/build/bundle.css")
         },
      }),
      resolve({
         browser: true,
         dedupe: ["svelte"],
      }),
      commonjs(),
      !production && serve(),
      !production && livereload("public"),
      production && terser(),
   ],
   watch: {
      clearScreen: false,
   },
}

function serve() {
   let started = false

   return {
      writeBundle() {
         if (!started) {
            started = true

            require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
               stdio: ["ignore", "inherit", "inherit"],
               shell: true,
            })
         }
      },
   }
}
