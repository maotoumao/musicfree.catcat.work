import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MusicFree",
  description: "MusicFree —— 一个插件化、定制化、无广告的音乐播放器。",
  lang: "zh-cn",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "使用指南", link: "/usage/mobile/install" },
      { text: "插件开发", link: "/plugin/introduction" },
      { text: "常见问题", link: "/qa/common" },
      {
        text: "更新日志",
        items: [
          {
            text: "安卓版",
            link: "https://github.com/maotoumao/MusicFree/blob/master/changelog.md",
          },
          {
            text: "桌面版",
            link: "https://github.com/maotoumao/MusicFreeDesktop/blob/master/changelog.md",
          },
        ],
      },
      {
        text: "😈我要进群",
        items: [{
          text: "微信公众号",
          link: "/img/wechat_channel.jpg"
        }, {
          text: "QQ频道",
           link: "https://pd.qq.com/s/e7od7dpgu"
        }]
      },
      {
        text: "💫国内镜像",
        link: "https://musicfree.gitee.io",
      },
    ],
    logo: "/img/logo.png",
    sidebar: {
      "/usage/": [
        {
          collapsed: false,
          text: "安卓版",
          base: "/usage/",
          items: [
            {
              text: "如何安装应用",
              link: "mobile/install",
            },
            {
              text: "如何安装插件",
              link: "mobile/install-plugin",
            },
          ],
        },
        {
          collapsed: false,
          text: "桌面版",
          base: "/usage/",
          items: [
            {
              text: "如何安装应用",
              link: "pc/install",
            },
            {
              text: "如何安装插件",
              link: "pc/install-plugin",
            },
            {
              text: "如何安装主题包",
              link: "pc/install-theme",
            },
          ],
        },
        {
          text: "❓遇到问题了",
          link: "/usage/problems",
        },
      ],
      "/plugin/": [
        {
          text: "插件机制简介",
          link: "/plugin/introduction",
        },
        {
          text: "基本媒体类型",
          link: "/plugin/basic-type",
        },
        {
          text: "插件协议",
          link: "/plugin/protocol",
        },
        {
          text: "举个栗子",
          link: "/plugin/how-to-develop",
        },
        {
          text: "内置的 npm 包",
          link: "/plugin/internal-pkgs",
        },
        {
          text: "注意事项",
          link: "/plugin/caution",
        },
      ],
      "/qa/": [
        {
          text: "常见问题 - 共有问题",
          link: "/qa/common",
        },
        {
          text: "常见问题 - PC 版",
          link: "/qa/pc",
        },
        {
          text: "常见问题 - 安卓版",
          link: "/qa/mobile",
        },
      ],
    },
    footer: {
      copyright:
        "Copyright © 2022-present @<a href='https://github.com/maotoumao'>猫头猫</a>",
      message: "代码基于 GPL 协议开源，仅供学习参考使用。",
    },
    returnToTopLabel: "返回顶部",
    socialLinks: [
      { icon: "github", link: "https://github.com/maotoumao" },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bilibili</title><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/></svg>',
        },
        link: "https://space.bilibili.com/12866223",
      },
    ],
    lastUpdated: {
      formatOptions: {
        dateStyle: "short",
      },
      text: "最近更新",
    },
    editLink: {
      pattern:
        "https://github.com/maotoumao/musicfree.upup.fun/edit/master/docs/:path",
    },
    search: {
      provider: "algolia",
      options: {
        appId: "W5IICABEJY",
        apiKey: "8db476f936633af2908717789658045a",
        insights: true,
        indexName: "musicfree-upup",
        placeholder: "输入要搜索的内容..."
      },
    },
  },
  head: [
    [
      "script",
      {},
      `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?69fd99ff9e858d9f8a0aacb145a2d542";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    `,
    ],
  ],
  assetsDir: "static",
});
