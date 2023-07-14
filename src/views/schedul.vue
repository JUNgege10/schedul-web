<template>
    <a-layout style="height: 400px;">
    <a-layout-header>
        <a-page-header
    :style="{ background: 'var(--color-bg-2)' }"
    title="开发页面"
    subtitle="待解锁队列-投递任务信息"
    ></a-page-header>
    <a-input
    :style="{ width: '200px', margin: '5px' }"
    v-model="searchInput"
    placeholder="输入关键字搜索"
    @change="onSearch"
    ></a-input>
    
    <div class="user-info" :class="{ 'green': true }">
      <h4>{{ users }}</h4>
      <a-button type="primary" @click="logout">退出</a-button>
    </div>
    </a-layout-header>
    <a-layout-content>
    <a-table :columns="columns" :data="filteredData">
    <template #optional="{ record }">
    <a-popconfirm
    @ok="onDel(record.id, record.namespace, record.ldapUser, record.password)"
    content="请确认是否重新投递"
    okText="确认投递"
    cancelText="No"
    :disabled="!record.ldapUser || !record.password"
    >
    <a-tooltip content="请确认您是该任务管理员">
    <a-button type="primary" status="info">重新投递</a-button>
    </a-tooltip>
    <a-input-group>
    <a-input
    v-model="record.ldapUser"
    :style="{ width: '160px' }"
    placeholder="ldap-user"
    />
    <a-input-password
    v-model="record.password"
    :style="{ width: '160px' }"
    placeholder="password"
    />
    </a-input-group>
    </a-popconfirm>

    <a-popconfirm
    @ok="KDel(record.id, record.namespace, users)"
    content="请确认删除信息"
    okText="确认删除"
    >
    <a-tooltip content="请确认您是该任务管理员">
    <a-button type="primary" status="danger">删除任务</a-button>
    </a-tooltip>
    </a-popconfirm>
    </template>
    </a-table>
    </a-layout-content>
    </a-layout>
    </template>
    
    <script>
    import { ref, onMounted, computed } from "vue";
    import axios from "axios";
    import { useEventSource } from "@vueuse/core";
    import { ElMessageBox } from 'element-plus'
    
    export default {
    name: "App",
    setup() {
    const columns = [
    {
    title: "ID",
    dataIndex: "id",
    },
    {
    title: "USER",
    dataIndex: "user",
    },
    {
    title: "NAMESPACE",
    dataIndex: "namespace",
    },
    {
    title: "PATH",
    dataIndex: "path",
    },
    {
    title: "MEMORY",
    dataIndex: "memory",
    },
    {
    title: "CREATE_TIME",
    dataIndex: "create_time",
    },
    {
    title: "Optional",
    slotName: "optional",
    },
    ];
    const data = ref([]);
    const searchInput = ref("");
    
    function getData() {
      const path = "http://127.0.0.1:5000/api/auto/postinfo";
      axios
        .get(path)
        .then((res) => {
          data.value = res.data.books;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    onMounted(() => {
      getData();
      setTimeout(() => {
        sessionStorage.clear();
        }, 3 * 60 * 1000);
        });
    
    function onAddData() {}

    const users = window.sessionStorage.getItem('usernames')
    
    const isValid = computed(() => {
      return filteredData.value.every(
        (item) => item.ldapUser && item.password
      );
    });
    

    function KDel(id, namespace, username) {
      axios
        .post(
          "http://127.0.0.1:5000/api/auto/postdel",
          {
            id: id,
            namespace: namespace,
            username: username,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "OK") {
            ElMessageBox({
                title: '提示',
                message: '任务删除成功！',
                type: 'info',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
          }
          else {
            ElMessageBox({
                title: '警告',
                message: '您没有该任务权限！',
                type: 'error',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
          }
          getData();
        })
        .catch((error) => {
          console.error(error);
        });
    }




    function onDel(id, namespace, ldapUser, password) {
      axios
        .post(
          "http://127.0.0.1:5000/api/auto/getinfo",
          {
            id: id,
            namespace: namespace,
            ldapUser: ldapUser,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "OK") {
            ElMessageBox({
                title: '提示',
                message: '重新投递成功！',
                type: 'info',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
          }
          else if (response.data === "AUTH") {
            ElMessageBox({
                title: '提示',
                message: '用户名或密码验证失败！',
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
          }
          else if (response.data === "NS") {
            ElMessageBox({
                title: '提示',
                message: '您没有该任务投递权限！',
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
          }
          else {
            ElMessageBox({
                title: '警告',
                message: '重新投递失败！',
                type: 'error',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
          }
          getData();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    const filteredData = computed(() => {
      if (!searchInput.value) {
        return data.value;
      } else {
        return data.value.filter((item) => {
          const searchStr = searchInput.value.toString().toLowerCase();
          return (
            item.user.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.path.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.namespace.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            item.id.toString().includes(searchStr) ||
            item.memory.toString().includes(searchStr)
          );
        });
      }
    });
    
    function onSearch() {
      console.log(searchInput.value);
    }

    function logout() {
  axios
    .post("http://127.0.0.1:5000")
    .then(() => {
      sessionStorage.clear();
      location.href = "/login"; // 跳转到登录界面
    })
    .catch((error) => {
      console.error(error);
    });
}
    
    return {
      onDel,
      onAddData,
      columns,
      data,
      searchInput,
      filteredData,
      onSearch,
      logout,
      users,
      KDel,
    };
    },
    };
    </script>
    
    <style scoped>
    .green {
    color: black;
    font-size: 15px;
    }
    .user-info {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    }
    #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    }
    </style>