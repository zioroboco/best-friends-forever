import * as esbuild from "esbuild"
import { resolve } from "path"

type Options = {
  /**
   * Path to the module defining the BFF handler function. This module must
   * export a function `handler`, which is called when the BFF is invoked.
   */
  handler: string
  /** Output directory for the bundled BFF handler. */
  taskdir: string
}

/** Compile the passed BFF handler function into `taskdir`. */
export async function build(options: Options) {
  return esbuild.build({
    entryPoints: [options.handler],
    outfile: resolve(options.taskdir, "index.js"),
    bundle: true,
    sourcemap: "external",
    platform: "node",
    target: "node14",
  })
}
