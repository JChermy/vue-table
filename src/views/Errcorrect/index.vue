<template>
  <div id="table">
      <common-table :fields="fields" :tableKey="tableKey" :form-rules="rules" :form-model="temp" @reset-form="resetTemp">          
          <template slot="form">
            <el-form-item label="关键词" prop="keyword">
              <el-input placeholder="请输入关键词" v-model="temp.keyword"></el-input>
            </el-form-item>
            <el-form-item label="纠错方式">
              <el-radio-group v-model="temp.changetype">
                  <el-radio v-for="type in types" :key="type.name" :label="type.value"  border>
                        {{ type.name }}
                  </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="改写关键词" prop="changeword">
              <el-input placeholder="请输入改写关键词" v-model="temp.changeword"></el-input>
            </el-form-item>
            <el-form-item label="有效期"  prop="time">
              <el-date-picker v-model="temp.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="isremind">
              <el-input placeholder="请填写调整背景,如需求方" v-model="temp.isremind"></el-input>
            </el-form-item>
          </template>
      </common-table>
  </div>
</template>
<script>
  import commonTable from '@/components/commonTable'
  export default {
    components: { commonTable },
    data() {
      return {
        fields: [
          { 'lable': '关键词', 'field': 'keyword' },
          { 'lable': '纠错方式', 'field': 'changetype', filter: 'changetype' },
          { 'lable': '改写关键词', 'field': 'changeword' },
          { 'lable': '有效期', 'field': 'time' },
          { 'lable': '是否删除', 'field': 'isdelete' },
          { 'lable': '操作人', 'field': 'optuser' }
        ],
        tableKey: 'Errcorrect',
        temp: {
          keyword: '',
          changetype: '',
          changeword: '',
          time: new Date(),
          isdelete: 0,
          optuser: 'hemin74',
          isremind: ''
        },
        types: [
          { 'name': '直接改写', 'value': 1 },
          { 'name': '建议改写', 'value': 2 },
          { 'name': '不改写', 'value': 3 },
          { 'name': '补充', 'value': 4 }
        ],
        dialogStatus: '',
        rules: {
          keyword: [{ required: true, message: '关键词不能为空！', trigger: 'change' }]
        }
      }
    },
    methods: {
      resetTemp() {
        this.temp = {
          keyword: '',
          changetype: '',
          changeword: '',
          time: new Date(),
          isdelete: 0,
          optuser: 'hemin74',
          isremind: ''
        }
      }
    }
  }
</script>

