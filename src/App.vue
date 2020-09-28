<template>
  <div id="app">
  </div>
</template>

<script>
/**
 * 1. what is reactive ?
 * - reactive 是 vue3 中提供的实现响应式数据的方法
 * - vue2 中响应式数据时通过 defineProperty 来实现的, 在 vue3 中响应式数据通过 es6 的 Proxy 来实现的
 *
 * 2. reactive 注意点:
 * - reactive 参数必须是对象 (json/arr)
 * - 如果给 reactive 传递了其他对象
 *  + 默认情况下修改对象, 界面不会更新
 *  + 如果想更新, 可以通过重新赋值的方式
 */
import { ref } from 'vue'
export default {
  name: 'App',
  setup () {
    let age = ref(18)
    return {
      age
    }
  }
}
</script>
