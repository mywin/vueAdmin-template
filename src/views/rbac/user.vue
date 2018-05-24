<template>
    <div>
        <table-panel :source="source">
            <template slot="item">
                <el-table-column width="60" type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>3333</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column width="80" sortable prop="id" label="id"></el-table-column>
                <el-table-column width="80" sortable prop="name" label="name"></el-table-column>
                <el-table-column width="80" sortable prop="address" label="address">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>3333</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editItem(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </template>
            <template slot="search">
                <el-input
                    @keyup.enter.native="source.searcher.search"
                    style="width: 200px;"
                    class="filter-item"
                    placeholder="name"
                    v-model="source.query.name"
                >
                </el-input>
            </template>
        </table-panel>
        <el-dialog @close="dialogClose" :title="dialogForm.title" :visible.sync="dialogForm.visible">
            <el-form
                :rules="rules"
                ref="dialogForm"
                :model="dialogForm.item"
                label-position="left"
                label-width="70px"
                style='width: 400px; margin-left:50px;'
            >
                <el-form-item label="xxxxxx" prop="timestamp">
                    <el-date-picker
                        v-model="dialogForm.item.timestamp"
                        type="datetime"
                        placeholder="Please pick a date">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="fafasdasd" prop="title">
                    <el-input v-model="dialogForm.item.title"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确认</el-button>
                <el-button @click="dialogForm.visible = false">关闭</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  // import _ from 'lodash'
  export default {
    components: {
      TablePanel: () => import('@/components/TablePanel')
    },
    methods: {
      ...mapActions({
        getItems: 'user/GetItems',
        deleteItems: 'user/DeleteItems'
      }),
      dialogClose() {
        this.$refs.dialogForm.clearValidate()
      },
      editItem(item) {
        this.dialogForm.visible = true
        this.dialogForm.title = '编 辑'
        // 这里使用克隆解绑，validate依然好使
        this.dialogForm.item = Object.assign({}, item)
        /*
        console.log(_.cloneDeep(item))
        this.$nextTick(() => {
          this.$refs.dialogForm.clearValidate()
        })
        */
      },
      handleUpdate(row) {
        this.dialogForm.visible = true
        /*
        // copy obj
        this.temp = Object.assign({}, row)
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        */
      }
    },
    data() {
      return {
        dialogForm: {
          visible: false,
          title: '编辑框',
          item: {}
        },
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        source: {
          table: {
            multiple: true,
            api: {
              fetch: this.getItems,
              delete: this.deleteItems
            }
          },
          query: {
            name: ''
          }
        }
      }
    }
  }
</script>
