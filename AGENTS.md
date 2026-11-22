# My HyperFrames

本目录是一个 [HyperFrames](https://hyperframes.heygen.com) 多视频项目工作区：根目录提供共享的依赖与 Skills，具体的视频项目均独立存放在 `videos/<video-name>/` 目录下，由 HTML、CSS 和可寻帧动画（默认使用 GSAP）构成，可通过 `npx hyperframes` CLI 在浏览器中预览并渲染为 MP4。

## Skills —— 请先阅读

**编写或修改合成文件前，请先调用对应的 skill。** Skill 封装了框架特有的规范（例如 `window.__timelines` 注册、`data-*` 属性语义、兼容着色器的 CSS 规则），这些内容通用 Web 文档不会涵盖，未遵循时会导致合成出错。

**进行任何 HyperFrames 相关操作？** 请从 `/hyperframes` 开始。只需提出需求即可制作任意视频；`/hyperframes` skill 包含渲染契约与各类参考资料（不同影片类型、叙事、动效、视觉风格、音频、审阅、字幕、叠加层）。请先阅读它，尤其是在缺少项目上下文时。

- `/hyperframes` — 制作、编辑、制作动画或渲染任何视频、动态图形、字幕或叠加层时最先阅读。包含渲染契约和工作循环。
- `/hyperframes-cli` — 按任务组织的 CLI 指南：初始化脚手架、检查、查看帧画面、编辑时间线、预览、渲染、发布及项目历史。
- `/hyperframes-registry` — 可直接以可编辑源码形式安装的现成模块与组件。在手写任何常见视觉效果之前，请先搜索它。
- `/media-use` — 获取或制作任意媒体素材（音乐、音效、图像、旁白、字幕转录、抠图、调色），并混合已放置的音频。
- `/use-azure-tts` — 使用Azure TTS服务生成语音。
- `/use-gemini-api-cli` — 使用Gemini API合成音乐或者图像素材。


**需要调整实拍素材或图片的外观与呈现方式？** 编辑前请先加载 `/media-use` 并阅读其 `references/media-treatments.md`——即使需求只是说画面太暗、太平淡、无聊、要复古风、需要隐私遮挡或“让出场更酷”。它规范的是素材处理方式，而非限制是否能使用媒体。请使用规范的媒体处理方式与可寻帧安全动效，不要自行拼凑等效的 CSS/SVG 滤镜或叠加层。

## 项目结构与新建视频规范

- **工作区根目录**：仅维护共享依赖（`package.json`、`node_modules`）、全局规范（`AGENTS.md`）与 AI Skills（`.agents/skills/`），**严禁在根目录下直接存放任何视频文件、中间文档或临时脚本**。
- **`videos/<video-name>/`**：每个视频都是完全独立的自包含目录，内部结构如下：
  - `index.html` — 主合成文件（根时间线）
  - `hyperframes.json` — 项目级配置
  - `compositions/` — 通过 `data-composition-src` 引用的子合成文件目录
  - `assets/` — 该视频最终使用的音视频、图片、字体素材目录
  - `renders/` — 渲染输出的 MP4 文件目录
  - `STORY.md` / `SPEC.md` / `REVIEW.md` / `transcript.json` — 视频制作流程中生成的所有叙事方案、分镜规范、审阅报告、字幕转录等中间文档，**必须存放在对应视频的 `videos/<video-name>/` 子目录下**（大小写依具体流程如 `story.md`、`SPEC.md` 等），不得放在根目录。
  - `scratch/` — **临时脚本与临时素材目录**（`videos/<video-name>/scratch/`）：制作过程中编写的任何辅助脚本（如 `.mjs`、`.js`、`.py`）以及生成的临时图片、测试音频、中间转换文件等，必须统一放在该视频子路径下的 `scratch/` 目录中。
- **临时 Python 脚本规范（Inline Metadata + `uv`）**：
  - 存放在 `videos/<video-name>/scratch/` 下的 Python 脚本，**必须**采用 PEP 723 内联元数据（Inline Script Metadata）写法声明第三方依赖，并统一使用 `uv run` 执行以自动解析依赖，**严禁执行 `pip install` 污染全局环境**：
    ```python
    # /// script
    # requires-python = ">=3.11"
    # dependencies = [
    #   "pillow",
    #   "numpy",
    # ]
    # ///
    ```
  - 执行命令：`uv run videos/<video-name>/scratch/<script_name>.py`
- **初始化新视频项目**：
  - `videos/hello-world/` 是标准基础模板目录。
  - 新建视频时，直接将 `videos/hello-world/` 下的 `index.html` 和 `hyperframes.json` 复制到 `videos/<new-video-name>/` 即可（**注意不要复制 `.hyperframes/`、`.thumbnails/`、`scratch/` 或 `renders/` 等运行产物**），无需运行 `npx hyperframes init`，避免生成多余的子目录 `package.json` 或 `AGENTS.md`。

## 常用命令（所有命令均必须显式指定 `videos/<video-name>` 项目路径）

> **强制规范**：执行任何 `npx hyperframes` 命令时，凡是支持项目路径参数的命令（无论是位置参数、`--dir` 还是 `--project`），**都必须显式传入 `videos/<video-name>`**，严禁省略路径参数导致在工作区根目录下误生成文件或读取错误目录。

```bash
# 1. 位置参数指定项目目录的命令
npx hyperframes check videos/<video-name>                       # lint + 运行时 + 布局 + 动效 + 对比度（一键完整检查）
npx hyperframes snapshot videos/<video-name> --at 1,3,5         # 截取指定秒数的 PNG 帧，用于查看与核验画面
npx hyperframes preview videos/<video-name>                     # 启动 Studio 预览（默认由用户自行执行，Agent 不要主动运行）
npx hyperframes render videos/<video-name>                      # 渲染为 MP4（用户预览确认无误后提示用户执行）
npx hyperframes timeline videos/<video-name> --json             # 查看项目时间线与轨道结构

# 2. 通过 --dir 指定项目目录的命令（位置参数已被组件名、输入文件或子命令占用）
npx hyperframes add <item-name> --dir videos/<video-name>       # 从 Registry 安装模块/组件到指定视频目录
npx hyperframes transcribe <input> --dir videos/<video-name>    # 语音转录并将 transcript.json 输出到指定视频目录
npx hyperframes timeline <subcmd> ... --dir videos/<video-name> # 时间线编辑子命令（move/trim/split/set/apply/undo/ids 等）
npx hyperframes history ... --dir videos/<video-name>           # 项目历史记录操作
npx hyperframes audio ... --dir videos/<video-name>             # 音频分析与查询

# 3. 通过 --project 指定项目目录的命令
npx hyperframes media-treatment ... --project videos/<video-name> # 对指定视频项目内的素材应用调色/特效处理
npx hyperframes media-use ... --project videos/<video-name>       # 获取或导入媒体素材到指定视频项目

# 4. 全局文档查询（不涉及具体项目目录）
npx hyperframes docs <topic>                                    # 在终端查看参考文档
```

## 文档

**快速查阅**，可使用本地 CLI 文档命令（无需联网）：

```bash
npx hyperframes docs <topic>
```

可选主题：`data-attributes`、`gsap`、`compositions`、`rendering`、`examples`、`troubleshooting`

**完整文档**，请通过机器可读索引发现页面——**不要**猜测 URL：

```
https://hyperframes.heygen.com/llms.txt
```

## 检查、预览与渲染工作流 —— 务必严格遵循

1. **Agent 自检（`check`）**：
   创建或编辑 `videos/<video-name>/` 下的任意 `.html` 合成文件后，**务必**先运行完整检查（已包含 `lint`、运行时、布局、动效与对比度检查，无需单独运行 `lint`）：
   ```bash
   npx hyperframes check videos/<video-name>
   ```
   向用户交付结果前请修复所有错误（error），并复核所有警告（warning）。

2. **Agent 画面核验（`snapshot`）**：
   `check` 通过后，在改动对应的时间点运行 `npx hyperframes snapshot videos/<video-name> --at <seconds>`（或 `--range START,END`、`--composition <id>`），**并实际读取查看生成的 PNG 帧图像**，确认视觉排版与动画状态符合预期。

3. **提示用户预览（`preview` —— 默认不要由 Agent 自己执行）**：
   确认 `check` 与 `snapshot` 均无问题后，**默认不要由 Agent 自行启动 `preview` 服务**，而是在回复中给出具体的预览命令，提示用户在终端执行预览：
   ```bash
   npx hyperframes preview videos/<video-name>
   ```

4. **提示用户渲染（`render`）**：
   当用户预览后确认没有问题时，告诉用户具体的渲染命令进行最终 MP4 渲染（除非用户明确要求 Agent 代为执行渲染）：
   ```bash
   npx hyperframes render videos/<video-name>
   ```

## 核心规则

1. 每个带时间属性的元素都需要 `data-start` 和时长（duration）。`data-start` 用于标记该元素受时间轴控制；`data-track-index` 仅为可选的 Studio 显示轨道，渲染器不会读取它。
2. 为带时间属性的视觉元素添加 `class="clip"`。框架依据 `data-start` 而非该 class 控制可见性，但共享的 `.clip` CSS 为场景提供全画幅容器框，缺少时 `lint` 会发出警告。
3. 每个合成文件都必须在 `window.__timelines` 上注册一个初始暂停的根时间线：
   ```js
   window.__timelines = window.__timelines || {};
   window.__timelines["composition-id"] = gsap.timeline({ paused: true });
   ```
   手动添加到此根时间线中的场景子时间线**不能**设置为 `paused`。处于暂停状态的子时间线在根时间线寻帧时不会推进。运行时只会激活已注册的同级合成时间线，而不会自动激活任意嵌套的场景时间线。
4. 带声音的视频应保留在 `<video>` 元素上（设置 `data-has-audio="true"`，不加 `muted`）。音乐、旁白、替换音轨、J/L 剪辑或在 Studio 中分离出来的音频请使用独立的 `<audio>` 元素。无声素材与 B-roll 请设置 `muted`。
5. 子合成通过 `data-composition-src="compositions/file.html"` 引用其他 HTML 文件。
6. 仅使用确定性逻辑——禁止使用 `Date.now()`、`Math.random()` 或网络请求。
