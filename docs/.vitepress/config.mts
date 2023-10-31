import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MusicFree",
  description: "MusicFree 文档站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "使用指南", link: "/usage/index" },
      { text: "插件开发", link: "/plugin/index" },
      { text: "常见问题", link: "/qa/index" },
      {text: "更新日志", link: "https://github.com/maotoumao/MusicFree/blob/master/changelog.md"}
    ],
    logo: "/img/logo.png",
    sidebar: {
      "/usage/": [
        {
          collapsed: false,
          base: '/usage/',
          text: "测试1",
          items: [
            { text: "Markdown Examples", link: "/index" },
            { text: "Runtime API Examples", link: "/api-examples" },
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
