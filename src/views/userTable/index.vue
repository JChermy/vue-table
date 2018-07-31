<template>
    <div id="table">
        <common-table 
        :data="tableData"
        :fields="fields" 
        :form-rules="rules" 
        :form-model.sync="temp" 
        @reset-form="resetTemp" 
        @fetchData="fetchData">
            <template slot="form">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="temp.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="temp.sex">
                        <el-radio v-for="type in types" :key="type.name" :label="type.value" border> 
                            {{type.name}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="兴趣" prop="habbits">
                    <el-checkbox-group v-model="temp.habbits">
                        <el-checkbox v-for="habbit in habbits"  :key="habbit.name" :label="habbit.value">
                            {{habbit.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="temp.age" :min="1" label="年龄"></el-input-number>
                </el-form-item>
            </template>
        </common-table>
    </div>
</template>
<script>
import commonTable from '@/components/commonTable'
import { getUserData } from '@/api/user'
export default{
  components: { commonTable },
  data() {
    return {
      loading: true,
      tableData: [],
      fields: [
        { 'label': '姓名', 'field': 'name' },
        { 'label': '性别', 'field': 'sex' },
        { 'label': '兴趣', 'field': 'habbits' },
        { 'label': '年龄', 'field': 'age' }
      ],
      temp: {
        name: '',
        sex: '',
        age: 1,
        habbits: ''
      },
      types: [
        { 'name': '男', 'value': '0' },
        { 'name': '女', 'value': '1' }
      ],
      habbits: [
        { 'name': '羽毛球', 'value': '0' },
        { 'name': '篮球', 'value': '1' },
        { 'name': '足球', 'value': '2' }
      ],
      rules: {
        keyword: [{ require: true, message: '请输入姓名', trigger: 'change' }]
      }
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        name: '',
        sex: '',
        age: 1,
        habbits: ''
      }
    },
    fetchData(cb) {
      getUserData().then(response => {
        this.tableData = response.data.items
      }).finally(cb)
    }
  }
}
</script>


