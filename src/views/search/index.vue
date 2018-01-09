<template>
  <div class="search_header">
  <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" style="width:500px;">
    <el-select v-model="type" slot="prepend" placeholder="请选择" style="width:150px;" @change="handleSearch">
      <el-option label="类目查询" value="Class"></el-option>
      <el-option label="品牌查询" value="Brand"></el-option>
      <el-option label="商家查询" value="Vendor"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
  </el-input>
  <el-table v-loading="loading" :data="list"  v-if="startRender" >
    <el-table-column v-for="column in activeOption.column"  :label="column['label']" :key="column['value']">
        <template slot-scope="scope">
           {{scope.row[column['value']]}}
         </template>
    </el-table-column>
  </el-table>
  </div>
</template>
 
<script>
import axios from 'axios'

export default {
  data() {
    return {
      type: '',
      keyword: '',
      list: [],
      loading: false,
      options: {
        'Brand': {
          column: [{ label: '品牌', value: 'brandid' }, { label: '品牌名称', value: 'brandname' }]
        },
        'Class': {
          column: [{ label: '一级类目Id', value: 'classid1' }, { label: '一级类目名称', value: 'classname1' }, { label: '二级类目Id', value: 'classid2' }, { label: '二级类目名称', value: 'classname2' }, { label: '三级类目Id', value: 'classid3' }, { label: '三级类目名称', value: 'classname3' }]
        },
        'Vendor': {
          column: [{ label: '商家Id', value: 'venderid' }, { label: '商家名称', value: 'vendername' }]
        }
      }
    }
  },
  computed: {
    activeOption() {
      // type => option
      if (this.options.hasOwnProperty(this.type)) {
        return this.options[this.type]
      }
      return null
    },
    startRender() {
      if (this.activeOption && this.keyword) {
        return true
      }
      return false
    }
  },
  methods: {
    handleSearch() {
      if (this.keyword && this.type) {
        this.loading = true
        const form = new FormData()
        form.append('user', 'hemin74')
        form.append('password', 'Simple&Happy2')
        axios('/api/Basic/Login/verify', {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: form
        }).then(response => {
          axios.get(`/api/Diagnosis/VariousQuery/${this.type}?keyword=${this.keyword}`).then(response => {
            this.loading = false
            this.list = response.data
          })
        })
      }
    }
  }
}
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
.search_header {
  margin: 20px;
}
</style>

