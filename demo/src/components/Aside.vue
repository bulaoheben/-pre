<template>
<div>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
          style="width:200px; min-height:calc(100vh - 50px)"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location/></el-icon>
            <span style="font-size:16px">主页</span>
          </template>
            <el-menu-item index="1-1">1</el-menu-item>
            <el-menu-item index="1-2">2</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu/></el-icon>
            <span style="font-size:16px">人员管理</span>
          </template>
          <el-menu-item index="2-1">信息列表</el-menu-item>
          <el-menu-item index="2-2">健康状况</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><document/></el-icon>
            <span style="font-size:16px">事件记录</span>
          </template>
          <el-menu-item index="3-1">交互检测</el-menu-item>
          <el-menu-item index="2-2">陌生人检测</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span style="font-size:16px">统计分析</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>



</div>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>