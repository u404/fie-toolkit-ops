"use strict"

const fs = require("fs")
const path = require("path")

const cwd = process.cwd()
const spawn = require("cross-spawn")

module.exports = function* (fie) {
  if (!fs.existsSync(path.resolve(cwd, "node_modules"))) {
    fie.logInfo("检测到当前项目中没有 node_modules 目录，开始自动安装相关依赖...")
    yield fie.cnpmInstall(() => {
      init()
    })
  } else {
    init()
  }

  function init() {
    spawn.sync("node_modules/@sc/ops-cli/bin/ops.js", ["debug"], {
      cwd,
      env: process.env,
      stdio: "inherit"
    })
  }
}
