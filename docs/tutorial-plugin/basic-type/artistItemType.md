---
sidebar_position: 4
---

# ArtistItem类型

ArtistItem类型，即插件中所有的"作者"，都应当满足如下接口：
```typescript
    interface ArtistItem {
        /** 专辑编号 */
        id: string;
        /** 插件名字 */
        platform: string;
        /** 作者名 */
        name: string;
        /** 作者粉丝数 */
        fans?: number;
        /** 作者描述 */
        description?: string;
        /** 作者头像 */
        avatar?: string;
        /** 作者作品数 */
        worksNum?: number;
        /** 其他任何可以被序列化的信息 */
        [k: string]: any;
    }
```