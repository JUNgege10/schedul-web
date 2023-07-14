<template>
    <div class="not-found">
      <img src="../assets/img/404.gif" alt="" />
    </div>
  </template>
  
  <script>
  import { onMounted } from "vue";
  export default {
    name: '404',
    setup() {
    onMounted(() => {
      setTimeout(() => {
        sessionStorage.clear();
        }, 3 * 60 * 1000);
        });
  }
  }
  </script>
  <style lang="scss" scoped>
  .not-found {
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  </style>
  
  