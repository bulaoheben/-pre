<template>
  <div class="box">
    <div class="right">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="padding: 10px 0 2px 10px; font-size: 1.5em;">首页</el-breadcrumb-item>
        <el-breadcrumb-item style="padding: 15px 0 2px 0; font-size: 1.1em">管理员信息</el-breadcrumb-item>

      </el-breadcrumb>
      <div class="videos">
        <el-main class="show">
          <div class="basic">
            <div class="card11">
              <el-col :span="4" :offset="1">
                <div class="demo-basic--circle" style="margin-top: 5%">
                  <div class="block" style="width: 100%;height: 100%;">
                    <el-avatar :size="60" :src="user['logoimage']"></el-avatar>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="sub-title" style="vertical-align: middle">
                  <h2>{{ user['userName'] }}</h2>
                </div>
              </el-col>
              <el-col :span="2" :offset="6">
                <el-button style="margin-top: 30%; margin-left: 200%;color: #fffa12" icon="el-icon-edit" type="text"
                  @click="$router.push('/AdminDetails')">修改</el-button>

              </el-col>
            </div>
            <div class="card12">
              <el-row :gutter="20" style="padding-top: 10px">
                <el-col :span="14" style="padding-left: 8%">
                  <div class="grid-content bg-purple" style="display: flex;align-items: center;">
                    <i class="el-icon-user"></i>
                    <h3>&nbsp;姓名:&nbsp;</h3>
                    <span>{{ user['real_name'] }}</span>
                  </div>
                </el-col>
                <el-col :span="10">
                  <div class="grid-content bg-purple" style="display: flex;align-items: center;">
                    <i class="el-icon-female"></i>
                    <i class="el-icon-male"></i>
                    <h3>&nbsp;性别:&nbsp;</h3>
                    <span>{{ user['sex'] }}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24" style="padding-left: 8%">
                  <div class="grid-content bg-purple" style="display: flex;align-items: center;">
                    <i class="el-icon-position"></i>
                    <h3>&nbsp;邮箱:&nbsp;</h3>
                    <span>{{ user['email'] }}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24" style="padding-left: 8%">
                  <div class="grid-content bg-purple" style="display: flex;align-items: center;">
                    <i class="el-icon-phone-outline"></i>
                    <h3>&nbsp;手机:&nbsp;</h3>
                    <span>{{ user['mobile'] }}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24" style="padding-left: 8%">
                  <div class="grid-content bg-purple" style="display: flex;align-items: center;">
                    <i class="el-icon-phone-outline"></i>
                    <h3>&nbsp;固话:&nbsp;</h3>
                    <span>{{ user['phone'] }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class = "eventChart">
            <div id="chartLineBox1" style="width: 90%;height: 45vh;margin-left: 35px;margin-top: 7px;"> </div>
          </div>
        </el-main>
      <div class="bottom">
         <el-main class="bottom1">
            <div class="workChart">
               <div id="chartLineBox2" style="width: 90%;height: 40vh;"> </div>
            </div>
         </el-main>


      </div>
        <!-- <el-main class="infom" style="display: none">
          <div class="card1" @click="imginto('fall')">
            <img src="../assets/diedao.png">
            <div style="padding-top: 16.5%">
              <span style="color: white">跌倒</span>
            </div>
          </div>
          <div class="card2" @click="imginto('activity')">
            <img src="../assets/jiaotan.png">
            <div style="padding-top: 10%">
              <span style="color: white">交互</span>
            </div>
          </div>
          <div class="card3" @click="imginto('fence')">
            <img src="../assets/moshengrenruqin.png">
            <div style="padding-top: 10%">
              <span style="color: white">入侵</span>
            </div>
          </div>
          <div class="card4" @click="imginto('strangers')">
            <img src="../assets/shequjingqing_moshengrenyichangzengjia.png">
            <div style="padding-top: 10%">
              <span style="color: white">陌生人</span>
            </div>
          </div>
          <div class="card5" @click="imginto('smile')">
            <img src="../assets/zu1783.png">
            <div style="padding-top: 10%">
              <span style="color: white">表情</span>
            </div>
          </div> -->
        <div class="tip">
          <el-footer>Copyright &nbsp; 2022 &nbsp; BJTU_安心养老团队</el-footer>
        </div>


      </div>




    </div>

  </div>
</template>



<script>
import * as echarts from 'echarts';
import LeftNavVue from '../components/LeftNav.vue';
export default {
  name: "HomeInform",

  data() {
    return {
      // url: 'http://192.168.3.10:8080/',//http://192.168.159.128:5000/
      url: 'http://192.168.0.155:5000/',//http://192.168.159.128:5000/
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
      user: [],

      urls: [
        require('../assets/carousel1.png'),
        require('../assets/carousel2.png'),
        require('../assets/carousel3.png'),
        require('../assets/carousel4.png'),
      ],
    }
  },
  created() {

    if (sessionStorage.getItem("user") != null)
      //获取登录的用户信息
      this.user = JSON.parse(sessionStorage.getItem("user"))

  },
  methods: {
    //进入截图界面
    imginto(name) {
      console.log('dsad')
      this.$router.push({
        path: `/Shoot/${name}`
      });
    },

    //进入修改界面
    goDetail() {
      this.$router.push({
        path: `/AdminDetails`
      });
    },
  },
  mounted() {
    this.chartLine1 = echarts.init(document.getElementById('chartLineBox1'));
    this.chartLine2 = echarts.init(document.getElementById('chartLineBox2'));
    // 指定图表的配置项和数据
    var option1 = {
      title: {
        text: '事件监测表',
        padding: [0,0],//[5,10] | [ 5,6, 7, 8] ,标题内边距
        left: '50%',//'5' | '5%'，title 组件离容器左侧的距离
        right: '50%',//'title 组件离容器右侧的距离
        top: '1%',//title 组件离容器上侧的距离
      },
      tooltip: {              //设置tip提示
        trigger: 'axis'
      },

      legend: {               //设置区分（哪条线属于什么）
        data: ['交互事件','陌生人事件','跌倒事件','入侵事件'],
        left: '5%',
        top: 'bottom',
        padding: [10,50,10,10]
      },
      color: ['#FA6F53','#0be100','#38230c','#2c47f5'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
      xAxis: {                //设置x轴
        type: 'category',
        boundaryGap: false,     //坐标轴两边不留白
        data: ['2022-7-6', '2022-7-7', '2022-7-8', '2022-7-9', '2022-7-10', '2022-7-11', '2022-7-12',],
        name: '日期',           //X轴 name
        nameTextStyle: {        //坐标轴名称的文字样式
          color: '#FA6F53',
          fontSize: 16,
          padding: [0, 0, 0, 20]
        },
        axisLine: {             //坐标轴轴线相关设置。
          lineStyle: {
            color: '#FA6F53',
          }
        }
      },
      yAxis: {
        name: '事件产生次数',
        nameTextStyle: {
          color: '#FA6F53',
          fontSize: 16,
          padding: [0, 0, 10, 0],
        },
        axisLine: {
          lineStyle: {
            color: '#FA6F53',
          }
        },
        type: 'value'
      },
      series: [
        {
          name: '交互事件',
          data: [10, 4, 7, 9, 5, 11, 13],
          type: 'line',
          lineStyle: {
            normal: {
              color: '#e17500',
            }
          }
        },
        {
          name: '陌生人事件',
          data: [0, 2, 4, 1, 2, 6, 7],
          type: 'line',
          lineStyle: {
            normal: {
              color: '#0be100',
            }
          },
        },
        {
          name: '跌倒事件',
          data: [0, 2, 0, 1, 0, 1, 4],
          type: 'line',
          lineStyle: {
            normal: {
              color: '#38230c',
            }
          },
        },
        {
          name: '入侵事件',
          data: [2, 4, 5, 2, 0, 2, 0],
          type: 'line',
          lineStyle: {
            normal: {
              color: '#2c47f5',
            }
          },
        }

      ]
    };

    var option2 = {
      title: {
        text: '义工工时统计',
        padding: [0,0],//[5,10] | [ 5,6, 7, 8] ,标题内边距
        left: '50%',//'5' | '5%'，title 组件离容器左侧的距离
        right: '50%',//'title 组件离容器右侧的距离
        top: '1%',//title 组件离容器上侧的距离
      },

      tooltip: {              //设置tip提示
        trigger: 'axis'
      },

      color: ['#FA6F53','#0be100','#38230c'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
      xAxis: {                //设置x轴
        type: 'category',
        boundaryGap: false,     //坐标轴两边不留白
        data: ['2022-7-6', '2022-7-7', '2022-7-8', '2022-7-9', '2022-7-10', '2022-7-11', '2022-7-12',],
        name: '日期',           //X轴 name
        nameTextStyle: {        //坐标轴名称的文字样式
          color: '#FA6F53',
          fontSize: 16,
          padding: [0, 0, 0, 20]
        },
        axisLine: {             //坐标轴轴线相关设置。
          lineStyle: {
            color: '#FA6F53',
          }
        }
      },
      yAxis: {
        name: '工作时间（分钟）',
        nameTextStyle: {
          color: '#FA6F53',
          fontSize: 16,
          padding: [0, 0, 0, 0]
        },
        axisLine: {
          lineStyle: {
            color: '#FA6F53',
          }
        },
        type: 'value'
      },
      series: [
        {
          name: '张三',
          data: [125, 80, 40, 70, 0, 110, 130],
          type: 'line',
          lineStyle: {
            normal: {
              color: '#e17500',
            }
          }
        },
        {
          name: '李四',
          data: [85, 150, 40, 40, 80, 60, 20],
          type: 'line',
          lineStyle: {
            normal: {
              color: '#0be100',
            }
          },
        },
        {
          name: '王五',
          data: [70, 120, 60, 110, 50, 10, 170],
          type: 'line',
          lineStyle: {
            normal: {
              color: '#38230c',
            }
          },
        }

      ],
      legend: {               //设置区分（哪条线属于什么）
        data: ['张三','李四','王五'],
        left: '5%',
        top: 'bottom'
      }
    };

    // 使用刚指定的配置项和数据显示图表。
    this.chartLine1.setOption(option1);
    this.chartLine2.setOption(option2);
  },

}


</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  /*background-color: #766d17;*/
  display: flex;
}

.right {
  width: 100%;
  height: 650px;
  background-color: #e17500;
  /*margin-right:0;*/
  margin: 53px 0 0 0;
  /*z-index: 1;*/
}

.bottom {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  /*margin-right:0;*/
  /*z-index: 1;*/
}

.videos {
  width: 100%;
  height: 670px;
}

.show {
  width: 100%;
  height: 70%;
  background-color: #ffffff;
  flex-direction:row;
  display: flex;
}

.bottom1 {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  flex-direction:row;
  display: block;
  margin-left: 100px;
}

.workChart {
  display: flex;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  text-align: center;
  /*background: url('../assets/CCTV1.png');*/
  /*background-size: cover;*/
}

.basic {
  width: 50%;
  height: 100%;
  background-color: #ffae35;
  margin-right: 10px;
  border-radius: 10px;
}

.eventChart {
  width: 90%;
  height: 100%;
  margin-left: 30px;
  background-color: #ffe9cf;
  border-radius: 10px 10px 10px 10px;
  /*background-color: burlywood;*/
}

.card11 {
  width: 100%;
  height: 20%;
}

.card12 {
  width: 100%;
  height: 80%;
  background-color: #ffe9cf;
  border-radius: 0 0 10px 10px;
}

.card1 {
  width: 20%;
  height: 99%;
  margin: 0 5px;
  background-color: #226e90;
  border: 1px solid #ffffff;
  border-radius: 30px;
}

.card1:hover {
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}

.card2 {
  width: 20%;
  height: 99%;
  margin: 0 5px;
  background-color: #226e90;
  border: 1px solid #ffffff;
  border-radius: 30px;
}

.card2:hover {
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}

.card3 {
  width: 20%;
  height: 99%;
  margin: 0 5px;
  background-color: #226e90;
  border: 1px solid #ffffff;
  border-radius: 30px;
}

.card3:hover {
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}

.card4 {
  width: 20%;
  height: 99%;
  margin: 0 5px;
  background-color: #226e90;
  border: 1px solid #ffffff;
  border-radius: 30px;
}

.card4:hover {
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}

.card5 {
  width: 20%;
  height: 99%;
  margin: 0 5px;
  background-color: #226e90;
  border: 1px solid #ffffff;
  border-radius: 30px;
}

.card5:hover {
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.3);
}

.chartLineBox1{
  height: auto;
  width: 100%;
  background-color: #546bff;
  text-align: center;
}

.tip {
  height: auto;
  width: 100%;
  background-color: #e8af63;
  text-align: center;
  padding-top: 20px;
}

/* .el-main img {
  width: 50%;
  height: auto;
  margin-top: 10%;
} */
</style>

<style>
span.el-breadcrumb__inner {
  color: #ffffff;
}

/*.el-carousel__item, .el-carousel__mask {*/
/*  height: 100%;*/
/*  top: 0!important;*/
/*  bottom: 30px;*/
/*  left: 0;*/
/*  position: absolute;*/
/*}*/
</style>

