<template>
  <div style="padding:30px">
    <h2 style="padding:10px;margin-top: 0px">老人信息展示</h2>
    <div>
      <el-input v-model="search" placeholder="请输入内容" style="width: 20%"></el-input>
      <el-button style="margin-left: 5px;" type="primary" @click="setchFun">查询</el-button>
      <el-button style="margin-left: 5px;" type="primary" @click="add">新增</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="username"
          width="160"
          label="老人姓名">
      </el-table-column>
      <el-table-column
          prop="gender"
          width="142"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="phone"
          width="200"
          label="手机号">
      </el-table-column>
      <el-table-column
          prop="id_card"
          label="身份证号"
          width="220"
          sortable>
      </el-table-column>
      <el-table-column
          prop="birthday"
          label="生日"
          width="132"
          sortable>
        <template #default="scope">
          {{formeDateFun(scope.row.birthday) }}
        </template>
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
          <el-form-item label="姓名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.gender"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.id_card"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="Pick a day"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <video ref="videoElement" style="margin-left: 40px" width="320" height="240" autoplay></video>
          <el-button type="primary" @click="capture" style="margin-left: 80px">录入人脸图像</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

import api from "@/api";
import axios from "axios";

export default {
  data() {
    return {
      search:'',
      form:{},
      dialogVisible:false,
      currentPage:1,
      total:0,
      pageSize:10,
      tableData: [],
      stream: null
    }
  },
  created(){
    this.load()
  },
  methods:{
    load(){
      api.get("http://localhost:8080/api/oldperson/getAllOldPersons",{
        headers: {
          "content-type": "multipart/form-data"
        },
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
    async initializeCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.videoElement.srcObject = stream;
        this.stream = stream;
      } catch (error) {
        console.error('Failed to initialize camera: ', error);
      }
    },
    capture() {
      this.initializeCamera();
      this.countdown = 3;
      const countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(countdownTimer);
          this.takeSnapshot();
        }
      }, 1000);
    },
    takeSnapshot() {
      const videoElement = this.$refs.videoElement;
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      // ctx.drawImage(this.$refs['video'], 0, 0, 447, 482, 0, 0, 200, 200)
      canvas.getContext('2d').drawImage(videoElement, -100, 100, 447, 482, 0, 0, 200, 200);
      const imageDataUrl = canvas.toDataURL('image/jpeg');

      // 发送图像数据到后端
      const name = this.username;
      axios.post('http://localhost:8080/api/video/collect_face', { name, imageDataUrl })
          .then(() => {
            console.log('Face collection completed.');
          })
          .catch((error) => {
            console.error('Failed to collect face:', error);
          });
    },

    handleCurrentChange(page){
      this.currentPage=page
      this.load()
    },
    formeDateFun(time){
      let d = new Date(time);
      let year=d.getFullYear();
      let mounce=d.getMonth() + 1;
      let day=d.getDate()
      let str=`${year}-${ mounce>9?mounce:'0'+mounce}-${day>9?day:'0'+day}`;
      return str;
    },
    setchFun(){
      if(this.search){
        api.get(`http://localhost:8080/api/oldperson/getOldPerson/${this.search.id}`, {}
        ).then(res=>{
          console.log(111,res)
          this.tableData=[res.data]
          this.total=1
        })
      }else{
        this.load()
      }
    },
    add(){
      this.dialogVisible=true
      this.form={}
    },
    save(){
      let formDate=new FormData()
      formDate.append('id',this.form.ID);
      formDate.append('username',this.form.username);
      formDate.append('gender',this.form.gender);
      formDate.append('phone',this.form.phone);
      formDate.append('id_card',this.form.id_card);
      formDate.append('birthday',this.form.birthday);
      if(this.form.ID){
        api.put(`http://localhost:8080/api/oldperson/updateOldPerson/${this.form.ID}`, formDate).then(res=>{
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
      else{
        api.post("http://localhost:8080/api/oldperson/addOldPerson",formDate,{
          headers: {
            "content-type": "multipart/form-data"
          }}).then(res=>{
          console.log(res)
          if(res.code=='200'){
            this.$message({
              type:"success",
              message:"新增成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"新增失败"
            })
          }
          this.load()
          this.dialogVisible=false
        })
      }
    },
    handleEdit(row){
      let obj =JSON.parse(JSON.stringify(row))
      obj.birthday =this.formeDateFun(obj.birthday);
      this.form=obj;
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
        api.delete(`http://localhost:8080/api/oldperson/deleteOldPerson?id_card=${row.id_card}`,{data:requestData},{
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then(res=>{
          if(res.code=='200'){
            this.$message({
              type:"success",
              message:"删除成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"删除失败"
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