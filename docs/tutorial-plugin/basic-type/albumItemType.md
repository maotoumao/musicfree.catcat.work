---
sidebar_position: 3
---

# AlbumItem类型

AlbumItem类型，即插件中所有的"专辑"，都应当满足如下接口：
```typescript
    interface AlbumItem {
        /** 专辑编号 */
        id: string;
        /** 插件名字 */
        platform: string;
        /** 封面图 */
        artwork?: string;
        /** 专辑名 */
        title: string;
        /** 发行日期 */
        date?: string;
        /** 作者 */
        artist: string;
        /** 专辑描述 */
        description?: string;
        /** 专辑中的音乐列表 */
        musicList: MusicItem[];
        /** 其他任何可以被序列化的信息 */
        [k: string]: any;
    }
```