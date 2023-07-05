<template>
<div style="width:100%;height:100vh;overflow: hidden" id="login">
  <div style="width:400px;margin :150px auto">
    <div style="color: darkblue;font-size: 24px;text-align: center;margin-top:90px">智能养老系统</div>
    <div style="color:black;;font-size: 20px;text-align: center;margin-top:50px">登录</div>
    <el-form style="margin-top:20px">
      <el-input v-model="form.username"></el-input>
    </el-form>
    <el-form style="margin-top:15px">
      <el-input v-model="form.password" show-password></el-input>
    </el-form>
    <el-form-item>
      <el-button style="width: 100%;margin-top:15px" type="primary" @click="login">登录</el-button>
    </el-form-item>
  </div>
</div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      form:{

      }
    }
  },
  methods:{
  login(){

  }
  }
}
</script>

<style scoped>
#login{
  background: url("../assets/images/background.png") no-repeat;
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>