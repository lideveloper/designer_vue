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
        <el-select v-model="form.value" size="small" placeholder="请选择">
          <el-option
            v-for="item in 5"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button class="print-button" :disabled="form.value==''">打印</el-button>
      </el-form-item>


      <el-form-item label="上传设计合同：">
        <me-upload v-on:uploadSuccess="uploadSuccess"></me-upload>
      </el-form-item>

      <el-form-item label-width="138px" label="是否已付设计尾款：">
        <el-switch
          v-model="form.delivery"
          active-text="是"
          inactive-text="否"
        ></el-switch>
      </el-form-item>



      <el-form-item label="上传收费单：">
        <me-upload v-on:uploadSuccess="uploadSuccess"></me-upload>
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
  import MeUpload from '@/components/MeUpload.vue'

  export default {
    data: function () {
      return {
        remark: '这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小区这是一个刚开盘的小！',
        preference: '',
        dialogFormVisible: false,
        form: {
          phoneStatus: '',
          value: "",
          fileid: ''
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
      uploadSuccess: function (fileid) {
        this.form.fileid = fileid
        console.log(this.form.fileid );
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
      MeRemark,
      MeUpload
    }
  }
</script>

<style scoped>

  form {
    margin: 20px 0;
  }

  .print-button {
    vertical-align: middle;
  }

</style>
