---
outline: deep
---

# 举个栗子

## 开发方式

为了在 `app` 内使用特定功能，我们需要按照插件协议实现插件定义的函数。实现这些函数通常有 `3` 种方式。

第一种是不涉及网络请求的情况，直接按照一些特定逻辑进行拼接转化为插件可以识别的格式即可。

第二种是直接请求接口，比如可以自己开启一个用于提供音乐服务的 `web server`，然后便可以通过插件中的 `axios` 库进行网络请求，并将结果转化为插件可以识别的格式。

第三种是类似于爬虫的原理，先发起网络请求，获取原本的 `html` 文件，然后再用 `cheerio` 对 `html` 进行解析，得到目标内容，并做进一步处理，转化为插件可以识别的格式。

## 插件示例

我们以一个第三方音乐网站 [freesound](https://freesound.org/) 为例，做一个支持搜索、播放、导入单曲功能的插件。`freesound` 的页面如下图所示：

![freesound](/public/img/freesound.png)

我们搜索任意内容，即可看到搜索结果。搜索结果也可以在 `dom` 结构直接看到。搜索页面遵循如下规则：`https://freesound.org/search/?q=关键字`，我们直接解析 `dom` 结构即可拿到关于歌曲的完整信息。

![freesound1](/public/img/freesound1.png)

![freesound2](/public/img/freesound2.png)

根据上述分析，我们可以按照方式三开发。为了实现插件的搜索功能，我们可以参考 [插件协议的搜索函数](/plugin/protocol.html#搜索-search) 来进行具体实现。

### 步骤一：插件框架

我们先来定义一下插件的大概结构：

```javascript
module.exports = {
  platform: "FreeSound", // 插件名
  version: "0.0.0", // 版本号
  cacheControl: "no-store", // 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段
  async search(query, page, type) {
    // TODO: 在这里实现搜索函数的功能
  },
};
```

### 步骤二：实现搜索函数

我们首先需要获取搜索页面对应的 `html` 文件。请求网络可以用 axios 库，这是一个前端很常用的网络请求库。

我们写出如下 search 函数，它首先能完成请求对应的网址：

```javascript
const axios = require("axios");

module.exports = {
  platform: "FreeSound", // 插件名
  version: "0.0.0", // 版本号
  cacheControl: "no-store", // 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段
  async search(query, page, type) {
    if (type === "music") {
      // 我们能搜索的只有音乐，因此判断下类型
      // 获取网站的html
      const rawHtml = (
        await axios.get("https://freesound.org/search", {
          q: query,
          page,
        })
      ).data;
      // TODO: 接下来解析html
    }
  },
};
```

接下来我们需要解析 `html` 文件，并把它转化为插件可以识别的 `IMusicItem` 类型。解析 `html` 可以使用 `cheerio` 库，它可以用类似 jquery 的语法快速解析 html 元素。根据 `dom` 结构，我们写出如下代码：

```javascript
const axios = require("axios");
const cheerio = require('cheerio');

module.exports = {
    platform: "FreeSound", // 插件名
    version: "0.0.0", // 版本号
    cacheControl: "no-store", // 我们可以直接解析出musicItem的结构，因此选取no-store就好了，当然也可以不写这个字段
    async search(query, page, type) {
        if (type === "music") {
            // 我们能搜索的只有音乐，因此判断下类型
            // 获取网站的html
            const rawHtml = (
                await axios.get("https://freesound.org/search", {
                    q: query,
                    page,
                })
            ).data;

            // 接下来解析html 
            const $ = cheerio.load(rawHtml);
            // 存储搜索结果 
            const searchResults = [];
            // 获取所有的结果
            const resultElements = $('.bw-search__result');
            // 解析每一个结果
            resultElements.each((index, element) => {
                const playerElement = $(element).find('.bw-player');
                // id
                const id = playerElement.data('sound-id');
                // 音频名
                const title = playerElement.data('title');
                // 作者
                const artist = $(element).find('.col-12.col-lg-12.middle a').text();
                // 专辑封面
                const artwork = playerElement.data('waveform');
                // 音源
                const url = playerElement.data('mp3');
                // 专辑名，这里就随便写个了，不写也没事
                const album = '来自FreeSound的音频';

                searchResults.push({
                    // 一定要有一个 id 字段
                    id,
                    title,
                    artist,
                    artwork,
                    album,
                    url
                })
            });
            return {
                isEnd: true,
                data: searchResults
            }
        }
    },
};
```

此时，一个插件就开发完成了。上面的插件并没有判断是否还有下一页（返回的 `isEnd` 始终是 `true`），你也可以尝试完善一下，让插件拥有分页功能。


插件安装后，在 `PC` 版本上表现如下：

![freesound3](/public/img/freesound3.png)

尝试搜索一下：

![freesound4](/public/img/freesound4.png)

![freesound5](/public/img/freesound5.png)


在 `安卓` 版本上表现如下：

![freesound3](/public/img/freesound6.png)

尝试搜索一下：

![freesound3](/public/img/freesound7.png)

![freesound3](/public/img/freesound8.png)


## 完整代码

插件的完整代码在 [Github](https://github.com/maotoumao/MusicFreePlugins/blob/master/example/freesound.js) [Gitee](https://gitee.com/maotoumao/MusicFreePlugins/blob/master/example/freesound.js)。

你跟着上述步骤开发，并直接通过【安装本地插件】导入插件，也可以尝试从 URL 安装插件：`https://gitee.com/maotoumao/MusicFreePlugins/raw/master/example/freesound.js`。


## 插件模板

如果你觉得这种开发方式过于原始，MusicFree 也提供了插件开发模板：[Github](https://github.com/maotoumao/MusicFreePluginTemplate) [Gitee](https://gitee.com/maotoumao/MusicFreePluginTemplate) ，按照 Readme 使用即可。