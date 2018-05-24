<template>
    <div class="searcher-container">
        <slot name="search"></slot>
        <el-button
            class="filter-item"
            type="primary"
            v-waves
            icon="el-icon-search"
            @click="search">
            查询
        </el-button>
    </div>
</template>

<script>
  // 水波纹指令
  import waves from '@/directive/waves'

  export default {
    directives: {
      waves
    },
    props: ['source', 'query'],
    methods: {
      search() {
        this.$router.push({
          query: {
            page: this.$route.query.page,
            limit: this.$route.query.limit,
            ...this.query,
            _: Math.random()
          }
        })
      }
    }
  }
</script>
