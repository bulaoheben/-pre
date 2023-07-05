<template>
  <div style="width:100%;height:100vh;overflow: hidden" id="reg">
    <div style="width:400px;margin :150px auto">
      <div style="color:black;;font-size: 24px;text-align: center;margin-top:130px">欢迎注册</div>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form style="margin-top:30px;margin-right: 5px">
              <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="用户名："></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form style="margin-top:30px;margin-left: 5px">
              <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="密码："></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form style="margin-top:1px;margin-right: 5px">
              <el-form-item prop="realname">
                <el-input v-model="form.real" placeholder="真实姓名："></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form style="margin-top:1px;margin-left: 5px">
              <el-form-item prop="sex">
                <el-input v-model="form.sex" placeholder="性别："></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form style="margin-top:1px;margin-right: 5px">
              <el-form-item prop="email">
                <el-input v-model="form.email" placeholder="邮箱："></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form style="margin-top:1px;margin-left: 5px">
              <el-form-item prop="phone">
                <el-input v-model="form.phone" placeholder="手机号码："></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button style="width: 100%;margin-top:15px" type="primary" @click="reg">注册</el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      form: {}
    }
  },
  methods: {
    reg() {

    }
  }
}
</script>

<style scoped>
#reg{
  background: url("../assets/images/background.png") no-repeat;
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>