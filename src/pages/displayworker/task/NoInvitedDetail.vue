<template>
  <div class="body-wrapper">
    <div class="remark">
      <div style="float: left">当前所在位置：</div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/displayworker/task?status=01' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>邀约</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <me-steps active="1"></me-steps>
    <div class="left-time">
      <span class="time-icon"></span>
      <span class="info">距操作截止时间还有：&nbsp;&nbsp;<span style="color: #e82727">00：05：23</span> </span>
      <!--<span class="status">状态：过程稿</span>-->
    </div>
    <me-customer-info :taskid="1"></me-customer-info>

    <div class="title-area">
      <span class="title">邀约填单</span>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="96px">
      <el-form-item label="电联状态：" prop="phoneStatus">
        <el-radio-group v-model="form.phoneStatus">
          <el-radio :label="1">成功</el-radio>
          <el-radio :label="2">失败</el-radio>
          <el-radio :label="3">未接通</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="客户意向：">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" v-model="form.remark"></el-input>
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

  export default {
    data: function () {
      return {
        form: {
          phoneStatus: '',
          remark: ''
        },
        rules: {
          phoneStatus: [
            {required: true, message: '请填写电联状态', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
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
      MeCustomerInfo
    }
  }
</script>

<style scoped>
  .remark {
    height: 20px;
    width: 100%;
    padding: 20px 0;
    font-size: 14px;
    vertical-align: top;
  }

  form {
    margin: 10px 0;
  }
</style>
