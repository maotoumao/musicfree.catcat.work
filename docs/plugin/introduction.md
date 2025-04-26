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

#### 插件的本质

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

#### 插件加载的原理

之前说过，MusicFree 的插件其实是满足某种规范的 js 文件，它独立于软件存在，**软件启动的时候会去特定的文件夹下搜索 js 文件，并加载到程序中。**

以手机版为例，程序中存储插件的路径是 `Android/data/{包名}/files/plugins`。

MusicFree 的包名是 `fun.upup.musicfree`，所以你可以尝试打开一下手机文件管理的 `Android/data/fun.upup.musicfree/files/plugins` 路径，你会发现一系列 `xxx.js` 文件。

<div class="img-container"><img src="/img/plugin-list.jpg" /></div>

如果想要查看具体内容的话，你可以把后缀名改成 `.txt`，并打开（记得改回去）。

<div class="img-container"><img src="/img/plugin-content.jpg" /></div>


可以看到 `module.exports` 有一些字段，这些其实都和程序中一一对应，比如 `platform` 代表这个插件的名字，`version` 代表这个插件的版本号，以及如果有 `srcUrl` 字段的话，那么这就是用于插件更新的远程地址。

插件的加载逻辑做的比较重，因此对于基于 MusicFree 开发的软件，如果不做大的改动，插件大概率也会以**本地文件**的形式存储在 `Android/data/{包名}/files/plugins` 路径下，并且也可以被 MusicFree 加载。

:::tip 总结
已安装的插件实际上是被拷贝到了固定路径，安卓是 `Android/data/fun.upup.musicfree/files/plugins`；桌面端是 `C://Users/{userName}/AppData/Roaming/MusicFree/musicfree-plugins`。每次启动应用时，都会从对应路径下扫描并加载插件。
:::

#### 插件安装的原理

插件安装时，首先会检测当前有没有安装过同名插件。所谓同名，就是指 `platform` 字段相同，如果相同就会认为是同一个插件。

接下来，会去根据插件的 `version` 字段对比版本。如果本地已经存在更新版本 (要安装的版本号小于本地版本号) 的插件，那么插件会安装失败。

版本号是类似于 `1.2.3` 的形式，比较的时候从后往前比，比如 `1.2.4 > 1.2.3`，`2.0.0 > 1.99.99`。**因此，如果要安装旧版本的插件，需要先卸载本地的更新版本的插件，然后再安装旧版。**

如果以上验证通过，那么接下来就开始安装插件了。安装的过程就是往存储插件的路径里写入一个 `js` 文件，为了避免冲突，这个文件的名字会**随机生成**。


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


::: danger
同样需要注意，插件内可以引入第三方库 (比如你想在插件中使用 lodash 等)，但插件内只能引入 <span style="color: var(--vp-c-danger-1)">纯 Javascript 库</span>，如果第三方库存在一些原生依赖，则无法使用。
:::



---

接下来，你可以简单阅读一下 [基本媒体类型](/plugin/basic-type) 一节，大概了解一下插件内部的一些通用的数据结构，然后就可以根据插件协议开发了。