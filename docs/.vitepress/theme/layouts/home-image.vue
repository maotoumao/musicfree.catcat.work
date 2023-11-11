<template>
  <div class="container">
    <img src="/img/wechat_channel.jpg" />
  </div>
</template>

<script setup>

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.container img {
  height: 300px;
  position: absolute;
  object-fit: contain;
}



@media (max-width: 960px) {
  .container {
    padding-top: 48px;
    height: 248px;
  }

  .container img {
    height: 200px;
  }
}
</style>