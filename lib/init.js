"use strict"

const path = require("path")
const chalk = require("chalk")
const _ = require("underscore")
const inquirer = require("inquirer")
const spawn = require("cross-spawn")

const utils = require("./utils")

const cwd = utils.getCwd()

module.exports = function* (fie) {
  const projectName = cwd.split(path.sep).pop()

  const config = fie.getModuleConfig()
  const generateNames = utils.generateNames(projectName)

  fie.dirCopy({
    src: utils.getTemplateDir("root"),
    dist: cwd,
    data: _.extend({}, config, generateNames, {
      projectName
    }),
    ignore: [
      "node_modules", "build", ".DS_Store", ".idea"
    ],
    sstrRpelace: [
      {
        str: "developing-project-name",
        replacer: projectName
      }
    ],
    filenameTransformer(name) {
      const mapping = {
        _gitignore: ".gitignore",
        _editorconfig: ".editorconfig",
        _eslintignore: ".eslintignore",
        _eslintrc: ".eslintrc",
        "_package.json": "package.json"
      }

      return mapping[name] || name
    }
  })

  fie.logInfo("开始安装 dependencies 依赖包 ... ")
  yield fie.cnpmInstall()


  const answer = yield inquirer.prompt([
    {
      type: "confirm",
      name: "git",
      message: chalk.green("是否创建远程仓库并初始化日常分支？"),
      default: true
    }
  ])

  if (answer.git) {
    spawn.sync("fie", ["git", "create", "-m"], {
      cwd,
      env: process.env,
      stdio: "inherit"
    })
  }

  console.log(chalk.yellow("\n--------------------初始化成功,请按下面提示进行操作--------------------\n"))
  console.log(chalk.green(`${chalk.yellow("$ fie start")}               # 可一键开启项目开发环境`))
  console.log(chalk.green(`${chalk.yellow("$ fie build")}               # 构建本地代码`))
  console.log(chalk.green(`${chalk.yellow("$ fie help")}                # 可查看当前套件的详细帮助`))
}
