<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <div class="app-container">
        <keep-alive :include="cachedViews">
          <!-- <router-view :key="key"></router-view> -->
          <router-view></router-view>
        </keep-alive>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: mapGetters({
    cachedViews: 'tagsView/cachedViews'
  })
  /*
  key() {
    return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
  }
  */
}
</script>
