<template>

  <el-container style="height: 100%">
    <el-header class="head">
      <img src="./assets/image/logo.png" style="margin-top: 5px"/>
    </el-header>
    <el-main class="main">
      <router-view/>
    </el-main>
  </el-container>

</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style scoped>
  .head {
    background: #444444;
    height: 63px;
    width: 100%;
  }

  .main {
    padding: 0;
    margin: 0;
    position: relative;
  }
</style>
