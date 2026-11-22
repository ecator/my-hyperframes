# My HyperFrames

本目录是一个 [HyperFrames](https://hyperframes.heygen.com) 视频项目：由 HTML、CSS 和可寻帧动画（默认使用 GSAP）构成，可通过 `hyperframes` CLI 在浏览器中预览并渲染为 MP4。

## Skills —— 请先阅读

**编写或修改合成文件前，请先调用对应的 skill。** Skill 封装了框架特有的规范（例如 `window.__timelines` 注册、`data-*` 属性语义、兼容着色器的 CSS 规则），这些内容通用 Web 文档不会涵盖，未遵循时会导致合成出错。

**进行任何 HyperFrames 相关操作？** 请从 `/hyperframes` 开始。只需提出需求即可制作任意视频；`/hyperframes` skill 包含渲染契约与各类参考资料（不同影片类型、叙事、动效、视觉风格、音频、审阅、字幕、叠加层）。请先阅读它，尤其是在缺少项目上下文时。

- `/hyperframes` — 制作、编辑、制作动画或渲染任何视频、动态图形、字幕或叠加层时最先阅读。包含渲染契约和工作循环。
- `/hyperframes-cli` — 按任务组织的 CLI 指南：初始化脚手架、检查、查看帧画面、编辑时间线、预览、渲染、发布及项目历史。
- `/hyperframes-registry` — 可直接以可编辑源码形式安装的现成模块与组件。在手写任何常见视觉效果之前，请先搜索它。
- `/media-use` — 获取或制作任意媒体素材（音乐、音效、图像、旁白、数字人与生成式视频、字幕转录、抠图、调色），并混合已放置的音频。
- `/reverse-any-video` — 将任意视频文件重构为可编辑的 HyperFrames 项目，并逐帧与原视频比对检查（HyperFrames Pro）。
- `/style-sampling` — 使用五种成熟视频风格之一，围绕指定主题制作新一集内容（HyperFrames Pro）。
- `/use-azure-tts` — 使用Azure TTS服务生成语音。
- `/use-gemini-api-cli` — 使用Gemini API合成音乐或者图像素材。


**需要调整实拍素材或图片的外观与呈现方式？** 编辑前请先加载 `/media-use` 并阅读其 `references/media-treatments.md`——即使需求只是说画面太暗、太平淡、无聊、要复古风、需要隐私遮挡或“让出场更酷”。它规范的是素材处理方式，而非限制是否能使用媒体。请使用规范的媒体处理方式与可寻帧安全动效，不要自行拼凑等效的 CSS/SVG 滤镜或叠加层。

## 常用命令

```bash
npm run dev          # 人工操作的前台预览（阻塞直至停止）
npx hyperframes preview --background  # 适用于 agent 的持久化 Studio 预览
npx hyperframes preview --status      # 验证持久化预览是否正在监听
npx hyperframes preview --stop        # 审阅完成后停止预览
npm run check        # lint + 运行时 + 布局 + 动效 + 对比度（一键检查）
npx hyperframes snapshot --at 1,3,5  # 截取指定秒数的 PNG 帧，渲染前用于查看画面
npm run render       # 渲染为 MP4
npm run publish      # 发布并获取可分享链接
npx hyperframes lint --verbose  # 包含 info 级别的检查结果
npx hyperframes lint --json     # 供 CI 使用的机器可读输出
npx hyperframes docs <topic> # 在终端查看参考文档
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

## 项目结构

- `index.html` — 主合成文件（根时间线）
- `compositions/` — 通过 `data-composition-src` 引用的子合成文件目录

## 检查与校验 —— 修改后务必执行

创建或编辑任意 `.html` 合成文件后，在认为任务完成之前，**务必**先运行完整检查：

```bash
npm run check
```

向用户交付结果前请修复所有错误（error）。渲染前应复核所有警告（warning）。

接着查看你修改后的画面效果：在改动对应的时间点运行 `npx hyperframes snapshot --at <seconds>`（或 `--range START,END`、`--composition <id>`），并在回复前实际查看这些帧图像。检查通过并不代表视觉效果符合预期。

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
