# My HyperFrames 视频工作区

基于 [HyperFrames](https://hyperframes.heygen.com) 的多视频创作AI Agent工作区。使用 HTML、CSS 与 GSAP 编写确定性动画，在浏览器中实时预览并渲染输出高质量 MP4 视频。

本仓库采用**多视频独立目录（Workspace）**结构：根目录统一维护共享依赖与 AI 创作 Skills，各个视频项目独立存放在 `videos/<video-name>/` 下。

> ⚠️生成视频的时候不建议直接更新这个分支，而是通过`worktree`创建新的分支，大的媒体文件也不建议直接托管到Git，可以尝试使用[git-lfs](https://git-lfs.com/)进行管理。

---

## 目录结构

```text
.
├── .agents/skills/             # 共享 AI Skills（HyperFrames、媒体处理、Azure TTS、Gemini API 等）
├── node_modules/               # 共享依赖
├── AGENTS.md                   # AI Agent 工作区协作规范与渲染契约
├── package.json                # 工作区依赖配置
└── videos/                     # 所有视频项目目录
    └── hello-world/            # 基础空白模板项目
        ├── index.html          # 主合成文件（根时间线）
        ├── hyperframes.json    # 项目级配置
        ├── compositions/       # 子合成场景目录（按需创建）
        ├── assets/             # 视频专属音视频、图片、字体素材（按需创建）
        ├── scratch/            # 临时脚本（.mjs / .py）与中间素材（Git 已忽略）
        └── renders/            # 渲染输出的 MP4 文件（Git 已忽略）
```

---

## 环境要求

- [Node.js](https://nodejs.org/en/download) >= 22
- [FFmpeg](https://ffmpeg.org/download.html)（已加入系统环境变量 `PATH`）
- [uv](https://docs.astral.sh/uv/getting-started/installation/)（用于运行 `scratch/` 下的内联依赖临时 Python 脚本）
- [gemini-api-cli](https://aistudio.google.com/docs/cli#get-started)
  - Gmeini API的CLI工具，主要用于合成一些图片或者音乐，需要设置`GEMINI_API_KEY`环境变量或者运行`gemini-api configure --api-key "YOUR_API_KEY"`命令配置API Key

下面的环境变量也需要提前设置，否则相关服务可能无法使用。
- Azure TTS相关服务
  - `AZURE_TTS_KEY`
    - Azure语音服务的订阅Key
  - `AZURE_TTS_REGION`
    - Azure语音服务部署的区域，比如`japanwest`
- Gemini相关服务
  - `GEMINI_API_KEY`

安装工作区依赖：

```bash
npm install
```

---

## 快速开始

在根路径启动你的AI Agent工具，然后说出需求即可，比如：

```md
创建一个介绍MCP的科普视频。
```