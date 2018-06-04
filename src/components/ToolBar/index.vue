<template>
  <div  class="form-wrapper">
    <el-form class="search-form" :label-position="labelPosition" label-width="80px;" :model="searchForm" inline ref="searchForm"> 
      <el-form-item label="关键词:" prop="key"> 
           <el-input v-model="searchForm.key" ></el-input>
      </el-form-item>
      <el-form-item label="操作时间:" prop="createtime">
            <el-date-picker v-model="searchForm.createtime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="操作人:" prop="optuser">
          <el-input v-model="searchForm.optuser"></el-input>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select> 
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click="handleSearch('searchForm')">搜索</el-button>
        <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>     
      </el-form-item>
    </el-form>
  </div> 
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'left',
        options: [{
          value: 'edit',
          label: '编辑中'
        }, {
          value: 'pre',
          label: '预发布'
        }, {
          value: 'idc',
          label: '线上'
        }],
        searchForm: {
          key: '',
          createtime: '',
          optuser: '',
          status: ''
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSearch(formName) {
        this.$emit('handle-search', this.searchForm)
      }
    }
  }
</script>
<style>
.form-wrapper {
  margin: 20px 10px -20px 10px;
  display: inline-block;
}
</style>


