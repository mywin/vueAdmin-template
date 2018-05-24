<template>
    <div class="list-container">
        <div class="selector" v-if="multiple">
            <el-button type="text" size="mini" @click="toggle(data, true)">全选</el-button>
            <el-button type="text" size="mini" @click="toggle(data)">反选</el-button>
            <el-button type="text" size="mini" @click="toggle()">取消</el-button>
            <el-button type="text" size="mini" v-if="selected.length" @click="deleteAll()">删除</el-button>
            <span style="color:green">{{selected.length}} selected</span>
        </div>
        <div class="table">
            <el-table
                ref="elTable"
                :key="key"
                :data="data"
                :stripe="stripe"
                v-loading="loading"
                :row-key="rowKey"
                :default-sort="order"
                @sort-change="sortChange"
                @expand-change="expandChange"
                :expand-row-keys="expandRowKeys"
                @selection-change="selectionChange"
                element-loading-text="给我一点时间"
                border fit highlight-current-row style="width: 100%"
            >
                <slot name="selector" v-if="multiple"></slot>
                <slot name="row"></slot>
            </el-table>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['source'],
    mounted() {
      this.load()
    },
    data() {
      return {
        key: 0,
        data: [],
        stripe: true,
        loading: false,
        rowKey: 'id',
        expandRowKeys: [],
        multiple: false,
        selected: [],
        api: {
          fetch: false,
          delete: false
        },
        order: {
          order: '',
          prop: ''
        },
        expandChange: (row, expanded) => {
          return true
        },
        selectionChange: (value) => {
          this.selected = value
        },
        callback: (res) => {
          return res
        },
        load: () => {
          const action = this.api.fetch
          if (this.loading) {
            return false
          }
          if (!action) {
            return false
          }
          this.loading = true
          action(this.$route.query).then(res => {
            this.loading = false
            this.data = this.callback(res.items)
            this.$emit('setTotal', res.total_items)
          }).catch(err => {
            this.$message.error(err)
            this.loading = false
          })
        },
        remove: (ids) => {
          const action = this.api.delete
          if (!action) {
            return false
          }
          if (ids.length) {
            action(ids).then(res => {
              this.load()
            }).catch(err => {
              this.$message.error('selection delete error.' + err)
            })
          }
        },
        ...this.source
      }
    },
    methods: {
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
      toggle(rows, selected) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.elTable.toggleRowSelection(row, selected)
          })
        } else {
          this.$refs.elTable.clearSelection()
        }
      },
      sortChange: (item) => {
        this.order.prop = item.prop
        this.order.order = (item.order === 'ascending') ? 'asc' : 'desc'
        this.$router.push({
          query: {
            ...this.$route.query,
            ...this.order
          }
        })
      }
    }
  }
</script>
