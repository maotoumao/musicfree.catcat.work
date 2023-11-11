<template>
  <Layout>
    <template #home-hero-image>
      <HomeImage></HomeImage>
    </template>
  </Layout>
</template>
  
<script setup>
import DefaultTheme from 'vitepress/theme'
import HomeImage from './home-image.vue'

const { Layout } = DefaultTheme
</script>
  
