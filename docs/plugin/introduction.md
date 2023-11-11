---
outline: deep
---

<style scoped>
    .img-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    
    .img-container img {
        width: 50%;
    }

    @media (max-width: 640px) {
        .img-container img {
            width: 100%;
        }
    }

</style>

# 插件机制简介

## 概述

插件机制是本软件的核心。当未安装插件时，本软件可以看作是一个 <strong>本地的音乐播放器</strong>；当安装插件之后，你便可以为这个播放器 <strong>扩展你自定义的音源</strong>。本文档便是开发插件的详细教程。

软件中的任何和音乐有关的 <strong> 底层功能 </strong>，包括但不限于播放、搜索、查看专辑信息、查看歌词、导入歌单等，都是基于 <strong>插件</strong> 实现的。

::: tip 💡
因此，如果某个音源存在问题（比如无法播放、没有导入歌单等功能），那大概率是插件有问题。
:::

<strong>软件会决定在什么时候去调用插件中的某个方法，以及如何处理方法返回的数据</strong>；插件负责根据入参获取或处理特定格式的数据。软件中播放本地音乐功能实际上也是通过加载一个特殊的内置插件实现。

<div class="img-container"><img src="/img/plugin-framework.png" /></div>

## 前置知识

开发插件前，你需要了解以下知识：

- javascript / typescript (ES7 语法)
- js 模块化规范 (common.js)
- 包管理工具 npm，以及如何使用 npm 包
- 构建工具（webpack、parcel，可选）
- JSBridge（可选）

## 原理

插件本质上是一个 **导出特定数据结构** 的 `Common JS 模块`。如果你开发过前端项目，并且配置过 `webpack.config.js`，你可能会对开发插件的方式感到熟悉。

插件中的配置可以大体分为两类：一类是用来说明插件信息的 **属性**（比如插件名、插件的版本号）；另一类是让软件在合适的时机调用的 **函数**（比如获取音源的函数等）。

在软件中的每一项动作 （如获取音源 URL、搜索等），**都对应着插件中导出的某个函数** （比如 `获取音源` 对应着 `getMediaSource` 函数，`搜索` 对应着 `search` 函数）。

一个简单的插件结构如下：

```javascript
module.exports = {
  /** 用来说明插件信息的属性 */
  platform: "MusicFree 插件", // 插件名
  version: "0.0.0", // 插件版本号

  /** 供给软件在合适的时机调用的函数 */
  getMediaSource: function (musicItem) {
    // 根据该音源的某个音乐获取真实的播放地址
    return {
      url: "https://", // 音源 URL
    };
  },
};
```

关于插件在代码中的实现细节可以 [参考这里](https://mp.weixin.qq.com/s/pjyOjTDrV85ImRQ6EWbgAg)。桌面版的实现机制和安卓版略有差异，但基本原理相同。

已安装的插件实际上是被拷贝到了固定路径，安卓是 `Android/data/fun.upup.musicfree/files/plugins`；桌面端是 `C://Users/{userName}/AppData/Roaming/MusicFree/musicfree-plugins`。每次启动应用时，都会从对应路径下扫描并加载插件。

## 生命周期

插件在被加载或软件启动时，会自动执行插件函数的函数体，并将插件的模块导出（module.exports）作为插件的实例。

插件实例和插件中的数据会在软件的生命周期内**持续存在**，直至软件或者插件被卸载。

## 插件的性能

插件执行的上下文和软件内（无论是桌面版还是安卓版） Javascript 代码执行的上下文相同，因此性能方面理论上和软件内直接写死源 **无差别**。

::: danger
也正因如此，插件内有可能会有些破坏软件本体执行的逻辑，因此插件的使用者需要谨慎识别插件的来源。
:::

::: details 为什么要这样设计？
尽管在安全性上有弱点，但是这样做没有额外的序列化和反序列化步骤，性能会好一点点；同时设计之初以技术探索为主，没有太多安全性上的考虑。

再者，插件是用 javascript 编写，简单看一下插件内容也能大概判断插件的安全性，因此暂时保持这样的设计，后续如果有需求再逐渐完善。
:::

## 如何开发插件

对于开发方式没有限制，你只需要保证最终生成一个 `导出 MusicFree 协议` 的 `Common.js` 模块即可。

方便起见，你可以按照 [此模板](https://github.com/maotoumao/MusicFreePluginTemplate) 完善插件。开发完成后，执行：

```bash
npm run build
```

安装 `dist/plugin.js` 即可。

除了使用模板外，你也可以基于 [示例插件](https://github.com/maotoumao/MusicFreePlugins) 修改。示例插件仓库最终的可安装文件在 `dist` 文件夹下。


## 如何调试插件

前面说过，插件本质上是一个导出特定数据结构的 `Common JS 模块`。如果需要调试插件，你只需要在 node.js 环境下调用对应的函数，判断函数的返回值是否符合预期即可。

::: warning
如果使用到 `@react-native-cookies/cookies`，无法直接在 node.js 环境下调试，因为这个包有一些原生依赖。如果需要调试，需要启动 MusicFree 项目，并在软件内调试。
:::

::: danger
同样需要注意，插件内可以引入第三方库 (比如你想在插件中使用 lodash 等)，但插件内只能引入 <span style="color: var(--vp-c-danger-1)">纯 Javascript 库</span>，如果第三方库存在一些原生依赖，则无法使用。
:::



---

接下来，你可以简单阅读一下 [基本媒体类型](/plugin/basic-type) 一节，大概了解一下插件内部的一些通用的数据结构，然后就可以根据插件协议开发了。