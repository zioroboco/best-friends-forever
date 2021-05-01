#!/usr/bin/env node

process.env["TS_NODE_TRANSPILE_ONLY"] = true

require("ts-node").register({
  project: require.resolve("@zioroboco/bff/tsconfig.json"),
  ignore: [],
})

require("../cli/main")
