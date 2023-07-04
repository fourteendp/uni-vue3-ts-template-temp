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
  extends: ["git-commit-emoji", "cz"],
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
        "🎉 init",
        "✨ feat",
        "🐞 fix",
        "📃 docs",
        "🌈 style",
        "🦄 refactor",
        "🎈 perf",
        "🧪 test",
        "🔧 build",
        "🐎 ci",
        "🐳 chore",
        "↩ revert",
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
      { emoji: "🎉", value: "init", name: "init:      初始化" },
      { emoji: "✨", value: "feat", name: "feat:      新功能" },
      { emoji: "🐞", value: "fix", name: "fix:       修复bug" },
      { emoji: "📃", value: "docs", name: "docs:      文档" },
      { emoji: "🌈", value: "style", name: "style:     代码格式" },
      { emoji: "🦄", value: "refactor", name: "refactor:  代码重构" },
      { emoji: "🎈", value: "perf", name: "perf:      性能优化" },
      { emoji: "🧪", value: "test", name: "test:      测试" },
      { emoji: "🔧", value: "build", name: "build:     打包构建" },
      { emoji: "🐎", value: "ci", name: "ci:        CI" },
      { emoji: "🐳", value: "chore", name: "chore:     其他修改" },
      { emoji: "↩", value: "revert", name: "revert:    回滚" },
    ],
    emptyScopesAlias: "empty:      不填写",
    customScopesAlias: "custom:     自定义",
  },
};
