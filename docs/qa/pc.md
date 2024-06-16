---
outline: deep
---

# 常见问题 - PC 版


## Win7/8/8.1 报错：无法找到入口

最新版的 electron 已经不支持 win7/8/8.1，所以特意单独针对这部分操作系统降版本打的包，不确保体验。

安装链接中的 `...-legacy-setup.exe` 即适用于 win7/8/8.1 的安装包。

:::danger
win10/11 可以安装任意一个 setup.exe，**但最好安装不带`legacy`标记的，体验可能会好一点**。

另外，两个版本不要串着装，不然可能会丢数据。
:::

## 主题包怎么装

请看这里：[如何安装主题包](/usage/pc/install-theme)


## 如何批量操作歌曲

在歌单内，按住 `shift` 操作歌曲，然后右键操作即可。也可以按 `Ctrl + A` 全选后右键操作。


## Mac M芯片 提示文件已损坏

安装软件后打开控制台，输入：

```
xattr -r -d com.apple.quarantine /Applications/MusicFree.app
```

回车，即可正常使用软件。