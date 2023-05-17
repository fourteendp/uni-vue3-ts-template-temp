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
        "init首次提交",
        "feat新功能",
        "fix修复bug",
        "docs文档更新",
        "style代码格式",
        "perf性能优化",
        "test测试相关",
        "build构建相关",
        "refactor重构代码",
        "chore其它或删除",
        "merge分支合并",
        "release版本发布",
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
      { emoji: "🎉", value: "init首次提交", name: "🎉init:        首次提交" },
      { emoji: "✨", value: "feat新功能", name: "✨feat:        新功能" },
      { emoji: "🐞", value: "fix修复bug", name: "🐞fix:         修复bug" },
      { emoji: "📃", value: "docs文档更新", name: "📃docs:        文档更新" },
      { emoji: "🎨", value: "style代码格式", name: "🎨style:       代码格式" },
      { emoji: "🚀", value: "perf性能优化", name: "🚀perf:        性能优化" },
      { emoji: "🚨", value: "test测试相关", name: "🚨test:        测试相关" },
      { emoji: "🔧", value: "build构建相关", name: "🔧build:       构建相关" },
      { emoji: "🔨", value: "refactor重构代码", name: "🔨refactor:    重构代码" },
      { emoji: "🔥", value: "chore其它或删除", name: "🔥chore:       其它或删除" },
      { emoji: "🔀", value: "merge分支合并", name: "🔀merge:       分支合并" },
      { emoji: "🔖", value: "release版本发布", name: "🔖release:     版本发布" },
    ],
    emptyScopesAlias: "empty:      不填写",
    customScopesAlias: "custom:     自定义",
  },
};
