<template>
    <div class="paginator-container">
        <el-pagination
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="page"
            :page-sizes="sizes"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
  export default {
    props: ['source'],
    data() {
      return {
        sizes: [15, 30, 50, 100],
        total: 0,
        sizeChange: (value) => {
          this.$router.push({
            query: {
              ...this.$route.query,
              limit: value
            }
          })
        },
        currentChange: (value) => {
          this.$router.push({
            query: {
              ...this.$route.query,
              page: value
            }
          })
        },
        ...this.source
      }
    },
    computed: {
      limit() {
        return this.$route.query.limit ? parseInt(this.$route.query.limit) : 15
      },
      page() {
        return this.$route.query.page ? parseInt(this.$route.query.page) : 1
      }
    }
  }
</script>
