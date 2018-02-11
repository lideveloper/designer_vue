<template>
  <div class="container" @click="expand"
       :style="{'height':(lineData>0&&(contentHight >= lineData*26-4)?26*(lineData+1)+'px':'auto'),
       'width':width+'px'}">
    <div ref="content-ref" class="data"
         :style="{'maxHeight':(lineData>0?lineData*26+'px':'none'),'width':width+'px'}"
         @click="expand">
      {{content}}
    </div>
    <span class="more" v-show="contentHight>=lineData*26-4">更 多 ></span>
  </div>
</template>

<script>
  //
  export default {
    props: {
      'line': {
        type: Number,
        default: 2
      },
      'width': {
        type: Number,
        default: 100
      },
      'content': {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        lineData: 2,
        data: "",
        dataRef: null
      }
    },
    computed: {
      contentHight: {
        get: function () {
          if (this.dataRef) {
            return this.dataRef['offsetHeight'];
          }
        },
        set: function () {

        }
      }
    },
    methods: {
      expand: function () {
        if (this.contentHight >= this.lineData * 26 - 4) {
          this.lineData = 0;
        }
      }
    },
    mounted: function () {
      this.dataRef = this.$refs['content-ref']
      this.lineData = this.line;
    }
  }
</script>

<style scoped>
  .container {
    width: 400px;
    /*height: 60px;*/
    line-height: 26px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    color: #868686;
  }

  .data {
    /* position: absolute;*/
    z-index: 100;
    /*max-height: 40px;*/
    background: white;
    overflow: hidden;
  }

  .more {
    z-index: -1;
    position: absolute;
    bottom: 0px;
    right: 0;
    color: #54c9d7;
    cursor: pointer;
  }
</style>
