<template>
  <div class="body-wrapper">
    <div class="remark">
      <div style="float: left">当前所在位置：</div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/displayworker/task?status=102' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>洽谈</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <me-steps active="2"></me-steps>
    <div class="left-time">
      <span class="time-icon"></span>
      <span class="info">距操作截止时间还有：&nbsp;&nbsp;<span style="color: #e82727">00：05：23</span> </span>
      <!--<span class="status">状态：过程稿</span>-->
    </div>
    <me-customer-info :taskid="1"></me-customer-info>

    <div class="title-area">
      <span class="title">方案洽谈</span>
    </div>
    <div class="ui-label-bar">
      <div style="min-height: 78px">
        <span class="label">备注：</span>
        <me-remark :line="2" :width="900"
                   :content="remark"></me-remark>
      </div>
    </div>

    <div class="title-area">
      <span class="title">设计初选方案</span>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="140px">
      <el-row class="cards-container" type="flex" justify="space-between">
        <el-col class="card-container" v-for="(i,index) in 2" key="index" :span="12">
          <el-card :body-style="{ padding: '10px', paddingBottom: '0px'}">
            <img src="../../../assets/image/temp/u1272.jpg" @click="openDetail(i)"/>
            <!--<div class="name">模板一</div>-->
            <div class="select">
              <el-radio v-model="form.preference" :label="i">选择模板{{i}}</el-radio>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog
        title="方案预览"
        :visible.sync="dialogFormVisible"
        width="1000px">
        <el-carousel :interval="400000" type="card" height="280px">
          <el-carousel-item v-for="item in 3" :key="item">
            <div class="carousel-container">
              <img src="../../../assets/image/temp/u1272.jpg"/>
              <span>客厅效果图</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
      <el-form-item label="关注点：">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="不满意点：">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" v-model="form.remark"></el-input>
      </el-form-item>

      <el-form-item label="方案倾向：" prop="phoneStatus">
        <el-radio-group v-model="form.preference">
          <el-radio :label="1">方案一</el-radio>
          <el-radio :label="2">方案二</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否接受设计订制：">
        <el-switch
          v-model="form.delivery"
          active-text="是"
          inactive-text="否"
        ></el-switch>
      </el-form-item>


      <el-form-item>
        <el-button @click="save('form')">存草稿</el-button>
        <el-button type="primary" @click="submit('form')">下一步</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import MeSteps from '@/components/MeSteps.vue'
  import MeCustomerInfo from '@/components/MeCustomerInfo.vue'
  import MeRemark from '@/components/MeRemark.vue'

  export default {
    data: function () {
      return {
        id: this.$route.params.id,
        remark: '这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小！',
        dialogFormVisible: false,
        form: {
          phoneStatus: '',
          preference: '',
        },
        rules: {
          phoneStatus: [
            {required: true, message: '请填写电联状态', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      openDetail: function (i) {
        this.dialogFormVisible = true;
      },
      save: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form)
          }
        });
      },
      submit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form)
          }
        });
        this.$router.push({name: "signdesign", params: {id: this.id}})
      }
    },
    components: {
      MeSteps,
      MeCustomerInfo,
      MeRemark
    }
  }
</script>

<style scoped>
  .ui-label-bar {
    line-height: 26px;
    margin: 10px 0;
    font-size: 14px;
    position: relative;
  }

  .ui-label-bar .label {
    display: inline-block;
    height: 26px;
    width: 46px;
    text-align: right;
    color: #5c5c5c;
    vertical-align: top;
  }

  .cards-container {
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .card-container {
    padding: 10px;
  }

  .card-container img {
    width: 400px;
    height: 200px;
    margin: auto;
    display: block;
    cursor: pointer;
  }

  /*
    .card-container .name {
      width: 100px;
      margin: auto;
      height: 30px;
      color: #5c5c5c;
      text-align: center;
      line-height: 30px;
    }*/

  .card-container .select {
    width: 100px;
    margin: auto;
    height: 40px;
    color: #5c5c5c;
    line-height: 40px;
  }

  .carousel-container {
    background: white;
    text-align: center;
  }

  .carousel-container img {
    width: 480px;
    height: 240px;
  }

  /* form {
     margin: 10px 0;
   }*/
</style>
