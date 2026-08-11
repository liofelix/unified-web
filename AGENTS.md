<!--VITE PLUS START-->

# 使用 Vite+ 统一 Web 工具链

本项目使用基于 Vite、Rolldown、Vitest、tsdown、Oxlint、Oxfmt 和 Vite Task 的 Vite+ 工具链。Vite+ 与 Vite 不同：开发和构建应优先使用 `vp dev` 与 `vp build`。使用具体命令前，可运行 `vp help` 或 `vp <command> --help` 查看说明。

## 内置命令与项目脚本

- `vp <name>` 执行 Vite+ 内置命令。
- `vp run <name>` 执行 `package.json` 脚本或 `vite.config.ts` 任务。
- 内置命令不能被 `package.json` 脚本覆盖；执行前先查看目标 workspace 的 `package.json` 和 `vite.config.ts`。
- monorepo 中使用 `vp -C apps/<app> <command>` 或 `vp run --filter ./apps/<app> <script>` 精确定位应用，避免把应用级命令误当成根级命令。

## 规则作用域与项目分流

- 本文件是所有 workspace 共享的基础规则，适用于 `apps/`、`packages/` 和 `tools/` 下的项目。
- 应用目录下更近的 `AGENTS.md` 可以补充该项目的技术栈、目录结构、框架约定和验证命令；公共规则不重复抄写，也不能被无依据地改写。
- 开始任务前，先确认当前工作目录、分支、工作区状态，并读取目标项目最近的 `package.json`、构建配置和项目级 `AGENTS.md`。
- 通过项目配置和实际源码确认技术栈后，才应用对应的框架规则。Vue 项目规则不得套用到 React 项目；React 项目规则也不得套用到 Vue 项目。
- 未来新增 React 应用时，必须在对应的 `apps/<react-app>/AGENTS.md` 中记录 React 版本、TSX/JSX、组件、Hooks、路由、状态管理、UI 库和项目专属验证方式；根文件不预设当前不存在的 React 依赖或目录。
- 当前项目只维护已有应用的项目级规则；不要为尚未确认的技术栈虚构依赖、目录或命令。

## 角色与基本原则

- 以资深前端工程师标准工作：先读现有实现，再做最小、可维护、可验证的修改。
- 结论必须有仓库代码、配置或文档依据；无法确认时明确说明“不知道”。
- 优先复用已有依赖和公共能力；涉及公共接口、共享基础设施或用户行为时，补充匹配风险的测试。
- 修改前检查工作区，保留用户已有的 staged、unstaged 和未跟踪改动；不要覆盖、还原或清理无关文件。
- 不执行超出用户授权范围的删除、重命名、依赖升级、提交、推送或外部系统操作。

## 文档、浏览器能力与兼容性

- 使用或新增 CSS 属性、HTML 属性、JavaScript 语法、Web API、DOM/Event API 等浏览器相关能力前，必须优先调用已配置的 MDN MCP 获取依据：先使用 `mcp__mdn__search` 搜索特性名称，再使用返回的 `path` 调用 `mcp__mdn__get_doc` 获取语法、参数、取值和限制；需要确认浏览器支持情况时，使用返回的 `compat-key` 调用 `mcp__mdn__get_compat`。不得凭记忆、生成内容或自行猜测 `compat-key`。
- 以 [MDN Web Docs](https://developer.mozilla.org/zh-CN/) 及 MDN MCP 返回的内容为准，并在实现说明或代码评审结论中保留对应 MDN 链接，简要说明语法依据和目标浏览器支持情况。
- 优先依据仓库已声明的目标浏览器和版本验证兼容性。当前仓库未发现显式的目标浏览器版本配置；遇到兼容性敏感能力时，必须先确认目标浏览器范围，不得擅自假定。
- 对不支持、部分支持、实验性或需要浏览器前缀的能力，必须提供可接受的降级方案、替代实现或明确说明影响。
- 使用组件库、路由、状态管理、请求库或其他第三方能力前，先查当前项目已声明的依赖和对应官方文档；不要仅凭记忆猜测 API。

## JavaScript 与 TypeScript

- 优先使用显式类型、类型守卫、泛型和工具类型完成类型收窄；避免无必要的类型断言和 `any`。
- 类型定义遵循就近原则：模块私有类型就近放置，跨模块复用类型统一放到项目约定的共享类型目录。
- 导出的公共函数和类型应保持稳定、清晰的命名；修改公共接口时同步检查调用方、类型和测试。
- API 请求模块应沿用目标项目已有的目录、请求封装、错误处理和导出约定，不在根规则中强制某一种框架目录结构。
- 使用异步请求时，沿着事件、请求、成功和异常处理链路定位问题；不要因为成功请求后出现的 UI 错误而重复修改接口调用。

## CSS 与 BEM

- 所有前端项目统一使用语义化 BEM 命名：`block__element--modifier`，三部分均使用小写 kebab-case。
- `block` 必须表达业务语义；避免使用 `container`、`wrapper`、`box`、`left`、`red` 等通用或纯视觉名称。
- `element` 必须归属于 `block`；禁止 `block__element__child`，层级过深时扁平化或拆成新的业务 block。
- `modifier` 不单独使用；交互状态使用 `is-active`、`is-disabled`、`has-error` 等状态类。
- class 名保持简短清晰，通常不超过 block、element、modifier 三段；避免重复上下文、颜色、像素值、DOM 标签和实现细节。
- 组件样式、状态类、伪类和第三方覆盖应收敛在所属业务 block 内，避免无范围的全局选择器、HTML 层级选择器和跨组件深层选择器。
- Vue SFC、React JSX/TSX 或其他框架的样式语法由项目级 `AGENTS.md` 补充；BEM 命名和业务语义规则保持一致。

## 工具链、依赖与验证

- 只使用已有依赖；依赖缺失或 `package.json`/`pnpm-lock.yaml` 发生变化时运行 `vp install`。
- 禁止创建、配置或使用项目内 `.pnpm-store`；依赖必须安装到项目的 `node_modules` 目录。
- 提交前按目标项目的脚本运行 `vp check`；只有存在测试脚本或测试变更时才运行 `vp test` 或对应的 `vp run <script>`。
- 发布或构建链路变更时运行目标项目的构建命令；普通文档、样式或局部逻辑修改不因规则要求而盲目运行全仓库构建。
- 检查是否存在 `vite.config.ts` 任务或 `package.json` 脚本，并使用 `vp run <script>` 执行；不要假设根目录和应用目录脚本相同。
- 在 monorepo 中，跨 workspace 验证使用仓库实际定义的 `vp run -r <script>`；命令失败时区分代码问题、基线问题和工具链/沙箱问题。
- 安装、运行时或包管理异常时运行 `vp env doctor`，并在求助或交付说明中提供相关输出。
- 文档和配置修改至少执行 `git diff --check`，并检查变更是否只覆盖用户授权的文件。

## 目录与变更边界

- 目录、文件名和模块职责以目标项目级 `AGENTS.md` 及现有源码为准；根规则不规定 Vue 或 React 专属的 `pages`、`stores`、`hooks`、SFC 等目录。
- 新增公共能力前先检查目标项目已有的组件、常量、工具、hooks、指令、stores、请求封装和共享包，避免重复实现。
- 新增文件夹使用小写 kebab-case；组件文件名和其他命名遵循目标框架及项目级规则。
- 修改完成后复查 `git diff`、`git status` 和必要的针对性检查；不要把验证通过误认为用户已经接受功能，也不要声称未执行的手工验证已经完成。

<!--VITE PLUS END-->
