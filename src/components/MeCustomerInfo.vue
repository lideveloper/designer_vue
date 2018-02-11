<template>
  <div>
    <div class="title-area">
      <span class="title">客户基本信息</span>
    </div>
    <div class="ui-label-bar">
      <div>
        <span class="label">小区：</span>
        <span class="value">武昌南湖保利心语小区</span>
      </div>
      <div>
        <span class="label">业主：</span>
        <span class="value">关晓彤</span>
      </div>
      <div>
        <span class="label">电话：</span>
        <span class="value">15102778985</span>
      </div>
      <div>
        <span class="label">楼栋：</span>
        <span class="value">2#</span>
      </div>
      <div>
        <span class="label">户型：</span>
        <span class="value">B2</span>
      </div>
      <div>
        <span class="label">备注：</span>
        <me-remark :line="2" :width="600"
                   :content="remark"></me-remark>
      </div>

      <img src="" class="pic-house"/>

    </div>
  </div>
</template>

<script>
  import MeRemark from '@/components/MeRemark.vue'

  export default {
    props: {'taskid': Number},
    data: function () {
      return {
        remark: "这是一个刚开,这是一个刚开,这是一个刚开,这是一个刚开,这是一个刚开,这是一个刚开,这是一个刚开,这是一个刚开,这是一个刚开,这是一个刚开"
      }
    },
    methods: {},
    mounted: function () {

    },
    components: {
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
    min-height: 211px;
  }

  .ui-label-bar .label {
    display: inline-block;
    height: 26px;
    width: 46px;
    text-align: right;
    color: #5c5c5c;
    vertical-align: top;
  }

  .ui-label-bar .value {
    display: inline-block;
    color: #868686;
    height: 26px;
  }

  .ui-label-bar .pic-house {
    position: absolute;
    width: 215px;
    height: 165px;
    right: 38px;
    top: 32px;
  }

</style>
