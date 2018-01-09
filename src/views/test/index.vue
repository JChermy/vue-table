<template>
    <div id='app'>
        <p>{{total}}</p>
        <add-button @increment='incrementTotal'></add-button>
        <add-button @increment='incrementTotal'></add-button> 
    </div>  
</template>
<script>
    import addButton from '@/components/addButton'
    export default {
      components: { addButton },
      data() {
        return {
          total: 0
        }
      },
      methods: {
        incrementTotal: function() {
          this.total += 1
        }
      }
    }

</script>