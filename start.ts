import { processNode } from "./compiler";
import fs from "fs"
import ts from "typescript"

const sourcePath = "./test.ts"

if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
  throw Error(`Source path is not a file: ${sourcePath}`)
}
const cfgFile = ts.findConfigFile(sourcePath, (fn) => fs.existsSync(fn))
if (!cfgFile) {
  throw new Error("No TS config file found")
}

const cfg = ts.readConfigFile(cfgFile, (fn) => fs.readFileSync(fn, "utf-8"))
const program = ts.createProgram([sourcePath], cfg.config)

const sourceFile = program.getSourceFile(
  sourcePath,
)!

const pn = processNode(program.getTypeChecker())
// must return void, cannot use getChildren() etc, or it wont work, no idea why!  
sourceFile.forEachChild(c => { console.log(pn(c)) })

