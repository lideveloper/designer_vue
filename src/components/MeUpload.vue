<template>
  <el-upload
    ref="upload"
    action="/api/file/upload"
    :multiple="false"
    :show-file-list="false"
    :before-upload="selectFile"
    :on-change="endUploading"
    :on-success="success"
    :disabled="uploading"
    :limit="1">
    <el-input placeholder="请选择上传的文件" style="line-height: 30px;" v-model="filename" :disabled="true" class="input" size="small">
      <el-button slot="append" :icon="uploading?'el-icon-loading':'el-icon-upload'"
                 style="margin: 0px -20px;font-size: 16px;padding: 6px 20px;"></el-button>
    </el-input>
  </el-upload>
</template>

<script>
  export default {
    data: function () {
      return {
        uploading: false,
        filename: ''
      }
    },
    methods: {
      endUploading: function () {
        this.uploading = false;
      },
      selectFile: function (file) {
        this.uploading = true;
        this.filename = file.name;
      },
      success: function (response, file, fileList) {
        if (response && response.code != 1) {
          this.$message.error('上传失败！');
          this.$refs.upload.clearFiles();
          return;
        }
        this.$emit('uploadSuccess', response.data);
        this.$message.success('上传成功！');
        this.$refs.upload.clearFiles();
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
