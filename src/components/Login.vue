<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 表单 -->
  <el-form form="loginForm" ref="loginForm" :rules="rules" :model="loginForm" label-width="100px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="loginForm.password"></el-input>
  </el-form-item>
  <el-form-item >
      <el-button type="primary" @click="adminLogin">登录</el-button>
     <el-button >重置</el-button>
  </el-form-item>
  </el-form>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return {
    loginForm:{
      username:'admin',
      password:"123456"
    },
    rules:{
       username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ]
    }
  }
},
methods:{
  adminLogin(){
   //验证表单
   this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
      let res = await this.$axios.post('login',this.loginForm)
      console.log('登录',res.data);
      const {msg,status} =res.data.meta
      if(status == 200){
        localStorage.setItem('token',res.data.data.token)
        this.$message.success(msg)
        this.$router.push('/home')
    }
  else{
    this.$message.error(msg)
  }
          } else {
           
            return false
          }
   })
  //发送请求 
  
},
}
}
</script>

<style scoped lang="less">
.login_container{
  position: relative;
height: 100%;
background-color: #2b4b6b;
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  .avatar{
    position: absolute;
      left: 50%;
      top: -50%;
      transform: translate(-50%,50%);
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #dddddd;
    img{
     
      border-radius: 50%;
      background-color: #eee;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}
}
 .el-form{
  position: absolute;
  bottom: 0;
  // width: 100%;
  padding:0  20px;
}
}
</style>