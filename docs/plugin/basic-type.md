---
outline: deep
---

# 基本媒体类型

## 概述

基本媒体类型是 MusicFree 内部存储歌曲、作者、专辑、歌单、歌词等的基本数据结构。

在插件中，通常需要将扩展源的数据转化为 MusicFree 可以识别的媒体数据结构，或者根据 MusicFree 定义的媒体类型数据结构获取一些其他的信息。

例如：

- 对于【搜索歌曲】行为，我们可以看作根据输入的“关键词”、“页码” 获取歌曲列表的行为，这里的歌曲列表就是 “歌曲类型”的数组。用 ts 类型表示就是：

```typescript
// 仅为示例，插件内并没有定义searchMusic
type searchMusic = (keyword: string, page: number) => Promise<MusicItem[]>;
```

- 对于【获取歌曲播放源】行为，我们可以看作根据输入的 “歌曲类型的对象” 获取真实播放链接的过程。用 ts 类型表示就是：

```typescript
// 仅为示例，插件协议内并非如此实现
type getMediaSource = (musicItem: MusicItem) => Promise<string>;
```

以上是为了让你对【基本媒体类型】的作用有个大概的印象，接下来介绍 MusicFree 定义的基本媒体类型。

## 基础类型：IMediaBase

MusicFree 定义的所有媒体类型都继承自 IMediaBase。其签名如下：

```typescript
interface IMediaBase {
  // 媒体来源
  platform: string;
  // 媒体ID
  id: string;
}
```

也就是说，所有的媒体类型一定有一个 `platform` 字段表示它的来源（通常是插件名），也一定有一个 `id` 字段作为唯一表示。

换句话说，一般情况下，所有媒体类型的主键为 `platform` 和 `id`。

## 音乐类型：IMusicItem

MusicFree 定义的音乐类型，其签名如下：

```typescript
interface IMusicItem extends IMediaBase {
  // 媒体来源
  platform: string;
  // 媒体ID
  id: string;
  /** 作者 */
  artist: string;
  /** 歌曲标题 */
  title: string;
  /** 时长(s) */
  duration?: number;
  /** 专辑名 */
  album?: string;
  /** 专辑封面图 */
  artwork?: string;
  /** 默认音源 */
  url?: string;
  /** 歌词URL */
  lrc?: string;
  /** 歌词文本 */
  rawLrc?: string;
  // 其他，你可以在这里扩展你自己的字段
  [k: string | number | symbol]: any;
}
```

MusicFree 协议中所有涉及到【歌曲】的概念，都应该符合 `IMusicItem` 数据结构。

## 作者类型：IArtistItem

MusicFree 定义的作者类型，其签名如下：

```typescript
interface IArtistItem extends IMediaBase {
  // 媒体来源
  platform: string;
  /** id */
  id: string;
  /** 作者名 */
  name: string;
  /** 粉丝数 */
  fans?: number;
  /** 简介 */
  description?: string;
  /** 头像 */
  avatar: string;
  /** 作者的单曲列表 */
  musicList?: IMusicItem[];
  /** 作者的专辑列表 */
  albumList?: IAlbumItem[];
}
```

MusicFree 协议中所有涉及到【作者】的概念，都应该符合 `IArtistItem` 数据结构。

## 专辑类型：IAlbumItem

MusicFree 定义的专辑类型，其签名如下：

```typescript
interface IAlbumItem extends IMediaBase {
  // 媒体来源
  platform: string;
  // 媒体ID
  id: string;
  /** 封面图 */
  artwork?: string;
  /** 标题 */
  title: string;
  /** 描述 */
  description?: string;
  /** 作品总数 */
  worksNum?: number;
  /** 播放次数 */
  playCount?: number;
  /** 播放列表 */
  musicList?: IMusicItem[];
  /** 歌单创建日期 */
  createAt?: number;
  // 歌单作者
  artist?: string;
}
```

MusicFree 协议中所有涉及到【专辑】的概念，都应该符合 `IAlbumItem` 数据结构。

## 歌单类型：IMusicSheetItem

MusicFree 定义的歌单类型。歌单类型的数据结构其实和 `IAlbumItem` 完全一致，只不过里面有些字段的含义不同，比如 `artist` 在专辑中代表专辑作者，但在歌单中代表创建歌单的用户。`IMusicSheetItem` 签名如下：

```typescript
interface IMusicSheetItem extends IMediaBase {
  // 媒体来源
  platform: string;
  // 媒体ID
  id: string;
  /** 作者 */
  artist: string;
  /** 歌曲标题 */
  title: string;
  /** 时长(s) */
  duration?: number;
  /** 专辑名 */
  album?: string;
  /** 专辑封面图 */
  artwork?: string;
  /** 默认音源 */
  url?: string;
  /** 歌词URL */
  lrc?: string;
  /** 歌词文本 */
  rawLrc?: string;
  // 其他，你可以在这里扩展你自己的字段
  [k: string | number | symbol]: any;
}
```

MusicFree 协议中所有涉及到【歌曲】的概念，都应该符合 `IMusicItem` 数据结构。

## 评论类型：IComment

MusicFree 定义的评论类型。`IComment` 签名如下：
```typescript
interface IComment {
    id?: string;
    // 用户名
    nickName: string;
    // 头像
    avatar?: string;
    // 评论内容
    comment: string;
    // 点赞数
    like?: number;
    // 评论时间
    createAt?: number;
    // 地址
    location?: string;
    // 回复
    replies?: Omit<IComment, 'replies'>[];
}
```

MusicFree 协议中所有涉及到【评论】的概念，都应该符合 `IComment` 数据结构。