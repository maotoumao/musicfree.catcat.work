import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MusicFree",
  description: "MusicFree 文档站",
  lang: "zh-cn",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "使用指南", link: "/usage/mobile/install" },
      { text: "插件开发", link: "/plugin/index" },
      { text: "常见问题", link: "/qa/index" },
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
      ],
      "/plugin/": [
        {
          collapsed: false,
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
      "/qa/": [
        {
          collapsed: false,
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
    },
    footer: {
      copyright:
        "Copyright © 2022-present @<a href='https://github.com/maotoumao'>猫头猫</a>",
      message: "代码基于 GPL 协议开源，仅供学习参考使用。",
    },
    returnToTopLabel: "返回顶部",
    socialLinks: [{ icon: "github", link: "https://github.com/maotoumao" }],
    lastUpdated: {
      formatOptions: {
        dateStyle: "short",
      },
      text: "最近更新",
    },
  },
  assetsDir: "static",
});
