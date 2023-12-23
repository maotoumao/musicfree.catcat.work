---
outline: deep
---

# 内置的 npm 包

APP 已经内置了一些 npm 包，以下包可以在插件中直接使用，而不需要把源码打包到最终的插件中。如果你有过 web 开发经验，你可以理解成以下包全都被设置成了 external：

| npm 包名                      | 版本        | 备注                                                    |
| ----------------------------- | ----------- | ------------------------------------------------------- |
| crypto-js                     | 4.4.1       | 加解密库                                                |
| dayjs                         | 1.11.4      | 日期时间处理库                                          |
| axios                         | 0.27.2      | 网络请求库                                              |
| big-integer                   | 1.6.51      | 大整型数据处理库                                        |
| qs                            | 6.11.0      | 参数序列化库                                            |
| he                            | 1.2.0       | http 编码/解码库                                        |
| cheerio                       | 1.0.0-rc.12 | http 文件解析库                                         |
| @react-native-cookies/cookies | 6.2.1       | 处理 http 请求 Cookie 信息的库，Nodejs 环境下执行会报错 |
| webdav                        | 5.3.1       | 处理 Webdav 的库                                        |

举个例子：如果你需要在插件中使用 `axios`，你可以直接：

```javascript
const axios = require("axios");

module.exports = {
  // ... 插件实例对象
  platform: "插件名",
  version: "0.0.0",
  // ...
};
```

而假如你要在插件中使用 `lodash`，你不可以直接引入，也就是如果这样写是无效的：

```javascript
const lodash = require("lodash");
```

如果想使用类似 `lodash` 这种 APP 没有内置的包，你需要使用 `webpack` 或者其他工具把对应包的源码打到最终的插件中，此处不再赘述。
