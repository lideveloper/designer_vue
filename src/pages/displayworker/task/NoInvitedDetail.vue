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
  </div>
</template>

<script>
  import MeSteps from '@/components/MeSteps.vue'

  export default {
    data: function () {
      return {}
    },
    methods: {},
    components: {
      MeSteps
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
</style>
