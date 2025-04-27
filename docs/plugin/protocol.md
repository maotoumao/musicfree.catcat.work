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

# 插件协议

本节介绍一个标准的 MusicFree 插件应该满足的数据结构，也就是通过 `module.exports` 导出的对象应当有哪些字段。

:::details 完整示例

```javascript
module.exports = {
  // 插件名称
  platform: "某插件",
  // 插件作者
  author: "插件作者",
  // 插件版本号
  version: "0.0.0",
  // 插件更新地址
  srcUrl: "https://example.catcat.work/xxx.js",
  // 主键
  primaryKey: ["id", "aid", "bid"],
  // 缓存策略
  cacheControl: "no-cache",
  // 提示文案
  hints: {
    importMusicItem: [
      "1. 导入单曲时注意，输入的 URL 应该符合 xxx 格式",
      "2. 导入单曲的第二条注意事项",
    ],
    importMusicSheet: [
      "1. 导入歌单时注意，输入的 URL 应该符合 xxx 格式",
      "2. 导入歌单的第二条注意事项",
    ],
  },
  // 搜索
  async search(query, page, type) {
    // 搜索的具体逻辑
  },
  // 获取音乐的真实 url
  async getMediaSource(mediaItem, quality) {
    // ...
  },
  // 获取音乐详情
  async getMusicInfo(musicItem) {
    // ...
  },
  // 获取歌词
  async getLyric(musicItem) {
    // ...
  },
  // 获取专辑详情
  async getAlbumInfo(albumItem, page) {
    // ...
  },
  // 获取歌单详情
  async getMusicSheetInfo(sheetItem, page) {
    // ...
  },
  // 获取作者作品
  async getArtistWorks(artistItem, page, type) {
    // ...
  },
  // 导入单曲
  async importMusicItem(urlLike) {
    // ...
  },
  // 导入歌单
  async importMusicSheet(urlLike) {
    // ...
  },
  // 获取榜单列表
  async getTopLists() {
    // ...
  },
  // 获取榜单详情
  async getTopListDetail(topListItem, page) {
    // ...
  },
  // 获取推荐歌单 tag
  async getRecommendSheetTags() {
    // ...
  },
  // 获取某个 tag 下的所有歌单
  async getRecommendSheetsByTag(tag, page) {
    // ...
  },
  // 获取某个音乐的评论
  async getMusicComments(musicItem) {
    // ...
  }
};
```

:::

## 插件属性

插件属性用来说明插件的一些基础信息，以下字段如果 **没有特殊说明，均为必填**。

### 插件名称 (platform)

任意合法的字符串即可。如果插件名为“本地”，则此插件会失效。
::: details 🌰 举个例子：

```javascript
module.exports = {
  // 插件名
  platform: "某插件",

  // ... 其他字段
};
```

:::

### 插件作者 (author) <Badge type="tip" text="可选" />

插件的作者，可省略。此字段只用于展示。

::: details 🌰 举个例子：

```javascript
module.exports = {
  // 插件作者
  author: "某位大佬",

  // ...其他字段
};
```

:::

### 插件版本号 (version) <Badge type="tip" text="可选" />

插件版本号，可省略，默认值：`"0.0.0"` 版本。

