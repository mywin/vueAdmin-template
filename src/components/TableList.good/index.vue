<template>
    <div class="table-list-container">
        <div class="filter-container">
            <slot name="filter"></slot>
            <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="searcher.search()">
                查询
            </el-button>
        </div>
        <div class="selector-container" v-if="selector.multiple">
            <el-button type="text" size="mini" @click="selector.toggle(table.data, true)">全选</el-button>
            <el-button type="text" size="mini" @click="selector.toggle(table.data)">反选</el-button>
            <el-button type="text" size="mini" @click="selector.toggle()">取消</el-button>
            <el-button type="text" size="mini" v-if="selector.selected.length" @click="selector.deleteAll()">删除</el-button>
            <span style="color:green">{{selector.selected.length}} selected</span>
        </div>
        <div class="items-container">
            <el-table
                ref="elTable"
                :key="table.key"
                :data="table.data"
                :stripe="table.stripe"
                v-loading="table.loading"
                :row-key="table.rowKey"
                :default-sort="sorter.order"
                @sort-change="sorter.sort"
                @expand-change="expander.change"
                :expand-row-keys="expander.rowKeys"
                @selection-change="selector.change"
                element-loading-text="给我一点时间"
                border fit highlight-current-row style="width: 100%"
            >
                <el-table-column
                    v-if="selector.multiple"
                    width="55"
                    type="selection"
                ></el-table-column>
                <slot name="item"></slot>
            </el-table>
        </div>
        <div class="pagination-container">
            <el-pagination
                background
                @size-change="paginator.sizeChange"
                @current-change="paginator.currentChange"
                :current-page="paginator.page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="paginator.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginator.total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
  // 水波纹指令
  import waves from '@/directive/waves'
  export default {
    props: ['source'],
    directives: {
      waves
    },
    created() {
      this.table.load()
    },
    computed: {
      // 列表
      table() {
        const object = {
          key: 0,
          data: [],
          stripe: true,
          loading: false,
          rowKey: 'id',
          api: false,
          callback: (res) => {
            return res
          },
          load: () => {
            if (this.table.loading || !this.table.api) {
              return false
            }
            this.searcher.setQuery()
            this.table.loading = true
            this.table.api(this.$route.query).then(res => {
              this.table.loading = false
              this.table.data = this.table.callback(res.items)
              this.paginator.total = res.total_items
            }).catch(err => {
              this.$message.error(err)
              this.table.loading = false
            })
          },
          ...this.source.table
        }
        this.$set(this.source, 'table', object)
        return object
      },
      // 查询参数
      query() {
        const object = {
          ...this.source.query
        }
        this.$set(this.source, 'query', object)
        return object
      },
      // 搜索组件
      searcher() {
        const object = {
          setQuery: () => {
            const query = this.$route.query
            for (const key in query) {
              if (query.hasOwnProperty(key)) {
                this.query[key] = query[key]
              }
            }
          },
          search: () => {
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
        this.$set(this.source, 'searcher', object)
        return object
      },
      // 展开器
      expander() {
        const object = {
          rowKeys: [],
          change: (row, expanded) => {
            return true
          },
          ...this.source.expander
        }
        this.$set(this.source, 'expander', object)
        return object
      },
      // 多项选择器
      selector() {
        const object = {
          multiple: false,
          selected: [],
          api: false,
          change: (val) => {
            this.selector.selected = val
          },
          toggle: (rows, selected) => {
            if (rows) {
              rows.forEach(row => {
                this.$refs.elTable.toggleRowSelection(row, selected)
              })
            } else {
              this.$refs.elTable.clearSelection()
            }
          },
          deleteAll() {
            const key = 'id'
            const ids = []
            this.selected.find(item => {
              if (item[key]) {
                ids.push(item[key])
              }
            })
            this.remove(ids)
          },
          remove: (ids) => {
            if(ids.length && this.selector.api) {
              this.selector.api(ids).then(res => {
                this.table.load()
              }).catch(err => {
                this.$message.error('selection delete error.')
              })
            }
          },
          ...this.source.selector
        }
        this.$set(this.source, 'selector', object)
        return object
      },
      // 排序器
      sorter() {
        const object = {
          order: {
            order: '',
            prop: ''
          },
          sort: (item) => {
            this.sorter.order.prop = item.prop
            this.sorter.order.order = item.order === 'ascending' ? 'asc' : 'desc'
            this.$router.push({
              query: {
                ...this.$route.query,
                ...this.sorter.order
              }
            })
          },
          ...this.source.sorter
        }
        this.$set(this.source, 'sorter', object)
        return object
      },

      // 分页器
      paginator() {
        const object = {
          sizes: [15, 30, 50, 100],
          total: 0,
          limit: this.$route.query.limit ? parseInt(this.$route.query.limit) : 15,
          page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
          sizeChange: (val) => {
            this.$router.push({
              query: {
                ...this.$route.query,
                limit: val
              }
            })
          },
          currentChange: (val) => {
            this.$router.push({
              query: {
                ...this.$route.query,
                page: val
              }
            })
          },
          ...this.source.paginator
        }
        this.$set(this.source, 'paginator', object)
        return object
      }
    },
    watch: {
      $route() {
        this.table.load()
      }
    }
  }
</script>
