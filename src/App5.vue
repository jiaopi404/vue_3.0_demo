<template>
  <div id="app">
    通讯录插件
    <addr-book></addr-book>
  </div>
</template>

<script>
/**
 *
 */
import AddrBook from './components/addr-book.vue'
export default {
  name: 'App',
  components: {
    AddrBook
  },
  setup () {
    return {
    }
  }
}
</script>
