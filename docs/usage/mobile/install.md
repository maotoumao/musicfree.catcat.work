---
outline: deep

next: '安卓版-如何安装插件'
---

<script setup>
import { ref, onMounted } from 'vue'

const appName = 'MusicFree 安卓版'
const latestVersion = ref(null);

const updateList = [
  'https://gitee.com/maotoumao/MusicFree/raw/master/release/version.json',
  'https://raw.githubusercontent.com/maotoumao/MusicFree/master/release/version.json',
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

早期版本有一个 [简介视频](https://mp.weixin.qq.com/s?__biz=MzkxOTM5MDI4MA==&mid=2247483706&idx=1&sn=03426d8c322ec52b4a7164d74c227fa0&chksm=c1a3901df6d4190b08e62e85953ae3c4a4516de9d9939fe9bcc535bc9b1b3a35f8e7c45bd9f2#rd)，里面内容和最新版本已经有些差别了，感兴趣的话可以点击查看。

你可以从以下途径获取 {{ appName }} 的最新下载地址：

## :orange_heart: 公众号

每次更新时都会在公众号【一只猫头猫】推送，也可以在公众号回复【MusicFree】获取下载地址:

<div class="wechat-channel"><img src="/public/img/wechat_channel.jpg" /></div>

## :yellow_heart: Github

更新时也会在 Github 同步更新（如果没有忘记的话...），你可以去 Github 仓库的 Releases 中下载最新版本：

[MusicFree 安卓版 Github Releases](https://github.com/maotoumao/MusicFree/releases)

## :blue_heart: 蓝奏云

目前所有的版本都会上传到蓝奏云，地址如下：

[MusicFree 安卓版 蓝奏云下载地址](https://wwzb.lanzoue.com/s/MusicFree)
