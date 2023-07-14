<template>
    <!-- 登录 -->
    <el-form
      :model="registerUser"
      :rules="registerRules"
      ref="registerForm"
      label-width="100px"
      class="register-form sign-up-form"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="registerUser.name" placeholder="Enter Name..." />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerUser.email" placeholder="Enter Email..." />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerUser.password"
          type="password"
          placeholder="Enter Password..."
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input
          v-model="registerUser.password2"
          type="password"
          placeholder="Enter Password again..."
        />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="registerUser.role">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="用户" value="user"></el-option>
          <el-option label="游客" value="visitor"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleRegister('registerForm')"
          type="primary"
          class="submit-btn"
          >提交</el-button
        >
            <h1>注册功能暂未开放！</h1>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts">
  import { getCurrentInstance } from 'vue'
  export default {
    name: 'registerForm',
    props: {
      registerUser: {
        type: Object,
        required: true
      },
      registerRules: {
        type: Object,
        required: true
      }
    },
    setup(props: any) {
      // 通过解构getCurrentInstance，获取this，这里的this就是ctx
      // @ts-ignore
      const { ctx } = getCurrentInstance()
      // 触发登录方法
      const handleRegister = (formName: string) => {
        console.log(ctx)
        ctx.$refs[formName].validate((valid: boolean) => {
          if (valid) {
            console.log('submit!')
          } else {
            console.log('error submit!')
            return false
          }
        })
      }
      return { handleRegister }
    }
  }
  </script>
  <style scoped>
  /* register */
  .login-form,
  .register-form {
    background-color: #fff;
    padding: 50px 80px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
  }
  
  .submit-btn {
    width: 100%;
  }
  .tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
    width: 100%;
  }
  .tiparea a {
    color: #409eff;
  }
  </style>
  
  