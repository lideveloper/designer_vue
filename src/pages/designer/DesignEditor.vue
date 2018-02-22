<template>
  <div class="workspace-wrapper">

    <div class="tools">

      <div class="tools-bar" style="">

        <el-tooltip class="tool" effect="dark" content="左旋90度">
          <img src='/src/assets/image/design/rotate-90.png'/>
        </el-tooltip>

        <el-tooltip class="tool" effect="dark" content="右旋90度">
          <img src='/src/assets/image/design/rotate90.png'/>
        </el-tooltip>

        <el-tooltip class="tool" effect="dark" content="上移">
          <img class="image" src='/src/assets/image/design/up.png'/>
        </el-tooltip>
        <el-tooltip class="tool" effect="dark" content="下移">
          <img class="image" src='/src/assets/image/design/down.png'/>
        </el-tooltip>
        <el-tooltip class="tool" effect="dark" content="置顶">
          <img class="image" src='/src/assets/image/design/uptotop.png'/>
        </el-tooltip>
        <el-tooltip class="tool" effect="dark" content="置底">
          <img class="image" src='/src/assets/image/design/downtobottom.png'/>
        </el-tooltip>
        <el-tooltip class="tool" effect="dark" content="左右对换">
          <img class="image" src='/src/assets/image/design/50.png'/>
        </el-tooltip>
        <el-tooltip class="tool" effect="dark" content="上下对换">
          <img class="image" src='/src/assets/image/design/51.png'/>
        </el-tooltip>
        <el-tooltip class="tool" effect="dark" content="过滤">
          <img class="image" src='/src/assets/image/design/filter.png'/>
        </el-tooltip>
        <el-tooltip class="tool" effect="dark" content="剪切">
          <img class="image" src='/src/assets/image/design/cut.png'/>
        </el-tooltip>
        <el-tooltip class="tool" effect="dark" content="删除">
          <img class="image" src='/src/assets/image/design/delete.png'/>
        </el-tooltip>
      </div>
    </div>
    <div class="center">
      <div id="container"></div>
      <div class="others">
        <el-card class="item plus" @click.native="dialogopened = true">
          <i class="el-icon-plus"></i>
        </el-card>
        <el-card class="item" v-for="n in 4" v-key="n">
          <img src="examples/assets/images/hamburger.png" class="image">
        </el-card>
      </div>
      <div style="clear: both"></div>
    </div>
    <el-dialog title="选择素材" :visible.sync="dialogopened" width="1200px" :fullscreen="false">
      <div class="materials">
        <el-card class="material" v-for="n in 4" v-key="n">
          <img src="examples/assets/images/hamburger.png" class="image">
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        dialogopened: false
      }
    },
    methods: {},
    mounted: function () {
      var stage = new Kinetic.Stage({
        container: "container",
        width: 800,
        height: 400
      });
      window.stage = stage;

      var statusManager = InitStage(stage);
      //添加键盘事件ctrl+z
      window.statusManager = statusManager;

      //   var stageUtil = initStage(stage);

      /*var image = new Image();
      image.src = "image/test1.jpg";

      image.onload = function () {
          wrapperImage(image);
          stage.draw();
      };*/
      stage.draw();
    }
  }
</script>

<style lang="scss" scoped>
  .workspace-wrapper {
    width: 1200px;
    margin: auto;
    border: 1px solid #d0d0d0;
  }

  /*.center{
    position: relative;
    top: -50px;
  }*/
  .tools {
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid #e6e8e8;
    height: 48px;
  }

  .tools-bar {
    height: 47px;
    padding: 0 12px;
    background-color: #fff;
  }

  .tool {
    display: inline-block;
    height: 32px;
    width: 32px;
    margin: 7px 6px;
    cursor: pointer;
  }

  .tool.image {
    width: 24px;
    height: 24px;
    margin: 11px;

  }

  #container {
    width: 800px;
    height: 400px;
    /*   background: red;*/
    float: left;
  }

  .others {
    width: 400px;
    height: 400px;
    float: right;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    /* justify-content: space-between;*/
    overflow-y: auto;
  }

  .others .item {
    width: 120px;
    height: 120px;
    margin: 5px 2px;
  }

  .others .item.plus {
    font-size: 28px;
    text-align: center;
    line-height: 80px;
    cursor: pointer;
  }

  .materials {
    display: flex;
  }

  .materials .material {
    width: 200px;
    height: 300px;
  }
</style>
