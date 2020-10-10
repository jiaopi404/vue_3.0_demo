<template>
  <div class="addr-book">
    这是一个 通讯录
    <div class="addr-book__container">
      <div
        class="addr-book__list-box"
      >
        <div
          class="addr-book__sub-list-box"
          v-for="(value, key) in state.dataListClassified"
          :key="key + '-sublist'"
          v-show="value.length"
        >
          <div
            class="addr-book__sub-list-header"
            :data-key="key"
          >
            {{ key.toUpperCase() }}
          </div>
          <div
            class="addr-book__sub-list-item"
            v-for="item in value"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="addr-book__alphabet">
        <div
          class="addr-book__alphabet-item"
          v-for="item in state.alphabet"
          :key="item + '-alphabet'"
          @click="handleClickAlphabetItem"
          :data-key="item"
        >
          {{ item.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 模块:
 * 1. 列表 首字母分类 表
 * 2. 列表 首字母分类 逻辑
 * 3. 点击右侧 首字母分类表 逻辑
 * 4. 点击 item 逻辑
 */
import { reactive, toRefs, ref, onMounted } from 'vue'
import cnchar from 'cnchar'
// 分类准则
const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '#']
const SPECIAL_CHAR = '#'
// 分类字段
const SORT_ATTR = 'name'
export default {
  name: "addr-book",
  props: {
    dataList: {
      type: Array,
      default: () => [
        { id: 1, name: '常玉坤', age: 20 },
        { id: 2, name: 'jiaopi', age: 20 },
        { id: 3, name: '网徐峥', age: 20 },
        { id: 4, name: '.sdfjkds', age: 20 },
        { id: 5, name: 'z', age: 20 },
        { id: 6, name: 'sd', age: 20 },
        { id: 7, name: 'gdgf', age: 20 },
        { id: 8, name: 'reter', age: 20 },
        { id: 9, name: '是的冯绍峰', age: 20 },
        { id: 10, name: '与', age: 20 },
        { id: 11, name: '从VBv', age: 20 },
        { id: 12, name: '有呕吐', age: 20 },
        { id: 13, name: ',  ', age: 20 },
        { id: 14, name: '45飞机斯蒂芬', age: 20 },
        { id: 15, name: '发帖人欧普艺opt', age: 20 },
        { id: 16, name: '注定是发生', age: 20 },
        { id: 17, name: '一度', age: 20 }
      ]
    }
  },
  setup (props, { emit }) {
    onMounted(() => {
    })
    // 1. 数据进行分组
    const { dataListClassified } = useSpellCheckToClassify(props.dataList)
    console.log('dataListClassified is: ', dataListClassified)
    // 2. 返回 ALPHABET
    const state = reactive({
      alphabet: ALPHABET,
      dataListClassified
    })
    // 3. 绑定事件
    const { handleClickAlphabetItem } = useNav()
    return {
      state,
      handleClickAlphabetItem
    }
  }
}
// 使用 spell check 进行分组
function useSpellCheckToClassify (data) {
  const dataListClassified = {}
  ALPHABET.forEach(item => {
    dataListClassified[item] = []
  })
  data.forEach(item => {
    // 1. 判断首字符是不是中文/英文字母
    const _firstChar = item[SORT_ATTR][0] // 首字符
    const _regExp = /[a-zA-Z\u4e00-\u9fa5]/
    if (_regExp.test(_firstChar)) {
      // 判断到是中文/英文字母, 则调用 cnchar.spell() 根据获取到的结构首字母进行分组的判断
      const _alpha = cnchar.spell(_firstChar)[0].toLowerCase() // 得到小写字符
      dataListClassified[_alpha].push(item)
    } else {
      // 表示非正常分类字符
      dataListClassified[SPECIAL_CHAR].push(item)
    }
  })
  return {
    dataListClassified
  }
}

function useNav () {
  const handleClickAlphabetItem = function (e) {
    const _alpha = e.target.dataset['key']
    // 特定的 header 元素
    const subListHeaderEle = document.querySelector(`.addr-book__sub-list-header[data-key=${_alpha}]`)
    console.log('offsetTop is: ', subListHeaderEle.offsetTop)
    if (subListHeaderEle.offsetTop === 0) {
      return
    }
    // 列表元素
    const subListEle = document.querySelector('.addr-book__list-box')
    console.dir(subListEle)
    subListEle.scrollTop = subListHeaderEle.offsetTop - 10
  }

  return {
    handleClickAlphabetItem
  }
}
</script>

<style scoped>
  .addr-book__container {
    position: relative;
    background-color: pink;
    text-align: left;
    padding: 10px 20px 10px 15px;
  }
  .addr-book__list-box {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 400px;
  }
  .addr-book__sub-list-header {
    background-color: #999999;
  }
  .addr-book__alphabet {
    position: absolute;
    top: 0;
    right: 0;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
