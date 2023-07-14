<template>
  <!-- 登录 -->
  <el-form
    :model="loginUser"
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="login-form sign-in-form"
  >
    <el-form-item label="用户" prop="email">
      <el-input v-model="loginUser.email" placeholder="Enter Username..." />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginUser.password"
        type="password"
        placeholder="Enter Password..."
      />
    </el-form-item>
    <el-form-item>
      <el-button
        @click="handlelogin('loginForm')"
        type="primary"
        class="submit-btn"
        >提交</el-button
      >
    </el-form-item>
    <!-- 找回密码 -->
    <el-form-item>
   <!--    <p class="tiparea">忘记密码<a>立即找回</a></p>  -->
    </el-form-item>
  </el-form>
</template>
  
  <script lang="ts">
  import { getCurrentInstance } from 'vue'
  import { ref } from 'vue';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { loginUser, rules } from '@/utils/loginValidators'
  import { ElMessageBox } from 'element-plus'
  export default {
    name: 'LoginForm',
    props: {
      loginUser: {
        type: Object,
        required: true
      },
      rules: {
        type: Object,
        required: true
      }
    },
    setup(_props: any) {
      // 通过解构getCurrentInstance，获取this，这里的this就是ctx
      // @ts-ignore
      const { ctx } = getCurrentInstance()
      // 触发登录方法
      const router = useRouter()
      const signUpMode = ref(false)

     /// const now = new Date().getTime()
     /// const expireTime = now + 3 * 60 * 1000


      const handlelogin = (formName:string) => {
        console.log(ctx)
      ctx.$refs[formName].validate((valid:boolean) => {
        if (valid) {
            axios.post('http://127.0.0.1:5000/test', loginUser)
            .then((response) => {
            if (response.data === "OK") {
                window.sessionStorage.setItem('userInfo', 'True' )
                window.sessionStorage.setItem('usernames', loginUser.email )
                router.push('/Home')
                // 登录成功
            }
            else if (response.data === "AUTH") {
              ElMessageBox({
                title: '提示',
                message: '您没有登录权限',
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
                loginUser.email = '';
                loginUser.password = '';
            }
            else {
                ElMessageBox({
                title: '提示',
                message: '用户名或密码错误',
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
                loginUser.email = '';
                loginUser.password = '';
            }
            })
        .catch((error) => {
          // 登录失败
          console.error(error)
          router.push('/404')
        })
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
    })}
      return { handlelogin }
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
  
  
  