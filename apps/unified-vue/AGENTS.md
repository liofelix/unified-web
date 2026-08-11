# unified-vue 项目规则

本文件补充仓库根级 `AGENTS.md`，只适用于 `apps/unified-vue`。根级公共规则仍然有效；这里仅记录 Vue 项目实际使用的技术栈、目录约定和应用级命令。

## 技术栈与文档

- Vue 3 使用 `<script setup lang="ts">` 编写单文件组件。
- 使用 TypeScript 7、Vite+、Vue Router、Pinia、Vue I18n、Antdv Next、Tailwind CSS 4、Sass 和 VueUse。
- 使用 Antdv Next 前先查 [Antdv Next 文档](https://antdv-next.com/llms-full.txt)；组件、类型和静态方法优先从 `antdv-next` 根包导入。
- Vite+ 文档位于仓库 `node_modules/vite-plus/docs`，也可参考 [Vite+ 官方文档](https://viteplus.dev/guide/)。
- 使用其他库前先确认本项目 `package.json` 中已有依赖和对应官方文档，不要擅自引入同类替代方案。

## 目录与模块职责

- 公共组件放在 `src/components`，组件文件名使用多单词 PascalCase。
- 页面放在 `src/pages/<module>/index.vue`，页面私有组件放在对应页面目录的 `components` 子目录。
- 布局放在 `src/layouts`，按布局语义命名。
- Pinia 按业务模块放在 `src/stores/<module>/index.ts`，实例和插件放在 `src/stores/index.ts`。
- 国际化资源放在 `src/locales/messages`，类型和初始化逻辑放在 `src/locales`。
- 常量、工具、组合式函数、指令分别放在 `src/constants`、`src/utils`、`src/hooks`、`src/directives`。
- 静态资源放在 `src/assets`，按 `icons`、`images`、`styles`、`fonts` 分类；全局样式放在 `src/assets/styles`。
- 模块私有类型就近放在 `types.ts`；跨模块复用类型放在 `src/types`。
- API 请求模块统一放在 `src/api`；API 接口函数使用具名 `export function` 导出，不使用 `export const xxx = () => {}`。
- 新增公共能力前先检查现有 `components`、`constants`、`utils`、`hooks`、`directives`、`stores` 和请求封装，避免重复实现。
- 文件夹使用小写 kebab-case；组件文件使用多单词 PascalCase。

## Vue 组件与组合式函数

- Vue 组件使用多单词 PascalCase；模板中的组件统一使用小写 kebab-case，例如 `<app-locale-switcher>`，不使用 PascalCase 标签。
- SFC 的本地方法、事件处理和异步函数优先使用 `const xxx = () => {}`。
- 项目自定义组合式函数统一使用 `useAppXxx` 命名；文件名必须与主导出函数一致，例如 `useAppConfig.ts`、`useAppTable.ts`、`useAppECharts.ts`。
- 与组合式函数名称直接对应的 Options 类型同步使用 `UseAppXxxOptions` 命名，例如 `UseAppEChartsOptions`。
- Pinia store 按业务模块拆分；组件中优先通过 store 暴露的状态和行为访问全局状态，不重复维护同一份全局数据。
- 路由页面和页面私有组件遵循 `src/pages/<module>` 目录约定，跨页面复用的组件才放入 `src/components`。

## 应用配置与国际化

- `APP_CONFIG` 属性统一使用 camelCase，并以 `app` 为前缀，例如 `appTitle`、`appLocale`、`appSystemApi`。
- 运行时配置位于 `public/config/app.config.js`，由 `index.html` 在应用入口脚本之前加载并注入 `window.APP_CONFIG`。
- 业务代码通过 `src/hooks/useAppConfig.ts` 统一读取运行时配置，不在页面中重复读取 `window.APP_CONFIG`。
- 新增用户可见文案时同步维护 `src/locales/messages` 中的语言资源和对应类型；不要在模板中散落无法国际化的业务文案。

## Antdv Next 使用

- 使用组件前先查 Antdv Next 文档和当前版本类型定义。
- 组件、类型和静态方法优先从 `antdv-next` 根包导入。
- 模板组件使用小写 kebab-case，例如 `<a-button>`。
- 组件库默认行为不能满足需求时，先确认是否已有项目封装或全局配置，再添加局部覆盖。

## Vue SFC 样式

- 遵循根级 `AGENTS.md` 的 BEM 规范，SFC 样式以表达业务语义的 block 为根。
- 在 SCSS 中使用 `&__element` 和 `&--modifier` 组织 BEM 结构；交互状态使用 `is-active`、`is-disabled`、`has-error` 等状态类。
- 状态类、伪类和 Antdv Next 等第三方样式覆盖收敛在所属 block 内，避免全局、HTML 层级和跨 block 深层选择器。
- 不使用 `container`、`wrapper`、`box`、`left`、`red` 等通用或纯视觉名称作为 block。

## 开发与验证

- 安装依赖：`vp install`。
- 启动开发服务：`vp -C apps/unified-vue dev`。
- 类型检查：`vp run --filter ./apps/unified-vue type-check`。
- 类型检查并构建：`vp run --filter ./apps/unified-vue build`。
- 仅构建产物：`vp run --filter ./apps/unified-vue build-only`。
- 格式化源码：`vp run --filter ./apps/unified-vue format`。
- 当前项目没有已声明的测试脚本；新增测试脚本或测试文件后，再按实际脚本运行针对性测试。
- 修改运行时配置、路由、状态、组件公共接口或构建配置时，补充对应的类型检查、构建或测试；仅修改文档时至少执行 `git diff --check`。
