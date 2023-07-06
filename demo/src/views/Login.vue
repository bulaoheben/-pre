<template>
<div style="width:100%;height:100vh;overflow: hidden" id="login">
  <div style="width:400px;margin :150px auto">
    <div style="color: darkblue;font-size: 24px;text-align: center;margin-top:90px">智能养老系统</div>
    <div style="color:black;;font-size: 20px;text-align: center;margin-top:50px">登录</div>
    <el-form ref="form" :model="form"  :rules="rules">
      <el-form-item ref="form" :model="form" prop="username" style="margin-top:20px">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:15px" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;margin-top:15px" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import api from "@/api";
import res from "core-js/internals/is-forced";

export default {
  name: "Login",
  data(){
    return{
      form:{},
      rules:{
        username:[{
          required:true,
          message:'请输入用户名',
          trigger:blur
        }],
        password:[{
          required:true,
          message:'请输入密码',
          trigger:blur
        }]
      }
    }
  },
  methods:{
  login(){
    this.$refs['form'].validate((valid=>{
      if(valid){
        api.get('/login',this.form)
            .then(res=>{
              this.form = res.data;  //返回数据显示到text
              console.log(res.data);// 返回的数据
              this.$message({
                type:"success",
                message:"登录成功"
              })
            })
            .catch(err=>{
              this.form = 'error' + err;
            });
      }
    }))
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