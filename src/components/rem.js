import { reactive } from 'vue'

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

export default useRemoveStudent
