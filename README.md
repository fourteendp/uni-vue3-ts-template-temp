# uni-vue3-ts-template

uni-app+vue3+typescript 模板

## uniapp vue3 项目构建

创建以 javascript 开发的工程（如命令行创建失败，请直接访问  [gitee](https://gitee.com/dcloud/uni-preset-vue/repository/archive/vite.zip)  下载模板）

```
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
```

创建以 typescript 开发的工程（如命令行创建失败，请直接访问  [gitee](https://gitee.com/dcloud/uni-preset-vue/repository/archive/vite-ts.zip)  下载模板）

```
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
```

**注意**: Vue3/Vite 版要求 node 版本 `^14.18.0 || >=16.0.0`

更新到最新版本：`pnpx @dcloudio/uvm`

## 编辑器和 Git 设置

- 根目录添加`.editorconfig`
- 根目录添加`.gitattributes`

## 安装 Turborepo 管理 Monorepo

- 根目录添加 `pnpm-workspace.yaml`
- 安装`Turborepo`: `pnpm add turbo -Dw`
- 添加`turbo.json`
