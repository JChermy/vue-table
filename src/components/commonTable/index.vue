<template>
   <div>
      <div class="filter-container">
        <el-button type="primary" icon="el-icon-edit"  class="addBtn" @click="handleCreate">新增</el-button>
      </div>
      <el-table :data="tableData" class="commontable">
          <el-table-column v-loading="loading" v-for=" field in fields" :key="field['name']" :label="field['lable']">
              <template slot-scope="scope">
                {{ scope.row[field['field']] | filterName(field['filter']) }}
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
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
          <!-- <el-button v-else-if="dialogStatus=='update'" type="primary" @click="updateData">确 定</el-button> -->
          </div>
      </el-dialog>
   </div>
</template>
<script>
import { getTableData, saveTableData } from '@/api/tableData'
import format from '@/utils/format'

export default {
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
    }
  },
  data() {
    return {
      total: null,
      tableData: [],
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
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getTableData(this.tableKey).then(response => {
        this.loading = false
        this.tableData = response.data.items
        this.total = (this.tableData).length
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$emit('reset-form')
      this.$nextTick(() => {
        this.$refs['data-form'].clearValidate()
      })
    },
    createData() {
      this.$refs['data-form'].validate((valid) => {
        if (valid) {
          saveTableData(this.tableKey, this.formModel).then(() => {
            this.tableData.unshift(this.formModel)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  },
  filters: {
    filterName(val, filterType) {
      if (filterType && format[filterType] instanceof Function) {
        return format[filterType](val)
      }
      return val
    }
  }

}
</script>
<style>
.pagination {
  margin-top: 30px;
}
.addBtn {
  float: right;
  margin: 15px;
}
.commontable {
  margin: 30px;
}
.buttons {
  text-align: right;
}
</style>
