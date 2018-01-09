<template>
    <div>
    <el-input  v-model="newMessage"  placeholder="请输入留言" v-on:keydown='addMessageItem '></el-input>
    <ol v-for="list in messageList" :key="list.id">
        <li>{{list.message}}</li>
        <button>x</button>
    </ol>
    </div>
</template>
<<script>
export default {
  data() {
    return {
      messageList: [
        { id: 1, message: 'hi jchermy' },
        { id: 2, message: 'hi json' }
      ],
      nextMessageId: 3
    }
  },
  methods: {
    addMessageItem() {
      this.messageList.push({ id: this.nextMessageId++, message: this.newMessage })
    }
  }
}
</script>
