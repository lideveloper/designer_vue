<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    methods: {},
    mounted:function () {
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
  #container {
    width: 800px;
    height: 400px;
  }
</style>
