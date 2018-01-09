<template>
    <button @click="incrementCounter">{{ counter }}</button>
</template>
<script>
    export default {
  data() {
        return {
          counter: 0
        }
  },
  methods: {
        incrementCounter() {
          this.counter += 1
          this.$emit('increment')
        }
  }
    }
</script>

