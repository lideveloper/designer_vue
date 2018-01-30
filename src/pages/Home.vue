<template>
  <el-container direction="vertical" class="container">
    <el-header>
      <div @click="collapse=!collapse">折叠</div>
    </el-header>
    <el-container direction="horizontal" class="main-container">
      <el-aside :width="collapse?'64px':'240px'" class="aside"><!---->
      </el-aside>
      <el-scrollbar class="scrollbar" :style="[collapse?{width: '271px'}:{width: '240px'}]"
                    :wrap-style="[{overflowX: 'hidden'}]">
        <el-menu background-color="#545c64"
                 text-color="#fff"
                 :style="[{border:'none'}]"
                 class="menu"
                 active-text-color="#ffd04b"
                 :collapse="collapse"><!---->
          <el-submenu index="1">
            <template slot="title">
              <i class="icon-d-qiyeshenfenrz"></i>
              <span>菜单1</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>菜单1</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>菜单1</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>

          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>菜单1</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>

          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>菜单1</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-scrollbar>
      <el-main style="background: gray">

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data: function () {
      return {
        collapse: false
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    width: 100%;
  }

  .main-container {
    position: relative;
  }

  .aside {
    width: 240px;
    position: relative;
    background: #545c64;
    z-index: 1;
    transition: width 0.3s ease-in 0s;
    -moz-transition: width 0.3s ease-in 0s;
    -webkit-transition: width 0.3s ease-in 0s;
    -o-transition: width 0.3s ease-in 0s;
  }

  .scrollbar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
  }

  .horizontal-collapse-transition, .el-menu, .el-menu--collapse {
    transition: width 0.3s ease-in 0s;
    -moz-transition: width 0.3s ease-in 0s;
    -webkit-transition: width 0.3s ease-in 0s;
    -o-transition: width 0.3s ease-in 0s;
  }

  .menu:not(.el-menu--collapse) {
    width: 240px;
    height: 100%;
  }
</style>
