<template>
  <el-steps :active="2" align-center>
    <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤5" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤6" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤7" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤8" description="这是一段很长很长很长的描述性文字"></el-step>
    <el-step title="步骤9" description="这是一段很长很长很长的描述性文字"></el-step>
  </el-steps>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
