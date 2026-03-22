---
outline: deep
---

# 用 AI 开发 MusicFree 插件

AI 的理解能力和编程能力已经非常强大了，我们可以借助 AI 快速完成插件开发。

你可以使用 https://github.com/maotoumao/musicfree-skills 这个 skill。你可以使用任何支持 skill 的 IDE 进行开发，比如 vscode, claude code, trae 等等。开发步骤：

> 前置条件：需要安装 node.js > 20.0

1. 新建一个文件夹作为项目目录。

2. `npx skills add maotoumao/musicfree-skills` 在项目目录下安装 skill。

3. 直接告诉 AI 你的需求。skill 会指引你完成 MusicFree 插件的开发。

4. 安装测试，如果有不符合预期的行为，告诉 AI ，让 AI 修复。


# 例子

下图是在 trae 上用 GLM4.7 进行的测试（claude Opus 4.6效果会更好）：

![freesound](/public/img/develop-with-ai.png)

然后你就得到了一个能使用的 MusicFree 插件：

![freesound](/public/img/develop-with-ai-2.png)