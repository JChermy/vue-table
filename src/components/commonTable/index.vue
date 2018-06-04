<template>
   <div>
      <div class="checkButtons" v-show="isShow" prop="isShow">
        <el-button type="primary" icon="el-icon-edit"  class="addBtn" @click="handleCreate" >新增</el-button>
        <slot name="tooltip"></slot>
      </div>
      <el-table
          @filter-change="filterChange"
          :data="tableData" class="commontable" v-loading="loading" style="width: 100%" >
        <el-table-column
          type="index"
          :index="getIndex"
          width="50">
        </el-table-column>
        <slot name="table-column-before"></slot>
        
        <template  v-for="field in fields">
          <el-table-column :key="field['label']"  :prop="field['field']" :label="field['label']" v-if="field['filter']"  :filters="getFieldEnums(field['field'], field)" :filter-method="createFieldMethod(field['field'], field)" filter-placement="bottom-end" :width="field['width']" :column-key="field['field']">
            <template slot-scope="scope">
              <el-tag v-if="field['tag']" :type="getTagType(scope.row[field['field']], field['tag'])">
                {{ scope.row[field['field']] | formatterName(field['formatter'], field['field']) }}
              </el-tag>
              <span v-else>{{ scope.row[field['field']] | formatterName(field['formatter'], field['field']) }}</span>
            </template>
          </el-table-column>
          <el-table-column :key="field['label']" :label="field['label']" :width="field['width']" :column-key="field['field']"  v-else>
            <template slot-scope="scope">
              <el-tag v-if="field['tag']" :type="getTagType(scope.row[field['field']], field['tag'])">
                {{ scope.row[field['field']] | formatterName(field['formatter'], field['field']) }}
              </el-tag>
              <span v-else>{{ scope.row[field['field']] | formatterName(field['formatter'], field['field']) }}</span>
            </template>
          </el-table-column> 
        </template>

        <slot name="table-column-after"></slot>
          <el-table-column label="操作" v-if="showOpt" prop="showOpt">
            <template slot-scope="scope" v-show="false">
              <slot name="expand-option-before" :index="scope.$index" :row="scope.row"></slot>
              <el-button
                size="mini"
                @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <slot name="expand-option-after" :index="scope.$index" :row="scope.row"></slot>
            </template>
          </el-table-column>
      </el-table>
      <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
            :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
      </div>
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form ref="data-form" :model="formModel" :rules="formRules" label-position="left" label-width="100px">
              <slot name="form"></slot>
          </el-form>
          <div class="buttons">
          <el-button @click="dialogFormVisible = false" type="primary">取 消</el-button>
          <el-button type="primary" @click="handleSubmit"  :disabled="btnDisabled">确 定</el-button>
          </div>
      </el-dialog>
   </div>
</template>
<script>
import { getFieldEnums, createFieldMethod } from '@/utils/field'
import toolBar from '@/components/ToolBar'
import format from '@/utils/format'

export default {
  components: { toolBar: toolBar },
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    tableKey: {
      type: String,
      default() {
        return ''
      }
    },
    formModel: {
      type: Object,
      required: true
    },
    formRules: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    isShow: {
      type: Boolean,
      default() {
        return true
      }
    },
    showOpt: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  computed: {
    total() {
      return this.filterData.length
    },
    tableData() {
      const query = this.listQuery
      return this.filterData.slice((query.page - 1) * query.limit, query.page * query.limit)
    }
  },
  data() {
    return {
      loading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      btnDisabled: false,
      filters: {},
      filterData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    filterChange(filters) {
      this.filters = { ...this.filters, ...filters }
    },
    getFieldEnums(field) {
      return getFieldEnums(field)
    },
    createFieldMethod(field, config) {
      const fieldMethod = config['filter-method'] || config['filterMethod']
      return fieldMethod instanceof Function ? fieldMethod : createFieldMethod(field)
    },
    fetchData() {
      this.loading = true
      this.$emit('fetchData', () => {
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.listQuery.page = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleSearch(filter) {
      this.tableData = this.tableData.filter(function(item) {
        return (item.changetype === 2)
      })
    },
    handleSubmit() {
      if (this.btnDisabled) {
        return
      }
      const eventEmitterMap = {
        'create': 'handleCreate',
        'update': 'handleUpdate'
      }
      const eventEmitter = eventEmitterMap[this.dialogStatus]
      const title = this.textMap[this.dialogStatus]
      this.$refs['data-form'].validate((valid) => {
        if (valid) {
          this.btnDisabled = true
          this.$emit(eventEmitter, this.formModel, (err, notifyData) => {
            this.dialogFormVisible = false
            this.btnDisabled = false
            if (err === null) {
              this.fetchData()
            }
            notifyData && this.$notify(notifyData)
          })
        } else {
          this.$message({
            message: title + '失败, 表单校验失败',
            type: 'fail'
          })
        }
      })
    },
    handleUpdate(row) {
      this.$emit('updateForm', { ...row })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('确定删除此条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('handleDelete', row, () => {
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getIndex(index) {
      return index + (this.listQuery.page - 1) * this.listQuery.limit + 1
    },
    getTagType(val, typeMap) {
      return typeMap[val]
    },
    filterHandler(data, filters) {
      const columns = Object.keys(filters)
      if (columns.length === 0) {
        return data
      }
      const filterData = data.filter(item => {
        for (let i = 0, len = columns.length; i < len; i++) {
          const key = columns[i]
          if (filters[key].length === 0 || filters[key].includes(item[key])) {
            return true
          }
        }
      })
      return filterData
    }
  },
  filters: {
    formatterName(val, isFormat, field) {
      if (isFormat) {
        if (field && format[field] instanceof Function) {
          return format[field](val)
        }
      }
      return val
    }
  },
  watch: {
    dialogStatus(val) {
      if (this.dialogFormVisible) {
        this.$emit('dialog-status', val)
      }
    },
    dialogFormVisible(val) {
      if (val === false) {
        this.$emit('reset-form')
        this.$nextTick(() => {
          this.$refs['data-form'].clearValidate()
        })
        return
      }
    },
    filters(val) {
      this.filterData = this.filterHandler(this.data, val)
    },
    data(val) {
      this.filterData = this.filterHandler(val, this.filters)
    }
  }

}
</script>
<style>
.pagination {
  margin: 30px;
}
.checkButtons {
  float: right;
  margin: 20px;
}
.commontable {
  margin: 30px;
}
.buttons {
  text-align: right;
}
</style>
