<template>
  <el-select
    v-loading="loading"
    @change="valueChange"
    v-model="value"
    size="small"
    placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.Code"
      :label="item.TextValue"
      :value="item.Code">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: {'initValue': String, 'typeCode': String},
    data: function () {
      return {
        loading: true,
        options: [],
        value: ''
      }
    },
    methods: {
      valueChange: function (val) {
        this.$emit("valueChange", val);
      }
    },
    watch: {
      initValue: function (val) {
        this.value = val;
      }
    },
    mounted: function () {
      var _this = this;
      this.value = this.initValue;
      this.$axios.get("/base/datamap/" + this.typeCode)
        .then(function (response) {
          if (response.data) {
            _this.options = response.data;
          }
          _this.loading = false;
        }).catch(function (response) {
        _this.loading = false;
        _this.$message.error('数据加载失败！');
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
