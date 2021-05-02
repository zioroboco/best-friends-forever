import { App } from "@aws-cdk/core"
import { BffStack } from "@zioroboco/bff/lib/stack"

type Options = {
  project: string
  service: string
  version: string
  taskdir: string
}

export function deploy({ project, service, version, taskdir }: Options) {
  const stackName = `${project}-bff-${service}`

  const app = new App()

  new BffStack(app, stackName, {
    stackName,
    project,
    service,
    version,
    taskdir,
  })
}
