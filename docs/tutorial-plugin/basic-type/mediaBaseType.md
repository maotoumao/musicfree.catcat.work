---
sidebar_position: 1
---

# MediaBase类型

所有合法的媒体类型都需要满足MediaBase类型的接口：
```typescript
    interface MediaBase {
        platform: string; // 插件名
        id: string; // 唯一的id
        [k: string]: string | number | boolean // 其他可选的参数
    }
```

其中，platform和id标识着唯一的媒体资源。