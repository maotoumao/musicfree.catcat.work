---
sidebar_position: 1
---

# 简介

## 前言
插件机制是本软件的核心。当未安装**插件**时，本软件可以看作是一个本地的音乐播放器；当安装插件之后，你便可以为这个播放器扩展你自定义的音源。本文档便是开发插件的详细教程。

软件中的任何和音乐有关的底层功能，包括但不限于**播放、搜索、查看专辑信息、查看歌词、导入歌单**等，都是基于插件实现的。  

软件会决定在什么时候去调用插件中的某个方法，以及如何处理方法返回的数据；插件负责根据入参获取或处理特定格式的数据。软件中播放本地音乐功能实际上也是通过加载一个特殊的内置插件实现。

## 原理
插件本质上是一个CommonJS模块。其中，每项动作（如获取音源URL、搜索等）都对应着模块的导出(module.exports或export.xx)，开发者只需要在对应的方法中完成网络请求或其他操作，再转换为特定格式的对象返回即可。开发过程与webpack.config.js类似，就是写一些配置。

由于插件是一个标准的CommonJS模块，因此一般情况下通过node.js加载(require)模块，直接调用插件内的方法与APP内调用插件方法无区别。（除非插件用到了一些涉及native的npm包，比如cookie相关）。

你可以使用webpack等前端工程化的工具，也可以使用typescript等更好地完善类型，只需要最终打包为**一个单文件CommonJS模块**即可。

APP内置了一些npm包，你可以在插件内直接require，不需要把源代码打入最终的bundle中，类似external方案。参考【内置npm包】。

插件执行的上下文和APP内JS代码的上下文相同，因此性能方面理论上无差别。

## 插件结构
一个完整插件的示意如下，在整个模块内，你可以引入一些[内置的npm包](/docs/tutorial-plugin/npm-package)；可以在中间部分写一些逻辑或者函数。模块的导出为一个插件实例，也就是最终会被APP读取和使用的信息。

具体可以参考[插件协议](/docs/category/插件协议)一节，module.exports中具备插件协议中定义字段的commonjs模块都是一个MusicFree插件。
```typescript
// 你可以在这里引入一些npm包，需要注意的是，如果引入的npm包是app内置的，则直接require即可，否则需要把源码打入bundle中。
const axios = require("axios");


/**
 * 你可以在这里编写任何辅助函数 或 app生命周期内持续生效的全局变量
 * ...
 */
let pageSize = 20;
function someFunction() {
    // do something
}
async function someAsyncFunction() {
    // do something
}

 /**
  * 模块的导出必须满足插件的协议，APP内会从module.exports中获取插件的信息，以及插件内定义的解析函数。
  */
module.exports = {
    platform: "插件名", // [必选] 插件名，搜索到的结果都会自动带上platform的标记
    cacheControl: "no-cache", // [可选] 插件的缓存控制方案，用来缓存插件信息
    version: "0.0.0", // [可选] 插件版本号
    primaryKey: ["id"], // [可选] 主键名，可在此字段中填写插件函数入参中必备的字段
    appVersion: ">0.0", // [可选] 兼容此插件的app版本号，预防后续协议更新出现不兼容格式时报错的情况
    defaultSearchType: "music", // [可选] 插件在搜索时，首屏默认请求的搜索类型，默认是music。
    hints: {
        importMusicSheet: [
            "1. 导入时xxxx"
        ]
    }, // [可选] 提示文案
    /**[可选] 搜索 */
    search: function (query: string, page = 1, type: "music" | "album" | "artist" = "music") {
        // 三个参数分别为: 查询的keyword，当前页码，搜索类型
        return {
            isEnd: true, // 分页请求是否结束
            data: [], // 不同type媒体类型的列表，即MusicItem[] | AlbumItem[] | ArtistItem[]
        };
    },
    /**[可选] 获取真实的播放源 */
    getMediaSource: function (musicItem: MusicItem) {
        // 入参：搜索结果中MusicItem类型的音乐
        return {
            headers: undefined, // [可选] headers
            url: "https://", // 真实url,
            userAgent: undefined, // [可选] 如果不填，会取headers的user-agent字段
        };
    },
    /**[可选] 根据主键查询歌曲信息，返回音乐类型的对象  */
    getMusicInfo: function (musicItem: MusicItem) {
        const musicItem: MusicItem;
        return musicItem;
    },
    /**[可选] 获取歌词  */
    getLyric: function (musicItem: MusicItem) {
        return {
            lrc: "", // [可选] lrc格式的歌词链接
            rawLrc: "", // [可选] lrc格式的歌词
        };
    },
    /**[可选] 获取专辑详情  */
    getAlbumInfo: function (albumItem: AlbumItem, page: number) {
        const albumItem: AlbumItem;
        return albumItem;
    },
    /**[可选] 获取作者的作品  */
    getArtistWorks: function (artistItem, page = 1, type: "music" | "album" = "music") {
        return {
            isEnd: true, // 分页请求是否结束
            data: [], // 不同type媒体类型的列表，即MusicItem[] | AlbumItem[] | ArtistItem[]
        };
    },
    /**[可选] 导入歌单 */
    importMusicSheet: function (urlLike: string) {
        const musicList: MusicItem[] = []; // 音乐列表
        return musicList;
    },
    /**[可选] 导入单曲 */
    importMusicItem: function (urlLike: string) {
        const musicItem: MusicItem;
        return musicItem;
    },
};


```