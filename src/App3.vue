<template>
  <div id="app">
  </div>
</template>

<script>
/**
 * 1. setup 执行时机
 * beforeCreated -> setup -> created
 * 
 * beforeCreated: 组件刚刚被创建出来, 组建的 data, methods 还没有初始化好
 * setup: 
 * created: 表示组件刚刚被创建出来, 并且组件的 data, methods 已经初始化完成
 * 2. setup 注意点
 * 
 * - setup 函数中 不能够使用 data & methods, 因为还没有初始化好,
 * - setup 函数中 this 为 undefined
 * - `async setup` 无效, setup 只能是同步的, 不能是异步的
 */
export default {
  name: 'App',
  setup () {
    let age = ref(18)
    function fn1 () {
    }
    console.log('this is: ', this) // undefined
    return {
      age,
      fn1
    }
  }
}
</script>
