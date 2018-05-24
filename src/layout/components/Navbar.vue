<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <user-tiny></user-tiny>
  </el-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Breadcrumb: () => import('@/components/Breadcrumb'),
    Hamburger: () => import('@/components/Hamburger'),
    UserTiny: () => import('@/views/rbac/tiny')
  },
  computed: mapGetters({
    sidebar: 'app/sidebar'
  }),
  methods: mapActions({
    toggleSideBar: 'app/ToggleSideBar'
  })
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
</style>

