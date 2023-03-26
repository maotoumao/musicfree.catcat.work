---
sidebar_position: 2
---

# MusicItem类型

MusicItem类型，即插件中所有的"单曲"，都应当满足如下接口：
```typescript
    interface MusicItem {
        /** 歌曲编号 */
        id: string;
        /** 插件名字 */
        platform: string;
        /** 标题 */
        title?: string;
        /** 时长(s) */
        duration?: number;
        /** 作者 */
        artist?: string;
        /** 专辑名 */
        album?: string;
        /** 专辑封面图 */
        artwork?: string;
        /** 音频源 */
        url?: string;
        /** 歌词URL */
        lrc?: string;
        /** 歌词 */
        rawLrc?: string;
        qualities?: Record<'low' | 'standard' | 'high' | 'super', {
            url?: string;
            size?: string | number;
        }>;
        /** 其他任何可以被序列化的信息 */
        [k: string]: any;
    }

```

