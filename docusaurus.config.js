// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MusicFree',
  tagline: '一个插件化、定制化、无广告的开源音乐播放器',
  url: 'https://musicfree.upup.fun',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'maotoumao', // Usually your GitHub org/user name.
  projectName: 'musicfree.upup.fun', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'MusicFree',
        logo: {
          alt: 'MusicFree',
          src: 'https://img1.imgtp.com/2023/03/26/ueSnkLf8.jpg',
        },
        items: [{
          type: 'doc',
          docId: 'tutorial-usage/intro',
          position: 'left',
          label: '使用指南'
        },
        {
          type: 'doc',
          docId: 'tutorial-plugin/intro',
          position: 'left',
          label: '插件开发'
        },
        { href: 'https://github.com/maotoumao/MusicFree#changelog', label: 'ChangeLog', position: 'left' },
        { href: 'https://mp.weixin.qq.com/s?__biz=MzkxOTM5MDI4MA==&mid=2247483937&idx=1&sn=486c735b1fb78acc75f8f4acdcb9e253&chksm=c1a39306f6d41a101a6f8d3adefcd980092ce94140119bb3cc0eb3aa8c6ae22fe1b97899be21#rd', label: 'Q&A', position: 'left' },
        {
          href: 'https://github.com/maotoumao/MusicFree',
          label: 'GitHub',
          position: 'right',
        },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '使用指南',
                to: '/docs/tutorial-usage/intro',
              },
              {
                label: '插件开发',
                to: '/docs/tutorial-plugin/intro',
              },
            ],
          },
          {
            title: '相关链接',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/maotoumao/MusicFree',
              },
              {
                label: 'bilibili',
                href: 'https://space.bilibili.com/12866223',
              },
              {
                label: '猫头猫的博客',
                href: 'https://blog.upup.fun',
              },
            ],
          },
          {
            title: 'QQ群',
            items: [
              {
                label: '（bug反馈群）817438799',
                href: 'https://jq.qq.com/?_wv=1027&k=3SRFG8qC'
              },
              {
                label: '（技术交流）683467814',
                href: 'https://jq.qq.com/?_wv=1027&k=LBGZPslX'
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 猫头猫. GPL License.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
