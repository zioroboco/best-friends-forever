import { Command, Option } from "clipanion"
import { build } from "@zioroboco/bff"

export class BuildCommand extends Command {
  static paths = [["build"]]

  static usage = {
    description: "Compile and bundle a BFF handler.",
  }

  handler = Option.String()
  taskdir = Option.String()

  async execute() {
    build({
      handler: this.handler,
      taskdir: this.taskdir,
    })
  }
}
