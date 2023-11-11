// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CLayout from './layouts/c-layout.vue';
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: CLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
