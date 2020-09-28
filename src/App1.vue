<template>
  <div id="app">
    count is: {{ count }}
    <button @click="add">+1</button>
  </div>
</template>

<script>
/**
 * 使用组合式 api 解决 vue2.x 中 数据与逻辑 分散不好管理的问题
 */
import { ref } from 'vue'
export default {
  name: 'App',
  /**
   * 组合 api 的入口函数
   */
  setup () {
    // 定义了一个名称叫做 count 的变量, 变量的初始值是 0
    // 这个变量发生改变后, vue 会自动更新 UI
    let count = ref(0)
    // 方法不用定义到 api 中, 直接定义即可
    function add () {
      count.value++
    }
    // 注意点:
    // 在 组合 api 中定义的变量, 方法, 想再外界使用, 必须通过 return 暴露出去
    return {
      count,
      add
    }
  }
}
</script>
