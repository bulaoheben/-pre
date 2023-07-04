<template>
  <div id="zong">
    <div id="backimg"></div>
    <div class="card">
      <div class="box11">
        登录
      </div>
      <hr>
      <div class="box31">
        没有账号，点击 <router-link id="Register" to="/Register">注册</router-link>
<!--        &nbsp;-->
      </div>
      <div class="box21">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" id="block" :label-position="labelPosition" >
          <el-form-item label="账号" prop="UserName" id="ei">
            <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.UserName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="Password" id="eis">
            <el-input prefix-icon="el-icon-key" type="password" v-model="ruleForm.Password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-row :gutter="24">
          <!-- <div class="butbox"> -->
          <!-- <div class = "shiny-shadow "> -->
            <el-col :span="10" :offset="3">
            <button  @click="submitForm('ruleForm')"><div class="text"><span>登录</span></div></button>
            </el-col>
          <!-- </div>
          <div class = "shiny-shadow "> -->
            <el-col :span="10">
            <button @click="resetForm('ruleForm')"><span>重置</span></button>
            </el-col>
          <!-- </div> -->
          <!-- </div> -->
        </el-row>
      </div>
    </div>
    <!--
    http://10.13.1.7:8081/login
    -->
  </div>
</template>

<script>
// import Vue from 'vue'
// import {Input,Button,Divider} from 'element-ui'
// import axios from 'axios'
// import * as qs from 'qs'
// Vue.use(Input)
// Vue.use(Button)
//
// Vue.use(Divider)

import axios from "axios";

export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){9,16}$/.test(value)) {
          callback(new Error('请输入10-16位英文字母、数字或者符号(除空格)，且字母、数字和标点符号至少包含两种'))

        }
        callback();
      }
    };

    return {
      labelPosition:'right',
      userToken: '',
      ruleForm: {
        Password: '',
        UserName: '',
      },
      zhud:false,
      loading:false,
      rules: {
        Password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {

    getUser(){
      axios.post(this.global.baseURL + this.global.loginRegisterURL.login, {
        UserName: this.ruleForm.UserName,
        Password: this.ruleForm.Password
      }).then(res => {
        if(res.status == 200){
          console.log("登录信息：")
          console.log(res)
          if(res.data.status == 0){
            this.$message.success("登录成功")
            sessionStorage.setItem("user", JSON.stringify(res.data.data.user))
            this.$router.replace("/")

            // var user = JSON.parse(sessionStorage.getItem("user"))
            // console.log(user)


          } else {
            this.$message.error("登录失败！")
          }



        }else {
          this.$message.error("连接服务器失败")
        }

      })


    },
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.getUser();

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },


    resetForm(formName) {
      // this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
#zong{
  width: 100%;
  height: 710px;
  position: absolute;
  font-family: "fantasy","serif","sans-serif","cursive","monospace";
  background-color: rgba(236,213,178.0.2);/*'STHeiti','Serif','YouYuan'*/
}/*rgba(255, 255, 255, 0.2)*//* 'Hiragino Sans GB', 'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei'*/
#backimg {
  background: url('../assets/login.png');
  /*background-color: rgba(255, 255, 255, 0.2);*/
  width: 100%;
  height: 100%;
  /*position: absolute;*/
  /*z-index: -1;*/
  background-size: cover;
  top: 0;
  left: 0;
}
.box11{
  width: 100%;
  height: 30%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  white-space: pre;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #f8f8f2;
} /* color: #ececec; */
.box21{
  width: 100%;
  height: 70%;
}
.butbox{
  width: 100%;
  height: 50%;
}
.box31{
  padding-right: 1rem;
  text-align: right;
  color: #ececec;
}
#Register{
  color: #409EFF;
}
a{
  text-decoraction: none;
}
.router-link-active {
  text-decoration: none;
}
.card{
  position: fixed;
  top:120px;
  left:0;
  bottom:0;
  right:0;
  width:30%;
  height:70%;
  margin:auto;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius:40px;
}
#block{
  text-align:center;
  height: 50%;
}

.box21 .el-form-item__label{
  color: #ececec!important;
}

#ei{
  margin: 5% 15% 10% 5%;
}
#eis{
  margin: 10% 15% 10% 5%;
}
#but{
  margin: 15% 25% 10% 5%!important;
}
#shiny-shadow {
      display: flex;
      /* align-items: center;
      justify-content: center; */
      height: 100vh;
      background: #1c2541;
}

button {
      border: 2px solid white;
      background: transparent;
      text-transform: uppercase;
      color: white;
      padding: 15px 50px;
      outline: none;
      overflow: hidden;
      position: relative;
}

span {
      z-index: 20;
}

button:after {
      content: '';
      display: block;
      position: absolute;
      top: -36px;
      left: -100px;
      background: white;
      width: 50px;
      height: 125px;
      opacity: 20%;
      transform: rotate(-45deg);
}

button:hover:after {
      left: 120%;
      transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
      -webkit-transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
}
text {
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      opacity: 0;
      -webkit-transform: translate3d(0, -4%, 0);
      transform: translate3d(0, -4%, 0);
      -webkit-transition: 280ms ease-out;
      transition: 280ms ease-out;
      text-align: center;
}

</style>
<style>

.box21 .el-form-item__label{
  color: #ececec !important;
}
</style>
<style>
#border-btn {
      /* display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh; */
}

    button {
      border: 0;
      border-radius: 10px;
      background: #2ec4b6;
      /* 文字变大写 */
      text-transform: uppercase;
      color: white;
      font-size: 16px;
      font-weight: bold;
      padding: 15px 30px;
      outline: none;
      position: relative;
      /* 添加动画，对元素的 border-radius 添加 3s 的延迟效果 */
      transition: border-radius 3s;
      -webkit-transition: border-radius 3s;
    }

    button:hover {
      border-bottom-right-radius: 50px;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 10px;
    }
</style>
