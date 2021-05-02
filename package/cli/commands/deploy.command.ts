import { Command, Option, UsageError } from "clipanion"
import { deploy } from "@zioroboco/bff/lib/deploy"

export class DeployCommand extends Command {
  static paths = [["deploy"]]

  static usage = {
    description: "Deploy a bundled BFF version.",
  }

  taskdir = Option.String()
  project = Option.String("--project")
  service = Option.String("--service")
  version = Option.String("--version")

  async execute() {
    let { BFF_PROJECT, BFF_SERVICE, BFF_VERSION } = process.env

    this.project = this.project ?? BFF_PROJECT
    this.service = this.service ?? BFF_SERVICE
    this.version = this.version ?? BFF_VERSION

    if (!this.project || !this.service || !this.version) {
      throw new UsageError(
        `Required BFF configuration was missing:
          BFF_PROJECT: ${this.project}
          BFF_SERVICE: ${this.service}
          BFF_VERSION: ${this.version}`
      )
    }

    deploy({
      taskdir: this.taskdir,
      project: this.project,
      service: this.service,
      version: this.version,
    })
  }
}
