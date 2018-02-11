<template>
  <div class="body-wrapper">
    <div class="remark">
      <div style="float: left">当前所在位置：</div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/displayworker/task?status=701' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>签订设计合同</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <me-steps active="3"></me-steps>
    <div class="left-time">
      <span class="time-icon"></span>
      <span class="info">距操作截止时间还有：&nbsp;&nbsp;<span style="color: #e82727">00：05：23</span> </span>
      <!--<span class="status">状态：过程稿</span>-->
    </div>
    <me-customer-info :taskid="1"></me-customer-info>


    <div class="title-area">
      <span class="title">签订设计合同</span>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="110px">

      <el-form-item label="项目ID：">
        D2011221232133213
      </el-form-item>

      <el-form-item label="设计合同模板：">
        <el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in 5"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <!--<el-button>打印</el-button>-->
      </el-form-item>


      <el-form-item label="方案倾向：" prop="phoneStatus">
        <el-radio-group v-model="form.phoneStatus">
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
        remark: '这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小！',
        preference: '',
        dialogFormVisible: false,
        form: {
          phoneStatus: '',
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


  form {
    margin: 20px 0;
  }

  .el-input--small {
    margin-top: 0;
  }

</style>
