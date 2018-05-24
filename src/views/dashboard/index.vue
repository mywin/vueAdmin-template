<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <!--<div class="dashboard-text">routes:<span v-for='route in routes' :key='route'>{{routes}}</span></div>-->
    {{routes}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: mapGetters({
    name: 'user/name',
    routes: 'user/routes'
  })
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
