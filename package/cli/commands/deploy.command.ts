import { Command, Option, UsageError } from "clipanion"
import { dirname, resolve } from "path"
import execa from "execa"

export class DeployCommand extends Command {
  static paths = [["deploy"]]

  static usage = {
    description: "Deploy a bundled BFF version.",
  }

  taskdir = Option.String("--taskdir")
  project = Option.String("--project")
  service = Option.String("--service")
  version = Option.String("--version")

  command = Option.String("--command", "deploy", { hidden: true })

  async execute() {
    let { BFF_TASKDIR, BFF_PROJECT, BFF_SERVICE, BFF_VERSION } = process.env

    BFF_TASKDIR = this.taskdir ?? BFF_TASKDIR
    BFF_PROJECT = this.project ?? BFF_PROJECT
    BFF_SERVICE = this.service ?? BFF_SERVICE
    BFF_VERSION = this.version ?? BFF_VERSION

    if (!BFF_TASKDIR || !BFF_PROJECT || !BFF_SERVICE || !BFF_VERSION) {
      throw new UsageError(
        `Required BFF configuration was missing:
          BFF_TASKDIR: ${BFF_TASKDIR}
          BFF_PROJECT: ${BFF_PROJECT}
          BFF_SERVICE: ${BFF_SERVICE}
          BFF_VERSION: ${BFF_VERSION}`
      )
    }

    const context = [
      "@aws-cdk/core:enableStackNameDuplicates=true",
      "@aws-cdk/core:stackRelativeExports=true",
      "aws-cdk:enableDiffNoFail=true",
    ]

    // Note to self: don't try to pass ts-node a project -- CDK blows up!
    const tsnode = resolve(dirname(require.resolve("ts-node")), "bin.js")
    const cdk = resolve(require.resolve("aws-cdk"), "../../bin/cdk")
    const app = require.resolve("@zioroboco/bff/bin/cdk-app")

    const { exitCode, failed } = execa.sync(
      cdk,
      [
        "--app",
        `'${tsnode} ${app}'`,
        this.command,
        ...context.map(entry => `--context ${entry}`),
        "--require-approval=never",
      ],
      {
        env: {
          BFF_TASKDIR,
          BFF_PROJECT,
          BFF_SERVICE,
          BFF_VERSION,
        },
        cwd: process.cwd(),
        stdio: "inherit",
      }
    )

    process.exit(failed ? exitCode ?? 1 : 0)
  }
}
