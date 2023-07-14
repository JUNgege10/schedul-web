<template>
  <div class="menu-demo">
    <a-menu
      :style="{ width: '200px', height: '100%' }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_1']"
      show-collapse-button
    >
      <a-menu-item key="0_0_0" data-obj="1">导航首页</a-menu-item>
      <a-menu-item key="0_0" @click="navigateToPage('/auto')">自动化</a-menu-item>
      <a-menu-item key="1_0" @click="navigateToPage('/cloud')">云平台</a-menu-item>
    </a-menu>
    <div class="menu-content">
      <span class="red"><h2>欢迎{{users}}来到调度系统空白首页</h2></span>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from "@arco-design/web-vue/es/icon";

export default {
  components: {
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
  },
  setup() {
    onMounted(() => {
      setTimeout(() => {
        sessionStorage.clear();
        }, 3 * 60 * 1000);
        });

  const users = window.sessionStorage.getItem('usernames')
  return {
    users
  };
  },
  methods: {
    navigateToPage(path) {
      this.$router.push({ path: path });
    },
  },
};
</script>
<style>
.red {
  color: red;
}
.green {
  color: green;
}
.blue {
  color: blue;
}
  .menu-demo {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .menu-content {
    flex: 1;
    padding: 20px;
  }
</style>
