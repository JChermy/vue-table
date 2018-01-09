<template>
    <div>
    <el-input  v-model="newMessage"  placeholder="请输入留言"  @keyup.enter.native='addMessageItem ' style="width: 400px;"></el-input>
    <ul>
        <li v-for="(list, index) in messageList" :key="list.id">
            {{list.message}}
            <button @click="removeMessage(index)" >x</button>
        </li>
    </ul>
    </div>
</template>
<<script>
export default {
  data() {
    return {
      newMessage: '',
      messageList: [
        { id: 1, message: 'hi jchermy' },
        { id: 2, message: 'hi jason' }
      ],
      nextMessageId: 3
    }
  },
  methods: {
    addMessageItem: function() {
      this.messageList.push({ id: this.nextMessageId++, message: this.newMessage })
      this.newMessage = ''
    },
    removeMessage: function(index) {
      this.messageList.splice(index, 1)
    }
  }
}
</script>
