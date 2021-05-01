import { Builtins, Cli, Command, Option } from "clipanion"
import { version } from "../package.json"
import commands from "./commands"

const [node, binary, ...args] = process.argv

const cli = new Cli({
  binaryLabel: "bff",
  binaryName: "bff",
  binaryVersion: version,
})

commands.forEach(c => cli.register(c))

cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)
cli.runExit(args, Cli.defaultContext)
