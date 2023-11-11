---
outline: deep
prev: '安卓版-如何安装插件'
next: '桌面版-如何安装插件'
---

<script setup>
import { ref, onMounted } from 'vue'

const appName = 'MusicFree 桌面版'
const latestVersion = ref(null);

const updateList = [
  'https://gitee.com/maotoumao/MusicFreeDesktop/raw/master/release/version.json',
  'https://raw.githubusercontent.com/maotoumao/MusicFreeDesktop/master/release/version.json',
];

onMounted(async () => {
    for (let i = 0; i < updateList.length; ++i) {
        try {
        const rawInfo = await fetch(updateList[i]).then(_ => _.json());
        latestVersion.value = rawInfo;
        console.log(latestVersion)
        break;
        } catch { }
    }
})

</script>

<style scoped>
.wechat-channel {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
}

.wechat-channel img {
    height: 160px;
}

</style>

# 如何安装应用 <Badge type="tip" v-if="latestVersion" :text="`最新版: ${latestVersion?.version}`" />

你可以从以下途径获取 {{ appName }} 的最新下载地址：


## :orange_heart: 公众号

每次更新时都会在公众号【一只猫头猫】推送，也可以在公众号回复【MusicFree】或【桌面版】获取下载地址:

<div class="wechat-channel"><img src="/public/img/wechat_channel.jpg" /></div>

## :yellow_heart: Github

更新时也会在 Github 同步更新（如果没有忘记的话...），你可以去 Github 仓库的 Releases 中下载最新版本：

[MusicFree 桌面版 Github Releases](https://github.com/maotoumao/MusicFreeDesktop/releases)

## :blue_heart: 蓝奏云

目前所有的版本都会上传到蓝奏云，地址如下：

[MusicFree 桌面版 蓝奏云下载地址](https://wwzb.lanzoue.com/b042da1xe)


## :question: 我应该安装哪个文件

- Win10 及以上用户请安装 MusicFree-{version}-windows-setup.exe

- Win7 至 Win 8.1 用户请安装 MusicFree-{version}-windows-legacy-setup.exe

- Macos Intel 用户请安装 MusicFree-{version}-windows-macos-x86.dmg