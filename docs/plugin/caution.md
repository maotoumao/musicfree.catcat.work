---
outline: deep
---

# 注意事项

## 插件语法

尽量使用 `ES8` 以下的语法，不然在安卓版上有可能会有语法错误。`async/await` 用起来基本没什么问题，但是下面这种异步箭头函数在安卓版上可能不支持：

``` javascript
const f = async () => {

}

```

如果你想用 ES10 的 `?.` 或者 `??` 操作符的话，你可以用 `babel-cli` 转成 `es5`，基本上就没什么问题了。

`PC` 版基本上没有语法不支持的情况。

## 网络请求
在安卓端，网络请求默认会带一些 headers，具体示例如下，其中前四项是固定值：

```
accept: application/json, text/plain, */*
Accept-Encoding: gzip
Connection: Keep-Alive
User-Agent: okhttp/4.10.0
Host: musicfree.catcat.work
If-Modified-Since: Thu, 15 Feb 2024 06:07:49 GMT
```

如果某些请求在 node.js 环境可以正常发起，但在 app 中无法加载，可以检查一下是否由于默认 headers 导致。


## 性能相关

插件是一开始就通过 `Function` 的形式 hook 进了 `js` 引擎中，也就是插件和 app 的代码运行在同一个环境下，不会有需要序列化/反序列化之类的可能比较耗时的问题，插件方法的返回值比较大也无所谓（虽然可能后续处理会更耗时）。

尽量避免频繁请求、请求耗时过长的情况。在 app 中对每次请求的最长时间做了限制。

## 安全相关

由于上文所说，插件使用的内置 npm 包也和 app 是共用的。

不要试图修改 npm 包内的参数，否则 app 可能会出现异常。这也会有潜在的安全问题，使用者也要注意大概看下插件中有没有恶意请求之类的，后续可能会想办法解决掉这个安全问题。