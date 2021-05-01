import { App } from "@aws-cdk/core"
import { BffStack } from "@zioroboco/bff/lib/stack"
import { Command, Option } from "clipanion"

export class DeployCommand extends Command {
  static paths = [["deploy"]]

  static usage = {
    description: "Deploy a bundled BFF version.",
  }

  name = Option.String()
  version = Option.String()
  taskdir = Option.String()

  async execute() {
    let { BFF_PROJECT, BFF_NAME, BFF_VERSION } = process.env

    if (!BFF_PROJECT || !BFF_NAME || !BFF_VERSION) {
      throw new Error(
        `Required BFF environment variables were missing:\n` +
          `\tBFF_PROJECT: ${BFF_PROJECT}` +
          `\tBFF_NAME: ${BFF_NAME}` +
          `\tBFF_VERSION: ${BFF_VERSION}`
      )
    }

    const stackName = `${BFF_PROJECT}-bff-${BFF_NAME}`

    const app = new App()

    new BffStack(app, stackName, {
      stackName,
      bffName: BFF_NAME,
      bffVersion: BFF_VERSION,
      taskdir: this.taskdir,
    })
  }
}