需要遵循 [samver 格式](https://samver.org/)，如果在 APP 内更新插件，会依靠此字段判断插件版本号，并决定是否更新插件。

::: details 🌰 举个例子：

```javascript
module.exports = {
  // 插件版本号
  version: "0.0.0",

  // ...其他字段
};
```

:::

### 匹配的安卓版 APP 版本号 (appVersion) <Badge type="danger" text="已废弃" /> <Badge type="tip" text="可选" />

建议忽略此字段。兼容 app 版本号，默认值：`">0.0.0"`，即所有版本都可以使用。同样需要遵循 semver 格式。

如果当前 app 版本不满足此处声明的版本号约束，则在 app 内无法使用此插件，并会有红色提示。

::: details 🌰 举个例子：

```javascript
module.exports = {
  // 匹配的安卓版 APP 版本号
  appVersion: ">0.0.0",

  // ...其他字段
};
```

:::

### 插件更新地址 (srcUrl) <Badge type="tip" text="可选" />

插件的更新地址，指向插件的 `js` 文件的真实地址，即：`http://xxxx.js` ，可省略。

::: tip
如果存在此字段，软件内插件页就会出现 **更新插件** 按钮。

点击【更新插件】按钮后，会获取 `srcUrl` 字段指向的文件，并取其 `version` 字段与已安装的插件版本做对比。如果远程地址插件的版本 `>=` 本地插件的版本，则会下载远程的插件，并自动覆盖本地插件版本。
:::

::: details 🌰 举个例子：

```javascript
module.exports = {
  // 插件更新地址
  srcUrl:
    "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/xxx/index.js",

  // ...其他字段
};
```

:::

### 主键 (primaryKey) <Badge type="tip" text="可选" />

主键，通常是插件方法中必须的参数，取值为字符串数组，可省略，默认为 `["id"]`。

如果第三方源除了 `id` 外，需要其他字段辅助定位资源，则需要把这字段添加到主键数组中。

::: details 🌰 举个例子：

假如来自 `A` 源的媒体除了 `ID` 外，还需要一个 `aid` 来唯一标识，那么来自 `A` 源的基础类型可能如下：

```typescript
interface IMusicItemA extends IMusicItem {
  // ... MusicItem的所有属性

  // 额外的 aid
  aid: string;
}
```

而这种情况下，对应的插件设置如下：

```javascript
module.exports = {
  // 媒体主键
  primaryKey: ["id", "aid"],

  // ...其他字段
};
```

:::

### 缓存策略 (cacheControl) <Badge type="tip" text="可选" /><Badge type="tip" text="安卓版" />

插件的缓存策略，取值为 `no-cache` 、 `no-store`、或 `cache`。可选，如果不填默认值为 `no-cache`。

主要用于 getMediaSource 方法返回的结果（注意不是音乐文件本身的缓存，是插件结果的缓存），如某个音乐资源的音源 URL 等。

#### `cache`

播放音乐媒体时，获取某个媒体的音源 URL 后会缓存至本地；下次播放同个媒体时会返回缓存的音源 URL。（此时如果有本地音乐缓存，会直接命中音乐文件的缓存）；

#### `no-cache`

播放音乐媒体时，获取某个媒体的音源 URL 后会缓存至本地；当网络处于离线状态时会返回缓存的音源 URL，此时如果有该音乐的离线缓存，会直接命中音乐文件的缓存；当网络处于在线状态时，会获取最新的音源 URL。

#### `no-store`

播放音乐媒体时，始终获取最新的音源 URL。

::: tip

简言之：

- 如果音源 URL 有过期时间，指定为 `no-cache` 或 `no-store`;
- 如果获取音源 URL 不需要额外网络请求，指定为 `no-store`；
- 如果音源 URL 为固定链接，且不会轻易改变或删除，指定为 `cache`
- 无特殊要求的情况下，空缺此配置即可。
  :::

::: details 🌰 举个例子：

```javascript
module.exports = {
  // 缓存策略
  cacheControl: "no-cache", // 'cache' 'no-store'

  // ...其他字段
};
```

:::

### 提示文案 (hints) <Badge type="tip" text="可选" />

在部分场景下（如导入歌单时）需要用到的提示文案。可省略。

该字段值为一个对象，对象的键值如下表：

|        键名        |   值类型   |              说明               |
| :----------------: | :--------: | :-----------------------------: |
| `importMusicSheet` | `string[]` | 导入歌单的浮层/弹窗上的提示文案 |
| `importMusicItem`  | `string[]` | 导入单曲的浮层/弹窗上的提示文案 |

::: details 🌰 举个例子：

```javascript
module.exports = {
  hints: {
    // 导入歌单浮层上的提示
    importMusicSheet: [
      "注意事项：导入歌单时需要XXX",
      "第二点注意事项，导入歌单时需要XXX",
    ],
    // 导入单曲浮层上的提示
    importMusicItem: [
      "注意事项：导入单曲时需要XXX",
      "第二点注意事项，导入单曲时需要XXX",
    ],
  },

  // ...其他字段
};
```

:::

### 用户变量 (userVariables) <Badge type="tip" text="可选" /> <Badge type="warning" text="安卓版 >0.1.2-alpha.0" />

用户变量，用来定义一些在插件中会使用到的，由用户定义的变量。

该字段值是一个数组，数组的每一项是个对象，其键值如下表：

|  键名   |  值类型  |                说明                |
| :-----: | :------: | :--------------------------------: |
|  `key`  | `string` |             该变量的键             |
| `title` | `string` | 该变量展示在软件面板中的名称，可选 |

定义后，插件中可通过 `env.getUserVariables()` 获取用户输入的值。

::: details 🌰 举个例子：

在插件中以如下方式定义：

```javascript
module.exports = {
  userVariables: [
    {
      key: "test1",
      title: "变量1",
    },
    {
      key: "test2",
    },
  ],

  // ...其他字段
};
```

在手机端对应插件中会显示如下面板：

<div class="img-container"><img src="/img/user-variables.jpg" /></div>

在插件中，你可以在任意一个地方调用：

```javascript

function someFunc(){
  const userVariables = env.getUserVariables(); // 返回 { test1: "", test2: "" }
}

module.exports = {
  userVariables: [
    {
      key: "test1",
      title: "变量1",
    },
    {
      key: "test2",
    },
  ],

  // ...其他字段
};
```
:::

### 支持的搜索类型 (supportedSearchType) <Badge type="tip" text="可选" />

此字段作为插件函数中 `search` 方法的辅助字段，用来说明插件支持的搜索类型。

该字段是一个数组，取值是 `search` 方法支持的所有搜索类型 (`type`)，即：`"music", "sheet", "album", "artist", "lyric"`。

::: tip
- 如果填写此字段，则软件会认为 `search` 方法仅支持此字段支持的搜索类型。

- 如果不填此字段，则软件会认为 `search` 方法支持所有的搜索类型。
:::

::: details 🌰 举个例子：
```javascript
module.exports = {
  supportedSearchType: ["music", "album", "sheet", "artist", "lyric"]
  // ...其他字段
};
```
:::


## 插件函数

> 在开始之前，你也可以先看一下 [typescript 文档](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions) 关于函数类型的部分。

插件导出的函数用来定义插件的一些功能，如请求数据等。**所有函数都可以省略**，省略则意味着插件未实现对应的功能。

::: tip
插件功能缺失时，反映在 UI 上可能表现为：

- 功能无法使用（如点击歌曲无法播放）；
- 不展示该插件（如在不导出 `search` 函数时搜索结果中不展示某插件的搜索结果、在不导出 `getTopLists` 时候不展示排行榜等）。
  :::

插件函数基本上都是 **异步函数**，返回值是 `Promise` 类型。下文中，如果返回值类型是 `Promise<T>`，则表示这个异步函数需要返回 `T` 类型。

比如一个没有入参的插件函数 `pluginMethod`，其返回值是 `Promise<string>`，在实现时，你需要写成：

```javascript
// 比如这是某个插件函数
async function pluginMethod() {
  return "字符串";
}
```

### 搜索 (search)

搜索函数，可省略。当用户在 app 内点击搜索、下拉刷新、触达搜索底部时调用。

::: warning
- `search` 函数缺失时，该插件不会出现在软件的搜索结果页中。

- 当插件中定义【支持的搜索类型】 (即`supportedSearchType`字段) 时，`search` 函数将会仅处理 `supportedSearchType` 中定义的类型。
:::

::: details 函数签名

```javascript
type SupportMediaType = 'music' | 'album' | 'artist' | 'sheet' | 'lyric';
type SupportMediaItem = {
    music: IMusicItem;
    album: IAlbumItem;
    artist: IArtistItem;
    sheet: IMusicSheetItem;
    lyric: IMusicItem;
};
interface ISearchResult<T extends SupportMediaType> {
    isEnd?: boolean;
    data: SupportMediaItem[T][];
}

/** 搜索函数签名 */
type search = <T extends SupportMediaType>(
    query: string,
    page: number,
    type: T,
) => Promise<ISearchResult<T>>
```

:::

**参数**

- 入参：

函数接收 3 个参数

| 参数名  |                    类型                     | 说明                                                                   |
| :-----: | :-----------------------------------------: | :--------------------------------------------------------------------- |
| `query` |                  `string`                   | 搜索的关键词                                                           |
| `page`  |                  `number`                   | 从 `1` 开始的页码                                                      |
| `type`  | `"music" \| "album" \| "artist" \| "sheet" \| "lyric"` | 搜索类型，取值为左侧五者之一；<br/> 含义依次为：歌曲、专辑、作者、歌单、歌词 |

- 返回值

返回值是个 `Promise` 对象，其内容键值类型如下：
| 键名 | 类型 | 说明 |
| :-------------: | :-----------: | :---- |
| `isEnd` | `boolean` | 搜索是否结束；如果 `isEnd` 被置为 `true`，说明当前已经到达最后一页；<br />此值如果不传，默认为 `true` |
| `data` | `IMediaItem[]` | `data`的类型和入参中的搜索类型 `type` 有关。<br/> 如果搜索类型是`music`，`data`的类型是 `IMusicItem[]`；<br /> 如果搜索类型是`album`，`data`的类型是 `IAlbumItem[]`；<br /> 如果搜索类型是`artist`，`data`的类型是 `IArtistItem[]`；<br /> 如果搜索类型是`sheet`，`data`的类型是 `IMusicSheetItem[]`；<br/> 如果搜索类型是`lyric`，`data`的类型是 `IMusicItem[]`； |

::: tip
`data` 对象数组中，无论数组的元素为何种类型，均会自动为每一个元素添加 `platform` 属性，其值为插件名。

换句话说，`data` 数组的每一个元素的 `platform` 属性都会被忽略。
:::

::: warning
注意：你可以在搜索结果或者基本媒体类型中扩展任何可被序列化的字段；这些字段在下文的获取音源方法中等也会被传入，因此最好保持你的插件基于“基本媒体类型”有固定字段的扩展，防止字段不兼容的情况发生。
:::

::: details 🌰 举个例子：
你需要在搜索函数中判断用户搜索的类型，并返回对应的内容：

```typescript
module.exports = {
  // 搜索
  async search(query, page, type) {
    // 搜索音乐
    if (type === "music") {
      return {
        isEnd: true,
        data: [], // MusicItem 类型的数组
      };
    }
    // 搜索专辑
    else if (type === "album") {
      return {
        isEnd: true,
        data: [], // AlbumItem 类型的数组
      };
    }
    // 搜索歌单
    else if (type === "sheet") {
      return {
        isEnd: true,
        data: [], // MusicSheetItem 类型的数组
      };
    }
    // 搜索作者
    else if (type === "artist") {
      return {
        isEnd: true,
        data: [], // ArtistItem 类型的数组
      };
    }
    // 搜索歌词
    else if (type === "lyric") {
      return {
        isEnd: true,
        data: [], // MusicItem 类型的数组
      };
    }
  },
};
```

:::

### 获取音源 (getMediaSource)

获取音乐的真实 url，可省略。

当用户在 app 内点击播放、下载时调用。

::: warning
`getMediaSource` 函数缺失时，会自动取入参的 `mediaItem` 的 `url` 字段（如有）作为真实音源。

`getMediaSource` 的第二个参数为音质。如果你在函数内没有针对这个参数做判断，APP 内的表现会是所有的音质都相同；如果你只针对特定的音质返回了音乐源，APP 内的表现会是只有特定音质的音频。
:::

::: warning
APP 内调用时，如果当前音质的音乐不存在，则会自动再次调用该函数，根据用户设置传入一个更高（或者更低）的音质。直至找到一个有效音质；或者播放/下载失败，根据用户设置跳过当前歌曲或暂停播放。
:::

::: details 函数签名

```javascript
interface IMediaSourceResult {
  /** 请求URL所需要的headers */
  headers?: Record<string, string>;
  /** 请求URL所需要的user-agent */
  userAgent?: string;
  /** 音源 */
  url: string;
}

// 获取媒体源函数签名
type getMediaSource = (
  mediaItem: IMusicItem,
  quality?: "low" | "standard" | "high" | "super"
) => Promise<IMediaSourceResult | null>;
```

:::

**参数**

- 入参：

函数接收 2 个参数

|   参数名    |                    类型                    | 说明                                                                                                |
| :---------: | :----------------------------------------: | :-------------------------------------------------------------------------------------------------- |
| `mediaItem` |                `IMusicItem`                | 要获取源的媒体对象，是 `IMusicItem` 类型                                                            |
|  `quality`  | `"low" \| "standard" \| "high" \| "super"` | 音质，取值为左侧四者之一；<br/> 含义依次为：低音质、标准音质、高音质、超高音质；默认会传 `standard` |

- 返回值

返回值是个 `Promise` 对象，其内容键值类型如下：
| 键名 | 类型 | 说明 |
| :-------------: | :-----------: | :---- |
| `url` | `string` | 媒体对象的真实 `url` |
| `headers`| `Record<string, string>` | 请求真实 `url` 时需要的一些额外请求头，如果没有可省略 |
| `userAgent`| `string` | 请求真实 `url` 时需要的 `userAgent`，如果已经在 `headers` 里写了可省略 （如果有请求头，建议全都写到 `headers` 里） |

::: details 🌰 举个例子：
你需要在获取音源函数中判断音质，并返回真实音源：

```javascript
const axios = require("axios");

// 获取音源
module.exports = {
  async getMediaSource(mediaItem, quality) {
    // 根据媒体对象获取源信息
    const fakeResult = (
      await axios.get("https://example.catcat.work/getMediaUrl", {
        params: {
          id: mediaItem.id,
          quality: quality,
        },
      })
    ).data;

    // 转化为插件可识别的返回值
    return {
      url: fakeResult.sourceUrl,
    };
  },
};
```

:::

### 获取音乐详情 (getMusicInfo)

获取音乐详情的方法，可省略。当用户在 app 内点击播放时调用。

当用户在 app 内点击播放、下载时调用。

::: tip
播放时会先执行 `getMediaSource` 获取音源，接下来执行 `getMusicInfo` 获取完整的音乐信息。<br/> 比如某些搜索结果中不包含专辑封面的歌曲，就可以在这里补充完整。
:::

::: details 函数签名

```javascript
// 获取音乐详情函数签名
type getMusicInfo = (
  musicBase: MediaBase
) => Promise<Partial<IMusicItem> | null>;
```

:::

**参数**

- 入参：

函数接收 1 个参数

|   参数名    |     类型     | 说明                                       |
| :---------: | :----------: | :----------------------------------------- |
| `musicItem` | `IMusicItem` | 要获取详细信息的音乐，是 `IMusicItem` 类型 |

- 返回值

返回值是个 `Promise<Partial<IMusicItem>>` 对象，`Promise` 的内容是该音乐（即入参的 `musicItem`）的部分或者全部属性。

::: details 🌰 举个例子：

```javascript
module.exports = {
  // 其他属性或方法...

  async getMusicInfo(musicItem) {
    // 根据音乐获取音乐详细信息
    return {
      artwork: "https://example.catcat.work/coverimage.png",
    };
  },
};
```

:::

### 获取歌词 (getLyric)

获取歌词，可省略。切换歌曲时会调用；搜索的歌词也会调用此函数获取具体歌词内容。

::: details 函数签名

```javascript
interface ILyricSource {
  rawLrc?: string; // 文本格式的歌词
  translation?: string; // 文本格式的翻译
}

// 获取歌词函数签名
type getLyric = (musicItem: IMusicItem) => Promise<ILyricSource | null>;
```

:::

**参数**

- 入参：

函数接收 1 个参数

|   参数名    |     类型     | 说明                                       |
| :---------: | :----------: | :----------------------------------------- |
| `musicItem` | `IMusicItem` | 要获取详细信息的音乐，是 `IMusicItem` 类型 |

- 返回值

返回值是个 `Promise` 对象，其内容键值类型如下：
| 键名 | 类型 | 说明 |
| :-------------: | :-----------: | :---- |
| `rawLrc`| `string` | 带时间戳的文本格式的歌词文件，如 `[00:00.00] First Lyric` |
| `translation`| `string` | 带时间戳的文本格式的翻译文件，如 `[00:00.00] 第一句歌词` |


::: details 🌰 举个例子：
根据音乐获取歌词：

```javascript
module.exports = {
  // ...

  async getLyric(musicItem) {
    return {
      rawLrc: "[00:00.00] First Lyric", // 文本格式的歌词
      translation: "[00:00.00] 第一句歌词", // 文本格式的歌词
    };
  },
};
```

:::

### 获取专辑详情 (getAlbumInfo)

获取专辑详情，可省略。

当用户进入到专辑详情页时调用，用来补全 `albumItem` 缺失的属性，以及获取专辑下的音乐列表。

::: details 函数签名

```javascript
interface IGetAlbumInfoResult = {
    isEnd?: boolean;
    musicList: IMusicItem[],
    albumItem?: Partial<IAlbumItem>
}
type getAlbumInfo = (albumItem: IAlbumItem, page: number) => Promise<IGetAlbumInfoResult>;
```

:::

**参数**

- 入参：

函数接收 2 个参数

|   参数名    |     类型     | 说明                                       |
| :---------: | :----------: | :----------------------------------------- |
| `albumItem` | `IAlbumItem` | 要获取详细信息的专辑，是 `IAlbumItem` 类型 |
|   `page`    |   `number`   | 页码，从 `1` 开始                          |

- 返回值

返回值是个 `Promise` 对象，其内容键值类型如下：
| 键名 | 类型 | 说明 |
| :-------------: | :-----------: | :---- |
| `isEnd` | `boolean` | 专辑内歌曲是否已经到达页尾；默认是 `true` |
| `musicList` | `IMusicItem[]` | 专辑内的歌曲列表 |
| `albumItem` | `Partial<IAlbumItem>` | 专辑的一部分字段或者全部字段，用于补充专辑内的其他信息，如简介等。<br/> **仅当 `page <= 1` 时可选返回，其他情况不需要返回此字段** |

::: details 🌰 举个例子：
根据专辑简略信息获取专辑内的歌曲：

```javascript
module.exports = {
  // ...

  async getAlbumInfo(albumItem, page) {
    if (page <= 1) {
      return {
        isEnd: false,
        musicList: [],
        albumItem: {
          description: "这是专辑的补充说明",
        },
      };
    }

    // 其他页码正常返回
    return {
      isEnd: true,
      musicList: [],
    };
  },
};
```

:::

### 获取歌单详情 (getMusicSheetInfo)

获取歌单详情，可省略。此函数和获取专辑详情类似。

当用户进入到歌单详情页时调用，用来补全 `sheetItem` 缺失的属性，以及获取专辑下的音乐列表。

::: details 函数签名

```javascript
interface IGetSheetInfoResult = {
    isEnd?: boolean;
    musicList: IMusicItem[],
    sheetItem?: Partial<IMusicSheetItem>
}

type getMusicSheetInfo = (sheetItem: MusicSheetItem, page: number) => Promise<IGetSheetInfoResult>;
```

:::

**参数**

- 入参：

函数接收 2 个参数

|   参数名    |       类型        | 说明                                            |
| :---------: | :---------------: | :---------------------------------------------- |
| `sheetItem` | `IMusicSheetItem` | 要获取详细信息的歌单，是 `IMusicSheetItem` 类型 |
|   `page`    |     `number`      | 页码，从 `1` 开始                               |

- 返回值

返回值是个 `Promise` 对象，其内容键值类型如下：
| 键名 | 类型 | 说明 |
| :-------------: | :-----------: | :---- |
| `isEnd` | `boolean` | 专辑内歌曲是否已经到达页尾；默认是 `true` |
| `musicList` | `IMusicItem[]` | 专辑内的歌曲列表 |
| `sheetItem` | `Partial<IMusicSheetItem>` | 歌单的一部分字段或者全部字段，用于补充歌单内的其他信息，如简介等。<br/> **仅当 `page <= 1` 时可选返回，其他情况不需要返回此字段** |

::: details 🌰 举个例子：
根据专辑简略信息获取专辑内的歌曲：

```javascript
module.exports = {
  // ...

  async getMusicSheetInfo(sheetItem, page) {
    if (page <= 1) {
      return {
        isEnd: false,
        musicList: [],
        albumItem: {
          description: "这是专辑的补充说明",
        },
      };
    }

    // 其他页码正常返回
    return {
      isEnd: true,
      musicList: [],
    };
  },
};
```

:::

### 获取作者作品 (getArtistWorks)

获取作者作品，可省略。

当用户进入作者详情页时调用，用来获得作者的歌曲/专辑信息。

::: details 函数签名

```javascript
type ArtistMediaType = 'music' | 'album';

type getArtistWorks = <T extends ArtistMediaType>(
    artistItem: ArtistItem,
    page: number,
    type: T,
) => Promise<ISearchResult<T>>;
```

:::

**参数**

- 入参：

函数接收 3 个参数

|    参数名    |         类型         | 说明                                        |
| :----------: | :------------------: | :------------------------------------------ |
| `artistItem` |    `IArtistItem`     | 要获取详细信息的作者，是 `IArtistItem` 类型 |
|    `page`    |       `number`       | 页码，从 `1` 开始                           |
|    `type`    | `'music' \| 'album'` | 页码，从 `1` 开始                           |

- 返回值

返回值是个 `Promise` 对象，其内容键值类型如下：
| 键名 | 类型 | 说明 |
| :-------------: | :-----------: | :---- |
| `isEnd` | `boolean` | 当前作者的歌曲或者专辑页是否已经到达页尾；默认是 `true` |
| `data` | `IMediaItem[]` | `data`的类型和入参中的搜索类型 `type` 有关。<br/> 如果搜索类型是`music`，`data`的类型是 `IMusicItem[]`；<br /> 如果搜索类型是`album`，`data`的类型是 `IAlbumItem[]`； |

::: details 🌰 举个例子：
根据专辑简略信息获取专辑内的歌曲：

```javascript
module.exports = {
  // ...

  async getArtistWorks(artistItem, page, type) {
    // 获取作者的音乐
    if (type === "music") {
      return {
        isEnd: true,
        data: [],
      };
    }
    // 获取作者的专辑
    if (type === "album") {
      return {
        isEnd: false,
        data: [],
      };
    }
  },
};
```

:::

### 导入单曲 (importMusicItem)

导入单曲，可省略。

当用户进入插件管理页，点击“导入单曲”，输入 URL 并确认后会调用此方法。

::: warning
此函数缺失时，插件管理页不会出现 “导入单曲” 按钮。
:::

::: details 函数签名

```javascript
// 导入单曲
type importMusicItem = (urlLike: string) => Promise<IMusicItem>;
```

:::

**参数**

- 入参：

函数接收 1 个参数

|  参数名   |   类型   | 说明                                                                                                                                               |
| :-------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `urlLike` | `string` | 用户输入的文本，可能包含 `url` 或 `id` 等信息。<br /> 一般来说，你需要在函数体内用正则表达式或者字符串匹配找到 `url` 或者 `id`，然后做进一步处理。 |

- 返回值

返回值是个 `Promise<IMusicItem>` 对象。

::: details 🌰 举个例子：

```javascript
const axios = require("axios");

module.exports = {
  // ...

  async importMusicItem(urlLike) {
    // 导入单曲

    const id = urlLike.match(/http:\/\/www\.foo\.bar\/([0-9]+)/)[1];
    const musicItem = (
      await axios.get("http://bar.foo", {
        params: { id },
      })
    ).data;
    return musicItem;
  },
};
```

:::

### 导入歌单 (importMusicSheet)

导入歌单，可省略。

当用户进入插件管理页，点击“导入歌单”，输入 URL 并确认后会调用此方法。

::: warning
此函数缺失时，插件管理页不会出现 “导入歌单” 按钮。
:::

::: details 函数签名

```javascript
// 导入单曲
type importMusicSheet = (urlLike: string) => Promise<IMusicItem[]>;
```

:::

**参数**

- 入参：

函数接收 1 个参数

|  参数名   |   类型   | 说明                                                                                                                                               |
| :-------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `urlLike` | `string` | 用户输入的文本，可能包含 `url` 或 `id` 等信息。<br /> 一般来说，你需要在函数体内用正则表达式或者字符串匹配找到 `url` 或者 `id`，然后做进一步处理。 |

- 返回值

返回值是个 `Promise<IMusicItem[]>` 对象，即一个音乐类型的数组。

::: details 🌰 举个例子：

```javascript
const axios = require("axios");

module.exports = {
  // ...

  async importMusicSheet(urlLike) {
    // 导入歌单

    const id = urlLike.match(/http:\/\/www\.foo\.bar\/([0-9]+)/)[1];
    const musicItems = (
      await axios.get("http://bar.foo", {
        params: { id },
      })
    ).data;
    return musicItems;
  },
};
```

:::

### 获取榜单列表 (getTopLists)

获取榜单列表，可省略。

当用户进入榜单页面时会调用此方法。

::: warning
此函数缺失时，榜单页的 tab 中不会显示此插件。

如果榜单的参数不会经常变化，可以直接硬编码在函数中。
:::

::: details 函数签名

```javascript
/** 榜单分组信息 */
interface IMusicSheetGroupItem {
  title?: string;
  data: Array<IMusicSheetItem>;
}

// 获取榜单信息
type getTopLists = () => Promise<IMusicSheetGroupItem[]>;
```

:::

**参数**

- 入参：

函数没有入参。

- 返回值

返回值是个 `Promise<IMusicSheetGroupItem[]>` 数组，即榜单分组信息。**数组的每一项**键值类型如下：

|  键名   |        类型         | 说明                                                                                                                                                                    |
| :-----: | :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` |      `string`       | 分组名。如果不需要分组，则忽略此字段。                                                                                                                                  |
| `data`  | `IMusicSheetItem[]` | 榜单对象数组。<br />注意：这里的榜单仅仅是数据结构和歌单相同，进入榜单页时并不会调用 `getMusicSheetInfo` 函数，而是会调用下文的 `getTopListDetail` 获取榜单的详细信息。 |

::: details 🌰 举个例子：

```javascript
module.exports = {
  // ...

  async getTopLists() {
    // 获取榜单
    return [
      {
        title: "榜单类别1",
        data: [
          {
            id: "新歌榜的ID",
            description: "新歌榜的描述",
            coverImg: "新歌榜的封面",
            title: "新歌榜",
          },
        ],
      },
    ];
  },
};
```

:::

### 获取榜单详情 (getTopListDetail)

获取榜单详情（榜单中的音乐），可省略。

当用户在榜单页点击某个具体的榜单时会调用此方法。

::: details 函数签名

```typescript
interface ITopListInfoResult {
  isEnd?: boolean;
  topListItem?: IMusic.IMusicSheetItem;
  musicList?: IMusic.IMusicItem[];
}
// 获取榜单详情
type getTopListDetail = (
  topListItem: IMusicSheetItem
) => Promise<ITopListInfoResult>;
```

:::

**参数**

- 入参：

函数接收 2 个参数

|    参数名     |       类型        | 说明                                                                      |
| :-----------: | :---------------: | :------------------------------------------------------------------------ |
| `topListItem` | `IMusicSheetItem` | 榜单条目，即 `getTopLists` 返回的榜单分组列表中的某一个 `IMusicSheetItem` |
|    `page`     |     `number`      | 页码，从 `1` 开始                                                         |

- 返回值

返回值是个 `Promise` 对象，其键值类型如下：

|     键名      |       类型        | 说明                            |
| :-----------: | :---------------: | :------------------------------ |
|    `isEnd`    |     `boolean`     | 是否到达列表结尾，默认为 `true` |
| `topListItem` | `IMusicSheetItem` | 补充说明的歌单信息              |
|  `musicList`  |  `IMusicItem[]`   | 当前页码的歌曲                  |

::: details 🌰 举个例子：

```javascript
module.exports = {
  // ...

  async getTopListDetail(topListItem) {
    // 获取榜单详情

    return {
      musicList: [],
    };
  },
};
```

:::

### 获取推荐歌单 tag (getRecommendSheetTags)

获取热门歌单的 tag 分类，可省略。

当用户进入推荐歌单页，且点击对应插件时，会调用此函数。

::: details 函数签名

```typescript
interface ITag {
  // tag 的唯一标识
  id: string;
  // tag 标题
  title: string;
}

interface ITagGroup {
  // 分组标题
  title: string;
  // tag 列表
  data: ITag[];
}

interface IGetRecommendSheetTagsResult {
  // 固定的tag
  pinned?: ITag[];
  // 更多面板中的tag
  data?: ITagGroup[];
}

type getRecommendSheetTags = () => Promise<IGetRecommendSheetTagsResult>;
```

:::

**参数**

- 入参：

函数没有入参。

- 返回值

返回值是个 `Promise<IGetRecommendSheetTagsResult>` 对象。其内容键值类型如下：

|   键名   |     类型      | 说明                                                                                          |
| :------: | :-----------: | :-------------------------------------------------------------------------------------------- |
| `pinned` |    `ITag`     | 固定在顶部的 `tag`。每个 `tag` 至少包含 `id` 和 `title` 两个字段                              |
|  `data`  | `ITagGroup[]` | `tag` 分组数组。<br /> 每个分组可选包含一个标题 `title`，以及该分组下的所有 `ITag` 类型的标签 |

::: details 🌰 举个例子：

```javascript
module.exports = {
  // ...

  async getRecommendSheetTags() {
    // 获取推荐歌单 tag
    return {
      pinned: [
        {
          id: "1",
          title: "纯音乐",
        },
      ],
      data: [
        {
          title: "年代",
          data: [
            {
              id: "101",
              title: "80后",
            },
            {
              id: "102",
              title: "90后",
            },
          ],
        },
      ],
    };
  },
};
```

:::

### 获取某个 tag 下的所有歌单 (getRecommendSheetsByTag)

获取某个 `tag` 下的所有歌单列表，可省略。

当用户点击某个 `tag` 时会调用此方法。当点击某个具体的歌单时，会进入具体歌单页面，并调用 `getMusicSheetInfo` 获取歌单信息。

::: details 函数签名

```typescript
// 获取某个 tag 下的所有歌单
type getRecommendSheetsByTag = (
  tag: ITag,
  page?: number
) => Promise<{
  isEnd: boolean;
  data: Array<IMusicSheetItem>;
}>;
```

:::

**参数**

- 入参：

函数接收 2 个参数

| 参数名 |   类型   | 说明              |
| :----: | :------: | :---------------- |
| `tag`  |  `ITag`  | 某个 `tag`        |
| `page` | `number` | 页码，从 `1` 开始 |

:::warning
需要注意，app 会有一个默认 `tag`，这个 `tag` 的 id 为空字符串（后续可能修改逻辑）。
:::

- 返回值

返回值是个 `Promise` 对象，其键值类型如下：

|  键名   |        类型         | 说明                            |
| :-----: | :-----------------: | :------------------------------ |
| `isEnd` |      `boolean`      | 是否到达列表结尾，默认为 `true` |
| `data`  | `IMusicSheetItem[]` | 歌单列表                        |

::: details 🌰 举个例子：

```javascript
module.exports = {
  // ...

  async getRecommendSheetsByTag(tagItem) {
    // 获取某个 tag 下的所有歌单
    return {
      isEnd: false,
      data: [
        {
          title: "歌单1",
          id: "xxxx",
          artwork: "xxx",
          playCount: 122220,
        },
      ],
    };
  },
};
```

:::


### 获取推荐歌单 tag (getRecommendSheetTags)

获取热门歌单的 tag 分类，可省略。

当用户进入推荐歌单页，且点击对应插件时，会调用此函数。

::: details 函数签名

```typescript
interface ITag {
  // tag 的唯一标识
  id: string;
  // tag 标题
  title: string;
}

interface ITagGroup {
  // 分组标题
  title: string;
  // tag 列表
  data: ITag[];
}

interface IGetRecommendSheetTagsResult {
  // 固定的tag
  pinned?: ITag[];
  // 更多面板中的tag
  data?: ITagGroup[];
}

type getRecommendSheetTags = () => Promise<IGetRecommendSheetTagsResult>;
```

:::

**参数**

- 入参：

函数没有入参。

- 返回值

返回值是个 `Promise<IGetRecommendSheetTagsResult>` 对象。其内容键值类型如下：

|   键名   |     类型      | 说明                                                                                          |
| :------: | :-----------: | :-------------------------------------------------------------------------------------------- |
| `pinned` |    `ITag`     | 固定在顶部的 `tag`。每个 `tag` 至少包含 `id` 和 `title` 两个字段                              |
|  `data`  | `ITagGroup[]` | `tag` 分组数组。<br /> 每个分组可选包含一个标题 `title`，以及该分组下的所有 `ITag` 类型的标签 |

::: details 🌰 举个例子：

```javascript
module.exports = {
  // ...

  async getRecommendSheetTags() {
    // 获取推荐歌单 tag
    return {
      pinned: [
        {
          id: "1",
          title: "纯音乐",
        },
      ],
      data: [
        {
          title: "年代",
          data: [
            {
              id: "101",
              title: "80后",
            },
            {
              id: "102",
              title: "90后",
            },
          ],
        },
      ],
    };
  },
};
```

### 获取某个歌曲的评论 (getMusicComments)

获取某个歌曲的评论，可省略。

当用户点击评论图标时会调用此方法。

::: details 函数签名

```typescript
// 获取某个 tag 下的所有歌单
type getMusicComments = (
  musicItem: IMusicItem
) => Promise<{
  isEnd: boolean;
  data: Array<IComment>;
}>;
```

:::

**参数**

- 入参：

函数接收 1 个参数

| 参数名 |   类型   | 说明              |
| :----: | :------: | :---------------- |
| `musicItem`  |  `IMusicItem`  | 某个歌曲       |


- 返回值

返回值是个 `Promise` 对象，其键值类型如下：

|  键名   |        类型         | 说明                            |
| :-----: | :-----------------: | :------------------------------ |
| `isEnd` |      `boolean`      | 是否到达列表结尾，默认为 `true` |
| `data`  | `IComment[]` | 评论列表                        |

::: details 🌰 举个例子：

```javascript
module.exports = {
  // ...

  async getMusicComments(musicItem) {
    // 获取某个歌曲的所有评论
    return {
      isEnd: false,
      data: [
        {
          id: "评论1",
          nickName: "https://xxx.jpg",
          comment: "这是一条评论"
        },
      ],
    };
  },
};
```

:::
