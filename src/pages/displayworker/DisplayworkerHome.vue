<template>
  <el-container style="position: absolute;left: 0;right: 0;top:0;bottom: 0;">
    <el-aside width="192px" class="left">
      <div class="head">
        <div class="core">
          <img src="../../assets/image/default_image.png"/>
          <div class="info">
            <div class="name">林允儿</div>
            <span class="grade">LV1</span>
            <div class="jnumber">工号：377</div>
            <div class="position">职位：陈列师</div>
          </div>
        </div>
      </div>
      <el-tabs :tab-position="'left'" v-model="activeName" class="tab">
        <el-tab-pane name="newtask">
          <div class="item" @click="goNewTask" slot="label"><i class="icon task"></i> 任务管理</div>
        </el-tab-pane>
        <el-tab-pane name="failtask">
          <div class="item" @click="goFailTask" slot="label"><i class="icon temp"></i> 邀约失败</div>
        </el-tab-pane>
        <el-tab-pane name="compacttask">
          <div class="item" @click="goCompact" slot="label"><i class="icon material"></i> 合同管理</div>
        </el-tab-pane>
      </el-tabs>
    </el-aside>
    <el-main style="background: #F2F1F0;position: relative;">
      <router-view key="123"/>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data: function () {
      return {
        activeName: "fail"
      }
    },
    methods: {
      goNewTask: function () {
        this.$router.history.push({name: 'newtask'});
      },
      goFailTask: function () {
        this.$router.history.push({name: 'failtask'});
      },
      goCompact: function () {
        this.$router.history.push({name: 'compacttask'});
      }
    },
    mounted: function () {
      this.activeName = this.$router.currentRoute.name;
    }
  }
</script>

<style scoped>
  .head {
    height: 172px;
    width: 100%;
  }

  .head .core {
    padding-top: 44px;
    padding-left: 20px;
  }

  .head .core img {
    height: 46px;
    width: 46px;
    border-radius: 23px;
    float: left;
    display: inline-block;
  }

  .head .core .info {
    padding-left: 10px;
    display: inline-block;
  }

  .head .core .info .name {
    font-size: 16px;
    color: #212121;
  }

  .head .core .info .grade {
    background-color: #ff4242;
    width: 24px;
    height: 12px;
    color: white;
    margin-top: 10px;
    display: inline-block;
    font-size: 8px;
    text-align: center;
    line-height: 12px;
  }

  .head .core .info .jnumber {
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
  }

  .head .core .info .position {
    height: 30px;
    line-height: 30px;
  }

  .tab {
    width: 100%;
    height: auto;
  }

  .item {
    /*padding: 11px 0;*/
    padding-left: 40px;
    padding-right: 20px;
    border-top: 1px solid #d4d4d4;
    position: relative;
  }

  .left {
    background: #eaeaea;
  }

  /*i {
    margin-right: 10px;
  }
*/
  .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    position: relative;
    top: 10px;
    margin-right: 5px;
  }

  .icon.task {
    background: url("../../assets/image/designer_task_icon.png");
  }

  .icon.temp {
    background: url("../../assets/image/designer_temp_icon.png");
  }

  .icon.material {
    background: url("../../assets/image/designer_material_icon.png");
  }

</style>
