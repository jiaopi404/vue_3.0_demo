<template>
  <div id="app">
    <form>
      <input type="text" v-model="state2.stu.id" />
      <input type="text" v-model="state2.stu.name" />
      <input type="text" v-model="state2.stu.age" />
      <input type="submit" @click="addStu" />
    </form>
    <ul>
      <li
        v-for="(stu, index) in state.stus"
        :key="stu.id"
        @click="remStu(index)"
      >
        id: {{ stu.id }}, name: {{ stu.name }}, age: {{ stu.age }}
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 使用组合式 api 解决 vue2.x 中 数据与逻辑 分散不好管理的问题
 * 利用组合 api 实现 todo list
 */
import { reactive, toRefs } from 'vue'
import useAddStu from './components/add'
import useRemoveStudent from './components/rem'
export default {
  name: 'App',
  setup () {
    let { state, remStu } = useRemoveStudent()
    let { state2, addStu } = useAddStu(state)
    return {
      state,
      state2,
      remStu,
      addStu
    }
  }
}

/*
function useRemoveStudent () {
  // ref 函数的注意点:
  // ref 函数只能监听 简单类型 的变化
  let state = reactive({
    stus: [
      { id: 1, name: 'zs', age: 1 },
      { id: 2, name: 'zs', age: 1 },
      { id: 3, name: 'zs', age: 1 }
    ]
  })
  function remStu (index) {
    console.log('111 is: ', 111)
    // state.stus = state.stus.filter((item, idx) => idx !== index)
    state.stus.splice(index, 1)
  }
  return {
    state,
    remStu
  }
}
*/

/**
function useAddStu (state) {
  let state2 = reactive({
    stu: {
      id: '',
      name: '',
      age: ''
    }
  })

  function addStu (e) {
    e.preventDefault()
    const stu = Object.assign({}, state2.stu)
    state.stus.push(stu)
    state2.stu.id = ''
    state2.stu.name = ''
    state2.stu.age = ''
  }
  return { state2, addStu }
}
*/
</script>
