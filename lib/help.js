"use strict"

const chalk = require("chalk")

module.exports = function* () {
  const help = [
    "",
    "fie-toolkit-ops 插件使用帮助:",
    // ' $ fie xxx                 xxx',
    "",
    ""
  ].join("\r\n")

  process.stdout.write(chalk.magenta(help))
}
