<template>
  <div style="padding:30px">
    <h2 style="padding:10px;margin-top: 0px">管理员信息展示</h2>
    <div>
      <el-input v-model="search" placeholder="请输入内容" style="width: 20%"></el-input>
      <el-button style="margin-left: 5px;" type="primary" @click="load">查询</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="ID"
          label="编号"
          width="65"
          sortable>
      </el-table-column>
      <el-table-column
          prop="UserName"
          width="140"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="Password"
          width="140"
          label="密码">
      </el-table-column>
      <el-table-column
          prop="REAL_NAME"
          width="140"
          label="真实姓名">
      </el-table-column>
      <el-table-column
          prop="SEX"
          width="140"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="EMAIL"
          width="140"
          label="邮箱">
      </el-table-column>
      <el-table-column
          prop="PHONE"
          width="140"
          label="手机号">
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">编辑</el-button>

            <el-button
                size="mini"
                type="danger"
                style="margin-left: 5px" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
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
      <el-dialog title="提示"  v-model="dialogVisible"  width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.UserName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.Password"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="form.REAL_NAME"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.SEX"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.EMAIL"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.PHONE"></el-input>
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

import api from "@/api";

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
  // data(){
  // return{
  //     userName: 'syd',
  //     Password:"123321",
  //     REAL_NAME:'王一丁',
  //     SEX:"female",
  //     EMAIL: '20301065@bjtu.edu.cn',
  //     PHONE:"13671029613"
  //   }
  // },
  created(){
    this.load()
  },
  methods:{
    load(){
      api.get("http://localhost:8080/api/userList",{
        // headers: {
        //   "content-type": "multipart/form-data"
        // },
        params:{
          page:this.currentPage,
          per_page:this.pageSize,
          search:this.search
        }
      }).then(res=>{
        console.log(111,res)
        this.tableData=res.data.items
        this.total=res.data.total_items || 0
      })
    },
    handleSizeChange(per_page){
      this.pageSize=per_page
      this.load()
    },
    handleCurrentChange(page){
      this.currentPage=page
      this.load()
    },
    // add(){
    //   this.dialogVisible=true
    //   this.form={}
    // },
    save(){
      if(this.form.ID){
        api.put(`http://localhost:8080/api/editUser?id=${this.form.ID}`,this.form,{
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then(res=>{
          console.log(res)
          if(res.code=='200'){
            this.$message({
              type:"success",
              message:"更新成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"更新失败"
            })
          }
          this.load()
          this.dialogVisible=false
        })
      }
      // else{
      //   api.post("http://localhost:8080/addEmployee",this.form).then(res=>{
      //     console.log(res)
      //     if(res.code=='200'){
      //       this.$message({
      //         type:"success",
      //         message:"新增成功"
      //       })
      //     }else{
      //       this.$message({
      //         type:"error",
      //         message:res.msg
      //       })
      //     }
      //     this.load()
      //     this.dialogVisible=false
      //   })
      // }
    },
    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogVisible=true
    },
    handleDelete(index,row){
      this.$confirm(
          '确定要删除吗？',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
            api.delete("http://localhost:8080/api/deleteUser?id="+row.ID,{},{
            }).then(res=>{
              if(res.code=='200'){
                this.$message({
                  type:"success",
                  message:"删除成功"
                })
              }else{
                this.$message({
                  type:"error",
                  message:res.msg
                })
              }
              this.load()
          })
      }).catch(()=>{
        console.log('取消')
      })
    }
  }
}
</script>
