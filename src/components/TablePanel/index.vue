<template>
    <div class="table-panel-container">
        <searcher ref="searcher" :source="source.searcher" :query="source.query">
            <template slot="search">
                <slot name="search"></slot>
            </template>
        </searcher>
        <table-list
            ref="tableList"
            :source="source.table"
            @setTotal="setTotal"
        >
            <template slot="selector">
                <el-table-column width="55" type="selection"></el-table-column>
            </template>
            <template slot="row">
                <slot name="item"></slot>
            </template>
        </table-list>
        <paginator ref="paginator" :source="source.pagination"></paginator>
    </div>
</template>

<script>
  export default {
    components: {
      Searcher: () => import('./Searcher'),
      TableList: () => import('./TableList'),
      Paginator: () => import('./Paginator')
    },
    props: ['source'],
    methods: {
      setTotal(total) {
        this.$refs.paginator.total = total
      }
    },
    watch: {
      $route() {
        this.$refs.tableList.load()
      }
    }
  }
</script>
