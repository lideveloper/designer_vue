<template>
  <div class="ui-bg">
    <span class="title">进度信息</span>
    <el-popover
      ref="popoverlog"
      placement="bottom"
      width="400"
      trigger="click">
      <el-table height="200" :data="gridData">
        <el-table-column width="160" property="date" label="步骤"></el-table-column>
        <el-table-column width="80" property="name" label="人员"></el-table-column>
        <el-table-column width="160" property="address" label="时间"></el-table-column>
      </el-table>
    </el-popover>

    <span class="log" v-popover:popoverlog>查看日志></span>

    <div class="arrow" style="float: left;width: 42px;">
      <div class="swiper-button-prev button"></div>
    </div>
    <div class="steps-area">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(step,index) in steps" :key="step.code">
          <div class="ui-step " :class="activeNum==index?'active':''">
            <div class="dept">{{step.dept}}</div>
            <div>
              <div v-if="index != 0" class="process" :class="activeNum>=index?'active':''"></div>
              <div class="step-icon">
                {{index + 1}}
              </div>
              <div v-if="index != steps.length-1" class="process right" :class="activeNum>index?'active':''"></div>
            </div>
            <div class="name">{{step.name}}</div>
          </div>

        </swiper-slide>
      </swiper>
    </div>
    <div class="arrow" style="float: right;">
      <div class="swiper-button-next button"></div>
    </div>
  </div>

</template>

<script>
  // require styles
  import 'swiper/dist/css/swiper.css'

  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    props: {'active': String},
    data() {
      return {
        steps: [
          {name: '未邀约', dept: '陈列师', code: '1'},
          {name: '洽谈', dept: '陈列师', code: '2'},
          {name: '签订设计合同', dept: '陈列师', code: '3'},
          {name: '财务确认', dept: '财务部', code: '4'},
          {name: '设计分配', dept: '设计部', code: '5'},
          {name: '预下单', dept: '设计部', code: '6'},
          {name: '比价中', dept: '陈列师', code: '7'},
          {name: '上传清单', dept: '设计部', code: '8'},
          {name: '产品清单确认', dept: '产品部', code: '9'},
          {name: '拟定采购合同', dept: '陈列师', code: '10'},
          {name: '收取预付款', dept: '财务部', code: '11'},
          {name: '产品部下单', dept: '产品部', code: '12'},
          {name: '产品状态跟踪', dept: '产品部', code: '13'},
          {name: '收取客户尾款', dept: '财务部', code: '14'},
          {name: '对接工程部', dept: '产品部', code: '15'},
          {name: '提货', dept: '工程部', code: '16'},
          {name: '安装验收', dept: '工程部', code: '17'},
          {name: '完成验收', dept: '陈列师', code: '18'}
        ],
        gridData: [{
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }, {
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }, {
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }, {
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }, {
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }, {
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }, {
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }, {
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }, {
          date: '1、上海市普陀区',
          name: '王小虎',
          address: '2016-05-02 23:00:01'
        }],
        swiperOption: {
          slidesPerView: 9,
          spaceBetween: 0,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      activeNum: {
        get: function () {
          for (var i in this.steps) {
            if (this.active == this.steps[i].code) {
              return i;
            }
          }
          return -1;
        },
        set: function (val) {

        }
      }
    },
    mounted() {
      // current swiper instance
      var point = -1;
      var activeNum = parseInt(this.activeNum);
      if (activeNum + 4 > this.steps.length) {
        point = 11;
      } else if (activeNum - 4 < 0) {
        point = 0;
      } else {
        point = activeNum - 4;
      }
      this.swiper.slideTo(point, 0, false)
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>
  .ui-bg {

    width: 1000px;
    height: 129px;
    background: #f0f0f0;
    border-radius: 8px;
    position: relative;
  }

  .title {
    display: inline-block;
    position: absolute;
    left: 22px;
    top: 17px;
    width: 66px;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    color: #5c5c5c;
  }

  .log {
    display: inline-block;
    position: absolute;
    right: 24px;
    top: 17px;
    width: 80px;
    height: 16px;
    font-size: 16px;
    line-height: 16px;
    color: #54c9d7;
    cursor: pointer;
  }

  .arrow {
    width: 41px;
    height: 35px;
    position: relative;
    top: 58px;
    z-index: 100;
    background: #f0f0f0;
  }

  .steps-area {
    /*width: 916px;*/
    width: 1000px;
    overflow-x: hidden;
    position: absolute;
    z-index: 1;
    left: 0px;
    top: 35px;
  }

  .ui-step {
    position: relative;
    height: 80px;
  }

  .process {
    width: 43px;
    height: 10px;
    background: #d9d9d9;
    margin: 35px 0;
    float: left;
  }

  .process.right {
    float: right;
  }

  .process.active {
    background: #5c5c5c;
  }

  .ui-step .step-icon {
    position: absolute;
    align-items: center;
    left: 41.6px;
    top: 26px;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    border-radius: 50%;
    border-color: inherit;
    /*   margin: auto;*/
    background: #5c5c5c;
    color: #ffffff;
    z-index: 51;
  }

  .ui-step .name {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 0px;
    color: #5c5c5c;
  }

  .ui-step.active .name {
    color: #59cfdc;
  }

  .ui-step .dept {
    position: absolute;
    width: 60px;
    left: 25.5px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    top: 4px;
    border-radius: 10px;
    background: #59cfdc;
    color: white;
    font-size: 10px;
    display: none;
  }

  .ui-step.active .dept {
    display: block;
  }

  .ui-step .dept:after {
    content: " ";
    width: 0px;
    height: 0px;

    border: 4px solid transparent;
    border-top: 4px solid #59cfdc;
    position: absolute;
    left: 26px;
    top: 16px;
  }

  .button {
    position: absolute;
    display: block;
    height: 22px;
    width: 14px;
    top: 27px;
    background-size: 14px 22px;
  }

  .swiper-button-prev {
    left: 10px;
  }

  .swiper-button-next {
    right: 10px;
  }

  .swiper-container {
    width: 1000px;
    /*left: -41.6px;*/
  }

  .swiper-container-horizontal > .swiper-scrollbar {
    bottom: 37.5px;
    background: #5c5c5c;

  }
</style>
<style>
  .el-popover .el-table td, .el-table th {
    padding: 4px 0;
  }

  .el-popover .el-table td {
    border: none;
  }

  .el-popover .el-table::before {
    height: 0;
  }
</style>
