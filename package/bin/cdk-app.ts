import { App } from "@aws-cdk/core"
import { BffStack } from "@zioroboco/bff/lib/stack"

const { BFF_TASKDIR, BFF_PROJECT, BFF_SERVICE, BFF_VERSION } = process.env

if (!BFF_TASKDIR || !BFF_PROJECT || !BFF_SERVICE || !BFF_VERSION) {
  throw new Error(
    `Required BFF configuration was missing:
      BFF_TASKDIR: ${BFF_TASKDIR}
      BFF_PROJECT: ${BFF_PROJECT}
      BFF_SERVICE: ${BFF_SERVICE}
      BFF_VERSION: ${BFF_VERSION}`
  )
}

const app = new App()

const stackName = `${BFF_PROJECT}-bff-${BFF_SERVICE}`

new BffStack(app, stackName, {
  stackName,
  taskdir: BFF_TASKDIR,
  project: BFF_PROJECT,
  service: BFF_SERVICE,
  version: BFF_VERSION,
})
