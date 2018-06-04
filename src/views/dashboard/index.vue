<template>
  <div class="dashboard-container">
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <el-card class="grid-content bg-purple">
          <span slot="header">
            用户信息
          </span>
          <div v-for="(value, key) in filterInfo(userinfo)" :key="key" class="text item">
            <span class="label">{{ keyMap[key] }}</span>
            <span class="right">{{ value }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">

      </el-col>
      <el-col :span="6">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data() {
    return {
      keyMap: {
        'id': '用户ID',
        'login_name': '登录名',
        'fullname': '用户名',
        'email': '邮箱',
        'roles': '角色'
      }
    }
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    filterInfo(user) {
      const info = {}
      Object.keys(user).forEach((key) => {
        if (this.keyMap[key]) {
          info[key] = user[key]
        }
      })
      return info
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
.dashboard-container {
  margin: 20px 0px;
  .text {
    font-family: 'Courier New', Courier, monospace;
  }
  .item {
    padding: 3px 0px;
  }
  .label {
    font-weight: 400;
    width: 200px;
    display: inline-block;
    overflow: hidden;
  }
  .label::after{
    content: ':';
  }
  .right {
    float: right;
  }
}
</style>
