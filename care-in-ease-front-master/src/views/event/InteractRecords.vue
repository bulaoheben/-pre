<template>
  <div id="OldManInfo"  class="box">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="background: #ded38c;padding-bottom: 4px;margin-bottom: 30px">
        <el-breadcrumb-item :to="{path:'/InteractRecords'}" style="padding: 10px 0 2px 10px; font-size: 1.5em;color: black;">事件历史记录</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <!--搜索框-->
        <el-row :gutter="10">
          <el-col :span="4" class="grid">
            <el-select v-model="chosenValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" class="grid">
            <el-button type="success" icon="el-icon-receiving" @click.prevent="search()">筛选</el-button>
          </el-col>
          <el-col :span="2" class="grid" style="padding-left: 50px">
            <el-button type="info" @click="listAllInfo()">清空筛选</el-button>
          </el-col>
        </el-row>

        <br>
        <!--表格数据及操作-->
        <!-- 加载设置 -->
        <el-table
          :cell-style="{ textAlign: 'center' }"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          align="center"
          fit
          :data="filteredList.slice((currPage-1)*pageSize,currPage*pageSize)" border style="width: 100%"
          ref="multipleTable" tooltip-effect="dark">
          <el-table-column prop="no" width="90px" label="id" sortable></el-table-column>
          <el-table-column prop="snapshot" width="320px" label="事件截屏">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.snapshot"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="event_type" width="120px" label="事件类型编号"></el-table-column>
          <el-table-column prop="event_desc" width="480px" label="事件描述"></el-table-column>
          <el-table-column prop="event_location" width="120px" label="事件发生房间号"></el-table-column>
          <el-table-column prop="event_date" width="120px" label="发生日期" :formatter="dateFormat" sortable></el-table-column>
          <el-table-column label="删除事件记录">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click.prevent="open(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <br>
      <div class="page-block">
        <el-pagination
          layout="prev, pager, next"
          :total="filteredList.length"
          :page-size="pageSize"

          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>

    </el-main>

    <div class="tip">
      <el-footer></el-footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventInfo",
  created() {
    this.listAllInfo();
  },

  data() {
    return {
      type: 1,
      //查询输入框数据
      input: '',
      list: [], // 存放列表数据
      filteredList: [], //处理过的列表数据，用于搜索

      total: 0,
      currPage: 1,  //默认第一页
      pageSize: 8, //默认展示5条数据

      //下选框
      options: [{
        value: '1',
        label: '交互事件'
      }, {
        value: '2',
        label: '陌生人事件'
      }, {
        value: '3',
        label: '跌倒事件'
      }, {
        value: '4',
        label: '入侵事件'
      }],

      //被选中的值
      chosenValue: '选择事件类型'

    };
  },

  methods: {

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currPage = 1;
      this.pageSize = val;
    },

    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currPage = val;
    },

    //列出数据
    listAllInfo() {
      this.chosenValue='请选择事件类型'
      // 由于已经导入了 Vue-resource这个包，所以 ，可以直接通过  this.$http 来发起数据请求
      this.$http.get(this.global.baseURL + this.global.eventURL.getAll).then(result => {
        // 注意： 通过 $http 获取到的数据，都在 result.body 中放着
        // eslint-disable-next-line no-redeclare
        // var result = result.body;
        console.log(result.status)

        if (result.status === 200) {
          // 成功了
          this.list = result.data.data.Info;
          // this.list = result.data;
          this.filteredList = this.list;
          console.log("@@@");
          console.log(result.data.data.Info);
        } else {
          // 失败了
          this.$message.error("获取数据失败！");
        }
      });
    },

    //时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "未填";
      }
      return this.$moment(date).format("YYYY-MM-DD");
    },

    //删
    deleteInfo(index, row) {
      console.log("删除的id是：")
      console.log(row.no)
      this.$http.delete(this.global.baseURL + this.global.eventURL.delete + "/" + parseInt(row.no)).then(result => {
        console.log("删除的id是：")
        console.log(row.no)
        if (result.status === 200) {
          // 删除成功
          console.log("删除成功！");
          this.listAllInfo();
        } else {
          this.$message.error("删除失败！");
        }
      });
    },

    //查
    search() {
      this.currPage = 1

      if (this.chosenValue === '1')
        this.filteredList = this.list.filter(data => data['event_type'] == this.chosenValue)
      else if (this.chosenValue === '2')
        this.filteredList = this.list.filter(data => data['event_type'] == this.chosenValue)
      else if (this.chosenValue === '3')
        this.filteredList = this.list.filter(data => data['event_type'] == this.chosenValue)
      else if (this.chosenValue === '4')
        this.filteredList = this.list.filter(data => data['event_type'] == this.chosenValue)

        // this.filteredList = this.list.filter(data => data[this.chosenValue].includes(this.input))

    },

    //进入编辑界面
    updateInfo(index, row) {
      this.$router.push({
        path: `/OldManDetails/${row.id}`
      });
    },

    open(index, row) {
      this.$confirm('是否删除该条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.deleteInfo(index, row),

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //进入头像界面
    imginto(index, row, type) {
      console.log('dsad')
      this.$router.push({
        path: `/ImageDetails/${row.no}/${type}`,
      });
    },
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}

.el-main {
  width: 100%;
  height: 840px;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 30px;
  margin-top: 50px;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-button {
  width: 80px;
}
.span{
  color: #333;
}

.tip {
  height: auto;
  width: 100%;
  /*background-color: #ffb352;*/
  text-align: center;
  padding-top: 20px;
}
</style>

<style>
.el-message-box__btns{
  display: flex;
}
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #333 !important;
}
</style>
