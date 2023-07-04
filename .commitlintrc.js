const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const scopes = fs
  .readdirSync(path.resolve(__dirname, "src"), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name.replace(/s$/, ""));
// precomputed scope
const scopeComplete = execSync("git status --porcelain || true")
  .toString()
  .trim()
  .split("\n")
  .find((r) => ~r.indexOf("M  src"))
  ?.replace(/(\/)/g, "%%")
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/s$/, "");

/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [(commit) => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能（feature）
        "fix", // 修补bug
        "docs", // 文档（documentation）
        "style", // 格式（不影响代码运行的变动）
        "refactor", // 重构（即不是新增功能，也不是修改bug的代码变动）
        "test", // 增加测试
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回滚
        "build", // 打包
        "ci", // CI
        "perf", // 性能优化
        "wip", // WIP
        "types", // 类型定义文件更改
        "release", // 发布
        "workflow", // 工作流
        "deps", // 依赖更新
        "mock", // mock
        "config", // 配置文件
        "merge", // 合并分支
        "init", // 初始化
      ],
    ],
  },
  prompt: {
    /** @use `yarn commit :f` */
    alias: {
      f: "docs: fix typos",
      r: "docs: update README",
      s: "style: update code format",
      b: "build: bump dependencies",
      c: "chore: update config",
    },
    customScopesAlign: !scopeComplete ? "top" : "bottom",
    defaultScope: scopeComplete,
    scopes: [...scopes, "mock"],
    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,
    useEmoji: true,
    emojiAlign: "left",

    // 中英文对照版
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围 (可选):",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述 (可选)。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更 (可选)。使用 "|" 换行 :\n',
      footerPrefixsSelect: "选择关联issue前缀 (可选):",
      customFooterPrefixs: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?",
    },
    types: [
      { value: "feat", name: "feat:      新功能" },
      { value: "fix", name: "fix:       修复bug" },
      { value: "docs", name: "docs:      文档" },
      { value: "style", name: "style:     格式" },
      { value: "refactor", name: "refactor: 重构" },
      { value: "test", name: "test:      增加测试" },
      { value: "chore", name: "chore:     构建过程或辅助工具的变动" },
      { value: "revert", name: "revert:    回滚" },
      { value: "build", name: "build:     打包" },
      { value: "ci", name: "ci:        CI" },
      { value: "perf", name: "perf:      性能优化" },
      { value: "wip", name: "wip:       WIP" },
      { value: "types", name: "types:     类型定义文件更改" },
      { value: "release", name: "release:   发布" },
      { value: "workflow", name: "workflow:  工作流" },
      { value: "deps", name: "deps:      依赖更新" },
      { value: "mock", name: "mock:      mock" },
      { value: "config", name: "config:    配置文件" },
      { value: "merge", name: "merge:     合并分支" },
      { value: "init", name: "init:      初始化" },
    ],
    emptyScopesAlias: "empty:      不填写",
    customScopesAlias: "custom:     自定义",
  },
};
