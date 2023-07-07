<template>
  <div style="padding:100px">
    <h2 style="padding:10px">用户信息展示</h2>
    <div>
      <el-button @click="add" style="margin-bottom: 5px">新增</el-button>
    </div>
    <div>
      <el-input v-model="search" placeholder="请输入内容" style="width: 20%"></el-input>
      <el-button style="margin-left: 5px;" @click="load">查询</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="编号"
          sortable>
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码">
      </el-table-column>
      <el-table-column
          prop="realName"
          label="真实姓名">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
            <el-button
                size="mini"
                type="primary"
                style="margin-left: 5px"
                slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding:10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>


// import api from "@/api";

export default {
  data() {
    return {
      search:'',
      form:{},
      dialogVisible:false,
      currentPage:1,
      total:0,
      pageSize:10,
      tableData: []
    }
  },
  // created(){
  //   this.load()
  // },
  methods:{
  //   load(){
  //     api.get("http://localhost:8080/api/userlist",{
  //       headers: {
  //         "content-type": "multipart/form-data"
  //       },
  //       params:{
  //         pageNum:this.currentPage,
  //         pageSize:this.pageSize,
  //         search:this.search
  //       }
  //     }).then(res=>{
  //       console.log(res)
  //       this.tableData=res.data.records
  //       this.total=res.data.total
  //     })
  //   },
  //   handleSizeChange(pageSize){
  //     this.pageSize=pageSize
  //     this.load()
  //   },
  //   handleCurrentChange(pageNum){
  //     this.currentPage=pageNum
  //     this.load()
  //   },
  //   add(){
  //     this.dialogVisible=true
  //     this.form={}
  //   },
  //   save(){
  //     if(this.form.id){
  //       api.get("http://localhost:8080/api/editUser",this.form,{
  //         headers: {
  //           "content-type": "multipart/form-data"
  //         }}).then(res=>{
  //         console.log(res)
  //         if(res.code=='0'){
  //           this.$message({
  //             type:"success",
  //             message:"更新成功"
  //           })
  //         }else{
  //           this.$message({
  //             type:"error",
  //             message:"更新失败"
  //           })
  //         }
  //         this.load()
  //         this.dialogVisible=false
  //       })
  //     }
  //     else{
  //       request.post("http://localhost:8080/user",this.form).then(res=>{
  //         console.log(res)
  //         if(res.code=='0'){
  //           this.$message({
  //             type:"success",
  //             message:"新增成功"
  //           })
  //         }else{
  //           this.$message({
  //             type:"error",
  //             message:res.msg
  //           })
  //         }
  //         this.load()
  //         this.dialogVisible=false
  //       })
  //     }
  //   },
    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogVisible=true
    },
  //   handleDelete(id){
  //     console.log(id)
  //     api.delete("http://localhost:8080/api/deleteUser"+id,this.form,{
  //       headers: {
  //         "content-type": "multipart/form-data"
  //       }}).then(res=>{
  //       if(res.code=='0'){
  //         this.$message({
  //           type:"success",
  //           message:"删除成功"
  //         })
  //       }else{
  //         this.$message({
  //           type:"error",
  //           message:res.msg
  //         })
  //       }
  //       this.load()
  //     })
  //   }
  // }
}}
</script>
