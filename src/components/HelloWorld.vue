<template>
  <me-steps active="8">

  </me-steps>
</template>

<script>

  import MeSteps from '@/components/MeSteps.vue'

  export default {
    name: 'HelloWorld',
    data() {
      return {}
    },
    components: {
      MeSteps
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
